import { afterEach, expect, spyOn, test } from "bun:test";
import { readFileSync } from "node:fs";
import { ConvexError } from "convex/values";
import {
  activateProjections, backfillProjections, getPublic, listAllPublic, listByUsername, listOwn, projectionStatus,
  publicGraphPage, publicIndexPage, publish, relationsByUsername, relationsByUsernamePage, withdraw,
} from "../convex/people";
import { graphProjection, MAX_ACCOUNT_PACKET_BYTES, packetBytes, publishBucket } from "../convex/_profiles";
import { parsePersonIndex, personIndexDigest, type PersonIndex } from "../../skills/soulscrape/scripts/person-index";
import { publishTokenDigest } from "../lib/device-shared";

type Row = { _id: string; [key: string]: unknown };
type Read = { table: string; index?: string; fields: string[]; limit: number; maximumBytesRead?: number };
class MemoryDatabase {
  tables: Record<string, Row[]> = Object.fromEntries([
    "publishCredentials", "personProfiles", "personProfileMetadata", "personProfileGraph", "personAccountUsage", "personProjectionState", "personPublisherVersions",
  ].map(name => [name, []]));
  reads: Read[] = [];
  writes = 0;
  nextId = 0;
  query(table: string) {
    let index: string | undefined;
    const fields: string[] = [];
    const predicates: ((row: Row) => boolean)[] = [];
    const range = { eq(field: string, value: unknown) { fields.push(field); predicates.push(row => row[field] === value); return range; } };
    const matching = () => this.tables[table]!.filter(row => predicates.every(predicate => predicate(row)));
    const note = (limit: number, maximumBytesRead?: number) => this.reads.push({ table, index, fields: [...fields], limit, maximumBytesRead });
    const query = {
      withIndex(name: string, select: (builder: typeof range) => unknown) { index = name; select(range); return query; },
      first: async () => { note(1); return matching()[0] ?? null; },
      take: async (limit: number) => { note(limit); return matching().slice(0, limit); },
      paginate: async (options: { cursor: string | null; numItems: number; maximumRowsRead: number; maximumBytesRead: number }) => {
        note(options.numItems, options.maximumBytesRead);
        const rows = matching();
        const offset = Number(options.cursor ?? 0);
        const page: Row[] = [];
        let bytes = 0;
        for (const row of rows.slice(offset, offset + Math.min(options.numItems, options.maximumRowsRead))) {
          const size = new TextEncoder().encode(JSON.stringify(row)).byteLength;
          if (page.length > 0 && bytes + size > options.maximumBytesRead) break;
          bytes += size; page.push(row);
        }
        const next = offset + page.length;
        return { page, isDone: next >= rows.length, continueCursor: String(next) };
      },
    };
    return query;
  }
  async get(id: string) { return Object.values(this.tables).flat().find(row => row._id === id) ?? null; }
  async insert(table: string, value: Record<string, unknown>) {
    this.writes++;
    const id = "inserted-" + ++this.nextId;
    this.tables[table]!.push({ ...value, _id: id });
    return id;
  }
  async patch(id: string, value: Record<string, unknown>) {
    this.writes++;
    const row = await this.get(id);
    if (row === null) throw new Error("unknown row");
    for (const [key, item] of Object.entries(value)) {
      if (item === undefined) delete row[key]; else row[key] = item;
    }
  }
  async replace(id: string, value: Record<string, unknown>) {
    this.writes++;
    const row = await this.get(id);
    if (row === null) throw new Error("unknown row");
    for (const key of Object.keys(row)) if (key !== "_id") delete row[key];
    Object.assign(row, value);
  }
}
async function invoke<T = unknown>(registered: unknown, db: MemoryDatabase, args: Record<string, unknown> = {}): Promise<T> {
  return (registered as { _handler(ctx: { db: MemoryDatabase }, args: Record<string, unknown>): Promise<T> })._handler({ db }, args);
}
const fixture: PersonIndex = parsePersonIndex(JSON.parse(readFileSync(new URL("../../examples/people/eugene-tssui/person-index.json", import.meta.url), "utf8")));
const token = "spt_" + "a".repeat(48);
const secondToken = "spt_" + "b".repeat(48);
let now = 1_000_000;
let clock: { mockRestore(): void } | undefined;
afterEach(() => { clock?.mockRestore(); clock = undefined; });
function setup() {
  now = 1_000_000;
  clock = spyOn(Date, "now").mockImplementation(() => now);
  const db = new MemoryDatabase();
  db.tables.publishCredentials!.push(...[token, secondToken].map((value, i) => ({
    _id: "credential-" + i, tokenDigest: publishTokenDigest(value), accountId: "account", username: "editor",
  })));
  return db;
}
function packet(handle = "example", body?: string): PersonIndex {
  return parsePersonIndex({ ...structuredClone(fixture), subject: { ...fixture.subject, handle }, ...(body === undefined ? {} : { body }) });
}
function source(value: PersonIndex, id = value.subject.handle, extra: Record<string, unknown> = {}): Row {
  return {
    _id: id, accountId: "account", username: "editor", handle: value.subject.handle,
    displayName: value.subject.displayName, summary: value.subject.summary,
    packetDigest: personIndexDigest(value), revision: 1, packet: value,
    publishedAtMs: 1, updatedAtMs: 1, ...extra,
  };
}
async function migrate(db: MemoryDatabase) {
  for (let i = 0; i < 100; i++) {
    if ((await invoke<{ ready: boolean }>(backfillProjections, db)).ready) { await invoke(activateProjections, db); return; }
  }
  throw new Error("migration did not converge");
}
async function errorCode(operation: Promise<unknown>, code: string) {
  try { await operation; throw new Error("expected rejection"); }
  catch (error) {
    expect(error).toBeInstanceOf(ConvexError);
    expect((error as ConvexError<{ code: string }>).data.code).toBe(code);
    return (error as ConvexError<{ code: string; retryAfterMs?: number }>).data;
  }
}

test("migration resumes in eight-row batches, preserves packets, and verifies coverage before reads", async () => {
  const db = setup();
  db.tables.personProfiles = Array.from({ length: 11 }, (_, i) => source(packet("example-" + i)));
  const before = db.tables.personProfiles.map(row => JSON.stringify(row.packet));
  await errorCode(invoke(publicIndexPage, db, { cursor: null }), "PROJECTIONS_NOT_READY");
  await errorCode(invoke(publish, db, { token, packet: packet("new-profile") }), "PROJECTIONS_NOT_READY");
  expect(await invoke(backfillProjections, db)).toMatchObject({ processed: 8, ready: false });
  expect(await invoke(listByUsername, db, { username: "editor" })).toHaveLength(11);
  await errorCode(invoke(publicIndexPage, db, { cursor: null }), "PROJECTIONS_NOT_READY");
  expect(await invoke(backfillProjections, db)).toMatchObject({ processed: 3, totalProcessed: 11, ready: true });
  const writes = db.writes;
  expect(await invoke(backfillProjections, db)).toMatchObject({ processed: 0, totalProcessed: 11, ready: true });
  expect(db.writes).toBe(writes);
  expect(await invoke(projectionStatus, db)).toMatchObject({ ready: true, hasUnprojectedRows: false });
  expect(db.tables.personProfileMetadata).toHaveLength(11);
  expect(db.tables.personProfileGraph).toHaveLength(11);
  expect(db.tables.personAccountUsage![0]).toMatchObject({ retainedProfiles: 11, packetBytes: db.tables.personProfiles.reduce((n, row) => n + packetBytes(row.packet), 0) });
  expect(db.tables.personProfiles.map(row => JSON.stringify(row.packet))).toEqual(before);
  expect(db.reads.filter(read => read.table === "personProfiles" && read.maximumBytesRead !== undefined).every(read => read.limit <= 8)).toBe(true);
  await errorCode(invoke(publicIndexPage, db, { cursor: null }), "PROJECTIONS_NOT_READY");
  await invoke(activateProjections, db);
  expect((await invoke<{ rows: unknown[] }>(publicIndexPage, db, { cursor: null })).rows).toHaveLength(11);
});

test("duplicate publishing and repeated withdrawal spend no quota or writes, including before migration", async () => {
  const db = setup(); const value = packet();
  db.tables.personProfiles!.push(source(value));
  expect(await invoke(publish, db, { token, packet: value })).toMatchObject({ changed: false, revision: 1 });
  expect(db.writes).toBe(0);
  await invoke(withdraw, db, { token, handle: value.subject.handle });
  const writes = db.writes;
  await invoke(withdraw, db, { token, handle: value.subject.handle });
  expect(db.writes).toBe(writes);
  await migrate(db);
  expect(db.tables.personProfileMetadata![0]!.isPublic).toBe(false);
  await invoke(publish, db, { token, packet: value });
  expect(db.tables.personAccountUsage![0]!.publishTokens).toBe(9);
  const restoredWrites = db.writes;
  await invoke(publish, db, { token, packet: value });
  expect(db.writes).toBe(restoredWrites);
  expect(db.tables.personProfileMetadata![0]!.isPublic).toBe(true);
  expect(db.tables.personProfileGraph![0]!.isPublic).toBe(true);
});

test("canonical UTF-8 size is enforced in direct Convex calls", async () => {
  const db = setup(); await migrate(db);
  const oversized = packet("oversized", "🦋".repeat(132_000));
  expect(packetBytes(oversized)).toBeGreaterThan(512 * 1024);
  const writes = db.writes;
  await errorCode(invoke(publish, db, { token, packet: oversized }), "LIMIT_EXCEEDED");
  expect(db.writes).toBe(writes);
  await invoke(publish, db, { token, packet: packet("ascii-body", "a".repeat(199_999)) });
  expect(db.tables.personAccountUsage![0]!.packetBytes).toBe(packetBytes(packet("ascii-body", "a".repeat(199_999))));
});

test("a shared account bucket covers both credentials, refills with time, and exempts duplicates and withdrawals", async () => {
  const db = setup(); await migrate(db);
  for (let i = 0; i < 10; i++) await invoke(publish, db, { token: i % 2 ? secondToken : token, packet: packet("example-" + i) });
  const writes = db.writes;
  expect(await errorCode(invoke(publish, db, { token: secondToken, packet: packet("eleventh") }), "RATE_LIMITED")).toMatchObject({ retryAfterMs: 60_000 });
  expect(db.writes).toBe(writes);
  await invoke(publish, db, { token, packet: packet("example-0") });
  expect(db.writes).toBe(writes);
  await invoke(withdraw, db, { token, handle: "example-0" });
  expect(db.tables.personAccountUsage![0]!.publishTokens).toBe(0);
  now += 30_000;
  expect(await errorCode(invoke(publish, db, { token, packet: packet("eleventh") }), "RATE_LIMITED")).toMatchObject({ retryAfterMs: 30_000 });
  now += 30_000;
  await invoke(publish, db, { token, packet: packet("eleventh") });
  expect(publishBucket(0, now + 1_000, now)).toMatchObject({ allowed: false, retryAfterMs: 60_000 });
});

test("retained-byte and count quotas include withdrawn profiles and cannot be bypassed by another credential", async () => {
  const db = setup(); await migrate(db);
  await invoke(publish, db, { token, packet: packet() });
  const usage = db.tables.personAccountUsage![0]!;
  usage.packetBytes = MAX_ACCOUNT_PACKET_BYTES;
  await invoke(withdraw, db, { token, handle: "example" });
  await errorCode(invoke(publish, db, { token: secondToken, packet: packet("another") }), "LIMIT_EXCEEDED");
  usage.packetBytes = packetBytes(packet()); usage.retainedProfiles = 200;
  await errorCode(invoke(publish, db, { token: secondToken, packet: packet("another") }), "LIMIT_EXCEEDED");
  expect(db.tables.personProfiles).toHaveLength(1);
});

test("grandfathered oversized packets and account totals survive migration and may shrink", async () => {
  const db = setup(); const huge = packet("example", "🦋".repeat(132_000));
  db.tables.personProfiles!.push(source(huge));
  await migrate(db);
  expect(await invoke(publish, db, { token, packet: huge })).toMatchObject({ changed: false });
  await invoke(withdraw, db, { token, handle: "example" });
  expect(await invoke(publish, db, { token, packet: huge })).toMatchObject({ changed: true, revision: 1 });
  const stillOversized = packet("example", "🦋".repeat(131_000));
  expect(packetBytes(stillOversized)).toBeGreaterThan(512 * 1024);
  await invoke(publish, db, { token, packet: stillOversized });
  await errorCode(invoke(publish, db, { token, packet: huge }), "LIMIT_EXCEEDED");
  db.tables.personAccountUsage![0]!.packetBytes = MAX_ACCOUNT_PACKET_BYTES + 1_000_000;
  await invoke(publish, db, { token: secondToken, packet: packet("example", "a".repeat(200)) });
  expect(Number(db.tables.personAccountUsage![0]!.packetBytes)).toBeLessThan(MAX_ACCOUNT_PACKET_BYTES + 1_000_000);
  expect(db.tables.personProfiles).toHaveLength(1);
});

test("metadata and graph feeds never read packet rows; pagination and withdrawal cover every published profile", async () => {
  const db = setup();
  db.tables.personProfiles = Array.from({ length: 13 }, (_, i) => source(packet("example-" + i)));
  await migrate(db); db.reads = [];
  await invoke(listOwn, db, { token });
  await invoke(listByUsername, db, { username: "editor" });
  await invoke(listAllPublic, db);
  await invoke(relationsByUsername, db, { username: "editor" });
  const first = await invoke<{ rows: unknown[]; nextCursor: string; isDone: boolean }>(publicGraphPage, db, { cursor: null });
  expect(first.rows).toHaveLength(10); expect(first.isDone).toBe(false);
  const second = await invoke<{ rows: unknown[]; nextCursor: null; isDone: boolean }>(publicGraphPage, db, { cursor: first.nextCursor });
  expect(second.rows).toHaveLength(3); expect(second.nextCursor).toBeNull(); expect(second.isDone).toBe(true);
  const index = await invoke<{ rows: Record<string, unknown>[] }>(publicIndexPage, db, { cursor: null });
  expect(index.rows).toHaveLength(13); expect(index.rows[0]).not.toHaveProperty("packet"); expect(index.rows[0]).not.toHaveProperty("relations");
  expect(db.reads.some(read => read.table === "personProfiles")).toBe(false);
  expect(db.reads.filter(read => read.table === "personProfileGraph").every(read => read.maximumBytesRead === 8 * 1024 * 1024)).toBe(true);
  await invoke(withdraw, db, { token, handle: "example-0" });
  expect((await invoke<{ rows: unknown[] }>(publicIndexPage, db, { cursor: null })).rows).toHaveLength(12);
  expect(await invoke(getPublic, db, { username: "editor", handle: "example-0" })).toBeNull();
  expect(db.reads.filter(read => read.table === "personProfiles").every(read => read.limit === 1 && read.fields.length === 2)).toBe(true);
});

test("new graph amplification is capped while oversized legacy graph shrinkage preserves exact records", async () => {
  const db = setup();
  const value = packet();
  const relation = value.relations![0]!;
  const large = parsePersonIndex({ ...value, relations: Array.from({ length: 200 }, (_, i) => ({ ...relation, id: "rel-example-" + i, note: "a".repeat(500) })) });
  db.tables.personProfiles!.push(source(large));
  await migrate(db);
  expect(Number(db.tables.personProfileMetadata![0]!.graphBytes)).toBeGreaterThan(64 * 1024);
  expect(await invoke(publish, db, { token, packet: large })).toMatchObject({ changed: false });
  const smaller = parsePersonIndex({ ...large, relations: large.relations!.slice(0, 180) });
  await invoke(publish, db, { token, packet: smaller });
  const copied = parsePersonIndex({ ...large, subject: { ...large.subject, handle: "new-large" } });
  await errorCode(invoke(publish, db, { token, packet: copied }), "LIMIT_EXCEEDED");
  expect(db.tables.personProfiles).toHaveLength(1);
  expect((db.tables.personProfileGraph![0]!.projection as { relations: unknown[] }).relations).toHaveLength(180);
});

test("pagination limits are checked within Convex before database reads", async () => {
  const db = setup();
  for (const limit of [0, 26, 1.5]) await errorCode(invoke(publicGraphPage, db, { cursor: null, limit }), "BAD_REQUEST");
  for (const limit of [0, 101, 1.5]) await errorCode(invoke(publicIndexPage, db, { cursor: null, limit }), "BAD_REQUEST");
  expect(db.reads).toHaveLength(0);
  expect(graphProjection(source(packet()) as never).packetDigest).toBe(personIndexDigest(packet()));
});

test("withdrawals between migration batches cover both already-projected and unprojected rows", async () => {
  const db = setup();
  db.tables.personProfiles = Array.from({ length: 9 }, (_, i) => source(packet("example-" + i)));
  expect(await invoke(backfillProjections, db)).toMatchObject({ processed: 8, ready: false });
  await errorCode(invoke(activateProjections, db), "PROJECTIONS_NOT_READY");
  await invoke(withdraw, db, { token, handle: "example-0" });
  await invoke(withdraw, db, { token, handle: "example-8" });
  await migrate(db);
  const page = await invoke<{ rows: { handle: string }[] }>(publicIndexPage, db, { cursor: null });
  expect(page.rows.map(row => row.handle)).not.toContain("example-0");
  expect(page.rows.map(row => row.handle)).not.toContain("example-8");
  expect(page.rows).toHaveLength(7);
  expect(db.tables.personAccountUsage![0]!.retainedProfiles).toBe(9);
  const writes = db.writes;
  await invoke(activateProjections, db);
  expect(db.writes).toBe(writes);
});

test("legacy byte budget may shorten a migration batch without skipping source rows", async () => {
  const db = setup();
  db.tables.personProfiles = Array.from({ length: 8 }, (_, i) => source(packet("huge-" + i, "🦋".repeat(132_000))));
  const first = await invoke<{ processed: number; ready: boolean }>(backfillProjections, db);
  expect(first.processed).toBeLessThan(8); expect(first.ready).toBe(false);
  await migrate(db);
  expect(db.tables.personProfileMetadata).toHaveLength(8);
  expect(db.tables.personAccountUsage![0]!.retainedProfiles).toBe(8);
  expect(db.reads.filter(read => read.table === "personProfiles" && read.maximumBytesRead !== undefined)
    .every(read => read.maximumBytesRead === 4 * 1024 * 1024)).toBe(true);
});

test("replacement removes stale optional identity metadata instead of retaining old joins", async () => {
  const db = setup(); await migrate(db);
  const withIdentity = parsePersonIndex({ ...packet(), subject: { ...packet().subject, identity: { wikidataId: "Q123" } } });
  await invoke(publish, db, { token, packet: withIdentity });
  expect(db.tables.personProfileMetadata![0]!.wikidataId).toBe("Q123");
  const noIdentity = { ...withIdentity, subject: {
    kind: withIdentity.subject.kind, handle: withIdentity.subject.handle,
    displayName: withIdentity.subject.displayName, summary: withIdentity.subject.summary,
  } };
  await invoke(publish, db, { token, packet: noIdentity });
  expect(db.tables.personProfileMetadata![0]).not.toHaveProperty("wikidataId");
  expect(db.tables.personProfileGraph![0]!.projection).not.toHaveProperty("wikidataId");
});

test("publisher graph pagination covers a valid account above the single-query eight-MiB ceiling", async () => {
  const db = setup();
  const base = packet();
  const largeGraphPacket = parsePersonIndex({
    ...base, body: "A public source-backed summary. ".repeat(10),
    relations: Array.from({ length: 60 }, (_, i) => ({ ...base.relations![0]!, id: "rel-scaled-" + i, note: "a".repeat(400) })),
  });
  db.tables.personProfiles = Array.from({ length: 200 }, (_, i) => source(parsePersonIndex({
    ...largeGraphPacket, subject: { ...largeGraphPacket.subject, handle: "example-" + i },
  })));
  await migrate(db);
  expect(Number(db.tables.personAccountUsage![0]!.packetBytes)).toBeLessThan(MAX_ACCOUNT_PACKET_BYTES);
  expect(db.tables.personProfileMetadata!.reduce((sum, row) => sum + Number(row.graphBytes), 0)).toBeGreaterThan(8 * 1024 * 1024);
  db.reads = [];
  const handles: string[] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 9; i++) {
    const page: { rows: { handle: string }[]; nextCursor: string | null; isDone: boolean } = await invoke(relationsByUsernamePage, db, { username: "editor", cursor });
    expect(page.rows.length).toBeLessThanOrEqual(25);
    handles.push(...page.rows.map(row => row.handle));
    cursor = page.nextCursor;
    if (page.isDone) break;
  }
  expect(cursor).toBeNull(); expect(new Set(handles).size).toBe(200);
  expect(db.reads.some(read => read.table === "personProfiles")).toBe(false);
});

test("publisher page generations detect mutations between pages and stay stable for true no-ops", async () => {
  const db = setup();
  db.tables.personProfiles = Array.from({ length: 26 }, (_, i) => source(packet("example-" + i)));
  await migrate(db);
  const first = await invoke<{ generation: number; nextCursor: string }>(relationsByUsernamePage, db, { username: "editor", cursor: null });
  expect(first.generation).toBe(0);
  await invoke(publish, db, { token, packet: packet("example-0") });
  expect(db.tables.personPublisherVersions).toHaveLength(0);
  await invoke(withdraw, db, { token, handle: "example-0" });
  const next = await invoke<{ generation: number }>(relationsByUsernamePage, db, { username: "editor", cursor: first.nextCursor });
  expect(next.generation).toBe(1); expect(next.generation).not.toBe(first.generation);
  await invoke(withdraw, db, { token, handle: "example-0" });
  expect(db.tables.personPublisherVersions![0]!.generation).toBe(1);
  await invoke(publish, db, { token, packet: packet("example-0") });
  expect(db.tables.personPublisherVersions![0]!.generation).toBe(2);
});

test("a credential username change advances both old and new publisher generations", async () => {
  const db = setup(); await migrate(db);
  await invoke(publish, db, { token, packet: packet() });
  db.tables.publishCredentials![0]!.username = "renamed_editor";
  await invoke(publish, db, { token, packet: packet("example", "A changed public biography. ".repeat(20)) });
  expect(db.tables.personPublisherVersions!.find(row => row.username === "editor")!.generation).toBe(2);
  expect(db.tables.personPublisherVersions!.find(row => row.username === "renamed_editor")!.generation).toBe(1);
  expect((await invoke<{ rows: unknown[] }>(relationsByUsernamePage, db, { username: "editor", cursor: null })).rows).toHaveLength(0);
  expect((await invoke<{ rows: unknown[] }>(relationsByUsernamePage, db, { username: "renamed_editor", cursor: null })).rows).toHaveLength(1);
});
