import type { GenericId } from "convex/values";
import { buildKnowledgeIndex, knowledgeResourceKey } from "../lib/knowledge-index";
import { dossierSectionDigest, parseDossierSection, type DossierSection, type DossierSource } from "../../skills/soulscrape/scripts/dossier-section";
import { parsePublicProfileIndex, personIndexDigest, type PersonIndexClaim, type PersonIndexSource } from "../../skills/soulscrape/scripts/person-index";
import { parseUsernameSegment } from "../lib/routes";
import { PublishError } from "./_profileErrors";
import type { ProfileSource } from "./_profiles";
import type { ReadCtx, WriteCtx } from "./_profileStore";

export const KNOWLEDGE_PROJECTION_VERSION = 1;
export const MAX_KNOWLEDGE_MEMBERSHIPS = 4096;
export const MAX_SECTION_SOURCE_MEMBERSHIPS = 4096;
export const MAX_KNOWLEDGE_PAGE_SIZE = 4;
export const KNOWLEDGE_PAGE_BYTES = 256 * 1024;
export const KNOWLEDGE_BACKFILL_BATCH_SIZE = 2;
export const KNOWLEDGE_BACKFILL_READ_BYTES = 2 * 1024 * 1024;

type ProjectionSource = Pick<ProfileSource, "username" | "handle" | "packetDigest" | "revision" | "packet">;
type SourcePreview = Pick<PersonIndexSource, "id" | "title" | "url" | "publisher" | "accessedAt" | "binding" | "mediaType" | "publishedAt">;
type SectionSourcePreview = Pick<DossierSource, "id" | "originalId" | "title" | "url" | "publisher" | "published" | "type" | "accessedAt">;
type ProfileId = GenericId<"personProfiles">;
type Membership = Readonly<{
  key: string;
  role: "primary" | "reference" | "citation" | "section_citation";
  sectionId?: string;
  sectionDigest?: string;
  username: string;
  handle: string;
  packetDigest: string;
  revision: number;
  subjectKind?: "person" | "organization" | "product" | "unknown";
  sourceId?: string;
  targetName?: string;
  targetHandle?: string;
  recordId?: string;
  relationKind?: string;
  origin?: "relation" | "timeline" | "appearance";
  sourceIds?: string[];
}>;

export function knowledgeMemberships(row: ProjectionSource): Membership[] {
  const profileUrl = `https://soulscrape.com/${row.username}/${row.handle}`;
  const projection = buildKnowledgeIndex(JSON.stringify([{
    profileUrl, packetDigest: row.packetDigest, revision: row.revision, packet: row.packet,
  }]));
  const common = { username: row.username, handle: row.handle, packetDigest: row.packetDigest, revision: row.revision };
  const primaryId = projection.publications[0]!.subjectId;
  const result: Membership[] = [{ ...common, key: primaryId, role: "primary",
    subjectKind: projection.publications[0]!.subjectKind }];
  for (const resource of projection.sources) {
    for (const occurrence of resource.occurrences) {
      result.push({ ...common, key: resource.id, role: "citation", sourceId: occurrence.source.id });
    }
  }
  const nodes = new Map(projection.subjects.map(subject => [subject.id, subject]));
  for (const relation of projection.relations) {
    const target = nodes.get(relation.to);
    const targetName = target?.labels.find(label => label.recordId === relation.recordId && label.origin === relation.origin)?.text;
    result.push({ ...common, key: relation.to, role: "reference", recordId: relation.recordId,
      relationKind: relation.kind, origin: relation.origin, sourceIds: relation.citations.map(citation => citation.sourceId),
      targetHandle: relation.targetHandle,
      ...(targetName === undefined ? {} : { targetName }),
      ...(target === undefined ? {} : { subjectKind: target.kind }) });
  }
  if (result.length > MAX_KNOWLEDGE_MEMBERSHIPS) throw new PublishError("LIMIT_EXCEEDED");
  return result;
}

export async function knowledgeState(ctx: ReadCtx) {
  return ctx.db.query("knowledgeProjectionState")
    .withIndex("by_version", q => q.eq("version", KNOWLEDGE_PROJECTION_VERSION)).first();
}

export async function writeKnowledgeProjection(ctx: WriteCtx, profileId: ProfileId, source: ProjectionSource) {
  const memberships = knowledgeMemberships(source);
  const previous = await ctx.db.query("knowledgeMemberships")
    .withIndex("by_profile_section", q => q.eq("profileId", profileId).eq("sectionId", undefined))
    .take(MAX_KNOWLEDGE_MEMBERSHIPS + 1);
  if (previous.length > MAX_KNOWLEDGE_MEMBERSHIPS) throw new PublishError("LIMIT_EXCEEDED");
  for (const row of previous) await ctx.db.delete(row._id);
  for (const membership of memberships) await ctx.db.insert("knowledgeMemberships", { profileId, ...membership });
  await ctx.db.patch(profileId, { knowledgeProjectionVersion: KNOWLEDGE_PROJECTION_VERSION });
  return { memberships: memberships.length };
}

export async function writeSectionKnowledgeProjection(ctx: WriteCtx, profileId: ProfileId,
  section: DossierSection, documentDigest: string) {
  const profile = await ctx.db.get(profileId);
  if (profile === null || profile.packetDigest !== section.packetDigest || profile.revision !== section.profileRevision
    || section.profileUrl !== `https://soulscrape.com/${profile.username}/${profile.handle}`
    || dossierSectionDigest(section) !== documentDigest) throw new PublishError("PROJECTIONS_NOT_READY");
  const previous = await ctx.db.query("knowledgeMemberships")
    .withIndex("by_profile_section", q => q.eq("profileId", profileId).eq("sectionId", section.id)).take(257);
  if (previous.length > 256) throw new PublishError("PROJECTIONS_NOT_READY");
  const retained = profile.sectionSourceMembershipCount ?? 0;
  if (retained < previous.length || retained - previous.length + section.sources.length > MAX_SECTION_SOURCE_MEMBERSHIPS)
    throw new PublishError(retained < previous.length ? "PROJECTIONS_NOT_READY" : "LIMIT_EXCEEDED");
  for (const row of previous) await ctx.db.delete(row._id);
  for (const source of section.sources) await ctx.db.insert("knowledgeMemberships", {
    profileId, key: knowledgeResourceKey(source.url), role: "section_citation", sectionId: section.id,
    sectionDigest: documentDigest, sourceId: source.id, username: profile.username, handle: profile.handle,
    packetDigest: section.packetDigest, revision: section.profileRevision,
  });
  await ctx.db.patch(profileId, { sectionSourceMembershipCount: retained - previous.length + section.sources.length });
  return { memberships: section.sources.length };
}

export async function writeKnowledgeIfStarted(ctx: WriteCtx, profileId: ProfileId, source: ProjectionSource) {
  if (await knowledgeState(ctx) !== null) await writeKnowledgeProjection(ctx, profileId, source);
}

export async function isKnowledgeAvailable(ctx: ReadCtx): Promise<boolean> {
  const state = await knowledgeState(ctx);
  return state?.ready === true && state.activated === true
    && await ctx.db.query("personProfiles")
      .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).first() === null;
}

export async function areSectionSourcesAvailable(ctx: ReadCtx): Promise<boolean> {
  const state = await knowledgeState(ctx);
  return state?.sectionSourcesReady === true && state.sectionSourcesActivated === true
    && await isKnowledgeAvailable(ctx)
    && await ctx.db.query("dossierSectionHeads")
      .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).first() === null;
}

export async function lookupKnowledgeMemberships(ctx: ReadCtx, key: string, cursor: string | null, limit?: number, publisher?: string) {
  if (typeof key !== "string" || !/^(?:subject|resource)-[0-9a-f]{64}$/u.test(key)
    || (cursor !== null && (typeof cursor !== "string" || cursor.length < 1 || cursor.length > 2048
      || /[\u0000-\u0020\u007f]/u.test(cursor)))
    || (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1 || limit > MAX_KNOWLEDGE_PAGE_SIZE))
    || (publisher !== undefined && parseUsernameSegment(publisher) !== publisher)) {
    throw new PublishError("BAD_REQUEST");
  }
  const state = await knowledgeState(ctx);
  if (state?.ready !== true || state.activated !== true
    || await ctx.db.query("personProfiles")
      .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).first() !== null) {
    throw new PublishError("PROJECTIONS_NOT_READY");
  }
  const count = limit ?? MAX_KNOWLEDGE_PAGE_SIZE;
  const sectionSourcesReady = key.startsWith("resource-") && state.sectionSourcesReady === true
    && state.sectionSourcesActivated === true && await ctx.db.query("dossierSectionHeads")
      .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).first() === null;
  const reviewed = key.startsWith("subject-") ? await ctx.db.query("reviewedSubjects")
    .withIndex("by_key", q => q.eq("key", key)).first() : null;
  const pagination = { cursor, numItems: count, maximumRowsRead: count, maximumBytesRead: KNOWLEDGE_PAGE_BYTES };
  let members: Array<Membership & { profileId: ProfileId }>;
  let isDone: boolean;
  let nextCursor: string | null;
  if (reviewed !== null) {
    const query = ctx.db.query("reviewedBindings");
    const filtered = publisher === undefined
      ? query.withIndex("by_key", q => q.eq("key", key))
      : query.withIndex("by_key_username", q => q.eq("key", key).eq("username", publisher));
    const page = await filtered.paginate(pagination);
    members = page.page.map(binding => ({ profileId: binding.profileId, key, role: "primary",
      username: binding.username, handle: binding.handle, packetDigest: binding.packetDigest,
      revision: binding.profileRevision, subjectKind: binding.kind }));
    isDone = page.isDone;
    nextCursor = page.isDone ? null : page.continueCursor;
  } else {
    const query = ctx.db.query("knowledgeMemberships");
    const filtered = sectionSourcesReady
      ? publisher === undefined
        ? query.withIndex("by_key", q => q.eq("key", key))
        : query.withIndex("by_key_username", q => q.eq("key", key).eq("username", publisher))
      : publisher === undefined
        ? query.withIndex("by_key_section", q => q.eq("key", key).eq("sectionId", undefined))
        : query.withIndex("by_key_username_section", q => q.eq("key", key).eq("username", publisher).eq("sectionId", undefined));
    const page = await filtered.paginate(pagination);
    members = page.page;
    isDone = page.isDone;
    nextCursor = page.isDone ? null : page.continueCursor;
  }
  const rows: Array<Membership & { profileUrl: string; displayName: string; summary: string;
    source?: SourcePreview; sourceOrdinal?: number; sectionTitle?: string; sectionSource?: SectionSourcePreview;
    asOf?: string; claimCount?: number; claims?: readonly PersonIndexClaim[] }> = [];
  for (const membership of members) {
    if (reviewed !== null && membership.subjectKind !== reviewed.kind) continue;
    const profile = await ctx.db.get(membership.profileId);
    if (profile === null || profile.withdrawnAtMs !== undefined || profile.knowledgeProjectionVersion !== KNOWLEDGE_PROJECTION_VERSION
      || profile.username !== membership.username || profile.handle !== membership.handle
      || profile.packetDigest !== membership.packetDigest || profile.revision !== membership.revision) continue;
    const metadata = await ctx.db.query("personProfileMetadata")
      .withIndex("by_profile", q => q.eq("profileId", membership.profileId)).first();
    if (metadata === null || !metadata.isPublic || metadata.username !== membership.username
      || metadata.handle !== membership.handle || metadata.packetDigest !== membership.packetDigest
      || metadata.revision !== membership.revision) continue;
    let packet;
    try {
      packet = parsePublicProfileIndex(profile.packet);
      if (personIndexDigest(packet) !== membership.packetDigest) continue;
    } catch { continue; }
    if (membership.role === "section_citation") {
      if (!sectionSourcesReady || membership.sectionId === undefined || membership.sectionDigest === undefined) continue;
      const head = await ctx.db.query("dossierSectionHeads")
        .withIndex("by_profile_section", q => q.eq("profileId", membership.profileId).eq("sectionId", membership.sectionId!)).first();
      if (head === null || head.knowledgeProjectionVersion !== KNOWLEDGE_PROJECTION_VERSION
        || head.packetDigest !== membership.packetDigest || head.profileRevision !== membership.revision
        || head.documentDigest !== membership.sectionDigest) continue;
      const document = await ctx.db.get(head.documentId);
      if (document === null || document.profileId !== membership.profileId || document.sectionId !== head.sectionId
        || document.packetDigest !== head.packetDigest || document.profileRevision !== head.profileRevision
        || document.documentDigest !== head.documentDigest) continue;
      let section;
      try {
        section = parseDossierSection(document.document);
        if (dossierSectionDigest(section) !== head.documentDigest || section.subjectKind !== packet.subject.kind
          || section.title !== head.title || section.packetDigest !== profile.packetDigest
          || section.profileRevision !== profile.revision || section.id !== head.sectionId
          || section.profileUrl !== `https://soulscrape.com/${profile.username}/${profile.handle}`) continue;
      } catch { continue; }
      const source = section.sources.find(item => item.id === membership.sourceId);
      if (source === undefined || knowledgeResourceKey(source.url) !== membership.key) continue;
      const sectionSource: SectionSourcePreview = { id: source.id, originalId: source.originalId,
        title: source.title, url: source.url, publisher: source.publisher, published: source.published, type: source.type,
        ...(source.accessedAt === undefined ? {} : { accessedAt: source.accessedAt }) };
      rows.push({ key: membership.key, role: membership.role, username: membership.username, handle: membership.handle,
        packetDigest: membership.packetDigest, revision: membership.revision, sectionId: membership.sectionId,
        sectionDigest: membership.sectionDigest, sourceId: source.id, sectionTitle: section.title, sectionSource,
        profileUrl: `https://soulscrape.com/${profile.username}/${profile.handle}`,
        displayName: metadata.displayName, summary: metadata.summary });
      continue;
    }
    const source = membership.role === "citation"
      ? packet.sources.find(candidate => candidate.id === membership.sourceId) : undefined;
    if (membership.role === "citation" && source === undefined) continue;
    const sourceOrdinal = source === undefined ? undefined : packet.sources.indexOf(source) + 1;
    const preview: SourcePreview | undefined = source === undefined ? undefined : {
      id: source.id, title: source.title, url: source.url, publisher: source.publisher,
      accessedAt: source.accessedAt, binding: source.binding, mediaType: source.mediaType,
      ...(source.publishedAt === undefined ? {} : { publishedAt: source.publishedAt }),
    };
    rows.push({ key: membership.key, role: membership.role, username: membership.username, handle: membership.handle,
      packetDigest: membership.packetDigest, revision: membership.revision,
      ...(membership.subjectKind === undefined ? {} : { subjectKind: membership.subjectKind }),
      ...(membership.role === "primary" ? { asOf: packet.scope.asOf, claimCount: packet.claims.length, claims: packet.claims.slice(0, 8) } : {}),
      ...(membership.sourceId === undefined ? {} : { sourceId: membership.sourceId }),
      ...(preview === undefined || sourceOrdinal === undefined ? {} : { source: preview, sourceOrdinal }),
      ...(membership.targetName === undefined ? {} : { targetName: membership.targetName }),
      ...(membership.targetHandle === undefined ? {} : { targetHandle: membership.targetHandle }),
      ...(membership.recordId === undefined ? {} : { recordId: membership.recordId }),
      ...(membership.relationKind === undefined ? {} : { relationKind: membership.relationKind }),
      ...(membership.origin === undefined ? {} : { origin: membership.origin }),
      ...(membership.sourceIds === undefined ? {} : { sourceIds: membership.sourceIds }),
      profileUrl: `https://soulscrape.com/${profile.username}/${profile.handle}`,
      displayName: metadata.displayName, summary: metadata.summary });
  }
  return { rows, nextCursor, isDone, snapshot: false,
    ...(key.startsWith("resource-") ? { sectionSourcesReady } : {}),
    ...(reviewed === null ? {} : { reviewed: { kind: reviewed.kind, label: reviewed.label, revision: reviewed.revision } }) };
}
