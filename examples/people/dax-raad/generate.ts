#!/usr/bin/env bun
/** Generate examples/people/dax-raad/person-index.json with derived source ids. */

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

const thdxr = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dax Raad",
  url: "https://thdxr.com/",
  publisher: "thdxr.com",
  notes:
    "The subject's personal site: 'I build things then try to remember to write about them. Currently building Serverless Stack and Bumi.'",
});
const sstAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About SST",
  url: "https://sst.dev/about",
  publisher: "SST",
  notes:
    "Company page: launched 2021; lists angel investors (Reid Hoffman, Max Levchin, Steve Chen, Russ Simmons, and others) and sibling projects opencode, OpenNext, and OpenAuth.",
});
const opencodeSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "opencode — the open source AI coding agent",
  url: "https://opencode.ai",
  publisher: "opencode.ai",
  notes:
    "Product homepage; its star, contributor, and monthly-developer figures are self-reported.",
});
const sstV2 = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "SST v2",
  url: "https://sst.dev/blog/sst-v2/",
  publisher: "SST",
  publishedAt: "2023-02-27",
  authors: ["Jay V"],
});
const sstV3 = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "SST v3",
  url: "https://sst.dev/blog/sst-v3/",
  publisher: "SST",
  publishedAt: "2024-08-20",
  authors: ["Jay V"],
  notes:
    "Announces Ion shipping as SST v3; also documents the Console, migration from v2, and Seed's role for v2 apps.",
});
const movingCdk = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Moving away from CDK",
  url: "https://sst.dev/blog/moving-away-from-cdk/",
  publisher: "SST",
  publishedAt: "2024-01-29",
  authors: ["Jay V"],
  notes:
    "The Ion announcement: a new deployment engine built on Pulumi and Terraform providers instead of AWS CDK and CloudFormation.",
});
const tomorrowFm = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "How About Tomorrow?",
  url: "https://tomorrow.fm/",
  publisher: "tomorrow.fm",
  notes:
    "Podcast co-hosted by 'Adam and Dax' — Adam Elmore and the subject — covering web technology and 'the future of (basically) everything.'",
});
const ghThdxr = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "thdxr (Dax) — GitHub profile",
  url: "https://github.com/thdxr",
  publisher: "GitHub",
  notes:
    "Bio 'building SST and @withbumi'; located in NYC; member of the @ironbay and @anomalyco organizations.",
});
const xThdxr = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "@thdxr on X",
  url: "https://x.com/thdxr",
  publisher: "X",
  notes:
    "The subject's public posting account, linked from his site, GitHub profile, and interviews.",
});
const twitchThdxr = source({
  binding: "first_person",
  mediaType: "video",
  title: "thdxr on Twitch",
  url: "https://www.twitch.tv/thdxr",
  publisher: "Twitch",
  notes: "The subject's long-running coding livestream channel.",
});
const ghOpencode = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "anomalyco/opencode — the open source coding agent",
  url: "https://github.com/anomalyco/opencode",
  publisher: "GitHub",
  notes:
    "MIT-licensed, primarily TypeScript; repository created 2025-04-30 under the sst org before the org was renamed anomalyco.",
});
const ycSst = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "OpenCode — Y Combinator company profile",
  url: "https://www.ycombinator.com/companies/sst",
  publisher: "Y Combinator",
  notes:
    "Winter 2021 batch; the profile now reads 'OpenCode — Built by Anomaly, makers of sst.dev, opennext.js.org, openauth.js.org, models.dev.' Lists Jay V and Frank Wang as active founders.",
});
const pragmatic = source({
  binding: "interview",
  mediaType: "audio",
  title: "Building OpenCode with Dax Raad",
  url: "https://newsletter.pragmaticengineer.com/p/opencode",
  publisher: "The Pragmatic Engineer",
  publishedAt: "2026-05-27",
  authors: ["Gergely Orosz"],
  notes:
    "Podcast episode with transcript covering his path into tech, OpenCode's growth, the Anthropic OAuth block, and his AI skepticism.",
});
const baseten = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Building AI agents, open code, and open source: A conversation with Dax",
  url: "https://www.baseten.co/blog/building-ai-agents-open-code-and-open-source-a-conversation-with-dax/",
  publisher: "Baseten",
  publishedAt: "2025-10-23",
  notes:
    "Q&A covering why he built OpenCode, the launch of Zen, open source strategy, and benchmarks.",
});
const kr36 = source({
  binding: "interview",
  mediaType: "article",
  title: "Popular AI Coding Tool: Co-founder Says Engineers Still Have Hope",
  url: "https://eu.36kr.com/en/p/3829518101062785",
  publisher: "36Kr",
  notes:
    "English-language Q&A in which Raad recounts contributing to SST, investing in its round, joining a month later, and the February 2025 breakeven.",
});
const techcrunch = source({
  binding: "reporting",
  mediaType: "article",
  title: "Serverless Stack raises $1M for open-source application framework",
  url: "https://techcrunch.com/2021/07/23/serverless-stack-raises-1m-for-open-source-application-framework/",
  publisher: "TechCrunch",
  publishedAt: "2021-07-23",
  notes:
    "Reports the company founded 2017 in San Francisco by Jay V and Frank Wang, YC Winter 2021, and a $1M seed including Greylock and SV Angel.",
});
const doshby = source({
  binding: "reporting",
  mediaType: "article",
  title: "What Is OpenCode AI?",
  url: "https://blog.doshby.com/what-is-opencode-ai/",
  publisher: "Doshby",
  notes:
    "Secondary explainer used for the June 19, 2025 public launch date, the founding-team roster, and a summary of the OpenCode/Crush fork history.",
});
const charmBlog = source({
  binding: "reporting",
  mediaType: "article",
  title: "A coffee shop for your terminal",
  url: "https://charm.land/blog/terminaldotshop/",
  publisher: "Charm",
  notes:
    "Charm's account of terminal.shop: launched at React Miami, built live on stream by ThePrimeagen and TJ DeVries using Charm's TUI libraries, sold out within days.",
});
const aiengineerSpeaker = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Dax Raad — speaker profile, AI Engineer",
  url: "https://ai.engineer/speakers/dax-raad",
  publisher: "AI Engineer",
  publishedAt: "2025",
  notes:
    "Conference bio and talk listing for 'AI changes Nothing' at AI Engineer Code 2025; summarizes his early-career history and product philosophy.",
});
const theorg = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Dax Raad — The Org",
  url: "https://theorg.com/org/serverless-stack/org-chart/dax-raad",
  publisher: "The Org",
  notes:
    "Aggregated career listing (Bukkit, Clossit, Parrable, Inbox Messenger, Ironbay, Ride Health, Boulevard, Bumi, SST); self-reported data, cross-checked where possible.",
});

const S = {
  thdxr: thdxr.id,
  sstAbout: sstAbout.id,
  opencodeSite: opencodeSite.id,
  sstV2: sstV2.id,
  sstV3: sstV3.id,
  movingCdk: movingCdk.id,
  tomorrowFm: tomorrowFm.id,
  ghThdxr: ghThdxr.id,
  xThdxr: xThdxr.id,
  twitchThdxr: twitchThdxr.id,
  ghOpencode: ghOpencode.id,
  ycSst: ycSst.id,
  pragmatic: pragmatic.id,
  baseten: baseten.id,
  kr36: kr36.id,
  techcrunch: techcrunch.id,
  doshby: doshby.id,
  charmBlog: charmBlog.id,
  aiengineerSpeaker: aiengineerSpeaker.id,
  theorg: theorg.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-dax-raad",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "dax-raad",
    displayName: "Dax Raad",
    alsoKnownAs: ["dax", "thdxr"],
    summary:
      "New York-based developer-tools founder — a core member of the SST/Anomaly team, co-creator of the open-source coding agent opencode, and a prolific streamer known for terminal-first products and skepticism toward AI hype.",
    identity: {
      officialSite: "https://thdxr.com/",
      profiles: [
        "https://github.com/thdxr",
        "https://x.com/thdxr",
        "https://www.twitch.tv/thdxr",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "projects", "media", "philosophy"],
  },
  sources: [
    thdxr,
    sstAbout,
    opencodeSite,
    sstV2,
    sstV3,
    movingCdk,
    tomorrowFm,
    ghThdxr,
    xThdxr,
    twitchThdxr,
    ghOpencode,
    ycSst,
    pragmatic,
    baseten,
    kr36,
    techcrunch,
    doshby,
    charmBlog,
    aiengineerSpeaker,
    theorg,
  ],
  claims: [
    {
      id: "claim-handle",
      kind: "fact",
      text: "Dax Raad builds and publishes under the handle thdxr — on GitHub, X, and Twitch — and lists New York City as his location.",
      sourceIds: [S.ghThdxr, S.xThdxr, S.thdxr],
    },
    {
      id: "claim-bukkit",
      kind: "fact",
      text: "Around 2010–2011 he was a core developer on Bukkit, the Minecraft server mod framework later acquired by Mojang — an early open-source education he has described as formative, learning from experienced developers in IRC channels.",
      sourceIds: [S.theorg, S.pragmatic],
    },
    {
      id: "claim-early-career",
      kind: "fact",
      text: "His early career was startups and consulting: he started a company with a friend around 2012 that was acquihired, and public résumé aggregations list lead-developer and architect roles at Parrable and Inbox Messenger, his own shop Ironbay from 2015, head of engineering at Ride Health (2017–2020), and director of engineering at Boulevard (2020–2021).",
      sourceIds: [S.aiengineerSpeaker, S.theorg, S.kr36],
    },
    {
      id: "claim-bumi",
      kind: "fact",
      text: "He founded Bumi — developer tooling aimed at healthcare products — around 2021; his personal site and GitHub bio list it alongside SST.",
      sourceIds: [S.thdxr, S.ghThdxr],
    },
    {
      id: "claim-sst-founded",
      kind: "fact",
      text: "SST began as Serverless Stack, a developer-tools company founded in 2017 by Jay V and Frank Wang, who met at the University of Waterloo and had built products together since school.",
      sourceIds: [S.techcrunch],
    },
    {
      id: "claim-yc-seed",
      kind: "fact",
      text: "The company went through Y Combinator's Winter 2021 batch and announced a $1 million seed round in July 2021, backed by Greylock, SV Angel, Y Combinator, and a roster of founder-angels including Reid Hoffman, Max Levchin, Steve Chen, and Russ Simmons.",
      sourceIds: [S.techcrunch, S.ycSst, S.sstAbout],
    },
    {
      id: "claim-joined-sst",
      kind: "fact",
      text: "Raad came to SST as a user and open-source contributor, invested in its round, then joined the existing founding team about a month later in 2021 — he jokes he paid tax on an investment that effectively became salary.",
      sourceIds: [S.kr36, S.aiengineerSpeaker, S.theorg],
    },
    {
      id: "claim-sst-versions",
      kind: "fact",
      text: "SST shipped v1 in 2022, rebranded the site from Serverless Stack to sst.dev that year, released a major v2 in February 2023, and in August 2024 shipped v3 — the Ion engine, which replaced AWS CDK and CloudFormation with Pulumi and Terraform providers and opened the framework to 150+ providers beyond AWS.",
      sourceIds: [S.sstV2, S.sstV3, S.movingCdk],
    },
    {
      id: "claim-ecosystem",
      kind: "fact",
      text: "The same team maintains OpenNext (serverless Next.js deployments outside Vercel), OpenAuth (a standards-based auth provider), the SST Console, and models.dev, and previously ran Seed, the deploy service for SST v2 apps.",
      sourceIds: [S.sstAbout, S.ycSst, S.sstV3],
    },
    {
      id: "claim-terminal-shop",
      kind: "fact",
      text: "In 2024 Raad co-founded Terminal (terminal.shop), a coffee company whose storefront is a terminal UI reached over SSH — 'ssh terminal.shop'. It launched at React Miami, sold out within days, and was assembled live on stream by ThePrimeagen and TJ DeVries using Charm's TUI libraries.",
      sourceIds: [S.charmBlog, S.aiengineerSpeaker],
    },
    {
      id: "claim-podcast",
      kind: "fact",
      text: "He co-hosts 'How About Tomorrow?', a podcast about web technologies, the internet, and 'the future of (basically) everything,' with Adam Elmore.",
      sourceIds: [S.tomorrowFm],
    },
    {
      id: "claim-streaming",
      kind: "fact",
      text: "He has livestreamed software work on Twitch as thdxr for years, telling JS Party he had been streaming nearly every day — a habit he credits with making him comfortable on camera.",
      sourceIds: [S.twitchThdxr],
    },
    {
      id: "claim-opencode-launch",
      kind: "fact",
      text: "OpenCode launched publicly on June 19, 2025, built by Anomaly — the company behind SST — by a team reported as Jay V, Frank Wang, Dax Raad, and Adam Elmore; the MIT-licensed repository, primarily TypeScript, had been created weeks earlier on April 30, 2025.",
      sourceIds: [S.doshby, S.ghOpencode],
    },
    {
      id: "claim-opencode-origin",
      kind: "fact",
      text: "The OpenCode name has a contested origin: an earlier Go terminal agent created by Kujtim Hoxha was rebranded OpenCode after Raad and Adam became major contributors and Raad's side acquired the opencode.ai domain; when Charm hired Hoxha and took the original codebase, Charm's continuation was renamed Crush in July 2025 while the SST team's TypeScript rewrite kept the OpenCode name.",
      sourceIds: [S.doshby],
    },
    {
      id: "claim-growth",
      kind: "fact",
      text: "OpenCode's self-reported usage grew from roughly 650,000 monthly active users to nearly 8 million — with almost 1 million daily actives — by May 2026; its homepage claims over 16 million monthly developers and about 195,000 GitHub stars.",
      sourceIds: [S.pragmatic, S.opencodeSite],
    },
    {
      id: "claim-anthropic-block",
      kind: "fact",
      text: "When Anthropic blocked third-party tools including OpenCode from Claude subscription OAuth in January 2026, the team routed around it with OpenAI and GitHub Copilot sign-in options; the episode is credited with accelerating rather than slowing OpenCode's growth.",
      sourceIds: [S.pragmatic, S.opencodeSite],
    },
    {
      id: "claim-zen",
      kind: "fact",
      text: "In late 2025 the team launched OpenCode Zen, a curated model gateway offering tested deployments of brand-name and open models, run at breakeven and usable by agents other than OpenCode.",
      sourceIds: [S.baseten],
    },
    {
      id: "claim-breakeven",
      kind: "fact",
      text: "Raad says the company reached breakeven around February 2025, ending a stretch in which it had roughly one month of runway left — a moment he describes the team meeting with unusual calm.",
      sourceIds: [S.kr36],
    },
    {
      id: "claim-ai-engineer-talk",
      kind: "fact",
      text: "He gave a talk titled 'AI changes Nothing' at AI Engineer Code 2025, arguing that AI does not change the fundamentals of building a successful product.",
      sourceIds: [S.aiengineerSpeaker],
    },
    {
      id: "claim-terminal-ceiling",
      kind: "stated_belief",
      text: "Raad believes the terminal is an under-pushed platform — as a Neovim user he understands 'the ceiling of what you can do in the terminal' — and that incumbents deliberately keep their agents simple while OpenCode pushes those limits.",
      sourceIds: [S.baseten],
    },
    {
      id: "claim-open-source-option",
      kind: "stated_belief",
      text: "He positions OpenCode as 'the open source option in this space': open source wins where there is a long tail of models and environments no single team can cover, and community contributors who live in those models make the port quality possible.",
      sourceIds: [S.baseten],
    },
    {
      id: "claim-positioning",
      kind: "stated_belief",
      text: "He argues positioning beats raw execution speed — 'Get positioning right and the world just keeps handing you wins you didn't expect' — crediting OpenCode's rise to claiming the open-source category that every market-leading dev tool occupies but no coding agent had.",
      sourceIds: [S.pragmatic],
    },
    {
      id: "claim-ai-skeptic",
      kind: "stated_belief",
      text: "He is openly skeptical of AI hype: AI makes coding easier but the job's hard parts don't vanish, engineers mostly convert gains into time saved rather than output, confident predictions are usually self-reassurance, and shipping 10x more features makes a 'Frankenstein' product.",
      sourceIds: [S.pragmatic, S.aiengineerSpeaker],
    },
    {
      id: "claim-ownership",
      kind: "stated_belief",
      text: "He holds that developers should retain control of infrastructure, identity, and models: outsourcing login mechanics can be sensible, but surrendering ownership of an app's users creates a deeper dependency — the premise behind OpenAuth and SST's deploy-to-your-own-account model.",
      sourceIds: [S.aiengineerSpeaker, S.sstAbout],
    },
    {
      id: "claim-primitives",
      kind: "stated_belief",
      text: "His product philosophy: start with powerful primitives and build up to a good default experience, so a tool can serve tinkerers and everyday users at once rather than being filed as the advanced-user option.",
      sourceIds: [S.baseten],
    },
    {
      id: "claim-pattern-constraints",
      kind: "pattern",
      text: "Across SST, terminal.shop, and OpenCode, he repeatedly turns developer-culture constraints — terminals, SSH, CLIs — into real products whose medium is also the marketing.",
      sourceIds: [S.charmBlog, S.opencodeSite, S.sstV3],
    },
    {
      id: "claim-pattern-public",
      kind: "pattern",
      text: "He builds in public as a method: livestreaming code, co-hosting a podcast, posting prolifically on X, and bootstrapping open-source communities through contributors and Discord.",
      sourceIds: [S.twitchThdxr, S.tomorrowFm, S.xThdxr, S.baseten],
    },
    {
      id: "claim-pattern-frugality",
      kind: "pattern",
      text: "A capital-frugal streak recurs: a single $1M seed in 2021, a deliberate breakeven push through early 2025, Zen run at breakeven, and no announced new venture round even as OpenCode's usage exploded.",
      sourceIds: [S.techcrunch, S.kr36, S.baseten],
    },
    {
      id: "claim-spec-usage",
      kind: "speculation",
      text: "The headline usage figures — monthly and daily developer counts — are self-reported by OpenCode's site and interviews; no independent measurement appears in the cited record.",
      sourceIds: [S.opencodeSite, S.pragmatic],
    },
    {
      id: "claim-spec-cofounder",
      kind: "speculation",
      text: "His formal status inside Anomaly is ambiguous across the record: sources variously call him co-founder, creator, core maintainer, and founding-team member who joined after the company existed, while Y Combinator's profile lists only Jay V and Frank Wang as active founders.",
      sourceIds: [S.ycSst, S.aiengineerSpeaker, S.kr36, S.theorg],
    },
    {
      id: "claim-spec-terminal-entity",
      kind: "speculation",
      text: "Terminal's corporate relationship to Anomaly is not publicly specified — it is described as a company Raad co-founded with other creators, while SST materials present it as a team project built with SST v3.",
      sourceIds: [S.charmBlog, S.sstV3, S.aiengineerSpeaker],
    },
  ],
  timeline: [
    {
      id: "event-bukkit",
      kind: "role",
      date: "2010",
      end: "2011",
      title: "Core developer on Bukkit",
      summary:
        "Helped build the Minecraft server mod framework later acquired by Mojang; formative open-source work rooted in IRC communities.",
      organization: "Bukkit",
      organizationHandle: "bukkit",
      sourceIds: [S.theorg],
    },
    {
      id: "event-ironbay",
      kind: "founded",
      date: "2015",
      title: "Founded Ironbay",
      summary:
        "His independent software shop; his GitHub profile still lists @ironbay membership.",
      organization: "Ironbay",
      organizationHandle: "ironbay",
      sourceIds: [S.theorg, S.ghThdxr],
    },
    {
      id: "event-ride-health",
      kind: "role",
      date: "2017",
      end: "2020",
      title: "Head of Engineering at Ride Health",
      summary: "Led engineering at the healthcare-transportation startup.",
      organization: "Ride Health",
      organizationHandle: "ride-health",
      sourceIds: [S.theorg, S.kr36],
    },
    {
      id: "event-boulevard",
      kind: "role",
      date: "2020",
      end: "2021",
      title: "Director of Engineering at Boulevard",
      summary:
        "His first pure management role at a Series-B-stage startup; he started contributing to open source on the side — which led to SST.",
      organization: "Boulevard",
      organizationHandle: "boulevard",
      sourceIds: [S.theorg, S.kr36],
    },
    {
      id: "event-yc-seed",
      kind: "milestone",
      date: "2021-07-23",
      title: "Serverless Stack announces $1M seed (YC W21)",
      summary:
        "The Jay V and Frank Wang company announced seed backing from Greylock, SV Angel, Y Combinator, and founder-angels.",
      organization: "Anomaly Innovations",
      organizationHandle: "anomaly-innovations",
      sourceIds: [S.techcrunch, S.ycSst],
    },
    {
      id: "event-joins-sst",
      kind: "role",
      date: "2021-08",
      title: "Joins SST as core maintainer",
      summary:
        "From user and contributor to team member — roughly a month after investing in the round, by his account.",
      organization: "SST",
      organizationHandle: "sst",
      sourceIds: [S.theorg, S.kr36],
    },
    {
      id: "event-sst-v2",
      kind: "project",
      date: "2023-02-27",
      title: "SST v2 released",
      summary:
        "Major rewrite of the serverless framework's config, CLI, and development workflow.",
      organization: "SST",
      organizationHandle: "sst",
      sourceIds: [S.sstV2],
    },
    {
      id: "event-ion",
      kind: "project",
      date: "2024-01-29",
      title: "SST announces the Ion engine",
      summary:
        "A move off AWS CDK and CloudFormation onto Pulumi and Terraform providers.",
      organization: "SST",
      organizationHandle: "sst",
      sourceIds: [S.movingCdk],
    },
    {
      id: "event-terminal-shop",
      kind: "project",
      date: "2024-04",
      title: "Terminal (terminal.shop) launches at React Miami",
      summary:
        "Coffee storefront over SSH, built live on stream; sold out within days.",
      sourceIds: [S.charmBlog],
    },
    {
      id: "event-sst-v3",
      kind: "milestone",
      date: "2024-08-20",
      title: "Ion ships as SST v3",
      summary:
        "Deployments run locally with state backed up to the user's own account; support for 150+ providers beyond AWS.",
      organization: "SST",
      organizationHandle: "sst",
      sourceIds: [S.sstV3],
    },
    {
      id: "event-breakeven",
      kind: "milestone",
      date: "2025-02",
      title: "Company reaches breakeven",
      summary:
        "Raad recounts roughly one month of runway left when revenue caught up.",
      sourceIds: [S.kr36],
    },
    {
      id: "event-opencode-launch",
      kind: "project",
      date: "2025-06-19",
      title: "OpenCode launches publicly",
      summary:
        "Open-source, model-agnostic terminal AI coding agent; the repository had been created April 30, 2025.",
      organization: "Anomaly",
      organizationHandle: "anomaly",
      sourceIds: [S.doshby, S.ghOpencode],
    },
    {
      id: "event-zen",
      kind: "project",
      date: "2025-10",
      title: "OpenCode Zen launches",
      summary:
        "A curated, benchmarked model gateway run at breakeven, usable by agents beyond OpenCode.",
      sourceIds: [S.baseten],
    },
    {
      id: "event-anthropic-block",
      kind: "milestone",
      date: "2026-01",
      title: "Anthropic blocks third-party OAuth; OpenCode grows past it",
      summary:
        "Blocking Claude subscription logins pushed users toward alternatives; OpenCode added OpenAI and GitHub Copilot sign-ins and its growth accelerated.",
      sourceIds: [S.pragmatic, S.opencodeSite],
    },
  ],
  themes: [
    {
      id: "theme-terminal",
      kind: "practice",
      status: "stated",
      title: "The terminal as home court",
      summary:
        "He treats the terminal as an under-pushed platform with a high ceiling — an SSH coffee shop, a streaming setup, a Neovim habit, and a coding agent whose TUI goes further than incumbents dare. The medium is also the message.",
      sourceIds: [S.baseten, S.charmBlog, S.opencodeSite],
    },
    {
      id: "theme-open-source",
      kind: "method",
      status: "stated",
      title: "Open source where the long tail lives",
      summary:
        "He argues open source wins only where a community's breadth is load-bearing — dozens of models, editors, and environments no vendor can test alone. 'We are the open source option in this space.'",
      sourceIds: [S.baseten, S.pragmatic],
    },
    {
      id: "theme-ownership",
      kind: "philosophy",
      status: "stated",
      title: "Own your stack",
      summary:
        "A consistent line from SST through OpenAuth to OpenCode: deploy to your own account, keep your users' identity in-house, and don't bind your agent to one model vendor. Convenience is fine; surrendering ownership is not.",
      sourceIds: [S.aiengineerSpeaker, S.sstAbout, S.sstV3],
    },
    {
      id: "theme-ai-skepticism",
      kind: "belief",
      status: "stated",
      title: "AI skepticism from inside the AI boom",
      summary:
        "Building one of the most popular AI coding tools, he insists AI changes implementation, not fundamentals: the hard parts of engineering remain, gains mostly cash out as time, benchmarks mislead, and confident predictions are self-reassurance.",
      sourceIds: [S.pragmatic, S.aiengineerSpeaker],
    },
    {
      id: "theme-taste",
      kind: "method",
      status: "stated",
      title: "Positioning, taste, and the aha moment",
      summary:
        "He credits OpenCode's rise to claiming an unoccupied category — the open-source coding agent — and to product judgment: distinctive marketing, frictionless onboarding to a first moment of value, and depth that survives demanding users.",
      sourceIds: [S.pragmatic, S.aiengineerSpeaker],
    },
    {
      id: "theme-build-in-public",
      kind: "practice",
      status: "stated",
      title: "Building in public",
      summary:
        "Daily-ish Twitch streams, a co-hosted podcast, prolific posting on X, and products assembled live on stream — the audience is both community and distribution.",
      sourceIds: [S.twitchThdxr, S.tomorrowFm, S.xThdxr, S.charmBlog],
    },
    {
      id: "theme-frugality",
      kind: "practice",
      status: "reported",
      title: "Small seed, breakeven discipline",
      summary:
        "A $1M seed in 2021, a deliberate march to breakeven by early 2025, and a model gateway run at breakeven — capital frugality as product strategy, not accident.",
      sourceIds: [S.techcrunch, S.kr36, S.baseten],
    },
    {
      id: "theme-formation",
      kind: "influence",
      status: "reported",
      title: "Formed by IRC, Minecraft, and open source",
      summary:
        "Bukkit-era modding and IRC mentors shaped both his engineering and his instincts for community — the same pattern he later ran on SST's and OpenCode's Discords and contributor bases.",
      sourceIds: [S.theorg, S.pragmatic],
    },
  ],
  works: [
    {
      id: "work-opencode",
      kind: "product",
      status: "ongoing",
      title: "opencode",
      date: "2025",
      summary:
        "The open-source, model-agnostic AI coding agent — terminal UI, desktop app, and IDE extension; MIT-licensed and primarily TypeScript; the fastest-growing project his team has shipped.",
      sourceIds: [S.ghOpencode, S.opencodeSite, S.doshby],
    },
    {
      id: "work-zen",
      kind: "product",
      status: "released",
      title: "OpenCode Zen",
      date: "2025",
      summary:
        "A curated, benchmarked model gateway run at breakeven; works with OpenCode or any other agent.",
      sourceIds: [S.baseten],
    },
    {
      id: "work-sst",
      kind: "project",
      status: "ongoing",
      title: "SST",
      date: "2021",
      summary:
        "The open-source framework for building full-stack apps on your own infrastructure; he joined its founding team as core maintainer after starting as a user and contributor.",
      sourceIds: [S.sstAbout, S.kr36],
    },
    {
      id: "work-sst-v3",
      kind: "project",
      status: "released",
      title: "SST v3 (Ion)",
      date: "2024-08-20",
      summary:
        "The Pulumi/Terraform-based deployment engine that replaced CDK and CloudFormation, expanding SST past AWS to 150+ providers.",
      sourceIds: [S.sstV3, S.movingCdk],
    },
    {
      id: "work-sst-v2",
      kind: "project",
      status: "released",
      title: "SST v2",
      date: "2023-02-27",
      summary:
        "The major 2023 rewrite that streamlined configuration, CLI, and app-development workflows.",
      sourceIds: [S.sstV2, S.aiengineerSpeaker],
    },
    {
      id: "work-opennext",
      kind: "project",
      status: "released",
      title: "OpenNext",
      date: "2023",
      summary:
        "The open-source serverless adapter that deploys Next.js apps to AWS outside Vercel; later broadened into a community effort.",
      sourceIds: [S.sstAbout, S.ycSst],
    },
    {
      id: "work-openauth",
      kind: "project",
      status: "released",
      title: "OpenAuth",
      date: "2024",
      summary:
        "A universal, standards-based auth provider — the team's answer to outsourcing application identity.",
      sourceIds: [S.sstAbout, S.ycSst, S.ghThdxr],
    },
    {
      id: "work-console",
      kind: "product",
      status: "released",
      title: "SST Console",
      date: "2023",
      summary:
        "The web dashboard for SST apps — resources, updates, and git-push autodeploy.",
      sourceIds: [S.sstV3],
    },
    {
      id: "work-seed",
      kind: "product",
      status: "released",
      title: "Seed",
      summary:
        "The team's earlier deploy service for SST apps; v3 documentation steers users to the Console instead.",
      sourceIds: [S.sstV3],
    },
    {
      id: "work-models-dev",
      kind: "project",
      status: "ongoing",
      title: "models.dev",
      summary:
        "The team's catalog of LLM providers and pricing, which powers OpenCode's 75+ provider support.",
      sourceIds: [S.ycSst, S.opencodeSite],
    },
    {
      id: "work-terminal-shop",
      kind: "product",
      status: "ongoing",
      title: "Terminal (terminal.shop)",
      date: "2024",
      summary:
        "A coffee company co-founded with other developer-creators whose storefront is a TUI reached over SSH; launched at React Miami and sold out within days.",
      sourceIds: [S.charmBlog, S.aiengineerSpeaker],
    },
    {
      id: "work-bumi",
      kind: "product",
      status: "ongoing",
      title: "Bumi",
      date: "2021",
      summary:
        "Developer tooling for healthcare products — his listed side build alongside SST.",
      sourceIds: [S.thdxr, S.ghThdxr],
    },
    {
      id: "work-bukkit",
      kind: "project",
      status: "completed",
      title: "Bukkit",
      date: "2010",
      summary:
        "The Minecraft server mod framework he helped build as a core developer; later acquired by Mojang.",
      sourceIds: [S.theorg],
    },
    {
      id: "work-tomorrow-podcast",
      kind: "recording",
      status: "ongoing",
      title: "How About Tomorrow?",
      summary:
        "The podcast he co-hosts with Adam Elmore about web technology and the future.",
      sourceIds: [S.tomorrowFm],
    },
  ],
  appearances: [
    {
      id: "appearance-pragmatic",
      title: "Building OpenCode with Dax Raad",
      venue: "The Pragmatic Engineer Podcast",
      publishedAt: "2026-05-27",
      participants: ["Dax Raad", "Gergely Orosz"],
      summary:
        "An 80-minute episode on OpenCode's growth, the Anthropic OAuth block, AI hype skepticism, and engineering judgment.",
      media: [
        {
          type: "audio",
          url: "https://newsletter.pragmaticengineer.com/p/opencode",
          sourceId: S.pragmatic,
        },
      ],
      sourceIds: [S.pragmatic],
    },
    {
      id: "appearance-baseten",
      title: "Building AI agents, open code, and open source",
      venue: "Baseten Blog",
      publishedAt: "2025-10-23",
      participants: ["Dax Raad", "Madison Kanna"],
      summary:
        "Q&A on why he built OpenCode, the launch of Zen, open-source positioning, and why benchmarks mislead.",
      media: [
        {
          type: "article",
          url: "https://www.baseten.co/blog/building-ai-agents-open-code-and-open-source-a-conversation-with-dax/",
          sourceId: S.baseten,
        },
      ],
      sourceIds: [S.baseten],
    },
    {
      id: "appearance-36kr",
      title: "Popular AI Coding Tool: Co-founder Says Engineers Still Have Hope",
      venue: "36Kr",
      participants: ["Dax Raad"],
      summary:
        "English-language Q&A covering his path into SST, the February 2025 breakeven, and why he thinks engineers retain leverage.",
      media: [
        {
          type: "article",
          url: "https://eu.36kr.com/en/p/3829518101062785",
          sourceId: S.kr36,
        },
      ],
      sourceIds: [S.kr36],
    },
    {
      id: "appearance-ai-engineer",
      title: "AI changes Nothing",
      venue: "AI Engineer Code 2025",
      publishedAt: "2025",
      participants: ["Dax Raad"],
      summary:
        "A conference talk arguing AI does not change the fundamentals of building a successful product — marketing, onboarding, and durable depth still decide.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=o3gmwzo-Mik",
        },
      ],
      sourceIds: [S.aiengineerSpeaker],
    },
    {
      id: "appearance-twitch",
      title: "thdxr livestreams",
      venue: "Twitch",
      participants: ["Dax Raad"],
      summary:
        "His long-running coding stream — daily for stretches — where much of the team's software is built in public.",
      media: [
        {
          type: "video",
          url: "https://www.twitch.tv/thdxr",
          sourceId: S.twitchThdxr,
        },
      ],
      sourceIds: [S.twitchThdxr],
    },
    {
      id: "appearance-tomorrow",
      title: "How About Tomorrow?",
      venue: "tomorrow.fm",
      participants: ["Dax Raad", "Adam Elmore"],
      summary:
        "The podcast he co-hosts about web technologies, the internet, and the future of basically everything.",
      media: [
        {
          type: "audio",
          url: "https://tomorrow.fm/",
          sourceId: S.tomorrowFm,
        },
      ],
      sourceIds: [S.tomorrowFm],
    },
    {
      id: "appearance-x",
      title: "Posting as @thdxr",
      venue: "X",
      participants: ["Dax Raad"],
      summary:
        "His public posting presence — product launches, provocations, and the stream-of-record for OpenCode announcements.",
      sourceIds: [S.xThdxr],
    },
  ],
  relations: [
    {
      id: "rel-anomaly",
      kind: "other",
      target: "anomaly",
      targetName: "Anomaly (SST)",
      targetKind: "organization",
      note:
        "Came to SST in 2021 as user, open-source contributor, and investor, then joined the founding team about a month later; now a core member of the company behind sst.dev and opencode. His formal title is ambiguous across the record — sources variously call him co-founder, creator, and core maintainer.",
      start: "2021",
      sourceIds: [S.kr36, S.aiengineerSpeaker, S.theorg, S.sstAbout],
    },
    {
      id: "rel-bumi",
      kind: "founded",
      target: "bumi",
      targetName: "Bumi",
      targetKind: "organization",
      note:
        "Founded the healthcare developer-tooling project around 2021; his site and GitHub bio list it alongside SST.",
      start: "2021",
      sourceIds: [S.thdxr, S.ghThdxr],
    },
    {
      id: "rel-terminal",
      kind: "founded",
      target: "terminal-shop",
      targetName: "Terminal (terminal.shop)",
      targetKind: "organization",
      note:
        "Co-founded the coffee company whose storefront is a TUI reached over SSH; launched at React Miami in 2024 and sold out within days.",
      start: "2024",
      sourceIds: [S.charmBlog, S.aiengineerSpeaker],
    },
    {
      id: "rel-ironbay",
      kind: "founded",
      target: "ironbay",
      targetName: "Ironbay",
      targetKind: "organization",
      note:
        "His independent software shop from 2015; his GitHub profile still lists @ironbay membership.",
      start: "2015",
      sourceIds: [S.theorg, S.ghThdxr],
    },
    {
      id: "rel-ride-health",
      kind: "employed_by",
      target: "ride-health",
      targetName: "Ride Health",
      targetKind: "organization",
      note: "Head of engineering at the healthcare-transportation startup, 2017–2020.",
      start: "2017",
      end: "2020",
      sourceIds: [S.theorg, S.kr36],
    },
    {
      id: "rel-boulevard",
      kind: "employed_by",
      target: "boulevard",
      targetName: "Boulevard",
      targetKind: "organization",
      note:
        "Director of engineering, 2020–2021 — his first pure management role; the side open-source work there led to SST.",
      start: "2020",
      end: "2021",
      sourceIds: [S.theorg, S.kr36],
    },
    {
      id: "rel-bukkit",
      kind: "other",
      target: "bukkit",
      targetName: "Bukkit",
      targetKind: "organization",
      note:
        "Core developer on the Minecraft server mod framework around 2010–2011 — his formative open-source work; later acquired by Mojang.",
      start: "2010",
      end: "2011",
      targetWikidataId: "Q32149869",
      sourceIds: [S.theorg, S.pragmatic],
    },
    {
      id: "rel-jay-v",
      kind: "collaborated",
      target: "jay-v",
      targetName: "Jay V",
      note:
        "SST co-founder; Raad joined the existing team in 2021 and they now build SST and opencode together.",
      sourceIds: [S.techcrunch, S.ycSst, S.doshby],
    },
    {
      id: "rel-frank-wang",
      kind: "collaborated",
      target: "frank-wang",
      targetName: "Frank Wang",
      note:
        "SST co-founder; Raad joined the existing team in 2021 and they now build SST and opencode together.",
      sourceIds: [S.techcrunch, S.ycSst, S.doshby],
    },
    {
      id: "rel-adam-elmore",
      kind: "collaborated",
      target: "adam-elmore",
      targetName: "Adam Elmore",
      note:
        "Co-hosts the 'How About Tomorrow?' podcast with Raad and is on the reported opencode founding team.",
      sourceIds: [S.tomorrowFm, S.doshby],
    },
    {
      id: "rel-theprimeagen",
      kind: "collaborated",
      target: "theprimeagen",
      targetName: "ThePrimeagen",
      note:
        "Assembled terminal.shop live on stream with TJ DeVries using Charm's TUI libraries.",
      targetWikidataId: "Q133541374",
      sourceIds: [S.charmBlog],
    },
    {
      id: "rel-tj-devries",
      kind: "collaborated",
      target: "tj-devries",
      targetName: "TJ DeVries",
      note:
        "Assembled terminal.shop live on stream with ThePrimeagen using Charm's TUI libraries.",
      sourceIds: [S.charmBlog],
    },
    {
      id: "rel-kujtim-hoxha",
      kind: "collaborated",
      target: "kujtim-hoxha",
      targetName: "Kujtim Hoxha",
      note:
        "Created the earlier Go terminal agent that was rebranded OpenCode after Raad and Adam Elmore became major contributors; Charm later hired him and continued the original codebase as Crush.",
      sourceIds: [S.doshby],
    },
    {
      id: "rel-gergely-orosz",
      kind: "interviewed_by",
      target: "gergely-orosz",
      targetName: "Gergely Orosz",
      note:
        "The Pragmatic Engineer Podcast, 'Building OpenCode with Dax Raad,' May 2026.",
      targetWikidataId: "Q115090522",
      sourceIds: [S.pragmatic],
    },
    {
      id: "rel-madison-kanna",
      kind: "interviewed_by",
      target: "madison-kanna",
      targetName: "Madison Kanna",
      note: "Baseten Q&A on OpenCode, Zen, and open-source strategy, October 2025.",
      sourceIds: [S.baseten],
    },
  ],
  openQuestions: [
    "OpenCode's usage figures — monthly and daily developer counts — are self-reported on its own site and in interviews; no independent measurement appears in the record.",
    "His formal status inside Anomaly is unsettled in public sources: 'co-founder,' 'creator,' 'core maintainer,' and 'founding-team member' all appear, and Y Combinator lists only Jay V and Frank Wang as active founders.",
    "The OpenCode/Crush split is contested: Charm describes its archived repository as the original project, while the SST side and community accounts describe the name staying with the domain and community Raad's side built.",
    "Early-career specifics — Bukkit's dates, Clossit, the circa-2012 acquihire, Ironbay — rest on self-reported profiles and aggregations rather than primary records.",
    "Terminal (terminal.shop)'s corporate structure relative to Anomaly is not publicly specified.",
  ],
  body: `Dax Raad is a developer-tools founder who has spent a decade and a half moving between startups, open source, and livestreaming — a path that converged on two of the most-watched developer products of the AI era: SST, the infrastructure framework, and opencode, the open-source terminal coding agent.

## Formation and early career

Raad programs from a young age — his father was a software engineer — and went straight from high school into startups rather than college, per his interviews. Around 2010–2011 he was a core developer on Bukkit, the Minecraft server framework that let developers extend the game with plugins and was eventually acquired by Mojang; he has described learning rapidly from experienced developers in IRC channels and being more interested in building sandboxes and watching behavior than in the game itself. A company started with a friend circa 2012 ended in an acquihire that left him leading engineering at the acquirer. Public résumé aggregations then trace a line through lead-developer and architect roles at Parrable and Inbox Messenger, his own shop Ironbay from 2015, head of engineering at the healthcare-transportation startup Ride Health (2017–2020), and director of engineering at Boulevard (2020–2021) — his first purely managerial role, and the one that pushed him back toward open source on the side. He also founded Bumi, developer tooling for healthcare products, around 2021.

## SST and the infrastructure years

Serverless Stack was founded in 2017 by Jay V and Frank Wang, University of Waterloo classmates who had built developer products together since school. The company entered Y Combinator's Winter 2021 batch and announced a $1 million seed that July — Greylock, SV Angel, and YC joined a roster of founder-angels that SST's own site lists as Reid Hoffman, Max Levchin, Steve Chen, Russ Simmons, and others.

Raad arrived sideways: frustrated with AWS tooling, he started contributing to SST, invested in the round, and joined the founding team about a month later — paying tax, he jokes, on an investment that effectively became salary. SST shipped v1 in 2022, rebranded to sst.dev, and released a major v2 in February 2023. The bigger move came in 2024: disillusioned with the black boxes of AWS CDK and CloudFormation, the team built Ion, a deployment engine on Pulumi and Terraform providers, and shipped it as SST v3 in August 2024 — expanding the framework past AWS to 150+ providers. Around it grew an ecosystem: OpenNext for serverless Next.js, OpenAuth for self-owned identity, the SST Console, models.dev, and the earlier Seed deploy service.

The company stayed capital-frugal: a single $1M seed, then a deliberate march to breakeven that bottomed out around February 2025 with roughly one month of runway left — a moment Raad describes the team meeting with strange calm, as if defaulting to the belief that things would work out.

## Terminal, streams, and the craft of developer products

The throughline is taste for the terminal. In 2024 Raad co-founded Terminal — terminal.shop — a coffee company whose entire storefront is a TUI reached over SSH. It launched at React Miami, sold out in days, and was built live on stream by ThePrimeagen and TJ DeVries using Charm's libraries. Raad himself streams on Twitch as thdxr, co-hosts the podcast *How About Tomorrow?* with Adam Elmore, and posts prolifically on X — an audience he converts into community and distribution, a skill he credits with bootstrapping open-source projects "overnight."

## opencode

When Anthropic's Claude Code proved the terminal-agent shape, Raad saw the gap: every market-leading dev tool was open source, yet no coding agent had claimed the category. The SST years had already built the muscle — a TUI for the framework itself, an SSH coffee shop, a stream-hardened instinct for what terminals can do. OpenCode launched publicly on June 19, 2025 — model-agnostic, MIT-licensed, primarily TypeScript — under Anomaly, the company behind SST. The name carries a contested inheritance: an earlier Go agent by Kujtim Hoxha became OpenCode after Raad and Adam Elmore became major contributors and Raad's side acquired the opencode.ai domain; when Charm hired Hoxha, its continuation was renamed Crush while the SST rewrite kept the name.

Growth was steep and self-reported: from roughly 650,000 monthly users toward nearly 8 million by May 2026, with GitHub stars rivaling the biggest dev tools. When Anthropic blocked third-party OAuth in January 2026, OpenCode routed around it with OpenAI and GitHub Copilot sign-ins — and grew faster. In late 2025 the team added Zen, a curated model gateway run at breakeven.

## The philosophy

Raad is an unusual AI founder: a skeptic inside the boom. AI changes implementation, he argues, not fundamentals — the hard parts of engineering remain, gains mostly cash out as time rather than output, benchmarks mislead, and predictions are usually self-reassurance. What matters instead is positioning ("get positioning right and the world keeps handing you wins"), a frictionless path to the aha moment, durable product depth, and ownership: your infrastructure, your users' identity, your choice of model. His AI Engineer Code 2025 talk made the point in its title — *AI changes Nothing*.

## What the record does not settle

The record is loud but self-hosted. Usage numbers come from the project's own marketing; his title inside Anomaly shifts between sources; the Crush dispute has two tellings; and the early career rests on résumé aggregations rather than primary documents. The index keeps those seams visible.

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
