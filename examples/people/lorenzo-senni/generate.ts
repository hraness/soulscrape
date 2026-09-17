#!/usr/bin/env bun
/** Generate examples/people/lorenzo-senni/person-index.json with derived source ids. */

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

// --- Subject-controlled and label/institutional record sources ---

const senniSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Lorenzo Senni — official site",
  url: "https://lorenzosenni.com/",
  publisher: "lorenzosenni.com",
  notes: "The subject's own site; currently fronts Scacco Matto.",
});
const prestoInfo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Lorenzo Senni — artist info",
  url: "http://www.prestorecords.com/senniinfo.html",
  publisher: "Presto!? Records",
  notes:
    "Biography hosted on his own label's site; self-reported career details.",
});
const prestoDunno = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dunno | Lorenzo Senni | Presto!? Records",
  url: "https://prestorecords.bandcamp.com/album/dunno",
  publisher: "Presto!? Records on Bandcamp",
  notes:
    "Label's own Bandcamp page; states 'Presto!? was founded by Lorenzo Senni in September 2008.'",
});
const bandcampQJ = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Quantum Jelly | Lorenzo Senni",
  url: "https://lorenzosenni.bandcamp.com/album/quantum-jelly",
  publisher: "Lorenzo Senni on Bandcamp",
  notes:
    "Liner notes: all tracks are one-take, real-time two-channel recordings on a computer-controlled Roland JP8000; cover by Anne de Vries.",
});
const bandcampSM = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Scacco Matto | Lorenzo Senni",
  url: "https://lorenzosenni.bandcamp.com/album/scacco-matto",
  publisher: "Lorenzo Senni on Bandcamp",
  notes:
    "Credits: mixed by Max Casacci and Senni at Andromeda Studio, mastered by Matt Colton, front cover photograph John Divola 'Zuma #30' (1977).",
});
const bandcampCI = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Canone Infinito Xtended | Lorenzo Senni",
  url: "https://lorenzosenni.bandcamp.com/album/canone-infinito-xtended",
  publisher: "Lorenzo Senni on Bandcamp",
});
const lbAgency = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Lorenzo Senni | LittleBig Music Agency",
  url: "https://www.lb-agency.net/artists/lorenzo-senni",
  publisher: "LittleBig Agency",
  notes:
    "Booking-agency artist bio; artist-representative copy, treated as self-reported.",
});

// --- Official catalog records ---

const warpArtist = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Lorenzo Senni — Artists — WARP",
  url: "https://warp.net/artists/lorenzo-senni",
  publisher: "Warp Records",
  notes:
    "Label's official artist page: biography ('never a raver', 'rave voyeur') and Warp discography.",
});
const warpPersona = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Persona by Lorenzo Senni — Releases — WARP",
  url: "https://warp.net/releases/76787-persona",
  publisher: "Warp Records",
  notes: "Official release page: Persona EP, WAP394, 11 Nov 2016.",
});
const warpCanone = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Canone Infinito Xtended by Lorenzo Senni — Releases — WARP",
  url: "https://warp.net/releases/506802-canone-infinito-xtended/tracklist",
  publisher: "Warp Records",
  notes: "Official release page: Canone Infinito Xtended EP, 24 Apr 2025.",
});
const arsPDF = source({
  binding: "primary_record",
  mediaType: "pdf",
  title: "The 2017 Prix Ars Electronica Prizewinners",
  url: "https://ars.electronica.art/mediaservice/files/2017/06/PK_Prix_2017_final_korr_06_EN.pdf",
  publisher: "Ars Electronica",
  publishedAt: "2017",
  notes:
    "Official prizewinners press release; lists Lorenzo Senni's 'Persona' among the Honorary Mentions in Digital Musics & Sound Art.",
});
const ancarani = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Challenge — Yuri Ancarani",
  url: "https://www.yuriancarani.com/works/the-challenge-2/",
  publisher: "yuriancarani.com",
  notes:
    "Director's own page; credits soundtrack to Lorenzo Senni and Francesco Fantini, Warp limited-edition 10-inch + art book (500 copies), digital WAP404.",
});

// --- Reference ---

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Lorenzo Senni (Q90545154)",
  url: "https://www.wikidata.org/wiki/Q90545154",
  publisher: "Wikidata",
  notes:
    "Date of birth 1983, place of birth Cesena, both referenced to the Quadriennale artist page.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Lorenzo Senni",
  url: "https://en.wikipedia.org/wiki/Lorenzo_Senni",
  publisher: "Wikipedia",
});
const wikipediaPersona = source({
  binding: "reference",
  mediaType: "article",
  title: "Persona (Lorenzo Senni EP)",
  url: "https://en.wikipedia.org/wiki/Persona_(Lorenzo_Senni_EP)",
  publisher: "Wikipedia",
});
const itwiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Lorenzo Senni",
  url: "https://it.wikipedia.org/wiki/Lorenzo_Senni",
  publisher: "Wikipedia",
  language: "it",
  notes:
    "Italian article; details Hundebiss Nights concerts and the Le Harmacy split cassette with Talibam!.",
});
const allmusic = source({
  binding: "reference",
  mediaType: "article",
  title: "Lorenzo Senni — Biography",
  url: "https://www.allmusic.com/artist/lorenzo-senni-mn0002974170",
  publisher: "AllMusic",
  authors: ["Paul Simpson"],
  notes:
    "Biography gives Milan as birthplace — conflicting with Cesena per Wikidata/Wikipedia — and covers Le Harmacy, Early Works and Dunno.",
});
const raProfile = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Lorenzo Senni — Artist Profile",
  url: "https://ra.co/dj/lorenzosenni",
  publisher: "Resident Advisor",
});
const discogs = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Lorenzo Senni — Discogs artist page",
  url: "https://www.discogs.com/artist/1391496-Lorenzo-Senni",
  publisher: "Discogs",
  notes:
    "Catalogs Stargate alias, One Circle membership, Early Works (2008), Dunno (2010) and Atlantide OST (2023).",
});
const discogsQJ = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Lorenzo Senni — Quantum Jelly (eMEGO 152)",
  url: "https://www.discogs.com/release/3945485-Lorenzo-Senni-Quantum-Jelly",
  publisher: "Discogs",
});
const bleepSuper = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Lorenzo Senni — Superimpositions (Boomkat Editions BKEDIT010)",
  url: "https://bleep.com/release/64958-lorenzo-senni-superimpositions",
  publisher: "Bleep",
  notes:
    "Retail catalog listing; digital listing dated 23 October 2015 while press reviews covered the vinyl in 2014.",
});

// --- Interviews and first-person material ---

const fact2015 = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Lorenzo Senni talks hardcore, cyberpunk and appropriating dance music's most reviled genre",
  url: "https://www.factmag.com/2015/02/23/trance-im-trance-now-lorenzo-senni-talks-hardcore-cyberpunk-appropriating-dance-musics-reviled-genre/",
  publisher: "FACT",
  publishedAt: "2015-02-23",
});
const fact2016 = source({
  binding: "interview",
  mediaType: "article",
  title: "Lorenzo Senni is the Warp rave voyeur reaching for euphoria on Persona",
  url: "https://www.factmag.com/2016/10/25/lorenzo-senni-persona-warp-interview/",
  publisher: "FACT",
  publishedAt: "2016-10-25",
  authors: ["John Twells"],
});
const noisey = source({
  binding: "interview",
  mediaType: "article",
  title: "Talking Persona, Place, and Production With Lorenzo Senni",
  url: "https://www.vice.com/en/article/lorenzo-senni-noisey-italy-interview/",
  publisher: "Noisey / VICE",
  publishedAt: "2017-02-14",
  authors: ["Francesco Tenaglia"],
});
const ssense = source({
  binding: "interview",
  mediaType: "article",
  title: "Lorenzo Senni: Discipline of Enthusiasm",
  url: "https://www.ssense.com/en-us/editorial/music/lorenzo-senni-discipline-of-enthusiasm",
  publisher: "SSENSE",
  publishedAt: "2020",
  authors: ["Philip Sherburne"],
});
const fader = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Milan Calling: Lorenzo Senni and Friends' Sonic Adventures Are Shaking up the Fashion Capital",
  url: "https://www.thefader.com/2014/09/02/milan-lorenzo-senni-interview",
  publisher: "The FADER",
  publishedAt: "2014-09-02",
});
const crack = source({
  binding: "interview",
  mediaType: "article",
  title: "Lorenzo Senni — Crack Magazine feature",
  url: "https://crackmagazine.net/article/discover/lorenzosenni-feature/",
  publisher: "Crack Magazine",
});
const dummy = source({
  binding: "interview",
  mediaType: "article",
  title: "Dummy Mix 229 // Lorenzo Senni",
  url: "https://dmy.co/mix/dummy-mix-229-lorenzo-senni-interview",
  publisher: "Dummy",
  publishedAt: "2014",
  notes:
    "Mix plus Q&A; covers his trance-build-up archive, the JP-8000/JP-8080 presets, and writing synth lines for How To Dress Well.",
});
const inverted = source({
  binding: "interview",
  mediaType: "article",
  title: "Pointillistic Trance: Lorenzo Senni talks 'Scacco Matto' LP",
  url: "https://inverted-audio.com/feature/pointillistic-trance-lorenzo-senni-talks-scacco-matto-lp/",
  publisher: "Inverted Audio",
  publishedAt: "2020",
  authors: ["Esme Bennett"],
});
const rbma = source({
  binding: "interview",
  mediaType: "video",
  title: "Lorenzo Senni lecture (RBMA Montréal 2016)",
  url: "https://www.redbullmusicacademy.com/lectures/lorenzo-senni-lecture/",
  publisher: "Red Bull Music Academy",
  publishedAt: "2016",
  notes:
    "Two-hour lecture hosted by Vivian Host; page carries video and full transcript.",
});
const boiler = source({
  binding: "first_person",
  mediaType: "video",
  title: "The Science of Sound: Delay with Lorenzo Senni | Boiler Room & Genelec",
  url: "https://www.youtube.com/watch?v=3gEu1JU1a3w",
  publisher: "Boiler Room",
  notes:
    "Short film Senni hosts for Genelec's 40th-anniversary production-concept series.",
});

// --- Reporting ---

const raSigning = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni signs to Warp Records",
  url: "https://ra.co/news/36788",
  publisher: "Resident Advisor",
  publishedAt: "2016-10-14",
});
const raPersona = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni announces Persona EP for Warp Records",
  url: "https://ra.co/news/36985",
  publisher: "Resident Advisor",
  publishedAt: "2016-10",
});
const factRbma = source({
  binding: "reporting",
  mediaType: "article",
  title: "Watch Lorenzo Senni's RBMA lecture",
  url: "https://www.factmag.com/2016/11/04/watch-lorenzo-sennis-rbma-lecture/",
  publisher: "FACT",
  publishedAt: "2016-11-04",
  authors: ["Miles Bowe"],
});
const factList = source({
  binding: "archive",
  mediaType: "webpage",
  title: "The 50 best albums of 2016",
  url: "https://www.factmag.com/wp-content/uploads/froont/1481640463/froont-page/",
  publisher: "FACT",
  publishedAt: "2016-12",
  notes:
    "Archived year-end list; ranks the Persona EP at number four.",
});
const npr = source({
  binding: "reporting",
  mediaType: "article",
  title: "Songs We Love: Lorenzo Senni, 'Rave Voyeur'",
  url: "https://www.npr.org/2016/11/08/501054233/songs-we-love-lorenzo-senni-rave-voyeur",
  publisher: "NPR",
  publishedAt: "2016-11-08",
});
const pitchforkSM = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni: Scacco Matto Album Review",
  url: "https://pitchfork.com/reviews/albums/lorenzo-senni-scacco-matto/",
  publisher: "Pitchfork",
  publishedAt: "2020-04",
});
const pitchforkPersona = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni: Persona EP Album Review",
  url: "https://pitchfork.com/reviews/albums/22618-persona-ep/",
  publisher: "Pitchfork",
  publishedAt: "2016-11",
  authors: ["Patric Fallon"],
});
const guardian = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Lorenzo Senni: Scacco Matto review — rave poet dials up the intensity",
  url: "https://www.theguardian.com/music/2020/apr/23/lorenzo-senni-scatto-matto-album-review-warp",
  publisher: "The Guardian",
  publishedAt: "2020-04-23",
});
const quietusSM = source({
  binding: "reporting",
  mediaType: "article",
  title: "Supertoys Last All Summer Long: Lorenzo Senni's Scacco Matto",
  url: "https://thequietus.com/quietus-reviews/album-of-the-week/lorenzo-senni-scacco-matto-review/",
  publisher: "The Quietus",
  publishedAt: "2020-04-23",
  authors: ["Ryan Diduck"],
});
const quietusSuper = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni — Superimpositions",
  url: "https://thequietus.com/quietus-reviews/lorenzo-senni-superimpositions-review/",
  publisher: "The Quietus",
  publishedAt: "2014-09-08",
  authors: ["Alexander Iadarola"],
});
const bandcampDaily = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Italian Label Presto!? Operates At The Edges of Electronic Music",
  url: "https://daily.bandcamp.com/label-profile/presto-label-lorenzo-senni-profile",
  publisher: "Bandcamp Daily",
  publishedAt: "2018",
});
const abitare = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni — Presto!?",
  url: "https://www.abitare.it/en/architecture/2009/12/06/lorenzo-senni-presto-2/",
  publisher: "Abitare",
  publishedAt: "2009-12-06",
  notes:
    "Early label profile; dates Presto!? from August 2008 and describes Senni as 25 years old.",
});
const ctm = source({
  binding: "archive",
  mediaType: "webpage",
  title: "SHAPE x CTM 2015 — CTM Festival archive",
  url: "https://archive2013-2020.ctm-festival.de/archive/festival-editions/ctm-2015-un-tune/specials/shape-x-ctm-2015/",
  publisher: "CTM Festival",
  publishedAt: "2015",
  notes:
    "Festival archive page; documents the world premiere of AAT (Advanced Abstract Trance) at HAU2 on 31 January 2015.",
});
const hau = source({
  binding: "reporting",
  mediaType: "webpage",
  title:
    "Lorenzo Senni 'AAT (Advanced Abstract Trance)' — world premiere",
  url: "https://www.hebbel-am-ufer.de/en/programme/pdetail/ctm-electric-indigo-morpheme-senni",
  publisher: "HAU Hebbel am Ufer",
  publishedAt: "2015",
});
const shape = source({
  binding: "reporting",
  mediaType: "article",
  title: "Exclusive stream of Lorenzo Senni's 'AAT' on ORF",
  url: "https://shapeplatform.eu/2015/exclusive-stream-of-lorenzo-sennis-aat-on-orf/",
  publisher: "SHAPE+",
  publishedAt: "2015-12-10",
  notes:
    "Documents the ORF Oe1 Zeit-Ton broadcast of AAT recorded at musikprotokoll Graz 2015, and quotes his Electronic Beats description of the piece.",
});
const tmtShape = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "SHAPE, a platform for emerging underground artists, launches at CTM Festival with Lorenzo Senni, Ketev, and more",
  url: "https://www.tinymixtapes.com/news/shape-launches-at-ctm-festival-with-lorenzo-senni-ketev-and-more",
  publisher: "Tiny Mix Tapes",
  publishedAt: "2015",
});
const entertainment = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "When entertainment.ie went to RBMA Montreal [Part 2]: Bjork's words of wisdom & more",
  url: "https://entertainment.ie/music/when-entertainmentie-went-to-rbma-montreal-part-2-bjorks-words-of-wisdom-amp-more-256662/",
  publisher: "entertainment.ie",
  publishedAt: "2016",
  notes:
    "Reports Senni's RBMA lecture remarks, including 'to make something that satisfies you should be a bit terrible.'",
});
const faderChallenge = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni Shares A Bewitching Taste Of His New Film Score",
  url: "https://www.thefader.com/2016/09/27/lorenzo-senni-yuri-ancarani-the-challenge-score-preview",
  publisher: "The FADER",
  publishedAt: "2016-09-27",
});
const serralves = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "AAT (Advanced Abstract Trance) — Lorenzo Senni",
  url: "https://www.serralves.pt/atividades-serralves/0504-aat-advanced-abstract-t/",
  publisher: "Fundação de Serralves",
  language: "pt",
  notes:
    "Institutional biography listing Centre Pompidou, MACBA, Tate Modern, MAXXI, Serpentine and Pirelli Hangar Bicocca appearances, the Prix Ars Electronica for Persona, and the Ancarani film scores.",
});
const musikprotokoll = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Lorenzo Senni — artist biography",
  url: "https://musikprotokoll.orf.at/en/bio/lorenzo-senni-0",
  publisher: "musikprotokoll / ORF",
  notes:
    "Festival biography: born 1983, studied musicology at Bologna University, Presto!? roster.",
});
const artribune = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Lorenzo Senni — exhibitions",
  url: "https://www.artribune.com/artista-mostre-biografia/lorenzo-senni/",
  publisher: "Artribune",
  language: "it",
  notes:
    "Lists 'Canone Infinito', a permanent site-specific installation for intensive-care corridors in Bergamo, and 'AAT + Persona II' at the 16th Quadriennale.",
});
const zero = source({
  binding: "reporting",
  mediaType: "article",
  title: "L'etichetta milanese Presto?! ha celebrato i suoi 10 anni al Berghain",
  url: "https://zero.eu/en/news/il-berghain-nelle-mani-di-lorenzo-senni/",
  publisher: "Zero",
  publishedAt: "2018-11",
  language: "it",
  notes:
    "Coverage of Presto!?'s tenth-anniversary night at Berghain; names John Hudak's 'On And On' as the first release.",
});
const popmatters = source({
  binding: "reporting",
  mediaType: "article",
  title: "Lorenzo Senni: Quantum Jelly",
  url: "https://www.popmatters.com/165544-lorenzo-senni-quantum-jelly-2495796559.html",
  publisher: "PopMatters",
  publishedAt: "2012-11-26",
  authors: ["Craig Hayes"],
});

const S = {
  senniSite: senniSite.id,
  prestoInfo: prestoInfo.id,
  prestoDunno: prestoDunno.id,
  bandcampQJ: bandcampQJ.id,
  bandcampSM: bandcampSM.id,
  bandcampCI: bandcampCI.id,
  lbAgency: lbAgency.id,
  warpArtist: warpArtist.id,
  warpPersona: warpPersona.id,
  warpCanone: warpCanone.id,
  arsPDF: arsPDF.id,
  ancarani: ancarani.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  wikipediaPersona: wikipediaPersona.id,
  itwiki: itwiki.id,
  allmusic: allmusic.id,
  raProfile: raProfile.id,
  discogs: discogs.id,
  discogsQJ: discogsQJ.id,
  bleepSuper: bleepSuper.id,
  fact2015: fact2015.id,
  fact2016: fact2016.id,
  noisey: noisey.id,
  ssense: ssense.id,
  fader: fader.id,
  crack: crack.id,
  dummy: dummy.id,
  inverted: inverted.id,
  rbma: rbma.id,
  boiler: boiler.id,
  raSigning: raSigning.id,
  raPersona: raPersona.id,
  factRbma: factRbma.id,
  factList: factList.id,
  npr: npr.id,
  pitchforkSM: pitchforkSM.id,
  pitchforkPersona: pitchforkPersona.id,
  guardian: guardian.id,
  quietusSM: quietusSM.id,
  quietusSuper: quietusSuper.id,
  bandcampDaily: bandcampDaily.id,
  abitare: abitare.id,
  ctm: ctm.id,
  hau: hau.id,
  shape: shape.id,
  tmtShape: tmtShape.id,
  entertainment: entertainment.id,
  faderChallenge: faderChallenge.id,
  serralves: serralves.id,
  musikprotokoll: musikprotokoll.id,
  artribune: artribune.id,
  zero: zero.id,
  popmatters: popmatters.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-lorenzo-senni",
  generatedAt: "2026-09-17T00:45:00Z",
  subject: {
    kind: "person",
    handle: "lorenzo-senni",
    displayName: "Lorenzo Senni",
    alsoKnownAs: ["Stargate", "STARGATE"],
    summary:
      "Italian electronic musician and composer who coined 'pointillistic trance' — drum-less deconstructions of '90s trance build-ups made largely on a Roland JP-8000/JP-8080 — founder of the Presto!? label and a Warp Records artist (Persona EP, Scacco Matto).",
    identity: {
      wikidataId: "Q90545154",
      officialSite: "https://lorenzosenni.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Lorenzo_Senni",
      profiles: [
        "https://www.instagram.com/lorenzosenni/",
        "https://soundcloud.com/lorenzosenni",
        "https://lorenzosenni.bandcamp.com/",
        "https://ra.co/dj/lorenzosenni",
        "https://www.discogs.com/artist/1391496-Lorenzo-Senni",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T00:45:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media", "beliefs"],
  },
  sources: [
    senniSite,
    prestoInfo,
    prestoDunno,
    bandcampQJ,
    bandcampSM,
    bandcampCI,
    lbAgency,
    warpArtist,
    warpPersona,
    warpCanone,
    arsPDF,
    ancarani,
    wikidata,
    wikipedia,
    wikipediaPersona,
    itwiki,
    allmusic,
    raProfile,
    discogs,
    discogsQJ,
    bleepSuper,
    fact2015,
    fact2016,
    noisey,
    ssense,
    fader,
    crack,
    dummy,
    inverted,
    rbma,
    boiler,
    raSigning,
    raPersona,
    factRbma,
    factList,
    npr,
    pitchforkSM,
    pitchforkPersona,
    guardian,
    quietusSM,
    quietusSuper,
    bandcampDaily,
    abitare,
    ctm,
    hau,
    shape,
    tmtShape,
    entertainment,
    faderChallenge,
    serralves,
    musikprotokoll,
    artribune,
    zero,
    popmatters,
  ],
  claims: [
    // --- fact ---
    {
      id: "claim-born-cesena-1983",
      kind: "fact",
      text: "Lorenzo Senni was born in 1983 in Cesena, Emilia-Romagna, Italy, and grew up in the Cesena–Rimini area on the Adriatic coast.",
      sourceIds: [S.wikidata, S.wikipedia, S.serralves],
    },
    {
      id: "claim-milan-based",
      kind: "fact",
      text: "He is based in Milan, where he moved after university and where the Presto!? label is headquartered.",
      sourceIds: [S.fact2016, S.fader, S.zero],
    },
    {
      id: "claim-musicology-bologna",
      kind: "fact",
      text: "He studied musicology at the University of Bologna (DAMS), commuting daily by train, where he discovered early electronic and computer music pioneers.",
      sourceIds: [S.fader, S.serralves, S.musikprotokoll, S.ssense],
    },
    {
      id: "claim-guitar-hardcore",
      kind: "fact",
      text: "He began guitar lessons at about 11 or 12 and played in punk and hardcore bands; around 13–14 he played as a tour guitarist with Out Of Bounds, a straight-edge band from the Cesena scene that released records on Belgium's Good Life Recordings.",
      sourceIds: [S.fact2015],
    },
    {
      id: "claim-drums-17",
      kind: "fact",
      text: "At about 17 he switched to drums, studying with a jazz teacher five or six hours a day and playing until about 23 — discipline he says 'saved my life.'",
      sourceIds: [S.fact2015],
    },
    {
      id: "claim-gabber-friends",
      kind: "fact",
      text: "As a teenager he split his time between two scenes: hardcore punk bandmates on weekdays and gabber-listening friends at Rimini-area superclubs such as Cocoricò on weekends, where he went sober and often drove.",
      sourceIds: [S.rbma, S.noisey, S.ssense],
    },
    {
      id: "claim-milan-venue",
      kind: "fact",
      text: "In Milan he and Simone Trabucchi (Hundebiss Records, aka Dracula Lewis/STILL) ran a basement concert space for about two years, hosting Wolf Eyes, Peaking Lights, Emeralds and a Kode9 afterparty.",
      sourceIds: [S.crack, S.fader],
    },
    {
      id: "claim-presto-founded-2008",
      kind: "fact",
      text: "He founded the Presto!? label in 2008 — a 2009 Abitare profile dates it to August 2008 while the label's own Bandcamp page says September 2008 — funded by summer factory work hauling 25-kilo seed bags.",
      sourceIds: [S.abitare, S.prestoDunno, S.bandcampDaily, S.fact2015],
    },
    {
      id: "claim-presto-roster",
      kind: "fact",
      text: "Presto!?'s first release was John Hudak's 'On And On'; the label went on to release Florian Hecker, DJ Stingray, Palmistry, EVOL, Marcus Schmickler, Carl Michael von Hausswolff, Lasse Marhaug, John Wiese and Theo Burt, often with sleeves designed by Senni.",
      sourceIds: [S.zero, S.raSigning, S.prestoInfo, S.fader, S.bandcampDaily],
    },
    {
      id: "claim-early-works",
      kind: "fact",
      text: "His first album 'Early Works' (2008) was a co-release between Presto!? and Kesh Recordings — the label run by Slowdive's Simon Scott — after Senni offered to pay the difference between a CDR and a real CD.",
      sourceIds: [S.fact2015, S.discogs, S.allmusic],
    },
    {
      id: "claim-dunno",
      kind: "fact",
      text: "His second album 'Dunno' (2010) on Presto!? is an abstract computer-music record of pulsar synthesis and FM streams, mastered by Marcus Schmickler.",
      sourceIds: [S.prestoDunno, S.allmusic],
    },
    {
      id: "claim-quantum-jelly",
      kind: "fact",
      text: "'Quantum Jelly' was released 8 October 2012 on Editions Mego (eMEGO 152): five tracks of one-take, real-time two-channel recordings using only a computer-controlled Roland JP8000, with cover art by Anne de Vries.",
      sourceIds: [S.bandcampQJ, S.discogsQJ, S.popmatters],
    },
    {
      id: "claim-coined-pointillistic",
      kind: "fact",
      text: "Senni coined the term 'pointillistic trance' (earlier 'pointillist trance', later shortened to 'Pointlist T') to name his approach of isolating trance build-ups.",
      sourceIds: [S.prestoInfo, S.raProfile, S.dummy, S.quietusSuper],
    },
    {
      id: "claim-superimpositions",
      kind: "fact",
      text: "'Superimpositions', a seven-track mini-album on Boomkat Editions (BKEDIT010), followed in 2014 and intensified the pointillistic method.",
      sourceIds: [S.quietusSuper, S.bleepSuper, S.wikipedia],
    },
    {
      id: "claim-stargate",
      kind: "fact",
      text: "Under the alias Stargate he released 'Hexplore Superfluidity' on Hundebiss — a melodic, vocal-sample-driven counterweight to the 'dry and tiring' Quantum Jelly — and appeared as Stargate at the 16th Quadriennale in Rome.",
      sourceIds: [S.prestoInfo, S.fact2016, S.discogs, S.artribune],
    },
    {
      id: "claim-one-circle",
      kind: "fact",
      text: "He is one third of the trio One Circle with Vaghe Stelle (Daniele Mana) and A:RA (Francesco Fantini).",
      sourceIds: [S.prestoInfo, S.rbma, S.discogs],
    },
    {
      id: "claim-le-harmacy",
      kind: "fact",
      text: "Before his solo electronic work he played in the improvisational group Le Harmacy, which released a split cassette with Talibam! in 2007.",
      sourceIds: [S.allmusic, S.itwiki],
    },
    {
      id: "claim-htdw",
      kind: "fact",
      text: "He wrote synth lines on two tracks of How To Dress Well's 2014 album 'What Is This Heart?' (Tom Krell).",
      sourceIds: [S.dummy, S.prestoInfo],
    },
    {
      id: "claim-aat",
      kind: "fact",
      text: "AAT (Advanced Abstract Trance) is a roughly 28-minute multichannel-diffusion composition assembled from breakdowns, falling basses and post-drop regions of trance, hard trance, hardstyle and hardcore; recorded at EMS Stockholm, it premiered at CTM 2015 'Un Tune' at HAU2 in Berlin and was broadcast on ORF's Zeit-Ton in December 2015.",
      sourceIds: [S.fact2015, S.ctm, S.hau, S.shape],
    },
    {
      id: "claim-shape-artist",
      kind: "fact",
      text: "In 2015 he was selected for SHAPE, the EU Creative Europe–funded platform of ICAS-network festivals.",
      sourceIds: [S.tmtShape, S.shape],
    },
    {
      id: "claim-warp-signing",
      kind: "fact",
      text: "Warp Records announced his signing in October 2016, followed by live dates in Glasgow, Montreal, New York, London and Milan.",
      sourceIds: [S.raSigning, S.wikipedia],
    },
    {
      id: "claim-persona",
      kind: "fact",
      text: "'Persona', a six-track EP (WAP394), was released on Warp on 11 November 2016 with cover art taken from Ed Atkins' video 'Ribbons' and a sticker styled on Revelation Records' Japanese-release strips.",
      sourceIds: [S.warpPersona, S.raPersona, S.fact2016, S.npr],
    },
    {
      id: "claim-persona-fact-four",
      kind: "fact",
      text: "FACT ranked Persona number four on its 50 best albums of 2016 list.",
      sourceIds: [S.factList, S.wikipediaPersona],
    },
    {
      id: "claim-prix-ars",
      kind: "fact",
      text: "Persona received an Honorary Mention in the Digital Musics & Sound Art category of the 2017 Prix Ars Electronica.",
      sourceIds: [S.arsPDF, S.lbAgency, S.serralves],
    },
    {
      id: "claim-the-challenge",
      kind: "fact",
      text: "With Francesco Fantini he composed the score for Yuri Ancarani's film 'The Challenge', performed by the Bulgarian National Radio Symphony Orchestra and issued by Warp as a limited 10-inch plus art book (WAP404, 500 copies) with digital release in 2018.",
      sourceIds: [S.faderChallenge, S.ancarani, S.raSigning],
    },
    {
      id: "claim-ancarani-scores",
      kind: "fact",
      text: "He also scored Ancarani's 'Da Vinci' — shown at the 55th Venice Biennale — and 'Atlantide' (Atlantis), the latter soundtrack released on Carosello Records in 2023 with Sick Luke and Fantini.",
      sourceIds: [S.prestoInfo, S.serralves, S.discogs],
    },
    {
      id: "claim-rbma-lecture",
      kind: "fact",
      text: "He gave a two-hour Red Bull Music Academy lecture at Montréal 2016 hosted by Vivian Host, and performed at the 'Dans les Abysses' show diffused through an underwater soundsystem in the Olympic pool.",
      sourceIds: [S.rbma, S.factRbma, S.entertainment],
    },
    {
      id: "claim-xallegrox",
      kind: "fact",
      text: "'XAllegroX / The Shape Of Trance To Come' (WAP406) was released 29 September 2017 as a limited 12-inch in a Warp-purple trance bag; remix album 'The Shape Of RemixXxes To Come' followed in 2018.",
      sourceIds: [S.warpArtist, S.discogs],
    },
    {
      id: "claim-scacco-matto",
      kind: "fact",
      text: "'Scacco Matto' — Italian for checkmate — his first full album for Warp (WARPLP311/WARPCD311), was released 24 April 2020; mixed with Max Casacci, mastered by Matt Colton, with a John Divola cover photograph.",
      sourceIds: [S.bandcampSM, S.warpArtist, S.pitchforkSM, S.guardian],
    },
    {
      id: "claim-canone-infinito",
      kind: "fact",
      text: "'Canone Infinito' is a permanent site-specific sound installation made for the intensive-care corridors of Bergamo's Papa Giovanni XXIII hospital (2019); the related 'Canone Infinito Xtended' EP premiered live at Milan's Auditorium San Fedele and was released by Warp on 24 April 2025.",
      sourceIds: [S.artribune, S.warpCanone, S.bandcampCI],
    },
    {
      id: "claim-institutions",
      kind: "fact",
      text: "His institutional biography lists performances or exhibitions at Centre Pompidou, MACBA, Tate Modern, MAXXI Rome, Serpentine Gallery and Pirelli Hangar Bicocca.",
      sourceIds: [S.serralves, S.artribune, S.rbma],
    },
    // --- stated_belief ---
    {
      id: "claim-avoid-trance",
      kind: "stated_belief",
      text: "Asked whether the 'pointillistic trance' tag cages him, Senni answers: 'trance is exactly the kind of music I'm trying to avoid making.'",
      sourceIds: [S.noisey],
    },
    {
      id: "claim-buildup-expression",
      kind: "stated_belief",
      text: "He argues the build-up is the only part of a trance track where the producer can truly express himself — the kick-and-drum sections are a locked genre formula — and he spent years archiving build-ups before composing.",
      sourceIds: [S.rbma, S.ssense, S.fact2015],
    },
    {
      id: "claim-rave-voyeur",
      kind: "stated_belief",
      text: "He describes his teenage self as a 'rave voyeur': he followed friends to clubs, stayed sober, and observed hedonism at a distance — 'interested to the point of making my nose touch the wall, but not too much.'",
      sourceIds: [S.noisey, S.fact2016, S.warpArtist, S.npr],
    },
    {
      id: "claim-euphoria-recipe",
      kind: "stated_belief",
      text: "Not being a drug user, he says euphoria 'did not come naturally' to him: 'I think I know the recipe to get it, but not in the usual context' — Persona he calls 'a process of searching for euphoria.'",
      sourceIds: [S.fact2016],
    },
    {
      id: "claim-not-fun",
      kind: "stated_belief",
      text: "He rejects 'fun' as a working motive: 'I never had fun putting together a record... to make something that satisfies you should be a bit terrible.'",
      sourceIds: [S.entertainment, S.rbma],
    },
    {
      id: "claim-jp8000-necessity",
      kind: "stated_belief",
      text: "On the Roland JP-8000/JP-8080: 'if I had to approach trance music I had to have that synthesizer' — he told RBMA he is 'obsessed' with it and used it for three consecutive records.",
      sourceIds: [S.fact2015, S.rbma, S.pitchforkPersona],
    },
    {
      id: "claim-chess-method",
      kind: "stated_belief",
      text: "He describes making Scacco Matto as playing chess against himself — every conceptual move answered by an instinctive countermove — balancing a 'coherent, strong, conceptual side' against an 'emotive and instinctive approach.'",
      sourceIds: [S.inverted, S.pitchforkSM],
    },
    {
      id: "claim-straightedge-fashion",
      kind: "stated_belief",
      text: "Of the straight-edge scene he played in: 'For me, I can easily say that it was a fashion thing — rules on how to dress, rules on not drinking. I was not really into the ideal but was really into the music.'",
      sourceIds: [S.fact2015],
    },
    {
      id: "claim-early-works-title",
      kind: "stated_belief",
      text: "On calling a debut 'Early Works': 'it will be early works even in 10 years — it's just objectively my early works' — a deliberately plain title chosen while taking the record seriously.",
      sourceIds: [S.fact2015],
    },
    {
      id: "claim-english-email",
      kind: "stated_belief",
      text: "He says he learned English by writing label emails — hours spent crafting correspondence — because he wanted Presto!? to be international from the start.",
      sourceIds: [S.bandcampDaily],
    },
    {
      id: "claim-mego-irony",
      kind: "stated_belief",
      text: "He names the Mego artists as his biggest influence partly for their ironic self-presentation — 'totally into what they were doing but just, you know, not too much drama.'",
      sourceIds: [S.fact2015],
    },
    // --- pattern ---
    {
      id: "claim-pattern-constraint",
      kind: "pattern",
      text: "Across the trance records the method is constant: one instrument (the JP-8000/8080), one idea per track, no kick drums — constraint itself is the composition.",
      sourceIds: [S.bandcampQJ, S.quietusSuper, S.pitchforkSM, S.npr],
    },
    {
      id: "claim-pattern-withheld-drop",
      kind: "pattern",
      text: "Reviewers across a decade converge on the same description — euphoria with the payoff withheld: PopMatters called Quantum Jelly 'foreplay, not fornication'; the Quietus described trance 'permanently withheld from its own beat drop.'",
      sourceIds: [S.popmatters, S.quietusSuper, S.guardian, S.pitchforkSM],
    },
    {
      id: "claim-pattern-club-gallery",
      kind: "pattern",
      text: "His career runs on two tracks — clubs and festivals (Berghain, CTM, Sónar, Club To Club) alongside art institutions (Centre Pompidou, Tate Modern, MAXXI, the Quadriennale) — with AAT and Canone Infinito explicitly crossing the two.",
      sourceIds: [S.rbma, S.serralves, S.artribune, S.zero],
    },
    {
      id: "claim-pattern-hardcore-lexicon",
      kind: "pattern",
      text: "Track and sleeve details systematically smuggle hardcore-punk grammar into rave typography: X-bracketed titles (XMonsterX, XAllegroX, XBreakingEdgeX), 'One Life, One Chance', 'Dance Tonight Revolution Tomorrow', and Persona's Revelation-Records-colored sticker.",
      sourceIds: [S.discogsQJ, S.raPersona, S.bandcampSM, S.fact2016],
    },
    {
      id: "claim-pattern-press-framing",
      kind: "pattern",
      text: "Press coverage consistently frames him as the conceptualist who made trance critically discussable — 'rave poet' (Guardian), the man who 'explodes trance's liminal spaces' (Crack), 'arch conceptualist' (Pitchfork).",
      sourceIds: [S.guardian, S.pitchforkSM, S.fact2015],
    },
    // --- speculation ---
    {
      id: "claim-spec-straightedge-label",
      kind: "speculation",
      text: "Whether Senni counts as 'straight-edge' is unresolved: label and press bios place him inside the straight-edge hardcore scene and he abstained from drugs and alcohol, but his own account disavows the ideology — the label is more press framing than self-identity.",
      sourceIds: [S.warpArtist, S.fact2015, S.ssense],
    },
    {
      id: "claim-spec-aat-release",
      kind: "speculation",
      text: "AAT appears to have remained a performance piece: the 2015 ORF broadcast was billed as 'perhaps the only' chance to hear it outside a venue, and no commercial release of AAT is documented in this catalog.",
      sourceIds: [S.shape, S.ctm, S.hau],
    },
    {
      id: "claim-spec-persona-format",
      kind: "speculation",
      text: "Persona is consistently an EP in Warp and Resident Advisor usage, yet it landed on album-of-year lists — the EP/album boundary is treated loosely across coverage.",
      sourceIds: [S.warpPersona, S.raPersona, S.factList],
    },
    {
      id: "claim-spec-jp-model",
      kind: "speculation",
      text: "Sources alternate between the JP-8000 keyboard and the JP-8080 rack module; Senni told RBMA the JP-8080 made his 'last three records' while the Quantum Jelly notes name the JP8000 — he likely uses both interchangeably for the same Super Saw voice.",
      sourceIds: [S.rbma, S.bandcampQJ, S.dummy],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1983",
      title: "Born in Cesena, Italy",
      summary:
        "Born in Cesena, Emilia-Romagna; raised in the Cesena–Rimini area on the Adriatic coast.",
      location: "Cesena, Italy",
      sourceIds: [S.wikidata, S.wikipedia, S.serralves],
    },
    {
      id: "event-guitar-bands",
      kind: "role",
      date: "1994",
      title: "Starts guitar, joins punk and hardcore bands",
      summary:
        "Approximate start at age 11–12; by 13–14 he was a tour guitarist for Cesena straight-edge band Out Of Bounds (Good Life Recordings).",
      sourceIds: [S.fact2015],
    },
    {
      id: "event-drums",
      kind: "role",
      date: "2000",
      title: "Switches to drums",
      summary:
        "Around age 17 he took up drums with a jazz teacher, practicing five to six hours daily until about 23.",
      sourceIds: [S.fact2015],
    },
    {
      id: "event-bologna",
      kind: "education",
      date: "2002",
      title: "Studies musicology at DAMS, University of Bologna",
      summary:
        "Approximate start year; commuted by train and discovered early electronic and computer-music pioneers.",
      organization: "University of Bologna",
      sourceIds: [S.fader, S.serralves, S.musikprotokoll],
    },
    {
      id: "event-le-harmacy",
      kind: "project",
      date: "2007",
      title: "Le Harmacy split cassette with Talibam!",
      summary:
        "His improvisational group shared a cassette with the then-unknown Talibam!.",
      sourceIds: [S.allmusic, S.itwiki],
    },
    {
      id: "event-presto",
      kind: "founded",
      date: "2008",
      title: "Founds Presto!? Records",
      summary:
        "Founded with factory-work wages; first release John Hudak's 'On And On'. Abitare dates it August 2008, the label's Bandcamp says September 2008.",
      organization: "Presto!? Records",
      sourceIds: [S.abitare, S.prestoDunno, S.zero, S.bandcampDaily],
    },
    {
      id: "event-early-works",
      kind: "publication",
      date: "2008",
      title: "'Early Works' CD on Presto!?/Kesh Recordings",
      summary:
        "Co-release with Simon Scott's (Slowdive) Kesh label after Senni paid the difference to press a real CD.",
      sourceIds: [S.fact2015, S.discogs, S.allmusic],
    },
    {
      id: "event-dunno",
      kind: "publication",
      date: "2010",
      title: "'Dunno' on Presto!?",
      summary:
        "Abstract computer-music album of pulsar synthesis, mastered by Marcus Schmickler.",
      sourceIds: [S.prestoDunno, S.allmusic],
    },
    {
      id: "event-quantum-jelly",
      kind: "publication",
      date: "2012-10-08",
      title: "'Quantum Jelly' on Editions Mego",
      summary:
        "The record that seeded 'pointillistic trance': one-take JP8000 recordings of isolated trance build-ups.",
      organization: "Editions Mego",
      sourceIds: [S.discogsQJ, S.bandcampQJ, S.popmatters],
    },
    {
      id: "event-stargate",
      kind: "project",
      date: "2013",
      title: "Stargate — 'Hexplore Superfluidity' on Hundebiss",
      summary:
        "Melodic side project with vocal samples; toured Europe in 2013.",
      sourceIds: [S.prestoInfo, S.fact2016, S.discogs],
    },
    {
      id: "event-superimpositions",
      kind: "publication",
      date: "2014",
      title: "'Superimpositions' on Boomkat Editions",
      summary:
        "Seven-track mini-album intensifying the pointillistic-trance method.",
      organization: "Boomkat Editions",
      sourceIds: [S.quietusSuper, S.bleepSuper],
    },
    {
      id: "event-htdw",
      kind: "other",
      date: "2014",
      title: "Synth lines for How To Dress Well's 'What Is This Heart?'",
      summary: "Wrote synth lines on two tracks of Tom Krell's album.",
      sourceIds: [S.dummy, S.prestoInfo],
    },
    {
      id: "event-aat-premiere",
      kind: "project",
      date: "2015-01",
      title: "AAT (Advanced Abstract Trance) world premiere at CTM 'Un Tune'",
      summary:
        "Multichannel-diffusion piece built from trance breakdowns, premiered at HAU2, Berlin; his own site lists 30 January, the CTM archive lists Saturday 31 January 2015.",
      location: "Berlin",
      organization: "CTM Festival / HAU2",
      sourceIds: [S.ctm, S.hau, S.fact2015],
    },
    {
      id: "event-shape",
      kind: "role",
      date: "2015",
      title: "Selected for the SHAPE platform",
      summary:
        "One of the first-year artists of the EU Creative Europe–funded ICAS platform.",
      organization: "SHAPE",
      sourceIds: [S.tmtShape, S.shape],
    },
    {
      id: "event-warp-signing",
      kind: "milestone",
      date: "2016-10",
      title: "Signs to Warp Records",
      summary:
        "Announced mid-October 2016 with a run of live dates including RBMA shows in Glasgow and Montreal.",
      organization: "Warp Records",
      sourceIds: [S.raSigning],
    },
    {
      id: "event-rbma-lecture",
      kind: "media",
      date: "2016-10-25",
      title: "RBMA Montréal lecture with Vivian Host",
      summary:
        "Two-hour public conversation; he also performed at the 'Dans les Abysses' underwater-soundsystem event at the Olympic pool.",
      location: "Montreal",
      organization: "Red Bull Music Academy",
      sourceIds: [S.rbma, S.factRbma, S.entertainment],
    },
    {
      id: "event-persona",
      kind: "publication",
      date: "2016-11-11",
      title: "'Persona' EP on Warp (WAP394)",
      summary:
        "Six tracks, Ed Atkins cover art; FACT's number-four album of 2016.",
      organization: "Warp Records",
      sourceIds: [S.warpPersona, S.raPersona, S.factList],
    },
    {
      id: "event-prix-ars",
      kind: "award",
      date: "2017",
      title: "Prix Ars Electronica Honorary Mention for 'Persona'",
      summary:
        "Honorary Mention in Digital Musics & Sound Art at the 2017 Prix Ars Electronica.",
      organization: "Ars Electronica",
      sourceIds: [S.arsPDF, S.lbAgency],
    },
    {
      id: "event-xallegrox",
      kind: "publication",
      date: "2017-09-29",
      title: "'XAllegroX / The Shape Of Trance To Come' 12-inch (WAP406)",
      summary: "Limited-edition Warp single in a purple trance bag.",
      organization: "Warp Records",
      sourceIds: [S.warpArtist, S.discogs],
    },
    {
      id: "event-challenge-ost",
      kind: "publication",
      date: "2018",
      title: "'The Challenge' soundtrack with Francesco Fantini",
      summary:
        "Orchestral score for Yuri Ancarani's falconry documentary; Warp limited 10-inch plus art book (WAP404), digital 2018.",
      sourceIds: [S.ancarani, S.faderChallenge],
    },
    {
      id: "event-remixxxes",
      kind: "publication",
      date: "2018",
      title: "'The Shape Of RemixXxes To Come' on Warp",
      summary: "Remix album revisiting the Persona-era material.",
      organization: "Warp Records",
      sourceIds: [S.warpArtist, S.discogs],
    },
    {
      id: "event-canone-installation",
      kind: "exhibition",
      date: "2019",
      title: "'Canone Infinito' permanent installation, Bergamo",
      summary:
        "Site-specific sound work for the intensive-care corridors of Papa Giovanni XXIII hospital.",
      location: "Bergamo, Italy",
      sourceIds: [S.artribune],
    },
    {
      id: "event-scacco-matto",
      kind: "publication",
      date: "2020-04-24",
      title: "'Scacco Matto' on Warp",
      summary:
        "First full-length album for Warp; promoted with a virtual chess challenge against fans.",
      organization: "Warp Records",
      sourceIds: [S.bandcampSM, S.pitchforkSM, S.guardian],
    },
    {
      id: "event-atlantide",
      kind: "publication",
      date: "2023",
      title: "'Atlantide' soundtrack with Sick Luke and Francesco Fantini",
      summary:
        "Score for Ancarani's film, released on Carosello Records.",
      sourceIds: [S.discogs, S.serralves],
    },
    {
      id: "event-canone-xtended",
      kind: "publication",
      date: "2025-04-24",
      title: "'Canone Infinito Xtended' EP on Warp",
      summary:
        "Forty-minute set of variations on the Canone Infinito theme, premiered at Auditorium San Fedele, Milan.",
      organization: "Warp Records",
      sourceIds: [S.warpCanone, S.bandcampCI],
    },
  ],
  themes: [
    {
      id: "theme-trance-deconstruction",
      kind: "philosophy",
      status: "stated",
      title: "Deconstructing trance",
      summary:
        "Take the genre critics mocked, isolate its most expressive element — the build-up — and repeat it without the kick, the drop, or the payoff. Appropriation as analysis: he went through thousands of tracks and archived build-ups before writing a note.",
      sourceIds: [S.fact2015, S.ssense, S.rbma, S.prestoInfo],
    },
    {
      id: "theme-pointillistic-method",
      kind: "method",
      status: "stated",
      title: "Pointillistic trance",
      summary:
        "His self-coined method: start from 'the shortest sound that satisfies me,' open the envelope slightly, and build stuttering arpeggio dots that never resolve into a beat.",
      sourceIds: [S.rbma, S.dummy, S.entertainment, S.bandcampQJ],
    },
    {
      id: "theme-tension-withheld-release",
      kind: "method",
      status: "reported",
      title: "Euphoria without the drop",
      summary:
        "Critics hear permanent foreplay: tension ratchets upward and the release never lands. PopMatters called it 'foreplay, not fornication'; the Quietus heard 'eternal instants'; the Guardian asked 'why even have beats at all?'",
      sourceIds: [S.popmatters, S.quietusSuper, S.guardian, S.pitchforkSM],
    },
    {
      id: "theme-rave-voyeur",
      kind: "belief",
      status: "stated",
      title: "The rave voyeur",
      summary:
        "Sobriety as vantage point: he went to superclubs with gabber friends, stayed clean, drove them home, and studied the ecstasy from outside. Persona literalized it in Ed Atkins' peephole cover figure.",
      sourceIds: [S.noisey, S.fact2016, S.npr, S.warpArtist],
    },
    {
      id: "theme-constraint",
      kind: "method",
      status: "stated",
      title: "Self-imposed limits",
      summary:
        "Composition as rule-play: one synthesizer, one idea per track, and on Scacco Matto a literal chess match of moves and countermoves against himself — 'minimalism on steroids' as the Canone Infinito material was later billed.",
      sourceIds: [S.inverted, S.pitchforkSM, S.warpCanone],
    },
    {
      id: "theme-single-synth",
      kind: "practice",
      status: "stated",
      title: "One instrument: the JP-8000/JP-8080 Super Saw",
      summary:
        "The Roland JP-8000/8080 — the hardware voice of '90s trance — is tool, subject, and constraint at once. 'If I had to approach trance music I had to have that synthesizer.'",
      sourceIds: [S.fact2015, S.rbma, S.pitchforkPersona, S.dummy],
    },
    {
      id: "theme-hardcore-discipline",
      kind: "influence",
      status: "stated",
      title: "Hardcore discipline, not hardcore ideology",
      summary:
        "The straight-edge scene gave him practice ethics, syncopated chord attacks, and a visual lexicon (X-titles, Revelation-colored stickers) — but he kept the discipline while disavowing the rules.",
      sourceIds: [S.fact2015, S.fact2016, S.ssense, S.rbma],
    },
    {
      id: "theme-club-critique",
      kind: "philosophy",
      status: "reported",
      title: "Anthropology of the dancefloor",
      summary:
        "Critics frame his work as a structuralist critique of club culture and instant gratification — a study of what trance's tropes do to bodies, conducted by an outsider who never used them as intended.",
      sourceIds: [S.quietusSuper, S.fact2015, S.noisey, S.guardian],
    },
    {
      id: "theme-irony",
      kind: "belief",
      status: "stated",
      title: "Irony without drama",
      summary:
        "Inherited from the Mego lineage: total commitment to the work, zero solemnity about it — from naming a debut 'Early Works' to playing the 'sadistic scientist' role the press invented for him.",
      sourceIds: [S.fact2015, S.dummy, S.prestoInfo],
    },
    {
      id: "theme-club-and-gallery",
      kind: "practice",
      status: "reported",
      title: "Between the club and the museum",
      summary:
        "He moves between Berghain booths and Centre Pompidou floors without adjusting the premise — AAT toured as multichannel concert diffusion; Canone Infinito lives permanently in a hospital corridor.",
      sourceIds: [S.rbma, S.serralves, S.artribune, S.ctm],
    },
  ],
  works: [
    {
      id: "work-le-harmacy-split",
      kind: "recording",
      status: "released",
      title: "Le Harmacy / Talibam! split cassette",
      date: "2007",
      summary:
        "Split cassette from his improvisational group Le Harmacy with the then-unknown Talibam!.",
      sourceIds: [S.allmusic, S.itwiki],
    },
    {
      id: "work-presto",
      kind: "project",
      status: "ongoing",
      title: "Presto!? Records",
      date: "2008",
      summary:
        "His Milan-based label — 'touching extremes since 2008' — releasing computer music, noise, field recordings and left-field club music; design largely by Senni.",
      sourceIds: [S.prestoDunno, S.abitare, S.bandcampDaily, S.zero],
    },
    {
      id: "work-early-works",
      kind: "recording",
      status: "released",
      title: "Early Works",
      date: "2008",
      summary:
        "Debut CD co-released by Presto!? and Kesh Recordings (Simon Scott of Slowdive); Fennesz-indebted laptop vignettes.",
      sourceIds: [S.fact2015, S.discogs, S.allmusic],
    },
    {
      id: "work-dunno",
      kind: "recording",
      status: "released",
      title: "Dunno",
      date: "2010",
      summary:
        "Second album on Presto!? — pulsar-synthesis computer music mastered by Marcus Schmickler.",
      sourceIds: [S.prestoDunno, S.allmusic],
    },
    {
      id: "work-quantum-jelly",
      kind: "recording",
      status: "released",
      title: "Quantum Jelly",
      date: "2012-10-08",
      summary:
        "Editions Mego LP (eMEGO 152) that defined 'pointillistic trance'; one-take JP8000 performances, Anne de Vries cover.",
      sourceIds: [S.bandcampQJ, S.discogsQJ, S.popmatters],
    },
    {
      id: "work-hexplore",
      kind: "recording",
      status: "released",
      title: "Hexplore Superfluidity (as Stargate)",
      date: "2013",
      summary:
        "Melodic, vocal-sample-led side project released on Hundebiss; Japan, cyberpunk and anime influences.",
      sourceIds: [S.prestoInfo, S.fact2016],
    },
    {
      id: "work-superimpositions",
      kind: "recording",
      status: "released",
      title: "Superimpositions",
      date: "2014",
      summary:
        "Boomkat Editions mini-LP (BKEDIT010) — the pointillistic method broadened into song structures.",
      sourceIds: [S.quietusSuper, S.bleepSuper],
    },
    {
      id: "work-htdw",
      kind: "other",
      status: "completed",
      title: "Synth lines on How To Dress Well's 'What Is This Heart?'",
      date: "2014",
      summary: "Senni wrote synth lines for two tracks of Tom Krell's album.",
      sourceIds: [S.dummy, S.prestoInfo],
    },
    {
      id: "work-aat",
      kind: "project",
      status: "completed",
      title: "AAT (Advanced Abstract Trance)",
      date: "2015",
      summary:
        "Multichannel-diffusion composition of trance breakdowns and post-drop regions, recorded at EMS Stockholm; premiered at CTM 2015 (HAU2), later performed at musikprotokoll Graz, Artefact Leuven, the Quadriennale and Serralves, with strobe lights and CO2 cannons.",
      sourceIds: [S.fact2015, S.ctm, S.hau, S.shape, S.serralves, S.artribune],
    },
    {
      id: "work-persona",
      kind: "recording",
      status: "released",
      title: "Persona EP",
      date: "2016-11-11",
      summary:
        "Warp debut (WAP394); six tracks, Ed Atkins cover, FACT's number-four record of 2016, Prix Ars Electronica Honorary Mention.",
      sourceIds: [S.warpPersona, S.raPersona, S.factList, S.arsPDF],
    },
    {
      id: "work-xallegrox",
      kind: "recording",
      status: "released",
      title: "XAllegroX / The Shape Of Trance To Come",
      date: "2017-09-29",
      summary: "Limited Warp 12-inch (WAP406) in a purple trance bag.",
      sourceIds: [S.warpArtist, S.discogs],
    },
    {
      id: "work-challenge-ost",
      kind: "recording",
      status: "released",
      title: "The Challenge (original soundtrack, with Francesco Fantini)",
      date: "2018",
      summary:
        "Orchestral score for Yuri Ancarani's falconry film, played by the Bulgarian National Radio Symphony Orchestra; Warp WAP404 limited 10-inch plus art book.",
      sourceIds: [S.faderChallenge, S.ancarani],
    },
    {
      id: "work-remixxxes",
      kind: "recording",
      status: "released",
      title: "The Shape Of RemixXxes To Come",
      date: "2018",
      summary: "Warp remix album extending the Persona-era material.",
      sourceIds: [S.warpArtist, S.discogs],
    },
    {
      id: "work-canone-infinito",
      kind: "project",
      status: "completed",
      title: "Canone Infinito",
      date: "2019",
      location: "Bergamo, Italy",
      summary:
        "Permanent site-specific sound installation for the intensive-care corridors of the Papa Giovanni XXIII hospital.",
      sourceIds: [S.artribune],
    },
    {
      id: "work-scacco-matto",
      kind: "recording",
      status: "released",
      title: "Scacco Matto",
      date: "2020-04-24",
      summary:
        "First Warp full-length (WARPLP311); 'checkmate' — a chess match of self-imposed rules, John Divola cover.",
      sourceIds: [S.bandcampSM, S.pitchforkSM, S.quietusSM],
    },
    {
      id: "work-atlantide",
      kind: "recording",
      status: "released",
      title: "Atlantide (original soundtrack)",
      date: "2023",
      summary:
        "Score for Ancarani's film with Sick Luke and Francesco Fantini, released on Carosello Records.",
      sourceIds: [S.discogs, S.serralves],
    },
    {
      id: "work-canone-xtended",
      kind: "recording",
      status: "released",
      title: "Canone Infinito Xtended EP",
      date: "2025-04-24",
      summary:
        "Forty minutes of variations on the Canone Infinito theme, premiered at Auditorium San Fedele, Milan; Warp WAPDE507.",
      sourceIds: [S.warpCanone, S.bandcampCI],
    },
  ],
  appearances: [
    {
      id: "appearance-fader-2014",
      title: "Milan Calling: Lorenzo Senni and Friends",
      venue: "The FADER",
      publishedAt: "2014-09-02",
      participants: ["Lorenzo Senni", "Simone Trabucchi"],
      summary:
        "Feature interview on Milan's underground, the Presto!? and Hundebiss labels, and his commute to Bologna for musicology.",
      media: [
        {
          type: "article",
          url: "https://www.thefader.com/2014/09/02/milan-lorenzo-senni-interview",
          sourceId: S.fader,
        },
      ],
      sourceIds: [S.fader],
    },
    {
      id: "appearance-dummy",
      title: "Dummy Mix 229",
      venue: "Dummy",
      publishedAt: "2014",
      participants: ["Lorenzo Senni"],
      summary:
        "Mix and Q&A ahead of Club To Club: his trance-build-up archive, JP-8000/JP-8080 presets, Waldorf and TB-303 additions, and the post-Quantum-Jelly direction.",
      media: [
        {
          type: "article",
          url: "https://dmy.co/mix/dummy-mix-229-lorenzo-senni-interview",
          sourceId: S.dummy,
        },
      ],
      sourceIds: [S.dummy],
    },
    {
      id: "appearance-fact-2015",
      title:
        "Lorenzo Senni talks hardcore, cyberpunk and appropriating dance music's most reviled genre",
      venue: "FACT",
      publishedAt: "2015-02-23",
      participants: ["Lorenzo Senni"],
      summary:
        "Career-spanning interview from EMS Stockholm: Out Of Bounds and the straight-edge scene, drums as salvation, factory summers funding Presto!?, and recording AAT on the Buchla.",
      media: [
        {
          type: "article",
          url: "https://www.factmag.com/2015/02/23/trance-im-trance-now-lorenzo-senni-talks-hardcore-cyberpunk-appropriating-dance-musics-reviled-genre/",
          sourceId: S.fact2015,
        },
      ],
      sourceIds: [S.fact2015],
    },
    {
      id: "appearance-aat-ctm",
      title: "AAT (Advanced Abstract Trance) — world premiere",
      venue: "CTM 2015 'Un Tune', HAU2, Berlin",
      publishedAt: "2015-01",
      participants: ["Lorenzo Senni"],
      summary:
        "Multichannel live diffusion of trance breakdowns with strobes and CO2 cannons, on a SHAPE-presented bill with Electric Indigo.",
      sourceIds: [S.ctm, S.hau],
    },
    {
      id: "appearance-fact-2016",
      title: "Lorenzo Senni is the Warp rave voyeur reaching for euphoria on Persona",
      venue: "FACT",
      publishedAt: "2016-10-25",
      participants: ["Lorenzo Senni", "John Twells"],
      summary:
        "Persona interview: the Ed Atkins cover, Revelation-Records sticker colors, chords from hardcore, and 'searching for euphoria' without drugs.",
      media: [
        {
          type: "article",
          url: "https://www.factmag.com/2016/10/25/lorenzo-senni-persona-warp-interview/",
          sourceId: S.fact2016,
        },
      ],
      sourceIds: [S.fact2016],
    },
    {
      id: "appearance-rbma",
      title: "RBMA Montréal 2016 lecture",
      venue: "Red Bull Music Academy",
      publishedAt: "2016-10-25",
      participants: ["Lorenzo Senni", "Vivian Host"],
      summary:
        "Two-hour lecture on the JP-8080, gabber friends vs hardcore bandmates, and how studying drums 'saved' him; he also performed at the Dans les Abysses pool event.",
      media: [
        {
          type: "video",
          url: "https://www.redbullmusicacademy.com/lectures/lorenzo-senni-lecture/",
          sourceId: S.rbma,
        },
      ],
      sourceIds: [S.rbma, S.factRbma],
    },
    {
      id: "appearance-noisey",
      title: "Talking Persona, Place, and Production With Lorenzo Senni",
      venue: "Noisey / VICE",
      publishedAt: "2017-02-14",
      participants: ["Lorenzo Senni", "Francesco Tenaglia"],
      summary:
        "Noisey Italia interview: Cocoricò, the 'shitty review in The Wire,' the Ed Atkins connection via Hans Ulrich Obrist, and avoiding trance.",
      media: [
        {
          type: "article",
          url: "https://www.vice.com/en/article/lorenzo-senni-noisey-italy-interview/",
          sourceId: S.noisey,
        },
      ],
      sourceIds: [S.noisey],
    },
    {
      id: "appearance-ssense",
      title: "Lorenzo Senni: Discipline of Enthusiasm",
      venue: "SSENSE",
      publishedAt: "2020",
      participants: ["Lorenzo Senni", "Philip Sherburne"],
      summary:
        "Scacco Matto-era interview on the bomber jacket bridging hardcore punk and hardcore techno, designated-driver sobriety, and archiving build-ups.",
      media: [
        {
          type: "article",
          url: "https://www.ssense.com/en-us/editorial/music/lorenzo-senni-discipline-of-enthusiasm",
          sourceId: S.ssense,
        },
      ],
      sourceIds: [S.ssense],
    },
    {
      id: "appearance-inverted",
      title: "Pointillistic Trance: Lorenzo Senni talks 'Scacco Matto' LP",
      venue: "Inverted Audio",
      publishedAt: "2020",
      participants: ["Lorenzo Senni", "Esme Bennett"],
      summary:
        "Scacco Matto interview on the chess-game writing process and self-imposed limits.",
      media: [
        {
          type: "article",
          url: "https://inverted-audio.com/feature/pointillistic-trance-lorenzo-senni-talks-scacco-matto-lp/",
          sourceId: S.inverted,
        },
      ],
      sourceIds: [S.inverted],
    },
    {
      id: "appearance-boiler",
      title: "The Science of Sound: Delay with Lorenzo Senni",
      venue: "Boiler Room & Genelec",
      participants: ["Lorenzo Senni"],
      summary:
        "16mm short film he hosts for Genelec's 40th-anniversary series on production concepts.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=3gEu1JU1a3w",
          sourceId: S.boiler,
        },
      ],
      sourceIds: [S.boiler],
    },
  ],
  relations: [
    {
      id: "rel-founded-presto",
      kind: "founded",
      target: "presto-records",
      targetName: "Presto!? Records",
      targetKind: "organization",
      note: "Founded the Milan label in 2008 with factory-work wages; Abitare dates it August, the label's Bandcamp says September.",
      sourceIds: [S.prestoDunno, S.abitare, S.bandcampDaily, S.zero],
    },
    {
      id: "rel-member-warp",
      kind: "member_of",
      target: "warp-records",
      targetName: "Warp Records",
      targetKind: "organization",
      note: "Signed artist since October 2016 — Persona, Scacco Matto and the Canone Infinito Xtended EP all carry Warp catalog numbers.",
      sourceIds: [S.raSigning, S.wikipedia, S.warpArtist],
    },
    {
      id: "rel-member-one-circle",
      kind: "member_of",
      target: "one-circle",
      targetName: "One Circle",
      targetKind: "organization",
      note: "One third of the trio One Circle with Vaghe Stelle (Daniele Mana) and A:RA (Francesco Fantini).",
      sourceIds: [S.prestoInfo, S.rbma, S.discogs],
    },
    {
      id: "rel-member-le-harmacy",
      kind: "member_of",
      target: "le-harmacy",
      targetName: "Le Harmacy",
      targetKind: "organization",
      note: "Played in the improvisational group Le Harmacy, which shared a 2007 split cassette with Talibam!.",
      sourceIds: [S.allmusic, S.itwiki],
    },
    {
      id: "rel-member-out-of-bounds",
      kind: "member_of",
      target: "out-of-bounds",
      targetName: "Out Of Bounds",
      targetKind: "organization",
      note: "Tour guitarist at about 13–14 for the Cesena straight-edge band that released on Good Life Recordings.",
      sourceIds: [S.fact2015],
    },
    {
      id: "rel-member-shape",
      kind: "member_of",
      target: "shape",
      targetName: "SHAPE",
      targetKind: "organization",
      note: "Selected for the 2015 cohort of SHAPE, the EU Creative Europe–funded ICAS platform of festivals.",
      sourceIds: [S.tmtShape, S.shape],
    },
    {
      id: "rel-collab-simone-trabucchi",
      kind: "collaborated",
      target: "simone-trabucchi",
      targetName: "Simone Trabucchi (Hundebiss Records)",
      note: "Ran a Milan basement concert space with Trabucchi for about two years; later released the Stargate record on his Hundebiss label.",
      sourceIds: [S.crack, S.fader, S.prestoInfo],
    },
    {
      id: "rel-collab-francesco-fantini",
      kind: "collaborated",
      target: "francesco-fantini",
      targetName: "Francesco Fantini (A:RA)",
      note: "One Circle bandmate and co-composer of the Ancarani scores 'The Challenge' and 'Atlantide'.",
      sourceIds: [S.prestoInfo, S.ancarani, S.faderChallenge, S.discogs],
    },
    {
      id: "rel-collab-daniele-mana",
      kind: "collaborated",
      target: "daniele-mana",
      targetName: "Daniele Mana (Vaghe Stelle)",
      note: "One Circle bandmate.",
      sourceIds: [S.prestoInfo, S.rbma, S.discogs],
    },
    {
      id: "rel-collab-yuri-ancarani",
      kind: "collaborated",
      target: "yuri-ancarani",
      targetName: "Yuri Ancarani",
      note: "Scored Ancarani's films 'The Challenge', 'Da Vinci' and 'Atlantide' with Francesco Fantini.",
      sourceIds: [S.ancarani, S.faderChallenge, S.serralves],
    },
    {
      id: "rel-collab-tom-krell",
      kind: "collaborated",
      target: "tom-krell",
      targetName: "Tom Krell (How To Dress Well)",
      note: "Wrote synth lines on two tracks of How To Dress Well's 2014 album 'What Is This Heart?'.",
      sourceIds: [S.dummy, S.prestoInfo],
    },
    {
      id: "rel-collab-sick-luke",
      kind: "collaborated",
      target: "sick-luke",
      targetName: "Sick Luke",
      note: "Co-credited on the 2023 'Atlantide' soundtrack released on Carosello Records.",
      sourceIds: [S.discogs, S.serralves],
    },
    {
      id: "rel-collab-max-casacci",
      kind: "collaborated",
      target: "max-casacci",
      targetName: "Max Casacci",
      note: "Mixed 'Scacco Matto' with Senni at Andromeda Studio.",
      sourceIds: [S.bandcampSM],
    },
    {
      id: "rel-collab-matt-colton",
      kind: "collaborated",
      target: "matt-colton",
      targetName: "Matt Colton",
      note: "Mastered 'Scacco Matto'.",
      sourceIds: [S.bandcampSM],
    },
    {
      id: "rel-collab-marcus-schmickler",
      kind: "collaborated",
      target: "marcus-schmickler",
      targetName: "Marcus Schmickler",
      note: "Mastered 'Dunno' (2010); also part of the Presto!? roster.",
      sourceIds: [S.prestoDunno, S.allmusic],
    },
    {
      id: "rel-collab-simon-scott",
      kind: "collaborated",
      target: "simon-scott",
      targetName: "Simon Scott (Slowdive / Kesh Recordings)",
      note: "'Early Works' was a co-release between Presto!? and Scott's Kesh label after Senni paid the difference to press a real CD.",
      sourceIds: [S.fact2015, S.discogs, S.allmusic],
    },
    {
      id: "rel-collab-talibam",
      kind: "collaborated",
      target: "talibam",
      targetName: "Talibam!",
      targetKind: "organization",
      note: "His group Le Harmacy shared a 2007 split cassette with the then-unknown Talibam!.",
      sourceIds: [S.allmusic, S.itwiki],
    },
    {
      id: "rel-collab-john-hudak",
      kind: "collaborated",
      target: "john-hudak",
      targetName: "John Hudak",
      note: "John Hudak's 'On And On' was the first Presto!? release.",
      sourceIds: [S.zero, S.prestoInfo],
    },
    {
      id: "rel-collab-anne-de-vries",
      kind: "collaborated",
      target: "anne-de-vries",
      targetName: "Anne de Vries",
      note: "Cover artist for 'Quantum Jelly'.",
      sourceIds: [S.bandcampQJ],
    },
    {
      id: "rel-collab-ed-atkins",
      kind: "collaborated",
      target: "ed-atkins",
      targetName: "Ed Atkins",
      note: "Persona's cover is taken from Atkins' video 'Ribbons'; the Noisey interview discusses the connection via Hans Ulrich Obrist.",
      sourceIds: [S.warpPersona, S.fact2016, S.noisey],
    },
    {
      id: "rel-collab-florian-hecker",
      kind: "collaborated",
      target: "florian-hecker",
      targetName: "Florian Hecker",
      note: "Presto!? released Hecker's records; Senni discovered his computer music while studying at DAMS.",
      sourceIds: [S.zero, S.raSigning, S.fader],
    },
    {
      id: "rel-influenced-mego",
      kind: "influenced_by",
      target: "mego",
      targetName: "Mego / Editions Mego roster",
      targetKind: "organization",
      note: "He names the Mego artists as his biggest influence, partly for their ironic self-presentation; Quantum Jelly later appeared on Editions Mego.",
      sourceIds: [S.fact2015, S.bandcampQJ],
    },
    {
      id: "rel-intv-john-twells",
      kind: "interviewed_by",
      target: "john-twells",
      targetName: "John Twells",
      note: "FACT's 2016 Persona interview.",
      sourceIds: [S.fact2016],
    },
    {
      id: "rel-intv-francesco-tenaglia",
      kind: "interviewed_by",
      target: "francesco-tenaglia",
      targetName: "Francesco Tenaglia",
      note: "Noisey Italia interview, February 2017.",
      sourceIds: [S.noisey],
    },
    {
      id: "rel-intv-philip-sherburne",
      kind: "interviewed_by",
      target: "philip-sherburne",
      targetName: "Philip Sherburne",
      note: "SSENSE 'Discipline of Enthusiasm' interview, 2020.",
      sourceIds: [S.ssense],
    },
    {
      id: "rel-intv-esme-bennett",
      kind: "interviewed_by",
      target: "esme-bennett",
      targetName: "Esme Bennett",
      note: "Inverted Audio 'Pointillistic Trance' Scacco Matto interview, 2020.",
      sourceIds: [S.inverted],
    },
    {
      id: "rel-intv-vivian-host",
      kind: "interviewed_by",
      target: "vivian-host",
      targetName: "Vivian Host",
      note: "Hosted the two-hour RBMA Montréal 2016 lecture-conversation.",
      sourceIds: [S.rbma],
    },
  ],
  openQuestions: [
    "Birthplace conflict: Wikidata, Wikipedia and institutional bios say Cesena (1983); AllMusic's biography says Milan. Cesena is better evidenced; Milan is his adopted city and may have been conflated.",
    "Presto!?'s founding month is given as August 2008 in a 2009 Abitare profile but September 2008 on the label's own Bandcamp page.",
    "AAT's release status is unresolved: documented as a 2015 premiere, festival performances and a one-off ORF broadcast ('perhaps the only' chance to hear it), but Serralves dates its completion to 2017 and no commercial issue is confirmed in this catalog.",
    "Whether to call him 'straight-edge': press and label bios put him inside the straight-edge scene and he abstained, but he told FACT he was never into the ideology — self-description versus press framing.",
    "Sources alternate between the JP-8000 keyboard and JP-8080 rack module as the trance-records instrument; the exact split per record is not documented.",
    "The precise relationship between the 2019 'Canone Infinito' hospital installation and the 2025 'Canone Infinito Xtended' EP — shared recordings versus re-composed material — is not detailed in the cited record.",
    "Superimpositions' date is inconsistent across catalogs: reviewed September 2014 (vinyl) while Bleep's digital listing shows 23 October 2015.",
    "Details of the Le Harmacy split cassette with Talibam! (2007) rest on AllMusic and the Italian Wikipedia entry only.",
  ],
  body: `Lorenzo Senni is an Italian electronic musician who built a career out of a single, disciplined provocation: take 1990s trance — for years the most ridiculed genre in dance music — remove the kick drum and the drop, and keep only the build-up. He named the method "pointillistic trance," and across a decade and a half he has carried it from noise-label CD-R culture to Warp Records and into museum and hospital spaces.

## Origins: between the punks and the gabber kids

Born in 1983 in Cesena, in Italy's Emilia-Romagna, Senni grew up between two subcultures that did not mix. On the Adriatic coast near Rimini — home of Italo disco and later of gabber — his closest friends were "gabber warriors" who dragged him to superclubs like Cocoricò. At school he played guitar in punk and hardcore bands, touring with Cesena straight-edge group Out Of Bounds (Good Life Recordings). He was, by his own account, the only member not into the straight-edge ideal — "for me it was a fashion thing" — yet he stayed sober at raves and drove his friends home. That double position, participant and observer, became his signature stance: the "rave voyeur," as the Warp biography and his own interviews put it. At seventeen he switched to drums, practicing five to six hours a day under a jazz teacher — "this also saved my life" (FACT, 2015).

He studied musicology at DAMS, University of Bologna, commuting daily by train, and discovered computer music — Florian Hecker, David Tudor, Xenakis — rather than Aphex Twin. In Milan he and Simone Trabucchi (Hundebiss Records) ran an illegal basement venue hosting Wolf Eyes, Peaking Lights and Kode9 (Crack; The FADER). In 2008 he founded Presto!? with wages saved from summers hauling 25-kilo seed bags in a factory; the first release was John Hudak's "On And On," and the roster grew to include Hecker, DJ Stingray, Palmistry, EVOL, Marcus Schmickler and Theo Burt (Bandcamp Daily; Zero; Abitare).

## The method

Senni's own early records — "Early Works" (2008, with Simon Scott's Kesh) and "Dunno" (2010) — were abstract computer music. The turn came when he began cutting build-ups out of his friends' trance records and archiving them. The build-up, he argues, is the only place in trance's locked formula where a producer can actually express himself; the kick-and-drop parts are closed grammar (RBMA lecture, 2016; SSENSE). "Quantum Jelly" (Editions Mego, 2012) rendered that insight literally: five one-take performances on a computer-controlled Roland JP8000 — the hardware Super Saw that defined trance's sound — with no overdubs and no drums. "Superimpositions" (Boomkat Editions, 2014) intensified it. Critics reached for the same metaphors: "foreplay, not fornication" (PopMatters), trance "permanently withheld from its own beat drop" (The Quietus).

He insists he is not a trance artist — "trance is exactly the kind of music I'm trying to avoid making" (Noisey) — and not a trance expert either: "They think I'm a master, but I don't know much about it." What he knows is structure: tension, expectation, and the euphoria recipe he had to reverse-engineer because, not using drugs, it "did not come naturally" (FACT, 2016).

## Warp and after

Warp announced his signing in October 2016 (Resident Advisor). "Persona" (WAP394, November 2016) added hardcore-derived chords, verses and choruses to the arpeggios, wrapped in an Ed Atkins peephole image and a sticker in Revelation Records colors — the hardcore label's Japanese-release stripes, an in-joke "nobody's gonna get" (FACT). FACT ranked it fourth in its albums of 2016, and it took an Honorary Mention at the 2017 Prix Ars Electronica. "Scacco Matto" (2020) — "checkmate" — was composed as a chess game against himself, every conceptual move answered by an instinctive countermove (Inverted Audio; Pitchfork). With Francesco Fantini he also scored Yuri Ancarani's films, including "The Challenge" — played by the Bulgarian National Radio Symphony Orchestra — "Da Vinci," and "Atlantide."

Parallel to the records runs an art practice. AAT (Advanced Abstract Trance), recorded at EMS Stockholm, premiered at CTM 2015 as a multichannel diffusion of breakdowns and post-drop wreckage, staged with strobes and CO2 cannons. "Canone Infinito" is a permanent sound installation in the intensive-care corridors of Bergamo's Papa Giovanni XXIII hospital; its concert variant became the "Canone Infinito Xtended" EP (Warp, 2025). Institutional bios list Centre Pompidou, MACBA, Tate Modern, MAXXI, the Serpentine and Pirelli Hangar Bicocca among his venues — the same CV that includes Berghain.

## What the record does not settle

The seams are documented rather than smoothed: Cesena versus Milan as birthplace (AllMusic alone says Milan); August versus September 2008 for Presto!?; the JP-8000 versus JP-8080 credited for the trance records; AAT's completion date (2015 premiere versus a 2017 date on the Serralves bio) and whether it was ever commercially issued. And "straight-edge" itself is contested ground — the scene was his, the ideology was not, though the sobriety was real enough to make him the designated driver.

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
