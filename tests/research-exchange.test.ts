import { afterEach, describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import {
  cpSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync,
  symlinkSync, truncateSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import {
  RESEARCH_EXCHANGE_MAX_BYTES,
  RESEARCH_EXCHANGE_MAX_CLAIMS,
  RESEARCH_EXCHANGE_MAX_CLAIM_REFERENCES,
  RESEARCH_EXCHANGE_MAX_SOURCES,
  RESEARCH_EXCHANGE_SCHEMA_VERSION,
  RESEARCH_INPUT_MAX_BYTES,
  RESEARCH_OMITTED_COLLECTIONS,
  exportResearch,
  exportResearchFile,
  exportResearchJson,
} from "../skills/soulscrape/scripts/export-research.ts";
import {
  PERSON_INDEX_MAX_BODY_BYTES, PacketValidationError, parsePersonIndex, personIndexDigest,
  stablePersonSourceId,
} from "../skills/soulscrape/scripts/person-index.ts";
import { canonicalBytes, canonicalText, strictJsonParse } from "../skills/soulscrape/scripts/source-packet.ts";

const ROOT = resolve(import.meta.dir, "..");
const PROFILE_URL = "https://soulscrape.com/test_publisher/example-person";
const temporaries: string[] = [];

afterEach(() => {
  for (const directory of temporaries.splice(0)) rmSync(directory, { recursive: true, force: true });
});

function temporary(): string {
  const directory = realpathSync(mkdtempSync(join(tmpdir(), "soulscrape-research-test-")));
  temporaries.push(directory);
  return directory;
}

function source(index = 0, publishedAt?: string) {
  const url = `https://example.test/public/${index}?utm_source=fixture#section`;
  return {
    id: stablePersonSourceId(url, publishedAt),
    binding: "first_person",
    mediaType: "article",
    title: `Public source ${index}`,
    url,
    publisher: "Synthetic Publisher",
    accessedAt: "2026-01-01T10:20:30.123+01:00",
    ...(publishedAt === undefined ? {} : { publishedAt }),
    authors: ["Example Person"],
    language: "en",
    notes: "Catalog metadata is not a claim or a rights receipt.",
  };
}

function fixture() {
  const sources = [source(0, "2024")];
  const sourceIds = [sources[0]!.id];
  return {
    schemaVersion: "soulscrape.person-index.v1",
    indexId: "pidx-example-person",
    generatedAt: "2026-01-02T12:00:00Z",
    subject: {
      kind: "person",
      handle: "example-person",
      displayName: "Example Person",
      summary: "Uncited subject summary must not become an exchange claim.",
      identity: { wikidataId: "Q42", officialSite: "https://example.test", profiles: [PROFILE_URL] },
    },
    scope: { asOf: "2026-01-01T12:00:00Z", coverage: ["public research"] },
    sources,
    claims: ["fact", "stated_belief", "pattern", "speculation"].map((kind, index) => ({
      id: `claim-${index}`, kind, text: `Synthetic ${kind} claim.`, sourceIds: [...sourceIds],
    })),
    timeline: [{ id: "event-work", kind: "project", date: "2024-02", title: "A project", sourceIds }],
    themes: [{ id: "theme-work", kind: "practice", status: "stated", title: "Practice", summary: "A practice.", sourceIds }],
    works: [{ id: "work-book", kind: "book", status: "published", title: "A book", sourceIds }],
    appearances: [{ id: "appearance-talk", title: "A talk", sourceIds }],
    relations: [{ id: "rel-peer", kind: "collaborated", target: "example-peer", targetName: "Example Peer", sourceIds }],
    openQuestions: ["An unresolved question."],
    body: "Synthetic public body omitted from exchange projection. ".repeat(6),
    provenance: { tool: "soulscrape", method: "Synthetic fixture, not human review." },
  };
}

function withCounts(sourceCount: number, claimCount: number, references: number) {
  const packet = fixture();
  packet.sources = Array.from({ length: sourceCount }, (_, index) => source(index, "2024"));
  packet.claims = Array.from({ length: claimCount }, (_, index) => ({
    id: `claim-${index}`, kind: "fact", text: "x",
    sourceIds: packet.sources.slice(0, references).map(entry => entry.id),
  }));
  return packet;
}

function writePacket(directory: string, bytes: string | Uint8Array = JSON.stringify(fixture())): string {
  const path = join(directory, "person index.json");
  writeFileSync(path, bytes, { mode: 0o600 });
  return path;
}

function cli(args: readonly string[], cwd = ROOT, script = join(ROOT, "skills/soulscrape/scripts/export-research.ts")) {
  return Bun.spawnSync({
    cmd: [process.execPath, script, ...args], cwd,
    env: { ...process.env, NODE_PATH: "" },
    stdout: "pipe", stderr: "pipe", timeout: 10_000,
  });
}


/** Keep copied-runtime waits outside Bun's synchronous test watchdog path. */
async function smokeProcess(args: readonly string[], cwd: string) {
  const child = Bun.spawn({
    cmd: [process.execPath, ...args], cwd,
    env: { ...process.env, NODE_PATH: "" },
    stdin: "ignore", stdout: "pipe", stderr: "pipe",
    timeout: 30_000, killSignal: "SIGKILL",
  });
  try {
    const [exitCode, stdout, stderr] = await Promise.all([
      child.exited,
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
    ]);
    return { exitCode, stdout, stderr };
  } finally {
    if (child.exitCode === null) {
      child.kill("SIGKILL");
      await child.exited;
    }
  }
}

function installedRuntimeProbe(installedRoot: string, consumer: string, importFirst?: string) {
  // Exercise the real synchronous package verifier, including its independent
  // source-ID/digest expectations and existing ten-second child deadlines.
  const script = `
    const { verifyInstalledResearchRuntime } = await import(${JSON.stringify(join(ROOT, "scripts/package-smoke.ts"))});
    ${importFirst === undefined ? "" : `await import(${JSON.stringify(importFirst)}); process.stdout.write("importable\\n");`}
    verifyInstalledResearchRuntime(${JSON.stringify(installedRoot)}, ${JSON.stringify(consumer)});
    process.stdout.write("verified\\n");
  `;
  return smokeProcess(["-e", script], consumer);
}

describe("exact bounded research projection", () => {
  test("frozen fields preserve epistemic labels and omit uncited and unmapped data", () => {
    const packet = fixture();
    const before = canonicalText(packet);
    const exchange = exportResearch(packet, PROFILE_URL);
    expect(exchange).toEqual({
      schemaVersion: "soulscrape.research-exchange.v1",
      profileUrl: PROFILE_URL,
      packetDigest: personIndexDigest(parsePersonIndex(packet)),
      generatedAt: packet.generatedAt,
      asOf: packet.scope.asOf,
      subject: { kind: "person", handle: "example-person", displayName: "Example Person", wikidataId: "Q42" },
      sources: packet.sources.map(({ id, binding, mediaType, title, url, publisher, accessedAt, publishedAt }) => ({
        id, binding, mediaType, title, url, publisher, accessedAt,
        ...(publishedAt === undefined ? {} : { publishedAt }),
      })),
      claims: packet.claims,
      omittedCollections: ["timeline", "themes", "works", "appearances", "relations", "openQuestions", "body"],
    });
    expect(canonicalText(packet)).toBe(before);
    expect(exchange.claims.map(claim => claim.kind)).toEqual(["fact", "stated_belief", "pattern", "speculation"]);
    expect(JSON.stringify(exchange)).not.toContain(packet.subject.summary);
    expect(JSON.stringify(exchange)).not.toContain(packet.provenance.method);
    expect(RESEARCH_EXCHANGE_SCHEMA_VERSION).toBe("soulscrape.research-exchange.v1");
    expect(RESEARCH_EXCHANGE_MAX_BYTES).toBe(524_288);
    expect(RESEARCH_EXCHANGE_MAX_SOURCES).toBe(256);
    expect(RESEARCH_EXCHANGE_MAX_CLAIMS).toBe(256);
    expect(RESEARCH_EXCHANGE_MAX_CLAIM_REFERENCES).toBe(16);
    expect(Object.isFrozen(RESEARCH_OMITTED_COLLECTIONS)).toBe(true);
    packet.claims[0]!.text = "changed input";
    packet.claims[0]!.sourceIds.push("unknown");
    expect(exchange.claims[0]!.text).not.toBe("changed input");
    expect(exchange.claims[0]!.sourceIds).toHaveLength(1);
  });

  test("optional identity and source date remain absent; organizations remain organizations", () => {
    const packet = fixture();
    const { identity: _, ...subject } = packet.subject;
    const undated = source(0, undefined);
    const value = {
      ...packet, subject: { ...subject, kind: "organization" }, sources: [undated],
      claims: [], timeline: [], themes: [], works: [], appearances: [], relations: [],
    };
    const exchange = exportResearch(value, PROFILE_URL);
    expect(exchange.subject).toEqual({ kind: "organization", handle: "example-person", displayName: "Example Person" });
    expect(Object.hasOwn(exchange.sources[0]!, "publishedAt")).toBe(false);
    expect(exchange.claims).toEqual([]);
  });

  test("serialization is canonical and commits to every original packet field", () => {
    const packet = fixture();
    const reversed = Object.fromEntries(Object.entries(packet).reverse());
    const json = exportResearchJson(packet, PROFILE_URL);
    expect(exportResearchJson(reversed, PROFILE_URL)).toBe(json);
    expect(json).toBe(canonicalText(strictJsonParse(json)));
    expect(() => exportResearchJson(strictJsonParse(json), PROFILE_URL)).toThrow(PacketValidationError);
  });

  test("omitted body changes only the external packet commitment", () => {
    const packet = fixture();
    const before = exportResearch(packet, PROFILE_URL);
    const originalDigest = createHash("sha256").update(canonicalBytes(packet)).digest("hex");
    packet.body += " More context.";
    const after = exportResearch(packet, PROFILE_URL);
    expect(after.packetDigest).not.toBe(before.packetDigest);
    expect({ ...after, packetDigest: before.packetDigest }).toEqual(before);
    expect(before.packetDigest).toBe(originalDigest);
  });

  test("research export rejects chronologically inverted v1 timestamps without changing v1 parsing", () => {
    const packet = fixture();
    packet.generatedAt = "2026-09-15T10:23:45.123456+02:00";
    (packet.scope as Record<string, unknown>).asOf = "2026-09-15T10:23:45.123455-02:00";
    expect(parsePersonIndex(packet).scope.asOf).toBe("2026-09-15T10:23:45.123455-02:00");
    expect(() => exportResearch(packet, PROFILE_URL)).toThrow(/as an instant/u);
  });

  test("the explicit publisher may differ, but the handle must match and cannot be inferred", () => {
    expect(exportResearch(fixture(), "https://soulscrape.com/another_publisher/example-person").profileUrl)
      .toBe("https://soulscrape.com/another_publisher/example-person");
    for (const profile of [undefined, null, "", "https://soulscrape.com/test_publisher/another-person", "https://soulscrape.com/test_publisher/example-person?x=1"]) {
      expect(() => exportResearch(fixture(), profile)).toThrow(/profileUrl/u);
    }
  });

  test("all full-packet fields are parsed before omission", () => {
    const packet = fixture();
    const invalid: unknown[] = [
      { ...packet, unknown: true },
      { ...packet, subject: { ...packet.subject, unknown: true } },
      { ...packet, subject: { ...packet.subject, identity: { other: "Q42" } } },
      { ...packet, scope: { ...packet.scope, unknown: true } },
      { ...packet, sources: [{ ...packet.sources[0], unknown: true }] },
      { ...packet, claims: [{ ...packet.claims[0], unknown: true }] },
      { ...packet, timeline: [{ ...packet.timeline[0], kind: "acquired" }] },
      { ...packet, themes: [{ ...packet.themes[0], status: "verified" }] },
      { ...packet, works: [{ ...packet.works[0], sourceIds: ["source-ffffffffffffffffffff"] }] },
      { ...packet, appearances: [{ ...packet.appearances[0], publishedAt: "2023-02-29" }] },
      { ...packet, relations: [{ ...packet.relations[0], target: "../private" }] },
      { ...packet, openQuestions: [""] },
      { ...packet, body: "too short" },
      { ...packet, provenance: { ...packet.provenance, reviewed: true } },
    ];
    for (const value of invalid) {
      expect(() => exportResearch(value, PROFILE_URL)).toThrow(PacketValidationError);
    }
  });

  test("I-JSON and string limits are inherited even for omitted fields", () => {
    const packet = fixture();
    for (const value of [undefined, 1.5, NaN, Infinity, 9_007_199_254_740_992, 1n, Symbol("x"), new Date(), () => {}, "\ud800"]) {
      expect(() => exportResearch({ ...packet, provenance: { tool: value } }, PROFILE_URL)).toThrow(PacketValidationError);
    }
    for (const [field, maximum] of [["displayName", 200], ["summary", 600]] as const) {
      expect(() => exportResearch({ ...packet, subject: { ...packet.subject, [field]: "x".repeat(maximum + 1) } }, PROFILE_URL)).toThrow(/length/u);
    }
    for (const [field, maximum] of [["title", 500], ["url", 2048], ["publisher", 200]] as const) {
      expect(() => exportResearch({ ...packet, sources: [{ ...packet.sources[0], [field]: "x".repeat(maximum + 1) }] }, PROFILE_URL)).toThrow(/length/u);
    }
    expect(() => exportResearch({ ...packet, claims: [{ ...packet.claims[0], text: "x".repeat(2001) }] }, PROFILE_URL)).toThrow(/length/u);
  });

  test("cyclic in-memory input fails with a typed validation error", () => {
    const cycle: Record<string, unknown> = {};
    cycle.self = cycle;
    expect(() => exportResearch({ ...fixture(), provenance: cycle }, PROFILE_URL)).toThrow(PacketValidationError);
  });

  test("deep in-memory input is bounded before full validation", () => {
    let nested: unknown = null;
    for (let index = 0; index < 10_000; index += 1) nested = [nested];
    expect(() => exportResearch({ ...fixture(), provenance: nested }, PROFILE_URL)).toThrow(/JSON nesting limit/u);
  });

  test("sparse arrays fail with a typed validation error even in omitted collections", () => {
    expect(() => exportResearch({ ...fixture(), timeline: new Array(1) }, PROFILE_URL)).toThrow(PacketValidationError);
  });

  test("non-JSON array members and accessor properties are rejected, never silently omitted or invoked", () => {
    for (const key of ["extra", Symbol("extra")]) {
      const packet = fixture();
      Object.defineProperty(packet.claims, key, { value: undefined, enumerable: true });
      expect(() => exportResearch(packet, PROFILE_URL)).toThrow(PacketValidationError);
    }
    let reads = 0;
    const packet = fixture();
    Object.defineProperty(packet.subject, "displayName", { get() { reads += 1; return "Example Person"; } });
    expect(() => exportResearch(packet, PROFILE_URL)).toThrow(PacketValidationError);
    expect(reads).toBe(0);
    for (const member of [packet.subject, packet.claims]) {
      const proxy = new Proxy(member, { ownKeys() { throw new Error("must not inspect a proxy"); } });
      expect(() => exportResearch({ ...fixture(), provenance: proxy }, PROFILE_URL)).toThrow(PacketValidationError);
    }
    const hidden = fixture();
    Object.defineProperty(hidden.provenance, "hidden", { value: undefined });
    expect(() => exportResearch(hidden, PROFILE_URL)).toThrow(PacketValidationError);
  });

  test("oversized in-memory strings are rejected at the byte boundary before schema traversal", () => {
    expect(() => exportResearch({ ...fixture(), body: "x".repeat(RESEARCH_INPUT_MAX_BYTES + 1) }, PROFILE_URL))
      .toThrow(/4 MiB/u);
  });

  test("in-memory canonical byte budget is exact for escaped strings and shared references", () => {
    const base = fixture();
    const packet = {
      ...base,
      timeline: Array.from({ length: 200 }, (_, index) => ({
        ...base.timeline[0]!, id: `event-${index}`, summary: "x",
      })),
      works: Array.from({ length: 200 }, (_, index) => ({
        ...base.works[0]!, id: `work-${index}`, summary: "x",
      })),
    };
    let remaining = RESEARCH_INPUT_MAX_BYTES - canonicalBytes(packet).byteLength;
    for (const record of [...packet.timeline, ...packet.works]) {
      const count = Math.min(2000, Math.floor((remaining + 1) / 6));
      if (count === 0) break;
      record.summary = "\0".repeat(count);
      remaining -= count * 6 - 1;
    }
    expect(remaining).toBeGreaterThanOrEqual(0);
    packet.body += "x".repeat(remaining);
    expect(canonicalBytes(packet).byteLength).toBe(RESEARCH_INPUT_MAX_BYTES);
    expect(() => exportResearch(packet, PROFILE_URL)).not.toThrow();
    expect(exportResearchJson(Object.fromEntries(Object.entries(packet).reverse()), PROFILE_URL))
      .toBe(exportResearchJson(packet, PROFILE_URL));
    packet.body += "x";
    expect(() => parsePersonIndex(packet)).not.toThrow();
    expect(() => exportResearch(packet, PROFILE_URL)).toThrow(/4 MiB/u);
  });

  test("source identity, duplicate IDs and reference resolution are not relaxed", () => {
    const packet = fixture();
    const invalid = [
      { ...packet, sources: [packet.sources[0], packet.sources[0]] },
      { ...packet, sources: [{ ...packet.sources[0], id: "source-ffffffffffffffffffff" }] },
      { ...packet, sources: [{ ...packet.sources[0], transcriptOf: "source-ffffffffffffffffffff" }] },
      { ...packet, claims: [packet.claims[0], packet.claims[0]] },
      { ...packet, claims: [{ ...packet.claims[0], id: "claim--bad" }] },
      { ...packet, claims: [{ ...packet.claims[0], id: "claim-" + "a".repeat(59) }] },
      { ...packet, claims: [{ ...packet.claims[0], sourceIds: [] }] },
      { ...packet, claims: [{ ...packet.claims[0], sourceIds: [packet.sources[0]!.id, packet.sources[0]!.id] }] },
      { ...packet, claims: [{ ...packet.claims[0], sourceIds: ["source-ffffffffffffffffffff"] }] },
      { ...packet, claims: [{ ...packet.claims[0], kind: "verified" }] },
    ];
    for (const value of invalid) expect(() => exportResearch(value, PROFILE_URL)).toThrow(PacketValidationError);
  });

  test("source URL validation stays distinct from the stricter profile locator", () => {
    const packet = fixture();
    for (const url of ["javascript:alert(1)", "file:///etc/passwd", "https://user:secret@example.test/public", "not a URL"]) {
      expect(() => exportResearch({ ...packet, sources: [{ ...packet.sources[0], url }] }, PROFILE_URL)).toThrow(/sources\[0\]\.url/u);
    }
    expect(exportResearch(packet, PROFILE_URL).sources[0]!.url).toBe(packet.sources[0]!.url);
  });

  test("maximum strings count Unicode code points rather than UTF-16 units", () => {
    const packet = fixture();
    packet.subject.displayName = "\ud835\udc00".repeat(200);
    packet.sources[0]!.title = "\ud835\udc00".repeat(500);
    packet.sources[0]!.publisher = "\ud835\udc00".repeat(200);
    packet.claims[0]!.text = "\ud835\udc00".repeat(2000);
    const exchange = exportResearch(packet, PROFILE_URL);
    expect(exchange.subject.displayName).toBe(packet.subject.displayName);
    expect(exchange.claims[0]!.text).toBe(packet.claims[0]!.text);
  });

  test("partial source dates and timestamp precision remain verbatim", () => {
    const packet = withCounts(4, 1, 4);
    packet.sources = ["2024", "2024-02", "2024-02-29", "0001-01-01"].map((date, index) => source(index, date));
    packet.claims[0]!.sourceIds = packet.sources.map(entry => entry.id);
    packet.timeline = [];
    packet.themes = [];
    packet.works = [];
    packet.appearances = [];
    packet.relations = [];
    const exchange = exportResearch(packet, PROFILE_URL);
    expect(exchange.sources.map(entry => entry.publishedAt)).toEqual(["2024", "2024-02", "2024-02-29", "0001-01-01"]);
    expect(exchange.sources[0]!.accessedAt).toBe("2026-01-01T10:20:30.123+01:00");
    for (const date of ["0000", "2023-02-29", "2024-13", "2024-04-31", "2024-01-00", "2024-1", "2024-01-01T00:00:00Z"]) {
      expect(() => exportResearch({ ...fixture(), sources: [source(0, date)] }, PROFILE_URL)).toThrow(/publishedAt/u);
    }
    for (const date of ["2026-02-30T00:00:00Z", "2026-01-01T24:00:00Z", "2026-01-01T00:00:60Z", "2026-01-01T00:00:00+24:00"]) {
      expect(() => exportResearch({ ...fixture(), generatedAt: date }, PROFILE_URL)).toThrow(/generatedAt/u);
    }
    expect(() => exportResearch({ ...fixture(), scope: { asOf: "2027-01-01T00:00:00Z" } }, PROFILE_URL)).toThrow(/scope.asOf/u);
  });

  test("timestamp and arbitrary text strings retain full precision without trimming or normalization", () => {
    const packet = fixture();
    const timestamp = `2026-01-01T00:00:00.${"1".repeat(74)}-00:00`;
    expect(timestamp.length).toBe(100);
    packet.generatedAt = timestamp;
    packet.scope.asOf = timestamp;
    packet.sources[0]!.accessedAt = timestamp;
    packet.claims[0]!.text = " \0\r\n\t e\u0301 \u2028\u2029 ";
    const exchange = exportResearch(packet, PROFILE_URL);
    expect(exchange.generatedAt).toBe(timestamp);
    expect(exchange.asOf).toBe(timestamp);
    expect(exchange.sources[0]!.accessedAt).toBe(timestamp);
    expect(exchange.claims[0]!.text).toBe(packet.claims[0]!.text);
    expect<unknown>(strictJsonParse(exportResearchJson(packet, PROFILE_URL))).toEqual(exchange);
    expect(() => exportResearch({ ...packet, generatedAt: timestamp.replace(".1", ".11") }, PROFILE_URL))
      .toThrow(/length/u);
    for (const suffix of ["\n", "\r", "\r\n", "\u2028", "\u2029", " "]) {
      expect(() => exportResearch({ ...fixture(), generatedAt: fixture().generatedAt + suffix }, PROFILE_URL))
        .toThrow(/generatedAt/u);
      expect(() => exportResearch({ ...fixture(), sources: [source(0, "2024" + suffix)] }, PROFILE_URL))
        .toThrow(/publishedAt/u);
    }
  });

  test("exchange counts reject overflow, without narrowing the full packet validator", () => {
    expect(exportResearch(withCounts(256, 256, 16), PROFILE_URL).claims).toHaveLength(256);
    for (const packet of [withCounts(257, 1, 1), withCounts(1, 257, 1), withCounts(17, 1, 17)]) {
      expect(() => parsePersonIndex(packet)).not.toThrow();
      expect(() => exportResearch(packet, PROFILE_URL)).toThrow(/research exchange limit/u);
    }
    expect(PERSON_INDEX_MAX_BODY_BYTES).toBe(512 * 1024);
  });

  test("canonical byte ceiling is inclusive, not a character or pretty-print limit", () => {
    const packet = withCounts(1, 256, 1);
    let remaining = RESEARCH_EXCHANGE_MAX_BYTES - canonicalBytes(exportResearch(packet, PROFILE_URL)).byteLength;
    for (const claim of packet.claims) {
      const extra = Math.min(1999, remaining);
      claim.text += "x".repeat(extra);
      remaining -= extra;
    }
    expect(remaining).toBe(0);
    expect(canonicalBytes(exportResearch(packet, PROFILE_URL)).byteLength).toBe(RESEARCH_EXCHANGE_MAX_BYTES);
    packet.claims[255]!.text += "x";
    expect(() => parsePersonIndex(packet)).not.toThrow();
    expect(() => exportResearch(packet, PROFILE_URL)).toThrow(/512 KiB/u);
    const multibyte = withCounts(1, 256, 1);
    for (const claim of multibyte.claims) claim.text = "界".repeat(1000);
    expect(() => exportResearch(multibyte, PROFILE_URL)).toThrow(/512 KiB/u);
  });
});

describe("bounded offline local-file CLI", () => {
  test("writes only stable JSON to stdout, with literal paths and no local writes", () => {
    const directory = temporary();
    const packet = fixture();
    const path = join(directory, "literal $(not-a-command); packet.json");
    writeFileSync(path, JSON.stringify(packet));
    const before = readFileSync(path);
    const files = readdirSync(directory);
    const result = cli(["--input", path, "--profile-url", PROFILE_URL]);
    expect(result.exitCode).toBe(0);
    expect(result.stderr.toString()).toBe("");
    expect(result.stdout.toString()).toBe(exportResearchJson(packet, PROFILE_URL));
    expect(readFileSync(path)).toEqual(before);
    expect(readdirSync(directory)).toEqual(files);
    const reversed = cli(["--profile-url", PROFILE_URL, "--input", path]);
    expect(reversed.exitCode).toBe(0);
    expect(reversed.stdout).toEqual(result.stdout);
  });

  test("accepts an exactly bounded file and rejects size overflow before parsing", () => {
    const directory = temporary();
    const text = JSON.stringify(fixture());
    const path = writePacket(directory, text + " ".repeat(RESEARCH_INPUT_MAX_BYTES - Buffer.byteLength(text)));
    expect(exportResearchFile(path, PROFILE_URL)).toBe(exportResearchJson(fixture(), PROFILE_URL));
    truncateSync(path, RESEARCH_INPUT_MAX_BYTES + 1);
    expect(() => exportResearchFile(path, PROFILE_URL)).toThrow(/4 MiB/u);
    truncateSync(path, 1024 * 1024 * 1024);
    expect(() => exportResearchFile(path, PROFILE_URL)).toThrow(/4 MiB/u);
  });

  test("rejects duplicate keys, BOM, invalid UTF-8, numbers and malformed JSON", () => {
    const directory = temporary();
    for (const input of [
      '{"schemaVersion":"x","schemaVersion":"y"}',
      '{"value":1.0}', '{"value":1e2}', '{"value":9007199254740992}',
      '{"value":"\\ud800"}', '\ufeff{}', new Uint8Array([0xff]), "{", "[]", "",
    ]) {
      const path = writePacket(directory, input);
      expect(() => exportResearchFile(path, PROFILE_URL)).toThrow(PacketValidationError);
    }
  });

  test("duplicate keys cannot pass by collapsing into an otherwise valid packet", () => {
    const directory = temporary();
    const text = JSON.stringify(fixture());
    for (const duplicate of [
      text.replace('"claims":', '"claims":[],"claims":'),
      text.replace('"displayName":', '"displayName":"Different Person","displayName":'),
      text.replace('"kind":"fact"', '"kind":"speculation","kind":"fact"'),
    ]) {
      expect(() => parsePersonIndex(JSON.parse(duplicate))).not.toThrow();
      expect(() => exportResearchFile(writePacket(directory, duplicate), PROFILE_URL)).toThrow(/duplicate object member/u);
    }
    for (const depth of [100, 1000, 4000]) {
      const nested = text.replace('"provenance":{', `"ignored":${"[".repeat(depth)}null${"]".repeat(depth)},"provenance":{`);
      expect(() => exportResearchFile(writePacket(directory, nested), PROFILE_URL)).toThrow(PacketValidationError);
    }
  });

  test("rejects absent, relative, URL, symlink and non-regular input paths", () => {
    const directory = temporary();
    const path = writePacket(directory);
    const link = join(directory, "link.json");
    symlinkSync(path, link);
    for (const input of ["person.json", "-", "https://example.test/packet.json", "file:///tmp/packet.json", directory, link, join(directory, "missing.json"), `${path}\0`]) {
      expect(() => exportResearchFile(input, PROFILE_URL)).toThrow();
    }
    if (process.platform !== "win32") {
      expect(() => exportResearchFile("/dev/null", PROFILE_URL)).toThrow(/regular file/u);
      const fifo = join(directory, "input.fifo");
      const created = Bun.spawnSync(["mkfifo", fifo]);
      expect(created.exitCode).toBe(0);
      expect(() => exportResearchFile(fifo, PROFILE_URL)).toThrow(/regular file/u);
    }
  });

  test("rejects invalid flags and profile locators without output", () => {
    const directory = temporary();
    const path = writePacket(directory);
    for (const args of [
      [], ["--input", path], ["--input", path, "--input", path],
      ["--output", join(directory, "out.json"), "--input", path],
      ["--input", path, "--profile-url", PROFILE_URL, "extra"],
      ["--input", path, "--profile-url", "https://soulscrape.com/test_publisher/other-person"],
      ["--input", path, "--profile-url", "https://soulscrape.com/api/example-person"],
    ]) {
      const result = cli(args);
      expect(result.exitCode).not.toBe(0);
      expect(result.stdout.byteLength).toBe(0);
      expect(result.stderr.byteLength).toBeGreaterThan(0);
    }
    expect(readdirSync(directory)).toEqual(["person index.json"]);
  });

  test("a copied skill runs both exporter and validator without the repository or dependencies", async () => {
    const directory = temporary();
    const skill = join(directory, "soulscrape");
    cpSync(join(ROOT, "skills/soulscrape"), skill, { recursive: true });
    const path = writePacket(directory);
    const before = readdirSync(directory).sort();
    // Both commands are read-only and use the same completed fixture.
    const [result, validation] = await Promise.all([
      smokeProcess([join(skill, "scripts/export-research.ts"), "--input", path, "--profile-url", PROFILE_URL], directory),
      smokeProcess([join(skill, "scripts/validate-person-index.ts"), path], directory),
    ]);
    expect(result.exitCode, result.stderr).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toBe(exportResearchJson(fixture(), PROFILE_URL));
    expect(validation.exitCode, validation.stderr).toBe(0);
    expect(validation.stderr).toBe("");
    expect(JSON.parse(validation.stdout).packetDigest).toBe(exportResearch(fixture(), PROFILE_URL).packetDigest);
    expect(readdirSync(directory).sort()).toEqual(before);
  }, 35_000);
});

describe("installed runtime smoke probes", () => {
  function installedCopy() {
    const consumer = temporary();
    const installedRoot = join(consumer, "node_modules/@hraness/soulscrape");
    cpSync(join(ROOT, "skills"), join(installedRoot, "skills"), { recursive: true });
    return { consumer, installedRoot, scriptRoot: join(installedRoot, "skills/soulscrape/scripts") };
  }

  test("executes conversion and the CLI with independent source IDs and canonical digest expectations", async () => {
    const { installedRoot, consumer } = installedCopy();
    const result = await installedRuntimeProbe(installedRoot, consumer);
    expect(result.exitCode, result.stderr).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toBe("verified\n");
  }, 35_000);

  test("rejects an importable exporter whose conversion is broken", async () => {
    const { installedRoot, consumer, scriptRoot } = installedCopy();
    const script = join(scriptRoot, "export-research.ts");
    writeFileSync(script, 'export function exportResearch() { throw new Error("broken conversion"); }');
    const result = await installedRuntimeProbe(installedRoot, consumer, script);
    expect(result.exitCode).not.toBe(0);
    expect(result.stdout).toBe("importable\n");
    expect(result.stderr).toMatch(/installed ontology execution failed/u);
    expect(result.stderr).toMatch(/installed exporter skipped full validation/u);
  }, 35_000);

  test("rejects a broken CLI even when the pure converter still works", async () => {
    const { installedRoot, consumer, scriptRoot } = installedCopy();
    const script = join(scriptRoot, "export-research.ts");
    cpSync(script, join(scriptRoot, "working-exporter.ts"));
    writeFileSync(script, 'export * from "./working-exporter.ts"; if (import.meta.main) process.stdout.write("{}");');
    const result = await installedRuntimeProbe(installedRoot, consumer);
    expect(result.exitCode).not.toBe(0);
    expect(result.stdout).toBe("");
    expect(result.stderr).toMatch(/installed research CLI failed/u);
    expect(result.stderr).not.toMatch(/installed ontology execution failed/u);
  }, 35_000);
});

describe("checked-in public corpus compatibility", () => {
  const directory = join(ROOT, "examples/people");
  const handles = readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();

  test("the complete public example corpus is discovered", () => {
    expect(handles.length).toBeGreaterThanOrEqual(60);
  });

  for (const handle of handles) {
    test(`${handle} retains original canonical packet bytes, digest and source order`, () => {
      const original = strictJsonParse(readFileSync(join(directory, handle, "person-index.json")));
      const packet = parsePersonIndex(original);
      const originalBytes = canonicalBytes(original);
      expect(canonicalBytes(packet)).toEqual(originalBytes);
      expect(personIndexDigest(packet)).toBe(createHash("sha256").update(originalBytes).digest("hex"));
      const url = `https://soulscrape.com/test_publisher/${handle}`;
      const exchange = exportResearch(original, url);
      expect(exchange.packetDigest).toBe(personIndexDigest(packet));
      expect(exchange.sources.map(source => source.id)).toEqual(packet.sources.map(source => source.id));
      expect(exchange.sources.map(source => source.publishedAt)).toEqual(packet.sources.map(source => source.publishedAt));
      expect(exchange.claims).toEqual(packet.claims);
      expect(exportResearchJson(original, url)).toBe(canonicalText(exchange));
    });
  }
});
