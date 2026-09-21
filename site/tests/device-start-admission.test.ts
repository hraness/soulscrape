import { expect, test } from "bun:test";

import { admitDeviceStart, DEVICE_START_BURST, DEVICE_START_REFILL_MS } from "../convex/_deviceStartAdmission";

type Row = { _id: string; scope: "global"; tokens: number; refilledAtMs: number };
type Context = Parameters<typeof admitDeviceStart>[0];

class AdmissionDatabase {
  row: Row | null = null;
  version = 0;
  reads = 0;
  writes = 0;

  query(table: string) {
    expect(table).toBe("deviceStartAdmission");
    return { withIndex: (index: string, select: (range: { eq(field: string, value: string): void }) => void) => {
      expect(index).toBe("by_scope");
      select({ eq: (field, value) => { expect(field).toBe("scope"); expect(value).toBe("global"); } });
      return { first: async () => { this.reads++; return this.row; } };
    } };
  }
  async insert(table: string, value: Omit<Row, "_id">) {
    expect(table).toBe("deviceStartAdmission");
    expect(this.row).toBeNull();
    this.row = { ...value, _id: "singleton" };
    this.writes++;
    return "singleton";
  }
  async patch(id: string, value: Omit<Row, "_id">) {
    expect(id).toBe(this.row!._id);
    this.row = { ...value, _id: id };
    this.writes++;
  }
}

function attempt(db: AdmissionDatabase, now: number) {
  return admitDeviceStart({ db } as unknown as Context, now);
}

// Exercise optimistic conflict retries with isolated snapshots; this is a model
// of the transaction boundary, not a claim to run a live Convex concurrency test.
async function transaction(db: AdmissionDatabase, now: number) {
  for (let retries = 0; retries < 100; retries++) {
    const version = db.version;
    const snapshot = new AdmissionDatabase();
    snapshot.row = structuredClone(db.row);
    const result = await attempt(snapshot, now);
    if (version !== db.version) continue;
    db.reads += snapshot.reads;
    if (snapshot.writes > 0) {
      db.row = snapshot.row;
      db.writes += snapshot.writes;
      db.version++;
    }
    return result;
  }
  throw new Error("transaction retry budget exceeded");
}

const now = 4_000_000;

test("first use creates one bounded row and the twentieth attempt exhausts the burst", async () => {
  const db = new AdmissionDatabase();
  for (let index = 0; index < DEVICE_START_BURST; index++) {
    expect(await attempt(db, now)).toEqual({ allowed: true });
  }
  expect(db.row).toEqual({ _id: "singleton", scope: "global", tokens: 0, refilledAtMs: now });
  const writes = db.writes;
  for (let index = 0; index < 10; index++) {
    expect(await attempt(db, now)).toEqual({ allowed: false, retryAfterMs: DEVICE_START_REFILL_MS });
  }
  expect(db.writes).toBe(writes);
});

test("partial intervals do not refill or write, and the exact boundary admits once", async () => {
  const db = new AdmissionDatabase();
  db.row = { _id: "singleton", scope: "global", tokens: 0, refilledAtMs: now };
  expect(await attempt(db, now + DEVICE_START_REFILL_MS - 1)).toEqual({ allowed: false, retryAfterMs: 1 });
  expect(db.writes).toBe(0);
  expect(await attempt(db, now + DEVICE_START_REFILL_MS)).toEqual({ allowed: true });
  expect(await attempt(db, now + DEVICE_START_REFILL_MS)).toEqual({ allowed: false, retryAfterMs: DEVICE_START_REFILL_MS });
  expect(db.row!.tokens).toBe(0);
});

test("idle refill caps at the burst and discards banked fractional credit", async () => {
  const db = new AdmissionDatabase();
  db.row = { _id: "singleton", scope: "global", tokens: 0, refilledAtMs: now };
  const later = now + 100 * DEVICE_START_REFILL_MS + 9_999;
  for (let index = 0; index < DEVICE_START_BURST; index++) expect(await attempt(db, later)).toEqual({ allowed: true });
  expect(await attempt(db, later + 1)).toEqual({ allowed: false, retryAfterMs: DEVICE_START_REFILL_MS - 1 });
  expect(db.row!.refilledAtMs).toBe(later);
});

test("a backward clock does not reset a depleted bucket", async () => {
  const db = new AdmissionDatabase();
  db.row = { _id: "singleton", scope: "global", tokens: 0, refilledAtMs: now };
  expect(await attempt(db, now - 1_000)).toEqual({ allowed: false, retryAfterMs: DEVICE_START_REFILL_MS + 1_000 });
  expect(db.writes).toBe(0);
});

test("concurrent first-use transactions share one bucket and admit only the burst", async () => {
  const db = new AdmissionDatabase();
  const results = await Promise.all(Array.from({ length: DEVICE_START_BURST + 10 }, () => transaction(db, now)));
  expect(results.filter(result => result.allowed)).toHaveLength(DEVICE_START_BURST);
  expect(results.filter(result => !result.allowed)).toHaveLength(10);
  expect(db.row).toEqual({ _id: "singleton", scope: "global", tokens: 0, refilledAtMs: now });
  expect(db.writes).toBe(DEVICE_START_BURST);
});

test("concurrent transactions at one refill boundary cannot spend that token twice", async () => {
  const db = new AdmissionDatabase();
  db.row = { _id: "singleton", scope: "global", tokens: 0, refilledAtMs: now };
  const results = await Promise.all(Array.from({ length: 10 }, () => transaction(db, now + DEVICE_START_REFILL_MS)));
  expect(results.filter(result => result.allowed)).toHaveLength(1);
  expect(db.writes).toBe(1);
  expect(db.row!.tokens).toBe(0);
});
