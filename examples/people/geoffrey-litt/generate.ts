#!/usr/bin/env bun
/** Generate examples/people/geoffrey-litt/person-index.json with derived source ids. */

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

const home = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Geoffrey Litt",
  url: "https://www.geoffreylitt.com/",
  publisher: "geoffreylitt.com",
  notes:
    "The subject's own site; bio, project list, writing index, and talk catalog are self-reported.",
});
const resume = source({
  binding: "subject_controlled",
  mediaType: "pdf",
  title: "Geoffrey Litt — resume",
  url: "https://www.geoffreylitt.com/resume.pdf",
  publisher: "geoffreylitt.com",
  notes:
    "His self-published CV; basis for the Yale degree and Panorama Education role details.",
});
const jobsNewsletter = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "I changed jobs! and other updates",
  url: "https://buttondown.com/geoffreylitt/archive/i-changed-jobs-and-other-updates/",
  publisher: "Buttondown (Geoffrey Litt's newsletter)",
  publishedAt: "2025-11-23",
  authors: ["Geoffrey Litt"],
  notes:
    "His own announcement of leaving Ink & Switch and joining Notion; also contains the 'Code like a surgeon' essay.",
});
const patchworkNewsletter = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Towards universal version control with Patchwork",
  url: "https://buttondown.com/geoffreylitt/archive/towards-universal-version-control-with-patchwork/",
  publisher: "Buttondown (Geoffrey Litt's newsletter)",
  publishedAt: "2024-05-05",
  authors: ["Geoffrey Litt"],
  notes:
    "First-person account of finishing the PhD, joining Ink & Switch full-time, and starting Patchwork in January 2024.",
});
const malleableEssay = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Malleable software: Restoring user agency in a world of locked-down apps",
  url: "https://www.inkandswitch.com/essay/malleable-software/",
  publisher: "Ink & Switch",
  publishedAt: "2025-06",
  authors: [
    "Geoffrey Litt",
    "Josh Horowitz",
    "Peter van Hardenberg",
    "Todd Matthews",
  ],
});
const potluckEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "Potluck: Dynamic documents as personal software",
  url: "https://www.inkandswitch.com/potluck/",
  publisher: "Ink & Switch",
  publishedAt: "2022-10",
  authors: [
    "Geoffrey Litt",
    "Max Schoening",
    "Paul Shen",
    "Paul Sonnentag",
  ],
});
const embarkEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "Embark: Dynamic documents for making plans",
  url: "https://www.inkandswitch.com/embark/",
  publisher: "Ink & Switch",
  publishedAt: "2023-11",
  authors: ["Paul Sonnentag", "Alexander Obenauer", "Geoffrey Litt"],
});
const llmEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "Malleable software in the age of LLMs",
  url: "https://www.geoffreylitt.com/2023/03/25/llm-end-user-programming",
  publisher: "geoffreylitt.com",
  publishedAt: "2023-03-25",
  authors: ["Geoffrey Litt"],
});
const thesis = source({
  binding: "first_person",
  mediaType: "pdf",
  title: "Building Personal Software with Reactive Databases (PhD thesis)",
  url: "https://groups.csail.mit.edu/sdg/pubs/2023/litt_phd_thesis.pdf",
  publisher: "MIT CSAIL Software Design Group",
  publishedAt: "2023",
  authors: ["Geoffrey Litt"],
});
const peritextDoi = source({
  binding: "first_person",
  mediaType: "article",
  title: "Peritext: A CRDT for Collaborative Rich Text Editing",
  url: "https://doi.org/10.1145/3555644",
  publisher: "Proceedings of the ACM on Human-Computer Interaction (CSCW)",
  publishedAt: "2022-11",
  authors: [
    "Geoffrey Litt",
    "Sarah Lim",
    "Martin Kleppmann",
    "Peter van Hardenberg",
  ],
});
const riffleDoi = source({
  binding: "first_person",
  mediaType: "article",
  title: "Riffle: Reactive Relational State for Local-First Applications",
  url: "https://doi.org/10.1145/3586183.3606801",
  publisher: "ACM Symposium on User Interface Software and Technology (UIST)",
  publishedAt: "2023-10",
  authors: [
    "Geoffrey Litt",
    "Nicholas Schiefer",
    "Johannes Schickling",
    "Daniel Jackson",
  ],
});
const dialectic = source({
  binding: "interview",
  mediaType: "audio",
  title: "21. Geoffrey Litt — Software You Can Shape",
  url: "https://jacksondahl.com/dialectic/geoffrey-litt",
  publisher: "Dialectic (Jackson Dahl)",
  publishedAt: "2025-06-17",
  authors: ["Jackson Dahl"],
});
const metamuse = source({
  binding: "archive",
  mediaType: "audio",
  title: "Bring your own client with Geoffrey Litt — Metamuse episode 34",
  url: "https://web.archive.org/web/20260613184331/https://museapp.com/podcast/34-bring-your-own-client/",
  publisher: "Metamuse (Muse), via the Internet Archive Wayback Machine",
  publishedAt: "2021-07-08",
  authors: ["Adam Wiggins", "Mark McGranaghan"],
  notes:
    "The original museapp.com episode page is offline; this is an archived capture.",
});
const localfirstfm = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "#3 – Geoffrey Litt: Malleable software, local state management & Riffle",
  url: "https://www.localfirst.fm/3",
  publisher: "localfirst.fm",
  publishedAt: "2024-02-14",
  authors: ["Johannes Schickling"],
});
const imbue = source({
  binding: "interview",
  mediaType: "article",
  title: "Malleable software and human agency",
  url: "https://ideas.imbue.com/p/geoffrey-litt",
  publisher: "Generally Intelligent (Imbue)",
  publishedAt: "2025-11-14",
  authors: ["Kanjun Qiu"],
});
const orcid = source({
  binding: "primary_record",
  mediaType: "dataset",
  title: "Geoffrey Litt (0000-0003-0858-5165)",
  url: "https://orcid.org/0000-0003-0858-5165",
  publisher: "ORCID",
  notes:
    "Public ORCID record; lists MIT EECS PhD candidacy from September 2019 and selected works.",
});
const patchworkProject = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Patchwork — Ink & Switch",
  url: "https://www.inkandswitch.com/project/patchwork/",
  publisher: "Ink & Switch",
  notes: "The lab's project record for Patchwork (project 030, dated 2024–2026).",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Geoffrey Litt (Q130875996)",
  url: "https://www.wikidata.org/wiki/Q130875996",
  publisher: "Wikidata",
  notes:
    "Sparse record: essentially an ORCID link; no sitelinks or Wikipedia article.",
});
const linkedin = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Geoffrey Litt — LinkedIn",
  url: "https://www.linkedin.com/in/geoffreylitt",
  publisher: "LinkedIn",
  notes:
    "Self-maintained profile; used to corroborate role titles and date ranges.",
});
const recurse = source({
  binding: "reporting",
  mediaType: "webpage",
  title:
    "Localhost: Geoffrey Litt — Dynamic Documents as Personal Software",
  url: "https://assets.recurse.com/events/localhost-dynamic",
  publisher: "Recurse Center",
  notes:
    "Third-party event page with an independently written bio: Notion, Ink & Switch, MIT PhD, Recurse Center 2018.",
});

const S = {
  home: home.id,
  resume: resume.id,
  jobsNewsletter: jobsNewsletter.id,
  patchworkNewsletter: patchworkNewsletter.id,
  malleableEssay: malleableEssay.id,
  potluckEssay: potluckEssay.id,
  embarkEssay: embarkEssay.id,
  llmEssay: llmEssay.id,
  thesis: thesis.id,
  peritextDoi: peritextDoi.id,
  riffleDoi: riffleDoi.id,
  dialectic: dialectic.id,
  metamuse: metamuse.id,
  localfirstfm: localfirstfm.id,
  imbue: imbue.id,
  orcid: orcid.id,
  patchworkProject: patchworkProject.id,
  wikidata: wikidata.id,
  linkedin: linkedin.id,
  recurse: recurse.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-geoffrey-litt",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "geoffrey-litt",
    displayName: "Geoffrey Litt",
    summary:
      "American software designer and HCI researcher who works on 'malleable software' — computing environments anyone can adapt to their own needs. Design engineer at Notion; previously senior researcher at Ink & Switch (Patchwork, Potluck, Peritext, Embark); MIT CSAIL PhD advised by Daniel Jackson.",
    identity: {
      wikidataId: "Q130875996",
      officialSite: "https://www.geoffreylitt.com/",
      profiles: [
        "https://github.com/geoffreylitt",
        "https://x.com/geoffreylitt",
        "https://orcid.org/0000-0003-0858-5165",
        "https://www.linkedin.com/in/geoffreylitt",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    home,
    resume,
    jobsNewsletter,
    patchworkNewsletter,
    malleableEssay,
    potluckEssay,
    embarkEssay,
    llmEssay,
    thesis,
    peritextDoi,
    riffleDoi,
    dialectic,
    metamuse,
    localfirstfm,
    imbue,
    orcid,
    patchworkProject,
    wikidata,
    linkedin,
    recurse,
  ],
  claims: [
    {
      id: "claim-yale-eecs",
      kind: "fact",
      text: "Litt earned a B.S. in electrical engineering and computer science from Yale University, with distinction in the major, per his published resume (class of 2014).",
      sourceIds: [S.resume, S.linkedin],
    },
    {
      id: "claim-panorama-early",
      kind: "fact",
      text: "Out of Yale he joined Panorama Education, a Boston K-12 edtech startup, as one of its first engineers — his resume says the third engineering hire — where he designed the data reporting interface and led an NLP feature that categorized open-ended survey feedback.",
      sourceIds: [S.resume, S.dialectic, S.linkedin],
    },
    {
      id: "claim-recurse-2018",
      kind: "fact",
      text: "He attended the Recurse Center programming retreat in 2018.",
      sourceIds: [S.recurse],
    },
    {
      id: "claim-inkandswitch-summers",
      kind: "fact",
      text: "He worked with Ink & Switch every summer during graduate school, then joined the lab full-time after finishing his PhD.",
      sourceIds: [S.jobsNewsletter],
    },
    {
      id: "claim-mit-phd",
      kind: "fact",
      text: "He pursued a PhD in human-computer interaction at MIT from September 2019, in the CSAIL Software Design Group advised by Daniel Jackson, completing the doctorate in 2023.",
      sourceIds: [S.orcid, S.home, S.thesis, S.linkedin],
    },
    {
      id: "claim-thesis-three-systems",
      kind: "fact",
      text: "His 2023 dissertation, 'Building Personal Software with Reactive Databases,' extends spreadsheet and relational-database techniques through three systems — Wildcard, Potluck, and Riffle — aiming to give both end users and developers simpler ways to build software.",
      sourceIds: [S.thesis],
    },
    {
      id: "claim-wildcard",
      kind: "fact",
      text: "Wildcard, his early-PhD project, is a browser extension for spreadsheet-driven customization: it exposes a web app's underlying data in a table view so end users can sort, annotate, and extend real sites without traditional programming; the work was published at ACM venues in 2020.",
      sourceIds: [S.thesis, S.home],
    },
    {
      id: "claim-peritext",
      kind: "fact",
      text: "Peritext, developed with Sarah Lim, Martin Kleppmann, and Peter van Hardenberg, is a CRDT algorithm for collaborative rich-text editing built around a model of intent preservation; the paper appeared in PACM HCI (CSCW) in November 2022.",
      sourceIds: [S.peritextDoi],
    },
    {
      id: "claim-potluck",
      kind: "fact",
      text: "Potluck — built at Ink & Switch with Max Schoening, Paul Shen, and Paul Sonnentag — lets users gradually enrich text notes into interactive tools using live searches, formulas, and dynamic annotations; the essay was published in October 2022 and presented at the LIVE 2022 workshop.",
      sourceIds: [S.potluckEssay],
    },
    {
      id: "claim-riffle",
      kind: "fact",
      text: "Riffle, with Nicholas Schiefer, Johannes Schickling, and Daniel Jackson, manages an entire web application's state in a client-side relational database behind a graph of reactive queries; published at UIST 2023 with a case study of the Overtone music-management app.",
      sourceIds: [S.riffleDoi, S.localfirstfm],
    },
    {
      id: "claim-embark",
      kind: "fact",
      text: "Embark, with Paul Sonnentag and Alexander Obenauer, applied the dynamic-documents model to travel planning — outlines enriched with structured mentions, map and calendar views, and formulas — published November 2023 and presented at LIVE 2023.",
      sourceIds: [S.embarkEssay],
    },
    {
      id: "claim-senior-researcher",
      kind: "fact",
      text: "He was a senior researcher at the independent lab Ink & Switch until September 2025, where his work centered on malleable software.",
      sourceIds: [S.home, S.jobsNewsletter, S.linkedin],
    },
    {
      id: "claim-patchwork",
      kind: "fact",
      text: "In January 2024 he started Patchwork at Ink & Switch with Paul Sonnentag, Max Schöning, Adam Wiggins, Peter van Hardenberg, and Orion Henry — a 'universal version control' research project prototyped inside the lab's Automerge-based writing tool, with a public lab notebook beginning February 2024.",
      sourceIds: [S.patchworkNewsletter, S.patchworkProject],
    },
    {
      id: "claim-malleable-essay",
      kind: "fact",
      text: "In June 2025 Ink & Switch published 'Malleable software: Restoring user agency in a world of locked-down apps,' co-authored by Litt, Josh Horowitz, Peter van Hardenberg, and Todd Matthews — a manifesto synthesizing the lab's years of prototyping.",
      sourceIds: [S.malleableEssay, S.dialectic],
    },
    {
      id: "claim-notion",
      kind: "fact",
      text: "In September 2025 he left Ink & Switch and joined Notion as a design engineer — a role he describes as conceptual design and prototyping, spanning near-term product improvements and longer-horizon exploration.",
      sourceIds: [S.jobsNewsletter, S.linkedin, S.imbue, S.home],
    },
    {
      id: "claim-talks",
      kind: "fact",
      text: "His recorded talks include 'Dynamic Documents as Personal Software' at Causal Islands 2023, 'Ruby, A Family History' at RailsConf 2018, and 'ENHANCE!' at !!Con 2017.",
      sourceIds: [S.home],
    },
    {
      id: "claim-podcast-circuit",
      kind: "fact",
      text: "He has been interviewed on Metamuse episode 34 (July 2021), localfirst.fm episode 3 (February 2024), Dialectic (June 2025), and Imbue's Generally Intelligent podcast (November 2025).",
      sourceIds: [S.metamuse, S.localfirstfm, S.dialectic, S.imbue],
    },
    {
      id: "claim-stevens",
      kind: "fact",
      text: "In April 2025 he published 'Stevens,' describing a hackable personal AI assistant he built from a single SQLite table and a handful of cron jobs.",
      sourceIds: [S.home],
    },
    {
      id: "claim-belief-malleable",
      kind: "stated_belief",
      text: "He defines malleable software as 'a software ecosystem where anyone can adapt their tools to their needs with minimal friction' — modification becoming routine rather than exceptional, at the point of use.",
      sourceIds: [S.malleableEssay],
    },
    {
      id: "claim-belief-rigid-apps",
      kind: "stated_belief",
      text: "He argues mass-produced software is too rigid: centralized development teams cannot serve the long tail of individual needs, so people are forced to adapt their workflows to their tools when it should be the other way around.",
      sourceIds: [S.malleableEssay, S.dialectic],
    },
    {
      id: "claim-belief-gradual-enrichment",
      kind: "stated_belief",
      text: "He champions 'gradual enrichment': start with plain documents and incrementally add structure and computation until they grow into personal tools — and he calls Notion the best commercial incarnation of 'document to app' thinking.",
      sourceIds: [S.potluckEssay, S.jobsNewsletter],
    },
    {
      id: "claim-belief-llm-role",
      kind: "stated_belief",
      text: "He believes LLMs can help usher in an era of personal software — for example, by extracting structure from messy text — but that AI coding alone is not sufficient for malleable software; the user must stay in control of which computations run.",
      sourceIds: [S.llmEssay, S.malleableEssay],
    },
    {
      id: "claim-belief-surgeon",
      kind: "stated_belief",
      text: "On AI-assisted programming he advocates 'coding like a surgeon': keep hands-on control of the core craft while delegating secondary tasks to agents, and be deliberate about where each task sits on the 'autonomy slider.'",
      sourceIds: [S.jobsNewsletter],
    },
    {
      id: "claim-belief-byoc",
      kind: "stated_belief",
      text: "He argues for a 'bring your own client' world: collaborators on shared data should each get to choose — or build — the software they use to work with it.",
      sourceIds: [S.metamuse],
    },
    {
      id: "claim-belief-agency",
      kind: "stated_belief",
      text: "Across interviews he frames the work as fundamentally about agency: he calls it 'almost painful' to see people unable to change their tools, and describes software as his chosen creative medium for fixing that.",
      sourceIds: [S.dialectic, S.imbue],
    },
    {
      id: "claim-belief-versioning-divergence",
      kind: "stated_belief",
      text: "He argues collaborative malleable software requires end-user tools for managing divergence — when everyone's software fragments into personal variants, versioning becomes a user-facing problem — and that version control is also a natural interface for collaborating with AI tools that stage tentative edits.",
      sourceIds: [S.patchworkNewsletter],
    },
    {
      id: "claim-pattern-authentic-use",
      kind: "pattern",
      text: "His research method repeatedly builds prototypes inside serious contexts of authentic use: the Patchwork team wrote its own lab notebook inside the tool, and Potluck was exercised on real recipes, chores, and workouts.",
      sourceIds: [S.patchworkNewsletter, S.potluckEssay],
    },
    {
      id: "claim-pattern-essay-driven",
      kind: "pattern",
      text: "The Ink & Switch model — small teams building research prototypes and then publishing public essays — structures most of his output: nearly every project culminates in a widely read essay rather than a shipped product.",
      sourceIds: [S.malleableEssay, S.potluckEssay, S.embarkEssay, S.patchworkProject],
    },
    {
      id: "claim-pattern-local-first",
      kind: "pattern",
      text: "His local-first work — Cambria, Peritext, Automerge-based Patchwork, and Riffle — treats data ownership, offline capability, and interoperability as infrastructure for the same user-agency goal as malleable software.",
      sourceIds: [S.peritextDoi, S.riffleDoi, S.localfirstfm, S.patchworkNewsletter],
    },
    {
      id: "claim-spec-notion-fit",
      kind: "speculation",
      text: "His claim that no company is better positioned than Notion 'to democratize software creation in the age of AI' is his own stated rationale for the move — a forward-looking judgment, not a demonstrated outcome.",
      sourceIds: [S.jobsNewsletter],
    },
    {
      id: "claim-spec-os-versioning",
      kind: "speculation",
      text: "The Patchwork vision that universal version control might one day be built into the operating system's storage layer is a stated research aspiration, not a shipped plan.",
      sourceIds: [S.patchworkProject, S.patchworkNewsletter],
    },
    {
      id: "claim-spec-malleable-timing",
      kind: "speculation",
      text: "Whether mainstream AI coding tools converge on his 'malleable' vision — rather than locking users into generated but opaque software — is an open question his own essays leave unresolved.",
      sourceIds: [S.llmEssay, S.malleableEssay],
    },
  ],
  timeline: [
    {
      id: "event-yale",
      kind: "education",
      date: "2014",
      title: "B.S. in EECS from Yale University",
      summary:
        "Graduated with distinction in the electrical engineering and computer science major, per his resume.",
      organization: "Yale University",
      organizationHandle: "yale-university",
      sourceIds: [S.resume, S.linkedin],
    },
    {
      id: "event-panorama",
      kind: "role",
      date: "2013",
      end: "2019",
      title: "Early engineer at Panorama Education",
      summary:
        "Joined the K-12 edtech startup as one of its first engineers; worked across backend, frontend, product design, and data teams.",
      organization: "Panorama Education",
      location: "Boston, Massachusetts",
      organizationHandle: "panorama-education",
      sourceIds: [S.resume, S.linkedin, S.dialectic],
    },
    {
      id: "event-recurse",
      kind: "education",
      date: "2018",
      title: "Attended the Recurse Center",
      summary: "A self-directed programming retreat in New York.",
      organization: "Recurse Center",
      organizationHandle: "recurse-center",
      sourceIds: [S.recurse],
    },
    {
      id: "event-mit-phd",
      kind: "education",
      date: "2019-09",
      end: "2023",
      title: "PhD in HCI at MIT",
      summary:
        "Doctorate in the CSAIL Software Design Group advised by Daniel Jackson; dissertation 'Building Personal Software with Reactive Databases.'",
      organization: "MIT CSAIL Software Design Group",
      organizationHandle: "mit-csail-software-design-group",
      sourceIds: [S.orcid, S.thesis, S.home],
    },
    {
      id: "event-wildcard",
      kind: "publication",
      date: "2020",
      title: "Wildcard: spreadsheet-driven customization of web apps",
      summary:
        "Browser-extension research letting end users modify real websites through a spreadsheet table view; published at ACM venues including Onward! 2020.",
      sourceIds: [S.thesis, S.home],
    },
    {
      id: "event-potluck",
      kind: "publication",
      date: "2022-10",
      title: "Potluck: Dynamic documents as personal software",
      summary:
        "Ink & Switch essay and research prototype on gradually enriching text notes into interactive tools; presented at LIVE 2022.",
      organization: "Ink & Switch",
      organizationHandle: "ink-and-switch",
      sourceIds: [S.potluckEssay],
    },
    {
      id: "event-peritext-paper",
      kind: "publication",
      date: "2022-11",
      title: "Peritext paper in PACM HCI (CSCW)",
      summary:
        "CRDT algorithm for collaborative rich-text editing with intent preservation, with Lim, Kleppmann, and van Hardenberg.",
      sourceIds: [S.peritextDoi],
    },
    {
      id: "event-riffle-uist",
      kind: "publication",
      date: "2023-10",
      title: "Riffle paper at UIST 2023",
      summary:
        "Reactive relational state management for local-first applications, with Schiefer, Schickling, and Jackson.",
      sourceIds: [S.riffleDoi],
    },
    {
      id: "event-embark",
      kind: "publication",
      date: "2023-11",
      title: "Embark: Dynamic documents for making plans",
      summary:
        "Ink & Switch essay and prototype for travel planning in enriched text outlines; presented at LIVE 2023.",
      organization: "Ink & Switch",
      organizationHandle: "ink-and-switch",
      sourceIds: [S.embarkEssay],
    },
    {
      id: "event-inkandswitch-fulltime",
      kind: "role",
      date: "2023",
      end: "2025-09",
      title: "Senior researcher at Ink & Switch",
      summary:
        "Joined the lab full-time after finishing the PhD, following summers of collaboration during graduate school.",
      organization: "Ink & Switch",
      organizationHandle: "ink-and-switch",
      sourceIds: [S.jobsNewsletter, S.home],
    },
    {
      id: "event-patchwork",
      kind: "project",
      date: "2024-01",
      title: "Started Patchwork at Ink & Switch",
      summary:
        "Universal version control research with Sonnentag, Schöning, Wiggins, van Hardenberg, and Henry; public lab notebook from February 2024.",
      organization: "Ink & Switch",
      organizationHandle: "ink-and-switch",
      sourceIds: [S.patchworkNewsletter, S.patchworkProject],
    },
    {
      id: "event-malleable-essay",
      kind: "publication",
      date: "2025-06",
      title: "'Malleable software' manifesto published",
      summary:
        "Ink & Switch essay 'Malleable software: Restoring user agency in a world of locked-down apps,' with Horowitz, van Hardenberg, and Matthews.",
      organization: "Ink & Switch",
      organizationHandle: "ink-and-switch",
      sourceIds: [S.malleableEssay],
    },
    {
      id: "event-notion",
      kind: "role",
      date: "2025-09",
      title: "Joined Notion as design engineer",
      summary:
        "Left Ink & Switch to do conceptual design and prototyping at Notion, reuniting with former collaborator Max Schoening.",
      organization: "Notion",
      organizationHandle: "notion",
      sourceIds: [S.jobsNewsletter, S.linkedin, S.imbue],
    },
  ],
  themes: [
    {
      id: "theme-malleable-software",
      kind: "philosophy",
      status: "stated",
      title: "Malleable software",
      summary:
        "The organizing idea of his career: a software ecosystem where anyone can adapt their tools to their needs with minimal friction — software as clay, not appliances. The June 2025 Ink & Switch essay he led is the canonical statement.",
      sourceIds: [S.malleableEssay, S.dialectic, S.imbue],
    },
    {
      id: "theme-user-agency",
      kind: "belief",
      status: "stated",
      title: "User agency as the point",
      summary:
        "He frames the work as being about agency, not software for its own sake: tools should treat people as co-creators who understand their own needs, and he describes a visceral reaction to seeing people stuck fighting their tools.",
      sourceIds: [S.dialectic, S.imbue, S.malleableEssay],
    },
    {
      id: "theme-gradual-enrichment",
      kind: "method",
      status: "stated",
      title: "Gradual enrichment: documents that grow into apps",
      summary:
        "Start with plain text notes and incrementally add searches, formulas, and views until the document becomes a personal tool — the model behind Potluck and Embark, and part of why he joined Notion.",
      sourceIds: [S.potluckEssay, S.embarkEssay, S.jobsNewsletter],
    },
    {
      id: "theme-end-user-programming",
      kind: "method",
      status: "stated",
      title: "End-user programming on a gentle slope",
      summary:
        "Spreadsheets are his reference success: customization without traditional programming, with a smooth slope from use to creation — the throughline of his MIT dissertation.",
      sourceIds: [S.thesis, S.llmEssay],
    },
    {
      id: "theme-tools-not-apps",
      kind: "philosophy",
      status: "stated",
      title: "Tools, not apps — and bring your own client",
      summary:
        "Monolithic apps are 'avocado slicers': sealed, single-purpose, and unadaptable. He advocates small composable tools over shared data — including the freedom to bring your own client to a collaboration.",
      sourceIds: [S.malleableEssay, S.metamuse, S.embarkEssay],
    },
    {
      id: "theme-local-first",
      kind: "interest",
      status: "reported",
      title: "Local-first infrastructure as agency infrastructure",
      summary:
        "CRDTs, Automerge, version control, and data-ownership work (Cambria, Peritext, Patchwork, Riffle) are the technical substrate for the same goal: users keeping control of their tools and data.",
      sourceIds: [S.peritextDoi, S.localfirstfm, S.patchworkNewsletter],
    },
    {
      id: "theme-ai-personal-software",
      kind: "belief",
      status: "stated",
      title: "AI for personal software, not autopilot",
      summary:
        "LLMs should help people make and reshape their own tools — extracting structure, drafting versions, handling secondary tasks — while the user keeps control of the computations; 'code like a surgeon,' with HUDs rather than only copilots.",
      sourceIds: [S.llmEssay, S.jobsNewsletter, S.home],
    },
    {
      id: "theme-lineage",
      kind: "influence",
      status: "reported",
      title: "HyperCard, Smalltalk, and the augmentation lineage",
      summary:
        "His essays and interviews consciously position the work in the lineage of Alan Kay, Douglas Engelbart, HyperCard, Smalltalk, Dynamicland, and end-user programming research like Nardi's 'A Small Matter of Programming.'",
      sourceIds: [S.malleableEssay, S.dialectic],
    },
  ],
  works: [
    {
      id: "work-wildcard",
      kind: "project",
      status: "completed",
      title: "Wildcard",
      date: "2020",
      summary:
        "Browser extension for spreadsheet-driven customization of web applications; the first of the three systems in his dissertation.",
      sourceIds: [S.thesis, S.home],
    },
    {
      id: "work-peritext",
      kind: "paper",
      status: "published",
      title: "Peritext: A CRDT for Collaborative Rich Text Editing",
      date: "2022-11",
      summary:
        "Intent-preserving rich-text CRDT for local-first async collaboration, published in PACM HCI (CSCW).",
      sourceIds: [S.peritextDoi],
    },
    {
      id: "work-potluck",
      kind: "project",
      status: "completed",
      title: "Potluck",
      date: "2022",
      summary:
        "Ink & Switch research prototype for gradually enriching text notes into personal software via searches, formulas, and dynamic annotations.",
      sourceIds: [S.potluckEssay],
    },
    {
      id: "work-riffle",
      kind: "project",
      status: "completed",
      title: "Riffle",
      date: "2023",
      summary:
        "Reactive relational state management for local-first apps — a client-side database behind reactive queries, validated on the Overtone music app; UIST 2023 paper.",
      sourceIds: [S.riffleDoi, S.localfirstfm],
    },
    {
      id: "work-embark",
      kind: "project",
      status: "completed",
      title: "Embark",
      date: "2023-11",
      summary:
        "Ink & Switch prototype applying dynamic documents to travel planning: mentions, rich views, and formulas over a text outline.",
      sourceIds: [S.embarkEssay],
    },
    {
      id: "work-cambria",
      kind: "project",
      status: "completed",
      title: "Cambria",
      date: "2021",
      summary:
        "Ink & Switch project on cross-app data compatibility using bidirectional lenses, which he collaborated on during his doctoral years.",
      sourceIds: [S.home, S.localfirstfm],
    },
    {
      id: "work-patchwork",
      kind: "project",
      status: "ongoing",
      title: "Patchwork",
      date: "2024",
      summary:
        "Ink & Switch universal version control research — branching, diffing, and commenting primitives for prose and other media, prototyped on Automerge; he started the project in January 2024 and worked on it through his September 2025 departure.",
      sourceIds: [S.patchworkNewsletter, S.patchworkProject],
    },
    {
      id: "work-thesis",
      kind: "paper",
      status: "published",
      title: "Building Personal Software with Reactive Databases",
      date: "2023",
      summary:
        "His MIT PhD dissertation, unifying Wildcard, Potluck, and Riffle into a thesis about end-user software construction.",
      sourceIds: [S.thesis],
    },
    {
      id: "work-malleable-essay",
      kind: "paper",
      status: "published",
      title:
        "Malleable software: Restoring user agency in a world of locked-down apps",
      date: "2025-06",
      summary:
        "The Ink & Switch manifesto he co-authored and led — the definitive statement of the research vision.",
      sourceIds: [S.malleableEssay],
    },
    {
      id: "work-llm-essay",
      kind: "paper",
      status: "published",
      title: "Malleable software in the age of LLMs",
      date: "2023-03-25",
      summary:
        "Personal essay arguing that LLMs can support end-user programming while keeping users in control of the computation.",
      sourceIds: [S.llmEssay],
    },
    {
      id: "work-stevens",
      kind: "project",
      status: "completed",
      title: "Stevens",
      date: "2025",
      summary:
        "A hackable personal AI assistant built from a single SQLite table and a handful of cron jobs — an exercise in malleable personal tooling.",
      sourceIds: [S.home],
    },
  ],
  appearances: [
    {
      id: "appearance-metamuse-34",
      title: "Bring your own client with Geoffrey Litt",
      venue: "Metamuse podcast, episode 34",
      publishedAt: "2021-07-08",
      participants: ["Geoffrey Litt", "Adam Wiggins", "Mark McGranaghan"],
      participantHandles: [
        { name: "Geoffrey Litt", handle: "geoffrey-litt" },
        { name: "Adam Wiggins", handle: "adam-wiggins" },
        { name: "Mark McGranaghan", handle: "mark-mcgranaghan" },
      ],
      summary:
        "On bring-your-own-client software, data interoperability, and accidentally becoming an expert.",
      media: [
        {
          type: "audio",
          url: "https://web.archive.org/web/20260613184331/https://museapp.com/podcast/34-bring-your-own-client/",
          sourceId: S.metamuse,
        },
      ],
      sourceIds: [S.metamuse],
    },
    {
      id: "appearance-causal-islands",
      title: "Dynamic Documents as Personal Software",
      venue: "Causal Islands 2023",
      publishedAt: "2023",
      participants: ["Geoffrey Litt"],
      participantHandles: [
        { name: "Geoffrey Litt", handle: "geoffrey-litt" },
      ],
      summary:
        "Conference talk on his vision for dynamic documents and AI, cataloged on his site.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=bJ3i4K3hefI",
        },
      ],
      sourceIds: [S.home],
    },
    {
      id: "appearance-localfirstfm",
      title: "#3 – Malleable software, local state management & Riffle",
      venue: "localfirst.fm podcast",
      publishedAt: "2024-02-14",
      participants: ["Geoffrey Litt", "Johannes Schickling"],
      participantHandles: [
        { name: "Geoffrey Litt", handle: "geoffrey-litt" },
        { name: "Johannes Schickling", handle: "johannes-schickling" },
      ],
      summary:
        "On malleable software, end-users modifying app behavior, and building interfaces from database queries with Riffle.",
      media: [
        {
          type: "audio",
          url: "https://www.localfirst.fm/3",
          sourceId: S.localfirstfm,
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=nzqyc-DfrmQ",
        },
      ],
      sourceIds: [S.localfirstfm],
    },
    {
      id: "appearance-dialectic",
      title: "Software You Can Shape",
      venue: "Dialectic podcast, episode 21",
      publishedAt: "2025-06-17",
      participants: ["Geoffrey Litt", "Jackson Dahl"],
      participantHandles: [
        { name: "Geoffrey Litt", handle: "geoffrey-litt" },
        { name: "Jackson Dahl", handle: "jackson-dahl" },
      ],
      summary:
        "A long conversation on malleable software, the 'nightmare bicycle,' LLMs, and a call for products that treat users as co-authors.",
      media: [
        {
          type: "audio",
          url: "https://jacksondahl.com/dialectic/geoffrey-litt",
          sourceId: S.dialectic,
        },
      ],
      sourceIds: [S.dialectic],
    },
    {
      id: "appearance-dive-club",
      title: "Dive Club with Ridd",
      venue: "Dive Club (YouTube)",
      publishedAt: "2025",
      participants: ["Geoffrey Litt", "Ridd"],
      participantHandles: [
        { name: "Geoffrey Litt", handle: "geoffrey-litt" },
      ],
      summary:
        "A recent design-podcast conversation on malleable software and AI, linked from his newsletter.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=zJf0UeCwQqE",
        },
      ],
      sourceIds: [S.jobsNewsletter],
    },
    {
      id: "appearance-generally-intelligent",
      title: "Malleable software and human agency",
      venue: "Generally Intelligent (Imbue podcast)",
      publishedAt: "2025-11-14",
      participants: ["Geoffrey Litt", "Kanjun Qiu"],
      participantHandles: [
        { name: "Geoffrey Litt", handle: "geoffrey-litt" },
        { name: "Kanjun Qiu", handle: "kanjun-qiu" },
      ],
      summary:
        "On shaping software like clay, the move to Notion, and the human stakes of malleable tools.",
      media: [
        {
          type: "article",
          url: "https://ideas.imbue.com/p/geoffrey-litt",
          sourceId: S.imbue,
        },
      ],
      sourceIds: [S.imbue],
    },
    {
      id: "appearance-recurse-localhost",
      title: "Localhost: Dynamic Documents as Personal Software",
      venue: "Recurse Center",
      participants: ["Geoffrey Litt"],
      participantHandles: [
        { name: "Geoffrey Litt", handle: "geoffrey-litt" },
      ],
      summary:
        "A talk spanning HyperCard history, Ink & Switch prototypes like Embark, and early experiments at Notion.",
      sourceIds: [S.recurse],
    },
  ],
  relations: [
    {
      id: "rel-panorama-education",
      kind: "employed_by",
      target: "panorama-education",
      targetName: "Panorama Education",
      targetKind: "organization",
      note: "Joined the Boston K-12 edtech startup out of Yale as one of its first engineers — his resume says the third engineering hire — and stayed through 2019.",
      start: "2013",
      end: "2019",
      sourceIds: [S.resume, S.linkedin, S.dialectic],
    },
    {
      id: "rel-ink-and-switch",
      kind: "employed_by",
      target: "ink-and-switch",
      targetName: "Ink & Switch",
      targetKind: "organization",
      note: "Collaborated with the lab every summer of graduate school, then joined full-time after the 2023 PhD; senior researcher on malleable software until September 2025.",
      start: "2023",
      end: "2025-09",
      sourceIds: [S.jobsNewsletter, S.patchworkNewsletter, S.home, S.linkedin],
    },
    {
      id: "rel-notion",
      kind: "employed_by",
      target: "notion",
      targetName: "Notion",
      targetKind: "organization",
      note: "Joined in September 2025 as a design engineer doing conceptual design and prototyping.",
      start: "2025-09",
      targetWikidataId: "Q89269703",
      sourceIds: [S.jobsNewsletter, S.linkedin, S.imbue, S.home],
    },
    {
      id: "rel-daniel-jackson",
      kind: "collaborated",
      target: "daniel-jackson",
      targetName: "Daniel Jackson",
      note: "His MIT CSAIL Software Design Group PhD advisor, and co-author on the Riffle paper at UIST 2023.",
      targetWikidataId: "Q5217654",
      sourceIds: [S.thesis, S.orcid, S.riffleDoi],
    },
    {
      id: "rel-sarah-lim",
      kind: "collaborated",
      target: "sarah-lim",
      targetName: "Sarah Lim",
      note: "Co-author on Peritext, the intent-preserving rich-text CRDT published in PACM HCI (CSCW) 2022.",
      sourceIds: [S.peritextDoi],
    },
    {
      id: "rel-martin-kleppmann",
      kind: "collaborated",
      target: "martin-kleppmann",
      targetName: "Martin Kleppmann",
      note: "Co-author on the Peritext CRDT paper (2022).",
      targetWikidataId: "Q99748636",
      sourceIds: [S.peritextDoi],
    },
    {
      id: "rel-peter-van-hardenberg",
      kind: "collaborated",
      target: "peter-van-hardenberg",
      targetName: "Peter van Hardenberg",
      note: "Co-author on Peritext (2022) and the 'Malleable software' manifesto (2025), and a member of the Patchwork project team.",
      targetWikidataId: "Q130807208",
      sourceIds: [S.peritextDoi, S.malleableEssay, S.patchworkNewsletter],
    },
    {
      id: "rel-nicholas-schiefer",
      kind: "collaborated",
      target: "nicholas-schiefer",
      targetName: "Nicholas Schiefer",
      note: "Co-author on Riffle, the reactive relational state paper at UIST 2023.",
      sourceIds: [S.riffleDoi],
    },
    {
      id: "rel-johannes-schickling",
      kind: "collaborated",
      target: "johannes-schickling",
      targetName: "Johannes Schickling",
      note: "Co-author on the Riffle paper at UIST 2023.",
      sourceIds: [S.riffleDoi],
    },
    {
      id: "rel-max-schoening",
      kind: "collaborated",
      target: "max-schoening",
      targetName: "Max Schöning",
      note: "Co-author on Potluck (2022) and a member of the Patchwork team; the Notion move reunited him with this former collaborator.",
      sourceIds: [S.potluckEssay, S.patchworkNewsletter, S.jobsNewsletter],
    },
    {
      id: "rel-paul-shen",
      kind: "collaborated",
      target: "paul-shen",
      targetName: "Paul Shen",
      note: "Co-author on the Potluck dynamic-documents essay and prototype (2022).",
      sourceIds: [S.potluckEssay],
    },
    {
      id: "rel-paul-sonnentag",
      kind: "collaborated",
      target: "paul-sonnentag",
      targetName: "Paul Sonnentag",
      note: "Co-author on Potluck (2022) and Embark (2023), and a member of the Patchwork project team from its January 2024 start.",
      sourceIds: [S.potluckEssay, S.embarkEssay, S.patchworkNewsletter],
    },
    {
      id: "rel-alexander-obenauer",
      kind: "collaborated",
      target: "alexander-obenauer",
      targetName: "Alexander Obenauer",
      note: "Co-author on Embark, the travel-planning dynamic-documents essay (2023).",
      sourceIds: [S.embarkEssay],
    },
    {
      id: "rel-josh-horowitz",
      kind: "collaborated",
      target: "josh-horowitz",
      targetName: "Josh Horowitz",
      note: "Co-author on the June 2025 'Malleable software' manifesto.",
      sourceIds: [S.malleableEssay],
    },
    {
      id: "rel-todd-matthews",
      kind: "collaborated",
      target: "todd-matthews",
      targetName: "Todd Matthews",
      note: "Co-author on the June 2025 'Malleable software' manifesto.",
      sourceIds: [S.malleableEssay],
    },
    {
      id: "rel-adam-wiggins",
      kind: "collaborated",
      target: "adam-wiggins",
      targetName: "Adam Wiggins",
      note: "Member of the Patchwork project team at Ink & Switch from its January 2024 start.",
      sourceIds: [S.patchworkNewsletter, S.patchworkProject],
    },
    {
      id: "rel-orion-henry",
      kind: "collaborated",
      target: "orion-henry",
      targetName: "Orion Henry",
      note: "Member of the Patchwork project team at Ink & Switch from its January 2024 start.",
      sourceIds: [S.patchworkNewsletter, S.patchworkProject],
    },
    {
      id: "rel-alan-kay",
      kind: "influenced_by",
      target: "alan-kay",
      targetName: "Alan Kay",
      note: "His essays and interviews consciously position malleable software in Kay's lineage — alongside Engelbart, HyperCard, and Smalltalk.",
      targetWikidataId: "Q92742",
      sourceIds: [S.malleableEssay, S.dialectic],
    },
    {
      id: "rel-douglas-engelbart",
      kind: "influenced_by",
      target: "douglas-engelbart",
      targetName: "Douglas Engelbart",
      note: "Part of the augmentation lineage his essays and interviews explicitly cite.",
      targetWikidataId: "Q92614",
      sourceIds: [S.malleableEssay, S.dialectic],
    },
    {
      id: "rel-bonnie-nardi",
      kind: "influenced_by",
      target: "bonnie-nardi",
      targetName: "Bonnie Nardi",
      note: "Her 'A Small Matter of Programming' is among the end-user-programming research his work cites as lineage.",
      targetWikidataId: "Q4942417",
      sourceIds: [S.malleableEssay, S.dialectic],
    },
    {
      id: "rel-adam-wiggins-metamuse",
      kind: "interviewed_by",
      target: "adam-wiggins",
      targetName: "Adam Wiggins",
      note: "Metamuse episode 34, 'Bring your own client,' July 2021.",
      sourceIds: [S.metamuse],
    },
    {
      id: "rel-mark-mcgranaghan",
      kind: "interviewed_by",
      target: "mark-mcgranaghan",
      targetName: "Mark McGranaghan",
      note: "Metamuse episode 34, 'Bring your own client,' July 2021.",
      sourceIds: [S.metamuse],
    },
    {
      id: "rel-johannes-schickling-localfirst",
      kind: "interviewed_by",
      target: "johannes-schickling",
      targetName: "Johannes Schickling",
      note: "localfirst.fm episode 3 on malleable software, local state management, and Riffle, February 2024.",
      sourceIds: [S.localfirstfm],
    },
    {
      id: "rel-jackson-dahl",
      kind: "interviewed_by",
      target: "jackson-dahl",
      targetName: "Jackson Dahl",
      note: "Dialectic episode 21, 'Software You Can Shape,' June 2025.",
      sourceIds: [S.dialectic],
    },
    {
      id: "rel-kanjun-qiu",
      kind: "interviewed_by",
      target: "kanjun-qiu",
      targetName: "Kanjun Qiu",
      note: "Imbue's Generally Intelligent podcast, 'Malleable software and human agency,' November 2025.",
      targetWikidataId: "Q80640135",
      sourceIds: [S.imbue],
    },
    {
      id: "rel-ridd",
      kind: "interviewed_by",
      target: "ridd",
      targetName: "Ridd",
      note: "Dive Club design-podcast conversation on malleable software and AI, linked from his newsletter.",
      sourceIds: [S.jobsNewsletter],
    },
  ],
  openQuestions: [
    "What exactly he is building at Notion is not public: the role is described only as 'design engineer' doing conceptual design and prototyping, with no shipped work yet attributed to him.",
    "Whether Patchwork continues at Ink & Switch after his departure is unclear — the lab's project page lists it as running 2024–2026 while his own involvement ended in September 2025.",
    "Early-career details (Yale class year, Panorama tenure and 'third engineering hire' claim) rest mainly on his own resume and self-maintained profiles rather than independent reporting.",
    "His Wikidata entry is sparse — an ORCID link, no sitelinks — and no Wikipedia article exists, so the biographical record leans heavily on self-published material.",
    "How much of the malleable-software research agenda can ship inside a commercial product at Notion — versus staying a lab vision — is a question his own newsletter raises without answering.",
  ],
  body: `Geoffrey Litt is a software designer and HCI researcher whose career circles one idea: malleable software — computing environments where anyone can adapt their tools to their own needs with minimal friction. He is currently a design engineer at Notion. Before that he spent years at the independent research lab Ink & Switch, where he helped articulate and prototype the malleable-software vision, and before that he did a PhD in human-computer interaction at MIT's CSAIL Software Design Group, advised by Daniel Jackson.

## From startups to a research practice

Litt studied electrical engineering and computer science at Yale (class of 2014, with distinction in the major, per his resume) and joined Panorama Education — a Boston startup building data tools for K-12 schools — as one of its first engineers. His resume describes him as the third engineering hire; he designed the company's data reporting interface and led an NLP feature that categorized open-ended survey feedback for educators. On the Dialectic podcast he has described this period as formative: teachers kept asking for small changes the centralized team could not ship, which seeded his obsession with letting users adapt software themselves. He attended the Recurse Center in 2018, then began a PhD at MIT in September 2019.

His 2023 dissertation, *Building Personal Software with Reactive Databases*, extends spreadsheet and relational-database techniques through three systems. Wildcard (2020) is a browser extension for spreadsheet-driven customization: it scrapes a web app's underlying data into a table view so end users can sort, annotate, and extend real sites without traditional programming. Potluck and Riffle followed — the other two pillars of the thesis.

## The Ink & Switch years

Ink & Switch is an independent research lab — in the Dialectic description, one "focused on how computers can help us think and work" — that builds prototypes exploring new computing platforms. Litt collaborated with the lab during his graduate summers and joined full-time after finishing his doctorate, eventually as a senior researcher leading malleable-software work.

His projects there fall into two braided strands. The local-first strand produced Peritext (with Sarah Lim, Martin Kleppmann, and Peter van Hardenberg), an intent-preserving CRDT for rich-text collaboration published in PACM HCI at CSCW 2022; contributions to Cambria, which translates data between apps via bidirectional lenses; and Patchwork, a universal version control project he started in January 2024 with Paul Sonnentag, Max Schöning, Adam Wiggins, van Hardenberg, and Orion Henry. Patchwork prototyped branching, diffing, and commenting primitives inside the lab's Automerge-based writing tool — the team wrote its own public lab notebook inside the prototype — and asked whether version control could someday live in the OS storage layer.

The dynamic-documents strand produced Potluck (2022, with Schoening, Paul Shen, and Sonnentag), which lets users gradually enrich text notes into interactive tools through live searches, formulas, and dynamic annotations; and Embark (2023, with Sonnentag and Alexander Obenauer), which applied the same model to travel planning. Both were presented at the LIVE workshop on live programming, and both reflect a signature method: prototypes tested in serious contexts of authentic use, then written up as public essays rather than shipped as products.

The strands converge in his writing. In June 2025 Ink & Switch published *Malleable software: Restoring user agency in a world of locked-down apps*, co-authored by Litt, Josh Horowitz, van Hardenberg, and Todd Matthews — a manifesto arguing that mass-produced apps are too rigid, that modification should be routine at the point of use, and that users deserve a gentle slope from using software to creating it, drawing on HyperCard, Smalltalk, and Dynamicland.

## AI and the move to Notion

Since early 2023 Litt has written about how LLMs change the equation for personal software. In *Malleable software in the age of LLMs* he argued that models can handle the fuzzy parts — extracting structure from messy text — while users keep control of the actual computations; he has been consistent that AI coding alone does not deliver malleability. His 2025 writing got more practical: *Stevens*, a hackable personal assistant built from one SQLite table and cron jobs; *Enough AI copilots! We need AI HUDs*; and *Code like a surgeon*, a workflow that delegates secondary tasks to background agents while keeping the core craft hands-on.

In September 2025 he left Ink & Switch and joined Notion as a design engineer, reuniting with former collaborator Max Schoening. His stated rationale: Notion already embodies "document to app" thinking, is a ready substrate for human–AI co-creation, and has a distribution model — templates shared inside companies and communities — suited to personal software. He has called it the company best positioned to democratize software creation in the age of AI. What he is building there has not been publicly detailed; a Recurse Center talk description mentions early experiments at Notion alongside the HyperCard-to-Embark arc.

Alongside the writing he has kept up a steady interview circuit — Metamuse on bring-your-own-client, localfirst.fm on Riffle and malleable software, Dialectic's long "Software You Can Shape" conversation, Dive Club, and Imbue's Generally Intelligent — which together make his stated philosophy unusually well documented for a working researcher.

## What the record does not settle

The skeleton of this biography — Yale, Panorama, the PhD timeline, the Ink & Switch tenure — rests largely on Litt's own resume, site, newsletter, and self-maintained profiles; independent reporting on him personally is thin. His Wikidata entry is essentially an ORCID stub and there is no Wikipedia article. The status of Patchwork post-departure, and what his design-engineer work at Notion will produce, are open questions the sources pose but do not answer.

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
