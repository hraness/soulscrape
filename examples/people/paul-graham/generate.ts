#!/usr/bin/env bun
/** Generate examples/people/paul-graham/person-index.json with derived source ids. */

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

// --- Subject-controlled pages ---------------------------------------------

const bio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bio",
  url: "https://paulgraham.com/bio.html",
  publisher: "paulgraham.com",
  notes:
    "His own biography page: education, Viaweb, YC, book list, essay traffic; self-reported.",
});
const articles = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Essays",
  url: "https://www.paulgraham.com/articles.html",
  publisher: "paulgraham.com",
  notes: "The index of every essay on his site, newest first.",
});
const onlisp = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "On Lisp",
  url: "https://paulgraham.com/onlisp.html",
  publisher: "paulgraham.com",
  notes:
    "His page for On Lisp (Prentice Hall, 1993); the out-of-print book is freely downloadable there.",
});
const hackpaint = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Hackers & Painters",
  url: "https://www.paulgraham.com/hackpaint.html",
  publisher: "paulgraham.com",
  notes: "His page for the 2004 O'Reilly essay collection.",
});
const stillLife = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Still Life",
  url: "https://paulgraham.com/sl.html",
  publisher: "paulgraham.com",
  notes: "A painting of his own with his note on how and why he made it.",
});
const arcSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Arc",
  url: "http://arclanguage.org/",
  publisher: "arclanguage.org",
  notes:
    "The Arc language site, signed by Paul Graham and Robert Morris; hosts the releases, tutorial, and forum.",
});
const hackerNews = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Hacker News",
  url: "https://news.ycombinator.com/",
  publisher: "Y Combinator",
  notes:
    "The forum he created in 2007 as Startup News; operated by Y Combinator.",
});
const xProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Paul Graham (@paulg) on X",
  url: "https://x.com/paulg",
  publisher: "X",
  notes: "His public account; joined August 2010.",
});

// --- Essays and talks in his own words ------------------------------------

const avg = source({
  binding: "first_person",
  mediaType: "article",
  title: "Beating the Averages",
  url: "https://paulgraham.com/avg.html",
  publisher: "paulgraham.com",
  publishedAt: "2001-04",
  notes:
    "Derived from a talk at the 2001 Franz Developer Symposium; revised April 2003. The Viaweb/Lisp account and the Blub paradox.",
});
const nerds = source({
  binding: "first_person",
  mediaType: "article",
  title: "Why Nerds are Unpopular",
  url: "https://paulgraham.com/nerds.html",
  publisher: "paulgraham.com",
  publishedAt: "2003-02",
});
const hp = source({
  binding: "first_person",
  mediaType: "article",
  title: "Hackers and Painters",
  url: "https://paulgraham.com/hp.html",
  publisher: "paulgraham.com",
  publishedAt: "2003-05",
  notes:
    "Derived from a guest lecture at Harvard incorporating an earlier talk at Northeastern.",
});
const wealth = source({
  binding: "first_person",
  mediaType: "article",
  title: "How to Make Wealth",
  url: "https://paulgraham.com/wealth.html",
  publisher: "paulgraham.com",
  publishedAt: "2004-05",
});
const ageOfEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Age of the Essay",
  url: "https://paulgraham.com/essay.html",
  publisher: "paulgraham.com",
  publishedAt: "2004-09",
});
const start = source({
  binding: "first_person",
  mediaType: "article",
  title: "How to Start a Startup",
  url: "https://paulgraham.com/start.html",
  publisher: "paulgraham.com",
  publishedAt: "2005-03",
  notes:
    "Derived from his talk to the Harvard Computer Society — the talk he credits with nudging him toward YC.",
});
const summerFounder = source({
  binding: "first_person",
  mediaType: "article",
  title: "Summer Founders Program",
  url: "https://paulgraham.com/summerfounder.html",
  publisher: "paulgraham.com",
  publishedAt: "2005-03",
  notes:
    "The original Y Combinator announcement: an experimental replacement for the conventional summer job.",
});
const sfpRecap = source({
  binding: "first_person",
  mediaType: "article",
  title: "What I Did this Summer",
  url: "https://www.paulgraham.com/sfp.html",
  publisher: "paulgraham.com",
  publishedAt: "2005-10",
  notes:
    "His recap of the first batch: eight startups, founders aged 18–28, at most $20,000 per group.",
});
const arcOut = source({
  binding: "first_person",
  mediaType: "article",
  title: "Arc's Out",
  url: "https://paulgraham.com/arc0.html",
  publisher: "paulgraham.com",
  publishedAt: "2008-01-29",
});
const cities = source({
  binding: "first_person",
  mediaType: "article",
  title: "Cities and Ambition",
  url: "https://paulgraham.com/cities.html",
  publisher: "paulgraham.com",
  publishedAt: "2008-05",
});
const hnEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "What I've Learned from Hacker News",
  url: "https://paulgraham.com/hackernews.html",
  publisher: "paulgraham.com",
  publishedAt: "2009-02",
});
const makersSchedule = source({
  binding: "first_person",
  mediaType: "article",
  title: "Maker's Schedule, Manager's Schedule",
  url: "https://paulgraham.com/makersschedule.html",
  publisher: "paulgraham.com",
  publishedAt: "2009-07",
});
const schlep = source({
  binding: "first_person",
  mediaType: "article",
  title: "Schlep Blindness",
  url: "https://paulgraham.com/schlep.html",
  publisher: "paulgraham.com",
  publishedAt: "2012-01",
});
const ycstart = source({
  binding: "first_person",
  mediaType: "article",
  title: "How Y Combinator Started",
  url: "https://paulgraham.com/ycstart.html",
  publisher: "paulgraham.com",
  publishedAt: "2012-03",
  notes:
    "His own origin account: the March 11, 2005 walk home from dinner in Harvard Square.",
});
const growth = source({
  binding: "first_person",
  mediaType: "article",
  title: "Startup = Growth",
  url: "https://paulgraham.com/growth.html",
  publisher: "paulgraham.com",
  publishedAt: "2012-09",
});
const startupIdeas = source({
  binding: "first_person",
  mediaType: "article",
  title: "How to Get Startup Ideas",
  url: "https://paulgraham.com/startupideas.html",
  publisher: "paulgraham.com",
  publishedAt: "2012-11",
});
const ds = source({
  binding: "first_person",
  mediaType: "article",
  title: "Do Things that Don't Scale",
  url: "https://paulgraham.com/ds.html",
  publisher: "paulgraham.com",
  publishedAt: "2013-07",
});
const samaPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Sam Altman for President",
  url: "https://www.ycombinator.com/blog/sam-altman-for-president",
  publisher: "Y Combinator",
  publishedAt: "2014-02-21",
  authors: ["Paul Graham"],
  notes:
    "His announcement that Sam Altman would lead YC starting with the next batch.",
});
const aord = source({
  binding: "first_person",
  mediaType: "article",
  title: "Default Alive or Default Dead?",
  url: "https://paulgraham.com/aord.html",
  publisher: "paulgraham.com",
  publishedAt: "2015-10",
});
const jessica = source({
  binding: "first_person",
  mediaType: "article",
  title: "Jessica Livingston",
  url: "https://paulgraham.com/jessica.html",
  publisher: "paulgraham.com",
  publishedAt: "2015-11",
});
const ineq = source({
  binding: "first_person",
  mediaType: "article",
  title: "Economic Inequality",
  url: "https://paulgraham.com/ineq.html",
  publisher: "paulgraham.com",
  publishedAt: "2016-01",
});
const bel = source({
  binding: "first_person",
  mediaType: "article",
  title: "Bel",
  url: "https://paulgraham.com/bel.html",
  publisher: "paulgraham.com",
  publishedAt: "2019-10",
  notes:
    "His note releasing Bel, a Lisp dialect spec written in itself, kept in the formal phase.",
});
const worked = source({
  binding: "first_person",
  mediaType: "article",
  title: "What I Worked On",
  url: "https://paulgraham.com/worked.html",
  publisher: "paulgraham.com",
  publishedAt: "2021-02",
  notes:
    "His memoir-in-essay covering painting, Interleaf, Viaweb, essays, Arc, Hacker News, and the YC handoff. The main first-person source for his life arc.",
});
const goodTaste = source({
  binding: "first_person",
  mediaType: "article",
  title: "Is There Such a Thing as Good Taste?",
  url: "https://www.paulgraham.com/goodtaste.html",
  publisher: "paulgraham.com",
  publishedAt: "2021-11",
  notes: "Derived from a talk at the Cambridge Union.",
});
const greatWork = source({
  binding: "first_person",
  mediaType: "article",
  title: "How to Do Great Work",
  url: "https://paulgraham.com/greatwork.html",
  publisher: "paulgraham.com",
  publishedAt: "2023-07",
});
const founderMode = source({
  binding: "first_person",
  mediaType: "article",
  title: "Founder Mode",
  url: "https://paulgraham.com/foundermode.html",
  publisher: "paulgraham.com",
  publishedAt: "2024-09",
});
const lec03 = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Lecture 3: Before the Startup — How to Start a Startup",
  url: "https://startupclass.samaltman.com/courses/lec03/",
  publisher: "How to Start a Startup",
  publishedAt: "2014-10",
  authors: ["Paul Graham"],
  notes:
    "Course page for his Stanford CS183B lecture with video and transcript.",
});

// --- Official records and catalogs -----------------------------------------

const sec = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Yahoo! Inc. Form 8-K — Agreement to acquire Viaweb, Inc.",
  url: "https://www.sec.gov/Archives/edgar/data/1011006/000104746998023329/0001047469-98-023329.txt",
  publisher: "U.S. Securities and Exchange Commission",
  publishedAt: "1998-06-08",
  notes:
    "The filed announcement: ~455,000 Yahoo shares for all Viaweb stock and options, valued at approximately $49 million.",
});
const ycAbout = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "What Happens at YC",
  url: "https://www.ycombinator.com/about/",
  publisher: "Y Combinator",
});
const ycPrinciples = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Y Combinator's Founding Principles",
  url: "https://www.ycombinator.com/principles",
  publisher: "Y Combinator",
});
const oreilly = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Hackers & Painters — O'Reilly catalog",
  url: "https://www.oreilly.com/library/view/hackers-painters/0596006624/",
  publisher: "O'Reilly Media",
  notes: "Publisher catalog page; ISBN 0596006624, 2004.",
});

// --- Interviews ------------------------------------------------------------

const foundersAtWork = source({
  binding: "interview",
  mediaType: "book",
  title: "Paul Graham, Cofounder, Viaweb — Founders at Work, Chapter 15",
  url: "https://www.oreilly.com/library/view/founders-at-work/9781590597149/Chapter15.html",
  publisher: "Apress",
  publishedAt: "2007",
  authors: ["Jessica Livingston"],
  notes:
    "Chapter-length interview on Viaweb's early days, conducted by Jessica Livingston for her book.",
});
const pullRequest = source({
  binding: "interview",
  mediaType: "article",
  title: "PR interviews Paul Graham",
  url: "https://www.thepullrequest.com/p/pr-interviews-paul-graham",
  publisher: "The Pull Request",
  publishedAt: "2020-09-04",
  authors: ["Antonio García Martínez"],
  notes:
    "Q&A on the move to England, journalism, rejected companies, parenthood, and whether he still invests.",
});
const cowen = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Paul Graham on Ambition, Art, and Evaluating Talent — Conversations with Tyler (Ep. 186)",
  url: "https://conversationswithtyler.com/episodes/paul-graham/",
  publisher: "Conversations with Tyler",
  publishedAt: "2023-08",
  authors: ["Tyler Cowen"],
  notes:
    "Recorded at his home in the English countryside on July 15, 2023; audio and full transcript.",
});

// --- Reporting ---------------------------------------------------------------

const wiredViaweb = source({
  binding: "reporting",
  mediaType: "article",
  title: "Yahoo Buys Portal-Puzzle Piece",
  url: "https://www.wired.com/1998/06/yahoo-buys-portal-puzzle-piece/",
  publisher: "Wired",
  publishedAt: "1998-06",
  authors: ["Kaitlin Quistgaard"],
  notes:
    "Contemporaneous report: 21-person Viaweb, Cambridge, ~$49 million in Yahoo stock.",
});
const cnnViaweb = source({
  binding: "reporting",
  mediaType: "article",
  title: "Yahoo! buys Viaweb for $49M in stock",
  url: "https://money.cnn.com/1998/06/08/technology/yahoo/",
  publisher: "CNNfn",
  publishedAt: "1998-06-08",
});
const wiredSfp = source({
  binding: "reporting",
  mediaType: "article",
  title: "Stars Rise at Startup Summer Camp",
  url: "https://www.wired.com/2005/09/stars-rise-at-startup-summer-camp/",
  publisher: "Wired",
  publishedAt: "2005-09",
  notes:
    "Contemporaneous report on the first Summer Founders Program: 227 applications, eight funded teams including Reddit's founders.",
});
const inc = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Start-up Guru",
  url: "https://www.inc.com/magazine/20090601/the-start-up-guru-y-combinators-paul-graham.html",
  publisher: "Inc.",
  publishedAt: "2009-06-01",
  authors: ["Max Chafkin"],
  notes:
    "Feature profile: 145 companies funded by mid-2009, original ~$6,000-per-founder terms, and the 'Not me' origin anecdote.",
});
const cnnIneq = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "This tech investor calls himself a 'manufacturer of income inequality'",
  url: "https://money.cnn.com/2016/01/04/technology/y-combinator-paul-graham-income-inequality/index.html",
  publisher: "CNNMoney",
  publishedAt: "2016-01-04",
  authors: ["Sara Ashley O'Brien"],
});
const nytFounderMode = source({
  binding: "reporting",
  mediaType: "article",
  title: "Why Silicon Valley Is Talking About Founder Mode",
  url: "https://www.nytimes.com/2024/09/03/business/dealbook/founder-mode-chesky-graham.html",
  publisher: "The New York Times",
  publishedAt: "2024-09-03",
});

// --- Reference and archive ---------------------------------------------------

const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Paul Graham (programmer)",
  url: "https://en.wikipedia.org/wiki/Paul_Graham_(programmer)",
  publisher: "Wikipedia",
  notes: "Used for discovery and cross-checks, not as sole authority.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Paul Graham (Q92650)",
  url: "https://www.wikidata.org/wiki/Q92650",
  publisher: "Wikidata",
});
const wikipediaViaweb = source({
  binding: "reference",
  mediaType: "article",
  title: "Viaweb",
  url: "https://en.wikipedia.org/wiki/Viaweb",
  publisher: "Wikipedia",
});
const wikipediaHn = source({
  binding: "reference",
  mediaType: "article",
  title: "Hacker News",
  url: "https://en.wikipedia.org/wiki/Hacker_News",
  publisher: "Wikipedia",
});
const wikipediaArc = source({
  binding: "reference",
  mediaType: "article",
  title: "Arc (programming language)",
  url: "https://en.wikipedia.org/wiki/Arc_(programming_language)",
  publisher: "Wikipedia",
});
const announcingNews = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Announcing Y Combinator Startup News",
  url: "https://web.archive.org/web/20070222125635/http:/ycombinator.com/announcingnews.html",
  publisher: "Y Combinator (via Internet Archive)",
  publishedAt: "2007-02-20",
  notes:
    "Wayback capture of his announcement that the user-ranked news site had launched the previous day.",
});

const S = {
  bio: bio.id,
  articles: articles.id,
  onlisp: onlisp.id,
  hackpaint: hackpaint.id,
  stillLife: stillLife.id,
  arcSite: arcSite.id,
  hackerNews: hackerNews.id,
  xProfile: xProfile.id,
  avg: avg.id,
  nerds: nerds.id,
  hp: hp.id,
  wealth: wealth.id,
  ageOfEssay: ageOfEssay.id,
  start: start.id,
  summerFounder: summerFounder.id,
  sfpRecap: sfpRecap.id,
  arcOut: arcOut.id,
  cities: cities.id,
  hnEssay: hnEssay.id,
  makersSchedule: makersSchedule.id,
  schlep: schlep.id,
  ycstart: ycstart.id,
  growth: growth.id,
  startupIdeas: startupIdeas.id,
  ds: ds.id,
  samaPost: samaPost.id,
  aord: aord.id,
  jessica: jessica.id,
  ineq: ineq.id,
  bel: bel.id,
  worked: worked.id,
  goodTaste: goodTaste.id,
  greatWork: greatWork.id,
  founderMode: founderMode.id,
  lec03: lec03.id,
  sec: sec.id,
  ycAbout: ycAbout.id,
  ycPrinciples: ycPrinciples.id,
  oreilly: oreilly.id,
  foundersAtWork: foundersAtWork.id,
  pullRequest: pullRequest.id,
  cowen: cowen.id,
  wiredViaweb: wiredViaweb.id,
  cnnViaweb: cnnViaweb.id,
  wiredSfp: wiredSfp.id,
  inc: inc.id,
  cnnIneq: cnnIneq.id,
  nytFounderMode: nytFounderMode.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  wikipediaViaweb: wikipediaViaweb.id,
  wikipediaHn: wikipediaHn.id,
  wikipediaArc: wikipediaArc.id,
  announcingNews: announcingNews.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-paul-graham",
  generatedAt: "2026-09-25T21:57:30Z",
  subject: {
    kind: "person",
    handle: "paul-graham",
    displayName: "Paul Graham",
    alsoKnownAs: ["pg"],
    summary:
      "English-American programmer, essayist, and investor: co-founder of Viaweb (sold to Yahoo in 1998), author of On Lisp, ANSI Common Lisp, and Hackers & Painters, co-founder of Y Combinator (2005), creator of Hacker News, designer of the Arc and Bel Lisp dialects, and author of two decades of essays at paulgraham.com. Trained as a painter at RISD and the Accademia di Belle Arti in Florence.",
    identity: {
      wikidataId: "Q92650",
      officialSite: "https://paulgraham.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Paul_Graham_(programmer)",
      profiles: [
        "https://x.com/paulg",
        "https://news.ycombinator.com/user?id=pg",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:57:30Z",
    coverage: [
      "biography",
      "work",
      "philosophy",
      "beliefs",
      "projects",
      "media",
      "writing",
    ],
  },
  sources: [
    bio,
    articles,
    onlisp,
    hackpaint,
    stillLife,
    arcSite,
    hackerNews,
    xProfile,
    avg,
    nerds,
    hp,
    wealth,
    ageOfEssay,
    start,
    summerFounder,
    sfpRecap,
    arcOut,
    cities,
    hnEssay,
    makersSchedule,
    schlep,
    ycstart,
    growth,
    startupIdeas,
    ds,
    samaPost,
    aord,
    jessica,
    ineq,
    bel,
    worked,
    goodTaste,
    greatWork,
    founderMode,
    lec03,
    sec,
    ycAbout,
    ycPrinciples,
    oreilly,
    foundersAtWork,
    pullRequest,
    cowen,
    wiredViaweb,
    cnnViaweb,
    wiredSfp,
    inc,
    cnnIneq,
    nytFounderMode,
    wikipedia,
    wikidata,
    wikipediaViaweb,
    wikipediaHn,
    wikipediaArc,
    announcingNews,
  ],
  claims: [
    {
      id: "claim-born-1964",
      kind: "fact",
      text: "Paul Graham was born on November 13, 1964, in Weymouth, Dorset, England.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-pittsburgh-childhood",
      kind: "fact",
      text: "His father, from Pwllheli, Wales, designed nuclear reactors for Westinghouse; the family moved to Pittsburgh, Pennsylvania in 1968, where Graham attended Gateway High School and began writing computer code.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-education",
      kind: "fact",
      text: "He earned a BA with a major in philosophy from Cornell University in 1986, then an MS (1988) and PhD (1990) in computer science from Harvard University; his doctoral thesis was 'The State of a Program and Its Uses.'",
      sourceIds: [S.wikipedia, S.bio],
    },
    {
      id: "claim-art-school",
      kind: "fact",
      text: "After graduate school he studied painting at the Rhode Island School of Design and at the Accademia di Belle Arti in Florence.",
      sourceIds: [S.bio, S.wikipedia, S.worked],
    },
    {
      id: "claim-interleaf",
      kind: "fact",
      text: "In the early 1990s he took a programming job at Interleaf, the document-software company whose scripting language was a Lisp dialect; in his own telling he was an irresponsible employee who spent much of the year covertly writing On Lisp.",
      sourceIds: [S.worked],
    },
    {
      id: "claim-onlisp-1993",
      kind: "fact",
      text: "His first book, 'On Lisp: Advanced Techniques for Common Lisp' (Prentice Hall, 1993), is a study of advanced Lisp technique organized around bottom-up programming and macros; it is out of print and downloadable free from his site.",
      sourceIds: [S.onlisp, S.wikipedia],
    },
    {
      id: "claim-acl-1995",
      kind: "fact",
      text: "His second book, 'ANSI Common Lisp' (Prentice Hall, 1995), is a tutorial and reference for the then-new standardized dialect.",
      sourceIds: [S.bio, S.wikipedia],
    },
    {
      id: "claim-viaweb-founded",
      kind: "fact",
      text: "In the summer of 1995 he and Robert Morris started Viaweb in Cambridge, Massachusetts — software that let users build and host online stores through a web browser; Trevor Blackwell joined shortly after.",
      sourceIds: [S.avg, S.wikipediaViaweb, S.foundersAtWork],
    },
    {
      id: "claim-viaweb-seed",
      kind: "fact",
      text: "Viaweb started on $10,000 in seed funding plus legal work and business advice from a friend's husband, in exchange for 10% of the company — a deal Graham says later became the model for Y Combinator's.",
      sourceIds: [S.worked],
    },
    {
      id: "claim-first-web-app",
      kind: "fact",
      text: "In his telling, Viaweb was the first web-based application — software running on the server controlled through ordinary web pages — and he claims the company was the first application service provider.",
      sourceIds: [S.avg, S.bio, S.wikipediaViaweb],
    },
    {
      id: "claim-viaweb-lisp",
      kind: "fact",
      text: "Viaweb's software was written primarily in Lisp, then unusual for an end-user application; he credits the language with the speed that let a small team outrun larger competitors.",
      sourceIds: [S.avg, S.wikipediaViaweb],
    },
    {
      id: "claim-yahoo-acquisition",
      kind: "fact",
      text: "Yahoo announced the Viaweb acquisition on June 8, 1998, issuing roughly 455,000 shares of Yahoo common stock — valued at approximately $49 million — for all Viaweb shares, options, and warrants; the deal closed June 10 and the product became Yahoo Store.",
      sourceIds: [S.sec, S.cnnViaweb, S.wiredViaweb, S.wikipediaViaweb],
    },
    {
      id: "claim-essays-2001",
      kind: "fact",
      text: "In 2001 he began publishing essays on paulgraham.com; his bio reports the site draws around 25 million page views per year — a self-reported figure.",
      sourceIds: [S.bio],
    },
    {
      id: "claim-essay-corpus",
      kind: "fact",
      text: "The essay index on his site lists well over a hundred essays published from 2001 to the present, spanning startups, programming languages, work, writing, art, and society.",
      sourceIds: [S.articles],
    },
    {
      id: "claim-hp-book",
      kind: "fact",
      text: "'Hackers & Painters: Big Ideas from the Computer Age,' a hardcover collection of his essays, was published by O'Reilly in 2004 (ISBN 0596006624).",
      sourceIds: [S.oreilly, S.hackpaint],
    },
    {
      id: "claim-harvard-talk",
      kind: "fact",
      text: "In March 2005 he gave a talk to the Harvard Computer Society on starting startups; the essay derived from it, 'How to Start a Startup,' argues success requires good people, something customers actually want, and spending as little money as possible.",
      sourceIds: [S.start, S.inc],
    },
    {
      id: "claim-yc-decision",
      kind: "fact",
      text: "On March 11, 2005, walking home from dinner in Harvard Square, he and Jessica Livingston decided to start their own investment firm; Robert Morris and Trevor Blackwell joined as co-founders, each putting in $50,000 to his $100,000, and the firm started with $200,000 of the founders' own money.",
      sourceIds: [S.ycstart],
    },
    {
      id: "claim-sfp-first-batch",
      kind: "fact",
      text: "YC's first project was the Summer Founders Program, announced in late March 2005 as an experimental replacement for the conventional summer job; about 227 teams applied and eight startups were funded that summer, including the recent UVA graduates who built Reddit.",
      sourceIds: [S.summerFounder, S.sfpRecap, S.wiredSfp],
    },
    {
      id: "claim-batch-model-accident",
      kind: "fact",
      text: "He says the batch model — funding a synchronous cohort twice a year — was discovered by accident: they funded a bunch of startups at once only because a summer program seemed the fastest way to learn angel investing.",
      sourceIds: [S.ycstart, S.worked],
    },
    {
      id: "claim-yc-scale",
      kind: "fact",
      text: "His bio reports YC has funded more than 3,000 startups, including Airbnb, Dropbox, Stripe, and Reddit; YC now runs the three-month program four times a year and invests a standard amount (currently $500,000) per company.",
      sourceIds: [S.bio, S.ycAbout],
    },
    {
      id: "claim-jessica-role",
      kind: "fact",
      text: "He credits Jessica Livingston with defining early YC's culture — 'the culture was the product' — and with doing the founder interviews whose judgments he says were rarely wrong; his essay 'Jessica Livingston' was written partly to correct 'one-man show' framings.",
      sourceIds: [S.jessica],
    },
    {
      id: "claim-hn-launch",
      kind: "fact",
      text: "He launched what became Hacker News in February 2007 as Y Combinator Startup News — partly for YC's own use once it had funded about a hundred people — and it took its current name on August 14, 2007.",
      sourceIds: [S.announcingNews, S.wikipediaHn, S.hnEssay],
    },
    {
      id: "claim-hn-arc",
      kind: "fact",
      text: "Hacker News is written in Arc, the Lisp dialect he co-developed, and served as its real-world proving application; he also wrote YC's internal software in Arc.",
      sourceIds: [S.wikipediaHn, S.hnEssay, S.worked],
    },
    {
      id: "claim-arc-release",
      kind: "fact",
      text: "On January 29, 2008, he and Robert Morris released the first public version of Arc, a Lisp dialect designed for 'exploratory programming,' implemented on MzScheme (now Racket).",
      sourceIds: [S.arcOut, S.wikipediaArc, S.arcSite],
    },
    {
      id: "claim-married-2008",
      kind: "fact",
      text: "He married Jessica Livingston in 2008; they have two children.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-sama-handoff",
      kind: "fact",
      text: "On February 21, 2014, he announced that Sam Altman — a founder in YC's first 2005 batch — would become president of Y Combinator starting with the next batch; Graham kept doing office hours but gave up leadership.",
      sourceIds: [S.samaPost],
    },
    {
      id: "claim-handoff-backstory",
      kind: "fact",
      text: "In 'What I Worked On' he recounts deciding in 2012 to hand YC over, asking Livingston first (she declined), recruiting Altman through 2013, and stepping back fully after the winter 2014 batch's Demo Day; Robert Morris retired with him while Livingston and Blackwell became ordinary partners.",
      sourceIds: [S.worked],
    },
    {
      id: "claim-england-2016",
      kind: "fact",
      text: "Born in England, he returned with his family in 2016 — planning at first to stay only a year — and settled in the English countryside rather than London.",
      sourceIds: [S.wikipedia, S.pullRequest],
    },
    {
      id: "claim-bel-2019",
      kind: "fact",
      text: "In October 2019 he published Bel, a spec for a new Lisp dialect written in itself — a deliberate echo of McCarthy's original Lisp, kept in the formal phase rather than implemented for real machines.",
      sourceIds: [S.bel],
    },
    {
      id: "claim-great-work-2023",
      kind: "fact",
      text: "His July 2023 essay 'How to Do Great Work' — among his longest — reduces doing great work to four factors (ability, interest, effort, luck) and four steps, with curiosity as the driver of each.",
      sourceIds: [S.greatWork],
    },
    {
      id: "claim-founder-mode-2024",
      kind: "fact",
      text: "His September 2024 essay 'Founder Mode,' prompted by a Brian Chesky talk at a YC event, argued founders can run companies in ways professional managers cannot; the term set off an industry debate covered by the New York Times, Fortune, and CNN within days.",
      sourceIds: [S.founderMode, S.nytFounderMode],
    },
    {
      id: "claim-founders-at-work",
      kind: "fact",
      text: "Jessica Livingston's interview collection 'Founders at Work' (Apress, 2007) devotes a chapter to him recounting Viaweb's early days.",
      sourceIds: [S.foundersAtWork],
    },
    {
      id: "claim-arc-status",
      kind: "fact",
      text: "Arc's most recent stable release is 3.2 (October 2018); per the Wikipedia record, YC has largely replaced the original implementation with 'Clarc' running on the SBCL Common Lisp.",
      sourceIds: [S.wikipediaArc],
    },
    {
      id: "claim-ineq-essay",
      kind: "fact",
      text: "His January 2016 essay 'Economic Inequality' — in which he calls himself a 'manufacturer of economic inequality' — drew national coverage and a published point-by-point reply to critic Ezra Klein.",
      sourceIds: [S.ineq, S.cnnIneq],
    },
    {
      id: "claim-blub-paradox",
      kind: "stated_belief",
      text: "He argues programmers rank languages by familiarity — the 'Blub paradox' — so the power of a language like Lisp stays invisible to anyone who has only used less powerful ones; Lisp, he says, was Viaweb's 'secret weapon.'",
      sourceIds: [S.avg],
    },
    {
      id: "claim-makers",
      kind: "stated_belief",
      text: "He holds that hackers and painters are the same kind of creature — makers, not scientists — and that making good things takes taste, empathy for the audience, and the willingness to start from a sketch.",
      sourceIds: [S.hp],
    },
    {
      id: "claim-good-taste",
      kind: "stated_belief",
      text: "He argues good taste exists by reductio: deny it and no art can be good, no artist skilled, and no design better than another — conclusions he takes as obviously false.",
      sourceIds: [S.goodTaste],
    },
    {
      id: "claim-maker-schedule",
      kind: "stated_belief",
      text: "He distinguishes the maker's schedule — work in units of half a day at least — from the manager's schedule of hourly slots, and argues a single meeting can destroy a maker's day, so organizations should protect long open blocks.",
      sourceIds: [S.makersSchedule],
    },
    {
      id: "claim-dont-scale",
      kind: "stated_belief",
      text: "His standard early-stage advice is to do things that don't scale: recruit users one by one, deliver an almost insanely good early experience, and deliberately keep the initial market narrow until it burns hot.",
      sourceIds: [S.ds],
    },
    {
      id: "claim-default-alive",
      kind: "stated_belief",
      text: "He tells founders to ask early whether the company is 'default alive' — on current trajectory reaching profitability before the money runs out — and calls overhiring the biggest killer of startups that raise money.",
      sourceIds: [S.aord],
    },
    {
      id: "claim-schlep-blindness",
      kind: "stated_belief",
      text: "He describes 'schlep blindness': founders unconsciously flinch from ideas that require tedious or unpleasant work, so valuable startup ideas sit unclaimed behind disliked chores.",
      sourceIds: [S.schlep],
    },
    {
      id: "claim-startup-growth",
      kind: "stated_belief",
      text: "He defines a startup as a company designed to grow fast — growth rate is the one number that matters — which is why he says most newly founded businesses are not startups at all.",
      sourceIds: [S.growth],
    },
    {
      id: "claim-startup-ideas",
      kind: "stated_belief",
      text: "He argues the way to get startup ideas is not to try to think of them but to notice problems — preferably ones you have yourself; the best ideas are things founders want, can build, and few others realize are worth doing.",
      sourceIds: [S.startupIdeas],
    },
    {
      id: "claim-cities-ambition",
      kind: "stated_belief",
      text: "He argues each city sends its inhabitants a distinct message — New York about money, Cambridge about ideas, Silicon Valley about power — so where you live quietly determines what ambitions seem worth having.",
      sourceIds: [S.cities],
    },
    {
      id: "claim-wealth-vs-money",
      kind: "stated_belief",
      text: "He distinguishes wealth from money: wealth is what people want, so startups get rich by creating it, not by taking slices of a fixed pie — his standing rebuttal to the 'pie fallacy.'",
      sourceIds: [S.wealth],
    },
    {
      id: "claim-inequality-belief",
      kind: "stated_belief",
      text: "He argues economic inequality has multiple causes — some bad (tax loopholes, incarceration), some good (startups) — so attacking inequality itself is doubly mistaken; the right targets are the bad causes, above all poverty.",
      sourceIds: [S.ineq],
    },
    {
      id: "claim-great-work-belief",
      kind: "stated_belief",
      text: "He argues great work is a depth-first search rooted in the desire to do it: pick work where ability and deep interest intersect, get to the frontier, notice the gaps, and explore the promising ones — with curiosity driving all four steps.",
      sourceIds: [S.greatWork],
    },
    {
      id: "claim-founder-mode-belief",
      kind: "stated_belief",
      text: "He claims 'hire good people and give them room' is the playbook for running a company you didn't found — that founders can and should run in 'founder mode' instead, though he concedes no one yet knows its limits.",
      sourceIds: [S.founderMode],
    },
    {
      id: "claim-fund-hackers",
      kind: "stated_belief",
      text: "The principles he says underlie YC: investors should make more, smaller investments; fund hackers rather than 'suits'; and be willing to back much younger founders.",
      sourceIds: [S.ycstart],
    },
    {
      id: "claim-prestige-danger",
      kind: "stated_belief",
      text: "He says the most conspicuous pattern of his life is that unglamorous work paid off — still life, Lisp, essays on his own site, a 'lame'-seeming incubator — and generalizes that prestige is a danger sign because the low end eats the high end.",
      sourceIds: [S.worked],
    },
    {
      id: "claim-essay-as-discovery",
      kind: "stated_belief",
      text: "He treats the essay as an instrument for figuring things out — writing as exploration rather than the school-taught five-paragraph defense of a thesis — and publishes essays to discover what he thinks.",
      sourceIds: [S.ageOfEssay],
    },
    {
      id: "claim-nerds",
      kind: "stated_belief",
      text: "He argues nerds are unpopular mainly because popularity costs effort they would rather spend on things that matter to them — and that the same single-mindedness later makes them powerful.",
      sourceIds: [S.nerds],
    },
    {
      id: "claim-self-narrated-record",
      kind: "pattern",
      text: "Most detailed history of Viaweb and early YC exists primarily in his own essays and the interview he gave Livingston; outside the SEC filing and contemporaneous press, the record is largely self-narrated.",
      sourceIds: [S.worked, S.ycstart, S.foundersAtWork, S.sec],
    },
    {
      id: "claim-essays-to-institutions",
      kind: "pattern",
      text: "His writing repeatedly converts into institutions and vocabulary: essays on startups seeded YC's deal flow, essays and comments seeded Hacker News, and essays like 'Founder Mode' keep setting industry language.",
      sourceIds: [S.ycstart, S.hnEssay, S.founderMode, S.nytFounderMode],
    },
    {
      id: "claim-unfashionable-bets",
      kind: "pattern",
      text: "Across five decades his major projects — Lisp, still-life painting, essays on a personal site, an incubator that looked lame — were unglamorous when he took them up; he names the pattern himself.",
      sourceIds: [S.worked, S.avg],
    },
    {
      id: "claim-yc-doctrine",
      kind: "pattern",
      text: "Essays written as YC operating advice — do things that don't scale, default alive or dead, startup equals growth — have been absorbed as canonical startup doctrine well beyond YC's portfolio.",
      sourceIds: [S.ds, S.aord, S.growth, S.inc],
    },
    {
      id: "claim-return-to-writing",
      kind: "pattern",
      text: "After stepping back from YC in 2014 and moving to England in 2016, he returned to writing at increasing length and cadence — 'What I Worked On,' 'How to Do Great Work,' 'Founder Mode' — telling an interviewer that investing always felt like the accident and writing and programming the life.",
      sourceIds: [S.worked, S.greatWork, S.founderMode, S.pullRequest],
    },
    {
      id: "claim-maker-identity",
      kind: "pattern",
      text: "Painting and programming stay braided through his whole career — RISD and Florence, the 'Hackers and Painters' framing, essays on taste, still lifes made in parallel with startups — and he consistently frames hacking as making, not engineering.",
      sourceIds: [S.bio, S.hp, S.goodTaste, S.stillLife],
    },
    {
      id: "claim-sale-price-varies",
      kind: "speculation",
      text: "The sale price is reported with different precision: Yahoo's filing and CNNfn say approximately $49 million; reference records give $49.6 million — and the announced ~455,000 shares differ from the filed 393,591 shares plus assumed options at completion.",
      sourceIds: [S.sec, S.cnnViaweb, S.wikipedia, S.wikipediaViaweb],
    },
    {
      id: "claim-yc-credit-split",
      kind: "speculation",
      text: "How much of YC's early success was the batch model versus the man is unresolved: his own account stresses accidents and Livingston's contribution, while press profiles cast him as the draw founders came for.",
      sourceIds: [S.ycstart, S.jessica, S.inc],
    },
    {
      id: "claim-arc-future",
      kind: "speculation",
      text: "Arc's trajectory is uncertain: he promised to keep breaking the language without notice, the last stable release is from 2018, and YC's own stack has reportedly moved to a Common Lisp variant.",
      sourceIds: [S.arcOut, S.arcSite, S.wikipediaArc],
    },
    {
      id: "claim-founder-mode-debate",
      kind: "speculation",
      text: "Whether 'founder mode' names a durable management doctrine or a slogan that licenses founder overreach remains contested; he himself wrote that its limits are not yet known.",
      sourceIds: [S.founderMode, S.nytFounderMode],
    },
    {
      id: "claim-retired-label",
      kind: "speculation",
      text: "He is often described as retired since 2014, but the label is loose: he still invests occasionally at Demo Day — 'pretty haphazardly,' by his own account — and writes essays full-time.",
      sourceIds: [S.pullRequest, S.worked],
    },
    {
      id: "claim-traffic-self-reported",
      kind: "speculation",
      text: "The reach claims for his essays — around 25 million page views a year — are self-reported site figures without independent audit, as are priority claims like 'first web-based application.'",
      sourceIds: [S.bio, S.avg],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1964-11-13",
      title: "Born in Weymouth, Dorset, England",
      summary:
        "Father a Welsh nuclear-reactor designer for Westinghouse; the family moved to Pittsburgh in 1968.",
      location: "Weymouth, Dorset, England",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-cornell",
      kind: "education",
      date: "1986",
      title: "BA in philosophy, Cornell University",
      organization: "Cornell University",
      organizationHandle: "cornell-university",
      sourceIds: [S.wikipedia, S.bio],
    },
    {
      id: "event-harvard",
      kind: "education",
      date: "1988",
      end: "1990",
      title: "MS then PhD in computer science, Harvard University",
      summary:
        "Doctoral thesis: 'The State of a Program and Its Uses' (1990).",
      organization: "Harvard University",
      organizationHandle: "harvard-university",
      sourceIds: [S.wikipedia, S.bio],
    },
    {
      id: "event-art-school",
      kind: "education",
      date: "1990",
      title: "Studied painting at RISD and the Accademia di Belle Arti",
      summary:
        "Turned from computer science to painting after graduate school; his money ran out in Florence.",
      location: "Providence and Florence",
      sourceIds: [S.bio, S.worked, S.wikipedia],
    },
    {
      id: "event-onlisp",
      kind: "publication",
      date: "1993",
      title: "On Lisp published by Prentice Hall",
      summary:
        "His study of macros and bottom-up programming; now out of print and free on his site.",
      sourceIds: [S.onlisp],
    },
    {
      id: "event-acl",
      kind: "publication",
      date: "1995",
      title: "ANSI Common Lisp published by Prentice Hall",
      sourceIds: [S.bio],
    },
    {
      id: "event-viaweb",
      kind: "founded",
      date: "1995-07",
      title: "Co-founds Viaweb in Cambridge, Massachusetts",
      summary:
        "With Robert Morris; Trevor Blackwell joined shortly after. Software for building online stores through a browser, written mostly in Lisp, started on $10,000 of seed funding.",
      organization: "Viaweb",
      organizationHandle: "viaweb",
      location: "Cambridge, Massachusetts",
      sourceIds: [S.avg, S.wikipediaViaweb, S.worked],
    },
    {
      id: "event-yahoo-sale",
      kind: "milestone",
      date: "1998-06-08",
      title: "Yahoo announces acquisition of Viaweb",
      summary:
        "Roughly 455,000 Yahoo shares, valued at approximately $49 million; the deal closed June 10 and Viaweb became Yahoo Store.",
      organization: "Yahoo",
      organizationHandle: "yahoo",
      sourceIds: [S.sec, S.cnnViaweb, S.wiredViaweb],
    },
    {
      id: "event-essays-begin",
      kind: "milestone",
      date: "2001",
      title: "Begins publishing essays at paulgraham.com",
      summary:
        "'Beating the Averages' (2001, revised 2003) — the Viaweb/Lisp account and the Blub paradox — became the early signature piece.",
      sourceIds: [S.bio, S.avg],
    },
    {
      id: "event-hp-book",
      kind: "publication",
      date: "2004-05",
      title: "Hackers & Painters published by O'Reilly",
      summary:
        "The essay collection that made him a canonical tech writer (ISBN 0596006624).",
      sourceIds: [S.oreilly, S.hackpaint],
    },
    {
      id: "event-yc-decision",
      kind: "founded",
      date: "2005-03-11",
      title: "Decides to start what becomes Y Combinator",
      summary:
        "On a walk home from dinner in Harvard Square, he and Jessica Livingston decided to start their own investment firm; Robert Morris and Trevor Blackwell joined as co-founders with $200,000 among the four.",
      organization: "Y Combinator",
      organizationHandle: "y-combinator",
      location: "Cambridge, Massachusetts",
      sourceIds: [S.ycstart],
    },
    {
      id: "event-first-batch",
      kind: "project",
      date: "2005",
      title: "First Summer Founders Program funds eight startups",
      summary:
        "About 227 teams applied; eight were funded, including the pair who built Reddit. The synchronous batch became YC's signature model.",
      organization: "Y Combinator",
      organizationHandle: "y-combinator",
      sourceIds: [S.sfpRecap, S.wiredSfp, S.summerFounder],
    },
    {
      id: "event-hn-launch",
      kind: "founded",
      date: "2007-02-19",
      title: "Launches Y Combinator Startup News",
      summary:
        "A user-ranked news site written in Arc, built partly so the growing YC community could exchange links.",
      organization: "Y Combinator",
      organizationHandle: "y-combinator",
      sourceIds: [S.announcingNews, S.wikipediaHn],
    },
    {
      id: "event-hn-renamed",
      kind: "milestone",
      date: "2007-08-14",
      title: "Startup News renamed Hacker News",
      summary:
        "The focus broadened past startups to whatever gratifies intellectual curiosity.",
      sourceIds: [S.wikipediaHn],
    },
    {
      id: "event-arc-release",
      kind: "project",
      date: "2008-01-29",
      title: "Releases Arc",
      summary:
        "The first public version of the Lisp dialect he developed with Robert Morris, designed for exploratory programming.",
      sourceIds: [S.arcOut, S.wikipediaArc, S.arcSite],
    },
    {
      id: "event-married",
      kind: "other",
      date: "2008",
      title: "Marries Jessica Livingston",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-yc-handoff",
      kind: "role",
      date: "2014-02-21",
      title: "Hands Y Combinator presidency to Sam Altman",
      summary:
        "Announced on the YC blog; he kept doing office hours but gave up leadership, and co-founder Robert Morris retired alongside him.",
      organization: "Y Combinator",
      organizationHandle: "y-combinator",
      sourceIds: [S.samaPost, S.worked],
    },
    {
      id: "event-england",
      kind: "other",
      date: "2016",
      title: "Moves family to England",
      summary:
        "Meant to be a one-year stay; they settled in the countryside and stayed.",
      location: "England",
      sourceIds: [S.wikipedia, S.pullRequest],
    },
    {
      id: "event-bel",
      kind: "project",
      date: "2019-10",
      title: "Publishes Bel",
      summary:
        "A spec for a new Lisp dialect written in itself, kept in the formal phase rather than implemented.",
      sourceIds: [S.bel],
    },
    {
      id: "event-great-work",
      kind: "publication",
      date: "2023-07",
      title: "Publishes 'How to Do Great Work'",
      summary:
        "Among his longest essays — the distilled statement of the work philosophy running through the whole corpus.",
      sourceIds: [S.greatWork],
    },
    {
      id: "event-founder-mode",
      kind: "publication",
      date: "2024-09",
      title: "Publishes 'Founder Mode'",
      summary:
        "The essay coined a term that set off a week of industry debate covered by the New York Times, Fortune, and CNN.",
      sourceIds: [S.founderMode, S.nytFounderMode],
    },
    {
      id: "event-essay-run",
      kind: "publication",
      date: "2025",
      title: "Post-'Founder Mode' essay run",
      summary:
        "Eleven new essays since: 'The Origins of Wokeness,' 'Writes and Write-Nots,' 'What to Do,' 'Good Writing,' 'The Shape of the Essay Field,' 'The Brand Age,' 'How to Earn a Billion Dollars,' 'How Universities Should Prepare Founders,' and 'Making Startups Powerful' among them — his heaviest cadence in years.",
      sourceIds: [S.articles],
    },
  ],
  themes: [
    {
      id: "theme-makers-not-scientists",
      kind: "philosophy",
      status: "stated",
      title: "Hackers and painters are both makers",
      summary:
        "His founding metaphor: hacking is a making discipline like painting — taste, empathy for the audience, sketch-first — not a science. He defends objective good taste and applies the same standard to software.",
      sourceIds: [S.hp, S.goodTaste],
    },
    {
      id: "theme-maker-schedule",
      kind: "method",
      status: "stated",
      title: "Maker's schedule vs. manager's schedule",
      summary:
        "Makers work in half-day units; a single meeting can break a day. Organizations run on the manager's schedule systematically tax the people who build things.",
      sourceIds: [S.makersSchedule],
    },
    {
      id: "theme-dont-scale",
      kind: "method",
      status: "stated",
      title: "Do things that don't scale",
      summary:
        "Startups take off because founders make them take off: recruit users by hand, deliver extreme early service, and keep the fire deliberately narrow until it burns hot.",
      sourceIds: [S.ds],
    },
    {
      id: "theme-default-alive",
      kind: "method",
      status: "stated",
      title: "Default alive or default dead",
      summary:
        "Ask early whether current trajectory reaches profitability before the money runs out; overhiring is his named top killer of funded startups.",
      sourceIds: [S.aord],
    },
    {
      id: "theme-schlep-blindness",
      kind: "method",
      status: "stated",
      title: "Schlep blindness",
      summary:
        "Unconscious aversion to tedious work hides the best startup ideas; the ideas others flinch from are the under-priced ones.",
      sourceIds: [S.schlep],
    },
    {
      id: "theme-startup-equals-growth",
      kind: "belief",
      status: "stated",
      title: "A startup is designed to grow fast",
      summary:
        "Growth rate is the defining metric; and the way to get ideas is to notice problems you have, not to brainstorm — the best ideas are wanted by founders, buildable by them, and invisible to others.",
      sourceIds: [S.growth, S.startupIdeas],
    },
    {
      id: "theme-ambition-geography",
      kind: "belief",
      status: "stated",
      title: "Cities send messages",
      summary:
        "Each city whispers a different ambition — money in New York, ideas in Cambridge, power in Silicon Valley — so place shapes what people attempt more than they realize.",
      sourceIds: [S.cities],
    },
    {
      id: "theme-lisp-advocacy",
      kind: "influence",
      status: "stated",
      title: "Lisp as secret weapon and lifelong subject",
      summary:
        "Viaweb's Lisp edge, the Blub paradox, two Lisp books, then two dialects of his own — Arc (2008) and Bel (2019). Language power is a through-line, not a hobby.",
      sourceIds: [S.avg, S.onlisp, S.arcOut, S.bel],
    },
    {
      id: "theme-wealth-creation",
      kind: "belief",
      status: "stated",
      title: "Wealth is made, not divided",
      summary:
        "Wealth is what people want; startups get rich by creating it. He argues inequality has good and bad causes and the right target is the bad ones — a position that drew national coverage in 2016.",
      sourceIds: [S.wealth, S.ineq, S.cnnIneq],
    },
    {
      id: "theme-great-work",
      kind: "philosophy",
      status: "stated",
      title: "Curiosity as the engine of great work",
      summary:
        "Ability, interest, effort, and luck multiply; curiosity chooses the field, reaches the frontier, notices the gaps, and explores them. The 2023 essay is the capstone of the work theme.",
      sourceIds: [S.greatWork],
    },
    {
      id: "theme-founder-mode",
      kind: "method",
      status: "stated",
      title: "Founder mode vs. manager mode",
      summary:
        "Scaling a startup need not mean switching to the professional-manager playbook; founders can run companies in ways managers cannot — a term he coined in 2024 that entered industry vocabulary within days.",
      sourceIds: [S.founderMode, S.nytFounderMode],
    },
    {
      id: "theme-yc-model",
      kind: "method",
      status: "stated",
      title: "Mass production applied to startup funding",
      summary:
        "Many small investments in hackers, funded synchronously in batches, run on advice and community rather than control — principles he articulated and YC still states as its founding ones.",
      sourceIds: [S.ycstart, S.ycPrinciples, S.summerFounder],
    },
    {
      id: "theme-culture-as-product",
      kind: "belief",
      status: "stated",
      title: "At YC the culture was the product",
      summary:
        "He credits Jessica Livingston with defining an authenticity-first culture that became YC's real innovation — weekly dinners, family atmosphere, and founder-judgment he calls nearly infallible.",
      sourceIds: [S.jessica],
    },
    {
      id: "theme-unfashionable-work",
      kind: "philosophy",
      status: "stated",
      title: "Prestige is a danger sign",
      summary:
        "His self-diagnosed pattern: the least prestigious option — still life, Lisp, personal-site essays, a 'lame' incubator — kept winning, because the low end eats the high end.",
      sourceIds: [S.worked],
    },
    {
      id: "theme-essay-as-form",
      kind: "practice",
      status: "stated",
      title: "The essay as an instrument of discovery",
      summary:
        "He revived the essay as a way to figure things out rather than defend a thesis — and two decades of practice made paulgraham.com a one-author canon.",
      sourceIds: [S.ageOfEssay, S.articles],
    },
    {
      id: "theme-nerd-single-mindedness",
      kind: "belief",
      status: "stated",
      title: "Unpopular nerds are just busy elsewhere",
      summary:
        "Popularity takes work nerds won't do; the single-mindedness that makes them unpopular in school is what later lets them build things that matter.",
      sourceIds: [S.nerds],
    },
  ],
  works: [
    {
      id: "work-viaweb",
      kind: "product",
      status: "completed",
      title: "Viaweb (later Yahoo Store)",
      date: "1995",
      location: "Cambridge, Massachusetts",
      summary:
        "Web-based online-store builder co-founded with Robert Morris and Trevor Blackwell; written mostly in Lisp; sold to Yahoo in June 1998 for roughly $49 million in stock.",
      sourceIds: [S.wikipediaViaweb, S.sec, S.avg],
    },
    {
      id: "work-yc",
      kind: "project",
      status: "ongoing",
      title: "Y Combinator",
      date: "2005",
      summary:
        "The startup accelerator he co-founded with Jessica Livingston, Robert Morris, and Trevor Blackwell; pioneered synchronous batch funding and has backed more than 3,000 startups per his bio.",
      sourceIds: [S.ycstart, S.bio, S.ycAbout],
    },
    {
      id: "work-hacker-news",
      kind: "product",
      status: "ongoing",
      title: "Hacker News",
      date: "2007",
      summary:
        "The user-ranked forum he launched as Startup News in February 2007, written in Arc and run by Y Combinator.",
      sourceIds: [S.announcingNews, S.wikipediaHn, S.hackerNews],
    },
    {
      id: "work-arc",
      kind: "project",
      status: "released",
      title: "Arc",
      date: "2008",
      summary:
        "A Lisp dialect designed with Robert Morris for exploratory programming — 'a medium for sketching software' — first released January 29, 2008; latest stable release 3.2 (2018).",
      sourceIds: [S.arcOut, S.arcSite, S.wikipediaArc],
    },
    {
      id: "work-bel",
      kind: "project",
      status: "released",
      title: "Bel",
      date: "2019",
      summary:
        "A spec for a new Lisp dialect written in itself, published October 2019 as a guide plus self-describing source — deliberately a formal artifact rather than an implemented language.",
      sourceIds: [S.bel],
    },
    {
      id: "work-onlisp",
      kind: "book",
      status: "published",
      title: "On Lisp: Advanced Techniques for Common Lisp",
      date: "1993",
      summary:
        "His first book: macros and bottom-up programming. Out of print; he hosts a free digital version.",
      sourceIds: [S.onlisp],
    },
    {
      id: "work-acl",
      kind: "book",
      status: "published",
      title: "ANSI Common Lisp",
      date: "1995",
      summary: "His second Lisp book, combining tutorial and reference for the standardized dialect.",
      sourceIds: [S.bio],
    },
    {
      id: "work-hackers-painters",
      kind: "book",
      status: "published",
      title: "Hackers & Painters: Big Ideas from the Computer Age",
      date: "2004",
      summary:
        "The O'Reilly essay collection that fixed his public identity as the essayist-investor.",
      sourceIds: [S.oreilly, S.hackpaint],
    },
    {
      id: "work-essays",
      kind: "other",
      status: "ongoing",
      title: "Essays at paulgraham.com",
      date: "2001",
      summary:
        "A twenty-five-year corpus — over a hundred essays indexed on his site — that functions as the written canon of startup doctrine. The post-Founder-Mode run includes 'The Origins of Wokeness,' 'Writes and Write-Nots,' 'Good Writing,' 'The Brand Age,' and 'Making Startups Powerful.'",
      sourceIds: [S.articles, S.bio],
    },
    {
      id: "work-paintings",
      kind: "other",
      status: "ongoing",
      title: "Still-life paintings",
      summary:
        "He trained at RISD and the Accademia di Belle Arti and still paints; his site hosts at least one still life with his own note on making it.",
      sourceIds: [S.stillLife, S.worked],
    },
  ],
  appearances: [
    {
      id: "appearance-harvard-talk",
      title: "How to Start a Startup",
      venue: "Harvard Computer Society",
      publishedAt: "2005-03",
      participants: ["Paul Graham"],
      participantHandles: [
        { name: "Paul Graham", handle: "paul-graham" },
      ],
      summary:
        "The talk that led, days later, to the decision to start Y Combinator; published as the essay of the same name.",
      media: [
        {
          type: "article",
          url: "https://paulgraham.com/start.html",
          sourceId: S.start,
        },
      ],
      sourceIds: [S.start],
    },
    {
      id: "appearance-founders-at-work",
      title: "Founders at Work, Chapter 15: Paul Graham, Cofounder, Viaweb",
      venue: "Apress (book interview)",
      publishedAt: "2007",
      participants: ["Paul Graham", "Jessica Livingston"],
      participantHandles: [
        { name: "Paul Graham", handle: "paul-graham" },
        { name: "Jessica Livingston", handle: "jessica-livingston" },
      ],
      summary:
        "A chapter-length interview on Viaweb's early days — the reluctant co-founder, the browser-as-interface idea, and the sale.",
      media: [
        {
          type: "article",
          url: "https://www.oreilly.com/library/view/founders-at-work/9781590597149/Chapter15.html",
          sourceId: S.foundersAtWork,
        },
      ],
      sourceIds: [S.foundersAtWork],
    },
    {
      id: "appearance-cs183b",
      title: "Before the Startup (Lecture 3, How to Start a Startup)",
      venue: "Stanford University (CS183B)",
      publishedAt: "2014-10",
      participants: ["Paul Graham"],
      participantHandles: [
        { name: "Paul Graham", handle: "paul-graham" },
      ],
      summary:
        "His lecture in Sam Altman's Stanford course, on what to do in the years before starting a startup.",
      media: [
        {
          type: "article",
          url: "https://startupclass.samaltman.com/courses/lec03/",
          sourceId: S.lec03,
        },
      ],
      sourceIds: [S.lec03],
    },
    {
      id: "appearance-inc-profile",
      title: "The Start-up Guru",
      venue: "Inc.",
      publishedAt: "2009-06-01",
      participants: ["Paul Graham", "Max Chafkin"],
      participantHandles: [
        { name: "Paul Graham", handle: "paul-graham" },
        { name: "Max Chafkin", handle: "max-chafkin" },
      ],
      summary:
        "Feature profile capturing YC at 145 funded companies, the original $6,000-per-founder terms, and his version of the origin story.",
      media: [
        {
          type: "article",
          url: "https://www.inc.com/magazine/20090601/the-start-up-guru-y-combinators-paul-graham.html",
          sourceId: S.inc,
        },
      ],
      sourceIds: [S.inc],
    },
    {
      id: "appearance-pull-request",
      title: "PR interviews Paul Graham",
      venue: "The Pull Request",
      publishedAt: "2020-09-04",
      participants: ["Paul Graham", "Antonio García Martínez"],
      participantHandles: [
        { name: "Paul Graham", handle: "paul-graham" },
        { name: "Antonio García Martínez", handle: "antonio-garcia-martinez" },
      ],
      summary:
        "Q&A on why the family stayed in England, the future of journalism, the company he most regrets rejecting, and whether he still invests.",
      media: [
        {
          type: "article",
          url: "https://www.thepullrequest.com/p/pr-interviews-paul-graham",
          sourceId: S.pullRequest,
        },
      ],
      sourceIds: [S.pullRequest],
    },
    {
      id: "appearance-cowen",
      title: "Paul Graham on Ambition, Art, and Evaluating Talent",
      venue: "Conversations with Tyler",
      publishedAt: "2023-08",
      participants: ["Paul Graham", "Tyler Cowen"],
      participantHandles: [
        { name: "Paul Graham", handle: "paul-graham" },
        { name: "Tyler Cowen", handle: "tyler-cowen" },
      ],
      summary:
        "Recorded at his home in the English countryside in July 2023: ambition, taste, Florence, evaluating founders, and what is wrong with contemporary art.",
      media: [
        {
          type: "audio",
          url: "https://conversationswithtyler.com/episodes/paul-graham/",
          sourceId: S.cowen,
        },
      ],
      sourceIds: [S.cowen],
    },
  ],
  relations: [
    {
      id: "rel-viaweb",
      kind: "founded",
      target: "viaweb",
      targetName: "Viaweb",
      targetKind: "organization",
      note: "Co-founded the web-based online-store builder with Robert Morris in summer 1995; Yahoo acquired it in 1998 for about $49 million.",
      start: "1995",
      end: "1998",
      targetWikidataId: "Q7924553",
      sourceIds: [S.avg, S.wikipediaViaweb, S.foundersAtWork],
    },
    {
      id: "rel-y-combinator",
      kind: "founded",
      target: "y-combinator",
      targetName: "Y Combinator",
      targetKind: "organization",
      note: "Co-founded the startup accelerator in March 2005 with Jessica Livingston, Robert Morris, and Trevor Blackwell.",
      start: "2005-03",
      targetWikidataId: "Q2616400",
      sourceIds: [S.ycstart, S.ycAbout],
    },
    {
      id: "rel-hacker-news",
      kind: "founded",
      target: "hacker-news",
      targetName: "Hacker News",
      targetKind: "organization",
      note: "Created the forum in February 2007 as Y Combinator Startup News; renamed Hacker News that August.",
      start: "2007-02",
      targetWikidataId: "Q686797",
      sourceIds: [S.announcingNews, S.wikipediaHn, S.hnEssay],
    },
    {
      id: "rel-jessica-livingston",
      kind: "cofounder",
      target: "jessica-livingston",
      targetName: "Jessica Livingston",
      note: "Co-founded Y Combinator with her in 2005; his essay 'Jessica Livingston' credits her with defining early YC's culture.",
      start: "2005",
      targetWikidataId: "Q4261025",
      sourceIds: [S.ycstart, S.jessica],
    },
    {
      id: "rel-jessica-livingston-family",
      kind: "family",
      target: "jessica-livingston",
      targetName: "Jessica Livingston",
      note: "Married in 2008; they have two children.",
      start: "2008",
      targetWikidataId: "Q4261025",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-robert-morris",
      kind: "cofounder",
      target: "robert-morris",
      targetName: "Robert Morris",
      note: "Co-founded Viaweb in 1995 and Y Combinator in 2005; also his collaborator on the Arc Lisp dialect.",
      start: "1995",
      targetWikidataId: "Q92647",
      sourceIds: [S.avg, S.wikipediaViaweb, S.ycstart],
    },
    {
      id: "rel-trevor-blackwell",
      kind: "cofounder",
      target: "trevor-blackwell",
      targetName: "Trevor Blackwell",
      note: "Joined Viaweb shortly after its 1995 founding and joined him again as a Y Combinator co-founder in 2005.",
      start: "1995",
      targetWikidataId: "Q4088422",
      sourceIds: [S.wikipediaViaweb, S.ycstart],
    },
  ],
  openQuestions: [
    "Viaweb's founding date is conflated across sources: his own account says summer 1995, the Viaweb record says July 1995, and his Wikipedia bio article says 1996 — the difference between starting work, incorporating, and launching the product in early 1996.",
    "The sale figure varies by a hair: Yahoo's 8-K and CNNfn report approximately $49 million while reference records give $49.6 million, and the announced ~455,000 shares differ from the filed 393,591 shares plus assumed options at completion.",
    "Most of the Viaweb and early-YC history is self-narrated through his essays and Jessica Livingston's interview; few independent primary records exist to check it against.",
    "Whether Arc is still actively developed by him is unclear — the last stable release is 3.2 (2018), the site promises future releases will break all existing code, and YC's own stack has reportedly moved to a Common Lisp variant.",
    "He is widely described as 'retired' since the 2014 handoff, yet still invests occasionally at Demo Day and still shapes YC's vocabulary; the right label for his current relationship to YC is unsettled.",
    "A December 2013 interview quotation about getting young girls interested in computers drew sustained controversy he publicly disputed as misleadingly edited; the contested framing persists in secondary coverage.",
    "Traffic and priority claims — roughly 25 million annual page views, 'first web-based application,' 'first application service provider' — are his own and not independently audited.",
  ],
  body: `Paul Graham is the closest thing the startup world has to a house essayist — an "essayist-investor" whose two-decade corpus at paulgraham.com functions as a written canon for how startups are built, and whose biography explains the odd combination of painter, Lisp hacker, founder, and funder that produced it.

## Formation

Born November 13, 1964 in Weymouth, Dorset, he moved with his family to Pittsburgh in 1968 and started programming in high school. He took a philosophy BA at Cornell (1986), then a Harvard MS (1988) and PhD in computer science (1990) — and then, unusually, went to art school: painting at RISD and at the Accademia di Belle Arti in Florence until his money ran out. In his memoir "What I Worked On" (February 2021) he describes the early-1990s Interleaf job he took to pay for art school, during which he says he covertly wrote much of *On Lisp* (Prentice Hall, 1993). *ANSI Common Lisp* followed in 1995.

## Viaweb: the first web app, in Lisp

In the summer of 1995 he and Robert Morris started Viaweb in Cambridge, Massachusetts, with Trevor Blackwell joining shortly after. The product let users build online stores through a browser — in his claim, the first web-based application and the first application service provider — and it was written mostly in Lisp, which he credits for the speed that let a tiny team outrun larger competitors ("Beating the Averages," 2001/2003). Viaweb started on $10,000 of seed funding in exchange for 10% — a structure he says later became YC's model. Yahoo announced the acquisition on June 8, 1998 for roughly 455,000 shares valued at approximately $49 million (per Yahoo's 8-K and contemporaneous CNNfn and Wired coverage); the product became Yahoo Store.

## The essays era

After Yahoo he turned to writing and painting. From 2001 he published essays on his own site — "Why Nerds are Unpopular," "Hackers and Painters," "How to Make Wealth," "The Age of the Essay" — and O'Reilly collected the best into *Hackers & Painters* (2004). The essays treat startups as a maker's craft, argue the essay form is a tool for figuring things out, and distinguish wealth (what people want) from money. The index now lists well over a hundred essays; his bio claims roughly 25 million page views a year, a self-reported figure.

## Y Combinator

A March 2005 talk to the Harvard Computer Society became the essay "How to Start a Startup" — and, in his telling, the prompt for YC. On March 11, 2005, walking home through Harvard Square with Jessica Livingston, they decided to start an investment firm; Robert Morris and Trevor Blackwell joined, and the four started with $200,000 of their own money. The first project was the Summer Founders Program — announced in late March 2005 as "an experimental replacement for the conventional summer job" — which drew ~227 applications and funded eight startups that summer, including the UVA graduates who built Reddit (Wired covered the cohort that September). The batch model, he says, was an accident that became the signature: fund a synchronous cohort twice a year, help intensively for three months, end with Demo Day. YC now runs four batches a year and, per his bio, has funded more than 3,000 startups — Airbnb, Dropbox, Stripe, Reddit. He insists much of what made YC distinctive was Livingston: "the culture was the product."

## Hacker News and Arc

In February 2007 he launched Y Combinator Startup News — a user-ranked forum for the growing YC community — which took the name Hacker News on August 14, 2007. It was also the flagship application for Arc, the Lisp dialect he and Morris had been designing; the first public Arc release followed on January 29, 2008. Arc's pitch was "exploratory programming" — a medium for sketching software — shipped with a warning that future releases would break all existing code. Its last stable release is 3.2 (2018); Wikipedia's record notes YC's own infrastructure has largely moved to a Common Lisp variant. In October 2019 he published Bel, a second dialect, delivered as a spec written in itself rather than an implementation.

## Handoff and the return to writing

In "What I Worked On" he recounts deciding in 2012 to hand YC over, recruiting Sam Altman through 2013, and — on February 21, 2014 — announcing Altman as president while he kept office hours only. The family moved to England in 2016, intending a year; they stayed in the countryside. What followed was a second writing era: "Economic Inequality" (January 2016) drew national coverage for the "manufacturer of economic inequality" framing; "What I Worked On" (2021) supplied the memoir; "How to Do Great Work" (July 2023) distilled his philosophy into four factors — ability, interest, effort, luck — with curiosity as the engine; and "Founder Mode" (September 2024), prompted by a Brian Chesky talk, coined a term that the New York Times, Fortune, and CNN were debating within days.

## What he argues

The recurring doctrine: startups are companies designed to grow fast, so measure growth weekly ("Startup = Growth," 2012); get ideas by noticing problems you have, including ones hidden by "schlep blindness" (2012); do things that don't scale (2013); ask whether you're default alive (2015). Around the startup advice sits a wider frame: makers work on a different schedule than managers (2009); cities shape ambition by the messages they send (2008); hackers and painters are the same kind of creature; taste is real; prestige is a danger sign because the low end eats the high end; and unglamorous work — still life, Lisp, essays on a personal site, a "lame" incubator — has been the winning pattern of his life.

## What the record does not settle

The soft spots are where the record is his own voice. Viaweb's founding date is conflated across sources (summer/July 1995 versus a 1996 launch). The sale figure reads $49 million in filings and $49.6 million in reference records. Most of the Viaweb and early-YC history is self-narrated. Arc's future development is unclear, and the "retired" label fits loosely — he still invests at Demo Day "pretty haphazardly," by his own account, while writing full-time.

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
