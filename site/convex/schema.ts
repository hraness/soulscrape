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
    .index("by_secretDigest", ["secretDigest"]),

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
    .index("by_account", ["accountId"]),

  personProfiles: defineTable({
    accountId: v.string(),
    username: v.string(),
    handle: v.string(),
    displayName: v.string(),
    summary: v.string(),
    packetDigest: v.string(),
    revision: v.number(),
    packet: v.any(),
    publishedAtMs: v.number(),
    updatedAtMs: v.number(),
    withdrawnAtMs: v.optional(v.number()),
  })
    .index("by_owner_handle", ["accountId", "handle"])
    .index("by_username_handle", ["username", "handle"])
    .index("by_username", ["username"]),
});
