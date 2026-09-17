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
import {
  profileCanonicalUrl,
  profileDescription,
  profileJsonLd,
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
 * The publisher's live relation edges: the handle set resolves outbound
 * targets, and edges pointing back at this profile become the "indexed in"
 * backlinks. One query serves both. An edge matches this profile when its
 * target slug equals the handle OR its `targetWikidataId` equals the
 * subject's Wikidata id — the QID binds the same entity across slug
 * spellings (e.g. `the-weeknd` vs `abel-tesfaye` before either is indexed).
 */
async function loadRelationGraph(
  username: string,
  handle: string,
  subjectWikidataId: string | undefined,
): Promise<{ liveHandles: ReadonlySet<string>; inbound: InboundRelation[] }> {
  const convex = convexClient();
  if (convex === null) return { liveHandles: new Set(), inbound: [] };
  const rows = await convex.query(convexApi.peopleRelationsByUsername, { username });
  const liveHandles = new Set<string>();
  const inbound: InboundRelation[] = [];
  for (const row of rows as {
    handle: string;
    displayName: string;
    relations: { target: string; kind: string; note?: string; start?: string; end?: string; targetWikidataId?: string }[];
    timeline?: { kind: string; date: string; title: string; end?: string; organizationHandle: string }[];
  }[]) {
    liveHandles.add(row.handle);
    if (row.handle === handle) continue; // self-edges already render in Relations
    for (const relation of row.relations) {
      const slugMatch = relation.target === handle;
      const entityMatch =
        subjectWikidataId !== undefined && relation.targetWikidataId === subjectWikidataId;
      if (slugMatch || entityMatch) {
        inbound.push({
          handle: row.handle,
          displayName: row.displayName,
          kind: relation.kind,
          ...(relation.note === undefined ? {} : { note: relation.note }),
          ...(relation.start === undefined ? {} : { start: relation.start }),
          ...(relation.end === undefined ? {} : { end: relation.end }),
        });
      }
    }
    // Derived edges: timeline events bound to this profile's handle (org
    // pages gain "who had roles here" without anyone authoring the reverse).
    for (const event of row.timeline ?? []) {
      if (event.organizationHandle === handle) {
        inbound.push({
          handle: row.handle,
          displayName: row.displayName,
          kind: event.kind,
          note: event.title,
          start: event.date,
          ...(event.end === undefined ? {} : { end: event.end }),
          via: "timeline",
        });
      }
    }
  }
  inbound.sort((a, b) => a.handle.localeCompare(b.handle));
  return { liveHandles, inbound };
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
  const { liveHandles, inbound } = await loadRelationGraph(
    profile.username,
    profile.handle,
    profile.packet.subject.identity?.wikidataId,
  );

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd(profile, liveHandles)) }}
        type="application/ld+json"
      />
      <a className="skip-link" href="#main">Skip to content</a>
      <PersonProfileHeader profile={profile} />
      <PersonProfileMain profile={profile} liveHandles={liveHandles} inbound={inbound} />
      <PersonProfileFooter profile={profile} />
    </>
  );
}
