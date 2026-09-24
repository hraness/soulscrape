import type { MetadataRoute } from "next";
import { createAtomFeed, createBlogSitemapPaths, createFeedEntry } from "@hraness/web-discovery";

import { BLOG_PATH, type BlogPost, blogFeed, blogFeedUpdated, blogPosts, blogSite, indexablePosts, postDiscovery } from "./blog";
import { siteUrl } from "./site";

/** Atom feed of listed posts only; quarantined and archived posts never enter it. */
export function blogAtomFeed(all: readonly BlogPost[] = blogPosts): string {
  const posts = indexablePosts(all);
  const updated = blogFeedUpdated(posts);
  return createAtomFeed(
    blogSite,
    updated === undefined ? blogFeed : { ...blogFeed, updated },
    posts.map(post => createFeedEntry(postDiscovery(post), { summary: post.dek })),
  );
}

/**
 * The blog index and its listed posts, each with lastmod. Quarantined posts
 * never enter the sitemap, and the index joins once it lists a post.
 */
export function blogSitemapEntries(all: readonly BlogPost[] = blogPosts): MetadataRoute.Sitemap {
  const posts = indexablePosts(all);
  if (posts.length === 0) return [];
  return createBlogSitemapPaths({ path: BLOG_PATH }, posts.map(postDiscovery)).map(entry => ({
    url: siteUrl(entry.path),
    ...(entry.lastModified === undefined ? {} : { lastModified: entry.lastModified }),
    changeFrequency: "monthly",
    priority: entry.path === BLOG_PATH ? 0.6 : 0.5,
  }));
}
