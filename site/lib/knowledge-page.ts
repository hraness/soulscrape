import { isEntityHandle, parseSoulscrapeProfileUrl } from "../../skills/soulscrape/scripts/people-ontology";
import { comparePersonIndexDateTimes } from "../../skills/soulscrape/scripts/person-index";

type Row = Record<string, unknown>;
export type KnowledgeKind = "subjects" | "sources";
export type KnowledgeClaimPreview = Readonly<{
  id: string; kind: "fact" | "stated_belief" | "pattern" | "speculation";
  text: string; sourceIds: readonly string[];
}>;
export type KnowledgeSourcePreview = Readonly<{
  id: string; title: string; url: string; publisher: string; accessedAt: string;
  binding: string; mediaType: string; publishedAt?: string;
}>;
export type KnowledgeSectionSourcePreview = Readonly<{
  id: string; originalId: string; title: string; url: string; publisher: string; type: string;
  published: Readonly<{ text: string; precision: "day" | "month" | "year" | "decade" | "approximate" | "unknown" }>;
  accessedAt?: string;
}>;
export type KnowledgePageRow = Readonly<{
  key: string; role: "primary" | "reference" | "citation" | "section_citation";
  username: string; handle: string; profileUrl: string;
  displayName: string; summary: string; packetDigest: string; revision: number;
  subjectKind?: "person" | "organization" | "product" | "unknown";
  asOf?: string; claimCount?: number; claims?: readonly KnowledgeClaimPreview[];
  sourceId?: string; sourceOrdinal?: number; source?: KnowledgeSourcePreview;
  sectionId?: string; sectionDigest?: string; sectionTitle?: string; sectionSource?: KnowledgeSectionSourcePreview;
  targetName?: string; targetHandle?: string;
  recordId?: string; relationKind?: string; origin?: "relation" | "timeline" | "appearance";
  sourceIds?: readonly string[];
}>;
export type KnowledgePage = Readonly<{
  rows: readonly KnowledgePageRow[]; nextCursor: string | null; isDone: boolean; snapshot: false;
  reviewed?: Readonly<{ kind: "person" | "organization" | "product"; label: string; revision: number }>;
  sectionSourcesReady?: boolean;
}>;

const HASH = /^[0-9a-f]{64}$/u;
const SOURCE_ID = /^source-[0-9a-f]{20}$/u;
const DATE = /^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2}))?)?$/u;
const RECORD_ID = /^[a-z][a-z0-9-]{1,80}$/u;

function instant(value: unknown): value is string {
  if (!text(value, 100)) return false;
  try { comparePersonIndexDateTimes(value, value); return true; }
  catch { return false; }
}

function partialDate(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = DATE.exec(value);
  if (match === null) return false;
  const year = Number(match[1]);
  const month = match[2] === undefined ? undefined : Number(match[2]);
  const day = match[3] === undefined ? undefined : Number(match[3]);
  if (year < 1 || month !== undefined && (month < 1 || month > 12)) return false;
  if (day === undefined) return true;
  if (month === undefined) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return day >= 1 && day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]!;
}

function record(value: unknown): value is Row {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function onlyKeys(value: Row, required: readonly string[], optional: readonly string[] = []): boolean {
  return required.every(key => Object.hasOwn(value, key))
    && Object.keys(value).every(key => required.includes(key) || optional.includes(key));
}
function text(value: unknown, maximum: number, minimum = 1): value is string {
  return typeof value === "string" && value.length >= minimum && value.length <= maximum;
}
function cursor(value: unknown): value is string {
  return text(value, 2048) && !/[\u0000-\u0020\u007f]/u.test(value);
}

export function parseKnowledgeRoute(kind: unknown, key: unknown): { kind: KnowledgeKind; key: string } | null {
  if ((kind !== "subjects" && kind !== "sources") || typeof key !== "string") return null;
  const prefix = kind === "subjects" ? "subject-" : "resource-";
  return key.length === prefix.length + 64 && key.startsWith(prefix) && HASH.test(key.slice(prefix.length))
    ? { kind, key } : null;
}

function sourcePreview(value: unknown, sourceId: string): KnowledgeSourcePreview | null {
  if (!record(value) || !onlyKeys(value,
    ["id", "title", "url", "publisher", "accessedAt", "binding", "mediaType"], ["publishedAt"])
    || value.id !== sourceId || !text(value.title, 500) || !text(value.url, 2048)
    || !text(value.publisher, 200) || !instant(value.accessedAt) || !text(value.binding, 32)
    || !text(value.mediaType, 32)
    || (value.publishedAt !== undefined && !partialDate(value.publishedAt))) return null;
  try {
    const address = new URL(value.url);
    if (!/^https?:$/u.test(address.protocol) || address.username || address.password) return null;
  } catch { return null; }
  return {
    id: value.id, title: value.title, url: value.url, publisher: value.publisher,
    accessedAt: value.accessedAt, binding: value.binding, mediaType: value.mediaType,
    ...(value.publishedAt === undefined ? {} : { publishedAt: value.publishedAt }),
  };
}

function sectionSourcePreview(value: unknown, sourceId: string): value is KnowledgeSectionSourcePreview {
  if (!record(value) || !onlyKeys(value,
    ["id", "originalId", "title", "url", "publisher", "published", "type"], ["accessedAt"])
    || value.id !== sourceId || !text(value.originalId, 160) || !text(value.title, 500)
    || !text(value.url, 2048) || !text(value.publisher, 200)
    || !text(value.type, 80, 2) || !/^[a-z][a-z0-9-]+$/u.test(value.type)
    || (value.accessedAt !== undefined && !instant(value.accessedAt))
    || !record(value.published) || !onlyKeys(value.published, ["text", "precision"])
    || !text(value.published.text, 80)) return false;
  const { text: dateText, precision } = value.published;
  if (precision === "year" && !/^\d{4}$/u.test(dateText)
    || precision === "month" && !/^\d{4}-\d{2}$/u.test(dateText)
    || precision === "day" && !/^\d{4}-\d{2}-\d{2}$/u.test(dateText)
    || precision === "decade" && !/^\d{3}0s$/u.test(dateText)
    || !["day", "month", "year", "decade", "approximate", "unknown"].includes(precision as string)
    || (precision === "year" || precision === "month" || precision === "day") && !partialDate(dateText)) return false;
  try {
    const address = new URL(value.url);
    return /^https?:$/u.test(address.protocol) && !address.username && !address.password;
  } catch { return false; }
}

function claimPreview(value: unknown): value is KnowledgeClaimPreview {
  return record(value) && onlyKeys(value, ["id", "kind", "text", "sourceIds"])
    && text(value.id, 90) && /^claim-[a-z0-9-]+$/u.test(value.id)
    && (value.kind === "fact" || value.kind === "stated_belief" || value.kind === "pattern" || value.kind === "speculation")
    && text(value.text, 2000) && Array.isArray(value.sourceIds)
    && value.sourceIds.length >= 1 && value.sourceIds.length <= 24
    && value.sourceIds.every((id: unknown) => typeof id === "string" && SOURCE_ID.test(id));
}

function row(value: unknown, key: string): KnowledgePageRow | null {
  if (!record(value) || !onlyKeys(value,
    ["key", "role", "username", "handle", "profileUrl", "displayName", "summary", "packetDigest", "revision"],
    ["subjectKind", "asOf", "claimCount", "claims", "sourceId", "sourceOrdinal", "source",
      "sectionId", "sectionDigest", "sectionTitle", "sectionSource", "targetName", "targetHandle",
      "recordId", "relationKind", "origin", "sourceIds"])
    || value.key !== key || !text(value.displayName, 200) || !text(value.summary, 600)
    || !text(value.packetDigest, 64) || !HASH.test(value.packetDigest)
    || typeof value.revision !== "number" || !Number.isSafeInteger(value.revision) || value.revision < 1) return null;
  const locator = parseSoulscrapeProfileUrl(value.profileUrl);
  if (locator === null || locator.username !== value.username || locator.handle !== value.handle) return null;
  const kind = key.startsWith("subject-") ? "subjects" : "sources";
  if (value.role === "primary" && kind === "subjects") {
    if (value.subjectKind !== "person" && value.subjectKind !== "organization" && value.subjectKind !== "product"
      || !instant(value.asOf)
      || typeof value.claimCount !== "number" || !Number.isSafeInteger(value.claimCount)
      || value.claimCount < 0 || value.claimCount > 500
      || !Array.isArray(value.claims) || value.claims.length !== Math.min(8, value.claimCount)
      || !value.claims.every(claimPreview)
      || new Set(value.claims.map((claim: KnowledgeClaimPreview) => claim.id)).size !== value.claims.length) return null;
    if (["sourceId", "sourceOrdinal", "source", "sectionId", "sectionDigest", "sectionTitle", "sectionSource",
      "recordId", "targetName", "targetHandle", "relationKind", "origin", "sourceIds"]
      .some(field => Object.hasOwn(value, field))) return null;
  } else if (value.role === "reference" && kind === "subjects") {
    if (value.subjectKind !== "person" && value.subjectKind !== "organization"
      && value.subjectKind !== "product" && value.subjectKind !== "unknown") return null;
    if (!text(value.recordId, 85) || !RECORD_ID.test(value.recordId)
      || !text(value.relationKind, 40) || !text(value.targetHandle, 64) || !isEntityHandle(value.targetHandle)
      || (value.targetName !== undefined && !text(value.targetName, 200))
      || (value.origin !== "relation" && value.origin !== "timeline" && value.origin !== "appearance")
      || !Array.isArray(value.sourceIds) || value.sourceIds.length < 1 || value.sourceIds.length > 24
      || !value.sourceIds.every((id: unknown) => typeof id === "string" && SOURCE_ID.test(id))
      || ["source", "sourceId", "sourceOrdinal", "sectionId", "sectionDigest", "sectionTitle", "sectionSource",
        "asOf", "claimCount", "claims"].some(field => Object.hasOwn(value, field))) return null;
  } else if (value.role === "citation" && kind === "sources") {
    if (typeof value.sourceId !== "string" || !SOURCE_ID.test(value.sourceId)
      || typeof value.sourceOrdinal !== "number" || !Number.isSafeInteger(value.sourceOrdinal)
      || value.sourceOrdinal < 1 || value.sourceOrdinal > 400
      || ["subjectKind", "asOf", "claimCount", "claims", "recordId", "targetName", "targetHandle",
        "relationKind", "origin", "sourceIds", "sectionId", "sectionDigest", "sectionTitle", "sectionSource"]
        .some(field => Object.hasOwn(value, field))) return null;
    if (sourcePreview(value.source, value.sourceId) === null) return null;
  } else if (value.role === "section_citation" && kind === "sources") {
    if (typeof value.sourceId !== "string" || !SOURCE_ID.test(value.sourceId)
      || !text(value.sectionId, 80, 2) || !/^[a-z][a-z0-9-]{1,79}$/u.test(value.sectionId)
      || !text(value.sectionDigest, 64) || !HASH.test(value.sectionDigest)
      || !text(value.sectionTitle, 200) || !sectionSourcePreview(value.sectionSource, value.sourceId)
      || ["subjectKind", "asOf", "claimCount", "claims", "recordId", "targetName", "targetHandle",
        "relationKind", "origin", "sourceIds", "source", "sourceOrdinal"].some(field => Object.hasOwn(value, field))) return null;
  } else return null;
  return value as KnowledgePageRow;
}

export function parseKnowledgePage(value: unknown, key: string): KnowledgePage | null {
  if (parseKnowledgeRoute(key.startsWith("subject-") ? "subjects" : "sources", key) === null
    || !record(value) || !onlyKeys(value, ["rows", "nextCursor", "isDone", "snapshot"], ["reviewed", "sectionSourcesReady"])
    || (value.sectionSourcesReady !== undefined && (key.startsWith("subject-") || typeof value.sectionSourcesReady !== "boolean"))
    || value.snapshot !== false || typeof value.isDone !== "boolean"
    || !Array.isArray(value.rows) || value.rows.length > 4
    || (value.isDone ? value.nextCursor !== null : !cursor(value.nextCursor))) return null;
  const reviewed = value.reviewed;
  if (reviewed !== undefined && (key.startsWith("resource-") || !record(reviewed)
    || !onlyKeys(reviewed, ["kind", "label", "revision"])
    || (reviewed.kind !== "person" && reviewed.kind !== "organization" && reviewed.kind !== "product")
    || !text(reviewed.label, 200, 2) || typeof reviewed.revision !== "number"
    || !Number.isSafeInteger(reviewed.revision) || reviewed.revision < 1)) return null;
  const rows = value.rows.map(item => row(item, key));
  if (rows.some(item => item === null)
    || (value.sectionSourcesReady === false && rows.some(item => item?.role === "section_citation"))
    || (record(reviewed) && rows.some(item => item?.role !== "primary" || item.subjectKind !== reviewed.kind))) return null;
  return { rows: rows as KnowledgePageRow[], nextCursor: value.nextCursor as string | null, isDone: value.isDone,
    snapshot: false, ...(value.sectionSourcesReady === undefined ? {} : { sectionSourcesReady: value.sectionSourcesReady as boolean }),
    ...(record(reviewed) ? { reviewed: { kind: reviewed.kind as "person" | "organization" | "product",
      label: reviewed.label as string, revision: reviewed.revision as number } } : {}) };
}

export function knowledgePath(kind: KnowledgeKind, key: string): string {
  if (parseKnowledgeRoute(kind, key) === null) throw new RangeError("Invalid knowledge route.");
  return `/-/${kind}/${key}`;
}

function markdownText(value: string): string {
  return value.replace(/[\\`*\[\]<>]/gu, character => `\\${character}`).replace(/[\r\n]+/gu, " ");
}

export function knowledgePageMarkdown(page: KnowledgePage, kind: KnowledgeKind, key: string, publisher?: string): string {
  const title = kind === "subjects" ? page.reviewed?.label ?? "Public subject references" : "Public source references";
  const lines = [`# ${markdownText(title)}`, "",
    page.reviewed === undefined
      ? "Each entry names the publisher who submitted it. Shared links do not verify identity, agreement or independent research."
      : "This reviewed subject grouping is revisable. Each publisher keeps their own attributed dossier and source citations.",
    ...(publisher === undefined ? [] : [`Showing entries by @${publisher}.`, ""]),
    ...(kind === "sources" && page.sectionSourcesReady !== true
      ? ["Long-form section sources are not fully indexed yet; this list may omit them.", ""] : []), ""];
  for (const item of page.rows) {
    const original = item.role === "citation" ? `${item.profileUrl}#source-${item.sourceOrdinal}`
      : item.role === "section_citation" ? `${item.profileUrl}/sections/${item.sectionId}#${item.sourceId}`
      : item.role === "reference" ? `${item.profileUrl}#${item.origin === "appearance" ? "appearances" : item.origin === "timeline" ? "timeline" : "relations"}-heading`
      : item.profileUrl;
    const label = item.role === "citation" ? item.source!.title
      : item.role === "section_citation" ? item.sectionSource!.title
      : item.role === "reference" ? item.targetName ?? item.targetHandle! : item.displayName;
    lines.push(`- [${markdownText(label)}](${original}) by @${item.username}; ${item.role.replaceAll("_", " ")} in revision ${item.revision}${item.source?.publishedAt ? `; published ${item.source.publishedAt}` : ""}${item.sectionSource ? `; original date ${markdownText(item.sectionSource.published.text)} (${item.sectionSource.published.precision})` : ""}`);
    if (item.role === "primary") {
      lines.push(`  As of ${item.asOf}; showing ${item.claims!.length} of ${item.claimCount} publisher claims.`);
      for (const claim of item.claims!) lines.push(`  - ${claim.kind.replaceAll("_", " ")}: ${markdownText(claim.text)} ([${claim.sourceIds.length} ${claim.sourceIds.length === 1 ? "source" : "sources"}](${item.profileUrl}#claim-${claim.id}))`);
    }
    if (item.source !== undefined) lines.push(`  Original source: <${new URL(item.source.url).href}>`);
    if (item.sectionSource !== undefined) lines.push(`  Original source: <${new URL(item.sectionSource.url).href}>; original ID ${markdownText(item.sectionSource.originalId)}; section ${markdownText(item.sectionTitle!)}`);
  }
  if (page.nextCursor !== null) lines.push("", `More results: ${knowledgePath(kind, key)}?${publisher === undefined ? "" : `publisher=${encodeURIComponent(publisher)}&`}cursor=${encodeURIComponent(page.nextCursor)}`);
  lines.push("", `${page.isDone ? "This page reaches the end of the available results" : "More results may follow"}. Results may change between pages.`);
  return lines.join("\n") + "\n";
}
