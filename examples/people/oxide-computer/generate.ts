#!/usr/bin/env bun
/** Generate examples/people/oxide-computer/person-index.json with derived source ids.
 *
 * Subject kind "organization": founders, founding engineers, and investors ride
 * in `relations` (founded_by / employed / funded_by / collaborated / other);
 * funding rounds are "funding" timeline events; product and open-source
 * releases are "project"/"milestone" events.
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

const ACCESSED = "2026-09-18T05:30:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- subject-controlled ------------------------------------------------------

const oxideSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Oxide Computer Company",
  url: "https://oxide.computer/",
  publisher: "Oxide Computer Company",
  notes:
    "The company's site, built around the Cloud Computer: rack-scale, integrated compute/storage/networking that customers own and operate.",
});
const oxideBoot = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Introducing the Oxide Computer Company",
  url: "https://oxide.computer/blog/introducing-the-oxide-computer-company",
  publisher: "Oxide Computer Company",
  publishedAt: "2019-12-01",
  notes:
    "The December 1, 2019 founding announcement: 'We started with three folks — Bryan Cantrill, Steve Tuck, and Jessie Frazelle' — plus early investment led by Eclipse Ventures.",
});
const oxidePrinciples = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Oxide — Principles",
  url: "https://oxide.computer/principles",
  publisher: "Oxide Computer Company",
  notes:
    "The stated operating principles — the company's own answer to 'how does Oxide run itself.'",
});
const oxideRfd = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "RFD 1: Requests for Discussion",
  url: "https://oxide.computer/blog/rfd-1-requests-for-discussion",
  publisher: "Oxide Computer Company",
  publishedAt: "2020-07-24",
  authors: ["Bryan Cantrill"],
  notes:
    "Cantrill's account of RFD 1 — the working-in-public design process inspired by illumos's IPDs and Joyent's internal docs.",
});
const oxideComp = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Compensation as a Reflection of Values",
  url: "https://oxide.computer/blog/compensation-as-a-reflection-of-values",
  publisher: "Oxide Computer Company",
  publishedAt: "2021-03-03",
  authors: ["Bryan Cantrill"],
  notes:
    "The uniform-compensation post: every one of the then-23 employees paid $175,000/year, founders included — a transparency artifact that later went viral.",
});
const oxideCompFollowup = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Oxide's compensation model: how is it going?",
  url: "https://oxide.computer/blog/oxides-compensation-model-how-is-it-going",
  publisher: "Oxide Computer Company",
  publishedAt: "2025-05-01",
  authors: ["Bryan Cantrill"],
  notes:
    "The four-year check-in: uniform base compensation persists (by then $275,000), with sales-incentive exceptions acknowledged.",
});
const oxideHubrisBlog = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Hubris and Humility",
  url: "https://oxide.computer/blog/hubris-and-humility",
  publisher: "Oxide Computer Company",
  publishedAt: "2021-11-30",
  authors: ["Bryan Cantrill"],
  notes:
    "The announcement of the Hubris embedded OS and its debugger counterpart, Humility.",
});
const oxideCloudComputer = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "The Cloud Computer",
  url: "https://oxide.computer/blog/the-cloud-computer",
  publisher: "Oxide Computer Company",
  publishedAt: "2023-10-26",
  authors: ["Steve Tuck"],
  notes:
    "CEO Steve Tuck's launch-day essay on what the Cloud Computer is and why the company spent four years building it.",
});
const oxideUnveil = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Oxide Unveils the World's First Commercial Cloud Computer",
  url: "https://oxide.computer/blog/oxide-unveils-the-worlds-first-commercial-cloud-computer",
  publisher: "Oxide Computer Company",
  publishedAt: "2023-10-26",
  notes:
    "The product announcement paired with the $44M Series A — led by Eclipse with Intel Capital, Riot Ventures, Counterpart Ventures, and Rally Ventures — for $78M raised total.",
});
const oxideLlnl = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Oxide Computer Company and Lawrence Livermore National Laboratory",
  url: "https://oxide.computer/blog/oxide-computer-company-and-lawrence-livermore-national-laboratory",
  publisher: "Oxide Computer Company",
  publishedAt: "2024-11-18",
  notes:
    "Announces the LLNL collaboration on cloud/HPC convergence — with Los Alamos and Sandia participating in related activities.",
});
const oxideSeriesB = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Our $100M Series B",
  url: "https://oxide.computer/blog/our-100m-series-b",
  publisher: "Oxide Computer Company",
  publishedAt: "2025-07-30",
  authors: ["Bryan Cantrill"],
  notes:
    "Announces the $100M Series B led by USIT (Thomas Tull's fund) with all existing investors participating; says the company had raised $89M across nearly six years beforehand.",
});
const oxideSeriesC = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Our $200M Series C",
  url: "https://oxide.computer/blog/our-200m-series-c",
  publisher: "Oxide Computer Company",
  publishedAt: "2026-02-05",
  authors: ["Bryan Cantrill"],
  notes:
    "Announces the $200M Series C and restates the intent: 'not to be an acquisition target but rather build a generational company; this is our life's work.'",
});
const oxideGlasswing = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Oxide and Anthropic's Project Glasswing",
  url: "https://oxide.computer/blog/oxide-anthropic-project-glasswing",
  publisher: "Oxide Computer Company",
  publishedAt: "2026-07-28",
  notes:
    "Announces Oxide's participation in Anthropic's Project Glasswing — applying Claude Mythos to its own codebase — and restates the open-source/hardware-software co-design philosophy.",
});
const oxideSpecs = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Oxide — Product specifications",
  url: "https://oxide.computer/product/specifications",
  publisher: "Oxide Computer Company",
  notes:
    "The rack's own spec sheet: 32 sleds, purpose-built switches and power shelf, no assembly required.",
});
const oxideFaq = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "FAQ Friday: What is Oxide?",
  url: "https://oxide.computer/faq-friday/what-is-oxide",
  publisher: "Oxide Computer Company",
  notes:
    "The company's own definition: on-premises cloud computing via hardware/software co-design — a whole rack as the unit of delivery, not a 1U/2U server.",
});
const oxideBeeler = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Remembering Charles Beeler",
  url: "https://oxide.computer/blog/remembering-charles-beeler",
  publisher: "Oxide Computer Company",
  publishedAt: "2024-11-12",
  authors: ["Bryan Cantrill"],
  notes:
    "Memorial for Rally Ventures' Charles Beeler, an early backer and board member — evidence of Rally's ongoing investor relationship.",
});
const hubrisSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Hubris — a lightweight, memory-protected, message-passing kernel",
  url: "https://hubris.oxide.computer/",
  publisher: "Oxide Computer Company",
  notes: "The Hubris project's own documentation site.",
});
const githubOrg = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "oxidecomputer — GitHub organization",
  url: "https://github.com/oxidecomputer",
  publisher: "GitHub",
  notes:
    "The public GitHub org — created August 12, 2019, location Emeryville, CA — hosting Hubris, Helios, Omicron, Propolis, Dropshot, Progenitor, Humility, and more.",
});
const githubOmicron = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "oxidecomputer/omicron — the Oxide control plane",
  url: "https://github.com/oxidecomputer/omicron",
  publisher: "GitHub",
  notes: "The Rust control-plane repository, developed in public.",
});
const githubHubris = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "oxidecomputer/hubris — a lightweight, memory-protected kernel",
  url: "https://github.com/oxidecomputer/hubris",
  publisher: "GitHub",
  notes: "The Rust service-processor kernel, open source from the start.",
});
const githubHelios = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "oxidecomputer/helios — the Helios operating system",
  url: "https://github.com/oxidecomputer/helios",
  publisher: "GitHub",
  notes: "The illumos-derived host operating system for the sleds.",
});
const githubPropolis = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "oxidecomputer/propolis — hypervisor",
  url: "https://github.com/oxidecomputer/propolis",
  publisher: "GitHub",
  notes: "The illumos-based hypervisor component.",
});
const githubDropshot = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "oxidecomputer/dropshot — general-purpose Rust HTTP server",
  url: "https://github.com/oxidecomputer/dropshot",
  publisher: "GitHub",
  notes:
    "The internal API framework — spec-first HTTP in Rust — generalized into a public library.",
});
const rfdShared = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Oxide RFDs",
  url: "https://rfd.shared.oxide.computer/",
  publisher: "Oxide Computer Company",
  notes: "The public archive of Requests for Discussion — design documents as primary artifacts.",
});
const onTheMetal = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "On the Metal",
  url: "https://onthemetal.transistor.fm/",
  publisher: "Oxide Computer Company",
  publishedAt: "2019",
  notes:
    "The company's first podcast — Cantrill, Frazelle, and Tuck interviewing hardware/software legends; billed (self-deprecatingly) as 'the nerdiest podcast on the planet.'",
});
const oxideAndFriends = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Oxide and Friends",
  url: "https://oxide-and-friends.transistor.fm/",
  publisher: "Oxide Computer Company",
  publishedAt: "2021",
  notes:
    "The weekly Monday-Discord show that succeeded On the Metal — engineering, the company, and the industry in public.",
});
const oxfRack1 = source({
  binding: "subject_controlled",
  mediaType: "audio",
  title: "Tales from Manufacturing: Shipping Rack 1 — Oxide and Friends",
  url: "https://oxide-and-friends.transistor.fm/episodes/tales-from-manufacturing-shipping-rack-1",
  publisher: "Oxide Computer Company",
  publishedAt: "2023-07",
  notes:
    "The ops and engineering story of physically shipping the first customer rack.",
});
const oxfQuestions = source({
  binding: "subject_controlled",
  mediaType: "audio",
  title: "Shipping the first Oxide rack: Your questions answered! — Oxide and Friends",
  url: "https://oxide-and-friends.transistor.fm/episodes/shipping-the-first-oxide-rack-your-questions-answered",
  publisher: "Oxide Computer Company",
  publishedAt: "2023",
  notes:
    "Q&A episode following the first rack delivery — including the 'cloud computing not as renting someone else's computers' framing.",
});
const prnSeriesB = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Oxide Raises $100M Series B to Scale Cloud Infrastructure for On-Premises Computing",
  url: "https://www.prnewswire.com/news-releases/oxide-raises-100m-series-b-to-scale-cloud-infrastructure-for-on-premises-computing-302516798.html",
  publisher: "PR Newswire (Oxide Computer Company)",
  publishedAt: "2025-07-30",
  notes: "The company's wire release for the Series B.",
});
const prnSeriesC = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Oxide Closes $200M Series C to Scale On-Premises Cloud Computing",
  url: "https://www.prnewswire.com/news-releases/oxide-closes-200m-series-c-to-scale-on-premises-cloud-computing-302683724.html",
  publisher: "PR Newswire (Oxide Computer Company)",
  publishedAt: "2026-02",
  notes:
    "The company's wire release for the Series C — led by USIT with existing investors including Eclipse, Riot Ventures, and Jane Street.",
});

// --- first-person (founders and founding engineers) ---------------------------

const cantrillSoul = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Soul of a New Computer Company",
  url: "https://bcantrill.dtrace.org/2019/12/02/the-soul-of-a-new-computer-company/",
  publisher: "Bryan Cantrill (personal blog)",
  publishedAt: "2019-12-02",
  authors: ["Bryan Cantrill"],
  notes:
    "Cantrill's founding essay: 'together with Steve Tuck and Jess Frazelle, we have started Oxide Computer Company' — plus Eclipse Ventures, Pierre Lamond's board seat, and the Tracy Kidder homage.",
});
const frazelleGarage = source({
  binding: "first_person",
  mediaType: "article",
  title: "Born in a Garage",
  url: "https://blog.jessfraz.com/post/born-in-a-garage/",
  publisher: "Jessie Frazelle (personal blog)",
  publishedAt: "2019-12",
  authors: ["Jessie Frazelle"],
  notes:
    "Frazelle's founding essay — the three founders, the early raise, the literal garage office.",
});
const mustacchiJoin = source({
  binding: "first_person",
  mediaType: "article",
  title: "A New Chapter",
  url: "https://fingolfin.org/blog/20191202/oxide.html",
  publisher: "Robert Mustacchi (personal blog)",
  publishedAt: "2019-12-02",
  authors: ["Robert Mustacchi"],
  notes: "Founding engineer Robert Mustacchi's announcement that he was joining Oxide.",
});
const clulowNewMachine = source({
  binding: "first_person",
  mediaType: "article",
  title: "A New Machine",
  url: "https://sysmgr.org/blog/2019/12/02/a-new-machine/",
  publisher: "Joshua Clulow (personal blog)",
  publishedAt: "2019-12-02",
  authors: ["Joshua Clulow"],
  notes: "Founding engineer Joshua Clulow's announcement — the ex-Joyent/illumos lineage in person.",
});
const mooneyNewThing = source({
  binding: "first_person",
  mediaType: "article",
  title: "The New Thing",
  url: "https://www.pfmooney.com/post/2019-12-02-the-new-thing/",
  publisher: "Patrick Mooney (personal blog)",
  publishedAt: "2019-12-02",
  authors: ["Patrick Mooney"],
  notes: "Founding engineer Patrick Mooney's announcement post.",
});
const zooCeo = source({
  binding: "first_person",
  mediaType: "article",
  title: "Stepping into CEO",
  url: "https://zoo.dev/blog/stepping-into-ceo",
  publisher: "Zoo (KittyCAD)",
  publishedAt: "2022-12",
  authors: ["Jessie Frazelle"],
  notes:
    "Frazelle on taking the CEO role at the company she co-founded after Oxide — records her departure to found KittyCAD.",
});

// --- interviews ----------------------------------------------------------------

const seDaily = source({
  binding: "interview",
  mediaType: "audio",
  title: "Shipping Oxide with Bryan Cantrill",
  url: "https://softwareengineeringdaily.com/podcasts/shipping-oxide-with-bryan-cantrill/",
  publisher: "Software Engineering Daily",
  publishedAt: "2023-07",
  notes:
    "Cantrill interviewed on the rack build-out — 'nine startups within one startup' territory.",
});
const pragmaticPod = source({
  binding: "interview",
  mediaType: "audio",
  title: "The history of servers, the cloud, and Oxide — with Bryan Cantrill",
  url: "https://newsletter.pragmaticengineer.com/p/the-history-of-servers-the-cloud",
  publisher: "The Pragmatic Engineer",
  publishedAt: "2025-12-17",
  authors: ["Gergely Orosz", "Bryan Cantrill"],
  notes:
    "A long podcast interview with Cantrill on servers, the cloud, and why Oxide builds the whole rack.",
});

// --- reporting -----------------------------------------------------------------

const infoq = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oxide Computer Company Launches to Bring Hyperscaler-Class Infrastructure to Everyone Else",
  url: "https://www.infoq.com/news/2019/12/oxide-computer-company-launch/",
  publisher: "InfoQ",
  publishedAt: "2019-12",
  notes:
    "Independent launch-day reporting — the mission framed as hyperscaler infrastructure for the rest of the market.",
});
const newstack = source({
  binding: "reporting",
  mediaType: "article",
  title: "In Pursuit of a Superior Server, Oxide Computer Ships Its First Rack",
  url: "https://thenewstack.io/in-pursuit-of-a-superior-server-oxide-computer-ships-its-first-rack/",
  publisher: "The New Stack",
  publishedAt: "2023-07-25",
  notes:
    "Reports the first customer rack shipped June 30, 2023 — a nine-foot, ~3,000-pound integrated system.",
});
const tcOnprem = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oxide is the latest startup to try and bring the power of the cloud on-prem",
  url: "https://techcrunch.com/2023/10/26/oxide-is-the-latest-startup-to-try-and-bring-the-power-of-the-cloud-on-prem/",
  publisher: "TechCrunch",
  publishedAt: "2023-10-26",
  notes: "Independent coverage of the Cloud Computer unveiling and the $44M round.",
});
const axiosA = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oxide raises $44 million for cloud computing",
  url: "https://www.axios.com/2023/10/26/oxide-44-million-cloud-computing",
  publisher: "Axios",
  publishedAt: "2023-10-26",
  notes: "Confirms the $44M Series A and participating investors.",
});
const blocksFiles = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oxide on-prem cloud computer reinvents the server rack",
  url: "https://www.blocksandfiles.com/block/2023/10/31/oxide-on-prem-cloud-computer-reinvents-the-server-rack/1610523",
  publisher: "Blocks & Files",
  publishedAt: "2023-10-31",
  notes:
    "Technical coverage of the rack: roughly four-hour setup claims, named customers including Idaho National Laboratory.",
});
const networkWorld = source({
  binding: "reporting",
  mediaType: "article",
  title: "Startup Oxide Computing seeks to put the cloud back in private clouds",
  url: "https://www.networkworld.com/article/1250120/startup-oxide-computing-seeks-to-put-the-cloud-back-in-private-clouds.html",
  publisher: "Network World",
  publishedAt: "2023",
  notes:
    "Reports the first product shipping in July 2023, the 32-sled rack architecture, and Idaho National Laboratory as a named customer.",
});
const reutersB = source({
  binding: "reporting",
  mediaType: "article",
  title: "Cloud server startup Oxide Computing raises $100 million",
  url: "https://www.reuters.com/technology/cloud-server-startup-oxide-computing-raises-100-million-2025-07-30/",
  publisher: "Reuters",
  publishedAt: "2025-07-30",
  notes:
    "Confirms the $100M round led by Thomas Tull's US Innovative Technology Fund, with Counterpart, Eclipse, Intel Capital, Rally, and Riot participating.",
});
const axiosC = source({
  binding: "reporting",
  mediaType: "article",
  title: "Cloud server maker Oxide Computer raises $200 million led by USIT",
  url: "https://www.axios.com/pro/enterprise-software-deals/2026/02/09/cloud-server-oxide-computer-200-million-usit",
  publisher: "Axios Pro",
  publishedAt: "2026-02-09",
  notes: "Independent reporting on the Series C.",
});
const dcdC = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oxide Computer Company secures $200m in funding",
  url: "https://www.datacenterdynamics.com/en/news/oxide-computer-company-secures-200m-in-funding/",
  publisher: "Data Center Dynamics",
  publishedAt: "2026-02",
  notes:
    "Reports the Series C and frames the round as roughly doubling total funding — to about $378M — for the second time.",
});
const finsmes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oxide Computer Company Raises $100M in Series B Funding",
  url: "https://www.finsmes.com/2025/07/oxide-computer-company-raises-100m-in-series-b-funding.html",
  publisher: "FinSMEs",
  publishedAt: "2025-07-30",
  notes: "Trade-press funding coverage of the Series B.",
});
const pePart1 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Startups on hard mode: Oxide. Part 1: Hardware",
  url: "https://newsletter.pragmaticengineer.com/p/oxide",
  publisher: "The Pragmatic Engineer",
  publishedAt: "2024-05-21",
  authors: ["Gergely Orosz"],
  notes:
    "Deep reported look at Oxide's hardware — part one of the two-part profile.",
});
const pePart2 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Startups on hard mode: Oxide. Part 2: Software & Culture",
  url: "https://newsletter.pragmaticengineer.com/p/oxide-part-2",
  publisher: "The Pragmatic Engineer",
  publishedAt: "2024-06-25",
  authors: ["Gergely Orosz"],
  notes:
    "Part two — the software stack (Rust control plane, illumos host, Hubris) and the culture, including the uniform-salary model.",
});
const eclipseBlog = source({
  binding: "reporting",
  mediaType: "article",
  title: "Cloud infrastructure on demand: Oxide's mission to build the alternative to public cloud",
  url: "https://eclipse.capital/blog/cloud-infrastructure-on-demand-oxides-mission-to-build-the-alternative-to-public-cloud",
  publisher: "Eclipse",
  notes:
    "The lead investor's own writeup — names Shopify, Switch, and Lawrence Livermore among customers.",
});
const intelCap = source({
  binding: "archive",
  mediaType: "article",
  title: "Oxide Unveils the World's First Commercial Cloud Computer",
  url: "https://www.intelcapital.com/oxide-unveils-the-worlds-first-commercial-cloud-computer/",
  publisher: "Intel Capital",
  publishedAt: "2023-10-26",
  notes:
    "The investor's syndication of the announcement — corroborates Intel Capital's participation in the Series A.",
});
const castroOxf = source({
  binding: "archive",
  mediaType: "transcript",
  title: "Oxide and Friends S3E19 transcript (mirror)",
  url: "https://castro.fm/episode/ajxmry",
  publisher: "Castro",
  transcriptOf: oxfQuestions.id,
  notes:
    "Third-party mirror carrying the episode transcript with the 'cloud computing not as renting someone else's computers' line.",
});

// --- reference ------------------------------------------------------------------

const pitchbook = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Oxide Computer Company — PitchBook profile",
  url: "https://pitchbook.com/profiles/company/343384-66",
  publisher: "PitchBook",
  notes:
    "Aggregator profile — company status, financing history, and employee-count estimates; treated as reference, not authority.",
});
const cbinsights = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Oxide Computer Company — CB Insights",
  url: "https://www.cbinsights.com/company/oxide-computer",
  publisher: "CB Insights",
  notes: "Aggregator profile for funding and headcount triangulation.",
});
const linkedinOxide = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Oxide Computer Company — LinkedIn",
  url: "https://www.linkedin.com/company/oxidecomputer",
  publisher: "LinkedIn",
  notes:
    "Self-reported company profile: Emeryville HQ, employee band, and Jessie Frazelle still listed as 'Co-Founder (Current)' as of the packet date.",
});
const seedtable = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Oxide Computer Co. — seed funding round",
  url: "https://seedtable.com/companies/oxide-computer-co/funding-rounds/seed-2019-12",
  publisher: "Seedtable",
  notes:
    "Reports a ~$20M seed round in early December 2019 — an aggregator figure the company itself never confirmed.",
});
const yespress = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Oxide Computer Company — YesPress profile",
  url: "https://yespress.io/oxide-computer-company",
  publisher: "YesPress",
  notes:
    "Third-party company profile that tracks the compensation model's evolution (from ~$201K toward $275K) and podcast-driven notoriety.",
});
const wikiCantrill = source({
  binding: "reference",
  mediaType: "article",
  title: "Bryan Cantrill",
  url: "https://en.wikipedia.org/wiki/Bryan_Cantrill",
  publisher: "Wikipedia",
  notes: "CTO/co-founder: DTrace co-creator at Sun, Joyent CTO, then Oxide.",
});
const wikiLeventhal = source({
  binding: "reference",
  mediaType: "article",
  title: "Adam Leventhal (programmer)",
  url: "https://en.wikipedia.org/wiki/Adam_Leventhal_(programmer)",
  publisher: "Wikipedia",
  notes:
    "Another DTrace co-author turned Oxide engineer — and co-host of Oxide and Friends.",
});
const wikiIllumos = source({
  binding: "reference",
  mediaType: "article",
  title: "Illumos",
  url: "https://en.wikipedia.org/wiki/Illumos",
  publisher: "Wikipedia",
  notes: "Context reference for the illumos lineage underlying Helios.",
});
const eclipsePortfolio = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Oxide — Eclipse portfolio",
  url: "https://eclipse.capital/companies/oxide",
  publisher: "Eclipse",
  notes: "The lead investor's portfolio listing.",
});
const theorgFrazelle = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Jessie Frazelle — KittyCAD org chart",
  url: "https://theorg.com/org/kittycad/org-chart/jessie-frazelle",
  publisher: "The Org",
  notes:
    "Records Frazelle as Oxide CPO September 2019–July 2022, then KittyCAD/Zoo co-founder and CEO.",
});

const S = {
  oxideSite: oxideSite.id,
  oxideBoot: oxideBoot.id,
  oxidePrinciples: oxidePrinciples.id,
  oxideRfd: oxideRfd.id,
  oxideComp: oxideComp.id,
  oxideCompFollowup: oxideCompFollowup.id,
  oxideHubrisBlog: oxideHubrisBlog.id,
  oxideCloudComputer: oxideCloudComputer.id,
  oxideUnveil: oxideUnveil.id,
  oxideLlnl: oxideLlnl.id,
  oxideSeriesB: oxideSeriesB.id,
  oxideSeriesC: oxideSeriesC.id,
  oxideGlasswing: oxideGlasswing.id,
  oxideSpecs: oxideSpecs.id,
  oxideFaq: oxideFaq.id,
  oxideBeeler: oxideBeeler.id,
  hubrisSite: hubrisSite.id,
  githubOrg: githubOrg.id,
  githubOmicron: githubOmicron.id,
  githubHubris: githubHubris.id,
  githubHelios: githubHelios.id,
  githubPropolis: githubPropolis.id,
  githubDropshot: githubDropshot.id,
  rfdShared: rfdShared.id,
  onTheMetal: onTheMetal.id,
  oxideAndFriends: oxideAndFriends.id,
  oxfRack1: oxfRack1.id,
  oxfQuestions: oxfQuestions.id,
  prnSeriesB: prnSeriesB.id,
  prnSeriesC: prnSeriesC.id,
  cantrillSoul: cantrillSoul.id,
  frazelleGarage: frazelleGarage.id,
  mustacchiJoin: mustacchiJoin.id,
  clulowNewMachine: clulowNewMachine.id,
  mooneyNewThing: mooneyNewThing.id,
  zooCeo: zooCeo.id,
  seDaily: seDaily.id,
  pragmaticPod: pragmaticPod.id,
  infoq: infoq.id,
  newstack: newstack.id,
  tcOnprem: tcOnprem.id,
  axiosA: axiosA.id,
  blocksFiles: blocksFiles.id,
  networkWorld: networkWorld.id,
  reutersB: reutersB.id,
  axiosC: axiosC.id,
  dcdC: dcdC.id,
  finsmes: finsmes.id,
  pePart1: pePart1.id,
  pePart2: pePart2.id,
  eclipseBlog: eclipseBlog.id,
  intelCap: intelCap.id,
  castroOxf: castroOxf.id,
  pitchbook: pitchbook.id,
  cbinsights: cbinsights.id,
  linkedinOxide: linkedinOxide.id,
  seedtable: seedtable.id,
  yespress: yespress.id,
  wikiCantrill: wikiCantrill.id,
  wikiLeventhal: wikiLeventhal.id,
  wikiIllumos: wikiIllumos.id,
  eclipsePortfolio: eclipsePortfolio.id,
  theorgFrazelle: theorgFrazelle.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-oxide-computer",
  generatedAt: "2026-09-18T05:45:00Z",
  subject: {
    kind: "organization",
    handle: "oxide-computer",
    displayName: "Oxide Computer Company",
    alsoKnownAs: ["Oxide Computer Co.", "Oxide", "Oxide Computer"],
    summary:
      "Emeryville, California computer company founded in 2019 by Bryan Cantrill, Steve Tuck, and Jessie Frazelle to build rack-scale 'cloud computers' — hyperscaler-class infrastructure for on-premises data centers. Ships a fully integrated hardware/software rack; develops its Rust control plane (Omicron), kernel (Hubris), illumos host (Helios), and hypervisor (Propolis) in public; known for uniform salaries and podcast-driven transparency. Raised ~$378M including a $200M Series C in 2026; customers include Idaho National Laboratory and Lawrence Livermore.",
    identity: {
      officialSite: "https://oxide.computer/",
      profiles: [
        "https://github.com/oxidecomputer",
        "https://www.linkedin.com/company/oxidecomputer",
        "https://x.com/oxidecomputer",
      ],
    },
  },
  scope: {
    asOf: "2026-09-18T05:45:00Z",
    coverage: [
      "history",
      "funding",
      "products",
      "engineering-culture",
      "open-source",
      "customers",
      "media",
    ],
  },
  sources: [
    oxideSite,
    oxideBoot,
    oxidePrinciples,
    oxideRfd,
    oxideComp,
    oxideCompFollowup,
    oxideHubrisBlog,
    oxideCloudComputer,
    oxideUnveil,
    oxideLlnl,
    oxideSeriesB,
    oxideSeriesC,
    oxideGlasswing,
    oxideSpecs,
    oxideFaq,
    oxideBeeler,
    hubrisSite,
    githubOrg,
    githubOmicron,
    githubHubris,
    githubHelios,
    githubPropolis,
    githubDropshot,
    rfdShared,
    onTheMetal,
    oxideAndFriends,
    oxfRack1,
    oxfQuestions,
    prnSeriesB,
    prnSeriesC,
    cantrillSoul,
    frazelleGarage,
    mustacchiJoin,
    clulowNewMachine,
    mooneyNewThing,
    zooCeo,
    seDaily,
    pragmaticPod,
    infoq,
    newstack,
    tcOnprem,
    axiosA,
    blocksFiles,
    networkWorld,
    reutersB,
    axiosC,
    dcdC,
    finsmes,
    pePart1,
    pePart2,
    eclipseBlog,
    intelCap,
    castroOxf,
    pitchbook,
    cbinsights,
    linkedinOxide,
    seedtable,
    yespress,
    wikiCantrill,
    wikiLeventhal,
    wikiIllumos,
    eclipsePortfolio,
    theorgFrazelle,
  ],
  claims: [
    // -- facts -----------------------------------------------------------------
    {
      id: "claim-founded",
      kind: "fact",
      text: "Oxide Computer Company was founded in 2019 by Bryan Cantrill, Steve Tuck, and Jessie Frazelle. The GitHub organization was created August 12, 2019; the company announced itself publicly on December 1–2, 2019 — 'We started with three folks.'",
      sourceIds: [S.oxideBoot, S.cantrillSoul, S.frazelleGarage, S.githubOrg, S.infoq],
    },
    {
      id: "claim-roles",
      kind: "fact",
      text: "The founders' roles: Steve Tuck as CEO, Bryan Cantrill as CTO, Jessie Frazelle as chief product officer. Frazelle departed in July 2022 to co-found KittyCAD (now Zoo), where she became CEO.",
      sourceIds: [S.networkWorld, S.wikiCantrill, S.zooCeo, S.theorgFrazelle],
    },
    {
      id: "claim-pedigree",
      kind: "fact",
      text: "The founding bench is unusually deep in systems software: Cantrill co-created DTrace at Sun and was Joyent's CTO; Tuck was a Sun and Joyent veteran; Frazelle came through Docker, Mesosphere, and Google; founding engineers Robert Mustacchi, Joshua Clulow, Patrick Mooney, and Adam Leventhal carried the illumos/Joyent lineage directly.",
      sourceIds: [S.infoq, S.wikiCantrill, S.wikiLeventhal, S.mustacchiJoin, S.clulowNewMachine, S.mooneyNewThing],
    },
    {
      id: "claim-mission",
      kind: "fact",
      text: "The founding mission: bring hyperscaler-class infrastructure — the integrated hardware/software that AWS and Google build for themselves — to everyone else, delivered as a whole rack rather than components. The unit of delivery is a 'cloud computer,' not a 1U server.",
      sourceIds: [S.cantrillSoul, S.oxideSite, S.oxideFaq, S.infoq],
    },
    {
      id: "claim-seed",
      kind: "fact",
      text: "Early investment was led by Eclipse Ventures with institutional and angel investors; Pierre Lamond took a board seat. The company never disclosed the amount — aggregators report roughly $20M dated early December 2019.",
      sourceIds: [S.oxideBoot, S.cantrillSoul, S.seedtable],
    },
    {
      id: "claim-comp-model",
      kind: "fact",
      text: "Since March 2021 Oxide has run a uniform compensation model: every employee — founders included — was paid $175,000/year when the company had 23 staff. A May 2025 follow-up says the model persists (by then $275,000), with sales-incentive pay carved out as an exception.",
      sourceIds: [S.oxideComp, S.oxideCompFollowup, S.yespress],
    },
    {
      id: "claim-rfd",
      kind: "fact",
      text: "Engineering runs on public 'Requests for Discussion' (RFDs) — a design-document culture descended from illumos IPDs and Joyent's internal docs, formalized by RFD 1 in July 2020 and published in full at rfd.shared.oxide.computer.",
      sourceIds: [S.oxideRfd, S.rfdShared],
    },
    {
      id: "claim-podcasts",
      kind: "fact",
      text: "The company runs two public shows: On the Metal (launched at founding in 2019, interviewing hardware/software legends) and its weekly successor Oxide and Friends, recorded over Discord on Mondays.",
      sourceIds: [S.onTheMetal, S.oxideAndFriends, S.oxideBoot],
    },
    {
      id: "claim-oss-stack",
      kind: "fact",
      text: "Essentially the entire software stack is developed in public: the Omicron control plane (Rust), the Hubris service-processor kernel (~memory-protected, message-passing, announced November 30, 2021), its Humility debugger, the Helios illumos-derived host OS, the Propolis hypervisor, and the Dropshot API framework all live under github.com/oxidecomputer.",
      sourceIds: [S.githubOrg, S.githubOmicron, S.githubHubris, S.githubHelios, S.githubPropolis, S.githubDropshot, S.oxideHubrisBlog, S.hubrisSite],
    },
    {
      id: "claim-product",
      kind: "fact",
      text: "The product is a fully integrated rack — 32 compute sleds, purpose-built switches, a shared power shelf, and the Omicron control plane — sold as one thing that arrives ready to run and can be serving developers in hours, not the weeks-to-months of conventional data-center build-outs.",
      sourceIds: [S.oxideSpecs, S.oxideCloudComputer, S.blocksFiles, S.networkWorld],
    },
    {
      id: "claim-first-rack",
      kind: "fact",
      text: "The first customer rack shipped June 30, 2023 — a nine-foot, roughly 3,000-pound system — after nearly four years of stealthy build-out.",
      sourceIds: [S.newstack, S.networkWorld, S.oxfRack1],
    },
    {
      id: "claim-unveil-series-a",
      kind: "fact",
      text: "On October 26, 2023 Oxide unveiled the 'world's first commercial cloud computer' and announced a $44M Series A led by Eclipse Ventures with Intel Capital, Riot Ventures, Counterpart Ventures, and Rally Ventures participating — bringing total financing to $78M.",
      sourceIds: [S.oxideUnveil, S.tcOnprem, S.axiosA, S.intelCap],
    },
    {
      id: "claim-customers",
      kind: "fact",
      text: "Named early customers include Idaho National Laboratory and 'a Fortune 1000 global financial services organization'; lead investor Eclipse additionally names Switch, Shopify, and Lawrence Livermore National Laboratory among customers.",
      sourceIds: [S.oxideUnveil, S.blocksFiles, S.networkWorld, S.eclipseBlog],
    },
    {
      id: "claim-llnl",
      kind: "fact",
      text: "On November 18, 2024 Oxide announced work with Lawrence Livermore National Laboratory on cloud/HPC convergence — including integration with LLNL's Flux workload manager — with Los Alamos and Sandia participating in related activities.",
      sourceIds: [S.oxideLlnl],
    },
    {
      id: "claim-series-b",
      kind: "fact",
      text: "On July 30, 2025 Oxide announced a $100M Series B led by the US Innovative Technology Fund (Thomas Tull's fund), with all existing investors — Eclipse, Intel Capital, Riot, Counterpart, Rally — participating. Oxide's own post says it had raised $89M over the preceding nearly six years.",
      sourceIds: [S.oxideSeriesB, S.reutersB, S.prnSeriesB, S.finsmes],
    },
    {
      id: "claim-series-c",
      kind: "fact",
      text: "On February 5, 2026 Oxide announced a $200M Series C, again led by USIT, with existing investors including Eclipse, Riot Ventures, and Jane Street participating — 'doubling total funding for the second time,' to roughly $378M per trade-press accounting.",
      sourceIds: [S.oxideSeriesC, S.prnSeriesC, S.axiosC, S.dcdC],
    },
    {
      id: "claim-hq-headcount",
      kind: "fact",
      text: "The company is headquartered in Emeryville, California (1251 Park Avenue per aggregator profiles). Headcount is not officially published; third-party estimates cluster around 120 employees as of 2025–2026.",
      sourceIds: [S.githubOrg, S.linkedinOxide, S.pitchbook, S.cbinsights],
    },
    {
      id: "claim-glasswing",
      kind: "fact",
      text: "In July 2026 Oxide joined Anthropic's Project Glasswing — applying Claude Mythos to its own codebase — framed as consistent with its open-source, inspectable-software philosophy.",
      sourceIds: [S.oxideGlasswing],
    },
    // -- stated beliefs ----------------------------------------------------------
    {
      id: "claim-own-not-rent",
      kind: "stated_belief",
      text: "Cloud computing should mean owning the cloud, not renting someone else's computers: the founders argue on-premises customers deserve hyperscaler-grade abstractions — elastic compute, managed storage, software-defined networking — delivered as one integrated machine.",
      sourceIds: [S.cantrillSoul, S.oxideCloudComputer, S.oxfQuestions, S.oxideFaq],
    },
    {
      id: "claim-transparency",
      kind: "stated_belief",
      text: "Transparency is treated as a system, not a value statement: board decks shared with all employees, compensation uniform and public, design RFDs published, meetings and podcasts in the open — 'transparency is not about the compensation per se; it is about transparency in general.'",
      sourceIds: [S.oxideComp, S.oxideCompFollowup, S.oxideRfd, S.oxidePrinciples],
    },
    {
      id: "claim-generational",
      kind: "stated_belief",
      text: "The stated ambition is explicitly anti-exit: 'our intent is not to be an acquisition target but rather build a generational company; this is our life's work' — repeated across the Series B and Series C announcements.",
      sourceIds: [S.oxideSeriesC, S.oxideSeriesB],
    },
    {
      id: "claim-kick-butt",
      kind: "stated_belief",
      text: "The company's self-described mission posture is informal and total: 'kick butt, have fun, not cheat, love our customers, change computing forever' — Cantrill's formulation, repeated in the funding announcements.",
      sourceIds: [S.oxideSeriesB, S.cantrillSoul],
    },
    {
      id: "claim-co-design",
      kind: "stated_belief",
      text: "Hardware/software co-design is the core conviction: the rack, the switch, the service processor, the kernel, and the control plane are one system — and software must be open and inspectable for the model to work.",
      sourceIds: [S.oxideCloudComputer, S.oxideGlasswing, S.hubrisSite, S.pragmaticPod],
    },
    // -- patterns ------------------------------------------------------------------
    {
      id: "claim-pattern-podcast-community",
      kind: "pattern",
      text: "The audience preceded the product: On the Metal ran for two years before there was anything to buy, and Oxide and Friends turned engineering into a weekly public ritual — third-party profiles note the shows functioned as recruiting and brand machinery while the company was still in stealth.",
      sourceIds: [S.onTheMetal, S.oxideAndFriends, S.yespress, S.oxfRack1],
    },
    {
      id: "claim-pattern-ex-sun",
      kind: "pattern",
      text: "The company is substantially an ex-Sun/ex-Joyent reunion: Cantrill, Tuck, Leventhal, Mustacchi, Clulow, and Mooney all share the illumos/DTrace lineage, and the software stack (Helios, Propolis, Hubris) is built on that heritage rather than Linux.",
      sourceIds: [S.mustacchiJoin, S.clulowNewMachine, S.mooneyNewThing, S.wikiLeventhal, S.githubHelios, S.wikiIllumos],
    },
    {
      id: "claim-pattern-slow-deliberate",
      kind: "pattern",
      text: "Oxide built deliberately in semi-stealth: four years from founding to first shipped rack, a custom toolchain before a product, and 'nine startups within one startup' of hard problems taken on at once — Cantrill's own description on Software Engineering Daily.",
      sourceIds: [S.newstack, S.networkWorld, S.seDaily, S.pePart1],
    },
    {
      id: "claim-pattern-funding-narrative",
      kind: "pattern",
      text: "Each funding announcement doubles as a mission statement — the Series A post unveiled the product, Series B recounted the six-year arc, and Series C restated the anti-acquisition intent; the company narrates capital as validation of the thesis rather than as runway.",
      sourceIds: [S.oxideUnveil, S.oxideSeriesB, S.oxideSeriesC],
    },
    // -- speculation ----------------------------------------------------------------
    {
      id: "claim-spec-comp-scale",
      kind: "speculation",
      text: "Whether uniform compensation survives at scale is unresolved: the model held from 23 employees at $175K to ~120 at $275K, but the carve-out for sales incentives shows the edge cases are negotiated, not eliminated — and the true test is a downturn, not a raise.",
      sourceIds: [S.oxideComp, S.oxideCompFollowup, S.yespress],
    },
    {
      id: "claim-spec-timing",
      kind: "speculation",
      text: "Oxide's market timing bet — that sovereignty, AI-driven capacity crunches, and repatriation economics finally make on-prem cloud sellable — is plausible and well-funded but still contested; $378M of venture backing does not by itself validate demand.",
      sourceIds: [S.axiosC, S.dcdC, S.oxideSeriesC, S.tcOnprem],
    },
    {
      id: "claim-spec-seed-amount",
      kind: "speculation",
      text: "The early financing record is inconsistent: aggregators report a ~$20M seed in December 2019, the Series A math implies $34M raised beforehand, and the Series B post says $89M over six years — leaving ~$11M of pre-2023 financing that no source itemizes.",
      sourceIds: [S.seedtable, S.oxideUnveil, S.oxideSeriesB],
    },
  ],
  timeline: [
    {
      id: "event-github-org",
      kind: "milestone",
      date: "2019-08-12",
      title: "GitHub organization created",
      summary: "github.com/oxidecomputer goes live — the earliest public artifact of the company.",
      sourceIds: [S.githubOrg],
    },
    {
      id: "event-seed",
      kind: "funding",
      date: "2019",
      title: "Seed round led by Eclipse Ventures",
      summary:
        "Undisclosed at the time; aggregators report ~$20M. Pierre Lamond joins the board.",
      sourceIds: [S.oxideBoot, S.cantrillSoul, S.seedtable],
    },
    {
      id: "event-launch",
      kind: "founded",
      date: "2019-12-01",
      title: "Oxide Computer Company announced",
      summary:
        "Cantrill, Tuck, and Frazelle reveal the company: hyperscaler-class infrastructure for the broader market, plus the On the Metal podcast.",
      sourceIds: [S.oxideBoot, S.cantrillSoul, S.frazelleGarage, S.infoq],
    },
    {
      id: "event-founding-engineers",
      kind: "other",
      date: "2019-12-02",
      title: "Founding engineers announce themselves",
      summary:
        "Robert Mustacchi, Joshua Clulow, and Patrick Mooney each publish 'I joined Oxide' posts the day after the reveal.",
      sourceIds: [S.mustacchiJoin, S.clulowNewMachine, S.mooneyNewThing],
    },
    {
      id: "event-rfd",
      kind: "milestone",
      date: "2020-07-24",
      title: "RFD 1 published — design in the open",
      summary: "The Requests-for-Discussion process formalized and later published wholesale.",
      sourceIds: [S.oxideRfd, S.rfdShared],
    },
    {
      id: "event-comp-model",
      kind: "milestone",
      date: "2021-03-03",
      title: "Uniform compensation model announced",
      summary: "$175,000 for all 23 employees, founders included — 'compensation as a reflection of values.'",
      sourceIds: [S.oxideComp],
    },
    {
      id: "event-oxf",
      kind: "media",
      date: "2021",
      title: "Oxide and Friends begins weekly broadcasts",
      sourceIds: [S.oxideAndFriends],
    },
    {
      id: "event-hubris",
      kind: "project",
      date: "2021-11-30",
      title: "Hubris and Humility announced",
      summary: "The Rust service-processor kernel and its debugger go public.",
      sourceIds: [S.oxideHubrisBlog, S.hubrisSite, S.githubHubris],
    },
    {
      id: "event-frazelle-departs",
      kind: "role",
      date: "2022-07",
      title: "Jessie Frazelle departs as CPO",
      summary:
        "The co-founder leaves to co-found KittyCAD (later Zoo), where she becomes CEO in December 2022.",
      sourceIds: [S.theorgFrazelle, S.zooCeo],
    },
    {
      id: "event-first-rack",
      kind: "milestone",
      date: "2023-06-30",
      title: "First customer rack ships",
      summary: "A nine-foot, ~3,000-pound integrated system — nearly four years after founding.",
      sourceIds: [S.newstack, S.networkWorld, S.oxfRack1],
    },
    {
      id: "event-unveil",
      kind: "project",
      date: "2023-10-26",
      title: "Commercial Cloud Computer unveiled",
      summary:
        "The product goes on sale: 32-sled rack-scale computer, delivered whole — 'own the cloud instead of renting it.'",
      sourceIds: [S.oxideUnveil, S.oxideCloudComputer, S.tcOnprem, S.blocksFiles],
    },
    {
      id: "event-series-a",
      kind: "funding",
      date: "2023-10-26",
      title: "$44M Series A",
      summary:
        "Led by Eclipse Ventures with Intel Capital, Riot Ventures, Counterpart Ventures, and Rally Ventures; total financing reaches $78M.",
      sourceIds: [S.oxideUnveil, S.axiosA, S.intelCap],
    },
    {
      id: "event-llnl",
      kind: "milestone",
      date: "2024-11-18",
      title: "Lawrence Livermore collaboration announced",
      summary:
        "Joint work on cloud/HPC convergence, including Flux integration; Los Alamos and Sandia participate in related activities.",
      sourceIds: [S.oxideLlnl],
    },
    {
      id: "event-beeler",
      kind: "other",
      date: "2024-11-12",
      title: "Memorial for board member Charles Beeler",
      summary: "The Rally Ventures partner and early backer is remembered on the company blog.",
      sourceIds: [S.oxideBeeler],
    },
    {
      id: "event-comp-followup",
      kind: "milestone",
      date: "2025-05-01",
      title: "Compensation model check-in: $275K for all",
      summary: "Four years on, the uniform-salary model persists with a higher number and a sales-incentive carve-out.",
      sourceIds: [S.oxideCompFollowup],
    },
    {
      id: "event-series-b",
      kind: "funding",
      date: "2025-07-30",
      title: "$100M Series B led by USIT",
      summary:
        "Thomas Tull's US Innovative Technology Fund leads; all existing investors participate; company says $89M was raised over the prior ~six years.",
      sourceIds: [S.oxideSeriesB, S.reutersB, S.prnSeriesB],
    },
    {
      id: "event-series-c",
      kind: "funding",
      date: "2026-02-05",
      title: "$200M Series C led by USIT",
      summary:
        "Existing investors including Eclipse, Riot Ventures, and Jane Street participate; total financing roughly doubles to ~$378M.",
      sourceIds: [S.oxideSeriesC, S.prnSeriesC, S.axiosC, S.dcdC],
    },
    {
      id: "event-glasswing",
      kind: "milestone",
      date: "2026-07-28",
      title: "Joins Anthropic's Project Glasswing",
      summary: "Applying Claude Mythos to the Oxide codebase — the company frames it as an extension of its open, inspectable-software posture.",
      sourceIds: [S.oxideGlasswing],
    },
    {
      id: "event-kubernetes",
      kind: "project",
      date: "2026-08-13",
      title: "Kubernetes on Oxide",
      summary: "Company blog details running Kubernetes on the Cloud Computer.",
      sourceIds: [S.oxideSite],
    },
  ],
  themes: [
    {
      id: "theme-co-design",
      kind: "philosophy",
      status: "stated",
      title: "Hardware/software co-design",
      summary:
        "The whole point: rack, switch, service processor, kernel, and control plane designed as one system — the conviction that hyperscaler efficiency comes from integration, not scale alone.",
      sourceIds: [S.oxideCloudComputer, S.cantrillSoul, S.pragmaticPod, S.oxideFaq],
    },
    {
      id: "theme-own-the-cloud",
      kind: "belief",
      status: "stated",
      title: "Own the cloud, don't rent it",
      summary:
        "On-premises computing reimagined as a product: elastic infrastructure that customers own outright — a direct challenge to the public-cloud-everything consensus.",
      sourceIds: [S.oxideUnveil, S.oxfQuestions, S.networkWorld],
    },
    {
      id: "theme-transparency",
      kind: "practice",
      status: "stated",
      title: "Radical operational transparency",
      summary:
        "Uniform public salaries, open board decks, published RFDs, public Discord discussions, and two podcasts — the company runs in the open as both principle and strategy.",
      sourceIds: [S.oxideComp, S.oxideCompFollowup, S.oxideRfd, S.oxidePrinciples, S.oxideAndFriends],
    },
    {
      id: "theme-open-source",
      kind: "practice",
      status: "reported",
      title: "Open-source as engineering posture",
      summary:
        "The control plane, kernel, hypervisor, host OS, and API framework are all public on GitHub — and the company argues inspectability is a feature, not a concession.",
      sourceIds: [S.githubOrg, S.oxideGlasswing, S.oxideHubrisBlog],
    },
    {
      id: "theme-generational",
      kind: "belief",
      status: "stated",
      title: "A generational company, not an exit",
      summary:
        "Repeated explicitly in the Series C announcement: the goal is durability, not acquisition — 'this is our life's work.'",
      sourceIds: [S.oxideSeriesC, S.cantrillSoul],
    },
    {
      id: "theme-ex-sun-lineage",
      kind: "influence",
      status: "reported",
      title: "The Sun/illumos inheritance",
      summary:
        "DTrace, illumos, the RFD process, the engineering bench — Oxide is in large part the Joyent-era systems culture institutionalized into a new company.",
      sourceIds: [S.wikiCantrill, S.wikiLeventhal, S.wikiIllumos, S.oxideRfd, S.infoq],
    },
    {
      id: "theme-slow-build",
      kind: "method",
      status: "reported",
      title: "Hard things, slowly, all at once",
      summary:
        "'Nine startups within one startup': the company deliberately took on hardware, a control plane, a kernel, a hypervisor, and manufacturing in parallel — and accepted the four-year runway that required.",
      sourceIds: [S.seDaily, S.pePart1, S.pePart2, S.newstack],
    },
  ],
  works: [
    {
      id: "work-cloud-computer",
      kind: "product",
      status: "ongoing",
      title: "Oxide Cloud Computer",
      date: "2023",
      summary:
        "The flagship product: a fully integrated rack-scale computer — 32 sleds, purpose-built switching, shared power, Omicron control plane — unveiled October 26, 2023 and shipping to customers including national laboratories.",
      sourceIds: [S.oxideUnveil, S.oxideSpecs, S.oxideCloudComputer, S.newstack],
    },
    {
      id: "work-omicron",
      kind: "product",
      status: "ongoing",
      title: "Omicron",
      summary:
        "The Rust control plane that makes the rack a cloud — compute, storage, and networking as APIs; developed in public on GitHub.",
      sourceIds: [S.githubOmicron, S.pePart2],
    },
    {
      id: "work-hubris",
      kind: "product",
      status: "released",
      title: "Hubris",
      date: "2021",
      summary:
        "The memory-protected, message-passing service-processor kernel written in Rust — announced November 30, 2021 with its debugger counterpart, Humility.",
      sourceIds: [S.oxideHubrisBlog, S.hubrisSite, S.githubHubris],
    },
    {
      id: "work-helios",
      kind: "product",
      status: "released",
      title: "Helios",
      summary:
        "The illumos-derived host operating system running each sled — the Sun heritage made literal.",
      sourceIds: [S.githubHelios, S.wikiIllumos],
    },
    {
      id: "work-propolis",
      kind: "product",
      status: "released",
      title: "Propolis",
      summary: "The illumos-based hypervisor layer of the stack, developed in public.",
      sourceIds: [S.githubPropolis],
    },
    {
      id: "work-toolchain",
      kind: "project",
      status: "ongoing",
      title: "Public toolchain: Dropshot, Progenitor, Humility",
      summary:
        "The generalized Rust libraries and debugging tools extracted from the product work — spec-first HTTP, OpenAPI client generation, and Hubris debugging — all public.",
      sourceIds: [S.githubDropshot, S.githubOrg],
    },
    {
      id: "work-on-the-metal",
      kind: "other",
      status: "completed",
      title: "On the Metal",
      date: "2019",
      summary:
        "The founding-era podcast — Cantrill, Frazelle, and Tuck interviewing hardware and software legends; self-billed as 'the nerdiest podcast on the planet.'",
      sourceIds: [S.onTheMetal, S.oxideBoot],
    },
    {
      id: "work-oxide-and-friends",
      kind: "other",
      status: "ongoing",
      title: "Oxide and Friends",
      date: "2021",
      summary:
        "The weekly Monday show — engineering war stories, product deep-dives (including the rack-shipping retrospectives), and the industry, in public.",
      sourceIds: [S.oxideAndFriends, S.oxfRack1, S.oxfQuestions],
    },
    {
      id: "work-rfd",
      kind: "project",
      status: "ongoing",
      title: "Requests for Discussion",
      date: "2020",
      summary:
        "The public design-document process — RFD 1 described it, and the full archive lives at rfd.shared.oxide.computer.",
      sourceIds: [S.oxideRfd, S.rfdShared],
    },
  ],
  appearances: [
    {
      id: "appearance-sedaily",
      title: "Shipping Oxide with Bryan Cantrill",
      venue: "Software Engineering Daily",
      publishedAt: "2023-07",
      participants: ["Bryan Cantrill"],
      participantHandles: [
        { name: "Bryan Cantrill", handle: "bryan-cantrill" },
      ],
      summary:
        "Cantrill on the four-year build — 'nine startups within one startup' — timed to the first rack shipment.",
      media: [
        {
          type: "audio",
          url: "https://softwareengineeringdaily.com/podcasts/shipping-oxide-with-bryan-cantrill/",
          sourceId: S.seDaily,
        },
      ],
      sourceIds: [S.seDaily],
    },
    {
      id: "appearance-pragmatic-pod",
      title: "The history of servers, the cloud, and Oxide",
      venue: "The Pragmatic Engineer Podcast",
      publishedAt: "2025-12-17",
      participants: ["Bryan Cantrill", "Gergely Orosz"],
      participantHandles: [
        { name: "Bryan Cantrill", handle: "bryan-cantrill" },
        { name: "Gergely Orosz", handle: "gergely-orosz" },
      ],
      summary: "A long-form interview on servers, the cloud's origins, and Oxide's thesis.",
      media: [
        {
          type: "audio",
          url: "https://newsletter.pragmaticengineer.com/p/the-history-of-servers-the-cloud",
          sourceId: S.pragmaticPod,
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Kn_P9nG0zsA",
        },
      ],
      sourceIds: [S.pragmaticPod],
    },
    {
      id: "appearance-oxf-rack1",
      title: "Tales from Manufacturing: Shipping Rack 1",
      venue: "Oxide and Friends",
      publishedAt: "2023-07",
      participants: ["Bryan Cantrill", "Adam Leventhal", "Oxide operations team"],
      participantHandles: [
        { name: "Bryan Cantrill", handle: "bryan-cantrill" },
        { name: "Adam Leventhal", handle: "adam-leventhal" },
      ],
      summary: "The company's own retrospective on physically shipping the first customer rack.",
      media: [
        {
          type: "audio",
          url: "https://oxide-and-friends.transistor.fm/episodes/tales-from-manufacturing-shipping-rack-1",
          sourceId: S.oxfRack1,
        },
      ],
      sourceIds: [S.oxfRack1],
    },
  ],
  relations: [
    {
      id: "rel-cantrill",
      kind: "founded_by",
      target: "bryan-cantrill",
      targetName: "Bryan Cantrill",
      targetKind: "person",
      targetWikidataId: "Q4980008",
      note: "Co-founder and CTO; DTrace co-creator, ex-Joyent. Named the company effort after Tracy Kidder's 'The Soul of a New Machine.'",
      sourceIds: [S.cantrillSoul, S.oxideBoot, S.wikiCantrill],
    },
    {
      id: "rel-tuck",
      kind: "founded_by",
      target: "steve-tuck",
      targetName: "Steve Tuck",
      targetKind: "person",
      note: "Co-founder and CEO; Sun and Joyent veteran.",
      sourceIds: [S.oxideBoot, S.cantrillSoul, S.oxideCloudComputer],
    },
    {
      id: "rel-frazelle",
      kind: "founded_by",
      target: "jessie-frazelle",
      targetName: "Jessie Frazelle",
      targetKind: "person",
      targetWikidataId: "Q104248144",
      note: "Co-founder and chief product officer 2019–July 2022; departed to co-found KittyCAD (now Zoo), where she is CEO.",
      sourceIds: [S.frazelleGarage, S.oxideBoot, S.theorgFrazelle, S.zooCeo],
    },
    {
      id: "rel-mustacchi",
      kind: "employed",
      target: "robert-mustacchi",
      targetName: "Robert Mustacchi",
      targetKind: "person",
      start: "2019-12",
      note: "Founding engineer; announced his joining on December 2, 2019.",
      sourceIds: [S.mustacchiJoin],
    },
    {
      id: "rel-clulow",
      kind: "employed",
      target: "joshua-clulow",
      targetName: "Joshua Clulow",
      targetKind: "person",
      start: "2019-12",
      note: "Founding engineer from the illumos/Joyent lineage.",
      sourceIds: [S.clulowNewMachine],
    },
    {
      id: "rel-mooney",
      kind: "employed",
      target: "patrick-mooney",
      targetName: "Patrick Mooney",
      targetKind: "person",
      start: "2019-12",
      note: "Founding engineer.",
      sourceIds: [S.mooneyNewThing],
    },
    {
      id: "rel-leventhal",
      kind: "employed",
      target: "adam-leventhal",
      targetName: "Adam Leventhal",
      targetKind: "person",
      note: "DTrace co-author turned Oxide engineer; co-host of Oxide and Friends.",
      sourceIds: [S.wikiLeventhal, S.oxideAndFriends],
    },
    {
      id: "rel-eclipse",
      kind: "funded_by",
      target: "eclipse-ventures",
      targetName: "Eclipse Ventures",
      targetKind: "organization",
      start: "2019",
      note: "Led the seed round and the $44M Series A; Pierre Lamond took the original board seat.",
      sourceIds: [S.oxideBoot, S.cantrillSoul, S.oxideUnveil, S.eclipsePortfolio],
    },
    {
      id: "rel-intel-capital",
      kind: "funded_by",
      target: "intel-capital",
      targetName: "Intel Capital",
      targetKind: "organization",
      start: "2023",
      note: "Series A participant; quoted in the launch materials ('own the cloud instead of renting it').",
      sourceIds: [S.oxideUnveil, S.intelCap, S.reutersB],
    },
    {
      id: "rel-riot",
      kind: "funded_by",
      target: "riot-ventures",
      targetName: "Riot Ventures",
      targetKind: "organization",
      start: "2023",
      note: "Series A participant; still on the investor list through the Series C.",
      sourceIds: [S.oxideUnveil, S.prnSeriesC],
    },
    {
      id: "rel-counterpart",
      kind: "funded_by",
      target: "counterpart-ventures",
      targetName: "Counterpart Ventures",
      targetKind: "organization",
      start: "2023",
      sourceIds: [S.oxideUnveil, S.reutersB],
    },
    {
      id: "rel-rally",
      kind: "funded_by",
      target: "rally-ventures",
      targetName: "Rally Ventures",
      targetKind: "organization",
      start: "2023",
      note: "Series A participant; partner Charles Beeler served on the board until his 2024 death.",
      sourceIds: [S.oxideUnveil, S.oxideBeeler],
    },
    {
      id: "rel-usit",
      kind: "funded_by",
      target: "us-innovative-technology-fund",
      targetName: "US Innovative Technology Fund (USIT)",
      targetKind: "organization",
      start: "2025",
      note: "Thomas Tull's fund; led both the $100M Series B (2025) and the $200M Series C (2026).",
      sourceIds: [S.oxideSeriesB, S.reutersB, S.prnSeriesC],
    },
    {
      id: "rel-jane-street",
      kind: "funded_by",
      target: "jane-street",
      targetName: "Jane Street",
      targetKind: "organization",
      targetWikidataId: "Q17630723",
      note: "Listed among existing investors participating in the Series C per the company's wire release.",
      sourceIds: [S.prnSeriesC],
    },
    {
      id: "rel-inl",
      kind: "collaborated",
      target: "idaho-national-laboratory",
      targetName: "Idaho National Laboratory",
      targetKind: "organization",
      note: "Named early customer — reported as running an Oxide rack from the first shipments.",
      sourceIds: [S.networkWorld, S.blocksFiles],
    },
    {
      id: "rel-llnl",
      kind: "collaborated",
      target: "lawrence-livermore-national-laboratory",
      targetName: "Lawrence Livermore National Laboratory",
      targetKind: "organization",
      targetWikidataId: "Q519826",
      start: "2024-11",
      note: "Public collaboration on cloud/HPC convergence, including Flux workload-manager integration; Los Alamos and Sandia participate in related activities.",
      sourceIds: [S.oxideLlnl],
    },
    {
      id: "rel-anthropic",
      kind: "collaborated",
      target: "anthropic",
      targetName: "Anthropic",
      targetKind: "organization",
      targetWikidataId: "Q116758847",
      start: "2026-07",
      note: "Oxide joined Anthropic's Project Glasswing in July 2026, applying Claude Mythos to its codebase.",
      sourceIds: [S.oxideGlasswing],
    },
    {
      id: "rel-shopify",
      kind: "other",
      target: "shopify",
      targetName: "Shopify",
      targetKind: "organization",
      note: "Named as a customer in lead investor Eclipse's own writeup; the company itself does not confirm the relationship publicly.",
      sourceIds: [S.eclipseBlog],
    },
    {
      id: "rel-switch",
      kind: "other",
      target: "switch",
      targetName: "Switch",
      targetKind: "organization",
      note: "The data-center operator, named as a customer in Eclipse's writeup.",
      sourceIds: [S.eclipseBlog],
    },
    {
      id: "rel-joyent",
      kind: "influenced_by",
      target: "joyent",
      targetName: "Joyent",
      targetKind: "organization",
      note: "The founders' shared history — Cantrill's CTO years, the illumos/DTrace lineage, the RFD process — is the cultural substrate of Oxide.",
      sourceIds: [S.cantrillSoul, S.wikiCantrill, S.infoq, S.oxideRfd],
    },
    {
      id: "rel-zoo",
      kind: "other",
      target: "zoo",
      targetName: "Zoo (formerly KittyCAD)",
      targetKind: "organization",
      note: "Frazelle's post-Oxide company — she departed Oxide in July 2022 to co-found it.",
      sourceIds: [S.zooCeo, S.theorgFrazelle],
    },
    {
      id: "rel-sedaily",
      kind: "interviewed_by",
      target: "software-engineering-daily",
      targetName: "Software Engineering Daily",
      targetKind: "organization",
      note: "Cantrill interviewed on shipping the first rack, July 2023.",
      sourceIds: [S.seDaily],
    },
  ],
  openQuestions: [
    "The early financing record is inconsistent: aggregators report a ~$20M seed (December 2019), the Series A math implies $34M raised beforehand, and Oxide's own Series B post says $89M over six years — roughly $11M of pre-2023 financing is unitemized in public sources.",
    "Why the October 2023 round is called 'Series A' despite earlier seed financing is unexplained — a naming convention, a restructure, or simply the first priced round.",
    "Current headcount is unconfirmed: aggregators cluster around 120 employees, but the company publishes no official figure — notable given it publishes almost everything else.",
    "Jessie Frazelle's current status is ambiguous: her LinkedIn-visible profile still lists 'Co-Founder (Current)' while her CPO role ended July 2022 — whether she retains an advisory role or only the title is unclear.",
    "The 'Fortune 1000 global financial services organization' among the first customers has never been publicly named.",
    "Whether uniform compensation survives sustained scaling — and the sales-incentive carve-out expanding — is a live question the 2025 follow-up leaves open.",
    "Revenue is undisclosed; third-party estimates (e.g., '$30M–$40M' figures circulating on aggregator sites) are unverifiable.",
    "The company has no confirmed Wikidata item of its own as of this packet's build; identity resolution relies on the domain and GitHub org.",
    "Whether the 'generational company' posture survives a real acquisition offer or public-market pull is unknowable from the funding posts that assert it.",
  ],
  body: `Oxide Computer Company is the Emeryville startup that decided the cloud should be something you can buy, own, and rack — not just rent. Founded in 2019 by three veterans of Sun, Joyent, Docker, and Mesosphere, it spent nearly four years in deliberate build-out before shipping a single product: a complete, integrated rack-scale computer that arrives ready to run. It is also one of the most publicly transparent private companies ever — uniform salaries, open board decks, published design documents, and two podcasts of engineering chatter, all part of the thesis that trust is a product feature.

## Origins

The company traces to a text message between Bryan Cantrill — DTrace co-creator, Sun veteran, Joyent CTO — and his former colleague Steve Tuck, about what computing would look like if the hyperscalers' integrated infrastructure were available to everyone. Jessie Frazelle, coming off Docker and Mesosphere, rounded out the founding trio. They announced themselves on December 1–2, 2019, with early backing led by Eclipse Ventures (Pierre Lamond taking the board seat) and — characteristically — a podcast. The GitHub org had existed since August; the founding engineers, illumos alumni Robert Mustacchi, Joshua Clulow, and Patrick Mooney, announced themselves in a coordinated flurry of blog posts the day after the reveal.

## The thesis

The pitch is hardware/software co-design taken literally: a single 32-sled rack where the switch, the power shelf, the service processors, the kernel, the hypervisor, and the control plane are one designed system. "Cloud computing" per Oxide means the abstractions — elastic compute, managed storage, software-defined networking — not the rental model. Cantrill called it "nine startups within one startup," and the company accepted that scope knowingly: four years to first customer shipment in June 2023, a nine-foot, three-thousand-pound rack, installable to developer-ready in hours.

## Radical transparency as practice

Oxide's strangest innovation may be organizational. In March 2021 it announced uniform compensation — $175,000 for every one of its 23 employees, founders included — arguing that pay asymmetry creates information asymmetry. The model persists; the number reached $275,000 by May 2025, with a carve-out for sales incentives that the company itself flags as an exception under watch. Around it: RFDs (Requests for Discussion) published in full, board decks shared with all staff, and a weekly Discord-recorded show, Oxide and Friends, that treats engineering decisions as public record. The earlier On the Metal podcast ran for two years before there was a product to sell — the audience preceded the market.

## Product and open source

The software stack is developed almost entirely in public: Omicron, the Rust control plane; Hubris, the memory-protected service-processor kernel announced November 30, 2021, with its debugger Humility; Helios, the illumos-derived host OS; Propolis, the hypervisor; and generalized tools like Dropshot and Progenitor. Jessie Frazelle departed as CPO in July 2022 to co-found KittyCAD (now Zoo). The commercial Cloud Computer was unveiled October 26, 2023 alongside a $44M Series A led by Eclipse — bringing total financing to $78M. Named customers include Idaho National Laboratory; Eclipse additionally names Switch, Shopify, and Lawrence Livermore. In November 2024 the LLNL collaboration on cloud/HPC convergence — including Flux integration — became public, with Los Alamos and Sandia participating in related activities.

## The money

The capital story is emphatic: a $100M Series B in July 2025 led by Thomas Tull's US Innovative Technology Fund, then a $200M Series C in February 2026 — again USIT-led, with Eclipse, Riot, and Jane Street participating — "doubling total funding for the second time," to roughly $378M. Each announcement doubles as manifesto: the Series C restates that Oxide aims to be "a generational company," not an acquisition target. In July 2026 the company joined Anthropic's Project Glasswing, applying Claude Mythos to its own codebase.

## What the record does not settle

The early financing is murky — the ~$20M seed that aggregators report doesn't cleanly reconcile with the $34M implied by Series A math or Oxide's own "$89M over six years" framing. Headcount and revenue are undisclosed. Whether uniform compensation survives real scale, and whether on-prem cloud's moment has actually arrived, remain bets rather than findings. The transparency is real but self-administered — the company curates the record it publishes.

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
