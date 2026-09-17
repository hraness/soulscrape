import { afterEach, describe, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";

import { GET } from "../app/api/v1/graph.json/route";
import { publicGraph } from "../convex/people";
import { corpusDigest, corpusGraph, type PublicGraphRow } from "../lib/corpus-graph";

const originalConvexUrl = process.env.CONVEX_URL;

afterEach(() => {
  if (originalConvexUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalConvexUrl;
  spyOn(ConvexHttpClient.prototype, "query").mockRestore();
});

function row(overrides: Partial<PublicGraphRow> = {}): PublicGraphRow {
  return {
    username: "ben",
    handle: "source",
    displayName: "Source",
    subjectKind: "person",
    summary: "Public synthetic fixture.",
    packetDigest: "a".repeat(64),
    revision: 1,
    publishedAtMs: 100,
    updatedAtMs: 200,
    relations: [],
    ...overrides,
  };
}

function serve(rows: PublicGraphRow[]) {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  return spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue(rows);
}

describe("graph API projection contract", () => {
  test("retains the API envelope while marking v2 projection and bounded replacement semantics", async () => {
    const source = row({ relations: [{ target: "alias", targetWikidataId: "Q123", kind: "collaborated" }] });
    const target = row({ handle: "target", wikidataId: "Q123", updatedAtMs: 100, revision: 3 });
    const cleared = row({ handle: "cleared", revision: 2 });
    const rows = [source, target, cleared];
    serve(rows);
    const full = await corpusGraph(rows);
    const response = await GET(new Request("https://soulscrape.com/api/v1/graph.json?since=150"));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(body).toMatchObject({
      ok: true,
      version: "soulscrape.api.v1",
      projectionVersion: "soulscrape.graph.v2",
      corpusDigestVersion: "soulscrape.corpus.v2",
      corpusDigest: await corpusDigest(rows),
      meta: { profiles: 2, nodes: 3, edges: 1 },
      sync: {
        mode: "row-delta",
        sinceMs: 150,
        replacement: "outbound-sets-for-changed-sources",
        scope: "bounded-live-corpus",
        complete: false,
        deletionsIncluded: false,
        fullReconciliationRequired: true,
        asOfMsMeaning: "response-start-not-cursor",
      },
    });
    expect(typeof body.asOfMs).toBe("number");
    expect(body.edges).toEqual(full.edges);
    expect(body.nodes.find((node: { id: string }) => node.id === "ben/target")).toMatchObject({ kind: "profile" });
    expect(body.changedSources).toEqual([source, cleared].map(source => ({
      id: `ben/${source.handle}`,
      username: source.username,
      handle: source.handle,
      packetDigest: source.packetDigest,
      revision: source.revision,
      updatedAtMs: source.updatedAtMs,
    })));
  });

  test("full and empty delta responses describe their different row scope but share a corpus digest", async () => {
    serve([row()]);
    const full = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json"))).json();
    const delta = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json?since=999"))).json();
    expect(full.sync).toMatchObject({ mode: "full", sinceMs: null, complete: false });
    expect(full.changedSources).toHaveLength(1);
    expect(delta.sync.mode).toBe("row-delta");
    expect(delta.changedSources).toEqual([]);
    expect(delta.nodes).toEqual([]);
    expect(delta.edges).toEqual([]);
    expect(delta.corpusDigest).toBe(full.corpusDigest);
  });

  test("unchanged-source resolution changes affect the corpus digest but require full reconciliation", async () => {
    const source = row({ updatedAtMs: 100, relations: [{ id: "relation-one", target: "alias", targetWikidataId: "Q123", kind: "collaborated" }] });
    serve([source]);
    const before = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json"))).json();
    serve([source, row({ handle: "target", wikidataId: "Q123", updatedAtMs: 200 })]);
    const delta = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json?since=150"))).json();
    const full = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json"))).json();
    expect(delta.changedSources.map((source: { id: string }) => source.id)).toEqual(["ben/target"]);
    expect(delta.edges).toEqual([]);
    expect(delta.sync).toMatchObject({ complete: false, deletionsIncluded: false, fullReconciliationRequired: true });
    expect(delta.corpusDigest).not.toBe(before.corpusDigest);
    expect(delta.corpusDigest).toBe(full.corpusDigest);
    expect(full.edges[0].to).toBe("ben/target");
    expect(full.edges[0].id).toBe(before.edges[0].id);
  });

  test("applying the same replacement delta twice preserves unchanged edges and clears removed edges", async () => {
    const source = row({ updatedAtMs: 100, relations: [{ id: "relation-one", target: "old-target", kind: "collaborated" }] });
    const cleared = row({ handle: "cleared", updatedAtMs: 100, relations: [{ id: "relation-cleared", target: "old-target", kind: "collaborated" }] });
    const unchanged = row({ handle: "unchanged", updatedAtMs: 100, relations: [{ id: "relation-unchanged", target: "old-target", kind: "collaborated" }] });
    const before = await corpusGraph([source, cleared, unchanged]);
    const updated = [
      { ...source, revision: 2, updatedAtMs: 200, relations: [{ id: "relation-one", target: "new-target", kind: "interviewed" }] },
      { ...cleared, revision: 2, updatedAtMs: 200, relations: [] },
      unchanged,
    ];
    serve(updated);
    const delta = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json?since=150"))).json();
    const stored = new Map(before.edges.map(edge => [edge.id, edge]));
    const apply = () => {
      const changed = new Set(delta.changedSources.map((source: { id: string }) => source.id));
      for (const [id, edge] of stored) if (changed.has(edge.from)) stored.delete(id);
      for (const edge of delta.edges) stored.set(edge.id, edge);
    };
    apply();
    const once = [...stored.values()];
    apply();
    expect([...stored.values()]).toEqual(once);
    expect([...stored.values()].sort((a, b) => a.id.localeCompare(b.id))).toEqual(
      (await corpusGraph(updated)).edges.sort((a, b) => a.id.localeCompare(b.id)),
    );
    expect([...stored.values()].some(edge => edge.from === "ben/cleared")).toBe(false);
    expect(stored.get(before.edges[0]!.id)?.to).toBe("slug:ben/new-target");
  });

  test("rejects invalid timestamps before querying the provider", async () => {
    const query = serve([]);
    for (const value of ["", " ", "-1", "nope", "Infinity", "1.5", "1e3", "9007199254740992", "0".repeat(17)]) {
      const response = await GET(new Request(`https://soulscrape.com/api/v1/graph.json?since=${encodeURIComponent(value)}`));
      expect(response.status).toBe(400);
      expect(await response.json()).toMatchObject({ ok: false, error: { code: "BAD_SINCE" } });
    }
    expect(query).not.toHaveBeenCalled();
  });
});

describe("Convex public graph record projection", () => {
  test("preserves authored ids and citing source ids for all edge origins without changing packet bytes", async () => {
    const packet = {
      subject: { kind: "person", identity: { wikidataId: "Q123" } },
      relations: [{ id: "relation-one", target: "target", kind: "collaborated", sourceIds: ["source-one"] }],
      timeline: [{ id: "event-one", kind: "role", date: "2020", title: "Engineer", organizationHandle: "org", sourceIds: ["source-two"] }],
      appearances: [{ id: "appearance-one", title: "Interview", participantHandles: [{ name: "Guest", handle: "guest" }], sourceIds: ["source-three"] }],
    };
    const originalPacket = JSON.stringify(packet);
    const records = [{ ...row(), packet }, { ...row({ handle: "withdrawn" }), packet, withdrawnAtMs: 300 }];
    let scanLimit: number | undefined;
    const db = {
      query: (table: string) => {
        expect(table).toBe("personProfiles");
        return { take: async (limit: number) => { scanLimit = limit; return records; } };
      },
    };
    const handler = (publicGraph as unknown as { _handler: (ctx: { db: typeof db }) => Promise<PublicGraphRow[]> })._handler;
    const rows = await handler({ db });
    expect(scanLimit).toBe(5_000);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.relations[0]).toMatchObject({ id: "relation-one", sourceIds: ["source-one"] });
    expect(rows[0]?.timeline?.[0]).toMatchObject({ id: "event-one", sourceIds: ["source-two"] });
    expect(rows[0]?.appearances?.[0]).toMatchObject({ id: "appearance-one", sourceIds: ["source-three"] });
    expect(JSON.stringify(packet)).toBe(originalPacket);
    const graph = await corpusGraph(rows);
    expect(graph.edges.map(edge => edge.recordId)).toEqual(["relation-one", "event-one", "appearance-one"]);
  });
});
