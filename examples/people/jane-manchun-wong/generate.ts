#!/usr/bin/env bun
/** Generate examples/people/jane-manchun-wong/person-index.json with derived source ids. */

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

const site = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Jane Manchun Wong — personal site",
  url: "https://wongmjane.com/",
  publisher: "wongmjane.com",
});
const about = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — Jane Manchun Wong",
  url: "https://wongmjane.com/about",
  publisher: "wongmjane.com",
  notes:
    "The subject's own biography page; its honors and press lists are self-curated.",
});
const xProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Jane Manchun Wong (@wongmjane) on X",
  url: "https://x.com/wongmjane",
  publisher: "X",
  notes: "Her primary publication channel for unreleased-feature findings.",
});
const threadsProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Jane Manchun Wong (@wongmjane) on Threads",
  url: "https://www.threads.com/@wongmjane",
  publisher: "Threads",
  notes:
    "Bio at access time reads 'hacker, writer, engineer, builder — prev: Threads, Instagram, startups'.",
});
const blogWaymo = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Waymo Is Working on a Gemini AI Assistant. Here's the System Prompt",
  url: "https://wongmjane.com/blog/waymo-gemini",
  publisher: "wongmjane.com",
  publishedAt: "2025-12-23",
  authors: ["Jane Manchun Wong"],
});
const blogMessengerRooms = source({
  binding: "first_person",
  mediaType: "article",
  title: "Messenger Rooms Bug Bounty Write-up",
  url: "https://wongmjane.com/blog/messenger-rooms-writeup",
  publisher: "wongmjane.com",
  publishedAt: "2020-04-24",
  authors: ["Jane Manchun Wong"],
});
const blogFbLikes = source({
  binding: "first_person",
  mediaType: "article",
  title: "Facebook hides like counts in experiment, too",
  url: "https://wongmjane.com/blog/fb-hiding-likes",
  publisher: "wongmjane.com",
  publishedAt: "2019-09-02",
  authors: ["Jane Manchun Wong"],
});
const postMeta = source({
  binding: "first_person",
  mediaType: "webpage",
  title:
    "Personal News — I've joined Meta to work on Threads, an app built by @instagram!",
  url: "https://www.threads.com/@wongmjane/post/CuVaOg1PgU4",
  publisher: "Threads",
  publishedAt: "2023-07-05",
  authors: ["Jane Manchun Wong"],
  notes:
    "Her own announcement of the Meta hire, posted the day Threads launched.",
});
const postStartup = source({
  binding: "first_person",
  mediaType: "webpage",
  title:
    "Personal news: I'm joining a startup in Los Angeles as a senior software engineer!",
  url: "https://www.threads.com/@wongmjane/post/DD31wpcRfal",
  publisher: "Threads",
  publishedAt: "2024-10-24",
  authors: ["Jane Manchun Wong"],
  notes:
    "Cited by Wikipedia with this date; the post returned unavailable at access time, and Wikipedia's article text says December 2024.",
});
const usesThis = source({
  binding: "interview",
  mediaType: "article",
  title: "Jane Manchun Wong — Engineer, security researcher",
  url: "https://usesthis.com/interviews/jane.manchun.wong/",
  publisher: "Uses This",
  publishedAt: "2020-07-16",
});
const embedded = source({
  binding: "interview",
  mediaType: "article",
  title: "My Internet: Jane Manchun Wong",
  url: "https://embedded.substack.com/p/my-internet-jane-manchun-wong",
  publisher: "Embedded",
  publishedAt: "2022-12-22",
  authors: ["Nick Catucci"],
});
const scmpPodcast = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "Inside China Tech: The woman 'scooping' apps and exposing the secrets of Facebook, Twitter and more",
  url: "https://www.scmp.com/podcasts/article/2174995/podcast-woman-scooping-apps-and-exposing-secrets-facebook-twitter-and-more",
  publisher: "South China Morning Post",
  publishedAt: "2018-11-27",
});
const indieHackers = source({
  binding: "interview",
  mediaType: "article",
  title: "Q&A with the hacker that scooped Twitter's in-app tipping feature",
  url: "https://www.indiehackers.com/post/q-a-with-the-hacker-that-scooped-twitter-s-in-app-tipping-feature-83f503626a",
  publisher: "Indie Hackers",
  notes:
    "Q&A in which she describes starting app research during college finals and names bug-bounty hunter Philippe Harewood as an influence.",
});
const mingPao = source({
  binding: "interview",
  mediaType: "article",
  title:
    "「拆app達人」黃文津 揭露隱藏功能 推動更善良網絡世界",
  url: "https://ol.mingpao.com/ldy/cultureleisure/culture/20210207/1612637829479/%7b%e6%8b%86app%e9%81%94%e4%ba%ba%7d%e9%bb%83%e6%96%87%e6%b4%a5-%e6%8f%ad%e9%9c%b2%e9%9a%b1%e8%97%8f%e5%8a%9f%e8%83%bd-%e6%8e%a8%e5%8b%95%e6%9b%b4%e5%96%84%e8%89%af%e7%b6%b2%e7%b5%a1%e4%b8%96%e7%95%8c",
  publisher: "Ming Pao",
  publishedAt: "2021-02-07",
  language: "zh",
  notes:
    "Chinese-language feature interview; listed on the subject's own press page.",
});
const uspto = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "USD978895S1 — Display screen with graphical user interface",
  url: "https://patents.google.com/patent/USD978895S1",
  publisher: "USPTO via Google Patents",
  publishedAt: "2023",
  notes:
    "Twitter, Inc. design patent; her tweeted screenshot of an unreleased feature is cited as prior art.",
});
const webby = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Threads Web — Best Mobile User Interface, 2024 Webby Awards",
  url: "https://winners.webbyawards.com/2024/websites-and-mobile-sites/mobile-features-design/best-mobile-user-interface-mobile-features/294935/threads-web",
  publisher: "Webby Awards",
  publishedAt: "2024",
  notes:
    "Awarded to the Threads Web product; Wong lists it among her honors as a member of the Threads team.",
});
const forbes = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Jane Manchun Wong — Forbes 30 Under 30 profile",
  url: "https://www.forbes.com/profile/jane-manchun-wong/",
  publisher: "Forbes",
  notes:
    "Forbes's official profile for its 2022 30 Under 30: Social Media list, published December 2021.",
});
const outsideLLMs = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Outside LLMs — AI & Music Hackathon at Outside Lands",
  url: "https://outsidellms25.devpost.com/",
  publisher: "Devpost",
  publishedAt: "2025",
  notes: "Hackathon page listing her as a judge.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Jane Manchun Wong",
  url: "https://en.wikipedia.org/wiki/Jane_Manchun_Wong",
  publisher: "Wikipedia",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Jane Manchun Wong (Q63385151)",
  url: "https://www.wikidata.org/wiki/Q63385151",
  publisher: "Wikidata",
});
const bbc = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jane Manchun Wong: The woman scooping Silicon Valley",
  url: "https://www.bbc.com/news/technology-47630849",
  publisher: "BBC News",
  publishedAt: "2019-04-27",
  authors: ["Alli Shultes"],
});
const cnn = source({
  binding: "reporting",
  mediaType: "article",
  title: "This 24-year-old finds unreleased features in your favorite apps",
  url: "https://www.cnn.com/2019/03/22/tech/jane-wong-app-features/index.html",
  publisher: "CNN Business",
  publishedAt: "2019-03-22",
  authors: ["Kaya Yurieff"],
});
const cnbc = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Facebook employees turn to Hong Kong hacker for info on internal projects",
  url: "https://www.cnbc.com/2019/10/20/facebook-employees-turn-to-hong-kong-hacker-jane-manchun-wong-for-info.html",
  publisher: "CNBC",
  publishedAt: "2019-10-20",
  authors: ["Salvador Rodriguez"],
});
const scmp = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Jane Wong uncovers hidden app features tech giants want to keep secret",
  url: "https://www.scmp.com/tech/apps-social/article/2174875/jane-wong-explains-why-she-uncovers-hidden-app-features-tech-giants",
  publisher: "South China Morning Post",
  publishedAt: "2018-11-26",
  authors: ["Zen Soo"],
});
const tnw = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Meet the 23-year-old engineering detective behind the biggest leaks in tech",
  url: "https://thenextweb.com/news/meet-the-23-year-old-engineering-detective-behind-the-biggest-leaks-in-tech",
  publisher: "The Next Web",
  publishedAt: "2018",
});
const businessInsider = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "This rogue hacker digs up unreleased features on Instagram, Facebook, and Spotify",
  url: "https://www.businessinsider.com/jane-manchun-wong-profile-new-features-instagram-facebook-spotify-2020-2",
  publisher: "Business Insider",
  publishedAt: "2020-02",
  authors: ["Aaron Holmes"],
});
const mitTR = source({
  binding: "reporting",
  mediaType: "article",
  title: "Spilling Silicon Valley's secrets, one tweet at a time",
  url: "https://www.technologyreview.com/2022/04/22/1049460/silicon-valley-secrets-twitter-jane-manchun-wong/",
  publisher: "MIT Technology Review",
  publishedAt: "2022-04-22",
  authors: ["Tanya Basu"],
});
const vergeTwitterBlue = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Twitter may be working on Twitter Blue, a subscription service that would cost $2.99 per month",
  url: "https://www.theverge.com/2021/5/15/22437690/twitter-blue-subscription-service-299-undo-tweets",
  publisher: "The Verge",
  publishedAt: "2021-05-15",
});
const guardianTwitterBlue = source({
  binding: "reporting",
  mediaType: "article",
  title: "Twitter mulling paid service called Twitter Blue, finds researcher",
  url: "https://www.theguardian.com/technology/2021/may/17/twitter-mulling-paid-service-called-twitter-blue-finds-researcher",
  publisher: "The Guardian",
  publishedAt: "2021-05-17",
  authors: ["Alex Hern"],
});
const vergeEdit = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Twitter's upcoming edit feature may keep track of tweet history",
  url: "https://www.theverge.com/2022/4/16/23028111/twitter-upcoming-edit-button-tweet-history",
  publisher: "The Verge",
  publishedAt: "2022-04-16",
});
const vergeFigma = source({
  binding: "reporting",
  mediaType: "article",
  title: "Figma is working on an AI app maker",
  url: "https://www.theverge.com/news/652416/figma-ai-app-builder-sites-website-creator",
  publisher: "The Verge",
  publishedAt: "2025-04-20",
});
const techcrunchWaymo = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Waymo is testing Gemini as an in-car AI assistant in its robotaxis",
  url: "https://techcrunch.com/2025/12/24/waymo-is-testing-gemini-as-an-in-car-ai-assistant-in-its-robotaxis/",
  publisher: "TechCrunch",
  publishedAt: "2025-12-24",
});
const vergeInstaller = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Verge Installer No. 95 — Screen Share",
  url: "https://www.theverge.com/installer-newsletter/764641/shutter-declutter-pixel-10-pro-fold-samsung-galaxy-buds-3-fe-herdling-installer",
  publisher: "The Verge",
  publishedAt: "2025",
  notes:
    "Screen-share feature in which she recommends a photo-browsing tool.",
});
const techcrunchLayoffs = source({
  binding: "reporting",
  mediaType: "article",
  title: "Meta lays off employees across multiple teams",
  url: "https://techcrunch.com/2024/10/16/meta-lays-off-employees-across-multiple-teams/",
  publisher: "TechCrunch",
  publishedAt: "2024-10-16",
  authors: ["Maxwell Zeff"],
});
const vergeLayoffs = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Meta is laying off employees at WhatsApp, Instagram, and more",
  url: "https://www.theverge.com/2024/10/16/24272195/meta-layoffs-whatsapp-instagram-reality-labs",
  publisher: "The Verge",
  publishedAt: "2024-10-16",
});
const apLayoffs = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Meta lays off staff at WhatsApp and Instagram to align with 'strategic goals'",
  url: "https://apnews.com/article/meta-layoffs-whatsapp-instagram-4af727c7fb75f89bc50c84284fef2fee",
  publisher: "Associated Press",
  publishedAt: "2024-10",
});
const adweek = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Facebook Is Taking Aim at LinkedIn Again By Testing a Résumé Feature",
  url: "https://www.adweek.com/performance-marketing/facebook-testing-resume-feature/",
  publisher: "Adweek",
  publishedAt: "2017-10-16",
  authors: ["David Cohen"],
});
const sfStandardSF100 = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "SF 100 List — Jane Manchun Wong",
  url: "https://sfstandard.com/sf-100/profile/jane-manchun-wong/",
  publisher: "The San Francisco Standard",
  publishedAt: "2025-04-21",
  notes:
    "SF 100 'The Thinkers' entry: 'she finds big tech's cheat codes, and she's happy to share them.'",
});
const sfStandardWaggle = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Waggle: 'There's a new sleuth in town' (SF openings radar)",
  url: "https://sfstandard.com/2026/08/01/can-love-make-45-billion-hedge-fund-blowup/",
  publisher: "The San Francisco Standard",
  publishedAt: "2026-08-01",
  authors: ["Emily Dreyfuss", "Sam Mondros", "Natallie Rocha", "Zara Stone"],
  notes:
    "One item in the paper's gossip column reports her permit-scanning 'openings radar' for new San Francisco restaurants and shops.",
});
const wayback2019 = source({
  binding: "archive",
  mediaType: "webpage",
  title: "wongmjane.com — Wayback Machine capture, September 28, 2019",
  url: "http://web.archive.org/web/20190928180855/https://wongmjane.com/",
  publisher: "Internet Archive",
  publishedAt: "2019-09-28",
  notes:
    "Capture of her site near the peak of the daily-scoop era, before the Meta years.",
});

const S = {
  site: site.id,
  about: about.id,
  xProfile: xProfile.id,
  threadsProfile: threadsProfile.id,
  blogWaymo: blogWaymo.id,
  blogMessengerRooms: blogMessengerRooms.id,
  blogFbLikes: blogFbLikes.id,
  postMeta: postMeta.id,
  postStartup: postStartup.id,
  usesThis: usesThis.id,
  embedded: embedded.id,
  scmpPodcast: scmpPodcast.id,
  indieHackers: indieHackers.id,
  mingPao: mingPao.id,
  uspto: uspto.id,
  webby: webby.id,
  forbes: forbes.id,
  outsideLLMs: outsideLLMs.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  bbc: bbc.id,
  cnn: cnn.id,
  cnbc: cnbc.id,
  scmp: scmp.id,
  tnw: tnw.id,
  businessInsider: businessInsider.id,
  mitTR: mitTR.id,
  vergeTwitterBlue: vergeTwitterBlue.id,
  guardianTwitterBlue: guardianTwitterBlue.id,
  vergeEdit: vergeEdit.id,
  vergeFigma: vergeFigma.id,
  techcrunchWaymo: techcrunchWaymo.id,
  vergeInstaller: vergeInstaller.id,
  techcrunchLayoffs: techcrunchLayoffs.id,
  vergeLayoffs: vergeLayoffs.id,
  apLayoffs: apLayoffs.id,
  adweek: adweek.id,
  sfStandardSF100: sfStandardSF100.id,
  sfStandardWaggle: sfStandardWaggle.id,
  wayback2019: wayback2019.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-jane-manchun-wong",
  generatedAt: "2026-09-17T01:00:00Z",
  subject: {
    kind: "person",
    handle: "jane-manchun-wong",
    displayName: "Jane Manchun Wong",
    alsoKnownAs: ["@wongmjane", "Jane Wong", "黃文津"],
    summary:
      "Hong Kong–born, San Francisco–based security researcher and self-taught app researcher who reverse-engineers public app builds to reveal unreleased features — the definitive leaker of the social-app industry, later a Meta engineer on Instagram and Threads.",
    identity: {
      wikidataId: "Q63385151",
      officialSite: "https://wongmjane.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Jane_Manchun_Wong",
      profiles: [
        "https://x.com/wongmjane",
        "https://www.threads.com/@wongmjane",
        "https://instagram.com/wongmjane",
        "https://linkedin.com/in/wongmjane",
        "https://github.com/wongmjane",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T01:00:00Z",
    coverage: [
      "biography",
      "work",
      "method",
      "beliefs",
      "media",
      "career",
    ],
  },
  sources: [
    site,
    about,
    xProfile,
    threadsProfile,
    blogWaymo,
    blogMessengerRooms,
    blogFbLikes,
    postMeta,
    postStartup,
    usesThis,
    embedded,
    scmpPodcast,
    indieHackers,
    mingPao,
    uspto,
    webby,
    forbes,
    outsideLLMs,
    wikipedia,
    wikidata,
    bbc,
    cnn,
    cnbc,
    scmp,
    tnw,
    businessInsider,
    mitTR,
    vergeTwitterBlue,
    guardianTwitterBlue,
    vergeEdit,
    vergeFigma,
    techcrunchWaymo,
    vergeInstaller,
    techcrunchLayoffs,
    vergeLayoffs,
    apLayoffs,
    adweek,
    sfStandardSF100,
    sfStandardWaggle,
    wayback2019,
  ],
  claims: [
    {
      id: "claim-born-hong-kong",
      kind: "fact",
      text: "Jane Manchun Wong was born in British Hong Kong in April 1994 (Wikipedia gives April 13, 1994, citing her own birthday post) and grew up in Hong Kong; her Chinese name is 黃文津.",
      sourceIds: [S.wikipedia, S.wikidata, S.about],
    },
    {
      id: "claim-linux-age-seven",
      kind: "fact",
      text: "She recounts that at about age seven she circumvented her parents' controls on the family computer by replacing Windows with Linux — an anecdote repeated in the SCMP, CNN, and Wikipedia accounts of her self-taught beginnings.",
      sourceIds: [S.wikipedia, S.scmp, S.cnn],
    },
    {
      id: "claim-umass",
      kind: "fact",
      text: "She studied computer science at the University of Massachusetts Dartmouth and left a few months short of graduating because of medical issues — a decision she has said she regrets.",
      sourceIds: [S.wikipedia, S.mitTR, S.bbc],
    },
    {
      id: "claim-first-discovery",
      kind: "fact",
      text: "Her first documented discovery came in October 2017, when — as a UMass Dartmouth undergrad — she spotted Facebook testing a LinkedIn-style résumé ('work histories') feature and shared screenshots that surfaced via Matt Navarra; Facebook confirmed the test.",
      sourceIds: [S.adweek, S.wikipedia],
    },
    {
      id: "claim-first-finding-tweet",
      kind: "fact",
      text: "MIT Technology Review dates her first 'finding' tweet to shortly after midnight on May 4, 2018: 'Twitter is working on End-to-End Encrypted Secret DM!'",
      sourceIds: [S.mitTR],
    },
    {
      id: "claim-2018-scoops",
      kind: "fact",
      text: "In 2018 she published screenshots of Facebook Dating's homepage before its release and revealed a Facebook map feature showing nearby friends' locations.",
      sourceIds: [S.wikipedia, S.scmp],
    },
    {
      id: "claim-instagram-likes",
      kind: "fact",
      text: "On April 18, 2019 she revealed Instagram was testing hiding like counts; Adam Mosseri confirmed the test about twelve days later.",
      sourceIds: [S.wikipedia, S.bbc],
    },
    {
      id: "claim-method",
      kind: "fact",
      text: "Her method is to inspect the publicly shipped code of apps and websites — decompiling mobile builds and reading client-side source for dormant, feature-flagged functionality — then publishing screenshots or mock-ups of what she finds.",
      sourceIds: [S.wikipedia, S.mitTR, S.usesThis],
    },
    {
      id: "claim-scope-of-scoops",
      kind: "fact",
      text: "Her findings have spanned Twitter/X, Instagram, Facebook, LinkedIn, Snapchat, Spotify, Lyft, Uber, Medium, and later non-social targets such as Figma and Waymo.",
      sourceIds: [
        S.usesThis,
        S.wikipedia,
        S.blogWaymo,
        S.vergeFigma,
      ],
    },
    {
      id: "claim-cadence",
      kind: "fact",
      text: "At her peak she told the BBC she spent up to 18 hours a weekend combing through code, and MIT Technology Review reported stretches of nearly 18 hours a day, alongside paid freelance bug-bounty work.",
      sourceIds: [S.bbc, S.mitTR],
    },
    {
      id: "claim-bug-bounty",
      kind: "fact",
      text: "Beyond feature findings she worked as a freelance bug-bounty hunter, reporting security flaws to companies before malicious actors could exploit them.",
      sourceIds: [S.bbc, S.usesThis],
    },
    {
      id: "claim-messenger-rooms",
      kind: "fact",
      text: "She reported a private-API abuse risk in Facebook's unreleased Messenger Rooms through its bug-bounty program before launch and published a write-up of the finding in April 2020.",
      sourceIds: [S.usesThis, S.blogMessengerRooms],
    },
    {
      id: "claim-cnbc-facebook",
      kind: "fact",
      text: "CNBC reported in October 2019 that Facebook employees turned to her feed to learn what other teams inside the company were building.",
      sourceIds: [S.cnbc],
    },
    {
      id: "claim-twitter-blue",
      kind: "fact",
      text: "On May 15, 2021 she revealed Twitter's in-development subscription — name (Twitter Blue), price ($2.99/month), and features (Undo Tweets, bookmark Collections) — weeks before Twitter Blue launched in Canada and Australia on June 3, 2021.",
      sourceIds: [S.vergeTwitterBlue, S.guardianTwitterBlue],
    },
    {
      id: "claim-tip-jar",
      kind: "fact",
      text: "She revealed Twitter's in-app tipping feature before launch — the scoop that prompted an Indie Hackers Q&A about her process.",
      sourceIds: [S.indieHackers],
    },
    {
      id: "claim-forbes-30u30",
      kind: "fact",
      text: "In December 2021 she was named to Forbes's 2022 30 Under 30 list in the Social Media category.",
      sourceIds: [S.forbes, S.wikipedia, S.about],
    },
    {
      id: "claim-tatler",
      kind: "fact",
      text: "Her own honors list includes Tatler Asia's Gen.T Leaders of Tomorrow (Hong Kong, Technology, 2020) and Tatler's Asia's Most Influential (2021).",
      sourceIds: [S.about],
    },
    {
      id: "claim-whats-up-jane",
      kind: "fact",
      text: "Engineers began addressing her inside the code itself: Business Insider found an Instagram experimental feature named 'What's up Jane,' and Casey Newton told MIT Technology Review that developers leave 'Hi, Jane'-style messages knowing she is coming.",
      sourceIds: [S.businessInsider, S.mitTR],
    },
    {
      id: "claim-meta-fan-club",
      kind: "fact",
      text: "MIT Technology Review reported an internal Jane Manchun Wong fan club at Meta counting CTO Andrew Bosworth among its members, with a Meta spokesperson saying 'We value her contributions and feedback that help improve our products.'",
      sourceIds: [S.mitTR],
    },
    {
      id: "claim-edit-button",
      kind: "fact",
      text: "On April 16, 2022, after Twitter confirmed it was building an edit button, she found code showing the feature would be 'immutable' — creating a new tweet linked to prior versions rather than mutating the original — foreshadowing the shipped edit-history design.",
      sourceIds: [S.vergeEdit],
    },
    {
      id: "claim-joins-meta",
      kind: "fact",
      text: "She announced on Threads on July 5, 2023 — the day Threads launched — that she had joined Meta to work on the app; Wikipedia dates the employment from June 2023 and reports she relocated from Hong Kong to San Francisco.",
      sourceIds: [S.postMeta, S.wikipedia, S.vergeLayoffs],
    },
    {
      id: "claim-meta-welcome",
      kind: "fact",
      text: "Her hiring was publicly celebrated by Meta CTO Andrew Bosworth and Instagram head Adam Mosseri, per TechCrunch's and The Verge's later accounts.",
      sourceIds: [S.techcrunchLayoffs, S.vergeLayoffs],
    },
    {
      id: "claim-webby",
      kind: "fact",
      text: "Threads Web — a product she worked on as a member of the Threads team — won the 2024 Webby Award for Best Mobile User Interface; she lists the win among her honors.",
      sourceIds: [S.webby, S.about],
    },
    {
      id: "claim-laid-off",
      kind: "fact",
      text: "On October 16, 2024 she was laid off in a Meta reorganization that cut roles across Instagram, WhatsApp, and Reality Labs; she posted that her role 'has been impacted.'",
      sourceIds: [S.techcrunchLayoffs, S.vergeLayoffs, S.apLayoffs],
    },
    {
      id: "claim-la-startup",
      kind: "fact",
      text: "In late 2024 she announced on Threads that she was joining an unnamed startup in Los Angeles as a senior software engineer.",
      sourceIds: [S.wikipedia, S.postStartup],
    },
    {
      id: "claim-waymo-prompt",
      kind: "fact",
      text: "On December 23, 2025 she published the complete 1,200-plus-line system prompt for Waymo's unreleased Gemini-powered 'Ride Assistant,' recovered from Waymo's mobile app code — extending her method beyond social apps.",
      sourceIds: [S.blogWaymo, S.techcrunchWaymo],
    },
    {
      id: "claim-figma-scoop",
      kind: "fact",
      text: "In April 2025 she revealed Figma's in-development AI app maker — powered by Anthropic's Claude Sonnet — and a separate 'Figma Sites' website builder, both later covered by The Verge.",
      sourceIds: [S.vergeFigma],
    },
    {
      id: "claim-sf-radar",
      kind: "fact",
      text: "By mid-2026 she had built what she calls a 'radar' — a tool continuously scanning public San Francisco permits, business registrations, and health filings for early signs of new openings — and used it to scoop an Animate pop-up in Japantown, chef Stella Wang's restaurant Numb, and the Corgi Cafe's Dogpatch location.",
      sourceIds: [S.sfStandardWaggle],
    },
    {
      id: "claim-prior-art",
      kind: "fact",
      text: "A Twitter, Inc. design patent granted by the USPTO in 2023 (USD978895S1) cites her tweeted screenshot of an unreleased feature as prior art — a government record of the evidentiary status her findings acquired.",
      sourceIds: [S.uspto, S.about],
    },
    {
      id: "claim-books",
      kind: "fact",
      text: "Her site lists appearances in three books about the industry she covered: Zoë Schiffer's 'Extremely Hardcore: Inside Elon Musk's Twitter' (2024), Garrett Gee's 'The Hacker Mindset' (2024), and Ron Friedman's 'Decoding Greatness' (2023).",
      sourceIds: [S.about],
    },
    {
      id: "claim-sf-based",
      kind: "fact",
      text: "She is now based in San Francisco, after growing up in Hong Kong and a stint in Boston for college.",
      sourceIds: [S.about, S.sfStandardSF100, S.sfStandardWaggle],
    },
    {
      id: "claim-not-leaks",
      kind: "stated_belief",
      text: "She insists her findings are not leaks: 'Leaks mean that they are based on information coming from employees, that employees are the source. But I use publicly available data and code. They're not leaks.'",
      sourceIds: [S.mitTR],
    },
    {
      id: "claim-transparency-goal",
      kind: "stated_belief",
      text: "She frames her scoops as pressure toward openness: her goal, she told Forbes, is to 'encourage tech companies to be more open and transparent — to call for making the apps lighter and more secure,' freeing the public from relying on press releases to know where tech is going.",
      sourceIds: [S.forbes, S.mitTR],
    },
    {
      id: "claim-users-deserve",
      kind: "stated_belief",
      text: "She publishes pre-launch features because apps are used by people who deserve to know what is being worked on behind the scenes — 'And if they had been [transparent] before, I wouldn't have to do this.'",
      sourceIds: [S.mitTR],
    },
    {
      id: "claim-joy-puzzles",
      kind: "stated_belief",
      text: "She describes reverse-engineering as a hobby done for the joy of it — 'I just like to dig deep into the apps and see how they are structured' — comparing the work to solving puzzles.",
      sourceIds: [S.mitTR, S.indieHackers],
    },
    {
      id: "claim-engineer-since-six",
      kind: "stated_belief",
      text: "She says she has wanted to be a software engineer since age six — 'I want to create things' — and told MIT Technology Review the scoop work is not a forever job: 'When I satisfy that curiosity, I'll stop. I'll move on.'",
      sourceIds: [S.mitTR],
    },
    {
      id: "claim-im-a-person",
      kind: "stated_belief",
      text: "She has spoken openly about the personal cost of visibility — depression and waves of harassment — telling MIT Technology Review 'I wish more people realized I'm a person. I'm more than a machine,' and telling Embedded that angry users treat her as 'an emotional punching bag' for features she merely reported.",
      sourceIds: [S.mitTR, S.embedded],
    },
    {
      id: "claim-twitter-quit",
      kind: "stated_belief",
      text: "Asked in late 2022 what it would take for her to quit Twitter entirely, she said: 'I think Twitter might have to cease to exist in order for me to quit.'",
      sourceIds: [S.embedded],
    },
    {
      id: "claim-scoop-confirm-cycle",
      kind: "pattern",
      text: "Her findings repeatedly proved out on days-to-weeks timescales: Instagram's hidden like counts were confirmed by Mosseri ~12 days after her post, Twitter Blue launched weeks after her name-and-price scoop, and the edit button shipped with an immutable design matching her code reading.",
      sourceIds: [S.wikipedia, S.vergeTwitterBlue, S.vergeEdit],
    },
    {
      id: "claim-press-pipeline",
      kind: "pattern",
      text: "Her feed became infrastructure for tech journalism — reporters watch @wongmjane for scoops, outlets cite her by name, and Facebook's own employees reportedly monitored it for news of other teams' work.",
      sourceIds: [S.bbc, S.cnbc, S.mitTR],
    },
    {
      id: "claim-anticipated-by-engineers",
      kind: "pattern",
      text: "The industry adapted to her: companies stopped treating in-code features as hidden, left greeting messages for her to find, and at least once named an experiment after her — evidence her presence changed how big apps stage features.",
      sourceIds: [S.businessInsider, S.mitTR],
    },
    {
      id: "claim-meta-pause",
      kind: "pattern",
      text: "Her public feature-finding output largely paused during the Meta years — her blog's dated write-ups jump from 2020 to late 2025 — and resumed at scale only after her layoff, with Figma, Waymo, and San Francisco permit scoops following.",
      sourceIds: [S.blogWaymo, S.vergeFigma, S.postMeta, S.sfStandardWaggle],
    },
    {
      id: "claim-method-generalizes",
      kind: "pattern",
      text: "The same read-the-public-record method keeps generalizing: mobile app code for Waymo and Figma, city permit and registration filings for San Francisco's openings radar.",
      sourceIds: [S.techcrunchWaymo, S.vergeFigma, S.sfStandardWaggle],
    },
    {
      id: "claim-defensive-hire",
      kind: "speculation",
      text: "Whether Meta's hire was partly defensive — converting its most reliable leak channel into an engineer — is not resolvable from public sources; the documented record shows only that the company publicly welcomed her and already maintained an internal fan club.",
      sourceIds: [S.mitTR, S.techcrunchLayoffs],
    },
    {
      id: "claim-startup-status",
      kind: "speculation",
      text: "Her Threads bio now lists 'startups' under 'prev,' suggesting the Los Angeles startup role announced in late 2024 may already have ended; no public source confirms her current employer.",
      sourceIds: [S.threadsProfile, S.wikipedia],
    },
    {
      id: "claim-method-fragility",
      kind: "speculation",
      text: "Her method depends on companies shipping near-complete features behind flags in public builds; how much further she can take it as companies tighten staging is unknowable — though the 2025 Waymo prompt recovery shows the window is not closed.",
      sourceIds: [S.mitTR, S.blogWaymo],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1994-04-13",
      title: "Born in British Hong Kong",
      summary:
        "Grew up in Hong Kong; Chinese name 黃文津. Early press profiles give ages implying a slightly later birth year — see openQuestions.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-linux-age-seven",
      kind: "other",
      date: "2001",
      title: "Circumvents parental controls with Linux",
      summary:
        "At about seven she replaced Windows with Linux on the family computer to defeat her parents' controls — the anecdote she gives for the start of her self-taught path.",
      sourceIds: [S.wikipedia, S.scmp],
    },
    {
      id: "event-first-discovery",
      kind: "milestone",
      date: "2017-10-15",
      title: "First discovery: Facebook's résumé feature",
      summary:
        "As a UMass Dartmouth undergrad, she spotted Facebook testing a LinkedIn-style 'work histories' résumé feature; screenshots surfaced via Matt Navarra and Facebook confirmed the test.",
      sourceIds: [S.adweek, S.wikipedia],
    },
    {
      id: "event-first-finding-tweet",
      kind: "milestone",
      date: "2018-05-04",
      title: "First 'finding' tweet: Twitter's encrypted Secret DM",
      summary:
        "Shortly after midnight she posted 'Twitter is working on End-to-End Encrypted Secret DM!' — the start of the near-daily findings feed.",
      sourceIds: [S.mitTR],
    },
    {
      id: "event-2018-scoops",
      kind: "other",
      date: "2018",
      title: "Facebook Dating and nearby-friends map leaks",
      summary:
        "Published screenshots of Facebook Dating's homepage before release and revealed a map feature showing nearby friends' locations.",
      sourceIds: [S.wikipedia, S.scmp],
    },
    {
      id: "event-first-profiles",
      kind: "media",
      date: "2018-11",
      title: "First press profiles: SCMP, The Next Web, SCMP podcast",
      summary:
        "Zen Soo's SCMP profile, The Next Web's 'engineering detective' feature, and an Inside China Tech podcast episode introduced her method to a wide audience.",
      sourceIds: [S.scmp, S.tnw, S.scmpPodcast],
    },
    {
      id: "event-instagram-likes",
      kind: "milestone",
      date: "2019-04-18",
      title: "Reveals Instagram's hidden-like-counts test",
      summary:
        "Reported Instagram was testing hiding like counts; Adam Mosseri confirmed the experiment about twelve days later — the scoop that defined her beat.",
      sourceIds: [S.wikipedia, S.bbc],
    },
    {
      id: "event-profile-wave",
      kind: "media",
      date: "2019",
      title: "CNN and BBC profiles; freelance bug-bounty era",
      summary:
        "CNN ('This 24-year-old finds unreleased features') and the BBC ('The woman scooping Silicon Valley') profiled her; she told the BBC she spent up to 18 hours a weekend on code alongside paid bug-bounty work.",
      sourceIds: [S.cnn, S.bbc],
    },
    {
      id: "event-cnbc",
      kind: "media",
      date: "2019-10-20",
      title: "CNBC: Facebook employees rely on her feed",
      summary:
        "Reported that Facebook employees turned to the Hong Kong researcher's posts to learn what other internal teams were building.",
      sourceIds: [S.cnbc],
    },
    {
      id: "event-messenger-rooms",
      kind: "publication",
      date: "2020-04-24",
      title: "Messenger Rooms bug-bounty write-up",
      summary:
        "Published her account of reporting a private-API abuse risk in Facebook's unreleased Messenger Rooms through the bug-bounty program.",
      sourceIds: [S.blogMessengerRooms, S.usesThis],
    },
    {
      id: "event-tatler-gent",
      kind: "award",
      date: "2020",
      title: "Tatler Gen.T Leaders of Tomorrow",
      summary: "Named to Tatler Asia's Gen.T list (Hong Kong, Technology).",
      sourceIds: [S.about],
    },
    {
      id: "event-twitter-blue",
      kind: "milestone",
      date: "2021-05-15",
      title: "Scoops Twitter Blue",
      summary:
        "Revealed the name, $2.99 price, and feature set of Twitter's in-development subscription weeks before launch.",
      sourceIds: [S.vergeTwitterBlue, S.guardianTwitterBlue],
    },
    {
      id: "event-forbes-30u30",
      kind: "award",
      date: "2021-12",
      title: "Forbes 30 Under 30 (2022 list), Social Media",
      summary:
        "Named to the Forbes 30 Under 30: Social Media list published December 2021; Tatler's Asia's Most Influential list followed the same year.",
      sourceIds: [S.forbes, S.wikipedia, S.about],
    },
    {
      id: "event-edit-button",
      kind: "milestone",
      date: "2022-04-16",
      title: "Reveals the Twitter edit button's immutable design",
      summary:
        "Found code showing edits would create a new tweet linked to prior versions rather than mutating the original — matching the design Twitter later shipped.",
      sourceIds: [S.vergeEdit],
    },
    {
      id: "event-mit-tr-profile",
      kind: "media",
      date: "2022-04-22",
      title: "MIT Technology Review profile",
      summary:
        "Tanya Basu's profile, 'Spilling Silicon Valley's secrets, one tweet at a time,' documented her method, the harassment costs, and Meta's internal fan club.",
      sourceIds: [S.mitTR],
    },
    {
      id: "event-joins-meta",
      kind: "role",
      date: "2023-06",
      end: "2024-10",
      title: "Software engineer at Meta on Instagram and Threads",
      summary:
        "Relocated from Hong Kong to San Francisco to join Meta; announced on Threads on launch day, July 5, 2023. The hire was celebrated publicly by Bosworth and Mosseri.",
      organization: "Meta",
      location: "San Francisco",
      sourceIds: [S.postMeta, S.wikipedia, S.vergeLayoffs],
    },
    {
      id: "event-webby",
      kind: "award",
      date: "2024",
      title: "Threads Web wins Webby for Best Mobile User Interface",
      summary:
        "The Threads team's web client won a 2024 Webby; Wong lists it among her honors as a team member.",
      organization: "Meta / Threads",
      sourceIds: [S.webby, S.about],
    },
    {
      id: "event-laid-off",
      kind: "other",
      date: "2024-10-16",
      title: "Laid off in Meta reorganization",
      summary:
        "Her role was eliminated in cuts across Instagram, WhatsApp, and Reality Labs; she announced it publicly on Threads.",
      organization: "Meta",
      sourceIds: [S.techcrunchLayoffs, S.vergeLayoffs, S.apLayoffs],
    },
    {
      id: "event-la-startup",
      kind: "role",
      date: "2024-10-24",
      title: "Announces move to an unnamed Los Angeles startup",
      summary:
        "Posted that she was joining an LA startup as a senior software engineer. Wikipedia's article text dates the move December 2024 while citing the post to October 24, 2024; the post is now unavailable.",
      location: "Los Angeles",
      sourceIds: [S.wikipedia, S.postStartup],
    },
    {
      id: "event-figma-scoop",
      kind: "milestone",
      date: "2025-04",
      title: "Reveals Figma's in-development AI app maker",
      summary:
        "Post-Meta return to form: she surfaced Figma's Claude-powered AI app builder and 'Figma Sites' before announcement.",
      sourceIds: [S.vergeFigma],
    },
    {
      id: "event-sf100",
      kind: "award",
      date: "2025-04-21",
      title: "Named to SF Standard's SF 100 (The Thinkers)",
      summary:
        "The San Francisco Standard's influence list cited her for finding 'big tech's cheat codes.'",
      sourceIds: [S.sfStandardSF100],
    },
    {
      id: "event-outside-llms",
      kind: "other",
      date: "2025",
      title: "Judges the Outside LLMs AI & Music hackathon",
      summary:
        "Listed as a judge for the AI & Music hackathon at Outside Lands Festival.",
      location: "San Francisco",
      sourceIds: [S.outsideLLMs, S.about],
    },
    {
      id: "event-waymo",
      kind: "publication",
      date: "2025-12-23",
      title: "Publishes Waymo's unreleased Gemini ride-assistant system prompt",
      summary:
        "Recovered the 1,200-line 'Waymo Ride Assistant Meta-Prompt' from the mobile app and published it with analysis; covered by TechCrunch and The Verge.",
      sourceIds: [S.blogWaymo, S.techcrunchWaymo],
    },
    {
      id: "event-sf-radar",
      kind: "project",
      date: "2026-08",
      title: "Builds a San Francisco 'openings radar'",
      summary:
        "Applied her method to public city permits, registrations, and health filings to surface new restaurants and shops early — scooping the Animate pop-up, Numb, and the Corgi Cafe site.",
      location: "San Francisco",
      sourceIds: [S.sfStandardWaggle],
    },
  ],
  themes: [
    {
      id: "theme-software-is-disclosable",
      kind: "philosophy",
      status: "stated",
      title: "If it ships in the build, it is disclosable",
      summary:
        "Her working premise: code companies distribute to millions of devices is already public, so dormant features inside it are reportable facts, not secrets. 'There's no such thing as a secret beta anymore,' as Casey Newton put it — 'If it's in the code, Jane could find it.'",
      sourceIds: [S.mitTR, S.usesThis, S.wikipedia],
    },
    {
      id: "theme-findings-not-leaks",
      kind: "belief",
      status: "stated",
      title: "Findings, not leaks",
      summary:
        "She draws a hard line between her work and leaking: leaks come from employees; her findings come from publicly available data and code. The distinction is her ethical and legal footing — journalism by reading what companies themselves shipped.",
      sourceIds: [S.mitTR],
    },
    {
      id: "theme-transparency",
      kind: "belief",
      status: "stated",
      title: "Transparency as the mission",
      summary:
        "She wants tech companies to be more open about what they are building, arguing the public should not have to wait for press releases — and that if companies had been transparent, her work would not be needed.",
      sourceIds: [S.forbes, S.mitTR],
    },
    {
      id: "theme-reversing-as-reporting",
      kind: "practice",
      status: "reported",
      title: "Journalism by reversing",
      summary:
        "Tweets plus screenshots, on a near-daily cadence at peak, became a wire service the press itself subscribed to: outlets cite her by name and Facebook employees reportedly read her feed for internal news.",
      sourceIds: [S.bbc, S.cnbc, S.mitTR, S.xProfile],
    },
    {
      id: "theme-self-taught",
      kind: "practice",
      status: "reported",
      title: "The self-taught path",
      summary:
        "No degree, no newsroom, no employer authorization — she learned by taking things apart, from the childhood Linux swap to college-finals procrastination that became a career. She frames digging into apps as how she learns.",
      sourceIds: [S.wikipedia, S.mitTR, S.indieHackers],
    },
    {
      id: "theme-responsible-boundaries",
      kind: "method",
      status: "reported",
      title: "Bug bounties before headlines",
      summary:
        "When she finds a security risk rather than a feature, she reports it through bug-bounty channels before or instead of publicizing it — the Messenger Rooms write-up is her canonical example — keeping the disclosure ethic separate from the scoop ethic.",
      sourceIds: [S.usesThis, S.blogMessengerRooms, S.bbc],
    },
    {
      id: "theme-cost-of-visibility",
      kind: "belief",
      status: "stated",
      title: "The cost of being the messenger",
      summary:
        "She is candid that visibility brought harassment and depression — users angry about a feature treated her as its author. 'I wish more people realized I'm a person.' The theme recurs across the MIT Technology Review and Embedded interviews.",
      sourceIds: [S.mitTR, S.embedded],
    },
    {
      id: "theme-easter-eggs",
      kind: "influence",
      status: "reported",
      title: "Anticipated by the engineers she covers",
      summary:
        "Her scrutiny changed corporate behavior: developers stopped assuming in-code features stay hidden, left 'Hi, Jane' messages in builds, and named an Instagram experiment 'What's up Jane' — the watched now watch back.",
      sourceIds: [S.businessInsider, S.mitTR],
    },
    {
      id: "theme-outsider-insider",
      kind: "practice",
      status: "inferred",
      title: "From outside leaker to inside engineer and back",
      summary:
        "The arc — independent scoop artist, Meta engineer building the products she once leaked, laid-off researcher returning to public findings — is the index author's synthesis of the documented career moves, not a frame she has stated.",
      sourceIds: [S.postMeta, S.vergeLayoffs, S.blogWaymo],
    },
  ],
  works: [
    {
      id: "work-findings-feed",
      kind: "project",
      status: "ongoing",
      title: "@wongmjane findings feed and wongmjane.com blog",
      summary:
        "The running corpus of unreleased-feature discoveries — tweets, screenshots, mock-ups, and dated blog write-ups — published since 2017 and resumed in force after Meta.",
      sourceIds: [S.site, S.xProfile, S.wayback2019, S.mitTR],
    },
    {
      id: "work-messenger-rooms",
      kind: "other",
      status: "published",
      title: "Messenger Rooms bug-bounty write-up",
      date: "2020-04-24",
      summary:
        "Her disclosed account of reporting a private-API abuse risk in Facebook's unreleased Messenger Rooms via the bug-bounty program.",
      sourceIds: [S.blogMessengerRooms],
    },
    {
      id: "work-threads",
      kind: "product",
      status: "released",
      title: "Threads (Meta) — engineering work",
      date: "2023",
      location: "San Francisco",
      summary:
        "As a Meta engineer on Instagram and Threads she helped build the products she used to leak; the team's Threads Web client won the 2024 Webby for Best Mobile User Interface. Individual feature attribution inside Meta is not public.",
      sourceIds: [S.postMeta, S.vergeLayoffs, S.webby],
    },
    {
      id: "work-waymo-analysis",
      kind: "other",
      status: "published",
      title: "Waymo 'Ride Assistant Meta-Prompt' disclosure and analysis",
      date: "2025-12-23",
      summary:
        "Recovered and published the full 1,200-line system prompt for Waymo's unreleased Gemini-powered in-car assistant, with her own behavioral analysis.",
      sourceIds: [S.blogWaymo, S.techcrunchWaymo],
    },
    {
      id: "work-sf-radar",
      kind: "project",
      status: "ongoing",
      title: "San Francisco openings radar",
      date: "2026",
      location: "San Francisco",
      summary:
        "A self-built tool scanning public city permits, business registrations, and health filings to surface new restaurants and shops early; she has not ruled out releasing it as a public app.",
      sourceIds: [S.sfStandardWaggle],
    },
  ],
  appearances: [
    {
      id: "appearance-scmp-podcast",
      title:
        "Inside China Tech: The woman 'scooping' apps and exposing the secrets of Facebook, Twitter and more",
      venue: "South China Morning Post (podcast)",
      publishedAt: "2018-11-27",
      participants: ["Jane Manchun Wong", "Zen Soo"],
      summary:
        "Early audio interview on reverse-engineering apps and what she finds inside them.",
      media: [
        {
          type: "audio",
          url: "https://www.scmp.com/podcasts/article/2174995/podcast-woman-scooping-apps-and-exposing-secrets-facebook-twitter-and-more",
          sourceId: S.scmpPodcast,
        },
      ],
      sourceIds: [S.scmpPodcast],
    },
    {
      id: "appearance-bbc",
      title: "Jane Manchun Wong: The woman scooping Silicon Valley",
      venue: "BBC News",
      publishedAt: "2019-04-27",
      participants: ["Jane Manchun Wong", "Alli Shultes"],
      summary:
        "The profile that named the phenomenon: 18-hour weekends, freelance bug bounties, and the ambition to spoil Silicon Valley's scoops.",
      sourceIds: [S.bbc],
    },
    {
      id: "appearance-uses-this",
      title: "Uses This interview",
      venue: "Uses This",
      publishedAt: "2020-07-16",
      participants: ["Jane Manchun Wong"],
      summary:
        "A setup-and-method Q&A: the 2017 MacBook Pro, OnePlus phone, CLI toolchain, and the bug-bounty work alongside feature hunting.",
      media: [
        {
          type: "article",
          url: "https://usesthis.com/interviews/jane.manchun.wong/",
          sourceId: S.usesThis,
        },
      ],
      sourceIds: [S.usesThis],
    },
    {
      id: "appearance-ming-pao",
      title: "「拆app達人」黃文津 揭露隱藏功能 推動更善良網絡世界",
      venue: "Ming Pao",
      publishedAt: "2021-02-07",
      participants: ["Jane Manchun Wong"],
      summary:
        "Chinese-language feature interview in the Hong Kong daily — her home-press framing of the work.",
      media: [
        {
          type: "article",
          url: "https://ol.mingpao.com/ldy/cultureleisure/culture/20210207/1612637829479/%7b%e6%8b%86app%e9%81%94%e4%ba%ba%7d%e9%bb%83%e6%96%87%e6%b4%a5-%e6%8f%ad%e9%9c%b2%e9%9a%b1%e8%97%8f%e5%8a%9f%e8%83%bd-%e6%8e%a8%e5%8b%95%e6%9b%b4%e5%96%84%e8%89%af%e7%b6%b2%e7%b5%a1%e4%b8%96%e7%95%8c",
          sourceId: S.mingPao,
        },
      ],
      sourceIds: [S.mingPao],
    },
    {
      id: "appearance-indie-hackers",
      title: "Q&A with the hacker that scooped Twitter's in-app tipping feature",
      venue: "Indie Hackers",
      participants: ["Jane Manchun Wong"],
      summary:
        "A process Q&A pegged to her Twitter tipping scoop: she traces the work to college-finals curiosity and names bug-bounty hunter Philippe Harewood as an influence.",
      sourceIds: [S.indieHackers],
    },
    {
      id: "appearance-embedded",
      title: "My Internet: Jane Manchun Wong",
      venue: "Embedded",
      publishedAt: "2022-12-22",
      participants: ["Jane Manchun Wong", "Nick Catucci"],
      summary:
        "A personal-internet Q&A covering TikTok's Hong Kong exit, Mastodon as a non-replacement, viral posts, and why she cannot quit Twitter.",
      media: [
        {
          type: "article",
          url: "https://embedded.substack.com/p/my-internet-jane-manchun-wong",
          sourceId: S.embedded,
        },
      ],
      sourceIds: [S.embedded],
    },
    {
      id: "appearance-verge-installer",
      title: "The Verge Installer — Screen Share",
      venue: "The Verge",
      publishedAt: "2025",
      participants: ["Jane Manchun Wong"],
      summary:
        "Installer No. 95's screen-share segment, in which she recommends a tool for looking through old photos.",
      media: [
        {
          type: "article",
          url: "https://www.theverge.com/installer-newsletter/764641/shutter-declutter-pixel-10-pro-fold-samsung-galaxy-buds-3-fe-herdling-installer",
          sourceId: S.vergeInstaller,
        },
      ],
      sourceIds: [S.vergeInstaller],
    },
    {
      id: "appearance-outside-llms",
      title: "Outside LLMs AI & Music hackathon — judge",
      venue: "Outside Lands Festival",
      publishedAt: "2025",
      participants: ["Jane Manchun Wong"],
      summary:
        "Served as a judge for the AI & Music hackathon at Outside Lands, per the event page and her own honors list.",
      sourceIds: [S.outsideLLMs, S.about],
    },
  ],
  relations: [
    {
      id: "rel-meta",
      kind: "employed_by",
      target: "meta",
      targetName: "Meta",
      targetKind: "organization",
      note:
        "Joined Meta in mid-2023 as a software engineer on Instagram and Threads — announced on Threads' launch day — until the October 16, 2024 reorganization eliminated her role.",
      sourceIds: [S.postMeta, S.wikipedia, S.vergeLayoffs],
    },
    {
      id: "rel-philippe-harewood",
      kind: "influenced_by",
      target: "philippe-harewood",
      targetName: "Philippe Harewood",
      note:
        "She names the bug-bounty hunter as an influence on her app-research work.",
      sourceIds: [S.indieHackers],
    },
    {
      id: "rel-nick-catucci",
      kind: "interviewed_by",
      target: "nick-catucci",
      targetName: "Nick Catucci",
      note: "Embedded's 'My Internet' interview, December 2022.",
      sourceIds: [S.embedded],
    },
  ],
  openQuestions: [
    "Her birth year is inconsistent across the record: Wikipedia gives April 13, 1994 (citing her own post), but profiles called her 23 (SCMP/TNW 2018, BBC April 2019), 24 (CNN March 2019), 25 (Business Insider February 2020), and 27 (MIT Technology Review April 2022) — some of those imply 1995–96 births.",
    "The exact timing and status of her UMass Dartmouth exit are vague — enrolled through at least late 2017, 'taking a break' per the BBC in April 2019, gone 'a few months' before graduating per MIT Technology Review.",
    "Her Meta job title differs across sources — 'software engineer' in most reporting, 'security engineer' per LinkedIn-derived Business Insider coverage.",
    "The Los Angeles startup she announced in late 2024 is unnamed; the announcement post is now unavailable, Wikipedia's own date is internally inconsistent (October 24 post vs. 'December 2024' text), and her Threads bio now lists 'startups' under 'prev' — her current employer is unconfirmed.",
    "Her public scoop output during the Meta tenure is thin in the record; whether she continued private research then, or was bound by employment, is undocumented.",
    "Whether the San Francisco openings radar will ship as a public app is unresolved — she has said only that she is 'not ruling it out.'",
    "Non-English profiles (Ming Pao, Les Echos, Frankfurter Allgemeine) are catalogued from her own press list; this index did not fully translate them, so their distinct claims are under-read here.",
  ],
  body: `Jane Manchun Wong is the researcher who made "it was in the code" a reporting beat. Working from Hong Kong and later San Francisco, she reverse-engineers the public builds of the world's biggest apps — Twitter, Instagram, Facebook, Snapchat, Spotify, LinkedIn, and more — to surface features the companies have not announced, publishing screenshots and mock-ups under her handle @wongmjane. The BBC called her "the woman scooping Silicon Valley"; MIT Technology Review called her work keeping tech "on its toes"; Casey Newton put it plainly: "there's no such thing as a secret beta anymore."

## Origins and method

Wong was born in British Hong Kong in April 1994 and grew up there, a self-taught coder whose origin story is a seven-year-old replacing Windows with Linux to defeat parental controls. She studied computer science at UMass Dartmouth but left a few months before graduating because of medical issues — a decision she has said she regrets. Her method needs no insider access: she decompiles shipped mobile apps and reads public client-side code for dormant, flag-gated features, then documents what she finds. When the finding is a security risk rather than a feature, she routes it through bug-bounty programs first — her April 2020 write-up on reporting a private-API abuse path in the unreleased Messenger Rooms is the canonical example.

## The scoop era

Her first documented discovery came in October 2017 — a Facebook résumé feature, surfaced via Matt Navarra — and her first self-posted "finding" followed on May 4, 2018: "Twitter is working on End-to-End Encrypted Secret DM!" What followed was a near-daily feed of discoveries that became infrastructure for tech journalism: Facebook Dating's homepage and a nearby-friends map in 2018, Instagram's hidden like counts in April 2019 (confirmed by Adam Mosseri about twelve days later), dark modes across apps, Twitter's tipping feature, and in May 2021 the name, price, and feature set of Twitter Blue weeks before launch. By October 2019, CNBC reported that Facebook employees themselves watched her feed to learn what other teams were building. Engineers began leaving "Hi, Jane" messages in code; one Instagram experiment was literally named "What's up Jane." The work was not free for her: she has described depression, harassment, and being treated as "an emotional punching bag" by users angry at features she merely reported. Recognition accumulated anyway — Tatler's Gen.T list in 2020, Forbes's 30 Under 30 (2022, Social Media) announced December 2021, and the MIT Technology Review profile in April 2022.

## The Meta chapter

In June 2023 she crossed the wall: she joined Meta to work on Instagram and Threads — the flagship app of a company whose roadmap she had spent years leaking — relocating to San Francisco and announcing it on Threads on launch day, July 5. The hire was celebrated publicly by CTO Andrew Bosworth (already reportedly a member of Meta's internal Jane Manchun Wong fan club) and Instagram head Adam Mosseri. As a Threads team member she shared in the product's 2024 Webby win for Best Mobile User Interface. The chapter ended on October 16, 2024, when a Meta reorganization eliminated her role alongside cuts at Instagram, WhatsApp, and Reality Labs. Weeks later she announced a senior software engineer role at an unnamed Los Angeles startup — a post now unavailable, its date inconsistent even within Wikipedia.

## After Meta

The hiatus ended loudly. In April 2025 she surfaced Figma's in-development Claude-powered AI app maker and "Figma Sites." In December 2025 she published her most technically striking disclosure: the complete 1,200-line system prompt for Waymo's unreleased Gemini ride assistant, recovered from the public app build — proof her method generalizes past social apps. By mid-2026 she had turned it on her own city, building a "radar" that scans San Francisco permits, business registrations, and health filings to scoop restaurant and retail openings — the Animate pop-up in Japantown, Stella Wang's Numb, the Corgi Cafe site — and telling the San Francisco Standard she has not ruled out shipping it publicly. A Twitter design patent granted in 2023 even cites her tweeted screenshot as prior art: the legal record now treats her findings as part of the state of the art.

## What she says it means

Wong insists her work is not leaking — "leaks" come from employees, she says, while she reads "publicly available data and code." The mission, in her telling, is transparency: people who use these apps deserve to know what is being built behind the scenes, and "if they had been [transparent] before, I wouldn't have to do this." She also insists it is not the point of her life: she has wanted to be a software engineer since age six, wants to create things, and has said she will stop when her curiosity is satisfied.

## What the record does not settle

The profile trail contradicts itself on her birth year (1994 by her own account; reported ages implying 1995–96). Her Meta title is variously reported. Her current employer is unconfirmed, with her own bio now listing "startups" in the past tense. This index preserves those seams rather than smoothing them.

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
