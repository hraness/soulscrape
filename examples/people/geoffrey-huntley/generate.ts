#!/usr/bin/env bun
/** Generate examples/people/geoffrey-huntley/person-index.json with derived source ids. */

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

const ghuntleyBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "bio — Geoffrey Huntley",
  url: "https://ghuntley.com/bio/",
  publisher: "ghuntley.com",
  notes: "The subject's own biography page; claims here are self-reported.",
});
const ghuntleyResume = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "hello — Geoffrey Huntley",
  url: "https://ghuntley.com/resume/",
  publisher: "ghuntley.com",
  notes:
    "The subject's self-published résumé and capability statement; career claims here are self-reported.",
});
const nftBayRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "ghuntley/thenftbay.org",
  url: "https://github.com/ghuntley/thenftbay.org/",
  publisher: "GitHub",
  publishedAt: "2021-11-15",
  notes:
    "Source repository and release notes for The NFT Bay; includes the project's explanatory text.",
});
const ralphPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Ralph Wiggum as a \"software engineer\"",
  url: "https://ghuntley.com/ralph/",
  publisher: "ghuntley.com",
  publishedAt: "2025-07-14",
  authors: ["Geoffrey Huntley"],
});
const ohFuckPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "An \"oh fuck\" moment in time",
  url: "https://ghuntley.com/oh-fuck",
  publisher: "ghuntley.com",
  publishedAt: "2025-01-14",
  authors: ["Geoffrey Huntley"],
});
const doThingsPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "The future belongs to people who can just do things",
  url: "https://ghuntley.com/dothings/",
  publisher: "ghuntley.com",
  publishedAt: "2025-02-07",
  authors: ["Geoffrey Huntley"],
});
const sixMonthRecap = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "the six-month recap: closing talk on AI at Web Directions, Melbourne, June 2025",
  url: "https://ghuntley.com/six-month-recap/",
  publisher: "ghuntley.com",
  publishedAt: "2025-06-17",
  authors: ["Geoffrey Huntley"],
  notes:
    "His transcript of the closing keynote he delivered at Web Directions; includes the introducer's announcement that he was leaving for Sourcegraph.",
});
const slopPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "engineer away the slop",
  url: "https://ghuntley.com/slop",
  publisher: "ghuntley.com",
  publishedAt: "2026-07-24",
  authors: ["Geoffrey Huntley"],
  notes: "Post announcing his move to Antithesis.",
});
const covidsafePost = source({
  binding: "first_person",
  mediaType: "article",
  title: "COVIDSafe: Australia's digital contact tracing failure",
  url: "https://ghuntley.com/covidsafe/",
  publisher: "ghuntley.com",
  publishedAt: "2021-09-27",
  authors: ["Geoffrey Huntley"],
});
const coffeezilla = source({
  binding: "interview",
  mediaType: "video",
  title: "Right Clicking All The NFTs",
  url: "https://www.youtube.com/watch?v=i_VsgT5gfMc",
  publisher: "Coffeezilla",
  publishedAt: "2021-11",
  authors: ["Stephen Findeisen"],
  notes:
    "Coffeezilla video about The NFT Bay featuring the creator; his site reports it passed 1.4M views.",
});
const vice = source({
  binding: "interview",
  mediaType: "article",
  title: "Someone Made a Pirate Bay for NFTs",
  url: "https://www.vice.com/en/article/someone-made-a-pirate-bay-for-nfts/",
  publisher: "VICE Motherboard",
  publishedAt: "2021-11-18",
  authors: ["Matthew Gault"],
});
const smh = source({
  binding: "interview",
  mediaType: "article",
  title: "'Extortion': Why Web3 is making a lot of software developers angry",
  url: "https://www.smh.com.au/business/companies/extortion-why-web3-is-pissing-off-a-lot-of-software-developers-20220516-p5alqd.html",
  publisher: "The Sydney Morning Herald",
  publishedAt: "2022-05-16",
  authors: ["Dominic Powell"],
});
const xamarinShow = source({
  binding: "interview",
  mediaType: "video",
  title: "Lifting App State with Geoffrey Huntley",
  url: "https://learn.microsoft.com/en-us/shows/xamarinshow/lifting-app-state-with-geoffrey-huntley",
  publisher: "Microsoft Learn",
  authors: ["James Montemagno"],
  notes:
    "The Xamarin Show episode bills him as 'Microsoft MVP Geoffrey Huntley' and covers Reactive Extensions and ReactiveUI.",
});
const verge = source({
  binding: "reporting",
  mediaType: "article",
  title: "The NFT Bay asks if you would steal all the JPEGs",
  url: "https://www.theverge.com/2021/11/18/22790131/nft-bay-pirating-digital-ownership-piracy-crypto-art-right-click",
  publisher: "The Verge",
  publishedAt: "2021-11-18",
  authors: ["Mitchell Clark"],
});
const register = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "'Ralph Wiggum' loop prompts Claude to vibe-clone commercial software for $10 an hour",
  url: "https://www.theregister.com/2026/01/27/ralph_wiggum_claude_loops/",
  publisher: "The Register",
  publishedAt: "2026-01-27",
  authors: ["Simon Sharwood"],
});
const venturebeat = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "How Ralph Wiggum went from 'The Simpsons' to the biggest name in AI right now",
  url: "https://venturebeat.com/technology/how-ralph-wiggum-went-from-the-simpsons-to-the-biggest-name-in-ai-right-now",
  publisher: "VentureBeat",
  publishedAt: "2026-01-06",
  authors: ["Carl Franzen"],
});
const concernedTech = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Letter in Support of Responsible Fintech Policy",
  url: "https://web.archive.org/web/20220601090029/https://concerned.tech/",
  publisher: "concerned.tech via the Wayback Machine",
  publishedAt: "2022-06-01",
  notes:
    "Wayback capture of the June 2022 open letter to US congressional leadership from 26 technologists; Huntley's résumé links his involvement to this capture.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Geoffrey Huntley (Q95373948)",
  url: "https://www.wikidata.org/wiki/Q95373948",
  publisher: "Wikidata",
});
const aiEngineer = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Geoffrey Huntley — AI Engineer speaker profile",
  url: "https://ai.engineer/speakers/geoffrey-huntley",
  publisher: "AI Engineer",
  notes:
    "Conference speaker profile used across AI Engineer events; summarizes his talks and the Great Loops Debate.",
});
const everythingOpen = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Everything Open 2023 — Presentation: COVIDSafe: Australia's digital contact tracing failure",
  url: "https://2023.everythingopen.au/schedule/presentation/3/",
  publisher: "Everything Open",
  publishedAt: "2023-03",
  notes:
    "Official conference program listing for his COVIDSafe talk; links the recorded session.",
});

const S = {
  ghuntleyBio: ghuntleyBio.id,
  ghuntleyResume: ghuntleyResume.id,
  nftBayRepo: nftBayRepo.id,
  ralphPost: ralphPost.id,
  ohFuckPost: ohFuckPost.id,
  doThingsPost: doThingsPost.id,
  sixMonthRecap: sixMonthRecap.id,
  slopPost: slopPost.id,
  covidsafePost: covidsafePost.id,
  coffeezilla: coffeezilla.id,
  vice: vice.id,
  smh: smh.id,
  xamarinShow: xamarinShow.id,
  verge: verge.id,
  register: register.id,
  venturebeat: venturebeat.id,
  concernedTech: concernedTech.id,
  wikidata: wikidata.id,
  aiEngineer: aiEngineer.id,
  everythingOpen: everythingOpen.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-geoffrey-huntley",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "geoffrey-huntley",
    displayName: "Geoffrey Huntley",
    alsoKnownAs: ["Geoff Huntley", "ghuntley"],
    summary:
      "Australian open-source developer, conference speaker, and writer on AI-assisted software engineering. Longtime .NET/Xamarin figure and former ReactiveUI lead maintainer; creator of The NFT Bay parody site and the 'Ralph Wiggum' agentic-coding loop.",
    identity: {
      wikidataId: "Q95373948",
      officialSite: "https://ghuntley.com/",
      profiles: [
        "https://github.com/ghuntley",
        "https://x.com/geoffreyhuntley",
        "https://www.linkedin.com/in/geoffreyhuntley",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    ghuntleyBio,
    ghuntleyResume,
    nftBayRepo,
    ralphPost,
    ohFuckPost,
    doThingsPost,
    sixMonthRecap,
    slopPost,
    covidsafePost,
    coffeezilla,
    vice,
    smh,
    xamarinShow,
    verge,
    register,
    venturebeat,
    concernedTech,
    wikidata,
    aiEngineer,
    everythingOpen,
  ],
  claims: [
    {
      id: "claim-reactiveui-lead",
      kind: "fact",
      text: "For six years Huntley was the lead and core maintainer of ReactiveUI, the composable, cross-platform model-view-viewmodel framework for .NET inspired by functional reactive programming.",
      sourceIds: [S.ghuntleyResume, S.xamarinShow],
    },
    {
      id: "claim-reactiveui-dotnet-foundation",
      kind: "fact",
      text: "Kent Boogaart, author of 'You, Me and ReactiveUI,' credits Huntley with automating ReactiveUI's build, formalising its documentation, and being instrumental in getting the project adopted into the .NET Foundation.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "claim-microsoft-mvp",
      kind: "fact",
      text: "Microsoft's own conference recording bills him as 'Microsoft MVP Geoffrey Huntley' when he appeared on The Xamarin Show to teach Reactive Extensions and ReactiveUI.",
      sourceIds: [S.xamarinShow],
    },
    {
      id: "claim-mobile-apps",
      kind: "fact",
      text: "He built mobile applications at Telstra (the 24x7 app), South32 (ROAM), Ansarada (AiDA), and Interactive, working across Xamarin/React Native cross-platform and native approaches.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "claim-weeklyxamarin",
      kind: "fact",
      text: "He co-founded WeeklyXamarin, a community publication for Xamarin and .NET mobile developers.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "claim-devrel-roles",
      kind: "fact",
      text: "His résumé lists Principal Developer Advocate roles at Gitpod, Coder, and Uno Platform; at Gitpod he was an early employee and its sole site-reliability engineer for the JAPAC region, and at Coder he wrote the Terraform templates for the cloud providers.",
      sourceIds: [S.ghuntleyResume, S.aiEngineer],
    },
    {
      id: "claim-consulting-govhack",
      kind: "fact",
      text: "Earlier roles include lead consultant at Readify and Noon, state manager of the GovHack civic hackathon, and organiser of the Sydney Gamers League; he also founded WaveOfDestruction.org, an early citizen-journalism site that hosted Indian Ocean tsunami footage.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "claim-canva",
      kind: "fact",
      text: "He was a technology lead at Canva, where an engineering director asked the principal engineers to go deep on AI over the 2024 Christmas break — the assignment that produced his 'oh fuck' moment.",
      sourceIds: [S.ghuntleyResume, S.sixMonthRecap, S.ohFuckPost],
    },
    {
      id: "claim-sourcegraph-amp",
      kind: "fact",
      text: "In mid-2025 he departed Canva and joined Sourcegraph in San Francisco to work on Amp, its agentic coding product; his résumé lists the role as Principal Software Engineer at Amp.",
      sourceIds: [S.sixMonthRecap, S.ghuntleyResume],
    },
    {
      id: "claim-optiver",
      kind: "fact",
      text: "His conference bios describe him as a former technology lead at Optiver, the proprietary trading firm.",
      sourceIds: [S.ghuntleyBio, S.aiEngineer],
    },
    {
      id: "claim-antithesis",
      kind: "fact",
      text: "In July 2026 he announced he was joining Antithesis, the deterministic simulation-testing company, arguing that 'creation is now near-free; verification/understanding is not, yet.'",
      sourceIds: [S.slopPost],
    },
    {
      id: "claim-latent-patterns",
      kind: "fact",
      text: "His stated primary focus is Latent Patterns, an educational platform that teaches AI fundamentals — transformers, attention, embeddings, agent systems — 'from first principles' for developers.",
      sourceIds: [S.ghuntleyBio],
    },
    {
      id: "claim-goat-farm",
      kind: "fact",
      text: "He lives remotely on a goat farm in regional Australia; VentureBeat describes the move as having 'pivoted to raising goats in rural Australia.'",
      sourceIds: [S.ghuntleyBio, S.venturebeat],
    },
    {
      id: "claim-covidsafe-teardown",
      kind: "fact",
      text: "From April 26, 2020, he dissected Australia's COVIDSafe contact-tracing app, published the decompiled Android source code on GitHub, and formed the CovidSafeWatch community of researchers around digital contact tracing.",
      sourceIds: [S.covidsafePost, S.everythingOpen],
    },
    {
      id: "claim-linuxconf-award",
      kind: "fact",
      text: "The CovidSafeWatch research community's work earned the LinuxConf Australia 2020 community recognition award.",
      sourceIds: [S.covidsafePost, S.everythingOpen],
    },
    {
      id: "claim-nftbay",
      kind: "fact",
      text: "In November 2021 he launched The NFT Bay, a deliberate Pirate Bay replica offering a torrent — reported at roughly 15 to 20 terabytes — of the images that NFTs on Ethereum and Solana merely point to; he described it as an educational art project.",
      sourceIds: [S.verge, S.vice, S.nftBayRepo],
    },
    {
      id: "claim-congress-letter",
      kind: "fact",
      text: "In June 2022 he was one of 26 technologists behind the 'Letter in Support of Responsible Fintech Policy,' an open letter urging US congressional leadership to resist crypto-industry lobbying and legislate skeptically.",
      sourceIds: [S.concernedTech, S.ghuntleyResume],
    },
    {
      id: "claim-ralph-post",
      kind: "fact",
      text: "On July 14, 2025 he published 'Ralph Wiggum as a \"software engineer\"', documenting Ralph — a technique whose purest form is a Bash loop feeding a prompt file into a coding agent repeatedly ('while :; do cat PROMPT.md | claude-code ; done').",
      sourceIds: [S.ralphPost],
    },
    {
      id: "claim-ralph-adoption",
      kind: "fact",
      text: "By early 2026 the technique had spread industry-wide: Anthropic shipped an official 'ralph-wiggum' plugin for Claude Code (whose creator Boris Cherny has said he uses it), Y Combinator participants adopted it, and VentureBeat called Ralph 'the biggest name in AI right now.'",
      sourceIds: [S.venturebeat, S.register],
    },
    {
      id: "claim-cursed",
      kind: "fact",
      text: "Huntley used Ralph to build CURSED, an esoteric programming language with an LLVM compiler toolchain — his demonstration that an agent could build and program in a language absent from its training data.",
      sourceIds: [S.ralphPost, S.register, S.venturebeat],
    },
    {
      id: "claim-oss-fund",
      kind: "fact",
      text: "He reports that the settlement of his property was funded through GitHub Sponsors, and that he raised $32,600 USD for open-source maintainers distributed via voting mechanisms designed so well-known projects did not absorb everything.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "claim-workshops",
      kind: "fact",
      text: "He authors MIT-licensed workshops — 'how to build a coding agent,' Nix/NixOS for developers, and an Uno Platform introduction — and delivers conference talks and guest university lectures.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "claim-future-belongs",
      kind: "stated_belief",
      text: "He argues that 'the future belongs to people who can just do things' — that by the end of 2026 most software engineers will no longer make artisanal hand-crafted commits, because programming LLMs is a new abstraction layer like compilers over assembly.",
      sourceIds: [S.doThingsPost],
    },
    {
      id: "claim-ohfuck-divide",
      kind: "stated_belief",
      text: "He divides engineering organizations into people who have had an 'oh fuck' moment with coding assistants and people who have not, and warns that engineers who do not explore AI-assisted development 'are frankly not gonna make it.'",
      sourceIds: [S.ohFuckPost, S.sixMonthRecap],
    },
    {
      id: "claim-engineer-vs-developer",
      kind: "stated_belief",
      text: "He distinguishes 'software developer' from 'engineer': now that authoring software is commoditized and everyone can create it, the engineer's job is producing experiences without defects — making verification the scarce skill.",
      sourceIds: [S.slopPost],
    },
    {
      id: "claim-ide-typewriter",
      kind: "stated_belief",
      text: "He questions why the industry crams AI into IDEs — 'essentially a typewriter' whose single-pane interface has not changed since Turbo Pascal in 1983 — and asks whether AI has rendered the IDE obsolete.",
      sourceIds: [S.sixMonthRecap],
    },
    {
      id: "claim-ralph-doctrine",
      kind: "stated_belief",
      text: "His Ralph doctrine: do one thing per loop, keep the context window lean because outcomes degrade as it fills, delegate allocation-heavy work to subagents, and when the agent fails, tune the prompt — 'like a guitar' — rather than blaming the tool.",
      sourceIds: [S.ralphPost],
    },
    {
      id: "claim-ai-skill",
      kind: "stated_belief",
      text: "He holds that LLM results mirror operator skill — that 'AI doesn't work for me' usually reflects underinvestment in deliberate practice rather than a tool limitation.",
      sourceIds: [S.ralphPost, S.sixMonthRecap],
    },
    {
      id: "claim-oss-not-free",
      kind: "stated_belief",
      text: "He argues free software is not free: maintainer hours have rates and rates require payment, and paying for consumed open-source labor broadens who gets to participate — a position he pressed while working at developer-tooling companies.",
      sourceIds: [S.ghuntleyResume, S.aiEngineer],
    },
    {
      id: "claim-nft-hyperlink",
      kind: "stated_belief",
      text: "He argues that NFT art is 'nothing more than directions on how to access or download an image' — the asset is not stored on-chain — and that Web3's pitch of a better internet functions mainly to draw in new buyers for exit liquidity.",
      sourceIds: [S.vice, S.smh, S.nftBayRepo],
    },
    {
      id: "claim-pattern-public-interest",
      kind: "pattern",
      text: "He repeatedly places himself between a hyped technology and public understanding of it: decompiling COVIDSafe during a national rollout, parodying NFT mania with a working torrent, co-signing the technologists' letter to Congress, then evangelizing agentic coding once LLMs crossed his usefulness threshold.",
      sourceIds: [S.covidsafePost, S.verge, S.concernedTech, S.ralphPost],
    },
    {
      id: "claim-pattern-brutalist-demos",
      kind: "pattern",
      text: "His demonstrations favor crude, inspectable mechanisms over elaborate ones — a five-line Bash loop, a parody torrent site, decompiled source dumps — chosen so anyone can verify the claim themselves.",
      sourceIds: [S.ralphPost, S.nftBayRepo, S.register],
    },
    {
      id: "claim-pattern-explainer",
      kind: "pattern",
      text: "He has a recurring role as a technical explainer for lay audiences — press interviews, radio, national news, and a Coffeezilla video — and says he is a Media, Entertainment & Arts Alliance member who follows the IFJ Global Charter of Ethics for Journalists.",
      sourceIds: [S.ghuntleyResume, S.smh, S.coffeezilla],
    },
    {
      id: "claim-spec-ralph-economics",
      kind: "speculation",
      text: "His headline figures — about US$10 per hour of agentic coding, a $50,000 contract delivered for $297 — are his own field reports; they are plausible given token pricing but are not independently audited.",
      sourceIds: [S.register, S.ralphPost],
    },
    {
      id: "claim-spec-nftbay-genre",
      kind: "speculation",
      text: "Whether The NFT Bay counts as art, activism, or piracy bait was left deliberately ambiguous by the project; he frames it as education in the lineage of Australian satirical protest art, while coverage variously called it performance art or a prank.",
      sourceIds: [S.vice, S.verge],
    },
    {
      id: "claim-spec-birthyear",
      kind: "speculation",
      text: "Writing on July 24, 2026 that he would 'turn 44 next week' implies a birth year around 1982, but no authoritative record of his birthdate appears in the catalog.",
      sourceIds: [S.slopPost],
    },
  ],
  timeline: [
    {
      id: "event-ride-the-lobster",
      kind: "other",
      date: "2008-06",
      title: "Ride the Lobster 800 km unicycle relay",
      summary:
        "In his twenties he rode a unicycle through several countries for fun; his résumé cites Ride the Lobster, the 800-kilometre Nova Scotia relay, among them.",
      location: "Nova Scotia, Canada",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "event-covidsafe-teardown",
      kind: "project",
      date: "2020-04-26",
      title: "Began the COVIDSafe teardown and formed CovidSafeWatch",
      summary:
        "On the app's release day he began dissecting Australia's COVIDSafe contact-tracing app, published decompiled Android source on GitHub, and organized a researcher community around digital contact tracing.",
      location: "Australia",
      sourceIds: [S.covidsafePost, S.everythingOpen],
    },
    {
      id: "event-linuxconf-award",
      kind: "award",
      date: "2020",
      title: "LinuxConf Australia community recognition award",
      summary:
        "The digital-contact-tracing research community he formed received linux.conf.au's 2020 community recognition award.",
      sourceIds: [S.covidsafePost, S.everythingOpen],
    },
    {
      id: "event-gitpod",
      kind: "role",
      date: "2021",
      title: "Early employee at Gitpod; open-source sustainability advocacy",
      summary:
        "Joined Gitpod early — initially as its sole JAPAC site-reliability engineer, later Principal Developer Advocate — and ran its Open-Source Sustainability Fund work.",
      organization: "Gitpod",
      organizationHandle: "gitpod",
      sourceIds: [S.ghuntleyResume, S.aiEngineer],
    },
    {
      id: "event-nftbay",
      kind: "project",
      date: "2021-11-18",
      title: "Launched The NFT Bay",
      summary:
        "Published a Pirate Bay-styled site offering a torrent of the images that Ethereum and Solana NFTs reference; covered by The Verge and Motherboard within days.",
      sourceIds: [S.verge, S.vice, S.nftBayRepo],
    },
    {
      id: "event-congress-letter",
      kind: "other",
      date: "2022-06-01",
      title: "Co-signed the Letter in Support of Responsible Fintech Policy",
      summary:
        "One of 26 technologists urging US congressional leaders to take a critical, skeptical approach to crypto-industry claims.",
      sourceIds: [S.concernedTech, S.ghuntleyResume],
    },
    {
      id: "event-everything-open",
      kind: "media",
      date: "2023-03",
      title: "Presented 'COVIDSafe: Australia's digital contact tracing failure' at Everything Open 2023",
      summary:
        "Conference recap of the COVIDSafe teardown, including the tracking and remote-control flaws his community found.",
      organization: "Everything Open",
      location: "Melbourne (Naarm), Australia",
      organizationHandle: "everything-open",
      sourceIds: [S.everythingOpen],
    },
    {
      id: "event-ohfuck",
      kind: "publication",
      date: "2025-01-14",
      title: "Published 'An \"oh fuck\" moment in time'",
      summary:
        "Essay describing a coding agent that produced a working Haskell audio library while he took his kids to the pool — his first widely read post on AI upending software engineering.",
      sourceIds: [S.ohFuckPost],
    },
    {
      id: "event-dothings",
      kind: "publication",
      date: "2025-02-07",
      title: "Published 'The future belongs to people who can just do things'",
      summary:
        "Essay arguing the era of artisanal hand-crafted commits is ending and urging employers to accelerate their engineers' 'time to oh-fuck' moment.",
      sourceIds: [S.doThingsPost],
    },
    {
      id: "event-webdirections",
      kind: "media",
      date: "2025-06",
      title: "Closing talk on AI at Web Directions, Melbourne",
      summary:
        "Delivered 'the six-month recap' closing keynote; the introduction announced his departure for Sourcegraph.",
      organization: "Web Directions",
      location: "Melbourne, Australia",
      organizationHandle: "web-directions",
      sourceIds: [S.sixMonthRecap],
    },
    {
      id: "event-sourcegraph",
      kind: "role",
      date: "2025-07",
      title: "Joined Sourcegraph to work on Amp",
      summary:
        "Left Canva for Sourcegraph's agentic coding effort; his résumé records the role as Principal Software Engineer at Amp.",
      organization: "Sourcegraph",
      organizationHandle: "sourcegraph",
      sourceIds: [S.sixMonthRecap, S.ghuntleyResume],
    },
    {
      id: "event-ralph-post",
      kind: "publication",
      date: "2025-07-14",
      title: "Published 'Ralph Wiggum as a \"software engineer\"'",
      summary:
        "Documented the Ralph technique — an agent run in a persistent Bash loop — after teaching it to engineers in San Francisco.",
      sourceIds: [S.ralphPost],
    },
    {
      id: "event-cursed",
      kind: "project",
      date: "2025",
      title: "CURSED programming language built by Ralph",
      summary:
        "Ralph produced CURSED, an esoteric language with an LLVM compiler, to prove an agent could build and program a language outside its training data.",
      sourceIds: [S.ralphPost, S.register, S.venturebeat],
    },
    {
      id: "event-antithesis",
      kind: "role",
      date: "2026-07-24",
      title: "Joined Antithesis",
      summary:
        "Announced he was joining the deterministic simulation-testing company to 'engineer away the slop' — verification as the answer to near-free code generation.",
      organization: "Antithesis",
      organizationHandle: "antithesis",
      sourceIds: [S.slopPost],
    },
  ],
  themes: [
    {
      id: "theme-commoditized-authoring",
      kind: "philosophy",
      status: "stated",
      title: "Software authoring is commoditized",
      summary:
        "His central thesis since January 2025: LLM coding agents are a new abstraction layer, the IDE's single-pane 'typewriter' is ending, and engineers who have not had their 'oh fuck' moment will not keep up.",
      sourceIds: [S.ohFuckPost, S.doThingsPost, S.sixMonthRecap],
    },
    {
      id: "theme-verification",
      kind: "method",
      status: "stated",
      title: "Creation is near-free; verification is not",
      summary:
        "The 2026 frame for his Antithesis move: with generation commoditized, formal verification, deterministic system testing, and adversarial LLM code review become the load-bearing disciplines — 'engineer away the slop.'",
      sourceIds: [S.slopPost, S.aiEngineer],
    },
    {
      id: "theme-ralph-loop",
      kind: "method",
      status: "stated",
      title: "The loop is the hero, not the model",
      summary:
        "Ralph doctrine: one task per iteration, lean context windows, subagents for allocation-heavy work, specifications written before code, and prompt tuning instead of tool-blaming.",
      sourceIds: [S.ralphPost, S.register, S.venturebeat],
    },
    {
      id: "theme-oss-sustainability",
      kind: "belief",
      status: "stated",
      title: "Open source is labor, and labor has rates",
      summary:
        "Free software is not free; he wants companies to identify and fund the maintainers inside their dependency trees, and points to his own GitHub Sponsors-funded property settlement as proof of concept.",
      sourceIds: [S.ghuntleyResume, S.aiEngineer],
    },
    {
      id: "theme-web3-skepticism",
      kind: "belief",
      status: "stated",
      title: "Skepticism of crypto and Web3 claims",
      summary:
        "NFTs as hyperlinks to web-hosted images, blockchain pitches as exit-liquidity funnels, and crypto as a flawed instrument unfit for the public interest — argued through The NFT Bay, interviews, and the congressional letter.",
      sourceIds: [S.vice, S.smh, S.concernedTech, S.nftBayRepo],
    },
    {
      id: "theme-public-interest-tech",
      kind: "practice",
      status: "reported",
      title: "Engineering scrutiny as public-interest work",
      summary:
        "He treats technical investigation as civic participation: teardown the government app, parody the bubble, brief the lawmakers, then hand lay audiences the tools to check the claims.",
      sourceIds: [S.covidsafePost, S.verge, S.concernedTech, S.everythingOpen],
    },
    {
      id: "theme-ai-skill",
      kind: "belief",
      status: "stated",
      title: "AI outcomes mirror operator skill",
      summary:
        "LLMs reward deliberate intentional practice; engineers who get poor results have usually not invested in learning the instrument. He urges companies to shorten every employee's 'time to oh-fuck' moment.",
      sourceIds: [S.ralphPost, S.doThingsPost, S.sixMonthRecap],
    },
    {
      id: "theme-teaching",
      kind: "practice",
      status: "stated",
      title: "Teaching as the durable work",
      summary:
        "Workshops, conference talks, guest lectures, and now Latent Patterns — his current focus — all aim at moving developers from AI consumers to AI producers who understand fundamentals.",
      sourceIds: [S.ghuntleyResume, S.ghuntleyBio, S.aiEngineer],
    },
    {
      id: "theme-satire-lineage",
      kind: "influence",
      status: "stated",
      title: "Satirical protest art as a method",
      summary:
        "He cites 1990s Australian LGBTQ protest art — musician/activist Pauline Pantsdown in particular — as the influence behind The NFT Bay: art that changed the course of politics by making a technical absurdity visible.",
      sourceIds: [S.vice],
    },
  ],
  works: [
    {
      id: "work-reactiveui",
      kind: "project",
      status: "completed",
      title: "ReactiveUI lead maintenance",
      summary:
        "Six years as lead and core maintainer of the .NET MVVM framework: build automation, documentation infrastructure, community growth, and adoption into the .NET Foundation.",
      sourceIds: [S.ghuntleyResume, S.xamarinShow],
    },
    {
      id: "work-weeklyxamarin",
      kind: "project",
      status: "completed",
      title: "WeeklyXamarin",
      summary:
        "Co-founded the community publication for Xamarin/.NET mobile developers.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "work-covidsafe-watch",
      kind: "project",
      status: "completed",
      title: "COVIDSafe teardown and CovidSafeWatch",
      date: "2020",
      location: "Australia",
      summary:
        "Decompiled the national contact-tracing app on release day, published the source, and coordinated the researcher community whose work won a LinuxConf Australia award.",
      sourceIds: [S.covidsafePost, S.everythingOpen],
    },
    {
      id: "work-nftbay",
      kind: "project",
      status: "released",
      title: "The NFT Bay",
      date: "2021-11-18",
      summary:
        "Pirate Bay replica offering a ~15–20TB torrent of NFT-referenced images; an 'educational art project' about what NFT buyers actually own.",
      sourceIds: [S.verge, S.vice, S.nftBayRepo],
    },
    {
      id: "work-congress-letter",
      kind: "other",
      status: "published",
      title: "Letter in Support of Responsible Fintech Policy",
      date: "2022-06-01",
      summary:
        "Open letter from 26 technologists to US congressional leadership urging skeptical crypto legislation.",
      sourceIds: [S.concernedTech, S.ghuntleyResume],
    },
    {
      id: "work-ohfuck-post",
      kind: "other",
      status: "published",
      title: "An \"oh fuck\" moment in time",
      date: "2025-01-14",
      summary:
        "The essay that reframed his public work: an agent-built Haskell audio library, and the split between engineers who have had the moment and those who have not.",
      sourceIds: [S.ohFuckPost],
    },
    {
      id: "work-dothings-post",
      kind: "other",
      status: "published",
      title: "The future belongs to people who can just do things",
      date: "2025-02-07",
      summary:
        "Follow-up essay predicting the end of artisanal hand-crafted commits by end of 2026 and prescribing employer-led AI upskilling.",
      sourceIds: [S.doThingsPost],
    },
    {
      id: "work-ralph-technique",
      kind: "design",
      status: "released",
      title: "The Ralph Wiggum loop",
      date: "2025-07-14",
      summary:
        "A brute-force agentic technique — a Bash loop feeding PROMPT.md back into a coding agent — that spread to Claude Code as an official plugin and into industry vocabulary.",
      sourceIds: [S.ralphPost, S.venturebeat, S.register],
    },
    {
      id: "work-cursed",
      kind: "project",
      status: "released",
      title: "CURSED programming language",
      date: "2025",
      summary:
        "An esoteric language with an LLVM compiler written largely by Ralph, built to show agents can construct languages absent from their training data.",
      sourceIds: [S.ralphPost, S.register, S.venturebeat],
    },
    {
      id: "work-latent-patterns",
      kind: "product",
      status: "in_progress",
      title: "Latent Patterns",
      summary:
        "His current focus: an educational platform teaching AI fundamentals — transformers, attention, embeddings, agents — from first principles.",
      sourceIds: [S.ghuntleyBio],
    },
    {
      id: "work-workshops",
      kind: "other",
      status: "published",
      title: "MIT-licensed workshops",
      summary:
        "'How to build a coding agent,' a Nix/NixOS workshop, and an Uno Platform introduction, released for community reuse.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "work-waveofdestruction",
      kind: "project",
      status: "completed",
      title: "WaveOfDestruction.org",
      summary:
        "Early citizen-journalism site he founded that hosted Indian Ocean tsunami footage — his first brush with tech as public infrastructure.",
      sourceIds: [S.ghuntleyResume],
    },
  ],
  appearances: [
    {
      id: "appearance-xamarin-show",
      title: "Lifting App State with Geoffrey Huntley",
      venue: "The Xamarin Show (Microsoft Learn)",
      participants: ["Geoffrey Huntley", "James Montemagno"],
      participantHandles: [
        { name: "Geoffrey Huntley", handle: "geoffrey-huntley" },
        { name: "James Montemagno", handle: "james-montemagno" },
      ],
      summary:
        "Microsoft's channel bills him as Microsoft MVP while he teaches Reactive Extensions and converting MVVM code to ReactiveUI.",
      media: [
        {
          type: "video",
          url: "https://learn.microsoft.com/en-us/shows/xamarinshow/lifting-app-state-with-geoffrey-huntley",
          sourceId: S.xamarinShow,
        },
      ],
      sourceIds: [S.xamarinShow],
    },
    {
      id: "appearance-coffeezilla",
      title: "Right Clicking All The NFTs",
      venue: "Coffeezilla (YouTube)",
      publishedAt: "2021-11",
      participants: ["Geoffrey Huntley", "Stephen Findeisen"],
      participantHandles: [
        { name: "Geoffrey Huntley", handle: "geoffrey-huntley" },
        { name: "Stephen Findeisen", handle: "stephen-findeisen" },
      ],
      summary:
        "Coffeezilla's segment on The NFT Bay — the video his site says passed 1.4 million views.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=i_VsgT5gfMc",
          sourceId: S.coffeezilla,
        },
      ],
      sourceIds: [S.coffeezilla, S.ghuntleyResume],
    },
    {
      id: "appearance-vice",
      title: "Someone Made a Pirate Bay for NFTs",
      venue: "VICE Motherboard",
      publishedAt: "2021-11-18",
      participants: ["Geoffrey Huntley", "Matthew Gault"],
      participantHandles: [
        { name: "Geoffrey Huntley", handle: "geoffrey-huntley" },
        { name: "Matthew Gault", handle: "matthew-gault" },
      ],
      summary:
        "Launch-day Q&A on The NFT Bay's intent, the hyperlink-not-asset argument, and the Pauline Pantsdown influence.",
      media: [
        {
          type: "article",
          url: "https://www.vice.com/en/article/someone-made-a-pirate-bay-for-nfts/",
          sourceId: S.vice,
        },
      ],
      sourceIds: [S.vice],
    },
    {
      id: "appearance-smh",
      title: "'Extortion': Why Web3 is making a lot of software developers angry",
      venue: "The Sydney Morning Herald",
      publishedAt: "2022-05-16",
      participants: ["Geoffrey Huntley", "Dominic Powell"],
      participantHandles: [
        { name: "Geoffrey Huntley", handle: "geoffrey-huntley" },
        { name: "Dominic Powell", handle: "dominic-powell" },
      ],
      summary:
        "Q&A for the 'You, Me and Web3' series on why engineers pushed back against the Web3 pitch.",
      media: [
        {
          type: "article",
          url: "https://www.smh.com.au/business/companies/extortion-why-web3-is-pissing-off-a-lot-of-software-developers-20220516-p5alqd.html",
          sourceId: S.smh,
        },
      ],
      sourceIds: [S.smh],
    },
    {
      id: "appearance-everything-open",
      title: "COVIDSafe: Australia's digital contact tracing failure",
      venue: "Everything Open 2023",
      publishedAt: "2023-03",
      participants: ["Geoffrey Huntley"],
      participantHandles: [
        { name: "Geoffrey Huntley", handle: "geoffrey-huntley" },
      ],
      summary:
        "Conference talk reconstructing the COVIDSafe teardown — the Bluetooth misuse, permanent-tracking flaw, and remote-control exposure his community documented.",
      sourceIds: [S.everythingOpen],
    },
    {
      id: "appearance-webdirections",
      title: "the six-month recap — closing talk on AI",
      venue: "Web Directions, Melbourne",
      publishedAt: "2025-06",
      participants: ["Geoffrey Huntley"],
      participantHandles: [
        { name: "Geoffrey Huntley", handle: "geoffrey-huntley" },
      ],
      summary:
        "Closing keynote tracing six months of AI-assisted development writing and arguing the profession is mid-transition; he published the full transcript.",
      media: [
        {
          type: "article",
          url: "https://ghuntley.com/six-month-recap/",
          sourceId: S.sixMonthRecap,
        },
      ],
      sourceIds: [S.sixMonthRecap],
    },
    {
      id: "appearance-loops-debate",
      title: "The Great Loops Debate",
      venue: "AI Engineer World's Fair 2026",
      publishedAt: "2026",
      participants: [
        "Geoffrey Huntley",
        "Dex Horthy",
        "Ian Livingstone",
        "Greg Pstrucha",
        "Allie Howe",
      ],
      participantHandles: [
        { name: "Geoffrey Huntley", handle: "geoffrey-huntley" },
        { name: "Dex Horthy", handle: "dex-horthy" },
        { name: "Ian Livingstone", handle: "ian-livingstone" },
        { name: "Greg Pstrucha", handle: "greg-pstrucha" },
        { name: "Allie Howe", handle: "allie-howe" },
      ],
      summary:
        "Oxford-style debate on coding-agent loops; he defended loops as an engineering primitive while conceding verification and permission boundaries remain unsolved.",
      sourceIds: [S.aiEngineer],
    },
  ],
  relations: [
    {
      id: "rel-unisys",
      kind: "employed_by",
      target: "unisys",
      targetName: "Unisys",
      targetKind: "organization",
      note: "Started his career as a Unisys mainframe operator, per his résumé's career narrative.",
      targetWikidataId: "Q518016",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-readify",
      kind: "employed_by",
      target: "readify",
      targetName: "Readify",
      targetKind: "organization",
      note: "Lead consultant at the Australian software consultancy, per his résumé.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-noon",
      kind: "employed_by",
      target: "noon",
      targetName: "Noon",
      targetKind: "organization",
      note: "Lead consultant at Noon, per his résumé.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-telstra",
      kind: "employed_by",
      target: "telstra",
      targetName: "Telstra",
      targetKind: "organization",
      note: "Built mobile applications at Telstra, including the 24x7 app.",
      targetWikidataId: "Q721162",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-south32",
      kind: "employed_by",
      target: "south32",
      targetName: "South32",
      targetKind: "organization",
      note: "Built the ROAM mobile application at South32.",
      targetWikidataId: "Q20648697",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-ansarada",
      kind: "employed_by",
      target: "ansarada",
      targetName: "Ansarada",
      targetKind: "organization",
      note: "Built the AiDA mobile application at Ansarada.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-interactive",
      kind: "employed_by",
      target: "interactive",
      targetName: "Interactive",
      targetKind: "organization",
      note: "Built mobile applications at Interactive, across Xamarin/React Native and native approaches.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-optiver",
      kind: "employed_by",
      target: "optiver",
      targetName: "Optiver",
      targetKind: "organization",
      note: "Conference bios describe him as a former technology lead at the proprietary trading firm.",
      targetWikidataId: "Q1645300",
      sourceIds: [S.ghuntleyBio, S.aiEngineer],
    },
    {
      id: "rel-gitpod",
      kind: "employed_by",
      target: "gitpod",
      targetName: "Gitpod",
      targetKind: "organization",
      note: "Early employee — initially sole site-reliability engineer for JAPAC, later Principal Developer Advocate; ran its open-source sustainability funding work.",
      start: "2021",
      targetWikidataId: "Q131604675",
      sourceIds: [S.ghuntleyResume, S.aiEngineer],
    },
    {
      id: "rel-coder",
      kind: "employed_by",
      target: "coder",
      targetName: "Coder",
      targetKind: "organization",
      note: "Principal Developer Advocate; wrote the Terraform templates for the cloud providers.",
      sourceIds: [S.ghuntleyResume, S.aiEngineer],
    },
    {
      id: "rel-uno-platform",
      kind: "employed_by",
      target: "uno-platform",
      targetName: "Uno Platform",
      targetKind: "organization",
      note: "Principal Developer Advocate at the cross-platform .NET framework company.",
      targetWikidataId: "Q60774063",
      sourceIds: [S.ghuntleyResume, S.aiEngineer],
    },
    {
      id: "rel-canva",
      kind: "employed_by",
      target: "canva",
      targetName: "Canva",
      targetKind: "organization",
      note: "Technology lead; the 2024 Christmas-break AI assignment for principal engineers there produced his 'oh fuck' moment.",
      targetWikidataId: "Q23498528",
      sourceIds: [S.ghuntleyResume, S.sixMonthRecap, S.ohFuckPost],
    },
    {
      id: "rel-sourcegraph",
      kind: "employed_by",
      target: "sourcegraph",
      targetName: "Sourcegraph",
      targetKind: "organization",
      note: "Joined mid-2025 in San Francisco as Principal Software Engineer on Amp, the agentic coding product.",
      start: "2025-07",
      end: "2026-07",
      targetWikidataId: "Q108106907",
      sourceIds: [S.sixMonthRecap, S.ghuntleyResume],
    },
    {
      id: "rel-antithesis",
      kind: "employed_by",
      target: "antithesis",
      targetName: "Antithesis",
      targetKind: "organization",
      note: "Announced in July 2026 that he was joining the deterministic simulation-testing company to 'engineer away the slop.'",
      start: "2026-07",
      sourceIds: [S.slopPost],
    },
    {
      id: "rel-weeklyxamarin",
      kind: "founded",
      target: "weeklyxamarin",
      targetName: "WeeklyXamarin",
      targetKind: "organization",
      note: "Co-founded the community publication for Xamarin and .NET mobile developers.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-waveofdestruction",
      kind: "founded",
      target: "waveofdestruction",
      targetName: "WaveOfDestruction.org",
      note: "Founded the early citizen-journalism site that hosted Indian Ocean tsunami footage.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-covidsafewatch",
      kind: "founded",
      target: "covidsafewatch",
      targetName: "CovidSafeWatch",
      targetKind: "organization",
      note: "Formed the researcher community around Australia's COVIDSafe contact-tracing app; its work earned the LinuxConf Australia 2020 community recognition award.",
      sourceIds: [S.covidsafePost, S.everythingOpen],
    },
    {
      id: "rel-latent-patterns",
      kind: "founded",
      target: "latent-patterns",
      targetName: "Latent Patterns",
      targetKind: "organization",
      note: "His stated primary focus — an educational platform teaching AI fundamentals from first principles.",
      sourceIds: [S.ghuntleyBio],
    },
    {
      id: "rel-reactiveui",
      kind: "member_of",
      target: "reactiveui",
      targetName: "ReactiveUI",
      note: "Lead and core maintainer of the .NET MVVM framework for six years — build automation, documentation, and shepherding it into the .NET Foundation.",
      sourceIds: [S.ghuntleyResume, S.xamarinShow],
    },
    {
      id: "rel-govhack",
      kind: "member_of",
      target: "govhack",
      targetName: "GovHack",
      targetKind: "organization",
      note: "State manager of the Australian civic hackathon, per his résumé.",
      targetWikidataId: "Q18207482",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-sydney-gamers-league",
      kind: "member_of",
      target: "sydney-gamers-league",
      targetName: "Sydney Gamers League",
      targetKind: "organization",
      note: "Organiser of the league, per his résumé.",
      sourceIds: [S.ghuntleyResume],
    },
    {
      id: "rel-meaa",
      kind: "member_of",
      target: "media-entertainment-arts-alliance",
      targetName: "Media, Entertainment & Arts Alliance",
      targetKind: "organization",
      note: "He says he is an MEAA member who follows the IFJ Global Charter of Ethics for Journalists.",
      targetWikidataId: "Q6805365",
      sourceIds: [S.ghuntleyResume, S.smh, S.coffeezilla],
    },
    {
      id: "rel-boris-cherny",
      kind: "influenced",
      target: "boris-cherny",
      targetName: "Boris Cherny",
      note: "The Claude Code creator has said he uses Huntley's Ralph technique, shipped by Anthropic as an official ralph-wiggum plugin.",
      targetWikidataId: "Q130788845",
      sourceIds: [S.venturebeat, S.register],
    },
    {
      id: "rel-anthropic",
      kind: "influenced",
      target: "anthropic",
      targetName: "Anthropic",
      targetKind: "organization",
      note: "Anthropic shipped an official 'ralph-wiggum' plugin for Claude Code built on his technique.",
      targetWikidataId: "Q116758847",
      sourceIds: [S.venturebeat, S.register],
    },
    {
      id: "rel-pauline-pantsdown",
      kind: "influenced_by",
      target: "pauline-pantsdown",
      targetName: "Pauline Pantsdown",
      note: "He cites the 1990s Australian musician/activist's protest art as the influence behind The NFT Bay.",
      targetWikidataId: "Q7155071",
      sourceIds: [S.vice],
    },
    {
      id: "rel-james-montemagno",
      kind: "interviewed_by",
      target: "james-montemagno",
      targetName: "James Montemagno",
      note: "The Xamarin Show episode 'Lifting App State with Geoffrey Huntley' on Microsoft Learn.",
      sourceIds: [S.xamarinShow],
    },
    {
      id: "rel-stephen-findeisen",
      kind: "interviewed_by",
      target: "stephen-findeisen",
      targetName: "Stephen Findeisen",
      note: "Coffeezilla's 'Right Clicking All The NFTs' segment on The NFT Bay, November 2021.",
      targetWikidataId: "Q115644712",
      sourceIds: [S.coffeezilla],
    },
    {
      id: "rel-matthew-gault",
      kind: "interviewed_by",
      target: "matthew-gault",
      targetName: "Matthew Gault",
      note: "VICE Motherboard's launch-day Q&A 'Someone Made a Pirate Bay for NFTs,' November 2021.",
      sourceIds: [S.vice],
    },
    {
      id: "rel-dominic-powell",
      kind: "interviewed_by",
      target: "dominic-powell",
      targetName: "Dominic Powell",
      note: "Sydney Morning Herald Q&A for the 'You, Me and Web3' series, May 2022.",
      sourceIds: [S.smh],
    },
  ],
  openQuestions: [
    "His résumé says six years as ReactiveUI's lead and core maintainer, but the public record does not pin exact start and end dates to that tenure.",
    "No authoritative birthdate is published; a July 2026 post saying he was about to turn 44 implies roughly 1982, self-reported.",
    "His LinkedIn profile bills the Antithesis role as 'Field CTO' and an earlier Optiver stint as 'AI Research'; his own announcement only says he joined the company, and employer announcements are not in the catalog.",
    "The NFT Bay torrent size varies by report — about 15TB (Motherboard) versus just under 20TB (The Verge) — and the live site no longer serves the original description page consistently.",
    "The eye-catching economics he reports for Ralph — ~$10 per hour of agent compute, a $50,000 contract delivered for $297 — are his own field reports, not audited benchmarks.",
    "Wikidata lists his residence as Nanango, Queensland, while his GitHub profile says Kangaroo Island and his bio says only 'a goat farm in regional Australia.'",
  ],
  body: `Geoffrey Huntley is an Australian software engineer who has spent two decades doing the same job under different costumes: standing between a hyped technology and the public's understanding of it. In the .NET era that meant open-source maintenance and conference talks; in 2020 it meant decompiling a national contact-tracing app; in 2021 it meant a fake piracy site for NFTs; since 2025 it has meant teaching the industry to run coding agents in loops — the "Ralph Wiggum" technique that VentureBeat, in January 2026, called "the biggest name in AI right now."

## Open source and the ReactiveUI era

Huntley came up through Australian consulting — Readify, Noon, state manager of GovHack, organiser of the Sydney Gamers League — and through an unusually deep tour of systems work: he has administered Slackware, FreeBSD, Solaris, AIX, OpenVMS, HP-UX, and more, and started his career as a Unisys mainframe operator. He built mobile apps at Telstra, South32, Ansarada, and Interactive, mostly in Xamarin, which made him a Microsoft MVP (Microsoft's own Xamarin Show bills him that way).

For six years he was the lead and core maintainer of ReactiveUI, the functional-reactive MVVM framework for .NET. Kent Boogaart's testimonial on his résumé credits him with the unglamorous parts: automating the build, formalising documentation, shepherding the project into the .NET Foundation, and growing the community. He co-founded WeeklyXamarin and later moved into developer-tools companies — early employee and sole JAPAC site-reliability engineer at Gitpod, Principal Developer Advocate there and at Coder and Uno Platform. At Gitpod he pushed the argument he still makes: free software is not free, maintainer hours have rates, and companies should fund the maintainers inside their dependency trees. He says he raised $32,600 for maintainers and that GitHub Sponsors paid the settlement on his property.

## Public-interest teardowns: COVIDSafe, NFT Bay, Congress

In April 2020, on release day, he dissected Australia's COVIDSafe contact-tracing app, published the decompiled Android source on GitHub, and formed the CovidSafeWatch research community — work that earned a LinuxConf Australia community recognition award and a 2023 Everything Open talk reconstructing how the government's app misused Bluetooth, kept tracking people after uninstall, and briefly enabled remote control of phones.

In November 2021 he launched The NFT Bay — a pixel-for-pixel Pirate Bay parody serving a torrent (roughly 15–20TB depending on the report) of the images that Ethereum and Solana NFTs point to. His point, repeated to Motherboard and Coffeezilla and covered by The Verge and others: an NFT is a hyperlink, not the asset, and the images mostly sit on ordinary web hosts headed for 404s. He framed it as an educational art project in the lineage of Pauline Pantsdown's protest art; in June 2022 he was one of 26 technologists on the "Letter in Support of Responsible Fintech Policy" urging Congress to legislate crypto skeptically.

## The AI pivot: oh-fuck to Ralph

Working as a technology lead at Canva, he was among the principal engineers told to go deep on AI over the 2024 Christmas break. His experiment — instructing an agent to port a Rust audio library to Haskell with tests — returned a working library while he took his kids to the pool. The resulting essays, "An 'oh fuck' moment in time" (January 2025) and "The future belongs to people who can just do things" (February 2025), laid out his thesis: hand-crafted commits are ending, organizations split between those who have had the moment and those who have not, and the IDE — "essentially a typewriter" unchanged since 1983 — is the wrong surface for agents.

In July 2025, newly at Sourcegraph working on Amp, he published "Ralph Wiggum as a 'software engineer'": run the agent in a Bash loop, one task per iteration, keep the context window lean, tune the prompt when it fails. The doctrine is deliberately unglamorous — he compares the technique to a monolith against the industry's multi-agent microservice dreams, and insists that outcomes track operator skill, so deliberate practice beats prompt collecting. Ralph built CURSED, an esoteric language absent from any training set, and by early 2026 Anthropic had shipped an official ralph-wiggum Claude Code plugin and YC batches were "Ralphing" overnight. The Register's January 2026 feature captured his ambivalence — the economics (~$10/hour for agentic development) leave him "sick with worry" about what it does to the profession — and his AI Engineer World's Fair "Great Loops Debate" appearance shows him defending the loop while conceding verification and permission boundaries remain unsolved.

## Where it points now

His 2026 answer to his own disruption is verification: in July 2026 he announced he was joining Antithesis, the deterministic simulation-testing company, arguing creation is near-free while understanding is not — "engineer away the slop." He lives on a goat farm in regional Australia, DJs, rides unicycles (including Nova Scotia's 800 km Ride the Lobster), and builds Latent Patterns, an education platform teaching AI fundamentals to the developers he keeps warning. Teaching is the through-line: MIT-licensed workshops on building a coding agent, NixOS, and Uno Platform; conference talks; guest lectures; and a steady insistence that engineers move from consumers of AI to producers of it.

## What the record does not settle

The catalog is deliberately self-heavy: his career chronology comes from his own résumé, the ReactiveUI tenure has no public dates, his Antithesis title ("Field CTO") appears only in self-edited profiles, and the Ralph economics are field reports rather than audits. The NFT Bay's torrent size differs across coverage. These seams are preserved rather than smoothed.

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
