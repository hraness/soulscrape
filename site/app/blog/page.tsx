import type { Metadata } from "next";
import { ArticleIndex } from "@hraness/design-kit/react/server";
import { blogJsonLd } from "@hraness/web-discovery";
import { JsonLdScript } from "@hraness/web-discovery/json-ld";

import { BlogChrome } from "../../components/blog-chrome";
import {
  BLOG_DESCRIPTION,
  BLOG_FEED_PATH,
  BLOG_PATH,
  BLOG_TITLE,
  blogDiscovery,
  blogPostPath,
  blogSite,
  indexablePosts,
  postDiscovery,
} from "../../lib/blog";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { siteUrl } from "../../lib/site";

export const dynamic = "force-static";

const posts = indexablePosts();

export const metadata: Metadata = {
  ...pageMetadata({ title: pageTitle(BLOG_TITLE), description: BLOG_DESCRIPTION, path: BLOG_PATH }),
  alternates: {
    canonical: siteUrl(BLOG_PATH),
    types: { "application/atom+xml": siteUrl(BLOG_FEED_PATH) },
  },
  // An index with no listed posts stays out of search until the first post is listed.
  ...(posts.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function BlogIndexPage() {
  return (
    <BlogChrome>
      <JsonLdScript data={blogJsonLd(blogSite, blogDiscovery, posts.map(postDiscovery))} id="blog-json-ld" />
      <ArticleIndex
        heading="Soulscrape blog"
        headingId="blog-title"
        headingLevel={1}
        items={posts.map(post => ({
          href: blogPostPath(post),
          title: post.title,
          dek: post.dek,
          published: post.published,
          ...(post.updated === undefined ? {} : { updated: post.updated }),
          eyebrow: post.eyebrow,
        }))}
        summary={posts.length === 0 ? "No posts are listed yet." : BLOG_DESCRIPTION}
      />
    </BlogChrome>
  );
}
