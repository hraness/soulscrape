import type { ReactNode } from "react";
import { AskAiAboutThis } from "@hraness/ui";

import { siteUrl } from "../lib/site";
import { SiteHeader, SkipLink } from "./site-header";

/**
 * Shared editorial chrome for the non-landing story pages: preset scope, the
 * metallic site header, a breadcrumb, the serif hero, and the shared footer.
 */
export function StoryPage({
  breadcrumb,
  children,
  kicker,
  lede,
  path,
  title,
}: Readonly<{
  breadcrumb?: readonly { href: string; label: string; current?: boolean }[];
  children: ReactNode;
  kicker: string;
  lede: string;
  path: `/${string}`;
  title: string;
}>) {
  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader />
      <div className="story-shell">
        {breadcrumb === undefined ? null : (
          <nav aria-label="Breadcrumb" className="story-nav">
            {breadcrumb.map((item, index) => (
              <span key={item.href}>
                {index > 0 && <span aria-hidden="true" className="story-nav-sep">/</span>}
                <a aria-current={item.current === true ? "page" : undefined} href={item.href}>{item.label}</a>
              </span>
            ))}
          </nav>
        )}
        <header className="story-hero">
          <p className="story-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p className="story-lede">{lede}</p>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <AskAiAboutThis className="ask-ai" url={siteUrl(path)} />
        <div className="site-footer">
          <p><a href="/">soulscrape</a> — research anyone. publish the dossier.</p>
          <nav aria-label="Site links">
            <a href="/examples">examples</a>
            <a href="/use-cases">use cases</a>
            <a href="/docs">docs</a>
            <a href="/compare">compare</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
