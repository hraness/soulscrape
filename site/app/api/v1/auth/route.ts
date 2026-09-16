import { apiError, apiOk, apiUnavailable, bearerToken } from "../../../../lib/api";
import { convexApi, convexClient } from "../../../../lib/convex";

export const dynamic = "force-dynamic";

/** `GET /api/v1/auth` — resolve the bearer credential to its account. */
export async function GET(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const token = bearerToken(request);
  if (token === null) {
    return apiError({ code: "UNAUTHORIZED", message: "a bearer token is required", retryable: false }, 401);
  }
  const result = await convex.query(convexApi.credentialsWhoami, { token });
  if (result === null) {
    return apiError({ code: "UNAUTHORIZED", message: "invalid or revoked token", retryable: false }, 401);
  }
  return apiOk(result as Record<string, unknown>);
}

/** `DELETE /api/v1/auth` — revoke the presented credential. */
export async function DELETE(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const token = bearerToken(request);
  if (token === null) {
    return apiError({ code: "UNAUTHORIZED", message: "a bearer token is required", retryable: false }, 401);
  }
  await convex.mutation(convexApi.credentialsRevoke, { token });
  return apiOk({ revoked: true });
}
