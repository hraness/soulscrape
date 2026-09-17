import { apiError, apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusDigest, corpusGraph, PublicGraphRow, sinceFilter } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/graph.json` — the public relation graph: one node per live
 * profile (`username/handle`) plus external stub nodes for unindexed targets
 * (`qid:Q…` when the edge carries a Wikidata binding, `slug:…` otherwise).
 * Edges resolve to a profile node only under same-publisher resolution —
 * slug equality or a shared subject Wikidata id — and carry their source ids
 * so provenance survives the projection. `origin` distinguishes authored
 * relation claims from derived timeline edges. `?since=<ms>` returns the
 * delta: only changed profiles' nodes and outbound edges.
 */
export async function GET(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const rows = (await convex.query(convexApi.peoplePublicGraph, {})) as PublicGraphRow[];
  let filtered: PublicGraphRow[];
  try {
    filtered = sinceFilter(rows, new URL(request.url).searchParams.get("since"));
  } catch {
    return apiError(
      { code: "BAD_SINCE", message: "since must be a non-negative millisecond timestamp.", retryable: false },
      400,
    );
  }
  const { nodes, edges } = await corpusGraph(filtered);
  return Response.json(
    {
      ok: true,
      version: "soulscrape.api.v1",
      asOfMs: Date.now(),
      corpusDigest: await corpusDigest(rows),
      meta: { profiles: filtered.length, nodes: nodes.length, edges: edges.length },
      nodes,
      edges,
    },
    { headers: { "cache-control": "no-store" } },
  );
}
