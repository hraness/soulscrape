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

export function profileJsonLd(profile: StoredProfile): Record<string, unknown> {
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
