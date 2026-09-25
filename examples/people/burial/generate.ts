#!/usr/bin/env bun
/** Generate examples/people/burial/person-index.json with derived source ids. */

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

// --- Reference -------------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Burial (Q552245)",
  url: "https://www.wikidata.org/wiki/Q552245",
  publisher: "Wikidata",
  notes:
    "Wikidata entity for Burial; carries the reported real name William Emmanuel Bevan.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Burial (musician)",
  url: "https://en.wikipedia.org/wiki/Burial_(musician)",
  publisher: "Wikipedia",
  notes:
    "Main biographical reference; the identity, Mercury, and collaboration chronology are corroborated by primary reporting elsewhere in this catalog.",
});
const wikiAlbum = source({
  binding: "reference",
  mediaType: "article",
  title: "Burial (Burial album)",
  url: "https://en.wikipedia.org/wiki/Burial_(Burial_album)",
  publisher: "Wikipedia",
  notes:
    "Release date (15 May 2006), recording window 2001-2006, Sound Forge production, the 2002 CD-R approach to Kode9, and the Wire Rewind 2006 critics' poll win.",
});
const wikiUntrue = source({
  binding: "reference",
  mediaType: "article",
  title: "Untrue (album)",
  url: "https://en.wikipedia.org/wiki/Untrue_(album)",
  publisher: "Wikipedia",
  notes:
    "Release date (5 November 2007) and the accolade ledger: FACT's album of the decade, Resident Advisor's #3 of the 2000s, The Wire's 2007 Rewind #2, NPR's 50 most important recordings.",
});
const wikiDisco = source({
  binding: "reference",
  mediaType: "article",
  title: "Burial discography",
  url: "https://en.wikipedia.org/wiki/Burial_discography",
  publisher: "Wikipedia",
  notes:
    "Discography cross-check: two studio albums, sixteen EPs, compilations and singles; Untrue's UK chart peak (#58) and the ~1004% sales jump after the Mercury ceremony.",
});
const wikiKindred = source({
  binding: "reference",
  mediaType: "article",
  title: "Kindred (EP)",
  url: "https://en.wikipedia.org/wiki/Kindred_(EP)",
  publisher: "Wikipedia",
  notes:
    "Kindred dates: digital 13 February 2012, vinyl 12 March 2012; Metacritic 88.",
});
const wikiTruant = source({
  binding: "reference",
  mediaType: "article",
  title: "Truant / Rough Sleeper",
  url: "https://en.wikipedia.org/wiki/Truant_/_Rough_Sleeper",
  publisher: "Wikipedia",
  notes: "Digital 14 December 2012; vinyl and CD 17 December 2012.",
});
const wikiRival = source({
  binding: "reference",
  mediaType: "article",
  title: "Rival Dealer",
  url: "https://en.wikipedia.org/wiki/Rival_Dealer",
  publisher: "Wikipedia",
  notes:
    "Digital 11 December 2013, physical 16 December; the Mary Anne Hobbs message text and the Lana Wachowski Human Rights Campaign speech sample in 'Come Down to Us'.",
});
const wikiYoungDeath = source({
  binding: "reference",
  mediaType: "article",
  title: "Young Death / Nightmarket",
  url: "https://en.wikipedia.org/wiki/Young_Death_/_Nightmarket",
  publisher: "Wikipedia",
  notes:
    "The accidental Black Friday 2016 sale at Sonic Boom Records in Toronto and the pulled-forward digital release; Hyperdub's 100th catalogue number (HDB100).",
});
const wikiMoth = source({
  binding: "reference",
  mediaType: "article",
  title: "Moth / Wolf Cub",
  url: "https://en.wikipedia.org/wiki/Moth_/_Wolf_Cub",
  publisher: "Wikipedia",
  notes:
    "The 4 May 2009 Burial + Four Tet 12-inch on Text Records, sold in a black sleeve with no liner notes.",
});
const wikiFourWalls = source({
  binding: "reference",
  mediaType: "article",
  title: "Four Walls / Paradise Circus",
  url: "https://en.wikipedia.org/wiki/Four_Walls_/_Paradise_Circus",
  publisher: "Wikipedia",
  notes:
    "The Massive Attack collaboration single of 17 October 2011, limited to 1,000 hand-numbered copies that sold out on the first pre-order day.",
});
const wikiTunes = source({
  binding: "reference",
  mediaType: "article",
  title: "Tunes 2011–2019",
  url: "https://en.wikipedia.org/wiki/Tunes_2011-2019",
  publisher: "Wikipedia",
  notes: "The 6 December 2019 Hyperdub compilation of the solo EP material.",
});
const discogs = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Burial",
  url: "https://www.discogs.com/artist/306157-Burial",
  publisher: "Discogs",
  notes:
    "Catalog cross-check for singles, EPs, remixes, the Flame 1/Flame 2 groups with The Bug, and the William Bevan real-name entry.",
});
const allmusic = source({
  binding: "reference",
  mediaType: "article",
  title: "Burial — Biography, Discography, Albums & Expert Reviews",
  url: "https://www.allmusic.com/artist/burial-mn0000643682",
  publisher: "AllMusic",
  authors: ["Paul Simpson"],
  notes:
    "Biography naming William Bevan; useful for the collaboration and Fabriclive.100 chronology.",
});

// --- Primary records and subject-adjacent channels --------------------------

const hyperdubArtist = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Burial — releases and merchandise",
  url: "https://hyperdub.net/en-us/collections/burial",
  publisher: "Hyperdub",
  notes:
    "The label's Burial catalog page: South London Boroughs through Comafields / Imaginary Festival (2025) and the Kode9 split Phoneglow / Eyes Go Blank.",
});
const hyperdubSlb = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Burial, South London Boroughs Vinyl / Digital",
  url: "https://hyperdub.net/en-us/products/burial-south-london-boroughs",
  publisher: "Hyperdub",
  notes:
    "Label copy dates the first EP to 16 May 2005 (HDB001) and calls it 'Burial's first ever EP.'",
});
const bandcamp = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Burial on Bandcamp",
  url: "https://burial.bandcamp.com/",
  publisher: "Bandcamp",
  notes:
    "Official Burial storefront, linked into Hyperdub's Bandcamp network; the closest thing to an official site. Likely label-operated day to day.",
});
const xlDreamfear = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Dreamfear / Boy Sent From Above",
  url: "https://www.xlrecordings.com/releases/dreamfear-boy-sent-from-above",
  publisher: "XL Recordings",
  notes:
    "XL's catalog page for the February 2024 single — a rare non-Hyperdub solo release.",
});
const fabricInfirmary = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "\"An opera written for the skies...\" Kode9 + Burial – 'Infirmary / Unknown Summer' is out now",
  url: "https://www.fabriclondon.com/posts/an-opera-written-for-the-skies-kode9-burial-infirmary-unknown-summer-is-out-now",
  publisher: "fabric London",
  publishedAt: "2023-07-21",
  notes:
    "fabric Originals release post: the cryptic East London billboard teaser and the Mary Anne Hobbs BBC 6 Music premiere of Burial's track.",
});
const metalheadz = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Goldie — Inner City Life 2017 (feat. Diane Charlemagne, Espa, Burial)",
  url: "https://www.metalheadz.co.uk/vinyl/meta057s",
  publisher: "Metalheadz",
  notes:
    "Label page for the 2017 12-inch carrying Burial's remix of Goldie's 'Inner City Life.'",
});
const hyperdubBlog = source({
  binding: "interview",
  mediaType: "article",
  title: "BURIAL - UNTRUE - NOVEMBER 2007",
  url: "https://hyperdubrecords.blogspot.com/2007/10/burial-untrue-november-2007.html",
  publisher: "Hyperdub Records blog",
  publishedAt: "2007-10",
  notes:
    "The label's Untrue announcement, which embeds a short Kode9 Q&A with Burial ('the first one was quite a pissed off basic record, downcast').",
});

// --- Interviews and first-person artifacts ---------------------------------

const blackdown = source({
  binding: "interview",
  mediaType: "article",
  title: "soundboy burial",
  url: "https://blackdownsoundboy.blogspot.com/2006/03/soundboy-burial.html",
  publisher: "Blackdown (Martin Clark)",
  publishedAt: "2006-03",
  authors: ["Martin Clark"],
  notes:
    "The first published Burial interview, March 2006: the Sound Forge method, the 'fishbone' drums, the crackle, and 'I've never sent tunes to anyone except Kode 9.'",
});
const guardianHancox = source({
  binding: "interview",
  mediaType: "article",
  title: "'Only five people know I make tunes'",
  url: "https://www.theguardian.com/music/2007/oct/26/urban",
  publisher: "The Guardian",
  publishedAt: "2007-10-26",
  authors: ["Dan Hancox"],
  notes:
    "The October 2007 Guardian piece built from the Tooting conversation; the headline quote became the defining line on his anonymity.",
});
const wireTranscript = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Burial: Unedited Transcript",
  url: "https://www.thewire.co.uk/in-writing/interviews/burial_unedited-transcript",
  publisher: "The Wire",
  publishedAt: "2012-12",
  authors: ["Mark Fisher"],
  notes:
    "Mark Fisher's unedited transcript of his 2007 Wire interview with Burial, published online December 2012; the 'forbidden siren' vocals and the scrapped dark second album are here.",
});
const hancoxSubstack = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Burial's last interview",
  url: "https://danhancox.substack.com/p/burials-last-interview",
  publisher: "Dan Hancox's Honor Oak Riot",
  publishedAt: "2025-09-25",
  authors: ["Dan Hancox"],
  notes:
    "Hancox's own publication of the full 10 October 2007 Tooting transcript — longer than the Guardian piece — plus his account of the Sun's manhunt, the dubstepforum misinformation campaign, and why it was Burial's last interview.",
});
const quietusWoon = source({
  binding: "interview",
  mediaType: "article",
  title: "Mirror, Mirror: An Interview With Jamie Woon",
  url: "https://thequietus.com/interviews/jamie-woon-interview-mirrorwriting/",
  publisher: "The Quietus",
  publishedAt: "2011",
  notes:
    "Woon describes how the 'Wayfaring Stranger' remix came via MySpace and how Bevan 'guided' the Mirrorwriting sound — one of the few collaborator accounts of working with him.",
});

// --- The 2008 unmasking arc --------------------------------------------------

const independent = source({
  binding: "reporting",
  mediaType: "article",
  title: "The real school of rock",
  url: "https://www.independent.co.uk/arts-entertainment/music/features/the-real-school-of-rock-780693.html",
  publisher: "The Independent",
  publishedAt: "2008-02-11",
  authors: ["Jonathan Brown", "Lucy Kinnear"],
  notes:
    "The February 2008 feature that first named William Bevan, 'aka Burial,' as an Elliott School alumnus — the speculation the Sun's campaign later revived.",
});
const guardianMercury = source({
  binding: "reporting",
  mediaType: "article",
  title: "Mercury Music Prize 2008 nominations announced",
  url: "https://www.theguardian.com/music/2008/jul/22/mercury.music.prize.2008.nominations",
  publisher: "The Guardian",
  publishedAt: "2008-07-22",
  notes: "The 22 July 2008 shortlist with Untrue among the twelve nominees.",
});
const guardianSmart = source({
  binding: "reporting",
  mediaType: "article",
  title: "Revealed: the one man who doesn't know who Burial is!",
  url: "https://www.theguardian.com/music/2008/aug/06/gordon.smart.cant.find.burial",
  publisher: "The Guardian",
  publishedAt: "2008-08-06",
  notes:
    "On Gordon Smart's Bizarre-column 'manhunt' in The Sun — published the morning after Burial had already named himself on MySpace.",
});
const guardianUnmasked = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial 'unmasked'. Again",
  url: "https://www.theguardian.com/music/2008/aug/06/burial.myspace",
  publisher: "The Guardian",
  publishedAt: "2008-08-06",
  authors: ["Sean Michaels"],
  notes:
    "Reports the MySpace post quoting 'My name's Will Bevan, I'm from South London' and 'I'm not into' anonymity any more.",
});
const bbcReveal = source({
  binding: "reporting",
  mediaType: "article",
  title: "Artist Burial reveals identity",
  url: "https://news.bbc.co.uk/2/hi/entertainment/7544933.stm",
  publisher: "BBC News",
  publishedAt: "2008-08-06",
  notes:
    "BBC's account of the MySpace post, the Sun's 'dig up the real Burial' plea, and the Fatboy Slim / Aphex Twin rumours it killed.",
});
const nmeReveal = source({
  binding: "reporting",
  mediaType: "article",
  title: "Nationwide Mercury Music Prize nominee Burial's identity revealed",
  url: "https://www.nme.com/news/music/burial-9-1325233",
  publisher: "NME",
  publishedAt: "2008-08-06",
  notes:
    "Notes that interviews before the reveal were conducted on the proviso that reporters would not reveal his identity.",
});
const faderMyspace = source({
  binding: "archive",
  mediaType: "article",
  title: "Burial Reveals Himself/Overuses The Word \"Tunes\"",
  url: "https://www.thefader.com/2008/08/06/burial-reveals-himself-overuses-the-word-tunes",
  publisher: "The FADER",
  publishedAt: "2008-08-06",
  notes:
    "Reprints the full 5 August 2008 MySpace post ('tunes') verbatim; the original myspace.com/burialuk page no longer resolves.",
});
const bbcElbow = source({
  binding: "reporting",
  mediaType: "article",
  title: "Elbow elated at Mercury Prize win",
  url: "https://news.bbc.co.uk/2/hi/entertainment/7606963.stm",
  publisher: "BBC News",
  publishedAt: "2008-09-09",
  notes:
    "Elbow win the 2008 Mercury at Grosvenor House; the piece confirms Burial — the bookmakers' favourite — did not attend.",
});
const billboardMercury = source({
  binding: "reporting",
  mediaType: "article",
  title: "Elbow Snags U.K.'s Nationwide Mercury Prize",
  url: "https://www.billboard.com/music/music-news/elbow-snags-uks-nationwide-mercury-prize-1044136/",
  publisher: "Billboard",
  publishedAt: "2008-09",
  notes:
    "Confirms the 4/7 William Hill favourite odds, that Burial was 'completely absent,' and that nine of twelve nominees performed.",
});
const viceUnmasking = source({
  binding: "reporting",
  mediaType: "article",
  title: "\"My Name's Will Bevan\": 10 Years Since Burial's Unmasking",
  url: "https://www.vice.com/en/article/ten-years-since-burial-unmasking-essay/",
  publisher: "Vice",
  publishedAt: "2018-08",
  notes:
    "Ten-year retrospective: the 10:34am timestamp on the 'tunes' post, Smart's reward, and the false 2015 Unsound Festival rumour as the closest thing to a live show.",
});

// --- Criticism and retrospective analysis -----------------------------------

const pitchforkUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial: Untrue",
  url: "https://pitchfork.com/reviews/albums/10877-untrue/",
  publisher: "Pitchfork",
  publishedAt: "2007-11-13",
  authors: ["Philip Sherburne"],
  notes: "The original review: 'beautiful secrets being whispered.'",
});
const guardianUntrueReview = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial, Untrue",
  url: "https://www.theguardian.com/music/2007/nov/02/urban.electronicmusic",
  publisher: "The Guardian",
  publishedAt: "2007-11-02",
  notes: "Contemporaneous Guardian review of Untrue.",
});
const pitchforkReynolds = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Why Burial's Untrue Is the Most Important Electronic Album of the Century So Far",
  url: "https://pitchfork.com/features/article/why-burials-untrue-is-the-most-important-electronic-album-of-the-century-so-far/",
  publisher: "Pitchfork",
  publishedAt: "2017-10-26",
  authors: ["Simon Reynolds"],
  notes:
    "The decade-on essay: the 'unite the whole UK' FACT quote, the 'I want to be in a symbol' Wire quote, second-hand rave, and the 'blubstep' aftermath.",
});
const ringerUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Augmented Reality of Burial's 'Untrue,' 10 Years Later",
  url: "https://www.theringer.com/music/2017/11/3/16601150/burial-untrue-10-year-anniversary",
  publisher: "The Ringer",
  publishedAt: "2017-11-03",
  notes:
    "Ten-year retrospective; reports the claim that 'Archangel' was made in under a day while mourning his dog.",
});
const mixmagUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "10 years on: 7 artists tell us how Burial's 'Untrue' changed their lives",
  url: "https://mixmag.net/feature/10-years-on-7-artists-tell-us-how-burials-untrue-changed-their-lives",
  publisher: "Mixmag",
  publishedAt: "2017-11",
  notes:
    "Artist testimony for the influence claims, including Mary Anne Hobbs' 'it was robbed of a Mercury Prize.'",
});
const marino = source({
  binding: "reporting",
  mediaType: "book",
  title:
    "The (un)masked bard: Burial's denied profile and the memory of English underground music",
  url: "https://doi.org/10.5040/9781501311284.0020",
  publisher: "Mad Dogs and Englishness (Bloomsbury Academic)",
  publishedAt: "2017",
  authors: ["Gabriele Marino"],
  notes:
    "Academic chapter reconstructing the anonymity era from archive snapshots: Kode9's December 2004 playlist listing 'Burial - Broken Home' before the record existed.",
});
const pitchforkRival = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial: Rival Dealer EP",
  url: "https://pitchfork.com/reviews/albums/18820-burial-rival-dealer-ep/",
  publisher: "Pitchfork",
  publishedAt: "2013-12-13",
  authors: ["Larry Fitzmaurice"],
  notes:
    "Review noting the 'dead of winter' release cadence, the self-acceptance theme, and that speculation about its autobiographical content circulated.",
});
const lobfRival = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Burial opens up about \"Rival Dealer\" EP, says it has an \"anti-bullying\" message",
  url: "https://www.thelineofbestfit.com/news/latest-news/burial-opens-up-about-rival-dealer-ep-says-it-has-an-anti-bullying-message-143086",
  publisher: "The Line of Best Fit",
  publishedAt: "2013-12",
  notes:
    "Carries the rare public message Burial sent to Mary Anne Hobbs' BBC Radio 6 Music show about Rival Dealer's intent.",
});
const pitchforkYoungDeath = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial's New Record Young Death Surfaces",
  url: "https://pitchfork.com/news/70050-burials-new-record-young-death-surfaces/",
  publisher: "Pitchfork",
  publishedAt: "2016-11",
  notes:
    "The accidental Sonic Boom Records sale on Black Friday 2016 and Hyperdub's 'no comment.'",
});
const pitchforkDolphinz = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial Releases New Song \"Dolphinz\": Listen",
  url: "https://pitchfork.com/news/burial-releases-new-song-dolphinz-listen/",
  publisher: "Pitchfork",
  publishedAt: "2021-05",
  notes:
    "Dates the Chemz/Dolphinz single and recaps the December 2020 Four Tet/Thom Yorke tracks and 'The Spell' remix.",
});
const crackShock = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial and Blackdown drop surprise new EP 'Shock Power of Love'",
  url: "https://crackmagazine.net/2021/04/burial-and-blackdown-drop-surprise-new-ep-shock-power-of-love/",
  publisher: "Crack Magazine",
  publishedAt: "2021-04-30",
  notes:
    "The unannounced Keysound split EP; also documents the 2006 Crackle Blues remix ('one of his first-ever releases') and 2015's Temple Sleeper.",
});
const pitchforkAntidawn = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial: Antidawn",
  url: "https://pitchfork.com/reviews/albums/burial-antidawn/",
  publisher: "Pitchfork",
  publishedAt: "2022-01-11",
  authors: ["Philip Sherburne"],
  notes:
    "Review of the 44-minute beatless EP — 'long enough to qualify as his long-awaited third album, if he had chosen to call it that.'",
});
const raAntidawn = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial - Antidawn",
  url: "https://ra.co/reviews/34568",
  publisher: "Resident Advisor",
  publishedAt: "2022-01",
  notes:
    "'It's become something of a tradition for Burial to release a new record in the winter months and then disappear.'",
});
const pitchforkStreetlands = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial Surprise Releases New Streetlands EP: Listen",
  url: "https://pitchfork.com/news/burial-surprise-releases-new-streetlands-ep-listen/",
  publisher: "Pitchfork",
  publishedAt: "2022-10-21",
  notes: "The unannounced 21 October 2022 three-track EP.",
});
const consequenceInfirmary = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial and Kode9 Release Split EP Infirmary / Unknown Summer",
  url: "https://consequence.net/2023/07/burial-kode9-split-ep-infirmary-unknown-summer/",
  publisher: "Consequence",
  publishedAt: "2023-07-21",
  notes:
    "The 21 July 2023 fabric Originals split single and its link back to the 2018 Fabriclive.100 mix.",
});
const dazedHyperdub = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub at 20: a history of the pioneering London label",
  url: "https://www.dazeddigital.com/music/article/62258/1/hyperdub-at-20-an-oral-history-kode-9-jessy-lanza",
  publisher: "Dazed",
  publishedAt: "2024",
  notes:
    "Oral history in which roster artists are asked whether they have ever met Burial — 'a bit like asking if they've ever met Jesus. Three of them say no.'",
});

const S = {
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  wikiAlbum: wikiAlbum.id,
  wikiUntrue: wikiUntrue.id,
  wikiDisco: wikiDisco.id,
  wikiKindred: wikiKindred.id,
  wikiTruant: wikiTruant.id,
  wikiRival: wikiRival.id,
  wikiYoungDeath: wikiYoungDeath.id,
  wikiMoth: wikiMoth.id,
  wikiFourWalls: wikiFourWalls.id,
  wikiTunes: wikiTunes.id,
  discogs: discogs.id,
  allmusic: allmusic.id,
  hyperdubArtist: hyperdubArtist.id,
  hyperdubSlb: hyperdubSlb.id,
  bandcamp: bandcamp.id,
  xlDreamfear: xlDreamfear.id,
  fabricInfirmary: fabricInfirmary.id,
  metalheadz: metalheadz.id,
  hyperdubBlog: hyperdubBlog.id,
  blackdown: blackdown.id,
  guardianHancox: guardianHancox.id,
  wireTranscript: wireTranscript.id,
  hancoxSubstack: hancoxSubstack.id,
  quietusWoon: quietusWoon.id,
  independent: independent.id,
  guardianMercury: guardianMercury.id,
  guardianSmart: guardianSmart.id,
  guardianUnmasked: guardianUnmasked.id,
  bbcReveal: bbcReveal.id,
  nmeReveal: nmeReveal.id,
  faderMyspace: faderMyspace.id,
  bbcElbow: bbcElbow.id,
  billboardMercury: billboardMercury.id,
  viceUnmasking: viceUnmasking.id,
  pitchforkUntrue: pitchforkUntrue.id,
  guardianUntrueReview: guardianUntrueReview.id,
  pitchforkReynolds: pitchforkReynolds.id,
  ringerUntrue: ringerUntrue.id,
  mixmagUntrue: mixmagUntrue.id,
  marino: marino.id,
  pitchforkRival: pitchforkRival.id,
  lobfRival: lobfRival.id,
  pitchforkYoungDeath: pitchforkYoungDeath.id,
  pitchforkDolphinz: pitchforkDolphinz.id,
  crackShock: crackShock.id,
  pitchforkAntidawn: pitchforkAntidawn.id,
  raAntidawn: raAntidawn.id,
  pitchforkStreetlands: pitchforkStreetlands.id,
  consequenceInfirmary: consequenceInfirmary.id,
  dazedHyperdub: dazedHyperdub.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-burial-will-bevan",
  generatedAt: "2026-09-25T21:23:46Z",
  subject: {
    kind: "person",
    handle: "burial",
    displayName: "Burial",
    alsoKnownAs: ["Will Bevan", "William Bevan", "William Emmanuel Bevan"],
    summary:
      "Anonymous-by-choice South London electronic musician (publicly named in 2008 as William Emmanuel Bevan) whose albums Burial (2006) and Untrue (2007) on Hyperdub made him the most acclaimed ghost in UK dance music; he has never performed live, gave a handful of interviews, and has communicated almost entirely through his records since.",
    identity: {
      wikidataId: "Q552245",
      wikipedia: "https://en.wikipedia.org/wiki/Burial_(musician)",
      officialSite: "https://burial.bandcamp.com/",
      profiles: [
        "https://burial.bandcamp.com/",
        "https://hyperdub.net/en-us/collections/burial",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:23:46Z",
    coverage: [
      "biography",
      "work",
      "discography",
      "media",
      "anonymity",
      "philosophy",
    ],
  },
  sources: [
    wikidata,
    wikipedia,
    wikiAlbum,
    wikiUntrue,
    wikiDisco,
    wikiKindred,
    wikiTruant,
    wikiRival,
    wikiYoungDeath,
    wikiMoth,
    wikiFourWalls,
    wikiTunes,
    discogs,
    allmusic,
    hyperdubArtist,
    hyperdubSlb,
    bandcamp,
    xlDreamfear,
    fabricInfirmary,
    metalheadz,
    hyperdubBlog,
    blackdown,
    guardianHancox,
    wireTranscript,
    hancoxSubstack,
    quietusWoon,
    independent,
    guardianMercury,
    guardianSmart,
    guardianUnmasked,
    bbcReveal,
    nmeReveal,
    faderMyspace,
    bbcElbow,
    billboardMercury,
    viceUnmasking,
    pitchforkUntrue,
    guardianUntrueReview,
    pitchforkReynolds,
    ringerUntrue,
    mixmagUntrue,
    marino,
    pitchforkRival,
    lobfRival,
    pitchforkYoungDeath,
    pitchforkDolphinz,
    crackShock,
    pitchforkAntidawn,
    raAntidawn,
    pitchforkStreetlands,
    consequenceInfirmary,
    dazedHyperdub,
  ],
  claims: [
    // --- facts ---------------------------------------------------------------
    {
      id: "claim-real-name",
      kind: "fact",
      text: "Burial is the recording alias of William Emmanuel Bevan, an electronic musician from South London. He stated the name himself — 'my names will bevan, im from south london' — in a MySpace post on 5 August 2008; the fuller form is carried by reference records.",
      sourceIds: [
        S.faderMyspace,
        S.guardianUnmasked,
        S.wikipedia,
        S.wikidata,
      ],
    },
    {
      id: "claim-first-hyperdub-signing",
      kind: "fact",
      text: "Burial was the first artist signed to Hyperdub, the label Kode9 (Steve Goodman) turned from a webzine into a record label in 2004; the label's first two releases had been Goodman's own, and Burial's South London Boroughs (HDB001) was its third release and first by an outside artist.",
      sourceIds: [S.wikipedia, S.marino, S.hyperdubSlb, S.dazedHyperdub],
    },
    {
      id: "claim-cdr-approach",
      kind: "fact",
      text: "Around 2002 Bevan began sending Goodman letters and CD-Rs of home-made tracks after finding the Hyperdub website while hunting for old garage records; he has said he never sent tunes to anyone else.",
      sourceIds: [S.wikiAlbum, S.blackdown],
    },
    {
      id: "claim-slb-release",
      kind: "fact",
      text: "South London Boroughs, his debut EP collecting tracks recorded over several prior years, was released 16 May 2005 as Hyperdub catalogue number HDB001.",
      sourceIds: [S.hyperdubSlb, S.marino, S.wikiAlbum],
    },
    {
      id: "claim-debut-album",
      kind: "fact",
      text: "The self-titled album Burial was released 15 May 2006 — Hyperdub's first full-length — assembled from material made between 2001 and 2006 in the audio editor Sound Forge.",
      sourceIds: [S.wikiAlbum, S.allmusic],
    },
    {
      id: "claim-wire-rewind",
      kind: "fact",
      text: "The Wire's Rewind 2006 critics' poll named Burial record of the year; Mixmag ranked it fifth and The Guardian sixth in their 2006 lists.",
      sourceIds: [S.wikiAlbum],
    },
    {
      id: "claim-untrue-release",
      kind: "fact",
      text: "Untrue was released by Hyperdub on 5 November 2007 to immediate acclaim; it later reached number 58 on the UK Albums Chart.",
      sourceIds: [S.wikiUntrue, S.pitchforkUntrue, S.wikiDisco],
    },
    {
      id: "claim-untrue-canon",
      kind: "fact",
      text: "Untrue's canonization is unusually deep: FACT named it the best album of the 2000s, Resident Advisor ranked it third in its albums-of-the-'00s poll, The Wire's 2007 Rewind placed it second for the year, NPR listed it among the 50 most important recordings of the decade, and Simon Reynolds argued in Pitchfork it was the most important electronic album of the century so far.",
      sourceIds: [S.wikiUntrue, S.pitchforkReynolds],
    },
    {
      id: "claim-mercury-nomination",
      kind: "fact",
      text: "On 22 July 2008 Untrue was shortlisted for the Nationwide Mercury Prize; Burial became the bookmakers' favourite (William Hill had him at 4/7).",
      sourceIds: [S.guardianMercury, S.billboardMercury],
    },
    {
      id: "claim-independent-speculation",
      kind: "fact",
      text: "On 11 February 2008 The Independent's 'real school of rock' feature named William Bevan, 'aka Burial,' as an alumnus of Elliott School in Putney — the first published speculation on his identity, half a year before the tabloid campaign.",
      sourceIds: [S.independent, S.wikipedia],
    },
    {
      id: "claim-sun-manhunt",
      kind: "fact",
      text: "After the Mercury nomination, The Sun's Bizarre columnist Gordon Smart ran a public campaign to unmask Burial, asking readers to 'dig up the real Burial' and offering a reward; dubstepforum.com users mounted a misinformation campaign in response, and the theory that Burial was an alter-ego of Fatboy Slim — or Aphex Twin — made it into print.",
      sourceIds: [
        S.viceUnmasking,
        S.guardianSmart,
        S.bbcReveal,
        S.hancoxSubstack,
      ],
    },
    {
      id: "claim-myspace-reveal",
      kind: "fact",
      text: "On 5 August 2008, at 10:34am, Burial posted a blog entry titled 'tunes' on his MySpace page naming himself Will Bevan and posting a portrait photograph that echoed the drawn self-portrait on the Untrue cover.",
      sourceIds: [S.faderMyspace, S.viceUnmasking, S.nmeReveal],
    },
    {
      id: "claim-mercury-ceremony",
      kind: "fact",
      text: "He did not attend the 9 September 2008 Mercury ceremony at Grosvenor House — nine of the twelve nominees performed, Burial was 'completely absent' — and Elbow's The Seldom Seen Kid won; Untrue sales rose roughly 1004% in the following week.",
      sourceIds: [S.bbcElbow, S.billboardMercury, S.wikiDisco],
    },
    {
      id: "claim-interview-count",
      kind: "fact",
      text: "The substantive interview record is three pieces: Martin Clark's Blackdown interview (March 2006), Mark Fisher's Wire interview (2007), and Dan Hancox's Guardian conversation (10 October 2007, Tooting). Hancox calls his 'Burial's last interview'; no substantive interview has been published since.",
      sourceIds: [
        S.blackdown,
        S.wireTranscript,
        S.guardianHancox,
        S.hancoxSubstack,
      ],
    },
    {
      id: "claim-pre-reveal-conditions",
      kind: "fact",
      text: "Before the reveal he refused photographs and granted interviews only on the condition reporters would not identify him; the Guardian interview was itself negotiated down to 'a casual chat about tunes.'",
      sourceIds: [S.nmeReveal, S.guardianHancox, S.hancoxSubstack],
    },
    {
      id: "claim-elliott-school",
      kind: "fact",
      text: "Press reporting places Bevan at Elliott School in Putney, south London — whose alumni include Kieran Hebden (Four Tet) and members of Hot Chip; Joe Goddard has said Burial was in the year above him. The school detail is The Independent's reporting, never confirmed by Bevan himself.",
      sourceIds: [S.independent, S.wikipedia],
    },
    {
      id: "claim-collaborations",
      kind: "fact",
      text: "His collaboration web runs through a small circle: 'Moth'/'Wolf Cub' with Four Tet (Text, 2009), 'Ego'/'Mirror' with Four Tet and Thom Yorke (Text, 2011), 'Four Walls'/'Paradise Circus' with Massive Attack (2011, a 1,000-copy 12-inch that sold out in a day), 'Sweetz' with Zomby (Hyperdub, 2016), the Flame 1 and Flame 2 EPs with The Bug (Pressure, 2018-19), 'Her Revolution'/'His Rope' with Four Tet and Thom Yorke (2020), 'Shock Power of Love' with Blackdown (Keysound, 2021), and split singles with Kode9 (fabric Originals 2023, Hyperdub 2024).",
      sourceIds: [
        S.wikiMoth,
        S.wikiFourWalls,
        S.discogs,
        S.pitchforkDolphinz,
        S.crackShock,
        S.consequenceInfirmary,
        S.hyperdubArtist,
      ],
    },
    {
      id: "claim-kindred",
      kind: "fact",
      text: "Kindred was released digitally on 13 February 2012 with vinyl following in March; it scored 88 on Metacritic.",
      sourceIds: [S.wikiKindred],
    },
    {
      id: "claim-truant",
      kind: "fact",
      text: "Truant / Rough Sleeper was released digitally 14 December 2012, with vinyl and CD on 17 December 2012.",
      sourceIds: [S.wikiTruant],
    },
    {
      id: "claim-rival-dealer",
      kind: "fact",
      text: "Rival Dealer appeared digitally on 11 December 2013 (physical 16 December); its closer 'Come Down to Us' ends on an extended sample of transgender filmmaker Lana Wachowski's 2012 Human Rights Campaign Visibility Award speech.",
      sourceIds: [S.wikiRival, S.pitchforkRival],
    },
    {
      id: "claim-young-death",
      kind: "fact",
      text: "Young Death / Nightmarket — Hyperdub's 100th catalogue number — surfaced on 25 November 2016 when Toronto's Sonic Boom Records accidentally sold five copies days early; the digital release was pulled forward to 28 November and fake uploads proliferated in the gap.",
      sourceIds: [S.pitchforkYoungDeath, S.wikiYoungDeath],
    },
    {
      id: "claim-fabriclive",
      kind: "fact",
      text: "Fabriclive.100, a joint Kode9 & Burial mix released in 2018, was the final volume of fabric's long-running mix-CD series in its original form.",
      sourceIds: [S.allmusic, S.consequenceInfirmary],
    },
    {
      id: "claim-tunes-compilation",
      kind: "fact",
      text: "Tunes 2011–2019, a 17-track, ~150-minute compilation of the post-Untrue solo EP material, was released 6 December 2019.",
      sourceIds: [S.wikiTunes, S.allmusic],
    },
    {
      id: "claim-antidawn-streetlands",
      kind: "fact",
      text: "Antidawn, a 44-minute nearly beatless ambient EP — his longest release since Untrue — was released 6 January 2022; the three-track Streetlands EP followed on 21 October 2022.",
      sourceIds: [S.pitchforkAntidawn, S.pitchforkStreetlands, S.bandcamp],
    },
    {
      id: "claim-infirmary",
      kind: "fact",
      text: "'Infirmary / Unknown Summer', a split single with Kode9 on fabric Originals, was released 21 July 2023 after a cryptic East London billboard; Burial's track premiered on Mary Anne Hobbs' BBC 6 Music show.",
      sourceIds: [S.fabricInfirmary, S.consequenceInfirmary],
    },
    {
      id: "claim-2024-2025-releases",
      kind: "fact",
      text: "Dreamfear / Boy Sent From Above came out in February 2024 on XL Recordings; the Kode9 split Phoneglow / Eyes Go Blank followed on Hyperdub in June 2024, and Comafields / Imaginary Festival in August 2025.",
      sourceIds: [S.xlDreamfear, S.bandcamp, S.hyperdubArtist],
    },
    {
      id: "claim-no-live",
      kind: "fact",
      text: "He has never performed live as Burial; the closest the record comes is a false 2015 rumour that he would play Unsound Festival.",
      sourceIds: [S.viceUnmasking],
    },
    {
      id: "claim-remixes",
      kind: "fact",
      text: "Documented remixes include Blackdown's 'Crackle Blues' (2006 — one of his first-ever releases), Jamie Woon's 'Wayfaring Stranger' (2007), Goldie's 'Inner City Life' (a 2017 Metalheadz 12-inch), and Charles Webster & Ingrid Chavez's 'The Spell' (2020).",
      sourceIds: [
        S.crackShock,
        S.metalheadz,
        S.quietusWoon,
        S.pitchforkDolphinz,
      ],
    },
    {
      id: "claim-night-air",
      kind: "fact",
      text: "Jamie Woon's 'Night Air' (2010) carries a co-production credit to Bevan under his real name; Woon says the contribution was closer to a session musician's guidance than a Burial production.",
      sourceIds: [S.quietusWoon],
    },
    {
      id: "claim-no-third-album",
      kind: "fact",
      text: "In the 2008 reveal post he said he was 'going to finish my next album'; as of September 2026 no third Burial album has been released — Antidawn, at 44 minutes, is album-length but was issued as an EP.",
      sourceIds: [S.faderMyspace, S.pitchforkAntidawn, S.wikiDisco],
    },

    // --- stated beliefs ------------------------------------------------------
    {
      id: "claim-five-people",
      kind: "stated_belief",
      text: "'Only five people know I make tunes' — he framed anonymity in 2007 as the condition the music was made under, not a marketing device.",
      sourceIds: [S.guardianHancox],
    },
    {
      id: "claim-symbol",
      kind: "stated_belief",
      text: "To The Wire: 'I want to be unknown... Most of the tunes I like, I never knew what the people who made them looked like, anyway. It draws you in. You could believe in it more... I just want to be in a symbol... the name of a tune.'",
      sourceIds: [S.wireTranscript, S.pitchforkReynolds],
    },
    {
      id: "claim-lowkey",
      kind: "stated_belief",
      text: "In the reveal post: 'i wanted to be unknown because i just want it to be all about the tunes... im a lowkey person and i just want to make some tunes, nothing else.'",
      sourceIds: [S.faderMyspace, S.guardianUnmasked],
    },
    {
      id: "claim-lost-art-of-secret",
      kind: "stated_belief",
      text: "'It's like the lost art of keeping a secret, but it keeps my tunes closer to me and other people. I love that with old jungle and garage tunes, when you didn't know anything about them, and nothing was between you and the tunes. I liked the mystery; it was more scary and sexy.'",
      sourceIds: [S.guardianHancox],
    },
    {
      id: "claim-not-a-musician",
      kind: "stated_belief",
      text: "'I'm not a musician, and I'm still not, in any way' — he credits Digital's 'Special Mission' with showing him tunes could be made without musicianship.",
      sourceIds: [S.blackdown, S.wikiAlbum],
    },
    {
      id: "claim-fishbone-method",
      kind: "stated_belief",
      text: "He works in Sound Forge visually: 'Once I change something, I can never un-change it. I can only see the waves. So I know when I'm happy with my drums because they look like a nice fishbone' — he can draw a fishbone to remember a beat, and once recorded himself drumming on tables.",
      sourceIds: [S.blackdown],
    },
    {
      id: "claim-crackle",
      kind: "stated_belief",
      text: "On the rain, fire, vinyl and pirate-radio crackle layered over everything: it 'sits over my drums, hides the space between them... it's no longer mine. And you get a feel of a real environment.'",
      sourceIds: [S.blackdown],
    },
    {
      id: "claim-unite-the-uk",
      kind: "stated_belief",
      text: "On the rave-era tunes he loved: 'It sounds stupid, but it's like they were trying to unite the whole UK, but they failed. So when I listen back to them I get kind of sad.'",
      sourceIds: [S.pitchforkReynolds],
    },
    {
      id: "claim-for-my-brothers",
      kind: "stated_belief",
      text: "'The truth is my tunes were never designed to be heard by anyone. I made them for my brothers — for my older brother, because he was around then and used to go to those raves.'",
      sourceIds: [S.hancoxSubstack, S.blackdown],
    },
    {
      id: "claim-rain-sanctuary",
      kind: "stated_belief",
      text: "'My music probably is just for moody people to walk across London in the rain to... My music's like a little sanctuary, it's that 24-hour stand in the park serving tea and coffee, a light in the darkness.'",
      sourceIds: [S.hancoxSubstack],
    },
    {
      id: "claim-forbidden-siren",
      kind: "stated_belief",
      text: "On the cut-up voices: garage vocals were 'like a forbidden siren' — 'not proper singing but cut-up and repeating, and executed coldly' — and subs, rolling drums and vocals together were 'a pure UK style of music.'",
      sourceIds: [S.wireTranscript],
    },
    {
      id: "claim-anti-bullying",
      kind: "stated_belief",
      text: "On Rival Dealer, in a message to Mary Anne Hobbs' BBC 6 Music show: 'I wanted the tunes to be anti-bullying tunes that could maybe help someone to believe in themselves, to not be afraid, and to not give up... like an angel's spell to protect them against the unkind people, the dark times, and the self-doubts.'",
      sourceIds: [S.lobfRival, S.wikiRival],
    },
    {
      id: "claim-downcast-euphoria",
      kind: "stated_belief",
      text: "He described the first album as 'quite a pissed off basic record, downcast,' while Untrue has 'more little bits of vocals glowing in it, flickering around and burning in the tune' — the label copy called it 'downcast euphoria.'",
      sourceIds: [S.hyperdubBlog],
    },
    {
      id: "claim-secondhand-rave",
      kind: "stated_belief",
      text: "'I'm not old enough to have been to a proper rave in a warehouse' — his relationship to rave is inherited second-hand, through an older brother's records, stories, and pirate tapes.",
      sourceIds: [S.hancoxSubstack, S.pitchforkReynolds],
    },
    {
      id: "claim-jungle-lineage",
      kind: "stated_belief",
      text: "He places dubstep in the hardcore-jungle-garage line: 'I think dubstep's the latest stage in that progression' — music 'people lived and died for,' where 'a single synth stab... could kill someone, because of that memory.'",
      sourceIds: [S.hancoxSubstack],
    },

    // --- patterns ------------------------------------------------------------
    {
      id: "claim-winter-cadence",
      kind: "pattern",
      text: "Releases cluster in winter and arrive with little or no warning: Resident Advisor called it 'a tradition for Burial to release a new record in the winter months and then disappear,' and Rival Dealer's reviewer noted the 'dead of winter' cadence.",
      sourceIds: [S.raAntidawn, S.pitchforkRival],
    },
    {
      id: "claim-surprise-surface",
      kind: "pattern",
      text: "Records surface through accidents and coy supply chains rather than promotion: the accidental Sonic Boom sale, the cryptic billboard for Infirmary / Unknown Summer, and unannounced drops like Chemz, Shock Power of Love, and Streetlands.",
      sourceIds: [
        S.pitchforkYoungDeath,
        S.fabricInfirmary,
        S.crackShock,
        S.pitchforkStreetlands,
      ],
    },
    {
      id: "claim-proxy-communication",
      kind: "pattern",
      text: "Since 2008 he has communicated almost entirely through proxies — a message sent to Mary Anne Hobbs' radio show for Rival Dealer, a premiere on her programme for Unknown Summer, label copy, and collaborators' interviews.",
      sourceIds: [S.lobfRival, S.fabricInfirmary, S.quietusWoon],
    },
    {
      id: "claim-label-as-buffer",
      kind: "pattern",
      text: "Hyperdub operates as the buffer between him and the world: it offered 'no comment' on the accidental Young Death sale, and when Dazed asked label artists whether they had ever met Burial, 'it's a bit like asking if they've ever met Jesus. Three of them say no.'",
      sourceIds: [S.pitchforkYoungDeath, S.dazedHyperdub],
    },
    {
      id: "claim-signature-sound",
      kind: "pattern",
      text: "Reviewers converge on the same signature: pitch-bent R&B and pop acapellas, film and game dialogue, scanner chatter, rain and vinyl crackle — mournful, reverb-heavy 'secrets being whispered,' in Pitchfork's phrase.",
      sourceIds: [S.pitchforkUntrue, S.pitchforkRival, S.allmusic],
    },
    {
      id: "claim-influence-emotionality",
      kind: "pattern",
      text: "Untrue's impact registered as a scene-wide turn toward introspective melancholy — Reynolds dubbed the trend 'blubstep' — through producers like James Blake, Jamie Woon and Darkstar; at the ten-year mark, artists still testified to it changing their lives.",
      sourceIds: [S.pitchforkReynolds, S.mixmagUntrue],
    },
    {
      id: "claim-mythology-vacuum",
      kind: "pattern",
      text: "Where facts are withheld, mythology filled the vacuum: 'are you Basic Channel? Kode9? The Bug?' opens the first interview; the Sun's manhunt produced Fatboy Slim and Aphex Twin theories; fake Young Death uploads followed the leak; the 2015 Unsound rumour was false.",
      sourceIds: [
        S.blackdown,
        S.bbcReveal,
        S.wikiYoungDeath,
        S.viceUnmasking,
      ],
    },

    // --- speculation ---------------------------------------------------------
    {
      id: "claim-spec-deflation",
      kind: "speculation",
      text: "The self-naming may have been a deflation tactic: posting 'my names will bevan' at 10:34am on 5 August 2008 killed The Sun's scoop before its next column ran, and the post's 'its not a big deal' framing reads as reclaiming the terms. Hancox frames the reveal as 'forced'; the post itself says only that 'the unknown thing became an issue.'",
      sourceIds: [S.hancoxSubstack, S.viceUnmasking, S.guardianSmart],
    },
    {
      id: "claim-spec-scrapped-album",
      kind: "speculation",
      text: "He told Fisher he had scrapped a batch of dark tunes intended as the second album before Untrue came together; whether that material surfaced in the later EP catalogue or remains vaulted is unknown.",
      sourceIds: [S.wireTranscript],
    },
    {
      id: "claim-spec-autobiography",
      kind: "speculation",
      text: "Whether Rival Dealer's self-acceptance theme was autobiographical: Pitchfork noted that such readings circulated, and Bevan never confirmed or denied them — the 'anti-bullying' message is his only stated frame.",
      sourceIds: [S.pitchforkRival, S.lobfRival],
    },
    {
      id: "claim-spec-third-album-fate",
      kind: "speculation",
      text: "The 'next album' he mentioned in 2008 may have dissolved into the decade of EPs that followed, or may sit unfinished; the record does not say which.",
      sourceIds: [S.faderMyspace, S.wikiDisco],
    },
    {
      id: "claim-spec-images",
      kind: "speculation",
      text: "Verified images of him amount to essentially two artifacts: the 2008 MySpace portrait and the Untrue self-portrait drawing it echoed, plus the Georgina Cook photograph credited on the Wire transcript. Any richer visual record is undocumented.",
      sourceIds: [S.faderMyspace, S.wireTranscript, S.hancoxSubstack],
    },
  ],
  timeline: [
    {
      id: "event-cdr-approach",
      kind: "other",
      date: "2002",
      title: "Begins sending demos to Kode9",
      summary:
        "Letters and CD-Rs of home-made tracks to Steve Goodman after finding the Hyperdub webzine; early tracks like 'South London Boroughs' and 'Southern Comfort' reached his sets.",
      organization: "Hyperdub",
      organizationHandle: "hyperdub",
      sourceIds: [S.wikiAlbum, S.blackdown],
    },
    {
      id: "event-slb",
      kind: "publication",
      date: "2005-05-16",
      title: "South London Boroughs EP released",
      summary:
        "Debut EP on Hyperdub (HDB001), the label's third release and its first by an outside artist.",
      sourceIds: [S.hyperdubSlb, S.marino],
    },
    {
      id: "event-blackdown-interview",
      kind: "media",
      date: "2006-03",
      title: "First published interview (Blackdown)",
      summary:
        "Martin Clark's 'soundboy burial' interview — the Sound Forge method, the fishbone drums, the crackle.",
      sourceIds: [S.blackdown],
    },
    {
      id: "event-debut-album",
      kind: "publication",
      date: "2006-05-15",
      title: "Burial released",
      summary:
        "Self-titled debut album on Hyperdub — the label's first full-length.",
      sourceIds: [S.wikiAlbum, S.allmusic],
    },
    {
      id: "event-wire-rewind",
      kind: "award",
      date: "2007-01",
      title: "The Wire names Burial record of the year 2006",
      summary:
        "The Rewind 2006 critics' poll put the debut at number one; Mixmag and The Guardian also ranked it in their top ten.",
      organization: "The Wire",
      organizationHandle: "the-wire",
      sourceIds: [S.wikiAlbum],
    },
    {
      id: "event-last-interview",
      kind: "media",
      date: "2007-10-10",
      title: "Dan Hancox interview in Tooting — the last known interview",
      summary:
        "Re-coded as 'a casual chat about tunes'; ran in the Guardian on 26 October as 'Only five people know I make tunes.' Hancox published the full transcript in 2025 and calls it Burial's last interview.",
      sourceIds: [S.guardianHancox, S.hancoxSubstack],
    },
    {
      id: "event-untrue",
      kind: "publication",
      date: "2007-11-05",
      title: "Untrue released",
      summary:
        "Second album on Hyperdub; later canonized as FACT's album of the 2000s and among the most acclaimed electronic records of the century.",
      sourceIds: [S.wikiUntrue, S.pitchforkUntrue, S.guardianUntrueReview],
    },
    {
      id: "event-independent-speculation",
      kind: "media",
      date: "2008-02-11",
      title: "The Independent speculates Burial is William Bevan",
      summary:
        "A feature on Elliott School's alumni names Bevan 'aka Burial' — the first published identity speculation.",
      organization: "The Independent",
      organizationHandle: "the-independent",
      sourceIds: [S.independent],
    },
    {
      id: "event-mercury-nomination",
      kind: "award",
      date: "2008-07-22",
      title: "Untrue shortlisted for the 2008 Mercury Prize",
      summary:
        "The nomination made him the bookmakers' favourite and triggered the tabloid unmasking campaign.",
      organization: "Mercury Prize",
      organizationHandle: "mercury-prize",
      sourceIds: [S.guardianMercury, S.billboardMercury],
    },
    {
      id: "event-myspace-reveal",
      kind: "milestone",
      date: "2008-08-05",
      title: "Names himself on MySpace",
      summary:
        "The 'tunes' post: 'my names will bevan, im from south london' — plus a portrait echoing the Untrue self-portrait drawing.",
      sourceIds: [S.faderMyspace, S.guardianUnmasked, S.nmeReveal],
    },
    {
      id: "event-mercury-ceremony",
      kind: "award",
      date: "2008-09-09",
      title: "Mercury Prize ceremony — absent; Elbow win",
      summary:
        "The favourite did not attend Grosvenor House; The Seldom Seen Kid won; Untrue sales rose roughly tenfold the next week.",
      location: "London",
      sourceIds: [S.bbcElbow, S.billboardMercury, S.wikiDisco],
    },
    {
      id: "event-moth-wolf-cub",
      kind: "publication",
      date: "2009-05-04",
      title: "'Moth' / 'Wolf Cub' with Four Tet",
      summary:
        "First post-reveal release: an anonymous black-sleeve 12-inch on Hebden's Text Records with no liner notes.",
      organization: "Text Records",
      organizationHandle: "text-records",
      sourceIds: [S.wikiMoth],
    },
    {
      id: "event-2011-collaborations",
      kind: "publication",
      date: "2011",
      title: "Street Halo, 'Ego'/'Mirror', 'Four Walls'/'Paradise Circus'",
      summary:
        "A cluster year: the Street Halo EP (March), the Four Tet + Thom Yorke single (March), and the 1,000-copy Massive Attack collaboration (October).",
      sourceIds: [S.wikiDisco, S.wikiFourWalls],
    },
    {
      id: "event-kindred",
      kind: "publication",
      date: "2012-02-13",
      title: "Kindred EP released",
      summary:
        "Three long-form tracks on Hyperdub; Truant / Rough Sleeper followed in December.",
      sourceIds: [S.wikiKindred, S.wikiTruant],
    },
    {
      id: "event-rival-dealer",
      kind: "publication",
      date: "2013-12-11",
      title: "Rival Dealer released; anti-bullying message sent to radio",
      summary:
        "Digital release 11 December; a message to Mary Anne Hobbs' BBC 6 Music show framed it as 'anti-bullying tunes... an angel's spell.'",
      sourceIds: [S.wikiRival, S.lobfRival],
    },
    {
      id: "event-young-death",
      kind: "publication",
      date: "2016-11-25",
      title: "Young Death / Nightmarket surfaces via accidental sale",
      summary:
        "Five copies sold early at Toronto's Sonic Boom Records on Black Friday; Hyperdub pulled the digital release forward to 28 November. Catalogue number HDB100.",
      location: "Toronto",
      sourceIds: [S.pitchforkYoungDeath, S.wikiYoungDeath],
    },
    {
      id: "event-fabriclive",
      kind: "publication",
      date: "2018",
      title: "Fabriclive.100 with Kode9",
      summary:
        "Joint mix CD that closed out the Fabriclive series in its original form.",
      organization: "fabric",
      organizationHandle: "fabric",
      sourceIds: [S.allmusic, S.consequenceInfirmary],
    },
    {
      id: "event-tunes-compilation",
      kind: "publication",
      date: "2019-12-06",
      title: "Tunes 2011–2019 released",
      summary:
        "Seventeen tracks of post-Untrue EP material compiled on Hyperdub — the closest thing to a third album statement.",
      sourceIds: [S.wikiTunes, S.allmusic],
    },
    {
      id: "event-antidawn",
      kind: "publication",
      date: "2022-01-06",
      title: "Antidawn released",
      summary:
        "Forty-four minutes of near-beatless ambience — his longest release since Untrue.",
      sourceIds: [S.pitchforkAntidawn, S.bandcamp],
    },
    {
      id: "event-streetlands",
      kind: "publication",
      date: "2022-10-21",
      title: "Streetlands released unannounced",
      summary: "A surprise three-track EP on Hyperdub.",
      sourceIds: [S.pitchforkStreetlands, S.bandcamp],
    },
    {
      id: "event-infirmary",
      kind: "publication",
      date: "2023-07-21",
      title: "'Infirmary / Unknown Summer' split with Kode9",
      summary:
        "fabric Originals split single teased by a cryptic billboard; Burial's side premiered on Mary Anne Hobbs' BBC 6 Music show.",
      organization: "fabric Originals",
      organizationHandle: "fabric-originals",
      sourceIds: [S.fabricInfirmary, S.consequenceInfirmary],
    },
    {
      id: "event-dreamfear",
      kind: "publication",
      date: "2024-02-09",
      title: "Dreamfear / Boy Sent From Above on XL",
      summary:
        "A rare non-Hyperdub solo release, issued on XL Recordings; the Kode9 split Phoneglow / Eyes Go Blank followed on Hyperdub in June.",
      organization: "XL Recordings",
      organizationHandle: "xl-recordings",
      sourceIds: [S.xlDreamfear, S.bandcamp, S.hyperdubArtist],
    },
    {
      id: "event-comafields",
      kind: "publication",
      date: "2025-08",
      title: "Comafields / Imaginary Festival released",
      summary: "Two long tracks on Hyperdub, twenty years into the catalog.",
      sourceIds: [S.bandcamp, S.hyperdubArtist],
    },
    {
      id: "event-hancox-transcript",
      kind: "media",
      date: "2025-09-25",
      title: "Hancox publishes the full 2007 interview transcript",
      summary:
        "The complete Tooting conversation — twice the length of the Guardian piece — plus his account of the unmasking campaign.",
      sourceIds: [S.hancoxSubstack],
    },
  ],
  themes: [
    {
      id: "theme-anonymity",
      kind: "practice",
      status: "stated",
      title: "Anonymity as the condition of the work",
      summary:
        "Not a marketing stunt but the premise: 'only five people know I make tunes'; 'I want to be in a symbol... the name of a tune'; the lost art of keeping a secret keeps the tunes closer. He took the anonymity of white-label jungle 12-inches — where nobody knew the makers' faces — as the ideal relationship between listener and record.",
      sourceIds: [
        S.guardianHancox,
        S.wireTranscript,
        S.faderMyspace,
        S.blackdown,
      ],
    },
    {
      id: "theme-secondhand-rave",
      kind: "philosophy",
      status: "stated",
      title: "Second-hand rave",
      summary:
        "Too young for the warehouse era, he absorbed rave through an older brother's records, mixtapes and stories — 'an implanted memory,' in Reynolds' phrase. The tunes were 'never designed to be heard by anyone'; they were made for his brothers.",
      sourceIds: [S.hancoxSubstack, S.pitchforkReynolds, S.blackdown],
    },
    {
      id: "theme-hauntology",
      kind: "philosophy",
      status: "reported",
      title: "An elegy for the hardcore continuum",
      summary:
        "Critics — Mark Fisher most influentially — read the debut as a memorial to the rave culture that had died: walking through its abandoned spaces, 'muted air horns' like ghosts of raves past. Reynolds and Marino extend the reading: the lost music's ambition to 'unite the whole UK' is what the sadness mourns.",
      sourceIds: [S.pitchforkReynolds, S.marino, S.wikiAlbum],
    },
    {
      id: "theme-london",
      kind: "influence",
      status: "stated",
      title: "London at night as subject",
      summary:
        "Nightbuses, rain, walking home across the city, the '24-hour stand in the park serving tea and coffee.' His own measure: music 'for moody people to walk across London in the rain to' — 'a little sanctuary... a light in the darkness.'",
      sourceIds: [S.hancoxSubstack, S.wireTranscript],
    },
    {
      id: "theme-lofi-method",
      kind: "method",
      status: "stated",
      title: "The deliberately limited toolkit",
      summary:
        "Sound Forge, an audio editor with no sequencer and no undo: 'Once I change something, I can never un-change it.' Drums judged by waveform silhouette — 'a nice fishbone.' He says he is 'not a musician'; the limitation is the method.",
      sourceIds: [S.blackdown, S.wikiAlbum],
    },
    {
      id: "theme-voice",
      kind: "method",
      status: "stated",
      title: "The forbidden siren",
      summary:
        "Cut-up R&B vocals 'executed coldly' against dark basslines — the thing that 'forgave the rest of the tune.' Subs, rolling drums and voices together were, to him, 'a pure UK style of music.'",
      sourceIds: [S.wireTranscript],
    },
    {
      id: "theme-refusal",
      kind: "practice",
      status: "reported",
      title: "Refusal of the performance economy",
      summary:
        "No live shows, no press photos, interviews only under anonymity conditions, releases that surface unannounced or by accident. Even his label's own artists mostly say they have never met him.",
      sourceIds: [
        S.viceUnmasking,
        S.dazedHyperdub,
        S.pitchforkYoungDeath,
        S.nmeReveal,
      ],
    },
    {
      id: "theme-silence-after",
      kind: "practice",
      status: "reported",
      title: "The silence after the reveal",
      summary:
        "Since naming himself in August 2008 he has given no substantive interview — Hancox's October 2007 conversation stands as the last. Communication happens through label copy, radio messages, and collaborators speaking on his behalf.",
      sourceIds: [S.hancoxSubstack, S.lobfRival, S.fabricInfirmary],
    },
    {
      id: "theme-unity-empathy",
      kind: "belief",
      status: "stated",
      title: "Tunes as protection",
      summary:
        "Rival Dealer's stated intent: 'anti-bullying tunes... an angel's spell to protect them against the unkind people, the dark times, and the self-doubts' — the emotional directness always inside the murk, made explicit.",
      sourceIds: [S.lobfRival, S.pitchforkRival],
    },
    {
      id: "theme-influence",
      kind: "influence",
      status: "reported",
      title: "The emotional turn he set off",
      summary:
        "Untrue's aftermath: a wave of introspective dubstep ('blubstep'), the careers of James Blake and Jamie Woon, decade-end canonization, and producers still testifying to it ten years on.",
      sourceIds: [S.pitchforkReynolds, S.mixmagUntrue, S.wikiUntrue],
    },
  ],
  works: [
    {
      id: "work-slb",
      kind: "recording",
      status: "released",
      title: "South London Boroughs",
      date: "2005-05-16",
      summary:
        "Debut EP on Hyperdub (HDB001), collecting years of home recordings.",
      sourceIds: [S.hyperdubSlb, S.marino],
    },
    {
      id: "work-distant-lights",
      kind: "recording",
      status: "released",
      title: "Distant Lights",
      date: "2006",
      summary: "Second EP on Hyperdub.",
      sourceIds: [S.wikiDisco, S.discogs],
    },
    {
      id: "work-burial-lp",
      kind: "recording",
      status: "released",
      title: "Burial",
      date: "2006-05-15",
      summary:
        "Self-titled debut album; The Wire's record of the year for 2006.",
      sourceIds: [S.wikiAlbum, S.allmusic],
    },
    {
      id: "work-ghost-hardware",
      kind: "recording",
      status: "released",
      title: "Ghost Hardware",
      date: "2007",
      summary: "EP on Hyperdub preceding Untrue.",
      sourceIds: [S.wikiDisco, S.discogs],
    },
    {
      id: "work-untrue",
      kind: "recording",
      status: "released",
      title: "Untrue",
      date: "2007-11-05",
      summary:
        "Second album; Mercury Prize nominee, FACT's album of the 2000s.",
      sourceIds: [S.wikiUntrue, S.pitchforkUntrue],
    },
    {
      id: "work-moth-wolf-cub",
      kind: "recording",
      status: "released",
      title: "Moth / Wolf Cub (with Four Tet)",
      date: "2009-05-04",
      summary: "Anonymous black-sleeve 12-inch on Text Records.",
      sourceIds: [S.wikiMoth],
    },
    {
      id: "work-night-air",
      kind: "recording",
      status: "released",
      title: "Jamie Woon — 'Night Air' (co-production)",
      date: "2010",
      summary:
        "Co-production credited to Will Bevan rather than Burial — Woon describes it as session-musician-like guidance.",
      sourceIds: [S.quietusWoon],
    },
    {
      id: "work-street-halo",
      kind: "recording",
      status: "released",
      title: "Street Halo",
      date: "2011-03",
      summary: "First solo EP after Untrue, on Hyperdub.",
      sourceIds: [S.wikiDisco, S.bandcamp],
    },
    {
      id: "work-ego-mirror",
      kind: "recording",
      status: "released",
      title: "Ego / Mirror (with Four Tet and Thom Yorke)",
      date: "2011-03",
      summary: "White-label 12-inch on Text Records.",
      sourceIds: [S.wikiDisco, S.discogs],
    },
    {
      id: "work-four-walls",
      kind: "recording",
      status: "released",
      title: "Four Walls / Paradise Circus (with Massive Attack)",
      date: "2011-10-17",
      summary:
        "Two ~12-minute Burial reconstructions of Massive Attack, on a 1,000-copy gold-glitter 12-inch that sold out on pre-order day.",
      sourceIds: [S.wikiFourWalls],
    },
    {
      id: "work-kindred",
      kind: "recording",
      status: "released",
      title: "Kindred",
      date: "2012-02-13",
      summary: "Three long-form tracks; Metacritic 88.",
      sourceIds: [S.wikiKindred],
    },
    {
      id: "work-truant",
      kind: "recording",
      status: "released",
      title: "Truant / Rough Sleeper",
      date: "2012-12-14",
      summary: "Two side-long pieces on Hyperdub.",
      sourceIds: [S.wikiTruant],
    },
    {
      id: "work-rival-dealer",
      kind: "recording",
      status: "released",
      title: "Rival Dealer",
      date: "2013-12-11",
      summary:
        "Three tracks framed by the sender as 'anti-bullying tunes'; 'Come Down to Us' closes on Lana Wachowski's HRC speech.",
      sourceIds: [S.wikiRival, S.pitchforkRival],
    },
    {
      id: "work-temple-sleeper",
      kind: "recording",
      status: "released",
      title: "Temple Sleeper",
      date: "2015",
      summary:
        "A euphoric one-off single issued on Blackdown's Keysound label rather than Hyperdub.",
      sourceIds: [S.crackShock],
    },
    {
      id: "work-sweetz",
      kind: "recording",
      status: "released",
      title: "Sweetz (with Zomby)",
      date: "2016",
      summary: "One-sided 10-inch collaboration on Hyperdub.",
      sourceIds: [S.discogs, S.bandcamp],
    },
    {
      id: "work-young-death",
      kind: "recording",
      status: "released",
      title: "Young Death / Nightmarket",
      date: "2016-11-28",
      summary:
        "Hyperdub's 100th release, surfaced early by an accidental Toronto shop sale.",
      sourceIds: [S.wikiYoungDeath, S.pitchforkYoungDeath],
    },
    {
      id: "work-inner-city-life",
      kind: "recording",
      status: "released",
      title: "Goldie — 'Inner City Life' (Burial remix)",
      date: "2017",
      summary:
        "Remix of the 1994 Metalheadz anthem, released on a 12-inch for the label.",
      sourceIds: [S.metalheadz],
    },
    {
      id: "work-subtemple",
      kind: "recording",
      status: "released",
      title: "Subtemple / Beachfires",
      date: "2017",
      summary: "Beatless, spectral Hyperdub EP.",
      sourceIds: [S.wikiDisco, S.bandcamp],
    },
    {
      id: "work-rodent",
      kind: "recording",
      status: "released",
      title: "Rodent",
      date: "2017",
      summary: "A relatively club-directed single on Hyperdub.",
      sourceIds: [S.wikiDisco, S.bandcamp, S.allmusic],
    },
    {
      id: "work-fabriclive",
      kind: "recording",
      status: "released",
      title: "Fabriclive.100 (with Kode9)",
      date: "2018",
      summary: "The final Fabriclive mix in the series' original run.",
      sourceIds: [S.allmusic, S.consequenceInfirmary],
    },
    {
      id: "work-flame-1",
      kind: "recording",
      status: "released",
      title: "Fog / Shrine (as Flame 1, with The Bug)",
      date: "2018",
      summary: "First collaborative EP with Kevin Martin's The Bug, on Pressure.",
      sourceIds: [S.discogs, S.wikipedia],
    },
    {
      id: "work-flame-2",
      kind: "recording",
      status: "released",
      title: "Dive / Rain (as Flame 2, with The Bug)",
      date: "2019",
      summary: "Second Flame EP on Pressure.",
      sourceIds: [S.discogs, S.wikipedia],
    },
    {
      id: "work-claustro",
      kind: "recording",
      status: "released",
      title: "Claustro / State Forest",
      date: "2019",
      summary: "Two-track single on Hyperdub.",
      sourceIds: [S.wikiDisco, S.bandcamp],
    },
    {
      id: "work-tunes",
      kind: "recording",
      status: "released",
      title: "Tunes 2011–2019",
      date: "2019-12-06",
      summary:
        "Seventeen-track compilation of the solo EP catalogue, sequenced by Burial.",
      sourceIds: [S.wikiTunes, S.allmusic],
    },
    {
      id: "work-her-revolution",
      kind: "recording",
      status: "released",
      title: "Her Revolution / His Rope (with Four Tet and Thom Yorke)",
      date: "2020-12",
      summary: "Second three-way single, on XL Recordings.",
      sourceIds: [S.pitchforkDolphinz],
    },
    {
      id: "work-shock-power",
      kind: "recording",
      status: "released",
      title: "Shock Power of Love EP (with Blackdown)",
      date: "2021-04-30",
      summary:
        "Unannounced Keysound split: 'Dark Gethsemane' and 'Space Cadet,' among his most openly hopeful tracks.",
      sourceIds: [S.crackShock],
    },
    {
      id: "work-chemz-dolphinz",
      kind: "recording",
      status: "released",
      title: "Chemz / Dolphinz",
      date: "2021-05-21",
      summary:
        "Two-part Hyperdub single; 'Chemz' surprise-dropped in December 2020.",
      sourceIds: [S.pitchforkDolphinz, S.bandcamp],
    },
    {
      id: "work-antidawn",
      kind: "recording",
      status: "released",
      title: "Antidawn",
      date: "2022-01-06",
      summary:
        "Forty-four-minute beatless ambient EP — his longest release since Untrue.",
      sourceIds: [S.pitchforkAntidawn, S.bandcamp],
    },
    {
      id: "work-streetlands",
      kind: "recording",
      status: "released",
      title: "Streetlands",
      date: "2022-10-21",
      summary: "Surprise three-track EP on Hyperdub.",
      sourceIds: [S.pitchforkStreetlands, S.bandcamp],
    },
    {
      id: "work-infirmary",
      kind: "recording",
      status: "released",
      title: "Infirmary / Unknown Summer (with Kode9)",
      date: "2023-07-21",
      summary: "fabric Originals split single; premiered by Mary Anne Hobbs.",
      sourceIds: [S.fabricInfirmary, S.consequenceInfirmary],
    },
    {
      id: "work-dreamfear",
      kind: "recording",
      status: "released",
      title: "Dreamfear / Boy Sent From Above",
      date: "2024-02-09",
      summary: "Two long tracks on XL Recordings.",
      sourceIds: [S.xlDreamfear, S.bandcamp],
    },
    {
      id: "work-phoneglow",
      kind: "recording",
      status: "released",
      title: "Phoneglow / Eyes Go Blank (with Kode9)",
      date: "2024-06",
      summary: "Hyperdub split single.",
      sourceIds: [S.hyperdubArtist, S.bandcamp],
    },
    {
      id: "work-comafields",
      kind: "recording",
      status: "released",
      title: "Comafields / Imaginary Festival",
      date: "2025-08",
      summary: "Two long tracks on Hyperdub; the most recent release.",
      sourceIds: [S.bandcamp, S.hyperdubArtist],
    },
  ],
  appearances: [
    {
      id: "appearance-blackdown",
      title: "soundboy burial",
      venue: "Blackdown (Martin Clark's blog)",
      publishedAt: "2006-03",
      participants: ["Burial", "Martin Clark"],
      summary:
        "The first published interview: Sound Forge, the fishbone drum notation, rain-and-crackle surfaces, and 'only five people know I make tunes' territory before it was famous.",
      media: [
        {
          type: "article",
          url: "https://blackdownsoundboy.blogspot.com/2006/03/soundboy-burial.html",
          sourceId: S.blackdown,
        },
      ],
      sourceIds: [S.blackdown],
    },
    {
      id: "appearance-wire-fisher",
      title: "Burial: Unedited Transcript",
      venue: "The Wire",
      publishedAt: "2012-12",
      participants: ["Burial", "Mark Fisher"],
      summary:
        "Fisher's unedited transcript of the 2007 Wire interview: the 'forbidden siren' vocals, the scrapped dark second album, 'I want to be in a symbol... the name of a tune.'",
      media: [
        {
          type: "transcript",
          url: "https://www.thewire.co.uk/in-writing/interviews/burial_unedited-transcript",
          sourceId: S.wireTranscript,
        },
      ],
      sourceIds: [S.wireTranscript],
    },
    {
      id: "appearance-guardian-hancox",
      title: "'Only five people know I make tunes'",
      venue: "The Guardian",
      publishedAt: "2007-10-26",
      participants: ["Burial", "Dan Hancox"],
      summary:
        "The 10 October 2007 Tooting conversation, run in the Guardian under the anonymity-era terms — the last substantive interview he has given.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/music/2007/oct/26/urban",
          sourceId: S.guardianHancox,
        },
        {
          type: "transcript",
          url: "https://danhancox.substack.com/p/burials-last-interview",
          sourceId: S.hancoxSubstack,
        },
      ],
      sourceIds: [S.guardianHancox, S.hancoxSubstack],
    },
    {
      id: "appearance-hyperdub-untrue",
      title: "Untrue announcement Q&A",
      venue: "Hyperdub Records blog",
      publishedAt: "2007-10",
      participants: ["Burial", "Kode9"],
      summary:
        "The label's own announcement carries a short Q&A — 'the first one was quite a pissed off basic record, downcast' — and the 'downcast euphoria' framing.",
      media: [
        {
          type: "article",
          url: "https://hyperdubrecords.blogspot.com/2007/10/burial-untrue-november-2007.html",
          sourceId: S.hyperdubBlog,
        },
      ],
      sourceIds: [S.hyperdubBlog],
    },
    {
      id: "appearance-myspace-tunes",
      title: "'tunes' — the self-naming post",
      venue: "MySpace (myspace.com/burialuk)",
      publishedAt: "2008-08-05",
      participants: ["Burial"],
      summary:
        "The 10:34am post naming himself Will Bevan and posting a portrait — his only statement on the unmasking. The original page is gone; The FADER's verbatim reprint preserves the text.",
      media: [
        {
          type: "article",
          url: "https://www.thefader.com/2008/08/06/burial-reveals-himself-overuses-the-word-tunes",
          sourceId: S.faderMyspace,
        },
      ],
      sourceIds: [S.faderMyspace, S.guardianUnmasked],
    },
    {
      id: "appearance-hobbs-message",
      title: "Rival Dealer message read on BBC 6 Music",
      venue: "BBC Radio 6 Music",
      publishedAt: "2013-12",
      participants: ["Burial", "Mary Anne Hobbs"],
      summary:
        "A written message sent to Hobbs' show — the 'anti-bullying tunes... angel's spell' framing — the closest thing to a public statement in the post-2008 era.",
      sourceIds: [S.lobfRival, S.wikiRival],
    },
  ],
  relations: [
    {
      id: "rel-hyperdub",
      kind: "member_of",
      target: "hyperdub",
      targetName: "Hyperdub",
      targetKind: "organization",
      note: "First outside artist signed to Kode9's label — South London Boroughs was catalogue HDB001 — and his catalog home ever since.",
      targetWikidataId: "Q2994824",
      sourceIds: [S.wikipedia, S.marino, S.hyperdubSlb, S.dazedHyperdub],
    },
    {
      id: "rel-kode9",
      kind: "collaborated",
      target: "kode9",
      targetName: "Kode9 (Steve Goodman)",
      note: "Signed him after the 2002 CD-Rs; the Fabriclive.100 joint mix and the split singles 'Infirmary / Unknown Summer' (2023) and 'Phoneglow / Eyes Go Blank' (2024).",
      targetWikidataId: "Q1394828",
      sourceIds: [S.marino, S.allmusic, S.consequenceInfirmary, S.fabricInfirmary, S.hyperdubArtist],
    },
    {
      id: "rel-four-tet",
      kind: "collaborated",
      target: "four-tet",
      targetName: "Four Tet (Kieran Hebden)",
      note: "'Moth'/'Wolf Cub' (2009), 'Ego'/'Mirror' (2011), and 'Her Revolution'/'His Rope' (2020) — the last two also with Thom Yorke.",
      targetWikidataId: "Q959655",
      sourceIds: [S.wikiMoth, S.pitchforkDolphinz, S.discogs],
    },
    {
      id: "rel-thom-yorke",
      kind: "collaborated",
      target: "thom-yorke",
      targetName: "Thom Yorke",
      note: "'Ego'/'Mirror' (2011) and 'Her Revolution'/'His Rope' (2020), both with Four Tet.",
      targetWikidataId: "Q188668",
      sourceIds: [S.pitchforkDolphinz],
    },
    {
      id: "rel-massive-attack",
      kind: "collaborated",
      target: "massive-attack",
      targetName: "Massive Attack",
      targetKind: "organization",
      note: "'Four Walls'/'Paradise Circus' (2011), a 1,000-copy 12-inch that sold out on the first pre-order day.",
      targetWikidataId: "Q357418",
      sourceIds: [S.wikiFourWalls],
    },
    {
      id: "rel-zomby",
      kind: "collaborated",
      target: "zomby",
      targetName: "Zomby",
      note: "'Sweetz' (Hyperdub, 2016).",
      targetWikidataId: "Q4993203",
      sourceIds: [S.discogs],
    },
    {
      id: "rel-the-bug",
      kind: "collaborated",
      target: "the-bug",
      targetName: "The Bug (Kevin Martin)",
      note: "The Flame 1 and Flame 2 EPs on Pressure (2018–19).",
      start: "2018",
      end: "2019",
      targetWikidataId: "Q2150733",
      sourceIds: [S.discogs],
    },
    {
      id: "rel-blackdown",
      kind: "collaborated",
      target: "blackdown",
      targetName: "Blackdown",
      note: "'Shock Power of Love' split EP (Keysound, 2021); Burial's 2006 remix of 'Crackle Blues' was one of his first-ever releases.",
      sourceIds: [S.crackShock],
    },
    {
      id: "rel-jamie-woon",
      kind: "collaborated",
      target: "jamie-woon",
      targetName: "Jamie Woon",
      note: "Credited under his real name for co-production on 'Night Air' (2010); he also remixed 'Wayfaring Stranger' (2007).",
      targetWikidataId: "Q976579",
      sourceIds: [S.quietusWoon],
    },
    {
      id: "rel-goldie",
      kind: "collaborated",
      target: "goldie",
      targetName: "Goldie",
      note: "Remixed 'Inner City Life' for the 2017 Metalheadz 12-inch.",
      targetWikidataId: "Q507845",
      sourceIds: [S.metalheadz],
    },
    {
      id: "rel-martin-clark",
      kind: "interviewed_by",
      target: "martin-clark",
      targetName: "Martin Clark (Blackdown)",
      note: "The first published Burial interview, 'soundboy burial,' March 2006.",
      sourceIds: [S.blackdown],
    },
    {
      id: "rel-mark-fisher",
      kind: "interviewed_by",
      target: "mark-fisher",
      targetName: "Mark Fisher",
      note: "The 2007 Wire interview; Fisher published the unedited transcript in December 2012.",
      targetWikidataId: "Q20740852",
      sourceIds: [S.wireTranscript],
    },
    {
      id: "rel-dan-hancox",
      kind: "interviewed_by",
      target: "dan-hancox",
      targetName: "Dan Hancox",
      note: "The October 10, 2007 Tooting conversation for The Guardian — 'Burial's last interview.'",
      sourceIds: [S.guardianHancox, S.hancoxSubstack],
    },
    {
      id: "rel-james-blake",
      kind: "influenced",
      target: "james-blake",
      targetName: "James Blake",
      note: "Critics trace Untrue's scene-wide introspective turn — 'blubstep' — through Blake's generation of producers.",
      targetWikidataId: "Q350362",
      sourceIds: [S.pitchforkReynolds, S.mixmagUntrue],
    },
    {
      id: "rel-darkstar",
      kind: "influenced",
      target: "darkstar",
      targetName: "Darkstar",
      targetKind: "organization",
      note: "Named alongside James Blake and Jamie Woon as inheritors of Untrue's introspective turn.",
      targetWikidataId: "Q2561455",
      sourceIds: [S.pitchforkReynolds, S.mixmagUntrue],
    },
  ],
  openQuestions: [
    "His date of birth and age have never been published; the Elliott School detail implies a late-1970s/early-1980s birth year but rests on The Independent's reporting and Joe Goddard's 'year above' remark — never confirmed by Bevan.",
    "Whether the 2008 self-naming was timed to deflate The Sun's campaign is interpretation: Hancox says he was 'forced'; the post says only that 'the unknown thing became an issue.'",
    "The 'next album' he told fans he was finishing in August 2008 has never appeared; whether it dissolved into the EP catalogue, was abandoned, or remains in progress is unknown.",
    "The batch of dark tunes scrapped before Untrue (his account to Mark Fisher) — unreleased, destroyed, or reworked into later EPs — is undocumented.",
    "The scale of the pre-2002 home catalogue made 'for my brothers' is unknown; only what Goodman was sent has ever surfaced.",
    "He has never performed live as Burial; whether he performs under any other name, or ever intends to, is undocumented (the 2015 Unsound rumour was false).",
    "The 'five people' who knew he made tunes were never enumerated publicly.",
    "Whether he records under other aliases is unverified; the William Bevan credit covers the Flame 1/Flame 2 groups and session-style production work, but alias rumours are fan speculation.",
    "Who operates the official Bandcamp and any social accounts day to day — Bevan or the label — is not disclosed.",
    "The school and neighbourhood specifics beyond 'South London' (Elliott School, Putney) were reported by The Independent, not volunteered by him; his own confirmation stops at name and region.",
    "Whether the absence of interviews since 2007 is a fixed policy or simply preference is unstated; Hancox leaves it open: 'maybe not the final one. It's up to him.'",
    "Nothing post-2008 documents his occupation or daily life; whether music has ever been his full-time work is unknown.",
  ],
  body: `Burial is the alias of William Emmanuel Bevan, a South London electronic musician who built the most carefully emptied public profile in modern British music — and then, for one morning in August 2008, filled in his own name. Everything the index knows about him arrives through three channels: a tiny set of pre-2008 interviews, a single MySpace post, and twenty years of records that surface without warning.

## The record before the face

Bevan found Steve Goodman's Hyperdub webzine while hunting for old UK garage records and, around 2002, began mailing letters and CD-Rs of home-made tracks. He had been making tunes for years "literally just for me and my brothers," and told Martin Clark he had never sent them to anyone else. Goodman turned the webzine into a label in 2004; Burial's *South London Boroughs* (May 2005) was its third release and its first by an outside artist. The self-titled debut followed in May 2006 — made in Sound Forge, an audio editor with no sequencer and no undo, drums judged by waveform silhouette ("a nice fishbone"). *The Wire* named it record of the year.

*Untrue* arrived 5 November 2007: pitch-bent R&B vocals, rain and vinyl crackle, 2-step rhythms in slow decay. It was shortlisted for the 2008 Mercury Prize and later canonized at a scale rare for electronic music — FACT's album of the 2000s, third in Resident Advisor's decade poll, one of NPR's fifty most important recordings of the decade, and, in Simon Reynolds' decade-on essay for Pitchfork, "the most important electronic album of the century so far."

## The anonymity and its end

The anonymity was the point, not the marketing. "Only five people know I make tunes," he told Dan Hancox in October 2007, in what stands as his last substantive interview. To Mark Fisher he explained that the tunes he loved were made by people whose faces he never knew: "I just want to be in a symbol... the name of a tune." Three interviews — Clark (March 2006), Fisher (2007), Hancox (October 2007) — are essentially the whole spoken record.

In February 2008 The Independent named William Bevan, an Elliott School alumnus, as the likely man. When *Untrue* made the Mercury shortlist that July and Burial became the bookmakers' favourite, The Sun's Bizarre column launched a public manhunt with a reward; dubstepforum.com users seeded misinformation in reply, and the theory that Burial was actually Fatboy Slim made it into print. At 10:34am on 5 August 2008, Burial posted on MySpace: "my names will bevan, im from south london... im a lowkey person and i just want to make some tunes, nothing else." A portrait photo echoed the drawn self-portrait on *Untrue*'s cover. He did not attend the Mercury ceremony; Elbow won; sales of *Untrue* rose roughly tenfold the next week. Whether the post was forced or a deliberate deflation of the tabloid scoop is genuinely unsettled — Hancox frames it as the former; the post's own shrug suggests the latter.

## The long silence

Since then the record is all release notes. The collaborations stay inside a small trusted circle: Four Tet (*Moth / Wolf Cub*, 2009), Four Tet with Thom Yorke (*Ego / Mirror*, 2011; *Her Revolution / His Rope*, 2020), Massive Attack (the thousand-copy *Four Walls / Paradise Circus*, 2011), Zomby (*Sweetz*, 2016), The Bug (the Flame 1 and Flame 2 EPs, 2018-19), Blackdown (*Shock Power of Love*, 2021), and Kode9 (*Fabriclive.100*, 2018; the *Infirmary / Unknown Summer* and *Phoneglow / Eyes Go Blank* splits, 2023-24). Jamie Woon's "Night Air" carries a co-production credit to "Will Bevan" — a credit under the real name, not the alias.

The solo work continued as winter apparitions: *Kindred* (2012), *Truant / Rough Sleeper* (2012), *Rival Dealer* (2013) — prefaced by a message sent to Mary Anne Hobbs' radio show calling them "anti-bullying tunes... an angel's spell" — *Young Death / Nightmarket* (2016, surfaced when a Toronto shop accidentally sold five copies), *Antidawn* and *Streetlands* (2022), *Dreamfear / Boy Sent From Above* on XL (2024), and *Comafields / Imaginary Festival* (2025). *Tunes 2011–2019* compiled the EP run into the closest thing to a third-album statement. The actual third album — "my next album," he called it in 2008 — has never appeared.

## What the work is about

The through-line, in his own words, is memory as physical force: rave music his older brother lived, heard second-hand through records and stories, where "a single synth stab... could kill someone, because of that memory." Critics filed it under hauntology — an elegy for the hardcore continuum — but the stated aim is warmer: music "for moody people to walk across London in the rain to... a little sanctuary... a light in the darkness." Anonymity serves that aim twice over: it keeps "nothing between you and the tunes," and it keeps the maker, a self-described lowkey person, out of the frame.

## What the record does not settle

Almost everything biographical stops at August 2008. No birthdate, no confirmed schooling, no occupation, no photograph beyond the handful already in the record, no live performance ever, no interview in nearly nineteen years — and, characteristically, no statement that there will never be one. The index preserves that thinness rather than filling it.

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
