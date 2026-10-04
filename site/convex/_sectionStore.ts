import { isPersonHandle, parsePublicProfileIndex, personIndexDigest } from "../../skills/soulscrape/scripts/person-index";
import { dossierSectionDigest, parseDossierSection } from "../../skills/soulscrape/scripts/dossier-section";
import { canonicalBytes, PacketValidationError } from "../../skills/soulscrape/scripts/source-packet";
import { isPublishToken } from "../lib/device-shared";
import { parseUsernameSegment } from "../lib/routes";
import { credentialForToken } from "./_lib";
import { KNOWLEDGE_PROJECTION_VERSION, knowledgeState, writeSectionKnowledgeProjection } from "./_knowledgeStore";
import { PublishError } from "./_profileErrors";
import { MAX_ACCOUNT_PACKET_BYTES, publishBucket, PUBLISH_BURST } from "./_profiles";
import type { ReadCtx, WriteCtx } from "./_profileStore";

const MAX_HEADS_PER_PROFILE = 64;
const MAX_VERSIONS_PER_PROFILE = 256;
const MAX_VERSIONS_PER_ACCOUNT = 2048;

export async function publishDossierSection(ctx: WriteCtx, token: string, input: unknown) {
  if (!isPublishToken(token)) throw new PublishError("UNAUTHORIZED");
  let section;
  try { section = parseDossierSection(input); }
  catch (error) {
    if (error instanceof PacketValidationError) throw new PublishError("PACKET_INVALID");
    throw error;
  }
  const credential = await credentialForToken(ctx, token);
  if (credential === null) throw new PublishError("UNAUTHORIZED");
  const locator = new URL(section.profileUrl);
  const [, username, handle] = locator.pathname.split("/");
  if (username !== credential.username) throw new PublishError("UNAUTHORIZED");
  const profile = await ctx.db.query("personProfiles")
    .withIndex("by_owner_handle", q => q.eq("accountId", credential.accountId).eq("handle", handle!)).first();
  if (profile === null || profile.withdrawnAtMs !== undefined || profile.username !== username
    || profile.handle !== handle || profile.packetDigest !== section.packetDigest
    || profile.revision !== section.profileRevision) throw new PublishError("BAD_REQUEST");
  const metadata = await ctx.db.query("personProfileMetadata")
    .withIndex("by_profile", q => q.eq("profileId", profile._id)).first();
  if (metadata === null || !metadata.isPublic || metadata.username !== username || metadata.handle !== handle
    || metadata.packetDigest !== section.packetDigest || metadata.revision !== profile.revision)
    throw new PublishError("PROJECTIONS_NOT_READY");
  let packet;
  try { packet = parsePublicProfileIndex(profile.packet); }
  catch { throw new PublishError("PROJECTIONS_NOT_READY"); }
  if (personIndexDigest(packet) !== profile.packetDigest) throw new PublishError("PROJECTIONS_NOT_READY");
  if (packet.subject.kind !== section.subjectKind) throw new PublishError("BAD_REQUEST");
  const digest = dossierSectionDigest(section);
  const head = await ctx.db.query("dossierSectionHeads")
    .withIndex("by_profile_section", q => q.eq("profileId", profile._id).eq("sectionId", section.id)).first();
  if (head !== null && head.documentDigest === digest && head.packetDigest === section.packetDigest
    && head.profileRevision === profile.revision) {
    const stored = await ctx.db.get(head.documentId);
    if (stored === null || stored.profileId !== profile._id || stored.sectionId !== section.id
      || stored.documentDigest !== digest || stored.packetDigest !== section.packetDigest
      || stored.profileRevision !== profile.revision) throw new PublishError("PROJECTIONS_NOT_READY");
    let storedDigest: string;
    try { storedDigest = dossierSectionDigest(stored.document); }
    catch { throw new PublishError("PROJECTIONS_NOT_READY"); }
    if (storedDigest !== digest) throw new PublishError("PROJECTIONS_NOT_READY");
    return { username, handle, sectionId: section.id, packetDigest: section.packetDigest,
      documentDigest: digest, changed: false };
  }
  if (head === null) {
    const heads = await ctx.db.query("dossierSectionHeads")
      .withIndex("by_profile", q => q.eq("profileId", profile._id)).take(MAX_HEADS_PER_PROFILE);
    if (heads.length >= MAX_HEADS_PER_PROFILE) throw new PublishError("LIMIT_EXCEEDED");
  }
  const usage = await ctx.db.query("personAccountUsage")
    .withIndex("by_account", q => q.eq("accountId", credential.accountId)).first();
  if (usage === null) throw new PublishError("PROJECTIONS_NOT_READY");
  const prior = await ctx.db.query("dossierSectionDocuments")
    .withIndex("by_profile_section_digest", q => q.eq("profileId", profile._id).eq("sectionId", section.id).eq("documentDigest", digest)).first();
  if (prior !== null) {
    let storedDigest: string;
    try { storedDigest = dossierSectionDigest(prior.document); }
    catch { throw new PublishError("PROJECTIONS_NOT_READY"); }
    if (prior.profileId !== profile._id || prior.sectionId !== section.id
      || prior.packetDigest !== section.packetDigest || prior.profileRevision !== section.profileRevision
      || prior.documentDigest !== storedDigest || storedDigest !== digest) throw new PublishError("PROJECTIONS_NOT_READY");
  }
  const documents = profile.sectionDocumentCount ?? 0;
  const accountDocuments = usage.sectionDocumentCount ?? 0;
  if ((profile.sectionDocumentCount === undefined && await ctx.db.query("dossierSectionDocuments")
    .withIndex("by_profile", q => q.eq("profileId", profile._id)).first() !== null)
    || (usage.sectionBytes === undefined && accountDocuments > 0)
    || (prior !== null && accountDocuments === 0)) throw new PublishError("PROJECTIONS_NOT_READY");
  const bytes = prior === null ? canonicalBytes(section).byteLength : 0;
  if (prior === null && (documents >= MAX_VERSIONS_PER_PROFILE || accountDocuments >= MAX_VERSIONS_PER_ACCOUNT
    || usage.packetBytes + (usage.sectionBytes ?? 0) + bytes > MAX_ACCOUNT_PACKET_BYTES))
    throw new PublishError("LIMIT_EXCEEDED");
  const now = Date.now();
  const bucket = publishBucket(usage.publishTokens ?? PUBLISH_BURST, usage.refilledAtMs ?? now, now);
  if (!bucket.allowed) throw new PublishError("RATE_LIMITED", bucket.retryAfterMs);
  const documentId = prior?._id ?? await ctx.db.insert("dossierSectionDocuments", {
    profileId: profile._id, sectionId: section.id, packetDigest: section.packetDigest, profileRevision: profile.revision,
    documentDigest: digest, document: section, publishedAtMs: now,
  });
  const projecting = await knowledgeState(ctx) !== null;
  if (projecting) await writeSectionKnowledgeProjection(ctx, profile._id, section, digest);
  const next = { profileId: profile._id, sectionId: section.id, title: section.title,
    packetDigest: section.packetDigest, profileRevision: profile.revision, documentId, documentDigest: digest,
    ...(projecting ? { knowledgeProjectionVersion: KNOWLEDGE_PROJECTION_VERSION } : {}), updatedAtMs: now };
  if (head === null) await ctx.db.insert("dossierSectionHeads", next);
  else await ctx.db.replace(head._id, next);
  await ctx.db.patch(usage._id, { sectionBytes: (usage.sectionBytes ?? 0) + bytes,
    sectionDocumentCount: accountDocuments + (prior === null ? 1 : 0),
    publishTokens: bucket.tokens, refilledAtMs: bucket.atMs });
  if (prior === null) await ctx.db.patch(profile._id, { sectionDocumentCount: documents + 1 });
  await ctx.db.patch(credential._id as never, { lastUsedAtMs: now });
  return { username, handle, sectionId: section.id, packetDigest: section.packetDigest,
    documentDigest: digest, changed: true };
}

async function publicProfile(ctx: ReadCtx, username: string, handle: string) {
  if (parseUsernameSegment(username) !== username || !isPersonHandle(handle)) return null;
  const profile = await ctx.db.query("personProfiles")
    .withIndex("by_username_handle", q => q.eq("username", username).eq("handle", handle)).first();
  if (profile === null || profile.withdrawnAtMs !== undefined) return null;
  const metadata = await ctx.db.query("personProfileMetadata")
    .withIndex("by_profile", q => q.eq("profileId", profile._id)).first();
  if (metadata === null || !metadata.isPublic || metadata.username !== username || metadata.handle !== handle
    || metadata.packetDigest !== profile.packetDigest || metadata.revision !== profile.revision) return null;
  try {
    const packet = parsePublicProfileIndex(profile.packet);
    if (packet.subject.handle !== handle || personIndexDigest(packet) !== profile.packetDigest) return null;
    return { ...profile, subjectKind: packet.subject.kind };
  } catch { return null; }
}

export async function getPublicDossierSection(ctx: ReadCtx, username: string, handle: string, sectionId: string) {
  if (typeof sectionId !== "string" || !/^[a-z][a-z0-9-]{1,79}$/u.test(sectionId)) return null;
  const profile = await publicProfile(ctx, username, handle);
  if (profile === null) return null;
  const head = await ctx.db.query("dossierSectionHeads")
    .withIndex("by_profile_section", q => q.eq("profileId", profile._id).eq("sectionId", sectionId)).first();
  if (head === null || head.packetDigest !== profile.packetDigest || head.profileRevision !== profile.revision) return null;
  const doc = await ctx.db.get(head.documentId);
  if (doc === null || doc.profileId !== profile._id || doc.sectionId !== sectionId
    || doc.packetDigest !== head.packetDigest || doc.profileRevision !== head.profileRevision
    || doc.documentDigest !== head.documentDigest) return null;
  try {
    const section = parseDossierSection(doc.document);
    if (section.id !== sectionId || section.packetDigest !== profile.packetDigest || section.profileRevision !== profile.revision
      || section.subjectKind !== profile.subjectKind || section.profileUrl !== `https://soulscrape.com/${username}/${handle}`
      || dossierSectionDigest(section) !== head.documentDigest || section.title !== head.title) return null;
    return { username, handle, packetDigest: profile.packetDigest, revision: profile.revision,
      documentDigest: head.documentDigest, section };
  } catch { return null; }
}

export async function listPublicDossierSections(ctx: ReadCtx, username: string, handle: string) {
  const profile = await publicProfile(ctx, username, handle);
  if (profile === null) return null;
  const heads = await ctx.db.query("dossierSectionHeads")
    .withIndex("by_profile", q => q.eq("profileId", profile._id)).take(MAX_HEADS_PER_PROFILE + 1);
  if (heads.length > MAX_HEADS_PER_PROFILE) return null;
  const sections = [];
  for (const head of heads) {
    if (head.packetDigest !== profile.packetDigest || head.profileRevision !== profile.revision) continue;
    const doc = await ctx.db.get(head.documentId);
    if (doc === null || doc.profileId !== profile._id || doc.sectionId !== head.sectionId
      || doc.packetDigest !== head.packetDigest || doc.profileRevision !== head.profileRevision
      || doc.documentDigest !== head.documentDigest) return null;
    try {
      const section = parseDossierSection(doc.document);
      if (section.id !== head.sectionId || section.title !== head.title
        || section.packetDigest !== profile.packetDigest || section.profileRevision !== profile.revision
        || section.subjectKind !== profile.subjectKind || section.profileUrl !== `https://soulscrape.com/${username}/${handle}`
        || dossierSectionDigest(section) !== head.documentDigest) return null;
      sections.push({ id: head.sectionId, title: head.title, href: `/${username}/${handle}/sections/${head.sectionId}` });
    } catch { return null; }
  }
  return { username, handle, packetDigest: profile.packetDigest, revision: profile.revision, sections };
}
