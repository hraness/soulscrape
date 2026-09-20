import type { ExampleIndex } from "../components/example-index-card";
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
    note: "Blogger since 1999; Six Apart, Glitch, and the first NFT",
  },
  {
    handle: "andrej-karpathy",
    name: "Andrej Karpathy",
    note: "CS231n to Tesla AI to Eureka Labs; teacher of the field",
  },
  {
    handle: "bad-bunny",
    name: "Bad Bunny",
    note: "From grocery bagging to the most-streamed artist alive",
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
    note: "Ambient inventor; Oblique Strategies and scenius",
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
    note: "The definitive leaker of unreleased app features",
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
    note: "Pointillistic trance — euphoria without the drop",
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
] as const;

export const showcaseIndexes: readonly ExampleIndex[] = [
  {
    handle: "patrick-collison",
    name: "Patrick Collison",
    note: "Stripe, progress studies, and the craft of speed.",
    category: "building",
    initials: "PC",
    portrait: examplePortraits["patrick-collison"],
  },
  {
    handle: "bjork",
    name: "Björk",
    note: "Music at the meeting point of nature and technology.",
    category: "music",
    initials: "B",
    portrait: examplePortraits["bjork"],
  },
  {
    handle: "alan-kay",
    name: "Alan Kay",
    note: "Smalltalk, the Dynabook, and computing as a creative medium.",
    category: "computing",
    initials: "AK",
    portrait: examplePortraits["alan-kay"],
  },
  {
    handle: "eugene-tssui",
    name: "Eugene Tssui",
    note: "An architect who looks to nature for ways to build.",
    category: "architecture",
    initials: "ET",
    portrait: examplePortraits["eugene-tssui"],
  },
  {
    handle: "michael-levin",
    name: "Michael Levin",
    note: "Bioelectricity, morphogenesis, and unconventional minds.",
    category: "biology",
    initials: "ML",
    portrait: examplePortraits["michael-levin"],
  },
  {
    handle: "christopher-alexander",
    name: "Christopher Alexander",
    note: "A Pattern Language and the quality without a name.",
    category: "architecture",
    initials: "CA",
    portrait: examplePortraits["christopher-alexander"],
  },
  {
    handle: "andrej-karpathy",
    name: "Andrej Karpathy",
    note: "Neural networks, AI, and teaching the field.",
    category: "artificial intelligence",
    initials: "AK",
    portrait: examplePortraits["andrej-karpathy"],
  },
  {
    handle: "brian-eno",
    name: "Brian Eno",
    note: "Ambient music, Oblique Strategies, and collective creativity.",
    category: "music",
    initials: "BE",
    portrait: examplePortraits["brian-eno"],
  },
];


const categoryGroups: Readonly<Record<string, readonly string[]>> = {
  music: ["bad-bunny", "bjork", "brian-eno", "burial", "caterina-barbieri", "dan-snaith", "daniel-lopatin", "lorenzo-senni", "richard-d-james", "tim-hecker"],
  "science & ideas": ["michael-levin", "joscha-bach", "stephen-wolfram", "gwern", "stewart-brand", "tyler-cowen"],
  architecture: ["eugene-tssui", "christopher-alexander"],
  "writing & media": ["anil-dash", "cory-doctorow", "dwarkesh-patel", "dylan-patel", "matt-levine", "patrick-mckenzie", "paul-graham"],
  building: ["patrick-collison", "conor-white-sullivan", "david-heinemeier-hansson", "greg-brockman", "joel-spolsky", "pieter-levels"],
};

export function exampleCategory(handle: string): string {
  return Object.entries(categoryGroups).find(([, handles]) => handles.includes(handle))?.[0] ?? "computing";
}

/** The publisher browse page follows the same curated people collection. */
export function isExamplePerson(handle: string): boolean {
  return featuredIndexes.some(example => example.handle === handle);
}
