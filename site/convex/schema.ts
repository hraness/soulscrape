import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
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
    projectionVersion: v.optional(v.number()),
    publishedAtMs: v.number(),
    updatedAtMs: v.number(),
    withdrawnAtMs: v.optional(v.number()),
  })
    .index("by_owner_handle", ["accountId", "handle"])
    .index("by_username_handle", ["username", "handle"])
    .index("by_username", ["username"])
    .index("by_projection_version", ["projectionVersion"]),

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

  personAccountUsage: defineTable({
    accountId: v.string(),
    retainedProfiles: v.number(),
    packetBytes: v.number(),
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
