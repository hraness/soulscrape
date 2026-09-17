#!/usr/bin/env bun
/** Generate examples/people/george-hotz/person-index.json with derived source ids. */

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

const ACCESSED = "2026-09-16T00:00:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- Subject-controlled and first-person sources ---

const geohotcom = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "geohot's home on the internet",
  url: "https://geohot.com",
  publisher: "geohot.com",
  notes:
    "Hotz's personal homepage; links his startups, blog, Instagram, and SoundCloud, lists paid consulting, and carries a standing 'declaration to future AI'.",
});
const blogIndex = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "the singularity is nearer — geohot's blog",
  url: "https://geohot.github.io/blog/",
  publisher: "geohot.github.io",
});
const heroesJourney = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Hero's Journey",
  url: "https://geohot.github.io/blog/jekyll/update/2022/10/29/the-heroes-journey.html",
  publisher: "geohot.github.io",
  publishedAt: "2022-10-29",
  notes:
    "Hotz's own post announcing he is 'taking some time away from comma'; the source behind the October 2022 step-down coverage.",
});
const tinyRaise = source({
  binding: "first_person",
  mediaType: "article",
  title: "the tiny corp raised $5.1M",
  url: "https://geohot.github.io/blog/jekyll/update/2023/05/24/the-tiny-corp-raised-5M.html",
  publisher: "geohot.github.io",
  publishedAt: "2023-05-24",
});
const commaai = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "comma.ai — make driving chill",
  url: "https://comma.ai/",
  publisher: "comma.ai",
});
const commaShop = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "comma.ai shop",
  url: "https://comma.ai/shop",
  publisher: "comma.ai",
  notes:
    "Live product catalog: comma four at $999, chestnut GPU-over-USB accessory, harnesses, and the $500k custom-car-port service.",
});
const commaFour = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Introducing the comma four",
  url: "https://blog.comma.ai/comma-four/",
  publisher: "comma.ai blog",
  publishedAt: "2025-11-25",
});
const commaBody = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Launching the comma body",
  url: "https://blog.comma.ai/commabody/",
  publisher: "comma.ai blog",
  publishedAt: "2022-05-04",
  notes:
    "Announces the comma body robot devkit and the widened mission: 'Solve AI while delivering shippable intermediaries.'",
});
const firstLawsuit = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Patent Trolls Inbound: Our First Lawsuit",
  url: "https://blog.comma.ai/ourfirstlawsuit/",
  publisher: "comma.ai blog",
  publishedAt: "2022-08-24",
  notes:
    "Written in Hotz's voice: 'I'm willing to lose $1M before I give him $10k' on fighting Sucxess LLC rather than settling.",
});
const commaThreePR = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "comma three Press Release",
  url: "https://blog.comma.ai/comma-three-press-release/",
  publisher: "comma.ai blog",
  publishedAt: "2021-07",
});
const comma3X = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Introducing the comma 3X",
  url: "https://blog.comma.ai/comma3X/",
  publisher: "comma.ai blog",
  publishedAt: "2023-10-12",
});
const tinygradOrg = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "tinygrad",
  url: "https://tinygrad.org",
  publisher: "tiny corp",
  notes:
    "The tiny corp's site: the tinygrad framework, hiring via paid bounties, and the tinybox product line including a ~1-exaflop 'exabox' preorder for 2027.",
});
const openpilotRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "commaai/openpilot",
  url: "https://github.com/commaai/openpilot",
  publisher: "GitHub",
  notes: "The openpilot repository: ~64k stars and ~11k forks as of September 2026.",
});
const tinygradRepo = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "tinygrad/tinygrad",
  url: "https://github.com/tinygrad/tinygrad",
  publisher: "GitHub",
  notes:
    "The tinygrad repository: a compact neural-network framework; ~33k stars as of September 2026.",
});
const geohotGithub = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "geohot (George Hotz) — GitHub",
  url: "https://github.com/geohot",
  publisher: "GitHub",
});

// --- Reference ---

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "George Hotz (Q370733)",
  url: "https://www.wikidata.org/wiki/Q370733",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "George Hotz",
  url: "https://en.wikipedia.org/wiki/George_Hotz",
  publisher: "Wikipedia",
  notes: "Used for orientation and dates; individual claims cross-checked against reporting.",
});
const openpilotWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Openpilot",
  url: "https://en.wikipedia.org/wiki/Openpilot",
  publisher: "Wikipedia",
});
const sonyWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Sony Computer Entertainment America, Inc. v. Hotz",
  url: "https://en.wikipedia.org/wiki/Sony_Computer_Entertainment_America_v._George_Hotz",
  publisher: "Wikipedia",
});

// --- iPhone unlock era (2007) ---

const nyt = source({
  binding: "reporting",
  mediaType: "article",
  title: "With Software and Soldering, a Non-AT&T iPhone",
  url: "https://www.nytimes.com/2007/08/25/technology/25iphone.html",
  publisher: "The New York Times",
  publishedAt: "2007-08-25",
  authors: ["Brad Stone", "John Biggs"],
});
const npr = source({
  binding: "reporting",
  mediaType: "article",
  title: "New Jersey Teen Says He Hacked iPhone",
  url: "https://www.npr.org/2007/08/24/13935744/new-jersey-teen-says-he-hacked-iphone",
  publisher: "NPR",
  publishedAt: "2007-08-24",
  notes: "Includes interview audio with the 17-year-old Hotz.",
});
const engadget350z = source({
  binding: "reporting",
  mediaType: "article",
  title: "NJ teen trades his unlocked iPhone for three more and a sports car",
  url: "https://www.engadget.com/2007-08-27-nj-teen-trades-his-unlocked-iphone-for-three-more-and-a-sports-c.html",
  publisher: "Engadget",
  publishedAt: "2007-08-27",
});

// --- PS3 era (2010-2011) ---

const bbcPs3 = source({
  binding: "interview",
  mediaType: "article",
  title: "PlayStation 3 'hacked' by iPhone cracker",
  url: "http://news.bbc.co.uk/1/hi/technology/8478764.stm",
  publisher: "BBC News",
  publishedAt: "2010-01-25",
});
const registerPs3 = source({
  binding: "interview",
  mediaType: "article",
  title: "Once impenetrable PS3 cracked wide open",
  url: "https://www.theregister.com/on-prem/2010/01/25/once-impenetrable-ps3-cracked-wide-open/1376601",
  publisher: "The Register",
  publishedAt: "2010-01-25",
  authors: ["Dan Goodin"],
});
const arsOtherOs = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hacker vows to fight Sony's PS3 update, restore Linux",
  url: "https://arstechnica.com/gaming/2010/03/hacker-vows-to-fight-sony-ps3-update-restore-linux-support/",
  publisher: "Ars Technica",
  publishedAt: "2010-03",
});
const wiredSettle = source({
  binding: "reporting",
  mediaType: "article",
  title: "Sony Settles PlayStation Hacking Lawsuit",
  url: "https://www.wired.com/2011/04/sony-settles-ps3-lawsuit/",
  publisher: "Wired",
  publishedAt: "2011-04-11",
  authors: ["David Kravets"],
});
const bbcSettle = source({
  binding: "reporting",
  mediaType: "article",
  title: "Sony and Hotz settle hacking case",
  url: "https://www.bbc.co.uk/news/technology-13047725",
  publisher: "BBC News",
  publishedAt: "2011-04-11",
});
const effJudgment = source({
  binding: "primary_record",
  mediaType: "pdf",
  title:
    "SCEA v. Hotz — Final Judgment Upon Consent and Permanent Injunction (3:11-cv-00167, N.D. Cal.)",
  url: "https://www.eff.org/files/geohotz-finaljudgmentpi.pdf",
  publisher: "Electronic Frontier Foundation (case document)",
  publishedAt: "2011-04",
});
const recapDocket = source({
  binding: "archive",
  mediaType: "webpage",
  title:
    "Sony Computer Entertainment America LLC v. Hotz et al — case docket (RECAP/Internet Archive)",
  url: "https://ia601307.us.archive.org/29/items/gov.uscourts.cand.235965/gov.uscourts.cand.235965.docket.html",
  publisher: "Internet Archive RECAP",
  notes:
    "Archived PACER docket for 3:11-cv-00167: complaint filed 2011-01-11, case terminated 2011-04-12.",
});
const vergeRap = source({
  binding: "reporting",
  mediaType: "article",
  title: "Legendary hacker Geohot busts rhymes instead of code",
  url: "https://www.theverge.com/2013/12/23/5237674/george-hotz-geohot-tomcr00se-soundcloud-rap",
  publisher: "The Verge",
  publishedAt: "2013-12-23",
});

// --- comma.ai era ---

const bloomberg = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "The First Person to Hack the iPhone Built a Self-Driving Car. In His Garage",
  url: "https://www.bloomberg.com/features/2015-george-hotz-self-driving-car/",
  publisher: "Bloomberg Businessweek",
  publishedAt: "2015-12-16",
  authors: ["Ashlee Vance"],
});
const electrek = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Elon Musk offered a 'multimillion-dollar bonus' for Geohot to build a 'Mobileye crushing' Autopilot system for Tesla",
  url: "https://electrek.co/2015/12/16/elon-musk-offered-a-multimillion-dollar-bonus-for-geohot-to-build-a-mobileye-crushing-autopilot-system-for-tesla/",
  publisher: "Electrek",
  publishedAt: "2015-12-16",
  authors: ["Fred Lambert"],
});
const vergeTesla = source({
  binding: "reporting",
  mediaType: "article",
  title: "Elon Musk says George Hotz's self-driving car technology isn't a threat",
  url: "https://www.theverge.com/2015/12/17/10374422/elon-musk-george-hotz-self-driving-car-tech-criticism",
  publisher: "The Verge",
  publishedAt: "2015-12-17",
});
const cdixon = source({
  binding: "reporting",
  mediaType: "article",
  title: "Comma.ai",
  url: "https://cdixon.org/2016/04/02/comma-ai/",
  publisher: "cdixon.org",
  publishedAt: "2016-04-02",
  authors: ["Chris Dixon"],
  notes: "The investor's own announcement that a16z led a $3.1M round in comma.ai.",
});
const tcCommaOne = source({
  binding: "reporting",
  mediaType: "video",
  title: "George 'Geohot' Hotz Presents the Comma One",
  url: "https://techcrunch.com/video/george-geohot-hotz-presents-the-comma-one/",
  publisher: "TechCrunch",
  publishedAt: "2016-09-13",
});
const tcCancel = source({
  binding: "reporting",
  mediaType: "article",
  title: "Comma.ai cancels the Comma One following NHTSA letter",
  url: "https://techcrunch.com/2016/10/28/comma-ai-cancels-the-comma-one-following-nhtsa-letter/",
  publisher: "TechCrunch",
  publishedAt: "2016-10-28",
  authors: ["Darrell Etherington"],
});
const mittr = source({
  binding: "reporting",
  mediaType: "article",
  title: "Regulators Question Plug-and-Play Car Autonomy",
  url: "https://www.technologyreview.com/2016/10/28/6518/regulators-question-plug-and-play-car-autonomy/",
  publisher: "MIT Technology Review",
  publishedAt: "2016-10-28",
});
const arsOpenpilot = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "After mothballing Comma One, George Hotz releases free autonomous car software",
  url: "https://arstechnica.com/cars/2016/11/after-mothballing-comma-one-george-hotz-releases-free-autonomous-car-software/",
  publisher: "Ars Technica",
  publishedAt: "2016-11-30",
});
const vergeGarage = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Inside Comma.ai's garage: Warren G, Drake quotes, and a message to Elon Musk",
  url: "https://www.theverge.com/2016/12/1/13801728/george-hotz-comma-ai-self-driving-car-technology-presentation",
  publisher: "The Verge",
  publishedAt: "2016-12-01",
});
const tcCeo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Comma.ai's George Hotz ousts George Hotz as CEO",
  url: "https://techcrunch.com/2018/09/11/comma-ais-george-hotz-ousts-george-hotz-as-ceo/",
  publisher: "TechCrunch",
  publishedAt: "2018-09-11",
  authors: ["Kirsten Korosec"],
});
const crArticle = source({
  binding: "reporting",
  mediaType: "article",
  title: "Cadillac's Super Cruise Outperforms Other ADAS",
  url: "https://www.consumerreports.org/cars/car-safety/cadillac-super-cruise-outperforms-other-active-driving-assistance-systems-a1113486809/",
  publisher: "Consumer Reports",
  publishedAt: "2020-10-28",
});
const crPdf = source({
  binding: "primary_record",
  mediaType: "pdf",
  title: "Active Driving Assistance Systems — November 16, 2020",
  url: "https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf",
  publisher: "Consumer Reports",
  publishedAt: "2020-11",
  notes:
    "CR's 2020 ratings report: the comma two running openpilot — the only aftermarket system tested — placed first overall, ahead of GM Super Cruise and Tesla Autopilot.",
});
const vergeStepdown = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "George Hotz, iPhone hacker and Elon Musk antagonist, is leaving Comma AI",
  url: "https://www.theverge.com/2022/10/31/23433110/george-hotz-comma-ai-step-down-driver-assist",
  publisher: "The Verge",
  publishedAt: "2022-10-31",
});
const tcLeaving = source({
  binding: "reporting",
  mediaType: "article",
  title: "George Hotz, aka 'geohot,' is leaving Comma.ai for a lofty AI project",
  url: "https://techcrunch.com/2022/11/02/george-hotz-aka-geohot-is-leaving-comma-ai-for-a-lofty-ai-project/",
  publisher: "TechCrunch",
  publishedAt: "2022-11-02",
  authors: ["Kirsten Korosec"],
});
const vergeTwitter = source({
  binding: "reporting",
  mediaType: "article",
  title: "Geohot resigns from Twitter",
  url: "https://www.theverge.com/2022/12/20/23519922/george-hotz-geohot-twitter-internship-resigns",
  publisher: "The Verge",
  publishedAt: "2022-12-20",
});
const sdbj = source({
  binding: "reporting",
  mediaType: "article",
  title: "Comma.ai Rolls Out New, More Compact Hardware",
  url: "https://sdbj.com/automotive/comma-ai-rolls-out-new-more-compact-hardware/",
  publisher: "San Diego Business Journal",
  notes:
    "Covers COMMA_CON 2025, the comma four, and reports Hotz's mid-2025 claim of a $1B valuation; comma.ai did not respond to the paper's inquiries.",
});
const wccftech = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Comma.ai President Says Tesla FSD v13 Is 'Really Good,' Declares 'We Are Buying NVIDIA'",
  url: "https://wccftech.com/comma-ai-president-says-tesla-fsd-v13-is-really-good-declares-we-are-buying-nvidia-hardware-as-no-one-at-comma-wants-to-deal-with-amd/",
  publisher: "Wccftech",
  publishedAt: "2025-01",
  notes: "Quotes Hotz's January 2025 posts as comma.ai president.",
});
const linkedinFour = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Who is buying a comma four this Black Friday? (LinkedIn post)",
  url: "https://www.linkedin.com/posts/george-hotz-b3866476_who-is-buying-a-comma-four-this-black-friday-activity-7399922756248719360",
  publisher: "LinkedIn",
  publishedAt: "2025-11-27",
  notes:
    "Hotz promoting comma four; his profile byline lists 'Founder at the tiny corp' as current and the comma.ai roles as previous.",
});

// --- Talks and interviews ---

const enigmaPage = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "USENIX Enigma 2016 — Timeless Debugging (speaker page)",
  url: "https://www.usenix.org/conference/enigma2016/conference-program/presentation/hotz",
  publisher: "USENIX",
  publishedAt: "2016-02",
  notes:
    "Speaker bio in Hotz's own words: 'six figures in hacking contests', 'compression is intelligence', 'we have about 19 years left on this planet'.",
});
const enigmaVideo = source({
  binding: "first_person",
  mediaType: "video",
  title: "USENIX Enigma 2016 — Timeless Debugging",
  url: "https://www.youtube.com/watch?v=eGl6kpSajag",
  publisher: "USENIX",
  publishedAt: "2016-02",
});
const webSummit = source({
  binding: "first_person",
  mediaType: "video",
  title: "George Hotz, Comma AI — Hack Your Way To A Self-Driving Car",
  url: "https://www.youtube.com/watch?v=ePJbekKUU5U",
  publisher: "Web Summit",
  publishedAt: "2017-11",
});
const sxsw = source({
  binding: "first_person",
  mediaType: "video",
  title: "Jailbreaking the Simulation with George Hotz",
  url: "https://www.youtube.com/watch?v=ESXOAJRdcwQ",
  publisher: "SXSW",
  publishedAt: "2019-03",
});
const lex31 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "George Hotz: Comma.ai, OpenPilot, and Autonomous Vehicles | Lex Fridman Podcast #31",
  url: "https://www.youtube.com/watch?v=iwcYp-XT7UI",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2019-08-05",
});
const lex132 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "George Hotz: Hacking the Simulation & Learning to Drive with Neural Nets | Lex Fridman Podcast #132",
  url: "https://www.youtube.com/watch?v=_L3gNaAVjQ4",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2020-10",
});
const lex387 = source({
  binding: "interview",
  mediaType: "video",
  title:
    "George Hotz: Tiny Corp, Twitter, AI Safety, Self-Driving, GPT, AGI & God | Lex Fridman Podcast #387",
  url: "https://www.youtube.com/watch?v=dNrTrx42DGQ",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2023-08",
});
const lex387Transcript = source({
  binding: "interview",
  mediaType: "transcript",
  title:
    "Transcript for George Hotz: Tiny Corp, Twitter, AI Safety, Self-Driving, GPT, AGI & God",
  url: "https://lexfridman.com/george-hotz-3-transcript/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2023-08",
  transcriptOf: lex387.id,
});
const dwarkesh = source({
  binding: "interview",
  mediaType: "video",
  title: "George Hotz vs Eliezer Yudkowsky",
  url: "https://www.youtube.com/watch?v=6yQEA18C-XI",
  publisher: "Dwarkesh Patel",
  publishedAt: "2023-08-15",
  authors: ["Dwarkesh Patel"],
});
const latentSpace = source({
  binding: "interview",
  mediaType: "article",
  title: "Commoditizing the Petaflop — with George Hotz of the tiny corp",
  url: "https://www.latent.space/p/geohot",
  publisher: "Latent Space",
  publishedAt: "2023-06-20",
});

const S = {
  geohotcom: geohotcom.id,
  blogIndex: blogIndex.id,
  heroesJourney: heroesJourney.id,
  tinyRaise: tinyRaise.id,
  commaai: commaai.id,
  commaShop: commaShop.id,
  commaFour: commaFour.id,
  commaBody: commaBody.id,
  firstLawsuit: firstLawsuit.id,
  commaThreePR: commaThreePR.id,
  comma3X: comma3X.id,
  tinygradOrg: tinygradOrg.id,
  openpilotRepo: openpilotRepo.id,
  tinygradRepo: tinygradRepo.id,
  geohotGithub: geohotGithub.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  openpilotWiki: openpilotWiki.id,
  sonyWiki: sonyWiki.id,
  nyt: nyt.id,
  npr: npr.id,
  engadget350z: engadget350z.id,
  bbcPs3: bbcPs3.id,
  registerPs3: registerPs3.id,
  arsOtherOs: arsOtherOs.id,
  wiredSettle: wiredSettle.id,
  bbcSettle: bbcSettle.id,
  effJudgment: effJudgment.id,
  recapDocket: recapDocket.id,
  vergeRap: vergeRap.id,
  bloomberg: bloomberg.id,
  electrek: electrek.id,
  vergeTesla: vergeTesla.id,
  cdixon: cdixon.id,
  tcCommaOne: tcCommaOne.id,
  tcCancel: tcCancel.id,
  mittr: mittr.id,
  arsOpenpilot: arsOpenpilot.id,
  vergeGarage: vergeGarage.id,
  tcCeo: tcCeo.id,
  crArticle: crArticle.id,
  crPdf: crPdf.id,
  vergeStepdown: vergeStepdown.id,
  tcLeaving: tcLeaving.id,
  vergeTwitter: vergeTwitter.id,
  sdbj: sdbj.id,
  wccftech: wccftech.id,
  linkedinFour: linkedinFour.id,
  enigmaPage: enigmaPage.id,
  enigmaVideo: enigmaVideo.id,
  webSummit: webSummit.id,
  sxsw: sxsw.id,
  lex31: lex31.id,
  lex132: lex132.id,
  lex387: lex387.id,
  lex387Transcript: lex387Transcript.id,
  dwarkesh: dwarkesh.id,
  latentSpace: latentSpace.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-george-hotz",
  generatedAt: "2026-09-16T22:00:00Z",
  subject: {
    kind: "person",
    handle: "george-hotz",
    displayName: "George Hotz",
    alsoKnownAs: ["geohot", "Geohot", "tomcr00se", "George Francis Hotz"],
    summary:
      "American security hacker turned company founder. First person to carrier-unlock the iPhone (2007, age 17) and first to break the PlayStation 3's security (2010), which drew a Sony lawsuit settled in 2011. Founded comma.ai (openpilot driver assistance) in 2015 and the tiny corp (tinygrad framework, tinybox computers) in 2022. Known for livestreamed programming, public bets against self-driving hype, and an open, keep-it-small philosophy.",
    identity: {
      wikidataId: "Q370733",
      officialSite: "https://geohot.com",
      wikipedia: "https://en.wikipedia.org/wiki/George_Hotz",
      profiles: [
        "https://x.com/realGeorgeHotz",
        "https://github.com/geohot",
        "https://www.twitch.tv/georgehotz",
        "https://www.instagram.com/georgehotz/",
        "https://soundcloud.com/tomcr00se/",
        "https://geohot.github.io/blog/",
        "https://www.linkedin.com/in/george-hotz-b3866476/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T00:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media", "beliefs"],
  },
  sources: [
    geohotcom,
    blogIndex,
    heroesJourney,
    tinyRaise,
    commaai,
    commaShop,
    commaFour,
    commaBody,
    firstLawsuit,
    commaThreePR,
    comma3X,
    tinygradOrg,
    openpilotRepo,
    tinygradRepo,
    geohotGithub,
    wikidata,
    wikipedia,
    openpilotWiki,
    sonyWiki,
    nyt,
    npr,
    engadget350z,
    bbcPs3,
    registerPs3,
    arsOtherOs,
    wiredSettle,
    bbcSettle,
    effJudgment,
    recapDocket,
    vergeRap,
    bloomberg,
    electrek,
    vergeTesla,
    cdixon,
    tcCommaOne,
    tcCancel,
    mittr,
    arsOpenpilot,
    vergeGarage,
    tcCeo,
    crArticle,
    crPdf,
    vergeStepdown,
    tcLeaving,
    vergeTwitter,
    sdbj,
    wccftech,
    linkedinFour,
    enigmaPage,
    enigmaVideo,
    webSummit,
    sxsw,
    lex31,
    lex132,
    lex387,
    lex387Transcript,
    dwarkesh,
    latentSpace,
  ],
  claims: [
    // --- facts: early life and iPhone era ---
    {
      id: "claim-born-1989",
      kind: "fact",
      text: "George Francis Hotz was born October 2, 1989 in Glen Rock, New Jersey. He attended the Academy for Engineering and Design Technology at Bergen County Academies, and briefly attended Rochester Institute of Technology and Carnegie Mellon University without completing a degree.",
      sourceIds: [S.wikipedia, S.wikidata, S.registerPs3],
    },
    {
      id: "claim-isef-finalist",
      kind: "fact",
      text: "He was a finalist at the Intel International Science and Engineering Fair three times — 2004 ('The Mapping Robot'), 2005 ('The Googler'), and 2007 ('I want a Holodeck', a 3D imaging project that earned a $20,000 Intel scholarship and a trip to the Stockholm International Youth Science Seminar).",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-iphone-unlock",
      kind: "fact",
      text: "In August 2007, at age 17, Hotz published the first publicly demonstrated method to carrier-unlock the iPhone from AT&T — a roughly two-hour procedure mixing soldering and software that he said took about 500 hours to develop. The Associated Press verified an unlocked unit working on T-Mobile.",
      sourceIds: [S.nyt, S.npr, S.wikipedia],
    },
    {
      id: "claim-iphone-collaboration",
      kind: "fact",
      text: "The unlock was collaborative: Hotz worked with an open online group of hackers (two core collaborators in Russia), posted full instructions free on his blog, and told NPR he did it because 'information should be free.'",
      sourceIds: [S.npr, S.nyt],
    },
    {
      id: "claim-iphone-350z",
      kind: "fact",
      text: "After an eBay auction for the second unlocked iPhone collapsed under fraudulent bids (reaching a nominal $150 million), he traded it to CertiCell founder Terry Daidone for a Nissan 350Z and three 8 GB iPhones, plus a consulting arrangement.",
      sourceIds: [S.engadget350z, S.wikipedia],
    },
    {
      id: "claim-blackra1n-limera1n",
      kind: "fact",
      text: "He released the blackra1n jailbreak for iOS 3.1.2 in October 2009 and limera1n in October 2010 — bootrom-exploit tools that made iPhone jailbreaking a one-click operation; in his USENIX talk he claimed blackra1n was used by 21 million people.",
      sourceIds: [S.wikipedia, S.enigmaVideo],
    },
    {
      id: "claim-quit-jailbreak-2010",
      kind: "fact",
      text: "In July 2010 he publicly announced he was quitting iPhone jailbreaking, citing demotivation and unwanted attention — the first of several dramatic public exits — though he still shipped limera1n that October.",
      sourceIds: [S.wikipedia],
    },
    // --- facts: PS3 era ---
    {
      id: "claim-ps3-hack",
      kind: "fact",
      text: "In late January 2010 Hotz announced he had cracked the PlayStation 3 — read/write access to system memory and hypervisor-level access — after about five weeks of work on a console that had resisted hacking for three years. He released the exploit publicly on January 26, 2010.",
      sourceIds: [S.bbcPs3, S.registerPs3, S.wikipedia],
    },
    {
      id: "claim-otheros-removed",
      kind: "fact",
      text: "Sony responded on March 28, 2010 by announcing a firmware update that would remove the OtherOS Linux feature from all PS3 models; Hotz publicly vowed to fight it and work to restore Linux support.",
      sourceIds: [S.arsOtherOs, S.wikipedia],
    },
    {
      id: "claim-fail0verflow-keys",
      kind: "fact",
      text: "At the 27th Chaos Communications Congress on December 29, 2010, the fail0verflow group exposed Sony's ECDSA signing mistake. On January 2, 2011, Hotz published the PS3's private key on his website — the act that made the console's security unrecoverable and triggered the lawsuit.",
      sourceIds: [S.sonyWiki, S.wikipedia],
    },
    {
      id: "claim-sony-suit",
      kind: "fact",
      text: "Sony Computer Entertainment America sued Hotz and fail0verflow members on January 11, 2011 in the Northern District of California (3:11-cv-00167), alleging DMCA and Computer Fraud and Abuse Act violations; the court granted a temporary restraining order on January 27 and a preliminary injunction on February 28, and Sony won subpoenas for data from YouTube and Twitter about who had viewed his pages.",
      sourceIds: [S.recapDocket, S.effJudgment, S.wiredSettle],
    },
    {
      id: "claim-sony-settlement",
      kind: "fact",
      text: "The case settled out of court, with the stipulated final judgment filed April 11-12, 2011: a permanent injunction barring Hotz from circumventing Sony's technological protection measures ($10,000 per breach) — with no admission of the allegations, each side bearing its own costs. Hotz had denied wrongdoing throughout and announced he was joining a boycott of Sony products.",
      sourceIds: [S.effJudgment, S.wiredSettle, S.bbcSettle],
    },
    {
      id: "claim-sony-rap",
      kind: "fact",
      text: "During the lawsuit Hotz published a rap video mocking Sony — the start of a parallel music life as 'tomcr00se' on SoundCloud that continued for years alongside his engineering work.",
      sourceIds: [S.sonyWiki, S.vergeRap, S.geohotcom],
    },
    // --- facts: jobs and contests ---
    {
      id: "claim-facebook-job",
      kind: "fact",
      text: "Hotz worked at Facebook from May 2011 to January 2012, hired weeks after the Sony settlement in part to prove he was not an 'unemployable outcast' — and quit, later saying the company's mission was to make a time-spent metric go up.",
      sourceIds: [S.wikipedia, S.sxsw],
    },
    {
      id: "claim-ctf-wins",
      kind: "fact",
      text: "Competing under the tomcr00se handle, he won Carnegie Mellon's Plaid Parliament of Pwning its DEF CON CTF titles in 2013 and 2014 (plus a second place), and took first place solo at NYU's 2013 CSAW; his USENIX bio credits him with 'six figures in hacking contests.'",
      sourceIds: [S.wikipedia, S.enigmaPage],
    },
    {
      id: "claim-google-project-zero",
      kind: "fact",
      text: "On July 16, 2014, Google hired Hotz onto the Project Zero team, where he built Qira, a timeless-debugging tool for dynamically analyzing application binaries — later the subject of his USENIX Enigma 2016 talk.",
      sourceIds: [S.wikipedia, S.enigmaPage],
    },
    {
      id: "claim-towelroot",
      kind: "fact",
      text: "In 2014 he released towelroot, a one-tap root exploit originally for the Verizon Galaxy S5 that worked on most Android devices of the period until OS updates closed the underlying vulnerability.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-vicarious",
      kind: "fact",
      text: "From January to July 2015 he worked at the AI startup Vicarious — his first full-time machine-learning job — before leaving to build his self-driving car in a San Francisco garage.",
      sourceIds: [S.wikipedia, S.bloomberg, S.enigmaPage],
    },
    // --- facts: comma.ai ---
    {
      id: "claim-comma-founded",
      kind: "fact",
      text: "Hotz founded comma.ai in September 2015 to build driver assistance with machine learning. He demonstrated a self-built self-driving Acura ILX on Interstate 280 — which drew a cease-and-desist letter from the California DMV — and the December 16, 2015 Bloomberg Businessweek profile of the garage build made the company famous.",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "claim-musk-offer",
      kind: "fact",
      text: "Bloomberg reported that Elon Musk offered Hotz a deal to build Tesla's vision stack, with an emailed 'multimillion-dollar bonus ... that pays out as soon as we discontinue Mobileye'; Hotz declined — 'I'm not looking for a job. I'll ping you when I crush Mobileye' — saying Musk kept changing the terms. Tesla publicly called the story inaccurate and a lone hacker's system 'extremely unlikely' to reach production.",
      sourceIds: [S.bloomberg, S.electrek, S.vergeTesla],
    },
    {
      id: "claim-a16z-funding",
      kind: "fact",
      text: "Andreessen Horowitz led a $3.1 million investment in comma.ai in April 2016 — its first venture round — after Chris Dixon rode in the car; per TechCrunch, comma's a16z funding totaled $8.1 million across two rounds, with a further ~$10 million raised quietly from individuals by 2021.",
      sourceIds: [S.cdixon, S.tcLeaving],
    },
    {
      id: "claim-comma-one",
      kind: "fact",
      text: "On September 13, 2016 at TechCrunch Disrupt, Hotz presented the comma one — a $999 aftermarket kit promising Autopilot-like highway assistance on supported Honda/Acura models — slated to ship by end of year.",
      sourceIds: [S.tcCommaOne, S.mittr],
    },
    {
      id: "claim-nhtsa-cancel",
      kind: "fact",
      text: "On October 27-28, 2016, NHTSA sent comma.ai a special order demanding answers to 15 detailed questions about the comma one and warning of civil penalties up to $21,000 per day. Rather than respond, Hotz cancelled the product outright, tweeting from Shenzhen that he'd 'much rather spend my life building amazing tech than dealing with regulators and lawyers.'",
      sourceIds: [S.tcCancel, S.mittr],
    },
    {
      id: "claim-openpilot-released",
      kind: "fact",
      text: "Five weeks later, on November 30, 2016, comma.ai released openpilot — its driving software performing adaptive cruise and lane keeping — as free open source, along with plans for the comma neo robotics hardware: 'If we really want to be the Android of self-driving cars, we can't be charging $999.'",
      sourceIds: [S.arsOpenpilot, S.vergeGarage, S.openpilotRepo],
    },
    {
      id: "claim-ceo-ouster",
      kind: "fact",
      text: "In September 2018 Hotz, the sole member of comma.ai's board, fired himself as CEO and moved into a new comma research division focused on behavioral driving models; Riccardo Biasini took the CEO role until 2019.",
      sourceIds: [S.tcCeo, S.tcLeaving],
    },
    {
      id: "claim-hardware-line",
      kind: "fact",
      text: "comma shipped a sequence of windshield devkits running openpilot: comma two at CES on January 7, 2020 ($999), comma three on July 31, 2021 ($2,199, triple camera), comma 3X at COMMA_CON 2023 ($1,250), and comma four at COMMA_CON 2025 ($999, one-fifth the size, made in San Diego).",
      sourceIds: [S.openpilotWiki, S.commaThreePR, S.comma3X, S.commaFour],
    },
    {
      id: "claim-cr-top-rated",
      kind: "fact",
      text: "In October-November 2020, Consumer Reports tested 17-18 active driving assistance systems and ranked the comma two running openpilot — the only aftermarket system evaluated — first overall, ahead of GM Super Cruise and Tesla Autopilot, citing driver engagement and ease of use.",
      sourceIds: [S.crArticle, S.crPdf],
    },
    {
      id: "claim-openpilot-scale",
      kind: "fact",
      text: "comma claims openpilot now works on 325+ vehicles from 27 brands, and as of 2025 reported users had accumulated over 100 million miles on the system — figures promoted on its own channels rather than independently audited.",
      sourceIds: [S.commaShop, S.openpilotWiki, S.commaFour],
    },
    {
      id: "claim-patent-troll",
      kind: "fact",
      text: "In August 2022 comma.ai published its first lawsuit — filed by Sucxess LLC, an entity Hotz calls a patent troll — and declared on the company blog, 'I'm willing to lose $1M before I give him $10k,' vowing to fight to invalidate the patents rather than settle.",
      sourceIds: [S.firstLawsuit],
    },
    {
      id: "claim-stepped-back",
      kind: "fact",
      text: "On October 29, 2022, Hotz posted 'The Hero's Journey' announcing he was 'taking some time away from comma' — while remaining board member and president — saying the company had matured past the stage where his skills fit: 'I've always heard it takes different people at different company sizes.'",
      sourceIds: [S.heroesJourney, S.vergeStepdown, S.tcLeaving],
    },
    {
      id: "claim-twitter-internship",
      kind: "fact",
      text: "After endorsing Elon Musk's 'extremely hardcore' ultimatum, Hotz joined Twitter around November 18, 2022 for a self-proposed 12-week internship to fix search and the logged-out popup wall; he resigned December 20, 2022 — under six weeks in — saying he 'didn't think there was any real impact I could make there.'",
      sourceIds: [S.vergeTwitter, S.wikipedia],
    },
    // --- facts: tiny corp era ---
    {
      id: "claim-tiny-corp-founded",
      kind: "fact",
      text: "Hotz founded the tiny corp on November 5, 2022 — days after stepping back from comma — and announced on May 24, 2023 that it had raised $5.1 million 'to commoditize the petaflop,' selling computers 'for more than they cost to make.'",
      sourceIds: [S.wikipedia, S.tinyRaise, S.latentSpace],
    },
    {
      id: "claim-tinygrad-desc",
      kind: "fact",
      text: "tinygrad is the tiny corp's open-source neural-network framework — deliberately tiny, decomposing complex networks into three op types — and it also powers openpilot's on-device models on comma hardware.",
      sourceIds: [S.tinygradOrg, S.tinygradRepo, S.wikipedia],
    },
    {
      id: "claim-tinybox",
      kind: "fact",
      text: "The tiny corp sells the tinybox line of AI computers — multi-GPU workstations originally priced at $15,000 — and by 2026 was advertising red, green (RTX PRO Blackwell), and a ~1-exaflop 'exabox' system taking preorders for 2027.",
      sourceIds: [S.tinygradOrg, S.latentSpace],
    },
    {
      id: "claim-comma-body",
      kind: "fact",
      text: "On May 4, 2022 comma launched the comma body — a $999 two-wheeled balancing robot devkit that mounts a comma device as its 'head' and runs openpilot ('from openpilot's perspective, the comma body is a car') — the first 'intermediary' of a widened mission: 'Solve AI while delivering shippable intermediaries.'",
      sourceIds: [S.commaBody],
    },
    {
      id: "claim-comma-four-2025",
      kind: "fact",
      text: "comma four launched at COMMA_CON 2025 (announced November 25, 2025) at $999, one-fifth the size of the 3X, assembled in comma's own San Diego factory; the San Diego Business Journal reported Hotz had claimed a $1 billion valuation for the company in mid-2025.",
      sourceIds: [S.commaFour, S.sdbj],
    },
    {
      id: "claim-comma-exit-2025",
      kind: "fact",
      text: "By late November 2025, Hotz's public profiles list his comma.ai roles (CEO, head of research) as past positions under a current 'Founder at the tiny corp' byline, and Wikipedia records his comma.ai tenure as ending November 2025 — though he continued posting comma four promotions that month.",
      sourceIds: [S.linkedinFour, S.wikipedia],
    },
    {
      id: "claim-cheapeth",
      kind: "fact",
      text: "In February 2020 he founded cheapETH, a low-fee Ethereum clone — a side project consistent with his long-standing bullishness on crypto's Nakamoto consensus as 'one of the greatest innovations of the 21st century.'",
      sourceIds: [S.wikipedia, S.lex132],
    },
    {
      id: "claim-livestreams",
      kind: "fact",
      text: "He does frequent multi-hour programming livestreams on Twitch (tens of thousands of followers; ~83k as of April 2025), coding tinygrad and openpilot in public — the streaming habit he brought to Twitter as an intern, where he said it was 'sad to see my GitHub withering.'",
      sourceIds: [S.wikipedia, S.vergeTwitter],
    },
    // --- stated beliefs ---
    {
      id: "claim-belief-information-free",
      kind: "stated_belief",
      text: "Hotz says he unlocked the iPhone 'about opening up the device for everyone' and posted full instructions free because 'information should be free' — a stance he repeated by open-sourcing openpilot rather than selling the comma one.",
      sourceIds: [S.npr, S.nyt, S.arsOpenpilot],
    },
    {
      id: "claim-belief-shippable-intermediaries",
      kind: "stated_belief",
      text: "His stated company doctrine is to attack huge end-goals while shipping real products on the way: 'Solve self driving cars while delivering shippable intermediaries,' later widened to 'Solve AI while delivering shippable intermediaries' — the comma body being the first such intermediary.",
      sourceIds: [S.commaBody],
    },
    {
      id: "claim-belief-android-of-cars",
      kind: "stated_belief",
      text: "He frames openpilot as 'the Android of self-driving cars' to Tesla's iOS: vertically integrated players ship the slick closed product, but the open platform that runs on everyone's hardware wins in the long run.",
      sourceIds: [S.webSummit, S.vergeGarage, S.arsOpenpilot],
    },
    {
      id: "claim-belief-not-a-manager",
      kind: "stated_belief",
      text: "He says he is not the person to run a mature company: 'I don't think I'm capable of running a company like that. I've always heard it takes different people at different company sizes' — the stated reason for firing himself as CEO in 2018 and stepping back in 2022.",
      sourceIds: [S.heroesJourney, S.vergeStepdown, S.tcCeo],
    },
    {
      id: "claim-belief-anti-regulators",
      kind: "stated_belief",
      text: "He treats regulators and lawyered-up institutions as the enemy of building: on cancelling the comma one, 'First time I hear from them and they open with threats... Would much rather spend my life building amazing tech than dealing with regulators and lawyers. It isn't worth it.'",
      sourceIds: [S.tcCancel, S.mittr, S.vergeStepdown],
    },
    {
      id: "claim-belief-ai-safety-skeptic",
      kind: "stated_belief",
      text: "In the August 2023 debate with Eliezer Yudkowsky he argued rapid 'foom' self-improvement is an extraordinary claim requiring extraordinary evidence, that intelligence can't 'go critical' on a server farm, and that true superintelligence likely arrives after his lifetime — a problem for future generations.",
      sourceIds: [S.dwarkesh, S.lex387Transcript],
    },
    {
      id: "claim-belief-simulation",
      kind: "stated_belief",
      text: "He takes the simulation hypothesis seriously enough to make it a talk — 'Jailbreaking the Simulation' (SXSW 2019) — arguing that a sufficiently advanced civilization's inhabitants should bet they live in a simulation, and musing on Lex Fridman's show that time may be an illusion.",
      sourceIds: [S.sxsw, S.lex387, S.lex387Transcript],
    },
    {
      id: "claim-belief-compression",
      kind: "stated_belief",
      text: "He describes intelligence as compression — 'I believe that compression is intelligence' — and AI as 'the last problem humanity will ever have to solve,' joking in 2016 that we had about 19 years left on the planet.",
      sourceIds: [S.enigmaPage],
    },
    {
      id: "claim-belief-commoditize-compute",
      kind: "stated_belief",
      text: "The tiny corp's stated mission is to 'commoditize the petaflop' — making serious AI compute cheap and local so it is not monopolized by whoever controls the big clouds; its business model is plainly stated: sell computers for more than they cost to make.",
      sourceIds: [S.latentSpace, S.tinyRaise, S.tinygradOrg],
    },
    {
      id: "claim-belief-ten-year-game",
      kind: "stated_belief",
      text: "On self-driving hype he positioned himself as the patient skeptic: 'I'm here to play for 10 years,' offering even-money bets that rivals' promised 2020-2022 robotaxi fleets would not materialize.",
      sourceIds: [S.lex31],
    },
    // --- patterns ---
    {
      id: "claim-pattern-publish-then-exit",
      kind: "pattern",
      text: "A repeating move: ship the explosive thing publicly, then exit rather than litigate or administrate — publishing the iPhone unlock free in 2007, posting the PS3 keys then settling with an injunction in 2011, cancelling the comma one then open-sourcing openpilot in 2016, and quitting the Twitter internship in under six weeks in 2022.",
      sourceIds: [S.nyt, S.effJudgment, S.tcCancel, S.arsOpenpilot, S.vergeTwitter],
    },
    {
      id: "claim-pattern-small-team",
      kind: "pattern",
      text: "He consistently runs small teams against big institutions: a ~20-25 person comma against the auto industry's ADAS programs, a handful of people at the tiny corp against the GPU incumbents — and frames it as a structural advantage, telling Web Summit that the companies 'farthest along' in a platform race lose hardest.",
      sourceIds: [S.webSummit, S.sdbj, S.vergeStepdown, S.latentSpace],
    },
    {
      id: "claim-pattern-adversarial-institutions",
      kind: "pattern",
      text: "Adversary-as-marketing recurs across two decades: Sony, the California DMV, NHTSA, Tesla/Mobileye, patent asserter Sucxess — each fight is publicly narrated on his own channels, and each ends with him either open-sourcing the contested work or walking away.",
      sourceIds: [S.effJudgment, S.firstLawsuit, S.mittr, S.vergeTesla, S.geohotcom],
    },
    {
      id: "claim-pattern-work-in-public",
      kind: "pattern",
      text: "He works in public: livestreamed coding sessions, open GitHub development, bounty programs that pay contributors, and hiring through paid tinygrad bounties rather than resumes.",
      sourceIds: [S.tinygradOrg, S.openpilotRepo, S.vergeTwitter, S.wikipedia],
    },
    {
      id: "claim-pattern-self-promotion",
      kind: "pattern",
      text: "The public record is heavily self-narrated: the garage Bloomberg demo, the Sony diss rap, the one-word 'OK' email reveal, the $1B valuation he stated himself — his claims are confident, quotable, and frequently contested by the institutions on the other side.",
      sourceIds: [S.bloomberg, S.electrek, S.vergeTesla, S.sdbj, S.vergeRap],
    },
    {
      id: "claim-pattern-pragmatism",
      kind: "pattern",
      text: "Underneath the troll persona sits unsentimental engineering pragmatism: he praised Tesla FSD v13 as 'really good' in January 2025 and posted 'we are buying NVIDIA' because 'nobody at comma wants to deal with AMD' — despite tinygrad's multi-vendor ambitions.",
      sourceIds: [S.wccftech],
    },
    // --- speculation ---
    {
      id: "claim-spec-musk-offer",
      kind: "speculation",
      text: "How real the Musk 'offer' was is unresolved: Hotz and Bloomberg describe a changing deal that fell through; Tesla's rebuttal called the characterization inaccurate without disputing the emails' existence. Later reports attached figures as high as $12 million to the contingent bonus, but the contemporaneous record only supports 'multimillion-dollar.'",
      sourceIds: [S.bloomberg, S.electrek, S.vergeTesla],
    },
    {
      id: "claim-spec-fail0verflow-credit",
      kind: "speculation",
      text: "The boundary between Hotz's and fail0verflow's PS3 contributions is contested ground: his January 2010 exploit needed hardware modification, while the signing-key recovery flowed from fail0verflow's December 2010 ECDSA analysis — Sony sued him anyway, likely because he was the public face who posted the keys.",
      sourceIds: [S.sonyWiki, S.registerPs3, S.effJudgment],
    },
    {
      id: "claim-spec-comma-metrics",
      kind: "speculation",
      text: "comma's headline metrics — 'highest rated driver assistance', 100 million+ user miles, 325+ supported cars — are drawn from its own marketing and a dated 2020 Consumer Reports test of an older device; whether the current system still outperforms Tesla FSD (which Hotz himself called 'really good' in 2025) is open.",
      sourceIds: [S.commaShop, S.commaFour, S.crPdf, S.wccftech],
    },
    {
      id: "claim-spec-comma-departure",
      kind: "speculation",
      text: "Whether Hotz has formally left comma.ai is murky: reference material marks November 2025 as the end of his tenure and his profiles list the roles as past, yet he still promotes comma products — consistent with a founder who owns the company but no longer works in it, though no announcement has been catalogued.",
      sourceIds: [S.wikipedia, S.linkedinFour],
    },
    {
      id: "claim-spec-tinygrad-bet",
      kind: "speculation",
      text: "The tiny corp's bet — that a tiny framework plus commodity non-NVIDIA silicon can undercut the CUDA-centric stack — remains unproven; Hotz's own companies buying NVIDIA parts suggests the gap he attacks is still real.",
      sourceIds: [S.latentSpace, S.tinygradOrg, S.wccftech],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1989-10-02",
      title: "Born in Glen Rock, New Jersey",
      summary: "George Francis Hotz; later attended Bergen County Academies' engineering magnet.",
      location: "Glen Rock, New Jersey",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-isef-2007",
      kind: "award",
      date: "2007",
      title: "ISEF finalist for 'I want a Holodeck'",
      summary:
        "Third ISEF finals appearance; the 3D-imaging project earned a $20,000 Intel scholarship and a speaking trip to the Stockholm International Youth Science Seminar.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-iphone-unlock",
      kind: "milestone",
      date: "2007-08",
      title: "First person to carrier-unlock the iPhone",
      summary:
        "Published the soldering-and-software unlock procedure free on his blog after ~500 hours of work; verified by the AP on T-Mobile's network.",
      sourceIds: [S.nyt, S.npr],
    },
    {
      id: "event-350z-trade",
      kind: "milestone",
      date: "2007-08-27",
      title: "Trades unlocked iPhone for a Nissan 350Z",
      summary:
        "Swapped the second unlocked iPhone to CertiCell founder Terry Daidone for the car plus three locked iPhones, days after publishing the method for free.",
      sourceIds: [S.engadget350z],
    },
    {
      id: "event-blackra1n",
      kind: "publication",
      date: "2009-10",
      title: "Releases blackra1n",
      summary:
        "One-click jailbreak for iOS 3.1.2 devices; limera1n followed in October 2010 after his public 'retirement' that July.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-ps3-exploit",
      kind: "publication",
      date: "2010-01-26",
      title: "Publishes the PS3 exploit",
      summary:
        "Announced hypervisor-level access January 22; released the exploit four days later. Sony removed OtherOS from all PS3s in the April 1 firmware update.",
      sourceIds: [S.bbcPs3, S.registerPs3, S.arsOtherOs],
    },
    {
      id: "event-ps3-keys",
      kind: "publication",
      date: "2011-01-02",
      title: "Posts the PS3's private signing key",
      summary:
        "Days after fail0verflow's 27C3 talk exposed Sony's ECDSA mistake, Hotz published the console's private key — the distribution act at the heart of the lawsuit.",
      sourceIds: [S.sonyWiki, S.wikipedia],
    },
    {
      id: "event-sony-sues",
      kind: "other",
      date: "2011-01-11",
      title: "Sony sues Hotz",
      summary:
        "SCEA v. Hotz (3:11-cv-00167, N.D. Cal.): DMCA, CFAA, and related claims; TRO January 27, preliminary injunction February 28.",
      organization: "Sony Computer Entertainment America",
      sourceIds: [S.recapDocket, S.effJudgment],
    },
    {
      id: "event-sony-settles",
      kind: "milestone",
      date: "2011-04-11",
      end: "2011-04-12",
      title: "Sony suit settles with permanent injunction",
      summary:
        "Consent judgment: Hotz barred from circumventing Sony protections ($10k per breach), no admission of liability, each side bears its own costs.",
      sourceIds: [S.effJudgment, S.wiredSettle, S.bbcSettle],
    },
    {
      id: "event-facebook",
      kind: "role",
      date: "2011-05",
      end: "2012-01",
      title: "Works at Facebook",
      summary: "Engineering job taken weeks after the Sony settlement; quit inside a year.",
      organization: "Facebook",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-ctf-ppp",
      kind: "award",
      date: "2013",
      end: "2014",
      title: "DEF CON CTF wins with CMU's PPP",
      summary:
        "As tomcr00se: back-to-back DEF CON Capture the Flag titles with Plaid Parliament of Pwning (2013, 2014) and a solo first place at NYU CSAW 2013.",
      organization: "Plaid Parliament of Pwning",
      sourceIds: [S.wikipedia, S.enigmaPage],
    },
    {
      id: "event-google-p0",
      kind: "role",
      date: "2014-07-16",
      title: "Hired by Google's Project Zero",
      summary: "Built Qira, the timeless-debugging tool he presented at USENIX Enigma 2016.",
      organization: "Google",
      sourceIds: [S.wikipedia, S.enigmaPage],
    },
    {
      id: "event-vicarious",
      kind: "role",
      date: "2015-01",
      end: "2015-07",
      title: "Researcher at Vicarious",
      summary: "First full-time machine-learning role before the garage self-driving build.",
      organization: "Vicarious",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "event-comma-founded",
      kind: "founded",
      date: "2015-09",
      title: "Founds comma.ai",
      summary:
        "Vehicle-automation ML company born from a self-driving Acura ILX built in his garage in about a month; the I-280 demo drew a California DMV cease-and-desist.",
      organization: "comma.ai",
      location: "San Francisco, California",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "event-bloomberg-profile",
      kind: "media",
      date: "2015-12-16",
      title: "Bloomberg garage profile; Musk saga breaks",
      summary:
        "Ashlee Vance's Businessweek feature reveals Hotz's Tesla talks — a 'multimillion-dollar bonus' offer, refused — and Tesla's public rebuttal follows within a day.",
      sourceIds: [S.bloomberg, S.electrek, S.vergeTesla],
    },
    {
      id: "event-a16z",
      kind: "milestone",
      date: "2016-04-02",
      title: "a16z leads $3.1M round in comma.ai",
      summary: "First venture funding, announced by Chris Dixon after riding in the car.",
      organization: "comma.ai",
      sourceIds: [S.cdixon],
    },
    {
      id: "event-comma-one",
      kind: "project",
      date: "2016-09-13",
      title: "Presents the comma one at TechCrunch Disrupt",
      summary: "$999 aftermarket highway-autonomy kit, promised for end of year.",
      organization: "comma.ai",
      sourceIds: [S.tcCommaOne],
    },
    {
      id: "event-nhtsa",
      kind: "milestone",
      date: "2016-10-28",
      title: "NHTSA special order; comma one cancelled",
      summary:
        "Faced with 15 safety questions and $21k/day penalties, Hotz cancels the product rather than respond — 'would much rather spend my life building amazing tech than dealing with regulators.'",
      organization: "comma.ai",
      sourceIds: [S.tcCancel, S.mittr],
    },
    {
      id: "event-openpilot-opensource",
      kind: "publication",
      date: "2016-11-30",
      title: "openpilot released as open source",
      summary:
        "comma.ai gives away the driving software plus comma neo hardware plans — the pivot that defined the company.",
      organization: "comma.ai",
      sourceIds: [S.arsOpenpilot, S.vergeGarage, S.openpilotRepo],
    },
    {
      id: "event-ceo-fired",
      kind: "role",
      date: "2018-09-11",
      title: "Fires himself as comma.ai CEO",
      summary:
        "Sole board member ousts founder-CEO — himself — to lead a new research division on behavioral driving models.",
      organization: "comma.ai",
      sourceIds: [S.tcCeo],
    },
    {
      id: "event-comma-two",
      kind: "project",
      date: "2020-01-07",
      title: "comma two launches at CES",
      summary: "$999 devkit; in November Consumer Reports ranks openpilot the top ADAS it tested.",
      organization: "comma.ai",
      location: "Las Vegas, Nevada",
      sourceIds: [S.openpilotWiki, S.crPdf],
    },
    {
      id: "event-comma-three",
      kind: "project",
      date: "2021-07-31",
      title: "comma three devkit",
      summary: "$2,199 triple-camera device; comma's productized ADAS era.",
      organization: "comma.ai",
      sourceIds: [S.commaThreePR],
    },
    {
      id: "event-comma-body",
      kind: "project",
      date: "2022-05-04",
      title: "comma body robot devkit",
      summary:
        "$999 balancing robot powered by a comma device — first 'intermediary' of the widened 'Solve AI' mission.",
      organization: "comma.ai",
      sourceIds: [S.commaBody],
    },
    {
      id: "event-patent-suit",
      kind: "other",
      date: "2022-08-24",
      title: "comma's first lawsuit: vows to fight the patent troll",
      summary:
        "Sued by Sucxess LLC; Hotz pledges to spend $1M to invalidate the patents rather than pay $10k to settle.",
      organization: "comma.ai",
      sourceIds: [S.firstLawsuit],
    },
    {
      id: "event-hero-journey",
      kind: "milestone",
      date: "2022-10-29",
      title: "Posts 'The Hero's Journey' — steps back from comma",
      summary:
        "Takes 'some time away' while keeping board seat and president title; day-to-day runs to the COO and CTO.",
      sourceIds: [S.heroesJourney, S.vergeStepdown, S.tcLeaving],
    },
    {
      id: "event-tiny-corp",
      kind: "founded",
      date: "2022-11-05",
      title: "Founds the tiny corp",
      summary:
        "Company behind tinygrad and the tinybox, built to 'commoditize the petaflop'; $5.1M raise announced May 24, 2023.",
      organization: "the tiny corp",
      sourceIds: [S.wikipedia, S.tinyRaise],
    },
    {
      id: "event-twitter-intern",
      kind: "role",
      date: "2022-11-18",
      end: "2022-12-20",
      title: "12-week Twitter internship — resigns in under six weeks",
      summary:
        "Joined to fix search and the login wall after publicly backing Musk's 'extremely hardcore' line; quit saying there was no real impact to make.",
      organization: "Twitter",
      sourceIds: [S.vergeTwitter],
    },
    {
      id: "event-comma-3x",
      kind: "project",
      date: "2023-07-30",
      title: "comma 3X at COMMA_CON 2023",
      summary: "$1,250 refinement of the comma three; blog announcement October 12.",
      organization: "comma.ai",
      sourceIds: [S.comma3X],
    },
    {
      id: "event-yudkowsky-debate",
      kind: "media",
      date: "2023-08-15",
      title: "Debates Eliezer Yudkowsky on AI safety",
      summary:
        "90-minute livestreamed debate moderated by Dwarkesh Patel; Hotz argues the anti-foom, pro-acceleration side.",
      sourceIds: [S.dwarkesh],
    },
    {
      id: "event-comma-four",
      kind: "project",
      date: "2025-11-09",
      title: "comma four launches at COMMA_CON 2025",
      summary:
        "$999 device one-fifth the 3X's size, built on comma's own San Diego SMT lines; announced November 25.",
      organization: "comma.ai",
      location: "San Diego, California",
      sourceIds: [S.commaFour, S.sdbj],
    },
    {
      id: "event-comma-exit",
      kind: "other",
      date: "2025-11",
      title: "comma.ai tenure ends",
      summary:
        "Reference records and his own profiles mark November 2025 as the end of his comma.ai roles; he continued promoting the comma four that month.",
      sourceIds: [S.wikipedia, S.linkedinFour],
    },
    {
      id: "event-chestnut",
      kind: "project",
      date: "2026-08-12",
      title: "comma ships 'chestnut'",
      summary:
        "GPU-over-USB accessory (from $249) that connects desktop GPUs to a comma four or computer via tinygrad drivers.",
      organization: "comma.ai",
      sourceIds: [S.commaShop],
    },
  ],
  themes: [
    {
      id: "theme-open-over-closed",
      kind: "philosophy",
      status: "stated",
      title: "Open beats closed",
      summary:
        "From 'information should be free' in 2007 to open-sourcing openpilot and building tinygrad in the open, his consistent line is that publishing the work beats protecting it — 'the Android of self-driving cars' against the vertically integrated incumbents.",
      sourceIds: [S.npr, S.arsOpenpilot, S.webSummit, S.tinygradRepo],
    },
    {
      id: "theme-small-teams",
      kind: "philosophy",
      status: "stated",
      title: "Small teams beat institutions",
      summary:
        "One person in a garage versus Google and Tesla; ~20 people at comma versus the auto industry; a handful at the tiny corp versus the GPU stack. He argues the 'farthest along' incumbents in a platform transition lose hardest — Nokia and BlackBerry are his examples.",
      sourceIds: [S.bloomberg, S.webSummit, S.latentSpace, S.sdbj],
    },
    {
      id: "theme-shippable-intermediaries",
      kind: "method",
      status: "stated",
      title: "Solve AI while delivering shippable intermediaries",
      summary:
        "The stated doctrine: pick the biggest end-goal, then sell the useful steps — driver assistance on the way to autonomy, the comma body on the way to 'a robot person', tinybox computers on the way to commoditized petaflops.",
      sourceIds: [S.commaBody, S.comma3X, S.tinygradOrg],
    },
    {
      id: "theme-adversary-institutions",
      kind: "practice",
      status: "reported",
      title: "Adversarial stance toward institutions",
      summary:
        "Sony's lawyers, the California DMV, NHTSA, Tesla PR, patent asserters — the press frames him as antagonist and he agrees, narrating each fight on his own channels and preferring public defiance (or exit) to quiet compliance.",
      sourceIds: [S.effJudgment, S.mittr, S.firstLawsuit, S.vergeTesla, S.geohotcom],
    },
    {
      id: "theme-work-in-public",
      kind: "practice",
      status: "reported",
      title: "Working in public as method",
      summary:
        "Livestreamed coding, open repositories, paid bounties for contributors, blog-post corporate announcements — transparency as both ideology and recruiting tool.",
      sourceIds: [S.tinygradOrg, S.openpilotRepo, S.heroesJourney, S.vergeTwitter],
    },
    {
      id: "theme-skeptic-of-hype",
      kind: "belief",
      status: "stated",
      title: "Skeptic of hype, bullish on the long game",
      summary:
        "He bet publicly that promised 2020-2022 robotaxi fleets would fail, called 'foom' an extraordinary claim in the Yudkowsky debate, yet calls AI 'the last problem humanity will ever have to solve' and plays 'for 10 years.'",
      sourceIds: [S.lex31, S.dwarkesh, S.enigmaPage],
    },
    {
      id: "theme-founder-not-ceo",
      kind: "belief",
      status: "stated",
      title: "Founder, not CEO",
      summary:
        "He fired himself as CEO in 2018, stepped back from operations in 2022, and says different company sizes need different people — a self-aware limit he repeats rather than a confession extracted by press.",
      sourceIds: [S.heroesJourney, S.tcCeo, S.vergeStepdown],
    },
    {
      id: "theme-performance-identity",
      kind: "method",
      status: "inferred",
      title: "The hacker persona as instrument",
      summary:
        "geohot, tomcr00se, the Sony diss rap, the garage demos, the internship-as-stunt at Twitter: provocation is how he recruits attention, talent, and leverage — and the record suggests the persona is deliberate craft, not accident.",
      sourceIds: [S.vergeRap, S.bloomberg, S.vergeTwitter, S.enigmaVideo],
    },
  ],
  works: [
    {
      id: "work-iphone-unlock",
      kind: "project",
      status: "completed",
      title: "iPhone carrier unlock",
      date: "2007-08",
      summary:
        "First publicly demonstrated SIM-lock removal on the original iPhone; free instructions published on his blog.",
      sourceIds: [S.nyt, S.npr],
    },
    {
      id: "work-blackra1n",
      kind: "project",
      status: "released",
      title: "blackra1n / limera1n / purplera1n",
      date: "2009-10",
      summary:
        "One-click iPhone jailbreak and unlock tools (2009-2010); blackra1n alone was claimed by Hotz to have 21 million users.",
      sourceIds: [S.wikipedia, S.enigmaVideo],
    },
    {
      id: "work-ps3-jailbreak",
      kind: "project",
      status: "released",
      title: "PlayStation 3 exploit and signing keys",
      date: "2010-01",
      summary:
        "Hypervisor-level exploit published January 26, 2010; the private key posted January 2, 2011 ended the console's security model and drew the Sony lawsuit.",
      sourceIds: [S.bbcPs3, S.registerPs3, S.sonyWiki],
    },
    {
      id: "work-towelroot",
      kind: "project",
      status: "released",
      title: "towelroot",
      date: "2014",
      summary: "One-tap Android root exploit covering most devices of its era.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-qira",
      kind: "project",
      status: "released",
      title: "Qira",
      date: "2014",
      summary:
        "Open-source timeless debugger built during his Project Zero stint; presented at USENIX Enigma 2016.",
      sourceIds: [S.enigmaPage, S.enigmaVideo],
    },
    {
      id: "work-comma",
      kind: "other",
      status: "ongoing",
      title: "comma.ai",
      date: "2015-09",
      location: "San Diego, California",
      summary:
        "The driver-assistance company he founded; sells comma devices running openpilot and reports a $1B valuation claim (self-stated, 2025).",
      sourceIds: [S.commaai, S.bloomberg, S.sdbj],
    },
    {
      id: "work-openpilot",
      kind: "project",
      status: "ongoing",
      title: "openpilot",
      date: "2016-11-30",
      summary:
        "Open-source driving agent performing adaptive cruise, lane centering, and lane changes on 325+ cars; ~64k GitHub stars and 100M+ reported user miles.",
      sourceIds: [S.openpilotRepo, S.arsOpenpilot, S.commaShop],
    },
    {
      id: "work-comma-one",
      kind: "product",
      status: "abandoned",
      title: "comma one",
      date: "2016-09",
      summary:
        "$999 aftermarket autonomy kit cancelled five weeks after announcement, following NHTSA's special order; superseded by the open-sourced stack.",
      sourceIds: [S.tcCommaOne, S.tcCancel],
    },
    {
      id: "work-comma-devices",
      kind: "product",
      status: "released",
      title: "comma two / three / 3X / four",
      date: "2020",
      summary:
        "The windshield devkit line: comma two (CES 2020, $999), comma three (2021, $2,199), comma 3X (2023, $1,250), comma four (COMMA_CON 2025, $999).",
      sourceIds: [S.openpilotWiki, S.commaThreePR, S.comma3X, S.commaFour],
    },
    {
      id: "work-comma-body",
      kind: "product",
      status: "released",
      title: "comma body",
      date: "2022-05-04",
      summary:
        "$999 balancing-robot devkit that runs openpilot; 'the future of people' per the launch post.",
      sourceIds: [S.commaBody, S.commaShop],
    },
    {
      id: "work-chestnut",
      kind: "product",
      status: "released",
      title: "chestnut",
      date: "2026-08-12",
      summary:
        "comma's GPU-over-USB accessory (from $249): desktop-class GPU compute for a comma four or PC, driven by tinygrad.",
      sourceIds: [S.commaShop],
    },
    {
      id: "work-tiny-corp",
      kind: "other",
      status: "ongoing",
      title: "the tiny corp",
      date: "2022-11-05",
      location: "San Diego, California",
      summary:
        "His AI-compute company: develops tinygrad, sells tinybox computers, hires via paid bounties; $5.1M raised May 2023.",
      sourceIds: [S.tinygradOrg, S.tinyRaise, S.wikipedia],
    },
    {
      id: "work-tinygrad",
      kind: "project",
      status: "ongoing",
      title: "tinygrad",
      date: "2020",
      summary:
        "A deliberately compact open-source neural-network framework — three op types cover complex networks — that also drives openpilot's models on comma hardware.",
      sourceIds: [S.tinygradRepo, S.tinygradOrg, S.wikipedia],
    },
    {
      id: "work-tinybox",
      kind: "product",
      status: "released",
      title: "tinybox",
      date: "2023",
      summary:
        "Multi-GPU AI workstations (~$15,000 at launch) sold at hardware margin; the line later added 'green' Blackwell boxes and a ~1-exaflop 'exabox' on 2027 preorder.",
      sourceIds: [S.tinygradOrg, S.latentSpace],
    },
    {
      id: "work-cheapeth",
      kind: "project",
      status: "abandoned",
      title: "cheapETH",
      date: "2020-02",
      summary: "Low-fee Ethereum-compatible side project.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-tomcr00se",
      kind: "recording",
      status: "ongoing",
      title: "tomcr00se",
      date: "2013",
      summary:
        "His rap alter ego on SoundCloud — launched with a diss track aimed at Sony mid-lawsuit; dozens of tracks since.",
      sourceIds: [S.vergeRap, S.geohotcom, S.wikipedia],
    },
  ],
  appearances: [
    {
      id: "appearance-npr-2007",
      title: "New Jersey Teen Says He Hacked iPhone",
      venue: "NPR",
      publishedAt: "2007-08-24",
      participants: ["George Hotz", "Adam Davidson"],
      summary:
        "The 17-year-old explains the unlock live: 'This was about opening up the device for everyone.'",
      media: [
        {
          type: "article",
          url: "https://www.npr.org/2007/08/24/13935744/new-jersey-teen-says-he-hacked-iphone",
          sourceId: S.npr,
        },
      ],
      sourceIds: [S.npr],
    },
    {
      id: "appearance-bbc-2010",
      title: "PlayStation 3 'hacked' by iPhone cracker",
      venue: "BBC News",
      publishedAt: "2010-01-25",
      participants: ["George Hotz"],
      summary:
        "Hotz tells the BBC the five-week PS3 hack is '5% hardware and 95% software' and that he may publish the root key.",
      sourceIds: [S.bbcPs3],
    },
    {
      id: "appearance-enigma-2016",
      title: "Timeless Debugging",
      venue: "USENIX Enigma 2016",
      publishedAt: "2016-02",
      participants: ["George Hotz"],
      summary:
        "Qira demo plus biography in his own voice: blackra1n's claimed 21M users, CTF war stories, and the first public comma.ai pitch.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=eGl6kpSajag",
          sourceId: S.enigmaVideo,
        },
      ],
      sourceIds: [S.enigmaPage, S.enigmaVideo],
    },
    {
      id: "appearance-disrupt-2016",
      title: "George 'Geohot' Hotz Presents the Comma One",
      venue: "TechCrunch Disrupt SF",
      publishedAt: "2016-09-13",
      participants: ["George Hotz", "Darrell Etherington"],
      summary: "Stage launch of the comma one, with trademark trash talk for rival autonomy startups.",
      media: [
        {
          type: "video",
          url: "https://techcrunch.com/video/george-geohot-hotz-presents-the-comma-one/",
          sourceId: S.tcCommaOne,
        },
      ],
      sourceIds: [S.tcCommaOne],
    },
    {
      id: "appearance-garage-2016",
      title: "comma.ai garage press conference",
      venue: "comma.ai garage, San Francisco",
      publishedAt: "2016-12-01",
      participants: ["George Hotz"],
      summary:
        "Opened with Warren G's 'Regulate' for the regulators; unveiled openpilot and the 3D-printable comma neo.",
      sourceIds: [S.vergeGarage],
    },
    {
      id: "appearance-websummit-2017",
      title: "Hack Your Way To A Self-Driving Car",
      venue: "Web Summit",
      publishedAt: "2017-11",
      participants: ["George Hotz"],
      summary:
        "The 'Android of self-driving cars' argument: incumbents don't understand software, the open platform wins.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=ePJbekKUU5U",
          sourceId: S.webSummit,
        },
      ],
      sourceIds: [S.webSummit],
    },
    {
      id: "appearance-sxsw-2019",
      title: "Jailbreaking the Simulation",
      venue: "SXSW",
      publishedAt: "2019-03",
      participants: ["George Hotz"],
      summary:
        "Memoir-meets-metaphysics talk: iPhone, Sony lawsuit, quitting Facebook, and why the simulation hypothesis is the right bet.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=ESXOAJRdcwQ",
          sourceId: S.sxsw,
        },
      ],
      sourceIds: [S.sxsw],
    },
    {
      id: "appearance-lex-31",
      title: "George Hotz: Comma.ai, OpenPilot, and Autonomous Vehicles",
      venue: "Lex Fridman Podcast #31",
      publishedAt: "2019-08-05",
      participants: ["George Hotz", "Lex Fridman"],
      summary:
        "First Lex appearance: the 10-year-game line and even-money bets against rivals' robotaxi timelines.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=iwcYp-XT7UI",
          sourceId: S.lex31,
        },
      ],
      sourceIds: [S.lex31],
    },
    {
      id: "appearance-lex-132",
      title: "George Hotz: Hacking the Simulation & Learning to Drive with Neural Nets",
      venue: "Lex Fridman Podcast #132",
      publishedAt: "2020-10",
      participants: ["George Hotz", "Lex Fridman"],
      summary:
        "Simulation talk, crypto bullishness ('Nakamoto consensus... one of the greatest innovations of the 21st century'), and how he thinks.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=_L3gNaAVjQ4",
          sourceId: S.lex132,
        },
      ],
      sourceIds: [S.lex132],
    },
    {
      id: "appearance-lex-387",
      title: "George Hotz: Tiny Corp, Twitter, AI Safety, Self-Driving, GPT, AGI & God",
      venue: "Lex Fridman Podcast #387",
      publishedAt: "2023-08",
      participants: ["George Hotz", "Lex Fridman"],
      summary:
        "Third Lex appearance: tiny corp, tinybox, the Twitter stint, and the case against AI-doom framing.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=dNrTrx42DGQ",
          sourceId: S.lex387,
        },
        {
          type: "transcript",
          url: "https://lexfridman.com/george-hotz-3-transcript/",
          sourceId: S.lex387Transcript,
        },
      ],
      sourceIds: [S.lex387, S.lex387Transcript],
    },
    {
      id: "appearance-dwarkesh-debate",
      title: "George Hotz vs Eliezer Yudkowsky",
      venue: "Dwarkesh Patel (livestream)",
      publishedAt: "2023-08-15",
      participants: ["George Hotz", "Eliezer Yudkowsky", "Dwarkesh Patel"],
      summary:
        "A 90-minute debate on AI safety: Hotz argues foom needs extraordinary evidence and that superintelligence is a problem for generations after his.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=6yQEA18C-XI",
          sourceId: S.dwarkesh,
        },
      ],
      sourceIds: [S.dwarkesh],
    },
    {
      id: "appearance-latentspace-2023",
      title: "Commoditizing the Petaflop",
      venue: "Latent Space",
      publishedAt: "2023-06-20",
      participants: ["George Hotz"],
      summary:
        "The tiny corp thesis: cheap, local, multi-vendor AI compute against the CUDA monoculture — and the tinybox as the wedge.",
      sourceIds: [S.latentSpace],
    },
  ],
  relations: [
    {
      id: "rel-comma-ai",
      kind: "founded",
      target: "comma-ai",
      targetName: "comma.ai",
      targetKind: "organization",
      note: "Founded comma.ai in September 2015 to build driver assistance with machine learning; the openpilot company.",
      sourceIds: [S.wikipedia, S.bloomberg],
    },
    {
      id: "rel-the-tiny-corp",
      kind: "founded",
      target: "the-tiny-corp",
      targetName: "the tiny corp",
      targetKind: "organization",
      note: "Founded the tiny corp on November 5, 2022 — the tinygrad framework and tinybox computers company.",
      sourceIds: [S.wikipedia, S.tinyRaise, S.latentSpace],
    },
  ],
  openQuestions: [
    "What is Hotz's actual status at comma.ai post-November-2025? Reference records and his own profile list the CEO/research roles as past, yet no formal announcement is catalogued and he still promotes comma products — founder-owner vs. employee is unresolved.",
    "How large was the Musk offer, really? Contemporaneous reporting supports only a 'multimillion-dollar' contingent bonus; the $12M figure circulating in later coverage lacks a primary citation here.",
    "Where is the boundary between Hotz's PS3 work and fail0verflow's? The signing keys followed their 27C3 ECDSA analysis; Sony's suit targeted Hotz as publisher, but credit assignment is contested.",
    "comma's reported metrics — 100M+ user miles, 325+ supported cars, the mid-2025 $1B valuation — are company-stated; independent verification is thin.",
    "The 2007 'first unlock' claim shares its week with a separate software-only method demoed via Engadget; Hotz's was the first publicly verified carrier unlock, but 'first to hack the iPhone' compresses a crowded timeline.",
    "Is the tiny corp's non-NVIDIA compute bet viable? comma itself was buying NVIDIA parts in 2025, and tinygrad's multi-vendor ambition versus its shipping reality is an open technical question.",
    "Early-life details (birthplace, schooling, ISEF record, the 21M blackra1n figure) rest heavily on Wikipedia and his own telling; primary documentation was not located in this pass.",
    "comma body shipped as a devkit, but the 'robot person' endgame — arms, knee, comma person — announced for 2022/2023 has no confirmed delivery in the record.",
  ],
  body: `George Hotz is the hacker who made a career out of proving that one person, in public, can beat institutions — and then built two companies on that thesis. As "geohot" he was the first person to carrier-unlock the iPhone (August 2007, age seventeen) and the first to publish a break of the PlayStation 3's security (January 2010), which drew a federal lawsuit from Sony that settled in April 2011. As a founder he built comma.ai — the openpilot driver-assistance system running on ~$1,000 windshield devices — and then the tiny corp, whose tinygrad framework and tinybox computers attack the cost of AI compute itself.

## The hacker era

Hotz grew up in Glen Rock, New Jersey, attended Bergen County Academies' engineering magnet program, and was a three-time Intel ISEF finalist — the 2007 entry, "I want a Holodeck," won a $20,000 scholarship. That same summer he spent ~500 hours defeating the iPhone's AT&T carrier lock with a soldering iron and software, then posted the instructions free: "This was about opening up the device for everyone," he told the New York Times, and "information should be free," he told NPR. The second unlocked unit he traded to CertiCell for a Nissan 350Z and three iPhones — the first signature geohot move: publish the knowledge, monetize the theater.

The PS3 arc repeated it at higher stakes. His January 2010 exploit — the first crack in a console that had stood for three years — led Sony to strip the OtherOS Linux feature from every PS3. After fail0verflow exposed Sony's ECDSA key-handling mistake at 27C3 in December 2010, Hotz posted the console's private signing key on his website. Sony Computer Entertainment America sued on January 11, 2011 (N.D. Cal. 3:11-cv-00167: DMCA, CFAA, and more), won a TRO and subpoenas covering even who had viewed his YouTube videos, and settled April 11-12, 2011 on a permanent injunction — $10,000 per breach, no admission of liability. Hotz marked the occasion by releasing a rap video mocking Sony and joining a boycott; the Sony subpoenas and the settlement's asymmetry — a hacker enjoined, a corporation unrepentant — made him a cause as much as a defendant.

Between the hacks he did the expected-and-quit circuit: Facebook (May 2011 to January 2012 — "they tell you it's your job to make the minutes number go up," he said at SXSW), back-to-back DEF CON CTF wins with CMU's Plaid Parliament of Pwning as "tomcr00se" (2013, 2014, plus a solo CSAW win), Google's Project Zero in July 2014 where he built the Qira timeless debugger, then Vicarious for the first half of 2015 — his first machine-learning job.

## comma.ai: the garage bet

In September 2015 he founded comma.ai and built a self-driving Acura ILX in about a month, documented in Ashlee Vance's December 2015 Bloomberg Businessweek profile. The same story broke the Elon Musk saga: Tesla had offered a deal — a "multimillion-dollar bonus ... that pays out as soon as we discontinue Mobileye" — and Hotz refused ("I'm not looking for a job. I'll ping you when I crush Mobileye"), saying Musk kept changing terms. Tesla publicly called the story inaccurate and a one-person autonomy effort "extremely unlikely" to reach production; the emails, at least in part, were real. It remains the cleanest distillation of his position: the institution's offer versus building the alternative in the open.

The next year wrote the company doctrine in two moves. In September 2016 he announced the comma one, a $999 aftermarket autonomy kit; on October 28 NHTSA's special order arrived — fifteen questions, $21,000-per-day penalty exposure. Rather than answer, Hotz cancelled the product outright ("would much rather spend my life building amazing tech than dealing with regulators"), and five weeks later open-sourced the entire stack: openpilot plus the 3D-printable comma neo hardware plans. "If we really want to be the Android of self-driving cars, we can't be charging $999." The regulator's move had inadvertently produced the company's founding strategy — open software, sold hardware, community ports.

The decade after is the shippable-intermediaries catalog: comma two at CES 2020 ($999; that October-November Consumer Reports ranked openpilot first among the ADAS systems it tested, ahead of Super Cruise and Autopilot), comma three (2021, $2,199), the comma body balancing-robot devkit (May 2022 — "from openpilot's perspective, the comma body is a car," and the first step toward "a robot person"), comma 3X (COMMA_CON 2023, $1,250), comma four (COMMA_CON 2025, $999, built on comma's own San Diego SMT lines), and the chestnut GPU-over-USB accessory (August 2026). The company claims 325+ supported cars and 100M+ user miles, and Hotz stated a $1 billion valuation in mid-2025 — company-reported figures the record does not independently confirm.

His relationship to running comma is deliberately distant. In September 2018 the board — which was only him — fired George Hotz as CEO so he could lead a research division. In October 2022's "The Hero's Journey" he took "some time away" entirely, keeping board seat and president title: "I don't think I'm capable of running a company like that. I've always heard it takes different people at different company sizes." By late November 2025 his profiles listed the comma roles as past tense — though he was still posting comma four promotions, which is the ambiguity the open questions preserve.

## The tiny corp and the public practice

On November 5, 2022 — days after the comma announcement — he founded the tiny corp, and in May 2023 announced $5.1 million raised "to commoditize the petaflop." The stack: tinygrad, a deliberately compact open-source neural-network framework that also powers openpilot's models; tinybox workstations sold at hardware margin ("we make money selling computers for more than they cost to make"); and hiring done through paid public bounties rather than resumes. The Latent Space interview frames the wager plainly — local, multi-vendor compute against a CUDA monoculture — while his own January 2025 posts concede the gap ("we are buying NVIDIA... nobody at comma wants to deal with AMD"), a hedge the index keeps visible rather than resolving.

Interleaved: the five-week Twitter internship (November-December 2022) that began as an "extremely hardcore" solidarity stunt and ended with "didn't think there was any real impact I could make"; the livestreamed coding sessions that constitute much of his public output; the tomcr00se SoundCloud rap catalog; cheapETH; the SXSW "Jailbreaking the Simulation" talk; three Lex Fridman appearances; and the August 2023 Dwarkesh-moderated debate where he argued Eliezer Yudkowsky's fast-takeoff scenario is an extraordinary claim requiring extraordinary evidence — while conceding superintelligence is likely real, just after his lifetime.

## The throughline

Across twenty years the pattern is consistent enough to state: identify the locked thing, break it in public, publish the method, refuse the institution's terms — settlement, regulator, or acquirer — and convert the fight into leverage for the next build. The epistemic seam worth preserving is that the record is substantially self-narrated: the garage demo, the emails, the valuation, the mileage figures, "the first person to hack the iPhone" itself (a software-only unlock surfaced the same week). His record is real where it matters — the unlock verified by the AP, the docket at N.D. Cal., the GitHub repositories, the CR test — and promotional where it flatters. Both are indexed, separately.

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

