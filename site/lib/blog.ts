import {
  articleProvenanceFromAdmission,
  articleProvenanceSentence,
  isArticleIndexable,
  type ArticleAdmission,
  type ArticleIsoDate,
  type ArticleProvenanceRecord,
  type ArticleSourceItem,
} from "@hraness/design-kit";
import type {
  ArticleDiscovery,
  ArticleParty,
  BlogDiscovery,
  FeedDiscovery,
  SearchSite,
} from "@hraness/web-discovery";

import publishedRelease from "../published-release.json";
import { slugifyHeading } from "./markdown";
import { HOME_DESCRIPTION, SITE_NAME } from "./metadata";
import { SITE_ORIGIN } from "./site";

export const BLOG_PATH = "/blog";
export const BLOG_FEED_PATH = "/blog/feed.xml";
export const BLOG_TITLE = "Blog";
export const BLOG_DESCRIPTION =
  "How to research a person, assess sources, and build a dossier with Soulscrape.";
/** The day the blog opened. The empty feed uses it as its updated time. */
export const BLOG_STARTED: ArticleIsoDate = "2026-09-24";

export const BLOG_AUTHOR = { kind: "organization", name: "Hraness" } as const;
export const BLOG_PARTY: ArticleParty = { kind: "Organization", name: "Hraness" };

const EVIDENCE_COMMIT = "94d3a4cbb66e68ee1f4f6cb35ed69a4cfec2afe3";
const repoFile = (path: string) => `https://github.com/hraness/soulscrape/blob/${EVIDENCE_COMMIT}/${path}`;

export type BlogPost = Readonly<{
  slug: string;
  title: string;
  dek: string;
  eyebrow: string;
  published: ArticleIsoDate;
  updated?: ArticleIsoDate;
  tags: readonly string[];
  /** Markdown file under `content/blog/`. A launch post renders it after its beats. */
  bodyFile: string;
  /** True for the "Introducing" post, whose body opens with the launch beats in app/launch/beats.ts. */
  launchBeats?: true;
  sources: readonly ArticleSourceItem[];
  admission: ArticleAdmission;
}>;

const introducingSources: readonly ArticleSourceItem[] = [
  { title: "Soulscrape: method and use rules", href: repoFile("README.md"), checkedOn: "2026-10-01" },
  { title: "Soulscrape overview", href: repoFile("site/app/page.tsx"), checkedOn: "2026-10-01" },
  { title: "Asking protocol (question packet, intended uses, stop conditions)", href: repoFile("skills/soulscrape/references/questions.md"), checkedOn: "2026-10-01" },
  { title: "Web research under instructions (off by default, identity binding, no background checks)", href: repoFile("skills/soulscrape/references/web-research.md"), checkedOn: "2026-10-01" },
  { title: "Eugene Tssui public index packet", href: repoFile("examples/people/eugene-tssui/person-index.json"), checkedOn: "2026-10-01" },
  { title: "Eugene Tssui public index page", href: "https://soulscrape.com/ben/eugene-tssui", checkedOn: "2026-10-01" },
];

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "introducing-soulscrape",
    title: "Introducing Soulscrape",
    dek: "Soulscrape is a free agent skill that writes a dated dossier on one person, with every claim linked to a source you can open.",
    eyebrow: "Introducing",
    published: "2026-09-24",
    updated: "2026-10-01",
    tags: ["agent skills", "research", "citations", "self-review", "public records"],
    bodyFile: "introducing-soulscrape.md",
    launchBeats: true,
    sources: introducingSources,
    admission: {
      href: "/blog/introducing-soulscrape",
      // Independent current-body review; prior review retained in editorial-provenance.
      lifecycle: "indexable",
      readerJob: "Decide whether Soulscrape fits a task about understanding a person, and how to start a first run.",
      nonObviousAnswer: "A private guide to working with a collaborator needs no sign-off from them, but writing in their voice or building an assistant that works like them does; a public index is made without the subject's consent, so it uses public sources only and never carries contact or family details.",
      originalContribution: "Walks one published dossier (Eugene Tssui) through code-built illustrations of the session, a claim and its sources, and the published formats, and maps each intended use to what it needs from the subject.",
      hostFit: "The product's own introduction, on the product's own host.",
      nearestUrls: [
        { url: "/use-cases", distinction: "Use cases lists tasks with example requests; the post explains who the skill is for, what it refuses, and what a run does." },
        { url: "/docs/quickstart", distinction: "The quickstart is the install procedure; the post links to the docs instead of repeating it." },
      ],
      sources: introducingSources.map((source) => ({ title: source.title, url: source.href, checkedOn: source.checkedOn })),
      observations: [
        "A private collaboration guide and an authorized proxy differ in whose permission they need, which the home page does not spell out.",
        "The Eugene Tssui packet marks his own biography page as subject-controlled, so self-reported claims are visible as such.",
      ],
      scores: {
        readerUtility: 2,
        originalEvidence: 2,
        factualConfidence: 2,
        hostFit: 2,
        voiceIntegrity: 2,
        maintenanceValue: 2,
      },
      owner: "Hraness",
      drafting: "ai",
      review: {
        reviewer: "Codex independent editorial review (AI)",
        reviewerType: "ai",
        reviewedOn: "2026-10-01",
      },
      humanReview: null,
      reassessOn: "2026-11-05",
      harmIfWrong: "A reader could misjudge what consent a use needs, or treat a model of a person as complete.",
      refreshTriggers: [
        "Release tag bump in site/published-release.json",
        "Change to intended-use classes or stop conditions in skills/soulscrape/SKILL.md or references/questions.md",
        "Change to identity-binding, login or paywall rules in references/web-research.md",
        "Change to public index rules (references/public-person-index.md) or docs/publishing.md withdrawal behavior",
        "Eugene Tssui packet revised, withdrawn, or its counts change",
        "Research exchange format version change (export-research.ts) or ontology plan phase change",
        "Product rename",
      ],
    },
  },
];

export const blogAdmissions: readonly ArticleAdmission[] = blogPosts.map((post) => post.admission);

export function blogPostPath(post: Pick<BlogPost, "slug">): `/blog/${string}` {
  return `/blog/${post.slug}`;
}

export function blogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function isIndexablePost(post: BlogPost): boolean {
  return isArticleIndexable(post.admission);
}

/** Posts that may appear in the index, sitemap, feed, and llms.txt, newest first. */
export function indexablePosts(posts: readonly BlogPost[] = blogPosts): readonly BlogPost[] {
  return posts
    .filter(isIndexablePost)
    .slice().sort((left, right) => (left.published < right.published ? 1 : left.published > right.published ? -1 : 0));
}

export function postProvenance(post: BlogPost): ArticleProvenanceRecord {
  return articleProvenanceFromAdmission(post.admission);
}

export function postProvenanceSentence(post: BlogPost): string {
  return articleProvenanceSentence(postProvenance(post));
}

/** The release status label, rendered from the published release record. */
export function releaseStatus(): string {
  return `Latest release: v${publishedRelease.version}`;
}

/** `## Heading` lines of a post, with the ids the renderer gives them. */
export function postHeadings(markdown: string): readonly { id: string; label: string }[] {
  return [...markdown.matchAll(/^## (.+)$/gmu)].map((match) => ({
    id: slugifyHeading(match[1]!),
    label: match[1]!.trim(),
  }));
}

export const blogSite: SearchSite = {
  description: HOME_DESCRIPTION,
  language: "en-US",
  name: SITE_NAME,
  origin: SITE_ORIGIN,
  title: SITE_NAME,
};

export const blogDiscovery: BlogDiscovery = {
  description: BLOG_DESCRIPTION,
  name: `${SITE_NAME} blog`,
  path: BLOG_PATH,
  publisher: BLOG_PARTY,
};

export const blogFeed: FeedDiscovery = {
  authors: [BLOG_PARTY],
  description: BLOG_DESCRIPTION,
  homePath: BLOG_PATH,
  path: BLOG_FEED_PATH,
  title: `${SITE_NAME} blog`,
};

export function isoDateTime(date: ArticleIsoDate): string {
  return `${date}T00:00:00.000Z`;
}

export function postDiscovery(post: BlogPost): ArticleDiscovery {
  const path = blogPostPath(post);
  return {
    authors: [BLOG_PARTY],
    blogPath: BLOG_PATH,
    canonicalPath: path,
    description: post.dek,
    image: {
      alt: `${post.title}: Soulscrape blog`,
      contentType: "image/png",
      height: 630,
      path: `${path}/opengraph-image`,
      width: 1200,
    },
    keywords: post.tags,
    publishedTime: isoDateTime(post.published),
    ...(post.updated === undefined ? {} : { modifiedTime: isoDateTime(post.updated) }),
    publisher: BLOG_PARTY,
    title: post.title,
    type: "BlogPosting",
  };
}

export function blogFeedUpdated(posts: readonly BlogPost[]): string | undefined {
  return posts.length === 0 ? isoDateTime(BLOG_STARTED) : undefined;
}
