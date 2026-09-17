#!/usr/bin/env bun
/** Generate examples/people/daniel-lopatin/person-index.json with derived source ids. */

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

// --- Subject-controlled ------------------------------------------------------

const pointnever = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Oneohtrix Point Never — official site",
  url: "https://pointnever.com/",
  publisher: "pointnever.com",
  notes: "The subject's own site; used for release and project announcements.",
});
const bandcampAgain = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Again | Oneohtrix Point Never",
  url: "https://oneohtrixpointnever.bandcamp.com/album/again",
  publisher: "Bandcamp (Oneohtrix Point Never)",
  publishedAt: "2023-09-29",
  notes:
    "The subject's own Bandcamp; carries his first-person description of Again as a 'speculative autobiography.'",
});
const sunsetcorp = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "sunsetcorp — YouTube channel",
  url: "https://www.youtube.com/@sunsetcorp",
  publisher: "YouTube",
  notes:
    "Lopatin's own YouTube channel, host of the 2009–2010 eccojam uploads and its 2023 reactivation.",
});
const nobodyHere = source({
  binding: "subject_controlled",
  mediaType: "video",
  title: "nobody here",
  url: "https://www.youtube.com/watch?v=-RFunvF0mDw",
  publisher: "YouTube (sunsetcorp)",
  publishedAt: "2009-07-19",
  notes:
    "The original sunsetcorp upload: a looped fragment of Chris de Burgh's 'The Lady in Red' over the 'Rainbow Road' computer graphic.",
});

// --- Reference ---------------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Oneohtrix Point Never (Q286346)",
  url: "https://www.wikidata.org/wiki/Q286346",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Oneohtrix Point Never",
  url: "https://en.wikipedia.org/wiki/Oneohtrix_Point_Never",
  publisher: "Wikipedia",
  notes: "Used for discovery and cross-checking, not as sole authority.",
});
const wikiEccojams = source({
  binding: "reference",
  mediaType: "article",
  title: "Chuck Person's Eccojams Vol. 1",
  url: "https://en.wikipedia.org/wiki/Chuck_Person%27s_Eccojams_Vol._1",
  publisher: "Wikipedia",
  notes: "Good Article; dense citation trail for the sunsetcorp/eccojam record.",
});
const wikiReplica = source({
  binding: "reference",
  mediaType: "article",
  title: "Replica (Oneohtrix Point Never album)",
  url: "https://en.wikipedia.org/wiki/Replica_(Oneohtrix_Point_Never_album)",
  publisher: "Wikipedia",
});
const wikiOctagon = source({
  binding: "reference",
  mediaType: "article",
  title: "Betrayed in the Octagon",
  url: "https://en.wikipedia.org/wiki/Betrayed_in_the_Octagon",
  publisher: "Wikipedia",
});
const wikiGoodTime = source({
  binding: "reference",
  mediaType: "article",
  title: "Good Time (soundtrack)",
  url: "https://en.wikipedia.org/wiki/Good_Time_(soundtrack)",
  publisher: "Wikipedia",
});
const appleTranquilizer = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Tranquilizer — Album by Oneohtrix Point Never",
  url: "https://music.apple.com/us/album/tranquilizer/1840747238",
  publisher: "Apple Music",
  publishedAt: "2025-11-21",
  notes:
    "Apple Music editorial notes; confirms Weeknd writing/production credits spanning After Hours, Dawn FM, and Hurry Up Tomorrow.",
});

// --- Primary record ------------------------------------------------------------

const warpArtist = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Oneohtrix Point Never — Artists — WARP",
  url: "https://warp.net/artists/oneohtrix-point-never",
  publisher: "Warp Records",
  notes: "His label's artist page and release catalog.",
});
const warpTranquilizer = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Tranquilizer by Oneohtrix Point Never — Releases — WARP",
  url: "https://warp.net/releases/552598-tranquilizer",
  publisher: "Warp Records",
  publishedAt: "2025-11-21",
  notes:
    "Label release page; carries the album's origin story about a vanished archive of 1990s sample CDs.",
});
const mexicanSummer = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Ford & Lopatin — Mexican Summer",
  url: "https://mexicansummer.com/artist/ford-lopatin/",
  publisher: "Mexican Summer",
  notes:
    "Label artist page describing the Games → Ford & Lopatin rename and the founding of Software Recording Co.",
});
const curatorialClub = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "TCC011 | Chuck Person's Eccojams Vol. 1",
  url: "http://thecuratorialclub.blogspot.com/2010/08/tcc011-chuck-persons-eccojams-volume1.html",
  publisher: "The Curatorial Club",
  publishedAt: "2010-08-08",
  notes: "The label's own release post for the 100-cassette Eccojams run.",
});
const armory = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "MYRIAD — Park Avenue Armory",
  url: "https://www.armoryonpark.org/season-events/2018-season/myriad/",
  publisher: "Park Avenue Armory",
  publishedAt: "2018",
  notes: "Venue's official page for the MYRIAD 'concertscape' world premiere, May 22–24, 2018.",
});

// --- Archive -------------------------------------------------------------------

const reynoldsVV = source({
  binding: "archive",
  mediaType: "article",
  title: "Brooklyn's Noise Scene Catches Up to Oneohtrix Point Never",
  url: "https://web.archive.org/web/20161012081438/http://www.villagevoice.com/music/brooklyns-noise-scene-catches-up-to-oneohtrix-point-never-6393906",
  publisher: "The Village Voice (via Internet Archive)",
  publishedAt: "2010-07-06",
  authors: ["Simon Reynolds"],
  notes:
    "Simon Reynolds's 2010 profile; original villagevoice.com page is dead, so the Internet Archive capture is catalogued.",
});

// --- Interviews ------------------------------------------------------------------

const villageVoice = source({
  binding: "interview",
  mediaType: "article",
  title: "Q&A: Ford & Lopatin On Playing Together And Playing With Studio Toys",
  url: "https://www.villagevoice.com/qa-ford-lopatin-on-playing-together-and-playing-with-studio-toys/",
  publisher: "The Village Voice",
  publishedAt: "2011",
  notes:
    "Joint interview with Joel Ford covering their high-school synth beginnings, college years, and the Software label's founding under Mexican Summer.",
});
const raInsideWorld = source({
  binding: "interview",
  mediaType: "article",
  title: "Oneohtrix Point Never: Inside world",
  url: "https://ra.co/features/1948",
  publisher: "Resident Advisor",
  publishedAt: "2013-10-02",
  authors: ["Angus Finlayson"],
});
const pfGOLpodcast = source({
  binding: "interview",
  mediaType: "article",
  title: "This Is How We Do It: Oneohtrix Point Never",
  url: "https://pitchfork.com/features/podcast/9767-this-is-how-we-do-it-oneohtrix-point-never/",
  publisher: "Pitchfork",
  publishedAt: "2015-12-09",
  authors: ["Jenn Pelly"],
  notes: "Podcast-format interview on Garden of Delete's Ezra/Kaoss Edge fiction.",
});
const factGOL = source({
  binding: "interview",
  mediaType: "article",
  title: "Oneohtrix Point Never unpicks the secrets of Garden Of Delete",
  url: "https://www.factmag.com/2015/11/12/oneohtrix-point-never-garden-of-delete-interview/",
  publisher: "FACT",
  publishedAt: "2015-11-12",
});
const vergeGOL = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Getting to the thrash point: a conversation with Daniel Lopatin, aka Oneohtrix Point Never",
  url: "https://www.theverge.com/2015/11/12/9723304/oneohtrix-point-never-daniel-lopatin-interview-garden-of-delete",
  publisher: "The Verge",
  publishedAt: "2015-11-12",
});
const guardianGOL = source({
  binding: "interview",
  mediaType: "article",
  title:
    "No Bieber? No problem! How Oneohtrix Point Never made a pop album without the pop stars",
  url: "https://www.theguardian.com/music/2015/nov/18/oneohtrix-point-never-garden-of-delete",
  publisher: "The Guardian",
  publishedAt: "2015-11-18",
});
const nyt2018 = source({
  binding: "interview",
  mediaType: "article",
  title: "Oneohtrix Point Never's Quest to Make Music That Freaks People Out",
  url: "https://www.nytimes.com/2018/05/31/arts/music/oneohtrix-point-never-daniel-lopatin-age-of.html",
  publisher: "The New York Times",
  publishedAt: "2018-05-31",
  authors: ["Jon Pareles"],
});
const nprGems = source({
  binding: "interview",
  mediaType: "article",
  title: "Inside 'Uncut Gems': A Cosmic Score In A Frantic Film",
  url: "https://www.npr.org/2019/12/28/791473556/inside-uncut-gems-a-cosmic-score-in-a-frantic-film",
  publisher: "NPR (All Things Considered)",
  publishedAt: "2019-12-28",
  authors: ["Tim Greiving"],
});
const varietyGems = source({
  binding: "interview",
  mediaType: "article",
  title: "Behind the Music of 'Uncut Gems': How the Movie's Score Was Made",
  url: "https://variety.com/2020/music/news/music-of-uncut-gems-movie-score-daniel-lopato-josh-safdie-interview-1203461553/",
  publisher: "Variety",
  publishedAt: "2020-01",
  notes: "Featurette/interview on the Moog-and-choir Uncut Gems score with Josh Safdie.",
});
const gq2020 = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Daniel Lopatin On Returning to His Roots as Oneohtrix Point Never and Working with The Weeknd",
  url: "https://www.gq.com/story/oneohtrix-point-never-magic-oneohtrix-point-never-album-the-weeknd-interview",
  publisher: "GQ",
  publishedAt: "2020-10-27",
});
const flashArt = source({
  binding: "interview",
  mediaType: "article",
  title: "Slanted and Re-enchanted: Magic Oneohtrix Point Never",
  url: "https://flash---art.com/article/magic-oneohtrix-point-never/",
  publisher: "Flash Art",
  publishedAt: "2020-11",
  authors: ["Dean Kissick"],
});
const guardianRadar = source({
  binding: "first_person",
  mediaType: "article",
  title: "On my radar: Oneohtrix Point Never's cultural highlights",
  url: "https://www.theguardian.com/culture/2023/sep/30/on-my-radar-oneohtrix-point-never-daniel-lopatin-cultural-highlights",
  publisher: "The Guardian",
  publishedAt: "2023-09-30",
  notes:
    "A first-person 'On my radar' column: his own cultural picks, in his own words.",
});
const rsMarty = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Oneohtrix Point Never on the 'Feral' Creativity of His 'Marty Supreme' Score",
  url: "https://www.rollingstone.com/music/music-features/oneohtrix-point-never-marty-supreme-score-interview-1235493366/",
  publisher: "Rolling Stone",
  publishedAt: "2026-01-05",
  authors: ["Brittany Spanos"],
});

// --- Reporting ---------------------------------------------------------------------

const pfSoftware = source({
  binding: "reporting",
  mediaType: "article",
  title: "Games Change Name to Ford & Lopatin, Start Mexican Summer Imprint Software",
  url: "https://pitchfork.com/news/41514-games-change-name-to-ford-lopatin-start-mexican-summer-imprint-software/",
  publisher: "Pitchfork",
  publishedAt: "2011-02-09",
  authors: ["Larry Fitzmaurice"],
});
const pfRplus7 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never Announces New Album R Plus Seven",
  url: "https://pitchfork.com/news/51223-oneohtrix-point-never-announces-new-album-r-plus-seven/",
  publisher: "Pitchfork",
  publishedAt: "2013-06-19",
  authors: ["Jenn Pelly"],
});
const pfEccojams = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never: Chuck Person's Eccojams Vol. 1 Album Review",
  url: "https://pitchfork.com/reviews/albums/oneohtrix-point-never-chuck-persons-eccojams-vol-1/",
  publisher: "Pitchfork",
  publishedAt: "2021",
  notes:
    "Retrospective review calling Eccojams Vol. 1 'the most influential cassette tape of the 21st century.'",
});
const talkhouse = source({
  binding: "reporting",
  mediaType: "article",
  title: "Eccojams Vol. 1 Was the Blueprint for Vaporwave",
  url: "https://www.talkhouse.com/eccojams-vol-1-was-the-blueprint-for-vaporwave/",
  publisher: "Talkhouse",
  publishedAt: "2020-09-02",
  authors: ["K. Nkanza Hansen"],
});
const boilerRoom = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Oneohtrix Point Never: 'Nobody Here' — 4:3",
  url: "https://fourthree.boilerroom.tv/film/oneohtrix-point-never-nobody-here",
  publisher: "Boiler Room 4:3",
  notes:
    "Short film/essay on 'nobody here' as the eccojam that 'spawned peak-internet microgenre vaporwave.'",
});
const pfCannes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never Wins Soundtrack Award at Cannes Film Festival",
  url: "https://pitchfork.com/news/73804-oneohtrix-point-never-wins-soundtrack-award-at-cannes-film-festival/",
  publisher: "Pitchfork",
  publishedAt: "2017-05-27",
});
const raMYRIAD = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never presents MYRIAD in New York — Event Review",
  url: "https://ra.co/reviews/22662",
  publisher: "Resident Advisor",
  publishedAt: "2018-05",
});
const pfMOPN = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never: Magic Oneohtrix Point Never Album Review",
  url: "https://pitchfork.com/reviews/albums/oneohtrix-point-never-magic-oneohtrix-point-never/",
  publisher: "Pitchfork",
  publishedAt: "2020-10",
});
const consequenceMOPN = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never Releases New Album Magic Oneohtrix Point Never: Stream",
  url: "https://consequence.net/2020/10/magic-oneohtrix-point-never-stream/",
  publisher: "Consequence",
  publishedAt: "2020-10-30",
});
const rsNoNightmares = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never Taps the Weeknd for New Song 'No Nightmares'",
  url: "https://www.rollingstone.com/music/music-news/oneohtrix-point-never-the-weeknd-new-song-no-nightmares-1081251/",
  publisher: "Rolling Stone",
  publishedAt: "2020-10-26",
  authors: ["Jon Blistein"],
});
const pfDawnFM = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Weeknd Releases New Album Dawn FM: Listen and Read the Full Credits",
  url: "https://pitchfork.com/news/the-weeknd-releases-new-album-dawn-fm-listen-and-read-the-full-credits/",
  publisher: "Pitchfork",
  publishedAt: "2022-01-07",
});
const mbw = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Downtown Music Services inks global publishing deal with The Weeknd producer Daniel Lopatin",
  url: "https://www.musicbusinessworldwide.com/downtown-music-services-inks-global-publishing-deal-with-the-weeknd-producer-daniel-lopatin/",
  publisher: "Music Business Worldwide",
  publishedAt: "2022",
  notes:
    "Confirms his executive-producer credit on Dawn FM and his role as musical director for the Weeknd's 2021 Super Bowl halftime performance.",
});
const pfAgain = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never Announces New Album Again",
  url: "https://pitchfork.com/news/oneohtrix-point-never-announces-new-album-again/",
  publisher: "Pitchfork",
  publishedAt: "2023-08-23",
});
const pfCurse = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "John Medeski and Daniel Lopatin Detail Soundtrack Album for Nathan Fielder's The Curse",
  url: "https://pitchfork.com/news/john-medeski-and-daniel-lopatin-detail-soundtrack-album-for-nathan-fielder-the-curse/",
  publisher: "Pitchfork",
  publishedAt: "2023-11-09",
});
const pfTranquilizer = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never Announces New Album Tranquilizer, Shares Songs: Listen",
  url: "https://pitchfork.com/news/oneohtrix-point-never-announces-new-album-tranquilizer-shares-songs-listen/",
  publisher: "Pitchfork",
  publishedAt: "2025-10",
});
const pfMartyNews = source({
  binding: "reporting",
  mediaType: "article",
  title: "Daniel Lopatin Details New Marty Supreme Soundtrack Album",
  url: "https://pitchfork.com/news/daniel-lopatin-details-new-marty-supreme-soundtrack-album/",
  publisher: "Pitchfork",
  publishedAt: "2025-12",
});
const pfMartyReview = source({
  binding: "reporting",
  mediaType: "article",
  title: "Daniel Lopatin: Marty Supreme (Original Soundtrack) Album Review",
  url: "https://pitchfork.com/reviews/albums/daniel-lopatin-marty-supreme-original-soundtrack/",
  publisher: "Pitchfork",
  publishedAt: "2025-12",
  notes: "The first film score to receive Pitchfork's Best New Music designation.",
});
const vultureMarty = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Story Behind the '80s-Coded 'Marty Supreme' Score Music",
  url: "https://www.vulture.com/article/marty-supreme-movie-score-oneohtrix-point-never-daniel-lopatin.html",
  publisher: "Vulture",
  publishedAt: "2025-12-30",
  authors: ["Jack Denton"],
});
const krui = source({
  binding: "reporting",
  mediaType: "article",
  title: "Oneohtrix Point Never Uploads to sunsetcorp Again",
  url: "https://krui.fm/2023/11/08/oneohtrix-point-never-uploads-to-sunsetcorp-again-to-build-hype-for-the-disdained-again/",
  publisher: "KRUI-FM",
  publishedAt: "2023-11-08",
  notes:
    "Documents the channel's ~13-year dormancy and the October 24, 2023 'MOM YOtube AUDIO 1' upload.",
});

const S = {
  pointnever: pointnever.id,
  bandcampAgain: bandcampAgain.id,
  sunsetcorp: sunsetcorp.id,
  nobodyHere: nobodyHere.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  wikiEccojams: wikiEccojams.id,
  wikiReplica: wikiReplica.id,
  wikiOctagon: wikiOctagon.id,
  wikiGoodTime: wikiGoodTime.id,
  appleTranquilizer: appleTranquilizer.id,
  warpArtist: warpArtist.id,
  warpTranquilizer: warpTranquilizer.id,
  mexicanSummer: mexicanSummer.id,
  curatorialClub: curatorialClub.id,
  armory: armory.id,
  reynoldsVV: reynoldsVV.id,
  villageVoice: villageVoice.id,
  raInsideWorld: raInsideWorld.id,
  pfGOLpodcast: pfGOLpodcast.id,
  factGOL: factGOL.id,
  vergeGOL: vergeGOL.id,
  guardianGOL: guardianGOL.id,
  nyt2018: nyt2018.id,
  nprGems: nprGems.id,
  varietyGems: varietyGems.id,
  gq2020: gq2020.id,
  flashArt: flashArt.id,
  guardianRadar: guardianRadar.id,
  rsMarty: rsMarty.id,
  pfSoftware: pfSoftware.id,
  pfRplus7: pfRplus7.id,
  pfEccojams: pfEccojams.id,
  talkhouse: talkhouse.id,
  boilerRoom: boilerRoom.id,
  pfCannes: pfCannes.id,
  raMYRIAD: raMYRIAD.id,
  pfMOPN: pfMOPN.id,
  consequenceMOPN: consequenceMOPN.id,
  rsNoNightmares: rsNoNightmares.id,
  pfDawnFM: pfDawnFM.id,
  mbw: mbw.id,
  pfAgain: pfAgain.id,
  pfCurse: pfCurse.id,
  pfTranquilizer: pfTranquilizer.id,
  pfMartyNews: pfMartyNews.id,
  pfMartyReview: pfMartyReview.id,
  vultureMarty: vultureMarty.id,
  krui: krui.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-daniel-lopatin",
  generatedAt: "2026-09-17T03:00:00Z",
  subject: {
    kind: "person",
    handle: "daniel-lopatin",
    displayName: "Daniel Lopatin",
    alsoKnownAs: [
      "Oneohtrix Point Never",
      "OPN",
      "0PN",
      "Magic Oneohtrix Point Never",
      "Chuck Person",
      "sunsetcorp",
      "Dania Shapes",
      "KGB Man",
    ],
    summary:
      "American electronic musician, composer, and producer who records as Oneohtrix Point Never — the Eccojams tapes that seeded vaporwave, a decade of Warp albums, the Safdie brothers' film scores, and extensive production for the Weeknd.",
    identity: {
      wikidataId: "Q286346",
      officialSite: "https://pointnever.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Oneohtrix_Point_Never",
      profiles: [
        "https://x.com/0PN",
        "https://www.instagram.com/eccopn/",
        "https://www.youtube.com/channel/UC0xbzNitcynZOG9A2Rb_wPw",
        "https://www.youtube.com/@sunsetcorp",
        "https://oneohtrixpointnever.bandcamp.com/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media", "beliefs"],
  },
  sources: [
    pointnever,
    bandcampAgain,
    sunsetcorp,
    nobodyHere,
    wikidata,
    wikipedia,
    wikiEccojams,
    wikiReplica,
    wikiOctagon,
    wikiGoodTime,
    appleTranquilizer,
    warpArtist,
    warpTranquilizer,
    mexicanSummer,
    curatorialClub,
    armory,
    reynoldsVV,
    villageVoice,
    raInsideWorld,
    pfGOLpodcast,
    factGOL,
    vergeGOL,
    guardianGOL,
    nyt2018,
    nprGems,
    varietyGems,
    gq2020,
    flashArt,
    guardianRadar,
    rsMarty,
    pfSoftware,
    pfRplus7,
    pfEccojams,
    talkhouse,
    boilerRoom,
    pfCannes,
    raMYRIAD,
    pfMOPN,
    consequenceMOPN,
    rsNoNightmares,
    pfDawnFM,
    mbw,
    pfAgain,
    pfCurse,
    pfTranquilizer,
    pfMartyNews,
    pfMartyReview,
    vultureMarty,
    krui,
  ],
  claims: [
    {
      id: "claim-born-1982",
      kind: "fact",
      text: "Daniel Lopatin was born on July 25, 1982, in Massachusetts — his Wikipedia infobox lists Boston — the son of Russian-Jewish emigrants, both with musical backgrounds.",
      sourceIds: [S.wikipedia, S.wikidata, S.guardianRadar],
    },
    {
      id: "claim-name-origin",
      kind: "fact",
      text: "His main recording name, Oneohtrix Point Never, is a verbal play on the Boston soft-rock FM station Magic 106.7; he initially styled it 'Magic Oneohtrix Point Never' on the 2007 cassette edition of Betrayed in the Octagon.",
      sourceIds: [S.wikipedia, S.wikiOctagon],
    },
    {
      id: "claim-alias-taxonomy",
      kind: "fact",
      text: "His catalog is split across distinct aliases with distinct jobs: Oneohtrix Point Never (main), sunsetcorp (the YouTube channel that hosted the eccojam videos), Chuck Person (the Eccojams Vol. 1 cassette alias), plus listed aliases Dania Shapes, KGB Man, and 0PN; early work appeared under group names including Infinity Window, Astronaut, and Games (later Ford & Lopatin).",
      sourceIds: [S.wikipedia, S.wikidata, S.wikiEccojams],
    },
    {
      id: "claim-hampshire-pratt",
      kind: "fact",
      text: "After playing synthesizer in high-school groups with future collaborator Joel Ford, he attended Hampshire College, then moved to Brooklyn for graduate study in archival science at Pratt Institute — training he has said shaped his music's archival preoccupations — and joined Brooklyn's underground noise scene.",
      sourceIds: [S.wikipedia, S.villageVoice],
    },
    {
      id: "claim-juno-inheritance",
      kind: "fact",
      text: "His first electronic experiments drew on his father's record collection and a Roland Juno-60 he inherited; Betrayed in the Octagon was recorded in Massachusetts between 2004 and 2007 with the Juno-60, a Sequential Circuits Six-Trak, and a Roland MSQ-700 sequencer.",
      sourceIds: [S.wikipedia, S.wikiOctagon, S.villageVoice],
    },
    {
      id: "claim-octagon",
      kind: "fact",
      text: "His first OPN release, Betrayed in the Octagon, came out November 20, 2007 on the Deception Island label as a hand-numbered cassette credited to 'Magic Oneohtrix Point Never'; No Fun Productions reissued it on vinyl in 2009 under the shortened name.",
      sourceIds: [S.wikiOctagon],
    },
    {
      id: "claim-rifts",
      kind: "fact",
      text: "The 2009 No Fun Productions compilation Rifts collected his cassette and CD-R material, brought him critical acclaim, and was named the second-best album of 2009 by The Wire.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-sunsetcorp-uploads",
      kind: "fact",
      text: "Beginning July 19, 2009, he uploaded videos he called 'eccojams' to his YouTube channel sunsetcorp — slowed, looped fragments of 1980s and '90s pop paired with found footage; 'nobody here' loops Chris de Burgh's 'The Lady in Red' over a vintage computer animation called 'Rainbow Road' and was edited in Windows Movie Maker.",
      sourceIds: [S.wikiEccojams, S.nobodyHere, S.boilerRoom],
    },
    {
      id: "claim-eccojams-office-job",
      kind: "fact",
      text: "Many eccojams were initially made at his office job between 2004 and 2008 in the free audio editor GoldWave; some first appeared in the 2009 OPN audiovisual DVD project Memory Vague.",
      sourceIds: [S.wikiEccojams],
    },
    {
      id: "claim-eccojams-vol1",
      kind: "fact",
      text: "Chuck Person's Eccojams Vol. 1 was released August 8, 2010 on The Curatorial Club in a run of 100 cassettes; Lopatin posted an official remaster for digital download in November 2016, and original tapes have sold on Discogs at three-digit prices.",
      sourceIds: [S.wikiEccojams, S.curatorialClub],
    },
    {
      id: "claim-vaporwave-progenitor",
      kind: "fact",
      text: "Eccojams Vol. 1 and the sunsetcorp uploads are widely treated as progenitors of vaporwave; Pitchfork's retrospective called the tape 'the most influential cassette tape of the 21st century' and 'nobody here' the genre's big bang.",
      sourceIds: [S.wikiEccojams, S.pfEccojams, S.talkhouse, S.boilerRoom],
    },
    {
      id: "claim-returnal",
      kind: "fact",
      text: "Returnal, released June 22, 2010 on Editions Mego, folded noise and his own processed vocals into the synthesizer style of the early trilogy; Lopatin described it as a 'Rousseau record' painting 'us watching that world' rather than the world itself.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-software-founded",
      kind: "fact",
      text: "In February 2011, Games became Ford & Lopatin — reportedly to avoid a clash with the Interscope rapper Game — and the pair launched Software Recording Co. as a Mexican Summer imprint; its first release was their own Channel Pressure on June 7, 2011.",
      sourceIds: [S.pfSoftware, S.villageVoice, S.mexicanSummer, S.wikipedia],
    },
    {
      id: "claim-replica",
      kind: "fact",
      text: "Replica, released November 8, 2011 via Mexican Summer/Software, was his first album recorded in a studio, with co-production by Joel Ford and Al Carlson, built from sampled audio of 1980s and '90s television advertisements.",
      sourceIds: [S.wikiReplica, S.wikipedia],
    },
    {
      id: "claim-collaborations-2011-2012",
      kind: "fact",
      text: "In 2011–2012 he released the Nate Boyce audio-visual installation Reliquary House (later issued as a split LP with Rene Hell), joined RVNG's FRKWYS Vol. 7 with David Borden, James Ferraro, and Laurel Halo, and made Instrumental Tourist with Tim Hecker.",
      sourceIds: [S.wikipedia, S.pfRplus7],
    },
    {
      id: "claim-rplus7",
      kind: "fact",
      text: "He signed to Warp Records in 2013 and released R Plus Seven — the label debut described in its own announcement as the closest he had come to traditional song structure — on September 30, 2013 (some listings give October 1).",
      sourceIds: [S.pfRplus7, S.wikipedia, S.warpArtist],
    },
    {
      id: "claim-first-scores",
      kind: "fact",
      text: "His film-scoring began with Sofia Coppola's The Bling Ring (2013), a collaboration with music supervisor Brian Reitzell, followed by Ariel Kleiman's Partisan (2015).",
      sourceIds: [S.wikipedia, S.wikiGoodTime],
    },
    {
      id: "claim-nin-tour",
      kind: "fact",
      text: "In 2014 he toured amphitheaters opening for Nine Inch Nails and Soundgarden — replacing Death Grips — and premiered a live score for Koji Morimoto's anime Magnetic Rose at Jodrell Bank with ANOHNI guesting; the tour experience fed directly into Garden of Delete's alt-metal palette.",
      sourceIds: [S.wikipedia, S.vergeGOL, S.factGOL],
    },
    {
      id: "claim-gol-fiction",
      kind: "fact",
      text: "Garden of Delete (November 2015, Warp) rolled out through an elaborate fiction: a PDF interview with 'Ezra,' a teenage alien obsessed with the invented 'hypergrunge' band Kaoss Edge, complete with fake label SoundClouds and seeded MIDI files fans could rework.",
      sourceIds: [S.factGOL, S.guardianGOL, S.pfGOLpodcast],
    },
    {
      id: "claim-pop-songwriters",
      kind: "stated_belief",
      text: "He intended Garden of Delete as a commentary on mainstream pop built from scraps bought from industry songwriters; when top-line writers would not engage — 'none of the top-line writers wanted to talk to me' — he simply pretended to be them.",
      sourceIds: [S.guardianGOL],
    },
    {
      id: "claim-replica-method",
      kind: "stated_belief",
      text: "On Replica's ad-sampling method he described 'looking for old things that are meaningful,' then 'restructuring and rearranging it to interfere with the original narrative and creating this new poetry.'",
      sourceIds: [S.wikiReplica],
    },
    {
      id: "claim-compressionism",
      kind: "stated_belief",
      text: "In 2018 he began calling his method 'Compressionism' — 'a historically motivated need to organize and make sense of an illogical flow of external media inputs,' turning overload into 'a kind of coherency of drawing connections between things.'",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-genre-refusal",
      kind: "stated_belief",
      text: "He has repeatedly disavowed committing to a single style or genre and describes songs as opportunities to 'freak somebody out' — a framing the New York Times turned into a profile title.",
      sourceIds: [S.wikipedia, S.nyt2018, S.pfMOPN],
    },
    {
      id: "claim-hopelessness",
      kind: "fact",
      text: "He co-produced ANOHNI's Mercury Prize–nominated album Hopelessness (2016) and contributed to her Paradise EP (2017) and DJ Earl's Open Your Eyes (2016).",
      sourceIds: [S.wikipedia, S.guardianRadar],
    },
    {
      id: "claim-good-time-cannes",
      kind: "fact",
      text: "His score for the Safdie brothers' Good Time — including the Iggy Pop collaboration 'The Pure and the Damned' — won the Soundtrack Award at the 2017 Cannes Film Festival; the soundtrack album followed on Warp that August.",
      sourceIds: [S.pfCannes, S.wikiGoodTime, S.wikipedia],
    },
    {
      id: "claim-safdie-courtship",
      kind: "fact",
      text: "The Safdies courted him with a mood board of unrelated images — 'a picture of SpongeBob and then weird heist imagery' — and Josh Safdie said he had always imagined Lopatin's early records as 'soundtracks to movies that never existed.'",
      sourceIds: [S.wikiGoodTime],
    },
    {
      id: "claim-myriad",
      kind: "fact",
      text: "MYRIAD, his self-described 'concertscape' and 'four-part epochal song cycle' imagined from an alien intelligence's perspective, premiered May 22–24, 2018 at Park Avenue Armory's drill hall with a band including Kelly Moran, Eli Keszler, and Aaron David Ross.",
      sourceIds: [S.armory, S.raMYRIAD, S.nyt2018],
    },
    {
      id: "claim-age-of",
      kind: "fact",
      text: "Age Of, released June 1, 2018 on Warp, wove early music, folk balladry, and computer music with collaborators including ANOHNI and harpsichordist Kelly Moran; it was his most song-oriented record to that point.",
      sourceIds: [S.armory, S.wikipedia, S.raMYRIAD],
    },
    {
      id: "claim-american-utopia",
      kind: "fact",
      text: "In 2018 he collaborated with David Byrne on the album American Utopia, part of a producing portfolio that also includes work with FKA twigs (a 2017 Nike advertisement track).",
      sourceIds: [S.wikipedia, S.guardianRadar],
    },
    {
      id: "claim-uncut-gems",
      kind: "fact",
      text: "His Uncut Gems score (December 2019) wrapped Moog synthesizers, Mellotron-style flutes, saxophone, and an eight-person choir around a New Age/Vangelis-inspired palette placed deliberately against the film's frantic realism.",
      sourceIds: [S.nprGems, S.varietyGems, S.wikipedia],
    },
    {
      id: "claim-gems-method",
      kind: "stated_belief",
      text: "He described the Safdie collaboration's logic as the film staying realistic while the score stays 'fantastical'; for Uncut Gems he likened clustering sounds to unpacked proteins needing hours to loosen — 'if you want something to feel tight and anxious, then cluster things together.'",
      sourceIds: [S.nprGems],
    },
    {
      id: "claim-weeknd-origin",
      kind: "fact",
      text: "The Weeknd first reached out after hearing the Good Time score — 'I'd heard your music before, but now I understand' — and after both contributed to Uncut Gems, Lopatin joined the After Hours sessions with Illangelo, co-writing three tracks and producing two, plus an OPN remix of 'Save Your Tears.'",
      sourceIds: [S.gq2020, S.rsNoNightmares, S.wikipedia],
    },
    {
      id: "claim-snl",
      kind: "fact",
      text: "He performed alongside the Weeknd on Saturday Night Live in March 2020.",
      sourceIds: [S.gq2020, S.rsNoNightmares],
    },
    {
      id: "claim-magic-opn",
      kind: "fact",
      text: "Magic Oneohtrix Point Never, released October 30, 2020 on Warp, was co-executive-produced by Abel Tesfaye (under his real name) and featured the Weeknd on 'No Nightmares' plus guests Arca and Caroline Polachek; the album is structured around radio formats and named for the Magic 106.7-inspired origin of his alias.",
      sourceIds: [S.consequenceMOPN, S.pfMOPN, S.rsNoNightmares, S.flashArt],
    },
    {
      id: "claim-burn-it-down",
      kind: "stated_belief",
      text: "He credits Tesfaye's feedback with sharpening the record — 'Burn it down! This is an OPN record!' — saying he needed 'someone to give me perspective on what I was doing as a music fan because he's got unbelievable taste.'",
      sourceIds: [S.pfMOPN, S.consequenceMOPN],
    },
    {
      id: "claim-super-bowl",
      kind: "fact",
      text: "He was musical director for the Weeknd's band at the Super Bowl LV halftime show in February 2021.",
      sourceIds: [S.mbw, S.wikipedia],
    },
    {
      id: "claim-dawn-fm",
      kind: "fact",
      text: "On the Weeknd's Dawn FM (January 7, 2022) he was executive producer alongside the Weeknd and Max Martin, wrote and produced across 13 songs, and performed in the Dawn FM Experience concert film.",
      sourceIds: [S.pfDawnFM, S.mbw, S.wikipedia],
    },
    {
      id: "claim-again",
      kind: "fact",
      text: "Again, released September 29, 2023 on Warp, is framed by Lopatin as 'a speculative autobiography' — a collaboration between his current and younger selves asking 'which decisions foreclosed some realities?' — and the Guardian review noted its use of artificial intelligence alongside post-rock and prog.",
      sourceIds: [S.pfAgain, S.bandcampAgain],
    },
    {
      id: "claim-curse",
      kind: "fact",
      text: "For Benny Safdie and Nathan Fielder's series The Curse, Lopatin executive-produced John Medeski's score — recruited, per his statement, to find a composer 'in the spirit of Alice Coltrane's Turiya Sings'; the soundtrack album came out November 17, 2023 on Milan Records.",
      sourceIds: [S.pfCurse],
    },
    {
      id: "claim-music-language",
      kind: "stated_belief",
      text: "On The Curse's spiritual-jazz brief he said: 'music is a language that expresses something between idea and emotion that only music can express. The music is almost like another dimension or another perspective.'",
      sourceIds: [S.pfCurse],
    },
    {
      id: "claim-sunsetcorp-revival",
      kind: "fact",
      text: "On October 24, 2023 — after roughly thirteen years of silence — the sunsetcorp channel posted a new upload titled 'MOM YOtube AUDIO 1,' reviving the Eccojams-era channel during the Again album cycle.",
      sourceIds: [S.krui, S.sunsetcorp],
    },
    {
      id: "claim-hurry-up-tomorrow",
      kind: "fact",
      text: "In 2025 he co-produced tracks on the Weeknd's Hurry Up Tomorrow and co-scored the accompanying film of the same name, extending a collaboration Apple Music summarizes as writing and production across After Hours, Dawn FM, and Hurry Up Tomorrow.",
      sourceIds: [S.wikipedia, S.appleTranquilizer],
    },
    {
      id: "claim-tranquilizer",
      kind: "fact",
      text: "Tranquilizer, his eleventh Warp-era studio album, was released digitally November 17, 2025 with physical editions November 21; it was sparked by his discovery that a vast archive of 1990s sample CDs had vanished from the Internet Archive.",
      sourceIds: [S.warpTranquilizer, S.pfTranquilizer],
    },
    {
      id: "claim-marty-supreme",
      kind: "fact",
      text: "He composed the score for Josh Safdie's Marty Supreme — the director's first feature after splitting with brother Benny — working daily with Safdie for ten weeks; the soundtrack came out on A24 Music December 25, 2025, day-and-date with the film, earned him an Oscar shortlist, and became the first film score to receive Pitchfork's Best New Music tag.",
      sourceIds: [S.rsMarty, S.vultureMarty, S.pfMartyNews, S.pfMartyReview, S.wikipedia],
    },
    {
      id: "claim-feral",
      kind: "stated_belief",
      text: "On Josh Safdie he says: 'He likes the part of me that's more feral and more like 'Let's get the combustion going'' — describing himself as 'a little bit more introverted and shy' next to a director whose 'energy is just at 11.'",
      sourceIds: [S.rsMarty],
    },
    {
      id: "claim-on-my-radar",
      kind: "stated_belief",
      text: "In his Guardian 'On my radar' picks he praised a Guatemalan cellist, the 'smear frames' of old-school animation, and a favorite brand of vegan caviar — self-curated evidence of his lowbrow-meets-cosmic taste field.",
      sourceIds: [S.guardianRadar],
    },
    {
      id: "claim-era-cycle",
      kind: "pattern",
      text: "Across the catalog, each album is organized around a distinct obsolescent media stratum: TV-ad audio on Replica, MIDI and corporate timbres on R Plus Seven, alt-metal adolescence on Garden of Delete, early-music-plus-computation on Age Of, FM-radio formats on Magic OPN, and vanished sample-CD libraries on Tranquilizer.",
      sourceIds: [
        S.wikiReplica,
        S.pfRplus7,
        S.vergeGOL,
        S.armory,
        S.pfMOPN,
        S.warpTranquilizer,
      ],
    },
    {
      id: "claim-underground-mainstream",
      kind: "pattern",
      text: "He repeatedly oscillates between underground experiment and mass-market surface: noise-scene cassettes to amphitheater tours with Nine Inch Nails, DIY eccojams to a Super Bowl halftime show, Warp records to Max Martin co-productions.",
      sourceIds: [S.reynoldsVV, S.vergeGOL, S.mbw, S.pfDawnFM],
    },
    {
      id: "claim-rollout-fiction",
      kind: "pattern",
      text: "Album rollouts double as fiction: the Ezra/Kaoss Edge ARG for Garden of Delete, the alien-intelligence 'concertscape' of MYRIAD, and the resurrection of the sunsetcorp channel during Again — marketing treated as world-building.",
      sourceIds: [S.factGOL, S.pfGOLpodcast, S.armory, S.krui],
    },
    {
      id: "claim-score-method-pattern",
      kind: "pattern",
      text: "His scores share a signature move: serene, spiritual, or cosmic music — New Age synths on Uncut Gems, '80s-coded futurism on Marty Supreme, Alice Coltrane–derived ambience on The Curse — set against frantic, realistic filmmaking so the calm itself generates tension.",
      sourceIds: [S.nprGems, S.pfMartyReview, S.pfCurse, S.vultureMarty],
    },
    {
      id: "claim-ecco-motif",
      kind: "pattern",
      text: "The 'ecco' motif recurs across decades as self-mythology: Eccojams and the Ecco the Dolphin sleeve, the 2016 Hammer Museum film series titled 'Ecco: The Videos of Oneohtrix Point Never,' Magic OPN's 'Bow Ecco,' and his Instagram handle @eccopn.",
      sourceIds: [S.wikiEccojams, S.wikipedia, S.wikidata, S.consequenceMOPN],
    },
    {
      id: "claim-collaboration-engine",
      kind: "pattern",
      text: "Nearly every phase is co-built with a small circle of repeat collaborators — Joel Ford, Nate Boyce, ANOHNI, Tim Hecker, the Safdie brothers, and Abel Tesfaye — suggesting the solo project functions more like a production studio than a lone auteur.",
      sourceIds: [S.villageVoice, S.armory, S.nprGems, S.gq2020, S.rsMarty],
    },
    {
      id: "claim-vaporwave-hedge",
      kind: "speculation",
      text: "The 'inventor of vaporwave' framing flattens a genre that crystallized collectively online; the record supports progenitor status for Eccojams Vol. 1 and the sunsetcorp uploads, not single authorship of the movement.",
      sourceIds: [S.wikiEccojams, S.talkhouse, S.pfEccojams],
    },
    {
      id: "claim-revival-motive",
      kind: "speculation",
      text: "The 2023 sunsetcorp reactivation reads more like Again-era world-building than the start of an Eccojams Vol. 2; no sequel has been announced in the cited record.",
      sourceIds: [S.krui],
    },
    {
      id: "claim-album-count",
      kind: "speculation",
      text: "Counts of his discography diverge — ninth, fourteenth, or nineteenth album depending on whether cassettes, collaborations, and soundtracks are included — so numbering claims should cite the counter.",
      sourceIds: [S.flashArt, S.wikipedia],
    },
    {
      id: "claim-safdie-ongoing",
      kind: "speculation",
      text: "The Safdie collaboration shows no announced endpoint: after Marty Supreme's awards run, continued scoring work with Josh Safdie is plausible but unconfirmed in the cited record.",
      sourceIds: [S.rsMarty, S.vultureMarty],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1982-07-25",
      title: "Born in Massachusetts",
      summary:
        "Born to Russian-Jewish emigrants with musical backgrounds; Wikipedia's infobox lists Boston.",
      location: "Massachusetts",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-pratt",
      kind: "education",
      date: "2004",
      title: "Hampshire College, then Pratt Institute graduate study",
      summary:
        "After Hampshire College he moved to Brooklyn for graduate study in archival science at Pratt Institute (mid-2000s; year approximate in the record) and entered the borough's noise scene.",
      organization: "Pratt Institute",
      sourceIds: [S.wikipedia, S.villageVoice],
    },
    {
      id: "event-octagon",
      kind: "publication",
      date: "2007-11-20",
      title: "Betrayed in the Octagon",
      summary:
        "First OPN release: hand-numbered cassette on Deception Island, credited to 'Magic Oneohtrix Point Never.'",
      sourceIds: [S.wikiOctagon],
    },
    {
      id: "event-rifts",
      kind: "publication",
      date: "2009",
      title: "Rifts and Memory Vague",
      summary:
        "The No Fun compilation Rifts (The Wire's #2 album of 2009) and the Root Strata DVD-R Memory Vague establish the early catalog.",
      sourceIds: [S.wikipedia, S.wikiEccojams],
    },
    {
      id: "event-sunsetcorp",
      kind: "milestone",
      date: "2009-07-19",
      title: "First eccojam uploads to sunsetcorp",
      summary:
        "'angel' and 'nobody here' appear on his YouTube channel — slowed loops of '80s pop that become vaporwave's founding documents.",
      sourceIds: [S.wikiEccojams, S.nobodyHere, S.krui],
    },
    {
      id: "event-returnal",
      kind: "publication",
      date: "2010-06-22",
      title: "Returnal",
      summary: "Editions Mego album mixing synth pastoral with noise and processed vocals.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-eccojams-vol1",
      kind: "publication",
      date: "2010-08-08",
      title: "Chuck Person's Eccojams Vol. 1",
      summary:
        "100-cassette run on The Curatorial Club; later called the most influential cassette of the century.",
      sourceIds: [S.wikiEccojams, S.curatorialClub],
    },
    {
      id: "event-software-founded",
      kind: "founded",
      date: "2011-02",
      title: "Ford & Lopatin form Software Recording Co.",
      summary:
        "Games rename themselves and open a Mexican Summer imprint; Channel Pressure becomes its first release that June.",
      organization: "Software Recording Co. / Mexican Summer",
      sourceIds: [S.pfSoftware, S.villageVoice, S.mexicanSummer],
    },
    {
      id: "event-replica",
      kind: "publication",
      date: "2011-11-08",
      title: "Replica",
      summary:
        "First studio-recorded OPN album, built from 1980s–90s TV-ad samples, with Joel Ford and Al Carlson co-producing.",
      sourceIds: [S.wikiReplica],
    },
    {
      id: "event-bling-ring",
      kind: "project",
      date: "2013",
      title: "First film score: The Bling Ring",
      summary: "Scoring work for Sofia Coppola's film with music supervisor Brian Reitzell.",
      sourceIds: [S.wikipedia, S.wikiGoodTime],
    },
    {
      id: "event-rplus7",
      kind: "publication",
      date: "2013-09-30",
      title: "R Plus Seven — Warp debut",
      summary:
        "Signs to Warp; the album's MIDI-plastic palette becomes his signature. Some listings give October 1.",
      organization: "Warp Records",
      sourceIds: [S.pfRplus7, S.wikipedia],
    },
    {
      id: "event-nin-soundgarden",
      kind: "milestone",
      date: "2014",
      title: "Opens for Nine Inch Nails and Soundgarden; Magnetic Rose premiere",
      summary:
        "Amphitheater tour replacing Death Grips; live anime score premieres at Jodrell Bank with ANOHNI.",
      sourceIds: [S.wikipedia, S.vergeGOL],
    },
    {
      id: "event-gol",
      kind: "publication",
      date: "2015-11",
      title: "Garden of Delete",
      summary:
        "Second Warp LP, rolled out through the Ezra/Kaoss Edge fiction; alt-metal and pop-commentary turn.",
      sourceIds: [S.guardianGOL, S.factGOL, S.vergeGOL],
    },
    {
      id: "event-hopelessness",
      kind: "project",
      date: "2016",
      title: "Co-produces ANOHNI's Hopelessness",
      summary: "Mercury Prize–nominated album; also contributed to DJ Earl's Open Your Eyes.",
      sourceIds: [S.wikipedia, S.guardianRadar],
    },
    {
      id: "event-cannes",
      kind: "award",
      date: "2017-05-27",
      title: "Wins Cannes Soundtrack Award for Good Time",
      summary:
        "Score for the Safdie brothers' film honored at Cannes; features Iggy Pop collaboration 'The Pure and the Damned.'",
      location: "Cannes, France",
      sourceIds: [S.pfCannes, S.wikiGoodTime],
    },
    {
      id: "event-myriad",
      kind: "exhibition",
      date: "2018-05-22",
      end: "2018-05-24",
      title: "MYRIAD premieres at Park Avenue Armory",
      summary:
        "The 'concertscape' song cycle staged in the Wade Thompson Drill Hall as part of Red Bull Music Festival New York.",
      location: "New York",
      organization: "Park Avenue Armory",
      sourceIds: [S.armory, S.raMYRIAD],
    },
    {
      id: "event-age-of",
      kind: "publication",
      date: "2018-06-01",
      title: "Age Of",
      summary: "Eighth studio album on Warp; baroque and early-music textures meet pop structures.",
      sourceIds: [S.armory, S.wikipedia],
    },
    {
      id: "event-uncut-gems",
      kind: "project",
      date: "2019-12",
      title: "Uncut Gems score",
      summary:
        "Second Safdie score: New Age synths, choir, and saxophone against the film's anxiety engine.",
      sourceIds: [S.nprGems, S.varietyGems],
    },
    {
      id: "event-after-hours-snl",
      kind: "media",
      date: "2020-03",
      title: "After Hours sessions; SNL performance",
      summary:
        "Co-writes and produces on the Weeknd's After Hours; joins him on Saturday Night Live.",
      sourceIds: [S.gq2020, S.rsNoNightmares],
    },
    {
      id: "event-magic-opn",
      kind: "publication",
      date: "2020-10-30",
      title: "Magic Oneohtrix Point Never",
      summary:
        "Self-titled statement co-executive-produced by Abel Tesfaye; radio-format concept with the Weeknd, Arca, and Caroline Polachek.",
      sourceIds: [S.consequenceMOPN, S.pfMOPN],
    },
    {
      id: "event-super-bowl",
      kind: "role",
      date: "2021-02-07",
      title: "Musical director, Super Bowl LV halftime show",
      summary: "Led the Weeknd's band for the halftime performance.",
      sourceIds: [S.mbw],
    },
    {
      id: "event-dawn-fm",
      kind: "project",
      date: "2022-01-07",
      title: "Dawn FM released",
      summary:
        "Executive producer with the Weeknd and Max Martin; wrote and produced across 13 songs.",
      sourceIds: [S.pfDawnFM, S.wikipedia],
    },
    {
      id: "event-again",
      kind: "publication",
      date: "2023-09-29",
      title: "Again",
      summary: "Tenth studio album on Warp — a 'speculative autobiography.'",
      sourceIds: [S.pfAgain, S.bandcampAgain],
    },
    {
      id: "event-sunsetcorp-revival",
      kind: "media",
      date: "2023-10-24",
      title: "sunsetcorp channel reactivates",
      summary: "'MOM YOtube AUDIO 1' appears after ~13 years of dormancy.",
      sourceIds: [S.krui],
    },
    {
      id: "event-curse",
      kind: "publication",
      date: "2023-11-17",
      title: "The Curse soundtrack",
      summary:
        "Executive-produces John Medeski's score for the Benny Safdie/Nathan Fielder series (Milan Records).",
      sourceIds: [S.pfCurse],
    },
    {
      id: "event-hurry-up-tomorrow",
      kind: "project",
      date: "2025",
      title: "Hurry Up Tomorrow album and film",
      summary:
        "Co-produces on the Weeknd's 2025 album and co-scores the accompanying film.",
      sourceIds: [S.wikipedia, S.appleTranquilizer],
    },
    {
      id: "event-tranquilizer",
      kind: "publication",
      date: "2025-11-21",
      title: "Tranquilizer",
      summary:
        "Warp album sparked by a vanished archive of '90s sample CDs; digital release November 17, physical November 21.",
      sourceIds: [S.warpTranquilizer, S.pfTranquilizer],
    },
    {
      id: "event-marty-supreme",
      kind: "project",
      date: "2025-12-25",
      title: "Marty Supreme score and soundtrack",
      summary:
        "Third Safdie collaboration — Josh solo — released day-and-date on A24 Music; Oscar-shortlisted.",
      sourceIds: [S.rsMarty, S.pfMartyNews, S.vultureMarty],
    },
  ],
  themes: [
    {
      id: "theme-memory-material",
      kind: "philosophy",
      status: "stated",
      title: "Memory as material",
      summary:
        "His core gesture is excavation: 'looking for old things that are meaningful,' then restructuring them to interfere with the original narrative until they make 'new poetry.' Ads, soft-rock singles, sample libraries, and FM formats are treated as memory objects rather than kitsch.",
      sourceIds: [S.wikiReplica, S.wikiEccojams, S.nprGems],
    },
    {
      id: "theme-compressionism",
      kind: "method",
      status: "stated",
      title: "Compressionism",
      summary:
        "His self-coined 2018 term for organizing 'an illogical flow of external media inputs' into 'a kind of coherency of drawing connections between things' — the archival-science background turned into composition practice.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "theme-obsolescence",
      kind: "philosophy",
      status: "inferred",
      title: "Obsolescence and decay as instrument",
      summary:
        "The work keeps returning to dead or dying media — VHS ad audio, GM MIDI timbres, FM station formats, '90s sample CDs lost from the Internet Archive. Obsolescence is not a topic so much as the instrument itself: Tranquilizer exists because an archive disappeared.",
      sourceIds: [S.wikiReplica, S.pfRplus7, S.pfMOPN, S.warpTranquilizer],
    },
    {
      id: "theme-vaporwave-lineage",
      kind: "influence",
      status: "reported",
      title: "Eccojams and the vaporwave lineage",
      summary:
        "The press treats the 2009 sunsetcorp uploads and Eccojams Vol. 1 as vaporwave's big bang — 'the most influential cassette tape of the 21st century.' Lopatin's own framing was narrower: mournful or existential moments extracted from corporate pop.",
      sourceIds: [S.pfEccojams, S.talkhouse, S.boilerRoom, S.wikiEccojams],
    },
    {
      id: "theme-pop-antipop",
      kind: "belief",
      status: "stated",
      title: "Pop and anti-pop at once",
      summary:
        "He wants pop's emotional payload without its industrial machinery — pretending to be the songwriters who would not take his call on Garden of Delete, then, within five years, co-producing a global No. 1 album and a Super Bowl halftime show. The tension is the practice.",
      sourceIds: [S.guardianGOL, S.gq2020, S.mbw, S.pfDawnFM],
    },
    {
      id: "theme-worldbuilding",
      kind: "method",
      status: "stated",
      title: "World-building over marketing",
      summary:
        "Rollouts are constructed fictions: Ezra and Kaoss Edge for Garden of Delete, the alien-intelligence epochs of MYRIAD, the revived sunsetcorp channel for Again. Lore, aliases, and dead channels are part of the instrument.",
      sourceIds: [S.factGOL, S.pfGOLpodcast, S.armory, S.krui],
    },
    {
      id: "theme-cosmic-score",
      kind: "method",
      status: "stated",
      title: "Cosmic score against frantic image",
      summary:
        "With the Safdies, the rule is contrast: the picture stays realistic while the music stays 'fantastical' — Vangelis-descended New Age on Uncut Gems, '80s futurism on Marty Supreme, Alice Coltrane–briefed ambience on The Curse — so serenity itself becomes suspense.",
      sourceIds: [S.nprGems, S.wikiGoodTime, S.pfMartyReview, S.pfCurse],
    },
    {
      id: "theme-genre-refusal",
      kind: "belief",
      status: "stated",
      title: "Refusal of genre",
      summary:
        "He declines to commit to any single style; each record is 'an opportunity to freak somebody out,' and each alias keeps a separate job — OPN for the albums, sunsetcorp for the jams, Chuck Person for the tape.",
      sourceIds: [S.wikipedia, S.nyt2018, S.wikidata],
    },
    {
      id: "theme-radio",
      kind: "interest",
      status: "stated",
      title: "Radio as a haunted format",
      summary:
        "The alias itself is a station name (Magic 106.7). Magic OPN organizes itself around drive-time and midday radio suites; Dawn FM's '103.5' tag extends the same idea into the Weeknd's record. Radio is where his memory-work and pop ambition meet.",
      sourceIds: [S.wikipedia, S.pfMOPN, S.pfDawnFM],
    },
  ],
  works: [
    {
      id: "work-octagon",
      kind: "recording",
      status: "released",
      title: "Betrayed in the Octagon",
      date: "2007-11-20",
      summary:
        "Debut cassette on Deception Island, originally credited to Magic Oneohtrix Point Never; No Fun vinyl reissue 2009.",
      sourceIds: [S.wikiOctagon],
    },
    {
      id: "work-zones",
      kind: "recording",
      status: "released",
      title: "Zones Without People",
      date: "2009",
      summary: "Second album of the early synth trilogy (Arbor).",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-russian-mind",
      kind: "recording",
      status: "released",
      title: "Russian Mind",
      date: "2009",
      summary: "Third album of the early synth trilogy (No Fun).",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-rifts",
      kind: "recording",
      status: "released",
      title: "Rifts",
      date: "2009",
      summary:
        "No Fun compilation of the cassette/CD-R era; The Wire's #2 album of 2009.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-memory-vague",
      kind: "recording",
      status: "released",
      title: "Memory Vague",
      date: "2009",
      summary:
        "Audiovisual DVD-R on Root Strata — found-footage edits containing the first released eccojams.",
      sourceIds: [S.wikiEccojams, S.pfEccojams],
    },
    {
      id: "work-returnal",
      kind: "recording",
      status: "released",
      title: "Returnal",
      date: "2010-06-22",
      summary: "Editions Mego album; synth pastoral invaded by noise and processed voice.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-eccojams",
      kind: "recording",
      status: "released",
      title: "Chuck Person's Eccojams Vol. 1",
      date: "2010-08-08",
      summary:
        "100-cassette run on The Curatorial Club under the Chuck Person alias; vaporwave's foundational text.",
      sourceIds: [S.wikiEccojams, S.curatorialClub],
    },
    {
      id: "work-channel-pressure",
      kind: "recording",
      status: "released",
      title: "Channel Pressure (Ford & Lopatin)",
      date: "2011-06-07",
      summary:
        "Duo album with Joel Ford; Software Recording Co.'s inaugural release.",
      sourceIds: [S.mexicanSummer, S.villageVoice],
    },
    {
      id: "work-replica",
      kind: "recording",
      status: "released",
      title: "Replica",
      date: "2011-11-08",
      summary:
        "Mexican Summer/Software; first studio-recorded album, built from TV-ad samples with Joel Ford and Al Carlson.",
      sourceIds: [S.wikiReplica],
    },
    {
      id: "work-instrumental-tourist",
      kind: "recording",
      status: "released",
      title: "Instrumental Tourist (with Tim Hecker)",
      date: "2012",
      summary: "Collaborative album on Software.",
      sourceIds: [S.wikipedia, S.pfRplus7],
    },
    {
      id: "work-software",
      kind: "project",
      status: "completed",
      title: "Software Recording Co.",
      date: "2011",
      summary:
        "Label co-founded with Joel Ford under Mexican Summer; active through 2016 (final release: Thug Entrancer's Arcology).",
      sourceIds: [S.pfSoftware, S.mexicanSummer, S.villageVoice],
    },
    {
      id: "work-rplus7",
      kind: "recording",
      status: "released",
      title: "R Plus Seven",
      date: "2013-09-30",
      summary: "Warp debut; MIDI-rendered, puzzle-piece composition.",
      sourceIds: [S.pfRplus7, S.warpArtist],
    },
    {
      id: "work-gol",
      kind: "recording",
      status: "released",
      title: "Garden of Delete",
      date: "2015-11",
      summary: "Alt-metal-tinged pop commentary wrapped in the Ezra/Kaoss Edge fiction.",
      sourceIds: [S.guardianGOL, S.factGOL],
    },
    {
      id: "work-good-time",
      kind: "recording",
      status: "released",
      title: "Good Time (Original Motion Picture Soundtrack)",
      date: "2017-08",
      summary:
        "First Safdie score; Cannes Soundtrack Award; includes Iggy Pop's 'The Pure and the Damned.'",
      sourceIds: [S.wikiGoodTime, S.pfCannes],
    },
    {
      id: "work-myriad",
      kind: "project",
      status: "completed",
      title: "MYRIAD",
      date: "2018-05-22",
      location: "Park Avenue Armory, New York",
      summary:
        "The 'concertscape' staging of Age Of — four epochal song suites in the drill hall.",
      sourceIds: [S.armory, S.raMYRIAD],
    },
    {
      id: "work-age-of",
      kind: "recording",
      status: "released",
      title: "Age Of",
      date: "2018-06-01",
      summary: "Baroque computer-music songbook with ANOHNI, Kelly Moran, and others.",
      sourceIds: [S.armory, S.wikipedia],
    },
    {
      id: "work-uncut-gems",
      kind: "recording",
      status: "released",
      title: "Uncut Gems (Original Motion Picture Soundtrack)",
      date: "2019-12",
      summary: "Second Safdie score; Moog, choir, and saxophone New Age against chaos.",
      sourceIds: [S.nprGems, S.varietyGems],
    },
    {
      id: "work-magic-opn",
      kind: "recording",
      status: "released",
      title: "Magic Oneohtrix Point Never",
      date: "2020-10-30",
      summary:
        "Eponymous radio-formatted album co-executive-produced by Abel Tesfaye.",
      sourceIds: [S.consequenceMOPN, S.pfMOPN],
    },
    {
      id: "work-dawn-fm",
      kind: "recording",
      status: "released",
      title: "Dawn FM (the Weeknd)",
      date: "2022-01-07",
      summary:
        "Executive producer with the Weeknd and Max Martin; wrote and produced across 13 songs.",
      sourceIds: [S.pfDawnFM, S.wikipedia],
    },
    {
      id: "work-curse",
      kind: "recording",
      status: "released",
      title: "The Curse (Music From the Showtime Original Series)",
      date: "2023-11-17",
      summary:
        "Executive-produced John Medeski's score for the Safdie/Fielder series on Milan Records.",
      sourceIds: [S.pfCurse],
    },
    {
      id: "work-again",
      kind: "recording",
      status: "released",
      title: "Again",
      date: "2023-09-29",
      summary: "Tenth Warp album; 'a speculative autobiography.'",
      sourceIds: [S.pfAgain, S.bandcampAgain],
    },
    {
      id: "work-tranquilizer",
      kind: "recording",
      status: "released",
      title: "Tranquilizer",
      date: "2025-11-21",
      summary:
        "Warp album built from salvaged '90s sample-CD sounds after their Internet Archive disappearance.",
      sourceIds: [S.warpTranquilizer, S.pfTranquilizer],
    },
    {
      id: "work-marty-supreme",
      kind: "recording",
      status: "released",
      title: "Marty Supreme (Original Motion Picture Soundtrack)",
      date: "2025-12-25",
      summary:
        "Josh Safdie's '50s table-tennis epic; A24 Music; Oscar-shortlisted; Pitchfork's first Best New Music score.",
      sourceIds: [S.pfMartyNews, S.pfMartyReview, S.rsMarty],
    },
  ],
  appearances: [
    {
      id: "appearance-vv-fordlopatin",
      title: "Q&A: Ford & Lopatin On Playing Together And Playing With Studio Toys",
      venue: "The Village Voice",
      publishedAt: "2011",
      participants: ["Daniel Lopatin", "Joel Ford"],
      summary:
        "Joint Q&A on the Channel Pressure sessions, their shared high-school synth history, and the founding of Software.",
      media: [
        {
          type: "article",
          url: "https://www.villagevoice.com/qa-ford-lopatin-on-playing-together-and-playing-with-studio-toys/",
          sourceId: S.villageVoice,
        },
      ],
      sourceIds: [S.villageVoice],
    },
    {
      id: "appearance-ra-inside-world",
      title: "Oneohtrix Point Never: Inside world",
      venue: "Resident Advisor",
      publishedAt: "2013-10-02",
      participants: ["Daniel Lopatin"],
      summary: "RA feature interview around the R Plus Seven release.",
      media: [
        {
          type: "article",
          url: "https://ra.co/features/1948",
          sourceId: S.raInsideWorld,
        },
      ],
      sourceIds: [S.raInsideWorld],
    },
    {
      id: "appearance-gol-press",
      title: "Garden of Delete interview round",
      venue: "The Guardian / FACT / The Verge",
      publishedAt: "2015-11",
      participants: ["Daniel Lopatin"],
      summary:
        "The album's press run: the Guardian on pretending to be pop songwriters, FACT on the Ezra/Kaoss Edge fiction, the Verge on the NIN/Soundgarden afterlife.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/music/2015/nov/18/oneohtrix-point-never-garden-of-delete",
          sourceId: S.guardianGOL,
        },
        {
          type: "article",
          url: "https://www.factmag.com/2015/11/12/oneohtrix-point-never-garden-of-delete-interview/",
          sourceId: S.factGOL,
        },
        {
          type: "article",
          url: "https://www.theverge.com/2015/11/12/9723304/oneohtrix-point-never-daniel-lopatin-interview-garden-of-delete",
          sourceId: S.vergeGOL,
        },
      ],
      sourceIds: [S.guardianGOL, S.factGOL, S.vergeGOL],
    },
    {
      id: "appearance-pf-podcast",
      title: "This Is How We Do It: Oneohtrix Point Never",
      venue: "Pitchfork",
      publishedAt: "2015-12-09",
      participants: ["Daniel Lopatin", "Jenn Pelly"],
      summary:
        "Podcast interview on the Ezra mythology and the semi-autobiographical teenage alien at the album's center.",
      media: [
        {
          type: "audio",
          url: "https://pitchfork.com/features/podcast/9767-this-is-how-we-do-it-oneohtrix-point-never/",
          sourceId: S.pfGOLpodcast,
        },
      ],
      sourceIds: [S.pfGOLpodcast],
    },
    {
      id: "appearance-nyt",
      title: "Oneohtrix Point Never's Quest to Make Music That Freaks People Out",
      venue: "The New York Times",
      publishedAt: "2018-05-31",
      participants: ["Daniel Lopatin"],
      summary:
        "Profile inside the MYRIAD rehearsals at EMPAC, ahead of the Park Avenue Armory premiere.",
      media: [
        {
          type: "article",
          url: "https://www.nytimes.com/2018/05/31/arts/music/oneohtrix-point-never-daniel-lopatin-age-of.html",
          sourceId: S.nyt2018,
        },
      ],
      sourceIds: [S.nyt2018],
    },
    {
      id: "appearance-npr-gems",
      title: "Inside 'Uncut Gems': A Cosmic Score In A Frantic Film",
      venue: "NPR All Things Considered",
      publishedAt: "2019-12-28",
      participants: ["Daniel Lopatin", "Josh Safdie", "Benny Safdie", "Tim Greiving"],
      summary:
        "Broadcast segment on the New Age counterweight inside the Safdies' anxiety machine.",
      media: [
        {
          type: "article",
          url: "https://www.npr.org/2019/12/28/791473556/inside-uncut-gems-a-cosmic-score-in-a-frantic-film",
          sourceId: S.nprGems,
        },
      ],
      sourceIds: [S.nprGems],
    },
    {
      id: "appearance-variety-gems",
      title: "Behind the Music of 'Uncut Gems': How the Movie's Score Was Made",
      venue: "Variety",
      publishedAt: "2020-01",
      participants: ["Daniel Lopatin", "Josh Safdie"],
      summary:
        "Featurette on the Moog One sessions and the Vangelis/Tomita/Tangerine Dream lineage behind the score.",
      media: [
        {
          type: "article",
          url: "https://variety.com/2020/music/news/music-of-uncut-gems-movie-score-daniel-lopato-josh-safdie-interview-1203461553/",
          sourceId: S.varietyGems,
        },
      ],
      sourceIds: [S.varietyGems],
    },
    {
      id: "appearance-gq",
      title:
        "Daniel Lopatin On Returning to His Roots as Oneohtrix Point Never and Working with The Weeknd",
      venue: "GQ",
      publishedAt: "2020-10-27",
      participants: ["Daniel Lopatin"],
      summary:
        "Magic OPN-era interview covering the Tesfaye friendship, the After Hours sessions, and SNL.",
      media: [
        {
          type: "article",
          url: "https://www.gq.com/story/oneohtrix-point-never-magic-oneohtrix-point-never-album-the-weeknd-interview",
          sourceId: S.gq2020,
        },
      ],
      sourceIds: [S.gq2020],
    },
    {
      id: "appearance-flash-art",
      title: "Slanted and Re-enchanted: Magic Oneohtrix Point Never",
      venue: "Flash Art",
      publishedAt: "2020-11",
      participants: ["Daniel Lopatin", "Dean Kissick"],
      summary:
        "On why an eponymous record had to encapsulate every strain of the project at once.",
      media: [
        {
          type: "article",
          url: "https://flash---art.com/article/magic-oneohtrix-point-never/",
          sourceId: S.flashArt,
        },
      ],
      sourceIds: [S.flashArt],
    },
    {
      id: "appearance-guardian-radar",
      title: "On my radar: Oneohtrix Point Never's cultural highlights",
      venue: "The Guardian",
      publishedAt: "2023-09-30",
      participants: ["Daniel Lopatin"],
      summary:
        "First-person cultural picks: a Guatemalan cellist, animation 'smear frames,' vegan caviar.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/culture/2023/sep/30/on-my-radar-oneohtrix-point-never-daniel-lopatin-cultural-highlights",
          sourceId: S.guardianRadar,
        },
      ],
      sourceIds: [S.guardianRadar],
    },
    {
      id: "appearance-nobody-here",
      title: "nobody here",
      venue: "YouTube (sunsetcorp)",
      publishedAt: "2009-07-19",
      participants: ["Daniel Lopatin"],
      summary:
        "His own upload: the Lady in Red loop over the 'Rainbow Road' graphic — vaporwave's patient zero.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=-RFunvF0mDw",
          sourceId: S.nobodyHere,
        },
      ],
      sourceIds: [S.nobodyHere, S.boilerRoom],
    },
    {
      id: "appearance-rs-marty",
      title: "Oneohtrix Point Never on the 'Feral' Creativity of His 'Marty Supreme' Score",
      venue: "Rolling Stone",
      publishedAt: "2026-01-05",
      participants: ["Daniel Lopatin", "Brittany Spanos"],
      summary:
        "On ten weeks of daily scoring with Josh Safdie and the '80s-coded pulse of the Marty Supreme soundtrack.",
      media: [
        {
          type: "article",
          url: "https://www.rollingstone.com/music/music-features/oneohtrix-point-never-marty-supreme-score-interview-1235493366/",
          sourceId: S.rsMarty,
        },
      ],
      sourceIds: [S.rsMarty],
    },
  ],
  openQuestions: [
    "Birthplace is reported as Boston in Wikipedia's infobox while the Library of Congress authority file and other references have used Wayland; the article itself only says he was born and raised in Massachusetts.",
    "R Plus Seven's release date is variously September 30 and October 1, 2013 — likely a territory difference between listings.",
    "Album numbering depends on the counter: sources call Magic OPN his ninth, Again his tenth, and others count cassettes, collaborations, and soundtracks to reach the high teens.",
    "The November 2016 official remaster of Eccojams Vol. 1 was later removed from his site; current authorized digital availability is unsettled.",
    "The track-by-track extent of his Hurry Up Tomorrow album co-production and film co-score is not fully enumerated in the cited catalog.",
    "The October 2023 sunsetcorp reactivation's purpose — Again-era world-building vs. a genuine Eccojams revival — remains unresolved; no Eccojams Vol. 2 has been announced.",
    "Software Recording Co. is described as dormant after Thug Entrancer's Arcology (March 2016); whether the imprint is formally closed or could be reactivated is not settled in the record.",
    "His exact credit split on After Hours — 'producing two and writing three' songs per Wikipedia versus the three co-writes listed in news reports — varies slightly by source.",
  ],
  body: `Daniel Lopatin records as Oneohtrix Point Never — a name that is itself a joke about soft-rock radio, a verbal scramble of Boston's Magic 106.7. Across two decades he has turned that joke into one of electronic music's more unlikely careers: a noise-scene cassette artist who became the Safdie brothers' composer, an executive producer on a Weeknd No. 1, and — by accident more than design — a progenitor of vaporwave.

## Formation and the cassette years

Born July 25, 1982 in Massachusetts to Russian-Jewish emigrants, both with musical backgrounds, Lopatin inherited his father's record collection and his Roland Juno-60 — the instrument that anchors the early records. He played synthesizer in high-school groups with Joel Ford, attended Hampshire College, then moved to Brooklyn for graduate study in archival science at Pratt Institute, a field he credits with shaping his practice. The Brooklyn noise scene absorbed him; early work surfaced under group names like Infinity Window and Astronaut before *Betrayed in the Octagon* (2007) appeared on Deception Island as a hand-numbered cassette credited to "Magic Oneohtrix Point Never." Two more synth albums (*Zones Without People*, *Russian Mind*, both 2009) and the No Fun compilation *Rifts* — The Wire's second-best album of 2009 — closed the era.

## The eccojam detonation

Beginning July 19, 2009, Lopatin uploaded what he called "eccojams" to a YouTube channel named sunsetcorp: seconds of '80s and '90s pop — Chris de Burgh's "The Lady in Red" on "nobody here," Fleetwood Mac on "angel" — slowed, looped, and echoed until a corporate artifact sounded like a séance. Many were assembled in GoldWave at an office job between 2004 and 2008. *Chuck Person's Eccojams Vol. 1* followed on The Curatorial Club in August 2010 in a run of 100 cassettes. Pitchfork's retrospective called it "the most influential cassette tape of the 21st century"; the lineage from sunsetcorp to vaporwave is the record's most-cited fact, though the "inventor" framing overstates what was a collectively crystallized genre.

## Software, Replica, and the Warp decade

In 2011 Games — his duo with Ford — renamed themselves Ford & Lopatin and opened Software Recording Co. under Mexican Summer; their *Channel Pressure* was its first release. *Replica* (November 2011), built from the audio of '80s and '90s TV commercials, was his first studio-recorded album and his statement of method: "looking for old things that are meaningful," then restructuring them into "new poetry." Warp signed him in 2013; *R Plus Seven* replaced samples with a plastic MIDI orchestra. The pattern since has been one dead medium per record: alt-metal adolescence on *Garden of Delete* (2015) — rolled out through the Ezra/Kaoss Edge internet fiction after real pop songwriters declined to take part; early music and harpsichord on *Age Of* (2018), staged as the alien-intelligence "concertscape" MYRIAD at Park Avenue Armory; FM-radio formats on the self-titled *Magic Oneohtrix Point Never* (2020), co-executive-produced by Abel Tesfaye; and vanished '90s sample-CD libraries on *Tranquilizer* (2025), a record that exists because an Internet Archive collection disappeared.

## Film and pop

The Safdie brothers recruited him by mood board for *Good Time* (2017); the score — ending in the Iggy Pop collaboration "The Pure and the Damned" — won the Cannes Soundtrack Award. The method, per NPR, is contrast: the film stays realistic while the music stays "fantastical," Vangelis-descended serenity applied to panic. *Uncut Gems* (2019) wrapped Moog and choir around the same trick; he executive-produced John Medeski's Alice Coltrane–briefed score for *The Curse* (2023); and *Marty Supreme* (2025), Josh Safdie's first solo feature, earned an Oscar shortlist and Pitchfork's first-ever Best New Music tag for a film score.

The pop track runs parallel: Tesfaye called after *Good Time* ("I'd heard your music before, but now I understand"), and Lopatin became a fixture of the Weeknd's circle — co-writing and producing on *After Hours*, performing on SNL, serving as musical director for the Super Bowl LV halftime show, executive-producing *Dawn FM*, and co-producing on *Hurry Up Tomorrow* plus co-scoring its film. Other production work spans ANOHNI's *Hopelessness*, David Byrne's *American Utopia*, FKA twigs, and DJ Earl.

## What the record shows

His own vocabulary — "eccojams," "Compressionism," "concertscape" — keeps pace with the aliases: OPN for albums, sunsetcorp for jams, Chuck Person for the tape. In October 2023 the dormant sunsetcorp channel woke to promote *Again*, his "speculative autobiography." The open questions are the usual seams: album counts disagree, birth details differ by source, Software's status is dormant-not-dead, and the sunsetcorp revival's intent is unresolved. What is consistent is the method: memory treated as material, obsolescence treated as an instrument, and calm music placed where it should cause the most alarm.

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
