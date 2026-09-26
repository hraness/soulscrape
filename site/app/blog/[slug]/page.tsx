import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleRelatedProducts,
  ArticleSources,
  MarketingArticle,
} from "@hraness/design-kit/react/server";
import { relatedFor } from "@hraness/design-kit/portfolio";
import { articleJsonLd } from "@hraness/web-discovery";
import { JsonLdScript } from "@hraness/web-discovery/json-ld";

import { BlogChrome } from "../../../components/blog-chrome";
import {
  BLOG_AUTHOR,
  BLOG_FEED_PATH,
  blogPost,
  blogPostPath,
  blogPosts,
  blogSite,
  isIndexablePost,
  isoDateTime,
  postDiscovery,
  postHeadings,
  postProvenance,
} from "../../../lib/blog";
import { postMarkdown } from "../../../lib/blog-content";
import { renderMarkdown } from "../../../lib/markdown";
import { NOT_FOUND_TITLE, pageMetadata, pageTitle } from "../../../lib/metadata";
import { siteUrl } from "../../../lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPost(slug);
  if (post === undefined) return { title: NOT_FOUND_TITLE };
  const path = blogPostPath(post);
  const base = pageMetadata({ title: pageTitle(post.title), description: post.dek, path, type: "article" });
  return {
    ...base,
    alternates: {
      canonical: siteUrl(path),
      types: {
        "application/atom+xml": siteUrl(BLOG_FEED_PATH),
        "text/markdown": siteUrl(`${path}.md`),
      },
    },
    authors: [{ name: BLOG_AUTHOR.name }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: isoDateTime(post.published),
      ...(post.updated === undefined ? {} : { modifiedTime: isoDateTime(post.updated) }),
      authors: [BLOG_AUTHOR.name],
      tags: [...post.tags],
    },
    // Quarantined and archived posts stay readable but out of search.
    ...(isIndexablePost(post) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPost(slug);
  if (post === undefined) notFound();
  const markdown = postMarkdown(post);
  const headings = postHeadings(markdown);
  const related = relatedFor("soulscrape");
  return (
    <BlogChrome>
      <JsonLdScript data={articleJsonLd(blogSite, postDiscovery(post))} id="article-json-ld" />
      <MarketingArticle
        after={(
          <>
            <ArticleSources sources={post.sources} />
            {related.length === 0 ? null : (
              <ArticleRelatedProducts
                items={related.slice(0, 3).map(item => ({
                  name: item.name,
                  href: item.href,
                  role: item.role,
                  relationship: item.relationship,
                }))}
              />
            )}
          </>
        )}
        author={BLOG_AUTHOR}
        dek={post.dek}
        eyebrow={post.eyebrow}
        heading={post.title}
        provenance={postProvenance(post)}
        published={post.published}
        toc={headings.length >= 4 ? headings.map(heading => ({ href: `#${heading.id}` as const, label: heading.label })) : undefined}
        {...(post.updated === undefined ? {} : { updated: post.updated })}
      >
        {renderMarkdown(markdown, 0, { trust: "site" })}
      </MarketingArticle>
    </BlogChrome>
  );
}
