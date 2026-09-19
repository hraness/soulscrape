import { ConvexError } from "convex/values";

import { apiError, apiOk, apiUnavailable, isRecord, readJsonBody } from "../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../lib/convex";
import { MAX_ACTIVE_PUBLISH_CREDENTIALS, isDeviceSecret, isPublishToken } from "../../../../../lib/device-shared";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const body = await readJsonBody(request);
  const secret = isRecord(body) ? body.secret : null;
  if (!isRecord(body) || Object.keys(body).some(key => key !== "secret") || !isDeviceSecret(secret)) {
    return apiError({ code: "BAD_REQUEST", message: "secret must be a device secret", retryable: false }, 400);
  }
  try {
    const result = await convex.mutation(convexApi.devicesPoll, { secret });
    if (!isRecord(result)) throw new Error("invalid device-poll response");
    if (result.status === "pending") return apiOk({ status: "pending", pollAfterMs: 2_000 });
    if (result.status === "expired") {
      return apiError({
        code: "DEVICE_CODE_EXPIRED",
        message: "the pairing code expired; run login again",
        retryable: false,
      }, 410);
    }
    if (result.status !== "authorized" || !isPublishToken(result.token) ||
        typeof result.username !== "string" || result.username.length < 2 || result.username.length > 64) {
      throw new Error("invalid authorized-device response");
    }
    return apiOk({ status: "authorized", token: result.token, username: result.username });
  } catch (error) {
    const code = error instanceof ConvexError && isRecord(error.data) ? error.data.code : null;
    if (code === "BAD_REQUEST") {
      return apiError({ code, message: "secret must be a device secret", retryable: false }, 400);
    }
    if (code === "DEVICE_LIMIT") {
      return apiError({
        code,
        message: `this account has reached the limit of ${MAX_ACTIVE_PUBLISH_CREDENTIALS} active publishing devices; run publish-person.ts logout on a device you control, then retry pairing. If all device credentials are lost, contact hraness@pm.me`,
        retryable: false,
      }, 429);
    }
    if (code === "DEVICE_CODE_UNKNOWN") {
      return apiError({
        code,
        message: "the pairing code was not found or is already consumed",
        retryable: false,
      }, 404);
    }
    return apiError({
      code: "DEVICE_POLL_FAILED",
      message: "could not check device authorization; retry after the polling interval",
      retryable: true,
      retryAfterMs: 2_000,
    }, 502);
  }
}
