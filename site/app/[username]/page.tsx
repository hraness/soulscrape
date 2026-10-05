import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isExampleSubject } from "../../lib/examples";
import { exampleImage } from "../../lib/example-images";
import { SiteHeader, SkipLink } from "../../components/site-header";
import { convexApi, convexClient } from "../../lib/convex";
import { parseUsernameSegment } from "../../lib/routes";
import { NOT_FOUND_TITLE, pageMetadata, pageTitle } from "../../lib/metadata";

export const dynamic = "force-dynamic";

type Params = { username: string };

type ListedProfile = {
  handle: string;
  displayName: string;
  summary: string;
  updatedAtMs: number;
};

async function loadList(username: string): Promise<ListedProfile[]> {
  const convex = convexClient();
  if (convex === null) return [];
  const rows = await convex.query(convexApi.peopleListByUsername, { username });
  if (!Array.isArray(rows)) return [];
  return rows.filter((row): row is ListedProfile =>
    typeof row === "object" && row !== null
    && typeof (row as ListedProfile).handle === "string"
    && typeof (row as ListedProfile).displayName === "string",
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { username: raw } = await params;
  const username = parseUsernameSegment(raw);
  if (username === null) return { title: NOT_FOUND_TITLE };
  return pageMetadata({
    title: pageTitle(`@${username}`),
    description: `Public dossiers published by @${username} on Soulscrape. Each is a dated snapshot of public sources that can be revised or withdrawn.`,
    path: `/${username}`,
    type: "profile",
  });
}

export default async function UsernamePage({ params }: { params: Promise<Params> }) {
  const { username: raw } = await params;
  const username = parseUsernameSegment(raw);
  if (username === null) notFound();
  const curated = username === "ben";
  const subjects = (await loadList(username)).filter(profile => !curated || isExampleSubject(profile.handle));
  if (subjects.length === 0) notFound();
  const count = curated
    ? (subjects.length === 1 ? "1 subject from this account's example collection." : `${subjects.length} subjects from this account's example collection.`)
    : (subjects.length === 1 ? "1 profile published by this account." : `${subjects.length} profiles published by this account.`);

  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader />
      <header className="person-header">
        <p className="person-kicker">Publisher</p>
        <h1>@{username}</h1>
        <p className="person-summary">
          {count} each is a dated snapshot that can be revised or withdrawn.
        </p>
      </header>
      <main className="person-main" id="main" tabIndex={-1}>
        <ul className="profile-list">
          {subjects.map(profile => {
            const portrait = exampleImage(username, profile.handle);
            return (
              <li key={profile.handle}>
                <a href={`/${username}/${profile.handle}`}>
                  {portrait?.status === "available" && (
                    // eslint-disable-next-line @next/next/no-img-element -- local curated image
                    <img className="profile-list-portrait" src={portrait.src} alt="" width={80} height={80} loading="lazy" decoding="async" />
                  )}
                  <strong>{profile.displayName}</strong>
                </a>
                <span className="profile-handle">/{profile.handle}</span>
                <p>{profile.summary}</p>
                <time dateTime={new Date(profile.updatedAtMs).toISOString()}>
                  Updated {new Date(profile.updatedAtMs).toISOString().slice(0, 10)}
                </time>
              </li>
            );
          })}
        </ul>
        {username === "ben" && <p className="featured-note"><a href="/portraits/credits.html">Portrait and emblem credits</a></p>}
      </main>
      <div className="site-footer person-footer">
        <p><a href="/">Soulscrape</a>: Free agent skill that writes dated dossiers on people, companies, and products, sources cited.</p>
      </div>
    </div>
  );
}
