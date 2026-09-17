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

export type PublicGraphAppearance = Readonly<{
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
  /** Deterministic identity — digest of from/to/kind/origin/start — for delta dedup. */
  id: string;
  from: string;
  to: string;
  kind: string;
  origin: "relation" | "timeline" | "appearance";
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
 * the event title), and "appearance" edges are co-presence edges derived
 * from bound appearance participants (`kind` is `appeared_with`). So work
 * history and interview co-presence are traversable without pretending a
 * dated event or a shared stage is a hand-authored relation.
 */
export async function corpusGraph(rows: readonly PublicGraphRow[]): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  const nodes = new Map<string, GraphNode>();
  const edges: Omit<GraphEdge, "id">[] = [];

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
    for (const appearance of row.appearances ?? []) {
      for (const participant of appearance.participantHandles) {
        // Co-presence edges resolve by slug only — participants carry no
        // QID — and skip self-loops when a packet binds its own subject.
        if (participant.handle === row.handle) continue;
        let to = `${row.username}/${participant.handle}`;
        if (!nodes.has(to)) to = `slug:${participant.handle}`;
        if (!nodes.has(to)) {
          nodes.set(to, {
            id: to,
            kind: "external",
            handle: participant.handle,
            displayName: participant.name,
          });
        }
        edges.push({
          from,
          to,
          kind: "appeared_with",
          origin: "appearance",
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
      id: await edgeId(edge.from, edge.to, edge.kind, edge.origin, edge.start, edge.note),
    })),
  );
  return { nodes: [...nodes.values()], edges: identified };
}

function externalId(relation: PublicGraphRelation): string {
  return relation.targetWikidataId === undefined ? `slug:${relation.target}` : `qid:${relation.targetWikidataId}`;
}

async function sha256Hex(material: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(material));
  return [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, "0")).join("");
}

/** Deterministic edge identity for delta dedup — no randomness, no order. */
async function edgeId(
  from: string,
  to: string,
  kind: string,
  origin: string,
  start: string | undefined,
  note: string | undefined,
): Promise<string> {
  const digest = await sha256Hex([from, to, kind, origin, start ?? "", note ?? ""].join(""));
  return `edge-${digest.slice(0, 16)}`;
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
