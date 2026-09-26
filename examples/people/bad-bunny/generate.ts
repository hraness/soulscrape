#!/usr/bin/env bun
/** Generate examples/people/bad-bunny/person-index.json with derived source ids. */

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

// --- Reference anchors ----------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Bad Bunny (Q44333953)",
  url: "https://www.wikidata.org/wiki/Q44333953",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Bad Bunny",
  url: "https://en.wikipedia.org/wiki/Bad_Bunny",
  publisher: "Wikipedia",
  notes:
    "Used for discovery and filmography cross-checking, not as sole authority.",
});
const britannica = source({
  binding: "reference",
  mediaType: "article",
  title: "Bad Bunny | Grammys, Songs, Super Bowl, Movies, Albums, Music, & Facts",
  url: "https://www.britannica.com/biography/Bad-Bunny",
  publisher: "Encyclopaedia Britannica",
});
const wikiSuperBowl = source({
  binding: "reference",
  mediaType: "article",
  title: "Super Bowl LX halftime show",
  url: "https://en.wikipedia.org/wiki/Super_Bowl_LX_halftime_show",
  publisher: "Wikipedia",
});

// --- Early career and breakout --------------------------------------------

const remezcla = source({
  binding: "reporting",
  mediaType: "article",
  title: "Bad Bunny Became the Poster Boy of Trap en Español",
  url: "https://remezcla.com/features/music/bad-bunny-profile/",
  publisher: "Remezcla",
  publishedAt: "2017",
  notes:
    "Early profile covering the SoundCloud-to-Hear This Music origin story while he still had no debut album.",
});
const billboardILikeIt = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Cardi B Becomes First Female Rapper With Two Billboard Hot 100 No. 1s, as 'I Like It', With Bad Bunny & J Balvin, Follows 'Bodak Yellow' to the Top",
  url: "https://www.billboard.com/pro/cardi-b-i-like-it-hot-100-number-one-j-balvin-bad-bunny/",
  publisher: "Billboard",
  publishedAt: "2018-07-02",
});
const billboardOral = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Cardi B's 'I Like It': An Oral History of No. 1 Smash's Grueling Seven-Month Gestation",
  url: "https://www.billboard.com/music/latin/cardi-b-i-like-it-oral-history-8471835/",
  publisher: "Billboard",
  publishedAt: "2018",
  notes: "Names Noah Assad as Bad Bunny's manager.",
});
const nprX100pre = source({
  binding: "interview",
  mediaType: "article",
  title: "Stream Bad Bunny's Surprise Album, 'X 100PRE,' A Gift For Noche Buena",
  url: "https://www.npr.org/sections/altlatino/2018/12/23/679250160/stream-bad-bunnys-surprise-album-x-100pre-a-gift-for-noche-buena",
  publisher: "NPR Alt.Latino",
  publishedAt: "2018-12-23",
  notes: "Announces an Alt.Latino Spanish-language interview with the subject.",
});
const billboardX100pre = source({
  binding: "interview",
  mediaType: "article",
  title: "Bad Bunny Releases Debut Album, 'X100pre': Listen",
  url: "https://www.billboard.com/music/latin/bad-bunny-debut-album-x100pre-listen-8491348/",
  publisher: "Billboard",
  publishedAt: "2018-12-24",
  notes: "Includes a phone interview about finishing the album days before release.",
});
const nytOasis = source({
  binding: "reporting",
  mediaType: "article",
  title: "How J Balvin and Bad Bunny Made Their Surprise Album, 'Oasis'",
  url: "https://www.nytimes.com/2019/06/28/arts/music/bad-bunny-j-balvin-oasis.html",
  publisher: "The New York Times",
  publishedAt: "2019-06-28",
});

// --- Puerto Rico politics, 2019 --------------------------------------------

const rsProtest = source({
  binding: "reporting",
  mediaType: "article",
  title: "Why Bad Bunny Wants Puerto Rican Youth to Take the Streets",
  url: "https://www.rollingstone.com/music/music-latin/bad-bunny-residente-puerto-rico-protest-governor-rossello-859419/",
  publisher: "Rolling Stone",
  publishedAt: "2019-07-17",
  authors: ["Nuria Net"],
});
const nytProtest = source({
  binding: "archive",
  mediaType: "article",
  title: "Sharpening the Knives: Musicians Join the Protests in Puerto Rico",
  url: "https://web.archive.org/web/20190719093209/https:/www.nytimes.com/2019/07/19/us/puerto-rico-residente-ile-afilando-los-cuchillos.html",
  publisher: "The New York Times (via Internet Archive)",
  publishedAt: "2019-07-19",
  notes:
    "Archived capture of the NYT report on the artists' role in the Ricky Renuncia protests.",
});
const nprAfilando = source({
  binding: "reporting",
  mediaType: "audio",
  title: "A Puerto Rico Protest Song: 'Afilando Los Cuchillos'",
  url: "https://www.npr.org/2019/07/28/746089844/a-puerto-rico-protest-song-afilando-los-cuchillos",
  publisher: "NPR",
  publishedAt: "2019-07-28",
});

// --- 2020: three albums, statements, firsts ---------------------------------

const cbsAlexa = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bad Bunny calls attention to killing of transgender woman in 'Tonight Show' performance",
  url: "https://www.cbsnews.com/news/bad-bunny-transgender-woman-alexa-negron-luciano-shirt-tonight-show-starring-jimmy-fallon/",
  publisher: "CBS News",
  publishedAt: "2020-02-28",
  authors: ["Christopher Brito"],
});
const rsDrag = source({
  binding: "reporting",
  mediaType: "article",
  title: "Bad Bunny Gets a Full Drag Makeover in New 'Yo Perreo Sola' Video",
  url: "https://www.rollingstone.com/music/music-latin/bad-bunny-drag-transformation-yo-perreo-sola-video-974467/",
  publisher: "Rolling Stone",
  publishedAt: "2020-03-27",
  authors: ["Suzy Exposito"],
});
const rsCaptivity = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Bad Bunny on the Cover of Rolling Stone: New Albums, Life in Lockdown",
  url: "https://www.rollingstone.com/music/music-features/bad-bunny-cover-story-lockdown-puerto-rico-new-albums-996871/",
  publisher: "Rolling Stone",
  publishedAt: "2020-05-14",
  authors: ["Suzy Exposito"],
});
const nprEUTDM = source({
  binding: "reporting",
  mediaType: "article",
  title: "Stream Bad Bunny's New Album 'El Último Tour Del Mundo'",
  url: "https://www.npr.org/2020/11/27/938864306/bad-bunny-drops-the-indie-fluenced-el-ultimo-tour-del-mundo",
  publisher: "NPR",
  publishedAt: "2020-11-27",
});
const appleEUTDM = source({
  binding: "interview",
  mediaType: "audio",
  title: "Bad Bunny: EL ÚLTIMO TOUR DEL MUNDO Interview",
  url: "https://music.apple.com/us/playlist/bad-bunny-el-%C3%BAltimo-tour-del-mundo-interview/pl.9e5c6ff08fd34ed7b8961a348259bd0b",
  publisher: "Apple Music",
  publishedAt: "2020-11",
  notes:
    "He calls the record 'my retirement album that was supposed to come out in 2032 — but I am releasing it now.'",
});
const billboardEUTDM = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Bad Bunny's 'El Ultimo Tour del Mundo' Debuts at No. 1 on Billboard 200 Chart, Is First All-Spanish No. 1 Album",
  url: "https://www.billboard.com/pro/bad-bunny-el-ultimo-tour-del-mundo-billboard-200-number-one/",
  publisher: "Billboard",
  publishedAt: "2020-12-06",
  authors: ["Keith Caulfield"],
});
const guinness = source({
  binding: "reference",
  mediaType: "webpage",
  title: "First all Spanish-language album to top the Billboard 200",
  url: "https://www.guinnessworldrecords.com/world-records/670764-first-all-spanish-language-album-to-top-the-billboard-200",
  publisher: "Guinness World Records",
});
const rsEUTDMInt = source({
  binding: "interview",
  mediaType: "article",
  title: "Bad Bunny Interview: 'El Último Tour del Mundo' and More",
  url: "https://www.rollingstone.com/music/music-features/bad-bunny-interview-el-ultimo-tour-del-mundo-1104679/",
  publisher: "Rolling Stone",
  publishedAt: "2020-12",
  notes: "Contains the exchange where he confirms he is not retiring — 'for now.'",
});

// --- 2021-2023: wrestling, records, Coachella --------------------------------

const wweWM37 = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Bad Bunny & Damian Priest def. The Miz & John Morrison",
  url: "https://www.wwe.com/shows/wrestlemania/wrestlemania-37/bad-bunny-damian-priest-vs-the-miz-john-morrison-results",
  publisher: "WWE",
  publishedAt: "2021-04-10",
  notes: "Official WWE match result; recaps the Royal Rumble 2021 setup.",
});
const grammyArtist = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Bad Bunny | Artist",
  url: "https://www.grammy.com/artists/bad-bunny/243129/",
  publisher: "Recording Academy",
  notes: "Official Grammy wins and nominations ledger.",
});
const billboardUVST = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Bad Bunny's 'Un Verano Sin Ti' Ties for Most Weeks at No. 1 in Last 10 Years on Billboard 200",
  url: "https://www.billboard.com/music/chart-beat/bad-bunny-billboard-200-chart-number-one-thirteen-weeks-un-verano-sin-ti-1235153095/",
  publisher: "Billboard",
  publishedAt: "2022-10-09",
  authors: ["Keith Caulfield"],
});
const billboard435 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Bad Bunny Closes Out 2022 With Record-Breaking $435 Million in Tour Grosses",
  url: "https://www.billboard.com/pro/bad-bunny-2022-concerts-earn-record-breaking-435-million/",
  publisher: "Billboard",
  publishedAt: "2022-12-13",
  authors: ["Eric Frankenberg"],
});
const spotifyWrapped = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "It's Here: The Top Songs, Artists, Podcasts, and Listening Trends of 2022",
  url: "https://newsroom.spotify.com/2022-11-30/the-top-songs-artists-podcasts-and-listening-trends-of-2022/",
  publisher: "Spotify Newsroom",
  publishedAt: "2022-11-30",
});
const ytElApagon = source({
  binding: "subject_controlled",
  mediaType: "video",
  title: "Bad Bunny - El Apagón - Aquí Vive Gente (Video Oficial)",
  url: "https://www.youtube.com/watch?v=1TCX_Aqzoo4",
  publisher: "Bad Bunny (YouTube)",
  publishedAt: "2022-09-16",
  language: "es",
  notes:
    "Official channel upload; the music video segues into Bianca Graulau's ~18-minute documentary 'Aquí Vive Gente.'",
});
const rsApagon = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bad Bunny Releases Powerful Documentary Alongside Music Video for 'El Apagón'",
  url: "https://www.rollingstone.com/music/music-latin/bad-bunny-releases-documentary-for-el-apagon-1234594915/",
  publisher: "Rolling Stone",
  publishedAt: "2022-09-16",
  authors: ["Juan J. Arroyo"],
});
const timeCover = source({
  binding: "interview",
  mediaType: "article",
  title: "Bad Bunny on Being Ready For Coachella — And the World",
  url: "https://time.com/6266349/bad-bunny-cover-story/",
  publisher: "TIME",
  publishedAt: "2023-03-28",
  authors: ["Andrew R. Chow", "Mariah Espada"],
});
const abcTime = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bad Bunny talks headlining Coachella, appears on history-making Time magazine cover",
  url: "https://abcnews.com/GMA/Culture/bad-bunny-talks-headlining-coachella-appears-history-making/story?id=98178354",
  publisher: "ABC News",
  publishedAt: "2023-03-28",
  notes: "Documents that the cover was TIME's first with all-Spanish text.",
});
const billboardCoachella = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bad Bunny Brings Out Post Malone, Rides a Jet Ski & More During Historic Two-Hour Set at Coachella 2023",
  url: "https://www.billboard.com/music/latin/bad-bunny-historic-headliner-coachella-2023-recap-1235303337/",
  publisher: "Billboard",
  publishedAt: "2023-04-15",
});
const wweBacklash = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Bad Bunny def. Damian Priest in a San Juan Street Fight",
  url: "https://www.wwe.com/shows/backlash/2023/bad-bunny-vs-damian-priest-results",
  publisher: "WWE",
  publishedAt: "2023-05-06",
});
const thrElMuerto = source({
  binding: "reporting",
  mediaType: "article",
  title: "Sony Removes Bad Bunny Spider-Man Spinoff 'El Muerto' From Calendar",
  url: "https://www.hollywoodreporter.com/movies/movie-news/el-muerto-bad-bunny-release-date-1235520812/",
  publisher: "The Hollywood Reporter",
  publishedAt: "2023-06-21",
  authors: ["Aaron Couch", "Borys Kit"],
});
const rs2023Cover = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Bad Bunny Talks Coachella, 'El Apagón' Controversy, And Future Plans",
  url: "https://www.rollingstone.com/music/music-features/bad-bunny-coachella-el-apagon-controversy-future-interview-1234770225/",
  publisher: "Rolling Stone",
  publishedAt: "2023",
  authors: ["Julyssa Lopez"],
});
const vfCover = source({
  binding: "interview",
  mediaType: "article",
  title: "Bad Bunny on Sex, Social Media, and Kendall Jenner",
  url: "https://www.vanityfair.com/style/2023/09/bad-bunny-on-sex-social-media-and-kendall-jenner",
  publisher: "Vanity Fair",
  publishedAt: "2023-09-12",
  authors: ["Michelle Ruiz"],
});
const billboardNadie = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Bad Bunny's 'Nadie Sabe Lo Que Va a Pasar Mañana' Debuts at No. 1 on Billboard 200",
  url: "https://www.billboard.com/music/chart-beat/bad-bunny-nadie-sabe-lo-que-va-a-pasar-manana-number-one-billboard-200-albums-chart-1235451431/",
  publisher: "Billboard",
  publishedAt: "2023-10-22",
  authors: ["Keith Caulfield"],
});

// --- 2024-2026: DtMF era, residency, Super Bowl, Grammys ----------------------

const cnnHarris = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bad Bunny shows support for Harris after Tony Hinchcliffe makes offensive comment about Puerto Rico at Trump rally",
  url: "https://www.cnn.com/2024/10/27/politics/bad-bunny-kamala-harris-puerto-rico",
  publisher: "CNN",
  publishedAt: "2024-10-27",
  authors: ["Priscilla Alvarez"],
});
const nytDtMF = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Bad Bunny Talks Coming Back Home on His 'Most Puerto Rican' Album Yet",
  url: "https://www.nytimes.com/2025/01/05/arts/music/bad-bunny-album-debi-tirar-mas-fotos.html",
  publisher: "The New York Times",
  publishedAt: "2025-01-05",
  authors: ["Jon Caramanica", "Joe Coscarelli"],
});
const timeDtMF = source({
  binding: "interview",
  mediaType: "article",
  title:
    "'I Found the Sound That Represents Me': Bad Bunny On Heartbreak and Returning Home to Puerto Rico With Debí Tirar Más Fotos",
  url: "https://time.com/7204771/bad-bunny-debi-tirar-mas-fotos-interview-2025/",
  publisher: "TIME",
  publishedAt: "2025-01",
});
const rsDtMFSongs = source({
  binding: "interview",
  mediaType: "article",
  title: "Bad Bunny Tells the Stories Behind the Songs on 'Debi Tirar Mas Fotos'",
  url: "https://www.rollingstone.com/music/music-features/bad-bunny-debi-tirar-mas-fotos-songs-stories-1235230482/",
  publisher: "Rolling Stone",
  publishedAt: "2025-01-10",
  authors: ["Julyssa Lopez"],
});
const cutDtMF = source({
  binding: "interview",
  mediaType: "article",
  title: "Bad Bunny Takes Us to Puerto Rico in DeBÍ TiRAR MáS FOToS",
  url: "https://www.thecut.com/article/bad-bunny-new-album-debi-tirar-mas-fotos-interview.html",
  publisher: "The Cut",
  publishedAt: "2025-02-18",
});
const apDtMFReview = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Music Review: Bad Bunny's 'Debí Tirar Más Fotos' is a love letter to Puerto Rico",
  url: "https://apnews.com/article/bad-bunny-debi-tirar-mas-fotos-review-856f8e4f89e48e6ab104a491ae3dbcde",
  publisher: "Associated Press",
  publishedAt: "2025-01",
});
const billboardDtMFNo1 = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Bad Bunny on Topping the Billboard 200 With 'Debí Tirar Más Fotos' & His Salsa-Dancing Skills: 'After Two Drinks, I'm the Best'",
  url: "https://www.billboard.com/music/latin/bad-bunny-talks-no-1-billboard-200-debi-tirar-mas-fotos-1235879554/",
  publisher: "Billboard",
  publishedAt: "2025-01-21",
  authors: ["Leila Cobo"],
});
const billboardDtMF5Q = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "How Did Bad Bunny Manage Such a Massive Second Week for His 'Debí Tirar Más Fotos' Album?",
  url: "https://www.billboard.com/music/chart-beat/bad-bunny-debi-tirar-mas-fotos-number-one-five-burning-questions-1235880986/",
  publisher: "Billboard",
  publishedAt: "2025-01-22",
  notes:
    "Chart record: DeBÍ moved No. 2 to No. 1 in its first full tracking week with 203,500 units, his fourth consecutive No. 1.",
});
const ytTinyDesk = source({
  binding: "first_person",
  mediaType: "video",
  title: "Bad Bunny: Tiny Desk Concert",
  url: "https://www.youtube.com/watch?v=ouuPSxE1hK4",
  publisher: "NPR Music (YouTube)",
  publishedAt: "2025-04-07",
});
const nprTinyDesk = source({
  binding: "interview",
  mediaType: "audio",
  title: "Behind the scenes of Bad Bunny's Tiny Desk",
  url: "https://www.npr.org/2025/04/09/1243652736/bad-bunny-tiny-desk-interview",
  publisher: "NPR Alt.Latino",
  publishedAt: "2025-04-09",
  notes:
    "Alt.Latino interview at the Desk; the episode notes the concert was the most-watched premiere in the series' history.",
});
const billboardResidency = source({
  binding: "reporting",
  mediaType: "article",
  title: "Bad Bunny's Puerto Rico Residency: How It Will Help the Local Economy",
  url: "https://www.billboard.com/pro/bad-bunny-puerto-rico-residency-help-local-economy/",
  publisher: "Billboard",
  publishedAt: "2025-07",
  authors: ["Isabela Raygoza"],
});
const rsImpact = source({
  binding: "reporting",
  mediaType: "article",
  title: "How Much Did Bad Bunny's Residency Generate for Puerto Rico's Economy?",
  url: "https://www.rollingstone.com/music/music-latin/bad-bunny-economic-impact-residency-puerto-rico-1235490958/",
  publisher: "Rolling Stone",
  publishedAt: "2025-09",
  notes:
    "Counts 31 shows; most other outlets report 30. Surveys impact estimates from ~$176.6M (UPR) to ~$733M (Gaither International).",
});
const idCover = source({
  binding: "interview",
  mediaType: "article",
  title: "At Home With Bad Bunny",
  url: "https://i-d.co/article/bad-bunny-puerto-rico-residency-issue-375-cover/",
  publisher: "i-D",
  publishedAt: "2025-09-10",
  authors: ["Suzy Exposito"],
  notes:
    "The interview in which he confirms ICE-raid concern factored into omitting mainland U.S. tour dates.",
});
const guardianICE = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bad Bunny says he left US out of world tour due to fear of Ice raids at concerts",
  url: "https://www.theguardian.com/music/2025/sep/11/bad-bunny-left-usa-out-world-tour-fear-of-ice-raids-at-concerts",
  publisher: "The Guardian",
  publishedAt: "2025-09-11",
});
const nflAnnounce = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Global sensation Bad Bunny to perform at Apple Music Super Bowl LX Halftime Show",
  url: "https://www.nfl.com/news/global-sensation-bad-bunny-to-perform-at-apple-music-super-bowl-lx-halftime-show",
  publisher: "NFL",
  publishedAt: "2025-09-28",
});
const apLatinGrammy = source({
  binding: "reporting",
  mediaType: "article",
  title: "Bad Bunny wins album of the year at the 2025 Latin Grammys, capping an electric night",
  url: "https://apnews.com/article/latin-grammys-2025-42dc4af01c917740b60fe585c09f6d1b",
  publisher: "Associated Press",
  publishedAt: "2025-11-13",
});
const apGrammy = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bad Bunny wins album of the year at the 2026 Grammy Awards, a first for a Spanish-language album",
  url: "https://apnews.com/article/2026-grammy-awards-4d631de5d968b51276a8f06b76580e20",
  publisher: "Associated Press",
  publishedAt: "2026-02-01",
});
const nprGrammy = source({
  binding: "reporting",
  mediaType: "audio",
  title:
    "Bad Bunny made history taking home the Grammy for album of the year",
  url: "https://www.npr.org/2026/02/02/nx-s1-5696480/bad-bunny-made-history-taking-home-the-grammy-for-album-of-the-year",
  publisher: "NPR",
  publishedAt: "2026-02-02",
});
const forbesHalftime = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Every Song At Bad Bunny's NFL Super Bowl 2026 Halftime Show: Meaning And Context",
  url: "https://www.forbes.com/sites/hannahabraham/2026/02/08/every-song-at-bad-bunnys-nfl-super-bowl-2026-halftime-show/",
  publisher: "Forbes",
  publishedAt: "2026-02-08",
  authors: ["Hannah Abraham"],
});

const S = {
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  britannica: britannica.id,
  wikiSuperBowl: wikiSuperBowl.id,
  remezcla: remezcla.id,
  billboardILikeIt: billboardILikeIt.id,
  billboardOral: billboardOral.id,
  nprX100pre: nprX100pre.id,
  billboardX100pre: billboardX100pre.id,
  nytOasis: nytOasis.id,
  rsProtest: rsProtest.id,
  nytProtest: nytProtest.id,
  nprAfilando: nprAfilando.id,
  cbsAlexa: cbsAlexa.id,
  rsDrag: rsDrag.id,
  rsCaptivity: rsCaptivity.id,
  nprEUTDM: nprEUTDM.id,
  appleEUTDM: appleEUTDM.id,
  billboardEUTDM: billboardEUTDM.id,
  guinness: guinness.id,
  rsEUTDMInt: rsEUTDMInt.id,
  wweWM37: wweWM37.id,
  grammyArtist: grammyArtist.id,
  billboardUVST: billboardUVST.id,
  billboard435: billboard435.id,
  spotifyWrapped: spotifyWrapped.id,
  ytElApagon: ytElApagon.id,
  rsApagon: rsApagon.id,
  timeCover: timeCover.id,
  abcTime: abcTime.id,
  billboardCoachella: billboardCoachella.id,
  wweBacklash: wweBacklash.id,
  thrElMuerto: thrElMuerto.id,
  rs2023Cover: rs2023Cover.id,
  vfCover: vfCover.id,
  billboardNadie: billboardNadie.id,
  cnnHarris: cnnHarris.id,
  nytDtMF: nytDtMF.id,
  timeDtMF: timeDtMF.id,
  rsDtMFSongs: rsDtMFSongs.id,
  cutDtMF: cutDtMF.id,
  apDtMFReview: apDtMFReview.id,
  billboardDtMFNo1: billboardDtMFNo1.id,
  billboardDtMF5Q: billboardDtMF5Q.id,
  ytTinyDesk: ytTinyDesk.id,
  nprTinyDesk: nprTinyDesk.id,
  billboardResidency: billboardResidency.id,
  rsImpact: rsImpact.id,
  idCover: idCover.id,
  guardianICE: guardianICE.id,
  nflAnnounce: nflAnnounce.id,
  apLatinGrammy: apLatinGrammy.id,
  apGrammy: apGrammy.id,
  nprGrammy: nprGrammy.id,
  forbesHalftime: forbesHalftime.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-bad-bunny",
  generatedAt: "2026-09-17T01:00:00Z",
  subject: {
    kind: "person",
    handle: "bad-bunny",
    displayName: "Bad Bunny",
    alsoKnownAs: [
      "Benito Antonio Martínez Ocasio",
      "Benito A. Martínez Ocasio",
      "El Conejo Malo",
      "San Benito",
    ],
    summary:
      "Puerto Rican rapper, singer, and producer (born Benito Antonio Martínez Ocasio, 1994) who went from uploading songs to SoundCloud while bagging groceries to Spotify's most-streamed artist in the world for 2020, 2021, and 2022. He made the first all-Spanish album to top the Billboard 200, was the first Latino solo headliner at Coachella, won the Grammy for Album of the Year, and gave the first Super Bowl halftime show performed primarily in Spanish. He has also wrestled for WWE and acted in film.",
    identity: {
      wikidataId: "Q44333953",
      officialSite: "https://debitirarmasfotos.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Bad_Bunny",
      profiles: [
        "https://www.instagram.com/badbunnypr/",
        "https://x.com/sanbenito",
        "https://www.youtube.com/BadBunnyPR",
        "https://www.facebook.com/BadBunnyOfficial/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T00:00:00Z",
    coverage: ["biography", "work", "beliefs", "projects", "media", "philosophy"],
  },
  sources: [
    wikidata,
    wikipedia,
    britannica,
    wikiSuperBowl,
    remezcla,
    billboardILikeIt,
    billboardOral,
    nprX100pre,
    billboardX100pre,
    nytOasis,
    rsProtest,
    nytProtest,
    nprAfilando,
    cbsAlexa,
    rsDrag,
    rsCaptivity,
    nprEUTDM,
    appleEUTDM,
    billboardEUTDM,
    guinness,
    rsEUTDMInt,
    wweWM37,
    grammyArtist,
    billboardUVST,
    billboard435,
    spotifyWrapped,
    ytElApagon,
    rsApagon,
    timeCover,
    abcTime,
    billboardCoachella,
    wweBacklash,
    thrElMuerto,
    rs2023Cover,
    vfCover,
    billboardNadie,
    cnnHarris,
    nytDtMF,
    timeDtMF,
    rsDtMFSongs,
    cutDtMF,
    apDtMFReview,
    billboardDtMFNo1,
    billboardDtMF5Q,
    ytTinyDesk,
    nprTinyDesk,
    billboardResidency,
    rsImpact,
    idCover,
    guardianICE,
    nflAnnounce,
    apLatinGrammy,
    apGrammy,
    nprGrammy,
    forbesHalftime,
  ],
  claims: [
    {
      id: "claim-birth-1994",
      kind: "fact",
      text: "Benito Antonio Martínez Ocasio was born on March 10, 1994, in Bayamón, Puerto Rico, and was raised in the Almirante Sur barrio of Vega Baja; his father was a truck driver and his mother a schoolteacher.",
      sourceIds: [S.wikipedia, S.britannica, S.wikidata],
    },
    {
      id: "claim-name-origin",
      kind: "fact",
      text: "The stage name Bad Bunny comes from a childhood photo of him in a bunny suit with a grumpy expression, which he used for an early social-media account.",
      sourceIds: [S.britannica],
    },
    {
      id: "claim-econo-upr",
      kind: "fact",
      text: "While studying audiovisual communications at the University of Puerto Rico at Arecibo, he bagged groceries at an Econo supermarket and uploaded tracks to SoundCloud.",
      sourceIds: [S.cutDtMF, S.remezcla],
    },
    {
      id: "claim-diles-signing",
      kind: "fact",
      text: "His song 'Diles,' posted to SoundCloud in January 2016 while he was still working at the supermarket, drew the attention of DJ Luian, who signed him to Hear This Music; an all-star remix with Ozuna, Farruko, Arcángel, and Ñengo Flow followed that August.",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "claim-rimas-assad",
      kind: "fact",
      text: "He is managed by Noah Assad and releases through Rimas Entertainment, the independent Puerto Rican label built around his career after his start on Hear This Music.",
      sourceIds: [S.billboardOral, S.wikipedia],
    },
    {
      id: "claim-i-like-it",
      kind: "fact",
      text: "Cardi B's 'I Like It' featuring Bad Bunny and J Balvin reached No. 1 on the Billboard Hot 100 dated July 7, 2018 — Bad Bunny's first Hot 100 topper.",
      sourceIds: [S.billboardILikeIt],
    },
    {
      id: "claim-x100pre",
      kind: "fact",
      text: "His debut album X 100pre was surprise-released on Christmas Eve 2018 on Rimas Entertainment, hours after he announced it on social media.",
      sourceIds: [S.nprX100pre, S.billboardX100pre],
    },
    {
      id: "claim-oasis",
      kind: "fact",
      text: "Oasis, an eight-song collaborative album with J Balvin, was released overnight with little warning on June 28, 2019.",
      sourceIds: [S.nytOasis],
    },
    {
      id: "claim-protests-2019",
      kind: "fact",
      text: "In July 2019 he paused a European tour to fly home and join the mass protests in San Juan demanding Governor Ricardo Rosselló's resignation over the leaked Telegram chats; with Residente and iLe he wrote and recorded the protest song 'Afilando los Cuchillos' in one day, released July 17. Rosselló announced his resignation July 24.",
      sourceIds: [S.rsProtest, S.nytProtest, S.nprAfilando],
    },
    {
      id: "claim-yhlqmdlg",
      kind: "fact",
      text: "His second album, YHLQMDLG, was released on Leap Day, February 29, 2020, and debuted at No. 2 on the Billboard 200 — at that point the highest-charting all-Spanish-language album ever.",
      sourceIds: [S.guinness, S.billboardEUTDM],
    },
    {
      id: "claim-alexa-tribute",
      kind: "fact",
      text: "On the February 27, 2020 Tonight Show he performed 'Ignorantes' with Sech wearing a skirt and a shirt reading 'Mataron a Alexa, no a un hombre con falda' ('They killed Alexa, not a man in a skirt'), honoring Alexa Negrón Luciano, a homeless transgender woman murdered in Toa Baja days earlier.",
      sourceIds: [S.cbsAlexa],
    },
    {
      id: "claim-perreo-drag",
      kind: "fact",
      text: "In the March 27, 2020 video for 'Yo Perreo Sola' — a song he says he wrote from a woman's perspective — he performs in full drag; the track won the first-ever Latin Grammy for Best Reggaeton Performance.",
      sourceIds: [S.rsDrag, S.grammyArtist],
    },
    {
      id: "claim-eutdm-first",
      kind: "fact",
      text: "El Último Tour Del Mundo, released November 27, 2020, debuted at No. 1 on the Billboard 200 dated December 12, 2020 — the first all-Spanish-language album to top the chart in its 64-year history.",
      sourceIds: [S.billboardEUTDM, S.guinness],
    },
    {
      id: "claim-spotify-threepeat",
      kind: "fact",
      text: "Spotify named him the most-streamed artist in the world for 2020, 2021, and 2022 — the first three-peat in Wrapped history, with more than 18.5 billion streams in 2022 alone.",
      sourceIds: [S.spotifyWrapped],
    },
    {
      id: "claim-wm37",
      kind: "fact",
      text: "On April 10, 2021 at WrestleMania 37 he teamed with Damian Priest to defeat The Miz and John Morrison in his first WWE match — a storyline built from his Royal Rumble 2021 'Booker T' performance.",
      sourceIds: [S.wweWM37],
    },
    {
      id: "claim-uvst-13",
      kind: "fact",
      text: "Un Verano Sin Ti, released May 6, 2022, logged 13 nonconsecutive weeks at No. 1 on the Billboard 200 — tying Drake's Views and the Frozen soundtrack for the most weeks on top in a decade.",
      sourceIds: [S.billboardUVST],
    },
    {
      id: "claim-435m-touring",
      kind: "fact",
      text: "His 81 concerts in 2022 grossed $435 million — the highest single-calendar-year gross in Billboard Boxscore history; the World's Hottest Tour stadium leg alone took $314.1 million, resetting the record for the biggest Latin tour.",
      sourceIds: [S.billboard435],
    },
    {
      id: "claim-apagon-doc",
      kind: "fact",
      text: "The September 16, 2022 'El Apagón' video on his official channel segues into 'Aquí Vive Gente,' a roughly 18-minute documentary by independent journalist Bianca Graulau on blackouts, displacement, gentrification, and tax breaks for wealthy outsiders in Puerto Rico.",
      sourceIds: [S.ytElApagon, S.rsApagon],
    },
    {
      id: "claim-coachella-first",
      kind: "fact",
      text: "He headlined Coachella on April 14 and 21, 2023 — the first Latino solo artist and the first primarily Spanish-language headliner in the festival's history.",
      sourceIds: [S.billboardCoachella, S.timeCover],
    },
    {
      id: "claim-backlash-2023",
      kind: "fact",
      text: "He hosted WWE Backlash at the Coliseo de Puerto Rico on May 6, 2023 and defeated Damian Priest in a San Juan Street Fight — his first WWE singles win — with assists from Rey Mysterio, Carlito, Savio Vega, and the LWO.",
      sourceIds: [S.wweBacklash],
    },
    {
      id: "claim-nadie",
      kind: "fact",
      text: "Nadie Sabe Lo Que Va a Pasar Mañana was announced October 9 and released October 13, 2023, debuting at No. 1 — his third consecutive Billboard 200 topper; he hosted Saturday Night Live eight days later.",
      sourceIds: [S.billboardNadie, S.wikipedia],
    },
    {
      id: "claim-harris-support",
      kind: "fact",
      text: "On October 27, 2024 — hours after a comedian at Donald Trump's Madison Square Garden rally called Puerto Rico a 'floating island of garbage' — he shared Kamala Harris's Puerto Rico plan video with his more than 45 million Instagram followers; a representative confirmed he was supporting her candidacy.",
      sourceIds: [S.cnnHarris],
    },
    {
      id: "claim-dtmf-release",
      kind: "fact",
      text: "Debí Tirar Más Fotos, his sixth solo studio album, was released on a Sunday, January 5, 2025 — rooted in Puerto Rican folkloric styles (música jíbara, plena, salsa) including an El Gran Combo sample on 'NuevaYol'; after debuting at No. 2 on a short tracking week it rose to No. 1, his fourth consecutive chart-topper.",
      sourceIds: [S.apDtMFReview, S.billboardDtMF5Q, S.rsDtMFSongs],
    },
    {
      id: "claim-tinydesk",
      kind: "fact",
      text: "His NPR Tiny Desk concert, performed with an all-Puerto Rican folk band (cuatros, congas, güiro, plena hand drums), premiered April 7, 2025 and became the most-watched premiere in the series' history.",
      sourceIds: [S.nprTinyDesk, S.ytTinyDesk],
    },
    {
      id: "claim-residency",
      kind: "fact",
      text: "The 'No Me Quiero Ir de Aquí' residency ran 30 weekend shows from July 11 to September 14, 2025 at the Coliseo de Puerto Rico José Miguel Agrelot; the first nine shows were reserved for island residents and the run drew roughly 600,000 attendees.",
      sourceIds: [S.billboardResidency, S.idCover, S.rsImpact],
    },
    {
      id: "claim-residency-econ",
      kind: "fact",
      text: "Published estimates of the residency's economic impact diverge sharply: a University of Puerto Rico economist put a 'very conservative' floor at $176.6 million, Discover Puerto Rico estimated about $200 million in tourist spending, and Gaither International estimated $733 million including exposure value.",
      sourceIds: [S.rsImpact],
    },
    {
      id: "claim-no-us-dates",
      kind: "fact",
      text: "The Debí Tirar Más Fotos World Tour (November 21, 2025 in Santo Domingo through July 22, 2026 in Brussels) includes no mainland-U.S. dates; he told i-D that the possibility of 'f---ing ICE' outside his concerts was one factor discussed with concern.",
      sourceIds: [S.idCover, S.guardianICE],
    },
    {
      id: "claim-sb-announce",
      kind: "fact",
      text: "The NFL, Apple Music, and Roc Nation announced on September 28, 2025 that he would headline the Super Bowl LX halftime show at Levi's Stadium on February 8, 2026; he dedicated the booking 'to my people, my culture, and our history.'",
      sourceIds: [S.nflAnnounce],
    },
    {
      id: "claim-latingrammys-2025",
      kind: "fact",
      text: "At the November 13, 2025 Latin Grammys, Debí Tirar Más Fotos won five awards including Album of the Year, bringing his career Latin Grammy total to 17.",
      sourceIds: [S.apLatinGrammy],
    },
    {
      id: "claim-grammy-aoty",
      kind: "fact",
      text: "On February 1, 2026, Debí Tirar Más Fotos became the first all-Spanish-language album to win the Grammy for Album of the Year; he also won Best Música Urbana Album and Best Global Music Performance ('EoO'), and his speech included 'ICE out… we're not savages, we're not animals, we are humans and we are Americans.'",
      sourceIds: [S.apGrammy, S.nprGrammy, S.cutDtMF],
    },
    {
      id: "claim-sb-lx-show",
      kind: "fact",
      text: "His Super Bowl LX halftime set on February 8, 2026 was the first performed primarily in Spanish, with guests Lady Gaga, Ricky Martin, and Los Pleneros de la Cresta; his only English words were 'God bless America' before he named the nations of the Americas, and the show closed on the message 'The only thing stronger than hate is love.'",
      sourceIds: [S.forbesHalftime, S.wikiSuperBowl],
    },
    {
      id: "claim-grammy-history",
      kind: "fact",
      text: "His earlier Grammy record: Best Latin Pop or Urban Album for YHLQMDLG (2021), Best Música Urbana Album for El Último Tour Del Mundo (2022) and Un Verano Sin Ti (2023); Un Verano Sin Ti was also the first Spanish-language album nominated for Album of the Year (2023).",
      sourceIds: [S.grammyArtist, S.apGrammy],
    },
    {
      id: "claim-acting",
      kind: "fact",
      text: "Screen credits include Narcos: Mexico (2021), Bullet Train (2022), Cassandro (2023), Happy Gilmore 2 (2025), and Caught Stealing (2025); he also hosted Saturday Night Live on October 21, 2023.",
      sourceIds: [S.wikipedia, S.billboardNadie],
    },
    {
      id: "claim-sb-liv",
      kind: "fact",
      text: "He appeared as a guest in the February 2, 2020 Super Bowl LIV halftime show headlined by Shakira and Jennifer Lopez, alongside J Balvin.",
      sourceIds: [S.wikiSuperBowl, S.wikipedia],
    },
    {
      id: "claim-el-muerto",
      kind: "fact",
      text: "Sony announced El Muerto with him starring at CinemaCon 2022 — billed as the first live-action Marvel project to star a Latino character — then removed it from the release calendar in June 2023 amid the writers strike and his tour schedule; subsequent reporting indicates the project continued without him.",
      sourceIds: [S.thrElMuerto],
    },
    {
      id: "claim-spanish-comfort",
      kind: "stated_belief",
      text: "On why he does not record in English: 'I think in Spanish, I feel in Spanish, I eat in Spanish, I sing in Spanish… I am never going to do it just because someone says I need to do it to reach a certain audience.'",
      sourceIds: [S.vfCover],
    },
    {
      id: "claim-music-alone",
      kind: "stated_belief",
      text: "He frames his creative process as indifferent to outside approval — 'I make music like I'm the only person in the world' — and his first all-Spanish TIME cover quoted him: 'No voy a hacer otra cosa para que a ti te guste' ('I'm not going to do anything else to make you like it').",
      sourceIds: [S.timeCover],
    },
    {
      id: "claim-not-for-tourists",
      kind: "stated_belief",
      text: "He describes Debí Tirar Más Fotos as an album for Puerto Ricans rather than tourists, using tourists as an analogy for people who enjoy only the beautiful parts of a place — or a person — and leave before the problems show.",
      sourceIds: [S.timeDtMF],
    },
    {
      id: "claim-ice-concern",
      kind: "stated_belief",
      text: "Asked by i-D whether he skipped mainland-U.S. dates out of concern over mass deportations of Latinos, he answered 'Man, honestly, yes,' adding that none of the reasons were 'out of hate' — he had performed successfully in the U.S. many times — but 'f---ing ICE could be outside [my concert].'",
      sourceIds: [S.idCover, S.guardianICE],
    },
    {
      id: "claim-retirement-2032",
      kind: "stated_belief",
      text: "He calls El Último Tour Del Mundo 'my retirement album that was supposed to come out in 2032 — but I am releasing it now'; when Rolling Stone asked directly whether he was retiring, he answered 'For now, I'm still here.'",
      sourceIds: [S.appleEUTDM, S.rsEUTDMInt],
    },
    {
      id: "claim-reggaeton-lineage",
      kind: "stated_belief",
      text: "He places himself inside the lineage of the reggaetoneros who raised him — wearing medallion chains honoring Tego Calderón, Héctor El Father, Wisin y Yandel, Arcángel, Don Omar, and Daddy Yankee for his 2023 Rolling Stone cover: 'That's my foundation.'",
      sourceIds: [S.rs2023Cover],
    },
    {
      id: "claim-privacy-stance",
      kind: "stated_belief",
      text: "He refuses to clarify rumors or his personal life: 'I'm not really interested in clarifying anything because I have no commitment to clarify anything to anyone… at the end of the day, you listen to me because you want to. I don't force you to.'",
      sourceIds: [S.vfCover],
    },
    {
      id: "claim-surprise-release",
      kind: "pattern",
      text: "He repeatedly releases albums off-cycle with minimal warning: X 100pre announced hours before Christmas Eve; Oasis overnight; YHLQMDLG on Leap Day; El Último Tour Del Mundo at midnight on Thanksgiving; Nadie Sabe announced four days out; Debí Tirar Más Fotos on a Sunday, outside the Friday tracking week.",
      sourceIds: [S.nprX100pre, S.nytOasis, S.billboardNadie, S.billboardDtMF5Q],
    },
    {
      id: "claim-spanish-first",
      kind: "pattern",
      text: "He reached the top of the U.S. industry without switching to English: the first all-Spanish Billboard 200 No. 1, a Spanish-language Coachella headline set, and a primarily-Spanish Super Bowl halftime — the crossover assumption ran in reverse.",
      sourceIds: [S.billboardEUTDM, S.billboardCoachella, S.forbesHalftime],
    },
    {
      id: "claim-pr-politics",
      kind: "pattern",
      text: "Political statements about Puerto Rico recur across his career: pausing a tour for the 2019 Ricky Renuncia marches and 'Afilando los Cuchillos,' the Alexa Negrón Luciano tribute on Fallon, the 'Aquí Vive Gente' documentary on displacement, blasting ICE raids in Puerto Rico on Instagram, skipping mainland tour dates, and reposting Harris's island plan after the MSG 'garbage' joke.",
      sourceIds: [S.rsProtest, S.cbsAlexa, S.rsApagon, S.guardianICE, S.cnnHarris],
    },
    {
      id: "claim-gender-fluid",
      kind: "pattern",
      text: "He consistently presents a gender-fluid style — painted nails, skirts, full drag in 'Yo Perreo Sola,' the skirt-and-shirt Alexa tribute — that pushes against the macho conventions of the Latin urban genre he leads.",
      sourceIds: [S.rsDrag, S.cbsAlexa, S.rsCaptivity],
    },
    {
      id: "claim-press-averse",
      kind: "pattern",
      text: "He is press-averse and grants few interviews; the ones he does give are tightly framed cover stories, and coverage routinely describes him as furtive — hood drawn, facing elevator walls — even while promoting major releases.",
      sourceIds: [S.vfCover, S.billboardDtMFNo1],
    },
    {
      id: "claim-every-stage",
      kind: "pattern",
      text: "He treats non-music stages as performances rather than cameos: full matches at WrestleMania 37 and Backlash 2023, hosting and performing on SNL the same week Nadie Sabe topped the chart, and feature-film roles across action and indie titles.",
      sourceIds: [S.wweWM37, S.wweBacklash, S.billboardNadie, S.wikipedia],
    },
    {
      id: "claim-retirement-motif",
      kind: "speculation",
      text: "Retirement talk functions more like a motif than a plan: the 'retirement album' conceit arrived a decade early, he declared 2023 a 'year of rest' then released Nadie Sabe weeks later — no actual withdrawal has followed.",
      sourceIds: [S.appleEUTDM, S.rsEUTDMInt, S.vfCover, S.billboardNadie],
    },
    {
      id: "claim-residency-strategy",
      kind: "speculation",
      text: "Coverage and economists frame the residency as a deliberate economic intervention — residents-first ticketing and routing tourist dollars to the island — while he himself framed it simply as wanting to stay home; how much was strategy versus sentiment is not settled in the record.",
      sourceIds: [S.rsImpact, S.billboardResidency, S.idCover],
    },
    {
      id: "claim-superbowl-calculus",
      kind: "speculation",
      text: "Pairing a mainland-U.S.-free tour with a Super Bowl headline slot suggests a strategy of engaging the biggest U.S. stage on his own terms — in Spanish, on Puerto Rican themes — rather than avoiding the country; he has not stated a unified rationale, so this remains an interpretation of the coverage.",
      sourceIds: [S.guardianICE, S.nflAnnounce, S.forbesHalftime],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1994-03-10",
      title: "Born in Bayamón, Puerto Rico",
      summary:
        "Benito Antonio Martínez Ocasio; raised in the Almirante Sur barrio of Vega Baja.",
      location: "Bayamón, Puerto Rico",
      sourceIds: [S.wikipedia, S.britannica, S.wikidata],
    },
    {
      id: "event-diles",
      kind: "publication",
      date: "2016-01-25",
      title: "Uploads 'Diles' to SoundCloud",
      summary:
        "Released independently while working as a bagger at an Econo supermarket and studying at UPR Arecibo.",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "event-hear-this-music",
      kind: "milestone",
      date: "2016",
      title: "Signs to Hear This Music",
      summary:
        "DJ Luian signed him after 'Diles' took off; the August remix stacked Ozuna, Farruko, Arcángel, and Ñengo Flow behind the newcomer.",
      organization: "Hear This Music",
      organizationHandle: "hear-this-music",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "event-i-like-it",
      kind: "milestone",
      date: "2018-07-07",
      title: "First Billboard Hot 100 No. 1: 'I Like It'",
      summary:
        "Cardi B's 'I Like It' with Bad Bunny and J Balvin tops the chart dated July 7, 2018.",
      sourceIds: [S.billboardILikeIt],
    },
    {
      id: "event-x100pre",
      kind: "publication",
      date: "2018-12-24",
      title: "X 100pre",
      summary:
        "Debut studio album surprise-released on Christmas Eve on Rimas Entertainment.",
      sourceIds: [S.nprX100pre, S.billboardX100pre],
    },
    {
      id: "event-oasis",
      kind: "publication",
      date: "2019-06-28",
      title: "Oasis (with J Balvin)",
      summary:
        "Eight-song collaborative album released overnight with little warning.",
      sourceIds: [S.nytOasis],
    },
    {
      id: "event-afilando",
      kind: "other",
      date: "2019-07-17",
      title: "Joins the Ricky Renuncia protests; releases 'Afilando los Cuchillos'",
      summary:
        "Paused a European tour to march in San Juan demanding Governor Ricardo Rosselló's resignation; the one-day protest recording with Residente and iLe landed mid-movement. Rosselló announced his resignation July 24.",
      location: "San Juan, Puerto Rico",
      sourceIds: [S.rsProtest, S.nytProtest, S.nprAfilando],
    },
    {
      id: "event-sb-liv",
      kind: "media",
      date: "2020-02-02",
      title: "Super Bowl LIV halftime guest",
      summary:
        "Performed alongside J Balvin in the halftime show headlined by Shakira and Jennifer Lopez.",
      location: "Miami Gardens, Florida",
      sourceIds: [S.wikiSuperBowl, S.wikipedia],
    },
    {
      id: "event-fallon-alexa",
      kind: "media",
      date: "2020-02-27",
      title: "Tonight Show tribute to Alexa Negrón Luciano",
      summary:
        "Performed 'Ignorantes' with Sech in a skirt and a shirt reading 'They killed Alexa, not a man in a skirt.'",
      location: "New York",
      sourceIds: [S.cbsAlexa],
    },
    {
      id: "event-yhlqmdlg",
      kind: "publication",
      date: "2020-02-29",
      title: "YHLQMDLG",
      summary:
        "Second album, a tribute to old-school reggaetón; debuted at No. 2 on the Billboard 200, then a record for an all-Spanish set.",
      sourceIds: [S.guinness, S.billboardEUTDM],
    },
    {
      id: "event-las-que-no",
      kind: "publication",
      date: "2020-05-10",
      title: "Las Que No Iban a Salir",
      summary:
        "Compilation of unreleased tracks and album cuts released during lockdown.",
      sourceIds: [S.nprEUTDM],
    },
    {
      id: "event-eutdm",
      kind: "publication",
      date: "2020-11-27",
      title: "El Último Tour Del Mundo",
      summary:
        "Third album of 2020, a rock-tinged set conceived in quarantine and released at midnight after Thanksgiving.",
      sourceIds: [S.billboardEUTDM, S.nprEUTDM],
    },
    {
      id: "event-eutdm-no1",
      kind: "milestone",
      date: "2020-12-12",
      title: "First all-Spanish No. 1 on the Billboard 200",
      summary:
        "El Último Tour Del Mundo debuted atop the chart dated December 12 — a first in the chart's 64-year history.",
      sourceIds: [S.billboardEUTDM, S.guinness],
    },
    {
      id: "event-spotify-top",
      kind: "milestone",
      date: "2020-12",
      end: "2022-12",
      title: "Spotify's most-streamed global artist three years running",
      summary:
        "Held the platform's year-end No. 1 for 2020, 2021, and 2022 — the first three-peat in Wrapped history.",
      sourceIds: [S.spotifyWrapped],
    },
    {
      id: "event-royal-rumble",
      kind: "media",
      date: "2021-01-31",
      title: "Royal Rumble appearance ignites Miz feud",
      summary:
        "Performed 'Booker T' with Booker T himself appearing; a confrontation with The Miz and John Morrison set up the WrestleMania storyline.",
      sourceIds: [S.wweWM37],
    },
    {
      id: "event-grammy-2021",
      kind: "award",
      date: "2021-03-14",
      title: "First Grammy: YHLQMDLG",
      summary:
        "Won Best Latin Pop or Urban Album at the 63rd Grammy Awards.",
      sourceIds: [S.grammyArtist],
    },
    {
      id: "event-wm37",
      kind: "media",
      date: "2021-04-10",
      title: "WrestleMania 37 debut match",
      summary:
        "Teamed with Damian Priest to defeat The Miz and John Morrison in Tampa.",
      location: "Tampa, Florida",
      sourceIds: [S.wweWM37],
    },
    {
      id: "event-uvst",
      kind: "publication",
      date: "2022-05-06",
      title: "Un Verano Sin Ti",
      summary:
        "Fourth solo album; 13 nonconsecutive weeks at No. 1 on the Billboard 200 and the year's most-streamed album.",
      sourceIds: [S.billboardUVST, S.spotifyWrapped],
    },
    {
      id: "event-wht",
      kind: "project",
      date: "2022-08-05",
      end: "2022-12-10",
      title: "World's Hottest Tour",
      summary:
        "Stadium run across the U.S. and Latin America closing at Mexico City's Estadio Azteca; combined with the spring arena leg, his 81 shows grossed a record $435 million for the year.",
      sourceIds: [S.billboard435],
    },
    {
      id: "event-el-apagon",
      kind: "media",
      date: "2022-09-16",
      title: "'El Apagón — Aquí Vive Gente' video",
      summary:
        "The music video hands its back half to Bianca Graulau's documentary on displacement, blackouts, and gentrification in Puerto Rico.",
      sourceIds: [S.ytElApagon, S.rsApagon],
    },
    {
      id: "event-time-cover",
      kind: "media",
      date: "2023-03-28",
      title: "TIME's first all-Spanish cover",
      summary:
        "The cover story 'El Mundo de Bad Bunny' was the magazine's first with all-Spanish text.",
      sourceIds: [S.abcTime, S.timeCover],
    },
    {
      id: "event-coachella",
      kind: "milestone",
      date: "2023-04-14",
      end: "2023-04-21",
      title: "Headlines Coachella",
      summary:
        "First Latino solo artist and first primarily Spanish-language headliner in festival history; the set staged a lesson in Latin music's lineage.",
      location: "Indio, California",
      sourceIds: [S.billboardCoachella],
    },
    {
      id: "event-backlash",
      kind: "media",
      date: "2023-05-06",
      title: "Hosts and wins WWE Backlash in San Juan",
      summary:
        "Defeated Damian Priest in a San Juan Street Fight at the Coliseo de Puerto Rico — his first WWE singles victory, in front of a hometown crowd.",
      location: "San Juan, Puerto Rico",
      sourceIds: [S.wweBacklash],
    },
    {
      id: "event-nadie",
      kind: "publication",
      date: "2023-10-13",
      title: "Nadie Sabe Lo Que Va a Pasar Mañana",
      summary:
        "Fifth solo album, a return to trap, announced four days before release; debuted at No. 1 — his third consecutive topper.",
      sourceIds: [S.billboardNadie],
    },
    {
      id: "event-snl",
      kind: "media",
      date: "2023-10-21",
      title: "Hosts Saturday Night Live",
      summary:
        "Pulled double duty as host and musical guest the week Nadie Sabe debuted at No. 1.",
      location: "New York",
      sourceIds: [S.billboardNadie, S.wikipedia],
    },
    {
      id: "event-harris",
      kind: "other",
      date: "2024-10-27",
      title: "Signals support for Kamala Harris",
      summary:
        "Shared her Puerto Rico plan video to 45M+ Instagram followers hours after a comic at Trump's MSG rally called the island 'a floating island of garbage.'",
      sourceIds: [S.cnnHarris],
    },
    {
      id: "event-dtmf",
      kind: "publication",
      date: "2025-01-05",
      title: "Debí Tirar Más Fotos",
      summary:
        "Sixth solo album, his most Puerto Rican — música jíbara, plena, salsa, and diaspora longing; rose to No. 1 in its first full tracking week.",
      sourceIds: [S.apDtMFReview, S.billboardDtMF5Q, S.nytDtMF],
    },
    {
      id: "event-tinydesk",
      kind: "media",
      date: "2025-04-07",
      title: "NPR Tiny Desk concert",
      summary:
        "Performed with an all-Puerto Rican folk band; the episode became the most-watched premiere in the series' history.",
      location: "Washington, D.C.",
      sourceIds: [S.nprTinyDesk, S.ytTinyDesk],
    },
    {
      id: "event-residency",
      kind: "project",
      date: "2025-07-11",
      end: "2025-09-14",
      title: "'No Me Quiero Ir de Aquí' residency",
      summary:
        "Thirty weekend shows at the Coliseo de Puerto Rico; the first nine were reserved for island residents and the run drew roughly 600,000 attendees.",
      location: "San Juan, Puerto Rico",
      sourceIds: [S.billboardResidency, S.rsImpact, S.idCover],
    },
    {
      id: "event-sb-announce",
      kind: "milestone",
      date: "2025-09-28",
      title: "Announced as Super Bowl LX halftime headliner",
      summary:
        "NFL, Apple Music, and Roc Nation made the booking official; he dedicated it to 'my people, my culture, and our history.'",
      sourceIds: [S.nflAnnounce],
    },
    {
      id: "event-latingrammy-2025",
      kind: "award",
      date: "2025-11-13",
      title: "Latin Grammy Album of the Year",
      summary:
        "Debí Tirar Más Fotos won five Latin Grammys including the top prize; his career total reached 17.",
      location: "Las Vegas, Nevada",
      sourceIds: [S.apLatinGrammy],
    },
    {
      id: "event-grammy-aoty",
      kind: "award",
      date: "2026-02-01",
      title: "Grammy Album of the Year",
      summary:
        "Debí Tirar Más Fotos became the first all-Spanish-language album to win the Grammy's top prize; he also took Best Música Urbana Album and Best Global Music Performance.",
      location: "Los Angeles, California",
      sourceIds: [S.apGrammy, S.nprGrammy],
    },
    {
      id: "event-sb-lx",
      kind: "media",
      date: "2026-02-08",
      title: "Super Bowl LX halftime show",
      summary:
        "The first halftime set performed primarily in Spanish, with guests Lady Gaga, Ricky Martin, and Los Pleneros de la Cresta.",
      location: "Santa Clara, California",
      sourceIds: [S.forbesHalftime, S.wikiSuperBowl],
    },
  ],
  themes: [
    {
      id: "theme-boricua-identity",
      kind: "philosophy",
      status: "stated",
      title: "Puerto Rico as subject, muse, and home",
      summary:
        "From 'El Apagón' to Debí Tirar Más Fotos — plena, música jíbara, salsa, the jíbaro figure — he treats the island as both material and audience. He calls DtMF his 'most Puerto Rican' album, staged a 30-show residency so the world would come to the island, and told NPR he wants listeners to 'fall in love with Puerto Rico.'",
      sourceIds: [S.nytDtMF, S.timeDtMF, S.nprTinyDesk, S.ytElApagon, S.rsDtMFSongs],
    },
    {
      id: "theme-no-english-needed",
      kind: "belief",
      status: "stated",
      title: "Spanish is enough",
      summary:
        "He refuses to sing in English to reach an audience — 'I think in Spanish, I feel in Spanish' — and his career data supports the refusal: the first all-Spanish Billboard 200 No. 1, a Spanish Coachella headliner set, a primarily-Spanish Super Bowl. At Coachella he asked the crowd whether to speak English or 'hablando español'; they roared for Spanish.",
      sourceIds: [S.vfCover, S.billboardCoachella, S.billboardEUTDM],
    },
    {
      id: "theme-genre-hopping",
      kind: "method",
      status: "reported",
      title: "Genre as a wardrobe, not a contract",
      summary:
        "Latin trap, old-school reggaetón revivalism, alt-rock and pop-punk, dembow, bachata, house, plena, bomba, salsa, bolero — each album is framed by critics as a different mode rather than a linear evolution. DtMF folded live folkloric instrumentation into the same catalog that produced 'Safaera.'",
      sourceIds: [S.nprEUTDM, S.apDtMFReview, S.billboardDtMFNo1],
    },
    {
      id: "theme-political-voice",
      kind: "belief",
      status: "stated",
      title: "Music and platform as protest",
      summary:
        "Ricky Renuncia marches and 'Afilando los Cuchillos' (2019); the Alexa Negrón Luciano tribute (2020); the 'Aquí Vive Gente' documentary on displacement (2022); public anger at ICE operations in Puerto Rico and on the mainland (2025); reposting Harris's Puerto Rico plan after the MSG 'garbage' joke (2024). Statements cluster around Puerto Rican dignity rather than party programs.",
      sourceIds: [S.rsProtest, S.cbsAlexa, S.rsApagon, S.guardianICE, S.cnnHarris],
    },
    {
      id: "theme-diy-arc",
      kind: "practice",
      status: "reported",
      title: "SoundCloud DIY to stadium scale",
      summary:
        "The bagger-at-Econo origin is not just biography but method: he built the project on SoundCloud uploads and YouTube singles rather than label development, co-directs his own videos (with Stillz), keeps a tight collaborator circle around Rimas and manager Noah Assad, and releases albums on his own calendar.",
      sourceIds: [S.remezcla, S.rsDrag, S.billboardOral, S.nprX100pre],
    },
    {
      id: "theme-fluid-masculinity",
      kind: "practice",
      status: "stated",
      title: "Fluid masculinity inside a macho genre",
      summary:
        "Painted nails, skirts, full drag in 'Yo Perreo Sola' — a song he says he wrote from a woman's perspective — and a televised shirt honoring a murdered trans woman. He has framed the presentation as personal expression and as a message to a genre 'usually not as open' to LGBTQ+ audiences.",
      sourceIds: [S.rsDrag, S.cbsAlexa, S.rsCaptivity],
    },
    {
      id: "theme-wrestling",
      kind: "interest",
      status: "reported",
      title: "Wrestling fandom turned performance",
      summary:
        "A lifelong WWE fan, he recorded 'Booker T' with the wrestler's blessing, performed it at Royal Rumble 2021, worked a praised tag match at WrestleMania 37, and headlined Backlash 2023 in San Juan with a street fight — wrestling as another stage he actually performs on rather than watches.",
      sourceIds: [S.wweWM37, S.wweBacklash],
    },
    {
      id: "theme-privacy",
      kind: "practice",
      status: "stated",
      title: "Guarded private life",
      summary:
        "He grants few interviews, declines to confirm relationships or rumors — 'I have no commitment to clarify anything to anyone' — and coverage consistently describes a furtive, controlled public presence. The index respects that boundary: his personal life is deliberately thin in the public record and here.",
      sourceIds: [S.vfCover, S.billboardDtMFNo1],
    },
    {
      id: "theme-influences",
      kind: "influence",
      status: "stated",
      title: "Reggaeton forebears as foundation",
      summary:
        "He credits Tego Calderón, Héctor El Father, Wisin y Yandel, Arcángel, Don Omar, and Daddy Yankee as 'my foundation,' wearing their medallions for a Rolling Stone cover and staging a Latin-music history lesson inside his Coachella set.",
      sourceIds: [S.rs2023Cover, S.billboardCoachella],
    },
  ],
  works: [
    {
      id: "work-diles",
      kind: "recording",
      status: "released",
      title: "'Diles' (single)",
      date: "2016-01-25",
      summary:
        "The SoundCloud upload that started the career; an August remix with Ozuna, Farruko, Arcángel, and Ñengo Flow consolidated the signing.",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "work-x100pre",
      kind: "recording",
      status: "released",
      title: "X 100pre",
      date: "2018-12-24",
      summary:
        "Debut studio album, surprise-released on Christmas Eve; includes 'Mía' with Drake and 'Caro.'",
      sourceIds: [S.nprX100pre, S.billboardX100pre],
    },
    {
      id: "work-afilando",
      kind: "recording",
      status: "released",
      title: "'Afilando los Cuchillos' (with Residente & iLe)",
      date: "2019-07-17",
      summary:
        "Protest single written and recorded in one day during the marches demanding Governor Rosselló's resignation.",
      sourceIds: [S.nprAfilando, S.nytProtest],
    },
    {
      id: "work-oasis",
      kind: "recording",
      status: "released",
      title: "Oasis (with J Balvin)",
      date: "2019-06-28",
      summary:
        "Eight-track collaborative album released overnight; largely produced by Sky and Tainy.",
      sourceIds: [S.nytOasis],
    },
    {
      id: "work-yhlqmdlg",
      kind: "recording",
      status: "released",
      title: "YHLQMDLG",
      date: "2020-02-29",
      summary:
        "Second album ('Yo Hago Lo Que Me Da La Gana'), a tribute to the reggaetón he grew up on; debuted at No. 2 on the Billboard 200, then the all-Spanish record.",
      sourceIds: [S.guinness, S.billboardEUTDM],
    },
    {
      id: "work-las-que-no",
      kind: "recording",
      status: "released",
      title: "Las Que No Iban a Salir",
      date: "2020-05-10",
      summary: "Lockdown compilation of unreleased tracks and album cuts.",
      sourceIds: [S.nprEUTDM],
    },
    {
      id: "work-eutdm",
      kind: "recording",
      status: "released",
      title: "El Último Tour Del Mundo",
      date: "2020-11-27",
      summary:
        "Third album of 2020, framed by him as a 'retirement album' concept; first all-Spanish-language No. 1 on the Billboard 200.",
      sourceIds: [S.billboardEUTDM, S.guinness, S.appleEUTDM],
    },
    {
      id: "work-uvst",
      kind: "recording",
      status: "released",
      title: "Un Verano Sin Ti",
      date: "2022-05-06",
      summary:
        "Fourth album; 13 nonconsecutive weeks at No. 1 and the most-streamed album of 2022; first Spanish-language album nominated for the Grammy for Album of the Year.",
      sourceIds: [S.billboardUVST, S.grammyArtist],
    },
    {
      id: "work-el-apagon-doc",
      kind: "film",
      status: "released",
      title: "'El Apagón — Aquí Vive Gente' (video-documentary)",
      date: "2022-09-16",
      summary:
        "Official video whose second half is Bianca Graulau's ~18-minute documentary on displacement, blackouts, and gentrification in Puerto Rico.",
      sourceIds: [S.ytElApagon, S.rsApagon],
    },
    {
      id: "work-nadie",
      kind: "recording",
      status: "released",
      title: "Nadie Sabe Lo Que Va a Pasar Mañana",
      date: "2023-10-13",
      summary:
        "Fifth album, a return to Latin trap announced four days before release; debuted at No. 1.",
      sourceIds: [S.billboardNadie],
    },
    {
      id: "work-dtmf",
      kind: "recording",
      status: "released",
      title: "Debí Tirar Más Fotos",
      date: "2025-01-05",
      summary:
        "Sixth solo album and his most Puerto Rican — música jíbara, plena, salsa, bolero; Grammy and Latin Grammy Album of the Year winner, and the first all-Spanish Grammy AOTY.",
      sourceIds: [S.apDtMFReview, S.nytDtMF, S.apGrammy],
    },
    {
      id: "work-narcos",
      kind: "other",
      status: "released",
      title: "Narcos: Mexico (TV series)",
      date: "2021",
      summary: "Acting role in the Netflix series' third season.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-bullet-train",
      kind: "film",
      status: "released",
      title: "Bullet Train",
      date: "2022",
      summary: "Feature-film role as 'The Wolf' opposite Brad Pitt.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-cassandro",
      kind: "film",
      status: "released",
      title: "Cassandro",
      date: "2023",
      summary:
        "Role in the lucha libre biopic starring Gael García Bernal — a part that weds his film and wrestling worlds.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-el-muerto",
      kind: "film",
      status: "abandoned",
      title: "El Muerto (Sony/Marvel)",
      date: "2022",
      summary:
        "Announced at CinemaCon 2022 with him starring as the luchador antihero — billed as the first live-action Marvel project to star a Latino character; removed from Sony's calendar in June 2023 and later reported back in development without him.",
      sourceIds: [S.thrElMuerto],
    },
    {
      id: "work-happy-gilmore-2",
      kind: "film",
      status: "released",
      title: "Happy Gilmore 2",
      date: "2025",
      summary: "Role in Adam Sandler's Netflix sequel, filmed during 2024.",
      sourceIds: [S.wikipedia, S.timeDtMF],
    },
    {
      id: "work-caught-stealing",
      kind: "film",
      status: "released",
      title: "Caught Stealing",
      date: "2025",
      summary: "Role as Colorado in Darren Aronofsky's crime film.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-wht",
      kind: "project",
      status: "completed",
      title: "World's Hottest Tour",
      date: "2022",
      summary:
        "43-date stadium tour; $314.1 million and 1.9 million tickets — the biggest Latin tour in Billboard Boxscore history at the time, inside a record $435-million calendar year.",
      sourceIds: [S.billboard435],
    },
    {
      id: "work-residency",
      kind: "project",
      status: "completed",
      title: "'No Me Quiero Ir de Aquí' residency",
      date: "2025",
      location: "Coliseo de Puerto Rico José Miguel Agrelot, San Juan",
      summary:
        "Thirty weekend shows, July 11 – September 14, 2025; first nine reserved for island residents; roughly 600,000 attendees and economic-impact estimates ranging from ~$176.6M to ~$733M depending on the study.",
      sourceIds: [S.billboardResidency, S.rsImpact],
    },
    {
      id: "work-dtmf-tour",
      kind: "project",
      status: "ongoing",
      title: "Debí Tirar Más Fotos World Tour",
      date: "2025-11-21",
      summary:
        "Stadium tour across Latin America, Europe, and Australia through July 22, 2026 — deliberately excluding mainland-U.S. dates, a decision he tied partly to ICE-raid concerns.",
      sourceIds: [S.guardianICE, S.idCover],
    },
  ],
  appearances: [
    {
      id: "appearance-sb-liv",
      title: "Super Bowl LIV halftime show (guest)",
      venue: "Hard Rock Stadium / Fox",
      publishedAt: "2020-02-02",
      participants: ["Shakira", "Jennifer Lopez", "Bad Bunny", "J Balvin"],
      participantHandles: [
        { name: "Shakira", handle: "shakira" },
        { name: "Jennifer Lopez", handle: "jennifer-lopez" },
        { name: "Bad Bunny", handle: "bad-bunny" },
        { name: "J Balvin", handle: "j-balvin" },
      ],
      summary:
        "Guest performer in the halftime show headlined by Shakira and Jennifer Lopez.",
      sourceIds: [S.wikiSuperBowl, S.wikipedia],
    },
    {
      id: "appearance-fallon-alexa",
      title: "The Tonight Show Starring Jimmy Fallon",
      venue: "NBC",
      publishedAt: "2020-02-27",
      participants: ["Bad Bunny", "Sech", "Jimmy Fallon"],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
        { name: "Sech", handle: "sech" },
        { name: "Jimmy Fallon", handle: "jimmy-fallon" },
      ],
      summary:
        "Performed 'Ignorantes' wearing a skirt and a shirt honoring murdered trans woman Alexa Negrón Luciano; also announced YHLQMDLG's Leap Day release.",
      media: [
        {
          type: "article",
          url: "https://www.cbsnews.com/news/bad-bunny-transgender-woman-alexa-negron-luciano-shirt-tonight-show-starring-jimmy-fallon/",
          sourceId: S.cbsAlexa,
        },
      ],
      sourceIds: [S.cbsAlexa],
    },
    {
      id: "appearance-wm37",
      title: "WrestleMania 37 — Bad Bunny & Damian Priest vs. The Miz & John Morrison",
      venue: "WWE / Raymond James Stadium",
      publishedAt: "2021-04-10",
      participants: ["Bad Bunny", "Damian Priest", "The Miz", "John Morrison"],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
        { name: "Damian Priest", handle: "damian-priest" },
        { name: "The Miz", handle: "the-miz" },
        { name: "John Morrison", handle: "john-morrison" },
      ],
      summary:
        "His first WWE match — a tag-team win built from months of storyline beginning at Royal Rumble 2021.",
      media: [
        {
          type: "article",
          url: "https://www.wwe.com/shows/wrestlemania/wrestlemania-37/bad-bunny-damian-priest-vs-the-miz-john-morrison-results",
          sourceId: S.wweWM37,
        },
      ],
      sourceIds: [S.wweWM37],
    },
    {
      id: "appearance-coachella",
      title: "Coachella 2023 headlining sets",
      venue: "Empire Polo Club, Indio / Coachella",
      publishedAt: "2023-04-14",
      participants: [
        "Bad Bunny",
        "Jhayco",
        "Jowell & Randy",
        "Ñengo Flow",
        "Post Malone",
      ],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
        { name: "Jhayco", handle: "jhayco" },
        { name: "Ñengo Flow", handle: "nengo-flow" },
        { name: "Post Malone", handle: "post-malone" },
      ],
      summary:
        "First Latino solo headliner; a two-hour set with a staged Latin-music history lesson and Puerto Rican guests.",
      media: [
        {
          type: "article",
          url: "https://www.billboard.com/music/latin/bad-bunny-historic-headliner-coachella-2023-recap-1235303337/",
          sourceId: S.billboardCoachella,
        },
      ],
      sourceIds: [S.billboardCoachella],
    },
    {
      id: "appearance-backlash",
      title: "WWE Backlash — San Juan Street Fight",
      venue: "WWE / Coliseo de Puerto Rico",
      publishedAt: "2023-05-06",
      participants: [
        "Bad Bunny",
        "Damian Priest",
        "Rey Mysterio",
        "Carlito",
        "Savio Vega",
      ],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
        { name: "Damian Priest", handle: "damian-priest" },
        { name: "Rey Mysterio", handle: "rey-mysterio" },
        { name: "Carlito", handle: "carlito" },
        { name: "Savio Vega", handle: "savio-vega" },
      ],
      summary:
        "Hosted the premium live event in San Juan and beat Priest in a street fight — his first WWE singles win.",
      media: [
        {
          type: "article",
          url: "https://www.wwe.com/shows/backlash/2023/bad-bunny-vs-damian-priest-results",
          sourceId: S.wweBacklash,
        },
      ],
      sourceIds: [S.wweBacklash],
    },
    {
      id: "appearance-snl",
      title: "Saturday Night Live (host and musical guest)",
      venue: "NBC",
      publishedAt: "2023-10-21",
      participants: ["Bad Bunny"],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
      ],
      summary:
        "Hosted and performed the week Nadie Sabe Lo Que Va a Pasar Mañana debuted at No. 1.",
      sourceIds: [S.billboardNadie, S.wikipedia],
    },
    {
      id: "appearance-metgala",
      title: "2024 Met Gala (co-chair)",
      venue: "The Metropolitan Museum of Art",
      publishedAt: "2024-05-06",
      participants: ["Bad Bunny", "Jennifer Lopez", "Zendaya", "Chris Hemsworth"],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
        { name: "Jennifer Lopez", handle: "jennifer-lopez" },
        { name: "Zendaya", handle: "zendaya" },
        { name: "Chris Hemsworth", handle: "chris-hemsworth" },
      ],
      summary:
        "Co-chaired the 'Sleeping Beauties: Reawakening Fashion' gala during his busiest non-music year.",
      sourceIds: [S.timeDtMF],
    },
    {
      id: "appearance-tinydesk",
      title: "NPR Tiny Desk concert",
      venue: "NPR headquarters, Washington, D.C.",
      publishedAt: "2025-04-07",
      participants: ["Bad Bunny", "LoS SOBRiNOS"],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
      ],
      summary:
        "A ~35-minute set of DtMF songs reworked for cuatro, congas, and plena drums; the series' most-watched premiere.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=ouuPSxE1hK4",
          sourceId: S.ytTinyDesk,
        },
      ],
      sourceIds: [S.ytTinyDesk, S.nprTinyDesk],
    },
    {
      id: "appearance-latingrammys",
      title: "2025 Latin Grammy Awards",
      venue: "MGM Grand Garden Arena, Las Vegas",
      publishedAt: "2025-11-13",
      participants: ["Bad Bunny", "Chuwi"],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
      ],
      summary:
        "Performed 'WELTiTA' with Chuwi and accepted Album of the Year for Debí Tirar Más Fotos, closing a five-win night.",
      sourceIds: [S.apLatinGrammy],
    },
    {
      id: "appearance-sb-lx",
      title: "Super Bowl LX halftime show (headliner)",
      venue: "Levi's Stadium / NBC / Apple Music",
      publishedAt: "2026-02-08",
      participants: [
        "Bad Bunny",
        "Lady Gaga",
        "Ricky Martin",
        "Los Pleneros de la Cresta",
      ],
      participantHandles: [
        { name: "Bad Bunny", handle: "bad-bunny" },
        { name: "Lady Gaga", handle: "lady-gaga" },
        { name: "Ricky Martin", handle: "ricky-martin" },
      ],
      summary:
        "The first halftime set performed primarily in Spanish; closed with 'The only thing stronger than hate is love.'",
      media: [
        {
          type: "article",
          url: "https://www.forbes.com/sites/hannahabraham/2026/02/08/every-song-at-bad-bunnys-nfl-super-bowl-2026-halftime-show/",
          sourceId: S.forbesHalftime,
        },
      ],
      sourceIds: [S.forbesHalftime, S.wikiSuperBowl],
    },
  ],
  relations: [
    {
      id: "rel-hear-this-music",
      kind: "signed_to",
      target: "hear-this-music",
      targetName: "Hear This Music",
      targetKind: "organization",
      note:
        "His first label — DJ Luian signed him in 2016 after 'Diles' took off on SoundCloud.",
      start: "2016",
      targetWikidataId: "Q50377916",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "rel-rimas-entertainment",
      kind: "signed_to",
      target: "rimas-entertainment",
      targetName: "Rimas Entertainment",
      targetKind: "organization",
      note:
        "The independent Puerto Rican label he has released through since X 100pre — built around his career after Hear This Music.",
      start: "2018",
      targetWikidataId: "Q79060122",
      sourceIds: [S.billboardOral, S.wikipedia, S.billboardX100pre],
    },
    {
      id: "rel-dj-luian",
      kind: "collaborated",
      target: "dj-luian",
      targetName: "DJ Luian",
      note:
        "The producer who discovered 'Diles' on SoundCloud and signed him to Hear This Music in 2016.",
      targetWikidataId: "Q51901916",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "rel-noah-assad",
      kind: "managed_by",
      target: "noah-assad",
      targetName: "Noah Assad",
      note: "His manager; the Rimas Entertainment co-founder the label was built around.",
      targetWikidataId: "Q79059375",
      sourceIds: [S.billboardOral, S.wikipedia],
    },
    {
      id: "rel-j-balvin",
      kind: "collaborated",
      target: "j-balvin",
      targetName: "J Balvin",
      note:
        "Co-released the eight-song collaborative album Oasis (June 2019); also shared Cardi B's 'I Like It' and the Super Bowl LIV halftime stage.",
      targetWikidataId: "Q966845",
      sourceIds: [S.nytOasis, S.billboardILikeIt, S.wikiSuperBowl],
    },
    {
      id: "rel-cardi-b",
      kind: "collaborated",
      target: "cardi-b",
      targetName: "Cardi B",
      note:
        "He and J Balvin featured on her 'I Like It,' his first Billboard Hot 100 No. 1 (July 2018).",
      targetWikidataId: "Q29033668",
      sourceIds: [S.billboardILikeIt],
    },
    {
      id: "rel-residente",
      kind: "collaborated",
      target: "residente",
      targetName: "Residente",
      note:
        "With iLe, the three wrote and recorded the July 2019 protest song 'Afilando los Cuchillos' in one day during the Rosselló protests.",
      targetWikidataId: "Q2062208",
      sourceIds: [S.nprAfilando, S.rsProtest, S.nytProtest],
    },
    {
      id: "rel-ile",
      kind: "collaborated",
      target: "ile",
      targetName: "iLe",
      note:
        "With Residente, the three wrote and recorded the July 2019 protest song 'Afilando los Cuchillos' in one day.",
      targetWikidataId: "Q6055355",
      sourceIds: [S.nprAfilando],
    },
    {
      id: "rel-sech",
      kind: "collaborated",
      target: "sech",
      targetName: "Sech",
      note:
        "Performed 'Ignorantes' with him on the February 27, 2020 Tonight Show — the set honoring Alexa Negrón Luciano.",
      targetWikidataId: "Q63285288",
      sourceIds: [S.cbsAlexa],
    },
    {
      id: "rel-ozuna",
      kind: "collaborated",
      target: "ozuna",
      targetName: "Ozuna",
      note: "On the August 2016 all-star remix of 'Diles.'",
      targetWikidataId: "Q28739901",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "rel-farruko",
      kind: "collaborated",
      target: "farruko",
      targetName: "Farruko",
      note: "On the August 2016 all-star remix of 'Diles.'",
      targetWikidataId: "Q5436372",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "rel-arcangel",
      kind: "collaborated",
      target: "arcangel",
      targetName: "Arcángel",
      note: "On the August 2016 all-star remix of 'Diles.'",
      targetWikidataId: "Q638331",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "rel-nengo-flow",
      kind: "collaborated",
      target: "nengo-flow",
      targetName: "Ñengo Flow",
      note: "On the August 2016 all-star remix of 'Diles.'",
      targetWikidataId: "Q16221464",
      sourceIds: [S.remezcla, S.wikipedia],
    },
    {
      id: "rel-damian-priest",
      kind: "collaborated",
      target: "damian-priest",
      targetName: "Damian Priest",
      note:
        "His WrestleMania 37 tag-team partner (April 2021) and later his San Juan Street Fight opponent at WWE Backlash (May 2023).",
      targetWikidataId: "Q28963127",
      sourceIds: [S.wweWM37, S.wweBacklash],
    },
    {
      id: "rel-bianca-graulau",
      kind: "collaborated",
      target: "bianca-graulau",
      targetName: "Bianca Graulau",
      note:
        "Her roughly 18-minute documentary 'Aquí Vive Gente' — on blackouts and displacement in Puerto Rico — is embedded in his September 2022 'El Apagón' video.",
      sourceIds: [S.ytElApagon, S.rsApagon],
    },
    {
      id: "rel-shakira",
      kind: "collaborated",
      target: "shakira",
      targetName: "Shakira",
      note:
        "He was a guest at the Super Bowl LIV halftime show she co-headlined, February 2020.",
      targetWikidataId: "Q34424",
      sourceIds: [S.wikiSuperBowl, S.wikipedia],
    },
    {
      id: "rel-jennifer-lopez",
      kind: "collaborated",
      target: "jennifer-lopez",
      targetName: "Jennifer Lopez",
      note:
        "He was a guest at the Super Bowl LIV halftime show she co-headlined, February 2020.",
      targetWikidataId: "Q40715",
      sourceIds: [S.wikiSuperBowl, S.wikipedia],
    },
    {
      id: "rel-lady-gaga",
      kind: "collaborated",
      target: "lady-gaga",
      targetName: "Lady Gaga",
      note:
        "Guest in his Super Bowl LX halftime set — the first performed primarily in Spanish — February 2026.",
      targetWikidataId: "Q19848",
      sourceIds: [S.forbesHalftime, S.wikiSuperBowl],
    },
    {
      id: "rel-ricky-martin",
      kind: "collaborated",
      target: "ricky-martin",
      targetName: "Ricky Martin",
      note:
        "Guest in his Super Bowl LX halftime set — the first performed primarily in Spanish — February 2026.",
      targetWikidataId: "Q128799",
      sourceIds: [S.forbesHalftime, S.wikiSuperBowl],
    },
    {
      id: "rel-los-pleneros-de-la-cresta",
      kind: "collaborated",
      target: "los-pleneros-de-la-cresta",
      targetName: "Los Pleneros de la Cresta",
      targetKind: "organization",
      note:
        "The Puerto Rican plena group joined his Super Bowl LX halftime set, February 2026.",
      sourceIds: [S.forbesHalftime, S.wikiSuperBowl],
    },
    {
      id: "rel-jhayco",
      kind: "collaborated",
      target: "jhayco",
      targetName: "Jhayco",
      note:
        "Guest in his history-making Coachella 2023 headlining set — the first by a Latino solo artist.",
      targetWikidataId: "Q75997191",
      sourceIds: [S.billboardCoachella],
    },
    {
      id: "rel-jowell-randy",
      kind: "collaborated",
      target: "jowell-randy",
      targetName: "Jowell & Randy",
      targetKind: "organization",
      note:
        "The Puerto Rican duo were guests in his Coachella 2023 headlining set.",
      targetWikidataId: "Q1543804",
      sourceIds: [S.billboardCoachella],
    },
    {
      id: "rel-post-malone",
      kind: "collaborated",
      target: "post-malone",
      targetName: "Post Malone",
      note: "Guest in his Coachella 2023 headlining set.",
      targetWikidataId: "Q21621919",
      sourceIds: [S.billboardCoachella],
    },
    {
      id: "rel-the-miz",
      kind: "collaborated",
      target: "the-miz",
      targetName: "The Miz",
      note:
        "His WrestleMania 37 tag-match opponent — he and Damian Priest beat The Miz and John Morrison, April 2021.",
      targetWikidataId: "Q44379",
      sourceIds: [S.wweWM37],
    },
    {
      id: "rel-john-morrison",
      kind: "collaborated",
      target: "john-morrison",
      targetName: "John Morrison",
      note:
        "His WrestleMania 37 tag-match opponent — he and Damian Priest beat The Miz and John Morrison, April 2021.",
      targetWikidataId: "Q259180",
      sourceIds: [S.wweWM37],
    },
    {
      id: "rel-rey-mysterio",
      kind: "collaborated",
      target: "rey-mysterio",
      targetName: "Rey Mysterio",
      note:
        "Participant in his WWE Backlash San Juan street fight event, May 2023.",
      targetWikidataId: "Q44152",
      sourceIds: [S.wweBacklash],
    },
    {
      id: "rel-carlito",
      kind: "collaborated",
      target: "carlito",
      targetName: "Carlito",
      note:
        "Participant in his WWE Backlash San Juan street fight event, May 2023.",
      targetWikidataId: "Q296511",
      sourceIds: [S.wweBacklash],
    },
    {
      id: "rel-savio-vega",
      kind: "collaborated",
      target: "savio-vega",
      targetName: "Savio Vega",
      note:
        "Participant in his WWE Backlash San Juan street fight event, May 2023.",
      targetWikidataId: "Q3137201",
      sourceIds: [S.wweBacklash],
    },
  ],
  openQuestions: [
    "Birthplace is not fully consistent across the record: the Library of Congress authority file says San Juan while most profiles say Bayamón; his Vega Baja upbringing is consistent everywhere.",
    "The residency's show count is reported as 30 by Billboard, i-D, and NBC, but Rolling Stone's economic-impact piece calls it a 31-show run; attendance estimates also range roughly 500,000-600,000.",
    "Economic-impact estimates for the residency diverge by an order of methodology — about $176.6M (UPR study floor), ~$200M (Discover Puerto Rico tourist spending), ~$733M (Gaither International including exposure value).",
    "Retirement is a recurring motif he has never executed: the 'retirement album' conceit, the 2032 framing, and a declared 'year of rest' in 2023 all preceded more releases. Whether a real horizon exists is unresolved.",
    "His personal life is deliberately thin in the record — he declines to confirm relationships (e.g., the Kendall Jenner coverage) — so this index does not attempt a dating or family record.",
    "El Muerto was removed from Sony's calendar in 2023 and later reported back in development without him; whether he retains any attachment or cameo is unclear.",
    "Whether the Debí Tirar Más Fotos World Tour or a successor will add mainland-U.S. dates after the Super Bowl and the ICE context remains open as of this index.",
  ],
  body: `Benito Antonio Martínez Ocasio — Bad Bunny — is the Puerto Rican artist who spent the decade from 2016 to 2026 turning a SoundCloud page into the top of the global music industry without leaving Spanish behind. He was Spotify's most-streamed artist on Earth three years running (2020-2022), the first act to top the Billboard 200 with an all-Spanish-language album, the first Latino solo headliner at Coachella, and, in February 2026, the winner of the first all-Spanish Grammy Album of the Year followed six days later by the first primarily-Spanish Super Bowl halftime show.

## Origin and rise

Born March 10, 1994 in Bayamón and raised in the Almirante Sur barrio of Vega Baja — a truck driver's son, a schoolteacher's son — he studied audiovisual communications at the University of Puerto Rico at Arecibo while bagging groceries at an Econo supermarket and uploading tracks to SoundCloud. "Diles," posted in January 2016, reached DJ Luian, who signed him to Hear This Music and stacked the remix with Ozuna, Farruko, Arcángel, and Ñengo Flow. Guided by manager Noah Assad and the Rimas Entertainment label built around him, he stacked features and singles until Cardi B's "I Like It" with J Balvin gave him his first Hot 100 No. 1 in July 2018. His debut album *X 100pre* arrived with hours of warning on Christmas Eve 2018 — a release pattern he never abandoned.

## The work

The catalog is deliberately discontinuous: *X 100pre* (2018), the J Balvin collaboration *Oasis* (2019), the old-school reggaetón tribute *YHLQMDLG* and the lockdown compilation *Las Que No Iban a Salir* (2020), then *El Último Tour Del Mundo* (2020) — framed by him as a "retirement album" meant for 2032 — which became the first all-Spanish No. 1 in the Billboard 200's 64-year history. *Un Verano Sin Ti* (2022) spent 13 nonconsecutive weeks at No. 1 and powered a record $435-million touring year. *Nadie Sabe Lo Que Va a Pasar Mañana* (2023) returned to trap; *Debí Tirar Más Fotos* (January 5, 2025) dove deepest into Puerto Rican tradition — plena, música jíbara, salsa, an El Gran Combo sample — and became his fourth consecutive No. 1.

## The politics

His interventions are consistent and island-centered. In July 2019 he paused a European tour to join the Ricky Renuncia marches in San Juan and cut "Afilando los Cuchillos" with Residente and iLe in a single day; Governor Rosselló resigned within the week. In 2020 he used a Tonight Show performance to honor murdered trans woman Alexa Negrón Luciano — "They killed Alexa, not a man in a skirt." In 2022 the "El Apagón" video ceded its second half to Bianca Graulau's documentary *Aquí Vive Gente* on displacement, blackouts, and gentrification. In 2024 he reposted Kamala Harris's Puerto Rico plan hours after a comic at Trump's MSG rally called the island "a floating island of garbage." In 2025 he told i-D that ICE-raid fears factored into excluding mainland-U.S. dates from his world tour — and then accepted the Super Bowl, the biggest U.S. stage of all.

## Beyond music

A lifelong wrestling fan, he worked real WWE matches — a praised tag win at WrestleMania 37 (2021) and a San Juan Street Fight victory over Damian Priest at Backlash 2023, which he also hosted. On screen: *Narcos: Mexico*, *Bullet Train*, *Cassandro*, *Happy Gilmore 2*, *Caught Stealing*; he hosted SNL in October 2023. The announced Marvel vehicle *El Muerto* left Sony's calendar in 2023 and reportedly continued without him.

## Home, staged

The "No Me Quiero Ir de Aquí" residency (July-September 2025) held thirty weekend shows at the Coliseo de Puerto Rico, the first nine reserved for residents, drawing roughly 600,000 attendees and economic-impact estimates ranging from $176.6 million to $733 million depending on the study. He capped the run with a primarily-Spanish Super Bowl LX halftime — Lady Gaga, Ricky Martin, and Los Pleneros de la Cresta as guests — whose only English words were "God bless America" before he named the nations of the Americas, closing on "The only thing stronger than hate is love."

## What the record does not settle

The retirement talk is a motif, not a plan — he keeps announcing endings and continuing. The private life is deliberately guarded ("I have no commitment to clarify anything to anyone"), and this index keeps it thin by design. Even the residency's basic numbers — show count, attendance, economic impact — vary by source. The seams are preserved rather than smoothed.

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
