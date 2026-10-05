import type { ExampleIndex, SubjectKind } from "../components/example-index-card";
import { examplePortraits } from "./example-portraits";

export const featuredIndexes = [
  {
    handle: "eugene-tssui",
    name: "Eugene Tssui",
    note: "The evolutionary architect who builds like nature does",
  },
  {
    handle: "patrick-collison",
    name: "Patrick Collison",
    note: "Stripe co-founder; progress studies and the craft of speed",
  },
  {
    handle: "christopher-alexander",
    name: "Christopher Alexander",
    note: "A Pattern Language and the quality without a name",
  },
  {
    handle: "michael-levin",
    name: "Michael Levin",
    note: "Bioelectricity, morphogenesis, and unconventional minds",
  },
  {
    handle: "joscha-bach",
    name: "Joscha Bach",
    note: "Synthetic intelligence and computational theories of mind",
  },
  {
    handle: "stephen-wolfram",
    name: "Stephen Wolfram",
    note: "Computation as the foundation of physics",
  },
  {
    handle: "terry-davis",
    name: "Terry A. Davis",
    note: "TempleOS and the single-author operating system",
  },
  {
    handle: "alan-kay",
    name: "Alan Kay",
    note: "Smalltalk, the Dynabook, and computing's unrealized revolution",
  },
  {
    handle: "amelia-wattenberger",
    name: "Amelia Wattenberger",
    note: "Data visualization and interfaces beyond the chat box",
  },
  {
    handle: "anil-dash",
    name: "Anil Dash",
    note: "Blogger since 1999; Six Apart, Glitch, and Monegraph",
  },
  {
    handle: "andrej-karpathy",
    name: "Andrej Karpathy",
    note: "CS231n to Tesla AI to Eureka Labs; teacher of the field",
  },
  {
    handle: "bad-bunny",
    name: "Bad Bunny",
    note: "From grocery bagging to Spotify's most-streamed artist, 2020 to 2022",
  },
  {
    handle: "bjork",
    name: "Björk",
    note: "Iceland's one-woman R&D lab; the app-as-album",
  },
  {
    handle: "bret-victor",
    name: "Bret Victor",
    note: "Inventing on Principle; Dynamicland and tools for thought",
  },
  {
    handle: "brian-eno",
    name: "Brian Eno",
    note: "Ambient music, Oblique Strategies, and scenius",
  },
  {
    handle: "bryan-cantrill",
    name: "Bryan Cantrill",
    note: "DTrace, Oxide, and the rack-scale cloud computer",
  },
  {
    handle: "burial",
    name: "Burial",
    note: "Untrue; the anonymous heart of UK garage",
  },
  {
    handle: "caterina-barbieri",
    name: "Caterina Barbieri",
    note: "Buchla modular composer; patterns of ecstatic computation",
  },
  {
    handle: "conor-white-sullivan",
    name: "Conor White-Sullivan",
    note: "Roam Research and networked thought",
  },
  {
    handle: "cory-doctorow",
    name: "Cory Doctorow",
    note: "Coined enshittification; EFF and the pluralistic canon",
  },
  {
    handle: "dan-snaith",
    name: "Dan Snaith",
    note: "Caribou and Daphni; a math PhD on the dance floor",
  },
  {
    handle: "daniel-lopatin",
    name: "Daniel Lopatin",
    note: "Oneohtrix Point Never; Eccojams to the Safdie scores",
  },
  {
    handle: "david-crawshaw",
    name: "David Crawshaw",
    note: "Go's mobile stack, Tailscale, and exe.dev",
  },
  {
    handle: "david-heinemeier-hansson",
    name: "David Heinemeier Hansson",
    note: "Rails, 37signals, and the majestic monolith",
  },
  {
    handle: "dax-raad",
    name: "Dax Raad",
    note: "SST, terminal.shop, and the opencode agent",
  },
  {
    handle: "dwarkesh-patel",
    name: "Dwarkesh Patel",
    note: "Long-form interviews with the people building AI",
  },
  {
    handle: "dylan-patel",
    name: "Dylan Patel",
    note: "SemiAnalysis and the physics of AI infrastructure",
  },
  {
    handle: "geoffrey-huntley",
    name: "Geoffrey Huntley",
    note: "ReactiveUI, Ralph loops, and engineering in the agent era",
  },
  {
    handle: "geoffrey-litt",
    name: "Geoffrey Litt",
    note: "Malleable software and local-first research",
  },
  {
    handle: "george-hotz",
    name: "George Hotz",
    note: "geohot; iPhone unlock, comma.ai, tinygrad",
  },
  {
    handle: "greg-brockman",
    name: "Greg Brockman",
    note: "OpenAI co-founder and Stripe's first CTO",
  },
  {
    handle: "gwern",
    name: "Gwern",
    note: "gwern.net; self-experiments and the scaling hypothesis",
  },
  {
    handle: "jane-manchun-wong",
    name: "Jane Manchun Wong",
    note: "Finding unreleased app features in public code",
  },
  {
    handle: "johannes-schickling",
    name: "Johannes Schickling",
    note: "Prisma, LiveStore, and the local-first stack",
  },
  {
    handle: "joel-spolsky",
    name: "Joel Spolsky",
    note: "Joel on Software, Stack Overflow, and Trello",
  },
  {
    handle: "linus-lee",
    name: "Linus Lee",
    note: "Independent research on tools for thought",
  },
  {
    handle: "lorenzo-senni",
    name: "Lorenzo Senni",
    note: "Pointillistic trance: euphoria without the drop",
  },
  {
    handle: "mario-zechner",
    name: "Mario Zechner",
    note: "libGDX, pi, and opinionated minimal coding agents",
  },
  {
    handle: "matt-levine",
    name: "Matt Levine",
    note: "Money Stuff; everything is securities fraud",
  },
  {
    handle: "mitchell-hashimoto",
    name: "Mitchell Hashimoto",
    note: "HashiCorp co-founder; now building Ghostty",
  },
  {
    handle: "patrick-mckenzie",
    name: "Patrick McKenzie",
    note: "patio11; Kalzumeus, Stripe, and Bits About Money",
  },
  {
    handle: "paul-graham",
    name: "Paul Graham",
    note: "Viaweb, Y Combinator, and the essay canon",
  },
  {
    handle: "peter-steinberger",
    name: "Peter Steinberger",
    note: "From PSPDFKit to OpenClaw",
  },
  {
    handle: "pieter-levels",
    name: "Pieter Levels",
    note: "levelsio; Nomad List, Photo AI, and building in public",
  },
  {
    handle: "richard-d-james",
    name: "Richard D. James",
    note: "Aphex Twin; self-mythology as an instrument",
  },
  {
    handle: "riley-walz",
    name: "Riley Walz",
    note: "Jmail, Bop Spotter, and public-data stunts",
  },
  {
    handle: "simon-willison",
    name: "Simon Willison",
    note: "Django co-creator; Datasette and prompt injection",
  },
  {
    handle: "steph-ango",
    name: "Steph Ango",
    note: "Obsidian's CEO; file over app",
  },
  {
    handle: "steve-yegge",
    name: "Steve Yegge",
    note: "Stevey's rants, platforms, and AI transformation",
  },
  {
    handle: "stewart-brand",
    name: "Stewart Brand",
    note: "Whole Earth Catalog and the Long Now",
  },
  {
    handle: "thomas-ptacek",
    name: "Thomas Ptacek",
    note: "Matasano, Cryptopals, and applied security",
  },
  {
    handle: "tim-berners-lee",
    name: "Tim Berners-Lee",
    note: "Inventor of the Web; Solid and the fight to reclaim it",
  },
  {
    handle: "tim-hecker",
    name: "Tim Hecker",
    note: "Noise, texture, and sacred space",
  },
  {
    handle: "tyler-cowen",
    name: "Tyler Cowen",
    note: "Marginal Revolution, Emergent Ventures, and the great stagnation",
  },
  {
    handle: "yacine-brahimi",
    name: "Yacine Brahimi",
    note: "kache; dingboard and viral client-side experiments",
  },
  {
    handle: "37signals",
    name: "37signals",
    note: "Bootstrapped software and the calm-company canon",
  },
  {
    handle: "andon-labs",
    name: "andon labs",
    note: "The AI-safety evaluation shop behind Project Vend",
  },
  {
    handle: "antithesis",
    name: "antithesis",
    note: "Deterministic simulation testing for distributed systems",
  },
  {
    handle: "cognition",
    name: "cognition",
    note: "The AI lab behind the Devin software engineer",
  },
  {
    handle: "convergent-research",
    name: "convergent research",
    note: "The nonprofit incubating focused research organizations",
  },
  {
    handle: "core-automation",
    name: "core automation",
    note: "An AI lab founded by OpenAI's former VP of research",
  },
  {
    handle: "deepseek",
    name: "deepseek",
    note: "Open-weight models from a hedge fund's lab",
  },
  {
    handle: "every",
    name: "every",
    note: "A media house and its software bundle",
  },
  {
    handle: "gumroad",
    name: "gumroad",
    note: "Creator commerce and the small-company playbook",
  },
  {
    handle: "hyperdub",
    name: "Hyperdub",
    note: "The London label that carried dubstep",
  },
  {
    handle: "ink-and-switch",
    name: "ink & switch",
    note: "The independent lab behind local-first software",
  },
  {
    handle: "long-now-foundation",
    name: "The Long Now Foundation",
    note: "Long-term thinking and the 10,000-year clock",
  },
  {
    handle: "midjourney",
    name: "midjourney",
    note: "A self-funded research lab and its image models",
  },
  {
    handle: "morph",
    name: "morph",
    note: "The company behind the fast-apply model",
  },
  {
    handle: "moving-castles",
    name: "moving castles",
    note: "A Berlin studio building autonomous worlds",
  },
  {
    handle: "oxide-computer",
    name: "Oxide Computer Company",
    note: "Rack-scale computers built as one system",
  },
  {
    handle: "roam-research",
    name: "Roam Research",
    note: "The company behind networked thought",
  },
  {
    handle: "typesafe",
    name: "typesafe",
    note: "The System One lab behind the jev agent",
  },
  {
    handle: "obsidian",
    name: "obsidian",
    note: "The file-over-app note-taking app",
  },
  {
    handle: "roam-research-product",
    name: "roam research",
    note: "The note-taking tool for networked thought",
  },
  {
    handle: "tldraw",
    name: "tldraw",
    note: "The infinite canvas SDK",
  },
  {
    handle: "zed",
    name: "zed",
    note: "The fast, multiplayer code editor",
  },
] as const;

export const showcaseIndexes: readonly ExampleIndex[] = [
  {
    handle: "patrick-collison",
    name: "Patrick Collison",
    note: "Stripe, progress studies, and the craft of speed.",
    category: "building",
    initials: "PC",
    subjectKind: "person",
    portrait: examplePortraits["patrick-collison"],
  },
  {
    handle: "obsidian",
    name: "obsidian",
    note: "The note-taking app built on files over apps.",
    category: "products",
    initials: "Ob",
    subjectKind: "product",
    portrait: examplePortraits["obsidian"],
  },
  {
    handle: "gumroad",
    name: "gumroad",
    note: "Creator commerce and the small-company playbook.",
    category: "companies",
    initials: "Gu",
    subjectKind: "organization",
    portrait: examplePortraits["gumroad"],
  },
  {
    handle: "bjork",
    name: "Björk",
    note: "Music at the meeting point of nature and technology.",
    category: "music",
    initials: "B",
    subjectKind: "person",
    portrait: examplePortraits["bjork"],
  },
  {
    handle: "alan-kay",
    name: "Alan Kay",
    note: "Smalltalk, the Dynabook, and computing as a creative medium.",
    category: "computing",
    initials: "AK",
    subjectKind: "person",
    portrait: examplePortraits["alan-kay"],
  },
  {
    handle: "roam-research-product",
    name: "roam research",
    note: "The note-taking tool for networked thought.",
    category: "products",
    initials: "RR",
    subjectKind: "product",
    portrait: examplePortraits["roam-research-product"],
  },
  {
    handle: "eugene-tssui",
    name: "Eugene Tssui",
    note: "An architect who looks to nature for ways to build.",
    category: "architecture",
    initials: "ET",
    subjectKind: "person",
    portrait: examplePortraits["eugene-tssui"],
  },
  {
    handle: "midjourney",
    name: "midjourney",
    note: "A self-funded research lab and its image models.",
    category: "companies",
    initials: "Mj",
    subjectKind: "organization",
    portrait: examplePortraits["midjourney"],
  },
];


const categoryGroups: Readonly<Record<string, readonly string[]>> = {
  music: ["bad-bunny", "bjork", "brian-eno", "burial", "caterina-barbieri", "dan-snaith", "daniel-lopatin", "lorenzo-senni", "richard-d-james", "tim-hecker"],
  "science & ideas": ["michael-levin", "joscha-bach", "stephen-wolfram", "gwern", "stewart-brand", "tyler-cowen"],
  architecture: ["eugene-tssui", "christopher-alexander"],
  "writing & media": ["anil-dash", "cory-doctorow", "dwarkesh-patel", "dylan-patel", "matt-levine", "patrick-mckenzie", "paul-graham"],
  building: ["patrick-collison", "conor-white-sullivan", "david-heinemeier-hansson", "greg-brockman", "joel-spolsky", "pieter-levels"],
  companies: ["37signals", "andon-labs", "antithesis", "cognition", "convergent-research", "core-automation", "deepseek", "every", "gumroad", "hyperdub", "ink-and-switch", "long-now-foundation", "midjourney", "morph", "moving-castles", "oxide-computer", "roam-research", "typesafe"],
  products: ["obsidian", "roam-research-product", "tldraw", "zed"],
};

export function exampleCategory(handle: string): string {
  return Object.entries(categoryGroups).find(([, handles]) => handles.includes(handle))?.[0] ?? "computing";
}

const subjectKinds: Readonly<Record<string, SubjectKind>> = {
  "37signals": "organization",
  "andon-labs": "organization",
  antithesis: "organization",
  cognition: "organization",
  "convergent-research": "organization",
  "core-automation": "organization",
  deepseek: "organization",
  every: "organization",
  gumroad: "organization",
  hyperdub: "organization",
  "ink-and-switch": "organization",
  "long-now-foundation": "organization",
  midjourney: "organization",
  morph: "organization",
  "moving-castles": "organization",
  "oxide-computer": "organization",
  "roam-research": "organization",
  typesafe: "organization",
  obsidian: "product",
  "roam-research-product": "product",
  tldraw: "product",
  zed: "product",
};

export function exampleSubjectKind(handle: string): SubjectKind {
  return subjectKinds[handle] ?? "person";
}

const packetDirs: Readonly<Record<SubjectKind, string>> = {
  person: "people",
  organization: "organizations",
  product: "products",
};

/** The examples corpus keeps a packet under `examples/<dir>/<handle>/person-index.json`. */
export function examplePacketDir(handle: string): string {
  return packetDirs[exampleSubjectKind(handle)];
}

/** The publisher browse page follows the same curated subject collection. */
export function isExampleSubject(handle: string): boolean {
  return featuredIndexes.some(example => example.handle === handle);
}
