import { ConvexError } from "convex/values";

export type PublishErrorCode = "UNAUTHORIZED" | "PACKET_INVALID" | "LIMIT_EXCEEDED" | "BAD_REQUEST" | "NOT_FOUND"
  | "RATE_LIMITED" | "PROJECTIONS_NOT_READY" | "PAGINATION_REQUIRED";

/** Only public machine-readable codes cross the Convex error boundary. */
export class PublishError extends ConvexError<{ readonly code: PublishErrorCode; readonly retryAfterMs?: number }> {
  constructor(code: PublishErrorCode, retryAfterMs?: number) {
    super({ code, ...(retryAfterMs === undefined ? {} : { retryAfterMs }) });
  }
}
