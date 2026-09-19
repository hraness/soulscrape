import { apiError, apiOk, apiUnavailable, bearerToken, isRecord } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";
import { isPublishToken } from "../../../../lib/device-shared";

export const dynamic = "force-dynamic";

/** `GET /api/v1/auth` — resolve the bearer credential to its account. */
export async function GET(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const token = bearerToken(request);
  if (!isPublishToken(token)) {
    return apiError({ code: "UNAUTHORIZED", message: "a valid bearer token is required", retryable: false }, 401);
  }
  try {
    const result = await convex.query(convexApi.credentialsWhoami, { token });
    if (result === null) {
      return apiError({ code: "UNAUTHORIZED", message: "invalid or revoked token", retryable: false }, 401);
    }
    if (!isRecord(result) || typeof result.accountId !== "string" || result.accountId.length < 1 ||
        typeof result.username !== "string" || result.username.length < 2 || result.username.length > 64) {
      throw new Error("invalid account lookup response");
    }
    return apiOk({ accountId: result.accountId, username: result.username });
  } catch {
    return apiError({ code: "AUTH_LOOKUP_FAILED", message: "could not verify the publishing credential; try again", retryable: true }, 502);
  }
}

/** `DELETE /api/v1/auth` — revoke the presented credential. */
export async function DELETE(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const token = bearerToken(request);
  if (!isPublishToken(token)) {
    return apiError({ code: "UNAUTHORIZED", message: "a valid bearer token is required", retryable: false }, 401);
  }
  try {
    const result = await convex.mutation(convexApi.credentialsRevoke, { token });
    if (!isRecord(result) || result.ok !== true) throw new Error("invalid revocation response");
    return apiOk({ revoked: true });
  } catch {
    return apiError({
      code: "AUTH_REVOKE_FAILED",
      message: "could not confirm revocation; retain the local credential and retry",
      retryable: true,
    }, 502);
  }
}
