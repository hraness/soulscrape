#!/usr/bin/env bun
/** Generate examples/people/long-now-foundation/person-index.json.
 *
 * Subject kind "organization": the three founders ride in `relations`
 * (founded_by), board members as `member` edges, documented project funders
 * as `funded_by` (scoped in the note — Safra funded the first clock
 * prototype, Myhrvold the Orrery, Bezos the Texas installation; none is a
 * blanket claim on the organization's finances).
 *
 * Deliberately unresolved: the Texas clock's completion timeline, the
 * split between membership revenue and project patronage, and board tenure
 * dates (the board page lists current and emeritus members without dates).
 */

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

// --- subject-controlled -------------------------------------------------------

const lnAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — The Long Now Foundation",
  url: "https://longnow.org/about/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's own about page: established 01996 by Stewart Brand, Danny Hillis, and Brian Eno; mission framed around long-term thinking for the next 10,000 years; links its projects (Clock, Rosetta, Talks, Ideas, Interval, Nevada).",
});

const lnBoard = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Board — The Long Now Foundation",
  url: "https://longnow.org/people/board/",
  publisher: "The Long Now Foundation",
  notes:
    "The official board page: current board (Brand, Eno, Costigan, Remy, Speicher, Collison, Eagleman, Kelly, Rumsey) plus a board-emeritus list (Hillis, Anderson, Carlston, Dowd, Dyson, Fu, Fulton, Kapor, Keller, Kennedy, Polese, Rose, Saffo, Schwartz, Solomon). No tenure dates given.",
});

const lnClock = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The 10,000 Year Clock — project page",
  url: "https://longnow.org/clock/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's project page for the monumental-scale clock: design principles and the mountain site.",
});

const lnClockFaq = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Clock of the Long Now — FAQ",
  url: "https://longnow.org/clock/faq/",
  publisher: "The Long Now Foundation",
  notes:
    "The official FAQ is the key funding source: Jacqui Safra funded the first clock, Nathan Myhrvold funded the Orrery prototype, and Jeff Bezos is funding the full-scale clock in west Texas — three distinct funders of three distinct things.",
});

const lnTalks = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Long Now Talks",
  url: "https://longnow.org/talks/",
  publisher: "The Long Now Foundation",
  notes:
    "Archive of the lecture series — Seminars About Long-term Thinking (SALT), now Long Now Talks — hundreds of recorded talks back to 02003.",
});

const lnInterval = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Interval at Long Now",
  url: "https://longnow.org/interval/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's page for its Fort Mason venue: bar, cafe, library, and event space built as a 'home for long-term thinking.'",
});

const lnNevada = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Nevada Bristlecone Preserve",
  url: "https://longnow.org/nevada/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's page for its eastern Nevada mountain land — home of ancient bristlecone pines and a candidate second clock site.",
});

const lnPace = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Pace Layers",
  url: "https://longnow.org/pacelayers/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's page for Stewart Brand's pace-layers framework — fashion, commerce, infrastructure, governance, culture, nature — now also a print journal.",
});

const lnDonate = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Donate / Join — The Long Now Foundation",
  url: "https://longnow.org/donate/",
  publisher: "The Long Now Foundation",
  notes:
    "Membership tiers (Stainless Steel $12/mo, Monel $30/mo, Tungsten $80/mo, Bristlecone $1,000+/yr) and what donations support; confirms 501(c)(3) status and tax ID 68-0384748.",
});

const lnIdeasClockMountain = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Clock in the Mountain",
  url: "https://longnow.org/ideas/clock-in-the-mountain/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's own account of the west Texas mountain site and the full-scale clock installation.",
});

const lnIdeasUpdate = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Major Update on the 10,000 Year Clock Project",
  url: "https://longnow.org/ideas/major-update-on-the-10000-year-clock-project/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's 02018 update on the Texas installation — machining progress and the state of the project.",
});

const lnIdeasInterval = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "The Interval at Long Now Opens June 15th and TheInterval.org is live",
  url: "https://longnow.org/ideas/the-interval-at-long-now-opens-on-june-15th-and-theinterval-org/",
  publisher: "The Long Now Foundation",
  publishedAt: "2014-06-09",
  authors: ["Mikl Em"],
  notes:
    "Opening announcement: The Interval opened Sunday June 15, 02014 at Fort Mason with clock artifacts, an Eno ambient painting, and a then-1,000+ volume Manual for Civilization.",
});

const lnIdeasAnathem = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Anathem and Long Now",
  url: "https://longnow.org/ideas/anathem-and-long-now/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's account of the connections between Neal Stephenson's Anathem and the clock project.",
});

const lnIdeasStephenson = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Neal Stephenson and the 10,000 Year Clock",
  url: "https://longnow.org/ideas/neal-stephenson-and-the-10000-year-clock/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's note on Stephenson's long association with the project and his visits to both clock sites.",
});

const lnIdeasRosetta = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "After more than a decade, ESA's Rosetta mission arrives at comet 67P",
  url: "https://longnow.org/ideas/after-more-than-a-decade-esas-rosetta-mission-arrives-at-comet-67p/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's own post on the Rosetta spacecraft's arrival carrying the Rosetta Disk — a project of the foundation flown on an ESA mission.",
});

const lnIdeasBuffett = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Warren Buffett wins million-dollar Long Bet",
  url: "https://longnow.org/ideas/warren-buffett-wins-million-dollar-long-bet/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's write-up of the resolution of Buffett's famous bet against hedge funds, settled through its Long Bets platform.",
});

const lnIdeasBuffett2 = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "How Warren Buffett won his multi-million dollar Long Bet",
  url: "https://longnow.org/ideas/how-warren-buffett-won-his-multi-million-dollar-long-bet/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's second write-up on the Buffett–Protégé Partners bet and the payout to Girls Inc. of Omaha.",
});

const lnTalkStephenson = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Neal Stephenson — ANATHEM Book Launch Event",
  url: "https://longnow.org/talks/02008-stephenson/",
  publisher: "The Long Now Foundation",
  publishedAt: "2008-09-09",
  notes:
    "Talk page for the Anathem launch at the Regency Ballroom, September 9, 02008 — over 900 attending; Brand and Hillis joined Stephenson on stage.",
});

const lnGithubLongview = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "longnow/longview — Long Viewer source",
  url: "https://github.com/longnow/longview",
  publisher: "GitHub",
  notes:
    "The foundation's own repository for the Long Viewer timeline software — the codebase behind the Interval's timeline displays.",
});

const lnChabonPdf = source({
  binding: "subject_controlled",
  mediaType: "pdf",
  title: "Michael Chabon — The Omega Glory",
  url: "https://media.longnow.org/files/2/Michael_Chabon_-_The_Omega_Glory.pdf",
  publisher: "The Long Now Foundation",
  publishedAt: "2006",
  authors: ["Michael Chabon"],
  notes:
    "Chabon's essay on the Clock of the Long Now, hosted on the foundation's media server.",
});

const intervalSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Interval at Long Now",
  url: "https://theinterval.org/",
  publisher: "The Long Now Foundation",
  notes:
    "The venue's own site — hours, menus, and event listings for the Fort Mason space.",
});

const rosettaSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Rosetta Project",
  url: "https://rosettaproject.org/",
  publisher: "The Long Now Foundation",
  notes: "The language archive's own site, run by the foundation.",
});

const longbetsSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Long Bets",
  url: "https://longbets.org/",
  publisher: "The Long Now Foundation",
  notes:
    "The predictions arena's own site — 'a service of the Long Now Foundation' — listing bets, predictions, and rules.",
});

const panlexSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "PanLex",
  url: "https://panlex.org/",
  publisher: "The Long Now Foundation",
  notes:
    "The PanLex project's own site — the lexical-translation database operating under the foundation.",
});

const lnRosettaBlog = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "A Very Long-Term Backup — Rosetta Project blog",
  url: "https://rosettaproject.org/blog/02008/aug/20/very-long-term-backup/",
  publisher: "The Rosetta Project (Long Now Foundation)",
  publishedAt: "2008-08-20",
  notes:
    "The project's own blog describing the Rosetta Disk as a very long-term backup of human languages.",
});

const lnMediumManual = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Books for a library to sustain civilization",
  url: "https://medium.com/the-long-now-foundation/books-library-civilization-future-knowledge-3a8f750d6b86",
  publisher: "The Long Now Foundation (Medium)",
  publishedAt: "2018",
  notes:
    "The foundation's Medium post on the Manual for Civilization library's scope and selection process.",
});

// --- first person (founders narrating) ----------------------------------------

const lnMillennium = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Millennium Clock",
  url: "https://longnow.org/ideas/the-millennium-clock/",
  publisher: "The Long Now Foundation",
  publishedAt: "1995-02-15",
  authors: ["Danny Hillis"],
  notes:
    "Hillis's founding essay — 'a clock that ticks once a year... the cuckoo comes out on the millennium' — first published in Wired's 01995 Scenarios issue. Records that Eno named the Clock of the Long Now.",
});

const lnBigHere = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Big Here and Long Now",
  url: "https://longnow.org/ideas/the-big-here-and-long-now/",
  publisher: "The Long Now Foundation",
  publishedAt: "2000-05-01",
  authors: ["Brian Eno"],
  notes:
    "Eno's essay naming the 'Long Now' idea — and its page carries the 1996 founding-board photograph caption: Carlston, Saffo, Schwartz, Brand, Kelly, Hillis, Eno.",
});

const tedBrand = source({
  binding: "first_person",
  mediaType: "video",
  title: "Stewart Brand: The Long Now — TED2004",
  url: "https://www.ted.com/talks/stewart_brand_the_long_now",
  publisher: "TED",
  publishedAt: "2004-02",
  authors: ["Stewart Brand"],
  notes:
    "Brand's TED talk on the foundation and the clock — including the Nevada land account crediting Jay Walker and Mitch Kapor with enabling the Mount Washington purchase.",
});

// --- archive --------------------------------------------------------------------

const lnLegacy = source({
  binding: "archive",
  mediaType: "webpage",
  title: "About — legacy.longnow.org",
  url: "https://legacy.longnow.org/about/",
  publisher: "The Long Now Foundation",
  notes:
    "The foundation's frozen legacy about page — an earlier self-description preserved for comparison with the current site.",
});

const archive10k = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Rosetta Mission — 10k Library archive",
  url: "https://archive.longnow.org/www.longnow.org/01999-02005/10klibrary/RosettaMission.htm",
  publisher: "The Long Now Foundation (archive)",
  notes:
    "Archived early-2000s page on the Rosetta mission carrying the foundation's language disk.",
});

const dylanTweney = source({
  binding: "archive",
  mediaType: "article",
  title: "How to Make a Clock Run for 10,000 Years",
  url: "https://dylan.tweney.com/clock-10000-years/",
  publisher: "Wired (author's repost)",
  publishedAt: "2011-06-23",
  authors: ["Dylan Tweney"],
  notes:
    "The author's own archive of his June 2011 Wired feature: the $42M figure attributed to Bezos himself, the excavation timeline, and the Smithsonian's conditional agreement to host a clock.",
});

// --- primary records ------------------------------------------------------------

const propublica = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Long Now Foundation — ProPublica Nonprofit Explorer",
  url: "https://projects.propublica.org/nonprofits/organizations/680384748",
  publisher: "ProPublica",
  notes:
    "IRS Form 990 records for EIN 68-0384748 — revenue, officers, and filing history for the nonprofit.",
});

const charityNav = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Long Now Foundation — Charity Navigator profile",
  url: "https://www.charitynavigator.org/ein/680384748",
  publisher: "Charity Navigator",
  notes: "Charity evaluator profile for EIN 68-0384748.",
});

const locAuth = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Long Now Foundation — Library of Congress authority record",
  url: "https://id.loc.gov/authorities/names/n99262976.html",
  publisher: "Library of Congress",
  notes:
    "Name authority record n99262976 — bibliographic existence proof for the foundation.",
});

// --- reporting -------------------------------------------------------------------

const sciMuseum = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Clock of the Long Now",
  url: "https://blog.sciencemuseum.org.uk/the-clock-of-the-long-now/",
  publisher: "Science Museum (blog)",
  publishedAt: "2013-07-31",
  authors: ["David Rooney"],
  notes:
    "The museum's curator of time on the prototype in its Making the Modern World gallery: first ticked NYE 01999, built 1997–99 by a team led by Alexander Rose, Eno named the 'Long Now,' Schwartz proposed ±10,000 years.",
});

const wiredCeo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jeff Bezos, CEO of the internet",
  url: "https://www.wired.com/story/ceo-of-the-internet/",
  publisher: "Wired",
  publishedAt: "2011",
  notes:
    "Bezos profile that includes his funding of the 10,000-year clock and the thinking behind it.",
});

const wiredWaste = source({
  binding: "reporting",
  mediaType: "article",
  title: "The 10,000-Year Clock Is a Waste of Time",
  url: "https://www.wired.com/story/the-10000-year-clock-is-a-waste-of-time/",
  publisher: "Wired",
  publishedAt: "2018-02",
  notes:
    "A critical take on the clock's premise — kept in the catalog as evidence of dissent, not adjudicated.",
});

const wired25 = source({
  binding: "reporting",
  mediaType: "article",
  title: "WIRED25: Jeff Bezos on the 10,000-year clock and civilization",
  url: "https://www.wired.com/story/wired25-jeff-bezos-10000-year-clock-civilization/",
  publisher: "Wired",
  publishedAt: "2018",
  notes: "Bezos on the clock and long-term thinking at Wired's 25th-anniversary event.",
});

const geekwireWhy = source({
  binding: "reporting",
  mediaType: "article",
  title: "Why Jeff Bezos is helping create a 10,000-year clock",
  url: "https://www.geekwire.com/2011/why-jeff-bezos-is-helping-create-a-10000-year-clock/",
  publisher: "GeekWire",
  publishedAt: "2011",
  notes: "Contemporaneous report on the funding announcement.",
});

const geekwire42 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jeff Bezos celebrates long-term thinking, budgets $42M for clock that ticks for 10,000 years",
  url: "https://www.geekwire.com/2011/jeff-bezos-celebrates-longterm-thinking-budgets-42m-clock-ticks-10000-years/",
  publisher: "GeekWire",
  publishedAt: "2011",
  notes:
    "The $42 million figure as reported — a budget Bezos stated, not an audited spend.",
});

const geekwire2018 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Video: Jeff Bezos shows installation of 10,000-year clock ticking along in Texas",
  url: "https://www.geekwire.com/2018/video-jeff-bezos-shows-installation-10000-year-clock-ticking-along-texas/",
  publisher: "GeekWire",
  publishedAt: "2018",
  notes: "Report on the February 2018 installation footage.",
});

const ieee = source({
  binding: "reporting",
  mediaType: "article",
  title: "Engineering the 10,000-Year Clock",
  url: "https://spectrum.ieee.org/engineering-the-10-000year-clock",
  publisher: "IEEE Spectrum",
  notes:
    "Engineering treatment of the clock's design — the torsional pendulum, mechanical computer, and maintainability constraints.",
});

const smithClock = source({
  binding: "reporting",
  mediaType: "article",
  title: "Funded by Jeff Bezos, construction underway on clock that will keep time for 10,000 years",
  url: "https://www.smithsonianmag.com/smart-news/funded-jeff-bezos-construction-underway-clock-will-keep-time-10000-years-180968253/",
  publisher: "Smithsonian Magazine",
  publishedAt: "2018",
  notes: "Smart News coverage of the installation's progress.",
});

const smithRosetta = source({
  binding: "reporting",
  mediaType: "article",
  title: "This necklace contains all the world's languages",
  url: "https://www.smithsonianmag.com/smart-news/necklace-contains-all-worlds-languages-180961876/",
  publisher: "Smithsonian Magazine",
  notes:
    "Coverage of the wearable Rosetta Disk — the project's language archive miniaturized as an artifact.",
});

const snopes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Is Jeff Bezos funding a 10,000-year clock?",
  url: "https://www.snopes.com/fact-check/bezos-10000-year-clock/",
  publisher: "Snopes",
  notes:
    "Fact-check confirming the funding story while clarifying what's actually documented.",
});

const popmech = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jeff Bezos' 10,000-year clock in a Texas mountain",
  url: "https://www.popularmechanics.com/science/a31156395/jeff-bezos-clock-long-now-mountain/",
  publisher: "Popular Mechanics",
  publishedAt: "2020",
  notes:
    "Later coverage of the installation — useful for how little completion information exists publicly.",
});

const biBezos = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jeff Bezos is building a 10,000-year clock",
  url: "https://www.businessinsider.com/jeff-bezos-10000-year-clock-2011-6",
  publisher: "Business Insider",
  publishedAt: "2011-06",
  notes: "Business-press coverage of the funding announcement.",
});

const npr2018 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Installation progresses on Bezos-backed 10,000-year clock",
  url: "https://www.npr.org/sections/thetwo-way/2018/02/22/587840868-installation-progresses-on-bezos-backed-10-000-year-clock",
  publisher: "NPR",
  publishedAt: "2018-02-22",
  notes: "NPR's report on the 2018 installation milestone.",
});

const cnbcBuffett = source({
  binding: "reporting",
  mediaType: "article",
  title: "Warren Buffett's $1 million wager: Wall Street experts can't beat the S&P",
  url: "https://www.cnbc.com/2008/06/09/warren-buffetts-1-million-wager-wall-street-experts-cant-beat-the-sp.html",
  publisher: "CNBC",
  publishedAt: "2008-06-09",
  notes:
    "Contemporaneous coverage of the Buffett–Protégé Partners bet administered by Long Bets.",
});

const esaRosetta = source({
  binding: "reporting",
  mediaType: "article",
  title: "Rosetta Disk goes back to the future",
  url: "https://sci.esa.int/web/rosetta/-/31242-rosetta-disk-goes-back-to-the-future",
  publisher: "European Space Agency",
  notes:
    "ESA's own page on carrying the Long Now Rosetta Disk on the comet mission — third-party confirmation from the mission operator.",
});

const sfchronInterval = source({
  binding: "reporting",
  mediaType: "article",
  title: "Long Now Foundation opens the Interval cafe-bar",
  url: "https://www.sfchronicle.com/food/article/Long-Now-Foundation-opens-the-Interval-cafe-bar-5583307.php",
  publisher: "San Francisco Chronicle",
  publishedAt: "2014-06",
  notes: "Local coverage of the venue's opening at Fort Mason.",
});

const nytInterval = source({
  binding: "reporting",
  mediaType: "article",
  title: "A robot bartender for the Interval",
  url: "https://archive.nytimes.com/tmagazine.blogs.nytimes.com/2014/06/12/interval-robot-bar-san-francisco-brian-eno/",
  publisher: "The New York Times (T Magazine blog archive)",
  publishedAt: "2014-06-12",
  notes:
    "T Magazine's archived blog post on the Interval's opening — Eno's sound/light installation and the bar concept.",
});

const cbsInterval = source({
  binding: "reporting",
  mediaType: "article",
  title: "Salon for long-term thinking opens at Fort Mason Center",
  url: "https://www.cbsnews.com/sanfrancisco/news/salon-long-term-thinking-drinks-conversation-opens-fort-mason-center/",
  publisher: "CBS News San Francisco",
  publishedAt: "2014-06",
  notes: "Local TV coverage of the Interval's opening week.",
});

const sprudge = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Interval at Long Now Foundation",
  url: "https://sprudge.com/interval-long-now-foundation-61693.html",
  publisher: "Sprudge",
  publishedAt: "2014",
  notes:
    "Coffee-trade coverage of the venue — Sightglass service and the space's design.",
});

const axiosInterval = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Interval among San Francisco's best bars",
  url: "https://www.axios.com/local/san-francisco/2024/02/22/the-interval-fort-mason-san-francisco-best-bars",
  publisher: "Axios",
  publishedAt: "2024-02-22",
  notes:
    "A decade on, the venue still operating and still being written up — evidence of continuity.",
});

const quartz = source({
  binding: "reporting",
  mediaType: "article",
  title: "This necklace contains all languages known to man",
  url: "https://qz.com/885379/this-necklace-contains-all-languages-known-to-man",
  publisher: "Quartz",
  notes: "Quartz coverage of the wearable Rosetta Disk.",
});

const gizmodo = source({
  binding: "reporting",
  mediaType: "article",
  title: "The 10,000-year-old clock that inspired Neal Stephenson",
  url: "https://www.gizmodo.com/the-10-000-year-old-clock-that-inspired-neal-stephenson-5027398",
  publisher: "Gizmodo",
  publishedAt: "2008",
  notes:
    "Contemporaneous coverage tying Anathem's release to the clock project.",
});

const mashable = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jeff Bezos and the 10,000-year clock",
  url: "https://mashable.com/archive/jeff-bezos-10000-year-clock",
  publisher: "Mashable",
  notes: "Additional press on the Bezos-backed clock story.",
});

const laughingsquid = source({
  binding: "reporting",
  mediaType: "article",
  title: "Long Now Foundation 10,000-year clock installation",
  url: "https://laughingsquid.com/long-now-foundation-10000-year-clock-installation/",
  publisher: "Laughing Squid",
  notes: "Culture-blog coverage of the installation footage.",
});

// --- reference --------------------------------------------------------------------

const wikiLongNow = source({
  binding: "reference",
  mediaType: "article",
  title: "Long Now Foundation",
  url: "https://en.wikipedia.org/wiki/Long_Now_Foundation",
  publisher: "Wikipedia",
  notes:
    "Reference summary: formed January 4, 1996; 501(c)(3) tax ID 68-0384748; headquarters at Fort Mason Center, San Francisco; founders Brand, Hillis, Eno.",
});

const wikiClock = source({
  binding: "reference",
  mediaType: "article",
  title: "Clock of the Long Now",
  url: "https://en.wikipedia.org/wiki/Clock_of_the_Long_Now",
  publisher: "Wikipedia",
  notes: "Reference on the clock project's history and design.",
});

const wikiRosetta = source({
  binding: "reference",
  mediaType: "article",
  title: "Rosetta Project",
  url: "https://en.wikipedia.org/wiki/Rosetta_Project",
  publisher: "Wikipedia",
  notes: "Reference on the language-archive project.",
});

const wikiLongBets = source({
  binding: "reference",
  mediaType: "article",
  title: "Long Bets",
  url: "https://en.wikipedia.org/wiki/Long_Bets",
  publisher: "Wikipedia",
  notes: "Reference on the predictions arena.",
});

const lnBristlecone = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title:
    "Anne Heggli, Jonathon Keats, & Adam Csank: Art & Science at the Nevada Bristlecone Preserve — Long Now Talks",
  url: "https://longnow.org/talks/02026-heggli-keats-csank/",
  publisher: "The Long Now Foundation",
  publishedAt: "2026-09-29",
  notes:
    "Upcoming Interval talk: Heggli presents a decade of NevCAN bristlecone-pine climate monitoring at the Nevada Bristlecone Preserve, alongside the Elders of Time documentary on Keats's multi-millennial 'Centuries of the Bristlecone' artwork commissioned with the Nevada Museum of Art.",
});
const wikidataLn = source({
  binding: "reference",
  mediaType: "dataset",
  title: "The Long Now Foundation (Q568907)",
  url: "https://www.wikidata.org/wiki/Q568907",
  publisher: "Wikidata",
  notes: "Wikidata item for the foundation.",
});

const S = {
  lnAbout: lnAbout.id,
  lnBoard: lnBoard.id,
  lnClock: lnClock.id,
  lnClockFaq: lnClockFaq.id,
  lnTalks: lnTalks.id,
  lnInterval: lnInterval.id,
  lnNevada: lnNevada.id,
  lnPace: lnPace.id,
  lnDonate: lnDonate.id,
  intervalSite: intervalSite.id,
  rosettaSite: rosettaSite.id,
  longbetsSite: longbetsSite.id,
  panlexSite: panlexSite.id,
  lnIdeasClockMountain: lnIdeasClockMountain.id,
  lnIdeasUpdate: lnIdeasUpdate.id,
  lnIdeasInterval: lnIdeasInterval.id,
  lnIdeasAnathem: lnIdeasAnathem.id,
  lnIdeasStephenson: lnIdeasStephenson.id,
  lnIdeasRosetta: lnIdeasRosetta.id,
  lnIdeasBuffett: lnIdeasBuffett.id,
  lnIdeasBuffett2: lnIdeasBuffett2.id,
  lnTalkStephenson: lnTalkStephenson.id,
  lnGithubLongview: lnGithubLongview.id,
  lnChabonPdf: lnChabonPdf.id,
  lnRosettaBlog: lnRosettaBlog.id,
  lnMediumManual: lnMediumManual.id,
  lnMillennium: lnMillennium.id,
  lnBigHere: lnBigHere.id,
  tedBrand: tedBrand.id,
  lnLegacy: lnLegacy.id,
  archive10k: archive10k.id,
  dylanTweney: dylanTweney.id,
  propublica: propublica.id,
  charityNav: charityNav.id,
  locAuth: locAuth.id,
  sciMuseum: sciMuseum.id,
  wiredCeo: wiredCeo.id,
  wiredWaste: wiredWaste.id,
  wired25: wired25.id,
  geekwireWhy: geekwireWhy.id,
  geekwire42: geekwire42.id,
  geekwire2018: geekwire2018.id,
  ieee: ieee.id,
  smithClock: smithClock.id,
  smithRosetta: smithRosetta.id,
  snopes: snopes.id,
  popmech: popmech.id,
  biBezos: biBezos.id,
  npr2018: npr2018.id,
  cnbcBuffett: cnbcBuffett.id,
  esaRosetta: esaRosetta.id,
  sfchronInterval: sfchronInterval.id,
  nytInterval: nytInterval.id,
  cbsInterval: cbsInterval.id,
  sprudge: sprudge.id,
  axiosInterval: axiosInterval.id,
  quartz: quartz.id,
  gizmodo: gizmodo.id,
  mashable: mashable.id,
  laughingsquid: laughingsquid.id,
  wikiLongNow: wikiLongNow.id,
  wikiClock: wikiClock.id,
  wikiRosetta: wikiRosetta.id,
  wikiLongBets: wikiLongBets.id,
  wikidataLn: wikidataLn.id,
  lnBristlecone: lnBristlecone.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-long-now-foundation",
  generatedAt: "2026-09-25T21:49:43Z",
  subject: {
    kind: "organization",
    handle: "long-now-foundation",
    displayName: "The Long Now Foundation",
    alsoKnownAs: ["Long Now Foundation", "Long Now"],
    summary:
      "San Francisco nonprofit founded in 01996 by Stewart Brand, Danny Hillis, and Brian Eno to encourage long-term thinking and responsibility on a 10,000-year timescale. Its projects include the Clock of the Long Now, the Rosetta Project, PanLex, Long Bets, a decades-running talk series, and The Interval venue at Fort Mason — funded by members and by patrons including Jeff Bezos for the Texas clock installation.",
    identity: {
      wikidataId: "Q568907",
      officialSite: "https://longnow.org/",
      wikipedia: "https://en.wikipedia.org/wiki/Long_Now_Foundation",
      profiles: [
        "https://x.com/longnow",
        "https://www.linkedin.com/company/longnow/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:49:43Z",
    coverage: [
      "history",
      "projects",
      "people",
      "funding",
      "membership",
      "media",
    ],
  },
  sources: [
    lnAbout,
    lnBoard,
    lnClock,
    lnClockFaq,
    lnTalks,
    lnInterval,
    lnNevada,
    lnPace,
    lnDonate,
    intervalSite,
    rosettaSite,
    longbetsSite,
    panlexSite,
    lnIdeasClockMountain,
    lnIdeasUpdate,
    lnIdeasInterval,
    lnIdeasAnathem,
    lnIdeasStephenson,
    lnIdeasRosetta,
    lnIdeasBuffett,
    lnIdeasBuffett2,
    lnTalkStephenson,
    lnGithubLongview,
    lnChabonPdf,
    lnRosettaBlog,
    lnMediumManual,
    lnMillennium,
    lnBigHere,
    tedBrand,
    lnLegacy,
    archive10k,
    dylanTweney,
    propublica,
    charityNav,
    locAuth,
    sciMuseum,
    wiredCeo,
    wiredWaste,
    wired25,
    geekwireWhy,
    geekwire42,
    geekwire2018,
    ieee,
    smithClock,
    smithRosetta,
    snopes,
    popmech,
    biBezos,
    npr2018,
    cnbcBuffett,
    esaRosetta,
    sfchronInterval,
    nytInterval,
    cbsInterval,
    sprudge,
    axiosInterval,
    quartz,
    gizmodo,
    mashable,
    laughingsquid,
    wikiLongNow,
    wikiClock,
    wikiRosetta,
    wikiLongBets,
    wikidataLn,
    lnBristlecone,
  ],
  claims: [
    // -- facts ------------------------------------------------------------------
    {
      id: "claim-founded-1996",
      kind: "fact",
      text: "The Long Now Foundation was established in 01996 — the foundation deliberately writes the year with five digits — in San Francisco. Wikipedia's record gives a formation date of January 4, 1996; it is a 501(c)(3) nonprofit with tax ID 68-0384748, headquartered at Fort Mason Center.",
      sourceIds: [S.lnAbout, S.wikiLongNow, S.propublica, S.lnDonate],
    },
    {
      id: "claim-founders",
      kind: "fact",
      text: "The foundation's about page names Stewart Brand, Danny Hillis, and Brian Eno as its founders; the 1996 founding-board photograph in Eno's 'Big Here and Long Now' essay adds Douglas Carlston, Paul Saffo, Peter Schwartz, and Kevin Kelly.",
      sourceIds: [S.lnAbout, S.lnBigHere, S.sciMuseum],
    },
    {
      id: "claim-name-origin",
      kind: "fact",
      text: "The name came from Brian Eno: 'The Long Now' extends the present moment's envelope, and the foundation's account credits futurist Peter Schwartz with proposing the long now mean the present plus or minus 10,000 years — about as long as the history of human technology.",
      sourceIds: [S.sciMuseum, S.lnBigHere, S.lnMillennium],
    },
    {
      id: "claim-mission",
      kind: "fact",
      text: "The stated mission is to foster long-term thinking and responsibility — to make long-term thinking common, in Eno's phrasing — in the framework of the next 10,000 years, as a counterweight to what Brand called civilization's 'pathologically short attention span.'",
      sourceIds: [S.lnAbout, S.lnBigHere, S.sciMuseum, S.lnDonate],
    },
    {
      id: "claim-hillis-essay",
      kind: "fact",
      text: "The clock idea predates the foundation: Danny Hillis proposed 'a clock that ticks once a year' with a century hand and a millennial cuckoo in an essay dated February 15, 01995, first published in Wired's Scenarios issue — and records that Eno named it the Clock of the Long Now.",
      sourceIds: [S.lnMillennium, S.sciMuseum],
    },
    {
      id: "claim-prototype-1999",
      kind: "fact",
      text: "The first prototype — designed by Hillis and built by a San Francisco team led by Alexander Rose — ticked twice at midnight on New Year's Eve 01999 and was then moved to London, where it became the final exhibit in the Science Museum's Making the Modern World gallery. The official FAQ credits Jacqui Safra with funding this first clock.",
      sourceIds: [S.sciMuseum, S.lnClockFaq, S.wikiClock],
    },
    {
      id: "claim-texas-clock",
      kind: "fact",
      text: "A full-scale clock is being installed inside a mountain in west Texas on land associated with Jeff Bezos, who told Wired in 2011 he had put up $42 million for it. Excavation began around 2011; installation footage surfaced in February 2018; no public completion date has ever been announced.",
      sourceIds: [
        S.dylanTweney,
        S.geekwire42,
        S.smithClock,
        S.npr2018,
        S.popmech,
        S.snopes,
        S.lnIdeasClockMountain,
      ],
    },
    {
      id: "claim-clock-funders-distinct",
      kind: "fact",
      text: "The official clock FAQ distinguishes three different funders of three different things: Jacqui Safra funded the first clock; Nathan Myhrvold funded the Orrery (a smaller planetary-display prototype); and Jeff Bezos is funding the full-scale Texas clock. Conflating them misstates the record.",
      sourceIds: [S.lnClockFaq],
    },
    {
      id: "claim-design-principles",
      kind: "fact",
      text: "The clock's design constraints per the museum and the foundation: maintainable with Bronze Age technology, improving over time, transparent enough that its principles can be worked out by inspection — a torsional pendulum driving a mechanical computer that updates solar position, lunar phase, and star field.",
      sourceIds: [S.sciMuseum, S.lnClock, S.ieee],
    },
    {
      id: "claim-nevada-land",
      kind: "fact",
      text: "The foundation owns a two-mile-long strip of mountain land in eastern Nevada — home to ancient bristlecone pines, now presented as the Nevada Bristlecone Preserve and a candidate second clock site. In his TED talk Brand credited Jay Walker and Mitch Kapor with enabling the purchase.",
      sourceIds: [S.lnNevada, S.tedBrand, S.sciMuseum],
    },
    {
      id: "claim-talks",
      kind: "fact",
      text: "Since 02003 the foundation has run a lecture series — Seminars About Long-term Thinking (SALT), now Long Now Talks — that its donate page describes as featuring over 400 speakers, with recordings distributed as podcasts and videos.",
      sourceIds: [S.lnTalks, S.lnDonate, S.wikiLongNow],
    },
    {
      id: "claim-interval-opened",
      kind: "fact",
      text: "The Interval at Long Now opened to the public on Sunday, June 15, 02014 at Fort Mason Center — a bar, cafe, and event space containing clock artifacts, Rosetta material, an ambient painting and sound installation by Brian Eno, and the Manual for Civilization library; part of the build-out was crowdfunded via a 'brickstarter' campaign.",
      sourceIds: [
        S.lnIdeasInterval,
        S.lnInterval,
        S.intervalSite,
        S.sfchronInterval,
        S.nytInterval,
        S.cbsInterval,
      ],
    },
    {
      id: "claim-manual-for-civilization",
      kind: "fact",
      text: "The Manual for Civilization is the library inside The Interval — floor-to-ceiling shelves, more than a thousand volumes at opening, growing with partners like Borderlands Books and the Friends of the San Francisco Public Library — a curated collection for restarting or sustaining civilization.",
      sourceIds: [S.lnIdeasInterval, S.lnMediumManual, S.lnInterval],
    },
    {
      id: "claim-rosetta-project",
      kind: "fact",
      text: "The Rosetta Project is the foundation's language archive: a parallel-text corpus, a nickel Rosetta Disk micro-etched with thousands of pages, and a wearable version. A Rosetta Disk flew on ESA's Rosetta comet mission — launched 2004, arriving at comet 67P in 2014.",
      sourceIds: [
        S.lnAbout,
        S.rosettaSite,
        S.lnRosettaBlog,
        S.archive10k,
        S.esaRosetta,
        S.lnIdeasRosetta,
        S.smithRosetta,
        S.wikiRosetta,
      ],
    },
    {
      id: "claim-panlex",
      kind: "fact",
      text: "PanLex — a lexical-translation database covering thousands of languages — operates as a project of the foundation, extending the Rosetta archive into a computational resource.",
      sourceIds: [S.lnAbout, S.panlexSite, S.wikiLongNow],
    },
    {
      id: "claim-long-bets",
      kind: "fact",
      text: "Long Bets is the foundation's public arena for competitive long-horizon predictions with charitable stakes — the most famous being Warren Buffett's bet that an index fund would beat a portfolio of hedge funds over ten years, resolved in Buffett's favor with the payout going to Girls Inc. of Omaha.",
      sourceIds: [
        S.lnAbout,
        S.longbetsSite,
        S.cnbcBuffett,
        S.lnIdeasBuffett,
        S.lnIdeasBuffett2,
        S.wikiLongBets,
      ],
    },
    {
      id: "claim-five-digit-dates",
      kind: "fact",
      text: "The foundation writes years with five digits — 01996, 02014, 02026 — as a standing nudge against the implicit year-10,000 problem baked into four-digit dating; the convention runs through its site, talks numbering, and press materials.",
      sourceIds: [S.lnAbout, S.lnIdeasInterval, S.lnTalkStephenson],
    },
    {
      id: "claim-anathem-connection",
      kind: "fact",
      text: "Neal Stephenson's 2008 novel Anathem — about a world where 10,000-year clocks are part of the civilizational fabric — was inspired partly by the clock project; its launch event ran as a Long Now talk at the Regency Ballroom on September 9, 02008 with over 900 attending.",
      sourceIds: [
        S.lnTalkStephenson,
        S.lnIdeasAnathem,
        S.lnIdeasStephenson,
        S.gizmodo,
      ],
    },
    {
      id: "claim-board-current",
      kind: "fact",
      text: "The official board page lists current members Stewart Brand, Brian Eno, Mick Costigan, Danica Remy, Joe Speicher, Patrick Collison, David Eagleman, Kevin Kelly, and David Rumsey, plus a board-emeritus roster including Danny Hillis, Esther Dyson, Mitchell Kapor, Alexander Rose, Paul Saffo, and Peter Schwartz — with no tenure dates published.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "claim-membership-model",
      kind: "fact",
      text: "The foundation is member-supported: tiers run from $12/month (Stainless Steel) to $1,000+/year (Bristlecone), donations are tax-deductible under EIN 68-0384748, and the donate page frames membership as funding Talks, the Interval, Nevada work, and 'the next generation' of projects.",
      sourceIds: [S.lnDonate, S.propublica],
    },
    {
      id: "claim-interval-continuity",
      kind: "fact",
      text: "A decade after opening, The Interval was still operating and still being covered — Axios included it among San Francisco's best bars in February 2024.",
      sourceIds: [S.axiosInterval, S.intervalSite, S.lnInterval],
    },
    // -- stated beliefs -------------------------------------------------------------
    {
      id: "claim-short-now-diagnosis",
      kind: "stated_belief",
      text: "The founding diagnosis: civilization is 'revving itself into a pathologically short attention span' (Brand, via the Science Museum's account) and needs a corrective 'mechanism or myth' that makes the long view — measured in centuries — imaginable.",
      sourceIds: [S.sciMuseum, S.lnBigHere],
    },
    {
      id: "claim-clock-as-icon",
      kind: "stated_belief",
      text: "The founders describe the clock less as a machine than as a myth and icon — 'both a mechanism and a myth' in Hillis's formulation; Brand's stated hope is that encountering it makes people ask what their own time horizon is.",
      sourceIds: [S.sciMuseum, S.lnMillennium, S.tedBrand],
    },
    {
      id: "claim-pace-layers-belief",
      kind: "stated_belief",
      text: "Brand's pace-layers framework — fashion, commerce, infrastructure, governance, culture, nature moving at different speeds — is presented by the foundation as the analytical frame for its projects: the fast layers innovate, the slow layers stabilize.",
      sourceIds: [S.lnPace, S.sciMuseum],
    },
    {
      id: "claim-long-now-ethic",
      kind: "stated_belief",
      text: "Eno's formulation of the ethic: extending the 'now' backward and forward 10,000 years makes disregard for descendants 'unacceptable — gauche, uncivilised' — an empathy extension comparable to historical widenings of moral concern.",
      sourceIds: [S.lnBigHere],
    },
    // -- patterns --------------------------------------------------------------------
    {
      id: "claim-pattern-patronage",
      kind: "pattern",
      text: "The flagship projects run on named patronage rather than disclosed budgets: Safra for the first clock, Myhrvold for the Orrery, Bezos for the Texas installation, Walker and Kapor for the Nevada land — a funding pattern the foundation states openly in its FAQ and talks without publishing project accounts.",
      sourceIds: [S.lnClockFaq, S.tedBrand, S.dylanTweney],
    },
    {
      id: "claim-pattern-tech-elite",
      kind: "pattern",
      text: "The board and funder lists overlap heavily with technology-industry figures — Collison, Kapor, Kelly, Myhrvold, Bezos — consistent with the foundation's position at the intersection of Silicon Valley wealth and long-horizon cultural projects.",
      sourceIds: [S.lnBoard, S.lnClockFaq, S.wiredCeo],
    },
    {
      id: "claim-pattern-myth-making",
      kind: "pattern",
      text: "Across talks, essays, and the clock's own rhetoric, the foundation's method is myth-making: artifacts (a clock, a disk, a library) designed to generate stories durable enough to outlast their builders — Stephenson's Anathem is the clearest documented success of the method.",
      sourceIds: [
        S.lnMillennium,
        S.lnBigHere,
        S.lnTalkStephenson,
        S.lnChabonPdf,
      ],
    },
    {
      id: "claim-pattern-critique",
      kind: "pattern",
      text: "The project attracts a standing critique — that a billionaire-funded monument is hubris or misdirected resources ('a waste of time,' per Wired's 2018 take) — which the foundation neither denies nor resolves; the index keeps the criticism in the record.",
      sourceIds: [S.wiredWaste, S.wired25, S.snopes],
    },
    // -- speculation -------------------------------------------------------------------
    {
      id: "claim-spec-completion",
      kind: "speculation",
      text: "Whether the Texas clock will ever be publicly 'finished' is unanswerable from the record: installation was 'underway' in 2018, Popular Mechanics in 2020 reported the same state, and no official completion target exists — the project's own framing treats incompletion as partly the point.",
      sourceIds: [S.popmech, S.geekwire2018, S.lnIdeasUpdate, S.snopes],
    },
    {
      id: "claim-spec-patron-dependence",
      kind: "speculation",
      text: "The concentration of the largest project on a single patron's land and funding implies a dependence the public record does not quantify — how completion would proceed without continued Bezos support is not documented anywhere.",
      sourceIds: [S.lnClockFaq, S.dylanTweney, S.popmech],
    },
  ],
  timeline: [
    {
      id: "event-millennium-essay",
      kind: "publication",
      date: "1995",
      title: "Hillis publishes the Millennium Clock essay",
      summary:
        "Danny Hillis's essay — first in Wired's Scenarios issue — proposes a clock that ticks once a year for 10,000 years and records Eno naming it the Clock of the Long Now.",
      sourceIds: [S.lnMillennium, S.sciMuseum],
    },
    {
      id: "event-founded",
      kind: "founded",
      date: "1996",
      title: "The Long Now Foundation established",
      summary:
        "Brand and Hillis form a board of like-minded friends — Carlston, Saffo, Schwartz, Kelly, Hillis, Eno — taking their name from Eno's 'Long Now' proposal. Wikipedia records January 4, 1996; the foundation writes it 01996.",
      location: "San Francisco",
      sourceIds: [S.lnAbout, S.lnBigHere, S.sciMuseum, S.wikiLongNow],
    },
    {
      id: "event-prototype-build",
      kind: "project",
      date: "1997",
      title: "First clock prototype build begins",
      summary:
        "A team of engineers, mechanics, and designers led by Alexander Rose begins constructing the first Clock of the Long Now prototype in San Francisco.",
      sourceIds: [S.sciMuseum],
    },
    {
      id: "event-first-tick",
      kind: "milestone",
      date: "1999-12-31",
      title: "Prototype clock ticks at the millennium",
      summary:
        "The first prototype ticked twice at midnight on New Year's Eve 01999 in San Francisco; it was later installed as the final exhibit in the Science Museum's Making the Modern World gallery.",
      location: "San Francisco",
      sourceIds: [S.sciMuseum, S.lnClockFaq, S.wikiClock],
    },
    {
      id: "event-science-museum",
      kind: "milestone",
      date: "2000",
      title: "Prototype installed at the Science Museum, London",
      summary:
        "The clock prototype became the final exhibit in the Making the Modern World gallery, opened by Queen Elizabeth II in 2000.",
      location: "London",
      sourceIds: [S.sciMuseum],
    },
    {
      id: "event-rosetta-start",
      kind: "project",
      date: "2000",
      title: "Rosetta Project begins",
      summary:
        "The foundation launches its language archive — a parallel-text corpus and the micro-etched nickel Rosetta Disk intended as a very long-term backup of human languages.",
      sourceIds: [S.rosettaSite, S.lnAbout, S.lnRosettaBlog, S.wikiRosetta],
    },
    {
      id: "event-long-bets",
      kind: "project",
      date: "2002",
      title: "Long Bets launches",
      summary:
        "The predictions arena opens: public long-horizon bets with philanthropic stakes, administered by the foundation.",
      sourceIds: [S.longbetsSite, S.lnAbout, S.wikiLongBets],
    },
    {
      id: "event-salt-begins",
      kind: "project",
      date: "2003",
      title: "Seminars About Long-term Thinking begin",
      summary:
        "The monthly lecture series — SALT, later renamed Long Now Talks — begins its decades-long run.",
      sourceIds: [S.lnTalks, S.wikiLongNow],
    },
    {
      id: "event-brand-ted",
      kind: "media",
      date: "2004-02",
      title: "Stewart Brand's TED talk on the Long Now",
      summary:
        "Brand presents the foundation and the clock at TED2004, including the Nevada land story and the Walker/Kapor credit.",
      sourceIds: [S.tedBrand],
    },
    {
      id: "event-rosetta-launch",
      kind: "milestone",
      date: "2004-03",
      title: "Rosetta Disk launches aboard ESA's Rosetta",
      summary:
        "The project's disk rode the European Space Agency's comet mission — a language archive literally leaving the planet.",
      sourceIds: [S.esaRosetta, S.archive10k, S.lnIdeasRosetta],
    },
    {
      id: "event-anathem-launch",
      kind: "media",
      date: "2008-09-09",
      title: "Anathem launch at the Regency Ballroom",
      summary:
        "Stephenson's clock-inspired novel launches as a Long Now talk before 900+ attendees; Brand and Hillis join on stage — the 'myth-making' method working in public.",
      location: "San Francisco",
      sourceIds: [S.lnTalkStephenson, S.lnIdeasAnathem, S.gizmodo],
    },
    {
      id: "event-buffett-bet",
      kind: "milestone",
      date: "2008-06",
      title: "Buffett's million-dollar Long Bet placed",
      summary:
        "Buffett wagers that an S&P index fund will beat a basket of hedge funds over a decade — the bet that made Long Bets famous.",
      sourceIds: [S.cnbcBuffett, S.lnIdeasBuffett, S.wikiLongBets],
    },
    {
      id: "event-bezos-funding",
      kind: "funding",
      date: "2011-06",
      title: "Bezos-backed Texas clock goes public",
      summary:
        "Wired's feature and follow-on coverage disclose that Jeff Bezos is funding the full-scale clock inside a west Texas mountain — $42 million as Bezos stated it — with excavation underway.",
      location: "West Texas",
      sourceIds: [
        S.dylanTweney,
        S.geekwire42,
        S.geekwireWhy,
        S.biBezos,
        S.wiredCeo,
      ],
    },
    {
      id: "event-interval-opens",
      kind: "project",
      date: "2014-06-15",
      title: "The Interval opens at Fort Mason",
      summary:
        "The foundation's public venue — bar, cafe, library, and salon space with clock artifacts and an Eno installation — opens after a year of construction and a crowdfunded 'brickstarter.'",
      location: "Fort Mason Center, San Francisco",
      sourceIds: [
        S.lnIdeasInterval,
        S.sfchronInterval,
        S.nytInterval,
        S.cbsInterval,
        S.sprudge,
      ],
    },
    {
      id: "event-rosetta-arrival",
      kind: "milestone",
      date: "2014-08",
      title: "Rosetta arrives at comet 67P carrying the disk",
      summary:
        "Ten years after launch, the spacecraft — and the foundation's disk — reach the comet.",
      sourceIds: [S.lnIdeasRosetta, S.esaRosetta],
    },
    {
      id: "event-buffett-resolved",
      kind: "milestone",
      date: "2017",
      title: "Buffett's Long Bet resolves",
      summary:
        "The decade-long bet ends with Buffett winning; the payout goes to Girls Inc. of Omaha — the most public proof of the Long Bets mechanism.",
      sourceIds: [S.lnIdeasBuffett, S.lnIdeasBuffett2, S.wikiLongBets],
    },
    {
      id: "event-installation-2018",
      kind: "milestone",
      date: "2018-02",
      title: "Texas installation footage released",
      summary:
        "Bezos shares installation video; the foundation posts a 'major update' on the clock project — the most recent public milestone on the build.",
      sourceIds: [
        S.geekwire2018,
        S.lnIdeasUpdate,
        S.npr2018,
        S.smithClock,
      ],
    },
    {
      id: "event-interval-decade",
      kind: "milestone",
      date: "2024-02",
      title: "The Interval still operating a decade on",
      summary:
        "Axios's 'best bars' listing marks the venue's continued operation — the foundation's public face still open at Fort Mason.",
      sourceIds: [S.axiosInterval],
    },
    {
      id: "event-bristlecone-talk",
      kind: "media",
      date: "2026-09-29",
      title: "Nevada Bristlecone Preserve talk at The Interval",
      summary:
        "Research Fellow Anne Heggli presents a decade of NevCAN climate monitoring among the bristlecones, with the Elders of Time documentary on Jonathon Keats's 'Centuries of the Bristlecone' — a tree-calibrated clock set against Universal Standard Time.",
      location: "The Interval, Fort Mason, San Francisco",
      sourceIds: [S.lnBristlecone],
    },
  ],
  themes: [
    {
      id: "theme-long-term-thinking",
      kind: "philosophy",
      status: "stated",
      title: "Long-term thinking as the mission",
      summary:
        "The foundation exists to stretch civilization's 'now' — to make decisions legible at century and millennium scales, as a corrective to a 'pathologically short attention span.'",
      sourceIds: [S.lnAbout, S.lnBigHere, S.sciMuseum],
    },
    {
      id: "theme-mechanism-and-myth",
      kind: "method",
      status: "stated",
      title: "Mechanism and myth",
      summary:
        "Hillis's founding formulation — the clock must work as a machine and as a story. The projects are engineered artifacts whose real function is to generate durable cultural narratives.",
      sourceIds: [S.lnMillennium, S.sciMuseum, S.lnChabonPdf],
    },
    {
      id: "theme-pace-layers",
      kind: "philosophy",
      status: "stated",
      title: "Pace layers",
      summary:
        "Brand's six-layer model of change — fashion, commerce, infrastructure, governance, culture, nature — is the foundation's analytical vocabulary, now also its print journal.",
      sourceIds: [S.lnPace, S.sciMuseum],
    },
    {
      id: "theme-stewardship",
      kind: "practice",
      status: "reported",
      title: "Stewardship of deep-time objects",
      summary:
        "The projects share a curatorial posture — a language archive, a mountain preserve of 4,000-year-old trees, a library for restarting civilization — collecting things that must be maintained, not merely made.",
      sourceIds: [S.lnAbout, S.lnNevada, S.lnInterval, S.wikiRosetta],
    },
    {
      id: "theme-patronage-model",
      kind: "practice",
      status: "reported",
      title: "Named patronage over disclosed budgets",
      summary:
        "The pattern across projects: specific wealthy patrons attached to specific artifacts — Safra, Myhrvold, Bezos, Walker, Kapor — alongside a broad membership base; project-level accounting is not published.",
      sourceIds: [S.lnClockFaq, S.tedBrand, S.dylanTweney, S.lnDonate],
    },
    {
      id: "theme-long-now-as-genre",
      kind: "influence",
      status: "reported",
      title: "The Long Now as cultural genre",
      summary:
        "The organization's clearest export is a frame others reuse — Anathem's clock-worlds, TED talks, 'long-term thinking' as a genre of public talk — influence measured in citation more than in artifact.",
      sourceIds: [S.lnTalkStephenson, S.tedBrand, S.lnBigHere],
    },
    {
      id: "theme-longtermism-debate",
      kind: "belief",
      status: "reported",
      title: "Caught inside the longtermism debate",
      summary:
        "The foundation's billionaire patronage and monumental frame place it inside later debates over effective-altruist 'longtermism' and techno-elite futurism — a framing the coverage applies to it more than it claims.",
      sourceIds: [S.wiredWaste, S.wired25, S.snopes],
    },
  ],
  works: [
    {
      id: "work-clock",
      kind: "project",
      status: "in_progress",
      title: "Clock of the Long Now",
      date: "1996",
      location: "West Texas",
      summary:
        "The monumental 10,000-year mechanical clock: a 01999 prototype now in the Science Museum, the Orrery, and the full-scale installation underway inside a west Texas mountain — with no announced completion date.",
      sourceIds: [
        S.lnClock,
        S.lnClockFaq,
        S.sciMuseum,
        S.dylanTweney,
        S.popmech,
      ],
    },
    {
      id: "work-first-prototype",
      kind: "design",
      status: "completed",
      title: "First clock prototype",
      date: "1999",
      location: "Science Museum, London",
      summary:
        "The 01999 prototype — ticked twice at the millennium, then installed as the final exhibit of the Making the Modern World gallery; funded by Jacqui Safra per the official FAQ.",
      sourceIds: [S.sciMuseum, S.lnClockFaq],
    },
    {
      id: "work-orrery",
      kind: "design",
      status: "completed",
      title: "The Orrery prototype",
      summary:
        "A smaller planetary-display clock prototype — funded by Nathan Myhrvold per the official FAQ — displayed at The Interval.",
      sourceIds: [S.lnClockFaq, S.lnInterval],
    },
    {
      id: "work-rosetta",
      kind: "project",
      status: "ongoing",
      title: "Rosetta Project",
      date: "2000",
      summary:
        "The language archive — parallel-text corpus, micro-etched nickel disk, wearable pendant — including the disk flown on ESA's comet mission.",
      sourceIds: [
        S.rosettaSite,
        S.lnRosettaBlog,
        S.esaRosetta,
        S.smithRosetta,
        S.quartz,
        S.wikiRosetta,
      ],
    },
    {
      id: "work-panlex",
      kind: "project",
      status: "ongoing",
      title: "PanLex",
      summary:
        "The lexical-translation database operating as a foundation project — the computational continuation of the language-archive work.",
      sourceIds: [S.panlexSite, S.lnAbout, S.wikiLongNow],
    },
    {
      id: "work-long-bets",
      kind: "project",
      status: "ongoing",
      title: "Long Bets",
      date: "2002",
      summary:
        "The public predictions arena — 'a forum for competitive predictions with philanthropic money at stake' — home of the Buffett/Protégé bet.",
      sourceIds: [S.longbetsSite, S.lnAbout, S.wikiLongBets, S.cnbcBuffett],
    },
    {
      id: "work-talks",
      kind: "project",
      status: "ongoing",
      title: "Long Now Talks",
      date: "2003",
      summary:
        "The lecture series — formerly Seminars About Long-term Thinking — hundreds of recorded talks since 02003, distributed as podcasts and video.",
      sourceIds: [S.lnTalks, S.lnDonate],
    },
    {
      id: "work-interval",
      kind: "project",
      status: "ongoing",
      title: "The Interval at Long Now",
      date: "2014-06-15",
      location: "Fort Mason Center, San Francisco",
      summary:
        "The public venue — bar, cafe, library, event space — housing clock artifacts, the Orrery, the Manual for Civilization, and Eno's ambient installation.",
      sourceIds: [
        S.lnIdeasInterval,
        S.lnInterval,
        S.intervalSite,
        S.sfchronInterval,
        S.nytInterval,
      ],
    },
    {
      id: "work-manual",
      kind: "project",
      status: "ongoing",
      title: "Manual for Civilization",
      summary:
        "The library inside The Interval — a curated collection meant to sustain or rebuild civilization, grown with bookseller and library partners.",
      sourceIds: [S.lnMediumManual, S.lnIdeasInterval, S.lnInterval],
    },
    {
      id: "work-nevada",
      kind: "project",
      status: "ongoing",
      title: "Nevada Bristlecone Preserve",
      summary:
        "The foundation's two-mile strip of mountain land in eastern Nevada — habitat of ancient bristlecone pines and a candidate second clock site.",
      sourceIds: [S.lnNevada, S.tedBrand],
    },
    {
      id: "work-longviewer",
      kind: "project",
      status: "completed",
      title: "Long Viewer",
      summary:
        "The open-source timeline software the foundation published on GitHub — the codebase behind the Interval's deep-time displays.",
      sourceIds: [S.lnGithubLongview],
    },
    {
      id: "work-pace-layers-journal",
      kind: "other",
      status: "ongoing",
      title: "Pace Layers (journal)",
      summary:
        "The foundation's print annual built on the pace-layers framework — members at the Tungsten tier and above receive copies.",
      sourceIds: [S.lnPace, S.lnDonate],
    },
  ],
  appearances: [
    {
      id: "appearance-brand-ted",
      title: "Stewart Brand: The Long Now",
      venue: "TED2004",
      publishedAt: "2004-02",
      participants: ["Stewart Brand"],
      participantHandles: [
        { name: "Stewart Brand", handle: "stewart-brand" },
      ],
      summary:
        "Brand's TED talk on the foundation, the clock, and the Nevada land.",
      media: [
        {
          type: "video",
          url: "https://www.ted.com/talks/stewart_brand_the_long_now",
          sourceId: S.tedBrand,
        },
      ],
      sourceIds: [S.tedBrand],
    },
    {
      id: "appearance-stephenson-anathem",
      title: "ANATHEM Book Launch Event",
      venue: "The Regency Ballroom — Long Now Talks",
      publishedAt: "2008-09-09",
      participants: [
        "Neal Stephenson",
        "Stewart Brand",
        "Danny Hillis",
        "David Stutz",
      ],
      participantHandles: [
        { name: "Neal Stephenson", handle: "neal-stephenson" },
        { name: "Stewart Brand", handle: "stewart-brand" },
        { name: "Danny Hillis", handle: "danny-hillis" },
        { name: "David Stutz", handle: "david-stutz" },
      ],
      summary:
        "The Anathem launch before 900+ attendees — the clock project turning into literary myth on stage.",
      media: [
        {
          type: "audio",
          url: "https://longnow.org/talks/02008-stephenson/",
          sourceId: S.lnTalkStephenson,
        },
      ],
      sourceIds: [S.lnTalkStephenson],
    },
    {
      id: "appearance-wired-feature",
      title: "How to Make a Clock Run for 10,000 Years",
      venue: "Wired",
      publishedAt: "2011-06-23",
      participants: ["Jeff Bezos", "Danny Hillis"],
      participantHandles: [
        { name: "Jeff Bezos", handle: "jeff-bezos" },
        { name: "Danny Hillis", handle: "danny-hillis" },
      ],
      summary:
        "Tweney's feature — the deepest reported account of the Texas build, the funding, and the engineering.",
      media: [
        {
          type: "article",
          url: "https://dylan.tweney.com/clock-10000-years/",
          sourceId: S.dylanTweney,
        },
      ],
      sourceIds: [S.dylanTweney],
    },
    {
      id: "appearance-wired25",
      title: "Jeff Bezos on the clock at WIRED25",
      venue: "WIRED25",
      publishedAt: "2018",
      participants: ["Jeff Bezos"],
      participantHandles: [
        { name: "Jeff Bezos", handle: "jeff-bezos" },
      ],
      summary:
        "Bezos discusses the clock and civilization-scale thinking at Wired's anniversary event.",
      media: [
        {
          type: "article",
          url: "https://www.wired.com/story/wired25-jeff-bezos-10000-year-clock-civilization/",
          sourceId: S.wired25,
        },
      ],
      sourceIds: [S.wired25],
    },
    {
      id: "appearance-millennium-essay",
      title: "The Millennium Clock (essay)",
      venue: "Wired Scenarios issue / longnow.org",
      publishedAt: "1995-02-15",
      participants: ["Danny Hillis"],
      participantHandles: [
        { name: "Danny Hillis", handle: "danny-hillis" },
      ],
      summary:
        "The founding essay — the organization's origin document in its founder's own words.",
      media: [
        {
          type: "article",
          url: "https://longnow.org/ideas/the-millennium-clock/",
          sourceId: S.lnMillennium,
        },
      ],
      sourceIds: [S.lnMillennium],
    },
    {
      id: "appearance-big-here",
      title: "The Big Here and Long Now (essay)",
      venue: "longnow.org",
      publishedAt: "2000-05-01",
      participants: ["Brian Eno"],
      participantHandles: [
        { name: "Brian Eno", handle: "brian-eno" },
      ],
      summary:
        "Eno's essay defining the 'Long Now' — and the page's 1996 founding-board photograph is itself key evidence.",
      media: [
        {
          type: "article",
          url: "https://longnow.org/ideas/the-big-here-and-long-now/",
          sourceId: S.lnBigHere,
        },
      ],
      sourceIds: [S.lnBigHere],
    },
  ],
  relations: [
    {
      id: "rel-stewart-brand-founder",
      kind: "founded_by",
      target: "stewart-brand",
      targetName: "Stewart Brand",
      targetKind: "person",
      targetWikidataId: "Q971994",
      start: "1996",
      note:
        "Cofounder and president; the Whole Earth Catalog veteran who organized the founding board and remains the foundation's public voice.",
      sourceIds: [S.lnAbout, S.lnBoard, S.sciMuseum, S.wikiLongNow],
    },
    {
      id: "rel-brian-eno-founder",
      kind: "founded_by",
      target: "brian-eno",
      targetName: "Brian Eno",
      targetKind: "person",
      targetWikidataId: "Q569003",
      start: "1996",
      note:
        "Cofounder; coined 'the Long Now,' named the Clock of the Long Now, and made the ambient installation inside The Interval.",
      sourceIds: [S.lnAbout, S.lnBigHere, S.sciMuseum, S.lnIdeasInterval],
    },
    {
      id: "rel-danny-hillis-founder",
      kind: "founded_by",
      target: "danny-hillis",
      targetName: "Danny Hillis",
      targetKind: "person",
      targetWikidataId: "Q92942",
      start: "1996",
      note:
        "Cofounder; proposed the 10,000-year clock in his 01995 essay and designed it — 'the world's slowest computer' as atonement for building the fastest. Now board emeritus.",
      sourceIds: [S.lnAbout, S.lnMillennium, S.sciMuseum, S.lnBoard],
    },
    {
      id: "rel-stewart-brand-member",
      kind: "member",
      target: "stewart-brand",
      targetName: "Stewart Brand",
      targetKind: "person",
      targetWikidataId: "Q971994",
      start: "1996",
      note: "Cofounder and current board member per the official board page.",
      sourceIds: [S.lnBoard, S.lnBigHere],
    },
    {
      id: "rel-brian-eno-member",
      kind: "member",
      target: "brian-eno",
      targetName: "Brian Eno",
      targetKind: "person",
      targetWikidataId: "Q569003",
      start: "1996",
      note: "Cofounder and current board member per the official board page.",
      sourceIds: [S.lnBoard, S.lnBigHere],
    },
    {
      id: "rel-danny-hillis-member",
      kind: "member",
      target: "danny-hillis",
      targetName: "Danny Hillis",
      targetKind: "person",
      targetWikidataId: "Q92942",
      start: "1996",
      note:
        "Cofounder; on the 1996 founding board and now listed as board emeritus — the board page gives no transition date.",
      sourceIds: [S.lnBoard, S.lnBigHere],
    },
    {
      id: "rel-kevin-kelly-member",
      kind: "member",
      target: "kevin-kelly",
      targetName: "Kevin Kelly",
      targetKind: "person",
      targetWikidataId: "Q2707355",
      start: "1996",
      note:
        "Founding-board member in the 1996 photograph caption and still a current board member.",
      sourceIds: [S.lnBoard, S.lnBigHere],
    },
    {
      id: "rel-doug-carlston-member",
      kind: "member",
      target: "doug-carlston",
      targetName: "Douglas Carlston",
      targetKind: "person",
      start: "1996",
      note:
        "On the 1996 founding board per Eno's essay caption; now listed as board emeritus.",
      sourceIds: [S.lnBigHere, S.lnBoard],
    },
    {
      id: "rel-paul-saffo-member",
      kind: "member",
      target: "paul-saffo",
      targetName: "Paul Saffo",
      targetKind: "person",
      start: "1996",
      note:
        "On the 1996 founding board per Eno's essay caption; now listed as board emeritus.",
      sourceIds: [S.lnBigHere, S.lnBoard],
    },
    {
      id: "rel-peter-schwartz-member",
      kind: "member",
      target: "peter-schwartz",
      targetName: "Peter Schwartz",
      targetKind: "person",
      start: "1996",
      note:
        "Founding-board member credited with proposing the ±10,000-year definition of the Long Now; now board emeritus.",
      sourceIds: [S.lnBigHere, S.sciMuseum, S.lnBoard],
    },
    {
      id: "rel-mick-costigan-member",
      kind: "member",
      target: "mick-costigan",
      targetName: "Mick Costigan",
      targetKind: "person",
      note: "Chair of the Board of Directors per the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-danica-remy-member",
      kind: "member",
      target: "danica-remy",
      targetName: "Danica Remy",
      targetKind: "person",
      note: "Secretary of the Board of Directors per the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-joe-speicher-member",
      kind: "member",
      target: "joe-speicher",
      targetName: "Joe Speicher",
      targetKind: "person",
      note: "Treasurer of the Board of Directors per the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-patrick-collison-member",
      kind: "member",
      target: "patrick-collison",
      targetName: "Patrick Collison",
      targetKind: "person",
      targetWikidataId: "Q7146257",
      note:
        "Stripe cofounder; current board member per the official board page. Indexed in this corpus as a person packet.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-david-eagleman-member",
      kind: "member",
      target: "david-eagleman",
      targetName: "David Eagleman",
      targetKind: "person",
      targetWikidataId: "Q999577",
      note: "Neuroscientist and writer; current board member per the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-david-rumsey-member",
      kind: "member",
      target: "david-rumsey",
      targetName: "David Rumsey",
      targetKind: "person",
      note: "Cartographer and digital-library founder; current board member per the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-chris-anderson-member",
      kind: "member",
      target: "chris-anderson",
      targetName: "Chris Anderson",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-patrick-dowd-member",
      kind: "member",
      target: "patrick-dowd",
      targetName: "Patrick Dowd",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-esther-dyson-member",
      kind: "member",
      target: "esther-dyson",
      targetName: "Esther Dyson",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-ping-fu-member",
      kind: "member",
      target: "ping-fu",
      targetName: "Ping Fu",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-katherine-fulton-member",
      kind: "member",
      target: "katherine-fulton",
      targetName: "Katherine Fulton",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-mitchell-kapor-member",
      kind: "member",
      target: "mitchell-kapor",
      targetName: "Mitchell Kapor",
      targetKind: "person",
      note:
        "Listed as board emeritus; also credited by Brand's TED talk with helping enable the Nevada land purchase.",
      sourceIds: [S.lnBoard, S.tedBrand],
    },
    {
      id: "rel-michael-keller-member",
      kind: "member",
      target: "michael-keller",
      targetName: "Michael Keller",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-roger-kennedy-member",
      kind: "member",
      target: "roger-kennedy",
      targetName: "Roger Kennedy",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-kim-polese-member",
      kind: "member",
      target: "kim-polese",
      targetName: "Kim Polese",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-alexander-rose-member",
      kind: "member",
      target: "alexander-rose",
      targetName: "Alexander Rose",
      targetKind: "person",
      start: "1997",
      note:
        "Led the team that built the first prototype from 1997 and served as the foundation's long-serving executive director; now listed as board emeritus.",
      sourceIds: [S.lnBoard, S.sciMuseum],
    },
    {
      id: "rel-lisa-kay-solomon-member",
      kind: "member",
      target: "lisa-kay-solomon",
      targetName: "Lisa Kay Solomon",
      targetKind: "person",
      note: "Listed as board emeritus on the official board page.",
      sourceIds: [S.lnBoard],
    },
    {
      id: "rel-jeff-bezos-funder",
      kind: "funded_by",
      target: "jeff-bezos",
      targetName: "Jeff Bezos",
      targetKind: "person",
      targetWikidataId: "Q312556",
      start: "2011",
      note:
        "Funding the full-scale Texas clock installation — the $42M figure is his own as reported; scoped to that project, not to the foundation generally.",
      sourceIds: [
        S.lnClockFaq,
        S.dylanTweney,
        S.geekwire42,
        S.snopes,
        S.smithClock,
      ],
    },
    {
      id: "rel-jacqui-safra-funder",
      kind: "funded_by",
      target: "jacqui-safra",
      targetName: "Jacqui Safra",
      targetKind: "person",
      targetWikidataId: "Q2920194",
      note:
        "Funded the first clock prototype, per the official clock FAQ — the Science Museum piece documents the prototype itself.",
      sourceIds: [S.lnClockFaq, S.sciMuseum],
    },
    {
      id: "rel-nathan-myhrvold-funder",
      kind: "funded_by",
      target: "nathan-myhrvold",
      targetName: "Nathan Myhrvold",
      targetKind: "person",
      targetWikidataId: "Q365578",
      note:
        "Funded the Orrery prototype, per the official clock FAQ.",
      sourceIds: [S.lnClockFaq],
    },
    {
      id: "rel-jay-walker-funder",
      kind: "funded_by",
      target: "jay-walker",
      targetName: "Jay Walker",
      targetKind: "person",
      note:
        "Credited in Brand's TED talk with helping enable the Mount Washington, Nevada land purchase.",
      sourceIds: [S.tedBrand],
    },
    {
      id: "rel-esa",
      kind: "collaborated",
      target: "european-space-agency",
      targetName: "European Space Agency",
      targetKind: "organization",
      start: "2004",
      note:
        "Carried the foundation's Rosetta Disk on its comet mission — mission partner by cargo, not a formal organizational tie.",
      sourceIds: [S.esaRosetta, S.archive10k, S.lnIdeasRosetta],
    },
    {
      id: "rel-science-museum",
      kind: "other",
      target: "science-museum-london",
      targetName: "Science Museum, London",
      targetKind: "organization",
      start: "2000",
      note:
        "Hosts the first clock prototype in its Making the Modern World gallery; the 2011 Wired feature also reported a conditional agreement to host a clock in Washington pending a funder.",
      sourceIds: [S.sciMuseum, S.dylanTweney],
    },
    {
      id: "rel-neal-stephenson",
      kind: "collaborated",
      target: "neal-stephenson",
      targetName: "Neal Stephenson",
      targetKind: "person",
      targetWikidataId: "Q312853",
      note:
        "Longtime friend of the foundation who contributed early clock ideas; his Anathem launched as a Long Now talk and embeds the clock in fiction.",
      sourceIds: [S.lnTalkStephenson, S.lnIdeasAnathem, S.lnIdeasStephenson],
    },
  ],
  openQuestions: [
    "The Texas clock has no announced completion date or opening plan: installation was documented as underway in 2018 and 'in progress' by 2020 coverage, and the foundation has never published a schedule — whether the current decade sees public access is unknown.",
    "The funding split between member dues, general donations, and named patrons is undisclosed: the FAQ names project funders (Safra, Myhrvold, Bezos) but no project budgets or total contributions are published, and the 990s do not itemize by project.",
    "Board tenure and transitions are undocumented: the board page lists current and emeritus members without dates, so member edges here carry no start/end except the 1996 founding board.",
    "The operational status and maintenance plan for PanLex and the Rosetta archive are not detailed publicly; whether they are actively developed or held in maintenance is unclear.",
    "Whether the Nevada site will ever host a second clock — and who would fund it — is unaddressed; the 2011 Wired piece notes a Smithsonian agreement contingent on finding a funder, with no later status update.",
    "Executive leadership history is thinly documented in public sources: Alexander Rose's long executive-director tenure is described indirectly, and the current staff list is not reproduced in this index.",
    "The relationship between the foundation and Jeff Bezos beyond the clock — land terms, ongoing obligations, governance — is not public; press coverage relies on the $42M figure Bezos himself stated.",
  ],
  body: `The Long Now Foundation is a San Francisco nonprofit established in 01996 — the foundation writes years with five digits, a standing reminder that the 10,000-year frame it works in outlasts four-digit dating. Stewart Brand, Danny Hillis, and Brian Eno founded it; the name is Eno's, the clock is Hillis's, and the organizing idea is Brand's: civilization is "revving itself into a pathologically short attention span," and needs a corrective measured in centuries.

## Origin

Hillis proposed the clock in a February 01995 Wired essay — a mechanism that ticks once a year, advances a century hand once a century, and sends a cuckoo out each millennium — and Brand assembled the founding board in 1996: Carlston, Saffo, Schwartz, Kelly, Hillis, and Eno, per the photograph caption in Eno's own essay. Schwartz supplied the defining span: the "long now" is the present plus or minus 10,000 years, about as long as the history of human technology. The first clock prototype — built by a team led by Alexander Rose — ticked twice at midnight on New Year's Eve 01999 and now sits as the final exhibit in the Science Museum's Making the Modern World gallery.

## Projects

The flagship is still the clock: a full-scale installation being carved into a west Texas mountain, funded by Jeff Bezos at a figure he himself put at $42 million — a number this index attributes to him rather than asserts. The official FAQ keeps the patronage precise: Jacqui Safra funded the first clock, Nathan Myhrvold the Orrery, Bezos the Texas build. Around the clock sits a constellation of projects with the same design sense — things meant to be maintained, not merely made: the Rosetta Project's language archive (one disk of which rode ESA's comet mission to 67P), the PanLex lexical database, the Long Bets arena where Warren Buffett's famous decade-long wager on index funds resolved for Girls Inc. of Omaha, a talk series running since 02003, the Nevada Bristlecone Preserve under ancient pines, and The Interval — the bar-cafe-library at Fort Mason that opened June 15, 02014 and still operates as the foundation's public face.

## Method and reception

The method is myth-making: artifacts engineered well enough to generate stories. Neal Stephenson's Anathem — a novel where 10,000-year clocks are civilizational furniture — launched at a Long Now talk before 900 people, and the foundation counts it as the method working. The critique is also on record: a billionaire-funded monument invites the "waste of time" charge Wired published in 2018, and the concentration of the largest project on one patron's land and money is a dependence the public record cannot quantify. Board transitions, project budgets, and the clock's completion schedule are all undisclosed — the open questions in this packet are the honest remainder of a largely self-published record.

*This index was compiled from public sources and does not imply the organization's endorsement. Citations live in the packet's source catalog.*`,
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
