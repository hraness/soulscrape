import { apiError, apiOk, apiUnavailable, isRecord, readJsonBody } from "../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../lib/convex";
import { isDeviceSecret } from "../../../../../lib/device-shared";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const body = await readJsonBody(request);
  const secret = isRecord(body) ? body.secret : null;
  if (!isDeviceSecret(secret)) {
    return apiError({ code: "BAD_REQUEST", message: "secret must be a device secret", retryable: false }, 400);
  }
  try {
    const result = await convex.mutation(convexApi.devicesPoll, { secret });
    const parsed = result as {
      status: "pending" | "expired" | "authorized";
      token?: string;
      username?: string;
    };
    if (parsed.status === "pending") return apiOk({ status: "pending", pollAfterMs: 2_000 });
    if (parsed.status === "expired") {
      return apiError({
        code: "DEVICE_CODE_EXPIRED",
        message: "the pairing code expired; run login again",
        retryable: false,
      }, 410);
    }
    return apiOk({ status: "authorized", token: parsed.token, username: parsed.username });
  } catch {
    return apiError({
      code: "DEVICE_CODE_UNKNOWN",
      message: "the pairing code was not found or is already consumed",
      retryable: false,
    }, 404);
  }
}
