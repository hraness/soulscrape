#!/usr/bin/env bun
/** Generate examples/people/tim-hecker/person-index.json with derived source ids. */

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

// --- Subject-controlled ------------------------------------------------

const sunblind = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Tim Hecker — official site (Sunblind)",
  url: "https://sunblind.net/",
  publisher: "sunblind.net",
  notes: "The subject's official site: releases, live dates, and representation contacts.",
});
const bcNoHighs = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "No Highs | Tim Hecker",
  url: "https://timhecker.bandcamp.com/album/no-highs",
  publisher: "Bandcamp (Tim Hecker)",
  publishedAt: "2023-04-07",
  notes: "The artist's own Bandcamp page, carrying the label copy that frames the record as 'a beacon of unease against the deluge of false positive corporate ambient.'",
});
const bcNorthWater = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The North Water (Original Score) | Tim Hecker",
  url: "https://timhecker.bandcamp.com/album/the-north-water-original-score",
  publisher: "Bandcamp (Tim Hecker)",
  publishedAt: "2021-09-09",
  notes: "Bandcamp release page with full session credits, including recording at Église du Très-Saint-Nom-de-Jésus in Montreal.",
});
const bcShards = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Shards | Tim Hecker",
  url: "https://timhecker.bandcamp.com/album/shards",
  publisher: "Bandcamp (Tim Hecker)",
  publishedAt: "2025-02-21",
  notes: "Bandcamp page describing Shards as pieces originally written for film and TV soundtracks including Infinity Pool, The North Water, Luzifer, and La Tour.",
});
const bcAnoyo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Anoyo | Tim Hecker",
  url: "https://timhecker.bandcamp.com/album/anoyo",
  publisher: "Bandcamp (Tim Hecker)",
  publishedAt: "2019-05-10",
});

// --- Primary records ---------------------------------------------------

const fourAd = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Tim Hecker — Love Streams (EAD3614A)",
  url: "https://shop.4ad.com/release/339026-tim-hecker-love-streams",
  publisher: "4AD",
  notes: "Label's release page: April 8, 2016, with the official description quoting Hecker's 'liturgical aesthetics after Yeezus' and 'transcendental voice in the age of auto-tune' framings.",
});
const software = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Instrumental Tourist | Tim Hecker and Daniel Lopatin",
  url: "https://softwarelabel.bandcamp.com/album/instrumental-tourist",
  publisher: "Software Recording Co.",
  publishedAt: "2012-11-20",
  notes: "Label Bandcamp page for the Hecker–Lopatin collaboration.",
});
const milan = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Infinity Pool — Music by Tim Hecker",
  url: "https://milanrecords.com/release/infinity-pool/",
  publisher: "Milan Records",
  notes: "Label page for the soundtrack album, carrying a statement from Hecker about the score's 'speculative sonic palette.'",
});
const electrocd = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Haunt Me, Haunt Me, Do It Again — Tim Hecker — Substractif",
  url: "https://electrocd.com/en/album/4352-tim-hecker-haunt-me-haunt-me-do-it-again",
  publisher: "electrocd (Substractif/Alien8 catalog)",
  notes: "Label catalog entry for the debut album, noting Hecker's Jetone alias.",
});
const junos = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Electronic Album of the Year — award archive",
  url: "https://junoawards.ca/nomination-category/electronic-album-of-the-year/",
  publisher: "The JUNO Awards",
  notes: "Official award-category archive listing Ravedeath, 1972 as the 2012 winner and No Highs as a 2024 nominee.",
});
const seidl = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Luzifer — Ulrich Seidl Filmproduktion",
  url: "https://www.ulrichseidl.com/en/ulrich-seidl-filmproduktion/films-in-distribution/luzifer",
  publisher: "Ulrich Seidl Filmproduktion",
  notes: "Production company's film page crediting Tim Hecker with music for Peter Brunner's Luzifer.",
});

// --- Archive -----------------------------------------------------------

const alien8Archive = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Alien8 Recordings (archived label homepage)",
  url: "https://web.archive.org/web/20110208225310/http://www.alien8recordings.com/",
  publisher: "Alien8 Recordings via the Wayback Machine",
  notes: "February 2011 capture of the defunct Montreal label's site, promoting the vinyl reissue of Haunt Me.",
});

// --- Reference ---------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Tim Hecker (Q3068648)",
  url: "https://www.wikidata.org/wiki/Q3068648",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Tim Hecker",
  url: "https://en.wikipedia.org/wiki/Tim_Hecker",
  publisher: "Wikipedia",
  notes: "The birth date shown carries a citation-needed flag; used for discovery and cross-checked against interviews and label records.",
});
const wikiDisco = source({
  binding: "reference",
  mediaType: "article",
  title: "Tim Hecker discography",
  url: "https://en.wikipedia.org/wiki/Tim_Hecker_discography",
  publisher: "Wikipedia",
});
const allmusic = source({
  binding: "reference",
  mediaType: "article",
  title: "Tim Hecker — Biography",
  url: "https://www.allmusic.com/artist/hecker-mn0000930651",
  publisher: "AllMusic",
  authors: ["Paul Simpson"],
  notes: "Staff biography covering the Jetone debut, the Alien8 years, and the move to Kranky.",
});

// --- First person ------------------------------------------------------

const dissertation = source({
  binding: "first_person",
  mediaType: "book",
  title: "The era of megaphonics: on the productivity of loud sound, 1880–1930",
  url: "https://doi.org/10.82308/50638",
  publisher: "eScholarship@McGill (McGill University)",
  publishedAt: "2014",
  authors: ["Timothy Hecker"],
  notes: "Hecker's doctoral dissertation in Art History and Communication Studies at McGill, on loud sound as a productive force.",
});

// --- Interviews --------------------------------------------------------

const exclaim = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker Talks Ravedeath, 1972",
  url: "https://exclaim.ca/music/article/tim_hecker_talks_ravedeath_1972",
  publisher: "Exclaim!",
  publishedAt: "2011-02-16",
  authors: ["Vincent Pollard"],
});
const mcgillDaily = source({
  binding: "interview",
  mediaType: "article",
  title: "Bring the noise",
  url: "https://www.mcgilldaily.com/2011/04/bring-the-noise-2/",
  publisher: "The McGill Daily",
  publishedAt: "2011-04",
  notes: "Campus-paper interview on his PhD research into the history of loud sound and its relation to his music.",
});
const takeCover = source({
  binding: "interview",
  mediaType: "article",
  title: "Take Cover: Tim Hecker — Ravedeath, 1972",
  url: "https://pitchfork.com/features/take-cover/8635-take-cover-tim-hecker-iravedeath-1972i/",
  publisher: "Pitchfork",
  publishedAt: "2011-02",
  notes: "Short interview about the album art: the first MIT piano drop, licensed from the MIT museum.",
});
const raFeature = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker: Imaginary countries",
  url: "https://ra.co/features/1519",
  publisher: "Resident Advisor",
  publishedAt: "2012-01-27",
  authors: ["Holly Dicker"],
});
const quietus = source({
  binding: "interview",
  mediaType: "article",
  title: "Darkness More Than Anything: Tim Hecker Interviewed",
  url: "https://thequietus.com/interviews/tim-hecker-interview/",
  publisher: "The Quietus",
  publishedAt: "2012-03-21",
  authors: ["Ryan Alexander Diduck"],
  notes: "Interview by a fellow McGill communications PhD student who had TA'd Hecker's sound studies course.",
});
const alarm = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker: Reluctant Neo Eno",
  url: "https://alarm-magazine.com/2011/tim-hecker-reluctant-neo-eno/",
  publisher: "ALARM Magazine",
  publishedAt: "2011",
  authors: ["Gregg LaGambina"],
});
const vice = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker Builds Mountains with Sound",
  url: "https://www.vice.com/en/article/tim-hecker-builds-mountains-with-sound/",
  publisher: "VICE",
  publishedAt: "2013",
});
const spinDrones = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker: Attack of the Drones",
  url: "https://www.spinmagazine.com/2013/10/tim-hecker-virgins-attack-of-the-drones-interview/",
  publisher: "SPIN",
  publishedAt: "2013-10-10",
  authors: ["Christopher R. Weingarten"],
  notes: "Studio-visit profile in Montreal covering the Jetone years and the making of Virgins.",
});
const interviewVirgins = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker's Angels and Demons",
  url: "https://www.interviewmagazine.com/music/tim-hecker-virgins",
  publisher: "Interview Magazine",
  publishedAt: "2013-11-01",
});
const factLove = source({
  binding: "interview",
  mediaType: "article",
  title: "'I am lost with infinite choices': Tim Hecker on the information overload of Love Streams",
  url: "https://www.factmag.com/2016/03/31/tim-hecker-interview-love-streams/",
  publisher: "FACT Magazine",
  publishedAt: "2016-03-31",
  authors: ["Steph Kretowicz"],
});
const guardian = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker: 'I make pagan music that dances on the ashes of a burnt church'",
  url: "https://www.theguardian.com/music/2016/apr/05/tim-hecker-sacred-music-ambient-electronica-4ad",
  publisher: "The Guardian",
  publishedAt: "2016-04-05",
  authors: ["Bella Todd"],
});
const raExchange = source({
  binding: "interview",
  mediaType: "audio",
  title: "EX.298 Tim Hecker",
  url: "https://ra.co/exchange/298",
  publisher: "Resident Advisor",
  publishedAt: "2016",
  authors: ["Matt McDermott"],
  notes: "RA Exchange podcast episode: Love Streams, Melodyne-processed liturgical music, and 'vivid pictures with sound.'",
});
const cyclicDefrost = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker: 'There's never been one record I've been happy with.'",
  url: "https://www.cyclicdefrost.com/2016/04/tim-hecker-theres-never-been-one-record-ive-been-happy-with-interview-by-david-sullivan/",
  publisher: "Cyclic Defrost",
  publishedAt: "2016-04-18",
  authors: ["David Sullivan"],
});
const interviewPeace = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker's Peace of Mind",
  url: "https://www.interviewmagazine.com/music/tim-hecker",
  publisher: "Interview Magazine",
  publishedAt: "2016-05-19",
  authors: ["Emily McDermott"],
});
const japanTimes = source({
  binding: "interview",
  mediaType: "article",
  title: "Electronic artist Tim Hecker delves into ancient Japanese court music and negative space on 'Konoyo'",
  url: "https://www.japantimes.co.jp/culture/2018/09/25/music/tim-hecker-delivers-electronic-take-ancient-japanese-court-music-konoyo/",
  publisher: "The Japan Times",
  publishedAt: "2018-09-25",
  authors: ["James Hadfield"],
});
const phoenix = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker Crashes Into FORM Arcosanti With Japan-Inspired Album Konoyo",
  url: "https://www.phoenixnewtimes.com/music/tim-hecker-konoyo-japanese-ambient-music-form-arcosanti-2019-11278831/",
  publisher: "Phoenix New Times",
  publishedAt: "2019-05-07",
  authors: ["Douglas Markowitz"],
});
const spinAnoyo = source({
  binding: "interview",
  mediaType: "article",
  title: "Tim Hecker 'Anoyo' Interview",
  url: "https://www.spinmagazine.com/2019/05/tim-hecker-anoyo-interview-left-field/",
  publisher: "SPIN",
  publishedAt: "2019-05",
});
const synthHistory = source({
  binding: "interview",
  mediaType: "article",
  title: "Three Questions With Tim Hecker",
  url: "https://www.synthhistory.com/post/three-questions-with-tim-hecker",
  publisher: "Synth History",
  publishedAt: "2025-04-30",
});

// --- Reporting ---------------------------------------------------------

const p4kUltramarin = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jetone: Ultramarin",
  url: "https://pitchfork.com/reviews/albums/4248-ultramarin/",
  publisher: "Pitchfork",
  publishedAt: "2001-09-30",
  notes: "Contemporary review of the second Jetone album.",
});
const p4kVirginsNews = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker Announces New Album, Virgins",
  url: "https://pitchfork.com/news/51570-tim-hecker-announces-new-album-virgins/",
  publisher: "Pitchfork",
  publishedAt: "2013-07-17",
});
const p4kVirgins = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker: Virgins",
  url: "https://pitchfork.com/reviews/albums/18559-tim-hecker-virgins/",
  publisher: "Pitchfork",
  publishedAt: "2013-10-15",
  authors: ["Mike Powell"],
});
const p4kKonoyo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker: Konoyo",
  url: "https://pitchfork.com/reviews/albums/tim-hecker-konoyo/",
  publisher: "Pitchfork",
  publishedAt: "2018-09",
  notes: "Review detailing the late-2017 temple sessions, Motonori Miura's ensemble assembly, and Jóhann Jóhannsson's encouragement toward restraint.",
});
const p4kAnoyo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker: Anoyo",
  url: "https://pitchfork.com/reviews/albums/tim-hecker-anoyo/",
  publisher: "Pitchfork",
  publishedAt: "2019-05",
  notes: "Review naming the session site as Jiunzan Mandala-Temple Kanzouin and explaining the Konoyo/Anoyo 'this world'/'that world' pairing.",
});
const p4kShards = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker: Shards",
  url: "https://pitchfork.com/reviews/albums/tim-hecker-shards/",
  publisher: "Pitchfork",
  publishedAt: "2025-02-26",
});
const nprKonoyo = source({
  binding: "reporting",
  mediaType: "article",
  title: "First Listen: Tim Hecker — Konoyo",
  url: "https://www.npr.org/2018/09/20/649269073/first-listen-tim-hecker-konoyo",
  publisher: "NPR",
  publishedAt: "2018-09-20",
});
const nprThisLife = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker's 'This Life' Maps Japanese Classical Music Onto Digital Emotions",
  url: "https://www.npr.org/2018/07/31/634255387/tim-heckers-this-life-maps-japanese-classical-music-onto-digital-emotions",
  publisher: "NPR",
  publishedAt: "2018-07-31",
  notes: "Track premiere carrying Hecker's comments on processing as 'a feeling' that questions composition itself.",
});
const factAnoyo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker to release Konoyo companion LP, Anoyo",
  url: "https://www.factmag.com/2019/02/12/tim-hecker-konoyo-companion-lp-anoyo/",
  publisher: "FACT Magazine",
  publishedAt: "2019-02-12",
});
const fact4ad = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker signs to 4AD, plans new album for 2016",
  url: "https://www.factmag.com/2015/12/16/tim-hecker-4ad-album-tour/",
  publisher: "FACT Magazine",
  publishedAt: "2015-12-16",
});
const factLoveNews = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker announces first album for 4AD, Love Streams",
  url: "https://www.factmag.com/2016/01/27/tim-hecker-new-album-love-streams/",
  publisher: "FACT Magazine",
  publishedAt: "2016-01-27",
  notes: "Announcement carrying the Greenhouse Studios recording credit and the Icelandic Choir Ensemble personnel.",
});
const scenePointBlank = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker TV score",
  url: "https://www.scenepointblank.com/news/records/2021/09/10/tim-hecker-tv-score/",
  publisher: "Scene Point Blank",
  publishedAt: "2021-09-10",
  notes: "Report on The North Water score, quoting Hecker's description of writing through a pandemic Montreal winter.",
});
const filmReporter = source({
  binding: "reporting",
  mediaType: "article",
  title: "'Infinity Pool' Soundtrack Album Details",
  url: "https://filmmusicreporter.com/2023/01/25/infinity-pool-soundtrack-album-details/",
  publisher: "Film Music Reporter",
  publishedAt: "2023-01-25",
  notes: "Names The North Water, Luzifer, and The Free World among Hecker's scoring credits.",
});
const brooklynVegan = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Hecker announces new LP 'No Highs,' shares 'Lotus Light'",
  url: "https://www.brooklynvegan.com/tim-hecker-announces-new-lp-no-highs-shares-lotus-light/",
  publisher: "BrooklynVegan",
  publishedAt: "2023-01",
});
const krankyRepress = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "An Imaginary Country (2026 Repress)",
  url: "https://sisterray.co.uk/products/an-imaginary-country-2026-repress",
  publisher: "Sister Ray (Kranky listing)",
  publishedAt: "2026-09-25",
  notes:
    "Kranky's 2026 vinyl repress program: An Imaginary Country, Virgins, and Ravedeath 1972 all reissued September 25 — the catalog returning to print together.",
});

const S = {
  sunblind: sunblind.id,
  bcNoHighs: bcNoHighs.id,
  bcNorthWater: bcNorthWater.id,
  bcShards: bcShards.id,
  bcAnoyo: bcAnoyo.id,
  fourAd: fourAd.id,
  software: software.id,
  milan: milan.id,
  electrocd: electrocd.id,
  junos: junos.id,
  seidl: seidl.id,
  alien8Archive: alien8Archive.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  wikiDisco: wikiDisco.id,
  allmusic: allmusic.id,
  dissertation: dissertation.id,
  exclaim: exclaim.id,
  mcgillDaily: mcgillDaily.id,
  takeCover: takeCover.id,
  raFeature: raFeature.id,
  quietus: quietus.id,
  alarm: alarm.id,
  vice: vice.id,
  spinDrones: spinDrones.id,
  interviewVirgins: interviewVirgins.id,
  factLove: factLove.id,
  guardian: guardian.id,
  raExchange: raExchange.id,
  cyclicDefrost: cyclicDefrost.id,
  interviewPeace: interviewPeace.id,
  japanTimes: japanTimes.id,
  phoenix: phoenix.id,
  spinAnoyo: spinAnoyo.id,
  synthHistory: synthHistory.id,
  p4kUltramarin: p4kUltramarin.id,
  p4kVirginsNews: p4kVirginsNews.id,
  p4kVirgins: p4kVirgins.id,
  p4kKonoyo: p4kKonoyo.id,
  p4kAnoyo: p4kAnoyo.id,
  p4kShards: p4kShards.id,
  nprKonoyo: nprKonoyo.id,
  nprThisLife: nprThisLife.id,
  factAnoyo: factAnoyo.id,
  fact4ad: fact4ad.id,
  factLoveNews: factLoveNews.id,
  scenePointBlank: scenePointBlank.id,
  filmReporter: filmReporter.id,
  brooklynVegan: brooklynVegan.id,
  krankyRepress: krankyRepress.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-tim-hecker",
  generatedAt: "2026-09-25T22:08:41Z",
  subject: {
    kind: "person",
    handle: "tim-hecker",
    displayName: "Tim Hecker",
    alsoKnownAs: ["Jetone", "Timothy Hecker", "Timothy D. Hecker"],
    summary:
      "Canadian electronic composer and sound artist, born in Vancouver and long associated with Montreal, known for textural ambient-noise albums on Kranky and 4AD — from 2001's Haunt Me, Haunt Me Do It Again through the gagaku collaborations Konoyo and Anoyo — and for film and television scores including The North Water and Infinity Pool.",
    identity: {
      wikidataId: "Q3068648",
      officialSite: "https://sunblind.net/",
      wikipedia: "https://en.wikipedia.org/wiki/Tim_Hecker",
      profiles: ["https://timhecker.bandcamp.com/"],
    },
  },
  scope: {
    asOf: "2026-09-25T22:08:41Z",
    coverage: ["biography", "work", "philosophy", "beliefs", "media", "projects"],
  },
  sources: [
    sunblind,
    bcNoHighs,
    bcNorthWater,
    bcShards,
    bcAnoyo,
    fourAd,
    software,
    milan,
    electrocd,
    junos,
    seidl,
    alien8Archive,
    wikidata,
    wikipedia,
    wikiDisco,
    allmusic,
    dissertation,
    exclaim,
    mcgillDaily,
    takeCover,
    raFeature,
    quietus,
    alarm,
    vice,
    spinDrones,
    interviewVirgins,
    factLove,
    guardian,
    raExchange,
    cyclicDefrost,
    interviewPeace,
    japanTimes,
    phoenix,
    spinAnoyo,
    synthHistory,
    p4kUltramarin,
    p4kVirginsNews,
    p4kVirgins,
    p4kKonoyo,
    p4kAnoyo,
    p4kShards,
    nprKonoyo,
    nprThisLife,
    factAnoyo,
    fact4ad,
    factLoveNews,
    scenePointBlank,
    filmReporter,
    brooklynVegan,
    krankyRepress,
  ],
  claims: [
    {
      id: "claim-born-vancouver",
      kind: "fact",
      text: "Timothy D. Hecker was born in Vancouver, British Columbia; reference sources give the date July 17, 1974, and describe him as the son of two art teachers.",
      sourceIds: [S.wikipedia, S.wikidata, S.allmusic],
    },
    {
      id: "claim-education-ubc-concordia",
      kind: "fact",
      text: "He completed his undergraduate degree at the University of British Columbia in Vancouver, then moved to Montreal in 1998 for graduate study at Concordia University, where AllMusic describes his field as digital acoustics and software.",
      sourceIds: [S.interviewVirgins, S.wikipedia, S.allmusic],
    },
    {
      id: "claim-jetone-years",
      kind: "fact",
      text: "Through the late 1990s and into 2001 he recorded minimal techno as Jetone inside Montreal's glitch scene, releasing the album Autumnumonia on Pitchcadet in 2000 and Ultramarin on Force Inc. on August 21, 2001.",
      sourceIds: [S.allmusic, S.p4kUltramarin, S.spinDrones],
    },
    {
      id: "claim-jetone-disillusion",
      kind: "fact",
      text: "By 2001 he had become disenchanted with the Jetone project's direction and began releasing under his own name.",
      sourceIds: [S.wikipedia, S.allmusic],
    },
    {
      id: "claim-haunt-me-debut",
      kind: "fact",
      text: "His debut album under his own name, Haunt Me, Haunt Me Do It Again, was released November 20, 2001 on Substractif, a sublabel of the Montreal experimental label Alien8 Recordings; Alien8 reissued it on vinyl in 2010 and Kranky reissued a remastered edition in 2018.",
      sourceIds: [S.electrocd, S.wikipedia, S.alien8Archive],
    },
    {
      id: "claim-early-albums",
      kind: "fact",
      text: "He followed the debut with My Love Is Rotten to the Core (2002), Radio Amor (2003, on Mille Plateaux), and Mirages (2004, back on Alien8).",
      sourceIds: [S.wikiDisco, S.allmusic, S.wikipedia],
    },
    {
      id: "claim-policy-analyst",
      kind: "fact",
      text: "Alongside music he worked as a policy analyst for the Canadian government in the early 2000s, leaving that employment in 2006.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-mcgill-phd",
      kind: "fact",
      text: "In 2006 he enrolled at McGill University for a PhD in Art History and Communication Studies, lectured on sound culture there, and completed a dissertation, 'The era of megaphonics: on the productivity of loud sound, 1880–1930,' published in 2014.",
      sourceIds: [S.mcgillDaily, S.dissertation, S.wikipedia, S.quietus],
    },
    {
      id: "claim-harmony-kranky",
      kind: "fact",
      text: "Harmony in Ultraviolet (2006) opened his long affiliation with the Chicago label Kranky; Pitchfork later ranked it among the best ambient albums.",
      sourceIds: [S.wikipedia, S.allmusic],
    },
    {
      id: "claim-ravedeath-session",
      kind: "fact",
      text: "Ravedeath, 1972 was built from a single day's recording — July 21, 2010 — on the pipe organ at Fríkirkjan, a small wooden church in Reykjavík, engineered with Ben Frost; Hecker then spent roughly a month mixing and editing the material in Montreal, calling the result 'a hybrid of a studio and a live record.'",
      sourceIds: [S.exclaim, S.alarm, S.wikipedia],
    },
    {
      id: "claim-ravedeath-release",
      kind: "fact",
      text: "Ravedeath, 1972 was released February 14, 2011 on Kranky and drew universal critical acclaim.",
      sourceIds: [S.wikipedia, S.exclaim],
    },
    {
      id: "claim-piano-drop-cover",
      kind: "fact",
      text: "Its cover photograph shows MIT students' first ritual piano drop in 1972; Hecker found the image while searching for pictures of destroyed instruments, licensed it from the MIT museum, printed it, and re-photographed it on film.",
      sourceIds: [S.takeCover],
    },
    {
      id: "claim-juno-win",
      kind: "fact",
      text: "Ravedeath, 1972 won the Juno Award for Electronic Album of the Year in 2012 and was longlisted for the 2011 Polaris Music Prize.",
      sourceIds: [S.junos, S.wikipedia],
    },
    {
      id: "claim-dropped-pianos",
      kind: "fact",
      text: "Later in 2011 Kranky released Dropped Pianos, a companion set of sketch pieces from the Ravedeath period.",
      sourceIds: [S.wikiDisco, S.vice],
    },
    {
      id: "claim-instrumental-tourist",
      kind: "fact",
      text: "Instrumental Tourist, a collaboration with Daniel Lopatin (Oneohtrix Point Never), was released November 20, 2012 on Lopatin's Software Recording Co. imprint as the first SSTUDIOS collaboration; it grew out of improvisational jam sessions at Mexican Summer Studios in Brooklyn in April 2012.",
      sourceIds: [S.software, S.allmusic, S.wikipedia],
    },
    {
      id: "claim-virgins-record",
      kind: "fact",
      text: "Virgins was released October 14, 2013 on Kranky (Paper Bag in Canada) and was recorded live with chamber players in Reykjavík, Montreal, and Seattle — his first album organized around live performance rather than studio process, with Paul Corley engineering and Kara-Lis Coverdale among the players.",
      sourceIds: [S.p4kVirginsNews, S.p4kVirgins, S.spinDrones],
    },
    {
      id: "claim-4ad-signing",
      kind: "fact",
      text: "He signed to 4AD, announced in December 2015, and released Love Streams on April 8, 2016 — his first album to build vocals into the finished music.",
      sourceIds: [S.fact4ad, S.fourAd, S.guardian],
    },
    {
      id: "claim-love-streams-choir",
      kind: "fact",
      text: "Love Streams grew from 15th-century choral scores by Josquin des Prez, recomposed with Jóhann Jóhannsson, performed by the Icelandic Choir Ensemble, recorded at Greenhouse Studios in Reykjavík across 2014–2015 sessions, and reprocessed through Melodyne.",
      sourceIds: [S.interviewPeace, S.guardian, S.factLoveNews, S.raExchange, S.wikipedia],
    },
    {
      id: "claim-konoyo-sessions",
      kind: "fact",
      text: "Konoyo was drawn from late-2017 sessions at Jiunzan Mandala-Temple Kanzouin, a Buddhist temple in Tokyo's Nerima ward, with members of the gagaku ensemble Tokyo Gakuso — a group assembled by musician Motonori Miura — where Hecker acted as a de facto bandleader in call-and-response improvisation.",
      sourceIds: [S.p4kAnoyo, S.p4kKonoyo, S.phoenix, S.japanTimes, S.nprKonoyo],
    },
    {
      id: "claim-konoyo-release",
      kind: "fact",
      text: "Konoyo was released September 28, 2018 on Kranky, marking his return to the label after the 4AD record.",
      sourceIds: [S.japanTimes, S.nprKonoyo],
    },
    {
      id: "claim-anoyo",
      kind: "fact",
      text: "Anoyo followed on May 10, 2019 on Kranky — a companion drawn from the same gagaku sessions, presented as a more naturalist counterpart: 'ano yo' names the afterlife against Konoyo's 'this world.'",
      sourceIds: [S.factAnoyo, S.bcAnoyo, S.spinAnoyo, S.p4kAnoyo],
    },
    {
      id: "claim-johannsson-instigation",
      kind: "fact",
      text: "The gagaku direction was instigated in part by the Icelandic composer Jóhann Jóhannsson, a friend and collaborator who encouraged Hecker toward restraint and toward the ensemble, and who died before Konoyo's release.",
      sourceIds: [S.phoenix, S.p4kKonoyo],
    },
    {
      id: "claim-north-water",
      kind: "fact",
      text: "His first original screen score was The North Water, the BBC Two five-part Arctic whaling drama adapted from Ian McGuire's novel; written through the 2020 pandemic winter in Montreal with sessions including the Église du Très-Saint-Nom-de-Jésus, the score album was released in September 2021 on Invada and Lakeshore Records.",
      sourceIds: [S.bcNorthWater, S.scenePointBlank, S.wikiDisco],
    },
    {
      id: "claim-luzifer",
      kind: "fact",
      text: "He composed the music for Luzifer, Peter Brunner's Austrian horror film produced by Ulrich Seidl Filmproduktion, which premiered in competition at the Locarno Festival on August 11, 2021.",
      sourceIds: [S.seidl, S.filmReporter],
    },
    {
      id: "claim-infinity-pool",
      kind: "fact",
      text: "He scored Brandon Cronenberg's Infinity Pool, which premiered at the 2023 Sundance Film Festival; the 22-track soundtrack album was released by Milan Records on January 27, 2023.",
      sourceIds: [S.milan, S.filmReporter],
    },
    {
      id: "claim-free-world",
      kind: "fact",
      text: "His earlier feature scoring credit includes the 2016 independent film The Free World, announced around his 4AD signing.",
      sourceIds: [S.filmReporter, S.fact4ad],
    },
    {
      id: "claim-la-tour",
      kind: "fact",
      text: "He also scored Guillaume Nicloux's La Tour (The Lockdown Tower); pieces written for it appear among the soundtrack-derived works on Shards.",
      sourceIds: [S.synthHistory, S.bcShards],
    },
    {
      id: "claim-no-highs",
      kind: "fact",
      text: "No Highs, his eleventh studio album, was released April 7, 2023 on Kranky and features modal saxophone by Colin Stetson.",
      sourceIds: [S.bcNoHighs, S.brooklynVegan],
    },
    {
      id: "claim-no-highs-juno",
      kind: "fact",
      text: "No Highs was nominated for the Juno Award for Electronic Album of the Year in 2024.",
      sourceIds: [S.junos],
    },
    {
      id: "claim-shards",
      kind: "fact",
      text: "Shards, released February 21, 2025 on Kranky, collects pieces originally written for his film and television scores of the previous half-decade, including Infinity Pool, The North Water, Luzifer, and La Tour.",
      sourceIds: [S.bcShards, S.p4kShards, S.synthHistory],
    },
    {
      id: "claim-fantasma",
      kind: "fact",
      text: "His collaborative discography also includes Fantasma Parastasie (2008) with Aidan Baker on Alien8.",
      sourceIds: [S.wikiDisco, S.wikipedia],
    },
    {
      id: "claim-la-base",
      kind: "fact",
      text: "By the mid-2010s he was based in Los Angeles — Resident Advisor and Interview described him as an LA resident in 2016 — while remaining identified with Montreal's music community.",
      sourceIds: [S.raExchange, S.interviewPeace, S.factLove],
    },
    {
      id: "claim-npr-composers",
      kind: "fact",
      text: "Around Ravedeath he was named to NPR's list of 100 composers under 40.",
      sourceIds: [S.raExchange],
    },
    {
      id: "claim-make-less",
      kind: "stated_belief",
      text: "He describes restraint as a life project — 'just to make less' — questioning what harmonic saturation means now that pop and EDM maximalism is the norm.",
      sourceIds: [S.japanTimes],
    },
    {
      id: "claim-constraint",
      kind: "stated_belief",
      text: "He argues that digital abundance makes constraint the central compositional problem: 'I am just lost with infinite choices... constraint really matters, and omitting really matters, and putting on horse blinders really matters.'",
      sourceIds: [S.factLove],
    },
    {
      id: "claim-album-object",
      kind: "stated_belief",
      text: "He defends the album as a cohesive long-form object — 'a resistance against short, song-based forms of sonic expression' — built through iterative overlaying, reducing, and transforming until pieces blur into an arc.",
      sourceIds: [S.vice],
    },
    {
      id: "claim-digital-garbage",
      kind: "stated_belief",
      text: "He framed Ravedeath, 1972 around digital over-consumption and the ritual destruction of music — mountains of bulldozed CDs, the MIT piano drop — holding that music is simultaneously vital and 'completely taken for granted.'",
      sourceIds: [S.exclaim, S.takeCover],
    },
    {
      id: "claim-pagan-music",
      kind: "stated_belief",
      text: "Having lost his religion, he describes his work as 'pagan music that dances on the ashes of a burnt church' — experimental music built on pillaged sacred tropes for the unconverted.",
      sourceIds: [S.guardian],
    },
    {
      id: "claim-demolish",
      kind: "stated_belief",
      text: "On process he says he likes to damage or 'demolish' a sound while leaving traces of its source — 'a middlebrow brutalist' — treating digital audio as an elastic medium for slow, painterly transformation.",
      sourceIds: [S.vice],
    },
    {
      id: "claim-vivid-pictures",
      kind: "stated_belief",
      text: "He names a simple goal for the work: forming 'vivid pictures with sound.'",
      sourceIds: [S.raExchange],
    },
    {
      id: "claim-negation-muse",
      kind: "stated_belief",
      text: "No Highs is framed in his own release copy as 'a beacon of unease against the deluge of false positive corporate ambient currently in vogue,' with 'negation' named as a muse — 'an escape from escapism.'",
      sourceIds: [S.bcNoHighs],
    },
    {
      id: "claim-questions-composition",
      kind: "stated_belief",
      text: "Of processing source material into his own music he says 'it's a feeling more than anything... it questions the idea of composition. It questions the idea of originally writing something.'",
      sourceIds: [S.nprThisLife],
    },
    {
      id: "claim-never-happy",
      kind: "stated_belief",
      text: "He describes a perfectionist's distance from his catalog: 'There's never been one record I've been happy with' — peace, not happiness, is the word he reaches for.",
      sourceIds: [S.cyclicDefrost],
    },
    {
      id: "claim-interview-limit",
      kind: "stated_belief",
      text: "On talking about his work he concedes 'maybe I should never do interviews... there's a limit to what you can talk about,' while still giving interviews generously.",
      sourceIds: [S.alarm],
    },
    {
      id: "claim-titles-poetic",
      kind: "stated_belief",
      text: "He treats titles, artwork, and presentation — once begrudged in the name of 'radically pure sound' — as 'this poetic moment to kind of finish a project that's primarily sonic.'",
      sourceIds: [S.interviewVirgins],
    },
    {
      id: "claim-konoyo-puzzle",
      kind: "stated_belief",
      text: "He approached the gagaku sessions as a deliberately non-Western puzzle — 'pulling back the layers and leaving things and not being scared about making things that are more barren.'",
      sourceIds: [S.phoenix, S.japanTimes],
    },
    {
      id: "claim-infinity-pool-palette",
      kind: "stated_belief",
      text: "Of Infinity Pool he describes developing 'a speculative sonic palette for this imaginary island state,' including 'a type of cicada-laden backwoods Baltic banjo.'",
      sourceIds: [S.milan],
    },
    {
      id: "claim-north-water-winter",
      kind: "stated_belief",
      text: "He described The North Water as written through 'arguably one of the darkest winters of some memory in Montreal,' adding depth and texture to 'a five-hour doomed arctic journey.'",
      sourceIds: [S.scenePointBlank],
    },
    {
      id: "claim-pattern-acoustic-to-digital",
      kind: "pattern",
      text: "A repeating method across four albums: record acoustic players in resonant real spaces — church organ, chamber ensemble, choir, gagaku orchestra — then degrade and rebuild the material digitally in the studio.",
      sourceIds: [S.exclaim, S.p4kVirgins, S.factLove, S.nprKonoyo],
    },
    {
      id: "claim-pattern-collaborators",
      kind: "pattern",
      text: "His work is made inside a recurring circle — Ben Frost, Paul Corley, Kara-Lis Coverdale, Jóhann Jóhannsson, Daniel Lopatin — mostly within the Bedroom Community / Reykjavík network, even though the records carry his name alone.",
      sourceIds: [S.p4kVirgins, S.spinDrones, S.wikipedia],
    },
    {
      id: "claim-pattern-kranky-home",
      kind: "pattern",
      text: "Kranky has been his durable home since 2006; the 4AD release of Love Streams was a single-album detour, after which Konoyo, Anoyo, No Highs, and Shards all returned to Kranky.",
      sourceIds: [S.fact4ad, S.factAnoyo, S.bcNoHighs, S.bcShards],
    },
    {
      id: "claim-pattern-loud-dark",
      kind: "pattern",
      text: "His live shows are reported as extremely loud and staged in darkness or colored fog — immersion and disorientation as performance method rather than a band on a lit stage.",
      sourceIds: [S.allmusic, S.raExchange, S.wikipedia],
    },
    {
      id: "claim-pattern-sacred-buildings",
      kind: "pattern",
      text: "Sacred buildings recur as recording sites: Fríkirkjan church for Ravedeath, the Kanzouin Buddhist temple for the gagaku sessions, and Montreal's Église du Très-Saint-Nom-de-Jésus for The North Water.",
      sourceIds: [S.exclaim, S.phoenix, S.bcNorthWater],
    },
    {
      id: "claim-spec-anoyo-elegy",
      kind: "speculation",
      text: "The Konoyo/Anoyo pairing — 'this world' and 'that world,' the afterlife — reads elegiacally given that Jóhann Jóhannsson, who pushed the project, died months before Konoyo's release; the sources confirm his instigating role but never establish the diptych as a memorial.",
      sourceIds: [S.phoenix, S.p4kKonoyo, S.p4kAnoyo, S.factAnoyo],
    },
    {
      id: "claim-spec-4ad-detour",
      kind: "speculation",
      text: "No public record explains why the 4AD arrangement lasted exactly one album; the return to Kranky suggests a one-off experiment rather than a falling-out, but the mechanics are undocumented.",
      sourceIds: [S.fact4ad, S.factAnoyo, S.fourAd],
    },
    {
      id: "claim-spec-free-world",
      kind: "speculation",
      text: "The Free World scoring credit was announced in 2015 and is listed among his film work, yet no soundtrack album was issued and the cited record does not confirm how much of his music the released film retained.",
      sourceIds: [S.fact4ad, S.filmReporter],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1974-07-17",
      title: "Born in Vancouver, British Columbia",
      summary:
        "Timothy D. Hecker, son of two art teachers; the date rests on reference listings rather than a primary record.",
      location: "Vancouver, British Columbia, Canada",
      sourceIds: [S.wikipedia, S.wikidata, S.allmusic],
    },
    {
      id: "event-move-montreal",
      kind: "education",
      date: "1998",
      title: "Moved to Montreal for graduate study",
      summary:
        "After his undergraduate degree at UBC he relocated to Montreal to study at Concordia University and began working in the city's electronic scene.",
      location: "Montreal, Quebec, Canada",
      organization: "Concordia University",
      organizationHandle: "concordia-university",
      sourceIds: [S.wikipedia, S.allmusic, S.interviewVirgins],
    },
    {
      id: "event-autumnumonia",
      kind: "publication",
      date: "2000",
      title: "Jetone — Autumnumonia",
      summary: "First Jetone album, released on the Pitchcadet imprint.",
      organization: "Pitchcadet",
      organizationHandle: "pitchcadet",
      sourceIds: [S.allmusic],
    },
    {
      id: "event-ultramarin",
      kind: "publication",
      date: "2001-08-21",
      title: "Jetone — Ultramarin",
      summary:
        "Second and final Jetone album, on Force Inc.; Pitchfork reviewed it within the early-2000s minimal/glitch-techno wave.",
      organization: "Force Inc. Music Works",
      organizationHandle: "force-inc-music-works",
      sourceIds: [S.allmusic, S.p4kUltramarin],
    },
    {
      id: "event-haunt-me",
      kind: "publication",
      date: "2001-11-20",
      title: "Haunt Me, Haunt Me Do It Again",
      summary:
        "Debut album under his own name, on Alien8's Substractif sublabel — the turn from techno to beatless processed sound.",
      organization: "Substractif / Alien8 Recordings",
      organizationHandle: "substractif-alien8-recordings",
      sourceIds: [S.electrocd, S.wikipedia, S.allmusic],
    },
    {
      id: "event-my-love-rotten",
      kind: "publication",
      date: "2002",
      title: "My Love Is Rotten to the Core",
      summary: "Follow-up release on Substractif.",
      organization: "Substractif",
      organizationHandle: "substractif",
      sourceIds: [S.wikiDisco],
    },
    {
      id: "event-radio-amor",
      kind: "publication",
      date: "2003",
      title: "Radio Amor",
      summary: "Released on Mille Plateaux.",
      organization: "Mille Plateaux",
      organizationHandle: "mille-plateaux",
      sourceIds: [S.wikipedia, S.wikiDisco],
    },
    {
      id: "event-mirages",
      kind: "publication",
      date: "2004",
      title: "Mirages",
      summary: "Released on Alien8 Recordings.",
      organization: "Alien8 Recordings",
      organizationHandle: "alien8-recordings",
      sourceIds: [S.wikipedia, S.wikiDisco],
    },
    {
      id: "event-harmony",
      kind: "publication",
      date: "2006",
      title: "Harmony in Ultraviolet — first Kranky album",
      summary:
        "Opened the long Kranky affiliation and incorporated processed pipe organ into his palette.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.wikipedia, S.allmusic],
    },
    {
      id: "event-government-mcgill",
      kind: "role",
      date: "2006",
      title: "Left government work; began McGill PhD",
      summary:
        "Ended his policy-analyst employment with the Canadian government and enrolled in Art History and Communication Studies at McGill, where he also lectured on sound culture.",
      organization: "McGill University",
      organizationHandle: "mcgill-university",
      location: "Montreal, Quebec, Canada",
      sourceIds: [S.wikipedia, S.mcgillDaily],
    },
    {
      id: "event-fantasma",
      kind: "publication",
      date: "2008",
      title: "Fantasma Parastasie (with Aidan Baker)",
      summary: "Collaborative album on Alien8.",
      organization: "Alien8 Recordings",
      organizationHandle: "alien8-recordings",
      sourceIds: [S.wikiDisco],
    },
    {
      id: "event-imaginary-country",
      kind: "publication",
      date: "2009",
      title: "An Imaginary Country",
      summary: "Second Kranky album.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-frikirkjan-session",
      kind: "project",
      date: "2010-07-21",
      title: "Ravedeath recorded at Fríkirkjan church",
      summary:
        "A single day of pipe-organ recording in a small wooden Reykjavík church, engineered with Ben Frost — the raw material for Ravedeath, 1972.",
      location: "Fríkirkjan, Reykjavík, Iceland",
      sourceIds: [S.exclaim, S.alarm],
    },
    {
      id: "event-ravedeath",
      kind: "publication",
      date: "2011-02-14",
      title: "Ravedeath, 1972 released",
      summary:
        "Released on Kranky to universal acclaim; companion sketches followed as Dropped Pianos later that year.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.wikipedia, S.exclaim],
    },
    {
      id: "event-juno-2012",
      kind: "award",
      date: "2012",
      title: "Juno Award — Electronic Album of the Year",
      summary:
        "Ravedeath, 1972 won the 2012 Juno for Electronic Album of the Year; it had also been longlisted for the 2011 Polaris Music Prize.",
      organization: "The JUNO Awards",
      organizationHandle: "the-juno-awards",
      sourceIds: [S.junos, S.wikipedia],
    },
    {
      id: "event-instrumental-tourist",
      kind: "publication",
      date: "2012-11-20",
      title: "Instrumental Tourist with Daniel Lopatin",
      summary:
        "Improvised collaboration recorded at Mexican Summer Studios, first in the SSTUDIOS series on Software Recording Co.",
      organization: "Software Recording Co.",
      organizationHandle: "software-recording-co",
      sourceIds: [S.software, S.allmusic],
    },
    {
      id: "event-virgins",
      kind: "publication",
      date: "2013-10-14",
      title: "Virgins released",
      summary:
        "First album built around live chamber performance, recorded in Reykjavík, Montreal, and Seattle; Paper Bag released it in Canada.",
      organization: "Kranky / Paper Bag Records",
      organizationHandle: "kranky-paper-bag-records",
      sourceIds: [S.p4kVirginsNews, S.p4kVirgins],
    },
    {
      id: "event-phd-dissertation",
      kind: "education",
      date: "2014",
      title: "PhD dissertation published",
      summary:
        "'The era of megaphonics: on the productivity of loud sound, 1880–1930' — a history of loudness as a productive force, from the world's loudest pipe organ to fog signals and shock-wave science.",
      organization: "McGill University",
      organizationHandle: "mcgill-university",
      sourceIds: [S.dissertation, S.mcgillDaily],
    },
    {
      id: "event-4ad-signing",
      kind: "milestone",
      date: "2015-12",
      title: "Signed to 4AD",
      summary: "The signing was announced in December 2015 alongside 2016 tour dates.",
      organization: "4AD",
      organizationHandle: "4ad",
      sourceIds: [S.fact4ad],
    },
    {
      id: "event-love-streams",
      kind: "publication",
      date: "2016-04-08",
      title: "Love Streams released on 4AD",
      summary:
        "Built on 15th-century choral scores recomposed with Jóhann Jóhannsson and sung by the Icelandic Choir Ensemble — his first record with the voice at its center.",
      organization: "4AD",
      organizationHandle: "4ad",
      sourceIds: [S.fourAd, S.guardian, S.interviewPeace],
    },
    {
      id: "event-gagaku-sessions",
      kind: "project",
      date: "2017",
      title: "Gagaku sessions in Tokyo",
      summary:
        "Late-2017 improvisational sessions with members of Tokyo Gakuso at Jiunzan Mandala-Temple Kanzouin, a Buddhist temple in Nerima — the raw material for Konoyo and Anoyo.",
      location: "Nerima, Tokyo, Japan",
      sourceIds: [S.p4kKonoyo, S.phoenix, S.spinAnoyo],
    },
    {
      id: "event-konoyo",
      kind: "publication",
      date: "2018-09-28",
      title: "Konoyo released",
      summary: "The first of the two gagaku albums, back on Kranky.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.japanTimes, S.nprKonoyo],
    },
    {
      id: "event-anoyo",
      kind: "publication",
      date: "2019-05-10",
      title: "Anoyo released",
      summary:
        "Companion LP from the same sessions — 'that world' to Konoyo's 'this world,' more acoustically exposed.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.factAnoyo, S.bcAnoyo],
    },
    {
      id: "event-luzifer",
      kind: "media",
      date: "2021-08-11",
      title: "Luzifer premieres at Locarno",
      summary: "Peter Brunner's horror film with Hecker's score premiered in the Locarno main competition.",
      location: "Locarno, Switzerland",
      sourceIds: [S.seidl],
    },
    {
      id: "event-north-water",
      kind: "media",
      date: "2021-09",
      title: "The North Water airs on BBC Two; score released",
      summary:
        "His first original screen score; the soundtrack album followed on Invada/Lakeshore in September 2021.",
      organization: "BBC Two / Invada / Lakeshore",
      organizationHandle: "bbc-two-invada-lakeshore",
      sourceIds: [S.bcNorthWater, S.scenePointBlank, S.wikiDisco],
    },
    {
      id: "event-infinity-pool",
      kind: "media",
      date: "2023-01-27",
      title: "Infinity Pool — film and soundtrack released",
      summary:
        "Brandon Cronenberg's film reached theaters and the Milan Records soundtrack album arrived the same day, after a Sundance premiere.",
      organization: "Milan Records / Neon",
      organizationHandle: "milan-records-neon",
      sourceIds: [S.milan, S.filmReporter],
    },
    {
      id: "event-no-highs",
      kind: "publication",
      date: "2023-04-07",
      title: "No Highs released",
      summary:
        "Eleventh studio album on Kranky with modal saxophone by Colin Stetson; nominated for the 2024 Juno for Electronic Album of the Year.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.bcNoHighs, S.brooklynVegan, S.junos],
    },
    {
      id: "event-shards",
      kind: "publication",
      date: "2025-02-21",
      title: "Shards released",
      summary:
        "A short Kranky collection of pieces first written for his film and television scores.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.bcShards, S.p4kShards],
    },
    {
      id: "event-kranky-repress",
      kind: "publication",
      date: "2026-09-25",
      title: "Kranky represses the core catalog",
      summary:
        "An Imaginary Country, Virgins, and Ravedeath 1972 return to vinyl in Kranky's 2026 repress run — the three pillars of the catalog back in print at once.",
      organization: "Kranky",
      organizationHandle: "kranky",
      sourceIds: [S.krankyRepress],
    },
  ],
  themes: [
    {
      id: "theme-texture-as-structure",
      kind: "method",
      status: "reported",
      title: "Texture as structure",
      summary:
        "Critics consistently describe his music as built from timbre and physical sound rather than melody or harmony — 'sculpting sound' into masses that behave like weather or terrain.",
      sourceIds: [S.vice, S.allmusic, S.p4kVirgins],
    },
    {
      id: "theme-degradation",
      kind: "philosophy",
      status: "stated",
      title: "Degradation and ritual destruction of the signal",
      summary:
        "From the MIT piano drop on Ravedeath's cover to his talk of demolishing and damaging sound while leaving traces of the source, he treats decay, garbage, and overload as compositional material.",
      sourceIds: [S.exclaim, S.takeCover, S.vice],
    },
    {
      id: "theme-liturgical-space",
      kind: "belief",
      status: "stated",
      title: "Sacred music without religion",
      summary:
        "'Pagan music that dances on the ashes of a burnt church': he plunders liturgical forms — organ, choir, temple gagaku — while recording in churches and temples, fascinated by transcendence he does not profess.",
      sourceIds: [S.guardian, S.interviewPeace, S.japanTimes],
    },
    {
      id: "theme-acoustic-digital-blur",
      kind: "method",
      status: "reported",
      title: "The acoustic–digital blur",
      summary:
        "Reviewers note that in the later records it is impossible to tell where the gagaku flutes, choir, or woodwinds end and the processing begins — the acoustic source and its digital corruption are the composition.",
      sourceIds: [S.p4kKonoyo, S.nprKonoyo, S.factLove],
    },
    {
      id: "theme-constraint",
      kind: "belief",
      status: "stated",
      title: "Constraint against infinite choice",
      summary:
        "He argues the digital studio's infinite options produce paralysis, so omitting, blinding, and reducing become the composer's real work — 'a life project: just to make less.'",
      sourceIds: [S.factLove, S.japanTimes],
    },
    {
      id: "theme-ensembles",
      kind: "practice",
      status: "reported",
      title: "From laptop soloist to bandleader",
      summary:
        "After a decade of solitary processing, his albums from Virgins onward are built on live ensembles — Bedroom Community players, the Icelandic Choir Ensemble, Tokyo Gakuso — with Hecker directing improvisation and answering it in real time.",
      sourceIds: [S.p4kVirgins, S.nprKonoyo, S.interviewPeace],
    },
    {
      id: "theme-loudness",
      kind: "method",
      status: "inferred",
      title: "Loudness as both scholarship and practice",
      summary:
        "His dissertation historicizes loud sound as a productive, bodily force while his concerts are famed for overwhelming volume in darkness — the index infers continuity between the research and the stage, a link interviews suggest but never state outright.",
      sourceIds: [S.dissertation, S.mcgillDaily, S.allmusic, S.raExchange],
    },
    {
      id: "theme-anti-corporate-ambient",
      kind: "belief",
      status: "stated",
      title: "Ambient against ambient",
      summary:
        "No Highs was framed as a riposte to 'false positive corporate ambient' — music of austerity and disquiet positioned against playlist functional calm.",
      sourceIds: [S.bcNoHighs, S.brooklynVegan],
    },
    {
      id: "theme-collaboration-circle",
      kind: "influence",
      status: "reported",
      title: "The Reykjavík–Montreal circle",
      summary:
        "Ben Frost, Paul Corley, Kara-Lis Coverdale, Jóhann Jóhannsson, and Daniel Lopatin recur as engineers, players, arrangers, and instigators — his solo records are made inside this fraternal network.",
      sourceIds: [S.p4kVirgins, S.spinDrones, S.wikipedia],
    },
  ],
  works: [
    {
      id: "work-autumnumonia",
      kind: "recording",
      status: "released",
      title: "Autumnumonia (as Jetone)",
      date: "2000",
      summary: "First Jetone album, on Pitchcadet.",
      sourceIds: [S.allmusic],
    },
    {
      id: "work-ultramarin",
      kind: "recording",
      status: "released",
      title: "Ultramarin (as Jetone)",
      date: "2001-08-21",
      summary: "Second Jetone album on Force Inc., inside the early-2000s glitch-techno wave.",
      sourceIds: [S.allmusic, S.p4kUltramarin],
    },
    {
      id: "work-haunt-me",
      kind: "recording",
      status: "released",
      title: "Haunt Me, Haunt Me Do It Again",
      date: "2001-11-20",
      summary: "Debut under his own name, on Alien8's Substractif sublabel.",
      sourceIds: [S.electrocd, S.wikipedia],
    },
    {
      id: "work-my-love-rotten",
      kind: "recording",
      status: "released",
      title: "My Love Is Rotten to the Core",
      date: "2002",
      sourceIds: [S.wikiDisco],
    },
    {
      id: "work-radio-amor",
      kind: "recording",
      status: "released",
      title: "Radio Amor",
      date: "2003",
      summary: "Released on Mille Plateaux.",
      sourceIds: [S.wikiDisco, S.allmusic],
    },
    {
      id: "work-mirages",
      kind: "recording",
      status: "released",
      title: "Mirages",
      date: "2004",
      summary: "Released on Alien8 Recordings.",
      sourceIds: [S.wikiDisco],
    },
    {
      id: "work-harmony",
      kind: "recording",
      status: "released",
      title: "Harmony in Ultraviolet",
      date: "2006",
      summary: "First Kranky album; later ranked among Pitchfork's best ambient albums.",
      sourceIds: [S.wikipedia, S.allmusic],
    },
    {
      id: "work-fantasma",
      kind: "recording",
      status: "released",
      title: "Fantasma Parastasie (with Aidan Baker)",
      date: "2008",
      summary: "Collaborative album on Alien8.",
      sourceIds: [S.wikiDisco],
    },
    {
      id: "work-imaginary-country",
      kind: "recording",
      status: "released",
      title: "An Imaginary Country",
      date: "2009",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-ravedeath",
      kind: "recording",
      status: "released",
      title: "Ravedeath, 1972",
      date: "2011-02-14",
      summary:
        "Pipe-organ recordings made at Fríkirkjan, Reykjavík, reworked in Montreal; won the 2012 Juno for Electronic Album of the Year.",
      location: "Reykjavík / Montreal",
      sourceIds: [S.exclaim, S.junos, S.wikipedia],
    },
    {
      id: "work-dropped-pianos",
      kind: "recording",
      status: "released",
      title: "Dropped Pianos",
      date: "2011",
      summary: "Companion sketches to Ravedeath on Kranky.",
      sourceIds: [S.wikiDisco],
    },
    {
      id: "work-instrumental-tourist",
      kind: "recording",
      status: "released",
      title: "Instrumental Tourist (with Daniel Lopatin)",
      date: "2012-11-20",
      summary: "First SSTUDIOS collaboration on Software Recording Co.",
      sourceIds: [S.software, S.allmusic],
    },
    {
      id: "work-virgins",
      kind: "recording",
      status: "released",
      title: "Virgins",
      date: "2013-10-14",
      summary: "Chamber-ensemble album recorded in Reykjavík, Montreal, and Seattle.",
      sourceIds: [S.p4kVirginsNews, S.p4kVirgins],
    },
    {
      id: "work-megaphonics",
      kind: "paper",
      status: "published",
      title: "The era of megaphonics: on the productivity of loud sound, 1880–1930",
      date: "2014",
      summary: "Doctoral dissertation, McGill University, Art History and Communication Studies.",
      sourceIds: [S.dissertation],
    },
    {
      id: "work-love-streams",
      kind: "recording",
      status: "released",
      title: "Love Streams",
      date: "2016-04-08",
      summary:
        "4AD album built on 15th-century choral scores sung by the Icelandic Choir Ensemble.",
      sourceIds: [S.fourAd, S.guardian],
    },
    {
      id: "work-free-world",
      kind: "film",
      status: "completed",
      title: "The Free World (score)",
      date: "2016",
      summary: "Early feature scoring credit on the independent film.",
      sourceIds: [S.filmReporter, S.fact4ad],
    },
    {
      id: "work-konoyo",
      kind: "recording",
      status: "released",
      title: "Konoyo",
      date: "2018-09-28",
      summary: "Gagaku collaboration with Tokyo Gakuso, on Kranky.",
      sourceIds: [S.japanTimes, S.nprKonoyo],
    },
    {
      id: "work-anoyo",
      kind: "recording",
      status: "released",
      title: "Anoyo",
      date: "2019-05-10",
      summary: "Companion gagaku album — 'that world' — from the same sessions.",
      sourceIds: [S.factAnoyo, S.bcAnoyo],
    },
    {
      id: "work-north-water",
      kind: "film",
      status: "completed",
      title: "The North Water (BBC Two series score)",
      date: "2021",
      summary:
        "First original screen score; the soundtrack album was released on Invada/Lakeshore.",
      sourceIds: [S.bcNorthWater, S.scenePointBlank, S.wikiDisco],
    },
    {
      id: "work-luzifer",
      kind: "film",
      status: "completed",
      title: "Luzifer (score)",
      date: "2021",
      summary: "Score for Peter Brunner's film, premiered at Locarno.",
      sourceIds: [S.seidl, S.filmReporter],
    },
    {
      id: "work-la-tour",
      kind: "film",
      status: "completed",
      title: "La Tour / The Lockdown Tower (score)",
      date: "2022",
      summary: "Score for Guillaume Nicloux's film; related pieces appear on Shards.",
      sourceIds: [S.synthHistory, S.bcShards],
    },
    {
      id: "work-infinity-pool",
      kind: "film",
      status: "completed",
      title: "Infinity Pool (score)",
      date: "2023-01-27",
      summary: "Score for Brandon Cronenberg's film; soundtrack album on Milan Records.",
      sourceIds: [S.milan, S.filmReporter],
    },
    {
      id: "work-no-highs",
      kind: "recording",
      status: "released",
      title: "No Highs",
      date: "2023-04-07",
      summary: "Kranky album with Colin Stetson; 2024 Juno nominee.",
      sourceIds: [S.bcNoHighs, S.junos],
    },
    {
      id: "work-shards",
      kind: "recording",
      status: "released",
      title: "Shards",
      date: "2025-02-21",
      summary: "Kranky collection of pieces first written for film and television scores.",
      sourceIds: [S.bcShards, S.p4kShards],
    },
  ],
  appearances: [
    {
      id: "appearance-exclaim-ravedeath",
      title: "Tim Hecker Talks Ravedeath, 1972",
      venue: "Exclaim!",
      publishedAt: "2011-02-16",
      participants: ["Tim Hecker", "Vincent Pollard"],
      summary:
        "Release-week interview covering the Fríkirkjan church session and the album's theme of digital over-consumption and ritual destruction.",
      media: [
        {
          type: "article",
          url: "https://exclaim.ca/music/article/tim_hecker_talks_ravedeath_1972",
          sourceId: S.exclaim,
        },
      ],
      sourceIds: [S.exclaim],
    },
    {
      id: "appearance-take-cover",
      title: "Take Cover: Tim Hecker — Ravedeath, 1972",
      venue: "Pitchfork",
      publishedAt: "2011-02",
      participants: ["Tim Hecker"],
      summary: "Short Q&A on the MIT piano-drop cover art and his obsession with digital garbage.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/take-cover/8635-take-cover-tim-hecker-iravedeath-1972i/",
          sourceId: S.takeCover,
        },
      ],
      sourceIds: [S.takeCover],
    },
    {
      id: "appearance-mcgill-daily",
      title: "Bring the noise",
      venue: "The McGill Daily",
      publishedAt: "2011-04",
      participants: ["Tim Hecker"],
      summary: "On his PhD research into loud sound and the classroom work in sound culture.",
      media: [
        {
          type: "article",
          url: "https://www.mcgilldaily.com/2011/04/bring-the-noise-2/",
          sourceId: S.mcgillDaily,
        },
      ],
      sourceIds: [S.mcgillDaily],
    },
    {
      id: "appearance-ra-feature",
      title: "Tim Hecker: Imaginary countries",
      venue: "Resident Advisor",
      publishedAt: "2012-01-27",
      participants: ["Tim Hecker", "Holly Dicker"],
      summary: "RA feature interview on complexity and ambiguity in the work.",
      media: [
        {
          type: "article",
          url: "https://ra.co/features/1519",
          sourceId: S.raFeature,
        },
      ],
      sourceIds: [S.raFeature],
    },
    {
      id: "appearance-quietus",
      title: "Darkness More Than Anything: Tim Hecker Interviewed",
      venue: "The Quietus",
      publishedAt: "2012-03-21",
      participants: ["Tim Hecker", "Ryan Alexander Diduck"],
      summary:
        "Studio visit covering church organs, religious rapture, and the McGill sound-studies world.",
      media: [
        {
          type: "article",
          url: "https://thequietus.com/interviews/tim-hecker-interview/",
          sourceId: S.quietus,
        },
      ],
      sourceIds: [S.quietus],
    },
    {
      id: "appearance-spin-drones",
      title: "Tim Hecker: Attack of the Drones",
      venue: "SPIN",
      publishedAt: "2013-10-10",
      participants: ["Tim Hecker", "Christopher R. Weingarten", "Kara-Lis Coverdale", "Ben Frost"],
      summary:
        "Montreal studio-visit profile during Virgins: the Jetone history, the chaotic two-screen setup, and the ensemble turn.",
      media: [
        {
          type: "article",
          url: "https://www.spinmagazine.com/2013/10/tim-hecker-virgins-attack-of-the-drones-interview/",
          sourceId: S.spinDrones,
        },
      ],
      sourceIds: [S.spinDrones],
    },
    {
      id: "appearance-interview-virgins",
      title: "Tim Hecker's Angels and Demons",
      venue: "Interview Magazine",
      publishedAt: "2013-11-01",
      participants: ["Tim Hecker"],
      summary: "On the Virgins title, his detour into Canadian politics, and '90s technology.",
      media: [
        {
          type: "article",
          url: "https://www.interviewmagazine.com/music/tim-hecker-virgins",
          sourceId: S.interviewVirgins,
        },
      ],
      sourceIds: [S.interviewVirgins],
    },
    {
      id: "appearance-fact-love-streams",
      title: "'I am lost with infinite choices'",
      venue: "FACT Magazine",
      publishedAt: "2016-03-31",
      participants: ["Tim Hecker", "Steph Kretowicz"],
      summary:
        "On Love Streams, the analogue–digital divide, and constraint as the answer to digital abundance.",
      media: [
        {
          type: "article",
          url: "https://www.factmag.com/2016/03/31/tim-hecker-interview-love-streams/",
          sourceId: S.factLove,
        },
      ],
      sourceIds: [S.factLove],
    },
    {
      id: "appearance-guardian",
      title: "Tim Hecker: 'I make pagan music that dances on the ashes of a burnt church'",
      venue: "The Guardian",
      publishedAt: "2016-04-05",
      participants: ["Tim Hecker", "Bella Todd"],
      summary:
        "On losing religion, looting 15th-century sacred choral music, and the 4AD move.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/music/2016/apr/05/tim-hecker-sacred-music-ambient-electronica-4ad",
          sourceId: S.guardian,
        },
      ],
      sourceIds: [S.guardian],
    },
    {
      id: "appearance-ra-exchange",
      title: "EX.298 Tim Hecker",
      venue: "Resident Advisor Exchange",
      publishedAt: "2016",
      participants: ["Tim Hecker", "Matt McDermott"],
      summary:
        "Podcast interview on Love Streams' Melodyne-processed liturgical sources, live fog and volume, and forming 'vivid pictures with sound.'",
      media: [
        {
          type: "audio",
          url: "https://ra.co/exchange/298",
          sourceId: S.raExchange,
        },
      ],
      sourceIds: [S.raExchange],
    },
    {
      id: "appearance-interview-peace",
      title: "Tim Hecker's Peace of Mind",
      venue: "Interview Magazine",
      publishedAt: "2016-05-19",
      participants: ["Tim Hecker", "Emily McDermott"],
      summary:
        "On Iceland's pull, the Jóhann Jóhannsson-recomposed choir, and his visual-art inspirations.",
      media: [
        {
          type: "article",
          url: "https://www.interviewmagazine.com/music/tim-hecker",
          sourceId: S.interviewPeace,
        },
      ],
      sourceIds: [S.interviewPeace],
    },
    {
      id: "appearance-japan-times",
      title: "Electronic artist Tim Hecker delves into ancient Japanese court music and negative space on 'Konoyo'",
      venue: "The Japan Times",
      publishedAt: "2018-09-25",
      participants: ["Tim Hecker", "James Hadfield"],
      summary:
        "On the Tokyo Gakuso sessions, restraint as a life project, and the concept of negative space.",
      media: [
        {
          type: "article",
          url: "https://www.japantimes.co.jp/culture/2018/09/25/music/tim-hecker-delivers-electronic-take-ancient-japanese-court-music-konoyo/",
          sourceId: S.japanTimes,
        },
      ],
      sourceIds: [S.japanTimes],
    },
    {
      id: "appearance-phoenix",
      title: "Tim Hecker Crashes Into FORM Arcosanti With Japan-Inspired Album Konoyo",
      venue: "Phoenix New Times",
      publishedAt: "2019-05-07",
      participants: ["Tim Hecker", "Douglas Markowitz"],
      summary:
        "On the Nerima temple sessions, Jóhann Jóhannsson's instigation, and the tuning gap between gagaku and Western instruments.",
      media: [
        {
          type: "article",
          url: "https://www.phoenixnewtimes.com/music/tim-hecker-konoyo-japanese-ambient-music-form-arcosanti-2019-11278831/",
          sourceId: S.phoenix,
        },
      ],
      sourceIds: [S.phoenix],
    },
    {
      id: "appearance-synth-history",
      title: "Three Questions With Tim Hecker",
      venue: "Synth History",
      publishedAt: "2025-04-30",
      participants: ["Tim Hecker"],
      summary:
        "On Shards, modular synthesis versus Max/MSP, collaboration, and recommended listening.",
      media: [
        {
          type: "article",
          url: "https://www.synthhistory.com/post/three-questions-with-tim-hecker",
          sourceId: S.synthHistory,
        },
      ],
      sourceIds: [S.synthHistory],
    },
  ],
  relations: [
    {
      id: "rel-daniel-lopatin",
      kind: "collaborated",
      target: "daniel-lopatin",
      targetName: "Daniel Lopatin",
      note: "Instrumental Tourist — the November 2012 SSTUDIOS collaboration released on Lopatin's Software Recording Co. imprint.",
      start: "2012-11",
      targetWikidataId: "Q286346",
      sourceIds: [S.software, S.allmusic],
    },
    {
      id: "rel-ben-frost",
      kind: "collaborated",
      target: "ben-frost",
      targetName: "Ben Frost",
      note: "Engineered Ravedeath, 1972 at Fríkirkjan; part of the recurring Reykjavík–Montreal collaborator circle.",
      start: "2011",
      targetWikidataId: "Q4493066",
      sourceIds: [S.p4kVirgins, S.spinDrones, S.wikipedia],
    },
    {
      id: "rel-paul-corley",
      kind: "collaborated",
      target: "paul-corley",
      targetName: "Paul Corley",
      note: "Virgins-era collaborator; part of the recurring collaborator circle.",
      start: "2013",
      sourceIds: [S.p4kVirgins, S.spinDrones, S.wikipedia],
    },
    {
      id: "rel-kara-lis-coverdale",
      kind: "collaborated",
      target: "kara-lis-coverdale",
      targetName: "Kara-Lis Coverdale",
      note: "Part of the recurring collaborator circle around the Virgins-era and later records.",
      start: "2013",
      targetWikidataId: "Q20740744",
      sourceIds: [S.p4kVirgins, S.spinDrones, S.wikipedia],
    },
    {
      id: "rel-johann-johannsson",
      kind: "collaborated",
      target: "johann-johannsson",
      targetName: "Jóhann Jóhannsson",
      note: "Part of the recurring collaborator circle; credited with urging restraint on the Konoyo sessions.",
      start: "2018",
      targetWikidataId: "Q428347",
      sourceIds: [S.p4kKonoyo, S.spinDrones, S.wikipedia],
    },
  ],
  openQuestions: [
    "The July 17, 1974 birth date rests on secondary listings — Wikipedia flags it citation-needed — and no primary record was located in the cited sources.",
    "Sources describe him as 'debuting' as Jetone in 1996 yet date the first confirmed Jetone album to 2000; what the 1996 activity or release comprised is unclear.",
    "The Free World (2016) was announced as a scoring credit and is listed among his film work, but no soundtrack album exists and the cited record does not confirm how much of his music the released film used.",
    "Current base of operations: mid-2010s interviews describe an LA resident while profiles and label copy keep Montreal ties; the present split is undocumented.",
    "Album counts differ between sources (eleven or twelve studio albums, more if Jetone records and collaborations are counted) — the numbering depends on unstated counting rules.",
    "No public explanation was found for the single-album 4AD arrangement between long Kranky affiliations.",
    "Wikipedia's album article dates the Ravedeath Juno win to March 2011 while the Juno archive places it in the 2012 award year; the index follows the Juno record.",
    "Harmony in Ultraviolet's standing as one of the greatest ambient albums is cited here through Wikipedia's report of a Pitchfork list rather than the list itself.",
  ],
  body: `Tim Hecker is a Canadian electronic composer who has spent more than two decades turning recorded sound into weather systems: albums where pipe organs, choirs, and court orchestras are captured in resonant rooms and then corroded, layered, and reformed in the computer until texture itself carries the structure. Born in Vancouver and long identified with Montreal, he records mostly for the Chicago label Kranky, with a single-album detour to 4AD, and since 2021 has added a parallel career scoring film and television.

## Formation: Jetone, Montreal, and the academy

Hecker grew up in Vancouver, the son of two art teachers, played in rock bands, and took his undergraduate degree at the University of British Columbia before moving to Montreal in 1998 for graduate study at Concordia — digital acoustics and software, by AllMusic's account. Through the turn of the decade he worked as Jetone inside the city's glitch-techno wave, releasing *Autumnumonia* (2000, Pitchcadet) and *Ultramarin* (2001, Force Inc.) — minimal techno with an ambient undertow that Pitchfork reviewed warmly at the time. Disenchanted with the project's direction, he switched to his own name for *Haunt Me, Haunt Me Do It Again* (2001), the first release on Alien8's Substractif sublabel, followed by *My Love Is Rotten to the Core* (2002), *Radio Amor* (2003, Mille Plateaux), and *Mirages* (2004).

Two parallel lives run underneath the records. In the early 2000s he worked as a policy analyst for the Canadian government, leaving in 2006 to begin a PhD in Art History and Communication Studies at McGill, where he lectured on sound culture. His 2014 dissertation, *The era of megaphonics*, is a history of loudness as a productive force — the world's loudest pipe organ, coastal fog signals, shock-wave science. It is hard not to read against concerts famous for overwhelming volume in darkness and colored fog, though interviews suggest rather than state the link.

## The Kranky canon

*Harmony in Ultraviolet* (2006) opened the Kranky affiliation that still holds, folding processed pipe organ into the palette; Pitchfork later ranked it among the best ambient albums. After *An Imaginary Country* (2009) came the breakthrough: *Ravedeath, 1972* (2011), built from a single day's recording on the pipe organ at Fríkirkjan, a small wooden church in Reykjavík, engineered with Ben Frost, then mixed and edited for a month in Montreal — "a hybrid of a studio and a live record," he told Exclaim!. Its cover is the first MIT piano drop, a found image of ritual destruction matching the album's stated concern with digital over-consumption of music. It won the 2012 Juno for Electronic Album of the Year and was Polaris-longlisted; the companion *Dropped Pianos* sketches followed the same year, and 2012 also brought *Instrumental Tourist*, the improvisational SSTUDIOS session with Daniel Lopatin on Software Recording Co.

*Virgins* (2013) reorganized the method around live players — chamber musicians from the Bedroom Community circle in Reykjavík, Montreal, and Seattle, with Paul Corley engineering and Kara-Lis Coverdale among the performers; Pitchfork heard it as his first record focused on performance rather than process. After signing to 4AD in late 2015 he made *Love Streams* (2016), his first album with the voice at its center: 15th-century Josquin des Prez choral scores recomposed with Jóhann Jóhannsson, sung by the Icelandic Choir Ensemble at Greenhouse Studios, and reprocessed through Melodyne into what he called liturgical aesthetics for an auto-tune age. He told the Guardian it was "pagan music that dances on the ashes of a burnt church."

## The gagaku diptych and after

Encouraged by Jóhannsson — who died months before the release — Hecker spent late 2017 in a Buddhist temple in Tokyo's Nerima ward improvising with members of Tokyo Gakuso, the gagaku ensemble assembled by Motonori Miura. He played bandleader as much as producer: moods called out, the ensemble's shō and hichiriki answered, his synthesizers answered back. *Konoyo* ("this world," 2018) and *Anoyo* ("that world," 2019), both on Kranky, are his most exposed records — the press heard the second as the photo negative of the first. The pairing's funerary frame, given Jóhannsson's death, is an elegiac reading the sources suggest without ever confirming.

*No Highs* (2023), featuring Colin Stetson's modal saxophone, was positioned in his own release copy as "a beacon of unease against the deluge of false positive corporate ambient" — negation as muse — and was nominated for the 2024 Juno. *Shards* (2025) collects pieces first written for screens.

## Scoring

His first original score was *The North Water* (BBC Two, 2021), written through the pandemic Montreal winter with sessions including the Église du Très-Saint-Nom-de-Jésus — another sacred room — and released on Invada/Lakeshore. Scores for Peter Brunner's *Luzifer* (Locarno, 2021), Guillaume Nicloux's *La Tour*, and Brandon Cronenberg's *Infinity Pool* (Sundance 2023; Milan Records soundtrack) followed, with an earlier credit on *The Free World* (2016). For *Infinity Pool* he described building "a speculative sonic palette for this imaginary island state," down to "a cicada-laden backwoods Baltic banjo."

## Ideas

Across interviews a few commitments hold steady: constraint and omission as the answer to infinite digital choice ("I am just lost with infinite choices," FACT); the album as a cohesive object against song-scale streaming; degradation as material — damaged sound that keeps traces of its source; sacred form looted by a non-believer; and restraint — "just to make less" — as a life project. He calls his own catalog a source of peace rather than happiness, and suspects there is a limit to what can be said about any of it.

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
