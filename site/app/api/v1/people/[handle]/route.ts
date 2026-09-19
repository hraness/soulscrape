import { ConvexError } from "convex/values";

import { apiError, apiOk, apiUnavailable, bearerToken, isRecord } from "../../../../../lib/api";
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
    const code = error instanceof ConvexError && isRecord(error.data) ? error.data.code : null;
    if (code === "UNAUTHORIZED") {
      return apiError({ code, message: "invalid or revoked token", retryable: false }, 401);
    }
    if (code === "BAD_REQUEST") {
      return apiError({ code, message: "invalid person handle", retryable: false }, 400);
    }
    if (code === "NOT_FOUND") {
      return apiError({ code, message: "no published profile with that handle", retryable: false }, 404);
    }
    return apiError({
      code: "INTERNAL_ERROR",
      message: "withdrawal could not be completed; check the profile status before retrying",
      retryable: false,
    }, 500);
  }
  return apiOk({ withdrawn: true, handle });
}
