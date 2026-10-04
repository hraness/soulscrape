import { parseSoulscrapeProfileUrl } from "../../../../../../skills/soulscrape/scripts/people-ontology";
import { isPersonIndexCalendarDay } from "../../../../../../skills/soulscrape/scripts/person-index";
import { apiError, apiUnavailable } from "../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../lib/convex";
import { pageInputFailure, pageOptions, publicJsonResponse, publicReadFailure } from "../../../../../lib/public-response";
import { parseUsernameSegment } from "../../../../../lib/routes";

export const dynamic = "force-dynamic";

function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readCandidates(value: unknown) {
  if (!object(value) || Object.keys(value).sort().join(",") !== "isDone,nextCursor,rows,snapshot"
    || value.snapshot !== false || typeof value.isDone !== "boolean"
    || !Array.isArray(value.rows) || value.rows.length > 20
    || (value.isDone ? value.nextCursor !== null
      : typeof value.nextCursor !== "string" || value.nextCursor.length < 1 || value.nextCursor.length > 2048
        || /[\u0000-\u0020\u007f]/u.test(value.nextCursor))) return null;
  const rows = [];
  for (const item of value.rows) {
    if (!object(item) || Object.keys(item).sort().join(",") !== "displayName,handle,match,profileUrl,subjectKind,username"
      || typeof item.profileUrl !== "string") return null;
    const locator = parseSoulscrapeProfileUrl(item.profileUrl);
    if (locator === null || item.username !== locator.username || item.handle !== locator.handle
      || typeof item.displayName !== "string" || item.displayName.length < 1 || item.displayName.length > 200
      || (item.subjectKind !== "person" && item.subjectKind !== "organization" && item.subjectKind !== "product")
      || item.match !== "label-suggestion") return null;
    rows.push({ username: locator.username, handle: locator.handle, profileUrl: locator.profileUrl,
      displayName: item.displayName, subjectKind: item.subjectKind, match: item.match });
  }
  return { rows, nextCursor: value.nextCursor as string | null, isDone: value.isDone, snapshot: false };
}

export async function GET(request: Request): Promise<Response> {
  const search = new URL(request.url).searchParams;
  const allowed = new Set(["q", "cursor", "limit", "kind", "publisher", "source", "asOf"]);
  if ([...search.keys()].some(key => !allowed.has(key) || search.getAll(key).length > 1)) {
    return apiError({ code: "BAD_REQUEST", message: "unknown or repeated search parameter", retryable: false }, 400);
  }
  const phrase = search.get("q");
  if (phrase === null || phrase.length < 2 || phrase.length > 80 || phrase.trim() !== phrase) {
    return apiError({ code: "BAD_QUERY", message: "q must be 2 to 80 characters", retryable: false }, 400);
  }
  const rawKind = search.get("kind");
  if (rawKind !== null && rawKind !== "person" && rawKind !== "organization" && rawKind !== "product") {
    return apiError({ code: "BAD_KIND", message: "kind must be person, organization or product", retryable: false }, 400);
  }
  const rawPublisher = search.get("publisher");
  const publisher = rawPublisher === null ? undefined : parseUsernameSegment(rawPublisher);
  if (publisher === null) return apiError({ code: "BAD_PUBLISHER", message: "publisher must be a valid username", retryable: false }, 400);
  const rawSource = search.get("source"), rawAsOf = search.get("asOf");
  if ((rawSource !== null && !/^source-[a-f0-9]{20}$/u.test(rawSource))
    || (rawAsOf !== null && !isPersonIndexCalendarDay(rawAsOf)))
    return apiError({ code: "BAD_REQUEST", message: "invalid source or research date", retryable: false }, 400);
  const sourceId = rawSource ?? undefined, asOf = rawAsOf ?? undefined;
  let options: { cursor: string | null; limit: number };
  try { options = pageOptions(request, 20, 20); }
  catch (error) { return pageInputFailure(error); }
  const client = convexClient();
  if (client === null) return apiUnavailable();
  let raw: unknown;
  try { raw = await client.query(convexApi.knowledgeSearch, { phrase, ...options,
    ...(rawKind === null ? {} : { kind: rawKind }), ...(publisher === undefined ? {} : { publisher }),
    ...(sourceId === undefined ? {} : { sourceId }), ...(asOf === undefined ? {} : { asOf }) }); }
  catch (error) { return publicReadFailure(error); }
  const page = readCandidates(raw);
  if (page === null || page.rows.length > options.limit
    || page.rows.some(row => (publisher !== undefined && row.username !== publisher)
      || (rawKind !== null && row.subjectKind !== rawKind))) return publicReadFailure(null);
  return publicJsonResponse(request, { ok: true, version: "soulscrape.api.v1",
    query: { phrase, ...(rawKind === null ? {} : { kind: rawKind }), ...(publisher === undefined ? {} : { publisher }),
      ...(sourceId === undefined ? {} : { sourceId }), ...(asOf === undefined ? {} : { asOf }) },
    pagination: { nextCursor: page.nextCursor, isDone: page.isDone, snapshot: false }, results: page.rows });
}
