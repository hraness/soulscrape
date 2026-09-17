import { apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusThemes, PublicGraphRow } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/themes.json` — every theme across the live corpus
 * (kind/title/status plus its subject), the essence facet for agents
 * answering "who believes what" without fetching sixty packets.
 */
export async function GET(): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const rows = (await convex.query(convexApi.peoplePublicGraph, {})) as PublicGraphRow[];
  return Response.json(
    {
      ok: true,
      version: "soulscrape.api.v1",
      asOfMs: Date.now(),
      themes: corpusThemes(rows),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
