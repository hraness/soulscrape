import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

import {
  DEVICE_CODE_TTL_MS,
  deviceCodeDigest,
  deviceSecretDigest,
  deviceTicketPayload,
  isDeviceCode,
  isDeviceSecret,
  publishTokenDigest,
} from "../lib/device-shared";

import { hmacSha256Base64Url, randomToken } from "./_lib";

const MAX_PENDING_CODES = 1_000;

/** Register a pending pairing code. Idempotent on `secretDigest`. */
export const start = mutation({
  args: {
    codeDigest: v.string(),
    secretDigest: v.string(),
    deviceName: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.deviceName.length === 0 || args.deviceName.length > 80) {
      throw new Error("deviceName must be 1-80 characters");
    }
    const existing = await ctx.db
      .query("deviceCodes")
      .withIndex("by_secretDigest", q => q.eq("secretDigest", args.secretDigest))
      .collect();
    if (existing.length > 0) return { ok: true as const };
    const pending = await ctx.db
      .query("deviceCodes")
      .filter(q => q.eq(q.field("status"), "pending"))
      .take(MAX_PENDING_CODES);
    if (pending.length >= MAX_PENDING_CODES) throw new Error("too many pending device codes");
    const now = Date.now();
    await ctx.db.insert("deviceCodes", {
      codeDigest: args.codeDigest,
      secretDigest: args.secretDigest,
      deviceName: args.deviceName.slice(0, 80),
      status: "pending",
      expiresAtMs: now + DEVICE_CODE_TTL_MS,
      createdAtMs: now,
    });
    return { ok: true as const };
  },
});

/**
 * Bind a pending code to a Suite account. The `ticket` is a short-lived HMAC
 * minted by the site after it verifies the sign-in session — this mutation is
 * otherwise unauthenticated and must not trust caller-supplied identity.
 */
export const authorize = mutation({
  args: { code: v.string(), ticket: v.string() },
  handler: async (ctx, args) => {
    if (!isDeviceCode(args.code)) throw new Error("invalid device code");
    const secret = process.env.SOULSCRAPE_SITE_TICKET_SECRET;
    if (typeof secret !== "string" || secret.length < 32) {
      throw new Error("device authorization is not configured");
    }
    const parts = args.ticket.split(".");
    if (parts.length !== 5) throw new Error("malformed ticket");
    const [code, accountId, username, expiryText, mac] = parts as [
      string, string, string, string, string,
    ];
    const expiresAtMs = Number(expiryText);
    if (code !== args.code || !Number.isSafeInteger(expiresAtMs) || expiresAtMs < Date.now()) {
      throw new Error("ticket does not match or is expired");
    }
    const expected = await hmacSha256Base64Url(
      secret,
      deviceTicketPayload(code, accountId, username, expiresAtMs),
    );
    if (expected !== mac) throw new Error("ticket signature invalid");
    const rows = await ctx.db
      .query("deviceCodes")
      .withIndex("by_codeDigest", q => q.eq("codeDigest", deviceCodeDigest(code)))
      .collect();
    const row = rows.find(candidate => candidate.status === "pending");
    if (row === undefined || row.expiresAtMs < Date.now()) {
      throw new Error("device code not found or expired");
    }
    await ctx.db.patch(row._id, { status: "authorized", accountId, username });
    return { ok: true as const, username };
  },
});

/** CLI polling: returns a publish token once the browser authorizes the code. */
export const poll = mutation({
  args: { secret: v.string() },
  handler: async (ctx, args) => {
    if (!isDeviceSecret(args.secret)) throw new Error("invalid device secret");
    const rows = await ctx.db
      .query("deviceCodes")
      .withIndex("by_secretDigest", q => q.eq("secretDigest", deviceSecretDigest(args.secret)))
      .collect();
    const row = rows[0];
    if (row === undefined) throw new Error("unknown device secret");
    const now = Date.now();
    if (row.expiresAtMs < now && row.status === "pending") {
      await ctx.db.patch(row._id, { status: "expired" });
      return { status: "expired" as const };
    }
    if (row.status === "pending") return { status: "pending" as const };
    if (row.status === "expired") return { status: "expired" as const };
    if (row.status === "consumed") {
      // A retried poll after consumption cannot recover the token; the CLI
      // must restart the flow. Never re-issue from a consumed row.
      throw new Error("device code already consumed");
    }
    const token = randomToken("spt");
    await ctx.db.insert("publishCredentials", {
      tokenDigest: publishTokenDigest(token),
      accountId: row.accountId!,
      username: row.username!,
      deviceName: row.deviceName,
      createdAtMs: now,
    });
    await ctx.db.patch(row._id, { status: "consumed" });
    return { status: "authorized" as const, token, username: row.username! };
  },
});
