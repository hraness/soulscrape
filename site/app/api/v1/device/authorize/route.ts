import { apiError, apiOk, apiUnavailable, isRecord, readJsonBody } from "../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../lib/convex";
import { isDeviceCode } from "../../../../../lib/device-shared";
import { mintDeviceAuthorizeTicket } from "../../../../../lib/device-ticket";
import { serverSession } from "../../../../../lib/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const session = await serverSession(request);
  if (session === null) {
    return apiError({
      code: "AUTH_REQUIRED",
      message: "sign in with a Hraness account before authorizing a device",
      retryable: false,
    }, 401);
  }
  const body = await readJsonBody(request);
  const code = isRecord(body) ? body.code : null;
  if (!isDeviceCode(code)) {
    return apiError({ code: "BAD_REQUEST", message: "code must be a pairing code", retryable: false }, 400);
  }
  const secret = process.env.SOULSCRAPE_SITE_TICKET_SECRET;
  if (typeof secret !== "string" || secret.length < 32) return apiUnavailable();
  const ticket = mintDeviceAuthorizeTicket({
    code,
    accountId: session.accountId,
    username: session.username,
    now: Date.now(),
    secret,
  });
  try {
    await convex.mutation(convexApi.devicesAuthorize, { code, ticket });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const expired = message.includes("not found or expired");
    return apiError({
      code: expired ? "DEVICE_CODE_EXPIRED" : "DEVICE_AUTHORIZE_FAILED",
      message: expired
        ? "the pairing code was not found or expired; run login again"
        : "could not authorize the device; try again",
      retryable: !expired,
    }, expired ? 410 : 502);
  }
  return apiOk({ authorized: true, username: session.username });
}
