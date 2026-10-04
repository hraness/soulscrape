import { internalMutation, internalQuery, query } from "./_generated/server";
import { v } from "convex/values";
import { createReviewedSubject as createSubject, bindReviewedSubject as bindSubject,
  unbindReviewedSubject as unbindSubject, renameReviewedSubject as renameSubject,
  correctReviewedBinding as correctBinding, reviewedBindingForPublicProfile } from "./_identityStore";
import { activateKnowledge, activateKnowledgeSections as activateSections,
  backfillKnowledge, backfillKnowledgeSections as backfillSections,
  knowledgeStatus, knowledgeSectionsStatus as sectionsStatus } from "./_knowledgeMigration";
import { searchKnowledgeCandidates } from "./_knowledgeSearch";
import { areSectionSourcesAvailable, isKnowledgeAvailable, lookupKnowledgeMemberships } from "./_knowledgeStore";

export const searchCandidates = query({
  args: { phrase: v.string(), cursor: v.union(v.string(), v.null()), limit: v.optional(v.number()),
    kind: v.optional(v.union(v.literal("person"), v.literal("organization"), v.literal("product"))), publisher: v.optional(v.string()),
    sourceId: v.optional(v.string()), asOf: v.optional(v.string()) },
  handler: (ctx, args) => searchKnowledgeCandidates(ctx, args.phrase, args.cursor, args.limit, args.kind,
    args.publisher, args.sourceId, args.asOf),
});

export const lookupKnowledge = query({
  args: { key: v.string(), cursor: v.union(v.string(), v.null()), limit: v.optional(v.number()), publisher: v.optional(v.string()) },
  handler: (ctx, args) => lookupKnowledgeMemberships(ctx, args.key, args.cursor, args.limit, args.publisher),
});

export const knowledgeAvailable = query({ args: {}, handler: isKnowledgeAvailable });
export const sectionSourcesAvailable = query({ args: {}, handler: areSectionSourcesAvailable });
export const reviewedProfileKey = query({
  args: { username: v.string(), handle: v.string(), packetDigest: v.string(), revision: v.number() },
  handler: (ctx, args) => reviewedBindingForPublicProfile(ctx, args.username, args.handle, args.packetDigest, args.revision),
});

const review = { operationId: v.string(), reviewer: v.string(), reason: v.string() };
export const createReviewedSubject = internalMutation({
  args: { ...review, kind: v.union(v.literal("person"), v.literal("organization"), v.literal("product")), label: v.string() },
  handler: (ctx, args) => createSubject(ctx, args),
});
export const bindReviewedSubject = internalMutation({
  args: { ...review, profileId: v.id("personProfiles"), key: v.string(), expectedRevision: v.number(),
    expectedProfileRevision: v.number(), expectedPacketDigest: v.string(), sourceIds: v.array(v.string()) },
  handler: (ctx, args) => bindSubject(ctx, args),
});
export const correctReviewedBinding = internalMutation({
  args: { ...review, profileId: v.id("personProfiles"), fromKey: v.string(), key: v.string(),
    expectedRevision: v.number(), expectedProfileRevision: v.number(), expectedPacketDigest: v.string(),
    sourceIds: v.array(v.string()) },
  handler: (ctx, args) => correctBinding(ctx, args),
});
export const unbindReviewedSubject = internalMutation({
  args: { ...review, profileId: v.id("personProfiles"), key: v.string(), expectedRevision: v.number() },
  handler: (ctx, args) => unbindSubject(ctx, args),
});
export const renameReviewedSubject = internalMutation({
  args: { ...review, key: v.string(), expectedRevision: v.number(), label: v.string() },
  handler: (ctx, args) => renameSubject(ctx, args),
});

export const backfillKnowledgeIndex = internalMutation({ args: {}, handler: backfillKnowledge });
export const knowledgeIndexStatus = internalQuery({ args: {}, handler: knowledgeStatus });
export const activateKnowledgeIndex = internalMutation({ args: {}, handler: activateKnowledge });
export const backfillKnowledgeSections = internalMutation({ args: {}, handler: backfillSections });
export const knowledgeSectionsStatus = internalQuery({ args: {}, handler: sectionsStatus });
export const activateKnowledgeSections = internalMutation({ args: {}, handler: activateSections });
