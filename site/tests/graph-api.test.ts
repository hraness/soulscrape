import { graphProjection } from "../convex/_profiles";
import { afterEach, describe, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";

import { GET } from "../app/api/v1/graph.json/route";
import { publicGraph } from "../convex/people";
import { corpusDigest, corpusGraph, type PublicGraphRow } from "../lib/corpus-graph";
import { convexApi } from "../lib/convex";
import { CORPUS_PAGE_DIGEST_VERSION, PUBLIC_CACHE_CONTROL } from "../lib/public-response";

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

function serve(rows: PublicGraphRow[], nextCursor: string | null = null, isDone = true) {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  return spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue({ rows, nextCursor, isDone });
}

describe("graph API projection contract", () => {
  test("a complete first page resolves unchanged targets while emitting changed sources only", async () => {
    const source = row({ relations: [{ target: "alias", targetWikidataId: "Q123", kind: "collaborated" }] });
    const target = row({ handle: "target", wikidataId: "Q123", updatedAtMs: 100, revision: 3 });
    const cleared = row({ handle: "cleared", revision: 2 });
    const rows = [source, target, cleared];
    const query = serve(rows);
    const full = await corpusGraph(rows);
    const response = await GET(new Request("https://soulscrape.com/api/v1/graph.json?since=150"));
    const body = await response.json();
    expect(query).toHaveBeenCalledWith(convexApi.peoplePublicGraphPage, { cursor: null, limit: 10 });
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe(PUBLIC_CACHE_CONTROL);
    expect(body).toMatchObject({
      ok: true,
      version: "soulscrape.api.v1",
      projectionVersion: "soulscrape.graph.v3",
      corpusDigestVersion: CORPUS_PAGE_DIGEST_VERSION,
      corpusDigest: await corpusDigest(rows),
      pagination: { nextCursor: null, isDone: true, snapshot: false },
      meta: { profiles: 2, nodes: 3, edges: 1 },
      sync: {
        mode: "row-delta",
        sinceMs: 150,
        replacement: "outbound-sets-for-changed-sources",
        resolutionScope: "complete-corpus",
        scope: "paged-live-corpus",
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

  test("full and empty delta responses share a digest of this page before filtering", async () => {
    serve([row()], "continue-after-first-page", false);
    const full = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json"))).json();
    const delta = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json?since=999"))).json();
    expect(full.sync).toMatchObject({ mode: "full", sinceMs: null, complete: false, resolutionScope: "unresolved-page" });
    expect(full.changedSources).toHaveLength(1);
    expect(delta.sync.mode).toBe("row-delta");
    expect(delta.changedSources).toEqual([]);
    expect(delta.nodes).toEqual([]);
    expect(delta.edges).toEqual([]);
    expect(delta.corpusDigest).toBe(full.corpusDigest);
    expect(delta.pagination).toEqual({ nextCursor: "continue-after-first-page", isDone: false, snapshot: false });
  });

  test("complete-corpus resolution changes require full reconciliation even without a changed source", async () => {
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

  test("a partial first page never treats a page-local QID binding as globally unique", async () => {
    const source = row({ relations: [{ id: "relation-one", target: "alias", targetWikidataId: "Q123", kind: "collaborated" }] });
    const target = row({ handle: "target", wikidataId: "Q123" });
    const duplicateOnAnotherPage = row({ handle: "other-target", wikidataId: "Q123" });
    serve([source, target], "next-page", false);
    const first = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json"))).json();
    expect(first.sync.resolutionScope).toBe("unresolved-page");
    expect(first.edges[0]).toMatchObject({ to: "qid:ben/Q123", resolution: "external" });
    const full = await corpusGraph([source, target, duplicateOnAnotherPage]);
    expect(first.edges[0]).toEqual(full.edges[0]);

    serve([duplicateOnAnotherPage]);
    const second = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json?cursor=next-page"))).json();
    expect(second.sync.resolutionScope).toBe("unresolved-page");
    expect(second.pagination).toEqual({ nextCursor: null, isDone: true, snapshot: false });
    expect(second.edges).toEqual([]);
  });

  test("a final continuation page still keeps locally unique QID and slug targets unresolved", async () => {
    const source = row({ relations: [
      { id: "relation-qid", target: "alias", targetWikidataId: "Q123", kind: "collaborated" },
      { id: "relation-slug", target: "target", kind: "interviewed" },
    ] });
    const target = row({ handle: "target", wikidataId: "Q123" });
    const query = serve([source, target]);
    const response = await GET(new Request("https://soulscrape.com/api/v1/graph.json?cursor=opaque-last-page"));
    const body = await response.json();
    expect(query).toHaveBeenCalledWith(convexApi.peoplePublicGraphPage, { cursor: "opaque-last-page", limit: 10 });
    expect(body.sync.resolutionScope).toBe("unresolved-page");
    expect(body.edges.map((edge: { to: string; resolution: string }) => [edge.to, edge.resolution])).toEqual([
      ["qid:ben/Q123", "external"], ["slug:ben/target", "external"],
    ]);
  });

  test("empty intermediate pages preserve the continuation token", async () => {
    serve([], "continue-empty-page", false);
    const body = await (await GET(new Request("https://soulscrape.com/api/v1/graph.json?cursor=previous-page"))).json();
    expect(body.pagination).toEqual({ nextCursor: "continue-empty-page", isDone: false, snapshot: false });
    expect(body.changedSources).toEqual([]);
    expect(body.nodes).toEqual([]);
    expect(body.edges).toEqual([]);
    expect(body.sync.resolutionScope).toBe("unresolved-page");
  });

  test("forwards a smaller page limit for response-budget recovery", async () => {
    const query = serve([row()], "another-page", false);
    const response = await GET(new Request("https://soulscrape.com/api/v1/graph.json?cursor=retry-page&limit=1"));
    expect(response.status).toBe(200);
    expect(query).toHaveBeenCalledWith(convexApi.peoplePublicGraphPage, { cursor: "retry-page", limit: 1 });
    expect((await response.json()).pagination).toEqual({ nextCursor: "another-page", isDone: false, snapshot: false });
  });

  test("rejects invalid timestamps and cursor shapes before querying the provider", async () => {
    const query = serve([]);
    for (const value of ["", " ", "-1", "nope", "Infinity", "1.5", "1e3", "9007199254740992", "0".repeat(17)]) {
      const response = await GET(new Request(`https://soulscrape.com/api/v1/graph.json?since=${encodeURIComponent(value)}`));
      expect(response.status).toBe(400);
      expect(await response.json()).toMatchObject({ ok: false, error: { code: "BAD_SINCE" } });
    }
    for (const value of ["", " ", "a\nb", "a\u0000b", "x".repeat(2049)]) {
      const response = await GET(new Request(`https://soulscrape.com/api/v1/graph.json?cursor=${encodeURIComponent(value)}`));
      expect(response.status).toBe(400);
      expect(await response.json()).toMatchObject({ ok: false, error: { code: "BAD_CURSOR", retryable: false } });
    }
    for (const value of ["", "0", "-1", "1.5", "1e2", "01", "26", "1000"]) {
      const response = await GET(new Request(`https://soulscrape.com/api/v1/graph.json?limit=${encodeURIComponent(value)}`));
      expect(response.status).toBe(400);
      expect(await response.json()).toMatchObject({ ok: false, error: { code: "BAD_LIMIT", retryable: false } });
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
    const projected = records.map(record => ({ isPublic: !("withdrawnAtMs" in record), projection: graphProjection({ ...record, accountId: "account" }) }));
    let scanLimit: number | undefined;
    const db = {
      query: (table: string) => {
        expect(table).not.toBe("personProfiles");
        return {
          withIndex: () => ({
            first: async () => ({ ready: true, activated: true }),
            paginate: async (options: { numItems: number; maximumBytesRead: number }) => {
              expect(table).toBe("personProfileGraph");
              expect(options.maximumBytesRead).toBe(8 * 1024 * 1024);
              scanLimit = options.numItems;
              return { page: projected.filter(record => record.isPublic), isDone: true, continueCursor: "" };
            },
          }),
        };
      },
    };
    const handler = (publicGraph as unknown as { _handler: (ctx: { db: typeof db }) => Promise<PublicGraphRow[]> })._handler;
    const rows = await handler({ db });
    expect(scanLimit).toBe(100);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.relations[0]).toMatchObject({ id: "relation-one", sourceIds: ["source-one"] });
    expect(rows[0]?.timeline?.[0]).toMatchObject({ id: "event-one", sourceIds: ["source-two"] });
    expect(rows[0]?.appearances?.[0]).toMatchObject({ id: "appearance-one", sourceIds: ["source-three"] });
    expect(JSON.stringify(packet)).toBe(originalPacket);
    const graph = await corpusGraph(rows);
    expect(graph.edges.map(edge => edge.recordId)).toEqual(["relation-one", "event-one", "appearance-one"]);
  });
});
