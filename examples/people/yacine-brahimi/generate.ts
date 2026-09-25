#!/usr/bin/env bun
/** Generate examples/people/yacine-brahimi/person-index.json with derived source ids. */

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

const yacineHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "yacine — systems engineer",
  url: "https://yacine.ca/",
  publisher: "yacine.ca",
  notes:
    "The subject's own site; links his projects and 'dot plan' notes on AI systems.",
});
const yacineAbout = source({
  binding: "archive",
  mediaType: "webpage",
  title: "about — yacine",
  url: "http://web.archive.org/web/20260105113016/https://yacine.ca/about/",
  publisher: "yacine.ca via the Wayback Machine",
  notes:
    "Archived capture of his about page (the live page now 404s): the 'kache' IRC nick, Stripe, IAM work, Carleton CS, Ottawa.",
});
const dingboardSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "dingboard",
  url: "https://dingboard.com/",
  publisher: "dingboard.com",
  notes: "The product itself; a browser app that loads straight into the editor.",
});
const scribepodSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "scribepod — an automated podcast",
  url: "https://scribepod.substack.com/",
  publisher: "scribepod on Substack",
  notes: "His automated AI podcast; 'By Yacine', launched about four years ago.",
});
const leftStripe = source({
  binding: "first_person",
  mediaType: "article",
  title: "I left stripe to build stuff",
  url: "https://yacinemtb.substack.com/p/i-left-stripe-to-build-stuff",
  publisher: "o(1) kache lookups (Substack)",
  publishedAt: "2023-05-16",
  authors: ["Yacine"],
});
const dingcadRepo = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "yacineMTB/dingcad — live reload cad scripting",
  url: "https://github.com/yacineMTB/dingcad",
  publisher: "GitHub",
  notes:
    "His repo: a live-reloading OpenSCAD replacement on raylib, ManifoldCAD, and QuickJS.",
});
const dingllmRepo = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "yacineMTB/dingllm.nvim — Yacine's no frills LLM nvim scripts",
  url: "https://github.com/yacineMTB/dingllm.nvim",
  publisher: "GitHub",
});
const xProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "kache (@yacineMTB) on X",
  url: "https://x.com/yacineMTB",
  publisher: "X",
});
const linkedinProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Yacine B on LinkedIn",
  url: "https://www.linkedin.com/in/yacinemtb",
  publisher: "LinkedIn",
  notes:
    "Self-maintained profile listing Stripe software engineer, dingboard founder, staff software engineer at X, and self-employed robotics work in Ottawa.",
});
const linkedinDau = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "the software i made has 760 dau! if you want to be onboarded let me know!",
  url: "https://www.linkedin.com/posts/yacinemtb_the-software-i-made-has-760-dau-if-you-want-activity-7140645580803891201-LNL9",
  publisher: "LinkedIn",
  publishedAt: "2023-12-13",
  authors: ["Yacine B"],
});
const tweetSold = source({
  binding: "first_person",
  mediaType: "article",
  title: "I tried to sell dingboard to X. they gave me a job instead",
  url: "https://twitter.com/yacineMTB/status/1789787186763530449",
  publisher: "X",
  publishedAt: "2024-05",
  notes: "His own post announcing the move; widely discussed on Hacker News.",
});
const tweetFired = source({
  binding: "first_person",
  mediaType: "article",
  title: "I got fired today. I'm not sure why",
  url: "https://twitter.com/yacineMTB/status/1936278079225127184",
  publisher: "X",
  publishedAt: "2025-06-20",
});
const astraThread = source({
  binding: "first_person",
  mediaType: "article",
  title: "Thread: astra drives dingcad, a slicer, and a 3D printer",
  url: "https://x.com/yacineMTB/status/2098179852968792113",
  publisher: "X",
  publishedAt: "2026-09-12",
  notes:
    "Thread in which he describes asking his agent 'astra' to use dingcad, write its own slicer, and drive his 3D printer from his phone.",
});
const eb4Article = source({
  binding: "interview",
  mediaType: "article",
  title: "EB-4: The King Of Ding",
  url: "https://www.emergentbehavior.co/p/eb4-the-king-of-ding-020b",
  publisher: "Emergent Behavior",
  publishedAt: "2024-04-03",
  authors: ["Prakash"],
  notes:
    "Companion post for the podcast episode; quotes the interview and embeds a run of his X posts.",
});
const eb4Podcast = source({
  binding: "interview",
  mediaType: "audio",
  title: "The King of Ding: AI-Powered Meme Generation with Dingboard",
  url: "https://podcasts.apple.com/us/podcast/the-king-of-ding-ai-powered-meme-generation-with-dingboard/id1735023473?i=1000650827701",
  publisher: "Emergent Behavior (Apple Podcasts)",
  publishedAt: "2024",
  notes: "Episode listing names him 'Yacine Brahimi, founder of Dingboard.'",
});
const aitinkerersVideo = source({
  binding: "first_person",
  mediaType: "video",
  title:
    "(AI Tinkerers Ottawa) Dingboard, ONNX & Client side inference — Yacine Brahimi (ex-Stripe)",
  url: "https://www.youtube.com/watch?v=1Hitm0R4Czw",
  publisher: "AI Tinkerers",
  publishedAt: "2024-01",
});
const aitinkerersPage = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "AI Tinkerers Ottawa v2.0.0 (first of 2024)",
  url: "https://ottawa.aitinkerers.org/p/ai-tinkerers-ottawa-v2-0-0-2024",
  publisher: "AI Tinkerers Ottawa",
  publishedAt: "2024-01",
  notes:
    "Event program listing 'Yacine Brahimi — Dingboard & client-side inference' and a short bio.",
});
const tbpnDigest = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Dingboard founder Yacine left X to focus on his meme-making app after the xAI merger turbocharged the codebase",
  url: "https://www.tbpndigest.com/story/2025-06-23/dingboard-founder-yacine-left-x-to-focus-on-his-meme-making-app-after-the-xai-merger-turbocharged-the-codebase",
  publisher: "TBPN Digest",
  publishedAt: "2025-06-23",
});
const tbpnApple = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Tesla Robotaxis Go Live, OpenAI Pulls Jony Ive Promotional Materials, Iran Updates | Yacine et al.",
  url: "https://podcasts.apple.com/us/podcast/tesla-robotaxis-go-live-openai-pulls-jony-ive-promotional/id1772360235?i=1000714253092",
  publisher: "TBPN (Apple Podcasts)",
  publishedAt: "2025-06-23",
  notes:
    "His segment (~03:00:43) covers leaving X, the dingboard rewrite, and the 'Ding Bot' lawn-robot concept.",
});
const diggMirror = source({
  binding: "reference",
  mediaType: "webpage",
  title: "kache (@yacineMTB) — Digg",
  url: "https://digg.com/u/x/yacinemtb",
  publisher: "Digg",
  notes:
    "Third-party mirror of his X presence: bio, join date (Sep 2019), ~400K followers, and post-topic analysis.",
});

const S = {
  yacineHome: yacineHome.id,
  yacineAbout: yacineAbout.id,
  dingboardSite: dingboardSite.id,
  scribepodSite: scribepodSite.id,
  leftStripe: leftStripe.id,
  dingcadRepo: dingcadRepo.id,
  dingllmRepo: dingllmRepo.id,
  xProfile: xProfile.id,
  linkedinProfile: linkedinProfile.id,
  linkedinDau: linkedinDau.id,
  tweetSold: tweetSold.id,
  tweetFired: tweetFired.id,
  astraThread: astraThread.id,
  eb4Article: eb4Article.id,
  eb4Podcast: eb4Podcast.id,
  aitinkerersVideo: aitinkerersVideo.id,
  aitinkerersPage: aitinkerersPage.id,
  tbpnDigest: tbpnDigest.id,
  tbpnApple: tbpnApple.id,
  diggMirror: diggMirror.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-yacine-brahimi",
  generatedAt: "2026-09-25T22:10:00Z",
  subject: {
    kind: "person",
    handle: "yacine-brahimi",
    displayName: "Yacine Brahimi",
    alsoKnownAs: ["kache", "yacineMTB", "Yacine"],
    summary:
      "Canadian software engineer and independent builder in Ottawa, best known as 'kache' (@yacineMTB) on X and as the solo founder of dingboard, a fast browser-based meme and image editor that went viral in 2023. Ex-Stripe and ex-X.",
    identity: {
      officialSite: "https://yacine.ca/",
      profiles: [
        "https://x.com/yacineMTB",
        "https://github.com/yacineMTB",
        "https://www.linkedin.com/in/yacinemtb",
        "https://yacinemtb.substack.com/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T22:10:00Z",
    coverage: ["biography", "work", "projects", "media", "philosophy"],
  },
  sources: [
    yacineHome,
    yacineAbout,
    dingboardSite,
    scribepodSite,
    leftStripe,
    dingcadRepo,
    dingllmRepo,
    xProfile,
    linkedinProfile,
    linkedinDau,
    tweetSold,
    tweetFired,
    astraThread,
    eb4Article,
    eb4Podcast,
    aitinkerersVideo,
    aitinkerersPage,
    tbpnDigest,
    tbpnApple,
    diggMirror,
  ],
  claims: [
    {
      id: "claim-kache-nick",
      kind: "fact",
      text: "He posts on X as 'kache' (@yacineMTB); his site explains that kache was his IRC nick on the freenode and rizon networks.",
      sourceIds: [S.xProfile, S.yacineAbout, S.diggMirror],
    },
    {
      id: "claim-surname-third-party",
      kind: "fact",
      text: "Third-party listings — his AI Tinkerers talk program, the Emergent Behavior podcast page, and company profiles — name him 'Yacine Brahimi'; his own properties use only 'Yacine,' 'kache,' or 'Yacine B.'",
      sourceIds: [S.aitinkerersPage, S.eb4Podcast, S.linkedinProfile],
    },
    {
      id: "claim-ottawa",
      kind: "fact",
      text: "He is based in Ottawa, Canada; his archived about page says he went to school for computer science at Carleton University.",
      sourceIds: [S.yacineAbout, S.linkedinProfile, S.aitinkerersPage],
    },
    {
      id: "claim-stripe",
      kind: "fact",
      text: "He worked at Stripe for about two years as a software engineer, drifting 'less of a software engineer and more of a systems engineer'; his about page says he built IAM systems for most of his career.",
      sourceIds: [S.leftStripe, S.yacineAbout, S.linkedinProfile],
    },
    {
      id: "claim-gpt4-stripe",
      kind: "fact",
      text: "He writes that his LLM work at Stripe got the company mentioned on OpenAI's GPT-4 blog post — a self-reported detail.",
      sourceIds: [S.leftStripe],
    },
    {
      id: "claim-left-stripe",
      kind: "fact",
      text: "He left Stripe in May 2023 for part-time contracting plus independent AI R&D aimed at extracting utility from small consumer-grade models.",
      sourceIds: [S.leftStripe],
    },
    {
      id: "claim-dingboard-founded",
      kind: "fact",
      text: "He founded dingboard (dingboard.com) in Ottawa in 2023 — a fast, browser-based image editor built mostly for making memes — and built it solo.",
      sourceIds: [S.linkedinProfile, S.dingboardSite, S.eb4Article],
    },
    {
      id: "claim-dingboard-origin",
      kind: "fact",
      text: "He says he built dingboard because a diagramming tool he used for memes added a watermark; the name comes from his JavaScript debug habit 'console.log dingus' and a roughly seven-dollar domain.",
      sourceIds: [S.tbpnDigest, S.eb4Article],
    },
    {
      id: "claim-dingboard-metrics",
      kind: "fact",
      text: "Self-posted metrics trace dingboard's climb: 760 DAU in December 2023, about 1.4k DAU later, and a peak near $10K MRR on a $12.99 monthly subscription.",
      sourceIds: [S.linkedinDau, S.linkedinProfile, S.tbpnDigest],
    },
    {
      id: "claim-bootstrapped",
      kind: "fact",
      text: "dingboard is bootstrapped, profitable, and took zero funding; he has dismissed the idea of raising a large institutional round as lame.",
      sourceIds: [S.linkedinProfile, S.tbpnDigest],
    },
    {
      id: "claim-paid-launch",
      kind: "fact",
      text: "dingboard added paid access in March 2024 — he joked the earlier invite codes were 'an if statement with a hardcoded string' — and he posted that he doubled his MRR in a weekend.",
      sourceIds: [S.eb4Article],
    },
    {
      id: "claim-x-hire",
      kind: "fact",
      text: "In May 2024 he posted 'I tried to sell dingboard to X. they gave me a job instead' and joined X as a staff software engineer, keeping dingboard running on the side.",
      sourceIds: [S.tweetSold, S.linkedinProfile, S.tbpnDigest],
    },
    {
      id: "claim-read-every-commit",
      kind: "fact",
      text: "At X he read every commit pushed to the codebase; he says the post-xAI-merger shipping pace made that impossible.",
      sourceIds: [S.tbpnDigest],
    },
    {
      id: "claim-fired",
      kind: "fact",
      text: "In June 2025 he posted 'I got fired today. I'm not sure why,' ending roughly a year at X.",
      sourceIds: [S.tweetFired, S.tbpnDigest],
    },
    {
      id: "claim-fired-context",
      kind: "fact",
      text: "His account on TBPN: after the xAI merger accelerated engineering velocity, remote work became untenable; asked to come in weeks after his son's birth, he declined and was let go shortly after.",
      sourceIds: [S.tbpnDigest, S.tbpnApple],
    },
    {
      id: "claim-dingllm",
      kind: "fact",
      text: "dingllm.nvim — 'no frills LLM nvim scripts' — is among his most-starred repos (~855 stars): a plenary-based rewrite of melbaldove/llm.nvim that streams LLM output into Neovim.",
      sourceIds: [S.dingllmRepo],
    },
    {
      id: "claim-dingcad",
      kind: "fact",
      text: "dingcad is his live-reloading CAD scripting environment — pitched as an OpenSCAD replacement on raylib, ManifoldCAD, and QuickJS — which his site now frames as 'live AI CAD in your browser.'",
      sourceIds: [S.dingcadRepo, S.yacineHome],
    },
    {
      id: "claim-astra",
      kind: "fact",
      text: "In a September 2026 thread he described his agent 'astra' using dingcad to design parts, writing its own slicer, and driving his Bambu Lab printer — all directed from his phone.",
      sourceIds: [S.astraThread],
    },
    {
      id: "claim-soal",
      kind: "fact",
      text: "He is rewriting dingboard on 'Soal,' a cross-platform GL transpiler intended to compile one graphics codebase to iOS, Android, and web.",
      sourceIds: [S.tbpnDigest],
    },
    {
      id: "claim-dingbot",
      kind: "fact",
      text: "On TBPN he introduced the 'Ding Bot,' a 3D-printed robot concept for lawn annoyances like dandelions, alongside talk of a disposable lawn-robot subscription and reinforcement-learning work.",
      sourceIds: [S.tbpnApple, S.tbpnDigest],
    },
    {
      id: "claim-site-miscellanea",
      kind: "fact",
      text: "His site links a shelf of oddball artifacts — twittergrep ('cancel me'), practice.mp4, keyboard photos — plus 'dot plan' notes on the AI systems he is building.",
      sourceIds: [S.yacineHome],
    },
    {
      id: "claim-scribepod",
      kind: "fact",
      text: "He runs 'scribepod,' an automated AI podcast on Substack, and writes 'o(1) kache lookups,' a blog on software, systems, and personal projects.",
      sourceIds: [S.scribepodSite, S.leftStripe],
    },
    {
      id: "claim-audience",
      kind: "fact",
      text: "@yacineMTB has roughly 400K followers (account joined September 2019); third-party mirrors show his follower list includes much of the AI-research public sphere — Karpathy, Altman, Schulman, Jim Fan, Tobi Lütke.",
      sourceIds: [S.diggMirror],
    },
    {
      id: "claim-billion-users",
      kind: "stated_belief",
      text: "His stated ambition for dingboard is ubiquity: 'every person on the planet' — 'a billion users, a billion, with a B' — as common as MS Paint.",
      sourceIds: [S.eb4Article],
    },
    {
      id: "claim-go-nuclear",
      kind: "stated_belief",
      text: "On competing with large companies: 'I can go nuclear... I can go get a job at McDonald's to keep Dingboard running.'",
      sourceIds: [S.eb4Article],
    },
    {
      id: "claim-speed-dogma",
      kind: "stated_belief",
      text: "His product dogma is speed and zero ceremony: products should load instantly with no landing page in the way — he has told VCs not to fund an AI product that doesn't load 'as fast as dingboard dot com (instantly) with 0 clicks.'",
      sourceIds: [S.eb4Article],
    },
    {
      id: "claim-amdahl",
      kind: "stated_belief",
      text: "He left big-company work because 'scaled orgs get capped by Amdahl's law'; he wanted 'goofy capabilities research' where 'user happiness will be my eval.'",
      sourceIds: [S.leftStripe],
    },
    {
      id: "claim-tiger",
      kind: "stated_belief",
      text: "On AI and jobs he is an amused accelerationist: 'The tiger's coming. It'll eat you, dude. Get on.'",
      sourceIds: [S.eb4Article],
    },
    {
      id: "claim-honest-posting",
      kind: "stated_belief",
      text: "On TBPN he described his prolific posting as a commitment to honesty balanced against fun — posting should stay fun rather than stressful.",
      sourceIds: [S.tbpnApple],
    },
    {
      id: "claim-bigtech-price",
      kind: "stated_belief",
      text: "He says he would return to a large tech company for $2.5M and names Shopify — he sold dingboard shirts there and respects Tobi Lütke — and Cohere as candidates.",
      sourceIds: [S.tbpnDigest],
    },
    {
      id: "claim-systems-view",
      kind: "stated_belief",
      text: "His systems-engineering credo: 'the fleshy users & engineers are part of the system' — software design includes the humans around it.",
      sourceIds: [S.leftStripe],
    },
    {
      id: "claim-anti-vc",
      kind: "stated_belief",
      text: "He argues many AI startups are 'just playing house' — raising instead of making money — and shows no interest in that path for dingboard.",
      sourceIds: [S.eb4Article, S.tbpnDigest],
    },
    {
      id: "claim-dingverse",
      kind: "pattern",
      text: "The 'ding' prefix runs across his projects — dingboard, dingllm, dingcad, Ding Bot — a self-aware running brand.",
      sourceIds: [S.dingboardSite, S.dingllmRepo, S.dingcadRepo, S.tbpnDigest],
    },
    {
      id: "claim-ship-weird",
      kind: "pattern",
      text: "He ships a steady stream of small, odd, useful tools — a meme editor, LLM editor scripts, a CAD environment, tweet-grepping utilities — usually free or cheap and always fast.",
      sourceIds: [S.yacineHome, S.dingllmRepo, S.dingcadRepo],
    },
    {
      id: "claim-posting-distribution",
      kind: "pattern",
      text: "His posting is his distribution: dingboard's growth ran through his X account, and third-party analysis of his recent posts classifies the largest share as humor.",
      sourceIds: [S.eb4Article, S.diggMirror],
    },
    {
      id: "claim-own-stack",
      kind: "pattern",
      text: "He prefers owning the whole stack — his own editor, his own transpiler, his own slicer, his own agent — over assembling vendor pieces.",
      sourceIds: [S.tbpnDigest, S.astraThread, S.dingcadRepo],
    },
    {
      id: "claim-spec-viral-job",
      kind: "speculation",
      text: "Whether dingboard's virality directly produced the X offer is implied but not detailed: he framed it as trying to sell the app and getting a job instead.",
      sourceIds: [S.tweetSold, S.tbpnDigest],
    },
    {
      id: "claim-spec-metrics-now",
      kind: "speculation",
      text: "dingboard's current DAU, revenue, and the Soal rewrite's ship status are unknown; every published figure is a self-reported peak.",
      sourceIds: [S.tbpnDigest, S.linkedinProfile],
    },
  ],
  timeline: [
    {
      id: "event-x-join",
      kind: "other",
      date: "2019-09",
      title: "Joined Twitter (now X) as @yacineMTB",
      summary: "The account that became 'kache' dates to September 2019.",
      sourceIds: [S.diggMirror],
    },
    {
      id: "event-stripe",
      kind: "role",
      date: "2021",
      end: "2023-05",
      title: "Software engineer at Stripe",
      summary:
        "About two years; started as a software engineer and drifted toward systems engineering and LLM work. Start year is approximate, per his own account.",
      organization: "Stripe",
      organizationHandle: "stripe",
      sourceIds: [S.leftStripe, S.linkedinProfile, S.yacineAbout],
    },
    {
      id: "event-left-stripe",
      kind: "role",
      date: "2023-05-16",
      title: "Left Stripe to contract and do indie R&D",
      summary:
        "Published 'I left stripe to build stuff': three days a week contracting, the rest on independent AI research and small consumer-grade models.",
      sourceIds: [S.leftStripe],
    },
    {
      id: "event-dingboard",
      kind: "founded",
      date: "2023-09",
      title: "Founded dingboard",
      summary:
        "Solo-built browser image editor for memes; born, he says, when a diagramming tool he used added a watermark.",
      location: "Ottawa, Canada",
      sourceIds: [S.linkedinProfile, S.tbpnDigest, S.eb4Article],
    },
    {
      id: "event-dingboard-viral",
      kind: "milestone",
      date: "2023-12",
      title: "dingboard goes viral on X",
      summary:
        "His posts put dingboard-made memes across X; he logged 760 DAU on LinkedIn in mid-December and joked 'it's pronounced DING board.'",
      sourceIds: [S.linkedinDau, S.eb4Article],
    },
    {
      id: "event-aitinkerers",
      kind: "media",
      date: "2024-01",
      title: "Talk at AI Tinkerers Ottawa",
      summary:
        "'Dingboard, ONNX & client-side inference' — how the app runs ML in the browser.",
      organization: "AI Tinkerers Ottawa",
      organizationHandle: "ai-tinkerers-ottawa",
      location: "Ottawa, Canada",
      sourceIds: [S.aitinkerersVideo, S.aitinkerersPage],
    },
    {
      id: "event-dingboard-paid",
      kind: "milestone",
      date: "2024-03-16",
      title: "dingboard adds paid access",
      summary:
        "Flipped on a $12.99/month tier; posted that he 'doubled my mrr in a weekend.'",
      sourceIds: [S.eb4Article, S.tbpnDigest],
    },
    {
      id: "event-eb4",
      kind: "media",
      date: "2024-04-03",
      title: "'The King of Ding' podcast episode",
      summary:
        "Emergent Behavior EB-4 covered dingboard's virality, his billion-user ambition, and the name's origin.",
      sourceIds: [S.eb4Article, S.eb4Podcast],
    },
    {
      id: "event-joined-x",
      kind: "role",
      date: "2024-05",
      title: "Joined X as staff software engineer",
      summary:
        "'I tried to sell dingboard to X. they gave me a job instead.' dingboard continued as a side project.",
      organization: "X",
      organizationHandle: "x-corp",
      sourceIds: [S.tweetSold, S.linkedinProfile],
    },
    {
      id: "event-fired",
      kind: "role",
      date: "2025-06-20",
      title: "Announced he was fired from X",
      summary:
        "'I got fired today. I'm not sure why.' On TBPN days later he tied it to post-xAI-merger pace and declining to relocate.",
      organization: "X",
      organizationHandle: "x-corp",
      sourceIds: [S.tweetFired, S.tbpnDigest],
    },
    {
      id: "event-tbpn",
      kind: "media",
      date: "2025-06-23",
      title: "TBPN interview on leaving X and what's next",
      summary:
        "Discussed the firing, the dingboard rewrite on the Soal transpiler, the Ding Bot lawn robot, and his posting philosophy.",
      organization: "TBPN",
      organizationHandle: "tbpn",
      sourceIds: [S.tbpnDigest, S.tbpnApple],
    },
    {
      id: "event-astra",
      kind: "project",
      date: "2026-09-12",
      title: "Demoed 'astra' agent driving dingcad and a 3D printer",
      summary:
        "Thread describing astra using dingcad's manifold API, writing its own slicer, and printing to his Bambu Lab — from his phone.",
      sourceIds: [S.astraThread, S.dingcadRepo],
    },
  ],
  themes: [
    {
      id: "theme-speed-zero-clicks",
      kind: "method",
      status: "stated",
      title: "Instant load, zero clicks",
      summary:
        "Software should open straight into the tool — no landing page, no ceremony. He holds dingboard up as the benchmark and tells VCs to defund anything slower.",
      sourceIds: [S.eb4Article, S.dingboardSite],
    },
    {
      id: "theme-independence",
      kind: "belief",
      status: "stated",
      title: "Bootstrap or McDonald's",
      summary:
        "Profitability is freedom: he bootstrapped dingboard, mocks 'serious AI company' theater, and jokes he'd fund the product with a McDonald's job before taking institutional money.",
      sourceIds: [S.eb4Article, S.tbpnDigest, S.linkedinProfile],
    },
    {
      id: "theme-memes-distribution",
      kind: "practice",
      status: "reported",
      title: "Posting is distribution",
      summary:
        "dingboard grew because his X account flooded timelines with its output. Shitposting is not marketing for the product; it is part of the product.",
      sourceIds: [S.eb4Article, S.diggMirror, S.linkedinDau],
    },
    {
      id: "theme-small-models",
      kind: "method",
      status: "stated",
      title: "Utility from small models",
      summary:
        "His research goal after Stripe: how much utility can be extracted from small consumer-grade AI models, evaluated by 'user happiness,' not benchmarks.",
      sourceIds: [S.leftStripe],
    },
    {
      id: "theme-systems-view",
      kind: "philosophy",
      status: "stated",
      title: "The fleshy parts are part of the system",
      summary:
        "A systems-engineering worldview learned at Stripe: users and engineers are inside the system being designed, not outside it.",
      sourceIds: [S.leftStripe, S.yacineAbout],
    },
    {
      id: "theme-own-stack",
      kind: "method",
      status: "inferred",
      title: "Own the whole stack",
      summary:
        "He keeps rebuilding the layers under his product — the editor, the GL transpiler, the CAD environment, the slicer, the agent — rather than assembling vendor pieces.",
      sourceIds: [S.tbpnDigest, S.astraThread, S.dingcadRepo],
    },
    {
      id: "theme-dingverse",
      kind: "practice",
      status: "reported",
      title: "The ding-verse",
      summary:
        "dingboard, dingllm, dingcad, Ding Bot: a running self-aware brand built on a debug-string joke and a seven-dollar domain.",
      sourceIds: [S.eb4Article, S.dingllmRepo, S.dingcadRepo],
    },
    {
      id: "theme-embodiment",
      kind: "interest",
      status: "reported",
      title: "From memes to atoms",
      summary:
        "The trajectory bends toward hardware: a 3D-printed lawn robot, reinforcement learning, embedded work, and an agent that designs and prints its own parts.",
      sourceIds: [S.tbpnApple, S.tbpnDigest, S.astraThread, S.diggMirror],
    },
  ],
  works: [
    {
      id: "work-dingboard",
      kind: "product",
      status: "ongoing",
      title: "dingboard",
      date: "2023",
      summary:
        "Fast, browser-based meme and image editor; bootstrapped, profitable, peak ~$10K MRR at $12.99/month. Being rewritten on his Soal transpiler.",
      sourceIds: [S.dingboardSite, S.eb4Article, S.tbpnDigest],
    },
    {
      id: "work-dingllm",
      kind: "project",
      status: "released",
      title: "dingllm.nvim",
      summary:
        "No-frills LLM scripts for Neovim — streaming completions into the editor; ~855 stars.",
      sourceIds: [S.dingllmRepo],
    },
    {
      id: "work-dingcad",
      kind: "project",
      status: "in_progress",
      title: "dingcad",
      summary:
        "Live-reloading CAD scripting environment (raylib, ManifoldCAD, QuickJS), pitched on his site as 'live AI CAD in your browser.'",
      sourceIds: [S.dingcadRepo, S.yacineHome],
    },
    {
      id: "work-soal",
      kind: "project",
      status: "in_progress",
      title: "Soal",
      summary:
        "Cross-platform GL transpiler he is writing so one graphics codebase compiles to iOS, Android, and web — the base of the dingboard rewrite.",
      sourceIds: [S.tbpnDigest],
    },
    {
      id: "work-dingbot",
      kind: "project",
      status: "proposed",
      title: "Ding Bot",
      summary:
        "A 3D-printed robot concept for lawn annoyances like dandelions; he has floated a disposable lawn-robot subscription.",
      sourceIds: [S.tbpnApple, S.tbpnDigest],
    },
    {
      id: "work-astra",
      kind: "project",
      status: "in_progress",
      title: "astra",
      date: "2026",
      summary:
        "His AI agent that drives dingcad, writes its own slicer, and operates his 3D printer — run from his phone.",
      sourceIds: [S.astraThread],
    },
    {
      id: "work-twittergrep",
      kind: "project",
      status: "released",
      title: "twittergrep",
      summary:
        "A tweet-grepping utility on his site, linked under the label 'cancel me.'",
      sourceIds: [S.yacineHome],
    },
    {
      id: "work-scribepod",
      kind: "project",
      status: "released",
      title: "scribepod",
      summary:
        "An automated AI podcast on Substack, run with his own scripts.",
      sourceIds: [S.scribepodSite],
    },
    {
      id: "work-kache-lookups",
      kind: "other",
      status: "ongoing",
      title: "o(1) kache lookups",
      date: "2023",
      summary:
        "His Substack on software, systems, and personal projects; home of 'I left stripe to build stuff.'",
      sourceIds: [S.leftStripe],
    },
  ],
  appearances: [
    {
      id: "appearance-aitinkerers",
      title: "Dingboard, ONNX & Client side inference",
      venue: "AI Tinkerers Ottawa",
      publishedAt: "2024-01",
      participants: ["Yacine Brahimi"],
      summary:
        "A talk on how dingboard runs ML inference client-side in the browser; the event program lists him under his full name.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=1Hitm0R4Czw",
          sourceId: S.aitinkerersVideo,
        },
      ],
      sourceIds: [S.aitinkerersVideo, S.aitinkerersPage],
    },
    {
      id: "appearance-eb4",
      title: "The King of Ding (EB-4)",
      venue: "Emergent Behavior podcast",
      publishedAt: "2024",
      participants: ["Yacine Brahimi", "Ate-A-Pi"],
      summary:
        "Long-form interview on dingboard's virality, solo-building against funded competitors, and his billion-user ambition.",
      media: [
        {
          type: "audio",
          url: "https://podcasts.apple.com/us/podcast/the-king-of-ding-ai-powered-meme-generation-with-dingboard/id1735023473?i=1000650827701",
          sourceId: S.eb4Podcast,
        },
        {
          type: "article",
          url: "https://www.emergentbehavior.co/p/eb4-the-king-of-ding-020b",
          sourceId: S.eb4Article,
        },
      ],
      sourceIds: [S.eb4Article, S.eb4Podcast],
    },
    {
      id: "appearance-sold-tweet",
      title: "I tried to sell dingboard to X. they gave me a job instead",
      venue: "X",
      publishedAt: "2024-05",
      participants: ["kache"],
      summary:
        "The viral post announcing his move to X; picked up and discussed on Hacker News.",
      media: [
        {
          type: "article",
          url: "https://twitter.com/yacineMTB/status/1789787186763530449",
          sourceId: S.tweetSold,
        },
      ],
      sourceIds: [S.tweetSold],
    },
    {
      id: "appearance-fired-tweet",
      title: "I got fired today. I'm not sure why",
      venue: "X",
      publishedAt: "2025-06-20",
      participants: ["kache"],
      summary:
        "The post announcing his firing from X, again widely discussed on Hacker News.",
      media: [
        {
          type: "article",
          url: "https://twitter.com/yacineMTB/status/1936278079225127184",
          sourceId: S.tweetFired,
        },
      ],
      sourceIds: [S.tweetFired],
    },
    {
      id: "appearance-tbpn",
      title: "TBPN segment on leaving X",
      venue: "TBPN",
      publishedAt: "2025-06-23",
      participants: ["Yacine", "John Coogan", "Jordi Hays"],
      summary:
        "On the post-xAI-merger X, the dingboard rewrite on Soal, the Ding Bot lawn robot, and his approach to posting.",
      media: [
        {
          type: "audio",
          url: "https://podcasts.apple.com/us/podcast/tesla-robotaxis-go-live-openai-pulls-jony-ive-promotional/id1772360235?i=1000714253092",
          sourceId: S.tbpnApple,
        },
      ],
      sourceIds: [S.tbpnDigest, S.tbpnApple],
    },
    {
      id: "appearance-astra-thread",
      title: "astra drives dingcad, a slicer, and a 3D printer",
      venue: "X",
      publishedAt: "2026-09-12",
      participants: ["kache"],
      summary:
        "A thread demoing his agent's end-to-end manufacturing loop — CAD, slicing, printing — capped by 'you are living 1000 years before my time.'",
      media: [
        {
          type: "article",
          url: "https://x.com/yacineMTB/status/2098179852968792113",
          sourceId: S.astraThread,
        },
      ],
      sourceIds: [S.astraThread],
    },
  ],
  relations: [
    {
      id: "rel-stripe",
      kind: "employed_by",
      target: "stripe",
      targetName: "Stripe",
      targetKind: "organization",
      note:
        "Software engineer drifting toward systems engineering and LLM work for about two years, until May 2023.",
      start: "2021",
      end: "2023-05",
      targetWikidataId: "Q7624104",
      sourceIds: [S.leftStripe, S.yacineAbout, S.linkedinProfile],
    },
    {
      id: "rel-x-corp",
      kind: "employed_by",
      target: "x-corp",
      targetName: "X",
      targetKind: "organization",
      note:
        "Staff software engineer from May 2024 — 'I tried to sell dingboard to X. they gave me a job instead' — until he was fired in June 2025.",
      start: "2024-05",
      end: "2025-06",
      targetWikidataId: "Q117617480",
      sourceIds: [S.tweetSold, S.linkedinProfile, S.tweetFired],
    },
    {
      id: "rel-dingboard",
      kind: "founded",
      target: "dingboard",
      targetName: "dingboard",
      targetKind: "organization",
      note:
        "Founded and solo-built the browser image editor in Ottawa in 2023; bootstrapped and profitable.",
      start: "2023",
      sourceIds: [S.linkedinProfile, S.dingboardSite, S.eb4Article],
    },
    {
      id: "rel-ate-a-pi",
      kind: "interviewed_by",
      target: "ate-a-pi",
      targetName: "Ate-A-Pi",
      note:
        "Emergent Behavior EB-4, 'The King of Ding' — the April 2024 long-form interview on dingboard's virality.",
      start: "2024-04",
      sourceIds: [S.eb4Article, S.eb4Podcast],
    },
    {
      id: "rel-john-coogan",
      kind: "interviewed_by",
      target: "john-coogan",
      targetName: "John Coogan",
      note: "TBPN segment on leaving X and the dingboard rewrite, June 2025.",
      start: "2025-06",
      targetWikidataId: "Q110865149",
      sourceIds: [S.tbpnDigest, S.tbpnApple],
    },
    {
      id: "rel-jordi-hays",
      kind: "interviewed_by",
      target: "jordi-hays",
      targetName: "Jordi Hays",
      note: "TBPN segment on leaving X and the dingboard rewrite, June 2025.",
      start: "2025-06",
      sourceIds: [S.tbpnDigest, S.tbpnApple],
    },
  ],
  openQuestions: [
    "The surname 'Brahimi' appears only in third-party listings (his AI Tinkerers program, podcast metadata, company profiles); his own properties say 'Yacine,' 'kache,' or 'Yacine B.' The name also collides with a well-known footballer of the same name.",
    "What 'MTB' stands for in his handle is not publicly explained anywhere in the record.",
    "No birth date or education dates are public; the Carleton CS detail is self-reported and undated, and anything before Stripe is undocumented.",
    "dingboard's current DAU and revenue, and whether the Soal-based rewrite has shipped, are unknown — all figures are his own reported peaks.",
    "Why X fired him remains unexplained even to him — he posted 'I'm not sure why,' and the relocation account is his own telling on TBPN.",
    "Whether the Ding Bot, the lawn-robot subscription, and 'astra' are products, demos, or bits is unresolved.",
  ],
  body: `Yacine Brahimi — better known as "kache" on X, where he posts as @yacineMTB — is a Canadian software engineer in Ottawa who turned a seven-dollar domain and a meme editor into one of the more unusual small-business stories on tech Twitter. dingboard, the fast browser-based image tool he built alone, went viral in late 2023, made real money, accidentally got him hired at X, got him fired a year later, and is now the base layer for a stranger ambition: agents that design and print physical things.

## Who kache is

The handle predates the fame: "kache" was his nick on the freenode and rizon IRC networks, and his site still bills him only as "yacine — systems engineer." The surname "Brahimi" comes from third parties — the program of a talk he gave at AI Tinkerers Ottawa, the listing for his Emergent Behavior podcast episode, company profiles — rather than his own pages, where he is just Yacine or "Yacine B." His archived about page says he studied computer science at Carleton University and built IAM systems for most of his career.

He spent about two years at Stripe, drifting from software engineer toward systems engineer and LLM work — he writes that he got Stripe mentioned on OpenAI's GPT-4 blog post. In May 2023 he published "I left stripe to build stuff," a compact statement of the worldview that runs through everything since: scaled orgs get capped by Amdahl's law, he wanted "goofy capabilities research" on small consumer-grade models, and "user happiness will be my eval." He funded the independence with part-time contracting.

## dingboard

The origin story is pure kache. A diagramming tool he used for memes added a watermark, so he built his own; he named it after the "console.log dingus" string he drops while debugging JavaScript, and registered dingboard.com because it cost about seven bucks. The product is the pitch: it opens straight into a working editor, no landing page, and he has told VCs not to fund any AI product that doesn't load "as fast as dingboard dot com (instantly) with 0 clicks." At AI Tinkerers Ottawa in early 2024 he walked through the technical half of that bet — running ONNX models client-side so the browser does the work.

Growth ran through his own posting. Through late 2023 his account flooded X timelines with dingboard-made memes; by mid-December he was logging 760 DAU on LinkedIn and correcting pronunciation ("it's pronounced DING board"). In March 2024 he flipped on a $12.99 monthly tier — confessing the earlier invite codes were "an if statement with a hardcoded string" — and posted that he doubled his MRR in a weekend. Peak self-reported figures: about 1.4k DAU and roughly $10K MRR, profitable, zero funding. On the Emergent Behavior podcast he set the goal at "a billion users, a billion, with a B," and brushed off venture-backed competition: "I can go nuclear... I can go get a job at McDonald's to keep Dingboard running."

## The X interlude

In May 2024 he posted the line that made the story legible outside his own timeline: "I tried to sell dingboard to X. they gave me a job instead." He joined as a staff software engineer and kept dingboard alive on the side. At X he read every commit pushed to the codebase — a habit he says the post-xAI-merger shipping velocity made physically impossible, and which he describes with genuine admiration for the pace even as it ended his run.

In June 2025: "I got fired today. I'm not sure why." On TBPN days later, he gave his version — remote work had become untenable, he declined to relocate weeks after his son's birth, and was let go. He also said he'd take $2.5M to go back to big tech, naming Shopify and Cohere, which tells you the firing read more as logistics than grievance.

## From memes to atoms

The current work bends toward hardware. His bio now reads "RL, robots, embedded, simulators." He is rewriting dingboard on "Soal," a cross-platform GL transpiler meant to compile one graphics codebase to iOS, Android, and web. dingcad — a live-reloading OpenSCAD replacement he wrote on raylib, ManifoldCAD, and QuickJS — is pitched on his site as "live AI CAD in your browser." In September 2026 he demoed "astra," an agent that used dingcad's manifold API to design parts, wrote its own slicer, and drove his Bambu Lab printer — all from his phone, capped by the very kache boast "you are living 1000 years before my time." On TBPN he introduced the "Ding Bot," a 3D-printed robot concept for lawn dandelions, and floated a disposable lawn-robot subscription.

Between the headline projects sit the smaller artifacts that make the pattern legible: dingllm.nvim (his ~855-star "no frills" LLM scripts for Neovim), twittergrep (linked on his site as "cancel me"), scribepod (an automated AI podcast), and the "o(1) kache lookups" Substack where the whole philosophy is written down in his own words.

The through-line is a builder who owns the whole stack — editor, transpiler, CAD environment, slicer, agent — treats posting as distribution rather than marketing, and wraps real engineering in a running joke named after a debug string. The ding-verse (dingboard, dingllm, dingcad, Ding Bot) is self-aware branding, but the revenue and the 400K-follower audience are real.

## What the record does not settle

The record is thin where his life is thin in public: no birth date, no education dates, nothing before Stripe. The surname itself rests on third-party listings — and collides with a famous footballer. dingboard's current numbers are self-reported peaks; the firing at X is unexplained even by him; and the robots sit somewhere between product, demo, and bit.

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
