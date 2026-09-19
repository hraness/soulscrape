import { isPersonHandle } from "../../skills/soulscrape/scripts/person-index";
import type { PublicProfileGraphRow } from "./corpus-graph";

const MAX_PAGES = 8;
const MAX_ROWS = 200;
const MAX_CONTEXT_BYTES = 16 * 1024 * 1024;
type Row = Record<string, unknown>;
type ReadPage = (args: { username: string; cursor: string | null }) => Promise<unknown>;

function record(value: unknown): value is Row {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function handle(value: unknown): value is string {
  return typeof value === "string" && isPersonHandle(value);
}

function optionalStrings(row: Row, keys: readonly string[]): boolean {
  return keys.every(key => row[key] === undefined || typeof row[key] === "string");
}

function sourceIds(row: Row): boolean {
  return row.sourceIds === undefined || (Array.isArray(row.sourceIds) && row.sourceIds.length <= 24 && row.sourceIds.every(id => typeof id === "string"));
}

function relatedRow(value: unknown, username: string): value is PublicProfileGraphRow {
  if (!record(value) || value.username !== username || !handle(value.handle) || typeof value.displayName !== "string"
    || !optionalStrings(value, ["subjectKind", "wikidataId"])) return false;
  if (!Array.isArray(value.relations) || value.relations.length > 200 || !value.relations.every(row =>
    record(row) && handle(row.target) && typeof row.kind === "string" && sourceIds(row)
    && optionalStrings(row, ["id", "note", "start", "end", "targetWikidataId", "targetKind", "targetName"]))) return false;
  if (value.timeline !== undefined && (!Array.isArray(value.timeline) || value.timeline.length > 200 || !value.timeline.every(row =>
    record(row) && handle(row.organizationHandle) && typeof row.kind === "string" && typeof row.date === "string"
    && typeof row.title === "string" && sourceIds(row) && optionalStrings(row, ["id", "end", "organization"])))) return false;
  if (value.appearances !== undefined && (!Array.isArray(value.appearances) || value.appearances.length > 200 || !value.appearances.every(row =>
    record(row) && typeof row.title === "string" && optionalStrings(row, ["id", "publishedAt"]) && sourceIds(row)
    && Array.isArray(row.participantHandles) && row.participantHandles.length <= 12 && row.participantHandles.every(participant =>
      record(participant) && typeof participant.name === "string" && handle(participant.handle))))) return false;
  return true;
}

/** Incomplete ancillary context must never authorize identity joins or hide the dossier. */
export async function loadRelatedProfiles(username: string, readPage: ReadPage): Promise<PublicProfileGraphRow[] | null> {
  const rows: PublicProfileGraphRow[] = [];
  const cursors = new Set<string>();
  const handles = new Set<string>();
  let cursor: string | null = null;
  let generation: number | null = null;
  let bytes = 0;
  try {
    for (let pageNumber = 0; pageNumber < MAX_PAGES; pageNumber++) {
      const page = await readPage({ username, cursor });
      if (!record(page) || !Array.isArray(page.rows) || page.rows.length > 25 || typeof page.isDone !== "boolean"
        || rows.length + page.rows.length > MAX_ROWS) return null;
      if (typeof page.generation !== "number" || !Number.isSafeInteger(page.generation) || page.generation < 0
        || (generation !== null && generation !== page.generation)) return null;
      generation = page.generation;
      if (page.isDone ? page.nextCursor !== null : typeof page.nextCursor !== "string" || page.nextCursor.length === 0
        || page.nextCursor.length > 2048 || /[\u0000-\u0020\u007f]/u.test(page.nextCursor) || cursors.has(page.nextCursor)) return null;
      bytes += new TextEncoder().encode(JSON.stringify(page.rows)).byteLength;
      if (bytes > MAX_CONTEXT_BYTES) return null;
      for (const row of page.rows) {
        // Reject the whole context: dropping invalid or repeated rows could invent uniqueness.
        if (!relatedRow(row, username) || handles.has(row.handle)) return null;
        handles.add(row.handle);
        rows.push(row);
      }
      if (page.isDone) return rows;
      cursor = page.nextCursor as string;
      cursors.add(cursor);
    }
  } catch {
    // This read only adds navigation. The authoritative profile read has its own error path.
  }
  return null;
}
