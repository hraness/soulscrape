import { parseSoulscrapeProfileUrl } from "../../skills/soulscrape/scripts/people-ontology";
import {
  parsePublicProfileIndex, personIndexDigest, type PublicProfileIndex, type PersonIndexSource,
} from "../../skills/soulscrape/scripts/person-index";
import { canonicalBytes, canonicalText, sha256Hex, strictJsonParse } from "../../skills/soulscrape/scripts/source-packet";

export const KNOWLEDGE_INDEX_VERSION = "soulscrape.knowledge-index.v1" as const;
export const KNOWLEDGE_INPUT_MAX_BYTES = 16 * 1024 * 1024;
export const KNOWLEDGE_MAX_PUBLICATIONS = 64;
export const KNOWLEDGE_MAX_RECORDS = 16_384;
const MAX_PACKET_BYTES = 1024 * 1024;
const MAX_OUTPUT_BYTES = 32 * 1024 * 1024;
const OMITTED = ["body", "themes", "works", "openQuestions", "unboundTimeline", "unboundParticipants"] as const;
type SubjectKind = "person" | "organization" | "product" | "unknown";
type Binding = "publisher-asserted-qid" | "publisher-scoped-profile" | "publisher-scoped-target";
type Origin = "relation" | "timeline" | "appearance";

export type KnowledgeAttribution = Readonly<{ profileUrl: string; packetDigest: string; revision: number }>;
export type KnowledgeCitation = Readonly<{ resourceId: string; sourceId: string }>;
export type KnowledgeSubject = {
  id: string;
  kind: SubjectKind;
  binding: Binding;
  wikidataId?: string;
  profileUrls: string[];
  labels: { text: string; attribution: KnowledgeAttribution; origin: "subject" | Origin; recordId?: string }[];
};
export type KnowledgeSource = {
  id: string;
  url: string;
  occurrences: { attribution: KnowledgeAttribution; source: PersonIndexSource }[];
};
export type KnowledgeClaim = Readonly<{
  id: string; recordId: string; subjectId: string; kind: string; text: string; asOf: string;
  attribution: KnowledgeAttribution; citations: KnowledgeCitation[];
}>;
export type KnowledgeRelation = Readonly<{
  id: string; recordId: string; from: string; to: string; kind: string; origin: Origin;
  resolution: "publisher-handle" | "publisher-asserted-qid" | "unresolved";
  attribution: KnowledgeAttribution; citations: KnowledgeCitation[];
  targetHandle: string; targetKind?: string; targetWikidataId?: string;
  note?: string; start?: string; end?: string;
}>;
export type KnowledgePublication = KnowledgeAttribution & Readonly<{
  username: string; handle: string; displayName: string; subjectKind: "person" | "organization" | "product";
  subjectId: string; generatedAt: string; asOf: string;
}>;
export type KnowledgeIndex = Readonly<{
  schemaVersion: typeof KNOWLEDGE_INDEX_VERSION;
  scope: "supplied-publications";
  authority: "unasserted";
  digest: string;
  publications: KnowledgePublication[];
  subjects: KnowledgeSubject[];
  sources: KnowledgeSource[];
  claims: KnowledgeClaim[];
  relations: KnowledgeRelation[];
  identityConflicts: { wikidataId: string; subjectIds: string[] }[];
  omittedCollections: typeof OMITTED;
}>;
type Input = { attribution: KnowledgeAttribution; username: string; packet: PublicProfileIndex };
type Target = { target: string; targetName: string; targetKind?: string; targetWikidataId?: string };

function compare(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function key(prefix: string, material: readonly unknown[]): string {
  return `${prefix}-${sha256Hex(canonicalBytes([KNOWLEDGE_INDEX_VERSION, ...material]))}`;
}

export function knowledgeResourceKey(url: string): string {
  return key("resource", ["url", canonicalKnowledgeSourceUrl(url)]);
}

export function canonicalKnowledgeSourceUrl(value: string): string {
  if (typeof value !== "string" || value.length > 4096) throw new RangeError("Invalid source URL.");
  const url = new URL(value);
  if (!/^https?:$/u.test(url.protocol) || url.username || url.password) throw new RangeError("Invalid source URL.");
  if (url.hostname === "youtu.be" && /^\/[A-Za-z0-9_-]+$/u.test(url.pathname)) {
    const id = url.pathname.slice(1);
    url.hostname = "www.youtube.com";
    url.pathname = "/watch";
    url.search = `?v=${id}`;
  }
  if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname) && url.pathname === "/watch") {
    const ids = url.searchParams.getAll("v");
    if (ids.length === 1 && /^[A-Za-z0-9_-]+$/u.test(ids[0]!)) {
      url.hostname = "www.youtube.com";
      url.search = `?v=${ids[0]}`;
    }
  }
  const parameters = [...url.searchParams].filter(([name]) => !/^utm_/iu.test(name) && name !== "fbclid" && name !== "gclid");
  parameters.sort(([left], [right]) => compare(left, right));
  url.search = parameters.length === 0 ? "" : `?${new URLSearchParams(parameters)}`;
  url.hash = "";
  return url.href;
}

function parseInput(serialized: string): Input[] {
  if (typeof serialized !== "string" || serialized.length > KNOWLEDGE_INPUT_MAX_BYTES
    || new TextEncoder().encode(serialized).byteLength > KNOWLEDGE_INPUT_MAX_BYTES) throw new RangeError("Knowledge input exceeds its byte limit.");
  let depth = 0;
  let quoted = false;
  for (let index = 0; index < serialized.length; index++) {
    const character = serialized[index];
    if (quoted && character === "\\") { index++; continue; }
    if (character === '"') { quoted = !quoted; continue; }
    if (!quoted && (character === "[" || character === "{")) {
      if (++depth > 64) throw new RangeError("Knowledge input exceeds its nesting limit.");
    }
    if (!quoted && (character === "]" || character === "}")) depth--;
  }
  const value = strictJsonParse(serialized);
  if (!Array.isArray(value) || value.length > KNOWLEDGE_MAX_PUBLICATIONS) throw new RangeError("Invalid publication count.");
  const seen = new Set<string>();
  let records = 0;
  return value.map(raw => {
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)
      || Object.keys(raw).sort().join(",") !== "packet,packetDigest,profileUrl,revision") throw new RangeError("Invalid publication fields.");
    const locator = parseSoulscrapeProfileUrl(raw.profileUrl);
    if (locator === null || seen.has(locator.profileUrl) || typeof raw.revision !== "number"
      || !Number.isSafeInteger(raw.revision) || raw.revision < 1) throw new RangeError("Invalid or duplicate publication.");
    if (canonicalBytes(raw.packet).byteLength > MAX_PACKET_BYTES) throw new RangeError("Publication packet exceeds its byte limit.");
    const packet = parsePublicProfileIndex(raw.packet);
    if (packet.subject.handle !== locator.handle || raw.packetDigest !== personIndexDigest(packet)) throw new RangeError("Publication does not match its packet.");
    records += packet.sources.length + packet.claims.length + (packet.relations?.length ?? 0)
      + (packet.timeline?.length ?? 0) + (packet.appearances ?? []).reduce((total, item) => total + (item.participantHandles?.length ?? 0), 0);
    if (records > KNOWLEDGE_MAX_RECORDS) throw new RangeError("Knowledge input exceeds its record limit.");
    seen.add(locator.profileUrl);
    return { attribution: { profileUrl: locator.profileUrl, packetDigest: raw.packetDigest as string, revision: raw.revision },
      username: locator.username, packet };
  }).sort((left, right) => compare(left.attribution.profileUrl, right.attribution.profileUrl));
}

export function buildKnowledgeIndex(serialized: string): KnowledgeIndex {
  const inputs = parseInput(serialized);
  const subjects = new Map<string, KnowledgeSubject>();
  const sources = new Map<string, KnowledgeSource>();
  const profiles = new Map(inputs.map(input => [`${input.username}/${input.packet.subject.handle}`, input]));
  const claims: KnowledgeClaim[] = [];
  const relations: KnowledgeRelation[] = [];
  const relationIds = new Set<string>();
  const publications: KnowledgePublication[] = [];

  function subject(username: string, handle: string, kind: SubjectKind, wikidataId?: string, profile = false): KnowledgeSubject {
    const shared = kind !== "unknown" && wikidataId !== undefined;
    const id = key("subject", shared ? ["qid", kind, wikidataId] : ["publisher", username, kind, handle, wikidataId ?? null]);
    const binding = shared ? "publisher-asserted-qid" : profile ? "publisher-scoped-profile" : "publisher-scoped-target";
    let result = subjects.get(id);
    if (result === undefined) {
      result = { id, kind, binding, ...(wikidataId === undefined ? {} : { wikidataId }), profileUrls: [], labels: [] };
      subjects.set(id, result);
    } else if (profile && result.binding === "publisher-scoped-target") result.binding = binding;
    return result;
  }

  function ownSubject(input: Input): KnowledgeSubject {
    const { packet, username } = input;
    return subject(username, packet.subject.handle, packet.subject.kind, packet.subject.identity?.wikidataId, true);
  }

  function targetSubject(input: Input, target: Target): { subject: KnowledgeSubject; resolution: KnowledgeRelation["resolution"] } {
    const kind = target.targetKind === "person" || target.targetKind === "organization" || target.targetKind === "product"
      ? target.targetKind : "unknown";
    if (target.targetWikidataId !== undefined && kind !== "unknown") {
      return { subject: subject(input.username, target.target, kind, target.targetWikidataId), resolution: "publisher-asserted-qid" };
    }
    const local = profiles.get(`${input.username}/${target.target}`);
    if (local !== undefined && (kind === "unknown" ? local.packet.subject.kind !== "product" : local.packet.subject.kind === kind)
      && (target.targetWikidataId === undefined || local.packet.subject.identity?.wikidataId === target.targetWikidataId)) {
      return { subject: ownSubject(local), resolution: "publisher-handle" };
    }
    return { subject: subject(input.username, target.target, kind, target.targetWikidataId), resolution: "unresolved" };
  }

  for (const input of inputs) {
    const { packet, attribution, username } = input;
    const node = ownSubject(input);
    node.profileUrls.push(attribution.profileUrl);
    node.labels.push({ text: packet.subject.displayName, attribution, origin: "subject" });
    publications.push({ ...attribution, username, handle: packet.subject.handle, displayName: packet.subject.displayName,
      subjectKind: packet.subject.kind, subjectId: node.id, generatedAt: packet.generatedAt, asOf: packet.scope.asOf });
    const sourceKeys = new Map<string, string>();
    for (const source of packet.sources) {
      const url = canonicalKnowledgeSourceUrl(source.url);
      const id = knowledgeResourceKey(url);
      const resource = sources.get(id) ?? { id, url, occurrences: [] };
      resource.occurrences.push({ attribution, source });
      sources.set(id, resource);
      sourceKeys.set(source.id, id);
    }
    const citations = (ids: readonly string[]) => ids.map(sourceId => ({ sourceId, resourceId: sourceKeys.get(sourceId)! }))
      .sort((left, right) => compare(left.sourceId, right.sourceId));
    for (const claim of packet.claims) {
      claims.push({ id: key("claim", [attribution.profileUrl, claim.id]), recordId: claim.id, subjectId: node.id,
        kind: claim.kind, text: claim.text, asOf: packet.scope.asOf, attribution, citations: citations(claim.sourceIds) });
    }
    function addRelation(origin: Origin, recordId: string, kind: string, target: Target, ids: readonly string[],
      detail: { note?: string; start?: string; end?: string }) {
      const resolved = targetSubject(input, target);
      resolved.subject.labels.push({ text: target.targetName, attribution, origin, recordId });
      const id = key("relation", [attribution.profileUrl, origin, recordId, origin === "appearance" ? target.target : null]);
      if (relationIds.has(id)) return;
      relationIds.add(id);
      relations.push({ id, recordId, from: node.id, to: resolved.subject.id, kind, origin, resolution: resolved.resolution,
        attribution, citations: citations(ids), targetHandle: target.target,
        ...(target.targetKind === undefined ? {} : { targetKind: target.targetKind }),
        ...(target.targetWikidataId === undefined ? {} : { targetWikidataId: target.targetWikidataId }), ...detail });
    }
    for (const relation of packet.relations ?? []) {
      addRelation("relation", relation.id, relation.kind, { target: relation.target, targetName: relation.targetName,
        ...(relation.targetKind === undefined ? {} : { targetKind: relation.targetKind }),
        ...(relation.targetWikidataId === undefined ? {} : { targetWikidataId: relation.targetWikidataId }) }, relation.sourceIds,
      { ...(relation.note === undefined ? {} : { note: relation.note }), ...(relation.start === undefined ? {} : { start: relation.start }),
        ...(relation.end === undefined ? {} : { end: relation.end }) });
    }
    for (const event of packet.timeline ?? []) {
      if (event.organizationHandle === undefined) continue;
      addRelation("timeline", event.id, event.kind, { target: event.organizationHandle,
        targetName: event.organization ?? event.organizationHandle, targetKind: "organization" }, event.sourceIds,
      { note: event.title, start: event.date, ...(event.end === undefined ? {} : { end: event.end }) });
    }
    for (const appearance of packet.appearances ?? []) {
      for (const participant of appearance.participantHandles ?? []) {
        if (participant.handle === packet.subject.handle) continue;
        addRelation("appearance", appearance.id, "appeared_with", { target: participant.handle, targetName: participant.name },
          appearance.sourceIds, { note: appearance.title, ...(appearance.publishedAt === undefined ? {} : { start: appearance.publishedAt }) });
      }
    }
  }
  const byId = <T extends { id: string }>(items: Iterable<T>): T[] => [...items].sort((left, right) => compare(left.id, right.id));
  const qids = new Map<string, KnowledgeSubject[]>();
  for (const node of subjects.values()) {
    node.profileUrls.sort(compare);
    node.labels.sort((left, right) => compare(canonicalText(left), canonicalText(right)));
    if (node.wikidataId !== undefined && node.kind !== "unknown") {
      const bindings = qids.get(node.wikidataId) ?? [];
      bindings.push(node);
      qids.set(node.wikidataId, bindings);
    }
  }
  for (const resource of sources.values()) resource.occurrences.sort((left, right) =>
    compare(left.attribution.profileUrl, right.attribution.profileUrl) || compare(left.source.id, right.source.id));
  const identityConflicts = [...qids].filter(([, bindings]) => new Set(bindings.map(node => node.kind)).size > 1)
    .map(([wikidataId, bindings]) => ({ wikidataId, subjectIds: bindings.map(node => node.id).sort(compare) }))
    .sort((left, right) => compare(left.wikidataId, right.wikidataId));
  const result = { schemaVersion: KNOWLEDGE_INDEX_VERSION, scope: "supplied-publications" as const, authority: "unasserted" as const,
    publications, subjects: byId(subjects.values()), sources: byId(sources.values()), claims: byId(claims), relations: byId(relations),
    identityConflicts, omittedCollections: OMITTED };
  const bytes = canonicalBytes(result);
  if (bytes.byteLength > MAX_OUTPUT_BYTES) throw new RangeError("Knowledge projection exceeds its byte limit.");
  return { ...result, digest: sha256Hex(bytes) };
}
