#!/usr/bin/env bun
/** Generate examples/people/johannes-schickling/person-index.json with derived source ids. */

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
  title: "Johannes Schickling",
  url: "https://www.schickling.dev/",
  publisher: "schickling.dev",
  notes:
    "The subject's own site: bio, speaking list, and work history; claims here are self-reported.",
});
const siteProjects = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Projects — Johannes Schickling",
  url: "https://www.schickling.dev/projects",
  publisher: "schickling.dev",
  notes: "The subject's own project catalog with dates.",
});
const linkedin = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Johannes Schickling — LinkedIn",
  url: "https://www.linkedin.com/in/schickling",
  publisher: "LinkedIn",
  notes: "Self-maintained profile; role dates are self-reported.",
});
const livestoreSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "LiveStore — local-first data layer for high-performance apps",
  url: "https://livestore.dev/",
  publisher: "LiveStore",
  notes: "Product site for the subject's LiveStore project; credits him as creator.",
});
const localfirstFm = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "#1 – PVH: An Intro to Local-First — localfirst.fm",
  url: "https://www.localfirst.fm/1",
  publisher: "localfirst.fm",
  publishedAt: "2024-01-14",
  notes: "First episode of the subject's own local-first podcast.",
});
const prismaSeed = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Prisma raises $4.5M to build the GraphQL data layer for all databases",
  url: "https://www.prisma.io/blog/prisma-raises-4-5m-to-build-the-graphql-data-layer-for-all-databases-663484df0f60",
  publisher: "Prisma",
  publishedAt: "2018-05-15",
  authors: ["Søren Bramer Schmidt", "Johannes Schickling"],
  notes: "Company announcement co-authored by the subject.",
});
const expoPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Local-first application development with LiveStore",
  url: "https://expo.dev/blog/local-first-application-development-with-livestore",
  publisher: "Expo",
  publishedAt: "2024-11-21",
  authors: ["Johannes Schickling"],
  notes: "Guest post written by the subject announcing LiveStore early access.",
});
const graphcoolFarewell = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Thank You for Using Graphcool",
  url: "https://www.graph.cool/",
  publisher: "Graphcool / Prisma",
  notes:
    "The company's official farewell page: launch and sunset dates, usage stats, and the GraphQL Europe/Conf history.",
});
const splashPlf = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Local-First in Practice: Learnings of building a high-performance, local-first music app (PLF 2023)",
  url: "https://2023.splashcon.org/details/plf-2023-papers/9/Local-First-in-Practice-Learnings-of-building-a-high-performance-local-first-music-",
  publisher: "SPLASH 2023",
  publishedAt: "2023-10-24",
  authors: ["Johannes Schickling"],
  notes: "Conference program entry for his Overtone talk in Cascais, Portugal.",
});
const localFirstConf = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Local-First Conf 2024",
  url: "https://www.localfirstconf.com/local-first-conf-2024",
  publisher: "Local-First Conf",
  publishedAt: "2024",
  notes: "Lists him on the organizing team and as a speaker.",
});
const effectSpeaker = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Johannes Schickling — Effect Days",
  url: "https://effect.website/events/effect-days/speakers/johannes-schickling",
  publisher: "Effect",
  notes:
    "Speaker bio: developer experience at Effectful Technologies; hosts the Cause & Effect podcast.",
});
const riffleUpdate = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Riffle project has concluded",
  url: "https://riffle.systems/essays/2024-update/",
  publisher: "Riffle",
  publishedAt: "2024",
  notes:
    "Riffle research project's own update noting its ideas carried forward into his LiveStore work.",
});
const jamstack13 = source({
  binding: "interview",
  mediaType: "audio",
  title: "Ep. #13, Staying Cool With Graphcool",
  url: "https://www.heavybit.com/library/podcasts/jamstack-radio/ep-13-staying-cool-with-graphcool",
  publisher: "JAMstack Radio (Heavybit)",
  publishedAt: "2017-05-11",
  authors: ["Brian Douglas"],
  notes: "Includes the Optonaut sale and the Graphcool origin story.",
});
const jamstack25 = source({
  binding: "interview",
  mediaType: "audio",
  title: "Ep. #25, Adopting GraphQL with Graphcool",
  url: "https://www.heavybit.com/library/podcasts/jamstack-radio/ep-25-adopting-graphql-with-graphcool",
  publisher: "JAMstack Radio (Heavybit)",
  publishedAt: "2017",
  authors: ["Brian Douglas"],
  notes:
    "With co-founder Søren Bramer Schmidt; covers the GraphQL working group and his KIT computer-science background.",
});
const changelog297 = source({
  binding: "interview",
  mediaType: "audio",
  title: "Prisma and the GraphQL data layer (Changelog Interviews #297)",
  url: "https://changelog.com/podcast/297",
  publisher: "Changelog",
  publishedAt: "2018-05-16",
  authors: ["Adam Stacoviak", "Jerod Santo"],
});
const jsparty297 = source({
  binding: "interview",
  mediaType: "audio",
  title: "Use Effect (not useEffect) (JS Party #297)",
  url: "https://changelog.com/jsparty/297",
  publisher: "Changelog",
  publishedAt: "2023-10-19",
  authors: ["Jerod Santo", "Nick Nisi"],
  notes: "Episode page misspells his surname as 'Schlickling'.",
});
const infoqPodcast = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Rethinking Data: Moving from the Traditional Three-Tier Web Stack to Client-Side Event Sourcing",
  url: "https://www.infoq.com/podcasts/rethinking-data-client-event-sourcing/",
  publisher: "InfoQ",
  publishedAt: "2026-07-27",
  authors: ["Olimpiu Pop"],
});
const tc2018 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Prisma raises $4.5M seed round led by Kleiner Perkins",
  url: "https://techcrunch.com/2018/05/15/prisma/",
  publisher: "TechCrunch",
  publishedAt: "2018-05-15",
});
const techeu2020 = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "German-American startup Prisma lands $12 million Series A to transform how developers work with databases",
  url: "https://tech.eu/2020/07/06/prisma-series-a/",
  publisher: "tech.eu",
  publishedAt: "2020-07-06",
});
const tc2022 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Prisma nabs $40M for open source platform for database languages",
  url: "https://techcrunch.com/2022/05/03/prisma-raises-40m-for-its/",
  publisher: "TechCrunch",
  publishedAt: "2022-05-03",
});

const linkedinBeta = source({
  binding: "subject_controlled",
  mediaType: "article",
  title:
    "After 4 years of work, I'm incredibly excited to introduce LiveStore — now open-source and officially in beta",
  url: "https://www.linkedin.com/posts/schickling_after-4-years-of-work-im-incredibly-excited-activity-7333161546111516673-DKKx",
  publisher: "LinkedIn",
  publishedAt: "2025-05-27",
  notes:
    "His own announcement taking LiveStore public: open source, in beta, with the built-in sync engine.",
});

const S = {
  site: site.id,
  siteProjects: siteProjects.id,
  linkedin: linkedin.id,
  linkedinBeta: linkedinBeta.id,
  livestoreSite: livestoreSite.id,
  localfirstFm: localfirstFm.id,
  prismaSeed: prismaSeed.id,
  expoPost: expoPost.id,
  graphcoolFarewell: graphcoolFarewell.id,
  splashPlf: splashPlf.id,
  localFirstConf: localFirstConf.id,
  effectSpeaker: effectSpeaker.id,
  riffleUpdate: riffleUpdate.id,
  jamstack13: jamstack13.id,
  jamstack25: jamstack25.id,
  changelog297: changelog297.id,
  jsparty297: jsparty297.id,
  infoqPodcast: infoqPodcast.id,
  tc2018: tc2018.id,
  techeu2020: techeu2020.id,
  tc2022: tc2022.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-johannes-schickling",
  generatedAt: "2026-09-25T21:46:59Z",
  subject: {
    kind: "person",
    handle: "johannes-schickling",
    displayName: "Johannes Schickling",
    alsoKnownAs: ["schickling"],
    summary:
      "German software engineer and entrepreneur in Berlin. Co-founded Graphcool/Prisma (CEO until 2020), then went all-in on local-first: building the Overtone music app, creating the LiveStore sync engine, hosting the localfirst.fm and Cause & Effect podcasts, and co-organizing Local-First Conf.",
    identity: {
      officialSite: "https://www.schickling.dev/",
      profiles: [
        "https://github.com/schickling",
        "https://www.x.com/schickling",
        "https://bsky.app/profile/schickling.dev",
        "https://mas.to/@schickling",
        "https://www.linkedin.com/in/schickling",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:46:59Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    site,
    siteProjects,
    linkedin,
    linkedinBeta,
    livestoreSite,
    localfirstFm,
    prismaSeed,
    expoPost,
    graphcoolFarewell,
    splashPlf,
    localFirstConf,
    effectSpeaker,
    riffleUpdate,
    jamstack13,
    jamstack25,
    changelog297,
    jsparty297,
    infoqPodcast,
    tc2018,
    techeu2020,
    tc2022,
  ],
  claims: [
    {
      id: "claim-german-builder",
      kind: "fact",
      text: "Johannes Schickling is a German software engineer and entrepreneur based in Berlin who describes himself as a 'builder, speaker and music fan.'",
      sourceIds: [S.site, S.infoqPodcast, S.jamstack25],
    },
    {
      id: "claim-sub2home",
      kind: "fact",
      text: "His first company was sub2home, a German startup for which he was co-founder and CTO; his LinkedIn dates the role from June 2010 to October 2014.",
      sourceIds: [S.linkedin],
    },
    {
      id: "claim-kit",
      kind: "fact",
      text: "He studied computer science at the Karlsruhe Institute of Technology (KIT), per his JAMstack Radio guest bio.",
      sourceIds: [S.jamstack25],
    },
    {
      id: "claim-optonaut",
      kind: "fact",
      text: "From 2014 to 2016 he co-founded Optonaut, a smartphone app for recording and sharing stereoscopic 360° VR videos — described in interviews as 'an Instagram for VR' — which was sold before he started Graphcool.",
      sourceIds: [S.site, S.jamstack13, S.jamstack25],
    },
    {
      id: "claim-ef5",
      kind: "fact",
      text: "He was a member of Entrepreneur First's EF5 cohort in London from September 2015 to February 2016.",
      sourceIds: [S.linkedin],
    },
    {
      id: "claim-graphcool-origin",
      kind: "fact",
      text: "After selling Optonaut he prototyped a GraphQL backend-as-a-service 'in a couple of days'; a friend he showed it to flew to London, became his co-founder Søren Bramer Schmidt, and they iterated on the prototype there.",
      sourceIds: [S.jamstack13, S.prismaSeed],
    },
    {
      id: "claim-graphcool-launch",
      kind: "fact",
      text: "Graphcool, an open-source GraphQL backend-as-a-service, went live in March 2016; it grew to more than 59,000 users creating 234,000 projects — including developers at Twitter, Airbnb, Netlify, and Auth0 — before being sunset on July 1, 2020.",
      sourceIds: [S.graphcoolFarewell],
    },
    {
      id: "claim-angel-round",
      kind: "fact",
      text: "He told JAMstack Radio in May 2017 that Graphcool had raised a small investment round the previous December from angels including Heroku's founder.",
      sourceIds: [S.jamstack13],
    },
    {
      id: "claim-prisma-pivot",
      kind: "fact",
      text: "The company pivoted from the hosted backend service to open-source infrastructure: Prisma 1.0 — originally Graphcool's query engine — shipped in January 2018 as a standalone component under the Apache 2.0 license.",
      sourceIds: [S.prismaSeed, S.tc2018],
    },
    {
      id: "claim-rebrand-seed",
      kind: "fact",
      text: "In May 2018 the company rebranded from Graphcool to Prisma and announced a $4.5 million seed round led by Kleiner Perkins.",
      sourceIds: [S.tc2018, S.prismaSeed],
    },
    {
      id: "claim-ceo-tenure",
      kind: "fact",
      text: "He was Prisma's co-founder and CEO from 2016 until mid-2020 and remains an active board member.",
      sourceIds: [S.site, S.linkedin],
    },
    {
      id: "claim-series-a",
      kind: "fact",
      text: "Prisma raised a $12 million Series A led by Amplify Partners, announced in July 2020.",
      sourceIds: [S.techeu2020],
    },
    {
      id: "claim-series-b",
      kind: "fact",
      text: "In May 2022 Prisma announced a $40 million round led by Altimeter with Amplify Partners and Kleiner Perkins participating, plus angels including founders of Vercel, PlanetScale, GitHub, and Sourcegraph — bringing reported total funding to roughly $56.5 million.",
      sourceIds: [S.tc2022, S.tc2018, S.techeu2020],
    },
    {
      id: "claim-graphql-conf",
      kind: "fact",
      text: "The Graphcool/Prisma team hosted Europe's first GraphQL conference: GraphQL Europe 2017 drew about 300 attendees, the 2018 edition about 500, and the 2019 rebrand to GraphQL Conf brought more than 800 to Berlin.",
      sourceIds: [S.graphcoolFarewell, S.changelog297],
    },
    {
      id: "claim-graphql-wg",
      kind: "fact",
      text: "He was involved in pushing for a GraphQL working group — an open-governance effort sketched at GraphQL Europe and modeled on TC39-style stewardship of the spec.",
      sourceIds: [S.jamstack25],
    },
    {
      id: "claim-prisma-scale",
      kind: "fact",
      text: "His own site describes Prisma as a database toolkit to query, migrate, and model data, 'used by more than 200,000 developers' — a self-reported, dated figure.",
      sourceIds: [S.site],
    },
    {
      id: "claim-overtone",
      kind: "fact",
      text: "Since roughly 2020–2021 he has been building Overtone, a local-first music app that unifies a listener's library across streaming services (Spotify, YouTube, Bandcamp, Dropbox) and personal collections.",
      sourceIds: [S.site, S.splashPlf, S.infoqPodcast, S.expoPost],
    },
    {
      id: "claim-dj-background",
      kind: "fact",
      text: "He has described himself as a former DJ and framed Overtone as recovering the sense of 'my music collection' that streaming eroded.",
      sourceIds: [S.infoqPodcast],
    },
    {
      id: "claim-livestore",
      kind: "fact",
      text: "He created LiveStore, an open-source local-first data layer: a reactive embedded SQLite database with a git-inspired, event-sourcing sync engine, targeting web, mobile, server/edge, and desktop.",
      sourceIds: [S.livestoreSite, S.expoPost, S.riffleUpdate],
    },
    {
      id: "claim-livestore-early-access",
      kind: "fact",
      text: "LiveStore opened early access in November 2024 — first to GitHub sponsors and Expo EAS subscribers — after about three years of development; he wrote at the time that it was 'not yet ready for production.'",
      sourceIds: [S.expoPost],
    },
    {
      id: "claim-riffle",
      kind: "fact",
      text: "From 2021 to 2023 he was part of Riffle, a research project exploring database-driven client-side state management that he presented at App.js Conf 2023; Riffle later concluded, its ideas carried forward into LiveStore.",
      sourceIds: [S.siteProjects, S.riffleUpdate, S.expoPost],
    },
    {
      id: "claim-localfirst-fm",
      kind: "fact",
      text: "Since January 2024 he has hosted localfirst.fm, a podcast about local-first software development whose first episode featured Ink & Switch's Peter van Hardenberg.",
      sourceIds: [S.localfirstFm, S.site],
    },
    {
      id: "claim-local-first-conf",
      kind: "fact",
      text: "He co-organized Local-First Conf 2024 (May 30–31 in Berlin) — where he also spoke on building a local-first music app — after organizing a roughly 60-person local-first meetup in Berlin in 2023.",
      sourceIds: [S.localFirstConf],
    },
    {
      id: "claim-cause-effect",
      kind: "fact",
      text: "He hosts Cause & Effect, the Effect ecosystem's official podcast, and works on developer experience at Effectful Technologies.",
      sourceIds: [S.effectSpeaker],
    },
    {
      id: "claim-effect-days",
      kind: "fact",
      text: "He was announced as the MC of Effect Days 2025 and gave the talk 'Effect: Production-grade TypeScript' at Effect Days 2024.",
      sourceIds: [S.effectSpeaker, S.site],
    },
    {
      id: "claim-contentlayer",
      kind: "fact",
      text: "He created Contentlayer (2021–2023), a content SDK that validates and transforms content into type-safe JSON data importable into applications.",
      sourceIds: [S.siteProjects],
    },
    {
      id: "claim-oss-tools",
      kind: "fact",
      text: "His earlier open-source tools include GraphQL Playground (an interactive GraphQL IDE, 2018–2020) and Chromeless (2017 headless-Chrome automation, predating Puppeteer and Playwright).",
      sourceIds: [S.siteProjects],
    },
    {
      id: "claim-sb-all-in-local-first",
      kind: "stated_belief",
      text: "He says he went 'all in on local-first' in 2020, crediting the Ink & Switch essay and its authors as the catalyst — a shift of the data bottleneck from server to client for responsiveness and user ownership.",
      sourceIds: [S.infoqPodcast],
    },
    {
      id: "claim-sb-effect-stdlib",
      kind: "stated_belief",
      text: "He describes Effect as 'a standard library that the web never really had' — shared primitives for error handling, concurrency, serialization, and transactional state wherever JavaScript runs.",
      sourceIds: [S.jsparty297],
    },
    {
      id: "claim-sb-event-sourcing",
      kind: "stated_belief",
      text: "He chose event sourcing over CRDTs for his data layer partly because of what he calls migration 'technological trauma' from the Prisma era, valuing an ordered event history as the source of truth.",
      sourceIds: [S.infoqPodcast, S.livestoreSite],
    },
    {
      id: "claim-sb-bottom-up",
      kind: "stated_belief",
      text: "He holds that serious developer tools are adopted bottom-up by practitioners, which is why Prisma deliberately raised from West Coast investors who 'really understand open source.'",
      sourceIds: [S.tc2018],
    },
    {
      id: "claim-sb-client-layer",
      kind: "stated_belief",
      text: "He argues a better client layer over wherever music lives can fundamentally improve the listening experience — the way third-party clients like Superhuman sit on top of Gmail.",
      sourceIds: [S.infoqPodcast],
    },
    {
      id: "claim-pat-tool-frustration",
      kind: "pattern",
      text: "A pattern he names himself: he sets out to build something, gets frustrated with the available tools, and ends up building the tooling instead — database tooling with Prisma, then LiveStore underneath Overtone.",
      sourceIds: [S.infoqPodcast, S.jamstack13],
    },
    {
      id: "claim-pat-community-infra",
      kind: "pattern",
      text: "He repeatedly pairs products with community infrastructure — GraphQL Europe/Conf and GraphQL Playground around Prisma; localfirst.fm and Local-First Conf around Overtone and LiveStore.",
      sourceIds: [S.graphcoolFarewell, S.localFirstConf, S.localfirstFm, S.siteProjects],
    },
    {
      id: "claim-pat-open-source",
      kind: "pattern",
      text: "His major tools ship as open source — Apache-2.0 Prisma, open-source LiveStore, Contentlayer, GraphQL Playground — treating open source as the adoption engine rather than the product itself.",
      sourceIds: [S.prismaSeed, S.riffleUpdate, S.siteProjects],
    },
    {
      id: "claim-spec-overtone-release",
      kind: "speculation",
      text: "Overtone's public release status is not settled in the record: it is described as in development, with no announced general-availability date.",
      sourceIds: [S.site, S.splashPlf],
    },
    {
      id: "claim-spec-ceo-transition",
      kind: "speculation",
      text: "The reasons and exact circumstances of his 2020 CEO transition are not detailed in public sources; profiles record the change without explanation.",
      sourceIds: [S.site, S.linkedin],
    },
    {
      id: "claim-spec-studio-model",
      kind: "speculation",
      text: "Whether LiveStore and Overtone will take venture funding or a different structure under his 'Overengineering Studio' umbrella is not settled in the record.",
      sourceIds: [S.site, S.linkedin],
    },
  ],
  timeline: [
    {
      id: "event-sub2home",
      kind: "founded",
      date: "2010",
      end: "2014",
      title: "Co-founded sub2home as CTO",
      summary:
        "His first startup, a German company he co-founded and served as CTO; dates per his LinkedIn.",
      location: "Germany",
      sourceIds: [S.linkedin],
    },
    {
      id: "event-optonaut",
      kind: "founded",
      date: "2014",
      end: "2016",
      title: "Co-founded Optonaut",
      summary:
        "Smartphone VR app for stereoscopic 360° videos — 'an Instagram for VR'; sold before Graphcool.",
      sourceIds: [S.site, S.jamstack13],
    },
    {
      id: "event-ef5",
      kind: "education",
      date: "2015-09",
      end: "2016-02",
      title: "Entrepreneur First EF5 cohort",
      summary: "Joined the fifth Entrepreneur First cohort in London.",
      organization: "Entrepreneur First",
      location: "London, United Kingdom",
      organizationHandle: "entrepreneur-first",
      sourceIds: [S.linkedin],
    },
    {
      id: "event-graphcool-live",
      kind: "founded",
      date: "2016-03",
      title: "Graphcool goes live",
      summary:
        "Open-source GraphQL backend-as-a-service co-founded with Søren Bramer Schmidt in Berlin.",
      organization: "Graphcool",
      location: "Berlin, Germany",
      organizationHandle: "graphcool",
      sourceIds: [S.graphcoolFarewell, S.jamstack13],
    },
    {
      id: "event-graphql-confs",
      kind: "milestone",
      date: "2017",
      end: "2019",
      title: "GraphQL Europe / GraphQL Conf conferences",
      summary:
        "His company hosted Europe's first GraphQL conference: GraphQL Europe 2017 (~300 attendees) and 2018 (~500), rebranded GraphQL Conf in 2019 (800+) in Berlin.",
      location: "Berlin, Germany",
      sourceIds: [S.graphcoolFarewell, S.changelog297],
    },
    {
      id: "event-prisma-10",
      kind: "milestone",
      date: "2018-01",
      title: "Prisma 1.0 released as open source",
      summary:
        "Graphcool's query engine shipped standalone under the Apache 2.0 license — the start of the pivot from hosted BaaS to infrastructure.",
      sourceIds: [S.prismaSeed],
    },
    {
      id: "event-rebrand-seed",
      kind: "milestone",
      date: "2018-05-15",
      title: "Graphcool rebrands to Prisma; $4.5M seed",
      summary:
        "Announced the Kleiner Perkins-led seed round alongside the new name and a planned San Francisco office.",
      sourceIds: [S.tc2018, S.prismaSeed],
    },
    {
      id: "event-ceo-step-down",
      kind: "role",
      date: "2020-06",
      title: "Steps down as Prisma CEO",
      summary:
        "Ended his run as chief executive after about four years; remains an active board member.",
      organization: "Prisma",
      organizationHandle: "prisma",
      sourceIds: [S.site, S.linkedin],
    },
    {
      id: "event-graphcool-sunset",
      kind: "milestone",
      date: "2020-07-01",
      title: "Graphcool service sunset",
      summary:
        "The original BaaS shut down after four-plus years: 59,000+ users and 234,000 projects over its life.",
      sourceIds: [S.graphcoolFarewell],
    },
    {
      id: "event-series-a",
      kind: "milestone",
      date: "2020-07-06",
      title: "Prisma raises $12M Series A",
      summary: "Amplify Partners led the round announced days after the Graphcool sunset.",
      organization: "Prisma",
      organizationHandle: "prisma",
      sourceIds: [S.techeu2020],
    },
    {
      id: "event-overtone-start",
      kind: "project",
      date: "2021",
      title: "Begins building Overtone",
      summary:
        "Started the local-first music app after going 'all in on local-first' in 2020; his site dates the work from 2021.",
      sourceIds: [S.site, S.infoqPodcast, S.splashPlf],
    },
    {
      id: "event-localfirstfm-launch",
      kind: "project",
      date: "2024-01-14",
      title: "Launches localfirst.fm podcast",
      summary:
        "Episode one featured Peter van Hardenberg of Ink & Switch on an introduction to local-first.",
      sourceIds: [S.localfirstFm],
    },
    {
      id: "event-local-first-conf-2024",
      kind: "other",
      date: "2024-05-30",
      end: "2024-05-31",
      title: "Co-organizes Local-First Conf 2024",
      summary:
        "Two-day Berlin conference (talks plus expo day) at Schankhalle Pfefferberg; he also spoke on building a local-first music app.",
      location: "Berlin, Germany",
      sourceIds: [S.localFirstConf],
    },
    {
      id: "event-livestore-early-access",
      kind: "milestone",
      date: "2024-11-21",
      title: "LiveStore opens early access",
      summary:
        "Announced via an Expo guest post after roughly three years of development, carrying forward ideas from the concluded Riffle research project.",
      sourceIds: [S.expoPost, S.riffleUpdate],
    },
    {
      id: "event-livestore-beta",
      kind: "milestone",
      date: "2025-05-27",
      title: "LiveStore goes open-source beta",
      summary:
        "Four years in: the reactive SQLite + event-sourced sync engine ships publicly as the data layer for Overtone and others.",
      sourceIds: [S.linkedinBeta],
    },
  ],
  themes: [
    {
      id: "theme-local-first",
      kind: "philosophy",
      status: "stated",
      title: "Local-first as the post-Prisma throughline",
      summary:
        "After a decade of server-side database tooling he went 'all in' on local-first in 2020: data lives on the device, syncs via event sourcing, and keeps working offline. Overtone, LiveStore, localfirst.fm, and Local-First Conf all express the same conviction.",
      sourceIds: [S.infoqPodcast, S.site, S.localfirstFm, S.localFirstConf],
    },
    {
      id: "theme-data-ownership",
      kind: "belief",
      status: "stated",
      title: "Data ownership and the personal collection",
      summary:
        "Streaming traded ownership for convenience; he wants software that restores 'my music collection' while keeping the services. Local-first, for him, is as much about who holds the data as about speed.",
      sourceIds: [S.infoqPodcast, S.site, S.expoPost],
    },
    {
      id: "theme-event-sourcing",
      kind: "method",
      status: "stated",
      title: "Event sourcing over CRDTs",
      summary:
        "LiveStore syncs an ordered event log — git-inspired push/pull with rebasing — rather than CRDT state merges. He cites migration 'trauma' from Prisma and values the auditability of a canonical history.",
      sourceIds: [S.livestoreSite, S.infoqPodcast],
    },
    {
      id: "theme-effect-ecosystem",
      kind: "influence",
      status: "stated",
      title: "Effect as the missing standard library",
      summary:
        "He is one of Effect's most visible advocates: DX work at Effectful Technologies, hosting the Cause & Effect podcast, MCing Effect Days 2025, and describing Effect as the standard library the web never had.",
      sourceIds: [S.effectSpeaker, S.jsparty297],
    },
    {
      id: "theme-developer-experience",
      kind: "practice",
      status: "stated",
      title: "Developer experience as craft",
      summary:
        "From Prisma's generated client to Contentlayer to LiveStore's devtools, his work targets the ergonomics of building: type-safe APIs, live inspection, and tooling that removes friction rather than adding abstraction.",
      sourceIds: [S.site, S.siteProjects, S.livestoreSite],
    },
    {
      id: "theme-community-building",
      kind: "practice",
      status: "reported",
      title: "Products paired with community infrastructure",
      summary:
        "GraphQL Europe became GraphQL Conf under his company; a Berlin meetup became Local-First Conf; two podcasts document the ecosystems he builds in. He treats community as part of the product.",
      sourceIds: [S.graphcoolFarewell, S.localFirstConf, S.localfirstFm],
    },
    {
      id: "theme-open-source-adoption",
      kind: "method",
      status: "reported",
      title: "Open source as the adoption engine",
      summary:
        "Graphcool open-sourced its platform in 2017, Prisma 1.0 shipped Apache-2.0, and LiveStore is open source — distribution through code developers can read, fork, and trust.",
      sourceIds: [S.prismaSeed, S.jamstack25, S.riffleUpdate],
    },
    {
      id: "theme-music",
      kind: "interest",
      status: "stated",
      title: "Music as the test bed",
      summary:
        "A former DJ, he calls music a long-held passion and built Overtone around it — the app is both a product and the forcing function for LiveStore's engineering.",
      sourceIds: [S.infoqPodcast, S.site, S.splashPlf],
    },
    {
      id: "theme-type-safety",
      kind: "method",
      status: "inferred",
      title: "Type safety end to end",
      summary:
        "A consistent thread across Prisma's generated client, Contentlayer's typed content, and his Effect advocacy: push correctness into the type system so whole classes of bugs disappear.",
      sourceIds: [S.siteProjects, S.jsparty297, S.tc2018],
    },
  ],
  works: [
    {
      id: "work-sub2home",
      kind: "product",
      status: "completed",
      title: "sub2home",
      date: "2010",
      summary:
        "His first company — a German startup he co-founded and served as CTO through 2014.",
      sourceIds: [S.linkedin],
    },
    {
      id: "work-optonaut",
      kind: "product",
      status: "completed",
      title: "Optonaut",
      date: "2014",
      summary:
        "Smartphone VR app for stereoscopic 360° video; sold before he started Graphcool.",
      sourceIds: [S.site, S.jamstack13],
    },
    {
      id: "work-graphcool",
      kind: "product",
      status: "abandoned",
      title: "Graphcool",
      date: "2016",
      summary:
        "Open-source GraphQL backend-as-a-service; ran March 2016 until its July 1, 2020 sunset with 59,000+ users.",
      sourceIds: [S.graphcoolFarewell, S.tc2018],
    },
    {
      id: "work-prisma",
      kind: "product",
      status: "ongoing",
      title: "Prisma",
      date: "2018",
      summary:
        "The open-source database toolkit the company pivoted to; he co-founded it, was CEO until 2020, and remains a board member.",
      sourceIds: [S.prismaSeed, S.tc2022, S.site],
    },
    {
      id: "work-chromeless",
      kind: "project",
      status: "completed",
      title: "Chromeless",
      date: "2017",
      summary:
        "Headless-Chrome automation tooling released before Puppeteer and Playwright existed.",
      sourceIds: [S.siteProjects],
    },
    {
      id: "work-graphql-playground",
      kind: "project",
      status: "completed",
      title: "GraphQL Playground",
      date: "2018",
      summary:
        "Interactive GraphQL IDE in the GraphiQL lineage, maintained roughly 2018–2020.",
      sourceIds: [S.siteProjects],
    },
    {
      id: "work-graphql-conf",
      kind: "other",
      status: "completed",
      title: "GraphQL Europe / GraphQL Conf",
      date: "2017",
      summary:
        "The Berlin conference series his company hosted: Europe's first GraphQL conference (2017), growing to 800+ attendees by 2019.",
      sourceIds: [S.graphcoolFarewell],
    },
    {
      id: "work-schemalayer",
      kind: "project",
      status: "completed",
      title: "Schemalayer",
      date: "2021",
      summary:
        "Schema-based data migrations using lenses — a re-implementation of Ink & Switch's Project Cambria.",
      sourceIds: [S.siteProjects],
    },
    {
      id: "work-contentlayer",
      kind: "project",
      status: "completed",
      title: "Contentlayer",
      date: "2021",
      summary:
        "Content SDK validating and transforming content into type-safe JSON; active 2021–2023 and widely adopted in the Next.js ecosystem.",
      sourceIds: [S.siteProjects],
    },
    {
      id: "work-riffle",
      kind: "project",
      status: "completed",
      title: "Riffle",
      date: "2021",
      summary:
        "Research project (2021–2023) on database-driven client-side state management, presented at App.js Conf 2023; ideas carried into LiveStore.",
      sourceIds: [S.siteProjects, S.riffleUpdate, S.expoPost],
    },
    {
      id: "work-overtone",
      kind: "product",
      status: "in_progress",
      title: "Overtone",
      date: "2021",
      summary:
        "Local-first music app unifying streaming services and personal collections — 'a home for your music.'",
      sourceIds: [S.site, S.splashPlf, S.infoqPodcast],
    },
    {
      id: "work-livestore",
      kind: "project",
      status: "ongoing",
      title: "LiveStore",
      date: "2023",
      summary:
        "Open-source local-first data layer: reactive embedded SQLite plus a git-inspired event-sourcing sync engine; early access opened November 2024.",
      sourceIds: [S.livestoreSite, S.expoPost, S.siteProjects],
    },
    {
      id: "work-localfirst-fm",
      kind: "recording",
      status: "ongoing",
      title: "localfirst.fm",
      date: "2024",
      summary:
        "His podcast on local-first software development, launched January 2024.",
      sourceIds: [S.localfirstFm, S.site],
    },
    {
      id: "work-cause-effect",
      kind: "recording",
      status: "ongoing",
      title: "Cause & Effect",
      summary:
        "The Effect ecosystem podcast he hosts — stories of engineers and companies running Effect in production.",
      sourceIds: [S.effectSpeaker],
    },
    {
      id: "work-local-first-conf",
      kind: "other",
      status: "ongoing",
      title: "Local-First Conf",
      date: "2024",
      summary:
        "Berlin conference he co-organizes; the 2024 edition ran two days of talks and an expo, with later editions following.",
      sourceIds: [S.localFirstConf],
    },
  ],
  appearances: [
    {
      id: "appearance-jamstack-13",
      title: "Staying Cool With Graphcool",
      venue: "JAMstack Radio (Heavybit), Ep. #13",
      publishedAt: "2017-05-11",
      participants: ["Johannes Schickling", "Eli Williamson", "Brian Douglas"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
        { name: "Eli Williamson", handle: "eli-williamson" },
        { name: "Brian Douglas", handle: "brian-douglas" },
      ],
      summary:
        "The Graphcool origin story: selling Optonaut, prototyping a GraphQL backend in days, and the co-founder who flew to London.",
      media: [
        {
          type: "audio",
          url: "https://www.heavybit.com/library/podcasts/jamstack-radio/ep-13-staying-cool-with-graphcool",
          sourceId: S.jamstack13,
        },
      ],
      sourceIds: [S.jamstack13],
    },
    {
      id: "appearance-jamstack-25",
      title: "Adopting GraphQL with Graphcool",
      venue: "JAMstack Radio (Heavybit), Ep. #25",
      publishedAt: "2017",
      participants: [
        "Johannes Schickling",
        "Søren Bramer Schmidt",
        "Brian Douglas",
      ],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
        { name: "Søren Bramer Schmidt", handle: "soren-bramer-schmidt" },
        { name: "Brian Douglas", handle: "brian-douglas" },
      ],
      summary:
        "The co-founders on open-sourcing Graphcool and the push for a TC39-style GraphQL working group.",
      media: [
        {
          type: "audio",
          url: "https://www.heavybit.com/library/podcasts/jamstack-radio/ep-25-adopting-graphql-with-graphcool",
          sourceId: S.jamstack25,
        },
      ],
      sourceIds: [S.jamstack25],
    },
    {
      id: "appearance-changelog-297",
      title: "Prisma and the GraphQL data layer",
      venue: "Changelog Interviews #297",
      publishedAt: "2018-05-16",
      participants: ["Johannes Schickling", "Adam Stacoviak", "Jerod Santo"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
        { name: "Adam Stacoviak", handle: "adam-stacoviak" },
        { name: "Jerod Santo", handle: "jerod-santo" },
      ],
      summary:
        "On the Graphcool-to-Prisma pivot, the GraphQL data layer, open source vs. enterprise, and GraphQL Europe 2018.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/podcast/297",
          sourceId: S.changelog297,
        },
      ],
      sourceIds: [S.changelog297],
    },
    {
      id: "appearance-riffle-talk",
      title: "Local-first state management with Riffle",
      venue: "App.js Conf",
      publishedAt: "2023-05",
      participants: ["Johannes Schickling"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
      ],
      summary:
        "Presented the Riffle research project on reactive, SQLite-driven client state — the work that led to LiveStore.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=qHSI5rxTp_Q",
        },
      ],
      sourceIds: [S.site, S.expoPost],
    },
    {
      id: "appearance-jsparty-297",
      title: "Use Effect (not useEffect)",
      venue: "JS Party #297",
      publishedAt: "2023-10-19",
      participants: ["Johannes Schickling", "Jerod Santo", "Nick Nisi"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
        { name: "Jerod Santo", handle: "jerod-santo" },
        { name: "Nick Nisi", handle: "nick-nisi" },
      ],
      summary:
        "An introduction to Effect for building robust TypeScript apps — error handling, concurrency, and incremental adoption.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/jsparty/297",
          sourceId: S.jsparty297,
        },
      ],
      sourceIds: [S.jsparty297],
    },
    {
      id: "appearance-plf-2023",
      title:
        "Local-First in Practice: Learnings of building a high-performance, local-first music app",
      venue: "PLF 2023 at SPLASH, Cascais",
      publishedAt: "2023-10-24",
      participants: ["Johannes Schickling"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
      ],
      summary:
        "Conference talk on two years of building Overtone: third-party API integration, 60 FPS web performance, and embedded devtools.",
      sourceIds: [S.splashPlf],
    },
    {
      id: "appearance-effect-days-2024",
      title: "Effect: Production-grade TypeScript",
      venue: "Effect Days 2024, Vienna",
      publishedAt: "2024-02",
      participants: ["Johannes Schickling"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
      ],
      summary: "His case for Effect as production-grade TypeScript tooling.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=PxIBWjiv3og",
        },
      ],
      sourceIds: [S.site, S.effectSpeaker],
    },
    {
      id: "appearance-lfc-2024",
      title: "The why and how of building a local-first music app",
      venue: "Local-First Conf 2024, Berlin",
      publishedAt: "2024-05-30",
      participants: ["Johannes Schickling"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
      ],
      summary:
        "His talk at the conference he co-organized: audiophile data ownership reconciled with provider APIs like Spotify's.",
      sourceIds: [S.localFirstConf],
    },
    {
      id: "appearance-viteconf-2025",
      title: "Native-Grade Web Apps with Local-First Data",
      venue: "ViteConf 2025",
      publishedAt: "2025-10",
      participants: ["Johannes Schickling"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
      ],
      summary:
        "On reaching native-app quality in the browser with local-first data architecture.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=h5Bs0vEka5U",
        },
      ],
      sourceIds: [S.site],
    },
    {
      id: "appearance-infoq-2026",
      title:
        "Rethinking Data: Moving from the Traditional Three-Tier Web Stack to Client-Side Event Sourcing",
      venue: "InfoQ Podcast",
      publishedAt: "2026-07-27",
      participants: ["Johannes Schickling", "Olimpiu Pop"],
      participantHandles: [
        { name: "Johannes Schickling", handle: "johannes-schickling" },
        { name: "Olimpiu Pop", handle: "olimpiu-pop" },
      ],
      summary:
        "A long interview on leaving the three-tier stack behind: event sourcing vs. CRDTs, Overtone, LiveStore, and data ownership.",
      media: [
        {
          type: "audio",
          url: "https://www.infoq.com/podcasts/rethinking-data-client-event-sourcing/",
          sourceId: S.infoqPodcast,
        },
      ],
      sourceIds: [S.infoqPodcast],
    },
  ],
  relations: [
    {
      id: "rel-sub2home",
      kind: "founded",
      target: "sub2home",
      targetName: "sub2home",
      targetKind: "organization",
      note: "His first company — a German startup he co-founded and served as CTO, dated June 2010 to October 2014 on his LinkedIn.",
      start: "2010-06",
      end: "2014-10",
      sourceIds: [S.linkedin],
    },
    {
      id: "rel-optonaut",
      kind: "founded",
      target: "optonaut",
      targetName: "Optonaut",
      targetKind: "organization",
      note: "Co-founded the stereoscopic 360° VR video app — 'an Instagram for VR' — from 2014 to 2016; it was sold before he started Graphcool.",
      start: "2014",
      end: "2016",
      sourceIds: [S.site, S.jamstack13, S.jamstack25],
    },
    {
      id: "rel-graphcool",
      kind: "founded",
      target: "graphcool",
      targetName: "Graphcool",
      targetKind: "organization",
      note: "Co-founded the open-source GraphQL backend-as-a-service that went live in March 2016 and sunset on July 1, 2020; the company behind it rebranded to Prisma.",
      start: "2016-03",
      end: "2020-07-01",
      sourceIds: [S.graphcoolFarewell, S.jamstack13],
    },
    {
      id: "rel-prisma",
      kind: "founded",
      target: "prisma",
      targetName: "Prisma",
      targetKind: "organization",
      note: "Co-founder and CEO from the 2016 Graphcool days through the May 2018 rebrand until mid-2020; remains an active board member.",
      start: "2016",
      targetWikidataId: "Q56098126",
      sourceIds: [S.prismaSeed, S.tc2018, S.site, S.linkedin],
    },
    {
      id: "rel-soren-bramer-schmidt",
      kind: "cofounder",
      target: "soren-bramer-schmidt",
      targetName: "Søren Bramer Schmidt",
      note: "The friend who flew to London to see his GraphQL backend prototype and became his Graphcool/Prisma co-founder.",
      sourceIds: [S.jamstack13, S.prismaSeed, S.jamstack25],
    },
    {
      id: "rel-entrepreneur-first",
      kind: "member_of",
      target: "entrepreneur-first",
      targetName: "Entrepreneur First",
      targetKind: "organization",
      note: "Member of the EF5 cohort in London, September 2015 to February 2016 — where the Graphcool prototype was shown to his future co-founder.",
      start: "2015-09",
      end: "2016-02",
      targetWikidataId: "Q21592473",
      sourceIds: [S.linkedin],
    },
    {
      id: "rel-riffle",
      kind: "member_of",
      target: "riffle",
      targetName: "Riffle",
      targetKind: "organization",
      note: "Part of the 2021–2023 research project on database-driven client-side state management; its ideas carried forward into LiveStore.",
      start: "2021",
      end: "2023",
      sourceIds: [S.siteProjects, S.riffleUpdate, S.expoPost],
    },
    {
      id: "rel-effectful-technologies",
      kind: "employed_by",
      target: "effectful-technologies",
      targetName: "Effectful Technologies",
      targetKind: "organization",
      note: "Works on developer experience there and hosts Cause & Effect, the Effect ecosystem's official podcast.",
      sourceIds: [S.effectSpeaker],
    },
    {
      id: "rel-overengineering-studio",
      kind: "founded",
      target: "overengineering-studio",
      targetName: "Overengineering Studio",
      targetKind: "organization",
      note: "The umbrella under which he now operates — consulting on R&D, devtools, and open-source incubation while his own projects consume most of his time.",
      sourceIds: [S.site, S.linkedin],
    },
    {
      id: "rel-local-first-conf",
      kind: "founded",
      target: "local-first-conf",
      targetName: "Local-First Conf",
      targetKind: "organization",
      note: "Co-organized the inaugural 2024 Berlin conference after running a roughly 60-person local-first meetup in 2023; also spoke there.",
      sourceIds: [S.localFirstConf],
    },
    {
      id: "rel-livestore",
      kind: "founded",
      target: "livestore",
      targetName: "LiveStore",
      note: "Created the open-source local-first data layer — a reactive embedded SQLite database with an event-sourcing sync engine — after roughly three years of development under Overtone.",
      sourceIds: [S.livestoreSite, S.expoPost, S.riffleUpdate],
    },
    {
      id: "rel-overtone",
      kind: "founded",
      target: "overtone",
      targetName: "Overtone",
      note: "Has been building the local-first music app since roughly 2020–2021, unifying streaming services and personal collections.",
      start: "2020",
      sourceIds: [S.site, S.splashPlf, S.infoqPodcast],
    },
    {
      id: "rel-ink-and-switch",
      kind: "influenced_by",
      target: "ink-and-switch",
      targetName: "Ink & Switch",
      targetKind: "organization",
      note: "He credits the lab's local-first essay and its authors as the catalyst for going 'all in on local-first' in 2020 — friendships that shaped everything after.",
      sourceIds: [S.infoqPodcast],
    },
    {
      id: "rel-peter-van-hardenberg",
      kind: "interviewed",
      target: "peter-van-hardenberg",
      targetName: "Peter van Hardenberg",
      note: "The Ink & Switch researcher was the first guest on his localfirst.fm podcast — episode 1, 'An Intro to Local-First,' January 2024.",
      sourceIds: [S.localfirstFm],
    },
    {
      id: "rel-brian-douglas",
      kind: "interviewed_by",
      target: "brian-douglas",
      targetName: "Brian Douglas",
      note: "JAMstack Radio episodes 13 ('Staying Cool With Graphcool') and 25 ('Adopting GraphQL with Graphcool'), both 2017.",
      sourceIds: [S.jamstack13, S.jamstack25],
    },
    {
      id: "rel-adam-stacoviak",
      kind: "interviewed_by",
      target: "adam-stacoviak",
      targetName: "Adam Stacoviak",
      note: "Changelog Interviews #297, 'Prisma and the GraphQL data layer,' May 2018.",
      sourceIds: [S.changelog297],
    },
    {
      id: "rel-jerod-santo",
      kind: "interviewed_by",
      target: "jerod-santo",
      targetName: "Jerod Santo",
      note: "Changelog Interviews #297 (May 2018) and JS Party #297, 'Use Effect (not useEffect)' (October 2023).",
      sourceIds: [S.changelog297, S.jsparty297],
    },
    {
      id: "rel-nick-nisi",
      kind: "interviewed_by",
      target: "nick-nisi",
      targetName: "Nick Nisi",
      note: "JS Party #297, 'Use Effect (not useEffect),' October 2023.",
      sourceIds: [S.jsparty297],
    },
    {
      id: "rel-olimpiu-pop",
      kind: "interviewed_by",
      target: "olimpiu-pop",
      targetName: "Olimpiu Pop",
      note: "InfoQ Podcast, 'Rethinking Data: Moving from the Traditional Three-Tier Web Stack to Client-Side Event Sourcing,' July 2026.",
      sourceIds: [S.infoqPodcast],
    },
  ],
  openQuestions: [
    "Basic biographical details — birth date, education timeline beyond 'studied computer science at KIT' — are thin in the public record and mostly self-reported.",
    "The reasons and exact circumstances of his 2020 transition out of the Prisma CEO role are not detailed in public sources.",
    "Overtone's start date differs between sources: he told InfoQ he began in 2020; his own site lists the project from 2021.",
    "sub2home's timeline differs across profiles — LinkedIn shows June 2010–October 2014 while other listings suggest a later start.",
    "LiveStore's path from private preview to general availability — and the long-term funding model behind Overengineering Studio — remains open.",
    "The terms and outcome of the Optonaut sale are not detailed publicly.",
  ],
  body: `Johannes Schickling is a Berlin-based software engineer who has spent two decades building the tools he wished existed — first for backend developers at Prisma, then for an entire emerging category of local-first software. His career splits cleanly in two: a venture-backed GraphQL infrastructure company he co-founded and led as CEO, and a deliberate second act as an independent builder, podcaster, and conference organizer working at the edge of client-side data. Today he operates under the Overengineering Studio banner, consulting on R&D, devtools, and open-source incubation while his own projects consume most of his time.

## From teenage founder to GraphQL pioneer

Schickling's first company was sub2home, a German startup he co-founded and served as CTO in the early 2010s — while, by most accounts, still in his teens. He studied computer science at the Karlsruhe Institute of Technology, then in 2014 co-founded Optonaut, a smartphone app for stereoscopic 360° VR video he described as "an Instagram for VR." After Optonaut was sold, he joined Entrepreneur First's fifth London cohort in late 2015. With a bucket list of technologies to explore — GraphQL on top — he prototyped a GraphQL backend-as-a-service in a matter of days, reasoning that Parse and Firebase were too rigid where GraphQL made the API layer flexible. A friend he showed it to, Søren Bramer Schmidt, flew to London and became his co-founder.

That prototype became Graphcool, which went live in March 2016: an open-source GraphQL backend combining a flexible permission layer with serverless functions. It caught the GraphQL wave early, raising an angel round that December backed by figures including Heroku's founder, and growing to more than 59,000 users who created 234,000 projects — developers at Twitter, Airbnb, Netlify, and Auth0 among them. But experienced customers kept pushing past what a hosted backend could offer, so the company pivoted: Graphcool's query engine shipped standalone as Prisma 1.0 under Apache 2.0 in January 2018, and that May the company renamed itself Prisma and announced a $4.5 million seed led by Kleiner Perkins — money deliberately raised, Schickling told TechCrunch, from West Coast investors who "really understand open source" and bottom-up developer adoption.

## Community as a product discipline

Prisma's rise coincided with ecosystem-building that Schickling treated as core work rather than marketing. His company hosted Europe's first GraphQL conference — GraphQL Europe 2017 drew about 300 people to Berlin, the 2018 edition about 500, and the 2019 rebrand to GraphQL Conf more than 800. He helped push for a TC39-style GraphQL working group, and his team maintained popular open tools including GraphQL Playground and, earlier, Chromeless — headless-Chrome automation released before Puppeteer existed.

He stepped down as CEO in mid-2020 — the record does not say why — remaining a board member while the company raised a $12 million Series A that July and a $40 million Altimeter-led round in 2022, roughly $56.5 million in reported total funding. The Graphcool service itself sunset on July 1, 2020, closing the BaaS chapter as Prisma continued as a pure open-source toolkit.

## The local-first turn

In 2020 Schickling went, in his words, "all in on local-first," crediting the Ink & Switch essay and its authors — friendships that would shape everything after. The vehicle was personal: a former DJ, he wanted to recover the feeling of "my music collection" that streaming had dissolved, and began building Overtone, a local-first app unifying Spotify, YouTube, Bandcamp, Dropbox, and personal files behind one high-quality client — a third-party client over wherever music lives, the way Superhuman sits atop Gmail.

The engineering proved harder than the app. Client-side state needed new foundations, so he joined Riffle, a research project on database-driven client state (2021–2023, presented at App.js Conf 2023), and re-implemented Ink & Switch's Cambria lens work as Schemalayer. When Riffle concluded, its ideas carried into LiveStore — an open-source data layer pairing a reactive embedded SQLite database with a git-inspired, event-sourcing sync engine: changes append to an ordered event log, materialize instantly into local state, and rebase onto upstream history before pushing. He chose event sourcing over CRDTs partly out of what he calls migration "trauma" from the Prisma era. LiveStore opened early access in November 2024 — GitHub sponsors and Expo subscribers first — and powers Overtone today.

## Effect and the circuit

Alongside the products runs a second career as an ecosystem participant. He does developer-experience work at Effectful Technologies, hosts Cause & Effect — Effect's official podcast on production adoptions at companies like Vercel, Zendesk, and Warp — MC'd Effect Days 2025, and describes Effect as "a standard library that the web never really had": shared primitives for errors, concurrency, and serialization wherever JavaScript runs. Since January 2024 he has hosted localfirst.fm, opening with Ink & Switch's Peter van Hardenberg, and he co-organized Local-First Conf 2024 in Berlin — scaling a 60-person meetup into a two-day conference — with later editions following. Talks at SPLASH, ViteConf, and podcasts from The Changelog to InfoQ trace the same arc.

## What the record does not settle

The record is thin where it matters most: no birth date or degree confirmation beyond self-reported profiles; no public explanation for the 2020 CEO transition; disagreement on when Overtone began (2020 per his own telling, 2021 per his site) and when sub2home started. Overtone has no announced release date, and LiveStore's route from preview to general availability — and whatever funds Overengineering Studio — is still open. The seams are preserved rather than smoothed.

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
