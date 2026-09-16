import { apiError, apiOk, apiUnavailable, isRecord, readJsonBody } from "../../../../../lib/api";
import { convexApi, convexClient } from "../../../../../lib/convex";
import {
  DEVICE_CODE_TTL_MS,
  deviceCodeDigest,
  deviceSecretDigest,
  newDeviceCode,
  newDeviceSecret,
} from "../../../../../lib/device-shared";
import { siteUrl } from "../../../../../lib/site";

export const dynamic = "force-dynamic";

const POLL_AFTER_MS = 2_000;

export async function POST(request: Request): Promise<Response> {
  const convex = convexClient();
  if (convex === null) return apiUnavailable();
  const body = await readJsonBody(request);
  const deviceName =
    isRecord(body) && typeof body.deviceName === "string" && body.deviceName.length <= 80
      ? body.deviceName
      : "soulscrape cli";
  const code = newDeviceCode(count => crypto.getRandomValues(new Uint8Array(count)));
  const secret = newDeviceSecret(count => crypto.getRandomValues(new Uint8Array(count)));
  try {
    await convex.mutation(convexApi.devicesStart, {
      codeDigest: deviceCodeDigest(code),
      secretDigest: deviceSecretDigest(secret),
      deviceName,
    });
  } catch {
    return apiError({
      code: "DEVICE_START_FAILED",
      message: "could not register the device code; try again",
      retryable: true,
    }, 502);
  }
  return apiOk({
    code,
    secret,
    verificationUrl: siteUrl(`/connect?code=${code}`),
    expiresInSec: Math.floor(DEVICE_CODE_TTL_MS / 1_000),
    pollAfterMs: POLL_AFTER_MS,
  });
}
