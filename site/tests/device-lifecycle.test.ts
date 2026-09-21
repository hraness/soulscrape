import { afterEach, expect, spyOn, test } from "bun:test";

import { authorize, poll, pruneExpired, start } from "../convex/devices";
import { pruneRevoked, revoke } from "../convex/credentials";
import { deviceCodeDigest, deviceSecretDigest, publishTokenDigest } from "../lib/device-shared";
import { mintDeviceAuthorizeTicket } from "../lib/device-ticket";
import { DEVICE_START_BURST, DEVICE_START_REFILL_MS } from "../convex/_deviceStartAdmission";

type Row = { _id: string; [key: string]: unknown };

class MemoryDatabase {
  tables: Record<string, Row[]> = { deviceCodes: [], publishCredentials: [], deviceStartAdmission: [] };
  reads: { index?: string; limit: number }[] = [];
  nextId = 0;

  query(table: string) {
    let index: string | undefined;
    const predicates: ((row: Row) => boolean)[] = [];
    const range = {
      eq(field: string, value: unknown) { predicates.push(row => row[field] === value); return range; },
      gt(field: string, value: number | undefined) {
        // Convex sorts unset indexed values before all numbers.
        predicates.push(row => value === undefined ? row[field] !== undefined : Number(row[field]) > value);
        return range;
      },
      lte(field: string, value: number) { predicates.push(row => Number(row[field]) <= value); return range; },
    };
    const matching = () => this.tables[table]!.filter(row => predicates.every(predicate => predicate(row)));
    const query = {
      withIndex(name: string, select: (builder: typeof range) => unknown) { index = name; select(range); return query; },
      take: async (limit: number) => { this.reads.push({ index, limit }); return matching().slice(0, limit); },
      first: async () => { this.reads.push({ index, limit: 1 }); return matching()[0] ?? null; },
    };
    return query;
  }

  async insert(table: string, value: Omit<Row, "_id">) {
    const id = "inserted-" + ++this.nextId;
    this.tables[table]!.push({ ...value, _id: id });
    return id;
  }

  async patch(id: string, value: Record<string, unknown>) {
    const row = Object.values(this.tables).flat().find(row => row._id === id);
    if (!row) throw new Error("unknown row");
    Object.assign(row, value);
  }

  async delete(id: string) {
    for (const rows of Object.values(this.tables)) {
      const index = rows.findIndex(row => row._id === id);
      if (index !== -1) rows.splice(index, 1);
    }
  }
}

async function invoke<Result>(registered: unknown, db: MemoryDatabase, args: Record<string, unknown> = {}): Promise<Result> {
  return (registered as { _handler(ctx: { db: MemoryDatabase }, args: Record<string, unknown>): Promise<Result> })._handler({ db }, args);
}

const now = 4_000_000_000;
const secret = "sps_" + "A".repeat(48);
const code = "SS-ABCD-EFGH";
const originalTicketSecret = process.env.SOULSCRAPE_SITE_TICKET_SECRET;
let clock: { mockRestore(): void } | undefined;

afterEach(() => {
  clock?.mockRestore();
  if (originalTicketSecret === undefined) delete process.env.SOULSCRAPE_SITE_TICKET_SECRET;
  else process.env.SOULSCRAPE_SITE_TICKET_SECRET = originalTicketSecret;
});

function setup() {
  clock = spyOn(Date, "now").mockReturnValue(now);
  return new MemoryDatabase();
}

function device(overrides: Partial<Row> = {}): Row {
  return {
    _id: "device",
    codeDigest: deviceCodeDigest(code),
    secretDigest: deviceSecretDigest(secret),
    deviceName: "synthetic device",
    status: "pending",
    createdAtMs: now - 100,
    expiresAtMs: now + 100,
    ...overrides,
  };
}

const startArgs = { codeDigest: "a".repeat(64), secretDigest: "b".repeat(64), deviceName: "synthetic device" };

test("expired abandoned codes do not consume the pending admission limit", async () => {
  const db = setup();
  db.tables.deviceCodes = Array.from({ length: 1_000 }, (_, i) => device({ _id: "old-" + i, expiresAtMs: now }));
  await expect(invoke(start, db, startArgs)).resolves.toEqual({ ok: true });
  expect(db.tables.deviceCodes).toHaveLength(1_001);
  expect(db.reads).toContainEqual({ index: "by_status_expiresAtMs", limit: 1_000 });
});

test("live pending codes still enforce the global admission limit", async () => {
  const db = setup();
  db.tables.deviceCodes = Array.from({ length: 1_000 }, (_, i) => device({ _id: "live-" + i }));
  await expect(invoke(start, db, startArgs)).resolves.toEqual({
    ok: false, error: { code: "DEVICE_START_CAPACITY", retryAfterMs: 100 },
  });
  expect(db.tables.deviceCodes).toHaveLength(1_000);
  expect(db.tables.deviceStartAdmission).toMatchObject([{ scope: "global", tokens: DEVICE_START_BURST - 1 }]);
});

test("start rejects unbounded or malformed digests before storage and is idempotent on a valid secret digest", async () => {
  const db = setup();
  for (const digest of ["", "g".repeat(64), "a".repeat(65)]) {
    await expect(invoke(start, db, { ...startArgs, codeDigest: digest })).rejects.toThrow("SHA-256");
  }
  expect(db.reads).toHaveLength(0);
  await invoke(start, db, startArgs);
  const afterFirst = structuredClone(db.tables);
  const readCount = db.reads.length;
  await invoke(start, db, startArgs);
  expect(db.tables).toEqual(afterFirst);
  expect(db.reads.slice(readCount)).toEqual([{ index: "by_secretDigest", limit: 1 }]);
  expect(db.tables.deviceCodes).toHaveLength(1);
});

test("full-pool rejections commit every admitted attempt and exhausted attempts never scan pending rows", async () => {
  const db = setup();
  db.tables.deviceCodes = Array.from({ length: 1_000 }, (_, i) => device({ _id: "live-" + i }));
  for (let attempt = 0; attempt < DEVICE_START_BURST; attempt++) {
    // No code is inserted, so even an identical failed secret is a new attempt.
    await expect(invoke(start, db, startArgs)).resolves.toEqual({
      ok: false, error: { code: "DEVICE_START_CAPACITY", retryAfterMs: 100 },
    });
    expect(db.tables.deviceStartAdmission[0]!.tokens).toBe(DEVICE_START_BURST - attempt - 1);
  }
  const before = structuredClone(db.tables);
  const readCount = db.reads.length;
  await expect(invoke(start, db, startArgs)).resolves.toEqual({
    ok: false, error: { code: "DEVICE_START_RATE_LIMITED", retryAfterMs: DEVICE_START_REFILL_MS },
  });
  expect(db.tables).toEqual(before);
  expect(db.reads.slice(readCount)).toEqual([{ index: "by_secretDigest", limit: 1 }, { index: "by_scope", limit: 1 }]);
  expect(db.reads.filter(read => read.index === "by_status_expiresAtMs")).toHaveLength(DEVICE_START_BURST);
});

test("successful starts exhaust the same global bucket and one refill admits only one new code", async () => {
  const db = setup();
  for (let attempt = 0; attempt < DEVICE_START_BURST; attempt++) {
    await expect(invoke(start, db, { ...startArgs, secretDigest: attempt.toString(16).padStart(64, "0") })).resolves.toEqual({ ok: true });
  }
  await expect(invoke(start, db, startArgs)).resolves.toMatchObject({ ok: false, error: { code: "DEVICE_START_RATE_LIMITED" } });
  expect(db.tables.deviceCodes).toHaveLength(DEVICE_START_BURST);
  clock?.mockRestore();
  clock = spyOn(Date, "now").mockReturnValue(now + DEVICE_START_REFILL_MS);
  await expect(invoke(start, db, startArgs)).resolves.toEqual({ ok: true });
  await expect(invoke(start, db, { ...startArgs, secretDigest: "c".repeat(64) })).resolves.toMatchObject({ ok: false, error: { code: "DEVICE_START_RATE_LIMITED" } });
  expect(db.tables.deviceCodes).toHaveLength(DEVICE_START_BURST + 1);
});

test("an approved code cannot mint a credential at or after its expiry", async () => {
  const db = setup();
  for (const expiresAtMs of [now, now - 1]) {
    db.tables.deviceCodes = [device({ status: "authorized", accountId: "synthetic-account", username: "synthetic_user", expiresAtMs })];
    await expect(invoke(poll, db, { secret })).resolves.toEqual({ status: "expired" });
    expect(db.tables.publishCredentials).toHaveLength(0);
  }
});

test("a live approved code exchanges once and stores only the token digest", async () => {
  const db = setup();
  db.tables.deviceCodes = [device({ status: "authorized", accountId: "synthetic-account", username: "synthetic_user" })];
  const result = await invoke<{ status: string; token: string; username: string }>(poll, db, { secret });
  expect(result.status).toBe("authorized");
  expect(result.token).toMatch(/^spt_[A-Za-z0-9_-]{48}$/u);
  expect(db.tables.publishCredentials).toHaveLength(1);
  expect(db.tables.publishCredentials![0]!.tokenDigest).toBe(publishTokenDigest(result.token));
  expect(JSON.stringify(db.tables)).not.toContain(result.token);
  await expect(invoke(poll, db, { secret })).rejects.toMatchObject({ data: { code: "DEVICE_CODE_UNKNOWN" } });
  expect(db.tables.publishCredentials).toHaveLength(1);
});

test("authorization rejects a device code at its exact expiry", async () => {
  const db = setup();
  db.tables.deviceCodes = [device({ expiresAtMs: now })];
  process.env.SOULSCRAPE_SITE_TICKET_SECRET = "test-only-secret-".repeat(3);
  const ticket = mintDeviceAuthorizeTicket({
    code, accountId: "synthetic-account", username: "synthetic_user",
    now, secret: process.env.SOULSCRAPE_SITE_TICKET_SECRET,
  });
  await expect(invoke(authorize, db, { code, ticket })).rejects.toThrow("not found or expired");
  expect(db.tables.deviceCodes![0]!.status).toBe("pending");
});

test("scheduled cleanup removes expired codes in bounded batches and preserves live records and credentials", async () => {
  const db = setup();
  db.tables.deviceCodes = Array.from({ length: 300 }, (_, i) => device({
    _id: "expired-" + i, status: ["pending", "authorized", "consumed", "expired"][i % 4], expiresAtMs: now,
  }));
  db.tables.deviceCodes.push(device({ _id: "live" }));
  db.tables.publishCredentials = [{ _id: "credential", tokenDigest: "c".repeat(64) }];
  await expect(invoke(pruneExpired, db)).resolves.toEqual({ deleted: 256 });
  expect(db.tables.deviceCodes).toHaveLength(45);
  await expect(invoke(pruneExpired, db)).resolves.toEqual({ deleted: 44 });
  expect(db.tables.deviceCodes).toEqual([device({ _id: "live" })]);
  expect(db.tables.publishCredentials).toHaveLength(1);
  expect(db.reads.every(read => read.index === "by_expiresAtMs" && read.limit === 256)).toBe(true);
});


test("poll reports typed invalid and unknown secret errors without exposing the supplied value", async () => {
  const db = setup();
  await expect(invoke(poll, db, { secret: "fixture-secret" })).rejects.toMatchObject({ data: { code: "BAD_REQUEST" } });
  expect(db.reads).toHaveLength(0);
  await expect(invoke(poll, db, { secret })).rejects.toMatchObject({ data: { code: "DEVICE_CODE_UNKNOWN" } });
  expect(db.tables.publishCredentials).toHaveLength(0);
});

function credential(index: number, overrides: Partial<Row> = {}): Row {
  return {
    _id: "credential-" + index,
    tokenDigest: publishTokenDigest("spt_" + String(index).padStart(48, "0")),
    accountId: "synthetic-account",
    username: "synthetic_user",
    deviceName: "device-" + index,
    createdAtMs: now - 100,
    ...overrides,
  };
}

test("credential issuance counts active devices for this account and admits exactly the twentieth", async () => {
  const db = setup();
  db.tables.publishCredentials = [
    ...Array.from({ length: 19 }, (_, i) => credential(i)),
    ...Array.from({ length: 30 }, (_, i) => credential(i + 19, { accountId: "other-account" })),
    ...Array.from({ length: 30 }, (_, i) => credential(i + 49, { revokedAtMs: now - 1 })),
  ];
  db.tables.deviceCodes = [device({ status: "authorized", accountId: "synthetic-account", username: "synthetic_user" })];
  await expect(invoke(poll, db, { secret })).resolves.toMatchObject({ status: "authorized" });
  expect(db.tables.publishCredentials.filter(row => row.accountId === "synthetic-account" && row.revokedAtMs === undefined)).toHaveLength(20);
  expect(db.reads).toContainEqual({ index: "by_account_revoked", limit: 20 });

  const secondSecret = "sps_" + "B".repeat(48);
  db.tables.deviceCodes.push(device({
    _id: "second-device", secretDigest: deviceSecretDigest(secondSecret), status: "authorized",
    accountId: "synthetic-account", username: "synthetic_user", deviceName: "another device",
  }));
  await expect(invoke(poll, db, { secret: secondSecret })).rejects.toMatchObject({ data: { code: "DEVICE_LIMIT" } });
  expect(db.tables.publishCredentials).toHaveLength(80);
  expect(db.tables.deviceCodes.at(-1)?.status).toBe("authorized");
});

test("a capped pairing remains usable after explicitly revoking a known credential", async () => {
  const db = setup();
  db.tables.publishCredentials = Array.from({ length: 20 }, (_, i) => credential(i));
  db.tables.deviceCodes = [device({ status: "authorized", accountId: "synthetic-account", username: "synthetic_user" })];
  await expect(invoke(poll, db, { secret })).rejects.toMatchObject({ data: { code: "DEVICE_LIMIT" } });
  expect(db.tables.deviceCodes![0]!.status).toBe("authorized");
  expect(db.tables.publishCredentials.every(row => row.revokedAtMs === undefined)).toBe(true);
  await invoke(revoke, db, { token: "spt_" + "0".repeat(48) });
  await expect(invoke(poll, db, { secret })).resolves.toMatchObject({ status: "authorized" });
  expect(db.tables.publishCredentials).toHaveLength(21);
  expect(db.tables.publishCredentials.filter(row => row.revokedAtMs === undefined)).toHaveLength(20);
  expect(db.tables.deviceCodes![0]!.status).toBe("consumed");
});

test("historical accounts above the device cap keep every credential and use a bounded admission read", async () => {
  const db = setup();
  db.tables.publishCredentials = Array.from({ length: 100 }, (_, i) => credential(i));
  const original = structuredClone(db.tables.publishCredentials);
  db.tables.deviceCodes = [device({ status: "authorized", accountId: "synthetic-account", username: "synthetic_user" })];
  await expect(invoke(poll, db, { secret })).rejects.toMatchObject({ data: { code: "DEVICE_LIMIT" } });
  expect(db.tables.publishCredentials).toEqual(original);
  expect(db.tables.deviceCodes![0]!.status).toBe("authorized");
  expect(db.reads).toEqual([{ index: "by_secretDigest", limit: 1 }, { index: "by_account_revoked", limit: 20 }]);
});

test("revocation is a bounded exact-digest lookup and preserves the first revocation time", async () => {
  const db = setup();
  db.tables.publishCredentials = [credential(0), credential(1, { revokedAtMs: now - 5 })];
  const zero = "spt_" + "0".repeat(48);
  const one = "spt_" + "1".padStart(48, "0");
  await expect(invoke(revoke, db, { token: zero })).resolves.toEqual({ ok: true });
  await expect(invoke(revoke, db, { token: zero })).resolves.toEqual({ ok: true });
  await expect(invoke(revoke, db, { token: one })).resolves.toEqual({ ok: true });
  await expect(invoke(revoke, db, { token: "spt_" + "X".repeat(48) })).resolves.toEqual({ ok: true });
  expect(db.tables.publishCredentials.map(row => row.revokedAtMs)).toEqual([now, now - 5]);
  expect(db.reads).toEqual(Array.from({ length: 4 }, () => ({ index: "by_tokenDigest", limit: 1 })));
});

test("revoked cleanup deletes only digests revoked at least thirty days ago in batches of 256", async () => {
  const db = setup();
  const cutoff = now - 30 * 24 * 60 * 60 * 1_000;
  const keep = [credential(1_000), credential(1_001, { revokedAtMs: cutoff + 1 }), credential(1_002, { revokedAtMs: now })];
  // Active credentials come first to verify they cannot occupy the cleanup batch.
  db.tables.publishCredentials = [
    ...keep,
    ...Array.from({ length: 300 }, (_, i) => credential(i, { revokedAtMs: cutoff - 1 })),
    credential(300, { revokedAtMs: cutoff }),
  ];
  await expect(invoke(pruneRevoked, db)).resolves.toEqual({ deleted: 256 });
  expect(db.tables.publishCredentials).toHaveLength(48);
  await expect(invoke(pruneRevoked, db)).resolves.toEqual({ deleted: 45 });
  expect(db.tables.publishCredentials).toEqual(keep);
  await expect(invoke(pruneRevoked, db)).resolves.toEqual({ deleted: 0 });
  expect(db.reads.every(read => read.index === "by_revokedAtMs" && read.limit === 256)).toBe(true);
  await expect(invoke(revoke, db, { token: "spt_" + "0".repeat(48) })).resolves.toEqual({ ok: true });
  expect(db.tables.publishCredentials).toEqual(keep);
});
