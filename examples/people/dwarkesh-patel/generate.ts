#!/usr/bin/env bun
/** Generate examples/people/dwarkesh-patel/person-index.json with derived source ids. */

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
  title: "About — Dwarkesh Podcast",
  url: "https://www.dwarkesh.com/about",
  publisher: "Dwarkesh Podcast",
  notes:
    "The subject's own about page; links his YouTube channel, podcast feeds, and X handle @dwarkesh_sp.",
});
const epIlya = source({
  binding: "subject_controlled",
  mediaType: "article",
  title:
    "Ilya Sutskever (OpenAI Chief Scientist) - Building AGI, Alignment, & Future Models",
  url: "https://www.dwarkesh.com/p/ilya-sutskever",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2023-03-27",
});
const epZuck = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Mark Zuckerberg - Llama 3, Open Sourcing $10b Models, & Caesar Augustus",
  url: "https://www.dwarkesh.com/p/mark-zuckerberg",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2024-04-18",
});
const epBlair = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Tony Blair — Why political leaders keep failing at major change",
  url: "https://www.dwarkesh.com/p/tony-blair",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2024-06-26",
});
const epKarpathy = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Andrej Karpathy — AGI is still a decade away",
  url: "https://www.dwarkesh.com/p/andrej-karpathy",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2025-10-17",
});
const paineSeries = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Come watch Sarah Paine lecture live next week!",
  url: "https://www.dwarkesh.com/p/sarah-paine-lecture-series-public",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2024-10-15",
  notes:
    "Announcement of the live Sarah Paine lecture series produced by the podcast.",
});
const willScaling = source({
  binding: "first_person",
  mediaType: "article",
  title: "Will scaling work?",
  url: "https://www.dwarkesh.com/p/will-scaling-work",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2023-12-26",
});
const whyAgi = source({
  binding: "first_person",
  mediaType: "article",
  title: "Why I don’t think AGI is right around the corner",
  url: "https://www.dwarkesh.com/p/why-i-dont-think-agi-is-right-around",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2025-07-03",
});
const strategyDoc = source({
  binding: "first_person",
  mediaType: "article",
  title: "An Intermittent Podcast Strategy Doc",
  url: "https://www.dwarkesh.com/p/dec-strategy-doc",
  publisher: "Dwarkesh Podcast",
  publishedAt: "2025-12-01",
  notes:
    "His own account of the podcast's name change, methods, and plan to elevate essays.",
});
const mercury = source({
  binding: "interview",
  mediaType: "article",
  title: "The future belongs to those who prepare like Dwarkesh Patel",
  url: "https://mercury.com/blog/dwarkesh-patel",
  publisher: "Mercury",
  publishedAt: "2024-02-29",
  authors: ["Shreeda Segan"],
});
const economist = source({
  binding: "interview",
  mediaType: "audio",
  title: "The man who has the ear of Silicon Valley",
  url: "https://www.economist.com/podcasts/2025/04/17/the-man-who-has-the-ear-of-silicon-valley",
  publisher: "The Economist (Money Talks)",
  publishedAt: "2025-04-17",
  authors: ["Mike Bird", "Ethan Wu"],
});
const every = source({
  binding: "interview",
  mediaType: "article",
  title: "Dwarkesh Patel's Quest to Learn Everything",
  url: "https://every.to/p/dwarkesh-patel-s-quest-to-learn-everything",
  publisher: "Every",
  publishedAt: "2024-07-24",
  authors: ["Dan Shipper"],
});
const yesterday = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Dwarkesh Patel | The $10,000 Email Behind Zuckerberg, Satya Nadella and Marc Andreessen",
  url: "https://yesterdayy.substack.com/p/dwarkesh-patel-the-10000-email-behind",
  publisher: "Yesterday",
  publishedAt: "2025-08-15",
  notes:
    "A biographical interview in which he recounts the cold-email booking strategy, the Anil Varanasi grant, and the Jeff Bezos comment.",
});
const apple = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Dwarkesh Podcast — Apple Podcasts",
  url: "https://podcasts.apple.com/us/podcast/dwarkesh-podcast/id1516093381",
  publisher: "Apple Podcasts",
  notes:
    "The show's platform catalog record; the feed URL still carries the original the-lunar-society slug and lists the run from 2020.",
});
const stripe = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Scaling Era: An Oral History of AI, 2019–2025",
  url: "https://press.stripe.com/scaling",
  publisher: "Stripe Press",
  publishedAt: "2025",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Dwarkesh Patel (Q137008739)",
  url: "https://www.wikidata.org/wiki/Q137008739",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Dwarkesh Patel",
  url: "https://en.wikipedia.org/wiki/Dwarkesh_Patel",
  publisher: "Wikipedia",
});
const newyorker = source({
  binding: "reporting",
  mediaType: "article",
  title: "Among the A.I. Doomsayers",
  url: "https://www.newyorker.com/magazine/2024/03/18/among-the-ai-doomsayers",
  publisher: "The New Yorker",
  publishedAt: "2024-03-11",
  authors: ["Andrew Marantz"],
});
const vox = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Feel guilty about eating meat? Some animal rights activists say charity donations can fix your dilemma",
  url: "https://www.vox.com/future-perfect/458607/meat-moral-offsets-factory-farming-dwarkesh-patel-podcast",
  publisher: "Vox",
  publishedAt: "2025-08-21",
  authors: ["Kenny Torrella"],
});
const time = source({
  binding: "reporting",
  mediaType: "article",
  title: "TIME100 AI 2024: Dwarkesh Patel",
  url: "https://time.com/7012877/dwarkesh-patel/",
  publisher: "TIME",
  publishedAt: "2024-09-05",
  authors: ["Tharin Pillay"],
});

const S = {
  about: about.id,
  epIlya: epIlya.id,
  epZuck: epZuck.id,
  epBlair: epBlair.id,
  epKarpathy: epKarpathy.id,
  paineSeries: paineSeries.id,
  willScaling: willScaling.id,
  whyAgi: whyAgi.id,
  strategyDoc: strategyDoc.id,
  mercury: mercury.id,
  economist: economist.id,
  every: every.id,
  yesterday: yesterday.id,
  apple: apple.id,
  stripe: stripe.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  newyorker: newyorker.id,
  vox: vox.id,
  time: time.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-dwarkesh-patel",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "dwarkesh-patel",
    displayName: "Dwarkesh Patel",
    summary:
      "Indian-born American podcaster and writer whose long-form interview show, the Dwarkesh Podcast, has become a leading venue for deeply researched conversations with AI researchers, technology leaders, economists, and historians.",
    identity: {
      wikidataId: "Q137008739",
      officialSite: "https://www.dwarkesh.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Dwarkesh_Patel",
      profiles: [
        "https://twitter.com/dwarkesh_sp",
        "https://www.youtube.com/c/DwarkeshPatel",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "method", "philosophy", "media"],
  },
  sources: [
    about,
    epIlya,
    epZuck,
    epBlair,
    epKarpathy,
    paineSeries,
    willScaling,
    whyAgi,
    strategyDoc,
    mercury,
    economist,
    every,
    yesterday,
    apple,
    stripe,
    wikidata,
    wikipedia,
    newyorker,
    vox,
    time,
  ],
  claims: [
    {
      id: "claim-birth",
      kind: "fact",
      text: "Dwarkesh Patel was born on August 19, 2000, in Vadodara, Gujarat, India.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-move-to-us",
      kind: "fact",
      text: "He moved to the United States as a child — Wikipedia reports age eight, the Mercury profile 'around nine' — and because his father, a physician, took postings around the country, the family lived in North Dakota, West Virginia, Maryland, and Texas.",
      sourceIds: [S.wikipedia, S.mercury],
    },
    {
      id: "claim-ut-austin-cs",
      kind: "fact",
      text: "He studied computer science at the University of Texas at Austin, where his professors included complexity theorist Scott Aaronson, and graduated in December 2021.",
      sourceIds: [S.mercury, S.wikipedia],
    },
    {
      id: "claim-podcast-launch",
      kind: "fact",
      text: "In 2020, while still a student, he began interviewing writers and technologists for a podcast then called The Lunar Society, launched from his dorm room during the COVID-19 pandemic.",
      sourceIds: [S.wikipedia, S.mercury, S.apple],
    },
    {
      id: "claim-first-guest-caplan",
      kind: "fact",
      text: "His first guest was economist Bryan Caplan, whom he reached with a cold email; the interview remains the earliest episode on the feed.",
      sourceIds: [S.yesterday, S.apple],
    },
    {
      id: "claim-lunar-society-name",
      kind: "fact",
      text: "He named the show after the Lunar Society of Birmingham, the 18th-century club of Watt, Boulton, Darwin, Priestley, and Wedgwood; he later renamed it the Dwarkesh Podcast because listeners kept assuming it was a crypto show.",
      sourceIds: [S.strategyDoc, S.wikipedia],
    },
    {
      id: "claim-varanasi-grant",
      kind: "fact",
      text: "As graduation approached with no job lined up, a cold email from Anil Varanasi offered him $10,000 to keep the podcast alive for six more months; Patel recounts this himself in the Yesterday interview.",
      sourceIds: [S.yesterday],
    },
    {
      id: "claim-bezos-comment",
      kind: "fact",
      text: "Jeff Bezos publicly commented 'please keep it up' on one of Patel's blog posts — encouragement Patel has described as cementing his decision to continue; press profiles corroborate Bezos's early praise.",
      sourceIds: [S.yesterday, S.mercury],
    },
    {
      id: "claim-emergent-ventures",
      kind: "fact",
      text: "Early on he supported himself in part through grants including Emergent Ventures, Tyler Cowen's funding program.",
      sourceIds: [S.mercury],
    },
    {
      id: "claim-guest-roster",
      kind: "fact",
      text: "Guests on the podcast have included AI researchers Ilya Sutskever, Andrej Karpathy, Dario Amodei, and Demis Hassabis; technology leaders Mark Zuckerberg, Satya Nadella, and Elon Musk; and political figures Tony Blair and Dominic Cummings.",
      sourceIds: [S.wikipedia, S.epIlya, S.epZuck, S.epBlair, S.epKarpathy],
    },
    {
      id: "claim-nadella-fast-yes",
      kind: "fact",
      text: "Press accounts recount that Microsoft CEO Satya Nadella agreed to an interview roughly four minutes after receiving Patel's cold email.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-time100-ai",
      kind: "fact",
      text: "In 2024, TIME named him to the TIME100 AI list of the most influential people in artificial intelligence.",
      sourceIds: [S.time, S.wikipedia],
    },
    {
      id: "claim-scaling-era-book",
      kind: "fact",
      text: "He is the co-author, with Gavin Leech, of The Scaling Era: An Oral History of AI, 2019–2025, published by Stripe Press in 2025 and built from curated podcast interviews.",
      sourceIds: [S.stripe, S.wikipedia],
    },
    {
      id: "claim-book-contents",
      kind: "fact",
      text: "The book adds more than 170 definitions and visualizations, classic essays on scaling, and previously unpublished interviews with Open Philanthropy's Ajeya Cotra and Anthropic co-founder Jared Kaplan.",
      sourceIds: [S.stripe],
    },
    {
      id: "claim-fundraiser",
      kind: "fact",
      text: "In August 2025 he announced a matching pledge of up to $250,000 for FarmKind, which funds charities opposing factory farming; with listeners and figures such as Patrick Collison, Liv Boeree, and Noah Smith, the drive raised over $2 million.",
      sourceIds: [S.vox, S.wikipedia],
    },
    {
      id: "claim-green-card",
      kind: "fact",
      text: "He has said he obtained his U.S. green card shortly before reaching the maximum age allowed for child-status eligibility.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-san-francisco",
      kind: "fact",
      text: "He is based in San Francisco; in early 2024 he was living in a group house in Hayes Valley funded partly by grants.",
      sourceIds: [S.wikipedia, S.mercury],
    },
    {
      id: "claim-ai-multidisciplinary",
      kind: "stated_belief",
      text: "He calls artificial intelligence 'the most multidisciplinary and intellectually stimulating topic' — the reason the show's center of gravity moved toward AI.",
      sourceIds: [S.wikipedia, S.whyAgi],
    },
    {
      id: "claim-agi-not-corner",
      kind: "stated_belief",
      text: "In a July 2025 essay he argued that AGI is not right around the corner — a position of short-term skepticism about timelines that coexists with long-run expectations of transformative impact.",
      sourceIds: [S.whyAgi],
    },
    {
      id: "claim-debates-here",
      kind: "stated_belief",
      text: "He writes that whatever happens next with AI, he wants 'the debates to have happened on this podcast, and to have happened well' — a self-assigned role as the field's public record.",
      sourceIds: [S.strategyDoc],
    },
    {
      id: "claim-bounce-a-take",
      kind: "stated_belief",
      text: "He believes interviews work best when he arrives with a take the guest can rally against — 'you only get to see Federer's skill when he's rallying against a decent player.'",
      sourceIds: [S.strategyDoc],
    },
    {
      id: "claim-essays-first-class",
      kind: "stated_belief",
      text: "He announced in late 2025 that he wants to make essays 'a first class citizen' of his output, arguing some questions cannot be answered extemporaneously even by the best-prepared guest.",
      sourceIds: [S.strategyDoc],
    },
    {
      id: "claim-rationalist-adjacent",
      kind: "stated_belief",
      text: "He identifies as 'adjacent to the (LessWrong) rationalist community,' sharing its concern about an imminent technological singularity.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-organic-growth",
      kind: "pattern",
      text: "The show grew without institutional backing or an inherited network: profiles describe an audience built guest by guest, from niche intellectuals to heads of labs and state, entirely through published interviews and essays.",
      sourceIds: [S.mercury, S.newyorker, S.yesterday],
    },
    {
      id: "claim-preparation-reputation",
      kind: "pattern",
      text: "Across press coverage the constant is preparation: profiles attribute his access to research depth rather than novelty of format — the Telegraph's write-up of the Blair interview was headlined 'an unknown podcaster.'",
      sourceIds: [S.mercury, S.newyorker, S.economist, S.time, S.wikipedia],
    },
    {
      id: "claim-elite-audience",
      kind: "pattern",
      text: "His audience skews toward the people he covers: funders, lab researchers, and executives respond publicly, fund his matching campaigns, and appear as guests — the readership and the guest list overlap.",
      sourceIds: [S.vox, S.strategyDoc, S.yesterday],
    },
    {
      id: "claim-continual-learning-anticipation",
      kind: "speculation",
      text: "Patel speculates — without claiming credit — that an essay he wrote 'on a whim' about continual learning may have anticipated a bottleneck later named publicly by Sam Altman and Demis Hassabis; the causal link is unverifiable.",
      sourceIds: [S.strategyDoc],
    },
    {
      id: "claim-frontier-access-closing",
      kind: "speculation",
      text: "He forecasts that interviews with frontier-lab insiders will get harder as AI work becomes 'more and more closed off,' one reason he expects essays to matter more; this is his own projection, not an observed trend.",
      sourceIds: [S.strategyDoc],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "2000-08-19",
      title: "Born in Vadodara, Gujarat, India",
      summary: "Later moved to the United States as a child.",
      location: "Vadodara, Gujarat, India",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-move-to-us",
      kind: "milestone",
      date: "2008",
      title: "Moved to the United States",
      summary:
        "Sources put his age at eight or nine; the family lived in several states as his father took medical postings.",
      sourceIds: [S.wikipedia, S.mercury],
    },
    {
      id: "event-podcast-debut",
      kind: "founded",
      date: "2020-05-22",
      title: "Begins The Lunar Society podcast",
      summary:
        "First recorded guest was economist Bryan Caplan, booked by cold email while Patel was a UT Austin student.",
      location: "Austin, Texas",
      sourceIds: [S.yesterday, S.wikipedia, S.apple],
    },
    {
      id: "event-ut-graduation",
      kind: "education",
      date: "2021-12",
      title: "Graduates from UT Austin",
      summary: "Computer science degree; commits to the podcast full-time.",
      organization: "University of Texas at Austin",
      organizationHandle: "university-of-texas-at-austin",
      sourceIds: [S.mercury, S.wikipedia],
    },
    {
      id: "event-sbf-episode",
      kind: "media",
      date: "2022-07",
      title: "Interviews Sam Bankman-Fried",
      summary:
        "An episode on crypto, altruism, and leadership recorded months before the FTX collapse and Bankman-Fried's conviction.",
      sourceIds: [S.mercury],
    },
    {
      id: "event-sutskever-episode",
      kind: "media",
      date: "2023-03-27",
      title: "Ilya Sutskever episode",
      summary:
        "Interview with OpenAI's chief scientist on building AGI, alignment, and future models — an early signature AI episode.",
      sourceIds: [S.epIlya],
    },
    {
      id: "event-zuckerberg-episode",
      kind: "media",
      date: "2024-04-18",
      title: "Mark Zuckerberg episode",
      summary:
        "Conversation covering Llama 3, open-sourcing frontier models, and Caesar Augustus.",
      sourceIds: [S.epZuck, S.wikipedia],
    },
    {
      id: "event-blair-episode",
      kind: "media",
      date: "2024-06-26",
      title: "Tony Blair episode",
      summary:
        "Interviewed the former British prime minister on why political leaders fail at major change.",
      sourceIds: [S.epBlair, S.wikipedia],
    },
    {
      id: "event-time100-ai",
      kind: "award",
      date: "2024-09-05",
      title: "Named to the TIME100 AI list",
      summary:
        "TIME cited the podcast as 'one of the most deeply-researched' on artificial intelligence.",
      organization: "TIME",
      organizationHandle: "time",
      sourceIds: [S.time, S.wikipedia],
    },
    {
      id: "event-paine-lectures",
      kind: "project",
      date: "2024-10",
      title: "Sarah Paine lecture series",
      summary:
        "Produced a live lecture series with the naval historian, extending the show beyond one-on-one interviews.",
      sourceIds: [S.paineSeries],
    },
    {
      id: "event-nadella-episode",
      kind: "media",
      date: "2025-02-19",
      title: "Satya Nadella episode",
      summary:
        "Interview with Microsoft's CEO on its AGI plan; press accounts describe a cold email answered within minutes.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-farmkind-fundraiser",
      kind: "milestone",
      date: "2025-08",
      title: "FarmKind matching fundraiser tops $2 million",
      summary:
        "His $250,000 matching pledge to anti-factory-farming charities went viral among listeners.",
      sourceIds: [S.vox, S.wikipedia],
    },
    {
      id: "event-scaling-era",
      kind: "publication",
      date: "2025-10",
      title: "The Scaling Era published",
      summary:
        "An oral history of AI built from podcast interviews, co-authored with Gavin Leech.",
      organization: "Stripe Press",
      organizationHandle: "stripe-press",
      sourceIds: [S.stripe, S.wikipedia],
    },
    {
      id: "event-karpathy-episode",
      kind: "media",
      date: "2025-10-17",
      title: "Andrej Karpathy episode",
      summary:
        "'AGI is still a decade away' — an episode Patel later singled out for Karpathy's rare freedom to talk openly about research.",
      sourceIds: [S.epKarpathy, S.strategyDoc],
    },
  ],
  themes: [
    {
      id: "theme-preparation",
      kind: "method",
      status: "stated",
      title: "Preparation as the whole trick",
      summary:
        "He reports spending a week or more researching each guest — reading their books and past interviews — and arrives with his own take to bounce against them. Press profiles attribute his unusual access almost entirely to this discipline.",
      sourceIds: [S.mercury, S.strategyDoc, S.yesterday],
    },
    {
      id: "theme-public-record",
      kind: "philosophy",
      status: "stated",
      title: "The podcast as the record of the AI transition",
      summary:
        "He frames the show's job as hosting the debates that matter: 'Whatever happens next, I want the debates to have happened on this podcast, and to have happened well.'",
      sourceIds: [S.strategyDoc, S.economist],
    },
    {
      id: "theme-ai-centrality",
      kind: "interest",
      status: "stated",
      title: "AI as the most multidisciplinary topic",
      summary:
        "His curiosity ranges across history, economics, and science, but AI is the through-line — the subject where technical details, geopolitics, and philosophy collide.",
      sourceIds: [S.wikipedia, S.whyAgi, S.willScaling],
    },
    {
      id: "theme-measured-timelines",
      kind: "belief",
      status: "stated",
      title: "Short-term skeptic, long-term believer",
      summary:
        "His essays argue AGI is not imminent — continual learning and memory remain unsolved — while holding that the long-run stakes are enormous. He has described himself as moderately bearish near-term and 'explosively bullish' long-term.",
      sourceIds: [S.whyAgi, S.strategyDoc],
    },
    {
      id: "theme-cold-email",
      kind: "practice",
      status: "reported",
      title: "The cold email as an institution",
      summary:
        "Bryan Caplan, the $10,000 Varanasi grant, and reportedly Satya Nadella's four-minute yes all began with unsolicited emails. The pattern is now part of the show's mythology and a tacit argument about access.",
      sourceIds: [S.yesterday, S.wikipedia, S.mercury],
    },
    {
      id: "theme-rationalist-ea",
      kind: "belief",
      status: "reported",
      title: "Rationalist and effective-altruist adjacency",
      summary:
        "He self-describes as adjacent to the LessWrong rationalist community; the guest mix and the factory-farming fundraiser reflect that orbit.",
      sourceIds: [S.wikipedia, S.vox],
    },
    {
      id: "theme-intellectual-lineages",
      kind: "influence",
      status: "stated",
      title: "Legendary networks as a model",
      summary:
        "He named the show for the Lunar Society of Birmingham — the 18th-century dinner club of Watt, Boulton, Darwin, and Priestley — a naming that signals how he thinks about dense intellectual networks. His own early support came through one: Tyler Cowen's Emergent Ventures grant program.",
      sourceIds: [S.strategyDoc, S.wikipedia, S.mercury],
    },
    {
      id: "theme-essays-expansion",
      kind: "method",
      status: "stated",
      title: "From interviews to essays",
      summary:
        "He plans to make essays first-class output alongside the podcast, arguing that the hardest questions need days of calculation rather than on-the-spot answers.",
      sourceIds: [S.strategyDoc, S.whyAgi],
    },
  ],
  works: [
    {
      id: "work-dwarkesh-podcast",
      kind: "recording",
      status: "ongoing",
      title: "Dwarkesh Podcast",
      date: "2020",
      summary:
        "The long-form interview show — originally The Lunar Society — now publishing weekly across Substack, YouTube, Apple Podcasts, and Spotify.",
      sourceIds: [S.apple, S.about, S.wikipedia],
    },
    {
      id: "work-caplan-episode",
      kind: "recording",
      status: "released",
      title: "Bryan Caplan — Nurturing Orphaned Ideas",
      date: "2020-05-22",
      summary: "The debut episode, booked by cold email.",
      sourceIds: [S.yesterday],
    },
    {
      id: "work-sbf-episode",
      kind: "recording",
      status: "released",
      title: "Sam Bankman-Fried — Crypto, Altruism, and Leadership",
      date: "2022-07",
      summary:
        "A pre-collapse interview that became part of the FTX-era record; press profiles list it among the show's notable bookings.",
      sourceIds: [S.mercury],
    },
    {
      id: "work-ilya-episode",
      kind: "recording",
      status: "released",
      title: "Ilya Sutskever — Building AGI, Alignment, & Future Models",
      date: "2023-03-27",
      summary: "The first of several Sutskever conversations.",
      sourceIds: [S.epIlya],
    },
    {
      id: "work-lyndon-johnson-essay",
      kind: "other",
      status: "published",
      title: "Lessons from The Years of Lyndon Johnson by Robert Caro",
      date: "2023-05-03",
      summary:
        "A widely circulated essay on Caro's biography series, among the posts that built his early readership.",
      sourceIds: [S.yesterday],
    },
    {
      id: "work-will-scaling-work",
      kind: "other",
      status: "published",
      title: "Will scaling work?",
      date: "2023-12-26",
      summary:
        "His essay on whether LLM scaling could carry to AGI — recommended publicly by Patrick Collison and Emmett Shear.",
      sourceIds: [S.willScaling, S.mercury],
    },
    {
      id: "work-zuck-episode",
      kind: "recording",
      status: "released",
      title: "Mark Zuckerberg — Llama 3, Open Sourcing $10b Models, & Caesar Augustus",
      date: "2024-04-18",
      summary: "A flagship CEO interview on open-source AI strategy.",
      sourceIds: [S.epZuck],
    },
    {
      id: "work-aschenbrenner-episode",
      kind: "recording",
      status: "released",
      title: "Leopold Aschenbrenner — 2027 AGI, China/US super-intelligence race",
      date: "2024-06-04",
      summary:
        "A multi-hour conversation accompanying Aschenbrenner's 'Situational Awareness' essays; among the show's most-cited episodes.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-blair-episode",
      kind: "recording",
      status: "released",
      title: "Tony Blair — Why political leaders keep failing at major change",
      date: "2024-06-26",
      summary: "Interviewed the former UK prime minister on governance and AI.",
      sourceIds: [S.epBlair],
    },
    {
      id: "work-paine-series",
      kind: "project",
      status: "ongoing",
      title: "Sarah Paine lecture series",
      date: "2024-10",
      summary:
        "A recurring set of recorded lectures and interviews with the naval historian on grand strategy, China, Russia, and the world wars.",
      sourceIds: [S.paineSeries],
    },
    {
      id: "work-why-agi-essay",
      kind: "other",
      status: "published",
      title: "Why I don't think AGI is right around the corner",
      date: "2025-07-03",
      summary:
        "Essay arguing near-term AGI is unlikely absent breakthroughs in continual learning and memory.",
      sourceIds: [S.whyAgi],
    },
    {
      id: "work-scaling-era",
      kind: "book",
      status: "published",
      title: "The Scaling Era: An Oral History of AI, 2019–2025",
      date: "2025-10",
      summary:
        "Co-authored with Gavin Leech for Stripe Press: curated interviews plus 170+ definitions, classic essays, and unpublished conversations.",
      sourceIds: [S.stripe, S.wikipedia],
    },
    {
      id: "work-karpathy-episode",
      kind: "recording",
      status: "released",
      title: "Andrej Karpathy — AGI is still a decade away",
      date: "2025-10-17",
      summary:
        "A widely discussed episode that pushed back on imminent-AGI framings.",
      sourceIds: [S.epKarpathy],
    },
  ],
  appearances: [
    {
      id: "appearance-mercury",
      title: "The future belongs to those who prepare like Dwarkesh Patel",
      venue: "Mercury",
      publishedAt: "2024-02-29",
      participants: ["Dwarkesh Patel", "Shreeda Segan"],
      summary:
        "Profile-interview covering his childhood moves, UT Austin, Emergent Ventures support, and the preparation-first method.",
      media: [
        {
          type: "article",
          url: "https://mercury.com/blog/dwarkesh-patel",
          sourceId: S.mercury,
        },
      ],
      sourceIds: [S.mercury],
    },
    {
      id: "appearance-every",
      title: "Dwarkesh Patel's Quest to Learn Everything",
      venue: "Every",
      publishedAt: "2024-07-24",
      participants: ["Dwarkesh Patel", "Dan Shipper"],
      summary:
        "Interview on how he researches, reads, and structures the show's production.",
      media: [
        {
          type: "article",
          url: "https://every.to/p/dwarkesh-patel-s-quest-to-learn-everything",
          sourceId: S.every,
        },
      ],
      sourceIds: [S.every],
    },
    {
      id: "appearance-economist",
      title: "The man who has the ear of Silicon Valley",
      venue: "Money Talks, The Economist",
      publishedAt: "2025-04-17",
      participants: ["Dwarkesh Patel", "Mike Bird", "Ethan Wu"],
      summary:
        "The Economist's business podcast 'turns the tables' on him: the show's rise, The Scaling Era, and the future of AI.",
      media: [
        {
          type: "audio",
          url: "https://www.economist.com/podcasts/2025/04/17/the-man-who-has-the-ear-of-silicon-valley",
          sourceId: S.economist,
        },
      ],
      sourceIds: [S.economist],
    },
    {
      id: "appearance-yesterday",
      title: "The $10,000 Email Behind Zuckerberg, Satya Nadella and Marc Andreessen",
      venue: "Yesterday",
      publishedAt: "2025-08-15",
      participants: ["Dwarkesh Patel"],
      summary:
        "A long biographical interview: childhood in India and the US, the Caplan cold email, the Varanasi grant, and the Bezos comment.",
      media: [
        {
          type: "audio",
          url: "https://yesterdayy.substack.com/p/dwarkesh-patel-the-10000-email-behind",
          sourceId: S.yesterday,
        },
      ],
      sourceIds: [S.yesterday],
    },
  ],
  relations: [
    {
      id: "rel-bryan-caplan",
      kind: "interviewed",
      target: "bryan-caplan",
      targetName: "Bryan Caplan",
      note: "The show's first guest — the debut episode, May 2020.",
      targetWikidataId: "Q943121",
      sourceIds: [S.yesterday, S.apple],
    },
    {
      id: "rel-sam-bankman-fried",
      kind: "interviewed",
      target: "sam-bankman-fried",
      targetName: "Sam Bankman-Fried",
      note: "July 2022 episode on crypto, altruism, and leadership, recorded months before the FTX collapse.",
      targetWikidataId: "Q106543540",
      sourceIds: [S.mercury],
    },
    {
      id: "rel-ilya-sutskever",
      kind: "interviewed",
      target: "ilya-sutskever",
      targetName: "Ilya Sutskever",
      note: "March 2023 episode — the first of several Sutskever conversations.",
      targetWikidataId: "Q21712134",
      sourceIds: [S.epIlya],
    },
    {
      id: "rel-dario-amodei",
      kind: "interviewed",
      target: "dario-amodei",
      targetName: "Dario Amodei",
      note: "August 2023 episode with the Anthropic CEO.",
      targetWikidataId: "Q103335665",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-demis-hassabis",
      kind: "interviewed",
      target: "demis-hassabis",
      targetName: "Demis Hassabis",
      note: "February 2024 episode.",
      targetWikidataId: "Q3022141",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-mark-zuckerberg",
      kind: "interviewed",
      target: "mark-zuckerberg",
      targetName: "Mark Zuckerberg",
      note: "April 2024 episode on Llama 3 and open-sourcing frontier models.",
      targetWikidataId: "Q36215",
      sourceIds: [S.epZuck],
    },
    {
      id: "rel-leopold-aschenbrenner",
      kind: "interviewed",
      target: "leopold-aschenbrenner",
      targetName: "Leopold Aschenbrenner",
      note: "June 2024 'Situational Awareness' episode.",
      targetWikidataId: "Q131735900",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-tony-blair",
      kind: "interviewed",
      target: "tony-blair",
      targetName: "Tony Blair",
      note: "June 2024 episode on why political leaders fail at major change.",
      targetWikidataId: "Q9545",
      sourceIds: [S.epBlair],
    },
    {
      id: "rel-dominic-cummings",
      kind: "interviewed",
      target: "dominic-cummings",
      targetName: "Dominic Cummings",
      note: "Interviewed on the podcast.",
      targetWikidataId: "Q24572712",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-sarah-paine",
      kind: "interviewed",
      target: "sarah-paine",
      targetName: "Sarah Paine",
      note: "Recurring lecture series and interviews from October 2024.",
      targetWikidataId: "Q16499814",
      sourceIds: [S.paineSeries],
    },
    {
      id: "rel-satya-nadella",
      kind: "interviewed",
      target: "satya-nadella",
      targetName: "Satya Nadella",
      note: "February 2025 episode on Microsoft's AGI plan.",
      targetWikidataId: "Q7426870",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-andrej-karpathy",
      kind: "interviewed",
      target: "andrej-karpathy",
      targetName: "Andrej Karpathy",
      note: "October 2025 episode — 'AGI is still a decade away.'",
      targetWikidataId: "Q56037405",
      sourceIds: [S.epKarpathy],
    },
    {
      id: "rel-elon-musk",
      kind: "interviewed",
      target: "elon-musk",
      targetName: "Elon Musk",
      note: "2026 episode.",
      targetWikidataId: "Q317521",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-gavin-leech",
      kind: "collaborated",
      target: "gavin-leech",
      targetName: "Gavin Leech",
      note: "Co-author of The Scaling Era: An Oral History of AI, 2019–2025 (Stripe Press).",
      sourceIds: [S.stripe, S.wikipedia],
    },
  ],
  openQuestions: [
    "The exact date the show rebranded from The Lunar Society to the Dwarkesh Podcast is not pinned down in the record — he says only that he changed it 'eventually'; the Apple Podcasts feed still carries the the-lunar-society slug.",
    "His age at the family's move to the United States is reported as eight (Wikipedia, Hindustan Times) and 'around nine' (Mercury).",
    "Independent audience figures are not public: the show self-reports its Substack subscriber count and press accounts describe elite reach, but no third-party measurement appears in the cited sources.",
    "Some secondary profiles mention institutional affiliations and a research stint in Belgium; the cited record documents grant support (Emergent Ventures, the $10,000 Varanasi grant) rather than any think-tank appointment.",
    "The autobiographical details of the Varanasi grant and the Bezos comment come from Patel's own retelling in interviews; no primary document for either appears in the record.",
  ],
  body: `Dwarkesh Patel is the host of the Dwarkesh Podcast, a long-form interview show that has become, in the press's recurring phrase, the place where the people building artificial intelligence explain themselves. He is twenty-six, has no journalism credential, and booked his first guest — economist Bryan Caplan — with a cold email from a dorm room.

## Origins and formation

Patel was born on August 19, 2000, in Vadodara, Gujarat, and moved to the United States as a child — sources put his age at eight or nine. His father, a physician working on an H-1B visa, was posted around the country, and the family lived in North Dakota, West Virginia, Maryland, and Texas. At the University of Texas at Austin he studied computer science — his professors included complexity theorist Scott Aaronson — and in May 2020, isolated in his dorm during the pandemic, he started interviewing writers and technologists for a show he called The Lunar Society, after the 18th-century Birmingham dinner club of Watt, Boulton, Darwin, and Priestley. He renamed it eventually, he has written, because listeners kept assuming a "lunar" show was about crypto.

The project nearly ended at graduation. Patel has recounted that as he neared his December 2021 degree with no job lined up, a stranger named Anil Varanasi wired him $10,000 to keep the podcast alive for six more months; a Jeff Bezos comment — "please keep it up" — on one of his blog posts supplied further proof the work landed with the people he admired. Grants including Tyler Cowen's Emergent Ventures program paid his share of a Hayes Valley group house in San Francisco. The naming was not incidental nostalgia: the Birmingham club is the kind of small intellectual network he admires — and the grant programs that kept him afloat are its modern analogue.

## The show

The guest ladder tells the growth story. Early episodes hosted economists and internet writers — Caplan, Tyler Cowen, Robin Hanson, Scott Aaronson. By 2023 the roster included OpenAI chief scientist Ilya Sutskever (March) and Anthropic CEO Dario Amodei (August). Then the gates opened fully: Patrick Collison and Demis Hassabis in February 2024, Mark Zuckerberg in April, Leopold Aschenbrenner's "Situational Awareness" marathon and Tony Blair in June, Satya Nadella in February 2025 — Indian press reported Nadella answered the cold email in about four minutes — Andrej Karpathy and a second Sutskever in late 2025, Elon Musk and Jensen Huang in 2026. Alongside interviews he produces other formats: a recurring lecture series with naval historian Sarah Paine, live AMAs, full transcripts, and essays, all published to the same Substack at dwarkesh.com.

His reputation rests on preparation — he reports a week or more of research per guest and believes interviews work when he arrives with a take worth rallying against. The press has ratified it: The Telegraph marvelled at "an unknown podcaster" landing a former prime minister; The Economist called him "Silicon Valley's favourite podcaster"; The New Yorker slotted the show as what the Rogan experience is to jujitsu bros for the AI-anxious set. The method is partly adversarial: he has said he gets frustrated when a guest cannot resolve a question on the spot, because if a week of research and hours of conversation produce no insight, "what hope is there for the audience?" One footnote in the catalog is the July 2022 Sam Bankman-Fried episode, recorded months before FTX collapsed — a reminder that the archive captures its moment, not its vindication.

## The essays and the book

Patel treats writing as a second instrument. "Will scaling work?" (December 2023) asked whether LLM scaling could carry to AGI and was recommended by Patrick Collison and Emmett Shear. "Why I don't think AGI is right around the corner" (July 2025) staked his contrarian-for-the-room position: near-term AGI is unlikely while continual learning and memory remain unsolved — though he stays, in his phrase, explosively bullish long-term. In a December 2025 strategy doc he announced making essays "a first class citizen" of his output, and disclosed that an essay on continual learning he wrote "on a whim" anticipated a bottleneck later named publicly by Sam Altman and Demis Hassabis — a connection he offers as speculation, not credit.

In 2025 Stripe Press published The Scaling Era: An Oral History of AI, 2019–2025, co-authored with Gavin Leech: curated podcast interviews wrapped with 170-plus definitions, classic essays, and previously unpublished conversations with Ajeya Cotra and Jared Kaplan. It is the show's claim to durability — the podcast as the primary source, the book as the archive.

## Standing

TIME put him on its 2024 TIME100 AI list. The audience is unusually elite — his August 2025 pledge to match $250,000 in donations to anti-factory-farming charities pulled in Patrick Collison, Liv Boeree, and Noah Smith and topped $2 million, close to one percent of the movement's annual budget by Vox's estimate. He describes himself as adjacent to the rationalist and effective-altruist communities, and as a participant in the scene he covers: he has said his green card arrived just before he aged out of child-status eligibility, and he writes of his listeners that the audience contains "some of the smartest people in the world."

## What the record does not settle

The record is thin where the myth is thick. The rebrand date, the Varanasi wire, and the Bezos comment all rest on his own telling. Audience size is self-reported. No think-tank appointment appears in the cited sources — the documented support is grant money. And the deepest question the index cannot answer is whether hosting the debate changes it.

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
