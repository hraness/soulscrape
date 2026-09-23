import type { ReadCtx } from "./_profileStore";
import { MAX_PROFILES_PER_ACCOUNT } from "./_lib";
import { graphProjection } from "./_profiles";

/**
 * Rolling-deployment compatibility only. These retain the pre-migration bounds
 * and semantics until explicit activation. New cursor endpoints never use them.
 * Once activated, all existing aggregate names also use the compact tables.
 */
export async function legacyAccountRows(ctx: ReadCtx, accountId: string) {
  return (await ctx.db.query("personProfiles").withIndex("by_owner_handle", q => q.eq("accountId", accountId))
    .take(MAX_PROFILES_PER_ACCOUNT)).map(row => ({ ...row, isPublic: row.withdrawnAtMs === undefined }));
}
export async function legacyUsernameRows(ctx: ReadCtx, username: string) {
  return (await ctx.db.query("personProfiles").withIndex("by_username", q => q.eq("username", username))
    .take(MAX_PROFILES_PER_ACCOUNT)).map(row => ({ ...row, isPublic: row.withdrawnAtMs === undefined }));
}
export async function legacyGraph(ctx: ReadCtx) {
  return (await ctx.db.query("personProfiles").take(5_000))
    .filter(row => row.withdrawnAtMs === undefined).map(graphProjection);
}
export async function legacyRelations(ctx: ReadCtx, username: string) {
  return (await legacyUsernameRows(ctx, username)).filter(row => row.isPublic).map(graphProjection);
}
export async function legacySitemap(ctx: ReadCtx) {
  return (await ctx.db.query("personProfiles").take(5_000))
    .filter(row => row.withdrawnAtMs === undefined)
    .map(row => ({ username: row.username, handle: row.handle, updatedAtMs: row.updatedAtMs }));
}
