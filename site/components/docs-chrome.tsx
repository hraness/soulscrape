import { Fragment, type ReactNode } from "react";
import { AskAiAboutThis } from "@hraness/ui";

import { docsPages, quadrantLabels, type DocQuadrant } from "../lib/docs";
import { siteUrl } from "../lib/site";
import { SiteHeader, SkipLink } from "./site-header";

const quadrants: readonly DocQuadrant[] = ["tutorial", "how-to", "reference", "explanation"];

function DocsNav({ current }: Readonly<{ current: string }>) {
  return (
    <nav aria-label="Documentation">
      <p className="nav-label">documentation</p>
      <a aria-current={current === "/docs" ? "page" : undefined} href="/docs">overview</a>
      {quadrants.map(quadrant => {
        const pages = docsPages.filter(page => page.quadrant === quadrant);
        if (pages.length === 0) return null;
        return (
          <Fragment key={quadrant}>
            <p className="nav-label nav-group">{`${quadrantLabels[quadrant].toLowerCase()}s`}</p>
            {pages.map(page => (
              <a
                aria-current={current === `/docs/${page.slug}` ? "page" : undefined}
                href={`/docs/${page.slug}`}
                key={page.slug}
              >
                {page.title}
              </a>
            ))}
          </Fragment>
        );
      })}
      <a className="nav-source" href="https://github.com/hraness/soulscrape">view source ↗</a>
    </nav>
  );
}

/**
 * The shared documentation chrome every Hraness product docs surface follows:
 * the metallic site header, a sticky Diataxis sidebar, an on-this-page rail,
 * and a <details> disclosure for small screens. The nav, index cards, sitemap,
 * and llms.txt all read from lib/docs.ts so the structure stays one registry.
 */
export function DocsChrome({
  children,
  current,
  eyebrow,
  lede,
  path,
  pagination,
  title,
  toc,
}: Readonly<{
  children: ReactNode;
  current: `/${string}`;
  eyebrow: string;
  lede: string;
  path: `/${string}`;
  pagination?: ReactNode;
  title: string;
  toc?: readonly { href: string; label: string }[];
}>) {
  return (
    <div className="docs-page" data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader current={current} />
      <div className="docs-bound">
        <details className="mobile-doc-nav">
          <summary>documentation</summary>
          <DocsNav current={current} />
        </details>
        <div className="docs-layout">
          <aside className="doc-sidebar">
            <DocsNav current={current} />
          </aside>
          <main className="doc-main" id="main" tabIndex={-1}>
            <header className="doc-header">
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="doc-lede">{lede}</p>
            </header>
            <article className="doc-content">{children}</article>
            {pagination}
            <AskAiAboutThis className="ask-ai" url={siteUrl(path)} />
          </main>
          {toc === undefined || toc.length === 0 ? null : (
            <aside className="doc-toc">
              <nav aria-label="On this page">
                <p className="nav-label">on this page</p>
                {toc.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}
              </nav>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
