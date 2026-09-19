import type { MutationCtx, QueryCtx } from "./_generated/server";

import { base64Url, publishTokenDigest } from "../lib/device-shared";

export const MAX_PROFILES_PER_ACCOUNT = 200;

export function randomBytes(count: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(count));
}

export function randomToken(prefix: string): string {
  return `${prefix}_${base64Url(randomBytes(36))}`;
}

export type Credential = {
  _id: unknown;
  accountId: string;
  username: string;
  tokenDigest: string;
  revokedAtMs?: number;
};

/** Resolve a bearer token to its credential, or null. Read-only. */
export async function credentialForToken(
  ctx: QueryCtx | MutationCtx,
  token: string,
): Promise<Credential | null> {
  const digest = publishTokenDigest(token);
  const row = await ctx.db
    .query("publishCredentials")
    .withIndex("by_tokenDigest", q => q.eq("tokenDigest", digest))
    .first() as Credential | null;
  if (row === null || row.revokedAtMs !== undefined) return null;
  return row;
}

export async function hmacSha256Base64Url(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64Url(new Uint8Array(signature));
}
