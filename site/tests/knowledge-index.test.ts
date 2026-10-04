import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import {
  parsePersonIndex, parseProductIndex, personIndexDigest, stablePersonSourceId, type PersonIndex,
  type PublicProfileIndex,
} from "../../skills/soulscrape/scripts/person-index";
import {
  KNOWLEDGE_INPUT_MAX_BYTES, KNOWLEDGE_MAX_PUBLICATIONS,
  buildKnowledgeIndex, canonicalKnowledgeSourceUrl,
} from "../lib/knowledge-index";

function packet(handle = "example-person", kind: "person" | "organization" = "person", qid?: string): PersonIndex {
  const url = "https://example.test/interview?utm_source=fixture#introduction";
  const sourceId = stablePersonSourceId(url, "2024");
  return parsePersonIndex({
    schemaVersion: "soulscrape.person-index.v1", indexId: `pidx-${handle}`,
    generatedAt: "2026-01-02T12:00:00Z", scope: { asOf: "2026-01-01T12:00:00Z" },
    subject: { kind, handle, displayName: "Example Subject", summary: "A synthetic public research subject.",
      ...(qid === undefined ? {} : { identity: { wikidataId: qid } }) },
    sources: [{ id: sourceId, binding: "interview", mediaType: "article", title: "An interview",
      url, publisher: "Example Publisher", publishedAt: "2024", accessedAt: "2026-01-01T00:00:00Z" }],
    claims: ["fact", "stated_belief", "pattern", "speculation"].map((claimKind, index) => ({
      id: `claim-${index}`, kind: claimKind, text: `A synthetic ${claimKind} statement.`, sourceIds: [sourceId],
    })),
    body: "Synthetic public research text for a deterministic fixture. ".repeat(5),
    provenance: { tool: "test" },
  });
}

function publication(value: PublicProfileIndex = packet(), username = "alice", revision = 1) {
  return { profileUrl: `https://soulscrape.com/${username}/${value.subject.handle}`,
    packetDigest: personIndexDigest(value), revision, packet: value };
}

function index(...publications: ReturnType<typeof publication>[]) {
  return buildKnowledgeIndex(JSON.stringify(publications));
}

function related(value: PersonIndex, target: Partial<NonNullable<PersonIndex["relations"]>[number]>) {
  return parsePersonIndex({ ...value, relations: [{ id: "rel-work", kind: "employed_by",
    target: "example-organization", targetName: "Example Organization", targetKind: "organization",
    sourceIds: [value.sources[0]!.id], ...target }] });
}

describe("public knowledge projection", () => {
  test("explicit QID references collect attributed views without claiming verified identity", () => {
    const first = publication(packet("example-person", "person", "Q42"));
    const second = publication(packet("another-handle", "person", "Q42"), "bravo");
    const result = index(first, second);
    expect(result.schemaVersion).toBe("soulscrape.knowledge-index.v1");
    expect(result.scope).toBe("supplied-publications");
    expect(result.authority).toBe("unasserted");
    expect(result.subjects).toHaveLength(1);
    expect(result.subjects[0]).toMatchObject({ kind: "person", binding: "publisher-asserted-qid", wikidataId: "Q42" });
    expect(result.subjects[0]!.profileUrls).toEqual([first.profileUrl, second.profileUrl]);
    expect(result.publications).toHaveLength(2);
    expect(result.claims).toHaveLength(8);
  });

  test("same names, handles, and official sites do not join different publishers", () => {
    const value = parsePersonIndex({ ...packet(), subject: { ...packet().subject,
      identity: { officialSite: "https://example.test" } } });
    const result = index(publication(value), publication(value, "bravo"));
    expect(result.subjects).toHaveLength(2);
    expect(result.subjects.every(subject => subject.binding === "publisher-scoped-profile")).toBe(true);
  });

  test("person and organization assertions of the same QID stay distinct", () => {
    const result = index(publication(packet("person-subject", "person", "Q42")),
      publication(packet("organization-subject", "organization", "Q42"), "bravo"));
    expect(result.subjects).toHaveLength(2);
    expect(result.identityConflicts).toEqual([{ wikidataId: "Q42", subjectIds: result.subjects.map(subject => subject.id).sort() }]);
  });

  test("products resolve only explicitly typed product targets and never merge with organizations by QID", () => {
    const base = packet("example-product");
    const makeProduct = (handle: string) => parseProductIndex({ ...base,
      schemaVersion: "soulscrape.product-index.v1", indexId: `pidx-${handle}`,
      subject: { ...base.subject, kind: "product", handle, identity: { wikidataId: "Q42" } } });
    const product = makeProduct("example-product");
    const other = makeProduct("other-product");
    const related = parseProductIndex({ ...product, relations: [{ id: "rel-other", kind: "other",
      target: "other-product", targetName: "Other Product", targetKind: "product",
      sourceIds: [product.sources[0]!.id] }] });
    const explicit = index(publication(related), publication(other, "alice"),
      publication(packet("example-organization", "organization", "Q42"), "bravo"));
    expect(explicit.subjects.filter(subject => subject.kind === "product")).toHaveLength(1);
    expect(explicit.subjects.filter(subject => subject.kind === "organization")).toHaveLength(1);
    expect(explicit.identityConflicts).toHaveLength(1);
    expect(explicit.relations[0]).toMatchObject({ resolution: "publisher-handle", targetKind: "product" });
    const implicit = parseProductIndex({ ...product, relations: [{ id: "rel-other", kind: "other",
      target: "other-product", targetName: "Other Product", sourceIds: [product.sources[0]!.id] }] });
    expect(index(publication(implicit), publication(other)).relations[0]?.resolution).toBe("unresolved");
  });

  test("source resource identity ignores metadata dates while retaining each occurrence", () => {
    const first = packet();
    const url = "https://example.test/interview?utm_medium=email#different";
    const id = stablePersonSourceId(url, "2024-05");
    const second = parsePersonIndex({ ...packet("another-person"),
      sources: [{ ...first.sources[0], id, url, publishedAt: "2024-05", title: "A different supplied title" }],
      claims: first.claims.map(claim => ({ ...claim, sourceIds: [id] })) });
    const result = index(publication(first), publication(second, "bravo"));
    expect(result.sources).toHaveLength(1);
    expect(result.sources[0]!.url).toBe("https://example.test/interview");
    expect(result.sources[0]!.occurrences).toHaveLength(2);
    expect(result.sources[0]!.occurrences.map(occurrence => occurrence.source.publishedAt)).toEqual(["2024", "2024-05"]);
    expect(result.sources[0]!.occurrences.map(occurrence => occurrence.source.id)).toEqual([first.sources[0]!.id, id]);
    expect(new Set(result.claims.map(claim => claim.citations[0]!.resourceId)).size).toBe(1);
  });

  test("claim kinds, dates, publisher attribution, and original citation references survive", () => {
    const value = publication(packet(), "alice", 7);
    const result = index(value);
    expect(result.claims.map(claim => claim.kind).sort()).toEqual(["fact", "pattern", "speculation", "stated_belief"]);
    for (const claim of result.claims) {
      expect(claim.attribution).toEqual({ profileUrl: value.profileUrl, packetDigest: value.packetDigest, revision: 7 });
      expect(claim.asOf).toBe(value.packet.scope.asOf);
      expect(claim.citations).toEqual([{ resourceId: result.sources[0]!.id, sourceId: value.packet.sources[0]!.id }]);
    }
    expect(result.omittedCollections).toEqual(["body", "themes", "works", "openQuestions", "unboundTimeline", "unboundParticipants"]);
    expect(JSON.stringify(result)).not.toContain(value.packet.body);
  });

  test("explicit typed relation references meet a subject across publishers", () => {
    const person = related(packet(), { targetWikidataId: "Q99", target: "another-spelling" });
    const org = packet("company", "organization", "Q99");
    const result = index(publication(person), publication(org, "bravo"));
    const company = result.publications.find(item => item.subjectKind === "organization")!;
    expect(result.relations[0]).toMatchObject({ to: company.subjectId, resolution: "publisher-asserted-qid", origin: "relation", kind: "employed_by" });
    expect(result.subjects).toHaveLength(2);
  });

  test("same-publisher handle bindings connect without borrowing cross-publisher handles", () => {
    const person = related(packet(), {});
    const organization = packet("example-organization", "organization");
    const local = index(publication(person), publication(organization));
    expect(local.relations[0]!.to).toBe(local.publications.find(item => item.subjectKind === "organization")!.subjectId);
    const foreign = index(publication(person), publication(organization, "bravo"));
    expect(foreign.relations[0]!.to).not.toBe(foreign.publications.find(item => item.subjectKind === "organization")!.subjectId);
    expect(foreign.relations[0]!.resolution).toBe("unresolved");
  });

  test("conflicting kind and QID never silently resolve through a matching slug", () => {
    const person = related(packet(), { targetWikidataId: "Q99" });
    const organization = packet("example-organization", "organization", "Q100");
    const result = index(publication(person), publication(organization));
    expect(result.relations[0]!.to).not.toBe(result.publications.find(item => item.subjectKind === "organization")!.subjectId);
    const mismatch = index(publication(related(packet(), { targetKind: "person" })), publication(organization));
    expect(mismatch.relations[0]!.resolution).toBe("unresolved");
  });

  test("a QID with unknown target kind remains publisher-scoped instead of guessing", () => {
    const original = related(packet(), { targetWikidataId: "Q99" });
    const relation = { ...original.relations![0]! };
    delete relation.targetKind;
    const value = parsePersonIndex({ ...original, relations: [relation] });
    const result = index(publication(value), publication(packet("company", "organization", "Q99"), "bravo"));
    expect(result.relations[0]!.resolution).toBe("unresolved");
    expect(result.subjects.find(subject => subject.id === result.relations[0]!.to)!.kind).toBe("unknown");
  });

  test("timeline and appearance links retain distinct meaning and partial dates", () => {
    const value = packet();
    const sourceIds = [value.sources[0]!.id];
    const rich = parsePersonIndex({ ...value,
      timeline: [{ id: "event-role", kind: "role", date: "2024-02", title: "Joined the organization",
        organization: "Example Organization", organizationHandle: "example-organization", sourceIds }],
      appearances: [{ id: "appearance-talk", title: "Shared interview", publishedAt: "2024", participants: ["A Peer"],
        participantHandles: [{ name: "A Peer", handle: "another-person" }], sourceIds }],
    });
    const result = index(publication(rich), publication(packet("example-organization", "organization")), publication(packet("another-person")));
    expect(result.relations.find(relation => relation.origin === "timeline")).toMatchObject({ kind: "role", start: "2024-02" });
    expect(result.relations.find(relation => relation.origin === "appearance")).toMatchObject({ kind: "appeared_with", start: "2024" });
    expect(result.relations.some(relation => relation.kind === "collaborated")).toBe(false);
  });

  test("participant aliases cannot duplicate a co-presence edge", () => {
    const value = packet();
    const rich = parsePersonIndex({ ...value, appearances: [{ id: "appearance-aliases", title: "Interview",
      participants: ["A Peer", "Peer Alias"], participantHandles: [{ name: "A Peer", handle: "another-person" },
        { name: "Peer Alias", handle: "another-person" }], sourceIds: [value.sources[0]!.id] }] });
    const result = index(publication(rich));
    expect(result.relations).toHaveLength(1);
    expect(result.subjects.find(subject => subject.id === result.relations[0]!.to)!.labels.map(label => label.text).sort())
      .toEqual(["A Peer", "Peer Alias"]);
  });

  test("rebuilding without a withdrawn publication removes only its contributions", () => {
    const first = publication(packet("example-person", "person", "Q42"));
    const second = publication(packet("another-person", "person", "Q42"), "bravo");
    const before = index(first, second);
    const after = index(second);
    expect(after.subjects[0]!.id).toBe(before.subjects[0]!.id);
    expect(after.subjects[0]!.profileUrls).toEqual([second.profileUrl]);
    expect(after.sources[0]!.occurrences).toHaveLength(1);
    expect(after.claims).toHaveLength(4);
    expect(JSON.stringify(after)).not.toContain(first.profileUrl);
    expect(index().subjects).toEqual([]);
  });

  test("updates keep record locators stable but replace attributed content and digest", () => {
    const original = packet();
    const updated = parsePersonIndex({ ...original, claims: original.claims.map(claim => ({ ...claim, text: "Revised statement." })) });
    const before = index(publication(original));
    const after = index(publication(updated, "alice", 2));
    expect(after.claims.map(claim => claim.id)).toEqual(before.claims.map(claim => claim.id));
    expect(after.claims[0]!.attribution.packetDigest).not.toBe(before.claims[0]!.attribution.packetDigest);
    expect(after.claims[0]!.attribution.revision).toBe(2);
    expect(after.digest).not.toBe(before.digest);
  });

  test("publication input order cannot change output or digest", () => {
    const rows = [publication(packet("first-person", "person", "Q42")), publication(packet("second-person"), "bravo")];
    expect(index(...rows)).toEqual(index(...rows.toReversed()));
  });

  test("every checked-in public packet projects without rewriting its digest", () => {
    const root = new URL("../../examples/people/", import.meta.url);
    const directories = readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory());
    expect(directories.length).toBeGreaterThan(0);
    for (const directory of directories) {
      const value = parsePersonIndex(JSON.parse(readFileSync(new URL(`${directory.name}/person-index.json`, root), "utf8")));
      const original = publication(value, "ben");
      const result = index(original);
      expect(result.publications[0]!.packetDigest).toBe(original.packetDigest);
      expect(result.claims).toHaveLength(value.claims.length);
      expect(result.sources.reduce((total, source) => total + source.occurrences.length, 0)).toBe(value.sources.length);
    }
  });

  test("frozen packet source IDs and digests remain unchanged", () => {
    const value = publication();
    const before = JSON.stringify(value);
    index(value);
    expect(JSON.stringify(value)).toBe(before);
    expect(personIndexDigest(value.packet)).toBe(value.packetDigest);
  });

  test("malformed, mismatched, private-marked, and duplicate publications fail closed", () => {
    const value = publication();
    const invalid = [
      [{ ...value, profileUrl: "https://soulscrape.com/alice/wrong-handle" }],
      [{ ...value, profileUrl: "https://evil.test/alice/example-person" }],
      [{ ...value, revision: 0 }], [{ ...value, revision: 1.5 }],
      [{ ...value, packetDigest: "0".repeat(64) }], [{ ...value, visibility: "private" }],
      [value, value], [{ ...value, packet: { ...value.packet, sources: [] } }],
    ];
    for (const candidate of invalid) expect(() => buildKnowledgeIndex(JSON.stringify(candidate))).toThrow();
    expect(() => buildKnowledgeIndex('[{"revision":1,"revision":2}]')).toThrow();
    expect(() => buildKnowledgeIndex("null")).toThrow();
  });

  test("limits reject oversized, too-deep, and excessive inputs before projection", () => {
    expect(() => buildKnowledgeIndex(" ".repeat(KNOWLEDGE_INPUT_MAX_BYTES + 1))).toThrow();
    expect(() => buildKnowledgeIndex("[".repeat(65) + "0" + "]".repeat(65))).toThrow();
    const rows = Array.from({ length: KNOWLEDGE_MAX_PUBLICATIONS + 1 }, (_, i) => publication(packet(`subject-${i}`)));
    expect(() => index(...rows)).toThrow();
  });
});

describe("versioned source resource keys", () => {
  test("normalizes only known tracking and exact YouTube hosts", () => {
    expect(canonicalKnowledgeSourceUrl("https://EXAMPLE.test:443/article?b=2&utm_source=x&a=1#section")).toBe("https://example.test/article?a=1&b=2");
    expect(canonicalKnowledgeSourceUrl("https://youtu.be/abc?t=12")).toBe("https://www.youtube.com/watch?v=abc");
    expect(canonicalKnowledgeSourceUrl("https://www.youtube.com/watch?v=abc&t=12")).toBe("https://www.youtube.com/watch?v=abc");
    expect(canonicalKnowledgeSourceUrl("https://notyoutube.com/watch?v=abc&edition=one")).toContain("edition=one");
    expect(canonicalKnowledgeSourceUrl("https://example.test/article?edition=one")).not.toBe(canonicalKnowledgeSourceUrl("https://example.test/article?edition=two"));
  });

  test("does not equate HTTP, mirrors, or distinct duplicate-query order", () => {
    expect(canonicalKnowledgeSourceUrl("http://example.test/article")).not.toBe(canonicalKnowledgeSourceUrl("https://example.test/article"));
    expect(canonicalKnowledgeSourceUrl("https://mirror.test/article")).not.toBe(canonicalKnowledgeSourceUrl("https://example.test/article"));
    expect(canonicalKnowledgeSourceUrl("https://example.test/?part=1&part=2")).not.toBe(canonicalKnowledgeSourceUrl("https://example.test/?part=2&part=1"));
  });

  test("ambiguous video URLs stay distinct rather than invalidating an admitted packet", () => {
    expect(canonicalKnowledgeSourceUrl("https://youtu.be/")).toBe("https://youtu.be/");
    expect(canonicalKnowledgeSourceUrl("https://www.youtube.com/watch?v=one&v=two"))
      .toBe("https://www.youtube.com/watch?v=one&v=two");
    expect(canonicalKnowledgeSourceUrl("https://www.youtube.com/watch?v=one&v=two"))
      .not.toBe(canonicalKnowledgeSourceUrl("https://www.youtube.com/watch?v=one"));
  });

  test("rejects executable URLs, credentials, and invalid URLs", () => {
    for (const url of ["javascript:alert(1)", "file:///private/source", "https://user:password@example.test", "no URL"]) {
      expect(() => canonicalKnowledgeSourceUrl(url)).toThrow();
    }
  });
});
