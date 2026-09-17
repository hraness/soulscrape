#!/usr/bin/env bun
/** Generate examples/people/dylan-patel/person-index.json with derived source ids. */

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

const saBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dylan Patel — Founder, CEO, and Chief Analyst",
  url: "https://semianalysis.com/dylan-patel/",
  publisher: "SemiAnalysis",
  notes:
    "The subject's biography page on his firm's site, listing his bylined reports and the firm's product and tool catalog; claims here are self-reported.",
});
const saDcModel = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Datacenter Industry Model",
  url: "https://semianalysis.com/datacenter-industry-model/",
  publisher: "SemiAnalysis",
  notes:
    "Product page describing tracking of more than 5,000 datacenters via property records, permits, power usage, FOIA requests, and satellite imagery with computer-vision reads.",
});
const linkedin = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dylan Patel — Founder of SemiAnalysis",
  url: "https://www.linkedin.com/in/dylanpatelsa",
  publisher: "LinkedIn",
  notes:
    "The subject's own profile; records his University of Georgia education and his May 2025 post marking five years since his first SemiAnalysis blog on his 24th birthday.",
});
const saMoat = source({
  binding: "first_person",
  mediaType: "article",
  title: "Google \u201cWe Have No Moat, And Neither Does OpenAI\u201d",
  url: "https://newsletter.semianalysis.com/p/google-we-have-no-moat-and-neither",
  publisher: "SemiAnalysis",
  publishedAt: "2023-05-04",
  authors: ["Dylan Patel"],
  notes:
    "Republication of a leaked internal Google document; the editor's note describes verification of its authenticity and provenance from a public Discord server.",
});
const saMi300 = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "AMD MI300 – Taming The Hype – AI Performance, Volume Ramp, Customers, Cost, IO, Networking, Software",
  url: "https://newsletter.semianalysis.com/p/amd-mi300-taming-the-hype-ai-performance",
  publisher: "SemiAnalysis",
  publishedAt: "2023-06-12",
  authors: ["Dylan Patel", "George Cozma", "Gerald Wong"],
});
const saGpt4 = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "GPT-4 Architecture, Infrastructure, Training Dataset, Costs, Vision, MoE",
  url: "https://newsletter.semianalysis.com/p/gpt-4-architecture-infrastructure",
  publisher: "SemiAnalysis",
  publishedAt: "2023-07-10",
  authors: ["Dylan Patel", "Gerald Wong"],
});
const saGemini = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Google Gemini Eats The World – Gemini Smashes GPT-4 By 5X, The GPU-Poors",
  url: "https://newsletter.semianalysis.com/p/google-gemini-eats-the-world-gemini",
  publisher: "SemiAnalysis",
  publishedAt: "2023-12",
  authors: ["Dylan Patel", "Daniel Nishball"],
});
const saEnergy = source({
  binding: "first_person",
  mediaType: "article",
  title: "AI Datacenter Energy Dilemma - Race for AI Datacenter Space",
  url: "https://newsletter.semianalysis.com/p/ai-datacenter-energy-dilemma-race",
  publisher: "SemiAnalysis",
  publishedAt: "2024-03-13",
  authors: ["Dylan Patel", "Daniel Nishball", "Jeremie Eliahou Ontiveros"],
});
const saDeepseek = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "DeepSeek Debates: Chinese Leadership On Cost, True Training Cost, Closed Model Margin Impacts",
  url: "https://newsletter.semianalysis.com/p/deepseek-debates",
  publisher: "SemiAnalysis",
  publishedAt: "2025-01-31",
});
const saColossus2 = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "xAI\u2019s Colossus 2 – First Gigawatt Datacenter In The World, Unique RL Methodology, Capital Raise",
  url: "https://newsletter.semianalysis.com/p/xais-colossus-2-first-gigawatt-datacenter",
  publisher: "SemiAnalysis",
  publishedAt: "2025-09-16",
  authors: [
    "Jeremie Eliahou Ontiveros",
    "Dylan Patel",
    "Wei Zhou",
    "Maya Barkin",
    "AJ Kourabi",
  ],
});
const dwarkesh = source({
  binding: "interview",
  mediaType: "video",
  title:
    "@Asianometry & Dylan Patel — How the semiconductor industry actually works",
  url: "https://www.dwarkesh.com/p/dylan-jon",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2024-10-02",
  authors: ["Dwarkesh Patel"],
});
const oddlots = source({
  binding: "interview",
  mediaType: "audio",
  title: "China Made a Chip Breakthrough That Shocked the World",
  url: "https://omny.fm/shows/odd-lots/china-made-a-chip-breakthrough-that-shocked-the-wo",
  publisher: "Odd Lots (Bloomberg)",
  publishedAt: "2023-09",
  authors: ["Joe Weisenthal", "Tracy Alloway"],
});
const bg2 = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "AI Semiconductor Landscape feat. Dylan Patel | BG2 w/ Bill Gurley & Brad Gerstner",
  url: "https://podcasts.apple.com/us/podcast/ai-semiconductor-landscape-feat-dylan-patel-bg2-w-bill/id1727278168?i=1000681467173",
  publisher: "BG2Pod",
  publishedAt: "2024-12-23",
  authors: ["Brad Gerstner", "Bill Gurley"],
});
const sequoia = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Dylan Patel of SemiAnalysis: Why Hardware-Software Co-Design Is AI\u2019s Real 100x",
  url: "https://sequoiacap.com/podcast/dylan-patel-of-semianalysis-why-hardware-software-co-design-is-ais-real-100x",
  publisher: "Sequoia Capital — Training Data",
  publishedAt: "2026-06-30",
  authors: ["Shaun Maguire", "Sonya Huang"],
  notes:
    "Long-form interview in the SemiAnalysis office covering his upbringing, forum years, quant career, and the firm's founding.",
});
const theinformation = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Dylan Patel\u2019s SemiAnalysis Projects Over $100 Million In 2026 Revenue",
  url: "https://www.theinformation.com/briefings/dylan-patels-semianalysis-projects-100-million-2026-revenue",
  publisher: "The Information",
  publishedAt: "2026",
  notes:
    "Reports a roughly 60-employee firm with more than $100 million projected 2026 revenue, up from about $20 million the prior year, and the firm's venture-fund plans.",
});
const mtm = source({
  binding: "reporting",
  mediaType: "article",
  title: "Dylan Patel\u2019s SemiAnalysis Is Being Sued",
  url: "https://morethanmoore.substack.com/p/dylan-patels-semianalysis-is-being",
  publisher: "More Than Moore",
  publishedAt: "2026-04",
  authors: ["Ian Cutress"],
  notes:
    "Independent analyst coverage of the cross-lawsuits between SemiAnalysis and former employee Wei Zhou; conveys the company's denial of the claims.",
});
const eetimes = source({
  binding: "reporting",
  mediaType: "article",
  title: "GTC 2026 Keynote: Long Live the Inference King",
  url: "https://www.eetimes.com/gtc-2026-keynote-long-live-the-inference-king/",
  publisher: "EE Times",
  publishedAt: "2026-03",
  notes:
    "Coverage of Jensen Huang's GTC 2026 keynote callout of SemiAnalysis's InferenceX benchmark and his 'sandbagging' exchange with Patel.",
});
const bloomberg = source({
  binding: "reporting",
  mediaType: "article",
  title: "Citrini Founder Who Shook Markets Sells Firm, Plans New Fund",
  url: "https://www.bloomberg.com/news/articles/2026-09-11/citrini-founder-who-shook-markets-sells-firm-plans-new-fund",
  publisher: "Bloomberg",
  publishedAt: "2026-09-11",
  authors: ["Muyao Shen", "Georgie McKay"],
});
const secFormD = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "SemiAnalysis Capital Fund I, LP — Form D Notice of Exempt Offering",
  url: "https://www.sec.gov/Archives/edgar/data/2145695/000090514826003383/0000905148-26-003383-index.htm",
  publisher: "U.S. Securities and Exchange Commission",
  publishedAt: "2026-07-29",
  notes:
    "SEC EDGAR index for the Form D filing (File No. 021-592532) covering a $400,000,000 pooled-investment-fund offering.",
});
const muckrack = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Dylan Patel — Founder and Chief Analyst, SemiAnalysis",
  url: "https://muckrack.com/dylan-patel",
  publisher: "Muck Rack",
  notes:
    "Media-reference profile aggregating his bylines and beat; used for cross-checking, not as sole authority.",
});

const S = {
  saBio: saBio.id,
  saDcModel: saDcModel.id,
  linkedin: linkedin.id,
  saMoat: saMoat.id,
  saMi300: saMi300.id,
  saGpt4: saGpt4.id,
  saGemini: saGemini.id,
  saEnergy: saEnergy.id,
  saDeepseek: saDeepseek.id,
  saColossus2: saColossus2.id,
  dwarkesh: dwarkesh.id,
  oddlots: oddlots.id,
  bg2: bg2.id,
  sequoia: sequoia.id,
  theinformation: theinformation.id,
  mtm: mtm.id,
  eetimes: eetimes.id,
  bloomberg: bloomberg.id,
  secFormD: secFormD.id,
  muckrack: muckrack.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-dylan-patel",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "dylan-patel",
    displayName: "Dylan Patel",
    alsoKnownAs: ["Dylan Sanjay Patel"],
    summary:
      "American analyst who founded SemiAnalysis, the semiconductor and AI-infrastructure research firm whose reports, supply-chain models, and satellite-tracked datacenter data are read by hyperscalers, chipmakers, and investors.",
    identity: {
      officialSite: "https://semianalysis.com/",
      profiles: [
        "https://www.linkedin.com/in/dylanpatelsa",
        "https://x.com/dylan522p",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "firm", "publications", "media", "disputes"],
  },
  sources: [
    saBio,
    saDcModel,
    linkedin,
    saMoat,
    saMi300,
    saGpt4,
    saGemini,
    saEnergy,
    saDeepseek,
    saColossus2,
    dwarkesh,
    oddlots,
    bg2,
    sequoia,
    theinformation,
    mtm,
    eetimes,
    bloomberg,
    secFormD,
    muckrack,
  ],
  claims: [
    {
      id: "claim-founder-role",
      kind: "fact",
      text: "Dylan Patel is the founder, chief executive, and chief analyst of SemiAnalysis, a research and consulting firm covering semiconductors and AI infrastructure.",
      sourceIds: [S.saBio, S.linkedin, S.muckrack],
    },
    {
      id: "claim-first-post-2020",
      kind: "fact",
      text: "He launched SemiAnalysis as a solo blog, posting his first posts under his real name on May 22, 2020 — his 24th birthday — after years of anonymous posting.",
      sourceIds: [S.linkedin, S.sequoia, S.saBio],
    },
    {
      id: "claim-motel-upbringing",
      kind: "fact",
      text: "He grew up in his family's small businesses in rural Georgia — living in a motel his parents ran and later working around a gas station they owned.",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-forum-moderator",
      kind: "fact",
      text: "He began posting about chips, smartphones, and PC hardware in his early teens and says that by about age 12 he was moderating online forums and Reddit communities covering Android, Apple, Google, Intel, NVIDIA, AMD, and PC building.",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-xbox-hardware",
      kind: "fact",
      text: "He traces his hardware obsession to fixing his Xbox 360's 'red ring of death' failure by shorting a temperature sensor — his telling of how he 'opened Pandora's box.'",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-uga-education",
      kind: "fact",
      text: "From 2014 to 2017 he studied at the University of Georgia's Terry College of Business, earning bachelor's degrees in Risk Management & Insurance and in Management Information Systems plus a legal studies certificate — no semiconductor-engineering degree.",
      sourceIds: [S.linkedin],
    },
    {
      id: "claim-quant-career",
      kind: "fact",
      text: "Before SemiAnalysis he spent about two years as a quantitative analyst at a small quant risk firm, and left after a dispute over credit and bonus for a profitable trade; he is self-taught on semiconductor architecture and supply chains.",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-doxxing-origin",
      kind: "fact",
      text: "He has said he posted under pseudonyms until an internet argument led to him being doxxed, after which he moved his writing to a real-name blog — the direct origin of SemiAnalysis.",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-moat-memo",
      kind: "fact",
      text: "On May 4, 2023, SemiAnalysis published a leaked internal Google document titled 'We Have No Moat, And Neither Does OpenAI,' arguing open-source AI would outcompete both companies; the publication's note says the memo came from a Google researcher via a public Discord server and that its authenticity was verified.",
      sourceIds: [S.saMoat],
    },
    {
      id: "claim-gpt4-report",
      kind: "fact",
      text: "His July 10, 2023 report with Gerald Wong laid out alleged GPT-4 specifics — roughly 1.8 trillion parameters across 120 layers, a 16-expert mixture-of-experts design, about 13 trillion training tokens, and an estimated $63 million training run — one of the first detailed public breakdowns of the model.",
      sourceIds: [S.saGpt4],
    },
    {
      id: "claim-mi300-coverage",
      kind: "fact",
      text: "His June 2023 'AMD MI300 – Taming The Hype' analysis and follow-up MI300X benchmarking coverage established SemiAnalysis as a leading independent voice on credible alternatives to NVIDIA accelerators.",
      sourceIds: [S.saMi300],
    },
    {
      id: "claim-gpu-poor",
      kind: "fact",
      text: "In the December 2023 'Google Gemini Eats The World' piece, Patel and Daniel Nishball introduced the 'GPU-Rich'/'GPU-Poor' taxonomy of compute access — vocabulary that became standard across the AI industry.",
      sourceIds: [S.saGemini],
    },
    {
      id: "claim-energy-report",
      kind: "fact",
      text: "The March 13, 2024 'AI Datacenter Energy Dilemma' report, co-authored with Daniel Nishball and Jeremie Eliahou Ontiveros, forecast US AI datacenter power demand rising from about 3 GW in 2023 to more than 28 GW by 2026 and argued datacenter capacity — not chips alone — was the binding constraint.",
      sourceIds: [S.saEnergy],
    },
    {
      id: "claim-datacenter-model",
      kind: "fact",
      text: "SemiAnalysis sells a Datacenter Industry Model tracking more than 5,000 datacenters building-by-building through property records, permits, power usage, FOIA requests, and computer-vision reads on frequent satellite imagery.",
      sourceIds: [S.saDcModel],
    },
    {
      id: "claim-deepseek-debates",
      kind: "fact",
      text: "Amid the January 2025 DeepSeek panic, 'DeepSeek Debates' argued the viral '$6 million' figure covered only the pre-training GPU cost, estimating DeepSeek's cumulative hardware spend above $500 million and total server capital expenditure near $1.6 billion.",
      sourceIds: [S.saDeepseek],
    },
    {
      id: "claim-colossus-coverage",
      kind: "fact",
      text: "SemiAnalysis's xAI coverage documented the Colossus cluster builds in Memphis — including the second site's path toward gigawatt scale and xAI's use of mobile gas turbines across the Mississippi border — using the firm's satellite and records tracking.",
      sourceIds: [S.saColossus2],
    },
    {
      id: "claim-team-revenue",
      kind: "fact",
      text: "The Information reported in 2026 that SemiAnalysis had grown to roughly 60 employees and projected more than $100 million in 2026 revenue — up from about $20 million the prior year — across subscriptions, data models, and consulting sold to hyperscalers, chipmakers, and investors.",
      sourceIds: [S.theinformation],
    },
    {
      id: "claim-newsletter-scale",
      kind: "fact",
      text: "The SemiAnalysis newsletter is among the largest technology publications on Substack, with more than 200,000 subscribers reported in 2026.",
      sourceIds: [S.theinformation, S.saBio],
    },
    {
      id: "claim-fund-filing",
      kind: "fact",
      text: "A July 29, 2026 SEC Form D filing registered SemiAnalysis Capital Fund I, LP as a pooled investment fund with a $400 million offering amount — a stated target, not a closed raise.",
      sourceIds: [S.secFormD, S.theinformation],
    },
    {
      id: "claim-startup-stakes",
      kind: "fact",
      text: "Press reporting describes Patel holding stakes in roughly 20 startups — including Thinking Machines Lab and Enfabrica — and having raised a $50 million special-purpose vehicle inside a Fluidstack funding round.",
      sourceIds: [S.theinformation],
    },
    {
      id: "claim-citrini-acquisition",
      kind: "fact",
      text: "On September 11, 2026, SemiAnalysis confirmed to Bloomberg that it had acquired independent investment-research firm Citrini Research; founder James van Geelen remained its CEO, and Patel framed the deal as scaling independent research.",
      sourceIds: [S.bloomberg],
    },
    {
      id: "claim-inferencex-gtc",
      kind: "fact",
      text: "SemiAnalysis runs InferenceX (formerly InferenceMAX), an open continuously updated inference benchmark; at NVIDIA's GTC 2026 keynote Jensen Huang gave it an on-stage callout and conceded on the record that 'Dylan Patel accused me of sandbagging — it's actually 50x. He's not wrong.'",
      sourceIds: [S.eetimes, S.saBio],
    },
    {
      id: "claim-zhou-litigation",
      kind: "fact",
      text: "In spring 2026 SemiAnalysis sued former employee Wei Zhou for breach of contract and trade-secret misappropriation, and Zhou countersued alleging he was fired after refusing to incorporate what he described as material non-public information into client-facing models; Patel called the countersuit 'meritless' and the company denied the claims.",
      sourceIds: [S.mtm],
    },
    {
      id: "claim-belief-codesign",
      kind: "stated_belief",
      text: "Patel argues the real 100x gains in AI come from hardware-software-model co-design — optimizing the model, kernels, and silicon together — rather than from any single faster chip.",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-belief-inference-scale",
      kind: "stated_belief",
      text: "He has argued that inference will become a bigger market than oil and that compute demand is structurally ahead of the world's ability to build datacenters — a demand-supply mismatch, not a temporary squeeze.",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-belief-power-constraint",
      kind: "stated_belief",
      text: "His consistent analytical line is that power, cooling, and physical datacenter capacity — not accelerator supply alone — set the pace of AI scaling, which is why labs bypass grids with onsite generation.",
      sourceIds: [S.saEnergy, S.saColossus2, S.dwarkesh],
    },
    {
      id: "claim-belief-china",
      kind: "stated_belief",
      text: "He argues US export controls are porous and that Huawei and SMIC are more capable than Washington consensus assumes — a position he took on Odd Lots after the Mate 60 Pro teardown and has maintained since.",
      sourceIds: [S.oddlots, S.dwarkesh],
    },
    {
      id: "claim-belief-posting",
      kind: "stated_belief",
      text: "He credits a teenage lifetime of 'posting' — running forums, arguing publicly, answering critics — as the true origin of SemiAnalysis and still replies to critics online despite his team's objections.",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-pattern-primary-material",
      kind: "pattern",
      text: "A recurring method: publish primary material competitors will not — leaked internal memos, detailed unreleased-model architectures, satellite-tracked construction — and let the primary evidence carry the argument.",
      sourceIds: [S.saMoat, S.saGpt4, S.saDcModel],
    },
    {
      id: "claim-pattern-physical-to-financial",
      kind: "pattern",
      text: "His reports convert physical minutiae — HBM stacks, CoWoS capacity, chiller counts, turbine fleets, substation timelines — into cost and capacity numbers that traders and executives can price.",
      sourceIds: [S.saMi300, S.saEnergy, S.saColossus2],
    },
    {
      id: "claim-pattern-analyst-investor",
      kind: "pattern",
      text: "Patel blurs the analyst and investor roles: he writes about companies while holding personal stakes in AI-infrastructure startups, and the 2026 fund filing formalizes that flywheel — the Zhou litigation put the conflict question on record.",
      sourceIds: [S.theinformation, S.secFormD, S.mtm],
    },
    {
      id: "claim-spec-gpt4-accuracy",
      kind: "speculation",
      text: "The GPT-4 report's specific figures were SemiAnalysis's sourced estimates and were never officially confirmed by OpenAI; later coverage treated much of it as consistent with what emerged, but the record cannot fully adjudicate it.",
      sourceIds: [S.saGpt4],
    },
    {
      id: "claim-spec-revenue",
      kind: "speculation",
      text: "The $100-million-plus 2026 revenue figure is a projection reported by The Information, not an audited result; SemiAnalysis discloses no financial statements.",
      sourceIds: [S.theinformation],
    },
    {
      id: "claim-spec-headcount",
      kind: "speculation",
      text: "Reported headcount varies by source and date — Patel's own posts counted 32 staff in May 2025, The Information reported roughly 60 in 2026, and later interviews describe about 90 — so any single figure is a snapshot.",
      sourceIds: [S.linkedin, S.theinformation],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1996-05-22",
      title: "Born in Georgia",
      summary:
        "Implied by his own statement that he posted his first SemiAnalysis blog on his 24th birthday, May 22, 2020; press described him as 29 in early 2026, which is consistent. Son of Indian immigrant small-business owners.",
      sourceIds: [S.linkedin, S.sequoia, S.theinformation],
    },
    {
      id: "event-forum-years",
      kind: "other",
      date: "2008",
      title: "Running hardware forums by about age 12",
      summary:
        "Moderating online communities on Android, Apple, Google, Intel, NVIDIA, AMD, and PC building — the posting habit that became his career. Approximate date inferred from his age-12 account.",
      sourceIds: [S.sequoia],
    },
    {
      id: "event-uga",
      kind: "education",
      date: "2014",
      end: "2017",
      title: "University of Georgia, Terry College of Business",
      summary:
        "Bachelor's degrees in Risk Management & Insurance and Management Information Systems, plus a legal studies certificate; no semiconductor-engineering coursework.",
      organization: "University of Georgia",
      location: "Athens, Georgia",
      organizationHandle: "university-of-georgia",
      sourceIds: [S.linkedin],
    },
    {
      id: "event-quant",
      kind: "role",
      date: "2017",
      end: "2019",
      title: "Quantitative analyst at a small quant risk firm",
      summary:
        "Roughly two years in quant trading; he says a disputed bonus and lost 'social contract' pushed him out. Dates approximate per his retelling.",
      sourceIds: [S.sequoia],
    },
    {
      id: "event-semianalysis-founded",
      kind: "founded",
      date: "2020-05-22",
      title: "First SemiAnalysis posts on his 24th birthday",
      summary:
        "Moved from anonymous posting to a real-name blog covering technology, business, finance, and supply chains; grew into the research firm.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.linkedin, S.sequoia, S.saBio],
    },
    {
      id: "event-moat-memo",
      kind: "publication",
      date: "2023-05-04",
      title: "Published the leaked Google 'We Have No Moat' memo",
      summary:
        "The internal Google document arguing open-source AI would outcompete Google and OpenAI became one of the most-discussed AI texts of the year.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.saMoat],
    },
    {
      id: "event-mi300",
      kind: "publication",
      date: "2023-06-12",
      title: "'AMD MI300 – Taming The Hype'",
      summary:
        "Deep dive on the first credible NVIDIA challenger: architecture, volumes, customers, cost, and software gaps.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.saMi300],
    },
    {
      id: "event-gpt4",
      kind: "publication",
      date: "2023-07-10",
      title: "GPT-4 architecture report",
      summary:
        "With Gerald Wong, published detailed alleged specifics of OpenAI's GPT-4 — parameter count, MoE design, training data scale, and cost.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.saGpt4],
    },
    {
      id: "event-gpu-poor",
      kind: "publication",
      date: "2023-12",
      title: "Coined 'GPU-Rich' / 'GPU-Poor'",
      summary:
        "The Gemini analysis framed compute access as a bimodal distribution; the vocabulary stuck industry-wide.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.saGemini],
    },
    {
      id: "event-energy-dilemma",
      kind: "publication",
      date: "2024-03-13",
      title: "'AI Datacenter Energy Dilemma'",
      summary:
        "Landmark power-and-capacity report forecasting US AI datacenter demand above 28 GW by 2026; later cited in national-academy contexts on grid stress.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.saEnergy],
    },
    {
      id: "event-deepseek",
      kind: "publication",
      date: "2025-01-31",
      title: "'DeepSeek Debates' during the DeepSeek panic",
      summary:
        "Countered the '$6 million model' narrative with estimated true hardware and operating costs; widely cited through the market selloff.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.saDeepseek],
    },
    {
      id: "event-colossus2",
      kind: "publication",
      date: "2025-09-16",
      title: "'xAI's Colossus 2 – First Gigawatt Datacenter In The World'",
      summary:
        "Satellite-and-records accounting of xAI's Memphis expansion, onsite turbine strategy, and capital questions.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.saColossus2],
    },
    {
      id: "event-fund-formd",
      kind: "milestone",
      date: "2026-07-29",
      title: "SEC Form D for SemiAnalysis Capital Fund I",
      summary:
        "A $400 million pooled-investment-fund filing formalizing Patel's move from analyst to allocator.",
      organization: "SemiAnalysis Capital Fund I, LP",
      organizationHandle: "semianalysis-capital",
      sourceIds: [S.secFormD, S.theinformation],
    },
    {
      id: "event-citrini",
      kind: "milestone",
      date: "2026-09-11",
      title: "SemiAnalysis acquires Citrini Research",
      summary:
        "Bloomberg-reported purchase of the independent thematic research shop; van Geelen stayed on as CEO.",
      organization: "SemiAnalysis",
      organizationHandle: "semianalysis",
      sourceIds: [S.bloomberg],
    },
  ],
  themes: [
    {
      id: "theme-full-stack-xray",
      kind: "method",
      status: "stated",
      title: "See the whole stack",
      summary:
        "He tracks the semiconductor supply chain from chemical suppliers and fab equipment through packaging, memory, and networking to the cloud tenants — then prices each monopoly and bottleneck. The unit of analysis is the whole physical stack, not a single company.",
      sourceIds: [S.saBio, S.sequoia, S.saMi300],
    },
    {
      id: "theme-power-first",
      kind: "belief",
      status: "stated",
      title: "Power is the binding constraint",
      summary:
        "Since the 2024 Energy Dilemma report he has argued datacenter power, cooling, and construction timelines — not chip supply — set the pace of AI. Speed to power is the moat; onsite gas and multi-site training are the industry's answers.",
      sourceIds: [S.saEnergy, S.saColossus2, S.dwarkesh],
    },
    {
      id: "theme-primary-evidence",
      kind: "practice",
      status: "reported",
      title: "Primary material as growth engine",
      summary:
        "Leaked documents, unpublished model architectures, and satellite imagery of builds form the firm's signature evidence class — publish what companies will not confirm, verify it, and let the documents travel.",
      sourceIds: [S.saMoat, S.saGpt4, S.saDcModel],
    },
    {
      id: "theme-compute-taxonomy",
      kind: "influence",
      status: "reported",
      title: "Naming the compute divide",
      summary:
        "'GPU-Rich' and 'GPU-Poor' gave the industry its working vocabulary for the bimodal distribution of compute access — a framing now used by executives, researchers, and policymakers.",
      sourceIds: [S.saGemini, S.dwarkesh],
    },
    {
      id: "theme-china-chips",
      kind: "interest",
      status: "stated",
      title: "China, export controls, and Huawei",
      summary:
        "A sustained focus on how far Chinese silicon has actually come — Kirin 9000S, SMIC capacity, Huawei Ascend ramps — and repeated arguments that control regimes are leaky and lag reality.",
      sourceIds: [S.oddlots, S.dwarkesh, S.saBio],
    },
    {
      id: "theme-physical-verification",
      kind: "method",
      status: "reported",
      title: "Count things, not claims",
      summary:
        "Property records, permits, FOIA requests, power interconnect queues, and satellite passes substitute for vendor marketing; the Datacenter Industry Model industrialized that method across more than 5,000 facilities.",
      sourceIds: [S.saDcModel, S.saColossus2, S.theinformation],
    },
    {
      id: "theme-codesign",
      kind: "philosophy",
      status: "stated",
      title: "Co-design as the real 100x",
      summary:
        "Model architecture, kernels, and silicon co-optimized together beat any single-layer improvement — his explanation for why OpenAI, Anthropic, and Google pull away from labs that treat hardware as a commodity.",
      sourceIds: [S.sequoia],
    },
    {
      id: "theme-analyst-investor",
      kind: "practice",
      status: "reported",
      title: "Analyst and allocator at once",
      summary:
        "Personal stakes in AI-infrastructure startups, a nine-figure SPV position reported in Fluidstack coverage, and a $400 million fund filing mean his research and his portfolio overlap — a deliberate flywheel that the Zhou lawsuit turned into a public conflict question.",
      sourceIds: [S.theinformation, S.secFormD, S.mtm],
    },
    {
      id: "theme-poster-identity",
      kind: "belief",
      status: "stated",
      title: "The poster's epistemics",
      summary:
        "He describes SemiAnalysis as the institutionalization of a teenage posting habit — argue in public, take corrections, respond to critics — and still treats internet argument as discovery rather than marketing.",
      sourceIds: [S.sequoia],
    },
  ],
  works: [
    {
      id: "work-semianalysis",
      kind: "other",
      status: "ongoing",
      title: "SemiAnalysis",
      date: "2020",
      location: "San Francisco, California",
      summary:
        "The research and consulting firm he founded as a solo blog; per press reporting it grew to roughly 60 employees with more than $100 million in projected 2026 revenue.",
      sourceIds: [S.saBio, S.theinformation, S.bloomberg],
    },
    {
      id: "work-newsletter",
      kind: "other",
      status: "ongoing",
      title: "SemiAnalysis newsletter",
      date: "2020",
      summary:
        "The flagship Substack publication — among the largest technology newsletters, with more than 200,000 subscribers reported.",
      sourceIds: [S.theinformation, S.saMoat],
    },
    {
      id: "work-moat-memo",
      kind: "paper",
      status: "published",
      title: "Google \u201cWe Have No Moat, And Neither Does OpenAI\u201d",
      date: "2023-05-04",
      summary:
        "Verified republication of the leaked internal Google memo that shaped the open-source-versus-labs debate.",
      sourceIds: [S.saMoat],
    },
    {
      id: "work-mi300",
      kind: "paper",
      status: "published",
      title: "AMD MI300 – Taming The Hype",
      date: "2023-06-12",
      summary:
        "The deep dive series on AMD's challenger accelerator — architecture, volumes, pricing, and the software gap against CUDA.",
      sourceIds: [S.saMi300],
    },
    {
      id: "work-gpt4",
      kind: "paper",
      status: "published",
      title: "GPT-4 Architecture, Infrastructure, Training Dataset, Costs, Vision, MoE",
      date: "2023-07-10",
      summary:
        "With Gerald Wong; the first widely circulated detailed breakdown of GPT-4's alleged architecture and cost structure.",
      sourceIds: [S.saGpt4],
    },
    {
      id: "work-gemini-gpu-poor",
      kind: "paper",
      status: "published",
      title: "Google Gemini Eats The World – The GPU-Poors",
      date: "2023-12",
      summary:
        "With Daniel Nishball; coined the GPU-Rich/GPU-Poor taxonomy of compute access.",
      sourceIds: [S.saGemini],
    },
    {
      id: "work-energy-dilemma",
      kind: "paper",
      status: "published",
      title: "AI Datacenter Energy Dilemma – Race for AI Datacenter Space",
      date: "2024-03-13",
      summary:
        "The datacenter power-capacity forecast that reframed AI scaling as an energy and construction problem.",
      sourceIds: [S.saEnergy],
    },
    {
      id: "work-deepseek",
      kind: "paper",
      status: "published",
      title: "DeepSeek Debates",
      date: "2025-01-31",
      summary:
        "The counter-narrative cost analysis of DeepSeek that circulated through the January 2025 market panic.",
      sourceIds: [S.saDeepseek],
    },
    {
      id: "work-colossus2",
      kind: "paper",
      status: "published",
      title: "xAI's Colossus 2 – First Gigawatt Datacenter In The World",
      date: "2025-09-16",
      summary:
        "Building-by-building account of the Memphis expansion and the onsite-power strategy behind it.",
      sourceIds: [S.saColossus2],
    },
    {
      id: "work-dc-model",
      kind: "product",
      status: "ongoing",
      title: "Datacenter Industry Model",
      summary:
        "Subscription data product tracking more than 5,000 datacenters' capacity, construction progress, and power through records and satellite imagery.",
      sourceIds: [S.saDcModel],
    },
    {
      id: "work-inferencex",
      kind: "product",
      status: "ongoing",
      title: "InferenceX (formerly InferenceMAX)",
      summary:
        "Open, continuously updated AI inference benchmark — recognized on stage by Jensen Huang at GTC 2026.",
      sourceIds: [S.saBio, S.eetimes],
    },
    {
      id: "work-fund",
      kind: "other",
      status: "in_progress",
      title: "SemiAnalysis Capital Fund I, LP",
      date: "2026-07-29",
      summary:
        "Pooled investment fund with a $400 million Form D offering amount; a stated target, not a closed raise.",
      sourceIds: [S.secFormD, S.theinformation],
    },
    {
      id: "work-citrini",
      kind: "other",
      status: "completed",
      title: "Acquisition of Citrini Research",
      date: "2026-09-11",
      summary:
        "Purchase of James van Geelen's independent thematic investment-research firm, extending SemiAnalysis into market-facing research.",
      sourceIds: [S.bloomberg],
    },
  ],
  appearances: [
    {
      id: "appearance-oddlots",
      title: "China Made a Chip Breakthrough That Shocked the World",
      venue: "Odd Lots (Bloomberg)",
      publishedAt: "2023-09",
      participants: ["Dylan Patel", "Doug O'Laughlin", "Joe Weisenthal", "Tracy Alloway"],
      participantHandles: [
        { name: "Dylan Patel", handle: "dylan-patel" },
        { name: "Doug O'Laughlin", handle: "doug-olaughlin" },
        { name: "Joe Weisenthal", handle: "joe-weisenthal" },
        { name: "Tracy Alloway", handle: "tracy-alloway" },
      ],
      summary:
        "Emergency episode on Huawei's Kirin 9000S and SMIC's 7nm capability after the Mate 60 Pro teardown.",
      media: [
        {
          type: "audio",
          url: "https://omny.fm/shows/odd-lots/china-made-a-chip-breakthrough-that-shocked-the-wo",
          sourceId: S.oddlots,
        },
      ],
      sourceIds: [S.oddlots],
    },
    {
      id: "appearance-dwarkesh",
      title:
        "@Asianometry & Dylan Patel — How the semiconductor industry actually works",
      venue: "Dwarkesh Podcast",
      publishedAt: "2024-10-02",
      participants: ["Dylan Patel", "Jon Y", "Dwarkesh Patel"],
      participantHandles: [
        { name: "Dylan Patel", handle: "dylan-patel" },
        { name: "Jon Y", handle: "jon-y" },
        { name: "Dwarkesh Patel", handle: "dwarkesh-patel" },
      ],
      summary:
        "A nearly three-hour session with Asianometry's Jon Y covering the semiconductor stack, China's compute options, and scaling to 10,000x GPT-4 compute.",
      media: [
        {
          type: "video",
          url: "https://www.dwarkesh.com/p/dylan-jon",
          sourceId: S.dwarkesh,
        },
      ],
      sourceIds: [S.dwarkesh],
    },
    {
      id: "appearance-bg2",
      title: "AI Semiconductor Landscape feat. Dylan Patel",
      venue: "BG2Pod with Brad Gerstner and Bill Gurley",
      publishedAt: "2024-12-23",
      participants: ["Dylan Patel", "Brad Gerstner", "Bill Gurley"],
      participantHandles: [
        { name: "Dylan Patel", handle: "dylan-patel" },
        { name: "Brad Gerstner", handle: "brad-gerstner" },
        { name: "Bill Gurley", handle: "bill-gurley" },
      ],
      summary:
        "SemiAnalysis's origin story plus NVIDIA's edge, hyperscaler capex, pre-training limits, and inference-time compute.",
      media: [
        {
          type: "audio",
          url: "https://podcasts.apple.com/us/podcast/ai-semiconductor-landscape-feat-dylan-patel-bg2-w-bill/id1727278168?i=1000681467173",
          sourceId: S.bg2,
        },
      ],
      sourceIds: [S.bg2],
    },
    {
      id: "appearance-sequoia",
      title:
        "Dylan Patel of SemiAnalysis: Why Hardware-Software Co-Design Is AI's Real 100x",
      venue: "Training Data (Sequoia Capital)",
      publishedAt: "2026-06-30",
      participants: ["Dylan Patel", "Shaun Maguire", "Sonya Huang"],
      participantHandles: [
        { name: "Dylan Patel", handle: "dylan-patel" },
        { name: "Shaun Maguire", handle: "shaun-maguire" },
        { name: "Sonya Huang", handle: "sonya-huang" },
      ],
      summary:
        "Recorded in the SemiAnalysis office; the fullest public account of his upbringing, forum years, doxxing, quant career, and the firm's founding.",
      media: [
        {
          type: "audio",
          url: "https://sequoiacap.com/podcast/dylan-patel-of-semianalysis-why-hardware-software-co-design-is-ais-real-100x",
          sourceId: S.sequoia,
        },
      ],
      sourceIds: [S.sequoia],
    },
  ],
  relations: [
    {
      id: "rel-semianalysis",
      kind: "founded",
      target: "semianalysis",
      targetName: "SemiAnalysis",
      targetKind: "organization",
      note: "Founded it as a solo blog on May 22, 2020 — his 24th birthday — and grew it into a roughly 60-person research and consulting firm he leads as CEO and chief analyst.",
      start: "2020-05-22",
      sourceIds: [S.linkedin, S.sequoia, S.saBio, S.theinformation],
    },
    {
      id: "rel-semianalysis-capital",
      kind: "founded",
      target: "semianalysis-capital",
      targetName: "SemiAnalysis Capital Fund I, LP",
      targetKind: "organization",
      note: "The $400 million pooled investment fund registered by SEC Form D on July 29, 2026 — formalizing his move from analyst to allocator.",
      start: "2026-07-29",
      sourceIds: [S.secFormD, S.theinformation],
    },
    {
      id: "rel-citrini-research",
      kind: "other",
      target: "citrini-research",
      targetName: "Citrini Research",
      targetKind: "organization",
      note: "SemiAnalysis acquired the independent investment-research firm in September 2026; founder James van Geelen remained its CEO.",
      start: "2026-09",
      sourceIds: [S.bloomberg],
    },
    {
      id: "rel-gerald-wong",
      kind: "collaborated",
      target: "gerald-wong",
      targetName: "Gerald Wong",
      note: "Co-author on the MI300 'Taming The Hype' analysis (June 2023) and the GPT-4 architecture report (July 2023).",
      sourceIds: [S.saMi300, S.saGpt4],
    },
    {
      id: "rel-george-cozma",
      kind: "collaborated",
      target: "george-cozma",
      targetName: "George Cozma",
      note: "Co-author on the June 2023 'AMD MI300 – Taming The Hype' report.",
      sourceIds: [S.saMi300],
    },
    {
      id: "rel-daniel-nishball",
      kind: "collaborated",
      target: "daniel-nishball",
      targetName: "Daniel Nishball",
      note: "Co-author on the 'GPU-Rich'/'GPU-Poor' Gemini analysis (December 2023) and the March 2024 datacenter energy report.",
      sourceIds: [S.saGemini, S.saEnergy],
    },
    {
      id: "rel-jeremie-eliahou-ontiveros",
      kind: "collaborated",
      target: "jeremie-eliahou-ontiveros",
      targetName: "Jeremie Eliahou Ontiveros",
      note: "Co-author on the March 2024 'AI Datacenter Energy Dilemma' report and lead author of the September 2025 Colossus 2 analysis.",
      sourceIds: [S.saEnergy, S.saColossus2],
    },
    {
      id: "rel-wei-zhou",
      kind: "collaborated",
      target: "wei-zhou",
      targetName: "Wei Zhou",
      note: "Co-author on the September 2025 Colossus 2 report; the former employee whose 2026 countersuit and SemiAnalysis's trade-secret suit put the analyst-investor conflict question on record.",
      sourceIds: [S.saColossus2, S.mtm],
    },
    {
      id: "rel-maya-barkin",
      kind: "collaborated",
      target: "maya-barkin",
      targetName: "Maya Barkin",
      note: "Co-author on the September 2025 'xAI's Colossus 2' report.",
      sourceIds: [S.saColossus2],
    },
    {
      id: "rel-aj-kourabi",
      kind: "collaborated",
      target: "aj-kourabi",
      targetName: "AJ Kourabi",
      note: "Co-author on the September 2025 'xAI's Colossus 2' report.",
      sourceIds: [S.saColossus2],
    },
    {
      id: "rel-james-van-geelen",
      kind: "collaborated",
      target: "james-van-geelen",
      targetName: "James van Geelen",
      note: "Founder of Citrini Research; stayed on as its CEO after SemiAnalysis acquired the firm in September 2026.",
      targetWikidataId: "Q138465346",
      sourceIds: [S.bloomberg],
    },
    {
      id: "rel-thinking-machines",
      kind: "invested_in",
      target: "thinking-machines-lab",
      targetName: "Thinking Machines Lab",
      targetKind: "organization",
      note: "One of the roughly 20 startups in which reporting describes him holding a personal stake.",
      targetWikidataId: "Q132532850",
      sourceIds: [S.theinformation],
    },
    {
      id: "rel-enfabrica",
      kind: "invested_in",
      target: "enfabrica",
      targetName: "Enfabrica",
      targetKind: "organization",
      note: "One of the roughly 20 startups in which reporting describes him holding a personal stake.",
      sourceIds: [S.theinformation],
    },
    {
      id: "rel-fluidstack",
      kind: "invested_in",
      target: "fluidstack",
      targetName: "Fluidstack",
      targetKind: "organization",
      note: "Reported $50 million special-purpose vehicle raised inside a Fluidstack funding round.",
      targetWikidataId: "Q131633312",
      sourceIds: [S.theinformation],
    },
    {
      id: "rel-dwarkesh-patel",
      kind: "interviewed_by",
      target: "dwarkesh-patel",
      targetName: "Dwarkesh Patel",
      note: "Dwarkesh Podcast, October 2024 — a joint episode with Asianometry's Jon Y on how the semiconductor industry works.",
      targetWikidataId: "Q137008739",
      sourceIds: [S.dwarkesh],
    },
    {
      id: "rel-joe-weisenthal",
      kind: "interviewed_by",
      target: "joe-weisenthal",
      targetName: "Joe Weisenthal",
      note: "Bloomberg's Odd Lots emergency episode on Huawei's Kirin 9000S, September 2023.",
      targetWikidataId: "Q107452067",
      sourceIds: [S.oddlots],
    },
    {
      id: "rel-tracy-alloway",
      kind: "interviewed_by",
      target: "tracy-alloway",
      targetName: "Tracy Alloway",
      note: "Bloomberg's Odd Lots emergency episode on Huawei's Kirin 9000S, September 2023.",
      targetWikidataId: "Q106804600",
      sourceIds: [S.oddlots],
    },
    {
      id: "rel-brad-gerstner",
      kind: "interviewed_by",
      target: "brad-gerstner",
      targetName: "Brad Gerstner",
      note: "BG2Pod, 'AI Semiconductor Landscape,' December 2024.",
      targetWikidataId: "Q115446687",
      sourceIds: [S.bg2],
    },
    {
      id: "rel-bill-gurley",
      kind: "interviewed_by",
      target: "bill-gurley",
      targetName: "Bill Gurley",
      note: "BG2Pod, 'AI Semiconductor Landscape,' December 2024.",
      targetWikidataId: "Q4909249",
      sourceIds: [S.bg2],
    },
    {
      id: "rel-shaun-maguire",
      kind: "interviewed_by",
      target: "shaun-maguire",
      targetName: "Shaun Maguire",
      note: "Sequoia's Training Data podcast, recorded in the SemiAnalysis office, June 2026.",
      targetWikidataId: "Q59667927",
      sourceIds: [S.sequoia],
    },
    {
      id: "rel-sonya-huang",
      kind: "interviewed_by",
      target: "sonya-huang",
      targetName: "Sonya Huang",
      note: "Sequoia's Training Data podcast, recorded in the SemiAnalysis office, June 2026.",
      sourceIds: [S.sequoia],
    },
  ],
  openQuestions: [
    "His exact birthdate is inferred from his own 'first blog on my 24th birthday, May 22, 2020' statement; press describing him as 29 in early 2026 is consistent, but no primary record confirms it.",
    "Reported headcount and revenue are moving targets — 32 staff per his May 2025 post, roughly 60 per The Information's 2026 reporting, about 90 per mid-2026 interviews — and the $100 million 2026 figure is a projection, not a result.",
    "The GPT-4 report's specific figures were never officially confirmed by OpenAI; how much of it was exactly right remains unsettled.",
    "The cross-lawsuits with former employee Wei Zhou — trade-secret claims one way, wrongful-termination and MNPI allegations the other — are unresolved as of this index.",
    "Whether SemiAnalysis Capital Fund I reaches its $400 million target, and how it manages conflicts with the research business, is not yet on record.",
    "No Wikipedia article or Wikidata item for Patel was found as of this index; identity rests on subject-controlled and press sources.",
  ],
  body: `Dylan Patel is the founder, CEO, and chief analyst of SemiAnalysis, the research firm that turned semiconductor supply-chain minutiae into one of the most-read intelligence products in the AI economy. What began on his 24th birthday — May 22, 2020 — as a real-name blog about chips now sells data and analysis to hyperscalers, AI labs, chipmakers, and the investors financing them, with The Information reporting roughly 60 employees and more than $100 million in projected 2026 revenue.

## Identity and formation

Patel's origin story is unusually well-documented because he tells it himself. He grew up inside his family's small businesses in rural Georgia — living in the motel his parents ran, later working around their gas station. The hardware obsession started with a broken Xbox 360: fixing the "red ring of death" by shorting a temperature sensor opened, in his phrase, Pandora's box. By about age twelve he was moderating online forums and Reddit communities covering Android, Apple, Google, Intel, NVIDIA, AMD, and PC building — years of public arguing about silicon before he owned much of the hardware he argued about.

He studied at the University of Georgia's Terry College of Business from 2014 to 2017, taking degrees in Risk Management & Insurance and Management Information Systems plus a legal studies certificate — no semiconductor-engineering degree. He then spent about two years as a quantitative analyst at a small risk firm, leaving after a dispute over credit and bonus. Through it all he kept posting, anonymously, until an internet argument got him doxxed; after a brief scare he concluded the obvious and started writing under his own name. That blog became SemiAnalysis, and the posting habit never left — he still answers critics online personally, against the advice of his own marketing team.

## Building SemiAnalysis

The firm's model is to be more granular than anyone else willing to publish. SemiAnalysis reports treat the AI industry as a physical object: HBM stacks and CoWoS packaging capacity, accelerator bill-of-materials, cluster network topologies, chiller counts, substation timelines, and turbine fleets — each converted into dollar and gigawatt figures that executives and traders can price. The Datacenter Industry Model sells building-by-building tracking of more than 5,000 datacenters assembled from property records, permits, power usage, FOIA requests, and computer-vision reads on satellite imagery.

He began hiring in 2022 — the first employees were people he knew from Discord — and by his own account the team passed thirty in 2025. The newsletter itself — free analysis up front, paid depth behind it — is among the largest technology publications on Substack, past 200,000 subscribers on reported figures. The business expanded from a solo newsletter into institutional products — the accelerator, datacenter, energy, memory, and cloud-TCO models, plus the open InferenceX inference benchmark — and, in 2026, into adjacent businesses: a reported $400 million venture fund filing and the September acquisition of Citrini Research. Patel's own career now spans analyst, publisher, and investor: reporting describes stakes in roughly twenty AI-infrastructure startups.

## Signature reports

Three 2023 pieces made the firm's name. In May, SemiAnalysis published the leaked internal Google memo "We Have No Moat, And Neither Does OpenAI" — a Google researcher's argument that open-source AI would eat both companies — after verifying its authenticity. In June came "AMD MI300 – Taming The Hype," the deep dive on the first credible NVIDIA challenger. In July, with Gerald Wong, he published detailed alleged specifics of GPT-4 — about 1.8 trillion parameters, a 16-expert mixture-of-experts design, roughly 13 trillion training tokens — a report whose numbers were never officially confirmed but shaped public understanding of the model. A December Gemini analysis coined the vocabulary the industry still uses: "GPU-Rich" and "GPU-Poor."

The second signature era is physical infrastructure. The March 2024 "AI Datacenter Energy Dilemma" forecast US AI datacenter demand above 28 GW by 2026 and argued power, not chips, was the binding constraint — a call the firm considers vindicated. The January 2025 "DeepSeek Debates" dismantled the viral "$6 million model" figure during the market panic. And its xAI coverage counted chillers, turbines, and Megapacks across the Memphis Colossus sites while the world's largest training cluster went up.

## Influence and friction

The reach is real: Odd Lots, Dwarkesh Patel, BG2, and Sequoia's Training Data have all hosted him, and at GTC 2026 Jensen Huang gave InferenceX a keynote callout — conceding on stage that Patel's "sandbagging" accusation about benchmark claims was "not wrong." Ben Thompson and Jon Y endorse the publication on its own site.

The friction is real too. In spring 2026 SemiAnalysis sued former employee Wei Zhou for breach of contract and trade-secret misappropriation; Zhou countersued, alleging he was fired for refusing to put what he described as material non-public information into client models — allegations the firm denies and that surfaced questions about conflicts between Patel's personal investments and the research his firm sells. Both disputes were pending as of this index.

## What the record does not settle

The soft spots are biographical precision and contested claims. The birthdate rests on his own birthday-post account; the headcount and revenue figures are snapshots from different months; the GPT-4 numbers were sourced estimates OpenAI never confirmed; and the Zhou litigation — including the conflict-of-interest questions it raised about his investing alongside his analysis — is unresolved. The index preserves those seams rather than smoothing them over.

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
