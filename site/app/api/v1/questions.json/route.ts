import { apiUnavailable } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { corpusQuestions, PublicGraphRow } from "../../../../lib/corpus-graph";

export const dynamic = "force-dynamic";

/**
 * `GET /api/v1/questions.json` — every open question across the live
 * corpus: the admitted gaps, contradictions, and coverage seams each
 * index declares, addressable by subject.
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
      questions: corpusQuestions(rows),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
