#!/usr/bin/env bun
/** Generate examples/people/stephen-wolfram/person-index.json with derived source ids. */

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

const about = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About Stephen Wolfram",
  url: "https://www.stephenwolfram.com/about/",
  publisher: "stephenwolfram.com",
  notes: "The subject's own biography page; claims here are self-reported.",
});
const lifeInTech = source({
  binding: "first_person",
  mediaType: "article",
  title: "My Life in Technology—As Told at the Computer History Museum",
  url: "https://writings.stephenwolfram.com/2016/04/my-life-in-technology-as-told-at-the-computer-history-museum/",
  publisher: "Stephen Wolfram Writings",
  publishedAt: "2016-04",
  notes: "First-person life narrative based on his Computer History Museum talk.",
});
const personalAnalytics = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Personal Analytics of My Life",
  url: "https://writings.stephenwolfram.com/2012/03/the-personal-analytics-of-my-life/",
  publisher: "Stephen Wolfram Writings",
  publishedAt: "2012-03-08",
});
const productiveLife = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Seeking the Productive Life: Some Details of My Personal Infrastructure",
  url: "https://writings.stephenwolfram.com/2019/02/seeking-the-productive-life-some-details-of-my-personal-infrastructure/",
  publisher: "Stephen Wolfram Writings",
  publishedAt: "2019-02-21",
});
const physicsLaunch = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Finally We May Have a Path to the Fundamental Theory of Physics… and It's Beautiful",
  url: "https://writings.stephenwolfram.com/2020/04/finally-we-may-have-a-path-to-the-fundamental-theory-of-physics-and-its-beautiful/",
  publisher: "Stephen Wolfram Writings",
  publishedAt: "2020-04-14",
});
const ruliadEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Concept of the Ruliad",
  url: "https://writings.stephenwolfram.com/2021/11/the-concept-of-the-ruliad./",
  publisher: "Stephen Wolfram Writings",
  publishedAt: "2021-11-10",
  notes:
    "The canonical slug ends in a literal period carried over from the post's title.",
});
const chatgptEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "What Is ChatGPT Doing … and Why Does It Work?",
  url: "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/",
  publisher: "Stephen Wolfram Writings",
  publishedAt: "2023-02-14",
  notes: "The essay was expanded into a Wolfram Media book in March 2023.",
});
const nksOnline = source({
  binding: "subject_controlled",
  mediaType: "book",
  title: "A New Kind of Science | Online",
  url: "https://www.wolframscience.com/nks/",
  publisher: "Wolfram Media",
  publishedAt: "2002-05-14",
  notes: "Full text of the 2002 book, published online by the subject's imprint.",
});
const wolframphysics = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Wolfram Physics Project",
  url: "https://www.wolframphysics.org/",
  publisher: "Wolfram Physics Project",
});
const wolframLanguage = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Wolfram Language",
  url: "https://www.wolfram.com/language/",
  publisher: "Wolfram",
});
const wolframAlpha = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Wolfram|Alpha: Making the world's knowledge computable",
  url: "https://www.wolframalpha.com/",
  publisher: "Wolfram|Alpha",
});
const statmechCA = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Statistical mechanics of cellular automata",
  url: "https://doi.org/10.1103/RevModPhys.55.601",
  publisher: "Reviews of Modern Physics",
  publishedAt: "1983-07-01",
  authors: ["Stephen Wolfram"],
});
const physPaper = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "A Class of Models with the Potential to Represent Fundamental Physics",
  url: "https://doi.org/10.25088/ComplexSystems.29.2.107",
  publisher: "Complex Systems",
  publishedAt: "2020",
  authors: ["Stephen Wolfram"],
});
const macarthur = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Stephen Wolfram — MacArthur Fellows, Class of June 1981",
  url: "https://www.macfound.org/fellows/class-of-june-1981/stephen-wolfram",
  publisher: "MacArthur Foundation",
  publishedAt: "1981-06-01",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Stephen Wolfram",
  url: "https://en.wikipedia.org/wiki/Stephen_Wolfram",
  publisher: "Wikipedia",
  notes: "Used for discovery and cross-checking, not as sole authority.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Stephen Wolfram (Q310798)",
  url: "https://www.wikidata.org/wiki/Q310798",
  publisher: "Wikidata",
});
const wiredLevy = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Man Who Cracked The Code to Everything ...",
  url: "https://www.wired.com/2002/06/wolfram/",
  publisher: "WIRED",
  publishedAt: "2002-06-01",
  authors: ["Steven Levy"],
  notes:
    "Feature profile timed to the publication of A New Kind of Science; documents the decade-long reclusive writing period.",
});
const ted = source({
  binding: "first_person",
  mediaType: "video",
  title: "Computing a theory of all knowledge",
  url: "https://www.ted.com/talks/stephen_wolfram_computing_a_theory_of_everything",
  publisher: "TED",
  publishedAt: "2010-02",
  notes:
    "TED2010. The TED page titles the talk 'Computing a theory of all knowledge'; the distributed video circulates as 'Computing a theory of everything.'",
});
const lex234 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "Stephen Wolfram: Complexity and the Fabric of Reality — Lex Fridman Podcast #234",
  url: "https://lexfridman.com/stephen-wolfram-3/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2021-10-26",
  authors: ["Lex Fridman"],
});
const lex376 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "Stephen Wolfram: ChatGPT and the Nature of Truth, Reality & Computation — Lex Fridman Podcast #376",
  url: "https://lexfridman.com/stephen-wolfram-4/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2023-05-09",
  authors: ["Lex Fridman"],
});

const S = {
  about: about.id,
  lifeInTech: lifeInTech.id,
  personalAnalytics: personalAnalytics.id,
  productiveLife: productiveLife.id,
  physicsLaunch: physicsLaunch.id,
  ruliadEssay: ruliadEssay.id,
  chatgptEssay: chatgptEssay.id,
  nksOnline: nksOnline.id,
  wolframphysics: wolframphysics.id,
  wolframLanguage: wolframLanguage.id,
  wolframAlpha: wolframAlpha.id,
  statmechCA: statmechCA.id,
  physPaper: physPaper.id,
  macarthur: macarthur.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  wiredLevy: wiredLevy.id,
  ted: ted.id,
  lex234: lex234.id,
  lex376: lex376.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-stephen-wolfram",
  generatedAt: "2026-09-16T21:00:00Z",
  subject: {
    kind: "person",
    handle: "stephen-wolfram",
    displayName: "Stephen Wolfram",
    summary:
      "British-American computer scientist, physicist, and entrepreneur — founder and CEO of Wolfram Research; creator of Mathematica, Wolfram|Alpha, and the Wolfram Language; author of A New Kind of Science; originator of the Wolfram Physics Project and the concept of the ruliad.",
    identity: {
      wikidataId: "Q310798",
      officialSite: "https://www.stephenwolfram.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Stephen_Wolfram",
      profiles: ["https://www.ted.com/speakers/stephen_wolfram"],
    },
  },
  scope: {
    asOf: "2026-09-16T21:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    about,
    lifeInTech,
    personalAnalytics,
    productiveLife,
    physicsLaunch,
    ruliadEssay,
    chatgptEssay,
    nksOnline,
    wolframphysics,
    wolframLanguage,
    wolframAlpha,
    statmechCA,
    physPaper,
    macarthur,
    wikipedia,
    wikidata,
    wiredLevy,
    ted,
    lex234,
    lex376,
  ],
  claims: [
    {
      id: "claim-born-london-1959",
      kind: "fact",
      text: "Stephen Wolfram was born on August 29, 1959 in London, England; his father was a textile businessman and novelist and his mother, Sybil Wolfram, was a philosophy professor at Oxford.",
      sourceIds: [S.wikipedia, S.wikidata, S.lifeInTech],
    },
    {
      id: "claim-first-paper-15",
      kind: "fact",
      text: "He published his first scientific paper at age 15 and had published roughly ten peer-reviewed particle-physics papers by the time he left Oxford.",
      sourceIds: [S.about, S.wikipedia, S.lifeInTech],
    },
    {
      id: "claim-eton-oxford",
      kind: "fact",
      text: "He was a King's Scholar at Eton College (1972–1976), then studied at St John's College, Oxford (1976–1978), leaving without a degree after judging the lectures not worth attending.",
      sourceIds: [S.lifeInTech, S.wikipedia],
    },
    {
      id: "claim-caltech-phd",
      kind: "fact",
      text: "He received a PhD in theoretical physics from Caltech in 1979 at age 20 — his thesis committee included Richard Feynman and was chaired by Richard D. Field — and stayed on the faculty. Some secondary sources date the PhD to 1980, matching the thesis's formal publication year.",
      sourceIds: [S.about, S.macarthur, S.wikipedia],
    },
    {
      id: "claim-smp",
      kind: "fact",
      text: "From 1979 to 1981 he led development of SMP, the first modern computer algebra system, in Caltech's physics department; a dispute with the administration over SMP's intellectual property contributed to his departure.",
      sourceIds: [S.about, S.wikipedia, S.lifeInTech],
    },
    {
      id: "claim-macarthur-1981",
      kind: "fact",
      text: "In June 1981, at age 21, he became the youngest recipient of a MacArthur Fellowship.",
      sourceIds: [S.macarthur, S.about, S.wikipedia],
    },
    {
      id: "claim-ca-turn",
      kind: "fact",
      text: "In late 1981 he turned from particle physics to studying the origins of complexity in nature through computer experiments on cellular automata — simple programs he treated as objects of empirical science.",
      sourceIds: [S.about, S.statmechCA],
    },
    {
      id: "claim-four-classes",
      kind: "fact",
      text: "His cellular-automata work classified their behavior into four classes — homogeneous, periodic, chaotic, and complex with localized structures — the fourth being capable of universal computation, a taxonomy the 1983 paper introduced and NKS later developed.",
      sourceIds: [S.statmechCA, S.nksOnline, S.wikipedia],
    },
    {
      id: "claim-rule-30",
      kind: "fact",
      text: "The elementary rule 30 automaton generates apparently random behavior from a trivial deterministic rule; Wolfram developed it into a randomness-generation method that remains in widespread use.",
      sourceIds: [S.statmechCA, S.about, S.nksOnline],
    },
    {
      id: "claim-complex-systems-institutions",
      kind: "fact",
      text: "In 1986 he founded Complex Systems, the first journal in the field, and its first research center — the Center for Complex Systems Research at the University of Illinois — after three years at the Institute for Advanced Study in Princeton.",
      sourceIds: [S.about, S.wikipedia, S.physPaper],
    },
    {
      id: "claim-wolfram-research-ceo",
      kind: "fact",
      text: "He founded Wolfram Research in 1987 and has been its president and CEO ever since; he describes it as a private company of several hundred people that he runs largely through screens from home.",
      sourceIds: [S.about, S.productiveLife, S.macarthur],
    },
    {
      id: "claim-mathematica-1988",
      kind: "fact",
      text: "Mathematica 1.0 was released on June 23, 1988, after development that began in late 1986; it grew from a technical computing system into the foundation of the Wolfram technology stack.",
      sourceIds: [S.about, S.wikipedia, S.macarthur],
    },
    {
      id: "claim-nks-2002",
      kind: "fact",
      text: "A New Kind of Science — roughly 1,200 pages written over more than a decade of largely secluded, nocturnal work — was published by his own imprint Wolfram Media on May 14, 2002 and immediately became a bestseller.",
      sourceIds: [S.nksOnline, S.wiredLevy, S.about],
    },
    {
      id: "claim-wolfram-alpha-2009",
      kind: "fact",
      text: "Wolfram|Alpha launched publicly in May 2009: an engine that computes answers from curated data and algorithms rather than searching documents, later serving as a knowledge source for assistants such as Siri and Alexa.",
      sourceIds: [S.wolframAlpha, S.about, S.macarthur],
    },
    {
      id: "claim-wolfram-language-2014",
      kind: "fact",
      text: "In 2014 he introduced the Wolfram Language, built on the Mathematica and Wolfram|Alpha stack, as a full-scale computational language with knowledge about the world built into the language itself.",
      sourceIds: [S.wolframLanguage, S.about],
    },
    {
      id: "claim-physics-project-2020",
      kind: "fact",
      text: "On April 14, 2020 he launched the Wolfram Physics Project, modeling physics as rewriting systems on hypergraphs and conducting the research openly — papers, tools, working materials back to the 1990s, and hundreds of hours of livestreamed sessions.",
      sourceIds: [S.physicsLaunch, S.wolframphysics],
    },
    {
      id: "claim-physics-formalism",
      kind: "fact",
      text: "The project's published models reproduce formal analogs of known physics — emergent spacetime geometry consistent with relativity and quantum-mechanical structure from multiway branching — as correspondences at the level of formalism.",
      sourceIds: [S.physPaper, S.wolframphysics],
    },
    {
      id: "claim-chatgpt-essay-2023",
      kind: "fact",
      text: "His February 2023 essay 'What Is ChatGPT Doing … and Why Does It Work?' — explaining LLMs as next-word prediction whose coherence he attributes to 'semantic laws of motion' — became a widely read public explainer and a Wolfram Media book the following month.",
      sourceIds: [S.chatgptEssay],
    },
    {
      id: "claim-personal-data",
      kind: "fact",
      text: "He has systematically archived his own life for decades: every email since 1989 (a third of a million sent by 2012), more than 100 million keystrokes, meetings, phone calls, and physical activity — figures he reported in his personal-analytics writing.",
      sourceIds: [S.personalAnalytics],
    },
    {
      id: "claim-instrumented-workday",
      kind: "fact",
      text: "He runs his working life through deliberately engineered 'personal infrastructure' — remote-first management, structured deep-work hours, and extensive self-quantification — documented in his own essays.",
      sourceIds: [S.productiveLife, S.personalAnalytics, S.wiredLevy],
    },
    {
      id: "claim-computation-fundamental",
      kind: "stated_belief",
      text: "Wolfram holds computation to be the deepest idea of the past century and expects it to reframe everything: the universe itself, on his account, operates as a computation.",
      sourceIds: [S.ted, S.physicsLaunch],
    },
    {
      id: "claim-simple-programs",
      kind: "stated_belief",
      text: "He argues that simple programs iterated produce behavior of arbitrary complexity — the 'secret' he believes nature uses — and that exploring the computational universe of simple rules is a basic science.",
      sourceIds: [S.nksOnline, S.ted, S.lex234],
    },
    {
      id: "claim-computational-irreducibility",
      kind: "stated_belief",
      text: "He holds that many systems are computationally irreducible: no shortcut can predict their behavior faster than running them, which limits what science can compress and leaves room for effective randomness and free will.",
      sourceIds: [S.nksOnline, S.lex234, S.about],
    },
    {
      id: "claim-pce",
      kind: "stated_belief",
      text: "His Principle of Computational Equivalence claims that almost all systems whose behavior is not obviously simple reach the same maximal level of computational sophistication — putting weather, brains, and universal computers on one footing.",
      sourceIds: [S.nksOnline, S.lex234, S.ruliadEssay],
    },
    {
      id: "claim-nks-methodology",
      kind: "stated_belief",
      text: "He presents computer experiments — directly observing what simple rules do — as a first-class scientific method, a deliberate break from the theorem-and-proof tradition of mathematics.",
      sourceIds: [S.nksOnline, S.wiredLevy],
    },
    {
      id: "claim-ruliad",
      kind: "stated_belief",
      text: "He calls the ruliad the entangled limit of all possible computations — every rule on every initial condition, run forever — and argues our universe and our experience are a sampling of it, dissolving the 'why this rule' question.",
      sourceIds: [S.ruliadEssay, S.wolframphysics],
    },
    {
      id: "claim-observers-like-us",
      kind: "stated_belief",
      text: "He argues that bounded observers embedded in the ruliad inevitably perceive laws like general relativity and quantum mechanics — making physics partly a fact about observers, and bridging to questions about AI and consciousness.",
      sourceIds: [S.ruliadEssay, S.lex376],
    },
    {
      id: "claim-multicomputation",
      kind: "stated_belief",
      text: "He frames physics as multicomputation: evolution along many branching and merging paths at once, organized by causal graphs and 'branchial space' — a paradigm he extends beyond physics to fields like biology and economics.",
      sourceIds: [S.physPaper, S.wolframphysics, S.lex234],
    },
    {
      id: "claim-mathematica-instrument",
      kind: "stated_belief",
      text: "He describes Mathematica as an instrument built partly for himself — 'a bit like Galileo got to use his telescope' — pointed at the computational universe rather than the astronomical one.",
      sourceIds: [S.ted, S.productiveLife],
    },
    {
      id: "claim-symbolic-plus-neural",
      kind: "stated_belief",
      text: "He holds that statistical AI like ChatGPT and symbolic computational systems like Wolfram|Alpha are complementary, and in 2023 integrated the Wolfram stack with ChatGPT as 'computational superpowers' for the model.",
      sourceIds: [S.chatgptEssay, S.lex376],
    },
    {
      id: "claim-self-directed-education",
      kind: "pattern",
      text: "Across the record he treats formal schooling as optional scaffolding: he skipped lectures at Eton and Oxford, learned through research and computers, and left each institution early without a conventional credential until the doctorate.",
      sourceIds: [S.lifeInTech, S.wikipedia, S.wiredLevy],
    },
    {
      id: "claim-tools-then-science",
      kind: "pattern",
      text: "His career repeatedly builds an instrument that enables the next research stage — SMP, then Mathematica, then Wolfram Language, then the Physics Project's tooling — each tool financing or powering the science it was built for.",
      sourceIds: [S.about, S.productiveLife, S.physicsLaunch],
    },
    {
      id: "claim-nks-reception-contested",
      kind: "speculation",
      text: "Whether A New Kind of Science constitutes a paradigm shift remains contested: it was a bestseller hailed by supporters as foundational and criticized by reviewers for its presentation, self-published confidence, and treatment of prior work.",
      sourceIds: [S.wiredLevy, S.wikipedia],
    },
    {
      id: "claim-physics-empirical-status",
      kind: "speculation",
      text: "The Physics Project has shown correspondences with the formalism of known physics, but no candidate rule for our universe has been identified and the approach has not yet produced a novel falsifiable prediction — its scientific standing is unresolved.",
      sourceIds: [S.physPaper, S.wolframphysics, S.lex234],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1959-08-29",
      title: "Born in London, England",
      summary:
        "Son of a textile businessman-novelist and Oxford philosophy professor Sybil Wolfram.",
      location: "London, England",
      sourceIds: [S.wikipedia, S.wikidata, S.about],
    },
    {
      id: "event-eton",
      kind: "education",
      date: "1972",
      end: "1976",
      title: "King's Scholar at Eton College",
      summary:
        "Won the top scholarship among new students; encountered his first computer and began physics research largely outside classwork.",
      organization: "Eton College",
      sourceIds: [S.lifeInTech, S.wikipedia],
    },
    {
      id: "event-oxford",
      kind: "education",
      date: "1976",
      end: "1978",
      title: "St John's College, Oxford — left without a degree",
      summary:
        "Found undergraduate physics useless for his research trajectory, worked out of the Nuclear Physics building, and left for Caltech.",
      organization: "University of Oxford",
      sourceIds: [S.wikipedia, S.lifeInTech],
    },
    {
      id: "event-caltech-phd",
      kind: "education",
      date: "1979",
      title: "PhD in theoretical physics from Caltech at age 20",
      summary:
        "Thesis committee chaired by Richard D. Field and including Richard Feynman; joined the Caltech faculty.",
      organization: "California Institute of Technology",
      location: "Pasadena, California",
      sourceIds: [S.about, S.macarthur, S.wikipedia],
    },
    {
      id: "event-smp",
      kind: "project",
      date: "1979",
      end: "1981",
      title: "Led development of SMP",
      summary:
        "Built the first modern computer algebra system at Caltech; an intellectual-property dispute with the institute contributed to his exit.",
      organization: "Caltech",
      sourceIds: [S.about, S.wikipedia],
    },
    {
      id: "event-macarthur",
      kind: "award",
      date: "1981-06",
      title: "MacArthur Fellowship — youngest recipient",
      summary:
        "Named in the first class of MacArthur Fellows at age 21, recognized for early work in physics and computing.",
      organization: "MacArthur Foundation",
      sourceIds: [S.macarthur, S.about],
    },
    {
      id: "event-ias",
      kind: "role",
      date: "1983",
      end: "1986",
      title: "Faculty at the Institute for Advanced Study, Princeton",
      summary:
        "Developed the cellular-automata research program, including the 1983 Reviews of Modern Physics paper.",
      organization: "Institute for Advanced Study",
      location: "Princeton, New Jersey",
      sourceIds: [S.wikipedia, S.about],
    },
    {
      id: "event-complex-systems",
      kind: "founded",
      date: "1986",
      title: "Founded Complex Systems and the Center for Complex Systems Research",
      summary:
        "Created the field's first journal and first research center while Professor of Physics, Mathematics and Computer Science at Illinois.",
      organization: "University of Illinois Urbana-Champaign",
      sourceIds: [S.about, S.wikipedia],
    },
    {
      id: "event-wolfram-research",
      kind: "founded",
      date: "1987",
      title: "Founded Wolfram Research",
      summary:
        "Left academia to build the company that would develop Mathematica; he remains its president and CEO.",
      location: "Champaign, Illinois",
      sourceIds: [S.about, S.wikipedia],
    },
    {
      id: "event-mathematica",
      kind: "milestone",
      date: "1988-06-23",
      title: "Mathematica 1.0 released",
      summary:
        "Hailed immediately as a major advance in technical computing.",
      sourceIds: [S.about, S.wikipedia],
    },
    {
      id: "event-nks",
      kind: "publication",
      date: "2002-05-14",
      title: "A New Kind of Science published",
      summary:
        "Roughly 1,200 pages from more than a decade of largely secluded work; an immediate bestseller and an immediate controversy.",
      organization: "Wolfram Media",
      sourceIds: [S.nksOnline, S.wiredLevy, S.about],
    },
    {
      id: "event-wolfram-alpha",
      kind: "milestone",
      date: "2009-05",
      title: "Wolfram|Alpha launched publicly",
      summary:
        "The 'computational knowledge engine' that computes answers from curated data rather than searching documents.",
      sourceIds: [S.wolframAlpha, S.about],
    },
    {
      id: "event-wolfram-language",
      kind: "milestone",
      date: "2014",
      title: "Wolfram Language introduced",
      summary:
        "A full-scale knowledge-based computational language built on the Mathematica and Wolfram|Alpha stack.",
      sourceIds: [S.wolframLanguage, S.about],
    },
    {
      id: "event-physics-project",
      kind: "project",
      date: "2020-04-14",
      title: "Launched the Wolfram Physics Project",
      summary:
        "Announced 'a path to the fundamental theory of physics' and opened the research — tools, working materials, and livestreams — to the world.",
      sourceIds: [S.physicsLaunch, S.wolframphysics],
    },
  ],
  themes: [
    {
      id: "theme-computation-fundamental",
      kind: "philosophy",
      status: "stated",
      title: "Computation as the deepest framework",
      summary:
        "He calls computation probably the single biggest idea to emerge in the past century — not just a technology but a fundamental lens for physics, biology, mathematics, and mind. The universe, on his account, computes.",
      sourceIds: [S.ted, S.physicsLaunch, S.nksOnline],
    },
    {
      id: "theme-simple-programs",
      kind: "philosophy",
      status: "stated",
      title: "Simple programs make complexity",
      summary:
        "The core empirical discovery: iterating a trivial rule routinely yields behavior of arbitrary complexity — rule 30 being the canonical case. Nature's complexity needs no complicated machinery underneath.",
      sourceIds: [S.nksOnline, S.ted, S.statmechCA],
    },
    {
      id: "theme-irreducibility",
      kind: "belief",
      status: "stated",
      title: "Computational irreducibility and the limits of prediction",
      summary:
        "Many systems admit no predictive shortcut: the only way to know what they do is to run them. He treats this as both a limit on science and the source of effective randomness, history, and free will.",
      sourceIds: [S.nksOnline, S.lex234],
    },
    {
      id: "theme-computational-equivalence",
      kind: "philosophy",
      status: "stated",
      title: "The Principle of Computational Equivalence",
      summary:
        "Almost everything above a low threshold of behavioral complexity — cellular automata, weather, brains — performs computations of equivalent maximal sophistication. It is the claim that demotes human cognition from a unique peak.",
      sourceIds: [S.nksOnline, S.lex234, S.ruliadEssay],
    },
    {
      id: "theme-ruliad-observer",
      kind: "philosophy",
      status: "stated",
      title: "The ruliad and observers like us",
      summary:
        "The ruliad — the entangled limit of all possible computations — is his ultimate construct: every rule run on every initial condition forever. Bounded observers sample a slice whose robust features appear to us as space, time, and physical law.",
      sourceIds: [S.ruliadEssay, S.wolframphysics, S.lex376],
    },
    {
      id: "theme-computational-language",
      kind: "method",
      status: "stated",
      title: "Computational language as infrastructure for thought",
      summary:
        "Mathematica, Wolfram|Alpha, and the Wolfram Language are one project: encode the world's knowledge in symbolic form so that anything describable becomes computable — for humans and now for LLMs.",
      sourceIds: [S.wolframLanguage, S.about, S.chatgptEssay],
    },
    {
      id: "theme-experiment-over-proof",
      kind: "method",
      status: "stated",
      title: "Computer experiments over the proof tradition",
      summary:
        "NKS's methodology is deliberately empirical: run the simple program and look, rather than prove theorems about idealized systems. He frames it as a new kind of science standing beside mathematics, not inside it.",
      sourceIds: [S.nksOnline, S.wiredLevy],
    },
    {
      id: "theme-open-science",
      kind: "practice",
      status: "stated",
      title: "Research in the open",
      summary:
        "The Physics Project runs as public science: working materials back to the 1990s, released tools, bulletins, a Registry of Notable Universes, and hundreds of hours of livestreamed working sessions.",
      sourceIds: [S.physicsLaunch, S.wolframphysics],
    },
    {
      id: "theme-instrumented-self",
      kind: "practice",
      status: "stated",
      title: "The self as an engineering problem",
      summary:
        "Decades of personal analytics — every email since 1989, 100M+ keystrokes — plus deliberately designed 'personal infrastructure' and remote-first company management. He treats his own life as a system to be measured and optimized.",
      sourceIds: [S.personalAnalytics, S.productiveLife],
    },
    {
      id: "theme-outsider-insider",
      kind: "belief",
      status: "reported",
      title: "Institutions kept at arm's length",
      summary:
        "He left Eton, Oxford, Caltech, and academia itself; self-published his magnum opus through his own imprint; and runs his company remotely from outside its headquarters town — a pattern of building his own institutions rather than joining others'.",
      sourceIds: [S.wiredLevy, S.lifeInTech, S.productiveLife],
    },
  ],
  works: [
    {
      id: "work-smp",
      kind: "product",
      status: "completed",
      title: "SMP (Symbolic Manipulation Program)",
      date: "1981",
      summary:
        "The first modern computer algebra system, built at Caltech 1979–81 and released commercially; discontinued after his departure, succeeded conceptually by Mathematica.",
      sourceIds: [S.about, S.wikipedia, S.lifeInTech],
    },
    {
      id: "work-statmech-ca",
      kind: "paper",
      status: "published",
      title: "Statistical mechanics of cellular automata",
      date: "1983-07-01",
      summary:
        "Reviews of Modern Physics 55, 601 — the foundational cellular-automata paper introducing the four behavioral classes.",
      sourceIds: [S.statmechCA],
    },
    {
      id: "work-complex-systems-journal",
      kind: "project",
      status: "ongoing",
      title: "Complex Systems (journal)",
      date: "1986",
      summary:
        "The field's first journal, founded by Wolfram; still publishing — including the Physics Project's 2020 technical paper.",
      sourceIds: [S.about, S.physPaper],
    },
    {
      id: "work-wolfram-research",
      kind: "other",
      status: "ongoing",
      title: "Wolfram Research",
      date: "1987",
      location: "Champaign, Illinois",
      summary:
        "The private software company he founded and still leads as CEO — the vehicle and funding engine for the entire stack.",
      sourceIds: [S.about, S.productiveLife],
    },
    {
      id: "work-mathematica",
      kind: "product",
      status: "released",
      title: "Mathematica",
      date: "1988-06-23",
      summary:
        "The technical computing system that anchors the Wolfram stack; version 1.0 released June 23, 1988.",
      sourceIds: [S.about, S.wikipedia, S.macarthur],
    },
    {
      id: "work-nks-book",
      kind: "book",
      status: "published",
      title: "A New Kind of Science",
      date: "2002-05-14",
      summary:
        "His ~1,200-page argument that simple programs, not equations, are the right primitives for science; now freely readable online.",
      sourceIds: [S.nksOnline, S.wiredLevy],
    },
    {
      id: "work-summer-school",
      kind: "project",
      status: "ongoing",
      title: "Wolfram Summer School",
      date: "2003",
      summary:
        "Annual program he founded to train students in his computational-science methods; now the Wolfram Summer Research Institute.",
      sourceIds: [S.about],
    },
    {
      id: "work-wolfram-alpha",
      kind: "product",
      status: "ongoing",
      title: "Wolfram|Alpha",
      date: "2009-05",
      summary:
        "The computational knowledge engine — answers computed from curated data and algorithms, used directly and inside assistants like Siri.",
      sourceIds: [S.wolframAlpha, S.about],
    },
    {
      id: "work-wolfram-language",
      kind: "product",
      status: "ongoing",
      title: "Wolfram Language",
      date: "2014",
      summary:
        "The full-scale symbolic computational language unifying Mathematica and Wolfram|Alpha, with built-in knowledge about computation and the world.",
      sourceIds: [S.wolframLanguage, S.about],
    },
    {
      id: "work-elementary-intro",
      kind: "book",
      status: "published",
      title: "An Elementary Introduction to the Wolfram Language",
      date: "2015",
      summary:
        "His introductory text for teaching computational thinking to students and newcomers.",
      sourceIds: [S.about],
    },
    {
      id: "work-idea-makers",
      kind: "book",
      status: "published",
      title: "Idea Makers",
      date: "2016",
      summary:
        "Essays giving his personal perspective on the lives and ideas of notable figures in the history of science and technology.",
      sourceIds: [S.about],
    },
    {
      id: "work-computational-explorer",
      kind: "book",
      status: "published",
      title: "Adventures of a Computational Explorer",
      date: "2019",
      summary:
        "A collection drawn from his own trajectory and intellectual adventures — including the personal-analytics and infrastructure essays.",
      sourceIds: [S.about, S.productiveLife],
    },
    {
      id: "work-physics-project",
      kind: "project",
      status: "ongoing",
      title: "Wolfram Physics Project",
      date: "2020-04-14",
      summary:
        "The open, crowdsourced effort to find the fundamental theory of physics in hypergraph rewriting systems.",
      sourceIds: [S.physicsLaunch, S.wolframphysics],
    },
    {
      id: "work-physics-paper",
      kind: "paper",
      status: "published",
      title:
        "A Class of Models with the Potential to Represent Fundamental Physics",
      date: "2020",
      summary:
        "The project's 400-page technical introduction, published in Complex Systems 29(2): minimal rewriting models showing formal correspondences with known physics.",
      sourceIds: [S.physPaper],
    },
    {
      id: "work-chatgpt-book",
      kind: "book",
      status: "published",
      title: "What Is ChatGPT Doing ... and Why Does It Work?",
      date: "2023",
      summary:
        "The Wolfram Media book expanding his February 2023 essay — the widely read plain-language explanation of how LLMs work.",
      sourceIds: [S.chatgptEssay],
    },
  ],
  appearances: [
    {
      id: "appearance-wired-2002",
      title: "The Man Who Cracked The Code to Everything ...",
      venue: "WIRED",
      publishedAt: "2002-06-01",
      participants: ["Stephen Wolfram", "Steven Levy"],
      summary:
        "The launch-window profile of NKS: the decade of seclusion, the book's claims, and the scientific community's wary anticipation.",
      media: [
        {
          type: "article",
          url: "https://www.wired.com/2002/06/wolfram/",
          sourceId: S.wiredLevy,
        },
      ],
      sourceIds: [S.wiredLevy],
    },
    {
      id: "appearance-ted-2010",
      title: "Computing a theory of all knowledge",
      venue: "TED2010",
      publishedAt: "2010-02",
      participants: ["Stephen Wolfram"],
      summary:
        "His TED talk on computation as the fundamental idea — from Mathematica and Wolfram|Alpha to the ambition of finding our universe's rule in the computational universe of simple programs.",
      media: [
        {
          type: "video",
          url: "https://www.ted.com/talks/stephen_wolfram_computing_a_theory_of_everything",
          sourceId: S.ted,
        },
      ],
      sourceIds: [S.ted],
    },
    {
      id: "appearance-chm-2016",
      title: "My Life in Technology",
      venue: "Computer History Museum",
      publishedAt: "2016-04",
      participants: ["Stephen Wolfram"],
      summary:
        "A first-person retrospective — Dragon School, Eton's Elliott 903C, Oxford, Caltech, SMP, Mathematica — later published in full on his writings site.",
      media: [
        {
          type: "article",
          url: "https://writings.stephenwolfram.com/2016/04/my-life-in-technology-as-told-at-the-computer-history-museum/",
          sourceId: S.lifeInTech,
        },
      ],
      sourceIds: [S.lifeInTech],
    },
    {
      id: "appearance-lex-234",
      title:
        "Complexity and the Fabric of Reality — Lex Fridman Podcast #234",
      venue: "Lex Fridman Podcast",
      publishedAt: "2021-10-26",
      participants: ["Lex Fridman", "Stephen Wolfram"],
      summary:
        "A long conversation on complexity, the Physics Project, computational equivalence, the ruliad, and consciousness.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=4-SGpEInX_c",
          sourceId: S.lex234,
        },
      ],
      sourceIds: [S.lex234],
    },
    {
      id: "appearance-lex-376",
      title:
        "ChatGPT and the Nature of Truth, Reality & Computation — Lex Fridman Podcast #376",
      venue: "Lex Fridman Podcast",
      publishedAt: "2023-05-09",
      participants: ["Lex Fridman", "Stephen Wolfram"],
      summary:
        "The fourth Wolfram appearance, recorded soon after the ChatGPT–Wolfram plugin launch: how LLMs work, truth, observers, and the second law of thermodynamics.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=PdE-waSx-d8",
          sourceId: S.lex376,
        },
      ],
      sourceIds: [S.lex376],
    },
  ],
  openQuestions: [
    "Whether A New Kind of Science amounts to a paradigm shift remains contested — the book was a bestseller and seeded real research programs, but critics dispute its novelty and its treatment of prior work.",
    "The Wolfram Physics Project's empirical standing is unresolved: the published models show formal correspondences with relativity and quantum mechanics, but no candidate rule for our universe and no novel falsifiable prediction has emerged in the cited record.",
    "Wolfram Research's founding year is reported as both 1986 (MacArthur biography) and 1987 (his own site and most secondary sources); 1987 is used here.",
    "The scale of his personal archive — email counts, keystroke totals, storage — rests entirely on his own published figures and is not independently audited.",
    "Whether the ruliad-and-observers framework yields testable physics or is a reframing of known structure is an open interpretive question even within the project's own literature.",
  ],
  body: `Stephen Wolfram is a British-American scientist and entrepreneur who has spent five decades on a single bet: that computation — not mathematics, and not experiment alone — is the deepest framework for understanding the world. He is the founder and CEO of Wolfram Research, the creator of Mathematica, Wolfram|Alpha, and the Wolfram Language, the author of *A New Kind of Science*, and the originator of the Wolfram Physics Project. Nearly everything he has built, including the company, exists to fund and equip that bet.

## Formation: the prodigy who left early

Born in London on August 29, 1959 — his father a textile businessman and novelist, his mother an Oxford philosophy professor — Wolfram was publishing particle-physics papers at fifteen. His schooling was elite and mostly ornamental: a King's Scholar at Eton, then St John's College, Oxford, where he found the lectures not worth attending, worked out of the Nuclear Physics building, and left in 1978 without a degree. By then he had published roughly ten papers. At Caltech he took a PhD in theoretical physics in 1979 at age twenty — his committee chaired by Richard D. Field and including Richard Feynman — and joined the faculty.

At Caltech he led the construction of SMP, the first modern computer algebra system, and fought the administration over who owned it. In June 1981, at twenty-one, he became the youngest recipient of a MacArthur Fellowship. That same year he made the turn that defines him: away from particle physics and toward the origins of complexity, using the humblest objects he could find — cellular automata — as material for computer experiments.

## Building the instruments

His 1983 *Reviews of Modern Physics* paper, "Statistical mechanics of cellular automata," founded much of the field: it sorted elementary automata into four behavioral classes and treated them as objects of empirical study. Through the mid-1980s — at the Institute for Advanced Study, then the University of Illinois — he built the scaffolding of what he called complex systems research: the field's first journal, *Complex Systems*, and its first research center. Then he left academia.

Wolfram Research was founded in 1987; Mathematica 1.0 shipped on June 23, 1988. He has been unusually candid about the motive: he wanted the instrument for himself — "a bit like Galileo got to use his telescope," as he put it at TED — pointed not at the astronomical universe but at the computational one. Mathematica, then Wolfram|Alpha (launched May 2009), then the Wolfram Language (2014) form one continuous stack: an effort to make knowledge itself computable, expressed in symbolic form rather than searched.

## A New Kind of Science

From roughly 1991 to 2002, working mostly at night and largely in seclusion, he wrote *A New Kind of Science* — nearly 1,200 pages, published by his own imprint on May 14, 2002, an immediate bestseller and an immediate controversy. Its core claim is empirical: simple programs, iterated, routinely produce behavior of arbitrary complexity. Rule 30 — a few lines long — generates randomness good enough to seed a practical generator still in use. From there the book builds outward: the four classes; computational irreducibility, the claim that for many systems the only way to know what they do is to run them; and the Principle of Computational Equivalence, the claim that nearly everything above a low complexity threshold computes at the same maximal level — weather, brains, and Turing machines alike.

The deeper break is methodological: computer experiments as first-class science, set deliberately against the theorem-and-proof tradition. Critics called the book grandiose and light on credit to prior work; supporters called it a founding document. Both readings remain in the record.

## The physics project and the ruliad

On April 14, 2020, he announced the Wolfram Physics Project: the hypothesis that the universe is a hypergraph rewriting system — space the graph, time the succession of rewrites — with general relativity and quantum mechanics emerging for observers like us from causal structure and multiway branching. The project runs as unusually open science: papers, tools, working materials dating to the 1990s, a Registry of Notable Universes, and hundreds of hours of livestreamed research.

From it came the ruliad, his name for the entangled limit of all possible computations — every rule on every initial condition, run forever. On his account there is no "why this rule" left to answer: the universe runs all rules, and bounded observers like us sample a slice whose robust features look like physics. Whether this is a candidate theory of everything or a reframing of known structure is the live question; no rule for our universe has been identified, and the correspondences published so far are formal rather than empirical.

## The instrumented self

The same engineering reflex applies to the person. Since the late 1980s he has archived nearly everything measurable about his own life — a third of a million sent emails, more than a hundred million keystrokes, meetings, calls, steps — and published the analysis as "personal analytics." His productivity is similarly instrumented: decades of "personal infrastructure" design, remote management of a company of several hundred people largely by screen, days structured around deep work. In February 2023 his essay "What Is ChatGPT Doing … and Why Does It Work?" became the most-read public explanation of large language models and a short book; within weeks Wolfram|Alpha was a ChatGPT plugin — the symbolic engine lending the statistical one what he calls computational superpowers.

## What the record does not settle

The record is rich in first-person material — Wolfram is an unusually thorough self-documenter — and thin exactly where it matters: the long-run standing of *A New Kind of Science*, the empirical status of the physics project, even the company's founding year (1986 in the MacArthur biography, 1987 in his own telling). The archive figures are self-reported; the strongest claims are his own. This index preserves those seams rather than smoothing them over.

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
