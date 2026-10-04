import { dossierSectionDigest, parseDossierSection } from "../../skills/soulscrape/scripts/dossier-section";
import { parsePublicProfileIndex, personIndexDigest } from "../../skills/soulscrape/scripts/person-index";
import { PublishError } from "./_profileErrors";
import { requireReady, type ReadCtx, type WriteCtx } from "./_profileStore";
import {
  KNOWLEDGE_BACKFILL_BATCH_SIZE, KNOWLEDGE_BACKFILL_READ_BYTES,
  KNOWLEDGE_PROJECTION_VERSION, knowledgeState, writeKnowledgeProjection, writeSectionKnowledgeProjection,
} from "./_knowledgeStore";

async function hasUnprojectedRows(ctx: ReadCtx) {
  return await ctx.db.query("personProfiles")
    .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).first() !== null;
}

export async function backfillKnowledge(ctx: WriteCtx) {
  await requireReady(ctx, true);
  let state = await knowledgeState(ctx);
  if (state?.ready === true && !await hasUnprojectedRows(ctx)) {
    return { processed: 0, totalProcessed: state.processed, ready: true };
  }
  if (state === null) {
    const id = await ctx.db.insert("knowledgeProjectionState", {
      version: KNOWLEDGE_PROJECTION_VERSION, cursor: null, ready: false, processed: 0,
    });
    state = await ctx.db.get(id);
  }
  if (state === null) throw new PublishError("PROJECTIONS_NOT_READY");
  const cursor = state.ready ? null : state.cursor;
  const result = await ctx.db.query("personProfiles").paginate({ cursor, numItems: KNOWLEDGE_BACKFILL_BATCH_SIZE,
    maximumRowsRead: KNOWLEDGE_BACKFILL_BATCH_SIZE, maximumBytesRead: KNOWLEDGE_BACKFILL_READ_BYTES });
  let processed = 0;
  for (const row of result.page) {
    if (row.knowledgeProjectionVersion === KNOWLEDGE_PROJECTION_VERSION) continue;
    await writeKnowledgeProjection(ctx, row._id, row);
    processed++;
  }
  const missing = result.isDone ? await hasUnprojectedRows(ctx) : true;
  const ready = result.isDone && !missing;
  const totalProcessed = state.processed + processed;
  await ctx.db.patch(state._id, { cursor: result.isDone ? null : result.continueCursor, ready, processed: totalProcessed });
  return { processed, totalProcessed, ready };
}

async function hasUnprojectedSections(ctx: ReadCtx) {
  return await ctx.db.query("dossierSectionHeads")
    .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).first() !== null;
}

export async function knowledgeSectionsStatus(ctx: ReadCtx) {
  const state = await knowledgeState(ctx);
  const base = await knowledgeStatus(ctx);
  const hasUnprojectedRows = await hasUnprojectedSections(ctx);
  return { ready: base.ready && state?.sectionSourcesReady === true && !hasUnprojectedRows,
    activated: state?.sectionSourcesActivated === true, processed: state?.sectionSourcesProcessed ?? 0,
    hasUnprojectedRows };
}

export async function backfillKnowledgeSections(ctx: WriteCtx) {
  await requireReady(ctx, true);
  const state = await knowledgeState(ctx);
  if (state === null || !(await knowledgeStatus(ctx)).ready) throw new PublishError("PROJECTIONS_NOT_READY");
  const heads = await ctx.db.query("dossierSectionHeads")
    .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).take(2);
  for (const head of heads) {
    const profile = await ctx.db.get(head.profileId);
    const document = await ctx.db.get(head.documentId);
    if (profile === null || document === null || document.profileId !== head.profileId
      || document.sectionId !== head.sectionId || document.packetDigest !== head.packetDigest
      || document.profileRevision !== head.profileRevision || document.documentDigest !== head.documentDigest)
      throw new PublishError("PROJECTIONS_NOT_READY");
    let section;
    try {
      const packet = parsePublicProfileIndex(profile.packet);
      section = parseDossierSection(document.document);
      if (personIndexDigest(packet) !== profile.packetDigest
        || section.id !== head.sectionId || section.title !== head.title || section.packetDigest !== head.packetDigest
        || section.profileRevision !== head.profileRevision || dossierSectionDigest(section) !== head.documentDigest
        || (profile.packetDigest === head.packetDigest && profile.revision === head.profileRevision
          && section.subjectKind !== packet.subject.kind)) throw new Error("Section projection source mismatch");
    } catch { throw new PublishError("PROJECTIONS_NOT_READY"); }
    if (profile.packetDigest === head.packetDigest && profile.revision === head.profileRevision) {
      await writeSectionKnowledgeProjection(ctx, head.profileId, section, head.documentDigest);
    }
    await ctx.db.patch(head._id, { knowledgeProjectionVersion: KNOWLEDGE_PROJECTION_VERSION });
  }
  const ready = !(await hasUnprojectedSections(ctx));
  const totalProcessed = (state.sectionSourcesProcessed ?? 0) + heads.length;
  if (heads.length > 0 || state.sectionSourcesReady !== ready) {
    await ctx.db.patch(state._id, { sectionSourcesReady: ready, sectionSourcesProcessed: totalProcessed });
  }
  return { processed: heads.length, totalProcessed, ready };
}

export async function activateKnowledgeSections(ctx: WriteCtx) {
  await requireReady(ctx, true);
  const state = await knowledgeState(ctx);
  const current = await knowledgeSectionsStatus(ctx);
  if (state === null || !current.ready || !(await knowledgeStatus(ctx)).activated)
    throw new PublishError("PROJECTIONS_NOT_READY");
  if (state.sectionSourcesActivated !== true) await ctx.db.patch(state._id, { sectionSourcesActivated: true });
  return { ready: true, activated: true };
}

export async function knowledgeStatus(ctx: ReadCtx) {
  const state = await knowledgeState(ctx);
  const hasUnprojectedRows = await ctx.db.query("personProfiles")
    .withIndex("by_knowledge_version", q => q.eq("knowledgeProjectionVersion", undefined)).first() !== null;
  return { ready: state?.ready === true && !hasUnprojectedRows, activated: state?.activated === true,
    processed: state?.processed ?? 0, hasUnprojectedRows };
}

export async function activateKnowledge(ctx: WriteCtx) {
  await requireReady(ctx, true);
  const state = await knowledgeState(ctx);
  const current = await knowledgeStatus(ctx);
  if (state === null || !current.ready) throw new PublishError("PROJECTIONS_NOT_READY");
  if (state.activated !== true) await ctx.db.patch(state._id, { activated: true });
  return { ready: true, activated: true };
}
