#!/usr/bin/env bun
/** Generate examples/people/dan-snaith/person-index.json with derived source ids. */

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

// --- Subject-controlled -------------------------------------------------
const caribouFm = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Caribou / Daphni — official site",
  url: "https://caribou.fm/",
  publisher: "caribou.fm",
  notes: "The subject's official site for both Caribou and Daphni.",
});
const bandcampHoney = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Honey | Caribou",
  url: "https://caribouband.bandcamp.com/album/honey-2/",
  publisher: "Caribou on Bandcamp",
  publishedAt: "2024-10-04",
  notes:
    "The artist's own Bandcamp page for Honey; carries full credits including the MARRS and René & Angela samples and Kieran Hebden's co-arrangements.",
});
const dogDayPress = source({
  binding: "first_person",
  mediaType: "article",
  title: "Daphni shares two new singles 'Good Night Baby' and 'Talk To Me'",
  url: "https://dogdaypress.com/news/daphni-shares-two-new-singles-good-night-baby-and-talk-to-me/",
  publisher: "Dog Day Press",
  publishedAt: "2026-01",
  notes:
    "Snaith's press representative; quotes him directly on the Butterfly singles, the 17 January 2026 Daphni Essential Mix, and the NTS shows.",
});
const bbcEssential = source({
  binding: "first_person",
  mediaType: "audio",
  title: "Radio 1's Essential Mix — Caribou",
  url: "https://www.bbc.co.uk/programmes/b04kzsty",
  publisher: "BBC Radio 1",
  publishedAt: "2014-10",
  notes:
    "The October 2014 Essential Mix; the programme page carries Snaith's own note describing the mix and previewing new Daphni tracks.",
});

// --- Reference ----------------------------------------------------------
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Dan Snaith (Q1036131)",
  url: "https://www.wikidata.org/wiki/Q1036131",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Caribou (musician)",
  url: "https://en.wikipedia.org/wiki/Caribou_(musician)",
  publisher: "Wikipedia",
  notes: "Used for discovery and cross-checking, not as sole authority.",
});
const swimWikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Swim (Q3506590)",
  url: "https://www.wikidata.org/wiki/Q3506590",
  publisher: "Wikidata",
  notes: "Records the April 20, 2010 release date for Swim.",
});
const mathGenealogy = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Daniel Snaith — Mathematics Genealogy Project",
  url: "https://www.mathgenealogy.org/id.php?id=104299",
  publisher: "Mathematics Genealogy Project",
  notes:
    "Records the PhD as 'University of London 2005' under Kevin Mark Buzzard and titles the dissertation 'Overconvergent Siegel Modular Symbols'; Imperial College awarded University of London degrees at the time.",
});
const raDaphni = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Daphni — artist profile",
  url: "https://ra.co/dj/daphni",
  publisher: "Resident Advisor",
});
const allmusic = source({
  binding: "reference",
  mediaType: "article",
  title: "Manitoba — artist biography",
  url: "https://www.allmusic.com/artist/mn0000572114",
  publisher: "AllMusic",
  notes:
    "Biography of the Manitoba project covering the 2000 EP People Eating Fruit, the two Manitoba albums, and the forced rename.",
});

// --- Primary records ----------------------------------------------------
const ethos = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Overconvergent Siegel modular forms — EThOS thesis record",
  url: "https://ethos.bl.uk/OrderDetails.do?uin=uk.bl.ethos.420391",
  publisher: "British Library EThOS",
  notes:
    "Doctoral thesis record for Daniel Victor Snaith, Imperial College London, 2005; the EThOS title is 'Overconvergent Siegel modular forms', differing from the Mathematics Genealogy wording.",
});
const polaris = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Andorra — 2008 Winner",
  url: "https://polarismusicprize.ca/album/andorra/",
  publisher: "Polaris Music Prize",
});
const grammy = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Dan Snaith — artist page",
  url: "https://www.grammy.com/artists/caribou/19447/",
  publisher: "Recording Academy",
  notes:
    "Lists two nominations: Our Love (Best Dance/Electronic Album, 58th awards) and 'You Can Do It' (Best Dance/Electronic Recording, 2022).",
});
const juno = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Winners announced for the 2021 JUNO Opening Night Awards",
  url: "https://junoawards.ca/winners-announced-for-the-2021-juno-opening-night-awards-presented-by-music-canada/",
  publisher: "Juno Awards",
  publishedAt: "2021-06",
  notes: "Official winners announcement; Suddenly won Electronic Album of the Year.",
});
const bbcEssentialYear = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Radio 1's Essential Mix — The Essential Mix of the Year: Caribou",
  url: "https://www.bbc.co.uk/programmes/b04v8cj0",
  publisher: "BBC Radio 1",
  publishedAt: "2015-01",
  notes:
    "BBC programme page confirming Caribou's October 2014 mix won Essential Mix of the Year, as chosen by a panel of judges and dance-music editors.",
});
const mergeArtist = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Caribou — Merge Records artist page",
  url: "https://mergerecords.com/artist/caribou",
  publisher: "Merge Records",
});
const mergeOurLove = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Our Love — Merge Records",
  url: "https://mergerecords.com/product/our_love",
  publisher: "Merge Records",
  publishedAt: "2014-10-07",
  notes:
    "Label copy: Swim's album-of-the-year citations, 7.5-hour DJ sets, and the 2012 Radiohead tour invitation.",
});
const mergeHoney = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Honey — Merge Records",
  url: "https://mergerecords.com/product/honey",
  publisher: "Merge Records",
  publishedAt: "2024-10-04",
});

// --- Archive ------------------------------------------------------------
const thisMagazine = source({
  binding: "archive",
  mediaType: "article",
  title: "absolute copyright corrupts…",
  url: "https://this.org/2004/10/07/absolute-copyright-corrupts/",
  publisher: "This Magazine",
  publishedAt: "2004-10-07",
  notes:
    "Rehosts the 2004 press announcement that Manitoba would become Caribou following the US lawsuit, with Snaith's own quoted statement.",
});

// --- Interviews ---------------------------------------------------------
const cleveScene = source({
  binding: "interview",
  mediaType: "article",
  title: "Reindeer Games",
  url: "https://www.clevescene.com/music/reindeer-games-1490921/",
  publisher: "Cleveland Scene",
  publishedAt: "2005-06-01",
  authors: ["Andrew Miller"],
  notes:
    "Feature interview covering the lawsuit's cost ('thousands and thousands just to give in'), the bear-mask tours, and the rename.",
});
const tucsonWeekly = source({
  binding: "interview",
  mediaType: "article",
  title: "Crime Pays!",
  url: "https://www.tucsonweekly.com/music/crime-pays-1080357/",
  publisher: "Tucson Weekly",
  publishedAt: "2005-05-19",
  authors: ["Gene Armstrong"],
  notes:
    "Interview including Snaith's account of stealing a school sampler at 13 and the press-release line about declining to fund US lawyers.",
});
const rsBreaking = source({
  binding: "interview",
  mediaType: "article",
  title: "Breaking Artist: Caribou",
  url: "https://www.rollingstone.com/music/music-news/breaking-artist-caribou-99639/",
  publisher: "Rolling Stone",
  publishedAt: "2007-08-22",
  authors: ["Elizabeth Goodman"],
  notes:
    "Profile carrying the acid-trip naming anecdote, the mathematical family detail, and the math/music comparison quote.",
});
const pitchfork2010 = source({
  binding: "interview",
  mediaType: "article",
  title: "Interviews: Caribou",
  url: "https://pitchfork.com/features/interview/7785-caribou/",
  publisher: "Pitchfork",
  publishedAt: "2010",
  notes:
    "Swim-era interview: the 'liquid dance music' phrase and the abandoned plan to split dance tracks from the Caribou album.",
});
const raPodcast = source({
  binding: "interview",
  mediaType: "audio",
  title: "RA.246 Caribou",
  url: "https://ra.co/podcast/246",
  publisher: "Resident Advisor",
  publishedAt: "2011-02-14",
  notes:
    "Podcast mix plus Q&A; debuted five new tracks credited to Daphni, the first public use of the alias.",
});
const fact2012 = source({
  binding: "interview",
  mediaType: "article",
  title:
    "\"It isn't a particularly macho endeavour…\" Dan Snaith talks Daphni",
  url: "https://www.factmag.com/2012/10/01/it-isnt-a-particularly-macho-endeavour-dan-snaith-talks-daphni-his-reaction-to-the-edm-shooting-match/",
  publisher: "FACT Magazine",
  publishedAt: "2012-10-01",
  notes:
    "Daphni and Jiaolong interview; his reaction against aggressive EDM and his framing of the dance tradition he relates to.",
});
const xlr8r = source({
  binding: "interview",
  mediaType: "article",
  title: "Deep Inside: Daphni 'Jiaolong'",
  url: "https://xlr8r.com/features/deep-inside-daphni-jiaolong/",
  publisher: "XLR8R",
  publishedAt: "2012",
  notes:
    "Interview on the Daphni/Caribou split, the Text Records 'Ye Ye'/'Pinnacles' split with Four Tet, and why he started the Jiaolong label.",
});
const guardian2014 = source({
  binding: "interview",
  mediaType: "article",
  title: "Caribou: 'Dance music isn't just escapism. It's about life'",
  url: "https://www.theguardian.com/music/2014/oct/04/caribou-dance-music-isnt-just-escapism-its-about-life",
  publisher: "The Guardian",
  publishedAt: "2014-10-04",
});
const rsOurLove = source({
  binding: "interview",
  mediaType: "article",
  title: "Caribou's Psychedelic Journey Back to the Club for 'Our Love'",
  url: "https://www.rollingstone.com/music/music-features/caribous-psychedelic-journey-back-to-the-club-the-birth-of-our-love-72850/",
  publisher: "Rolling Stone",
  publishedAt: "2014",
  notes:
    "Our Love interview: the 'something for everybody' impulse, basement recording, and fatherhood's influence.",
});
const irishTimes = source({
  binding: "interview",
  mediaType: "article",
  title: "Our Love: Caribou's Dan Snaith on the new album",
  url: "https://www.irishtimes.com/culture/our-love-caribou-s-dan-snaith-on-the-new-album-1.1949689",
  publisher: "The Irish Times",
  publishedAt: "2014",
  authors: ["Jim Carroll"],
  notes:
    "Interview on the soul records behind Our Love and the deliberate no-PR spontaneity of the Daphni record.",
});
const esquire = source({
  binding: "interview",
  mediaType: "article",
  title: "Caribou's Dan Snaith On The Unexpected Twists Of New Album 'Suddenly'",
  url: "https://www.esquire.com/uk/culture/a31072446/caribou-suddenly-interview/",
  publisher: "Esquire (UK)",
  publishedAt: "2020-02-25",
  authors: ["Olivia Ovenden"],
  notes:
    "Interview covering the Suddenly title's origin (his daughter's new word, suggested by his wife) and the family events behind the record.",
});
const rsSuddenly = source({
  binding: "interview",
  mediaType: "article",
  title: "Caribou on the Joys and Sorrows Behind New Album 'Suddenly'",
  url: "https://www.rollingstone.com/music/music-features/caribou-suddenly-dan-snaith-interview-946860/",
  publisher: "Rolling Stone",
  publishedAt: "2020-02-04",
  authors: ["Simon Vozick-Levinson"],
  notes:
    "Interview on Suddenly: the jagged-edges approach, the basement schedule around two daughters, and 'I want it to sound like a hug.'",
});
const billboardSuddenly = source({
  binding: "interview",
  mediaType: "article",
  title: "Caribou's Dan Snaith on His New & Most Personal Album",
  url: "https://www.billboard.com/music/music-news/caribou-dan-snaith-interview-9324432/",
  publisher: "Billboard",
  publishedAt: "2020-02-27",
  notes:
    "Interview cataloguing the run of abrupt events behind Suddenly: a friend's death, a death in his wife's family, a divorce, his father's health crisis, and a daughter born in a car.",
});

// --- Reporting ------------------------------------------------------------
const spin2005 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caribou",
  url: "https://www.spin.com/2005/04/caribou/",
  publisher: "Spin",
  publishedAt: "2005-04",
  notes:
    "Review/feature on The Milk of Human Kindness and the forced rename from Manitoba.",
});
const cbcPolaris = source({
  binding: "reporting",
  mediaType: "article",
  title: "Polaris win 'completely overwhelms' solo act Caribou",
  url: "https://www.cbc.ca/news/entertainment/polaris-win-completely-overwhelms-solo-act-caribou-1.734926",
  publisher: "CBC News",
  publishedAt: "2008-09-30",
});
const billboardPolaris = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caribou's 'Andorra' Wins Polaris Music Prize",
  url: "https://www.billboard.com/music/music-news/caribous-andorra-wins-polaris-music-prize-1043936/",
  publisher: "Billboard",
  publishedAt: "2008-09-30",
  notes: "Includes Snaith's remark that he made Andorra 'at home in a bedroom.'",
});
const pitchforkJiaolong = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caribou's Dan Snaith Announces Daphni Album",
  url: "https://pitchfork.com/news/47242-caribous-dan-snaith-announces-daphni-album/",
  publisher: "Pitchfork",
  publishedAt: "2012",
});
const pitchforkSuddenly = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caribou: Suddenly — album review",
  url: "https://pitchfork.com/reviews/albums/caribou-suddenly/",
  publisher: "Pitchfork",
  publishedAt: "2020-03-02",
});
const guardianHoney = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caribou: Honey review — this AI-aided album is dubious on so many levels",
  url: "https://www.theguardian.com/music/2024/oct/03/caribou-honey-review-this-ai-aided-album-is-dubious-on-so-many-levels",
  publisher: "The Guardian",
  publishedAt: "2024-10-03",
  notes: "A sharply negative review of Honey's use of AI-processed vocals.",
});
const pitchforkHoney = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caribou: Honey — album review",
  url: "https://pitchfork.com/reviews/albums/caribou-honey/",
  publisher: "Pitchfork",
  publishedAt: "2024-10",
  authors: ["Shaad D'Souza"],
  notes:
    "Review reporting that all of Honey's vocals are Snaith's own, processed through AI voice tools; notes Snaith was not doing interviews for the record.",
});
const verge = source({
  binding: "reporting",
  mediaType: "article",
  title: "The new Caribou album is filled with AI vocal effects",
  url: "https://www.theverge.com/2024/10/7/24264796/the-new-caribou-album-is-filled-with-ai-vocal-effects",
  publisher: "The Verge",
  publishedAt: "2024-10-07",
});
const pitchforkButterfly = source({
  binding: "reporting",
  mediaType: "article",
  title: "Daphni Announces New Album Butterfly, Shares Songs",
  url: "https://pitchfork.com/news/daphni-announces-new-album-butterfly-shares-songs-listen/",
  publisher: "Pitchfork",
  publishedAt: "2025-11",
  notes:
    "Announcement of Butterfly for February 6, 2026 on Jiaolong, including 'Waiting So Long' billed as featuring Caribou.",
});
const allmusicJoliMai = source({
  binding: "reporting",
  mediaType: "article",
  title: "Daphni: Joli Mai — review",
  url: "https://www.allmusic.com/album/joli-mai-mw0003113447",
  publisher: "AllMusic",
  authors: ["Heather Phares"],
  notes:
    "Review confirming Joli Mai (October 6, 2017, Jiaolong) presents the tracks Snaith made for FabricLive.93 in full-length form.",
});

const S = {
  caribouFm: caribouFm.id,
  bandcampHoney: bandcampHoney.id,
  dogDayPress: dogDayPress.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  swimWikidata: swimWikidata.id,
  mathGenealogy: mathGenealogy.id,
  raDaphni: raDaphni.id,
  allmusic: allmusic.id,
  ethos: ethos.id,
  polaris: polaris.id,
  grammy: grammy.id,
  juno: juno.id,
  bbcEssential: bbcEssential.id,
  bbcEssentialYear: bbcEssentialYear.id,
  mergeArtist: mergeArtist.id,
  mergeOurLove: mergeOurLove.id,
  mergeHoney: mergeHoney.id,
  thisMagazine: thisMagazine.id,
  cleveScene: cleveScene.id,
  tucsonWeekly: tucsonWeekly.id,
  rsBreaking: rsBreaking.id,
  pitchfork2010: pitchfork2010.id,
  raPodcast: raPodcast.id,
  fact2012: fact2012.id,
  xlr8r: xlr8r.id,
  guardian2014: guardian2014.id,
  rsOurLove: rsOurLove.id,
  irishTimes: irishTimes.id,
  esquire: esquire.id,
  rsSuddenly: rsSuddenly.id,
  billboardSuddenly: billboardSuddenly.id,
  spin2005: spin2005.id,
  cbcPolaris: cbcPolaris.id,
  billboardPolaris: billboardPolaris.id,
  pitchforkJiaolong: pitchforkJiaolong.id,
  pitchforkSuddenly: pitchforkSuddenly.id,
  guardianHoney: guardianHoney.id,
  pitchforkHoney: pitchforkHoney.id,
  verge: verge.id,
  pitchforkButterfly: pitchforkButterfly.id,
  allmusicJoliMai: allmusicJoliMai.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-dan-snaith",
  generatedAt: "2026-09-17T01:00:00Z",
  subject: {
    kind: "person",
    handle: "dan-snaith",
    displayName: "Dan Snaith",
    alsoKnownAs: [
      "Daniel Victor Snaith",
      "Caribou",
      "Daphni",
      "Manitoba",
    ],
    summary:
      "Canadian electronic musician and mathematician who records as Caribou and Daphni — and, until a 2004 trademark dispute forced a rename, as Manitoba. He holds a PhD in mathematics from Imperial College London and founded the Jiaolong label.",
    identity: {
      wikidataId: "Q1036131",
      officialSite: "https://caribou.fm/",
      wikipedia: "https://en.wikipedia.org/wiki/Caribou_(musician)",
      profiles: [
        "https://caribouband.bandcamp.com/",
        "https://ra.co/dj/daphni",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T00:00:00Z",
    coverage: ["biography", "work", "beliefs", "media", "projects"],
  },
  sources: [
    caribouFm,
    bandcampHoney,
    dogDayPress,
    wikidata,
    wikipedia,
    swimWikidata,
    mathGenealogy,
    raDaphni,
    allmusic,
    ethos,
    polaris,
    grammy,
    juno,
    bbcEssential,
    bbcEssentialYear,
    mergeArtist,
    mergeOurLove,
    mergeHoney,
    thisMagazine,
    cleveScene,
    tucsonWeekly,
    rsBreaking,
    pitchfork2010,
    raPodcast,
    fact2012,
    xlr8r,
    guardian2014,
    rsOurLove,
    irishTimes,
    esquire,
    rsSuddenly,
    billboardSuddenly,
    spin2005,
    cbcPolaris,
    billboardPolaris,
    pitchforkJiaolong,
    pitchforkSuddenly,
    guardianHoney,
    pitchforkHoney,
    verge,
    pitchforkButterfly,
    allmusicJoliMai,
  ],
  claims: [
    {
      id: "claim-born-1978",
      kind: "fact",
      text: "Daniel Victor Snaith was born on March 29, 1978, and is from Dundas, Ontario, Canada.",
      sourceIds: [S.wikidata, S.wikipedia, S.cbcPolaris],
    },
    {
      id: "claim-mathematical-family",
      kind: "fact",
      text: "He comes from a family of mathematicians: his father is mathematician Victor Snaith and his sister Nina Snaith is also a mathematician; Rolling Stone reported that his father, mother, and sister all hold mathematics degrees.",
      sourceIds: [S.wikipedia, S.rsBreaking],
    },
    {
      id: "claim-move-london-2001",
      kind: "fact",
      text: "Snaith moved from Canada to London in 2001, initially to pursue a mathematics PhD at Imperial College London; he has remained based in London since.",
      sourceIds: [S.guardian2014],
    },
    {
      id: "claim-phd-2005",
      kind: "fact",
      text: "He completed a PhD in mathematics in 2005: the British Library EThOS catalog lists Daniel Victor Snaith's Imperial College London thesis 'Overconvergent Siegel modular forms', and the Mathematics Genealogy Project records his doctoral advisor as Kevin Buzzard.",
      sourceIds: [S.ethos, S.mathGenealogy, S.wikipedia],
    },
    {
      id: "claim-manitoba-early-releases",
      kind: "fact",
      text: "Recording as Manitoba, he released the debut EP People Eating Fruit in 2000, followed by the albums Start Breaking My Heart (2001) and Up in Flames (2003).",
      sourceIds: [S.allmusic, S.thisMagazine, S.wikipedia],
    },
    {
      id: "claim-manitoba-lawsuit",
      kind: "fact",
      text: "In 2004, Dictators frontman Richard 'Handsome Dick' Manitoba pursued a US trademark-infringement case over the Manitoba name; facing a court case he could not afford to lose, Snaith changed his recording name to Caribou and his previous albums were reissued under the new moniker.",
      sourceIds: [S.thisMagazine, S.cleveScene, S.spin2005, S.wikipedia],
    },
    {
      id: "claim-name-acid-trip",
      kind: "fact",
      text: "Snaith told Rolling Stone that the name Caribou came to him during an LSD trip in the Canadian prairies — in his telling, a bear appeared and told him to change his name.",
      sourceIds: [S.rsBreaking],
    },
    {
      id: "claim-milk-of-human-kindness",
      kind: "fact",
      text: "The first Caribou album, The Milk of Human Kindness, was released in 2005 on Domino, merging the Manitoba records' pastoral electronics with 1960s-indebted psychedelic pop.",
      sourceIds: [S.spin2005, S.cleveScene, S.wikipedia],
    },
    {
      id: "claim-andorra-polaris",
      kind: "fact",
      text: "Andorra (2007, City Slang/Merge) — which Snaith said he made 'at home in a bedroom' — won the third annual Polaris Music Prize on September 29, 2008, carrying a CA$20,000 award.",
      sourceIds: [S.polaris, S.cbcPolaris, S.billboardPolaris],
    },
    {
      id: "claim-swim-2010",
      kind: "fact",
      text: "Swim, his fifth studio album, was released April 20, 2010 on City Slang/Merge; it was shortlisted for the 2010 Polaris Music Prize and named album of the year by Resident Advisor, Mixmag, and Rough Trade.",
      sourceIds: [S.swimWikidata, S.wikipedia, S.raPodcast, S.mergeOurLove],
    },
    {
      id: "claim-daphni-debut-ra246",
      kind: "fact",
      text: "The Daphni alias debuted publicly on his Resident Advisor podcast RA.246 (February 14, 2011), which carried five new Snaith tracks credited to Daphni; the first Daphni 12-inch, JIAOLONG001, followed in 2011.",
      sourceIds: [S.raPodcast, S.xlr8r],
    },
    {
      id: "claim-jiaolong-label-founded",
      kind: "fact",
      text: "Snaith founded his own label, Jiaolong, in 2011, launching it with a Daphni 12-inch — inspired by how quickly the Text Records split single pairing his 'Ye Ye' with Four Tet's 'Pinnacles' had gone from pressing plant to shops.",
      sourceIds: [S.xlr8r],
    },
    {
      id: "claim-jiaolong-album-2012",
      kind: "fact",
      text: "The first Daphni album, Jiaolong, was released in October 2012 — October 16 in North America via Merge/Jiaolong and October 8 in Europe via Jiaolong.",
      sourceIds: [S.pitchforkJiaolong, S.xlr8r],
    },
    {
      id: "claim-radiohead-2012",
      kind: "fact",
      text: "In 2012 Caribou was personally invited to support Radiohead on the King of Limbs tour, while Snaith simultaneously toured clubs as a DJ under the Daphni alias.",
      sourceIds: [S.xlr8r, S.mergeOurLove, S.guardian2014],
    },
    {
      id: "claim-essential-mix-2014",
      kind: "fact",
      text: "His October 2014 BBC Radio 1 Essential Mix — recorded as Caribou and incorporating Daphni material and exclusive tracks from friends — was voted Essential Mix of the Year by a panel including Pete Tong and editors from Mixmag, DJ Magazine, Resident Advisor, and XLR8R.",
      sourceIds: [S.bbcEssential, S.bbcEssentialYear],
    },
    {
      id: "claim-our-love-2014",
      kind: "fact",
      text: "Our Love, released in October 2014 on Merge/City Slang, was shortlisted for the 2015 Polaris Music Prize and nominated for the Grammy Award for Best Dance/Electronic Album at the 58th Grammy Awards.",
      sourceIds: [S.mergeOurLove, S.grammy, S.wikipedia, S.rsOurLove],
    },
    {
      id: "claim-grammy-nominations",
      kind: "fact",
      text: "He holds two Grammy nominations: Our Love for Best Dance/Electronic Album (2016 awards) and 'You Can Do It' for Best Dance/Electronic Recording (2022 awards).",
      sourceIds: [S.grammy],
    },
    {
      id: "claim-fabriclive-jolimai",
      kind: "fact",
      text: "In 2017 he released FabricLive.93 — a FabricLive mix built largely from his own new Daphni material — followed by Joli Mai on his Jiaolong label on October 6, 2017, which presented those tracks in full-length form.",
      sourceIds: [S.allmusicJoliMai, S.wikipedia],
    },
    {
      id: "claim-suddenly-2020",
      kind: "fact",
      text: "Suddenly was released February 28, 2020 on City Slang/Merge; Snaith described it as his most personal album, shaped by a run of abrupt events — a friend's death, a death in his wife's family, a divorce in the family, his father's health crisis, and the birth of his second daughter in the back of a car.",
      sourceIds: [S.rsSuddenly, S.billboardSuddenly, S.esquire],
    },
    {
      id: "claim-juno-2021",
      kind: "fact",
      text: "Suddenly won the Juno Award for Electronic Album of the Year at the 2021 Juno Awards.",
      sourceIds: [S.juno],
    },
    {
      id: "claim-cherry-2022",
      kind: "fact",
      text: "Daphni's third album, Cherry, was released on October 7, 2022 on the Jiaolong label.",
      sourceIds: [S.raDaphni, S.pitchforkButterfly],
    },
    {
      id: "claim-honey-2024",
      kind: "fact",
      text: "Honey — billed as his eleventh studio album overall and sixth as Caribou — was released October 4, 2024 on City Slang/Merge.",
      sourceIds: [S.bandcampHoney, S.mergeHoney, S.wikipedia],
    },
    {
      id: "claim-honey-ai-vocals",
      kind: "fact",
      text: "Every vocal on Honey is Snaith's own, many processed through AI voice tools to sound like other singers and rappers — the record's most divisive feature in the press.",
      sourceIds: [S.pitchforkHoney, S.guardianHoney, S.verge],
    },
    {
      id: "claim-honey-credits",
      kind: "fact",
      text: "Per the album's official credits, Honey's 'Volume' samples MARRS's 'Pump Up the Volume' and 'Climbing' samples René & Angela's 'Just Friends'; 'Broke My Heart' and 'Honey' were arranged by Snaith with Kieran Hebden.",
      sourceIds: [S.bandcampHoney],
    },
    {
      id: "claim-butterfly-2026",
      kind: "fact",
      text: "Daphni's fourth album, Butterfly, was released February 6, 2026 on Jiaolong; the single 'Waiting So Long' is credited 'feat. Caribou' — the first Daphni track to carry Snaith's vocals, staged as a collaboration between his two aliases.",
      sourceIds: [S.pitchforkButterfly, S.dogDayPress],
    },
    {
      id: "claim-live-band",
      kind: "fact",
      text: "Caribou tours as a live band — Wikipedia lists the lineup as Snaith with Ryan Smith, Brad Weber, and John Schmersal — while Snaith performs DJ sets as Daphni.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-family",
      kind: "fact",
      text: "Snaith is married and has two daughters; Rolling Stone reported in 2014 that he had been married for 13 years, and the younger daughter was born in 2016.",
      sourceIds: [S.rsOurLove, S.rsSuddenly, S.wikipedia],
    },
    {
      id: "claim-marathon-dj-sets",
      kind: "fact",
      text: "Between Swim and Our Love, Snaith built a parallel reputation as a DJ, including sets as long as seven and a half hours.",
      sourceIds: [S.mergeOurLove],
    },
    {
      id: "claim-polaris-shortlists",
      kind: "fact",
      text: "Beyond Andorra's 2008 win, Swim and Our Love were each shortlisted for the Polaris Music Prize, in 2010 and 2015 respectively.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-dance-music-life",
      kind: "stated_belief",
      text: "Snaith has argued that 'dance music isn't just escapism — it's about life': the genre carries real emotional content rather than functioning purely as release.",
      sourceIds: [S.guardian2014],
    },
    {
      id: "claim-daphni-anti-macho",
      kind: "stated_belief",
      text: "He framed Daphni as a reaction to what he called the macho, super-aggressive wing of EDM — 'a shooting match of guys with electronic toys' — and aligned himself instead with the dance-music tradition that came out of predominantly gay clubs in New York.",
      sourceIds: [S.fact2012],
    },
    {
      id: "claim-math-music-abstractness",
      kind: "stated_belief",
      text: "He describes mathematics and music as sharing the same abstract play: 'It's all about playing around with ideas until you have a breakthrough.'",
      sourceIds: [S.rsBreaking],
    },
    {
      id: "claim-thesis-trivial",
      kind: "stated_belief",
      text: "He describes his own doctoral work with deliberate modesty as 'original, but I would still call it trivial.'",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-music-for-everybody",
      kind: "stated_belief",
      text: "Making Our Love, he says the impulse shifted to 'making something for everybody to listen to' — music for an audience and about his own life at once, a change he traces to the way Swim connected with listeners.",
      sourceIds: [S.rsOurLove, S.irishTimes],
    },
    {
      id: "claim-comforting-music",
      kind: "stated_belief",
      text: "Of Suddenly he said, 'I want the music to be comforting. I want it to sound like a hug.'",
      sourceIds: [S.rsSuddenly],
    },
    {
      id: "claim-lawsuit-disbelief",
      kind: "stated_belief",
      text: "Of the Manitoba lawsuit he said his 'immediate reaction was total disbelief,' but that 'faced with a court case that I couldn't afford to lose, I had no choice but to change the name.'",
      sourceIds: [S.thisMagazine],
    },
    {
      id: "claim-daphni-spontaneity",
      kind: "stated_belief",
      text: "He wanted the Daphni record to be 'the complete opposite' of the Caribou release machine — 'no plan, no PR, no advance planning' — a spontaneous counterweight to album campaigns.",
      sourceIds: [S.irishTimes],
    },
    {
      id: "claim-soul-at-home",
      kind: "stated_belief",
      text: "He traces Our Love's classic-soul influence to domestic life: putting on Marvin Gaye, Sly Stone, and Stevie Wonder records while playing with his young daughter.",
      sourceIds: [S.irishTimes],
    },
    {
      id: "claim-hates-naming",
      kind: "stated_belief",
      text: "He says he hates naming songs and albums and leaves titles until the music is finished; 'Suddenly' was his toddler daughter's favourite new word, suggested as a title by his wife.",
      sourceIds: [S.esquire],
    },
    {
      id: "claim-pattern-reinvention",
      kind: "pattern",
      text: "Across two decades each album has been a deliberate sonic reset — IDM pastoralia, psychedelic pop, 'liquid dance music', soul-inflected house, sample-chopped collage, AI-voiced club tracks — rather than iteration on a signature sound.",
      sourceIds: [S.spin2005, S.pitchfork2010, S.pitchforkSuddenly, S.mergeHoney],
    },
    {
      id: "claim-pattern-dual-aliases",
      kind: "pattern",
      text: "He sustains two parallel practices — Caribou as the composed, vocal, band-touring project and Daphni as the impulsive dancefloor/DJ project — with Swim, Honey, and Butterfly each publicly blurring the line between them.",
      sourceIds: [S.xlr8r, S.fact2012, S.mergeHoney, S.pitchforkButterfly],
    },
    {
      id: "claim-pattern-home-recording",
      kind: "pattern",
      text: "He writes and records alone at home — Andorra 'in a bedroom,' Our Love and Suddenly in the basement of his London house — fitting music around family life rather than a commercial-studio schedule.",
      sourceIds: [S.billboardPolaris, S.rsOurLove, S.rsSuddenly],
    },
    {
      id: "claim-pattern-fast-release",
      kind: "pattern",
      text: "Through Jiaolong he favours rapid, low-ceremony release for dance music — white-label 12-inches sent to the pressing plant within days, surprise EPs — reserving long campaigns for Caribou albums.",
      sourceIds: [S.xlr8r, S.irishTimes, S.raDaphni],
    },
    {
      id: "claim-pattern-voice-material",
      kind: "pattern",
      text: "His records keep re-siting his own voice as raw material: the wavering falsetto that defined Caribou, chopped soul samples on Suddenly, AI-shifted singers on Honey, and 'feat. Caribou' billing on a Daphni single.",
      sourceIds: [S.pitchforkSuddenly, S.pitchforkHoney, S.pitchforkButterfly],
    },
    {
      id: "claim-spec-thesis-title",
      kind: "speculation",
      text: "The thesis title is recorded inconsistently: the British Library catalog reads 'Overconvergent Siegel modular forms' while the Mathematics Genealogy Project and Wikipedia give 'Overconvergent Siegel Modular Symbols'; the underlying doctorate — 2005, under Kevin Buzzard — is the same.",
      sourceIds: [S.ethos, S.mathGenealogy, S.wikipedia],
    },
    {
      id: "claim-spec-lawsuit-filed-or-threatened",
      kind: "speculation",
      text: "Sources differ on whether Handsome Dick Manitoba's action was a filed suit or a threat of one — the 2004 announcement says he 'sued,' Wikipedia says 'threatened with a lawsuit' — and the settlement terms were never made public.",
      sourceIds: [S.thisMagazine, S.wikipedia, S.cleveScene],
    },
    {
      id: "claim-spec-ai-motivation",
      kind: "speculation",
      text: "Coverage frames Honey's AI vocals both as a fix for Snaith's limited natural singing range and as a deliberate extension of his toolset; whether necessity or experiment drove the choice is not settled by the record.",
      sourceIds: [S.pitchforkHoney, S.guardianHoney, S.verge],
    },
    {
      id: "claim-spec-acid-anecdote",
      kind: "speculation",
      text: "The acid-trip naming story — a bear telling him to take the name Caribou — is Snaith's own oft-retold anecdote and is not independently verifiable.",
      sourceIds: [S.rsBreaking],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1978-03-29",
      title: "Born Daniel Victor Snaith",
      summary: "Born in Dundas, Ontario, into a family of mathematicians.",
      location: "Dundas, Ontario, Canada",
      sourceIds: [S.wikidata, S.wikipedia],
    },
    {
      id: "event-people-eating-fruit",
      kind: "publication",
      date: "2000",
      title: "People Eating Fruit EP as Manitoba",
      summary: "Debut release under the Manitoba name.",
      sourceIds: [S.allmusic, S.wikipedia],
    },
    {
      id: "event-start-breaking-my-heart",
      kind: "publication",
      date: "2001",
      title: "Start Breaking My Heart",
      summary: "First Manitoba album, released on The Leaf Label.",
      sourceIds: [S.thisMagazine, S.allmusic, S.wikipedia],
    },
    {
      id: "event-move-london",
      kind: "milestone",
      date: "2001",
      title: "Moved to London for a mathematics PhD",
      summary:
        "Relocated from Canada to London, initially to pursue doctoral study in mathematics at Imperial College.",
      location: "London, United Kingdom",
      sourceIds: [S.guardian2014],
    },
    {
      id: "event-up-in-flames",
      kind: "publication",
      date: "2003",
      title: "Up in Flames",
      summary:
        "Second Manitoba album; toured through 2004 with Stereolab, Four Tet, Broadcast, and Prefuse 73.",
      sourceIds: [S.thisMagazine, S.allmusic],
    },
    {
      id: "event-manitoba-to-caribou",
      kind: "milestone",
      date: "2004",
      title: "Manitoba becomes Caribou",
      summary:
        "After a US trademark action by Dictators frontman Richard 'Handsome Dick' Manitoba, Snaith announced the name change; earlier albums were reissued as Caribou.",
      sourceIds: [S.thisMagazine, S.cleveScene, S.spin2005],
    },
    {
      id: "event-phd",
      kind: "education",
      date: "2005",
      title: "PhD in mathematics",
      summary:
        "Doctorate in mathematics at Imperial College London under Kevin Buzzard, on overconvergent Siegel modular forms.",
      organization: "Imperial College London",
      organizationHandle: "imperial-college-london",
      sourceIds: [S.ethos, S.mathGenealogy, S.wikipedia],
    },
    {
      id: "event-milk-of-human-kindness",
      kind: "publication",
      date: "2005",
      title: "The Milk of Human Kindness",
      summary: "First album under the Caribou name, released on Domino.",
      sourceIds: [S.spin2005, S.cleveScene, S.wikipedia],
    },
    {
      id: "event-andorra",
      kind: "publication",
      date: "2007",
      title: "Andorra",
      summary:
        "Second Caribou album, made 'at home in a bedroom' on City Slang/Merge.",
      sourceIds: [S.polaris, S.billboardPolaris],
    },
    {
      id: "event-polaris-2008",
      kind: "award",
      date: "2008-09-29",
      title: "Won the 2008 Polaris Music Prize",
      summary:
        "Andorra took the third annual Polaris Music Prize at the Phoenix Concert Theatre in Toronto, a CA$20,000 award.",
      location: "Toronto, Canada",
      organization: "Polaris Music Prize",
      organizationHandle: "polaris-music-prize",
      sourceIds: [S.polaris, S.cbcPolaris, S.billboardPolaris],
    },
    {
      id: "event-swim",
      kind: "publication",
      date: "2010-04-20",
      title: "Swim",
      summary:
        "The 'liquid dance music' album: shortlisted for the 2010 Polaris Music Prize and named album of the year by Resident Advisor, Mixmag, and Rough Trade.",
      sourceIds: [S.swimWikidata, S.raPodcast, S.mergeOurLove, S.wikipedia],
    },
    {
      id: "event-ra246",
      kind: "media",
      date: "2011-02-14",
      title: "RA.246 mix debuts the Daphni alias",
      summary:
        "His Resident Advisor podcast carried five new tracks credited to the then-unannounced name Daphni.",
      sourceIds: [S.raPodcast],
    },
    {
      id: "event-jiaolong-label",
      kind: "founded",
      date: "2011",
      title: "Founded the Jiaolong label",
      summary:
        "Launched his own imprint with a Daphni 12-inch after the frictionless Text Records split single with Four Tet.",
      sourceIds: [S.xlr8r],
    },
    {
      id: "event-jiaolong-album",
      kind: "publication",
      date: "2012-10-16",
      title: "Daphni — Jiaolong",
      summary: "First album as Daphni, released via Merge/Jiaolong.",
      sourceIds: [S.pitchforkJiaolong, S.xlr8r],
    },
    {
      id: "event-radiohead-tour",
      kind: "role",
      date: "2012",
      title: "Supported Radiohead on the King of Limbs tour",
      summary:
        "Caribou was personally invited to open Radiohead's 2012 arena dates while Snaith DJed as Daphni.",
      sourceIds: [S.xlr8r, S.mergeOurLove, S.guardian2014],
    },
    {
      id: "event-essential-mix",
      kind: "media",
      date: "2014-10",
      title: "BBC Radio 1 Essential Mix",
      summary:
        "Two-hour mix under the Caribou name incorporating new Daphni tracks and exclusive music from friends.",
      organization: "BBC Radio 1",
      organizationHandle: "bbc-radio-1",
      sourceIds: [S.bbcEssential],
    },
    {
      id: "event-our-love",
      kind: "publication",
      date: "2014-10-07",
      title: "Our Love",
      summary:
        "Fourth Caribou album; shortlisted for the 2015 Polaris Music Prize and Grammy-nominated for Best Dance/Electronic Album.",
      sourceIds: [S.mergeOurLove, S.rsOurLove, S.grammy],
    },
    {
      id: "event-essential-mix-of-year",
      kind: "award",
      date: "2015-01",
      title: "Essential Mix of the Year",
      summary:
        "The October 2014 mix was voted BBC Radio 1's Essential Mix of the Year by a panel of judges and dance-music editors.",
      organization: "BBC Radio 1",
      organizationHandle: "bbc-radio-1",
      sourceIds: [S.bbcEssentialYear],
    },
    {
      id: "event-fabriclive-93",
      kind: "publication",
      date: "2017-07-21",
      title: "Daphni — FabricLive.93",
      summary:
        "A FabricLive mix built largely from his own new Daphni productions.",
      organization: "Fabric",
      organizationHandle: "fabric",
      sourceIds: [S.allmusicJoliMai, S.wikipedia],
    },
    {
      id: "event-joli-mai",
      kind: "publication",
      date: "2017-10-06",
      title: "Daphni — Joli Mai",
      summary:
        "Second Daphni album on Jiaolong, presenting the FabricLive.93 material in full-length form.",
      sourceIds: [S.allmusicJoliMai, S.wikipedia],
    },
    {
      id: "event-suddenly",
      kind: "publication",
      date: "2020-02-28",
      title: "Suddenly",
      summary:
        "Fifth Caribou album, framed as his most personal record after years of abrupt family events.",
      sourceIds: [S.rsSuddenly, S.billboardSuddenly],
    },
    {
      id: "event-juno-2021",
      kind: "award",
      date: "2021-06",
      title: "Juno Award for Electronic Album of the Year",
      summary: "Suddenly won at the 2021 Juno Awards.",
      organization: "Juno Awards",
      organizationHandle: "juno-awards",
      sourceIds: [S.juno],
    },
    {
      id: "event-cherry",
      kind: "publication",
      date: "2022-10-07",
      title: "Daphni — Cherry",
      summary: "Third Daphni album, released on Jiaolong.",
      sourceIds: [S.raDaphni, S.pitchforkButterfly],
    },
    {
      id: "event-honey",
      kind: "publication",
      date: "2024-10-04",
      title: "Honey",
      summary:
        "Sixth Caribou album on City Slang/Merge; every vocal is Snaith's own, many transformed by AI voice tools.",
      sourceIds: [S.bandcampHoney, S.mergeHoney, S.pitchforkHoney],
    },
    {
      id: "event-butterfly",
      kind: "publication",
      date: "2026-02-06",
      title: "Daphni — Butterfly",
      summary:
        "Fourth Daphni album on Jiaolong, including 'Waiting So Long (feat. Caribou)' — the first Daphni track with Snaith's vocals.",
      sourceIds: [S.pitchforkButterfly, S.dogDayPress],
    },
  ],
  themes: [
    {
      id: "theme-math-to-music",
      kind: "influence",
      status: "reported",
      title: "The mathematician who left for the studio",
      summary:
        "Son and brother of mathematicians, Snaith completed a 2005 doctorate on overconvergent Siegel modular forms under Kevin Buzzard at Imperial College London while building his recording career. He describes math and music as the same kind of abstract play — 'playing around with ideas until you have a breakthrough' — and calls his own thesis work 'original, but I would still call it trivial.'",
      sourceIds: [S.ethos, S.mathGenealogy, S.rsBreaking, S.wikipedia],
    },
    {
      id: "theme-dance-music-as-life",
      kind: "philosophy",
      status: "stated",
      title: "Dance music isn't just escapism",
      summary:
        "He insists dance music 'is about life' — an emotional form, not a null one — and set Daphni against the 'macho' super-saw wing of EDM, aligning with the gay-club lineage of New York dance music instead.",
      sourceIds: [S.guardian2014, S.fact2012],
    },
    {
      id: "theme-sampling",
      kind: "method",
      status: "reported",
      title: "Sampling as composition",
      summary:
        "From the loop-based Manitoba records through Suddenly's chopped soul flips (Gloria Barnes on 'Home') to Honey's credited MARRS and René & Angela samples and his catalogue of Daphni edits, other people's records are his raw material — until Honey folded his own voice into the same machinery.",
      sourceIds: [S.allmusic, S.pitchforkSuddenly, S.bandcampHoney, S.raPodcast],
    },
    {
      id: "theme-private-process",
      kind: "practice",
      status: "stated",
      title: "A private, domestic process",
      summary:
        "He makes records alone at home — bedroom for Andorra, basement thereafter — around the school run and family evenings. He dislikes naming things and finishes music before titling it; 'Suddenly' was his daughter's word, suggested by his wife. For Daphni he wanted 'no plan, no PR.'",
      sourceIds: [S.billboardPolaris, S.rsOurLove, S.rsSuddenly, S.esquire, S.irishTimes],
    },
    {
      id: "theme-two-aliases",
      kind: "practice",
      status: "reported",
      title: "Two aliases, one continuum",
      summary:
        "Caribou is the composed, vocal, band-touring project; Daphni the impulsive dancefloor and DJ project. The split began as an internal filing system during Swim, hardened into a second career, and has since been publicly collapsing — Honey sounds like Daphni, and Butterfly's lead single is billed 'feat. Caribou.'",
      sourceIds: [S.xlr8r, S.fact2012, S.mergeHoney, S.pitchforkButterfly],
    },
    {
      id: "theme-reinvention",
      kind: "practice",
      status: "reported",
      title: "Deliberate reinvention per record",
      summary:
        "Reviewers and his own label describe each album as a sonic and thematic reset: Manitoba's IDM, the psych-pop of Milk of Human Kindness and Andorra, Swim's liquid dance music, Our Love's connectedness, Suddenly's jagged turns, Honey's club scale. His press copy frames restlessness as the signature.",
      sourceIds: [S.spin2005, S.pitchfork2010, S.pitchforkSuddenly, S.mergeHoney],
    },
    {
      id: "theme-love-and-family",
      kind: "belief",
      status: "stated",
      title: "Love as a complicated subject",
      summary:
        "Since Our Love he treats adult love — for wife, daughters, friends, audience — as the records' real subject: 'happiness right next to sadness.' Suddenly extends that to the abrupt events (deaths, a health crisis, a birth in a car) that reframe a life.",
      sourceIds: [S.rsOurLove, S.irishTimes, S.billboardSuddenly],
    },
    {
      id: "theme-diy-release-speed",
      kind: "method",
      status: "stated",
      title: "Dance music at pressing-plant speed",
      summary:
        "The Four Tet split single taught him a track could go from test pressing to sold-out shops in weeks; he built Jiaolong on that model — white-label 12-inches and surprise EPs — keeping Caribou albums on the slow promotional track by contrast.",
      sourceIds: [S.xlr8r, S.irishTimes, S.raDaphni],
    },
    {
      id: "theme-voice-as-material",
      kind: "method",
      status: "inferred",
      title: "His own voice as found material",
      summary:
        "Across the catalog his voice is treated the way he treats samples: a signature falsetto on the Caribou records, buried and chopped on Suddenly, run through AI voice models until it passes for other singers on Honey, then billed as a guest feature on a Daphni single.",
      sourceIds: [S.pitchforkHoney, S.guardianHoney, S.pitchforkButterfly],
    },
  ],
  works: [
    {
      id: "work-thesis",
      kind: "paper",
      status: "published",
      title: "Overconvergent Siegel modular forms (doctoral thesis)",
      date: "2005",
      location: "Imperial College London",
      summary:
        "Doctoral thesis under Kevin Buzzard; the EThOS catalog records the title as 'Overconvergent Siegel modular forms' while the Mathematics Genealogy Project records 'Overconvergent Siegel Modular Symbols.'",
      sourceIds: [S.ethos, S.mathGenealogy],
    },
    {
      id: "work-start-breaking-my-heart",
      kind: "recording",
      status: "released",
      title: "Start Breaking My Heart (as Manitoba)",
      date: "2001",
      summary: "Debut album, released on The Leaf Label; later reissued as Caribou.",
      sourceIds: [S.thisMagazine, S.allmusic, S.wikipedia],
    },
    {
      id: "work-up-in-flames",
      kind: "recording",
      status: "released",
      title: "Up in Flames (as Manitoba)",
      date: "2003",
      summary:
        "Second Manitoba album, a critics' favourite; toured internationally before the rename.",
      sourceIds: [S.thisMagazine, S.allmusic],
    },
    {
      id: "work-milk-of-human-kindness",
      kind: "recording",
      status: "released",
      title: "The Milk of Human Kindness (as Caribou)",
      date: "2005",
      summary:
        "First Caribou album on Domino, folding the Manitoba sound into psychedelic pop.",
      sourceIds: [S.spin2005, S.cleveScene],
    },
    {
      id: "work-andorra",
      kind: "recording",
      status: "released",
      title: "Andorra (as Caribou)",
      date: "2007",
      summary:
        "Bedroom-made album on City Slang/Merge; winner of the 2008 Polaris Music Prize.",
      sourceIds: [S.polaris, S.billboardPolaris],
    },
    {
      id: "work-swim",
      kind: "recording",
      status: "released",
      title: "Swim (as Caribou)",
      date: "2010-04-20",
      summary:
        "The 'liquid dance music' record; Resident Advisor, Mixmag, and Rough Trade album of the year and a 2010 Polaris shortlistee.",
      sourceIds: [S.swimWikidata, S.raPodcast, S.mergeOurLove],
    },
    {
      id: "work-jiaolong-label",
      kind: "project",
      status: "ongoing",
      title: "Jiaolong (label)",
      date: "2011",
      summary:
        "His own imprint, launched with a Daphni 12-inch and still the home of the Daphni albums, including 2026's Butterfly.",
      sourceIds: [S.xlr8r, S.pitchforkButterfly],
    },
    {
      id: "work-jiaolong-album",
      kind: "recording",
      status: "released",
      title: "Jiaolong (as Daphni)",
      date: "2012-10-16",
      summary:
        "First Daphni album on Merge/Jiaolong; a direct dancefloor statement.",
      sourceIds: [S.pitchforkJiaolong, S.xlr8r],
    },
    {
      id: "work-our-love",
      kind: "recording",
      status: "released",
      title: "Our Love (as Caribou)",
      date: "2014-10-07",
      summary:
        "The breakthrough of scale: 'Can't Do Without You,' a Polaris shortlist, and a Grammy nomination for Best Dance/Electronic Album.",
      sourceIds: [S.mergeOurLove, S.rsOurLove, S.grammy],
    },
    {
      id: "work-fabriclive-93",
      kind: "recording",
      status: "released",
      title: "FabricLive.93 (as Daphni)",
      date: "2017-07-21",
      summary:
        "A FabricLive entry built almost entirely from his own unreleased Daphni tracks.",
      sourceIds: [S.allmusicJoliMai, S.wikipedia],
    },
    {
      id: "work-joli-mai",
      kind: "recording",
      status: "released",
      title: "Joli Mai (as Daphni)",
      date: "2017-10-06",
      summary:
        "The FabricLive.93 material in full-length form, self-released on Jiaolong.",
      sourceIds: [S.allmusicJoliMai],
    },
    {
      id: "work-suddenly",
      kind: "recording",
      status: "released",
      title: "Suddenly (as Caribou)",
      date: "2020-02-28",
      summary:
        "His most personal album, named after his daughter's new word; Juno Award for Electronic Album of the Year 2021.",
      sourceIds: [S.rsSuddenly, S.billboardSuddenly, S.juno],
    },
    {
      id: "work-cherry",
      kind: "recording",
      status: "released",
      title: "Cherry (as Daphni)",
      date: "2022-10-07",
      summary: "Third Daphni album on Jiaolong.",
      sourceIds: [S.raDaphni, S.pitchforkButterfly],
    },
    {
      id: "work-honey",
      kind: "recording",
      status: "released",
      title: "Honey (as Caribou)",
      date: "2024-10-04",
      summary:
        "Sixth Caribou album on City Slang/Merge; every vocal is Snaith's own, many processed through AI voice tools — the record's divisive feature.",
      sourceIds: [S.bandcampHoney, S.mergeHoney, S.pitchforkHoney],
    },
    {
      id: "work-butterfly",
      kind: "recording",
      status: "released",
      title: "Butterfly (as Daphni)",
      date: "2026-02-06",
      summary:
        "Fourth Daphni album on Jiaolong, including the first 'feat. Caribou' billing.",
      sourceIds: [S.pitchforkButterfly, S.dogDayPress],
    },
  ],
  appearances: [
    {
      id: "appearance-pitchfork-2010",
      title: "Interviews: Caribou",
      venue: "Pitchfork",
      publishedAt: "2010",
      participants: ["Dan Snaith"],
      summary:
        "Swim-era interview: the 'liquid dance music' phrase and the abandoned plan to keep dance tracks and the Caribou album in separate piles.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/interview/7785-caribou/",
          sourceId: S.pitchfork2010,
        },
      ],
      sourceIds: [S.pitchfork2010],
    },
    {
      id: "appearance-ra246",
      title: "RA.246 Caribou",
      venue: "Resident Advisor",
      publishedAt: "2011-02-14",
      participants: ["Dan Snaith"],
      summary:
        "A 70-minute mix plus Q&A that quietly debuted five Daphni tracks — the first public appearance of the alias.",
      media: [
        {
          type: "audio",
          url: "https://ra.co/podcast/246",
          sourceId: S.raPodcast,
        },
      ],
      sourceIds: [S.raPodcast],
    },
    {
      id: "appearance-fact-2012",
      title: "\"It isn't a particularly macho endeavour…\" Dan Snaith talks Daphni",
      venue: "FACT Magazine",
      publishedAt: "2012-10-01",
      participants: ["Dan Snaith"],
      summary:
        "Interview on Daphni, Jiaolong, and his reaction to the aggressive wing of EDM.",
      media: [
        {
          type: "article",
          url: "https://www.factmag.com/2012/10/01/it-isnt-a-particularly-macho-endeavour-dan-snaith-talks-daphni-his-reaction-to-the-edm-shooting-match/",
          sourceId: S.fact2012,
        },
      ],
      sourceIds: [S.fact2012],
    },
    {
      id: "appearance-xlr8r-2012",
      title: "Deep Inside: Daphni 'Jiaolong'",
      venue: "XLR8R",
      publishedAt: "2012",
      participants: ["Dan Snaith"],
      summary:
        "Interview on the Daphni/Caribou division of labour and why he founded the Jiaolong label.",
      media: [
        {
          type: "article",
          url: "https://xlr8r.com/features/deep-inside-daphni-jiaolong/",
          sourceId: S.xlr8r,
        },
      ],
      sourceIds: [S.xlr8r],
    },
    {
      id: "appearance-guardian-2014",
      title: "Caribou: 'Dance music isn't just escapism. It's about life'",
      venue: "The Guardian",
      publishedAt: "2014-10-04",
      participants: ["Dan Snaith"],
      summary:
        "Our Love-era interview on dance music as an emotional form and the 2012 double life of Radiohead arenas and techno clubs.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/music/2014/oct/04/caribou-dance-music-isnt-just-escapism-its-about-life",
          sourceId: S.guardian2014,
        },
      ],
      sourceIds: [S.guardian2014],
    },
    {
      id: "appearance-bbc-essential-2014",
      title: "Radio 1's Essential Mix — Caribou",
      venue: "BBC Radio 1",
      publishedAt: "2014-10",
      participants: ["Dan Snaith"],
      summary:
        "Two-hour Essential Mix with exclusive music from Joy Orbison & Boddika, Pearson Sound, Les Sins, and Anthony Naples plus two new Daphni tracks; later named Essential Mix of the Year.",
      media: [
        {
          type: "audio",
          url: "https://www.bbc.co.uk/programmes/b04kzsty",
          sourceId: S.bbcEssential,
        },
      ],
      sourceIds: [S.bbcEssential, S.bbcEssentialYear],
    },
    {
      id: "appearance-rs-suddenly-2020",
      title: "Caribou on the Joys and Sorrows Behind New Album 'Suddenly'",
      venue: "Rolling Stone",
      publishedAt: "2020-02-04",
      participants: ["Dan Snaith", "Simon Vozick-Levinson"],
      summary:
        "Suddenly interview on the album's jagged edges, the basement work schedule around two daughters, and wanting music that 'sounds like a hug.'",
      media: [
        {
          type: "article",
          url: "https://www.rollingstone.com/music/music-features/caribou-suddenly-dan-snaith-interview-946860/",
          sourceId: S.rsSuddenly,
        },
      ],
      sourceIds: [S.rsSuddenly],
    },
    {
      id: "appearance-billboard-suddenly-2020",
      title: "Caribou's Dan Snaith on His New & Most Personal Album",
      venue: "Billboard",
      publishedAt: "2020-02-27",
      participants: ["Dan Snaith"],
      summary:
        "Suddenly interview cataloguing the abrupt events behind the record, from a friend's death to a daughter born in the back of a car.",
      media: [
        {
          type: "article",
          url: "https://www.billboard.com/music/music-news/caribou-dan-snaith-interview-9324432/",
          sourceId: S.billboardSuddenly,
        },
      ],
      sourceIds: [S.billboardSuddenly],
    },
    {
      id: "appearance-daphni-essential-2026",
      title: "Daphni Essential Mix",
      venue: "BBC Radio 1",
      publishedAt: "2026-01-17",
      participants: ["Dan Snaith"],
      summary:
        "A new Daphni Essential Mix broadcast January 17, 2026, featuring music from the Butterfly album alongside Miles Davis, Liquid Liquid, Floorplan, and Underworld.",
      sourceIds: [S.dogDayPress],
    },
  ],
  relations: [
    {
      id: "rel-victor-snaith",
      kind: "family",
      target: "victor-snaith",
      targetName: "Victor Snaith",
      note: "His father, a mathematician.",
      targetWikidataId: "Q15455462",
      sourceIds: [S.wikipedia, S.rsBreaking],
    },
    {
      id: "rel-nina-snaith",
      kind: "family",
      target: "nina-snaith",
      targetName: "Nina Snaith",
      note: "His sister, also a mathematician.",
      targetWikidataId: "Q3710557",
      sourceIds: [S.wikipedia, S.rsBreaking],
    },
    {
      id: "rel-kevin-buzzard",
      kind: "mentored_by",
      target: "kevin-buzzard",
      targetName: "Kevin Buzzard",
      note: "His doctoral advisor at Imperial College London for the 2005 PhD on overconvergent Siegel modular forms.",
      targetWikidataId: "Q1740098",
      sourceIds: [S.mathGenealogy, S.ethos, S.wikipedia],
    },
    {
      id: "rel-kieran-hebden",
      kind: "collaborated",
      target: "kieran-hebden",
      targetName: "Kieran Hebden (Four Tet)",
      note: "The Text Records 'Ye Ye'/'Pinnacles' split single that inspired Jiaolong; he co-arranged Honey's 'Broke My Heart' and title track.",
      targetWikidataId: "Q959655",
      sourceIds: [S.xlr8r, S.bandcampHoney],
    },
    {
      id: "rel-radiohead",
      kind: "collaborated",
      target: "radiohead",
      targetName: "Radiohead",
      targetKind: "organization",
      note: "Caribou was personally invited to support the 2012 King of Limbs tour.",
      targetWikidataId: "Q44190",
      sourceIds: [S.xlr8r, S.mergeOurLove, S.guardian2014],
    },
    {
      id: "rel-ryan-smith",
      kind: "collaborated",
      target: "ryan-smith",
      targetName: "Ryan Smith",
      note: "Caribou live-band member.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-brad-weber",
      kind: "collaborated",
      target: "brad-weber",
      targetName: "Brad Weber",
      note: "Caribou live-band member.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-john-schmersal",
      kind: "collaborated",
      target: "john-schmersal",
      targetName: "John Schmersal",
      note: "Caribou live-band member.",
      targetWikidataId: "Q6256889",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-jiaolong",
      kind: "founded",
      target: "jiaolong",
      targetName: "Jiaolong",
      targetKind: "organization",
      note: "His own label, founded 2011 and launched with a Daphni 12-inch; home of the Daphni albums.",
      start: "2011",
      sourceIds: [S.xlr8r],
    },
    {
      id: "rel-merge-records",
      kind: "member_of",
      target: "merge-records",
      targetName: "Merge Records",
      targetKind: "organization",
      note: "Caribou's North American label home since Andorra; co-released Our Love, Suddenly, and Honey.",
      start: "2007",
      targetWikidataId: "Q1921640",
      sourceIds: [S.mergeArtist, S.mergeOurLove, S.mergeHoney],
    },
    {
      id: "rel-city-slang",
      kind: "member_of",
      target: "city-slang",
      targetName: "City Slang",
      targetKind: "organization",
      note: "European label partner on the Caribou albums from Andorra through Honey.",
      start: "2007",
      end: "2024",
      targetWikidataId: "Q319166",
      sourceIds: [S.billboardPolaris, S.mergeHoney, S.wikipedia],
    },
    {
      id: "rel-domino",
      kind: "member_of",
      target: "domino",
      targetName: "Domino",
      targetKind: "organization",
      note: "Released the first Caribou album, The Milk of Human Kindness (2005).",
      targetWikidataId: "Q1238400",
      sourceIds: [S.spin2005, S.cleveScene, S.wikipedia],
    },
    {
      id: "rel-the-leaf-label",
      kind: "member_of",
      target: "the-leaf-label",
      targetName: "The Leaf Label",
      targetKind: "organization",
      note: "Released the first Manitoba album, Start Breaking My Heart (2001).",
      targetWikidataId: "Q3521549",
      sourceIds: [S.thisMagazine, S.allmusic, S.wikipedia],
    },
    {
      id: "rel-handsome-dick-manitoba",
      kind: "other",
      target: "handsome-dick-manitoba",
      targetName: "Richard 'Handsome Dick' Manitoba",
      note: "The Dictators frontman's 2004 US trademark action over the Manitoba name forced the rename to Caribou; settlement terms were never public.",
      targetWikidataId: "Q444446",
      sourceIds: [S.thisMagazine, S.cleveScene, S.spin2005, S.wikipedia],
    },
    {
      id: "rel-andrew-miller",
      kind: "interviewed_by",
      target: "andrew-miller",
      targetName: "Andrew Miller",
      note: "Cleveland Scene 'Reindeer Games' feature on the forced rename, 2005.",
      sourceIds: [S.cleveScene],
    },
    {
      id: "rel-gene-armstrong",
      kind: "interviewed_by",
      target: "gene-armstrong",
      targetName: "Gene Armstrong",
      note: "Tucson Weekly 'Crime Pays!' interview, 2005.",
      sourceIds: [S.tucsonWeekly],
    },
    {
      id: "rel-elizabeth-goodman",
      kind: "interviewed_by",
      target: "elizabeth-goodman",
      targetName: "Elizabeth Goodman",
      note: "Rolling Stone 'Breaking Artist' profile, 2007.",
      sourceIds: [S.rsBreaking],
    },
    {
      id: "rel-jim-carroll",
      kind: "interviewed_by",
      target: "jim-carroll",
      targetName: "Jim Carroll",
      note: "Irish Times Our Love interview, 2014.",
      sourceIds: [S.irishTimes],
    },
    {
      id: "rel-olivia-ovenden",
      kind: "interviewed_by",
      target: "olivia-ovenden",
      targetName: "Olivia Ovenden",
      note: "Esquire UK interview, 2020.",
      sourceIds: [S.esquire],
    },
    {
      id: "rel-simon-vozick-levinson",
      kind: "interviewed_by",
      target: "simon-vozick-levinson",
      targetName: "Simon Vozick-Levinson",
      note: "Rolling Stone Suddenly interview, 2020.",
      sourceIds: [S.rsSuddenly],
    },
  ],
  openQuestions: [
    "The thesis title is recorded inconsistently: EThOS says 'Overconvergent Siegel modular forms' while the Mathematics Genealogy Project and Wikipedia say 'Overconvergent Siegel Modular Symbols'.",
    "Whether the Manitoba trademark action was a filed lawsuit or a threat of one is reported inconsistently; the settlement terms were never made public.",
    "The origin of the name 'Daphni' is not explained in the cataloged sources.",
    "The current Caribou live-band lineup — reported as Snaith, Ryan Smith, Brad Weber, and John Schmersal — may be dated; no recent roster confirmation appears in the catalog.",
    "On Honey, all vocals are reported to be Snaith's own, but which specific tracks or passages were processed through AI voice tools — and with which tools — is not publicly detailed.",
    "Whether Snaith retains any active involvement in mathematical research after his 2005 doctorate is not addressed in the cataloged sources.",
  ],
  body: `Dan Snaith is a Canadian electronic musician who has spent twenty-five years recording under three names — Manitoba, then Caribou, then Daphni — while quietly holding a doctorate in number theory. Born Daniel Victor Snaith on March 29, 1978 in Dundas, Ontario, he is the son of mathematician Victor Snaith and brother of mathematician Nina Snaith. He moved to London in 2001 to pursue a PhD at Imperial College London, completing it in 2005 under Kevin Buzzard; the British Library's EThOS catalog titles the thesis "Overconvergent Siegel modular forms" (the Mathematics Genealogy Project renders it "Modular Symbols"). He has described mathematics and music as the same kind of abstract play, and his own thesis as "original, but I would still call it trivial."

## Three names

As Manitoba he made warm, loop-based electronic records — the People Eating Fruit EP (2000), Start Breaking My Heart (2001), and Up in Flames (2003), touring with Stereolab, Four Tet, Broadcast, and Prefuse 73. In 2004, Dictators frontman Richard "Handsome Dick" Manitoba pursued a US trademark action over the name; Snaith, facing a case he "couldn't afford to lose," announced the change to Caribou that October, telling Cleveland Scene the affair cost him "thousands and thousands just to give in." The new name, he has said, arrived on an LSD trip in the Canadian prairies courtesy of a bear — an anecdote he has retold often enough that it functions as origin myth rather than verifiable history.

As Caribou he became a critical fixture: The Milk of Human Kindness (2005) on Domino, then Andorra (2007) — made "at home in a bedroom" — which won the third Polaris Music Prize in 2008. Swim (2010) was his pivot toward what he called "liquid dance music" and was named album of the year by Resident Advisor, Mixmag, and Rough Trade. Our Love (2014) brought the biggest audience — a Polaris shortlist, a Grammy nomination, and "Can't Do Without You" — followed by Suddenly (2020), his most personal record and a Juno winner, and Honey (2024), a club-scaled record whose vocals are all his own, transformed by AI voice tools into other singers.

Daphni, meanwhile, began as a filing system: tracks appearing uncredited on his 2011 Resident Advisor podcast, a rapid split single with Four Tet ("Ye Ye"/"Pinnacles"), then a self-run label, Jiaolong, built for pressing-plant speed — "no plan, no PR." Four Daphni albums (Jiaolong, Joli Mai, Cherry, Butterfly) and a FabricLive mix made largely of his own productions document the project.

## What he believes

Two commitments recur. First, dance music as emotional substance: "dance music isn't just escapism — it's about life," he told the Guardian, and he positioned Daphni against what he called the macho "shooting match of guys with electronic toys," claiming kinship with the gay-club lineage of New York dance music. Second, music made for connection: after Swim connected unexpectedly widely, he described Our Love's impulse as "making something for everybody to listen to" — and, of Suddenly, "I want it to sound like a hug."

## How he works

The process is private and domestic: alone at home — bedroom, then basement — working around school runs and family evenings, finishing music before naming it (he hates naming; "Suddenly" was his daughter's word). Other people's records are raw material — loop-collage in the Manitoba era, Gloria Barnes on Suddenly's "Home," MARRS and René & Angela on Honey — and on Honey his own voice finally entered the same machinery, run through AI models until it passed for other singers. The dividing line between Caribou and Daphni, once a real organizational principle, has lately been publicly collapsing: Butterfly's lead single is billed "Waiting So Long (feat. Caribou)."

## What the record does not settle

Sources disagree on small things — the thesis title, whether the Manitoba action was filed or threatened — and the catalog leaves the Daphni name unexplained, the current band lineup unconfirmed, the exact extent of Honey's AI processing undocumented, and any post-2005 mathematical activity unaddressed.

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
