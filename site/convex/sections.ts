import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getPublicDossierSection, listPublicDossierSections, publishDossierSection } from "./_sectionStore";

export const publish = mutation({
  args: { token: v.string(), section: v.any() },
  handler: (ctx, args) => publishDossierSection(ctx, args.token, args.section),
});

export const getPublic = query({
  args: { username: v.string(), handle: v.string(), sectionId: v.string() },
  handler: (ctx, args) => getPublicDossierSection(ctx, args.username, args.handle, args.sectionId),
});

export const listPublic = query({
  args: { username: v.string(), handle: v.string() },
  handler: (ctx, args) => listPublicDossierSections(ctx, args.username, args.handle),
});
