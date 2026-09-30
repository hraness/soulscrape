import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { assertArticleAdmissions } from "@hraness/design-kit";

import BlogIndexPage, { metadata as blogIndexMetadata } from "../app/blog/page";
import BlogPostPage, { generateMetadata, generateStaticParams } from "../app/blog/[slug]/page";
import { GET as markdownTwin } from "../app/blog/[slug]/markdown/route";
import { GET as llms } from "../app/llms.txt/route";
import { SiteHeader } from "../components/site-header";
import {
  blogAdmissions,
  blogPostPath,
  blogPosts,
  indexablePosts,
  postProvenanceSentence,
  type BlogPost,
} from "../lib/blog";
import { blogAtomFeed, blogSitemapEntries } from "../lib/blog-feed";
import { postMarkdown, postToc } from "../lib/blog-content";
import { isReservedUsernameSegment } from "../lib/site";
import publishedRelease from "../published-release.json";

const introducing = blogPosts.find(post => post.slug === "introducing-soulscrape")!;
const params = (slug: string) => ({ params: Promise.resolve({ slug }) });
const asIndexable = (post: BlogPost): BlogPost => ({ ...post, admission: { ...post.admission, lifecycle: "indexable" } });
const asQuarantined = (post: BlogPost): BlogPost => ({ ...post, admission: { ...post.admission, lifecycle: "quarantined" } });

/** Same-host pages a post may link to, besides other posts. */
const LIVE_SITE_ROUTES = new Set(["/docs", "/use-cases", "/examples", "/compare", "/ben/eugene-tssui"]);

describe("blog admission records", () => {
  test("every post has one valid admission record for its own route", () => {
    assertArticleAdmissions(blogAdmissions);
    for (const post of blogPosts) expect(post.admission.href).toBe(blogPostPath(post));
    expect(new Set(blogPosts.map(post => post.slug)).size).toBe(blogPosts.length);
  });

  test("records disclose AI review as AI and keep humanReview empty", () => {
    for (const post of blogPosts) {
      expect(post.admission.review?.reviewerType).toBe("ai");
      expect(post.admission.review?.reviewer).toMatch(/Claude/u);
      expect(post.admission.humanReview).toBeNull();
    }
    expect(postProvenanceSentence(introducing)).toBe(
      "Drafted with AI from the source code and reviewed by Claude Opus 5.5 (claude-opus-5-5), independent AI editorial and dual-use review.",
    );
  });

  test("the introducing post is indexable after its independent dual-use review", () => {
    expect(introducing.admission.lifecycle).toBe("indexable");
    expect(introducing.admission.review?.reviewedOn).toBe("2026-09-30");
    expect(indexablePosts()).toContain(introducing);
  });
});

describe("post bodies", () => {
  for (const post of blogPosts) {
    test(`${post.slug} renders release data and links only to live routes`, () => {
      expect(existsSync(join(process.cwd(), "content", "blog", post.bodyFile))).toBe(true);
      const markdown = postMarkdown(post);
      expect(markdown).not.toContain("{{");
      expect(markdown).not.toContain("Drafted with AI");
      expect(markdown).not.toContain("—");
      expect(`${post.title}${post.dek}`).not.toContain("—");
      expect(post.title.length).toBeLessThanOrEqual(70);
      expect(post.dek.length).toBeLessThanOrEqual(200);
      const raw = readFileSync(join(process.cwd(), "content", "blog", post.bodyFile), "utf8");
      expect(raw).not.toMatch(/v\d+\.\d+\.\d+/u);
      const postRoutes = new Set(blogPosts.map(blogPostPath));
      for (const [, href] of markdown.matchAll(/\]\(([^)\s]+)\)/gu)) {
        if (href!.startsWith("https://")) continue;
        expect(LIVE_SITE_ROUTES.has(href!) || postRoutes.has(href as `/blog/${string}`)).toBe(true);
      }
    });
  }

  test("the status line comes from the published release record", () => {
    expect(postMarkdown(introducing)).toContain(`Latest release: v${publishedRelease.version}. The skill is free`);
    expect(postMarkdown(introducing)).not.toContain("Status: Latest release");
  });
});

describe("post page", () => {
  test("shows the Hraness byline, provenance note, sources, contents, and BlogPosting JSON-LD", async () => {
    const html = renderToStaticMarkup(await BlogPostPage(params(introducing.slug)));
    expect(html.match(/<h1\b/gu)).toHaveLength(1);
    expect(html).toContain("Introducing Soulscrape");
    expect(html).toContain('data-author-kind="organization"');
    expect(html).toMatch(/By\s+Hraness/u);
    expect(html).toContain(postProvenanceSentence(introducing));
    expect(html).toContain('data-reviewer-type="ai"');
    expect(html).not.toMatch(/human/iu);
    expect(html).toContain('href="/docs"');
    expect(html).toContain('href="/ben/eugene-tssui"');
    for (const heading of postToc(introducing)) {
      expect(html).toContain(`id="${heading.id}"`);
      expect(html).toContain(`href="#${heading.id}"`);
    }
    expect(html).toContain('"@type":"BlogPosting"');
    expect(html).toContain('"@id":"https://soulscrape.com/blog/introducing-soulscrape#article"');
    expect(html).toContain('"name":"Hraness"');
    expect(html).toContain("https://peopleblade.com");
    expect(html).toContain(`Latest release: v${publishedRelease.version}`);
    expect(html).toContain("data-hraness-social-kit");
    expect(html.indexOf("data-hraness-social-kit")).toBeGreaterThan(html.indexOf("Go deeper"));
    expect(html).not.toContain("undefined");
  });

  test("the indexable post has no noindex, a canonical URL, and article share metadata", async () => {
    const metadata = await generateMetadata(params(introducing.slug));
    expect(metadata.robots).toBeUndefined();
    expect(metadata.alternates?.canonical).toBe("https://soulscrape.com/blog/introducing-soulscrape");
    expect(metadata.openGraph).toMatchObject({ type: "article", publishedTime: "2026-09-24T00:00:00.000Z", authors: ["Hraness"] });
    expect(generateStaticParams()).toContainEqual({ slug: introducing.slug });
  });

  test("the Markdown twin carries the provenance note and no noindex header once indexable", async () => {
    const response = await markdownTwin(new Request("https://soulscrape.com/blog/introducing-soulscrape.md"), params(introducing.slug));
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("x-robots-tag")).toBeNull();
    expect(response.headers.get("link")).toBe('<https://soulscrape.com/blog/introducing-soulscrape>; rel="canonical"');
    const body = await response.text();
    expect(body.startsWith("# Introducing Soulscrape\n")).toBe(true);
    expect(body).toContain(postProvenanceSentence(introducing));
  });
});

describe("post styles", () => {
  test("blog lists keep their markers under Tailwind preflight", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
    expect(css).toMatch(/\.blog-shell \.plain-publication :is\([^)]*plain-publication__article-body[^)]*\) ul \{\s*list-style: disc;/u);
    expect(css).toMatch(/\.blog-shell \.plain-publication :is\([^)]*plain-publication__sources[^)]*\) ol \{\s*list-style: decimal;/u);
  });
});

describe("discovery", () => {
  test("the indexable post is in the index, sitemap, feed, llms.txt, and header", async () => {
    const path = blogPostPath(introducing);
    const index = renderToStaticMarkup(<BlogIndexPage />);
    expect(index).toContain(path);
    expect(blogIndexMetadata.robots).toBeUndefined();
    expect(blogSitemapEntries().map(entry => entry.url)).toContain("https://soulscrape.com/blog/introducing-soulscrape");
    expect(blogAtomFeed()).toContain("<id>https://soulscrape.com/blog/introducing-soulscrape</id>");
    expect(await llms().text()).toContain("https://soulscrape.com/blog/introducing-soulscrape");
    expect(renderToStaticMarkup(<SiteHeader />)).toContain('href="/blog"');
  });

  test("a quarantined post stays out of the sitemap and feed", () => {
    const quarantined = [asQuarantined(introducing)];
    expect(blogSitemapEntries(quarantined)).toEqual([]);
    const feed = blogAtomFeed(quarantined);
    expect(feed).toContain("<feed");
    expect(feed).not.toContain("<entry>");
  });

  test("an indexable post enters the sitemap with lastmod and the Atom feed", () => {
    const listed = [asIndexable(introducing)];
    const entries = blogSitemapEntries(listed);
    expect(entries.map(entry => entry.url)).toEqual([
      "https://soulscrape.com/blog",
      "https://soulscrape.com/blog/introducing-soulscrape",
    ]);
    for (const entry of entries) expect(entry.lastModified).toBe(`${introducing.updated ?? introducing.published}T00:00:00.000Z`);
    const feed = blogAtomFeed(listed);
    expect(feed).toContain("<id>https://soulscrape.com/blog/introducing-soulscrape</id>");
    expect(feed).toContain("<name>Hraness</name>");
  });

  test("reserves /blog so no member username can claim it", () => {
    expect(isReservedUsernameSegment("blog")).toBe(true);
  });
});
