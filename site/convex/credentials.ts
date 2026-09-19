import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

import { isPublishToken, publishTokenDigest } from "../lib/device-shared";

import { credentialForToken } from "./_lib";

const REVOKED_CREDENTIAL_RETENTION_MS = 30 * 24 * 60 * 60 * 1_000;
const MAX_REVOKED_CREDENTIALS_PER_SWEEP = 256;

export const whoami = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!isPublishToken(args.token)) return null;
    const credential = await credentialForToken(ctx, args.token);
    if (credential === null) return null;
    return { accountId: credential.accountId, username: credential.username };
  },
});

/** Revoke the presented credential itself. Idempotent. */
export const revoke = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!isPublishToken(args.token)) throw new Error("invalid token");
    const row = await ctx.db
      .query("publishCredentials")
      .withIndex("by_tokenDigest", q => q.eq("tokenDigest", publishTokenDigest(args.token)))
      .first();
    if (row === null) return { ok: true as const };
    if (row.revokedAtMs === undefined) {
      await ctx.db.patch(row._id, { revokedAtMs: Date.now() });
    }
    return { ok: true as const };
  },
});

/** Remove revoked credential digests after 30 days, without touching active devices. */
export const pruneRevoked = internalMutation({
  args: {},
  handler: async ctx => {
    const cutoff = Date.now() - REVOKED_CREDENTIAL_RETENTION_MS;
    const rows = await ctx.db
      .query("publishCredentials")
      // Unset values sort before numbers in Convex; exclude active credentials
      // before taking the bounded batch so they cannot delay or enter cleanup.
      .withIndex("by_revokedAtMs", q => q.gt("revokedAtMs", undefined).lte("revokedAtMs", cutoff))
      .take(MAX_REVOKED_CREDENTIALS_PER_SWEEP);
    for (const row of rows) await ctx.db.delete(row._id);
    return { deleted: rows.length };
  },
});
