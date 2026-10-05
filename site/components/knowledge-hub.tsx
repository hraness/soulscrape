import { SiteHeader, SkipLink } from "./site-header";
import { knowledgePath, type KnowledgeKind, type KnowledgePage, type KnowledgePageRow } from "../lib/knowledge-page";

function referenceAnchor(row: KnowledgePageRow): string {
  return row.origin === "appearance" ? "appearances-heading"
    : row.origin === "timeline" ? "timeline-heading" : "relations-heading";
}

export function KnowledgeHub({ kind, keyId, page, publisher }: {
  kind: KnowledgeKind; keyId: string; page: KnowledgePage; publisher?: string;
}) {
  const primary = page.rows.filter(item => item.role === "primary");
  const references = page.rows.filter(item => item.role === "reference");
  const citations = page.rows.filter(item => item.role === "citation" || item.role === "section_citation");
  const title = kind === "sources" ? "Shared source references"
    : page.reviewed?.label ?? primary[0]?.displayName ?? references[0]?.targetName ?? "Subject reference";
  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader />
      <header className="person-header">
        <p className="person-kicker">{kind === "sources" ? "Source index" : page.reviewed === undefined ? "Subject index" : "Reviewed subject index"}</p>
        <h1>{title}</h1>
        <p className="person-summary">
          {kind === "sources"
            ? "These public indexes list this source. Their authors may use it for different claims."
            : page.reviewed === undefined
              ? "Each publisher keeps their own dated dossier. Names and shared identifiers here are supplied by publishers, not verified identity."
              : "This subject grouping has been reviewed from cited public dossiers and can be corrected. Each publisher keeps their own dated claims and sources."}
        </p>
      </header>
      <main className="person-main dossier-layout" id="main" tabIndex={-1} data-hraness-landscape="page">
        <form action={knowledgePath(kind, keyId)} method="get">
          <label htmlFor="publisher-filter">Filter by publisher</label>{" "}
          <input id="publisher-filter" name="publisher" defaultValue={publisher} maxLength={64} />{" "}
          <button type="submit">Filter</button>
          {publisher !== undefined && <> · <a href={knowledgePath(kind, keyId)}>Show all publishers</a></>}
        </form>
        {kind === "subjects" && (
          <>
            {primary.length > 0 && (
              <section aria-labelledby="published-dossiers-heading">
                <h2 id="published-dossiers-heading">Published dossiers</h2>
                <ul className="profile-list">
                  {primary.map(item => <li key={item.profileUrl}>
                    <a href={item.profileUrl}><strong>{item.displayName}</strong></a>
                    <span> · {item.subjectKind === "organization" ? "Organization" : item.subjectKind === "product" ? "Product" : "Person"} · by @{item.username} · revision {item.revision}</span>
                    <p>{item.summary}</p>
                    <p>Dossier scope as of <time dateTime={item.asOf}>{item.asOf?.slice(0, 10)}</time>. Showing {item.claims?.length ?? 0} of {item.claimCount} claims from this publisher.</p>
                    {item.claims !== undefined && item.claims.length > 0 && (
                      <ul className="claims">
                        {item.claims.map(claim => <li key={claim.id} data-kind={claim.kind}>
                          <span className={`claim-kind claim-${claim.kind}`}>{claim.kind.replaceAll("_", " ")}</span>{" "}
                          {claim.text}{" "}
                          <a href={`${item.profileUrl}#claim-${claim.id}`}>See {claim.sourceIds.length} {claim.sourceIds.length === 1 ? "source" : "sources"} in @{item.username}&apos;s dossier</a>
                        </li>)}
                      </ul>
                    )}
                  </li>)}
                </ul>
              </section>
            )}
            {references.length > 0 && (
              <section aria-labelledby="referenced-in-heading">
                <h2 id="referenced-in-heading">Referenced in public dossiers</h2>
                <ul className="relations">
                  {references.map(item => <li key={`${item.profileUrl}:${item.origin}:${item.recordId}:${item.targetHandle}`}>
                    <a href={`${item.profileUrl}#${referenceAnchor(item)}`}><strong>{item.displayName}</strong></a>
                    <span> · by @{item.username} · {item.relationKind?.replaceAll("_", " ")}
                      {item.origin === "appearance" ? " · shared appearance" : item.origin === "timeline" ? " · dated event" : ""}</span>
                    <p>Names the target as {item.targetName ?? item.targetHandle}. This is the publisher&apos;s reference, with {item.sourceIds?.length ?? 0} source {item.sourceIds?.length === 1 ? "citation" : "citations"} in the original dossier.</p>
                  </li>)}
                </ul>
              </section>
            )}
          </>
        )}
        {kind === "sources" && page.sectionSourcesReady !== true && (
          <p>Long-form section sources are not fully indexed yet; this list may omit them.</p>
        )}
        {kind === "sources" && citations.length > 0 && (
          <section aria-labelledby="source-mentions-heading">
            <h2 id="source-mentions-heading">Public source entries</h2>
            <ul className="relations">
              {citations.map(item => item.role === "section_citation"
                ? <li key={`${item.profileUrl}:${item.sectionId}:${item.sourceId}`}>
                    <a href={item.sectionSource!.url} rel="nofollow ugc"><strong>{item.sectionSource!.title}</strong></a>
                    <span> · {item.sectionSource!.publisher} · {item.sectionSource!.published.text} ({item.sectionSource!.published.precision})</span>
                    <p>Listed by <a href={`${item.profileUrl}/sections/${item.sectionId}#${item.sourceId}`}>@{item.username} in {item.sectionTitle}</a>
                      {` · original ID: ${item.sectionSource!.originalId}`}
                      {item.sectionSource!.accessedAt ? ` · accessed ${item.sectionSource!.accessedAt}` : ""}. The section retains the original occurrence and its citations.</p>
                  </li>
                : <li key={`${item.profileUrl}:${item.sourceId}`}>
                    <a href={item.source!.url} rel="nofollow ugc"><strong>{item.source!.title}</strong></a>
                    <span> · {item.source!.publisher}{item.source!.publishedAt ? ` · ${item.source!.publishedAt}` : ""}</span>
                    <p>Listed by <a href={`${item.profileUrl}#source-${item.sourceOrdinal}`}>@{item.username} in {item.displayName}</a> · accessed {item.source!.accessedAt}. The original dossier gives its citations and context.</p>
                  </li>)}
            </ul>
          </section>
        )}
        {page.rows.length === 0 && <p>No public entries on this page.{page.isDone ? "" : " More results may follow."}</p>}
        {page.nextCursor !== null && (
          <p><a href={`${knowledgePath(kind, keyId)}?${publisher === undefined ? "" : `publisher=${encodeURIComponent(publisher)}&`}cursor=${encodeURIComponent(page.nextCursor)}`}>Show more results</a>. Results can change between pages.</p>
        )}
        <p>Publishers can correct or withdraw their own dossiers. If a subject link is wrong or impersonates someone,
          <a href={`mailto:hraness@pm.me?subject=${encodeURIComponent(`Soulscrape identity report ${keyId}`)}`}> report the identity link</a>.
          Include the public URL and the connection you dispute; do not include private evidence in a public dossier.</p>
      </main>
      <div className="site-footer person-footer"><p><a href="/">Soulscrape</a> · <a href="/docs/person-index">How public indexes work</a></p></div>
    </div>
  );
}
