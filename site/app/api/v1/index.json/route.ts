import { CORPUS_PAGE_DIGEST_VERSION, pageInputFailure, pageOptions, publicJsonResponse, publicReadFailure } from "../../../../lib/public-response";
import { apiError, apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusDigest, corpusIndexEntries, type PublicGraphRow, sinceFilter } from "../../../../lib/corpus-graph";

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
  let options: { cursor: string | null; limit: number };
  try { options = pageOptions(request, 100, 100); }
  catch (error) { return pageInputFailure(error); }
  let page: { rows: PublicGraphRow[]; nextCursor: string | null; isDone: boolean };
  try {
    page = await convex.query(convexApi.peoplePublicIndexPage, options);
  } catch (error) { return publicReadFailure(error); }
  const rows = page.rows;
  const filtered = sinceFilter(rows, since);
  return publicJsonResponse(request,
    {
      ok: true,
      version: "soulscrape.api.v1",
      pagination: { nextCursor: page.nextCursor, isDone: page.isDone, snapshot: false },
      asOfMs,
      corpusDigestVersion: CORPUS_PAGE_DIGEST_VERSION,
      // This digest covers this page before the since filter, not the whole corpus.
      corpusDigest: await corpusDigest(rows),
      profiles: corpusIndexEntries(filtered),
      sync: {
        mode: since === null ? "full" : "row-delta",
        scope: "paged-live-corpus",
        complete: false,
        deletionsIncluded: false,
        fullReconciliationRequired: true,
        asOfMsMeaning: "response-start-not-cursor",
      },
    },
  );
}
