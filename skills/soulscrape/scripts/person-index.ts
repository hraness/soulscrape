/**
 * The `soulscrape.person-index.v1` contract: a publishable, source-backed index
 * of a person or organization. Shared by the skill's validation and publish
 * scripts, the site's API boundary, and the Convex write path. This module is
 * dependency-free and safe in Bun, Node, Convex, and browser runtimes.
 */

import {
  PacketValidationError,
  canonicalBytes,
  failPacket,
  rejectNonIJson,
  type JsonValue,
} from "./source-packet.ts";
import { sha256Hex } from "./sha256.ts";

export { PacketValidationError };

export const PERSON_INDEX_SCHEMA_VERSION = "soulscrape.person-index.v1" as const;

export const PERSON_INDEX_MAX_BODY_BYTES = 512 * 1024;

const HANDLE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const IDENTIFIER = /^[a-z][a-z0-9-]{1,63}$/u;
const SOURCE_ID = /^source-[a-f0-9]{20}$/u;
const INDEX_ID = /^pidx-[a-z0-9][a-z0-9-]{6,60}$/u;
const WIKIDATA_ID = /^Q[1-9][0-9]{0,9}$/u;
const LANGUAGE = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/u;
const PARTIAL_DATE = /^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2}))?)?$/u;
const DATE_TIME =
  /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]+))?(Z|[+-][0-9]{2}:[0-9]{2})$/u;
const TRACKING_PARAMETERS = /^utm_/iu;

const SUBJECT_KINDS = new Set(["person", "organization"]);
const SOURCE_BINDINGS = new Set([
  "subject_controlled",
  "first_person",
  "interview",
  "primary_record",
  "reporting",
  "reference",
  "archive",
]);
const MEDIA_TYPES = new Set([
  "webpage",
  "article",
  "video",
  "audio",
  "pdf",
  "transcript",
  "book",
  "dataset",
]);
const CLAIM_KINDS = new Set(["fact", "stated_belief", "pattern", "speculation"]);
const EVENT_KINDS = new Set([
  "birth",
  "founded",
  "education",
  "apprenticeship",
  "role",
  "project",
  "publication",
  "award",
  "exhibition",
  "media",
  "funding",
  "milestone",
  "other",
]);
const THEME_KINDS = new Set([
  "philosophy",
  "belief",
  "interest",
  "practice",
  "influence",
  "method",
]);
const THEME_STATUS = new Set(["stated", "reported", "inferred"]);
const WORK_KINDS = new Set([
  "project",
  "building",
  "book",
  "film",
  "recording",
  "design",
  "product",
  "paper",
  "other",
]);
const WORK_STATUS = new Set([
  "completed",
  "proposed",
  "unbuilt",
  "in_progress",
  "abandoned",
  "published",
  "released",
  "ongoing",
]);
const APPEARANCE_MEDIA = new Set(["video", "audio", "article", "transcript"]);
const RELATION_KINDS = new Set([
  "collaborated",
  "cofounder",
  "founded",
  "founded_by",
  "employed_by",
  "employed",
  "member_of",
  "member",
  "funded_by",
  "invested_in",
  "interviewed",
  "interviewed_by",
  "influenced",
  "influenced_by",
  "family",
  "other",
]);
const RELATION_TARGET_KINDS = new Set(["person", "organization"]);

type JsonObject = { [key: string]: JsonValue };

export type PersonIndexIdentity = Readonly<{
  wikidataId?: string;
  officialSite?: string;
  wikipedia?: string;
  profiles?: readonly string[];
}>;

export type PersonIndexSubject = Readonly<{
  kind: "person" | "organization";
  handle: string;
  displayName: string;
  alsoKnownAs?: readonly string[];
  summary: string;
  identity?: PersonIndexIdentity;
}>;

export type PersonIndexSource = Readonly<{
  id: string;
  binding: string;
  mediaType: string;
  title: string;
  url: string;
  publisher: string;
  accessedAt: string;
  publishedAt?: string;
  authors?: readonly string[];
  transcriptOf?: string;
  language?: string;
  notes?: string;
}>;

export type PersonIndexClaim = Readonly<{
  id: string;
  kind: string;
  text: string;
  sourceIds: readonly string[];
}>;

export type PersonIndexEvent = Readonly<{
  id: string;
  kind: string;
  date: string;
  title: string;
  summary?: string;
  organization?: string;
  location?: string;
  end?: string;
  sourceIds: readonly string[];
}>;

export type PersonIndexTheme = Readonly<{
  id: string;
  kind: string;
  status: string;
  title: string;
  summary: string;
  sourceIds: readonly string[];
}>;

export type PersonIndexWork = Readonly<{
  id: string;
  kind: string;
  status: string;
  title: string;
  date?: string;
  location?: string;
  summary?: string;
  sourceIds: readonly string[];
}>;

export type PersonIndexAppearance = Readonly<{
  id: string;
  title: string;
  venue?: string;
  publishedAt?: string;
  participants?: readonly string[];
  summary?: string;
  media?: readonly Readonly<{ type: string; url: string; sourceId?: string }>[];
  sourceIds: readonly string[];
}>;

/**
 * An evidence-backed edge from the subject to another entity. `target` is the
 * normalized handle-form slug for the target entity; it is a locator, not a
 * resolution guarantee — a packet stays valid whether or not the target is
 * itself indexed. `targetName` is the display name of the target.
 */
export type PersonIndexRelation = Readonly<{
  id: string;
  kind: string;
  target: string;
  targetName: string;
  targetKind?: string;
  note?: string;
  sourceIds: readonly string[];
}>;

export type PersonIndex = Readonly<{
  schemaVersion: typeof PERSON_INDEX_SCHEMA_VERSION;
  indexId: string;
  generatedAt: string;
  subject: PersonIndexSubject;
  scope: Readonly<{ asOf: string; coverage?: readonly string[] }>;
  sources: readonly PersonIndexSource[];
  claims: readonly PersonIndexClaim[];
  timeline?: readonly PersonIndexEvent[];
  themes?: readonly PersonIndexTheme[];
  works?: readonly PersonIndexWork[];
  appearances?: readonly PersonIndexAppearance[];
  relations?: readonly PersonIndexRelation[];
  openQuestions?: readonly string[];
  body: string;
  provenance: Readonly<{
    tool: string;
    method?: string;
    model?: string;
    contributors?: readonly string[];
  }>;
}>;

/** Normalize a display name into a URL-safe person handle. */
export function normalizePersonHandle(displayName: string): string {
  const folded = displayName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff]/gu, "")
    .toLowerCase();
  let handle = "";
  let dash = false;
  for (const character of folded) {
    const code = character.codePointAt(0)!;
    const safe = (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
    if (safe) {
      handle += character;
      dash = false;
    } else if (!dash && handle.length > 0) {
      handle += "-";
      dash = true;
    }
  }
  return handle.replace(/-+$/u, "");
}

export function isPersonHandle(value: string): boolean {
  return value.length >= 2 && value.length <= 64 && HANDLE.test(value);
}

/** Canonicalize a source URL for identity derivation and deduplication. */
export function canonicalPersonSourceUrl(value: string): string {
  const url = new URL(value);
  const protocol = url.protocol.toLowerCase();
  url.protocol = protocol;
  url.hostname = url.hostname.toLowerCase();
  if (
    (protocol === "https:" && url.port === "443")
    || (protocol === "http:" && url.port === "80")
  ) {
    url.port = "";
  }
  if (url.hostname === "youtu.be") {
    const id = url.pathname.replace(/^\/+/u, "").replace(/\/+$/u, "");
    url.hostname = "www.youtube.com";
    url.pathname = "/watch";
    url.search = `?v=${id}`;
  }
  const kept = [...url.searchParams.entries()]
    .filter(
      ([key]) =>
        !TRACKING_PARAMETERS.test(key)
        && key !== "fbclid"
        && key !== "gclid"
        && !(
          url.hostname.endsWith("youtube.com")
          && url.pathname === "/watch"
          && key !== "v"
        ),
    )
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  url.search = kept.length === 0 ? "" : `?${new URLSearchParams(kept).toString()}`;
  url.hash = "";
  return url.toString();
}

/** Derive the stable source id for a catalog entry. */
export function stablePersonSourceId(
  url: string,
  publishedAt: string | undefined,
): string {
  const identity = `${canonicalPersonSourceUrl(url)}\n${publishedAt ?? ""}`;
  return `source-${sha256Hex(new TextEncoder().encode(identity)).slice(0, 20)}`;
}

/** Canonical SHA-256 digest of the whole packet, recorded at admission. */
export function personIndexDigest(packet: PersonIndex): string {
  return sha256Hex(canonicalBytes(packet));
}

function expectObject(value: JsonValue, path: string): JsonObject {
  if (value === null || Array.isArray(value) || typeof value !== "object") {
    failPacket(path, "must be an object");
  }
  return value;
}

function expectArray(value: JsonValue, path: string, maximum: number): JsonValue[] {
  if (!Array.isArray(value)) failPacket(path, "must be an array");
  if (value.length > maximum) failPacket(path, "has too many items");
  return value;
}

function expectString(
  value: JsonValue,
  path: string,
  minimum: number,
  maximum: number,
): string {
  if (typeof value !== "string") failPacket(path, "must be a string");
  const length = Array.from(value).length;
  if (length < minimum || length > maximum) failPacket(path, "has an invalid length");
  return value;
}

function expectEnum(
  value: JsonValue,
  path: string,
  allowed: ReadonlySet<string>,
): string {
  const text = expectString(value, path, 1, 64);
  if (!allowed.has(text)) failPacket(path, "has an unknown enum value");
  return text;
}

function exactKeys(
  value: JsonObject,
  path: string,
  required: readonly string[],
  optional: readonly string[] = [],
): void {
  const keys = new Set(Object.keys(value));
  const accepted = new Set([...required, ...optional]);
  for (const key of required) {
    if (!keys.has(key)) failPacket(path, `missing required member ${key}`);
  }
  for (const key of keys) {
    if (!accepted.has(key)) failPacket(path, `contains unknown member ${key}`);
  }
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number): number {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
    month - 1
  ] ?? 0;
}

/** Validate `YYYY`, `YYYY-MM`, or `YYYY-MM-DD` as a real calendar date. */
function expectDate(value: JsonValue, path: string): string {
  const text = expectString(value, path, 4, 10);
  const match = PARTIAL_DATE.exec(text);
  if (match === null) failPacket(path, "must be YYYY, YYYY-MM, or YYYY-MM-DD");
  const year = Number(match[1]);
  const month = match[2] === undefined ? undefined : Number(match[2]);
  const day = match[3] === undefined ? undefined : Number(match[3]);
  if (year < 1) failPacket(path, "must be a valid date");
  if (month !== undefined && (month < 1 || month > 12)) {
    failPacket(path, "must be a valid date");
  }
  if (day !== undefined) {
    if (month === undefined || day < 1 || day > daysInMonth(year, month)) {
      failPacket(path, "must be a valid date");
    }
  }
  return text;
}

function expectDateTime(value: JsonValue, path: string): string {
  const text = expectString(value, path, 1, 100);
  const match = DATE_TIME.exec(text);
  if (match === null) failPacket(path, "must be an RFC 3339 date-time");
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const zone = match[8]!;
  if (
    year < 1
    || month < 1
    || month > 12
    || day < 1
    || day > daysInMonth(year, month)
    || hour > 23
    || minute > 59
    || second > 59
  ) {
    failPacket(path, "must be a valid date-time");
  }
  if (zone !== "Z") {
    const offsetHour = Number(zone.slice(1, 3));
    const offsetMinute = Number(zone.slice(4, 6));
    if (offsetHour > 23 || offsetMinute > 59) {
      failPacket(path, "must be a valid date-time");
    }
  }
  return text;
}

function expectUrl(value: JsonValue, path: string): string {
  const text = expectString(value, path, 1, 2_048);
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    failPacket(path, "must be an absolute http(s) URL");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    failPacket(path, "must be an absolute http(s) URL");
  }
  if (url.username !== "" || url.password !== "") {
    failPacket(path, "must not carry credentials");
  }
  return text;
}

const IDENTIFIER_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

function expectIdentifier(value: JsonValue, path: string, prefix: string): string {
  const text = expectString(value, path, 1, 64);
  if (
    !IDENTIFIER.test(text)
    || !text.startsWith(`${prefix}-`)
    || !IDENTIFIER_SLUG.test(text.slice(prefix.length + 1))
  ) {
    failPacket(path, `must match ${prefix}-<slug>`);
  }
  return text;
}

function expectStringList(
  value: JsonValue,
  path: string,
  maximum: number,
  itemMaximum: number,
): string[] {
  const items = expectArray(value, path, maximum);
  const parsed = items.map((item, index) =>
    expectString(item, `${path}[${index}]`, 1, itemMaximum),
  );
  if (new Set(parsed).size !== parsed.length) {
    failPacket(path, "contains duplicates");
  }
  return parsed;
}

function expectSourceIds(
  value: JsonValue,
  path: string,
  known: ReadonlySet<string>,
): string[] {
  const items = expectArray(value, path, 24);
  if (items.length < 1) failPacket(path, "must reference at least one source");
  const parsed = items.map((item, index) => {
    const id = expectString(item, `${path}[${index}]`, 7, 27);
    if (!SOURCE_ID.test(id)) failPacket(`${path}[${index}]`, "is not a source id");
    if (!known.has(id)) {
      failPacket(`${path}[${index}]`, "references an unknown source");
    }
    return id;
  });
  if (new Set(parsed).size !== parsed.length) {
    failPacket(path, "contains duplicates");
  }
  return parsed;
}

function parseSubject(value: JsonValue): PersonIndexSubject {
  const subject = expectObject(value, "subject");
  exactKeys(
    subject,
    "subject",
    ["kind", "handle", "displayName", "summary"],
    ["alsoKnownAs", "identity"],
  );
  const kind = expectEnum(subject.kind!, "subject.kind", SUBJECT_KINDS) as
    | "person"
    | "organization";
  const handle = expectString(subject.handle!, "subject.handle", 2, 64);
  if (!HANDLE.test(handle)) {
    failPacket("subject.handle", "must be a normalized handle");
  }
  const displayName = expectString(
    subject.displayName!,
    "subject.displayName",
    1,
    200,
  );
  const summary = expectString(subject.summary!, "subject.summary", 1, 600);
  const alsoKnownAs = "alsoKnownAs" in subject
    ? expectStringList(subject.alsoKnownAs!, "subject.alsoKnownAs", 16, 200)
    : undefined;
  let identity: PersonIndexIdentity | undefined;
  if ("identity" in subject) {
    const raw = expectObject(subject.identity!, "subject.identity");
    exactKeys(
      raw,
      "subject.identity",
      [],
      ["wikidataId", "officialSite", "wikipedia", "profiles"],
    );
    identity = {
      ...("wikidataId" in raw
        ? {
            wikidataId: (() => {
              const id = expectString(
                raw.wikidataId!,
                "subject.identity.wikidataId",
                2,
                12,
              );
              if (!WIKIDATA_ID.test(id)) {
                failPacket("subject.identity.wikidataId", "must be a Wikidata QID");
              }
              return id;
            })(),
          }
        : {}),
      ...("officialSite" in raw
        ? {
            officialSite: expectUrl(
              raw.officialSite!,
              "subject.identity.officialSite",
            ),
          }
        : {}),
      ...("wikipedia" in raw
        ? { wikipedia: expectUrl(raw.wikipedia!, "subject.identity.wikipedia") }
        : {}),
      ...("profiles" in raw
        ? {
            profiles: expectArray(raw.profiles!, "subject.identity.profiles", 16)
              .map((item, index) =>
                expectUrl(item, `subject.identity.profiles[${index}]`),
              ),
          }
        : {}),
    };
  }
  return {
    kind,
    handle,
    displayName,
    summary,
    ...(alsoKnownAs === undefined ? {} : { alsoKnownAs }),
    ...(identity === undefined ? {} : { identity }),
  };
}

function parseSources(value: JsonValue): PersonIndexSource[] {
  const sources = expectArray(value, "sources", 400);
  if (sources.length < 1) failPacket("sources", "must list at least one source");
  const ids = new Set<string>();
  return sources.map((raw, index) => {
    const path = `sources[${index}]`;
    const source = expectObject(raw, path);
    exactKeys(
      source,
      path,
      ["id", "binding", "mediaType", "title", "url", "publisher", "accessedAt"],
      [
        "publishedAt",
        "authors",
        "transcriptOf",
        "language",
        "notes",
      ],
    );
    const id = expectIdentifier(source.id!, `${path}.id`, "source");
    if (!SOURCE_ID.test(id)) {
      failPacket(`${path}.id`, "must be a derived source id");
    }
    if (ids.has(id)) failPacket(`${path}.id`, "duplicates another source id");
    ids.add(id);
    const binding = expectEnum(source.binding!, `${path}.binding`, SOURCE_BINDINGS);
    const mediaType = expectEnum(
      source.mediaType!,
      `${path}.mediaType`,
      MEDIA_TYPES,
    );
    const title = expectString(source.title!, `${path}.title`, 1, 500);
    const url = expectUrl(source.url!, `${path}.url`);
    const publisher = expectString(source.publisher!, `${path}.publisher`, 1, 200);
    const accessedAt = expectDateTime(source.accessedAt!, `${path}.accessedAt`);
    const publishedAt = "publishedAt" in source
      ? expectDate(source.publishedAt!, `${path}.publishedAt`)
      : undefined;
    if (id !== stablePersonSourceId(url, publishedAt)) {
      failPacket(`${path}.id`, "does not match the canonical source identity");
    }
    const authors = "authors" in source
      ? expectStringList(source.authors!, `${path}.authors`, 8, 200)
      : undefined;
    const transcriptOf = "transcriptOf" in source
      ? (() => {
          const target = expectString(
            source.transcriptOf!,
            `${path}.transcriptOf`,
            7,
            27,
          );
          if (!SOURCE_ID.test(target)) {
            failPacket(`${path}.transcriptOf`, "is not a source id");
          }
          return target;
        })()
      : undefined;
    const language = "language" in source
      ? (() => {
          const tag = expectString(source.language!, `${path}.language`, 2, 35);
          if (!LANGUAGE.test(tag)) {
            failPacket(`${path}.language`, "must be a language tag");
          }
          return tag;
        })()
      : undefined;
    const notes = "notes" in source
      ? expectString(source.notes!, `${path}.notes`, 1, 1_000)
      : undefined;
    return {
      id,
      binding,
      mediaType,
      title,
      url,
      publisher,
      accessedAt,
      ...(publishedAt === undefined ? {} : { publishedAt }),
      ...(authors === undefined ? {} : { authors }),
      ...(transcriptOf === undefined ? {} : { transcriptOf }),
      ...(language === undefined ? {} : { language }),
      ...(notes === undefined ? {} : { notes }),
    };
  });
}

function parseClaims(
  value: JsonValue,
  known: ReadonlySet<string>,
): PersonIndexClaim[] {
  const claims = expectArray(value, "claims", 500);
  const ids = new Set<string>();
  return claims.map((raw, index) => {
    const path = `claims[${index}]`;
    const claim = expectObject(raw, path);
    exactKeys(claim, path, ["id", "kind", "text", "sourceIds"]);
    const id = expectIdentifier(claim.id!, `${path}.id`, "claim");
    if (ids.has(id)) failPacket(`${path}.id`, "duplicates another claim id");
    ids.add(id);
    const kind = expectEnum(claim.kind!, `${path}.kind`, CLAIM_KINDS);
    const text = expectString(claim.text!, `${path}.text`, 1, 2_000);
    const sourceIds = expectSourceIds(claim.sourceIds!, `${path}.sourceIds`, known);
    return { id, kind, text, sourceIds };
  });
}

function parseTimeline(
  value: JsonValue,
  known: ReadonlySet<string>,
): PersonIndexEvent[] {
  const events = expectArray(value, "timeline", 200);
  const ids = new Set<string>();
  return events.map((raw, index) => {
    const path = `timeline[${index}]`;
    const event = expectObject(raw, path);
    exactKeys(
      event,
      path,
      ["id", "kind", "date", "title", "sourceIds"],
      ["summary", "organization", "location", "end"],
    );
    const id = expectIdentifier(event.id!, `${path}.id`, "event");
    if (ids.has(id)) failPacket(`${path}.id`, "duplicates another event id");
    ids.add(id);
    const kind = expectEnum(event.kind!, `${path}.kind`, EVENT_KINDS);
    const date = expectDate(event.date!, `${path}.date`);
    const title = expectString(event.title!, `${path}.title`, 1, 200);
    const end = "end" in event ? expectDate(event.end!, `${path}.end`) : undefined;
    if (end !== undefined && end < date) {
      failPacket(`${path}.end`, "must not precede date");
    }
    const summary = "summary" in event
      ? expectString(event.summary!, `${path}.summary`, 1, 2_000)
      : undefined;
    const organization = "organization" in event
      ? expectString(event.organization!, `${path}.organization`, 1, 200)
      : undefined;
    const location = "location" in event
      ? expectString(event.location!, `${path}.location`, 1, 200)
      : undefined;
    const sourceIds = expectSourceIds(
      event.sourceIds!,
      `${path}.sourceIds`,
      known,
    );
    return {
      id,
      kind,
      date,
      title,
      sourceIds,
      ...(summary === undefined ? {} : { summary }),
      ...(organization === undefined ? {} : { organization }),
      ...(location === undefined ? {} : { location }),
      ...(end === undefined ? {} : { end }),
    };
  });
}

function parseThemes(
  value: JsonValue,
  known: ReadonlySet<string>,
): PersonIndexTheme[] {
  const themes = expectArray(value, "themes", 80);
  const ids = new Set<string>();
  return themes.map((raw, index) => {
    const path = `themes[${index}]`;
    const theme = expectObject(raw, path);
    exactKeys(
      theme,
      path,
      ["id", "kind", "status", "title", "summary", "sourceIds"],
    );
    const id = expectIdentifier(theme.id!, `${path}.id`, "theme");
    if (ids.has(id)) failPacket(`${path}.id`, "duplicates another theme id");
    ids.add(id);
    const kind = expectEnum(theme.kind!, `${path}.kind`, THEME_KINDS);
    const status = expectEnum(theme.status!, `${path}.status`, THEME_STATUS);
    const title = expectString(theme.title!, `${path}.title`, 1, 200);
    const summary = expectString(theme.summary!, `${path}.summary`, 1, 2_000);
    const sourceIds = expectSourceIds(theme.sourceIds!, `${path}.sourceIds`, known);
    return { id, kind, status, title, summary, sourceIds };
  });
}

function parseWorks(
  value: JsonValue,
  known: ReadonlySet<string>,
): PersonIndexWork[] {
  const works = expectArray(value, "works", 200);
  const ids = new Set<string>();
  return works.map((raw, index) => {
    const path = `works[${index}]`;
    const work = expectObject(raw, path);
    exactKeys(
      work,
      path,
      ["id", "kind", "status", "title", "sourceIds"],
      ["date", "location", "summary"],
    );
    const id = expectIdentifier(work.id!, `${path}.id`, "work");
    if (ids.has(id)) failPacket(`${path}.id`, "duplicates another work id");
    ids.add(id);
    const kind = expectEnum(work.kind!, `${path}.kind`, WORK_KINDS);
    const status = expectEnum(work.status!, `${path}.status`, WORK_STATUS);
    const title = expectString(work.title!, `${path}.title`, 1, 200);
    const date = "date" in work ? expectDate(work.date!, `${path}.date`) : undefined;
    const location = "location" in work
      ? expectString(work.location!, `${path}.location`, 1, 200)
      : undefined;
    const summary = "summary" in work
      ? expectString(work.summary!, `${path}.summary`, 1, 2_000)
      : undefined;
    const sourceIds = expectSourceIds(work.sourceIds!, `${path}.sourceIds`, known);
    return {
      id,
      kind,
      status,
      title,
      sourceIds,
      ...(date === undefined ? {} : { date }),
      ...(location === undefined ? {} : { location }),
      ...(summary === undefined ? {} : { summary }),
    };
  });
}

function parseAppearances(
  value: JsonValue,
  known: ReadonlySet<string>,
): PersonIndexAppearance[] {
  const appearances = expectArray(value, "appearances", 200);
  const ids = new Set<string>();
  return appearances.map((raw, index) => {
    const path = `appearances[${index}]`;
    const appearance = expectObject(raw, path);
    exactKeys(
      appearance,
      path,
      ["id", "title", "sourceIds"],
      ["venue", "publishedAt", "participants", "summary", "media"],
    );
    const id = expectIdentifier(appearance.id!, `${path}.id`, "appearance");
    if (ids.has(id)) failPacket(`${path}.id`, "duplicates another appearance id");
    ids.add(id);
    const title = expectString(appearance.title!, `${path}.title`, 1, 300);
    const venue = "venue" in appearance
      ? expectString(appearance.venue!, `${path}.venue`, 1, 200)
      : undefined;
    const publishedAt = "publishedAt" in appearance
      ? expectDate(appearance.publishedAt!, `${path}.publishedAt`)
      : undefined;
    const participants = "participants" in appearance
      ? expectStringList(
          appearance.participants!,
          `${path}.participants`,
          12,
          200,
        )
      : undefined;
    const summary = "summary" in appearance
      ? expectString(appearance.summary!, `${path}.summary`, 1, 2_000)
      : undefined;
    let media: PersonIndexAppearance["media"];
    if ("media" in appearance) {
      media = expectArray(appearance.media!, `${path}.media`, 8).map(
        (item, mediaIndex) => {
          const mediaPath = `${path}.media[${mediaIndex}]`;
          const entry = expectObject(item, mediaPath);
          exactKeys(entry, mediaPath, ["type", "url"], ["sourceId"]);
          const type = expectEnum(
            entry.type!,
            `${mediaPath}.type`,
            APPEARANCE_MEDIA,
          );
          const url = expectUrl(entry.url!, `${mediaPath}.url`);
          const sourceId = "sourceId" in entry
            ? (() => {
                const target = expectString(
                  entry.sourceId!,
                  `${mediaPath}.sourceId`,
                  7,
                  27,
                );
                if (!SOURCE_ID.test(target) || !known.has(target)) {
                  failPacket(`${mediaPath}.sourceId`, "references an unknown source");
                }
                return target;
              })()
            : undefined;
          return { type, url, ...(sourceId === undefined ? {} : { sourceId }) };
        },
      );
    }
    const sourceIds = expectSourceIds(
      appearance.sourceIds!,
      `${path}.sourceIds`,
      known,
    );
    return {
      id,
      title,
      sourceIds,
      ...(venue === undefined ? {} : { venue }),
      ...(publishedAt === undefined ? {} : { publishedAt }),
      ...(participants === undefined ? {} : { participants }),
      ...(summary === undefined ? {} : { summary }),
      ...(media === undefined ? {} : { media }),
    };
  });
}

function parseRelations(
  value: JsonValue,
  known: ReadonlySet<string>,
): PersonIndexRelation[] {
  const relations = expectArray(value, "relations", 200);
  const ids = new Set<string>();
  return relations.map((raw, index) => {
    const path = `relations[${index}]`;
    const relation = expectObject(raw, path);
    exactKeys(
      relation,
      path,
      ["id", "kind", "target", "targetName", "sourceIds"],
      ["targetKind", "note"],
    );
    const id = expectIdentifier(relation.id!, `${path}.id`, "rel");
    if (ids.has(id)) failPacket(`${path}.id`, "duplicates another relation id");
    ids.add(id);
    const kind = expectEnum(relation.kind!, `${path}.kind`, RELATION_KINDS);
    const target = expectString(relation.target!, `${path}.target`, 2, 64);
    if (!HANDLE.test(target)) {
      failPacket(`${path}.target`, "must be a normalized handle");
    }
    const targetName = expectString(
      relation.targetName!,
      `${path}.targetName`,
      1,
      200,
    );
    const targetKind = "targetKind" in relation
      ? expectEnum(
          relation.targetKind!,
          `${path}.targetKind`,
          RELATION_TARGET_KINDS,
        )
      : undefined;
    const note = "note" in relation
      ? expectString(relation.note!, `${path}.note`, 1, 500)
      : undefined;
    const sourceIds = expectSourceIds(
      relation.sourceIds!,
      `${path}.sourceIds`,
      known,
    );
    return {
      id,
      kind,
      target,
      targetName,
      sourceIds,
      ...(targetKind === undefined ? {} : { targetKind }),
      ...(note === undefined ? {} : { note }),
    };
  });
}

/** Parse and validate a `soulscrape.person-index.v1` packet from unknown. */
export function parsePersonIndex(value: unknown): PersonIndex {
  rejectNonIJson(value);
  const packet = expectObject(value, "packet");
  exactKeys(
    packet,
    "packet",
    [
      "schemaVersion",
      "indexId",
      "generatedAt",
      "subject",
      "scope",
      "sources",
      "claims",
      "body",
      "provenance",
    ],
    ["timeline", "themes", "works", "appearances", "relations", "openQuestions"],
  );
  if (packet.schemaVersion !== PERSON_INDEX_SCHEMA_VERSION) {
    failPacket("schemaVersion", "unsupported schema");
  }
  const indexId = expectString(packet.indexId!, "indexId", 8, 68);
  if (!INDEX_ID.test(indexId)) {
    failPacket("indexId", "must match pidx-<slug>");
  }
  const generatedAt = expectDateTime(packet.generatedAt!, "generatedAt");
  const subject = parseSubject(packet.subject!);

  const scope = expectObject(packet.scope!, "scope");
  exactKeys(scope, "scope", ["asOf"], ["coverage"]);
  const asOf = expectDateTime(scope.asOf!, "scope.asOf");
  if (asOf > generatedAt) {
    failPacket("scope.asOf", "must not be later than generatedAt");
  }
  const coverage = "coverage" in scope
    ? expectStringList(scope.coverage!, "scope.coverage", 16, 80)
    : undefined;

  const sources = parseSources(packet.sources!);
  const sourceIds = new Set(sources.map((source) => source.id));
  for (const source of sources) {
    if (source.transcriptOf !== undefined && !sourceIds.has(source.transcriptOf)) {
      failPacket("sources", "transcriptOf references an unknown source");
    }
  }

  const claims = parseClaims(packet.claims!, sourceIds);
  const timeline = "timeline" in packet
    ? parseTimeline(packet.timeline!, sourceIds)
    : undefined;
  const themes = "themes" in packet
    ? parseThemes(packet.themes!, sourceIds)
    : undefined;
  const works = "works" in packet
    ? parseWorks(packet.works!, sourceIds)
    : undefined;
  const appearances = "appearances" in packet
    ? parseAppearances(packet.appearances!, sourceIds)
    : undefined;
  const relations = "relations" in packet
    ? parseRelations(packet.relations!, sourceIds)
    : undefined;
  const openQuestions = "openQuestions" in packet
    ? expectStringList(packet.openQuestions!, "openQuestions", 40, 500)
    : undefined;

  const body = expectString(packet.body!, "body", 200, 200_000);

  const provenance = expectObject(packet.provenance!, "provenance");
  exactKeys(
    provenance,
    "provenance",
    ["tool"],
    ["method", "model", "contributors"],
  );
  const tool = expectString(provenance.tool!, "provenance.tool", 1, 100);
  const method = "method" in provenance
    ? expectString(provenance.method!, "provenance.method", 1, 160)
    : undefined;
  const model = "model" in provenance
    ? expectString(provenance.model!, "provenance.model", 1, 160)
    : undefined;
  const contributors = "contributors" in provenance
    ? expectStringList(
        provenance.contributors!,
        "provenance.contributors",
        8,
        200,
      )
    : undefined;

  return {
    schemaVersion: PERSON_INDEX_SCHEMA_VERSION,
    indexId,
    generatedAt,
    subject,
    scope: {
      asOf,
      ...(coverage === undefined ? {} : { coverage }),
    },
    sources,
    claims,
    ...(timeline === undefined ? {} : { timeline }),
    ...(themes === undefined ? {} : { themes }),
    ...(works === undefined ? {} : { works }),
    ...(appearances === undefined ? {} : { appearances }),
    ...(relations === undefined ? {} : { relations }),
    ...(openQuestions === undefined ? {} : { openQuestions }),
    body,
    provenance: {
      tool,
      ...(method === undefined ? {} : { method }),
      ...(model === undefined ? {} : { model }),
      ...(contributors === undefined ? {} : { contributors }),
    },
  };
}
