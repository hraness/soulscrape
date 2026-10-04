import { afterEach, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";
import { renderToStaticMarkup } from "react-dom/server";
import KnowledgePage, { generateMetadata } from "../app/-/[kind]/[key]/page";
import DossierSectionPage, { generateMetadata as dossierMetadata } from "../app/[username]/[handle]/sections/[sectionId]/page";
import { GET as getDossierSection, PUT as putDossierSection } from "../app/api/v1/sections/[username]/[handle]/[sectionId]/route";
import { KnowledgeHub } from "../components/knowledge-hub";
import nextConfig from "../next.config";
import { convexApi } from "../lib/convex";
import { knowledgePageMarkdown, parseKnowledgePage, parseKnowledgeRoute } from "../lib/knowledge-page";
import { knowledgeResourceKey } from "../lib/knowledge-index";
import { dossierSectionMarkdown, parsePublicSection } from "../lib/dossier-page";
import { dossierSectionDigest } from "../../skills/soulscrape/scripts/dossier-section";

const subjectKey = "subject-" + "a".repeat(64);
const sourceKey = "resource-" + "b".repeat(64);
const digest = "c".repeat(64);
const originalUrl = process.env.CONVEX_URL;

afterEach(() => {
  if (originalUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalUrl;
  spyOn(ConvexHttpClient.prototype, "query").mockRestore();
  spyOn(ConvexHttpClient.prototype, "mutation").mockRestore();
});

const alice = { key: subjectKey, role: "primary", username: "alice", handle: "example-person",
  profileUrl: "https://soulscrape.com/alice/example-person", displayName: "Example Person",
  summary: "A synthetic public dossier.", subjectKind: "person", packetDigest: digest, revision: 1,
  asOf: "2026-01-01T00:00:00Z", claimCount: 2,
  claims: [{ id: "claim-observation", kind: "fact", text: "A documented example fact.", sourceIds: ["source-" + "d".repeat(20)] },
    { id: "claim-hypothesis", kind: "speculation", text: "A labeled example hypothesis.", sourceIds: ["source-" + "d".repeat(20)] }] };
const bravo = { ...alice, username: "bravo", profileUrl: "https://soulscrape.com/bravo/example-person", revision: 2 };
const reference = { key: subjectKey, role: "reference", username: "researcher", handle: "example-organization",
  profileUrl: "https://soulscrape.com/researcher/example-organization", displayName: "Example Organization",
  summary: "An organization with a sourced history.", packetDigest: digest, revision: 1,
  subjectKind: "person", recordId: "rel-example-person",
  relationKind: "founded_by", origin: "relation", sourceIds: ["source-" + "d".repeat(20)],
  targetName: "Example Person", targetHandle: "example-person" };
const occurrence = { key: sourceKey, role: "citation", username: alice.username, handle: alice.handle,
  profileUrl: alice.profileUrl, displayName: alice.displayName, summary: alice.summary,
  packetDigest: digest, revision: 1, sourceId: "source-" + "d".repeat(20),
  sourceOrdinal: 3, source: { id: "source-" + "d".repeat(20), title: "An interview", url: "https://example.test/interview",
    publisher: "An example publisher", binding: "interview", mediaType: "article", accessedAt: "2026-01-01T00:00:00Z", publishedAt: "2024" } };

const section = { schemaVersion: "soulscrape.dossier-section.v1",
  profileUrl: "https://soulscrape.com/alice/example-person", packetDigest: digest, profileRevision: 1, subjectKind: "person",
  id: "history", title: "History", body: "# History\n\nThe published body keeps **its own account**.",
  provenance: { source: "hraness", originalUrl: "https://hraness.com/example-person/history",
    originalRevision: "3".repeat(64), originalAuthor: "Hraness", draftingDisclosure: "AI-drafted at the owner's request." },
  anchors: [{ id: "origin", title: "Origins", originalUrl: "https://hraness.com/example-person/history#origin" }],
  sources: [{ id: "source-" + "1".repeat(20), originalId: "src-original", title: "Original source",
    url: "https://example.com/reference", publisher: "Example", published: { text: "1980s", precision: "decade" },
    type: "primary", note: null }],
  records: [{ id: "event-one", kind: "timeline", label: "A report", confidence: "reported",
    originalUrl: "https://hraness.com/example-person/history#origin", sourceIds: ["source-" + "1".repeat(20)],
    original: { detail: "The original report, not an independently verified claim." } }],
};
const sectionParams = { username: "alice", handle: "example-person", sectionId: "history" };
const sectionResult = { username: sectionParams.username, handle: sectionParams.handle, packetDigest: digest, revision: 1,
  documentDigest: dossierSectionDigest(section), section };

function page(rows: unknown[], key = subjectKey, nextCursor: string | null = null, isDone = true) {
  return parseKnowledgePage({ rows, nextCursor, isDone, snapshot: false }, key);
}

test("subject hub shows publisher-specific primary dossiers and sourced references without blending them", () => {
  const result = page([alice, bravo, reference]);
  expect(result).not.toBeNull();
  const html = renderToStaticMarkup(<KnowledgeHub kind="subjects" keyId={subjectKey} page={result!} />);
  expect(html).toContain("Example Person");
  expect(html).toContain("@alice");
  expect(html).toContain("@bravo");
  expect(html).toContain("@researcher");
  expect(html).toContain("founded by");
  expect(html).toContain("A documented example fact.");
  expect(html).toContain("A labeled example hypothesis.");
  expect(html).toContain("speculation");
  expect(html).toContain(`${alice.profileUrl}#claim-claim-observation`);
  expect(html).toContain("2026-01-01");
  expect(html).toContain("publisher");
  expect(html).not.toContain("A synthetic merged biography");
  expect(html).toContain("https://soulscrape.com/bravo/example-person");
  expect(html).toContain("/researcher/example-organization#relations-heading");
});

test("a reviewed grouping retains its opaque key, separate dossiers and revisable label", () => {
  const reviewed = { kind: "person" as const, label: "Reviewed Person", revision: 2 };
  const result = parseKnowledgePage({ rows: [alice, bravo], nextCursor: null, isDone: true,
    snapshot: false, reviewed }, subjectKey);
  expect(result?.reviewed).toEqual(reviewed);
  const html = renderToStaticMarkup(<KnowledgeHub kind="subjects" keyId={subjectKey} page={result!} />);
  expect(html).toContain("Reviewed Person");
  expect(html).toContain("can be corrected");
  expect(html).toContain("report the identity link");
  expect(html).toContain("@alice");
  expect(html).toContain("@bravo");
  expect(knowledgePageMarkdown(result!, "subjects", subjectKey)).toContain("# Reviewed Person");
  for (const [key, invalid] of [[subjectKey, { ...reviewed, kind: "organization" }],
    [sourceKey, reviewed], [subjectKey, { ...reviewed, label: "" }]] as const) {
    expect(parseKnowledgePage({ rows: key === sourceKey ? [occurrence] : [alice],
      nextCursor: null, isDone: true, snapshot: false, reviewed: invalid }, key)).toBeNull();
  }
});

test("source hub preserves the original publication and citation anchor for each user", () => {
  const result = page([occurrence, { ...occurrence, username: "bravo", profileUrl: "https://soulscrape.com/bravo/example-person",
    source: { ...occurrence.source, title: "A different title", publishedAt: "2024-05" } }], sourceKey);
  expect(result).not.toBeNull();
  const html = renderToStaticMarkup(<KnowledgeHub kind="sources" keyId={sourceKey} page={result!} />);
  expect(html).toContain("An interview");
  expect(html).toContain("A different title");
  expect(html).toContain("2024-05");
  expect(html).toContain("https://soulscrape.com/alice/example-person#source-3");
  expect(html).toContain("https://soulscrape.com/bravo/example-person#source-3");
  expect(html).toContain("https://example.test/interview");
});

test("a section citation keeps the original occurrence, precision and deep link across HTML and Markdown", () => {
  const sectionOccurrence = { ...occurrence, role: "section_citation", sourceId: section.sources[0]!.id,
    sectionId: section.id, sectionDigest: dossierSectionDigest(section), sectionTitle: section.title,
    sectionSource: { id: section.sources[0]!.id, originalId: "src-original", title: "Original source",
      url: "https://example.com/reference", publisher: "Example", published: { text: "1980s", precision: "decade" },
      type: "primary" } };
  delete (sectionOccurrence as { source?: unknown }).source;
  delete (sectionOccurrence as { sourceOrdinal?: number }).sourceOrdinal;
  const result = page([occurrence, sectionOccurrence], sourceKey);
  expect(result).not.toBeNull();
  const html = renderToStaticMarkup(<KnowledgeHub kind="sources" keyId={sourceKey} page={result!} />);
  const deepLink = `${section.profileUrl}/sections/history#${section.sources[0]!.id}`;
  expect(html).toContain(deepLink);
  expect(html).toContain("1980s (decade)");
  expect(html).toContain("src-original");
  const markdown = knowledgePageMarkdown(result!, "sources", sourceKey);
  expect(markdown).toContain(deepLink);
  expect(markdown).toContain("Original source");
  expect(page([{ ...sectionOccurrence, sectionSource: { ...sectionOccurrence.sectionSource,
    url: "javascript:alert(1)" } }], sourceKey)).toBeNull();
  expect(page([{ ...sectionOccurrence, sectionSource: { ...sectionOccurrence.sectionSource,
    published: { text: "2020-02-30", precision: "day" } } }], sourceKey)).toBeNull();
  expect(page([{ ...sectionOccurrence, sectionDigest: "wrong" }], sourceKey)).toBeNull();
});

test("pagination never pretends a partial page or an empty page is the entire network", () => {
  const result = page([], subjectKey, "page-two", false);
  expect(result).not.toBeNull();
  const html = renderToStaticMarkup(<KnowledgeHub kind="subjects" keyId={subjectKey} page={result!} />);
  expect(html).toContain("page-two");
  expect(html).toContain("more results");
  expect(html).not.toContain("No public dossiers");
  expect(knowledgePageMarkdown(result!, "subjects", subjectKey)).toContain("page-two");
});

test("Markdown matches HTML links and attributes every record to its own publisher", () => {
  const result = page([alice, bravo, reference]);
  const text = knowledgePageMarkdown(result!, "subjects", subjectKey);
  expect(text).toContain("@alice");
  expect(text).toContain("@bravo");
  expect(text).toContain("https://soulscrape.com/alice/example-person");
  expect(text).toContain("https://soulscrape.com/researcher/example-organization");
  expect(text).toContain("A documented example fact.");
  expect(text).toContain("speculation");
  expect(text).toContain("publisher");
  expect(text).not.toContain("verified identity");
});

test("untrusted row data fails closed rather than permitting invented or unsafe links", () => {
  for (const candidate of [
    { ...alice, profileUrl: "https://soulscrape.com/other/example-person" },
    { ...alice, profileUrl: "https://evil.test/alice/example-person" },
    { ...alice, revision: 1.5 },
    { ...alice, packetDigest: "bad" },
    { ...alice, key: sourceKey },
    { ...occurrence, source: { ...occurrence.source, url: "javascript:alert(1)" } },
    { ...occurrence, source: { ...occurrence.source, notes: "Unexpected free text" } },
    { ...occurrence, sourceOrdinal: 0 },
    { ...occurrence, source: { ...occurrence.source, accessedAt: "2026-99-99T00:00:00Z" } },
    { ...occurrence, source: { ...occurrence.source, publishedAt: "2024-02-30" } },
    { ...alice, claimCount: -1 },
    { ...alice, claimCount: 1 },
    { ...alice, claims: [{ ...alice.claims[0], kind: "verified_truth" }] },
    { ...alice, asOf: "not-a-date" },
  ]) {
    expect(page([candidate], candidate.role === "citation" ? sourceKey : subjectKey)).toBeNull();
  }
  expect(page([alice, alice, alice, alice, alice])).toBeNull();
  expect(parseKnowledgePage({ rows: [alice], nextCursor: null, isDone: false, snapshot: false }, subjectKey)).toBeNull();
  expect(parseKnowledgePage({ rows: [alice], nextCursor: null, isDone: true, snapshot: true }, subjectKey)).toBeNull();
});

test("the site page renders current public records and advertises its Markdown twin without indexing a hub", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue({ rows: [alice, bravo], nextCursor: null, isDone: true, snapshot: false });
  const props = { params: Promise.resolve({ kind: "subjects", key: subjectKey }), searchParams: Promise.resolve({}) };
  const html = renderToStaticMarkup(await KnowledgePage(props));
  expect(html).toContain("Example Person");
  expect(html).toContain("https://soulscrape.com/bravo/example-person");
  const metadata = await generateMetadata(props);
  expect(metadata.robots).toMatchObject({ index: false });
  expect(metadata.alternates).toEqual({ canonical: `https://soulscrape.com/-/subjects/${subjectKey}`,
    types: { "text/markdown": `https://soulscrape.com/-/subjects/${subjectKey}.md` } });
});

test("the site page reports unavailable shared lookup without hiding individual dossiers", async () => {
  delete process.env.CONVEX_URL;
  const html = renderToStaticMarkup(await KnowledgePage({ params: Promise.resolve({ kind: "subjects", key: subjectKey }),
    searchParams: Promise.resolve({}) }));
  expect(html).toContain("Public connections unavailable");
  expect(html).toContain("Individual published dossiers are still available");
  expect(html).not.toContain("A synthetic public dossier");
});

test("subject hubs filter publisher without losing the filter on later pages or Markdown", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue({ rows: [alice], nextCursor: "page-two", isDone: false, snapshot: false });
  const props = { params: Promise.resolve({ kind: "subjects", key: subjectKey }),
    searchParams: Promise.resolve({ publisher: "alice", cursor: "page-one" }) };
  const html = renderToStaticMarkup(await KnowledgePage(props));
  expect(query).toHaveBeenCalledWith(convexApi.knowledgeLookup, { key: subjectKey, cursor: "page-one", limit: 4, publisher: "alice" });
  expect(html).toContain(`publisher=alice&amp;cursor=page-two`);
  expect(html).toContain("Show all publishers");
  expect(knowledgePageMarkdown(page([alice], subjectKey, "page-two", false)!, "subjects", subjectKey, "alice"))
    .toContain(`publisher=alice&cursor=page-two`);
  const metadata = await generateMetadata(props);
  expect(metadata.robots).toMatchObject({ index: false });
});

test("Markdown rewrites cannot be captured by the profile route", async () => {
  const rewrites = await nextConfig.rewrites!();
  if (Array.isArray(rewrites) || !rewrites.beforeFiles) throw new Error("The Markdown rewrite must run before profile fallback routing.");
  expect(rewrites.beforeFiles.slice(0, 2).map(({ source, destination }) => ({ source, destination }))).toEqual([
    { source: "/-/:kind/:key.md", destination: "/api/v1/knowledge/:kind/:key?format=markdown" },
    { source: "/-/:kind/:key", destination: "/api/v1/knowledge/:kind/:key?format=markdown" },
  ]);
});

test("full sections keep HTML, JSON, Markdown, source occurrences, locators and original editorial labels aligned", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue(sectionResult);
  const value = parsePublicSection(sectionResult, "alice", "example-person", "history");
  expect(value).not.toBeNull();
  expect(parsePublicSection({ ...sectionResult, revision: 2 }, "alice", "example-person", "history")).toBeNull();
  expect(parsePublicSection({ ...sectionResult, documentDigest: "0".repeat(64) }, "alice", "example-person", "history")).toBeNull();
  const html = renderToStaticMarkup(await DossierSectionPage({ params: Promise.resolve(sectionParams) }));
  expect(html).toContain("The published body keeps");
  expect(html).toContain('id="origin"');
  expect(html).toContain("https://hraness.com/example-person/history#origin");
  expect(html).toContain("src-original");
  expect(html).toContain("1980s");
  expect(html).toContain("reported (original editorial confidence)");
  expect(html).toContain("Original credited author: Hraness");
  expect(html).toContain("AI-drafted at the owner&#x27;s request.");
  expect(html).toContain("The original report, not an independently verified claim.");
  expect(query).toHaveBeenCalledWith(convexApi.dossierSectionGet, sectionParams);
  const meta = await dossierMetadata({ params: Promise.resolve(sectionParams) });
  expect(meta.robots).toMatchObject({ index: false });
  expect(meta.alternates).toEqual({ canonical: "https://soulscrape.com/alice/example-person/sections/history",
    types: { "text/markdown": "https://soulscrape.com/alice/example-person/sections/history.md" } });
  const path = "https://soulscrape.com/api/v1/sections/alice/example-person/history";
  const json = await getDossierSection(new Request(path), { params: Promise.resolve(sectionParams) });
  expect(json.status).toBe(200);
  expect((await json.json()).section.sources[0].published).toEqual({ text: "1980s", precision: "decade" });
  const markdown = await getDossierSection(new Request(`${path}?format=markdown`), { params: Promise.resolve(sectionParams) });
  expect(markdown.status).toBe(200);
  const text = await markdown.text();
  expect(text).toContain(section.body);
  expect(text).toContain("Original credited author: Hraness");
  expect(text).toContain("AI-drafted at the owner's request.");
  expect(text).toContain('"confidence":"reported"');
  expect(text).toContain('"originalId":"src-original"');
  expect(dossierSectionMarkdown(value!)).toBe(text);
});

test("a full section is published only on its exact authenticated profile path", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const mutation = spyOn(ConvexHttpClient.prototype, "mutation").mockResolvedValue({ ...sectionParams,
    packetDigest: digest, documentDigest: sectionResult.documentDigest, changed: true });
  const path = "https://soulscrape.com/api/v1/sections/alice/example-person/history";
  const request = (body: unknown, authorization = "Bearer spt_" + "A".repeat(48)) => new Request(path,
    { method: "PUT", headers: { authorization, "content-type": "application/json" }, body: JSON.stringify(body) });
  expect((await putDossierSection(request(section, ""), { params: Promise.resolve(sectionParams) })).status).toBe(401);
  expect((await putDossierSection(request({ ...section, id: "other" }),
    { params: Promise.resolve(sectionParams) })).status).toBe(400);
  expect((await putDossierSection(request({ ...section, hidden: "not public" }),
    { params: Promise.resolve(sectionParams) })).status).toBe(400);
  expect(mutation).not.toHaveBeenCalled();
  const response = await putDossierSection(request(section), { params: Promise.resolve(sectionParams) });
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ changed: true,
    url: "https://soulscrape.com/alice/example-person/sections/history" });
  expect(mutation).toHaveBeenCalledWith(convexApi.dossierSectionPublish,
    { token: "spt_" + "A".repeat(48), section });
});

test("section source links are available only after explicit section-source activation", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockImplementation(async (reference, ..._args) =>
    (reference === convexApi.sectionSourcesAvailable ? true : sectionResult) as never);
  const props = { params: Promise.resolve(sectionParams) };
  const html = renderToStaticMarkup(await DossierSectionPage(props));
  const key = knowledgeResourceKey(section.sources[0]!.url);
  expect(html).toContain(`/-/sources/${key}`);
  expect(query).toHaveBeenCalledWith(convexApi.sectionSourcesAvailable, {});
  query.mockResolvedValue(sectionResult);
  const before = renderToStaticMarkup(await DossierSectionPage({ params: Promise.resolve({ ...sectionParams }) }));
  expect(before).not.toContain(`/-/sources/${key}`);
});

test("full-section Markdown rewrites stay ahead of profile Markdown fallbacks", async () => {
  const rewrites = await nextConfig.rewrites!();
  if (Array.isArray(rewrites) || !rewrites.afterFiles) throw new Error("Missing section Markdown rewrites.");
  expect(rewrites.afterFiles.slice(0, 2).map(({ source, destination }) => ({ source, destination }))).toEqual([
    { source: "/:username/:handle/sections/:sectionId.md", destination: "/api/v1/sections/:username/:handle/:sectionId?format=markdown" },
    { source: "/:username/:handle/sections/:sectionId", destination: "/api/v1/sections/:username/:handle/:sectionId?format=markdown" },
  ]);
});

test("reader routes require safe subjects or sources under the non-username namespace", () => {
  expect(parseKnowledgeRoute("subjects", subjectKey)).toEqual({ kind: "subjects", key: subjectKey });
  expect(parseKnowledgeRoute("sources", sourceKey)).toEqual({ kind: "sources", key: sourceKey });
  for (const [kind, key] of [["subjects", sourceKey], ["sources", subjectKey], ["people", subjectKey],
    ["subjects", "subject-" + "a".repeat(65)], ["subjects", "../../../etc/passwd"]]) {
    expect(parseKnowledgeRoute(kind, key)).toBeNull();
  }
});
