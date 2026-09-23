import { CORPUS_PAGE_DIGEST_VERSION, PAGED_GRAPH_PROJECTION_VERSION, pageInputFailure, pageOptions, publicJsonResponse, publicReadFailure } from "../../../../lib/public-response";
import { apiError, apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import {
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
  let options: { cursor: string | null; limit: number };
  try { options = pageOptions(request); }
  catch (error) { return pageInputFailure(error); }
  let page: { rows: PublicGraphRow[]; nextCursor: string | null; isDone: boolean };
  try {
    page = await convex.query(convexApi.peoplePublicGraphPage, options);
  } catch (error) { return publicReadFailure(error); }
  const rows = page.rows;
  const filtered = sinceFilter(rows, since);
  const completeContext = options.cursor === null && page.isDone;
  // A partial page cannot prove QID uniqueness. Preserve targets as stubs.
  const { nodes, edges } = await corpusGraph(completeContext ? rows : [], filtered);
  return publicJsonResponse(request,
    {
      ok: true,
      version: "soulscrape.api.v1",
      pagination: { nextCursor: page.nextCursor, isDone: page.isDone, snapshot: false },
      projectionVersion: PAGED_GRAPH_PROJECTION_VERSION,
      asOfMs,
      corpusDigest: await corpusDigest(rows),
      corpusDigestVersion: CORPUS_PAGE_DIGEST_VERSION,
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
        resolutionScope: completeContext ? "complete-corpus" : "unresolved-page",
        scope: "paged-live-corpus",
        complete: false,
        deletionsIncluded: false,
        fullReconciliationRequired: true,
        asOfMsMeaning: "response-start-not-cursor",
      },
      nodes,
      edges,
    },
  );
}
