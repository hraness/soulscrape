import { apiError, apiOk, apiUnavailable, bearerToken } from "../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../lib/convex";

export const dynamic = "force-dynamic";

/** `DELETE /api/v1/people/<handle>` — withdraw a published profile. */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ handle: string }> },
): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const token = bearerToken(request);
  if (token === null) {
    return apiError({ code: "UNAUTHORIZED", message: "a bearer token is required", retryable: false }, 401);
  }
  const { handle } = await params;
  try {
    await convex.mutation(convexApi.peopleWithdraw, { token, handle });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("NOT_FOUND")) {
      return apiError({ code: "NOT_FOUND", message: "no published profile with that handle", retryable: false }, 404);
    }
    return apiError({ code: "UNAUTHORIZED", message: "invalid or revoked token", retryable: false }, 401);
  }
  return apiOk({ withdrawn: true, handle });
}
