import { publicReadFailure } from "../../../../lib/public-response";
import { ConvexError } from "convex/values";

import { apiError, apiOk, apiUnavailable, bearerToken, isRecord, readJsonBody } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { profileCanonicalUrl } from "../../../../lib/profile-view";

export const dynamic = "force-dynamic";

/** `PUT /api/v1/people` — publish or update a person index packet. */
export async function PUT(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const token = bearerToken(request);
  if (token === null) {
    return apiError({ code: "UNAUTHORIZED", message: "a bearer token is required", retryable: false }, 401);
  }
  const body = await readJsonBody(request);
  const packet = isRecord(body) && isRecord(body.packet) ? body.packet : body;
  if (!isRecord(packet)) {
    return apiError({ code: "BAD_REQUEST", message: "body must be a person-index packet", retryable: false }, 400);
  }
  try {
    const result = await convex.mutation(convexApi.peoplePublish, { token, packet });
    const published = result as { handle: string; username: string; packetDigest: string; revision: number; changed: boolean };
    return apiOk({
      ...published,
      url: profileCanonicalUrl(published.username, published.handle),
    });
  } catch (error) {
    const code = error instanceof ConvexError && isRecord(error.data) ? error.data.code : null;
    if (code === "UNAUTHORIZED") {
      return apiError({ code, message: "invalid or revoked token", retryable: false }, 401);
    }
    if (code === "LIMIT_EXCEEDED") {
      return apiError({ code, message: "free account storage or profile limit reached; reduce a packet or contact support", retryable: false }, 409);
    }
    if (code === "PROJECTIONS_NOT_READY") return publicReadFailure(error);
    if (code === "RATE_LIMITED") {
      const retryAfterMs = error instanceof ConvexError && isRecord(error.data) && typeof error.data.retryAfterMs === "number"
        ? Math.min(3_600_000, Math.max(0, error.data.retryAfterMs)) : 60_000;
      const response = apiError({ code, message: "publishing rate limit reached; wait before making another change", retryable: true, retryAfterMs }, 429);
      response.headers.set("retry-after", String(Math.ceil(retryAfterMs / 1000)));
      return response;
    }
    if (code === "PACKET_INVALID") {
      return apiError({ code, message: "packet failed validation", retryable: false }, 400);
    }
    return apiError({
      code: "INTERNAL_ERROR",
      message: "publishing could not be completed; check the published profile before retrying",
      retryable: false,
    }, 500);
  }
}

/** `GET /api/v1/people` — list the caller's profiles. */
export async function GET(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const token = bearerToken(request);
  if (token === null) {
    return apiError({ code: "UNAUTHORIZED", message: "a bearer token is required", retryable: false }, 401);
  }
  try {
    const result = await convex.query(convexApi.peopleListOwn, { token });
    if (result === null) {
      return apiError({ code: "UNAUTHORIZED", message: "invalid or revoked token", retryable: false }, 401);
    }
    return apiOk({ people: result });
  } catch (error) {
    if (error instanceof ConvexError && isRecord(error.data) && error.data.code === "PROJECTIONS_NOT_READY") return publicReadFailure(error);
    return apiError({ code: "INTERNAL_ERROR", message: "profiles could not be loaded", retryable: true }, 500);
  }
}
