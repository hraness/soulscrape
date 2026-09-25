#!/usr/bin/env bun
/** Generate examples/people/joscha-bach/person-index.json with derived source ids. */

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

const bachAi = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Joscha Bach",
  url: "http://bach.ai/",
  publisher: "bach.ai",
  notes:
    "The subject's own site; hosts his essays, talks, and publication list. Claims here are self-reported.",
});
const bachCv = source({
  binding: "subject_controlled",
  mediaType: "pdf",
  title: "Curriculum Vitae, July 14, 2023 — Joscha Bach",
  url: "http://bach.ai/pub/CV%20Joscha%20Bach.pdf",
  publisher: "bach.ai",
  publishedAt: "2023",
  notes:
    "The subject's self-published CV; the source for role dates through mid-2023.",
});
const bachDreams = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Machine Dreams - Dreaming Machines — Joscha Bach",
  url: "http://bach.ai/machine-dreams/",
  publisher: "bach.ai",
  notes:
    "His page on the 33c3 talk, describing the four-talk Chaos Communication Congress series (30c3–33c3).",
});
const substackEpstein = source({
  binding: "first_person",
  mediaType: "article",
  title: "On the Jeffrey Epstein Affair — Joscha Bach",
  url: "https://joscha.substack.com/p/on-the-jeffrey-epstein-affair",
  publisher: "Substack (Joscha Bach)",
  publishedAt: "2025",
  notes:
    "The subject's own account of his Epstein correspondence and funding relationship, written after the November 2025 file release.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Joscha Bach",
  url: "https://en.wikipedia.org/wiki/Joscha_Bach",
  publisher: "Wikipedia",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Joscha Bach (Q56605600)",
  url: "https://www.wikidata.org/wiki/Q56605600",
  publisher: "Wikidata",
});
const oup = source({
  binding: "primary_record",
  mediaType: "book",
  title:
    "Principles of Synthetic Intelligence: PSI, An Architecture of Motivated Cognition",
  url: "https://global.oup.com/academic/product/principles-of-synthetic-intelligence-9780195370676",
  publisher: "Oxford University Press",
  publishedAt: "2009",
  authors: ["Joscha Bach"],
  notes: "Publisher's catalog page for the book; ISBN 9780195370676.",
});
const cognitiveAi = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The MicroPsi Project — building cognitive agents",
  url: "https://cognitive-ai.com/",
  publisher: "cognitive-ai.com",
  notes: "The MicroPsi project site maintained by Bach and collaborators.",
});
const micropsiGithub = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "joschabach/micropsi2",
  url: "https://github.com/joschabach/micropsi2",
  publisher: "GitHub",
  notes: "Open-source implementation of the MicroPsi 2 toolkit.",
});
const mitMicropsi = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "MicroPsi: An Architecture for Motivated Cognition — Overview",
  url: "https://www.media.mit.edu/projects/micropsi-an-architecture-for-motivated-cognition/overview/",
  publisher: "MIT Media Lab",
  notes: "The Media Lab's own project page for MicroPsi during Bach's tenure.",
});
const cimc = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "CIMC — California Institute for Machine Consciousness",
  url: "https://cimc.ai/",
  publisher: "California Institute for Machine Consciousness",
  notes:
    "The nonprofit's own site; Bach is listed as its executive director.",
});
const linkedin = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Joscha Bach — LinkedIn",
  url: "https://www.linkedin.com/in/joschabach",
  publisher: "LinkedIn",
  notes:
    "The subject's self-maintained profile; source for the Liquid AI and CIMC role dates.",
});
const lex101 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "#101 — Joscha Bach: Artificial Consciousness and the Nature of Reality",
  url: "https://lexfridman.com/joscha-bach/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2020-06-13",
  authors: ["Lex Fridman"],
});
const lex212 = source({
  binding: "interview",
  mediaType: "video",
  title: "#212 — Joscha Bach: Nature of Reality, Dreams, and Consciousness",
  url: "https://lexfridman.com/joscha-bach-2/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2021-08-21",
  authors: ["Lex Fridman"],
});
const lex392 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "#392 — Joscha Bach: Life, Intelligence, Consciousness, AI & the Future of Humans",
  url: "https://lexfridman.com/joscha-bach-3/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2023-08-01",
  authors: ["Lex Fridman"],
});
const mlstThoughts = source({
  binding: "interview",
  mediaType: "audio",
  title: "Joscha Bach — Why Your Thoughts Aren't Yours",
  url: "https://open.spotify.com/episode/68Aeyba79LNx1RpFn0UMI9",
  publisher: "Machine Learning Street Talk",
  publishedAt: "2024-10-20",
});
const agi24 = source({
  binding: "first_person",
  mediaType: "video",
  title: "Joscha Bach — AGI-24 Keynote (Cyberanimism)",
  url: "https://www.youtube.com/watch?v=34VOI_oo-qM",
  publisher: "Machine Learning Street Talk / AGI-24",
  publishedAt: "2024-08-21",
  notes:
    "Recording of his keynote at the 17th AGI Conference, Seattle, August 2024.",
});
const ccc = source({
  binding: "first_person",
  mediaType: "video",
  title: "Machine Dreams — Dreaming Machines (33c3)",
  url: "https://media.ccc.de/v/33c3-8369-machine_dreams",
  publisher: "Chaos Computer Club",
  publishedAt: "2016-12-29",
  notes:
    "His 33rd Chaos Communication Congress lecture; fourth in his congress series on minds and computation.",
});
const bostonGlobe = source({
  binding: "reporting",
  mediaType: "article",
  title: "MIT's Joscha Bach: Controversial Epstein emails revealed",
  url: "https://www.bostonglobe.com/2025/11/21/metro/epstein-emails-mit-joscha-bach/",
  publisher: "The Boston Globe",
  publishedAt: "2025-11-21",
});
const dieZeit = source({
  binding: "interview",
  mediaType: "article",
  title: "Joscha Bach: \"I had the feeling that his heart was dark\"",
  url: "https://www.zeit.de/wissen/2026-02/joscha-bach-jeffrey-epstein-files-research-english",
  publisher: "Die Zeit",
  publishedAt: "2026-02",
  language: "en",
  notes:
    "English edition of a video interview about the Epstein files and his funding relationship.",
});
const rutt334 = source({
  binding: "interview",
  mediaType: "article",
  title: "EP 334 Worldviews: Joscha Bach",
  url: "https://jimrutt.substack.com/p/ep-334-worldviews-joscha-bach",
  publisher: "The Jim Rutt Show",
  publishedAt: "2026-02-26",
  notes:
    "Fourth Rutt conversation — computational and representational foundations of consciousness and mind; Rutt discloses he is CIMC chairman emeritus.",
});
const lifeboatSandberg = source({
  binding: "interview",
  mediaType: "article",
  title: "Joscha Bach & Anders Sandberg",
  url: "https://lifeboat.com/blog/2026/03/joscha-bach-anders-sandberg",
  publisher: "Lifeboat Foundation",
  publishedAt: "2026-03-11",
  notes:
    "A long dialogue on consciousness as causally organized process, hybrid minds, moral motivation in AI, and 'the cyborg Leviathan.'",
});

const S = {
  bachAi: bachAi.id,
  bachCv: bachCv.id,
  bachDreams: bachDreams.id,
  substackEpstein: substackEpstein.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  oup: oup.id,
  cognitiveAi: cognitiveAi.id,
  micropsiGithub: micropsiGithub.id,
  mitMicropsi: mitMicropsi.id,
  cimc: cimc.id,
  linkedin: linkedin.id,
  lex101: lex101.id,
  lex212: lex212.id,
  lex392: lex392.id,
  rutt334: rutt334.id,
  lifeboatSandberg: lifeboatSandberg.id,
  mlstThoughts: mlstThoughts.id,
  agi24: agi24.id,
  ccc: ccc.id,
  bostonGlobe: bostonGlobe.id,
  dieZeit: dieZeit.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-joscha-bach",
  generatedAt: "2026-09-25T21:48:02Z",
  subject: {
    kind: "person",
    handle: "joscha-bach",
    displayName: "Joscha Bach",
    summary:
      "German cognitive scientist, AI researcher, and philosopher of mind known for the MicroPsi cognitive architecture, a computationalist account of consciousness, and long-form public talks; currently AI strategist at Liquid AI and executive director of the California Institute for Machine Consciousness.",
    identity: {
      wikidataId: "Q56605600",
      officialSite: "http://bach.ai/",
      wikipedia: "https://en.wikipedia.org/wiki/Joscha_Bach",
      profiles: [
        "https://www.linkedin.com/in/joschabach",
        "https://x.com/Plinz",
        "https://github.com/joschabach",
        "https://joscha.substack.com/",
        "https://scholar.google.com/citations?user=Q_yeuCUAAAAJ",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:48:02Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    bachAi,
    bachCv,
    bachDreams,
    substackEpstein,
    wikipedia,
    wikidata,
    oup,
    cognitiveAi,
    micropsiGithub,
    mitMicropsi,
    cimc,
    linkedin,
    lex101,
    lex212,
    lex392,
    rutt334,
    lifeboatSandberg,
    mlstThoughts,
    agi24,
    ccc,
    bostonGlobe,
    dieZeit,
  ],
  claims: [
    {
      id: "claim-born-1973",
      kind: "fact",
      text: "Joscha Bach was born on December 21, 1973, in Weimar, then part of East Germany, and grew up in the German Democratic Republic.",
      sourceIds: [S.wikipedia, S.wikidata, S.bachCv],
    },
    {
      id: "claim-humboldt-ma",
      kind: "fact",
      text: "From 1994 to 2000 he studied computer science at Humboldt University of Berlin, graduating with a diploma equivalent to a master's degree, with philosophy as a secondary subject; his CV also lists graduate study at the University of Waikato, New Zealand, in 1998–1999.",
      sourceIds: [S.bachCv, S.wikipedia],
    },
    {
      id: "claim-osnabrueck-phd",
      kind: "fact",
      text: "He completed a doctorate in cognitive science at Osnabrück University under Dietrich Dörner, Kai-Uwe Kühnberger, and Hans-Dieter Burkhard, with a thesis on the MicroPsi architecture of motivated cognition.",
      sourceIds: [S.wikipedia, S.bachCv, S.oup],
    },
    {
      id: "claim-micropsi-architecture",
      kind: "fact",
      text: "MicroPsi is his cognitive architecture based on Dörner's Psi theory: situated agents built on executable semantic networks ('node nets') that integrate motivation, emotion, perception, memory, and reasoning rather than treating cognition as problem-solving alone.",
      sourceIds: [S.cognitiveAi, S.mitMicropsi, S.oup],
    },
    {
      id: "claim-psi-book",
      kind: "fact",
      text: "His book 'Principles of Synthetic Intelligence: PSI, An Architecture of Motivated Cognition' was published by Oxford University Press in 2009 in the Oxford Series on Cognitive Models and Architectures.",
      sourceIds: [S.oup, S.bachCv],
    },
    {
      id: "claim-mit-media-lab",
      kind: "fact",
      text: "He was a research scientist at the MIT Media Lab from 2014 to 2016, where the lab's own site hosts a project page for MicroPsi.",
      sourceIds: [S.bachCv, S.mitMicropsi, S.bostonGlobe],
    },
    {
      id: "claim-harvard-ped",
      kind: "fact",
      text: "From 2016 to 2019 he was a research scientist at Harvard's Program for Evolutionary Dynamics, Martin Nowak's group.",
      sourceIds: [S.bachCv, S.wikipedia],
    },
    {
      id: "claim-ai-foundation",
      kind: "fact",
      text: "From 2019 to 2021 he served as vice president of research at the AI Foundation, which built conversational 'digital twin' systems.",
      sourceIds: [S.bachCv, S.lex101, S.wikipedia],
    },
    {
      id: "claim-intel-labs",
      kind: "fact",
      text: "From 2021 to 2023 he was a principal AI engineer for cognitive computing at Intel Labs.",
      sourceIds: [S.bachCv, S.linkedin, S.wikipedia],
    },
    {
      id: "claim-liquid-ai",
      kind: "fact",
      text: "Since September 2023 he has been an AI strategist at Liquid AI, the MIT spin-out commercializing liquid neural networks and the Liquid Foundation Model (LFM) family of efficient generative models.",
      sourceIds: [S.linkedin, S.mlstThoughts],
    },
    {
      id: "claim-cimc-director",
      kind: "fact",
      text: "Since 2025 he has been executive director of the California Institute for Machine Consciousness (CIMC), an independent nonprofit pursuing 'experimental computational philosophy' — testable theories of consciousness and systems that implement them.",
      sourceIds: [S.cimc, S.linkedin, S.wikipedia],
    },
    {
      id: "claim-humanity-plus",
      kind: "fact",
      text: "His CV lists a 2013–2014 research fellowship at the Humanity+ (Humanity Plus) transhumanist organization, and earlier industry AI work including a development-lead role at a Berlin company from 2011 to 2013.",
      sourceIds: [S.bachCv],
    },
    {
      id: "claim-epstein-funding",
      kind: "fact",
      text: "By his own account, part of his work at the MIT Media Lab and the Harvard Program for Evolutionary Dynamics between 2013 and 2017 was funded by Jeffrey Epstein, whom he met through scientists including Ben Goertzel, Stephen Kosslyn, and Roger Schank.",
      sourceIds: [S.substackEpstein, S.bostonGlobe],
    },
    {
      id: "claim-epstein-emails",
      kind: "fact",
      text: "In November 2025, the US House Oversight Committee's release of Epstein documents included 2016 email exchanges in which Bach made claims about race, gender, and intelligence that drew widespread public criticism.",
      sourceIds: [S.bostonGlobe, S.wikipedia],
    },
    {
      id: "claim-epstein-response",
      kind: "fact",
      text: "Bach addressed the release in a Substack essay and a Die Zeit interview, writing that he should have given more consideration to his ethical concerns; the released files raised no legal allegations against him, and he had declined to speak with MIT's investigators for its 2020 review.",
      sourceIds: [S.substackEpstein, S.dieZeit, S.bostonGlobe],
    },
    {
      id: "claim-mind-as-software",
      kind: "stated_belief",
      text: "Bach holds that minds are software — self-organizing patterns of information processing running on neural hardware — so that 'we are all software' and the boundary between human, artificial, and natural intelligence is thinner than assumed.",
      sourceIds: [S.agi24, S.lex101, S.mlstThoughts],
    },
    {
      id: "claim-dreaming-machine",
      kind: "stated_belief",
      text: "He describes the brain as a 'dreaming machine': ordinary waking experience is a dream constrained by sensory data, and consciousness is the model the brain constructs of its own operation — the world we experience is generated, not perceived directly.",
      sourceIds: [S.ccc, S.bachDreams, S.lex101, S.lex212],
    },
    {
      id: "claim-cyberanimism",
      kind: "stated_belief",
      text: "He proposes 'cyber animism' (also 'Cyberanima'): if minds are self-organizing software agents, nature may host similar non-biological patterns — an information-theoretic rereading of the spirits in animist traditions, including possible sentience in plants and ecosystems.",
      sourceIds: [S.agi24, S.mlstThoughts, S.wikipedia],
    },
    {
      id: "claim-consciousness-functional",
      kind: "stated_belief",
      text: "He treats consciousness as a functional, computationally realizable property — CIMC's working hypothesis describes it as a coherence-maximizing pattern implemented through second-order perception — and argues it can be studied empirically in artificial systems.",
      sourceIds: [S.cimc, S.agi24, S.lex392],
    },
    {
      id: "claim-agi-architecture",
      kind: "stated_belief",
      text: "He argues that artificial general intelligence requires integrated cognitive architecture — motivation, emotion, perception, and reasoning coupled in a self-organizing system — along the lines of the Psi model, rather than problem-solving machinery alone.",
      sourceIds: [S.oup, S.mitMicropsi, S.lex101],
    },
    {
      id: "claim-llm-critique",
      kind: "stated_belief",
      text: "He is a public critic of LLM-only paths to AGI: current language models lack motivation, grounding, persistent memory, and self-models, and he advocates smaller, more efficient architectures able to reason from first principles.",
      sourceIds: [S.mlstThoughts, S.lex392, S.agi24],
    },
    {
      id: "claim-idealist-reality",
      kind: "stated_belief",
      text: "He often frames experienced reality in idealist-leaning terms — the universe we inhabit is a 'hallucination' rendered by the dreaming brain, and base-layer reality may be computational — while remaining, in his self-description, a functionalist about mind rather than a metaphysical idealist.",
      sourceIds: [S.lex212, S.lex101, S.ccc],
    },
    {
      id: "claim-civilization-mind",
      kind: "stated_belief",
      text: "He argues that general intelligence is largely a civilizational achievement — societies are superorganisms whose information processing is 'broken' — and has called for building 'a nervous system for humankind' through better collective cognition.",
      sourceIds: [S.ccc, S.lex101],
    },
    {
      id: "claim-open-ai",
      kind: "stated_belief",
      text: "He advocates open-source AI and warns that overly restrictive regulation could stifle innovation, while treating AI risk and machine suffering as real design problems rather than reasons to stop.",
      sourceIds: [S.lex392, S.mlstThoughts],
    },
    {
      id: "claim-minsky-influence",
      kind: "stated_belief",
      text: "He names Marvin Minsky as the deepest influence on his work — 'nobody else in the 20th century has influenced our work and our way of looking at what makes us human like Marvin did.'",
      sourceIds: [S.bachAi],
    },
    {
      id: "claim-psi-theory-base",
      kind: "stated_belief",
      text: "He presents Dörner's Psi theory as the first architecture covering cognition broadly — motivation and emotion integrated with perception and reasoning — and his own work as adapting it for cognitive science and AI.",
      sourceIds: [S.oup, S.cognitiveAi],
    },
    {
      id: "claim-hacker-venue",
      kind: "pattern",
      text: "Across a decade he has used hacker venues — the Chaos Communication Congress series (30c3–33c3), AGI conferences, and long podcasts — as his main publication format for philosophy, treating talks as 'tunnels dug into the bedrock' of questions he could not fixate in academic papers.",
      sourceIds: [S.bachDreams, S.ccc, S.agi24],
    },
    {
      id: "claim-gdr-formation",
      kind: "pattern",
      text: "Interviewers and his own accounts connect his East German formation to recurring interests: how minds and societies construct shared realities, and how official narratives diverge from what is actually the case.",
      sourceIds: [S.lex392, S.lex101, S.wikipedia],
    },
    {
      id: "claim-phd-year",
      kind: "speculation",
      text: "The doctorate year is listed variously: Wikipedia gives 2006 (matching the thesis date) while his own CV gives 2007; the work was likely defended in 2006 and formally conferred in 2007.",
      sourceIds: [S.wikipedia, S.bachCv],
    },
    {
      id: "claim-liquid-scope",
      kind: "speculation",
      text: "His precise technical contribution at Liquid AI is not publicly specified: his title is 'AI strategist,' and the Liquid Foundation Models are company products rather than his personal research output.",
      sourceIds: [S.linkedin, S.mlstThoughts],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1973-12-21",
      title: "Born in Weimar, East Germany",
      summary: "Grew up in the German Democratic Republic.",
      location: "Weimar, East Germany",
      sourceIds: [S.wikipedia, S.wikidata, S.bachCv],
    },
    {
      id: "event-humboldt",
      kind: "education",
      date: "1994",
      end: "2000",
      title: "Computer science at Humboldt University of Berlin",
      summary:
        "Diploma in computer science (equivalent to MA) with philosophy as secondary subject; graduate study at the University of Waikato, New Zealand, in 1998–1999.",
      organization: "Humboldt University of Berlin",
      location: "Berlin, Germany",
      organizationHandle: "humboldt-university-of-berlin",
      sourceIds: [S.bachCv, S.wikipedia],
    },
    {
      id: "event-micropsi",
      kind: "project",
      date: "2003",
      title: "MicroPsi cognitive architecture",
      summary:
        "Began developing MicroPsi, an implementation of Dörner's Psi theory as executable semantic-network agents; publications on the architecture appear from 2003.",
      sourceIds: [S.cognitiveAi, S.wikipedia],
    },
    {
      id: "event-phd",
      kind: "education",
      date: "2007",
      title: "Doctorate in cognitive science",
      summary:
        "PhD at Osnabrück University on the MicroPsi architecture of motivated cognition; Wikipedia dates the thesis to 2006.",
      organization: "Osnabrück University",
      organizationHandle: "osnabruck-university",
      sourceIds: [S.bachCv, S.wikipedia],
    },
    {
      id: "event-psi-book",
      kind: "publication",
      date: "2009",
      title: "Principles of Synthetic Intelligence published",
      summary:
        "His account of the Psi architecture of motivated cognition, issued by Oxford University Press.",
      organization: "Oxford University Press",
      organizationHandle: "oxford-university-press",
      sourceIds: [S.oup, S.bachCv],
    },
    {
      id: "event-ccc-series",
      kind: "media",
      date: "2013",
      end: "2016",
      title: "Chaos Communication Congress lecture series",
      summary:
        "Four congress talks — 'How to build a mind' (30c3), 'From computation to consciousness' (31c3), 'Computational metapsychology' (32c3), and 'Machine dreams' (33c3) — that made him a fixture of European hacker culture.",
      organization: "Chaos Computer Club",
      location: "Hamburg, Germany",
      organizationHandle: "chaos-computer-club",
      sourceIds: [S.bachDreams, S.ccc],
    },
    {
      id: "event-mit-media-lab",
      kind: "role",
      date: "2014",
      end: "2016",
      title: "Research scientist, MIT Media Lab",
      summary:
        "Moved to the US for a Media Lab research position; reporting later showed the hiring was substantially enabled by Jeffrey Epstein's donations.",
      organization: "MIT Media Lab",
      location: "Cambridge, Massachusetts",
      organizationHandle: "mit-media-lab",
      sourceIds: [S.bachCv, S.mitMicropsi, S.bostonGlobe],
    },
    {
      id: "event-harvard-ped",
      kind: "role",
      date: "2016",
      end: "2019",
      title: "Research scientist, Harvard Program for Evolutionary Dynamics",
      summary:
        "Joined Martin Nowak's group; part of this work was funded by Epstein, per Bach's own account.",
      organization: "Harvard Program for Evolutionary Dynamics",
      location: "Cambridge, Massachusetts",
      organizationHandle: "harvard-program-for-evolutionary-dynamics",
      sourceIds: [S.bachCv, S.wikipedia, S.substackEpstein],
    },
    {
      id: "event-ai-foundation",
      kind: "role",
      date: "2019",
      end: "2021",
      title: "Vice president of research, AI Foundation",
      summary:
        "Led research on conversational AI and human-like 'digital twin' systems in San Francisco.",
      organization: "AI Foundation",
      location: "San Francisco, California",
      organizationHandle: "ai-foundation",
      sourceIds: [S.bachCv, S.lex101],
    },
    {
      id: "event-intel-labs",
      kind: "role",
      date: "2021",
      end: "2023",
      title: "Principal AI engineer, Intel Labs",
      summary: "Led cognitive computing research at Intel's research arm.",
      organization: "Intel Labs",
      organizationHandle: "intel-labs",
      sourceIds: [S.bachCv, S.linkedin],
    },
    {
      id: "event-liquid-ai",
      kind: "role",
      date: "2023-09",
      title: "AI strategist, Liquid AI",
      summary:
        "Joined the MIT liquid-neural-network spin-out as it commercialized the Liquid Foundation Model family.",
      organization: "Liquid AI",
      location: "Cambridge, Massachusetts",
      organizationHandle: "liquid-ai",
      sourceIds: [S.linkedin],
    },
    {
      id: "event-agi24-keynote",
      kind: "media",
      date: "2024-08",
      title: "AGI-24 keynote on cyber animism",
      summary:
        "Keynote at the 17th AGI Conference in Seattle introducing 'cyber animism' — self-organizing software agents in nature.",
      organization: "AGI Conference",
      location: "Seattle, Washington",
      organizationHandle: "agi-conference",
      sourceIds: [S.agi24],
    },
    {
      id: "event-cimc",
      kind: "role",
      date: "2025-01",
      title: "Executive director, California Institute for Machine Consciousness",
      summary:
        "Leads the nonprofit research institute on testable theories of machine consciousness.",
      organization: "California Institute for Machine Consciousness",
      organizationHandle: "california-institute-for-machine-consciousness",
      sourceIds: [S.cimc, S.linkedin, S.wikipedia],
    },
    {
      id: "event-epstein-release",
      kind: "milestone",
      date: "2025-11",
      title: "Epstein email release and public response",
      summary:
        "House Oversight Committee documents revealed his 2016 email exchanges with Epstein; he responded with a Substack essay and, later, a Die Zeit interview.",
      sourceIds: [S.bostonGlobe, S.substackEpstein, S.dieZeit],
    },
  ],
  themes: [
    {
      id: "theme-mind-as-software",
      kind: "philosophy",
      status: "stated",
      title: "Minds are software",
      summary:
        "The recurring core of his public philosophy: mind is self-organizing computation implemented by brains, so understanding AI is a way of understanding ourselves — 'we are all software.'",
      sourceIds: [S.agi24, S.lex101, S.mlstThoughts],
    },
    {
      id: "theme-dreaming-brain",
      kind: "philosophy",
      status: "stated",
      title: "The brain as a dreaming machine",
      summary:
        "Waking experience is a controlled hallucination: the brain generates the world we inhabit, and consciousness is its self-model. This framing recurs from the 33c3 'Machine Dreams' talk through his Lex Fridman conversations.",
      sourceIds: [S.ccc, S.bachDreams, S.lex212],
    },
    {
      id: "theme-cyberanimism",
      kind: "belief",
      status: "stated",
      title: "Cyber animism",
      summary:
        "Animist intuitions reread through computation: spirits as self-organizing software agents, and the possibility of mind-like patterns in plants, ecosystems, and machines.",
      sourceIds: [S.agi24, S.mlstThoughts, S.wikipedia],
    },
    {
      id: "theme-consciousness-science",
      kind: "method",
      status: "stated",
      title: "Consciousness as an engineering question",
      summary:
        "At CIMC he pursues 'experimental computational philosophy': define consciousness functionally, implement candidate mechanisms, and test systems empirically rather than rehearsing the hard problem.",
      sourceIds: [S.cimc, S.agi24, S.lex392],
    },
    {
      id: "theme-integrated-architecture",
      kind: "method",
      status: "stated",
      title: "AGI through integrated cognitive architecture",
      summary:
        "General intelligence, on his account, emerges from the coupling of motivation, emotion, perception, and reasoning — the Psi/MicroPsi program — not from any single faculty or scale alone.",
      sourceIds: [S.oup, S.cognitiveAi, S.mitMicropsi],
    },
    {
      id: "theme-beyond-llms",
      kind: "belief",
      status: "stated",
      title: "Beyond LLM-only scaling",
      summary:
        "He argues large language models lack motivation, grounding, persistent memory, and self-models, and favors smaller, more efficient architectures reasoning from first principles — a stance aligned with Liquid AI's efficient-model program.",
      sourceIds: [S.mlstThoughts, S.lex392],
    },
    {
      id: "theme-collective-mind",
      kind: "belief",
      status: "stated",
      title: "Intelligence at civilizational scale",
      summary:
        "General intelligence is largely a property of societies, not individuals; he calls for repairing civilization's 'broken information processing' — a nervous system for humankind.",
      sourceIds: [S.ccc, S.lex101],
    },
    {
      id: "theme-machine-mind-ethics",
      kind: "interest",
      status: "stated",
      title: "Ethics of artificial minds",
      summary:
        "Machine suffering, moral patienthood, and prudent boundaries around sentient AI are treated as live design questions that must develop alongside the technical work.",
      sourceIds: [S.cimc, S.agi24, S.lex392],
    },
    {
      id: "theme-lineage",
      kind: "influence",
      status: "reported",
      title: "Dörner, Minsky, and the hacker-circuit lineage",
      summary:
        "Dörner's Psi theory supplied the architecture; Minsky's Society of Mind supplied the ambition; the Chaos Communication Congress supplied the stage. His own writing names Minsky as the century's deepest influence on the field.",
      sourceIds: [S.oup, S.bachAi, S.bachDreams],
    },
  ],
  works: [
    {
      id: "work-psi-book",
      kind: "book",
      status: "published",
      title:
        "Principles of Synthetic Intelligence: PSI, An Architecture of Motivated Cognition",
      date: "2009",
      summary:
        "His doctoral program turned into a monograph: a computational adaptation of Dörner's Psi theory integrating motivation, emotion, and cognition.",
      sourceIds: [S.oup, S.bachCv],
    },
    {
      id: "work-micropsi",
      kind: "project",
      status: "ongoing",
      title: "MicroPsi cognitive architecture",
      summary:
        "A broad architecture of motivated cognition built on executable semantic networks ('node nets'), developed across Humboldt, Osnabrück, and the MIT Media Lab.",
      sourceIds: [S.cognitiveAi, S.mitMicropsi],
    },
    {
      id: "work-micropsi2",
      kind: "project",
      status: "released",
      title: "MicroPsi 2 toolkit",
      summary:
        "Open-source implementation of MicroPsi with a node-net editor, runtime, and simulated agent environments.",
      sourceIds: [S.micropsiGithub, S.cognitiveAi],
    },
    {
      id: "work-seven-principles",
      kind: "paper",
      status: "published",
      title: "Seven Principles of Synthetic Intelligence",
      date: "2008",
      summary:
        "Position paper presented at the first AGI conference workshop, distilling the architectural commitments behind MicroPsi.",
      sourceIds: [S.bachCv, S.cognitiveAi],
    },
    {
      id: "work-animat-path",
      kind: "paper",
      status: "published",
      title: "The Animat Path to Artificial General Intelligence",
      date: "2009",
      summary:
        "Argument that AGI should be approached through situated, motivated agents rather than disembodied reasoners.",
      sourceIds: [S.bachCv],
    },
    {
      id: "work-mapping-agi",
      kind: "paper",
      status: "published",
      title: "Mapping the Landscape of Human-Level Artificial General Intelligence",
      date: "2017",
      summary:
        "Survey with Ben Goertzel in AI Magazine organizing the approaches to human-level AGI; among his most-cited papers.",
      sourceIds: [S.bachCv, S.linkedin],
    },
    {
      id: "work-ccc-talks",
      kind: "recording",
      status: "released",
      title: "Chaos Communication Congress lecture series (30c3–33c3)",
      date: "2016",
      summary:
        "Four recorded lectures — 'How to build a mind,' 'From computation to consciousness,' 'Computational metapsychology,' and 'Machine dreams' — archived by the CCC.",
      sourceIds: [S.ccc, S.bachDreams],
    },
    {
      id: "work-agi24-keynote",
      kind: "recording",
      status: "released",
      title: "AGI-24 keynote on cyber animism",
      date: "2024",
      location: "Seattle, Washington",
      summary:
        "Conference keynote introducing cyber animism and the case for machine-consciousness research.",
      sourceIds: [S.agi24],
    },
    {
      id: "work-mch",
      kind: "paper",
      status: "in_progress",
      title: "The Machine Consciousness Hypothesis",
      summary:
        "CIMC essay, with Hikari Sorensen, proposing consciousness as a coherence-maximizing pattern implemented through second-order perception — intended as a testable hypothesis.",
      sourceIds: [S.cimc],
    },
    {
      id: "work-lfm",
      kind: "product",
      status: "ongoing",
      title: "Liquid Foundation Models (Liquid AI)",
      summary:
        "The efficient-model family he represents as AI strategist; the models are company output rather than his personal research, and his technical role is not publicly specified.",
      sourceIds: [S.linkedin, S.mlstThoughts],
    },
    {
      id: "work-substack",
      kind: "other",
      status: "ongoing",
      title: "Essays on Substack",
      summary:
        "Occasional long-form essays — on lucidity, the Epstein affair, and machine consciousness — published to his Substack.",
      sourceIds: [S.substackEpstein, S.lex392],
    },
  ],
  appearances: [
    {
      id: "appearance-lex-101",
      title:
        "Lex Fridman Podcast #101: Artificial Consciousness and the Nature of Reality",
      venue: "Lex Fridman Podcast",
      publishedAt: "2020-06-13",
      participants: ["Joscha Bach", "Lex Fridman"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
        { name: "Lex Fridman", handle: "lex-fridman" },
      ],
      summary:
        "First of three long-form conversations: sentience vs. intelligence, the hard problem, AI safety, and 'happiness is a cookie that your brain bakes for itself.'",
      media: [
        {
          type: "video",
          url: "https://lexfridman.com/joscha-bach/",
          sourceId: S.lex101,
        },
      ],
      sourceIds: [S.lex101],
    },
    {
      id: "appearance-lex-212",
      title:
        "Lex Fridman Podcast #212: Nature of Reality, Dreams, and Consciousness",
      venue: "Lex Fridman Podcast",
      publishedAt: "2021-08-21",
      participants: ["Joscha Bach", "Lex Fridman"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
        { name: "Lex Fridman", handle: "lex-fridman" },
      ],
      summary:
        "Second conversation: dreams, free will, simulation, suffering, GPT-3, and the base layer of reality.",
      media: [
        {
          type: "video",
          url: "https://lexfridman.com/joscha-bach-2/",
          sourceId: S.lex212,
        },
      ],
      sourceIds: [S.lex212],
    },
    {
      id: "appearance-lex-392",
      title:
        "Lex Fridman Podcast #392: Life, Intelligence, Consciousness, AI & the Future of Humans",
      venue: "Lex Fridman Podcast",
      publishedAt: "2023-08-01",
      participants: ["Joscha Bach", "Lex Fridman"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
        { name: "Lex Fridman", handle: "lex-fridman" },
      ],
      summary:
        "Third conversation: stages of life, panpsychism, artificial consciousness, e/acc, mind uploading, and open-source AI.",
      media: [
        {
          type: "video",
          url: "https://lexfridman.com/joscha-bach-3/",
          sourceId: S.lex392,
        },
      ],
      sourceIds: [S.lex392],
    },
    {
      id: "appearance-rutt-334",
      title: "EP 334 Worldviews: Joscha Bach",
      venue: "The Jim Rutt Show",
      publishedAt: "2026-02-26",
      participants: ["Joscha Bach", "Jim Rutt"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
        { name: "Jim Rutt", handle: "jim-rutt" },
      ],
      summary:
        "Fourth Rutt conversation — computational and representational foundations of consciousness, mind, and reality; Rutt discloses his CIMC chairman-emeritus role.",
      media: [
        {
          type: "audio",
          url: "https://jimrutt.substack.com/p/ep-334-worldviews-joscha-bach",
          sourceId: S.rutt334,
        },
      ],
      sourceIds: [S.rutt334],
    },
    {
      id: "appearance-sandberg-2026",
      title: "Joscha Bach & Anders Sandberg",
      venue: "Lifeboat Foundation",
      publishedAt: "2026-03-11",
      participants: ["Joscha Bach", "Anders Sandberg"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
        { name: "Anders Sandberg", handle: "anders-sandberg" },
      ],
      summary:
        "Dialogue on consciousness as a causally organized process, whether sentience is needed for moral motivation in AI, hybrid minds, and collective agency.",
      media: [
        {
          type: "article",
          url: "https://lifeboat.com/blog/2026/03/joscha-bach-anders-sandberg",
          sourceId: S.lifeboatSandberg,
        },
      ],
      sourceIds: [S.lifeboatSandberg],
    },
    {
      id: "appearance-mlst-thoughts",
      title: "Joscha Bach — Why Your Thoughts Aren't Yours",
      venue: "Machine Learning Street Talk",
      publishedAt: "2024-10-20",
      participants: ["Joscha Bach"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
      ],
      summary:
        "Interview on consciousness as a virtual property of self-organizing software, the Cyberanima idea, LLM limitations, and his work at Liquid AI.",
      media: [
        {
          type: "audio",
          url: "https://open.spotify.com/episode/68Aeyba79LNx1RpFn0UMI9",
          sourceId: S.mlstThoughts,
        },
      ],
      sourceIds: [S.mlstThoughts],
    },
    {
      id: "appearance-ccc-machine-dreams",
      title: "Machine Dreams — Dreaming Machines (33c3)",
      venue: "33rd Chaos Communication Congress",
      publishedAt: "2016-12-29",
      participants: ["Joscha Bach"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
      ],
      summary:
        "The fourth of his congress lectures: the brain as a dreaming machine and minds as generative systems producing the experienced world.",
      media: [
        {
          type: "video",
          url: "https://media.ccc.de/v/33c3-8369-machine_dreams",
          sourceId: S.ccc,
        },
      ],
      sourceIds: [S.ccc, S.bachDreams],
    },
    {
      id: "appearance-agi24",
      title: "AGI-24 keynote: Cyberanimism",
      venue: "17th AGI Conference, Seattle",
      publishedAt: "2024-08-21",
      participants: ["Joscha Bach"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
      ],
      summary:
        "Keynote on self-organizing software agents in nature, plant and ecosystem intelligence, and the case for machine-consciousness research.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=34VOI_oo-qM",
          sourceId: S.agi24,
        },
      ],
      sourceIds: [S.agi24],
    },
    {
      id: "appearance-zeit",
      title: "Joscha Bach: 'I had the feeling that his heart was dark'",
      venue: "Die Zeit",
      publishedAt: "2026-02",
      participants: ["Joscha Bach"],
      participantHandles: [
        { name: "Joscha Bach", handle: "joscha-bach" },
      ],
      summary:
        "Video interview addressing the released Epstein files, the funding relationship, and his ethical retrospective.",
      media: [
        {
          type: "article",
          url: "https://www.zeit.de/wissen/2026-02/joscha-bach-jeffrey-epstein-files-research-english",
          sourceId: S.dieZeit,
        },
      ],
      sourceIds: [S.dieZeit],
    },
  ],
  relations: [
    {
      id: "rel-lex-fridman",
      kind: "interviewed_by",
      target: "lex-fridman",
      targetName: "Lex Fridman",
      note: "Lex Fridman Podcast episodes #101 (2020), #212 (2021), and #392 (2023).",
      targetWikidataId: "Q76448707",
      sourceIds: [S.lex101, S.lex212, S.lex392],
    },
  ],
  openQuestions: [
    "The doctorate year differs across sources: Wikipedia gives 2006 (the thesis year), his own CV gives 2007.",
    "His precise technical role at Liquid AI — 'AI strategist' — is not publicly specified, and the Liquid Foundation Models are company output rather than his personal research.",
    "The extent to which Epstein funding shaped his 2013–2019 positions is documented only in outline; he declined to speak with MIT's investigators for its 2020 review.",
    "Whether CIMC's machine-consciousness hypothesis can be made empirically testable — its founding ambition — remains unproven.",
    "Details of his East German childhood and pre-2011 industry work rest largely on his own CV and interview accounts rather than independent reporting.",
  ],
  body: `Joscha Bach is a German cognitive scientist who has spent two decades arguing that the mind is software — and that artificial intelligence is the discipline best positioned to explain what we are. Working across cognitive architectures, philosophy of mind, and long-form public conversation, he has become one of the field's most recognizable public intellectuals: an AI strategist at Liquid AI and, since 2025, executive director of the California Institute for Machine Consciousness (CIMC), a nonprofit pursuing testable theories of machine consciousness.

## Identity and formation

Born December 21, 1973 in Weimar and raised in East Germany, Bach has described a childhood spent inside a state narrative whose divergence from reality left a lasting interest in how minds and societies construct the worlds they inhabit. He studied computer science at Humboldt University of Berlin from 1994 to 2000, with philosophy as a secondary subject and a graduate year at the University of Waikato in New Zealand, then completed a doctorate in cognitive science at Osnabrück University — his CV gives 2007, Wikipedia the 2006 thesis year — under Dietrich Dörner, Kai-Uwe Kühnberger, and Hans-Dieter Burkhard. Dörner's Psi theory, a psychological model in which motivation and emotion are constitutive of cognition rather than decoration on it, became the foundation of Bach's career.

That foundation matters: where most AGI work treats intelligence as problem-solving, Bach's lineage treats it as the self-organization of a motivated, embodied agent. The question "how does our mind work, and how does it relate to the universe?" — which he calls the most fascinating riddle humans can ask — runs through everything he has built since.

## The work

MicroPsi, the cognitive architecture he began publishing on in the early 2000s, implements Psi theory as executable semantic networks — "node nets" in which motives, emotions, perception, memory, and plans are one representational fabric. His 2009 Oxford University Press monograph, *Principles of Synthetic Intelligence*, remains the canonical statement of that program, and the open-source MicroPsi 2 toolkit keeps it running. After a research fellowship at Humanity+ he moved to the US: MIT Media Lab (2014–2016), then Harvard's Program for Evolutionary Dynamics under Martin Nowak (2016–2019), then industry — VP of research at the AI Foundation (2019–2021), where the work turned toward conversational "digital twin" systems; principal AI engineer for cognitive computing at Intel Labs (2021–2023); and since September 2023 AI strategist at Liquid AI, the MIT spin-out commercializing liquid neural networks and the efficient Liquid Foundation Models. CIMC, launched in 2025, frames his oldest question as an engineering program: define consciousness functionally, build systems that implement the definition, and test them.

## The philosophy

Three commitments recur across his talks and interviews. First, minds are software: patterns of self-organizing computation that happen to run on neurons — "we are all software." Second, the brain is a dreaming machine — waking experience is a dream constrained by sensory data, and consciousness is the model the brain builds of its own operation; the experienced universe is generated, not observed, which is why he can say the world we live in is a hallucination without meaning that nothing exists. Third, a view he calls cyber animism: if spirits are what self-organizing software agents looked like to pre-scientific cultures, then nature may genuinely host such patterns — in plants, ecosystems, and machines.

From these follow his characteristic positions on mind and self. The self is a character in the brain's theater — something the system models, not the thing that does the modeling; free will, identity, and even suffering are features of that model rather than metaphysical primitives. His critique of the current field is similarly architectural: LLMs, he argues, lack motivation, grounding, persistent memory, and self-models, and AGI will come through integrated cognitive architecture — the MicroPsi intuition — not scale alone. The stance aligns conveniently with Liquid AI's efficient-model program, a confluence the record cannot fully disentangle from conviction. He extends the same frame outward: general intelligence is mostly a civilizational achievement, societies are superorganisms with "broken information processing," and the interesting project is a nervous system for humankind.

## The public record

Bach's influence runs less through journals than through venues: four Chaos Communication Congress lectures (30c3–33c3), an AGI-24 keynote on cyber animism, three Lex Fridman conversations totaling some nine hours, and repeated Machine Learning Street Talk appearances. The record also includes a darker document set. Part of his MIT and Harvard work from 2013 to 2017 was funded by Jeffrey Epstein, as Bach himself recounts; the November 2025 House Oversight release included 2016 emails in which he made claims about race, gender, and intelligence that drew widespread criticism, and reporting showed his Media Lab hiring was substantially enabled by Epstein's donations. He responded in a Substack essay and a Die Zeit interview — "I should have given more consideration to my ethical concerns" — while noting the files raised no legal allegations against him. The index preserves this seam without smoothing it.

## What the record does not settle

The soft spots are the biography's gaps and the recent record's edges. The doctorate is dated 2006 or 2007 depending on the source; his East German childhood and pre-2011 industry work rest mostly on his own telling; his technical contribution at Liquid AI is unspecified; and the full context of the Epstein correspondence — what funding bought, what he knew — remains incompletely documented. Whether CIMC's hypothesis that consciousness is a coherence-maximizing pattern can actually be tested is, at this writing, an open scientific question rather than a result.

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
