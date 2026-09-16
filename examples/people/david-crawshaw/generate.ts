#!/usr/bin/env bun
/** Generate examples/people/david-crawshaw/person-index.json with derived source ids. */

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

const crawshawIo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Blog: David Crawshaw",
  url: "https://crawshaw.io/",
  publisher: "crawshaw.io",
  notes:
    "The subject's own blog index; lists every essay with dates. Claims here are self-reported.",
});
const neugramNg = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "neugram/ng: scripting language integrated with Go",
  url: "https://github.com/neugram/ng",
  publisher: "GitHub",
  notes:
    "His Neugram language repository; describes it as an early-stage experimental project.",
});
const leavingGoogle = source({
  binding: "first_person",
  mediaType: "article",
  title: "Leaving Google",
  url: "https://crawshaw.io/blog/leaving-google",
  publisher: "crawshaw.io",
  publishedAt: "2018-03-27",
});
const programmingWithLlms = source({
  binding: "first_person",
  mediaType: "article",
  title: "How I program with LLMs",
  url: "https://crawshaw.io/blog/programming-with-llms",
  publisher: "crawshaw.io",
  publishedAt: "2025-01-06",
});
const programmingWithAgents = source({
  binding: "first_person",
  mediaType: "article",
  title: "How I program with Agents",
  url: "https://crawshaw.io/blog/programming-with-agents",
  publisher: "crawshaw.io",
  publishedAt: "2025-06-08",
});
const eightMonths = source({
  binding: "first_person",
  mediaType: "article",
  title: "Eight more months of agents",
  url: "https://crawshaw.io/blog/eight-more-months-of-agents",
  publisher: "crawshaw.io",
  publishedAt: "2026-02-08",
});
const buildingACloud = source({
  binding: "first_person",
  mediaType: "article",
  title: "I am building a cloud",
  url: "https://crawshaw.io/blog/building-a-cloud",
  publisher: "crawshaw.io",
  publishedAt: "2026-04-22",
});
const principalAgent = source({
  binding: "first_person",
  mediaType: "article",
  title: "The agent principal-agent problem",
  url: "https://crawshaw.io/blog/agent-principal-agent",
  publisher: "crawshaw.io",
  publishedAt: "2026-05-07",
});
const exeSeriesA = source({
  binding: "first_person",
  mediaType: "article",
  title: "Series A for exe.dev",
  url: "https://blog.exe.dev/series-a",
  publisher: "exe.dev",
  publishedAt: "2026-04-22",
  authors: ["David Crawshaw"],
  notes: "His funding announcement on the company blog he controls.",
});
const gopherconVideo = source({
  binding: "first_person",
  mediaType: "video",
  title: "Go Build Modes — David Crawshaw (GopherCon 2017)",
  url: "https://www.youtube.com/watch?v=x-LhC-J2Vbk",
  publisher: "GopherCon",
  publishedAt: "2017-07",
});
const cybernews = source({
  binding: "interview",
  mediaType: "article",
  title: "We all have to do a better job managing our infrastructure",
  url: "https://tailscale.com/blog/cybernews-interview",
  publisher: "CyberNews (reprinted on the Tailscale blog)",
  publishedAt: "2022-04-29",
  notes:
    "Q&A interview with Crawshaw as Tailscale co-founder and CTO, reprinted with permission.",
});
const changelog = source({
  binding: "interview",
  mediaType: "audio",
  title: "Programming with LLMs featuring David Crawshaw (Changelog Interviews #629)",
  url: "https://changelog.com/podcast/629",
  publisher: "Changelog",
  publishedAt: "2025-02-19",
  authors: ["Adam Stacoviak", "Jerod Santo"],
});
const highLeverage = source({
  binding: "interview",
  mediaType: "audio",
  title: "Why Agents Need Computers with David Crawshaw (High Leverage #11)",
  url: "https://www.heavybit.com/library/podcasts/high-leverage/ep-11-why-agents-need-computers-with-david-crawshaw",
  publisher: "Heavybit",
  publishedAt: "2026-06-03",
  authors: ["Joe Ruscio"],
});
const kubelist = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "The Age of Personalized Software with David Crawshaw (The Kubelist Podcast #54)",
  url: "https://www.heavybit.com/library/podcasts/the-kubelist-podcast/ep-54-the-age-of-personalized-software-with-david-crawshaw",
  publisher: "Heavybit",
  publishedAt: "2026-07-31",
  authors: ["Marc Campbell", "Benjie De Groot"],
  notes:
    "Long interview with full transcript: childhood, Google, the Tailscale weekend hack, and the Sketch-to-exe.dev pivot.",
});
const goAndroidCl = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "all: add GOOS=android",
  url: "https://go.googlesource.com/go/+/a36348008c4acb493be8e4faf209a3818a11f0af",
  publisher: "Go project (go.googlesource.com)",
  publishedAt: "2014",
  notes: "His commit adding the Android port to the Go repository.",
});
const go14Blog = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Go 1.4 is released",
  url: "https://go.dev/blog/go1.4",
  publisher: "The Go Blog",
  publishedAt: "2014-12-10",
  notes:
    "Official release announcement; names official Android support via golang.org/x/mobile as the headline feature.",
});
const goPluginCl = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "[go] cmd/go: support -buildmode=plugin on linux",
  url: "https://groups.google.com/g/golang-codereviews/c/lO7j72KuFQk",
  publisher: "golang-codereviews (Google Groups)",
  publishedAt: "2016-08",
  notes:
    "Mailing-list record of his Gerrit change adding the plugin build mode to the go command.",
});
const amplify = source({
  binding: "reporting",
  mediaType: "article",
  title: "exe.dev and the perfect little computer",
  url: "https://www.amplifypartners.com/blog-posts/exe-dev-and-the-perfect-little-computer",
  publisher: "Amplify Partners",
  publishedAt: "2026-04",
  notes:
    "Investor's account of the company; names co-founder Josh Bleecher-Snyder and describes leading the Series A.",
});
const betakit = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Corporate VPN startup Tailscale secures $230 million CAD Series C on back of “surprising” growth",
  url: "https://betakit.com/corporate-vpn-startup-tailscale-secures-230-million-cad-series-c-on-back-of-surprising-growth/",
  publisher: "BetaKit",
  publishedAt: "2025-04-08",
  authors: ["Alex Riehl"],
});
const heavybitProfile = source({
  binding: "reference",
  mediaType: "webpage",
  title: "David Crawshaw",
  url: "https://www.heavybit.com/community/david-crawshaw",
  publisher: "Heavybit",
  notes:
    "Speaker/community bio: staff software engineer at Google, petabyte-scale logs, Fuchsia TCP/IP networking, Go port to iOS.",
});

const S = {
  crawshawIo: crawshawIo.id,
  neugramNg: neugramNg.id,
  leavingGoogle: leavingGoogle.id,
  programmingWithLlms: programmingWithLlms.id,
  programmingWithAgents: programmingWithAgents.id,
  eightMonths: eightMonths.id,
  buildingACloud: buildingACloud.id,
  principalAgent: principalAgent.id,
  exeSeriesA: exeSeriesA.id,
  gopherconVideo: gopherconVideo.id,
  cybernews: cybernews.id,
  changelog: changelog.id,
  highLeverage: highLeverage.id,
  kubelist: kubelist.id,
  goAndroidCl: goAndroidCl.id,
  go14Blog: go14Blog.id,
  goPluginCl: goPluginCl.id,
  amplify: amplify.id,
  betakit: betakit.id,
  heavybitProfile: heavybitProfile.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-david-crawshaw",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "david-crawshaw",
    displayName: "David Crawshaw",
    alsoKnownAs: ["crawshaw"],
    summary:
      "Australian programmer and infrastructure founder: former Go team engineer at Google (Go's Android and iOS ports, plugin build mode), co-founder and CTO of Tailscale, now CEO and co-founder of exe.dev, a cloud built for developers and AI agents.",
    identity: {
      officialSite: "https://crawshaw.io/",
      profiles: [
        "https://github.com/crawshaw",
        "https://twitter.com/davidcrawshaw",
        "https://bsky.app/profile/crawshaw.io",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "writing", "philosophy", "projects", "media"],
  },
  sources: [
    crawshawIo,
    neugramNg,
    leavingGoogle,
    programmingWithLlms,
    programmingWithAgents,
    eightMonths,
    buildingACloud,
    principalAgent,
    exeSeriesA,
    gopherconVideo,
    cybernews,
    changelog,
    highLeverage,
    kubelist,
    goAndroidCl,
    go14Blog,
    goPluginCl,
    amplify,
    betakit,
    heavybitProfile,
  ],
  claims: [
    {
      id: "claim-queensland-childhood",
      kind: "fact",
      text: "Crawshaw grew up in a small town in North Queensland, Australia, and learned to program as a child on his parents' medical-practice computers — MS-DOS PCs on a Novell NetWare LAN, where his father wrote the practice's medical-record software in Clipper.",
      sourceIds: [S.kubelist, S.highLeverage],
    },
    {
      id: "claim-math-history",
      kind: "fact",
      text: "He studied mathematics and history at university rather than computer science; before Google his paid work was, in his telling, 'sort of research work.'",
      sourceIds: [S.kubelist],
    },
    {
      id: "claim-google-2009",
      kind: "fact",
      text: "He joined Google around 2009 — his first US job after relocating to the Bay Area — drawn by the chance to program large clusters.",
      sourceIds: [S.kubelist],
    },
    {
      id: "claim-petabyte-logs",
      kind: "fact",
      text: "At Google he was a staff software engineer who specialized in petabyte-scale logs processing, starting on a logs team supporting search quality in the Borg era.",
      sourceIds: [S.heavybitProfile, S.kubelist],
    },
    {
      id: "claim-fuchsia-net",
      kind: "fact",
      text: "He implemented TCP/IP networking for Fuchsia, Google's capability-based operating system, and left before Fuchsia 1.0 shipped.",
      sourceIds: [S.heavybitProfile, S.leavingGoogle],
    },
    {
      id: "claim-go-android-port",
      kind: "fact",
      text: "He ported Go to Android: he authored the 'all: add GOOS=android' change, and Go 1.4 (December 2014) shipped official Android support built on the golang.org/x/mobile repository.",
      sourceIds: [S.goAndroidCl, S.go14Blog],
    },
    {
      id: "claim-go-ios",
      kind: "fact",
      text: "He led the port of the Go language platform to iOS as well, making Go a mobile platform through the gomobile tooling and the gobind language-binding generator.",
      sourceIds: [S.heavybitProfile, S.go14Blog],
    },
    {
      id: "claim-go-plugin",
      kind: "fact",
      text: "In 2016 he implemented the '-buildmode=plugin' support in the go command — the machinery behind Go's early plugin system — reviewed by Ian Lance Taylor.",
      sourceIds: [S.goPluginCl],
    },
    {
      id: "claim-gophercon-talk",
      kind: "fact",
      text: "He presented 'Go Build Modes' at GopherCon 2017 in Denver, a talk on the ways Go code can be built to interact with other languages and itself.",
      sourceIds: [S.gopherconVideo],
    },
    {
      id: "claim-neugram",
      kind: "fact",
      text: "He created Neugram, an early-stage experimental scripting language and shell that reuses Go's syntax and type system for lightweight interaction with Go packages.",
      sourceIds: [S.neugramNg],
    },
    {
      id: "claim-left-google",
      kind: "fact",
      text: "His last day at Google was March 27, 2018; he announced he would do childcare and start a software business.",
      sourceIds: [S.leavingGoogle],
    },
    {
      id: "claim-tailscale-founded",
      kind: "fact",
      text: "In early 2019 he co-founded Tailscale with Avery Pennarun and David Carney — three former Google engineers, distributed across New York, Montreal, and Toronto from the start.",
      sourceIds: [S.kubelist, S.cybernews, S.betakit],
    },
    {
      id: "claim-tailscale-weekend",
      kind: "fact",
      text: "Tailscale began as a weekend project: a small program that generated WireGuard configuration files, built for a Canadian bank's two-factor-access problem and first run on a machine in the closet of his Manhattan apartment.",
      sourceIds: [S.kubelist],
    },
    {
      id: "claim-tailscale-mesh",
      kind: "fact",
      text: "He simplified the product to one multi-tenant control plane in the cloud with devices connecting peer-to-peer on the data plane; the New York Public Library's UDP-blocking Wi-Fi prompted its TCP-relay fallback design.",
      sourceIds: [S.kubelist],
    },
    {
      id: "claim-tailscale-cto",
      kind: "fact",
      text: "He was Tailscale's co-founding CTO; the company raised a $160M USD Series C in April 2025 at a reported $1.45B USD post-money valuation.",
      sourceIds: [S.cybernews, S.heavybitProfile, S.betakit],
    },
    {
      id: "claim-steps-back",
      kind: "fact",
      text: "He describes having 'hired himself out of a job' at Tailscale, stepping back from the role and leaving entirely around its Series C.",
      sourceIds: [S.kubelist],
    },
    {
      id: "claim-sketch",
      kind: "fact",
      text: "With a new company started around late 2024 he co-built Sketch, a coding agent first specialized for Go — a package generator, then a Dockerized local agent returning work as git branches — before it was set aside for the infrastructure beneath it.",
      sourceIds: [S.kubelist, S.programmingWithLlms, S.programmingWithAgents],
    },
    {
      id: "claim-exe-launch",
      kind: "fact",
      text: "The infrastructure built for Sketch — easy, long-lived virtual machines — became the product: exe.dev launched at the end of December 2025.",
      sourceIds: [S.kubelist],
    },
    {
      id: "claim-series-a",
      kind: "fact",
      text: "On April 22, 2026 he announced exe.dev's Series A and total funding of $35M, naming Amplify, CRV, and HeavyBit as major investors.",
      sourceIds: [S.exeSeriesA, S.amplify],
    },
    {
      id: "claim-exe-cofounder",
      kind: "fact",
      text: "exe.dev's co-founders are Crawshaw and Josh Bleecher-Snyder; he described it as a team of nine in May 2026.",
      sourceIds: [S.amplify, S.principalAgent],
    },
    {
      id: "claim-exe-tech",
      kind: "fact",
      text: "exe.dev sells pools of CPU, memory, and local-NVMe disk on which customers run as many VMs as they like, behind its own TLS and authentication proxies, global load balancer, DNS, and anycast network — on its own racked machines rather than another cloud.",
      sourceIds: [S.buildingACloud, S.exeSeriesA, S.kubelist],
    },
    {
      id: "claim-oss-career",
      kind: "fact",
      text: "He credits open source for his career — 'Without GCC, I would never have learned to write C' — and under him Tailscale open-sourced its client software and gave free plans to open-source projects.",
      sourceIds: [S.cybernews],
    },
    {
      id: "claim-llm-net-positive",
      kind: "stated_belief",
      text: "After a year of deliberately seeking practical value in generative models, he reports LLMs are net-positive on his productivity and that programming without them is now unpleasant.",
      sourceIds: [S.programmingWithLlms],
    },
    {
      id: "claim-agent-definition",
      kind: "stated_belief",
      text: "His working definition: an agent is a for loop containing an LLM call with tools — 'an agent is 9 lines of code' — valuable because environmental feedback from the compiler, tests, and shell turns demos into useful programmers.",
      sourceIds: [S.programmingWithAgents],
    },
    {
      id: "claim-frontier-models",
      kind: "stated_belief",
      text: "He argues that working with agents requires paying for frontier models — cheaper models teach 'the wrong lessons' — even as he predicts local models will eventually catch up.",
      sourceIds: [S.eightMonths],
    },
    {
      id: "claim-best-for-agent",
      kind: "stated_belief",
      text: "His programming philosophy for the agent era: 'the best software for an agent is whatever is best for a programmer.'",
      sourceIds: [S.eightMonths],
    },
    {
      id: "claim-ide-waning",
      kind: "stated_belief",
      text: "He believes the IDE era is ending: in 2026 he reports using no IDE and being 'back on Vi,' with only go-to-definition surviving as an IDE-like feature.",
      sourceIds: [S.eightMonths],
    },
    {
      id: "claim-code-review-broken",
      kind: "stated_belief",
      text: "He argues review-then-commit code review is broken: agents double the review load and create a principal-agent problem — reviewers can no longer infer effort from the code — producing 'slop PRs' that are 'killing OSS.'",
      sourceIds: [S.principalAgent],
    },
    {
      id: "claim-small-teams",
      kind: "stated_belief",
      text: "His fix: small high-trust teams where the human driving the agent reviews its output and owns deployment — which he reports working with nine people at exe.dev — while doubting it scales to low-trust large companies.",
      sourceIds: [S.principalAgent],
    },
    {
      id: "claim-cloud-wrong-shape",
      kind: "stated_belief",
      text: "He holds that today's clouds are 'the wrong shape': VMs welded to fixed CPU/memory ratios, remote block storage an order of magnitude slower than local NVMe, and egress priced to discourage leaving.",
      sourceIds: [S.buildingACloud],
    },
    {
      id: "claim-wrong-question",
      kind: "stated_belief",
      text: "He thinks 'What do agents need?' is the wrong question for infrastructure: agents are trained on how developers work, so they want what developers want — full, understandable computers.",
      sourceIds: [S.exeSeriesA, S.buildingACloud],
    },
    {
      id: "claim-like-computers",
      kind: "stated_belief",
      text: "Asked why he would found a second company after Tailscale's success, his deliberately ungrand answer is: 'I like computers.'",
      sourceIds: [S.buildingACloud],
    },
    {
      id: "claim-safe-places",
      kind: "stated_belief",
      text: "He frames networking's goal as recreating the trust of old institutional LANs — building 'new safe places for software' on top of the public internet rather than returning to it.",
      sourceIds: [S.cybernews],
    },
    {
      id: "claim-remote-work",
      kind: "stated_belief",
      text: "On remote work he advises an all-remote-or-nothing meeting model and deliberate over-communication, from Tailscale's fully distributed experience.",
      sourceIds: [S.cybernews],
    },
    {
      id: "claim-pattern-exploration",
      kind: "pattern",
      text: "His product method is high-variance exploration — 'two or three for 10,000' by his own count — prototyping in public until a customer's problem pulls a product into focus.",
      sourceIds: [S.kubelist],
    },
    {
      id: "claim-pattern-stripping",
      kind: "pattern",
      text: "Across Google, Tailscale, and exe.dev the recurring move is stripping abstraction back to the machine: Borg-era log pipelines, Go on mobile OSes, peer-to-peer WireGuard, and VMs as Linux processes.",
      sourceIds: [S.kubelist, S.buildingACloud, S.heavybitProfile],
    },
    {
      id: "claim-pattern-notebook",
      kind: "pattern",
      text: "Since 2014 he has kept a public engineering notebook at crawshaw.io, moving from Go internals and SQLite to networking and now agent-era programming practice.",
      sourceIds: [S.crawshawIo],
    },
    {
      id: "claim-spec-tailscale-timing",
      kind: "speculation",
      text: "The exact sequencing of his Tailscale exit — 'stepped back from the role' versus leaving 'finally completely at the Series C' (April 2025) — is known only from his own podcast retelling.",
      sourceIds: [S.kubelist, S.betakit],
    },
    {
      id: "claim-spec-local-models",
      kind: "speculation",
      text: "His prediction that local models will catch up to frontier ones 'in a few years' is conviction, not a timetable — he offers no mechanism beyond diminishing returns.",
      sourceIds: [S.eightMonths],
    },
    {
      id: "claim-spec-review-precedent",
      kind: "speculation",
      text: "He offers 1990s Microsoft — large but organized as independent teams without mandated review — as a precedent that post-review workflows might scale; it is a hypothesis, not a demonstrated process.",
      sourceIds: [S.principalAgent],
    },
  ],
  timeline: [
    {
      id: "event-google-join",
      kind: "role",
      date: "2009",
      title: "Joins Google in the Bay Area",
      summary:
        "His first US job; worked on logs infrastructure supporting search quality at petabyte scale during the Borg era.",
      organization: "Google",
      sourceIds: [S.kubelist, S.heavybitProfile],
    },
    {
      id: "event-go-android",
      kind: "project",
      date: "2014",
      title: "Ports Go to Android",
      summary:
        "Authored the GOOS=android port; Go 1.4 shipped official Android support in December 2014. The iOS port and gomobile tooling followed.",
      organization: "Google / Go project",
      sourceIds: [S.goAndroidCl, S.go14Blog],
    },
    {
      id: "event-go-plugin",
      kind: "project",
      date: "2016-08",
      title: "Implements the Go plugin build mode",
      summary:
        "Uploaded the change adding -buildmode=plugin to the go command, part of his build-modes work.",
      organization: "Go project",
      sourceIds: [S.goPluginCl],
    },
    {
      id: "event-neugram",
      kind: "project",
      date: "2017-01",
      title: "Releases Neugram",
      summary:
        "Public experimental scripting language and shell built on Go's syntax and type system.",
      sourceIds: [S.neugramNg],
    },
    {
      id: "event-gophercon-2017",
      kind: "media",
      date: "2017-07",
      title: "'Go Build Modes' at GopherCon 2017",
      summary: "Presented Go's build modes — c-archive, c-shared, shared, plugin — in Denver.",
      location: "Denver, Colorado",
      sourceIds: [S.gopherconVideo],
    },
    {
      id: "event-leaves-google",
      kind: "other",
      date: "2018-03-27",
      title: "Last day at Google",
      summary:
        "Left mid-Fuchsia; announced plans for childcare and a software business.",
      organization: "Google",
      sourceIds: [S.leavingGoogle],
    },
    {
      id: "event-tailscale-founded",
      kind: "founded",
      date: "2019",
      title: "Co-founds Tailscale",
      summary:
        "With Avery Pennarun and David Carney; grew from a weekend WireGuard experiment into a mesh-VPN company.",
      organization: "Tailscale",
      sourceIds: [S.kubelist, S.cybernews, S.betakit],
    },
    {
      id: "event-cybernews-interview",
      kind: "media",
      date: "2022-04-29",
      title: "CyberNews interview as Tailscale CTO",
      summary:
        "Discussed Tailscale's origin, zero-trust networking, open source, and remote work.",
      sourceIds: [S.cybernews],
    },
    {
      id: "event-new-company",
      kind: "role",
      date: "2024",
      end: "2025-04",
      title: "Starts a new developer-tools company; leaves Tailscale",
      summary:
        "Began building LLM developer tools with Josh Bleecher-Snyder in late 2024 and stepped back from Tailscale completely around its April 2025 Series C.",
      sourceIds: [S.kubelist, S.amplify, S.betakit],
    },
    {
      id: "event-llm-essay",
      kind: "publication",
      date: "2025-01-06",
      title: "Publishes 'How I program with LLMs'",
      summary:
        "First of a series of essays on adapting programming practice to generative models; led to a Changelog interview.",
      sourceIds: [S.programmingWithLlms, S.changelog],
    },
    {
      id: "event-exe-launch",
      kind: "milestone",
      date: "2025-12",
      title: "exe.dev launches",
      summary:
        "The VM infrastructure built for the Sketch agent became the product: a cloud of long-lived VMs for developers and agents.",
      organization: "exe.dev",
      sourceIds: [S.kubelist],
    },
    {
      id: "event-series-a",
      kind: "milestone",
      date: "2026-04-22",
      title: "exe.dev announces Series A; $35M total funding",
      summary:
        "Announced on the company blog and his own site; named investors Amplify, CRV, and HeavyBit.",
      organization: "exe.dev",
      sourceIds: [S.exeSeriesA, S.amplify, S.buildingACloud],
    },
    {
      id: "event-principal-agent-essay",
      kind: "publication",
      date: "2026-05-07",
      title: "Publishes 'The agent principal-agent problem'",
      summary:
        "His argument that agent-generated code breaks review-then-commit workflows.",
      sourceIds: [S.principalAgent],
    },
  ],
  themes: [
    {
      id: "theme-agents-need-computers",
      kind: "philosophy",
      status: "stated",
      title: "Agents need computers, not new abstractions",
      summary:
        "Asking 'what do agents need?' is the wrong question — agents are trained on how developers work and want the same thing: full, stable, understandable computers. His version: 'the best software for an agent is whatever is best for a programmer.'",
      sourceIds: [S.eightMonths, S.exeSeriesA, S.buildingACloud],
    },
    {
      id: "theme-code-review",
      kind: "belief",
      status: "stated",
      title: "Code review has to go",
      summary:
        "Agent-generated code breaks review-then-commit: it doubles review load while destroying the reviewer's ability to infer effort, producing 'slop PRs.' His alternative is small high-trust teams where the human driving the agent owns deployment.",
      sourceIds: [S.principalAgent, S.highLeverage],
    },
    {
      id: "theme-safe-places",
      kind: "philosophy",
      status: "stated",
      title: "Rebuild the LAN's trust",
      summary:
        "The internet can be the substrate for 'new safe places for software' — networks that recover the managed trust of institutional LANs. This is the intellectual line from Tailscale's mesh to his identity-stack writing.",
      sourceIds: [S.cybernews, S.kubelist],
    },
    {
      id: "theme-empirical-adoption",
      kind: "method",
      status: "stated",
      title: "Deliberate, empirical tool adoption",
      summary:
        "He treats new technology as something to be trained on deliberately: a year of intentional LLM use, records of what works, and repeated public revisions of his method as the models move.",
      sourceIds: [S.programmingWithLlms, S.programmingWithAgents, S.eightMonths],
    },
    {
      id: "theme-feedback-loops",
      kind: "method",
      status: "stated",
      title: "Feedback turns models into programmers",
      summary:
        "An LLM on a 'virtual whiteboard' hallucinates APIs; the same model with bash, a compiler, tests, and a browser becomes useful. Agents are feedback-driven LLMs — the environment is the product.",
      sourceIds: [S.programmingWithAgents, S.kubelist],
    },
    {
      id: "theme-strip-abstractions",
      kind: "method",
      status: "reported",
      title: "Strip abstractions back to the machine",
      summary:
        "From petabyte log pipelines to WireGuard mesh networking to cgroup-pooled VMs, his engineering pattern is removing layers until the actual computer is visible — local NVMe over remote block storage, processes over platform limits.",
      sourceIds: [S.kubelist, S.buildingACloud],
    },
    {
      id: "theme-failure",
      kind: "belief",
      status: "stated",
      title: "Exploration as a series of failures",
      summary:
        "'Almost everything I do fails... two or three for 10,000.' He kept a list of failed experiments at Google and frames product discovery as controlled stumbling toward what a paying customer needs.",
      sourceIds: [S.kubelist],
    },
    {
      id: "theme-go-lineage",
      kind: "influence",
      status: "reported",
      title: "The Go lineage",
      summary:
        "Go's toolchain sensibility — small composable systems, honest build machinery, languages as tools — runs through his work: the mobile ports, the plugin build mode, Neugram's Go-flavored shell, and Sketch's Go-first agent.",
      sourceIds: [S.heavybitProfile, S.goAndroidCl, S.gopherconVideo, S.neugramNg],
    },
  ],
  works: [
    {
      id: "work-go-mobile",
      kind: "project",
      status: "released",
      title: "Go on Android and iOS (gomobile)",
      date: "2014",
      summary:
        "Led the port of Go to mobile platforms: GOOS=android shipped in Go 1.4, with the golang.org/x/mobile libraries, gomobile build tool, and gobind language bindings.",
      sourceIds: [S.goAndroidCl, S.go14Blog, S.heavybitProfile],
    },
    {
      id: "work-go-plugin",
      kind: "project",
      status: "released",
      title: "Go plugin build mode",
      date: "2016",
      summary:
        "Implemented -buildmode=plugin in the go command, the machinery behind Go's early dynamic plugin support; part of the build-modes work he presented at GopherCon 2017.",
      sourceIds: [S.goPluginCl, S.gopherconVideo],
    },
    {
      id: "work-neugram",
      kind: "project",
      status: "abandoned",
      title: "Neugram",
      date: "2017",
      summary:
        "Experimental scripting language and shell reusing Go's syntax and type system; public development ceased around 2019.",
      sourceIds: [S.neugramNg],
    },
    {
      id: "work-tailscale",
      kind: "product",
      status: "ongoing",
      title: "Tailscale",
      date: "2019",
      summary:
        "Co-founded and served as CTO: a peer-to-peer WireGuard mesh network with a centralized control plane, grown to a reported $1.45B USD valuation by 2025. He departed around the Series C.",
      sourceIds: [S.kubelist, S.cybernews, S.betakit],
    },
    {
      id: "work-remembering-lan",
      kind: "other",
      status: "published",
      title: "'Remembering the LAN' (essay)",
      date: "2020-01-28",
      summary:
        "Essay on what computing lost when the LAN gave way to the hostile internet — the founding mood of Tailscale.",
      sourceIds: [S.crawshawIo],
    },
    {
      id: "work-agent-essays",
      kind: "other",
      status: "published",
      title: "Agent-programming essay series",
      date: "2025",
      summary:
        "'How I program with LLMs' (2025-01), 'How I program with Agents' (2025-06), 'Eight more months of agents' (2026-02), and 'The agent principal-agent problem' (2026-05) — a running public record of his method.",
      sourceIds: [S.programmingWithLlms, S.programmingWithAgents, S.eightMonths, S.principalAgent],
    },
    {
      id: "work-jsonfile",
      kind: "other",
      status: "published",
      title: "'jsonfile: a quick hack for tinkering' (essay)",
      date: "2024-02-06",
      summary:
        "A small-tool essay in the crawshaw.io catalog, from the period when he was exploring LLM-assisted development.",
      sourceIds: [S.crawshawIo],
    },
    {
      id: "work-sketch",
      kind: "product",
      status: "abandoned",
      title: "Sketch",
      date: "2025",
      summary:
        "A coding agent for Go — first a package generator, then a Dockerized local agent returning work as git branches. Users bounced off; its VM infrastructure became exe.dev.",
      sourceIds: [S.kubelist, S.programmingWithAgents],
    },
    {
      id: "work-exe-dev",
      kind: "product",
      status: "ongoing",
      title: "exe.dev",
      date: "2025-12",
      summary:
        "A cloud of long-lived VMs pooled by CPU, memory, and local NVMe disk, on the company's own racked machines — built for developers and agents. Launched December 2025; Series A announced April 2026.",
      sourceIds: [S.buildingACloud, S.exeSeriesA, S.amplify, S.kubelist],
    },
    {
      id: "work-shelley",
      kind: "product",
      status: "ongoing",
      title: "Shelley",
      date: "2025",
      summary:
        "exe.dev's built-in web-based coding agent in the default Ubuntu image — deliberately web-based so users can build apps from a phone.",
      sourceIds: [S.exeSeriesA, S.kubelist, S.highLeverage],
    },
  ],
  appearances: [
    {
      id: "appearance-gophercon-2017",
      title: "Go Build Modes",
      venue: "GopherCon 2017, Denver",
      publishedAt: "2017-07",
      participants: ["David Crawshaw"],
      summary:
        "His talk on the ways Go programs can be built — executables, C archives and shared libraries, Go shared libraries, and plugins.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=x-LhC-J2Vbk",
          sourceId: S.gopherconVideo,
        },
      ],
      sourceIds: [S.gopherconVideo],
    },
    {
      id: "appearance-cybernews",
      title: "We all have to do a better job managing our infrastructure",
      venue: "CyberNews (reprinted on the Tailscale blog)",
      publishedAt: "2022-04-29",
      participants: ["David Crawshaw"],
      summary:
        "Q&A on Tailscale's origin, rebuilding trustable networks, open source, and running a fully remote company.",
      media: [
        {
          type: "article",
          url: "https://tailscale.com/blog/cybernews-interview",
          sourceId: S.cybernews,
        },
      ],
      sourceIds: [S.cybernews],
    },
    {
      id: "appearance-changelog",
      title: "Programming with LLMs (Changelog Interviews #629)",
      venue: "Changelog",
      publishedAt: "2025-02-19",
      participants: ["David Crawshaw", "Adam Stacoviak", "Jerod Santo"],
      summary:
        "Interview built on his essay 'How I program with LLMs' — plus why LLMs were not a fit inside Tailscale's product.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/podcast/629",
          sourceId: S.changelog,
        },
      ],
      sourceIds: [S.changelog],
    },
    {
      id: "appearance-high-leverage",
      title: "Why Agents Need Computers (High Leverage #11)",
      venue: "High Leverage (Heavybit)",
      publishedAt: "2026-06-03",
      participants: ["David Crawshaw", "Joe Ruscio"],
      summary:
        "On agent-native infrastructure: why VMs may be the right primitive for coding agents and how agents change code review and deployment.",
      media: [
        {
          type: "audio",
          url: "https://www.heavybit.com/library/podcasts/high-leverage/ep-11-why-agents-need-computers-with-david-crawshaw",
          sourceId: S.highLeverage,
        },
      ],
      sourceIds: [S.highLeverage],
    },
    {
      id: "appearance-kubelist",
      title: "The Age of Personalized Software (Kubelist Podcast #54)",
      venue: "The Kubelist Podcast (Heavybit)",
      publishedAt: "2026-07-31",
      participants: ["David Crawshaw", "Marc Campbell", "Benjie De Groot"],
      summary:
        "Career-length interview: North Queensland childhood, Google's Borg era, the weekend WireGuard hack that became Tailscale, and the Sketch-to-exe.dev pivot.",
      media: [
        {
          type: "audio",
          url: "https://www.heavybit.com/library/podcasts/the-kubelist-podcast/ep-54-the-age-of-personalized-software-with-david-crawshaw",
          sourceId: S.kubelist,
        },
      ],
      sourceIds: [S.kubelist],
    },
  ],
  openQuestions: [
    "No Wikipedia article or Wikidata item exists for him; identity is anchored by his own site and public profiles rather than an external registry.",
    "His Google start ('somewhere around 2009, I think') and the length of that tenure are approximate in his own retelling; earlier Australian research work is unnamed.",
    "The Tailscale exit is self-narrated: 'stepped back from the role' versus 'finally completely at the Series C' (April 2025) have no public announcement in the record.",
    "exe.dev's funding is stated two ways in the record: the company announces 'a Series A, for a total of $35m in funding' while lead investor Amplify describes leading a $25M Series A — the split between round and total is not spelled out.",
    "The boundary between 'the company' (started late 2024), Sketch (built then set aside), and exe.dev (launched December 2025) is reconstructed from one interview's account.",
    "Birth date, university, and other personal particulars are not part of the reviewed public record and are not asserted here.",
  ],
  body: `David Crawshaw is an Australian programmer and infrastructure founder whose career tracks three eras of developer tooling: Google's cluster-scale systems and the Go language, the mesh-VPN startup Tailscale, and — since late 2025 — exe.dev, a cloud built for a world where software is increasingly written by AI agents.

## From North Queensland to Google

Crawshaw grew up in a small town in North Queensland, Australia, and learned to program about the time he learned to read, on the computers of his parents' medical practice — MS-DOS machines wired to a Novell NetWare file server, where his father moonlighted writing the practice's medical-record software in Clipper. He has described it on the Kubelist and High Leverage podcasts as the ideal small business in which to learn programming, and an accidental education in product design: watching receptionists check patients in, and asking how to make it take less than a minute.

He studied mathematics and history at university, moved to the Bay Area for family reasons, and landed at Google — in his telling, his first real US job — around 2009. He wanted clusters: work that could not be done on one machine. He got them. His first project moved petabytes between data centers on a logs team supporting search quality, in the Borg era before Kubernetes was usable inside Google. He stayed for the better part of a decade and left as a staff software engineer; his later Google work included implementing TCP/IP networking for the Fuchsia operating system.

## The Go years

His most durable public work at Google was on Go itself. In 2014 he authored the change adding GOOS=android to the Go runtime, and Go 1.4 — released that December — shipped official Android support built on the golang.org/x/mobile repository. He led the iOS port too, turning Go into a mobile platform through the gomobile tooling and the gobind binding generator. In 2016 he implemented the plugin build mode for the go command, and at GopherCon 2017 in Denver he presented "Go Build Modes," a survey of every way a Go program can be built to interop with other languages and itself. In 2017 he also released Neugram, an experimental scripting language and shell reusing Go's syntax and type system.

On March 27, 2018 he posted "Leaving Google": last day, mid-Fuchsia, off to do childcare and start a software business.

## Tailscale: a weekend hack that became a company

The business became Tailscale, co-founded in early 2019 with Avery Pennarun and David Carney — three former Google engineers, distributed across New York, Montreal, and Toronto from day one. The founding story he tells is deliberately unheroic: they knew the shape of the problems they wanted — computing made too difficult for no good reason — found a small Canadian bank that needed two-factor access to old .NET systems, and hacked up a program that wrote WireGuard config files in a weekend. It ran on a machine in the closet of his Manhattan apartment.

The product's architecture came from constraint. Working out of the New York Public Library — which blocked UDP — he collapsed their VPN-concentrator design into one multi-tenant control plane in the cloud with devices connecting peer-to-peer on the data plane, plus a TCP relay fallback. "Mesh networks never work," he remembers Pennarun replying, "but that sounds fine for now." It worked. Tailscale became the developer-beloved way to make a private network; in April 2025 it raised a $160M Series C at a reported $1.45B valuation. By then Crawshaw was leaving — he describes hiring himself out of a job and stepping back, fully, at the Series C.

## Sketch, agents, and exe.dev

What pulled him out was LLMs. Around late 2024 he and Josh Bleecher-Snyder started a company to improve developer tools with them, and ran through the era's product space at speed: a Go-specialized code-completion system, then Sketch — a coding agent that worked in a Docker container and returned results as git branches. Claude Code shipped a simpler agent and ate the market; users bounced off Sketch. But every company they tried it with had test suites that broke the container sandbox, so they kept rebuilding the substrate — gVisor, then real VMs — until the realization landed: the infrastructure was the product.

exe.dev launched at the end of December 2025 selling pools of CPU, memory, and local-NVMe disk on which customers run as many VMs as they like, on machines the company racks itself. On April 22, 2026 he announced a Series A and total funding of $35M, with Amplify, CRV, and HeavyBit named as investors; Amplify's own post frames it as backing "the perfect little computer." A web-based agent, Shelley, ships in the default image so users can build apps from a phone.

## How he thinks

His essays are the record's spine. Three commitments recur. First, empiricism: he spent a year deliberately learning what LLMs are good for — autocomplete, search, chat-driven drafts — and kept publishing revisions as the frontier moved ("Eight more months of agents" reports frontier models writing nine-tenths of his code, all of it carefully read). Second, a definition of agents as feedback loops: an agent is a for loop containing an LLM call with tools, and environment — compiler, tests, shell, browser — is what turns a demo into a programmer. Third, the inversion of agent infrastructure: agents are trained on how developers work, so "the best software for an agent is whatever is best for a programmer."

His most recent argument is institutional: review-then-commit code review cannot survive agents, which double review load while destroying the reviewer's ability to infer effort — a principal-agent problem he says is "killing OSS" through slop PRs. His practiced answer is small high-trust teams where the human driving the agent owns deployment; he reports it working with nine people at exe.dev, and is candid that it does not obviously scale to low-trust companies.

Underneath the timeliness is a longer continuity. The person who ported a language onto phones, replaced a VPN concentrator with a mesh, and now sells VMs-as-processes keeps making the same move: strip the abstraction until the actual computer is visible, then make it pleasant to use. Asked why he would found a second company after Tailscale, his answer is not a mission statement — it is "I like computers."

## What the record does not settle

The public record is thick on work and thin on the person: no Wikipedia article or Wikidata item exists, and dates like his Google start are approximate in his own telling. The Tailscale departure and the Sketch-to-exe.dev boundary are reconstructed almost entirely from his 2026 podcast appearances — self-narrated, plausible, and uncorroborated in the catalog. Even exe.dev's funding is stated two ways across his post and his investor's. This index preserves those seams.

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
