import type { MetadataRoute } from "next";

import { BLOG_PATH, BLOG_TITLE, blogPostPath, indexablePosts } from "./blog";
import { comparisons } from "./compare";
import { docsPages } from "./docs";
import { featuredIndexes } from "./examples";
import { sentenceCase } from "./metadata";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type SitePage = Readonly<{
  path: string;
  label: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}>;

/** The site's static pages, in sitemap order. The sitemap and the 404 page both read this list. */
export const sitePages: readonly SitePage[] = [
  { path: "/", label: "Soulscrape", changeFrequency: "monthly", priority: 1 },
  { path: "/examples", label: "Examples", changeFrequency: "weekly", priority: 0.8 },
  { path: "/use-cases", label: "Use cases", changeFrequency: "monthly", priority: 0.7 },
  { path: "/docs", label: "Docs", changeFrequency: "monthly", priority: 0.7 },
  ...docsPages.map((page): SitePage => ({
    path: `/docs/${page.slug}`,
    label: sentenceCase(page.title),
    changeFrequency: "monthly",
    priority: 0.6,
  })),
  { path: "/compare", label: "Compare", changeFrequency: "monthly", priority: 0.6 },
  ...comparisons.map((entry): SitePage => ({
    path: `/compare/${entry.slug}`,
    label: entry.title,
    changeFrequency: "monthly",
    priority: 0.5,
  })),
];

/** The publisher of the curated example dossiers. */
const EXAMPLES_PUBLISHER = "ben";

/**
 * Known pages for the 404 page's "Did you mean" link: the static pages, the
 * listed blog posts, and the curated example dossiers. Member-published
 * profiles live in Convex and are not listed here.
 */
export function knownRoutes(): readonly { href: string; label: string }[] {
  const posts = indexablePosts();
  return [
    ...sitePages.map(page => ({ href: page.path, label: page.label })),
    ...(posts.length === 0 ? [] : [{ href: BLOG_PATH, label: BLOG_TITLE }]),
    ...posts.map(post => ({ href: blogPostPath(post), label: post.title })),
    { href: `/${EXAMPLES_PUBLISHER}`, label: `@${EXAMPLES_PUBLISHER}` },
    ...featuredIndexes.map(index => ({ href: `/${EXAMPLES_PUBLISHER}/${index.handle}`, label: index.name })),
  ];
}
