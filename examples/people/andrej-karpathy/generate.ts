#!/usr/bin/env bun
/** Generate examples/people/andrej-karpathy/person-index.json with derived source ids. */

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

const ACCESSED = "2026-09-17T00:00:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- Subject-controlled -----------------------------------------------------

const site = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Andrej Karpathy",
  url: "https://karpathy.ai/",
  publisher: "karpathy.ai",
  notes:
    "The subject's own bio/timeline page; self-reported. Also carries a tongue-in-cheek 'Order of the Unicorn' paragraph aimed at LLM scrapers.",
});
const stanfordBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Andrej Karpathy Academic Website",
  url: "https://ai.stanford.edu/~karpathy/",
  publisher: "Stanford University",
  notes:
    "His deprecated Stanford-era academic page; records the CS231n enrollment growth, internships, ConvNetJS, and arxiv-sanity.",
});
const eureka = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Introducing Eureka Labs",
  url: "https://eurekalabs.ai/",
  publisher: "Eureka Labs",
  notes: "The subject's company site: 'a new kind of school that is AI native.'",
});
const zeroToHero = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Neural Networks: Zero to Hero",
  url: "https://karpathy.ai/zero-to-hero.html",
  publisher: "karpathy.ai",
  notes: "Landing page for his from-scratch neural networks course.",
});
const minGpt = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "karpathy/minGPT",
  url: "https://github.com/karpathy/minGPT",
  publisher: "GitHub",
  publishedAt: "2020-08",
});
const nanoGpt = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "karpathy/nanoGPT",
  url: "https://github.com/karpathy/nanoGPT",
  publisher: "GitHub",
  publishedAt: "2022-12",
});
const llmc = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "karpathy/llm.c",
  url: "https://github.com/karpathy/llm.c",
  publisher: "GitHub",
  publishedAt: "2024",
  notes:
    "LLM training in raw C/CUDA; reproduces the GPT-2 and GPT-3 miniseries without heavy framework dependencies.",
});
const nanochat = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "karpathy/nanochat",
  url: "https://github.com/karpathy/nanochat",
  publisher: "GitHub",
  publishedAt: "2025-10-13",
  notes: "'The best ChatGPT that $100 can buy' — a minimal end-to-end LLM harness.",
});
const llm101n = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "karpathy/LLM101n",
  url: "https://github.com/karpathy/LLM101n",
  publisher: "GitHub",
  publishedAt: "2024-07",
  notes:
    "Eureka Labs' announced first course ('Let's build a Storyteller'); the repo is archived while the course is under development.",
});
const micrograd = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "karpathy/micrograd",
  url: "https://github.com/karpathy/micrograd",
  publisher: "GitHub",
  publishedAt: "2020",
  notes:
    "A tiny scalar-valued autograd engine (~100 lines) with a small neural-net library on top (~50 lines).",
});
const charRnn = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "karpathy/char-rnn",
  url: "https://github.com/karpathy/char-rnn",
  publisher: "GitHub",
  publishedAt: "2015-05",
  notes:
    "Multi-layer RNN/LSTM/GRU character-level language models in Torch; released alongside the 'Unreasonable Effectiveness' post.",
});

// --- First-person writing, talks, and lectures ------------------------------

const thesis = source({
  binding: "first_person",
  mediaType: "pdf",
  title: "Connecting Images and Natural Language (PhD dissertation)",
  url: "https://cs.stanford.edu/people/karpathy/main.pdf",
  publisher: "Stanford University",
  publishedAt: "2016-08",
  authors: ["Andrej Karpathy"],
});
const cvpr2015 = source({
  binding: "first_person",
  mediaType: "pdf",
  title: "Deep Visual-Semantic Alignments for Generating Image Descriptions",
  url: "https://openaccess.thecvf.com/content_cvpr_2015/papers/Karpathy_Deep_Visual-Semantic_Alignments_2015_CVPR_paper.pdf",
  publisher: "CVPR 2015 (CVF Open Access)",
  publishedAt: "2015",
  authors: ["Andrej Karpathy", "Li Fei-Fei"],
});
const rnnPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Unreasonable Effectiveness of Recurrent Neural Networks",
  url: "https://karpathy.github.io/2015/05/21/rnn-effectiveness/",
  publisher: "Andrej Karpathy blog",
  publishedAt: "2015-05-21",
  authors: ["Andrej Karpathy"],
});
const backpropPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Yes you should understand backprop",
  url: "https://karpathy.medium.com/yes-you-should-understand-backprop-e2f06eab496b",
  publisher: "Medium",
  publishedAt: "2016-12-19",
  authors: ["Andrej Karpathy"],
});
const sw2 = source({
  binding: "first_person",
  mediaType: "article",
  title: "Software 2.0",
  url: "https://karpathy.medium.com/software-2-0-a64152b37c35",
  publisher: "Medium",
  publishedAt: "2017-11-11",
  authors: ["Andrej Karpathy"],
});
const recipePost = source({
  binding: "first_person",
  mediaType: "article",
  title: "A Recipe for Training Neural Networks",
  url: "https://karpathy.github.io/2019/04/25/recipe/",
  publisher: "Andrej Karpathy blog",
  publishedAt: "2019-04-25",
  authors: ["Andrej Karpathy"],
});
const englishPost = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "X post: 'The hottest new programming language is English'",
  url: "https://x.com/karpathy/status/1617979122625712128",
  publisher: "X",
  publishedAt: "2023-01-24",
  authors: ["Andrej Karpathy"],
});
const vibePost = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "X post coining 'vibe coding'",
  url: "https://x.com/karpathy/status/1886192184808149383",
  publisher: "X",
  publishedAt: "2025-02-02",
  authors: ["Andrej Karpathy"],
});
const microgradLecture = source({
  binding: "first_person",
  mediaType: "video",
  title:
    "The spelled-out intro to neural networks and backpropagation: building micrograd",
  url: "https://www.youtube.com/watch?v=VMj-3S1tku0",
  publisher: "Andrej Karpathy (YouTube)",
  publishedAt: "2022-08-16",
  authors: ["Andrej Karpathy"],
  notes: "First lecture of the Zero to Hero series.",
});
const introLlm = source({
  binding: "first_person",
  mediaType: "video",
  title: "[1hr Talk] Intro to Large Language Models",
  url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
  publisher: "Andrej Karpathy (YouTube)",
  publishedAt: "2023-11-23",
  authors: ["Andrej Karpathy"],
});
const stateOfGpt = source({
  binding: "first_person",
  mediaType: "video",
  title: "State of GPT | BRK216HFS",
  url: "https://www.youtube.com/watch?v=bZQun8Y4L2A",
  publisher: "Microsoft Build",
  publishedAt: "2023-05",
  authors: ["Andrej Karpathy"],
  notes:
    "Microsoft Build 2023 breakout talk: the GPT assistant training pipeline and how to use it.",
});
const gpt2Video = source({
  binding: "first_person",
  mediaType: "video",
  title: "Let's reproduce GPT-2 (124M)",
  url: "https://www.youtube.com/watch?v=l8pRSuU81PU",
  publisher: "Andrej Karpathy (YouTube)",
  publishedAt: "2024-06-09",
  authors: ["Andrej Karpathy"],
});
const deepDive = source({
  binding: "first_person",
  mediaType: "video",
  title: "Deep Dive into LLMs like ChatGPT",
  url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
  publisher: "Andrej Karpathy (YouTube)",
  publishedAt: "2025-02-05",
  authors: ["Andrej Karpathy"],
});
const howIUse = source({
  binding: "first_person",
  mediaType: "video",
  title: "How I use LLMs",
  url: "https://www.youtube.com/watch?v=EWvNQjAaOHw",
  publisher: "Andrej Karpathy (YouTube)",
  publishedAt: "2025-02-27",
  authors: ["Andrej Karpathy"],
});
const ycTalk = source({
  binding: "first_person",
  mediaType: "video",
  title: "Andrej Karpathy: Software Is Changing (Again)",
  url: "https://www.youtube.com/watch?v=LCEmiRjPEtQ",
  publisher: "Y Combinator",
  publishedAt: "2025-06-19",
  authors: ["Andrej Karpathy"],
  notes:
    "AI Startup School keynote in San Francisco introducing the 'Software 3.0' framing.",
});
const cvpr20 = source({
  binding: "first_person",
  mediaType: "video",
  title:
    "[CVPR'20 Workshop on Scalability in Autonomous Driving] Keynote - Andrej Karpathy",
  url: "https://www.youtube.com/watch?v=g2R2T631x7k",
  publisher: "CVPR 2020 Workshop",
  publishedAt: "2020-06",
  authors: ["Andrej Karpathy"],
  notes: "On Tesla's multi-task neural networks and the data engine.",
});

// --- Primary records --------------------------------------------------------

const openaiIntro = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Introducing OpenAI",
  url: "https://openai.com/index/introducing-openai/",
  publisher: "OpenAI",
  publishedAt: "2015-12-11",
  notes: "OpenAI's launch post; lists Karpathy among the founding members.",
});
const openaiUniverse = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Universe",
  url: "https://openai.com/index/universe/",
  publisher: "OpenAI",
  publishedAt: "2016-12-05",
  notes:
    "Release of OpenAI's Universe platform; credits Karpathy on the World of Bits browser-task benchmark.",
});
const cs231n = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "CS231n: Convolutional Neural Networks for Visual Recognition (Spring 2015)",
  url: "https://cs231n.stanford.edu/2015/",
  publisher: "Stanford University",
  publishedAt: "2015",
  notes: "The first offering of the course he designed and taught.",
});
const teslaAutonomy = source({
  binding: "primary_record",
  mediaType: "video",
  title: "Tesla Autonomy Day",
  url: "https://www.youtube.com/watch?v=Ucp0TTmvqOE",
  publisher: "Tesla",
  publishedAt: "2019-04-22",
  notes:
    "Investor event livestream; Karpathy presented the neural-network and fleet-learning stack.",
});
const teslaAiDay = source({
  binding: "primary_record",
  mediaType: "video",
  title: "Tesla AI Day 2021",
  url: "https://www.youtube.com/watch?v=j0z4FweCy4M",
  publisher: "Tesla",
  publishedAt: "2021-08-19",
  notes:
    "Recruiting-focused technical showcase; Karpathy opened the deep dives with the vision stack.",
});

// --- Interviews -------------------------------------------------------------

const lex333 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "#333 – Andrej Karpathy: Tesla AI, Self-Driving, Optimus, Aliens, and AGI",
  url: "https://www.youtube.com/watch?v=cdiD-9MMpb0",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2022-10-29",
  authors: ["Lex Fridman"],
});
const dwarkeshYt = source({
  binding: "interview",
  mediaType: "video",
  title: "Andrej Karpathy — 'We're summoning ghosts, not building animals'",
  url: "https://www.youtube.com/watch?v=lXUZvyajciY",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2025-10-17",
  authors: ["Dwarkesh Patel"],
});
const dwarkesh = source({
  binding: "interview",
  mediaType: "article",
  title: "Andrej Karpathy — AGI is still a decade away",
  url: "https://www.dwarkesh.com/p/andrej-karpathy",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2025-10-17",
  authors: ["Dwarkesh Patel"],
  transcriptOf: dwarkeshYt.id,
  notes: "Episode page with the full transcript of the interview.",
});
const noPriors80 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "The Road to Autonomous Intelligence with Andrej Karpathy (No Priors Ep. 80)",
  url: "https://www.youtube.com/watch?v=hM_h0UA7upI",
  publisher: "No Priors",
  publishedAt: "2024-09-05",
  authors: ["Sarah Guo", "Elad Gil"],
});
const noPriors26 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI",
  url: "https://www.youtube.com/watch?v=kwSVtQ7dziU",
  publisher: "No Priors",
  publishedAt: "2026-03-20",
  authors: ["Sarah Guo"],
});
const sequoia = source({
  binding: "interview",
  mediaType: "video",
  title:
    "Andrej Karpathy: From Vibe Coding to Agentic Engineering w/ Stephanie Zhan",
  url: "https://www.youtube.com/watch?v=96jN2OCOfLs",
  publisher: "Sequoia Capital — Training Data / AI Ascent 2026",
  publishedAt: "2026-04-30",
  authors: ["Stephanie Zhan"],
});

// --- Reporting --------------------------------------------------------------

const tcTesla = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Tesla hires deep learning expert Andrej Karpathy to lead Autopilot vision",
  url: "https://techcrunch.com/2017/06/20/tesla-hires-deep-learning-expert-andrej-karpathy-to-lead-autopilot-vision/",
  publisher: "TechCrunch",
  publishedAt: "2017-06-20",
  authors: ["Darrell Etherington"],
});
const reutersTeslaExit = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tesla's high-profile Autopilot executive departs",
  url: "https://www.reuters.com/business/autos-transportation/teslas-ai-director-leaving-company-after-4-month-sabbatical-2022-07-13/",
  publisher: "Reuters",
  publishedAt: "2022-07-13",
});
const tcOpenAIExit = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Andrej Karpathy is leaving OpenAI again — but he says there was no drama",
  url: "https://techcrunch.com/2024/02/13/andrej-karpathy-is-leaving-openai-again-but-he-says-there-was-no-drama/",
  publisher: "TechCrunch",
  publishedAt: "2024-02-13",
  authors: ["Ivan Mehta"],
});
const reutersEureka = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Former OpenAI, Tesla engineer Andrej Karpathy starts AI education platform",
  url: "https://www.reuters.com/technology/artificial-intelligence/former-openai-tesla-engineer-andrej-karpathy-starts-ai-education-platform-2024-07-16/",
  publisher: "Reuters",
  publishedAt: "2024-07-16",
});
const time100 = source({
  binding: "reporting",
  mediaType: "article",
  title: "TIME100 AI 2024: Andrej Karpathy",
  url: "https://time.com/collections/time100-ai-2024/7012851/andrej-karpathy/",
  publisher: "TIME",
  publishedAt: "2024-09-05",
});
const trVibe = source({
  binding: "reporting",
  mediaType: "article",
  title: "What is vibe coding, exactly?",
  url: "https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/",
  publisher: "MIT Technology Review",
  publishedAt: "2025-04-16",
});
const bbcCollins = source({
  binding: "reporting",
  mediaType: "article",
  title: "'Vibe coding' named word of the year by Collins Dictionary",
  url: "https://www.bbc.com/news/articles/cpd2y053nleo",
  publisher: "BBC News",
  publishedAt: "2025-11-06",
});
const tcAnthropic = source({
  binding: "reporting",
  mediaType: "article",
  title: "OpenAI co-founder Andrej Karpathy joins Anthropic's pre-training team",
  url: "https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/",
  publisher: "TechCrunch",
  publishedAt: "2026-05-19",
  authors: ["Rebecca Bellan", "Lorenzo Franceschi-Bicchierai"],
});

// --- Reference and archive ---------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Andrej Karpathy (Q56037405)",
  url: "https://www.wikidata.org/wiki/Q56037405",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Andrej Karpathy",
  url: "https://en.wikipedia.org/wiki/Andrej_Karpathy",
  publisher: "Wikipedia",
  notes:
    "Used for discovery and date cross-checks; not the sole authority for any claim.",
});
const vibeWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Vibe coding",
  url: "https://en.wikipedia.org/wiki/Vibe_coding",
  publisher: "Wikipedia",
  notes: "Reference entry tracking the term's coinage and adoption.",
});
const mitTr = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Andrej Karpathy | Innovators Under 35",
  url: "https://www.innovatorsunder35.com/the-list/andrej-karpathy/",
  publisher: "MIT Technology Review",
  publishedAt: "2020",
  notes: "2020 Innovators Under 35 honoree profile.",
});
const vibeArchive = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Archived snapshot of the 'vibe coding' X post",
  url: "https://archive.ph/yNSTA",
  publisher: "archive.today",
  publishedAt: "2025-02-03",
  notes:
    "Capture of the original vibe-coding post taken the day after it was published.",
});

const S = {
  site: site.id,
  stanfordBio: stanfordBio.id,
  eureka: eureka.id,
  zeroToHero: zeroToHero.id,
  minGpt: minGpt.id,
  nanoGpt: nanoGpt.id,
  llmc: llmc.id,
  nanochat: nanochat.id,
  llm101n: llm101n.id,
  micrograd: micrograd.id,
  charRnn: charRnn.id,
  thesis: thesis.id,
  cvpr2015: cvpr2015.id,
  rnnPost: rnnPost.id,
  backpropPost: backpropPost.id,
  sw2: sw2.id,
  recipePost: recipePost.id,
  englishPost: englishPost.id,
  vibePost: vibePost.id,
  microgradLecture: microgradLecture.id,
  introLlm: introLlm.id,
  stateOfGpt: stateOfGpt.id,
  gpt2Video: gpt2Video.id,
  deepDive: deepDive.id,
  howIUse: howIUse.id,
  ycTalk: ycTalk.id,
  cvpr20: cvpr20.id,
  openaiIntro: openaiIntro.id,
  openaiUniverse: openaiUniverse.id,
  cs231n: cs231n.id,
  teslaAutonomy: teslaAutonomy.id,
  teslaAiDay: teslaAiDay.id,
  lex333: lex333.id,
  dwarkeshYt: dwarkeshYt.id,
  dwarkesh: dwarkesh.id,
  noPriors80: noPriors80.id,
  noPriors26: noPriors26.id,
  sequoia: sequoia.id,
  tcTesla: tcTesla.id,
  reutersTeslaExit: reutersTeslaExit.id,
  tcOpenAIExit: tcOpenAIExit.id,
  reutersEureka: reutersEureka.id,
  time100: time100.id,
  trVibe: trVibe.id,
  bbcCollins: bbcCollins.id,
  tcAnthropic: tcAnthropic.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  vibeWiki: vibeWiki.id,
  mitTr: mitTr.id,
  vibeArchive: vibeArchive.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-andrej-karpathy",
  generatedAt: "2026-09-17T03:00:00Z",
  subject: {
    kind: "person",
    handle: "andrej-karpathy",
    displayName: "Andrej Karpathy",
    summary:
      "Slovak-Canadian AI researcher and educator: Stanford CS231n creator and primary instructor, OpenAI founding member, Tesla's director of AI for Autopilot (2017–2022), founder of Eureka Labs, and Anthropic pretraining researcher since 2026. Author of nanoGPT, minGPT, llm.c and the 'Zero to Hero' series; coined 'vibe coding' and wrote the 'Software 2.0' essay.",
    identity: {
      wikidataId: "Q56037405",
      officialSite: "https://karpathy.ai/",
      wikipedia: "https://en.wikipedia.org/wiki/Andrej_Karpathy",
      profiles: [
        "https://x.com/karpathy",
        "https://github.com/karpathy",
        "https://www.youtube.com/@AndrejKarpathy",
        "https://karpathy.medium.com/",
        "https://karpathy.github.io/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:00:00Z",
    coverage: [
      "biography",
      "work",
      "philosophy",
      "beliefs",
      "projects",
      "media",
    ],
  },
  sources: [
    site,
    stanfordBio,
    eureka,
    zeroToHero,
    minGpt,
    nanoGpt,
    llmc,
    nanochat,
    llm101n,
    micrograd,
    charRnn,
    thesis,
    cvpr2015,
    rnnPost,
    backpropPost,
    sw2,
    recipePost,
    englishPost,
    vibePost,
    microgradLecture,
    introLlm,
    stateOfGpt,
    gpt2Video,
    deepDive,
    howIUse,
    ycTalk,
    cvpr20,
    openaiIntro,
    openaiUniverse,
    cs231n,
    teslaAutonomy,
    teslaAiDay,
    lex333,
    dwarkeshYt,
    dwarkesh,
    noPriors80,
    noPriors26,
    sequoia,
    tcTesla,
    reutersTeslaExit,
    tcOpenAIExit,
    reutersEureka,
    time100,
    trVibe,
    bbcCollins,
    tcAnthropic,
    wikidata,
    wikipedia,
    vibeWiki,
    mitTr,
    vibeArchive,
  ],
  claims: [
    // -- facts -------------------------------------------------------------
    {
      id: "claim-born-bratislava",
      kind: "fact",
      text: "Andrej Karpathy was born on October 23, 1986, in Bratislava, then Czechoslovakia (now Slovakia), and moved with his family to Toronto when he was 15.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-education",
      kind: "fact",
      text: "He completed bachelor's degrees in computer science and physics at the University of Toronto in 2009, a master's degree at the University of British Columbia in 2011 working on physically simulated figures with Michiel van de Panne, and a Stanford computer science PhD in 2016 advised by Fei-Fei Li.",
      sourceIds: [S.wikipedia, S.stanfordBio, S.thesis],
    },
    {
      id: "claim-phd-thesis",
      kind: "fact",
      text: "His 2016 dissertation, 'Connecting Images and Natural Language,' developed models linking visual data and language: a multimodal embedding for image–sentence retrieval, an image captioning model, and a dense-captioning model that localizes and describes salient image regions.",
      sourceIds: [S.thesis],
    },
    {
      id: "claim-cvpr2015-paper",
      kind: "fact",
      text: "With Fei-Fei Li he published 'Deep Visual-Semantic Alignments for Generating Image Descriptions' at CVPR 2015, aligning image regions with sentence snippets through a multimodal embedding and generating region-level descriptions with a multimodal RNN.",
      sourceIds: [S.cvpr2015],
    },
    {
      id: "claim-internships",
      kind: "fact",
      text: "During his PhD he interned twice at Google working on large-scale feature learning over YouTube videos, and in 2015 interned at DeepMind on the deep reinforcement learning team.",
      sourceIds: [S.stanfordBio],
    },
    {
      id: "claim-cs231n",
      kind: "fact",
      text: "Together with Fei-Fei Li he designed and was primary instructor for CS231n (Convolutional Neural Networks for Visual Recognition), Stanford's first deep learning course; his Stanford page reports enrollment grew from 150 in 2015 to 330 in 2016 and 750 in 2017.",
      sourceIds: [S.cs231n, S.stanfordBio],
    },
    {
      id: "claim-rnn-post",
      kind: "fact",
      text: "On May 21, 2015 he published the blog post 'The Unreasonable Effectiveness of Recurrent Neural Networks,' which trained character-level LSTM language models on Shakespeare, Wikipedia, LaTeX and source code, and released the accompanying char-rnn code on GitHub.",
      sourceIds: [S.rnnPost, S.charRnn],
    },
    {
      id: "claim-convnetjs",
      kind: "fact",
      text: "As a PhD student he wrote a family of browser-based deep learning libraries in JavaScript — ConvNetJS, RecurrentJS, REINFORCEjs and t-sneJS — and built arxiv-sanity, a tool for searching tens of thousands of machine learning arXiv papers.",
      sourceIds: [S.stanfordBio],
    },
    {
      id: "claim-openai-founding",
      kind: "fact",
      text: "Karpathy was a founding member of OpenAI, announced on December 11, 2015; OpenAI's launch post lists him among the founding research engineers and scientists under research director Ilya Sutskever.",
      sourceIds: [S.openaiIntro, S.wikipedia],
    },
    {
      id: "claim-universe",
      kind: "fact",
      text: "At OpenAI he led the World of Bits sub-project of Universe, released December 5, 2016 — a benchmark of browser-based tasks meant to train agents that operate real websites.",
      sourceIds: [S.openaiUniverse],
    },
    {
      id: "claim-tesla-hire",
      kind: "fact",
      text: "In June 2017 Tesla hired him as Director of AI and Autopilot Vision, reporting directly to Elon Musk, replacing part of the role vacated by departing Autopilot software head Chris Lattner.",
      sourceIds: [S.tcTesla],
    },
    {
      id: "claim-tesla-scope",
      kind: "fact",
      text: "By his own account he led the computer vision team of Tesla Autopilot and briefly Tesla Optimus; the team handled in-house data labeling, neural network training, and deployment onto Tesla's custom inference chip.",
      sourceIds: [S.site],
    },
    {
      id: "claim-autonomy-day",
      kind: "fact",
      text: "At Tesla's Autonomy Day on April 22, 2019 he presented the neural-network and fleet-learning approach, including imitation learning from fleet driving data and the 'data engine' loop.",
      sourceIds: [S.teslaAutonomy],
    },
    {
      id: "claim-ai-day",
      kind: "fact",
      text: "At Tesla AI Day on August 19, 2021 he opened the technical deep dives with the Autopilot vision stack — eight-camera inputs fused into a 3D 'vector space' representation.",
      sourceIds: [S.teslaAiDay, S.site],
    },
    {
      id: "claim-tesla-exit",
      kind: "fact",
      text: "He announced his departure from Tesla on July 13, 2022, after about five years and a months-long sabbatical, saying he had no concrete plans but wanted to revisit 'technical work in AI, open source and education.'",
      sourceIds: [S.reutersTeslaExit],
    },
    {
      id: "claim-openai-return",
      kind: "fact",
      text: "He rejoined OpenAI in February 2023 and, by his own account, built a new team working on midtraining and synthetic data generation.",
      sourceIds: [S.site, S.wikipedia],
    },
    {
      id: "claim-openai-exit",
      kind: "fact",
      text: "He left OpenAI again in February 2024 — announced February 13 — stating that nothing had 'happened' and that the departure was not the result of any particular event, issue or drama; he planned to work on personal projects.",
      sourceIds: [S.tcOpenAIExit],
    },
    {
      id: "claim-eureka-founding",
      kind: "fact",
      text: "On July 16, 2024 he announced Eureka Labs, an 'AI native' school pairing human-designed course materials with AI teaching assistants; its first announced product is the undergraduate-level course LLM101n.",
      sourceIds: [S.reutersEureka, S.eureka, S.llm101n],
    },
    {
      id: "claim-anthropic",
      kind: "fact",
      text: "On May 19, 2026 he announced he had joined Anthropic's pretraining team under lead Nick Joseph; Anthropic said he would build a team focused on using Claude to accelerate pretraining research.",
      sourceIds: [S.tcAnthropic],
    },
    {
      id: "claim-software2-essay",
      kind: "fact",
      text: "On November 11, 2017 he published the essay 'Software 2.0' on Medium, arguing that neural networks represent 'the beginning of a fundamental shift in how we develop software' — code written as learned weights rather than explicit instructions.",
      sourceIds: [S.sw2],
    },
    {
      id: "claim-english-post",
      kind: "fact",
      text: "On January 24, 2023 he posted 'The hottest new programming language is English,' followed by a thread of supporting examples of prompts functioning as programs.",
      sourceIds: [S.englishPost, S.vibeWiki],
    },
    {
      id: "claim-vibe-coding",
      kind: "fact",
      text: "On February 2, 2025 he coined the term 'vibe coding' in an X post describing a workflow of fully giving in to the vibes, accepting all generated diffs, and forgetting 'that the code even exists,' using Cursor's Composer with a voice dictation tool.",
      sourceIds: [S.vibePost, S.vibeArchive, S.trVibe],
    },
    {
      id: "claim-vibe-woty",
      kind: "fact",
      text: "'Vibe coding' was named Collins Dictionary's Word of the Year for 2025, announced November 6, 2025; coverage credits Karpathy with coining the term in February 2025.",
      sourceIds: [S.bbcCollins, S.vibeWiki],
    },
    {
      id: "claim-software3-talk",
      kind: "fact",
      text: "His June 2025 Y Combinator AI Startup School keynote 'Software Is Changing (Again)' introduced 'Software 3.0': natural language as the programming interface, with LLMs doing the rest.",
      sourceIds: [S.ycTalk],
    },
    {
      id: "claim-zero-to-hero",
      kind: "fact",
      text: "The 'Neural Networks: Zero to Hero' video course began on August 16, 2022 with the micrograd lecture — a step-by-step build of a scalar-valued autograd engine — and grew into a series coding neural networks from scratch.",
      sourceIds: [S.microgradLecture, S.zeroToHero],
    },
    {
      id: "claim-mingpt",
      kind: "fact",
      text: "He released minGPT in August 2020, a minimal PyTorch re-implementation of OpenAI's GPT training and inference — about 300 lines for the Transformer model itself — aimed at being 'small, clean, interpretable and educational.'",
      sourceIds: [S.minGpt],
    },
    {
      id: "claim-nanogpt",
      kind: "fact",
      text: "He created nanoGPT in December 2022 as a rewrite of minGPT 'that prioritizes teeth over education'; its roughly 300-line training loop reproduces GPT-2 (124M) on OpenWebText, and the repo is now deprecated in favor of nanochat.",
      sourceIds: [S.nanoGpt],
    },
    {
      id: "claim-llmc",
      kind: "fact",
      text: "In 2024 he started llm.c, an LLM training implementation in raw C/CUDA with no heavy framework dependency, focused on reproducing the GPT-2 and GPT-3 miniseries alongside a parallel PyTorch reference.",
      sourceIds: [S.llmc],
    },
    {
      id: "claim-nanochat",
      kind: "fact",
      text: "He released nanochat on October 13, 2025 — 'the best ChatGPT that $100 can buy' — a minimal, hackable harness covering tokenization, pretraining, finetuning, evaluation and inference, advertised as able to train a GPT-2-capability model for about $48 on one 8-GPU node.",
      sourceIds: [S.nanochat],
    },
    {
      id: "claim-llm-videos",
      kind: "fact",
      text: "His general-audience video track includes '[1hr Talk] Intro to Large Language Models' (November 2023), 'Deep Dive into LLMs like ChatGPT' (February 2025, ~3.5 hours covering the full training stack), and 'How I use LLMs' (February 2025).",
      sourceIds: [S.introLlm, S.deepDive, S.howIUse, S.site],
    },
    {
      id: "claim-gpt2-video",
      kind: "fact",
      text: "'Let's reproduce GPT-2 (124M),' published June 9, 2024, is a four-hour build of the GPT-2 124M model from scratch ending in a live training run; he describes it as building the nanoGPT repo about 90% of the way.",
      sourceIds: [S.gpt2Video],
    },
    {
      id: "claim-state-of-gpt",
      kind: "fact",
      text: "At Microsoft Build in May 2023 he gave the 'State of GPT' talk, walking through the GPT assistant training pipeline — pretraining, supervised finetuning, reward modeling and RLHF — and mental models for using the models.",
      sourceIds: [S.stateOfGpt],
    },
    {
      id: "claim-mit-tr35",
      kind: "fact",
      text: "MIT Technology Review named him to its 2020 Innovators Under 35 list for 'employing neural networks to allow automated cars to see.'",
      sourceIds: [S.mitTr],
    },
    {
      id: "claim-time100",
      kind: "fact",
      text: "TIME named him to the 2024 TIME100 AI list, citing his trajectory from OpenAI founding member through Tesla and Eureka Labs and calling him one of the internet's most-beloved AI instructors.",
      sourceIds: [S.time100],
    },
    // -- stated beliefs -----------------------------------------------------
    {
      id: "claim-belief-sw2-shift",
      kind: "stated_belief",
      text: "He argues neural networks are not 'just another tool in your machine learning toolbox' but a new programming paradigm: in Software 2.0 the programmer specifies goals and datasets, and training compiles the dataset into the binary — the final network.",
      sourceIds: [S.sw2],
    },
    {
      id: "claim-belief-leaky-abstraction",
      kind: "stated_belief",
      text: "He holds that backpropagation is a 'leaky abstraction' and that neural nets are not off-the-shelf technology: students and practitioners should understand the internals — initialization, gradient flow, dead neurons — or they will likely fail when applying them.",
      sourceIds: [S.backpropPost, S.recipePost],
    },
    {
      id: "claim-belief-recipe",
      kind: "stated_belief",
      text: "His documented training process is deliberately skeptical: thoroughly inspect the data before touching model code, set up the full train/eval skeleton with dumb baselines, and add complexity only in small, verified steps.",
      sourceIds: [S.recipePost],
    },
    {
      id: "claim-belief-llm-os",
      kind: "stated_belief",
      text: "He frames LLMs as a new kind of computer — with properties of utilities, fabs and operating systems — programmed in English, and analogizes the present moment to computing circa the 1960s.",
      sourceIds: [S.ycTalk, S.introLlm],
    },
    {
      id: "claim-belief-decade-of-agents",
      kind: "stated_belief",
      text: "He pushes back on agent hype: 'the decade of agents,' not the year — early agents like Claude and Codex are impressive and used daily, but lack continual learning and remain 'cognitively lacking,' with roughly a decade of work ahead; AGI, in his estimate, is still about a decade away.",
      sourceIds: [S.dwarkesh, S.dwarkeshYt],
    },
    {
      id: "claim-belief-rl-terrible",
      kind: "stated_belief",
      text: "He says reinforcement learning is 'terrible' — but everything else is much worse — and argues LLMs do not learn the way humans do, in part because naive self-training produces model collapse.",
      sourceIds: [S.dwarkesh],
    },
    {
      id: "claim-belief-ghosts",
      kind: "stated_belief",
      text: "He describes LLMs as 'ghosts' rather than animals — 'we're summoning ghosts, not building animals': stochastic simulations of people with superhuman recall alongside jagged, unreliable deficits.",
      sourceIds: [S.dwarkesh, S.sequoia],
    },
    {
      id: "claim-belief-leash",
      kind: "stated_belief",
      text: "On products he advocates 'partial autonomy': keep the AI on a leash, make the human verification loop fast with GUIs, and give users an 'autonomy slider' rather than accepting 10,000-line diffs.",
      sourceIds: [S.ycTalk],
    },
    {
      id: "claim-belief-education-passion",
      kind: "stated_belief",
      text: "He describes Eureka Labs as 'the culmination of my passion in both AI and education over ~2 decades,' tracing a line from early YouTube tutorials through CS231n to Zero to Hero.",
      sourceIds: [S.reutersEureka, S.eureka],
    },
    {
      id: "claim-belief-teacher-ai-symbiosis",
      kind: "stated_belief",
      text: "His model for AI education is 'teacher + AI symbiosis': human experts still design course material while AI teaching assistants guide students through it, aiming to let 'anyone learn anything.'",
      sourceIds: [S.reutersEureka],
    },
    {
      id: "claim-belief-understanding",
      kind: "stated_belief",
      text: "At AI Ascent 2026 he argued that agentic engineering — not vibe coding — is the serious discipline forming on top of natural-language coding, and that 'you can outsource your thinking but never your understanding.'",
      sourceIds: [S.sequoia],
    },
    {
      id: "claim-belief-tesla-love",
      kind: "stated_belief",
      text: "On leaving Tesla he told Lex Fridman he loves the company and Musk, found the decision hard, and would be interested in returning 'at some point' for a potential 'Act 2.'",
      sourceIds: [S.lex333],
    },
    {
      id: "claim-belief-demo-product-gap",
      kind: "stated_belief",
      text: "He uses self-driving as the template for AI timelines: a Waymo demo impressed him around 2014 yet it took roughly a decade to become a payable product — a 'demo to product' gap he expects to recur with AGI, before any 'globalization' of the capability.",
      sourceIds: [S.noPriors80],
    },
    {
      id: "claim-belief-not-brain",
      kind: "stated_belief",
      text: "He is hesitant about brain analogies for neural nets: trained models arrive through a very different optimization process than biological evolution, so he calls them 'a very complicated alien artifact.'",
      sourceIds: [S.lex333],
    },
    // -- patterns ------------------------------------------------------------
    {
      id: "claim-pattern-pedagogy",
      kind: "pattern",
      text: "Across a decade his signature artifact is the minimal, readable reference implementation paired with a step-by-step walkthrough: char-rnn (2015), ConvNetJS and the CS231n assignments, micrograd (2020), minGPT (2020), nanoGPT (2022), llm.c (2024) and nanochat (2025).",
      sourceIds: [S.charRnn, S.stanfordBio, S.micrograd, S.minGpt, S.nanoGpt, S.llmc, S.nanochat],
    },
    {
      id: "claim-pattern-coinage",
      kind: "pattern",
      text: "He repeatedly names paradigm shifts in ways that stick: 'Software 2.0' (2017), 'the hottest new programming language is English' (2023), 'vibe coding' (2025), and 'Software 3.0' (2025).",
      sourceIds: [S.sw2, S.englishPost, S.vibePost, S.ycTalk],
    },
    {
      id: "claim-pattern-autonomy-caution",
      kind: "pattern",
      text: "Across Lex Fridman (2022), No Priors (2024), Dwarkesh (2025) and his YC keynote he consistently dampens full-autonomy hype while crediting real progress — the same 'demo vs. product' lesson he draws from five years in self-driving.",
      sourceIds: [S.lex333, S.noPriors80, S.dwarkesh, S.ycTalk],
    },
    {
      id: "claim-pattern-public-building",
      kind: "pattern",
      text: "He builds in public: repos, lecture videos and X announcements ship together, and he announced Eureka Labs early 'so that I can build publicly instead of keeping a secret that isn't.'",
      sourceIds: [S.reutersEureka, S.nanochat, S.site],
    },
    {
      id: "claim-pattern-educator-framing",
      kind: "pattern",
      text: "Press coverage of his career moves consistently foregrounds his educator role — TIME calls him 'one of the internet's most-beloved AI instructors' — and his tutorial videos are measured in millions of views.",
      sourceIds: [S.time100, S.tcOpenAIExit],
    },
    {
      id: "claim-pattern-small-to-large",
      kind: "pattern",
      text: "His pedagogy escalates one stack at a time: scalar autograd (micrograd) → character models (makemore) → GPT-2 scale (nanoGPT, llm.c) → full pipeline with post-training and evaluation (nanochat), mirroring the industry's own scale-up.",
      sourceIds: [S.micrograd, S.nanoGpt, S.llmc, S.nanochat, S.zeroToHero],
    },
    // -- speculation ---------------------------------------------------------
    {
      id: "claim-spec-departures",
      kind: "speculation",
      text: "Neither his Tesla nor his second OpenAI departure has a publicly stated cause; he called both amicable. Reporting notes the Tesla exit followed a sabbatical and coincided with the San Mateo Autopilot layoffs, and the OpenAI exit came months after the Altman ouster — but no source establishes a causal link.",
      sourceIds: [S.reutersTeslaExit, S.tcOpenAIExit],
    },
    {
      id: "claim-spec-eureka-status",
      kind: "speculation",
      text: "The state of Eureka Labs is thin in the public record: the LLM101n repo is archived with a note that the course 'does not yet exist,' and after joining Anthropic in May 2026 he said he plans to resume education work 'in time' — the company's current roadmap is undetermined.",
      sourceIds: [S.llm101n, S.tcAnthropic],
    },
    {
      id: "claim-spec-autopilot-attribution",
      kind: "speculation",
      text: "The precise line between his personal contributions and the Autopilot team's collective work is not publicly delineated; his own framing is that he 'led the computer vision team,' and technical details come largely from his own talks rather than independent engineering records.",
      sourceIds: [S.site, S.teslaAiDay, S.cvpr20],
    },
    {
      id: "claim-spec-openai2-output",
      kind: "speculation",
      text: "What his 2023–2024 OpenAI midtraining and synthetic-data team shipped is undocumented outside his own bio; OpenAI said only that his responsibilities transitioned to a senior researcher who worked closely with him.",
      sourceIds: [S.site, S.tcOpenAIExit],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1986-10-23",
      title: "Born in Bratislava, Czechoslovakia (now Slovakia)",
      summary: "Moved with his family to Toronto at age 15.",
      location: "Bratislava",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-uoft",
      kind: "education",
      date: "2009",
      title: "BSc, University of Toronto",
      summary: "Bachelor's degrees in computer science and physics.",
      organization: "University of Toronto",
      location: "Toronto",
      organizationHandle: "university-of-toronto",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-ubc",
      kind: "education",
      date: "2011",
      title: "MSc, University of British Columbia",
      summary:
        "Master's work on physically simulated figures with Michiel van de Panne.",
      organization: "University of British Columbia",
      organizationHandle: "university-of-british-columbia",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-stanford-phd",
      kind: "education",
      date: "2011",
      end: "2016-08",
      title: "PhD in computer science, Stanford University",
      summary:
        "Advised by Fei-Fei Li at the Stanford Vision Lab; dissertation 'Connecting Images and Natural Language' completed August 2016.",
      organization: "Stanford University",
      organizationHandle: "stanford-university",
      sourceIds: [S.thesis, S.stanfordBio],
    },
    {
      id: "event-cs231n",
      kind: "education",
      date: "2015",
      title: "Created and taught CS231n",
      summary:
        "With Fei-Fei Li, designed Stanford's first deep learning course and served as primary instructor; enrollment grew from 150 (2015) to 750 (2017).",
      organization: "Stanford University",
      organizationHandle: "stanford-university",
      sourceIds: [S.cs231n, S.stanfordBio],
    },
    {
      id: "event-rnn-post",
      kind: "publication",
      date: "2015-05-21",
      title: "'The Unreasonable Effectiveness of Recurrent Neural Networks'",
      summary:
        "Blog post plus char-rnn release showing character-level LSTM models writing plausible Shakespeare, LaTeX and code.",
      sourceIds: [S.rnnPost, S.charRnn],
    },
    {
      id: "event-openai-founding",
      kind: "founded",
      date: "2015-12-11",
      end: "2017-06",
      title: "Founding member and research scientist, OpenAI",
      summary:
        "Named among the founding research engineers and scientists in OpenAI's launch post.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.openaiIntro],
    },
    {
      id: "event-universe",
      kind: "project",
      date: "2016-12-05",
      title: "OpenAI Universe / World of Bits released",
      summary:
        "Led the World of Bits browser-task benchmark within OpenAI's Universe agent platform.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.openaiUniverse],
    },
    {
      id: "event-backprop-post",
      kind: "publication",
      date: "2016-12-19",
      title: "'Yes you should understand backprop'",
      summary:
        "Essay arguing backpropagation is a leaky abstraction practitioners must internalize.",
      sourceIds: [S.backpropPost],
    },
    {
      id: "event-tesla",
      kind: "role",
      date: "2017-06-20",
      end: "2022-07-13",
      title: "Director (later Sr. Director) of AI, Tesla",
      summary:
        "Led Autopilot computer vision — data labeling, training, on-chip deployment — reporting to Elon Musk; briefly also Tesla Optimus.",
      organization: "Tesla",
      organizationHandle: "tesla",
      sourceIds: [S.tcTesla, S.site, S.reutersTeslaExit],
    },
    {
      id: "event-software2",
      kind: "publication",
      date: "2017-11-11",
      title: "'Software 2.0' essay",
      summary:
        "Argued neural networks mark a shift from hand-written code to weights compiled from data.",
      sourceIds: [S.sw2],
    },
    {
      id: "event-autonomy-day",
      kind: "media",
      date: "2019-04-22",
      title: "Presented at Tesla Autonomy Day",
      summary:
        "Explained the neural-network stack, fleet learning and the data engine to investors.",
      organization: "Tesla",
      organizationHandle: "tesla",
      sourceIds: [S.teslaAutonomy],
    },
    {
      id: "event-tr35",
      kind: "award",
      date: "2020",
      title: "MIT Technology Review Innovator Under 35",
      summary: "Honored for neural networks that let automated cars 'see.'",
      organization: "MIT Technology Review",
      organizationHandle: "mit-technology-review",
      sourceIds: [S.mitTr],
    },
    {
      id: "event-mingpt",
      kind: "project",
      date: "2020-08",
      title: "Released minGPT",
      summary:
        "Minimal, educational PyTorch re-implementation of GPT training and inference.",
      sourceIds: [S.minGpt],
    },
    {
      id: "event-ai-day",
      kind: "media",
      date: "2021-08-19",
      title: "Led the vision deep dive at Tesla AI Day",
      summary:
        "Presented the eight-camera vision stack producing a 3D vector-space representation for Autopilot.",
      organization: "Tesla",
      organizationHandle: "tesla",
      sourceIds: [S.teslaAiDay],
    },
    {
      id: "event-tesla-exit",
      kind: "milestone",
      date: "2022-07-13",
      title: "Left Tesla",
      summary:
        "Announced his departure after a months-long sabbatical; said he would revisit AI technical work, open source and education.",
      sourceIds: [S.reutersTeslaExit],
    },
    {
      id: "event-zero-to-hero",
      kind: "project",
      date: "2022-08-16",
      title: "Started 'Neural Networks: Zero to Hero'",
      summary:
        "The micrograd lecture opened a from-scratch course building neural networks step by step.",
      sourceIds: [S.microgradLecture, S.zeroToHero],
    },
    {
      id: "event-lex333",
      kind: "media",
      date: "2022-10-29",
      title: "Lex Fridman Podcast #333",
      summary:
        "Long-form interview on Tesla AI, self-driving, Optimus, Software 2.0 and AGI.",
      sourceIds: [S.lex333],
    },
    {
      id: "event-nanogpt",
      kind: "project",
      date: "2022-12",
      title: "Created nanoGPT",
      summary:
        "A minGPT rewrite 'with teeth': ~300-line training loop reproducing GPT-2 (124M).",
      sourceIds: [S.nanoGpt],
    },
    {
      id: "event-english-post",
      kind: "milestone",
      date: "2023-01-24",
      title: "'The hottest new programming language is English'",
      summary:
        "Viral post anticipating natural-language programming of LLMs.",
      sourceIds: [S.englishPost],
    },
    {
      id: "event-openai-return",
      kind: "role",
      date: "2023-02-09",
      end: "2024-02-12",
      title: "Rejoined OpenAI",
      summary:
        "Built a new team working on midtraining and synthetic data generation, per his own bio.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.site, S.tcOpenAIExit],
    },
    {
      id: "event-state-of-gpt",
      kind: "media",
      date: "2023-05",
      title: "'State of GPT' at Microsoft Build",
      summary:
        "Explained the GPT assistant training pipeline from pretraining through RLHF.",
      organization: "Microsoft",
      organizationHandle: "microsoft",
      sourceIds: [S.stateOfGpt],
    },
    {
      id: "event-intro-llm",
      kind: "publication",
      date: "2023-11-23",
      title: "'Intro to Large Language Models' video",
      summary:
        "One-hour general-audience talk covering what LLMs are, where they are headed, and security issues.",
      sourceIds: [S.introLlm],
    },
    {
      id: "event-llmc",
      kind: "project",
      date: "2024",
      title: "Started llm.c",
      summary:
        "LLM pretraining in raw C/CUDA reproducing the GPT-2/GPT-3 miniseries.",
      sourceIds: [S.llmc],
    },
    {
      id: "event-gpt2-video",
      kind: "media",
      date: "2024-06-09",
      title: "'Let's reproduce GPT-2 (124M)' video",
      summary:
        "Four-hour from-scratch build of GPT-2 ending in an overnight training run.",
      sourceIds: [S.gpt2Video],
    },
    {
      id: "event-eureka",
      kind: "founded",
      date: "2024-07-16",
      title: "Announced Eureka Labs",
      summary:
        "An 'AI native' school built around a teacher + AI-assistant symbiosis; first product the announced LLM101n course.",
      organization: "Eureka Labs",
      organizationHandle: "eureka-labs",
      sourceIds: [S.reutersEureka, S.eureka],
    },
    {
      id: "event-time100",
      kind: "award",
      date: "2024-09-05",
      title: "Named to TIME100 AI 2024",
      summary:
        "Recognized among the year's most influential people in AI, with emphasis on his teaching.",
      organization: "TIME",
      organizationHandle: "time",
      sourceIds: [S.time100],
    },
    {
      id: "event-vibe-coding",
      kind: "milestone",
      date: "2025-02-02",
      title: "Coined 'vibe coding'",
      summary:
        "X post naming the fully-delegated, code-forgetting style of AI-assisted programming.",
      sourceIds: [S.vibePost, S.vibeArchive],
    },
    {
      id: "event-yc-talk",
      kind: "media",
      date: "2025-06-19",
      title: "'Software Is Changing (Again)' keynote",
      summary:
        "Y Combinator AI Startup School talk introducing the 'Software 3.0' framing.",
      organization: "Y Combinator",
      organizationHandle: "y-combinator",
      sourceIds: [S.ycTalk],
    },
    {
      id: "event-nanochat",
      kind: "project",
      date: "2025-10-13",
      title: "Released nanochat",
      summary:
        "'The best ChatGPT that $100 can buy' — a minimal end-to-end LLM harness.",
      sourceIds: [S.nanochat],
    },
    {
      id: "event-dwarkesh",
      kind: "media",
      date: "2025-10-17",
      title: "Dwarkesh Podcast interview",
      summary:
        "Two-and-a-half-hour conversation: 'AGI is still a decade away,' RL critique, ghosts vs. animals, education.",
      sourceIds: [S.dwarkesh, S.dwarkeshYt],
    },
    {
      id: "event-collins-woty",
      kind: "milestone",
      date: "2025-11-06",
      title: "'Vibe coding' named Collins Word of the Year 2025",
      summary:
        "The dictionary credited Karpathy with coining the term in February 2025.",
      sourceIds: [S.bbcCollins, S.vibeWiki],
    },
    {
      id: "event-anthropic",
      kind: "role",
      date: "2026-05-19",
      title: "Joined Anthropic's pretraining team",
      summary:
        "Announced on X; building a team that uses Claude to accelerate pretraining research, under lead Nick Joseph.",
      organization: "Anthropic",
      organizationHandle: "anthropic",
      sourceIds: [S.tcAnthropic],
    },
  ],
  themes: [
    {
      id: "theme-education-infrastructure",
      kind: "philosophy",
      status: "stated",
      title: "Education as a first-class engineering project",
      summary:
        "From CS231n's browser demos through the Zero to Hero series to Eureka Labs' 'teacher + AI symbiosis,' he treats teaching not as outreach but as the core work — and calls Eureka 'the culmination of my passion in both AI and education over ~2 decades.'",
      sourceIds: [S.cs231n, S.zeroToHero, S.reutersEureka, S.eureka, S.site],
    },
    {
      id: "theme-software-paradigms",
      kind: "philosophy",
      status: "stated",
      title: "Software 1.0, 2.0, 3.0",
      summary:
        "A decade-long framing project: 2017's 'Software 2.0' cast weights-trained-from-data as the new code; the 2025 'Software 3.0' talk casts English-prompted LLMs as the next major version — a new kind of computer programmed in natural language.",
      sourceIds: [S.sw2, S.ycTalk, S.englishPost],
    },
    {
      id: "theme-human-readable-ml",
      kind: "method",
      status: "stated",
      title: "Human-readable machine learning",
      summary:
        "His libraries are sized for reading, not just running: char-rnn, micrograd (~100 lines), minGPT (~300-line model), nanoGPT, llm.c in raw C/CUDA, nanochat end-to-end. 'GPT is not a complicated model,' the minGPT README insists.",
      sourceIds: [S.charRnn, S.micrograd, S.minGpt, S.nanoGpt, S.llmc, S.nanochat],
    },
    {
      id: "theme-autonomy-skepticism",
      kind: "belief",
      status: "stated",
      title: "Autonomy skepticism",
      summary:
        "He repeatedly cools agent and self-driving hype: keep AI 'on the leash,' ship partial autonomy with an autonomy slider, expect a decade of agents — not a year — because the demo-to-product gap in self-driving took a decade to close.",
      sourceIds: [S.ycTalk, S.dwarkesh, S.noPriors80, S.lex333],
    },
    {
      id: "theme-leaky-abstractions",
      kind: "belief",
      status: "stated",
      title: "Know the leaky abstractions",
      summary:
        "Backprop is a 'leaky abstraction'; neural nets are not off-the-shelf. His recipe: inspect data before model code, build dumb baselines, add verified complexity in small steps. Understanding is the part that cannot be outsourced.",
      sourceIds: [S.backpropPost, S.recipePost, S.sequoia],
    },
    {
      id: "theme-llm-as-computer",
      kind: "philosophy",
      status: "stated",
      title: "LLMs as a new kind of computer",
      summary:
        "LLMs are utilities, fabs and early operating systems rolled into one — 'people spirits' simulated by an autoregressive Transformer — so software should be rebuilt for agents, GUIs should speed human verification, and psychology is as relevant as architecture.",
      sourceIds: [S.ycTalk, S.introLlm],
    },
    {
      id: "theme-ghosts-not-animals",
      kind: "belief",
      status: "stated",
      title: "Ghosts, not animals",
      summary:
        "LLMs are stochastic simulations of people distilled from internet text — jagged intelligence with superhuman recall and real deficits — not artificial animals or brains. This shapes how he expects the technology to mature: summoned entities needing taste and oversight, not trusted autonomous creatures.",
      sourceIds: [S.dwarkesh, S.dwarkeshYt, S.sequoia],
    },
    {
      id: "theme-self-driving-lens",
      kind: "influence",
      status: "stated",
      title: "Self-driving as the reference lesson",
      summary:
        "Five years on Autopilot supply his analogies for AGI: demos deceive, products take a decade, globalization takes longer, and safety-critical deployment punishes the over-confident.",
      sourceIds: [S.noPriors80, S.dwarkesh, S.lex333],
    },
    {
      id: "theme-build-in-public",
      kind: "practice",
      status: "reported",
      title: "Building and teaching in public",
      summary:
        "Repos, lectures and announcements ship together on GitHub, YouTube and X; Eureka Labs was announced early specifically so he could 'build publicly.' Coverage consistently frames him as the field's most-watched explainer.",
      sourceIds: [S.reutersEureka, S.time100, S.site, S.nanochat],
    },
  ],
  works: [
    {
      id: "work-thesis",
      kind: "paper",
      status: "published",
      title: "Connecting Images and Natural Language",
      date: "2016-08",
      location: "Stanford University",
      summary:
        "PhD dissertation: multimodal embeddings, image captioning and dense captioning connecting visual data to natural language.",
      sourceIds: [S.thesis],
    },
    {
      id: "work-cvpr2015",
      kind: "paper",
      status: "published",
      title: "Deep Visual-Semantic Alignments for Generating Image Descriptions",
      date: "2015",
      summary:
        "CVPR 2015 paper with Fei-Fei Li aligning image regions and sentence snippets, a foundation of his dissertation.",
      sourceIds: [S.cvpr2015],
    },
    {
      id: "work-cs231n",
      kind: "other",
      status: "completed",
      title: "CS231n: Convolutional Neural Networks for Visual Recognition",
      date: "2015",
      location: "Stanford University",
      summary:
        "Stanford's first deep learning course, co-designed with Fei-Fei Li; he was primary instructor as enrollment grew 150→750 across three offerings.",
      sourceIds: [S.cs231n, S.stanfordBio],
    },
    {
      id: "work-char-rnn",
      kind: "project",
      status: "released",
      title: "char-rnn",
      date: "2015-05",
      summary:
        "Multi-layer RNN/LSTM/GRU character-level language models in Torch, released with the 'Unreasonable Effectiveness' post.",
      sourceIds: [S.charRnn, S.rnnPost],
    },
    {
      id: "work-convnetjs",
      kind: "project",
      status: "released",
      title: "ConvNetJS and browser deep learning libraries",
      summary:
        "ConvNetJS, RecurrentJS, REINFORCEjs and t-sneJS — neural networks trained entirely in the browser, powering CS231n's live demos.",
      sourceIds: [S.stanfordBio],
    },
    {
      id: "work-universe",
      kind: "project",
      status: "released",
      title: "World of Bits (OpenAI Universe)",
      date: "2016-12-05",
      location: "OpenAI",
      summary:
        "Browser-task benchmark inside OpenAI's Universe agent platform; he led the sub-project.",
      sourceIds: [S.openaiUniverse],
    },
    {
      id: "work-software2",
      kind: "other",
      status: "published",
      title: "'Software 2.0' essay",
      date: "2017-11-11",
      summary:
        "The essay that named the paradigm of writing software in neural network weights rather than explicit code.",
      sourceIds: [S.sw2],
    },
    {
      id: "work-micrograd",
      kind: "project",
      status: "released",
      title: "micrograd",
      date: "2020",
      summary:
        "A ~100-line scalar-valued autograd engine with a ~50-line neural-net library; the opening artifact of Zero to Hero.",
      sourceIds: [S.micrograd, S.microgradLecture],
    },
    {
      id: "work-mingpt",
      kind: "project",
      status: "released",
      title: "minGPT",
      date: "2020-08",
      summary:
        "Minimal PyTorch re-implementation of GPT training and inference, built for readability; later semi-archived in favor of nanoGPT.",
      sourceIds: [S.minGpt],
    },
    {
      id: "work-zero-to-hero",
      kind: "other",
      status: "ongoing",
      title: "Neural Networks: Zero to Hero",
      date: "2022-08",
      summary:
        "Video course coding neural networks from scratch — backprop through makemore to GPT and tokenizers — with notebooks and exercises.",
      sourceIds: [S.zeroToHero, S.microgradLecture],
    },
    {
      id: "work-nanogpt",
      kind: "project",
      status: "released",
      title: "nanoGPT",
      date: "2022-12",
      summary:
        "'The simplest, fastest repository for training/finetuning medium-sized GPTs'; now deprecated in favor of nanochat.",
      sourceIds: [S.nanoGpt],
    },
    {
      id: "work-llmc",
      kind: "project",
      status: "released",
      title: "llm.c",
      date: "2024",
      summary:
        "LLM pretraining in raw C/CUDA — no heavy framework dependency — reproducing the GPT-2/GPT-3 miniseries.",
      sourceIds: [S.llmc],
    },
    {
      id: "work-nanochat",
      kind: "project",
      status: "released",
      title: "nanochat",
      date: "2025-10-13",
      summary:
        "Minimal end-to-end LLM harness — tokenization through RL and inference — pitched as 'the best ChatGPT that $100 can buy.'",
      sourceIds: [S.nanochat],
    },
    {
      id: "work-llm101n",
      kind: "project",
      status: "proposed",
      title: "LLM101n: Let's build a Storyteller",
      date: "2024-07",
      location: "Eureka Labs",
      summary:
        "The announced first Eureka Labs course — an undergraduate-level class building a storyteller LLM end to end; repo archived while under development.",
      sourceIds: [S.llm101n, S.reutersEureka],
    },
    {
      id: "work-eureka",
      kind: "other",
      status: "ongoing",
      title: "Eureka Labs",
      date: "2024-07-16",
      location: "San Francisco",
      summary:
        "His company: 'a new kind of school that is AI native,' built on teacher + AI teaching-assistant symbiosis.",
      sourceIds: [S.eureka, S.reutersEureka],
    },
    {
      id: "work-arxivsanity",
      kind: "project",
      status: "released",
      title: "arxiv-sanity",
      summary:
        "Search and ranking tool over tens of thousands of machine learning arXiv papers, maintained since his PhD years.",
      sourceIds: [S.stanfordBio],
    },
  ],
  appearances: [
    {
      id: "appearance-autonomy-day",
      title: "Tesla Autonomy Day",
      venue: "Tesla investor event (livestream)",
      publishedAt: "2019-04-22",
      participants: ["Andrej Karpathy", "Elon Musk", "Pete Bannon", "Stuart Bowers"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
        { name: "Elon Musk", handle: "elon-musk" },
        { name: "Pete Bannon", handle: "pete-bannon" },
        { name: "Stuart Bowers", handle: "stuart-bowers" },
      ],
      summary:
        "Presented the neural-network stack and fleet-learning 'data engine' behind Autopilot.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=Ucp0TTmvqOE",
          sourceId: S.teslaAutonomy,
        },
      ],
      sourceIds: [S.teslaAutonomy],
    },
    {
      id: "appearance-cvpr20",
      title: "CVPR'20 Workshop on Scalability in Autonomous Driving keynote",
      venue: "CVPR 2020",
      publishedAt: "2020-06",
      participants: ["Andrej Karpathy"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
      ],
      summary:
        "Keynote on Tesla's multi-task neural networks and data engine for autonomous driving.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=g2R2T631x7k",
          sourceId: S.cvpr20,
        },
      ],
      sourceIds: [S.cvpr20],
    },
    {
      id: "appearance-ai-day",
      title: "Tesla AI Day 2021",
      venue: "Tesla (Palo Alto)",
      publishedAt: "2021-08-19",
      participants: ["Andrej Karpathy", "Elon Musk", "Ashok Elluswamy", "Milan Kovac", "Ganesh Venkataramanan"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
        { name: "Elon Musk", handle: "elon-musk" },
        { name: "Ashok Elluswamy", handle: "ashok-elluswamy" },
        { name: "Milan Kovac", handle: "milan-kovac" },
        { name: "Ganesh Venkataramanan", handle: "ganesh-venkataramanan" },
      ],
      summary:
        "Opened the technical deep dives with the Autopilot vision stack: eight cameras fused into a 3D vector space.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=j0z4FweCy4M",
          sourceId: S.teslaAiDay,
        },
      ],
      sourceIds: [S.teslaAiDay],
    },
    {
      id: "appearance-lex333",
      title:
        "#333 – Andrej Karpathy: Tesla AI, Self-Driving, Optimus, Aliens, and AGI",
      venue: "Lex Fridman Podcast",
      publishedAt: "2022-10-29",
      participants: ["Andrej Karpathy", "Lex Fridman"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
        { name: "Lex Fridman", handle: "lex-fridman" },
      ],
      summary:
        "Long-form interview spanning neural nets, Transformers, Software 2.0, Tesla's data engine, leaving Tesla, and AGI.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=cdiD-9MMpb0",
          sourceId: S.lex333,
        },
      ],
      sourceIds: [S.lex333],
    },
    {
      id: "appearance-micrograd",
      title:
        "The spelled-out intro to neural networks and backpropagation: building micrograd",
      venue: "Andrej Karpathy (YouTube)",
      publishedAt: "2022-08-16",
      participants: ["Andrej Karpathy"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
      ],
      summary:
        "The first Zero to Hero lecture: build a scalar autograd engine, then a neural net, from a blank notebook.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=VMj-3S1tku0",
          sourceId: S.microgradLecture,
        },
      ],
      sourceIds: [S.microgradLecture],
    },
    {
      id: "appearance-state-of-gpt",
      title: "State of GPT",
      venue: "Microsoft Build 2023",
      publishedAt: "2023-05",
      participants: ["Andrej Karpathy"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
      ],
      summary:
        "Breakout talk on the GPT assistant training pipeline and practical mental models for using LLMs.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=bZQun8Y4L2A",
          sourceId: S.stateOfGpt,
        },
      ],
      sourceIds: [S.stateOfGpt],
    },
    {
      id: "appearance-intro-llm",
      title: "[1hr Talk] Intro to Large Language Models",
      venue: "Andrej Karpathy (YouTube)",
      publishedAt: "2023-11-23",
      participants: ["Andrej Karpathy"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
      ],
      summary:
        "General-audience talk on what LLMs are, the LLM-OS analogy, and security issues like jailbreaks and prompt injection.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
          sourceId: S.introLlm,
        },
      ],
      sourceIds: [S.introLlm],
    },
    {
      id: "appearance-gpt2",
      title: "Let's reproduce GPT-2 (124M)",
      venue: "Andrej Karpathy (YouTube)",
      publishedAt: "2024-06-09",
      participants: ["Andrej Karpathy"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
      ],
      summary:
        "Four-hour build of GPT-2 124M from scratch — implementation, speedups, hyperparameters, then an overnight training run.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=l8pRSuU81PU",
          sourceId: S.gpt2Video,
        },
      ],
      sourceIds: [S.gpt2Video],
    },
    {
      id: "appearance-nopriors80",
      title: "The Road to Autonomous Intelligence (No Priors Ep. 80)",
      venue: "No Priors",
      publishedAt: "2024-09-05",
      participants: ["Andrej Karpathy", "Sarah Guo", "Elad Gil"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
        { name: "Sarah Guo", handle: "sarah-guo" },
        { name: "Elad Gil", handle: "elad-gil" },
      ],
      summary:
        "Self-driving lessons for AGI, Tesla vs. Waymo, Optimus, and Eureka Labs' education plans.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=hM_h0UA7upI",
          sourceId: S.noPriors80,
        },
      ],
      sourceIds: [S.noPriors80],
    },
    {
      id: "appearance-deepdive",
      title: "Deep Dive into LLMs like ChatGPT",
      venue: "Andrej Karpathy (YouTube)",
      publishedAt: "2025-02-05",
      participants: ["Andrej Karpathy"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
      ],
      summary:
        "Three-and-a-half-hour walkthrough of the full LLM training stack: pretraining, tokenization, SFT, RL and RLHF.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
          sourceId: S.deepDive,
        },
      ],
      sourceIds: [S.deepDive],
    },
    {
      id: "appearance-yc",
      title: "Software Is Changing (Again)",
      venue: "Y Combinator AI Startup School, San Francisco",
      publishedAt: "2025-06-19",
      participants: ["Andrej Karpathy"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
      ],
      summary:
        "Keynote introducing 'Software 3.0': LLMs as a new kind of computer, partial autonomy, and building for agents.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=LCEmiRjPEtQ",
          sourceId: S.ycTalk,
        },
      ],
      sourceIds: [S.ycTalk],
    },
    {
      id: "appearance-dwarkesh",
      title: "Andrej Karpathy — AGI is still a decade away",
      venue: "Dwarkesh Podcast",
      publishedAt: "2025-10-17",
      participants: ["Andrej Karpathy", "Dwarkesh Patel"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
        { name: "Dwarkesh Patel", handle: "dwarkesh-patel" },
      ],
      summary:
        "'We're summoning ghosts, not building animals': why RL is terrible, why agents need a decade, and the future of education.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=lXUZvyajciY",
          sourceId: S.dwarkeshYt,
        },
        {
          type: "transcript",
          url: "https://www.dwarkesh.com/p/andrej-karpathy",
          sourceId: S.dwarkesh,
        },
      ],
      sourceIds: [S.dwarkesh, S.dwarkeshYt],
    },
    {
      id: "appearance-nopriors26",
      title: "Andrej Karpathy on Code Agents, AutoResearch, and the Loopy Era of AI",
      venue: "No Priors",
      publishedAt: "2026-03-20",
      participants: ["Andrej Karpathy", "Sarah Guo"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
        { name: "Sarah Guo", handle: "sarah-guo" },
      ],
      summary:
        "On code-agent mastery, autonomous research loops, jobs, and agentic education.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=kwSVtQ7dziU",
          sourceId: S.noPriors26,
        },
      ],
      sourceIds: [S.noPriors26],
    },
    {
      id: "appearance-sequoia",
      title: "From Vibe Coding to Agentic Engineering",
      venue: "Sequoia AI Ascent 2026",
      publishedAt: "2026-04-30",
      participants: ["Andrej Karpathy", "Stephanie Zhan"],
      participantHandles: [
        { name: "Andrej Karpathy", handle: "andrej-karpathy" },
        { name: "Stephanie Zhan", handle: "stephanie-zhan" },
      ],
      summary:
        "A year after coining 'vibe coding': agentic engineering as the serious discipline, LLMs as ghosts, and why understanding can't be outsourced.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=96jN2OCOfLs",
          sourceId: S.sequoia,
        },
      ],
      sourceIds: [S.sequoia],
    },
  ],
  relations: [
    {
      id: "rel-lex-fridman",
      kind: "interviewed_by",
      target: "lex-fridman",
      targetName: "Lex Fridman",
      note: "Lex Fridman Podcast #333, October 2022.",
      targetWikidataId: "Q76448707",
      sourceIds: [S.lex333],
    },
    {
      id: "rel-dwarkesh-patel",
      kind: "interviewed_by",
      target: "dwarkesh-patel",
      targetName: "Dwarkesh Patel",
      note: "October 2025 episode of the Dwarkesh Podcast — 'AGI is still a decade away.'",
      targetWikidataId: "Q137008739",
      sourceIds: [S.dwarkesh, S.dwarkeshYt],
    },
  ],
  openQuestions: [
    "The precise boundary between his personal engineering contributions and the Autopilot team's collective work is not publicly delineated; most technical detail comes from his own presentations.",
    "No public source states why he left Tesla in July 2022 or OpenAI in February 2024; both exits were framed as amicable, and reporting notes only adjacent events (the San Mateo layoffs, the post-ouster reorganization).",
    "What his 2023–2024 OpenAI midtraining/synthetic-data team shipped is undocumented; the only account is his own bio.",
    "Eureka Labs' status is unresolved: the LLM101n repo is archived pending development, and after joining Anthropic in May 2026 he said education work would resume 'in time' without specifics.",
    "Sources vary between 'founding member' (OpenAI's own launch post) and 'co-founder' (later press) when describing his OpenAI role.",
    "His birth date (October 23, 1986) is carried by reference sources — Wikidata and Wikipedia — without a primary public record in this catalog.",
    "Video view counts, repository star counts, and enrollment figures cited in coverage are point-in-time self-reports or platform counters, not audited figures.",
    "The 2026 Anthropic role is described at team level (pretraining, under Nick Joseph); its charter beyond 'using Claude to accelerate pretraining research' is not yet public.",
  ],
  body: `Andrej Karpathy is a Slovak-Canadian AI researcher who has had an unusual double career: he has held some of the most consequential engineering jobs in the field — founding member of OpenAI, director of AI for Tesla Autopilot — while becoming, in parallel, its most-watched teacher. Both halves run on the same conviction, stated in his 2016 essay "Yes you should understand backprop": the important systems are leaky abstractions, and the only durable advantage is understanding what is underneath.

## Formation

Born October 23, 1986 in Bratislava, then Czechoslovakia, he moved to Toronto at fifteen. A double bachelor's in computer science and physics at the University of Toronto (2009) was followed by a master's at UBC (2011) on physically simulated figures under Michiel van de Panne, then a Stanford PhD (2016) advised by Fei-Fei Li. His dissertation, "Connecting Images and Natural Language," and the CVPR 2015 paper "Deep Visual-Semantic Alignments" with Li helped establish image captioning and dense captioning as working research areas. Along the way he squeezed in two Google internships on YouTube-scale feature learning and a 2015 DeepMind internship on deep reinforcement learning.

The education thread starts here too. With Li he designed CS231n — Stanford's first deep learning course — and was its primary instructor as enrollment grew from 150 in 2015 to 750 in 2017, per his Stanford bio. He also wrote the browser-based deep learning libraries (ConvNetJS, RecurrentJS, REINFORCEjs, t-sneJS) that powered the course's live demos, built arxiv-sanity, and in May 2015 published "The Unreasonable Effectiveness of Recurrent Neural Networks" — the post, with its char-rnn code release, that made character-level language models a rite of passage.

## OpenAI, Tesla, OpenAI again

OpenAI's December 11, 2015 launch post lists him among the founding research engineers and scientists. There he led the World of Bits browser-agent benchmark inside the Universe platform (December 2016). In June 2017 Tesla hired him as Director of AI and Autopilot Vision, reporting directly to Elon Musk. His own summary of the five years that followed: he led the computer vision team of Tesla Autopilot — and very briefly Tesla Optimus — running in-house data labeling, neural network training, and deployment onto Tesla's custom inference chip. The public record of that work is mostly his own stagecraft: the Autonomy Day 2019 talk on fleet learning and the "data engine," the CVPR'20 keynote on multi-task networks, and the opening deep dive at Tesla AI Day 2021, where he explained how eight camera streams get fused into a 3D "vector space."

Three months into that same tenure he had also written the essay he is most cited for: "Software 2.0" (November 11, 2017) argued that neural networks are not another ML tool but a new way to write software — the programmer supplies goals and datasets, and optimization compiles them into weights.

He left Tesla on July 13, 2022 after a sabbatical, saying only that he wanted to revisit "technical work in AI, open source and education." What followed made that concrete: the Zero to Hero video course (starting with the micrograd lecture in August 2022), nanoGPT (December 2022), then a return to OpenAI in February 2023 — where, by his own account, he built a team on midtraining and synthetic data — a "State of GPT" talk at Microsoft Build, and the one-hour "Intro to Large Language Models" video. He left OpenAI again in February 2024, insisting there was "no drama," and that July announced Eureka Labs, "a new kind of school that is AI native," built on a teacher + AI-assistant symbiosis with the undergraduate course LLM101n as its announced first product.

## The vocabulary maker

Karpathy keeps naming the thing before everyone else has a word for it. "Software 2.0" in 2017. "The hottest new programming language is English" in January 2023. "Vibe coding" on February 2, 2025 — a tossed-off description of accepting all diffs and forgetting the code exists that MIT Technology Review traced into a movement and Collins Dictionary named its 2025 Word of the Year. His June 2025 YC keynote extended the lineage: "Software 3.0," in which LLMs are a new kind of computer programmed in natural language, and the practical art is partial autonomy — fast human verification loops, GUIs, an "autonomy slider," AI kept on a leash.

The caution is as consistent as the coinage. On Dwarkesh's podcast in October 2025 he called this "the decade of agents," not the year — pushing back on timeline hype while describing models as "ghosts, not animals": jagged stochastic simulations with superhuman recall and real deficits. Five years on Autopilot supply his reference lesson: a Waymo demo impressed him around 2014, and it took a decade to become a payable product.

## The work itself

His public artifacts share a recognizable aesthetic — the smallest code that honestly does the thing: micrograd (~100-line autograd engine), minGPT (~300-line GPT model), nanoGPT (GPT-2 in a ~300-line training loop), llm.c (the same in raw C/CUDA), and nanochat (October 2025, "the best ChatGPT that $100 can buy," covering tokenization through RL and inference). Each ships with a lecture, a walkthrough, or an essay attached. TIME's 2024 TIME100 AI entry framed him as the field's educator first.

## What's unsettled

The seams are visible: the reasons for both his Tesla and second OpenAI exits were never disclosed; the announced Eureka Labs course remains "under development" with its repo archived; and on May 19, 2026 he joined Anthropic's pretraining team — saying he would get back to research and resume education work "in time" — which leaves the school's roadmap open.

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
