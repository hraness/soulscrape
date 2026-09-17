import { apiError, apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusDigest, corpusIndexEntries, PublicGraphRow, sinceFilter } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/index.json` — public corpus enumeration: every live profile
 * across publishers with its digest and revision, plus a `corpusDigest` that
 * changes whenever the live set does — the machine-readable entry point for
 * agents traversing the index without scraping the sitemap. `?since=<ms>`
 * returns only profiles updated at or after the timestamp; `asOfMs` echoes
 * the server's watermark for the next poll.
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
  return Response.json(
    {
      ok: true,
      version: "soulscrape.api.v1",
      asOfMs: Date.now(),
      // The digest always covers the full live corpus so a delta response is
      // still comparable against the whole-corpus change token.
      corpusDigest: await corpusDigest(rows),
      profiles: corpusIndexEntries(filtered),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
