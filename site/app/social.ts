import { marketing } from "../portfolio-copy";
import { defineSocialImageSite, type SocialImagePage } from "@hraness/web-discovery/social-image";
import { socialImageFit, socialImageSiteDetails } from "@hraness/web-discovery/social-image/card";

import type { BlogPost } from "../lib/blog";
import type { Comparison } from "../lib/compare";
import type { DocPage } from "../lib/docs";
import { sentenceCase } from "../lib/metadata";
import type { StoredProfile } from "../lib/profile-view";
import { SOCIAL_MARK_SVG } from "./social-mark";

/**
 * Soulscrape's one share-card declaration. Every `opengraph-image` route
 * renders from it through the shared @hraness/web-discovery template and
 * passes only its own page copy.
 */
export const socialSite = defineSocialImageSite({
  // The header shows the product name beside the foil mark.
  brand: marketing.names.name,
  brandMark: SOCIAL_MARK_SVG,
  description: `${marketing.short.replace(/[.!?]$/, "")}.`,
  domain: "soulscrape.com",
  // Names a headline must not split across its line break.
  keepTogether: ["deep research", "Hraness account", "persona chatbots"],
  name: marketing.names.name,
  // The `data-palette` the site sets on <html> in app/layout.tsx.
  palette: "gruvbox",
});

/**
 * Card copy for each static page. A page's meta description is written for
 * search results and runs longer than the two lines a card draws, so each
 * card carries a shorter version of the same description that fits as
 * written. `path` gives a card its section eyebrow ("/docs" is
 * Documentation). `tests/social-image.test.ts` checks every entry with
 * `socialImageFit`.
 */
export const socialPages = {
  blog: {
    description: "From Hraness, on the free agent skill that writes a dated, cited dossier on one person.",
    headline: "Posts about Soulscrape",
    path: "/blog",
  },
  compare: {
    description: "When to pick Soulscrape, and when not to.",
    headline: "Which tool answers which question",
    path: "/compare",
  },
  docs: {
    description: "Install the skill, build a dossier, and publish it.",
    headline: "Build your first dossier",
    path: "/docs",
  },
  examples: {
    description: "Dated dossiers on builders, musicians, scientists, and writers, from public sources.",
    eyebrow: "Examples",
    headline: "People worth following",
  },
  /** A docs, blog, or comparison address with no page behind it. */
  missingPage: {
    description: "The link may be out of date or mistyped.",
    eyebrow: "Not found",
    headline: "No page at this link",
  },
  notFound: {
    description: "The link is mistyped or the dossier withdrawn.",
    eyebrow: "Not found",
    headline: "No public dossier here",
  },
  useCases: {
    description: "Ground your agent in someone's documented views, or brief yourself before an interview.",
    headline: "What a dossier is for",
    path: "/use-cases",
  },
} as const satisfies Record<string, SocialImagePage>;

/** Card descriptions for blog posts, by slug. */
export const socialBlogDescriptions: Readonly<Record<string, string>> = {
  "introducing-soulscrape": "A free agent skill that writes a dated dossier on one person, each claim linked to a source.",
};

/**
 * Card eyebrows for blog posts whose section label is not "Blog". A post's
 * own eyebrow ("Introducing") repeats its headline, so the launch post uses
 * the portfolio's Release label.
 */
export const socialBlogEyebrows: Readonly<Record<string, string>> = {
  "introducing-soulscrape": "Release",
};

/** Card descriptions for comparison pages, by slug. */
export const socialCompareDescriptions: Readonly<Record<string, string>> = {
  "character-ai": "A voice to chat with, or what a person has said.",
  clay: "Clay enriches sales leads. Soulscrape writes a cited dossier on how one person thinks.",
  "deep-research": "A cited report on a question, or on a person.",
  "persona-prompts": "Who to be, or cited claims an agent can check.",
};

/** Card descriptions for docs pages, by slug. */
export const socialDocDescriptions: Readonly<Record<string, string>> = {
  "evidence-and-boundaries": "Why a dossier keeps claim kinds apart, asks before guessing, and ties consent to the ask.",
  "person-index": "The fields of a person-index packet, how to read one, and its public endpoints.",
  "prepare-source-packet": "Turn an export, such as an X archive, into a validated packet the skill reads offline.",
  "publish-person-index": "Sign in with a free Hraness account and publish a dossier you can revise or withdraw.",
  quickstart: "Install the skill and review the dossier it writes.",
};

/** A blog post's card. */
export function blogPostSocialPage(post: Pick<BlogPost, "dek" | "slug" | "title">): SocialImagePage {
  const eyebrow = socialBlogEyebrows[post.slug];
  return {
    description: socialBlogDescriptions[post.slug] ?? post.dek,
    headline: post.title,
    path: `/blog/${post.slug}`,
    ...(eyebrow === undefined ? {} : { eyebrow }),
  };
}

/** A comparison page's card. */
export function comparisonSocialPage(entry: Pick<Comparison, "description" | "slug" | "title">): SocialImagePage {
  return {
    description: socialCompareDescriptions[entry.slug] ?? entry.description,
    headline: entry.title,
    path: `/compare/${entry.slug}`,
  };
}

/** A docs page's card. */
export function docSocialPage(page: Pick<DocPage, "description" | "slug" | "title">): SocialImagePage {
  return {
    description: socialDocDescriptions[page.slug] ?? page.description,
    headline: sentenceCase(page.title),
    path: `/docs/${page.slug}`,
  };
}

/** The first candidate description that fits the card as written, if any. */
function fittedDescription(
  page: Omit<SocialImagePage, "description">,
  candidates: readonly string[],
): string | undefined {
  return candidates.find(description =>
    socialImageFit(socialImageSiteDetails(socialSite, { ...page, description })).issues.length === 0);
}

function counted(count: number, singular: string, plural: string): string {
  return `${String(count)} ${count === 1 ? singular : plural}`;
}

function firstSentence(text: string): string {
  return text.match(/^.+?[.!?](?=\s|$)/u)?.[0] ?? text;
}

/**
 * The summary's opening noun phrase ("American software engineer and
 * entrepreneur"), ending before the first aside, relative clause, or list of
 * credits; undefined when that leaves fewer than three words.
 */
function leadPhrase(text: string, boundary: RegExp): string | undefined {
  const lead = text.split(boundary)[0]?.replace(/[\s,.;:]+$/u, "");
  return lead !== undefined && lead.split(" ").length >= 3 ? `${lead}.` : undefined;
}

const LEAD_BOUNDARY = / [—–] |: |; | \(| who | whose |(?:,? best)? known | working | founded |, born /u;

/**
 * A published dossier's card. The eyebrow names the publisher so the card
 * never reads as if the publisher were the subject. Summaries are
 * member-written and often run to a paragraph, so the description is the
 * first of these that fits the card as written: the whole summary, its first
 * sentence, its opening noun phrase, or the phrase before its first comma,
 * first each followed by the claim and source counts, then each alone, and
 * finally the counts alone. A card never shows a summary cut mid-phrase.
 */
export function personSocialPage(profile: StoredProfile): SocialImagePage {
  const { claims, generatedAt, sources, subject } = profile.packet;
  const counts = `${counted(claims.length, "cited claim", "cited claims")} from ${counted(sources.length, "source", "sources")}.`;
  const page = {
    eyebrow: `Dossier by @${profile.username} · ${generatedAt.slice(0, 10)}`,
    headline: subject.displayName,
  };
  const summary = subject.summary.replace(/\s+/gu, " ").trim();
  const phrases = [
    summary,
    firstSentence(summary),
    leadPhrase(summary, LEAD_BOUNDARY),
    leadPhrase(summary, /,/u),
  ].filter((phrase): phrase is string => phrase !== undefined);
  // Every phrase with the counts comes first, so dossier cards carry the
  // same "N cited claims from M sources" line whenever it fits at all.
  const description = fittedDescription(page, [
    ...phrases.map(phrase => `${phrase} ${counts}`),
    ...phrases,
    counts,
  ]);
  return description === undefined ? page : { ...page, description };
}

/**
 * A publisher's card, in the words of the publisher page's own description.
 * It counts nothing, so it cannot disagree with the curated list the page
 * shows for the example account.
 */
export function publisherSocialPage(username: string): SocialImagePage {
  return {
    description: "Public dossiers, each a dated snapshot that can be revised or withdrawn.",
    eyebrow: "Publisher",
    headline: `@${username}`,
  };
}
