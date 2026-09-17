import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isPersonHandle } from "../../../../skills/soulscrape/scripts/person-index";

import {
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

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd(profile)) }}
        type="application/ld+json"
      />
      <a className="skip-link" href="#main">Skip to content</a>
      <PersonProfileHeader profile={profile} />
      <PersonProfileMain profile={profile} />
      <PersonProfileFooter profile={profile} />
    </>
  );
}
