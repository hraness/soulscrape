import type { MutationCtx } from "./_generated/server";

export const DEVICE_START_BURST = 20;
export const DEVICE_START_REFILL_MS = 10_000;

/**
 * One global row bounds expensive device-start scans, including direct Convex
 * calls. The caller must return (not throw) after a capacity rejection so this
 * attempt debit commits with that rejection. Duplicate secrets bypass this.
 */
export async function admitDeviceStart(ctx: MutationCtx, now: number): Promise<
  { allowed: true } | { allowed: false; retryAfterMs: number }
> {
  const row = await ctx.db.query("deviceStartAdmission")
    .withIndex("by_scope", q => q.eq("scope", "global"))
    .first();
  const previousRefill = row?.refilledAtMs ?? now;
  const refill = Math.floor(Math.max(0, now - previousRefill) / DEVICE_START_REFILL_MS);
  const tokens = Math.min(DEVICE_START_BURST, (row?.tokens ?? DEVICE_START_BURST) + refill);
  // Once full, discard accumulated/fractional credit instead of banking it.
  const refilledAtMs = tokens === DEVICE_START_BURST ? now : previousRefill + refill * DEVICE_START_REFILL_MS;
  if (tokens < 1) {
    return { allowed: false, retryAfterMs: Math.max(1, refilledAtMs + DEVICE_START_REFILL_MS - now) };
  }
  const next = { scope: "global" as const, tokens: tokens - 1, refilledAtMs };
  if (row === null) await ctx.db.insert("deviceStartAdmission", next);
  else await ctx.db.patch(row._id, next);
  return { allowed: true };
}
