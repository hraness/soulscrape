import type { GenericId } from "convex/values";
import { canonicalBytes, sha256Hex } from "../../skills/soulscrape/scripts/source-packet";
import { isPersonHandle, parsePublicProfileIndex, personIndexDigest } from "../../skills/soulscrape/scripts/person-index";
import { parseUsernameSegment } from "../lib/routes";
import { isKnowledgeAvailable, KNOWLEDGE_PROJECTION_VERSION } from "./_knowledgeStore";
import { PublishError } from "./_profileErrors";
import type { ReadCtx, WriteCtx } from "./_profileStore";

const SUBJECT_KEY = /^subject-[a-f0-9]{64}$/u;
const OPERATION_ID = /^[a-f0-9]{32}$/u;
const SOURCE_ID = /^source-[a-f0-9]{20}$/u;
const HASH = /^[a-f0-9]{64}$/u;
const MAX_REVIEW_EVENTS_PER_PROFILE = 256;
type Kind = "person" | "organization" | "product";
type Review = { operationId: string; reviewer: string; reason: string };
type Bind = Review & { profileId: GenericId<"personProfiles">; key: string; expectedRevision: number;
  expectedProfileRevision: number; expectedPacketDigest: string; sourceIds: string[] };
type Correct = Bind & { fromKey: string };
type Unbind = Review & { profileId: GenericId<"personProfiles">; key: string; expectedRevision: number };
type Create = Review & { kind: Kind; label: string };
type Rename = Review & { key: string; expectedRevision: number; label: string };

function validReview(input: Review): boolean {
  return OPERATION_ID.test(input.operationId) && typeof input.reviewer === "string"
    && /^[a-z0-9][a-z0-9_-]{2,63}$/u.test(input.reviewer)
    && typeof input.reason === "string" && input.reason.length >= 10 && input.reason.length <= 500;
}

async function replay(ctx: ReadCtx, input: Review & object) {
  const existing = await ctx.db.query("reviewedDecisionHistory")
    .withIndex("by_operation", q => q.eq("operationId", input.operationId)).first();
  if (existing === null) return null;
  if (existing.inputDigest !== sha256Hex(canonicalBytes(input))) throw new PublishError("BAD_REQUEST");
  return { key: existing.key, revision: existing.revision, changed: false };
}

async function record(ctx: WriteCtx, input: Review & object, action: "create" | "bind" | "correct" | "unbind" | "rename",
  key: string, revision: number, sourceIds: string[] = [], profileId?: GenericId<"personProfiles">,
  previousKey?: string) {
  await ctx.db.insert("reviewedDecisionHistory", { operationId: input.operationId,
    inputDigest: sha256Hex(canonicalBytes(input)), action, key, revision,
    reviewer: input.reviewer, reason: input.reason, sourceIds, atMs: Date.now(),
    ...(profileId === undefined ? {} : { profileId }),
    ...(previousKey === undefined ? {} : { previousKey }) });
  return { key, revision, changed: true };
}

export async function createReviewedSubject(ctx: WriteCtx, input: Create) {
  if (!validReview(input) || (input.kind !== "person" && input.kind !== "organization" && input.kind !== "product")
    || typeof input.label !== "string" || input.label.length < 2 || input.label.length > 200) throw new PublishError("BAD_REQUEST");
  const prior = await replay(ctx, input);
  if (prior !== null) return prior;
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const key = `subject-${Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("")}`;
  if (await ctx.db.query("reviewedSubjects").withIndex("by_key", q => q.eq("key", key)).first() !== null) throw new PublishError("BAD_REQUEST");
  const now = Date.now();
  await ctx.db.insert("reviewedSubjects", { key, kind: input.kind, label: input.label, aliases: [], revision: 1,
    createdAtMs: now, updatedAtMs: now });
  return record(ctx, input, "create", key, 1);
}

async function setReviewedBinding(ctx: WriteCtx, input: Bind | Correct, action: "bind" | "correct") {
  if (!validReview(input) || !SUBJECT_KEY.test(input.key) || !HASH.test(input.expectedPacketDigest)
    || !Number.isSafeInteger(input.expectedRevision) || input.expectedRevision < 0
    || !Number.isSafeInteger(input.expectedProfileRevision) || input.expectedProfileRevision < 1
    || !Array.isArray(input.sourceIds) || input.sourceIds.length < 1 || input.sourceIds.length > 8
    || new Set(input.sourceIds).size !== input.sourceIds.length
    || !input.sourceIds.every(id => typeof id === "string" && SOURCE_ID.test(id))
    || (action === "correct" && (!("fromKey" in input) || !SUBJECT_KEY.test(input.fromKey)
      || input.fromKey === input.key))) throw new PublishError("BAD_REQUEST");
  const prior = await replay(ctx, input);
  if (prior !== null) return prior;
  const [subject, profile, existing] = await Promise.all([
    ctx.db.query("reviewedSubjects").withIndex("by_key", q => q.eq("key", input.key)).first(),
    ctx.db.get(input.profileId),
    ctx.db.query("reviewedBindings").withIndex("by_profile", q => q.eq("profileId", input.profileId)).first(),
  ]);
  if (subject === null || profile === null || profile.withdrawnAtMs !== undefined
    || profile.packetDigest !== input.expectedPacketDigest || profile.revision !== input.expectedProfileRevision
    || (existing?.revision ?? 0) !== input.expectedRevision
    || (action === "bind" && existing?.key !== undefined)
    || (action === "correct" && existing?.key !== (input as Correct).fromKey)) throw new PublishError("BAD_REQUEST");
  const metadata = await ctx.db.query("personProfileMetadata")
    .withIndex("by_profile", q => q.eq("profileId", input.profileId)).first();
  if (metadata === null || !metadata.isPublic || metadata.packetDigest !== profile.packetDigest
    || metadata.revision !== profile.revision || metadata.username !== profile.username
    || metadata.handle !== profile.handle) throw new PublishError("BAD_REQUEST");
  let packet;
  try { packet = parsePublicProfileIndex(profile.packet); }
  catch { throw new PublishError("BAD_REQUEST"); }
  if (personIndexDigest(packet) !== profile.packetDigest || packet.subject.kind !== subject.kind
    || packet.subject.handle !== profile.handle
    || !input.sourceIds.every(id => packet.sources.some(source => source.id === id))) throw new PublishError("BAD_REQUEST");
  const priorEvents = await ctx.db.query("reviewedDecisionHistory")
    .withIndex("by_profile", q => q.eq("profileId", input.profileId)).take(MAX_REVIEW_EVENTS_PER_PROFILE + 1);
  if (priorEvents.length >= MAX_REVIEW_EVENTS_PER_PROFILE) throw new PublishError("LIMIT_EXCEEDED");
  const revision = (existing?.revision ?? 0) + 1;
  const binding = { profileId: input.profileId, key: input.key, kind: subject.kind,
    username: profile.username, handle: profile.handle, packetDigest: profile.packetDigest,
    profileRevision: profile.revision, revision };
  if (existing === null) await ctx.db.insert("reviewedBindings", binding);
  else await ctx.db.replace(existing._id, binding);
  return record(ctx, input, action, input.key, revision, input.sourceIds, input.profileId,
    action === "correct" ? (input as Correct).fromKey : undefined);
}

export async function bindReviewedSubject(ctx: WriteCtx, input: Bind) {
  return setReviewedBinding(ctx, input, "bind");
}

export async function correctReviewedBinding(ctx: WriteCtx, input: Correct) {
  return setReviewedBinding(ctx, input, "correct");
}

export async function unbindReviewedSubject(ctx: WriteCtx, input: Unbind) {
  if (!validReview(input) || !SUBJECT_KEY.test(input.key) || !Number.isSafeInteger(input.expectedRevision)
    || input.expectedRevision < 1) throw new PublishError("BAD_REQUEST");
  const prior = await replay(ctx, input);
  if (prior !== null) return prior;
  const existing = await ctx.db.query("reviewedBindings")
    .withIndex("by_profile", q => q.eq("profileId", input.profileId)).first();
  if (existing === null || existing.key !== input.key || existing.revision !== input.expectedRevision) throw new PublishError("BAD_REQUEST");
  const revision = existing.revision + 1;
  await ctx.db.patch(existing._id, { key: undefined, revision });
  return record(ctx, input, "unbind", input.key, revision, [], input.profileId);
}

export async function renameReviewedSubject(ctx: WriteCtx, input: Rename) {
  if (!validReview(input) || !SUBJECT_KEY.test(input.key) || !Number.isSafeInteger(input.expectedRevision)
    || input.expectedRevision < 1 || typeof input.label !== "string"
    || input.label.length < 2 || input.label.length > 200) throw new PublishError("BAD_REQUEST");
  const prior = await replay(ctx, input);
  if (prior !== null) return prior;
  const subject = await ctx.db.query("reviewedSubjects")
    .withIndex("by_key", q => q.eq("key", input.key)).first();
  if (subject === null || subject.revision !== input.expectedRevision || subject.aliases.length >= 16)
    throw new PublishError("BAD_REQUEST");
  const revision = subject.revision + 1;
  await ctx.db.patch(subject._id, { label: input.label,
    aliases: subject.label === input.label || subject.aliases.includes(subject.label)
      ? subject.aliases : [...subject.aliases, subject.label], revision, updatedAtMs: Date.now() });
  return record(ctx, input, "rename", input.key, revision);
}

export async function reviewedBindingForPublicProfile(ctx: ReadCtx, username: string, handle: string,
  packetDigest: string, revision: number): Promise<string | null> {
  if (parseUsernameSegment(username) !== username || !isPersonHandle(handle) || !HASH.test(packetDigest)
    || !Number.isSafeInteger(revision) || revision < 1 || !await isKnowledgeAvailable(ctx)) return null;
  const profile = await ctx.db.query("personProfiles")
    .withIndex("by_username_handle", q => q.eq("username", username).eq("handle", handle)).first();
  if (profile === null || profile.withdrawnAtMs !== undefined || profile.packetDigest !== packetDigest
    || profile.revision !== revision || profile.knowledgeProjectionVersion !== KNOWLEDGE_PROJECTION_VERSION) return null;
  const metadata = await ctx.db.query("personProfileMetadata")
    .withIndex("by_profile", q => q.eq("profileId", profile._id)).first();
  if (metadata === null || !metadata.isPublic || metadata.username !== username || metadata.handle !== handle
    || metadata.packetDigest !== packetDigest || metadata.revision !== revision) return null;
  try {
    const packet = parsePublicProfileIndex(profile.packet);
    if (personIndexDigest(packet) !== packetDigest || packet.subject.handle !== handle) return null;
  } catch { return null; }
  const binding = await ctx.db.query("reviewedBindings")
    .withIndex("by_profile", q => q.eq("profileId", profile._id)).first();
  if (binding?.key === undefined || binding.username !== username || binding.handle !== handle
    || binding.packetDigest !== packetDigest || binding.profileRevision !== revision) return null;
  const subject = await ctx.db.query("reviewedSubjects")
    .withIndex("by_key", q => q.eq("key", binding.key!)).first();
  return subject !== null && subject.kind === binding.kind ? binding.key : null;
}
