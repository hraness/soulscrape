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
  "Posts about soulscrape: what it does, how a run works, and what changed.";
/** The day the blog opened. The empty feed uses it as its updated time. */
export const BLOG_STARTED: ArticleIsoDate = "2026-09-24";

export const BLOG_AUTHOR = { kind: "organization", name: "Hraness" } as const;
export const BLOG_PARTY: ArticleParty = { kind: "Organization", name: "Hraness" };

const EVIDENCE_COMMIT = "9db7670";
const repoFile = (path: string) => `https://github.com/hraness/soulscrape/blob/${EVIDENCE_COMMIT}/${path}`;

export type BlogPost = Readonly<{
  slug: string;
  title: string;
  dek: string;
  eyebrow: string;
  published: ArticleIsoDate;
  updated?: ArticleIsoDate;
  tags: readonly string[];
  /** Markdown file under `content/blog/`. */
  bodyFile: string;
  sources: readonly ArticleSourceItem[];
  admission: ArticleAdmission;
}>;

const introducingSources: readonly ArticleSourceItem[] = [
  { title: "soulscrape README (purpose, method, privacy and use rules, rename)", href: repoFile("README.md"), checkedOn: "2026-09-24" },
  { title: "soulscrape.com home page copy (positioning, trust notes, questions)", href: repoFile("site/app/page.tsx"), checkedOn: "2026-09-24" },
  { title: "Asking protocol (question packet, intended uses, stop conditions)", href: repoFile("skills/soulscrape/references/questions.md"), checkedOn: "2026-09-24" },
  { title: "Web research under instructions (off by default, identity binding, no background checks)", href: repoFile("skills/soulscrape/references/web-research.md"), checkedOn: "2026-09-24" },
  { title: "Eugene Tssui public index packet", href: repoFile("examples/people/eugene-tssui/person-index.json"), checkedOn: "2026-09-24" },
  { title: "Eugene Tssui public index page", href: "https://soulscrape.com/ben/eugene-tssui", checkedOn: "2026-09-24" },
  { title: "Changelog (rename from Ensoul in 0.4.0; public indexes in 0.5.0)", href: repoFile("CHANGELOG.md"), checkedOn: "2026-09-24" },
  { title: "Published release record", href: repoFile("site/published-release.json"), checkedOn: "2026-09-24" },
  { title: "People ontology plan (research exchange shipped; broader ontology work in progress)", href: repoFile("docs/plans/people-ontology-v1.md"), checkedOn: "2026-09-24" },
];

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "introducing-soulscrape",
    title: "Introducing soulscrape",
    dek: "soulscrape is a free agent skill that turns sources you are allowed to use into a dated summary of one person, with every claim tied to a source you can open.",
    eyebrow: "Introducing",
    published: "2026-09-24",
    tags: ["agent skills", "research", "citations", "self-review", "public records"],
    bodyFile: "introducing-soulscrape.md",
    sources: introducingSources,
    admission: {
      href: "/blog/introducing-soulscrape",
      // Quarantined until the dual-use review runs; the rubric alone passes (11/12).
      lifecycle: "quarantined",
      readerJob: "Decide whether soulscrape fits a task about understanding a person, and how to start a first run.",
      nonObviousAnswer: "A private guide to working with a collaborator needs no sign-off from them, but writing in their voice or building an assistant that works like them does; a public index is made without the subject's consent, so it uses public sources only and never carries contact or family details.",
      originalContribution: "Walks one published index (Eugene Tssui: 17 sources, 31 claims, 4 open questions) and maps the skill's intended-use classes to what each one needs from the subject.",
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
        maintenanceValue: 1,
      },
      owner: "Hraness",
      drafting: "ai-from-source",
      review: {
        reviewer: "Claude Opus 5.5 (claude-opus-5-5) editorial review",
        reviewerType: "ai",
        reviewedOn: "2026-09-24",
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
      alt: `${post.title}: soulscrape blog`,
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
