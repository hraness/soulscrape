/**
 * Corpus enumeration and graph projection shared by `/api/v1/index.json`
 * and `/api/v1/graph.json`. Rows come from the `people:publicGraph` Convex
 * query — summary fields plus each live packet's relation edges.
 */

export type PublicGraphRelation = Readonly<{
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
  kind: string;
  date: string;
  title: string;
  end?: string;
  organization?: string;
  organizationHandle: string;
  sourceIds?: readonly string[];
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
  // Optional: an older Convex deployment may not project timeline events.
  timeline?: readonly PublicGraphTimelineEvent[];
}>;

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
}>;

export type GraphEdge = Readonly<{
  from: string;
  to: string;
  kind: string;
  origin: "relation" | "timeline";
  note?: string;
  start?: string;
  end?: string;
  sourceIds?: readonly string[];
}>;

/**
 * The relation graph across all publishers' live profiles. Profile nodes are
 * `username/handle`; unindexed targets become external stub nodes keyed by
 * their Wikidata id (`qid:Q…`) when bound, else by slug (`slug:…`) — so two
 * packets spelling the same entity differently still merge when a QID joins
 * them. An edge resolves to a profile node only when the same publisher
 * serves the target handle or the target's QID equals that profile's
 * subject QID — the same resolution rule the rendered pages apply.
 *
 * Edges carry `origin`: "relation" edges are the packet's authored relation
 * claims; "timeline" edges are derived from organization-bound timeline
 * events (`kind` is the event kind — role, education, founded — and `note`
 * the event title), so work history is traversable without pretending a
 * dated event is a hand-authored relation.
 */
export function corpusGraph(rows: readonly PublicGraphRow[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  for (const row of rows) {
    nodes.set(`${row.username}/${row.handle}`, {
      id: `${row.username}/${row.handle}`,
      kind: "profile",
      handle: row.handle,
      displayName: row.displayName,
      username: row.username,
      ...(row.subjectKind === undefined ? {} : { subjectKind: row.subjectKind }),
      ...(row.wikidataId === undefined ? {} : { wikidataId: row.wikidataId }),
    });
  }

  for (const row of rows) {
    const from = `${row.username}/${row.handle}`;
    for (const relation of row.relations) {
      // Same-publisher resolution: slug equality, or the edge's QID equals
      // another live profile's subject QID.
      let to = `${row.username}/${relation.target}`;
      if (!nodes.has(to)) {
        const entityMatch = rows.find(
          other => other.username === row.username && other.wikidataId !== undefined && other.wikidataId === relation.targetWikidataId,
        );
        to = entityMatch === undefined ? externalId(relation) : `${entityMatch.username}/${entityMatch.handle}`;
      }
      if (!nodes.has(to)) {
        nodes.set(to, {
          id: to,
          kind: "external",
          handle: relation.target,
          displayName: relation.targetName ?? relation.target,
          ...(relation.targetKind === undefined ? {} : { subjectKind: relation.targetKind }),
          ...(relation.targetWikidataId === undefined ? {} : { wikidataId: relation.targetWikidataId }),
        });
      }
      edges.push({
        from,
        to,
        kind: relation.kind,
        origin: "relation",
        ...(relation.note === undefined ? {} : { note: relation.note }),
        ...(relation.start === undefined ? {} : { start: relation.start }),
        ...(relation.end === undefined ? {} : { end: relation.end }),
        ...(relation.sourceIds === undefined ? {} : { sourceIds: relation.sourceIds }),
      });
    }
    for (const event of row.timeline ?? []) {
      // Timeline org bindings resolve by slug only — events carry no QID —
      // so an unindexed org still merges with slug-stub relation targets.
      let to = `${row.username}/${event.organizationHandle}`;
      if (!nodes.has(to)) {
        to = `slug:${event.organizationHandle}`;
      }
      if (!nodes.has(to)) {
        nodes.set(to, {
          id: to,
          kind: "external",
          handle: event.organizationHandle,
          displayName: event.organization ?? event.organizationHandle,
          subjectKind: "organization",
        });
      }
      edges.push({
        from,
        to,
        kind: event.kind,
        origin: "timeline",
        note: event.title,
        start: event.date,
        ...(event.end === undefined ? {} : { end: event.end }),
        ...(event.sourceIds === undefined ? {} : { sourceIds: event.sourceIds }),
      });
    }
  }
  return { nodes: [...nodes.values()], edges };
}

function externalId(relation: PublicGraphRelation): string {
  return relation.targetWikidataId === undefined ? `slug:${relation.target}` : `qid:${relation.targetWikidataId}`;
}

/**
 * Incremental-sync delta: rows updated at or after `sinceMs`. A graph delta
 * contains only the changed profiles' outbound edges — consumers merge it
 * into their stored graph; edges from unchanged profiles are not resent.
 * Returns null when `raw` is absent; throws on unparseable input so routes
 * can answer 400 rather than silently returning the full corpus.
 */
export function sinceFilter(
  rows: readonly PublicGraphRow[],
  raw: string | null,
): PublicGraphRow[] {
  if (raw === null) return [...rows];
  const sinceMs = Number(raw);
  if (!Number.isFinite(sinceMs) || sinceMs < 0) {
    throw new RangeError("invalid since parameter");
  }
  return rows.filter(row => row.updatedAtMs >= sinceMs);
}

/**
 * A stable digest over the live corpus — SHA-256 of the sorted packet
 * digests. Changes whenever any profile is published, revised, or withdrawn,
 * so agents can poll `index.json` and diff on one field.
 */
export async function corpusDigest(rows: readonly PublicGraphRow[]): Promise<string> {
  const material = rows
    .map(row => row.packetDigest)
    .sort()
    .join("\n");
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
  return [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, "0")).join("");
}
