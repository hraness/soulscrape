import { apiError, apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { CORPUS_DIGEST_VERSION, corpusDigest, corpusIndexEntries, type PublicGraphRow, sinceFilter } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/index.json` — public corpus enumeration: every live profile
 * across publishers with its digest and revision, plus a `corpusDigest` that
 * changes whenever the live set does — the machine-readable entry point for
 * agents traversing the index without scraping the sitemap. `?since=<ms>`
 * returns only profiles updated at or after the timestamp. `asOfMs` is the
 * response-start time, not a durable cursor; withdrawals require a full read.
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
  return Response.json(
    {
      ok: true,
      version: "soulscrape.api.v1",
      asOfMs,
      corpusDigestVersion: CORPUS_DIGEST_VERSION,
      // The digest always covers the full live corpus so a delta response is
      // still comparable against the whole-corpus change token.
      corpusDigest: await corpusDigest(rows),
      profiles: corpusIndexEntries(filtered),
      sync: {
        mode: since === null ? "full" : "row-delta",
        scope: "bounded-live-corpus",
        complete: false,
        deletionsIncluded: false,
        fullReconciliationRequired: true,
        asOfMsMeaning: "response-start-not-cursor",
      },
    },
    { headers: { "cache-control": "no-store" } },
  );
}
