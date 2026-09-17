/**
 * Corpus enumeration and graph projection shared by `/api/v1/index.json`
 * and `/api/v1/graph.json`. Rows come from the `people:publicGraph` Convex
 * query — summary fields plus each live packet's relation edges.
 */

import { createProfileResolver } from "./profile-identity";

export const GRAPH_PROJECTION_VERSION = "soulscrape.graph.v2";
export const CORPUS_DIGEST_VERSION = "soulscrape.corpus.v2";

export type PublicGraphRelation = Readonly<{
  id?: string;
  target: string;
  kind: string;
  note?: string;
  start?: string;
  end?: string;
  targetWikidataId?: string;
  targetKind?: string;
  targetName?: string;
  sourceIds?: readonly string[];
}>;

export type PublicGraphTimelineEvent = Readonly<{
  id?: string;
  kind: string;
  date: string;
  title: string;
  end?: string;
  organization?: string;
  organizationHandle: string;
  sourceIds?: readonly string[];
}>;

export type PublicGraphAppearance = Readonly<{
  id?: string;
  title: string;
  publishedAt?: string;
  participantHandles: readonly Readonly<{ name: string; handle: string }>[];
  sourceIds?: readonly string[];
}>;

export type PublicGraphTheme = Readonly<{
  kind: string;
  title: string;
  status?: string;
}>;

export type PublicGraphRow = Readonly<{
  username: string;
  handle: string;
  displayName: string;
  summary: string;
  packetDigest: string;
  revision: number;
  publishedAtMs: number;
  updatedAtMs: number;
  subjectKind?: string;
  wikidataId?: string;
  relations: readonly PublicGraphRelation[];
  // Optional: an older Convex deployment may not project these collections.
  timeline?: readonly PublicGraphTimelineEvent[];
  appearances?: readonly PublicGraphAppearance[];
  themes?: readonly PublicGraphTheme[];
  openQuestions?: readonly string[];
}>;

export type PublicProfileGraphRow = Pick<PublicGraphRow,
  "username" | "handle" | "displayName" | "subjectKind" | "wikidataId" | "relations" | "timeline" | "appearances"
>;

/** One entry per live profile — the corpus enumeration shape. */
export function corpusIndexEntries(rows: readonly PublicGraphRow[]) {
  return rows.map(row => ({
    username: row.username,
    handle: row.handle,
    displayName: row.displayName,
    summary: row.summary,
    ...(row.subjectKind === undefined ? {} : { subjectKind: row.subjectKind }),
    ...(row.wikidataId === undefined ? {} : { wikidataId: row.wikidataId }),
    packetDigest: row.packetDigest,
    revision: row.revision,
    publishedAtMs: row.publishedAtMs,
    updatedAtMs: row.updatedAtMs,
  }));
}

export type GraphNode = Readonly<{
  id: string;
  kind: "profile" | "external";
  handle: string;
  displayName: string;
  username?: string;
  subjectKind?: string;
  wikidataId?: string;
  binding?: "publisher-asserted-qid" | "publisher-scoped-slug";
}>;

export type GraphEdge = Readonly<{
  /** Framed source/origin/record identity; legacy rows fall back to edge material. */
  id: string;
  from: string;
  to: string;
  kind: string;
  origin: "relation" | "timeline" | "appearance";
  recordId?: string;
  targetHandle: string;
  targetWikidataId?: string;
  targetKind?: string;
  resolution: "publisher-handle" | "publisher-asserted-qid" | "external";
  note?: string;
  start?: string;
  end?: string;
  sourceIds?: readonly string[];
}>;

/**
 * The relation graph across the bounded live profile context. Profile nodes
 * use `username/handle`; external nodes group publisher-asserted QIDs or
 * publisher-scoped slugs and separate explicitly different target kinds.
 * Same-publisher resolution requires known kind and an unambiguous QID or
 * handle satisfying supplied identity constraints. Ambiguity stays external.
 * Only sourceRows' outbound edges and their source and target nodes are
 * emitted; the indexed identity resolver also governs rendered-page links.
 *
 * Edges carry `origin`: "relation" edges are the packet's authored relation
 * claims; "timeline" edges are derived from organization-bound timeline
 * events (`kind` is the event kind — role, education, founded — and `note`
 * the event title), and "appearance" edges are co-presence edges derived
 * from bound appearance participants (`kind` is `appeared_with`). So work
 * history and interview co-presence are traversable without pretending a
 * dated event or a shared stage is a hand-authored relation.
 */
export async function corpusGraph(
  rows: readonly PublicGraphRow[],
  sourceRows: readonly PublicGraphRow[] = rows,
): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  const nodes = new Map<string, GraphNode>();
  const edges: Omit<GraphEdge, "id">[] = [];
  const resolveProfile = createProfileResolver(rows);

  function includeProfile(row: PublicGraphRow) {
    const id = `${row.username}/${row.handle}`;
    nodes.set(id, {
      id,
      kind: "profile",
      handle: row.handle,
      displayName: row.displayName,
      username: row.username,
      ...(row.subjectKind === undefined ? {} : { subjectKind: row.subjectKind }),
      ...(row.wikidataId === undefined ? {} : { wikidataId: row.wikidataId }),
    });
    return id;
  }

  function resolve(username: string, target: Pick<PublicGraphRelation, "target" | "targetWikidataId" | "targetKind" | "targetName">): Pick<GraphEdge, "to" | "resolution"> {
    const match = resolveProfile(username, target);
    if (match !== null) return { to: includeProfile(match.profile), resolution: match.resolution };
    const id = externalId(username, target);
    const candidate: GraphNode = {
      id,
      kind: "external",
      username,
      handle: target.target,
      displayName: target.targetName ?? target.target,
      binding: target.targetWikidataId === undefined ? "publisher-scoped-slug" : "publisher-asserted-qid",
      ...(target.targetKind === undefined ? {} : { subjectKind: target.targetKind }),
      ...(target.targetWikidataId === undefined ? {} : { wikidataId: target.targetWikidataId }),
    };
    const existing = nodes.get(id);
    if (existing === undefined || JSON.stringify(candidate) < JSON.stringify(existing)) nodes.set(id, candidate);
    return { to: id, resolution: "external" };
  }

  for (const row of sourceRows) includeProfile(row);

  for (const row of sourceRows) {
    const from = `${row.username}/${row.handle}`;
    for (const relation of row.relations) {
      // Same-publisher resolution: compatible unique slug, or a unique
      // matching subject QID; ambiguous QID bindings remain external.
      const target = resolve(row.username, relation);
      edges.push({
        from,
        ...target,
        kind: relation.kind,
        origin: "relation",
        targetHandle: relation.target,
        ...(relation.id === undefined ? {} : { recordId: relation.id }),
        ...(relation.targetWikidataId === undefined ? {} : { targetWikidataId: relation.targetWikidataId }),
        ...(relation.targetKind === undefined ? {} : { targetKind: relation.targetKind }),
        ...(relation.note === undefined ? {} : { note: relation.note }),
        ...(relation.start === undefined ? {} : { start: relation.start }),
        ...(relation.end === undefined ? {} : { end: relation.end }),
        ...(relation.sourceIds === undefined ? {} : { sourceIds: relation.sourceIds }),
      });
    }
    for (const event of row.timeline ?? []) {
      // Timeline org bindings resolve by compatible slug — no event QID —
      // and share publisher-scoped organization stubs with relation targets.
      const target = resolve(row.username, {
        target: event.organizationHandle,
        targetKind: "organization",
        ...(event.organization === undefined ? {} : { targetName: event.organization }),
      });
      edges.push({
        from,
        ...target,
        kind: event.kind,
        origin: "timeline",
        targetHandle: event.organizationHandle,
        targetKind: "organization",
        ...(event.id === undefined ? {} : { recordId: event.id }),
        note: event.title,
        start: event.date,
        ...(event.end === undefined ? {} : { end: event.end }),
        ...(event.sourceIds === undefined ? {} : { sourceIds: event.sourceIds }),
      });
    }
    for (const appearance of row.appearances ?? []) {
      for (const participant of appearance.participantHandles) {
        // Co-presence edges resolve by slug only — participants carry no
        // QID — and skip self-loops when a packet binds its own subject.
        if (participant.handle === row.handle) continue;
        const target = resolve(row.username, { target: participant.handle, targetName: participant.name });
        edges.push({
          from,
          ...target,
          kind: "appeared_with",
          origin: "appearance",
          targetHandle: participant.handle,
          ...(appearance.id === undefined ? {} : { recordId: appearance.id }),
          note: appearance.title,
          ...(appearance.publishedAt === undefined ? {} : { start: appearance.publishedAt }),
          ...(appearance.sourceIds === undefined ? {} : { sourceIds: appearance.sourceIds }),
        });
      }
    }
  }
  // Deterministic identities, computed in one parallel digest pass.
  const identified = await Promise.all(
    edges.map(async edge => ({
      ...edge,
      id: await edgeId(edge),
    })),
  );
  return { nodes: [...nodes.values()], edges: identified };
}

function externalId(username: string, target: Pick<PublicGraphRelation, "target" | "targetWikidataId" | "targetKind">): string {
  const binding = target.targetWikidataId === undefined ? `slug:${username}/${target.target}` : `qid:${username}/${target.targetWikidataId}`;
  return target.targetKind === undefined ? binding : `${binding}:${target.targetKind}`;
}

async function sha256Hex(material: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
  return [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, "0")).join("");
}

/** Deterministic edge identity for delta dedup — no randomness, no order. */
async function edgeId(edge: Omit<GraphEdge, "id">): Promise<string> {
  const identity = edge.recordId === undefined ? [
    GRAPH_PROJECTION_VERSION,
    "material",
    edge.from,
    edge.to,
    edge.kind,
    edge.origin,
    edge.targetHandle,
    edge.targetWikidataId ?? null,
    edge.targetKind ?? null,
    edge.resolution,
    edge.start ?? null,
    edge.end ?? null,
    edge.note ?? null,
    edge.sourceIds === undefined ? null : [...edge.sourceIds].sort(),
  ] : [
    GRAPH_PROJECTION_VERSION,
    "record",
    edge.from,
    edge.origin,
    edge.recordId,
    edge.origin === "appearance" ? edge.targetHandle : null,
  ];
  const digest = await sha256Hex(JSON.stringify(identity));
  return `edge-${digest}`;
}

/** Every theme across the live corpus — the essence facet feed. */
export function corpusThemes(rows: readonly PublicGraphRow[]) {
  const themes: { subject: string; kind: string; title: string; status?: string }[] = [];
  for (const row of rows) {
    for (const theme of row.themes ?? []) {
      themes.push({
        subject: `${row.username}/${row.handle}`,
        kind: theme.kind,
        title: theme.title,
        ...(theme.status === undefined ? {} : { status: theme.status }),
      });
    }
  }
  themes.sort((a, b) => a.title.localeCompare(b.title) || a.subject.localeCompare(b.subject));
  return themes;
}

/** Every open question across the live corpus — the corpus's admitted gaps. */
export function corpusQuestions(rows: readonly PublicGraphRow[]) {
  const questions: { subject: string; question: string }[] = [];
  for (const row of rows) {
    for (const question of row.openQuestions ?? []) {
      questions.push({ subject: `${row.username}/${row.handle}`, question });
    }
  }
  questions.sort((a, b) => a.question.localeCompare(b.question) || a.subject.localeCompare(b.subject));
  return questions;
}

/**
 * Row delta: rows updated at or after `sinceMs`. Consumers replace each
 * changed source's outbound set, including cleared sets; unchanged sources'
 * edges are not resent. Full reconciliation covers deletions and re-resolution.
 * Returns all supplied rows when `raw` is absent; throws on invalid input so
 * routes answer 400. This timestamp filter is not a gap-free sync cursor.
 */
export function sinceFilter(
  rows: readonly PublicGraphRow[],
  raw: string | null,
): PublicGraphRow[] {
  if (raw === null) return [...rows];
  if (raw.length > 16 || !/^\d+$/u.test(raw)) {
    throw new RangeError("invalid since parameter");
  }
  const sinceMs = Number(raw);
  if (!Number.isSafeInteger(sinceMs)) {
    throw new RangeError("invalid since parameter");
  }
  return rows.filter(row => row.updatedAtMs >= sinceMs);
}

/**
 * A stable digest over the returned live rows: framed, sorted publisher
 * locators, packet digests, revisions and publication/update timestamps.
 * Covers the bounded query result, not omitted rows or a deletion ledger.
 */
export async function corpusDigest(rows: readonly PublicGraphRow[]): Promise<string> {
  const records = rows.map(row => JSON.stringify([
    row.username,
    row.handle,
    row.packetDigest,
    row.revision,
    row.publishedAtMs,
    row.updatedAtMs,
  ])).sort();
  return sha256Hex(JSON.stringify([CORPUS_DIGEST_VERSION, records]));
}
