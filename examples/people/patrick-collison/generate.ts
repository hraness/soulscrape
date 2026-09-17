#!/usr/bin/env bun
/** Generate examples/people/patrick-collison/person-index.json with derived source ids. */

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

const pcAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — Patrick Collison",
  url: "https://patrickcollison.com/about",
  publisher: "patrickcollison.com",
  notes: "The subject's own biography page; claims here are self-reported.",
});
const pcFast = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Fast — Patrick Collison",
  url: "https://patrickcollison.com/fast",
  publisher: "patrickcollison.com",
  notes:
    "His list of examples of people quickly accomplishing ambitious things together.",
});
const pcQuestions = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Questions — Patrick Collison",
  url: "https://patrickcollison.com/questions",
  publisher: "patrickcollison.com",
  notes: "His public list of questions he finds interesting.",
});
const pcAdvice = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Advice — Patrick Collison",
  url: "https://patrickcollison.com/advice",
  publisher: "patrickcollison.com",
  notes: "His written advice to people aged 10–20.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Patrick Collison",
  url: "https://en.wikipedia.org/wiki/Patrick_Collison",
  publisher: "Wikipedia",
  notes:
    "Used for discovery and corroboration, not as sole authority; carries an undue-weight notice on its Forbes-article section.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Patrick Collison (Q7146257)",
  url: "https://www.wikidata.org/wiki/Q7146257",
  publisher: "Wikidata",
});
const atlantic = source({
  binding: "first_person",
  mediaType: "article",
  title: "We Need a New Science of Progress",
  url: "https://www.theatlantic.com/science/archive/2019/07/we-need-new-science-progress/594946/",
  publisher: "The Atlantic",
  publishedAt: "2019-07-30",
  authors: ["Patrick Collison", "Tyler Cowen"],
});
const fastgrants = source({
  binding: "first_person",
  mediaType: "article",
  title: "What We Learned Doing Fast Grants",
  url: "https://future.com/what-we-learned-doing-fast-grants/",
  publisher: "Future (a16z)",
  publishedAt: "2020",
  authors: ["Patrick Collison", "Tyler Cowen", "Patrick Hsu"],
  notes:
    "First-person post-mortem on the Fast Grants experiment, published by Andreessen Horowitz's Future vertical.",
});
const stripeAtlas = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Announcing Stripe Atlas — helping entrepreneurs start a global business from anywhere",
  url: "https://stripe.com/newsroom/news/stripe-launches-atlas",
  publisher: "Stripe",
  publishedAt: "2016-02-24",
  notes: "Stripe newsroom announcement; company press material.",
});
const stripePress = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Stripe Press — Ideas for progress",
  url: "https://press.stripe.com/",
  publisher: "Stripe Press",
  notes: "Stripe's publishing imprint, which he champions.",
});
const arcLaunch = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "The Arc Institute Launches to Accelerate Scientific Breakthroughs in Complex Diseases in Collaboration with Stanford University, UCSF, and UC Berkeley",
  url: "https://www.businesswire.com/news/home/20211215005308/en/The-Arc-Institute-Launches-to-Accelerate-Scientific-Breakthroughs-in-Complex-Diseases-in-Collaboration-with-Stanford-University-UCSF-and-UC-Berkeley",
  publisher: "Business Wire",
  publishedAt: "2021-12-15",
  notes: "Arc Institute's launch press release, carried by Business Wire.",
});
const frontier = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title:
    "Stripe, Alphabet, Shopify, Meta, and McKinsey launch advance market commitment to buy $1B of carbon removal by 2030",
  url: "https://frontierclimate.com/writing/launch",
  publisher: "Frontier",
  publishedAt: "2022-04-12",
  notes: "Frontier's launch announcement; Frontier is a wholly owned Stripe subsidiary.",
});
const irishTimes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Limerick teens sell software firm in multimillion deal",
  url: "https://www.irishtimes.com/news/limerick-teens-sell-software-firm-in-multimillion-deal-1.907089",
  publisher: "The Irish Times",
  publishedAt: "2008",
  authors: ["John Collins"],
  notes: "Contemporaneous reporting on the Auctomatic sale.",
});
const bloomberg = source({
  binding: "reporting",
  mediaType: "article",
  title: "How Two Brothers Turned Seven Lines of Code Into a $9.2 Billion Startup",
  url: "https://www.bloomberg.com/news/features/2017-08-01/how-two-brothers-turned-seven-lines-of-code-into-a-9-2-billion-startup",
  publisher: "Bloomberg Businessweek",
  publishedAt: "2017-08-01",
  authors: ["Ashlee Vance"],
  notes: "Feature on the brothers and Stripe's early history.",
});
const dwarkesh = source({
  binding: "interview",
  mediaType: "webpage",
  title: "Patrick Collison (Stripe CEO) — Craft, Beauty, & the Future of Payments",
  url: "https://www.dwarkesh.com/p/patrick-collison",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2024-02-21",
  authors: ["Dwarkesh Patel"],
  notes:
    "Episode page with transcript and audio; the YouTube release is titled 'Why Silicon Valley's most talented should leave'.",
});
const cwt = source({
  binding: "interview",
  mediaType: "webpage",
  title: "Patrick Collison has a Few Questions for Tyler (Ep. 21 — Live at Stripe)",
  url: "https://conversationswithtyler.com/episodes/patrick-collison/",
  publisher: "Conversations with Tyler",
  publishedAt: "2017",
  authors: ["Tyler Cowen"],
  notes:
    "Recorded January 25, 2017 at Stripe's San Francisco office; Collison interviews Cowen.",
});
const iltb = source({
  binding: "interview",
  mediaType: "audio",
  title: "A Business State of Mind (Invest Like the Best, EP.348)",
  url: "https://colossus.com/episode/collison-a-business-state-of-mind/",
  publisher: "Colossus",
  publishedAt: "2023-10-17",
  authors: ["Patrick O'Shaughnessy"],
  notes: "Podcast episode with both Collison brothers; page carries the transcript.",
});
const ferriss = source({
  binding: "interview",
  mediaType: "video",
  title: "Patrick Collison — CEO of Stripe | The Tim Ferriss Show",
  url: "https://www.youtube.com/watch?v=l73FKkh29yE",
  publisher: "Tim Ferriss",
  publishedAt: "2019-01-22",
  authors: ["Tim Ferriss"],
});
const meta = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Patrick Collison and Dina Powell McCormick to Join Meta Board of Directors",
  url: "https://investor.atmeta.com/investor-news/press-release-details/2025/Patrick-Collison-and-Dina-Powell-McCormick-to-Join-Meta-Board-of-Directors/default.aspx",
  publisher: "Meta Investor Relations",
  publishedAt: "2025-04-11",
  notes: "Meta press release; election effective April 15, 2025.",
});
const rhine = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Leadership — Rhine Group",
  url: "https://www.rhinegroup.eu/leadership",
  publisher: "Rhine Group",
  publishedAt: "2026",
  notes: "The Rhine Group's own leadership page; he is co-chair and co-founder.",
});

const S = {
  pcAbout: pcAbout.id,
  pcFast: pcFast.id,
  pcQuestions: pcQuestions.id,
  pcAdvice: pcAdvice.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  atlantic: atlantic.id,
  fastgrants: fastgrants.id,
  stripeAtlas: stripeAtlas.id,
  stripePress: stripePress.id,
  arcLaunch: arcLaunch.id,
  frontier: frontier.id,
  irishTimes: irishTimes.id,
  bloomberg: bloomberg.id,
  dwarkesh: dwarkesh.id,
  cwt: cwt.id,
  iltb: iltb.id,
  ferriss: ferriss.id,
  meta: meta.id,
  rhine: rhine.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-patrick-collison",
  generatedAt: "2026-09-16T20:00:00Z",
  subject: {
    kind: "person",
    handle: "patrick-collison",
    displayName: "Patrick Collison",
    summary:
      "Irish entrepreneur and programmer who co-founded Stripe with his brother John in 2010 and serves as its CEO. He also co-founded the Arc Institute and the Rhine Group, and helped launch 'progress studies' through a 2019 Atlantic essay co-written with Tyler Cowen.",
    identity: {
      wikidataId: "Q7146257",
      officialSite: "https://patrickcollison.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Patrick_Collison",
      profiles: ["https://github.com/pc", "https://x.com/patrickc"],
    },
  },
  scope: {
    asOf: "2026-09-16T20:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    pcAbout,
    pcFast,
    pcQuestions,
    pcAdvice,
    wikipedia,
    wikidata,
    atlantic,
    fastgrants,
    stripeAtlas,
    stripePress,
    arcLaunch,
    frontier,
    irishTimes,
    bloomberg,
    dwarkesh,
    cwt,
    iltb,
    ferriss,
    meta,
    rhine,
  ],
  claims: [
    {
      id: "claim-born-1988",
      kind: "fact",
      text: "Patrick Collison was born on September 9, 1988, in Limerick, Ireland, to microbiologist Lily and electronic engineer Denis Collison; the eldest of three boys, he was raised in the village of Dromineer, County Tipperary.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-early-programming",
      kind: "fact",
      text: "He took his first computer course at age eight at the University of Limerick and began learning to program at ten.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-young-scientist",
      kind: "fact",
      text: "After a runner-up finish the previous year with an AI project nicknamed 'Isaac', he won Ireland's 41st Young Scientist and Technology Exhibition on January 14, 2005, aged sixteen, for Croma, a Lisp-type programming language.",
      sourceIds: [S.wikipedia, S.irishTimes],
    },
    {
      id: "claim-mit-dropout",
      kind: "fact",
      text: "He attended the Massachusetts Institute of Technology but dropped out in 2009 after starting businesses.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-shuppa-auctomatic",
      kind: "fact",
      text: "In 2007 he and his brother John founded a software company called Shuppa in Limerick; after Enterprise Ireland declined to fund it, Y Combinator backed the brothers, they moved to California, and merged with Harjeet and Kulveer Taggar's startup to form Auctomatic.",
      sourceIds: [S.wikipedia, S.irishTimes],
    },
    {
      id: "claim-auctomatic-sale",
      kind: "fact",
      text: "Around Good Friday of March 2008 — Patrick nineteen and John seventeen — Auctomatic was sold to Canadian firm Live Current Media for more than $5 million, making the brothers millionaires; Patrick became director of engineering at its Vancouver base that May.",
      sourceIds: [S.irishTimes, S.wikipedia],
    },
    {
      id: "claim-stripe-founded",
      kind: "fact",
      text: "In 2010 he co-founded Stripe with John; in 2011 the company took $2 million from investors including PayPal founders Elon Musk and Peter Thiel, Sequoia Capital, Andreessen Horowitz, and SV Angel.",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "claim-youngest-billionaire",
      kind: "fact",
      text: "A November 2016 round valuing Stripe at $9.2 billion made the Collison brothers the world's youngest self-made billionaires at the time; a September 2019 round valued the company at $35 billion, and the brothers retain a controlling interest.",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "claim-stripe-scale",
      kind: "fact",
      text: "By early 2024 Stripe was processing on the order of $1 trillion in payments per year.",
      sourceIds: [S.dwarkesh],
    },
    {
      id: "claim-atlas-launch",
      kind: "fact",
      text: "Stripe Atlas launched on February 24, 2016 — announced by Collison at Mobile World Congress in Barcelona — offering entrepreneurs anywhere a Delaware incorporation, a U.S. bank account, and a Stripe account for a $500 beta price.",
      sourceIds: [S.stripeAtlas],
    },
    {
      id: "claim-stripe-press",
      kind: "fact",
      text: "Stripe Press, the company's publishing imprint, issues books on progress, technology, and economic history — among them Poor Charlie's Almanack, Working in Public, The Origins of Efficiency, and The Scaling Era.",
      sourceIds: [S.stripePress],
    },
    {
      id: "claim-frontier",
      kind: "fact",
      text: "On April 12, 2022, Stripe, Alphabet, Shopify, Meta, and McKinsey launched Frontier, a roughly $1 billion advance market commitment to buy permanent carbon removal by 2030; Frontier is a wholly owned Stripe subsidiary and grew out of Stripe's 2019 carbon-removal purchasing commitment and Stripe Climate.",
      sourceIds: [S.frontier],
    },
    {
      id: "claim-fastgrants",
      kind: "fact",
      text: "In April 2020, with Tyler Cowen and Patrick Hsu, he co-founded Fast Grants — emergency COVID-19 science funding run under George Mason University's Mercatus Center, with applications taking under 30 minutes and decisions inside 48 hours.",
      sourceIds: [S.fastgrants, S.wikipedia],
    },
    {
      id: "claim-fastgrants-finding",
      kind: "fact",
      text: "The Fast Grants post-mortem reports that nearly 80% of recipients said they would change their research program 'a lot' if their existing funding could be spent unconstrained — the observation that seeded Arc's funding model.",
      sourceIds: [S.fastgrants, S.arcLaunch],
    },
    {
      id: "claim-arc",
      kind: "fact",
      text: "On December 15, 2021 he co-launched the Arc Institute with Silvana Konermann and Patrick Hsu — a nonprofit in Palo Alto partnered with Stanford, UC Berkeley, and UCSF, whose donors committed more than $650 million to fully fund scientists for renewable eight-year terms.",
      sourceIds: [S.arcLaunch, S.wikipedia],
    },
    {
      id: "claim-atlantic-2018",
      kind: "fact",
      text: "In November 2018 he published an earlier Atlantic essay with Michael Nielsen, 'Science Is Getting Less Bang for Its Buck,' arguing that rising science investment has not produced commensurate output.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-atlantic-2019",
      kind: "fact",
      text: "On July 30, 2019 he and Tyler Cowen published 'We Need a New Science of Progress' in The Atlantic, proposing 'Progress Studies' as a dedicated field.",
      sourceIds: [S.atlantic],
    },
    {
      id: "claim-page-ambassador",
      kind: "fact",
      text: "In 2016 he was named a Presidential Ambassador for Global Entrepreneurship under President Obama.",
      sourceIds: [S.ferriss],
    },
    {
      id: "claim-meta-board",
      kind: "fact",
      text: "He was elected to Meta's board of directors effective April 15, 2025, having earlier served on Meta's external advisory group.",
      sourceIds: [S.meta, S.wikipedia],
    },
    {
      id: "claim-rhine",
      kind: "fact",
      text: "In 2026 he co-founded the Rhine Group with Mario Draghi — a forum of European leaders on competitiveness that he co-chairs, with Luis Garicano as executive director.",
      sourceIds: [S.rhine, S.wikipedia],
    },
    {
      id: "claim-miriam-2009",
      kind: "fact",
      text: "On July 18, 2009, aged twenty, he outlined his ideas for Ireland's future on the talk show Saturday Night with Miriam following the McCarthy Report on public spending.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-forbes-removed",
      kind: "fact",
      text: "A 2021 Forbes profile described Limerick as a 'warzone' and 'murder capital'; after public backlash and Collison's objection — 'We are who we are because we grew up where we did' — Forbes removed the article on April 9, 2021.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-progress-understudied",
      kind: "stated_belief",
      text: "With Cowen he argues that progress itself is understudied — that no broad-based intellectual movement exists to understand the dynamics of economic, technological, scientific, cultural, and organizational advancement or to speed it up.",
      sourceIds: [S.atlantic],
    },
    {
      id: "claim-speed-declined",
      kind: "stated_belief",
      text: "His 'Fast' page catalogs quickly executed projects — the Empire State Building in 410 days, the P-80 in 143 days, Apollo 8's decision-to-launch in 134 days — to argue that rapid execution was once common and to ask why it is rarer now.",
      sourceIds: [S.pcFast, S.pcQuestions],
    },
    {
      id: "claim-cost-disease",
      kind: "stated_belief",
      text: "His published questions ask why healthcare, education, and construction costs keep outpacing inflation, why GDP growth is so strangely smooth, how institutions with no natural death get replaced, and how more experimental cities could get started.",
      sourceIds: [S.pcQuestions],
    },
    {
      id: "claim-advice-youth",
      kind: "stated_belief",
      text: "His written advice urges people aged 10–20 to go deep on multiple things, befriend people online who are great at shared interests, avoid judging success by their immediate peer group, and hurry — great work is often done at surprisingly young ages.",
      sourceIds: [S.pcAdvice],
    },
    {
      id: "claim-craft-beauty",
      kind: "stated_belief",
      text: "He argues that craft and beauty are durable competitive advantages even at scale — citing LVMH, Apple, and TSMC — and says Stripe's conviction in this has grown as the company has gotten larger.",
      sourceIds: [S.dwarkesh],
    },
    {
      id: "claim-developer-first",
      kind: "stated_belief",
      text: "He built Stripe on the conviction that internet payments should be programmable — developer-first APIs replacing a weeks-long negotiation with banks and gateways by a few lines of code.",
      sourceIds: [S.bloomberg, S.dwarkesh],
    },
    {
      id: "claim-people-not-projects",
      kind: "stated_belief",
      text: "He argues science funding should bet on people rather than project proposals — the premise behind Fast Grants' 48-hour decisions and Arc's pre-funded eight-year labs.",
      sourceIds: [S.fastgrants, S.arcLaunch],
    },
    {
      id: "claim-irish-identity",
      kind: "stated_belief",
      text: "He publicly rejected the 'escaped from Limerick' framing of his origin story, writing that the idea of 'overcoming' anything is crazy: 'We are who we are because we grew up where we did.'",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-institution-builder",
      kind: "pattern",
      text: "Across the record he repeatedly responds to systemic friction by founding institutions rather than commenting on it — Auctomatic, Stripe, Stripe Atlas, Stripe Press, Fast Grants, Arc, Frontier, and the Rhine Group.",
      sourceIds: [S.bloomberg, S.stripeAtlas, S.fastgrants, S.arcLaunch, S.rhine],
    },
    {
      id: "claim-speed-recurring",
      kind: "pattern",
      text: "Speed recurs as both subject and method: the Fast examples page, Fast Grants' sub-48-hour funding decisions, and Atlas compressing company formation from months to days.",
      sourceIds: [S.pcFast, S.fastgrants, S.stripeAtlas],
    },
    {
      id: "claim-books-as-tools",
      kind: "pattern",
      text: "He treats books and curated reading as infrastructure — a public questions list, reading lists on his own site, and a corporate imprint that reissues technical and economic classics.",
      sourceIds: [S.pcQuestions, S.stripePress, S.pcAdvice],
    },
    {
      id: "claim-programmable-framing",
      kind: "pattern",
      text: "He describes Stripe in nearly identical terms across his own bio, company releases, and Meta's filing: 'programmable financial infrastructure' and 'economic infrastructure for the internet' whose stated mission is to increase the GDP of the internet.",
      sourceIds: [S.pcAbout, S.meta, S.iltb],
    },
    {
      id: "claim-spec-sf-tension",
      kind: "speculation",
      text: "He simultaneously calls San Francisco the 'Schelling point' for ambitious young people and questions whether the Valley's most talented should leave it for deeper technical work — a tension the record does not resolve.",
      sourceIds: [S.pcAdvice, S.dwarkesh],
    },
    {
      id: "claim-spec-mission-measure",
      kind: "speculation",
      text: "Whether 'increase the GDP of the internet' functions as a measurable objective or a directional mission is unsettled — the founders discuss it as an open-ended prompt rather than a KPI.",
      sourceIds: [S.iltb, S.dwarkesh],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1988-09-09",
      title: "Born in Limerick, Ireland",
      summary:
        "Son of microbiologist Lily and electronic engineer Denis Collison; raised in Dromineer, County Tipperary.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-young-scientist",
      kind: "award",
      date: "2005-01-14",
      title: "Won the 41st Young Scientist and Technology Exhibition",
      summary:
        "At sixteen, took first place for Croma, a Lisp-type programming language; prize presented by President Mary McAleese.",
      organization: "BT Young Scientist and Technology Exhibition",
      organizationHandle: "bt-young-scientist-and-technology-exhibition",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-shuppa",
      kind: "founded",
      date: "2007",
      title: "Founded Shuppa in Limerick with John Collison",
      summary:
        "After Enterprise Ireland declined funding, Y Combinator backed the brothers; in California they merged with the Taggar cousins' startup to form Auctomatic.",
      location: "Limerick, Ireland",
      sourceIds: [S.wikipedia, S.irishTimes],
    },
    {
      id: "event-auctomatic-sale",
      kind: "milestone",
      date: "2008-03",
      title: "Auctomatic sold to Live Current Media",
      summary:
        "Sale for more than $5 million made Patrick, nineteen, and John, seventeen, millionaires; Patrick became director of engineering in Vancouver.",
      organization: "Live Current Media",
      organizationHandle: "live-current-media",
      sourceIds: [S.irishTimes, S.wikipedia],
    },
    {
      id: "event-mit-left",
      kind: "education",
      date: "2009",
      title: "Left MIT",
      summary: "Dropped out of the Massachusetts Institute of Technology after starting businesses.",
      organization: "Massachusetts Institute of Technology",
      organizationHandle: "massachusetts-institute-of-technology",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-stripe-founded",
      kind: "founded",
      date: "2010",
      title: "Co-founded Stripe with John Collison",
      summary:
        "Developer-first payments infrastructure; first outside investment in 2011 included PayPal's founders, Sequoia, Andreessen Horowitz, and SV Angel.",
      organization: "Stripe",
      organizationHandle: "stripe",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "event-atlas",
      kind: "project",
      date: "2016-02-24",
      title: "Stripe Atlas launched",
      summary:
        "Announced on stage at Mobile World Congress in Barcelona; incorporated U.S. businesses for entrepreneurs worldwide.",
      organization: "Stripe",
      organizationHandle: "stripe",
      location: "Barcelona, Spain",
      sourceIds: [S.stripeAtlas],
    },
    {
      id: "event-billionaire",
      kind: "milestone",
      date: "2016-11",
      title: "Became the world's youngest self-made billionaire",
      summary:
        "A CapitalG and General Catalyst investment valued Stripe at $9.2 billion; he and John were reported as the youngest self-made billionaires.",
      organization: "Stripe",
      organizationHandle: "stripe",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-atlantic-essay",
      kind: "publication",
      date: "2019-07-30",
      title: "'We Need a New Science of Progress' in The Atlantic",
      summary: "With Tyler Cowen; proposed Progress Studies as a dedicated discipline.",
      sourceIds: [S.atlantic],
    },
    {
      id: "event-fastgrants",
      kind: "project",
      date: "2020-04",
      title: "Co-founded Fast Grants",
      summary:
        "With Tyler Cowen and Patrick Hsu under the Mercatus Center; COVID-19 research funding with decisions inside 48 hours.",
      organization: "Fast Grants",
      organizationHandle: "fast-grants",
      sourceIds: [S.fastgrants, S.wikipedia],
    },
    {
      id: "event-arc",
      kind: "founded",
      date: "2021-12-15",
      title: "Arc Institute launched",
      summary:
        "With Silvana Konermann and Patrick Hsu; nonprofit biomedical institute in Palo Alto partnered with Stanford, UC Berkeley, and UCSF, backed by more than $650 million.",
      organization: "Arc Institute",
      organizationHandle: "arc-institute",
      location: "Palo Alto, California",
      sourceIds: [S.arcLaunch],
    },
    {
      id: "event-frontier",
      kind: "project",
      date: "2022-04-12",
      title: "Frontier carbon-removal commitment launched",
      summary:
        "Stripe, Alphabet, Shopify, Meta, and McKinsey committed roughly $1 billion to buy permanent carbon removal by 2030.",
      organization: "Frontier",
      organizationHandle: "frontier",
      sourceIds: [S.frontier],
    },
    {
      id: "event-meta-board",
      kind: "role",
      date: "2025-04-15",
      title: "Joined Meta's board of directors",
      summary:
        "Elected alongside Dina Powell McCormick; he had previously served on Meta's external advisory group.",
      organization: "Meta Platforms",
      organizationHandle: "meta-platforms",
      sourceIds: [S.meta],
    },
    {
      id: "event-rhine",
      kind: "founded",
      date: "2026",
      title: "Co-founded the Rhine Group with Mario Draghi",
      summary:
        "A forum of European leaders from government, academia, and business on the future of European competitiveness; he serves as co-chair.",
      organization: "Rhine Group",
      organizationHandle: "rhine-group",
      sourceIds: [S.rhine, S.wikipedia],
    },
  ],
  themes: [
    {
      id: "theme-progress-studies",
      kind: "philosophy",
      status: "stated",
      title: "Progress studies",
      summary:
        "Progress — economic, technological, scientific, cultural, organizational — is understudied and deserves a dedicated discipline aimed at understanding and accelerating it. The 2019 Atlantic essay made the case; his site collects the responses.",
      sourceIds: [S.atlantic, S.wikipedia],
    },
    {
      id: "theme-speed",
      kind: "method",
      status: "stated",
      title: "Speed as a measurable virtue",
      summary:
        "Execution speed is his favorite diagnostic: the Fast page's 410-day Empire State Building and 143-day P-80, Fast Grants' 48-hour decisions, and Atlas turning incorporation into days all ask why organizations got slower.",
      sourceIds: [S.pcFast, S.fastgrants, S.stripeAtlas],
    },
    {
      id: "theme-metascience",
      kind: "interest",
      status: "stated",
      title: "The science of science",
      summary:
        "From 'Science Is Getting Less Bang for Its Buck' with Michael Nielsen to Fast Grants to Arc's eight-year unconstrained funding, he works on how research itself is organized — betting on people rather than proposals.",
      sourceIds: [S.wikipedia, S.fastgrants, S.arcLaunch],
    },
    {
      id: "theme-programmable-infra",
      kind: "belief",
      status: "stated",
      title: "Programmable economic infrastructure",
      summary:
        "Payments, incorporation, and carbon procurement should be developer-accessible primitives. Stripe's mission — increase the GDP of the internet — treats infrastructure as the lever for economic expansion.",
      sourceIds: [S.bloomberg, S.dwarkesh, S.iltb],
    },
    {
      id: "theme-craft-beauty",
      kind: "belief",
      status: "stated",
      title: "Craft and beauty at scale",
      summary:
        "Aesthetic quality is not cosmetic but competitive: he cites LVMH, Apple, and TSMC as evidence that companies distinguished by craft outperform, and says Stripe's conviction has deepened with size.",
      sourceIds: [S.dwarkesh, S.stripePress],
    },
    {
      id: "theme-cost-stagnation",
      kind: "interest",
      status: "stated",
      title: "Cost disease and institutional stagnation",
      summary:
        "His questions page dwells on why healthcare, education, and construction costs outrun inflation, why institutions that cannot die persist, and whether new cities could restore experimentation.",
      sourceIds: [S.pcQuestions],
    },
    {
      id: "theme-early-ambition",
      kind: "belief",
      status: "stated",
      title: "Ambition, early and unashamed",
      summary:
        "His advice tells teenagers to go deep on several things, find their people online, ignore the local peer group as a yardstick, and hurry — the record of his own teenage years is the demonstration.",
      sourceIds: [S.pcAdvice, S.wikipedia, S.irishTimes],
    },
    {
      id: "theme-institution-design",
      kind: "practice",
      status: "inferred",
      title: "Institution-building as the unit of work",
      summary:
        "Reading across the record, his consistent instrument is the new institution: an accelerator-era startup, an API company, a grant program, a research institute, an advance market commitment, a policy forum.",
      sourceIds: [S.bloomberg, S.fastgrants, S.arcLaunch, S.rhine],
    },
    {
      id: "theme-ireland-europe",
      kind: "interest",
      status: "reported",
      title: "Ireland and European competitiveness",
      summary:
        "The thread runs from his 2009 Saturday Night with Miriam appearance on Ireland's future through his defense of Limerick against the Forbes profile to co-founding the Rhine Group with Mario Draghi in 2026.",
      sourceIds: [S.wikipedia, S.rhine],
    },
  ],
  works: [
    {
      id: "work-stripe",
      kind: "project",
      status: "ongoing",
      title: "Stripe",
      date: "2010",
      summary:
        "Programmable financial infrastructure company he co-founded with John Collison and leads as CEO; roughly $1 trillion in annual payment volume by 2024.",
      sourceIds: [S.wikipedia, S.bloomberg, S.dwarkesh],
    },
    {
      id: "work-croma",
      kind: "project",
      status: "completed",
      title: "Croma",
      date: "2005",
      summary:
        "The Lisp-type programming language that won him the 41st Young Scientist and Technology Exhibition at sixteen.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-auctomatic",
      kind: "project",
      status: "completed",
      title: "Shuppa / Auctomatic",
      date: "2007",
      summary:
        "Commerce tools for eBay power sellers, built with his brother and the Taggar cousins through Y Combinator; sold to Live Current Media in March 2008.",
      sourceIds: [S.wikipedia, S.irishTimes],
    },
    {
      id: "work-stripe-atlas",
      kind: "product",
      status: "ongoing",
      title: "Stripe Atlas",
      date: "2016-02-24",
      summary:
        "Incorporation and business-infrastructure service giving entrepreneurs anywhere a U.S. entity, bank account, and Stripe account.",
      sourceIds: [S.stripeAtlas],
    },
    {
      id: "work-stripe-press",
      kind: "project",
      status: "ongoing",
      title: "Stripe Press",
      summary:
        "Stripe's publishing imprint for books on progress and company-building — Poor Charlie's Almanack, Working in Public, The Origins of Efficiency, The Scaling Era, and others.",
      sourceIds: [S.stripePress],
    },
    {
      id: "work-frontier",
      kind: "project",
      status: "ongoing",
      title: "Frontier",
      date: "2022-04-12",
      summary:
        "Roughly $1 billion advance market commitment for permanent carbon removal, founded by Stripe with Alphabet, Shopify, Meta, and McKinsey.",
      sourceIds: [S.frontier],
    },
    {
      id: "work-fastgrants",
      kind: "project",
      status: "completed",
      title: "Fast Grants",
      date: "2020-04",
      summary:
        "Emergency COVID-19 science funding with sub-48-hour decisions, co-founded with Tyler Cowen and Patrick Hsu under the Mercatus Center.",
      sourceIds: [S.fastgrants, S.wikipedia],
    },
    {
      id: "work-arc",
      kind: "project",
      status: "ongoing",
      title: "Arc Institute",
      date: "2021",
      location: "Palo Alto, California",
      summary:
        "Nonprofit biomedical research institute co-founded with Silvana Konermann and Patrick Hsu; more than $650 million committed to fully fund scientists for renewable eight-year terms.",
      sourceIds: [S.arcLaunch],
    },
    {
      id: "work-rhine",
      kind: "project",
      status: "ongoing",
      title: "Rhine Group",
      date: "2026",
      summary:
        "Forum on European competitiveness co-founded and co-chaired with Mario Draghi; Luis Garicano is executive director.",
      sourceIds: [S.rhine],
    },
    {
      id: "work-progress-essay",
      kind: "paper",
      status: "published",
      title: "We Need a New Science of Progress",
      date: "2019-07-30",
      summary:
        "Atlantic essay with Tyler Cowen arguing progress is understudied and proposing the discipline of Progress Studies.",
      sourceIds: [S.atlantic],
    },
    {
      id: "work-fastgrants-essay",
      kind: "paper",
      status: "published",
      title: "What We Learned Doing Fast Grants",
      date: "2020",
      summary:
        "Post-mortem with Cowen and Hsu on rapid science funding, including the finding that most recipients would redirect unconstrained funding.",
      sourceIds: [S.fastgrants],
    },
    {
      id: "work-fast-page",
      kind: "other",
      status: "ongoing",
      title: "Fast",
      summary:
        "His maintained catalog of quickly accomplished ambitious projects — from the Pentagon's 491 days to JavaScript's 10 days — with solicited additions.",
      sourceIds: [S.pcFast],
    },
    {
      id: "work-questions-page",
      kind: "other",
      status: "ongoing",
      title: "Questions",
      summary:
        "His public list of open questions — cost disease, smooth GDP growth, institutional replacement, experimental cities, and more — with invited responses.",
      sourceIds: [S.pcQuestions],
    },
    {
      id: "work-advice-page",
      kind: "other",
      status: "published",
      title: "Advice",
      summary:
        "His written advice to people aged 10–20: go deep on multiple things, use the internet to find your people, and hurry.",
      sourceIds: [S.pcAdvice],
    },
  ],
  appearances: [
    {
      id: "appearance-cwt",
      title: "Patrick Collison has a Few Questions for Tyler (Live at Stripe)",
      venue: "Conversations with Tyler, Ep. 21",
      publishedAt: "2017",
      participants: ["Patrick Collison", "Tyler Cowen"],
      summary:
        "Collison flips the format and interviews Cowen at Stripe's San Francisco office — monocultures, macroeconomics, Thiel, Schelling, and why Twitter is underrated.",
      media: [
        {
          type: "article",
          url: "https://conversationswithtyler.com/episodes/patrick-collison/",
          sourceId: S.cwt,
        },
      ],
      sourceIds: [S.cwt],
    },
    {
      id: "appearance-ferriss",
      title: "Patrick Collison — CEO of Stripe",
      venue: "The Tim Ferriss Show",
      publishedAt: "2019-01-22",
      participants: ["Patrick Collison", "Tim Ferriss"],
      summary:
        "A long-form interview on Stripe's origins, the history of innovation, reading habits, and decision-making.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=l73FKkh29yE",
          sourceId: S.ferriss,
        },
      ],
      sourceIds: [S.ferriss],
    },
    {
      id: "appearance-iltb",
      title: "A Business State of Mind",
      venue: "Invest Like the Best with Patrick O'Shaughnessy, EP.348",
      publishedAt: "2023-10-17",
      participants: ["Patrick Collison", "John Collison", "Patrick O'Shaughnessy"],
      summary:
        "Both brothers on strategy, culture that attracts ambition, sweating details, and progress against the mission to raise the internet's GDP.",
      media: [
        {
          type: "audio",
          url: "https://colossus.com/episode/collison-a-business-state-of-mind/",
          sourceId: S.iltb,
        },
      ],
      sourceIds: [S.iltb],
    },
    {
      id: "appearance-dwarkesh",
      title: "Craft, Beauty, & the Future of Payments",
      venue: "Dwarkesh Podcast",
      publishedAt: "2024-02-21",
      participants: ["Patrick Collison", "Dwarkesh Patel"],
      summary:
        "On processing $1 trillion a year, multi-decade APIs, Arc Institute, Stripe Climate, and a devil's-advocate case against progress studies.",
      media: [
        {
          type: "article",
          url: "https://www.dwarkesh.com/p/patrick-collison",
          sourceId: S.dwarkesh,
        },
      ],
      sourceIds: [S.dwarkesh],
    },
    {
      id: "appearance-mwc-atlas",
      title: "Stripe Atlas announcement at Mobile World Congress",
      venue: "Mobile World Congress",
      publishedAt: "2016-02-24",
      participants: ["Patrick Collison"],
      summary:
        "He announced Atlas on stage in Barcelona — the product that lets entrepreneurs anywhere incorporate a U.S. business.",
      media: [
        {
          type: "article",
          url: "https://stripe.com/newsroom/news/stripe-launches-atlas",
          sourceId: S.stripeAtlas,
        },
      ],
      sourceIds: [S.stripeAtlas],
    },
  ],
  relations: [
    {
      id: "rel-stripe",
      kind: "founded",
      target: "stripe",
      targetName: "Stripe",
      targetKind: "organization",
      note: "Co-founded Stripe in 2010 and serves as its CEO.",
      start: "2010",
      targetWikidataId: "Q7624104",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "rel-john-collison",
      kind: "cofounder",
      target: "john-collison",
      targetName: "John Collison",
      note: "His brother and Stripe co-founder; the pair earlier founded Shuppa and merged it into Auctomatic.",
      start: "2007",
      targetWikidataId: "Q16233063",
      sourceIds: [S.wikipedia, S.bloomberg, S.irishTimes],
    },
    {
      id: "rel-john-collison-family",
      kind: "family",
      target: "john-collison",
      targetName: "John Collison",
      note: "His younger brother — born to Lily and Denis Collison, raised in Dromineer, County Tipperary.",
      targetWikidataId: "Q16233063",
      sourceIds: [S.wikipedia, S.irishTimes],
    },
  ],
  openQuestions: [
    "Stripe remains private, and reported valuations have swung widely across funding rounds and tender offers; the catalog here does not establish a current figure or any listing timeline.",
    "The details of Croma and the exact circumstances of his MIT departure are thinly documented — mostly short retellings rather than primary material.",
    "Whether 'increase the GDP of the internet' is a measurable objective or a directional mission remains unresolved even in the founders' own interviews.",
    "Arc's bet that unconstrained eight-year funding outperforms conventional grants is a long experiment whose results are not yet in.",
    "The Rhine Group launched in 2026; its agenda, governance, and output are not yet part of the public record.",
  ],
  body: `Patrick Collison is an Irish entrepreneur and programmer who has organized his career around a single question: what makes progress happen faster? He is co-founder and CEO of Stripe, the payments company he started with his brother John in 2010, and he has spent the years since building a constellation of institutions — a publishing imprint, a grant program, a research institute, a carbon-removal buyers' club, a European policy forum — around the same preoccupation.

## Identity and formation

Born September 9, 1988 in Limerick to microbiologist Lily and electronic engineer Denis Collison, he was raised the eldest of three boys in Dromineer, County Tipperary. He took his first computer course at eight at the University of Limerick and was programming by ten, educated at Gaelscoil Aonach Urmhumhan and then Castletroy College. At fifteen he was individual runner-up in Ireland's Young Scientist and Technology Exhibition with an AI project he named "Isaac"; the next year, on January 14, 2005, he won the competition outright with Croma, a Lisp dialect of his own design, accepting the trophy from President Mary McAleese. He attended MIT and dropped out in 2009, after starting businesses.

## From Shuppa to Stripe

The company that made him started in Limerick in 2007 as Shuppa — a play on *siopa*, Irish for "shop" — built with John. Enterprise Ireland declined to fund it; Y Combinator did, and in California the brothers merged with Oxford graduates Harjeet and Kulveer Taggar to form Auctomatic, tools for eBay power sellers. Around Good Friday of March 2008, with Patrick nineteen and John seventeen, Auctomatic sold to Canada's Live Current Media for more than $5 million. Patrick served as director of engineering in Vancouver before the brothers started again.

Stripe, founded in 2010, was a developer-first bet: payments reduced to a few lines of code where a bank negotiation once took weeks. Its 2011 backers included PayPal's own founders, Sequoia, Andreessen Horowitz, and SV Angel. A November 2016 round at a $9.2 billion valuation briefly made the Collisons the world's youngest self-made billionaires; by early 2024 the company was processing on the order of $1 trillion a year under the stated mission to "increase the GDP of the internet."

## Institutions around the company

The satellite ventures track his obsessions. Stripe Atlas, announced on stage at Mobile World Congress on February 24, 2016, compressed company formation — Delaware incorporation, a U.S. bank account, a Stripe account — into a $500 form, extending to the world the access he and John had needed Y Combinator to get. Stripe Press publishes books he thinks should exist: Munger's *Poor Charlie's Almanack*, Nadia Eghbal's *Working in Public*, Brian Potter's *The Origins of Efficiency*. Frontier, launched April 12, 2022 with Alphabet, Shopify, Meta, and McKinsey, is a roughly $1 billion advance market commitment for permanent carbon removal, grown out of Stripe's 2019 purchasing commitment.

The science ventures are more personal. Fast Grants, co-founded with Tyler Cowen and Patrick Hsu in April 2020 under George Mason's Mercatus Center, made COVID-era funding decisions in under 48 hours; its post-mortem reported that nearly 80% of recipients would change their research "a lot" if funding were unconstrained. That observation became the Arc Institute, launched December 15, 2021 with Silvana Konermann and Patrick Hsu: a Palo Alto nonprofit partnered with Stanford, UC Berkeley, and UCSF, backed by more than $650 million committed to funding scientists — people, not projects — for renewable eight-year terms. In 2026 he co-founded the Rhine Group with Mario Draghi, a forum on European competitiveness he co-chairs.

## The philosophy

His essays make the theory explicit. The July 2019 Atlantic piece with Cowen, "We Need a New Science of Progress," argued that progress itself is understudied — that no intellectual movement exists to understand or accelerate it — and proposed Progress Studies as the missing field; an earlier 2018 Atlantic essay with Michael Nielsen argued science delivers diminishing returns per dollar. His personal site carries the same preoccupations in catalog form: "Fast," examples of quickly built things, from the 410-day Empire State Building to the 134 days between Apollo 8's decision and launch; "Questions," a public list asking why healthcare and education costs outrun inflation, why GDP growth is so smooth, how undying institutions get replaced; "Advice," telling teenagers to go deep on several things, find their people online, and hurry.

Two convictions recur in interviews. Craft and beauty are competitive advantages at scale — his examples are LVMH, Apple, and TSMC. And infrastructure beats exhortation: rather than argue that more people should start companies or faster science should happen, he builds the rails — Atlas, Stripe, Fast Grants, Arc — that make them happen.

## The person behind the work

The public persona is unusually bibliographic: reading lists, a questions page that invites corrections, a publishing imprint. His Irish identity is defended rather than escaped — when a 2021 Forbes profile cast Limerick as a "warzone" he had overcome, he objected that "we are who we are because we grew up where we did," and the article was withdrawn. The pattern predates Stripe: at twenty he was on *Saturday Night with Miriam* outlining a future for post-crash Ireland. In April 2025 he joined Meta's board, having served on its advisory group. He lives in San Francisco — a city his advice page calls the Schelling point for the ambitious, even as his Dwarkesh interview wondered aloud whether the Valley's most talented should leave it for deeper technical work.

## What the record does not settle

The record is strikingly self-authored: much of the philosophy lives on his own pages and in friendly long-form interviews rather than at critical distance. Stripe's private status means valuation figures are snapshots, not a series. Whether Progress Studies is a field or a frame, whether Arc's eight-year bet outperforms the grant system, and what the Rhine Group will actually do — none of that is settled yet. Nor is the tension between his San Francisco optimism and his own questions about whether it still deserves the talent it attracts.

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
