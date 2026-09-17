import { describe, expect, test } from "bun:test";

import {
  corpusDigest,
  corpusGraph,
  corpusIndexEntries,
  corpusQuestions,
  corpusThemes,
  PublicGraphRow,
  sinceFilter,
} from "../lib/corpus-graph";

function row(overrides: Partial<PublicGraphRow>): PublicGraphRow {
  return {
    username: "ben",
    handle: "a-person",
    displayName: "A Person",
    subjectKind: "person",
    summary: "Summary.",
    packetDigest: "d".repeat(64),
    revision: 1,
    publishedAtMs: 1,
    updatedAtMs: 1,
    relations: [],
    timeline: [],
    ...overrides,
  };
}

describe("corpus graph projection", () => {
  test("index entries carry digest, revision, kind, and wikidata binding", () => {
    const entries = corpusIndexEntries([
      row({ handle: "dwarkesh-patel", displayName: "Dwarkesh Patel", subjectKind: "person", wikidataId: "Q117351346" }),
    ]);
    expect(entries).toHaveLength(1);
    expect(entries[0]?.handle).toBe("dwarkesh-patel");
    expect(entries[0]?.subjectKind).toBe("person");
    expect(entries[0]?.wikidataId).toBe("Q117351346");
    expect(entries[0]?.packetDigest).toBe("d".repeat(64));
  });

  test("edges resolve to same-publisher profiles by slug", async () => {
    const { nodes, edges } = await corpusGraph([
      row({ handle: "dwarkesh-patel", relations: [{ target: "andrej-karpathy", kind: "interviewed", targetName: "Andrej Karpathy" }] }),
      row({ handle: "andrej-karpathy" }),
    ]);
    expect(edges).toHaveLength(1);
    expect(edges[0]?.from).toBe("ben/dwarkesh-patel");
    expect(edges[0]?.to).toBe("ben/andrej-karpathy");
    expect(nodes.filter(n => n.kind === "profile")).toHaveLength(2);
  });

  test("edges resolve across slug spellings when a QID binds the target", async () => {
    const { edges } = await corpusGraph([
      row({
        handle: "dwarkesh-patel",
        relations: [{ target: "karpathy", kind: "interviewed", targetWikidataId: "Q117320937", targetName: "Andrej Karpathy" }],
      }),
      row({ handle: "andrej-karpathy", wikidataId: "Q117320937" }),
    ]);
    expect(edges[0]?.to).toBe("ben/andrej-karpathy");
  });

  test("unindexed targets become qid-keyed stubs that merge across packets", async () => {
    const { nodes, edges } = await corpusGraph([
      row({ handle: "a", relations: [{ target: "robert-fripp", kind: "collaborated", targetWikidataId: "Q208638", targetName: "Robert Fripp" }] }),
      row({ handle: "b", relations: [{ target: "fripp", kind: "collaborated", targetWikidataId: "Q208638", targetName: "Robert Fripp" }] }),
    ]);
    expect(nodes).toHaveLength(3); // two profiles + one merged stub
    const stub = nodes.find(n => n.kind === "external");
    expect(stub?.id).toBe("qid:ben/Q208638");
    expect(edges.map(e => e.to)).toEqual(["qid:ben/Q208638", "qid:ben/Q208638"]);
  });

  test("unbound unindexed targets fall back to slug stubs", async () => {
    const { nodes, edges } = await corpusGraph([
      row({ handle: "a", relations: [{ target: "obscure-person", kind: "collaborated", start: "2001", end: "2003" }] }),
    ]);
    const stub = nodes.find(n => n.kind === "external");
    expect(stub?.id).toBe("slug:ben/obscure-person");
    expect(edges[0]?.start).toBe("2001");
    expect(edges[0]?.end).toBe("2003");
  });

  test("edges carry their source ids through the projection", async () => {
    const { edges } = await corpusGraph([
      row({ handle: "a", relations: [{ target: "b", kind: "mentored_by", sourceIds: ["source-abc123"] }] }),
    ]);
    expect(edges[0]?.sourceIds).toEqual(["source-abc123"]);
    expect(edges[0]?.origin).toBe("relation");
  });

  test("edge ids are deterministic and distinct per edge", async () => {
    const rows = [
      row({ handle: "a", relations: [
        { target: "b", kind: "collaborated" },
        { target: "c", kind: "collaborated" },
        { target: "b", kind: "interviewed" },
      ] }),
    ];
    const first = await corpusGraph(rows);
    const second = await corpusGraph(rows);
    expect(first.edges.map(e => e.id)).toEqual(second.edges.map(e => e.id));
    for (const edge of first.edges) expect(edge.id).toMatch(/^edge-[0-9a-f]{64}$/u);
    expect(new Set(first.edges.map(e => e.id)).size).toBe(3); // distinct targets/kinds → distinct ids
    const third = await corpusGraph([
      row({ handle: "a", relations: [{ target: "b", kind: "collaborated", note: "changed" }] }),
    ]);
    expect(third.edges[0]?.id).not.toBe(first.edges[0]?.id); // material participates in the id
  });

  test("org-bound timeline events emit derived edges that join slug stubs", async () => {
    const { nodes, edges } = await corpusGraph([
      row({
        handle: "a",
        relations: [{ target: "some-org", kind: "employed_by", targetName: "Some Org", targetKind: "organization" }],
        timeline: [{
          kind: "role",
          date: "2016",
          end: "2019",
          title: "Staff engineer",
          organization: "Some Org",
          organizationHandle: "some-org",
          sourceIds: ["source-def456"],
        }],
      }),
    ]);
    expect(edges).toHaveLength(2);
    const derived = edges.find(e => e.origin === "timeline");
    // The derived edge joins the same slug stub the relation edge created.
    expect(derived?.to).toBe("slug:ben/some-org:organization");
    expect(derived?.kind).toBe("role");
    expect(derived?.start).toBe("2016");
    expect(derived?.end).toBe("2019");
    expect(derived?.note).toBe("Staff engineer");
    expect(derived?.sourceIds).toEqual(["source-def456"]);
    const stub = nodes.find(n => n.id === "slug:ben/some-org:organization");
    expect(stub?.subjectKind).toBe("organization");
    expect(stub?.displayName).toBe("Some Org");
  });

  test("timeline edges resolve to same-publisher profile nodes by slug", async () => {
    const { edges } = await corpusGraph([
      row({ handle: "a", timeline: [{ kind: "role", date: "2020", title: "Engineer", organizationHandle: "some-org" }] }),
      row({ handle: "some-org", subjectKind: "organization" }),
    ]);
    const derived = edges.find(e => e.origin === "timeline");
    expect(derived?.to).toBe("ben/some-org");
  });

  test("bound appearance participants emit appeared_with edges and skip self-loops", async () => {
    const { nodes, edges } = await corpusGraph([
      row({
        handle: "dwarkesh-patel",
        appearances: [{
          title: "Interview #1",
          publishedAt: "2024-03-01",
          participantHandles: [
            { name: "Dwarkesh Patel", handle: "dwarkesh-patel" },
            { name: "Andrej Karpathy", handle: "andrej-karpathy" },
            { name: "Unindexed Guest", handle: "unindexed-guest" },
          ],
          sourceIds: ["source-aaa111"],
        }],
      }),
      row({ handle: "andrej-karpathy" }),
    ]);
    const appeared = edges.filter(e => e.origin === "appearance");
    expect(appeared).toHaveLength(2); // self-loop skipped
    const karpathy = appeared.find(e => e.to === "ben/andrej-karpathy");
    expect(karpathy?.kind).toBe("appeared_with");
    expect(karpathy?.note).toBe("Interview #1");
    expect(karpathy?.start).toBe("2024-03-01");
    expect(karpathy?.sourceIds).toEqual(["source-aaa111"]);
    const stub = nodes.find(n => n.id === "slug:ben/unindexed-guest");
    expect(stub?.displayName).toBe("Unindexed Guest");
  });

  test("row deltas resolve every origin against unchanged live profile context", async () => {
    const rows = [
      row({
        handle: "changed",
        updatedAtMs: 200,
        relations: [{ target: "alias", targetWikidataId: "Q123", kind: "collaborated" }],
        timeline: [{ kind: "role", title: "Engineer", date: "2020", organizationHandle: "org" }],
        appearances: [{ title: "Interview", participantHandles: [{ name: "Guest", handle: "guest" }] }],
      }),
      row({ handle: "target", wikidataId: "Q123", updatedAtMs: 100 }),
      row({ handle: "org", subjectKind: "organization", updatedAtMs: 100 }),
      row({ handle: "guest", updatedAtMs: 100 }),
      row({ handle: "unrelated", updatedAtMs: 100, relations: [{ target: "other", kind: "collaborated" }] }),
    ];
    const full = await corpusGraph(rows);
    const delta = await corpusGraph(rows, sinceFilter(rows, "150"));
    expect(delta.edges).toEqual(full.edges.filter(edge => edge.from === "ben/changed"));
    expect(delta.nodes.filter(node => node.kind === "external")).toEqual([]);
    expect(delta.nodes.map(node => node.id).sort()).toEqual(["ben/changed", "ben/guest", "ben/org", "ben/target"]);
  });

  test("conflicting QID or kind never binds solely by slug", async () => {
    for (const target of [
      row({ handle: "target", subjectKind: "person", wikidataId: "Q999" }),
      row({ handle: "target", subjectKind: "organization", wikidataId: "Q123" }),
    ]) {
      const graph = await corpusGraph([
        row({ relations: [{ target: "target", kind: "collaborated", targetKind: "person", targetWikidataId: "Q123" }] }),
        target,
      ]);
      expect(graph.edges[0]?.to).not.toBe("ben/target");
      expect(graph.nodes.find(node => node.id === graph.edges[0]?.to)?.kind).toBe("external");
    }
    const graph = await corpusGraph([
      row({ timeline: [{ kind: "role", date: "2020", title: "Engineer", organizationHandle: "target" }] }),
      row({ handle: "target", subjectKind: "person" }),
    ]);
    expect(graph.edges[0]?.to).not.toBe("ben/target");
  });

  test("ambiguous same-publisher QIDs stay external even with a matching slug", async () => {
    for (const target of ["alias", "one"]) {
      const source = row({ relations: [{ target, kind: "collaborated", targetWikidataId: "Q123", targetKind: "person" }] });
      const one = row({ handle: "one", wikidataId: "Q123", subjectKind: "person" });
      const two = row({ handle: "two", wikidataId: "Q123", subjectKind: "organization" });
      const first = await corpusGraph([source, one, two]);
      const reversed = await corpusGraph([two, one, source]);
      expect(first.edges[0]?.to).toBe(reversed.edges[0]?.to);
      expect(first.nodes.find(node => node.id === first.edges[0]?.to)?.kind).toBe("external");
    }
  });

  test("unbound stubs and asserted QIDs never borrow another publisher's identity", async () => {
    const rows = ["ben", "other"].map(username => row({
      username,
      relations: [
        { target: "target", kind: "collaborated" },
        { target: "alias", kind: "collaborated", targetWikidataId: "Q123" },
      ],
      timeline: [{ kind: "role", date: "2020", title: "Engineer", organizationHandle: "org" }],
      appearances: [{ title: "Interview", participantHandles: [{ name: "Guest", handle: "guest" }] }],
    }));
    const graph = await corpusGraph([...rows, row({ username: "foreign", handle: "target", wikidataId: "Q123" })]);
    const ben = graph.edges.filter(edge => edge.from === "ben/a-person").map(edge => edge.to);
    const other = graph.edges.filter(edge => edge.from === "other/a-person").map(edge => edge.to);
    expect(ben).toHaveLength(4);
    expect(ben.every(id => !other.includes(id))).toBe(true);
    expect(graph.edges.every(edge => edge.to !== "foreign/target")).toBe(true);
    expect(graph.nodes.find(node => node.id === ben[0])?.wikidataId).toBeUndefined();
    expect(graph.nodes.find(node => node.id === ben[1])).toMatchObject({ username: "ben", wikidataId: "Q123", binding: "publisher-asserted-qid" });
  });

  test("conflicting asserted stub kinds do not collapse", async () => {
    const { edges } = await corpusGraph([row({ relations: [
      { target: "target", kind: "collaborated", targetKind: "person", targetWikidataId: "Q123" },
      { target: "target", kind: "collaborated", targetKind: "organization", targetWikidataId: "Q123" },
      { target: "unbound", kind: "collaborated", targetKind: "person" },
      { target: "unbound", kind: "collaborated", targetKind: "organization" },
    ] })]);
    expect(new Set(edges.map(edge => edge.to)).size).toBe(4);
  });

  test("edge hash preimages frame partial dates and adjacent text fields", async () => {
    const { edges } = await corpusGraph([row({ relations: [
      { target: "target", kind: "collaborated", start: "2020", note: "-01title" },
      { target: "target", kind: "collaborated", start: "2020-01", note: "title" },
    ] })]);
    expect(edges[0]?.id).not.toBe(edges[1]?.id);
  });

  test("authored record ids distinguish identical collection titles and dates", async () => {
    const rows = [row({
      relations: ["relation-a", "relation-b"].map(id => ({ id, target: "target", kind: "collaborated", sourceIds: ["source-one"] })),
      timeline: ["event-a", "event-b"].map(id => ({ id, kind: "role", date: "2020", title: "Engineer", organizationHandle: "org", sourceIds: ["source-one"] })),
      appearances: ["appearance-a", "appearance-b"].map(id => ({ id, title: "Interview", publishedAt: "2020", participantHandles: [{ name: "Guest", handle: "guest" }], sourceIds: ["source-one"] })),
    })];
    const graph = await corpusGraph(rows);
    expect(graph.edges).toHaveLength(6);
    expect(new Set(graph.edges.map(edge => edge.id)).size).toBe(6);
    expect(graph.edges.map(edge => edge.recordId).sort()).toEqual(["appearance-a", "appearance-b", "event-a", "event-b", "relation-a", "relation-b"]);
    expect(graph.edges.every(edge => edge.sourceIds?.[0] === "source-one")).toBe(true);
  });

  test("authored edge identities survive record edits and target resolution changes", async () => {
    const original = row({
      relations: [{ id: "relation-one", target: "alias", targetWikidataId: "Q123", kind: "collaborated", start: "2020", end: "2021", note: "Original", sourceIds: ["source-one"] }],
      timeline: [{ id: "event-one", kind: "role", date: "2020", title: "Engineer", organizationHandle: "org", sourceIds: ["source-one"] }],
      appearances: [{ id: "appearance-one", title: "Interview", publishedAt: "2020", participantHandles: [{ name: "Guest", handle: "guest" }], sourceIds: ["source-one"] }],
    });
    const changed = row({
      relations: [{ id: "relation-one", target: "alias", targetWikidataId: "Q123", kind: "interviewed", start: "2020-01", end: "2022", note: "Corrected", sourceIds: ["source-two"] }],
      timeline: [{ id: "event-one", kind: "founded", date: "2020-01", end: "2022", title: "Founder", organizationHandle: "org", sourceIds: ["source-two"] }],
      appearances: [{ id: "appearance-one", title: "Corrected interview", publishedAt: "2020-01", participantHandles: [{ name: "Guest", handle: "guest" }], sourceIds: ["source-two"] }],
    });
    const first = await corpusGraph([original]);
    const revised = await corpusGraph([
      changed,
      row({ handle: "target", wikidataId: "Q123" }),
      row({ handle: "org", subjectKind: "organization" }),
      row({ handle: "guest" }),
    ], [changed]);
    expect(first.edges.map(edge => edge.id)).toEqual(revised.edges.map(edge => edge.id));
    expect(first.edges.every(edge => edge.resolution === "external")).toBe(true);
    expect(revised.edges.map(edge => edge.to)).toEqual(["ben/target", "ben/org", "ben/guest"]);
    expect(revised.edges.every(edge => edge.sourceIds?.[0] === "source-two")).toBe(true);
  });

  test("authored edge identities distinguish publisher, source, origin, record and appearance participant", async () => {
    const source = row({
      relations: [{ id: "record-one", target: "guest", kind: "appeared_with" }],
      timeline: [{ id: "record-one", kind: "appeared_with", date: "2020", title: "Interview", organizationHandle: "guest" }],
      appearances: ["record-one", "record-two"].map(id => ({
        id,
        title: "Interview",
        participantHandles: [{ name: "Guest", handle: "guest" }, { name: "Other", handle: "other" }],
      })),
    });
    const { edges } = await corpusGraph([source, { ...source, username: "other" }, { ...source, handle: "another-source" }]);
    expect(edges).toHaveLength(18);
    expect(new Set(edges.map(edge => edge.id)).size).toBe(18);
    const reversed = await corpusGraph([{ ...source, appearances: source.appearances?.map(appearance => ({
      ...appearance,
      participantHandles: [...appearance.participantHandles].reverse(),
    })) }]);
    expect(reversed.edges.map(edge => edge.id).sort()).toEqual(edges.slice(0, 6).map(edge => edge.id).sort());
  });

  test("legacy edge material includes end dates and evidence with order-stable source ids", async () => {
    const relation = { target: "target", kind: "collaborated", start: "2020", end: "2021", sourceIds: ["source-one", "source-two"] };
    const first = await corpusGraph([row({ relations: [relation] })]);
    const reversed = await corpusGraph([row({ relations: [{ ...relation, sourceIds: [...relation.sourceIds].reverse() }] })]);
    const changedEnd = await corpusGraph([row({ relations: [{ ...relation, end: "2022" }] })]);
    const changedEvidence = await corpusGraph([row({ relations: [{ ...relation, sourceIds: ["source-three"] }] })]);
    expect(first.edges[0]?.id).toBe(reversed.edges[0]?.id);
    expect(first.edges[0]?.id).not.toBe(changedEnd.edges[0]?.id);
    expect(first.edges[0]?.id).not.toBe(changedEvidence.edges[0]?.id);
  });

  test("empty replacement sets emit the changed source node without unrelated edges", async () => {
    const source = row({ handle: "changed", updatedAtMs: 200 });
    const unchanged = row({ handle: "old", updatedAtMs: 100, relations: [{ target: "target", kind: "collaborated" }] });
    expect(await corpusGraph([source, unchanged], [source])).toEqual({
      nodes: [{ id: "ben/changed", kind: "profile", handle: "changed", displayName: "A Person", username: "ben", subjectKind: "person" }],
      edges: [],
    });
  });

  test("corpus digest commits publisher locators and row revisions, not just a packet multiset", async () => {
    const base = row({});
    const digest = await corpusDigest([base]);
    for (const change of [
      { username: "other" },
      { handle: "other" },
      { revision: 2 },
      { publishedAtMs: 2 },
      { updatedAtMs: 2 },
    ]) {
      expect(await corpusDigest([row(change)])).not.toBe(digest);
    }
    const a = row({ handle: "a", packetDigest: "a".repeat(64) });
    const b = row({ handle: "b", packetDigest: "b".repeat(64) });
    expect(await corpusDigest([a, b])).not.toBe(await corpusDigest([
      { ...a, packetDigest: b.packetDigest },
      { ...b, packetDigest: a.packetDigest },
    ]));
  });

  test("facet feeds flatten themes and open questions with their subjects", () => {
    const rows = [
      row({ handle: "a", themes: [{ kind: "belief", title: "Cities matter", status: "stated" }], openQuestions: ["Was the move funded?"] }),
      row({ handle: "b", themes: [{ kind: "interest", title: "Rivers" }] }),
    ];
    const themes = corpusThemes(rows);
    expect(themes).toHaveLength(2);
    expect(themes.find(t => t.title === "Cities matter")).toMatchObject({
      subject: "ben/a",
      kind: "belief",
      status: "stated",
    });
    const questions = corpusQuestions(rows);
    expect(questions).toEqual([{ subject: "ben/a", question: "Was the move funded?" }]);
  });

  test("sinceFilter returns deltas and rejects bad input", () => {
    const old = row({ handle: "old", updatedAtMs: 100 });
    const fresh = row({ handle: "fresh", updatedAtMs: 200 });
    expect(sinceFilter([old, fresh], null)).toHaveLength(2);
    expect(sinceFilter([old, fresh], "150").map(r => r.handle)).toEqual(["fresh"]);
    expect(sinceFilter([old, fresh], "100")).toHaveLength(2);
    expect(sinceFilter([old, fresh], "0")).toHaveLength(2);
    expect(sinceFilter([old, fresh], String(Number.MAX_SAFE_INTEGER))).toEqual([]);
    expect(() => sinceFilter([old, fresh], "0".repeat(17))).toThrow(RangeError);
    expect(() => sinceFilter([old, fresh], "9007199254740992")).toThrow(RangeError);
    expect(() => sinceFilter([old, fresh], "nope")).toThrow(RangeError);
    expect(() => sinceFilter([old, fresh], "-5")).toThrow(RangeError);
  });

  test("corpusDigest is order-stable and changes with the live set", async () => {
    const a = row({ handle: "a", packetDigest: "a".repeat(64) });
    const b = row({ handle: "b", packetDigest: "b".repeat(64) });
    const first = await corpusDigest([a, b]);
    expect(first).toMatch(/^[0-9a-f]{64}$/u);
    expect(await corpusDigest([b, a])).toBe(first);
    expect(await corpusDigest([a])).not.toBe(first);
    expect(await corpusDigest([a, row({ handle: "b", packetDigest: "c".repeat(64) })])).not.toBe(first);
  });
});
