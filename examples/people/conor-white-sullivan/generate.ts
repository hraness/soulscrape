#!/usr/bin/env bun
/** Generate examples/people/conor-white-sullivan/person-index.json with derived source ids. */

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

const roam = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Roam Research — A note taking tool for networked thought",
  url: "https://roamresearch.com/",
  publisher: "Roam Research",
  notes: "The company's own site and tagline; subject-controlled.",
});
const whitepaper = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Roam Research white paper — A note taking tool for networked thought",
  url: "https://roamresearch.com/#/app/help/page/Vu1MmjinS",
  publisher: "Roam Research",
  publishedAt: "2020",
  authors: ["Conor White-Sullivan", "Richard Meadows"],
  notes:
    "The founding document, hosted as a public page inside Roam's help graph; renders client-side.",
});
const conaw = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Conor (@Conaw) on X",
  url: "https://x.com/Conaw",
  publisher: "X",
  notes:
    "The subject's long-running public account since 2008; bio reads 'Co-founder of @RoamResearch' with location New Hampshire.",
});
const threadWilderness = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "@Conaw thread — sold first company to AOL at 23; five years in the wilderness; meeting Josh at 42",
  url: "https://threadreaderapp.com/thread/1353178434990600193.html",
  publisher: "Thread Reader App",
  publishedAt: "2021-01-24",
  authors: ["Conor White-Sullivan"],
  notes:
    "Unrolled archive of his January 2021 thread; the same page carries the Product Hunt nomination rally and the Roam Compound posts.",
});
const threadCompound = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "@Conaw thread — 'We call it a compound for a reason' (technical ashram, Roammania, profitability, #RoamGames)",
  url: "https://threadreaderapp.com/thread/1357115036523581440.html",
  publisher: "Thread Reader App",
  publishedAt: "2021-02-03",
  authors: ["Conor White-Sullivan"],
  notes:
    "Unrolled archive; adjacent unrolls on the page document 'hit profitability last year' and the $10,000 #RoamGames challenges.",
});
const threadHiring = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "@Conaw thread — Roam hiring: the 7GUIs benchmark, paid take-homes, and no salary negotiation",
  url: "https://threadreaderapp.com/thread/1333174002550927360.html",
  publisher: "Thread Reader App",
  publishedAt: "2020-11-29",
  authors: ["Conor White-Sullivan"],
});
const nessInterview = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Getting compound interest on your thoughts with Conor White-Sullivan",
  url: "https://nesslabs.com/conor-white-sullivan-interview",
  publisher: "Ness Labs",
  publishedAt: "2020",
  authors: ["Anne-Laure Le Cunff"],
  notes: "Mindful Makers interview covering the Localocracy-to-Roam arc.",
});
const nessTranscript = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Interview with Conor White-Sullivan of Roam Research: full transcript",
  url: "https://nesslabs.com/conor-white-sullivan-transcript",
  publisher: "Ness Labs",
  publishedAt: "2020",
  authors: ["Anne-Laure Le Cunff", "Conor White-Sullivan"],
  transcriptOf: nessInterview.id,
});
const forteInterview = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview with Conor White-Sullivan, Founder of Roam",
  url: "https://fortelabs.com/blog/interview-with-conor-white-sullivan-founder-of-roam/",
  publisher: "Forte Labs",
  publishedAt: "2019-12-17",
  authors: ["Tiago Forte"],
  notes:
    "One-hour interview, demonstration, and debate; his first public discussion of Roam.",
});
const twentyVC = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "20VC: How Roam Research Analyse Product Design, Team-Building, The Future of Collaboration Tools & Applying Tesla Go-To-Market To Roam",
  url: "https://www.thetwentyminutevc.com/conorwhitesullivan",
  publisher: "The Twenty Minute VC",
  publishedAt: "2020-05-07",
  authors: ["Harry Stebbings"],
});
const metamuse = source({
  binding: "interview",
  mediaType: "audio",
  title: "Collective intelligence with Conor White-Sullivan — Metamuse episode 75",
  url: "https://allume.com/podcast/75-collective-intelligence/",
  publisher: "Metamuse",
  publishedAt: "2023-03-02",
  authors: ["Adam Wiggins", "Mark McGranaghan"],
  notes:
    "Originally published under museapp.com; the show now lives on the Allume site with a full transcript.",
});
const sec = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "SEC Form C/A — Roam Research, Inc. (CIK 0001824172, File No. 020-27920)",
  url: "https://www.sec.gov/Archives/edgar/data/1824172/000167025421000599/0001670254-21-000599-index.htm",
  publisher: "U.S. Securities and Exchange Commission",
  publishedAt: "2021-04-30",
  notes:
    "Regulation Crowdfunding offering-statement index on EDGAR for the April 2021 community round.",
});
const tcLocalocracy = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Huffington Post Hits 37 Million Monthly Visitors, 1 Billion Pageviews; Acquires Localocracy",
  url: "https://techcrunch.com/2011/10/03/huffington-post-hits-37-million-monthly-visitors-1-billion-pageviews-acquires-localocracy/",
  publisher: "TechCrunch",
  publishedAt: "2011-10-03",
});
const theInformation = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "A $200 Million Seed Valuation for Roam Shows Investor Frenzy for Note-Taking Apps",
  url: "https://www.theinformation.com/articles/a-200-million-seed-valuation-for-roam-shows-investor-frenzy-for-note-taking-apps",
  publisher: "The Information",
  publishedAt: "2020-09-11",
  authors: ["Kate Clark"],
});
const businessInsider = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Note-taking app Roam invited its most loyal users to join a $500,000 crowdfunding campaign. It took a day to raise $1.6 million.",
  url: "https://www.businessinsider.com/roam-research-crowdfunding-campaign-oversubscribed-2021-4",
  publisher: "Business Insider",
  publishedAt: "2021-04-27",
  authors: ["Melia Robinson"],
});
const builtinCult = source({
  binding: "reporting",
  mediaType: "article",
  title: "Roam Is a Note-Taking Tool, and a Dream of a Better Self",
  url: "https://www.builtinsf.com/articles/roam-note-taking-app-personal-wiki",
  publisher: "Built In",
  publishedAt: "2020-09-30",
  authors: ["Hal Koss"],
  notes: "The definitive early feature on the #RoamCult community.",
});
const goodbetterbest = source({
  binding: "reporting",
  mediaType: "article",
  title: "Roam Research and the Art of Cult Packaging",
  url: "https://goodbetterbest.substack.com/p/roam-research-the-cult-packaging",
  publisher: "Good Better Best",
  publishedAt: "2020-06-21",
  authors: ["Rob Litterst"],
  notes:
    "Contemporaneous analysis of the June 2020 pricing launch and the Believer plan.",
});
const fallOfRoam = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Fall of Roam",
  url: "https://every.to/superorganizers/the-fall-of-roam",
  publisher: "Every (Superorganizers)",
  publishedAt: "2022-02-11",
  authors: ["Dan Shipper"],
});
const bookClub = source({
  binding: "reporting",
  mediaType: "article",
  title: "A book club like no other",
  url: "https://world.hey.com/ashchedrin/a-book-club-like-no-other-bf65985f",
  publisher: "HEY World",
  publishedAt: "2021-04-06",
  authors: ["Alex Shchedrin"],
  notes: "A participant's account of Roam Book Club RBC1–RBC4.",
});
const wikipediaRoam = source({
  binding: "reference",
  mediaType: "article",
  title: "Roam (software)",
  url: "https://en.wikipedia.org/wiki/Roam_(software)",
  publisher: "Wikipedia",
  notes:
    "Covers the product, not the subject personally; no Wikipedia or Wikidata entry for White-Sullivan exists as of this index.",
});

const S = {
  roam: roam.id,
  whitepaper: whitepaper.id,
  conaw: conaw.id,
  threadWilderness: threadWilderness.id,
  threadCompound: threadCompound.id,
  threadHiring: threadHiring.id,
  nessInterview: nessInterview.id,
  nessTranscript: nessTranscript.id,
  forteInterview: forteInterview.id,
  twentyVC: twentyVC.id,
  metamuse: metamuse.id,
  sec: sec.id,
  tcLocalocracy: tcLocalocracy.id,
  theInformation: theInformation.id,
  businessInsider: businessInsider.id,
  builtinCult: builtinCult.id,
  goodbetterbest: goodbetterbest.id,
  fallOfRoam: fallOfRoam.id,
  bookClub: bookClub.id,
  wikipediaRoam: wikipediaRoam.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-conor-white-sullivan",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "conor-white-sullivan",
    displayName: "Conor White-Sullivan",
    alsoKnownAs: ["Conaw"],
    summary:
      "American founder and software designer, co-founder and CEO of Roam Research — the 'note-taking tool for networked thought' — whose career runs from the civic-tech startup Localocracy (sold to AOL's Huffington Post Media Group at 23) through HuffPost Labs to a decade-long pursuit of collective intelligence.",
    identity: {
      officialSite: "https://roamresearch.com/",
      profiles: [
        "https://x.com/Conaw",
        "https://www.linkedin.com/in/cwhitesullivan",
        "https://github.com/Conaws",
        "https://www.huffpost.com/author/conor-whitesullivan",
        "https://www.forbes.com/profile/conor-white-sullivan/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "community", "media"],
  },
  sources: [
    roam,
    whitepaper,
    conaw,
    threadWilderness,
    threadCompound,
    threadHiring,
    nessInterview,
    nessTranscript,
    forteInterview,
    twentyVC,
    metamuse,
    sec,
    tcLocalocracy,
    theInformation,
    businessInsider,
    builtinCult,
    goodbetterbest,
    fallOfRoam,
    bookClub,
    wikipediaRoam,
  ],
  claims: [
    {
      id: "claim-localocracy-founded",
      kind: "fact",
      text: "White-Sullivan founded Localocracy — an 'online town common' where registered voters using real names weighed in on local issues — while a student at UMass Amherst, with co-founder Aaron Soules and tech lead Jay Boice.",
      sourceIds: [S.tcLocalocracy, S.nessInterview, S.metamuse],
    },
    {
      id: "claim-aol-exit",
      kind: "fact",
      text: "In October 2011 the Huffington Post Media Group — by then owned by AOL — acquired Localocracy for reportedly under $1 million, and White-Sullivan, Soules, and Boice joined HuffPost's community-technology efforts.",
      sourceIds: [S.tcLocalocracy],
    },
    {
      id: "claim-age-23-exit",
      kind: "fact",
      text: "He was about 23 at the sale — 'I sold my first company to Aol at 23,' he wrote in 2021 — and says he 'felt like a fraud' because the team sold after failing to find a way to make it work.",
      sourceIds: [S.threadWilderness],
    },
    {
      id: "claim-huffpost-labs",
      kind: "fact",
      text: "Inside HuffPost he co-founded HuffPost Labs, an internal product skunkworks, and reported directly to Arianna Huffington and the company's CTO.",
      sourceIds: [S.twentyVC],
    },
    {
      id: "claim-umass-anthropology",
      kind: "fact",
      text: "He studied anthropology at the University of Massachusetts and taught classes on stoicism and practical philosophy.",
      sourceIds: [S.nessInterview],
    },
    {
      id: "claim-wilderness-years",
      kind: "fact",
      text: "After leaving HuffPost he spent what he calls '5 years in the wilderness' building the first version of Roam while broke — living in a van, then moving to India, then living at the free coding school 42 — while people he respected told him to get a job.",
      sourceIds: [S.threadWilderness, S.forteInterview],
    },
    {
      id: "claim-met-josh-at-42",
      kind: "fact",
      text: "He met his Roam co-founder Josh Brown at 42: 'the thing that turns a lone nut into a movement is the first person to join them — and after years of searching 42 was where I found Josh.'",
      sourceIds: [S.threadWilderness],
    },
    {
      id: "claim-meadows-backer",
      kind: "fact",
      text: "Richard Meadows was an early backer during the wilderness years — the prototype 'convinced Meadows to invest' — and is credited alongside White-Sullivan on the Roam white paper.",
      sourceIds: [S.threadWilderness, S.whitepaper],
    },
    {
      id: "claim-adhd-prosthetic",
      kind: "fact",
      text: "He describes severe, lifelong ADHD and calls himself a self-taught engineer, designer, and manager; he built Roam 'as a sort of cognitive prosthetic,' an extension of his own working memory.",
      sourceIds: [S.metamuse],
    },
    {
      id: "claim-roam-launch",
      kind: "fact",
      text: "Roam opened to early users in late 2019 as a free beta and grew virally until scaling problems — including disappearing data — forced a waitlist; his first public discussion of the product was a December 2019 interview with Tiago Forte.",
      sourceIds: [S.wikipediaRoam, S.goodbetterbest, S.forteInterview],
    },
    {
      id: "claim-ai-safety-users",
      kind: "fact",
      text: "He says Roam's earliest design partners were AI-safety-adjacent researchers — people at the Machine Intelligence Research Institute, the Center for Effective Altruism, and pandemic modelers.",
      sourceIds: [S.nessTranscript],
    },
    {
      id: "claim-pricing-launch",
      kind: "fact",
      text: "Paid plans launched in June 2020: Pro at $15/month — roughly 4x Notion's comparable plan at the time — plus a $500 five-year 'Believer' tier, behind a short free trial with almost no onboarding; the price drew both mockery and loyalty.",
      sourceIds: [S.goodbetterbest],
    },
    {
      id: "claim-roamcult",
      kind: "fact",
      text: "Users organized under the hashtag #RoamCult; White-Sullivan publicly embraced the framing ('Citizens of Roam'), and the pricing page itself played along with 'Gates of Roam' and 'scholar' copy.",
      sourceIds: [S.builtinCult, S.goodbetterbest],
    },
    {
      id: "claim-book-club",
      kind: "fact",
      text: "In August 2020 the Roam team started Roam Book Club as a multiplayer-graph experiment, beginning with Steven Johnson's 'Where Good Ideas Come From'; the second iteration drew more than 1,700 signups and some 200 people editing one graph on the kickoff call.",
      sourceIds: [S.bookClub],
    },
    {
      id: "claim-seed-round",
      kind: "fact",
      text: "In September 2020 Roam raised a $9 million seed round at a $200 million valuation — about 25x the median seed valuation — with backers reported to include Lux Capital, Patrick and John Collison, and Tim Ferriss.",
      sourceIds: [S.theInformation, S.businessInsider],
    },
    {
      id: "claim-community-round",
      kind: "fact",
      text: "In April 2021 a Wefunder community round with a $500,000 target was oversubscribed within an hour of the invitation email and raised more than $1.6 million from hundreds of users at the same $200 million valuation; Roam Research, Inc. filed a Form C with the SEC for the offering.",
      sourceIds: [S.businessInsider, S.sec],
    },
    {
      id: "claim-profitability",
      kind: "fact",
      text: "He tweeted in early 2021 that Roam 'hit profitability last year' — a self-reported figure never independently audited — and that focus shifted back to R&D on collective intelligence.",
      sourceIds: [S.threadCompound],
    },
    {
      id: "claim-roam-games",
      kind: "fact",
      text: "In early 2021 he announced #RoamGames — a new public challenge roughly every two weeks with $10,000 distributed per challenge to work pushing the tools-for-thought frontier.",
      sourceIds: [S.threadCompound],
    },
    {
      id: "claim-compound",
      kind: "fact",
      text: "The team lived and worked together at what he called the 'Roam Compound,' five minutes from off-road trails; he has said in interviews that he chooses to live with the team.",
      sourceIds: [S.threadCompound, S.twentyVC],
    },
    {
      id: "claim-producthunt",
      kind: "fact",
      text: "Roam was nominated for Product Hunt's 2020 product of the year, and he publicly rallied the #roamcult to 'vote early, vote often.'",
      sourceIds: [S.threadWilderness],
    },
    {
      id: "claim-decline-coverage",
      kind: "fact",
      text: "By February 2022, Dan Shipper's widely read 'The Fall of Roam' captured a reversal of sentiment — slow product velocity, no good mobile experience, and 'well-documented community issues' — as free or cheaper rivals absorbed Roam's signature features.",
      sourceIds: [S.fallOfRoam],
    },
    {
      id: "claim-still-cofounder",
      kind: "fact",
      text: "As of this index his X bio still reads 'Co-founder of @RoamResearch' and places him in New Hampshire; he continues to post prolifically there.",
      sourceIds: [S.conaw],
    },
    {
      id: "claim-writing-is-thinking",
      kind: "stated_belief",
      text: "His core premise is that 'writing is a tool for thinking': a better medium for writing is a cognitive aid that lets people think thoughts they could not otherwise think — the line the white paper turns into Roam's mission.",
      sourceIds: [S.whitepaper, S.metamuse, S.roam],
    },
    {
      id: "claim-graph-not-files",
      kind: "stated_belief",
      text: "He holds that file-tree storage is the wrong primitive: knowledge belongs in a directed graph where a node can live in many overlapping hierarchies — a structure that can eventually support Bayesian inference and collaborative reasoning.",
      sourceIds: [S.whitepaper],
    },
    {
      id: "claim-wikipedia-skeptic",
      kind: "stated_belief",
      text: "He rejects Wikipedia's single-neutral-truth model outright ('I think that's completely bullshit'), favoring a 'post-modern' web of trust in which readers subscribe to curators' graphs rather than a moderated consensus.",
      sourceIds: [S.nessTranscript],
    },
    {
      id: "claim-compound-interest",
      kind: "stated_belief",
      text: "His framing for note-taking is 'compound interest on your thoughts': good ideas come from intersections, so reviewing old notes lets one new observation generate dozens more — the goal is a personal syntopicon inspired by Mortimer Adler's 'How to Read a Book.'",
      sourceIds: [S.nessInterview, S.nessTranscript, S.twentyVC],
    },
    {
      id: "claim-fifty-year-project",
      kind: "stated_belief",
      text: "At the height of the 2020 hype he published a note framing Roam as 'at least a 50 year project' and his 'life's work.'",
      sourceIds: [S.goodbetterbest],
    },
    {
      id: "claim-technical-ashram",
      kind: "stated_belief",
      text: "He has long wanted to live on shared land with 'a few dozen others' writing code and creating educational content — 'A Technical Ashram' — and casts 'Roammania' as a rethought research university along the lines of Garrett Lisi's Pacific Science Institute.",
      sourceIds: [S.threadCompound],
    },
    {
      id: "claim-hiring-philosophy",
      kind: "stated_belief",
      text: "His stated hiring philosophy: no salary negotiation — 'slightly overpay salary... extremely overpay equity' — level by ongoing 360-degree review, and demonstrated skill first via the 7GUIs benchmark and paid take-home tests; he links the approach to Basecamp and Steve Newcomb's 'Cult Creation' essay.",
      sourceIds: [S.threadHiring],
    },
    {
      id: "claim-low-floor-high-ceiling",
      kind: "stated_belief",
      text: "On product design he preaches 'low floors and high ceilings,' insists 'Roam is not about taking better notes,' and compares the company more to Google than to other collaboration tools.",
      sourceIds: [S.twentyVC],
    },
    {
      id: "claim-single-player-first",
      kind: "stated_belief",
      text: "A lesson he draws from Localocracy's failure: the tool has to work without critical mass, as a single-player product first, before any multiplayer vision can matter.",
      sourceIds: [S.metamuse, S.nessTranscript],
    },
    {
      id: "claim-pattern-community-engine",
      kind: "pattern",
      text: "Across Localocracy, HuffPost, and Roam the same move recurs: turn the user community into the engine — verified voters, reader curation, #roamcult power users as outsourced marketing, a five-year Believer tier, and equity for users.",
      sourceIds: [
        S.tcLocalocracy,
        S.twentyVC,
        S.goodbetterbest,
        S.businessInsider,
        S.bookClub,
      ],
    },
    {
      id: "claim-pattern-provocation",
      kind: "pattern",
      text: "His public persona is deliberately high-variance — cult jokes, unfiltered multi-tweet threads, hiring posts that double as manifestos — which binds insiders while repelling skeptics.",
      sourceIds: [S.conaw, S.goodbetterbest, S.threadHiring],
    },
    {
      id: "claim-pattern-austerity",
      kind: "pattern",
      text: "The pre-Roam years established a pattern he kept inside Roam: cut burn rather than take the safe job — van, India, free student housing — then treat reported profitability as permission to slow down and fund open-ended R&D.",
      sourceIds: [S.threadWilderness, S.threadCompound],
    },
    {
      id: "claim-pattern-autodidact",
      kind: "pattern",
      text: "He treats himself as the test case: self-taught across engineering, design, and management, and he screens candidates for what he calls grit and autodidactics over credentials.",
      sourceIds: [S.metamuse, S.twentyVC],
    },
    {
      id: "claim-spec-valuation",
      kind: "speculation",
      text: "Whether the $200 million seed price reflected Roam's fundamentals or 2020's note-taking frenzy is unresolved; The Information's own framing emphasized investor frenzy, and later coverage documented attrition.",
      sourceIds: [S.theInformation, S.fallOfRoam],
    },
    {
      id: "claim-spec-multiplayer",
      kind: "speculation",
      text: "The collective-intelligence endgame — sharing and remixing notes across graphs — remained mostly aspirational as of his 2023 Metamuse interview; whether Roam's slow refinement ever delivers it is an open empirical question.",
      sourceIds: [S.metamuse, S.nessTranscript, S.bookClub],
    },
  ],
  timeline: [
    {
      id: "event-localocracy",
      kind: "founded",
      date: "2009",
      title: "Founds Localocracy at UMass Amherst",
      summary:
        "The 'online town common' for verified local voters; founding year is commonly reported as 2009, though records differ slightly.",
      location: "Amherst, Massachusetts",
      sourceIds: [S.tcLocalocracy, S.nessInterview, S.metamuse],
    },
    {
      id: "event-aol-exit",
      kind: "milestone",
      date: "2011-10-03",
      title: "Huffington Post Media Group / AOL acquires Localocracy",
      summary:
        "Reported price under $1 million; the founding team joins HuffPost's community-technology group.",
      sourceIds: [S.tcLocalocracy, S.threadWilderness],
    },
    {
      id: "event-huffpost-labs",
      kind: "role",
      date: "2011-10",
      end: "2013",
      title: "Co-founds HuffPost Labs",
      summary:
        "Internal product skunkworks reporting to Arianna Huffington and the CTO; he left for the years-long private build that became Roam.",
      organization: "Huffington Post Media Group",
      sourceIds: [S.twentyVC, S.forteInterview],
    },
    {
      id: "event-wilderness",
      kind: "other",
      date: "2013",
      end: "2019",
      title: "'Five years in the wilderness'",
      summary:
        "Broke but building: a van, then India, then the free coding school 42 — where he met co-founder Josh Brown.",
      sourceIds: [S.threadWilderness, S.forteInterview],
    },
    {
      id: "event-roam-launch",
      kind: "founded",
      date: "2019",
      title: "Roam launches to early users",
      summary:
        "The 'note-taking tool for networked thought' spreads through the tools-for-thought scene; scaling problems soon force a waitlist.",
      organization: "Roam Research",
      sourceIds: [S.wikipediaRoam, S.builtinCult, S.goodbetterbest],
    },
    {
      id: "event-forte-interview",
      kind: "media",
      date: "2019-12-17",
      title: "First public interview about Roam",
      summary:
        "A one-hour interview, demonstration, and debate with Tiago Forte on knowledge management.",
      sourceIds: [S.forteInterview],
    },
    {
      id: "event-paid-plans",
      kind: "milestone",
      date: "2020-06",
      title: "Paid plans launch: $15/month Pro and the $500 Believer tier",
      summary:
        "Premium pricing with no free tier converts the waitlist into a committed user base — and ignites the pricing debate.",
      sourceIds: [S.goodbetterbest],
    },
    {
      id: "event-book-club",
      kind: "project",
      date: "2020-08",
      title: "Roam Book Club begins",
      summary:
        "A multiplayer-graph experiment by the Roam team; later iterations drew more than 1,700 signups.",
      sourceIds: [S.bookClub],
    },
    {
      id: "event-seed",
      kind: "milestone",
      date: "2020-09",
      title: "$9M seed at a $200M valuation",
      summary:
        "Reported by The Information as emblematic of investor frenzy for note-taking apps.",
      sourceIds: [S.theInformation, S.businessInsider],
    },
    {
      id: "event-roam-games",
      kind: "project",
      date: "2021",
      title: "#RoamGames public challenges",
      summary:
        "Biweekly challenges with $10,000 distributed per round for public tools-for-thought work.",
      sourceIds: [S.threadCompound],
    },
    {
      id: "event-community-round",
      kind: "milestone",
      date: "2021-04",
      title: "Community equity round oversubscribed in an hour",
      summary:
        "A $500,000 Wefunder target raised more than $1.6 million in a day; SEC Form C filed.",
      sourceIds: [S.businessInsider, S.sec],
    },
    {
      id: "event-compound",
      kind: "other",
      date: "2021",
      title: "The 'Roam Compound' co-living setup",
      summary:
        "Team members live and work together near trails — his 'technical ashram' instinct made operational.",
      sourceIds: [S.threadCompound, S.twentyVC],
    },
    {
      id: "event-fall-of-roam",
      kind: "media",
      date: "2022-02-11",
      title: "'The Fall of Roam' captures the comedown",
      summary:
        "Dan Shipper's essay crystallizes the attrition narrative: slow velocity, weak mobile, community friction, copied features.",
      sourceIds: [S.fallOfRoam],
    },
    {
      id: "event-metamuse",
      kind: "media",
      date: "2023-03-02",
      title: "Metamuse episode 75: 'Collective intelligence'",
      summary:
        "A reflective long-form interview: Roam as cognitive prosthetic, self-teaching, and the still-unrealized multiplayer endgame.",
      sourceIds: [S.metamuse],
    },
  ],
  themes: [
    {
      id: "theme-writing-as-thinking",
      kind: "philosophy",
      status: "stated",
      title: "Writing is a tool for thinking",
      summary:
        "The premise behind everything he builds: a medium for writing is a cognitive aid, and better tools let people 'think thoughts you couldn't otherwise think.' Roam is framed as a prosthetic for working memory, not a notebook.",
      sourceIds: [S.whitepaper, S.roam, S.metamuse],
    },
    {
      id: "theme-collective-intelligence",
      kind: "belief",
      status: "stated",
      title: "Collective intelligence as the real mission",
      summary:
        "Since about 2008 his stated problem has been how people can figure out what's true together online — from crowdsourced local policy to shared knowledge graphs. The single-player note tool was always the beachhead, not the destination.",
      sourceIds: [S.nessTranscript, S.metamuse, S.threadCompound],
    },
    {
      id: "theme-syntopicon",
      kind: "influence",
      status: "stated",
      title: "Adler's Syntopicon and the Zettelkasten lineage",
      summary:
        "He traces Roam to Mortimer Adler's 'How to Read a Book' and the Encyclopaedia Britannica Syntopicon — an index of ideas across the canon — wanting 'a syntopicon for physics, ontology, the Vedas,' not just the Western fifty. Zettelkasten supplies the mechanics.",
      sourceIds: [S.nessInterview, S.nessTranscript, S.twentyVC],
    },
    {
      id: "theme-post-institutional-truth",
      kind: "belief",
      status: "stated",
      title: "Against the single source of truth",
      summary:
        "He rejects Wikipedia's moderated neutral-point-of-view model as 'completely bullshit' and imagines a post-modern web of trust: public graphs, curator subscription, remix without consensus.",
      sourceIds: [S.nessTranscript, S.metamuse],
    },
    {
      id: "theme-cult-building",
      kind: "practice",
      status: "reported",
      title: "Deliberate cult mechanics",
      summary:
        "Press and his own posts document an intentional community-as-strategy: 'Citizens of Roam,' 'Gates of Roam' and 'scholar' pricing copy, a five-year Believer tier selling proximity, #RoamGames bounties, user equity — he cites Steve Newcomb's 'Cult Creation' essay approvingly.",
      sourceIds: [
        S.goodbetterbest,
        S.builtinCult,
        S.businessInsider,
        S.threadHiring,
      ],
    },
    {
      id: "theme-compound-life",
      kind: "practice",
      status: "reported",
      title: "The compound: co-living as operating model",
      summary:
        "He chooses to live with the team — the 'Roam Compound' near trails — and his older fantasy was 'a trailer on a plot of land with a few dozen others': a Technical Ashram. 'Roammania' names the research-university version.",
      sourceIds: [S.threadCompound, S.twentyVC],
    },
    {
      id: "theme-low-floor-high-ceiling",
      kind: "method",
      status: "stated",
      title: "Low floors, high ceilings",
      summary:
        "His design doctrine: easy to start, unbounded to master — Excel is the north star. 'Roam is not about taking better notes'; the comparison he invites is Google, not other note apps.",
      sourceIds: [S.twentyVC],
    },
    {
      id: "theme-austerity-as-strategy",
      kind: "method",
      status: "reported",
      title: "Austerity as strategy",
      summary:
        "Van, India, free student housing, under $10k in the bank — then reported profitability before venture scale. He frames constraint as protection of the vision, and critics read the same slowness as stagnation.",
      sourceIds: [S.threadWilderness, S.threadCompound, S.fallOfRoam],
    },
  ],
  works: [
    {
      id: "work-roam",
      kind: "product",
      status: "ongoing",
      title: "Roam",
      date: "2019",
      summary:
        "The 'note-taking tool for networked thought': an outliner on a directed graph with bidirectional links, block references, and public graphs.",
      sourceIds: [S.roam, S.whitepaper, S.wikipediaRoam],
    },
    {
      id: "work-whitepaper",
      kind: "paper",
      status: "published",
      title: "Roam Research white paper",
      date: "2020",
      summary:
        "'A note taking tool for networked thought' — credited to White-Sullivan and Richard Meadows — laying out the directed-graph model and the collaborative-reasoning endgame.",
      sourceIds: [S.whitepaper],
    },
    {
      id: "work-localocracy",
      kind: "project",
      status: "completed",
      title: "Localocracy",
      date: "2009",
      location: "Amherst, Massachusetts",
      summary:
        "The 'online town common' for verified local voters; acquired by Huffington Post Media Group (AOL) in October 2011.",
      sourceIds: [S.tcLocalocracy, S.metamuse, S.nessInterview],
    },
    {
      id: "work-huffpost-labs",
      kind: "project",
      status: "completed",
      title: "HuffPost Labs",
      summary:
        "The internal product skunkworks he co-founded at HuffPost, reporting to Arianna Huffington and the CTO.",
      sourceIds: [S.twentyVC],
    },
    {
      id: "work-stoicism-classes",
      kind: "other",
      status: "completed",
      title: "Stoicism and practical philosophy classes",
      summary:
        "Small classes he taught during his UMass years — an early sign of the self-directed-education streak.",
      sourceIds: [S.nessInterview],
    },
    {
      id: "work-book-club",
      kind: "project",
      status: "completed",
      title: "Roam Book Club",
      date: "2020",
      summary:
        "The team's multiplayer-graph experiment: hundreds of readers annotating one shared Roam each week, from 'Where Good Ideas Come From' through 'How to Take Smart Notes' and 'Braiding Sweetgrass.'",
      sourceIds: [S.bookClub],
    },
    {
      id: "work-roam-games",
      kind: "other",
      status: "completed",
      title: "#RoamGames",
      date: "2021",
      summary:
        "Biweekly public challenges distributing $10,000 per round to work pushing the tools-for-thought frontier.",
      sourceIds: [S.threadCompound],
    },
    {
      id: "work-community-round",
      kind: "other",
      status: "completed",
      title: "Wefunder community round",
      date: "2021-04",
      summary:
        "A $500,000 Regulation Crowdfunding target that was oversubscribed within an hour and raised over $1.6 million from users.",
      sourceIds: [S.businessInsider, S.sec],
    },
    {
      id: "work-compound",
      kind: "other",
      status: "completed",
      title: "The Roam Compound",
      date: "2021",
      summary:
        "The co-living property near off-road trails where the team lived and worked together.",
      sourceIds: [S.threadCompound, S.twentyVC],
    },
    {
      id: "work-technical-ashram",
      kind: "project",
      status: "proposed",
      title: "The Technical Ashram / 'Roammania'",
      summary:
        "His recurring unbuilt vision: shared land where a few dozen people write code, learn languages, and create educational content — a rethought research university.",
      sourceIds: [S.threadCompound],
    },
    {
      id: "work-conaw-persona",
      kind: "other",
      status: "ongoing",
      title: "Public threads as @Conaw",
      summary:
        "His real publication venue: thousands of unfiltered tweets and threads where hiring posts, product rationale, and personal philosophy arrive as one stream.",
      sourceIds: [S.conaw, S.threadWilderness],
    },
  ],
  appearances: [
    {
      id: "appearance-forte",
      title: "Interview with Conor White-Sullivan, Founder of Roam",
      venue: "Forte Labs",
      publishedAt: "2019-12-17",
      participants: ["Conor White-Sullivan", "Tiago Forte"],
      summary:
        "One-hour interview, demonstration, and debate on knowledge management — his first public discussion of Roam.",
      media: [
        {
          type: "article",
          url: "https://fortelabs.com/blog/interview-with-conor-white-sullivan-founder-of-roam/",
          sourceId: S.forteInterview,
        },
      ],
      sourceIds: [S.forteInterview],
    },
    {
      id: "appearance-ness",
      title: "Getting compound interest on your thoughts",
      venue: "Ness Labs (Mindful Makers)",
      publishedAt: "2020",
      participants: ["Conor White-Sullivan", "Anne-Laure Le Cunff"],
      summary:
        "The deepest biographical interview: Localocracy's lessons, the syntopicon inspiration, and his Wikipedia critique; published with a full transcript.",
      media: [
        {
          type: "article",
          url: "https://nesslabs.com/conor-white-sullivan-interview",
          sourceId: S.nessInterview,
        },
        {
          type: "transcript",
          url: "https://nesslabs.com/conor-white-sullivan-transcript",
          sourceId: S.nessTranscript,
        },
      ],
      sourceIds: [S.nessInterview, S.nessTranscript],
    },
    {
      id: "appearance-20vc",
      title:
        "20VC: Product Design, Team-Building & Tesla Go-To-Market with Conor White-Sullivan",
      venue: "The Twenty Minute VC",
      publishedAt: "2020-05-07",
      participants: ["Conor White-Sullivan", "Harry Stebbings"],
      summary:
        "On wrestling, 'low floors and high ceilings,' hiring for grit and autodidactics, living with the team, and borrowing Tesla's go-to-market.",
      media: [
        {
          type: "audio",
          url: "https://www.thetwentyminutevc.com/conorwhitesullivan",
          sourceId: S.twentyVC,
        },
      ],
      sourceIds: [S.twentyVC],
    },
    {
      id: "appearance-metamuse",
      title: "Collective intelligence with Conor White-Sullivan",
      venue: "Metamuse (episode 75)",
      publishedAt: "2023-03-02",
      participants: [
        "Conor White-Sullivan",
        "Adam Wiggins",
        "Mark McGranaghan",
      ],
      summary:
        "A reflective long-form conversation: ADHD and Roam as cognitive prosthetic, self-taught everything, and the still-unrealized collective-intelligence endgame.",
      media: [
        {
          type: "audio",
          url: "https://allume.com/podcast/75-collective-intelligence/",
          sourceId: S.metamuse,
        },
      ],
      sourceIds: [S.metamuse],
    },
  ],
  relations: [
    {
      id: "rel-roam-research",
      kind: "founded",
      target: "roam-research",
      targetName: "Roam Research",
      targetKind: "organization",
      note: "Co-founded Roam Research after a years-long private build; his X bio still reads 'Co-founder of @RoamResearch.'",
      sourceIds: [S.conaw, S.threadWilderness, S.whitepaper],
    },
    {
      id: "rel-joshua-brown",
      kind: "cofounder",
      target: "joshua-brown",
      targetName: "Joshua Brown",
      note: "Met Josh Brown at the coding school 42 during the wilderness years; Brown became Roam's co-founder.",
      sourceIds: [S.threadWilderness],
    },
  ],
  openQuestions: [
    "Roam Research's founding date is fuzzy: he describes a roughly five-year private build before the 2019 public launch, and databases variously date the company to 2017 or 2019.",
    "The 2020 profitability claim is self-reported via his tweets; no audited figures or independent reporting confirm it, and later coverage emphasized attrition instead.",
    "Current team size, his day-to-day role, and Roam's trajectory after 2021 are undocumented in the cited record — his X bio still says co-founder, but no public source confirms or refutes a leadership change.",
    "Whether the 'Technical Ashram' / 'Roammania' campus ambition ever materialized beyond the 2021 'Roam Compound' is unresolved; his X profile now lists New Hampshire without explanation.",
    "Early biography is thin: no public birth date, and his pre-UMass years (including self-directed-learning involvement) surface only in self-reported profiles outside this packet's cited record.",
  ],
  body: `Conor White-Sullivan is the co-founder and CEO of Roam Research, the "note-taking tool for networked thought" that briefly became the most fervently loved piece of software on the internet. His career is a single through-line — how do people figure out what is true, together — pursued through three very different ventures: a civic platform, a newsroom skunkworks, and a knowledge graph.

## From the town common to HuffPost Labs

He studied anthropology at the University of Massachusetts, where he also taught small classes on stoicism and practical philosophy, and where he founded Localocracy — an "online town common" where registered voters, using their real names, could crowdsource the pros and cons of local policy. The premise, as he later told the Metamuse podcast, was that a nineteen-year-old's internet-anarchism could make town governments responsive; the users turned out to be retirees, and he was glad no one had to live under his design.

In October 2011 the Huffington Post Media Group — then owned by AOL — acquired Localocracy for reportedly under $1 million, and the team joined HuffPost's community-technology efforts. "I sold my first company to Aol at 23," he wrote a decade later, "but we sold because we couldn't find a way to make it work. For years, folks treated me like a success, but I felt like a fraud." Inside HuffPost he co-founded HuffPost Labs, an internal skunkworks reporting directly to Arianna Huffington and the CTO, and experimented with reader-powered curation.

## Five years in the wilderness

Then came the part of the story he tells most often. He quit — "making more money than anyone in my family had ever seen" — and spent what he calls five years in the wilderness building the first version of Roam while broke. He lived in a van, moved to India, and eventually landed at 42, the free coding school with free housing, where he finally met the collaborator he had been searching for: Josh Brown, Roam's co-founder. The prototype convinced Richard Meadows to invest; Meadows is credited alongside him on the Roam white paper.

On Metamuse in 2023 he gave the most personal account of those years: severe lifelong ADHD, no formal training in anything he now does — "self-taught engineer, self-taught designer, self-taught manager" — and a conviction that he could never have held a white-collar job. Roam, he said, was built "as a sort of cognitive prosthetic," an extension of his own working memory. The intellectual blueprint came from Mortimer Adler's *How to Read a Book* and the Encyclopaedia Britannica Syntopicon — a mid-century index of every idea in the Western canon, cross-referenced chapter and verse. He wanted "a syntopicon for physics and for ontology and for the Vedas," and he wanted it digital.

## Roam's moment

Roam opened to early users in late 2019 and spread through the tools-for-thought scene fast enough that scaling problems — including disappearing data — forced a waitlist. His first public interview about it was with Tiago Forte that December. By 2020 the community had named itself: #RoamCult, a congregation of academics, engineers, and artists swapping tips, courses, and tutorials. White-Sullivan leaned in, tweeting about "Citizens of Roam" while the pricing page joked about the "Gates of Roam" and called users scholars.

The June 2020 paid launch was deliberately hostile to casual adoption: $15 a month — roughly four times Notion's comparable plan — or $500 for five years as a "Believer," with almost no onboarding. Critics called it arrogance; analysts called it cult packaging, and noted that it screened for exactly the obsessive users Roam wanted. That summer the team started Roam Book Club, a multiplayer-graph experiment that drew more than 1,700 signups for its second iteration and put 200 people editing a single graph on the kickoff call. In September 2020 The Information reported a $9 million seed round at a $200 million valuation — about 25 times the median seed price — with backers including Lux Capital, the Collison brothers, and Tim Ferriss. In April 2021 a Wefunder community round capped at $500,000 was oversubscribed within an hour of the invitation email and raised more than $1.6 million from hundreds of users, backed by an SEC Form C filing.

He ran the company the way he ran his mouth on Twitter: no salary negotiation ("slightly overpay salary, extremely overpay equity"), a public 7GUIs coding benchmark, paid take-homes, everyone living together at the "Roam Compound" near off-road trails. He announced #RoamGames — $10,000 public challenges for tools-for-thought work — and tweeted that Roam had hit profitability in 2020, freeing it for collective-intelligence R&D.

## The comedown

The reversal was equally public. Dan Shipper's February 2022 essay "The Fall of Roam" captured the mood: slow product velocity, no good mobile experience, "well-documented community issues," and signature features — bidirectional links, daily notes, graph views — absorbed by free or cheaper rivals like Obsidian, Logseq, and Notion. The believer economy he built cut both ways: a community strong enough to fund the company was also strong enough to document its frustrations. His stated frame never changed — "at least a 50 year project," "life's work" — and in his 2023 Metamuse appearance he sounded less like a humbled founder than an impatient one, frustrated that imitators "copied" surface features while missing the point. As of this index his X bio still reads "Co-founder of @RoamResearch," now from New Hampshire — where the Technical Ashram dream, a few dozen people writing code on shared land, may or may not have finally found its zip code.

## What the record does not settle

The soft spots are the self-reported ones: the profitability claim has no audited backing, the founding date shifts depending on whether you count the wilderness build, and post-2021 the company's size, leadership, and trajectory are essentially undocumented in reliable public sources. The index preserves those seams — including the possibility that the "50-year project" framing is strategy, cope, or both — rather than smoothing them.

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
