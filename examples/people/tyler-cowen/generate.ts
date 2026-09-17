#!/usr/bin/env bun
/** Generate examples/people/tyler-cowen/person-index.json with derived source ids. */

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

// --- Subject-controlled and first-person sources ---------------------------

const tylercowen = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Tyler Cowen",
  url: "https://tylercowen.com/",
  publisher: "tylercowen.com",
  notes: "The subject's own site; claims here are self-reported.",
});
const mrAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About Marginal Revolution",
  url: "https://marginalrevolution.com/about",
  publisher: "Marginal Revolution",
  notes: "The subject's blog; states the blog began in August 2003.",
});
const tcedg = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Tyler Cowen's Ethnic Dining Guide",
  url: "https://tylercowensethnicdiningguide.com/",
  publisher: "Tyler Cowen's Ethnic Dining Guide",
});
const tcedgRemarks = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "General remarks — Tyler Cowen's Ethnic Dining Guide",
  url: "https://tylercowensethnicdiningguide.com/index.php/general-remarks/",
  publisher: "Tyler Cowen's Ethnic Dining Guide",
  notes: "Cowen's own statement of his food philosophy and guide method.",
});
const cwtSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Conversations with Tyler — official podcast site",
  url: "https://conversationswithtyler.com/",
  publisher: "Mercatus Center at George Mason University",
});
const cwtThiel = source({
  binding: "subject_controlled",
  mediaType: "audio",
  title:
    "Peter Thiel on Stagnation, Innovation, and What Not To Name Your Company (Ep. 1 — Live at Mason)",
  url: "https://conversationswithtyler.com/episodes/Peter-Thiel/",
  publisher: "Conversations with Tyler / Mercatus Center",
  publishedAt: "2015-04-06",
  notes: "First episode page; carries audio and transcript.",
});
const mruniversity = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Marginal Revolution University",
  url: "https://mruniversity.com/",
  publisher: "Marginal Revolution University",
  notes: "States MRU was founded in 2012 by Cowen and Tabarrok at Mercatus.",
});
const mrSCL = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "What libertarianism has become and will become — State Capacity Libertarianism",
  url: "https://marginalrevolution.com/marginalrevolution/2020/01/what-libertarianism-has-become-and-will-become-state-capacity-libertarianism.html",
  publisher: "Marginal Revolution",
  publishedAt: "2020-01-01",
  authors: ["Tyler Cowen"],
});
const mrEV = source({
  binding: "first_person",
  mediaType: "article",
  title: "Emergent Ventures, a new project to help foment enlightenment",
  url: "https://marginalrevolution.com/marginalrevolution/2018/09/emergent-ventures-new-project-help-foment-enlightenment.html",
  publisher: "Marginal Revolution",
  publishedAt: "2018-09-13",
  authors: ["Tyler Cowen"],
});
const mrFG = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Fast Grants against Covid-19, an extension of Emergent Ventures",
  url: "https://marginalrevolution.com/marginalrevolution/2020/04/fast-grants-against-covid-19-an-extension-of-emergent-ventures.html",
  publisher: "Marginal Revolution",
  publishedAt: "2020-04-08",
  authors: ["Tyler Cowen"],
});
const mrTGS = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Great Stagnation",
  url: "https://marginalrevolution.com/marginalrevolution/2011/01/the-great-stagnation.html",
  publisher: "Marginal Revolution",
  publishedAt: "2011-01",
  authors: ["Tyler Cowen"],
});
const mrGOAT = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "GOAT: Who is the Greatest Economist of all Time, and Why Does it Matter?",
  url: "https://marginalrevolution.com/marginalrevolution/2023/10/goat-who-is-the-greatest-economist-of-all-time-and-why-does-it-matter.html",
  publisher: "Marginal Revolution",
  publishedAt: "2023-10-23",
  authors: ["Tyler Cowen"],
});
const mr20years = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Twenty Years of Marginal Revolution!",
  url: "https://marginalrevolution.com/marginalrevolution/2023/08/twenty-years-of-marginal-revolution.html",
  publisher: "Marginal Revolution",
  publishedAt: "2023-08-23",
  authors: ["Alex Tabarrok"],
  notes:
    "Written by co-blogger Tabarrok on the blog's own site; not Cowen's own words.",
});
const mrObsolete = source({
  binding: "first_person",
  mediaType: "article",
  title: "In which I am made obsolete",
  url: "https://marginalrevolution.com/marginalrevolution/2006/09/in_which_the_15.html",
  publisher: "Marginal Revolution",
  publishedAt: "2006-09-11",
  authors: ["Tyler Cowen"],
  notes: "Cowen on losing his youngest-NJ-Open-champion record after 29 years.",
});
const mrLoC = source({
  binding: "first_person",
  mediaType: "article",
  title: "Library of Congress to archive Marginal Revolution",
  url: "https://marginalrevolution.com/marginalrevolution/2019/01/library-congress-archive-marginal-revolution.html",
  publisher: "Marginal Revolution",
  publishedAt: "2019-01-27",
  authors: ["Tyler Cowen"],
});
const mrWiblin = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Robert Wiblin's Conversation with Tyler Cowen",
  url: "https://marginalrevolution.com/marginalrevolution/2018/10/robert-wiblins-conversation-tyler-cowen.html",
  publisher: "Marginal Revolution",
  publishedAt: "2018-10-16",
  authors: ["Robert Wiblin", "Tyler Cowen"],
  notes:
    "Two-and-a-half-hour bonus conversation on Stubborn Attachments, released through Cowen's own channels; text and audio on Marginal Revolution.",
});
const mrSAPreface = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "My preface to Stubborn Attachments, and why this book is especially important",
  url: "https://marginalrevolution.com/marginalrevolution/2018/08/preface-stubborn-attachments-book-especially-important.html",
  publisher: "Marginal Revolution",
  publishedAt: "2018-08-13",
  authors: ["Tyler Cowen"],
});
const thefp = source({
  binding: "first_person",
  mediaType: "article",
  title: "Tyler Cowen: Why I'm Joining The Free Press",
  url: "https://www.thefp.com/p/tyler-cowen-why-im-joining-the-free",
  publisher: "The Free Press",
  publishedAt: "2025-04-01",
  authors: ["Tyler Cowen"],
});
const bloombergColumn = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "How Trump's Protectionism Could Result in More Free Trade",
  url: "https://www.bloomberg.com/opinion/articles/2025-01-23/how-trump-s-protectionism-could-result-in-more-free-trade",
  publisher: "Bloomberg Opinion",
  publishedAt: "2025-01-23",
  authors: ["Tyler Cowen"],
  notes: "A late example of his Bloomberg Opinion column, weeks before his Free Press move.",
});
const futureFG = source({
  binding: "first_person",
  mediaType: "article",
  title: "What We Learned Doing Fast Grants",
  url: "https://future.com/what-we-learned-doing-fast-grants/",
  publisher: "Future (a16z)",
  publishedAt: "2021-06",
  authors: ["Patrick Collison", "Tyler Cowen", "Patrick Hsu"],
  notes:
    "Retrospective by the three Fast Grants founders: over $50M raised, 260+ grants, under 3% overhead.",
});

// --- Primary records --------------------------------------------------------

const mercatusScholar = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Tyler Cowen — Mercatus Center",
  url: "https://www.mercatus.org/scholars/tyler-cowen",
  publisher: "Mercatus Center",
  notes:
    "Institutional bio: Holbert L. Harris Chair of Economics; chairman and faculty director of Mercatus.",
});
const gmuEcon = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Economics | Faculty and Staff: Tyler Cowen",
  url: "https://economics.gmu.edu/people/tcowen",
  publisher: "George Mason University",
});
const mercatusEV = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Emergent Ventures — Mercatus Center",
  url: "https://www.mercatus.org/emergent-ventures",
  publisher: "Mercatus Center",
  notes: "Program page: launched 2018, administered by Cowen.",
});
const mercatusFG = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Mercatus' Emergent Ventures Launches Fast Grants to Fight COVID-19",
  url: "https://www.mercatus.org/announcements/mercatus-emergent-ventures-launches-fast-grants-fight-covid-19",
  publisher: "Mercatus Center",
  publishedAt: "2020-04-07",
});
const mercatusGOAT = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "GOAT: Who is the Greatest Economist of all Time and Why Does it Matter? — Mercatus Center",
  url: "https://www.mercatus.org/hayekprogram/research/books/goat-who-greatest-economist-all-time-and-why-does-it-matter",
  publisher: "Mercatus Center",
  publishedAt: "2023-10",
});
const chssGOAT = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Tyler Cowen publishes generative book",
  url: "https://chss.gmu.edu/articles/20293",
  publisher: "George Mason University College of Humanities and Social Sciences",
  publishedAt: "2024-02-16",
  authors: ["Melanie O'Brien"],
});
const bloombergmediaPress = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Tyler Cowen Joins Bloomberg View as Staff Columnist",
  url: "https://www.bloombergmedia.com/press/tyler-cowen-joins-bloomberg-view-staff-columnist/",
  publisher: "Bloomberg Media",
  publishedAt: "2016-07",
  notes:
    "Bloomberg's own announcement; his debut column covered Turkey after the July 2016 coup attempt.",
});
const macmillanTalent = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Talent: How to Identify Energizers, Creatives, and Winners Around the World",
  url: "https://us.macmillan.com/books/9781250275813/talent/",
  publisher: "Macmillan / St. Martin's Press",
  publishedAt: "2022-05-17",
});
const penguinTGS = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Great Stagnation by Tyler Cowen",
  url: "https://www.penguinrandomhouse.com/books/265612/the-great-stagnation-by-tyler-cowen/",
  publisher: "Penguin Random House",
  publishedAt: "2011-01-25",
  notes: "Publisher record: Penguin eSpecial, ebook, 71 pages.",
});

// --- Interviews -------------------------------------------------------------

const kenilworthian = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Interview with the Former 'Youngest New Jersey Chess Champion,' Tyler Cowen",
  url: "http://kenilworthian.blogspot.com/2006/09/interview-with-former-youngest-new.html",
  publisher: "The Kenilworthian",
  publishedAt: "2006-09-08",
  notes:
    "Chess-blog interview; establishes the 1977 New Jersey Open win at 15 years and 8 months.",
});
const richmondFed = source({
  binding: "interview",
  mediaType: "pdf",
  title: "Interview: Tyler Cowen (Econ Focus, Winter 2006)",
  url: "https://www.richmondfed.org/-/media/richmondfedorg/publications/research/econ_focus/2006/winter/pdf/interview.pdf",
  publisher: "Federal Reserve Bank of Richmond",
  publishedAt: "2006",
  notes:
    "Career interview; his CV block lists UC Irvine 1987-1989, BS GMU 1983, PhD Harvard 1987.",
});
const nytEconomix = source({
  binding: "interview",
  mediaType: "article",
  title: "Book Chat: A Conversation With Tyler Cowen",
  url: "https://archive.nytimes.com/economix.blogs.nytimes.com/2011/02/03/a-conversation-with-tyler-cowen/",
  publisher: "The New York Times (Economix)",
  publishedAt: "2011-02-03",
});
const econtalk = source({
  binding: "interview",
  mediaType: "article",
  title: "Who's the Greatest of Them All? — Tyler Cowen on GOAT",
  url: "https://www.econtalk.org/extra/whos-the-greatest-of-them-all/",
  publisher: "EconTalk / Econlib",
  publishedAt: "2023-10-30",
  authors: ["Russ Roberts", "Tyler Cowen"],
  notes:
    "Episode record for Russ Roberts's interview on GOAT; Cowen's 18th EconTalk appearance.",
});
const stylus = source({
  binding: "interview",
  mediaType: "article",
  title: "Mercatus Center Flourishes Under Mason Alumnus",
  url: "http://stylus.onmason.com/2010/08/08/an-interview-with-tyler-cowen/",
  publisher: "The Stylus (George Mason University)",
  publishedAt: "2010-08-08",
  notes:
    "Student-press interview; reports Mercatus general-director appointment in 1998 and the Harris chair in 2000.",
});

// --- Reporting --------------------------------------------------------------

const wapo = source({
  binding: "reporting",
  mediaType: "article",
  title: "A taste of the orderly world of Tyler Cowen",
  url: "https://www.washingtonpost.com/archive/style/2010/05/13/a-taste-of-the-orderly-world-of-tyler-cowen/2d1027b8-77b5-45f8-9ab3-d4c615e0ffb0/",
  publisher: "The Washington Post",
  publishedAt: "2010-05-13",
});
const bloomberg2011 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tyler Cowen, America's Hottest Economist",
  url: "https://www.bloomberg.com/news/articles/2011-05-26/tyler-cowen-americas-hottest-economist",
  publisher: "Bloomberg Businessweek",
  publishedAt: "2011-05-26",
});
const newyorker = source({
  binding: "reporting",
  mediaType: "article",
  title: "Are Computers Making Society More Unequal?",
  url: "https://www.newyorker.com/business/currency/are-computers-making-society-more-unequal",
  publisher: "The New Yorker",
  publishedAt: "2013",
  notes:
    "Situates The Great Stagnation's 'low-hanging fruit' thesis and covers Average Is Over.",
});
const econ1843 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tyler Cowen, the man who wants to know everything",
  url: "https://www.economist.com/1843/2025/02/28/tyler-cowen-the-man-who-wants-to-know-everything",
  publisher: "1843 (The Economist)",
  publishedAt: "2025-02-28",
});
const reasonSomin = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Tyler Cowen on 'State Capacity Libertarianism' I: Is it the Wave of the 'Smart' Libertarian Future?",
  url: "https://reason.com/volokh/2020/01/16/tyler-cowen-on-state-capacity-libertarianism-i-is-it-the-wave-of-the-smart-libertarian-future/",
  publisher: "Reason (The Volokh Conspiracy)",
  publishedAt: "2020-01-16",
  authors: ["Ilya Somin"],
  notes: "A skeptical libertarian response; preserves the disagreement.",
});
const techcrunch = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Economist Tyler Cowen launches a fellowship and grant program for moon shot ideas",
  url: "https://techcrunch.com/2018/09/13/economist-tyler-cowen-launches-a-fellowship-and-grant-program-for-moon-shot-ideas/",
  publisher: "TechCrunch",
  publishedAt: "2018-09-13",
  authors: ["John Biggs"],
});
const bldavies = source({
  binding: "reporting",
  mediaType: "article",
  title: "Marginal Revolution metadata",
  url: "https://bldavies.com/blog/marginal-revolution-metadata/",
  publisher: "Ben Davies",
  publishedAt: "2023-04-07",
  notes:
    "Third-party data analysis: 34,189 MR posts Aug 2003-Mar 2023; Cowen wrote about 86%.",
});
const axios = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Free Press adds columnists as paid subscriber base expands",
  url: "https://www.axios.com/2025/04/01/the-free-press-new-columnists",
  publisher: "Axios",
  publishedAt: "2025-04-01",
});
const eaterdc = source({
  binding: "reporting",
  mediaType: "article",
  title: "A New Edition of Tyler Cowen's Dining Guide is Here",
  url: "https://dc.eater.com/2016/4/25/11501552/tyler-cowen-ethnic-dining-guide-new",
  publisher: "Eater DC",
  publishedAt: "2016-04-25",
});
const freakonomics = source({
  binding: "reporting",
  mediaType: "article",
  title: "Marginal Revolution goes old school",
  url: "https://freakonomics.com/2006/03/marginal-revolution-goes-old-school/",
  publisher: "Freakonomics",
  publishedAt: "2006-03-24",
  authors: ["Steven D. Levitt"],
  notes:
    "Reports Cowen joining the rotating 'Economic Scene' column at the New York Times.",
});
const freakonomicsQA = source({
  binding: "interview",
  mediaType: "article",
  title: "Foodie Economist Tyler Cowen Answers Your Questions",
  url: "https://freakonomics.com/2012/06/foodie-economist-tyler-cowen-answers-your-questions/",
  publisher: "Freakonomics",
  publishedAt: "2012-06",
  notes: "Reader Q&A tied to An Economist Gets Lunch.",
});

// --- Reference and archive --------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Tyler Cowen (Q602278)",
  url: "https://www.wikidata.org/wiki/Q602278",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Tyler Cowen",
  url: "https://en.wikipedia.org/wiki/Tyler_Cowen",
  publisher: "Wikipedia",
  notes: "Used for discovery and cross-checking, not sole authority.",
});
const wikipediaMR = source({
  binding: "reference",
  mediaType: "article",
  title: "Marginal Revolution (blog)",
  url: "https://en.wikipedia.org/wiki/Marginal_Revolution_(blog)",
  publisher: "Wikipedia",
});
const wikipediaFG = source({
  binding: "reference",
  mediaType: "article",
  title: "Fast Grants",
  url: "https://en.wikipedia.org/wiki/Fast_Grants",
  publisher: "Wikipedia",
});
const newscienceEV = source({
  binding: "reference",
  mediaType: "webpage",
  title: "A list of all winners of the Emergent Ventures program",
  url: "https://newscience.org/emergent-ventures-winners/",
  publisher: "New Science",
  notes:
    "Third-party compiled roster of EV grant cohorts; first cohort announced November 7, 2018.",
});
const waybackMR = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Marginal Revolution — Wayback Machine capture",
  url: "https://web.archive.org/web/20170217004737/http://marginalrevolution.com/",
  publisher: "Internet Archive Wayback Machine",
  notes: "Capture from 2017-02-17; thousands of captures of the blog exist.",
});

const S = {
  tylercowen: tylercowen.id,
  mrAbout: mrAbout.id,
  tcedg: tcedg.id,
  tcedgRemarks: tcedgRemarks.id,
  cwtSite: cwtSite.id,
  cwtThiel: cwtThiel.id,
  mruniversity: mruniversity.id,
  mrSCL: mrSCL.id,
  mrEV: mrEV.id,
  mrFG: mrFG.id,
  mrTGS: mrTGS.id,
  mrGOAT: mrGOAT.id,
  mr20years: mr20years.id,
  mrObsolete: mrObsolete.id,
  mrLoC: mrLoC.id,
  mrWiblin: mrWiblin.id,
  mrSAPreface: mrSAPreface.id,
  thefp: thefp.id,
  bloombergColumn: bloombergColumn.id,
  futureFG: futureFG.id,
  mercatusScholar: mercatusScholar.id,
  gmuEcon: gmuEcon.id,
  mercatusEV: mercatusEV.id,
  mercatusFG: mercatusFG.id,
  mercatusGOAT: mercatusGOAT.id,
  chssGOAT: chssGOAT.id,
  bloombergmediaPress: bloombergmediaPress.id,
  macmillanTalent: macmillanTalent.id,
  penguinTGS: penguinTGS.id,
  kenilworthian: kenilworthian.id,
  richmondFed: richmondFed.id,
  nytEconomix: nytEconomix.id,
  econtalk: econtalk.id,
  stylus: stylus.id,
  wapo: wapo.id,
  bloomberg2011: bloomberg2011.id,
  newyorker: newyorker.id,
  econ1843: econ1843.id,
  reasonSomin: reasonSomin.id,
  techcrunch: techcrunch.id,
  bldavies: bldavies.id,
  axios: axios.id,
  eaterdc: eaterdc.id,
  freakonomics: freakonomics.id,
  freakonomicsQA: freakonomicsQA.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  wikipediaMR: wikipediaMR.id,
  wikipediaFG: wikipediaFG.id,
  newscienceEV: newscienceEV.id,
  waybackMR: waybackMR.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-tyler-cowen",
  generatedAt: "2026-09-17T01:00:00Z",
  subject: {
    kind: "person",
    handle: "tyler-cowen",
    displayName: "Tyler Cowen",
    alsoKnownAs: ["Dr. Tyler Cowen", "Tyler Cowan"],
    summary:
      "American economist, author, and public intellectual. Holbert Harris Chair of Economics at George Mason University and chairman/faculty director of its Mercatus Center; co-writes Marginal Revolution with Alex Tabarrok (since 2003), hosts Conversations with Tyler, founded Emergent Ventures, co-founded Fast Grants, and now writes for The Free Press.",
    identity: {
      wikidataId: "Q602278",
      officialSite: "https://tylercowen.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Tyler_Cowen",
      profiles: [
        "https://x.com/tylercowen",
        "https://marginalrevolution.com/",
        "https://conversationswithtyler.com/",
        "https://tylercowensethnicdiningguide.com/",
        "https://mruniversity.com/",
        "https://www.mercatus.org/scholars/tyler-cowen",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T01:00:00Z",
    coverage: ["biography", "work", "beliefs", "projects", "media", "books"],
  },
  sources: [
    tylercowen,
    mrAbout,
    tcedg,
    tcedgRemarks,
    cwtSite,
    cwtThiel,
    mruniversity,
    mrSCL,
    mrEV,
    mrFG,
    mrTGS,
    mrGOAT,
    mr20years,
    mrObsolete,
    mrLoC,
    mrWiblin,
    mrSAPreface,
    thefp,
    bloombergColumn,
    futureFG,
    mercatusScholar,
    gmuEcon,
    mercatusEV,
    mercatusFG,
    mercatusGOAT,
    chssGOAT,
    bloombergmediaPress,
    macmillanTalent,
    penguinTGS,
    kenilworthian,
    richmondFed,
    nytEconomix,
    econtalk,
    stylus,
    wapo,
    bloomberg2011,
    newyorker,
    econ1843,
    reasonSomin,
    techcrunch,
    bldavies,
    axios,
    eaterdc,
    freakonomics,
    freakonomicsQA,
    wikidata,
    wikipedia,
    wikipediaMR,
    wikipediaFG,
    newscienceEV,
    waybackMR,
  ],
  claims: [
    {
      id: "claim-born-1962",
      kind: "fact",
      text: "Tyler Cowen was born on January 21, 1962, in Bergen County, New Jersey, and was raised in Hillsdale, New Jersey, attending Pascack Valley High School.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-nj-chess-champion",
      kind: "fact",
      text: "In September 1977, at fifteen years and eight months, Cowen won the New Jersey Open chess championship — at the time the youngest winner in its history. The record stood for 29 years, until Evan Ju broke it in September 2006.",
      sourceIds: [S.kenilworthian, S.mrObsolete, S.wikipedia],
    },
    {
      id: "claim-chess-rating",
      kind: "fact",
      text: "By age 16 Cowen had reached a chess rating of about 2350 — national-master strength — before largely leaving competitive chess for economics.",
      sourceIds: [S.kenilworthian, S.bloomberg2011],
    },
    {
      id: "claim-bs-gmu-1983",
      kind: "fact",
      text: "He earned his BS in economics from George Mason University in 1983.",
      sourceIds: [S.wikipedia, S.mercatusScholar, S.richmondFed],
    },
    {
      id: "claim-phd-harvard-1987",
      kind: "fact",
      text: "He received his PhD in economics from Harvard University in 1987; his dissertation was 'Essays in the Theory of Welfare Economics,' written under Nobel laureate Thomas Schelling.",
      sourceIds: [S.wikipedia, S.richmondFed, S.mercatusScholar],
    },
    {
      id: "claim-uci-1987-1989",
      kind: "fact",
      text: "His first faculty appointment was assistant professor of economics at the University of California, Irvine, from 1987 to 1989.",
      sourceIds: [S.richmondFed, S.stylus],
    },
    {
      id: "claim-gmu-since-1989",
      kind: "fact",
      text: "Cowen joined the George Mason University economics faculty in 1989 and has remained there for his entire career.",
      sourceIds: [S.stylus, S.richmondFed, S.wikipedia],
    },
    {
      id: "claim-mercatus-director-1998",
      kind: "fact",
      text: "In 1998 GMU provost David Potter appointed Cowen general director of both the Mercatus Center and the James M. Buchanan Center for Political Economy; he now serves as Mercatus chairman and faculty director.",
      sourceIds: [S.stylus, S.mercatusScholar],
    },
    {
      id: "claim-harris-chair",
      kind: "fact",
      text: "He holds the Holbert Harris Chair of Economics at GMU — reported as conferred in 2000; official sources variously style it 'Holbert C.' and 'Holbert L.' Harris.",
      sourceIds: [S.stylus, S.mercatusScholar, S.gmuEcon],
    },
    {
      id: "claim-mr-founded-2003",
      kind: "fact",
      text: "Cowen and Alex Tabarrok launched the blog Marginal Revolution in August 2003; the first post appeared August 21, 2003 — a review of Jenny Uglow's The Lunar Men — and new posts have appeared daily since.",
      sourceIds: [S.mrAbout, S.mr20years, S.wikipediaMR],
    },
    {
      id: "claim-mr-scale",
      kind: "fact",
      text: "A third-party analysis of the Marginal Revolution archive counts 34,189 posts from August 2003 to March 2023, about 86 percent of them written by Cowen.",
      sourceIds: [S.bldavies],
    },
    {
      id: "claim-mru-2012",
      kind: "fact",
      text: "Cowen and Tabarrok founded Marginal Revolution University in 2012, a free online economics-education nonprofit housed at the Mercatus Center.",
      sourceIds: [S.mruniversity, S.tylercowen],
    },
    {
      id: "claim-cwt-2015",
      kind: "fact",
      text: "Conversations with Tyler, his interview podcast produced by the Mercatus Center, began in 2015; the first episode was a live conversation with Peter Thiel, dated April 6, 2015 on the official episode page, and the show has since passed 279 episodes.",
      sourceIds: [S.cwtThiel, S.cwtSite],
    },
    {
      id: "claim-ev-2018",
      kind: "fact",
      text: "Cowen announced Emergent Ventures on September 13, 2018 — a low-overhead fellowship and grant program at Mercatus for 'zero to one' ideas, launched with a $1 million grant from the Thiel Foundation; the first grant cohort was announced November 7, 2018.",
      sourceIds: [S.mrEV, S.techcrunch, S.mercatusEV, S.newscienceEV],
    },
    {
      id: "claim-fastgrants-2020",
      kind: "fact",
      text: "In April 2020 Cowen, Patrick Collison, and Patrick Hsu launched Fast Grants under Mercatus/Emergent Ventures: $10,000-$500,000 awards to COVID-19 researchers with decisions in under 48 hours; it raised over $50 million and made more than 260 grants at under 3 percent overhead.",
      sourceIds: [S.mercatusFG, S.mrFG, S.futureFG, S.wikipediaFG],
    },
    {
      id: "claim-books-count",
      kind: "fact",
      text: "He is the author or co-author of nearly twenty books, spanning cultural economics, food, macroeconomic diagnosis, and talent evaluation.",
      sourceIds: [S.tylercowen, S.wikipedia],
    },
    {
      id: "claim-tgs-format",
      kind: "fact",
      text: "The Great Stagnation was published January 25, 2011 as a roughly 15,000-word Penguin eSpecial sold for about $4 — an e-book-only release that became a New York Times bestseller; Cowen dedicated it to Michael Mandel and Peter Thiel.",
      sourceIds: [S.penguinTGS, S.mrTGS, S.nytEconomix],
    },
    {
      id: "claim-talent-2022",
      kind: "fact",
      text: "Talent: How to Identify Energizers, Creatives, and Winners Around the World, co-written with entrepreneur Daniel Gross, went on sale May 17, 2022 from St. Martin's Press.",
      sourceIds: [S.macmillanTalent],
    },
    {
      id: "claim-goat-2023",
      kind: "fact",
      text: "GOAT: Who is the Greatest Economist of all Time, and Why Does it Matter? was released free in October 2023 — a 100,000-word manuscript published as a 'generative book' queryable through GPT-4 and Claude interfaces, as well as PDF and EPUB.",
      sourceIds: [S.mrGOAT, S.mercatusGOAT, S.chssGOAT],
    },
    {
      id: "claim-nyt-column",
      kind: "fact",
      text: "Cowen joined the rotating 'Economic Scene' column at the New York Times in 2006 and wrote for the paper for about ten years.",
      sourceIds: [S.freakonomics, S.wikipedia, S.thefp],
    },
    {
      id: "claim-bloomberg-2016",
      kind: "fact",
      text: "He joined Bloomberg View as a staff columnist in July 2016 and wrote for Bloomberg Opinion for roughly eight years, through early 2025.",
      sourceIds: [S.bloombergmediaPress, S.bloombergColumn, S.thefp],
    },
    {
      id: "claim-freepress-2025",
      kind: "fact",
      text: "On April 1, 2025, Cowen announced he was moving his column to The Free Press.",
      sourceIds: [S.thefp, S.axios],
    },
    {
      id: "claim-dining-guide",
      kind: "fact",
      text: "He publishes Tyler Cowen's Ethnic Dining Guide for the Washington, DC area — tagline 'All food is ethnic food' — covering more than 700 restaurants; it existed in numbered editions by 2004 (sixteenth edition, July 2004) and moved to blog format in May 2010.",
      sourceIds: [S.tcedg, S.tcedgRemarks, S.eaterdc, S.gmuEcon],
    },
    {
      id: "claim-loc-archive",
      kind: "fact",
      text: "In January 2019 the Library of Congress selected Marginal Revolution for its Economics Blogs Web Archive.",
      sourceIds: [S.mrLoC, S.waybackMR],
    },
    {
      id: "claim-modern-principles",
      kind: "fact",
      text: "Cowen and Tabarrok co-authored the introductory textbook Modern Principles of Economics.",
      sourceIds: [S.mrAbout, S.tylercowen],
    },
    {
      id: "claim-stagnation-thesis",
      kind: "stated_belief",
      text: "Cowen argues that American median income growth stagnated after about 1973 because the country exhausted its 'low-hanging fruit' — free land, uneducated but smart children entering the workforce, and transformative technological breakthroughs — and that the cause is deeper than politics.",
      sourceIds: [S.mrTGS, S.nytEconomix, S.newyorker],
    },
    {
      id: "claim-scl",
      kind: "stated_belief",
      text: "In his January 1, 2020 essay he argues old-style libertarianism is 'hollowed out' and that smart classical liberals have evolved toward what he calls State Capacity Libertarianism — the view that a strong, capable state is needed to sustain capitalism, markets, and individual rights.",
      sourceIds: [S.mrSCL],
    },
    {
      id: "claim-growth-moral",
      kind: "stated_belief",
      text: "Stubborn Attachments argues that sustained economic growth in wealthy countries is a moral imperative with positive spillovers for the world's poor, and that individuals should be more charitable and altruistic at the margin; Cowen directed his own share of the book's income to an Ethiopian man he had met.",
      sourceIds: [S.mrSAPreface, S.mrWiblin, S.wikipedia],
    },
    {
      id: "claim-books-should-be-shorter",
      kind: "stated_belief",
      text: "Cowen holds that most books should be shorter — he deliberately wrote The Great Stagnation at about 15,000 words, likening it to seventeenth-century economics pamphlets, and called cheaper, shorter e-books 'the wave of the future.'",
      sourceIds: [S.nytEconomix],
    },
    {
      id: "claim-food-philosophy",
      kind: "stated_belief",
      text: "His dining guide frames restaurants as 'the spirit of capitalist multiculturalism': the best ethnic food clusters in suburban strip malls where rents are low, competition among many restaurants of one cuisine raises quality, and no cuisine is 'truly authentic' — cuisines evolve.",
      sourceIds: [S.tcedgRemarks, S.freakonomicsQA, S.eaterdc],
    },
    {
      id: "claim-quit-chess",
      kind: "stated_belief",
      text: "Cowen says he gave up competitive chess — and earlier ambitions in philosophy — for the same reason: 'little stability and poor benefits,' and a calculated judgment about diminishing returns on his time.",
      sourceIds: [S.kenilworthian, S.bloomberg2011],
    },
    {
      id: "claim-fp-rationale",
      kind: "stated_belief",
      text: "On leaving Bloomberg Opinion he wrote that The Free Press 'is the correct base for me, and it has the audience I wish to reach.'",
      sourceIds: [S.thefp],
    },
    {
      id: "claim-underrated",
      kind: "stated_belief",
      text: "Cowen repeatedly frames his projects around finding 'underrated' people and ideas — the stated premise of both Emergent Ventures and the Conversations with Tyler guest list.",
      sourceIds: [S.mrEV, S.mercatusEV, S.cwtSite],
    },
    {
      id: "claim-daily-posting",
      kind: "pattern",
      text: "He has posted on Marginal Revolution every day since August 2003 — multiple posts on most days — producing roughly 34,000 posts in the blog's first two decades, about 86 percent of them his.",
      sourceIds: [S.bldavies, S.mrAbout, S.mr20years],
    },
    {
      id: "claim-infovore",
      kind: "pattern",
      text: "Profiles consistently document extreme consumption breadth: he browses or discards several books a day, maintains extensive lists and rules, and applies economics to food, music, literature, and travel — a self-described 'infovore' practice.",
      sourceIds: [S.bloomberg2011, S.wapo, S.econ1843],
    },
    {
      id: "claim-fast-philanthropy",
      kind: "pattern",
      text: "His philanthropy follows a repeated design: tiny team, low overhead, short applications, 48-hour decisions, announced on his own blog — visible in Emergent Ventures cohorts and the COVID-era Fast Grants.",
      sourceIds: [S.mercatusFG, S.futureFG, S.mrFG, S.mrEV, S.newscienceEV],
    },
    {
      id: "claim-interview-method",
      kind: "pattern",
      text: "Conversations with Tyler runs on intense preparation and deliberately unexpected questions meant to map a guest's worldview rather than elicit talking points — a method the show's own materials and guests describe.",
      sourceIds: [S.cwtSite, S.cwtThiel, S.econtalk],
    },
    {
      id: "claim-contrarian-mainstream",
      kind: "pattern",
      text: "He defends unfashionable-but-establishment positions — big business, markets in everything, a capable state — while attacking status-quo bias and American 'complacency,' a combination that leaves him hard to place on a left-right axis.",
      sourceIds: [S.mrSCL, S.reasonSomin, S.newyorker, S.wikipedia],
    },
    {
      id: "claim-spec-stagnation-over",
      kind: "speculation",
      text: "Whether the Great Stagnation has ended — Cowen has repeatedly suggested the slowdown may be over amid AI and energy acceleration — remains unresolved in the record; the thesis and its sunset are both contested.",
      sourceIds: [S.mrTGS, S.newyorker, S.econ1843],
    },
    {
      id: "claim-spec-scl-movement",
      kind: "speculation",
      text: "Whether 'state capacity libertarianism' names a real cohort of libertarians or mostly Cowen's own position is contested — Ilya Somin's Reason response doubts the movement exists as described.",
      sourceIds: [S.mrSCL, S.reasonSomin],
    },
    {
      id: "claim-spec-fastgrants-model",
      kind: "speculation",
      text: "Whether the Fast Grants model — small team, minimal overhead, days-long decisions — can be institutionalized in permanent science funding is plausible but unproven; even its founders describe it as a crisis experiment.",
      sourceIds: [S.futureFG, S.wikipediaFG],
    },
    {
      id: "claim-spec-generative-books",
      kind: "speculation",
      text: "Cowen presents GOAT as the first of a coming class of AI-native 'generative books'; whether the format spreads beyond his own experiments is an open bet, not an established trend.",
      sourceIds: [S.mrGOAT, S.chssGOAT],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1962-01-21",
      title: "Born in Bergen County, New Jersey",
      summary: "Raised in Hillsdale, NJ; attended Pascack Valley High School.",
      location: "Bergen County, New Jersey",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-chess-1977",
      kind: "milestone",
      date: "1977-09",
      title: "Won the New Jersey Open chess championship",
      summary:
        "At 15 years and 8 months he became the youngest winner in the tournament's history; the record held until 2006.",
      location: "New Jersey",
      sourceIds: [S.kenilworthian, S.mrObsolete, S.wikipedia],
    },
    {
      id: "event-bs-gmu",
      kind: "education",
      date: "1983",
      title: "BS in economics, George Mason University",
      organization: "George Mason University",
      sourceIds: [S.wikipedia, S.mercatusScholar, S.richmondFed],
    },
    {
      id: "event-phd-harvard",
      kind: "education",
      date: "1987",
      title: "PhD in economics, Harvard University",
      summary:
        "Dissertation: 'Essays in the Theory of Welfare Economics,' advised by Thomas Schelling.",
      organization: "Harvard University",
      sourceIds: [S.wikipedia, S.richmondFed],
    },
    {
      id: "event-uci",
      kind: "role",
      date: "1987",
      end: "1989",
      title: "Assistant professor of economics, UC Irvine",
      organization: "University of California, Irvine",
      sourceIds: [S.richmondFed, S.stylus],
    },
    {
      id: "event-gmu-faculty",
      kind: "role",
      date: "1989",
      title: "Joined the George Mason University economics faculty",
      organization: "George Mason University",
      sourceIds: [S.stylus, S.wikipedia],
    },
    {
      id: "event-mercatus-director",
      kind: "role",
      date: "1998",
      title: "Appointed general director of the Mercatus Center",
      summary:
        "Named to lead both Mercatus and the James M. Buchanan Center for Political Economy by provost David Potter.",
      organization: "Mercatus Center",
      sourceIds: [S.stylus],
    },
    {
      id: "event-harris-chair",
      kind: "role",
      date: "2000",
      title: "Named Holbert Harris Chair of Economics",
      organization: "George Mason University",
      sourceIds: [S.stylus, S.mercatusScholar],
    },
    {
      id: "event-mr-launch",
      kind: "founded",
      date: "2003-08-21",
      title: "Launched Marginal Revolution with Alex Tabarrok",
      summary:
        "First post was a review of Jenny Uglow's The Lunar Men; the blog has published daily ever since.",
      organization: "Marginal Revolution",
      sourceIds: [S.mrAbout, S.mr20years, S.wikipediaMR],
    },
    {
      id: "event-nyt-column",
      kind: "role",
      date: "2006",
      title: "Joined the New York Times 'Economic Scene' rotation",
      organization: "The New York Times",
      sourceIds: [S.freakonomics, S.wikipedia],
    },
    {
      id: "event-chess-record-broken",
      kind: "milestone",
      date: "2006-09",
      title: "Youngest-NJ-Open-champion record broken after 29 years",
      summary: "Evan Ju surpassed Cowen's 1977 mark at the 2006 New Jersey Open.",
      sourceIds: [S.kenilworthian, S.mrObsolete],
    },
    {
      id: "event-tgs",
      kind: "publication",
      date: "2011-01-25",
      title: "Published The Great Stagnation",
      summary:
        "A ~15,000-word e-book-only Penguin eSpecial arguing the US had exhausted its 'low-hanging fruit'; a NYT bestseller.",
      sourceIds: [S.penguinTGS, S.mrTGS],
    },
    {
      id: "event-mru",
      kind: "founded",
      date: "2012",
      title: "Co-founded Marginal Revolution University",
      summary: "Free online economics education, with Alex Tabarrok, at Mercatus.",
      organization: "Marginal Revolution University",
      sourceIds: [S.mruniversity, S.tylercowen],
    },
    {
      id: "event-cwt-launch",
      kind: "founded",
      date: "2015-04-06",
      title: "Conversations with Tyler debuts with Peter Thiel",
      summary:
        "Episode 1 was a live interview at GMU's Arlington campus; the Mercatus-produced podcast continues on a biweekly schedule.",
      organization: "Mercatus Center",
      sourceIds: [S.cwtThiel, S.cwtSite],
    },
    {
      id: "event-bloomberg",
      kind: "role",
      date: "2016-07",
      title: "Joined Bloomberg View as staff columnist",
      organization: "Bloomberg Opinion",
      sourceIds: [S.bloombergmediaPress, S.bloombergColumn],
    },
    {
      id: "event-complacent-class",
      kind: "publication",
      date: "2017",
      title: "Published The Complacent Class",
      summary: "The Self-Defeating Quest for the American Dream (St. Martin's Press).",
      sourceIds: [S.gmuEcon, S.wikipedia],
    },
    {
      id: "event-ev-launch",
      kind: "founded",
      date: "2018-09-13",
      title: "Announced Emergent Ventures",
      summary:
        "Low-overhead fellowship and grant program for 'zero to one' ideas at Mercatus, launched with $1 million from the Thiel Foundation.",
      organization: "Mercatus Center",
      sourceIds: [S.mrEV, S.techcrunch, S.mercatusEV],
    },
    {
      id: "event-stubborn-attachments",
      kind: "publication",
      date: "2018-10-16",
      title: "Published Stubborn Attachments",
      summary:
        "Stripe Press; argues sustained economic growth and a free society are moral imperatives.",
      sourceIds: [S.mrWiblin, S.mrSAPreface, S.wikipedia],
    },
    {
      id: "event-loc",
      kind: "milestone",
      date: "2019-01",
      title: "Marginal Revolution selected for Library of Congress web archive",
      organization: "Library of Congress",
      sourceIds: [S.mrLoC],
    },
    {
      id: "event-scl",
      kind: "publication",
      date: "2020-01-01",
      title: "Published 'State Capacity Libertarianism' essay",
      summary:
        "Argued that effective state capacity is a prerequisite for markets and liberty; sparked wide debate.",
      sourceIds: [S.mrSCL, S.reasonSomin],
    },
    {
      id: "event-fast-grants",
      kind: "founded",
      date: "2020-04-07",
      title: "Launched Fast Grants with Patrick Collison and Patrick Hsu",
      summary:
        "COVID-19 research grants decided in under 48 hours; ultimately over $50 million and 260+ grants.",
      organization: "Mercatus Center",
      sourceIds: [S.mercatusFG, S.mrFG, S.futureFG],
    },
    {
      id: "event-talent",
      kind: "publication",
      date: "2022-05-17",
      title: "Published Talent (with Daniel Gross)",
      summary: "St. Martin's Press; the art and science of talent search.",
      sourceIds: [S.macmillanTalent],
    },
    {
      id: "event-goat",
      kind: "publication",
      date: "2023-10-23",
      title: "Released GOAT as a free 'generative book'",
      summary:
        "A 100,000-word analysis of the greatest economists, published free with GPT-4/Claude query interfaces.",
      sourceIds: [S.mrGOAT, S.mercatusGOAT, S.chssGOAT],
    },
    {
      id: "event-free-press",
      kind: "role",
      date: "2025-04-01",
      title: "Moved his column to The Free Press",
      organization: "The Free Press",
      sourceIds: [S.thefp, S.axios],
    },
  ],
  themes: [
    {
      id: "theme-growth-stagnation",
      kind: "philosophy",
      status: "stated",
      title: "Growth, stagnation, and low-hanging fruit",
      summary:
        "American prosperity rested on easily captured gains — free land, mass education, transformative technology — and median-income stagnation after ~1973 reflects their exhaustion, not merely bad policy. Renewal comes only through science and innovation that reach the median household.",
      sourceIds: [S.mrTGS, S.nytEconomix, S.newyorker, S.mrSAPreface],
    },
    {
      id: "theme-state-capacity",
      kind: "belief",
      status: "stated",
      title: "State capacity libertarianism",
      summary:
        "Markets and liberty need a capable state. In his 2020 essay he argued traditional libertarianism had hollowed out and that government quality — not size — is the variable that tracks prosperity and freedom.",
      sourceIds: [S.mrSCL, S.reasonSomin],
    },
    {
      id: "theme-complacency",
      kind: "belief",
      status: "stated",
      title: "The complacent class critique",
      summary:
        "Americans have sorted, matched, and hedged themselves into stasis — moving less, segregating by status, and defending the comfortable present at the expense of dynamism and future growth.",
      sourceIds: [S.gmuEcon, S.wikipedia, S.tylercowen],
    },
    {
      id: "theme-talent",
      kind: "method",
      status: "stated",
      title: "Talent identification as the highest-value skill",
      summary:
        "Spotting underrated, brilliant individuals — energizers, creatives, winners — is one of the simplest ways to gain an edge; interviews should ask 'larger picture' questions rather than elicit canned answers.",
      sourceIds: [S.macmillanTalent, S.mrEV, S.cwtSite],
    },
    {
      id: "theme-fast-patronage",
      kind: "practice",
      status: "inferred",
      title: "Patronage as institutional design",
      summary:
        "Emergent Ventures and Fast Grants apply the same template — minimal application, tiny team, rapid decisions, low overhead — treating grantmaking speed itself as the intervention. The blog doubles as the public ledger of grants.",
      sourceIds: [S.mercatusEV, S.mrEV, S.mercatusFG, S.futureFG, S.newscienceEV],
    },
    {
      id: "theme-economics-of-everyday",
      kind: "method",
      status: "stated",
      title: "Economics of everyday life — markets in everything",
      summary:
        "The blog's long-running lens applies price theory and incentives to food, art markets, fame, and culture; his dining guide operationalizes it: competition and consumer choice improve cuisine.",
      sourceIds: [S.wikipediaMR, S.tcedgRemarks, S.freakonomicsQA, S.wapo],
    },
    {
      id: "theme-infovore",
      kind: "practice",
      status: "reported",
      title: "The infovore regimen",
      summary:
        "Profiles describe a daily discipline of breadth — browsing many books and discarding fast, traveling constantly, eating across cuisines, posting every day — consumption structured as research.",
      sourceIds: [S.bloomberg2011, S.wapo, S.econ1843],
    },
    {
      id: "theme-daily-blogging",
      kind: "practice",
      status: "reported",
      title: "Daily blogging as thinking in public",
      summary:
        "Multiple posts a day since 2003, announcements of his grants and books made on the blog itself; the archive is now a Library of Congress web collection.",
      sourceIds: [S.mrAbout, S.bldavies, S.mr20years, S.mrLoC],
    },
    {
      id: "theme-schelling",
      kind: "influence",
      status: "reported",
      title: "Schelling's fingerprints",
      summary:
        "His doctoral advisor Thomas Schelling modeled how small incentives aggregate into large social outcomes; the characteristic Cowen move asks what equilibrium a rule creates and what second-order effects its designers missed.",
      sourceIds: [S.wikipedia, S.richmondFed],
    },
  ],
  works: [
    {
      id: "work-praise-commercial-culture",
      kind: "book",
      status: "published",
      title: "In Praise of Commercial Culture",
      date: "1998",
      summary:
        "Early statement of his cultural economics: markets nurture rather than degrade artistic production.",
      sourceIds: [S.wikipedia, S.tylercowen],
    },
    {
      id: "work-creative-destruction",
      kind: "book",
      status: "published",
      title: "Creative Destruction: How Globalization Is Changing the World's Cultures",
      date: "2002",
      sourceIds: [S.wikipedia, S.tylercowen],
    },
    {
      id: "work-inner-economist",
      kind: "book",
      status: "published",
      title: "Discover Your Inner Economist",
      date: "2007",
      summary: "Applying incentives to everyday decisions.",
      sourceIds: [S.wikipedia, S.tylercowen],
    },
    {
      id: "work-great-stagnation",
      kind: "book",
      status: "published",
      title: "The Great Stagnation",
      date: "2011-01-25",
      summary:
        "The 'low-hanging fruit' diagnosis of American stagnation; an e-book-only Penguin eSpecial and NYT bestseller.",
      sourceIds: [S.penguinTGS, S.mrTGS, S.newyorker],
    },
    {
      id: "work-economist-gets-lunch",
      kind: "book",
      status: "published",
      title: "An Economist Gets Lunch: New Rules for Everyday Foodies",
      date: "2012",
      summary: "The book-length version of his dining-guide economics.",
      sourceIds: [S.wikipedia, S.freakonomicsQA, S.tcedg],
    },
    {
      id: "work-average-is-over",
      kind: "book",
      status: "published",
      title: "Average Is Over",
      date: "2013",
      summary:
        "Sequel to The Great Stagnation: intelligent machines split the labor market into those who work with computers and those left behind.",
      sourceIds: [S.newyorker, S.wikipedia, S.tylercowen],
    },
    {
      id: "work-complacent-class",
      kind: "book",
      status: "published",
      title: "The Complacent Class: The Self-Defeating Quest for the American Dream",
      date: "2017",
      sourceIds: [S.gmuEcon, S.wikipedia, S.tylercowen],
    },
    {
      id: "work-stubborn-attachments",
      kind: "book",
      status: "published",
      title: "Stubborn Attachments",
      date: "2018-10-16",
      summary:
        "Stripe Press; his ethical bottom lines — sustained growth and a free, prosperous, responsible society.",
      sourceIds: [S.mrSAPreface, S.mrWiblin, S.wikipedia],
    },
    {
      id: "work-big-business",
      kind: "book",
      status: "published",
      title: "Big Business: A Love Letter to an American Anti-Hero",
      date: "2019",
      sourceIds: [S.wikipedia, S.tylercowen],
    },
    {
      id: "work-talent",
      kind: "book",
      status: "published",
      title: "Talent (with Daniel Gross)",
      date: "2022-05-17",
      summary: "St. Martin's Press; the art and science of talent search.",
      sourceIds: [S.macmillanTalent],
    },
    {
      id: "work-goat",
      kind: "book",
      status: "published",
      title: "GOAT: Who is the Greatest Economist of all Time, and Why Does it Matter?",
      date: "2023-10-23",
      summary:
        "A free ~100,000-word 'generative book' published with AI query interfaces.",
      sourceIds: [S.mrGOAT, S.mercatusGOAT, S.chssGOAT],
    },
    {
      id: "work-modern-principles",
      kind: "book",
      status: "published",
      title: "Modern Principles of Economics (with Alex Tabarrok)",
      summary: "A widely used introductory economics textbook.",
      sourceIds: [S.mrAbout, S.tylercowen],
    },
    {
      id: "work-marginal-revolution",
      kind: "project",
      status: "ongoing",
      title: "Marginal Revolution",
      date: "2003-08-21",
      summary:
        "The daily economics blog co-written with Alex Tabarrok; archived by the Library of Congress.",
      sourceIds: [S.mrAbout, S.mr20years, S.mrLoC],
    },
    {
      id: "work-mru",
      kind: "project",
      status: "ongoing",
      title: "Marginal Revolution University",
      date: "2012",
      summary: "Free online economics education housed at Mercatus.",
      sourceIds: [S.mruniversity, S.tylercowen],
    },
    {
      id: "work-cwt",
      kind: "project",
      status: "ongoing",
      title: "Conversations with Tyler",
      date: "2015",
      summary:
        "His biweekly interview podcast produced by Mercatus; 279+ episodes.",
      sourceIds: [S.cwtSite, S.cwtThiel],
    },
    {
      id: "work-emergent-ventures",
      kind: "project",
      status: "ongoing",
      title: "Emergent Ventures",
      date: "2018-09-13",
      summary:
        "Mercatus fellowship and grant program for 'zero to one' ideas; dozens of cohorts announced on Marginal Revolution.",
      sourceIds: [S.mrEV, S.mercatusEV, S.newscienceEV],
    },
    {
      id: "work-fast-grants",
      kind: "project",
      status: "completed",
      title: "Fast Grants",
      date: "2020-04",
      summary:
        "COVID-19 rapid science funding with Patrick Collison and Patrick Hsu: over $50 million, 260+ grants, decisions under 48 hours.",
      sourceIds: [S.mercatusFG, S.futureFG, S.wikipediaFG],
    },
    {
      id: "work-dining-guide",
      kind: "project",
      status: "ongoing",
      title: "Tyler Cowen's Ethnic Dining Guide",
      summary:
        "Washington, DC-area restaurant guide — 'All food is ethnic food' — published in numbered editions for decades and in blog form since 2010.",
      sourceIds: [S.tcedg, S.tcedgRemarks, S.eaterdc],
    },
  ],
  appearances: [
    {
      id: "appearance-cwt-thiel",
      title: "Conversations with Tyler, Ep. 1: Peter Thiel",
      venue: "Conversations with Tyler / Mercatus Center",
      publishedAt: "2015-04-06",
      participants: ["Tyler Cowen", "Peter Thiel"],
      summary:
        "The live inaugural episode at GMU's Arlington campus — stagnation, company names, chess, and the 'Straussian Christ.'",
      media: [
        {
          type: "audio",
          url: "https://conversationswithtyler.com/episodes/Peter-Thiel/",
          sourceId: S.cwtThiel,
        },
      ],
      sourceIds: [S.cwtThiel],
    },
    {
      id: "appearance-econtalk-goat",
      title: "Tyler Cowen on the GOAT of Economics (EconTalk)",
      venue: "EconTalk",
      publishedAt: "2023-10-30",
      participants: ["Tyler Cowen", "Russ Roberts"],
      summary:
        "Russ Roberts interviews Cowen on GOAT — his eighteenth EconTalk appearance.",
      media: [
        {
          type: "article",
          url: "https://www.econtalk.org/extra/whos-the-greatest-of-them-all/",
          sourceId: S.econtalk,
        },
      ],
      sourceIds: [S.econtalk],
    },
    {
      id: "appearance-wiblin",
      title: "Robert Wiblin's Conversation with Tyler Cowen",
      venue: "Conversations with Tyler (bonus) / 80,000 Hours",
      publishedAt: "2018-10-16",
      participants: ["Tyler Cowen", "Robert Wiblin"],
      summary:
        "A two-and-a-half-hour conversation on Stubborn Attachments, ranging across his worldview; text and audio on Marginal Revolution.",
      media: [
        {
          type: "transcript",
          url: "https://marginalrevolution.com/marginalrevolution/2018/10/robert-wiblins-conversation-tyler-cowen.html",
          sourceId: S.mrWiblin,
        },
      ],
      sourceIds: [S.mrWiblin],
    },
    {
      id: "appearance-nyt-economix",
      title: "Book Chat: A Conversation With Tyler Cowen",
      venue: "The New York Times (Economix)",
      publishedAt: "2011-02-03",
      participants: ["Tyler Cowen"],
      summary:
        "Q&A on The Great Stagnation, the economics of e-books, and why most books should be shorter.",
      media: [
        {
          type: "article",
          url: "https://archive.nytimes.com/economix.blogs.nytimes.com/2011/02/03/a-conversation-with-tyler-cowen/",
          sourceId: S.nytEconomix,
        },
      ],
      sourceIds: [S.nytEconomix],
    },
    {
      id: "appearance-kenilworthian",
      title: "Interview with the Former 'Youngest New Jersey Chess Champion'",
      venue: "The Kenilworthian",
      publishedAt: "2006-09-08",
      participants: ["Tyler Cowen"],
      summary:
        "A chess-blog interview on his 1977 New Jersey Open win, his ~2350 peak rating, and why he left the game.",
      media: [
        {
          type: "article",
          url: "http://kenilworthian.blogspot.com/2006/09/interview-with-former-youngest-new.html",
          sourceId: S.kenilworthian,
        },
      ],
      sourceIds: [S.kenilworthian],
    },
    {
      id: "appearance-richmond-fed",
      title: "Econ Focus interview",
      venue: "Federal Reserve Bank of Richmond",
      publishedAt: "2006",
      participants: ["Tyler Cowen"],
      summary:
        "A career interview in the Richmond Fed's economics magazine, with a CV block documenting his UC Irvine, GMU, and Harvard record.",
      media: [
        {
          type: "article",
          url: "https://www.richmondfed.org/-/media/richmondfedorg/publications/research/econ_focus/2006/winter/pdf/interview.pdf",
          sourceId: S.richmondFed,
        },
      ],
      sourceIds: [S.richmondFed],
    },
    {
      id: "appearance-freakonomics-qa",
      title: "Foodie Economist Tyler Cowen Answers Your Questions",
      venue: "Freakonomics",
      publishedAt: "2012-06",
      participants: ["Tyler Cowen"],
      summary:
        "Reader Q&A on food economics and authenticity, tied to An Economist Gets Lunch.",
      media: [
        {
          type: "article",
          url: "https://freakonomics.com/2012/06/foodie-economist-tyler-cowen-answers-your-questions/",
          sourceId: S.freakonomicsQA,
        },
      ],
      sourceIds: [S.freakonomicsQA],
    },
  ],
  openQuestions: [
    "Whether the Great Stagnation thesis still holds — and when, if ever, it ended — is unresolved; Cowen has periodically suggested the stagnation is over while continuing to defend the original diagnosis.",
    "Official sources disagree on his chair's name: 'Holbert C. Harris' (2006 Richmond Fed interview, 2010 Stylus) vs. 'Holbert L. Harris' (current Mercatus bio).",
    "Conversations with Tyler episode 1 is dated April 6, 2015 on the official site; Apple Podcasts lists March 25, 2015, and the live recording occurred March 31, 2015.",
    "The Ethnic Dining Guide's start year is not pinned in the cited record; the sixteenth numbered edition was July 2004 and blog format began May 2010.",
    "The Complacent Class publication month varies by source — his GMU faculty page says January 2017; publisher listings say February 2017.",
    "Whether 'state capacity libertarianism' describes a real movement or primarily Cowen's own position is contested (see Ilya Somin's Reason critique).",
    "Fast Grants totals are reported variously: 'over $50 million and 260+ grants' (the founders' retrospective) versus '250 grants as of April 2021' (Wikipedia).",
    "His Mercatus title has evolved across sources — general director (1998), chairman and general director, and now chairman and faculty director.",
  ],
  body: `Tyler Cowen is an American economist who has built a one-man media-and-patronage institution around a single premise: that the most valuable thing an economist can do is find and fund underrated talent. He holds the Holbert Harris Chair of Economics at George Mason University and has run its Mercatus Center since 1998 — the same institution that produces his podcast, houses his grant programs, and incubated both Marginal Revolution University and the COVID-era Fast Grants.

## Identity and formation

Born January 21, 1962 in Bergen County, New Jersey and raised in Hillsdale, Cowen was a chess prodigy before he was an economist: in September 1977, at fifteen years and eight months, he won the New Jersey Open — the youngest champion in its history, a record that stood 29 years. By sixteen his rating was roughly 2350, national-master strength, and then he quit, telling a chess interviewer decades later that the game offered "little stability and poor benefits" — an unsentimental read of diminishing returns he has applied to everything since.

He took his BS in economics at George Mason in 1983, when the department was assembling its identity around public choice and Austrian economics, then a Harvard PhD in 1987 under Thomas Schelling, whose fingerprints — small incentives aggregating into surprising social outcomes — cover Cowen's later work. After two years as an assistant professor at UC Irvine he returned to GMU in 1989 and never left. In 1998 the provost named him general director of the Mercatus Center, then a marginal market-oriented research shop; it is now the institutional base for nearly everything he does.

## The work

Three ventures anchor his public output. First, Marginal Revolution, the blog he co-founded with Alex Tabarrok in August 2003 — first post a review of *The Lunar Men* — and which he has fed daily ever since: a third-party analysis counted 34,189 posts in its first two decades, about 86 percent his. The Library of Congress selected it for its Economics Blogs Web Archive in 2019. Second, Conversations with Tyler, the Mercatus-produced interview podcast launched in 2015 with Peter Thiel as episode one; it runs on deep preparation and deliberately oblique questions, and has passed 279 episodes. Third, the patronage arm: Emergent Ventures (announced September 13, 2018, seeded with $1 million from the Thiel Foundation) makes small, fast grants to "zero to one" people and projects, cohorts announced on the blog itself. In April 2020 that machinery produced Fast Grants with Patrick Collison and Patrick Hsu — COVID-19 research grants of $10,000 to $500,000 decided in under 48 hours. It raised over $50 million and made more than 260 grants at under 3 percent overhead; the founders' retrospective reports 64 percent of recipients saying the funded work would not have happened otherwise.

His books trace an arc. Early work was cultural economics (*In Praise of Commercial Culture*, 1998; *Creative Destruction*, 2002). The 2011 *Great Stagnation* — a ~15,000-word e-book-only Penguin eSpecial, a deliberate bet that books should be shorter — made him famous beyond economics with its thesis that America had eaten its "low-hanging fruit" of free land, mass education, and breakthrough technology, and that median-income stagnation since ~1973 was deeper than politics. *Average Is Over* (2013) extended it to machine labor; *The Complacent Class* (2017) diagnosed American stasis; *Stubborn Attachments* (2018) made the moral case for sustained growth; *Big Business* (2019) defended corporations; *Talent* (2022, with Daniel Gross) codified his people-spotting method; and *GOAT* (2023) — released free as a ~100,000-word "generative book" queryable through GPT-4 and Claude — ranked the greatest economists while betting on a new publishing form.

He wrote the New York Times "Economic Scene" column for about a decade from 2006, joined Bloomberg View as a staff columnist in July 2016 for roughly eight years, and on April 1, 2025 moved the column to The Free Press. Separately — but on the same theory of applied economics — he has published Tyler Cowen's Ethnic Dining Guide to the Washington, DC area for decades ("All food is ethnic food"; the best restaurants cluster in cheap suburban strip malls where competition compounds).

## The philosophy

Three commitments recur. Growth is the master variable: *Stubborn Attachments* argues sustained growth in wealthy countries is a moral imperative with spillovers for the global poor — a position he lives literally, having directed his share of that book's income to an Ethiopian man he met. Stagnation is the shadow thesis: the easy gains are gone and only science that reaches the median household restores them. And in January 2020 he announced on the blog that old-style libertarianism had "hollowed out," proposing "state capacity libertarianism" — a deliberately "non-sticky name" for the view that markets need a capable state to survive — drawing skeptical responses from libertarians like Ilya Somin and a small academic literature of its own.

## What the record does not settle

The seams are real. The Great Stagnation's end date is contested, including by Cowen himself. "State capacity libertarianism" may name a movement or mostly his own position. The chair's name differs across official sources (Holbert C. vs. Holbert L. Harris), the dining guide's start year is unpinned, Fast Grants' totals vary between 250 and 260-plus grants depending on the tally date, and the first podcast episode carries three different dates across platforms. The index preserves those seams rather than smoothing them.

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
