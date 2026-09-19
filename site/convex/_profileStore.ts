import type { MutationCtx, QueryCtx } from "./_generated/server";
import type { GenericId } from "convex/values";
import { PERSON_INDEX_MAX_BODY_BYTES } from "../../skills/soulscrape/scripts/person-index";
import { MAX_PROFILES_PER_ACCOUNT } from "./_lib";
import { PublishError } from "./_profileErrors";
import {
  FEED_READ_BYTES, graphProjection, MAX_ACCOUNT_PACKET_BYTES,
  MAX_GRAPH_PROJECTION_BYTES, packetBytes, PROJECTION_VERSION, PUBLISH_BURST, publishBucket,
  type ProfileSource,
} from "./_profiles";

export type ReadCtx = QueryCtx | MutationCtx;
export type WriteCtx = MutationCtx;
type ProfileId = GenericId<"personProfiles">;

export async function requireReady(ctx: ReadCtx, requireActivation = false) {
  const state = await ctx.db.query("personProjectionState")
    .withIndex("by_version", q => q.eq("version", PROJECTION_VERSION)).first();
  if (state?.ready !== true || (requireActivation && state.activated !== true)) throw new PublishError("PROJECTIONS_NOT_READY");
}

export async function metadataFor(ctx: ReadCtx, profileId: ProfileId) {
  return ctx.db.query("personProfileMetadata").withIndex("by_profile", q => q.eq("profileId", profileId)).first();
}

export async function accountUsage(ctx: ReadCtx, accountId: string) {
  return ctx.db.query("personAccountUsage").withIndex("by_account", q => q.eq("accountId", accountId)).first();
}

/** Exact public fields are derived once, transactionally with their authoritative packet. */
export async function writeProjection(ctx: WriteCtx, profileId: ProfileId, row: ProfileSource) {
  const projection = graphProjection(row);
  const metadata = {
    profileId, accountId: row.accountId, username: row.username, handle: row.handle,
    displayName: row.displayName, summary: row.summary,
    ...(projection.subjectKind === undefined ? {} : { subjectKind: projection.subjectKind }),
    ...(projection.wikidataId === undefined ? {} : { wikidataId: projection.wikidataId }),
    packetDigest: row.packetDigest, revision: row.revision,
    packetBytes: packetBytes(row.packet), graphBytes: packetBytes(projection),
    publishedAtMs: row.publishedAtMs, updatedAtMs: row.updatedAtMs, isPublic: row.withdrawnAtMs === undefined,
  };
  const existing = await metadataFor(ctx, profileId);
  if (existing === null) await ctx.db.insert("personProfileMetadata", metadata);
  else await ctx.db.replace(existing._id, metadata);
  const graph = await ctx.db.query("personProfileGraph").withIndex("by_profile", q => q.eq("profileId", profileId)).first();
  const value = { profileId, username: row.username, isPublic: metadata.isPublic, projection };
  if (graph === null) await ctx.db.insert("personProfileGraph", value);
  else await ctx.db.replace(graph._id, value);
  return metadata;
}

/** Admit a meaningful write and reserve quota within the same Convex transaction. */
export async function admitPublication(ctx: WriteCtx, profileId: ProfileId | null, source: ProfileSource, now: number) {
  await requireReady(ctx);
  const bytes = packetBytes(source.packet);
  const usage = await accountUsage(ctx, source.accountId);
  const previous = profileId === null ? null : await metadataFor(ctx, profileId);
  if (profileId !== null && (previous === null || usage === null)) throw new PublishError("PROJECTIONS_NOT_READY");
  // Retain legacy oversized content and permit restoration/shrinkage only.
  // Normal new or growing publications cannot exceed the canonical 512 KiB cap.
  if (bytes > PERSON_INDEX_MAX_BODY_BYTES && bytes > (previous?.packetBytes ?? 0)) throw new PublishError("LIMIT_EXCEEDED");
  const delta = bytes - (previous?.packetBytes ?? 0);
  const retainedProfiles = (usage?.retainedProfiles ?? 0) + (profileId === null ? 1 : 0);
  const retainedBytes = (usage?.packetBytes ?? 0) + delta;
  // Existing over-quota data remains; shrinking it never requires deletion first.
  if ((profileId === null && retainedProfiles > MAX_PROFILES_PER_ACCOUNT)
    || (delta > 0 && retainedBytes > MAX_ACCOUNT_PACKET_BYTES)) throw new PublishError("LIMIT_EXCEEDED");
  const graphBytes = packetBytes(graphProjection(source));
  if (graphBytes > MAX_GRAPH_PROJECTION_BYTES && graphBytes > (previous?.graphBytes ?? 0)
    && previous?.packetDigest !== source.packetDigest) {
    throw new PublishError("LIMIT_EXCEEDED");
  }
  const bucket = publishBucket(usage?.publishTokens ?? PUBLISH_BURST, usage?.refilledAtMs ?? now, now);
  if (!bucket.allowed) throw new PublishError("RATE_LIMITED", bucket.retryAfterMs);
  const value = {
    accountId: source.accountId, retainedProfiles, packetBytes: retainedBytes,
    publishTokens: bucket.tokens, refilledAtMs: bucket.atMs,
  };
  if (usage === null) await ctx.db.insert("personAccountUsage", value);
  else await ctx.db.patch(usage._id, value);
}

export async function withdrawProjection(ctx: WriteCtx, profileId: ProfileId) {
  const metadata = await metadataFor(ctx, profileId);
  if (metadata !== null) await ctx.db.patch(metadata._id, { isPublic: false });
  const graph = await ctx.db.query("personProfileGraph").withIndex("by_profile", q => q.eq("profileId", profileId)).first();
  if (graph !== null) await ctx.db.patch(graph._id, { isPublic: false });
}

export async function graphPage(ctx: ReadCtx, cursor: string | null, requestedLimit?: number) {
  const limit = requestedLimit ?? 10;
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 25) throw new PublishError("BAD_REQUEST");
  await requireReady(ctx, true);
  const result = await ctx.db.query("personProfileGraph").withIndex("by_public", q => q.eq("isPublic", true))
    .paginate({ cursor, numItems: limit, maximumRowsRead: limit, maximumBytesRead: FEED_READ_BYTES });
  return { rows: result.page.map(row => row.projection), nextCursor: result.isDone ? null : result.continueCursor, isDone: result.isDone };
}

export function publicMetadata(row: Record<string, unknown>) {
  return {
    username: row.username, handle: row.handle, displayName: row.displayName, summary: row.summary,
    packetDigest: row.packetDigest, revision: row.revision, publishedAtMs: row.publishedAtMs, updatedAtMs: row.updatedAtMs,
    ...(row.subjectKind === undefined ? {} : { subjectKind: row.subjectKind }),
    ...(row.wikidataId === undefined ? {} : { wikidataId: row.wikidataId }),
  };
}

export async function projectionsActive(ctx: ReadCtx): Promise<boolean> {
  const state = await ctx.db.query("personProjectionState")
    .withIndex("by_version", q => q.eq("version", PROJECTION_VERSION)).first();
  return state?.ready === true && state.activated === true;
}

/** Publisher-scoped generation guards multi-query identity resolution against races. */
export async function publisherGeneration(ctx: ReadCtx, username: string): Promise<number> {
  const row = await ctx.db.query("personPublisherVersions").withIndex("by_username", q => q.eq("username", username)).first();
  return row?.generation ?? 0;
}

export async function advancePublisherGeneration(ctx: WriteCtx, username: string) {
  const row = await ctx.db.query("personPublisherVersions").withIndex("by_username", q => q.eq("username", username)).first();
  if (row === null) await ctx.db.insert("personPublisherVersions", { username, generation: 1 });
  else await ctx.db.patch(row._id, { generation: row.generation + 1 });
}
