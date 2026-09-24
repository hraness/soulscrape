import type { ReactNode } from "react";

import { BLOG_FEED_PATH, BLOG_PATH } from "../lib/blog";
import { SiteHeader, SkipLink } from "./site-header";

/**
 * Chrome for the blog index and posts: the shared site header, the
 * plain-publication article column, and the story-page footer links.
 */
export function BlogChrome({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader current={BLOG_PATH} />
      <div className="blog-shell">
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <div className="site-footer">
          <p><a href="/">soulscrape</a>: dated, cited dossiers on people.</p>
          <nav aria-label="Site links">
            <a href="/examples">Examples</a>
            <a href="/use-cases">Use cases</a>
            <a href="/docs">Docs</a>
            <a href="/compare">Compare</a>
            <a href={BLOG_FEED_PATH}>Blog feed (Atom)</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
