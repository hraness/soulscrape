#!/usr/bin/env bun
/** Generate examples/people/bryan-cantrill/person-index.json with derived source ids. */

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

const obsDeckAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — The Observation Deck",
  url: "https://bcantrill.dtrace.org/about/",
  publisher: "The Observation Deck (Bryan Cantrill)",
  authors: ["Bryan Cantrill"],
  notes:
    "The subject's own biography page; career-length claims here are self-reported.",
});
const obsDeckSoul = source({
  binding: "first_person",
  mediaType: "article",
  title: "The soul of a new computer company",
  url: "https://bcantrill.dtrace.org/2019/12/02/the-soul-of-a-new-computer-company/",
  publisher: "The Observation Deck (Bryan Cantrill)",
  publishedAt: "2019-12-02",
  authors: ["Bryan Cantrill"],
  notes: "The subject's own announcement of Oxide Computer Company.",
});
const obsDeckTalks = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Talks I have given, conversations I have had",
  url: "https://bcantrill.dtrace.org/2018/02/03/talks-i-have-given-conversations-i-have-had/",
  publisher: "The Observation Deck (Bryan Cantrill)",
  publishedAt: "2018-02-03",
  authors: ["Bryan Cantrill"],
  notes:
    "The subject's running index of his own talks and podcast appearances, organized into 'trilogies.'",
});
const queueHidden = source({
  binding: "first_person",
  mediaType: "article",
  title: "Hidden in Plain Sight",
  url: "https://queue.acm.org/detail.cfm?id=1117401",
  publisher: "ACM Queue",
  publishedAt: "2006-02",
  authors: ["Bryan Cantrill"],
  notes:
    "The subject's own account of DTrace's design principles; also republished in Communications of the ACM.",
});
const queueRwc = source({
  binding: "first_person",
  mediaType: "article",
  title: "Real-World Concurrency",
  url: "https://queue.acm.org/detail.cfm?id=1454462",
  publisher: "ACM Queue",
  publishedAt: "2008-09",
  authors: ["Bryan Cantrill", "Jeff Bonwick"],
});
const monktoberfest = source({
  binding: "first_person",
  mediaType: "video",
  title: "Principles of Technology Leadership — Monktoberfest 2017",
  url: "https://www.youtube.com/watch?v=9QMGAtxUlAc",
  publisher: "RedMonk",
  publishedAt: "2017-10",
  authors: ["Bryan Cantrill"],
});
const nodesummit = source({
  binding: "first_person",
  mediaType: "video",
  title:
    "Platform as a Reflection of Values: Joyent, Node.js, and Beyond — Node Summit 2017",
  url: "https://www.youtube.com/watch?v=Xhx970_JKX4",
  publisher: "Node Summit",
  publishedAt: "2017",
  authors: ["Bryan Cantrill"],
});
const zebras = source({
  binding: "first_person",
  mediaType: "video",
  title:
    "Zebras All the Way Down: The Engineering Challenges of the Data Path — Uptime 2017",
  url: "https://www.youtube.com/watch?v=fE2KDzZaxvE",
  publisher: "UptimeConf",
  publishedAt: "2017-10",
  authors: ["Bryan Cantrill"],
});
const ee380 = source({
  binding: "first_person",
  mediaType: "video",
  title:
    "The Soul of a New Machine: Rethinking the Computer — Stanford EE380",
  url: "https://www.youtube.com/watch?v=vvZA9n3e5pc",
  publisher: "Stanford University",
  publishedAt: "2020-02-26",
  authors: ["Bryan Cantrill"],
});
const shouting = source({
  binding: "subject_controlled",
  mediaType: "video",
  title: "Shouting in the Datacenter",
  url: "https://www.youtube.com/watch?v=tDacjrSCeq4",
  publisher: "Bryan Cantrill (YouTube)",
  publishedAt: "2008-12-31",
  notes:
    "Hosted on the subject's own channel; the on-camera demonstration is by Sun Fishworks colleague Brendan Gregg.",
});
const oxideBoot = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Oxide Computer Company: Initial boot sequence",
  url: "https://oxide.computer/blog/introducing-the-oxide-computer-company",
  publisher: "Oxide Computer Company",
  publishedAt: "2019-12-01",
});
const oxideCloud = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Cloud Computer",
  url: "https://oxide.computer/blog/the-cloud-computer",
  publisher: "Oxide Computer Company",
  publishedAt: "2023-10-26",
  authors: ["Bryan Cantrill"],
  notes:
    "Authored by the subject on the company blog; announces general availability and the $44M Series A.",
});
const oxideSeriesC = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Our $200M Series C",
  url: "https://oxide.computer/blog/our-200m-series-c",
  publisher: "Oxide Computer Company",
  publishedAt: "2026-02-05",
  authors: ["Bryan Cantrill", "Steve Tuck"],
});
const oxidePodcast = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "On the Metal",
  url: "https://oxide.computer/podcasts/on-the-metal",
  publisher: "Oxide Computer Company",
  notes:
    "Company podcast page; the latest listed episode is from February 2023.",
});
const bytecast = source({
  binding: "interview",
  mediaType: "audio",
  title: "ACM ByteCast Ep17: Bryan Cantrill",
  url: "https://learning.acm.org/bytecast/ep17-bryan-cantrill",
  publisher: "ACM ByteCast",
  publishedAt: "2021-06-28",
  authors: ["Rashmi Mohan"],
  notes: "Interview episode; ACM also publishes a transcript.",
});
const usenix04 = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Dynamic Instrumentation of Production Systems (USENIX ATC 2004)",
  url: "https://static.usenix.org/events/usenix04/tech/general/cantrill.html",
  publisher: "USENIX",
  publishedAt: "2004",
  authors: ["Bryan M. Cantrill", "Michael W. Shapiro", "Adam H. Leventhal"],
  notes:
    "Conference abstract page; the full paper appears in the 2004 USENIX Annual Technical Conference proceedings, pp. 15–28.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Bryan Cantrill",
  url: "https://en.wikipedia.org/wiki/Bryan_Cantrill",
  publisher: "Wikipedia",
  notes:
    "Infobox gives a December 1973 birth while the article's own categories list '1974 births'; used for discovery, not as sole authority.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Bryan Cantrill (Q4980008)",
  url: "https://www.wikidata.org/wiki/Q4980008",
  publisher: "Wikidata",
});
const reuters = source({
  binding: "reporting",
  mediaType: "article",
  title: "Cloud server startup Oxide raises $100 million",
  url: "https://www.reuters.com/technology/cloud-server-startup-oxide-computing-raises-100-million-2025-07-30/",
  publisher: "Reuters",
  publishedAt: "2025-07-30",
});
const infoq = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oxide Computer Company Launch",
  url: "https://www.infoq.com/news/2019/12/oxide-computer-company-launch/",
  publisher: "InfoQ",
  publishedAt: "2019-12-07",
  authors: ["Chris Swan"],
});

const S = {
  obsDeckAbout: obsDeckAbout.id,
  obsDeckSoul: obsDeckSoul.id,
  obsDeckTalks: obsDeckTalks.id,
  queueHidden: queueHidden.id,
  queueRwc: queueRwc.id,
  monktoberfest: monktoberfest.id,
  nodesummit: nodesummit.id,
  zebras: zebras.id,
  ee380: ee380.id,
  shouting: shouting.id,
  oxideBoot: oxideBoot.id,
  oxideCloud: oxideCloud.id,
  oxideSeriesC: oxideSeriesC.id,
  oxidePodcast: oxidePodcast.id,
  bytecast: bytecast.id,
  usenix04: usenix04.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  reuters: reuters.id,
  infoq: infoq.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-bryan-cantrill",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "bryan-cantrill",
    displayName: "Bryan Cantrill",
    alsoKnownAs: ["Bryan M. Cantrill", "Bryan McDowell Cantrill", "bcantrill"],
    summary:
      "American software engineer and computer-company builder: co-inventor of DTrace at Sun Microsystems, longtime Joyent VP of Engineering and CTO, and co-founder and CTO of Oxide Computer Company, where he also hosts the On the Metal podcast.",
    identity: {
      wikidataId: "Q4980008",
      officialSite: "https://bcantrill.dtrace.org/",
      wikipedia: "https://en.wikipedia.org/wiki/Bryan_Cantrill",
      profiles: ["https://x.com/bcantrill"],
    },
  },
  scope: {
    asOf: "2026-09-16T00:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    obsDeckAbout,
    obsDeckSoul,
    obsDeckTalks,
    queueHidden,
    queueRwc,
    monktoberfest,
    nodesummit,
    zebras,
    ee380,
    shouting,
    oxideBoot,
    oxideCloud,
    oxideSeriesC,
    oxidePodcast,
    bytecast,
    usenix04,
    wikipedia,
    wikidata,
    reuters,
    infoq,
  ],
  claims: [
    {
      id: "claim-born-1973",
      kind: "fact",
      text: "Bryan McDowell Cantrill was born in December 1973 in Vermont and later moved to Colorado, where he attained the rank of Eagle Scout.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-brown-education",
      kind: "fact",
      text: "He studied computer science at Brown University — spending two summers doing kernel development at QNX Software Systems — and completed his B.Sc. in 1996; he has said he first conceived of dynamic instrumentation as an undergraduate.",
      sourceIds: [S.wikipedia, S.bytecast],
    },
    {
      id: "claim-sun-1996",
      kind: "fact",
      text: "Upon graduating in 1996 he joined Sun Microsystems, working with Jeff Bonwick in the Solaris Performance Group; he spent fourteen years at Sun in total and rose to Distinguished Engineer.",
      sourceIds: [S.wikipedia, S.queueRwc, S.obsDeckAbout],
    },
    {
      id: "claim-dtrace-team",
      kind: "fact",
      text: "He co-designed and implemented DTrace with colleagues Mike Shapiro and Adam Leventhal at Sun.",
      sourceIds: [S.usenix04, S.wikipedia],
    },
    {
      id: "claim-dtrace-paper",
      kind: "fact",
      text: "The DTrace paper 'Dynamic Instrumentation of Production Systems' was published in the proceedings of the 2004 USENIX Annual Technical Conference (pp. 15–28).",
      sourceIds: [S.usenix04],
    },
    {
      id: "claim-dtrace-design",
      kind: "fact",
      text: "DTrace provides dynamic, safe instrumentation of production systems across user and kernel code: zero probe effect when disabled, tens of thousands of instrumentation points, a C-like control language (D), in situ data aggregation, and speculative tracing.",
      sourceIds: [S.usenix04, S.queueHidden],
    },
    {
      id: "claim-dtrace-shipping",
      kind: "fact",
      text: "DTrace was developed for Solaris 10 and subsequently ported to other operating systems including FreeBSD and Mac OS; it remains a flagship technology of the illumos family descended from OpenSolaris.",
      sourceIds: [S.queueHidden, S.queueRwc],
    },
    {
      id: "claim-awards",
      kind: "fact",
      text: "For DTrace, Cantrill was named to MIT Technology Review's TR35 list in 2005; DTrace won The Wall Street Journal's 2006 Technology Innovation Award (Gold); and Cantrill, Shapiro, and Leventhal received the USENIX Software Tools User Group (STUG) award in 2008.",
      sourceIds: [S.wikipedia, S.bytecast],
    },
    {
      id: "claim-fishworks",
      kind: "fact",
      text: "With Shapiro and Leventhal he founded Fishworks, a stealth project inside Sun that produced the Sun Storage 7000 Unified Storage Systems; Cantrill designed the DTrace-based analytics facility for the appliances.",
      sourceIds: [S.wikipedia, S.shouting],
    },
    {
      id: "claim-shouting-video",
      kind: "fact",
      text: "In December 2008 he published 'Shouting in the Datacenter' on his own channel: a two-minute video in which Fishworks colleague Brendan Gregg demonstrates that shouting at a JBOD induces measurable disk latency, visualized live with the team's DTrace-based analytics.",
      sourceIds: [S.shouting],
    },
    {
      id: "claim-oracle-exit",
      kind: "fact",
      text: "After Oracle's acquisition of Sun, he left Oracle on July 25, 2010 — announcing it in a blog post titled 'Good-bye, Sun' — to become Vice President of Engineering at Joyent.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-joyent-roles",
      kind: "fact",
      text: "He became Joyent's CTO in April 2014 and held the role until his departure on July 31, 2019 — nine years at the company in total, working on SmartOS, SmartDataCenter, and the Node.js platform.",
      sourceIds: [S.wikipedia, S.obsDeckAbout],
    },
    {
      id: "claim-nodejs-stewardship",
      kind: "fact",
      text: "In his telling, Joyent was the corporate steward of Node.js from 2010 until the formation of the Node Foundation in 2015; his Node Summit 2017 talk recounts that stewardship and Joyent's subsequent move toward a more polyglot platform strategy.",
      sourceIds: [S.nodesummit],
    },
    {
      id: "claim-oxide-founding",
      kind: "fact",
      text: "Together with Steve Tuck and Jess Frazelle, he co-founded Oxide Computer Company; the company was announced on December 1–2, 2019 with seed backing from Eclipse Ventures and Pierre Lamond joining the board.",
      sourceIds: [S.obsDeckSoul, S.oxideBoot, S.infoq],
    },
    {
      id: "claim-oxide-thesis",
      kind: "fact",
      text: "Oxide's founding thesis is to deliver integrated, hyperscaler-class infrastructure to the broader market — 'a computer company' selling a rack-scale system in which hardware and software are co-designed, rather than renting cloud capacity.",
      sourceIds: [S.obsDeckSoul, S.oxideCloud, S.infoq],
    },
    {
      id: "claim-cloud-computer-ga",
      kind: "fact",
      text: "On October 26, 2023, Oxide announced general availability of what it calls the world's first commercial cloud computer, alongside a $44M Series A; the rack ships fully integrated — blindmated networking, its own switch, and all system software built in, open source, and without separate licensing.",
      sourceIds: [S.oxideCloud],
    },
    {
      id: "claim-series-b",
      kind: "fact",
      text: "On July 30, 2025, Oxide announced a $100M Series B led by Thomas Tull's US Innovative Technology Fund with participation from all existing investors, more than doubling its roughly $89M previously raised.",
      sourceIds: [S.reuters, S.oxideSeriesC],
    },
    {
      id: "claim-series-c",
      kind: "fact",
      text: "On February 5, 2026, Oxide announced a $200M Series C raised entirely from existing investors, which the company says assures its independence 'into the indefinite future.'",
      sourceIds: [S.oxideSeriesC],
    },
    {
      id: "claim-on-the-metal",
      kind: "fact",
      text: "He co-hosts On the Metal, the interview podcast created alongside Oxide with Jess Frazelle and frequently Steve Tuck; guests have included Jeff Rothschild, Ron Minnich, Jon Masters, John Graham-Cumming, and Ken Shirriff.",
      sourceIds: [S.oxidePodcast],
    },
    {
      id: "claim-oxide-and-friends",
      kind: "fact",
      text: "He also co-hosts Oxide and Friends, the company's social-audio show that began on Twitter Spaces in 2021 and continues as a podcast, often with Adam Leventhal.",
      sourceIds: [S.obsDeckTalks, S.oxidePodcast],
    },
    {
      id: "claim-acm-board",
      kind: "fact",
      text: "He was a member of the ACM Queue Editorial Board.",
      sourceIds: [S.wikipedia, S.bytecast],
    },
    {
      id: "claim-fork-yeah",
      kind: "fact",
      text: "His LISA '11 talk 'Fork Yeah! The Rise & Development of illumos' is, by his own account, his most-watched talk — in part because of its unvarnished criticism of Oracle beginning around the 33-minute mark.",
      sourceIds: [S.obsDeckTalks],
    },
    {
      id: "claim-values-platforms",
      kind: "stated_belief",
      text: "He argues that choosing a software platform is not about 'the right tool for the job' but 'the right values for the job': every platform has core values, and the community a platform attracts is shaped by which values it privileges.",
      sourceIds: [S.nodesummit],
    },
    {
      id: "claim-observability-belief",
      kind: "stated_belief",
      text: "He holds that production systems must be safely and arbitrarily instrumentable — that understanding a live system requires the ability to ask it questions without stopping it, a constraint he describes as the central design driver of DTrace.",
      sourceIds: [S.queueHidden, S.usenix04],
    },
    {
      id: "claim-codesign-belief",
      kind: "stated_belief",
      text: "He believes hardware and software must be designed together — citing Alan Kay's line that 'people who are really serious about software should make their own hardware' — and that the rack, not the 1U server, is the correct unit of design for cloud infrastructure.",
      sourceIds: [S.oxideCloud, S.ee380],
    },
    {
      id: "claim-principles-belief",
      kind: "stated_belief",
      text: "He argues that technology companies must make their principles explicit and live by them, presenting 'Principles of Technology Leadership' — ranging from the Gettysburg Address to Uber — as possibly the most important talk he has given.",
      sourceIds: [S.monktoberfest, S.obsDeckTalks],
    },
    {
      id: "claim-open-source-belief",
      kind: "stated_belief",
      text: "He frames open source as both strategy and ethics: Oracle's closing of OpenSolaris made illumos the repository of record for ZFS, DTrace, and Zones, and at Oxide 'our software is all open' because the product sold is the computer itself.",
      sourceIds: [S.obsDeckTalks, S.oxideCloud, S.bytecast],
    },
    {
      id: "claim-generational-company",
      kind: "stated_belief",
      text: "He presents Oxide as a would-be generational company rather than an acquisition target — 'our life's work, not a means to an end' — built on principles summarized in its founding pitch: kick butt, have fun, do not cheat, love customers, change computing forever.",
      sourceIds: [S.oxideSeriesC, S.obsDeckSoul],
    },
    {
      id: "claim-toolmaking-belief",
      kind: "stated_belief",
      text: "He maintains that toolmaking is a primary engineering activity and that engineers should be trusted to decide how much time to spend making tools versus building the artifact itself.",
      sourceIds: [S.obsDeckTalks],
    },
    {
      id: "claim-engineering-humanity",
      kind: "stated_belief",
      text: "He argues that engineering is not merely an act of intelligence — that its humanity matters — a position he pressed as a rebuttal to AI doomerism in his Monktoberfest 2023 talk 'Intelligence is not enough.'",
      sourceIds: [S.obsDeckTalks],
    },
    {
      id: "claim-oral-tradition",
      kind: "stated_belief",
      text: "He believes engineering craft passes between generations through oral tradition — talks, podcasts, and social audio — which is why he treats storytelling as a serious engineering medium rather than marketing.",
      sourceIds: [S.obsDeckTalks, S.oxidePodcast],
    },
    {
      id: "claim-pattern-debugging",
      kind: "pattern",
      text: "Across three decades, a single obsession recurs: understanding what systems are actually doing in production — from undergraduate performance tools through DTrace, Fishworks analytics, statemaps, and his 'Debugging Trilogy' of talks on pathological failures.",
      sourceIds: [S.usenix04, S.shouting, S.zebras, S.obsDeckTalks],
    },
    {
      id: "claim-pattern-values-explicit",
      kind: "pattern",
      text: "He repeatedly converts implicit culture into explicit artifacts: Joyent's platform values became a Node Summit talk, and Oxide's mission and principles are published as public Requests for Discussion and company posts.",
      sourceIds: [S.nodesummit, S.oxideSeriesC, S.oxideCloud],
    },
    {
      id: "claim-pattern-zebras",
      kind: "pattern",
      text: "His debugging talks focus on 'zebras' — rare, cross-layer pathologies in the data path like firmware bugs and vibration-induced disk latency — arguing that exotic failures demand the same observability rigor as common ones.",
      sourceIds: [S.zebras, S.shouting],
    },
    {
      id: "claim-spec-shouting-impact",
      kind: "speculation",
      text: "The 'Shouting in the Datacenter' video has been viewed millions of times; it plausibly did more to popularize DTrace-driven analytics than any formal paper, though that influence is inherently unmeasurable.",
      sourceIds: [S.shouting],
    },
    {
      id: "claim-spec-fork-yeah-impact",
      kind: "speculation",
      text: "The unvarnished Oracle critique inside 'Fork Yeah!' is widely treated as a rallying moment for the illumos community; its causal weight in illumos's growth is asserted by the subject himself and cannot be isolated.",
      sourceIds: [S.obsDeckTalks],
    },
    {
      id: "claim-spec-oxide-market",
      kind: "speculation",
      text: "Whether the buy-don't-rent rack-scale model generalizes beyond early adopters remains a live bet: Oxide asserts product-market fit after its Series C, but independent market sizing is thin.",
      sourceIds: [S.oxideSeriesC, S.reuters],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1973-12",
      title: "Born in Vermont",
      summary:
        "Bryan McDowell Cantrill, born December 1973; raised in Colorado, where he became an Eagle Scout.",
      location: "Vermont, USA",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-brown",
      kind: "education",
      date: "1996",
      title: "B.Sc. in computer science, Brown University",
      summary:
        "Studied computer science at Brown, with two summers of kernel development at QNX Software Systems; undergraduate work included the ThreadMon performance-monitoring tool.",
      organization: "Brown University",
      sourceIds: [S.wikipedia, S.bytecast],
    },
    {
      id: "event-sun",
      kind: "role",
      date: "1996",
      end: "2010",
      title: "Sun Microsystems — Solaris Performance Group to Distinguished Engineer",
      summary:
        "Joined Sun in 1996 to work with Jeff Bonwick on Solaris performance; spent fourteen years on system software, co-inventing DTrace and co-founding the Fishworks storage group.",
      organization: "Sun Microsystems",
      sourceIds: [S.wikipedia, S.queueRwc, S.obsDeckAbout],
    },
    {
      id: "event-dtrace-paper",
      kind: "publication",
      date: "2004-06",
      title: "DTrace paper at USENIX ATC 2004",
      summary:
        "'Dynamic Instrumentation of Production Systems,' with Michael W. Shapiro and Adam H. Leventhal, Boston.",
      location: "Boston, MA",
      sourceIds: [S.usenix04],
    },
    {
      id: "event-solaris-10",
      kind: "milestone",
      date: "2005",
      title: "DTrace ships in Solaris 10",
      summary:
        "DTrace, developed for Solaris 10, had been available earlier via Solaris Express; sources differ on the precise first-ship date.",
      sourceIds: [S.queueHidden, S.wikipedia],
    },
    {
      id: "event-dtrace-awards",
      kind: "award",
      date: "2005",
      end: "2008",
      title: "TR35, WSJ Gold, and USENIX STUG for DTrace",
      summary:
        "MIT Technology Review TR35 (2005); Wall Street Journal Technology Innovation Award, Gold (2006); USENIX Software Tools User Group award with Shapiro and Leventhal (2008).",
      sourceIds: [S.wikipedia, S.bytecast],
    },
    {
      id: "event-fishworks",
      kind: "project",
      date: "2008-11",
      title: "Fishworks revealed: Sun Storage 7000",
      summary:
        "The stealth group Cantrill founded with Shapiro and Leventhal produced the Sun Storage 7000 Unified Storage Systems, with his DTrace-based analytics as the headline feature.",
      organization: "Sun Microsystems",
      sourceIds: [S.wikipedia, S.shouting],
    },
    {
      id: "event-joyent",
      kind: "role",
      date: "2010-07",
      end: "2019-07",
      title: "Joyent — VP of Engineering, then CTO",
      summary:
        "Left Oracle for Joyent on July 25, 2010; VP of Engineering, CTO from April 2014, departed July 31, 2019. Joyent stewarded Node.js for much of this period.",
      organization: "Joyent",
      sourceIds: [S.wikipedia, S.nodesummit, S.obsDeckAbout],
    },
    {
      id: "event-fork-yeah",
      kind: "media",
      date: "2011-12",
      title: "'Fork Yeah! The Rise & Development of illumos' at LISA '11",
      summary:
        "His self-described most-watched talk — an illumos history containing an unvarnished critique of Oracle.",
      location: "Boston, MA",
      sourceIds: [S.obsDeckTalks],
    },
    {
      id: "event-oxide-founded",
      kind: "founded",
      date: "2019-12",
      title: "Oxide Computer Company announced",
      summary:
        "Co-founded with Steve Tuck and Jess Frazelle to build integrated, hyperscaler-class infrastructure for the broader market; backed by Eclipse Ventures.",
      organization: "Oxide Computer Company",
      sourceIds: [S.obsDeckSoul, S.oxideBoot, S.infoq],
    },
    {
      id: "event-ee380",
      kind: "media",
      date: "2020-02-26",
      title: "Stanford EE380: 'The Soul of a New Machine'",
      summary:
        "Computer Systems Colloquium talk laying out the Oxide thesis: the computer that runs the cloud should be purchasable, and building one requires rack-level hardware/software co-design.",
      organization: "Stanford University",
      sourceIds: [S.ee380, S.oxideCloud],
    },
    {
      id: "event-cloud-computer-ga",
      kind: "milestone",
      date: "2023-10-26",
      title: "Oxide Cloud Computer reaches general availability",
      summary:
        "Oxide announced what it calls the world's first commercial cloud computer, together with a $44M Series A.",
      organization: "Oxide Computer Company",
      sourceIds: [S.oxideCloud],
    },
    {
      id: "event-series-b",
      kind: "milestone",
      date: "2025-07-30",
      title: "$100M Series B led by USIT",
      summary:
        "Thomas Tull's US Innovative Technology Fund led the round, more than doubling Oxide's total capital raised to that point.",
      organization: "Oxide Computer Company",
      sourceIds: [S.reuters],
    },
    {
      id: "event-series-c",
      kind: "milestone",
      date: "2026-02-05",
      title: "$200M Series C from existing investors",
      summary:
        "Raised without seeking it, the company says — intended to assure independence and 'generational company' permanence.",
      organization: "Oxide Computer Company",
      sourceIds: [S.oxideSeriesC],
    },
  ],
  themes: [
    {
      id: "theme-observability",
      kind: "philosophy",
      status: "stated",
      title: "Production systems must be safely observable",
      summary:
        "The animating idea behind DTrace: a live system should answer arbitrary questions without being stopped, perturbed, or put at risk — zero probe effect when disabled, and safety enforced by the system rather than the user's care.",
      sourceIds: [S.queueHidden, S.usenix04],
    },
    {
      id: "theme-platform-values",
      kind: "philosophy",
      status: "stated",
      title: "Platforms as reflections of values",
      summary:
        "Choosing a platform means choosing its values, not just its features: communities form around a platform's core values, so engineers should identify them explicitly — 'the right values for the job' rather than 'the right tool for the job.'",
      sourceIds: [S.nodesummit],
    },
    {
      id: "theme-codesign",
      kind: "method",
      status: "stated",
      title: "Hardware/software co-design, rack as the unit",
      summary:
        "Cloud infrastructure should be designed holistically — compute, storage, networking, firmware, and control plane together, at rack scale rather than as assembled 1U servers. This is the founding engineering conviction of Oxide.",
      sourceIds: [S.oxideCloud, S.ee380, S.obsDeckSoul],
    },
    {
      id: "theme-debugging-zebras",
      kind: "method",
      status: "stated",
      title: "Debugging the improbable",
      summary:
        "His 'Debugging Trilogy' and related work target rare cross-layer failures — firmware defects, vibration-induced latency, pathological performance — arguing that hard problems yield to observability plus persistence, not folklore.",
      sourceIds: [S.zebras, S.obsDeckTalks, S.shouting],
    },
    {
      id: "theme-principled-leadership",
      kind: "belief",
      status: "stated",
      title: "Explicit principles as technology leadership",
      summary:
        "Companies should articulate and live by principles; decency and integrity are leadership requirements, not decoration. He calls this talk possibly the most important he has ever given.",
      sourceIds: [S.monktoberfest, S.obsDeckTalks],
    },
    {
      id: "theme-open-source-ethos",
      kind: "practice",
      status: "stated",
      title: "Open source as strategy and ethos",
      summary:
        "From Solaris's open-sourcing through the illumos fork to Oxide's all-open software stack, he treats openness as both an engineering advantage and a matter of custodianship — and Oracle's closing of OpenSolaris as a cautionary tale.",
      sourceIds: [S.obsDeckTalks, S.oxideCloud, S.bytecast],
    },
    {
      id: "theme-forgotten-operator",
      kind: "philosophy",
      status: "stated",
      title: "The forgotten on-premises operator",
      summary:
        "The public-cloud narrative left behind the organizations that must — for security, regulatory, economic, or latency reasons — run their own computing; Oxide exists to serve them with a cloud computer they can buy.",
      sourceIds: [S.oxideCloud, S.obsDeckTalks, S.reuters],
    },
    {
      id: "theme-oral-tradition",
      kind: "belief",
      status: "stated",
      title: "Oral tradition as engineering transmission",
      summary:
        "Craft knowledge moves through stories: his talks, the On the Metal interviews, and the Oxide and Friends social-audio show are deliberate vehicles for passing engineering wisdom across generations.",
      sourceIds: [S.obsDeckTalks, S.oxidePodcast],
    },
    {
      id: "theme-sun-lineage",
      kind: "influence",
      status: "stated",
      title: "The Sun lineage",
      summary:
        "QNX internships, Brown, then fourteen years inside Sun's kernel culture under figures like Jeff Bonwick — plus the hard lesson of watching that culture end under Oracle — shape both his engineering and his company-building instincts.",
      sourceIds: [S.wikipedia, S.bytecast, S.obsDeckSoul],
    },
  ],
  works: [
    {
      id: "work-dtrace",
      kind: "product",
      status: "released",
      title: "DTrace",
      date: "2004",
      summary:
        "Facility for safe, dynamic instrumentation of production systems, co-designed and implemented with Mike Shapiro and Adam Leventhal; developed for Solaris 10 and ported to FreeBSD, Mac OS, and the illumos family.",
      sourceIds: [S.usenix04, S.queueHidden, S.queueRwc],
    },
    {
      id: "work-dtrace-paper",
      kind: "paper",
      status: "published",
      title: "Dynamic Instrumentation of Production Systems",
      date: "2004",
      summary:
        "The DTrace paper with Shapiro and Leventhal in the 2004 USENIX Annual Technical Conference proceedings.",
      sourceIds: [S.usenix04],
    },
    {
      id: "work-hidden-in-plain-sight",
      kind: "paper",
      status: "published",
      title: "Hidden in Plain Sight",
      date: "2006-02",
      summary:
        "ACM Queue article (later republished in Communications of the ACM) explaining DTrace's design principles through performance anti-patterns.",
      sourceIds: [S.queueHidden],
    },
    {
      id: "work-real-world-concurrency",
      kind: "paper",
      status: "published",
      title: "Real-World Concurrency",
      date: "2008-09",
      summary:
        "ACM Queue article with Jeff Bonwick: practical concurrency guidance — much less code needs to be parallel than feared — rooted in Solaris experience.",
      sourceIds: [S.queueRwc],
    },
    {
      id: "work-fishworks",
      kind: "product",
      status: "released",
      title: "Sun Storage 7000 analytics (Fishworks)",
      date: "2008-11",
      summary:
        "As co-founder of Sun's stealth Fishworks group, he designed the DTrace-based analytics facility that headlined the Sun Storage 7000 Unified Storage Systems — the same facility behind the 'Shouting in the Datacenter' demo.",
      sourceIds: [S.wikipedia, S.shouting],
    },
    {
      id: "work-oxide-cloud-computer",
      kind: "product",
      status: "released",
      title: "Oxide Cloud Computer",
      date: "2023-10-26",
      summary:
        "A rack-scale, integrated hardware/software system — blindmated networking, its own switch and service processors, all system software built in and open source — sold as 'the world's first commercial cloud computer.'",
      sourceIds: [S.oxideCloud],
    },
    {
      id: "work-oxide-software-stack",
      kind: "project",
      status: "ongoing",
      title: "Oxide software stack (including Hubris)",
      summary:
        "The open-source control plane, service-processor OS (Hubris, written in Rust), hypervisor, and storage layers developed at Oxide; design thinking is published as public Requests for Discussion.",
      sourceIds: [S.oxideCloud, S.obsDeckTalks, S.oxideSeriesC],
    },
    {
      id: "work-on-the-metal",
      kind: "recording",
      status: "released",
      title: "On the Metal",
      date: "2019",
      summary:
        "Oxide's interview podcast, hosted by Cantrill and Jess Frazelle with frequent appearances by Steve Tuck — unapologetically technical stories from the hardware/software interface.",
      sourceIds: [S.oxidePodcast],
    },
    {
      id: "work-oxide-and-friends",
      kind: "recording",
      status: "ongoing",
      title: "Oxide and Friends",
      date: "2021",
      summary:
        "A social-audio show and podcast that grew out of Twitter Spaces, co-hosted by Cantrill, on which engineers discuss systems work in depth.",
      sourceIds: [S.obsDeckTalks, S.oxidePodcast],
    },
    {
      id: "work-shouting-video",
      kind: "film",
      status: "released",
      title: "Shouting in the Datacenter",
      date: "2008-12-31",
      summary:
        "Two-minute video published on his channel in which Brendan Gregg demonstrates vibration-induced disk latency, live-visualized with Fishworks analytics — among the most-watched systems demos ever made.",
      sourceIds: [S.shouting],
    },
  ],
  appearances: [
    {
      id: "appearance-fork-yeah",
      title: "Fork Yeah! The Rise & Development of illumos",
      venue: "USENIX LISA '11",
      publishedAt: "2011-12",
      participants: ["Bryan Cantrill"],
      summary:
        "An 'infamous' talk in his own words — a history of illumos containing an unvarnished critique of Oracle; he reports it remains his most-watched talk.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=-zRN7XLCRhc",
        },
      ],
      sourceIds: [S.obsDeckTalks],
    },
    {
      id: "appearance-wardrobe",
      title:
        "A Wardrobe for the Emperor: Stitching Practical Bias into Systems Software Research",
      venue: "USENIX ATC 2016 (opening keynote)",
      publishedAt: "2016",
      participants: ["Bryan Cantrill"],
      summary:
        "A keynote on the uneasy relationship between systems research and practice — delivered, he notes, with an explicit disclaimer from the venue.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=ADvBM2j51U0",
        },
      ],
      sourceIds: [S.obsDeckTalks],
    },
    {
      id: "appearance-monktoberfest-2017",
      title: "Principles of Technology Leadership",
      venue: "Monktoberfest 2017",
      publishedAt: "2017-10",
      participants: ["Bryan Cantrill"],
      summary:
        "A talk on explicit principles and decency in technology leadership, from the Gettysburg Address to Uber — the talk he asks family and friends to watch.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=9QMGAtxUlAc",
          sourceId: S.monktoberfest,
        },
      ],
      sourceIds: [S.monktoberfest, S.obsDeckTalks],
    },
    {
      id: "appearance-node-summit-2017",
      title: "Platform as a Reflection of Values: Joyent, Node.js, and Beyond",
      venue: "Node Summit 2017",
      publishedAt: "2017",
      participants: ["Bryan Cantrill"],
      summary:
        "Joyent's Node.js stewardship from 2010 to the Node Foundation's 2015 formation, and the argument that platforms are chosen by values.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Xhx970_JKX4",
          sourceId: S.nodesummit,
        },
      ],
      sourceIds: [S.nodesummit],
    },
    {
      id: "appearance-zebras",
      title: "Zebras All the Way Down: The Engineering Challenges of the Data Path",
      venue: "Uptime 2017",
      publishedAt: "2017-10",
      participants: ["Bryan Cantrill"],
      summary:
        "Second talk in his 'Debugging Trilogy': rare cross-layer failures in firmware, drives, and controllers, and the observability needed to find them.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=fE2KDzZaxvE",
          sourceId: S.zebras,
        },
      ],
      sourceIds: [S.zebras, S.obsDeckTalks],
    },
    {
      id: "appearance-ee380",
      title: "The Soul of a New Machine: Rethinking the Computer",
      venue: "Stanford EE380 Computer Systems Colloquium",
      publishedAt: "2020-02-26",
      participants: ["Bryan Cantrill"],
      summary:
        "The Oxide thesis in public form: a history of servers arguing for rack-scale, co-designed, purchasable cloud infrastructure.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=vvZA9n3e5pc",
          sourceId: S.ee380,
        },
      ],
      sourceIds: [S.ee380, S.oxideCloud],
    },
    {
      id: "appearance-shouting",
      title: "Shouting in the Datacenter",
      venue: "Sun Fishworks lab / YouTube",
      publishedAt: "2008-12-31",
      participants: ["Brendan Gregg", "Bryan Cantrill"],
      summary:
        "Cantrill filmed and published colleague Brendan Gregg's demonstration that shouting at a JBOD induces disk latency — a vivid proof of DTrace-based analytics.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=tDacjrSCeq4",
          sourceId: S.shouting,
        },
      ],
      sourceIds: [S.shouting],
    },
    {
      id: "appearance-bytecast",
      title: "ACM ByteCast Episode 17",
      venue: "ACM ByteCast",
      publishedAt: "2021-06-28",
      participants: ["Bryan Cantrill", "Rashmi Mohan"],
      summary:
        "Career interview: Commodore PET childhood, QNX internships, conceiving DTrace at Brown, why he believes open source will conquer every domain, and designing a rack-scale computer.",
      media: [
        {
          type: "audio",
          url: "https://learning.acm.org/bytecast/ep17-bryan-cantrill",
          sourceId: S.bytecast,
        },
      ],
      sourceIds: [S.bytecast],
    },
    {
      id: "appearance-on-the-metal",
      title: "On the Metal (host)",
      venue: "Oxide Computer Company",
      publishedAt: "2019",
      participants: ["Bryan Cantrill", "Jess Frazelle", "Steve Tuck"],
      summary:
        "Oxide's interview podcast: deep technical oral histories from guests including Jeff Rothschild, Ron Minnich, Tom Lyon, Trammell Hudson, Jon Masters, and Ken Shirriff.",
      media: [
        {
          type: "audio",
          url: "https://oxide.computer/podcasts/on-the-metal",
          sourceId: S.oxidePodcast,
        },
      ],
      sourceIds: [S.oxidePodcast],
    },
  ],
  openQuestions: [
    "Wikipedia's infobox and Wikidata give a December 1973 birth, but the Wikipedia article's own categories include '1974 births'; the precise birth year and day are not settled in the cited record.",
    "DTrace's first availability is variously dated: it was developed for Solaris 10 (released January 2005), the ACM Queue concurrency article says it 'first shipped in Solaris in 2004,' and his own writing describes availability via Solaris Express from late 2003.",
    "Oxide's formal founding date is not stated: the December 1–2, 2019 announcements describe a company already funded and hiring, and press accounts say only 'founded in 2019.'",
    "On the Metal's status is ambiguous: the latest listed episode is from February 2023, with no announced end or hiatus; whether it resumes is unstated.",
    "The degree of his personal (versus organizational) role in Joyent's Node.js stewardship decisions — including the io.js fork period — is not detailed in the cited sources.",
    "Oxide's 'world's first commercial cloud computer' is the company's own framing; the catalog contains no independent market analysis adjudicating the claim.",
  ],
  body: `Bryan Cantrill is an American software engineer whose career runs in a straight line through the operating-system layer of computing — from Solaris kernel internals to cloud platforms to, now, an entire rack-scale machine. He is the co-inventor of DTrace, the dynamic-instrumentation facility that made production systems answerable to arbitrary questions; a former Sun Microsystems Distinguished Engineer; Joyent's one-time VP of Engineering and later CTO; and since 2019 the co-founder and CTO of Oxide Computer Company, where he also co-hosts the On the Metal podcast.

## Formation and Sun

Cantrill was born in Vermont in December 1973 and raised in Colorado, where he became an Eagle Scout. A self-described child of the eighties whose first machine was a Commodore PET, he studied computer science at Brown University, spending two summers doing kernel development at QNX and building the ThreadMon performance tool as undergraduate work. He has said the seed of DTrace was planted at Brown: an undergraduate baffled that one could not simply ask a running system what it was doing. On graduating in 1996 he joined Sun Microsystems, working with Jeff Bonwick — inventor of ZFS — in the Solaris Performance Group, and he stayed fourteen years, rising to Distinguished Engineer.

## DTrace and Fishworks

At Sun, with colleagues Mike Shapiro and Adam Leventhal, Cantrill designed and implemented DTrace: safe, dynamic instrumentation for production systems. Its architecture enforces safety at the framework level — only probes a provider publishes can be enabled — so a live system can be observed with zero probe effect when disabled and no crash risk when enabled. The 2004 USENIX Annual Technical Conference paper (Cantrill, Shapiro, Leventhal) remains the canonical account; his own ACM Queue essays, "Hidden in Plain Sight" (2006) and "Real-World Concurrency" with Bonwick (2008), are the practitioner's versions. Developed for Solaris 10 and later ported to FreeBSD, Mac OS, and the illumos family, DTrace won him a place on MIT Technology Review's TR35 list in 2005, the Wall Street Journal's gold Technology Innovation Award in 2006, and the USENIX STUG award in 2008.

With the same collaborators he founded Fishworks, a stealth group inside Sun that built the Sun Storage 7000 appliances — and, critically, their DTrace-based analytics facility. That work produced an accidental piece of computing folklore: the 2008 "Shouting in the Datacenter" video, in which Fishworks engineer Brendan Gregg yells at a JBOD and watches disk latency spike live. Cantrill filmed and posted it; it has been viewed millions of times and remains the canonical demo of making the invisible visible.

## Joyent and the Node years

After Oracle's acquisition of Sun, Cantrill left on July 25, 2010 — announcing it in a post titled "Good-bye, Sun" — to become Joyent's VP of Engineering, then CTO from April 2014 until his departure on July 31, 2019. At Joyent he oversaw SmartOS and SmartDataCenter development and the company's role as corporate steward of Node.js from 2010 until the Node Foundation's 2015 formation — a stewardship he later recounted, and interrogated, in "Platform as a Reflection of Values" at Node Summit 2017. The same period produced his most-watched talk: "Fork Yeah! The Rise & Development of illumos" at LISA '11, a history of the OpenSolaris fork containing, by his own description, an unvarnished critique of Oracle starting around minute thirty-three.

## Oxide: a computer company

In December 2019 Cantrill, Steve Tuck, and Jess Frazelle announced Oxide Computer Company, backed by Eclipse Ventures. The thesis, as Cantrill laid it out at Stanford's EE380 colloquium in February 2020 and in the company's launch posts: cloud computing is the future of all computing, the computer that runs the cloud should be purchasable rather than only rentable, and building one requires rack-scale co-design of hardware and software. On October 26, 2023, Oxide announced general availability of what it calls the world's first commercial cloud computer — a rack shipping in a single crate, with blindmated networking, its own switch, and an all-open software stack including the Rust service-processor OS Hubris — alongside a $44M Series A. A $100M Series B led by Thomas Tull's US Innovative Technology Fund followed in July 2025, and a $200M Series C from existing investors in February 2026, which the company frames as assuring permanence: a generational company, not an acquisition target.

## Voice and method

Cantrill's public talks are a genre of their own — long, historically loaded, and unafraid of opinion — which he organizes into trilogies (debugging, software values, open source, containers). He names "Principles of Technology Leadership" (Monktoberfest 2017) as possibly his most important talk. The recurring convictions are consistent: systems must be observable in production; platforms embody values and attract communities accordingly; hardware and software should be designed together; companies run on explicit principles; and engineering craft passes between generations through oral tradition — which is why he treats talks, the On the Metal interviews, and the Oxide and Friends social-audio show as engineering work, not marketing.

## What the record does not settle

The seams are small but real. Reference sources disagree on his birth year by one year (Wikipedia's categories say 1974; its infobox and Wikidata say December 1973). DTrace's first-ship date is stated differently across his own and official accounts (Solaris Express 2003, "Solaris in 2004," Solaris 10 in 2005). Oxide's precise founding date predates its December 2019 announcement by an unstated amount. On the Metal has been quiet since February 2023 with no announced end. And the superlatives — "most-watched," "world's first commercial cloud computer" — are the subject's own framing, preserved here as such.

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
