import { expect, test } from "bun:test";
import { parseDossierSection, dossierSectionDigest } from "../skills/soulscrape/scripts/dossier-section";
import { PacketValidationError } from "../skills/soulscrape/scripts/source-packet";

const subjectDigest = "a".repeat(64);
const sourceOne = "source-" + "1".repeat(20);
const sourceTwo = "source-" + "2".repeat(20);
const fixture = {
  schemaVersion: "soulscrape.dossier-section.v1",
  profileUrl: "https://soulscrape.com/researcher/obsidian",
  packetDigest: subjectDigest,
  profileRevision: 1,
  subjectKind: "product",
  id: "history",
  title: "History",
  body: "# History\n\nThe document preserves its own attributed sections.\n",
  provenance: { originalUrl: "https://hraness.com/obsidian/history",
    originalRevision: "3".repeat(64), source: "hraness", originalAuthor: "Hraness",
    draftingDisclosure: "AI-drafted at Ben Guo's direct request and credited to Hraness." },
  anchors: [{ id: "dynalist", title: "The Dynalist years",
    originalUrl: "https://hraness.com/obsidian/history#dynalist" }],
  sources: [
    { id: sourceOne, originalId: "src-i-luhmann-slip-boxes", title: "Communicating with slip boxes",
      url: "https://example.org/slip-boxes", publisher: "Luhmann Archive",
      published: { text: "1980s", precision: "decade" }, type: "primary",
      note: "Preserves the stated period rather than inventing an exact date." },
    { id: sourceTwo, originalId: "src-other-edition", title: "Another catalog occurrence",
      url: "https://example.org/slip-boxes", publisher: "Luhmann Archive",
      published: { text: "1980s", precision: "decade" }, type: "reference" },
  ],
  records: [{ id: "timeline-dynalist", kind: "timeline", originalUrl: "https://hraness.com/obsidian/history#dynalist",
    sourceIds: [sourceOne, sourceTwo], confidence: "inferred", date: { text: "1980s", precision: "decade" },
    label: "A sourced event",
    original: { detail: "Original authored detail", date: "1980s", nesting: { preserved: true } } }],
};

test("a bounded dossier section preserves original locators, duplicate source occurrences, raw dates and confidence", () => {
  const result = parseDossierSection(fixture);
  expect(result.sources).toHaveLength(2);
  expect(result.sources[0]!.url).toBe(result.sources[1]!.url);
  expect(parseDossierSection({ ...fixture, sources: [{ ...fixture.sources[0], originalId: "src-i-obsidian-hn-1.0" },
    fixture.sources[1]] }).sources[0]!.originalId).toBe("src-i-obsidian-hn-1.0");
  expect(result.sources[0]!.published).toEqual({ text: "1980s", precision: "decade" });
  expect(result.sources[0]!.accessedAt).toBeUndefined();
  expect(result.records[0]!.confidence).toBe("inferred");
  expect(result.records[0]!.date).toEqual({ text: "1980s", precision: "decade" });
  expect(result.records[0]!.original).toEqual(fixture.records[0]!.original);
  expect(result.anchors[0]!.originalUrl).toContain("#dynalist");
  expect(result.provenance.originalAuthor).toBe("Hraness");
  expect(result.provenance.draftingDisclosure).toContain("AI-drafted");
  expect(dossierSectionDigest(fixture)).toBe(dossierSectionDigest({ ...fixture, title: "History", id: "history" }));
  expect(dossierSectionDigest({ ...fixture, body: `${fixture.body}Changed` })).not.toBe(dossierSectionDigest(fixture));
});

test("malformed, unbounded or ambiguous section data fails closed without dropping fields", () => {
  for (const value of [
    { ...fixture, profileUrl: "https://evil.test/researcher/obsidian" },
    { ...fixture, packetDigest: "bad" },
    { ...fixture, profileRevision: 0 },
    { ...fixture, profileRevision: 1.5 },
    { ...fixture, subjectKind: "unknown" },
    { ...fixture, body: "a".repeat(96 * 1024 + 1) },
    { ...fixture, anchors: [...fixture.anchors, fixture.anchors[0]] },
    { ...fixture, anchors: [{ ...fixture.anchors[0], id: sourceOne }] },
    { ...fixture, records: [{ ...fixture.records[0], id: "section-text" }] },
    { ...fixture, sources: [fixture.sources[0], { ...fixture.sources[1], id: sourceOne }] },
    { ...fixture, sources: [{ ...fixture.sources[0], accessedAt: "2025-02-30T00:00:00Z" }] },
    { ...fixture, sources: [{ ...fixture.sources[0], published: { text: "2025-02-30", precision: "day" } }] },
    { ...fixture, sources: [{ ...fixture.sources[0], published: { text: "1980s", precision: "day" } }] },
    { ...fixture, sources: [{ ...fixture.sources[0], url: "https://user:pass@example.org/" }] },
    { ...fixture, records: [{ ...fixture.records[0], sourceIds: ["source-" + "f".repeat(20)] }] },
    { ...fixture, records: [{ ...fixture.records[0], confidence: "fact" }] },
    { ...fixture, records: [{ ...fixture.records[0], original: { importance: 0.5 } }] },
    { ...fixture, records: [{ ...fixture.records[0], original: { invented: undefined } }] },
    { ...fixture, body: "# History", hidden: "silent omission" },
  ]) expect(() => parseDossierSection(value)).toThrow(PacketValidationError);
});
