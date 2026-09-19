import { ConvexError } from "convex/values";

import { apiError, isRecord } from "./api";

export const PUBLIC_CACHE_SECONDS = 30;
export const PUBLIC_CACHE_CONTROL = `public, max-age=0, s-maxage=${PUBLIC_CACHE_SECONDS}, must-revalidate`;
export const MAX_PUBLIC_RESPONSE_BYTES = 3 * 1024 * 1024;
export const PAGED_GRAPH_PROJECTION_VERSION = "soulscrape.graph.v3";
export const CORPUS_PAGE_DIGEST_VERSION = "soulscrape.corpus-page.v1";
export const MAX_CURSOR_LENGTH = 2048;

/** Public responses only. No stale-while-revalidate or stale-if-error window. */
export async function publicResponse(request: Request, body: string, contentType: string, semanticBody = body): Promise<Response> {
  const bytes = new TextEncoder().encode(body);
  if (bytes.byteLength > MAX_PUBLIC_RESPONSE_BYTES) {
    return apiError({ code: "PAGE_TOO_LARGE", message: "page exceeds the response budget; retry with limit=1", retryable: false }, 400);
  }
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(contentType + "\n" + semanticBody));
  const etag = `W/"${Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("")}"`;
  const headers = { "cache-control": PUBLIC_CACHE_CONTROL, etag, "content-type": contentType, vary: "Accept" };
  const matches = request.headers.get("if-none-match")?.split(",").some(value => {
    const tag = value.trim();
    return tag === "*" || tag.replace(/^W\//u, "") === etag.replace(/^W\//u, "");
  }) ?? false;
  return new Response(matches ? null : body, { status: matches ? 304 : 200, headers });
}

export function publicJsonResponse(request: Request, value: unknown): Promise<Response> {
  // Observation time is not a sync cursor. A weak validator tracks semantic
  // content, including all pagination, scope, filter, and version fields.
  const semantic = isRecord(value) ? { ...value, asOfMs: undefined } : value;
  return publicResponse(request, JSON.stringify(value), "application/json; charset=utf-8", JSON.stringify(semantic));
}

class PageInputError extends Error {
  constructor(readonly code: "BAD_CURSOR" | "BAD_LIMIT", message: string) { super(message); }
}

export function pageOptions(request: Request, defaultLimit = 10, maxLimit = 25): { cursor: string | null; limit: number } {
  const value = new URL(request.url).searchParams.get("cursor");
  if (value !== null && (value.length === 0 || value.length > MAX_CURSOR_LENGTH || /[\u0000-\u0020\u007f]/u.test(value))) {
    throw new PageInputError("BAD_CURSOR", "cursor must be a nonempty opaque token of at most 2048 characters");
  }
  const rawLimit = new URL(request.url).searchParams.get("limit");
  if (rawLimit !== null && (!/^[1-9][0-9]{0,2}$/u.test(rawLimit) || Number(rawLimit) > maxLimit)) {
    throw new PageInputError("BAD_LIMIT", `limit must be an integer from 1 to ${maxLimit}`);
  }
  return { cursor: value, limit: rawLimit === null ? defaultLimit : Number(rawLimit) };
}

export function pageInputFailure(error: unknown): Response {
  const code = error instanceof PageInputError ? error.code : "BAD_CURSOR";
  const message = error instanceof PageInputError ? error.message : "invalid pagination input";
  return apiError({ code, message, retryable: false }, 400);
}

export function publicReadFailure(error: unknown): Response {
  if (error instanceof ConvexError && isRecord(error.data) && error.data.code === "PROJECTIONS_NOT_READY") {
    return apiError({ code: "PROJECTIONS_NOT_READY", message: "public indexes are being prepared; try again shortly", retryable: true }, 503);
  }
  return apiError({ code: "UPSTREAM_UNAVAILABLE", message: "public data could not be loaded; retry or restart pagination", retryable: true }, 503);
}
