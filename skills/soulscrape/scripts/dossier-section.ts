import { parseSoulscrapeProfileUrl } from "./people-ontology";
import { comparePersonIndexDateTimes } from "./person-index";
import { ArchiveError, canonicalBytes, failPacket, sha256Hex, type JsonObject } from "./source-packet";

export const DOSSIER_SECTION_VERSION = "soulscrape.dossier-section.v1" as const;
export const DOSSIER_SECTION_MAX_BYTES = 128 * 1024;
export const DOSSIER_SECTION_MAX_BODY_BYTES = 96 * 1024;
const ID = /^[a-z][a-z0-9-]{1,79}$/u;
const SOURCE_ID = /^source-[a-f0-9]{20}$/u;
const HASH = /^[a-f0-9]{64}$/u;
const DATE = /^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2}))?)?$/u;
type Precision = "day" | "month" | "year" | "decade" | "approximate" | "unknown";
export type DossierDate = Readonly<{ text: string; precision: Precision }>;
export type DossierSource = Readonly<{ id: string; originalId: string; title: string; url: string;
  publisher: string; published: DossierDate; type: string; note?: string | null; author?: string | null;
  accessedAt?: string }>;
export type DossierRecord = Readonly<{ id: string; kind: string; originalUrl: string; sourceIds: string[];
  label: string; original: JsonObject; date?: DossierDate; confidence?: "confirmed" | "reported" | "inferred" }>;
export type DossierSection = Readonly<{
  schemaVersion: typeof DOSSIER_SECTION_VERSION; profileUrl: string; packetDigest: string; profileRevision: number;
  subjectKind: "person" | "organization" | "product"; id: string; title: string; body: string;
  provenance: Readonly<{ originalUrl: string; originalRevision: string; source: string;
    originalAuthor?: string; draftingDisclosure?: string }>;
  anchors: readonly Readonly<{ id: string; title: string; originalUrl: string }>[];
  sources: readonly DossierSource[]; records: readonly DossierRecord[];
}>;

type Row = Record<string, unknown>;
function object(value: unknown, path: string): Row {
  if (value === null || typeof value !== "object" || Array.isArray(value)) failPacket(path, "must be an object");
  return value as Row;
}
function keys(value: Row, path: string, required: readonly string[], optional: readonly string[] = []): void {
  for (const key of required) if (!Object.hasOwn(value, key)) failPacket(path, `missing ${key}`);
  for (const key of Object.keys(value)) if (!required.includes(key) && !optional.includes(key)) failPacket(path, `unknown ${key}`);
}
function string(value: unknown, path: string, max: number, min = 1): string {
  if (typeof value !== "string" || value.length < min || value.length > max || new TextEncoder().encode(value).length > max * 4)
    failPacket(path, "invalid or unbounded text");
  return value;
}
function id(value: unknown, path: string): string {
  const result = string(value, path, 80, 2);
  if (!ID.test(result)) failPacket(path, "invalid id");
  return result;
}
function link(value: unknown, path: string): string {
  const result = string(value, path, 2048);
  let url: URL;
  try { url = new URL(result); }
  catch { failPacket(path, "invalid URL"); }
  if (!/^(https?:)$/u.test(url.protocol) || url.username || url.password) failPacket(path, "invalid public URL");
  return result;
}
function instant(value: unknown, path: string): string {
  const result = string(value, path, 100);
  try { comparePersonIndexDateTimes(result, result); }
  catch { failPacket(path, "invalid date-time"); }
  return result;
}
function date(value: unknown, path: string): DossierDate {
  const item = object(value, path);
  keys(item, path, ["text", "precision"]);
  const text = string(item.text, `${path}.text`, 80);
  const precision = item.precision;
  if (precision !== "day" && precision !== "month" && precision !== "year" && precision !== "decade"
    && precision !== "approximate" && precision !== "unknown") failPacket(path, "invalid precision");
  if (precision === "day" || precision === "month" || precision === "year") {
    const match = DATE.exec(text);
    if (match === null || (precision === "day" && match[3] === undefined)
      || (precision === "month" && (match[2] === undefined || match[3] !== undefined))
      || (precision === "year" && match[2] !== undefined)) failPacket(path, "date precision does not match text");
    const year = Number(match[1]), month = match[2] === undefined ? 1 : Number(match[2]);
    const day = match[3] === undefined ? 1 : Number(match[3]);
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    if (year < 1 || month < 1 || month > 12 || day < 1
      || day > [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]!) failPacket(path, "invalid calendar date");
  } else if (precision === "decade" && !/^[0-9]{3}0s$/u.test(text)) failPacket(path, "invalid decade");
  return { text, precision };
}
function boundedJson(value: unknown): void {
  let budget = DOSSIER_SECTION_MAX_BYTES;
  let entries = 0;
  const seen = new Set<object>();
  const visit = (item: unknown, depth: number): void => {
    if (depth > 32 || ++entries > 8192) failPacket("section", "exceeds nesting or member limit");
    if (item === null || typeof item === "boolean") { budget -= 5; return; }
    if (typeof item === "number") {
      if (!Number.isSafeInteger(item)) failPacket("section", "must use integer-only JSON");
      budget -= 20; return;
    }
    if (typeof item === "string") {
      if (item.length > DOSSIER_SECTION_MAX_BYTES || budget < 0) failPacket("section", "exceeds byte limit");
      budget -= new TextEncoder().encode(item).length + 2;
      return;
    }
    if (typeof item !== "object" || seen.has(item)) failPacket("section", "must be acyclic JSON");
    const array = Array.isArray(item);
    if (array && item.length > 8192) failPacket("section", "exceeds member limit");
    const proto = Object.getPrototypeOf(item);
    if (array ? proto !== Array.prototype : proto !== Object.prototype && proto !== null)
      failPacket("section", "must be plain JSON");
    seen.add(item);
    const names = Reflect.ownKeys(item);
    if (names.length > 8193) failPacket("section", "exceeds member limit");
    if (array && (names.length !== item.length + 1
      || Array.from({ length: item.length }, (_, index) => index).some(index => !Object.hasOwn(item, index))))
      failPacket("section", "array must be dense");
    for (const name of names) {
      if (typeof name !== "string") failPacket("section", "symbol keys are unsupported");
      if (array && name === "length") continue;
      if (!array) visit(name, depth + 1);
      const descriptor = Object.getOwnPropertyDescriptor(item, name);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) failPacket("section", "accessors are unsupported");
      visit(descriptor.value, depth + 1);
    }
    seen.delete(item);
    budget -= names.length + 2;
  };
  visit(value, 0);
  if (budget < 0) failPacket("section", "exceeds byte limit");
}

export function parseDossierSection(input: unknown): DossierSection {
  boundedJson(input);
  let bytes: Uint8Array;
  try { bytes = canonicalBytes(input); }
  catch (error) {
    if (error instanceof ArchiveError) failPacket("section", "must use valid integer-only JSON");
    throw error;
  }
  if (bytes.length > DOSSIER_SECTION_MAX_BYTES) failPacket("section", "exceeds 128 KiB");
  const section = object(input, "section");
  keys(section, "section", ["schemaVersion", "profileUrl", "packetDigest", "profileRevision", "subjectKind", "id", "title", "body", "provenance", "anchors", "sources", "records"]);
  if (section.schemaVersion !== DOSSIER_SECTION_VERSION) failPacket("schemaVersion", "unsupported version");
  const profileUrl = string(section.profileUrl, "profileUrl", 2048);
  if (parseSoulscrapeProfileUrl(profileUrl)?.profileUrl !== profileUrl) failPacket("profileUrl", "must be a canonical public profile URL");
  const packetDigest = string(section.packetDigest, "packetDigest", 64, 64);
  if (!HASH.test(packetDigest)) failPacket("packetDigest", "invalid digest");
  const profileRevision = section.profileRevision;
  if (typeof profileRevision !== "number" || !Number.isSafeInteger(profileRevision) || profileRevision < 1)
    failPacket("profileRevision", "invalid profile revision");
  const subjectKind = section.subjectKind;
  if (subjectKind !== "person" && subjectKind !== "organization" && subjectKind !== "product")
    failPacket("subjectKind", "invalid subject kind");
  const body = string(section.body, "body", DOSSIER_SECTION_MAX_BODY_BYTES, 0);
  if (new TextEncoder().encode(body).length > DOSSIER_SECTION_MAX_BODY_BYTES) failPacket("body", "exceeds 96 KiB");
  const provenance = object(section.provenance, "provenance");
  keys(provenance, "provenance", ["originalUrl", "originalRevision", "source"],
    ["originalAuthor", "draftingDisclosure"]);
  const originalRevision = string(provenance.originalRevision, "provenance.originalRevision", 64, 64);
  if (!HASH.test(originalRevision)) failPacket("provenance.originalRevision", "invalid digest");
  const source = id(provenance.source, "provenance.source");
  const originalUrl = link(provenance.originalUrl, "provenance.originalUrl");
  if (!Array.isArray(section.anchors) || section.anchors.length > 64) failPacket("anchors", "exceeds 64 anchors");
  const anchors = section.anchors.map((entry: unknown, index: number) => {
    const path = `anchors[${index}]`, anchor = object(entry, path);
    keys(anchor, path, ["id", "title", "originalUrl"]);
    return { id: id(anchor.id, `${path}.id`), title: string(anchor.title, `${path}.title`, 200),
      originalUrl: link(anchor.originalUrl, `${path}.originalUrl`) };
  });
  if (new Set(anchors.map(anchor => anchor.id)).size !== anchors.length) failPacket("anchors", "duplicate anchor");
  if (!Array.isArray(section.sources) || section.sources.length > 256) failPacket("sources", "exceeds 256 occurrences");
  const sources = section.sources.map((entry: unknown, index: number): DossierSource => {
    const path = `sources[${index}]`, item = object(entry, path);
    keys(item, path, ["id", "originalId", "title", "url", "publisher", "published", "type"],
      ["note", "author", "accessedAt"]);
    const result: DossierSource = { id: string(item.id, `${path}.id`, 27, 27),
      originalId: string(item.originalId, `${path}.originalId`, 160),
      title: string(item.title, `${path}.title`, 500), url: link(item.url, `${path}.url`),
      publisher: string(item.publisher, `${path}.publisher`, 200), published: date(item.published, `${path}.published`),
      type: id(item.type, `${path}.type`),
      ...(item.note === undefined ? {} : { note: item.note === null ? null : string(item.note, `${path}.note`, 1024) }),
      ...(item.author === undefined ? {} : { author: item.author === null ? null : string(item.author, `${path}.author`, 200) }),
      ...(item.accessedAt === undefined ? {} : { accessedAt: instant(item.accessedAt, `${path}.accessedAt`) }) };
    if (!SOURCE_ID.test(result.id)) failPacket(`${path}.id`, "invalid occurrence id");
    return result;
  });
  const sourceIds = new Set(sources.map(item => item.id));
  if (sourceIds.size !== sources.length) failPacket("sources", "duplicate occurrence id");
  if (!Array.isArray(section.records) || section.records.length > 512) failPacket("records", "exceeds 512 records");
  const records = section.records.map((entry: unknown, index: number): DossierRecord => {
    const path = `records[${index}]`, item = object(entry, path);
    keys(item, path, ["id", "kind", "originalUrl", "sourceIds", "label", "original"], ["confidence", "date"]);
    if (!Array.isArray(item.sourceIds) || item.sourceIds.length > 16) failPacket(`${path}.sourceIds`, "exceeds 16 citations");
    const citations = item.sourceIds.map((source: unknown) => string(source, `${path}.sourceIds`, 27, 27));
    if (new Set(citations).size !== citations.length || citations.some(source => !sourceIds.has(source)))
      failPacket(`${path}.sourceIds`, "missing or repeated source occurrence");
    const confidence = item.confidence;
    if (confidence !== undefined && confidence !== "confirmed" && confidence !== "reported" && confidence !== "inferred")
      failPacket(`${path}.confidence`, "must retain the editorial confidence vocabulary");
    return { id: id(item.id, `${path}.id`), kind: id(item.kind, `${path}.kind`),
      originalUrl: link(item.originalUrl, `${path}.originalUrl`), sourceIds: citations,
      label: string(item.label, `${path}.label`, 500), original: object(item.original, `${path}.original`) as JsonObject,
      ...(item.date === undefined ? {} : { date: date(item.date, `${path}.date`) }),
      ...(confidence === undefined ? {} : { confidence }) };
  });
  if (new Set(records.map(item => item.id)).size !== records.length) failPacket("records", "duplicate record id");
  const renderedIds = ["section-text", "section-sources", "section-records",
    ...anchors.map(item => item.id), ...sources.map(item => item.id), ...records.map(item => item.id)];
  if (new Set(renderedIds).size !== renderedIds.length) failPacket("section", "ambiguous rendered anchor");
  return { schemaVersion: DOSSIER_SECTION_VERSION, profileUrl, packetDigest, profileRevision, subjectKind,
    id: id(section.id, "id"),
    title: string(section.title, "title", 200), body,
    provenance: { originalUrl, originalRevision, source,
      ...(provenance.originalAuthor === undefined ? {} : {
        originalAuthor: string(provenance.originalAuthor, "provenance.originalAuthor", 200) }),
      ...(provenance.draftingDisclosure === undefined ? {} : {
        draftingDisclosure: string(provenance.draftingDisclosure, "provenance.draftingDisclosure", 500) }) },
    anchors, sources, records };
}

export function dossierSectionDigest(value: unknown): string {
  return sha256Hex(canonicalBytes(parseDossierSection(value)));
}
