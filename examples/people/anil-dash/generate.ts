#!/usr/bin/env bun
/** Generate examples/people/anil-dash/person-index.json with derived source ids. */

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

// --- Subject-controlled ------------------------------------------------

const about = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About Anil Dash",
  url: "https://anildash.com/about/",
  publisher: "anildash.com",
  notes:
    "The subject's own long bio and affiliations list (EFF board 2022-present, Stack Overflow board 2012-2022, Obama White House advisor 2012-2023, MIT Press board 2026-present). Self-reported.",
});
const antitech = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "antitech",
  url: "https://anti.tech/",
  publisher: "antitech",
  notes:
    "Site of the firm he co-founded in 2025 after leaving Fastly: 'we help organizations thrive by building good, thoughtful technology.'",
});
const linkedin = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Anil Dash — LinkedIn",
  url: "https://www.linkedin.com/in/anildash",
  publisher: "LinkedIn",
  notes:
    "Self-maintained employment record: Six Apart Apr 2003-Sep 2009, Glitch CEO Oct 2016-May 2022, Fastly VP May 2022-Jun 2025, antitech cofounder, board seats at The Markup and the Obama Foundation council.",
});

// --- First-person writing and media ------------------------------------

const webWeLost = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Web We Lost",
  url: "https://anildash.com/2012/12/13/the-web-we-lost/",
  publisher: "anildash.com",
  publishedAt: "2012-12-13",
  notes:
    "His most-cited essay: an itemized account of the open values the social web traded away. Originally published on dashes.com.",
});
const endgame = source({
  binding: "first_person",
  mediaType: "article",
  title: "Endgame for the Open Web",
  url: "https://www.anildash.com/2026/03/27/endgame-open-web/",
  publisher: "anildash.com",
  publishedAt: "2026-03-27",
  notes:
    "Argues the open web faces an existential attack from AI scraping, closed APIs, and abandoned shared norms.",
});
const princeTenYears = source({
  binding: "first_person",
  mediaType: "article",
  title: "Discovering Prince, Ten Years Later",
  url: "https://www.anildash.com/2026/04/20/prince-ten-years/",
  publisher: "anildash.com",
  publishedAt: "2026-04-20",
  notes:
    "His retrospective index of his own Prince writing and preservation work: the Prince Online Museum, the 1993 liner-notes draft, the 1996 'Message from the Artist' letter, the symbol-font floppy recovery, and the official Prince podcast appearance.",
});
const lostInfra = source({
  binding: "first_person",
  mediaType: "article",
  title: "The lost infrastructure of social media",
  url: "https://medium.com/@anildash/the-lost-infrastructure-of-social-media-d2b95662ccd3",
  publisher: "Medium",
  publishedAt: "2016-08",
  notes:
    "Follow-up to The Web We Lost cataloging the blogosphere's vanished shared infrastructure — search, trackbacks, RSS, blogrolls.",
});
const discoverPrince = source({
  binding: "first_person",
  mediaType: "article",
  title: "It's time to discover Prince",
  url: "https://medium.com/@anildash/its-time-to-discover-prince-589344cb52ff",
  publisher: "Medium",
  publishedAt: "2017-02",
  notes:
    "His guided tour of Prince's catalog, published when the catalog returned to streaming services.",
});
const purpleRain30 = source({
  binding: "first_person",
  mediaType: "article",
  title: "I Know Times Are Changing",
  url: "https://medium.com/message/i-know-times-are-changing-f6032d87c97b",
  publisher: "Medium (The Message)",
  publishedAt: "2014",
  notes:
    "His minute-by-minute reconstruction of how Prince created 'Purple Rain' at the song's 30th anniversary.",
});
const atlanticNft = source({
  binding: "first_person",
  mediaType: "article",
  title: "NFTs Were Supposed to Protect Artists. They Don't.",
  url: "https://www.theatlantic.com/ideas/archive/2021/04/nfts-werent-supposed-end-like/618488/",
  publisher: "The Atlantic",
  publishedAt: "2021-04",
  notes:
    "His own account of co-creating the 2014 monetized-graphics prototype with Kevin McCoy and his misgivings about the market it seeded.",
});
const fogCreekIsGlitch = source({
  binding: "first_person",
  mediaType: "article",
  title: "Fog Creek is now Glitch!",
  url: "https://medium.com/make-better-software/fog-creek-is-now-glitch-8d0308aaf69e",
  publisher: "Medium (Glitch: Make Better Software)",
  publishedAt: "2018-09-25",
  notes:
    "His announcement renaming Fog Creek Software to Glitch, Inc., in his own words as CEO.",
});
const glitchEnd = source({
  binding: "first_person",
  mediaType: "article",
  title: "Important changes are coming to Glitch",
  url: "https://blog.glitch.com/post/changes-are-coming-to-glitch",
  publisher: "blog.glitch.com",
  publishedAt: "2025-05-22",
  notes:
    "His announcement, as CEO, that Glitch app hosting and user profiles would shut down on July 8, 2025.",
});
const transformed = source({
  binding: "first_person",
  mediaType: "article",
  title: "I Am #Transformed",
  url: "https://medium.com/@anildash/prince-transformed-eab793c75757",
  publisher: "Medium",
  publishedAt: "2016-06",
  notes:
    "Annotated record of the talk he gave at the Eyeo Festival in Minneapolis on what would have been Prince's 58th birthday, connecting Prince's artistry and technology battles to immigration and his own family history.",
});
const effBio = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Anil Dash — Electronic Frontier Foundation",
  url: "https://www.eff.org/about/staff/anil-dash",
  publisher: "Electronic Frontier Foundation",
  notes:
    "Board biography he supplies to organizations; the canonical self-description of his advisory roles, board seats, and press labels.",
});
const functionPodcast = source({
  binding: "first_person",
  mediaType: "audio",
  title: "Function with Anil Dash",
  url: "https://podcasts.apple.com/us/podcast/function-with-anil-dash/id1439658455",
  publisher: "Glitch / Vox Media Podcast Network",
  publishedAt: "2018",
  notes:
    "His podcast on how tech's builders think about their responsibility; 25 episodes across 2018-2020.",
});
const wiredAuthor = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Anil Dash — Wired author archive",
  url: "https://www.wired.com/author/anil-dash/",
  publisher: "Wired",
  notes:
    "Archive of his Wired columns (2012-2015), supporting the contributing-editor and monthly-columnist roles described in his bios.",
});

// --- Interviews ---------------------------------------------------------

const theCurrent = source({
  binding: "interview",
  mediaType: "article",
  title: "Anil Dash on Prince's secret life as a computer nerd",
  url: "https://www.thecurrent.org/feature/2016/06/29/anil-dash-on-princes-secret-life-as-a-computer-nerd",
  publisher: "The Current (Minnesota Public Radio)",
  publishedAt: "2016-06-29",
  notes:
    "Interview on Prince's early-adopter history and Dash's own fan record: the newsgroups, Prodigy and AOL chats, and AIM exchanges with Prince.",
});
const morningNews = source({
  binding: "interview",
  mediaType: "article",
  title: "Anil Dash",
  url: "https://themorningnews.org/anil-dash/",
  publisher: "The Morning News",
  notes:
    "Q&A on Expert Labs' origins — the Peer to Patent antecedent, the MacArthur grant, and AAAS support — in his own words.",
});
const bigThink = source({
  binding: "interview",
  mediaType: "webpage",
  title: "Anil Dash — Big Think",
  url: "https://bigthink.com/people/anildash/",
  publisher: "Big Think",
  notes:
    "Interview bio page: Village Voice years, Six Apart first-employee role, PBS Media Matters 2003, and the Expert Labs mandate.",
});

// --- Primary records ----------------------------------------------------

const sothebysQuantum = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Kevin McCoy | Quantum | Natively Digital: A Curated NFT Sale",
  url: "https://www.sothebys.com/en/buy/auction/2021/natively-digital-a-curated-nft-sale-2/quantum",
  publisher: "Sotheby's",
  publishedAt: "2021-06",
  notes:
    "Auction record noting Quantum was originally minted May 3, 2014 on the Namecoin blockchain.",
});
const cwaRelease = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Communications Workers of America and Glitch Announce Voluntary Union Recognition",
  url: "https://cwa-union.org/news/releases/communications-workers-of-america-and-glitch-announce-voluntary-union-recognition",
  publisher: "Communications Workers of America",
  publishedAt: "2020-03-13",
  notes:
    "Joint release quoting Dash on the voluntary recognition of CWA Local 1101 by Glitch.",
});
const aaasLaunch = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Expert Labs to Help Support Policymakers by Tapping into 'Cloud Expertise'",
  url: "https://www.aaas.org/news/expert-labs-help-support-policymakers-tapping-cloud-expertise",
  publisher: "AAAS",
  publishedAt: "2009-11",
  notes:
    "AAAS announcement of Expert Labs under Dash's direction with a $500,000 MacArthur Foundation grant.",
});
const aaasWhiteHouse = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "White House, Via AAAS's Expert Labs, Asks Scientists and Engineers for Their Collective Wisdom",
  url: "https://www.aaas.org/news/white-house-aaass-expert-labs-asks-scientists-and-engineers-their-collective-wisdom",
  publisher: "AAAS",
  publishedAt: "2010-04",
  notes:
    "Record of Expert Labs running the White House OSTP call for scientists' input via Facebook, Twitter, and the ThinkTank tool.",
});
const webby2022 = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Anil Dash & Kevin McCoy — Webby Lifetime Achievement",
  url: "https://winners.webbyawards.com/2022/specialachievement/301/anil-dash-kevin-mccoy",
  publisher: "The Webby Awards",
  publishedAt: "2022",
  notes:
    "The 26th Annual Webby Awards' citation honoring Dash and McCoy for the monetized-graphics groundwork later known as NFTs.",
});
const fastlyAcquire = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Fastly acquires Glitch for 'yes code' at edge",
  url: "https://www.fastly.com/blog/fastly-announces-acquisition-of-glitch-a-future-of-yes-code-at-the-edge",
  publisher: "Fastly",
  publishedAt: "2022-05-19",
  notes: "The acquirer's announcement, quoting Dash.",
});
const thinkUpDocs = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "ThinkUp documentation — core contributors",
  url: "https://thinkup.readthedocs.io/en/stable/core.html",
  publisher: "ThinkUp",
  notes:
    "Project record: Trapani started ThinkUp in summer 2009 as an Expert Labs project; Dash founded Expert Labs and co-founded the ThinkUp company with her.",
});

// --- Reference ----------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Anil Dash (Q4764630)",
  url: "https://www.wikidata.org/wiki/Q4764630",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Anil Dash",
  url: "https://en.wikipedia.org/wiki/Anil_Dash",
  publisher: "Wikipedia",
  notes:
    "Used for discovery and cross-checking dates; per its own sourcing it leans on interviews and press profiles.",
});
const expertLabsWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Expert Labs",
  url: "https://en.wikipedia.org/wiki/Expert_Labs",
  publisher: "Wikipedia",
  notes:
    "Records the November 2009 founding under AAAS after discussions with the White House OSTP.",
});

// --- Reporting ----------------------------------------------------------

const observer2009 = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Dash to D.C.! Tech Guru Will Head Gov't Incubator, Digitize Democracy",
  url: "https://observer.com/2009/11/dash-to-dc-tech-guru-will-head-govt-incubator-digitize-democracy/",
  publisher: "Observer",
  publishedAt: "2009-11",
  notes:
    "Contemporaneous account of how the White House OSTP recruited him to run Expert Labs.",
});
const observer2012 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tech Insurgents 2012: Anil Dash",
  url: "https://observer.com/2012/11/tech-insurgents-2012-anil-dash-activate-thinkup/",
  publisher: "Observer",
  publishedAt: "2012-11",
  notes:
    "Profile covering Activate, ThinkUp, and his 'values built into your apps' argument.",
});
const vergeFastly = source({
  binding: "reporting",
  mediaType: "article",
  title: "Glitch acquired by cloud service provider Fastly",
  url: "https://www.theverge.com/2022/5/19/23126349/glitch-fastly-acquired-coding-anil-dash-fog-creek",
  publisher: "The Verge",
  publishedAt: "2022-05-19",
  notes:
    "Reports the Fastly acquisition, Dash's move to VP of developer experience, the 2018 rename, the $30M raise, and 1.8 million monthly users.",
});
const vergeShutdown = source({
  binding: "reporting",
  mediaType: "article",
  title: "Glitch is basically shutting down",
  url: "https://www.theverge.com/news/673457/glitch-coding-platform-shutting-down",
  publisher: "The Verge",
  publishedAt: "2025-05-22",
  notes:
    "Coverage of the end of Glitch app hosting, with Dash's comments on what remains of the platform.",
});
const techcrunchCeo = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Anil Dash, new CEO of Fog Creek, launches platform to remove barriers to app development",
  url: "https://techcrunch.com/2016/12/06/anil-dash-fog-creek/",
  publisher: "TechCrunch",
  publishedAt: "2016-12-06",
  notes:
    "Covers his appointment as CEO and the Gomix launch — the product that became Glitch.",
});
const vergeMakerbase = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Makerbase wants to connect you to the creators of the internet stuff you love",
  url: "https://www.theverge.com/2015/8/4/9093317/makerbase-internet-directory-diversity-white-house-demo-day",
  publisher: "The Verge",
  publishedAt: "2015-08-04",
  notes:
    "Launch coverage of Makerbase at the first White House Demo Day, quoting Dash on invisible makers.",
});
const techcrunchMonegraph = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Monegraph Uses Bitcoin Tech So Internet Artists Can Establish 'Original' Copies Of Their Work",
  url: "https://techcrunch.com/2014/05/09/monegraph/",
  publisher: "TechCrunch",
  publishedAt: "2014-05-09",
  notes:
    "Contemporaneous report on the monetized-graphics prototype McCoy and Dash built at Rhizome's Seven on Seven.",
});
const viceSevenOnSeven = source({
  binding: "reporting",
  mediaType: "article",
  title: "A Bitcoin for GIFs Aims to Make Digital Art Ownable",
  url: "https://www.vice.com/en/article/a-bitcoin-for-gifs-aims-to-make-digital-art-ownable/",
  publisher: "Vice",
  publishedAt: "2014-05",
  notes:
    "Report from Seven on Seven at the New Museum describing the Namecoin registration of the McCoys' GIF and Dash's four-dollar purchase.",
});
const salonSixApart = source({
  binding: "reporting",
  mediaType: "article",
  title: "Blogging grows up",
  url: "https://www.salon.com/2004/08/09/six_apart/",
  publisher: "Salon",
  publishedAt: "2004-08-09",
  notes:
    "Contemporaneous feature confirming Six Apart hired Dash as its first employee in 2003.",
});
const vergeCba = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Glitch workers sign tech's first collective bargaining agreement",
  url: "https://www.theverge.com/2021/3/2/22307671/glitch-workers-sign-historic-collective-bargaining-agreement-cwa",
  publisher: "The Verge",
  publishedAt: "2021-03-02",
  notes:
    "Reports the first collective bargaining agreement signed by white-collar tech workers in the US, including recall rights for the May 2020 layoffs.",
});
const nytPrince = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Film at 11: How a Minnesota Station Found Old Footage of a Very Young Prince",
  url: "https://www.nytimes.com/2022/04/07/us/prince-1970-teachers-strike-wcco.html",
  publisher: "The New York Times",
  publishedAt: "2022-04-07",
  authors: ["Maria Cramer"],
  notes:
    "The coverage that described Dash as a 'Prince scholar' commenting on the earliest known footage of Prince.",
});
const axiosQuantum = source({
  binding: "reporting",
  mediaType: "article",
  title: "First-ever NFT sold for $1.47 million",
  url: "https://www.axios.com/2021/06/10/first-nft-sold",
  publisher: "Axios",
  publishedAt: "2021-06-10",
});
const joelOnCeo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Anil Dash is the new CEO of Fog Creek Software",
  url: "https://www.joelonsoftware.com/2016/12/06/anil-dash-is-the-new-ceo-of-fog-creek-software/",
  publisher: "Joel on Software",
  publishedAt: "2016-12-06",
  authors: ["Joel Spolsky"],
  notes:
    "The founder's own announcement of the CEO transition, including Makerbase getting a home at Fog Creek.",
});
const spotifyNjs = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "How Lin-Manuel Miranda and Anil Dash Turned a Bruno Mars Song Into a Teachable Moment",
  url: "https://artists.spotify.com/en/blog/how-lin-manuel-miranda-and-anil-dash-turned-a-bruno-mars-song-into-a",
  publisher: "Spotify for Artists",
  publishedAt: "2018-02-28",
  notes:
    "The story of the New Jack Swing 101 playlist the two built in January 2018 after the 'Finesse' video.",
});
const mullenwegMt = source({
  binding: "reporting",
  mediaType: "article",
  title: "Anil Dash: Moving Forward",
  url: "https://ma.tt/2004/05/anil-dash-moving-forward/",
  publisher: "ma.tt (Matt Mullenweg)",
  publishedAt: "2004-05-20",
  notes:
    "Mullenweg's contemporaneous note on Dash's public response to the Movable Type 3.0 licensing backlash.",
});
const dataSociety = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Anil Dash — Data & Society",
  url: "https://datasociety.net/team/anil-dash/",
  publisher: "Data & Society Research Institute",
  notes:
    "Affiliation page listing him as 'Co-Founder and Principal, antitech.'",
});

// --- Archive ------------------------------------------------------------

const dashesAbout2009 = source({
  binding: "archive",
  mediaType: "webpage",
  title: "About Anil Dash (dashes.com, 2009 capture)",
  url: "https://web.archive.org/web/20090327172642/dashes.com/anil/about.html",
  publisher: "dashes.com via Internet Archive Wayback Machine",
  notes:
    "March 2009 capture of his own about page: blogging since 1999, VP at Six Apart 'which I helped start,' MSNBC 'Best of Blogs' recognition.",
});

const S = {
  about: about.id,
  antitech: antitech.id,
  linkedin: linkedin.id,
  webWeLost: webWeLost.id,
  endgame: endgame.id,
  princeTenYears: princeTenYears.id,
  lostInfra: lostInfra.id,
  discoverPrince: discoverPrince.id,
  purpleRain30: purpleRain30.id,
  atlanticNft: atlanticNft.id,
  fogCreekIsGlitch: fogCreekIsGlitch.id,
  glitchEnd: glitchEnd.id,
  transformed: transformed.id,
  effBio: effBio.id,
  functionPodcast: functionPodcast.id,
  wiredAuthor: wiredAuthor.id,
  theCurrent: theCurrent.id,
  morningNews: morningNews.id,
  bigThink: bigThink.id,
  sothebysQuantum: sothebysQuantum.id,
  cwaRelease: cwaRelease.id,
  aaasLaunch: aaasLaunch.id,
  aaasWhiteHouse: aaasWhiteHouse.id,
  webby2022: webby2022.id,
  fastlyAcquire: fastlyAcquire.id,
  thinkUpDocs: thinkUpDocs.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  expertLabsWiki: expertLabsWiki.id,
  observer2009: observer2009.id,
  observer2012: observer2012.id,
  vergeFastly: vergeFastly.id,
  vergeShutdown: vergeShutdown.id,
  techcrunchCeo: techcrunchCeo.id,
  vergeMakerbase: vergeMakerbase.id,
  techcrunchMonegraph: techcrunchMonegraph.id,
  viceSevenOnSeven: viceSevenOnSeven.id,
  salonSixApart: salonSixApart.id,
  vergeCba: vergeCba.id,
  nytPrince: nytPrince.id,
  axiosQuantum: axiosQuantum.id,
  joelOnCeo: joelOnCeo.id,
  spotifyNjs: spotifyNjs.id,
  mullenwegMt: mullenwegMt.id,
  dataSociety: dataSociety.id,
  dashesAbout2009: dashesAbout2009.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-anil-dash",
  generatedAt: "2026-09-17T00:45:00Z",
  subject: {
    kind: "person",
    handle: "anil-dash",
    displayName: "Anil Dash",
    summary:
      "American blogger, entrepreneur, and writer publishing his personal site since 1999. First employee and chief evangelist of Six Apart; founding director of Expert Labs; co-founder of Activate, ThinkUp, and Makerbase; CEO of Fog Creek/Glitch through its Fastly acquisition; co-creator of the first NFT prototype; host of the Function podcast; essayist on the open web and a recognized Prince scholar.",
    identity: {
      wikidataId: "Q4764630",
      officialSite: "https://anildash.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Anil_Dash",
      profiles: [
        "https://bsky.app/profile/anildash.com",
        "https://www.linkedin.com/in/anildash",
        "https://me.dm/@anildash",
        "https://orcid.org/0009-0000-2472-444X",
        "https://x.com/anildash",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T00:45:00Z",
    coverage: ["biography", "work", "beliefs", "projects", "media", "philosophy"],
  },
  sources: [
    about,
    antitech,
    linkedin,
    webWeLost,
    endgame,
    princeTenYears,
    lostInfra,
    discoverPrince,
    purpleRain30,
    atlanticNft,
    fogCreekIsGlitch,
    glitchEnd,
    transformed,
    effBio,
    functionPodcast,
    wiredAuthor,
    theCurrent,
    morningNews,
    bigThink,
    sothebysQuantum,
    cwaRelease,
    aaasLaunch,
    aaasWhiteHouse,
    webby2022,
    fastlyAcquire,
    thinkUpDocs,
    wikidata,
    wikipedia,
    expertLabsWiki,
    observer2009,
    observer2012,
    vergeFastly,
    vergeShutdown,
    techcrunchCeo,
    vergeMakerbase,
    techcrunchMonegraph,
    viceSevenOnSeven,
    salonSixApart,
    vergeCba,
    nytPrince,
    axiosQuantum,
    joelOnCeo,
    spotifyNjs,
    mullenwegMt,
    dataSociety,
    dashesAbout2009,
  ],
  claims: [
    // ---- fact ----
    {
      id: "claim-born-1975",
      kind: "fact",
      text: "Anil Dash was born on September 5, 1975, to Odia parents who emigrated from India, and grew up near Harrisburg, Pennsylvania.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-blog-since-1999",
      kind: "fact",
      text: "He launched his personal weblog dashes.com in 1999 while working as an independent technology consultant, making it one of the earliest blogs on the web; he still publishes it as anildash.com.",
      sourceIds: [S.wikipedia, S.dashesAbout2009, S.about],
    },
    {
      id: "claim-no-college-degree",
      kind: "fact",
      text: "He dropped out of college after discovering the web in the mid-1990s and has never graduated — a point his own bios repeat verbatim.",
      sourceIds: [S.theCurrent, S.effBio, S.about],
    },
    {
      id: "claim-village-voice",
      kind: "fact",
      text: "From 2001 to 2003 he worked as a new media developer at the Village Voice.",
      sourceIds: [S.wikipedia, S.bigThink],
    },
    {
      id: "claim-six-apart-first-employee",
      kind: "fact",
      text: "He joined Six Apart in 2003 as the company's first employee and served as vice president and chief evangelist until September 2009, leading community and communications for Movable Type, TypePad, Vox, and LiveJournal.",
      sourceIds: [S.salonSixApart, S.linkedin, S.wikipedia],
    },
    {
      id: "claim-mt-licensing-response",
      kind: "fact",
      text: "During the May 2004 Movable Type 3.0 licensing backlash he was Six Apart's public-facing responder, engaging critics in comments and posting his own 'Moving Forward' essay, which Matt Mullenweg praised as honest communication.",
      sourceIds: [S.mullenwegMt, S.salonSixApart],
    },
    {
      id: "claim-pbs-2003",
      kind: "fact",
      text: "In 2003 he was one of four bloggers featured on the PBS series Media Matters.",
      sourceIds: [S.bigThink],
    },
    {
      id: "claim-expert-labs-founded",
      kind: "fact",
      text: "He founded and directed Expert Labs, launched in November 2009 as an independent project of the American Association for the Advancement of Science with a $500,000 MacArthur Foundation grant, after discussions with the White House Office of Science and Technology Policy.",
      sourceIds: [S.aaasLaunch, S.observer2009, S.expertLabsWiki],
    },
    {
      id: "claim-thinktank-white-house",
      kind: "fact",
      text: "In April 2010, Expert Labs ran the White House OSTP's call for scientists' and engineers' input on federal technology priorities using Trapani's ThinkTank tool across Facebook and Twitter, receiving thousands of responses.",
      sourceIds: [S.aaasWhiteHouse, S.thinkUpDocs],
    },
    {
      id: "claim-activate-cofounder",
      kind: "fact",
      text: "He co-founded Activate, a media and technology strategy consulting firm, in 2009 with Michael J. Wolf, serving as a partner and later co-founder and managing director.",
      sourceIds: [S.observer2012, S.wikipedia, S.bigThink],
    },
    {
      id: "claim-thinkup-company",
      kind: "fact",
      text: "He co-founded the ThinkUp company with Gina Trapani — the social-media analytics tool that began as an Expert Labs project and was used by the Obama White House — which was shuttered in June 2016.",
      sourceIds: [S.thinkUpDocs, S.wikipedia, S.linkedin],
    },
    {
      id: "claim-makerbase",
      kind: "fact",
      text: "He co-founded Makerbase with Gina Trapani; launched on August 4, 2015 at the first White House Demo Day, it was an 'IMDb for apps' crediting the people who make digital projects, with an explicit aim of surfacing women and people of color; it later found a home at Fog Creek Software.",
      sourceIds: [S.vergeMakerbase, S.joelOnCeo, S.linkedin],
    },
    {
      id: "claim-monegraph-first-nft",
      kind: "fact",
      text: "With artist Kevin McCoy he built Monegraph — 'monetized graphics' — at Rhizome's Seven on Seven conference at the New Museum on May 3, 2014, registering McCoy's 'Quantum' on the Namecoin blockchain in what is widely described as the first NFT.",
      sourceIds: [S.techcrunchMonegraph, S.viceSevenOnSeven, S.sothebysQuantum],
    },
    {
      id: "claim-quantum-sothebys",
      kind: "fact",
      text: "Quantum sold at Sotheby's Natively Digital auction on June 10, 2021, for $1.47 million.",
      sourceIds: [S.sothebysQuantum, S.axiosQuantum],
    },
    {
      id: "claim-fog-creek-ceo",
      kind: "fact",
      text: "He was named CEO of Fog Creek Software on December 6, 2016, succeeding founder Joel Spolsky, on the same day the company announced Gomix — the product that became Glitch — and a home for Makerbase.",
      sourceIds: [S.joelOnCeo, S.techcrunchCeo],
    },
    {
      id: "claim-glitch-product",
      kind: "fact",
      text: "Glitch formally launched in 2017; the company raised $30 million in 2018 and was renamed Glitch, Inc. on September 25, 2018; by the 2022 acquisition it counted roughly 1.8 million monthly users.",
      sourceIds: [S.vergeFastly, S.fogCreekIsGlitch],
    },
    {
      id: "claim-glitch-union",
      kind: "fact",
      text: "On March 13, 2020, Glitch voluntarily recognized its workers' union with CWA Local 1101 after about 90 percent of workers signed on — reported as a first for a tech startup — and in February 2021 signed what the CWA described as the first collective bargaining agreement by white-collar tech workers in the United States.",
      sourceIds: [S.cwaRelease, S.vergeCba],
    },
    {
      id: "claim-function-podcast",
      kind: "fact",
      text: "He hosted Function with Anil Dash, a 25-episode podcast on technology's effects on culture produced by Glitch and the Vox Media Podcast Network, running two seasons from 2018 to 2020.",
      sourceIds: [S.functionPodcast, S.wikipedia],
    },
    {
      id: "claim-fastly-acquisition",
      kind: "fact",
      text: "Fastly acquired Glitch on May 19, 2022; Dash joined Fastly as vice president of developer experience, overseeing Glitch and a new developer-tools team.",
      sourceIds: [S.vergeFastly, S.fastlyAcquire],
    },
    {
      id: "claim-glitch-hosting-end",
      kind: "fact",
      text: "As Glitch CEO, he announced in May 2025 that app hosting and user profiles would shut down on July 8, 2025, citing rising costs, abuse by bad actors, and a changed ecosystem, with dashboards staying up for exports through the end of 2025.",
      sourceIds: [S.glitchEnd, S.vergeShutdown],
    },
    {
      id: "claim-departed-fastly",
      kind: "fact",
      text: "He left Fastly in June 2025, closing a roughly nine-year run across Fog Creek, Glitch, and Fastly.",
      sourceIds: [S.linkedin],
    },
    {
      id: "claim-antitech-cofounder",
      kind: "fact",
      text: "In 2025 he co-founded antitech (anti.tech), a firm that says it 'helps organizations thrive by building good, thoughtful technology,' where he is principal and cofounder.",
      sourceIds: [S.antitech, S.dataSociety, S.linkedin],
    },
    {
      id: "claim-webby-awards",
      kind: "fact",
      text: "He and Kevin McCoy received the 2022 Webby Lifetime Achievement Award for the monetized-graphics work that laid the groundwork for NFTs; dashes.com was earlier a 2010 Webby personal-blog honoree.",
      sourceIds: [S.webby2022, S.wikipedia],
    },
    {
      id: "claim-wired-columnist",
      kind: "fact",
      text: "He was a contributing editor and monthly columnist for Wired — columns archived from 2012 to 2015 — and has written for The Atlantic, Rolling Stone, and Businessweek.",
      sourceIds: [S.effBio, S.about, S.wiredAuthor],
    },
    {
      id: "claim-obama-advisor",
      kind: "fact",
      text: "He was a technology advisor to the Obama White House's Office of Digital Strategy (2012-2023) and later co-chaired the Obama Foundation's Digital & Technology Advisory Council.",
      sourceIds: [S.about, S.effBio, S.linkedin],
    },
    {
      id: "claim-board-seats",
      kind: "fact",
      text: "His board service includes Stack Overflow (2012-2022), the Electronic Frontier Foundation (2022-present), chair of the Lower East Side Girls Club board (2017-present), and the MIT Press management board (2026-present), plus seats reported for The Markup and the Data & Society Research Institute.",
      sourceIds: [S.about, S.linkedin, S.dataSociety, S.effBio],
    },
    {
      id: "claim-prince-scholar-label",
      kind: "fact",
      text: "The New York Times described him as a 'Prince scholar' in April 2022 while covering newly found 1970 footage of an 11-year-old Prince; his bios similarly cite The New Yorker calling him a 'blogging pioneer.'",
      sourceIds: [S.nytPrince, S.about, S.effBio],
    },
    {
      id: "claim-prince-fandom",
      kind: "fact",
      text: "He has been part of Prince's online fandom since the early 1990s — the alt.music.prince-era newsgroups, the Prodigy and AOL 'Paisley Park' chats, and prince.org — and says he traded AIM chats with Prince himself.",
      sourceIds: [S.theCurrent, S.princeTenYears],
    },
    {
      id: "claim-prince-preservation",
      kind: "fact",
      text: "His Prince preservation work includes helping create the Prince Online Museum with the musician's former webmasters, archiving Prince's deleted 1993 liner-notes draft and the 1996 'Message from the Artist' letter, and recovering Prince's symbol-font floppy disk with Adafruit.",
      sourceIds: [S.princeTenYears],
    },
    {
      id: "claim-new-jack-swing",
      kind: "fact",
      text: "In January 2018 he and Lin-Manuel Miranda built the 'New Jack Swing 101' Spotify playlist after Bruno Mars's 'Finesse' video; his bios describe it as one of the most popular Spotify playlists of that year.",
      sourceIds: [S.spotifyNjs, S.effBio],
    },
    {
      id: "claim-retweet-oddity",
      kind: "fact",
      text: "His bios have described his account as the only one retweeted by both Prince and Bill Gates — a line later updated to Prince and Alexandria Ocasio-Cortez; Time named @anildash one of the best Twitter accounts in 2013.",
      sourceIds: [S.effBio, S.about],
    },
    // ---- stated_belief ----
    {
      id: "claim-belief-humane-tech",
      kind: "stated_belief",
      text: "He frames his mission as making technology 'more responsible' — ethical, inclusive, and accountable — and insists tech be discussed together with the policy, culture, labor, and justice domains it affects.",
      sourceIds: [S.about, S.effBio],
    },
    {
      id: "claim-belief-web-values",
      kind: "stated_belief",
      text: "He argues the billion-scale social networks traded away core web values — owning your own domain and identity, data portability, interoperability, pseudonymity — and that the pendulum will swing back: 'We'll fix these things; I don't worry about that.'",
      sourceIds: [S.webWeLost],
    },
    {
      id: "claim-belief-lost-infrastructure",
      kind: "stated_belief",
      text: "He holds that the blogosphere's shared infrastructure — open blog search, trackbacks, RSS, blogrolls — was good design lost to platform consolidation, and that its ideas 'were good ideas the first time around' worth reviving.",
      sourceIds: [S.lostInfra],
    },
    {
      id: "claim-belief-government-listens",
      kind: "stated_belief",
      text: "On civic technology he argues government's opportunity is listening rather than broadcasting — 'Expert Labs is about making technology that helps government listen to citizens' — because 'all of us together are smarter than any one of us alone.'",
      sourceIds: [S.aaasLaunch, S.morningNews],
    },
    {
      id: "claim-belief-nft-intent",
      kind: "stated_belief",
      text: "He maintains the monetized-graphics experiment was meant to give digital artists ownership, control, and income — 'the only thing we'd wanted to do was ensure that artists could make some money and have control over their work' — and that the speculative NFT market betrayed that intent.",
      sourceIds: [S.atlanticNft],
    },
    {
      id: "claim-belief-open-web-endgame",
      kind: "stated_belief",
      text: "He argues the open web now faces an existential attack — AI scraping without consent or compensation, closed APIs, dead shared norms like robots.txt — and that 2026 may decide whether it survives: 'we have to fight like the threat is existential. Because it is.'",
      sourceIds: [S.endgame],
    },
    {
      id: "claim-belief-prince-technologist",
      kind: "stated_belief",
      text: "He presents Prince as a technology pioneer — CD-ROMs, websites, direct artist-to-fan channels, ownership fights — whose digital work deserves preservation as part of his artistry, not just his music.",
      sourceIds: [S.theCurrent, S.transformed, S.princeTenYears],
    },
    {
      id: "claim-belief-union-recognition",
      kind: "stated_belief",
      text: "He framed voluntarily recognizing his workers' union as consistent with Glitch's mission: 'We've never shied away from challenging tech industry norms to serve our community.'",
      sourceIds: [S.cwaRelease, S.vergeCba],
    },
    {
      id: "claim-belief-values-in-code",
      kind: "stated_belief",
      text: "He argues values are embedded in software itself — 'the tech world doesn't acknowledge that there are values built into your apps and into software and its features' — so builders have to make those values deliberately.",
      sourceIds: [S.observer2012],
    },
    // ---- pattern ----
    {
      id: "claim-pattern-voice-for-unheard",
      kind: "pattern",
      text: "Across Expert Labs, ThinkUp, Makerbase, Glitch, and antitech, the throughline is the same move: build tools and institutions that give voice, credit, or creative power to people the tech industry usually overlooks.",
      sourceIds: [S.aaasLaunch, S.vergeMakerbase, S.techcrunchCeo, S.antitech],
    },
    {
      id: "claim-pattern-early-warning",
      kind: "pattern",
      text: "His public record functions as an early-warning system for platform harms — the Suggested User List critique, the 2012 web-loss essays, the 2021 NFT misgivings, and the 2026 open-web alarm each arrived well ahead of mainstream concern.",
      sourceIds: [S.observer2012, S.webWeLost, S.atlanticNft, S.endgame],
    },
    {
      id: "claim-pattern-culture-tech-fusion",
      kind: "pattern",
      text: "He treats popular culture and technology as one subject — Prince scholarship, a teachable-moment playlist, museum-exhibited digital art — and uses fandom as a serious analytical lens rather than a hobby.",
      sourceIds: [S.spotifyNjs, S.princeTenYears, S.techcrunchMonegraph],
    },
    {
      id: "claim-pattern-public-record",
      kind: "pattern",
      text: "His blog operates as the canonical public record of his thinking across four eras of the social web — cited, per his bio, by sitting senators, hundreds of academic papers, and TMZ — and the site's own disclaimer notes that continuous publication means old pieces may not reflect current views.",
      sourceIds: [S.about, S.dashesAbout2009, S.webWeLost],
    },
    // ---- speculation ----
    {
      id: "claim-spec-first-employee-framing",
      kind: "speculation",
      text: "The 'first employee' and 'helped start' framing rests mostly on his and Six Apart's own accounts; independent reporting confirms the hire happened in 2003, two years after the company's 2001 founding, so the exact boundary between advisor and employee is undocumented.",
      sourceIds: [S.salonSixApart, S.linkedin, S.dashesAbout2009],
    },
    {
      id: "claim-spec-nft-credit",
      kind: "speculation",
      text: "Credit for 'the first NFT' is framed differently across the record: Sotheby's names Kevin McCoy as the artist, the Webby honored both men, and Dash's own telling assigns the artwork to McCoy while he supplied the industry framing — a split the sources never fully reconcile.",
      sourceIds: [S.sothebysQuantum, S.webby2022, S.atlanticNft],
    },
    {
      id: "claim-spec-antitech-model",
      kind: "speculation",
      text: "Antitech's structure, clients, and revenue model are not yet detailed in public sources; the site's manifesto suggests a consultancy with an advocacy posture, but that reading is inference, not documentation.",
      sourceIds: [S.antitech, S.linkedin],
    },
    {
      id: "claim-spec-glitch-afterlife",
      kind: "speculation",
      text: "What survives of the Glitch community after the July 8, 2025 hosting shutdown remained unresolved at the research cutoff; Dash said future plans were still being figured out.",
      sourceIds: [S.vergeShutdown, S.glitchEnd],
    },
  ],
  timeline: [
    {
      id: "event-birth-1975",
      kind: "birth",
      date: "1975-09-05",
      title: "Born Anil Dash",
      summary:
        "Born to Odia parents who emigrated from India; raised near Harrisburg, Pennsylvania.",
      location: "Pennsylvania",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-prince-fandom",
      kind: "other",
      date: "1993",
      title: "Joins Prince's online fan communities",
      summary:
        "Participates in the early online Prince fandom — the newsgroup formed around the month of his 1993 name change, Prodigy and AOL 'Paisley Park' chats — the community that shaped his relationship to the early web.",
      sourceIds: [S.theCurrent, S.princeTenYears],
    },
    {
      id: "event-dashes-1999",
      kind: "publication",
      date: "1999",
      title: "Launches dashes.com",
      summary:
        "Starts his personal weblog while working as an independent technology consultant — one of the earliest blogs, published continuously since at anildash.com.",
      sourceIds: [S.wikipedia, S.dashesAbout2009],
    },
    {
      id: "event-village-voice",
      kind: "role",
      date: "2001",
      end: "2003",
      title: "New media developer at the Village Voice",
      organization: "Village Voice",
      location: "New York City",
      sourceIds: [S.wikipedia, S.bigThink],
    },
    {
      id: "event-pbs-media-matters",
      kind: "media",
      date: "2003",
      title: "Featured on PBS's Media Matters",
      summary: "One of four bloggers profiled on the PBS series.",
      sourceIds: [S.bigThink],
    },
    {
      id: "event-six-apart",
      kind: "role",
      date: "2003",
      end: "2009-09",
      title: "First employee of Six Apart",
      summary:
        "Hired in 2003 after the Trotts took Neoteny funding; served as VP and chief evangelist for Movable Type, TypePad, Vox, and LiveJournal.",
      organization: "Six Apart",
      sourceIds: [S.salonSixApart, S.linkedin, S.wikipedia],
    },
    {
      id: "event-mt-licensing",
      kind: "milestone",
      date: "2004-05",
      title: "Movable Type 3.0 licensing backlash",
      summary:
        "Acts as Six Apart's public responder to the pricing storm; his 'Moving Forward' post drew praise even from competitors.",
      organization: "Six Apart",
      sourceIds: [S.mullenwegMt, S.salonSixApart],
    },
    {
      id: "event-activate",
      kind: "founded",
      date: "2009",
      title: "Co-founds Activate",
      summary:
        "Strategy consulting firm for media and technology companies, co-founded with Michael J. Wolf.",
      organization: "Activate",
      sourceIds: [S.observer2012, S.wikipedia],
    },
    {
      id: "event-expert-labs",
      kind: "founded",
      date: "2009-11",
      title: "Founds Expert Labs at AAAS",
      summary:
        "Nonprofit public-technology incubator built after discussions with the White House Office of Science and Technology Policy, funded by a $500,000 MacArthur Foundation grant.",
      organization: "American Association for the Advancement of Science",
      sourceIds: [S.aaasLaunch, S.observer2009, S.expertLabsWiki],
    },
    {
      id: "event-ostp-grand-challenges",
      kind: "project",
      date: "2010-04",
      title: "White House taps Expert Labs for scientists' input",
      summary:
        "The OSTP and AAAS use Expert Labs' ThinkTank tool to gather scientists' and engineers' ideas on federal technology priorities via Facebook and Twitter.",
      organization: "White House Office of Science and Technology Policy",
      sourceIds: [S.aaasWhiteHouse],
    },
    {
      id: "event-webby-2010",
      kind: "award",
      date: "2010",
      title: "Webby honoree for dashes.com",
      summary: "Personal Blog/Website category honoree at the Webby Awards.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-web-we-lost",
      kind: "publication",
      date: "2012-12-13",
      title: "Publishes 'The Web We Lost'",
      summary:
        "The essay that fixed his reputation as the social web's in-house historian; followed days later by 'Rebuilding the Web We Lost.'",
      sourceIds: [S.webWeLost],
    },
    {
      id: "event-monegraph",
      kind: "project",
      date: "2014-05-03",
      title: "Co-creates Monegraph at Seven on Seven",
      summary:
        "With Kevin McCoy, demonstrates 'monetized graphics' at Rhizome's Seven on Seven at the New Museum, registering McCoy's 'Quantum' on the Namecoin blockchain — the prototype later recognized as the first NFT.",
      organization: "Rhizome",
      location: "New Museum, New York City",
      sourceIds: [S.techcrunchMonegraph, S.viceSevenOnSeven, S.sothebysQuantum],
    },
    {
      id: "event-purple-rain-essay",
      kind: "publication",
      date: "2014",
      title: "'I Know Times Are Changing' — Purple Rain at 30",
      summary:
        "His minute-by-minute reconstruction of how 'Purple Rain' was made, published in Medium's The Message.",
      sourceIds: [S.purpleRain30],
    },
    {
      id: "event-makerbase",
      kind: "founded",
      date: "2015-08-04",
      title: "Launches Makerbase at the White House Demo Day",
      summary:
        "The 'IMDb for apps' he co-founded with Gina Trapani debuts at the first-ever White House Demo Day.",
      organization: "Makerbase",
      sourceIds: [S.vergeMakerbase],
    },
    {
      id: "event-transformed-eyeo",
      kind: "media",
      date: "2016-06",
      title: "'#Transformed' talk at the Eyeo Festival",
      summary:
        "Delivers a tribute to Prince in Minneapolis on what would have been the musician's 58th birthday, weeks after his death — connecting Prince's technology battles to immigration and his own family's story.",
      location: "Minneapolis, Minnesota",
      sourceIds: [S.transformed],
    },
    {
      id: "event-thinkup-shuttered",
      kind: "milestone",
      date: "2016-06",
      title: "ThinkUp shuts down",
      summary:
        "The social-media analytics company he co-founded with Gina Trapani closes.",
      organization: "ThinkUp",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-fog-creek-ceo",
      kind: "role",
      date: "2016-12-06",
      title: "Named CEO of Fog Creek Software",
      summary:
        "Succeeds founder Joel Spolsky; the same announcement launches Gomix, the remixable app platform that becomes Glitch, and gives Makerbase a home.",
      organization: "Fog Creek Software",
      sourceIds: [S.joelOnCeo, S.techcrunchCeo],
    },
    {
      id: "event-glitch-launch",
      kind: "project",
      date: "2017",
      title: "Glitch launches",
      summary:
        "The friendly creative-coding community — where any app can be remixed and redeployed — launches publicly under his leadership.",
      organization: "Fog Creek Software",
      sourceIds: [S.vergeFastly],
    },
    {
      id: "event-new-jack-swing",
      kind: "media",
      date: "2018-01-04",
      title: "New Jack Swing 101 playlist with Lin-Manuel Miranda",
      summary:
        "A shared Spotify playlist built as a 'teachable moment' after Bruno Mars's 'Finesse'; one of the platform's most popular playlists of 2018.",
      sourceIds: [S.spotifyNjs, S.effBio],
    },
    {
      id: "event-glitch-rename",
      kind: "milestone",
      date: "2018-09-25",
      title: "Fog Creek becomes Glitch, Inc.",
      summary:
        "Eighteen-year-old Fog Creek Software takes the name of its flagship product after raising $30 million.",
      organization: "Glitch, Inc.",
      sourceIds: [S.fogCreekIsGlitch, S.vergeFastly],
    },
    {
      id: "event-function-podcast",
      kind: "media",
      date: "2018",
      end: "2020",
      title: "Hosts Function with Anil Dash",
      summary:
        "Twenty-five episodes on how technology's builders think about their responsibility, produced by Glitch and the Vox Media Podcast Network.",
      organization: "Glitch / Vox Media",
      sourceIds: [S.functionPodcast, S.wikipedia],
    },
    {
      id: "event-glitch-union",
      kind: "milestone",
      date: "2020-03-13",
      title: "Glitch voluntarily recognizes its workers' union",
      summary:
        "After roughly 90 percent of workers sign on, Glitch recognizes CWA Local 1101 without a fight — reported as a tech-industry first.",
      organization: "Glitch / Communications Workers of America",
      sourceIds: [S.cwaRelease],
    },
    {
      id: "event-glitch-cba",
      kind: "milestone",
      date: "2021-02-28",
      title: "First white-collar tech collective bargaining agreement",
      summary:
        "Glitch workers ratify the first CBA signed by white-collar tech workers in the US, including recall rights for the May 2020 pandemic layoffs.",
      organization: "Glitch / Communications Workers of America",
      sourceIds: [S.vergeCba],
    },
    {
      id: "event-quantum-sale",
      kind: "milestone",
      date: "2021-06-10",
      title: "Quantum sells at Sotheby's for $1.47M",
      summary:
        "The 2014 Namecoin-minted artwork anchors the Natively Digital auction — the moment the 'first NFT' framing became mainstream.",
      sourceIds: [S.sothebysQuantum, S.axiosQuantum],
    },
    {
      id: "event-nyt-prince-scholar",
      kind: "media",
      date: "2022-04-07",
      title: "New York Times calls him a 'Prince scholar'",
      summary:
        "Quoted on the discovery of the earliest known footage of Prince — the 1970 WCCO clip of the 11-year-old commenting on a teachers' strike.",
      sourceIds: [S.nytPrince],
    },
    {
      id: "event-fastly-acquires-glitch",
      kind: "milestone",
      date: "2022-05-19",
      title: "Fastly acquires Glitch",
      summary:
        "Glitch joins the cloud provider; Dash becomes Fastly's VP of developer experience, overseeing Glitch and a new developer-tools team.",
      organization: "Fastly",
      sourceIds: [S.vergeFastly, S.fastlyAcquire],
    },
    {
      id: "event-webby-lifetime",
      kind: "award",
      date: "2022-05",
      title: "Webby Lifetime Achievement Award",
      summary:
        "Shared with Kevin McCoy for the monetized-graphics groundwork behind NFTs — an honor he accepted while publicly at odds with the market it seeded.",
      sourceIds: [S.webby2022, S.atlanticNft],
    },
    {
      id: "event-glitch-hosting-end",
      kind: "milestone",
      date: "2025-07-08",
      title: "Glitch ends app hosting",
      summary:
        "App hosting and user profiles shut down; dashboards remain for exports through end of 2025. Announced by Dash in May 2025.",
      organization: "Glitch",
      sourceIds: [S.glitchEnd, S.vergeShutdown],
    },
    {
      id: "event-leaves-fastly",
      kind: "role",
      date: "2025-06",
      title: "Departs Fastly",
      summary:
        "Ends a nine-year run across Fog Creek, Glitch, and Fastly.",
      organization: "Fastly",
      sourceIds: [S.linkedin],
    },
    {
      id: "event-antitech",
      kind: "founded",
      date: "2025",
      title: "Co-founds antitech",
      summary:
        "A firm built around 'good, thoughtful technology' — 'we fight for the good internet.'",
      organization: "antitech",
      sourceIds: [S.antitech, S.dataSociety],
    },
    {
      id: "event-endgame-essay",
      kind: "publication",
      date: "2026-03-27",
      title: "Publishes 'Endgame for the Open Web'",
      summary:
        "His starkest warning yet: AI scraping, closed APIs, and abandoned norms amount to an existential attack on the open web.",
      sourceIds: [S.endgame],
    },
  ],
  themes: [
    {
      id: "theme-blogging-as-record",
      kind: "philosophy",
      status: "stated",
      title: "Blogging as a public act of record",
      summary:
        "He has published the same site since 1999 and treats it as the canonical record of his thinking — complete with a disclaimer that decades of posts may no longer reflect his views. The site is the argument: a person, not a platform, owning a body of work.",
      sourceIds: [S.about, S.dashesAbout2009, S.webWeLost],
    },
    {
      id: "theme-open-web-loss",
      kind: "philosophy",
      status: "stated",
      title: "The open web was traded away — and can be fought for",
      summary:
        "From 'The Web We Lost' (2012) through 'The Lost Infrastructure of Social Media' (2016) to 'Endgame for the Open Web' (2026), he argues the social web's centralization destroyed working open infrastructure, and that the fight over its survival is now existential.",
      sourceIds: [S.webWeLost, S.lostInfra, S.endgame],
    },
    {
      id: "theme-values-in-software",
      kind: "belief",
      status: "stated",
      title: "Values are built into software",
      summary:
        "Apps and features encode choices — about labor, inclusion, privacy, and control — whether or not makers admit it. His consistent demand is that the industry acknowledge those values and choose them deliberately.",
      sourceIds: [S.observer2012, S.about, S.effBio],
    },
    {
      id: "theme-government-listens",
      kind: "practice",
      status: "stated",
      title: "Technology that helps government listen",
      summary:
        "Expert Labs' mission inverted the usual e-government pitch: not officials broadcasting on new channels, but technology that routes public expertise into policy. 'All of us together are smarter than any one of us alone.'",
      sourceIds: [S.aaasLaunch, S.morningNews, S.observer2009],
    },
    {
      id: "theme-creator-ownership",
      kind: "belief",
      status: "stated",
      title: "Creators should own and control their work",
      summary:
        "The throughline from Monegraph to his Prince scholarship: artists deserve provenance, control, and income. He designed an early system for it in 2014 and later watched the NFT market betray that intent — and said so in The Atlantic.",
      sourceIds: [S.techcrunchMonegraph, S.viceSevenOnSeven, S.atlanticNft],
    },
    {
      id: "theme-workers-and-inclusion",
      kind: "practice",
      status: "reported",
      title: "Labor and inclusion as operating practice",
      summary:
        "Voluntary union recognition at Glitch, Makerbase's explicit crediting of women and people of color, and a career of advisory roles framed as making tech more humane — press coverage treats these as his signature operating posture.",
      sourceIds: [S.cwaRelease, S.vergeCba, S.vergeMakerbase, S.effBio],
    },
    {
      id: "theme-purple-scholarship",
      kind: "interest",
      status: "stated",
      title: "Prince as technology pioneer",
      summary:
        "His Prince scholarship centers the musician's digital life: the CD-ROM, the websites, the direct fan channels, and the ownership battles. He preserves the artifacts — the letter, the liner notes, the symbol font — as part of the art itself.",
      sourceIds: [S.theCurrent, S.transformed, S.princeTenYears],
    },
    {
      id: "theme-historian-of-social-web",
      kind: "method",
      status: "inferred",
      title: "The social web's in-house historian",
      summary:
        "Across the sources he repeatedly plays the same role — the participant who remembers what the early web actually was, marshaling Technorati, TrackBack, and TypeKey against present-tense amnesia. The index treats this role as a synthesis of his essays and the press's use of him, not his own label.",
      sourceIds: [S.webWeLost, S.lostInfra, S.observer2012, S.nytPrince],
    },
  ],
  works: [
    {
      id: "work-dashes-blog",
      kind: "other",
      status: "ongoing",
      title: "dashes.com / anildash.com",
      date: "1999",
      summary:
        "His personal weblog, published continuously since 1999 — one of the earliest blogs and the through-line for everything else he does.",
      sourceIds: [S.wikipedia, S.dashesAbout2009, S.about],
    },
    {
      id: "work-expert-labs",
      kind: "project",
      status: "completed",
      title: "Expert Labs",
      date: "2009-11",
      summary:
        "Nonprofit public-technology incubator at AAAS, founded with MacArthur Foundation backing after discussions with the White House OSTP.",
      sourceIds: [S.aaasLaunch, S.expertLabsWiki],
    },
    {
      id: "work-activate",
      kind: "project",
      status: "completed",
      title: "Activate",
      date: "2009",
      summary:
        "Media and technology strategy consulting firm co-founded with Michael J. Wolf.",
      sourceIds: [S.observer2012, S.wikipedia],
    },
    {
      id: "work-thinkup",
      kind: "product",
      status: "abandoned",
      title: "ThinkUp",
      date: "2009",
      summary:
        "Open-source social-media analytics tool begun by Gina Trapani inside Expert Labs and spun into a company co-founded by Trapani and Dash; used by the Obama White House; shuttered June 2016.",
      sourceIds: [S.thinkUpDocs, S.wikipedia],
    },
    {
      id: "work-monegraph",
      kind: "product",
      status: "released",
      title: "Monegraph ('monetized graphics')",
      date: "2014-05-03",
      summary:
        "Prototype built with Kevin McCoy at Rhizome's Seven on Seven for registering digital artworks on a blockchain — the system now credited as the first NFT implementation.",
      sourceIds: [S.techcrunchMonegraph, S.viceSevenOnSeven, S.webby2022],
    },
    {
      id: "work-makerbase",
      kind: "product",
      status: "completed",
      title: "Makerbase",
      date: "2015-08-04",
      summary:
        "Directory of digital projects and the people who made them — 'an IMDb for apps' — launched with Gina Trapani at the first White House Demo Day and later housed at Fog Creek.",
      sourceIds: [S.vergeMakerbase, S.joelOnCeo],
    },
    {
      id: "work-glitch",
      kind: "product",
      status: "released",
      title: "Glitch",
      date: "2017",
      summary:
        "The friendly creative-coding community where any app can be remixed and redeployed; led as CEO through the 2018 rename, the 2020-21 union milestones, and the 2022 Fastly acquisition. App hosting ended July 8, 2025.",
      sourceIds: [S.vergeFastly, S.fogCreekIsGlitch, S.glitchEnd],
    },
    {
      id: "work-function",
      kind: "recording",
      status: "completed",
      title: "Function with Anil Dash",
      date: "2018",
      summary:
        "Twenty-five-episode podcast on technology's effects on culture, produced by Glitch and the Vox Media Podcast Network (2018-2020).",
      sourceIds: [S.functionPodcast],
    },
    {
      id: "work-antitech",
      kind: "project",
      status: "ongoing",
      title: "antitech",
      date: "2025",
      summary:
        "The firm he co-founded after leaving Fastly — 'we help organizations thrive by building good, thoughtful technology.'",
      sourceIds: [S.antitech, S.dataSociety],
    },
    {
      id: "work-web-we-lost",
      kind: "other",
      status: "published",
      title: "The Web We Lost",
      date: "2012-12-13",
      summary:
        "His best-known essay: an itemized account of the open values — self-owned identity, interoperability, portability, pseudonymity — the social web traded away.",
      sourceIds: [S.webWeLost],
    },
    {
      id: "work-lost-infrastructure",
      kind: "other",
      status: "published",
      title: "The Lost Infrastructure of Social Media",
      date: "2016-08",
      summary:
        "The companion essay cataloging the blogosphere's vanished shared infrastructure — search, trackbacks, RSS, blogrolls — and arguing its ideas deserve revival.",
      sourceIds: [S.lostInfra],
    },
    {
      id: "work-endgame",
      kind: "other",
      status: "published",
      title: "Endgame for the Open Web",
      date: "2026-03-27",
      summary:
        "His 2026 warning that AI scraping, closed APIs, and abandoned shared norms have brought the open web to an existential fight.",
      sourceIds: [S.endgame],
    },
    {
      id: "work-i-know-times",
      kind: "other",
      status: "published",
      title: "I Know Times Are Changing",
      date: "2014",
      summary:
        "Minute-by-minute reconstruction of how 'Purple Rain' was made, written for the song's 30th anniversary in Medium's The Message.",
      sourceIds: [S.purpleRain30],
    },
    {
      id: "work-transformed-talk",
      kind: "other",
      status: "completed",
      title: "'#Transformed' (Eyeo Festival talk)",
      date: "2016-06",
      summary:
        "The Prince tribute he delivered in Minneapolis on what would have been Prince's 58th birthday — part scholarship, part family history of immigration.",
      sourceIds: [S.transformed],
    },
    {
      id: "work-new-jack-swing",
      kind: "recording",
      status: "released",
      title: "New Jack Swing 101 (with Lin-Manuel Miranda)",
      date: "2018-01-04",
      summary:
        "The Spotify playlist built as a teachable moment after Bruno Mars's 'Finesse'; described in his bios as one of the platform's most popular playlists of 2018.",
      sourceIds: [S.spotifyNjs, S.effBio],
    },
    {
      id: "work-prince-online-museum",
      kind: "project",
      status: "completed",
      title: "Prince Online Museum (collaborator)",
      date: "2016",
      summary:
        "An archive of Prince's many websites and digital works, built with the webmasters who ran them; his preserved copies of the 1993 liner-notes draft and 1996 'Message from the Artist' letter are among its artifacts.",
      sourceIds: [S.princeTenYears],
    },
  ],
  appearances: [
    {
      id: "appearance-function",
      title: "Function with Anil Dash",
      venue: "Glitch / Vox Media Podcast Network",
      publishedAt: "2018",
      participants: ["Anil Dash"],
      summary:
        "His own interview podcast: twenty-five episodes with developers, designers, and culture experts on how tech is changing culture.",
      media: [
        {
          type: "audio",
          url: "https://podcasts.apple.com/us/podcast/function-with-anil-dash/id1439658455",
          sourceId: S.functionPodcast,
        },
      ],
      sourceIds: [S.functionPodcast],
    },
    {
      id: "appearance-the-current",
      title: "Anil Dash on Prince's secret life as a computer nerd",
      venue: "The Current (Minnesota Public Radio)",
      publishedAt: "2016-06-29",
      participants: ["Anil Dash"],
      summary:
        "On Prince as an early adopter — and on his own record inside the Prince fan communities that taught him the early web.",
      media: [
        {
          type: "article",
          url: "https://www.thecurrent.org/feature/2016/06/29/anil-dash-on-princes-secret-life-as-a-computer-nerd",
          sourceId: S.theCurrent,
        },
      ],
      sourceIds: [S.theCurrent],
    },
    {
      id: "appearance-morning-news",
      title: "Anil Dash",
      venue: "The Morning News",
      participants: ["Anil Dash"],
      summary:
        "Q&A on how Expert Labs came together — Peer to Patent, the MacArthur grant, AAAS — and what it was for.",
      media: [
        {
          type: "article",
          url: "https://themorningnews.org/anil-dash/",
          sourceId: S.morningNews,
        },
      ],
      sourceIds: [S.morningNews],
    },
    {
      id: "appearance-observer-2009",
      title: "Dash to D.C.! Tech Guru Will Head Gov't Incubator, Digitize Democracy",
      venue: "Observer",
      publishedAt: "2009-11",
      participants: ["Anil Dash"],
      summary:
        "Interview and profile on the move from Six Apart's chief evangelist to Washington's Expert Labs.",
      sourceIds: [S.observer2009],
    },
    {
      id: "appearance-observer-2012",
      title: "Tech Insurgents 2012: Anil Dash",
      venue: "Observer",
      publishedAt: "2012-11",
      participants: ["Anil Dash"],
      summary:
        "Profile on the Activate-and-ThinkUp years, anchored by his argument that values are built into software.",
      sourceIds: [S.observer2012],
    },
    {
      id: "appearance-transformed-eyeo",
      title: "'I Am #Transformed' at the Eyeo Festival",
      venue: "Eyeo Festival, Minneapolis",
      publishedAt: "2016-06",
      participants: ["Anil Dash"],
      summary:
        "The one-time talk — documented with sources and errata on Medium — connecting Prince's artistry, technology fights, and his own family's immigrant history.",
      media: [
        {
          type: "article",
          url: "https://medium.com/@anildash/prince-transformed-eab793c75757",
          sourceId: S.transformed,
        },
      ],
      sourceIds: [S.transformed],
    },
    {
      id: "appearance-pbs-media-matters",
      title: "PBS Media Matters feature",
      venue: "PBS",
      publishedAt: "2003",
      participants: ["Anil Dash"],
      summary:
        "One of four bloggers profiled on the public-broadcasting series, early in the Six Apart years.",
      sourceIds: [S.bigThink],
    },
    {
      id: "appearance-official-prince-podcast",
      title: "Guest on the official Prince podcast",
      venue: "Prince official podcast",
      participants: ["Anil Dash"],
      summary:
        "Discussed Prince's history of technological innovation — an appearance he calls, with the NYT 'Prince scholar' citation, the pinnacle of legitimacy for his life as a Prince fan.",
      sourceIds: [S.princeTenYears],
    },
    {
      id: "appearance-big-think",
      title: "Big Think interview",
      venue: "Big Think",
      participants: ["Anil Dash"],
      summary:
        "Video interview from the Expert Labs period covering blogging, government listening, and the tech-policy gap.",
      sourceIds: [S.bigThink],
    },
  ],
  relations: [
    {
      id: "rel-six-apart",
      kind: "employed_by",
      target: "six-apart",
      targetName: "Six Apart",
      targetKind: "organization",
      note:
        "Its first employee, hired in 2003, and later VP and chief evangelist through September 2009 — the Movable Type and TypePad company.",
      sourceIds: [S.salonSixApart, S.linkedin, S.dashesAbout2009],
    },
    {
      id: "rel-glitch",
      kind: "employed_by",
      target: "glitch",
      targetName: "Glitch",
      targetKind: "organization",
      note:
        "Named CEO of Fog Creek Software on December 6, 2016, succeeding Joel Spolsky; renamed the company Glitch, Inc. in 2018 and led it through the Fastly acquisition in May 2022.",
      sourceIds: [S.joelOnCeo, S.techcrunchCeo, S.fogCreekIsGlitch, S.linkedin],
    },
    {
      id: "rel-fastly",
      kind: "employed_by",
      target: "fastly",
      targetName: "Fastly",
      targetKind: "organization",
      note:
        "Vice president of developer experience from the May 2022 Glitch acquisition until June 2025.",
      sourceIds: [S.vergeFastly, S.fastlyAcquire, S.linkedin],
    },
    {
      id: "rel-expert-labs",
      kind: "founded",
      target: "expert-labs",
      targetName: "Expert Labs",
      targetKind: "organization",
      note:
        "Founding director of the AAAS-based civic-technology incubator launched November 2009 with a $500,000 MacArthur grant, after White House OSTP discussions.",
      sourceIds: [S.aaasLaunch, S.expertLabsWiki, S.observer2009],
    },
    {
      id: "rel-activate",
      kind: "founded",
      target: "activate",
      targetName: "Activate",
      targetKind: "organization",
      note:
        "Co-founded the media and technology strategy consulting firm in 2009 with Michael J. Wolf; served as partner and later managing director.",
      sourceIds: [S.observer2012, S.wikipedia, S.bigThink],
    },
    {
      id: "rel-thinkup",
      kind: "founded",
      target: "thinkup",
      targetName: "ThinkUp",
      targetKind: "organization",
      note:
        "Co-founded the social-media analytics company with Gina Trapani; the project began at Expert Labs in 2009, was used by the Obama White House, and shuttered in June 2016.",
      sourceIds: [S.thinkUpDocs, S.wikipedia, S.linkedin],
    },
    {
      id: "rel-makerbase",
      kind: "founded",
      target: "makerbase",
      targetName: "Makerbase",
      targetKind: "organization",
      note:
        "Co-founded the 'IMDb for apps' with Gina Trapani; launched August 4, 2015 at the first White House Demo Day and later found a home at Fog Creek.",
      sourceIds: [S.vergeMakerbase, S.joelOnCeo, S.linkedin],
    },
    {
      id: "rel-antitech",
      kind: "founded",
      target: "antitech",
      targetName: "antitech",
      targetKind: "organization",
      note:
        "Co-founded the firm (anti.tech) in 2025 after leaving Fastly; he is principal and cofounder.",
      sourceIds: [S.antitech, S.dataSociety, S.linkedin],
    },
    {
      id: "rel-gina-trapani",
      kind: "cofounder",
      target: "gina-trapani",
      targetName: "Gina Trapani",
      note:
        "Co-founded the ThinkUp company and Makerbase with her; she began ThinkUp as an Expert Labs project in 2009.",
      sourceIds: [S.thinkUpDocs, S.vergeMakerbase],
    },
    {
      id: "rel-michael-j-wolf",
      kind: "cofounder",
      target: "michael-j-wolf",
      targetName: "Michael J. Wolf",
      note: "Co-founded Activate with him in 2009.",
      sourceIds: [S.observer2012, S.wikipedia],
    },
    {
      id: "rel-kevin-mccoy",
      kind: "collaborated",
      target: "kevin-mccoy",
      targetName: "Kevin McCoy",
      note:
        "Co-built Monegraph — the monetized-graphics prototype now recognized as the first NFT — at Rhizome's Seven on Seven on May 3, 2014; they shared the 2022 Webby Lifetime Achievement Award.",
      sourceIds: [S.techcrunchMonegraph, S.viceSevenOnSeven, S.atlanticNft, S.webby2022],
    },
    {
      id: "rel-lin-manuel-miranda",
      kind: "collaborated",
      target: "lin-manuel-miranda",
      targetName: "Lin-Manuel Miranda",
      note:
        "Built the 'New Jack Swing 101' Spotify playlist with him in January 2018 after Bruno Mars's 'Finesse' video.",
      sourceIds: [S.spotifyNjs],
    },
    {
      id: "rel-eff",
      kind: "other",
      target: "electronic-frontier-foundation",
      targetName: "Electronic Frontier Foundation",
      targetKind: "organization",
      note: "Board member since 2022.",
      sourceIds: [S.about, S.effBio],
    },
    {
      id: "rel-stack-overflow",
      kind: "other",
      target: "stack-overflow",
      targetName: "Stack Overflow",
      targetKind: "organization",
      note: "Board member 2012–2022.",
      sourceIds: [S.about, S.linkedin],
    },
    {
      id: "rel-obama-foundation",
      kind: "other",
      target: "obama-foundation",
      targetName: "Obama Foundation",
      targetKind: "organization",
      note:
        "Technology advisor to the Obama White House's Office of Digital Strategy (2012–2023); later co-chaired the Foundation's Digital & Technology Advisory Council.",
      sourceIds: [S.about, S.effBio, S.linkedin],
    },
    {
      id: "rel-the-markup",
      kind: "other",
      target: "the-markup",
      targetName: "The Markup",
      targetKind: "organization",
      note: "Board seat listed on his employment record and affiliations.",
      sourceIds: [S.linkedin, S.about],
    },
  ],
  openQuestions: [
    "The exact boundary of the Six Apart start is undocumented: LinkedIn lists April 2003, Salon confirms 'in 2003' after the Neoteny funding, and his own bios say he 'helped start' a company founded in 2001 — whether he advised before payroll is unresolved.",
    "His Fog Creek start is dated December 6, 2016 by the announcement but October 2016 on LinkedIn; an advisory-to-CEO transition is plausible but not in the public record.",
    "Expert Labs has no documented end date; the ThinkUp company absorbed its work by roughly 2012, but no closure announcement exists in the cited sources.",
    "Credit for 'the first NFT' is framed differently across the record: Sotheby's names McCoy the artist, the Webby honored both men, and Dash's own account gives McCoy the artwork while he supplied the industry framing.",
    "Antitech's clients, structure, and revenue model are not yet publicly documented as of the research cutoff.",
    "What persists of the Glitch community after the July 8, 2025 hosting shutdown — and who owns it after Dash's June 2025 departure — was undecided in the record.",
    "The Vanity Fair '(Twitter) Famous' profile of November 10, 2014, cited by Wikipedia, has no stable live URL in this catalog.",
    "His early Prince-fan history — the AIM chats with Prince, the fan-site era — is self-reported; the NYT 'Prince scholar' label is corroborating press, not independent verification of the details.",
  ],
  body: `Anil Dash has been writing the same website since 1999. That fact — a personal weblog started while he was an independent technology consultant and still publishing as anildash.com — is the spine everything else hangs on. He is the person the tech industry calls when it needs someone who was actually there: first employee of Six Apart, the company whose Movable Type and TypePad professionalized blogging; founder of the White House-adjacent Expert Labs; co-creator of the artifact now recognized as the first NFT; the CEO who turned Fog Creek Software into Glitch, voluntarily recognized a union, and sold the company to Fastly; and, improbably, the New York Times's go-to "Prince scholar."

## The blogger

Born September 5, 1975 to Odia parents who had emigrated from India, Dash grew up near Harrisburg, Pennsylvania. In his telling to Minnesota Public Radio's The Current, he dropped out of college because the early web — and specifically the Prince fan community forming on newsgroups, Prodigy, and AOL around 1993 — was more compelling. His bios have never bothered to polish that: "never graduated from college" is a fixed line. After two years as a new media developer at the Village Voice (2001-2003), he was hired in 2003 as the first employee of Six Apart, the Trotts' San Mateo startup behind Movable Type, TypePad, and later Vox and LiveJournal. As vice president and chief evangelist until 2009 he was the public voice of the professional-blogging era — the man in the comments during the May 2004 Movable Type 3.0 licensing revolt, whose "Moving Forward" post even competitor-to-be Matt Mullenweg praised for its honesty.

## The civic turn

In late 2009 he pivoted from selling blogging to wiring it into government. Expert Labs, launched that November inside the American Association for the Advancement of Science with a $500,000 MacArthur Foundation grant, grew out of discussions with the Obama White House's Office of Science and Technology Policy. The pitch, in his words to AAAS, was inversion: lots of attention went to how government uses technology to *talk* to citizens; Expert Labs would build "technology that helps government *listen* to citizens." By April 2010 it was running the OSTP's call for scientists' input on federal technology priorities through ThinkTank, the open-source tool Gina Trapani had built inside the project. ThinkTank became ThinkUp — a social-media analytics company Dash and Trapani co-founded, used by the Obama White House, and shuttered in June 2016. In parallel he co-founded Activate, a media-and-technology strategy consultancy, with Michael J. Wolf in 2009, and spent the decade as a technology advisor to the White House Office of Digital Strategy (2012-2023), later co-chairing the Obama Foundation's digital advisory council.

## The builder years

Two 2014-2015 artifacts define his maker record. At Rhizome's Seven on Seven hackathon at the New Museum on May 3, 2014, he and artist Kevin McCoy demonstrated "monetized graphics" — registering McCoy's animation *Quantum* on the Namecoin blockchain to prove a digital artwork could have provenance. Dash bought the first one for the four dollars in his pocket, Vice reported. That prototype, Monegraph, is now widely credited as the first NFT; *Quantum* sold at Sotheby's for $1.47 million in June 2021, and the Webby Awards gave both men a 2022 Lifetime Achievement award for the groundwork. The twist is that Dash had already publicly disowned the market it seeded — his Atlantic essay "NFTs Were Supposed to Protect Artists. They Don't." explains the intent was artist control, not speculation. With Trapani he also built Makerbase, an "IMDb for apps" crediting the people behind digital projects — explicitly including women and people of color — launched August 4, 2015 at the first White House Demo Day.

## Glitch

In December 2016 Joel Spolsky handed him the CEO job at Fog Creek Software — the seventeen-year-old incubator behind Stack Overflow (whose board Dash sat on from 2012 to 2022) and Trello. The same announcement launched Gomix, the remixable app platform that became Glitch. He renamed the company Glitch, Inc. in September 2018, raised $30 million, grew it to roughly 1.8 million monthly users, and in March 2020 did something no tech startup had done: voluntarily recognized his workers' union (CWA Local 1101) rather than fight it. The collective bargaining agreement signed in February 2021 was the first by white-collar tech workers in the US. Fastly acquired Glitch on May 19, 2022; Dash became VP of developer experience. The coda is bittersweet: as CEO he announced in May 2025 that Glitch would end app hosting on July 8, 2025, and he left Fastly that June. He has since co-founded antitech, a firm promising to help organizations build "good, thoughtful technology."

## The purple scholar

Running underneath the whole career is a second life. Dash has been inside Prince's online fandom since the early 1990s — he says he traded AIM chats with the man himself — and after Prince's 2016 death he became a public steward of that legacy: the "#Transformed" Eyeo talk on Prince's 58th birthday, the Prince Online Museum built with the artist's former webmasters, the rescued 1993 liner-notes draft and 1996 "Message from the Artist" letter, the symbol-font floppy recovered with Adafruit, and a guest spot on the official Prince podcast. The New York Times called him a "Prince scholar" in 2022. He and Lin-Manuel Miranda also built the "New Jack Swing 101" Spotify playlist in January 2018 — one of the platform's most popular that year.

## What he argues

The beliefs are consistent enough to read as one position. Values are embedded in software, so builders are accountable for them (Observer, 2012). The social web traded away self-owned identity, interoperability, portability, and pseudonymity for billion-scale networks — a loss he itemized in "The Web We Lost" (2012) and "The Lost Infrastructure of Social Media" (2016), while insisting the pendulum swings back. Government's job is to listen (Expert Labs). Creators deserve ownership and control (Monegraph; Prince). Workers deserve a union if they want one (Glitch). And in "Endgame for the Open Web" (March 2026) he argues the attack has gone existential — AI scraping without consent, closed APIs, dead norms like robots.txt — and that 2026 may decide whether the open web survives at all.

## What the record does not settle

The seams are preserved above: the "first employee" framing versus a 2003 hire into a 2001 company; the October-versus-December 2016 Fog Creek start; Expert Labs' undated wind-down; the uneven public credit split on the first NFT; antitech's undocumented model; and Glitch's unresolved afterlife. His early Prince-fan history is self-reported, and one much-cited Vanity Fair profile has no stable URL. None of this changes the throughline — a blogger who kept his own domain while helping build, and then critique, nearly every era of the social web.

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
