export const API_VERSION = "soulscrape.api.v1";

const MAX_API_BODY_BYTES = 512 * 1024;

type ApiError = Readonly<{
  code: string;
  message: string;
  retryable: boolean;
  retryAfterMs?: number;
}>;

function apiResponse(body: unknown, status: number): Response {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export function apiOk(data: Record<string, unknown>, status = 200): Response {
  return apiResponse({ ok: true, version: API_VERSION, ...data }, status);
}

export function apiError(error: ApiError, status: number): Response {
  return apiResponse({ ok: false, version: API_VERSION, error }, status);
}

export function apiUnavailable(): Response {
  return apiError({
    code: "PUBLISHING_NOT_CONFIGURED",
    message:
      "Publishing is not configured for this deployment; set CONVEX_URL and the Soulscrape API secrets.",
    retryable: true,
  }, 503);
}

/** Read JSON without buffering more than the byte ceiling, including chunked bodies. */
export async function readJsonBody(request: Request): Promise<unknown | null> {
  const declared = request.headers.get("content-length");
  if (declared !== null) {
    const length = Number(declared);
    if (!Number.isSafeInteger(length) || length < 0 || length > MAX_API_BODY_BYTES) {
      try { await request.body?.cancel(); } catch { /* An already consumed body is invalid too. */ }
      return null;
    }
  }
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  try {
    reader = request.body?.getReader();
    if (reader === undefined) return null;
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_API_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text);
  } catch {
    try { await reader?.cancel(); } catch { /* Stream failures remain a controlled invalid body. */ }
    return null;
  } finally {
    reader?.releaseLock();
  }
}

/** Extract a single `Bearer <token>` header value, bounded to 256 chars. */
export function bearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (header === null || header.length > 320) return null;
  const match = /^Bearer ([A-Za-z0-9_=-]{1,256})$/u.exec(header);
  return match === null ? null : match[1]!;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
