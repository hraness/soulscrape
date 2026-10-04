import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { ConvexError } from "convex/values";
import { parsePersonIndex, parseProductIndex, personIndexDigest, type PersonIndex } from "../../skills/soulscrape/scripts/person-index";
import { publishTokenDigest } from "../lib/device-shared";
import { backfillProjections, activateProjections, getPublic, publish, withdraw } from "../convex/people";
import { profileJsonLd, publicRowToProfile } from "../lib/profile-view";
import { activateKnowledgeIndex, backfillKnowledgeIndex, knowledgeIndexStatus, lookupKnowledge,
  activateKnowledgeSections, backfillKnowledgeSections, knowledgeSectionsStatus,
  createReviewedSubject, bindReviewedSubject, unbindReviewedSubject, renameReviewedSubject,
  correctReviewedBinding, reviewedProfileKey, searchCandidates } from "../convex/knowledge";
import { knowledgeMemberships, MAX_KNOWLEDGE_MEMBERSHIPS } from "../convex/_knowledgeStore";
import { publish as publishSection, getPublic as getPublicSection, listPublic as listPublicSections } from "../convex/sections";

type Row = { _id: string; [key: string]: unknown };
class MemoryDatabase {
  tables: Record<string, Row[]> = Object.fromEntries([
    "publishCredentials", "personProfiles", "personProfileMetadata", "personProfileGraph", "personAccountUsage",
    "personProjectionState", "personPublisherVersions", "knowledgeMemberships", "knowledgeProjectionState",
    "reviewedSubjects", "reviewedBindings", "reviewedDecisionHistory", "dossierSectionDocuments", "dossierSectionHeads",
  ].map(name => [name, []]));
  writes = 0;
  reads: { table: string; limit: number; maximumBytesRead?: number }[] = [];
  private next = 0;
  query(table: string) {
    const filters: ((row: Row) => boolean)[] = [];
    const builder = { eq: (field: string, value: unknown) => { filters.push(row => row[field] === value); return builder; } };
    const matching = () => this.tables[table]!.filter(row => filters.every(filter => filter(row)));
    const note = (limit: number, maximumBytesRead?: number) => this.reads.push({ table, limit, maximumBytesRead });
    const query = {
      withIndex: (_: string, selector: (value: typeof builder) => unknown) => { selector(builder); return query; },
      first: async () => { note(1); return matching()[0] ?? null; },
      take: async (limit: number) => { note(limit); return matching().slice(0, limit); },
      paginate: async ({ cursor, numItems, maximumRowsRead, maximumBytesRead }: {
        cursor: string | null; numItems: number; maximumRowsRead: number; maximumBytesRead: number;
      }) => {
        note(maximumRowsRead, maximumBytesRead);
        const all = matching(); const offset = Number(cursor ?? 0); const page: Row[] = [];
        let bytes = 0;
        for (const row of all.slice(offset, offset + Math.min(numItems, maximumRowsRead))) {
          const size = new TextEncoder().encode(JSON.stringify(row)).byteLength;
          if (page.length > 0 && bytes + size > maximumBytesRead) break;
          bytes += size;
          page.push(row);
        }
        const next = offset + page.length;
        return { page, isDone: next >= all.length, continueCursor: String(next) };
      },
    };
    return query;
  }
  async get(id: string) { return Object.values(this.tables).flat().find(row => row._id === id) ?? null; }
  async insert(table: string, value: Record<string, unknown>) {
    this.writes++;
    const id = `row-${++this.next}`;
    this.tables[table]!.push({ _id: id, ...value });
    return id;
  }
  async patch(id: string, value: Record<string, unknown>) {
    this.writes++;
    const row = await this.get(id);
    if (row === null) throw new Error("Missing test row.");
    for (const [key, item] of Object.entries(value)) {
      if (item === undefined) delete row[key]; else row[key] = item;
    }
  }
  async replace(id: string, value: Record<string, unknown>) {
    this.writes++;
    const row = await this.get(id);
    if (row === null) throw new Error("Missing test row.");
    for (const key of Object.keys(row)) if (key !== "_id") delete row[key];
    Object.assign(row, value);
  }
  async delete(id: string) {
    this.writes++;
    for (const rows of Object.values(this.tables)) {
      const index = rows.findIndex(row => row._id === id);
      if (index !== -1) { rows.splice(index, 1); return; }
    }
    throw new Error("Missing test row.");
  }
}

async function invoke<T = unknown>(registered: unknown, db: MemoryDatabase, args: Record<string, unknown> = {}): Promise<T> {
  return (registered as { _handler(ctx: { db: MemoryDatabase }, args: Record<string, unknown>): Promise<T> })._handler({ db }, args);
}

const fixture: PersonIndex = parsePersonIndex(JSON.parse(readFileSync(
  new URL("../../examples/people/eugene-tssui/person-index.json", import.meta.url), "utf8")));
const token = "spt_" + "a".repeat(48);
const secondToken = "spt_" + "b".repeat(48);
function setup() {
  const db = new MemoryDatabase();
  db.tables.publishCredentials!.push(...[token, secondToken].map((value, index) => ({ _id: `credential-${index}`,
    tokenDigest: publishTokenDigest(value), accountId: `account-${index}`, username: index === 0 ? "alice" : "bravo" })));
  return db;
}
function packet(handle = "eugene-tssui", options: { qid?: string; body?: string; kind?: "person" | "organization" } = {}): PersonIndex {
  return parsePersonIndex({ ...structuredClone(fixture),
    subject: { kind: options.kind ?? "person", handle,
      displayName: fixture.subject.displayName, summary: fixture.subject.summary,
      ...(options.qid === undefined ? {} : { identity: { wikidataId: options.qid } }) },
    ...(options.body === undefined ? {} : { body: options.body }) });
}
async function migrateOriginal(db: MemoryDatabase) {
  for (let index = 0; index < 100; index++) {
    if ((await invoke<{ ready: boolean }>(backfillProjections, db)).ready) {
      await invoke(activateProjections, db);
      return;
    }
  }
  throw new Error("Original migration did not converge.");
}
async function expectError(operation: Promise<unknown>, code: string) {
  try { await operation; throw new Error("Expected rejection."); }
  catch (error) {
    expect(error).toBeInstanceOf(ConvexError);
    expect((error as ConvexError<{ code: string }>).data.code).toBe(code);
  }
}

test("publication creates bounded subject, source and relation memberships without storing bodies", () => {
  const value = packet("eugene-tssui", { qid: "Q5407800" });
  const row = { accountId: "account-0", username: "alice", handle: value.subject.handle,
    displayName: value.subject.displayName, summary: value.subject.summary,
    packetDigest: personIndexDigest(value), revision: 1, packet: value, publishedAtMs: 1, updatedAtMs: 1 };
  const memberships = knowledgeMemberships(row);
  expect(memberships.length).toBeGreaterThan(value.sources.length);
  expect(memberships.length).toBeLessThanOrEqual(MAX_KNOWLEDGE_MEMBERSHIPS);
  expect(memberships.filter(member => member.role === "primary")).toHaveLength(1);
  expect(memberships.filter(member => member.role === "citation")).toHaveLength(value.sources.length);
  expect(memberships.filter(member => member.role === "reference").length).toBeGreaterThan(0);
  expect(memberships.find(member => member.role === "reference" && member.recordId === value.relations?.[0]?.id))
    .toMatchObject({ targetHandle: value.relations![0]!.target, targetName: value.relations![0]!.targetName });
  expect(JSON.stringify(memberships)).not.toContain(value.body);
  expect(memberships.every(member => member.packetDigest === row.packetDigest && member.revision === 1)).toBe(true);
});

test("migration covers old packets in bounded resumable batches before readers activate", async () => {
  const db = setup(); await migrateOriginal(db);
  for (let i = 0; i < 5; i++) await invoke(publish, db, { token, packet: packet(`subject-${i}`, { qid: "Q5407800" }) });
  expect(db.tables.knowledgeMemberships).toHaveLength(0);
  const firstPacket = packet("subject-0", { qid: "Q5407800" });
  const key = knowledgeMemberships({ username: "alice", handle: "subject-0", packet: firstPacket,
    packetDigest: personIndexDigest(firstPacket), revision: 1 })[0]!.key;
  await expectError(invoke(lookupKnowledge, db, { key, cursor: null }), "PROJECTIONS_NOT_READY");
  await expectError(invoke(activateKnowledgeIndex, db), "PROJECTIONS_NOT_READY");
  db.reads = [];
  const first = await invoke<{ processed: number; ready: boolean }>(backfillKnowledgeIndex, db);
  expect(first).toMatchObject({ processed: 2, ready: false });
  const checkpoint = await invoke<{ processed: number; ready: boolean }>(backfillKnowledgeIndex, db);
  expect(checkpoint).toMatchObject({ processed: 2, ready: false });
  const last = await invoke<{ processed: number; ready: boolean }>(backfillKnowledgeIndex, db);
  expect(last).toMatchObject({ processed: 1, ready: true });
  expect(await invoke(knowledgeIndexStatus, db)).toMatchObject({ ready: true, activated: false, hasUnprojectedRows: false });
  const count = db.writes;
  expect(await invoke(backfillKnowledgeIndex, db)).toMatchObject({ processed: 0, ready: true });
  expect(db.writes).toBe(count);
  await invoke(activateKnowledgeIndex, db);
  expect((await invoke<{ rows: unknown[] }>(lookupKnowledge, db, { key, cursor: null })).rows).toHaveLength(4);
  const second = await invoke<{ rows: unknown[]; nextCursor: string | null }>(lookupKnowledge, db, { key, cursor: "4" });
  expect(second.rows).toHaveLength(1);
  expect(second.nextCursor).toBeNull();
  expect(db.reads.filter(read => read.table === "personProfiles" && read.maximumBytesRead !== undefined)
    .every(read => read.maximumBytesRead === 2 * 1024 * 1024)).toBe(true);
});

test("publication, update, withdrawal and restoration reconcile public memberships", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const first = packet("example-person", { qid: "Q42" });
  const other = packet("another-person", { qid: "Q42" });
  const result = await invoke<{ changed: boolean }>(publish, db, { token, packet: first });
  expect(result.changed).toBe(true);
  await invoke(publish, db, { token: secondToken, packet: other });
  const key = (db.tables.knowledgeMemberships!.find(row => row.role === "primary")!).key;
  const read = () => invoke<{ rows: { username: string; packetDigest: string; revision: number;
    claimCount: number; asOf: string; claims: { id: string; kind: string; text: string; sourceIds: readonly string[] }[] }[] }>(lookupKnowledge, db, { key, cursor: null });
  expect((await read()).rows.map(row => row.username)).toEqual(["alice", "bravo"]);
  const preview = (await read()).rows.find(row => row.username === "alice")!;
  expect(preview.claimCount).toBe(first.claims.length);
  expect(preview.asOf).toBe(first.scope.asOf);
  expect(preview.claims).toEqual(first.claims.slice(0, 8));
  expect(JSON.stringify(preview)).not.toContain(first.body);
  const writes = db.writes;
  await invoke(publish, db, { token, packet: first });
  expect(db.writes).toBe(writes);
  const changed = packet("example-person", { qid: "Q42", body: "A revised public biography. ".repeat(20) });
  await invoke(publish, db, { token, packet: changed });
  expect((await read()).rows.find(row => row.username === "alice")!.packetDigest).toBe(personIndexDigest(changed));
  expect((await read()).rows.find(row => row.username === "alice")!.revision).toBe(2);
  await invoke(withdraw, db, { token, handle: "example-person" });
  expect((await read()).rows.map(row => row.username)).toEqual(["bravo"]);
  const unchanged = db.writes;
  await invoke(withdraw, db, { token, handle: "example-person" });
  expect(db.writes).toBe(unchanged);
  await invoke(publish, db, { token, packet: changed });
  expect((await read()).rows.map(row => row.username).sort()).toEqual(["alice", "bravo"]);
});

test("reviewed bindings group only selected live publications and can be split without rewriting packets", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const first = packet("example-person", { qid: "Q42" });
  const other = packet("another-person", { qid: "Q42" });
  await invoke(publish, db, { token, packet: first });
  await invoke(publish, db, { token: secondToken, packet: other });
  const review = { reviewer: "staff-test", reason: "Compared the cited public records and their named subjects." };
  const create = { ...review, operationId: "a".repeat(32), kind: "person", label: "Reviewed example person" };
  const created = await invoke<{ key: string; revision: number }>(createReviewedSubject, db, create);
  expect(created.key).toMatch(/^subject-[a-f0-9]{64}$/u);
  const before = db.writes;
  expect(await invoke(createReviewedSubject, db, create)).toMatchObject({ key: created.key, revision: 1, changed: false });
  expect(db.writes).toBe(before);
  await expectError(invoke(createReviewedSubject, db, { ...create, label: "A different subject" }), "BAD_REQUEST");
  const firstId = db.tables.personProfiles!.find(row => row.username === "alice")!._id;
  const otherId = db.tables.personProfiles!.find(row => row.username === "bravo")!._id;
  const firstBinding = { ...review, operationId: "b".repeat(32), profileId: firstId, key: created.key,
    expectedRevision: 0, expectedProfileRevision: 1, expectedPacketDigest: personIndexDigest(first),
    sourceIds: [first.sources[0]!.id] };
  await expectError(invoke(bindReviewedSubject, db, { ...firstBinding, sourceIds: ["source-" + "f".repeat(20)] }), "BAD_REQUEST");
  expect(await invoke(bindReviewedSubject, db, firstBinding)).toMatchObject({ revision: 1, changed: true });
  await expectError(invoke(bindReviewedSubject, db, { ...firstBinding, operationId: "d".repeat(32) }), "BAD_REQUEST");
  const secondBinding = { ...firstBinding, operationId: "c".repeat(32), profileId: otherId,
    expectedPacketDigest: personIndexDigest(other), sourceIds: [other.sources[0]!.id] };
  await invoke(bindReviewedSubject, db, secondBinding);
  const read = () => invoke<{ rows: { username: string }[]; reviewed: { label: string; revision: number } }>(lookupKnowledge, db,
    { key: created.key, cursor: null });
  expect((await read()).rows.map(row => row.username)).toEqual(["alice", "bravo"]);
  expect((await read()).reviewed.label).toBe("Reviewed example person");
  expect(await invoke<string | null>(reviewedProfileKey, db, { username: "alice", handle: "example-person",
    packetDigest: personIndexDigest(first), revision: 1 })).toBe(created.key);
  expect(db.tables.reviewedDecisionHistory).toHaveLength(3);
  const rename = { ...review, operationId: "e".repeat(32), key: created.key, expectedRevision: 1,
    label: "Renamed reviewed subject" };
  await invoke(renameReviewedSubject, db, rename);
  expect(db.tables.reviewedSubjects![0]!.aliases).toEqual(["Reviewed example person"]);
  expect((await read()).reviewed).toMatchObject({ label: "Renamed reviewed subject", revision: 2 });
  await invoke(withdraw, db, { token, handle: "example-person" });
  expect((await read()).rows.map(row => row.username)).toEqual(["bravo"]);
  expect(await invoke<string | null>(reviewedProfileKey, db, { username: "alice", handle: "example-person",
    packetDigest: personIndexDigest(first), revision: 1 })).toBeNull();
  const unbind = { ...review, operationId: "f".repeat(32), profileId: otherId, key: created.key, expectedRevision: 1 };
  expect(await invoke(unbindReviewedSubject, db, unbind)).toMatchObject({ revision: 2, changed: true });
  expect((await read()).rows).toHaveLength(0);
  await expectError(invoke(unbindReviewedSubject, db, { ...unbind, operationId: "1".repeat(32) }), "BAD_REQUEST");
  await invoke(publish, db, { token, packet: first });
  expect((await read()).rows.map(row => row.username)).toEqual(["alice"]);
  const changed = packet("example-person", { qid: "Q42", body: "A corrected public dossier. ".repeat(20) });
  await invoke(publish, db, { token, packet: changed });
  expect((await read()).rows).toHaveLength(0);
  expect(db.tables.reviewedBindings).toHaveLength(2);
});

test("reviewed corrections are revision-pinned, attributed, idempotent and reversible", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const first = packet("example-person");
  await invoke(publish, db, { token, packet: first });
  const profileId = db.tables.personProfiles![0]!._id;
  const review = { reviewer: "staff-test", reason: "Compared both cited subject identities and corrected a mistaken binding." };
  const original = await invoke<{ key: string }>(createReviewedSubject, db,
    { ...review, operationId: "a".repeat(32), kind: "person", label: "Original subject" });
  const replacement = await invoke<{ key: string }>(createReviewedSubject, db,
    { ...review, operationId: "b".repeat(32), kind: "person", label: "Corrected subject" });
  const binding = { ...review, operationId: "c".repeat(32), profileId, key: original.key,
    expectedRevision: 0, expectedProfileRevision: 1, expectedPacketDigest: personIndexDigest(first),
    sourceIds: [first.sources[0]!.id] };
  await invoke(bindReviewedSubject, db, binding);
  await expectError(invoke(bindReviewedSubject, db, { ...binding, operationId: "f".repeat(32),
    key: replacement.key, expectedRevision: 1 }), "BAD_REQUEST");
  const correction = { ...binding, operationId: "d".repeat(32), fromKey: original.key,
    key: replacement.key, expectedRevision: 1 };
  await expectError(invoke(correctReviewedBinding, db, { ...correction, expectedRevision: 0 }), "BAD_REQUEST");
  await expectError(invoke(correctReviewedBinding, db, { ...correction, sourceIds: ["source-" + "f".repeat(20)] }), "BAD_REQUEST");
  expect(await invoke(correctReviewedBinding, db, correction)).toMatchObject({ key: replacement.key, revision: 2, changed: true });
  const after = db.writes;
  expect(await invoke(correctReviewedBinding, db, correction)).toMatchObject({ key: replacement.key, revision: 2, changed: false });
  expect(db.writes).toBe(after);
  await expectError(invoke(correctReviewedBinding, db, { ...correction, key: original.key }), "BAD_REQUEST");
  expect(await invoke<string | null>(reviewedProfileKey, db, { username: "alice", handle: "example-person",
    packetDigest: personIndexDigest(first), revision: 1 })).toBe(replacement.key);
  expect(db.tables.reviewedDecisionHistory!.find(row => row.operationId === correction.operationId)).toMatchObject({
    action: "correct", key: replacement.key, previousKey: original.key, profileId, revision: 2,
    reviewer: review.reviewer, sourceIds: correction.sourceIds });
  expect((await invoke<{ rows: unknown[] }>(lookupKnowledge, db, { key: original.key, cursor: null })).rows).toHaveLength(0);
  expect((await invoke<{ rows: { username: string }[] }>(lookupKnowledge, db,
    { key: replacement.key, cursor: null })).rows.map(row => row.username)).toEqual(["alice"]);
  const reverse = { ...correction, operationId: "e".repeat(32), fromKey: replacement.key,
    key: original.key, expectedRevision: 2 };
  expect(await invoke(correctReviewedBinding, db, reverse)).toMatchObject({ key: original.key, revision: 3, changed: true });
  expect(await invoke<string | null>(reviewedProfileKey, db, { username: "alice", handle: "example-person",
    packetDigest: personIndexDigest(first), revision: 1 })).toBe(original.key);
  expect(db.tables.personProfiles![0]!.packet).toEqual(first);
});

test("product profiles publish under their own contract, retain attribution, and cannot bind to organizations", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const source = fixture.sources[0]!;
  const product = parseProductIndex({ schemaVersion: "soulscrape.product-index.v1", indexId: "pidx-example-product",
    generatedAt: fixture.generatedAt, subject: { kind: "product", handle: "example-product",
      displayName: "Example Product", summary: "A product with source-backed public research.",
      identity: { wikidataId: "Q42" } },
    scope: fixture.scope, sources: [source], claims: [{ id: "claim-product", kind: "fact",
      text: "The source discusses a product.", sourceIds: [source.id] }],
    body: "A dated public-source product dossier. ".repeat(8), provenance: { tool: "soulscrape" } });
  await expectError(invoke(publish, db, { token, packet: { ...product,
    schemaVersion: "soulscrape.person-index.v1" } }), "PACKET_INVALID");
  await invoke(publish, db, { token, packet: product });
  await invoke(publish, db, { token: secondToken, packet: parseProductIndex({ ...product,
    body: "A second publisher's dated product dossier. ".repeat(8) }) });
  const view = publicRowToProfile(await invoke(getPublic, db, { username: "alice", handle: "example-product" }));
  expect(view?.packet.subject.kind).toBe("product");
  expect(view?.packetDigest).toBe(personIndexDigest(product));
  expect((profileJsonLd(view!) as { mainEntity: { "@type": string } }).mainEntity["@type"]).toBe("Product");
  const primary = knowledgeMemberships({ username: "alice", handle: "example-product",
    packetDigest: personIndexDigest(product), revision: 1, packet: product })
    .find(row => row.role === "primary")!;
  expect(primary.subjectKind).toBe("product");
  const company = packet("example-organization", { kind: "organization", qid: "Q42" });
  expect(knowledgeMemberships({ username: "alice", handle: company.subject.handle,
    packetDigest: personIndexDigest(company), revision: 1, packet: company })
    .find(row => row.role === "primary")?.key).not.toBe(primary.key);
  expect((await invoke<{ rows: { subjectKind: string }[] }>(searchCandidates, db,
    { phrase: "Example", kind: "product", cursor: null })).rows[0]?.subjectKind).toBe("product");
  expect((await invoke<{ rows: { username: string; subjectKind: string }[] }>(lookupKnowledge, db,
    { key: primary.key, cursor: null })).rows.map(row => `${row.username}:${row.subjectKind}`))
    .toEqual(["alice:product", "bravo:product"]);
  const organization = await invoke<{ key: string }>(createReviewedSubject, db,
    { operationId: "a".repeat(32), reviewer: "reviewer", reason: "Different subject kind", kind: "organization", label: "Example Company" });
  await expectError(invoke(bindReviewedSubject, db, { operationId: "b".repeat(32), reviewer: "reviewer",
    reason: "Wrong product kind", profileId: db.tables.personProfiles![0]!._id, key: organization.key,
    expectedRevision: 0, expectedProfileRevision: 1, expectedPacketDigest: personIndexDigest(product),
    sourceIds: [source.id] }), "BAD_REQUEST");
  const section = { schemaVersion: "soulscrape.dossier-section.v1",
    profileUrl: "https://soulscrape.com/alice/example-product", packetDigest: personIndexDigest(product),
    profileRevision: 1, subjectKind: "product", id: "history", title: "Product history",
    body: "A longer, source-backed account of the product.",
    provenance: { source: "hraness", originalUrl: "https://hraness.com/example-product/history",
      originalRevision: "3".repeat(64) }, anchors: [], sources: [], records: [] };
  expect(await invoke(publishSection, db, { token, section })).toMatchObject({ changed: true });
  expect((await invoke<{ section: { subjectKind: string } }>(getPublicSection, db,
    { username: "alice", handle: "example-product", sectionId: "history" })).section.subjectKind).toBe("product");
  await expectError(invoke(publishSection, db, { token, section: { ...section, subjectKind: "organization" } }),
    "BAD_REQUEST");
});

test("a shared name, citation URL and QID cannot bind a person to an organization's reviewed identity", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const organization = packet("example-organization", { kind: "organization", qid: "Q42" });
  const person = packet("example-person", { kind: "person", qid: "Q42" });
  await invoke(publish, db, { token, packet: organization });
  await invoke(publish, db, { token: secondToken, packet: person });
  const review = { reviewer: "staff-test", reason: "Read the distinct public subject kinds and cited source records." };
  const { key } = await invoke<{ key: string }>(createReviewedSubject, db, {
    ...review, operationId: "8".repeat(32), kind: "organization", label: "An organization" });
  const orgId = db.tables.personProfiles!.find(row => row.username === "alice")!._id;
  const personId = db.tables.personProfiles!.find(row => row.username === "bravo")!._id;
  const proposed = { ...review, operationId: "9".repeat(32), key, expectedRevision: 0,
    expectedProfileRevision: 1, profileId: orgId, expectedPacketDigest: personIndexDigest(organization),
    sourceIds: [organization.sources[0]!.id] };
  await invoke(bindReviewedSubject, db, proposed);
  await expectError(invoke(bindReviewedSubject, db, { ...proposed, operationId: "0".repeat(32),
    profileId: personId, expectedPacketDigest: personIndexDigest(person), sourceIds: [person.sources[0]!.id] }), "BAD_REQUEST");
  expect((await invoke<{ rows: { username: string }[] }>(lookupKnowledge, db, { key, cursor: null })).rows
    .map(row => row.username)).toEqual(["alice"]);
  expect(await invoke(reviewedProfileKey, db, { username: "bravo", handle: "example-person",
    packetDigest: personIndexDigest(person), revision: 1 })).toBeNull();
  expect((await invoke<{ rows: { username: string; match: string }[] }>(searchCandidates, db,
    { phrase: "eugene", cursor: null })).rows.map(row => row.match)).toEqual([
    "label-suggestion", "label-suggestion",
  ]);
});

test("full dossier sections publish idempotently, preserve revisions, and fail closed after withdrawal or packet updates", async () => {
  const db = setup(); await migrateOriginal(db);
  const first = packet("example-person");
  await invoke(publish, db, { token, packet: first });
  const section = { schemaVersion: "soulscrape.dossier-section.v1",
    profileUrl: "https://soulscrape.com/alice/example-person", packetDigest: personIndexDigest(first), profileRevision: 1, subjectKind: "person",
    id: "history", title: "History", body: "# History\n\nA complete public section.",
    provenance: { source: "hraness", originalUrl: "https://hraness.com/example-person/history",
      originalRevision: "3".repeat(64) },
    anchors: [{ id: "origin", title: "Origins", originalUrl: "https://hraness.com/example-person/history#origin" }],
    sources: [{ id: "source-" + "1".repeat(20), originalId: "src-original", title: "Original source",
      url: "https://example.com/record", publisher: "Example", type: "primary",
      published: { text: "1980s", precision: "decade" } }],
    records: [{ id: "event-one", kind: "timeline", label: "An original claim",
      originalUrl: "https://hraness.com/example-person/history#origin", sourceIds: ["source-" + "1".repeat(20)],
      confidence: "reported", original: { detail: "An original report with its evidence." } }] };
  const publishArgs = { token, section };
  expect(await invoke(publishSection, db, publishArgs)).toMatchObject({ changed: true, sectionId: "history" });
  const writes = db.writes;
  expect(await invoke(publishSection, db, publishArgs)).toMatchObject({ changed: false });
  expect(db.writes).toBe(writes);
  const readArgs = { username: "alice", handle: "example-person", sectionId: "history" };
  const read = () => invoke<{ section: { body: string; sources: { published: { text: string } }[] } }>(getPublicSection, db, readArgs);
  expect((await read()).section.sources[0]!.published.text).toBe("1980s");
  expect((await invoke<{ sections: { id: string; title: string; href: string }[] }>(listPublicSections, db, readArgs)).sections).toEqual([
    { id: "history", title: "History", href: "/alice/example-person/sections/history" },
  ]);
  expect(db.tables.dossierSectionDocuments).toHaveLength(1);
  await invoke(publishSection, db, { token, section: { ...section, body: "A corrected public section." } });
  expect((await read()).section.body).toBe("A corrected public section.");
  expect(db.tables.dossierSectionDocuments).toHaveLength(2);
  expect((db.tables.dossierSectionDocuments![0]!.document as { body: string }).body).toBe(section.body);
  const retained = db.tables.dossierSectionDocuments![1]!.document;
  db.tables.dossierSectionDocuments![1]!.document = { ...section, hidden: "unadmitted content" };
  expect(await read()).toBeNull();
  expect(await invoke(listPublicSections, db, readArgs)).toBeNull();
  await expectError(invoke(publishSection, db, { token, section: { ...section, body: "A corrected public section." } }),
    "PROJECTIONS_NOT_READY");
  db.tables.dossierSectionDocuments![1]!.document = retained;
  await invoke(withdraw, db, { token, handle: "example-person" });
  expect(await read()).toBeNull();
  await invoke(publish, db, { token, packet: first });
  expect((await read()).section.body).toBe("A corrected public section.");
  const changed = packet("example-person", { body: "A corrected public profile. ".repeat(20) });
  await invoke(publish, db, { token, packet: changed });
  expect(await read()).toBeNull();
  expect((await invoke<{ sections: unknown[] }>(listPublicSections, db, readArgs)).sections).toEqual([]);
  await expectError(invoke(publishSection, db, publishArgs), "BAD_REQUEST");
  await invoke(publish, db, { token, packet: first });
  expect(await read()).toBeNull();
  await expectError(invoke(publishSection, db, publishArgs), "BAD_REQUEST");
  expect((await invoke<{ changed: boolean }>(publishSection, db, { token, section: { ...section, profileRevision: 3 } })).changed).toBe(true);
  expect((await read()).section.body).toBe(section.body);
  expect(db.tables.dossierSectionDocuments).toHaveLength(3);
});

test("long-form sources join shared hubs only after bounded backfill and explicit activation", async () => {
  const db = setup(); await migrateOriginal(db);
  const first = packet("example-person");
  await invoke(publish, db, { token, packet: first });
  const source = { id: "source-" + "1".repeat(20), originalId: "original-one", title: "An original report",
    url: "https://example.com/section-report?utm_source=archive", publisher: "Example", type: "primary",
    published: { text: "1980s", precision: "decade" } };
  const section = { schemaVersion: "soulscrape.dossier-section.v1", profileUrl: "https://soulscrape.com/alice/example-person",
    packetDigest: personIndexDigest(first), profileRevision: 1, subjectKind: "person", id: "history", title: "History",
    body: "A dated report in the public section.", provenance: { source: "hraness",
      originalUrl: "https://hraness.com/example-person/history", originalRevision: "3".repeat(64) },
    anchors: [], sources: [source, { ...source, id: "source-" + "2".repeat(20), originalId: "original-two" }], records: [] };
  await invoke(publishSection, db, { token, section });
  expect(db.tables.knowledgeMemberships).toHaveLength(0);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  await expectError(invoke(activateKnowledgeSections, db), "PROJECTIONS_NOT_READY");
  const before = await invoke<{ ready: boolean; activated: boolean; hasUnprojectedRows: boolean }>(knowledgeSectionsStatus, db);
  expect(before).toMatchObject({ ready: false, activated: false, hasUnprojectedRows: true });
  const firstBatch = await invoke<{ processed: number; ready: boolean }>(backfillKnowledgeSections, db);
  expect(firstBatch).toMatchObject({ processed: 1, ready: true });
  const stored = db.tables.knowledgeMemberships!.filter(row => row.role === "section_citation");
  expect(stored).toHaveLength(2);
  expect(stored[0]!.key).toBe(stored[1]!.key);
  const read = () => invoke<{ rows: { role: string; sectionId?: string; sourceId?: string;
    sectionSource?: { published: { text: string }; originalId: string } }[]; sectionSourcesReady: boolean }>(lookupKnowledge, db,
    { key: stored[0]!.key, cursor: null });
  expect((await read()).rows).toHaveLength(0);
  await invoke(activateKnowledgeSections, db);
  expect((await read()).rows.map(row => row.sourceId)).toEqual([source.id, "source-" + "2".repeat(20)]);
  expect((await read()).sectionSourcesReady).toBe(true);
  expect((await read()).rows[0]!.sectionSource).toMatchObject({ originalId: "original-one", published: { text: "1980s" } });
  const filtered = await invoke<{ rows: { sourceId: string }[] }>(lookupKnowledge, db,
    { key: stored[0]!.key, cursor: null, publisher: "alice", limit: 1 });
  expect(filtered.rows).toHaveLength(1);
  expect((await invoke<{ rows: unknown[] }>(lookupKnowledge, db,
    { key: stored[0]!.key, cursor: null, publisher: "bravo" })).rows).toHaveLength(0);
  const count = db.writes;
  expect(await invoke(backfillKnowledgeSections, db)).toMatchObject({ processed: 0, ready: true });
  expect(db.writes).toBe(count);
  delete db.tables.dossierSectionHeads![0]!.knowledgeProjectionVersion;
  expect((await read()).sectionSourcesReady).toBe(false);
  expect((await read()).rows).toHaveLength(0);
  expect(await invoke(backfillKnowledgeSections, db)).toMatchObject({ processed: 1, ready: true });
  expect((await read()).rows).toHaveLength(2);
  expect(db.tables.knowledgeMemberships!.filter(row => row.role === "section_citation")).toHaveLength(2);
});

test("section backfill advances in batches of two and shared resource pagination retains every occurrence", async () => {
  const db = setup(); await migrateOriginal(db);
  const profile = packet("example-person");
  await invoke(publish, db, { token, packet: profile });
  for (let index = 0; index < 5; index++) {
    await invoke(publishSection, db, { token, section: {
      schemaVersion: "soulscrape.dossier-section.v1", profileUrl: "https://soulscrape.com/alice/example-person",
      packetDigest: personIndexDigest(profile), profileRevision: 1, subjectKind: "person",
      id: `history-${index}`, title: `History ${index}`, body: "A source occurrence in a long-form section.",
      provenance: { source: "hraness", originalUrl: `https://hraness.com/example-person/history-${index}`,
        originalRevision: "3".repeat(64) }, anchors: [],
      sources: [{ id: "source-" + String(index + 1).repeat(20), originalId: `original-${index}`,
        title: `Report ${index}`, url: "https://example.com/report?utm_source=mirror", publisher: "Example",
        type: "primary", published: { text: "2020", precision: "year" } }], records: [],
    } });
  }
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  db.reads = [];
  expect(await invoke(backfillKnowledgeSections, db)).toMatchObject({ processed: 2, ready: false });
  expect(await invoke(backfillKnowledgeSections, db)).toMatchObject({ processed: 2, ready: false });
  expect(await invoke(backfillKnowledgeSections, db)).toMatchObject({ processed: 1, ready: true });
  expect(db.reads.filter(read => read.table === "dossierSectionHeads" && read.limit > 2)).toHaveLength(0);
  await invoke(activateKnowledgeSections, db);
  const key = db.tables.knowledgeMemberships!.find(row => row.role === "section_citation")!.key;
  const first = await invoke<{ rows: { sectionId: string }[]; nextCursor: string | null }>(lookupKnowledge, db,
    { key, cursor: null });
  expect(first.rows.map(row => row.sectionId)).toEqual(["history-0", "history-1", "history-2", "history-3"]);
  expect(first.nextCursor).not.toBeNull();
  const last = await invoke<{ rows: { sectionId: string }[]; isDone: boolean }>(lookupKnowledge, db,
    { key, cursor: first.nextCursor });
  expect(last.rows.map(row => row.sectionId)).toEqual(["history-4"]);
  expect(last.isDone).toBe(true);
});

test("section source backlinks follow current section and profile revisions and never expose withdrawn content", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  await invoke(backfillKnowledgeSections, db); await invoke(activateKnowledgeSections, db);
  const first = packet("example-person");
  await invoke(publish, db, { token, packet: first });
  const source = { id: "source-" + "1".repeat(20), originalId: "original-one", title: "Original report",
    url: "https://example.com/report-one", publisher: "Example", type: "primary",
    published: { text: "2020", precision: "year" } };
  const section = { schemaVersion: "soulscrape.dossier-section.v1", profileUrl: "https://soulscrape.com/alice/example-person",
    packetDigest: personIndexDigest(first), profileRevision: 1, subjectKind: "person", id: "history", title: "History",
    body: "An original public section.", provenance: { source: "hraness", originalUrl: "https://hraness.com/example-person/history",
      originalRevision: "3".repeat(64) }, anchors: [], sources: [source], records: [] };
  const resource = () => db.tables.knowledgeMemberships!.find(row => row.role === "section_citation"
    && row.sectionId === "history" && row.sourceId === source.id)?.key as string;
  await invoke(publishSection, db, { token, section });
  const oldKey = resource();
  const read = (key: string) => invoke<{ rows: { role: string; sectionId?: string; sectionSource?: { url: string } }[] }>(lookupKnowledge, db,
    { key, cursor: null });
  expect((await read(oldKey)).rows.map(row => row.sectionSource?.url)).toEqual([source.url]);
  const updated = { ...section, sources: [{ ...source, url: "https://example.com/report-two" }] };
  await invoke(publishSection, db, { token, section: updated });
  const nextKey = resource();
  expect(nextKey).not.toBe(oldKey);
  expect((await read(oldKey)).rows).toHaveLength(0);
  expect((await read(nextKey)).rows[0]!.sectionSource?.url).toBe(updated.sources[0]!.url);
  const document = db.tables.dossierSectionDocuments!.at(-1)!;
  const original = document.document;
  document.document = { ...updated, body: "Changed without matching the digest" };
  expect((await read(nextKey)).rows).toHaveLength(0);
  document.document = original;
  await invoke(withdraw, db, { token, handle: "example-person" });
  expect((await read(nextKey)).rows).toHaveLength(0);
  await invoke(publish, db, { token, packet: first });
  expect((await read(nextKey)).rows).toHaveLength(1);
  const changed = packet("example-person", { body: "New profile revision. ".repeat(20) });
  await invoke(publish, db, { token, packet: changed });
  expect((await read(nextKey)).rows).toHaveLength(0);
  await invoke(publishSection, db, { token, section: { ...updated,
    packetDigest: personIndexDigest(changed), profileRevision: 2 } });
  expect((await read(nextKey)).rows).toHaveLength(1);
  await invoke(publishSection, db, { token, section: { ...updated,
    packetDigest: personIndexDigest(changed), profileRevision: 2,
    sources: [{ ...source, url: first.sources[0]!.url }] } });
  const sharedKey = db.tables.knowledgeMemberships!.find(row => row.role === "citation"
    && row.sourceId === first.sources[0]!.id && row.username === "alice")!.key as string;
  expect(resource()).toBe(sharedKey);
  expect((await read(sharedKey)).rows.map(row => row.role)).toEqual(["citation", "section_citation"]);
  expect((await read(nextKey)).rows).toHaveLength(0);
});

test("backfill skips a retained section superseded by a different current subject kind", async () => {
  const db = setup(); await migrateOriginal(db);
  const first = packet("example-person");
  await invoke(publish, db, { token, packet: first });
  const section = { schemaVersion: "soulscrape.dossier-section.v1", profileUrl: "https://soulscrape.com/alice/example-person",
    packetDigest: personIndexDigest(first), profileRevision: 1, subjectKind: "person", id: "history", title: "History",
    body: "An old person section.", provenance: { source: "hraness",
      originalUrl: "https://hraness.com/example-person/history", originalRevision: "3".repeat(64) },
    anchors: [], sources: [{ id: "source-" + "1".repeat(20), originalId: "original-one", title: "Report",
      url: "https://example.com/old-report", publisher: "Example", type: "primary",
      published: { text: "2020", precision: "year" } }], records: [] };
  await invoke(publishSection, db, { token, section });
  await invoke(publish, db, { token, packet: packet("example-person", { kind: "organization" }) });
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  expect(await invoke(backfillKnowledgeSections, db)).toMatchObject({ processed: 1, ready: true });
  expect(db.tables.knowledgeMemberships!.filter(row => row.role === "section_citation")).toHaveLength(0);
  await invoke(activateKnowledgeSections, db);
  expect((await invoke<{ sections: unknown[] }>(listPublicSections, db,
    { username: "alice", handle: "example-person" })).sections).toEqual([]);
});

test("section publication requires an owned current profile, a valid complete document and shared storage capacity", async () => {
  const db = setup(); await migrateOriginal(db);
  const first = packet("example-person");
  await invoke(publish, db, { token, packet: first });
  const section = { schemaVersion: "soulscrape.dossier-section.v1",
    profileUrl: "https://soulscrape.com/alice/example-person", packetDigest: personIndexDigest(first), profileRevision: 1, subjectKind: "person",
    id: "history", title: "History", body: "A public section",
    provenance: { source: "hraness", originalUrl: "https://hraness.com/example-person/history",
      originalRevision: "3".repeat(64) }, anchors: [], sources: [], records: [] };
  await expectError(invoke(publishSection, db, { token: secondToken, section }), "UNAUTHORIZED");
  await expectError(invoke(publishSection, db, { token, section: { ...section, packetDigest: "f".repeat(64) } }), "BAD_REQUEST");
  await expectError(invoke(publishSection, db, { token, section: { ...section, notes: "not selected" } }), "PACKET_INVALID");
  await expectError(invoke(publishSection, db, { token, section: { ...section, subjectKind: "product" } }), "BAD_REQUEST");
  db.tables.personAccountUsage![0]!.packetBytes = 20 * 1024 * 1024;
  await expectError(invoke(publishSection, db, { token, section }), "LIMIT_EXCEEDED");
  expect(db.tables.dossierSectionDocuments).toHaveLength(0);
});

test("public candidate search keeps same-name publishers separate and never includes withdrawn profiles", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const alice = packet("example-person");
  const bravo = packet("another-person");
  const company = packet("example-organization", { kind: "organization" });
  await invoke(publish, db, { token, packet: alice });
  await invoke(publish, db, { token: secondToken, packet: bravo });
  await invoke(publish, db, { token, packet: company });
  const read = (args: Record<string, unknown> = {}) => invoke<{ rows: { username: string; subjectKind: string; match: string }[];
    nextCursor: string | null; isDone: boolean }>(searchCandidates, db, { phrase: "eugene", cursor: null, ...args });
  const all = await read();
  expect(all.rows.map(row => row.username)).toEqual(["alice", "bravo", "alice"]);
  expect(all.rows.map(row => row.match)).toEqual(["label-suggestion", "label-suggestion", "label-suggestion"]);
  expect((await read({ kind: "organization" })).rows.map(row => row.subjectKind)).toEqual(["organization"]);
  expect((await read({ publisher: "bravo" })).rows.map(row => row.username)).toEqual(["bravo"]);
  expect((await read({ sourceId: alice.sources[0]!.id, asOf: "2026-09-16" })).rows).toHaveLength(3);
  expect((await read({ sourceId: "source-" + "f".repeat(20) })).rows).toHaveLength(0);
  expect((await read({ asOf: "2026-09-17" })).rows).toHaveLength(0);
  const large = db.tables.personProfileMetadata!.find(row => row.username === "alice" && row.handle === "example-person")!;
  const packetBytes = large.packetBytes;
  large.packetBytes = 512 * 1024 + 1;
  expect((await read({ asOf: "2026-09-16" })).rows.map(row => row.username)).toEqual(["bravo", "alice"]);
  large.packetBytes = packetBytes;
  const first = await read({ limit: 1 });
  expect(first.rows).toHaveLength(1);
  expect(first.isDone).toBe(false);
  expect((await read({ limit: 1, cursor: first.nextCursor })).rows).toHaveLength(1);
  await invoke(withdraw, db, { token, handle: "example-person" });
  expect((await read()).rows).toHaveLength(2);
  await expectError(read({ phrase: "x" }), "BAD_REQUEST");
  await expectError(read({ publisher: "../../alice" }), "BAD_REQUEST");
  await expectError(read({ sourceId: "unknown" }), "BAD_REQUEST");
  await expectError(read({ asOf: "2026-02-30" }), "BAD_REQUEST");
});

test("publisher-scoped lookup paginates only that publisher and validates the filter", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const first = packet("example-person", { qid: "Q42" });
  const second = packet("another-person", { qid: "Q42" });
  await invoke(publish, db, { token, packet: first });
  await invoke(publish, db, { token: secondToken, packet: second });
  const key = (db.tables.knowledgeMemberships!.find(row => row.role === "primary")!).key;
  const alice = await invoke<{ rows: { username: string }[]; nextCursor: string | null }>(lookupKnowledge, db,
    { key, cursor: null, limit: 1, publisher: "alice" });
  expect(alice.rows.map(row => row.username)).toEqual(["alice"]);
  expect(alice.nextCursor).toBeNull();
  const bravo = await invoke<{ rows: { username: string }[] }>(lookupKnowledge, db,
    { key, cursor: null, publisher: "bravo" });
  expect(bravo.rows.map(row => row.username)).toEqual(["bravo"]);
  await expectError(invoke(lookupKnowledge, db, { key, cursor: null, publisher: "ALICE" }), "BAD_REQUEST");
  await expectError(invoke(lookupKnowledge, db, { key, cursor: null, publisher: "../../alice" }), "BAD_REQUEST");
});

test("source URL joins retain original source IDs and hide withdrawn publishers", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const base = packet("example-person");
  const first = parsePersonIndex({ ...base, sources: base.sources.map((item, index) => index === 0
    ? { ...item, notes: "Catalog notes not needed in shared lookup.", authors: ["Example Writer"] } : item) });
  const other = packet("another-person");
  await invoke(publish, db, { token, packet: first }); await invoke(publish, db, { token: secondToken, packet: other });
  const shared = db.tables.knowledgeMemberships!.find(row => row.role === "citation" && row.sourceId === first.sources[0]!.id)!;
  const key = shared.key;
  const rows = (await invoke<{ rows: { username: string; sourceId?: string; sourceOrdinal?: number; source?: { id: string; title: string; url: string } }[] }>(lookupKnowledge, db, { key, cursor: null })).rows;
  expect(rows.map(row => row.username)).toEqual(["alice", "bravo"]);
  expect(first.sources.some(source => source.id === rows[0]!.sourceId)).toBe(true);
  expect(rows[1]!.sourceId).toBe(rows[0]!.sourceId);
  const source = rows[0]!.source!;
  const originalSource = first.sources.find(item => item.id === rows[0]!.sourceId)!;
  expect(source).toMatchObject({ id: originalSource.id, title: originalSource.title, url: originalSource.url });
  expect(rows[0]!.sourceOrdinal).toBe(1);
  expect(source).not.toHaveProperty("notes");
  expect(source).not.toHaveProperty("authors");
  await invoke(withdraw, db, { token, handle: "example-person" });
  expect((await invoke<{ rows: { username: string }[] }>(lookupKnowledge, db, { key, cursor: null })).rows.map(row => row.username)).toEqual(["bravo"]);
});

test("public lookups omit a row whose stored packet changes without a digest update", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const original = packet("example-person", { qid: "Q42" });
  await invoke(publish, db, { token, packet: original });
  const key = db.tables.knowledgeMemberships!.find(row => row.role === "primary")!.key;
  expect((await invoke<{ rows: unknown[] }>(lookupKnowledge, db, { key, cursor: null })).rows).toHaveLength(1);
  db.tables.personProfiles![0]!.packet = packet("example-person", { qid: "Q42", body: "A changed but uncommitted body. ".repeat(20) });
  expect((await invoke<{ rows: unknown[] }>(lookupKnowledge, db, { key, cursor: null })).rows).toHaveLength(0);
});

test("readiness fails closed if a retained source loses its projection marker, then recovers without touching the packet", async () => {
  const db = setup(); await migrateOriginal(db);
  await invoke(backfillKnowledgeIndex, db); await invoke(activateKnowledgeIndex, db);
  const value = packet("example-person", { qid: "Q42" });
  await invoke(publish, db, { token, packet: value });
  const originalBytes = JSON.stringify(db.tables.personProfiles![0]!.packet);
  const key = db.tables.knowledgeMemberships!.find(row => row.role === "primary")!.key;
  delete db.tables.personProfiles![0]!.knowledgeProjectionVersion;
  expect(await invoke(knowledgeIndexStatus, db)).toMatchObject({ ready: false, hasUnprojectedRows: true });
  await expectError(invoke(lookupKnowledge, db, { key, cursor: null }), "PROJECTIONS_NOT_READY");
  expect(await invoke(backfillKnowledgeIndex, db)).toMatchObject({ processed: 1, ready: true });
  expect((await invoke<{ rows: unknown[] }>(lookupKnowledge, db, { key, cursor: null })).rows).toHaveLength(1);
  expect(JSON.stringify(db.tables.personProfiles![0]!.packet)).toBe(originalBytes);
});

test("public lookup rejects malformed bounds before any database read", async () => {
  const db = setup();
  for (const candidate of ["wrong", "resource-" + "x".repeat(64), "subject-" + "0".repeat(65)]) {
    await expectError(invoke(lookupKnowledge, db, { key: candidate, cursor: null }), "BAD_REQUEST");
  }
  await expectError(invoke(lookupKnowledge, db, { key: "subject-" + "0".repeat(64), cursor: null, limit: 5 }), "BAD_REQUEST");
  expect(db.reads).toHaveLength(0);
});
