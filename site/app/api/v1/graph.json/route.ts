import { apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusDigest, corpusGraph, PublicGraphRow } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/graph.json` — the public relation graph: one node per live
 * profile (`username/handle`) plus external stub nodes for unindexed targets
 * (`qid:Q…` when the edge carries a Wikidata binding, `slug:…` otherwise).
 * Edges resolve to a profile node only under same-publisher resolution —
 * slug equality or a shared subject Wikidata id — and carry their source ids
 * so provenance survives the projection.
 */
export async function GET(): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const rows = (await convex.query(convexApi.peoplePublicGraph, {})) as PublicGraphRow[];
  const { nodes, edges } = corpusGraph(rows);
  return Response.json(
    { ok: true, version: "soulscrape.api.v1", corpusDigest: await corpusDigest(rows), nodes, edges },
    { headers: { "cache-control": "no-store" } },
  );
}
