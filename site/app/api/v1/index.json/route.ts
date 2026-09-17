import { apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusDigest, corpusIndexEntries, PublicGraphRow } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/index.json` — public corpus enumeration: every live profile
 * across publishers with its digest and revision, plus a `corpusDigest` that
 * changes whenever the live set does — the machine-readable entry point for
 * agents traversing the index without scraping the sitemap.
 */
export async function GET(): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const rows = (await convex.query(convexApi.peoplePublicGraph, {})) as PublicGraphRow[];
  return Response.json(
    {
      ok: true,
      version: "soulscrape.api.v1",
      corpusDigest: await corpusDigest(rows),
      profiles: corpusIndexEntries(rows),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
