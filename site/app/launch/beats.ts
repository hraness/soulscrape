import {
  assertLaunchKit,
  buildSocialKit,
  resolveLaunchBeats,
  type LaunchBeat,
  type LaunchKitOptions,
  type LaunchMessaging,
  type LaunchRelease,
  type SocialKit,
} from "@hraness/design-kit/launch";
import { product } from "@hraness/design-kit/portfolio";

import { SITE_ORIGIN } from "../../lib/site";
import { LAUNCH_STATUS, launchFacts } from "./facts";

/**
 * The beats of "Introducing Soulscrape". Each one is a short section on the
 * page and one post in the launch threads, so each must read on its own.
 * Numbers are {placeholders} filled from ./facts; the design kit rejects a
 * beat that types a digit. Visuals name the mockups in app/mockups/surfaces.tsx.
 */
const authoredBeats: readonly LaunchBeat[] = [
  {
    id: "what",
    part: "what",
    headline: "Soulscrape writes a cited dossier on one person",
    post: "Soulscrape is a free agent skill that writes a dated dossier on one person from sources you're allowed to use. Every claim links to the page it came from, so you can check it yourself.",
    visual: { kind: "mockup", id: "dossier", state: { tab: "essay" } },
    alt: "A published dossier page for the architect Eugene Tssui, with its summary and source counts, in an illustration.",
  },
  {
    id: "scope",
    part: "does",
    headline: "It asks what the dossier is for before it reads anything",
    post: "Before your agent opens a single source, it writes down who the person is, what the dossier is for, who will read it, and which sources are allowed. If something important is unclear, it asks once.",
    visual: { kind: "mockup", id: "session", state: { step: "purpose" } },
    alt: "An agent session recording the subject, use, audience, and allowed sources, then asking one question, in an illustration.",
  },
  {
    id: "kinds",
    part: "does",
    headline: "Facts, beliefs, patterns, and guesses stay apart",
    post: "Every claim is one of {claimKinds} kinds: a fact, something the person says they believe, a pattern across sources, or speculation. A guess is labeled as a guess, never passed off as a fact.",
    visual: { kind: "mockup", id: "claim", state: { kind: "stated_belief", open: "no" } },
    alt: "One claim labeled Stated belief, beside the other three claim labels, in an illustration.",
    facts: ["claimKinds"],
  },
  {
    id: "sources",
    part: "does",
    headline: "Open any claim to see what it rests on",
    post: "The example dossier on the architect Eugene Tssui has {exampleClaims} claims from {exampleSources} sources. Open a claim to see each source and the day it was read. His own sites are marked as his own account.",
    visual: { kind: "mockup", id: "claim", state: { kind: "fact", open: "yes" } },
    alt: "A fact claim opened to its sources, one marked as the subject's own site, in an illustration.",
    facts: ["exampleClaims", "exampleSources"],
  },
  {
    id: "questions",
    part: "does",
    headline: "It says what the record can't settle",
    post: "A dossier ends with open questions instead of smoothing them over. The Tssui dossier lists {exampleOpenQuestions}, like how many of his designs were built: the answer depends on who is counting.",
    visual: { kind: "mockup", id: "dossier", state: { tab: "questions" } },
    alt: "The dossier's open questions section, listing what the sources disagree on, in an illustration.",
    facts: ["exampleOpenQuestions"],
  },
  {
    id: "your-agent",
    part: "how",
    headline: "It runs in your own agent, and you publish nothing by default",
    post: "Soulscrape runs inside Claude Code, Codex, or another agent that loads skills, with your own model. No Soulscrape account. Web research is off until you ask for it, and nothing is published until you review it.",
    visual: { kind: "mockup", id: "session", state: { step: "done" } },
    alt: "The agent checking every claim has a source, then waiting for review before publishing, in an illustration.",
    detailHref: "/docs",
  },
  {
    id: "who",
    part: "who",
    headline: "For interviews, collaborators, and your own public record",
    post: "Use it to prepare for an interview, write a private guide to working with a colleague, or see what the public record says about you. It won't help with background checks, hiring, or other decisions about a person.",
    socialPost: "Use it to prepare for an interview, write a private guide to working with a colleague, or see what the public record says about you.",
    visual: { kind: "mockup", id: "uses", state: {} },
    alt: "The uses Soulscrape accepts, the ones that need the person's permission, and the ones it declines, in an illustration.",
    detailHref: "/use-cases",
  },
  {
    id: "formats",
    part: "vision",
    headline: "Dossiers that people and agents can both read",
    post: "A published dossier is a web page, a JSON file, and a Markdown copy. The goal is public records about people that are dated, cited, and easy to correct, which other tools can read without copying by hand.",
    visual: { kind: "mockup", id: "format", state: { format: "json" } },
    alt: "The same dossier as JSON, with each claim pointing to its source records, in an illustration.",
  },
  {
    id: "limits",
    part: "limits",
    headline: "A dossier is a reading of the evidence, not the person",
    post: "A dossier covers only the sources it was given. It isn't a full picture, a diagnosis, or consent to speak as someone. Anyone can request a correction or removal, and you can withdraw what you publish.",
    visual: { kind: "mockup", id: "format", state: { format: "web" } },
    alt: "A published dossier page with its link to request a correction or removal, in an illustration.",
    detailHref: "/examples",
  },
  {
    id: "status",
    part: "status",
    headline: "Soulscrape is free and MIT licensed",
    post: "{status}. The skill is free and MIT licensed, and installs with one command. Publishing a dossier needs a free Hraness account. Your model and any research service may charge separately.",
    socialPost: "{status}. The skill is free and MIT licensed, and installs with one command. Publishing a dossier needs a free Hraness account.",
    visual: { kind: "mockup", id: "install", state: {} },
    alt: "A terminal installing the Soulscrape skill with one command, in an illustration.",
    facts: ["status"],
  },
];

/** The release names its version in the status, so the digits in it are allowed. */
export const launchBeats: readonly LaunchBeat[] = resolveLaunchBeats(authoredBeats, launchFacts);

export const LAUNCH_POST_SLUG = "introducing-soulscrape";
export const LAUNCH_POST_URL = `${SITE_ORIGIN}/blog/${LAUNCH_POST_SLUG}`;

const messaging = product("soulscrape").messaging;
if (messaging === undefined) throw new Error("The portfolio has no Soulscrape messaging record.");

/** The product's messaging record from the portfolio registry. */
export const launchMessaging: LaunchMessaging = {
  names: { name: messaging.names.name },
  tagline: messaging.tagline,
  meta: messaging.meta,
};

export const launchRelease: LaunchRelease = {
  status: LAUNCH_STATUS,
  tags: ["Artificial Intelligence", "Developer Tools", "Research"],
};

/** The release record names a public install command, so an install call is allowed. */
export const launchKitOptions: LaunchKitOptions = {
  status: LAUNCH_STATUS,
  publicInstall: true,
  tagline: launchMessaging.tagline,
  canonicalUrl: LAUNCH_POST_URL,
};

export const socialKit: SocialKit = buildSocialKit(launchBeats, launchMessaging, launchRelease, LAUNCH_POST_URL);
assertLaunchKit(launchBeats, socialKit, launchKitOptions);
