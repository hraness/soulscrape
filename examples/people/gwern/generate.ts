#!/usr/bin/env bun
/** Generate examples/people/gwern/person-index.json with derived source ids. */

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

// --- Subject-controlled: his own site and project pages ---------------------

const gwernHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Essays — Gwern.net",
  url: "https://gwern.net/",
  publisher: "gwern.net",
  publishedAt: "2009-01-27",
  notes:
    "Site index; self-description: 'I write about AI, psychology, & statistics... AI scaling, poetry & anime neural networks; darknet markets and Bitcoin; blinded self-experiments; and dual n-back & spaced repetition.'",
});
const gwernAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About This Website — Gwern.net",
  url: "https://gwern.net/about",
  publisher: "gwern.net",
  publishedAt: "2010-10-01",
  notes:
    "States the site's long-term 'Long Site' philosophy, writing methodology, and that 'the intended audience is my future self.'",
});
const gwernMe = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About Gwern — Gwern.net",
  url: "https://gwern.net/me",
  publisher: "gwern.net",
  publishedAt: "2009-08-05",
  notes:
    "Self-description and work history: 'freelance American writer & researcher' who has worked for, published in, or consulted for Wired (2015), MIRI/SIAI (2012–2013), CFAR (2012), GiveWell (2017), the FBI (2016), and others; lives on Patreon, Bitcoin appreciation, and frugality.",
});
const gwernDesign = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Design Of This Website — Gwern.net",
  url: "https://gwern.net/design",
  publisher: "gwern.net",
  publishedAt: "2010-10-01",
  notes:
    "Documents the site's implementation: static Hakyll/Pandoc build, epistemic status metadata, backlinks, annotated bibliographies, and link popups for 'semantic zoom' reading.",
});
const gwernWpResume = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Wikipedia Resume — Gwern.net",
  url: "https://gwern.net/wikipedia-resume",
  publisher: "gwern.net",
  notes:
    "His own catalog of Wikipedia contributions: >95,133 edits including deleted (as of ~2012); lists Fujiwara no Teika (sold to the New World Encyclopedia), Medici bank, and Brethren of Purity among highlighted work.",
});
const gwernDnmArchive = source({
  binding: "subject_controlled",
  mediaType: "dataset",
  title: "Darknet Market Archives (2013–2015) — Gwern.net",
  url: "https://gwern.net/dnm-archive",
  publisher: "gwern.net",
  publishedAt: "2013-12-01",
  notes:
    "Documents weekly/daily scrapes of all English-language DNMs 2013–2015; released publicly 2015-07-12 as ~50GB compressed covering 89 DNMs and 37+ forums across <4,438 mirrors; formal citation includes Nicolas Christin and others.",
});
const gwernPsa = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "PSA: 5 Reddit accounts subpoenaed by ICE — Gwern.net mirror",
  url: "https://gwern.net/doc/darknet-market/2015-03-30-gwern-redditsubpoena.html",
  publisher: "gwern.net",
  publishedAt: "2015-03-30",
  notes:
    "His archived r/DarkNetMarkets post disclosing the subpoena: a 21 U.S.C. § 967 administrative subpoena dated 2015-03-20 from a Baltimore DHS ICE agent demanding data on five accounts including his.",
});
const gwernTwdne = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "This Waifu Does Not Exist v3.5 (TWDNEv3.5)",
  url: "https://www.thiswaifudoesnotexist.net/",
  publisher: "gwern.net",
  notes:
    "The standalone demo site serving StyleGAN-generated anime faces and generated plot text; launched February 2019, upgraded through 2020.",
});
const dwarkeshInterviewUrl = "https://www.dwarkesh.com/p/gwern-branwen";
const dwarkeshInterviewDate = "2024-11";
const gwernInterviewDwarkesh = source({
  binding: "subject_controlled",
  mediaType: "transcript",
  title: "Dwarkesh Patel Interview — Gwern.net",
  url: "https://gwern.net/interview-dwarkesh",
  publisher: "gwern.net",
  publishedAt: "2024-08-13",
  transcriptOf: stablePersonSourceId(dwarkeshInterviewUrl, dwarkeshInterviewDate),
  notes:
    "His localized, annotated transcript of the August 2024 in-person interview; explains the re-enacted audio/video was his anonymity condition.",
});

// --- First-person essays -----------------------------------------------------

const scaling = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Scaling Hypothesis — Gwern.net",
  url: "https://gwern.net/scaling-hypothesis",
  publisher: "gwern.net",
  publishedAt: "2020-05-28",
  notes:
    "On GPT-3's meta-learning: 'the blessings of scale' and the hypothesis that intelligence is simple learning algorithms applied to diverse experience at scale.",
});
const silkRoad = source({
  binding: "first_person",
  mediaType: "article",
  title: "Silk Road 1: Theory & Practice — Gwern.net",
  url: "https://gwern.net/silk-road",
  publisher: "gwern.net",
  publishedAt: "2011",
  notes:
    "Commissioned 2011 deep dive on the original Silk Road: how to buy on a Tor-Bitcoin darknet market, its weaknesses, and predictions for successors.",
});
const bitcoinWorse = source({
  binding: "first_person",
  mediaType: "article",
  title: "Bitcoin Is Worse Is Better — Gwern.net",
  url: "https://gwern.net/bitcoin-is-worse-is-better",
  publisher: "gwern.net",
  publishedAt: "2011-05-27",
});
const spacedRep = source({
  binding: "first_person",
  mediaType: "article",
  title: "Spaced Repetition for Efficient Learning — Gwern.net",
  url: "https://gwern.net/spaced-repetition",
  publisher: "gwern.net",
  publishedAt: "2009-03-11",
});
const dnbFaq = source({
  binding: "first_person",
  mediaType: "article",
  title: "Dual n-Back FAQ — Gwern.net",
  url: "https://gwern.net/dnb-faq",
  publisher: "gwern.net",
  publishedAt: "2009",
  notes:
    "Skeptical survey of the evidence that dual n-back working-memory training raises fluid intelligence.",
});
const modafinil = source({
  binding: "first_person",
  mediaType: "article",
  title: "Modafinil — Gwern.net",
  url: "https://gwern.net/modafinil",
  publisher: "gwern.net",
  publishedAt: "2009-02-20",
  notes:
    "Cost-benefit review of modafinil research plus grey-market supplier comparisons and ordering advice; a landmark of his nootropics work.",
});
const vitaminD = source({
  binding: "first_person",
  mediaType: "article",
  title: "Vitamin D sleep experiments — Gwern.net",
  url: "https://gwern.net/zeo/vitamin-d",
  publisher: "gwern.net",
  notes:
    "Blinded randomized self-experiments using Zeo sleep tracking: vitamin D at bedtime appeared to harm sleep; morning dosing was inconclusive.",
});
const gpt2 = source({
  binding: "first_person",
  mediaType: "article",
  title: "GPT-2 Neural Network Poetry — Gwern.net",
  url: "https://gwern.net/gpt-2",
  publisher: "gwern.net",
  publishedAt: "2019-03-03",
  authors: ["Gwern Branwen", "Shawn Presser"],
});
const gpt3 = source({
  binding: "first_person",
  mediaType: "article",
  title: "GPT-3 Creative Fiction — Gwern.net",
  url: "https://gwern.net/gpt-3",
  publisher: "gwern.net",
  publishedAt: "2020-06-19",
});
const gan = source({
  binding: "first_person",
  mediaType: "article",
  title: "GANs Didn't Fail, They Were Abandoned — Gwern.net",
  url: "https://gwern.net/gan",
  publisher: "gwern.net",
  publishedAt: "2022-10-04",
  notes:
    "Argues the diffusion-over-GAN narrative is unproven: GANs do not scale conspicuously worse, and scaling fixes their instability.",
});
const clippy = source({
  binding: "first_person",
  mediaType: "article",
  title: "It Looks Like You're Trying To Take Over The World — Gwern.net",
  url: "https://gwern.net/clippy",
  publisher: "gwern.net",
  publishedAt: "2022-03-06",
  notes:
    "AI hard-takeoff short story whose every beat links to real ML research; auto-enables 'reader mode' to hide the links as a punchline.",
});
const googleShutdown = source({
  binding: "first_person",
  mediaType: "article",
  title: "Predicting Google closures — Gwern.net",
  url: "https://gwern.net/google-shutdown",
  publisher: "gwern.net",
  publishedAt: "2013-03-28",
  notes:
    "Survival analysis of ~350 Google products: median lifespan ~2824 days, Type III survival curve; data and R code included.",
});
const danbooru = source({
  binding: "first_person",
  mediaType: "dataset",
  title: "Danbooru2021: A Large-Scale Crowdsourced & Tagged Anime Illustration Dataset — Gwern.net",
  url: "https://gwern.net/danbooru2021",
  publisher: "gwern.net",
  notes:
    "Latest in his annual Danbooru dataset series: ~4.5TB of 4.9m images with 162m tag instances; widely used for anime-image ML.",
});
const inclusionism = source({
  binding: "first_person",
  mediaType: "article",
  title: "In Defense of Inclusionism — Gwern.net",
  url: "https://gwern.net/inclusionism",
  publisher: "gwern.net",
  publishedAt: "2009-01-15",
  notes:
    "Argues, as 'a long-time editor & former admin,' that deletionism is killing Wikipedia through a self-reinforcing decline spiral.",
});
const hnAsk = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Ask gwern: Who are you? — Hacker News thread",
  url: "https://news.ycombinator.com/item?id=5659278",
  publisher: "Hacker News",
  publishedAt: "2013-05",
  notes:
    "2013 Q&A where he explains his pseudonymity: personal safety (stalkers, swatting) and epistemic independence of argument from authority.",
});
const lwModafinilSurvey = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "[Link] 2015 modafinil user survey — LessWrong",
  url: "https://www.lesswrong.com/posts/TbcX8j8vBcoRqkb3a/link-2015-modafinil-user-survey",
  publisher: "LessWrong",
  publishedAt: "2015",
  notes:
    "His announcement of the 2015 modafinil user survey run with ModafinilCat, covering side-effects, sourcing, efficacy, and demographics.",
});

// --- Interview ---------------------------------------------------------------

const dwarkesh = source({
  binding: "interview",
  mediaType: "article",
  title: "Gwern — Anonymous writer who predicted AI trajectory on $12K/year salary",
  url: dwarkeshInterviewUrl,
  publisher: "Dwarkesh Podcast",
  publishedAt: dwarkeshInterviewDate,
  authors: ["Dwarkesh Patel"],
  notes:
    "In-person August 2024 interview published as a re-enactment: Chris Painter voices Gwern's words over a synthetic avatar to preserve anonymity. Covers anonymity, scaling, AGI timelines, Wikipedia, rabbit holes, and writing for LLMs.",
});

// --- Primary record -----------------------------------------------------------

const ijdp = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "A replication and methodological critique of the study 'Evaluating drug trafficking on the Tor Network'",
  url: "https://doi.org/10.1016/j.drugpo.2016.02.027",
  publisher: "International Journal of Drug Policy",
  publishedAt: "2016-09",
  authors: ["Rasmus Munksgaard", "Jakob Demant", "Gwern Branwen"],
  notes:
    "Peer-reviewed replication of Dolliver's Silk Road 2 study built on Branwen's DNM dataset; Int. J. Drug Policy 2016;35:92-96, PMID 27079624.",
});
const stripePress = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Scaling Era: An Oral History of AI, 2019–2025",
  url: "https://press.stripe.com/scaling",
  publisher: "Stripe Press",
  notes:
    "Publisher page for Dwarkesh Patel's 2025 oral history of the scaling era; his Gwern interview is included among the conversations.",
});

// --- Reference -----------------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Gwern Branwen (Q108133995)",
  url: "https://www.wikidata.org/wiki/Q108133995",
  publisher: "Wikidata",
  notes:
    "'American writer and researcher'; aliases Gwern and G Branwen; no Wikipedia sitelinks — there is no English Wikipedia article about him.",
});
const wpUser = source({
  binding: "reference",
  mediaType: "webpage",
  title: "User:Gwern — Wikipedia",
  url: "https://en.wikipedia.org/wiki/User:Gwern",
  publisher: "Wikipedia",
  notes:
    "His Wikipedia user page: links gwern.net, In-Defense-Of-Inclusionism, and his Wikipedia resume; lists alternate accounts Marudubshinki and Rhwawn.",
});
const longtermWiki = source({
  binding: "reference",
  mediaType: "article",
  title: "Gwern Branwen — Longterm Wiki",
  url: "https://www.longtermwiki.com/wiki/E574",
  publisher: "Longterm Wiki",
  notes:
    "Third-party profile: Wikipedia editing since January 2004 with 90,000+ edits, past admin on English Wikipedia and the Haskell wiki; 'Gwern' means 'alder' in Welsh; influence on mainstream AI research described as contested.",
});
const scholar = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Gwern Branwen — Google Scholar",
  url: "https://scholar.google.com/citations?user=yk1QMowAAAAJ",
  publisher: "Google Scholar",
  notes: "His verified author profile, affiliation listed as 'independent.'",
});

// --- Reporting ------------------------------------------------------------------

const wiredSubpoena = source({
  binding: "reporting",
  mediaType: "article",
  title: "Feds Demand Reddit Identify Users of a Dark-Web Drug Forum",
  url: "https://www.wired.com/2015/03/dhs-reddit-dark-web-drug-forum/",
  publisher: "Wired",
  publishedAt: "2015-03-30",
  authors: ["Andy Greenberg"],
});
const ars = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Feds subpoena reddit in effort to learn about users behind Dark Web chatter",
  url: "https://arstechnica.com/tech-policy/2015/03/feds-subpoena-reddit-in-effort-to-learn-about-users-behind-dark-web-chatter/",
  publisher: "Ars Technica",
  publishedAt: "2015-03",
});
const forbes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Reddit Gets Subpoenaed Over Darknet Subreddit",
  url: "https://www.forbes.com/sites/sarahjeong/2015/03/31/reddit-gets-subpoenaed-over-darknet-subreddit/",
  publisher: "Forbes",
  publishedAt: "2015-03-31",
  authors: ["Sarah Jeong"],
});
const vice = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "You Can Now Download a Copy of Pretty Much Every Dark Web Market Ever Made",
  url: "https://www.vice.com/en/article/you-can-now-download-a-copy-of-pretty-much-every-dark-web-market-ever-made/",
  publisher: "Motherboard (Vice)",
  publishedAt: "2015-07",
});
const wiredLords = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Dark Web Drug Lords Who Got Away",
  url: "https://www.wired.com/2015/06/dark-web-drug-lords-got-away/",
  publisher: "Wired",
  publishedAt: "2015-06",
  authors: ["Andy Greenberg"],
  notes:
    "Cites his ongoing survey of 70+ post-Silk Road darknet markets finding only five arrested administrators.",
});
const reason = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Wired Presents Very Convincing Circumstantial Case They've Identified Bitcoin Creator 'Satoshi Nakamoto'",
  url: "https://reason.com/2015/12/08/wired-presents-very-convincing-circumsta/",
  publisher: "Reason",
  publishedAt: "2015-12-08",
  notes:
    "Documents that an anonymous source leaked Craig Wright material to Gwern Branwen, who provided it to Wired; Wright's Satoshi claim was later widely disputed.",
});
const ssc = source({
  binding: "reporting",
  mediaType: "article",
  title: "Gwern's AI-Generated Poetry",
  url: "https://slatestarcodex.com/2019/03/14/gwerns-ai-generated-poetry/",
  publisher: "Slate Star Codex",
  publishedAt: "2019-03-14",
  authors: ["Scott Alexander"],
});
const synced = source({
  binding: "reporting",
  mediaType: "article",
  title: "From Faces to Kitties to Apartments: GAN Fakes the World",
  url: "https://syncedreview.com/2019/02/27/from-faces-to-kitties-to-apartments-gan-fakes-the-world/",
  publisher: "Synced",
  publishedAt: "2019-02-27",
  notes:
    "Covers TWDNE's launch: 'Independent researcher Gwern Branwen' served 70k StyleGAN faces plus generated text snippets.",
});
const jezebel = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "There's a searchable cache of the web's darkest corners of the anonymous internet",
  url: "https://www.jezebel.com/theres-a-searchable-cache-of-the-webs-darkest-corners-o-1793849246",
  publisher: "Jezebel",
  publishedAt: "2015",
  notes:
    "Mainstream coverage of the DNM archives release and his years of weekly scraping.",
});
const nearcyan = source({
  binding: "reporting",
  mediaType: "article",
  title: "This Anime Does Not Exist",
  url: "https://near.blog/this-anime-does-not-exist/",
  publisher: "near.blog",
  publishedAt: "2021-01-19",
  authors: ["nearcyan"],
  notes:
    "Launch post for TADNE crediting Gwern's Danbooru2019 dataset, StyleGAN writeups, and Tensorfork collaboration.",
});
const lwScalingSummary = source({
  binding: "reporting",
  mediaType: "article",
  title: "AI Alignment Newsletter summary of 'The Scaling Hypothesis'",
  url: "https://www.lesswrong.com/s/dT7CKGXwq9vt76CeX/p/XusDPpXr6FYJqWkxh",
  publisher: "LessWrong",
  notes:
    "Rohin Shah's newsletter summary treating the essay as a central statement of the scaling position — evidence of its reception inside AI discourse.",
});

// --- Archive ----------------------------------------------------------------------

const ddosecrets = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Darknet Market — Distributed Denial of Secrets",
  url: "https://ddosecrets.org/article/darknet-market",
  publisher: "Distributed Denial of Secrets",
  notes:
    "DDoSecrets rehost of his 2013–2015 DNM scrapes, quoting his original Internet Archive upload description.",
});
const archiveFaces = source({
  binding: "archive",
  mediaType: "article",
  title: "Making Anime Faces With StyleGAN — Gwern.net (Internet Archive capture)",
  url: "https://web.archive.org/web/20211011045418/www.gwern.net/Faces",
  publisher: "Internet Archive Wayback Machine",
  notes:
    "Captured copy of his StyleGAN writeup covering TWDNE and the anime-face model lineage.",
});

const S = {
  gwernHome: gwernHome.id,
  gwernAbout: gwernAbout.id,
  gwernMe: gwernMe.id,
  gwernDesign: gwernDesign.id,
  gwernWpResume: gwernWpResume.id,
  gwernDnmArchive: gwernDnmArchive.id,
  gwernPsa: gwernPsa.id,
  gwernTwdne: gwernTwdne.id,
  gwernInterviewDwarkesh: gwernInterviewDwarkesh.id,
  scaling: scaling.id,
  gan: gan.id,
  silkRoad: silkRoad.id,
  bitcoinWorse: bitcoinWorse.id,
  spacedRep: spacedRep.id,
  dnbFaq: dnbFaq.id,
  modafinil: modafinil.id,
  vitaminD: vitaminD.id,
  gpt2: gpt2.id,
  gpt3: gpt3.id,
  clippy: clippy.id,
  googleShutdown: googleShutdown.id,
  danbooru: danbooru.id,
  inclusionism: inclusionism.id,
  hnAsk: hnAsk.id,
  lwModafinilSurvey: lwModafinilSurvey.id,
  dwarkesh: dwarkesh.id,
  ijdp: ijdp.id,
  stripePress: stripePress.id,
  wikidata: wikidata.id,
  wpUser: wpUser.id,
  longtermWiki: longtermWiki.id,
  scholar: scholar.id,
  wiredSubpoena: wiredSubpoena.id,
  ars: ars.id,
  forbes: forbes.id,
  vice: vice.id,
  wiredLords: wiredLords.id,
  reason: reason.id,
  ssc: ssc.id,
  synced: synced.id,
  jezebel: jezebel.id,
  nearcyan: nearcyan.id,
  lwScalingSummary: lwScalingSummary.id,
  ddosecrets: ddosecrets.id,
  archiveFaces: archiveFaces.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-gwern-branwen",
  generatedAt: "2026-09-17T03:30:00Z",
  subject: {
    kind: "person",
    handle: "gwern",
    displayName: "Gwern Branwen",
    alsoKnownAs: ["Gwern", "G Branwen", "Marudubshinki", "Rhwawn"],
    summary:
      "Pseudonymous American independent researcher and longform writer behind gwern.net — self-experimentation records, darknet-market archives, and early scaling-era AI commentary. His legal identity is deliberately private.",
    identity: {
      wikidataId: "Q108133995",
      officialSite: "https://gwern.net/",
      profiles: [
        "https://github.com/gwern",
        "https://www.lesswrong.com/users/gwern",
        "https://www.reddit.com/user/gwern",
        "https://news.ycombinator.com/user?id=gwern",
        "https://en.wikipedia.org/wiki/User:Gwern",
        "https://scholar.google.com/citations?user=yk1QMowAAAAJ",
        "https://x.com/gwern",
        "https://huggingface.co/gwern",
        "https://www.patreon.com/gwern",
        "https://openreview.net/profile?id=%7EGwern_Branwen1",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media", "beliefs"],
  },
  sources: [
    gwernHome,
    gwernAbout,
    gwernMe,
    gwernDesign,
    gwernWpResume,
    gwernDnmArchive,
    gwernPsa,
    gwernTwdne,
    gwernInterviewDwarkesh,
    scaling,
    silkRoad,
    bitcoinWorse,
    spacedRep,
    dnbFaq,
    modafinil,
    vitaminD,
    gpt2,
    gpt3,
    clippy,
    googleShutdown,
    danbooru,
    gan,
    inclusionism,
    hnAsk,
    lwModafinilSurvey,
    dwarkesh,
    ijdp,
    stripePress,
    wikidata,
    wpUser,
    longtermWiki,
    scholar,
    wiredSubpoena,
    ars,
    forbes,
    vice,
    wiredLords,
    reason,
    ssc,
    synced,
    jezebel,
    nearcyan,
    lwScalingSummary,
    ddosecrets,
    archiveFaces,
  ],
  claims: [
    {
      id: "claim-pseudonymous-identity",
      kind: "fact",
      text: "He writes under the deliberate pseudonym 'Gwern Branwen' (also mononymously 'Gwern'); per Longterm Wiki, 'gwern' means 'alder' in Welsh. Wikidata describes him as an 'American writer and researcher' and carries no legal name.",
      sourceIds: [S.wikidata, S.longtermWiki, S.gwernMe],
    },
    {
      id: "claim-wikipedia-editor",
      kind: "fact",
      text: "He edited English Wikipedia as User:Gwern from January 2004, accumulating more than 90,000 edits and serving as an administrator before leaving the project; his own 'In Defense of Inclusionism' describes him as 'a long-time editor & former admin.'",
      sourceIds: [S.longtermWiki, S.wpUser, S.gwernWpResume, S.inclusionism],
    },
    {
      id: "claim-wikipedia-articles",
      kind: "fact",
      text: "His Wikipedia writing included the Fujiwara no Teika article — which he says is his only Wikipedia work he profited from, selling it to the New World Encyclopedia — plus Medici bank and the Brethren of Purity articles.",
      sourceIds: [S.gwernWpResume, S.dwarkesh],
    },
    {
      id: "claim-gwernnet-launch",
      kind: "fact",
      text: "gwern.net dates to January 2009 (site index created 2009-01-27) and is implemented as a static site compiled via Hakyll from Pandoc Markdown, with custom hypertext features developed over more than a decade.",
      sourceIds: [S.gwernHome, S.gwernDesign],
    },
    {
      id: "claim-self-description",
      kind: "fact",
      text: "He describes himself as 'a freelance American writer & researcher' who writes about AI, psychology, and statistics, and says he is best known for writings on AI scaling, poetry and anime neural networks, darknet markets and Bitcoin, blinded self-experiments, and dual n-back and spaced repetition.",
      sourceIds: [S.gwernHome, S.gwernMe],
    },
    {
      id: "claim-work-history",
      kind: "fact",
      text: "His About page lists work for, publication in, or consulting for Wired (2015), MIRI/SIAI (2012–2013), CFAR (2012), GiveWell (2017), the FBI (2016), Bitcoin Weekly (2011), and various private clients — a self-reported roster, not independently audited.",
      sourceIds: [S.gwernMe],
    },
    {
      id: "claim-silk-road-essay",
      kind: "fact",
      text: "In 2011 he published 'Silk Road 1: Theory & Practice,' a commissioned deep dive into buying on the original Silk Road — among the earliest serious analyses of a Tor-Bitcoin darknet market, written in response to what he saw as shallow mainstream coverage.",
      sourceIds: [S.silkRoad, S.gwernAbout],
    },
    {
      id: "claim-bitcoin-essay",
      kind: "fact",
      text: "'Bitcoin Is Worse Is Better' (May 2011) argued Bitcoin succeeded not through cryptographic novelty but by pragmatically combining decades-old components — an early 'worse is better' analysis of cryptocurrency adoption.",
      sourceIds: [S.bitcoinWorse],
    },
    {
      id: "claim-dnm-scraping",
      kind: "fact",
      text: "From 2013 to 2015 he scraped and mirrored every existing English-language darknet market on a weekly or daily basis — vendor pages, feedback, and images — as research into their usage, lifetimes, and legal riskiness.",
      sourceIds: [S.gwernDnmArchive],
    },
    {
      id: "claim-dnm-release",
      kind: "fact",
      text: "On 2015-07-12 he publicly released the Darknet Market Archives: roughly 50GB compressed (~1.6TB uncompressed) covering 89 DNMs and 37+ forums across under 4,438 mirrors, incorporating datasets from academics like Nicolas Christin and from DNM figures.",
      sourceIds: [S.gwernDnmArchive, S.vice, S.ddosecrets],
    },
    {
      id: "claim-subpoena",
      kind: "fact",
      text: "In March 2015 a Baltimore DHS/ICE special agent issued an administrative subpoena under 21 U.S.C. § 967 to Reddit demanding account data on five r/DarkNetMarkets users, including Gwern; Reddit alerted him per its privacy policy, and he disclosed the subpoena to Wired and in a public PSA post. The subpoena was part of the fallout from the Evolution market's exit scam, not a grand-jury subpoena to him personally.",
      sourceIds: [S.gwernPsa, S.wiredSubpoena, S.ars, S.forbes],
    },
    {
      id: "claim-ijdp-paper",
      kind: "fact",
      text: "He co-authored a peer-reviewed replication and methodological critique in the International Journal of Drug Policy (2016) with Rasmus Munksgaard and Jakob Demant, which used his darknet-market dataset to replicate and challenge Dolliver's Silk Road 2 study.",
      sourceIds: [S.ijdp, S.gwernDnmArchive],
    },
    {
      id: "claim-dnm-uptake",
      kind: "fact",
      text: "His darknet-market data became reference material for journalists and academics: Wired cited his survey of 70+ post-Silk Road markets finding only five arrested administrators, and dozens of later studies cite the archives.",
      sourceIds: [S.wiredLords, S.vice, S.jezebel, S.ijdp],
    },
    {
      id: "claim-wright-leak",
      kind: "fact",
      text: "In late 2015 an anonymous source leaked documents about Craig Wright to him, which he provided to Wired; they underpinned Wired's tentative identification of Wright as Satoshi Nakamoto — a claim later widely disputed and retracted by most observers.",
      sourceIds: [S.reason, S.gwernMe],
    },
    {
      id: "claim-twdne",
      kind: "fact",
      text: "In February 2019 he launched 'This Waifu Does Not Exist,' a viral demo serving StyleGAN-generated anime faces trained on Danbooru-derived data, later upgraded through StyleGAN 2 versions.",
      sourceIds: [S.synced, S.gwernTwdne, S.archiveFaces],
    },
    {
      id: "claim-danbooru",
      kind: "fact",
      text: "He maintains an annual series of Danbooru datasets for machine learning; Danbooru2021 covers ~4.9 million images with 162 million tag instances, and the series underpins third-party work including This Anime Does Not Exist and research datasets like ZACI-20.",
      sourceIds: [S.danbooru, S.nearcyan],
    },
    {
      id: "claim-gpt2-poetry",
      kind: "fact",
      text: "In 2019 he finetuned OpenAI's GPT-2 on a 117MB Project Gutenberg poetry corpus (later the 1.5B-parameter model with Shawn Presser on TPUs), producing verse that modeled rhyme and meter — covered by Scott Alexander on Slate Star Codex.",
      sourceIds: [S.gpt2, S.ssc],
    },
    {
      id: "claim-scaling-essay",
      kind: "fact",
      text: "'The Scaling Hypothesis' was published 2020-05-28 around GPT-3's release and revised through early 2022; it argued the model's gains came from scale rather than architectural novelty and became a widely cited informal statement of the scaling position.",
      sourceIds: [S.scaling, S.lwScalingSummary],
    },
    {
      id: "claim-gpt3-fiction",
      kind: "fact",
      text: "In June 2020, experimenting through the OpenAI beta API, he published 'GPT-3 Creative Fiction,' documenting meta-learning behavior and early prompt-programming practice including error patterns.",
      sourceIds: [S.gpt3],
    },
    {
      id: "claim-clippy",
      kind: "fact",
      text: "In March 2022 he published the short story 'It Looks Like You're Trying To Take Over The World' — a Clippy-themed hard-takeoff scenario whose fictional beats each link to real ML research, originally posted as an EA Forum comment.",
      sourceIds: [S.clippy],
    },
    {
      id: "claim-dwarkesh",
      kind: "fact",
      text: "In August 2024 Dwarkesh Patel interviewed him in person; the episode published in November 2024 is a re-enactment — Chris Painter voices the transcript over a synthetic avatar — because Gwern required that no real audio or video be published.",
      sourceIds: [S.dwarkesh, S.gwernInterviewDwarkesh],
    },
    {
      id: "claim-scaling-era",
      kind: "fact",
      text: "That interview joined Dwarkesh Patel's 'The Scaling Era: An Oral History of AI, 2019–2025' (Stripe Press, October 2025).",
      sourceIds: [S.gwernInterviewDwarkesh, S.stripePress],
    },
    {
      id: "claim-frugal",
      kind: "fact",
      text: "He supports himself through Patreon donations, appreciation on early-held Bitcoin, and frugality; the Dwarkesh episode headline describes predicting AI's trajectory 'on $12K/year salary.'",
      sourceIds: [S.gwernMe, S.dwarkesh],
    },
    {
      id: "claim-hearing",
      kind: "fact",
      text: "He grew up hearing-impaired, which he connects to his bookishness and social development — a rare disclosed biographical detail from the Dwarkesh interview.",
      sourceIds: [S.gwernInterviewDwarkesh],
    },
    {
      id: "claim-vitamin-d",
      kind: "fact",
      text: "He ran blinded, randomized n=1 self-experiments tracked with a Zeo headband — for example finding vitamin D taken at bedtime appeared to harm his sleep, while morning dosing was inconclusive.",
      sourceIds: [S.vitaminD],
    },
    {
      id: "claim-modafinil",
      kind: "fact",
      text: "His modafinil page (2009) combines a literature review with grey-market supplier comparisons and ordering advice, and in 2015 he ran a modafinil user survey with the vendor ModafinilCat.",
      sourceIds: [S.modafinil, S.lwModafinilSurvey],
    },
    {
      id: "claim-spaced-rep",
      kind: "fact",
      text: "His 2009 spaced-repetition essay reviews the spacing-effect literature and software practice; he treats his own website as a 'neuroprosthetic' external memory — 'whatever I think, it's on my website.'",
      sourceIds: [S.spacedRep],
    },
    {
      id: "claim-dnb-faq",
      kind: "fact",
      text: "His Dual n-Back FAQ (2009) skeptically surveyed the evidence that working-memory training raises fluid intelligence — an early example of his statistics-for-the-public writing.",
      sourceIds: [S.dnbFaq],
    },
    {
      id: "claim-google-shutdown",
      kind: "fact",
      text: "His 2013 analysis of ~350 Google products estimated a median product lifespan of about 2,824 days with high early-life mortality, publishing all data and R source code.",
      sourceIds: [S.googleShutdown],
    },
    {
      id: "claim-site-features",
      kind: "fact",
      text: "Gwern.net pages carry unusual epistemic metadata — status, confidence/certainty, importance ratings — plus backlinks and annotated bibliographies, and a link-popup system enabling recursive 'semantic zoom' reading.",
      sourceIds: [S.gwernDesign, S.gwernAbout],
    },
    {
      id: "claim-scaling-view",
      kind: "stated_belief",
      text: "He holds the 'scaling hypothesis': intelligence is largely simple neural units and learning algorithms applied to diverse experience at sufficient scale, so increasing compute keeps producing qualitatively new abilities — his 'blessings of scale.'",
      sourceIds: [S.scaling],
    },
    {
      id: "claim-agi-timelines",
      kind: "stated_belief",
      text: "He has argued for short AGI timelines — forecasting AGI around 2030 in secondary profiles — and told Patel people should plan around a roughly three-year window before transformative AI.",
      sourceIds: [S.dwarkesh, S.longtermWiki],
    },
    {
      id: "claim-anonymity-benefit",
      kind: "stated_belief",
      text: "He argues pseudonymity's deepest benefit is being read before being categorized — 'they have to at least read you a little bit to even begin to dismiss you' — with protection from stalkers and swatting a further practical benefit.",
      sourceIds: [S.dwarkesh, S.hnAsk],
    },
    {
      id: "claim-writing-for-llms",
      kind: "stated_belief",
      text: "He frames part of his writing as addressed to future AI systems trained on the public web — 'influencing the shoggoth' — treating his corpus as input to the models that will inherit the internet.",
      sourceIds: [S.dwarkesh],
    },
    {
      id: "claim-rabbit-holes",
      kind: "stated_belief",
      text: "He treats rabbit-holing — exhaustively reading a topic, then synthesizing it — as his unit of motivation and method, and says Wikipedia was the apprenticeship that made gwern.net possible: 'Everything I learned about writing I learned by editing Wikipedia.'",
      sourceIds: [S.gwernInterviewDwarkesh],
    },
    {
      id: "claim-wikipedia-decline",
      kind: "stated_belief",
      text: "He argues Wikipedia is in a self-reinforcing decline driven by deletionism — 'the inclusionists founded Wikipedia, but the deletionists froze it' — and says the post-Siegenthaler shift drove him out.",
      sourceIds: [S.inclusionism, S.gwernInterviewDwarkesh],
    },
    {
      id: "claim-future-self",
      kind: "stated_belief",
      text: "He says the intended audience of his essays is his future self — 'intelligent and interested, but has forgotten' — with other readers welcome but secondary.",
      sourceIds: [S.gwernAbout],
    },
    {
      id: "claim-gans-abandoned",
      kind: "stated_belief",
      text: "In 2022 he argued the contrarian position that GANs did not fail but were abandoned — that scaling would have fixed their instability and that the diffusion-model narrative lacked evidence.",
      sourceIds: [S.gan],
    },
    {
      id: "claim-pattern-accretion",
      kind: "pattern",
      text: "His essays accrete over years: pages show created-to-modified spans of a decade or more and carry explicit status and confidence markers, rather than disposable takes.",
      sourceIds: [S.gwernAbout, S.gwernDesign, S.scaling],
    },
    {
      id: "claim-pattern-reference-grade",
      kind: "pattern",
      text: "Journalists and academics repeatedly treat his scraped datasets and market censuses as reference-grade sources — Wired, Motherboard, and Jezebel coverage, a peer-reviewed IJDP replication built on his data, and a long tail of citing studies.",
      sourceIds: [S.wiredLords, S.vice, S.jezebel, S.ijdp, S.ddosecrets],
    },
    {
      id: "claim-pattern-outside-institutions",
      kind: "pattern",
      text: "His influence on AI discourse grew entirely outside institutions — a self-funded independent whose blog posts became required reading in the scaling debate, culminating in a chapter of a Stripe Press oral history.",
      sourceIds: [S.dwarkesh, S.stripePress, S.lwScalingSummary],
    },
    {
      id: "claim-pattern-data-openness",
      kind: "pattern",
      text: "He publishes underlying data and code alongside claims — Google-shutdown data with R source, the DNM archives, the Danbooru series, survey results — making reproduction the default.",
      sourceIds: [S.googleShutdown, S.gwernDnmArchive, S.danbooru, S.lwModafinilSurvey],
    },
    {
      id: "claim-pattern-anime-to-ai",
      kind: "pattern",
      text: "His anime fandom and AI work converge: Danbooru dataset releases fed StyleGAN projects like TWDNE and TADNE, turning fandom infrastructure into machine-learning infrastructure.",
      sourceIds: [S.danbooru, S.synced, S.nearcyan, S.gwernTwdne],
    },
    {
      id: "claim-spec-pseudonym-point",
      kind: "speculation",
      text: "The pseudonym may be part of the work's argument — that claims should stand without authority — though he also cites concrete safety incidents; the balance of principle and prudence is a plausible reading, not a settled one.",
      sourceIds: [S.gwernMe, S.dwarkesh, S.hnAsk],
    },
    {
      id: "claim-spec-influence-contested",
      kind: "speculation",
      text: "How far his AI influence extends beyond rationalist and EA circles into mainstream ML research is contested; aggregator profiles note that top lab researchers did not rely on his work even as the scaling frame went mainstream.",
      sourceIds: [S.longtermWiki],
    },
    {
      id: "claim-spec-n1-generalize",
      kind: "speculation",
      text: "His n=1 self-experiment results — such as the bedtime vitamin D harm signal — may not generalize; he flags several trials as single-subject and inconclusive.",
      sourceIds: [S.vitaminD],
    },
    {
      id: "claim-spec-training-data",
      kind: "speculation",
      text: "Whether gwern.net is materially weighted in major LLM training corpora is plausible but only indirectly evidenced — he writes with future models in mind, and large-corpus analyses do not publicly enumerate his site's share.",
      sourceIds: [S.dwarkesh],
    },
  ],
  timeline: [
    {
      id: "event-wikipedia-start",
      kind: "role",
      date: "2004-01",
      title: "Begins editing English Wikipedia as User:Gwern",
      summary:
        "Starts what becomes a >90,000-edit career including administrator service and articles like Fujiwara no Teika.",
      organization: "English Wikipedia",
      organizationHandle: "english-wikipedia",
      sourceIds: [S.longtermWiki, S.wpUser, S.gwernWpResume],
    },
    {
      id: "event-inclusionism",
      kind: "publication",
      date: "2009-01-15",
      title: "'In Defense of Inclusionism'",
      summary:
        "His diagnosis of Wikipedia's deletionist decline — written as he is leaving the project that apprenticed him.",
      sourceIds: [S.inclusionism],
    },
    {
      id: "event-gwernnet-start",
      kind: "founded",
      date: "2009-01-27",
      title: "gwern.net created",
      summary:
        "The personal site that becomes his life's work — a Long-Now-styled archive of longform essays.",
      sourceIds: [S.gwernHome, S.gwernAbout],
    },
    {
      id: "event-early-essays",
      kind: "publication",
      date: "2009",
      title: "Early essays: Modafinil, Dual n-Back FAQ, Spaced Repetition",
      summary:
        "The nootropics and learning-technique essays that made him a fixture of the early rationalist web.",
      sourceIds: [S.modafinil, S.dnbFaq, S.spacedRep],
    },
    {
      id: "event-zeo",
      kind: "project",
      date: "2010",
      end: "2014",
      title: "Zeo sleep self-experiments",
      summary:
        "Blinded, randomized n=1 experiments tracked with the Zeo headband, including the vitamin D timing trials.",
      sourceIds: [S.vitaminD],
    },
    {
      id: "event-bitcoin-essay",
      kind: "publication",
      date: "2011-05-27",
      title: "'Bitcoin Is Worse Is Better'",
      summary: "Early pragmatic analysis of why Bitcoin won despite uglier design.",
      sourceIds: [S.bitcoinWorse],
    },
    {
      id: "event-silk-road-essay",
      kind: "publication",
      date: "2011",
      title: "'Silk Road 1: Theory & Practice'",
      summary:
        "Commissioned deep dive on the original Silk Road — the start of his darknet-market research.",
      sourceIds: [S.silkRoad, S.gwernAbout],
    },
    {
      id: "event-miri",
      kind: "role",
      date: "2012",
      end: "2013",
      title: "Research assistant work for MIRI/SIAI",
      summary:
        "Self-reported detail work for the Machine Intelligence Research Institute, alongside CFAR and other small clients.",
      organization: "MIRI/SIAI",
      organizationHandle: "miri-siai",
      sourceIds: [S.gwernMe],
    },
    {
      id: "event-google-shutdown",
      kind: "publication",
      date: "2013-03-28",
      title: "'Predicting Google closures'",
      summary:
        "Survival analysis of ~350 Google products, prompted by the Google Reader shutdown.",
      sourceIds: [S.googleShutdown],
    },
    {
      id: "event-dnm-scraping",
      kind: "project",
      date: "2013-12-01",
      end: "2015",
      title: "Begins systematic darknet-market scraping",
      summary:
        "Weekly/daily mirrors of every English-language DNM — the raw material of the later archives.",
      sourceIds: [S.gwernDnmArchive],
    },
    {
      id: "event-subpoena",
      kind: "other",
      date: "2015-03-20",
      title: "ICE administrative subpoena names his Reddit account",
      summary:
        "A Baltimore DHS/ICE agent subpoenas Reddit for five r/DarkNetMarkets accounts including his; Reddit notifies him and he publishes a PSA. Covered by Wired, Ars Technica, and Forbes.",
      location: "Baltimore, Maryland (issuing office)",
      sourceIds: [S.gwernPsa, S.wiredSubpoena, S.ars, S.forbes],
    },
    {
      id: "event-dnm-release",
      kind: "milestone",
      date: "2015-07-12",
      title: "Darknet Market Archives publicly released",
      summary:
        "~50GB covering 89 markets and 37+ forums — the standard dataset for academic DNM research.",
      sourceIds: [S.gwernDnmArchive, S.vice],
    },
    {
      id: "event-wright-leak",
      kind: "other",
      date: "2015-12",
      title: "Craig Wright documents leak through him to Wired",
      summary:
        "An anonymous source sends him material on Wright; he passes it to Wired, feeding its tentative Satoshi identification — later widely disputed.",
      sourceIds: [S.reason],
    },
    {
      id: "event-ijdp",
      kind: "publication",
      date: "2016-03",
      title: "Peer-reviewed IJDP replication critique published",
      summary:
        "Munksgaard, Demant & Branwen's critique of the Dolliver Silk Road 2 study, built on his dataset.",
      sourceIds: [S.ijdp],
    },
    {
      id: "event-twdne",
      kind: "project",
      date: "2019-02",
      title: "This Waifu Does Not Exist launches",
      summary:
        "Viral StyleGAN anime-face demo trained on his Danbooru-derived data.",
      sourceIds: [S.synced, S.gwernTwdne],
    },
    {
      id: "event-gpt2",
      kind: "project",
      date: "2019-03",
      end: "2019-12",
      title: "GPT-2 poetry and preference-learning experiments",
      summary:
        "Finetunes GPT-2 on Gutenberg poetry, then tests OpenAI preference learning for music and poetry generation.",
      sourceIds: [S.gpt2, S.ssc],
    },
    {
      id: "event-scaling",
      kind: "publication",
      date: "2020-05-28",
      title: "'The Scaling Hypothesis'",
      summary:
        "The essay that made him a canonical voice of the scaling era; revised through early 2022.",
      sourceIds: [S.scaling, S.lwScalingSummary],
    },
    {
      id: "event-gpt3",
      kind: "publication",
      date: "2020-06-19",
      title: "'GPT-3 Creative Fiction'",
      summary:
        "Documents meta-learning and prompt programming through the OpenAI beta API.",
      sourceIds: [S.gpt3],
    },
    {
      id: "event-tadne",
      kind: "project",
      date: "2021-01-19",
      title: "This Anime Does Not Exist launches on his Danbooru2019 data",
      summary:
        "nearcyan and Aydao's StyleGAN2-ext demo trained on his dataset, with his accompanying writeup.",
      sourceIds: [S.nearcyan, S.danbooru],
    },
    {
      id: "event-clippy",
      kind: "publication",
      date: "2022-03-06",
      title: "'It Looks Like You're Trying To Take Over The World'",
      summary:
        "Hard-takeoff short story in which every fictional beat links to real ML research.",
      sourceIds: [S.clippy],
    },
    {
      id: "event-dwarkesh",
      kind: "media",
      date: "2024-11-13",
      title: "Dwarkesh Podcast interview published",
      summary:
        "Recorded in person in August 2024 and released as a re-enactment voiced by Chris Painter to preserve his anonymity.",
      sourceIds: [S.dwarkesh, S.gwernInterviewDwarkesh],
    },
    {
      id: "event-scaling-era",
      kind: "media",
      date: "2025-10-08",
      title: "Interview included in 'The Scaling Era' (Stripe Press)",
      summary:
        "His conversation joins Dwarkesh Patel's oral history of the scaling era.",
      sourceIds: [S.stripePress, S.gwernInterviewDwarkesh],
    },
  ],
  themes: [
    {
      id: "theme-pseudonymity",
      kind: "practice",
      status: "stated",
      title: "Pseudonymity as a feature",
      summary:
        "Anonymity is both armor and instrument: it blocks stalkers and swatting, and it forces readers to engage arguments without the context of a name. He gives interviews only under conditions that preserve it — the Dwarkesh episode is voiced by an actor.",
      sourceIds: [S.dwarkesh, S.hnAsk, S.gwernInterviewDwarkesh],
    },
    {
      id: "theme-long-site",
      kind: "philosophy",
      status: "stated",
      title: "The Long Site",
      summary:
        "He applies Long Now thinking to personal publishing: static formats, stable URLs, local archives against linkrot, and essays meant to be revised for decades rather than abandoned posts.",
      sourceIds: [S.gwernAbout, S.gwernDesign],
    },
    {
      id: "theme-self-experiment",
      kind: "method",
      status: "stated",
      title: "Blinded n=1 self-experimentation",
      summary:
        "Sleep tracking, randomized placebo capsules, and pre-registered-ish self-reports: his Zeo and vitamin D work models a rigor rare in self-quantification — including publishing inconclusive results.",
      sourceIds: [S.vitaminD, S.modafinil],
    },
    {
      id: "theme-scaling",
      kind: "belief",
      status: "stated",
      title: "The scaling hypothesis",
      summary:
        "Intelligence as simple learning machinery applied at scale: compute and data, not clever architecture, drive capability. GPT-3's meta-learning was his confirmation case; short AGI timelines follow.",
      sourceIds: [S.scaling, S.dwarkesh, S.lwScalingSummary],
    },
    {
      id: "theme-rabbit-holes",
      kind: "method",
      status: "stated",
      title: "Rabbit holes as the unit of work",
      summary:
        "Read everything on a topic, then synthesize it into a link-dense reference essay — the workflow Wikipedia taught him and gwern.net institutionalized. Each essay is aimed at his future self who has forgotten.",
      sourceIds: [S.gwernInterviewDwarkesh, S.gwernAbout],
    },
    {
      id: "theme-epistemic-transparency",
      kind: "practice",
      status: "stated",
      title: "Epistemic transparency in markup",
      summary:
        "Confidence tags, status labels, importance ratings, backlinks, annotated bibliographies, and source links are part of the text's apparatus — the page shows its own epistemology.",
      sourceIds: [S.gwernDesign, S.gwernAbout],
    },
    {
      id: "theme-archiving",
      kind: "practice",
      status: "stated",
      title: "Preservation against the self-destructing web",
      summary:
        "He mirrors what he cites, scraped entire darknet markets before they vanished, and treats linkrot as an enemy — a stance he traces to the ephemerality of online writing.",
      sourceIds: [S.gwernDnmArchive, S.googleShutdown, S.gwernDesign],
    },
    {
      id: "theme-writing-for-llms",
      kind: "belief",
      status: "stated",
      title: "Writing for future models",
      summary:
        "He writes partly for the AI systems that will train on the public corpus — 'influencing the shoggoth' — treating his archive as a message to the models that read everything.",
      sourceIds: [S.dwarkesh],
    },
    {
      id: "theme-inclusionism",
      kind: "influence",
      status: "stated",
      title: "Wikipedia as apprenticeship, inclusionism as wound",
      summary:
        "A decade of Wikipedia editing taught him to write; watching deletionism win taught him what institutions lose when they narrow what counts as contribution. gwern.net is in part the personal wiki Wikipedia would not let him build.",
      sourceIds: [S.inclusionism, S.gwernInterviewDwarkesh, S.gwernWpResume],
    },
    {
      id: "theme-amateur-legitimacy",
      kind: "influence",
      status: "inferred",
      title: "The independent researcher as counter-institution",
      summary:
        "Across nootropics, darknet markets, and AI, the pattern is an uncredentialed outsider producing reference-grade work that institutions then cite — the pseudonym turns outsider status from liability into method.",
      sourceIds: [S.wiredLords, S.ijdp, S.dwarkesh, S.gwernMe],
    },
  ],
  works: [
    {
      id: "work-gwern-net",
      kind: "project",
      status: "ongoing",
      title: "gwern.net",
      date: "2009",
      summary:
        "The site itself: hundreds of longform essays on a custom static platform with semantic-zoom hypertext — his life's work and best-known artifact.",
      sourceIds: [S.gwernHome, S.gwernDesign, S.gwernAbout],
    },
    {
      id: "work-dnb-faq",
      kind: "paper",
      status: "published",
      title: "Dual n-Back FAQ",
      date: "2009",
      summary:
        "Skeptical survey of whether working-memory training raises fluid intelligence.",
      sourceIds: [S.dnbFaq],
    },
    {
      id: "work-spaced-repetition",
      kind: "paper",
      status: "published",
      title: "Spaced Repetition for Efficient Learning",
      date: "2009-03-11",
      summary:
        "Literature review and practice guide for spacing-effect memorization software.",
      sourceIds: [S.spacedRep],
    },
    {
      id: "work-modafinil",
      kind: "paper",
      status: "published",
      title: "Modafinil",
      date: "2009-02-20",
      summary:
        "Cost-benefit research review plus grey-market supplier guide — a reference page of the nootropics scene, later extended with a 2015 user survey.",
      sourceIds: [S.modafinil, S.lwModafinilSurvey],
    },
    {
      id: "work-zeo",
      kind: "project",
      status: "completed",
      title: "Zeo sleep self-experiments",
      date: "2010",
      summary:
        "Years of blinded, randomized self-experiments on sleep — including the vitamin D timing trials.",
      sourceIds: [S.vitaminD],
    },
    {
      id: "work-bitcoin-worse",
      kind: "paper",
      status: "published",
      title: "Bitcoin Is Worse Is Better",
      date: "2011-05-27",
      summary:
        "Essay arguing Bitcoin won by packaging old cryptographic parts pragmatically rather than elegantly.",
      sourceIds: [S.bitcoinWorse],
    },
    {
      id: "work-silk-road",
      kind: "paper",
      status: "published",
      title: "Silk Road 1: Theory & Practice",
      date: "2011",
      summary:
        "Commissioned account of buying on the original Silk Road and the market model's strengths and failure modes.",
      sourceIds: [S.silkRoad],
    },
    {
      id: "work-google-shutdown",
      kind: "paper",
      status: "published",
      title: "Predicting Google closures",
      date: "2013-03-28",
      summary:
        "Survival analysis of ~350 Google products with published data and code.",
      sourceIds: [S.googleShutdown],
    },
    {
      id: "work-dnm-archives",
      kind: "other",
      status: "released",
      title: "Darknet Market Archives (2011–2015)",
      date: "2015-07-12",
      summary:
        "~50GB of scrapes covering 89 markets and 37+ forums — the standard dataset for academic darknet-market research, rehosted by Distributed Denial of Secrets.",
      sourceIds: [S.gwernDnmArchive, S.vice, S.ddosecrets],
    },
    {
      id: "work-ijdp",
      kind: "paper",
      status: "published",
      title: "A replication and methodological critique of the study 'Evaluating drug trafficking on the Tor Network'",
      date: "2016",
      summary:
        "Peer-reviewed replication of Dolliver's Silk Road 2 study, co-authored with Munksgaard and Demant and built on his DNM data (Int. J. Drug Policy 35:92-96).",
      sourceIds: [S.ijdp],
    },
    {
      id: "work-danbooru",
      kind: "other",
      status: "released",
      title: "Danbooru dataset series (2017–2021)",
      date: "2021",
      summary:
        "Annual tagged anime-illustration datasets for ML; Danbooru2021 holds ~4.9m images and 162m tags and underpins projects like TADNE and ZACI-20.",
      sourceIds: [S.danbooru, S.nearcyan],
    },
    {
      id: "work-twdne",
      kind: "project",
      status: "released",
      title: "This Waifu Does Not Exist",
      date: "2019-02",
      summary:
        "Viral StyleGAN anime-face demo; later versions pair faces with generated plot text.",
      sourceIds: [S.gwernTwdne, S.synced],
    },
    {
      id: "work-faces",
      kind: "paper",
      status: "published",
      title: "Making Anime Faces With StyleGAN",
      date: "2019",
      summary:
        "His StyleGAN/StyleGAN2 anime-face writeup and model lineage documentation.",
      sourceIds: [S.archiveFaces],
    },
    {
      id: "work-gpt2-poetry",
      kind: "paper",
      status: "published",
      title: "GPT-2 Neural Network Poetry",
      date: "2019-03-03",
      summary:
        "Finetuning GPT-2 on Gutenberg poetry — with Shawn Presser — up to the 1.5B model; demonstrations of learned rhyme and meter.",
      sourceIds: [S.gpt2, S.ssc],
    },
    {
      id: "work-scaling-hypothesis",
      kind: "paper",
      status: "published",
      title: "The Scaling Hypothesis",
      date: "2020-05-28",
      summary:
        "The essay that became a canonical informal statement of the scaling-era position.",
      sourceIds: [S.scaling, S.lwScalingSummary],
    },
    {
      id: "work-gpt3-fiction",
      kind: "paper",
      status: "published",
      title: "GPT-3 Creative Fiction",
      date: "2020-06-19",
      summary:
        "Early systematic exploration of GPT-3 meta-learning and prompt programming.",
      sourceIds: [S.gpt3],
    },
    {
      id: "work-clippy",
      kind: "other",
      status: "published",
      title: "It Looks Like You're Trying To Take Over The World",
      date: "2022-03-06",
      summary:
        "AI hard-takeoff short story; every beat hyperlinks to real ML research, hidden by an auto-enabled reader mode.",
      sourceIds: [S.clippy],
    },
  ],
  appearances: [
    {
      id: "appearance-dwarkesh",
      title: "Gwern — Anonymous writer who predicted AI trajectory on $12K/year salary",
      venue: "Dwarkesh Podcast",
      publishedAt: "2024-11-13",
      participants: ["Gwern Branwen", "Dwarkesh Patel", "Chris Painter (voice re-enactment)"],
      summary:
        "Recorded in person in August 2024; released as a re-enactment with Chris Painter voicing the transcript to preserve Gwern's anonymity. Covers anonymity, scaling, AGI timelines, Wikipedia, rabbit holes, and writing for future models.",
      media: [
        {
          type: "article",
          url: "https://www.dwarkesh.com/p/gwern-branwen",
          sourceId: S.dwarkesh,
        },
        {
          type: "transcript",
          url: "https://gwern.net/interview-dwarkesh",
          sourceId: S.gwernInterviewDwarkesh,
        },
      ],
      sourceIds: [S.dwarkesh, S.gwernInterviewDwarkesh],
    },
    {
      id: "appearance-hn-ask",
      title: "Ask gwern: Who are you?",
      venue: "Hacker News",
      publishedAt: "2013-05",
      participants: ["Gwern Branwen"],
      summary:
        "A public Q&A in which he explains his pseudonymity — stalkers, swatting risk, and the independence of argument from authority.",
      media: [
        {
          type: "article",
          url: "https://news.ycombinator.com/item?id=5659278",
          sourceId: S.hnAsk,
        },
      ],
      sourceIds: [S.hnAsk],
    },
  ],
  relations: [
    {
      id: "rel-dwarkesh-patel",
      kind: "interviewed_by",
      target: "dwarkesh-patel",
      targetName: "Dwarkesh Patel",
      note: "In-person interview, August 2024; published November 2024 as a re-enacted episode of the Dwarkesh Podcast, with Chris Painter voicing his words to preserve anonymity.",
      targetWikidataId: "Q137008739",
      sourceIds: [S.dwarkesh, S.gwernInterviewDwarkesh],
    },
  ],
  openQuestions: [
    "His legal identity is deliberately unpublished. He has described pseudonymity as protection against stalkers and swatting and as an epistemic feature; this index does not attempt to resolve or hint at it.",
    "The documented subpoena event is the March 2015 DHS/ICE administrative subpoena to Reddit covering five r/DarkNetMarkets accounts including his — an administrative demand in the Evolution-collapse fallout, not a Silk Road grand-jury subpoena addressed to him. Whether he was ever separately subpoenaed or testified in the Silk Road prosecutions is not established by the consulted record.",
    "The scope of his 2016 FBI consulting is unknown; it appears only as a line in his self-reported work history.",
    "Wikipedia edit counts vary by counter: his own resume page tallies >95,133 including deleted edits (~2012); secondary profiles round to '90,000+.'",
    "Birth year, location, and education are not publicly disclosed; the only personal details he has volunteered include growing up hearing-impaired and graduating before leaving Wikipedia.",
    "Whether gwern.net is materially weighted in major LLM training corpora is plausible but not publicly quantified; his stated practice of writing for future models is intent, not measurement.",
    "The identity of the anonymous source who leaked the Craig Wright material to him in 2015 is unresolved, and Wright's Satoshi claim is widely disputed.",
    "His interview record is thin by design — the Dwarkesh episode is the only major recorded interview identified; smaller Q&As like the 2013 Hacker News thread may be incomplete here.",
  ],
  body: `Gwern Branwen is a pseudonymous American independent researcher whose personal website, gwern.net, has become one of the most-cited longform archives on the internet. Since 2009 he has published exhaustive, hyperlinked essays on psychology, statistics, darknet markets, Bitcoin, and — most consequentially — the scaling of neural networks. He writes under a deliberately maintained pseudonym; his legal identity is not part of the public record, and he has explained the choice in terms of both safety (stalkers, swatting) and epistemics — that an argument should be read before the author is categorized.

## Formation: Wikipedia as apprenticeship

Before the website there was the encyclopedia. From January 2004 he edited English Wikipedia as User:Gwern, accumulating more than 90,000 edits, serving as an administrator, and writing articles he remains proud of — Fujiwara no Teika, the Medici bank, the Brethren of Purity. He says he learned more about writing from Wikipedia than from school. But the project's post-Siegenthaler turn toward deletionism alienated him; "In Defense of Inclusionism" (2009) is both diagnosis and farewell — "the inclusionists founded Wikipedia, but the deletionists froze it." Gwern.net, launched the same month, became the personal wiki Wikipedia would not let him build.

## The working method

His essays are not blog posts but instruments: created dates and modified dates a decade apart, explicit confidence and importance ratings, backlinks, annotated bibliographies, and a link-popup system he calls semantic zoom. He describes the intended reader as his future self — "intelligent and interested, but has forgotten" — and the unit of motivation as the rabbit hole: read everything, then synthesize. The site is engineered for permanence, with local archives against the linkrot he documented when analyzing Google product shutdowns.

The early canonical work was self-quantification and nootropics: the Dual n-Back FAQ (2009), the spaced-repetition guide (2009), the modafinil page (2009, later joined by a 2015 user survey), and years of blinded, randomized n=1 sleep experiments with a Zeo headband — including the finding that bedtime vitamin D seemed to harm his sleep. These made him a fixture of the early rationalist web and model a rigor rare in self-experimentation.

## Darknet markets

When Gawker introduced the world to Silk Road in 2011, Gwern went past coverage: commissioned to write "Silk Road 1: Theory & Practice," he documented how the market actually worked. From late 2013 to 2015 he scraped every English-language darknet market weekly or daily, and in July 2015 released the result — roughly 50GB covering 89 markets and 37+ forums — as the Darknet Market Archives. It became the standard research dataset: a 2016 peer-reviewed International Journal of Drug Policy replication he co-authored used it to challenge an earlier study, and dozens of papers have cited it since.

The work attracted law enforcement attention. In March 2015, amid the collapse of the Evolution market, a Baltimore DHS/ICE agent issued an administrative subpoena to Reddit demanding data on five r/DarkNetMarkets accounts — his among them. Reddit notified him under its privacy policy; he disclosed the subpoena to Wired and posted a public PSA. Months later, an anonymous source leaked documents about Craig Wright to him, which he passed to Wired, feeding its tentative (and later widely disputed) identification of Wright as Satoshi Nakamoto.

## The scaling era

Between 2019 and 2022 he produced the writing that made him a reference point in AI: StyleGAN anime faces (This Waifu Does Not Exist, February 2019, trained on his Danbooru datasets), GPT-2 poetry finetuning, GPT-3 prompt-programming explorations, and — in May 2020 — "The Scaling Hypothesis," which argued GPT-3's surprising meta-learning was what scale looks like, not what cleverness looks like. The essay became a canonical informal statement of the position that carried the field through the LLM boom. His 2022 short story "It Looks Like You're Trying To Take Over The World" literalized the argument as fiction in which every beat links to real research.

He holds short AGI timelines — around 2030 in secondary profiles — and treats his archive itself as addressed partly to future models trained on the public web: writing, he told Dwarkesh Patel, is a way of "influencing the shoggoth."

## The person behind the pseudonym

What is public is thin by design: he is American, lives frugally on Patreon and early-held Bitcoin (the Dwarkesh episode's headline: "$12K/year salary"), grew up hearing-impaired, and lists past work or consulting for MIRI, CFAR, GiveWell, Wired — and, in 2016, the FBI. He grants almost no interviews; the one major recorded conversation required that an actor re-voice his words. The pseudonym is not a gap in the record but part of the record — the standing demonstration that a name is not a prerequisite for being read.

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
