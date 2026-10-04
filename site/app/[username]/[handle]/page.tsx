import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isPersonHandle } from "../../../../skills/soulscrape/scripts/person-index";

import {
  InboundRelation,
  PersonProfileFooter,
  PersonProfileHeader,
  PersonProfileMain,
} from "../../../components/person-profile";
import { SiteHeader, SkipLink } from "../../../components/site-header";
import { convexApi, convexClient } from "../../../lib/convex";
import { createProfileResolver, type ProfileResolver, type ProfileTarget } from "../../../lib/profile-identity";
import { buildKnowledgeIndex } from "../../../lib/knowledge-index";
import { parseKnowledgeRoute } from "../../../lib/knowledge-page";
import {
  profileCanonicalUrl,
  profileDescription,
  profileJsonLdText,
  profileTitle,
  publicRowToProfile,
  type StoredProfile,
} from "../../../lib/profile-view";
import { NOT_FOUND_TITLE } from "../../../lib/metadata";
import { parseUsernameSegment } from "../../../lib/routes";
import { loadRelatedProfiles } from "../../../lib/related-profiles";

export const dynamic = "force-dynamic";

type Params = { username: string; handle: string };

const loadProfile = cache(async (rawUsername: string, rawHandle: string): Promise<StoredProfile | null> => {
  const username = parseUsernameSegment(rawUsername);
  const handle = isPersonHandle(rawHandle) ? rawHandle : null;
  if (username === null || handle === null) return null;
  const convex = convexClient();
  if (convex === null) return null;
  const row = await convex.query(convexApi.peopleGetPublic, { username, handle });
  return publicRowToProfile(row);
});

/**
 * The publisher's bounded live identity and edge context resolves outbound
 * targets and the edges pointing back at this profile for "indexed in"
 * backlinks. One indexed resolver serves HTML, JSON-LD and graph semantics.
 * Only an unambiguous profile meeting the supplied kind/QID constraints
 * receives a link; incomplete older projections do not authorize joins.
 * A unique asserted QID can resolve an authored alias to its live handle.
 */
async function loadRelationGraph(
  username: string,
  handle: string,
): Promise<{ resolveProfile: ProfileResolver; inbound: InboundRelation[]; unavailable: boolean; inboundTruncated: boolean }> {
  const unavailable = () => ({ resolveProfile: createProfileResolver([]), inbound: [], unavailable: true, inboundTruncated: false });
  const convex = convexClient();
  if (convex === null) return unavailable();
  const rows = await loadRelatedProfiles(username, args => convex.query(convexApi.peopleRelationsByUsernamePage, args));
  if (rows === null) return unavailable();
  const resolveProfile = createProfileResolver(rows);
  const targetsThisProfile = (target: ProfileTarget) => resolveProfile(username, target)?.profile.handle === handle;
  const inbound: InboundRelation[] = [];
  let inboundTruncated = false;
  const addInbound = (relation: InboundRelation) => {
    if (inbound.length === 500) inboundTruncated = true;
    else inbound.push(relation);
  };
  // Stable publisher/record order determines the explicitly bounded navigation list.
  for (const row of [...rows].sort((a, b) => a.handle.localeCompare(b.handle))) {
    if (row.handle === handle) continue; // self-edges already render in Relations
    for (const relation of row.relations) {
      if (targetsThisProfile(relation)) {
        addInbound({
          handle: row.handle,
          displayName: row.displayName,
          kind: relation.kind,
          ...(relation.id === undefined ? {} : { recordId: relation.id }),
          ...(relation.note === undefined ? {} : { note: relation.note }),
          ...(relation.start === undefined ? {} : { start: relation.start }),
          ...(relation.end === undefined ? {} : { end: relation.end }),
        });
      }
    }
    // Derived edges: timeline events bound to this profile's handle (org
    // pages gain "who had roles here" without anyone authoring the reverse).
    for (const event of row.timeline ?? []) {
      if (targetsThisProfile({ target: event.organizationHandle, targetKind: "organization" })) {
        addInbound({
          handle: row.handle,
          displayName: row.displayName,
          kind: event.kind,
          ...(event.id === undefined ? {} : { recordId: event.id }),
          note: event.title,
          start: event.date,
          ...(event.end === undefined ? {} : { end: event.end }),
          via: "timeline",
        });
      }
    }
    // Co-presence: another index bound this subject as an appearance
    // participant — "shared a stage/interview with" without a reverse edge.
    for (const appearance of row.appearances ?? []) {
      const bound = appearance.participantHandles ?? [];
      if (bound.some(p => p.handle !== row.handle && targetsThisProfile({ target: p.handle }))) {
        addInbound({
          handle: row.handle,
          displayName: row.displayName,
          kind: "appeared_with",
          ...(appearance.id === undefined ? {} : { recordId: appearance.id }),
          note: appearance.title,
          ...(appearance.publishedAt === undefined ? {} : { start: appearance.publishedAt }),
          via: "appearance",
        });
      }
    }
  }
  inbound.sort((a, b) => a.handle.localeCompare(b.handle));
  return { resolveProfile, inbound, unavailable: false, inboundTruncated };
}

async function loadSharedNavigation(profile: StoredProfile): Promise<{ subjectKey: string; sourceKeys: ReadonlyMap<string, string> } | null> {
  const convex = convexClient();
  if (convex === null) return null;
  try {
    if (await convex.query(convexApi.knowledgeAvailable, {}) !== true) return null;
    const projection = buildKnowledgeIndex(JSON.stringify([{
      profileUrl: profileCanonicalUrl(profile.username, profile.handle),
      packetDigest: profile.packetDigest, revision: profile.revision, packet: profile.packet,
    }]));
    const sourceKeys = new Map<string, string>();
    for (const source of projection.sources) {
      for (const occurrence of source.occurrences) sourceKeys.set(occurrence.source.id, source.id);
    }
    const reviewed: unknown = await convex.query(convexApi.reviewedProfileKey, {
      username: profile.username, handle: profile.handle,
      packetDigest: profile.packetDigest, revision: profile.revision,
    });
    const subject = reviewed === null ? null : parseKnowledgeRoute("subjects", reviewed);
    if (reviewed !== null && subject === null) return null;
    return { subjectKey: subject?.key ?? projection.publications[0]!.subjectId, sourceKeys };
  } catch { return null; }
}

async function loadFullSections(profile: StoredProfile) {
  const client = convexClient();
  if (client === null) return [];
  try {
    const raw: unknown = await client.query(convexApi.dossierSectionsList,
      { username: profile.username, handle: profile.handle });
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return [];
    const value = raw as Record<string, unknown>;
    if (value.username !== profile.username || value.handle !== profile.handle
      || value.packetDigest !== profile.packetDigest || value.revision !== profile.revision
      || !Array.isArray(value.sections) || value.sections.length > 64) return [];
    const sections: Array<{ id: string; title: string; href: string }> = [];
    for (const entry of value.sections) {
      if (entry === null || typeof entry !== "object" || Array.isArray(entry)) return [];
      const section = entry as Record<string, unknown>;
      if (typeof section.id !== "string" || !/^[a-z][a-z0-9-]{1,79}$/u.test(section.id)
        || typeof section.title !== "string" || section.title.length < 1 || section.title.length > 200
        || section.href !== `/${profile.username}/${profile.handle}/sections/${section.id}`) return [];
      sections.push({ id: section.id, title: section.title, href: section.href });
    }
    return new Set(sections.map(section => section.id)).size === sections.length ? sections : [];
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { username, handle } = await params;
  const profile = await loadProfile(username, handle);
  if (profile === null) return { title: NOT_FOUND_TITLE };
  const title = profileTitle(profile);
  const description = profileDescription(profile);
  const url = profileCanonicalUrl(profile.username, profile.handle);
  return {
    title,
    description,
    alternates: { canonical: url, types: { "text/markdown": `${url}.md` } },
    openGraph: {
      title,
      description,
      type: profile.packet.subject.kind === "person" ? "profile" : "website",
      url,
      siteName: "Soulscrape",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PersonPage({ params }: { params: Promise<Params> }) {
  const { username, handle } = await params;
  const profile = await loadProfile(username, handle);
  if (profile === null) notFound();
  const [relations, shared, fullSections] = await Promise.all([
    loadRelationGraph(profile.username, profile.handle), loadSharedNavigation(profile), loadFullSections(profile),
  ]);
  const { resolveProfile, inbound, unavailable, inboundTruncated } = relations;

  return (
    <div data-hraness-marketing-preset="editorial">
      <script
        dangerouslySetInnerHTML={{ __html: profileJsonLdText(profile, resolveProfile) }}
        type="application/ld+json"
      />
      <SkipLink />
      <SiteHeader />
      <PersonProfileHeader profile={profile} sharedSubjectKey={shared?.subjectKey} />
      {(unavailable || inboundTruncated) && (
        <aside className="person-main" aria-label="Related indexes">
          <p className="person-notice">{unavailable
            ? "Related-index navigation is unavailable."
            : "Showing the first 500 related-index references. Additional references are omitted."}</p>
        </aside>
      )}
      <PersonProfileMain profile={profile} resolveProfile={resolveProfile} inbound={inbound} sharedSourceKeys={shared?.sourceKeys}
        fullSections={fullSections} />
      <PersonProfileFooter profile={profile} />
    </div>
  );
}
