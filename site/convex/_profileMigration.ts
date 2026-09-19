import { PublishError } from "./_profileErrors";
import { accountUsage, writeProjection, type ReadCtx, type WriteCtx } from "./_profileStore";
import { BACKFILL_BATCH_SIZE, BACKFILL_READ_BYTES, PROJECTION_VERSION, PUBLISH_BURST } from "./_profiles";

/**
 * Operator-driven additive migration. Source packets are retained. A source
 * marker, both projections and account totals commit together, so retries never
 * double-count. Changed publishes stay blocked until indexed coverage passes.
 */
export async function backfill(ctx: WriteCtx) {
  let state = await ctx.db.query("personProjectionState")
    .withIndex("by_version", q => q.eq("version", PROJECTION_VERSION)).first();
  if (state?.ready === true) return { processed: 0, totalProcessed: state.processed, ready: true };
  if (state === null) {
    const id = await ctx.db.insert("personProjectionState", { version: PROJECTION_VERSION, cursor: null, ready: false, processed: 0 });
    state = await ctx.db.get(id);
  }
  if (state === null) throw new Error("projection state insertion failed");
  const result = await ctx.db.query("personProfiles").paginate({
    cursor: state.cursor, numItems: BACKFILL_BATCH_SIZE,
    maximumRowsRead: BACKFILL_BATCH_SIZE, maximumBytesRead: BACKFILL_READ_BYTES,
  });
  let processed = 0;
  for (const row of result.page) {
    if (row.projectionVersion === PROJECTION_VERSION) continue;
    const metadata = await writeProjection(ctx, row._id, row);
    const usage = await accountUsage(ctx, row.accountId);
    if (usage === null) {
      await ctx.db.insert("personAccountUsage", {
        accountId: row.accountId, retainedProfiles: 1, packetBytes: metadata.packetBytes,
        publishTokens: PUBLISH_BURST, refilledAtMs: Date.now(),
      });
    } else {
      await ctx.db.patch(usage._id, {
        retainedProfiles: usage.retainedProfiles + 1, packetBytes: usage.packetBytes + metadata.packetBytes,
      });
    }
    await ctx.db.patch(row._id, { projectionVersion: PROJECTION_VERSION });
    processed++;
  }
  const missing = result.isDone
    ? await ctx.db.query("personProfiles").withIndex("by_projection_version", q => q.eq("projectionVersion", undefined)).first()
    : true;
  const ready = result.isDone && missing === null;
  const totalProcessed = state.processed + processed;
  await ctx.db.patch(state._id, { cursor: result.isDone ? null : result.continueCursor, ready, processed: totalProcessed });
  return { processed, totalProcessed, ready };
}

/** Deployment gate: the indexed check reads at most one unprojected source. */
export async function status(ctx: ReadCtx) {
  const state = await ctx.db.query("personProjectionState")
    .withIndex("by_version", q => q.eq("version", PROJECTION_VERSION)).first();
  const missing = await ctx.db.query("personProfiles")
    .withIndex("by_projection_version", q => q.eq("projectionVersion", undefined)).first();
  return { ready: state?.ready === true && missing === null, activated: state?.activated === true, processed: state?.processed ?? 0, hasUnprojectedRows: missing !== null };
}

/** Explicit cutover only after the final indexed coverage check. */
export async function activate(ctx: WriteCtx) {
  const coverage = await status(ctx);
  if (!coverage.ready) throw new PublishError("PROJECTIONS_NOT_READY");
  const state = await ctx.db.query("personProjectionState")
    .withIndex("by_version", q => q.eq("version", PROJECTION_VERSION)).first();
  if (state === null) throw new PublishError("PROJECTIONS_NOT_READY");
  if (state.activated !== true) await ctx.db.patch(state._id, { activated: true });
  return { ready: true, activated: true };
}
