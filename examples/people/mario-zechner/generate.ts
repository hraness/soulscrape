#!/usr/bin/env bun
/** Generate examples/people/mario-zechner/person-index.json with derived source ids. */

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

const ACCESSED = "2026-09-25T00:00:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

const site = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Mario Zechner — developer, coach, speaker",
  url: "https://mariozechner.at/",
  publisher: "mariozechner.at",
  notes:
    "The subject's own site: biography, post archive, and media list. Self-reported.",
});
const githubProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Mario Zechner (badlogic) — GitHub",
  url: "https://github.com/badlogic",
  publisher: "GitHub",
  notes: "The subject's GitHub profile; his handle there is 'badlogic'.",
});
const piRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "earendil-works/pi — AI agent toolkit and coding agent CLI",
  url: "https://github.com/earendil-works/pi",
  publisher: "GitHub",
  notes:
    "The pi monorepo (pi-ai, pi-agent-core, pi-tui, pi-coding-agent), originally badlogic/pi-mono; now lives under the Earendil organization, whose technical direction Zechner leads.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "libGDX",
  url: "https://en.wikipedia.org/wiki/LibGDX",
  publisher: "Wikipedia",
  notes:
    "Article about the framework, not the person (he has no standalone biography); carries a primary-sources notice. Used for dates and cross-checks, not sole authority.",
});
const springerBook = source({
  binding: "primary_record",
  mediaType: "book",
  title: "Beginning Android Games, Third Edition",
  url: "https://link.springer.com/book/10.1007/978-1-4842-0472-6",
  publisher: "Apress / Springer Nature Link",
  publishedAt: "2016",
  authors: ["Mario Zechner", "J. F. DiMarzio", "Robert Green"],
  notes:
    "Publisher catalog page for the third edition; earlier editions appeared in 2011 and 2012.",
});
const earendil = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "A Reflection on our Announcement Today",
  url: "https://earendil.com/posts/announcement-reflection/",
  publisher: "Earendil",
  publishedAt: "2026-04-08",
  notes:
    "Earendil's official announcement that it acquired pi and that Zechner joined; also announces Lefos and names the company's backers.",
});
const wired = source({
  binding: "reporting",
  mediaType: "article",
  title: "This Website Exposes the Truth About Soaring Food Prices",
  url: "https://www.wired.com/story/heisse-preise-food-prices/",
  publisher: "Wired",
  publishedAt: "2023-10-03",
});
const register = source({
  binding: "reporting",
  mediaType: "article",
  title: "Embrace, extend – and kill. Microsoft discontinues RoboVM",
  url: "https://www.theregister.com/software/2016/04/15/embrace-extend-and-kill-microsoft-discontinues-robovm/912179",
  publisher: "The Register",
  publishedAt: "2016-04-15",
  authors: ["Tim Anderson"],
});
const knowCenter = source({
  binding: "reporting",
  mediaType: "webpage",
  title:
    "Duke's Choice Award — highest distinction in the Java Community for Mario Zechner",
  url: "https://www.know-center.at/en/dukes-choice-award-highest-distinction-in-the-java-community-for-mario-zechner/",
  publisher: "Know Center",
  publishedAt: "2014",
  notes:
    "Announcement by his then-employer, an applied research center in Graz; confirms both the award and his employment there.",
});
const heise = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Österreichische Arbeitsagentur veröffentlicht fragwürdigen KI-Chatbot",
  url: "https://www.heise.de/news/Oesterreichische-Arbeitsagentur-veroeffentlicht-fragwuerdigen-KI-Chatbot-9588098.html",
  publisher: "heise online",
  publishedAt: "2024-01-05",
  authors: ["Eva-Maria Weiß"],
  language: "de",
  notes:
    "Names Zechner directly: he found the AMS Berufsinfomat could be tricked into exposing OpenAI API access and extracted its system rules.",
});
const aieSpeaker = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Mario Zechner — AI Engineer speaker profile",
  url: "https://ai.engineer/speakers/mario-zechner",
  publisher: "AI Engineer",
  notes:
    "Third-party conference profile covering libGDX, RoboVM, pi, the OpenClaw relationship, and the Earendil move.",
});
const soldOut = source({
  binding: "first_person",
  mediaType: "article",
  title: "I've sold out",
  url: "https://mariozechner.at/posts/2026-04-08-ive-sold-out/",
  publisher: "mariozechner.at",
  publishedAt: "2026-04-08",
  authors: ["Mario Zechner"],
  notes:
    "His own long account of libGDX, RoboVM's sale and shutdown, the OpenClaw wave, and why he took pi to Earendil.",
});
const piPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "What I learned building an opinionated and minimal coding agent",
  url: "https://mariozechner.at/posts/2025-11-30-pi-coding-agent/",
  publisher: "mariozechner.at",
  publishedAt: "2025-11-30",
  authors: ["Mario Zechner"],
  notes:
    "The canonical first-person writeup of pi: motivations, architecture, and deliberate omissions.",
});
const slowDown = source({
  binding: "first_person",
  mediaType: "article",
  title: "Thoughts on slowing the fuck down",
  url: "https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/",
  publisher: "mariozechner.at",
  publishedAt: "2026-03-25",
  authors: ["Mario Zechner"],
  notes:
    "His argument that agent-generated code compounds errors without a human bottleneck, and how he thinks teams should work with agents.",
});
const twoYears = source({
  binding: "first_person",
  mediaType: "article",
  title: "Two years in review",
  url: "https://mariozechner.at/posts/2024-07-15-two-years-in-review/",
  publisher: "mariozechner.at",
  publishedAt: "2024-07-15",
  authors: ["Mario Zechner"],
  notes:
    "Project-by-project account of 2022–2024: Cards for Ukraine, lilray, the r96 rendering series, heisse-preise, AMS Berufsinfomat, and more.",
});
const year2025 = source({
  binding: "first_person",
  mediaType: "article",
  title: "Year in Review 2025",
  url: "https://mariozechner.at/posts/2025-12-22-year-in-review-2025/",
  publisher: "mariozechner.at",
  publishedAt: "2025-12-22",
  authors: ["Mario Zechner"],
  notes:
    "Covers the agentic-coding year: Texty, hacking Claude Code, MCP experiments, Sitegeist, VibeTunnel, pi, and his public-interest investigations.",
});
const aieTalk = source({
  binding: "first_person",
  mediaType: "video",
  title: "Building pi in a World of Slop — Mario Zechner",
  url: "https://www.youtube.com/watch?v=RjfbvDXpFls",
  publisher: "AI Engineer",
  publishedAt: "2026-04",
  notes:
    "His conference talk at AI Engineer Europe 2026 in London: why he built pi, Terminal Bench results, and the 'clanker' problem in open source.",
});
const talkingKotlin = source({
  binding: "interview",
  mediaType: "audio",
  title: "libGDX with Mario Zechner",
  url: "https://talkingkotlin.com/libgdx-with-mario-zechner/",
  publisher: "Talking Kotlin (JetBrains)",
  publishedAt: "2017-02-28",
  notes:
    "2017 podcast interview on libGDX, game development, and Kotlin; the show bio already lists him as 'Spine @esotericsoftware'.",
});
const pragmatic = source({
  binding: "interview",
  mediaType: "video",
  title: "Building Pi, and what makes self-modifying software so fascinating",
  url: "https://www.youtube.com/watch?v=n5f51gtuGHE",
  publisher: "The Pragmatic Engineer",
  publishedAt: "2026-04-29",
  authors: ["Gergely Orosz"],
  notes:
    "Podcast episode with Zechner and Armin Ronacher covering pi, OpenClaw, over-automation risk, and AI slop in open source.",
});
const ethersClub = source({
  binding: "interview",
  mediaType: "audio",
  title: "#58 Mario Zechner — Pi, Clawdbot/OpenClaw, and Music",
  url: "https://www.buzzsprout.com/1988715/episodes/18532669",
  publisher: "Ethers Club",
  publishedAt: "2026-01-19",
  notes:
    "Podcast interview during the OpenClaw (earlier Clawdbot) wave: building pi, using agents, and his music side.",
});
const piDocs = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Pi coding agent — documentation",
  url: "https://badlogic-pi-mono.mintlify.app/coding-agent/overview",
  publisher: "Earendil / Mintlify",
  notes:
    "Pi's dedicated documentation site — overview of the minimal harness, the pi-agent-core stateful runtime, and pi-ai's unified model API.",
});

const S = {
  site: site.id,
  githubProfile: githubProfile.id,
  piRepo: piRepo.id,
  wikipedia: wikipedia.id,
  springerBook: springerBook.id,
  earendil: earendil.id,
  wired: wired.id,
  register: register.id,
  knowCenter: knowCenter.id,
  heise: heise.id,
  aieSpeaker: aieSpeaker.id,
  soldOut: soldOut.id,
  piPost: piPost.id,
  slowDown: slowDown.id,
  twoYears: twoYears.id,
  year2025: year2025.id,
  aieTalk: aieTalk.id,
  talkingKotlin: talkingKotlin.id,
  pragmatic: pragmatic.id,
  ethersClub: ethersClub.id,
  piDocs: piDocs.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-mario-zechner",
  generatedAt: "2026-09-25T21:52:26Z",
  subject: {
    kind: "person",
    handle: "mario-zechner",
    displayName: "Mario Zechner",
    alsoKnownAs: ["badlogic", "badlogicgames"],
    summary:
      "Austrian software developer ('badlogic') who created the libGDX game framework, built RoboVM's debugger add-on through its Xamarin acquisition, wrote Apress's 'Beginning Android Games', built civic tools like the grocery tracker heisse-preise, and now builds the minimal coding agent pi at Earendil.",
    identity: {
      officialSite: "https://mariozechner.at/",
      profiles: [
        "https://github.com/badlogic",
        "https://x.com/badlogicgames",
        "https://mastodon.gamedev.place/@badlogic",
        "https://bsky.app/profile/mariozechner.at",
        "https://marioslab.io/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:52:26Z",
    coverage: [
      "biography",
      "work",
      "open source",
      "philosophy",
      "projects",
      "media",
      "civic tech",
    ],
  },
  sources: [
    site,
    githubProfile,
    piRepo,
    wikipedia,
    springerBook,
    earendil,
    wired,
    register,
    knowCenter,
    heise,
    aieSpeaker,
    soldOut,
    piPost,
    slowDown,
    twoYears,
    year2025,
    aieTalk,
    talkingKotlin,
    pragmatic,
    ethersClub,
    piDocs,
  ],
  claims: [
    {
      id: "claim-graz-austria",
      kind: "fact",
      text: "Mario Zechner is an Austrian software developer based in Graz who has worked publicly for years under the handle 'badlogic' ('badlogicgames' on X).",
      sourceIds: [S.site, S.wired, S.heise],
    },
    {
      id: "claim-early-computing",
      kind: "fact",
      text: "He has said he came to computing through games: an uncle's Amiga 500, then his own 486 PC around 1996, bought after his parents told him to save up for it — which led into graphics programming.",
      sourceIds: [S.pragmatic],
    },
    {
      id: "claim-know-center",
      kind: "fact",
      text: "While studying, he worked at the Know Center in Graz, an applied-research organization doing natural-language processing and machine learning for industry — an ML education he places before the deep-learning era.",
      sourceIds: [S.pragmatic, S.knowCenter, S.site],
    },
    {
      id: "claim-afx-origin",
      kind: "fact",
      text: "In mid-2009 he began a framework called AFX (Android Effects) to write Android games; when deploying to a device proved cumbersome, he made AFX run on the desktop for faster testing — the origin of libGDX.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-libgdx-oss",
      kind: "fact",
      text: "He open-sourced libGDX on Google Code in March 2010 under the LGPL, relicensed it to the Apache License 2.0 that July, and in October 2010 gained Nathan Sweet, who became its top contributor and co-copyright holder.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-libgdx-10",
      kind: "fact",
      text: "libGDX 1.0 was released on April 20, 2014 — one Java codebase deploying to Windows, Linux, macOS, Android, iOS, and WebGL-enabled browsers.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-duke-award",
      kind: "fact",
      text: "libGDX won a 2014 Duke's Choice Award, the Java community prize, cited for its platform independence.",
      sourceIds: [S.knowCenter, S.wikipedia],
    },
    {
      id: "claim-libgdx-users",
      kind: "fact",
      text: "By his account libGDX was the most-used game-development framework on Android in its early-2010s heyday; Niantic's Ingress was built with it (Pokémon Go was not), the Slay the Spire team used it, and it powers Spine.",
      sourceIds: [S.soldOut],
    },
    {
      id: "claim-libgdx-handoff",
      kind: "fact",
      text: "He largely handed libGDX stewardship to a team of core contributors in 2016 and never commercialized it; the project remains actively maintained, with version 1.14.2 released in June 2026.",
      sourceIds: [S.soldOut, S.wikipedia],
    },
    {
      id: "claim-book",
      kind: "fact",
      text: "He wrote 'Beginning Android Games' for Apress — first published in 2011, a roughly 700-page book he says he wrote in six months — with later editions in 2012 and 2016 co-authored with Robert Green and J. F. DiMarzio.",
      sourceIds: [S.springerBook, S.twoYears],
    },
    {
      id: "claim-robovm-role",
      kind: "fact",
      text: "At RoboVM — Niklas Therning and Henric Müller's ahead-of-time compiler and runtime for JVM code on iOS — he joined early, built its first commercial add-on (a debugger), and helped the team approach feature parity with Xamarin, including an IntelliJ IDEA-based IDE.",
      sourceIds: [S.soldOut, S.register],
    },
    {
      id: "claim-robovm-sale",
      kind: "fact",
      text: "Xamarin acquired RoboVM in October 2015 and soon stopped releasing its core as open source; Microsoft acquired Xamarin in February 2016 and the discontinuation of RoboVM was announced on April 15, 2016.",
      sourceIds: [S.register, S.soldOut],
    },
    {
      id: "claim-robovm-backlash",
      kind: "fact",
      text: "As RoboVM's community-facing 'OSS guy' he wrote the announcement ending its open-source core and absorbed the backlash, despite having no control over the decision — he was not a majority shareholder.",
      sourceIds: [S.soldOut],
    },
    {
      id: "claim-mobivm",
      kind: "fact",
      text: "libGDX contributors forked the last open-source RoboVM code into MobiVM and restored feature parity, debugger included; by his account MobiVM still powers libGDX on iOS.",
      sourceIds: [S.soldOut, S.aieSpeaker],
    },
    {
      id: "claim-spine",
      kind: "fact",
      text: "He has been involved for roughly a decade with Spine, Esoteric Software's commercial 2D animation tool, which is powered by libGDX.",
      sourceIds: [S.soldOut, S.talkingKotlin],
    },
    {
      id: "claim-cards-for-ukraine",
      kind: "fact",
      text: "In May 2022 he and Tanja Maier built Cards for Ukraine in five days — software turning donations into €50 grocery vouchers for Ukrainian refugee families in Austria, with fully public books; it passed €300,000 in donations by late 2025.",
      sourceIds: [S.twoYears, S.year2025],
    },
    {
      id: "claim-heisse-preise",
      kind: "fact",
      text: "In May 2023, after Austria's labor minister said a grocery price-comparison database would take months, he built a working prototype in about two hours; the open-sourced heisse-preise grew to track more than 177,000 items across Austrian, German, and Slovenian chains, with price history back to 2017.",
      sourceIds: [S.wired, S.twoYears],
    },
    {
      id: "claim-ams-chatbot",
      kind: "fact",
      text: "In January 2024 he dissected the Austrian employment agency's €300,000 ChatGPT-based Berufsinfomat — extracting its handful of system rules and showing it could be tricked into exposing OpenAI API access; heise credited his findings directly.",
      sourceIds: [S.heise, S.year2025],
    },
    {
      id: "claim-claude-code-hacking",
      kind: "fact",
      text: "He adopted Claude Code around April 2025, then patched its binary to disable anti-debugging checks, intercepted its API calls, and built cchistory to track its system-prompt and tool changes.",
      sourceIds: [S.year2025, S.site],
    },
    {
      id: "claim-pi-design",
      kind: "fact",
      text: "He built pi as a minimal terminal coding harness in TypeScript: four built-in tools (read, write, edit, bash), a unified multi-provider LLM API, a differential-rendering terminal UI, and hot-reloadable extensions the agent can write for itself; the core is MIT-licensed.",
      sourceIds: [S.piPost, S.piRepo, S.aieTalk],
    },
    {
      id: "claim-pi-omissions",
      kind: "fact",
      text: "pi deliberately ships without built-in MCP support, sub-agents, plan mode, background shell execution, or to-do lists — 'if I don't need it, it won't be built.'",
      sourceIds: [S.piPost],
    },
    {
      id: "claim-terminal-bench",
      kind: "fact",
      text: "pi placed sixth on an October 2025 Terminal Bench leaderboard before it even had compaction, a result he offers as evidence that a small core can still perform.",
      sourceIds: [S.aieTalk],
    },
    {
      id: "claim-openclaw",
      kind: "fact",
      text: "Peter Steinberger's OpenClaw embeds pi as its agentic core; OpenClaw's viral growth in early 2026 brought pi wide attention, VC approaches, and a flood of automated low-quality pull requests, which he countered by requiring a short human-written issue first.",
      sourceIds: [S.soldOut, S.aieTalk, S.aieSpeaker],
    },
    {
      id: "claim-earendil",
      kind: "fact",
      text: "On April 8, 2026 Earendil — the company founded by Armin Ronacher and Colin Sidoti — acquired pi and Zechner joined as a shareholder leading pi's technical direction; pi's core remains MIT-licensed while future commercial additions may use fair-source or proprietary terms.",
      sourceIds: [S.soldOut, S.earendil],
    },
    {
      id: "claim-vienna-school",
      kind: "fact",
      text: "With Steinberger and Ronacher he formed what observers dubbed the 'Vienna School of Agentic Coding'; their first joint project was VibeTunnel in May 2025.",
      sourceIds: [S.soldOut],
    },
    {
      id: "claim-texty-dyslexia",
      kind: "fact",
      text: "He describes himself as dyslexic; in January 2025 he built Texty, an LLM spelling-and-grammar aid for browser and Android, as his first fully 'vibe-coded' project.",
      sourceIds: [S.year2025],
    },
    {
      id: "claim-context-engineering",
      kind: "stated_belief",
      text: "He holds that context engineering is paramount: exactly controlling what enters a model's context yields better code, and existing harnesses undermine that by injecting material behind the user's back.",
      sourceIds: [S.piPost, S.aieTalk],
    },
    {
      id: "claim-minimal-tools",
      kind: "stated_belief",
      text: "He prefers simple, predictable tools and left Claude Code over feature churn, hidden context changes, and flicker; pi's minimalism is a deliberate stance, not a limitation.",
      sourceIds: [S.piPost, S.pragmatic],
    },
    {
      id: "claim-code-not-free",
      kind: "stated_belief",
      text: "He argues generated code is never free — agents accumulate abstractions, duplication, and locally plausible changes faster than people can understand the global effects — so development should slow down, bound agent tasks, and keep human review on critical code.",
      sourceIds: [S.slowDown, S.pragmatic],
    },
    {
      id: "claim-agents-dont-learn",
      kind: "stated_belief",
      text: "He argues agents do not learn from errors and feel no maintenance pain; the human bottleneck is what kept error compounding slow, and removing it lets 'booboos' form an unmanageable codebase — worsened by agentic search's low recall at scale.",
      sourceIds: [S.slowDown],
    },
    {
      id: "claim-fork-right",
      kind: "stated_belief",
      text: "RoboVM's closure taught him that the practical right to fork — exercised by the MobiVM community — is the durable protection for open source; it is why pi's core stays MIT-licensed under Earendil.",
      sourceIds: [S.soldOut],
    },
    {
      id: "claim-family-first",
      kind: "stated_belief",
      text: "He says he did not want to build a VC-funded startup around pi and chose Earendil to keep pi sustainable without repeating RoboVM's mistakes — and to protect time with his four-year-old son.",
      sourceIds: [S.soldOut],
    },
    {
      id: "claim-pattern-prototype-answer",
      kind: "pattern",
      text: "He repeatedly answers institutional timelines with working prototypes: a two-hour heisse-preise build, a five-day Cards for Ukraine launch, a patched Claude Code binary, and his own Berufsinfomat experiments.",
      sourceIds: [S.wired, S.twoYears, S.heise, S.year2025],
    },
    {
      id: "claim-pattern-open-by-default",
      kind: "pattern",
      text: "Across two decades he open-sources and documents nearly everything publicly — libGDX, heisse-preise, pi — and designs contribution norms that protect maintainer attention, from community handoffs to the human-written-issue gate.",
      sourceIds: [S.soldOut, S.aieTalk, S.wikipedia],
    },
    {
      id: "claim-pattern-skeptic-ships",
      kind: "pattern",
      text: "He builds AI tooling while publicly warning about agent-generated complexity and over-automation — a skeptic who ships rather than a booster.",
      sourceIds: [S.slowDown, S.pragmatic, S.piPost],
    },
    {
      id: "claim-spec-benchmark",
      kind: "speculation",
      text: "pi's competitiveness beyond its October 2025 Terminal Bench showing rests mostly on his own experience and community uptake, not broad independent benchmarking.",
      sourceIds: [S.aieTalk, S.aieSpeaker],
    },
    {
      id: "claim-spec-earendil-bet",
      kind: "speculation",
      text: "Whether the Earendil arrangement avoids repeating RoboVM's fate is unproven: the MIT core preserves the fork option, but the licensing of future commercial add-ons was left undecided at announcement.",
      sourceIds: [S.soldOut, S.earendil],
    },
  ],
  timeline: [
    {
      id: "event-afx-start",
      kind: "project",
      date: "2009",
      title: "Starts AFX, the framework that becomes libGDX",
      summary:
        "Wanted to write Android games; added a desktop target for faster testing.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-libgdx-opensourced",
      kind: "founded",
      date: "2010-03-06",
      title: "Open-sources libGDX on Google Code",
      summary:
        "Released under the LGPL; relicensed to Apache 2.0 in July; Nathan Sweet joined in October.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-bag-book",
      kind: "publication",
      date: "2011-04",
      title: "Beginning Android Games published",
      summary:
        "Apress book on Android game development; later editions followed in 2012 and 2016.",
      organization: "Apress",
      organizationHandle: "apress",
      sourceIds: [S.springerBook, S.twoYears],
    },
    {
      id: "event-libgdx-10",
      kind: "milestone",
      date: "2014-04-20",
      title: "libGDX reaches version 1.0",
      summary:
        "Four-plus years of development culminate in the 1.0 release across desktop, mobile, and browser backends.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-dukes-choice",
      kind: "award",
      date: "2014-09",
      title: "libGDX wins a Duke's Choice Award",
      summary:
        "The Java community's annual prize, awarded at JavaOne for platform independence.",
      organization: "Oracle / Java Community",
      organizationHandle: "oracle-java-community",
      sourceIds: [S.knowCenter, S.wikipedia],
    },
    {
      id: "event-xamarin-acquires",
      kind: "milestone",
      date: "2015-10-21",
      title: "Xamarin acquires RoboVM",
      summary:
        "The C# cross-platform vendor bought the Java-on-iOS startup whose debugger Zechner built; the open-source core was closed soon after.",
      organization: "Xamarin",
      organizationHandle: "xamarin",
      sourceIds: [S.register, S.soldOut],
    },
    {
      id: "event-robovm-discontinued",
      kind: "milestone",
      date: "2016-04-15",
      title: "Microsoft discontinues RoboVM",
      summary:
        "After Microsoft's Xamarin acquisition, RoboVM was wound down; the community forked it into MobiVM, which kept libGDX on iOS.",
      organization: "Microsoft",
      organizationHandle: "microsoft",
      sourceIds: [S.register, S.soldOut],
    },
    {
      id: "event-libgdx-handoff",
      kind: "role",
      date: "2016",
      title: "Hands libGDX stewardship to the community",
      summary:
        "Transferred day-to-day leadership to the core-contributor team that maintains the framework to this day.",
      organization: "libGDX",
      organizationHandle: "libgdx",
      sourceIds: [S.soldOut],
    },
    {
      id: "event-cards-for-ukraine",
      kind: "project",
      date: "2022-05",
      title: "Launches Cards for Ukraine",
      summary:
        "With Tanja Maier, built a donation-to-grocery-voucher pipeline for Ukrainian refugee families in five days; later passed €300,000 raised.",
      location: "Austria",
      sourceIds: [S.twoYears, S.year2025],
    },
    {
      id: "event-heisse-preise",
      kind: "project",
      date: "2023-05",
      title: "Builds the heisse-preise grocery tracker",
      summary:
        "Prototype in about two hours after a minister's months-long estimate; grew into Austria's reference price-comparison dataset.",
      location: "Austria",
      sourceIds: [S.wired],
    },
    {
      id: "event-ams-chatbot",
      kind: "media",
      date: "2024-01",
      title: "Public teardown of the AMS Berufsinfomat",
      summary:
        "Showed the €300,000 ChatGPT-based job-advice bot could leak OpenAI API access and ran on a handful of system rules; covered by heise and Austrian press.",
      sourceIds: [S.heise],
    },
    {
      id: "event-pi-writeup",
      kind: "publication",
      date: "2025-11-30",
      title: "Publishes the pi writeup",
      summary:
        "'What I learned building an opinionated and minimal coding agent' introduced pi publicly.",
      sourceIds: [S.piPost],
    },
    {
      id: "event-earendil",
      kind: "role",
      date: "2026-04-08",
      title: "Joins Earendil; Earendil acquires pi",
      summary:
        "Became a shareholder leading pi's technical direction alongside founders Armin Ronacher and Colin Sidoti; pi's core stays MIT-licensed.",
      organization: "Earendil",
      organizationHandle: "earendil",
      sourceIds: [S.soldOut, S.earendil],
    },
    {
      id: "event-aie-talk",
      kind: "media",
      date: "2026-04-10",
      title: "'Building pi in a World of Slop' at AI Engineer Europe",
      summary:
        "Conference talk in London on minimal agent harnesses, context control, and protecting open-source maintainers from agent-generated contributions.",
      location: "London",
      organization: "AI Engineer",
      organizationHandle: "ai-engineer",
      sourceIds: [S.aieTalk, S.aieSpeaker],
    },
  ],
  themes: [
    {
      id: "theme-minimal-core",
      kind: "philosophy",
      status: "stated",
      title: "Small cores, adapted to your workflow",
      summary:
        "A minimal, malleable harness beats a feature-bloated one: pi ships four tools and a short system prompt, and users extend it with TypeScript extensions, skills, and themes — the agent adapts to the workflow, not the reverse.",
      sourceIds: [S.piPost, S.aieTalk, S.pragmatic],
    },
    {
      id: "theme-context-ownership",
      kind: "method",
      status: "stated",
      title: "Own the context",
      summary:
        "The developer should see and control exactly what reaches the model — no hidden system-prompt changes, injected reminders, premature diagnostics, or silent pruning of tool output.",
      sourceIds: [S.piPost, S.aieTalk],
    },
    {
      id: "theme-slow-down",
      kind: "belief",
      status: "stated",
      title: "Slow down; generated code is not free",
      summary:
        "Agents make errors without learning from them and feel no maintenance pain, so removing the human bottleneck lets small mistakes compound into unmanageable systems. His prescription: bounded tasks, modular systems, human review of critical code, and deliberate pace.",
      sourceIds: [S.slowDown, S.pragmatic],
    },
    {
      id: "theme-fork-insurance",
      kind: "belief",
      status: "stated",
      title: "The right to fork is the real license",
      summary:
        "RoboVM's journey from open core to Xamarin acquisition to Microsoft shutdown taught him that paper licenses matter less than the practical ability to fork — which MobiVM exercised. pi's MIT core keeps that option alive under Earendil.",
      sourceIds: [S.soldOut, S.register],
    },
    {
      id: "theme-maintainer-protection",
      kind: "practice",
      status: "stated",
      title: "Protect maintainers from agent slop",
      summary:
        "After OpenClaw's rise flooded pi's tracker with automated pull requests, he required a short human-written issue before PRs and treats automated submission volume as a threat to, not a sign of, community health.",
      sourceIds: [S.aieTalk, S.aieSpeaker],
    },
    {
      id: "theme-civic-prototyping",
      kind: "practice",
      status: "reported",
      title: "Civic prototyping as public argument",
      summary:
        "He answers institutional claims with working software: a two-hour grocery-price tracker, a five-day refugee-aid platform, a public teardown of a €300,000 government chatbot — then open-sources the results so others can verify and build on them.",
      sourceIds: [S.wired, S.heise, S.twoYears],
    },
    {
      id: "theme-learn-by-building",
      kind: "interest",
      status: "reported",
      title: "Learn by building, in public",
      summary:
        "From a 486 and an uncle's Amiga 500 to raycasting engines, a '90s-rendering article series, hand-soldered electronics for his son's audio player, and a JavaScript interpreter written in JavaScript — his learning loop is build, document, publish.",
      sourceIds: [S.pragmatic, S.year2025, S.twoYears],
    },
    {
      id: "theme-multi-model",
      kind: "method",
      status: "stated",
      title: "A multi-model world, no lock-in",
      summary:
        "pi-ai abstracts OpenAI, Anthropic, Google, and compatible endpoints — including self-hosted engines — with cross-provider context handoff and best-effort token/cost tracking, so workflows survive provider switches.",
      sourceIds: [S.piPost, S.piRepo],
    },
    {
      id: "theme-skeptic-practitioner",
      kind: "belief",
      status: "reported",
      title: "The skeptic who ships",
      summary:
        "Press and peers frame him as an AI skeptic who builds AI tools: heavy warnings about agent-generated complexity alongside a coding agent others chose as their foundation.",
      sourceIds: [S.pragmatic, S.aieSpeaker],
    },
  ],
  works: [
    {
      id: "work-libgdx",
      kind: "project",
      status: "ongoing",
      title: "libGDX",
      date: "2010",
      summary:
        "Cross-platform Java game-development framework he created and led until 2016; Apache 2.0, Duke's Choice Award 2014, still community-maintained.",
      sourceIds: [S.wikipedia, S.soldOut, S.knowCenter],
    },
    {
      id: "work-beginning-android-games",
      kind: "book",
      status: "published",
      title: "Beginning Android Games",
      date: "2011",
      summary:
        "Apress book on Android game development; second edition 2012, third edition 2016 with co-authors Robert Green and J. F. DiMarzio.",
      sourceIds: [S.springerBook, S.twoYears],
    },
    {
      id: "work-robovm",
      kind: "project",
      status: "abandoned",
      title: "RoboVM debugger and tooling",
      date: "2015",
      summary:
        "He built the first commercial add-on for RoboVM's Java-on-iOS toolchain; the project was acquired by Xamarin in 2015 and discontinued by Microsoft in 2016, living on through the community's MobiVM fork.",
      sourceIds: [S.soldOut, S.register],
    },
    {
      id: "work-spine",
      kind: "product",
      status: "ongoing",
      title: "Spine",
      summary:
        "Esoteric Software's commercial 2D skeletal-animation tool, powered by libGDX; he has been involved for roughly a decade.",
      sourceIds: [S.soldOut, S.talkingKotlin],
    },
    {
      id: "work-cards-for-ukraine",
      kind: "project",
      status: "ongoing",
      title: "Cards for Ukraine",
      date: "2022-05",
      location: "Austria",
      summary:
        "Donation-to-grocery-voucher platform for Ukrainian refugee families, built with Tanja Maier in five days; over €300,000 disbursed with fully public books.",
      sourceIds: [S.twoYears, S.year2025],
    },
    {
      id: "work-heisse-preise",
      kind: "project",
      status: "ongoing",
      title: "heisse-preise",
      date: "2023-05",
      location: "Austria",
      summary:
        "Open-source grocery price-comparison site tracking 177,000+ items across Austrian, German, and Slovenian chains; a reference dataset in Austria's price-transparency debate.",
      sourceIds: [S.wired, S.year2025],
    },
    {
      id: "work-ams-berufsinfomat",
      kind: "project",
      status: "completed",
      title: "AMS Berufsinfomat experiments and teardown",
      date: "2024-01",
      summary:
        "His own career-information chatbot experiments plus the public dissection of the official AMS bot — extracted system rules, exposed API access, stereotyped job suggestions.",
      sourceIds: [S.heise, S.twoYears, S.year2025],
    },
    {
      id: "work-lilray",
      kind: "project",
      status: "completed",
      title: "lilray",
      date: "2022",
      summary:
        "A C++ raycasting engine in the Wolfenstein/DOOM lineage, running on desktop, in the browser, and on MS-DOS via a minifb backend.",
      sourceIds: [S.twoYears],
    },
    {
      id: "work-r96",
      kind: "project",
      status: "abandoned",
      title: "r96 and the 'Rendering like it's 1996' series",
      date: "2022",
      summary:
        "Recreation of '90s PC-game rendering techniques with modern tools, told through a five-part article series he deliberately left unfinished after line rasterization took the fun out of it.",
      sourceIds: [S.twoYears],
    },
    {
      id: "work-boxie",
      kind: "product",
      status: "completed",
      title: "Boxie",
      date: "2025",
      summary:
        "An always-offline audio player he designed and soldered for his son — self-designed PCBs, cartridge-based, Doom ported to the embedded board.",
      sourceIds: [S.year2025],
    },
    {
      id: "work-texty",
      kind: "project",
      status: "completed",
      title: "Texty",
      date: "2025-01",
      summary:
        "LLM spelling-and-grammar aid as browser extension and Android accessibility app — his first fully 'vibe-coded' project, motivated by his dyslexia.",
      sourceIds: [S.year2025],
    },
    {
      id: "work-vibetunnel",
      kind: "project",
      status: "released",
      title: "VibeTunnel",
      date: "2025-05",
      summary:
        "First joint project with Peter Steinberger and Armin Ronacher, built in Vienna in the early agentic-coding summer.",
      sourceIds: [S.soldOut],
    },
    {
      id: "work-sitegeist",
      kind: "project",
      status: "released",
      title: "Sitegeist",
      summary:
        "His browser-use agent — 'essentially a coding agent that lives inside the browser' — predating pi and informing its context-engineering stance.",
      sourceIds: [S.piPost, S.year2025],
    },
    {
      id: "work-pi",
      kind: "project",
      status: "ongoing",
      title: "pi",
      date: "2025",
      summary:
        "Minimal terminal coding harness: pi-ai (multi-provider LLM API), pi-agent-core, pi-tui, and pi-coding-agent with self-modifying TypeScript extensions; MIT-licensed, agentic core of OpenClaw, acquired by Earendil in April 2026.",
      sourceIds: [S.piPost, S.piRepo, S.earendil, S.aieTalk],
    },
  ],
  appearances: [
    {
      id: "appearance-talking-kotlin",
      title: "libGDX with Mario Zechner",
      venue: "Talking Kotlin (JetBrains)",
      publishedAt: "2017-02-28",
      participants: ["Mario Zechner"],
      participantHandles: [
        { name: "Mario Zechner", handle: "mario-zechner" },
      ],
      summary:
        "31-minute podcast interview on libGDX, game development, and Kotlin for gaming; the show bio bills him as 'benevolent dictator of libGDX' and 'Spine @esotericsoftware'.",
      media: [
        {
          type: "audio",
          url: "https://talkingkotlin.com/libgdx-with-mario-zechner/",
          sourceId: S.talkingKotlin,
        },
      ],
      sourceIds: [S.talkingKotlin],
    },
    {
      id: "appearance-ethers-club",
      title: "#58 Mario Zechner — Pi, Clawdbot/OpenClaw, and Music",
      venue: "Ethers Club",
      publishedAt: "2026-01-19",
      participants: ["Mario Zechner"],
      participantHandles: [
        { name: "Mario Zechner", handle: "mario-zechner" },
      ],
      summary:
        "Podcast interview during the OpenClaw wave: building pi, working with and on AI, and his music side.",
      media: [
        {
          type: "audio",
          url: "https://www.buzzsprout.com/1988715/episodes/18532669",
          sourceId: S.ethersClub,
        },
      ],
      sourceIds: [S.ethersClub],
    },
    {
      id: "appearance-aie-europe",
      title: "Building pi in a World of Slop",
      venue: "AI Engineer Europe 2026, London",
      publishedAt: "2026-04-10",
      participants: ["Mario Zechner"],
      participantHandles: [
        { name: "Mario Zechner", handle: "mario-zechner" },
      ],
      summary:
        "Conference talk on why he built pi: context ownership, a minimal four-tool core, self-modifying extensions, Terminal Bench results, and defending open source from 'clanker' contributions.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=RjfbvDXpFls",
          sourceId: S.aieTalk,
        },
      ],
      sourceIds: [S.aieTalk, S.aieSpeaker],
    },
    {
      id: "appearance-pragmatic-engineer",
      title: "Building Pi, and what makes self-modifying software so fascinating",
      venue: "The Pragmatic Engineer Podcast",
      publishedAt: "2026-04-29",
      participants: ["Mario Zechner", "Armin Ronacher", "Gergely Orosz"],
      participantHandles: [
        { name: "Mario Zechner", handle: "mario-zechner" },
        { name: "Armin Ronacher", handle: "armin-ronacher" },
        { name: "Gergely Orosz", handle: "gergely-orosz" },
      ],
      summary:
        "93-minute episode with Orosz: pi's origin, the OpenClaw relationship, over-automation risk, 'clankers' versus open source, and why human judgment still does the hard part.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=n5f51gtuGHE",
          sourceId: S.pragmatic,
        },
      ],
      sourceIds: [S.pragmatic],
    },
  ],
  relations: [
    {
      id: "rel-employed-know-center",
      kind: "employed_by",
      target: "know-center",
      targetName: "Know Center",
      targetKind: "organization",
      note: "Worked at the Graz applied-research center while studying — NLP and ML for industry before the deep-learning era; the center itself announced his 2014 Duke's Choice Award.",
      targetWikidataId: "Q128337523",
      sourceIds: [S.pragmatic, S.knowCenter, S.site],
    },
    {
      id: "rel-employed-robovm",
      kind: "employed_by",
      target: "robovm",
      targetName: "RoboVM",
      targetKind: "organization",
      note: "Joined Niklas Therning and Henric Müller's Java-on-iOS startup early, built its first commercial add-on (the debugger), and served as its community-facing open-source lead through the Xamarin sale.",
      end: "2015-10-21",
      sourceIds: [S.soldOut, S.register],
    },
    {
      id: "rel-employed-esoteric",
      kind: "employed_by",
      target: "esoteric-software",
      targetName: "Esoteric Software",
      targetKind: "organization",
      note: "Roughly a decade of involvement with Spine, the libGDX-powered 2D animation tool; the 2017 Talking Kotlin bio already lists him as 'Spine @esotericsoftware'.",
      sourceIds: [S.soldOut, S.talkingKotlin],
    },
    {
      id: "rel-employed-earendil",
      kind: "employed_by",
      target: "earendil",
      targetName: "Earendil",
      targetKind: "organization",
      note: "Joined the company founded by Armin Ronacher and Colin Sidoti as a shareholder leading pi's technical direction when Earendil acquired pi on April 8, 2026.",
      start: "2026-04-08",
      sourceIds: [S.soldOut, S.earendil],
    },
    {
      id: "rel-founded-libgdx",
      kind: "founded",
      target: "libgdx",
      targetName: "libGDX",
      targetKind: "organization",
      note: "Created the framework as AFX in 2009 and open-sourced it on Google Code in March 2010; led it until the 2016 community handoff.",
      start: "2009",
      end: "2016",
      targetWikidataId: "Q16321264",
      sourceIds: [S.wikipedia, S.soldOut],
    },
    {
      id: "rel-founded-cards-for-ukraine",
      kind: "founded",
      target: "cards-for-ukraine",
      targetName: "Cards for Ukraine",
      targetKind: "organization",
      note: "Co-built the donation-to-grocery-voucher platform with Tanja Maier in five days in May 2022; it passed €300,000 disbursed by late 2025.",
      start: "2022-05",
      sourceIds: [S.twoYears, S.year2025],
    },
    {
      id: "rel-founded-heisse-preise",
      kind: "founded",
      target: "heisse-preise",
      targetName: "heisse-preise",
      targetKind: "organization",
      note: "Built the grocery price-comparison prototype in about two hours in May 2023 and open-sourced it; it now tracks 177,000+ items across three countries.",
      start: "2023-05",
      sourceIds: [S.wired, S.twoYears],
    },
    {
      id: "rel-founded-vibetunnel",
      kind: "founded",
      target: "vibetunnel",
      targetName: "VibeTunnel",
      targetKind: "organization",
      note: "First joint project with Peter Steinberger and Armin Ronacher, built in Vienna in May 2025 — the 'Vienna School of Agentic Coding' debut.",
      start: "2025-05",
      sourceIds: [S.soldOut],
    },
    {
      id: "rel-founded-pi",
      kind: "founded",
      target: "pi",
      targetName: "pi",
      targetKind: "organization",
      note: "Built the minimal TypeScript coding-agent toolkit (pi-ai, pi-agent-core, pi-tui, pi-coding-agent); MIT-licensed core, now the agentic core of OpenClaw and owned by Earendil.",
      sourceIds: [S.piPost, S.piRepo, S.aieTalk],
    },
    {
      id: "rel-collab-nathan-sweet",
      kind: "collaborated",
      target: "nathan-sweet",
      targetName: "Nathan Sweet",
      note: "Joined libGDX in October 2010 and became its top contributor and co-copyright holder.",
      start: "2010-10",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-collab-robert-green",
      kind: "collaborated",
      target: "robert-green",
      targetName: "Robert Green",
      note: "Co-author on the later editions of 'Beginning Android Games' (2012 and 2016).",
      start: "2012",
      end: "2016",
      sourceIds: [S.springerBook, S.twoYears],
    },
    {
      id: "rel-collab-jf-dimarzio",
      kind: "collaborated",
      target: "j-f-dimarzio",
      targetName: "J. F. DiMarzio",
      note: "Co-author on the later editions of 'Beginning Android Games' (2012 and 2016).",
      start: "2012",
      end: "2016",
      sourceIds: [S.springerBook, S.twoYears],
    },
    {
      id: "rel-collab-niklas-therning",
      kind: "collaborated",
      target: "niklas-therning",
      targetName: "Niklas Therning",
      note: "RoboVM co-founder whose team Zechner joined early, building its debugger and helping reach feature parity with Xamarin.",
      sourceIds: [S.soldOut, S.register],
    },
    {
      id: "rel-collab-henric-muller",
      kind: "collaborated",
      target: "henric-muller",
      targetName: "Henric Müller",
      note: "RoboVM co-founder whose team Zechner joined early.",
      sourceIds: [S.soldOut, S.register],
    },
    {
      id: "rel-collab-tanja-maier",
      kind: "collaborated",
      target: "tanja-maier",
      targetName: "Tanja Maier",
      note: "Co-built Cards for Ukraine with him in five days in May 2022.",
      start: "2022-05",
      sourceIds: [S.twoYears, S.year2025],
    },
    {
      id: "rel-collab-peter-steinberger",
      kind: "collaborated",
      target: "peter-steinberger",
      targetName: "Peter Steinberger",
      note: "VibeTunnel co-builder and 'Vienna School' peer; his OpenClaw embeds pi as its agentic core, driving pi's early-2026 attention wave.",
      start: "2025-05",
      targetWikidataId: "Q137924561",
      sourceIds: [S.soldOut, S.aieTalk, S.aieSpeaker],
    },
    {
      id: "rel-collab-armin-ronacher",
      kind: "collaborated",
      target: "armin-ronacher",
      targetName: "Armin Ronacher",
      note: "VibeTunnel co-builder and Earendil co-founder whose company acquired pi; joint guest on the April 2026 Pragmatic Engineer episode.",
      start: "2025-05",
      targetWikidataId: "Q13502294",
      sourceIds: [S.soldOut, S.earendil, S.pragmatic],
    },
    {
      id: "rel-collab-colin-sidoti",
      kind: "collaborated",
      target: "colin-sidoti",
      targetName: "Colin Sidoti",
      note: "Earendil co-founder; Zechner joined the company as a shareholder when it acquired pi.",
      start: "2026-04-08",
      sourceIds: [S.soldOut, S.earendil],
    },
    {
      id: "rel-intv-gergely-orosz",
      kind: "interviewed_by",
      target: "gergely-orosz",
      targetName: "Gergely Orosz",
      note: "The Pragmatic Engineer Podcast, April 2026 — 93-minute episode on pi, OpenClaw, and over-automation risk, recorded with Armin Ronacher.",
      start: "2026-04",
      targetWikidataId: "Q115090522",
      sourceIds: [S.pragmatic],
    },
  ],
  openQuestions: [
    "No Wikidata item or standalone encyclopedia biography exists for him; personal details are thin. He self-reports being 41 in December 2025 and having studied while working at the Know Center, but the record does not name a degree or birth date.",
    "libGDX's iOS lineage is tangled: the project's own history records Intel's Multi-OS Engine replacing RoboVM in 2016, while Zechner says the community's MobiVM fork powers libGDX on iOS to this day — consistent, but the switch dates blur between sources.",
    "RoboVM's sale terms were never disclosed; his account of his role (debugger lead, community face, non-majority shareholder) is the main first-person record.",
    "pi's adoption is visible through GitHub, npm, conference talks, and OpenClaw's bundling rather than audited usage numbers; how much of its reach is OpenClaw-driven is unquantified.",
    "Whether Earendil's future commercial pi add-ons will use 'fair-source' or proprietary licensing — and how that interacts with the fork-ability he preaches — was left open at announcement.",
  ],
  body: `Mario Zechner is an Austrian software developer — known in open-source circles as "badlogic" — whose career runs through three generations of developer tooling: the libGDX game framework, the RoboVM Java-on-iOS compiler, and now pi, the deliberately minimal terminal coding agent he built in 2025 and took to Earendil in 2026. Between those poles sit a bestselling Android game-programming book, roughly a decade of work on the Spine animation tool, and a run of civic hacks — a grocery-price tracker, a refugee-aid platform, a public teardown of a government chatbot — that made him a fixture in Austria's tech-policy debates.

## Formation and libGDX

Zechner lives and works in Graz. In his telling on the Pragmatic Engineer podcast he came to computing through games — an uncle's Amiga 500, then a 486 PC around 1996 after his parents told him to save up — and into graphics programming from there. While studying, he worked at Graz's Know Center, an applied-research outfit doing natural-language processing and machine learning for industry; a pre-deep-learning education in ML that he says taught him the ropes.

In mid-2009 he wanted to write Android games and started a framework called AFX (Android Effects). Deploying to a device was slow, so he made AFX run on the desktop for faster iteration — the accidental germ of libGDX. He open-sourced it on Google Code in March 2010 under the LGPL, relicensed it to Apache 2.0 that July, and in October gained his most important collaborator, Nathan Sweet. A Box2D native bridge pulled in the physics-game crowd; a GWT backend added browsers; a RoboVM backend added iOS. Version 1.0 shipped on April 20, 2014, and that year libGDX won a Duke's Choice Award, the Java community's prize. At its peak it was, by his account, the most-used game framework on Android: Niantic's Ingress ran on it, the Slay the Spire team built with it, and it powers Spine. In 2016 he handed day-to-day stewardship to a core-contributor team that still runs the project; he never commercialized it.

## RoboVM and the right to fork

RoboVM, founded by Niklas Therning and Henric Müller in Sweden, was an ahead-of-time compiler that ran JVM code on iOS — the same trick Xamarin performed for C#. Its libGDX backend got Zechner involved; the founders brought him on early to build the first commercial add-on, a debugger, and the team grew to near feature parity with Xamarin, IDE included. In October 2015 Xamarin bought RoboVM and soon stopped releasing the core as open source; months later Microsoft bought Xamarin and wound RoboVM down in April 2016. Zechner — the project's community face — wrote the closure announcement and absorbed the backlash, despite holding no control over the decision.

The epilogue is the point. libGDX contributors forked the last open RoboVM code into MobiVM and rebuilt feature parity, debugger included; MobiVM still carries libGDX's iOS support. The lesson he took: a license matters less than the practical right to fork — a conviction now baked into pi's MIT-licensed core.

## Civic hacking

From 2022 his public work tilted civic. In May 2022 he and Tanja Maier stood up Cards for Ukraine in five days — software turning donations into €50 grocery vouchers for Ukrainian refugee families in Austria, with fully public books; it passed €300,000 disbursed by late 2025. In May 2023, after Austria's labor minister said a price-comparison database would take months, he built a working prototype in about two hours; heisse-preise ("hot prices"), open-sourced on GitHub, grew to track more than 177,000 items across Austrian, German, and Slovenian chains and fed a national debate on supermarket price opacity — Wired covered it, and Cory Doctorow later name-checked "the kid in Austria." In January 2024 he dissected the Austrian employment agency's €300,000 ChatGPT-based Berufsinfomat, extracting its scant system rules and showing it could be tricked into exposing OpenAI API access; heise credited him directly.

## pi and the agent era

He had used LLMs since early 2023, but April 2025 changed the tempo: Peter Steinberger and Armin Ronacher pulled him into the new coding-agent scene — their tinkering was later dubbed the "Vienna School of Agentic Coding" — and Claude Code became his daily driver until feature churn, hidden context injection, and flicker drove him to patch its binary and watch what it sent. His answer was pi: a TypeScript terminal coding harness with a deliberately small core — four tools (read, write, edit, bash), a unified multi-provider LLM API, a flicker-free terminal UI, and hot-reloadable extensions the agent can write for itself — and, deliberately, no built-in MCP, sub-agents, plan mode, or to-do lists. "If I don't need it, it won't be built." It placed sixth on an October 2025 Terminal Bench leaderboard before it even had compaction.

OpenClaw — Steinberger's personal-assistant agent — embeds pi as its agentic core, and when OpenClaw went viral in early 2026 pi rode the wave: term sheets, three-to-five calls a day, and a flood of agent-generated pull requests he filtered by requiring a short human-written issue first ("clankers," in his coinage, don't read comments). On April 8, 2026, Earendil — founded by Ronacher and Colin Sidoti — acquired pi, and Zechner joined as shareholder and technical lead rather than build his own startup, a decision he frames around his young son and his RoboVM scars. Two days later he gave the talk "Building pi in a World of Slop" at AI Engineer Europe in London; weeks after, he and Ronacher carried the same message — bound the tasks, own the context, review critical code, slow the pace — to the Pragmatic Engineer podcast.

## What the record does not settle

Personal details are thin: there is no Wikidata item or standalone biography for him, and he self-reports being 41 in December 2025; the cited record never names a degree. libGDX's iOS lineage — RoboVM, then Intel's Multi-OS Engine, then the community MobiVM — is consistent across sources, but the handover dates blur. RoboVM's sale terms were never disclosed, and his own account is the main first-person record of it. pi's adoption is visible through GitHub, npm, and OpenClaw's bundling rather than audited numbers. And whether Earendil's future commercial add-ons stay compatible with the fork-ability he preaches is, by his own framing, an open bet.

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
