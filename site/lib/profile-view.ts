import {
  parsePersonIndex,
  type PersonIndex,
  type PersonIndexSource,
} from "../../skills/soulscrape/scripts/person-index.ts";

import { siteUrl } from "./site";

export type StoredProfile = Readonly<{
  username: string;
  handle: string;
  packetDigest: string;
  revision: number;
  packet: PersonIndex;
  publishedAtMs: number;
  updatedAtMs: number;
}>;

/**
 * Convert a `people:getPublic` row to a stored profile. The packet was
 * validated at publish; re-parse anyway because the query boundary returns
 * `unknown` and a corrupt row must fail closed rather than render garbage.
 */
export function publicRowToProfile(row: unknown): StoredProfile | null {
  if (typeof row !== "object" || row === null || Array.isArray(row)) return null;
  const candidate = row as Record<string, unknown>;
  if (
    typeof candidate.username !== "string"
    || typeof candidate.handle !== "string"
    || typeof candidate.packetDigest !== "string"
    || typeof candidate.revision !== "number"
    || typeof candidate.publishedAtMs !== "number"
    || typeof candidate.updatedAtMs !== "number"
  ) return null;
  try {
    const packet = parsePersonIndex(candidate.packet);
    return {
      username: candidate.username,
      handle: candidate.handle,
      packetDigest: candidate.packetDigest,
      revision: candidate.revision,
      packet,
      publishedAtMs: candidate.publishedAtMs,
      updatedAtMs: candidate.updatedAtMs,
    };
  } catch {
    return null;
  }
}

export function profilePath(username: string, handle: string): string {
  return `/${username}/${handle}`;
}

export function profileCanonicalUrl(username: string, handle: string): string {
  return siteUrl(profilePath(username, handle));
}

export function profileTitle(profile: StoredProfile): string {
  return `${profile.packet.subject.displayName} — ${profile.username} · soulscrape`;
}

export function profileDescription(profile: StoredProfile): string {
  const summary = profile.packet.subject.summary.trim();
  return summary.length <= 300 ? summary : `${summary.slice(0, 297).trimEnd()}…`;
}

const RELATION_JSONLD_PROPS: Record<string, string | undefined> = {
  collaborated: "colleague",
  cofounder: "colleague",
  interviewed: "knows",
  interviewed_by: "knows",
  influenced: "knows",
  influenced_by: "knows",
  family: "relatedTo",
  other: "knows",
};

/**
 * Map a relation kind to its Schema.org property, honoring direction: the
 * property reads subject → target, so the same kind maps differently for a
 * person subject than an organization subject, and some kinds only apply when
 * the target has the matching kind. Returns undefined when no property fits.
 */
function relationJsonLdProp(
  subjectKind: string,
  relation: NonNullable<PersonIndex["relations"]>[number],
): string | undefined {
  const isOrgTarget = relation.targetKind === "organization";
  if (subjectKind === "organization") {
    switch (relation.kind) {
      case "founded_by": return isOrgTarget ? undefined : "founder";
      case "member": return "member";
      case "member_of": return isOrgTarget ? "memberOf" : undefined;
      case "employed": return isOrgTarget ? undefined : "employee";
      case "funded_by": return "funder";
      default: return undefined;
    }
  }
  switch (relation.kind) {
    case "employed_by": return isOrgTarget ? "worksFor" : undefined;
    case "member_of": return isOrgTarget ? "memberOf" : undefined;
    case "funded_by": return "funder";
    default: return isOrgTarget ? undefined : RELATION_JSONLD_PROPS[relation.kind];
  }
}

function relationEntity(
  profile: StoredProfile,
  liveHandles: ReadonlySet<string>,
  relation: NonNullable<PersonIndex["relations"]>[number],
): Record<string, unknown> {
  const isOrg = relation.targetKind === "organization";
  return {
    "@type": isOrg ? "Organization" : "Person",
    name: relation.targetName,
    ...(liveHandles.has(relation.target)
      ? { url: profileCanonicalUrl(profile.username, relation.target) }
      : {}),
  };
}

export function profileJsonLd(
  profile: StoredProfile,
  liveHandles: ReadonlySet<string> = new Set(),
): Record<string, unknown> {
  const packet = profile.packet;
  const subject = packet.subject;
  const sameAs = [
    subject.identity?.officialSite,
    subject.identity?.wikipedia,
    ...(subject.identity?.profiles ?? []),
    ...(subject.identity?.wikidataId !== undefined
      ? [`https://www.wikidata.org/wiki/${subject.identity.wikidataId}`]
      : []),
  ].filter((url): url is string => typeof url === "string");
  const related: Record<string, Record<string, unknown>[]> = {};
  for (const relation of packet.relations ?? []) {
    const prop = relationJsonLdProp(subject.kind, relation);
    if (prop === undefined) continue;
    const list = related[prop] ?? [];
    list.push(relationEntity(profile, liveHandles, relation));
    related[prop] = list;
  }
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: profileCanonicalUrl(profile.username, profile.handle),
    name: `${subject.displayName} — evidence index`,
    dateModified: packet.generatedAt,
    mainEntity: {
      "@type": subject.kind === "organization" ? "Organization" : "Person",
      name: subject.displayName,
      ...(subject.alsoKnownAs !== undefined && subject.alsoKnownAs.length > 0
        ? { alternateName: [...subject.alsoKnownAs] }
        : {}),
      description: profileDescription(profile),
      ...(sameAs.length > 0 ? { sameAs } : {}),
      ...related,
    },
    isPartOf: { "@type": "WebSite", name: "soulscrape", url: siteUrl("/") },
  };
}

export function sourcesById(packet: PersonIndex): Map<string, PersonIndexSource> {
  return new Map(packet.sources.map(source => [source.id, source]));
}

export function sortedTimeline(packet: PersonIndex) {
  return [...(packet.timeline ?? [])].sort((a, b) => a.date.localeCompare(b.date));
}

export function sortedAppearances(packet: PersonIndex) {
  return [...(packet.appearances ?? [])].sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
  );
}

export function sourceLabel(source: PersonIndexSource): string {
  const year = source.publishedAt?.slice(0, 4);
  return year === undefined ? source.publisher : `${source.publisher} · ${year}`;
}
