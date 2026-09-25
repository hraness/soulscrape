#!/usr/bin/env bun
/** Generate examples/people/riley-walz/person-index.json with derived source ids. */

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

const walzr = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Riley Walz",
  url: "https://www.walzr.com/",
  publisher: "walzr.com",
  notes:
    "The subject's own project index; lists his works with his own one-line descriptions.",
});
const walzrBop = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bop Spotter",
  url: "https://walzr.com/bop-spotter",
  publisher: "walzr.com",
  notes:
    "Live project page; his own framing calls it 'culture surveillance' for music.",
});
const walzrImg = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "IMG_0001",
  url: "https://walzr.com/IMG_0001",
  publisher: "walzr.com",
});
const walzrLooks = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "LooksMapping",
  url: "https://walzr.com/looksmapping/",
  publisher: "walzr.com",
});
const walzrWeather = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Weather Watching",
  url: "https://walzr.com/weather-watching",
  publisher: "walzr.com",
});
const jmail = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Jmail — Jeffrey Epstein's Emails",
  url: "https://jmail.world/",
  publisher: "jmail.world",
});
const panama = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Panama Playlists",
  url: "https://panamaplaylists.com/",
  publisher: "panamaplaylists.com",
});
const paintastreet = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bid to name a street in San Francisco",
  url: "https://paintastreet.com/auction",
  publisher: "paintastreet.com",
  notes: "The naming-rights auction page for the alley co-owned by the subject.",
});
const rtwlz = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Riley Walz (@rtwlz) on X",
  url: "https://x.com/rtwlz",
  publisher: "X",
});
const blogCandidate = source({
  binding: "first_person",
  mediaType: "article",
  title: "This Candidate Does Not Exist",
  url: "https://walzr.com/blog/this-candidate-does-not-exist",
  publisher: "walzr.com",
  notes: "The subject's own write-up of the fake-candidate verification stunt.",
});
const looksPaper = source({
  binding: "first_person",
  mediaType: "pdf",
  title:
    "Methodology of LooksMapping: Quantifying Superficiality via Neural Networks",
  url: "https://walzr.com/looksmapping/paper.pdf",
  publisher: "walzr.com",
  notes: "Self-published methodology paper describing the LooksMapping pipeline.",
});
const appsumo = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Numerous.ai - Use ChatGPT in spreadsheets",
  url: "https://appsumo.com/products/numerousai/",
  publisher: "AppSumo",
  notes:
    "Self-authored product listing in which the founders describe starting Numerous.ai in December 2022.",
});
const wiredProfile = source({
  binding: "interview",
  mediaType: "article",
  title: "The Guy Behind the Most Nostalgic Sites on the Internet",
  url: "https://www.wired.com/story/riley-walz-the-guy-behind-the-most-nostalgic-sites-on-the-internet/",
  publisher: "WIRED",
  publishedAt: "2024-11-29",
  authors: ["Angela Watercutter"],
});
const newyorker = source({
  binding: "interview",
  mediaType: "article",
  title: "The Artist Exposing the Data We Leave Online",
  url: "https://www.newyorker.com/culture/infinite-scroll/the-artist-exposing-the-data-we-leave-online",
  publisher: "The New Yorker",
  publishedAt: "2024-12-18",
  authors: ["Kyle Chayka"],
});
const sfalex = source({
  binding: "interview",
  mediaType: "article",
  title: "Training the Idea Muscle",
  url: "https://sfalexandria.com/posts/rileys-ideas/",
  publisher: "SF Alexandria",
  notes:
    "A profile by a longtime friend covering his early projects, MSCHF internship, and move to San Francisco.",
});
const tbpnSep = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Peter Thiel Gets Apocalyptic, The Myth of AI Millions, X Timeline Reactions",
  url: "https://podcasts.apple.com/us/podcast/peter-thiel-gets-apocalyptic-the-myth-of-ai-millions/id1772360235?i=1000728291972",
  publisher: "TBPN",
  publishedAt: "2025-09-24",
  notes:
    "Live tech talk show segment in which Walz explains the Find My Parking Cops scrape the day after launch.",
});
const tbpnApr = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Tokenmaxxing, SF Street Name Auction, Corporate Retreat Gone Wrong",
  url: "https://podcasts.apple.com/us/podcast/tokenmaxxing-sf-street-name-auction-corporate-retreat/id1772360235?i=1000760132117",
  publisher: "TBPN",
  publishedAt: "2026-04-07",
  notes:
    "Segment on the alley purchase, the crowdsourced mural, and the live naming-rights auction.",
});
const oversight = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Oversight Committee Releases Additional Epstein Estate Documents",
  url: "https://oversight.house.gov/release/oversight-committee-releases-additional-epstein-estate-documents/",
  publisher: "U.S. House Committee on Oversight and Government Reform",
  publishedAt: "2025-11-12",
  notes:
    "The official release of roughly 20,000 pages of Epstein estate documents that Jmail renders.",
});
const cnn = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Exclusive: A high school student created a fake 2020 candidate. Twitter verified it",
  url: "https://www.cnn.com/2020/02/28/tech/fake-twitter-candidate-2020/index.html",
  publisher: "CNN Business",
  publishedAt: "2020-02-28",
  authors: ["Donie O'Sullivan"],
});
const nytMehrans = source({
  binding: "reporting",
  mediaType: "article",
  title: "New York's Hottest Steakhouse Was a Fake, Until Saturday Night",
  url: "https://www.nytimes.com/2023/09/25/dining/nyc-best-fake-steakhouse.html",
  publisher: "The New York Times",
  publishedAt: "2023-09-25",
});
const guardianMehrans = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Made-up New York restaurant goes from internet joke to one-night-only reality",
  url: "https://www.theguardian.com/us-news/2023/sep/26/mehrans-steak-house-new-york-opening",
  publisher: "The Guardian",
  publishedAt: "2023-09-26",
});
const kqed = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "'Bop Spotter' Is a Secret Phone Eavesdropping on the Mission's Music Tastes",
  url: "https://www.kqed.org/arts/13965882/bop-spotter-riley-walz-mission-district-music-tastes-tech",
  publisher: "KQED",
  publishedAt: "2024-10-01",
});
const wapoBop = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "'Bop Spotter' captures the music of one San Francisco street corner",
  url: "https://www.washingtonpost.com/technology/2024/10/04/bop-spotter-shazam-san-francisco/",
  publisher: "The Washington Post",
  publishedAt: "2024-10-04",
});
const nprBop = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "An old phone in a plastic box captures the cultural vibes of a San Francisco neighborhood",
  url: "https://www.npr.org/2024/10/04/nx-s1-5135714/an-old-phone-in-a-plastic-box-captures-the-cultural-vibes-of-a-san-francisco-neighborhood",
  publisher: "NPR",
  publishedAt: "2024-10-04",
});
const wapoImg = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "YouTube is full of old, unseen home videos. Now you can watch them at random.",
  url: "https://www.washingtonpost.com/technology/2024/11/29/youtube-nostalgia-home-videos/",
  publisher: "The Washington Post",
  publishedAt: "2024-11-29",
});
const nbcSleuths = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Why internet sleuths say they won't help find the UnitedHealthcare CEO suspect",
  url: "https://www.nbcnews.com/tech/internet/internet-sleuths-say-wont-help-find-unitedhealthcare-ceo-suspect-rcna183228",
  publisher: "NBC News",
  publishedAt: "2024-12",
  notes:
    "Covers the backlash after Walz posted Citi Bike trip-data analysis of the shooter's escape route.",
});
const nytLooks = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "The Map Rating Restaurants Based on How Hot the Customers Are",
  url: "https://www.nytimes.com/2025/07/01/dining/looksmapping-hot-customers.html",
  publisher: "The New York Times",
  publishedAt: "2025-07-01",
  authors: ["Annie Armstrong"],
});
const wiredPanama = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "What JD Vance, Pam Bondi, and Sam Altman Can't Stop Listening to, According to the 'Panama Playlists'",
  url: "https://www.wired.com/story/i-listened-to-the-alleged-spotify-playlists-of-trump-officials-for-five-hours-heres-what-i-learned/",
  publisher: "WIRED",
  publishedAt: "2025-07",
  notes:
    "Reports partial corroboration: a New York Times reporter's listed data matched, and five named listeners confirmed accuracy to The Verge.",
});
const wiredParking = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "For One Glorious Morning, a Website Saved San Francisco From Parking Tickets",
  url: "https://www.wired.com/story/san-francisco-find-my-parking-cops/",
  publisher: "WIRED",
  publishedAt: "2025-09",
  authors: ["Reece Rogers"],
});
const sfStandardParking = source({
  binding: "reporting",
  mediaType: "article",
  title: "Viral parking ticket app lasts just 4 hours as city kills project",
  url: "https://sfstandard.com/2025/09/23/viral-parking-ticket-app-lasts-just-4-hours-as-city-kills-project/",
  publisher: "The San Francisco Standard",
  publishedAt: "2025-09-23",
});
const missionLocal = source({
  binding: "reporting",
  mediaType: "article",
  title: "S.F. pulls plug on 23-year-old's app tracking parking tickets",
  url: "https://missionlocal.org/2025/09/want-to-avoid-s-f-parking-cops-a-23-year-olds-app-can-help/",
  publisher: "Mission Local",
  publishedAt: "2025-09-23",
});
const nbcBay = source({
  binding: "reporting",
  mediaType: "article",
  title: "App that tracked San Francisco parking cops shuts down",
  url: "https://www.nbcbayarea.com/news/local/san-francisco-parking-cop-app/3953703/",
  publisher: "NBC Bay Area",
  publishedAt: "2025-09-24",
});
const nytJester = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Tech Jester Who Pranks San Francisco",
  url: "https://www.nytimes.com/2025/10/04/us/riley-walz-san-francisco-parking-tickets-app.html",
  publisher: "The New York Times",
  publishedAt: "2025-10-04",
  authors: ["Heather Knight"],
});
const sfist = source({
  binding: "reporting",
  mediaType: "article",
  title: "50 Waymos Sent to Dead-End SF Street In Prankster's 'DDOS Attack'",
  url: "https://sfist.com/2025/10/14/50-waymos-sent-to-dead-end-sf-street-in-pranksters-ddos-attack/",
  publisher: "SFist",
  publishedAt: "2025-10-14",
});
const wiredJmail = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Pranksters Re-Created a Working Version of Jeffrey Epstein's Gmail Inbox",
  url: "https://www.wired.com/story/pranksters-recreated-a-working-version-of-jeffrey-epstein-gmail-inbox/",
  publisher: "WIRED",
  publishedAt: "2025-11-21",
});
const vergeJmail = source({
  binding: "reporting",
  mediaType: "article",
  title: "'Jmail' is like Gmail, but with Jeffrey Epstein's emails",
  url: "https://www.theverge.com/news/826901/jeffrey-epstein-files-emails-gmail-jmail",
  publisher: "The Verge",
  publishedAt: "2025-11-22",
});
const rollingStone = source({
  binding: "reporting",
  mediaType: "article",
  title: "Want to Scroll Through Jeffrey Epstein's Gmail Account? Now You Can",
  url: "https://www.rollingstone.com/culture/culture-features/jeffrey-epstein-email-gmal-jmail-art-1235471598/",
  publisher: "Rolling Stone",
  publishedAt: "2025-11-24",
  authors: ["Jonathan Bernstein"],
});
const sfStandardJmail = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Welcome to Jmail: The easiest way to read all the Jeffrey Epstein emails",
  url: "https://sfstandard.com/2025/11/21/epstein-emails-san-francisco-jmail/",
  publisher: "The San Francisco Standard",
  publishedAt: "2025-11-21",
});
const cjr = source({
  binding: "reporting",
  mediaType: "article",
  title: "You've Got Jmail",
  url: "https://www.cjr.org/laurels-and-darts/youve-got-jmail-tool-clone-epstein-files-parse-mississippi-today-free-press-florida-medical-waiting-list-home-health-care.php",
  publisher: "Columbia Journalism Review",
  publishedAt: "2026",
  notes:
    "Reports Jmail's scale (25M+ unique visitors, 450M+ page views) and its volunteer, donation-funded operation.",
});
const wiredOpenai = source({
  binding: "reporting",
  mediaType: "article",
  title: "Riley Walz, the Jester of Silicon Valley, Is Joining OpenAI",
  url: "https://www.wired.com/story/openai-hires-riley-walz/",
  publisher: "WIRED",
  publishedAt: "2026-02-25",
  authors: ["Maxwell Zeff", "Maddy Varner"],
});
const sfStandardAlley = source({
  binding: "reporting",
  mediaType: "article",
  title: "OpenAI's tech prankster bought SF's infamous 'Dirt Alley.' What could go wrong?",
  url: "https://sfstandard.com/2026/03/13/dirt-alley-new-owners/",
  publisher: "The San Francisco Standard",
  publishedAt: "2026-03-13",
});
const nprPayphone = source({
  binding: "reporting",
  mediaType: "article",
  title: "A Game Challenges Californians To Find A Working Payphone",
  url: "https://www.klcc.org/morning-edition/2026-03-14/a-game-challenges-californians-to-find-a-working-payphone",
  publisher: "NPR / KLCC",
  publishedAt: "2026-03-14",
  authors: ["Vincent Acovino"],
});
const sfStandardNotion = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Notion Way comes to Dirt Alley",
  url: "https://sfstandard.com/2026/04/09/the-notion-way-comes-to-dirt-alley/",
  publisher: "The San Francisco Standard",
  publishedAt: "2026-04-09",
});
const guardianSleuths = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Why data sleuths are archiving the Jeffrey Epstein files: 'We want to provide some clarity'",
  url: "https://www.theguardian.com/us-news/2026/may/19/jeffrey-epstein-files-data-sleuths-archives",
  publisher: "The Guardian",
  publishedAt: "2026-05-19",
  notes:
    "Covers Jmail's role publishing the redacted Yahoo inbox dataset obtained by Distributed Denial of Secrets.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Riley Walz",
  url: "https://en.wikipedia.org/wiki/Riley_Walz",
  publisher: "Wikipedia",
});
const wikipediaJmail = source({
  binding: "reference",
  mediaType: "article",
  title: "Jmail",
  url: "https://en.wikipedia.org/wiki/Jmail",
  publisher: "Wikipedia",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Riley Walz (Q136448953)",
  url: "https://www.wikidata.org/wiki/Q136448953",
  publisher: "Wikidata",
});
const archiveNyt = source({
  binding: "archive",
  mediaType: "webpage",
  title: "The Tech Jester Who Pranks San Francisco (archived capture)",
  url: "https://archive.is/kOqc7",
  publisher: "Archive Today",
  notes:
    "Capture of the NYT profile; confirms quoted material behind the paywall.",
});

const S = {
  walzr: walzr.id,
  walzrBop: walzrBop.id,
  walzrImg: walzrImg.id,
  walzrLooks: walzrLooks.id,
  walzrWeather: walzrWeather.id,
  jmail: jmail.id,
  panama: panama.id,
  paintastreet: paintastreet.id,
  rtwlz: rtwlz.id,
  blogCandidate: blogCandidate.id,
  looksPaper: looksPaper.id,
  appsumo: appsumo.id,
  wiredProfile: wiredProfile.id,
  newyorker: newyorker.id,
  sfalex: sfalex.id,
  tbpnSep: tbpnSep.id,
  tbpnApr: tbpnApr.id,
  oversight: oversight.id,
  cnn: cnn.id,
  nytMehrans: nytMehrans.id,
  guardianMehrans: guardianMehrans.id,
  kqed: kqed.id,
  wapoBop: wapoBop.id,
  nprBop: nprBop.id,
  wapoImg: wapoImg.id,
  nbcSleuths: nbcSleuths.id,
  nytLooks: nytLooks.id,
  wiredPanama: wiredPanama.id,
  wiredParking: wiredParking.id,
  sfStandardParking: sfStandardParking.id,
  missionLocal: missionLocal.id,
  nbcBay: nbcBay.id,
  nytJester: nytJester.id,
  sfist: sfist.id,
  wiredJmail: wiredJmail.id,
  vergeJmail: vergeJmail.id,
  rollingStone: rollingStone.id,
  sfStandardJmail: sfStandardJmail.id,
  cjr: cjr.id,
  wiredOpenai: wiredOpenai.id,
  sfStandardAlley: sfStandardAlley.id,
  nprPayphone: nprPayphone.id,
  sfStandardNotion: sfStandardNotion.id,
  guardianSleuths: guardianSleuths.id,
  wikipedia: wikipedia.id,
  wikipediaJmail: wikipediaJmail.id,
  wikidata: wikidata.id,
  archiveNyt: archiveNyt.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-riley-walz",
  generatedAt: "2026-09-25T21:59:27Z",
  subject: {
    kind: "person",
    handle: "riley-walz",
    displayName: "Riley Walz",
    alsoKnownAs: ["rtwlz"],
    summary:
      "American software engineer and internet artist whose viral public-data projects — Bop Spotter, IMG_0001, LooksMapping, Find My Parking Cops, Panama Playlists, and Jmail, the Gmail-style interface to the released Epstein emails — turn neglected data exhaust into familiar, parodic interfaces.",
    identity: {
      wikidataId: "Q136448953",
      officialSite: "https://www.walzr.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Riley_Walz",
      profiles: ["https://x.com/rtwlz"],
    },
  },
  scope: {
    asOf: "2026-09-25T21:59:27Z",
    coverage: ["work", "projects", "media", "beliefs", "biography"],
  },
  sources: [
    walzr,
    walzrBop,
    walzrImg,
    walzrLooks,
    walzrWeather,
    jmail,
    panama,
    paintastreet,
    rtwlz,
    blogCandidate,
    looksPaper,
    appsumo,
    wiredProfile,
    newyorker,
    sfalex,
    tbpnSep,
    tbpnApr,
    oversight,
    cnn,
    nytMehrans,
    guardianMehrans,
    kqed,
    wapoBop,
    nprBop,
    wapoImg,
    nbcSleuths,
    nytLooks,
    wiredPanama,
    wiredParking,
    sfStandardParking,
    missionLocal,
    nbcBay,
    nytJester,
    sfist,
    wiredJmail,
    vergeJmail,
    rollingStone,
    sfStandardJmail,
    cjr,
    wiredOpenai,
    sfStandardAlley,
    nprPayphone,
    sfStandardNotion,
    guardianSleuths,
    wikipedia,
    wikipediaJmail,
    wikidata,
    archiveNyt,
  ],
  claims: [
    {
      id: "claim-born-2002",
      kind: "fact",
      text: "Riley Walz was born in 2002 and grew up in Ballston Spa, New York, where he attended Ballston Spa High School; his mother is a second-grade teacher and his father works for a government contractor on a naval base.",
      sourceIds: [S.wikipedia, S.nytJester, S.wikidata],
    },
    {
      id: "claim-andrew-walz",
      kind: "fact",
      text: "In early 2020, as a 17-year-old high school student, he created a fictional Republican congressional candidate named Andrew Walz, submitted him to Ballotpedia, and got the account a Twitter verification checkmark on February 9, 2020; Twitter suspended the account after CNN's reporting.",
      sourceIds: [S.cnn, S.blogCandidate, S.wikipedia],
    },
    {
      id: "claim-fiverr",
      kind: "fact",
      text: "At age twelve he began selling voice-over services on Fiverr, fulfilling more than five hundred orders over several years, then lent the earnings through the r/Borrow subreddit.",
      sourceIds: [S.newyorker],
    },
    {
      id: "claim-routeshuffle",
      kind: "fact",
      text: "At about sixteen he built Routeshuffle, a random route generator for runners and cyclists, which earned his first internet money; he has run every day since high school.",
      sourceIds: [S.sfalex, S.walzr],
    },
    {
      id: "claim-mschf",
      kind: "fact",
      text: "Around 2020 he interned at MSCHF, the internet-prank products company, after getting their attention by getting a city permit to place a plastic newspaper box holding his resume on the sidewalk in front of their office.",
      sourceIds: [S.sfalex, S.tbpnSep],
    },
    {
      id: "claim-college-dropout",
      kind: "fact",
      text: "He taught himself to code, studied business in college, and dropped out to pursue a career in tech.",
      sourceIds: [S.nytJester, S.wikipedia],
    },
    {
      id: "claim-numerous",
      kind: "fact",
      text: "In December 2022 he co-founded Numerous.ai, a two-person company putting ChatGPT inside spreadsheets, with his best friend Mehran (Jalali); their launch demo passed a million views on Twitter.",
      sourceIds: [S.appsumo, S.nytJester, S.sfalex],
    },
    {
      id: "claim-moved-sf",
      kind: "fact",
      text: "He moved from New York to San Francisco in January 2023; coverage in 2025 places him in North Beach.",
      sourceIds: [S.kqed, S.nytJester],
    },
    {
      id: "claim-mehrans",
      kind: "fact",
      text: "He co-created Mehran's Steak House: a fake Google Maps listing for a shared Upper East Side townhouse grew a waitlist of about 900 parties, and on September 23, 2023 the group staged a real one-night pop-up serving roughly 140 diners with dozens of friends as staff.",
      sourceIds: [S.nytMehrans, S.guardianMehrans],
    },
    {
      id: "claim-bop-spotter",
      kind: "fact",
      text: "On September 28, 2024 he installed Bop Spotter — a roughly $100 rig of a used Android phone, cardioid microphone, and solar panel on a Mission District pole — which runs Shazam continuously over public Wi-Fi and posts every recognized song to a public feed.",
      sourceIds: [S.nprBop, S.wapoBop, S.kqed, S.walzrBop],
    },
    {
      id: "claim-img-0001",
      kind: "fact",
      text: "In November 2024 he launched IMG_0001, which surfaces the roughly five million videos uploaded to YouTube through early iPhones' 'Send to YouTube' feature under default IMG_XXXX filenames, filtered to clips under 150 views, five to 150 seconds long, and posted before 2015, played back at random.",
      sourceIds: [S.wiredProfile, S.wapoImg, S.newyorker, S.walzrImg],
    },
    {
      id: "claim-img-dordrecht",
      kind: "fact",
      text: "In 2025, IMG_0001 was exhibited at the Kunstkerk in Dordrecht, the Netherlands, in collaboration with the Dordrechts Museum.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-looksmapping",
      kind: "fact",
      text: "LooksMapping scored about 2.8 million Google Maps reviews across 9,834 restaurants in New York, Los Angeles, and San Francisco by running a CLIP vision model on reviewer profile photos, mapping which restaurants' clientele rate 'hot' on a 1-to-10 scale.",
      sourceIds: [S.looksPaper, S.nytLooks, S.walzrLooks],
    },
    {
      id: "claim-weather-watching",
      kind: "fact",
      text: "Weather Watching pointed a person-detection model (YOLO) plus Google's Gemini at a Manhattan street camera, tallying what passersby wear — sleeves, pants, umbrellas — as a crowd-derived weather report.",
      sourceIds: [S.walzrWeather],
    },
    {
      id: "claim-panama",
      kind: "fact",
      text: "Panama Playlists went live July 30, 2025, publishing what it called the real Spotify accounts of public figures — JD Vance, Pam Bondi, Sam Altman, journalists — scraped since summer 2024; a New York Times reporter said his listed data matched his real history and five named listeners confirmed accuracy to The Verge.",
      sourceIds: [S.wiredPanama, S.panama],
    },
    {
      id: "claim-parking-cops",
      kind: "fact",
      text: "On September 23, 2025 he launched Find My Parking Cops via his X account, which exploited predictable sequential citation IDs on the SFMTA payment portal to map all 325 parking control officers near real time, with a revenue leaderboard; the agency obscured the data within about four hours and the site died the same day, after his launch post passed a million views.",
      sourceIds: [
        S.wiredParking,
        S.sfStandardParking,
        S.missionLocal,
        S.nbcBay,
        S.rtwlz,
      ],
    },
    {
      id: "claim-waymo-ddos",
      kind: "fact",
      text: "In July 2025 he organized about fifty people to order Waymo robotaxis simultaneously at dusk to San Francisco's longest dead-end street — billed as the 'world's first WAYMO DDOS' — revealed publicly in October; the cars left after about ten minutes with $5 no-show fees, and Waymo disabled rides within a two-block radius until morning.",
      sourceIds: [S.sfist],
    },
    {
      id: "claim-jmail-launch",
      kind: "fact",
      text: "On November 21, 2025 he and Luke Igel launched Jmail, a faithful Gmail parody rendering the roughly 20,000 pages of Epstein estate documents the House Oversight Committee had released on November 12; built in about five hours using Cursor, with AI optical character recognition, and each email linked back to the government's source documents.",
      sourceIds: [
        S.wiredJmail,
        S.vergeJmail,
        S.rollingStone,
        S.oversight,
      ],
    },
    {
      id: "claim-jmail-traffic",
      kind: "fact",
      text: "Jmail recorded at least 18.4 million visits by late November 2025; the Columbia Journalism Review later reported more than 25 million unique visitors and 450 million page views, funded by donations after Igel's initial roughly $10,000 outlay.",
      sourceIds: [S.wikipediaJmail, S.cjr],
    },
    {
      id: "claim-jmail-suite",
      kind: "fact",
      text: "Jmail grew into a parody suite — JPhotos, JDrive, JFlights, Jamazon, Jacebook, Jmessage, Jotify, and 'Jemini' search — plus a second inbox of Epstein's Yahoo emails obtained via Distributed Denial of Secrets and redacted with Drop Site News, maintained by more than ten volunteers.",
      sourceIds: [S.wikipediaJmail, S.cjr, S.guardianSleuths],
    },
    {
      id: "claim-citibike",
      kind: "fact",
      text: "After the December 2024 killing of the UnitedHealthcare CEO, he posted Citi Bike trip-data analysis of where he believed the shooter fled by bike and said he shared it with police; some users called him a 'snitch' and 'bootlicker' and threatened his safety.",
      sourceIds: [S.nbcSleuths, S.wiredOpenai],
    },
    {
      id: "claim-openai",
      kind: "fact",
      text: "In February 2026 he joined OpenAI's OAI Labs, a team led by research leader Joanne Jang tasked with inventing and prototyping new interfaces for how people collaborate with AI; an OpenAI spokesperson confirmed the hire.",
      sourceIds: [S.wiredOpenai, S.wikipedia],
    },
    {
      id: "claim-dirt-alley",
      kind: "fact",
      text: "In early 2026 he, Patrick Hultquist, and Theo Bleier bought a foreclosed, unnamed Sunset District alley — known as 'Dirt Alley' — for $26,000, paved it, let the internet design a 1,280-tile mural for its surface, and auctioned the naming rights; Notion won at $140,000 in April 2026 and it became The Notion Way.",
      sourceIds: [
        S.sfStandardAlley,
        S.sfStandardNotion,
        S.paintastreet,
        S.tbpnApr,
      ],
    },
    {
      id: "claim-payphone-go",
      kind: "fact",
      text: "In March 2026 he launched Payphone Go, a scavenger hunt built on the list of roughly 2,200 still-licensed California payphones he obtained through a public records request to the state Public Utilities Commission; players claimed phones by calling a toll-free line from them, and the contest ran through March 15, 2026.",
      sourceIds: [S.nprPayphone, S.walzr],
    },
    {
      id: "claim-sign-pranks",
      kind: "fact",
      text: "His non-technical pranks include posting 'Coming 2026, Chick-fil-A' signs overnight on a vacant burned-out building and 'stolen items must remain under $950' placards outside Louis Vuitton, mocking a since-overturned California theft threshold.",
      sourceIds: [S.nytJester],
    },
    {
      id: "claim-pursuit",
      kind: "fact",
      text: "With friends he produces an annual San Francisco scavenger hunt called Pursuit, brainstormed on a wall of Post-it notes in his living room.",
      sourceIds: [S.nytJester],
    },
    {
      id: "claim-just-engineer",
      kind: "stated_belief",
      text: "He resists the 'artist' label: 'Just engineer is fine... I don't really like labels like that. I feel like I'm just a guy who knows something about technology who just wants to see something cool.'",
      sourceIds: [S.wiredProfile],
    },
    {
      id: "claim-for-myself",
      kind: "stated_belief",
      text: "He says he builds each project for himself first — 'Even if no one looked at this website, it would still be worth it for me to make for myself' — with virality a side effect rather than the goal.",
      sourceIds: [S.wiredProfile],
    },
    {
      id: "claim-pure-videos",
      kind: "stated_belief",
      text: "He describes the early-iPhone uploads on IMG_0001 as 'unedited, pure moments from random lives' — an authentic, pre-viral genre of video he believes is effectively extinct now.",
      sourceIds: [S.wiredProfile, S.wapoImg],
    },
    {
      id: "claim-not-political",
      kind: "stated_belief",
      text: "Despite naming Bop Spotter after ShotSpotter gunshot-detection systems, he says he is 'not trying to make a political point'; his own site calls it 'culture surveillance... about catching vibes.'",
      sourceIds: [S.nprBop, S.walzrBop],
    },
    {
      id: "claim-mirror-vanity",
      kind: "stated_belief",
      text: "He frames LooksMapping as deliberate satire — 'a mirror held up to our collective vanity' that puts reductive numbers on the superficial judgments people already make — while conceding on the site that the model 'is certainly biased. It's certainly flawed.'",
      sourceIds: [S.walzrLooks, S.looksPaper, S.nytLooks],
    },
    {
      id: "claim-not-anti-cop",
      kind: "stated_belief",
      text: "He says he is neither 'pro or anti parking cop' — he doesn't own a car — and built Find My Parking Cops because he found the citation data interesting, planning to release it as a spreadsheet for others to analyze.",
      sourceIds: [S.sfStandardParking, S.missionLocal],
    },
    {
      id: "claim-love-letter",
      kind: "stated_belief",
      text: "He calls Payphone Go 'a love letter to a disappearing piece of infrastructure.'",
      sourceIds: [S.nprPayphone],
    },
    {
      id: "claim-test-verification",
      kind: "stated_belief",
      text: "He says the Andrew Walz stunt was a test of whether Ballotpedia and Twitter would verify a completely nonexistent candidate, and that he was surprised neither asked for identity documents or checked FEC records.",
      sourceIds: [S.blogCandidate, S.cnn],
    },
    {
      id: "claim-jmail-framing",
      kind: "stated_belief",
      text: "He announced Jmail on his X account with 'we cloned Gmail, except you're logged in as Epstein and can see his emails'; Igel describes the goal as making the files 'hyperlegible' to anyone who has used a phone.",
      sourceIds: [S.wiredJmail, S.cjr, S.rtwlz],
    },
    {
      id: "claim-pattern-interface",
      kind: "pattern",
      text: "The recurring method: find neglected or unwieldy public data, wrap it in a pixel-faithful parody of a familiar product (Gmail, Find My Friends, a Shazam feed), and ship within hours — the interface itself is the joke and the journalism.",
      sourceIds: [S.wiredJmail, S.wiredParking, S.walzr, S.nprBop],
    },
    {
      id: "claim-pattern-institutions",
      kind: "pattern",
      text: "Institutions repeatedly react to him within hours: Twitter suspended the fake candidate, the SFMTA rewrote its citation portal the day Find My Parking Cops launched, and Waymo geofenced the dead-end street overnight.",
      sourceIds: [S.cnn, S.wiredParking, S.sfist],
    },
    {
      id: "claim-pattern-fast-cheap",
      kind: "pattern",
      text: "The projects are cheap and fast: Bop Spotter cost about $100 and two weekends, IMG_0001 took four or five hours, and Jmail was built in a single five-hour session — a practice Igel summarized as 'high effort, shockingly good.'",
      sourceIds: [S.nprBop, S.wiredProfile, S.rollingStone],
    },
    {
      id: "claim-pattern-press",
      kind: "pattern",
      text: "The press converges on prankster framing: The New York Times dubbed him 'The Tech Jester Who Pranks San Francisco,' The New Yorker placed him in 'a lineage of prankster art that used the Internet both as a medium and as a venue,' and Wired profiled his 'nostalgic sites.'",
      sourceIds: [S.nytJester, S.newyorker, S.wiredProfile],
    },
    {
      id: "claim-spec-bop-status",
      kind: "speculation",
      text: "Whether the Bop Spotter hardware still operates is unclear — the project page persists with a running count, but independent coverage dates to its October 2024 launch window.",
      sourceIds: [S.walzrBop, S.kqed],
    },
    {
      id: "claim-spec-panama-accuracy",
      kind: "speculation",
      text: "Panama Playlists' account attributions are probabilistic inference ('near-certainty') from public signals; some named listeners confirmed their data while most accounts remain unverified.",
      sourceIds: [S.wiredPanama, S.panama],
    },
    {
      id: "claim-spec-oai-scope",
      kind: "speculation",
      text: "What he is building inside OpenAI's OAI Labs is undisclosed; how a portfolio of civic pranks translates to shipping AI interfaces is open.",
      sourceIds: [S.wiredOpenai],
    },
    {
      id: "claim-spec-birthdate",
      kind: "speculation",
      text: "Only his birth year (2002) is published; profiles variously describe him as 22 in October 2024 and 23 in September 2025, consistent with a mid-year birthday but not confirming it.",
      sourceIds: [S.wikipedia, S.kqed, S.missionLocal],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "2002",
      title: "Born in Ballston Spa, New York",
      summary:
        "Grew up in the village north of Albany; attended Ballston Spa High School.",
      location: "Ballston Spa, New York",
      sourceIds: [S.wikipedia, S.nytJester],
    },
    {
      id: "event-fiverr",
      kind: "other",
      date: "2014",
      title: "Starts selling voice-overs on Fiverr at twelve",
      summary:
        "Fulfilled more than five hundred orders over several years, then lent earnings through the r/Borrow subreddit.",
      sourceIds: [S.newyorker],
    },
    {
      id: "event-routeshuffle",
      kind: "project",
      date: "2018",
      title: "Builds Routeshuffle",
      summary:
        "Random route generator for runners and cyclists — his first internet money, built at about sixteen.",
      sourceIds: [S.sfalex, S.walzr],
    },
    {
      id: "event-andrew-walz",
      kind: "project",
      date: "2020-02",
      title: "Fake candidate 'Andrew Walz' verified on Twitter",
      summary:
        "Created a fictional Rhode Island congressional candidate, got him listed on Ballotpedia and verified by Twitter on February 9; CNN covered it February 28 and the account was suspended.",
      sourceIds: [S.cnn, S.blogCandidate],
    },
    {
      id: "event-mschf",
      kind: "apprenticeship",
      date: "2020",
      title: "Interns at MSCHF",
      summary:
        "Won the internship by placing a resume inside a permitted plastic newspaper box on the sidewalk outside their office.",
      organization: "MSCHF",
      organizationHandle: "mschf",
      sourceIds: [S.sfalex, S.tbpnSep],
    },
    {
      id: "event-mehrans-listing",
      kind: "project",
      date: "2022",
      title: "Mehran's Steak House listed on Google Maps",
      summary:
        "Roommates labeled their shared Upper East Side townhouse as a steakhouse; a website and months-long 'fully booked' waitlist followed.",
      location: "New York, New York",
      sourceIds: [S.nytMehrans, S.guardianMehrans],
    },
    {
      id: "event-numerous",
      kind: "founded",
      date: "2022-12",
      title: "Co-founds Numerous.ai",
      summary:
        "Two-person startup putting ChatGPT inside spreadsheets; launch demo passed a million views.",
      organization: "Numerous.ai",
      organizationHandle: "numerous-ai",
      sourceIds: [S.appsumo, S.nytJester],
    },
    {
      id: "event-move-sf",
      kind: "role",
      date: "2023-01",
      title: "Moves to San Francisco",
      summary:
        "Relocated from New York with his best friend to work on the AI startup full time.",
      location: "San Francisco, California",
      sourceIds: [S.kqed, S.sfalex],
    },
    {
      id: "event-mehrans-popup",
      kind: "project",
      date: "2023-09-23",
      title: "Mehran's Steak House opens for one night",
      summary:
        "The fake restaurant became a real pop-up in an East Village event space, serving roughly 140 diners with dozens of friends as staff.",
      location: "New York, New York",
      sourceIds: [S.nytMehrans, S.guardianMehrans],
    },
    {
      id: "event-bop-spotter",
      kind: "project",
      date: "2024-09-28",
      title: "Installs Bop Spotter in the Mission District",
      summary:
        "A solar-powered phone on a pole Shazams street music 24/7 to a public feed — 'ShotSpotter, but for music.'",
      location: "San Francisco, California",
      sourceIds: [S.nprBop, S.wapoBop, S.kqed],
    },
    {
      id: "event-img-0001",
      kind: "project",
      date: "2024-11",
      title: "Launches IMG_0001",
      summary:
        "Surfaces roughly five million early-iPhone 'Send to YouTube' uploads at random; more than 600,000 visitors played over six million videos in the first month.",
      sourceIds: [S.wiredProfile, S.wapoImg, S.newyorker],
    },
    {
      id: "event-citibike",
      kind: "media",
      date: "2024-12",
      title: "Citi Bike sleuthing backlash",
      summary:
        "Posted trip-data analysis of the UnitedHealthcare CEO shooter's escape route and shared it with police; drew 'snitch' accusations.",
      sourceIds: [S.nbcSleuths],
    },
    {
      id: "event-looksmapping",
      kind: "project",
      date: "2025-07",
      title: "Launches LooksMapping",
      summary:
        "AI-scored 'hotness' map of restaurant clientele across New York, Los Angeles, and San Francisco, built from 2.8 million Google Maps reviews.",
      sourceIds: [S.nytLooks, S.looksPaper],
    },
    {
      id: "event-weather-watching",
      kind: "project",
      date: "2025-07",
      title: "Launches Weather Watching",
      summary:
        "A Manhattan street camera plus vision models tally what pedestrians wear as a crowdsourced weather report.",
      location: "New York, New York",
      sourceIds: [S.walzrWeather],
    },
    {
      id: "event-waymo",
      kind: "project",
      date: "2025-07",
      title: "Stages the 'Waymo DDoS'",
      summary:
        "About fifty people simultaneously ordered robotaxis to the city's longest dead-end street at dusk; revealed publicly in October 2025.",
      location: "San Francisco, California",
      sourceIds: [S.sfist],
    },
    {
      id: "event-panama",
      kind: "project",
      date: "2025-07-30",
      title: "Panama Playlists goes live",
      summary:
        "Publishes the inferred Spotify accounts and listening habits of politicians, CEOs, and journalists.",
      sourceIds: [S.wiredPanama, S.panama],
    },
    {
      id: "event-parking-cops",
      kind: "project",
      date: "2025-09-23",
      title: "Find My Parking Cops launches — and dies in four hours",
      summary:
        "Mapped all 325 SFMTA parking officers near real time from sequential citation IDs; the agency cut the data feed the same afternoon.",
      location: "San Francisco, California",
      sourceIds: [
        S.wiredParking,
        S.sfStandardParking,
        S.missionLocal,
        S.nbcBay,
      ],
    },
    {
      id: "event-epstein-release",
      kind: "other",
      date: "2025-11-12",
      title: "House Oversight releases 20,000 pages of Epstein estate documents",
      summary:
        "The document tranche — emails, texts, financial records — that Jmail would render nine days later.",
      organization: "U.S. House Committee on Oversight and Government Reform",
      organizationHandle: "us-house-committee-on-oversight-and-government-reform",
      sourceIds: [S.oversight],
    },
    {
      id: "event-jmail",
      kind: "project",
      date: "2025-11-21",
      title: "Launches Jmail with Luke Igel",
      summary:
        "A Gmail-faithful interface to the released Epstein emails, built in about five hours; passed 18.4 million visits within the month.",
      sourceIds: [S.wiredJmail, S.vergeJmail, S.wikipediaJmail],
    },
    {
      id: "event-jmail-suite",
      kind: "milestone",
      date: "2025-12",
      title: "Jmail expands into a suite",
      summary:
        "After the DOJ's Epstein Files Transparency Act release, a volunteer crew added JPhotos, JDrive, JFlights, Jamazon, Jacebook, Jmessage, Jotify, and the Jemini search parody, plus the redacted Yahoo inbox.",
      sourceIds: [S.wikipediaJmail, S.cjr, S.guardianSleuths],
    },
    {
      id: "event-openai",
      kind: "role",
      date: "2026-02",
      title: "Joins OpenAI's OAI Labs",
      summary:
        "Hired to research and prototype new interfaces for how people collaborate with AI, on Joanne Jang's team.",
      organization: "OpenAI",
      organizationHandle: "openai",
      sourceIds: [S.wiredOpenai],
    },
    {
      id: "event-payphone-go",
      kind: "project",
      date: "2026-03-02",
      end: "2026-03-15",
      title: "Payphone Go scavenger hunt",
      summary:
        "Players claimed California's ~2,200 licensed payphones — located via a public-records request — by calling a toll-free line from each one.",
      location: "California",
      sourceIds: [S.nprPayphone],
    },
    {
      id: "event-notion-way",
      kind: "milestone",
      date: "2026-04-08",
      title: "'Dirt Alley' becomes The Notion Way",
      summary:
        "After buying the foreclosed Sunset alley for $26,000 with two friends, their naming-rights auction closed with Notion's $140,000 bid; proceeds fund the paving and crowdsourced mural.",
      location: "San Francisco, California",
      sourceIds: [S.sfStandardNotion, S.sfStandardAlley, S.paintastreet],
    },
    {
      id: "event-img-dordrecht",
      kind: "exhibition",
      date: "2025",
      title: "IMG_0001 exhibited at the Kunstkerk, Dordrecht",
      summary:
        "The project was shown in the Netherlands in collaboration with the Dordrechts Museum.",
      location: "Dordrecht, Netherlands",
      sourceIds: [S.wikipedia],
    },
  ],
  themes: [
    {
      id: "theme-public-data-interface",
      kind: "method",
      status: "inferred",
      title: "Public data exhaust as interface",
      summary:
        "His signature move is finding data that is technically public but practically unreadable — citation portals, PDF dumps, Spotify friend graphs, early-YouTube uploads — and reissuing it inside a pixel-faithful parody of a product everyone already knows. The interface does the editorializing.",
      sourceIds: [S.wiredJmail, S.wiredParking, S.walzr, S.newyorker],
    },
    {
      id: "theme-stunt-journalism",
      kind: "practice",
      status: "reported",
      title: "The stunt as civic transparency",
      summary:
        "Find My Parking Cops, Panama Playlists, and Jmail all do the work of accountability journalism inside a prank's packaging — a pattern press coverage reads as Robin Hood-style civic commentary rather than mere trolling.",
      sourceIds: [
        S.sfStandardJmail,
        S.wiredParking,
        S.wiredPanama,
        S.guardianSleuths,
      ],
    },
    {
      id: "theme-nostalgia",
      kind: "interest",
      status: "reported",
      title: "Nostalgia for the old internet",
      summary:
        "IMG_0001's forgotten home videos, a payphone scavenger hunt, and single-serving-site formats deliberately evoke the pre-algorithmic web — striking for a Gen Z builder who was a child during Web 2.0's peak.",
      sourceIds: [S.wiredProfile, S.wapoImg, S.nprPayphone],
    },
    {
      id: "theme-speed",
      kind: "method",
      status: "reported",
      title: "Hours-long builds, hundred-dollar budgets",
      summary:
        "Bop Spotter ran about $100 in parts; IMG_0001 took four or five hours; Jmail was one five-hour session. Speed and cheapness are part of the point — the work stays small enough to remain a joke.",
      sourceIds: [S.nprBop, S.wiredProfile, S.rollingStone],
    },
    {
      id: "theme-institutions-react",
      kind: "practice",
      status: "reported",
      title: "A one-man stress test for institutions",
      summary:
        "Twitter's verification pipeline, the SFMTA's data policy, Waymo's dispatch system, and Ballotpedia's catalog each met one person exploiting an assumption and patched it within hours — a recurring dynamic his projects seem designed to expose.",
      sourceIds: [S.cnn, S.wiredParking, S.sfist, S.blogCandidate],
    },
    {
      id: "theme-surveillance-mirror",
      kind: "philosophy",
      status: "stated",
      title: "Surveillance aesthetics, aimed sideways",
      summary:
        "His own copy frames the projects as mirrors: Bop Spotter is 'culture surveillance... about catching vibes,' and LooksMapping is 'a mirror held up to our collective vanity.' The work shows people what their public traces already reveal.",
      sourceIds: [S.walzrBop, S.walzrLooks, S.looksPaper],
    },
    {
      id: "theme-just-engineer",
      kind: "belief",
      status: "stated",
      title: "'Just engineer is fine'",
      summary:
        "He declines the artist label the press keeps applying, insisting he is a guy who knows technology and wants to see something cool — and that he would build each project even if nobody ever looked at it.",
      sourceIds: [S.wiredProfile],
    },
    {
      id: "theme-commit-to-bit",
      kind: "method",
      status: "reported",
      title: "Committing to the bit in physical space",
      summary:
        "The jokes escalate into the world: a fake listing becomes a real 140-seat dinner, a joke about naming a street becomes buying one, and a 'Waymo DDoS' marshals fifty people at dusk. Digital pranks keep acquiring bodies and deeds.",
      sourceIds: [S.nytMehrans, S.sfStandardNotion, S.sfist, S.nytJester],
    },
    {
      id: "theme-influences",
      kind: "influence",
      status: "reported",
      title: "MSCHF and the single-serving site",
      summary:
        "He credits his MSCHF internship with shaping his approach, and his work is routinely compared to the one-joke, one-page sites of the 2000s web; IMG_0001 was itself sparked by Ben Wallace's blog post about 'Send to YouTube.'",
      sourceIds: [S.sfalex, S.wiredProfile, S.walzrImg],
    },
  ],
  works: [
    {
      id: "work-routeshuffle",
      kind: "project",
      status: "released",
      title: "Routeshuffle",
      date: "2018",
      summary:
        "Random route generator for runners and cyclists; his first internet money, built at about sixteen.",
      sourceIds: [S.sfalex, S.walzr],
    },
    {
      id: "work-andrew-walz",
      kind: "project",
      status: "completed",
      title: "Andrew Walz (fake congressional candidate)",
      date: "2020",
      summary:
        "A fictional Republican candidate whose Ballotpedia listing and Twitter verification exposed how thin the candidate-verification pipeline was.",
      sourceIds: [S.cnn, S.blogCandidate],
    },
    {
      id: "work-numerous",
      kind: "product",
      status: "ongoing",
      title: "Numerous.ai",
      date: "2022-12",
      summary:
        "ChatGPT inside spreadsheets; a two-person company co-founded with Mehran Jalali that he still runs alongside his public projects.",
      sourceIds: [S.appsumo, S.nytJester],
    },
    {
      id: "work-mehrans",
      kind: "project",
      status: "completed",
      title: "Mehran's Steak House",
      date: "2023-09-23",
      location: "New York, New York",
      summary:
        "A fake Google Maps steakhouse with a 900-party waitlist, made real for exactly one night as a staffed pop-up dinner.",
      sourceIds: [S.nytMehrans, S.guardianMehrans],
    },
    {
      id: "work-bop-spotter",
      kind: "project",
      status: "ongoing",
      title: "Bop Spotter",
      date: "2024-09-28",
      location: "San Francisco, California",
      summary:
        "A hidden solar-powered phone running Shazam 24/7 on a Mission District pole, logging the street's music to a public feed — 'ShotSpotter for vibes.'",
      sourceIds: [S.nprBop, S.wapoBop, S.kqed, S.walzrBop],
    },
    {
      id: "work-img-0001",
      kind: "project",
      status: "released",
      title: "IMG_0001",
      date: "2024-11",
      summary:
        "A random player for roughly five million unseen early-iPhone YouTube uploads; later exhibited at the Kunstkerk in Dordrecht.",
      sourceIds: [S.wiredProfile, S.wapoImg, S.newyorker, S.wikipedia],
    },
    {
      id: "work-911-stream",
      kind: "project",
      status: "released",
      title: "911 Call Stream",
      summary:
        "Maps San Francisco emergency calls in rolling four-hour datasets.",
      location: "San Francisco, California",
      sourceIds: [S.walzr],
    },
    {
      id: "work-looksmapping",
      kind: "project",
      status: "released",
      title: "LooksMapping",
      date: "2025-07",
      summary:
        "A heat map ranking nearly ten thousand restaurants in three cities by an AI model's attractiveness score of their reviewers' profile photos — 'a mirror held up to our collective vanity.'",
      sourceIds: [S.nytLooks, S.looksPaper, S.walzrLooks],
    },
    {
      id: "work-looksmapping-paper",
      kind: "paper",
      status: "published",
      title: "Methodology of LooksMapping: Quantifying Superficiality via Neural Networks",
      summary:
        "Self-published methodology paper covering the review scrape, CLIP scoring, and Z-score normalization behind the map.",
      sourceIds: [S.looksPaper],
    },
    {
      id: "work-weather-watching",
      kind: "project",
      status: "ongoing",
      title: "Weather Watching",
      date: "2025",
      location: "New York, New York",
      summary:
        "An AI-tallied street camera that counts sleeves, pants, and umbrellas to turn a Manhattan crowd into a weather report.",
      sourceIds: [S.walzrWeather],
    },
    {
      id: "work-panama-playlists",
      kind: "project",
      status: "released",
      title: "Panama Playlists",
      date: "2025-07-30",
      summary:
        "Published the inferred real Spotify accounts of politicians, executives, and journalists, with playlists and listening feeds scraped since summer 2024.",
      sourceIds: [S.wiredPanama, S.panama],
    },
    {
      id: "work-find-my-parking-cops",
      kind: "project",
      status: "abandoned",
      title: "Find My Parking Cops",
      date: "2025-09-23",
      location: "San Francisco, California",
      summary:
        "Near-real-time map of all 325 SFMTA parking officers built from sequential citation IDs; killed within about four hours when the agency obscured the data.",
      sourceIds: [S.wiredParking, S.sfStandardParking, S.missionLocal],
    },
    {
      id: "work-waymo-ddos",
      kind: "other",
      status: "completed",
      title: "Waymo DDoS",
      date: "2025-07",
      location: "San Francisco, California",
      summary:
        "A coordinated stunt sending about fifty simultaneously ordered Waymo robotaxis to the city's longest dead-end street at dusk.",
      sourceIds: [S.sfist],
    },
    {
      id: "work-jmail",
      kind: "project",
      status: "ongoing",
      title: "Jmail",
      date: "2025-11-21",
      summary:
        "The Gmail-faithful interface to the released Epstein files, co-created with Luke Igel, since expanded into a suite of product parodies — JPhotos, JDrive, JFlights, Jamazon, Jacebook, Jmessage, Jotify, Jemini — run with more than ten volunteers on donations.",
      sourceIds: [
        S.jmail,
        S.wiredJmail,
        S.vergeJmail,
        S.wikipediaJmail,
        S.cjr,
      ],
    },
    {
      id: "work-payphone-go",
      kind: "project",
      status: "completed",
      title: "Payphone Go",
      date: "2026-03",
      location: "California",
      summary:
        "A scavenger hunt for California's ~2,200 licensed payphones, built on a public-records request; players claimed phones by calling in from them through March 15, 2026.",
      sourceIds: [S.nprPayphone, S.walzr],
    },
    {
      id: "work-notion-way",
      kind: "project",
      status: "completed",
      title: "The Notion Way ('Dirt Alley')",
      date: "2026-04",
      location: "San Francisco, California",
      summary:
        "A foreclosed, unnamed Sunset District alley bought for $26,000, paved, painted with a crowdsourced 1,280-tile mural, and renamed via a naming-rights auction won by Notion at $140,000.",
      sourceIds: [S.sfStandardAlley, S.sfStandardNotion, S.paintastreet],
    },
    {
      id: "work-pursuit",
      kind: "project",
      status: "ongoing",
      title: "Pursuit",
      location: "San Francisco, California",
      summary:
        "An annual city scavenger hunt he produces with friends, brainstormed on a living-room wall of Post-it notes.",
      sourceIds: [S.nytJester],
    },
    {
      id: "work-chickfila-signs",
      kind: "other",
      status: "completed",
      title: "'Coming 2026, Chick-fil-A' signs",
      date: "2025",
      location: "San Francisco, California",
      summary:
        "Fake development signs posted overnight on a long-vacant burned-out building, goosing Reddit into outrage at the idea of a Chick-fil-A in San Francisco.",
      sourceIds: [S.nytJester],
    },
    {
      id: "work-in-every-language",
      kind: "project",
      status: "released",
      title: "In Every Language",
      summary:
        "A browser for how different language editions of Wikipedia illustrate the same subjects with different photos.",
      sourceIds: [S.walzr],
    },
    {
      id: "work-postal-arbitrage",
      kind: "project",
      status: "released",
      title: "Postal Arbitrage",
      summary:
        "Demonstrates that mailing a letter via Amazon Prime packaging is cheaper than buying a stamp.",
      sourceIds: [S.walzr],
    },
  ],
  appearances: [
    {
      id: "appearance-cnn",
      title: "CNN Business: fake 2020 candidate interview",
      venue: "CNN Business",
      publishedAt: "2020-02-28",
      participants: ["Riley Walz", "Donie O'Sullivan"],
      summary:
        "A CNN crew interviewed him in his upstate New York high school classroom after Twitter verified his fictional candidate.",
      media: [
        {
          type: "article",
          url: "https://www.cnn.com/2020/02/28/tech/fake-twitter-candidate-2020/index.html",
          sourceId: S.cnn,
        },
      ],
      sourceIds: [S.cnn, S.wiredProfile],
    },
    {
      id: "appearance-npr-bop",
      title: "NPR segment on Bop Spotter",
      venue: "NPR",
      publishedAt: "2024-10-04",
      participants: ["Riley Walz"],
      summary:
        "Interviewed about the hidden Shazam phone and the Mission District's street music.",
      sourceIds: [S.nprBop],
    },
    {
      id: "appearance-wired-qa",
      title: "The Guy Behind the Most Nostalgic Sites on the Internet",
      venue: "WIRED",
      publishedAt: "2024-11-29",
      participants: ["Riley Walz", "Angela Watercutter"],
      summary:
        "A Q&A on IMG_0001, the Andrew Walz stunt, and why he resists the 'artist' label.",
      media: [
        {
          type: "article",
          url: "https://www.wired.com/story/riley-walz-the-guy-behind-the-most-nostalgic-sites-on-the-internet/",
          sourceId: S.wiredProfile,
        },
      ],
      sourceIds: [S.wiredProfile],
    },
    {
      id: "appearance-newyorker",
      title: "The Artist Exposing the Data We Leave Online",
      venue: "The New Yorker",
      publishedAt: "2024-12-18",
      participants: ["Riley Walz", "Kyle Chayka"],
      summary:
        "A profile interview covering IMG_0001, his Fiverr childhood, and the data deposits people leave online.",
      media: [
        {
          type: "article",
          url: "https://www.newyorker.com/culture/infinite-scroll/the-artist-exposing-the-data-we-leave-online",
          sourceId: S.newyorker,
        },
      ],
      sourceIds: [S.newyorker],
    },
    {
      id: "appearance-nyt-jester",
      title: "The Tech Jester Who Pranks San Francisco",
      venue: "The New York Times",
      publishedAt: "2025-10-04",
      participants: ["Riley Walz", "Heather Knight"],
      summary:
        "A profile from his North Beach apartment covering the parking-cop tracker, sign pranks, Pursuit, and Numerous.ai.",
      media: [
        {
          type: "article",
          url: "https://www.nytimes.com/2025/10/04/us/riley-walz-san-francisco-parking-tickets-app.html",
          sourceId: S.nytJester,
        },
        {
          type: "article",
          url: "https://archive.is/kOqc7",
          sourceId: S.archiveNyt,
        },
      ],
      sourceIds: [S.nytJester, S.archiveNyt],
    },
    {
      id: "appearance-tbpn-parking",
      title: "TBPN segment on Find My Parking Cops",
      venue: "TBPN",
      publishedAt: "2025-09-24",
      participants: ["Riley Walz", "John Coogan", "Jordi Hays"],
      summary:
        "Explained the sequential-citation-ID scrape and the SFMTA's same-day response on the live tech talk show.",
      media: [
        {
          type: "audio",
          url: "https://podcasts.apple.com/us/podcast/peter-thiel-gets-apocalyptic-the-myth-of-ai-millions/id1772360235?i=1000728291972",
          sourceId: S.tbpnSep,
        },
      ],
      sourceIds: [S.tbpnSep],
    },
    {
      id: "appearance-npr-payphone",
      title: "NPR segment on Payphone Go",
      venue: "NPR / Morning Edition",
      publishedAt: "2026-03-14",
      participants: ["Riley Walz", "Vincent Acovino"],
      summary:
        "Interviewed about the public-records request behind the payphone map and the game's call-in mechanics.",
      sourceIds: [S.nprPayphone],
    },
    {
      id: "appearance-tbpn-alley",
      title: "TBPN segment on the street-name auction",
      venue: "TBPN",
      publishedAt: "2026-04-07",
      participants: ["Riley Walz", "John Coogan", "Jordi Hays"],
      summary:
        "Walked through the Dirt Alley purchase, the pixel-art mural vote, and the live naming-rights bidding that Notion won.",
      media: [
        {
          type: "audio",
          url: "https://podcasts.apple.com/us/podcast/tokenmaxxing-sf-street-name-auction-corporate-retreat/id1772360235?i=1000760132117",
          sourceId: S.tbpnApr,
        },
      ],
      sourceIds: [S.tbpnApr],
    },
    {
      id: "appearance-sfalex",
      title: "Training the Idea Muscle",
      venue: "SF Alexandria",
      participants: ["Riley Walz"],
      summary:
        "A friend's profile covering Routeshuffle, the MSCHF newspaper-box internship, Numerous.ai, and his idea backlog.",
      media: [
        {
          type: "article",
          url: "https://sfalexandria.com/posts/rileys-ideas/",
          sourceId: S.sfalex,
        },
      ],
      sourceIds: [S.sfalex],
    },
  ],
  relations: [
    {
      id: "rel-openai",
      kind: "employed_by",
      target: "openai",
      targetName: "OpenAI",
      targetKind: "organization",
      note:
        "Joined OpenAI's OAI Labs in February 2026 — the team prototyping new interfaces for collaborating with AI; an OpenAI spokesperson confirmed the hire.",
      start: "2026-02",
      targetWikidataId: "Q21708200",
      sourceIds: [S.wiredOpenai, S.wikipedia],
    },
    {
      id: "rel-mschf",
      kind: "employed_by",
      target: "mschf",
      targetName: "MSCHF",
      targetKind: "organization",
      note:
        "Interned at the internet-prank products company around 2020 after winning their attention with a permitted newspaper box holding his resume outside their office.",
      start: "2020",
      targetWikidataId: "Q97936701",
      sourceIds: [S.sfalex, S.tbpnSep],
    },
    {
      id: "rel-numerous-ai",
      kind: "founded",
      target: "numerous-ai",
      targetName: "Numerous.ai",
      targetKind: "organization",
      note:
        "Co-founded the two-person ChatGPT-in-spreadsheets company in December 2022 with Mehran Jalali; he says it still runs.",
      start: "2022-12",
      sourceIds: [S.appsumo, S.nytJester, S.sfalex],
    },
    {
      id: "rel-mehran-jalali",
      kind: "cofounder",
      target: "mehran-jalali",
      targetName: "Mehran Jalali",
      note:
        "His best friend and Numerous.ai co-founder; they also co-created Mehran's Steak House, the fake-listing-turned-pop-up, and moved to San Francisco together.",
      sourceIds: [S.appsumo, S.nytJester, S.nytMehrans],
    },
    {
      id: "rel-luke-igel",
      kind: "collaborated",
      target: "luke-igel",
      targetName: "Luke Igel",
      note:
        "Co-built Jmail with him in about five hours when the Epstein estate documents dropped — launched November 21, 2025.",
      start: "2025-11-21",
      sourceIds: [S.wiredJmail, S.vergeJmail, S.rollingStone, S.wikipediaJmail],
    },
    {
      id: "rel-patrick-hultquist",
      kind: "collaborated",
      target: "patrick-hultquist",
      targetName: "Patrick Hultquist",
      note:
        "Co-bought the foreclosed 'Dirt Alley' in early 2026 and ran its mural and naming-rights auction with him.",
      start: "2026",
      sourceIds: [S.sfStandardAlley, S.sfStandardNotion, S.tbpnApr],
    },
    {
      id: "rel-theo-bleier",
      kind: "collaborated",
      target: "theo-bleier",
      targetName: "Theo Bleier",
      note:
        "Co-bought the foreclosed 'Dirt Alley' in early 2026 and ran its mural and naming-rights auction with him.",
      start: "2026",
      sourceIds: [S.sfStandardAlley, S.sfStandardNotion, S.tbpnApr],
    },
    {
      id: "rel-joanne-jang",
      kind: "collaborated",
      target: "joanne-jang",
      targetName: "Joanne Jang",
      note:
        "Research leader of OpenAI's OAI Labs — the team he joined in February 2026.",
      start: "2026-02",
      sourceIds: [S.wiredOpenai],
    },
    {
      id: "rel-distributed-denial-of-secrets",
      kind: "collaborated",
      target: "distributed-denial-of-secrets",
      targetName: "Distributed Denial of Secrets",
      targetKind: "organization",
      note:
        "Jmail's second inbox — Epstein's Yahoo emails — was obtained through DDoSecrets and redacted with Drop Site News.",
      start: "2025-11",
      targetWikidataId: "Q97069369",
      sourceIds: [S.guardianSleuths, S.wikipediaJmail],
    },
    {
      id: "rel-drop-site-news",
      kind: "collaborated",
      target: "drop-site-news",
      targetName: "Drop Site News",
      targetKind: "organization",
      note:
        "Co-redacted the Epstein Yahoo inbox dataset that became Jmail's second inbox.",
      start: "2025-11",
      targetWikidataId: "Q127429085",
      sourceIds: [S.wikipediaJmail, S.guardianSleuths],
    },
    {
      id: "rel-dordrechts-museum",
      kind: "collaborated",
      target: "dordrechts-museum",
      targetName: "Dordrechts Museum",
      targetKind: "organization",
      note:
        "IMG_0001 was exhibited at the Kunstkerk in Dordrecht in 2025 in collaboration with the museum.",
      start: "2025",
      targetWikidataId: "Q2874177",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-donie-osullivan",
      kind: "interviewed_by",
      target: "donie-osullivan",
      targetName: "Donie O'Sullivan",
      note:
        "CNN Business interview on the verified fake congressional candidate, February 2020.",
      start: "2020-02",
      targetWikidataId: "Q104707849",
      sourceIds: [S.cnn],
    },
    {
      id: "rel-angela-watercutter",
      kind: "interviewed_by",
      target: "angela-watercutter",
      targetName: "Angela Watercutter",
      note: "WIRED profile, 'The Guy Behind the Most Nostalgic Sites on the Internet,' November 2024.",
      start: "2024-11",
      sourceIds: [S.wiredProfile],
    },
    {
      id: "rel-kyle-chayka",
      kind: "interviewed_by",
      target: "kyle-chayka",
      targetName: "Kyle Chayka",
      note: "New Yorker Infinite Scroll profile, 'The Artist Exposing the Data We Leave Online,' December 2024.",
      start: "2024-12",
      targetWikidataId: "Q124616246",
      sourceIds: [S.newyorker],
    },
    {
      id: "rel-heather-knight",
      kind: "interviewed_by",
      target: "heather-knight",
      targetName: "Heather Knight",
      note: "New York Times profile, 'The Tech Jester Who Pranks San Francisco,' October 2025.",
      start: "2025-10",
      targetWikidataId: "Q120735018",
      sourceIds: [S.nytJester, S.archiveNyt],
    },
    {
      id: "rel-john-coogan",
      kind: "interviewed_by",
      target: "john-coogan",
      targetName: "John Coogan",
      note:
        "TBPN segments on Find My Parking Cops (September 2025) and the Dirt Alley auction (April 2026).",
      start: "2025-09",
      targetWikidataId: "Q110865149",
      sourceIds: [S.tbpnSep, S.tbpnApr],
    },
    {
      id: "rel-jordi-hays",
      kind: "interviewed_by",
      target: "jordi-hays",
      targetName: "Jordi Hays",
      note:
        "TBPN segments on Find My Parking Cops (September 2025) and the Dirt Alley auction (April 2026).",
      start: "2025-09",
      sourceIds: [S.tbpnSep, S.tbpnApr],
    },
    {
      id: "rel-vincent-acovino",
      kind: "interviewed_by",
      target: "vincent-acovino",
      targetName: "Vincent Acovino",
      note: "NPR Morning Edition piece on Payphone Go, March 2026.",
      start: "2026-03",
      sourceIds: [S.nprPayphone],
    },
  ],
  openQuestions: [
    "His exact birth date is unpublished; only the year (2002) appears in the record, and profiles variously give his age as 22 (October 2024) and 23 (September 2025).",
    "Whether the Bop Spotter device is still installed and running is unverified — the site persists, but no coverage after October 2024 confirms the hardware's status.",
    "Most Panama Playlists attributions remain unverified by the named figures; a handful confirmed their data, the rest are inference from public signals.",
    "What he is building at OpenAI's OAI Labs is undisclosed beyond the team's 'new interfaces for collaborating with AI' mandate.",
    "Jmail's traffic figures differ by metric and date — 18.4 million visits by late November 2025 versus 25 million unique visitors and 450 million page views reported later by CJR — and no single current figure exists.",
    "Whether any SFMTA citation data feed was restored is unclear; the live tracking stayed dead while historical records remain on DataSF.",
    "Whether map providers actually adopted 'The Notion Way' as the alley's name, as the auction promised, is unverified as of this index.",
    "His New York period (roughly 2021–2022, the townhouse era behind Mehran's Steak House) is thinly documented beyond the restaurant coverage.",
  ],
  body: `Riley Walz is an American software engineer whose viral web projects treat public data as raw material for jokes that behave like journalism. Born in 2002 in Ballston Spa, New York, and based in San Francisco since January 2023, he built his reputation on small, fast, cheap sites — Bop Spotter, IMG_0001, LooksMapping, Panama Playlists, Find My Parking Cops — and then, in November 2025, on Jmail, the Gmail clone that let the world scroll through Jeffrey Epstein's released emails as if logged into his inbox. In February 2026 he joined OpenAI's OAI Labs.

## Formation: verification exploits and voice-overs

The through-line starts early. At twelve he was selling voice-overs on Fiverr (500-plus orders, he told The New Yorker, with earnings lent out on r/Borrow). At sixteen he built Routeshuffle, a random running-route generator that earned his first internet money. At seventeen, over Christmas break in 2019–2020, he manufactured a fictional congressional candidate — Andrew Walz, Republican of Rhode Island — submitted him to Ballotpedia, and collected a Twitter verification checkmark on February 9, 2020, days before anyone asked for an ID. CNN put a camera crew in his high school classroom; Twitter suspended the account. Around the same period he won an internship at MSCHF, the internet-prank products company, by getting a city permit for a newspaper box holding his resume on the sidewalk outside their office — the clearest documented influence on his later format.

He studied business in college, dropped out, and in December 2022 co-founded Numerous.ai — ChatGPT inside spreadsheets — with his best friend Mehran Jalali. The pair moved to San Francisco in January 2023; the company, he told the Times, still runs.

## The New York pranks

Walz's New York period produced the stunt that established his physical-world register. A roommate's joke Google Maps listing — "Mehran's Steak House" — accumulated a waitlist of about 900 parties; rather than let the bit die, the group staged a real one-night restaurant on September 23, 2023, serving roughly 140 diners with dozens of friends as staff. The New York Times and the Guardian covered it as equal parts prank and genuinely competent pop-up.

## San Francisco: data exhaust as interface

In San Francisco the method crystallized: find data that is technically public but practically illegible, then reissue it inside a pixel-faithful parody of a product everyone already knows. Bop Spotter (September 2024) hid a $100 solar-powered Android phone on a Mission District pole to run Shazam 24/7 — "ShotSpotter, but for music," or as his own page puts it, "culture surveillance... about catching vibes." IMG_0001 (November 2024) surfaced five million unseen early-iPhone YouTube uploads at random, a found-footage time capsule that drew 600,000 visitors in a month and later an exhibition at the Kunstkerk in Dordrecht. LooksMapping (July 2025) ran a CLIP model over 2.8 million Google Maps review photos to rank restaurants by clientele "hotness" — self-described as "a mirror held up to our collective vanity." Panama Playlists (July 30, 2025) published the inferred Spotify accounts of JD Vance, Pam Bondi, Sam Altman, and others; partial confirmations suggested the sleuthing was mostly right.

Then the institutions started answering back. Find My Parking Cops (September 23, 2025) exploited sequential citation IDs on the SFMTA payment portal to map all 325 parking officers near real time; the agency obscured the data within about four hours. His "Waymo DDoS" — fifty people ordering robotaxis at dusk to the city's longest dead-end street, staged in July and revealed in October — got the service geofenced out of the area overnight. Offline, he posted "Coming 2026, Chick-fil-A" signs on a burned-out building and "$950" shoplifting placards outside Louis Vuitton. The New York Times profiled him in October 2025 as "The Tech Jester Who Pranks San Francisco"; the New Yorker had already placed him in "a lineage of prankster art." He resists the label: "Just engineer is fine."

## Jmail

When the House Oversight Committee released roughly 20,000 pages of Epstein estate documents on November 12, 2025, Luke Igel called Walz. In about five hours — with Cursor, and AI OCR on the scanned PDFs — they built Jmail: a faithful Gmail parody in which "you are logged in as Jeffrey Epstein," every message linked back to the government's source scan. It launched November 21 and did at least 18.4 million visits that month; CJR later counted 25 million-plus unique visitors. A volunteer crew expanded it into a suite — JPhotos, JDrive, JFlights, Jamazon, Jacebook, Jmessage, Jotify, and the Gemini-parody "Jemini" — plus a redacted Yahoo inbox routed through Distributed Denial of Secrets and Drop Site News. The same interface joke, aimed at the decade's biggest document dump, had become infrastructure for reading a public record.

## After the jester

The months since have run in both directions at once. In March 2026 came Payphone Go — a scavenger hunt for California's ~2,200 licensed payphones, built on a public-records request — and the purchase, with two friends, of a foreclosed Sunset alley for $26,000. In April they auctioned its naming rights; Notion paid $140,000 and "Dirt Alley" became The Notion Way, its pavement carrying a crowdsourced mural of 1,280 pixel tiles. Meanwhile, in February 2026, OpenAI hired him into OAI Labs, Joanne Jang's team prototyping new interfaces for collaborating with AI — the institution hiring the stress-tester.

## What the record does not settle

The packet keeps the seams visible. His exact birth date is unpublished; Bop Spotter's hardware status is unverified; Panama Playlists' attributions are inference that only some targets confirmed; Jmail's traffic figures differ by metric; and nothing about his OpenAI work is public. Coverage also skews toward his last two years — the New York period before San Francisco is thinly documented.

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
