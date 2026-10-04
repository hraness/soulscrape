import { ConvexError } from "convex/values";
import { parseDossierSection } from "../../../../../../../../skills/soulscrape/scripts/dossier-section";
import { isPersonHandle } from "../../../../../../../../skills/soulscrape/scripts/person-index";
import { apiError, apiOk, apiUnavailable, bearerToken, isRecord, readJsonBody } from "../../../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../../../lib/convex";
import { dossierSectionMarkdown, parsePublicSection } from "../../../../../../../lib/dossier-page";
import { publicJsonResponse, publicReadFailure, publicResponse } from "../../../../../../../lib/public-response";
import { parseUsernameSegment } from "../../../../../../../lib/routes";
import { siteUrl } from "../../../../../../../lib/site";

export const dynamic = "force-dynamic";
type Params = { username: string; handle: string; sectionId: string };
function valid({ username, handle, sectionId }: Params) {
  return parseUsernameSegment(username) === username && isPersonHandle(handle)
    && /^[a-z][a-z0-9-]{1,79}$/u.test(sectionId);
}
function path({ username, handle, sectionId }: Params) {
  return `/${username}/${handle}/sections/${sectionId}`;
}

export async function GET(request: Request, { params }: { params: Promise<Params> }): Promise<Response> {
  const route = await params;
  if (!valid(route)) return apiError({ code: "NOT_FOUND", message: "no such public section", retryable: false }, 404);
  const search = new URL(request.url).searchParams;
  if ([...search.keys()].some(key => key !== "format" || search.getAll(key).length !== 1)
    || (search.has("format") && search.get("format") !== "markdown"))
    return apiError({ code: "BAD_FORMAT", message: "format must be markdown when supplied", retryable: false }, 400);
  const client = convexClient();
  if (client === null) return apiUnavailable();
  let raw: unknown;
  try { raw = await client.query(convexApi.dossierSectionGet, route); }
  catch (error) { return publicReadFailure(error); }
  if (raw === null) return apiError({ code: "NOT_FOUND", message: "no such public section", retryable: false }, 404);
  const result = parsePublicSection(raw, route.username, route.handle, route.sectionId);
  if (result === null) return publicReadFailure(null);
  if (search.get("format") === "markdown") {
    const response = await publicResponse(request, dossierSectionMarkdown(result), "text/markdown; charset=utf-8");
    response.headers.set("link", `<${siteUrl(path(route))}>; rel="canonical"`);
    return response;
  }
  return publicJsonResponse(request, { ok: true, version: "soulscrape.api.v1", ...result });
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }): Promise<Response> {
  const route = await params;
  if (!valid(route)) return apiError({ code: "BAD_REQUEST", message: "invalid section path", retryable: false }, 400);
  const token = bearerToken(request);
  if (token === null) return apiError({ code: "UNAUTHORIZED", message: "a bearer token is required", retryable: false }, 401);
  const body = await readJsonBody(request);
  let section;
  try { section = parseDossierSection(body); }
  catch { return apiError({ code: "PACKET_INVALID", message: "section failed validation", retryable: false }, 400); }
  if (section.profileUrl !== siteUrl(`/${route.username}/${route.handle}`) || section.id !== route.sectionId)
    return apiError({ code: "BAD_REQUEST", message: "section path does not match its profile and id", retryable: false }, 400);
  const client = convexClient();
  if (client === null) return apiUnavailable();
  try {
    const result = await client.mutation(convexApi.dossierSectionPublish, { token, section });
    return apiOk({ ...(result as Record<string, unknown>), url: siteUrl(path(route)) });
  } catch (error) {
    const code = error instanceof ConvexError && isRecord(error.data) ? error.data.code : null;
    if (code === "UNAUTHORIZED") return apiError({ code, message: "invalid or revoked token", retryable: false }, 401);
    if (code === "PACKET_INVALID" || code === "BAD_REQUEST")
      return apiError({ code, message: "section does not match a live owned profile", retryable: false }, 400);
    if (code === "LIMIT_EXCEEDED") return apiError({ code, message: "section storage limit reached", retryable: false }, 409);
    if (code === "PROJECTIONS_NOT_READY") return publicReadFailure(error);
    if (code === "RATE_LIMITED") return apiError({ code, message: "publishing rate limit reached", retryable: true }, 429);
    return apiError({ code: "INTERNAL_ERROR", message: "check the public section before retrying", retryable: false }, 500);
  }
}
