import { apiError, apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import {
  CORPUS_DIGEST_VERSION,
  GRAPH_PROJECTION_VERSION,
  corpusDigest,
  corpusGraph,
  type PublicGraphRow,
  sinceFilter,
} from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/graph.json` — a bounded public graph of profile nodes and
 * publisher-scoped external QID or slug stubs. Conflicting kind/QID bindings
 * and ambiguous QID matches do not resolve by slug. Edges retain source ids
 * and distinguish authored relations from derived timeline/co-presence edges.
 * `?since=<ms>` emits changed profiles' outbound sets and their endpoint
 * nodes, resolved against all returned live rows. Replace changedSources'
 * outbound sets, including empty ones; periodically reconcile full reads for
 * deletions and resolution changes. asOfMs is not a durable sync cursor.
 */
export async function GET(request: Request): Promise<Response> {
  const asOfMs = Date.now();
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const since = new URL(request.url).searchParams.get("since");
  try {
    sinceFilter([], since);
  } catch {
    return apiError(
      { code: "BAD_SINCE", message: "since must be a non-negative millisecond timestamp.", retryable: false },
      400,
    );
  }
  const rows = (await convex.query(convexApi.peoplePublicGraph, {})) as PublicGraphRow[];
  const filtered = sinceFilter(rows, since);
  const { nodes, edges } = await corpusGraph(rows, filtered);
  return Response.json(
    {
      ok: true,
      version: "soulscrape.api.v1",
      projectionVersion: GRAPH_PROJECTION_VERSION,
      asOfMs,
      corpusDigest: await corpusDigest(rows),
      corpusDigestVersion: CORPUS_DIGEST_VERSION,
      meta: { profiles: filtered.length, nodes: nodes.length, edges: edges.length },
      changedSources: filtered.map(row => ({
        id: `${row.username}/${row.handle}`,
        username: row.username,
        handle: row.handle,
        packetDigest: row.packetDigest,
        revision: row.revision,
        updatedAtMs: row.updatedAtMs,
      })),
      sync: {
        mode: since === null ? "full" : "row-delta",
        sinceMs: since === null ? null : Number(since),
        replacement: "outbound-sets-for-changed-sources",
        scope: "bounded-live-corpus",
        complete: false,
        deletionsIncluded: false,
        fullReconciliationRequired: true,
        asOfMsMeaning: "response-start-not-cursor",
      },
      nodes,
      edges,
    },
    { headers: { "cache-control": "no-store" } },
  );
}
