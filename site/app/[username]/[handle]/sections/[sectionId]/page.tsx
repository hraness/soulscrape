import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, SkipLink } from "../../../../../components/site-header";
import { convexApi, convexClient } from "../../../../../lib/convex";
import { parsePublicSection } from "../../../../../lib/dossier-page";
import { knowledgePath } from "../../../../../lib/knowledge-page";
import { knowledgeResourceKey } from "../../../../../lib/knowledge-index";
import { renderMarkdown } from "../../../../../lib/markdown";
import { NOT_FOUND_TITLE, pageMetadata, pageTitle } from "../../../../../lib/metadata";
import { parseUsernameSegment } from "../../../../../lib/routes";
import { siteUrl } from "../../../../../lib/site";
import { isPersonHandle } from "../../../../../../skills/soulscrape/scripts/person-index";

type Params = { username: string; handle: string; sectionId: string };
export const dynamic = "force-dynamic";

function valid({ username, handle, sectionId }: Params) {
  return parseUsernameSegment(username) === username && isPersonHandle(handle)
    && /^[a-z][a-z0-9-]{1,79}$/u.test(sectionId);
}

const readSection = cache(async (params: Params) => {
  const client = convexClient();
  if (client === null) return { status: "unavailable" as const };
  try {
    const raw: unknown = await client.query(convexApi.dossierSectionGet, params);
    if (raw === null) return { status: "missing" as const };
    const section = parsePublicSection(raw, params.username, params.handle, params.sectionId);
    if (section === null) return { status: "unavailable" as const };
    let sectionSourcesAvailable = false;
    try { sectionSourcesAvailable = await client.query(convexApi.sectionSourcesAvailable, {}) === true; }
    catch { sectionSourcesAvailable = false; }
    return { status: "ready" as const, section, sectionSourcesAvailable };
  } catch { return { status: "unavailable" as const }; }
});

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const route = await params;
  if (!valid(route)) return { title: NOT_FOUND_TITLE, robots: { index: false, follow: false } };
  const result = await readSection(route);
  const path = `/${route.username}/${route.handle}/sections/${route.sectionId}`;
  return { ...pageMetadata({ title: pageTitle(result.status === "ready" ? result.section.section.title : "Dossier section"),
    description: "A publisher-attributed dossier section with its original citations and research records.",
    path: path as `/${string}` }), robots: { index: false, follow: true },
    alternates: { canonical: siteUrl(path), types: { "text/markdown": siteUrl(`${path}.md`) } } };
}

export default async function DossierSectionPage({ params }: { params: Promise<Params> }) {
  const route = await params;
  if (!valid(route)) notFound();
  const result = await readSection(route);
  if (result.status === "missing") notFound();
  if (result.status === "unavailable") return (
    <div data-hraness-marketing-preset="editorial"><SkipLink /><SiteHeader />
      <main id="main" className="person-main" tabIndex={-1} data-hraness-landscape="page"><h1>Section temporarily unavailable</h1>
        <p>The publisher&apos;s profile is still available. This section could not be read safely.</p>
        <a href={`/${route.username}/${route.handle}`}>View the published profile</a>
      </main></div>
  );
  const { section, revision } = result.section;
  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink /><SiteHeader />
      <main id="main" className="person-main dossier-layout" tabIndex={-1} data-hraness-landscape="page">
        <p className="person-kicker">Public dossier section · @{route.username}</p>
        <h1>{section.title}</h1>
        <p>This is @{route.username}&apos;s profile revision {revision}. The original date and editorial confidence
          below are attributed to its publisher, not independent verification.</p>
        {section.provenance.originalAuthor && <p>Original credited author: {section.provenance.originalAuthor}</p>}
        {section.provenance.draftingDisclosure && <p>{section.provenance.draftingDisclosure}</p>}
        <p><a href={`/${route.username}/${route.handle}`}>Back to the full profile</a> ·
          <a href={`/api/v1/sections/${route.username}/${route.handle}/${route.sectionId}?format=markdown`}> Markdown version</a> ·
          <a href={section.provenance.originalUrl}> Original document</a></p>
        {section.anchors.length > 0 && <nav aria-label="Original section anchors"><h2>In this section</h2>
          <ul>{section.anchors.map(anchor => <li key={anchor.id} id={anchor.id}>
            <a href={`#${anchor.id}`}>{anchor.title}</a> · <a href={anchor.originalUrl}>Original location</a>
          </li>)}</ul></nav>}
        <section aria-labelledby="section-text"><h2 id="section-text">Published text</h2>
          <div className="person-body">{renderMarkdown(section.body)}</div></section>
        <section aria-labelledby="section-sources" className="sources"><h2 id="section-sources">Original source occurrences</h2>
          <ol>{section.sources.map(source => <li key={source.id} id={source.id}>
            <a href={source.url}>{source.title}</a> · {source.publisher} · {source.published.text} ({source.published.precision})
            <span> · original ID: {source.originalId}</span>
            {result.sectionSourcesAvailable && <span> · <a href={knowledgePath("sources", knowledgeResourceKey(source.url))}>Other public citations of this URL</a></span>}
            {source.author && <span> · {source.author}</span>}
            {source.note && <p>{source.note}</p>}
            {source.accessedAt && <p>Accessed: {source.accessedAt}</p>}
          </li>)}</ol></section>
        <section aria-labelledby="section-records"><h2 id="section-records">Structured research records</h2>
          <ol>{section.records.map(record => <li key={record.id} id={record.id}>
            <p>{record.label} · {record.kind}{record.date && ` · ${record.date.text} (${record.date.precision})`}
              {record.confidence && ` · ${record.confidence} (original editorial confidence)`}</p>
            <p><a href={record.originalUrl}>Original location</a>
              {record.sourceIds.map(id => <span key={id}> · <a href={`#${id}`}>{id}</a></span>)}</p>
            <details><summary>Original structured fields</summary><pre>{JSON.stringify(record.original, null, 2)}</pre></details>
          </li>)}</ol></section>
      </main>
    </div>
  );
}
