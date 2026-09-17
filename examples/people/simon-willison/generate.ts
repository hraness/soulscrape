#!/usr/bin/env bun
/** Generate examples/people/simon-willison/person-index.json with derived source ids. */

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

const ACCESSED = "2026-09-17T02:00:00Z";

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
  title: "About Simon Willison",
  url: "https://simonwillison.net/about/",
  publisher: "simonwillison.net",
  notes: "The subject's own biography page; career framing is self-reported.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Simon Willison",
  url: "https://en.wikipedia.org/wiki/Simon_Willison",
  publisher: "Wikipedia",
  notes:
    "Short article; carried an articles-for-deletion notice when accessed. Used for discovery and cross-checking, not sole authority.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Simon Willison (Q7520062)",
  url: "https://www.wikidata.org/wiki/Q7520062",
  publisher: "Wikidata",
});
const lanyrdWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Lanyrd",
  url: "https://en.wikipedia.org/wiki/Lanyrd",
  publisher: "Wikipedia",
});
const aiSlopWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "AI slop",
  url: "https://en.wikipedia.org/wiki/AI_slop",
  publisher: "Wikipedia",
  notes:
    "Credits Willison as an early mainstream champion of the term, while noting it predated his advocacy.",
});
const linkedin = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Simon Willison — LinkedIn",
  url: "https://www.linkedin.com/in/simonwillison",
  publisher: "LinkedIn",
  notes:
    "Self-maintained profile; gives Eventbrite role as Director of Architecture, August 2013 to July 2019.",
});
const introducingDjango = source({
  binding: "first_person",
  mediaType: "article",
  title: "Introducing Django",
  url: "https://simonwillison.net/2005/Jul/17/django/",
  publisher: "simonwillison.net",
  publishedAt: "2005-07-17",
});
const djangoHistory = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "What is the history of the Django web framework? Why has it been described as “developed in a newsroom”?",
  url: "https://simonwillison.net/2010/Aug/24/what-is-the-history/",
  publisher: "simonwillison.net",
  publishedAt: "2010-08-24",
});
const twentyYears = source({
  binding: "first_person",
  mediaType: "article",
  title: "Twenty years of my blog",
  url: "https://simonwillison.net/2022/Jun/12/twenty-years/",
  publisher: "simonwillison.net",
  publishedAt: "2022-06-12",
});
const guardianJoin = source({
  binding: "first_person",
  mediaType: "article",
  title: "Back to full-time employment",
  url: "https://simonwillison.net/2008/Aug/22/employment/",
  publisher: "simonwillison.net",
  publishedAt: "2008-08-22",
});
const guardianMedia = source({
  binding: "reporting",
  mediaType: "article",
  title: "Simon Willison joins Guardian News & Media",
  url: "https://www.theguardian.com/media/2008/aug/22/guardianmediagroup.digitalmedia",
  publisher: "The Guardian",
  publishedAt: "2008-08-22",
});
const investigatePost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Investigate your MP's expenses",
  url: "https://simonwillison.net/2009/Jun/18/investigate/",
  publisher: "simonwillison.net",
  publishedAt: "2009-06-18",
});
const guardianDatablog = source({
  binding: "reporting",
  mediaType: "article",
  title: "How to crowdsource MPs' expenses",
  url: "https://www.theguardian.com/news/datablog/2009/jun/18/mps-expenses-houseofcommons",
  publisher: "The Guardian",
  publishedAt: "2009-06-18",
  authors: ["Simon Rogers"],
});
const nieman = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Four crowdsourcing lessons from the Guardian's (spectacular) expenses-scandal experiment",
  url: "https://www.niemanlab.org/2009/06/four-crowdsourcing-lessons-from-the-guardians-spectacular-expenses-scandal-experiment/",
  publisher: "Nieman Journalism Lab",
  publishedAt: "2009-06-23",
  authors: ["Michael Andersen"],
  notes: "Reported piece built on a phone interview with Willison as the app's developer.",
});
const eventbritePR = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Eventbrite Acquires London-Based Lanyrd and Latin American Events Company Eventioz",
  url: "https://www.eventbrite.com/blog/press/press-releases/eventbrite-acquires-london-based-lanyrd-and-latin-american-events-company-eventioz/",
  publisher: "Eventbrite",
  publishedAt: "2013-09-03",
});
const lanyrdArchive = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Lanyrd — social conference directory (archived homepage)",
  url: "http://web.archive.org/web/20130105135742/http://lanyrd.com:80/",
  publisher: "Internet Archive Wayback Machine",
  publishedAt: "2013-01-05",
  notes:
    "Wayback capture of the live Lanyrd site months before the Eventbrite acquisition.",
});
const techcrunch = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Making Its First Acquisitions, Eventbrite Buys Ticketing Service Eventioz And Event Data Company Lanyrd",
  url: "https://techcrunch.com/2013/09/03/eventbrite-acquires-eventioz-and-lanyrd/",
  publisher: "TechCrunch",
  publishedAt: "2013-09-03",
  authors: ["Anthony Ha"],
});
const datasetteLaunch = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Datasette: instantly create and publish an API for your SQLite databases",
  url: "https://simonwillison.net/2017/Nov/13/datasette/",
  publisher: "simonwillison.net",
  publishedAt: "2017-11-13",
});
const datasetteSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Datasette — An open source multi-tool for exploring and publishing data",
  url: "https://datasette.io/",
  publisher: "datasette.io",
});
const sqliteUtils = source({
  binding: "first_person",
  mediaType: "article",
  title: "sqlite-utils: a library and CLI tool for building SQLite databases",
  url: "https://simonwillison.net/2019/Feb/25/sqlite-utils/",
  publisher: "simonwillison.net",
  publishedAt: "2019-02-25",
  notes: "Title elides the implementation language named in the original headline.",
});
const jsk = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "My JSK Fellowship: Building an open source ecosystem of tools for data journalism",
  url: "https://simonwillison.net/2019/Sep/10/jsk-fellowship/",
  publisher: "simonwillison.net",
  publishedAt: "2019-09-10",
});
const dogsheepWeeknotes = source({
  binding: "first_person",
  mediaType: "article",
  title: "Weeknotes: Dogsheep",
  url: "https://simonwillison.net/2019/Oct/7/dogsheep/",
  publisher: "simonwillison.net",
  publishedAt: "2019-10-07",
});
const dogsheepSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dogsheep — tools for personal analytics using SQLite and Datasette",
  url: "https://dogsheep.github.io/",
  publisher: "dogsheep.github.io",
});
const tilPost = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Using a self-rewriting README powered by GitHub Actions to track TILs",
  url: "https://simonwillison.net/2020/Apr/20/self-rewriting-readme/",
  publisher: "simonwillison.net",
  publishedAt: "2020-04-20",
});
const tilRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "simonw/til: Today I Learned",
  url: "https://github.com/simonw/til",
  publisher: "GitHub",
  publishedAt: "2020-04-19",
  notes:
    "Repository for the TIL collection; reported 579 entries when accessed in 2026.",
});
const gitScraping = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Git scraping: track changes over time by scraping to a Git repository",
  url: "https://simonwillison.net/2020/Oct/9/git-scraping/",
  publisher: "simonwillison.net",
  publishedAt: "2020-10-09",
});
const gitScrapingTalk = source({
  binding: "first_person",
  mediaType: "article",
  title: "Git scraping, the five minute lightning talk",
  url: "https://simonwillison.net/2021/Mar/5/git-scraping/",
  publisher: "simonwillison.net",
  publishedAt: "2021-03-05",
});
const shotScraper = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "shot-scraper: automated screenshots for documentation, built on Playwright",
  url: "https://simonwillison.net/2022/Mar/10/shot-scraper/",
  publisher: "simonwillison.net",
  publishedAt: "2022-03-10",
});
const psfBoard = source({
  binding: "first_person",
  mediaType: "article",
  title: "Weeknotes: joining the PSF board",
  url: "https://simonwillison.net/2022/Jul/30/psf-board/",
  publisher: "simonwillison.net",
  publishedAt: "2022-07-30",
  notes:
    "Original headline names the software foundation that stewards the language behind Django; abbreviated here.",
});
const promptInjection = source({
  binding: "first_person",
  mediaType: "article",
  title: "Prompt injection attacks against GPT-3",
  url: "https://simonwillison.net/2022/Sep/12/prompt-injection/",
  publisher: "simonwillison.net",
  publishedAt: "2022-09-12",
});
const whatToBlog = source({
  binding: "first_person",
  mediaType: "article",
  title: "What to blog about",
  url: "https://simonwillison.net/2022/Nov/6/what-to-blog-about/",
  publisher: "simonwillison.net",
  publishedAt: "2022-11-06",
});
const djangoconTalk = source({
  binding: "first_person",
  mediaType: "article",
  title: "Coping strategies for the serial project hoarder",
  url: "https://simonwillison.net/2022/Nov/26/productivity/",
  publisher: "simonwillison.net",
  publishedAt: "2022-11-26",
  notes:
    "Annotated version of his DjangoCon US 2022 talk on productivity practices for personal projects.",
});
const changelog534 = source({
  binding: "interview",
  mediaType: "audio",
  title: "LLMs break the internet with Simon Willison (Changelog Interviews #534)",
  url: "https://changelog.com/podcast/534",
  publisher: "The Changelog",
  publishedAt: "2023-04-07",
});
const llmRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "simonw/llm: Access large language models from the command-line",
  url: "https://github.com/simonw/llm",
  publisher: "GitHub",
  publishedAt: "2023-04-01",
});
const llmPlugins = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "My LLM CLI tool now supports self-hosted language models via plugins",
  url: "https://simonwillison.net/2023/Jul/12/llm/",
  publisher: "simonwillison.net",
  publishedAt: "2023-07-12",
});
const registerInterview = source({
  binding: "interview",
  mediaType: "article",
  title: "Simon Willison interview: AI software still needs the human touch",
  url: "https://www.theregister.com/software/2024/01/24/ai-software-still-needs-the-human-touch-willison-warns/1138838",
  publisher: "The Register",
  publishedAt: "2024-01-24",
  authors: ["Thomas Claburn"],
});
const pyconVideo = source({
  binding: "first_person",
  mediaType: "video",
  title: "Keynote — Simon Willison (PyCon US 2024)",
  url: "https://www.youtube.com/watch?v=P1-KQZZarpc",
  publisher: "PyCon US / YouTube",
  publishedAt: "2024-05-18",
});
const pyconKeynote = source({
  binding: "first_person",
  mediaType: "article",
  title: "Imitation Intelligence, my keynote for PyCon US 2024",
  url: "https://simonwillison.net/2024/Jul/14/pycon/",
  publisher: "simonwillison.net",
  publishedAt: "2024-07-14",
  transcriptOf: "source-placeholder-video",
  notes: "Annotated slides plus full transcript of the keynote.",
});
const lwn = source({
  binding: "reporting",
  mediaType: "article",
  title: "Imitation, not artificial, intelligence",
  url: "https://lwn.net/Articles/982289/",
  publisher: "LWN.net",
  publishedAt: "2024",
});
const slopPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Slop is the new name for unwanted AI-generated content",
  url: "https://simonwillison.net/2024/May/8/slop/",
  publisher: "simonwillison.net",
  publishedAt: "2024-05-08",
});
const newsrooms = source({
  binding: "first_person",
  mediaType: "article",
  title: "Introducing Datasette for Newsrooms",
  url: "https://simonwillison.net/2025/Apr/24/introducing-datasette-for-newsrooms/",
  publisher: "simonwillison.net",
  publishedAt: "2025-04-24",
});
const lethalTrifecta = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "The lethal trifecta for AI agents: private data, untrusted content, and external communication",
  url: "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/",
  publisher: "simonwillison.net",
  publishedAt: "2025-06-16",
});
const arsTechnica = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Twitter pranksters derail GPT-3 bot with newly discovered “prompt injection” hack",
  url: "https://arstechnica.com/information-technology/2022/09/twitter-pranksters-derail-gpt-3-bot-with-newly-discovered-prompt-injection-hack/",
  publisher: "Ars Technica",
  publishedAt: "2022-09",
  notes:
    "Contemporary coverage crediting Willison's post with coining the term prompt injection.",
});
const worldFactbook = source({
  binding: "first_person",
  mediaType: "article",
  title: "Spotlighting The World Factbook as We Bid a Fond Farewell",
  url: "https://simonwillison.net/2026/Feb/5/the-world-factbook/",
  publisher: "simonwillison.net",
  publishedAt: "2026-02-05",
});
const factbookRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "simonw/cia-world-factbook-2020",
  url: "https://github.com/simonw/cia-world-factbook-2020",
  publisher: "GitHub",
  publishedAt: "2026-02-04",
});
const agenticEngineering = source({
  binding: "first_person",
  mediaType: "article",
  title: "Writing about Agentic Engineering Patterns",
  url: "https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/",
  publisher: "simonwillison.net",
  publishedAt: "2026-02-23",
});
const pragmaticSummit = source({
  binding: "first_person",
  mediaType: "article",
  title: "My fireside chat about agentic engineering at the Pragmatic Summit",
  url: "https://simonwillison.net/2026/Mar/14/pragmatic-summit/",
  publisher: "simonwillison.net",
  publishedAt: "2026-03-14",
});
const lennys = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "An AI state of the union: We've passed the inflection point, dark factories are coming, and automation timelines",
  url: "https://www.lennysnewsletter.com/p/an-ai-state-of-the-union",
  publisher: "Lenny's Podcast",
  publishedAt: "2026-04-02",
});
const softwareMisadventures = source({
  binding: "interview",
  mediaType: "audio",
  title: "LLMs are like your weird, over-confident intern",
  url: "https://softwaremisadventures.com/p/simon-willison-llm-weird-intern",
  publisher: "Software Misadventures",
});
const talkingPostgres = source({
  binding: "interview",
  mediaType: "audio",
  title: "How AI is changing software development with Simon Willison",
  url: "https://talkingpostgres.com/episodes/how-ai-is-changing-software-development-with-simon-willison",
  publisher: "Talking Postgres",
  publishedAt: "2026-08-14",
  authors: ["Claire Giordano"],
});
const highLeverage = source({
  binding: "interview",
  mediaType: "audio",
  title: "The AI Coding Paradigm Shift with Simon Willison (High Leverage #9)",
  url: "https://www.heavybit.com/library/podcasts/high-leverage/ep-9-the-ai-coding-paradigm-shift-with-simon-willison",
  publisher: "Heavybit",
});

const S = {
  about: about.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  lanyrdWiki: lanyrdWiki.id,
  aiSlopWiki: aiSlopWiki.id,
  linkedin: linkedin.id,
  introducingDjango: introducingDjango.id,
  djangoHistory: djangoHistory.id,
  twentyYears: twentyYears.id,
  guardianJoin: guardianJoin.id,
  guardianMedia: guardianMedia.id,
  investigatePost: investigatePost.id,
  guardianDatablog: guardianDatablog.id,
  nieman: nieman.id,
  eventbritePR: eventbritePR.id,
  lanyrdArchive: lanyrdArchive.id,
  techcrunch: techcrunch.id,
  datasetteLaunch: datasetteLaunch.id,
  datasetteSite: datasetteSite.id,
  sqliteUtils: sqliteUtils.id,
  jsk: jsk.id,
  dogsheepWeeknotes: dogsheepWeeknotes.id,
  dogsheepSite: dogsheepSite.id,
  tilPost: tilPost.id,
  tilRepo: tilRepo.id,
  gitScraping: gitScraping.id,
  gitScrapingTalk: gitScrapingTalk.id,
  shotScraper: shotScraper.id,
  psfBoard: psfBoard.id,
  promptInjection: promptInjection.id,
  whatToBlog: whatToBlog.id,
  djangoconTalk: djangoconTalk.id,
  changelog534: changelog534.id,
  llmRepo: llmRepo.id,
  llmPlugins: llmPlugins.id,
  registerInterview: registerInterview.id,
  keynoteVideo: pyconVideo.id,
  keynotePost: pyconKeynote.id,
  lwn: lwn.id,
  slopPost: slopPost.id,
  newsrooms: newsrooms.id,
  lethalTrifecta: lethalTrifecta.id,
  arsTechnica: arsTechnica.id,
  worldFactbook: worldFactbook.id,
  factbookRepo: factbookRepo.id,
  agenticEngineering: agenticEngineering.id,
  pragmaticSummit: pragmaticSummit.id,
  lennys: lennys.id,
  softwareMisadventures: softwareMisadventures.id,
  talkingPostgres: talkingPostgres.id,
  highLeverage: highLeverage.id,
};

const sources = [
  about,
  wikipedia,
  wikidata,
  lanyrdWiki,
  aiSlopWiki,
  linkedin,
  introducingDjango,
  djangoHistory,
  twentyYears,
  guardianJoin,
  guardianMedia,
  investigatePost,
  guardianDatablog,
  nieman,
  eventbritePR,
  lanyrdArchive,
  techcrunch,
  datasetteLaunch,
  datasetteSite,
  sqliteUtils,
  jsk,
  dogsheepWeeknotes,
  dogsheepSite,
  tilPost,
  tilRepo,
  gitScraping,
  gitScrapingTalk,
  shotScraper,
  psfBoard,
  promptInjection,
  whatToBlog,
  djangoconTalk,
  changelog534,
  llmRepo,
  llmPlugins,
  registerInterview,
  pyconVideo,
  pyconKeynote,
  lwn,
  slopPost,
  newsrooms,
  lethalTrifecta,
  arsTechnica,
  worldFactbook,
  factbookRepo,
  agenticEngineering,
  pragmaticSummit,
  lennys,
  softwareMisadventures,
  talkingPostgres,
  highLeverage,
];

// Fix the transcriptOf placeholder now that the keynote video has an id.
for (const entry of sources) {
  if (entry.transcriptOf === "source-placeholder-video") {
    (entry as { transcriptOf: string }).transcriptOf = pyconVideo.id;
  }
}

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-simon-willison",
  generatedAt: "2026-09-17T03:00:00Z",
  subject: {
    kind: "person",
    handle: "simon-willison",
    displayName: "Simon Willison",
    alsoKnownAs: ["simonw"],
    summary:
      "British programmer and prolific open-source developer: co-creator of the Django web framework, creator of Datasette and the llm command-line tool, and the most-read independent practitioner-blogger on applied large language models. He coined the term \"prompt injection\".",
    identity: {
      wikidataId: "Q7520062",
      officialSite: "https://simonwillison.net/",
      wikipedia: "https://en.wikipedia.org/wiki/Simon_Willison",
      profiles: [
        "https://github.com/simonw",
        "https://bsky.app/profile/simonwillison.net",
        "https://fedi.simonwillison.net/@simon",
        "https://x.com/simonw",
        "https://www.linkedin.com/in/simonwillison",
        "https://www.youtube.com/@swillison",
        "https://news.ycombinator.com/user?id=simonw",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media", "beliefs"],
  },
  sources,
  claims: [
    {
      id: "claim-born-1981",
      kind: "fact",
      text: "Simon Willison is a British programmer born in January 1981 in the United Kingdom.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-bath-degree",
      kind: "fact",
      text: "He studied computer science at the University of Bath, graduating with a BSc in 2005.",
      sourceIds: [S.wikipedia, S.twentyYears],
    },
    {
      id: "claim-blogging-2002",
      kind: "fact",
      text: "He has been blogging about web development and programming at simonwillison.net since 2002, beginning in his first year at university; he marked twenty years of the blog in June 2022.",
      sourceIds: [S.about, S.twentyYears],
    },
    {
      id: "claim-ljw-internship",
      kind: "fact",
      text: "In 2003–2004 he spent a 'year in industry' placement at the Lawrence Journal-World newspaper in Lawrence, Kansas, working with Adrian Holovaty; the code they wrote there to power local news sites became the Django web framework, which they called 'the CMS' for a long time.",
      sourceIds: [S.djangoHistory, S.twentyYears, S.wikipedia],
    },
    {
      id: "claim-django-release",
      kind: "fact",
      text: "Django was released as open source in July 2005; Willison announced it on his blog on 17 July 2005, crediting development to himself and Holovaty, with Jacob Kaplan-Moss joining before Willison left the Journal-World in September 2004.",
      sourceIds: [S.introducingDjango, S.djangoHistory],
    },
    {
      id: "claim-yahoo-fire-eagle",
      kind: "fact",
      text: "After graduating in 2005 he worked on Yahoo's Technology Development team and on early versions of the Fire Eagle geolocation service, then consulted on OpenID and web development for publishing and media companies.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-guardian-hire",
      kind: "fact",
      text: "He joined Guardian News & Media in London as a software architect in October 2008, announced on 22 August 2008, and spent about two years on data journalism projects there.",
      sourceIds: [S.guardianJoin, S.guardianMedia, S.jsk],
    },
    {
      id: "claim-mps-expenses",
      kind: "fact",
      text: "In June 2009 he was the lead developer of the Guardian's 'Investigate your MP's expenses' crowdsourcing app — the Guardian's first live Django-powered application — which drew more than 20,000 volunteers who reviewed 170,000 documents in its first 80 hours.",
      sourceIds: [S.nieman, S.guardianDatablog, S.investigatePost],
    },
    {
      id: "claim-lanyrd-founded",
      kind: "fact",
      text: "In 2010 he co-founded Lanyrd, a social conference directory, with Natalie Downe; the couple began building it while travelling on their honeymoon.",
      sourceIds: [S.lanyrdWiki, S.eventbritePR, S.about, S.lanyrdArchive],
    },
    {
      id: "claim-lanyrd-yc",
      kind: "fact",
      text: "Lanyrd went through Y Combinator's Winter 2011 batch and raised about $1.4 million in seed funding from Index Ventures Seed, PROfounders Capital, Y Combinator, Start Fund, and others.",
      sourceIds: [S.techcrunch, S.lanyrdWiki],
    },
    {
      id: "claim-eventbrite-acquisition",
      kind: "fact",
      text: "Eventbrite acquired Lanyrd on 3 September 2013 — one of Eventbrite's first two acquisitions — and the Lanyrd team relocated to Eventbrite's San Francisco headquarters.",
      sourceIds: [S.eventbritePR, S.techcrunch],
    },
    {
      id: "claim-eventbrite-role",
      kind: "fact",
      text: "He worked at Eventbrite from August 2013 to July 2019, self-listed as Director of Architecture; his own biography describes the role as engineering director.",
      sourceIds: [S.linkedin, S.about],
    },
    {
      id: "claim-datasette-launch",
      kind: "fact",
      text: "He shipped the first public version of Datasette — a tool for creating and publishing JSON APIs and explorable web interfaces for SQLite databases — on 13 November 2017.",
      sourceIds: [S.datasetteLaunch, S.datasetteSite],
    },
    {
      id: "claim-datasette-inspiration",
      kind: "fact",
      text: "He has written that Datasette was inspired by the challenges he saw while working at the Guardian, and that the Baltimore Sun used it for a public salary records project within its first year.",
      sourceIds: [S.jsk],
    },
    {
      id: "claim-jsk-fellowship",
      kind: "fact",
      text: "In 2019 he was awarded a JSK Journalism Fellowship at Stanford to work full-time on an open source ecosystem of tools for data journalism built around Datasette.",
      sourceIds: [S.jsk],
    },
    {
      id: "claim-sqlite-utils",
      kind: "fact",
      text: "He released sqlite-utils in February 2019 after building it for roughly six months — a library and command-line tool for creating and manipulating SQLite databases, positioned as the keystone of the Datasette ecosystem.",
      sourceIds: [S.sqliteUtils],
    },
    {
      id: "claim-dogsheep",
      kind: "fact",
      text: "Since 2019 he has maintained Dogsheep, a suite of tools for personal analytics that export data from services such as Twitter, Apple HealthKit, Foursquare Swarm, iNaturalist, Google Takeout, GitHub, Pocket, and a 23andMe genome into SQLite for querying with Datasette.",
      sourceIds: [S.dogsheepWeeknotes, S.dogsheepSite],
    },
    {
      id: "claim-til-start",
      kind: "fact",
      text: "In April 2020 he began publishing TIL ('Today I Learned') snippets to a dedicated GitHub repository, inspired by Josh Branchaud's five-year collection; the repo powers a searchable site and held 579 entries when accessed in 2026.",
      sourceIds: [S.tilPost, S.tilRepo],
    },
    {
      id: "claim-git-scraping",
      kind: "fact",
      text: "In October 2020 he published a post naming 'Git scraping' — his technique of snapshotting data sources into Git repositories on a schedule, typically via GitHub Actions, to build changelogs over time; he later gave a lightning talk on it at the NICAR 2021 data journalism conference.",
      sourceIds: [S.gitScraping, S.gitScrapingTalk],
    },
    {
      id: "claim-shot-scraper",
      kind: "fact",
      text: "In March 2022 he released shot-scraper, a command-line tool built on Playwright that automates screenshots of web pages and doubles as a scraping utility that can execute JavaScript and return JSON.",
      sourceIds: [S.shotScraper],
    },
    {
      id: "claim-psf-board",
      kind: "fact",
      text: "In July 2022 he was elected to the board of the PSF — the nonprofit software foundation that stewards the language behind Django — and attended his first board meeting that month; Wikipedia reports he sought another three-year term in 2025.",
      sourceIds: [S.psfBoard, S.wikipedia],
    },
    {
      id: "claim-prompt-injection-coinage",
      kind: "fact",
      text: "On 12 September 2022 he published 'Prompt injection attacks against GPT-3', proposing 'prompt injection' as the name for the class of exploits Riley Goodside had demonstrated the day before; Ars Technica's coverage credits his post with coining the term.",
      sourceIds: [S.promptInjection, S.arsTechnica],
    },
    {
      id: "claim-llm-cli",
      kind: "fact",
      text: "He released llm, a command-line tool and library for interacting with large language models, in April 2023; a July 2023 release added a plugin system that extended it to self-hosted models.",
      sourceIds: [S.llmRepo, S.llmPlugins],
    },
    {
      id: "claim-pycon-keynote",
      kind: "fact",
      text: "He delivered an invited keynote titled 'Imitation Intelligence' at PyCon US 2024 in Pittsburgh on 18 May 2024, later publishing an annotated transcript of the talk.",
      sourceIds: [S.keynotePost, S.keynoteVideo, S.lwn],
    },
    {
      id: "claim-datasette-newsrooms",
      kind: "fact",
      text: "On 24 April 2025 he and Alex Garcia launched Datasette for Newsrooms, a bundled product suite from the hosted Datasette Cloud service aimed at investigative journalists and data teams.",
      sourceIds: [S.newsrooms],
    },
    {
      id: "claim-lethal-trifecta",
      kind: "fact",
      text: "On 16 June 2025 he published a post coining 'the lethal trifecta' for AI agents: the dangerous combination of access to private data, exposure to untrusted content, and the ability to communicate externally.",
      sourceIds: [S.lethalTrifecta],
    },
    {
      id: "claim-world-factbook",
      kind: "fact",
      text: "When the CIA discontinued the World Factbook in February 2026, he recovered the 384MB 2020 zip archive — the last edition offered for download — from the Internet Archive and extracted it into a public GitHub repository served via GitHub Pages.",
      sourceIds: [S.worldFactbook, S.factbookRepo],
    },
    {
      id: "claim-independent-fulltime",
      kind: "fact",
      text: "Since leaving Eventbrite he has worked as an independent open source developer, describing his occupation as building open source tools for data journalism around Datasette and SQLite.",
      sourceIds: [S.about, S.jsk],
    },
    {
      id: "claim-imitation-intelligence",
      kind: "stated_belief",
      text: "He argues 'imitation intelligence' is a better term than 'artificial intelligence' for large language models: systems that imitate what intelligence looks like can do useful things, but are 'not planning and solving puzzles'.",
      sourceIds: [S.keynotePost, S.lwn],
    },
    {
      id: "claim-prompt-injection-unsolved",
      kind: "stated_belief",
      text: "He has repeatedly said prompt injection has no reliable fix — 'I have no idea how to reliably beat prompt injection' — and rejects adding more AI as the answer, holding that in application security 99% is a failing grade.",
      sourceIds: [S.arsTechnica, S.promptInjection],
    },
    {
      id: "claim-lethal-trifecta-mitigation",
      kind: "stated_belief",
      text: "He argues the only reliable mitigation for the lethal trifecta is to remove one of its three legs — usually the exfiltration vector — rather than relying on model guardrails, which he treats as a percentage defense an adversarial attacker will eventually bypass.",
      sourceIds: [S.lethalTrifecta],
    },
    {
      id: "claim-perfect-commit",
      kind: "stated_belief",
      text: "He structures work around 'the perfect commit' — implementation, tests, documentation, and a link to an issue thread in one change — and insists documentation must live in the same repository as the code.",
      sourceIds: [S.djangoconTalk],
    },
    {
      id: "claim-write-about-it",
      kind: "stated_belief",
      text: "He holds that 'the price of doing a project is that you have to write about it' — documentation and public explanation are part of shipping, and issue-driven development is his key productivity hack for many parallel projects.",
      sourceIds: [S.djangoconTalk, S.tilPost],
    },
    {
      id: "claim-til-philosophy",
      kind: "stated_belief",
      text: "He presents TILs as 'the most liberating form of content' — the bar is 'did I just learn something?' — and says he publishes them partly to show that even with decades of professional experience, learning basic things should be celebrated.",
      sourceIds: [S.whatToBlog, S.tilPost],
    },
    {
      id: "claim-openly-licensed",
      kind: "stated_belief",
      text: "He deliberately says 'openly licensed models' rather than 'open source' for models like Llama whose licenses do not match the OSI definition — a pedanticism he defends as meaningful.",
      sourceIds: [S.registerInterview, S.keynotePost],
    },
    {
      id: "claim-dont-publish-slop",
      kind: "stated_belief",
      text: "He championed 'slop' as the name for unrequested, unreviewed AI-generated content — while noting it predated his advocacy — and holds 'don't publish slop' as a baseline of personal AI ethics, attaching his name and credibility to what he publishes.",
      sourceIds: [S.slopPost, S.aiSlopWiki],
    },
    {
      id: "claim-no-ai-writing",
      kind: "stated_belief",
      text: "He maintains a personal policy of not publishing AI-generated writing under his own name, using models for proofreading and side tasks while keeping the published words his own.",
      sourceIds: [S.agenticEngineering],
    },
    {
      id: "claim-agentic-ambition",
      kind: "stated_belief",
      text: "He describes his professional use of coding agents as 'agentic engineering' — distinct from 'vibe coding' — and says it lets him take on significantly more ambitious projects because writing code has become cheap while understanding it remains the bottleneck.",
      sourceIds: [S.agenticEngineering, S.pragmaticSummit, S.lennys],
    },
    {
      id: "claim-flawed-but-useful",
      kind: "stated_belief",
      text: "His position on LLMs is that flawed tools can still be useful: he evaluates the technology by what it enables him to build, has used the models daily for years, and pushes back on the 'just toys' criticism while acknowledging hallucination, bias, and training-data ethics problems.",
      sourceIds: [S.lwn, S.registerInterview],
    },
    {
      id: "claim-prolific-portfolio",
      kind: "pattern",
      text: "He maintains an unusually large public project portfolio — 'over 100 open source projects' per Lenny's Podcast and '18 projects' he jokes are fine if they have documentation and tests — sustained by uniform practices rather than narrowing focus.",
      sourceIds: [S.lennys, S.djangoconTalk],
    },
    {
      id: "claim-learn-in-public",
      kind: "pattern",
      text: "Across two decades he has built a public learning apparatus — long-form blog since 2002, TILs since 2020, weeknotes, annotated talk write-ups, and per-release 'beats' — that turns private work into durable documentation and the blog into an accountability mechanism.",
      sourceIds: [S.twentyYears, S.tilPost, S.whatToBlog, S.softwareMisadventures],
    },
    {
      id: "claim-naming-as-advocacy",
      kind: "pattern",
      text: "He repeatedly names phenomena to shape discourse — 'prompt injection' (2022), 'git scraping' (2020), 'slop' advocacy (2024), 'the lethal trifecta' (2025), and 'agentic engineering' (2026) — and has said he picks terms whose meaning is not obvious so people search for his definition.",
      sourceIds: [S.promptInjection, S.gitScraping, S.slopPost, S.lethalTrifecta, S.agenticEngineering],
    },
    {
      id: "claim-tools-for-journalists",
      kind: "pattern",
      text: "A newsroom throughline runs from the Lawrence Journal-World CMS through the Guardian's data journalism work to the JSK fellowship and Datasette for Newsrooms: tools built for the deadlines and data of journalism.",
      sourceIds: [S.jsk, S.nieman, S.newsrooms, S.djangoHistory],
    },
    {
      id: "claim-practitioner-authority",
      kind: "pattern",
      text: "Press and podcasts consistently treat him as a leading independent observer of applied AI — 'one of the more influential observers of AI software' (The Register), 'one of the most visible and trusted voices' on AI's impact on builders (Lenny's Podcast) — influence he attributes to blogging consistently.",
      sourceIds: [S.registerInterview, S.lennys, S.highLeverage],
    },
    {
      id: "claim-most-read-blog",
      kind: "speculation",
      text: "The claim that simonwillison.net is the most-read practitioner blog on applied LLMs is plausible given how consistently press, conference organizers, and podcasts cite it, but no independent traffic measurement exists in the cited record.",
      sourceIds: [S.lennys, S.registerInterview, S.lwn],
    },
    {
      id: "claim-eventbrite-exit-timing",
      kind: "speculation",
      text: "His exact Eventbrite exit is thinly documented: his LinkedIn lists July 2019 and the JSK fellowship began that September, suggesting the fellowship followed the departure closely, but no primary post marking the exit was located.",
      sourceIds: [S.linkedin, S.jsk],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1981-01",
      title: "Born in the United Kingdom",
      summary: "Month known from Wikipedia; Wikidata stores 1 January 1981.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-blog-start",
      kind: "publication",
      date: "2002-06",
      title: "Started his blog",
      summary:
        "Began blogging as a first-year computer science student at the University of Bath; the site has run continuously since.",
      sourceIds: [S.twentyYears, S.about],
    },
    {
      id: "event-ljw-internship",
      kind: "role",
      date: "2003",
      end: "2004",
      title: "Year in industry at the Lawrence Journal-World",
      summary:
        "Placement year in Lawrence, Kansas, working with Adrian Holovaty; the CMS they built there became Django.",
      organization: "Lawrence Journal-World",
      organizationHandle: "lawrence-journal-world",
      location: "Lawrence, Kansas",
      sourceIds: [S.djangoHistory, S.twentyYears],
    },
    {
      id: "event-django-oss",
      kind: "project",
      date: "2005-07",
      title: "Django released as open source",
      summary:
        "Announced on his blog on 17 July 2005; co-created with Adrian Holovaty, with Jacob Kaplan-Moss and designer Wilson Miner on the early team.",
      sourceIds: [S.introducingDjango, S.djangoHistory],
    },
    {
      id: "event-bath-grad",
      kind: "education",
      date: "2005",
      title: "Graduated from the University of Bath",
      summary: "BSc in computer science.",
      organization: "University of Bath",
      organizationHandle: "university-of-bath",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-yahoo",
      kind: "role",
      date: "2005",
      title: "Yahoo Technology Development team",
      summary:
        "Worked on early versions of the Fire Eagle geolocation service; later consulted on OpenID for media companies.",
      organization: "Yahoo",
      organizationHandle: "yahoo",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-guardian",
      kind: "role",
      date: "2008-10",
      end: "2010",
      title: "Software architect at the Guardian",
      summary:
        "Joined Guardian News & Media in London to work on data-driven journalism and API projects.",
      organization: "The Guardian",
      organizationHandle: "the-guardian",
      location: "London",
      sourceIds: [S.guardianJoin, S.guardianMedia, S.jsk],
    },
    {
      id: "event-mps-expenses",
      kind: "project",
      date: "2009-06-18",
      title: "Launched 'Investigate your MP's expenses'",
      summary:
        "Guardian crowdsourcing app for 700,000+ scanned expense documents; over 20,000 volunteers joined, reviewing 170,000 documents in the first 80 hours.",
      organization: "The Guardian",
      organizationHandle: "the-guardian",
      sourceIds: [S.investigatePost, S.guardianDatablog, S.nieman],
    },
    {
      id: "event-lanyrd",
      kind: "founded",
      date: "2010",
      title: "Co-founded Lanyrd",
      summary:
        "Social conference directory built with Natalie Downe, started while the couple travelled on their honeymoon.",
      organization: "Lanyrd",
      organizationHandle: "lanyrd",
      sourceIds: [S.lanyrdWiki, S.eventbritePR, S.lanyrdArchive],
    },
    {
      id: "event-lanyrd-yc",
      kind: "milestone",
      date: "2011",
      title: "Lanyrd joined Y Combinator W11",
      summary:
        "Funded in early 2011; later raised a ~$1.4M seed round including Index Ventures Seed and PROfounders Capital.",
      sourceIds: [S.techcrunch, S.lanyrdWiki],
    },
    {
      id: "event-eventbrite-acq",
      kind: "milestone",
      date: "2013-09-03",
      title: "Eventbrite acquired Lanyrd",
      summary:
        "One of Eventbrite's first acquisitions; the team relocated to San Francisco.",
      organization: "Eventbrite",
      organizationHandle: "eventbrite",
      sourceIds: [S.eventbritePR, S.techcrunch],
    },
    {
      id: "event-eventbrite-role",
      kind: "role",
      date: "2013-08",
      end: "2019-07",
      title: "Director of Architecture at Eventbrite",
      summary:
        "Engineering management and R&D across APIs, developer tools, and search and discovery.",
      organization: "Eventbrite",
      organizationHandle: "eventbrite",
      location: "San Francisco",
      sourceIds: [S.linkedin, S.about],
    },
    {
      id: "event-datasette",
      kind: "project",
      date: "2017-11-13",
      title: "Shipped the first public version of Datasette",
      summary:
        "Open source tool for exploring and publishing SQLite databases as browsable sites and JSON APIs.",
      sourceIds: [S.datasetteLaunch],
    },
    {
      id: "event-jsk",
      kind: "role",
      date: "2019",
      title: "JSK Journalism Fellowship at Stanford",
      summary:
        "Spent the fellowship building an open source ecosystem of data journalism tools around Datasette.",
      organization: "Stanford JSK Journalism Fellowships",
      organizationHandle: "stanford-jsk-journalism-fellowships",
      sourceIds: [S.jsk],
    },
    {
      id: "event-til",
      kind: "milestone",
      date: "2020-04-20",
      title: "Started publishing TILs",
      summary:
        "Public 'Today I Learned' notebook inspired by Josh Branchaud; 579 entries by mid-2026.",
      sourceIds: [S.tilPost, S.tilRepo],
    },
    {
      id: "event-git-scraping",
      kind: "publication",
      date: "2020-10-09",
      title: "Named 'Git scraping'",
      summary:
        "Published the technique of snapshotting data sources into Git repositories to track changes over time.",
      sourceIds: [S.gitScraping],
    },
    {
      id: "event-psf-board",
      kind: "role",
      date: "2022-07",
      title: "Elected to the board of the foundation behind Django's language",
      summary:
        "Won a seat in the 2022 election for the software foundation that stewards the language Django is written in.",
      sourceIds: [S.psfBoard],
    },
    {
      id: "event-prompt-injection",
      kind: "publication",
      date: "2022-09-12",
      title: "Coined 'prompt injection'",
      summary:
        "Proposed the name for the class of attacks demonstrated by Riley Goodside against GPT-3-based software.",
      sourceIds: [S.promptInjection, S.arsTechnica],
    },
    {
      id: "event-djangocon-2022",
      kind: "media",
      date: "2022-10",
      title: "DjangoCon US talk on productivity for serial project hoarders",
      summary:
        "Presented 'Massively increase your productivity on personal projects with comprehensive documentation and automated tests' in San Diego.",
      location: "San Diego",
      sourceIds: [S.djangoconTalk],
    },
    {
      id: "event-llm-cli",
      kind: "project",
      date: "2023-04",
      title: "Released the llm command-line tool",
      summary:
        "CLI and library for interacting with large language models; a plugin system for self-hosted and API models followed in July 2023.",
      sourceIds: [S.llmRepo, S.llmPlugins],
    },
    {
      id: "event-pycon-2024",
      kind: "media",
      date: "2024-05-18",
      title: "PyCon US 2024 keynote: 'Imitation Intelligence'",
      summary:
        "Invited keynote in Pittsburgh surveying large language models for the community behind Django's language.",
      location: "Pittsburgh",
      sourceIds: [S.keynotePost, S.keynoteVideo, S.lwn],
    },
    {
      id: "event-newsrooms",
      kind: "project",
      date: "2025-04-24",
      title: "Launched Datasette for Newsrooms",
      summary:
        "Bundled Datasette Cloud product suite for investigative journalists and data teams.",
      organization: "Datasette Cloud",
      organizationHandle: "datasette-cloud",
      sourceIds: [S.newsrooms],
    },
    {
      id: "event-lethal-trifecta",
      kind: "publication",
      date: "2025-06-16",
      title: "Coined 'the lethal trifecta'",
      summary:
        "Framed the dangerous capability combination for AI agents: private data access, untrusted content exposure, external communication.",
      sourceIds: [S.lethalTrifecta],
    },
    {
      id: "event-factbook",
      kind: "project",
      date: "2026-02-05",
      title: "Rescued the CIA World Factbook 2020 archive",
      summary:
        "After the CIA discontinued the Factbook, recovered the final downloadable edition from the Internet Archive into a public repository.",
      sourceIds: [S.worldFactbook, S.factbookRepo],
    },
    {
      id: "event-agentic-patterns",
      kind: "publication",
      date: "2026-02-23",
      title: "Started the Agentic Engineering Patterns guide",
      summary:
        "An ongoing chapter-shaped collection of practices for working with coding agents.",
      sourceIds: [S.agenticEngineering],
    },
  ],
  themes: [
    {
      id: "theme-tools-over-takes",
      kind: "philosophy",
      status: "stated",
      title: "Tools over takes",
      summary:
        "He evaluates technology by what it lets him build, not by hype or dismissal: daily hands-on use of flawed tools beats both boosterism and the 'just toys' critique. His influence on AI discourse rests on practitioner experiment rather than lab affiliation.",
      sourceIds: [S.lwn, S.registerInterview, S.keynotePost],
    },
    {
      id: "theme-documentation-as-practice",
      kind: "method",
      status: "stated",
      title: "Documentation as practice",
      summary:
        "The perfect commit bundles code, tests, and docs; documentation lives in the repository; every project must be written about; talks get annotated transcripts. Writing is treated as the shipping cost of code, not a follow-up.",
      sourceIds: [S.djangoconTalk, S.tilPost, S.whatToBlog],
    },
    {
      id: "theme-learn-in-public",
      kind: "practice",
      status: "stated",
      title: "Learning in public",
      summary:
        "Blog since 2002, TIL notebook since 2020, weeknotes, and annotated presentations form a public record that lowers the barrier to publishing and turns learning into durable, searchable material.",
      sourceIds: [S.twentyYears, S.tilPost, S.whatToBlog],
    },
    {
      id: "theme-adversarial-llm",
      kind: "interest",
      status: "stated",
      title: "Adversarial framing for LLM security",
      summary:
        "Prompt injection and the lethal trifecta frame LLM features as an attack-surface problem: assume untrusted input, count legs of dangerous capability combinations, and distrust percentage defenses like guardrails.",
      sourceIds: [S.promptInjection, S.lethalTrifecta, S.arsTechnica],
    },
    {
      id: "theme-local-first-data",
      kind: "philosophy",
      status: "inferred",
      title: "Local-first data ownership",
      summary:
        "SQLite as the durable substrate — Datasette publishes it, sqlite-utils builds it, Dogsheep repatriates personal data into it, git scraping archives third-party sources into it, and llm runs models on his own hardware. The recurring move is owning the data and the compute.",
      sourceIds: [S.datasetteLaunch, S.dogsheepSite, S.gitScraping, S.llmPlugins],
    },
    {
      id: "theme-naming-as-advocacy",
      kind: "method",
      status: "inferred",
      title: "Naming as advocacy",
      summary:
        "He repeatedly coins or champions compact terms — prompt injection, git scraping, slop, the lethal trifecta, agentic engineering — to make ideas findable and to steer discourse toward his definitions.",
      sourceIds: [S.promptInjection, S.gitScraping, S.slopPost, S.lethalTrifecta, S.agenticEngineering],
    },
    {
      id: "theme-open-source-longevity",
      kind: "practice",
      status: "reported",
      title: "Open-source longevity",
      summary:
        "From a newsroom CMS open-sourced in 2005 to a self-sustaining plugin ecosystem today: press and peers frame him as a model of durable, independent open-source development spanning two decades.",
      sourceIds: [S.introducingDjango, S.jsk, S.lennys, S.highLeverage],
    },
    {
      id: "theme-data-journalism",
      kind: "interest",
      status: "stated",
      title: "Tools for data journalism",
      summary:
        "A deliberate throughline from newspaper CMS work to the Guardian's crowdsourced expenses analysis to the JSK fellowship and Datasette for Newsrooms — software aimed at making journalists faster and more transparent with data.",
      sourceIds: [S.jsk, S.nieman, S.newsrooms],
    },
  ],
  works: [
    {
      id: "work-django",
      kind: "project",
      status: "released",
      title: "Django web framework",
      date: "2005-07",
      summary:
        "Co-created with Adrian Holovaty at the Lawrence Journal-World; open-sourced July 2005 and now a widely deployed web framework.",
      sourceIds: [S.introducingDjango, S.djangoHistory, S.wikipedia],
    },
    {
      id: "work-mps-expenses",
      kind: "project",
      status: "completed",
      title: "Investigate your MP's expenses",
      date: "2009-06-18",
      location: "The Guardian, London",
      summary:
        "Crowdsourcing application for the UK MPs' expenses document release; the Guardian's first live Django-powered app.",
      sourceIds: [S.investigatePost, S.nieman, S.guardianDatablog],
    },
    {
      id: "work-lanyrd",
      kind: "product",
      status: "completed",
      title: "Lanyrd",
      date: "2010",
      summary:
        "Social conference directory co-founded with Natalie Downe; YC W11, acquired by Eventbrite in September 2013, later shut down.",
      sourceIds: [S.lanyrdWiki, S.eventbritePR, S.techcrunch, S.lanyrdArchive],
    },
    {
      id: "work-datasette",
      kind: "project",
      status: "ongoing",
      title: "Datasette",
      date: "2017-11-13",
      summary:
        "Open source multi-tool for exploring and publishing data: turns SQLite databases into browsable web interfaces and JSON APIs, extended by a large plugin ecosystem.",
      sourceIds: [S.datasetteLaunch, S.datasetteSite],
    },
    {
      id: "work-sqlite-utils",
      kind: "project",
      status: "ongoing",
      title: "sqlite-utils",
      date: "2019-02-25",
      summary:
        "Library and command-line tool for building and manipulating SQLite databases; the keystone of the Datasette tool ecosystem.",
      sourceIds: [S.sqliteUtils],
    },
    {
      id: "work-dogsheep",
      kind: "project",
      status: "ongoing",
      title: "Dogsheep",
      date: "2019",
      summary:
        "A suite of something-to-sqlite tools for personal analytics — repatriating data from internet services into a personal data warehouse.",
      sourceIds: [S.dogsheepWeeknotes, S.dogsheepSite],
    },
    {
      id: "work-til",
      kind: "project",
      status: "ongoing",
      title: "Today I Learned collection",
      date: "2020-04",
      summary:
        "Public notebook of short lessons learned, generated from a self-updating GitHub repository; 579 entries at access time.",
      sourceIds: [S.tilPost, S.tilRepo],
    },
    {
      id: "work-shot-scraper",
      kind: "project",
      status: "ongoing",
      title: "shot-scraper",
      date: "2022-03-10",
      summary:
        "Command-line utility built on Playwright for automated website screenshots and command-line web scraping that returns JSON.",
      sourceIds: [S.shotScraper],
    },
    {
      id: "work-llm",
      kind: "project",
      status: "ongoing",
      title: "llm",
      date: "2023-04",
      summary:
        "Command-line tool and library for interacting with large language models, with a plugin ecosystem covering API-hosted and self-hosted models.",
      sourceIds: [S.llmRepo, S.llmPlugins],
    },
    {
      id: "work-datasette-cloud",
      kind: "product",
      status: "in_progress",
      title: "Datasette Cloud / Datasette for Newsrooms",
      date: "2025-04-24",
      summary:
        "Hosted SaaS version of Datasette and a bundled product suite for investigative journalists and newsroom data teams.",
      sourceIds: [S.newsrooms],
    },
    {
      id: "work-cia-factbook",
      kind: "other",
      status: "released",
      title: "CIA World Factbook 2020 archive",
      date: "2026-02-05",
      summary:
        "Recovered the final downloadable edition of the discontinued CIA World Factbook from the Internet Archive into a browsable GitHub repository (a dataset archive).",
      sourceIds: [S.worldFactbook, S.factbookRepo],
    },
    {
      id: "work-agentic-patterns",
      kind: "other",
      status: "in_progress",
      title: "Agentic Engineering Patterns",
      date: "2026-02-23",
      summary:
        "An ongoing guide of chapter-shaped patterns for getting results from coding agents such as Claude Code and OpenAI Codex.",
      sourceIds: [S.agenticEngineering],
    },
  ],
  appearances: [
    {
      id: "appearance-pycon-2024",
      title: "Keynote: Imitation Intelligence",
      venue: "PyCon US 2024, Pittsburgh",
      publishedAt: "2024-05-18",
      participants: ["Simon Willison"],
      summary:
        "Invited keynote surveying large language models — how they work, why he prefers 'imitation intelligence', prompt injection, and what the community should do about them.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=P1-KQZZarpc",
          sourceId: S.keynoteVideo,
        },
        {
          type: "transcript",
          url: "https://simonwillison.net/2024/Jul/14/pycon/",
          sourceId: S.keynotePost,
        },
      ],
      sourceIds: [S.keynoteVideo, S.keynotePost],
    },
    {
      id: "appearance-djangocon-2022",
      title: "Massively increase your productivity on personal projects with comprehensive documentation and automated tests",
      venue: "DjangoCon US 2022, San Diego",
      publishedAt: "2022-10",
      participants: ["Simon Willison"],
      summary:
        "Talk on sustaining many parallel personal projects — the perfect commit, issue-driven development, and 'coping strategies for the serial project hoarder'.",
      media: [
        {
          type: "article",
          url: "https://simonwillison.net/2022/Nov/26/productivity/",
          sourceId: S.djangoconTalk,
        },
      ],
      sourceIds: [S.djangoconTalk],
    },
    {
      id: "appearance-nicar-2021",
      title: "Git scraping, the five minute lightning talk",
      venue: "NICAR 2021 data journalism conference",
      publishedAt: "2021-03-05",
      participants: ["Simon Willison"],
      summary:
        "Lightning talk demonstrating scheduled GitHub Actions scrapers, including live-building a scraper for CDC vaccination data.",
      sourceIds: [S.gitScrapingTalk],
    },
    {
      id: "appearance-changelog-534",
      title: "LLMs break the internet (Changelog Interviews #534)",
      venue: "The Changelog",
      publishedAt: "2023-04-07",
      participants: ["Simon Willison", "Jerod Santo", "Adam Stacoviak"],
      summary:
        "A 103-minute episode on large language models — ChatGPT, GPT-4, plugins, and prompt injection — revisiting predictions from his earlier appearance.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/podcast/534",
          sourceId: S.changelog534,
        },
      ],
      sourceIds: [S.changelog534],
    },
    {
      id: "appearance-register-2024",
      title: "Simon Willison interview: AI software still needs the human touch",
      venue: "The Register",
      publishedAt: "2024-01-24",
      participants: ["Simon Willison", "Thomas Claburn"],
      summary:
        "Q&A on AI training-data copyright, openly licensed models, LLM-assisted development, and security.",
      media: [
        {
          type: "article",
          url: "https://www.theregister.com/software/2024/01/24/ai-software-still-needs-the-human-touch-willison-warns/1138838",
          sourceId: S.registerInterview,
        },
      ],
      sourceIds: [S.registerInterview],
    },
    {
      id: "appearance-software-misadventures",
      title: "LLMs are like your weird, over-confident intern",
      venue: "Software Misadventures podcast",
      participants: ["Simon Willison"],
      summary:
        "Interview on blogging as an accountability mechanism, building intuition with LLMs, and founding a startup on his honeymoon.",
      media: [
        {
          type: "audio",
          url: "https://softwaremisadventures.com/p/simon-willison-llm-weird-intern",
          sourceId: S.softwareMisadventures,
        },
      ],
      sourceIds: [S.softwareMisadventures],
    },
    {
      id: "appearance-pragmatic-summit-2026",
      title: "Fireside chat about agentic engineering",
      venue: "Pragmatic Summit, San Francisco",
      publishedAt: "2026-02",
      participants: ["Simon Willison", "Eric Lui"],
      summary:
        "Fireside session on agentic engineering practice hosted by Eric Lui of Statsig.",
      media: [
        {
          type: "article",
          url: "https://simonwillison.net/2026/Mar/14/pragmatic-summit/",
          sourceId: S.pragmaticSummit,
        },
      ],
      sourceIds: [S.pragmaticSummit],
    },
    {
      id: "appearance-lennys-2026",
      title: "An AI state of the union",
      venue: "Lenny's Podcast",
      publishedAt: "2026-04-02",
      participants: ["Simon Willison", "Lenny Rachitsky"],
      summary:
        "Episode on the November 2025 inflection point for AI coding agents, the 'dark factory' pattern, and his prediction that half of engineers will write 95% AI code by the end of 2026.",
      media: [
        {
          type: "audio",
          url: "https://www.lennysnewsletter.com/p/an-ai-state-of-the-union",
          sourceId: S.lennys,
        },
      ],
      sourceIds: [S.lennys],
    },
    {
      id: "appearance-talking-postgres-2026",
      title: "How AI is changing software development",
      venue: "Talking Postgres (episode 42)",
      publishedAt: "2026-08-14",
      participants: ["Simon Willison", "Claire Giordano"],
      summary:
        "Interview on production standards for AI-written code — 'Could I explain this to somebody else?' — and why the bottleneck is now understanding code rather than writing it.",
      media: [
        {
          type: "audio",
          url: "https://talkingpostgres.com/episodes/how-ai-is-changing-software-development-with-simon-willison",
          sourceId: S.talkingPostgres,
        },
      ],
      sourceIds: [S.talkingPostgres],
    },
    {
      id: "appearance-high-leverage",
      title: "The AI Coding Paradigm Shift (High Leverage #9)",
      venue: "Heavybit High Leverage podcast",
      publishedAt: "2026",
      participants: ["Simon Willison", "Joe Ruscio"],
      summary:
        "Episode on the shift from vibe coding to agentic engineering, trust, security, and what breaks when code becomes cheap.",
      media: [
        {
          type: "audio",
          url: "https://www.heavybit.com/library/podcasts/high-leverage/ep-9-the-ai-coding-paradigm-shift-with-simon-willison",
          sourceId: S.highLeverage,
        },
      ],
      sourceIds: [S.highLeverage],
    },
  ],
  relations: [
    {
      id: "rel-adrian-holovaty",
      kind: "collaborated",
      target: "adrian-holovaty",
      targetName: "Adrian Holovaty",
      note: "Co-created Django at the Lawrence Journal-World; the framework was open-sourced in July 2005.",
      start: "2003",
      targetWikidataId: "Q4685115",
      sourceIds: [S.introducingDjango, S.djangoHistory, S.twentyYears],
    },
    {
      id: "rel-jacob-kaplan-moss",
      kind: "collaborated",
      target: "jacob-kaplan-moss",
      targetName: "Jacob Kaplan-Moss",
      note: "Joined the early Django team before Willison left the Journal-World in September 2004.",
      targetWikidataId: "Q124734415",
      sourceIds: [S.introducingDjango, S.djangoHistory],
    },
    {
      id: "rel-natalie-downe",
      kind: "cofounder",
      target: "natalie-downe",
      targetName: "Natalie Downe",
      note: "Co-founded Lanyrd in 2010; the couple began building it while travelling on their honeymoon.",
      start: "2010",
      sourceIds: [S.lanyrdWiki, S.eventbritePR, S.about],
    },
    {
      id: "rel-lanyrd",
      kind: "founded",
      target: "lanyrd",
      targetName: "Lanyrd",
      targetKind: "organization",
      note: "Social conference directory co-founded in 2010; YC Winter 2011, acquired by Eventbrite in 2013.",
      start: "2010",
      end: "2013",
      targetWikidataId: "Q6487693",
      sourceIds: [S.lanyrdWiki, S.eventbritePR, S.lanyrdArchive],
    },
  ],
  openQuestions: [
    "His birth date is recorded only as 'January 1981' by Wikipedia; Wikidata stores 1 January 1981, but the day-level precision is unverified.",
    "The English Wikipedia article carried an articles-for-deletion notice when accessed in September 2026; whether it survives is unresolved.",
    "No canonical count of his open-source projects exists; Lenny's Podcast describes 'over 100', and his GitHub hosts many more repositories than this index enumerates.",
    "Whether he continued serving on the board of the foundation behind Django's language beyond the 2025 election cycle rests on Wikipedia's 'intends to continue' phrasing rather than a primary result.",
    "Attribution of 'prompt injection' is slightly contested: his 12 September 2022 post proposed the name and Ars Technica credits him with coining it, while The Economist later described the term as independently coined by Willison and others.",
    "Lanyrd's post-acquisition decline and shutdown is documented mainly by the Lanyrd Wikipedia article; primary sources on the wind-down were not located.",
    "This index samples his conference talks and podcast appearances; dozens of earlier Django-era talks and blog posts are not individually catalogued.",
  ],
  body: `Simon Willison is a British programmer whose public record runs in two long arcs: he helped invent one of the web's dominant frameworks, and then — through a self-run publishing apparatus — became the working practitioner's reference for large language models.

## Formation and Django

Born in January 1981 in the United Kingdom, Willison studied computer science at the University of Bath and began blogging in 2002, in his first year — a habit that now defines his public identity. In 2003 he took a "year in industry" placement at the Lawrence Journal-World newspaper in Lawrence, Kansas, working alongside Adrian Holovaty. Frustrated with their existing tools, the pair built an abstraction layer over their newsroom sites that they long called simply "the CMS"; released as open source in July 2005, it became the Django web framework. Willison announced it on his blog on 17 July 2005, crediting Holovaty as co-creator and noting Jacob Kaplan-Moss and designer Wilson Miner on the early team.

## Journalism, startups, and independence

After graduating in 2005 he worked at Yahoo on the Technology Development team and the early Fire Eagle geolocation service, then consulted on OpenID. In October 2008 he joined Guardian News & Media in London as a software architect. His signature project there arrived in June 2009: "Investigate your MP's expenses", a crowdsourcing application built in about a week that enlisted more than 20,000 volunteers to review 170,000 documents in its first 80 hours — an early landmark of data journalism and the Guardian's first live Django-powered app.

In 2010 he co-founded Lanyrd, a social conference directory, with Natalie Downe, building it while the couple travelled on their honeymoon. Lanyrd went through Y Combinator's Winter 2011 batch, raised roughly $1.4 million in seed funding, and was acquired by Eventbrite on 3 September 2013 — one of that company's first acquisitions. Willison relocated to San Francisco and worked at Eventbrite until July 2019, self-listed as Director of Architecture.

Since then he has been an independent open source developer. A 2019 JSK Journalism Fellowship at Stanford funded a year of work on tools for data journalism — the direct ancestor of his current occupation, which he describes as building open source tools around Datasette and SQLite.

## The Datasette ecosystem

Datasette, first released 13 November 2017, turns SQLite databases into browsable web interfaces and JSON APIs. Around it grew a methodical toolbelt: sqlite-utils (2019) for building databases, Dogsheep for repatriating personal data into a private warehouse, "git scraping" (named October 2020) for snapshotting third-party data into Git history, shot-scraper (2022) for automated screenshots and scraping, and llm (April 2023), a command-line tool with a plugin system for API-hosted and self-hosted models. In April 2025 he and Alex Garcia launched Datasette for Newsrooms on the hosted Datasette Cloud service. When the CIA discontinued the World Factbook in February 2026, he recovered the last downloadable edition into a public repository within a day — a characteristic gesture.

## The LLM era

On 12 September 2022, responding to Riley Goodside's demonstrations of tricking GPT-3 with malicious input, Willison proposed the name "prompt injection" — now the standard term for a class of attacks he still says has no reliable fix. He extended that adversarial framing in June 2025 with "the lethal trifecta": agents that combine private-data access, untrusted content, and external communication are exploitable, and the only dependable defense is removing a leg, not adding guardrails. His PyCon US 2024 keynote argued for "imitation intelligence" over "artificial intelligence"; his May 2024 post championed "slop" for unwanted AI-generated content; and in February 2026 he began the Agentic Engineering Patterns guide for professional work with coding agents. Press and podcasts routinely describe him as one of the most influential independent voices on applied AI — influence he attributes to nothing more exotic than blogging consistently.

## The practice underneath

The throughline is writing as engineering practice: the "perfect commit" bundling code, tests, and documentation; TILs that drop the publishing bar to "did I just learn something?"; weeknotes; annotated talk transcripts; and a policy of never publishing AI-generated prose under his own name. The blog, TIL repo, and project docs are not commentary on the work — they are the work's durability mechanism.

## What the record does not settle

Attribution has seams: The Economist has described "prompt injection" as independently coined by Willison and others. Reference coverage is thin — his Wikipedia article was nominated for deletion in 2026 — and no canonical project count exists. This index preserves those seams rather than smoothing them.

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
