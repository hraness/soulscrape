import { describe, expect, test } from "bun:test";

import {
  corpusDigest,
  corpusGraph,
  corpusIndexEntries,
  PublicGraphRow,
} from "../lib/corpus-graph";

function row(overrides: Partial<PublicGraphRow>): PublicGraphRow {
  return {
    username: "ben",
    handle: "a-person",
    displayName: "A Person",
    summary: "Summary.",
    packetDigest: "d".repeat(64),
    revision: 1,
    publishedAtMs: 1,
    updatedAtMs: 1,
    relations: [],
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

  test("edges resolve to same-publisher profiles by slug", () => {
    const { nodes, edges } = corpusGraph([
      row({ handle: "dwarkesh-patel", relations: [{ target: "andrej-karpathy", kind: "interviewed", targetName: "Andrej Karpathy" }] }),
      row({ handle: "andrej-karpathy" }),
    ]);
    expect(edges).toHaveLength(1);
    expect(edges[0]?.from).toBe("ben/dwarkesh-patel");
    expect(edges[0]?.to).toBe("ben/andrej-karpathy");
    expect(nodes.filter(n => n.kind === "profile")).toHaveLength(2);
  });

  test("edges resolve across slug spellings when a QID binds the target", () => {
    const { edges } = corpusGraph([
      row({
        handle: "dwarkesh-patel",
        relations: [{ target: "karpathy", kind: "interviewed", targetWikidataId: "Q117320937", targetName: "Andrej Karpathy" }],
      }),
      row({ handle: "andrej-karpathy", wikidataId: "Q117320937" }),
    ]);
    expect(edges[0]?.to).toBe("ben/andrej-karpathy");
  });

  test("unindexed targets become qid-keyed stubs that merge across packets", () => {
    const { nodes, edges } = corpusGraph([
      row({ handle: "a", relations: [{ target: "robert-fripp", kind: "collaborated", targetWikidataId: "Q208638", targetName: "Robert Fripp" }] }),
      row({ handle: "b", relations: [{ target: "fripp", kind: "collaborated", targetWikidataId: "Q208638", targetName: "Robert Fripp" }] }),
    ]);
    expect(nodes).toHaveLength(3); // two profiles + one merged stub
    const stub = nodes.find(n => n.kind === "external");
    expect(stub?.id).toBe("qid:Q208638");
    expect(edges.map(e => e.to)).toEqual(["qid:Q208638", "qid:Q208638"]);
  });

  test("unbound unindexed targets fall back to slug stubs", () => {
    const { nodes, edges } = corpusGraph([
      row({ handle: "a", relations: [{ target: "obscure-person", kind: "collaborated", start: "2001", end: "2003" }] }),
    ]);
    const stub = nodes.find(n => n.kind === "external");
    expect(stub?.id).toBe("slug:obscure-person");
    expect(edges[0]?.start).toBe("2001");
    expect(edges[0]?.end).toBe("2003");
  });

  test("edges carry their source ids through the projection", () => {
    const { edges } = corpusGraph([
      row({ handle: "a", relations: [{ target: "b", kind: "mentored_by", sourceIds: ["source-abc123"] }] }),
    ]);
    expect(edges[0]?.sourceIds).toEqual(["source-abc123"]);
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
