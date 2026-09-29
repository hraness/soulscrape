import { defineSocialImageSite, type SocialImagePage } from "@hraness/web-discovery/social-image";
import { socialImageFit, socialImageSiteDetails } from "@hraness/web-discovery/social-image/card";

import type { StoredProfile } from "../lib/profile-view";
import { SOCIAL_ICON_SVG } from "./social-icon";

/**
 * Soulscrape's one share-card declaration. Every `opengraph-image` route
 * renders from it through the shared @hraness/web-discovery template and
 * passes only its own page copy.
 */
export const socialSite = defineSocialImageSite({
  description: "Free agent skill that writes dated dossiers on people, sources cited",
  domain: "soulscrape.com",
  icon: {
    kind: "app",
    src: `data:image/svg+xml,${encodeURIComponent(SOCIAL_ICON_SVG)}`,
  },
  name: "Soulscrape",
  theme: {
    accent: "#1E5AE1",
    background: "#F8F7F4",
    foreground: "#1C1917",
    muted: "#6C665F",
  },
});

/**
 * Card copy for each static page. A page's meta description is written for
 * search results and runs longer than the two lines a card draws, so each
 * card carries a shorter version of the same description that fits as
 * written. `tests/social-image.test.ts` checks every entry with
 * `socialImageFit`.
 */
export const socialPages = {
  blog: {
    description: "Posts from Hraness about Soulscrape, the free agent skill that writes cited dossiers.",
    headline: "Blog",
  },
  compare: {
    description: "How a Soulscrape dossier differs from deep research, SOUL.md, Clay, and persona chatbots.",
    headline: "How Soulscrape compares",
  },
  docs: {
    description: "Install the Soulscrape skill, build your first dossier, and publish it as a public index.",
    headline: "Docs",
  },
  examples: {
    description: "Dated dossiers on builders, musicians, scientists, and writers, built from public sources.",
    headline: "Examples",
  },
  notFound: {
    description: "The link may be out of date or mistyped, or its publisher withdrew the dossier.",
    eyebrow: "Not found",
    headline: "No public dossier here",
  },
  useCases: {
    description: "Ground your agent in someone's documented views, or brief yourself before an interview.",
    headline: "Use cases",
  },
} as const satisfies Record<string, SocialImagePage>;

/** Card descriptions for blog posts, by slug. A post without one uses its dek. */
export const socialBlogDescriptions: Readonly<Record<string, string>> = {
  "introducing-soulscrape": "A free agent skill that turns sources you may use into a dated, cited summary of one person.",
};

/** Card descriptions for comparison pages, by slug. */
export const socialCompareDescriptions: Readonly<Record<string, string>> = {
  "character-ai": "Persona chatbots imitate a voice. Soulscrape documents what a real person said and did.",
  clay: "Clay enriches sales leads. Soulscrape writes a cited dossier on how one person thinks.",
  "deep-research": "Deep research answers a question. Soulscrape writes a cited dossier on one person.",
  "persona-prompts": "A persona prompt tells an agent who to be. A dossier gives it cited claims to check.",
};

/** Card descriptions for docs pages, by slug. */
export const socialDocDescriptions: Readonly<Record<string, string>> = {
  "evidence-and-boundaries": "Why a dossier keeps claim kinds apart, asks before guessing, and ties consent to the ask.",
  "person-index": "The fields of a person-index packet, how to read a published index, and its endpoints.",
  "prepare-source-packet": "Turn an export, such as an X archive, into a validated packet the skill reads offline.",
  "publish-person-index": "Sign in with a free Hraness account and publish a dossier you can revise or withdraw.",
  quickstart: "Install the Soulscrape skill, point your agent at authorized evidence, and read the dossier.",
};

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
 * each with the claim and source counts when they also fit, and finally the
 * counts alone. A card never shows a summary cut mid-phrase.
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
  const description = fittedDescription(page, [
    ...phrases.flatMap(phrase => [`${phrase} ${counts}`, phrase]),
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
    description: "Public dossiers, each a dated snapshot of public sources that can be revised or withdrawn.",
    eyebrow: "Publisher",
    headline: `@${username}`,
  };
}
