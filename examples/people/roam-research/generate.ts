#!/usr/bin/env bun
/** Generate examples/people/roam-research/person-index.json with derived source ids.
 *
 * Subject kind "organization": the subject block is identical to a person
 * packet (kind/handle/displayName/summary + optional alsoKnownAs/identity).
 * There are no org-specific members — founders and backers ride in `relations`
 * (founded_by / other), funding rounds and launches live in timeline as
 * "milestone"/"project" (no "funding" or "launch" kind exists).
 */

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

const ACCESSED = "2026-09-17T04:17:43Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- subject-controlled ---------------------------------------------------

const roamSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Roam Research — A note taking tool for networked thought",
  url: "https://roamresearch.com/",
  publisher: "Roam Research",
  notes:
    "The company's own site; a client-side app that renders only the tagline to a plain fetch.",
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
const roamDepot = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Roam-Research/roam-depot",
  url: "https://github.com/Roam-Research/roam-depot",
  publisher: "GitHub",
  notes:
    "The company's own repo: extension metadata registry for the Roam Depot marketplace. Created 2022-05-19.",
});
const roamTools = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Roam-Research/roam-tools — Official MCP and CLI for Roam Research",
  url: "https://github.com/Roam-Research/roam-tools",
  publisher: "GitHub",
  notes:
    "Created 2026-01-15; ships @roam-research/roam-mcp and roam-cli. Active commits into September 2026 — evidence the company still ships.",
});
const kitWrapped = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Commentarii Roamani: 2025 Roam Wrapped",
  url: "https://roam-research.kit.com/posts/commentarii-roamani-2025-roam-wrapped",
  publisher: "Commentarii Roamani (Roam Research newsletter)",
  notes:
    "The company's own newsletter, still publishing product updates and workflows through late 2025.",
});
const xRoam = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Roam Research (@RoamResearch) on X",
  url: "https://x.com/RoamResearch",
  publisher: "X",
  notes:
    "The company's official account since November 2019 (per the Wikidata record).",
});

// --- first person (the founder narrating the company) ----------------------

const threadOrigin = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "@Conaw thread — sold first company to AOL at 23; five years in the wilderness; meeting Josh at 42",
  url: "https://threadreaderapp.com/thread/1353178434990600193.html",
  publisher: "Thread Reader App",
  publishedAt: "2021-01-24",
  authors: ["Conor White-Sullivan"],
  notes:
    "Unrolled archive of the January 2021 thread; adjacent unrolls carry the #RoamGames announcement and the Product Hunt 'vote early, vote often' rally.",
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

// --- interviews (company representatives speaking about the product) --------

const nesslabs = source({
  binding: "interview",
  mediaType: "article",
  title: "Getting compound interest on your thoughts with Conor White-Sullivan",
  url: "https://nesslabs.com/conor-white-sullivan-interview",
  publisher: "Ness Labs",
  publishedAt: "2020",
  authors: ["Anne-Laure Le Cunff"],
  notes: "Mindful Makers interview covering the Localocracy-to-Roam arc.",
});
const nesslabsTranscript = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Interview with Conor White-Sullivan of Roam Research: full transcript",
  url: "https://nesslabs.com/conor-white-sullivan-transcript",
  publisher: "Ness Labs",
  publishedAt: "2020",
  authors: ["Anne-Laure Le Cunff", "Conor White-Sullivan"],
  transcriptOf: "source-f2c4c0d9c7ce85d2bc7e",
});
const fortelabs = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview with Conor White-Sullivan, Founder of Roam",
  url: "https://fortelabs.com/blog/interview-with-conor-white-sullivan-founder-of-roam/",
  publisher: "Forte Labs",
  publishedAt: "2019-12-17",
  authors: ["Tiago Forte"],
  notes:
    "One-hour interview, demonstration, and debate; the first public discussion of the product.",
});
const twentymvc = source({
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
const ventureStories = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Creating Tools For Networked Thought with Roam Research — Conor White-Sullivan on Venture Stories",
  url: "https://podcastnotes.org/venture-stories/conor-white-sullivan/",
  publisher: "Podcast Notes",
  authors: ["Erik Torenberg"],
  notes:
    "Third-party notes for the Venture Stories episode hosted by Erik Torenberg.",
});

// --- primary records --------------------------------------------------------

const secFormC = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "SEC Form C/A — Roam Research, Inc. (CIK 0001824172, File No. 020-27920)",
  url: "https://www.sec.gov/Archives/edgar/data/1824172/000167025421000599/0001670254-21-000599-index.htm",
  publisher: "U.S. Securities and Exchange Commission",
  publishedAt: "2021-04-30",
  notes:
    "Regulation Crowdfunding offering-statement index on EDGAR for the April 2021 community round; Delaware incorporation.",
});
const phWinners = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Announcing the 2020 Golden Kitty Award Winners",
  url: "https://www.producthunt.com/stories/announcing-the-2020-golden-kitty-award-winners",
  publisher: "Product Hunt",
  publishedAt: "2021-01-29",
  authors: ["Emily Hodgins"],
  notes:
    "Product Hunt's own winners post: Clubhouse named Product of the Year, Roam Research an honorable-mention runner-up.",
});
const phAwards = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Roam Research awards — Product Hunt",
  url: "https://www.producthunt.com/products/roam-research/awards",
  publisher: "Product Hunt",
  notes:
    "Product Hunt's product record: #1 launch of the day on 2020-01-11 and a 'Golden Kitty — Product of the Year 2020' badge that conflicts with the winners post.",
});
const athens = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "athensresearch/athens — open-source, collaborative knowledge graph",
  url: "https://github.com/athensresearch/athens",
  publisher: "GitHub",
  notes:
    "The YC W21-backed open-source answer to Roam; the repo now reads 'Athens is no longer being actively maintained.' Cited as a primary artifact of the wave Roam triggered.",
});

// --- reporting --------------------------------------------------------------

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
const theHustle = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Roam Research could be the future of note-taking and knowledge management",
  url: "https://thehustle.co/09142020-roam-research",
  publisher: "The Hustle",
  publishedAt: "2020-09-14",
  notes:
    "Reports an 11-person team launched 'last fall' and that the idea was rejected five times by Y Combinator.",
});
const builtIn = source({
  binding: "reporting",
  mediaType: "article",
  title: "Roam Is a Note-Taking Tool, and a Dream of a Better Self",
  url: "https://www.builtinsf.com/articles/roam-note-taking-app-personal-wiki",
  publisher: "Built In",
  publishedAt: "2020-09-30",
  authors: ["Hal Koss"],
  notes: "The definitive early feature on the #RoamCult community.",
});
const gbb = source({
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
const everyFall = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Fall of Roam",
  url: "https://every.to/superorganizers/the-fall-of-roam",
  publisher: "Every (Superorganizers)",
  publishedAt: "2022-02-11",
  authors: ["Dan Shipper"],
});
const platformer = source({
  binding: "reporting",
  mediaType: "article",
  title: "Notes on a year using Roam Research",
  url: "https://platformer.substack.com/p/notes-on-a-year-using-roam-research",
  publisher: "Platformer",
  publishedAt: "2021-07-30",
  authors: ["Casey Newton"],
  notes:
    "Newton bought the $500 Believer plan on 2020-09-02 and recounts the reported $1M ARR / profitability claims.",
});
const verge = source({
  binding: "reporting",
  mediaType: "article",
  title: "Why note-taking apps don't make us smarter",
  url: "https://www.theverge.com/2023/8/25/23845590/note-taking-apps-ai-chat-distractions-notion-roam-mem-obsidian",
  publisher: "The Verge",
  publishedAt: "2023-08-25",
  authors: ["Casey Newton"],
  notes: "Newton's follow-up: 'Roam's development slowed to a crawl.'",
});
const heyBookClub = source({
  binding: "reporting",
  mediaType: "article",
  title: "A book club like no other",
  url: "https://world.hey.com/ashchedrin/a-book-club-like-no-other-bf65985f",
  publisher: "HEY World",
  publishedAt: "2021-04-06",
  authors: ["Alex Shchedrin"],
  notes: "A participant's account of Roam Book Club RBC1–RBC4.",
});
const natEliason = source({
  binding: "reporting",
  mediaType: "article",
  title: "Roam: Why I Love It and How I Use It",
  url: "https://www.nateliason.com/blog/roam",
  publisher: "Nat Eliason",
  publishedAt: "2020-01",
  authors: ["Nat Eliason"],
  notes:
    "The widely shared early user essay that helped ignite the #RoamCult wave; the author stresses he was unpaid.",
});
const lfr4546 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Letters from a Roaman — Letter XLV & Letter XLVI",
  url: "https://roam.elaptics.co.uk/posts/lfr-letters-from-a-roaman-letter-xlv-letter-xlvi",
  publisher: "Letters from a Roaman",
  publishedAt: "2022-07",
  authors: ["Andy Henson"],
  notes:
    "Community newsletter; reports Roam Depot about to launch 'this week,' developer revenue sharing, and the RoamJS porting drive.",
});
const lfr48 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Letters from a Roaman — Letter XLVIII",
  url: "https://roam.elaptics.co.uk/posts/lfr-letters-from-a-roaman-letter-xlviii",
  publisher: "Letters from a Roaman",
  publishedAt: "2022-08",
  authors: ["Andy Henson"],
  notes:
    "Confirms the Roam Depot extension store went live a few weeks earlier and that 56 RoamJS extensions would be consolidated into 29 Depot extensions.",
});
const sunriseDigest = source({
  binding: "reporting",
  mediaType: "article",
  title: "Roam Research Review 2026: The Influence vs. The Reality",
  url: "https://thesunrisedigest.com/focus/roam-research-review-2026/",
  publisher: "The Sunrise Digest",
  publishedAt: "2026",
  notes:
    "Retrospective review: 'Without Roam, there is no Obsidian, no Logseq, no Tana, no Reflect' — and a product that has not kept pace.",
});
const buildFirstBrain = source({
  binding: "reporting",
  mediaType: "article",
  title: "What Happened to Roam Research? Magic, Then Friction",
  url: "https://buildfirstbrain.com/journal/why-roam-research-felt-like-magic-and-why-it-faded/",
  publisher: "Build First Brain",
  notes:
    "Post-mortem attributing the fade to copied features, pricing friction, and over-promised thinking.",
});
const devTo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Multiplayer Learning in Public with Roam Research",
  url: "https://dev.to/odyslam/a-system-for-learning-in-public-with-roam-research-62h",
  publisher: "DEV Community",
  authors: ["Odysseas Lamtzidis"],
  notes:
    "A community member's shared-graph learning system — documents organic multiplayer use beyond the company-run book clubs.",
});
const brainfeed = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Roam's co-founder teaches me Roam Research — Conor White-Sullivan (The Peace Summit)",
  url: "https://brainfeed.ai/pages/roams-co-founder-teaches-me-roam-research-conor-white-sullivan-the-peace-summit--Aqg9.html",
  publisher: "Brainfeed",
  notes:
    "Third-party writeup of a recorded hands-on demo: creating and sharing a graph, block references, and the free-collaborator model.",
});
const techcrunch = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Huffington Post Hits 37 Million Monthly Visitors, 1 Billion Pageviews; Acquires Localocracy",
  url: "https://techcrunch.com/2011/10/03/huffington-post-hits-37-million-monthly-visitors-1-billion-pageviews-acquires-localocracy/",
  publisher: "TechCrunch",
  publishedAt: "2011-10-03",
  notes:
    "Company prehistory: the founders' prior startup, acquired by AOL's Huffington Post Media Group for reportedly under $1M.",
});

// --- reference --------------------------------------------------------------

const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Roam (software)",
  url: "https://en.wikipedia.org/wiki/Roam_(software)",
  publisher: "Wikipedia",
  notes:
    "Covers the product: 2019 release, directed-graph model, viewed as a Notion competitor.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Roam Research (Q98066309)",
  url: "https://www.wikidata.org/wiki/Q98066309",
  publisher: "Wikidata",
  notes:
    "Typed as knowledge-management software / SaaS, not as a company — the closest existing Wikidata anchor for the subject.",
});
const cbinsights = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Roam Research — Company profile and financials",
  url: "https://www.cbinsights.com/company/roam-research",
  publisher: "CB Insights",
  notes:
    "Lists founded year 2017 and $9M raised over 3 rounds with investors incl. Lux Capital, True Ventures, and the Collison brothers.",
});
const pitchbook = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Roam — Company profile: valuation, funding rounds, investors",
  url: "https://pitchbook.com/profiles/company/343764-28",
  publisher: "PitchBook",
  notes:
    "Records the May 2021 equity-crowdfunding deal at $994K and ~$12.4M raised to date — lower than contemporaneous press figures.",
});
const linkedinCompany = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Roam Research — LinkedIn company page",
  url: "https://www.linkedin.com/company/roam-research",
  publisher: "LinkedIn",
  notes:
    "Self-reported company profile: 1–10 employees, Oakland headquarters; also shows distributed team members across several countries.",
});
const linkedinJosh = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Joshua Brown — LinkedIn profile",
  url: "https://www.linkedin.com/in/joshua-brown-44412210a",
  publisher: "LinkedIn",
  notes: "Lists Roam Research co-founder from October 2017.",
});
const sixteenIdc = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Roam Research: Block-Based Bidirectional Knowledge Management",
  url: "https://www.16idc.com/en-us/provider-detail/roam-research",
  publisher: "16IDC",
  notes:
    "Aggregator profile that says 'founded 2018' and names the co-founder 'Josh Starcher' — kept as evidence of how messy directory data on the company is.",
});
const frontdeskreview = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Roam Research pricing — checked 2026-09-10",
  url: "https://frontdeskreview.com/software/note-taking-apps/roam-research/",
  publisher: "Front Desk Review",
  publishedAt: "2026",
  notes:
    "Independent re-read of the live pricing bundle: Pro $15/mo or $165/yr, Believer $500 per 5 years, 31-day trial — unchanged since 2020.",
});

// --- archive ----------------------------------------------------------------

const roamGardenWP = source({
  binding: "archive",
  mediaType: "webpage",
  title: "@White Paper — roam.garden mirror of the Roam Research white paper",
  url: "https://heckler.roam.garden/@white-paper/",
  publisher: "Roam Garden (heckler)",
  notes:
    "Public-graph mirror of the white paper; its editors' preface says it was written in winter 2017/2018 and that Bayesian-reasoning and prediction-market features were deprioritized.",
});

const S = {
  roamSite: roamSite.id,
  whitepaper: whitepaper.id,
  roamDepot: roamDepot.id,
  roamTools: roamTools.id,
  kitWrapped: kitWrapped.id,
  xRoam: xRoam.id,
  threadOrigin: threadOrigin.id,
  threadCompound: threadCompound.id,
  threadHiring: threadHiring.id,
  nesslabs: nesslabs.id,
  nesslabsTranscript: nesslabsTranscript.id,
  fortelabs: fortelabs.id,
  twentymvc: twentymvc.id,
  metamuse: metamuse.id,
  ventureStories: ventureStories.id,
  secFormC: secFormC.id,
  phWinners: phWinners.id,
  phAwards: phAwards.id,
  athens: athens.id,
  theInformation: theInformation.id,
  businessInsider: businessInsider.id,
  theHustle: theHustle.id,
  builtIn: builtIn.id,
  gbb: gbb.id,
  everyFall: everyFall.id,
  platformer: platformer.id,
  verge: verge.id,
  heyBookClub: heyBookClub.id,
  natEliason: natEliason.id,
  lfr4546: lfr4546.id,
  lfr48: lfr48.id,
  sunriseDigest: sunriseDigest.id,
  buildFirstBrain: buildFirstBrain.id,
  devTo: devTo.id,
  brainfeed: brainfeed.id,
  techcrunch: techcrunch.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  cbinsights: cbinsights.id,
  pitchbook: pitchbook.id,
  linkedinCompany: linkedinCompany.id,
  linkedinJosh: linkedinJosh.id,
  sixteenIdc: sixteenIdc.id,
  frontdeskreview: frontdeskreview.id,
  roamGardenWP: roamGardenWP.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-roam-research",
  generatedAt: "2026-09-17T04:30:00Z",
  subject: {
    kind: "organization",
    handle: "roam-research",
    displayName: "Roam Research",
    alsoKnownAs: ["Roam", "Roam Research, Inc."],
    summary:
      "The company behind Roam, the 'note-taking tool for networked thought.' Founded by Conor White-Sullivan and Joshua Brown around 2017, it turned bidirectional linking into the primitive that defined the tools-for-thought wave, built a famously cultish community (#RoamCult), raised a $9M seed at a $200M valuation plus a user crowdfunding round — and then watched the field it inspired run past it.",
    identity: {
      wikidataId: "Q98066309",
      officialSite: "https://roamresearch.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Roam_(software)",
      profiles: [
        "https://x.com/RoamResearch",
        "https://www.linkedin.com/company/roam-research",
        "https://github.com/Roam-Research",
        "https://www.producthunt.com/products/roam-research",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T04:30:00Z",
    coverage: [
      "history",
      "product",
      "funding",
      "philosophy",
      "community",
      "media",
    ],
  },
  sources: [
    roamSite,
    whitepaper,
    roamDepot,
    roamTools,
    kitWrapped,
    xRoam,
    threadOrigin,
    threadCompound,
    threadHiring,
    nesslabs,
    nesslabsTranscript,
    fortelabs,
    twentymvc,
    metamuse,
    ventureStories,
    secFormC,
    phWinners,
    phAwards,
    athens,
    theInformation,
    businessInsider,
    theHustle,
    builtIn,
    gbb,
    everyFall,
    platformer,
    verge,
    heyBookClub,
    natEliason,
    lfr4546,
    lfr48,
    sunriseDigest,
    buildFirstBrain,
    devTo,
    brainfeed,
    techcrunch,
    wikipedia,
    wikidata,
    cbinsights,
    pitchbook,
    linkedinCompany,
    linkedinJosh,
    sixteenIdc,
    frontdeskreview,
    roamGardenWP,
  ],
  claims: [
    // -- facts ----------------------------------------------------------------
    {
      id: "claim-founded-2017",
      kind: "fact",
      text: "Roam Research was founded around 2017: CB Insights records founded year 2017, Conor White-Sullivan's LinkedIn profile lists CEO/Founder from April 2017, and Joshua Brown's lists co-founder from October 2017. Earlier directory data and Conor's own 'five years in the wilderness' narrative stretch the project's origins back further.",
      sourceIds: [S.cbinsights, S.linkedinJosh, S.threadOrigin, S.sixteenIdc],
    },
    {
      id: "claim-founders",
      kind: "fact",
      text: "The company was founded by Conor White-Sullivan and Joshua (Josh) Brown, who met at 42, the tuition-free coding school where Conor had free housing during the wilderness years. One aggregator (16IDC) misidentifies the co-founder as 'Josh Starcher.'",
      sourceIds: [S.threadOrigin, S.roamGardenWP, S.theHustle, S.sixteenIdc],
    },
    {
      id: "claim-whitepaper-written",
      kind: "fact",
      text: "The Roam white paper — co-authored by White-Sullivan and business journalist Richard Meadows, whose trial of early prototypes made him the first investor — was written in winter 2017/2018 and later published inside Roam's own help graph.",
      sourceIds: [S.roamGardenWP, S.whitepaper],
    },
    {
      id: "claim-release-2019",
      kind: "fact",
      text: "Roam the product was released in 2019 and opened to early users as a free beta; it grew virally until scaling problems — including disappearing data — forced a waitlist. The first public discussion of the product was Conor's December 17, 2019 interview with Tiago Forte.",
      sourceIds: [S.wikipedia, S.theHustle, S.gbb, S.fortelabs],
    },
    {
      id: "claim-product-model",
      kind: "fact",
      text: "Roam is an outliner built on a directed graph rather than a file tree: every bullet is a block with its own identity, pages are created by double-bracket links, backlinks accumulate automatically, and queries (a Datalog-like syntax) retrieve blocks across the graph.",
      sourceIds: [S.wikipedia, S.whitepaper, S.builtIn, S.sunriseDigest],
    },
    {
      id: "claim-clojure-shop",
      kind: "fact",
      text: "Roam is built in Clojure/ClojureScript; the company's hiring benchmark for UI engineers was solving the 7GUIs tasks in ClojureScript, ideally with Reagent.",
      sourceIds: [S.threadHiring],
    },
    {
      id: "claim-product-hunt-launch",
      kind: "fact",
      text: "Roam's formal Product Hunt launch on January 11, 2020 took #1 product of the day.",
      sourceIds: [S.phAwards],
    },
    {
      id: "claim-paid-plans",
      kind: "fact",
      text: "Paid plans launched in June 2020: Professional at $15/month — roughly 4x Notion's comparable plan at the time — plus a $500 five-year 'Believer' tier, behind a 14-day trial with almost no onboarding. The pricing page leaned into the mythology with 'Gates of Roam' and 'scholar' copy.",
      sourceIds: [S.gbb],
    },
    {
      id: "claim-seed-round",
      kind: "fact",
      text: "In September 2020 Roam raised a $9M seed at a $200M valuation — about 25x the median seed valuation. Reported backers include Lux Capital, True Ventures, Patrick and John Collison, and others; no single lead investor was disclosed publicly. At the time the team was about 11 people.",
      sourceIds: [S.theInformation, S.cbinsights, S.theHustle, S.builtIn],
    },
    {
      id: "claim-arr-profitable",
      kind: "fact",
      text: "CEO Conor White-Sullivan told The Information in September 2020 that Roam had about $1M in annual recurring revenue and was already profitable — figures reported but never independently audited.",
      sourceIds: [S.platformer, S.theInformation],
    },
    {
      id: "claim-yc-rejected",
      kind: "fact",
      text: "The idea for Roam was rejected five times by Y Combinator before the company's rise, The Hustle reported.",
      sourceIds: [S.theHustle],
    },
    {
      id: "claim-roamcult",
      kind: "fact",
      text: "Users organized under the hashtag #RoamCult — a community of academics, engineers, and artists trading tips, courses, and extensions on Twitter and a community Slack. The company embraced the framing ('Citizens of Roam,' the Believer plan's proximity perks).",
      sourceIds: [S.builtIn, S.gbb],
    },
    {
      id: "claim-community-did-onboarding",
      kind: "fact",
      text: "Conor acknowledged in February 2021 that 'without a doubt, the best tutorials, guides, case studies, and explanations of what Roam is have all come from the #RoamCult' — the community functioned as the company's documentation and marketing.",
      sourceIds: [S.threadCompound, S.gbb, S.natEliason],
    },
    {
      id: "claim-book-club",
      kind: "fact",
      text: "From August 2020 the company ran Roam Book Club as a public multiplayer-graph experiment; at RBC2 more than 1,700 people signed up and roughly 200 edited one graph simultaneously on the kickoff call, badly straining performance.",
      sourceIds: [S.heyBookClub],
    },
    {
      id: "claim-multiplayer-shipped",
      kind: "fact",
      text: "Same-graph real-time collaboration ('multiplayer mode') existed from the beta era — Conor described Roam as 'real-time collaborative' in mid-2020 while framing near-term focus as single-player — and shared graphs later became a standard paid feature.",
      sourceIds: [S.nesslabsTranscript, S.heyBookClub, S.devTo, S.frontdeskreview],
    },
    {
      id: "claim-roam-games",
      kind: "fact",
      text: "In January 2021 the company announced #RoamGames: a new public challenge roughly every two weeks for three months, distributing $10,000 per challenge — in cash or, if legal, Roam stock — to work pushing the tools-for-thought frontier.",
      sourceIds: [S.threadOrigin, S.threadCompound],
    },
    {
      id: "claim-profitability-tweet",
      kind: "fact",
      text: "Conor tweeted in February 2021 that Roam 'hit profitability last year,' and that with profitability the company's focus shifted back to R&D on collective intelligence — a self-reported figure never independently audited.",
      sourceIds: [S.threadCompound],
    },
    {
      id: "claim-golden-kitty",
      kind: "fact",
      text: "Roam was nominated for Product Hunt's 2020 Product of the Year and Conor publicly rallied the #RoamCult to 'vote early, vote often.' Product Hunt's official winners post names Clubhouse the winner with Roam an honorable-mention runner-up — yet Roam's Product Hunt product page carries a 'Product of the Year 2020' badge. The platform's own records disagree.",
      sourceIds: [S.phWinners, S.phAwards, S.threadOrigin],
    },
    {
      id: "claim-community-round",
      kind: "fact",
      text: "In April 2021 Roam invited paying users into a Wefunder community round with a $500,000 target; it was oversubscribed within an hour and pulled in over $1.6M in pledges per Business Insider, while the finalized Reg CF raise recorded by PitchBook and Wefunder tallies is $994,295 from 756 investors — at the same $200M valuation. Roam Research, Inc. filed a Form C with the SEC.",
      sourceIds: [S.businessInsider, S.secFormC, S.pitchbook],
    },
    {
      id: "claim-depot-launch",
      kind: "fact",
      text: "Roam Depot, the company's vetted extension marketplace with revenue sharing for developers, went live around July 2022; the community's 56 RoamJS extensions were slated for consolidation into 29 Depot extensions.",
      sourceIds: [S.lfr4546, S.lfr48, S.roamDepot],
    },
    {
      id: "claim-hq-delaware-oakland",
      kind: "fact",
      text: "The company is incorporated in Delaware (per its SEC filing) and lists Oakland, California as headquarters on LinkedIn, which shows a 1–10 employee band — down to that scale from roughly 11 people in 2020.",
      sourceIds: [S.secFormC, S.linkedinCompany, S.theHustle],
    },
    {
      id: "claim-compound",
      kind: "fact",
      text: "The team lived and worked together at what Conor called the 'Roam Compound,' five minutes from off-road trails — the 'technical ashram' ideal he had wanted since the wilderness years; he has said he chooses to live with the team.",
      sourceIds: [S.threadCompound, S.twentymvc],
    },
    {
      id: "claim-hiring-philosophy",
      kind: "fact",
      text: "Roam's hiring practice, as described publicly: a public 7GUIs code benchmark, paid take-home projects, no salary negotiation, Bay-Area-level pay regardless of location, and equity set above roughly 90% of comparable startups.",
      sourceIds: [S.threadHiring],
    },
    {
      id: "claim-still-shipping-2026",
      kind: "fact",
      text: "The product still operates: pricing is unchanged ($15/mo Pro, $165/yr, $500 five-year Believer, 31-day trial as of September 2026), the official newsletter published through 2025, and the company created a public roam-tools repo in January 2026 shipping an official MCP server and CLI — an agent-tooling direction.",
      sourceIds: [S.frontdeskreview, S.kitWrapped, S.roamTools],
    },
    {
      id: "claim-fall-of-roam",
      kind: "fact",
      text: "By February 2022, Dan Shipper's widely read 'The Fall of Roam' captured a sentiment reversal — slow product velocity, no good mobile experience, 'well-documented community issues' — as rivals absorbed Roam's signature features.",
      sourceIds: [S.everyFall],
    },
    {
      id: "claim-dev-crawl",
      kind: "fact",
      text: "By August 2023, Casey Newton — an early $500 Believer who once called Roam the biggest leap in knowledge work since Evernote — wrote in The Verge that 'Roam's development slowed to a crawl' and that its promise to improve his thinking 'fizzled completely.'",
      sourceIds: [S.verge, S.platformer],
    },
    // -- stated beliefs --------------------------------------------------------
    {
      id: "claim-networked-thought",
      kind: "stated_belief",
      text: "The company's framing: Roam is 'a note taking tool for networked thought' — built on the premise that knowledge is a graph, not a hierarchy, and that the file-cabinet model of folders and taxonomies mismatches how minds actually associate.",
      sourceIds: [S.roamSite, S.whitepaper, S.builtIn],
    },
    {
      id: "claim-writing-is-thinking",
      kind: "stated_belief",
      text: "'Writing is a tool for thinking': a better medium for writing is a cognitive prosthetic that lets people think thoughts they could not otherwise think — the premise the white paper builds on and Conor still gives as the product's reason to exist in 2023.",
      sourceIds: [S.whitepaper, S.metamuse, S.nesslabsTranscript],
    },
    {
      id: "claim-collective-intelligence-mission",
      kind: "stated_belief",
      text: "Conor frames the company's real mission as collective intelligence — tools for shared mental maps, argument structure, and group decision-making — a motivation he dates to about 2008 and to his Localocracy work, and calls 'the real thing that has been motivating me for at least the last 15 years' (2023).",
      sourceIds: [S.metamuse, S.nesslabsTranscript, S.whitepaper],
    },
    {
      id: "claim-bayesian-deprioritized",
      kind: "stated_belief",
      text: "The white paper promised weightings for Bayesian inference, argument analysis, and prediction markets; the editors' preface concedes these proved 'much lower priority' for the researchers and decision-makers the tool aims to serve — the shipped product stayed a writing tool.",
      sourceIds: [S.roamGardenWP, S.whitepaper],
    },
    {
      id: "claim-cognitive-prosthetic",
      kind: "stated_belief",
      text: "Conor describes building Roam 'as a sort of cognitive prosthetic' — an extension of his own working memory developed around severe ADHD — and casts it in a lineage with telescopes, mathematical notation, and programming languages as media for otherwise-unthinkable thoughts.",
      sourceIds: [S.metamuse],
    },
    {
      id: "claim-fifty-year-project",
      kind: "stated_belief",
      text: "In mid-2020 Conor published a note framing the company as 'at least a 50 year project' and his 'life's work' — long-horizon rhetoric the pricing and crowdfunding design were built to match.",
      sourceIds: [S.gbb],
    },
    {
      id: "claim-copiers-missed-point",
      kind: "stated_belief",
      text: "Conor's 2023 assessment of the clone wave: 'none of the folks who have supposedly copied us have copied the things that I think are actually important' — the links they copied are not, in his view, the point of the tool.",
      sourceIds: [S.metamuse],
    },
    // -- patterns ---------------------------------------------------------------
    {
      id: "claim-pattern-community-moat",
      kind: "pattern",
      text: "The company's growth engine was the community itself: unpaid power users wrote the tutorials, taught $200 courses, ran the Slack, and built the extension ecosystem — an arrangement analysts called 'cult packaging' and the company formalized with the proximity-priced Believer plan.",
      sourceIds: [S.gbb, S.builtIn, S.natEliason, S.lfr4546],
    },
    {
      id: "claim-pattern-feature-moat-drained",
      kind: "pattern",
      text: "Every post-mortem reads the same: Roam's signature features (bidirectional links, block references, daily notes, graph view) were copied fast by free or cheaper rivals — Obsidian, Logseq, Tana, Notion, Mem — so the feature-moat drained while shipping velocity stayed low.",
      sourceIds: [S.everyFall, S.verge, S.sunriseDigest, S.buildFirstBrain, S.platformer],
    },
    {
      id: "claim-pattern-self-narrated",
      kind: "pattern",
      text: "Much of the canonical company record is self-narrated by its founder: the wilderness-years origin, the profitability claim, the Compound, the hiring rules, and the mission statements all trace to Conor's threads and interviews rather than independent reporting.",
      sourceIds: [S.threadOrigin, S.threadCompound, S.threadHiring, S.metamuse],
    },
    {
      id: "claim-pattern-pricing-as-filter",
      kind: "pattern",
      text: "Premium pricing functioned as a conviction filter — screening for obsessive users over market share — and it barely moved afterward: six years on, the same $15/month and $500 Believer tiers are still the whole offer.",
      sourceIds: [S.gbb, S.frontdeskreview, S.sunriseDigest],
    },
    // -- speculation -------------------------------------------------------------
    {
      id: "claim-spec-community-round-purpose",
      kind: "speculation",
      text: "The 2021 community round reads more like community-building than fundraising — Business Insider noted the size was too small to circumvent VCs — consistent with a company that had already told press it was profitable.",
      sourceIds: [S.businessInsider, S.platformer],
    },
    {
      id: "claim-spec-abandoned-or-maintained",
      kind: "speculation",
      text: "Whether Roam is 'abandoned' or 'maintained' depends on the standard: the service runs, pricing and newsletter are live, and agent tooling (MCP/CLI) shipped in 2026 — but no major user-facing feature era has arrived since Depot in 2022, and outside reviewers read it as a product parked at its 2020-2021 peak.",
      sourceIds: [S.roamTools, S.kitWrapped, S.frontdeskreview, S.sunriseDigest, S.everyFall],
    },
    {
      id: "claim-spec-believer-reckoning",
      kind: "speculation",
      text: "The five-year Believer cohort's renewals came due starting in 2025 — an unobserved stress test for a business whose $500 prepays were sold on proximity to a team that has since gone quiet on the public roadmap.",
      sourceIds: [S.gbb, S.frontdeskreview, S.sunriseDigest],
    },
  ],
  timeline: [
    {
      id: "event-prehistory-localocracy",
      kind: "other",
      date: "2008",
      title: "Founder begins collective-intelligence work",
      summary:
        "Conor White-Sullivan dates his interest in collective intelligence to about 2008; his first company, Localocracy, crowdsourced pros and cons on local policy.",
      sourceIds: [S.nesslabsTranscript, S.techcrunch],
    },
    {
      id: "event-localocracy-acquired",
      kind: "other",
      date: "2011-10-03",
      title: "Localocracy acquired by AOL's Huffington Post Media Group",
      summary:
        "The founders' prior startup was acquired for reportedly under $1M; White-Sullivan went on to co-found HuffPost Labs before the 'wilderness years' building Roam's first version.",
      sourceIds: [S.techcrunch, S.threadOrigin, S.twentymvc],
    },
    {
      id: "event-founded",
      kind: "founded",
      date: "2017",
      title: "Roam Research founded",
      summary:
        "Conor White-Sullivan starts the company (his LinkedIn says April 2017); Joshua Brown joins as co-founder in October 2017 after they met at 42. The product's origins reach back further into the 'five years in the wilderness' Conor narrates.",
      sourceIds: [S.cbinsights, S.linkedinJosh, S.threadOrigin],
    },
    {
      id: "event-whitepaper",
      kind: "publication",
      date: "2018",
      title: "White paper written",
      summary:
        "'A note taking tool for networked thought,' co-authored with first investor Richard Meadows in winter 2017/2018; later published inside Roam's public help graph.",
      sourceIds: [S.roamGardenWP, S.whitepaper],
    },
    {
      id: "event-beta-release",
      kind: "project",
      date: "2019",
      title: "Roam released; early beta opens",
      summary:
        "The product launched to early users in late 2019 and went viral; scaling problems — including reports of disappearing data — forced a waitlist.",
      sourceIds: [S.wikipedia, S.theHustle, S.gbb],
    },
    {
      id: "event-forte-interview",
      kind: "media",
      date: "2019-12-17",
      title: "First public discussion of Roam (Tiago Forte interview)",
      summary:
        "An hour-long interview, demonstration, and debate — the company's first public product discussion.",
      sourceIds: [S.fortelabs],
    },
    {
      id: "event-product-hunt-launch",
      kind: "milestone",
      date: "2020-01-11",
      title: "Product Hunt launch — #1 product of the day",
      sourceIds: [S.phAwards],
    },
    {
      id: "event-paid-plans",
      kind: "milestone",
      date: "2020-06",
      title: "Paid plans launch: Pro $15/mo, Believer $500/5yr",
      summary:
        "The 'cult packaging' pricing model — premium Pro, five-year Believer with team proximity perks, 14-day trial — drew mockery and loyalty in equal measure.",
      sourceIds: [S.gbb],
    },
    {
      id: "event-book-club",
      kind: "project",
      date: "2020-08",
      title: "Roam Book Club begins",
      summary:
        "A company-run multiplayer-graph experiment starting with 'Where Good Ideas Come From'; RBC2 drew 1,700+ signups and ~200 people editing one graph at once.",
      sourceIds: [S.heyBookClub],
    },
    {
      id: "event-seed-round",
      kind: "milestone",
      date: "2020-09-11",
      title: "$9M seed at $200M valuation",
      summary:
        "About 25x the median seed valuation; reported backers include Lux Capital, True Ventures, and Patrick and John Collison. Team of ~11 at the time.",
      sourceIds: [S.theInformation, S.cbinsights, S.theHustle],
    },
    {
      id: "event-golden-kitty",
      kind: "award",
      date: "2021-01-28",
      title: "Golden Kitty Product of the Year 2020 — runner-up",
      summary:
        "Clubhouse won; Roam was an honorable-mention runner-up per Product Hunt's winners post — though Roam's own product page later displays a 'Product of the Year 2020' badge. Conor rallied the #RoamCult to vote.",
      sourceIds: [S.phWinners, S.phAwards, S.threadOrigin],
    },
    {
      id: "event-roam-games",
      kind: "project",
      date: "2021-01",
      title: "#RoamGames announced",
      summary:
        "A public challenge roughly every two weeks for three months, $10,000 distributed per challenge to work pushing the tools-for-thought frontier.",
      sourceIds: [S.threadOrigin, S.threadCompound],
    },
    {
      id: "event-wefunder",
      kind: "milestone",
      date: "2021-04",
      title: "Community crowdfunding round oversubscribed",
      summary:
        "Paying users invited into a Wefunder Reg CF round targeting $500K; oversubscribed within an hour, $1.6M+ pledged per press, $994,295 from 756 investors finalized per aggregator records. SEC Form C filed.",
      sourceIds: [S.businessInsider, S.secFormC, S.pitchbook],
    },
    {
      id: "event-fall-of-roam",
      kind: "media",
      date: "2022-02-11",
      title: "'The Fall of Roam' published",
      summary:
        "Dan Shipper's essay marks the public sentiment reversal: slow product velocity, weak mobile experience, community issues — as rivals absorbed the signature features.",
      sourceIds: [S.everyFall],
    },
    {
      id: "event-depot",
      kind: "project",
      date: "2022-07",
      title: "Roam Depot extension store goes live",
      summary:
        "Vetted in-app extension marketplace with developer revenue sharing; the community's RoamJS extensions began consolidating into it.",
      sourceIds: [S.lfr4546, S.lfr48, S.roamDepot],
    },
    {
      id: "event-verge-reassessment",
      kind: "media",
      date: "2023-08-25",
      title: "The Verge: 'note-taking apps don't make us smarter'",
      summary:
        "Early Believer Casey Newton publicly moves on: 'Roam's development slowed to a crawl.'",
      sourceIds: [S.verge],
    },
    {
      id: "event-roam-tools",
      kind: "project",
      date: "2026-01",
      title: "Official MCP server and CLI shipped",
      summary:
        "The company opened Roam-Research/roam-tools (created January 2026, actively committed through September 2026): agent-facing tooling for the graph — the clearest sign of life in years.",
      sourceIds: [S.roamTools],
    },
  ],
  themes: [
    {
      id: "theme-networked-thought",
      kind: "philosophy",
      status: "stated",
      title: "Networked thought, not files",
      summary:
        "The founding claim: minds associate, file cabinets hierarchize. Roam replaces the tree with a directed graph where every block can occupy multiple positions and every link runs both ways — 'a note taking tool for networked thought.'",
      sourceIds: [S.roamSite, S.whitepaper, S.roamGardenWP, S.builtIn],
    },
    {
      id: "theme-bidirectional-primitive",
      kind: "method",
      status: "stated",
      title: "Bidirectional linking as the primitive",
      summary:
        "Double-bracket a phrase and it becomes a page that gathers its own mentions; blocks can be referenced and remixed anywhere. Roam did not invent the backlink — Bush's memex and wikis precede it — but it made it the atomic unit of a mainstream product.",
      sourceIds: [S.builtIn, S.everyFall, S.platformer, S.whitepaper],
    },
    {
      id: "theme-collective-intelligence",
      kind: "belief",
      status: "stated",
      title: "The real mission is collective intelligence",
      summary:
        "From the white paper's 'shared mental maps' and Bayesian argument graphs to Conor's 2023 interviews, the stated endgame was never notes — it was group reasoning and a new coordination medium. The personal tool was the wedge.",
      sourceIds: [S.whitepaper, S.roamGardenWP, S.metamuse, S.nesslabsTranscript],
    },
    {
      id: "theme-community-as-moat",
      kind: "practice",
      status: "reported",
      title: "Community as the moat",
      summary:
        "Analysts read the Believer plan, 'Gates of Roam' copy, and #RoamCult rituals as deliberate cult packaging: obsessive users over market share, with the community itself producing onboarding, courses, and extensions the company never had to build.",
      sourceIds: [S.gbb, S.builtIn, S.threadCompound, S.businessInsider],
    },
    {
      id: "theme-long-horizon",
      kind: "practice",
      status: "stated",
      title: "A fifty-year, self-funded-feeling company",
      summary:
        "Conor framed Roam as 'at least a 50 year project' and his 'life's work'; the five-year Believer prepay, early profitability claims, and letting users buy equity were all built to keep the company independent on its own clock.",
      sourceIds: [S.gbb, S.businessInsider, S.threadCompound],
    },
    {
      id: "theme-tools-for-thought-catalyst",
      kind: "influence",
      status: "reported",
      title: "The catalyst of the tools-for-thought wave",
      summary:
        "Reviewers and historians of the space credit Roam with the category: 'Without Roam, there is no Obsidian, no Logseq, no Tana, no Reflect.' Athens launched as the open-source answer (YC W21); Logseq was long called 'free Roam.' The copied features outlived the copier's momentum — and outlived Athens itself, now unmaintained.",
      sourceIds: [S.sunriseDigest, S.platformer, S.athens, S.verge],
    },
    {
      id: "theme-pricing-conviction",
      kind: "method",
      status: "reported",
      title: "Pricing as a conviction filter",
      summary:
        "A $15/month premium — 4x the Notion comparison at launch — plus a $500 five-year prepay was designed to screen for believers rather than maximize seats. Six years later the same numbers are still the entire offer, which reads either as discipline or stasis.",
      sourceIds: [S.gbb, S.frontdeskreview, S.sunriseDigest],
    },
    {
      id: "theme-multiplayer-maps",
      kind: "philosophy",
      status: "stated",
      title: "Shared graphs, shared mental maps",
      summary:
        "Multiplayer was the mission wearing a feature's clothes: same-graph real-time editing powered the company's own book clubs (hundreds editing one graph), and the white paper's destination was always cross-graph collaborative reasoning — a goal Conor conceded stayed out of reach.",
      sourceIds: [S.whitepaper, S.nesslabsTranscript, S.heyBookClub, S.metamuse],
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
        "The outliner-on-a-directed-graph note-taking tool: bidirectional links, block references, daily notes, Datalog-style queries, shared multiplayer graphs. Still operated and sold at unchanged 2020 pricing.",
      sourceIds: [S.roamSite, S.wikipedia, S.frontdeskreview],
    },
    {
      id: "work-whitepaper",
      kind: "paper",
      status: "published",
      title: "Roam Research white paper",
      date: "2018",
      summary:
        "The founding document by White-Sullivan and Richard Meadows, written winter 2017/2018: the directed-graph model, Bayesian-reasoning ambitions, and the collaborative-reasoning endgame — hosted inside Roam's own help graph.",
      sourceIds: [S.whitepaper, S.roamGardenWP],
    },
    {
      id: "work-multiplayer",
      kind: "product",
      status: "released",
      title: "Multiplayer shared graphs",
      date: "2020",
      summary:
        "Same-graph real-time collaboration — present from the beta era, stress-tested publicly through Roam Book Club, and later a standard paid feature with unlimited free collaborators.",
      sourceIds: [S.nesslabsTranscript, S.heyBookClub, S.devTo, S.brainfeed],
    },
    {
      id: "work-depot",
      kind: "product",
      status: "released",
      title: "Roam Depot",
      date: "2022",
      summary:
        "The in-app marketplace for vetted community extensions, with developer revenue sharing; absorbed much of the volunteer-built RoamJS ecosystem.",
      sourceIds: [S.roamDepot, S.lfr4546, S.lfr48],
    },
    {
      id: "work-book-club",
      kind: "project",
      status: "completed",
      title: "Roam Book Club",
      date: "2020",
      summary:
        "The company-run public multiplayer experiment — RBC1 through RBC4 plus a planned 2022 revival — that stress-tested shared graphs at hundreds of concurrent editors.",
      sourceIds: [S.heyBookClub, S.lfr4546],
    },
    {
      id: "work-roam-games",
      kind: "project",
      status: "completed",
      title: "#RoamGames",
      date: "2021",
      summary:
        "A fortnightly public-challenge series paying out $10,000 per round to frontier-pushing tools-for-thought work.",
      sourceIds: [S.threadOrigin, S.threadCompound],
    },
    {
      id: "work-roam-tools",
      kind: "product",
      status: "in_progress",
      title: "roam-tools (official MCP server and CLI)",
      date: "2026",
      summary:
        "Agent-facing tooling published under Roam-Research/roam-tools from January 2026 — @roam-research/roam-mcp, roam-cli, and a roam-syntax skill — the company's first visible new engineering direction in years.",
      sourceIds: [S.roamTools],
    },
    {
      id: "work-commentarii",
      kind: "other",
      status: "ongoing",
      title: "Commentarii Roamani",
      summary:
        "The company's newsletter — product updates, power-user workflows, and extension spotlights — still publishing through the '2025 Roam Wrapped' issue.",
      sourceIds: [S.kitWrapped],
    },
  ],
  appearances: [
    {
      id: "appearance-fortelabs",
      title: "Interview with Conor White-Sullivan, Founder of Roam",
      venue: "Forte Labs",
      publishedAt: "2019-12-17",
      participants: ["Conor White-Sullivan", "Tiago Forte"],
      summary:
        "An hour-long interview, demonstration, and debate — the company's first public discussion of the product.",
      media: [
        {
          type: "article",
          url: "https://fortelabs.com/blog/interview-with-conor-white-sullivan-founder-of-roam/",
          sourceId: S.fortelabs,
        },
      ],
      sourceIds: [S.fortelabs],
    },
    {
      id: "appearance-nesslabs",
      title: "Getting compound interest on your thoughts",
      venue: "Ness Labs (Mindful Makers)",
      publishedAt: "2020",
      participants: ["Conor White-Sullivan", "Anne-Laure Le Cunff"],
      summary:
        "The collective-intelligence origin story — Localocracy, the syntopicon dream — and the state of multiplayer at the time; published with a full transcript.",
      media: [
        {
          type: "article",
          url: "https://nesslabs.com/conor-white-sullivan-interview",
          sourceId: S.nesslabs,
        },
        {
          type: "transcript",
          url: "https://nesslabs.com/conor-white-sullivan-transcript",
          sourceId: S.nesslabsTranscript,
        },
      ],
      sourceIds: [S.nesslabs, S.nesslabsTranscript],
    },
    {
      id: "appearance-20vc",
      title: "20VC with Harry Stebbings",
      venue: "The Twenty Minute VC",
      publishedAt: "2020-05-07",
      participants: ["Conor White-Sullivan", "Harry Stebbings"],
      summary:
        "Product-design philosophy ('low floors and high ceilings'), living with the team, and applying a Tesla-style go-to-market to Roam.",
      media: [
        {
          type: "audio",
          url: "https://www.thetwentyminutevc.com/conorwhitesullivan",
          sourceId: S.twentymvc,
        },
      ],
      sourceIds: [S.twentymvc],
    },
    {
      id: "appearance-metamuse",
      title: "Collective intelligence with Conor White-Sullivan (episode 75)",
      venue: "Metamuse",
      publishedAt: "2023-03-02",
      participants: [
        "Conor White-Sullivan",
        "Adam Wiggins",
        "Mark McGranaghan",
      ],
      summary:
        "The 2023 state of the mission: Roam as cognitive prosthetic and programming medium, the collective-intelligence endgame, and why the clones 'copied the wrong things.'",
      media: [
        {
          type: "audio",
          url: "https://allume.com/podcast/75-collective-intelligence/",
          sourceId: S.metamuse,
        },
      ],
      sourceIds: [S.metamuse],
    },
    {
      id: "appearance-venture-stories",
      title: "Creating Tools For Networked Thought (Venture Stories)",
      venue: "Venture Stories / Podcast Notes",
      participants: ["Conor White-Sullivan", "Erik Torenberg"],
      summary:
        "Podcast interview on personal knowledge graphs and compound interest on past writing; preserved via Podcast Notes' episode writeup.",
      media: [
        {
          type: "article",
          url: "https://podcastnotes.org/venture-stories/conor-white-sullivan/",
          sourceId: S.ventureStories,
        },
      ],
      sourceIds: [S.ventureStories],
    },
    {
      id: "appearance-peace-summit",
      title: "Roam's co-founder teaches me Roam Research",
      venue: "The Peace Summit (via Brainfeed)",
      participants: ["Conor White-Sullivan"],
      summary:
        "A recorded hands-on demo — building a shared quotes graph, block references, queries — that also documents the free-collaborator model: graph admins pay, collaborators edit free.",
      media: [
        {
          type: "article",
          url: "https://brainfeed.ai/pages/roams-co-founder-teaches-me-roam-research-conor-white-sullivan-the-peace-summit--Aqg9.html",
          sourceId: S.brainfeed,
        },
      ],
      sourceIds: [S.brainfeed],
    },
  ],
  relations: [
    {
      id: "rel-conor-white-sullivan",
      kind: "founded_by",
      target: "conor-white-sullivan",
      targetName: "Conor White-Sullivan",
      targetKind: "person",
      note:
        "Co-founder and CEO; narrates the company's origins — the wilderness years, the Compound, profitability — in his own threads and interviews.",
      sourceIds: [S.threadOrigin, S.theHustle, S.twentymvc],
    },
    {
      id: "rel-joshua-brown",
      kind: "founded_by",
      target: "joshua-brown",
      targetName: "Joshua Brown",
      targetKind: "person",
      note:
        "Co-founder; met White-Sullivan at the 42 coding school and is listed as co-founder from October 2017 on LinkedIn. One aggregator misnames him 'Josh Starcher.'",
      sourceIds: [S.linkedinJosh, S.threadOrigin, S.sixteenIdc],
    },
    {
      id: "rel-richard-meadows",
      kind: "other",
      target: "richard-meadows",
      targetName: "Richard Meadows",
      targetKind: "person",
      note:
        "Business journalist who co-authored the white paper; his trial of the early prototypes made him Roam's first investor. No dedicated 'investor'/'backer' relation kind exists.",
      sourceIds: [S.roamGardenWP, S.whitepaper],
    },
    {
      id: "rel-lux-capital",
      kind: "other",
      target: "lux-capital",
      targetName: "Lux Capital",
      targetKind: "organization",
      note: "Reported participant in the September 2020 $9M seed at a $200M valuation.",
      sourceIds: [S.theInformation, S.cbinsights],
    },
    {
      id: "rel-true-ventures",
      kind: "other",
      target: "true-ventures",
      targetName: "True Ventures",
      targetKind: "organization",
      note: "Reported participant in the September 2020 seed round.",
      sourceIds: [S.cbinsights, S.theInformation],
    },
    {
      id: "rel-patrick-collison",
      kind: "other",
      target: "patrick-collison",
      targetName: "Patrick Collison",
      targetKind: "person",
      note: "Stripe co-founder; reported seed-round backer alongside his brother John.",
      sourceIds: [S.theInformation, S.cbinsights],
    },
    {
      id: "rel-john-collison",
      kind: "other",
      target: "john-collison",
      targetName: "John Collison",
      targetKind: "person",
      note: "Reported seed-round backer alongside his brother Patrick.",
      sourceIds: [S.cbinsights, S.theInformation],
    },
    {
      id: "rel-wefunder",
      kind: "other",
      target: "wefunder",
      targetName: "Wefunder",
      targetKind: "organization",
      note:
        "Hosted the April 2021 Regulation Crowdfunding community round that let paying users buy equity at the same $200M valuation.",
      sourceIds: [S.businessInsider, S.secFormC],
    },
    {
      id: "rel-42",
      kind: "other",
      target: "42",
      targetName: "42",
      targetKind: "organization",
      note:
        "The tuition-free coding school where the co-founders met — 'after years of searching 42 was where I found Josh.'",
      sourceIds: [S.threadOrigin],
    },
    {
      id: "rel-localocracy",
      kind: "other",
      target: "localocracy",
      targetName: "Localocracy",
      targetKind: "organization",
      note:
        "White-Sullivan's prior company — an 'online town common' for civic collective intelligence — acquired by AOL's Huffington Post Media Group in 2011; the ancestral form of Roam's mission.",
      sourceIds: [S.techcrunch, S.nesslabsTranscript],
    },
    {
      id: "rel-obsidian",
      kind: "influenced",
      target: "obsidian",
      targetName: "Obsidian",
      targetKind: "organization",
      note:
        "The free, local-first Markdown rival whose bidirectional links and daily notes followed Roam's; named by both Casey Newton and later reviewers as Roam-inspired.",
      sourceIds: [S.platformer, S.sunriseDigest, S.verge],
    },
    {
      id: "rel-logseq",
      kind: "influenced",
      target: "logseq",
      targetName: "Logseq",
      targetKind: "organization",
      note:
        "The open-source, local-first outliner long described as 'free Roam'; one of the products reviewers say would not exist without it.",
      sourceIds: [S.sunriseDigest],
    },
    {
      id: "rel-athens-research",
      kind: "influenced",
      target: "athens-research",
      targetName: "Athens Research",
      targetKind: "organization",
      note:
        "The YC W21-backed open-source knowledge graph built in Roam's mold; its repo now reads 'Athens is no longer being actively maintained' — the copied outlasted the copier.",
      sourceIds: [S.athens],
    },
    {
      id: "rel-tana",
      kind: "influenced",
      target: "tana",
      targetName: "Tana",
      targetKind: "organization",
      note:
        "The supertag-based workspace counted among the products Roam's networked-thought model made possible.",
      sourceIds: [S.sunriseDigest],
    },
  ],
  openQuestions: [
    "Current headcount is unknown: LinkedIn's self-reported band is 1–10 employees (vs. ~11 in late 2020); no public record shows who still works there or whether Joshua Brown remains involved day to day.",
    "Current usage and revenue have never been disclosed post-2021; the only profitability claim is the founder's own ('hit profitability last year,' February 2021).",
    "Abandoned vs. maintained: the service, pricing, and newsletter remain live and agent tooling (MCP/CLI) shipped in 2026, but no major user-facing feature era has arrived since Roam Depot in 2022 — the record cannot settle whether this is a maintenance-mode business or a slow R&D phase.",
    "Founding date varies by source: CB Insights and the founders' LinkedIn profiles point to 2017; one aggregator says 2018; the product shipped in 2019; and Conor's own 'five years in the wilderness' narrative pushes origins to ~2014.",
    "The 2021 community round's final amount conflicts across sources: press reported $1.6M+ pledged within a day, while finalized records (PitchBook, Wefunder tallies) show $994,295 from 756 investors — pledge count vs. booked amount is unresolved.",
    "Directory data on the company is unreliable: 16IDC names the co-founder 'Josh Starcher' (actual: Joshua Brown) and aggregator funding totals disagree ($10.6M Caplight vs. $12.4M PitchBook vs. $9M+community round implied by press).",
    "Product Hunt's own records disagree on the 2020 Golden Kitty: the winners post names Clubhouse Product of the Year with Roam a runner-up, while Roam's product page carries a 'Product of the Year 2020' badge.",
    "Whether the white paper's endgame — cross-graph collaborative reasoning, shared mental maps, Bayesian tooling — shipped, stalled, or was silently dropped is not addressed by any current official statement.",
    "No dedicated Wikidata item for the company exists; the QID used here (Q98066309) is typed as software/SaaS, conflating the product with the organization.",
  ],
  body: `Roam Research is the company behind Roam, the "note-taking tool for networked thought" that, for about eighteen months in 2020–2021, was the most talked-about productivity startup in Silicon Valley. It is the rare organization whose influence vastly exceeds its current footprint: the bidirectional link, the block reference, and the daily note it popularized are now standard features of an entire software category — and most of the products that won that category are not Roam.

## Origins

The official record and the founder's narration differ in instructive ways. CB Insights records a 2017 founding; Conor White-Sullivan's LinkedIn lists CEO/Founder from April 2017 and Joshua Brown's lists co-founder from October 2017. Conor's own telling is longer and better story: five years "in the wilderness" building the first version while broke — a van, then India, then the free coding school 42, "where I found Josh." Before that: Localocracy, a civic "online town common" he co-founded as a UMass student and sold to AOL's Huffington Post Media Group in October 2011 for reportedly under $1M, and a stint co-founding HuffPost Labs. The animating idea since about 2008, by his account, was never notes: it was collective intelligence — how groups could see the structure of arguments and make better decisions together.

The white paper, co-written in winter 2017/2018 with journalist Richard Meadows (whose trial of the prototype made him the first investor), is the bridge between those ambitions and the shipped product. Its abstract describes an online workspace on a directed graph where each unit of information is a node that can occupy multiple positions at once — with weighted relationships enabling Bayesian inference and, ultimately, "collaborative reasoning." A later editors' preface concedes the reasoning and prediction-market machinery proved "much lower priority" than the writing surface. The product that opened to early users in 2019 was the writing surface.

## The product, and the moment it caught

Roam's primitives — an outliner where every bullet is a block, double-bracket page creation, automatic backlinks, Datalog-style queries, a fresh dated note every morning — made it feel less like Evernote than like a medium. Nat Eliason's January 2020 essay "Roam: Why I Love It and How I Use It" was the accelerant; Casey Newton later called it the biggest improvement to note-taking since Evernote. The community organized itself as #RoamCult on Twitter and a volunteer Slack, produced nearly all the onboarding (Conor admitted as much in 2021), sold $200 courses, and built a volunteer extension ecosystem — Roam42, RoamJS — before the company had an official API surface.

The company leaned into the cult. June 2020 pricing launched Pro at $15/month — about 4x Notion's comparable plan — and a $500 five-year "Believer" tier differentiated not by features but by proximity: first access, community calls with the team, priority support. Rob Litterst's contemporaneous "cult packaging" analysis reads it as deliberate: obsessive users over market share. September 2020 brought the number that made Roam a meme: a $9M seed at a $200M valuation — roughly 25x the median — with reported backers including Lux Capital, True Ventures, and Stripe founders Patrick and John Collison, and a claimed ~$1M ARR and profitability. April 2021's Wefunder community round let users buy equity at the same price; it was oversubscribed within an hour of the invitation email.

Two things from that peak deserve precision. Product Hunt's records are contradictory: the official winners post names Clubhouse 2020 Product of the Year with Roam a runner-up, while Roam's own product page carries a "Product of the Year 2020" badge — the index records both rather than resolving the platform's inconsistency. And "multiplayer" was never a single launch: same-graph real-time editing existed from the beta era, was stress-tested publicly through the company-run Roam Book Club (1,700+ signups, ~200 people editing one graph at RBC2), and later became a standard paid feature where collaborators edit free and only admins pay.

## The fade

The reversal is well documented. Dan Shipper's February 2022 "The Fall of Roam" gave it language — slow velocity, no mobile experience, community issues, and a dawning sense that links collected were rarely revisited. Casey Newton's August 2023 Verge column closed the loop: "Roam's development slowed to a crawl," and the promise that it would improve his thinking "fizzled." The mechanics of the fade are consistent across post-mortems: the signature features were not a moat — Obsidian (free, local-first), Logseq ("free Roam," open source), Tana, Notion, and Mem all absorbed them — while pricing stayed premium and shipping stayed slow. Even Athens, the YC W21-backed open-source answer built in Roam's image, is now unmaintained; the graveyard cuts both ways.

But "dead" overstates it. The service still runs, at unchanged 2020 pricing (verified September 2026: $15/month, $165/year, $500/5-year Believer, 31-day trial). The company's newsletter published through a "2025 Roam Wrapped" issue. And in January 2026 a public Roam-Research/roam-tools repository appeared shipping an official MCP server and CLI — agent-facing tooling for the graph, actively committed through September 2026. Whether that is a pivot, a hobby, or a maintenance-mode company with an R&D tail is exactly the kind of question the public record cannot answer.

## What the record does not settle

Headcount (LinkedIn's 1–10 band vs. ~11 in 2020), usage, revenue, and the fate of the collaborative-reasoning endgame are all undisclosed. The founding date itself wobbles between 2017 (CB Insights, LinkedIn), 2018 (aggregators), 2019 (product release), and ~2014 (the founder's wilderness narrative). One aggregator even misnames the co-founder "Josh Starcher." And much of the canonical story — profitability, the Compound, the five rejections by Y Combinator — originates with the founder's own threads and interviews, a self-narrated record this index marks as such.

*This index was compiled from public sources and does not imply the organization's endorsement. Citations live in the packet's source catalog.*`,
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
