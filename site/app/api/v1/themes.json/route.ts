import { pageInputFailure, pageOptions, publicJsonResponse, publicReadFailure } from "../../../../lib/public-response";
import { apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusThemes, PublicGraphRow } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/themes.json` — every theme across the live corpus
 * (kind/title/status plus its subject), the essence facet for agents
 * answering "who believes what" without fetching sixty packets.
 */
export async function GET(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  let options: { cursor: string | null; limit: number };
  try { options = pageOptions(request); }
  catch (error) { return pageInputFailure(error); }
  let page: { rows: PublicGraphRow[]; nextCursor: string | null; isDone: boolean };
  try {
    page = await convex.query(convexApi.peoplePublicGraphPage, options);
  } catch (error) { return publicReadFailure(error); }
  const rows = page.rows;
  return publicJsonResponse(request,
    {
      ok: true,
      version: "soulscrape.api.v1",
      pagination: { nextCursor: page.nextCursor, isDone: page.isDone, snapshot: false },
      asOfMs: Date.now(),
      themes: corpusThemes(rows),
    },
  );
}
