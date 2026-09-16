#!/usr/bin/env bun
/** Generate examples/people/peter-steinberger/person-index.json with derived source ids. */

import { writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  parsePersonIndex,
  stablePersonSourceId,
} from "../../../skills/soulscrape/scripts/person-index.ts";

type SourceSpec = Readonly<{
  binding: string;
  mediaType: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt?: string;
  authors?: readonly string[];
  transcriptOf?: string;
  language?: string;
  notes?: string;
}>;

const ACCESSED = "2026-09-16T00:00:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

const steipeteAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — Peter Steinberger",
  url: "https://steipete.me/about",
  publisher: "steipete.me",
  notes:
    "The subject's own biography page; claims here are self-reported. steipete.com and petersteinberger.com both redirect to steipete.me.",
});
const steipetePosts = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "All Posts — Peter Steinberger",
  url: "https://steipete.me/posts",
  publisher: "steipete.me",
  notes:
    "Index of his writing back to 2013, including the announcement posts for his 2025 open-source AI utilities.",
});
const speakingRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "steipete/speaking — Speaking history and topics",
  url: "https://github.com/steipete/speaking",
  publisher: "GitHub",
  notes: "His public conference-speaking history repository, linked from his about page.",
});
const postSpark = source({
  binding: "first_person",
  mediaType: "article",
  title: "Finding My Spark Again",
  url: "https://steipete.me/posts/2025/finding-my-spark-again",
  publisher: "steipete.me",
  publishedAt: "2025-06-01",
  authors: ["Peter Steinberger"],
  notes:
    "His first-person account of the PSPDFKit sale, burnout, retirement, and return to building.",
});
const postOpenAI = source({
  binding: "first_person",
  mediaType: "article",
  title: "OpenClaw, OpenAI and the future",
  url: "https://steipete.me/posts/2026/openclaw",
  publisher: "steipete.me",
  publishedAt: "2026-02-15",
  authors: ["Peter Steinberger"],
  notes: "His announcement of joining OpenAI and moving OpenClaw to a foundation.",
});
const postJustTalk = source({
  binding: "first_person",
  mediaType: "article",
  title: "Just Talk To It — the no-bs Way of Agentic Engineering",
  url: "https://steipete.me/posts/just-talk-to-it",
  publisher: "steipete.me",
  publishedAt: "2025-10-14",
  authors: ["Peter Steinberger"],
});
const openclawNaming = source({
  binding: "first_person",
  mediaType: "article",
  title: "Introducing OpenClaw",
  url: "https://openclaw.ai/blog/introducing-openclaw",
  publisher: "OpenClaw",
  publishedAt: "2026-01-29",
  authors: ["Peter Steinberger"],
  notes:
    "His account of the Clawd → Moltbot → OpenClaw naming journey and the project's viral growth.",
});
const openclawFoundation = source({
  binding: "first_person",
  mediaType: "article",
  title: "Introducing the OpenClaw Foundation",
  url: "https://openclaw.ai/blog/introducing-openclaw-foundation",
  publisher: "OpenClaw Foundation",
  publishedAt: "2026-07-08",
  authors: ["Dave Morin", "Peter Steinberger"],
  notes:
    "Co-authored announcement of the 501(c)(3) foundation, its staff, donors, and partners.",
});
const lexVideo = source({
  binding: "interview",
  mediaType: "video",
  title:
    "OpenClaw: The Viral AI Agent that Broke the Internet — Peter Steinberger | Lex Fridman Podcast #491",
  url: "https://www.youtube.com/watch?v=YFjfBk8HI5o",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2026-02-12",
  authors: ["Lex Fridman"],
});
const pragmatic = source({
  binding: "interview",
  mediaType: "article",
  title: "The creator of Clawd: 'I ship code I don't read'",
  url: "https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code",
  publisher: "The Pragmatic Engineer",
  publishedAt: "2026-01-28",
  authors: ["Gergely Orosz"],
  notes:
    "Write-up of Orosz's London podcast conversation with Steinberger, recorded when Clawd had about 2,000 GitHub stars.",
});
const tbpn = source({
  binding: "interview",
  mediaType: "video",
  title:
    "TBPN: Clawdbot creator Peter Steinberger's first public appearance since launch",
  url: "https://www.youtube.com/watch?v=c4kLgSWUfC8",
  publisher: "TBPN",
  publishedAt: "2026-01-28",
  notes:
    "Live interview on the Technology Brothers show, billed as his first public appearance after Clawdbot went viral.",
});
const builders = source({
  binding: "interview",
  mediaType: "video",
  title: "Builders Unscripted: Ep. 1 — Peter Steinberger, Creator of OpenClaw",
  url: "https://www.youtube.com/watch?v=9jgcT0Fqt7U",
  publisher: "OpenAI",
  publishedAt: "2026-02",
  authors: ["Romain Huet"],
  notes:
    "OpenAI's builder interview series; where he argued that 'vibe coding' has become a slur.",
});
const insight = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "PSPDFKit Announces €100 Million Strategic Investment From Insight Partners to Fuel Growth",
  url: "https://www.insightpartners.com/ideas/pspdfkit-announces-e100-million-strategic-investment-from-insight-partners-to-fuel-growth/",
  publisher: "Insight Partners",
  publishedAt: "2021-10-01",
  notes:
    "Investor announcement of the round; the release is datelined Vienna, Oct. 1, 2021 (the page is dated Nov. 19, 2021).",
});
const nutrientRebrand = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "PSPDFKit rebrands as Nutrient after tripling revenue since strategic investment from Insight Partners in 2021",
  url: "https://www.nutrient.io/blog/pspdfkit-rebrands-to-nutrient",
  publisher: "Nutrient",
  publishedAt: "2024-10-22",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Peter Steinberger (Q137924561)",
  url: "https://www.wikidata.org/wiki/Q137924561",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Peter Steinberger (programmer)",
  url: "https://en.wikipedia.org/wiki/Peter_Steinberger_(programmer)",
  publisher: "Wikipedia",
  notes:
    "Used for discovery and corroboration, not as sole authority; the article was created in 2026 around the OpenClaw news.",
});
const tedai = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Peter Steinberger — TEDAI 2026 Speaker",
  url: "https://tedai-vienna.ted.com/speakers-2026/peter-steinberger",
  publisher: "TEDAI Vienna",
});
const techcrunch = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "PSPDFkit raises $116M, its first outside money; now nearly 1B people use apps powered by its collaboration, signing and markup tools",
  url: "https://techcrunch.com/2021/10/01/pspdfkit-raises-116m-its-first-outside-money-now-nearly-1b-people-use-apps-powered-by-its-collaboration-signing-and-markup-tools/",
  publisher: "TechCrunch",
  publishedAt: "2021-10-01",
  authors: ["Ingrid Lunden"],
});
const reuters = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "OpenClaw founder Steinberger joins OpenAI, open-source bot becomes foundation",
  url: "https://www.reuters.com/business/openclaw-founder-steinberger-joins-openai-open-source-bot-becomes-foundation-2026-02-15/",
  publisher: "Reuters",
  publishedAt: "2026-02-15",
});
const fortune = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Who is OpenClaw creator Peter Steinberger? The millennial developer caught the attention of Sam Altman and Mark Zuckerberg",
  url: "https://fortune.com/2026/02/19/openclaw-who-is-peter-steinberger-openai-sam-altman-anthropic-moltbook/",
  publisher: "Fortune",
  publishedAt: "2026-02-19",
  authors: ["Eva Roytburg"],
});

const S = {
  steipeteAbout: steipeteAbout.id,
  steipetePosts: steipetePosts.id,
  speakingRepo: speakingRepo.id,
  postSpark: postSpark.id,
  postOpenAI: postOpenAI.id,
  postJustTalk: postJustTalk.id,
  openclawNaming: openclawNaming.id,
  openclawFoundation: openclawFoundation.id,
  lexVideo: lexVideo.id,
  pragmatic: pragmatic.id,
  tbpn: tbpn.id,
  builders: builders.id,
  insight: insight.id,
  nutrientRebrand: nutrientRebrand.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  tedai: tedai.id,
  techcrunch: techcrunch.id,
  reuters: reuters.id,
  fortune: fortune.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-peter-steinberger",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "peter-steinberger",
    displayName: "Peter Steinberger",
    alsoKnownAs: ["steipete"],
    summary:
      "Austrian developer and entrepreneur who bootstrapped the PDF-tooling company PSPDFKit (now Nutrient) to a nine-figure exit, then returned from retirement to create OpenClaw, the viral open-source personal AI agent. Since February 2026 he works on personal agents at OpenAI.",
    identity: {
      wikidataId: "Q137924561",
      officialSite: "https://steipete.me/",
      wikipedia: "https://en.wikipedia.org/wiki/Peter_Steinberger_(programmer)",
      profiles: [
        "https://github.com/steipete",
        "https://x.com/steipete",
        "https://www.linkedin.com/in/steipete",
        "https://bsky.app/profile/steipete.me",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T00:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    steipeteAbout,
    steipetePosts,
    speakingRepo,
    postSpark,
    postOpenAI,
    postJustTalk,
    openclawNaming,
    openclawFoundation,
    lexVideo,
    pragmatic,
    tbpn,
    builders,
    insight,
    nutrientRebrand,
    wikidata,
    wikipedia,
    tedai,
    techcrunch,
    reuters,
    fortune,
  ],
  claims: [
    {
      id: "claim-born-1986",
      kind: "fact",
      text: "Peter Steinberger was born on May 22, 1986, in Austria and grew up in a rural part of the country.",
      sourceIds: [S.wikidata, S.wikipedia, S.fortune],
    },
    {
      id: "claim-first-computer",
      kind: "fact",
      text: "He has said he became obsessed with computers at age 14, when a summer guest introduced him to a PC.",
      sourceIds: [S.fortune],
    },
    {
      id: "claim-tu-wien",
      kind: "fact",
      text: "He studied software engineering at the Vienna University of Technology (TU Wien) and later taught mobile development at his alma mater, Fortune reports.",
      sourceIds: [S.fortune, S.wikipedia, S.wikidata],
    },
    {
      id: "claim-first-ios-app",
      kind: "fact",
      text: "Around 2009–2010 he became an early iOS developer: his first app was a client for a dating website, built by scraping its HTML after a frustrating mobile-web experience.",
      sourceIds: [S.pragmatic, S.wikipedia],
    },
    {
      id: "claim-senior-ios",
      kind: "fact",
      text: "Before founding PSPDFKit he worked as a senior iOS engineer in Silicon Valley, according to Fortune's profile.",
      sourceIds: [S.fortune],
    },
    {
      id: "claim-pspdfkit-founding",
      kind: "fact",
      text: "He founded PSPDFKit in Vienna around 2010–2011: a PDF framework and SDK business whose name combines his initials (PS), 'PDF,' and 'kit.'",
      sourceIds: [S.wikipedia, S.techcrunch],
    },
    {
      id: "claim-cofounders",
      kind: "fact",
      text: "Martin Schürrer joined the effort early; Jonathan Rhyne, an American attorney who had been their lawyer, became a third co-founder by 2014 and was CEO by the 2021 investment.",
      sourceIds: [S.techcrunch, S.wikipedia],
    },
    {
      id: "claim-ceo-early-years",
      kind: "fact",
      text: "Steinberger was PSPDFKit's CEO in its early years — he is described as its founder and former CEO — before Rhyne took over the role.",
      sourceIds: [S.wikipedia, S.techcrunch],
    },
    {
      id: "claim-bootstrapped-distributed",
      kind: "fact",
      text: "PSPDFKit was bootstrapped, profitable, and run as a distributed company with R&D in Vienna — more than 40 people by 2019 — whose SDKs powered document features for customers including Dropbox, DocuSign, SAP, IBM, and Volkswagen.",
      sourceIds: [S.techcrunch, S.steipetePosts],
    },
    {
      id: "claim-billion-users",
      kind: "fact",
      text: "By October 2021, apps built on PSPDFKit's technology reached nearly one billion end users across 150 countries.",
      sourceIds: [S.techcrunch, S.insight],
    },
    {
      id: "claim-insight-investment",
      kind: "fact",
      text: "On October 1, 2021, PSPDFKit announced a strategic growth investment of more than €100 million (~$116 million) led by Insight Partners — the company's first outside money; Insight's Ryan Hinkle joined the board.",
      sourceIds: [S.insight, S.techcrunch],
    },
    {
      id: "claim-sold-shares",
      kind: "fact",
      text: "With the Insight deal, Steinberger sold most of his shares; he and Schürrer stepped away from full-time roles while remaining significantly invested, and Rhyne stayed on as CEO.",
      sourceIds: [S.techcrunch, S.insight],
    },
    {
      id: "claim-nine-figure-exit",
      kind: "fact",
      text: "He describes the outcome as having 'bootstrapped PSPDFKit (now Nutrient) to a nine-figure exit.'",
      sourceIds: [S.steipeteAbout],
    },
    {
      id: "claim-nutrient-rebrand",
      kind: "fact",
      text: "In October 2024 PSPDFKit rebranded as Nutrient, having tripled revenue since the 2021 investment and acquired ORPALIS, Aquaforest, and Muhimbi (2022) plus workflow platform Integrify (2024).",
      sourceIds: [S.nutrientRebrand],
    },
    {
      id: "claim-burnout-retirement",
      kind: "fact",
      text: "He says he was 'very broken' after selling his shares — roughly thirteen years of building the company — and left the tech industry for about three years, a stretch he describes as therapy, travel (a one-way ticket to Madrid), and 'catching up on life stuff.'",
      sourceIds: [S.postSpark, S.pragmatic, S.fortune],
    },
    {
      id: "claim-return-2025",
      kind: "fact",
      text: "He returned to building as AI coding tools crossed a usefulness threshold — the 'We are so back' turn he documented in 'Finding My Spark Again' (June 2025) — followed by a prolific run of open-source AI utilities on his blog.",
      sourceIds: [S.postSpark, S.postJustTalk, S.steipetePosts],
    },
    {
      id: "claim-clawdbot-launch",
      kind: "fact",
      text: "In November 2025 he released a weekend project — originally a 'WhatsApp Relay' prototyped in about an hour — as Clawdbot: a personal AI agent that runs on the user's own machine and answers through WhatsApp, Telegram, Discord, and other chat apps.",
      sourceIds: [S.openclawNaming, S.fortune, S.wikipedia],
    },
    {
      id: "claim-viral-growth",
      kind: "fact",
      text: "The project went viral: more than 100,000 GitHub stars and 2 million visitors in a single week within two months of launch, past roughly 180,000 stars by mid-February 2026, and described by the foundation as the fastest-growing repository in GitHub history.",
      sourceIds: [S.openclawNaming, S.openclawFoundation, S.lexVideo, S.reuters],
    },
    {
      id: "claim-rename-saga",
      kind: "fact",
      text: "Anthropic's legal team asked him to reconsider the 'Clawd' name; after a brief 'Moltbot' interval chosen in a 5am Discord brainstorm, the project was renamed OpenClaw on January 29, 2026, this time with trademark searches cleared.",
      sourceIds: [S.openclawNaming, S.lexVideo],
    },
    {
      id: "claim-joins-openai",
      kind: "fact",
      text: "On February 15, 2026, he announced he was joining OpenAI to work on 'bringing agents to everyone'; Sam Altman posted that Steinberger would 'drive the next generation of personal agents.'",
      sourceIds: [S.postOpenAI, S.reuters, S.wikipedia],
    },
    {
      id: "claim-foundation",
      kind: "fact",
      text: "OpenClaw moved to an independent foundation — formally launched July 8, 2026 as a US 501(c)(3) — keeping the project MIT-licensed, with OpenAI as a sponsor and donor and partners including NVIDIA, Microsoft, Red Hat, Tencent, and the University of Michigan.",
      sourceIds: [S.openclawFoundation, S.reuters],
    },
    {
      id: "claim-claw-labs",
      kind: "fact",
      text: "Inside OpenAI he leads 'Claw Labs,' a team working on shared product improvements with the OpenClaw project.",
      sourceIds: [S.openclawFoundation],
    },
    {
      id: "claim-moltbook",
      kind: "fact",
      text: "The project's virality spawned community offshoots including Moltbook, a social network where AI agents post — created during the brief 'Moltbot' naming interval — and ClawCon meetups that spread to dozens of cities.",
      sourceIds: [S.lexVideo, S.openclawFoundation],
    },
    {
      id: "claim-commits-january",
      kind: "fact",
      text: "In January 2026 he logged more than 6,600 commits while running multiple coding agents in parallel — output he frames as one person operating like a small company: 'one dude sitting at home having fun.'",
      sourceIds: [S.pragmatic],
    },
    {
      id: "claim-tedai-talk",
      kind: "fact",
      text: "He is a scheduled speaker at TEDAI Vienna (October 28–30, 2026) with a talk titled 'Agents without permission.'",
      sourceIds: [S.tedai],
    },
    {
      id: "claim-move-us",
      kind: "fact",
      text: "In 2026 he said he was moving to the United States — his about page now says he lives in San Francisco — citing Europe's regulation-first climate for AI.",
      sourceIds: [S.steipeteAbout, S.wikipedia, S.fortune],
    },
    {
      id: "claim-conference-speaker",
      kind: "fact",
      text: "He has a long history as an iOS-developer conference speaker and blogger (writing since 2013) and maintains a public speaking-history repository.",
      sourceIds: [S.speakingRepo, S.steipetePosts, S.steipeteAbout],
    },
    {
      id: "claim-builder-at-heart",
      kind: "stated_belief",
      text: "'I'm a builder at heart. I did the whole creating-a-company game already... What I want is to change the world, not build a large company' — his stated reason for joining OpenAI rather than founding a company around OpenClaw.",
      sourceIds: [S.postOpenAI],
    },
    {
      id: "claim-your-machine-your-rules",
      kind: "stated_belief",
      text: "He argues personal AI should run where the user chooses — 'Your assistant. Your machine. Your rules.' — so the assistant's keys and data stay with the owner instead of a SaaS provider.",
      sourceIds: [S.openclawNaming, S.openclawFoundation],
    },
    {
      id: "claim-vibe-coding-slur",
      kind: "stated_belief",
      text: "He says 'vibe coding' has become a slur that wrongly implies ease; coding with agents is a learned skill, which he compares to learning to play guitar.",
      sourceIds: [S.builders, S.lexVideo],
    },
    {
      id: "claim-closed-loop",
      kind: "stated_belief",
      text: "He holds that the core of agentic engineering is the closed loop: the agent must be able to compile, lint, execute, and verify its own output before a human looks at it.",
      sourceIds: [S.pragmatic, S.postJustTalk],
    },
    {
      id: "claim-agents-replace-apps",
      kind: "stated_belief",
      text: "He expects agents to replace most apps — on Lex Fridman's podcast he put it at roughly 80 percent — because an assistant that can act removes the need for single-purpose software.",
      sourceIds: [S.lexVideo],
    },
    {
      id: "claim-fun-and-inspire",
      kind: "stated_belief",
      text: "He frames his AI work around play rather than strategy: 'my goal was to have fun and inspire people.'",
      sourceIds: [S.postOpenAI],
    },
    {
      id: "claim-eu-regulation",
      kind: "stated_belief",
      text: "He argues Europe's regulation-and-caution culture stifles ambitious AI work, and cites it as a reason for relocating to the United States.",
      sourceIds: [S.wikipedia, S.fortune],
    },
    {
      id: "claim-ships-unread-code",
      kind: "pattern",
      text: "He ships AI-written code he hasn't read — 'most code is boring' — while directing several agents in parallel and renaming pull requests 'prompt requests.'",
      sourceIds: [S.pragmatic, S.builders, S.postJustTalk],
    },
    {
      id: "claim-open-by-default",
      kind: "pattern",
      text: "Across eras he releases work publicly: iOS-era libraries like InterposeKit, the 2025 run of AI utilities, and OpenClaw under an MIT license now stewarded by a non-profit.",
      sourceIds: [S.steipetePosts, S.openclawFoundation, S.steipeteAbout],
    },
    {
      id: "claim-lobster-community",
      kind: "pattern",
      text: "A playful crustacean identity — 'the claw is the law,' clawtributors, ClawCon events — has persisted through every rename and into the foundation's public posture.",
      sourceIds: [S.openclawNaming, S.openclawFoundation],
    },
    {
      id: "claim-founding-year-varies",
      kind: "speculation",
      text: "Sources disagree on PSPDFKit's founding year: Wikipedia says 2010, TechCrunch 'around 2011,' and his own 2019 writing dates the company's beginnings to 2011 with code going back to 2009.",
      sourceIds: [S.wikipedia, S.techcrunch, S.steipetePosts],
    },
    {
      id: "claim-exit-timing-unclear",
      kind: "speculation",
      text: "Exactly when he fully exited is unclear: the October 2021 deal ended his full-time role, while early-2026 interviews describe roughly three to four years of retirement.",
      sourceIds: [S.techcrunch, S.pragmatic, S.fortune],
    },
    {
      id: "claim-meta-interest",
      kind: "speculation",
      text: "Reports say he fielded acquisition interest from Meta and caught Mark Zuckerberg's attention before choosing OpenAI; the terms of any offers were never disclosed.",
      sourceIds: [S.wikipedia, S.fortune, S.lexVideo],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1986-05-22",
      title: "Born in Austria",
      summary: "Born May 22, 1986; raised in a rural part of Austria.",
      sourceIds: [S.wikidata, S.wikipedia, S.fortune],
    },
    {
      id: "event-first-computer",
      kind: "other",
      date: "2000",
      title: "First PC at age fourteen",
      summary:
        "A summer guest introduced him to a PC at 14, sparking the obsession he describes in interviews.",
      sourceIds: [S.fortune],
    },
    {
      id: "event-first-ios-app",
      kind: "project",
      date: "2009",
      title: "Starts building for iPhone OS",
      summary:
        "While studying at TU Wien he became an early iOS developer; his first app scraped a dating site's HTML into a native client.",
      location: "Vienna, Austria",
      sourceIds: [S.pragmatic, S.wikipedia, S.fortune],
    },
    {
      id: "event-pspdfkit",
      kind: "founded",
      date: "2011",
      title: "Founds PSPDFKit in Vienna",
      summary:
        "Grew out of his own iOS PDF framework work around 2010–2011; sources differ on the exact year.",
      location: "Vienna, Austria",
      organization: "PSPDFKit",
      sourceIds: [S.wikipedia, S.techcrunch, S.steipetePosts],
    },
    {
      id: "event-rhyne-cofounder",
      kind: "role",
      date: "2014",
      title: "Jonathan Rhyne becomes third co-founder",
      summary:
        "Their US attorney left law practice to join Steinberger and Martin Schürrer as co-founder; he later became CEO.",
      organization: "PSPDFKit",
      sourceIds: [S.techcrunch],
    },
    {
      id: "event-insight-deal",
      kind: "milestone",
      date: "2021-10-01",
      title: "Insight Partners invests more than €100 million",
      summary:
        "PSPDFKit's first outside money (~$116M); Steinberger sold most of his shares and stepped away from full-time work.",
      organization: "PSPDFKit",
      sourceIds: [S.insight, S.techcrunch],
    },
    {
      id: "event-retirement-hiatus",
      kind: "other",
      date: "2022",
      title: "Retires from the tech industry",
      summary:
        "Burned out after roughly thirteen years, he left for about three years — therapy, travel, and distance from tech.",
      sourceIds: [S.postSpark, S.pragmatic, S.fortune],
    },
    {
      id: "event-nutrient-rebrand",
      kind: "milestone",
      date: "2024-10-22",
      title: "PSPDFKit rebrands as Nutrient",
      summary:
        "The renamed company had tripled revenue since 2021 after a series of acquisitions.",
      organization: "Nutrient",
      sourceIds: [S.nutrientRebrand],
    },
    {
      id: "event-return-to-building",
      kind: "other",
      date: "2025",
      title: "Returns to building with AI",
      summary:
        "Marked by the late-2024 'We are so back' turn and the June 2025 essay 'Finding My Spark Again,' followed by a run of open-source AI utilities.",
      sourceIds: [S.postSpark, S.steipetePosts],
    },
    {
      id: "event-clawdbot-launch",
      kind: "project",
      date: "2025-11",
      title: "Releases Clawdbot",
      summary:
        "A weekend project — originally 'WhatsApp Relay' — that became the personal AI agent later named OpenClaw.",
      sourceIds: [S.openclawNaming, S.wikipedia],
    },
    {
      id: "event-openclaw-rename",
      kind: "milestone",
      date: "2026-01-29",
      title: "Clawd → Moltbot → OpenClaw",
      summary:
        "Renamed after Anthropic's trademark concerns; by then the project had passed 100,000 GitHub stars.",
      sourceIds: [S.openclawNaming, S.lexVideo],
    },
    {
      id: "event-joins-openai",
      kind: "role",
      date: "2026-02-15",
      title: "Joins OpenAI",
      summary:
        "Announced he would work on 'bringing agents to everyone'; OpenClaw was pledged to a foundation, staying open source.",
      organization: "OpenAI",
      location: "San Francisco",
      sourceIds: [S.postOpenAI, S.reuters],
    },
    {
      id: "event-foundation-launch",
      kind: "founded",
      date: "2026-07-08",
      title: "OpenClaw Foundation launches",
      summary:
        "A US 501(c)(3) with a full-time team, major donors and partners including OpenAI, NVIDIA, Microsoft, Red Hat, and the University of Michigan.",
      organization: "OpenClaw Foundation",
      sourceIds: [S.openclawFoundation],
    },
    {
      id: "event-tedai-2026",
      kind: "other",
      date: "2026-10-28",
      end: "2026-10-30",
      title: "Scheduled talk at TEDAI Vienna",
      summary:
        "Slated to speak on 'Agents without permission' at the TED-focused AI conference.",
      location: "Vienna, Austria",
      organization: "TEDAI Vienna",
      sourceIds: [S.tedai],
    },
  ],
  themes: [
    {
      id: "theme-personal-agent",
      kind: "philosophy",
      status: "stated",
      title: "An agent even his mum can use",
      summary:
        "His stated mission is a personal AI assistant that acts on your behalf from the chat apps you already use — built for everyone, not just developers.",
      sourceIds: [S.postOpenAI, S.openclawNaming, S.tedai],
    },
    {
      id: "theme-own-your-machine",
      kind: "belief",
      status: "stated",
      title: "Your assistant, your machine, your rules",
      summary:
        "Agents should run where the user chooses — laptop, homelab, or VPS — with the user's keys and data; he wants OpenClaw stewarded as neutral ground, 'the Switzerland of AI.'",
      sourceIds: [S.openclawNaming, S.openclawFoundation],
    },
    {
      id: "theme-agentic-engineering",
      kind: "method",
      status: "stated",
      title: "Agentic engineering as a craft",
      summary:
        "Closed loops, parallel agents, and judgment over typing: he calls 'vibe coding' a slur because the skill is real, like learning guitar.",
      sourceIds: [S.postJustTalk, S.pragmatic, S.builders],
    },
    {
      id: "theme-builder-not-company",
      kind: "belief",
      status: "stated",
      title: "Builder, not company-builder",
      summary:
        "Having already done 'the whole creating-a-company game,' he says starting another big company holds no appeal — impact through a lab plus a foundation does.",
      sourceIds: [S.postOpenAI],
    },
    {
      id: "theme-open-by-default",
      kind: "practice",
      status: "stated",
      title: "Open source everything",
      summary:
        "He builds in public and ships nearly all of it as open source — from iOS-era libraries to the 2025 AI utilities to OpenClaw under MIT at a non-profit.",
      sourceIds: [S.steipeteAbout, S.steipetePosts, S.openclawFoundation],
    },
    {
      id: "theme-burnout-and-return",
      kind: "belief",
      status: "stated",
      title: "Public about burnout and renewal",
      summary:
        "He writes openly about being 'very broken' after the exit, the emptiness of retirement, therapy, and the moment his 'spark' returned — an unusually candid founder narrative.",
      sourceIds: [S.postSpark, S.pragmatic],
    },
    {
      id: "theme-distributed-work",
      kind: "method",
      status: "reported",
      title: "Distributed teams before it was normal",
      summary:
        "PSPDFKit ran remote-first with proposal-driven development and release trains years before the pandemic made it standard.",
      sourceIds: [S.techcrunch, S.steipetePosts],
    },
    {
      id: "theme-speed-as-style",
      kind: "practice",
      status: "reported",
      title: "Throughput as identity",
      summary:
        "Weekend prototypes, 6,600 commits in a month, 'prompt requests' instead of pull requests — the press and his own writing both frame speed as his signature.",
      sourceIds: [S.pragmatic, S.openclawNaming, S.postJustTalk],
    },
    {
      id: "theme-europe-vs-us",
      kind: "belief",
      status: "stated",
      title: "Europe regulates, America builds",
      summary:
        "He argues Europe's caution-first regulatory culture stifles ambitious AI work and cites it as a reason for moving to San Francisco.",
      sourceIds: [S.wikipedia, S.fortune],
    },
  ],
  works: [
    {
      id: "work-pspdfkit",
      kind: "product",
      status: "released",
      title: "PSPDFKit",
      date: "2011",
      location: "Vienna, Austria",
      summary:
        "The PDF and document-processing SDK business he founded and bootstrapped; renamed Nutrient in 2024 after the Insight Partners investment.",
      sourceIds: [S.techcrunch, S.insight, S.nutrientRebrand],
    },
    {
      id: "work-openclaw",
      kind: "project",
      status: "ongoing",
      title: "OpenClaw (formerly Clawdbot, Moltbot)",
      date: "2025-11",
      summary:
        "The open-source personal AI agent that runs on the user's machine and answers through chat apps; MIT-licensed and stewarded by the OpenClaw Foundation.",
      sourceIds: [S.openclawNaming, S.openclawFoundation, S.reuters],
    },
    {
      id: "work-openclaw-foundation",
      kind: "other",
      status: "ongoing",
      title: "OpenClaw Foundation",
      date: "2026-07-08",
      summary:
        "The US 501(c)(3) he co-launched to keep OpenClaw open and independent, backed by OpenAI, NVIDIA, Microsoft, Red Hat, Tencent, and the University of Michigan.",
      sourceIds: [S.openclawFoundation],
    },
    {
      id: "work-vibetunnel",
      kind: "project",
      status: "released",
      title: "VibeTunnel",
      date: "2025",
      summary:
        "Open-source tool that turns any browser into a terminal for his Mac — his first widely-shared AI-era project.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-peekaboo",
      kind: "project",
      status: "released",
      title: "Peekaboo",
      date: "2025",
      summary:
        "Lightning-fast macOS screenshot tooling for AI agents, shipped as a CLI and MCP server.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-vibe-meter",
      kind: "project",
      status: "released",
      title: "Vibe Meter",
      date: "2025",
      summary: "Menu-bar app for monitoring Claude Code and other AI usage costs.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-poltergeist",
      kind: "project",
      status: "released",
      title: "Poltergeist",
      date: "2025",
      summary: "A build watcher that keeps native builds fresh for agentic workflows.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-demark",
      kind: "project",
      status: "released",
      title: "Demark",
      date: "2025",
      summary: "A fast HTML-to-Markdown converter written in Swift.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-llm-codes",
      kind: "project",
      status: "released",
      title: "llm.codes",
      date: "2025",
      summary: "A service that makes Apple developer documentation AI-readable.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-stats-store",
      kind: "project",
      status: "released",
      title: "stats.store",
      date: "2025",
      summary: "Privacy-first analytics for Sparkle-based Mac app updates.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-interposekit",
      kind: "project",
      status: "released",
      title: "InterposeKit",
      date: "2020",
      summary: "His open-source Swift library for elegant method swizzling.",
      sourceIds: [S.steipetePosts],
    },
    {
      id: "work-steipete-blog",
      kind: "other",
      status: "ongoing",
      title: "steipete.me",
      date: "2013",
      summary:
        "His long-running technical blog — deep-dive iOS debugging posts in the PSPDFKit years, then a prolific run of agentic-engineering essays from 2025.",
      sourceIds: [S.steipetePosts, S.steipeteAbout],
    },
  ],
  appearances: [
    {
      id: "appearance-lex-fridman",
      title: "OpenClaw: The Viral AI Agent that Broke the Internet (#491)",
      venue: "Lex Fridman Podcast",
      publishedAt: "2026-02-12",
      participants: ["Peter Steinberger", "Lex Fridman"],
      summary:
        "A ~4-hour interview covering the OpenClaw origin story, the name-change saga, security concerns, agentic engineering, and the acquisition offers from OpenAI and Meta.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=YFjfBk8HI5o",
          sourceId: S.lexVideo,
        },
      ],
      sourceIds: [S.lexVideo],
    },
    {
      id: "appearance-pragmatic-engineer",
      title: "The creator of Clawd: 'I ship code I don't read'",
      venue: "The Pragmatic Engineer",
      publishedAt: "2026-01-28",
      participants: ["Peter Steinberger", "Gergely Orosz"],
      summary:
        "Recorded in London as Clawdbot's popularity took off: PSPDFKit's rise, his burnout and return, and how one person ships like a team with parallel agents.",
      sourceIds: [S.pragmatic],
    },
    {
      id: "appearance-tbpn",
      title: "First public appearance since launching Clawdbot",
      venue: "TBPN",
      publishedAt: "2026-01-28",
      participants: ["Peter Steinberger", "John Coogan", "Jordi Hays"],
      summary:
        "A live interview on the Technology Brothers show during the viral week, covering the build, the reaction, and what came next.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=c4kLgSWUfC8",
          sourceId: S.tbpn,
        },
      ],
      sourceIds: [S.tbpn],
    },
    {
      id: "appearance-builders-unscripted",
      title: "Builders Unscripted: Ep. 1",
      venue: "OpenAI",
      publishedAt: "2026-02",
      participants: ["Peter Steinberger", "Romain Huet"],
      summary:
        "OpenAI's builder-interview series, recorded during his first week in San Francisco; where he called 'vibe coding' a slur.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=9jgcT0Fqt7U",
          sourceId: S.builders,
        },
      ],
      sourceIds: [S.builders],
    },
    {
      id: "appearance-tedai-2026",
      title: "Agents without permission",
      venue: "TEDAI Vienna 2026",
      publishedAt: "2026-10-28",
      participants: ["Peter Steinberger"],
      summary:
        "Scheduled TED-stage talk at the Vienna AI conference: a founder's case for building AI that acts first and asks later, and the guardrails that make it survivable.",
      sourceIds: [S.tedai],
    },
  ],
  openQuestions: [
    "PSPDFKit's founding year is reported variously as 2010 (Wikipedia), 'around 2011' (TechCrunch), and 'beginnings in 2011' in his own writing, with code he dates to 2009 — the index preserves the range.",
    "Exactly when he fully exited PSPDFKit/Nutrient is unsettled: the October 2021 deal ended his full-time role, while early-2026 interviews describe roughly three to four years of retirement.",
    "OpenClaw's all-time GitHub ranking is asserted differently across sources — 'most-starred software project' on his own about page versus 'fastest-growing repository in GitHub history' from the foundation and press.",
    "The scope of his OpenAI role beyond 'next generation of personal agents' and the Claw Labs team is not publicly detailed.",
    "His exact birth date (May 22, 1986) traces to an Austrian business-register record cited by Wikidata; English-language press reports only the year.",
  ],
  body: `Peter Steinberger is an Austrian programmer who built two very different careers out of the same instinct: when a tool he wants doesn't exist, he prompts or codes it into existence. The first produced PSPDFKit, a bootstrapped document-tooling company whose SDKs ended up inside apps used by nearly a billion people. The second produced OpenClaw — the open-source personal AI agent that went from a weekend hack to one of the fastest-growing projects in GitHub history and carried him back from retirement into a job at OpenAI.

## From rural Austria to the iOS frontier

Born May 22, 1986 and raised in rural Austria, Steinberger has said he became obsessed with computers at fourteen, when a summer guest introduced him to a PC. He studied software engineering at TU Wien and, around 2009–2010, became an early iOS developer — his first app was a client for a dating website, built by scraping its HTML after the mobile web version ate a long message he had written. Fortune's profile reports that he worked as a senior iOS engineer in Silicon Valley and later taught mobile development back at his alma mater. Along the way he became a fixture of the iOS community: a prolific technical blogger, open-source contributor, and conference speaker whose speaking history he still keeps on GitHub.

## PSPDFKit: the bootstrap

PSPDFKit grew out of his own iOS PDF framework work around 2010–2011 — the name is literally his initials plus "PDF kit." Martin Schürrer joined him early, and in 2014 their American lawyer Jonathan Rhyne left legal practice to become the third co-founder and eventual CEO. The company stayed bootstrapped, profitable, and remote-first long before that was normal — proposal-driven development, release trains, Slack-triggered release bots — while its SDKs quietly powered viewing, annotation, signing, and form-filling inside apps from Dropbox, DocuSign, SAP, IBM, and Volkswagen.

On October 1, 2021, PSPDFKit announced its first outside money: a strategic growth investment of more than €100 million (about $116 million) led by Insight Partners, with Insight's Ryan Hinkle joining the board. Steinberger sold most of his shares in the deal and stepped away from full-time work; his about page describes the arc as bootstrapping the company "to a nine-figure exit." The company later tripled revenue, absorbed acquisitions including ORPALIS, Aquaforest, Muhimbi, and Integrify, and rebranded as Nutrient in October 2024.

## Burnout, retirement, and the return

The exit came at a personal cost he describes unusually candidly. After roughly thirteen years of pouring "200%" into the company he was "very broken"; he booked a one-way ticket to Madrid and spent about three years outside the industry — therapy, travel, and what he calls hunting hedonic pleasures while carrying an emptiness around. The turn is documented in his June 2025 essay "Finding My Spark Again": building had always been the thing that gave him joy, and AI had finally become interesting enough to pull him back. What followed was a prolific open-source streak — VibeTunnel, Peekaboo, Vibe Meter, Poltergeist, Demark, llm.codes, stats.store — and a run of essays on what he calls agentic engineering, written while directing multiple coding agents in parallel.

## OpenClaw and the agent wave

In November 2025 he hacked together a weekend project — originally a "WhatsApp Relay" — released as Clawdbot: an agent that runs on your own machine and does things for you through WhatsApp, Telegram, Discord, and other chat apps. "I was annoyed that it didn't exist, so I just prompted it into existence," he told Lex Fridman. Two months later it had over 100,000 GitHub stars and 2 million visitors in a single week; by mid-February 2026 it was past roughly 180,000. The name went through its own saga: Anthropic's legal team objected to "Clawd," a 5am Discord brainstorm produced "Moltbot," and on January 29, 2026 he announced OpenClaw — trademark-checked this time, lobster mascot intact. The frenzy spawned community offshoots like Moltbook, an agent-only social network, and ClawCon meetups in dozens of cities.

On February 15, 2026, he announced he was joining OpenAI — after a San Francisco week talking to the major labs, and reportedly turning down Meta — because it was "the fastest way" to bring his vision to everyone. OpenClaw would stay open under an independent foundation, which formally launched July 8, 2026 as a US 501(c)(3) with OpenAI, NVIDIA, Microsoft, Red Hat, Tencent, and the University of Michigan among its backers; inside OpenAI he leads Claw Labs and works on "the next generation of personal agents." His stated bar for success: an agent even his mum can use.

## What he believes

The through-line is personal agency over software. "Your assistant. Your machine. Your rules." — AI that answers to you, runs where you choose, and holds your keys and data, with the foundation positioned as neutral ground, "the Switzerland of AI." He expects agents to replace most apps outright. He is equally insistent that working this way is a craft: "vibe coding," he argues, has become a slur that hides a real skill — closed loops where the agent verifies its own work, parallel sessions, judgment instead of typing. He ships code he hasn't read because "most code is boring," and he rebranded the pull request as the "prompt request." And he is blunt about geography: Europe's regulation-first culture, he says, stifles this kind of ambition — one reason he now lives in San Francisco.

## What the record does not settle

The seams are mostly in dates and superlatives. PSPDFKit's founding year is variously 2010, 2011, and "beginnings in 2011" with code from 2009. His full exit is pinned only loosely between the October 2021 deal and "about three years" of retirement described in early-2026 interviews. OpenClaw's GitHub ranking is claimed as both "most-starred" and "fastest-growing" depending on the source. And the exact shape of his OpenAI mandate — beyond personal agents and Claw Labs — has not been publicly detailed.

*This index was compiled from public sources and does not imply the subject's endorsement. Citations live in the packet's source catalog.*`,
  provenance: {
    tool: "soulscrape",
    method: "public-person-index-v1",
    contributors: ["Soulscrape research workflow"],
  },
};

const validated = parsePersonIndex(packet);
const output = `${JSON.stringify(validated, null, 2)}\n`;
writeFileSync(join(import.meta.dir, "person-index.json"), output);
process.stdout.write(`wrote person-index.json (${output.length} bytes)\n`);
