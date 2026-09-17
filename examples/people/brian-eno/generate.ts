#!/usr/bin/env bun
/** Generate examples/people/brian-eno/person-index.json with derived source ids. */

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

// --- Subject-controlled ---
const enoAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About - Brian Eno",
  url: "https://www.brian-eno.net/about/",
  publisher: "brian-eno.net",
  notes: "The subject's official biography page; claims here are self-reported.",
});
const genMusic = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "GenerativeMusic.com — Apps by Brian Eno and Peter Chilvers",
  url: "https://www.generativemusic.com/",
  publisher: "GenerativeMusic.com",
  notes:
    "Catalog for the generative-music apps Eno makes with Peter Chilvers: Bloom, Trope, Scape, Reflection.",
});
const genMusicBloom = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bloom by Brian Eno and Peter Chilvers",
  url: "https://generativemusic.com/bloom.html",
  publisher: "GenerativeMusic.com",
  notes: "Product page for the 2008 generative iPhone app.",
});

// --- First person ---
const faberDiary = source({
  binding: "first_person",
  mediaType: "book",
  title: "A Year with Swollen Appendices: Brian Eno's Diary",
  url: "https://www.faber.co.uk/product/9780571374625-a-year-with-swollen-appendices/",
  publisher: "Faber",
  publishedAt: "1996",
  authors: ["Brian Eno"],
  notes:
    "Publisher's page for the 1995 diary and essay collection, first published 1996; this page is the 25th-anniversary edition.",
});
const faberWhatArt = source({
  binding: "first_person",
  mediaType: "book",
  title: "What Art Does: An Unfinished Theory",
  url: "https://www.faber.co.uk/product/9780571395514-what-art-does-an-unfinished-theory/",
  publisher: "Faber",
  publishedAt: "2025-01-16",
  authors: ["Brian Eno", "Bette Adriaanse"],
});
const longNowEssay = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Big Here and Long Now",
  url: "https://longnow.org/ideas/the-big-here-and-long-now/",
  publisher: "The Long Now Foundation",
  publishedAt: "2000-05",
  authors: ["Brian Eno"],
  notes:
    "Eno's essay coining and defining 'the Long Now'; circulated in earlier forms from the mid-1990s.",
});
const inMotion = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Generative Music",
  url: "https://www.inmotionmagazine.com/eno1.html",
  publisher: "In Motion Magazine",
  publishedAt: "1996",
  authors: ["Brian Eno"],
  notes:
    "Transcript of Eno's talk at the Imagination Conference, San Francisco, June 8, 1996 — his fullest early statement on generative music.",
});

// --- Interviews ---
const wired95 = source({
  binding: "interview",
  mediaType: "article",
  title: "Gossip is Philosophy",
  url: "https://www.wired.com/1995/05/eno-2/",
  publisher: "Wired",
  publishedAt: "1995-05-01",
  authors: ["Kevin Kelly"],
});
const sfgate96 = source({
  binding: "interview",
  mediaType: "article",
  title: "Q and A With Brian Eno",
  url: "https://www.sfgate.com/music/popquiz/article/q-and-a-with-brian-eno-2979740.php",
  publisher: "San Francisco Chronicle",
  publishedAt: "1996-06-02",
  authors: ["Joel Selvin"],
  notes: "Contains Eno's own account of composing the Windows 95 startup sound.",
});
const pitchfork09 = source({
  binding: "interview",
  mediaType: "article",
  title: "Brian Eno",
  url: "https://pitchfork.com/features/interview/7723-brian-eno/",
  publisher: "Pitchfork",
  publishedAt: "2009-11-01",
});
const pitchfork10 = source({
  binding: "interview",
  mediaType: "article",
  title: "Brian Eno",
  url: "https://pitchfork.com/features/interview/7875-brian-eno/",
  publisher: "Pitchfork",
  publishedAt: "2010-10-31",
  authors: ["Mark Richardson"],
});
const pitchforkUF = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Brian Eno and Daniel Lanois Remember the Making of U2's Unforgettable Fire",
  url: "https://pitchfork.com/news/36883-brian-eno-and-daniel-lanois-remember-the-making-of-u2s-unforgettable-fire/",
  publisher: "Pitchfork",
  publishedAt: "2009",
});
const pitchforkAmbient = source({
  binding: "interview",
  mediaType: "article",
  title: "A Conversation With Brian Eno About Ambient Music",
  url: "https://pitchfork.com/features/interview/10023-a-conversation-with-brian-eno-about-ambient-music/",
  publisher: "Pitchfork",
  publishedAt: "2017-02-16",
  authors: ["Philip Sherburne"],
});
const guardianMorley = source({
  binding: "interview",
  mediaType: "article",
  title:
    "On gospel, Abba and the death of the record: an audience with Brian Eno",
  url: "https://www.theguardian.com/music/2010/jan/17/brian-eno-interview-paul-morley",
  publisher: "The Guardian",
  publishedAt: "2010-01-17",
  authors: ["Paul Morley"],
});
const guardian22 = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Brian Eno: 'Sex, drugs, art… they're all ways of surrendering'",
  url: "https://www.theguardian.com/lifeandstyle/2022/nov/05/brian-eno-sex-drugs-art-theyre-all-ways-of-surrendering-",
  publisher: "The Guardian",
  publishedAt: "2022-11-05",
});
const wired22 = source({
  binding: "interview",
  mediaType: "article",
  title: "Brian Eno on Why He Wrote a Climate Album With Deepfake Birdsongs",
  url: "https://www.wired.com/story/brian-eno-q-and-a/",
  publisher: "Wired",
  publishedAt: "2022-10-14",
});
const nyt22 = source({
  binding: "interview",
  mediaType: "article",
  title: "Brian Eno Reveals the Hidden Purpose of All Art",
  url: "https://www.nytimes.com/interactive/2022/11/14/magazine/brian-eno-interview.html",
  publisher: "The New York Times",
  publishedAt: "2022-11-14",
  authors: ["David Marchese"],
});
const rbma = source({
  binding: "interview",
  mediaType: "webpage",
  title: "Brian Eno — Academy: New York 2013",
  url: "https://www.redbullmusicacademy.com/lectures/brian-eno/",
  publisher: "Red Bull Music Academy",
  publishedAt: "2013",
  notes: "Catalog page for the 2013 RBMA lecture hosted by Emma Warren.",
});
const rbmaVideo = source({
  binding: "interview",
  mediaType: "video",
  title: "Brian Eno on Exploring Creativity",
  url: "https://www.youtube.com/watch?v=JUL8kNYmgsA",
  publisher: "Red Bull Music Academy",
  publishedAt: "2013",
});

// --- Primary records ---
const longNowBoard = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Clock and Library Projects",
  url: "https://longnow.org/ideas/the-clock-and-library-projects/",
  publisher: "The Long Now Foundation",
  notes:
    "Foundation record naming the 1996 founding board (including Eno) and crediting him with proposing 'the long now'.",
});
const longNowPeople = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Brian Eno — Long Now People",
  url: "https://longnow.org/people/prospect4/",
  publisher: "The Long Now Foundation",
  notes: "Lists Eno as cofounder and member of the board of directors.",
});
const vamOblique = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Oblique Strategies — Schmidt, Peter; Eno, Brian",
  url: "https://collections.vam.ac.uk/item/O189938/oblique-strategies-card-eno-brian/",
  publisher: "V&A Explore the Collections",
  notes: "Museum record for a 1979 Eno/Schmidt card deck.",
});
const rockhall = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Roxy Music — Inductees",
  url: "https://rockhall.com/inductees/roxy-music/",
  publisher: "Rock & Roll Hall of Fame",
  notes: "Official inductee page for the class of 2019.",
});
const umcLuminal = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Brian Eno + Beatie Wolfe share collaborative albums Luminal & Lateral out now",
  url: "https://www.universalmusic.ca/press-releases/brian-eno-beatie-wolfe-share-collaborative-albums-luminal-lateral-out-now/",
  publisher: "Universal Music Canada",
  publishedAt: "2025-06-06",
  notes: "Label press release with tracklists for the June 6, 2025 releases.",
});

// --- Reporting ---
const kkScenius = source({
  binding: "reporting",
  mediaType: "article",
  title: "Scenius, or Communal Genius",
  url: "https://kk.org/thetechnium/scenius-or-comm/",
  publisher: "kk.org (Kevin Kelly)",
  publishedAt: "2008",
  authors: ["Kevin Kelly"],
  notes:
    "The text that carried Eno's coinage 'scenius' into wide circulation, quoting his definition.",
});
const rsRemain = source({
  binding: "reporting",
  mediaType: "article",
  title: "Talking Heads: Inside Making of 'Remain in Light'",
  url: "https://www.rollingstone.com/music/music-features/500-greatest-albums-talking-heads-remain-in-light-1059453/",
  publisher: "Rolling Stone",
  publishedAt: "2020",
});
const coldplayViva = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Viva La Vida biography",
  url: "https://www.coldplay.com/viva-la-vida-biography/",
  publisher: "coldplay.com",
  notes:
    "The band's own account of the album's two producers, Brian Eno and Markus Dravs.",
});
const mixmagEarth = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Brian Eno launches EarthPercent, a climate change initiative for the music industry",
  url: "https://mixmag.net/read/brian-eno-launches-earthpercent-news",
  publisher: "Mixmag",
  publishedAt: "2021",
});
const hustwitEno = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Eno — a film by Gary Hustwit",
  url: "https://www.hustwit.com/eno",
  publisher: "Gary Hustwit",
  notes:
    "Filmmaker's page describing the generative documentary premiered at Sundance 2024.",
});
const twentyK = source({
  binding: "reporting",
  mediaType: "audio",
  title: "Ta-da! The history of Windows' classic startup sounds",
  url: "https://www.20k.org/episodes/tadaitswindows",
  publisher: "Twenty Thousand Hertz",
  notes:
    "Includes the BBC 'Museum of Curiosity' clip in which Eno says he wrote the sound on a Mac and had 'never used a PC'.",
});
const spinRbma = source({
  binding: "reporting",
  mediaType: "article",
  title: "Brian Eno Has a Very Big Brain",
  url: "https://www.spinmagazine.com/2013/05/brian-eno-red-bull-academy-nyc-talk/",
  publisher: "SPIN",
  publishedAt: "2013-05-03",
  authors: ["David Marchese"],
});
const sundanceEno = source({
  binding: "reporting",
  mediaType: "article",
  title: "'Eno' Proves That There Is Never One Truth About Anyone",
  url: "https://www.sundance.org/blogs/eno-proves-that-there-is-never-one-truth-about-anyone/",
  publisher: "Sundance Institute",
  publishedAt: "2024-01-28",
  authors: ["Bailey Pennick"],
});
const techcrunch = source({
  binding: "reporting",
  mediaType: "article",
  title: "Revisiting Brian Eno's 'The Studio as a Compositional Tool'",
  url: "https://techcrunch.com/2016/03/28/revisiting-brian-enos-the-studio-as-a-compositional-tool/",
  publisher: "TechCrunch",
  publishedAt: "2016-03-28",
  notes:
    "Retrospective on the 1979 New Music America lecture about the studio as an instrument.",
});
const rsFerry = source({
  binding: "reporting",
  mediaType: "article",
  title: "Read Bryan Ferry's Roxy Music Rock and Roll Hall of Fame Speech",
  url: "https://www.rollingstone.com/music/music-news/bryan-ferry-rock-hall-of-fame-speech-roxy-music-814722/",
  publisher: "Rolling Stone",
  publishedAt: "2019-03-29",
  authors: ["Andy Greene"],
  notes: "Reports that Eno did not attend the 2019 induction ceremony.",
});
const synthtopia = source({
  binding: "reporting",
  mediaType: "article",
  title: "Brian Eno On Genius, And 'Scenius'",
  url: "https://www.synthtopia.com/content/2009/07/09/brian-eno-on-genius-and-scenius/",
  publisher: "Synthtopia",
  publishedAt: "2009-07-09",
  notes:
    "Reports Eno's scenius comments from his 2009 Luminous Festival talk in Sydney.",
});

// --- Reference ---
const wikiEno = source({
  binding: "reference",
  mediaType: "article",
  title: "Brian Eno",
  url: "https://en.wikipedia.org/wiki/Brian_Eno",
  publisher: "Wikipedia",
  notes: "Used for discovery and dates; cross-checked against interviews and records.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Brian Eno (Q569003)",
  url: "https://www.wikidata.org/wiki/Q569003",
  publisher: "Wikidata",
});
const wikiSwollen = source({
  binding: "reference",
  mediaType: "article",
  title: "A Year with Swollen Appendices",
  url: "https://en.wikipedia.org/wiki/A_Year_with_Swollen_Appendices",
  publisher: "Wikipedia",
});
const wikiAmbient1 = source({
  binding: "reference",
  mediaType: "article",
  title: "Ambient 1: Music for Airports",
  url: "https://en.wikipedia.org/wiki/Ambient_1:_Music_for_Airports",
  publisher: "Wikipedia",
});
const wikiOblique = source({
  binding: "reference",
  mediaType: "article",
  title: "Oblique Strategies",
  url: "https://en.wikipedia.org/wiki/Oblique_Strategies",
  publisher: "Wikipedia",
});
const wikiLateral = source({
  binding: "reference",
  mediaType: "article",
  title: "Lateral (album)",
  url: "https://en.wikipedia.org/wiki/Lateral_(album)",
  publisher: "Wikipedia",
  notes:
    "Documents the 2025 Eno–Beatie Wolfe album trilogy (Luminal, Lateral, Liminal).",
});

// --- Archive (rehosted interviews and texts) ---
const mdtsUncut = source({
  binding: "archive",
  mediaType: "article",
  title: "Eno: The Man Who",
  url: "https://moredarkthanshark.org/eno_int_uncut-aug01.html",
  publisher: "Uncut / More Dark Than Shark",
  publishedAt: "2001-08",
  authors: ["Paul Morley"],
  notes: "Archived copy of the August 2001 Uncut interview.",
});
const mdtsWired96 = source({
  binding: "archive",
  mediaType: "article",
  title: "Interview with Brian Eno",
  url: "https://www.moredarkthanshark.org/eno_int_wired-jul96.html",
  publisher: "Wired / More Dark Than Shark",
  publishedAt: "1996-07",
  authors: ["John Alderman"],
  notes:
    "Archived copy of the July 1996 Wired Q&A with Eno's seed-and-rules account of generative music.",
});
const mdtsLanois = source({
  binding: "archive",
  mediaType: "article",
  title: "Daniel Lanois track-by-track interview",
  url: "https://moredarkthanshark.org/eno_int_rs-sep16b.html",
  publisher: "Rolling Stone / More Dark Than Shark",
  publishedAt: "2016-09",
  notes:
    "Archived copy of a September 2016 Rolling Stone piece in which Lanois recounts work on U2's The Joshua Tree and Achtung Baby.",
});
const hyperrealMFA = source({
  binding: "archive",
  mediaType: "transcript",
  title: "Ambient Music — Music for Airports liner notes",
  url: "http://music.hyperreal.org/artists/brian_eno/MFA-txt.html",
  publisher: "Hyperreal / EnoWeb",
  publishedAt: "1978-09",
  authors: ["Brian Eno"],
  notes:
    "Rehost of Eno's September 1978 Ambient 1 liner-note essay defining ambient music.",
});
const enowebKeyboard = source({
  binding: "archive",
  mediaType: "article",
  title: "Eno — Keyboard interview",
  url: "http://www.enoweb.co.uk/interviews/keyb81.html",
  publisher: "Keyboard / EnoWeb",
  publishedAt: "1981",
  authors: ["Jim Aikin"],
  notes:
    "Archived copy of the July 1981 Keyboard interview (reprinted in Keyboard Wizards, Winter 1985).",
});

const S = {
  enoAbout: enoAbout.id,
  genMusic: genMusic.id,
  genMusicBloom: genMusicBloom.id,
  faberDiary: faberDiary.id,
  faberWhatArt: faberWhatArt.id,
  longNowEssay: longNowEssay.id,
  inMotion: inMotion.id,
  wired95: wired95.id,
  sfgate96: sfgate96.id,
  pitchfork09: pitchfork09.id,
  pitchfork10: pitchfork10.id,
  pitchforkUF: pitchforkUF.id,
  pitchforkAmbient: pitchforkAmbient.id,
  guardianMorley: guardianMorley.id,
  guardian22: guardian22.id,
  wired22: wired22.id,
  nyt22: nyt22.id,
  rbma: rbma.id,
  rbmaVideo: rbmaVideo.id,
  longNowBoard: longNowBoard.id,
  longNowPeople: longNowPeople.id,
  vamOblique: vamOblique.id,
  rockhall: rockhall.id,
  umcLuminal: umcLuminal.id,
  kkScenius: kkScenius.id,
  rsRemain: rsRemain.id,
  coldplayViva: coldplayViva.id,
  mixmagEarth: mixmagEarth.id,
  hustwitEno: hustwitEno.id,
  twentyK: twentyK.id,
  spinRbma: spinRbma.id,
  sundanceEno: sundanceEno.id,
  techcrunch: techcrunch.id,
  rsFerry: rsFerry.id,
  synthtopia: synthtopia.id,
  wikiEno: wikiEno.id,
  wikidata: wikidata.id,
  wikiSwollen: wikiSwollen.id,
  wikiAmbient1: wikiAmbient1.id,
  wikiOblique: wikiOblique.id,
  wikiLateral: wikiLateral.id,
  mdtsUncut: mdtsUncut.id,
  mdtsWired96: mdtsWired96.id,
  mdtsLanois: mdtsLanois.id,
  hyperrealMFA: hyperrealMFA.id,
  enowebKeyboard: enowebKeyboard.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-brian-eno",
  generatedAt: "2026-09-17T03:30:00Z",
  subject: {
    kind: "person",
    handle: "brian-eno",
    displayName: "Brian Eno",
    alsoKnownAs: [
      "Eno",
      "Brian Peter George Eno",
      "Brian Peter George St. John le Baptiste de la Salle Eno",
    ],
    summary:
      "English musician, producer, artist and thinker: founding synthesizer player of Roxy Music, coiner of 'ambient music', co-author of the Oblique Strategies cards, originator of the 'scenius' idea, producer for Talking Heads, U2 and Coldplay, generative-music pioneer, and a founding board member of the Long Now Foundation.",
    identity: {
      wikidataId: "Q569003",
      officialSite: "https://www.brian-eno.net/",
      wikipedia: "https://en.wikipedia.org/wiki/Brian_Eno",
      profiles: [
        "https://www.facebook.com/BrianEno/",
        "https://www.instagram.com/brianeno/",
        "https://www.youtube.com/@BrianEnoOfficial",
        "https://www.tiktok.com/@brianeno",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:00:00Z",
    coverage: ["biography", "work", "philosophy", "beliefs", "projects", "media"],
  },
  sources: [
    enoAbout,
    genMusic,
    genMusicBloom,
    faberDiary,
    faberWhatArt,
    longNowEssay,
    inMotion,
    wired95,
    sfgate96,
    pitchfork09,
    pitchfork10,
    pitchforkUF,
    pitchforkAmbient,
    guardianMorley,
    guardian22,
    wired22,
    nyt22,
    rbma,
    rbmaVideo,
    longNowBoard,
    longNowPeople,
    vamOblique,
    rockhall,
    umcLuminal,
    kkScenius,
    rsRemain,
    coldplayViva,
    mixmagEarth,
    hustwitEno,
    twentyK,
    spinRbma,
    sundanceEno,
    techcrunch,
    rsFerry,
    synthtopia,
    wikiEno,
    wikidata,
    wikiSwollen,
    wikiAmbient1,
    wikiOblique,
    wikiLateral,
    mdtsUncut,
    mdtsWired96,
    mdtsLanois,
    hyperrealMFA,
    enowebKeyboard,
  ],
  claims: [
    {
      id: "claim-born-1948",
      kind: "fact",
      text: "He was born Brian Peter George Eno on 15 May 1948 in Melton, Suffolk, England; he later styled the extended name 'St. John le Baptiste de la Salle Eno'.",
      sourceIds: [S.wikiEno, S.wikidata],
    },
    {
      id: "claim-art-school",
      kind: "fact",
      text: "He studied painting and experimental music at Ipswich Civic College's art school in the mid-1960s — where a deliberately destabilizing curriculum and access to tape recorders shaped his approach — then at Winchester School of Art, graduating in 1969.",
      sourceIds: [S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "claim-roxy-music",
      kind: "fact",
      text: "He was a founding member of Roxy Music in 1971 — initially mixing the band's sound from the back of the hall, then onstage in lipstick, mascara and ostrich plumes playing synthesizer — and left in 1973 after two albums, Roxy Music (1972) and For Your Pleasure (1973).",
      sourceIds: [S.enowebKeyboard, S.guardianMorley, S.wikiEno],
    },
    {
      id: "claim-solo-pop-run",
      kind: "fact",
      text: "He then made four solo vocal albums — Here Come the Warm Jets and Taking Tiger Mountain (By Strategy) (both 1974), Another Green World (1975) and Before and After Science (1977) — before concentrating on instrumental music.",
      sourceIds: [S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "claim-frippertronics",
      kind: "fact",
      text: "With Robert Fripp he developed extended tape-loop pieces released as (No Pussyfooting) (1973) — the start of the delay-system work later called Frippertronics.",
      sourceIds: [S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "claim-discreet-origin",
      kind: "fact",
      text: "Discreet Music (1975) followed his January 1975 convalescence after being hit by a car: hearing a harp record playing at near-inaudible volume through one broken speaker suggested music that could merge with the environment — the germ of ambient.",
      sourceIds: [S.wikiEno, S.spinRbma],
    },
    {
      id: "claim-ambient-coinage",
      kind: "fact",
      text: "On Ambient 1: Music for Airports he began using the term 'Ambient Music' for his own work, defining it in the September 1978 liner notes as music that 'must be able to accommodate many levels of listening attention without enforcing one in particular; it must be as ignorable as it is interesting.'",
      sourceIds: [S.hyperrealMFA, S.wikiAmbient1],
    },
    {
      id: "claim-oblique-1975",
      kind: "fact",
      text: "Oblique Strategies ('Over One Hundred Worthwhile Dilemmas'), the card deck of lateral prompts he co-created with painter Peter Schmidt, was first published in 1975 and has been reissued in further editions since.",
      sourceIds: [S.wikiOblique, S.vamOblique],
    },
    {
      id: "claim-no-wave-1978",
      kind: "fact",
      text: "In 1978 he produced the no-wave compilation No New York (documenting DNA, Teenage Jesus and the Jerks, Mars and the Contortions) and Devo's debut album Q: Are We Not Men? A: We Are Devo!",
      sourceIds: [S.wikiEno],
    },
    {
      id: "claim-bowie-berlin",
      kind: "fact",
      text: "He collaborated with David Bowie on the 'Berlin trilogy' — Low and 'Heroes' (1977) and Lodger (1979) — records produced by Tony Visconti on which Eno's role mixed co-writing, synthesis and studio treatments.",
      sourceIds: [S.guardianMorley, S.wikiEno],
    },
    {
      id: "claim-talking-heads",
      kind: "fact",
      text: "He produced three consecutive Talking Heads albums — More Songs About Buildings and Food (1978), Fear of Music (1979) and Remain in Light (1980), the last assembled from looped jams at Compass Point Studios in the Bahamas.",
      sourceIds: [S.rsRemain, S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "claim-bush-of-ghosts",
      kind: "fact",
      text: "My Life in the Bush of Ghosts (1981), his album with David Byrne, built tracks around 'found voices' — radio preachers, callers and singers — and is treated as an early landmark of sampling practice.",
      sourceIds: [S.rsRemain, S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "claim-u2-production",
      kind: "fact",
      text: "With Daniel Lanois he produced U2's The Unforgettable Fire (1984), beginning a production relationship that ran through The Joshua Tree (1987), Achtung Baby (1991, recorded partly at Hansa in Berlin), Zooropa (1993) and later records; Paul Morley calls him U2's 'fifth man'.",
      sourceIds: [S.pitchforkUF, S.mdtsLanois, S.guardianMorley, S.wikiEno],
    },
    {
      id: "claim-microsoft-sound",
      kind: "fact",
      text: "He composed 'The Microsoft Sound', the brief startup music for Windows 95 (1995): the agency brief demanded an 'inspiring, universal… optimistic, futuristic, sentimental, emotional' piece '3 1/4 seconds long', and he says he made 84 tiny pieces in reply — written on a Mac, having 'never used a PC'.",
      sourceIds: [S.sfgate96, S.twentyK],
    },
    {
      id: "claim-swollen-appendices",
      kind: "fact",
      text: "His 1995 diary A Year with Swollen Appendices (Faber, 1996) documents a year spent on Bowie's Outside, U2's Passengers album, the War Child Help album, Spinner with Jah Wobble and work with James, alongside essays dating back to 1978.",
      sourceIds: [S.faberDiary, S.wikiSwollen],
    },
    {
      id: "claim-generative-music-1",
      kind: "fact",
      text: "In 1996 he released Generative Music 1, a floppy-disk title built with SSEYO's Koan Pro software — the same year he presented his 'Generative Music' talk at San Francisco's Imagination Conference.",
      sourceIds: [S.wikiSwollen, S.sfgate96, S.inMotion],
    },
    {
      id: "claim-long-now",
      kind: "fact",
      text: "He is a cofounder of the Long Now Foundation — incorporated by Stewart Brand in 1996 with a founding board including Eno — and he proposed 'the long now' as the name for what the institution promotes.",
      sourceIds: [S.longNowBoard, S.longNowPeople],
    },
    {
      id: "claim-77-million",
      kind: "fact",
      text: "77 Million Paintings (2006) is his generative audio-visual installation: slowly morphing light works paired with ambient sound, exhibited worldwide and credited in press coverage with inspiring medical uses of his quiet music.",
      sourceIds: [S.spinRbma, S.wikiEno],
    },
    {
      id: "claim-bloom-apps",
      kind: "fact",
      text: "With musician and software designer Peter Chilvers he released the generative iPhone app Bloom in October 2008 — 'an endless music machine' — followed by Trope (2009), Scape (2012) and the app edition of Reflection (2017).",
      sourceIds: [S.genMusicBloom, S.genMusic, S.pitchforkAmbient],
    },
    {
      id: "claim-coldplay-viva",
      kind: "fact",
      text: "He co-produced Coldplay's Viva la Vida or Death and All His Friends (2008) with Markus Dravs; drummer Will Champion says Eno 'completely disrupted the formula' of how the band worked.",
      sourceIds: [S.coldplayViva, S.wikiEno],
    },
    {
      id: "claim-rockhall-2019",
      kind: "fact",
      text: "Roxy Music were inducted into the Rock & Roll Hall of Fame in March 2019; Eno was inducted as a member but did not attend the ceremony.",
      sourceIds: [S.rockhall, S.rsFerry],
    },
    {
      id: "claim-earthpercent",
      kind: "fact",
      text: "He co-founded EarthPercent, launched publicly in 2021, a charity that asks artists and music-industry companies to pledge a percentage of income for climate organizations, holding 'the planet as a stakeholder'.",
      sourceIds: [S.mixmagEarth, S.wired22],
    },
    {
      id: "claim-foreverandevernomore",
      kind: "fact",
      text: "FOREVERANDEVERNOMORE (2022) was his first solo album built around his own singing in about 17 years, framed around the climate emergency and featuring synthesized 'deepfake' birdsong alongside recordings of threatened species.",
      sourceIds: [S.wired22, S.guardian22],
    },
    {
      id: "claim-eno-film",
      kind: "fact",
      text: "Eno, directed by Gary Hustwit with creative technologist Brendan Dawes, premiered at the Sundance Film Festival in January 2024 — a generative documentary that assembles a different cut from hundreds of hours of archive footage at each screening.",
      sourceIds: [S.hustwitEno, S.sundanceEno, S.enoAbout],
    },
    {
      id: "claim-wolfe-trilogy",
      kind: "fact",
      text: "In 2025 he and Beatie Wolfe released the collaborative albums Luminal and Lateral (June 6, on Verve) — 'dream music' and 'space music' respectively — followed by a third album, Liminal, later that year.",
      sourceIds: [S.umcLuminal, S.wikiLateral],
    },
    {
      id: "claim-what-art-does",
      kind: "fact",
      text: "What Art Does: An Unfinished Theory (Faber, January 2025), written with artist Bette Adriaanse, is his illustrated book arguing that art creates communities, opens worlds and transforms the people who make it.",
      sourceIds: [S.faberWhatArt],
    },
    {
      id: "claim-non-musician",
      kind: "fact",
      text: "He describes himself as a 'non-musician' — untrained on instruments — a self-label the press has amplified since the 1970s to frame his studio-and-systems way of working.",
      sourceIds: [S.wikiEno, S.pitchforkAmbient, S.enowebKeyboard],
    },
    {
      id: "claim-honorary-posts",
      kind: "fact",
      text: "By 1995 he had been named an Honorary Doctor of Technology at the University of Plymouth and a Visiting Professor at the Royal College of Art in London.",
      sourceIds: [S.wired95],
    },
    {
      id: "claim-activism-roles",
      kind: "fact",
      text: "His own bio and the Long Now people page describe involvement with the Stop the War coalition, co-founding the charities EarthPercent and HardArt, and roles with ClientEarth and BASIC (the British American Security Information Council).",
      sourceIds: [S.enoAbout, S.longNowPeople],
    },
    {
      id: "claim-ambient-must-enhance",
      kind: "stated_belief",
      text: "Ambient music, per his 1978 essay, should enhance a place rather than blanket it — retaining 'doubt and uncertainty' where Muzak strips them out, inducing 'calm and a space to think' while staying 'as ignorable as it is interesting.'",
      sourceIds: [S.hyperrealMFA],
    },
    {
      id: "claim-gardening-not-architecture",
      kind: "stated_belief",
      text: "A generative composer works 'at another level of recursion': instead of specifying an organism molecule by molecule, you write the genetic code — 'I'm building the seed, planting it in the computer and letting it grow.'",
      sourceIds: [S.mdtsWired96, S.inMotion],
    },
    {
      id: "claim-scenius",
      kind: "stated_belief",
      text: "He argues cultural change comes from fertile scenes rather than lone geniuses — 'scenius' is 'the intelligence and the intuition of a whole cultural scene… the communal form of the concept of the genius.'",
      sourceIds: [S.kkScenius, S.synthtopia],
    },
    {
      id: "claim-studio-as-tool",
      kind: "stated_belief",
      text: "The recording studio is itself a compositional tool: tape 'takes music out of time and puts it into space', letting the composer work empirically — cut, squeeze, reverse, collage — instead of only imagining sound.",
      sourceIds: [S.enowebKeyboard, S.techcrunch],
    },
    {
      id: "claim-constraint-liberates",
      kind: "stated_belief",
      text: "He treats tight constraints as liberating: the tiny Microsoft brief arrived when he was 'completely bereft of ideas', and solving it made three-minute songs feel like 'oceans of time'.",
      sourceIds: [S.sfgate96],
    },
    {
      id: "claim-surrender",
      kind: "stated_belief",
      text: "'Sex, drugs, art… they're all ways of surrendering, of allowing our identities to lose their hard edges and merge with something else' — a thread he traces from gospel music to climate activism.",
      sourceIds: [S.guardian22],
    },
    {
      id: "claim-maker-vs-listener",
      kind: "stated_belief",
      text: "He insists makers overstuff their work — 'as a maker, you tend to do too much… as a listener, you're happy with quite a lot less' — which is why he listens to pieces at half speed and treats restraint as discipline.",
      sourceIds: [S.pitchforkAmbient],
    },
    {
      id: "claim-long-now-belief",
      kind: "stated_belief",
      text: "'Now is never just a moment': he holds that stretching the present to include deep past and far future — the Long Now — is an ethical counterweight to institutions geared to the 'Short Now'.",
      sourceIds: [S.longNowEssay],
    },
    {
      id: "claim-gossip-philosophy",
      kind: "stated_belief",
      text: "In the 1995 Wired interview he argued that public fascination with celebrity trials is society reasoning through moral relationships — 'gossip is philosophy'.",
      sourceIds: [S.wired95],
    },
    {
      id: "claim-ideas-not-biography",
      kind: "stated_belief",
      text: "He refuses autobiographical talk in interviews — 'of all the things I want to talk about in the morning, me is not one of them… Ideas are different, they're always changing.'",
      sourceIds: [S.mdtsUncut],
    },
    {
      id: "claim-formats-as-listening",
      kind: "stated_belief",
      text: "He treats every format as a different way of listening — vinyl's 20-minute chunks, CD shuffle, infinite downloads — and the album itself as 'macro-composition': a designed unfolding of time.",
      sourceIds: [S.pitchfork10],
    },
    {
      id: "claim-hope-movement",
      kind: "stated_belief",
      text: "On climate he locates hope in what he calls 'the biggest social movement in human history' — billions of people doing environmental care while 'the media aren't looking'.",
      sourceIds: [S.wired22, S.guardian22],
    },
    {
      id: "claim-catalyst-producer",
      kind: "pattern",
      text: "Across bands his production role is described as process disruption rather than sonics: Coldplay say he 'completely disrupted the formula'; Talking Heads' Remain in Light cohered under his 'stewardship'; Morley dubs him U2's 'fifth man'.",
      sourceIds: [S.coldplayViva, S.rsRemain, S.guardianMorley],
    },
    {
      id: "claim-medium-migration",
      kind: "pattern",
      text: "The same generative idea keeps migrating to whatever medium is newest: tape loops in the 1970s, Koan software in 1996, iOS apps from 2008, and a generative documentary film in 2024.",
      sourceIds: [S.inMotion, S.sfgate96, S.genMusic, S.sundanceEno],
    },
    {
      id: "claim-self-as-system",
      kind: "pattern",
      text: "He narrates his own career in the same terms he uses for culture at large — systems, scenes and surrender: the offstage mixer in Roxy Music, the 'non-musician' producer, the coiner of 'scenius'.",
      sourceIds: [S.enowebKeyboard, S.kkScenius, S.pitchforkAmbient],
    },
    {
      id: "claim-mixed-feelings",
      kind: "pattern",
      text: "He says pieces earn their titles only once he identifies their 'mixed emotion' — placid-yet-dangerous blends recur from Discreet Music to the climate record, where he wrote of 'regret mixed with joy'.",
      sourceIds: [S.pitchfork10, S.wired22],
    },
    {
      id: "claim-ambient-paternity",
      kind: "speculation",
      text: "Whether he 'invented' ambient music or named a listening mode: his own essay credits Muzak Inc. with pioneering environmental music, and the genre has since sprawled far past his definition — single-inventor credit is his framing, adopted by press.",
      sourceIds: [S.hyperrealMFA, S.wikiAmbient1, S.guardianMorley],
    },
    {
      id: "claim-bowie-role-fuzzy",
      kind: "speculation",
      text: "His precise credit on the Bowie 'Berlin' records stays fuzzy — collaborator, co-writer and occasional co-producer are all used; Tony Visconti held the producer chair, and accounts differ on how much of the sound is Eno's.",
      sourceIds: [S.guardianMorley, S.wikiEno],
    },
    {
      id: "claim-microsoft-numbers",
      kind: "speculation",
      text: "The Microsoft Sound numbers drift in his own retellings: the brief was '3 1/4 seconds' in 1996 but 'not more than 3.8 seconds' on BBC radio in 2009, and the piece count is 84 in one account, 83 in the other.",
      sourceIds: [S.sfgate96, S.twentyK],
    },
    {
      id: "claim-rockhall-absence",
      kind: "speculation",
      text: "Skipping the 2019 Rock Hall induction fits decades of anti-nostalgia talk — he left rock stardom in 1973 and rarely looks back — but he has not explained the absence publicly.",
      sourceIds: [S.rsFerry, S.enowebKeyboard],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1948-05-15",
      title: "Born in Melton, Suffolk",
      summary:
        "Brian Peter George Eno; he later adopted the extended name 'St. John le Baptiste de la Salle Eno'.",
      location: "Melton, Suffolk, England",
      sourceIds: [S.wikiEno, S.wikidata],
    },
    {
      id: "event-art-school",
      kind: "education",
      date: "1964",
      end: "1969",
      title: "Art school: Ipswich Civic College, then Winchester School of Art",
      summary:
        "Studied painting and experimental music; Ipswich's deliberately rule-breaking curriculum and its tape recorders were, he says, the cornerstone of everything after.",
      sourceIds: [S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "event-roxy-music",
      kind: "role",
      date: "1971",
      end: "1973",
      title: "Roxy Music",
      summary:
        "Founding member — first as offstage mixer, then as feather-boa'd synthesizer player on Roxy Music (1972) and For Your Pleasure (1973).",
      organization: "Roxy Music",
      sourceIds: [S.enowebKeyboard, S.guardianMorley, S.wikiEno],
    },
    {
      id: "event-no-pussyfooting",
      kind: "publication",
      date: "1973",
      title: "(No Pussyfooting) with Robert Fripp",
      summary:
        "Tape-loop duets with the King Crimson guitarist — the seed of the Frippertronics delay system.",
      sourceIds: [S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "event-warm-jets",
      kind: "publication",
      date: "1974-01",
      title: "Here Come the Warm Jets",
      summary:
        "First solo album, the start of a four-record run of skewed pop ending with Before and After Science (1977).",
      sourceIds: [S.enowebKeyboard, S.wikiEno],
    },
    {
      id: "event-oblique",
      kind: "project",
      date: "1975",
      title: "Oblique Strategies first published",
      summary:
        "The card deck of worthwhile dilemmas co-created with Peter Schmidt — a tool for breaking studio deadlock by lateral prompt.",
      sourceIds: [S.wikiOblique, S.vamOblique],
    },
    {
      id: "event-discreet-music",
      kind: "publication",
      date: "1975",
      title: "Discreet Music",
      summary:
        "Quiet, extended instrumentals conceived after a bedridden January; the record that opened his ambient line.",
      sourceIds: [S.wikiEno, S.spinRbma],
    },
    {
      id: "event-another-green-world",
      kind: "publication",
      date: "1975-09",
      title: "Another Green World",
      summary:
        "The bridge between his song records and instrumental work — treated, rhythm-first miniatures.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "event-berlin-trilogy",
      kind: "role",
      date: "1977",
      end: "1979",
      title: "Bowie's 'Berlin trilogy': Low, 'Heroes', Lodger",
      summary:
        "Collaborator on the three Bowie–Visconti records — co-writing, synthesis and treatments.",
      organization: "David Bowie / Tony Visconti",
      sourceIds: [S.guardianMorley, S.wikiEno],
    },
    {
      id: "event-talking-heads",
      kind: "role",
      date: "1978",
      end: "1980",
      title: "Produces three Talking Heads albums",
      summary:
        "More Songs About Buildings and Food, Fear of Music and Remain in Light — ending with the loop-built Compass Point sessions.",
      organization: "Talking Heads",
      sourceIds: [S.rsRemain, S.enowebKeyboard],
    },
    {
      id: "event-ambient-1",
      kind: "publication",
      date: "1978",
      title: "Ambient 1: Music for Airports",
      summary:
        "The record on which he began using 'Ambient Music' for his own work; the September 1978 liner notes carry the manifesto 'as ignorable as it is interesting'.",
      sourceIds: [S.hyperrealMFA, S.wikiAmbient1],
    },
    {
      id: "event-no-new-york",
      kind: "project",
      date: "1978",
      title: "Produces No New York and Devo's debut",
      summary:
        "The no-wave compilation plus Q: Are We Not Men? A: We Are Devo! — his producer-for-others era begins.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "event-studio-lecture",
      kind: "media",
      date: "1979",
      title: "'The Recording Studio as a Compositional Tool' lecture",
      summary:
        "Delivered at the first New Music America festival; the canonical statement of the studio-as-instrument idea.",
      location: "New York City",
      sourceIds: [S.techcrunch, S.enowebKeyboard],
    },
    {
      id: "event-bush-of-ghosts",
      kind: "publication",
      date: "1981",
      title: "My Life in the Bush of Ghosts with David Byrne",
      summary:
        "Found-voice sampling built into funk frameworks — recorded around the Remain in Light sessions.",
      sourceIds: [S.rsRemain, S.wikiEno],
    },
    {
      id: "event-apollo",
      kind: "publication",
      date: "1983",
      title: "Apollo: Atmospheres and Soundtracks",
      summary:
        "Ambient score for the Apollo-mission documentary For All Mankind, with Daniel Lanois and Roger Eno.",
      sourceIds: [S.mdtsLanois, S.wikiEno],
    },
    {
      id: "event-u2-era",
      kind: "role",
      date: "1984",
      end: "1993",
      title: "The U2 production era with Daniel Lanois",
      summary:
        "The Unforgettable Fire (1984), The Joshua Tree (1987), Achtung Baby (1991), Zooropa (1993) — and the Passengers album in 1995.",
      organization: "U2",
      sourceIds: [S.pitchforkUF, S.mdtsLanois, S.guardianMorley],
    },
    {
      id: "event-microsoft-sound",
      kind: "project",
      date: "1995",
      title: "The Microsoft Sound — Windows 95 startup music",
      summary:
        "A ~3-second commission he answered with dozens of micro-pieces, written on a Mac.",
      sourceIds: [S.sfgate96, S.twentyK],
    },
    {
      id: "event-swollen-appendices",
      kind: "publication",
      date: "1996",
      title: "A Year with Swollen Appendices",
      summary:
        "The 1995 diary plus essays, published by Faber — the fullest first-person record of his working life.",
      sourceIds: [S.faberDiary, S.wikiSwollen],
    },
    {
      id: "event-generative-music-1",
      kind: "project",
      date: "1996",
      title: "Generative Music 1 with SSEYO Koan software",
      summary:
        "Floppy-disk generative system; the same year he gave the 'Generative Music' talk at the Imagination Conference in San Francisco.",
      sourceIds: [S.wikiSwollen, S.inMotion, S.sfgate96],
    },
    {
      id: "event-long-now",
      kind: "founded",
      date: "1996",
      title: "Long Now Foundation founded",
      summary:
        "Eno on the founding board of Stewart Brand's clock-and-library institution; he proposed the name 'the long now'.",
      organization: "The Long Now Foundation",
      sourceIds: [S.longNowBoard, S.longNowPeople],
    },
    {
      id: "event-77-million",
      kind: "exhibition",
      date: "2006",
      title: "77 Million Paintings",
      summary:
        "Generative audio-visual installation of slowly morphing light works, shown worldwide.",
      sourceIds: [S.spinRbma, S.wikiEno],
    },
    {
      id: "event-viva-la-vida",
      kind: "publication",
      date: "2008-06",
      title: "Coldplay — Viva la Vida or Death and All His Friends",
      summary:
        "Co-produced with Markus Dravs; the band credit Eno with disrupting their formula.",
      organization: "Coldplay",
      sourceIds: [S.coldplayViva],
    },
    {
      id: "event-bloom",
      kind: "project",
      date: "2008-10",
      title: "Bloom app with Peter Chilvers",
      summary:
        "Generative music as an iPhone object — 'an endless music machine'; Trope, Scape and Reflection followed.",
      sourceIds: [S.genMusicBloom, S.genMusic],
    },
    {
      id: "event-rbma-lecture",
      kind: "media",
      date: "2013-05",
      title: "Red Bull Music Academy lecture, New York",
      summary:
        "An 80-plus-minute illustrated talk on four decades of methods — surrender, generative systems, why Discreet Music has soundtracked births.",
      organization: "Red Bull Music Academy",
      sourceIds: [S.rbma, S.rbmaVideo, S.spinRbma],
    },
    {
      id: "event-rockhall-2019",
      kind: "award",
      date: "2019-03-29",
      title: "Roxy Music enter the Rock & Roll Hall of Fame",
      summary:
        "Inducted as a member of the band; he did not attend the ceremony.",
      organization: "Rock & Roll Hall of Fame",
      sourceIds: [S.rockhall, S.rsFerry],
    },
    {
      id: "event-earthpercent",
      kind: "founded",
      date: "2021",
      title: "EarthPercent launched",
      summary:
        "The music-industry climate charity he co-founded asks companies and artists to pledge a percentage of income to environmental organizations.",
      organization: "EarthPercent",
      sourceIds: [S.mixmagEarth, S.wired22],
    },
    {
      id: "event-foreverandevernomore",
      kind: "publication",
      date: "2022-10-14",
      title: "FOREVERANDEVERNOMORE",
      summary:
        "His first vocals-led solo album in about 17 years — an emotional reckoning with the climate crisis.",
      sourceIds: [S.wired22, S.guardian22],
    },
    {
      id: "event-eno-film",
      kind: "media",
      date: "2024-01",
      title: "Eno premieres at Sundance",
      summary:
        "Gary Hustwit's generative documentary — a different cut assembled from his archive at every screening.",
      organization: "Sundance Film Festival",
      location: "Park City, Utah",
      sourceIds: [S.hustwitEno, S.sundanceEno],
    },
    {
      id: "event-what-art-does",
      kind: "publication",
      date: "2025-01-16",
      title: "What Art Does: An Unfinished Theory",
      summary:
        "Illustrated book with Bette Adriaanse on the function of art — community, feeling, transformation.",
      sourceIds: [S.faberWhatArt],
    },
    {
      id: "event-wolfe-albums",
      kind: "publication",
      date: "2025-06-06",
      title: "Luminal and Lateral with Beatie Wolfe",
      summary:
        "Two collaborative albums on Verve — 'dream music' and 'space music' — with a third, Liminal, following later in 2025.",
      sourceIds: [S.umcLuminal, S.wikiLateral],
    },
  ],
  themes: [
    {
      id: "theme-generative-systems",
      kind: "philosophy",
      status: "stated",
      title: "Systems over composition",
      summary:
        "Compose the rules, not the notes: set probabilistic conditions, plant the seed in the machine, then curate what grows. The posture is gardening, not architecture — from tape loops to Koan to apps to generative film.",
      sourceIds: [S.mdtsWired96, S.inMotion, S.pitchforkAmbient],
    },
    {
      id: "theme-ambient-mode",
      kind: "philosophy",
      status: "stated",
      title: "Ambient as a listening mode",
      summary:
        "Music as environment and tint — present but not demanding, 'as ignorable as it is interesting', enhancing a place's character instead of blanketing it.",
      sourceIds: [S.hyperrealMFA, S.wikiAmbient1, S.pitchforkAmbient],
    },
    {
      id: "theme-scenius",
      kind: "belief",
      status: "stated",
      title: "Scenius: the communal form of genius",
      summary:
        "Great work emerges from fertile scenes — artists, curators, collectors, fashionable thinkers forming an 'ecology of talent' — so he coined 'scenius' against the lone-genius story.",
      sourceIds: [S.kkScenius, S.synthtopia],
    },
    {
      id: "theme-studio-instrument",
      kind: "method",
      status: "stated",
      title: "The studio as a compositional tool",
      summary:
        "Recording turned music into a plastic medium you can cut, reverse and collage; his 1979 lecture made the studio itself the instrument, and his production work is that idea practiced on other bands.",
      sourceIds: [S.techcrunch, S.enowebKeyboard],
    },
    {
      id: "theme-constraint",
      kind: "method",
      status: "stated",
      title: "Constraints and oblique prompts",
      summary:
        "Deadlock is broken by rules, briefs and cards — Oblique Strategies, a 3¼-second brief, arbitrary studio instructions. Constraints are how he keeps himself and collaborators out of their comfort zones.",
      sourceIds: [S.wikiOblique, S.sfgate96, S.pitchfork10],
    },
    {
      id: "theme-surrender",
      kind: "belief",
      status: "stated",
      title: "Surrender over control",
      summary:
        "Sex, drugs, art and religion are 'all ways of surrendering'; much of his music and activism aims at that softened-ego state rather than mastery.",
      sourceIds: [S.guardian22, S.wired22],
    },
    {
      id: "theme-non-musician",
      kind: "practice",
      status: "reported",
      title: "The 'non-musician' as producer",
      summary:
        "Untrained on instruments, he works on music the way a director works on film — organizing other people's playing, treatments and systems. The press has made 'non-musician' his most durable label.",
      sourceIds: [S.wikiEno, S.pitchforkAmbient, S.guardianMorley],
    },
    {
      id: "theme-long-now",
      kind: "belief",
      status: "stated",
      title: "The Long Now",
      summary:
        "A stretched sense of 'now' — including deep past and far future — as an ethical counterweight to short-term institutions; he named and co-founded the foundation around it.",
      sourceIds: [S.longNowEssay, S.longNowBoard],
    },
    {
      id: "theme-medium-migration",
      kind: "practice",
      status: "inferred",
      title: "The generative idea follows new media",
      summary:
        "Index author's synthesis: the same seed-logic reappears on each new substrate — tape loops, screen savers, SSEYO Koan, iOS apps, a generative documentary — suggesting the medium is incidental to the method.",
      sourceIds: [S.inMotion, S.genMusic, S.sundanceEno],
    },
    {
      id: "theme-art-as-commons",
      kind: "belief",
      status: "stated",
      title: "Art as shared feeling and community",
      summary:
        "In What Art Does and the 2022 interviews he argues art is how communities rehearse feelings — 'feelings-merchants' — a function that connects his records, installations and climate work.",
      sourceIds: [S.faberWhatArt, S.nyt22, S.wired22],
    },
  ],
  works: [
    {
      id: "work-warm-jets",
      kind: "recording",
      status: "released",
      title: "Here Come the Warm Jets",
      date: "1974-01",
      summary: "Debut solo album of skewed, processed pop songs.",
      sourceIds: [S.wikiEno, S.enowebKeyboard],
    },
    {
      id: "work-tiger-mountain",
      kind: "recording",
      status: "released",
      title: "Taking Tiger Mountain (By Strategy)",
      date: "1974",
      summary: "Second solo album, loosely built around a Chinese-opera conceit.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-another-green-world",
      kind: "recording",
      status: "released",
      title: "Another Green World",
      date: "1975-09",
      summary:
        "The hinge record — instrumentals and songs built on treatments and rhythm.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-discreet-music",
      kind: "recording",
      status: "released",
      title: "Discreet Music",
      date: "1975",
      summary:
        "Extended quiet instrumentals; the practical beginning of the ambient line.",
      sourceIds: [S.wikiEno, S.spinRbma],
    },
    {
      id: "work-before-after-science",
      kind: "recording",
      status: "released",
      title: "Before and After Science",
      date: "1977",
      summary: "Fourth and last of the 1970s vocal solo albums.",
      sourceIds: [S.wikiEno, S.enowebKeyboard],
    },
    {
      id: "work-music-for-films",
      kind: "recording",
      status: "released",
      title: "Music for Films",
      date: "1978",
      summary: "Short cues composed for imaginary films.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-ambient-1",
      kind: "recording",
      status: "released",
      title: "Ambient 1: Music for Airports",
      date: "1978",
      summary:
        "The record whose liner notes launched 'ambient music' — loops and weightless layering for spaces.",
      sourceIds: [S.hyperrealMFA, S.wikiAmbient1],
    },
    {
      id: "work-no-pussyfooting",
      kind: "recording",
      status: "released",
      title: "(No Pussyfooting)",
      date: "1973",
      summary: "With Robert Fripp — the first tape-loop duets.",
      sourceIds: [S.wikiEno, S.enowebKeyboard],
    },
    {
      id: "work-plateaux",
      kind: "recording",
      status: "released",
      title: "Ambient 2: The Plateaux of Mirror",
      date: "1980",
      summary: "With Harold Budd — piano inside ambient weather.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-bush-of-ghosts",
      kind: "recording",
      status: "released",
      title: "My Life in the Bush of Ghosts",
      date: "1981",
      summary:
        "With David Byrne — found voices over funk frameworks; a sampling landmark.",
      sourceIds: [S.rsRemain, S.wikiEno],
    },
    {
      id: "work-on-land",
      kind: "recording",
      status: "released",
      title: "Ambient 4: On Land",
      date: "1982",
      summary: "Landscape-derived ambience; the ambient series deepened.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-apollo",
      kind: "recording",
      status: "released",
      title: "Apollo: Atmospheres and Soundtracks",
      date: "1983",
      summary:
        "With Daniel Lanois and Roger Eno — score material for For All Mankind.",
      sourceIds: [S.mdtsLanois, S.wikiEno],
    },
    {
      id: "work-thursday-afternoon",
      kind: "recording",
      status: "released",
      title: "Thursday Afternoon",
      date: "1985",
      summary: "An hour-long ambient piece issued with his 'video paintings'.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-nerve-net",
      kind: "recording",
      status: "released",
      title: "Nerve Net",
      date: "1992",
      summary:
        "The record he later called 'paella: a self-contradictory mess' — his own verdict, in Wired.",
      sourceIds: [S.wired95, S.wikiEno],
    },
    {
      id: "work-drop",
      kind: "recording",
      status: "released",
      title: "The Drop",
      date: "1997",
      summary: "Angular, rhythmic instrumentals on All Saints Records.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-another-day",
      kind: "recording",
      status: "released",
      title: "Another Day on Earth",
      date: "2005",
      summary: "His return to vocal songwriting after decades of instrumentals.",
      sourceIds: [S.wikiEno, S.enoAbout],
    },
    {
      id: "work-small-craft",
      kind: "recording",
      status: "released",
      title: "Small Craft on a Milk Sea",
      date: "2010-11",
      summary:
        "Warp release with Jon Hopkins and Leo Abrahams, built from structured improvisations.",
      sourceIds: [S.pitchfork10],
    },
    {
      id: "work-lux",
      kind: "recording",
      status: "released",
      title: "Lux",
      date: "2012",
      summary: "A long-form ambient commission that became an album.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-the-ship",
      kind: "recording",
      status: "released",
      title: "The Ship",
      date: "2016",
      summary: "Vocal-driven album paired with a generative installation.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-reflection",
      kind: "recording",
      status: "released",
      title: "Reflection",
      date: "2017-01",
      summary:
        "One 54-minute iteration of an endless generative piece — also released as an iOS app with Peter Chilvers.",
      sourceIds: [S.pitchforkAmbient, S.genMusic],
    },
    {
      id: "work-foreverandevernomore",
      kind: "recording",
      status: "released",
      title: "FOREVERANDEVERNOMORE",
      date: "2022-10-14",
      summary:
        "Climate-crisis song record — his own voice front and centre after 17 years.",
      sourceIds: [S.wired22, S.guardian22],
    },
    {
      id: "work-mixing-colours",
      kind: "recording",
      status: "released",
      title: "Mixing Colours",
      date: "2020",
      summary: "Ambient duets with his brother Roger Eno.",
      sourceIds: [S.enoAbout],
    },
    {
      id: "work-luminal",
      kind: "recording",
      status: "released",
      title: "Luminal",
      date: "2025-06-06",
      summary: "With Beatie Wolfe — 'dream music' on Verve.",
      sourceIds: [S.umcLuminal, S.wikiLateral],
    },
    {
      id: "work-lateral",
      kind: "recording",
      status: "released",
      title: "Lateral",
      date: "2025-06-06",
      summary:
        "With Beatie Wolfe — 'space music': a 64-minute ambient counterpart to Luminal.",
      sourceIds: [S.umcLuminal, S.wikiLateral],
    },
    {
      id: "work-liminal",
      kind: "recording",
      status: "released",
      title: "Liminal",
      date: "2025",
      summary: "The third Eno–Wolfe album of 2025, completing the trilogy.",
      sourceIds: [S.wikiLateral],
    },
    {
      id: "work-oblique-strategies",
      kind: "product",
      status: "released",
      title: "Oblique Strategies",
      date: "1975",
      summary:
        "The card deck of worthwhile dilemmas with Peter Schmidt — 'Over One Hundred Worthwhile Dilemmas'.",
      sourceIds: [S.wikiOblique, S.vamOblique],
    },
    {
      id: "work-microsoft-sound",
      kind: "design",
      status: "completed",
      title: "The Microsoft Sound",
      date: "1995",
      summary:
        "The Windows 95 startup chime — about three seconds long, one of the most-heard compositions ever written.",
      sourceIds: [S.sfgate96, S.twentyK],
    },
    {
      id: "work-generative-music-1",
      kind: "product",
      status: "released",
      title: "Generative Music 1",
      date: "1996",
      summary:
        "Floppy-disk title built with SSEYO's Koan software — generative music as a product rather than a fixed record.",
      sourceIds: [S.wikiSwollen, S.sfgate96],
    },
    {
      id: "work-77-million",
      kind: "project",
      status: "ongoing",
      title: "77 Million Paintings",
      date: "2006",
      summary:
        "Generative audio-visual installation: software-driven light paintings with ambient sound, exhibited globally.",
      sourceIds: [S.spinRbma, S.wikiEno],
    },
    {
      id: "work-generative-apps",
      kind: "product",
      status: "ongoing",
      title: "Generative apps with Peter Chilvers",
      date: "2008",
      summary:
        "Bloom (2008), Trope (2009), Scape (2012), Reflection (2017), Bloom: 10 Worlds — 'endless music machines' as apps.",
      sourceIds: [S.genMusic, S.genMusicBloom],
    },
    {
      id: "work-remain-in-light",
      kind: "recording",
      status: "released",
      title: "Talking Heads — Remain in Light (producer)",
      date: "1980-10",
      summary:
        "Third of the three Talking Heads albums he produced — loop-built at Compass Point, Bahamas.",
      sourceIds: [S.rsRemain],
    },
    {
      id: "work-no-new-york",
      kind: "recording",
      status: "released",
      title: "No New York (producer)",
      date: "1978",
      summary:
        "The no-wave scene compilation — DNA, Teenage Jesus, Mars, the Contortions.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-devo",
      kind: "recording",
      status: "released",
      title: "Devo — Q: Are We Not Men? A: We Are Devo! (producer)",
      date: "1978",
      summary: "Devo's debut, produced at Conny Plank's studio.",
      sourceIds: [S.wikiEno],
    },
    {
      id: "work-berlin-trilogy",
      kind: "recording",
      status: "released",
      title: "David Bowie — Low, 'Heroes', Lodger (collaborator)",
      date: "1977",
      summary:
        "The 'Berlin trilogy' — co-writing, synthesis and treatments alongside producer Tony Visconti.",
      sourceIds: [S.guardianMorley, S.wikiEno],
    },
    {
      id: "work-unforgettable-fire",
      kind: "recording",
      status: "released",
      title: "U2 — The Unforgettable Fire (producer, with Daniel Lanois)",
      date: "1984-10",
      summary:
        "The first Eno–Lanois U2 record — the band's pivot to atmosphere.",
      sourceIds: [S.pitchforkUF],
    },
    {
      id: "work-joshua-tree",
      kind: "recording",
      status: "released",
      title: "U2 — The Joshua Tree (producer, with Daniel Lanois)",
      date: "1987-03",
      summary: "The multi-platinum consolidation of the Eno–Lanois method.",
      sourceIds: [S.mdtsLanois, S.wikiEno],
    },
    {
      id: "work-achtung-baby",
      kind: "recording",
      status: "released",
      title: "U2 — Achtung Baby (producer, with Daniel Lanois)",
      date: "1991-11",
      summary:
        "Berlin-recorded reinvention — cut at Hansa, where Eno had worked with Bowie.",
      sourceIds: [S.mdtsLanois, S.wikiEno],
    },
    {
      id: "work-viva-la-vida",
      kind: "recording",
      status: "released",
      title: "Coldplay — Viva la Vida (producer, with Markus Dravs)",
      date: "2008-06",
      summary:
        "The band say he 'completely disrupted the formula' — most of it recorded live in a circle.",
      sourceIds: [S.coldplayViva],
    },
    {
      id: "work-swollen-appendices",
      kind: "book",
      status: "published",
      title: "A Year with Swollen Appendices",
      date: "1996",
      summary:
        "The 1995 diary plus essays and correspondence — the closest thing to a memoir he has allowed.",
      sourceIds: [S.faberDiary, S.wikiSwollen],
    },
    {
      id: "work-what-art-does",
      kind: "book",
      status: "published",
      title: "What Art Does: An Unfinished Theory",
      date: "2025-01-16",
      summary: "With Bette Adriaanse — a theory of why people make art.",
      sourceIds: [S.faberWhatArt],
    },
    {
      id: "work-eno-film",
      kind: "film",
      status: "released",
      title: "Eno (subject of the generative documentary)",
      date: "2024-01",
      summary:
        "Gary Hustwit's film — bespoke software assembles a different cut from his archive at each screening.",
      sourceIds: [S.hustwitEno, S.sundanceEno],
    },
  ],
  appearances: [
    {
      id: "appearance-wired-1995",
      title: "Gossip is Philosophy",
      venue: "Wired",
      publishedAt: "1995-05-01",
      participants: ["Brian Eno", "Kevin Kelly"],
      summary:
        "The long 1995 interview — why music is no longer the centre of culture, why 'gossip is philosophy', and the early generative thinking.",
      media: [
        { type: "article", url: "https://www.wired.com/1995/05/eno-2/", sourceId: S.wired95 },
      ],
      sourceIds: [S.wired95],
    },
    {
      id: "appearance-sfgate-1996",
      title: "Q and A With Brian Eno",
      venue: "San Francisco Chronicle",
      publishedAt: "1996-06-02",
      participants: ["Brian Eno", "Joel Selvin"],
      summary:
        "The interview containing his own account of composing the Windows 95 sound — the 3¼-second brief and the 84 tiny pieces.",
      media: [
        {
          type: "article",
          url: "https://www.sfgate.com/music/popquiz/article/q-and-a-with-brian-eno-2979740.php",
          sourceId: S.sfgate96,
        },
      ],
      sourceIds: [S.sfgate96],
    },
    {
      id: "appearance-imagination-1996",
      title: "'Generative Music' talk, Imagination Conference",
      venue: "Civic Auditorium, San Francisco",
      publishedAt: "1996-06-08",
      participants: ["Brian Eno", "Spike Lee", "Laurie Anderson"],
      summary:
        "His fullest early statement of the generative idea — seeds, screen savers and Koan — delivered alongside Spike Lee and Laurie Anderson; transcript at In Motion Magazine.",
      media: [
        {
          type: "transcript",
          url: "https://www.inmotionmagazine.com/eno1.html",
          sourceId: S.inMotion,
        },
      ],
      sourceIds: [S.inMotion, S.sfgate96],
    },
    {
      id: "appearance-keyboard-1981",
      title: "Keyboard magazine interview",
      venue: "Keyboard",
      publishedAt: "1981-07",
      participants: ["Brian Eno", "Jim Aikin"],
      summary:
        "The archival 1981 interview covering the studio as compositional tool, Oblique Strategies, the Portsmouth Sinfonia and 'how much of a musician' he is.",
      media: [
        {
          type: "article",
          url: "http://www.enoweb.co.uk/interviews/keyb81.html",
          sourceId: S.enowebKeyboard,
        },
      ],
      sourceIds: [S.enowebKeyboard],
    },
    {
      id: "appearance-rbma-2013",
      title: "Red Bull Music Academy lecture, New York 2013",
      venue: "Red Bull Music Academy",
      publishedAt: "2013-05",
      participants: ["Brian Eno", "Emma Warren"],
      summary:
        "An 80-plus-minute illustrated talk on four decades of method — generative systems, surrender, apps like Scape and Bloom.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=JUL8kNYmgsA",
          sourceId: S.rbmaVideo,
        },
      ],
      sourceIds: [S.rbma, S.rbmaVideo, S.spinRbma],
    },
    {
      id: "appearance-morley-2010",
      title: "An audience with Brian Eno",
      venue: "The Guardian",
      publishedAt: "2010-01-17",
      participants: ["Brian Eno", "Paul Morley"],
      summary:
        "Morley's profile-interview — gospel, ABBA, 'the death of the record' — one of the fullest mainstream portraits.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/music/2010/jan/17/brian-eno-interview-paul-morley",
          sourceId: S.guardianMorley,
        },
      ],
      sourceIds: [S.guardianMorley],
    },
    {
      id: "appearance-pitchfork-2010",
      title: "Pitchfork interview (Small Craft on a Milk Sea)",
      venue: "Pitchfork",
      publishedAt: "2010-10-31",
      participants: ["Brian Eno", "Mark Richardson"],
      summary:
        "On formats as ways of listening, titles as narrative hints, and the rules he sets to keep improvisers out of their comfort zones.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/interview/7875-brian-eno/",
          sourceId: S.pitchfork10,
        },
      ],
      sourceIds: [S.pitchfork10],
    },
    {
      id: "appearance-pitchfork-ambient-2017",
      title: "A Conversation With Brian Eno About Ambient Music",
      venue: "Pitchfork",
      publishedAt: "2017-02-16",
      participants: ["Brian Eno", "Philip Sherburne"],
      summary:
        "The Reflection-era studio interview — maker versus listener, half-speed playback, and generative music as 'a kind of political act'.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/interview/10023-a-conversation-with-brian-eno-about-ambient-music/",
          sourceId: S.pitchforkAmbient,
        },
      ],
      sourceIds: [S.pitchforkAmbient],
    },
    {
      id: "appearance-museum-2009",
      title: "The Museum of Curiosity (BBC Radio 4)",
      venue: "BBC Radio 4",
      publishedAt: "2009",
      participants: ["Brian Eno", "John Lloyd", "Sean Lock"],
      summary:
        "The radio appearance where he admitted the Windows 95 sound was written on a Mac — 'I've never used a PC in my life.'",
      media: [
        {
          type: "audio",
          url: "https://www.20k.org/episodes/tadaitswindows",
          sourceId: S.twentyK,
        },
      ],
      sourceIds: [S.twentyK],
    },
    {
      id: "appearance-wired-2022",
      title: "Why He Wrote a Climate Album With Deepfake Birdsongs",
      venue: "Wired",
      publishedAt: "2022-10-14",
      participants: ["Brian Eno"],
      summary:
        "On FOREVERANDEVERNOMORE, EarthPercent, and the environmental movement the media aren't watching.",
      media: [
        {
          type: "article",
          url: "https://www.wired.com/story/brian-eno-q-and-a/",
          sourceId: S.wired22,
        },
      ],
      sourceIds: [S.wired22],
    },
    {
      id: "appearance-sundance-2024",
      title: "Eno premiere and Q&A at Sundance",
      venue: "Sundance Film Festival",
      publishedAt: "2024-01",
      participants: ["Brian Eno", "Gary Hustwit", "Brendan Dawes"],
      summary:
        "The generative documentary's premiere — Eno joined by video call; the software can assemble some 52 quintillion possible cuts.",
      media: [
        {
          type: "article",
          url: "https://www.sundance.org/blogs/eno-proves-that-there-is-never-one-truth-about-anyone/",
          sourceId: S.sundanceEno,
        },
      ],
      sourceIds: [S.sundanceEno, S.hustwitEno],
    },
    {
      id: "appearance-guardian-2022",
      title: "'Sex, drugs, art… they're all ways of surrendering'",
      venue: "The Guardian",
      publishedAt: "2022-11-05",
      participants: ["Brian Eno"],
      summary:
        "The later-life Q&A — surrender, religion as an atheist, and climate as the moment's real subject.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/lifeandstyle/2022/nov/05/brian-eno-sex-drugs-art-theyre-all-ways-of-surrendering-",
          sourceId: S.guardian22,
        },
      ],
      sourceIds: [S.guardian22],
    },
  ],
  relations: [
    {
      id: "rel-stewart-brand",
      kind: "cofounder",
      target: "stewart-brand",
      targetName: "Stewart Brand",
      note: "Co-founded the Long Now Foundation in 1996 — Brand incorporated it, Eno sat on the founding board and proposed 'the long now' as its name.",
      sourceIds: [S.longNowBoard, S.longNowPeople],
    },
    {
      id: "rel-the-long-now-foundation",
      kind: "founded",
      target: "the-long-now-foundation",
      targetName: "The Long Now Foundation",
      targetKind: "organization",
      note: "Cofounder and founding board member of the clock-and-library foundation incorporated in 1996; still listed on its board.",
      sourceIds: [S.longNowBoard, S.longNowPeople],
    },
  ],
  openQuestions: [
    "Ambient 1: Music for Airports is dated 1978 in most references but February 1979 in its Wikipedia article; the liner-note essay itself is dated September 1978. The index uses 1978 and preserves the discrepancy here.",
    "The Microsoft Sound details drift in his own tellings: '3 1/4 seconds' in 1996 versus 'not more than 3.8 seconds' on BBC radio in 2009, and 84 versus 83 pieces.",
    "His precise credit on the Bowie 'Berlin' records — collaborator, co-writer, or co-producer — varies between sources; Tony Visconti was the credited producer.",
    "(No Pussyfooting) is dated 1973 in most discographies, though the 1981 Keyboard interview's own introduction says the Fripp collaboration 'appeared in 1974'.",
    "Organizational roles such as ClientEarth trustee and BASIC are taken from his own biography and the Long Now people page; their current status is not independently verified here.",
    "Coverage is deliberately interview-heavy on ideas and light on private life — consistent with his own refusal of biography ('me is not one of them').",
    "EarthPercent's founding is dated to its 2021 public launch in press coverage; his formal role there has since shifted from trustee to patron, per charity filings not catalogued in this index.",
  ],
  body: `Brian Eno is the musician who made a career out of not quite being a musician. Across five decades he has been, by turns and often at once, a glam-rock synthesizer player, the coiner of 'ambient music', a producer who reshaped Talking Heads, U2 and Coldplay, the co-author of the Oblique Strategies cards, a generative-music theorist, a founder of the Long Now Foundation, and — in his own preferred frame — a gardener of systems rather than an architect of songs.

## Formation: art school, not music school

Born 15 May 1948 in Melton, Suffolk, Eno studied at Ipswich Civic College's art school in the mid-1960s and then Winchester School of Art, graduating in 1969. In the archived 1981 *Keyboard* interview he credits Ipswich's deliberately rule-breaking curriculum — designed to dismantle what students thought was possible — and its tape recorders as the foundation of everything after. He never learned an instrument formally; he learned to treat sound as material.

That path led to Roxy Music in 1971, where he began not as a player but as the man mixing the sound from the back of the hall. Onstage he became the band's peacock — lipstick, mascara, ostrich plumes — while treating the synthesizer as a processor of other people's sounds. He left in 1973 after two albums, and the standard rock-star script (frontman career, identifiable product) is precisely what he walked away from.

## The 1970s: songs, then systems

Four solo albums of skewed pop — *Here Come the Warm Jets* (1974) through *Before and After Science* (1977) — ran in parallel with the tape-loop duets of *(No Pussyfooting)* with Robert Fripp and, in 1975, two pivotal releases. *Oblique Strategies*, the card deck of lateral prompts co-created with painter Peter Schmidt, turned his studio superstitions into a tool anyone could buy. *Discreet Music* opened the quiet line: he has repeatedly traced its premise to January 1975, when, bedridden after being hit by a car, he heard a harp record playing almost inaudibly through one broken speaker and understood music could merge with the environment rather than command it.

*Ambient 1: Music for Airports* made the mode explicit. In the September 1978 liner notes — preserved at Hyperreal — he began calling his work 'Ambient Music' and wrote the genre's founding sentence: it 'must be able to accommodate many levels of listening attention without enforcing one in particular; it must be as ignorable as it is interesting.' He framed it against Muzak, which he credited with pioneering environmental music while stripping out 'doubt and uncertainty'.

## Producer and collaborator

The late 1970s made him the thinking person's producer: the no-wave compilation *No New York* and Devo's debut in 1978, then three consecutive Talking Heads albums ending with *Remain in Light* (1980), assembled at Compass Point Studios from looped band improvisations — Rolling Stone's retrospective describes the record cohering under his 'stewardship'. *My Life in the Bush of Ghosts* (1981) with David Byrne built whole tracks around 'found voices' — radio preachers, callers — an early landmark of sampling. With David Bowie he collaborated across the 'Berlin trilogy' (*Low*, *'Heroes'*, *Lodger*, 1977–79), though his exact role versus producer Tony Visconti's remains genuinely fuzzy across sources — this index preserves that seam.

With Daniel Lanois he produced U2 from *The Unforgettable Fire* (1984) through *The Joshua Tree* (1987), *Achtung Baby* (1991) and *Zooropa* (1993); Paul Morley's 2010 Guardian audience calls him U2's 'fifth man'. The pattern across bands is consistent and worth naming: he disrupts process rather than polishing sound. Coldplay's own account of *Viva la Vida* (2008), co-produced with Markus Dravs, has Will Champion saying Eno 'completely disrupted the formula'.

## The generative decades

The idea he calls generative music — composing rules and seeds rather than finished pieces — runs from the 1970s tape loops through SSEYO's Koan software (*Generative Music 1*, 1996) to the iOS apps he has made with Peter Chilvers since *Bloom* in October 2008, and onward to Gary Hustwit's *Eno* (2024), the Sundance-premiered documentary that assembles a different cut from his archive at every screening. His 1996 Imagination Conference talk and the archived July 1996 Wired Q&A with John Alderman carry the clearest statements: the composer 'builds the seed, plants it in the computer and lets it grow.'

The 1990s also produced his strangest ubiquity: 'The Microsoft Sound', the ~3-second Windows 95 startup chime. His own 1996 account to the San Francisco Chronicle — a brief demanding music 'inspiring, universal… 3 1/4 seconds long', answered with 84 micro-pieces composed on a Mac — is a parable of constraint-as-liberation he has retold ever since, though the numbers drift between tellings.

## Institutions and ideas

Two of his durable contributions are conceptual rather than musical. 'Scenius' — 'the intelligence and the intuition of a whole cultural scene… the communal form of the concept of the genius' — was his coinage, circulated widely through Kevin Kelly's 2008 essay, and it is how he prefers to explain movements, including his own. And 'the Long Now', his name for a stretched sense of the present that includes deep past and far future, became the identity of the foundation Stewart Brand incorporated in 1996 with Eno on the founding board; his essay 'The Big Here and Long Now' states the case.

His activism follows the same shape — structural, not confessional. EarthPercent, co-founded and launched publicly in 2021, asks the music industry to treat the planet as a stakeholder and pledge a percentage of income to climate organizations. *FOREVERANDEVERNOMORE* (2022) turned the anxiety into song — his first vocals-led solo record in about 17 years — and *What Art Does* (Faber, 2025, with Bette Adriaanse) argues that art's real function is creating communities and rehearsing feelings. The throughline to the music is surrender: 'sex, drugs, art… they're all ways of surrendering,' he told the Guardian in 2022.

## What the record does not settle

Eno's self-narration is extensive and mostly consistent, but the seams show: *Ambient 1* is dated 1978 in most references and February 1979 in others; the Microsoft Sound is 3¼ or 3.8 seconds, 84 or 83 pieces, depending on which interview you read; his role on the Bowie records resists a single credit; and *(No Pussyfooting)* is 1973 in most discographies but 1974 in his own magazine's introduction. He skipped Roxy Music's 2019 Rock & Roll Hall of Fame induction — consistent with decades of anti-nostalgia talk, unexplained by him. And his refusal of biography ('of all the things I want to talk about in the morning, me is not one of them') means the public record is thick on ideas and deliberately thin on private life. This index keeps those edges visible rather than smoothing them.

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
