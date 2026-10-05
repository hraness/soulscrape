import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KnowledgeHub } from "../../../../components/knowledge-hub";
import { SiteHeader, SkipLink } from "../../../../components/site-header";
import { convexApi, convexClient } from "../../../../lib/convex";
import { knowledgePath, parseKnowledgePage, parseKnowledgeRoute, type KnowledgeKind } from "../../../../lib/knowledge-page";
import { NOT_FOUND_TITLE, pageMetadata, pageTitle } from "../../../../lib/metadata";
import { parseUsernameSegment } from "../../../../lib/routes";
import { siteUrl } from "../../../../lib/site";

type Params = { kind: string; key: string };
type Search = { cursor?: string | string[]; publisher?: string | string[] };
export const dynamic = "force-dynamic";

const readPage = cache(async (kind: KnowledgeKind, key: string, cursor: string | null, publisher?: string) => {
  const client = convexClient();
  if (client === null) return null;
  try {
    const value: unknown = await client.query(convexApi.knowledgeLookup,
      { key, cursor, limit: 4, ...(publisher === undefined ? {} : { publisher }) });
    return parseKnowledgePage(value, key);
  } catch { return null; }
});

function cursorFromSearch(search: Search): string | null {
  const raw = search.cursor;
  if (raw === undefined) return null;
  if (typeof raw !== "string" || raw.length < 1 || raw.length > 2048 || /[\u0000-\u0020\u007f]/u.test(raw)) notFound();
  return raw;
}

function publisherFromSearch(search: Search): string | undefined {
  if (search.publisher === undefined) return undefined;
  const publisher = parseUsernameSegment(search.publisher);
  if (publisher === null) notFound();
  return publisher;
}

export async function generateMetadata({ params, searchParams }: {
  params: Promise<Params>; searchParams: Promise<Search>;
}): Promise<Metadata> {
  const { kind, key } = await params;
  const route = parseKnowledgeRoute(kind, key);
  if (route === null) return { title: NOT_FOUND_TITLE, robots: { index: false, follow: false } };
  const search = await searchParams;
  const cursor = cursorFromSearch(search);
  const publisher = publisherFromSearch(search);
  const page = await readPage(route.kind, route.key, cursor, publisher);
  const primary = page?.rows.find(row => row.role === "primary");
  const title = route.kind === "sources" ? "Public source references"
    : page?.reviewed?.label ?? primary?.displayName ?? page?.rows.find(row => row.role === "reference")?.targetName ?? "Public subject references";
  const path = knowledgePath(route.kind, route.key);
  return {
    ...pageMetadata({ title: pageTitle(title),
      description: route.kind === "sources"
        ? "A source listed in public dossiers, with each publisher's original citation."
        : "Publisher-attributed dossiers and references about a person, organization, or product. Identity links are publisher assertions.",
      path: path as `/${string}` }),
    robots: { index: false, follow: true },
    alternates: { canonical: siteUrl(path), types: { "text/markdown": siteUrl(`${path}.md`) } },
  };
}

export default async function KnowledgePage({ params, searchParams }: {
  params: Promise<Params>; searchParams: Promise<Search>;
}) {
  const { kind, key } = await params;
  const route = parseKnowledgeRoute(kind, key);
  if (route === null) notFound();
  const search = await searchParams;
  const cursor = cursorFromSearch(search);
  const publisher = publisherFromSearch(search);
  const page = await readPage(route.kind, route.key, cursor, publisher);
  if (page === null) return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader />
      <main className="person-main" id="main" tabIndex={-1}>
        <h1>Public connections unavailable</h1>
        <p>The shared index could not be loaded. Individual published dossiers are still available from their publishers.</p>
      </main>
    </div>
  );
  if (page.isDone && page.rows.length === 0 && cursor === null) notFound();
  return <KnowledgeHub kind={route.kind} keyId={route.key} page={page} publisher={publisher} />;
}
