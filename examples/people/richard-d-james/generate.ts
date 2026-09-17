#!/usr/bin/env bun
/** Generate examples/people/richard-d-james/person-index.json with derived source ids. */

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

// --- Reference and archive material ----------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Aphex Twin (Q223161)",
  url: "https://www.wikidata.org/wiki/Q223161",
  publisher: "Wikidata",
  notes:
    "Wikidata entity for Richard D. James; catalogs the alias list (AFX, Polygon Window, Caustic Window, The Tuss, Bradley Strider, Power-Pill, and more).",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Aphex Twin",
  url: "https://en.wikipedia.org/wiki/Aphex_Twin",
  publisher: "Wikipedia",
  notes:
    "Reference for discography and biography; details that trace back to his own interview claims are marked where used.",
});
const sawWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Selected Ambient Works 85–92",
  url: "https://en.wikipedia.org/wiki/Selected_Ambient_Works_85%E2%80%9392",
  publisher: "Wikipedia",
  notes:
    "Release data for the 1992 debut; the title's 1985 dating is itself part of the self-mythology.",
});
const rephlexWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Rephlex Records",
  url: "https://en.wikipedia.org/wiki/Rephlex_Records",
  publisher: "Wikipedia",
  notes:
    "Label founded by James and Grant Wilson-Claridge in Cornwall in 1991; coined 'braindance'; closed 2014.",
});
const rushupWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Rushup Edge (album)",
  url: "https://en.wikipedia.org/wiki/Rushup_Edge_(album)",
  publisher: "Wikipedia",
  notes:
    "The Tuss LP; documents the invented Tregaskin credits and the 2017 webstore reissue that confirmed James's authorship.",
});
const windowlickerWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Windowlicker",
  url: "https://en.wikipedia.org/wiki/Windowlicker",
  publisher: "Wikipedia",
  notes:
    "Release date, Chris Cunningham video, and the Brit Award nomination for Best British Video.",
});
const rubberJohnnyWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Rubber Johnny",
  url: "https://en.wikipedia.org/wiki/Rubber_Johnny",
  publisher: "Wikipedia",
  notes: "Chris Cunningham short film scored with James's music, released on DVD by Warp in 2005.",
});
const discogsBarca = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Aphex Twin — Barcelona 16.06.2023",
  url: "https://www.discogs.com/release/27506649-Aphex-Twin-Barcelona-16062023",
  publisher: "Discogs",
  notes:
    "Documents the limited 10-inch sold via reservation cards at the Sónar 2023 show and the later webstore sale.",
});
const archiveDump = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Aphex Twin 'user48736353001' early AFX tracks — Internet Archive",
  url: "https://archive.org/details/aphex_twin_user48736353001_afx",
  publisher: "Internet Archive",
  publishedAt: "2015",
  notes:
    "Fan-compiled preservation of the 112 previously unreleased tracks uploaded to SoundCloud January 25–31, 2015.",
});
const lannerSonic = source({
  binding: "archive",
  mediaType: "transcript",
  title: "Aphex Twin, Sonic Press (1996) — Lanner Chronicle",
  url: "https://lannerchronicle.wordpress.com/2022/04/10/aphex-twin-sonic-press-1996/",
  publisher: "Lanner Chronicle",
  publishedAt: "1996",
  notes:
    "Fan-run interview archive's reprint of a 1996 Sonic Press interview: contains his dead-brother naming account and the insistence 'I never say things that aren't true.'",
});

// --- Subject-controlled and primary records ---------------------------------

const soundcloud = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "user18081971 on SoundCloud",
  url: "https://soundcloud.com/user18081971",
  publisher: "SoundCloud",
  notes:
    "The subject's long-running dump account; the handle encodes his birthdate (18-08-1971).",
});
const afxBlackbox = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Blackbox Life Recorder 21f / in a room7 F760 — Aphex Twin webstore",
  url: "https://aphextwin.warp.net/release/399837-aphex-twin-blackbox-life-recorder-21f-in-a-room7-f760",
  publisher: "aphextwin.warp.net",
  publishedAt: "2023-07-28",
  notes: "Official webstore release page, catalogue WAP480.",
});
const afxBarca = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Barcelona 16.06.23 — Aphex Twin webstore",
  url: "https://aphextwin.warp.net/release/485925-aphex-twin-barcelona-160623",
  publisher: "aphextwin.warp.net",
  publishedAt: "2024-12-18",
  notes:
    "Official webstore page for the digital release of the Sónar 2023 show EP (WAP483); the page also lists London 19.08.2023 (WAP482).",
});
const afxMerchDesk = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Music From The Merch Desk (2016 - 2023) — Aphex Twin webstore",
  url: "https://aphextwin.warp.net/release/485875-aphex-twin-music-from-the-merch-desk-2016-2023",
  publisher: "aphextwin.warp.net",
  publishedAt: "2024-12-17",
  notes: "Compilation of tracks previously sold only on vinyl at his shows; released without announcement.",
});
const ytComeToDaddy = source({
  binding: "subject_controlled",
  mediaType: "video",
  title: "Aphex Twin — Come To Daddy (Director's Cut)",
  url: "https://www.youtube.com/watch?v=TZ827lkktYs",
  publisher: "Aphex Twin (official YouTube)",
  notes: "Official channel upload of the Chris Cunningham-directed video.",
});
const ytWindowlicker = source({
  binding: "subject_controlled",
  mediaType: "video",
  title: "Aphex Twin — Windowlicker (official video)",
  url: "https://www.youtube.com/watch?v=UBS4Gi1y_nc",
  publisher: "Aphex Twin (official YouTube)",
  notes: "Official channel upload of the Chris Cunningham-directed video.",
});
const warpSAW2 = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Selected Ambient Works Volume II (Expanded Edition) — WARP",
  url: "https://warp.net/releases/460396-selected-ambient-works-volume-ii-expanded-edition",
  publisher: "Warp Records",
  publishedAt: "2024-10-04",
  notes: "Label catalog page for the 30th-anniversary expanded reissue.",
});
const warpCheetah = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Cheetah EP — WARP",
  url: "https://warp.net/releases/74048-cheetah-ep",
  publisher: "Warp Records",
  publishedAt: "2016-07-08",
  notes:
    "Label release page carrying James-authored 'production information' copy styled as a synthesizer owner's manual.",
});
const kickstarter = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "CAT023 Caustic Window — Own The Legendary Record by RDJ! — Kickstarter",
  url: "https://www.kickstarter.com/projects/watmmofficial/cat023-caustic-window-own-the-legendary-record-by",
  publisher: "Kickstarter / WATMM",
  publishedAt: "2014",
  notes:
    "Crowdfunding record: 4,124 backers pledged $67,424; Rephlex and James granted one-time digital distribution rights.",
});
const grammy = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Aphex Twin — Grammy Awards artist page",
  url: "https://www.grammy.com/artists/aphex-twin/18287/",
  publisher: "Recording Academy",
  notes:
    "Official record: Syro won Best Dance/Electronic Album at the 57th Grammys; 'Blackbox Life Recorder 21f' was nominated in 2024.",
});

// --- Interviews -------------------------------------------------------------

const pitchforkCover = source({
  binding: "interview",
  mediaType: "article",
  title: "Strange Visitor: A Conversation With Aphex Twin",
  url: "https://pitchfork.com/features/cover-story/9506-strange-visitor-a-conversation-with-aphex-twin/",
  publisher: "Pitchfork",
  publishedAt: "2014-09-18",
  authors: ["Philip Sherburne"],
  notes:
    "Rare in-person cover-story interview, conducted in a Charing Cross hotel the day after Warp set Syro's release date.",
});
const pitchforkKanye = source({
  binding: "interview",
  mediaType: "article",
  title: "Aphex Twin Speaks on His New Album, Being Sampled by Kanye, More",
  url: "https://pitchfork.com/news/56459-aphex-twin-speaks-on-his-new-album-being-sampled-by-kanye-more/",
  publisher: "Pitchfork",
  publishedAt: "2014-08-25",
  authors: ["Philip Sherburne"],
  notes: "Advance excerpts of the cover-story conversation, including the 'Blame Game' sampling account.",
});
const guardianTankBoy = source({
  binding: "interview",
  mediaType: "article",
  title: "Tank boy",
  url: "https://www.theguardian.com/culture/2001/oct/05/artsfeatures3",
  publisher: "The Guardian",
  publishedAt: "2001-10-05",
  notes:
    "Drukqs-era face-to-face interview in the Elephant & Castle shopping centre; records the bank flat, the tank, and the submarine claim.",
});
const indexMag = source({
  binding: "interview",
  mediaType: "article",
  title: "Aphex Twin — Index Magazine",
  url: "https://www.indexmagazine.com/interviews-aphex-twin",
  publisher: "Index Magazine",
  publishedAt: "2001",
  authors: ["Meredith Danluck"],
  notes:
    "Taped at his London home on January 14, 2001, with photographs by Wolfgang Tillmans; the bio block repeats the dead-brother naming story.",
});
const noyzelab = source({
  binding: "interview",
  mediaType: "article",
  title: "Aphex Twin SYROBONKERS! Interview Part 1 — Noyzelab",
  url: "https://web.archive.org/web/20141103131334/http://noyzelab.blogspot.co.uk/2014/11/syrobonkers-part1.html",
  publisher: "Noyzelab (via Internet Archive)",
  publishedAt: "2014-11",
  authors: ["Dave Noyze"],
  notes:
    "Archived copy of the months-long 'Syrobonkers' email interview conducted by a friend; the original blog is offline.",
});
const clash = source({
  binding: "interview",
  mediaType: "article",
  title: "Aphex Twin Interview — Clash",
  url: "https://www.clashmusic.com/features/aphex-twin-interview/",
  publisher: "Clash",
  publishedAt: "2006-05-01",
  notes:
    "Email interview around the Analord CD compendium; the preamble describes his one-shot, no-follow-ups interview rule.",
});

// --- Reporting --------------------------------------------------------------

const spinGroove = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin Answers Interview Questions From Skrillex, Apparat, Caribou, and More",
  url: "https://www.spin.com/2014/12/aphex-twin-interview-groove-magazine/",
  publisher: "SPIN",
  publishedAt: "2014-12",
  notes:
    "Covers the Groove magazine 25th-anniversary Q&A, in which fellow artists posed the questions; includes the tank-at-sister's-house confirmation.",
});
const pitchforkSyroNews = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin Announces New Album SYRO Via the Deep Web",
  url: "https://pitchfork.com/news/56341-aphex-twin-announces-new-album-syro-via-the-deep-web/",
  publisher: "Pitchfork",
  publishedAt: "2014-08-18",
  authors: ["Evan Minsker"],
});
const guardianGrammy = source({
  binding: "reporting",
  mediaType: "article",
  title: "Grammys 2015: Syro by Aphex Twin wins dance/electronic album of the year",
  url: "https://www.theguardian.com/music/2015/feb/08/grammys-2105-syro-by-aphex-twin-wins-danceelectronic-album-of-the-year",
  publisher: "The Guardian",
  publishedAt: "2015-02-08",
});
const factCaustic = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin's unreleased Caustic Window album surfaces on Discogs",
  url: "https://www.factmag.com/2014/04/08/an-alleged-test-pressing-of-aphex-twins-unreleased-caustic-window-album-is-on-discogs/",
  publisher: "FACT",
  publishedAt: "2014-04-08",
  notes:
    "Breaks the test-pressing sale story; an ex-Warp/Rephlex employee tells FACT more pressings exist than the canonical four or five.",
});
const pitchforkKickstarter = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin's Unreleased Album Caustic Window Nets $67,424 on Kickstarter",
  url: "https://pitchfork.com/news/55137-aphex-twins-unreleased-album-caustic-window-nets-67424-on-kickstarter/",
  publisher: "Pitchfork",
  publishedAt: "2014",
});
const factDump = source({
  binding: "reporting",
  mediaType: "article",
  title: "You can now download all 110 tracks from Aphex Twin's Soundcloud",
  url: "https://www.factmag.com/2015/02/01/you-can-now-download-all-110-tracks-from-aphex-twins-soundcloud/",
  publisher: "FACT",
  publishedAt: "2015-02-01",
  notes:
    "Documents the dump's opening week and the fake-fan persona used in its first comment exchange with the official Aphex Twin account.",
});
const factTapes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin to upload 'loads more old tapes' to SoundCloud",
  url: "https://www.factmag.com/2015/07/22/aphex-twin-upload-loads-more-old-tapes-soundcloud/",
  publisher: "FACT",
  publishedAt: "2015-07-22",
  notes:
    "Reports his SoundCloud bio message claiming discovery of around seven more tapes with 20+ tracks each.",
});
const nialler9 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin is still uploading rare songs to a Soundcloud page",
  url: "https://nialler9.com/aphex-twin-is-still-uploading-rare-songs-to-a-soundcloud-page/",
  publisher: "Nialler9",
  publishedAt: "2015-01-27",
  notes:
    "Contemporaneous report of the first uploads; records the account's 'Simon' persona before attribution was settled.",
});
const factDFN = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin live review: A blistering return at Day For Night festival",
  url: "https://www.factmag.com/2016/12/19/aphex-twin-live-review-day-for-night-houston/",
  publisher: "FACT",
  publishedAt: "2016-12-19",
  notes: "Review of the December 17, 2016 Houston set billed as his first US performance in eight years.",
});
const consequenceCheetah = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin announces Cheetah EP, due out July 8th",
  url: "https://consequence.net/2016/06/aphex-twin-announces-cheetah-ep-due-out-july-8th/",
  publisher: "Consequence",
  publishedAt: "2016-06-09",
  authors: ["Alex Young"],
});
const consequenceCollapse = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin announces Collapse EP, unveils 'T69 Collapse'",
  url: "https://consequence.net/2018/08/aphex-twin-collapse-ep-t69/",
  publisher: "Consequence",
  publishedAt: "2018-08",
  notes:
    "Release details plus the worldwide logo sightings and the Adult Swim 'T69 Collapse' segment pulled after failing the Harding photosensitivity test.",
});
const raFunkhaus = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin at Funkhaus Berlin — Event Review",
  url: "https://ra.co/reviews/23229",
  publisher: "Resident Advisor",
  publishedAt: "2018-11-02",
  notes:
    "Review of the November 1, 2018 set — his first Berlin show in 15 years — including the live-vs-DJ billing confusion.",
});
const brooklynVegan = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin played his first NYC show since the '90s at Avant Gardner",
  url: "https://www.brooklynvegan.com/aphex-twin-played-his-first-nyc-show-since-the-90s-at-avant-gardner-pics-full-set-video/",
  publisher: "BrooklynVegan",
  publishedAt: "2019-04-12",
});
const pitchforkCoachella = source({
  binding: "reporting",
  mediaType: "article",
  title: "Watch Aphex Twin Perform at Coachella 2019",
  url: "https://pitchfork.com/news/watch-aphex-twin-perform-at-coachella-2019/",
  publisher: "Pitchfork",
  publishedAt: "2019-04",
});
const redbull = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Aphex Twin live stream — Red Bull Music Festival London, Printworks",
  url: "https://www.redbull.com/gb-en/events/red-bull-music-festival-london-aphex-twin",
  publisher: "Red Bull",
  publishedAt: "2019-09",
  notes:
    "Event page for the September 14, 2019 Printworks show: handpicked support bill and custom Weirdcore visuals.",
});
const pitchforkFieldDay = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin to Headline London's Field Day Festival",
  url: "https://pitchfork.com/news/aphex-twin-to-headline-londons-field-day-festival/",
  publisher: "Pitchfork",
  publishedAt: "2023-01-24",
  notes:
    "Confirms the August 19, 2023 headline via the 190823.co.uk teaser, and notes the 2017 Field Day set's NTS broadcast.",
});
const musictechSonar = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin to perform at Sónar's 30th-anniversary festival",
  url: "https://musictech.com/news/events/aphex-twin-sonar-festival-barcelona-lineup/",
  publisher: "MusicTech",
  publishedAt: "2023-02",
});
const crackForwards = source({
  binding: "reporting",
  mediaType: "article",
  title: "Erykah Badu and Aphex Twin announced for Forwards Festival 2023",
  url: "https://crackmagazine.net/2023/03/erykah-badu-and-aphex-twin-announced-for-forwards-festival-2023/",
  publisher: "Crack Magazine",
  publishedAt: "2023-03-21",
  notes: "Saturday headliner at The Downs, Bristol, on September 2, 2023 — his first Bristol show in years.",
});
const dazed = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin: an alternative myth vs reality list",
  url: "https://www.dazeddigital.com/music/article/60535/1/aphex-twin-myths-vs-reality-coal-mine-wendy-house-field-day-2023",
  publisher: "Dazed",
  publishedAt: "2023-08-07",
  authors: ["Brian Tregaskin"],
  notes:
    "Myth-versus-reality survey of the 1990s tall tales — published, fittingly, under a byline matching one of James's own Tuss pseudonyms.",
});
const musicradarSub = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin wanted to buy a submarine — the 1997 interview resurfaced",
  url: "https://www.musicradar.com/news/aphex-twin-wanted-to-buy-a-submarine",
  publisher: "MusicRadar",
  notes:
    "Recounts the 1997 Space Age Bachelor interview: the tank's four remaining rounds, the bank-vault reverb, and the submarine ambition.",
});
const mixmag = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin: Inside the Mythology of the MDMA Mozart",
  url: "https://mixmag.net/feature/aphex-twin-warp-30",
  publisher: "Mixmag",
  publishedAt: "2019",
  notes:
    "Retrospective on the mythology, including the May 1995 'True Lies' cover story's unresolved three-options framing.",
});
const stereogum2025 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Aphex Twin Shares Two New Tracks On SoundCloud",
  url: "https://stereogum.com/2481082/aphex-twin-shares-two-new-tracks-beach-pic-with-girlfriend/music",
  publisher: "Stereogum",
  publishedAt: "2025-11-28",
  notes:
    "Reports the November 27, 2025 upload of two 'Zahl am1' versions to user18081971 — his first unheard music in about two years.",
});

const S = {
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  sawWiki: sawWiki.id,
  rephlexWiki: rephlexWiki.id,
  rushupWiki: rushupWiki.id,
  windowlickerWiki: windowlickerWiki.id,
  rubberJohnnyWiki: rubberJohnnyWiki.id,
  discogsBarca: discogsBarca.id,
  archiveDump: archiveDump.id,
  lannerSonic: lannerSonic.id,
  soundcloud: soundcloud.id,
  afxBlackbox: afxBlackbox.id,
  afxBarca: afxBarca.id,
  afxMerchDesk: afxMerchDesk.id,
  ytComeToDaddy: ytComeToDaddy.id,
  ytWindowlicker: ytWindowlicker.id,
  warpSAW2: warpSAW2.id,
  warpCheetah: warpCheetah.id,
  kickstarter: kickstarter.id,
  grammy: grammy.id,
  pitchforkCover: pitchforkCover.id,
  pitchforkKanye: pitchforkKanye.id,
  guardianTankBoy: guardianTankBoy.id,
  indexMag: indexMag.id,
  noyzelab: noyzelab.id,
  clash: clash.id,
  spinGroove: spinGroove.id,
  pitchforkSyroNews: pitchforkSyroNews.id,
  guardianGrammy: guardianGrammy.id,
  factCaustic: factCaustic.id,
  pitchforkKickstarter: pitchforkKickstarter.id,
  factDump: factDump.id,
  factTapes: factTapes.id,
  nialler9: nialler9.id,
  factDFN: factDFN.id,
  consequenceCheetah: consequenceCheetah.id,
  consequenceCollapse: consequenceCollapse.id,
  raFunkhaus: raFunkhaus.id,
  brooklynVegan: brooklynVegan.id,
  pitchforkCoachella: pitchforkCoachella.id,
  redbull: redbull.id,
  pitchforkFieldDay: pitchforkFieldDay.id,
  musictechSonar: musictechSonar.id,
  crackForwards: crackForwards.id,
  dazed: dazed.id,
  musicradarSub: musicradarSub.id,
  mixmag: mixmag.id,
  stereogum2025: stereogum2025.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-richard-d-james",
  generatedAt: "2026-09-17T01:00:00Z",
  subject: {
    kind: "person",
    handle: "richard-d-james",
    displayName: "Richard D. James",
    alsoKnownAs: [
      "Aphex Twin",
      "AFX",
      "Caustic Window",
      "Polygon Window",
      "The Tuss",
      "Bradley Strider",
      "Power-Pill",
      "The Dice Man",
      "user18081971",
    ],
    summary:
      "British electronic musician and producer (born 1971), best known as Aphex Twin: a central figure in ambient techno and IDM, co-founder of Rephlex Records, long signed to Warp, and famous for pseudonymous aliases, stunt releases, and decades of self-mythologizing interviews.",
    identity: {
      wikidataId: "Q223161",
      officialSite: "https://aphextwin.warp.net/",
      wikipedia: "https://en.wikipedia.org/wiki/Aphex_Twin",
      profiles: [
        "https://soundcloud.com/user18081971",
        "https://x.com/AphexTwin",
        "https://aphextwin.bandcamp.com/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T00:00:00Z",
    coverage: ["biography", "work", "media", "projects", "mythology"],
  },
  sources: [
    wikidata,
    wikipedia,
    sawWiki,
    rephlexWiki,
    rushupWiki,
    windowlickerWiki,
    rubberJohnnyWiki,
    discogsBarca,
    archiveDump,
    lannerSonic,
    soundcloud,
    afxBlackbox,
    afxBarca,
    afxMerchDesk,
    ytComeToDaddy,
    ytWindowlicker,
    warpSAW2,
    warpCheetah,
    kickstarter,
    grammy,
    pitchforkCover,
    pitchforkKanye,
    guardianTankBoy,
    indexMag,
    noyzelab,
    clash,
    spinGroove,
    pitchforkSyroNews,
    guardianGrammy,
    factCaustic,
    pitchforkKickstarter,
    factDump,
    factTapes,
    nialler9,
    factDFN,
    consequenceCheetah,
    consequenceCollapse,
    raFunkhaus,
    brooklynVegan,
    pitchforkCoachella,
    redbull,
    pitchforkFieldDay,
    musictechSonar,
    crackForwards,
    dazed,
    musicradarSub,
    mixmag,
    stereogum2025,
  ],
  claims: [
    // --- fact ---------------------------------------------------------------
    {
      id: "claim-born",
      kind: "fact",
      text: "Richard David James was born on August 18, 1971, in Limerick, Ireland, and was raised in Cornwall, England.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-cornish-dj",
      kind: "fact",
      text: "As a teenager he built a cult following DJing in Cornwall — at the Shire Horse Inn in St Ives, with Tom Middleton at the Bowgie Inn in Crantock, and on Cornish beaches — playing his own tapes as much as records.",
      sourceIds: [S.sawWiki, S.rephlexWiki],
    },
    {
      id: "claim-first-release",
      kind: "fact",
      text: "His first release was the 12-inch EP Analogue Bubblebath, issued on Mighty Force in September 1991 and played on the influential London station Kiss FM.",
      sourceIds: [S.sawWiki],
    },
    {
      id: "claim-rephlex",
      kind: "fact",
      text: "In 1991 he co-founded Rephlex Records in Cornwall with Grant Wilson-Claridge, who had suggested pressing records after hearing James DJ his own tapes; the label coined the term 'braindance' and closed in 2014.",
      sourceIds: [S.rephlexWiki],
    },
    {
      id: "claim-saw1",
      kind: "fact",
      text: "Selected Ambient Works 85–92, his debut album, was released on November 9, 1992, through Apollo Records, a subsidiary of R&S; its cassette-recorded material is billed as dating back to 1985.",
      sourceIds: [S.sawWiki],
    },
    {
      id: "claim-warp-association",
      kind: "fact",
      text: "His Warp Records association began in 1993 with Surfing on Sine Waves as Polygon Window, followed by Selected Ambient Works Volume II in March 1994.",
      sourceIds: [S.wikipedia, S.warpSAW2],
    },
    {
      id: "claim-mid90s-albums",
      kind: "fact",
      text: "...I Care Because You Do (1995) and the Richard D. James Album (1996) followed on Warp, the latter folding jungle and drill-and-bass programming into his palette.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-ctd-windowlicker",
      kind: "fact",
      text: "The Come to Daddy EP (1997) and the single Windowlicker (March 22, 1999) became his best-known releases, driven by Chris Cunningham's videos; the ten-minute Windowlicker video was nominated for the Brit Award for Best British Video.",
      sourceIds: [S.windowlickerWiki, S.ytComeToDaddy, S.ytWindowlicker],
    },
    {
      id: "claim-drukqs",
      kind: "fact",
      text: "Drukqs, a 30-track double album alternating frantic drill-and-bass programming with Satie-like prepared-piano miniatures, was released on Warp in October 2001; it remained his last Aphex Twin album for thirteen years.",
      sourceIds: [S.guardianTankBoy, S.wikipedia],
    },
    {
      id: "claim-analord",
      kind: "fact",
      text: "In 2005 he released the Analord series as AFX through Rephlex — 41 tracks across 11 vinyl releases sold via the label's website, each reportedly selling well into five figures — later condensed to a CD compendium.",
      sourceIds: [S.clash],
    },
    {
      id: "claim-tuss",
      kind: "fact",
      text: "In 2007 Rephlex issued two records by 'The Tuss' — the Confederation Trough EP and the album Rushup Edge — officially credited to the invented siblings Brian and Karen Tregaskin; James's authorship was an open secret he confirmed in 2017 by reissuing Rushup Edge with bonus tracks on his own webstore.",
      sourceIds: [S.rushupWiki],
    },
    {
      id: "claim-caustic-window",
      kind: "fact",
      text: "The Caustic Window LP, aborted at test-pressing stage in 1994, finally reached listeners in 2014: a WATMM-organized Kickstarter raised $67,424 from 4,124 backers, Rephlex and James granted one-time digital distribution rights, and the physical test pressing was then sold on eBay.",
      sourceIds: [S.kickstarter, S.pitchforkKickstarter, S.factCaustic],
    },
    {
      id: "claim-syro-announce",
      kind: "fact",
      text: "Syro was announced on August 18, 2014 — his 43rd birthday — when James tweeted a Tor-only .onion link revealing the title and tracklist, days after a green blimp bearing his logo flew over London and logo stencils appeared in New York.",
      sourceIds: [S.pitchforkSyroNews],
    },
    {
      id: "claim-syro-release",
      kind: "fact",
      text: "Syro was released on Warp in September 2014, his first Aphex Twin album in thirteen years; the limited-edition box set carried a track-by-track equipment list he compiled for fans.",
      sourceIds: [S.pitchforkCover, S.wikipedia],
    },
    {
      id: "claim-grammy",
      kind: "fact",
      text: "Syro won Best Dance/Electronic Album at the 57th Grammy Awards on February 8, 2015 — his first Grammy; 'Blackbox Life Recorder 21f' was later nominated for Best Dance/Electronic Recording at the 2024 awards.",
      sourceIds: [S.grammy, S.guardianGrammy],
    },
    {
      id: "claim-soundcloud-dump",
      kind: "fact",
      text: "Beginning January 25, 2015, a SoundCloud account — first user48736353001, then user18081971, encoding his birthdate — uploaded more than a hundred previously unreleased early tracks within a week, and over two hundred across the following months; James confirmed the account was his and kept it live for occasional uploads into 2023 and beyond.",
      sourceIds: [S.factDump, S.factTapes, S.archiveDump, S.soundcloud],
    },
    {
      id: "claim-2015-eps",
      kind: "fact",
      text: "Around the dump he also released two Warp EPs in 2015: Computer Controlled Acoustic Instruments pt2 (January) and, as AFX, Orphaned Deejay Selek 2006–08 (August).",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-cheetah",
      kind: "fact",
      text: "The Cheetah EP was released July 8, 2016, on Warp, marketed through print ads and a site styled as an owner's manual for a vintage digital synthesizer — complete with an offer of 'rewards' for buyers' best patches.",
      sourceIds: [S.warpCheetah, S.consequenceCheetah],
    },
    {
      id: "claim-day-for-night",
      kind: "fact",
      text: "On December 17, 2016, he played Houston's Day for Night festival — his first US performance in about eight years, since Coachella 2008.",
      sourceIds: [S.factDFN],
    },
    {
      id: "claim-field-day-2017",
      kind: "fact",
      text: "He headlined Field Day in London in 2017, a set broadcast live on NTS Radio.",
      sourceIds: [S.pitchforkFieldDay],
    },
    {
      id: "claim-collapse",
      kind: "fact",
      text: "The Collapse EP was released September 14, 2018, after 3D Aphex logos appeared in London, Turin, Los Angeles, New York, and Tokyo; a five-minute 'T69 Collapse' segment was pulled from Adult Swim's schedule after the Weirdcore visual failed the Harding photosensitivity test.",
      sourceIds: [S.consequenceCollapse],
    },
    {
      id: "claim-funkhaus",
      kind: "fact",
      text: "On November 1, 2018, he played Berlin's Funkhaus — his first Berlin appearance in fifteen years — a DJ set preceded by days of fan confusion over whether the ticket was for a concert or a club night.",
      sourceIds: [S.raFunkhaus],
    },
    {
      id: "claim-2019-shows",
      kind: "fact",
      text: "In 2019 he played his first New York City show since the 1990s (Avant Gardner, Brooklyn, April 11), a Coachella set (April 13), and a one-off Printworks London show (September 14) with a handpicked support bill and custom Weirdcore visuals streamed by Red Bull.",
      sourceIds: [S.brooklynVegan, S.pitchforkCoachella, S.redbull],
    },
    {
      id: "claim-2023-return",
      kind: "fact",
      text: "He returned to the stage in 2023 for a handful of European festival headlines: Sónar Barcelona's 30th anniversary on June 16 — his first Sónar in twelve years — Field Day in Victoria Park on August 19, teased via a cryptic 190823.co.uk site, and Forwards in Bristol on September 2.",
      sourceIds: [S.musictechSonar, S.pitchforkFieldDay, S.crackForwards],
    },
    {
      id: "claim-blackbox",
      kind: "fact",
      text: "The Blackbox Life Recorder 21f / in a room7 F760 EP was released July 28, 2023, on Warp — his first new commercial release in five years.",
      sourceIds: [S.afxBlackbox],
    },
    {
      id: "claim-live-vinyl",
      kind: "fact",
      text: "Limited 10-inch records (Barcelona 16.06.23 and London 19.08.2023) were sold only at the 2023 shows via reservation cards, then released digitally on December 18, 2024.",
      sourceIds: [S.discogsBarca, S.afxBarca],
    },
    {
      id: "claim-saw2x",
      kind: "fact",
      text: "Selected Ambient Works Volume II (Expanded Edition) was released October 4, 2024 — all tracks on all formats for the first time, including the previously vinyl-only track 19 and two further pieces officially released for the first time.",
      sourceIds: [S.warpSAW2],
    },
    {
      id: "claim-merchdesk",
      kind: "fact",
      text: "Music From The Merch Desk (2016–2023), a compilation of tracks previously sold only on vinyl at his concerts, appeared on Warp without announcement on December 17, 2024.",
      sourceIds: [S.afxMerchDesk],
    },
    {
      id: "claim-2025-tracks",
      kind: "fact",
      text: "On November 27, 2025, he uploaded two versions of a new piece ('Zahl am1 live track 1' and an unfinished variant) to user18081971 — his first unheard music in about two years.",
      sourceIds: [S.stereogum2025, S.soundcloud],
    },
    {
      id: "claim-bank",
      kind: "fact",
      text: "In the late 1990s he moved into a converted bank in London's Elephant & Castle and told interviewers he used its vault and stairwell as a reverb chamber — one of the better-documented pieces of his mythology, repeated across the 1997–2001 interviews.",
      sourceIds: [S.indexMag, S.guardianTankBoy, S.musicradarSub],
    },
    {
      id: "claim-tank",
      kind: "fact",
      text: "He really did own a 'tank' — a Daimler Ferret armoured scout car kept at family property in Wales — and in the 2014 Groove Q&A he confirmed he still had it, inviting Skrillex to come drive it.",
      sourceIds: [S.clash, S.musicradarSub, S.spinGroove, S.guardianTankBoy],
    },
    // --- stated_belief --------------------------------------------------------
    {
      id: "claim-dead-brother",
      kind: "stated_belief",
      text: "James has repeatedly said he was named after an older brother, also called Richard James, who died before he was born — telling Sonic Press in 1996 that his mother named him so the brother 'was supposed to continue to live through me.'",
      sourceIds: [S.indexMag, S.lannerSonic],
    },
    {
      id: "claim-lies",
      kind: "stated_belief",
      text: "His own account of his honesty is contradictory: in 1996 he insisted 'I never say things that aren't true,' yet he has elsewhere described himself as 'an irritating, lying, ginger kid from Cornwall' and treated fabrication as an interview sport.",
      sourceIds: [S.lannerSonic, S.clash, S.mixmag],
    },
    {
      id: "claim-syro-title",
      kind: "stated_belief",
      text: "He told Pitchfork the title Syro is a made-up word one of his children invented — pronounced 'sigh-ro' — and that he likes how people project their own meanings onto invented words.",
      sourceIds: [S.pitchforkCover],
    },
    {
      id: "claim-studio-craft",
      kind: "stated_belief",
      text: "He told Pitchfork he likes building studios more than making music — 'the way I've wired it together becomes the track in itself' — and that he is 'so insane for equipment' that the Syro box set's track-by-track gear list needed to exist.",
      sourceIds: [S.pitchforkCover],
    },
    {
      id: "claim-lucid-dreams",
      kind: "stated_belief",
      text: "He has long claimed to compose music in lucid dreams and to have gone extreme stretches without sleep — once reported as five weeks; asked in 2006 about his sleep-deprivation era, he said he was then sleeping six hours a night.",
      sourceIds: [S.musicradarSub, S.grammy, S.clash],
    },
    {
      id: "claim-public",
      kind: "stated_belief",
      text: "During his email-only interview era his answers could be curt to the point of refusal — asked by Spain's El País in 2011 about his relationship with his public, he answered 'I hate them.'",
      sourceIds: [S.pitchforkCover],
    },
    {
      id: "claim-kanye",
      kind: "stated_belief",
      text: "James says Kanye West's 'Blame Game' sampled Drukqs's 'Avril 14th,' and that when he offered to re-record the piece, West's camp replied 'it's not yours, it's ours' — his account of the dispute, with no counterparty version in the cited record.",
      sourceIds: [S.pitchforkKanye],
    },
    {
      id: "claim-close-chapter",
      kind: "stated_belief",
      text: "He said he released Syro not for money but 'to draw a line, to close a chapter' — that releases work as dividers between creative periods for an artist who would otherwise keep everything in the vault.",
      sourceIds: [S.spinGroove, S.pitchforkCover],
    },
    {
      id: "claim-copyright",
      kind: "stated_belief",
      text: "He told Clash in 2006 that he still believed there should be no copyright on art — admitting it was easy to say with enough money to live on — and that being copied had become flattering rather than angering.",
      sourceIds: [S.clash],
    },
    {
      id: "claim-windowlicker-withdrawal",
      kind: "stated_belief",
      text: "He told Clash he had 'Windowlicker' withdrawn from sale for a time because it was heading toward number one or two — 'I just didn't want it happening.'",
      sourceIds: [S.clash],
    },
    // --- pattern --------------------------------------------------------------
    {
      id: "claim-alias-pattern",
      kind: "pattern",
      text: "Across three decades he has released under at least a dozen aliases — AFX, Polygon Window, Caustic Window, The Tuss, Bradley Strider, Power-Pill and more — sometimes presented as entirely separate artists, as with The Tuss's invented Tregaskin siblings.",
      sourceIds: [S.wikidata, S.rushupWiki, S.pitchforkCover],
    },
    {
      id: "claim-stunt-marketing",
      kind: "pattern",
      text: "Release campaigns repeatedly arrive as puzzles or stunts: the Tor .onion announcement, the London blimp, worldwide logo projections for Collapse, the 190823.co.uk teaser for Field Day, synth-manual ads for Cheetah, and vinyl sold only at his own merch desk.",
      sourceIds: [S.pitchforkSyroNews, S.consequenceCollapse, S.pitchforkFieldDay, S.consequenceCheetah, S.afxMerchDesk],
    },
    {
      id: "claim-interview-scarcity",
      kind: "pattern",
      text: "Since the 1990s he has granted few interviews — mostly by email, one shot only, with questions he dislikes ignored, ridiculed, or answered with fabrications — so the press record is a fog of mutually contradictory claims.",
      sourceIds: [S.clash, S.pitchforkCover, S.lannerSonic],
    },
    {
      id: "claim-vault",
      kind: "pattern",
      text: "He has claimed for decades to sit on vast archives of unreleased music — 'over 100 hours' in 2006, 'a thousand unreleased songs' in the mythos — and the 2015 SoundCloud dump of two-hundred-plus early tracks partially corroborated the archive's scale.",
      sourceIds: [S.clash, S.pitchforkCover, S.factDump, S.factTapes],
    },
    {
      id: "claim-live-vs-dj",
      kind: "pattern",
      text: "His billed 'live' appearances are often closer to DJ or laptop sets with heavy visuals than conventional live performance — a distinction that repeatedly caused billing confusion, as at Funkhaus in 2018.",
      sourceIds: [S.raFunkhaus, S.redbull],
    },
    {
      id: "claim-gear-mystique",
      kind: "pattern",
      text: "He cultivates technical mystique: self-built and modified synths since his teens, a track-by-track equipment list in Syro's box set, the mock owner's-manual framing of Cheetah, and track titles that name machines (Cirklon, Korg Mini Pops).",
      sourceIds: [S.sawWiki, S.pitchforkCover, S.warpCheetah, S.noyzelab],
    },
    // --- speculation ----------------------------------------------------------
    {
      id: "claim-spec-submarine",
      kind: "speculation",
      text: "He told interviewers in 1997–2001 that he had bought or was buying a second-hand Russian submarine; no evidence of a purchase has ever surfaced, and it is generally filed among his tall tales.",
      sourceIds: [S.musicradarSub, S.guardianTankBoy, S.dazed],
    },
    {
      id: "claim-spec-saw-dates",
      kind: "speculation",
      text: "Whether Selected Ambient Works 85–92 really contains music written at age 13–14 is unverifiable — the '85' dating is itself part of the record's self-mythology.",
      sourceIds: [S.sawWiki, S.dazed],
    },
    {
      id: "claim-spec-twin-name",
      kind: "speculation",
      text: "The 'Twin' in Aphex Twin is commonly read as a reference to the dead-brother naming story — the second Richard as the lost boy's twin — but James has never confirmed a definitive origin for the name.",
      sourceIds: [S.indexMag, S.lannerSonic, S.wikipedia],
    },
    {
      id: "claim-spec-simon",
      kind: "speculation",
      text: "The 2015 SoundCloud dump began under an assumed persona — an apparent 43-year-old fan dusting off old DATs — and whether the impersonation was improvised trolling or a staged reveal remains unresolved.",
      sourceIds: [S.nialler9, S.factDump],
    },
    {
      id: "claim-spec-tp-count",
      kind: "speculation",
      text: "The number of Caustic Window test pressings is disputed: the standard account says four or five, while an ex-Warp/Rephlex employee told FACT there are more.",
      sourceIds: [S.factCaustic, S.kickstarter],
    },
    {
      id: "claim-spec-tuss-solo",
      kind: "speculation",
      text: "Whether The Tuss was wholly a James solo project or involved collaborators is unresolved — the 2017 webstore reissue confirms his authorship, but the records carried the fictional Brian and Karen Tregaskin credits.",
      sourceIds: [S.rushupWiki],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1971-08-18",
      title: "Born Richard David James in Limerick, Ireland",
      summary: "Raised in Cornwall, England, around Lanner and Redruth.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-bowgie",
      kind: "role",
      date: "1989",
      title: "DJing Cornish clubs and beaches",
      summary:
        "Built a cult following DJing at the Bowgie Inn, the Shire Horse Inn, and Cornish beach parties, already playing his own tapes; Grant Wilson-Claridge heard him and suggested pressing records.",
      location: "Cornwall, UK",
      sourceIds: [S.rephlexWiki, S.sawWiki],
    },
    {
      id: "event-bubblebath",
      kind: "publication",
      date: "1991-09",
      title: "Analogue Bubblebath EP on Mighty Force",
      summary: "His first release, a 12-inch EP picked up by Kiss FM.",
      sourceIds: [S.sawWiki],
    },
    {
      id: "event-rephlex",
      kind: "founded",
      date: "1991",
      title: "Co-founds Rephlex Records",
      summary:
        "With Grant Wilson-Claridge in Cornwall; the label coined 'braindance' and later moved to London.",
      organization: "Rephlex Records",
      sourceIds: [S.rephlexWiki],
    },
    {
      id: "event-saw1",
      kind: "publication",
      date: "1992-11-09",
      title: "Selected Ambient Works 85–92",
      summary:
        "Debut album on Apollo (R&S), cassette-recorded material billed as dating to 1985; later named FACT's greatest album of the 1990s.",
      sourceIds: [S.sawWiki],
    },
    {
      id: "event-polygon-window",
      kind: "publication",
      date: "1993",
      title: "Surfing on Sine Waves as Polygon Window",
      summary: "His first release on Warp, part of the Artificial Intelligence era.",
      organization: "Warp Records",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-saw2",
      kind: "publication",
      date: "1994-03",
      title: "Selected Ambient Works Volume II",
      summary: "His first Aphex Twin album for Warp — beatless, brooding double album.",
      organization: "Warp Records",
      sourceIds: [S.wikipedia, S.warpSAW2],
    },
    {
      id: "event-caustic-shelved",
      kind: "project",
      date: "1994",
      title: "Caustic Window LP aborted at test-pressing stage",
      summary:
        "The planned Rephlex album was shelved; a handful of test pressings became a two-decade collector legend.",
      organization: "Rephlex Records",
      sourceIds: [S.factCaustic, S.kickstarter],
    },
    {
      id: "event-icbyd",
      kind: "publication",
      date: "1995",
      title: "...I Care Because You Do",
      organization: "Warp Records",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-rdj-album",
      kind: "publication",
      date: "1996",
      title: "Richard D. James Album",
      summary: "Warp album folding jungle and drill-and-bass into his palette.",
      organization: "Warp Records",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-come-to-daddy",
      kind: "publication",
      date: "1997-10",
      title: "Come to Daddy EP and Chris Cunningham video",
      summary:
        "The Cunningham-directed video — child gangs with James's face — became one of the most famous music videos of the decade.",
      organization: "Warp Records",
      sourceIds: [S.ytComeToDaddy, S.wikipedia],
    },
    {
      id: "event-windowlicker",
      kind: "publication",
      date: "1999-03-22",
      title: "Windowlicker single and video",
      summary:
        "Cunningham's ten-minute gangsta-rap parody video was nominated for the Brit Award for Best British Video.",
      organization: "Warp Records",
      sourceIds: [S.windowlickerWiki, S.ytWindowlicker],
    },
    {
      id: "event-drukqs",
      kind: "publication",
      date: "2001-10",
      title: "Drukqs",
      summary:
        "Thirty-track double album on Warp — his last Aphex Twin album for thirteen years.",
      organization: "Warp Records",
      sourceIds: [S.guardianTankBoy, S.wikipedia],
    },
    {
      id: "event-analord",
      kind: "project",
      date: "2005",
      title: "Analord series as AFX",
      summary:
        "Forty-one tracks across eleven vinyl releases sold through Rephlex, condensed to a CD compendium.",
      organization: "Rephlex Records",
      sourceIds: [S.clash],
    },
    {
      id: "event-rubber-johnny",
      kind: "media",
      date: "2005-06-20",
      title: "Rubber Johnny released",
      summary:
        "Chris Cunningham's night-vision short film scored with James's Drukqs-era music, released on DVD by Warp.",
      sourceIds: [S.rubberJohnnyWiki],
    },
    {
      id: "event-tuss",
      kind: "publication",
      date: "2007",
      title: "The Tuss releases on Rephlex",
      summary:
        "Confederation Trough EP and Rushup Edge LP credited to the invented Brian and Karen Tregaskin; James's authorship confirmed a decade later.",
      organization: "Rephlex Records",
      sourceIds: [S.rushupWiki],
    },
    {
      id: "event-rephlex-closes",
      kind: "milestone",
      date: "2014",
      title: "Rephlex Records closes",
      organization: "Rephlex Records",
      sourceIds: [S.rephlexWiki],
    },
    {
      id: "event-caustic-kickstarter",
      kind: "milestone",
      date: "2014",
      title: "Caustic Window released via Kickstarter",
      summary:
        "A WATMM-run crowdfunding raised $67,424 to buy the test pressing; backers received the first licensed digital copies, and the vinyl was resold on eBay.",
      sourceIds: [S.kickstarter, S.pitchforkKickstarter],
    },
    {
      id: "event-syro-announce",
      kind: "media",
      date: "2014-08-18",
      title: "Syro announced via Tor on his 43rd birthday",
      summary:
        "A tweet from his dormant account pointed to an .onion page with the title and tracklist, following a blimp over London and stencils in New York.",
      sourceIds: [S.pitchforkSyroNews],
    },
    {
      id: "event-syro",
      kind: "publication",
      date: "2014-09",
      title: "Syro released on Warp",
      summary: "His first Aphex Twin album in thirteen years.",
      organization: "Warp Records",
      sourceIds: [S.pitchforkCover, S.wikipedia],
    },
    {
      id: "event-dump",
      kind: "milestone",
      date: "2015-01-25",
      title: "SoundCloud dump begins",
      summary:
        "The account that became user18081971 began uploading unreleased early tracks — over a hundred within the week, over two hundred across 2015.",
      sourceIds: [S.factDump, S.archiveDump, S.nialler9],
    },
    {
      id: "event-grammy",
      kind: "award",
      date: "2015-02-08",
      title: "Grammy for Syro",
      summary:
        "Best Dance/Electronic Album at the 57th Grammy Awards — his first Grammy.",
      sourceIds: [S.grammy, S.guardianGrammy],
    },
    {
      id: "event-cheetah",
      kind: "publication",
      date: "2016-07-08",
      title: "Cheetah EP",
      summary:
        "Released on Warp with marketing styled as a synthesizer owner's manual.",
      organization: "Warp Records",
      sourceIds: [S.warpCheetah, S.consequenceCheetah],
    },
    {
      id: "event-day-for-night",
      kind: "exhibition",
      date: "2016-12-17",
      title: "Day for Night, Houston — first US show in eight years",
      summary: "A rain-soaked headline set, his first US performance since Coachella 2008.",
      location: "Houston, Texas",
      sourceIds: [S.factDFN],
    },
    {
      id: "event-field-day-2017",
      kind: "exhibition",
      date: "2017",
      title: "Field Day headline, broadcast on NTS",
      location: "Victoria Park, London",
      sourceIds: [S.pitchforkFieldDay],
    },
    {
      id: "event-collapse",
      kind: "publication",
      date: "2018-09-14",
      title: "Collapse EP",
      summary:
        "Announced by worldwide logo projections; the 'T69 Collapse' visual failed TV's Harding photosensitivity test.",
      organization: "Warp Records",
      sourceIds: [S.consequenceCollapse],
    },
    {
      id: "event-funkhaus",
      kind: "exhibition",
      date: "2018-11-01",
      title: "Funkhaus, Berlin — first Berlin show in fifteen years",
      location: "Berlin, Germany",
      sourceIds: [S.raFunkhaus],
    },
    {
      id: "event-avant-gardner",
      kind: "exhibition",
      date: "2019-04-11",
      title: "Avant Gardner, Brooklyn — first NYC show since the 1990s",
      location: "Brooklyn, New York",
      sourceIds: [S.brooklynVegan],
    },
    {
      id: "event-coachella",
      kind: "exhibition",
      date: "2019-04-13",
      title: "Coachella set",
      summary: "His first Coachella appearance since 2008.",
      location: "Indio, California",
      sourceIds: [S.pitchforkCoachella],
    },
    {
      id: "event-printworks",
      kind: "exhibition",
      date: "2019-09-14",
      title: "Printworks, London — Red Bull live-streamed show",
      summary:
        "One-off show with handpicked support (Afrodeutsche, Nihiloxica, Caterina Barbieri) and custom Weirdcore visuals.",
      location: "London, UK",
      sourceIds: [S.redbull],
    },
    {
      id: "event-sonar-2023",
      kind: "exhibition",
      date: "2023-06-16",
      title: "Sónar 30th anniversary — live return",
      summary: "His first Sónar appearance in twelve years, opening the 2023 comeback run.",
      location: "Barcelona, Spain",
      sourceIds: [S.musictechSonar],
    },
    {
      id: "event-blackbox",
      kind: "publication",
      date: "2023-07-28",
      title: "Blackbox Life Recorder 21f / in a room7 F760 EP",
      summary:
        "His first new commercial release in five years; the title track was later nominated for a 2024 Grammy.",
      organization: "Warp Records",
      sourceIds: [S.afxBlackbox, S.grammy],
    },
    {
      id: "event-field-day-2023",
      kind: "exhibition",
      date: "2023-08-19",
      title: "Field Day headline — first London show since 2019",
      summary: "Teased via the cryptic 190823.co.uk site before announcement.",
      location: "Victoria Park, London",
      sourceIds: [S.pitchforkFieldDay],
    },
    {
      id: "event-forwards-2023",
      kind: "exhibition",
      date: "2023-09-02",
      title: "Forwards festival headline, Bristol",
      location: "The Downs, Bristol",
      sourceIds: [S.crackForwards],
    },
    {
      id: "event-saw2x",
      kind: "publication",
      date: "2024-10-04",
      title: "Selected Ambient Works Volume II (Expanded Edition)",
      summary:
        "Thirtieth-anniversary reissue: all tracks on all formats for the first time, plus previously unreleased material.",
      organization: "Warp Records",
      sourceIds: [S.warpSAW2],
    },
    {
      id: "event-merchdesk",
      kind: "publication",
      date: "2024-12-17",
      title: "Music From The Merch Desk (2016–2023)",
      summary:
        "Surprise compilation of show-exclusive vinyl tracks; the 2023 live EPs followed digitally the next day.",
      organization: "Warp Records",
      sourceIds: [S.afxMerchDesk, S.afxBarca],
    },
    {
      id: "event-zahl",
      kind: "milestone",
      date: "2025-11-27",
      title: "Two new tracks on user18081971",
      summary:
        "'Zahl am1 live track 1' and an unfinished variant — his first unheard music in about two years.",
      sourceIds: [S.stereogum2025],
    },
  ],
  themes: [
    {
      id: "theme-disinformation",
      kind: "practice",
      status: "reported",
      title: "Disinformation as interview practice",
      summary:
        "From the 1990s onward James treated interviews as raw material for myth: fabricated biographies, impossible gear claims, tall tales about tanks, submarines and cruise-ship tours. Pitchfork calls the resulting mythos 'essentially unverifiable'; he has both admitted and denied the lying in the same record.",
      sourceIds: [S.pitchforkCover, S.dazed, S.mixmag, S.lannerSonic],
    },
    {
      id: "theme-pseudonyms",
      kind: "practice",
      status: "reported",
      title: "Pseudonyms as release strategy",
      summary:
        "AFX, Polygon Window, Caustic Window, The Tuss, Bradley Strider, Power-Pill and others let him release constantly without feeding the Aphex Twin brand — The Tuss even shipped with invented sibling credits and a fake MySpace discovery story.",
      sourceIds: [S.wikidata, S.rushupWiki, S.pitchforkCover],
    },
    {
      id: "theme-distribution-stunts",
      kind: "practice",
      status: "reported",
      title: "Distribution as theater",
      summary:
        "Tor-only announcements, blimps, global logo projections, synth-manual ads, show-only vinyl, an album freed by crowdfunding, and two-hundred-track SoundCloud dumps: the release mechanism is part of the art and consistently bypasses conventional promo.",
      sourceIds: [S.pitchforkSyroNews, S.consequenceCollapse, S.warpCheetah, S.kickstarter, S.factDump, S.afxMerchDesk],
    },
    {
      id: "theme-studio-craft",
      kind: "method",
      status: "stated",
      title: "The studio is the instrument",
      summary:
        "He says he enjoys building studios more than making music — 'the way I've wired it together becomes the track in itself.' Custom-modified synths, MC-4-era sequencers, microtonal setups, and track titles that name the machines involved all serve that ethic.",
      sourceIds: [S.pitchforkCover, S.noyzelab, S.warpCheetah],
    },
    {
      id: "theme-sleep-dreams",
      kind: "interest",
      status: "stated",
      title: "Sleep, lucid dreams, and the edge of fatigue",
      summary:
        "A durable strand of the self-mythology: composing in lucid dreams, weeks claimed without sleep, then the 2006 shrug — 'I'm on six hours a night at the moment.' Whether practice or provocation, he keeps the frame alive.",
      sourceIds: [S.musicradarSub, S.clash, S.grammy],
    },
    {
      id: "theme-anti-celebrity",
      kind: "belief",
      status: "reported",
      title: "Anti-celebrity seclusion",
      summary:
        "The press frame is 'recluse': decades with almost no face-to-face interviews, curt email answers ('I hate them,' asked about his public), faceless or face-scrambled visuals, and long silences between releases. His own words alternate between contempt for publicity and plain shyness.",
      sourceIds: [S.pitchforkCover, S.clash, S.mixmag],
    },
    {
      id: "theme-cornwall",
      kind: "influence",
      status: "reported",
      title: "Cornish roots",
      summary:
        "Cornwall recurs as both biography and brand: beach raves, the Bowgie Inn DJ sets, Rephlex's founding there, Tuss track titles in Cornish slang, and a career-long preference for working far from scenes.",
      sourceIds: [S.rephlexWiki, S.sawWiki, S.rushupWiki],
    },
    {
      id: "theme-duality",
      kind: "method",
      status: "inferred",
      title: "Pastoral ambience vs. violent rhythm",
      summary:
        "Index synthesis: the catalog's poles — the weightless ambience of the SAW records and 'Avril 14th' against the assault programming of Come to Daddy, Drukqs and the live DJ sets — are one aesthetic, and every era moves between them.",
      sourceIds: [S.wikipedia, S.windowlickerWiki, S.factDFN],
    },
  ],
  works: [
    {
      id: "work-bubblebath",
      kind: "recording",
      status: "released",
      title: "Analogue Bubblebath (EP)",
      date: "1991-09",
      summary: "Debut 12-inch on Mighty Force, picked up by Kiss FM.",
      sourceIds: [S.sawWiki],
    },
    {
      id: "work-saw1",
      kind: "recording",
      status: "released",
      title: "Selected Ambient Works 85–92",
      date: "1992-11-09",
      summary:
        "Debut album on Apollo/R&S; ambient-techno landmark billed as containing material back to 1985.",
      sourceIds: [S.sawWiki],
    },
    {
      id: "work-polygon",
      kind: "recording",
      status: "released",
      title: "Surfing on Sine Waves (as Polygon Window)",
      date: "1993",
      summary: "First Warp release, part of the Artificial Intelligence series.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-saw2",
      kind: "recording",
      status: "released",
      title: "Selected Ambient Works Volume II",
      date: "1994-03",
      summary: "Beatless double album, his first as Aphex Twin for Warp; expanded reissue in 2024.",
      sourceIds: [S.wikipedia, S.warpSAW2],
    },
    {
      id: "work-icbyd",
      kind: "recording",
      status: "released",
      title: "...I Care Because You Do",
      date: "1995",
      summary: "Warp album with his self-painted face on the cover.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-rdj-album",
      kind: "recording",
      status: "released",
      title: "Richard D. James Album",
      date: "1996",
      summary: "Warp album folding jungle into drill-and-bass.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-ctd-ep",
      kind: "recording",
      status: "released",
      title: "Come to Daddy (EP)",
      date: "1997-10",
      summary: "Warp EP whose title track and video made him infamous beyond electronic music.",
      sourceIds: [S.wikipedia, S.ytComeToDaddy],
    },
    {
      id: "work-windowlicker",
      kind: "recording",
      status: "released",
      title: "Windowlicker (single)",
      date: "1999-03-22",
      summary: "Warp single; he claims he briefly withdrew it as it headed for the top of the charts.",
      sourceIds: [S.windowlickerWiki, S.clash],
    },
    {
      id: "work-drukqs",
      kind: "recording",
      status: "released",
      title: "Drukqs",
      date: "2001-10",
      summary: "Thirty-track double album on Warp; last Aphex Twin album for thirteen years.",
      sourceIds: [S.guardianTankBoy, S.wikipedia],
    },
    {
      id: "work-analord",
      kind: "recording",
      status: "released",
      title: "Analord series (as AFX)",
      date: "2005",
      summary: "Forty-one tracks across eleven vinyl releases on Rephlex, later condensed on CD.",
      sourceIds: [S.clash],
    },
    {
      id: "work-tuss",
      kind: "recording",
      status: "released",
      title: "Confederation Trough EP and Rushup Edge (as The Tuss)",
      date: "2007",
      summary:
        "Rephlex releases credited to the fictional Brian and Karen Tregaskin; his authorship confirmed via the 2017 webstore reissue.",
      sourceIds: [S.rushupWiki],
    },
    {
      id: "work-caustic-window",
      kind: "recording",
      status: "released",
      title: "Caustic Window LP (as Caustic Window)",
      date: "2014",
      summary:
        "Aborted 1994 Rephlex album; released digitally in 2014 to Kickstarter backers under a one-time license, the test pressing then sold on eBay.",
      sourceIds: [S.kickstarter, S.pitchforkKickstarter, S.factCaustic],
    },
    {
      id: "work-syro",
      kind: "recording",
      status: "released",
      title: "Syro",
      date: "2014-09",
      summary:
        "First Aphex Twin album in thirteen years; announced via Tor, won the Grammy for Best Dance/Electronic Album.",
      sourceIds: [S.pitchforkSyroNews, S.grammy, S.pitchforkCover],
    },
    {
      id: "work-ccai",
      kind: "recording",
      status: "released",
      title: "Computer Controlled Acoustic Instruments pt2 (EP)",
      date: "2015-01",
      summary: "Warp EP of robot-played acoustic instrument pieces.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-ods",
      kind: "recording",
      status: "released",
      title: "Orphaned Deejay Selek 2006–08 (EP, as AFX)",
      date: "2015-08",
      summary: "Warp EP of archival AFX material.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-cheetah",
      kind: "recording",
      status: "released",
      title: "Cheetah (EP)",
      date: "2016-07-08",
      summary:
        "Warp EP of wave-sequenced digital synthesis, marketed as a vintage synth's owner's manual.",
      sourceIds: [S.warpCheetah, S.consequenceCheetah],
    },
    {
      id: "work-collapse",
      kind: "recording",
      status: "released",
      title: "Collapse (EP)",
      date: "2018-09-14",
      summary: "Warp EP announced by worldwide logo projections.",
      sourceIds: [S.consequenceCollapse],
    },
    {
      id: "work-blackbox",
      kind: "recording",
      status: "released",
      title: "Blackbox Life Recorder 21f / in a room7 F760 (EP)",
      date: "2023-07-28",
      summary: "Warp EP; title track nominated for the 2024 Best Dance/Electronic Recording Grammy.",
      sourceIds: [S.afxBlackbox, S.grammy],
    },
    {
      id: "work-barca-ep",
      kind: "recording",
      status: "released",
      title: "Barcelona 16.06.23 / London 19.08.2023 (show-only 10-inch EPs)",
      date: "2023",
      summary:
        "Limited 10-inch records sold via reservation cards at the 2023 shows; digital release December 18, 2024.",
      sourceIds: [S.discogsBarca, S.afxBarca],
    },
    {
      id: "work-saw2x",
      kind: "recording",
      status: "released",
      title: "Selected Ambient Works Volume II (Expanded Edition)",
      date: "2024-10-04",
      summary: "Thirtieth-anniversary reissue with all tracks on all formats plus two newly released pieces.",
      sourceIds: [S.warpSAW2],
    },
    {
      id: "work-merchdesk",
      kind: "recording",
      status: "released",
      title: "Music From The Merch Desk (2016–2023)",
      date: "2024-12-17",
      summary: "Unannounced Warp compilation of tracks previously sold only on vinyl at shows.",
      sourceIds: [S.afxMerchDesk],
    },
    {
      id: "work-ctd-video",
      kind: "film",
      status: "released",
      title: "Come to Daddy (music video, dir. Chris Cunningham)",
      date: "1997",
      summary: "Cunningham's Thamesmead video of face-masked child gangs; a decade-defining clip.",
      sourceIds: [S.ytComeToDaddy],
    },
    {
      id: "work-windowlicker-video",
      kind: "film",
      status: "released",
      title: "Windowlicker (music video, dir. Chris Cunningham)",
      date: "1999",
      summary: "Ten-minute parody of gangsta-rap videos; Brit Award-nominated.",
      sourceIds: [S.ytWindowlicker, S.windowlickerWiki],
    },
    {
      id: "work-rubber-johnny",
      kind: "film",
      status: "released",
      title: "Rubber Johnny (short film)",
      date: "2005-06-20",
      summary:
        "Chris Cunningham's night-vision short built around James's Drukqs track 'Afx237 v.7'; released on DVD by Warp.",
      sourceIds: [S.rubberJohnnyWiki],
    },
  ],
  appearances: [
    {
      id: "appearance-index",
      title: "Index Magazine home interview",
      venue: "Index Magazine",
      publishedAt: "2001",
      participants: ["Richard D. James", "Meredith Danluck"],
      summary:
        "Taped at his converted-bank home in Elephant & Castle on January 14, 2001, with photographs by Wolfgang Tillmans; the bio block repeats the dead-brother naming story.",
      media: [
        {
          type: "article",
          url: "https://www.indexmagazine.com/interviews-aphex-twin",
          sourceId: S.indexMag,
        },
      ],
      sourceIds: [S.indexMag],
    },
    {
      id: "appearance-tankboy",
      title: "'Tank boy' — Guardian Drukqs profile",
      venue: "The Guardian",
      publishedAt: "2001-10-05",
      participants: ["Richard D. James"],
      summary:
        "A rare face-to-face interview in the Elephant & Castle shopping centre, conducted twenty-one hours late; records the bank flat, the tank, and the submarine claim.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/culture/2001/oct/05/artsfeatures3",
          sourceId: S.guardianTankBoy,
        },
      ],
      sourceIds: [S.guardianTankBoy],
    },
    {
      id: "appearance-clash",
      title: "Clash email interview (Analord era)",
      venue: "Clash",
      publishedAt: "2006-05-01",
      participants: ["Richard D. James"],
      summary:
        "Forty questions sent, not all answered; the preamble lays out his one-shot, no-follow-ups rule and his 'irritating, lying, ginger kid from Cornwall' self-description.",
      media: [
        {
          type: "article",
          url: "https://www.clashmusic.com/features/aphex-twin-interview/",
          sourceId: S.clash,
        },
      ],
      sourceIds: [S.clash],
    },
    {
      id: "appearance-pitchfork-2014",
      title: "Strange Visitor: A Conversation With Aphex Twin",
      venue: "Pitchfork",
      publishedAt: "2014-09-18",
      participants: ["Richard D. James", "Philip Sherburne"],
      summary:
        "The Syro-era cover story — a rare in-person interview in a Charing Cross hotel, covering the Tor announcement, studio-building, his children, and the 'Blame Game' sampling account.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/cover-story/9506-strange-visitor-a-conversation-with-aphex-twin/",
          sourceId: S.pitchforkCover,
        },
        {
          type: "article",
          url: "https://pitchfork.com/news/56459-aphex-twin-speaks-on-his-new-album-being-sampled-by-kanye-more/",
          sourceId: S.pitchforkKanye,
        },
      ],
      sourceIds: [S.pitchforkCover, S.pitchforkKanye],
    },
    {
      id: "appearance-noyze",
      title: "SYROBONKERS! — the Noyzelab interview",
      venue: "Noyzelab",
      publishedAt: "2014-11",
      participants: ["Richard D. James", "Dave Noyze"],
      summary:
        "A months-long email interview conducted by a friend around the Syro release — the loosest, most detailed of the era, running across two parts with gear talk and shared unreleased experiments; preserved via the Internet Archive.",
      media: [
        {
          type: "article",
          url: "https://web.archive.org/web/20141103131334/http://noyzelab.blogspot.co.uk/2014/11/syrobonkers-part1.html",
          sourceId: S.noyzelab,
        },
      ],
      sourceIds: [S.noyzelab],
    },
    {
      id: "appearance-groove-25",
      title: "Groove 25th-anniversary artist Q&A",
      venue: "Groove (via SPIN coverage)",
      publishedAt: "2014-12",
      participants: ["Richard D. James", "Skrillex", "Caribou", "Nicolas Jaar"],
      summary:
        "Fellow artists posed the questions for the German magazine's anniversary; he answered on EDM, the tank ('still at my sister's house in Wales'), and why he released Syro.",
      media: [
        {
          type: "article",
          url: "https://www.spin.com/2014/12/aphex-twin-interview-groove-magazine/",
          sourceId: S.spinGroove,
        },
      ],
      sourceIds: [S.spinGroove],
    },
    {
      id: "appearance-user18081971",
      title: "user18081971 — the SoundCloud account",
      venue: "SoundCloud",
      publishedAt: "2015",
      participants: ["Richard D. James"],
      summary:
        "The dump account that became a semi-official channel: two-hundred-plus early tracks, bio messages to fans, comment exchanges, and sporadic new uploads through 2025.",
      media: [
        {
          type: "audio",
          url: "https://soundcloud.com/user18081971",
          sourceId: S.soundcloud,
        },
      ],
      sourceIds: [S.soundcloud, S.factDump, S.factTapes],
    },
    {
      id: "appearance-ctd-video",
      title: "Come to Daddy (director's cut)",
      venue: "Aphex Twin (official YouTube)",
      participants: ["Richard D. James", "Chris Cunningham"],
      summary: "The official upload of Chris Cunningham's video for the 1997 EP's title track.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=TZ827lkktYs",
          sourceId: S.ytComeToDaddy,
        },
      ],
      sourceIds: [S.ytComeToDaddy],
    },
    {
      id: "appearance-windowlicker-video",
      title: "Windowlicker (official video)",
      venue: "Aphex Twin (official YouTube)",
      participants: ["Richard D. James", "Chris Cunningham"],
      summary:
        "The official upload of Cunningham's ten-minute, Brit Award-nominated parody of gangsta-rap videos.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=UBS4Gi1y_nc",
          sourceId: S.ytWindowlicker,
        },
      ],
      sourceIds: [S.ytWindowlicker, S.windowlickerWiki],
    },
    {
      id: "appearance-printworks",
      title: "Printworks — Red Bull Music Festival London",
      venue: "Printworks, London",
      publishedAt: "2019-09",
      participants: ["Richard D. James", "Afrodeutsche", "Nihiloxica", "Caterina Barbieri"],
      summary:
        "A one-off show with a handpicked support bill and custom-built Weirdcore LED visuals, live-streamed by Red Bull.",
      media: [
        {
          type: "article",
          url: "https://www.redbull.com/gb-en/events/red-bull-music-festival-london-aphex-twin",
          sourceId: S.redbull,
        },
      ],
      sourceIds: [S.redbull],
    },
  ],
  openQuestions: [
    "Whether the dead-brother naming story is literally true — he has told it for decades, the tellings vary, and the 'Twin' in the name is commonly read as a reference to it.",
    "Which 1990s claims were fabricated: the Daimler Ferret 'tank' was real, the Russian submarine was never evidenced, and stories like the cruise-ship tour and Wendy House shows sit in between.",
    "Whether Selected Ambient Works 85–92 really contains material from 1985, when James was 13–14, or whether the dating is itself mythology.",
    "The true scale of his unreleased archive — claims range from 'over 100 hours' to 'a thousand songs'; the 2015 dump confirmed only part of it.",
    "How many Caustic Window test pressings exist — the standard account says four or five; an ex-label employee told FACT there are more.",
    "Whether the 'Simon' persona behind the first SoundCloud uploads was a staged reveal or improvised trolling.",
    "Whether The Tuss was wholly a solo project — the fictional Brian and Karen Tregaskin credits leave collaboration formally open.",
    "The outcome of the 'Avril 14th'/'Blame Game' sampling dispute — only James's account is in the cited record.",
    "Where 'live' ends and DJing begins in his sets — billing has repeatedly confused the two, notably at Funkhaus in 2018.",
    "Almost nothing in the cited record covers 2008–2013 in detail — the gap years between The Tuss and the Syro campaign are thinly documented here.",
    "Early-life detail beyond the Limerick birth and Cornish upbringing — schooling, the claimed coal-mine job at seventeen — traces almost entirely to his own tellings.",
  ],
  body: `Richard D. James — Aphex Twin — is the most influential electronic musician of his generation and also its most unreliable narrator. Both facts are load-bearing. Born August 18, 1971 in Limerick and raised in Cornwall, he built a cult following as a teenage DJ playing his own tapes at the Bowgie Inn and Cornish beach parties, co-founded Rephlex Records with Grant Wilson-Claridge in 1991, and within three years had released *Selected Ambient Works 85–92* (Apollo/R&S, 1992) and *Selected Ambient Works Volume II* (Warp, 1994) — records that effectively defined ambient techno and the pastoral end of what came to be called IDM.

## The record

The catalog splits into two registers that have never reconciled. On one side, the beatless or near-beatless work — the SAW records, *Drukqs*'s prepared-piano miniatures, the 'Avril 14th' that Kanye West sampled (James says without a proper credit, per his 2014 Pitchfork interview). On the other, the assault end: *Come to Daddy* (1997), *Windowlicker* (1999), the drill-and-bass of the *Richard D. James Album* (1996) and *Drukqs* (2001), and a live persona closer to a rave DJ than a recitalist. Chris Cunningham's videos for Come to Daddy and Windowlicker — plus the night-vision short *Rubber Johnny* (2005) — made his grinning face the era's most recognizable mask.

After Drukqs the proper albums stopped for thirteen years, but the output did not: the eleven-vinyl *Analord* series as AFX (2005, Rephlex), the two records by 'The Tuss' (2007) officially credited to the invented siblings Brian and Karen Tregaskin — his authorship confirmed only in 2017, when he reissued *Rushup Edge* on his own webstore — and, in 2014, the resurrection of the lost 1994 *Caustic Window* LP through a fan-run Kickstarter that raised $67,424 with Rephlex's blessing. Rephlex itself closed in 2014.

## The mythology machine

James's interviews are a documented fog. He told the NME and MTV in the 1990s about a tank (real — a Daimler Ferret scout car, still at his sister's in Wales as of 2014), a submarine (never evidenced), a converted bank in Elephant & Castle (real — he used the vault as a reverb chamber), a plan to tour by cruise ship (phantasm), and a thousand unreleased songs (plausible — the 2015 SoundCloud dump alone surfaced two hundred-plus early tracks). He was named, he says, after a brother who died before he was born — the story that gives 'Twin' its charge — and in the same 1996 interview insisted 'I never say things that aren't true,' while elsewhere describing himself as 'an irritating, lying, ginger kid from Cornwall.' Pitchfork's 2014 cover story calls the result 'electronic music's very own misanthropic version of Paul Bunyan.'

The releases behave the same way. *Syro* was announced via a Tor-only .onion link tweeted on his 43rd birthday, after a green blimp over London and stencils in New York (August 2014). *Collapse* arrived via 3D logos projected worldwide, with its 'T69 Collapse' visual pulled from Adult Swim after failing the Harding photosensitivity test. The *Cheetah* EP (2016) was marketed as an owner's manual for a vintage digital synth. And the SoundCloud account user18081971 — his birthdate — began as a fake-fan persona posting 'early demos' before becoming a semi-official channel still active into 2025.

## The return

The live record is as episodic as the interviews. After scattered 2011–12 appearances: a rain-soaked Day for Night set in Houston (December 2016, his first US show in eight years), a Field Day headline broadcast on NTS (2017), a contested-but-triumphant Funkhaus Berlin DJ set (November 2018), and a 2019 run — first NYC show since the '90s at Brooklyn's Avant Gardner, Coachella, and a Red Bull-streamed Printworks night with handpicked support. In 2023 he returned properly: Sónar's 30th anniversary in Barcelona, a Field Day headline teased by the cryptic 190823.co.uk site, and Forwards in Bristol, with the *Blackbox Life Recorder 21f* EP (July 2023) earning a 2024 Grammy nomination. Limited 10-inches sold only at those shows — 'Barcelona 16.06.23' and 'London 19.08.2023' — reached the webstore digitally in December 2024, alongside the surprise *Music From The Merch Desk (2016–2023)* compilation and October's long-awaited *Selected Ambient Works Volume II* expanded reissue. In November 2025 two new 'Zahl am1' sketches appeared on the SoundCloud account without announcement.

## What the record does not settle

Nearly everything colorful about James is contested by design. The dead-brother story, the '85' in the album title, the submarine, the scale of the vault, the true authorship of The Tuss, whether his 'live' sets are live at all — the index preserves each as stated belief, pattern, or speculation rather than fact. Even the reporting that documents the contradictions participates in them: the Dazed myth-versus-reality survey is bylined 'Brian Tregaskin,' one of his own pseudonyms. With this subject, the contested record is not a bug in the evidence. It is the evidence.

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
