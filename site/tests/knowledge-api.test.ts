import { afterEach, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";
import { ConvexError } from "convex/values";
import { GET } from "../app/api/v1/knowledge/[kind]/[key]/route";
import { GET as SEARCH } from "../app/api/v1/knowledge/search/route";
import { convexApi } from "../lib/convex";
import { PUBLIC_CACHE_CONTROL } from "../lib/public-response";

const subjectKey = "subject-" + "a".repeat(64);
const sourceKey = "resource-" + "b".repeat(64);
const row = { key: subjectKey, role: "primary", username: "alice", handle: "example-person",
  profileUrl: "https://soulscrape.com/alice/example-person", displayName: "Example Person",
  summary: "A synthetic public dossier.", subjectKind: "person", packetDigest: "c".repeat(64), revision: 1,
  asOf: "2026-01-01T00:00:00Z", claimCount: 0, claims: [] };
const originalUrl = process.env.CONVEX_URL;

afterEach(() => {
  if (originalUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalUrl;
  spyOn(ConvexHttpClient.prototype, "query").mockRestore();
});

function request(kind = "subjects", key = subjectKey, suffix = "") {
  return new Request(`https://soulscrape.com/api/v1/knowledge/${kind}/${key}${suffix}`);
}
function params(kind = "subjects", key = subjectKey) {
  return { params: Promise.resolve({ kind, key }) };
}
function serve(value: unknown) {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  return spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue(value);
}

test("serves bounded, attributed subject pages and stable Markdown with no unapproved extra data", async () => {
  const query = serve({ rows: [row], nextCursor: null, isDone: true, snapshot: false });
  const response = await GET(request(), params());
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(response.headers.get("cache-control")).toBe(PUBLIC_CACHE_CONTROL);
  expect(query).toHaveBeenCalledWith(convexApi.knowledgeLookup, { key: subjectKey, cursor: null, limit: 4 });
  expect(body).toMatchObject({ ok: true, version: "soulscrape.api.v1", projectionVersion: "soulscrape.knowledge-index.v1",
    resource: { kind: "subjects", key: subjectKey }, pagination: { nextCursor: null, isDone: true, snapshot: false }, records: [row] });
  const markdown = await GET(request("subjects", subjectKey, "?format=markdown"), params());
  expect(markdown.status).toBe(200);
  expect(markdown.headers.get("content-type")).toContain("text/markdown");
  expect(markdown.headers.get("link")).toBe(`<https://soulscrape.com/-/subjects/${subjectKey}>; rel="canonical"`);
  const text = await markdown.text();
  expect(text).toContain("@alice");
  expect(text).toContain(row.profileUrl);
  expect(text).not.toContain("source notes");
});

test("reviewed subject response exposes only bounded public label and separate publishers", async () => {
  const reviewed = { kind: "person", label: "Reviewed Person", revision: 2 };
  serve({ rows: [row, { ...row, username: "bravo", profileUrl: "https://soulscrape.com/bravo/example-person" }],
    nextCursor: null, isDone: true, snapshot: false, reviewed });
  const response = await GET(request(), params());
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(body.reviewed).toEqual(reviewed);
  expect(body.records.map((item: { username: string }) => item.username)).toEqual(["alice", "bravo"]);
  expect(JSON.stringify(body)).not.toContain("staff-test");
});

test("source pages preserve distinct occurrences without claiming source agreement", async () => {
  serve({ rows: [{ key: sourceKey, role: "citation", username: row.username, handle: row.handle,
    profileUrl: row.profileUrl, displayName: row.displayName, summary: row.summary,
    packetDigest: row.packetDigest, revision: row.revision,
    sourceId: "source-" + "d".repeat(20), sourceOrdinal: 3,
    source: { id: "source-" + "d".repeat(20), title: "An interview", url: "https://example.test/interview",
      publisher: "Synthetic publication", binding: "interview", mediaType: "article", accessedAt: "2026-01-01T00:00:00Z" } }],
    nextCursor: "cursor-page-two", isDone: false, snapshot: false });
  const response = await GET(request("sources", sourceKey, "?limit=1"), params("sources", sourceKey));
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(body.pagination).toMatchObject({ nextCursor: "cursor-page-two", isDone: false, snapshot: false });
  expect(body.records[0].source.url).toBe("https://example.test/interview");
  expect(body.records[0].source).not.toHaveProperty("notes");
});

test("section-source API records preserve typed dates and links without implying independent evidence", async () => {
  const sourceId = "source-" + "1".repeat(20);
  serve({ rows: [{ key: sourceKey, role: "section_citation", username: row.username, handle: row.handle,
    profileUrl: row.profileUrl, displayName: row.displayName, summary: row.summary,
    packetDigest: row.packetDigest, revision: 1, sourceId, sectionId: "history", sectionDigest: "f".repeat(64),
    sectionTitle: "History", sectionSource: { id: sourceId, originalId: "hraness-first", title: "Original report",
      url: "https://example.test/report", publisher: "Example", published: { text: "1980s", precision: "decade" },
      type: "primary" } }], nextCursor: null, isDone: true, snapshot: false, sectionSourcesReady: true });
  const response = await GET(request("sources", sourceKey), params("sources", sourceKey));
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(body.resource.sectionSourcesReady).toBe(true);
  expect(body.records[0].sectionSource.published).toEqual({ text: "1980s", precision: "decade" });
  expect(body.records[0].sectionSource).not.toHaveProperty("note");
  const markdown = await GET(request("sources", sourceKey, "?format=markdown"), params("sources", sourceKey));
  expect((await markdown.text())).toContain(`/sections/history#${sourceId}`);
});

test("publisher filter reaches indexed lookup and stays in Markdown pagination", async () => {
  const query = serve({ rows: [row], nextCursor: "page-two", isDone: false, snapshot: false });
  const json = await GET(request("subjects", subjectKey, "?publisher=alice&limit=1"), params());
  expect(json.status).toBe(200);
  expect(query).toHaveBeenCalledWith(convexApi.knowledgeLookup,
    { key: subjectKey, cursor: null, limit: 1, publisher: "alice" });
  expect((await json.json()).resource).toMatchObject({ publisher: "alice" });
  const markdown = await GET(request("subjects", subjectKey, "?publisher=alice&format=markdown"), params());
  expect((await markdown.text())).toContain(`publisher=alice&cursor=page-two`);
});

test("candidate search only returns publisher-separated label suggestions from bounded public pages", async () => {
  const candidate = { username: "alice", handle: "example-person", displayName: "Example Person", subjectKind: "person",
    profileUrl: row.profileUrl, match: "label-suggestion" };
  const query = serve({ rows: [candidate, { ...candidate, username: "bravo",
    profileUrl: "https://soulscrape.com/bravo/example-person" }], nextCursor: "next-page", isDone: false, snapshot: false });
  const response = await SEARCH(new Request("https://soulscrape.com/api/v1/knowledge/search?q=Example&kind=person&limit=2"));
  expect(response.status).toBe(200);
  expect(query).toHaveBeenCalledWith(convexApi.knowledgeSearch,
    { phrase: "Example", cursor: null, limit: 2, kind: "person" });
  const body = await response.json();
  expect(body.pagination).toMatchObject({ nextCursor: "next-page", snapshot: false });
  expect(body.results.map((item: { username: string }) => item.username)).toEqual(["alice", "bravo"]);
  expect(body.results[0].match).toBe("label-suggestion");
  const sourceId = "source-" + "a".repeat(20);
  const filtered = await SEARCH(new Request(`https://soulscrape.com/api/v1/knowledge/search?q=Example&source=${sourceId}&asOf=2026-09-16`));
  expect(filtered.status).toBe(200);
  expect(query).toHaveBeenLastCalledWith(convexApi.knowledgeSearch,
    { phrase: "Example", cursor: null, limit: 20, sourceId, asOf: "2026-09-16" });
  expect((await filtered.json()).query).toMatchObject({ sourceId, asOf: "2026-09-16" });
  query.mockResolvedValue({ rows: [{ ...candidate, subjectKind: "product" }], nextCursor: null,
    isDone: true, snapshot: false });
  const product = await SEARCH(new Request("https://soulscrape.com/api/v1/knowledge/search?q=Example&kind=product"));
  expect(product.status).toBe(200);
  expect((await product.json()).results[0].subjectKind).toBe("product");
  query.mockResolvedValue({ rows: [{ ...candidate, profileUrl: "https://evil.test/alice/example-person" }],
    nextCursor: null, isDone: true, snapshot: false });
  const invalid = await SEARCH(new Request("https://soulscrape.com/api/v1/knowledge/search?q=Example"));
  expect(invalid.status).toBe(503);
  expect(JSON.stringify(await invalid.json())).not.toContain("evil.test");
});

test("candidate search rejects malformed filters before provider I/O", async () => {
  const query = serve({ rows: [], nextCursor: null, isDone: true, snapshot: false });
  for (const suffix of ["", "?q=x", "?q=Example&q=Other", "?q=Example&publisher=ALICE",
    "?q=Example&kind=unknown", "?q=Example&limit=21", "?q=Example&extra=private",
    "?q=Example&source=secret", "?q=Example&asOf=2026-02-30", "?q=Example&asOf=2026-01-01&asOf=2026-01-02"]) {
    expect((await SEARCH(new Request(`https://soulscrape.com/api/v1/knowledge/search${suffix}`))).status).toBe(400);
  }
  expect(query).not.toHaveBeenCalled();
});

test("rejects bad key, kind, cursor, limit, publisher and format before provider I/O", async () => {
  const query = serve({ rows: [], nextCursor: null, isDone: true, snapshot: false });
  for (const [kind, key, suffix, status] of [
    ["people", subjectKey, "", 404], ["subjects", sourceKey, "", 404],
    ["subjects", "subject-" + "a".repeat(65), "", 404],
    ["subjects", subjectKey, "?limit=5", 400], ["subjects", subjectKey, "?cursor=%20", 400],
    ["subjects", subjectKey, "?format=html", 400],
    ["subjects", subjectKey, "?publisher=ALICE", 400],
    ["subjects", subjectKey, "?publisher=..%2Falice", 400],
  ] as const) {
    expect((await GET(request(kind, key, suffix), params(kind, key))).status).toBe(status);
  }
  expect(query).not.toHaveBeenCalled();
});

test("unavailable, unfinished, and malformed provider reads disclose no partial identities", async () => {
  delete process.env.CONVEX_URL;
  expect((await GET(request(), params())).status).toBe(503);
  const query = serve({ rows: [{ ...row, profileUrl: "https://evil.test/alice/example-person" }],
    nextCursor: null, isDone: true, snapshot: false });
  const malformed = await GET(request(), params());
  expect(malformed.status).toBe(503);
  expect(JSON.stringify(await malformed.json())).not.toContain("evil.test");
  query.mockRejectedValue(new ConvexError({ code: "PROJECTIONS_NOT_READY" }));
  const pending = await GET(request(), params());
  expect(pending.status).toBe(503);
  expect((await pending.json()).error.code).toBe("PROJECTIONS_NOT_READY");
});
