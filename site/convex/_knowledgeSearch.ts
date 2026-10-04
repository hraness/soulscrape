import { isPersonIndexCalendarDay, parsePublicProfileIndex, personIndexDigest, PERSON_INDEX_MAX_BODY_BYTES } from "../../skills/soulscrape/scripts/person-index";
import { parseUsernameSegment } from "../lib/routes";
import { PublishError } from "./_profileErrors";
import type { ReadCtx } from "./_profileStore";
import { isKnowledgeAvailable } from "./_knowledgeStore";

export const MAX_CANDIDATE_PAGE_SIZE = 20;
export const MAX_CANDIDATE_PAGE_BYTES = 512 * 1024;

export async function searchKnowledgeCandidates(ctx: ReadCtx, phrase: string, cursor: string | null,
  limit?: number, kind?: "person" | "organization" | "product", publisher?: string, sourceId?: string, asOf?: string) {
  if (typeof phrase !== "string" || phrase.length < 2 || phrase.length > 80 || phrase.trim() !== phrase
    || (cursor !== null && (typeof cursor !== "string" || cursor.length < 1 || cursor.length > 2048
      || /[\u0000-\u0020\u007f]/u.test(cursor)))
    || (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1 || limit > MAX_CANDIDATE_PAGE_SIZE))
    || (kind !== undefined && kind !== "person" && kind !== "organization" && kind !== "product")
    || (publisher !== undefined && parseUsernameSegment(publisher) !== publisher)
    || (sourceId !== undefined && (typeof sourceId !== "string" || !/^source-[a-f0-9]{20}$/u.test(sourceId)))
    || (asOf !== undefined && !isPersonIndexCalendarDay(asOf))) throw new PublishError("BAD_REQUEST");
  if (!await isKnowledgeAvailable(ctx)) throw new PublishError("PROJECTIONS_NOT_READY");
  const count = limit ?? MAX_CANDIDATE_PAGE_SIZE;
  const query = ctx.db.query("personProfileMetadata");
  const filtered = publisher === undefined
    ? query.withIndex("by_public", q => q.eq("isPublic", true))
    : query.withIndex("by_public", q => q.eq("isPublic", true).eq("username", publisher));
  const page = await filtered.paginate({ cursor, numItems: count, maximumRowsRead: count,
    maximumBytesRead: MAX_CANDIDATE_PAGE_BYTES });
  const needle = phrase.normalize("NFC").toLocaleLowerCase("en");
  const rows: Array<{ username: string; handle: string; displayName: string;
    subjectKind: "person" | "organization" | "product"; profileUrl: string; match: "label-suggestion" }> = [];
  for (const candidate of page.page) {
    if ((kind !== undefined && candidate.subjectKind !== kind)
      || !candidate.displayName.normalize("NFC").toLocaleLowerCase("en").includes(needle)
      || (candidate.subjectKind !== "person" && candidate.subjectKind !== "organization"
        && candidate.subjectKind !== "product")
      || ((sourceId !== undefined || asOf !== undefined)
        && (!Number.isSafeInteger(candidate.packetBytes) || candidate.packetBytes < 0
          || candidate.packetBytes > PERSON_INDEX_MAX_BODY_BYTES))) continue;
    const profile = await ctx.db.get(candidate.profileId);
    if (profile === null || profile.withdrawnAtMs !== undefined || profile.username !== candidate.username
      || profile.handle !== candidate.handle || profile.packetDigest !== candidate.packetDigest
      || profile.revision !== candidate.revision) continue;
    if (sourceId !== undefined || asOf !== undefined) {
      try {
        const packet = parsePublicProfileIndex(profile.packet);
        if (personIndexDigest(packet) !== candidate.packetDigest || packet.subject.handle !== candidate.handle
          || packet.subject.kind !== candidate.subjectKind
          || (sourceId !== undefined && !packet.sources.some(source => source.id === sourceId))
          || (asOf !== undefined && new Date(packet.scope.asOf).toISOString().slice(0, 10) !== asOf)) continue;
      } catch { continue; }
    }
    rows.push({ username: candidate.username, handle: candidate.handle, displayName: candidate.displayName,
      subjectKind: candidate.subjectKind, profileUrl: `https://soulscrape.com/${candidate.username}/${candidate.handle}`,
      match: "label-suggestion" });
  }
  return { rows, nextCursor: page.isDone ? null : page.continueCursor, isDone: page.isDone, snapshot: false };
}
