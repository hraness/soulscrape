#!/usr/bin/env bun
/** Generate examples/people/pieter-levels/person-index.json with derived source ids. */

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

// ---------------------------------------------------------------------------
// Interview media (defined first so self-published transcripts can link to them
// via transcriptOf, which must resolve to a source id in this catalog).
// ---------------------------------------------------------------------------

const lexPage = source({
  binding: "interview",
  mediaType: "webpage",
  title:
    "Pieter Levels: Programming, Viral AI Startups, and Digital Nomad Life — Lex Fridman Podcast #440",
  url: "https://lexfridman.com/pieter-levels/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2024-08-20",
  authors: ["Lex Fridman"],
});
const lexYoutube = source({
  binding: "interview",
  mediaType: "video",
  title:
    "Pieter Levels: Programming, Viral AI Startups, and Digital Nomad Life | Lex Fridman Podcast #440",
  url: "https://www.youtube.com/watch?v=oFtjKbXKqbg",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2024-08-20",
});
const mfmEpisode = source({
  binding: "interview",
  mediaType: "webpage",
  title: "Pieter Levels: Making $2.7M a Year With No Employees",
  url: "https://www.mfmpod.com/pieter-levels-making-27m-a-year-with-no-employees/",
  publisher: "My First Million",
  publishedAt: "2022-07-14",
});
const ih43 = source({
  binding: "interview",
  mediaType: "audio",
  title: "#43 — Pieter Levels of Nomad List",
  url: "https://www.indiehackers.com/podcast/043-pieter-levels-of-nomad-list",
  publisher: "Indie Hackers",
  publishedAt: "2018-01",
});
const ih241 = source({
  binding: "interview",
  mediaType: "audio",
  title: "#241 — Pieter Levels",
  url: "https://www.indiehackers.com/podcast/241-pieter-levels",
  publisher: "Indie Hackers",
  publishedAt: "2022-01",
});
const ih242 = source({
  binding: "interview",
  mediaType: "audio",
  title: "#242 — Pieter Levels",
  url: "https://www.indiehackers.com/podcast/242-pieter-levels",
  publisher: "Indie Hackers",
  publishedAt: "2022-01",
});
const cheekyPint = source({
  binding: "interview",
  mediaType: "audio",
  title: "Pieter Levels on being the most prominent indie hacker",
  url: "https://cheekypint.transistor.fm/episodes/pieter-levels-on-being-the-most-prominent-indie-hacker",
  publisher: "Stripe — A Cheeky Pint",
  publishedAt: "2025-07-09",
  authors: ["John Collison"],
});

// ---------------------------------------------------------------------------
// Subject-controlled and first-person sources (levels.io posts and transcripts)
// ---------------------------------------------------------------------------

const blogHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "@levelsio's blog — Pieter Levels",
  url: "https://levels.io/",
  publisher: "levels.io",
  notes:
    "The subject's own site and post index; post titles themselves carry self-reported revenue figures.",
});
const projects = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "List of all my projects ever",
  url: "https://levels.io/projects",
  publisher: "levels.io",
  notes:
    "Self-curated resume: products, education, and failures; most entries are marked as making no money.",
});
const resetYourLife = source({
  binding: "first_person",
  mediaType: "article",
  title: "Reset your life",
  url: "https://levels.io/reset-your-life",
  publisher: "levels.io",
  publishedAt: "2013-04-22",
  notes:
    "First-person account of selling possessions and leaving Amsterdam for Bangkok; contains self-reported descriptions of anxiety and panic.",
});
const twelveStartups = source({
  binding: "first_person",
  mediaType: "article",
  title: "12 startups in 12 months",
  url: "https://levels.io/12-startups-12-months",
  publisher: "levels.io",
  publishedAt: "2014-03-01",
});
const phHnNumberOne = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "How I got my startup to #1 on both Product Hunt and Hacker News by accident",
  url: "https://levels.io/product-hunt-hacker-news-number-one",
  publisher: "levels.io",
  publishedAt: "2014-08-16",
});
const remoteJobsBoard = source({
  binding: "first_person",
  mediaType: "article",
  title: "How I built a remote jobs board (Nomad Jobs)",
  url: "https://levels.io/how-i-built-a-remote-jobs-board",
  publisher: "levels.io",
  publishedAt: "2014-08-31",
});
const remoteOkPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "How I built Remote OK and launched it to #1 on Product Hunt",
  url: "https://levels.io/remote-ok",
  publisher: "levels.io",
  publishedAt: "2015-04-02",
});
const nomadListFounder = source({
  binding: "first_person",
  mediaType: "article",
  title: "Nomad List founder",
  url: "https://levels.io/nomad-list-founder",
  publisher: "levels.io",
  publishedAt: "2017-01-07",
  notes:
    "Calls Nomad List roughly the 7th startup he tried — contradicting his own 2014 post that calls it the 4th of the challenge.",
});
const hoodmapsPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Building Hoodmaps live on Twitch",
  url: "https://levels.io/hoodmaps/",
  publisher: "levels.io",
  publishedAt: "2017-07-26",
});
const indieHackers1Post = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Indie Hackers Podcast: Confronting fears and taking a leap",
  url: "https://levels.io/indie-hackers-1",
  publisher: "levels.io",
  publishedAt: "2018-01-17",
  transcriptOf: ih43.id,
});
const startupsTalk = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Turning side projects into profitable startups (Dojo Bali talk)",
  url: "https://levels.io/startups",
  publisher: "levels.io",
  publishedAt: "2018-01-24",
});
const makerOfTheYear = source({
  binding: "first_person",
  mediaType: "article",
  title: "I'm Product Hunt's Maker of the Year again!",
  url: "https://levels.io/maker-of-the-year",
  publisher: "levels.io",
  publishedAt: "2018-01-29",
});
const makePhPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "My book MAKE on bootstrapping startups is now live on Product Hunt",
  url: "https://levels.io/make-book-on-product-hunt",
  publisher: "levels.io",
  publishedAt: "2018-03-12",
});
const fourYears1m = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "It took 4 years to reach $1m annual revenue with Nomad List and Remote OK",
  url: "https://levels.io/4-years-to-1m-revenue-nomad-list-remote-ok",
  publisher: "levels.io",
  publishedAt: "2019-05-30",
});
const nomadList5 = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Nomad List 5 launches exactly 5 years after the first version on Product Hunt",
  url: "https://levels.io/nomad-list-5-launches-5-years-later",
  publisher: "levels.io",
  publishedAt: "2019-07-29",
});
const greatestMigration = source({
  binding: "first_person",
  mediaType: "article",
  title: "The greatest migration",
  url: "https://levels.io/the-greatest-migration",
  publisher: "levels.io",
  publishedAt: "2020-11-12",
});
const indieHackers2Post = source({
  binding: "first_person",
  mediaType: "transcript",
  title:
    "Indie Hackers Podcast: Money, happiness and productivity as a solo founder",
  url: "https://levels.io/indie-hackers-2",
  publisher: "levels.io",
  publishedAt: "2022-01-26",
  transcriptOf: ih241.id,
});
const mfmPost = source({
  binding: "first_person",
  mediaType: "transcript",
  title:
    "My First Million Podcast: bootstrapping, open startups and lifestyle inflation",
  url: "https://levels.io/my-first-million/",
  publisher: "levels.io",
  publishedAt: "2022-07-14",
  transcriptOf: mfmEpisode.id,
});
const interiorAiPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "How I built InteriorAI.com in 5 days",
  url: "https://levels.io/how-i-built-interiorai-com-in-5-days",
  publisher: "levels.io",
  publishedAt: "2022-10-04",
});
const avatarAiPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Create your own AI avatars with AvatarAI.me",
  url: "https://levels.io/create-your-own-ai-avatars-with-avatarai-me",
  publisher: "levels.io",
  publishedAt: "2022-10-28",
});
const sold100kPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "I sold $100k in AI avatars with AvatarAI.me in 10 days",
  url: "https://levels.io/sold-100k-ai-avatars-with-avatarai-me",
  publisher: "levels.io",
  publishedAt: "2022-11-07",
  notes: "Sales figure is self-reported and unaudited.",
});
const photoAiPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Photo AI: photorealistic AI photo studio",
  url: "https://levels.io/photoai-photorealistic-ai-photo-studio",
  publisher: "levels.io",
  publishedAt: "2023-02-10",
});
const networkStatesPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Nomad List is one of the first network states",
  url: "https://levels.io/nomad-list-first-network-states",
  publisher: "levels.io",
});
const lexTranscriptPost = source({
  binding: "first_person",
  mediaType: "transcript",
  title:
    "A conversation on startups, AI and indie hacking with Lex Fridman",
  url: "https://levels.io/conversation-on-startups-ai-indie-hacking-lex-fridman",
  publisher: "levels.io",
  publishedAt: "2024-08-20",
  transcriptOf: lexYoutube.id,
});
const flyPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "fly.pieter.com — a vibe-coded flight simulator",
  url: "https://levels.io/fly-pieter-com-vibecoded-flight-simulator",
  publisher: "levels.io",
  publishedAt: "2025-02-22",
  notes: "Self-reports roughly $1M ARR within 17 days; unaudited.",
});
const cheekyPintTranscript = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Stripe Podcast: A Cheeky Pint with John Collison",
  url: "https://levels.io/stripe-cheeky-pint-john-collison",
  publisher: "levels.io",
  publishedAt: "2025-07-09",
  transcriptOf: cheekyPint.id,
});
const wannabePost = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Wannabe Entrepreneur Podcast (transcript)",
  url: "https://levels.io/wannabe-entrepreneur",
  publisher: "levels.io",
});
const productHuntRadioPost = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Product Hunt Radio (transcript)",
  url: "https://levels.io/product-hunt-radio/",
  publisher: "levels.io",
});
const anxietyPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Anxiety",
  url: "https://levels.io/anxiety",
  publisher: "levels.io",
  notes:
    "Self-reported personal account; cited only as the subject's own description, not as clinical evidence.",
});
const wipPost = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Pieter Levels: did you know your name is Pieter Mouthaan?",
  url: "https://wip.co/posts/pieter-levels-did-you-know-your-name-is-pieter-mouthaan",
  publisher: "wip.co",
  notes:
    "The subject's own statement that 'Levels' is an alias and his legal surname is Mouthaan-Van de Ven.",
});

// Official project sites -----------------------------------------------------

const nomadsCom = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Nomads.com — the #1 community for remote workers",
  url: "https://nomads.com/",
  publisher: "Nomads.com",
});
const nomadsFaq = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "How did Nomads.com get started?",
  url: "https://nomads.com/faq/how-did-nomadscom-get-started-1007038",
  publisher: "Nomads.com",
});
const readMake = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "MAKE: Bootstrapper's Handbook",
  url: "https://readmake.com/",
  publisher: "readmake.com",
  notes: "Self-reported sales counter (~31,970 copies / ~$947,566) is unaudited.",
});
const pandaMixShow = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — Panda Mix Show",
  url: "https://www.pandamixshow.com/about/",
  publisher: "Panda Mix Show",
});
const interiorAiFaq = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Interior AI — FAQ",
  url: "https://interiorai.com/faq",
  publisher: "interiorai.com",
});
const remoteOkSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Remote OK — remote jobs in programming, design, sales and more",
  url: "https://remoteok.com/",
  publisher: "remoteok.com",
});
const thisHouse = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "This House Does Not Exist",
  url: "https://thishousedoesnotexist.org/",
  publisher: "thishousedoesnotexist.org",
});
const rebase = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Rebase — immigrate to Portugal",
  url: "https://rebase.co/portugal",
  publisher: "rebase.co",
  notes:
    "Linked from his podcasts and profiles; page returned 403 to the research fetcher.",
});

// Profiles -------------------------------------------------------------------

const xProfile = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Pieter Levels (@levelsio) on X",
  url: "https://x.com/levelsio",
  publisher: "X",
});

// Reporting ------------------------------------------------------------------

const wired = source({
  binding: "reporting",
  mediaType: "article",
  title: "This guy is launching 12 startups in 12 months",
  url: "https://www.wired.com/2014/08/12-startups-in-12-months/",
  publisher: "WIRED",
  publishedAt: "2014-08-27",
});
const guardian = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Digital nomads travel the world while you rot in your office",
  url: "http://www.theguardian.com/cities/2015/jun/16/digital-nomads-travel-world-search-fast-wi-fi",
  publisher: "The Guardian",
  publishedAt: "2015-06-16",
});
const nos = source({
  binding: "reporting",
  mediaType: "article",
  title: "Laptopje open en gaan: werken als digitale nomade",
  url: "https://nos.nl/op3/artikel/2036449-laptopje-open-en-gaan-werken-als-digitale-nomade",
  publisher: "NOS op3",
  publishedAt: "2015-05-19",
  language: "nl",
});
const quartz = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Nomad List founder Pieter Levels explains why he has quit the nomadic lifestyle",
  url: "https://qz.com/775751/digital-nomad-problems-nomadlist-and-remoteok-founder-pieter-levels-explains-why-he-has-quit-the-nomadic-lifestyle",
  publisher: "Quartz",
  publishedAt: "2016",
});
const bbc = source({
  binding: "reporting",
  mediaType: "article",
  title: "The people who pay $27,000 to work abroad",
  url: "https://www.bbc.com/worklife/article/20161110-the-people-who-pay-27000-to-work-abroad",
  publisher: "BBC Worklife",
  publishedAt: "2016-11-10",
});
const tnw = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "This chatbot uses machine learning to find your next digital nomad adventure",
  url: "https://thenextweb.com/news/this-chatbot-uses-machine-learning-to-find-your-next-digital-nomad-adventure",
  publisher: "The Next Web",
  publishedAt: "2016-07",
});
const archdailyHoodmaps = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Where are the hipsters in your city? These crowdsourced maps will show you",
  url: "https://www.archdaily.com/875863/where-are-the-hipsters-in-your-city-these-crowdsourced-maps-will-show-you",
  publisher: "ArchDaily",
  publishedAt: "2017-07-18",
});
const bloomberg = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hoodmaps wants to stereotype your neighborhood",
  url: "https://www.bloomberg.com/news/articles/2017-08-30/hoodmaps-wants-to-stereotype-your-neighborhood",
  publisher: "Bloomberg",
  publishedAt: "2017-08-30",
});
const curbedSf = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Crowdsourced map tags SF neighborhoods by hipsters, tourists, and the rich",
  url: "https://sf.curbed.com/2017/8/31/16235960/sf-neighborhood-stereotypes-map-hipster",
  publisher: "Curbed SF",
  publishedAt: "2017-08-31",
});
const quotenet = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Dit zijn de interessantste startuptips van 'digital nomad' Pieter Levels",
  url: "https://www.quotenet.nl/zakelijk/a212348/dit-zijn-de-interessantste-startuptips-van-digital-nomad-pieter-levels-212348/",
  publisher: "Quote",
  publishedAt: "2018-03-15",
  language: "nl",
  notes:
    "Reports he was 'born as Hooghoudt' — conflicting with his own account — and notes his revenue claims cannot be checked in his Dutch entity's books.",
});
const fourOhFour = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "The mysterious indie hacker who made $46,000/month from 'vibe coding'",
  url: "https://www.404media.co/the-mysterious-indie-hacker-who-made-46-000-month-from-vibe-coding/",
  publisher: "404 Media",
  publishedAt: "2025-03-05",
});
const bi = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "A digital nomad who made $3 million says the lifestyle isn't all it's cracked up to be",
  url: "https://www.businessinsider.com/digital-nomad-pieter-levels-comments-depression-success-2024-8",
  publisher: "Business Insider",
  publishedAt: "2024-08-28",
});
const ihCaseStudy = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Photo AI by Pieter Levels — complete deep-dive case study: $0 to $132k MRR in 18 months",
  url: "https://www.indiehackers.com/post/photo-ai-by-pieter-levels-complete-deep-dive-case-study-0-to-132k-mrr-in-18-months-3a9a2b1579",
  publisher: "Indie Hackers (community post)",
  notes:
    "Third-party case study; revenue figures trace back to the subject's own posts.",
});
const nextSmallThings = source({
  binding: "reporting",
  mediaType: "article",
  title: "Pieter Levels is leveling up again",
  url: "https://www.nextsmallthings.com/p/pieter-levels-is-leveling-up-again",
  publisher: "Next Small Things",
  publishedAt: "2022-10",
});
const smartBranding = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Nomad List rebrands to Nomads.com, representing millions of digital nomads worldwide",
  url: "https://smartbranding.com/nomad-list-rebrands-to-nomads-com-representing-millions-of-digital-nomads-worldwide/",
  publisher: "Smart Branding",
});
const archdailyThde = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "This House Does Not Exist uses AI to generate ArchDaily-style images of modern architecture",
  url: "https://www.archdaily.com/988606/this-house-does-not-exist-uses-ai-to-generate-archdaily-style-images-of-modern-architecture",
  publisher: "ArchDaily",
  publishedAt: "2022",
});

// Reference, primary records, and archives -----------------------------------

const huntedSpace = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Remote OK — Product Hunt launch dashboard",
  url: "https://hunted.space/dashboard/remote-ok",
  publisher: "hunted.space",
  notes: "Records Remote OK featured on Product Hunt on February 22, 2015.",
});
const phRemoteOk = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Remote OK on Product Hunt",
  url: "https://www.producthunt.com/p/remotejobs/remote-ok",
  publisher: "Product Hunt",
});
const phHoodmaps = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Hoodmaps on Product Hunt",
  url: "https://www.producthunt.com/p/hoodmaps/hoodmaps",
  publisher: "Product Hunt",
});
const phMake = source({
  binding: "reference",
  mediaType: "webpage",
  title: "MAKE book on Product Hunt",
  url: "https://www.producthunt.com/posts/make-book",
  publisher: "Product Hunt",
  publishedAt: "2018-03-12",
});
const hnNomadList = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Nomad List — Hacker News launch thread",
  url: "https://news.ycombinator.com/item?id=8107222",
  publisher: "Hacker News",
  publishedAt: "2014-08",
});
const hnInteriorAi = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Show HN: Interior AI",
  url: "https://news.ycombinator.com/item?id=33060777",
  publisher: "Hacker News",
  publishedAt: "2022-10-03",
});
const wikipediaPanda = source({
  binding: "reference",
  mediaType: "article",
  title: "Panda (musician)",
  url: "https://en.wikipedia.org/wiki/Panda_(musician)",
  publisher: "Wikipedia",
  notes:
    "Article about his drum & bass persona 'Panda'; identity is corroborated by Quote linking his birth name to this article and by pandamixshow.com. Carries citation-needed tags; used for discovery.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Pieter Levels (Q140235734)",
  url: "https://www.wikidata.org/wiki/Q140235734",
  publisher: "Wikidata",
});
const startupswiki = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Pieter Levels — Startups Wiki",
  url: "https://startupswiki.com/index.php/Pieter_Levels",
  publisher: "Startups Wiki",
  notes:
    "Aggregator asserting a July 11, 1987 birth date; unverified and inconsistent with other sources.",
});
const waybackNomadlist = source({
  binding: "archive",
  mediaType: "webpage",
  title: "nomadlist.io — Wayback Machine capture (September 18, 2014)",
  url: "https://web.archive.org/web/20140918041539/http://www.nomadlist.io/",
  publisher: "Internet Archive Wayback Machine",
  publishedAt: "2014-09-18",
});
const wayback12Startups = source({
  binding: "archive",
  mediaType: "webpage",
  title:
    "levels.io/12-startups-12-months — Wayback Machine capture (July 1, 2014)",
  url: "https://web.archive.org/web/20140701045857/http://levels.io/12-startups-12-months",
  publisher: "Internet Archive Wayback Machine",
  publishedAt: "2014-07-01",
});
const unrollThread = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Thread: After a decade, I have made Nomads.com free for everyone",
  url: "https://unrollnow.com/status/2096177854270550097",
  publisher: "unrollnow (X thread rehost)",
  publishedAt: "2026-09-05",
  notes:
    "Third-party capture of his X thread announcing free membership (43,252 paid members reported).",
});

const S = {
  blogHome: blogHome.id,
  projects: projects.id,
  resetYourLife: resetYourLife.id,
  twelveStartups: twelveStartups.id,
  phHnNumberOne: phHnNumberOne.id,
  remoteJobsBoard: remoteJobsBoard.id,
  remoteOkPost: remoteOkPost.id,
  nomadListFounder: nomadListFounder.id,
  hoodmapsPost: hoodmapsPost.id,
  startupsTalk: startupsTalk.id,
  makerOfTheYear: makerOfTheYear.id,
  makePhPost: makePhPost.id,
  fourYears1m: fourYears1m.id,
  nomadList5: nomadList5.id,
  greatestMigration: greatestMigration.id,
  interiorAiPost: interiorAiPost.id,
  avatarAiPost: avatarAiPost.id,
  sold100kPost: sold100kPost.id,
  photoAiPost: photoAiPost.id,
  networkStatesPost: networkStatesPost.id,
  lexTranscriptPost: lexTranscriptPost.id,
  flyPost: flyPost.id,
  cheekyPintTranscript: cheekyPintTranscript.id,
  indieHackers1Post: indieHackers1Post.id,
  indieHackers2Post: indieHackers2Post.id,
  mfmPost: mfmPost.id,
  wannabePost: wannabePost.id,
  productHuntRadioPost: productHuntRadioPost.id,
  anxietyPost: anxietyPost.id,
  wipPost: wipPost.id,
  nomadsCom: nomadsCom.id,
  nomadsFaq: nomadsFaq.id,
  readMake: readMake.id,
  pandaMixShow: pandaMixShow.id,
  interiorAiFaq: interiorAiFaq.id,
  remoteOkSite: remoteOkSite.id,
  thisHouse: thisHouse.id,
  rebase: rebase.id,
  xProfile: xProfile.id,
  lexPage: lexPage.id,
  lexYoutube: lexYoutube.id,
  mfmEpisode: mfmEpisode.id,
  ih43: ih43.id,
  ih241: ih241.id,
  ih242: ih242.id,
  cheekyPint: cheekyPint.id,
  wired: wired.id,
  guardian: guardian.id,
  nos: nos.id,
  quartz: quartz.id,
  bbc: bbc.id,
  tnw: tnw.id,
  archdailyHoodmaps: archdailyHoodmaps.id,
  bloomberg: bloomberg.id,
  curbedSf: curbedSf.id,
  quotenet: quotenet.id,
  fourOhFour: fourOhFour.id,
  bi: bi.id,
  ihCaseStudy: ihCaseStudy.id,
  nextSmallThings: nextSmallThings.id,
  smartBranding: smartBranding.id,
  archdailyThde: archdailyThde.id,
  huntedSpace: huntedSpace.id,
  phRemoteOk: phRemoteOk.id,
  phHoodmaps: phHoodmaps.id,
  phMake: phMake.id,
  hnNomadList: hnNomadList.id,
  hnInteriorAi: hnInteriorAi.id,
  wikipediaPanda: wikipediaPanda.id,
  wikidata: wikidata.id,
  startupswiki: startupswiki.id,
  waybackNomadlist: waybackNomadlist.id,
  wayback12Startups: wayback12Startups.id,
  unrollThread: unrollThread.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-pieter-levels",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "pieter-levels",
    displayName: "Pieter Levels",
    alsoKnownAs: ["levelsio", "Panda", "Peet", "Pieter Mouthaan"],
    summary:
      "Dutch self-taught developer and entrepreneur known for bootstrapped solo web businesses — Nomads.com (formerly Nomad List), Remote OK, Photo AI, Interior AI, Hoodmaps — built in public and documented on his levels.io blog and as @levelsio on X.",
    identity: {
      wikidataId: "Q140235734",
      officialSite: "https://levels.io/",
      profiles: ["https://x.com/levelsio"],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: [
      "biography",
      "work",
      "projects",
      "philosophy",
      "beliefs",
      "media",
    ],
  },
  sources: [
    lexPage,
    lexYoutube,
    mfmEpisode,
    ih43,
    ih241,
    ih242,
    cheekyPint,
    blogHome,
    projects,
    resetYourLife,
    twelveStartups,
    phHnNumberOne,
    remoteJobsBoard,
    remoteOkPost,
    nomadListFounder,
    hoodmapsPost,
    indieHackers1Post,
    startupsTalk,
    makerOfTheYear,
    makePhPost,
    fourYears1m,
    nomadList5,
    greatestMigration,
    indieHackers2Post,
    mfmPost,
    interiorAiPost,
    avatarAiPost,
    sold100kPost,
    photoAiPost,
    networkStatesPost,
    lexTranscriptPost,
    flyPost,
    cheekyPintTranscript,
    wannabePost,
    productHuntRadioPost,
    anxietyPost,
    wipPost,
    nomadsCom,
    nomadsFaq,
    readMake,
    pandaMixShow,
    interiorAiFaq,
    remoteOkSite,
    thisHouse,
    rebase,
    xProfile,
    wired,
    guardian,
    nos,
    quartz,
    bbc,
    tnw,
    archdailyHoodmaps,
    bloomberg,
    curbedSf,
    quotenet,
    fourOhFour,
    bi,
    ihCaseStudy,
    nextSmallThings,
    smartBranding,
    archdailyThde,
    huntedSpace,
    phRemoteOk,
    phHoodmaps,
    phMake,
    hnNomadList,
    hnInteriorAi,
    wikipediaPanda,
    wikidata,
    startupswiki,
    waybackNomadlist,
    wayback12Startups,
    unrollThread,
  ],
  claims: [
    {
      id: "claim-dutch-indie-founder",
      kind: "fact",
      text: "Pieter Levels is a Dutch self-taught developer and entrepreneur whose best-known products are Nomads.com (formerly Nomad List), Remote OK, Photo AI, Interior AI, and Hoodmaps; he documents the work on his levels.io blog and posts as @levelsio on X.",
      sourceIds: [S.blogHome, S.projects, S.wikidata, S.interiorAiFaq],
    },
    {
      id: "claim-born-nijmegen",
      kind: "fact",
      text: "He was born in Nijmegen, the Netherlands. The Wikipedia article about his drum-and-bass persona 'Panda' categorizes him among 1986 births, WIRED described him as 28 in August 2014, and he described himself as 26 in early 2013 — consistent with a 1986-87 birth year; one aggregator claims July 11, 1987, but the exact date is not settled by primary records.",
      sourceIds: [S.wikipediaPanda, S.wired, S.resetYourLife, S.startupswiki],
    },
    {
      id: "claim-levels-alias",
      kind: "fact",
      text: "'Pieter Levels' is a public alias. He states his legal name is Pieter Mouthaan-Van de Ven, while Dutch magazine Quote wrote in 2018 that he was 'born as Hooghoudt'; the discrepancy is unresolved in the public record.",
      sourceIds: [S.wipPost, S.quotenet],
    },
    {
      id: "claim-education",
      kind: "fact",
      text: "His projects page lists a propedeuse at Hogeschool Utrecht (dropped out), a BSc in Business Administration at VU Amsterdam with an exchange semester at Korea University Business School, and an MSc in Business Administration at Rotterdam School of Management, Erasmus University; WIRED reported he graduated in 2012, and his blog archives a master's thesis on how technology changed the music industry.",
      sourceIds: [S.projects, S.wired, S.blogHome],
    },
    {
      id: "claim-panda-mix-show",
      kind: "fact",
      text: "Before startups he worked in drum and bass as producer and DJ 'Panda' (earlier 'Peet'), releasing the album Retake Manhattan in 2008 with BBC Radio 1/1Xtra airplay, and in 2009 launched the Panda Mix Show YouTube network; its site claims over 300,000 subscribers and 100 million views, and he told John Collison it grew to about $8,000 per month while he was at university.",
      sourceIds: [
        S.wikipediaPanda,
        S.pandaMixShow,
        S.cheekyPintTranscript,
        S.nos,
      ],
    },
    {
      id: "claim-sold-stuff-2013",
      kind: "fact",
      text: "In April 2013 he sold most of his possessions (about $3,000 on eBay, by his account), bought a MacBook, and flew one-way from Amsterdam to Bangkok to work from a laptop; he wrote that he was 26 at the time and had been experiencing panic attacks and depression through the Dutch winter — a self-reported account, not a clinical record.",
      sourceIds: [S.resetYourLife, S.wired, S.nos],
    },
    {
      id: "claim-12-startups",
      kind: "fact",
      text: "On March 1, 2014 he announced a '12 startups in 12 months' challenge inspired by Jennifer Dewalt's 180-websites project; his own progress list shows eight shipped projects including Play My Inbox, Go Fucking Do It, Tubelytics, Nomad List, and Nomad Jobs.",
      sourceIds: [S.twelveStartups, S.wired, S.wayback12Startups],
    },
    {
      id: "claim-nomadlist-spreadsheet",
      kind: "fact",
      text: "On June 24, 2014 he tweeted an editable Google spreadsheet of nomad-friendly cities that crowdsourced data for about 75 cities; he turned it into nomadlist.io, which went live July 29, 2014 — earlier than planned due to an nginx misconfiguration — and then reached #1 on both Product Hunt and Hacker News, earning revenue on day one through an Automattic sponsorship.",
      sourceIds: [S.phHnNumberOne, S.hnNomadList, S.waybackNomadlist],
    },
    {
      id: "claim-nomadlist-ordinal",
      kind: "fact",
      text: "Sources disagree on where Nomad List fell in the challenge: his August 2014 post calls it his '4th startup' of the series, while his later founder page calls it roughly 'the 7th startup I tried.'",
      sourceIds: [S.phHnNumberOne, S.nomadListFounder],
    },
    {
      id: "claim-remote-ok-launch",
      kind: "fact",
      text: "Remote OK launched on Product Hunt on Sunday, February 22, 2015, reached #1 Product of the Day, and aggregates remote job listings scraped via RSS and JSON feeds into SQLite; it grew out of Nomad Jobs, the jobs board he had built inside Nomad List in August 2014.",
      sourceIds: [
        S.remoteOkPost,
        S.remoteJobsBoard,
        S.huntedSpace,
        S.phRemoteOk,
        S.nomadsFaq,
      ],
    },
    {
      id: "claim-golden-kitty",
      kind: "fact",
      text: "He won Product Hunt's Golden Kitty 'Maker of the Year' for 2015 (per Indie Hackers' Courtland Allen) and again for 2017 together with 'Side Project of the Year,' per his own announcement; his book site bills him as a two-time Maker of the Year.",
      sourceIds: [S.makerOfTheYear, S.indieHackers1Post, S.readMake],
    },
    {
      id: "claim-hoodmaps",
      kind: "fact",
      text: "He built Hoodmaps live on Twitch beginning March 31, 2017 and launched it in July 2017 as a crowdsourced neighborhood map with categories such as hipsters, tourists, rich, normies, suits, and university students; he wrote that it reached Reddit's front page with about 300,000 users, Bloomberg reported coverage of more than 2,000 cities by August 2017, and coverage noted criticism of the stereotype labels.",
      sourceIds: [
        S.hoodmapsPost,
        S.bloomberg,
        S.curbedSf,
        S.archdailyHoodmaps,
        S.phHoodmaps,
      ],
    },
    {
      id: "claim-make-book",
      kind: "fact",
      text: "MAKE, a roughly 200-page self-published ebook on bootstrapping that he describes as partly crowdsourced from readers, launched on Product Hunt on March 12, 2018 after about 2.5 years of writing; readmake.com self-reports about 31,970 copies and about $947,566 sold, and the book was later retitled 'MAKE: The Indie Maker Blueprint.'",
      sourceIds: [S.makePhPost, S.readMake, S.quotenet, S.phMake],
    },
    {
      id: "claim-four-years-1m",
      kind: "fact",
      text: "In May 2019 he reported crossing $1 million in annual revenue across Nomad List and Remote OK — four years after starting — citing 11,996 customers, about 740 payments per month, 208 cron jobs, a single VPS, zero ad budget, and zero funding; the figures are self-reported.",
      sourceIds: [S.fourYears1m],
    },
    {
      id: "claim-nomadlist5",
      kind: "fact",
      text: "Nomad List 5 launched July 29, 2019 — exactly five years after version one — adding meetups, trips, and dating; his founder page reports revenue in the $20k-40k per month range (about $300k per year) in that era.",
      sourceIds: [S.nomadList5, S.nomadListFounder],
    },
    {
      id: "claim-quit-nomad-2016",
      kind: "fact",
      text: "In 2016 he told Quartz he had quit the nomadic lifestyle after loneliness and a lost sense of identity — his account as reported — but he resumed traveling, returned to the Netherlands during COVID, and by 2022 said he was living in Portugal.",
      sourceIds: [S.quartz, S.indieHackers2Post, S.wannabePost],
    },
    {
      id: "claim-nomad-visa",
      kind: "fact",
      text: "In a 2015 NOS feature he proposed a 'nomad visa' that would let location-independent workers pay tax wherever they currently are — predating the national digital-nomad visa programs several countries later introduced.",
      sourceIds: [S.nos],
    },
    {
      id: "claim-taylor-bot",
      kind: "fact",
      text: "In July 2016 he built 'Taylor,' a chatbot for Telegram and Slack that recommended where to live and work next — an early conversational interface on top of his city data, reported by The Next Web.",
      sourceIds: [S.tnw],
    },
    {
      id: "claim-interior-ai",
      kind: "fact",
      text: "Interior AI was built in five days and launched in early October 2022 with a Show HN on October 3, letting users upload room photos for AI-generated redesigns; he reported about $7k per month within weeks in posts relayed by third-party write-ups.",
      sourceIds: [
        S.interiorAiPost,
        S.hnInteriorAi,
        S.interiorAiFaq,
        S.nextSmallThings,
      ],
    },
    {
      id: "claim-avatar-ai",
      kind: "fact",
      text: "Avatar AI launched October 28, 2022 as a paid MVP for AI-generated avatars; he reported $100,000 in sales in its first ten days and later asserted that Lensa AI copied the concept weeks afterward — the sales figure is self-reported and the copying claim is his account.",
      sourceIds: [S.avatarAiPost, S.sold100kPost, S.ihCaseStudy],
    },
    {
      id: "claim-photo-ai",
      kind: "fact",
      text: "Photo AI launched February 10, 2023 as an 'AI photographer' that trains a model on uploaded photos to generate synthetic photo shoots; an Indie Hackers case study cites growth to about $132k MRR in 18 months and John Collison stated Photo AI reached roughly $600k ARR — figures ultimately sourced to the subject's self-published metrics.",
      sourceIds: [S.photoAiPost, S.ihCaseStudy, S.cheekyPintTranscript],
    },
    {
      id: "claim-this-house",
      kind: "fact",
      text: "In late 2022 he launched This House Does Not Exist, which generates modern-architecture house images with ArchDaily-style descriptive text.",
      sourceIds: [S.thisHouse, S.archdailyThde],
    },
    {
      id: "claim-fly-pieter",
      kind: "fact",
      text: "On February 22, 2025 he live-built fly.pieter.com, a browser flight simulator 'vibe-coded' mostly with AI assistants and Three.js; Elon Musk shared it, he reported $1 million ARR within 17 days, and 404 Media reported it was then making about $50k per month — again self-reported figures.",
      sourceIds: [S.flyPost, S.fourOhFour],
    },
    {
      id: "claim-rebase",
      kind: "fact",
      text: "He built Rebase, an 'immigration-as-a-service' product for relocating to Portugal and other countries; it is referenced on his projects list and in the My First Million transcript.",
      sourceIds: [S.projects, S.mfmPost, S.rebase],
    },
    {
      id: "claim-revenue-figures",
      kind: "fact",
      text: "Published revenue figures over time, all self-reported: about $500-700 per month in early 2014 (Bali talk transcript); Nomad List about $15-25k/mo and Remote OK about $5-10k/mo in 2018; $1M per year combined by mid-2019; a $2.7M-per-year meter on his X profile noted by My First Million in July 2022; and 'Pieter Levels enterprises' at about $3.1M per year per John Collison in July 2025 (Nomad List $700k ARR, Remote OK $3.4M cumulative, Photo AI $600k ARR).",
      sourceIds: [
        S.startupsTalk,
        S.indieHackers2Post,
        S.fourYears1m,
        S.mfmPost,
        S.cheekyPintTranscript,
      ],
    },
    {
      id: "claim-70-projects",
      kind: "fact",
      text: "He reports having shipped more than 70 projects with only about four to six becoming profitable — a roughly five-percent hit rate; Lex Fridman's introduction says 'over 40 startups,' and the counts differ because he includes small experiments.",
      sourceIds: [S.indieHackers2Post, S.cheekyPintTranscript, S.lexPage],
    },
    {
      id: "claim-no-vc",
      kind: "fact",
      text: "He has never raised venture capital for his products; he told John Collison that 'a lot of VCs have been in my DMs' but he stays independent, and told My First Million he declined acquisition offers because typical three-to-five-times-revenue multiples undervalue the cash flow.",
      sourceIds: [S.cheekyPintTranscript, S.mfmPost, S.startupsTalk],
    },
    {
      id: "claim-nomads-rebrand",
      kind: "fact",
      text: "Nomad List rebranded to Nomads.com in 2024, keeping the same product and community while acquiring a top-tier dictionary domain.",
      sourceIds: [S.smartBranding, S.nomadsCom, S.networkStatesPost],
    },
    {
      id: "claim-nomads-free",
      kind: "fact",
      text: "In September 2026 he made Nomads.com membership nearly free ($1 signup to deter spam), reporting 43,252 paid members — about 300 per month over roughly twelve years — and arguing communities will matter more 'post-AGI'; he proposes sponsors rather than subscriptions as the model.",
      sourceIds: [S.unrollThread, S.blogHome],
    },
    {
      id: "claim-press-2014",
      kind: "fact",
      text: "The 2014-15 launch wave drew coverage from WIRED, The Guardian, and Dutch broadcaster NOS; his own launch post also lists Forbes, Business Insider, Inc, The Next Web, and Lifehacker, plus shares by Tim Ferriss, Matt Mullenweg, and Joel Gascoigne.",
      sourceIds: [S.phHnNumberOne, S.wired, S.guardian, S.nos],
    },
    {
      id: "claim-belief-ship-fast",
      kind: "stated_belief",
      text: "He argues the real problem for creatives is finishing — perfectionism and fear of criticism — and that time-boxed shipping (one project a month) is the fix.",
      sourceIds: [S.twelveStartups],
    },
    {
      id: "claim-belief-startup-definition",
      kind: "stated_belief",
      text: "He defines a startup loosely as anything that 'delivers a new product and grows it fast,' treating MVPs as hypothesis tests rather than company launches.",
      sourceIds: [S.twelveStartups],
    },
    {
      id: "claim-belief-bootstrapping",
      kind: "stated_belief",
      text: "He prefers bootstrapping to venture capital and dislikes burn without traction — 'validate first and build a business first,' he told John Collison.",
      sourceIds: [S.startupsTalk, S.cheekyPintTranscript],
    },
    {
      id: "claim-belief-own-problems",
      kind: "stated_belief",
      text: "He builds from his own annoyances — 'you're the expert at your own problems' — rather than chasing abstract market opportunities.",
      sourceIds: [S.startupsTalk, S.hoodmapsPost],
    },
    {
      id: "claim-belief-framework",
      kind: "stated_belief",
      text: "His stated product loop is idea, build, launch, grow, monetize, automate — automating with 'robots' whatever begins to bore him.",
      sourceIds: [S.startupsTalk, S.quotenet],
    },
    {
      id: "claim-belief-remote-work",
      kind: "stated_belief",
      text: "He frames remote work as 'the greatest migration' and offices as legacy infrastructure, having predicted one billion digital nomads by 2035 — a prediction The Economist relayed in 2019.",
      sourceIds: [S.greatestMigration],
    },
    {
      id: "claim-belief-nomad-loneliness",
      kind: "stated_belief",
      text: "He says constant nomadism is lonely — that travel self-medicated rather than cured his anxiety and that he eventually needed intimacy and a home base; this is his self-description, not a diagnosis.",
      sourceIds: [S.quartz, S.anxietyPost, S.startupsTalk],
    },
    {
      id: "claim-belief-media-skepticism",
      kind: "stated_belief",
      text: "He distrusts conventional interviews because journalists 'rewrite the entire thing you said,' preferring channels where he controls the words — while still returning for select long-form podcasts.",
      sourceIds: [S.indieHackers1Post],
    },
    {
      id: "claim-belief-keep-alive",
      kind: "stated_belief",
      text: "He keeps old projects running on his servers because 'URLs shouldn't break' — preserving internet history rather than shutting products down.",
      sourceIds: [S.cheekyPintTranscript],
    },
    {
      id: "claim-belief-network-state",
      kind: "stated_belief",
      text: "He argues Nomads.com is 'one of the first network states' — a global community with physical hubs that could eventually acquire territory.",
      sourceIds: [S.networkStatesPost],
    },
    {
      id: "claim-belief-ai-shift",
      kind: "stated_belief",
      text: "He treats AI-assisted 'vibe coding' as a real shift — building a viral flight simulator in days — and has mused that indie hackers may be among the first developers disrupted by AI lowering the cost of execution.",
      sourceIds: [S.flyPost, S.blogHome, S.fourOhFour],
    },
    {
      id: "claim-belief-charge-money",
      kind: "stated_belief",
      text: "He insists indie makers should charge for their work — 'I'm like a corner store, and I charge for these sandwiches' — and not apologize for paid products.",
      sourceIds: [S.indieHackers1Post, S.mfmPost],
    },
    {
      id: "claim-belief-money-freedom",
      kind: "stated_belief",
      text: "He holds that money should buy freedom from employment, not luxury goods — per his own post title, 'not Bentley cars and Rolex watches.'",
      sourceIds: [S.blogHome],
    },
    {
      id: "claim-pattern-build-in-public",
      kind: "pattern",
      text: "Across a decade he repeatedly built in public — livestreaming Hoodmaps on Twitch, live-posting fly.pieter.com on X, and keeping open revenue dashboards — converting process into distribution.",
      sourceIds: [S.hoodmapsPost, S.flyPost, S.mfmPost],
    },
    {
      id: "claim-pattern-shotgun",
      kind: "pattern",
      text: "He runs a shotgun portfolio — many small launches, few hits, near-zero marginal cost to keep each alive — with his oldest code still earning.",
      sourceIds: [S.indieHackers2Post, S.cheekyPintTranscript, S.blogHome],
    },
    {
      id: "claim-pattern-open-metrics",
      kind: "pattern",
      text: "He consistently self-publishes revenue, traffic, and member counts — a transparency practice that doubles as marketing; none of it is audited.",
      sourceIds: [S.readMake, S.mfmPost, S.cheekyPintTranscript, S.fourYears1m],
    },
    {
      id: "claim-pattern-minimal-stack",
      kind: "pattern",
      text: "He sticks to a deliberately boring solo stack — vanilla HTML and JS, jQuery-era front ends, PHP, SQLite, one VPS — and his own post index describes Photo AI as a single roughly 40,870-line index file making about $105k per month.",
      sourceIds: [
        S.hoodmapsPost,
        S.blogHome,
        S.fourOhFour,
        S.cheekyPintTranscript,
      ],
    },
    {
      id: "claim-pattern-press-flywheel",
      kind: "pattern",
      text: "Press and launch-site coverage feed an audience that feeds the next launch; he documents the playbook himself and reuses it for each product.",
      sourceIds: [S.phHnNumberOne, S.startupsTalk, S.wired],
    },
    {
      id: "claim-pattern-provocation",
      kind: "pattern",
      text: "Provocation drives reach: he reported one billion X views in twelve months (December 2024), Hoodmaps' stereotype labels drew criticism he largely kept, and backlash — like 'digital nomads are disgusting' graffiti he photographed in Portugal — features in his own posting.",
      sourceIds: [S.blogHome, S.curbedSf],
    },
    {
      id: "claim-spec-fly-durability",
      kind: "speculation",
      text: "fly.pieter.com's reported $1M ARR reflects a viral spike plus ad sales; he later indicated revenue dropped substantially, so the durability of vibe-coded spikes is unproven.",
      sourceIds: [S.flyPost, S.fourOhFour],
    },
    {
      id: "claim-spec-lensa",
      kind: "speculation",
      text: "His claim that Lensa copied Avatar AI is his own account; the timing aligns but independent documentation of copying is not in the cited record.",
      sourceIds: [S.sold100kPost, S.ihCaseStudy],
    },
    {
      id: "claim-spec-revenue-veracity",
      kind: "speculation",
      text: "Because nearly all metrics are self-published, independent verification is impossible — Quote noted in 2018 that his Dutch entity's books show little, joking 'we'll just have to believe him.'",
      sourceIds: [S.quotenet, S.mfmPost],
    },
    {
      id: "claim-spec-hit-rate",
      kind: "speculation",
      text: "The roughly five-percent hit rate undercuts a pure 'ship fast' explanation of his success; he himself assigns luck and privilege '40 or 50 percent' of the outcome, and survivorship likely flatters the method.",
      sourceIds: [S.indieHackers2Post],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1986",
      title: "Born in Nijmegen, the Netherlands",
      summary:
        "Birth name reported variously as Mouthaan-Van de Ven (his own account) and Hooghoudt (Quote); the Wikipedia article on his musician persona files him under 1986 births and the exact date is unsettled.",
      location: "Nijmegen, Netherlands",
      sourceIds: [S.wikipediaPanda, S.wipPost, S.quotenet],
    },
    {
      id: "event-panda-mix-show",
      kind: "project",
      date: "2009",
      title: "Launches the Panda Mix Show on YouTube",
      summary:
        "Drum & bass mix network under his 'Panda' persona; self-reported 300k+ subscribers and 100M+ views, monetized during university.",
      sourceIds: [S.pandaMixShow, S.wikipediaPanda, S.cheekyPintTranscript],
    },
    {
      id: "event-msc-2012",
      kind: "education",
      date: "2012",
      title: "MSc in Business Administration, Rotterdam School of Management",
      summary:
        "Completed his master's at RSM, Erasmus University after a VU Amsterdam bachelor's and a Korea University exchange; thesis on how technology changed the music industry.",
      organization: "Rotterdam School of Management, Erasmus University",
      organizationHandle: "rotterdam-school-of-management-erasmus-university",
      sourceIds: [S.projects, S.wired, S.blogHome],
    },
    {
      id: "event-departure-2013",
      kind: "milestone",
      date: "2013-04",
      title: "Sells his possessions and flies one-way to Bangkok",
      summary:
        "Left Amsterdam to work from a laptop in Asia — the self-described 'reset your life' move that began his nomad period.",
      location: "Bangkok, Thailand",
      sourceIds: [S.resetYourLife, S.wired, S.nos],
    },
    {
      id: "event-12-startups",
      kind: "project",
      date: "2014-03-01",
      title: "Announces '12 startups in 12 months'",
      summary:
        "A public shipping challenge inspired by Jennifer Dewalt; eight projects ultimately appear on his own list.",
      sourceIds: [S.twelveStartups, S.wired, S.wayback12Startups],
    },
    {
      id: "event-nomadlist-launch",
      kind: "project",
      date: "2014-07-29",
      title: "Nomad List goes live; hits #1 on Product Hunt and Hacker News",
      summary:
        "Grew out of a crowdsourced June 2014 cities spreadsheet; accidentally deployed early and monetized from day one.",
      sourceIds: [S.phHnNumberOne, S.hnNomadList, S.waybackNomadlist],
    },
    {
      id: "event-wired-profile",
      kind: "media",
      date: "2014-08-27",
      title: "WIRED profiles the 12-startups challenge",
      summary:
        "First major tech-press profile, covering the challenge, his Thailand base, and early criticism of nomad privilege.",
      sourceIds: [S.wired],
    },
    {
      id: "event-remote-ok",
      kind: "project",
      date: "2015-02-22",
      title: "Remote OK launches as #1 Product of the Day on Product Hunt",
      summary:
        "Remote-jobs aggregator spun out of Nomad Jobs; SQLite-backed scraping into a single job board.",
      sourceIds: [S.remoteOkPost, S.huntedSpace, S.phRemoteOk],
    },
    {
      id: "event-nos-feature",
      kind: "media",
      date: "2015-05-19",
      title: "Dutch NOS op3 feature on working as a digital nomad",
      summary:
        "Mainstream Dutch coverage of his nomad work life, including his 'nomad visa' proposal and the isolation of constant travel.",
      sourceIds: [S.nos],
    },
    {
      id: "event-golden-kitty-2015",
      kind: "award",
      date: "2016-01",
      title: "Wins Product Hunt Maker of the Year (2015 Golden Kitty Awards)",
      summary:
        "Per Courtland Allen's Indie Hackers introduction; his book site later billed him as a two-time Maker of the Year.",
      organization: "Product Hunt",
      organizationHandle: "product-hunt",
      sourceIds: [S.indieHackers1Post, S.readMake],
    },
    {
      id: "event-quit-nomad",
      kind: "media",
      date: "2016",
      title: "Tells Quartz he has quit the nomadic lifestyle",
      summary:
        "Cited loneliness and a lost sense of identity; he later resumed traveling and eventually settled in Portugal.",
      sourceIds: [S.quartz],
    },
    {
      id: "event-hoodmaps",
      kind: "project",
      date: "2017-07",
      title: "Hoodmaps launches after a livestreamed build",
      summary:
        "Crowdsourced neighborhood stereotype map built on Twitch from March 31, 2017; reached Reddit's front page and covered 2,000+ cities within weeks.",
      sourceIds: [S.hoodmapsPost, S.bloomberg, S.archdailyHoodmaps],
    },
    {
      id: "event-golden-kitty-2017",
      kind: "award",
      date: "2018-01-29",
      title:
        "Wins Maker of the Year and Side Project of the Year (2017 Golden Kitty Awards)",
      summary: "His second Maker of the Year title, announced on his blog.",
      organization: "Product Hunt",
      organizationHandle: "product-hunt",
      sourceIds: [S.makerOfTheYear],
    },
    {
      id: "event-make",
      kind: "publication",
      date: "2018-03-12",
      title: "Publishes MAKE on Product Hunt",
      summary:
        "Self-published bootstrapping handbook after about 2.5 years of writing; self-reported sales near $947k over time.",
      sourceIds: [S.makePhPost, S.readMake, S.phMake],
    },
    {
      id: "event-1m-revenue",
      kind: "milestone",
      date: "2019-05",
      title: "Reports $1M annual revenue across Nomad List and Remote OK",
      summary:
        "Four years after the spreadsheet MVP: ~12,000 customers, one VPS, zero funding, zero ad budget — his figures.",
      sourceIds: [S.fourYears1m],
    },
    {
      id: "event-nomadlist5",
      kind: "project",
      date: "2019-07-29",
      title: "Nomad List 5 launches exactly five years after version one",
      summary: "Added meetups, trips, and dating around the paid community core.",
      sourceIds: [S.nomadList5],
    },
    {
      id: "event-portugal",
      kind: "milestone",
      date: "2020",
      end: "2022",
      title: "Returns to Europe during COVID; bases himself in Portugal",
      summary:
        "Spent part of the pandemic at his parents' home in the Netherlands, then relocated to Portugal and later built Rebase around relocation.",
      location: "Portugal",
      sourceIds: [S.indieHackers2Post, S.wannabePost],
    },
    {
      id: "event-interior-ai",
      kind: "project",
      date: "2022-10-03",
      title: "Interior AI launches on Show HN",
      summary:
        "AI interior redesign tool built in five days; part of his 2022 generative-AI pivot.",
      sourceIds: [S.hnInteriorAi, S.interiorAiPost],
    },
    {
      id: "event-avatar-ai",
      kind: "project",
      date: "2022-10-28",
      title: "Avatar AI launches; reports $100k in ten days",
      summary:
        "Paid AI-avatar MVP that he says pivoted into Photo AI; sales figure self-reported.",
      sourceIds: [S.avatarAiPost, S.sold100kPost],
    },
    {
      id: "event-photo-ai",
      kind: "project",
      date: "2023-02-10",
      title: "Photo AI launches",
      summary:
        "Photorealistic AI photo shoots from a model trained on the user's uploads; evolved from Avatar AI.",
      sourceIds: [S.photoAiPost],
    },
    {
      id: "event-lex-440",
      kind: "media",
      date: "2024-08-20",
      title: "Lex Fridman Podcast #440",
      summary:
        "Long-form conversation on programming, viral AI startups, and digital nomad life; his most-listened appearance.",
      sourceIds: [S.lexPage, S.lexYoutube, S.lexTranscriptPost],
    },
    {
      id: "event-nomads-rebrand",
      kind: "milestone",
      date: "2024",
      title: "Nomad List rebrands to Nomads.com",
      summary:
        "Same product and community under a premium domain; covered by branding press.",
      sourceIds: [S.smartBranding, S.nomadsCom],
    },
    {
      id: "event-fly-pieter",
      kind: "project",
      date: "2025-02-22",
      title: "fly.pieter.com vibe-coded flight simulator goes viral",
      summary:
        "Built live on X with AI assistants; Elon Musk shared it; he reported $1M ARR in 17 days.",
      sourceIds: [S.flyPost, S.fourOhFour],
    },
    {
      id: "event-cheeky-pint",
      kind: "media",
      date: "2025-07-09",
      title: "A Cheeky Pint with John Collison",
      summary:
        "Stripe's podcast put his combined enterprises at about $3.1M per year and recapped Nomad List at $700k ARR, Remote OK at $3.4M cumulative, and Photo AI at $600k ARR.",
      sourceIds: [S.cheekyPint, S.cheekyPintTranscript],
    },
    {
      id: "event-nomads-free",
      kind: "milestone",
      date: "2026-09-05",
      title: "Makes Nomads.com free for everyone",
      summary:
        "Dropped the membership price to a $1 anti-spam signup after ~12 years and 43,252 paid members, proposing sponsors over subscriptions.",
      sourceIds: [S.unrollThread, S.blogHome],
    },
  ],
  themes: [
    {
      id: "theme-ship-fast",
      kind: "method",
      status: "stated",
      title: "Ship fast, finish things",
      summary:
        "The 12-startups challenge exists because he believes creatives fail at finishing, not at ideas: time-boxed MVPs, launch before it feels ready, let the market decide.",
      sourceIds: [S.twelveStartups, S.startupsTalk, S.indieHackers2Post],
    },
    {
      id: "theme-build-in-public",
      kind: "practice",
      status: "stated",
      title: "Build in public as distribution",
      summary:
        "Twitch streams, live-posted builds, open revenue dashboards, and an X account that treats process as content — transparency is both ethic and marketing engine.",
      sourceIds: [S.hoodmapsPost, S.flyPost, S.mfmPost, S.blogHome],
    },
    {
      id: "theme-bootstrap-independence",
      kind: "philosophy",
      status: "stated",
      title: "Bootstrap, own everything",
      summary:
        "No venture capital, no board, no employees in the classic sense: he codes, designs, markets, and keeps the companies, arguing VC burn without traction is wasteful and that ownership at $10M/year beats a unicorn lottery ticket.",
      sourceIds: [S.startupsTalk, S.cheekyPintTranscript, S.indieHackers1Post],
    },
    {
      id: "theme-minimal-stack",
      kind: "method",
      status: "stated",
      title: "Boring solo stack",
      summary:
        "Vanilla HTML/JS, jQuery-era front ends, PHP, SQLite, cron jobs, one VPS — he deliberately avoids framework churn so one person can run everything.",
      sourceIds: [
        S.hoodmapsPost,
        S.fourOhFour,
        S.blogHome,
        S.cheekyPintTranscript,
      ],
    },
    {
      id: "theme-automate-everything",
      kind: "method",
      status: "stated",
      title: "Automate or die",
      summary:
        "Once a product works he scripts himself out of it — robots, cron jobs, and outsourced slivers managed by software — so the portfolio runs mostly unattended.",
      sourceIds: [S.startupsTalk, S.quotenet, S.fourYears1m],
    },
    {
      id: "theme-remote-work-migration",
      kind: "belief",
      status: "stated",
      title: "Remote work as the greatest migration",
      summary:
        "Offices are legacy; location-independent work will keep growing — he predicted a billion digital nomads by 2035 and built businesses for exactly that population.",
      sourceIds: [S.greatestMigration, S.remoteOkPost, S.nos],
    },
    {
      id: "theme-nomad-shadow",
      kind: "belief",
      status: "stated",
      title: "The nomad life has a shadow",
      summary:
        "He publicly reports loneliness, anxiety, and identity loss inside the lifestyle he popularized — travel as self-medication rather than cure — before settling in Portugal.",
      sourceIds: [S.quartz, S.anxietyPost, S.startupsTalk, S.bi],
    },
    {
      id: "theme-network-state",
      kind: "belief",
      status: "stated",
      title: "Community as proto-state",
      summary:
        "He frames Nomads.com as one of the first network states — a mobile community with physical hubs — and has advocated nomad visas and post-AGI community as core infrastructure.",
      sourceIds: [S.networkStatesPost, S.nos, S.unrollThread],
    },
    {
      id: "theme-media-skepticism",
      kind: "practice",
      status: "stated",
      title: "Control your own narrative",
      summary:
        "After feeling misquoted he largely stopped doing interviews, publishing his own transcripts instead — while still choosing occasional long-form appearances like Lex Fridman and My First Million.",
      sourceIds: [S.indieHackers1Post, S.lexTranscriptPost, S.mfmPost],
    },
    {
      id: "theme-nomad-critique",
      kind: "philosophy",
      status: "reported",
      title: "Nomad arbitrage under criticism",
      summary:
        "Press coverage repeatedly flags the politics of digital nomadism — privilege, housing pressure on host cities, and Hoodmaps' stereotype labels — criticism he acknowledges but mostly answers by shipping.",
      sourceIds: [S.wired, S.curbedSf, S.bloomberg, S.guardian],
    },
  ],
  works: [
    {
      id: "work-nomads-com",
      kind: "product",
      status: "ongoing",
      title: "Nomads.com (formerly Nomad List)",
      date: "2014-07",
      summary:
        "Crowdsourced city rankings plus paid nomad community; grew from a public Google spreadsheet into his flagship; rebranded to Nomads.com in 2024 and made nearly free in September 2026.",
      sourceIds: [S.phHnNumberOne, S.nomadsCom, S.nomadsFaq, S.smartBranding],
    },
    {
      id: "work-remote-ok",
      kind: "product",
      status: "ongoing",
      title: "Remote OK",
      date: "2015-02",
      summary:
        "Remote-jobs board aggregated from scraped RSS/JSON feeds; #1 Product of the Day at launch and, by his account, the largest remote job board.",
      sourceIds: [S.remoteOkPost, S.remoteOkSite, S.phRemoteOk],
    },
    {
      id: "work-photo-ai",
      kind: "product",
      status: "ongoing",
      title: "Photo AI",
      date: "2023-02-10",
      summary:
        "AI photographer that trains on uploaded photos for synthetic shoots; evolved from Avatar AI; self-reported ~$600k ARR by mid-2025.",
      sourceIds: [S.photoAiPost, S.ihCaseStudy, S.cheekyPintTranscript],
    },
    {
      id: "work-interior-ai",
      kind: "product",
      status: "ongoing",
      title: "Interior AI",
      date: "2022-10",
      summary:
        "Upload a room photo, get AI redesigns; built in five days in early October 2022.",
      sourceIds: [S.interiorAiPost, S.interiorAiFaq, S.hnInteriorAi],
    },
    {
      id: "work-avatar-ai",
      kind: "product",
      status: "abandoned",
      title: "Avatar AI",
      date: "2022-10-28",
      summary:
        "Paid AI-avatar MVP; self-reported $100k in ten days; superseded by Photo AI.",
      sourceIds: [S.avatarAiPost, S.sold100kPost],
    },
    {
      id: "work-hoodmaps",
      kind: "product",
      status: "ongoing",
      title: "Hoodmaps",
      date: "2017-07",
      summary:
        "Crowdsourced neighborhood maps built live on Twitch; color-coded categories drew both a Reddit front-page moment and criticism.",
      sourceIds: [S.hoodmapsPost, S.phHoodmaps, S.bloomberg],
    },
    {
      id: "work-make",
      kind: "book",
      status: "published",
      title: "MAKE: Bootstrapper's Handbook",
      date: "2018-03-12",
      summary:
        "Self-published ~200-page ebook on building startups without funding, partly crowdsourced from readers; later retitled 'MAKE: The Indie Maker Blueprint.'",
      sourceIds: [S.makePhPost, S.readMake, S.phMake],
    },
    {
      id: "work-fly-pieter",
      kind: "product",
      status: "ongoing",
      title: "fly.pieter.com",
      date: "2025-02-22",
      summary:
        "Browser flight simulator vibe-coded live on X; self-reported $1M ARR in 17 days after Elon Musk shared it.",
      sourceIds: [S.flyPost, S.fourOhFour],
    },
    {
      id: "work-rebase",
      kind: "product",
      status: "ongoing",
      title: "Rebase",
      summary:
        "Immigration-as-a-service for relocating to Portugal and beyond; current activity level unverified.",
      sourceIds: [S.projects, S.rebase, S.mfmPost],
    },
    {
      id: "work-this-house",
      kind: "product",
      status: "ongoing",
      title: "This House Does Not Exist",
      date: "2022",
      summary:
        "Generates modern-architecture house images with ArchDaily-style descriptions; an early generative-AI experiment.",
      sourceIds: [S.thisHouse, S.archdailyThde],
    },
    {
      id: "work-panda-mix-show",
      kind: "project",
      status: "abandoned",
      title: "Panda Mix Show",
      date: "2009",
      summary:
        "YouTube drum & bass mix network under his 'Panda' persona; wound down after he left for Asia in 2013.",
      sourceIds: [S.pandaMixShow, S.wikipediaPanda, S.resetYourLife],
    },
    {
      id: "work-gofuckingdoit",
      kind: "product",
      status: "released",
      title: "Go Fucking Do It",
      date: "2014",
      summary:
        "Goal-setting app that charges your card if a referee says you failed; his first real money-maker of the 12-startups challenge and still running per his Collison interview.",
      sourceIds: [S.twelveStartups, S.startupsTalk, S.cheekyPintTranscript],
    },
    {
      id: "work-play-my-inbox",
      kind: "product",
      status: "released",
      title: "Play My Inbox",
      date: "2014",
      summary:
        "First project of the challenge: turned music links shared over email into playlists.",
      sourceIds: [S.twelveStartups],
    },
    {
      id: "work-tubelytics",
      kind: "product",
      status: "released",
      title: "Tubelytics",
      date: "2014",
      summary:
        "YouTube analytics SaaS built during the challenge; current status unclear.",
      sourceIds: [S.twelveStartups, S.projects],
    },
    {
      id: "work-nomad-jobs",
      kind: "product",
      status: "abandoned",
      title: "Nomad Jobs",
      date: "2014-08",
      summary:
        "Job board inside Nomad List, later spun out and effectively replaced by Remote OK.",
      sourceIds: [S.remoteJobsBoard, S.nomadsFaq, S.remoteOkPost],
    },
    {
      id: "work-hash-nomads",
      kind: "project",
      status: "completed",
      title: "#nomads Slack community",
      date: "2014",
      summary:
        "Paid Slack community for digital nomads; folded into the Nomad List membership.",
      sourceIds: [S.nomadListFounder, S.mfmPost],
    },
    {
      id: "work-taylor-bot",
      kind: "product",
      status: "abandoned",
      title: "Taylor",
      date: "2016-07",
      summary:
        "Telegram/Slack chatbot recommending where to live and work next, built in about a week.",
      sourceIds: [S.tnw],
    },
  ],
  appearances: [
    {
      id: "appearance-lex-440",
      title:
        "Pieter Levels: Programming, Viral AI Startups, and Digital Nomad Life",
      venue: "Lex Fridman Podcast #440",
      publishedAt: "2024-08-20",
      participants: ["Pieter Levels", "Lex Fridman"],
      summary:
        "Multi-hour interview covering his resume, the 12-startups challenge, solo coding, Photo AI, and the costs of nomad life.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=oFtjKbXKqbg",
          sourceId: S.lexYoutube,
        },
        {
          type: "article",
          url: "https://lexfridman.com/pieter-levels/",
          sourceId: S.lexPage,
        },
        {
          type: "transcript",
          url: "https://levels.io/conversation-on-startups-ai-indie-hacking-lex-fridman",
          sourceId: S.lexTranscriptPost,
        },
      ],
      sourceIds: [S.lexPage, S.lexYoutube, S.lexTranscriptPost],
    },
    {
      id: "appearance-mfm-334",
      title: "Pieter Levels: Making $2.7M a Year With No Employees",
      venue: "My First Million (#334)",
      publishedAt: "2022-07-14",
      participants: ["Pieter Levels", "Sam Parr", "Shaan Puri"],
      summary:
        "Business-focused episode on revenue, solopreneurship, open metrics, and why he does not sell.",
      media: [
        {
          type: "article",
          url: "https://www.mfmpod.com/pieter-levels-making-27m-a-year-with-no-employees/",
          sourceId: S.mfmEpisode,
        },
        {
          type: "transcript",
          url: "https://levels.io/my-first-million/",
          sourceId: S.mfmPost,
        },
      ],
      sourceIds: [S.mfmEpisode, S.mfmPost],
    },
    {
      id: "appearance-ih-43",
      title: "Indie Hackers #43 — Confronting fears and taking a leap",
      venue: "Indie Hackers Podcast",
      publishedAt: "2018-01",
      participants: ["Pieter Levels", "Courtland Allen"],
      summary:
        "First Indie Hackers appearance: fear as fuel, building Nomad List, and his no-interviews policy.",
      media: [
        {
          type: "audio",
          url: "https://www.indiehackers.com/podcast/043-pieter-levels-of-nomad-list",
          sourceId: S.ih43,
        },
        {
          type: "transcript",
          url: "https://levels.io/indie-hackers-1",
          sourceId: S.indieHackers1Post,
        },
      ],
      sourceIds: [S.ih43, S.indieHackers1Post],
    },
    {
      id: "appearance-ih-241-242",
      title: "Indie Hackers #241 and #242",
      venue: "Indie Hackers Podcast",
      publishedAt: "2022-01",
      participants: ["Pieter Levels", "Courtland Allen"],
      summary:
        "Two-part return covering post-COVID remote work, money, happiness, productivity, and a ~5% hit rate across 70+ projects.",
      media: [
        {
          type: "audio",
          url: "https://www.indiehackers.com/podcast/241-pieter-levels",
          sourceId: S.ih241,
        },
        {
          type: "audio",
          url: "https://www.indiehackers.com/podcast/242-pieter-levels",
          sourceId: S.ih242,
        },
        {
          type: "transcript",
          url: "https://levels.io/indie-hackers-2",
          sourceId: S.indieHackers2Post,
        },
      ],
      sourceIds: [S.ih241, S.ih242, S.indieHackers2Post],
    },
    {
      id: "appearance-cheeky-pint",
      title: "Pieter Levels on being the most prominent indie hacker",
      venue: "Stripe — A Cheeky Pint",
      publishedAt: "2025-07-09",
      participants: ["Pieter Levels", "John Collison"],
      summary:
        "Beer-and-business chat on running a one-person company at scale, YouTube-era income, VC DMs, and keeping old sites alive.",
      media: [
        {
          type: "audio",
          url: "https://cheekypint.transistor.fm/episodes/pieter-levels-on-being-the-most-prominent-indie-hacker",
          sourceId: S.cheekyPint,
        },
        {
          type: "transcript",
          url: "https://levels.io/stripe-cheeky-pint-john-collison",
          sourceId: S.cheekyPintTranscript,
        },
      ],
      sourceIds: [S.cheekyPint, S.cheekyPintTranscript],
    },
    {
      id: "appearance-ph-radio",
      title: "Product Hunt Radio",
      venue: "Product Hunt",
      participants: ["Pieter Levels", "Abadesi Osunsade"],
      summary:
        "Interview on sustainable bootstrapped business, digital nomad culture, and remote work; preserved via his own transcript.",
      media: [
        {
          type: "transcript",
          url: "https://levels.io/product-hunt-radio/",
          sourceId: S.productHuntRadioPost,
        },
      ],
      sourceIds: [S.productHuntRadioPost],
    },
    {
      id: "appearance-wannabe",
      title: "Wannabe Entrepreneur Podcast",
      venue: "Wannabe Entrepreneur",
      participants: ["Pieter Levels"],
      summary:
        "Long interview on building startups without funding and doing every function himself; preserved via his own transcript.",
      media: [
        {
          type: "transcript",
          url: "https://levels.io/wannabe-entrepreneur",
          sourceId: S.wannabePost,
        },
      ],
      sourceIds: [S.wannabePost],
    },
    {
      id: "appearance-dojo-bali",
      title: "Turning side projects into profitable startups",
      venue: "Dojo coworking, Canggu, Bali",
      publishedAt: "2018-01-24",
      participants: ["Pieter Levels"],
      summary:
        "His own talk transcript laying out the idea-build-launch-grow-monetize-automate framework.",
      media: [
        {
          type: "transcript",
          url: "https://levels.io/startups",
          sourceId: S.startupsTalk,
        },
      ],
      sourceIds: [S.startupsTalk],
    },
    {
      id: "appearance-quartz",
      title: "Why he quit the nomadic lifestyle",
      venue: "Quartz",
      publishedAt: "2016",
      participants: ["Pieter Levels"],
      summary:
        "Reported interview in which he describes quitting constant travel over loneliness and lost identity.",
      media: [
        {
          type: "article",
          url: "https://qz.com/775751/digital-nomad-problems-nomadlist-and-remoteok-founder-pieter-levels-explains-why-he-has-quit-the-nomadic-lifestyle",
          sourceId: S.quartz,
        },
      ],
      sourceIds: [S.quartz],
    },
    {
      id: "appearance-nos",
      title: "Werken als digitale nomade",
      venue: "NOS op3",
      publishedAt: "2015-05-19",
      participants: ["Pieter Levels"],
      summary:
        "Dutch feature on working from a laptop abroad, including his nomad-visa proposal.",
      media: [
        {
          type: "article",
          url: "https://nos.nl/op3/artikel/2036449-laptopje-open-en-gaan-werken-als-digitale-nomade",
          sourceId: S.nos,
        },
      ],
      sourceIds: [S.nos],
    },
  ],
  relations: [
    {
      id: "rel-lex-fridman",
      kind: "interviewed_by",
      target: "lex-fridman",
      targetName: "Lex Fridman",
      note:
        "Lex Fridman Podcast #440, August 2024 — multi-hour interview on his resume, the 12-startups challenge, solo coding, Photo AI, and the costs of nomad life.",
      start: "2024-08",
      targetWikidataId: "Q76448707",
      sourceIds: [S.lexPage, S.lexYoutube, S.lexTranscriptPost],
    },
    {
      id: "rel-sam-parr",
      kind: "interviewed_by",
      target: "sam-parr",
      targetName: "Sam Parr",
      note:
        "My First Million #334, 'Pieter Levels: Making $2.7M a Year With No Employees,' July 2022.",
      start: "2022-07",
      sourceIds: [S.mfmEpisode, S.mfmPost],
    },
    {
      id: "rel-shaan-puri",
      kind: "interviewed_by",
      target: "shaan-puri",
      targetName: "Shaan Puri",
      note:
        "My First Million #334, 'Pieter Levels: Making $2.7M a Year With No Employees,' July 2022.",
      start: "2022-07",
      sourceIds: [S.mfmEpisode, S.mfmPost],
    },
    {
      id: "rel-courtland-allen",
      kind: "interviewed_by",
      target: "courtland-allen",
      targetName: "Courtland Allen",
      note:
        "Indie Hackers Podcast #43 (January 2018) and the two-part #241/#242 (January 2022).",
      start: "2018-01",
      sourceIds: [
        S.ih43,
        S.indieHackers1Post,
        S.ih241,
        S.ih242,
        S.indieHackers2Post,
      ],
    },
    {
      id: "rel-john-collison",
      kind: "interviewed_by",
      target: "john-collison",
      targetName: "John Collison",
      note:
        "Stripe's 'A Cheeky Pint' episode on being the most prominent indie hacker, July 2025.",
      start: "2025-07",
      targetWikidataId: "Q16233063",
      sourceIds: [S.cheekyPint, S.cheekyPintTranscript],
    },
    {
      id: "rel-abadesi-osunsade",
      kind: "interviewed_by",
      target: "abadesi-osunsade",
      targetName: "Abadesi Osunsade",
      note:
        "Product Hunt Radio interview on sustainable bootstrapped business and digital nomad culture.",
      sourceIds: [S.productHuntRadioPost],
    },
  ],
  openQuestions: [
    "Revenue, traffic, and member metrics are self-reported and unaudited; figures conflict across dates (e.g., Nomad List at $2.1M 'last 12 months' in 2022 MFM notes vs $700k ARR in the 2025 Collison interview vs ~$300k/yr on his 2019-era founder page).",
    "His exact birth date is unsettled: an aggregator claims July 11, 1987; the Wikipedia article on his 'Panda' persona lists 1986; he called himself 26 in early 2013.",
    "His legal name is contested: he writes 'Pieter Mouthaan-Van de Ven' while Quote reported he was 'born as Hooghoudt'; the origin of the 'Levels' alias is unexplained.",
    "The '12 startups in 12 months' challenge's own progress list shows eight shipped projects; whether all twelve shipped is unclear.",
    "Project counts conflict: 'over 70 projects' by his own tally versus 'over 40 startups' in Lex Fridman's introduction — a definitional gap, not just a number.",
    "The 'just me' solo claim sits alongside documented collaborators and inputs — Emiel Janson's Product Hunt submission, Andrey Azimov on Applicant AI, Danny Postma as a Photo AI inspiration, plus contractors and automation.",
    "His claim that Lensa copied Avatar AI is his account; no independent documentation of copying is in the cited record.",
    "Whether he is still primarily based in Portugal, and the current operating status of Rebase, is not settled by the sources.",
    "Which older projects remain genuinely maintained versus zombie sites is not fully documented; he says he keeps them running, but several 2014-era products show unclear status.",
    "Whether making Nomads.com nearly free in September 2026 materially changes its revenue — and how the proposed sponsor model performs — is open.",
    "Early pre-2013 history (a merchant account at age ~12, YouTube income up to ~$8k/month, the Panda DJ career) rests mostly on his own retelling.",
    "Whether interview framings (e.g., 'digital nomad pioneer') reflect his current self-description is uncertain; he has repeatedly revised his position on nomadism itself.",
  ],
  body: `Pieter Levels is the closest thing the indie-hacker world has to a folk hero: a Dutch self-taught developer who, by his own account, has shipped more than seventy mostly-solo web products, kept nearly all of them alive on a single server, and turned a handful of hits — Nomads.com, Remote OK, Photo AI, Interior AI — into self-reported revenue of roughly three million dollars a year. Everything about that sentence is contested or self-published, which is part of the story.

## Before the startups

He was born in Nijmegen, the Netherlands — the Wikipedia article on his drum-and-bass persona "Panda" files him under 1986 births — studied business at VU Amsterdam with an exchange semester at Korea University, and finished an MSc at Rotterdam School of Management in 2012 (his projects list; WIRED's 2014 profile). Parallel to school he ran a music career as DJ "Panda," releasing the album *Retake Manhattan* in 2008 and building the Panda Mix Show YouTube network from 2009, which he told John Collison grew to about $8,000 a month — real income, drying up by 2013.

In April 2013, in his telling, he sold his possessions, bought a MacBook, and flew one-way to Bangkok ("Reset your life," levels.io, April 2013). The post describes panic attacks and depression in the Dutch winter; it is a self-report, and this index treats it as one rather than as clinical evidence.

## The method: 2014 and after

The origin myth is "12 startups in 12 months," announced March 1, 2014 as a public fix for perfectionism — ship a project a month, let the market decide (his blog post; WIRED). His own progress list shows eight shipped items, including Go Fucking Do It (a goal app that charges your card if a referee says you failed) and Tubelytics. The seventh-or-fourth item, depending on which of his posts you read, was a crowdsourced Google spreadsheet of cities for nomads, posted June 24, 2014. Turned into nomadlist.io, it hit #1 on Product Hunt and Hacker News the same day, July 29, and earned sponsorship money immediately (his launch post; the Hacker News thread; a September 2014 Wayback capture).

Remote OK followed in February 2015 — a scraped remote-jobs board spun out of Nomad Jobs — then Hoodmaps in July 2017, built live on Twitch, which crowdsources neighborhood stereotypes and drew both a Reddit front-page moment and predictable criticism (Bloomberg, Curbed). MAKE, a partly reader-crowdsourced bootstrapping handbook, launched on Product Hunt in March 2018; readmake.com reports sales approaching $950k.

The AI era he entered via experiments: This House Does Not Exist, Interior AI (built in five days, October 2022), Avatar AI (he reports $100k in ten days), and then Photo AI in February 2023, which an Indie Hackers case study puts at $132k MRR within eighteen months and Collison put at roughly $600k ARR in 2025. In February 2025 he live-built fly.pieter.com, an AI-assisted flight simulator Elon Musk shared; he reported $1M ARR in seventeen days while 404 Media documented roughly $50k a month and named the phenomenon "vibe coding."

## What he says he believes

His stated philosophy is consistent across a decade of transcripts: build from your own annoyances, charge money without apology, automate yourself out, own everything. He calls remote work "the greatest migration" and predicted a billion digital nomads by 2035; he proposed a "nomad visa" to Dutch NOS in 2015, years before such programs existed. But he is equally public about the shadow side — he told Quartz in 2016 that nomadism left him lonely and unmoored, wrote about anxiety directly, and eventually settled in Portugal. He also distrusts conventional media — he largely stopped doing interviews around 2017, he told Courtland Allen, because journalists rewrote his answers — which is why so much of this record is self-published, self-transcribed, and self-measured.

That last point is the epistemic core of this index. Nearly every metric here — $2.7M a year on his 2022 X bio, $3.1M a year in the 2025 Collison interview, $947k of MAKE sales, $1M ARR for a flight sim — traces to his own dashboards and posts. Quote noted in 2018 that his Dutch entity's books show little and chose to "just believe him"; nothing in this packet can do better. His identity itself is layered: "Levels" is an alias — he says the real name is Mouthaan-Van de Ven; Quote says he was born a Hooghoudt. Even the 12-startups challenge is messier than the legend: eight projects on his own list, a disputed ordinal for Nomad List, and a five-percent hit rate he attributes partly to luck.

## What the record does not settle

Unaudited revenue, conflicting project and birth-date tallies, a contested surname, an unverified Lensa-copying claim, and the live question of whether a free Nomads.com changes his business model. The index preserves those seams rather than smoothing them over.

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
