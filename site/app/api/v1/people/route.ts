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
    const message = error instanceof Error ? error.message : "";
    if (message.includes("UNAUTHORIZED")) {
      return apiError({ code: "UNAUTHORIZED", message: "invalid or revoked token", retryable: false }, 401);
    }
    if (message.includes("LIMIT_EXCEEDED")) {
      return apiError({ code: "LIMIT_EXCEEDED", message: "profile limit reached for this account", retryable: false }, 409);
    }
    return apiError({
      code: "PACKET_INVALID",
      message: message.replace(/^.*?PACKET_INVALID[:,]?\s*/u, "").slice(0, 300) || "packet failed validation",
      retryable: false,
    }, 400);
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
  const result = await convex.query(convexApi.peopleListOwn, { token });
  if (result === null) {
    return apiError({ code: "UNAUTHORIZED", message: "invalid or revoked token", retryable: false }, 401);
  }
  return apiOk({ people: result });
}
