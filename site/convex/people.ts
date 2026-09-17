import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

import { isPublishToken } from "../lib/device-shared";
import {
  isPersonHandle,
  PacketValidationError,
  parsePersonIndex,
  personIndexDigest,
} from "../../skills/soulscrape/scripts/person-index";

import { credentialForToken, MAX_PROFILES_PER_ACCOUNT } from "./_lib";

export class PublishError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

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
    if (!isPublishToken(args.token)) throw new PublishError("UNAUTHORIZED", "invalid token");
    const credential = await credentialForToken(ctx, args.token);
    if (credential === null) throw new PublishError("UNAUTHORIZED", "invalid token");
    let packet;
    try {
      packet = parsePersonIndex(args.packet);
    } catch (error) {
      throw new PublishError(
        "PACKET_INVALID",
        error instanceof PacketValidationError ? error.message : "packet failed validation",
      );
    }
    const digest = personIndexDigest(packet);
    const now = Date.now();
    await ctx.db.patch(credential._id as never, { lastUsedAtMs: now });
    const existing = await ctx.db
      .query("personProfiles")
      .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId))
      .filter(q => q.eq(q.field("handle"), packet.subject.handle))
      .collect();
    const row = existing[0];
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
    if (decision.kind === "restore" && row !== undefined) {
      await ctx.db.patch(row._id, { updatedAtMs: now, withdrawnAtMs: undefined });
      return {
        handle: row.handle,
        username: credential.username,
        packetDigest: digest,
        revision: decision.revision,
        changed: true,
      };
    }
    if (decision.kind === "replace" && row !== undefined) {
      await ctx.db.patch(row._id, {
        username: credential.username,
        displayName: packet.subject.displayName,
        summary: packet.subject.summary,
        packetDigest: digest,
        revision: decision.revision,
        packet,
        updatedAtMs: now,
        withdrawnAtMs: undefined,
      });
      return {
        handle: row.handle,
        username: credential.username,
        packetDigest: digest,
        revision: decision.revision,
        changed: true,
      };
    }
    const owned = await ctx.db
      .query("personProfiles")
      .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId))
      .collect();
    if (owned.length >= MAX_PROFILES_PER_ACCOUNT) {
      throw new PublishError("LIMIT_EXCEEDED", `at most ${MAX_PROFILES_PER_ACCOUNT} profiles per account`);
    }
    await ctx.db.insert("personProfiles", {
      accountId: credential.accountId,
      username: credential.username,
      handle: packet.subject.handle,
      displayName: packet.subject.displayName,
      summary: packet.subject.summary,
      packetDigest: digest,
      revision: 1,
      packet,
      publishedAtMs: now,
      updatedAtMs: now,
    });
    return {
      handle: packet.subject.handle,
      username: credential.username,
      packetDigest: digest,
      revision: 1,
      changed: true,
    };
  },
});

export const listOwn = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!isPublishToken(args.token)) return null;
    const credential = await credentialForToken(ctx, args.token);
    if (credential === null) return null;
    const rows = await ctx.db
      .query("personProfiles")
      .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId))
      .take(MAX_PROFILES_PER_ACCOUNT);
    return rows.map(row => ({
      handle: row.handle,
      displayName: row.displayName,
      packetDigest: row.packetDigest,
      revision: row.revision,
      publishedAtMs: row.publishedAtMs,
      updatedAtMs: row.updatedAtMs,
      withdrawn: row.withdrawnAtMs !== undefined,
    }));
  },
});

export const withdraw = mutation({
  args: { token: v.string(), handle: v.string() },
  handler: async (ctx, args) => {
    if (!isPublishToken(args.token) || !isPersonHandle(args.handle)) {
      throw new PublishError("BAD_REQUEST", "invalid token or handle");
    }
    const credential = await credentialForToken(ctx, args.token);
    if (credential === null) throw new PublishError("UNAUTHORIZED", "invalid token");
    const existing = await ctx.db
      .query("personProfiles")
      .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId))
      .filter(q => q.eq(q.field("handle"), args.handle))
      .collect();
    const row = existing[0];
    if (row === undefined) throw new PublishError("NOT_FOUND", "no published profile with that handle");
    if (row.withdrawnAtMs === undefined) {
      await ctx.db.patch(row._id, { withdrawnAtMs: Date.now() });
    }
    return { ok: true as const, handle: row.handle };
  },
});

export const getPublic = query({
  args: { username: v.string(), handle: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("personProfiles")
      .withIndex("by_username_handle", q => q.eq("username", args.username))
      .filter(q => q.eq(q.field("handle"), args.handle))
      .collect();
    const row = rows[0];
    return row === undefined ? null : publicRow(row);
  },
});

export const listByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("personProfiles")
      .withIndex("by_username", q => q.eq("username", args.username))
      .take(MAX_PROFILES_PER_ACCOUNT);
    return rows
      .filter(row => row.withdrawnAtMs === undefined)
      .map(row => ({
        handle: row.handle,
        displayName: row.displayName,
        summary: row.summary,
        updatedAtMs: row.updatedAtMs,
      }));
  },
});

/**
 * Per-profile relation edges for a publisher: enough to resolve outbound
 * targets and compute inbound backlinks without shipping whole packets.
 * Source references stay on the citing packet's page — inbound items link
 * the citing profile rather than renumbering its sources here.
 */
export const relationsByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("personProfiles")
      .withIndex("by_username", q => q.eq("username", args.username))
      .take(MAX_PROFILES_PER_ACCOUNT);
    return rows
      .filter(row => row.withdrawnAtMs === undefined)
      .map(row => {
        const packet = row.packet as {
          relations?: readonly {
            target?: unknown;
            kind?: unknown;
            note?: unknown;
            start?: unknown;
            end?: unknown;
            targetWikidataId?: unknown;
          }[];
          timeline?: readonly {
            kind?: unknown;
            date?: unknown;
            end?: unknown;
            title?: unknown;
            organizationHandle?: unknown;
          }[];
          appearances?: readonly {
            title?: unknown;
            publishedAt?: unknown;
            participantHandles?: unknown;
          }[];
        };
        const relations = Array.isArray(packet.relations) ? packet.relations : [];
        const timeline = Array.isArray(packet.timeline) ? packet.timeline : [];
        const appearances = Array.isArray(packet.appearances) ? packet.appearances : [];
        return {
          handle: row.handle,
          displayName: row.displayName,
          relations: relations
            .filter(
              (relation): relation is { target: string; kind: string; note?: string; start?: string; end?: string; targetWikidataId?: string } =>
                typeof relation?.target === "string" && typeof relation?.kind === "string",
            )
            .map(relation => ({
              target: relation.target,
              kind: relation.kind,
              ...(typeof relation.note === "string" ? { note: relation.note } : {}),
              ...(typeof relation.start === "string" ? { start: relation.start } : {}),
              ...(typeof relation.end === "string" ? { end: relation.end } : {}),
              ...(typeof relation.targetWikidataId === "string" ? { targetWikidataId: relation.targetWikidataId } : {}),
            })),
          timeline: timeline
            .filter(
              (event): event is { kind: string; date: string; title: string; end?: string; organizationHandle: string } =>
                typeof event?.organizationHandle === "string" &&
                typeof event?.kind === "string" &&
                typeof event?.date === "string" &&
                typeof event?.title === "string",
            )
            .map(event => ({
              kind: event.kind,
              date: event.date,
              title: event.title,
              ...(typeof event.end === "string" ? { end: event.end } : {}),
              organizationHandle: event.organizationHandle,
            })),
          appearances: appearances
            .filter(
              (appearance): appearance is {
                title: string;
                publishedAt?: string;
                participantHandles: { name: string; handle: string }[];
              } =>
                typeof appearance?.title === "string" &&
                Array.isArray(appearance.participantHandles),
            )
            .map(appearance => ({
              title: appearance.title,
              ...(typeof appearance.publishedAt === "string" ? { publishedAt: appearance.publishedAt } : {}),
              participantHandles: appearance.participantHandles
                .filter(
                  (binding): binding is { name: string; handle: string } =>
                    typeof binding?.name === "string" && typeof binding?.handle === "string",
                )
                .slice(0, 12)
                .map(binding => ({ name: binding.name, handle: binding.handle })),
            })),
        };
      });
  },
});

/**
 * Public corpus feed for the machine-readable API: every live profile's
 * summary row plus its relation edges and subject Wikidata binding, so
 * `/api/v1/index.json` and `/api/v1/graph.json` can be served without
 * shipping full packets. Bounded like the sitemap feed.
 */
export const publicGraph = query({
  args: {},
  handler: async ctx => {
    const rows = await ctx.db.query("personProfiles").take(5_000);
    return rows
      .filter(row => row.withdrawnAtMs === undefined)
      .map(row => {
        const packet = row.packet as {
          subject?: { kind?: unknown; identity?: { wikidataId?: unknown } };
          relations?: readonly {
            target?: unknown;
            kind?: unknown;
            note?: unknown;
            start?: unknown;
            end?: unknown;
            targetWikidataId?: unknown;
            targetKind?: unknown;
            targetName?: unknown;
            sourceIds?: unknown;
          }[];
          timeline?: readonly {
            kind?: unknown;
            date?: unknown;
            end?: unknown;
            title?: unknown;
            organization?: unknown;
            organizationHandle?: unknown;
            sourceIds?: unknown;
          }[];
          appearances?: readonly {
            title?: unknown;
            publishedAt?: unknown;
            participantHandles?: unknown;
            sourceIds?: unknown;
          }[];
          themes?: readonly { kind?: unknown; title?: unknown; status?: unknown }[];
          openQuestions?: unknown;
        };
        const relations = Array.isArray(packet.relations) ? packet.relations : [];
        const timeline = Array.isArray(packet.timeline) ? packet.timeline : [];
        const appearances = Array.isArray(packet.appearances) ? packet.appearances : [];
        const themes = Array.isArray(packet.themes) ? packet.themes : [];
        const openQuestions = Array.isArray(packet.openQuestions) ? packet.openQuestions : [];
        const wikidataId = packet.subject?.identity?.wikidataId;
        return {
          username: row.username,
          handle: row.handle,
          displayName: row.displayName,
          summary: row.summary,
          packetDigest: row.packetDigest,
          revision: row.revision,
          publishedAtMs: row.publishedAtMs,
          updatedAtMs: row.updatedAtMs,
          ...(typeof packet.subject?.kind === "string" ? { subjectKind: packet.subject.kind } : {}),
          ...(typeof wikidataId === "string" ? { wikidataId } : {}),
          relations: relations
            .filter(
              (relation): relation is {
                target: string;
                kind: string;
                note?: string;
                start?: string;
                end?: string;
                targetWikidataId?: string;
                targetKind?: string;
                targetName?: string;
                sourceIds?: string[];
              } =>
                typeof relation?.target === "string" && typeof relation?.kind === "string",
            )
            .map(relation => ({
              target: relation.target,
              kind: relation.kind,
              ...(typeof relation.note === "string" ? { note: relation.note } : {}),
              ...(typeof relation.start === "string" ? { start: relation.start } : {}),
              ...(typeof relation.end === "string" ? { end: relation.end } : {}),
              ...(typeof relation.targetWikidataId === "string" ? { targetWikidataId: relation.targetWikidataId } : {}),
              ...(typeof relation.targetKind === "string" ? { targetKind: relation.targetKind } : {}),
              ...(typeof relation.targetName === "string" ? { targetName: relation.targetName } : {}),
              ...(Array.isArray(relation.sourceIds)
                ? { sourceIds: relation.sourceIds.filter((id): id is string => typeof id === "string") }
                : {}),
            })),
          timeline: timeline
            .filter(
              (event): event is {
                kind: string;
                date: string;
                title: string;
                end?: string;
                organization?: string;
                organizationHandle?: string;
                sourceIds?: string[];
              } =>
                typeof event?.organizationHandle === "string" &&
                typeof event?.kind === "string" &&
                typeof event?.date === "string" &&
                typeof event?.title === "string",
            )
            .map(event => ({
              kind: event.kind,
              date: event.date,
              title: event.title,
              ...(typeof event.end === "string" ? { end: event.end } : {}),
              ...(typeof event.organization === "string" ? { organization: event.organization } : {}),
              organizationHandle: event.organizationHandle,
              ...(Array.isArray(event.sourceIds)
                ? { sourceIds: event.sourceIds.filter((id): id is string => typeof id === "string") }
                : {}),
            })),
          appearances: appearances
            .filter(
              (appearance): appearance is {
                title: string;
                publishedAt?: string;
                participantHandles: { name: string; handle: string }[];
                sourceIds?: string[];
              } =>
                typeof appearance?.title === "string" &&
                Array.isArray(appearance.participantHandles),
            )
            .map(appearance => ({
              title: appearance.title,
              ...(typeof appearance.publishedAt === "string" ? { publishedAt: appearance.publishedAt } : {}),
              participantHandles: appearance.participantHandles
                .filter(
                  (binding): binding is { name: string; handle: string } =>
                    typeof binding?.name === "string" && typeof binding?.handle === "string",
                )
                .slice(0, 12)
                .map(binding => ({ name: binding.name, handle: binding.handle })),
              ...(Array.isArray(appearance.sourceIds)
                ? { sourceIds: appearance.sourceIds.filter((id): id is string => typeof id === "string") }
                : {}),
            })),
          themes: themes
            .filter(
              (theme): theme is { kind: string; title: string; status?: string } =>
                typeof theme?.kind === "string" && typeof theme?.title === "string",
            )
            .map(theme => ({
              kind: theme.kind,
              title: theme.title,
              ...(typeof theme.status === "string" ? { status: theme.status } : {}),
            })),
          openQuestions: openQuestions.filter((q): q is string => typeof q === "string"),
        };
      });
  },
});

/** Sitemap feed: every currently published profile, bounded. */
export const listAllPublic = query({
  args: {},
  handler: async ctx => {
    const rows = await ctx.db.query("personProfiles").take(5_000);
    return rows
      .filter(row => row.withdrawnAtMs === undefined)
      .map(row => ({ username: row.username, handle: row.handle, updatedAtMs: row.updatedAtMs }));
  },
});
