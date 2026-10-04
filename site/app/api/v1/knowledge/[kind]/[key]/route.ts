import { apiError, apiUnavailable } from "../../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../../lib/convex";
import { knowledgePageMarkdown, knowledgePath, parseKnowledgePage, parseKnowledgeRoute } from "../../../../../../lib/knowledge-page";
import { KNOWLEDGE_INDEX_VERSION } from "../../../../../../lib/knowledge-index";
import { pageInputFailure, pageOptions, publicJsonResponse, publicReadFailure, publicResponse } from "../../../../../../lib/public-response";
import { parseUsernameSegment } from "../../../../../../lib/routes";
import { siteUrl } from "../../../../../../lib/site";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ kind: string; key: string }> },
): Promise<Response> {
  const { kind: rawKind, key: rawKey } = await params;
  const route = parseKnowledgeRoute(rawKind, rawKey);
  if (route === null) return apiError({ code: "NOT_FOUND", message: "no such public reference", retryable: false }, 404);
  const search = new URL(request.url).searchParams;
  const format = search.get("format");
  if (format !== null && format !== "markdown") {
    return apiError({ code: "BAD_FORMAT", message: "format must be markdown when supplied", retryable: false }, 400);
  }
  const rawPublisher = search.get("publisher");
  const publisher = rawPublisher === null ? undefined : parseUsernameSegment(rawPublisher);
  if (publisher === null) return apiError({ code: "BAD_PUBLISHER", message: "publisher must be a valid username", retryable: false }, 400);
  let options: { cursor: string | null; limit: number };
  try { options = pageOptions(request, 4, 4); }
  catch (error) { return pageInputFailure(error); }
  const client = convexClient();
  if (client === null) return apiUnavailable();
  let raw: unknown;
  try { raw = await client.query(convexApi.knowledgeLookup, { key: route.key, ...options, ...(publisher === undefined ? {} : { publisher }) }); }
  catch (error) { return publicReadFailure(error); }
  const page = parseKnowledgePage(raw, route.key);
  if (page === null) return publicReadFailure(null);
  if (format === "markdown") {
    const body = knowledgePageMarkdown(page, route.kind, route.key, publisher);
    const response = await publicResponse(request, body, "text/markdown; charset=utf-8");
    response.headers.set("link", `<${siteUrl(knowledgePath(route.kind, route.key))}>; rel="canonical"`);
    return response;
  }
  return publicJsonResponse(request, {
    ok: true,
    version: "soulscrape.api.v1",
    projectionVersion: KNOWLEDGE_INDEX_VERSION,
    resource: { ...route, ...(publisher === undefined ? {} : { publisher }),
      ...(route.kind === "sources" ? { sectionSourcesReady: page.sectionSourcesReady === true } : {}) },
    ...(page.reviewed === undefined ? {} : { reviewed: page.reviewed }),
    pagination: { nextCursor: page.nextCursor, isDone: page.isDone, snapshot: false },
    records: page.rows,
  });
}
