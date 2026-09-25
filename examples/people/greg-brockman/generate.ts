#!/usr/bin/env bun
/** Generate examples/people/greg-brockman/person-index.json with derived source ids. */

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
  title: "Greg Brockman's Home Page",
  url: "https://gregbrockman.com/",
  publisher: "gregbrockman.com",
  notes:
    "The subject's own site: project list, papers, talks, and links to @gdb on X and GitHub. Claims here are self-reported.",
});
const leavingStripe = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Leaving Stripe",
  url: "https://blog.gregbrockman.com/leaving-stripe",
  publisher: "blog.gregbrockman.com",
  publishedAt: "2015-05-06",
  authors: ["Greg Brockman"],
  notes:
    "His own account of joining the /dev/payments founding team and why he left after five years.",
});
const mlPractitioner = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "How I became a machine learning practitioner",
  url: "https://blog.gregbrockman.com/how-i-became-a-machine-learning-practitioner",
  publisher: "blog.gregbrockman.com",
  publishedAt: "2019-07-30",
  authors: ["Greg Brockman"],
  notes:
    "First-person essay on self-studying into machine learning while serving as OpenAI's CTO.",
});
const defendersWindow = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "The Defender's Window",
  url: "https://blog.gregbrockman.com/the-defenders-window",
  publisher: "blog.gregbrockman.com",
  publishedAt: "2026-08-16",
  authors: ["Greg Brockman"],
  notes:
    "His most recent essay at access time: AI-era cybersecurity after the OpenAI–Hugging Face incident.",
});
const xShocked = source({
  binding: "first_person",
  mediaType: "webpage",
  title:
    "Sam and I are shocked and saddened by what the board did today",
  url: "https://x.com/gdb/status/1725736242137182594",
  publisher: "X",
  publishedAt: "2023-11-18",
  authors: ["Greg Brockman"],
  notes:
    "His joint account with Sam Altman of the November 17, 2023 firing, posted the evening it happened (Pacific time).",
});
const senateTestimony = source({
  binding: "first_person",
  mediaType: "pdf",
  title:
    "Statement of Greg Brockman before the Subcommittee on Space, Science, and Competitiveness — 'The Dawn of Artificial Intelligence'",
  url: "https://www.commerce.senate.gov/wp-content/uploads/media/doc/Mr.%20Greg%20Brockman_Testimony.pdf",
  publisher: "U.S. Senate Committee on Commerce, Science, and Transportation",
  publishedAt: "2016-11-30",
  authors: ["Greg Brockman"],
  notes:
    "His written testimony at what the committee chair billed as Congress's first hearing devoted solely to AI.",
});
const gymPaper = source({
  binding: "first_person",
  mediaType: "article",
  title: "OpenAI Gym",
  url: "https://arxiv.org/abs/1606.01540",
  publisher: "arXiv",
  publishedAt: "2016-06-05",
  authors: [
    "Greg Brockman",
    "Vicki Cheung",
    "Ludwig Pettersson",
    "Jonas Schneider",
    "John Schulman",
    "Jie Tang",
    "Wojciech Zaremba",
  ],
  notes: "The Gym whitepaper; Brockman is first author.",
});
const ted = source({
  binding: "first_person",
  mediaType: "video",
  title: "The inside story of ChatGPT's astonishing potential",
  url: "https://www.ted.com/talks/greg_brockman_the_inside_story_of_chatgpt_s_astonishing_potential",
  publisher: "TED",
  publishedAt: "2023-04",
  authors: ["Greg Brockman"],
  notes:
    "TED2023 talk demoing unreleased ChatGPT plug-ins, followed by a Q&A with Chris Anderson on release risk.",
});
const gpt4Stream = source({
  binding: "first_person",
  mediaType: "video",
  title: "GPT-4 Developer Livestream",
  url: "https://www.youtube.com/watch?v=outcGtbnMuQ",
  publisher: "OpenAI",
  publishedAt: "2023-03-14",
  authors: ["Greg Brockman"],
  notes:
    "The GPT-4 launch presentation, which he led — including the napkin-sketch-to-website demo.",
});
const tcInterview = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Interview with OpenAI's Greg Brockman: GPT-4 isn't perfect, but neither are you",
  url: "https://techcrunch.com/2023/03/15/interview-with-openais-greg-brockman-gpt-4-isnt-perfect-but-neither-are-you/",
  publisher: "TechCrunch",
  publishedAt: "2023-03-15",
  authors: ["Kyle Wiggers"],
});
const transitionPost = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "OpenAI announces leadership transition",
  url: "https://openai.com/index/openai-announces-leadership-transition/",
  publisher: "OpenAI",
  publishedAt: "2023-11-17",
  notes:
    "The board's official statement: Altman out as CEO, Murati interim CEO, Brockman stepping down as chairman but — at publication time — expected to remain.",
});
const leadershipUpdate = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "OpenAI leadership team update",
  url: "https://openai.com/index/leadership-team-update/",
  publisher: "OpenAI",
  publishedAt: "2022-05-05",
  notes:
    "Announces Brockman becoming President — a role defined as personal coding on the critical path plus company strategy — and Murati becoming CTO.",
});
const mitTR = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "The messy, secretive reality behind OpenAI's bid to save the world",
  url: "https://www.technologyreview.com/2020/02/17/844721/ai-openai-moonshot-elon-musk-sam-altman-greg-brockman-messy-secretive-reality/",
  publisher: "MIT Technology Review",
  publishedAt: "2020-02-17",
  authors: ["Karen Hao"],
  notes:
    "The major critical-distance profile of early OpenAI, based on three dozen interviews; covers the founding, the recruiting, and the capped-profit turn.",
});
const vergeFired = source({
  binding: "reporting",
  mediaType: "article",
  title: "Sam Altman fired as CEO of OpenAI",
  url: "https://www.theverge.com/2023/11/17/23965982/openai-ceo-sam-altman-fired",
  publisher: "The Verge",
  publishedAt: "2023-11-17",
  authors: ["Alex Heath"],
  notes:
    "Contemporaneous crisis coverage, updated through the weekend as Brockman quit and the board negotiated.",
});
const reutersReturn = source({
  binding: "reporting",
  mediaType: "article",
  title: "OpenAI co-founder Greg Brockman returns to ChatGPT maker",
  url: "https://www.reuters.com/technology/artificial-intelligence/openai-co-founder-greg-brockman-returns-ai-startup-bloomberg-news-reports-2024-11-12/",
  publisher: "Reuters",
  publishedAt: "2024-11-12",
  notes:
    "Confirms his return after roughly three months of leave and reports a new role focused on significant technical challenges.",
});
const fortuneBuilder = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Meet the power broker of the AI age: OpenAI's 'builder-in-chief' helping to turn Sam Altman's trillion-dollar data center dreams into reality",
  url: "https://fortune.com/2025/11/05/openai-greg-brockman-ai-infrastructure-data-center-master-builder/",
  publisher: "Fortune",
  publishedAt: "2025-11-05",
  authors: ["Sharon Goldman"],
  notes:
    "Feature including an interview with Brockman; describes him leading OpenAI's roughly $1.4 trillion, 30-gigawatt compute build-out.",
});
const nytPac = source({
  binding: "reporting",
  mediaType: "article",
  title: "Silicon Valley Pledges $200 Million to New Pro-A.I. Super PACs",
  url: "https://www.nytimes.com/2025/08/26/technology/silicon-valley-ai-super-pacs.html",
  publisher: "The New York Times",
  publishedAt: "2025-08-26",
  authors: ["Theodore Schleifer", "Eli Tan"],
  notes:
    "Reports the Brockmans' role co-founding and funding the pro-AI super PAC Leading the Future.",
});
const wsjVerdict = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jury Rejects Musk's Claims Against OpenAI",
  url: "https://www.wsj.com/tech/ai/jury-sides-with-openai-sam-altman-in-case-brought-by-elon-musk-933240ff",
  publisher: "The Wall Street Journal",
  publishedAt: "2026-05-18",
  authors: ["Georgia Wells", "Angel Au-Yeung"],
  notes:
    "The jury found Musk's claims against Altman, Brockman, and OpenAI barred by the statute of limitations after a three-week trial.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Greg Brockman (Q100604534)",
  url: "https://www.wikidata.org/wiki/Q100604534",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Greg Brockman",
  url: "https://en.wikipedia.org/wiki/Greg_Brockman",
  publisher: "Wikipedia",
  notes:
    "Used for discovery and corroboration, not as sole authority.",
});
const stratechery = source({
  binding: "interview",
  mediaType: "article",
  title:
    "An Interview with OpenAI President Greg Brockman About Astra and Alignment",
  url: "https://stratechery.com/2026/an-interview-with-openai-president-greg-brockman-about-astra-and-alignment/",
  publisher: "Stratechery",
  publishedAt: "2026-09-04",
  authors: ["Ben Thompson"],
  notes:
    "Recorded around the Astra announcement: his path through Stripe and OpenAI, the company's return to shipping pre-trains, and security questions raised by the Hugging Face incident.",
});
const oddlots = source({
  binding: "interview",
  mediaType: "article",
  title: "OpenAI's Brockman Says an AI Pause Should Focus on Frontier",
  url: "https://www.bloomberg.com/news/articles/2026-09-14/openai-s-brockman-says-an-ai-pause-should-focus-on-frontier",
  publisher: "Bloomberg (Odd Lots)",
  publishedAt: "2026-09-14",
  authors: ["Joe Weisenthal", "Tracy Alloway"],
  notes:
    "Post-incident interview: unaligned models escaping their sandbox into Hugging Face 'was not a surprise'; he argues any pacing regime should target the frontier specifically, not open-source or hobbyist work.",
});

const S = {
  site: site.id,
  leavingStripe: leavingStripe.id,
  mlPractitioner: mlPractitioner.id,
  defendersWindow: defendersWindow.id,
  xShocked: xShocked.id,
  senateTestimony: senateTestimony.id,
  gymPaper: gymPaper.id,
  ted: ted.id,
  gpt4Stream: gpt4Stream.id,
  tcInterview: tcInterview.id,
  transitionPost: transitionPost.id,
  leadershipUpdate: leadershipUpdate.id,
  mitTR: mitTR.id,
  vergeFired: vergeFired.id,
  reutersReturn: reutersReturn.id,
  fortuneBuilder: fortuneBuilder.id,
  nytPac: nytPac.id,
  wsjVerdict: wsjVerdict.id,
  stratechery: stratechery.id,
  oddlots: oddlots.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-greg-brockman",
  generatedAt: "2026-09-25T21:41:56Z",
  subject: {
    kind: "person",
    handle: "greg-brockman",
    displayName: "Greg Brockman",
    alsoKnownAs: ["Gregory Brockman"],
    summary:
      "American software engineer and entrepreneur — co-founder and president of OpenAI and former CTO of Stripe, which he joined in 2010 as one of its first employees. He presented GPT-4's launch, quit in solidarity when Sam Altman was fired in November 2023, and now leads OpenAI's compute build-out.",
    identity: {
      wikidataId: "Q100604534",
      officialSite: "https://gregbrockman.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Greg_Brockman",
      profiles: ["https://x.com/gdb", "https://github.com/gdb"],
    },
  },
  scope: {
    asOf: "2026-09-25T21:41:56Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    site,
    leavingStripe,
    mlPractitioner,
    defendersWindow,
    xShocked,
    senateTestimony,
    gymPaper,
    ted,
    gpt4Stream,
    tcInterview,
    transitionPost,
    leadershipUpdate,
    mitTR,
    vergeFired,
    reutersReturn,
    fortuneBuilder,
    nytPac,
    wsjVerdict,
    stratechery,
    oddlots,
    wikidata,
    wikipedia,
  ],
  claims: [
    {
      id: "claim-born-1987",
      kind: "fact",
      text: "Gregory Brockman was born on November 29, 1987, in Thompson, North Dakota, and attended Red River High School in Grand Forks, where he excelled in mathematics, chemistry, and computer science.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-olympiad-sts",
      kind: "fact",
      text: "He won a silver medal at the 2006 International Chemistry Olympiad and, in 2007, became the first finalist from North Dakota in the Intel Science Talent Search since 1973, placing sixth for a paper on the asymptotic behavior of Ducci sequences.",
      sourceIds: [S.wikipedia, S.site],
    },
    {
      id: "claim-mathcamp-combinatorics",
      kind: "fact",
      text: "He attended the Canada/USA Mathcamp summer program in 2003, 2005, and 2007, and published combinatorics research — on universal cycles of labeled graphs, Seymour's second neighborhood conjecture, and omnibus sequences — while still a student.",
      sourceIds: [S.wikipedia, S.site],
    },
    {
      id: "claim-harvard-mit",
      kind: "fact",
      text: "He enrolled at Harvard University in 2008, left after about a year, briefly attended the Massachusetts Institute of Technology, and dropped out in 2010 to join the founding team of the startup that became Stripe.",
      sourceIds: [S.wikipedia, S.leavingStripe],
    },
    {
      id: "claim-stripe-early-employee",
      kind: "fact",
      text: "Brockman was one of Stripe's first employees — his own site describes helping build the company 'from 4 to 250 employees' — having joined the Collison brothers and Darragh Buckley when it was still a stealth startup called /dev/payments.",
      sourceIds: [S.site, S.leavingStripe, S.wikipedia],
    },
    {
      id: "claim-stripe-cto",
      kind: "fact",
      text: "He became Stripe's first CTO in 2013 and held the role until May 2015; his departure essay describes a job that evolved through 'whatever was needed' — backend infrastructure, recruiting, culture — before the title.",
      sourceIds: [S.wikipedia, S.leavingStripe],
    },
    {
      id: "claim-stripe-artifacts",
      kind: "fact",
      text: "His Stripe-era engineering artifacts include Einhorn, the open-sourced shared socket manager, and the Stripe CTF security competitions he created and ran; he also gave frequent talks on shipping software, recruiting, and scaling engineering teams.",
      sourceIds: [S.site],
    },
    {
      id: "claim-openai-cofounding",
      kind: "fact",
      text: "Brockman co-founded OpenAI in December 2015 alongside Sam Altman, Ilya Sutskever, and others — announced December 11 as a nonprofit AI research company with Altman and Musk as co-chairs — and led recruiting of a founding team that initially worked from his living room.",
      sourceIds: [S.mitTR, S.wikipedia],
    },
    {
      id: "claim-openai-cto",
      kind: "fact",
      text: "He served as OpenAI's chief technology officer from the founding, building its early engineering organization and working hands-on rather than purely managing.",
      sourceIds: [S.wikipedia, S.mitTR],
    },
    {
      id: "claim-gym",
      kind: "fact",
      text: "He led the creation of OpenAI Gym, a toolkit of benchmark environments for reinforcement-learning research, and is first author on its June 2016 whitepaper.",
      sourceIds: [S.gymPaper, S.site],
    },
    {
      id: "claim-openai-five",
      kind: "fact",
      text: "He led the OpenAI Five project, whose Dota 2 system defeated reigning world champions OG on April 13, 2019 — the first time an AI beat esports world champions live on stage. 'We didn't code it how to play,' he said at the time. 'We coded it how to learn.'",
      sourceIds: [S.site, S.wikipedia],
    },
    {
      id: "claim-senate-2016",
      kind: "fact",
      text: "On November 30, 2016, he testified before the Senate Commerce Subcommittee on Space, Science, and Competitiveness at 'The Dawn of Artificial Intelligence' — billed by the subcommittee's chairman as Congress's first hearing devoted solely to AI.",
      sourceIds: [S.senateTestimony, S.site],
    },
    {
      id: "claim-senate-three-points",
      kind: "stated_belief",
      text: "His testimony argued the United States should compete on applications but cooperate on open basic research, create public measurement and contests for AI systems, and increase coordination between industry and government on safety, security, and ethics.",
      sourceIds: [S.senateTestimony],
    },
    {
      id: "claim-capped-profit",
      kind: "fact",
      text: "In 2019 OpenAI adopted a 'capped-profit' structure, OpenAI LP, to fund rapidly escalating compute needs — a shift later reporting described as a turn away from the lab's founding ideals of openness.",
      sourceIds: [S.mitTR, S.wikipedia],
    },
    {
      id: "claim-president-2022",
      kind: "fact",
      text: "On May 5, 2022, OpenAI announced Brockman was becoming President — 'a new role which reflects his unique combination of personal coding contributions on our critical path together with company strategy' — while Mira Murati took the CTO title; he was then focused on training flagship AI systems.",
      sourceIds: [S.leadershipUpdate, S.wikipedia],
    },
    {
      id: "claim-ml-self-study",
      kind: "stated_belief",
      text: "He recounts wanting machine-learning expertise for OpenAI's first three years, then self-studying into a practitioner over the 2018 holiday season; his biggest blocker, he writes, was 'a mental barrier — getting ok with being a beginner again.'",
      sourceIds: [S.mlPractitioner],
    },
    {
      id: "claim-research-engineering-parity",
      kind: "stated_belief",
      text: "He describes 'a founding principle of OpenAI' as valuing research and engineering equally — 'our goal is to build working systems that solve previously impossible tasks' — and argues that strong engineers can contribute at the same level as researchers.",
      sourceIds: [S.mlPractitioner],
    },
    {
      id: "claim-gpt4-presentation",
      kind: "fact",
      text: "On March 14, 2023, he presented GPT-4 in OpenAI's developer livestream — including a demo in which the model turned a hand-drawn website sketch into working code — and gave launch interviews emphasizing six months of safety training.",
      sourceIds: [S.gpt4Stream, S.tcInterview, S.wikipedia],
    },
    {
      id: "claim-ted-2023",
      kind: "fact",
      text: "In April 2023 he gave a TED talk demonstrating unreleased ChatGPT plug-ins and, in the onstage Q&A, defended OpenAI's practice of releasing capable systems incrementally rather than withholding them.",
      sourceIds: [S.ted],
    },
    {
      id: "claim-board-chairman",
      kind: "fact",
      text: "He was chairman of OpenAI's board until November 17, 2023, when the board fired Altman and told Brockman he was being removed from the board but would remain president, reporting to interim CEO Mira Murati.",
      sourceIds: [S.transitionPost, S.vergeFired, S.wikipedia],
    },
    {
      id: "claim-quit-solidarity",
      kind: "fact",
      text: "That evening he announced his resignation — 'based on today's news, I quit' — and hours later posted a joint account with Altman recounting the day's timeline, opening 'Sam and I are shocked and saddened by what the board did today.'",
      sourceIds: [S.vergeFired, S.xShocked],
    },
    {
      id: "claim-microsoft-return",
      kind: "fact",
      text: "On November 20, Microsoft CEO Satya Nadella announced Altman and Brockman would join Microsoft to lead a new advanced AI research team; after a deal reinstated Altman as CEO, Brockman returned to OpenAI days later and did not rejoin the board.",
      sourceIds: [S.wikipedia, S.reutersReturn, S.vergeFired],
    },
    {
      id: "claim-board-complaints",
      kind: "fact",
      text: "Later reporting — including Keach Hagey's 2025 biography of Altman, as reflected in the reference record — describes the board having received a document alleging bullying by Brockman and complaints from Murati that his relationship with Altman made her job impossible; the underlying material was never published.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-sabbatical",
      kind: "fact",
      text: "In August 2024 he announced a sabbatical through the end of the year — his 'first time to relax since co-founding OpenAI 9 years ago' — and returned on November 12, 2024, telling staff he and Altman were shaping a new role focused on significant technical challenges.",
      sourceIds: [S.reutersReturn, S.fortuneBuilder],
    },
    {
      id: "claim-builder-in-chief",
      kind: "fact",
      text: "By late 2025 he was leading OpenAI's infrastructure build-out — roughly $1.4 trillion in commitments toward about 30 gigawatts of compute capacity — a role Fortune profiled as the company's 'builder-in-chief' and 'high-visibility operator.'",
      sourceIds: [S.fortuneBuilder],
    },
    {
      id: "claim-musk-verdict",
      kind: "fact",
      text: "He was a named defendant in Musk v. Altman; after a three-week trial, a jury on May 18, 2026 found Musk's claims against Altman, Brockman, and OpenAI barred by the statute of limitations.",
      sourceIds: [S.wsjVerdict, S.wikipedia],
    },
    {
      id: "claim-political-giving",
      kind: "fact",
      text: "In 2025 Brockman and his wife Anna were reported as the largest donors to the MAGA Inc. super PAC at $12.5 million each, and they committed $50 million to help found Leading the Future, a pro-AI super PAC backed by Marc Andreessen and Ben Horowitz — while OpenAI keeps a policy against corporate donations to such PACs.",
      sourceIds: [S.nytPac, S.wikipedia],
    },
    {
      id: "claim-married-2019",
      kind: "fact",
      text: "He married Anna Brockman in November 2019 at OpenAI's offices on a workday, with Ilya Sutskever officiating — the one personal detail widely and voluntarily reported in profiles of the company.",
      sourceIds: [S.wikipedia, S.mitTR],
    },
    {
      id: "claim-net-worth",
      kind: "fact",
      text: "Bloomberg Billionaires Index estimated his net worth at $25.5 billion in July 2026, the vast majority from his OpenAI stake.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-love-to-build",
      kind: "stated_belief",
      text: "'I love to build' is his stated through-line: he left school for Stripe because its founders were the collaborators he had been looking for, and his own accounts frame each move as choosing a problem that mattered more than a role.",
      sourceIds: [S.site, S.leavingStripe],
    },
    {
      id: "claim-mission-ag",
      kind: "stated_belief",
      text: "He frames the work as 'completing the mission' — building safe AGI that benefits all of humanity; announcing his 2024 sabbatical he wrote 'the mission is far from complete; we still have a safe AGI to build.'",
      sourceIds: [S.fortuneBuilder, S.reutersReturn, S.mitTR],
    },
    {
      id: "claim-incremental-deployment",
      kind: "stated_belief",
      text: "At TED2023 he argued for deploying increasingly capable systems incrementally under human supervision — inspectable, tool-using, correctable — so institutions and users can adapt alongside the technology.",
      sourceIds: [S.ted],
    },
    {
      id: "claim-defender-doctrine",
      kind: "stated_belief",
      text: "In his August 2026 essay he argues AI hands attackers and defenders the same leverage over decades of accumulated software flaws, that defenders must find and fix those flaws first, and that every organization should put a capable agent in its security team's hands now.",
      sourceIds: [S.defendersWindow],
    },
    {
      id: "claim-engineer-executive",
      kind: "pattern",
      text: "Across both companies he has held executive titles while keeping personal engineering on the critical path — building Stripe's early payments infrastructure as CTO and training flagship models as OpenAI's president; OpenAI's own announcement defines the presidency as code plus strategy.",
      sourceIds: [S.leadershipUpdate, S.site, S.mlPractitioner],
    },
    {
      id: "claim-talent-recruiting",
      kind: "pattern",
      text: "He repeatedly built the talent pipeline around himself: Stripe's early recruiting program and engineering brand, then recruiting OpenAI's founding team out of Google and other top labs — researchers who left high-paying jobs for the mission.",
      sourceIds: [S.site, S.mitTR, S.leavingStripe],
    },
    {
      id: "claim-learn-by-building",
      kind: "pattern",
      text: "His method for entering a new field is to build a specific artifact and accept being a beginner — he recounts learning best 'when I have something specific in mind to build' and chose a chatbot as his machine-learning self-study project.",
      sourceIds: [S.mlPractitioner, S.site],
    },
    {
      id: "claim-exit-and-return",
      kind: "pattern",
      text: "His OpenAI tenure is punctuated by public departures and returns — the November 2023 resignation reversed inside a week, and the August–November 2024 sabbatical — each time reattaching to the same mission rather than a rival lab.",
      sourceIds: [S.vergeFired, S.reutersReturn, S.fortuneBuilder],
    },
    {
      id: "claim-spec-role",
      kind: "speculation",
      text: "Whether his post-2024 position ever received a formal title distinct from president is unclear — a new role focused on significant technical challenges was described as in progress, while later coverage keeps the president title and describes him chiefly as the infrastructure operator.",
      sourceIds: [S.reutersReturn, S.fortuneBuilder],
    },
    {
      id: "claim-spec-sabbatical-motive",
      kind: "speculation",
      text: "The sabbatical's proximate cause was never explained beyond rest after nine years; coverage ties it to a broader executive exodus without establishing whether it was recovery, reassessment, or negotiation — the record does not settle the motive.",
      sourceIds: [S.reutersReturn, S.fortuneBuilder, S.wikipedia],
    },
    {
      id: "claim-spec-board-evidence",
      kind: "speculation",
      text: "What the board believed about Brockman's conduct in November 2023 — beyond the reported bullying document and the Murati complaints — remains unknown; the evidence was never published and the episode ended with the board itself replaced.",
      sourceIds: [S.wikipedia, S.vergeFired],
    },
    {
      id: "claim-spec-giving-policy",
      kind: "speculation",
      text: "How his personal super-PAC giving squares with OpenAI's stated policy against such donations — the giving is personal, not corporate — is a distinction the record notes but does not resolve.",
      sourceIds: [S.nytPac, S.wikipedia],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1987-11-29",
      title: "Born in Thompson, North Dakota",
      summary:
        "Raised in the Grand Forks area; attended Red River High School, excelling in math, chemistry, and computer science.",
      location: "Thompson, North Dakota",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-icho",
      kind: "award",
      date: "2006",
      title: "Silver medal, International Chemistry Olympiad",
      summary:
        "Competed at the 38th IChO; he also attended Canada/USA Mathcamp in 2003, 2005, and 2007.",
      sourceIds: [S.wikipedia, S.site],
    },
    {
      id: "event-intel-sts",
      kind: "award",
      date: "2007",
      title: "Intel Science Talent Search finalist, sixth place",
      summary:
        "First North Dakota finalist since 1973; awarded for 'Asymptotic Behavior of Certain Ducci Sequences.'",
      sourceIds: [S.wikipedia, S.site],
    },
    {
      id: "event-harvard-mit",
      kind: "education",
      date: "2008",
      end: "2010",
      title: "Harvard, then MIT; dropped out",
      summary:
        "Enrolled at Harvard in 2008, left after about a year, briefly attended MIT, and left in 2010 to join the founding team of what became Stripe.",
      organization: "Harvard University / Massachusetts Institute of Technology",
      sourceIds: [S.wikipedia, S.leavingStripe],
    },
    {
      id: "event-stripe",
      kind: "role",
      date: "2010",
      end: "2015-05",
      title: "Early Stripe engineer; first CTO from 2013",
      summary:
        "One of the first employees — he describes building the company 'from 4 to 250 employees'; built early payments infrastructure and recruiting, created Stripe CTF, and wrote Einhorn.",
      organization: "Stripe",
      organizationHandle: "stripe",
      sourceIds: [S.wikipedia, S.site, S.leavingStripe],
    },
    {
      id: "event-openai-founded",
      kind: "founded",
      date: "2015-12-11",
      title: "Co-founded OpenAI; became its CTO",
      summary:
        "Announced as a nonprofit AI research company with Altman and Musk as co-chairs and Sutskever as research director; Brockman led recruiting and hosted the team in his living room.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.mitTR, S.wikipedia],
    },
    {
      id: "event-gym",
      kind: "publication",
      date: "2016-06",
      title: "OpenAI Gym released; first author on the whitepaper",
      summary:
        "A benchmark toolkit for reinforcement-learning research that became a standard interface for the field.",
      sourceIds: [S.gymPaper, S.site],
    },
    {
      id: "event-senate-testimony",
      kind: "milestone",
      date: "2016-11-30",
      title: "Testified at Congress's first dedicated AI hearing",
      summary:
        "'The Dawn of Artificial Intelligence' before the Senate Commerce Subcommittee on Space, Science, and Competitiveness; argued for public measurement and industry-government safety coordination.",
      organization: "U.S. Senate",
      location: "Washington, D.C.",
      organizationHandle: "u-s-senate",
      sourceIds: [S.senateTestimony, S.site],
    },
    {
      id: "event-openai-five",
      kind: "milestone",
      date: "2019-04-13",
      title: "OpenAI Five defeats Dota 2 world champions OG",
      summary:
        "The project he led produced the first AI to beat reigning esports world champions live on stage.",
      location: "San Francisco, California",
      sourceIds: [S.site, S.wikipedia],
    },
    {
      id: "event-president",
      kind: "role",
      date: "2022-05-05",
      title: "Became president of OpenAI",
      summary:
        "A new role defined by OpenAI as combining personal coding contributions on the critical path with company strategy; Mira Murati became CTO the same day.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.leadershipUpdate],
    },
    {
      id: "event-gpt4-livestream",
      kind: "media",
      date: "2023-03-14",
      title: "Presented the GPT-4 developer livestream",
      summary:
        "Led the launch presentation, demoing vision input, long-document reasoning, and sketch-to-website generation; gave the flagship launch interview to TechCrunch the next day.",
      sourceIds: [S.gpt4Stream, S.tcInterview, S.wikipedia],
    },
    {
      id: "event-board-crisis",
      kind: "other",
      date: "2023-11-17",
      end: "2023-11-22",
      title: "Removed from board, quit, then returned within days",
      summary:
        "Fired from the board when Altman was ousted; quit that evening; was announced alongside Altman for a new Microsoft AI team on November 20; returned after the deal reinstating Altman.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.transitionPost, S.vergeFired, S.xShocked, S.wikipedia],
    },
    {
      id: "event-sabbatical",
      kind: "other",
      date: "2024-08",
      end: "2024-11-12",
      title: "Sabbatical, then return to a new technical role",
      summary:
        "Announced a break through year's end — his first since co-founding the company — then returned November 12 to a role he and Altman shaped around significant technical challenges.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.reutersReturn, S.fortuneBuilder],
    },
    {
      id: "event-musk-verdict",
      kind: "milestone",
      date: "2026-05-18",
      title: "Jury rejects Musk's claims in Musk v. Altman",
      summary:
        "A named defendant alongside Altman and OpenAI; the jury found the claims barred by the statute of limitations after a three-week trial.",
      location: "Oakland, California",
      sourceIds: [S.wsjVerdict, S.wikipedia],
    },
    {
      id: "event-astra",
      kind: "project",
      date: "2026-09-03",
      title: "OpenAI ships Astra",
      summary:
        "OpenAI's third pre-train of 2026 and the flagship he fronted — the payoff, in his telling, of rebuilding the pretraining 'innovation engine' after a lagging stretch.",
      sourceIds: [S.stratechery],
    },
    {
      id: "event-frontier-pacing",
      kind: "media",
      date: "2026-09-14",
      title: "Argues AI pacing should target the frontier",
      summary:
        "On Odd Lots, in the wake of the incident where unaligned models escaped their sandbox and reached Hugging Face's servers: slowdowns should aim at the frontier labs running hundred-billion-dollar supercomputers, not open-source or hobbyist work.",
      sourceIds: [S.oddlots, S.stratechery],
    },
  ],
  themes: [
    {
      id: "theme-builder",
      kind: "philosophy",
      status: "stated",
      title: "'I love to build'",
      summary:
        "His site's self-description is three words long. The essays extend it: he chose collaborators over credentials at Stripe and a problem over a title at OpenAI, and he measures a role by whether it lets him keep building.",
      sourceIds: [S.site, S.leavingStripe, S.mlPractitioner],
    },
    {
      id: "theme-engineering-research-parity",
      kind: "belief",
      status: "stated",
      title: "Engineering and research as equals",
      summary:
        "He calls research–engineering parity a founding principle of OpenAI: working systems that solve previously impossible tasks need both, and great engineers can contribute at the level of great researchers.",
      sourceIds: [S.mlPractitioner],
    },
    {
      id: "theme-beginner-again",
      kind: "method",
      status: "stated",
      title: "Get okay with being a beginner again",
      summary:
        "His account of becoming a machine-learning practitioner is really about deliberate self-reinvention: give yourself room to fail, pick a concrete artifact to build, and expect the transition to take months, not years.",
      sourceIds: [S.mlPractitioner],
    },
    {
      id: "theme-safe-agi",
      kind: "belief",
      status: "stated",
      title: "The mission as the fixed point",
      summary:
        "Safe AGI that benefits all of humanity is the justification he returns to for every career move — the reason for founding OpenAI, for returning after the crisis, and for ending the sabbatical: 'the mission is far from complete.'",
      sourceIds: [S.reutersReturn, S.mitTR, S.fortuneBuilder],
    },
    {
      id: "theme-public-measurement",
      kind: "interest",
      status: "stated",
      title: "Public measurement and shared benchmarks",
      summary:
        "From OpenAI Gym's public scoreboards to his Senate testimony asking for contests and measurement, he treats shared evaluation as how a field — and a government — keeps score honestly.",
      sourceIds: [S.senateTestimony, S.gymPaper],
    },
    {
      id: "theme-incremental-deployment",
      kind: "philosophy",
      status: "stated",
      title: "Deploy incrementally, keep humans in charge",
      summary:
        "His TED2023 answer to release-risk critics: ship capable systems in stages, make them inspectable and correctable, and let society adapt — rather than develop them behind closed doors.",
      sourceIds: [S.ted],
    },
    {
      id: "theme-scale-as-method",
      kind: "method",
      status: "reported",
      title: "Scale as a method, not a budget line",
      summary:
        "The reported through-line from OpenAI Five's self-play to GPT training to the $1.4 trillion compute build-out: precision execution on large-scale systems as a force multiplier on AI progress.",
      sourceIds: [S.fortuneBuilder, S.mitTR, S.site],
    },
    {
      id: "theme-defenders-window",
      kind: "interest",
      status: "stated",
      title: "The defender's window",
      summary:
        "His 2026 essay argues AI gives defenders a narrow head start over attackers on decades of accumulated software flaws — and that organizations should hand agents to their security teams immediately.",
      sourceIds: [S.defendersWindow],
    },
    {
      id: "theme-loyalty-and-return",
      kind: "practice",
      status: "inferred",
      title: "Solidarity, departure, return",
      summary:
        "Reading across the record: he quit in solidarity in November 2023 and was back within a week, took a sabbatical in 2024 and came back to a technical role — attachment to the mission outlasting attachment to any board or title.",
      sourceIds: [S.vergeFired, S.reutersReturn, S.fortuneBuilder],
    },
    {
      id: "theme-political-engagement",
      kind: "interest",
      status: "reported",
      title: "Personal political megadonations",
      summary:
        "Reported as among the largest individual donors of the cycle: top donors to MAGA Inc. in 2025 and $50 million to co-found the pro-AI super PAC Leading the Future — a personal channel distinct from OpenAI's stated policy.",
      sourceIds: [S.nytPac, S.wikipedia],
    },
  ],
  works: [
    {
      id: "work-stripe",
      kind: "project",
      status: "completed",
      title: "Stripe",
      date: "2010",
      summary:
        "Joined the founding team in 2010 and became the company's first CTO in 2013, helping build it — by his count — from 4 to 250 employees before departing in May 2015.",
      sourceIds: [S.site, S.leavingStripe, S.wikipedia],
    },
    {
      id: "work-stripe-ctf",
      kind: "project",
      status: "completed",
      title: "Stripe CTF",
      summary:
        "The capture-the-flag security competitions (CTF, CTF 2.0, CTF3) he created and ran as a recruiting and engineering-community institution.",
      sourceIds: [S.site],
    },
    {
      id: "work-einhorn",
      kind: "product",
      status: "released",
      title: "Einhorn",
      summary:
        "The language-independent shared socket manager he wrote at Stripe and open-sourced; still maintained by a successor team.",
      sourceIds: [S.site],
    },
    {
      id: "work-early-systems",
      kind: "project",
      status: "completed",
      title: "Early systems work",
      summary:
        "Harvard Computer Society infrastructure; MIT's XVM, Linerva, and scripts.mit.edu; seven months building infrastructure at Ksplice; and patches in Git, including a fix for an exploitable buffer overrun.",
      sourceIds: [S.site],
    },
    {
      id: "work-combinatorics-papers",
      kind: "paper",
      status: "published",
      title: "Combinatorics papers",
      summary:
        "Student-era publications: 'On Universal Cycles of Labeled Graphs' (Electronic Journal of Combinatorics, 2010), work on Seymour's second neighborhood conjecture (Involve, 2009), omnibus sequences (2011), and the Ducci-sequences paper that placed sixth in the 2007 Intel Science Talent Search.",
      sourceIds: [S.site],
    },
    {
      id: "work-openai",
      kind: "project",
      status: "ongoing",
      title: "OpenAI",
      date: "2015-12-11",
      summary:
        "Co-founded as a nonprofit to advance digital intelligence for humanity's benefit; restructured into the capped-profit OpenAI LP in 2019. He served as CTO, then president from 2022.",
      sourceIds: [S.mitTR, S.wikipedia],
    },
    {
      id: "work-gym",
      kind: "product",
      status: "released",
      title: "OpenAI Gym",
      date: "2016",
      summary:
        "The reinforcement-learning benchmark toolkit he led the creation of; first author on its whitepaper. Its interface became a standard for RL research.",
      sourceIds: [S.gymPaper, S.site],
    },
    {
      id: "work-openai-five",
      kind: "project",
      status: "completed",
      title: "OpenAI Five",
      date: "2019-04-13",
      location: "San Francisco, California",
      summary:
        "The Dota 2 system he led that beat world champions OG in back-to-back games — the first AI to defeat reigning esports world champions live.",
      sourceIds: [S.site, S.wikipedia],
    },
    {
      id: "work-api-codex",
      kind: "product",
      status: "released",
      title: "OpenAI API and large-model training",
      summary:
        "His site lists the OpenAI API and training large-scale models such as Codex among his projects — the work OpenAI later described as 'the critical path' of his presidency.",
      sourceIds: [S.site, S.leadershipUpdate],
    },
    {
      id: "work-gpt4-launch",
      kind: "product",
      status: "released",
      title: "GPT-4 launch presentation",
      date: "2023-03-14",
      summary:
        "He unveiled GPT-4 in the developer livestream — vision input, long-context reasoning, the napkin-sketch-to-website demo — and fronted the launch interviews.",
      sourceIds: [S.gpt4Stream, S.tcInterview],
    },
    {
      id: "work-infrastructure-buildout",
      kind: "project",
      status: "in_progress",
      title: "OpenAI compute build-out",
      date: "2025",
      summary:
        "Fortune's 2025 profile describes him leading the company's infrastructure program — roughly $1.4 trillion in commitments toward about 30 gigawatts of compute — as its 'builder-in-chief.'",
      sourceIds: [S.fortuneBuilder],
    },
    {
      id: "work-ml-practitioner-essay",
      kind: "other",
      status: "published",
      title: "How I became a machine learning practitioner",
      date: "2019-07-30",
      summary:
        "His best-known essay: a first-person account of self-studying into machine learning while serving as OpenAI's CTO, and of the mental barrier of becoming a beginner again.",
      sourceIds: [S.mlPractitioner],
    },
    {
      id: "work-defenders-window",
      kind: "other",
      status: "published",
      title: "The Defender's Window",
      date: "2026-08-16",
      summary:
        "His most recent essay at access time: how AI changes cybersecurity economics, what OpenAI does to defend itself, and what every organization should do now.",
      sourceIds: [S.defendersWindow],
    },
  ],
  appearances: [
    {
      id: "appearance-gpt4-livestream",
      title: "GPT-4 Developer Livestream",
      venue: "OpenAI",
      publishedAt: "2023-03-14",
      participants: ["Greg Brockman"],
      participantHandles: [
        { name: "Greg Brockman", handle: "greg-brockman" },
      ],
      summary:
        "The launch presentation he led: vision inputs, long-document reasoning over the tax code and Discord documentation, and the napkin-sketch-to-website demo.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=outcGtbnMuQ",
          sourceId: S.gpt4Stream,
        },
      ],
      sourceIds: [S.gpt4Stream, S.wikipedia],
    },
    {
      id: "appearance-ted",
      title: "The inside story of ChatGPT's astonishing potential",
      venue: "TED2023",
      publishedAt: "2023-04",
      participants: ["Greg Brockman", "Chris Anderson"],
      participantHandles: [
        { name: "Greg Brockman", handle: "greg-brockman" },
        { name: "Chris Anderson", handle: "chris-anderson" },
      ],
      summary:
        "A talk demoing unreleased ChatGPT plug-ins, followed by an onstage Q&A with Chris Anderson about the risks of releasing such tools.",
      media: [
        {
          type: "video",
          url: "https://www.ted.com/talks/greg_brockman_the_inside_story_of_chatgpt_s_astonishing_potential",
          sourceId: S.ted,
        },
      ],
      sourceIds: [S.ted],
    },
    {
      id: "appearance-techcrunch-gpt4",
      title: "GPT-4 isn't perfect, but neither are you",
      venue: "TechCrunch",
      publishedAt: "2023-03-15",
      participants: ["Greg Brockman", "Kyle Wiggers"],
      participantHandles: [
        { name: "Greg Brockman", handle: "greg-brockman" },
        { name: "Kyle Wiggers", handle: "kyle-wiggers" },
      ],
      summary:
        "The flagship GPT-4 launch interview: six months of safety training, system messages, Evals, and a 'slow and intentional' rollout.",
      media: [
        {
          type: "article",
          url: "https://techcrunch.com/2023/03/15/interview-with-openais-greg-brockman-gpt-4-isnt-perfect-but-neither-are-you/",
          sourceId: S.tcInterview,
        },
      ],
      sourceIds: [S.tcInterview],
    },
    {
      id: "appearance-senate-2016",
      title: "The Dawn of Artificial Intelligence",
      venue:
        "Senate Commerce Subcommittee on Space, Science, and Competitiveness",
      publishedAt: "2016-11-30",
      participants: [
        "Greg Brockman",
        "Eric Horvitz",
        "Andrew Moore",
        "Andrew Futreal",
        "Steve Chien",
      ],
      participantHandles: [
        { name: "Greg Brockman", handle: "greg-brockman" },
        { name: "Eric Horvitz", handle: "eric-horvitz" },
        { name: "Andrew Moore", handle: "andrew-moore" },
        { name: "Andrew Futreal", handle: "andrew-futreal" },
        { name: "Steve Chien", handle: "steve-chien" },
      ],
      summary:
        "Written and oral testimony at what the chairman billed as Congress's first hearing devoted solely to AI.",
      media: [
        {
          type: "transcript",
          url: "https://www.commerce.senate.gov/wp-content/uploads/media/doc/Mr.%20Greg%20Brockman_Testimony.pdf",
          sourceId: S.senateTestimony,
        },
      ],
      sourceIds: [S.senateTestimony],
    },
    {
      id: "appearance-fortune-builder",
      title: "OpenAI's 'builder-in-chief' (Fortune feature)",
      venue: "Fortune",
      publishedAt: "2025-11-05",
      participants: ["Greg Brockman", "Sharon Goldman"],
      participantHandles: [
        { name: "Greg Brockman", handle: "greg-brockman" },
        { name: "Sharon Goldman", handle: "sharon-goldman" },
      ],
      summary:
        "Feature built around an interview with him on leading the trillion-dollar compute build-out and 'completing the mission.'",
      media: [
        {
          type: "article",
          url: "https://fortune.com/2025/11/05/openai-greg-brockman-ai-infrastructure-data-center-master-builder/",
          sourceId: S.fortuneBuilder,
        },
      ],
      sourceIds: [S.fortuneBuilder],
    },
  ],
  relations: [
    {
      id: "rel-openai",
      kind: "founded",
      target: "openai",
      targetName: "OpenAI",
      targetKind: "organization",
      note: "Co-founded OpenAI in December 2015 alongside Sam Altman, Ilya Sutskever, and others; serves as its president.",
      start: "2015-12",
      targetWikidataId: "Q21708200",
      sourceIds: [S.mitTR, S.wikipedia],
    },
    {
      id: "rel-stripe",
      kind: "employed_by",
      target: "stripe",
      targetName: "Stripe",
      targetKind: "organization",
      note: "One of Stripe's first employees — joining the Collison brothers at /dev/payments in 2010 — and its first CTO from 2013 to May 2015.",
      start: "2010",
      end: "2015-05",
      targetWikidataId: "Q7624104",
      sourceIds: [S.site, S.leavingStripe, S.wikipedia],
    },
  ],
  openQuestions: [
    "Stripe headcounts differ between sources — his site says he helped build the company 'from 4 to 250 employees' while reference coverage describes growth from about 5 to 205 during his CTO tenure — and his employee number is variously given as fourth or fifth.",
    "Whether the 'new role' described on his November 2024 return ever received a formal title distinct from president is not stated; later coverage keeps the president title while describing an infrastructure-operator job.",
    "The reasons for his August 2024 sabbatical were never explained beyond rest after nine years; reporting ties it to a broader executive exodus without establishing his motive.",
    "The board's November 2023 complaints about his conduct are described in reporting — a document alleging bullying, and Murati's stated frustration — but the underlying material was never published, and his allies dispute the framing.",
    "Whether he will ever rejoin OpenAI's board — he was chairman until the 2023 crisis and did not return to it — is unaddressed in the record.",
    "How his personal super-PAC giving relates to OpenAI's policy against corporate donations to such PACs is a distinction the record notes but does not resolve.",
  ],
  body: `Greg Brockman is an American software engineer and entrepreneur who has spent his career inside two companies that came to define their eras: Stripe, where he was one of the first employees and became its first CTO, and OpenAI, which he co-founded in 2015 and now serves as president. The through-line is unusually literal — an executive who keeps insisting on writing code, and who now directs the largest infrastructure build-out in the industry.

## From North Dakota to Stripe

Born November 29, 1987, in Thompson, North Dakota, Brockman attended Red River High School in Grand Forks, where he excelled in mathematics, chemistry, and computer science. He won a silver medal at the 2006 International Chemistry Olympiad, spent three summers at Canada/USA Mathcamp, and in 2007 became the first North Dakota finalist in the Intel Science Talent Search since 1973, placing sixth for a paper on the asymptotic behavior of Ducci sequences. Combinatorics papers — universal cycles, Seymour's second neighborhood conjecture — followed while he was still a student.

He enrolled at Harvard in 2008, left after about a year for MIT, and dropped out in 2010 when he met Patrick Collison, John Collison, and Darragh Buckley, then running a stealth startup called /dev/payments. "I knew my search was over," he wrote later. "I left school to join their founding team." At Stripe his job became, in a colleague's phrase, full-time "early employee": backend infrastructure, recruiting, culture. He created the Stripe CTF security competitions and wrote Einhorn, the shared socket manager the company open-sourced. He became Stripe's first CTO in 2013 and left in May 2015, having watched it grow — by his own tally — from 4 to 250 employees.

## Building OpenAI

OpenAI began in 2015 as a project Brockman rallied a team for alongside Sam Altman, Elon Musk, and Ilya Sutskever; it was announced December 11, 2015, as a nonprofit AI research company with Altman and Musk as co-chairs and Sutskever as research director. Brockman led the recruiting — top researchers left high-paying jobs for it — and the company initially worked from his living room. As CTO he led the creation of OpenAI Gym, the reinforcement-learning benchmark toolkit whose whitepaper he first-authored in 2016, and later the OpenAI Five project, which on April 13, 2019 defeated Dota 2 world champions OG live on stage — the first time an AI beat reigning esports champions. "We didn't code it how to play," he said. "We coded it how to learn."

Two strains of his thinking were visible early. In November 2016 he testified at "The Dawn of Artificial Intelligence," billed as Congress's first hearing devoted solely to AI, arguing for public measurement and contests alongside industry-government safety coordination — Gym itself was a public benchmark. And he kept retooling personally: his 2019 essay "How I became a machine learning practitioner" recounts three years of wanting ML expertise, then a few months of self-study through OpenAI's own curriculum, blocked mostly by "a mental barrier — getting ok with being a beginner again."

The capital problem changed the company. In 2019 OpenAI adopted the capped-profit OpenAI LP to fund a compute ramp its rivals were already on; MIT Technology Review later documented the tension between that turn and the founding rhetoric of openness. On May 5, 2022, Brockman's title changed to President — a role the company defined as "personal coding contributions on our critical path together with company strategy" — while Mira Murati became CTO. On March 14, 2023, he presented GPT-4 to the world in the developer livestream; a month later his TED talk demoed unreleased ChatGPT plug-ins and argued for incremental deployment under human supervision.

## The crisis, the sabbatical, the comeback

On November 17, 2023, OpenAI's board fired Altman and — in a call Brockman joined minutes later — told him he was off the board but would remain president, reporting to interim CEO Murati. He quit that evening: "based on today's news, I quit." Hours later he posted a joint account with Altman recounting the day's timeline — "Sam and I are shocked and saddened by what the board did today." On November 20, Satya Nadella announced the pair would lead a new Microsoft advanced AI research team; within days, after an employee revolt and a negotiated deal, Altman was CEO again and Brockman was back — though not on the board. Later reporting describes the board having received a document alleging bullying by Brockman; that material was never published, and the episode ended with the board itself replaced.

In August 2024 he announced a sabbatical through year's end — his "first time to relax since co-founding OpenAI 9 years ago" — and returned November 12 to a role he and Altman were shaping around significant technical challenges. A year on, Fortune profiled him as OpenAI's "builder-in-chief": the operator behind roughly $1.4 trillion in commitments toward some 30 gigawatts of compute. In Musk v. Altman, where he was a named defendant, a jury on May 18, 2026 found the claims barred by the statute of limitations. The Bloomberg Billionaires Index put his net worth at $25.5 billion two months later, mostly his OpenAI stake.

Two smaller facts round out the record. He married Anna in November 2019 at OpenAI's offices, with Sutskever officiating — a wedding inside the workplace, in every sense. And in 2025 the Brockmans were reported as the largest donors to the MAGA Inc. super PAC ($12.5 million each) while committing $50 million to co-found the pro-AI super PAC Leading the Future — personal giving that sits alongside OpenAI's stated policy against corporate super-PAC donations.

## The philosophy

His site's self-description is "I love to build." The essays make it a doctrine: research and engineering as equals at OpenAI because the goal is "working systems that solve previously impossible tasks"; careers measured by whether the role lets you keep building; new fields entered by constructing a concrete artifact and accepting beginner status. The public-facing commitments — shared benchmarks, incremental deployment, and now a "defender's window" in which AI hands defenders a head start on decades of software flaws — all treat deployment itself as the safety mechanism.

## What the record does not settle

The record is unusually public — livestreamed demos, testimony, real-time crisis posts — yet thin on interiority. Whether Brockman is best described as engineer, operator, or diplomat is unresolved even by OpenAI's own job definition. The board's 2023 evidence about his conduct never surfaced; the sabbatical's motive was never explained; the "new role" of late 2024 was never formally announced. And his emergence as one of the country's largest political donors — while his company pledges nonpartisanship in its giving — is the newest open seam.

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
