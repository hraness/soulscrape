import { canonicalBytes } from "../../skills/soulscrape/scripts/source-packet";

export const MAX_ACCOUNT_PACKET_BYTES = 20 * 1024 * 1024;
export const MAX_GRAPH_PROJECTION_BYTES = 64 * 1024;
export const PUBLISH_BURST = 10;
export const PUBLISH_REFILL_MS = 60_000;
export const PROJECTION_VERSION = 1;
export const FEED_PAGE_SIZE = 100;
export const FEED_READ_BYTES = 8 * 1024 * 1024;
export const BACKFILL_BATCH_SIZE = 8;
export const BACKFILL_READ_BYTES = 4 * 1024 * 1024;

export type ProfileSource = {
  accountId: string;
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
};

export function packetBytes(packet: unknown): number {
  return canonicalBytes(packet).byteLength;
}

/** A capacity-ten bucket, replenished at sixty meaningful publishes per hour. */
export function publishBucket(tokens: number, atMs: number, nowMs: number) {
  const available = Math.min(PUBLISH_BURST, tokens + Math.max(0, nowMs - atMs) / PUBLISH_REFILL_MS);
  return available >= 1
    ? { allowed: true as const, tokens: available - 1, atMs: nowMs }
    : { allowed: false as const, retryAfterMs: Math.ceil((1 - available) * PUBLISH_REFILL_MS) };
}

/** Exact existing public graph semantics, materialized once per meaningful publish. */
export function graphProjection(row: ProfileSource) {
  const packet = row.packet as {
    subject?: { kind?: unknown; identity?: { wikidataId?: unknown } };
    relations?: readonly {
      id?: unknown;
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
      id?: unknown;
      kind?: unknown;
      date?: unknown;
      end?: unknown;
      title?: unknown;
      organization?: unknown;
      organizationHandle?: unknown;
      sourceIds?: unknown;
    }[];
    appearances?: readonly {
      id?: unknown;
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
          id?: string;
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
        ...(typeof relation.id === "string" ? { id: relation.id } : {}),
        ...(Array.isArray(relation.sourceIds)
          ? { sourceIds: relation.sourceIds.filter((id): id is string => typeof id === "string") }
          : {}),
      })),
    timeline: timeline
      .filter(
        (event): event is {
          id?: string;
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
        ...(typeof event.id === "string" ? { id: event.id } : {}),
        ...(Array.isArray(event.sourceIds)
          ? { sourceIds: event.sourceIds.filter((id): id is string => typeof id === "string") }
          : {}),
      })),
    appearances: appearances
      .filter(
        (appearance): appearance is {
          id?: string;
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
        ...(typeof appearance.id === "string" ? { id: appearance.id } : {}),
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
}
