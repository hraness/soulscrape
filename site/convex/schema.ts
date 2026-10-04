import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Lazily created by devices.start; the literal indexed key is shared by all
  // callers. Transaction conflicts serialize concurrent first-use/updates.
  deviceStartAdmission: defineTable({
    scope: v.literal("global"),
    tokens: v.number(),
    refilledAtMs: v.number(),
  }).index("by_scope", ["scope"]),

  deviceCodes: defineTable({
    codeDigest: v.string(),
    secretDigest: v.string(),
    deviceName: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("authorized"),
      v.literal("consumed"),
      v.literal("expired"),
    ),
    accountId: v.optional(v.string()),
    username: v.optional(v.string()),
    expiresAtMs: v.number(),
    createdAtMs: v.number(),
  })
    .index("by_codeDigest", ["codeDigest"])
    .index("by_secretDigest", ["secretDigest"])
    .index("by_status_expiresAtMs", ["status", "expiresAtMs"])
    .index("by_expiresAtMs", ["expiresAtMs"]),

  publishCredentials: defineTable({
    tokenDigest: v.string(),
    accountId: v.string(),
    username: v.string(),
    deviceName: v.string(),
    createdAtMs: v.number(),
    lastUsedAtMs: v.optional(v.number()),
    revokedAtMs: v.optional(v.number()),
  })
    .index("by_tokenDigest", ["tokenDigest"])
    .index("by_account", ["accountId"])
    .index("by_account_revoked", ["accountId", "revokedAtMs"])
    .index("by_revokedAtMs", ["revokedAtMs"]),

  personProfiles: defineTable({
    accountId: v.string(),
    username: v.string(),
    handle: v.string(),
    displayName: v.string(),
    summary: v.string(),
    packetDigest: v.string(),
    revision: v.number(),
    packet: v.any(),
    sectionDocumentCount: v.optional(v.number()),
    projectionVersion: v.optional(v.number()),
    knowledgeProjectionVersion: v.optional(v.number()),
    sectionSourceMembershipCount: v.optional(v.number()),
    publishedAtMs: v.number(),
    updatedAtMs: v.number(),
    withdrawnAtMs: v.optional(v.number()),
  })
    .index("by_owner_handle", ["accountId", "handle"])
    .index("by_username_handle", ["username", "handle"])
    .index("by_username", ["username"])
    .index("by_projection_version", ["projectionVersion"])
    .index("by_knowledge_version", ["knowledgeProjectionVersion"]),

  personProfileMetadata: defineTable({
    profileId: v.id("personProfiles"),
    accountId: v.string(),
    username: v.string(),
    handle: v.string(),
    displayName: v.string(),
    summary: v.string(),
    subjectKind: v.optional(v.string()),
    wikidataId: v.optional(v.string()),
    packetDigest: v.string(),
    revision: v.number(),
    packetBytes: v.number(),
    graphBytes: v.number(),
    publishedAtMs: v.number(),
    updatedAtMs: v.number(),
    isPublic: v.boolean(),
  })
    .index("by_profile", ["profileId"])
    .index("by_owner_handle", ["accountId", "handle"])
    .index("by_username_handle", ["username", "handle"])
    .index("by_public", ["isPublic", "username", "handle"]),

  personProfileGraph: defineTable({
    profileId: v.id("personProfiles"),
    username: v.string(),
    isPublic: v.boolean(),
    projection: v.any(),
  })
    .index("by_profile", ["profileId"])
    .index("by_username_public", ["username", "isPublic"])
    .index("by_public", ["isPublic"]),

  knowledgeMemberships: defineTable({
    profileId: v.id("personProfiles"),
    key: v.string(),
    role: v.union(v.literal("primary"), v.literal("reference"), v.literal("citation"), v.literal("section_citation")),
    sectionId: v.optional(v.string()),
    sectionDigest: v.optional(v.string()),
    username: v.string(),
    handle: v.string(),
    packetDigest: v.string(),
    revision: v.number(),
    subjectKind: v.optional(v.union(v.literal("person"), v.literal("organization"), v.literal("product"), v.literal("unknown"))),
    sourceId: v.optional(v.string()),
    targetName: v.optional(v.string()),
    targetHandle: v.optional(v.string()),
    recordId: v.optional(v.string()),
    relationKind: v.optional(v.string()),
    origin: v.optional(v.union(v.literal("relation"), v.literal("timeline"), v.literal("appearance"))),
    sourceIds: v.optional(v.array(v.string())),
  })
    .index("by_profile", ["profileId"])
    .index("by_profile_section", ["profileId", "sectionId"])
    .index("by_key", ["key"])
    .index("by_key_section", ["key", "sectionId"])
    .index("by_key_username", ["key", "username"])
    .index("by_key_username_section", ["key", "username", "sectionId"]),

  knowledgeProjectionState: defineTable({
    version: v.number(),
    cursor: v.union(v.string(), v.null()),
    ready: v.boolean(),
    activated: v.optional(v.boolean()),
    processed: v.number(),
    sectionSourcesReady: v.optional(v.boolean()),
    sectionSourcesActivated: v.optional(v.boolean()),
    sectionSourcesProcessed: v.optional(v.number()),
  }).index("by_version", ["version"]),

  dossierSectionDocuments: defineTable({
    profileId: v.id("personProfiles"),
    sectionId: v.string(),
    packetDigest: v.string(),
    profileRevision: v.number(),
    documentDigest: v.string(),
    document: v.any(),
    publishedAtMs: v.number(),
  }).index("by_profile", ["profileId"])
    .index("by_profile_section_digest", ["profileId", "sectionId", "documentDigest"]),

  dossierSectionHeads: defineTable({
    profileId: v.id("personProfiles"),
    sectionId: v.string(),
    title: v.string(),
    packetDigest: v.string(),
    profileRevision: v.number(),
    documentId: v.id("dossierSectionDocuments"),
    documentDigest: v.string(),
    knowledgeProjectionVersion: v.optional(v.number()),
    updatedAtMs: v.number(),
  }).index("by_profile", ["profileId"])
    .index("by_profile_section", ["profileId", "sectionId"])
    .index("by_knowledge_version", ["knowledgeProjectionVersion"]),

  reviewedSubjects: defineTable({
    key: v.string(),
    kind: v.union(v.literal("person"), v.literal("organization"), v.literal("product")),
    label: v.string(),
    aliases: v.array(v.string()),
    revision: v.number(),
    createdAtMs: v.number(),
    updatedAtMs: v.number(),
  }).index("by_key", ["key"]),

  reviewedBindings: defineTable({
    profileId: v.id("personProfiles"),
    key: v.optional(v.string()),
    kind: v.union(v.literal("person"), v.literal("organization"), v.literal("product")),
    username: v.string(),
    handle: v.string(),
    packetDigest: v.string(),
    profileRevision: v.number(),
    revision: v.number(),
  })
    .index("by_profile", ["profileId"])
    .index("by_key", ["key"])
    .index("by_key_username", ["key", "username"]),

  reviewedDecisionHistory: defineTable({
    operationId: v.string(),
    inputDigest: v.string(),
    action: v.union(v.literal("create"), v.literal("bind"), v.literal("correct"), v.literal("unbind"), v.literal("rename")),
    key: v.string(),
    previousKey: v.optional(v.string()),
    profileId: v.optional(v.id("personProfiles")),
    revision: v.number(),
    reviewer: v.string(),
    reason: v.string(),
    sourceIds: v.array(v.string()),
    atMs: v.number(),
  })
    .index("by_operation", ["operationId"])
    .index("by_profile", ["profileId"]),

  personAccountUsage: defineTable({
    accountId: v.string(),
    retainedProfiles: v.number(),
    packetBytes: v.number(),
    sectionBytes: v.optional(v.number()),
    sectionDocumentCount: v.optional(v.number()),
    publishTokens: v.number(),
    refilledAtMs: v.number(),
  }).index("by_account", ["accountId"]),

  personPublisherVersions: defineTable({
    username: v.string(),
    generation: v.number(),
  }).index("by_username", ["username"]),

  personProjectionState: defineTable({
    version: v.number(),
    cursor: v.union(v.string(), v.null()),
    ready: v.boolean(),
    activated: v.optional(v.boolean()),
    processed: v.number(),
  }).index("by_version", ["version"]),
});
