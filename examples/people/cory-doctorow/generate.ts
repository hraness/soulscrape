#!/usr/bin/env bun
/** Generate examples/people/cory-doctorow/person-index.json with derived source ids. */

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

// --- Subject-controlled ---------------------------------------------------

const craphoundBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About Cory Doctorow",
  url: "https://craphound.com/bio/",
  publisher: "craphound.com",
  notes:
    "The subject's official biography page, last updated January 2026; self-reported.",
});
const craphoundHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Cory Doctorow's craphound.com",
  url: "https://craphound.com/",
  publisher: "craphound.com",
});
const pluralistic = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Pluralistic: Daily links from Cory Doctorow",
  url: "https://pluralistic.net/",
  publisher: "Pluralistic",
  notes:
    "His daily blog since February 2020: 'No trackers, no ads. Privacy policy: we don't collect or retain any data at all ever period.'",
});

// --- Reference ------------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Cory Doctorow (Q110436)",
  url: "https://www.wikidata.org/wiki/Q110436",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Cory Doctorow",
  url: "https://en.wikipedia.org/wiki/Cory_Doctorow",
  publisher: "Wikipedia",
});
const wikipediaEnshittification = source({
  binding: "reference",
  mediaType: "article",
  title: "Enshittification",
  url: "https://en.wikipedia.org/wiki/Enshittification",
  publisher: "Wikipedia",
  notes:
    "Notes OED attestations of the word back to 2013; credits Doctorow with popularizing it in 2022.",
});
const isfdbLittleBrother = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Title: Little Brother — ISFDB",
  url: "https://www.isfdb.org/cgi-bin/title.cgi?879726+1=",
  publisher: "Internet Speculative Fiction Database",
});
const etymonline = source({
  binding: "reference",
  mediaType: "webpage",
  title: "enshittification — etymology, origin and meaning",
  url: "https://www.etymonline.com/word/enshittification",
  publisher: "Etymonline",
});

// --- Archive --------------------------------------------------------------

const boingboingAuthor = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Cory Doctorow, Author at Boing Boing",
  url: "https://boingboing.net/author/cory_doctorow_1",
  publisher: "Boing Boing",
  notes:
    "His Boing Boing author archive, running to roughly 2,700 paginated pages of posts.",
});
const ftCapture = source({
  binding: "archive",
  mediaType: "article",
  title: "'Enshittification' is coming for absolutely everything (FT capture)",
  url: "https://archive.ph/CB3mb",
  publisher: "Financial Times",
  publishedAt: "2024-02-08",
  authors: ["Cory Doctorow"],
  notes: "Archived capture of his Financial Times column of 8 February 2024.",
});

// --- Primary records ------------------------------------------------------

const effStaff = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Cory Doctorow | Electronic Frontier Foundation",
  url: "https://www.eff.org/about/staff/cory-doctorow",
  publisher: "Electronic Frontier Foundation",
  notes: "EFF staff bio: 'EFF Special Advisor'; former European director.",
});
const effFind = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Find Cory Doctorow | Electronic Frontier Foundation",
  url: "https://www.eff.org/pages/cory-doctorow",
  publisher: "Electronic Frontier Foundation",
});
const effRejoin = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Cory Doctorow Rejoins EFF to Eradicate DRM Everywhere",
  url: "https://www.eff.org/press/releases/cory-doctorow-rejoins-eff-eradicate-drm-everywhere",
  publisher: "Electronic Frontier Foundation",
  publishedAt: "2015",
  notes:
    "EFF press release: rejoined as special consultant to the Apollo 1201 Project; records his four years as European Affairs Coordinator and his 2007 EFF Pioneer Award.",
});
const ccRelease = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Doctorow's Down and Out Released Today",
  url: "https://creativecommons.org/2003/01/09/doctorowsdownandoutreleasedtoday/",
  publisher: "Creative Commons",
  publishedAt: "2003-01-09",
  notes: "CC's own record of the novel's release under a CC license.",
});
const adsWoty = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "2023 Word of the Year Is 'Enshittification'",
  url: "https://americandialect.org/2023-word-of-the-year-is-enshittification/",
  publisher: "American Dialect Society",
  publishedAt: "2024-01-05",
});
const macmillanLittleBrother = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Little Brother — Macmillan",
  url: "https://us.macmillan.com/books/9780765323118/littlebrother/",
  publisher: "Tor Books / Macmillan",
});
const prhInternetCon = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Internet Con by Cory Doctorow — Penguin Random House",
  url: "https://www.penguinrandomhouse.com/books/721311/the-internet-con-by-cory-doctorow/",
  publisher: "Verso / Penguin Random House",
  notes: "Hardcover published September 5, 2023; paperback September 3, 2024.",
});
const beaconChokepoint = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Chokepoint Capitalism — Beacon Press",
  url: "https://www.beacon.org/Chokepoint-Capitalism-P1856.aspx",
  publisher: "Beacon Press",
});
const mcdEnshittification = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Enshittification — MCD x FSG",
  url: "https://www.mcdbooks.com/books/enshittification",
  publisher: "MCD / Farrar, Straus and Giroux",
});
const macmillanEnshittificationAudio = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Enshittification (audio edition) — Macmillan",
  url: "https://us.macmillan.com/books/9781250417602/enshittification/",
  publisher: "Macmillan",
  notes:
    "Carries the honor 'Winner of the 2026 Locus Award for Nonfiction'; on sale October 7, 2025.",
});

// --- First-person writing -------------------------------------------------

const craphoundWelcome = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Welcome to the site (Down and Out in the Magic Kingdom)",
  url: "https://craphound.com/down/2003/01/09/welcome-to-the-site-3/",
  publisher: "craphound.com",
  publishedAt: "2003-01-09",
  authors: ["Cory Doctorow"],
});
const craphoundRelicense = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Down and Out relicensed today",
  url: "https://craphound.com/est/2004/02/08/down-and-out-relicensed-today/",
  publisher: "craphound.com",
  publishedAt: "2004-02-08",
  authors: ["Cory Doctorow"],
});
const msftDrm = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Microsoft Research DRM talk",
  url: "https://craphound.com/msftdrm.txt",
  publisher: "craphound.com",
  publishedAt: "2004-06-17",
  authors: ["Cory Doctorow"],
  notes: "Canonical plaintext of his anti-DRM talk given at Microsoft, Redmond.",
});
const craphoundDrm20 = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "My 2004 Microsoft DRM Talk",
  url: "https://craphound.com/news/2024/06/16/my-2004-microsoft-drm-talk/",
  publisher: "craphound.com",
  publishedAt: "2024-06-16",
  authors: ["Cory Doctorow"],
});
const craphoundNyt = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Little Brother goes into its fourth week on the NYT Bestseller list!",
  url: "https://craphound.com/littlebrother/2008/06/04/little-brother-goes-into-its-fourth-week-on-the-nyt-bestseller-list/",
  publisher: "craphound.com",
  publishedAt: "2008-06-04",
  authors: ["Cory Doctorow"],
});
const craphoundCampbell = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "The Campbell Award!",
  url: "https://craphound.com/campbell/",
  publisher: "craphound.com",
  authors: ["Cory Doctorow"],
  notes: "His note on winning the Year 2000 John W. Campbell Award for Best New Writer.",
});
const mediumSocialQuitting = source({
  binding: "first_person",
  mediaType: "article",
  title: "Social Quitting",
  url: "https://doctorow.medium.com/social-quitting-1ce85b67b456",
  publisher: "Medium",
  publishedAt: "2022-11-15",
  authors: ["Cory Doctorow"],
  notes:
    "First published use of 'enshittification'; later ran as his January 2023 Locus column.",
});
const pluralisticAmazon = source({
  binding: "first_person",
  mediaType: "article",
  title: "How monopoly enshittified Amazon",
  url: "https://pluralistic.net/2022/11/28/enshittification/",
  publisher: "Pluralistic",
  publishedAt: "2022-11-28",
  authors: ["Cory Doctorow"],
});
const locusSocialQuitting = source({
  binding: "first_person",
  mediaType: "article",
  title: "Commentary: Cory Doctorow: Social Quitting",
  url: "https://locusmag.com/feature/commentary-cory-doctorow-social-quitting/",
  publisher: "Locus Magazine",
  publishedAt: "2023-01-02",
  authors: ["Cory Doctorow"],
});
const pluralisticTiktok = source({
  binding: "first_person",
  mediaType: "article",
  title: "Tiktok's enshittification",
  url: "https://pluralistic.net/2023/01/21/potemkin-ai/",
  publisher: "Pluralistic",
  publishedAt: "2023-01-21",
  authors: ["Cory Doctorow"],
});
const wiredTiktok = source({
  binding: "first_person",
  mediaType: "article",
  title: "The 'Enshittification' of TikTok",
  url: "https://www.wired.com/story/tiktok-platforms-cory-doctorow/",
  publisher: "Wired",
  publishedAt: "2023-01-23",
  authors: ["Cory Doctorow"],
});
const mediumPluralisticThree = source({
  binding: "first_person",
  mediaType: "article",
  title: "Pluralistic is three. Time flies when you're writing blogs.",
  url: "https://doctorow.medium.com/pluralistic-is-three-eec1169f114c",
  publisher: "Medium",
  publishedAt: "2023-02-19",
  authors: ["Cory Doctorow"],
  notes:
    "Records that January 29, 2020 was his last day at Boing Boing and explains the POSSE model behind Pluralistic.",
});
const pluralisticTwo = source({
  binding: "first_person",
  mediaType: "article",
  title: "Pluralistic: 19 Feb 2022 — now we are two",
  url: "https://pluralistic.net/2022/02/19/now-we-are-two/",
  publisher: "Pluralistic",
  publishedAt: "2022-02-19",
  authors: ["Cory Doctorow"],
  notes:
    "Second-anniversary post calling his Boing Boing departure 'unplanned (but overdue and amicable)'.",
});

// --- Reporting ------------------------------------------------------------

const inc2001 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Taking a Page from Science Fiction",
  url: "https://www.inc.com/magazine/20010615/22801.html",
  publisher: "Inc. Magazine",
  publishedAt: "2001-06-15",
});
const guardianNaughton = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Users, advertisers — we are all trapped in the 'enshittification' of the internet",
  url: "https://www.theguardian.com/commentisfree/2023/mar/11/users-advertisers-we-are-all-trapped-in-the-enshittification-of-the-internet",
  publisher: "The Guardian",
  publishedAt: "2023-03-11",
  authors: ["John Naughton"],
});
const guardianMacquarie = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "'What many of us feel': why 'enshittification' is Macquarie Dictionary's word of the year",
  url: "https://www.theguardian.com/science/2024/nov/26/enshittification-macquarie-dictionary-word-of-the-year-explained",
  publisher: "The Guardian",
  publishedAt: "2024-11-26",
});
const kirkusEnshittification = source({
  binding: "reporting",
  mediaType: "article",
  title: "Enshittification — Kirkus Reviews",
  url: "https://www.kirkusreviews.com/book-reviews/cory-doctorow/enshittification/",
  publisher: "Kirkus Reviews",
  publishedAt: "2025",
});

// --- Interviews and talks -------------------------------------------------

const slateIcycmi = source({
  binding: "interview",
  mediaType: "audio",
  title: "TikTok Isn't For Creators Anymore (ICYMI)",
  url: "https://slate.com/podcasts/icymi/2023/01/cory-doctorow-how-online-platforms-die",
  publisher: "Slate",
  publishedAt: "2023-01-28",
  notes: "Rachelle Hampton interviews Doctorow about the Wired enshittification essay.",
});
const abcFutureTense = source({
  binding: "interview",
  mediaType: "audio",
  title: "Platform capitalism and the curse of 'enshittification'",
  url: "https://www.abc.net.au/listen/programs/futuretense/cory-doctorow-enshittification-platform-capitalism/102953478",
  publisher: "ABC Radio National — Future Tense",
  publishedAt: "2023-10-29",
  notes: "Feature interview; original broadcast July 2, 2023.",
});
const registerInterview = source({
  binding: "interview",
  mediaType: "article",
  title: "Cory Doctorow wants to wipe away enshittification of tech",
  url: "https://www.theregister.com/off-prem/2024/01/30/cory-doctorow-wants-to-wipe-away-enshittification-of-tech/713793",
  publisher: "The Register",
  publishedAt: "2024-01-30",
});
const effPodcast = source({
  binding: "interview",
  mediaType: "audio",
  title: "Podcast Episode: Fighting Enshittification",
  url: "https://www.eff.org/deeplinks/2024/06/podcast-episode-fighting-enshittification",
  publisher: "Electronic Frontier Foundation",
  publishedAt: "2024-06",
  notes: "Cindy Cohn and Jason Kelley interview Doctorow.",
});
const guardianPodcast = source({
  binding: "interview",
  mediaType: "audio",
  title: "'Enshittification': how we got the internet no one asked for",
  url: "https://www.theguardian.com/news/audio/2025/nov/24/enshittification-how-we-got-the-internet-no-one-asked-for-podcast",
  publisher: "The Guardian",
  publishedAt: "2025-11-24",
  notes: "Nosheen Iqbal interviews Doctorow.",
});
const msftVideo = source({
  binding: "archive",
  mediaType: "video",
  title: "DRM and MSFT: a product no customer wants",
  url: "https://www.microsoft.com/en-us/research/video/drm-and-msft-a-product-no-customer-wants/",
  publisher: "Microsoft Research",
  publishedAt: "2004-06-17",
  notes: "Microsoft's own recording of the DRM talk.",
});

const S = {
  craphoundBio: craphoundBio.id,
  craphoundHome: craphoundHome.id,
  pluralistic: pluralistic.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  wikipediaEnshittification: wikipediaEnshittification.id,
  isfdbLittleBrother: isfdbLittleBrother.id,
  etymonline: etymonline.id,
  boingboingAuthor: boingboingAuthor.id,
  ftCapture: ftCapture.id,
  effStaff: effStaff.id,
  effFind: effFind.id,
  effRejoin: effRejoin.id,
  ccRelease: ccRelease.id,
  adsWoty: adsWoty.id,
  macmillanLittleBrother: macmillanLittleBrother.id,
  prhInternetCon: prhInternetCon.id,
  beaconChokepoint: beaconChokepoint.id,
  mcdEnshittification: mcdEnshittification.id,
  macmillanEnshittificationAudio: macmillanEnshittificationAudio.id,
  craphoundWelcome: craphoundWelcome.id,
  craphoundRelicense: craphoundRelicense.id,
  msftDrm: msftDrm.id,
  craphoundDrm20: craphoundDrm20.id,
  craphoundNyt: craphoundNyt.id,
  craphoundCampbell: craphoundCampbell.id,
  mediumSocialQuitting: mediumSocialQuitting.id,
  pluralisticAmazon: pluralisticAmazon.id,
  locusSocialQuitting: locusSocialQuitting.id,
  pluralisticTiktok: pluralisticTiktok.id,
  wiredTiktok: wiredTiktok.id,
  mediumPluralisticThree: mediumPluralisticThree.id,
  pluralisticTwo: pluralisticTwo.id,
  inc2001: inc2001.id,
  guardianNaughton: guardianNaughton.id,
  guardianMacquarie: guardianMacquarie.id,
  kirkusEnshittification: kirkusEnshittification.id,
  slateIcycmi: slateIcycmi.id,
  abcFutureTense: abcFutureTense.id,
  registerInterview: registerInterview.id,
  effPodcast: effPodcast.id,
  guardianPodcast: guardianPodcast.id,
  msftVideo: msftVideo.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-cory-doctorow",
  generatedAt: "2026-09-17T03:00:00Z",
  subject: {
    kind: "person",
    handle: "cory-doctorow",
    displayName: "Cory Doctorow",
    alsoKnownAs: ["Cory Efram Doctorow"],
    summary:
      "Canadian-British-American science-fiction novelist, activist, and journalist: Boing Boing co-editor for nineteen years, EFF special advisor and former European director, Creative Commons publishing pioneer, and coiner of 'enshittification,' the American Dialect Society's 2023 Word of the Year.",
    identity: {
      wikidataId: "Q110436",
      officialSite: "https://pluralistic.net/",
      wikipedia: "https://en.wikipedia.org/wiki/Cory_Doctorow",
      profiles: [
        "https://craphound.com/",
        "https://pluralistic.net/",
        "https://doctorow.medium.com/",
        "https://mamot.fr/@pluralistic",
        "https://boingboing.net/author/cory_doctorow_1",
        "https://www.eff.org/about/staff/cory-doctorow",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:00:00Z",
    coverage: ["biography", "work", "beliefs", "philosophy", "projects", "media"],
  },
  sources: [
    craphoundBio,
    craphoundHome,
    pluralistic,
    wikidata,
    wikipedia,
    wikipediaEnshittification,
    isfdbLittleBrother,
    etymonline,
    boingboingAuthor,
    ftCapture,
    effStaff,
    effFind,
    effRejoin,
    ccRelease,
    adsWoty,
    macmillanLittleBrother,
    prhInternetCon,
    beaconChokepoint,
    mcdEnshittification,
    macmillanEnshittificationAudio,
    craphoundWelcome,
    craphoundRelicense,
    msftDrm,
    craphoundDrm20,
    craphoundNyt,
    craphoundCampbell,
    mediumSocialQuitting,
    pluralisticAmazon,
    locusSocialQuitting,
    pluralisticTiktok,
    wiredTiktok,
    mediumPluralisticThree,
    pluralisticTwo,
    inc2001,
    guardianNaughton,
    guardianMacquarie,
    kirkusEnshittification,
    slateIcycmi,
    abcFutureTense,
    registerInterview,
    effPodcast,
    guardianPodcast,
    msftVideo,
  ],
  claims: [
    // --- facts ---
    {
      id: "claim-born-1971",
      kind: "fact",
      text: "Cory Efram Doctorow was born on July 17, 1971, in Toronto, Ontario, Canada; his bio notes he now lives in Los Angeles and London.",
      sourceIds: [S.wikipedia, S.wikidata, S.craphoundBio],
    },
    {
      id: "claim-nationality",
      kind: "fact",
      text: "He holds Canadian, British, and American nationality.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-opencola",
      kind: "fact",
      text: "In June 1999 he co-founded the free-software peer-to-peer company OpenCola with John Henson and Grad Conn; it was sold to Open Text Corporation in the summer of 2003.",
      sourceIds: [S.wikipedia, S.inc2001],
    },
    {
      id: "claim-campbell-2000",
      kind: "fact",
      text: "He won the Year 2000 John W. Campbell Award for Best New Writer, presented alongside the Hugo Awards.",
      sourceIds: [S.craphoundCampbell, S.inc2001, S.wikipedia],
    },
    {
      id: "claim-boingboing-join",
      kind: "fact",
      text: "He began writing for Boing Boing around the start of 2001 — he describes his last day, January 29, 2020, as nearly exactly nineteen years after his first day — and became co-editor of the site.",
      sourceIds: [S.mediumPluralisticThree, S.boingboingAuthor],
    },
    {
      id: "claim-boingboing-exit",
      kind: "fact",
      text: "January 29, 2020 was his last day writing Boing Boing. He calls the departure 'unplanned (but overdue and amicable),' and remains a co-owner and reader but is no longer involved in the site.",
      sourceIds: [S.mediumPluralisticThree, S.pluralisticTwo],
    },
    {
      id: "claim-pluralistic-launch",
      kind: "fact",
      text: "On February 19, 2020 — three weeks after leaving Boing Boing — he launched Pluralistic, a solo, ad-free, tracker-free daily blog run on a POSSE ('Post Own Site, Share Everywhere') model mirrored to a newsletter, RSS, Mastodon, Tumblr, Medium, and (at the time) Twitter.",
      sourceIds: [S.pluralisticTwo, S.mediumPluralisticThree, S.pluralistic],
    },
    {
      id: "claim-eff-europe",
      kind: "fact",
      text: "He worked for the Electronic Frontier Foundation for four years as its European Affairs Coordinator, helping establish the UK Open Rights Group, before leaving the staff in January 2006 to write full-time.",
      sourceIds: [S.effRejoin, S.wikipedia, S.effStaff],
    },
    {
      id: "claim-pioneer-award",
      kind: "fact",
      text: "EFF gave him its Pioneer Award in 2007 for his body of work on digital civil liberties.",
      sourceIds: [S.effRejoin],
    },
    {
      id: "claim-fulbright",
      kind: "fact",
      text: "He was the 2006-2007 Canadian Fulbright Chair for Public Diplomacy at the USC Center on Public Diplomacy, including a year of writing and teaching residency in Los Angeles.",
      sourceIds: [S.wikipedia, S.craphoundBio],
    },
    {
      id: "claim-eff-rejoin-2015",
      kind: "fact",
      text: "In 2015 he rejoined EFF as special consultant to the Apollo 1201 Project, a mission 'to eradicate DRM in our lifetime'; he is currently listed as an EFF Special Advisor.",
      sourceIds: [S.effRejoin, S.effStaff],
    },
    {
      id: "claim-down-and-out",
      kind: "fact",
      text: "His first novel, Down and Out in the Magic Kingdom (Tor Books, 2003), was released January 9, 2003 with the full text free under a Creative Commons license — widely described, including by Doctorow and Creative Commons, as the first novel released under a CC license.",
      sourceIds: [S.ccRelease, S.craphoundWelcome, S.wikipedia],
    },
    {
      id: "claim-down-and-out-relicense",
      kind: "fact",
      text: "In February 2004 he relicensed Down and Out under the less restrictive Attribution-NonCommercial-ShareAlike license, explicitly permitting non-commercial derivative works such as translations, radio plays, and fan fiction.",
      sourceIds: [S.craphoundRelicense, S.wikipedia],
    },
    {
      id: "claim-msft-drm-talk",
      kind: "fact",
      text: "On June 17, 2004 he delivered his 'Microsoft Research DRM talk' in Redmond — 'Greetings fellow pirates!' — arguing DRM systems don't work and are bad for society, business, and artists; Microsoft Research still hosts the recording.",
      sourceIds: [S.msftDrm, S.msftVideo, S.craphoundDrm20],
    },
    {
      id: "claim-little-brother",
      kind: "fact",
      text: "Little Brother was published by Tor on April 29, 2008, debuted at number 9 on the New York Times children's chapter-books bestseller list, and won the 2009 John W. Campbell Memorial Award, the 2009 Prometheus Award, the White Pine Award, the Sunburst Award (young adult), and the Golden Duck Hal Clement Award; it was a Hugo and Nebula nominee.",
      sourceIds: [S.isfdbLittleBrother, S.macmillanLittleBrother, S.craphoundNyt, S.wikipedia],
    },
    {
      id: "claim-enshittification-coinage",
      kind: "fact",
      text: "He coined 'enshittification' in November 2022 — first in 'Social Quitting' (published on Medium November 15, 2022, later his January 2023 Locus column) and then in the Pluralistic post 'How monopoly enshittified Amazon' (November 28, 2022) — before the 'Tiktok's enshittification' post of January 21, 2023, republished by Wired on January 23, 2023, made it famous.",
      sourceIds: [S.mediumSocialQuitting, S.pluralisticAmazon, S.pluralisticTiktok, S.wiredTiktok, S.wikipediaEnshittification],
    },
    {
      id: "claim-enshittification-definition",
      kind: "fact",
      text: "His canonical formulation: 'Here is how platforms die: first, they are good to their users; then they abuse their users to make things better for their business customers; finally, they abuse those business customers to claw back all the value for themselves. Then, they die. I call this enshittification.'",
      sourceIds: [S.pluralisticTiktok, S.wiredTiktok, S.adsWoty],
    },
    {
      id: "claim-ads-woty",
      kind: "fact",
      text: "On January 5, 2024, the American Dialect Society selected 'enshittification' as its 2023 Word of the Year in its 34th annual vote; Australia's Macquarie Dictionary followed by naming it its 2024 Word of the Year.",
      sourceIds: [S.adsWoty, S.guardianMacquarie],
    },
    {
      id: "claim-enshittification-earlier-uses",
      kind: "fact",
      text: "The Oxford English Dictionary attests scattered earlier uses of 'enshittification' dating to 2013; Doctorow's November 2022 coinage was independent, and he is credited as the term's popularizer.",
      sourceIds: [S.wikipediaEnshittification, S.etymonline],
    },
    {
      id: "claim-chokepoint-book",
      kind: "fact",
      text: "Chokepoint Capitalism: How Big Tech and Big Content Captured Creative Labor Markets and How We'll Win Them Back, co-written with law scholar Rebecca Giblin, was published September 27, 2022 by Beacon Press in the US and Scribe in Australia and the UK.",
      sourceIds: [S.beaconChokepoint],
    },
    {
      id: "claim-internet-con",
      kind: "fact",
      text: "The Internet Con: How to Seize the Means of Computation was published in hardcover by Verso on September 5, 2023 (paperback September 3, 2024) and was a USA Today bestseller.",
      sourceIds: [S.prhInternetCon],
    },
    {
      id: "claim-enshittification-book",
      kind: "fact",
      text: "Enshittification: Why Everything Suddenly Got Worse and What to Do About It was published October 7, 2025 by MCD x FSG; Macmillan lists it as winner of the 2026 Locus Award for Nonfiction.",
      sourceIds: [S.mcdEnshittification, S.macmillanEnshittificationAudio, S.kirkusEnshittification],
    },
    {
      id: "claim-bibliography",
      kind: "fact",
      text: "His books include the Little Brother YA series (Little Brother 2008, Homeland 2013, Attack Surface 2020), the solarpunk novels Walkaway (2017) and The Lost Cause (2023), the Marty Hench forensic-accountant series (Red Team Blues 2023, The Bezzle 2024, Picks and Shovels 2025), and nonfiction including How to Destroy Surveillance Capitalism (2021), Chokepoint Capitalism (2022), The Internet Con (2023), and Enshittification (2025).",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "claim-next-book",
      kind: "fact",
      text: "His official bio, updated January 2026, lists his next book as The Reverse Centaur's Guide to Life After AI (June 2026).",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "claim-academic-posts",
      kind: "fact",
      text: "His bio lists him as a Cornell University AD White Professor-at-Large, an MIT Media Lab Research Affiliate, a Visiting Professor of Computer Science at the Open University, and a Visiting Professor of Practice at the University of North Carolina's School of Library and Information Science, with honorary doctorates in laws from York University and in computer science from the Open University.",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "claim-honors",
      kind: "fact",
      text: "He was inducted into the Canadian Science Fiction and Fantasy Hall of Fame in 2020, received the Sir Arthur Clarke Imagination in Service to Society Award in 2022, and the Media Ecology Association's Neil Postman Award for Career Achievement in Public Intellectual Activity in 2024.",
      sourceIds: [S.craphoundBio, S.prhInternetCon],
    },
    {
      id: "claim-boingboing-volume",
      kind: "fact",
      text: "His Boing Boing author archive spans roughly 2,700 paginated pages of posts — tens of thousands of items written across nineteen years.",
      sourceIds: [S.boingboingAuthor],
    },
    // --- stated beliefs ---
    {
      id: "claim-enshittification-thesis",
      kind: "stated_belief",
      text: "Doctorow argues enshittification is not individual greed alone but a structural failure: platforms decay when the disciplines that once constrained them — competition, regulation, worker power, and interoperable 'self-help' — collapse, letting executives 'twiddle' the knobs that shift value from users to business customers to shareholders.",
      sourceIds: [S.wiredTiktok, S.ftCapture, S.registerInterview],
    },
    {
      id: "claim-interop-remedy",
      kind: "stated_belief",
      text: "He holds that interoperability — including 'adversarial' or 'guerrilla' interop built without permission — is the shovel-ready remedy for platform power: forcing Big Tech to interoperate tears down walled gardens and lets users leave without losing their communities.",
      sourceIds: [S.prhInternetCon, S.effPodcast, S.locusSocialQuitting],
    },
    {
      id: "claim-doctorows-law",
      kind: "stated_belief",
      text: "'Doctorow's Law': 'Anytime someone puts a lock on something you own, against your wishes, and doesn't give you the key, they're not doing it for your benefit' — his axiom on DRM, which he has pressed on EFF's behalf for two decades.",
      sourceIds: [S.effRejoin, S.msftDrm],
    },
    {
      id: "claim-free-text-belief",
      kind: "stated_belief",
      text: "He believes giving away the full text of his books under permissive licenses builds rather than cannibalizes a writing career — the 2003 'grand experiment' with Down and Out 'worked out very satisfactorily,' and every book since carries a free download on craphound.com.",
      sourceIds: [S.craphoundWelcome, S.craphoundRelicense, S.craphoundBio],
    },
    {
      id: "claim-chokepoint-thesis",
      kind: "stated_belief",
      text: "With Rebecca Giblin he argues we live under 'chokepoint capitalism': corporations build insurmountable barriers to competition to seize value that should go to creative workers, and remedies run from transparency rights and collective action to radical interoperability and contract terminations.",
      sourceIds: [S.beaconChokepoint],
    },
    {
      id: "claim-antitrust-enforcement",
      kind: "stated_belief",
      text: "He argues the laws needed to break Big Tech already exist — the Sherman, Clayton, and FTC Acts — but have gone unenforced; he wants bans on predatory pricing and predatory acquisitions and 'muscular' privacy statutes.",
      sourceIds: [S.registerInterview, S.kirkusEnshittification],
    },
    {
      id: "claim-systemic-change",
      kind: "stated_belief",
      text: "He insists individual consumer choices cannot fix enshittification: 'Systemic problems just don't have individual solutions' — which is why he channels readers toward collective action through EFF.",
      sourceIds: [S.effFind],
    },
    {
      id: "claim-reversible-decisions",
      kind: "stated_belief",
      text: "He rejects great-man and deterministic accounts of tech history: the enshittocene was produced by 'specific decisions made by real people; decisions we can reverse and people whose names and pitchfork sizes we can learn.'",
      sourceIds: [S.ftCapture],
    },
    {
      id: "claim-posse-belief",
      kind: "stated_belief",
      text: "He chose a self-hosted site mirrored everywhere — rather than platform 'kremlinology' — because the ability to leave a service without penalty is 'the best defense we have against the scourge of enshittification.'",
      sourceIds: [S.mediumPluralisticThree, S.locusSocialQuitting],
    },
    {
      id: "claim-not-lawyer",
      kind: "stated_belief",
      text: "He describes himself to his hosts at Microsoft as 'not a lawyer — a kind of mouthpiece/activist type,' and frames his activism and fiction as one practice: 'I lead a double life: I'm also a science fiction writer.'",
      sourceIds: [S.msftDrm],
    },
    // --- patterns ---
    {
      id: "claim-daily-practice",
      kind: "pattern",
      text: "Across two publications and twenty-five years he has maintained a near-daily public writing practice: roughly nineteen years of daily Boing Boing posts followed, after a three-week pause, by six-plus years of Pluralistic essays published five or more days per week.",
      sourceIds: [S.mediumPluralisticThree, S.pluralisticTwo, S.boingboingAuthor],
    },
    {
      id: "claim-cc-consistency",
      kind: "pattern",
      text: "From Down and Out (2003) through his latest releases, every trade book is paired with a free Creative Commons download on craphound.com — a two-decade publishing discipline that treats free circulation as promotion rather than piracy.",
      sourceIds: [S.craphoundWelcome, S.craphoundBio, S.craphoundNyt],
    },
    {
      id: "claim-fiction-policy-loop",
      kind: "pattern",
      text: "His fiction and activism form one loop: OpenCola's software grew partly out of Down and Out's reputation-economy ideas, and novels from Little Brother to the Marty Hench series dramatize the same surveillance, DRM, monopoly, and forensic-analysis themes he argues as an activist.",
      sourceIds: [S.inc2001, S.macmillanLittleBrother, S.craphoundBio],
    },
    {
      id: "claim-insider-outsider",
      kind: "pattern",
      text: "He repeatedly occupies insider platforms — a Microsoft auditorium, the Financial Times, Cornell, MIT — to deliver anti-establishment arguments, a pattern visible from the 2004 DRM talk through the 2024 FT enshittification column.",
      sourceIds: [S.msftDrm, S.ftCapture, S.craphoundBio],
    },
    {
      id: "claim-coinage-pattern",
      kind: "pattern",
      text: "He has a sustained habit of minting diagnostic vocabulary that escapes into public use: 'enshittification,' 'chokepoint capitalism' (with Giblin), 'social quitting,' and the 'enshittocene' all originated in his essays and columns and recur in press coverage worldwide.",
      sourceIds: [S.adsWoty, S.beaconChokepoint, S.mediumSocialQuitting, S.guardianMacquarie],
    },
    // --- speculation ---
    {
      id: "claim-exit-timing-speculation",
      kind: "speculation",
      text: "The timing of his Boing Boing exit — weeks before the pandemic made owned channels decisive — plausibly reflected accumulated strain with platform-mediated publishing; beyond his own 'overdue and amicable' account, the motive is not publicly documented.",
      sourceIds: [S.mediumPluralisticThree, S.pluralisticTwo],
    },
    {
      id: "claim-word-spread-speculation",
      kind: "speculation",
      text: "The speed of 'enshittification's' spread likely owes something to his deliberate distribution design — the same word seeded simultaneously through Pluralistic, Wired, Medium, Twitter, and Mastodon — though the ADS record credits the word's own memetic fitness.",
      sourceIds: [S.adsWoty, S.wiredTiktok, S.mediumPluralisticThree],
    },
    {
      id: "claim-platform-death-speculation",
      kind: "speculation",
      text: "His lifecycle model predicts a fourth stage — 'then they die' — yet platforms like Facebook persist in a degraded state; whether terminal enshittification or indefinite decay is the true endgame remains an open empirical question the cited record does not settle.",
      sourceIds: [S.wiredTiktok, S.guardianNaughton, S.ftCapture],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1971-07-17",
      title: "Born in Toronto",
      summary: "Cory Efram Doctorow born in Toronto, Ontario, Canada.",
      location: "Toronto, Canada",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-opencola",
      kind: "founded",
      date: "1999-06",
      end: "2003",
      title: "Co-founded OpenCola",
      summary:
        "Free-software P2P company co-founded with John Henson and Grad Conn; sold to Open Text in summer 2003.",
      sourceIds: [S.wikipedia, S.inc2001],
    },
    {
      id: "event-campbell-award",
      kind: "award",
      date: "2000",
      title: "John W. Campbell Award for Best New Writer",
      summary: "Won the Year 2000 Campbell Award, presented with the Hugos.",
      sourceIds: [S.craphoundCampbell, S.inc2001],
    },
    {
      id: "event-boingboing",
      kind: "role",
      date: "2001",
      end: "2020-01-29",
      title: "Co-editor of Boing Boing",
      summary:
        "Wrote for Boing Boing nearly every day for nineteen years; remains a co-owner after stepping back.",
      organization: "Boing Boing",
      organizationHandle: "boing-boing",
      sourceIds: [S.mediumPluralisticThree, S.boingboingAuthor],
    },
    {
      id: "event-eff-europe",
      kind: "role",
      date: "2002",
      end: "2006-01",
      title: "EFF European Affairs Coordinator",
      summary:
        "Four years running EFF's European work; helped establish the UK Open Rights Group; left staff in January 2006 to write full-time.",
      organization: "Electronic Frontier Foundation",
      organizationHandle: "electronic-frontier-foundation",
      sourceIds: [S.effRejoin, S.wikipedia],
    },
    {
      id: "event-down-and-out",
      kind: "publication",
      date: "2003-01-09",
      title: "Down and Out in the Magic Kingdom released under Creative Commons",
      summary:
        "First novel, published by Tor Books with the full text free under a CC license — the first novel so released.",
      sourceIds: [S.ccRelease, S.craphoundWelcome],
    },
    {
      id: "event-msft-drm-talk",
      kind: "media",
      date: "2004-06-17",
      title: "Microsoft Research DRM talk",
      summary:
        "Delivered his canonical anti-DRM lecture at Microsoft, Redmond; the transcript became a reference document of the anti-DRM fight.",
      location: "Redmond, Washington",
      sourceIds: [S.msftDrm, S.msftVideo],
    },
    {
      id: "event-fulbright",
      kind: "education",
      date: "2006",
      end: "2007",
      title: "Canadian Fulbright Chair for Public Diplomacy",
      summary:
        "One-year writing and teaching residency at the USC Center on Public Diplomacy.",
      organization: "University of Southern California",
      location: "Los Angeles",
      organizationHandle: "university-of-southern-california",
      sourceIds: [S.wikipedia, S.craphoundBio],
    },
    {
      id: "event-pioneer-award",
      kind: "award",
      date: "2007",
      title: "EFF Pioneer Award",
      summary: "Honored for his body of work on digital civil liberties.",
      organization: "Electronic Frontier Foundation",
      organizationHandle: "electronic-frontier-foundation",
      sourceIds: [S.effRejoin],
    },
    {
      id: "event-little-brother",
      kind: "publication",
      date: "2008-04-29",
      title: "Little Brother published",
      summary:
        "YA novel that debuted at number 9 on the NYT children's chapter-books list — the first CC-licensed novel to make the list — later winning the Campbell Memorial, Prometheus, and Sunburst awards.",
      sourceIds: [S.isfdbLittleBrother, S.craphoundNyt, S.macmillanLittleBrother],
    },
    {
      id: "event-eff-rejoin",
      kind: "role",
      date: "2015",
      title: "Rejoined EFF for the Apollo 1201 anti-DRM project",
      summary:
        "Returned as special consultant on a mission 'to eradicate DRM in our lifetime'; now listed as EFF Special Advisor.",
      organization: "Electronic Frontier Foundation",
      organizationHandle: "electronic-frontier-foundation",
      sourceIds: [S.effRejoin, S.effStaff],
    },
    {
      id: "event-boingboing-last-day",
      kind: "milestone",
      date: "2020-01-29",
      title: "Last day writing Boing Boing",
      summary:
        "Nearly exactly nineteen years after his first day; he calls the split amicable and remains a co-owner.",
      sourceIds: [S.mediumPluralisticThree],
    },
    {
      id: "event-pluralistic",
      kind: "project",
      date: "2020-02-19",
      title: "Launched Pluralistic",
      summary:
        "Solo daily publication on a POSSE model: his own tracker-free WordPress site plus full-text RSS, a plaintext newsletter, and mirrors to Mastodon, Tumblr, Medium, and then-Twitter.",
      sourceIds: [S.pluralisticTwo, S.mediumPluralisticThree, S.pluralistic],
    },
    {
      id: "event-hall-of-fame",
      kind: "award",
      date: "2020",
      title: "Canadian Science Fiction and Fantasy Hall of Fame",
      summary: "Inducted in 2020, per his official bio.",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "event-chokepoint",
      kind: "publication",
      date: "2022-09-27",
      title: "Chokepoint Capitalism published",
      summary:
        "With Rebecca Giblin: how concentrated industries capture creative labor markets, and how to break the chokepoints.",
      sourceIds: [S.beaconChokepoint],
    },
    {
      id: "event-enshittification-coinage",
      kind: "milestone",
      date: "2022-11-15",
      title: "Coined 'enshittification'",
      summary:
        "First used in 'Social Quitting' (Medium, November 15, 2022) and 'How monopoly enshittified Amazon' (Pluralistic, November 28, 2022).",
      sourceIds: [S.mediumSocialQuitting, S.pluralisticAmazon],
    },
    {
      id: "event-tiktok-essay",
      kind: "publication",
      date: "2023-01-21",
      title: "'Tiktok's enshittification' / Wired 'Enshittification of TikTok'",
      summary:
        "Pluralistic post of January 21 republished by Wired on January 23, 2023 — the essay that spread the word worldwide.",
      sourceIds: [S.pluralisticTiktok, S.wiredTiktok],
    },
    {
      id: "event-marty-hench",
      kind: "publication",
      date: "2023",
      title: "Red Team Blues — start of the Marty Hench series",
      summary:
        "Forensic-accountant thriller series: Red Team Blues (2023), The Bezzle (2024), Picks and Shovels (2025).",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "event-internet-con",
      kind: "publication",
      date: "2023-09-05",
      title: "The Internet Con published",
      summary:
        "Verso hardcover: the case for seizing the means of computation through interoperability; a USA Today bestseller.",
      sourceIds: [S.prhInternetCon],
    },
    {
      id: "event-lost-cause",
      kind: "publication",
      date: "2023",
      title: "The Lost Cause published",
      summary: "Solarpunk climate novel from Tor Books.",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "event-ads-woty",
      kind: "award",
      date: "2024-01-05",
      title: "ADS names 'enshittification' 2023 Word of the Year",
      summary:
        "The American Dialect Society's 34th annual vote; Macquarie Dictionary named it its 2024 Word of the Year later that year.",
      organization: "American Dialect Society",
      organizationHandle: "american-dialect-society",
      sourceIds: [S.adsWoty, S.guardianMacquarie],
    },
    {
      id: "event-enshittification-book",
      kind: "publication",
      date: "2025-10-07",
      title: "Enshittification (book) published",
      summary:
        "MCD x FSG nonfiction expanding the essay into a diagnosis and remedy; listed by Macmillan as winner of the 2026 Locus Award for Nonfiction.",
      sourceIds: [S.mcdEnshittification, S.macmillanEnshittificationAudio],
    },
  ],
  themes: [
    {
      id: "theme-enshittification",
      kind: "philosophy",
      status: "stated",
      title: "The enshittification lifecycle",
      summary:
        "Platforms are good to users, then abuse users for business customers, then abuse business customers for shareholders, then die — a consequence of 'twiddling' plus two-sided markets and lock-in, enabled when competition, regulation, worker power, and self-help all fail.",
      sourceIds: [S.wiredTiktok, S.pluralisticTiktok, S.ftCapture],
    },
    {
      id: "theme-interop",
      kind: "belief",
      status: "stated",
      title: "Interoperability and the right of exit",
      summary:
        "The remedy for platform power is interoperability — mandated or adversarial — because lowering switching costs lets communities leave together. 'The ability to leave a service without paying a price is the best defense we have against the scourge of enshittification.'",
      sourceIds: [S.prhInternetCon, S.locusSocialQuitting, S.effPodcast],
    },
    {
      id: "theme-chokepoint",
      kind: "philosophy",
      status: "stated",
      title: "Chokepoint capitalism",
      summary:
        "With Rebecca Giblin: monopolies and monopsonies construct 'anti-competitive flywheels' that lock in buyers and sellers and squeeze creative labor — visible from Amazon's 45% junk fees to Spotify's ghost artists — and labor must batter the chokepoints back.",
      sourceIds: [S.beaconChokepoint, S.pluralisticAmazon],
    },
    {
      id: "theme-drm",
      kind: "belief",
      status: "stated",
      title: "Against digital locks",
      summary:
        "Two decades of anti-DRM advocacy: the 2004 Microsoft talk, 'Doctorow's Law,' the Apollo 1201 project. A lock on something you own, without the key, is never for your benefit — and DRM hands platforms the legal teeth that make enshittification enforceable.",
      sourceIds: [S.msftDrm, S.effRejoin, S.craphoundDrm20],
    },
    {
      id: "theme-free-circulation",
      kind: "method",
      status: "stated",
      title: "Free circulation as publishing practice",
      summary:
        "Since 2003 every trade book has carried a free Creative Commons text on craphound.com. He treats copying as promotion: the enemy of the midlist writer is obscurity, not piracy — a discipline he has maintained for over twenty years.",
      sourceIds: [S.craphoundWelcome, S.craphoundRelicense, S.craphoundBio],
    },
    {
      id: "theme-own-your-channel",
      kind: "method",
      status: "stated",
      title: "POSSE: post own site, share everywhere",
      summary:
        "Pluralistic is engineered to be un-twiddleable: a self-hosted, tracker-free WordPress site, full-text RSS, plaintext newsletter, and mirrors on every platform — designed so no intermediary can decide whether his readers see his work.",
      sourceIds: [S.mediumPluralisticThree, S.pluralistic, S.pluralisticTwo],
    },
    {
      id: "theme-sf-as-lab",
      kind: "method",
      status: "inferred",
      title: "Fiction as policy laboratory",
      summary:
        "His novels and his advocacy share one research program — reputation economies seeded OpenCola, Little Brother dramatizes surveillance-state pushback, Marty Hench turns forensic accounting into thriller mechanics — suggesting the fiction functions as scenario-testing for the politics.",
      sourceIds: [S.inc2001, S.craphoundBio, S.macmillanLittleBrother],
    },
    {
      id: "theme-anti-determinism",
      kind: "philosophy",
      status: "stated",
      title: "Against 'great forces' determinism",
      summary:
        "He rejects both tech-genius mythology and doom: the enshittocene came from named people's reversible decisions, and the goal is not the good old days but 'the good new days' — optimism framed as organizing rather than sentiment.",
      sourceIds: [S.ftCapture, S.effPodcast],
    },
    {
      id: "theme-tech-criticism-as-practice",
      kind: "practice",
      status: "reported",
      title: "Criticism as a working craft",
      summary:
        "Press coverage frames him less as a pundit than as a practitioner: daily essays, books, podcasts, standards work, and activism interlock so that each column is both diagnosis and recruitment for systemic fixes.",
      sourceIds: [S.guardianNaughton, S.registerInterview, S.abcFutureTense],
    },
  ],
  works: [
    {
      id: "work-down-and-out",
      kind: "book",
      status: "published",
      title: "Down and Out in the Magic Kingdom",
      date: "2003-01-09",
      summary:
        "Debut novel (Tor Books); first novel released under a Creative Commons license, relicensed BY-NC-SA in February 2004.",
      sourceIds: [S.ccRelease, S.craphoundWelcome, S.craphoundRelicense],
    },
    {
      id: "work-little-brother",
      kind: "book",
      status: "published",
      title: "Little Brother",
      date: "2008-04-29",
      summary:
        "YA techno-thriller; NYT bestseller; won the 2009 Campbell Memorial, Prometheus, White Pine, and Sunburst awards; Hugo and Nebula nominee.",
      sourceIds: [S.macmillanLittleBrother, S.isfdbLittleBrother, S.craphoundNyt],
    },
    {
      id: "work-homeland",
      kind: "book",
      status: "published",
      title: "Homeland",
      date: "2013",
      summary: "Second Little Brother novel.",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "work-walkaway",
      kind: "book",
      status: "published",
      title: "Walkaway",
      date: "2017",
      summary: "Solarpunk post-scarcity novel (Tor/Head of Zeus).",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "work-attack-surface",
      kind: "book",
      status: "published",
      title: "Attack Surface",
      date: "2020",
      summary: "Third Little Brother novel, following counterterrorism contractor Masha.",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "work-destroy-surveillance",
      kind: "book",
      status: "published",
      title: "How to Destroy Surveillance Capitalism",
      date: "2021",
      summary: "Nonfiction (OneZero/Medium) arguing monopoly, not ads alone, is the core harm.",
      sourceIds: [S.effStaff, S.craphoundBio],
    },
    {
      id: "work-chokepoint",
      kind: "book",
      status: "published",
      title: "Chokepoint Capitalism",
      date: "2022-09-27",
      summary:
        "With Rebecca Giblin (Beacon Press US; Scribe ANZ/UK): monopoly and monopsony capture of creative labor markets.",
      sourceIds: [S.beaconChokepoint],
    },
    {
      id: "work-red-team-blues",
      kind: "book",
      status: "published",
      title: "Red Team Blues",
      date: "2023",
      summary: "First Marty Hench forensic-accountant thriller (Tor).",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "work-internet-con",
      kind: "book",
      status: "published",
      title: "The Internet Con: How to Seize the Means of Computation",
      date: "2023-09-05",
      summary: "Verso; the interoperability case against Big Tech; USA Today bestseller.",
      sourceIds: [S.prhInternetCon],
    },
    {
      id: "work-lost-cause",
      kind: "book",
      status: "published",
      title: "The Lost Cause",
      date: "2023",
      summary: "Solarpunk climate-transition novel (Tor).",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "work-bezzle",
      kind: "book",
      status: "published",
      title: "The Bezzle",
      date: "2024",
      summary: "Second Marty Hench novel (Tor).",
      sourceIds: [S.craphoundBio, S.effStaff],
    },
    {
      id: "work-picks-and-shovels",
      kind: "book",
      status: "published",
      title: "Picks and Shovels",
      date: "2025",
      summary: "Third Marty Hench novel — the series' origin story (Tor).",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "work-enshittification",
      kind: "book",
      status: "published",
      title: "Enshittification: Why Everything Suddenly Got Worse and What to Do About It",
      date: "2025-10-07",
      summary:
        "MCD x FSG nonfiction expanding the thesis into case studies and remedies; 2026 Locus Award for Nonfiction per Macmillan.",
      sourceIds: [S.mcdEnshittification, S.macmillanEnshittificationAudio, S.kirkusEnshittification],
    },
    {
      id: "work-reverse-centaur",
      kind: "book",
      status: "in_progress",
      title: "The Reverse Centaur's Guide to Life After AI",
      date: "2026-06",
      summary:
        "Announced on his January 2026 bio as his next book (June 2026); publication status after that date is not captured in the cited record.",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "work-pluralistic",
      kind: "project",
      status: "ongoing",
      title: "Pluralistic",
      date: "2020-02-19",
      summary:
        "His daily solo publication: ad-free, tracker-free, full-text RSS and plaintext newsletter, mirrored across platforms under the POSSE model.",
      sourceIds: [S.pluralistic, S.pluralisticTwo, S.mediumPluralisticThree],
    },
    {
      id: "work-boingboing",
      kind: "project",
      status: "completed",
      title: "Boing Boing (co-editor, 2001-2020)",
      summary:
        "Nineteen years of near-daily posts on the blog he co-edited; he remains a co-owner. His author archive runs to roughly 2,700 pages.",
      sourceIds: [S.boingboingAuthor, S.mediumPluralisticThree],
    },
    {
      id: "work-open-rights-group",
      kind: "project",
      status: "completed",
      title: "UK Open Rights Group (co-founder)",
      summary:
        "British digital-rights organization he helped establish while EFF's European Affairs Coordinator.",
      sourceIds: [S.effStaff, S.wikipedia, S.craphoundBio],
    },
  ],
  appearances: [
    {
      id: "appearance-msft-2004",
      title: "Microsoft Research DRM talk",
      venue: "Microsoft Research, Redmond",
      publishedAt: "2004-06-17",
      participants: ["Cory Doctorow"],
      summary:
        "His canonical anti-DRM lecture, hosted by the company whose DRM strategy it attacked; Microsoft still hosts the recording.",
      media: [
        { type: "video", url: "https://www.microsoft.com/en-us/research/video/drm-and-msft-a-product-no-customer-wants/", sourceId: S.msftVideo },
        { type: "transcript", url: "https://craphound.com/msftdrm.txt", sourceId: S.msftDrm },
      ],
      sourceIds: [S.msftDrm, S.msftVideo],
    },
    {
      id: "appearance-slate-icymi",
      title: "TikTok Isn't For Creators Anymore",
      venue: "Slate ICYMI podcast",
      publishedAt: "2023-01-28",
      participants: ["Cory Doctorow", "Rachelle Hampton"],
      summary:
        "Interview on the Wired enshittification essay, platform lifecycles, and regulation.",
      media: [
        { type: "audio", url: "https://slate.com/podcasts/icymi/2023/01/cory-doctorow-how-online-platforms-die", sourceId: S.slateIcycmi },
      ],
      sourceIds: [S.slateIcycmi],
    },
    {
      id: "appearance-abc-future-tense",
      title: "Platform capitalism and the curse of 'enshittification'",
      venue: "ABC Radio National — Future Tense",
      publishedAt: "2023-10-29",
      participants: ["Cory Doctorow"],
      summary:
        "Feature interview on why the digital world feels exploitative and how it might be improved; originally broadcast July 2, 2023.",
      media: [
        { type: "audio", url: "https://www.abc.net.au/listen/programs/futuretense/cory-doctorow-enshittification-platform-capitalism/102953478", sourceId: S.abcFutureTense },
      ],
      sourceIds: [S.abcFutureTense],
    },
    {
      id: "appearance-defcon-2023",
      title: "DEF CON enshittification speech",
      venue: "DEF CON",
      publishedAt: "2023",
      participants: ["Cory Doctorow"],
      summary:
        "Speech on the enshittification thesis at the 2023 DEF CON infosec conference, cited by The Register's interview.",
      sourceIds: [S.registerInterview],
    },
    {
      id: "appearance-register-2024",
      title: "Cory Doctorow wants to wipe away enshittification of tech",
      venue: "The Register",
      publishedAt: "2024-01-30",
      participants: ["Cory Doctorow"],
      summary:
        "Interview on the causes of enshittification and the dormant competition law needed to reverse it.",
      media: [
        { type: "article", url: "https://www.theregister.com/off-prem/2024/01/30/cory-doctorow-wants-to-wipe-away-enshittification-of-tech/713793", sourceId: S.registerInterview },
      ],
      sourceIds: [S.registerInterview],
    },
    {
      id: "appearance-eff-podcast",
      title: "Fighting Enshittification",
      venue: "EFF Podcast",
      publishedAt: "2024-06",
      participants: ["Cory Doctorow", "Cindy Cohn", "Jason Kelley"],
      summary:
        "EFF's Cindy Cohn and Jason Kelley on the enshittification analysis and the interoperability remedy.",
      media: [
        { type: "audio", url: "https://www.eff.org/deeplinks/2024/06/podcast-episode-fighting-enshittification", sourceId: S.effPodcast },
      ],
      sourceIds: [S.effPodcast],
    },
    {
      id: "appearance-guardian-podcast",
      title: "'Enshittification': how we got the internet no one asked for",
      venue: "The Guardian podcast",
      publishedAt: "2025-11-24",
      participants: ["Cory Doctorow", "Nosheen Iqbal"],
      summary:
        "Guardian interview tying the book to the daily experience of platform decay.",
      media: [
        { type: "audio", url: "https://www.theguardian.com/news/audio/2025/nov/24/enshittification-how-we-got-the-internet-no-one-asked-for-podcast", sourceId: S.guardianPodcast },
      ],
      sourceIds: [S.guardianPodcast],
    },
  ],
  relations: [
    {
      id: "rel-opencola",
      kind: "founded",
      target: "opencola",
      targetName: "OpenCola",
      targetKind: "organization",
      note: "Co-founded the free-software peer-to-peer company in June 1999; sold to Open Text Corporation in summer 2003.",
      start: "1999-06",
      end: "2003",
      sourceIds: [S.wikipedia, S.inc2001],
    },
    {
      id: "rel-john-henson",
      kind: "cofounder",
      target: "john-henson",
      targetName: "John Henson",
      note: "OpenCola co-founder.",
      sourceIds: [S.wikipedia, S.inc2001],
    },
    {
      id: "rel-grad-conn",
      kind: "cofounder",
      target: "grad-conn",
      targetName: "Grad Conn",
      note: "OpenCola co-founder.",
      sourceIds: [S.wikipedia, S.inc2001],
    },
    {
      id: "rel-open-rights-group",
      kind: "founded",
      target: "open-rights-group",
      targetName: "Open Rights Group",
      targetKind: "organization",
      note: "Helped establish the UK digital-rights organization while serving as EFF's European Affairs Coordinator.",
      targetWikidataId: "Q3397639",
      sourceIds: [S.effRejoin, S.wikipedia, S.effStaff],
    },
    {
      id: "rel-electronic-frontier-foundation",
      kind: "employed_by",
      target: "electronic-frontier-foundation",
      targetName: "Electronic Frontier Foundation",
      targetKind: "organization",
      note: "European Affairs Coordinator for four years until January 2006; rejoined in 2015 as Apollo 1201 special consultant and is now an EFF Special Advisor.",
      start: "2002",
      targetWikidataId: "Q624023",
      sourceIds: [S.effRejoin, S.effStaff, S.effFind, S.wikipedia],
    },
    {
      id: "rel-boing-boing",
      kind: "employed_by",
      target: "boing-boing",
      targetName: "Boing Boing",
      targetKind: "organization",
      note: "Wrote nearly every day for nineteen years as co-editor, 2001 to January 29, 2020; remains a co-owner.",
      start: "2001",
      end: "2020-01-29",
      targetWikidataId: "Q891048",
      sourceIds: [S.mediumPluralisticThree, S.boingboingAuthor, S.pluralisticTwo],
    },
    {
      id: "rel-rebecca-giblin",
      kind: "collaborated",
      target: "rebecca-giblin",
      targetName: "Rebecca Giblin",
      note: "Co-wrote Chokepoint Capitalism (Beacon Press US; Scribe ANZ/UK, 2022).",
      targetWikidataId: "Q114412209",
      sourceIds: [S.beaconChokepoint],
    },
    {
      id: "rel-university-of-southern-california",
      kind: "member_of",
      target: "university-of-southern-california",
      targetName: "University of Southern California",
      targetKind: "organization",
      note: "2006–07 Canadian Fulbright Chair for Public Diplomacy at the USC Center on Public Diplomacy — a year of writing and teaching residency in Los Angeles.",
      start: "2006",
      end: "2007",
      targetWikidataId: "Q4614",
      sourceIds: [S.wikipedia, S.craphoundBio],
    },
    {
      id: "rel-cornell-university",
      kind: "member_of",
      target: "cornell-university",
      targetName: "Cornell University",
      targetKind: "organization",
      note: "AD White Professor-at-Large, per his bio.",
      targetWikidataId: "Q49115",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "rel-mit-media-lab",
      kind: "member_of",
      target: "mit-media-lab",
      targetName: "MIT Media Lab",
      targetKind: "organization",
      note: "Research Affiliate, per his bio.",
      targetWikidataId: "Q1373549",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "rel-open-university",
      kind: "member_of",
      target: "open-university",
      targetName: "The Open University",
      targetKind: "organization",
      note: "Visiting Professor of Computer Science; also an honorary doctorate in computer science.",
      targetWikidataId: "Q2413375",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "rel-university-of-north-carolina",
      kind: "member_of",
      target: "university-of-north-carolina",
      targetName: "University of North Carolina",
      targetKind: "organization",
      note: "Visiting Professor of Practice at the School of Library and Information Science, per his bio.",
      sourceIds: [S.craphoundBio],
    },
    {
      id: "rel-rachelle-hampton",
      kind: "interviewed_by",
      target: "rachelle-hampton",
      targetName: "Rachelle Hampton",
      note: "Slate ICYMI interview about the Wired enshittification essay, January 2023.",
      sourceIds: [S.slateIcycmi],
    },
    {
      id: "rel-cindy-cohn",
      kind: "interviewed_by",
      target: "cindy-cohn",
      targetName: "Cindy Cohn",
      note: "EFF podcast episode on the enshittification analysis and the interoperability remedy.",
      targetWikidataId: "Q5120503",
      sourceIds: [S.effPodcast],
    },
    {
      id: "rel-jason-kelley",
      kind: "interviewed_by",
      target: "jason-kelley",
      targetName: "Jason Kelley",
      note: "EFF podcast episode on the enshittification analysis and the interoperability remedy.",
      sourceIds: [S.effPodcast],
    },
    {
      id: "rel-nosheen-iqbal",
      kind: "interviewed_by",
      target: "nosheen-iqbal",
      targetName: "Nosheen Iqbal",
      note: "Guardian podcast interview tying the book to the daily experience of platform decay, November 2025.",
      sourceIds: [S.guardianPodcast],
    },
  ],
  openQuestions: [
    "His exact first day at Boing Boing is not pinned down: he describes January 29, 2020 as 'nearly exactly 19 years after my first day,' so the start is early 2001 but the specific date is not in the cited record.",
    "Down and Out's release date is split: Creative Commons and craphound date the CC release to January 9, 2003, while Wikipedia's infobox gives February 1, 2003 — probably the print-on-shelves date versus the free-text release.",
    "Whether The Reverse Centaur's Guide to Life After AI shipped on its announced June 2026 schedule is not covered by the cited record (his bio, last updated January 2026, still lists it as 'next').",
    "The OED attests 'enshittification' uses back to 2013; how much weight to give those scattered earlier uses versus Doctorow's independent November 2022 coinage is a framing question, not a settled one.",
    "The extent of his current co-ownership stake and formal status at Boing Boing — he calls it 'an indefinite, unpaid sabbatical' — is not documented beyond his own account.",
    "His DRM-free audiobook self-publishing operation (Kickstarter campaigns for titles like Attack Surface and Picks and Shovels) is well known but not covered by any source catalogued here.",
  ],
  body: `Cory Doctorow is a Canadian-British-American science-fiction novelist, activist, and journalist whose career fuses three crafts that usually live apart: daily web writing, digital-rights advocacy, and fiction. Born July 17, 1971 in Toronto, he now lives in Los Angeles and London. The throughline is a single argument, pressed for twenty-five years: technology's failures are made by identifiable people making reversible decisions, and the cure is giving users exit, interoperability, and law that bites.

## Formation

Doctorow came up through the 1990s web as a writer-entrepreneur: he co-founded the free-software peer-to-peer company OpenCola in June 1999 (sold to Open Text in 2003), won the Year 2000 John W. Campbell Award for Best New Writer, and in early 2001 began writing for Boing Boing — a daily habit that would run nineteen years and fill roughly 2,700 paginated archive pages. From 2002 to January 2006 he ran the Electronic Frontier Foundation's European work as European Affairs Coordinator, helping establish the UK Open Rights Group; EFF gave him its Pioneer Award in 2007. He spent 2006-2007 as the Canadian Fulbright Chair for Public Diplomacy at USC, and in 2015 rejoined EFF as special consultant to the Apollo 1201 Project — a mission, in its words, to eradicate DRM in our lifetime. He is now an EFF Special Advisor.

## The CC pioneer

His debut novel, *Down and Out in the Magic Kingdom* (Tor Books), was released on January 9, 2003 with its full text free under a Creative Commons license — the first novel so released. A year later he relicensed it under the less restrictive BY-NC-SA license, explicitly permitting translations, adaptations, and fan fiction. The experiment convinced him that obscurity, not piracy, is the writer's enemy; every trade book since has carried a free download on craphound.com. *Little Brother* (April 29, 2008) made the pairing commercial: it debuted at number 9 on the New York Times children's chapter-books list — the first CC-licensed novel to chart — and went on to win the 2009 Campbell Memorial, Prometheus, White Pine, and Sunburst awards.

His on-stage manifesto is the June 17, 2004 Microsoft Research DRM talk — delivered in Redmond to the company building the locks — which reduced his case to five points: DRM doesn't work, and it is bad for society, business, artists, and Microsoft itself. The associated axiom, "Doctorow's Law," holds that anyone who locks something you own without giving you the key is not doing it for your benefit.

## Enshittification

In November 2022, watching Twitter convulse under new ownership, Doctorow reached for a word. "Social Quitting" (published November 15 on Medium, later his January 2023 *Locus* column) and "How monopoly enshittified Amazon" (Pluralistic, November 28) introduced *enshittification*: first platforms are good to users, then they abuse users to please business customers, then they abuse business customers to claw value back for shareholders — then they die. The January 21, 2023 Pluralistic post "Tiktok's enshittification," republished by *Wired* two days later, carried the word worldwide. On January 5, 2024 the American Dialect Society named it the 2023 Word of the Year; Australia's Macquarie Dictionary made it the 2024 Word of the Year. (The OED attests scattered earlier uses back to 2013 — Doctorow's coinage was independent and is the one that spread.)

For Doctorow the word is diagnosis, not complaint. His version names the mechanism — "twiddling," the silent reallocation of value inside a two-sided market — and the four collapsed disciplines that once prevented it: competition, regulation, worker power, and interoperable self-help. His February 8, 2024 *Financial Times* column extended the frame beyond platforms to "the enshittocene," the general condition of services turning into giant piles of shit.

## The books

Two nonfiction tracks anchor the argument. *Chokepoint Capitalism* (with Rebecca Giblin, Beacon Press, September 27, 2022) anatomizes how concentrated industries choke off creative labor markets; *The Internet Con: How to Seize the Means of Computation* (Verso, September 5, 2023), a USA Today bestseller, is the remedy tract — interoperability as the disassembly manual for Big Tech. The novels dramatize the same material: the *Little Brother* YA series (2008-2020), the solarpunk *Walkaway* (2017) and *The Lost Cause* (2023), and the Marty Hench forensic-accountant thrillers (*Red Team Blues* 2023, *The Bezzle* 2024, *Picks and Shovels* 2025). *Enshittification* (MCD x FSG, October 7, 2025) expanded the essay into a book — listed by Macmillan as the 2026 Locus Award for Nonfiction winner — and his bio announces *The Reverse Centaur's Guide to Life After AI* for June 2026.

## The practice

On January 29, 2020 — nearly exactly nineteen years after his first day — Doctorow stopped writing Boing Boing. Three weeks later he launched Pluralistic, built to be un-twiddleable: a self-hosted, tracker-free site ("we don't collect or retain any data at all ever period"), full-text RSS, a plaintext newsletter, and mirrors on every platform under the Indieweb POSSE principle — post own site, share everywhere. The publication is itself the argument: rather than play "platform kremlinology," he built a channel no intermediary can throttle, exactly the right of exit he prescribes for everyone else.

Honors cluster late: Canadian Science Fiction and Fantasy Hall of Fame (2020), the Sir Arthur Clarke Imagination in Service to Society Award (2022), the Media Ecology Association's Neil Postman Award (2024), plus honorary doctorates from York University (laws) and the Open University (computer science). He is a Cornell AD White Professor-at-Large, an MIT Media Lab Research Affiliate, and holds visiting posts at the Open University and UNC's library school.

## What remains open

The index's seams are deliberate: the exact Boing Boing start date survives only as "nearly exactly 19 years" before January 29, 2020; *Down and Out*'s release date is split between January 9 (the CC release) and February 1, 2003 (the print date); and the June 2026 publication status of *The Reverse Centaur* postdates his last bio update. His DRM-free audiobook operation — self-published through crowdfunding because Audible mandates DRM — is real and central to his practice, but no source in this catalog covers it directly.

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
