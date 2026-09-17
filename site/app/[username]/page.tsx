import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { convexApi, convexClient } from "../../lib/convex";
import { parseUsernameSegment } from "../../lib/routes";
import { siteUrl } from "../../lib/site";

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
  if (username === null) return { title: "not found — soulscrape" };
  const title = `@${username} — soulscrape`;
  const description = `public person indexes published by @${username} on soulscrape.`;
  return {
    title,
    description,
    alternates: { canonical: siteUrl(`/${username}`) },
    openGraph: { title, description, siteName: "soulscrape", type: "profile", url: `/${username}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function UsernamePage({ params }: { params: Promise<Params> }) {
  const { username: raw } = await params;
  const username = parseUsernameSegment(raw);
  if (username === null) notFound();
  const people = await loadList(username);
  if (people.length === 0) notFound();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="person-header">
        <nav className="person-nav" aria-label="Site">
          <a href="/">soulscrape</a>
        </nav>
        <p className="person-kicker">Publisher</p>
        <h1>@{username}</h1>
        <p className="person-summary">
          {people.length === 1 ? "1 public index" : `${people.length} public indexes`} published by
          this account. each is a dated, source-bounded snapshot that can be revised or withdrawn.
        </p>
      </header>
      <main className="person-main" id="main" tabIndex={-1}>
        <ul className="profile-list">
          {people.map(person => (
            <li key={person.handle}>
              <a href={`/${username}/${person.handle}`}>
                <strong>{person.displayName}</strong>
              </a>
              <span className="profile-handle">/{person.handle}</span>
              <p>{person.summary}</p>
              <time dateTime={new Date(person.updatedAtMs).toISOString()}>
                Updated {new Date(person.updatedAtMs).toISOString().slice(0, 10)}
              </time>
            </li>
          ))}
        </ul>
      </main>
      <div className="site-footer person-footer">
        <p><a href="/">soulscrape</a> — people for agents.</p>
      </div>
    </>
  );
}
