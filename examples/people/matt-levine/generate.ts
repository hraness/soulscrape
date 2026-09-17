#!/usr/bin/env bun
/** Generate examples/people/matt-levine/person-index.json with derived source ids. */

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

// --- Subject-controlled pages --------------------------------------------

const levineAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — Matt Levine",
  url: "https://mattlevine.co/about",
  publisher: "mattlevine.co",
  notes:
    "The subject's own bio page; lists his career sequence and links his Wikipedia article followed by '??'.",
});
const levineWork = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Work — Matt Levine",
  url: "https://mattlevine.co/work",
  publisher: "mattlevine.co",
  notes: "His own work page: Money Stuff, The Crypto Story, and the Dealbreaker author archive.",
});
const bbergBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Matt Levine — Bloomberg Opinion Columnist",
  url: "https://www.bloomberg.com/opinion/authors/ARbTQlRLRjE/matthew-s-levine",
  publisher: "Bloomberg Opinion",
  notes: "Employer bio page and column archive.",
});

// --- Reference -------------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Matt Levine (Q76361123)",
  url: "https://www.wikidata.org/wiki/Q76361123",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Matt Levine (columnist)",
  url: "https://en.wikipedia.org/wiki/Matt_Levine_(columnist)",
  publisher: "Wikipedia",
  notes:
    "Short and lightly sourced; used for discovery and cross-checking rather than sole authority.",
});

// --- Employer and reference records ---------------------------------------

const bbergHire = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Matt Levine Joins Bloomberg View",
  url: "https://www.bloomberg.com/company/press/matt-levine-joins-bloomberg-view/",
  publisher: "Bloomberg LP",
  publishedAt: "2013-09-04",
  notes:
    "Hiring announcement: Dealbreaker since 2011, four years at Goldman structuring equity derivatives, earlier writing for the Wall Street Journal, CNN.com, The Billfold, and Planet Money's 'Ask a Banker'.",
});
const bbergMediaCrypto = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Bloomberg Businessweek Publishes Special Issue on Crypto",
  url: "https://www.bloombergmedia.com/press/bloomberg-businessweek-publishes-special-issue-on-crypto/",
  publisher: "Bloomberg Media",
  publishedAt: "2022-10-25",
});
const loebPress = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Bloomberg Nominated for Seven Gerald Loeb Awards",
  url: "https://www.bloombergmedia.com/press/bloomberg-nominated-for-seven-gerald-loeb-awards/",
  publisher: "Bloomberg Media",
  publishedAt: "2023",
  notes: "Lists 'The Crypto Story' as a 2023 Loeb Awards explanatory finalist.",
});
const yaleLaw = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "From Law to Money Stuff: A Conversation with Matt Levine '04 of Bloomberg Opinion",
  url: "https://law.yale.edu/yls-today/yale-law-school-events/law-money-stuff-conversation-matt-levine-04-bloomberg-opinion",
  publisher: "Yale Law School",
  notes: "Law school event page confirming the Yale J.D. class of 2004.",
});
const sabew = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Matt Levine — SABEW Chicago 2015",
  url: "https://sabewchicago2015.sched.com/speaker/mattlevine1",
  publisher: "SABEW / Sched",
  publishedAt: "2015",
  notes: "Speaker bio from a 2015 business-journalism conference appearance.",
});

// --- First-person writing ---------------------------------------------------

const dealbreaker = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Articles by Matt Levine — Dealbreaker",
  url: "https://dealbreaker.com/author/mlevine",
  publisher: "Dealbreaker",
  notes: "His Dealbreaker author archive; coverage is 2011–2013 and may be incomplete.",
});
const levineWallSt = source({
  binding: "first_person",
  mediaType: "article",
  title: "Levine on Wall Street: Secret Trusts and Bullet-Proof Vests",
  url: "https://www.bloomberg.com/opinion/articles/2014-05-13/levine-on-wall-street-secret-trusts-and-bullet-proof-vests",
  publisher: "Bloomberg View",
  publishedAt: "2014-05-13",
  authors: ["Matt Levine"],
  notes: "Evidence that the column originally ran under the title 'Levine on Wall Street'.",
});
const philanthropyPower = source({
  binding: "first_person",
  mediaType: "article",
  title: "Philanthropy and Power",
  url: "https://www.bloomberg.com/opinion/articles/2015-06-04/philanthropy-and-power",
  publisher: "Bloomberg View",
  publishedAt: "2015-06-04",
  authors: ["Matt Levine"],
  notes:
    "The column mocking John Paulson's Harvard gift that, per later reporting, prompted Paulson to call Michael Bloomberg.",
});
const eisf2019 = source({
  binding: "first_person",
  mediaType: "article",
  title: "Everything Everywhere Is Securities Fraud",
  url: "https://www.bloomberg.com/opinion/articles/2019-06-26/everything-everywhere-is-securities-fraud",
  publisher: "Bloomberg Opinion",
  publishedAt: "2019-06-26",
  authors: ["Matt Levine"],
});
const gamestonk = source({
  binding: "first_person",
  mediaType: "article",
  title: "Money Stuff: GameStonk Rocket Rocket Rocket",
  url: "https://www.bloomberg.com/news/newsletters/2021-01-27/reddit-driven-surge-puts-gamestop-and-ryan-cohen-in-a-weird-spot-kkfof4sn",
  publisher: "Bloomberg",
  publishedAt: "2021-01-27",
  authors: ["Matt Levine"],
});
const elonMarkets = source({
  binding: "first_person",
  mediaType: "article",
  title: "Elon Musk Tweets: Great News For Bitcoin, Bad News for Econ Majors",
  url: "https://www.bloomberg.com/opinion/articles/2021-02-10/elon-musk-tweets-great-news-for-bitcoin-bad-news-for-econ-majors",
  publisher: "Bloomberg Opinion",
  publishedAt: "2021-02-10",
  authors: ["Matt Levine"],
  notes: "The column that named the 'Elon Markets Hypothesis' as a running lens.",
});
const cryptoStory = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Crypto Story",
  url: "https://www.bloomberg.com/features/2022-the-crypto-story/",
  publisher: "Bloomberg Businessweek",
  publishedAt: "2022-10-25",
  authors: ["Matt Levine"],
  notes:
    "His ~40,000-word essay that filled the entire October 31, 2022 issue of Bloomberg Businessweek.",
});
const cryptoFtx = source({
  binding: "first_person",
  mediaType: "article",
  title: "Matt Levine on What the FTX Collapse Means for the Crypto Story",
  url: "https://www.bloomberg.com/features/2022-the-crypto-story-FTX-collapse-matt-levine/",
  publisher: "Bloomberg Businessweek",
  authors: ["Matt Levine"],
  notes: "Post-FTX addendum published weeks after the Crypto Story issue.",
});
const ftxBalance = source({
  binding: "first_person",
  mediaType: "article",
  title: "FTX's Balance Sheet Was Bad",
  url: "https://www.bloomberg.com/opinion/articles/2022-11-14/ftx-s-balance-sheet-was-bad",
  publisher: "Bloomberg Opinion",
  publishedAt: "2022-11-14",
  authors: ["Matt Levine"],
});
const putBitcoins = source({
  binding: "first_person",
  mediaType: "article",
  title: "Put the Bitcoins in the Box",
  url: "https://www.bloomberg.com/opinion/articles/2024-01-04/put-the-bitcoins-in-the-box",
  publisher: "Bloomberg Opinion",
  publishedAt: "2024-01-04",
  authors: ["Matt Levine"],
  notes:
    "Frames crypto as 'a laboratory for rediscovering central intuitions about finance.'",
});
const murderSf = source({
  binding: "first_person",
  mediaType: "article",
  title: "Is Murder Securities Fraud?",
  url: "https://www.bloomberg.com/opinion/newsletters/2025-05-12/is-murder-securities-fraud",
  publisher: "Bloomberg Opinion",
  publishedAt: "2025-05-12",
  authors: ["Matt Levine"],
  notes:
    "A 2025 restatement of the 'everything is securities fraud' rule of thumb taken to an extreme case.",
});
const podcastIntro = source({
  binding: "first_person",
  mediaType: "audio",
  title: "Introducing: Money Stuff: The Podcast",
  url: "https://www.bloomberg.com/news/audio/2024-04-11/introducing-money-stuff-the-podcast",
  publisher: "Bloomberg",
  publishedAt: "2024-04-11",
  notes: "Trailer for the weekly podcast he co-hosts with Katie Greifeld.",
});

// --- Interviews -------------------------------------------------------------

const reynolds = source({
  binding: "interview",
  mediaType: "article",
  title: "Bloomberg's Matt Levine talks on being a finance columnist",
  url: "https://businessjournalism.org/2014/08/bloomberg-matt-levine-financial-columnist/",
  publisher: "Reynolds Center (businessjournalism.org)",
  publishedAt: "2014-08-25",
  notes: "Email Q&A; also records his 2014 Gerald Loeb commentary-finalist honor.",
});
const cwt = source({
  binding: "interview",
  mediaType: "audio",
  title: "Matt Levine Live at Bloomberg HQ (Ep. 34)",
  url: "https://conversationswithtyler.com/episodes/matt-levine/",
  publisher: "Conversations with Tyler",
  publishedAt: "2018-02-14",
  authors: ["Tyler Cowen"],
});
const cwtTranscript = source({
  binding: "interview",
  mediaType: "transcript",
  title: "My Conversation with Matt Levine",
  url: "https://marginalrevolution.com/marginalrevolution/2018/02/conversation-matt-levine.html",
  publisher: "Marginal Revolution",
  publishedAt: "2018-02-14",
  authors: ["Tyler Cowen"],
  transcriptOf: cwt.id,
});
const recode = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Bloomberg's Matt Levine explains Wall Street, WeWork, and how to leave Goldman Sachs for a much lower-paying job",
  url: "https://www.vox.com/recode/2019/11/11/20958336/bloomberg-matt-levine-wall-street-wework-goldman-sachs-podcast-recode-media",
  publisher: "Vox / Recode Media",
  publishedAt: "2019-11-11",
  authors: ["Peter Kafka"],
});
const stayTuned = source({
  binding: "interview",
  mediaType: "article",
  title: "Everything is Securities Fraud? (with Matt Levine)",
  url: "https://cafe.com/stay-tuned/everything-is-securities-fraud-with-matt-levine/",
  publisher: "CAFE Studios — Stay Tuned with Preet",
  publishedAt: "2021-05-27",
  authors: ["Preet Bharara"],
  notes: "Episode page carries a full transcript.",
});
const policyPunch = source({
  binding: "interview",
  mediaType: "webpage",
  title: "Matt Levine: King of *The* Financial Newsletter",
  url: "https://www.policypunchline.com/episodes/2021/6/28/matt-levine-king-of-the-financial-newsletter",
  publisher: "Policy Punchline",
  publishedAt: "2021-06-28",
});
const oddLots2021 = source({
  binding: "interview",
  mediaType: "audio",
  title: "Sam Bankman-Fried and Matt Levine on How the Crypto Market Really Works",
  url: "https://www.bloomberg.com/news/audio/2021-08-04/how-the-crypto-market-really-works-podcast",
  publisher: "Bloomberg — Odd Lots",
  publishedAt: "2021-08-04",
  authors: ["Joe Weisenthal", "Tracy Alloway"],
});
const oddLots2022 = source({
  binding: "interview",
  mediaType: "audio",
  title: "Sam Bankman-Fried and Matt Levine on How to Make Money in Crypto",
  url: "https://www.bloomberg.com/news/articles/2022-04-25/sam-bankman-fried-and-matt-levine-on-how-to-make-money-in-crypto",
  publisher: "Bloomberg — Odd Lots",
  publishedAt: "2022-04-25",
  authors: ["Joe Weisenthal", "Tracy Alloway"],
  notes:
    "The 'put the tokens in the box' interview; the exchange later became evidence-lore at the SBF trial.",
});
const defector = source({
  binding: "interview",
  mediaType: "article",
  title:
    "The Thin Line Between Owning Twitter And Being Owned By Twitter, With Matt Levine",
  url: "https://defector.com/the-thin-line-between-owning-twitter-and-being-owned-by-twitter-with-matt-levine",
  publisher: "Defector",
  publishedAt: "2022-06-09",
  authors: ["David Roth"],
});
const karaSwisher = source({
  binding: "interview",
  mediaType: "article",
  title: "On With Kara Swisher: Matt Levine on Elon Musk's New Twitter",
  url: "https://nymag.com/intelligencer/2022/10/on-with-kara-swisher-matt-levine-on-elon-musks-new-twitter.html",
  publisher: "New York Magazine — Intelligencer",
  publishedAt: "2022-10-31",
});
const mib = source({
  binding: "interview",
  mediaType: "audio",
  title: "Masters in Business: Matt Levine on Money and Stuff",
  url: "https://www.bloomberg.com/news/audio/2024-01-04/masters-in-business-matt-levine-podcast",
  publisher: "Bloomberg Radio — Masters in Business",
  publishedAt: "2024-01-04",
  authors: ["Barry Ritholtz"],
});
const mibTranscript = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Transcript: Matt Levine",
  url: "https://ritholtz.com/2024/01/transcript-matt-levine/",
  publisher: "The Big Picture (ritholtz.com)",
  publishedAt: "2024-01-09",
  authors: ["Barry Ritholtz"],
  transcriptOf: mib.id,
});
const november = source({
  binding: "interview",
  mediaType: "article",
  title: "Matt Levine",
  url: "https://www.novembermag.com/content/matt-levine",
  publisher: "November",
  publishedAt: "2026-03-11",
  authors: ["Emmanuel Olunkwa"],
  notes:
    "Long 2025 conversation on method: first principles, Gawker/Dealbreaker lineage, math-textbook structure, 'the simplest true story.'",
});

// --- Reporting --------------------------------------------------------------

const dealbook2011 = source({
  binding: "reporting",
  mediaType: "article",
  title: "Riffing on Life After Goldman Sachs",
  url: "https://dealbook.nytimes.com/2011/07/08/riffing-on-life-after-goldman-sachs/",
  publisher: "The New York Times — DealBook",
  publishedAt: "2011-07-08",
  authors: ["Kevin Roose"],
  notes: "Contemporaneous DealBook coverage of his Goldman-to-blogging move.",
});
const nytProfile = source({
  binding: "reporting",
  mediaType: "article",
  title: "A Columnist Makes Sense of Wall Street Like None Other (See Footnote)",
  url: "https://www.nytimes.com/2020/10/08/business/matt-levine-bloomberg.html",
  publisher: "The New York Times",
  publishedAt: "2020-10-08",
  authors: ["Emily Flitter"],
});
const propublica = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "When the Billionaire Family Behind the Opioid Crisis Needed PR Help, They Turned to Mike Bloomberg",
  url: "https://www.propublica.org/article/bloomberg-sacklers-opioid-crisis-public-relations",
  publisher: "ProPublica",
  publishedAt: "2020-02-27",
  authors: ["Hannah Dreier"],
  notes:
    "Recounts the 2015 episode in which John Paulson called Michael Bloomberg over Levine's column.",
});
const axiosCrypto = source({
  binding: "reporting",
  mediaType: "article",
  title: "Businessweek devotes entire issue to Matt Levine's 'Crypto Story'",
  url: "https://www.axios.com/2022/10/25/businessweek-matt-levine-crypto-story",
  publisher: "Axios",
  publishedAt: "2022-10-25",
});
const nytWeb3 = source({
  binding: "reporting",
  mediaType: "article",
  title: "What Is Web3?",
  url: "https://www.nytimes.com/interactive/2022/03/18/technology/web3-definition-internet.html",
  publisher: "The New York Times",
  publishedAt: "2022-03-18",
  notes:
    "Quotes Levine: 'A basic premise of Web3 is that every product is simultaneously an investment opportunity.'",
});
const nytTrial = source({
  binding: "reporting",
  mediaType: "article",
  title: "Sam Bankman-Fried's Testimony Put on Hold in Crypto Fraud Case",
  url: "https://www.nytimes.com/live/2023/10/26/business/sam-bankman-fried-ftx-trial",
  publisher: "The New York Times",
  publishedAt: "2023-10-26",
  notes:
    "Trial coverage noting prosecutors played Levine's April 2022 Odd Lots interview with Bankman-Fried for the jury.",
});
const harvardMag = source({
  binding: "reporting",
  mediaType: "article",
  title: "Matt Levine's Bloomberg Finance Column Makes Money Funny",
  url: "https://www.harvardmagazine.com/2025/07/harvard-bloomberg-column-matt-levine",
  publisher: "Harvard Magazine",
  publishedAt: "2025-06-11",
  authors: ["Max J. Krupnick"],
  notes:
    "Alumni profile with the most detailed public career chronology: Wellesley High Latin, Yale '04, Third Circuit clerkship, Wachtell, Goldman from July 2007, Dealbreaker May 2011, Bloomberg 2013, newsletter ~Feb 2015.",
});
const felix = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "The Matt Levine Is Amazing Edition",
  url: "https://www.felixsalmon.com/2014/12/the-matt-levine-is-amazing-edition/",
  publisher: "felixsalmon.com",
  publishedAt: "2014-12-27",
  authors: ["Felix Salmon"],
  notes: "Blog post marking his Slate Money guest spot; early evidence of press fandom.",
});

const S = {
  levineAbout: levineAbout.id,
  levineWork: levineWork.id,
  bbergBio: bbergBio.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  bbergHire: bbergHire.id,
  bbergMediaCrypto: bbergMediaCrypto.id,
  loebPress: loebPress.id,
  yaleLaw: yaleLaw.id,
  sabew: sabew.id,
  dealbreaker: dealbreaker.id,
  levineWallSt: levineWallSt.id,
  philanthropyPower: philanthropyPower.id,
  eisf2019: eisf2019.id,
  gamestonk: gamestonk.id,
  elonMarkets: elonMarkets.id,
  cryptoStory: cryptoStory.id,
  cryptoFtx: cryptoFtx.id,
  ftxBalance: ftxBalance.id,
  putBitcoins: putBitcoins.id,
  murderSf: murderSf.id,
  podcastIntro: podcastIntro.id,
  reynolds: reynolds.id,
  cwt: cwt.id,
  cwtTranscript: cwtTranscript.id,
  recode: recode.id,
  stayTuned: stayTuned.id,
  policyPunch: policyPunch.id,
  oddlots2021: oddLots2021.id,
  oddlots2022: oddLots2022.id,
  defector: defector.id,
  karaSwisher: karaSwisher.id,
  mib: mib.id,
  mibTranscript: mibTranscript.id,
  november: november.id,
  dealbook2011: dealbook2011.id,
  nytProfile: nytProfile.id,
  propublica: propublica.id,
  axiosCrypto: axiosCrypto.id,
  nytWeb3: nytWeb3.id,
  nytTrial: nytTrial.id,
  harvardMag: harvardMag.id,
  felix: felix.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-matt-levine",
  generatedAt: "2026-09-17T03:00:00Z",
  subject: {
    kind: "person",
    handle: "matt-levine",
    displayName: "Matt Levine",
    alsoKnownAs: ["Matthew S. Levine", "Matthew Levine"],
    summary:
      "American financial columnist who writes the daily 'Money Stuff' newsletter for Bloomberg Opinion. A former Goldman Sachs equity-derivatives banker, Wachtell Lipton M&A lawyer, federal appellate clerk, and high-school Latin teacher, he is known for deadpan, first-principles explanations of finance — and for coinages like 'everything is securities fraud' and the 'Elon Markets Hypothesis.'",
    identity: {
      wikidataId: "Q76361123",
      officialSite: "https://mattlevine.co/",
      wikipedia: "https://en.wikipedia.org/wiki/Matt_Levine_(columnist)",
      profiles: [
        "https://www.bloomberg.com/opinion/authors/ARbTQlRLRjE/matthew-s-levine",
        "https://twitter.com/matt_levine",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:00:00Z",
    coverage: ["biography", "work", "beliefs", "philosophy", "media", "projects"],
  },
  sources: [
    levineAbout,
    levineWork,
    bbergBio,
    wikidata,
    wikipedia,
    bbergHire,
    bbergMediaCrypto,
    loebPress,
    yaleLaw,
    sabew,
    dealbreaker,
    levineWallSt,
    philanthropyPower,
    eisf2019,
    gamestonk,
    elonMarkets,
    cryptoStory,
    cryptoFtx,
    ftxBalance,
    putBitcoins,
    murderSf,
    podcastIntro,
    reynolds,
    cwt,
    cwtTranscript,
    recode,
    stayTuned,
    policyPunch,
    oddLots2021,
    oddLots2022,
    defector,
    karaSwisher,
    mib,
    mibTranscript,
    november,
    dealbook2011,
    nytProfile,
    propublica,
    axiosCrypto,
    nytWeb3,
    nytTrial,
    harvardMag,
    felix,
  ],
  claims: [
    {
      id: "claim-born-1978",
      kind: "fact",
      text: "Matt Levine was born in 1978; the public record gives the year only, not a date.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-harvard-classics-2000",
      kind: "fact",
      text: "He graduated from Syosset High School and earned an A.B. in Classics from Harvard College in 2000.",
      sourceIds: [S.levineAbout, S.harvardMag, S.reynolds],
    },
    {
      id: "claim-latin-teacher",
      kind: "fact",
      text: "After college he spent a year teaching Latin at Wellesley High School before attending law school.",
      sourceIds: [S.harvardMag, S.reynolds, S.levineAbout],
    },
    {
      id: "claim-yale-jd-2004",
      kind: "fact",
      text: "He earned his J.D. from Yale Law School in 2004, where he considered becoming a law professor and fell for contract law instead.",
      sourceIds: [S.yaleLaw, S.harvardMag, S.wikipedia],
    },
    {
      id: "claim-third-circuit-clerk",
      kind: "fact",
      text: "He spent a year clerking for a federal judge on the U.S. Court of Appeals for the Third Circuit in Philadelphia.",
      sourceIds: [S.harvardMag, S.bbergBio, S.reynolds],
    },
    {
      id: "claim-wachtell",
      kind: "fact",
      text: "He then spent about two years as a mergers-and-acquisitions associate at Wachtell, Lipton, Rosen & Katz.",
      sourceIds: [S.harvardMag, S.bbergBio, S.wikipedia],
    },
    {
      id: "claim-goldman-2007",
      kind: "fact",
      text: "In July 2007 he joined Goldman Sachs, where he spent about four years structuring and marketing corporate equity derivatives — he jokes he is 'one of the few people who went to Goldman for the hours.'",
      sourceIds: [S.harvardMag, S.bbergHire, S.wikipedia],
    },
    {
      id: "claim-goldman-emails",
      kind: "fact",
      text: "At Goldman he sent comical explanatory emails to coworkers unpacking their derivative trades — an early form of the explanatory voice he later professionalized.",
      sourceIds: [S.harvardMag],
    },
    {
      id: "claim-dealbreaker-2011",
      kind: "fact",
      text: "In May 2011 he left banking for an editorial job at the Wall Street blog Dealbreaker after a colleague pointed him to the listing; DealBook covered the Goldman-to-blogging move that July.",
      sourceIds: [S.harvardMag, S.bbergHire, S.dealbook2011],
    },
    {
      id: "claim-london-whale",
      kind: "fact",
      text: "His Dealbreaker analysis of JPMorgan's 'London Whale' trading loss was anthologized in the Columbia Journalism Review's 'The Best Business Writing 2013.'",
      sourceIds: [S.bbergHire, S.wikipedia],
    },
    {
      id: "claim-bloomberg-2013",
      kind: "fact",
      text: "Bloomberg View announced his hire as a finance columnist on September 4, 2013; the site later became Bloomberg Opinion.",
      sourceIds: [S.bbergHire, S.wikipedia, S.levineAbout],
    },
    {
      id: "claim-levine-on-wall-street",
      kind: "fact",
      text: "His early Bloomberg columns ran under the title 'Levine on Wall Street' in 2014, before the newsletter branding.",
      sourceIds: [S.levineWallSt],
    },
    {
      id: "claim-money-stuff-2015",
      kind: "fact",
      text: "Around February 2015 he began sending his column out as a daily email newsletter titled, in his dry style, 'Money Stuff' — partly inspired by Rusty Foster's Today in Tabs.",
      sourceIds: [S.harvardMag, S.november],
    },
    {
      id: "claim-daily-production",
      kind: "fact",
      text: "Per the 2020 New York Times profile, he wakes around 5 a.m. each weekday, reads markets chatter and reader email, then writes — filing up to roughly 5,000 words on a long day, sent to subscribers around noon.",
      sourceIds: [S.nytProfile],
    },
    {
      id: "claim-subscriber-growth",
      kind: "fact",
      text: "Reported Money Stuff subscriber counts grew from about 150,000 in October 2020 to more than 300,000 by January 2024 and roughly 500,000 readers by mid-2025.",
      sourceIds: [S.nytProfile, S.mibTranscript, S.harvardMag],
    },
    {
      id: "claim-paulson-bloomberg",
      kind: "fact",
      text: "His June 4, 2015 column 'Philanthropy and Power' argued John Paulson's Harvard gift should have gone to 'literally any other charity' (quoting Dylan Matthews); later reporting recounts that Paulson called Michael Bloomberg, who briefly threatened to shutter the opinion section before retracting the threat.",
      sourceIds: [S.philanthropyPower, S.propublica, S.wikipedia],
    },
    {
      id: "claim-eisf-column",
      kind: "fact",
      text: "On June 26, 2019 he published 'Everything Everywhere Is Securities Fraud,' the column that canonized his best-known catchphrase; he has restated it as a 'rule of thumb' as recently as 2025's 'Is Murder Securities Fraud?'",
      sourceIds: [S.eisf2019, S.murderSf],
    },
    {
      id: "claim-gamestonk",
      kind: "fact",
      text: "During the January 2021 GameStop squeeze he noted that Elon Musk tweeting 'Gamestonk!!' roughly doubled the stock in after-hours trading — 'the system works,' he wrote.",
      sourceIds: [S.gamestonk, S.elonMarkets],
    },
    {
      id: "claim-crypto-story",
      kind: "fact",
      text: "On October 25, 2022 Bloomberg Businessweek published 'The Crypto Story,' his ~40,000-word essay that filled the entire October 31, 2022 print issue — only the second single-author issue in the magazine's history, after Paul Ford's 'What Is Code?'",
      sourceIds: [S.cryptoStory, S.bbergMediaCrypto, S.axiosCrypto],
    },
    {
      id: "claim-crypto-story-update",
      kind: "fact",
      text: "Weeks after the Crypto Story issue, FTX collapsed; Bloomberg published his addendum 'What the FTX Collapse Means for the Crypto Story,' and his 'FTX's Balance Sheet Was Bad' column called the leaked balance sheet 'an Excel file full of the howling of ghosts and the shrieking of tortured souls.'",
      sourceIds: [S.cryptoFtx, S.ftxBalance],
    },
    {
      id: "claim-oddlots-sbf",
      kind: "fact",
      text: "Bloomberg's Odd Lots twice paired him with Sam Bankman-Fried (August 2021 and April 25, 2022); in the 2022 episode, Bankman-Fried described yield farming as putting tokens in a 'box,' prompting Levine's famous retort that SBF's account amounted to 'I'm in the Ponzi business and it's pretty good.'",
      sourceIds: [S.oddlots2021, S.oddlots2022],
    },
    {
      id: "claim-trial-clip",
      kind: "fact",
      text: "At Bankman-Fried's October 2023 fraud trial, prosecutors played a clip of the Levine interview for the jury, and a cooperating witness testified Bankman-Fried had lied to Levine about the exchange's finances.",
      sourceIds: [S.nytTrial],
    },
    {
      id: "claim-podcast-2024",
      kind: "fact",
      text: "In spring 2024 he launched 'Money Stuff: The Podcast,' a weekly companion show co-hosted with Bloomberg's Katie Greifeld.",
      sourceIds: [S.podcastIntro],
    },
    {
      id: "claim-loeb-finalists",
      kind: "fact",
      text: "He was a commentary finalist for the 2014 Gerald Loeb Awards, and 'The Crypto Story' was named a 2023 Loeb finalist in the explanatory category.",
      sourceIds: [S.reynolds, S.loebPress],
    },
    {
      id: "claim-early-writing",
      kind: "fact",
      text: "Before and alongside Dealbreaker he wrote for the Wall Street Journal, CNN.com, and The Billfold, and wrote the semi-regular 'Ask a Banker' column for NPR's Planet Money blog.",
      sourceIds: [S.bbergHire],
    },
    {
      id: "claim-web3-quote",
      kind: "fact",
      text: "The New York Times' web3 explainer quotes his framing: 'A basic premise of Web3 is that every product is simultaneously an investment opportunity.'",
      sourceIds: [S.nytWeb3],
    },
    {
      id: "claim-wikipedia-questionmarks",
      kind: "fact",
      text: "His personal site's About page links to his Wikipedia article followed by a wry '??' — self-deprecating about being documented at all.",
      sourceIds: [S.levineAbout],
    },
    {
      id: "claim-eisf-model",
      kind: "stated_belief",
      text: "His signature model: when a public company does a bad thing and the stock drops, shareholders can sue, reasoning that failing to disclose the bad thing — or the conditions enabling it — is securities fraud. He stresses it is a 'useful rule of thumb' and 'not literally the law.'",
      sourceIds: [S.eisf2019, S.murderSf, S.stayTuned],
    },
    {
      id: "claim-eisf-weird",
      kind: "stated_belief",
      text: "He also finds the everything-is-securities-fraud posture normatively odd — it re-describes harms to the public as harms to shareholders: 'Would you want climate change to be regulated by the interests of Exxon shareholders?'",
      sourceIds: [S.stayTuned, S.eisf2019],
    },
    {
      id: "claim-dozen-shticks",
      kind: "stated_belief",
      text: "He describes his toolkit as 'a dozen sort of shticks that are like lenses on the world' — everything is securities fraud chief among them — reusable frames that map onto almost any day's financial news.",
      sourceIds: [S.stayTuned],
    },
    {
      id: "claim-elon-markets",
      kind: "stated_belief",
      text: "The 'Elon Markets Hypothesis' holds that things are valuable not based on their cash flows but on their proximity to Elon Musk — a joke he says proved true 'to my eternal chagrin.'",
      sourceIds: [S.elonMarkets, S.gamestonk],
    },
    {
      id: "claim-crypto-normie",
      kind: "stated_belief",
      text: "He calls himself a crypto 'doubting normie,' yet argues crypto 'has found some new things to say about some old problems, and that even when those things are wrong, they're wrong in illuminating ways' — and that, as a finance person, he likes that crypto rebuilt a financial system from scratch.",
      sourceIds: [S.cryptoStory, S.bbergMediaCrypto, S.putBitcoins],
    },
    {
      id: "claim-first-principles",
      kind: "stated_belief",
      text: "He defines his role narrowly: not investigating or breaking news, but 'I try to understand something complicated and explain it clearly from first principles' — treating governance structure before personality.",
      sourceIds: [S.november],
    },
    {
      id: "claim-simplest-true-story",
      kind: "stated_belief",
      text: "He traces the newsletter's method to banking craft — learning to explain a layered derivative trade to a CFO in three sentences: 'It's not about simplifying for effect — it's about telling the simplest true story.'",
      sourceIds: [S.november, S.recode],
    },
    {
      id: "claim-honest-profit-motive",
      kind: "stated_belief",
      text: "He is fond of finance's honest profit motive and wary of Silicon Valley's fame-and-power ambitions, quoting Samuel Johnson that few ways of being employed are more innocent than 'getting money.'",
      sourceIds: [S.november],
    },
    {
      id: "claim-no-advocacy",
      kind: "stated_belief",
      text: "He declines advocacy — 'I tend not to advocate for any particular system; I just like to explain things as clearly as I can' — and notes that self-described socialists read Money Stuff 'to know the enemy.'",
      sourceIds: [S.november],
    },
    {
      id: "claim-panic-production",
      kind: "stated_belief",
      text: "He has described panic as central to 'the Matt Levine production function' — the daily deadline is the engine that makes the newsletter happen.",
      sourceIds: [S.cwt, S.cwtTranscript],
    },
    {
      id: "claim-efficient-markets-optimism",
      kind: "stated_belief",
      text: "Asked for his biggest market worry, he offered 'efficient markets optimism': if something bad could happen, it would already happen — a frame he concedes doubles as pessimism about outsmarting markets.",
      sourceIds: [S.cwtTranscript],
    },
    {
      id: "claim-wrote-to-fix-tone",
      kind: "stated_belief",
      text: "He started writing about Wall Street because most finance coverage, whatever its factual accuracy, 'did not capture the experience and sensibility of people working in finance.'",
      sourceIds: [S.recode],
    },
    {
      id: "claim-newsletter-connection",
      kind: "stated_belief",
      text: "He believes the email form itself matters: something arriving 'from Matt Levine' every afternoon creates direct accountability to readers — 'It's not hidden behind a masthead.'",
      sourceIds: [S.november, S.harvardMag],
    },
    {
      id: "claim-pattern-format",
      kind: "pattern",
      text: "The newsletter follows a stable rhythm: roughly five financial headlines per day unpacked through hypothetical dialogues, coined jargon, heavy footnotes, and snarky asides — humorous in texture while rarely relying on discrete jokes.",
      sourceIds: [S.harvardMag, S.nytProfile],
    },
    {
      id: "claim-pattern-insider-outsider",
      kind: "pattern",
      text: "He occupies an insider-outsider position: fluent enough to finish traders' sentences in their own grammar ('Oh, it's like this'), yet writing to make the system legible to outsiders.",
      sourceIds: [S.recode, S.nytProfile],
    },
    {
      id: "claim-pattern-beats",
      kind: "pattern",
      text: "His recurring beats are legalistic rather than personality-driven: insider-trading statutes, bond-market liquidity, securities fraud, index mechanics, corporate governance — plus Elon Musk and crypto as recurring weather systems.",
      sourceIds: [S.nytProfile, S.eisf2019, S.elonMarkets, S.cryptoStory],
    },
    {
      id: "claim-pattern-reference-docs",
      kind: "pattern",
      text: "His explainers repeatedly become reference documents: the London Whale analysis entered a CJR anthology, the Crypto Story filled a whole magazine issue, and the SBF 'box' interview became trial evidence.",
      sourceIds: [S.bbergHire, S.bbergMediaCrypto, S.nytTrial],
    },
    {
      id: "claim-pattern-gawker-lineage",
      kind: "pattern",
      text: "By his own account his voice descends from early-Gawker/Dealbreaker internet writing — Elizabeth Spiers founded both Gawker and Dealbreaker, and he imitated Bess Levin's tone — with the David Foster Wallace comparison arriving mostly via the footnotes.",
      sourceIds: [S.november, S.felix, S.nytProfile],
    },
    {
      id: "claim-pattern-coinages",
      kind: "pattern",
      text: "He coins vocabulary that the finance world reuses — 'everything is securities fraud,' the 'Elon Markets Hypothesis,' 'stonk' — making the newsletter a meme source as well as an explainer.",
      sourceIds: [S.eisf2019, S.elonMarkets, S.gamestonk, S.nytProfile],
    },
    {
      id: "claim-pattern-repetition",
      kind: "pattern",
      text: "Across a decade he has kept essentially the same job — the same daily email at roughly the same hour — and argues repetition is the method: 'you don't really understand a bank or a derivative until you've described it' many times.",
      sourceIds: [S.november, S.harvardMag],
    },
    {
      id: "claim-spec-voice-origin",
      kind: "speculation",
      text: "Harvard Magazine speculates his punchy explanatory style may trace to his Goldman-era comical emails about derivative trades — or further back to contract-law drafting at Wachtell; the lineage is plausible but asserted by the profiler, not demonstrated.",
      sourceIds: [S.harvardMag],
    },
    {
      id: "claim-spec-no-book",
      kind: "speculation",
      text: "He has no conventional book; the record suggests the daily email may itself be the intended opus — a serialized finance education — rather than raw material for a future one. That reading is inference, not his stated position.",
      sourceIds: [S.cryptoStory, S.november],
    },
    {
      id: "claim-spec-musk-obligation",
      kind: "speculation",
      text: "He has written that he is 'already tired' of the Elon Markets Hypothesis even as Musk stories keep producing his biggest subjects; the continued coverage plausibly reflects reader demand and structural importance rather than enthusiasm.",
      sourceIds: [S.elonMarkets, S.karaSwisher],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1978",
      title: "Born",
      summary: "Public sources give the year only.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-harvard-2000",
      kind: "education",
      date: "2000",
      title: "A.B. in Classics, Harvard College",
      summary: "Graduated Harvard in 2000 with a classics degree.",
      organization: "Harvard College",
      organizationHandle: "harvard-college",
      sourceIds: [S.harvardMag, S.levineAbout, S.reynolds],
    },
    {
      id: "event-latin-teacher",
      kind: "role",
      date: "2000",
      end: "2001",
      title: "Taught high-school Latin",
      summary: "Spent a year teaching Latin at Wellesley High School before law school.",
      organization: "Wellesley High School",
      organizationHandle: "wellesley-high-school",
      sourceIds: [S.harvardMag],
    },
    {
      id: "event-yale-jd",
      kind: "education",
      date: "2001",
      end: "2004",
      title: "J.D., Yale Law School",
      summary:
        "Yale Law class of 2004; considered academia, fell for contract law instead.",
      organization: "Yale Law School",
      organizationHandle: "yale-law-school",
      sourceIds: [S.yaleLaw, S.harvardMag, S.wikipedia],
    },
    {
      id: "event-clerkship",
      kind: "role",
      date: "2004",
      end: "2005",
      title: "Law clerk, U.S. Court of Appeals for the Third Circuit",
      summary: "A year clerking for a federal judge in Philadelphia.",
      organization: "U.S. Court of Appeals for the Third Circuit",
      organizationHandle: "us-court-of-appeals-for-the-third-circuit",
      location: "Philadelphia, Pennsylvania",
      sourceIds: [S.harvardMag, S.bbergBio],
    },
    {
      id: "event-wachtell",
      kind: "role",
      date: "2005",
      end: "2007",
      title: "M&A associate, Wachtell Lipton",
      summary:
        "About two years of mergers-and-acquisitions work at Wachtell, Lipton, Rosen & Katz.",
      organization: "Wachtell, Lipton, Rosen & Katz",
      organizationHandle: "wachtell-lipton-rosen-katz",
      location: "New York",
      sourceIds: [S.harvardMag, S.bbergBio],
    },
    {
      id: "event-goldman",
      kind: "role",
      date: "2007-07",
      end: "2011-05",
      title: "Investment banker, Goldman Sachs",
      summary:
        "Structured and marketed corporate equity derivatives — capped-stock deals and similar — as associate then vice president.",
      organization: "Goldman Sachs",
      organizationHandle: "goldman-sachs",
      location: "New York",
      sourceIds: [S.harvardMag, S.bbergHire, S.reynolds],
    },
    {
      id: "event-dealbreaker",
      kind: "role",
      date: "2011-05",
      end: "2013",
      title: "Joined Dealbreaker",
      summary:
        "Left banking for an editorial job at the Wall Street blog; his London Whale analysis later made a CJR best-business-writing anthology.",
      organization: "Dealbreaker",
      organizationHandle: "dealbreaker",
      sourceIds: [S.harvardMag, S.bbergHire, S.dealbreaker],
    },
    {
      id: "event-bloomberg-hire",
      kind: "role",
      date: "2013-09-04",
      title: "Joined Bloomberg View as finance columnist",
      summary:
        "Hired to cover finance, Wall Street, and the broader business world; the site became Bloomberg Opinion.",
      organization: "Bloomberg View",
      organizationHandle: "bloomberg-view",
      sourceIds: [S.bbergHire],
    },
    {
      id: "event-loeb-2014",
      kind: "award",
      date: "2014",
      title: "Gerald Loeb Award commentary finalist",
      summary: "Named a commentary finalist in the 2014 Loeb Awards.",
      sourceIds: [S.reynolds],
    },
    {
      id: "event-money-stuff-launch",
      kind: "project",
      date: "2015-02",
      title: "Money Stuff begins as a daily newsletter",
      summary:
        "Started sending the column as a daily email 'around February 2015'; earlier columns ran as 'Levine on Wall Street.'",
      sourceIds: [S.harvardMag, S.november, S.levineWallSt],
    },
    {
      id: "event-paulson-column",
      kind: "publication",
      date: "2015-06-04",
      title: "'Philanthropy and Power' column",
      summary:
        "Suggested John Paulson's Harvard gift should have gone to 'literally any other charity'; Paulson reportedly called Michael Bloomberg, who briefly threatened to shutter the opinion section.",
      sourceIds: [S.philanthropyPower, S.propublica, S.wikipedia],
    },
    {
      id: "event-cwt-2018",
      kind: "media",
      date: "2018-02-14",
      title: "Conversations with Tyler, live at Bloomberg HQ",
      summary:
        "A wide-ranging live conversation with Tyler Cowen on Horace, crypto, Uber, and the Matt Levine production function.",
      sourceIds: [S.cwt, S.cwtTranscript],
    },
    {
      id: "event-eisf-2019",
      kind: "publication",
      date: "2019-06-26",
      title: "'Everything Everywhere Is Securities Fraud'",
      summary: "The column that canonized his signature lens on U.S. securities law.",
      sourceIds: [S.eisf2019],
    },
    {
      id: "event-nyt-profile",
      kind: "media",
      date: "2020-10-08",
      title: "New York Times profile",
      summary:
        "Emily Flitter's 'A Columnist Makes Sense of Wall Street Like None Other (See Footnote)' documented the 5 a.m.-to-noon production routine and ~150,000 subscribers.",
      sourceIds: [S.nytProfile],
    },
    {
      id: "event-elon-markets-2021",
      kind: "publication",
      date: "2021-02-10",
      title: "The 'Elon Markets Hypothesis' column",
      summary:
        "Named the observation that things are valuable by proximity to Elon Musk rather than cash flows — during the meme-stock and Dogecoin era.",
      sourceIds: [S.elonMarkets],
    },
    {
      id: "event-oddlots-sbf-2022",
      kind: "media",
      date: "2022-04-25",
      title: "Odd Lots: interviewing Sam Bankman-Fried",
      summary:
        "The 'box' episode on yield farming; the exchange was later played for the jury at SBF's fraud trial.",
      organization: "Bloomberg — Odd Lots",
      organizationHandle: "bloomberg-odd-lots",
      sourceIds: [S.oddlots2022, S.nytTrial],
    },
    {
      id: "event-crypto-story",
      kind: "publication",
      date: "2022-10-25",
      title: "'The Crypto Story' fills a whole Businessweek issue",
      summary:
        "~40,000 words across the entire October 31, 2022 print edition — the magazine's second single-author issue ever.",
      organization: "Bloomberg Businessweek",
      organizationHandle: "bloomberg-businessweek",
      sourceIds: [S.cryptoStory, S.bbergMediaCrypto, S.axiosCrypto],
    },
    {
      id: "event-loeb-2023",
      kind: "award",
      date: "2023",
      title: "Gerald Loeb Award explanatory finalist for 'The Crypto Story'",
      summary: "The Crypto Story was a 2023 Loeb finalist in explanatory journalism.",
      sourceIds: [S.loebPress],
    },
    {
      id: "event-podcast-2024",
      kind: "project",
      date: "2024-04",
      title: "Money Stuff: The Podcast launches",
      summary: "Weekly audio companion co-hosted with Katie Greifeld.",
      organization: "Bloomberg",
      organizationHandle: "bloomberg",
      sourceIds: [S.podcastIntro],
    },
  ],
  themes: [
    {
      id: "theme-everything-securities-fraud",
      kind: "philosophy",
      status: "stated",
      title: "Everything is securities fraud",
      summary:
        "His signature heuristic: every bad thing at a public company can be re-described as a disclosure failure, and therefore as securities fraud. He presents it as a predictive tool for lawsuits — 'it always predicts that the answer will be yes' — while flagging that it is a rule of thumb, not the law, and that it is normatively strange to route public harms through shareholder injury.",
      sourceIds: [S.eisf2019, S.murderSf, S.stayTuned],
    },
    {
      id: "theme-first-principles",
      kind: "method",
      status: "stated",
      title: "First principles over personalities",
      summary:
        "His declared method is to 'understand something complicated and explain it clearly from first principles,' experiencing structure before personality — OpenAI's governance, Musk's legal degrees of freedom, derivative mechanics. The craft descends from explaining structured trades to a CFO in three sentences: 'the simplest true story.'",
      sourceIds: [S.november, S.recode, S.harvardMag],
    },
    {
      id: "theme-elon-markets",
      kind: "belief",
      status: "stated",
      title: "The Elon Markets Hypothesis",
      summary:
        "In the meme era, value tracks proximity to Elon Musk rather than discounted cash flows — a joke he says kept coming true. It generalizes into a view of modern markets where attention and memes are real pricing forces.",
      sourceIds: [S.elonMarkets, S.gamestonk],
    },
    {
      id: "theme-crypto-lab",
      kind: "interest",
      status: "stated",
      title: "Crypto as a laboratory for finance",
      summary:
        "A self-described 'doubting normie,' he treats crypto less as an investment thesis than as a society that rebuilt finance from scratch and rediscovered — sometimes better, sometimes worse — its central intuitions. 'Even when those things are wrong, they're wrong in illuminating ways.'",
      sourceIds: [S.cryptoStory, S.putBitcoins, S.bbergMediaCrypto],
    },
    {
      id: "theme-deadpan-rigor",
      kind: "practice",
      status: "reported",
      title: "Deadpan rigor",
      summary:
        "The press describes a daily routine of waking at 5 a.m. and producing up to ~5,000 words of 'smooth, conversational prose' packed with footnotes, neologisms, hypothetical dialogues, and legal-mechanics digressions — technically dense yet the opposite of pedantic.",
      sourceIds: [S.nytProfile, S.harvardMag],
    },
    {
      id: "theme-insider-outsider",
      kind: "method",
      status: "reported",
      title: "Insider fluency, outsider irony",
      summary:
        "He credibly speaks Wall Street's language — enough to cut traders off and finish their sentences — while writing for readers who will never see a term sheet. Profiles credit this dual fluency as the source of the newsletter's authority.",
      sourceIds: [S.recode, S.nytProfile, S.dealbook2011],
    },
    {
      id: "theme-internet-idiom",
      kind: "influence",
      status: "stated",
      title: "The Gawker–Dealbreaker–math-textbook lineage",
      summary:
        "By his own account he learned tone from early Gawker and Dealbreaker's Bess Levin — 'smart, irreverent, mixing analysis with voice' — and structure from math textbooks that 'start from extremely simple premises and build inexorably toward terrifying abstractions.'",
      sourceIds: [S.november, S.felix],
    },
    {
      id: "theme-heuristic-humility",
      kind: "method",
      status: "stated",
      title: "Heuristics with disclosed limits",
      summary:
        "His lenses come with their own footnoted caveats — 'this is not a complete and accurate statement of the law' — a recurring habit of stating a strong frame, then immediately marking where it fails.",
      sourceIds: [S.eisf2019, S.murderSf, S.stayTuned],
    },
  ],
  works: [
    {
      id: "work-money-stuff",
      kind: "product",
      status: "ongoing",
      title: "Money Stuff",
      date: "2015-02",
      summary:
        "The free daily Bloomberg Opinion email newsletter — roughly five finance stories unpacked each weekday. Subscriber counts reported at ~150,000 (2020), 300,000+ (2024), and ~500,000 (2025).",
      sourceIds: [S.harvardMag, S.nytProfile, S.november, S.levineWork],
    },
    {
      id: "work-bloomberg-column",
      kind: "other",
      status: "ongoing",
      title: "Bloomberg Opinion column (originally 'Levine on Wall Street')",
      date: "2013-09-04",
      summary:
        "His Bloomberg column began under the title 'Levine on Wall Street' in 2013–2014 and evolved into the Money Stuff newsletter.",
      sourceIds: [S.bbergHire, S.levineWallSt],
    },
    {
      id: "work-dealbreaker",
      kind: "other",
      status: "published",
      title: "Dealbreaker writing (2011–2013)",
      summary:
        "His body of work at Dealbreaker covering 'the deals, scandals, complexities and personalities of the financial services industry' — including the London Whale analysis anthologized by CJR.",
      sourceIds: [S.dealbreaker, S.bbergHire],
    },
    {
      id: "work-ask-a-banker",
      kind: "other",
      status: "published",
      title: "'Ask a Banker' (Planet Money)",
      summary:
        "A semi-regular explanatory column for NPR's Planet Money blog, part of his pre-Bloomberg freelancing alongside the Wall Street Journal, CNN.com, and The Billfold.",
      sourceIds: [S.bbergHire],
    },
    {
      id: "work-eisf-column",
      kind: "other",
      status: "published",
      title: "'Everything Everywhere Is Securities Fraud'",
      date: "2019-06-26",
      summary:
        "The standalone Bloomberg Opinion essay that canonized his signature heuristic; cited in securities-litigation scholarship and endlessly quoted.",
      sourceIds: [S.eisf2019],
    },
    {
      id: "work-crypto-story",
      kind: "other",
      status: "published",
      title: "The Crypto Story",
      date: "2022-10-25",
      summary:
        "His ~40,000-word essay occupying the entire October 31, 2022 Bloomberg Businessweek issue — the magazine's second-ever single-author issue; a 2023 Loeb explanatory finalist, later followed by a post-FTX addendum.",
      sourceIds: [S.cryptoStory, S.bbergMediaCrypto, S.loebPress, S.cryptoFtx],
    },
    {
      id: "work-podcast",
      kind: "recording",
      status: "ongoing",
      title: "Money Stuff: The Podcast",
      date: "2024-04",
      summary: "Weekly podcast companion to the newsletter, co-hosted with Katie Greifeld.",
      sourceIds: [S.podcastIntro],
    },
  ],
  appearances: [
    {
      id: "appearance-reynolds-2014",
      title: "Bloomberg's Matt Levine talks on being a finance columnist",
      venue: "Reynolds Center",
      publishedAt: "2014-08-25",
      participants: ["Matt Levine"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
      ],
      summary:
        "Email Q&A on the move from Goldman to journalism, developing voice, and reader trust.",
      media: [
        {
          type: "article",
          url: "https://businessjournalism.org/2014/08/bloomberg-matt-levine-financial-columnist/",
          sourceId: S.reynolds,
        },
      ],
      sourceIds: [S.reynolds],
    },
    {
      id: "appearance-slate-money-2014",
      title: "Slate Money guest spot",
      venue: "Slate Money",
      publishedAt: "2014-12-27",
      participants: ["Matt Levine", "Felix Salmon", "Shane Ferro"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Felix Salmon", handle: "felix-salmon" },
        { name: "Shane Ferro", handle: "shane-ferro" },
      ],
      summary:
        "Guest appearance discussing insider trading, bank earnings, and Argentina — marked by Salmon's 'The Matt Levine Is Amazing Edition' post.",
      media: [
        {
          type: "article",
          url: "https://www.felixsalmon.com/2014/12/the-matt-levine-is-amazing-edition/",
          sourceId: S.felix,
        },
      ],
      sourceIds: [S.felix],
    },
    {
      id: "appearance-sabew-2015",
      title: "SABEW Chicago 2015 speaker",
      venue: "SABEW Chicago 2015",
      publishedAt: "2015",
      participants: ["Matt Levine"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
      ],
      summary: "Listed as a speaker at the business-journalism conference.",
      sourceIds: [S.sabew],
    },
    {
      id: "appearance-cwt-2018",
      title: "Matt Levine Live at Bloomberg HQ (Ep. 34)",
      venue: "Conversations with Tyler",
      publishedAt: "2018-02-14",
      participants: ["Matt Levine", "Tyler Cowen"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Tyler Cowen", handle: "tyler-cowen" },
      ],
      summary:
        "Live conversation on Horace, crypto, Buffy, Uber, market volatility, M&A, and why panic is central to his production function.",
      media: [
        {
          type: "audio",
          url: "https://conversationswithtyler.com/episodes/matt-levine/",
          sourceId: S.cwt,
        },
        {
          type: "transcript",
          url: "https://marginalrevolution.com/marginalrevolution/2018/02/conversation-matt-levine.html",
          sourceId: S.cwtTranscript,
        },
      ],
      sourceIds: [S.cwt, S.cwtTranscript],
    },
    {
      id: "appearance-recode-2019",
      title:
        "Bloomberg's Matt Levine explains Wall Street, WeWork, and how to leave Goldman Sachs for a much lower-paying job",
      venue: "Recode Media with Peter Kafka",
      publishedAt: "2019-11-11",
      participants: ["Matt Levine", "Peter Kafka"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Peter Kafka", handle: "peter-kafka" },
      ],
      summary:
        "On why he started writing — most finance coverage missed the lived sensibility of Wall Street — and on talking to traders in their own grammar.",
      media: [
        {
          type: "article",
          url: "https://www.vox.com/recode/2019/11/11/20958336/bloomberg-matt-levine-wall-street-wework-goldman-sachs-podcast-recode-media",
          sourceId: S.recode,
        },
      ],
      sourceIds: [S.recode],
    },
    {
      id: "appearance-stay-tuned-2021",
      title: "Everything is Securities Fraud? (with Matt Levine)",
      venue: "Stay Tuned with Preet",
      publishedAt: "2021-05-27",
      participants: ["Matt Levine", "Preet Bharara"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Preet Bharara", handle: "preet-bharara" },
      ],
      summary:
        "On his path to journalism, Elon Musk, crypto, and why 'everything is securities fraud' is a useful but weird lens on U.S. law.",
      media: [
        {
          type: "article",
          url: "https://cafe.com/stay-tuned/everything-is-securities-fraud-with-matt-levine/",
          sourceId: S.stayTuned,
        },
      ],
      sourceIds: [S.stayTuned],
    },
    {
      id: "appearance-policy-punchline-2021",
      title: "Matt Levine: King of *The* Financial Newsletter",
      venue: "Policy Punchline",
      publishedAt: "2021-06-28",
      participants: ["Matt Levine"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
      ],
      summary:
        "A student-run podcast interview on the Latin-teacher-to-Goldman path, GameStop, crypto, ESG, and the securities-fraud lens.",
      media: [
        {
          type: "article",
          url: "https://www.policypunchline.com/episodes/2021/6/28/matt-levine-king-of-the-financial-newsletter",
          sourceId: S.policyPunch,
        },
      ],
      sourceIds: [S.policyPunch],
    },
    {
      id: "appearance-odd-lots-2021",
      title: "Sam Bankman-Fried and Matt Levine on How the Crypto Market Really Works",
      venue: "Odd Lots (Bloomberg)",
      publishedAt: "2021-08-04",
      participants: ["Matt Levine", "Sam Bankman-Fried", "Joe Weisenthal", "Tracy Alloway"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Sam Bankman-Fried", handle: "sam-bankman-fried" },
        { name: "Joe Weisenthal", handle: "joe-weisenthal" },
        { name: "Tracy Alloway", handle: "tracy-alloway" },
      ],
      summary:
        "The first Odd Lots pairing of Levine with the FTX founder — an in-depth market-structure conversation months before the collapse.",
      media: [
        {
          type: "audio",
          url: "https://www.bloomberg.com/news/audio/2021-08-04/how-the-crypto-market-really-works-podcast",
          sourceId: S.oddlots2021,
        },
      ],
      sourceIds: [S.oddlots2021],
    },
    {
      id: "appearance-odd-lots-2022",
      title: "Sam Bankman-Fried and Matt Levine on How to Make Money in Crypto",
      venue: "Odd Lots (Bloomberg)",
      publishedAt: "2022-04-25",
      participants: ["Matt Levine", "Sam Bankman-Fried", "Joe Weisenthal", "Tracy Alloway"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Sam Bankman-Fried", handle: "sam-bankman-fried" },
        { name: "Joe Weisenthal", handle: "joe-weisenthal" },
        { name: "Tracy Alloway", handle: "tracy-alloway" },
      ],
      summary:
        "The 'put the tokens in the box' interview; prosecutors later played the clip for the jury at SBF's 2023 trial.",
      media: [
        {
          type: "audio",
          url: "https://www.bloomberg.com/news/articles/2022-04-25/sam-bankman-fried-and-matt-levine-on-how-to-make-money-in-crypto",
          sourceId: S.oddlots2022,
        },
      ],
      sourceIds: [S.oddlots2022, S.nytTrial],
    },
    {
      id: "appearance-defector-2022",
      title: "The Thin Line Between Owning Twitter And Being Owned By Twitter",
      venue: "Defector podcast",
      publishedAt: "2022-06-09",
      participants: ["Matt Levine", "David Roth"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "David Roth", handle: "david-roth" },
      ],
      summary:
        "On writing daily about Musk's Twitter bid, meme stocks, and staying lucid amid 'dishonesty and illogic and grandstanding bad faith.'",
      media: [
        {
          type: "article",
          url: "https://defector.com/the-thin-line-between-owning-twitter-and-being-owned-by-twitter-with-matt-levine",
          sourceId: S.defector,
        },
      ],
      sourceIds: [S.defector],
    },
    {
      id: "appearance-kara-swisher-2022",
      title: "Matt Levine on Elon Musk's New Twitter",
      venue: "On With Kara Swisher",
      publishedAt: "2022-10-31",
      participants: ["Matt Levine", "Kara Swisher"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Kara Swisher", handle: "kara-swisher" },
      ],
      summary:
        "Post-acquisition analysis of Musk's Twitter — moderation, workforce, foreign governments, and whether the product can make money.",
      media: [
        {
          type: "article",
          url: "https://nymag.com/intelligencer/2022/10/on-with-kara-swisher-matt-levine-on-elon-musks-new-twitter.html",
          sourceId: S.karaSwisher,
        },
      ],
      sourceIds: [S.karaSwisher],
    },
    {
      id: "appearance-mib-2024",
      title: "Matt Levine on Money and Stuff",
      venue: "Masters in Business (Bloomberg Radio)",
      publishedAt: "2024-01-04",
      participants: ["Matt Levine", "Barry Ritholtz"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Barry Ritholtz", handle: "barry-ritholtz" },
      ],
      summary:
        "Long-form interview on the newsletter's history and craft; Ritholtz cites more than 300,000 daily subscribers.",
      media: [
        {
          type: "audio",
          url: "https://www.bloomberg.com/news/audio/2024-01-04/masters-in-business-matt-levine-podcast",
          sourceId: S.mib,
        },
        {
          type: "transcript",
          url: "https://ritholtz.com/2024/01/transcript-matt-levine/",
          sourceId: S.mibTranscript,
        },
      ],
      sourceIds: [S.mib, S.mibTranscript],
    },
    {
      id: "appearance-november-2025",
      title: "Matt Levine (November interview)",
      venue: "November magazine",
      publishedAt: "2026-03-11",
      participants: ["Matt Levine", "Emmanuel Olunkwa"],
      participantHandles: [
        { name: "Matt Levine", handle: "matt-levine" },
        { name: "Emmanuel Olunkwa", handle: "emmanuel-olunkwa" },
      ],
      summary:
        "A July 2025 conversation on method: first principles, Gawker/Dealbreaker lineage, honest profit motives, and writing the same email every afternoon for a decade.",
      media: [
        {
          type: "article",
          url: "https://www.novembermag.com/content/matt-levine",
          sourceId: S.november,
        },
      ],
      sourceIds: [S.november],
    },
  ],
  relations: [
    {
      id: "rel-bloomberg-lp",
      kind: "employed_by",
      target: "bloomberg-lp",
      targetName: "Bloomberg LP",
      targetKind: "organization",
      note:
        "Hired into Bloomberg View in September 2013; writes the daily Money Stuff newsletter for Bloomberg Opinion and co-hosts its podcast.",
      start: "2013-09",
      targetWikidataId: "Q13977",
      sourceIds: [S.bbergHire, S.bbergBio, S.harvardMag],
    },
    {
      id: "rel-dealbreaker",
      kind: "employed_by",
      target: "dealbreaker",
      targetName: "Dealbreaker",
      targetKind: "organization",
      note:
        "Wrote for the Wall Street blog from May 2011 until Bloomberg hired him in 2013.",
      start: "2011-05",
      end: "2013",
      targetWikidataId: "Q120653754",
      sourceIds: [S.dealbreaker, S.bbergHire, S.harvardMag],
    },
    {
      id: "rel-goldman-sachs",
      kind: "employed_by",
      target: "goldman-sachs",
      targetName: "Goldman Sachs",
      targetKind: "organization",
      note:
        "Four years structuring corporate equity derivatives, July 2007 until his May 2011 exit for blogging.",
      start: "2007-07",
      end: "2011-05",
      targetWikidataId: "Q193326",
      sourceIds: [S.bbergHire, S.dealbook2011, S.harvardMag],
    },
    {
      id: "rel-wachtell-lipton",
      kind: "employed_by",
      target: "wachtell-lipton",
      targetName: "Wachtell Lipton Rosen & Katz",
      targetKind: "organization",
      note:
        "About two years of M&A work after his Yale J.D. and Third Circuit clerkship.",
      start: "2005",
      end: "2007",
      targetWikidataId: "Q7958775",
      sourceIds: [S.harvardMag, S.levineAbout],
    },
    {
      id: "rel-katie-greifeld",
      kind: "collaborated",
      target: "katie-greifeld",
      targetName: "Katie Greifeld",
      note: "Co-hosts Money Stuff: The Podcast with him, launched April 2024.",
      start: "2024-04",
      targetWikidataId: "Q116052267",
      sourceIds: [S.podcastIntro],
    },
    {
      id: "rel-tyler-cowen",
      kind: "interviewed_by",
      target: "tyler-cowen",
      targetName: "Tyler Cowen",
      note:
        "Conversations with Tyler Ep. 34, recorded live at Bloomberg HQ in February 2018.",
      start: "2018-02",
      targetWikidataId: "Q602278",
      sourceIds: [S.cwt, S.cwtTranscript],
    },
    {
      id: "rel-peter-kafka",
      kind: "interviewed_by",
      target: "peter-kafka",
      targetName: "Peter Kafka",
      note: "Recode Media interview, November 2019.",
      start: "2019-11",
      targetWikidataId: "Q43964012",
      sourceIds: [S.recode],
    },
    {
      id: "rel-preet-bharara",
      kind: "interviewed_by",
      target: "preet-bharara",
      targetName: "Preet Bharara",
      note: "Stay Tuned with Preet episode 'Everything is Securities Fraud?', May 2021.",
      start: "2021-05",
      targetWikidataId: "Q7239755",
      sourceIds: [S.stayTuned],
    },
    {
      id: "rel-joe-weisenthal",
      kind: "interviewed_by",
      target: "joe-weisenthal",
      targetName: "Joe Weisenthal",
      note:
        "Odd Lots co-host on the 2021 and April 2022 episodes with Sam Bankman-Fried.",
      start: "2021",
      targetWikidataId: "Q107452067",
      sourceIds: [S.oddlots2021, S.oddlots2022],
    },
    {
      id: "rel-tracy-alloway",
      kind: "interviewed_by",
      target: "tracy-alloway",
      targetName: "Tracy Alloway",
      note:
        "Odd Lots co-host on the 2021 and April 2022 episodes with Sam Bankman-Fried.",
      start: "2021",
      targetWikidataId: "Q106804600",
      sourceIds: [S.oddlots2021, S.oddlots2022],
    },
    {
      id: "rel-david-roth",
      kind: "interviewed_by",
      target: "david-roth",
      targetName: "David Roth",
      note: "Defector interview on Musk's Twitter saga, June 2022.",
      start: "2022-06",
      targetWikidataId: "Q85755885",
      sourceIds: [S.defector],
    },
    {
      id: "rel-kara-swisher",
      kind: "interviewed_by",
      target: "kara-swisher",
      targetName: "Kara Swisher",
      note: "On With Kara Swisher interview on Elon Musk's new Twitter, October 2022.",
      start: "2022-10",
      targetWikidataId: "Q6367550",
      sourceIds: [S.karaSwisher],
    },
    {
      id: "rel-barry-ritholtz",
      kind: "interviewed_by",
      target: "barry-ritholtz",
      targetName: "Barry Ritholtz",
      note: "Masters in Business interview, January 2024.",
      start: "2024-01",
      targetWikidataId: "Q4864676",
      sourceIds: [S.mib, S.mibTranscript],
    },
    {
      id: "rel-emmanuel-olunkwa",
      kind: "interviewed_by",
      target: "emmanuel-olunkwa",
      targetName: "Emmanuel Olunkwa",
      note: "November magazine interview on method, published March 2026.",
      start: "2026-03",
      sourceIds: [S.november],
    },
    {
      id: "rel-sam-bankman-fried",
      kind: "interviewed",
      target: "sam-bankman-fried",
      targetName: "Sam Bankman-Fried",
      note:
        "Co-interviewed him on Odd Lots in 2021 and April 2022; the 'tokens in the box' exchange was later played for the jury at SBF's fraud trial.",
      start: "2021",
      targetWikidataId: "Q106543540",
      sourceIds: [S.oddlots2022, S.nytTrial],
    },
  ],
  openQuestions: [
    "His birth year (1978) is public, but no full birth date appears in the cited record.",
    "Subscriber counts are dated snapshots from profiles — ~150,000 (Oct 2020), 300,000+ (Jan 2024), ~500,000 (mid-2025) — not an audited figure.",
    "The Money Stuff start date is 'around February 2015' per Harvard Magazine; 2014 columns ran under 'Levine on Wall Street,' so the newsletter's precise first send is approximate.",
    "The 2015 Paulson–Michael Bloomberg anecdote is secondhand reporting (ProPublica, Wikipedia citing a Bloomberg feature); details like the 'talking to' are retold, not transcripted.",
    "His Dealbreaker author archive may be incomplete; the site's own bio calls the link his author page 'possibly.'",
    "The cited record does not say whether he maintains any public social presence beyond the rarely used @matt_levine account he himself links to.",
    "Whether 'The Crypto Story' will be republished or expanded as a standalone book is unresolved — it exists as a feature page, a whole magazine issue, and an audio version.",
    "Family and personal-life details that appear in profiles (spouse, children) are deliberately out of scope for this public index.",
  ],
  body: `Matt Levine is the Bloomberg Opinion columnist behind *Money Stuff*, the free daily finance newsletter that has become, by wide agreement, the thing finance people actually read. His path there was improbable and is now canonical lore: Syosset High School, a Harvard classics degree in 2000, a year teaching Latin at Wellesley High School, a Yale J.D. in 2004, a Third Circuit clerkship in Philadelphia, about two years of M&A work at Wachtell Lipton, then four years at Goldman Sachs structuring corporate equity derivatives — capped-stock deals and similar exotica that he had to explain to CFOs in three sentences. In May 2011 he left for the Wall Street blog Dealbreaker; in September 2013 Bloomberg View hired him as a columnist; around February 2015 he started sending the column out as a daily email called, flatly, *Money Stuff*. It has run every weekday since.

## What Money Stuff is

Per the 2020 New York Times profile, Levine wakes around 5 a.m., scans markets and reader mail, and writes until about noon — up to ~5,000 words on a long day — unpacking roughly five headlines through hypothetical dialogues, coined jargon, heavy footnotes, and deadpan asides. Reported subscriber counts run ~150,000 (2020), 300,000+ (January 2024), ~500,000 (mid-2025). In spring 2024 he added *Money Stuff: The Podcast* with Katie Greifeld.

His declared method is narrow on purpose: not breaking news but understanding something complicated and explaining it from first principles — what he calls "the simplest true story," a habit he traces to translating structured derivatives for non-specialist executives. Structure before personality: OpenAI's governance setup interests him more than the Altman drama; Musk's legal degrees of freedom more than the memes.

## The lenses

His best-known coinage is "everything is securities fraud": every bad thing at a public company can be re-described as a disclosure failure, and therefore as fraud — a predictive tool for lawsuits that he himself flags as a heuristic, not the law, and normatively strange (should climate harm be regulated via Exxon shareholders?). The 2019 column "Everything Everywhere Is Securities Fraud" is the canonical statement, and securities-litigation scholarship cites it.

Second is the "Elon Markets Hypothesis": in the meme era, things are valuable by proximity to Elon Musk rather than by cash flows — a joke that kept coming true, from Dogecoin to the Gamestonk episode where a single Musk tweet roughly doubled GameStop's stock after hours.

Third is crypto as a laboratory. A self-described "doubting normie," he argues crypto rebuilt finance from scratch and rediscovered its intuitions — sometimes better, sometimes worse, often "wrong in illuminating ways." That stance produced his most ambitious artifact: "The Crypto Story," ~40,000 words filling the entire October 31, 2022 issue of Bloomberg Businessweek — only the magazine's second-ever single-author issue after Paul Ford's "What Is Code?" — and a 2023 Gerald Loeb explanatory finalist.

## The record and its seams

His interviews are unusually consistent about craft: he learned tone from early Gawker and Dealbreaker (Elizabeth Spiers founded both; he imitated Bess Levin), structure from math textbooks that build from simple premises to terrifying abstractions, and accountability from the email form — arriving "from Matt Levine" daily makes him answerable in a way a masthead is not. He declines advocacy — self-described socialists read him "to know the enemy" — and prefers finance's honest profit motive to tech's fame-and-power ambitions.

The odd moments are documented too: a 2015 column mocking John Paulson's Harvard gift reportedly led Paulson to call Michael Bloomberg, who briefly threatened to shutter the opinion section. And his April 2022 Odd Lots interview with Sam Bankman-Fried — the "put the tokens in the box" exchange — was later played for the jury at SBF's fraud trial.

What the record does not settle: exact birth date, the newsletter's precise first send, audited subscriber numbers, and whether the Crypto Story will ever become a standalone book. He has no conventional book; the daily email may itself be the opus.

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
