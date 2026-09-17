#!/usr/bin/env bun
/** Generate examples/people/hyperdub/person-index.json with derived source ids.
 *
 * Subject kind "organization": founders ride in `relations` (founded_by), the
 * artist roster becomes `member` edges (organization -> artist), and catalog
 * releases live in `works` + `publication`/`milestone` timeline events.
 *
 * Deliberately unresolved: the webzine/project start date. Wikipedia, Dazed,
 * and Rolling Stone say 1999; Hyperdub's own 2007 press release says the
 * project was set up in 2001; a 2009 press interview has Kode9 say 2001; some
 * summaries say 2000. All variants are preserved, none resolved.
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

const ACCESSED = "2026-10-05T08:12:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- subject-controlled -----------------------------------------------------

const siteHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Hyperdub",
  url: "https://hyperdub.net/",
  publisher: "Hyperdub",
  notes:
    "The label's own storefront and catalog hub; lists current releases, apparel, and the newsletter.",
});

const siteArtists = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Hyperdub — Artists",
  url: "https://hyperdub.net/pages/artists",
  publisher: "Hyperdub",
  notes:
    "The label's own roster page: Kode9, Burial, Jessy Lanza, Fatima Al Qadiri, Laurel Halo, Dean Blunt, Ikonika, Cooly G, Zomby, DVA, Klein, Darkstar, aya, Proc Fiskal, Nazar, Loraine James, Foodman, Heavee, and others. A snapshot, not a full history of the catalog.",
});

const siteHyp001 = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Kode9 + The Spaceape — Sine Of The Dub — HYP001",
  url: "https://hyperdub.net/en-us/products/kode9-the-spaceape-sine-of-the-dub-hyp001",
  publisher: "Hyperdub",
  notes:
    "Official product page for the label's first release; the store copy describes the 2004 single and its place at the start of the catalog.",
});

const siteSlb = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Burial — South London Boroughs — HYP003",
  url: "https://hyperdub.net/en-us/products/burial-south-london-boroughs",
  publisher: "Hyperdub",
  notes:
    "Official product page for Burial's first Hyperdub EP, the label's third release.",
});

const siteBurial = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Hyperdub — Burial collection",
  url: "https://hyperdub.net/en-us/collections/burial",
  publisher: "Hyperdub",
  notes:
    "The label's own Burial collection page — catalog evidence that Burial remains on the official store roster.",
});

const blogHyp001 = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "2004 - HYP001 - Kode9 + Daddi Gee - Sine/Stalker",
  url: "http://hyperdubrecords.blogspot.com/2007/09/2004-hyp001-kode9-daddi-gee-sinestalker.html",
  publisher: "Hyperdub Records (Blogspot archive)",
  publishedAt: "2007-09",
  notes:
    "The label's own historical press blog reprinting the HYP001 press materials. It dates the Hyperdub project — as distinct from the label — to 2001, which conflicts with the 1999 webzine date in later profiles.",
});

const blogUntrue = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Burial — Untrue — November 2007",
  url: "http://hyperdubrecords.blogspot.com/2007/10/burial-untrue-november-2007.html",
  publisher: "Hyperdub Records (Blogspot archive)",
  publishedAt: "2007-10",
  notes:
    "The label's own announcement post for Untrue, on the same historical blog as the HYP001 press release.",
});

// --- primary records ----------------------------------------------------------

const bandcampUntrue = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Untrue — Burial — Bandcamp",
  url: "https://burial.bandcamp.com/album/untrue",
  publisher: "Bandcamp",
  notes:
    "The official artist/label Bandcamp listing for Untrue: 13 tracks, released November 2007 on Hyperdub.",
});

const bleep101 = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Various Artists — Hyperdub 10.1 — HDBCD025D",
  url: "https://bleep.com/release/543531-various-artists-hyperdub-101",
  publisher: "Bleep",
  notes:
    "Retail release record: catalog number HDBCD025D, release date May 19, 2014; describes the four-volume tenth-anniversary plan.",
});

const redeyeNazar = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Nazar — Enclave — Hyperdub HDB117",
  url: "https://www.redeyerecords.co.uk/vinyl/103959-hdb117-nazar-enclave/",
  publisher: "Redeye Records",
  notes:
    "Retail listing for Nazar's Enclave EP (HDB117, 2018) — catalog-level evidence of the Angolan producer's releases on the label.",
});

// --- interviews (the founder and roster artists speaking) ---------------------

const eomsInterview = source({
  binding: "interview",
  mediaType: "article",
  title: "Steve Goodman (Kode9) on 5 years of Hyperdub",
  url: "https://exileonmoanstreet.blogspot.com/2009/11/steve-goodman-kode9-on-5-years-of.html",
  publisher: "E.O.M.S. (blog repost)",
  publishedAt: "2009-11",
  authors: ["Steve Goodman"],
  notes:
    "Reposted 2009 press interview marking the Hyperdub 5 compilation. Goodman dates the web magazine to 2001, credits The Bug with prompting the label, and describes it as a one-man operation with no A&R policy.",
});

const vinylFactory = source({
  binding: "interview",
  mediaType: "article",
  title: "Inside the sound of Hyperdub with Kode9",
  url: "https://www.thevinylfactory.com/features/inside-the-sound-of-hyperdub-with-kode9",
  publisher: "The Vinyl Factory",
  notes:
    "Long-form label profile and interview covering the dub lineage, the roster, and the 2014 deaths of DJ Rashad and The Spaceape.",
});

const elevKode9 = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview with Kode9",
  url: "https://elevate.at/en/details/news/interview-with-kode9/",
  publisher: "Elevate Festival",
  notes:
    "Interview touching on Goodman's sonic-fiction framing, the webzine origins, and the label's approach.",
});

const c32Kode9 = source({
  binding: "interview",
  mediaType: "article",
  title: "Sonic Fictions and Alternative Histories: Kode9",
  url: "https://magazine.032c.com/magazine/sonic-fictions-and-alternative-histories-kode9",
  publisher: "032c",
  notes:
    "Interview linking Goodman's academic writing (Sonic Warfare) to the label's aesthetic and Afrofuturist framing.",
});

const guardianKode9 = source({
  binding: "interview",
  mediaType: "article",
  title: "How dub master Kode9 became the hero of zero",
  url: "https://www.theguardian.com/music/2015/nov/16/kode9-nothing-album-steve-goodman-hyperdub-interview",
  publisher: "The Guardian",
  publishedAt: "2015-11-16",
  authors: ["Tim Jonze"],
  notes:
    "Interview around the Nothing album: the 'zero virus' concept, the loss of Spaceape and DJ Rashad, and Goodman's music-as-virus framing.",
});

const mixmagQA = source({
  binding: "interview",
  mediaType: "article",
  title: "Q&A: Kode9",
  url: "https://mixmag.net/feature/q-a-kode9",
  publisher: "Mixmag",
  publishedAt: "2015-10-30",
  authors: ["Seb Wheeler"],
  notes:
    "Q&A covering Nothing, the 2014 losses, footwork, the tenth-birthday year — and notes Kode9 received an Innovator award at the 2015 AIM Independent Music Awards.",
});

const xlr8rKode9 = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview: Kode9",
  url: "https://xlr8r.com/features/interview-kode9/",
  publisher: "XLR8R",
  publishedAt: "2015-11",
  notes:
    "Nothing-era interview: dates DJ Rashad's death to April 2014 and The Spaceape's to October 2014, and describes the label's ten-year compilations.",
});

const dazed20 = source({
  binding: "interview",
  mediaType: "article",
  title: "Hyperdub at 20: a history of the pioneering London label",
  url: "https://www.dazeddigital.com/music/article/62258/1/hyperdub-at-20-an-oral-history-kode-9-jessy-lanza",
  publisher: "Dazed",
  publishedAt: "2024-03-28",
  authors: ["Sam Davies"],
  notes:
    "Oral history with Kode9, Jessy Lanza, Lee Gamble, aya, Heavee, and Loraine James; dates the webzine to 1999 and recounts the Burial demo CD arriving by post.",
});

const quietusKode9 = source({
  binding: "interview",
  mediaType: "article",
  title: "Hyperdub at 20 — Kode9 interview",
  url: "https://thequietus.com/articles/hyperdub-20th-anniversary-kode9-interview",
  publisher: "The Quietus",
  publishedAt: "2024",
  notes:
    "Twentieth-anniversary interview with Goodman on the label's trajectory and its continuing A&R instincts.",
});

const bbcHobbs = source({
  binding: "interview",
  mediaType: "audio",
  title: "Kode 9: Talking About Nothing — Mary Anne Hobbs",
  url: "https://www.bbc.co.uk/programmes/p039h76t",
  publisher: "BBC Radio 6 Music",
  publishedAt: "2015-11-28",
  notes:
    "Short radio interview in which Kode9 discusses the nothingness concepts behind his debut solo album.",
});

const p4kRashadInt = source({
  binding: "interview",
  mediaType: "article",
  title: "DJ Rashad — Pitchfork interview",
  url: "https://pitchfork.com/features/interview/9259-dj-rashad/",
  publisher: "Pitchfork",
  publishedAt: "2013",
  notes:
    "Interview around Double Cup: Rashad on footwork's widening palette and his work-in-progress DJ Spinn album for Hyperdub.",
});

// --- reporting -----------------------------------------------------------------

const rsTwenty = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub 20th Anniversary: How the UK Label Changed Electronic Music",
  url: "https://www.rollingstone.com/music/music-features/hyperdub-twentieth-anniversary-electronic-music-1234994506/",
  publisher: "Rolling Stone",
  publishedAt: "2024-03-26",
  authors: ["Arielle Lana LeJarde"],
  notes:
    "Retrospective dating the webzine to 1999, documenting the Groovetech 'Hyperdub Transmissions' era and the dubplate.net work, and crediting The Bug's advice with the 2004 label launch.",
});

const mixmagDecade = source({
  binding: "reporting",
  mediaType: "article",
  title: "Is Hyperdub the label of the decade? Vote now",
  url: "https://mixmag.net/read/is-hyperdub-the-label-of-the-decade-vote-now-e-j",
  publisher: "Mixmag",
  notes:
    "Mixmag's reader-poll pitch framing Hyperdub as a candidate for label of the decade — cited here as critical framing, not as an objective title.",
});

const mixmagInfluential = source({
  binding: "reporting",
  mediaType: "article",
  title: "15 of the most influential grime and dubstep labels of the last decade",
  url: "https://mixmag.net/feature/15-of-the-most-influential-grime-and-dubstep-labels-of-the-last-decade",
  publisher: "Mixmag",
  notes:
    "Listicle placing Hyperdub among the most influential grime/dubstep labels of the 2010s.",
});

const raLabel = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Hyperdub — Record label",
  url: "https://ra.co/labels/806",
  publisher: "Resident Advisor",
  notes:
    "RA's label profile: 'Label run by Kode9' — plus the catalog feed the site tracks.",
});

const raMonth = source({
  binding: "reporting",
  mediaType: "article",
  title: "Label of the month: Hyperdub",
  url: "https://ra.co/features/2029",
  publisher: "Resident Advisor",
  notes:
    "Resident Advisor's label-of-the-month feature profiling the label's first five years.",
});

const ra101 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub — Hyperdub 10.1 review",
  url: "https://ra.co/reviews/15061",
  publisher: "Resident Advisor",
  publishedAt: "2014-06-06",
  notes:
    "Review of the first tenth-anniversary compilation; describes the label tracing dubstep, UK funky, footwork, and grime, and the Teklife presence on the new-material disc.",
});

const raNothing = source({
  binding: "reporting",
  mediaType: "article",
  title: "Kode9 — Nothing review",
  url: "https://ra.co/reviews/18043",
  publisher: "Resident Advisor",
  publishedAt: "2015-11-24",
  notes:
    "Review noting Nothing is Goodman's first album without Stephen Samuel Gordon (The Spaceape), who died in late 2014, and its footwork inflections.",
});

const raInside = source({
  binding: "reporting",
  mediaType: "video",
  title: "Go inside Hyperdub",
  url: "https://ra.co/news/57576",
  publisher: "Resident Advisor",
  notes:
    "RA news item on its film featuring The Bug, Scratcha DVA, and Cooly G discussing their relationships with Kode9 and the label.",
});

const raAt10 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub at 10",
  url: "https://ra.co/news/61229",
  publisher: "Resident Advisor",
  publishedAt: "2014",
  notes:
    "RA pointer to Clash's tenth-birthday profile talking to Kode9, Cooly G, DVA, and Ikonika.",
});

const raPhoneglow = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial and Kode9 to release split 12-inch on Hyperdub",
  url: "https://ra.co/news/80823",
  publisher: "Resident Advisor",
  publishedAt: "2024-06",
  notes:
    "Announces the Phoneglow / Eyes Go Blank split 12-inch (June 18, 2024), references the 2018 joint Fabriclive 100 mix, and frames 2024 as the label's twentieth anniversary.",
});

const p4kUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial — Untrue review",
  url: "https://pitchfork.com/reviews/albums/10877-untrue/",
  publisher: "Pitchfork",
  publishedAt: "2007-11",
  notes:
    "Best New Music review (9.0) of the album that defined the label's public identity.",
});

const p4kUntrueImportant = source({
  binding: "reporting",
  mediaType: "article",
  title: "Why Burial's Untrue is the most important electronic album of the century so far",
  url: "https://pitchfork.com/features/article/why-burials-untrue-is-the-most-important-electronic-album-of-the-century-so-far/",
  publisher: "Pitchfork",
  publishedAt: "2017",
  notes:
    "Pitchfork's tenth-anniversary essay making the maximal critical claim for Untrue — a critic's framing, recorded as such.",
});

const p4k101 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Various Artists — Hyperdub 10.1 review",
  url: "https://pitchfork.com/reviews/albums/19356-hyperdub-101/",
  publisher: "Pitchfork",
  publishedAt: "2014-05-21",
  notes:
    "Review of the first anniversary compilation: 'an expansive and impressive look at what makes this hard-to-pigeonhole label consistently exciting.'",
});

const p4kTenNews = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub celebrates 10th anniversary with four compilations, international shows",
  url: "https://pitchfork.com/news/54638-hyperdub-celebrates-10th-anniversary-with-four-compilations-international-shows/",
  publisher: "Pitchfork",
  publishedAt: "2014",
  notes:
    "News post announcing the four-volume tenth-anniversary campaign and the global Ø party series.",
});

const p4k102 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub 10.2 — second 10th-anniversary compilation featuring Burial and DJ Rashad announced",
  url: "https://pitchfork.com/news/55449-hyperdub-102-second-10th-anniversary-compilation-featuring-burial-and-dj-rashad-announced/",
  publisher: "Pitchfork",
  publishedAt: "2014",
  notes: "Announcement of the second anniversary volume.",
});

const p4k103 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub announces Hyperdub 10.3 — third anniversary compilation featuring Burial, Dean Blunt, Laurel Halo and more",
  url: "https://pitchfork.com/news/56116-hyperdub-announces-hyperdub-103-the-third-10th-anniversary-compilation-featuring-burial-dean-blunt-laurel-halo-and-more/",
  publisher: "Pitchfork",
  publishedAt: "2014",
  notes:
    "Announcement of the third volume — one of the contemporaneous sources tying Dean Blunt and Laurel Halo to the label.",
});

const p4kLanza = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jessy Lanza — Pull My Hair Back review",
  url: "https://pitchfork.com/reviews/albums/18472-jessy-lanza-pull-my-hair-back/",
  publisher: "Pitchfork",
  publishedAt: "2013-09-12",
  notes:
    "Best New Music review of Lanza's Hyperdub debut, co-written and produced with Junior Boys' Jeremy Greenspan.",
});

const p4kRashad = source({
  binding: "reporting",
  mediaType: "article",
  title: "DJ Rashad — Double Cup review",
  url: "https://pitchfork.com/reviews/albums/18627-dj-rashad-double-cup/",
  publisher: "Pitchfork",
  publishedAt: "2013-10",
  notes:
    "Best New Music review; notes Rashad made his Hyperdub debut in March 2013 with the Rollin' EP.",
});

const p4kQuarantine = source({
  binding: "reporting",
  mediaType: "article",
  title: "Laurel Halo — Quarantine review",
  url: "https://pitchfork.com/reviews/albums/16692-quarantine/",
  publisher: "Pitchfork",
  publishedAt: "2012-06-07",
  notes:
    "Best New Music review of Halo's Hyperdub debut — the record The Wire later named release of the year for 2012.",
});

const p4kAsiatisch = source({
  binding: "reporting",
  mediaType: "article",
  title: "Fatima Al Qadiri — Asiatisch review",
  url: "https://pitchfork.com/reviews/albums/19318-fatima-al-qadiri-asiatisch/",
  publisher: "Pitchfork",
  publishedAt: "2014-05-07",
  notes:
    "Review of Al Qadiri's Hyperdub debut album, framed as a 'virtual road trip through imagined China.'",
});

const p4kBbf = source({
  binding: "reporting",
  mediaType: "article",
  title: "Babyfather — BBF Hosted by DJ Escrow review",
  url: "https://pitchfork.com/reviews/albums/21702-bbf-hosted-by-dj-escrow/",
  publisher: "Pitchfork",
  publishedAt: "2016-03-25",
  notes:
    "Review of the Dean Blunt project's Hyperdub album — the principal label release carrying Blunt's own name only indirectly.",
});

const p4kNothing = source({
  binding: "reporting",
  mediaType: "article",
  title: "Kode9 — Nothing review",
  url: "https://pitchfork.com/reviews/albums/21221-nothing/",
  publisher: "Pitchfork",
  publishedAt: "2015-11-18",
  notes:
    "Review of Kode9's first solo album, made after The Spaceape's death, with footwork bleeding through.",
});

const p4kAya = source({
  binding: "reporting",
  mediaType: "article",
  title: "aya — im hole review",
  url: "https://pitchfork.com/reviews/albums/aya-im-hole/",
  publisher: "Pitchfork",
  publishedAt: "2021-11-01",
  notes:
    "Review of aya's Hyperdub debut album — evidence of the label's 2020s roster direction.",
});

const fact5 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Various Artists — Hyperdub: 5 review",
  url: "https://www.factmag.com/2009/10/15/various-artists-hyperdub-5/",
  publisher: "FACT",
  publishedAt: "2009-10-15",
  authors: ["Robin Howells"],
  notes:
    "Review (8.5/10) of the fifth-anniversary compilation, surveying the label's 'distinct aura' across its first five years.",
});

const factDecade = source({
  binding: "reporting",
  mediaType: "article",
  title: "The 100 best albums of the decade",
  url: "https://www.factmag.com/2010/12/01/100-best-albums-of-the-decade/",
  publisher: "FACT",
  publishedAt: "2010-12-01",
  notes:
    "FACT's decade list, which placed Untrue among the era's top albums — part of the record for the album's canonization.",
});

const guardianUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial, Untrue — review",
  url: "https://www.theguardian.com/music/2007/nov/02/urban.electronicmusic",
  publisher: "The Guardian",
  publishedAt: "2007-11-02",
  authors: ["Dorian Lynskey"],
  notes: "Contemporaneous Guardian review of Untrue on Hyperdub.",
});

const guardianHancox = source({
  binding: "reporting",
  mediaType: "article",
  title: "Why Burial's Untrue is a masterpiece",
  url: "https://www.theguardian.com/music/musicblog/2009/nov/23/burial-untrue",
  publisher: "The Guardian",
  publishedAt: "2009-11-23",
  authors: ["Dan Hancox"],
  notes:
    "Guardian music-blog essay crystallizing Untrue's reputation two years after release.",
});

const guardianMyspace = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial unmasked — MySpace announcement",
  url: "https://www.theguardian.com/music/2008/aug/06/burial.myspace",
  publisher: "The Guardian",
  publishedAt: "2008-08-06",
  notes:
    "Report on Burial posting a photograph and statement on MySpace, ending the anonymity era the label had cultivated.",
});

const guardianSmart = source({
  binding: "reporting",
  mediaType: "article",
  title: "Gordon Smart can't find Burial",
  url: "https://www.theguardian.com/music/2008/aug/06/gordon.smart.cant.find.burial",
  publisher: "The Guardian",
  publishedAt: "2008-08-06",
  notes:
    "Report on The Sun's campaign to unmask Burial — the press hunt that preceded the artist's own self-disclosure.",
});

const guardianMercury = source({
  binding: "reporting",
  mediaType: "article",
  title: "Mercury music prize 2008 nominations",
  url: "https://www.theguardian.com/music/2008/jul/22/mercury.music.prize.2008.nominations",
  publisher: "The Guardian",
  publishedAt: "2008-07-22",
  notes:
    "The nominations list that made Burial — and by extension the label — mainstream news.",
});

const bbcMercury = source({
  binding: "reporting",
  mediaType: "article",
  title: "Elbow win Mercury music prize",
  url: "https://news.bbc.co.uk/2/hi/entertainment/7606963.stm",
  publisher: "BBC News",
  publishedAt: "2008-09",
  notes:
    "BBC's Mercury coverage noting Burial's nomination and his decision to reveal his identity after the nominations.",
});

const bbcUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial — Untrue — BBC Music review",
  url: "https://www.bbc.co.uk/music/reviews/c2w6/",
  publisher: "BBC",
  publishedAt: "2007",
  notes: "BBC's review of Untrue on Hyperdub.",
});

const tinymixUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial — Untrue review",
  url: "https://www.tinymixtapes.com/music-review/burial-untrue",
  publisher: "Tiny Mix Tapes",
  publishedAt: "2007",
  notes: "Contemporaneous review in the independent press canonizing the record.",
});

const ringerUntrue = source({
  binding: "reporting",
  mediaType: "article",
  title: "Untrue, ten years later",
  url: "https://www.theringer.com/music/2017/11/3/16601150/burial-untrue-10-year-anniversary",
  publisher: "The Ringer",
  publishedAt: "2017-11-03",
  notes: "Tenth-anniversary retrospective on the album's influence.",
});

const mixmagUntrue10 = source({
  binding: "reporting",
  mediaType: "article",
  title: "10 years on: 7 artists tell us how Burial's Untrue changed their lives",
  url: "https://mixmag.net/feature/10-years-on-7-artists-tell-us-how-burials-untrue-changed-their-lives",
  publisher: "Mixmag",
  publishedAt: "2017",
  notes:
    "Oral testimony from other artists on the record's influence — evidence of the album's standing beyond the label.",
});

const faderBurial = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial reveals himself, overuses the word 'tunes'",
  url: "https://www.thefader.com/2008/08/06/burial-reveals-himself-overuses-the-word-tunes",
  publisher: "The FADER",
  publishedAt: "2008-08-06",
  notes: "Contemporaneous report on the self-unmasking post.",
});

const viceUnmasking = source({
  binding: "reporting",
  mediaType: "article",
  title: "Ten years since Burial's unmasking",
  url: "https://www.vice.com/en/article/ten-years-since-burial-unmasking-essay/",
  publisher: "Vice",
  publishedAt: "2018",
  notes:
    "Retrospective essay on the 2008 unmasking and the culture of anonymity around the label's flagship artist.",
});

const xlr8rTwenty = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub turns 20",
  url: "https://xlr8r.com/features/hyperdub-turns-20/",
  publisher: "XLR8R",
  publishedAt: "2024",
  notes: "Twentieth-anniversary feature on the label's history and catalog.",
});

const ransomNote = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub to celebrate 20 years at Corsica Studios",
  url: "https://www.theransomnote.com/art-culture/events/hyperdub-to-celebrate-20-years-at-corsica-studios/",
  publisher: "Ransom Note",
  publishedAt: "2024",
  notes:
    "Announcement of the October 11, 2024 anniversary party with Kode9 and Lawrence Lek; recaps the roster's spread.",
});

const fiveMag = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub 20th Anniversary at Metro — July 20, 2024",
  url: "https://5mag.net/event/hyperdub-20th-anniversary-at-metro-july-20-2024/",
  publisher: "5 Magazine",
  publishedAt: "2024",
  notes:
    "Chicago anniversary event listing with Kode9, RP Boo, Jana Rush, and DJ Hank — evidence the footwork connection persisted into year twenty.",
});

const bpmFive = source({
  binding: "reporting",
  mediaType: "article",
  title: "Various Artists — 5: Five Years of Hyperdub review",
  url: "https://beatsperminute.com/album-review-various-artists-5-years-of-hyperdub/",
  publisher: "Beats Per Minute",
  publishedAt: "2009-11-25",
  authors: ["Andrew Ryce"],
  notes:
    "Review describing the label's arc from 'dank' dubstep roots to a 'renowned institution' for forward-thinking music.",
});

const allmusic5 = source({
  binding: "reporting",
  mediaType: "article",
  title: "5 Years of Hyperdub — AllMusic review",
  url: "https://www.allmusic.com/album/MW0001506132",
  publisher: "AllMusic",
  publishedAt: "2009",
  authors: ["Andy Kellman"],
  notes:
    "Review calling the compilation evidence for dubstep's 'supreme source' while noting how little of it is strictly dubstep.",
});

const irishtimes101 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hyperdub 10.1 — review",
  url: "https://www.irishtimes.com/culture/music/hyperdub-10-1-1.1810744",
  publisher: "The Irish Times",
  publishedAt: "2014-06-06",
  authors: ["Jim Carroll"],
  notes:
    "Review tying the anniversary compilation to the label's dubstep-to-elsewhere arc and to DJ Rashad, who 'died last month.'",
});

const consequenceInfirmary = source({
  binding: "reporting",
  mediaType: "article",
  title: "Burial and Kode9 share split EP Infirmary / Unknown Summer",
  url: "https://consequence.net/2023/07/burial-kode9-split-ep-infirmary-unknown-summer/",
  publisher: "Consequence",
  publishedAt: "2023-07",
  notes: "News on the 2023 Burial × Kode9 split EP on Hyperdub.",
});

const fabricInfirmary = source({
  binding: "reporting",
  mediaType: "article",
  title: "An opera written for the skies — Kode9 & Burial's Infirmary / Unknown Summer is out now",
  url: "https://www.fabriclondon.com/posts/an-opera-written-for-the-skies-kode9-burial-infirmary-unknown-summer-is-out-now",
  publisher: "fabric",
  publishedAt: "2023",
  notes:
    "fabric's write-up of the split EP — linking the release back to the pair's Fabriclive 100 mix.",
});

const quietusAya = source({
  binding: "reporting",
  mediaType: "article",
  title: "aya — im hole — album of the week review",
  url: "https://thequietus.com/quietus-reviews/album-of-the-week/aya-im-hole-review/",
  publisher: "The Quietus",
  publishedAt: "2021-10-21",
  authors: ["Jaša Bužinel"],
  notes:
    "Album-of-the-week review of aya's Hyperdub debut; part of the evidence for the label's 2020s direction.",
});

const quietusNothing = source({
  binding: "reporting",
  mediaType: "article",
  title: "Kode9 — Nothing review",
  url: "https://thequietus.com/quietus-reviews/kode9-nothing-review/",
  publisher: "The Quietus",
  publishedAt: "2015-10-20",
  authors: ["Joseph Burnett"],
  notes:
    "Review situating Nothing after the 2014 losses and tracing the roster's post-dubstep spread through Ikonika, Al Qadiri, Laurel Halo, and Fhloston Paradigm.",
});

// --- reference ------------------------------------------------------------------

const wikiHyperdub = source({
  binding: "reference",
  mediaType: "article",
  title: "Hyperdub",
  url: "https://en.wikipedia.org/wiki/Hyperdub",
  publisher: "Wikipedia",
  notes:
    "Reference summary: 'Founded 1999 (webzine), 2004 (label)', founder Steve Goodman a.k.a. Kode9, and a list of signed artists including Burial, Cooly G, Dean Blunt, DJ Rashad, DVA, Fatima Al Qadiri, Ikonika, Jessy Lanza, Klein, Laurel Halo, and Zomby.",
});

const wikiUntrue = source({
  binding: "reference",
  mediaType: "article",
  title: "Untrue (album)",
  url: "https://en.wikipedia.org/wiki/Untrue_(album)",
  publisher: "Wikipedia",
  notes:
    "Reference for the album's November 5, 2007 release on Hyperdub and its later list placements.",
});

const wikiKode9 = source({
  binding: "reference",
  mediaType: "article",
  title: "Kode9",
  url: "https://en.wikipedia.org/wiki/Kode9",
  publisher: "Wikipedia",
  notes:
    "Reference on Steve Goodman: Glasgow-born, PhD in philosophy, founded Hyperdub.",
});

const wikiQuarantine = source({
  binding: "reference",
  mediaType: "article",
  title: "Quarantine (Laurel Halo album)",
  url: "https://en.wikipedia.org/wiki/Quarantine_(Laurel_Halo_album)",
  publisher: "Wikipedia",
  notes:
    "Reference: Quarantine released by Hyperdub in May 2012 and named release of the year by The Wire.",
});

const wikidataHyperdub = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Hyperdub (Q2994824)",
  url: "https://www.wikidata.org/wiki/Q2994824",
  publisher: "Wikidata",
  notes:
    "Wikidata item for the label — 'UK-based record label focused on dubstep music.'",
});

const discogsHyp001 = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Kode9 + Daddi Gee — Sign Of The Dub / Stalker — Discogs master",
  url: "https://www.discogs.com/master/11487-Kode9-Daddi-Gee-Sign-Of-The-Dub-Stalker",
  publisher: "Discogs",
  notes:
    "Catalog record for the label's first release (HYP001, 2004): Kode9 with Daddi Gee, the vocalist later billed as The Spaceape.",
});

const discogsLabel = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Hyperdub — Discogs label page",
  url: "https://www.discogs.com/label/49-hyperdub",
  publisher: "Discogs",
  notes:
    "Community-maintained catalog record of the label's release history.",
});

const S = {
  siteHome: siteHome.id,
  siteArtists: siteArtists.id,
  siteHyp001: siteHyp001.id,
  siteSlb: siteSlb.id,
  siteBurial: siteBurial.id,
  blogHyp001: blogHyp001.id,
  blogUntrue: blogUntrue.id,
  bandcampUntrue: bandcampUntrue.id,
  bleep101: bleep101.id,
  redeyeNazar: redeyeNazar.id,
  eomsInterview: eomsInterview.id,
  vinylFactory: vinylFactory.id,
  elevKode9: elevKode9.id,
  c32Kode9: c32Kode9.id,
  guardianKode9: guardianKode9.id,
  mixmagQA: mixmagQA.id,
  xlr8rKode9: xlr8rKode9.id,
  dazed20: dazed20.id,
  quietusKode9: quietusKode9.id,
  bbcHobbs: bbcHobbs.id,
  p4kRashadInt: p4kRashadInt.id,
  rsTwenty: rsTwenty.id,
  mixmagDecade: mixmagDecade.id,
  mixmagInfluential: mixmagInfluential.id,
  raLabel: raLabel.id,
  raMonth: raMonth.id,
  ra101: ra101.id,
  raNothing: raNothing.id,
  raInside: raInside.id,
  raAt10: raAt10.id,
  raPhoneglow: raPhoneglow.id,
  p4kUntrue: p4kUntrue.id,
  p4kUntrueImportant: p4kUntrueImportant.id,
  p4k101: p4k101.id,
  p4kTenNews: p4kTenNews.id,
  p4k102: p4k102.id,
  p4k103: p4k103.id,
  p4kLanza: p4kLanza.id,
  p4kRashad: p4kRashad.id,
  p4kQuarantine: p4kQuarantine.id,
  p4kAsiatisch: p4kAsiatisch.id,
  p4kBbf: p4kBbf.id,
  p4kNothing: p4kNothing.id,
  p4kAya: p4kAya.id,
  fact5: fact5.id,
  factDecade: factDecade.id,
  guardianUntrue: guardianUntrue.id,
  guardianHancox: guardianHancox.id,
  guardianMyspace: guardianMyspace.id,
  guardianSmart: guardianSmart.id,
  guardianMercury: guardianMercury.id,
  bbcMercury: bbcMercury.id,
  bbcUntrue: bbcUntrue.id,
  tinymixUntrue: tinymixUntrue.id,
  ringerUntrue: ringerUntrue.id,
  mixmagUntrue10: mixmagUntrue10.id,
  faderBurial: faderBurial.id,
  viceUnmasking: viceUnmasking.id,
  xlr8rTwenty: xlr8rTwenty.id,
  ransomNote: ransomNote.id,
  fiveMag: fiveMag.id,
  bpmFive: bpmFive.id,
  allmusic5: allmusic5.id,
  irishtimes101: irishtimes101.id,
  consequenceInfirmary: consequenceInfirmary.id,
  fabricInfirmary: fabricInfirmary.id,
  quietusAya: quietusAya.id,
  quietusNothing: quietusNothing.id,
  wikiHyperdub: wikiHyperdub.id,
  wikiUntrue: wikiUntrue.id,
  wikiKode9: wikiKode9.id,
  wikiQuarantine: wikiQuarantine.id,
  wikidataHyperdub: wikidataHyperdub.id,
  discogsHyp001: discogsHyp001.id,
  discogsLabel: discogsLabel.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-hyperdub",
  generatedAt: "2026-10-05T08:30:00Z",
  subject: {
    kind: "organization",
    handle: "hyperdub",
    displayName: "Hyperdub",
    alsoKnownAs: ["Hyperdub Records"],
    summary:
      "London electronic-music record label founded in 2004 by Steve Goodman (Kode9) out of a webzine and radio project. It grew out of — and then redrew — the early dubstep scene: Burial's Untrue made it a landmark imprint, and its catalog has since stretched across UK bass, grime, footwork, ambient, and leftfield pop. Still run by Goodman two decades on.",
    identity: {
      wikidataId: "Q2994824",
      officialSite: "https://hyperdub.net/",
      wikipedia: "https://en.wikipedia.org/wiki/Hyperdub",
      profiles: [
        "https://ra.co/labels/806",
        "https://www.discogs.com/label/49-hyperdub",
      ],
    },
  },
  scope: {
    asOf: "2026-10-05T08:30:00Z",
    coverage: [
      "history",
      "roster",
      "catalog",
      "reception",
      "media",
    ],
  },
  sources: [
    siteHome,
    siteArtists,
    siteHyp001,
    siteSlb,
    siteBurial,
    blogHyp001,
    blogUntrue,
    bandcampUntrue,
    bleep101,
    redeyeNazar,
    eomsInterview,
    vinylFactory,
    elevKode9,
    c32Kode9,
    guardianKode9,
    mixmagQA,
    xlr8rKode9,
    dazed20,
    quietusKode9,
    bbcHobbs,
    p4kRashadInt,
    rsTwenty,
    mixmagDecade,
    mixmagInfluential,
    raLabel,
    raMonth,
    ra101,
    raNothing,
    raInside,
    raAt10,
    raPhoneglow,
    p4kUntrue,
    p4kUntrueImportant,
    p4k101,
    p4kTenNews,
    p4k102,
    p4k103,
    p4kLanza,
    p4kRashad,
    p4kQuarantine,
    p4kAsiatisch,
    p4kBbf,
    p4kNothing,
    p4kAya,
    fact5,
    factDecade,
    guardianUntrue,
    guardianHancox,
    guardianMyspace,
    guardianSmart,
    guardianMercury,
    bbcMercury,
    bbcUntrue,
    tinymixUntrue,
    ringerUntrue,
    mixmagUntrue10,
    faderBurial,
    viceUnmasking,
    xlr8rTwenty,
    ransomNote,
    fiveMag,
    bpmFive,
    allmusic5,
    irishtimes101,
    consequenceInfirmary,
    fabricInfirmary,
    quietusAya,
    quietusNothing,
    wikiHyperdub,
    wikiUntrue,
    wikiKode9,
    wikiQuarantine,
    wikidataHyperdub,
    discogsHyp001,
    discogsLabel,
  ],
  claims: [
    // -- facts ------------------------------------------------------------------
    {
      id: "claim-london-label",
      kind: "fact",
      text: "Hyperdub is a London-based electronic-music record label run by Steve Goodman, a.k.a. Kode9 — 'Label run by Kode9' is Resident Advisor's profile line, and the official site and store operate under his direction two decades on.",
      sourceIds: [S.siteHome, S.raLabel, S.wikiHyperdub],
    },
    {
      id: "claim-label-founded-2004",
      kind: "fact",
      text: "The record label launched in 2004: Goodman turned Hyperdub into an imprint to release his own 'Sine of the Dub' (HYP001, with vocalist Daddi Gee, later The Spaceape), after The Bug urged him — during an interview Goodman was conducting — to release it himself. Discogs and the label's own store both anchor HYP001 to 2004.",
      sourceIds: [
        S.blogHyp001,
        S.siteHyp001,
        S.discogsHyp001,
        S.eomsInterview,
        S.rsTwenty,
      ],
    },
    {
      id: "claim-webzine-date-disputed",
      kind: "fact",
      text: "The pre-label project's start date is genuinely unresolved in the record: Wikipedia, Dazed, and Rolling Stone describe a Hyperdub webzine founded in 1999; Hyperdub's own 2007 press-release archive says the project was 'set up in 2001'; a 2009 press interview has Goodman himself say he started the web magazine in 2001; other summaries say 2000. This index preserves all variants rather than picking one.",
      sourceIds: [
        S.wikiHyperdub,
        S.dazed20,
        S.rsTwenty,
        S.blogHyp001,
        S.eomsInterview,
      ],
    },
    {
      id: "claim-webzine-scope",
      kind: "fact",
      text: "Before it was a label, Hyperdub was an editorial project: a web magazine covering the Jamaican influence on London electronic music — dark garage, grime, and what would become dubstep — plus the 'Hyperdub Transmissions' show on Groovetech Radio around 2000–2001 and management work on dubplate.net for Ammunition, the crew behind Tempa and other early dubstep outlets.",
      sourceIds: [S.eomsInterview, S.rsTwenty, S.dazed20],
    },
    {
      id: "claim-burial-arrival",
      kind: "fact",
      text: "Burial arrived at the label as an unsolicited CD demo in the post; his first Hyperdub release was the South London Boroughs EP (HYP003, 2005), followed by the self-titled debut album in 2006 — which The Wire named album of the year.",
      sourceIds: [S.dazed20, S.siteSlb, S.wikiHyperdub],
    },
    {
      id: "claim-untrue-defining",
      kind: "fact",
      text: "Burial's second album, Untrue, was released by Hyperdub on November 5, 2007. It drew Best New Music marks at Pitchfork, a Guardian rave, and a BBC review at release, and later placements — FACT's decade list, a Pitchfork essay calling it 'the most important electronic album of the century so far' — made it the release most associated with the label.",
      sourceIds: [
        S.blogUntrue,
        S.wikiUntrue,
        S.p4kUntrue,
        S.guardianUntrue,
        S.bbcUntrue,
        S.factDecade,
        S.p4kUntrueImportant,
      ],
    },
    {
      id: "claim-mercury-unmasking",
      kind: "fact",
      text: "Untrue was nominated for the 2008 Mercury Prize; during the campaign The Sun's Gordon Smart publicly hunted for Burial's identity, and in August 2008 the artist posted a photograph and statement on MySpace, ending the anonymity himself. Elbow won the prize.",
      sourceIds: [
        S.guardianMercury,
        S.guardianSmart,
        S.guardianMyspace,
        S.faderBurial,
        S.bbcMercury,
      ],
    },
    {
      id: "claim-catalog-expansion",
      kind: "fact",
      text: "After the dubstep years the catalog widened deliberately: UK funky and 'wonky' (Cooly G, Ikonika, Zomby, Darkstar), Laurel Halo's Quarantine (2012, The Wire's release of the year), Jessy Lanza's electro-R&B (Pull My Hair Back, 2013), Chicago footwork via DJ Rashad's Rollin' EP (March 2013) and Double Cup (October 2013), and Fatima Al Qadiri's Asiatisch (2014).",
      sourceIds: [
        S.fact5,
        S.allmusic5,
        S.p4kQuarantine,
        S.wikiQuarantine,
        S.p4kLanza,
        S.p4kRashad,
        S.p4kAsiatisch,
        S.ra101,
      ],
    },
    {
      id: "claim-2014-losses",
      kind: "fact",
      text: "2014 was both the label's tenth-anniversary year and a year of losses: DJ Rashad died in April 2014 and The Spaceape (Stephen Samuel Gordon) died of cancer in October 2014 — deaths that shadowed the anniversary compilations and shaped Kode9's 2015 album Nothing.",
      sourceIds: [
        S.xlr8rKode9,
        S.mixmagQA,
        S.raNothing,
        S.irishtimes101,
        S.vinylFactory,
      ],
    },
    {
      id: "claim-tenth-anniversary",
      kind: "fact",
      text: "The label marked its tenth anniversary in 2014 with four themed compilations — Hyperdub 10.1 (May 19, 2014, catalog HDBCD025D), 10.2, 10.3, and a fourth volume — plus an international series of Ø-branded anniversary shows.",
      sourceIds: [
        S.p4kTenNews,
        S.bleep101,
        S.p4k102,
        S.p4k103,
        S.p4k101,
        S.ra101,
      ],
    },
    {
      id: "claim-aim-award",
      kind: "fact",
      text: "Kode9 received an Innovator award at the 2015 AIM Independent Music Awards, per Mixmag's Q&A — a trade-body recognition of the label's first decade.",
      sourceIds: [S.mixmagQA],
    },
    {
      id: "claim-nothing-album",
      kind: "fact",
      text: "Kode9's first solo album, Nothing, was released by Hyperdub in November 2015 — made in the wake of The Spaceape's death and built around zeroes, voids, and the fictional Nøtel; footwork rhythms run through it as a memorial trace of DJ Rashad.",
      sourceIds: [
        S.guardianKode9,
        S.p4kNothing,
        S.raNothing,
        S.quietusNothing,
        S.xlr8rKode9,
      ],
    },
    {
      id: "claim-fabriclive",
      kind: "fact",
      text: "Burial and Kode9 mixed Fabriclive 100 in 2018 — the final edition of the fabric mix series — a label-adjacent milestone tying the roster back to the London club institution.",
      sourceIds: [S.raPhoneglow, S.fabricInfirmary],
    },
    {
      id: "claim-roster-official",
      kind: "fact",
      text: "The label's own artists page lists a current roster spanning generations: founder Kode9 alongside Burial, Jessy Lanza, Fatima Al Qadiri, Laurel Halo, Dean Blunt, Ikonika, Cooly G, Zomby, DVA, Klein, Darkstar, aya, Proc Fiskal, Nazar, Loraine James, Foodman, Heavee, and others — a snapshot that mixes long-tenured artists with recent signings.",
      sourceIds: [S.siteArtists, S.wikiHyperdub],
    },
    {
      id: "claim-twentieth",
      kind: "fact",
      text: "The label turned twenty in 2024 with an oral history in Dazed, features in Rolling Stone and XLR8R, a Burial × Kode9 split 12-inch (Phoneglow / Eyes Go Blank, June 18, 2024), and anniversary shows including Corsica Studios in London and the Metro in Chicago with RP Boo, Jana Rush, and DJ Hank.",
      sourceIds: [
        S.dazed20,
        S.rsTwenty,
        S.xlr8rTwenty,
        S.raPhoneglow,
        S.ransomNote,
        S.fiveMag,
      ],
    },
    {
      id: "claim-dean-blunt-channel",
      kind: "fact",
      text: "Dean Blunt's presence on the label runs partly through aliases and compilations rather than a simple solo-album run: he appears on the anniversary compilations and on the roster page, while his Babyfather project's BBF Hosted by DJ Escrow was released on Hyperdub in April 2016. His better-known solo albums appeared elsewhere — Black Metal, notably, came out on Rough Trade, not Hyperdub.",
      sourceIds: [S.siteArtists, S.p4k103, S.p4kBbf],
    },
    // -- stated beliefs -----------------------------------------------------------
    {
      id: "claim-virus-metaphor",
      kind: "stated_belief",
      text: "Goodman has repeatedly framed the label as 'a virus' or 'a mutation of British electronic music, infected by Jamaican soundsystem culture' — dub and reggae through jungle to grime, dubstep, and funky — and describes music itself as transversal, 'like a cloud, or a virus that passes through populations.'",
      sourceIds: [S.eomsInterview, S.guardianKode9, S.c32Kode9],
    },
    {
      id: "claim-accidents",
      kind: "stated_belief",
      text: "Goodman describes the label's whole course as 'a series of accidents' — no grand plan, no A&R policy, no office; in 2009 he described it as essentially a one-man operation that had stumbled into defining a scene.",
      sourceIds: [S.eomsInterview],
    },
    {
      id: "claim-sonic-fiction",
      kind: "stated_belief",
      text: "The label's aesthetic is inseparable from Goodman's 'sonic fiction' framing — music as speculation about alternative histories and futures, an idea he developed in his academic writing and restates across interviews as the label's guiding sensibility.",
      sourceIds: [S.c32Kode9, S.elevKode9, S.vinylFactory],
    },
    {
      id: "claim-edge-of-tomorrow",
      kind: "stated_belief",
      text: "Asked at twenty years where the label sits, its roster frames the mission as 'making something on the edge of tomorrow' — a self-description of the label's forward-facing A&R rather than a settled genre home.",
      sourceIds: [S.dazed20],
    },
    // -- patterns ------------------------------------------------------------------
    {
      id: "claim-pattern-genre-incubator",
      kind: "pattern",
      text: "Across the critical record, Hyperdub is treated less as a genre label than as a succession of scenes it caught early: dubstep, post-dubstep/UK bass, UK funky, then footwork and leftfield pop — reviewers describe it 'always staying one step ahead' and hard to pigeonhole.",
      sourceIds: [
        S.ra101,
        S.mixmagInfluential,
        S.p4k101,
        S.bpmFive,
        S.allmusic5,
      ],
    },
    {
      id: "claim-pattern-label-of-decade",
      kind: "pattern",
      text: "The strongest critical framings — Mixmag's 'label of the decade' reader-vote pitch, Dazed's 'one of London's best-ever record labels,' Pitchfork's Untrue essay — are exactly that: critical framings. They are recorded here as reception, not as objective superlatives.",
      sourceIds: [S.mixmagDecade, S.dazed20, S.p4kUntrueImportant],
    },
    {
      id: "claim-pattern-anonymity",
      kind: "pattern",
      text: "Anonymity and mystique became part of the label's identity through Burial — the press hunt, the 2008 self-unmasking, and years of release-by-stealth — a pattern later retrospectives treat as foundational to the label's mystique rather than incidental to it.",
      sourceIds: [
        S.guardianSmart,
        S.guardianMyspace,
        S.viceUnmasking,
        S.p4kUntrueImportant,
      ],
    },
    {
      id: "claim-pattern-debut-to-standard",
      kind: "pattern",
      text: "A recurring pattern in the catalog: debut or breakthrough records on Hyperdub turned newcomers into reference points — South London Boroughs, Quarantine, Pull My Hair Back, Double Cup, Asiatisch — each reviewed as a scene-shifting first statement.",
      sourceIds: [
        S.dazed20,
        S.p4kQuarantine,
        S.p4kLanza,
        S.p4kRashad,
        S.p4kAsiatisch,
      ],
    },
    {
      id: "claim-pattern-tekbridge",
      kind: "pattern",
      text: "From 2013 the label functioned as a bridge between London bass culture and Chicago footwork: Rashad's releases, the Teklife stretch on the 10.1 compilation, and a Chicago anniversary bill (RP Boo, Jana Rush) eleven years later all mark the connection.",
      sourceIds: [S.p4kRashad, S.ra101, S.fiveMag, S.xlr8rKode9],
    },
    // -- speculation ----------------------------------------------------------------
    {
      id: "claim-spec-webzine-conflation",
      kind: "speculation",
      text: "The 1999/2000/2001 discrepancy may reflect genuinely different starts — a webzine, a radio show, and a 'project' framed differently across retellings — rather than one mistaken date; the sources do not say enough to choose, so the index treats the origin as a range.",
      sourceIds: [S.wikiHyperdub, S.blogHyp001, S.eomsInterview, S.rsTwenty],
    },
    {
      id: "claim-spec-burial-future",
      kind: "speculation",
      text: "Whether Burial remains an active roster presence or a legacy artist is unresolvable from public sources: the 2023–2024 split singles with Kode9 landed on the label, but the cadence and arrangement behind them are undocumented.",
      sourceIds: [S.raPhoneglow, S.consequenceInfirmary, S.siteBurial],
    },
  ],
  timeline: [
    {
      id: "event-webzine-start",
      kind: "project",
      date: "1999",
      title: "Hyperdub begins as a webzine — start year disputed",
      summary:
        "The pre-label project — a web magazine on Jamaican influence in UK electronic music — is dated 1999 by Wikipedia, Dazed, and Rolling Stone; the label's own 2007 press archive and Goodman's 2009 interview say 2001; other accounts say 2000. The project ran alongside the Hyperdub Transmissions show on Groovetech Radio around 2000–2001.",
      sourceIds: [
        S.wikiHyperdub,
        S.dazed20,
        S.rsTwenty,
        S.blogHyp001,
        S.eomsInterview,
      ],
    },
    {
      id: "event-label-founded",
      kind: "founded",
      date: "2004",
      title: "Kode9 turns Hyperdub into a record label",
      summary:
        "Acting on The Bug's advice to release his own track himself, Steve Goodman launches the label with HYP001 — 'Sine of the Dub' / 'Stalker' with Daddi Gee (The Spaceape).",
      location: "London",
      sourceIds: [
        S.blogHyp001,
        S.siteHyp001,
        S.discogsHyp001,
        S.eomsInterview,
        S.wikiHyperdub,
      ],
    },
    {
      id: "event-south-london-boroughs",
      kind: "publication",
      date: "2005",
      title: "Burial — South London Boroughs EP (HYP003)",
      summary:
        "The label's third release and Burial's first on Hyperdub — four tracks that began the partnership that defined the imprint.",
      sourceIds: [S.siteSlb, S.dazed20],
    },
    {
      id: "event-burial-debut",
      kind: "publication",
      date: "2006-05",
      title: "Burial's self-titled debut album",
      summary:
        "The first full-length on the label's roster beyond the founder's own work; The Wire named it album of the year.",
      sourceIds: [S.dazed20, S.wikiHyperdub],
    },
    {
      id: "event-memories",
      kind: "publication",
      date: "2006",
      title: "Kode9 & The Spaceape — Memories of the Future",
      summary:
        "The founder's first album-length statement with his signature vocalist — a core early catalog release.",
      sourceIds: [S.raNothing, S.quietusNothing],
    },
    {
      id: "event-untrue",
      kind: "publication",
      date: "2007-11-05",
      title: "Burial — Untrue released",
      summary:
        "The album that made the label a landmark: near-universal acclaim on release and a long afterlife of decade-list placements and 'most important electronic album of the century' framing.",
      sourceIds: [
        S.blogUntrue,
        S.wikiUntrue,
        S.p4kUntrue,
        S.guardianUntrue,
        S.bbcUntrue,
        S.bandcampUntrue,
      ],
    },
    {
      id: "event-mercury-nomination",
      kind: "award",
      date: "2008-07-22",
      title: "Untrue nominated for the Mercury Prize",
      summary:
        "The nomination turned the label's anonymous flagship artist into mainstream news; Elbow won that September.",
      sourceIds: [S.guardianMercury, S.bbcMercury],
    },
    {
      id: "event-burial-unmasked",
      kind: "milestone",
      date: "2008-08-06",
      title: "Burial ends his anonymity",
      summary:
        "After The Sun's public hunt for his identity, Burial posted a photograph and statement on MySpace — closing the anonymity era the label had been identified with.",
      sourceIds: [
        S.guardianMyspace,
        S.guardianSmart,
        S.faderBurial,
        S.viceUnmasking,
      ],
    },
    {
      id: "event-five-years",
      kind: "publication",
      date: "2009-10",
      title: "5: Five Years of Hyperdub",
      summary:
        "The two-disc fifth-anniversary compilation — one disc of new material, one of catalog highlights — across dubstep, UK funky, grime, and adjacent sounds.",
      sourceIds: [S.fact5, S.bpmFive, S.allmusic5, S.eomsInterview],
    },
    {
      id: "event-black-sun",
      kind: "publication",
      date: "2011",
      title: "Kode9 & The Spaceape — Black Sun",
      summary:
        "The duo's second album — the last full collaboration before The Spaceape's death in 2014.",
      sourceIds: [S.raNothing, S.quietusNothing],
    },
    {
      id: "event-quarantine",
      kind: "publication",
      date: "2012-05",
      title: "Laurel Halo — Quarantine",
      summary:
        "Halo's Hyperdub debut — named release of the year by The Wire — marks the label's move beyond bass-led club music into electronic pop and ambient.",
      sourceIds: [S.p4kQuarantine, S.wikiQuarantine],
    },
    {
      id: "event-rollin-ep",
      kind: "milestone",
      date: "2013-03",
      title: "DJ Rashad's Hyperdub debut — Rollin' EP",
      summary:
        "The Chicago footwork producer's first release on the label opens the Teklife chapter of the catalog.",
      sourceIds: [S.p4kRashad, S.p4kRashadInt],
    },
    {
      id: "event-pull-my-hair-back",
      kind: "publication",
      date: "2013-09",
      title: "Jessy Lanza — Pull My Hair Back",
      summary:
        "The Hamilton vocalist's debut with Junior Boys' Jeremy Greenspan — the label's clearest move toward leftfield pop/R&B.",
      sourceIds: [S.p4kLanza],
    },
    {
      id: "event-double-cup",
      kind: "publication",
      date: "2013-10",
      title: "DJ Rashad — Double Cup",
      summary:
        "Best New Music at Pitchfork and 'unquestionably the strongest footwork-related LP since the genre was introduced to a wider audience' — the release that carried Chicago footwork to Hyperdub's audience.",
      sourceIds: [S.p4kRashad, S.p4kRashadInt],
    },
    {
      id: "event-rashad-dies",
      kind: "milestone",
      date: "2014-04",
      title: "DJ Rashad dies",
      summary:
        "Rashad Harden died in April 2014, weeks before the tenth-anniversary compilations he appears on; the label and Teklife later marked his passing with tribute releases.",
      sourceIds: [S.xlr8rKode9, S.irishtimes101, S.vinylFactory],
    },
    {
      id: "event-ten-one",
      kind: "publication",
      date: "2014-05-19",
      title: "Hyperdub 10.1 — first of four anniversary compilations",
      summary:
        "Catalog HDBCD025D: the dancefloor-facing volume of a four-part tenth-anniversary series with new material from the Teklife crew among others.",
      sourceIds: [S.bleep101, S.p4k101, S.ra101, S.p4kTenNews],
    },
    {
      id: "event-spaceape-dies",
      kind: "milestone",
      date: "2014-10",
      title: "The Spaceape dies",
      summary:
        "Stephen Samuel Gordon — the voice of HYP001 and Kode9's longest-running collaborator — died of cancer in October 2014, in the middle of the label's anniversary year.",
      sourceIds: [S.xlr8rKode9, S.mixmagQA, S.raNothing],
    },
    {
      id: "event-aim-innovator",
      kind: "award",
      date: "2015",
      title: "Kode9 receives AIM Independent Music Awards Innovator award",
      summary:
        "Trade recognition for the founder's first decade running the label.",
      sourceIds: [S.mixmagQA],
    },
    {
      id: "event-nothing",
      kind: "publication",
      date: "2015-11",
      title: "Kode9 — Nothing",
      summary:
        "The founder's first solo album — made after The Spaceape's death, threaded with footwork rhythms in Rashad's absence.",
      sourceIds: [S.p4kNothing, S.raNothing, S.guardianKode9],
    },
    {
      id: "event-bbf",
      kind: "publication",
      date: "2016-04",
      title: "Babyfather — BBF Hosted by DJ Escrow",
      summary:
        "The Dean Blunt project's Hyperdub album — the principal label release under his orbit rather than his own name.",
      sourceIds: [S.p4kBbf],
    },
    {
      id: "event-fabriclive-100",
      kind: "publication",
      date: "2018",
      title: "Burial & Kode9 — Fabriclive 100",
      summary:
        "The pair mixed the final entry in fabric's mix series — a label moment at a London institution.",
      sourceIds: [S.raPhoneglow, S.fabricInfirmary],
    },
    {
      id: "event-im-hole",
      kind: "publication",
      date: "2021-10",
      title: "aya — im hole",
      summary:
        "aya's Hyperdub debut — a clothbound-book edition pairing lyrics-as-poetry with avant-club production; emblematic of the label's 2020s direction.",
      sourceIds: [S.p4kAya, S.quietusAya],
    },
    {
      id: "event-infirmary",
      kind: "publication",
      date: "2023-07",
      title: "Burial & Kode9 — Infirmary / Unknown Summer",
      summary:
        "A split EP pairing the label's founder and its flagship artist — the first of two such splits in the anniversary window.",
      sourceIds: [S.consequenceInfirmary, S.fabricInfirmary],
    },
    {
      id: "event-twentieth",
      kind: "milestone",
      date: "2024-03",
      title: "Twentieth-anniversary year begins",
      summary:
        "Oral histories and features in Dazed, Rolling Stone, XLR8R, and The Quietus mark twenty years of the label — with anniversary shows later in the year at Corsica Studios (October 11) and Chicago's Metro.",
      sourceIds: [
        S.dazed20,
        S.rsTwenty,
        S.xlr8rTwenty,
        S.quietusKode9,
        S.ransomNote,
        S.fiveMag,
      ],
    },
    {
      id: "event-phoneglow",
      kind: "publication",
      date: "2024-06-18",
      title: "Burial & Kode9 — Phoneglow / Eyes Go Blank",
      summary:
        "A second split 12-inch in the anniversary year — founder and flagship artist together again on the catalog.",
      sourceIds: [S.raPhoneglow],
    },
  ],
  themes: [
    {
      id: "theme-dub-continuum",
      kind: "philosophy",
      status: "stated",
      title: "The Jamaican-soundsystem lineage in London music",
      summary:
        "The webzine's editorial remit — and later the label's sonic premise — is the dub continuum running from reggae through jungle, garage, grime, and dubstep: bass-weight music as an inherited, mutating system rather than a genre.",
      sourceIds: [S.eomsInterview, S.rsTwenty, S.vinylFactory, S.c32Kode9],
    },
    {
      id: "theme-virus-mutation",
      kind: "belief",
      status: "stated",
      title: "Music as virus and mutation",
      summary:
        "Goodman's recurring self-description: the label as a mutation of British electronic music infected by soundsystem culture; music as 'transversal... a cloud, or a virus that passes through populations' — his academic sonic-warfare framing applied to A&R.",
      sourceIds: [S.eomsInterview, S.guardianKode9, S.c32Kode9],
    },
    {
      id: "theme-london-nocturne",
      kind: "interest",
      status: "reported",
      title: "London dread and the nocturnal city",
      summary:
        "Reviewers consistently locate the early catalog in a specifically London night — 'scuzzy works of dubstep... pervasive sense of Londonist dread,' the sound of the city's nightlife — an atmosphere set by HYP001 and Burial that the label's identity still trades on.",
      sourceIds: [S.dazed20, S.fact5, S.bpmFive, S.guardianUntrue],
    },
    {
      id: "theme-one-step-ahead",
      kind: "method",
      status: "reported",
      title: "Always one step ahead",
      summary:
        "The consistent critical read across fifteen years of reviews: the label abandons each genre home before it becomes a formula — dubstep to UK funky to footwork to ambient and leftfield pop — making unpredictability itself the house style.",
      sourceIds: [
        S.ra101,
        S.p4k101,
        S.allmusic5,
        S.quietusNothing,
        S.rsTwenty,
      ],
    },
    {
      id: "theme-anonymity-mystique",
      kind: "practice",
      status: "reported",
      title: "Anonymity and release-by-stealth",
      summary:
        "The Burial era established a pattern of withheld identity and low-announcement releases that became part of the label's mystique — a practice the 2008 unmasking ended for Burial but not for the label's broader culture of letting the music carry the signal.",
      sourceIds: [
        S.guardianSmart,
        S.guardianMyspace,
        S.viceUnmasking,
        S.faderBurial,
      ],
    },
    {
      id: "theme-accidents-curation",
      kind: "method",
      status: "stated",
      title: "A&R by accident and friendship",
      summary:
        "Goodman's own account has no master plan: the label grew from a demo in the post, a prompt from The Bug, and an open inbox — a deliberately small operation whose ear, not its infrastructure, is the organization.",
      sourceIds: [S.eomsInterview, S.rsTwenty, S.dazed20],
    },
    {
      id: "theme-footwork-bridge",
      kind: "influence",
      status: "reported",
      title: "Bridge to Chicago footwork",
      summary:
        "From Rashad's 2013 debut through the Teklife-heavy 10.1 disc and the 2024 Chicago anniversary bill, the label served as the UK institution most associated with carrying footwork to a wider audience — a role critics treat as part of its legacy.",
      sourceIds: [S.p4kRashad, S.ra101, S.fiveMag, S.mixmagQA],
    },
    {
      id: "theme-sonic-fiction",
      kind: "philosophy",
      status: "stated",
      title: "Sonic fiction and alternative histories",
      summary:
        "The intellectual frame Goodman brings from his writing: music as a technology for speculating on alternate pasts and futures — heard in catalog concepts from imagined China to the Nøtel to 'the edge of tomorrow.'",
      sourceIds: [S.c32Kode9, S.elevKode9, S.dazed20],
    },
  ],
  works: [
    {
      id: "work-webzine",
      kind: "project",
      status: "completed",
      title: "Hyperdub webzine and Hyperdub Transmissions",
      date: "1999",
      summary:
        "The pre-label editorial project — web magazine plus Groovetech radio slot — covering dark garage, grime, and proto-dubstep. Its start year is disputed (1999 vs. 2000 vs. 2001) and its archive is not publicly intact.",
      sourceIds: [S.wikiHyperdub, S.rsTwenty, S.eomsInterview, S.blogHyp001],
    },
    {
      id: "work-hyp001",
      kind: "recording",
      status: "released",
      title: "Kode9 + Daddi Gee — Sine of the Dub / Stalker (HYP001)",
      date: "2004",
      summary:
        "The first release: dub taken 'as subtraction about as far as it goes,' in FACT's phrase — and the accident that turned a webzine into a label.",
      sourceIds: [S.siteHyp001, S.discogsHyp001, S.blogHyp001, S.fact5],
    },
    {
      id: "work-untrue",
      kind: "recording",
      status: "released",
      title: "Burial — Untrue (HDBCD002)",
      date: "2007-11-05",
      summary:
        "The label's defining record: Mercury-nominated, canonized by decade lists and anniversary essays, and the release most responsible for the label's public standing.",
      sourceIds: [
        S.wikiUntrue,
        S.p4kUntrue,
        S.p4kUntrueImportant,
        S.factDecade,
        S.bandcampUntrue,
      ],
    },
    {
      id: "work-memories-of-the-future",
      kind: "recording",
      status: "released",
      title: "Kode9 & The Spaceape — Memories of the Future",
      date: "2006-10",
      summary:
        "The founder duo's first album — dub-poetry dread over Goodman's productions; the template for the label's earliest identity.",
      sourceIds: [S.raNothing, S.quietusNothing],
    },
    {
      id: "work-five-years",
      kind: "recording",
      status: "released",
      title: "5: Five Years of Hyperdub",
      date: "2009-10",
      summary:
        "The fifth-anniversary double compilation — the first stocktake of the catalog, with one disc of new material and one of highlights.",
      sourceIds: [S.fact5, S.bpmFive, S.allmusic5],
    },
    {
      id: "work-quarantine",
      kind: "recording",
      status: "released",
      title: "Laurel Halo — Quarantine",
      date: "2012-05",
      summary:
        "Halo's Hyperdub debut; The Wire's release of the year for 2012 — the record that signaled the label's post-dubstep range.",
      sourceIds: [S.p4kQuarantine, S.wikiQuarantine],
    },
    {
      id: "work-pull-my-hair-back",
      kind: "recording",
      status: "released",
      title: "Jessy Lanza — Pull My Hair Back",
      date: "2013-09",
      summary:
        "Lanza's debut with Jeremy Greenspan — glacial electro-R&B that widened the label toward pop.",
      sourceIds: [S.p4kLanza],
    },
    {
      id: "work-double-cup",
      kind: "recording",
      status: "released",
      title: "DJ Rashad — Double Cup",
      date: "2013-10",
      summary:
        "The footwork landmark on the label — the strongest footwork LP of its era per Pitchfork, and the release that welded Teklife to the catalog.",
      sourceIds: [S.p4kRashad, S.p4kRashadInt],
    },
    {
      id: "work-asiatisch",
      kind: "recording",
      status: "released",
      title: "Fatima Al Qadiri — Asiatisch",
      date: "2014-05",
      summary:
        "Al Qadiri's Hyperdub debut — a 'virtual road trip through imagined China'; the label's most explicitly conceptual full-length of the era.",
      sourceIds: [S.p4kAsiatisch],
    },
    {
      id: "work-ten-series",
      kind: "recording",
      status: "released",
      title: "Hyperdub 10.1 / 10.2 / 10.3 / 10.4",
      date: "2014",
      summary:
        "The four-volume tenth-anniversary series — catalog records, new material, and a global run of Ø anniversary shows — the label's self-curated canon.",
      sourceIds: [S.p4kTenNews, S.bleep101, S.p4k102, S.p4k103, S.p4k101],
    },
    {
      id: "work-nothing",
      kind: "recording",
      status: "released",
      title: "Kode9 — Nothing",
      date: "2015-11",
      summary:
        "The founder's first solo album, built from the year's losses — an elegy-shaped catalog entry rather than a genre exercise.",
      sourceIds: [S.p4kNothing, S.raNothing, S.guardianKode9],
    },
    {
      id: "work-bbf",
      kind: "recording",
      status: "released",
      title: "Babyfather — BBF Hosted by DJ Escrow",
      date: "2016-04",
      summary:
        "The Dean Blunt project's label album — a 23-track sprawl that carried the roster's most oblique sensibility.",
      sourceIds: [S.p4kBbf],
    },
    {
      id: "work-fabriclive-100",
      kind: "recording",
      status: "released",
      title: "Burial & Kode9 — Fabriclive 100",
      date: "2018-06",
      summary:
        "The label's founder and flagship artist mixed the hundredth and final Fabriclive CD.",
      sourceIds: [S.raPhoneglow, S.fabricInfirmary],
    },
    {
      id: "work-im-hole",
      kind: "recording",
      status: "released",
      title: "aya — im hole",
      date: "2021-10",
      summary:
        "aya's Hyperdub debut — album plus clothbound lyric book; a marker of the label's continuing appetite for unclassifiable British club music.",
      sourceIds: [S.p4kAya, S.quietusAya],
    },
    {
      id: "work-phoneglow",
      kind: "recording",
      status: "released",
      title: "Burial & Kode9 — Phoneglow / Eyes Go Blank",
      date: "2024-06-18",
      summary:
        "The twentieth-anniversary split 12-inch — the catalog's founding partnership still producing new material twenty years on.",
      sourceIds: [S.raPhoneglow],
    },
  ],
  appearances: [
    {
      id: "appearance-dazed-oral",
      title: "Hyperdub at 20: a history of the pioneering London label",
      venue: "Dazed",
      publishedAt: "2024-03-28",
      participants: [
        "Kode9",
        "Jessy Lanza",
        "Lee Gamble",
        "aya",
        "Heavee",
        "Loraine James",
      ],
      summary:
        "Oral history for the twentieth anniversary — founder and roster artists on the label's past, present, and 'edge of tomorrow' self-image.",
      media: [
        {
          type: "article",
          url: "https://www.dazeddigital.com/music/article/62258/1/hyperdub-at-20-an-oral-history-kode-9-jessy-lanza",
          sourceId: S.dazed20,
        },
      ],
      sourceIds: [S.dazed20],
    },
    {
      id: "appearance-vinylfactory",
      title: "Inside the sound of Hyperdub with Kode9",
      venue: "The Vinyl Factory",
      participants: ["Kode9"],
      summary:
        "Long-form label profile and interview covering the dub lineage and the roster.",
      media: [
        {
          type: "article",
          url: "https://www.thevinylfactory.com/features/inside-the-sound-of-hyperdub-with-kode9",
          sourceId: S.vinylFactory,
        },
      ],
      sourceIds: [S.vinylFactory],
    },
    {
      id: "appearance-guardian-nothing",
      title: "How dub master Kode9 became the hero of zero",
      venue: "The Guardian",
      publishedAt: "2015-11-16",
      participants: ["Kode9", "Tim Jonze"],
      summary:
        "The Nothing-era interview: zeroes, loss, and the philosophy the label runs on.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/music/2015/nov/16/kode9-nothing-album-steve-goodman-hyperdub-interview",
          sourceId: S.guardianKode9,
        },
      ],
      sourceIds: [S.guardianKode9],
    },
    {
      id: "appearance-mixmag-qa",
      title: "Q&A: Kode9",
      venue: "Mixmag",
      publishedAt: "2015-10-30",
      participants: ["Kode9", "Seb Wheeler"],
      summary:
        "Q&A on Nothing, footwork, the anniversary year, and the AIM Innovator award.",
      media: [
        {
          type: "article",
          url: "https://mixmag.net/feature/q-a-kode9",
          sourceId: S.mixmagQA,
        },
      ],
      sourceIds: [S.mixmagQA],
    },
    {
      id: "appearance-bbc-hobbs",
      title: "Kode 9: Talking About Nothing",
      venue: "BBC Radio 6 Music — Mary Anne Hobbs",
      publishedAt: "2015-11-28",
      participants: ["Kode9", "Mary Anne Hobbs"],
      summary:
        "Short broadcast interview on the nothingness concepts behind the solo album.",
      media: [
        {
          type: "audio",
          url: "https://www.bbc.co.uk/programmes/p039h76t",
          sourceId: S.bbcHobbs,
        },
      ],
      sourceIds: [S.bbcHobbs],
    },
    {
      id: "appearance-elevate",
      title: "Interview with Kode9",
      venue: "Elevate Festival",
      participants: ["Kode9"],
      summary:
        "Festival interview tying the label's aesthetic to sonic-fiction theory.",
      media: [
        {
          type: "article",
          url: "https://elevate.at/en/details/news/interview-with-kode9/",
          sourceId: S.elevKode9,
        },
      ],
      sourceIds: [S.elevKode9],
    },
    {
      id: "appearance-ra-film",
      title: "Go inside Hyperdub (RA film)",
      venue: "Resident Advisor",
      participants: ["The Bug", "Scratcha DVA", "Cooly G"],
      summary:
        "RA's film has The Bug, Scratcha DVA, and Cooly G discussing their relationships with Kode9 and the label on camera.",
      media: [
        {
          type: "video",
          url: "https://ra.co/news/57576",
          sourceId: S.raInside,
        },
      ],
      sourceIds: [S.raInside],
    },
    {
      id: "appearance-clash-at-10",
      title: "Hyperdub at 10 (Clash profile)",
      venue: "Clash via Resident Advisor",
      publishedAt: "2014",
      participants: ["Kode9", "Cooly G", "DVA", "Ikonika"],
      summary:
        "Tenth-birthday profile interviewing the founder and three roster artists.",
      media: [
        {
          type: "article",
          url: "https://ra.co/news/61229",
          sourceId: S.raAt10,
        },
      ],
      sourceIds: [S.raAt10],
    },
    {
      id: "appearance-quietus-20",
      title: "Hyperdub at 20 — Kode9 interview",
      venue: "The Quietus",
      publishedAt: "2024",
      participants: ["Kode9"],
      summary:
        "Anniversary interview on the label's continuing A&R instincts and trajectory.",
      media: [
        {
          type: "article",
          url: "https://thequietus.com/articles/hyperdub-20th-anniversary-kode9-interview",
          sourceId: S.quietusKode9,
        },
      ],
      sourceIds: [S.quietusKode9],
    },
    {
      id: "appearance-eoms-2009",
      title: "Steve Goodman on 5 years of Hyperdub",
      venue: "Press interview (reposted by E.O.M.S.)",
      publishedAt: "2009-11",
      participants: ["Kode9"],
      summary:
        "The fifth-anniversary press interview — source of the 2001 webzine date, the Bug prompt, and the 'series of accidents' self-description.",
      media: [
        {
          type: "article",
          url: "https://exileonmoanstreet.blogspot.com/2009/11/steve-goodman-kode9-on-5-years-of.html",
          sourceId: S.eomsInterview,
        },
      ],
      sourceIds: [S.eomsInterview],
    },
  ],
  relations: [
    {
      id: "rel-kode9-founder",
      kind: "founded_by",
      target: "kode9",
      targetName: "Kode9 (Steve Goodman)",
      targetKind: "person",
      targetWikidataId: "Q1394828",
      start: "2004",
      note:
        "Glasgow-born producer and theorist who founded the webzine and launched the label in 2004; still runs it.",
      sourceIds: [S.wikiHyperdub, S.raLabel, S.wikiKode9, S.eomsInterview],
    },
    {
      id: "rel-kode9-member",
      kind: "signed",
      target: "kode9",
      targetName: "Kode9 (Steve Goodman)",
      targetKind: "person",
      targetWikidataId: "Q1394828",
      start: "2004",
      note:
        "The founder is also on the official artist roster — HYP001 onward through Nothing and the Burial splits.",
      sourceIds: [S.siteArtists, S.siteHyp001],
    },
    {
      id: "rel-burial-member",
      kind: "signed",
      target: "burial",
      targetName: "Burial",
      targetKind: "person",
      targetWikidataId: "Q552245",
      start: "2005",
      note:
        "The label's flagship artist: South London Boroughs (2005), both studio albums, and the Kode9 splits; listed on the official roster and store.",
      sourceIds: [S.siteArtists, S.siteSlb, S.siteBurial, S.wikiHyperdub],
    },
    {
      id: "rel-the-spaceape-member",
      kind: "signed",
      target: "the-spaceape",
      targetName: "The Spaceape (Stephen Samuel Gordon)",
      targetKind: "person",
      start: "2004",
      end: "2014-10",
      note:
        "Vocalist on HYP001 (as Daddi Gee) and both Kode9 & The Spaceape albums; a roster mainstay until his death in October 2014.",
      sourceIds: [S.siteHyp001, S.discogsHyp001, S.xlr8rKode9, S.raNothing],
    },
    {
      id: "rel-jessy-lanza-member",
      kind: "signed",
      target: "jessy-lanza",
      targetName: "Jessy Lanza",
      targetKind: "person",
      targetWikidataId: "Q17004893",
      start: "2013",
      note:
        "Hamilton vocalist; Pull My Hair Back (2013) opened her run on the label; on the official roster and a Dazed anniversary participant.",
      sourceIds: [S.siteArtists, S.p4kLanza, S.dazed20],
    },
    {
      id: "rel-fatima-al-qadiri-member",
      kind: "signed",
      target: "fatima-al-qadiri",
      targetName: "Fatima Al Qadiri",
      targetKind: "person",
      targetWikidataId: "Q19938170",
      start: "2014",
      note:
        "Producer; the Asiatisch album (2014) and official roster listing document the affiliation.",
      sourceIds: [S.siteArtists, S.p4kAsiatisch, S.wikiHyperdub],
    },
    {
      id: "rel-laurel-halo-member",
      kind: "signed",
      target: "laurel-halo",
      targetName: "Laurel Halo",
      targetKind: "person",
      targetWikidataId: "Q6499818",
      start: "2012",
      note:
        "Quarantine (2012) was her Hyperdub debut; she also appears on the tenth-anniversary compilations and the official roster.",
      sourceIds: [S.siteArtists, S.p4kQuarantine, S.wikiQuarantine, S.p4k103],
    },
    {
      id: "rel-dean-blunt-member",
      kind: "signed",
      target: "dean-blunt",
      targetName: "Dean Blunt",
      targetKind: "person",
      targetWikidataId: "Q23055022",
      note:
        "On the official roster and the 10.3 compilation; his Babyfather project released BBF Hosted by DJ Escrow on the label in 2016. Solo albums appeared on other labels — the Hyperdub affiliation is real but oblique.",
      sourceIds: [S.siteArtists, S.p4k103, S.p4kBbf, S.wikiHyperdub],
    },
    {
      id: "rel-dj-rashad-member",
      kind: "signed",
      target: "dj-rashad",
      targetName: "DJ Rashad (Rashad Harden)",
      targetKind: "person",
      targetWikidataId: "Q16724355",
      start: "2013-03",
      end: "2014-04",
      note:
        "Chicago footwork producer; Rollin' EP (March 2013) and Double Cup made him the label's Teklife bridgehead until his death in April 2014.",
      sourceIds: [S.p4kRashad, S.p4kRashadInt, S.wikiHyperdub, S.xlr8rKode9],
    },
    {
      id: "rel-ikonika-member",
      kind: "signed",
      target: "ikonika",
      targetName: "Ikonika",
      targetKind: "person",
      targetWikidataId: "Q6350528",
      start: "2008",
      note:
        "Producer on the roster since the late-2000s singles era ('Please,' 'Idiot'); featured across the anniversary compilations and the official roster page.",
      sourceIds: [S.siteArtists, S.wikiHyperdub, S.fact5, S.ra101],
    },
    {
      id: "rel-cooly-g-member",
      kind: "signed",
      target: "cooly-g",
      targetName: "Cooly G",
      targetKind: "person",
      targetWikidataId: "Q108413748",
      start: "2009",
      note:
        "UK funky vocalist-producer; on the roster from the 'Weekend Fly' era, interviewed on camera for RA's label film, and still on the official artists page.",
      sourceIds: [S.siteArtists, S.wikiHyperdub, S.fact5, S.raInside],
    },
    {
      id: "rel-zomby-member",
      kind: "signed",
      target: "zomby",
      targetName: "Zomby",
      targetKind: "person",
      targetWikidataId: "Q4993203",
      start: "2008",
      note:
        "Anonymous producer whose early releases sat alongside Burial's in the catalog; listed among signed artists and on the official roster.",
      sourceIds: [S.siteArtists, S.wikiHyperdub, S.fact5],
    },
    {
      id: "rel-dva-member",
      kind: "signed",
      target: "dva",
      targetName: "DVA (Scratcha DVA)",
      targetKind: "person",
      note:
        "Producer and Rinse FM figure; listed among signed artists, appears on the anniversary compilations, and speaks on camera in RA's label film.",
      sourceIds: [S.wikiHyperdub, S.raInside, S.raAt10, S.fact5],
    },
    {
      id: "rel-klein-member",
      kind: "signed",
      target: "klein",
      targetName: "Klein",
      targetKind: "person",
      note:
        "London artist listed among the label's signed artists and on the official roster page.",
      sourceIds: [S.siteArtists, S.wikiHyperdub],
    },
    {
      id: "rel-darkstar-member",
      kind: "signed",
      target: "darkstar",
      targetName: "Darkstar",
      targetKind: "person",
      start: "2009",
      note:
        "Duo behind 'Aidy's Girl Is A Computer' on the fifth-anniversary compilation; on the official roster page.",
      sourceIds: [S.siteArtists, S.fact5, S.bpmFive],
    },
    {
      id: "rel-aya-member",
      kind: "signed",
      target: "aya",
      targetName: "aya (Aya Sinclair)",
      targetKind: "person",
      start: "2021",
      note:
        "Manchester/London artist whose debut album im hole (2021) arrived with a clothbound lyric book; on the official roster and the Dazed anniversary lineup.",
      sourceIds: [S.siteArtists, S.p4kAya, S.quietusAya, S.dazed20],
    },
    {
      id: "rel-proc-fiskal-member",
      kind: "signed",
      target: "proc-fiskal",
      targetName: "Proc Fiskal",
      targetKind: "person",
      note:
        "Edinburgh producer on the official roster; Hyperdub releases include the Insula and Siren Spine Sysex albums.",
      sourceIds: [S.siteArtists],
    },
    {
      id: "rel-nazar-member",
      kind: "signed",
      target: "nazar",
      targetName: "Nazar",
      targetKind: "person",
      start: "2018",
      note:
        "Angolan producer; the Enclave EP (HDB117, 2018) and Guerrilla album anchor his place on the roster.",
      sourceIds: [S.siteArtists, S.redeyeNazar],
    },
    {
      id: "rel-loraine-james-member",
      kind: "signed",
      target: "loraine-james",
      targetName: "Loraine James",
      targetKind: "person",
      targetWikidataId: "Q96620298",
      start: "2019",
      note:
        "London producer whose Hyperdub albums began with For You and I (2019); on the official roster and in the Dazed anniversary oral history.",
      sourceIds: [S.siteArtists, S.dazed20],
    },
    {
      id: "rel-foodman-member",
      kind: "signed",
      target: "foodman",
      targetName: "Foodman",
      targetKind: "person",
      note:
        "Nagoya footwork-adjacent producer on the official roster — part of the label's later-2010s international expansion.",
      sourceIds: [S.siteArtists],
    },
    {
      id: "rel-heavee-member",
      kind: "signed",
      target: "heavee",
      targetName: "Heavee",
      targetKind: "person",
      note:
        "Chicago footwork producer on the official roster; his 2024 releases and Dazed participation extend the Teklife thread into the label's twentieth year.",
      sourceIds: [S.siteArtists, S.dazed20, S.raPhoneglow],
    },
    {
      id: "rel-the-bug",
      kind: "influenced_by",
      target: "the-bug",
      targetName: "The Bug (Kevin Martin)",
      targetKind: "person",
      note:
        "During an interview Goodman was conducting with him, Martin urged him to release 'Sine of the Dub' himself — the prompt Goodman credits with the label's existence.",
      sourceIds: [S.eomsInterview, S.rsTwenty],
    },
    {
      id: "rel-teklife",
      kind: "collaborated",
      target: "teklife",
      targetName: "Teklife",
      targetKind: "organization",
      start: "2013",
      note:
        "Rashad's Chicago crew; its members (Spinn, Taso, DJ Earl, Heavee) appear across label releases and the 10.1 compilation — an affiliation, not a formal signing.",
      sourceIds: [S.p4kRashadInt, S.ra101, S.fiveMag],
    },
  ],
  openQuestions: [
    "The webzine/project start year is unresolved: 1999 (Wikipedia, Dazed, Rolling Stone), 2001 (the label's own 2007 press archive and Goodman's 2009 interview), and 2000 (secondary summaries) all circulate — and may describe different artifacts (webzine vs. radio show vs. 'project').",
    "The webzine itself is not publicly intact: no complete archive of the 1999–2004-era Hyperdub site or the Groovetech 'Hyperdub Transmissions' shows could be located, so its editorial record survives only in retellings.",
    "Roster semantics are loose: the official artists page mixes long-tenured artists, recent signings, and compilation participants — it does not distinguish 'signed to the label' from 'released on the label,' so member edges here are roster listings, not contract claims.",
    "Dean Blunt's relationship is oblique: roster listing, compilation appearances, and the Babyfather album are documented, but the framing of his affiliation (artist vs. project vs. collaborator) is not spelled out in any source.",
    "Ownership and business structure are undocumented in public sources — no filing, distribution contract, or staff list was located; the 'one-man operation' self-description dates to 2009 and may no longer be accurate.",
    "Burial's current status is ambiguous: the 2023–2024 splits with Kode9 are documented, but whether Burial is an active roster artist or an occasional collaborator is nowhere stated.",
    "Anniversary arithmetic is internally inconsistent: the label celebrated 'five years' in 2009 and 'twenty' in 2024 — counting from the 2004 label launch — while the 1999/2001 webzine origins would imply older milestones.",
  ],
  body: `Hyperdub is a London electronic-music label founded in 2004 by Steve Goodman, the producer and theorist who records as Kode9. It began as something else — a web magazine about the Jamaican influence on UK electronic music, later a radio slot — and its founding is one of the rare cases where the record itself disagrees about when the thing started: the label's own press archive says the project was set up in 2001, while Wikipedia, Dazed, and Rolling Stone date the webzine to 1999 and other accounts split the difference at 2000. What is not disputed is the label: in 2004, after The Bug told Goodman to release his own track himself, Hyperdub put out HYP001 — "Sine of the Dub" / "Stalker" by Kode9 with vocalist Daddi Gee, later known as The Spaceape.

## The Burial era

The label's third release was an unsolicited demo's payoff: Burial's South London Boroughs EP in 2005, then the self-titled debut in 2006, then Untrue in November 2007 — a record that turned a cult dubstep imprint into a landmark. Untrue was nominated for the 2008 Mercury Prize, was hunted by tabloids determined to name its anonymous maker (he unmasked himself on MySpace that August), and spent the next decade being canonized: FACT's decade list, Pitchfork's "most important electronic album of the century so far," anniversary essays at ten years. Hyperdub's public identity and Burial's anonymity-era mystique remain difficult to separate — even as the catalog long since moved past the sound that made them famous together.

## The widening

The fifth-anniversary compilation in 2009 documented a label already restless: dubstep had become UK funky, wonky, and things without names yet. What followed reads like a map of underground electronic music's next decade — Laurel Halo's Quarantine (2012, The Wire's release of the year), Jessy Lanza's electro-R&B debut Pull My Hair Back (2013), Fatima Al Qadiri's Asiatisch (2014), Dean Blunt's orbit through aliases and the Babyfather album (2016), and the Teklife bridge: DJ Rashad's Rollin' EP and Double Cup in 2013 carried Chicago footwork to the label's audience as directly as anything in its catalog. 2014 was the label's cruelest and biggest year — Rashad died in April, The Spaceape in October, and in between the label ran a four-compilation tenth-anniversary campaign with international shows. Kode9's first solo album, Nothing (2015), was made inside that loss.

## Twenty years

The label marked its twentieth anniversary in 2024 the way it marks things — with music rather than ceremony: a Burial × Kode9 split 12-inch, a second one from the Infirmary sessions, anniversary shows from Corsica Studios to Chicago's Metro, and a fresh generation on the roster — aya, Proc Fiskal, Nazar, Loraine James, Heavee — alongside the long-tenured names. The critical record is unusually warm (Mixmag floated it for label of the decade; Dazed calls it one of London's best-ever labels), but this index keeps those framings labeled as reception. The founder still runs it; the founding myth still includes a demonstration CD arriving in the post and a career built, by Goodman's own account, as "a series of accidents."

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
