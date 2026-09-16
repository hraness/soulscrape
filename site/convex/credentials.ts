import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

import { isPublishToken, publishTokenDigest } from "../lib/device-shared";

import { credentialForToken } from "./_lib";

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
    const rows = await ctx.db
      .query("publishCredentials")
      .withIndex("by_tokenDigest", q => q.eq("tokenDigest", publishTokenDigest(args.token)))
      .collect();
    const row = rows[0];
    if (row === undefined) return { ok: true as const };
    if (row.revokedAtMs === undefined) {
      await ctx.db.patch(row._id, { revokedAtMs: Date.now() });
    }
    return { ok: true as const };
  },
});
