import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isPersonHandle } from "../../../../skills/soulscrape/scripts/person-index";

import {
  InboundRelation,
  PersonProfileFooter,
  PersonProfileHeader,
  PersonProfileMain,
} from "../../../components/person-profile";
import { convexApi, convexClient } from "../../../lib/convex";
import type { PublicProfileGraphRow } from "../../../lib/corpus-graph";
import { createProfileResolver, type ProfileResolver, type ProfileTarget } from "../../../lib/profile-identity";
import {
  profileCanonicalUrl,
  profileDescription,
  profileJsonLdText,
  profileTitle,
  publicRowToProfile,
  type StoredProfile,
} from "../../../lib/profile-view";
import { parseUsernameSegment } from "../../../lib/routes";

export const dynamic = "force-dynamic";

type Params = { username: string; handle: string };

async function loadProfile(params: Params): Promise<StoredProfile | null> {
  const username = parseUsernameSegment(params.username);
  const handle = isPersonHandle(params.handle) ? params.handle : null;
  if (username === null || handle === null) return null;
  const convex = convexClient();
  if (convex === null) return null;
  const row = await convex.query(convexApi.peopleGetPublic, { username, handle });
  return publicRowToProfile(row);
}

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
): Promise<{ resolveProfile: ProfileResolver; inbound: InboundRelation[] }> {
  const convex = convexClient();
  if (convex === null) return { resolveProfile: createProfileResolver([]), inbound: [] };
  const result: unknown = await convex.query(convexApi.peopleRelationsByUsername, { username });
  const rows: PublicProfileGraphRow[] = (Array.isArray(result) && result.length <= 200 ? result : []).filter(row =>
    row !== null && typeof row === "object" && row.username === username &&
    typeof row.handle === "string" && isPersonHandle(row.handle) && typeof row.displayName === "string" &&
    Array.isArray(row.relations) && row.relations.length <= 200 &&
    (row.timeline === undefined || (Array.isArray(row.timeline) && row.timeline.length <= 200)) &&
    (row.appearances === undefined || (Array.isArray(row.appearances) && row.appearances.length <= 200)),
  );
  const resolveProfile = createProfileResolver(rows);
  const targetsThisProfile = (target: ProfileTarget) => resolveProfile(username, target)?.profile.handle === handle;
  const inbound: InboundRelation[] = [];
  for (const row of rows) {
    if (row.handle === handle) continue; // self-edges already render in Relations
    for (const relation of row.relations) {
      if (targetsThisProfile(relation)) {
        inbound.push({
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
        inbound.push({
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
        inbound.push({
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
  return { resolveProfile, inbound };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const profile = await loadProfile(await params);
  if (profile === null) return { title: "not found — soulscrape" };
  const title = profileTitle(profile);
  const description = profileDescription(profile);
  const url = profileCanonicalUrl(profile.username, profile.handle);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "profile",
      url,
      siteName: "soulscrape",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PersonPage({ params }: { params: Promise<Params> }) {
  const profile = await loadProfile(await params);
  if (profile === null) notFound();
  const { resolveProfile, inbound } = await loadRelationGraph(profile.username, profile.handle);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: profileJsonLdText(profile, resolveProfile) }}
        type="application/ld+json"
      />
      <a className="skip-link" href="#main">Skip to content</a>
      <PersonProfileHeader profile={profile} />
      <PersonProfileMain profile={profile} resolveProfile={resolveProfile} inbound={inbound} />
      <PersonProfileFooter profile={profile} />
    </>
  );
}
