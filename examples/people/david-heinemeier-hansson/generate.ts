#!/usr/bin/env bun
/** Generate examples/people/david-heinemeier-hansson/person-index.json with derived source ids. */

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

const dhhHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "David Heinemeier Hansson (DHH)",
  url: "https://dhh.dk/",
  publisher: "dhh.dk",
  notes:
    "The subject's own biography page; product, racing, board, and investment claims here are self-reported.",
});
const jasonChanges = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Changes at Basecamp",
  url: "https://world.hey.com/jason/changes-at-basecamp-7f32afc5",
  publisher: "HEY World",
  publishedAt: "2021-04-26",
  authors: ["Jason Fried"],
  notes:
    "The co-founder's own announcement of the April 2021 policy changes, published on the company's own platform.",
});
const jasonHello = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "37signals: Hello again",
  url: "https://world.hey.com/jason/37signals-hello-again-117eae60",
  publisher: "HEY World",
  publishedAt: "2022-05-03",
  authors: ["Jason Fried"],
  notes:
    "Announces the company's second renaming — from Basecamp back to 37signals — and recounts the 2014 change.",
});
const doctrine = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Rails Doctrine",
  url: "https://rubyonrails.org/doctrine",
  publisher: "Ruby on Rails",
  authors: ["David Heinemeier Hansson"],
  notes: "His own account of the framework's nine tenets.",
});
const monolith = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Majestic Monolith",
  url: "https://signalvnoise.com/svn3/the-majestic-monolith/",
  publisher: "Signal v. Noise",
  publishedAt: "2016-02-29",
  authors: ["David Heinemeier Hansson"],
});
const leavingCloud = source({
  binding: "first_person",
  mediaType: "article",
  title: "Why we're leaving the cloud",
  url: "https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0",
  publisher: "HEY World",
  publishedAt: "2022-10-19",
  authors: ["David Heinemeier Hansson"],
});
const letItAllOut = source({
  binding: "first_person",
  mediaType: "article",
  title: "Let it all out",
  url: "https://world.hey.com/dhh/let-it-all-out-78485e8e",
  publisher: "HEY World",
  publishedAt: "2021-04-28",
  authors: ["David Heinemeier Hansson"],
  notes:
    "His response to the April 2021 reporting, publishing his internal handling of the 'best names' list incident.",
});
const omarchyOut = source({
  binding: "first_person",
  mediaType: "article",
  title: "Omarchy is out",
  url: "https://world.hey.com/dhh/omarchy-is-out-4666dd31",
  publisher: "HEY World",
  publishedAt: "2025-06-26",
  authors: ["David Heinemeier Hansson"],
});
const londonPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "As I remember London",
  url: "https://world.hey.com/dhh/as-i-remember-london-e7d38e64",
  publisher: "HEY World",
  publishedAt: "2025-09-15",
  authors: ["David Heinemeier Hansson"],
  notes:
    "Political essay on the subject's own blog; positions quoted are his own words.",
});
const wolvesPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Wolves, sheep, and gypsies",
  url: "https://world.hey.com/dhh/wolves-sheep-and-gypsies-ba44af6a",
  publisher: "HEY World",
  publishedAt: "2026-07-21",
  authors: ["David Heinemeier Hansson"],
  notes:
    "Political essay on the subject's own blog; widely criticized as dehumanizing toward Roma people.",
});
const lexFridman = source({
  binding: "interview",
  mediaType: "webpage",
  title:
    "#474 – DHH: Future of Programming, AI, Ruby on Rails, Productivity & Parenting",
  url: "https://lexfridman.com/dhh-david-heinemeier-hansson/",
  publisher: "Lex Fridman Podcast",
  publishedAt: "2025-07-12",
  authors: ["Lex Fridman"],
});
const houseTestimony = source({
  binding: "primary_record",
  mediaType: "pdf",
  title:
    "Written Testimony of David Heinemeier Hansson — Online Platforms and Market Power, Part 5: Competitors in the Digital Economy",
  url: "https://docs.house.gov/meetings/JU/JU05/20200117/110386/HHRG-116-JU05-Wstate-HanssonD-20200117.pdf",
  publisher: "U.S. House Committee on the Judiciary",
  publishedAt: "2020-01-17",
  authors: ["David Heinemeier Hansson"],
});
const senateHearing = source({
  binding: "primary_record",
  mediaType: "transcript",
  title:
    "Antitrust Applied: Examining Competition in App Stores (S. Hrg. 117-771)",
  url: "https://www.govinfo.gov/content/pkg/CHRG-117shrg54138/html/CHRG-117shrg54138.htm",
  publisher: "U.S. Senate Committee on the Judiciary",
  publishedAt: "2021-04-21",
  notes: "Official hearing record; Hansson appeared as a witness.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "David Heinemeier Hansson (Q719413)",
  url: "https://www.wikidata.org/wiki/Q719413",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "David Heinemeier Hansson",
  url: "https://en.wikipedia.org/wiki/David_Heinemeier_Hansson",
  publisher: "Wikipedia",
});
const vergeHey = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Hey.com exec says Apple is acting like 'gangsters,' rejecting App Store updates and demanding cut of sales",
  url: "https://www.theverge.com/2020/6/16/21293419/hey-apple-rejection-ios-app-store-dhh-gangsters-antitrust",
  publisher: "The Verge",
  publishedAt: "2020-06-16",
});
const vergeHeyApproved = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Hey opens its email service to everyone as Apple approves its app for good",
  url: "https://www.theverge.com/2020/6/25/21302931/hey-email-service-public-launch-apple-approves-app-fight-policy-price",
  publisher: "The Verge",
  publishedAt: "2020-06-25",
});
const vergeBasecamp = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Basecamp implodes as employees flee company, including senior staff",
  url: "https://www.theverge.com/2021/4/30/22412714/basecamp-employees-memo-policy-hansson-fried-controversy",
  publisher: "The Verge",
  publishedAt: "2021-04-30",
});
const bbcCloud = source({
  binding: "reporting",
  mediaType: "article",
  title: "Are rainy days ahead for cloud computing?",
  url: "https://www.bbc.com/news/articles/cd114lllyp6o",
  publisher: "BBC News",
  publishedAt: "2024-06-27",
  authors: ["Sean McManus"],
});
const vergeOmarchy = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "1Password wades into a right-wing mess after funding a Linux project",
  url: "https://www.theverge.com/tech/988536/1password-dhh-linux-controversy",
  publisher: "The Verge",
  publishedAt: "2026-09-02",
  authors: ["TC Sottek", "Jacob Kastrenakes"],
});
const vergeKeynote = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Ruby on Rails creator: 'We're done writing code by hand.'",
  url: "https://www.theverge.com/tech/999834/ruby-on-rails-creator-were-done-writing-code-by-hand",
  publisher: "The Verge",
  publishedAt: "2026-09-24",
  notes:
    "Rails World 2026 keynote coverage — he says he has not written a line of code by hand since March, now calls himself a 'maker,' and reports 'English is a better programming language than Ruby.'",
});
const lavxKeynote = source({
  binding: "reporting",
  mediaType: "article",
  title: "Rails World keynote leaves Rails' future unclear",
  url: "https://news.lavx.hu/article/rails-world-keynote-leaves-rails-future-unclear",
  publisher: "LavX News",
  publishedAt: "2026-09-25",
  notes:
    "Analysis of the keynote's substance: 37signals moving to agent development, the next HEY as native apps with a Rust server side, and what the Basecamp 5 build-with-agents experience implies.",
});

const S = {
  dhhHome: dhhHome.id,
  jasonChanges: jasonChanges.id,
  jasonHello: jasonHello.id,
  doctrine: doctrine.id,
  monolith: monolith.id,
  leavingCloud: leavingCloud.id,
  letItAllOut: letItAllOut.id,
  omarchyOut: omarchyOut.id,
  londonPost: londonPost.id,
  wolvesPost: wolvesPost.id,
  lexFridman: lexFridman.id,
  houseTestimony: houseTestimony.id,
  senateHearing: senateHearing.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  vergeHey: vergeHey.id,
  vergeHeyApproved: vergeHeyApproved.id,
  vergeBasecamp: vergeBasecamp.id,
  bbcCloud: bbcCloud.id,
  vergeOmarchy: vergeOmarchy.id,
  vergeKeynote: vergeKeynote.id,
  lavxKeynote: lavxKeynote.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-david-heinemeier-hansson",
  generatedAt: "2026-09-25T21:31:41Z",
  subject: {
    kind: "person",
    handle: "david-heinemeier-hansson",
    displayName: "David Heinemeier Hansson",
    alsoKnownAs: ["DHH", "David Heinemeier-Hansson"],
    summary:
      "Danish programmer, entrepreneur, author, and racing driver — creator of Ruby on Rails and Omarchy, co-owner and CTO of 37signals (Basecamp, HEY), co-author of 'Rework' and other business books, and a 2014 class winner at the 24 Hours of Le Mans.",
    identity: {
      wikidataId: "Q719413",
      officialSite: "https://dhh.dk/",
      wikipedia: "https://en.wikipedia.org/wiki/David_Heinemeier_Hansson",
      profiles: ["https://x.com/dhh", "https://github.com/dhh"],
    },
  },
  scope: {
    asOf: "2026-09-25T21:31:41Z",
    coverage: [
      "biography",
      "work",
      "philosophy",
      "products",
      "racing",
      "media",
      "controversy",
    ],
  },
  sources: [
    dhhHome,
    jasonChanges,
    jasonHello,
    doctrine,
    monolith,
    leavingCloud,
    letItAllOut,
    omarchyOut,
    londonPost,
    wolvesPost,
    lexFridman,
    houseTestimony,
    senateHearing,
    wikidata,
    wikipedia,
    vergeHey,
    vergeHeyApproved,
    vergeBasecamp,
    bbcCloud,
    vergeOmarchy,
    vergeKeynote,
    lavxKeynote,
  ],
  claims: [
    {
      id: "claim-born-1979",
      kind: "fact",
      text: "David Heinemeier Hansson was born on October 15, 1979, in Copenhagen, Denmark.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-daily-rush",
      kind: "fact",
      text: "He learned PHP in high school while building gaming review sites, and in 1999 founded and ran Daily Rush, a Danish online gaming news site, until 2001.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-fried-hired",
      kind: "fact",
      text: "After offering Jason Fried help with PHP code, Hansson was hired to build a web-based project-management tool that became 37signals' Basecamp product; he began creating Ruby on Rails in 2003 while building it.",
      sourceIds: [S.wikipedia, S.dhhHome],
    },
    {
      id: "claim-rails-open-sourced",
      kind: "fact",
      text: "Hansson extracted the framework from Basecamp and released it as the open-source project Ruby on Rails in 2004; his own site calls Basecamp 'the original Rails application.'",
      sourceIds: [S.wikipedia, S.dhhHome, S.houseTestimony],
    },
    {
      id: "claim-awards",
      kind: "fact",
      text: "In 2005 he won the 'Hacker of the Year' award at OSCON from Google and O'Reilly for creating Rails, and in 2006 he accepted the Jolt Award of product excellence for Rails 1.0.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-cbs-chicago",
      kind: "fact",
      text: "He graduated from Copenhagen Business School with a bachelor's degree in Computer Science and Business Administration, then moved from Denmark to Chicago in November 2005.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-co-owner",
      kind: "fact",
      text: "Hansson is a partner, co-owner, and chief technology officer of 37signals, which he owns together with Jason Fried; the company has operated since 1999.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "claim-company-rename",
      kind: "fact",
      text: "The company was renamed from 37signals to Basecamp in 2014, when it went all-in on that single product, and renamed back to 37signals on May 3, 2022, once it made more than one product again.",
      sourceIds: [S.jasonHello],
    },
    {
      id: "claim-four-books",
      kind: "fact",
      text: "With Jason Fried he co-wrote four books — 'Getting Real' (2006), 'Rework' (2010), 'Remote: Office Not Required' (2013), and 'It Doesn't Have to Be Crazy at Work' (2018); his site reports Rework as a New York Times, Wall Street Journal, and Sunday Times bestseller with more than a million copies sold.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "claim-awdr",
      kind: "fact",
      text: "He co-wrote 'Agile Web Development with Rails' with Dave Thomas in 2005, the book that introduced many early adopters to the framework.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-rails-foundation",
      kind: "fact",
      text: "In 2022 he started The Rails Foundation to fund documentation, education, marketing, and events for the framework, and he serves as its chairman.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "claim-hey-launch",
      kind: "fact",
      text: "37signals launched the HEY email service on June 15, 2020 at $99 per year; Hansson wrote that about 300,000 users signed up to try it in the first three weeks.",
      sourceIds: [S.vergeHey, S.leavingCloud, S.dhhHome],
    },
    {
      id: "claim-apple-rejection",
      kind: "fact",
      text: "On June 16, 2020, Apple rejected a HEY bug-fix update for lacking in-app purchase and threatened removal from the App Store; Hansson publicly called Apple's conduct 'gangsters' and disputed the demand for a 30 percent cut.",
      sourceIds: [S.vergeHey],
    },
    {
      id: "claim-apple-resolution",
      kind: "fact",
      text: "Within days Apple approved HEY's update after Basecamp added a free temporary-account option for iOS users, and the service opened to everyone on June 25, 2020 — without Apple taking its revenue cut.",
      sourceIds: [S.vergeHeyApproved],
    },
    {
      id: "claim-house-testimony",
      kind: "fact",
      text: "On January 17, 2020, he testified at a U.S. House Antitrust Subcommittee field hearing in Boulder, Colorado, on running a small software company 'in the shadow of big tech,' including Google's search-advertising practices.",
      sourceIds: [S.houseTestimony],
    },
    {
      id: "claim-senate-testimony",
      kind: "fact",
      text: "On April 21, 2021, he testified before the U.S. Senate Judiciary antitrust subcommittee at 'Antitrust Applied: Examining Competition in App Stores,' pressing the case against the Apple–Google app-store duopoly.",
      sourceIds: [S.senateHearing],
    },
    {
      id: "claim-cloud-exit",
      kind: "fact",
      text: "On October 19, 2022, he announced that 37signals would leave the cloud — after running extensively on Amazon's and Google's platforms — and the company completed the move onto its own hardware in 2023.",
      sourceIds: [S.leavingCloud, S.bbcCloud],
    },
    {
      id: "claim-cloud-savings",
      kind: "fact",
      text: "The company spent $3.2 million on cloud services in 2022; the BBC reported owned hardware plus colocation costing about $840,000 per year and a profit boost of more than $1 million in 2024 from the exit.",
      sourceIds: [S.bbcCloud, S.leavingCloud],
    },
    {
      id: "claim-omarchy",
      kind: "fact",
      text: "On June 26, 2025, he released Omarchy, an opinionated Arch Linux and Hyprland setup aimed at developers; it grew from a configuration script into a distribution with its own install image and package repository.",
      sourceIds: [S.omarchyOut, S.wikipedia],
    },
    {
      id: "claim-omacom",
      kind: "fact",
      text: "In 2026 he started the Omacom Foundation — a nonprofit holding Omarchy's trademarks and funding its ecosystem — and serves as its president; patron counts differ between his site (ten founding patrons, $10 million) and The Verge's reporting (twelve at $1 million each, including Hansson himself, Patrick Collison, Michael Dell, Jack Dorsey, and Tobias Lütke).",
      sourceIds: [S.dhhHome, S.vergeOmarchy],
    },
    {
      id: "claim-shopify-board",
      kind: "fact",
      text: "He has been a member of Shopify's board of directors since November 2024, according to his official biography.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "claim-danish-investor",
      kind: "fact",
      text: "While living in Denmark from 2020 to 2023 he invested in Danish startups including Workfeed, Ziik, Turis, Servicelovers, and Upteko, and in 2023 he received the Danish IT-Prisen award, in part for that engagement.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "claim-lemans-2014",
      kind: "fact",
      text: "He won his class — GTE-Am — at the 2014 24 Hours of Le Mans driving an Aston Martin; it is his one class win at the race.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "claim-racing-record",
      kind: "fact",
      text: "He has raced the 24 Hours of Le Mans thirteen times since a 2012 debut with OAK Racing, won two American Le Mans Series races and ALMS Rookie of the Year honors in 2012, finished second in LMP2 at Le Mans in 2015 and third in a Porsche in 2016, contested seven FIA World Endurance Championship seasons, and currently races LMP2 in IMSA alongside Shopify CEO Tobias Lütke.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "claim-podium-2017",
      kind: "fact",
      text: "In 2017 he stood on the overall Le Mans podium with Rebellion Racing, but the No. 13 Oreca was disqualified after post-race technical checks — he describes the podium, while the official result is voided.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "claim-politics-memo",
      kind: "fact",
      text: "On April 26, 2021, CEO Jason Fried's 'Changes at Basecamp' post banned 'societal and political discussions' on the company's Basecamp account and ended committees and 'paternalistic' benefits; Hansson followed with his own post defending the direction and offering severance to employees who disagreed.",
      sourceIds: [S.jasonChanges, S.vergeBasecamp, S.letItAllOut],
    },
    {
      id: "claim-exodus",
      kind: "fact",
      text: "On April 30, 2021, roughly a third of Basecamp's 57 employees accepted the buyouts, with about 18 to 20 employees publicly saying they were leaving.",
      sourceIds: [S.vergeBasecamp],
    },
    {
      id: "claim-names-list",
      kind: "fact",
      text: "Reporting later revealed the backdrop to the policy change: an internal list of 'funny' customer names, several with Asian or African origins, whose handling had provoked internal objections; Hansson published his internal response to the employee who disclosed it.",
      sourceIds: [S.letItAllOut, S.wikipedia],
    },
    {
      id: "claim-duke",
      kind: "fact",
      text: "In November 2023 Duke University Libraries announced it would stop using Basecamp, citing the 2021 changes and Hansson's subsequent writing, including his criticisms of DEI programs.",
      sourceIds: [S.wikipedia, S.vergeOmarchy],
    },
    {
      id: "claim-london-post",
      kind: "fact",
      text: "On September 15, 2025, he published 'As I remember London,' praising a march led by activist Tommy Robinson and lamenting that the city is 'no longer full of native Brits.'",
      sourceIds: [S.londonPost],
    },
    {
      id: "claim-governance-calls",
      kind: "fact",
      text: "Following the September 2025 post, some members of the Ruby on Rails community publicly called for Hansson's removal from project governance; no governance change is documented as of this index.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-wolves-post",
      kind: "fact",
      text: "On July 21, 2026, he published 'Wolves, sheep, and gypsies,' drawing an explicit parallel between Denmark's wolf population and Roma people in Copenhagen: 'When wolves get out of control, you shoot them. When gypsies take over public spaces, you deport them.' The Verge characterized his posts as 'overtly racist'; critics including Anil Dash decried the rhetoric as dehumanizing.",
      sourceIds: [S.wolvesPost, S.vergeOmarchy, S.wikipedia],
    },
    {
      id: "claim-1password",
      kind: "fact",
      text: "In September 2026, a $300,000 1Password contribution to the Omacom Foundation drew backlash from customers and employees; CEO David Faugno told staff the money went to the foundation, not to Hansson, and was not an endorsement of his views, while noting Omarchy had become the second most-used Linux distribution among 1Password customers.",
      sourceIds: [S.vergeOmarchy],
    },
    {
      id: "claim-belief-happiness",
      kind: "stated_belief",
      text: "The first pillar of his Rails Doctrine is 'optimize for programmer happiness' — language and framework choices should be judged by the joy they produce, not only by measurable utility.",
      sourceIds: [S.doctrine],
    },
    {
      id: "claim-belief-omakase",
      kind: "stated_belief",
      text: "He argues 'the menu is omakase': a framework should be a curated tasting menu where the chefs pick the stack, and dissenters are free to cook their own meal rather than redesign the menu.",
      sourceIds: [S.doctrine],
    },
    {
      id: "claim-belief-monolith",
      kind: "stated_belief",
      text: "He champions 'the Majestic Monolith': most applications should live in one integrated codebase, and microservices or other distribution should be embraced only when truly necessary.",
      sourceIds: [S.monolith, S.doctrine],
    },
    {
      id: "claim-belief-cloud",
      kind: "stated_belief",
      text: "He holds that 'renting computers is (mostly) a bad deal' for medium-sized companies with stable growth — the promised complexity savings never materialized at 37signals' scale.",
      sourceIds: [S.leavingCloud],
    },
    {
      id: "claim-belief-calm",
      kind: "stated_belief",
      text: "His books and interviews argue for the 'calm company': roughly 40-hour weeks, remote-first work, small teams, and growth kept below the level that turns work crazy.",
      sourceIds: [S.dhhHome, S.lexFridman],
    },
    {
      id: "claim-belief-commons",
      kind: "stated_belief",
      text: "He frames Rails as a contribution to 'a strong, shared, and open commons' — free software that companies like Shopify and Airbnb built on without ever paying for it.",
      sourceIds: [S.houseTestimony],
    },
    {
      id: "claim-belief-politics",
      kind: "stated_belief",
      text: "His political essays argue that European nations should act to preserve native demographic majorities and free speech, and that criticism of immigration is wrongly stigmatized as 'far right' — positions he states on his own blog.",
      sourceIds: [S.londonPost, S.wolvesPost],
    },
    {
      id: "claim-pattern-compression",
      kind: "pattern",
      text: "Across two decades the same arc recurs: compress complexity into something a small team can own — Rails as omakase, the monolith against microservices, owning servers instead of renting cloud, pay-once self-hosted software, and a fully configured Linux desktop.",
      sourceIds: [S.doctrine, S.monolith, S.leavingCloud, S.omarchyOut],
    },
    {
      id: "claim-pattern-public-fights",
      kind: "pattern",
      text: "He repeatedly converts disputes into public campaigns run through his own writing — Apple's App Store demands, cloud pricing, SaaS subscriptions, and later immigration politics — using the blog as both megaphone and record.",
      sourceIds: [S.vergeHey, S.leavingCloud, S.jasonChanges, S.londonPost],
    },
    {
      id: "claim-pattern-fallout",
      kind: "pattern",
      text: "His controversies produce organizational externalities: a third of Basecamp's staff left in 2021, Duke's libraries dropped the product in 2023, Rails community members called for governance changes in 2025, and 1Password's sponsorship of his foundation drew customer and employee backlash in 2026.",
      sourceIds: [S.vergeBasecamp, S.wikipedia, S.vergeOmarchy],
    },
    {
      id: "claim-spec-savings",
      kind: "speculation",
      text: "The five-year savings figures for the cloud exit are self-reported projections that he has revised upward over time; independent reporting corroborates roughly a million dollars per year as of mid-2024.",
      sourceIds: [S.bbcCloud, S.leavingCloud],
    },
    {
      id: "claim-spec-governance",
      kind: "speculation",
      text: "Whether his political writing will alter adoption or governance of Rails or Omarchy is unresolved — community calls for change exist, but no structural change is documented as of this index.",
      sourceIds: [S.wikipedia, S.vergeOmarchy],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1979-10-15",
      title: "Born in Copenhagen, Denmark",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-fried-hire",
      kind: "role",
      date: "2003",
      title: "Hired by Jason Fried; begins building Basecamp in Ruby",
      summary:
        "After catching Fried's attention with PHP help, he built the project-management tool from which Rails was extracted.",
      organization: "37signals",
      organizationHandle: "37signals",
      sourceIds: [S.wikipedia, S.dhhHome],
    },
    {
      id: "event-basecamp-launch",
      kind: "project",
      date: "2004",
      title: "Basecamp launches",
      summary:
        "One of the first software-as-a-service applications, and the original Rails application.",
      sourceIds: [S.wikipedia, S.dhhHome],
    },
    {
      id: "event-rails-oss",
      kind: "project",
      date: "2004",
      title: "Ruby on Rails released as open source",
      summary:
        "The framework extracted from Basecamp is given away, free to anyone.",
      sourceIds: [S.wikipedia, S.houseTestimony],
    },
    {
      id: "event-oscon",
      kind: "award",
      date: "2005",
      title: "Hacker of the Year at OSCON 2005",
      summary:
        "Google and O'Reilly's award for creating Rails; the Jolt Award for Rails 1.0 followed in 2006.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-cbs-chicago",
      kind: "education",
      date: "2005",
      title: "Copenhagen Business School degree; moves to Chicago",
      summary:
        "Bachelor's in Computer Science and Business Administration; relocated to Chicago in November 2005 and became a partner at 37signals.",
      organization: "Copenhagen Business School",
      organizationHandle: "copenhagen-business-school",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-lemans-debut",
      kind: "milestone",
      date: "2012",
      title: "Racing debut at the 24 Hours of Le Mans",
      summary:
        "Drove OAK Racing's LMP2 Morgan-Nissan; the same season he won two ALMS races and Rookie of the Year honors.",
      location: "Le Mans, France",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-lemans-win",
      kind: "award",
      date: "2014-06-15",
      title: "GTE-Am class win at the 24 Hours of Le Mans",
      summary: "Won his class with Aston Martin Racing.",
      location: "Le Mans, France",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "event-house-testimony",
      kind: "other",
      date: "2020-01-17",
      title: "Testifies at House antitrust field hearing",
      summary:
        "Described life as a small software company in the shadow of big tech at the 'Online Platforms and Market Power' hearing in Boulder, Colorado.",
      location: "Boulder, Colorado",
      sourceIds: [S.houseTestimony],
    },
    {
      id: "event-hey-launch",
      kind: "project",
      date: "2020-06-15",
      title: "HEY email service launches — and the Apple App Store fight",
      summary:
        "A $99-per-year take on email; Apple rejected updates and demanded in-app purchase the next day, and days of public pressure ended with approval once HEY added a free temporary-account option.",
      sourceIds: [S.vergeHey, S.vergeHeyApproved, S.dhhHome],
    },
    {
      id: "event-politics-memo",
      kind: "milestone",
      date: "2021-04",
      title: "'Changes at Basecamp' and the staff exodus",
      summary:
        "A ban on societal and political discussions on the company account, plus Hansson's severance offer, ended with roughly a third of the company's 57 employees leaving.",
      sourceIds: [S.jasonChanges, S.vergeBasecamp],
    },
    {
      id: "event-senate-testimony",
      kind: "other",
      date: "2021-04-21",
      title: "Testifies at Senate app-store hearing",
      summary:
        "Witness at 'Antitrust Applied: Examining Competition in App Stores.'",
      sourceIds: [S.senateHearing],
    },
    {
      id: "event-cloud-exit",
      kind: "milestone",
      date: "2022-10-19",
      title: "Announces the cloud exit",
      summary:
        "'Why we're leaving the cloud' set the plan to move off rented infrastructure onto owned hardware, completed in 2023.",
      sourceIds: [S.leavingCloud, S.bbcCloud],
    },
    {
      id: "event-omarchy",
      kind: "project",
      date: "2025-06-26",
      title: "Omarchy released",
      summary:
        "An opinionated Arch Linux + Hyprland developer environment; it grew into a full distribution and a foundation.",
      sourceIds: [S.omarchyOut, S.wikipedia],
    },
    {
      id: "event-railsworld-2026",
      kind: "milestone",
      date: "2026-09-24",
      title: "Rails World 2026 keynote: done writing code by hand",
      summary:
        "He announces he has retired from hand-writing code — a 'maker' now orchestrating agents — with 37signals moving development the same way, including a native, Rust-backed next HEY. 'English is a better programming language than Ruby.'",
      sourceIds: [S.vergeKeynote, S.lavxKeynote],
    },
  ],
  themes: [
    {
      id: "theme-happiness",
      kind: "philosophy",
      status: "stated",
      title: "Optimize for programmer happiness",
      summary:
        "The founding pillar of the Rails Doctrine: tools are judged by the joy they produce for the programmer, with 'exalt beautiful code' as a companion tenet.",
      sourceIds: [S.doctrine, S.lexFridman],
    },
    {
      id: "theme-omakase",
      kind: "philosophy",
      status: "stated",
      title: "The menu is omakase",
      summary:
        "A framework should be a chef's curated tasting menu — coherent defaults chosen with conviction — and people who want a different meal should cook elsewhere rather than redesign the menu.",
      sourceIds: [S.doctrine],
    },
    {
      id: "theme-monolith",
      kind: "method",
      status: "stated",
      title: "The Majestic Monolith",
      summary:
        "Integrated systems beat premature distribution: keep the app in one codebase, value integrated systems, and reach for microservices only when the monolith truly cannot cope.",
      sourceIds: [S.monolith, S.doctrine],
    },
    {
      id: "theme-ownership",
      kind: "belief",
      status: "stated",
      title: "Own the stack, own the business",
      summary:
        "The same independence logic runs through leaving the cloud, pay-once self-hosted software, source-available products, and a personally configured Linux system: rent less, own more.",
      sourceIds: [S.leavingCloud, S.omarchyOut, S.dhhHome],
    },
    {
      id: "theme-calm-company",
      kind: "practice",
      status: "stated",
      title: "The calm company",
      summary:
        "Four books and a running argument: roughly forty-hour weeks, remote-first work, small teams, and growth deliberately below the level that makes work crazy.",
      sourceIds: [S.dhhHome, S.lexFridman],
    },
    {
      id: "theme-open-commons",
      kind: "belief",
      status: "stated",
      title: "A strong, shared, open commons",
      summary:
        "He gave Rails away free and argues the commons is what let companies like Shopify and Airbnb exist — a position he carried into congressional testimony against platform gatekeepers.",
      sourceIds: [S.houseTestimony, S.doctrine],
    },
    {
      id: "theme-contrarian",
      kind: "practice",
      status: "reported",
      title: "The public brawl as method",
      summary:
        "Reporting consistently shows him converting disputes — Apple, the cloud orthodoxy, workplace politics — into published arguments fought in the open on his own platforms.",
      sourceIds: [S.vergeHey, S.leavingCloud, S.vergeBasecamp, S.vergeOmarchy],
    },
    {
      id: "theme-racing",
      kind: "interest",
      status: "stated",
      title: "Endurance racing as a second career",
      summary:
        "Thirteen Le Mans starts, a class win, and a WEC career run parallel to the software work; he frames both as pursuits of flow and precision.",
      sourceIds: [S.dhhHome, S.wikipedia, S.lexFridman],
    },
    {
      id: "theme-politics",
      kind: "belief",
      status: "stated",
      title: "National identity and free-speech politics",
      summary:
        "His later essays argue for preserving native demographic majorities and against policing of 'wrongthink'; press coverage characterizes the posts as far-right and, in places, overtly racist — a characterization he rejects.",
      sourceIds: [S.londonPost, S.wolvesPost, S.vergeOmarchy, S.wikipedia],
    },
  ],
  works: [
    {
      id: "work-rails",
      kind: "project",
      status: "ongoing",
      title: "Ruby on Rails",
      date: "2004",
      summary:
        "The web framework extracted from Basecamp and released as open source; he says companies that started on it are now worth more than half a trillion dollars combined.",
      sourceIds: [S.wikipedia, S.doctrine, S.dhhHome],
    },
    {
      id: "work-basecamp",
      kind: "product",
      status: "ongoing",
      title: "Basecamp",
      date: "2004",
      summary:
        "The project-management SaaS that incubated Rails and remains 37signals' flagship product.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "work-hey",
      kind: "product",
      status: "ongoing",
      title: "HEY",
      date: "2020",
      summary:
        "A paid email service positioned as an alternative to Gmail and Outlook; its launch triggered the public App Store fight with Apple.",
      sourceIds: [S.dhhHome, S.vergeHey],
    },
    {
      id: "work-once",
      kind: "product",
      status: "ongoing",
      title: "ONCE",
      summary:
        "A line of host-it-yourself software — Campfire and Writebook — sold or given away as finished products you run on your own server.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "work-fizzy",
      kind: "product",
      status: "released",
      title: "Fizzy",
      summary:
        "37signals' modern take on kanban, offered as a hosted service with its source available for self-hosting.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "work-hotwire",
      kind: "project",
      status: "ongoing",
      title: "Hotwire",
      summary:
        "The HTML-over-the-wire front-end approach he lists among his creations.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "work-kamal",
      kind: "project",
      status: "ongoing",
      title: "Kamal",
      summary:
        "The deployment tool he bootstrapped to take 37signals off the cloud without giving up containers.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "work-omarchy",
      kind: "project",
      status: "ongoing",
      title: "Omarchy",
      date: "2025-06-26",
      summary:
        "An opinionated Arch Linux + Hyprland system that became a full distribution and, per 1Password's CEO, the second most-used Linux distribution among its customers.",
      sourceIds: [S.omarchyOut, S.vergeOmarchy],
    },
    {
      id: "work-omacom",
      kind: "project",
      status: "in_progress",
      title: "Omacom Foundation",
      date: "2026",
      summary:
        "Nonprofit he founded and presides over to hold Omarchy's trademarks and fund its ecosystem; founding patrons pledged roughly $1 million each.",
      sourceIds: [S.dhhHome, S.vergeOmarchy],
    },
    {
      id: "work-awdr",
      kind: "book",
      status: "published",
      title: "Agile Web Development with Rails",
      date: "2005",
      summary: "The early Rails book co-written with Dave Thomas.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-getting-real",
      kind: "book",
      status: "published",
      title: "Getting Real",
      date: "2006",
      summary:
        "The first 37signals book with Jason Fried — the lessons of building Basecamp.",
      sourceIds: [S.wikipedia, S.dhhHome],
    },
    {
      id: "work-rework",
      kind: "book",
      status: "published",
      title: "Rework",
      date: "2010",
      summary:
        "The bestselling distillation of 37signals' unconventional business practice; his site reports more than a million copies sold.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "work-remote",
      kind: "book",
      status: "published",
      title: "Remote: Office Not Required",
      date: "2013",
      summary:
        "The case for remote work, written years before it became mainstream.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "work-crazy",
      kind: "book",
      status: "published",
      title: "It Doesn't Have to Be Crazy at Work",
      date: "2018",
      summary: "The calm-company book with Jason Fried.",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
  ],
  appearances: [
    {
      id: "appearance-lex-fridman",
      title:
        "DHH: Future of Programming, AI, Ruby on Rails, Productivity & Parenting",
      venue: "Lex Fridman Podcast #474",
      publishedAt: "2025-07-12",
      participants: ["David Heinemeier Hansson", "Lex Fridman"],
      summary:
        "A nearly six-hour conversation covering Rails' doctrine, the cloud exit, Apple, racing, and his views on programming's future.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=vagyIcmIGOQ",
          sourceId: S.lexFridman,
        },
      ],
      sourceIds: [S.lexFridman],
    },
    {
      id: "appearance-senra",
      title: "Interview with David Senra",
      venue: "David Senra (YouTube)",
      participants: ["David Heinemeier Hansson", "David Senra"],
      summary:
        "A long-form interview he lists among his favorite podcast appearances.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=76rR68ktQvo",
        },
      ],
      sourceIds: [S.dhhHome],
    },
    {
      id: "appearance-pragmatic-engineer",
      title: "The Pragmatic Engineer interview",
      venue: "The Pragmatic Engineer",
      participants: ["David Heinemeier Hansson", "Gergely Orosz"],
      summary:
        "An engineering-culture conversation he lists among his favorite appearances.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=JiWgKRgdgpI",
        },
      ],
      sourceIds: [S.dhhHome],
    },
    {
      id: "appearance-primeagen",
      title: "ThePrimeagen interview",
      venue: "ThePrimeagen (YouTube)",
      participants: ["David Heinemeier Hansson", "ThePrimeagen"],
      summary:
        "A programming-community interview he lists among his favorite appearances.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=mTa2d3OLXhg",
        },
      ],
      sourceIds: [S.dhhHome],
    },
    {
      id: "appearance-networkchuck",
      title: "NetworkChuck interview",
      venue: "NetworkChuck (YouTube)",
      participants: ["David Heinemeier Hansson", "NetworkChuck"],
      summary:
        "A creator-economy and Linux conversation he lists among his favorite appearances.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=_CuibYl_Fh0",
        },
      ],
      sourceIds: [S.dhhHome],
    },
    {
      id: "appearance-rework-podcast",
      title: "The REWORK Podcast",
      venue: "37signals",
      participants: ["David Heinemeier Hansson", "Jason Fried"],
      summary:
        "The company podcast on the better way to work and run a business, on which he is a regular guest.",
      media: [
        {
          type: "audio",
          url: "https://37signals.com/podcast/",
        },
      ],
      sourceIds: [S.dhhHome],
    },
    {
      id: "appearance-rails-world",
      title: "Rails World keynote",
      venue: "Rails World",
      participants: ["David Heinemeier Hansson"],
      summary:
        "His conference keynote on where Rails came from and where he is taking it, linked from his own biography.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=HDKUEXBF3B4",
        },
      ],
      sourceIds: [S.dhhHome],
    },
  ],
  relations: [
    {
      id: "rel-37signals",
      kind: "employed_by",
      target: "37signals",
      targetName: "37signals",
      targetKind: "organization",
      note: "Hired by Jason Fried in 2003 to build what became Basecamp; partner from 2005 and now the company's co-owner and CTO. The firm was named Basecamp from 2014 to 2022.",
      start: "2003",
      targetWikidataId: "Q2364173",
      sourceIds: [S.wikipedia, S.dhhHome, S.jasonHello],
    },
    {
      id: "rel-jason-fried",
      kind: "collaborated",
      target: "jason-fried",
      targetName: "Jason Fried",
      note: "His partner and fellow 37signals co-owner; together they co-wrote 'Getting Real,' 'Rework,' 'Remote: Office Not Required,' and 'It Doesn't Have to Be Crazy at Work.'",
      targetWikidataId: "Q23795888",
      sourceIds: [S.dhhHome, S.wikipedia, S.jasonChanges],
    },
    {
      id: "rel-daily-rush",
      kind: "founded",
      target: "daily-rush",
      targetName: "Daily Rush",
      note: "Founded and ran the Danish online gaming news site from 1999 to 2001, while still in his teens.",
      start: "1999",
      end: "2001",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-rails-foundation",
      kind: "founded",
      target: "rails-foundation",
      targetName: "The Rails Foundation",
      targetKind: "organization",
      note: "Started the foundation in 2022 to fund documentation, education, marketing, and events for the framework; serves as its chairman.",
      start: "2022",
      sourceIds: [S.dhhHome],
    },
    {
      id: "rel-omacom-foundation",
      kind: "founded",
      target: "omacom-foundation",
      targetName: "Omacom Foundation",
      targetKind: "organization",
      note: "Started the nonprofit in 2026 to hold Omarchy's trademarks and fund its ecosystem; serves as its president.",
      start: "2026",
      sourceIds: [S.dhhHome, S.vergeOmarchy],
    },
    {
      id: "rel-shopify",
      kind: "member_of",
      target: "shopify",
      targetName: "Shopify",
      targetKind: "organization",
      note: "Member of Shopify's board of directors since November 2024, per his official biography.",
      start: "2024-11",
      targetWikidataId: "Q7501150",
      sourceIds: [S.dhhHome],
    },
    {
      id: "rel-oak-racing",
      kind: "member_of",
      target: "oak-racing",
      targetName: "OAK Racing",
      targetKind: "organization",
      note: "Made his 24 Hours of Le Mans debut in 2012 driving OAK Racing's LMP2 Morgan-Nissan.",
      targetWikidataId: "Q3347494",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "rel-aston-martin-racing",
      kind: "member_of",
      target: "aston-martin-racing",
      targetName: "Aston Martin Racing",
      targetKind: "organization",
      note: "Won the 2014 24 Hours of Le Mans GTE-Am class driving an Aston Martin.",
      targetWikidataId: "Q750016",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "rel-rebellion-racing",
      kind: "member_of",
      target: "rebellion-racing",
      targetName: "Rebellion Racing",
      targetKind: "organization",
      note: "Stood on the overall 2017 Le Mans podium with Rebellion's No. 13 Oreca — the car was later disqualified in post-race checks.",
      targetWikidataId: "Q3421766",
      sourceIds: [S.dhhHome, S.wikipedia],
    },
    {
      id: "rel-dave-thomas",
      kind: "collaborated",
      target: "dave-thomas",
      targetName: "Dave Thomas",
      note: "Co-wrote 'Agile Web Development with Rails' with him in 2005.",
      targetWikidataId: "Q377261",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-tobias-lutke",
      kind: "collaborated",
      target: "tobias-lutke",
      targetName: "Tobias Lütke",
      note: "Races LMP2 in IMSA alongside the Shopify CEO; The Verge also names Lütke among the Omacom Foundation's founding patrons.",
      targetWikidataId: "Q20684647",
      sourceIds: [S.dhhHome, S.wikipedia, S.vergeOmarchy],
    },
    {
      id: "rel-yukihiro-matsumoto",
      kind: "influenced_by",
      target: "yukihiro-matsumoto",
      targetName: "Yukihiro Matsumoto",
      note: "The Rails Doctrine's first pillar, 'optimize for programmer happiness,' is framed as a debt to the Ruby creator's design goal.",
      targetWikidataId: "Q92748",
      sourceIds: [S.doctrine],
    },
    {
      id: "rel-lex-fridman",
      kind: "interviewed_by",
      target: "lex-fridman",
      targetName: "Lex Fridman",
      note: "Lex Fridman Podcast #474, a nearly six-hour conversation, July 2025.",
      targetWikidataId: "Q76448707",
      sourceIds: [S.lexFridman],
    },
    {
      id: "rel-david-senra",
      kind: "interviewed_by",
      target: "david-senra",
      targetName: "David Senra",
      note: "Long-form YouTube interview he lists among his favorite podcast appearances.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "rel-gergely-orosz",
      kind: "interviewed_by",
      target: "gergely-orosz",
      targetName: "Gergely Orosz",
      note: "The Pragmatic Engineer interview, listed among his favorite appearances.",
      targetWikidataId: "Q115090522",
      sourceIds: [S.dhhHome],
    },
    {
      id: "rel-theprimeagen",
      kind: "interviewed_by",
      target: "theprimeagen",
      targetName: "ThePrimeagen",
      note: "Programming-community interview he lists among his favorite appearances.",
      sourceIds: [S.dhhHome],
    },
    {
      id: "rel-networkchuck",
      kind: "interviewed_by",
      target: "networkchuck",
      targetName: "NetworkChuck",
      note: "Creator-economy and Linux conversation he lists among his favorite appearances.",
      sourceIds: [S.dhhHome],
    },
  ],
  openQuestions: [
    "When the Fried–Hansson partnership formally became co-ownership is fuzzy: the company's blog announced him as part of 37signals in January 2005, while profiles variously tie partner status to the 2004 product transition.",
    "The 2017 Le Mans podium stands in his own account, but the No. 13 Rebellion car was disqualified in post-race checks; sources disagree about how the result should be recorded.",
    "The cloud exit's five-year savings are self-reported projections he has revised upward over time; independent reporting corroborates roughly a million dollars per year as of mid-2024.",
    "Whether the political essays will change his standing inside the Rails or Omarchy projects is unresolved — calls for new governance were documented in late 2025, but no structural change is in the record.",
    "His current base is not pinned down in the cited record: his site describes living in Denmark from 2020 to 2023 and investing in Danish startups there, without stating where he primarily resides now.",
  ],
  body: `David Heinemeier Hansson — DHH — is a Danish programmer, entrepreneur, writer, and racing driver who created one of the most consequential pieces of open-source software of the web era and then spent two decades arguing, in public and at volume, that the software industry does most things wrong. He wrote Ruby on Rails, co-owns 37signals with Jason Fried, has co-written four business books, testified before both chambers of the U.S. Congress about big tech, and won his class at the 24 Hours of Le Mans. His recent political writing has made him among the most divisive figures in open source.

## From Copenhagen to Basecamp

Born October 15, 1979 in Copenhagen, Hansson taught himself PHP in high school building gaming review sites, and in 1999 founded the Danish gaming news site Daily Rush, which he ran until 2001. Jason Fried hired him — after Hansson offered help with PHP code — to build a web-based project-management tool. That tool became Basecamp, launched in 2004 as one of the first software-as-a-service products, and Hansson built it in the then-obscure Ruby language. The framework underneath it, released as open source in 2004, became Ruby on Rails.

Rails made him famous fast: "Hacker of the Year" at OSCON 2005 from Google and O'Reilly, then a Jolt Award for Rails 1.0 in 2006. He finished a bachelor's in computer science and business administration at Copenhagen Business School and moved to Chicago in November 2005, becoming a partner at 37signals. He now describes himself as the company's co-owner and CTO. The company itself has changed names twice: renamed from 37signals to Basecamp in 2014 when it bet on a single product, then renamed back to 37signals on May 3, 2022 once it made several again.

## The doctrine: omakase, monoliths, and happiness

His clearest statement of method is The Rails Doctrine, his own account of the framework's nine pillars. Three do most of the work. "Optimize for programmer happiness" — a debt to Ruby's creator Matz — says tools should be judged by the joy they produce. "The menu is omakase" says a framework is a curated tasting menu: the chefs pick the stack, and anyone who dislikes the dishes is free to cook their own. And "value integrated systems" is the doctrine inside his most famous essay, 2016's "The Majestic Monolith," which argues most teams should build one codebase rather than a premature constellation of microservices.

The same compression instinct runs through everything he ships: Hotwire for HTML-over-the-wire front ends, Kamal for container deployment without a platform vendor, ONCE for pay-once self-hosted software (Campfire, Writebook), Fizzy for kanban, and in June 2025 Omarchy — an opinionated Arch Linux and Hyprland setup that grew into a distribution and, by 2026, a foundation he presides over, funded by founding patrons at roughly $1 million each. His site counts ten patrons; The Verge counted twelve, including Patrick Collison, Michael Dell, Jack Dorsey, Tobias Lütke, and Hansson himself.

## The fights: Apple, Congress, and the cloud

The defining public fight began June 16, 2020, the day after the $99-a-year HEY email service launched: Apple rejected a bug-fix update for lacking in-app purchase and threatened removal unless HEY handed over a 30 percent cut. Hansson called Apple "gangsters," fought in the open, and within days Apple approved the update once HEY added a free temporary-account option — HEY opened to everyone on June 25 without paying the tax.

The fight was already Congressional. On January 17, 2020 he had testified at a House Antitrust Subcommittee field hearing in Boulder about life as a small software company in big tech's shadow, including Google's search-ad practices; on April 21, 2021 he testified at the Senate's app-store hearing. Then, on October 19, 2022, he published "Why we're leaving the cloud," arguing that renting computers is mostly a bad deal for stable mid-size companies. The company finished moving off Amazon and Google infrastructure onto its own hardware in 2023; the BBC reported a $3.2 million 2022 cloud bill against roughly $840,000 a year for owned hardware plus colocation — a profit boost above $1 million in 2024, with larger self-reported projections thereafter.

## The second career

In parallel he built a real racing career: a 2012 Le Mans debut with OAK Racing in LMP2, two American Le Mans Series wins and Rookie of the Year the same season, then the 2014 GTE-Am class win at Le Mans with Aston Martin. He finished second in LMP2 in 2015, third in a Porsche in 2016, and stood on the overall podium with Rebellion in 2017 — a result later voided when the car failed post-race technical checks. Thirteen Le Mans starts, seven WEC seasons, and he still races LMP2 in IMSA alongside Shopify CEO Tobias Lütke; he joined Shopify's board in November 2024.

## Politics and the megaphone's cost

The same instinct to argue in public turned inward and then outward. On April 26, 2021, Fried's "Changes at Basecamp" post banned "societal and political discussions" on the company account and ended committees and certain benefits; reporting later revealed the backdrop — an internal list of "funny" customer names with racial and ethnic overtones. Hansson published his internal response and a severance offer; roughly a third of the 57-person company took buyouts on April 30. Duke University Libraries dropped Basecamp in 2023, citing the changes and his later writing against DEI programs.

The essays since have moved further into demographic politics. "As I remember London" (September 15, 2025) praised a march led by Tommy Robinson and mourned that the city is "no longer full of native Brits"; some Rails community members publicly called for new project governance. "Wolves, sheep, and gypsies" (July 21, 2026) drew an explicit parallel between Denmark's wolves and Roma people in Copenhagen — "When wolves get out of control, you shoot them. When gypsies take over public spaces, you deport them" — which The Verge characterized as overtly racist and critics including Anil Dash decried as dehumanizing. Weeks later, a $300,000 1Password contribution to his Omacom Foundation produced customer and employee backlash; 1Password's CEO told staff the money funded the foundation, not the man.

## What the record does not settle

The soft spots are the dates and the projections. Exactly when the Fried–Hansson partnership formalized into co-ownership is inconsistently dated across sources. The 2017 podium is simultaneously real (he stood on it) and voided (the car was disqualified). Cloud-exit savings beyond roughly $1 million a year are his own arithmetic. And the largest question — whether the political writing will cost Rails or Omarchy anything structural — had produced calls, not changes, as of this index.

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
