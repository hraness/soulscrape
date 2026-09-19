import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

import { isPublishToken } from "../lib/device-shared";
import {
  isPersonHandle,
  PacketValidationError,
  parsePersonIndex,
  personIndexDigest,
} from "../../skills/soulscrape/scripts/person-index";

import { credentialForToken, MAX_PROFILES_PER_ACCOUNT } from "./_lib";

import { PublishError } from "./_profileErrors";
import { legacyAccountRows, legacyGraph, legacyRelations, legacySitemap, legacyUsernameRows } from "./_legacyProfileReads";
import { activate, backfill, status } from "./_profileMigration";
import { advancePublisherGeneration, publisherGeneration, admitPublication, graphPage, publicMetadata, projectionsActive, requireReady, withdrawProjection, writeProjection } from "./_profileStore";
import { FEED_PAGE_SIZE, FEED_READ_BYTES, PROJECTION_VERSION, type ProfileSource } from "./_profiles";

export { PublishError } from "./_profileErrors";

function publicRow(row: {
  username: string;
  handle: string;
  displayName: string;
  summary: string;
  packetDigest: string;
  revision: number;
  packet: unknown;
  publishedAtMs: number;
  updatedAtMs: number;
  withdrawnAtMs?: number;
}) {
  if (row.withdrawnAtMs !== undefined) return null;
  return {
    username: row.username,
    handle: row.handle,
    displayName: row.displayName,
    summary: row.summary,
    packetDigest: row.packetDigest,
    revision: row.revision,
    packet: row.packet,
    publishedAtMs: row.publishedAtMs,
    updatedAtMs: row.updatedAtMs,
  };
}

export type PublishDecision =
  | { kind: "insert" }
  | { kind: "noop"; revision: number }
  | { kind: "restore"; revision: number }
  | { kind: "replace"; revision: number };

/**
 * The publish decision for an existing row and incoming packet digest.
 * Identical bytes on a live row are a no-op; identical bytes on a withdrawn
 * row restore publication at the same revision; changed bytes replace the
 * packet and bump `revision`.
 */
export function publishDecision(
  row: { packetDigest: string; revision: number; withdrawnAtMs?: number } | undefined,
  digest: string,
): PublishDecision {
  if (row === undefined) return { kind: "insert" };
  if (row.packetDigest !== digest) return { kind: "replace", revision: row.revision + 1 };
  if (row.withdrawnAtMs !== undefined) return { kind: "restore", revision: row.revision };
  return { kind: "noop", revision: row.revision };
}

/**
 * Publish or update a person index. The canonical packet digest is the
 * idempotency key: republishing identical bytes is a no-op; changed bytes
 * bump `revision`. Re-validates the packet server-side.
 */
export const publish = mutation({
  args: { token: v.string(), packet: v.any() },
  handler: async (ctx, args) => {
    if (!isPublishToken(args.token)) throw new PublishError("UNAUTHORIZED");
    const credential = await credentialForToken(ctx, args.token);
    if (credential === null) throw new PublishError("UNAUTHORIZED");
    let packet;
    try {
      packet = parsePersonIndex(args.packet);
    } catch (error) {
      if (error instanceof PacketValidationError) throw new PublishError("PACKET_INVALID");
      throw error;
    }
    const digest = personIndexDigest(packet);
    const now = Date.now();
    const row = await ctx.db
      .query("personProfiles")
      .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId).eq("handle", packet.subject.handle))
      .first() ?? undefined;
    const decision = publishDecision(row, digest);
    if (decision.kind === "noop") {
      return {
        handle: packet.subject.handle,
        username: credential.username,
        packetDigest: digest,
        revision: decision.revision,
        changed: false,
      };
    }
    const source: ProfileSource = {
      accountId: credential.accountId, username: credential.username, handle: packet.subject.handle,
      displayName: packet.subject.displayName, summary: packet.subject.summary,
      packetDigest: digest, revision: decision.kind === "insert" ? 1 : decision.revision, packet,
      publishedAtMs: row?.publishedAtMs ?? now, updatedAtMs: now,
    };
    const previousUsername = row?.username;
    await admitPublication(ctx, row?._id ?? null, source, now);
    const profileId = row === undefined
      ? await ctx.db.insert("personProfiles", { ...source, projectionVersion: PROJECTION_VERSION })
      : row._id;
    if (row !== undefined) {
      await ctx.db.patch(row._id, { ...source, withdrawnAtMs: undefined, projectionVersion: PROJECTION_VERSION });
    }
    await writeProjection(ctx, profileId, source);
    await advancePublisherGeneration(ctx, source.username);
    if (previousUsername !== undefined && previousUsername !== source.username) {
      await advancePublisherGeneration(ctx, previousUsername);
    }
    await ctx.db.patch(credential._id as never, { lastUsedAtMs: now });
    return {
      handle: source.handle, username: credential.username, packetDigest: digest,
      revision: source.revision, changed: true,
    };
  },
});

export const listOwn = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!isPublishToken(args.token)) return null;
    const credential = await credentialForToken(ctx, args.token);
    if (credential === null) return null;
    const rows = await projectionsActive(ctx) ? await ctx.db
      .query("personProfileMetadata")
      .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId))
      .take(MAX_PROFILES_PER_ACCOUNT) : await legacyAccountRows(ctx, credential.accountId);
    return rows.map(row => ({
      handle: row.handle,
      displayName: row.displayName,
      packetDigest: row.packetDigest,
      revision: row.revision,
      publishedAtMs: row.publishedAtMs,
      updatedAtMs: row.updatedAtMs,
      withdrawn: !row.isPublic,
    }));
  },
});

export const withdraw = mutation({
  args: { token: v.string(), handle: v.string() },
  handler: async (ctx, args) => {
    if (!isPublishToken(args.token)) throw new PublishError("UNAUTHORIZED");
    const credential = await credentialForToken(ctx, args.token);
    if (credential === null) throw new PublishError("UNAUTHORIZED");
    if (!isPersonHandle(args.handle)) throw new PublishError("BAD_REQUEST");
    const row = await ctx.db
      .query("personProfiles")
      .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId).eq("handle", args.handle))
      .first() ?? undefined;
    if (row === undefined) throw new PublishError("NOT_FOUND");
    if (row.withdrawnAtMs === undefined) {
      await ctx.db.patch(row._id, { withdrawnAtMs: Date.now() });
      await withdrawProjection(ctx, row._id);
      await advancePublisherGeneration(ctx, row.username);
    }
    return { ok: true as const, handle: row.handle };
  },
});

export const getPublic = query({
  args: { username: v.string(), handle: v.string() },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("personProfiles")
      .withIndex("by_username_handle", q => q.eq("username", args.username).eq("handle", args.handle))
      .first() ?? undefined;
    return row === undefined ? null : publicRow(row);
  },
});

export const listByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const rows = await projectionsActive(ctx) ? await ctx.db
      .query("personProfileMetadata")
      .withIndex("by_username_handle", q => q.eq("username", args.username))
      .take(MAX_PROFILES_PER_ACCOUNT) : await legacyUsernameRows(ctx, args.username);
    return rows
      .filter(row => row.isPublic)
      .map(row => ({
        handle: row.handle,
        displayName: row.displayName,
        summary: row.summary,
        updatedAtMs: row.updatedAtMs,
      }));
  },
});

/**
 * Per-profile identities and edges for a publisher: shared resolution of
 * outbound targets and inbound backlinks without shipping whole packets.
 * Source references stay on the citing packet's page — inbound items link
 * the citing profile rather than renumbering its sources here.
 */
export const relationsByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    if (!await projectionsActive(ctx)) return legacyRelations(ctx, args.username);
    const result = await ctx.db.query("personProfileGraph")
      .withIndex("by_username_public", q => q.eq("username", args.username).eq("isPublic", true))
      .paginate({ cursor: null, numItems: MAX_PROFILES_PER_ACCOUNT, maximumRowsRead: MAX_PROFILES_PER_ACCOUNT, maximumBytesRead: FEED_READ_BYTES });
    if (!result.isDone) throw new PublishError("PAGINATION_REQUIRED");
    return result.page.map(row => row.projection);
  },
});

/** Publisher-scoped pages for complete backlink resolution without a large transaction. */
export const relationsByUsernamePage = query({
  args: { username: v.string(), cursor: v.union(v.string(), v.null()) },
  handler: async (ctx, args) => {
    await requireReady(ctx, true);
    const result = await ctx.db.query("personProfileGraph")
      .withIndex("by_username_public", q => q.eq("username", args.username).eq("isPublic", true))
      .paginate({ cursor: args.cursor, numItems: 25, maximumRowsRead: 25, maximumBytesRead: FEED_READ_BYTES });
    const generation = await publisherGeneration(ctx, args.username);
    return { generation, rows: result.page.map(row => row.projection), nextCursor: result.isDone ? null : result.continueCursor, isDone: result.isDone };
  },
});

/** Compatibility for small callers; larger corpora use explicit cursor pages. */
export const publicGraph = query({
  args: {},
  handler: async ctx => {
    if (!await projectionsActive(ctx)) return legacyGraph(ctx);
    const result = await ctx.db.query("personProfileGraph").withIndex("by_public", q => q.eq("isPublic", true))
      .paginate({ cursor: null, numItems: 100, maximumRowsRead: 100, maximumBytesRead: FEED_READ_BYTES });
    if (!result.isDone) throw new PublishError("PAGINATION_REQUIRED");
    return result.page.map(row => row.projection);
  },
});

const pageArgs = { cursor: v.union(v.string(), v.null()), limit: v.optional(v.number()) };

export const publicGraphPage = query({
  args: pageArgs,
  handler: (ctx, args) => graphPage(ctx, args.cursor, args.limit),
});

export const publicIndexPage = query({
  args: pageArgs,
  handler: async (ctx, args) => {
    const limit = args.limit ?? FEED_PAGE_SIZE;
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > FEED_PAGE_SIZE) throw new PublishError("BAD_REQUEST");
    await requireReady(ctx, true);
    const result = await ctx.db.query("personProfileMetadata").withIndex("by_public", q => q.eq("isPublic", true))
      .paginate({ cursor: args.cursor, numItems: limit, maximumRowsRead: limit, maximumBytesRead: FEED_READ_BYTES });
    return { rows: result.page.map(publicMetadata), nextCursor: result.isDone ? null : result.continueCursor, isDone: result.isDone };
  },
});

/** Bounded discovery sample; the cursor index API enumerates the complete corpus. */
export const listAllPublic = query({
  args: {},
  handler: async ctx => {
    if (!await projectionsActive(ctx)) return legacySitemap(ctx);
    const result = await ctx.db.query("personProfileMetadata").withIndex("by_public", q => q.eq("isPublic", true))
      .paginate({ cursor: null, numItems: 1_000, maximumRowsRead: 1_000, maximumBytesRead: 2 * 1024 * 1024 });
    return result.page.map(row => ({ username: row.username, handle: row.handle, updatedAtMs: row.updatedAtMs }));
  },
});

/** Internal only: repeat bounded batches until ready, then verify projectionStatus. */
export const backfillProjections = internalMutation({ args: {}, handler: backfill });
export const projectionStatus = internalQuery({ args: {}, handler: status });
export const activateProjections = internalMutation({ args: {}, handler: activate });
