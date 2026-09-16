#!/usr/bin/env bun
/** Generate examples/people/joel-spolsky/person-index.json with derived source ids. */

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

const josAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About Joel Spolsky",
  url: "https://www.joelonsoftware.com/about-me/",
  publisher: "Joel on Software",
  notes: "The subject's own biography page; claims here are self-reported.",
});
const hashBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Avram Joel Spolsky — Co-founder, HASH",
  url: "https://hash.ai/about/leadership/joel-spolsky",
  publisher: "HASH",
  notes: "Biography on the site of his current company, which he co-founded.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Joel Spolsky (Q2387083)",
  url: "https://www.wikidata.org/wiki/Q2387083",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Joel Spolsky",
  url: "https://en.wikipedia.org/wiki/Joel_Spolsky",
  publisher: "Wikipedia",
  notes:
    "Biography section carries a proseline cleanup notice; used for discovery and corroboration, not as sole authority.",
});
const neverDo = source({
  binding: "first_person",
  mediaType: "article",
  title: "Things You Should Never Do, Part I",
  url: "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
  publisher: "Joel on Software",
  publishedAt: "2000-04-06",
  authors: ["Joel Spolsky"],
  notes: "The essay arguing that rewriting code from scratch is a company's worst strategic mistake.",
});
const joelTest = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Joel Test: 12 Steps to Better Code",
  url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
  publisher: "Joel on Software",
  publishedAt: "2000-08-09",
  authors: ["Joel Spolsky"],
});
const leaky = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Law of Leaky Abstractions",
  url: "https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/",
  publisher: "Joel on Software",
  publishedAt: "2002-11-11",
  authors: ["Joel Spolsky"],
});
const podcast1 = source({
  binding: "first_person",
  mediaType: "audio",
  title: "Stack Overflow Podcast #1",
  url: "https://stackoverflow.blog/2008/04/17/podcast-1/",
  publisher: "Stack Overflow Blog",
  publishedAt: "2008-04-17",
  authors: ["Joel Spolsky", "Jeff Atwood"],
  notes:
    "Inaugural episode of the podcast he co-hosted with Jeff Atwood while they built Stack Overflow.",
});
const soLaunch = source({
  binding: "first_person",
  mediaType: "article",
  title: "Stack Overflow Launches",
  url: "https://www.joelonsoftware.com/2008/09/15/stack-overflow-launches/",
  publisher: "Joel on Software",
  publishedAt: "2008-09-15",
  authors: ["Joel Spolsky"],
});
const announcingTrello = source({
  binding: "first_person",
  mediaType: "article",
  title: "Announcing Trello",
  url: "https://www.joelonsoftware.com/2011/09/13/announcing-trello/",
  publisher: "Joel on Software",
  publishedAt: "2011-09-13",
  authors: ["Joel Spolsky"],
});
const trelloInc = source({
  binding: "first_person",
  mediaType: "article",
  title: "Trello, Inc.",
  url: "https://www.joelonsoftware.com/2014/07/24/trello-inc/",
  publisher: "Joel on Software",
  publishedAt: "2014-07-24",
  authors: ["Joel Spolsky"],
  notes:
    "His account of spinning Trello out of Fog Creek with a minority outside investment co-led by Index Ventures and Spark Capital.",
});
const nextCeo = source({
  binding: "first_person",
  mediaType: "article",
  title: "The next CEO of Stack Overflow",
  url: "https://www.joelonsoftware.com/2019/03/28/the-next-ceo-of-stack-overflow/",
  publisher: "Joel on Software",
  publishedAt: "2019-03-28",
  authors: ["Joel Spolsky"],
});
const blockProtocol = source({
  binding: "first_person",
  mediaType: "article",
  title: "Progress on the Block Protocol",
  url: "https://www.joelonsoftware.com/2022/12/19/progress-on-the-block-protocol/",
  publisher: "Joel on Software",
  publishedAt: "2022-12-19",
  authors: ["Joel Spolsky"],
});
const foundersAtWork = source({
  binding: "interview",
  mediaType: "article",
  title: "Joel Spolsky, Cofounder, Fog Creek Software",
  url: "https://www.foundersatwork.com/joel-spolksy.html",
  publisher: "Founders at Work",
  publishedAt: "2007",
  authors: ["Jessica Livingston"],
  notes:
    "Web excerpt of Jessica Livingston's interview, chapter 25 of Founders at Work (Apress, 2007); the 'spolksy' spelling in the URL is the publisher's own.",
});
const mixergy = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Trello: How A Proven Founder Launches A Startup — with Joel Spolsky",
  url: "https://mixergy.com/interviews/trello-joel-spolsky-interview/",
  publisher: "Mixergy",
  publishedAt: "2011",
  authors: ["Andrew Warner"],
  notes: "Interview page carrying audio and transcript, recorded around Trello's launch.",
});
const atlassianPr = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Atlassian to Acquire Trello to Expand Teamwork Platform",
  url: "https://www.atlassian.com/company/news/press-releases/atlassian-to-acquire-trello-to-expand-teamwork-platform0",
  publisher: "Atlassian",
  publishedAt: "2017-01-09",
  notes: "The acquirer's announcement: approximately $425 million, about $360 million in cash.",
});
const prosusPr = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Prosus to acquire Stack Overflow for US$1.8 billion",
  url: "https://www.prosus.com/news-insights/2021/prosus-to-acquire-stack-overflow",
  publisher: "Prosus",
  publishedAt: "2021-06-02",
  notes: "The acquirer's announcement of the definitive agreement.",
});
const fastlyPr = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Fastly acquires Glitch for 'yes code' at edge",
  url: "https://www.fastly.com/blog/fastly-announces-acquisition-of-glitch-a-future-of-yes-code-at-the-edge",
  publisher: "Fastly",
  publishedAt: "2022-05-19",
  notes: "The acquirer's announcement; terms were not disclosed in the post.",
});
const tcTrello = source({
  binding: "reporting",
  mediaType: "article",
  title: "Joel Spolsky's Trello Is A Simple Workflow And List Manager For Groups",
  url: "https://techcrunch.com/2011/09/13/joel-spolskys-trello-is-a-simple-workflow-and-list-manager-for-groups/",
  publisher: "TechCrunch",
  publishedAt: "2011-09-13",
  authors: ["Leena Rao"],
  notes: "Contemporaneous coverage of the Trello launch at TechCrunch Disrupt.",
});
const vergeGlitch = source({
  binding: "reporting",
  mediaType: "article",
  title: "Glitch acquired by cloud service provider Fastly",
  url: "https://www.theverge.com/2022/5/19/23126349/glitch-fastly-acquired-coding-anil-dash-fog-creek",
  publisher: "The Verge",
  publishedAt: "2022-05-19",
  notes:
    "Coverage of the Fastly acquisition that also recounts the Fog Creek-to-Glitch renaming and the company's spinout history.",
});

const S = {
  josAbout: josAbout.id,
  hashBio: hashBio.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  neverDo: neverDo.id,
  joelTest: joelTest.id,
  leaky: leaky.id,
  podcast1: podcast1.id,
  soLaunch: soLaunch.id,
  announcingTrello: announcingTrello.id,
  trelloInc: trelloInc.id,
  nextCeo: nextCeo.id,
  blockProtocol: blockProtocol.id,
  foundersAtWork: foundersAtWork.id,
  mixergy: mixergy.id,
  atlassianPr: atlassianPr.id,
  prosusPr: prosusPr.id,
  fastlyPr: fastlyPr.id,
  tcTrello: tcTrello.id,
  vergeGlitch: vergeGlitch.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-joel-spolsky",
  generatedAt: "2026-09-16T19:30:00Z",
  subject: {
    kind: "person",
    handle: "joel-spolsky",
    displayName: "Joel Spolsky",
    alsoKnownAs: ["Avram Joel Spolsky"],
    summary:
      "American software engineer, writer, and entrepreneur: program manager on the Microsoft Excel team, author of the Joel on Software blog and books, and co-founder of Fog Creek Software, Stack Overflow, Trello, and HASH.",
    identity: {
      wikidataId: "Q2387083",
      officialSite: "https://www.joelonsoftware.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Joel_Spolsky",
    },
  },
  scope: {
    asOf: "2026-09-16T19:30:00Z",
    coverage: ["biography", "writing", "companies", "philosophy", "media"],
  },
  sources: [
    josAbout,
    hashBio,
    wikidata,
    wikipedia,
    neverDo,
    joelTest,
    leaky,
    podcast1,
    soLaunch,
    announcingTrello,
    trelloInc,
    nextCeo,
    blockProtocol,
    foundersAtWork,
    mixergy,
    atlassianPr,
    prosusPr,
    fastlyPr,
    tcTrello,
    vergeGlitch,
  ],
  claims: [
    {
      id: "claim-born-1965",
      kind: "fact",
      text: "Avram Joel Spolsky was born in 1965 in Albuquerque, New Mexico, and grew up there until age fifteen.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-israel-years",
      kind: "fact",
      text: "His family moved to Israel, where he finished high school, completed his military service in the Paratroopers Brigade, and was one of the founders of Kibbutz Hanaton in Lower Galilee.",
      sourceIds: [S.wikipedia, S.josAbout],
    },
    {
      id: "claim-yale-1991",
      kind: "fact",
      text: "He returned to the United States in 1987, studied a year at the University of Pennsylvania, then transferred to Yale University — a member of Pierson College — graduating in 1991 with a BS summa cum laude in computer science.",
      sourceIds: [S.wikipedia, S.wikidata, S.josAbout],
    },
    {
      id: "claim-excel-pm",
      kind: "fact",
      text: "From 1991 to 1994 he was a program manager on the Microsoft Excel team, where he designed Excel Basic and drove Microsoft's Visual Basic for Applications strategy; he describes himself as the program manager responsible for the launch of VBA in Excel 5.0.",
      sourceIds: [S.wikipedia, S.josAbout],
    },
    {
      id: "claim-nyc-juno",
      kind: "fact",
      text: "He moved to New York City in 1995, where he worked for Viacom and Juno Online Services.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-fogcreek-2000",
      kind: "fact",
      text: "In 2000 he co-founded Fog Creek Software with Michael Pryor; it began as a consulting company and pivoted to products as the dot-com consulting market vanished.",
      sourceIds: [S.foundersAtWork, S.wikipedia, S.josAbout],
    },
    {
      id: "claim-jos-blog",
      kind: "fact",
      text: "Also in 2000 he launched Joel on Software, described as one of the first blogs run by a business owner; it became one of the most widely read software-development blogs.",
      sourceIds: [S.josAbout, S.wikipedia, S.foundersAtWork],
    },
    {
      id: "claim-fogbugz",
      kind: "fact",
      text: "Fog Creek's first product was FogBugz, a bug-tracking package productized from an internal tool and shipped in late 2000.",
      sourceIds: [S.foundersAtWork, S.josAbout],
    },
    {
      id: "claim-aardvarkd",
      kind: "fact",
      text: "In 2005 he co-produced and appeared in 'Aardvark'd: 12 Weeks with Geeks,' a documentary following Fog Creek interns building Project Aardvark, the remote-assistance tool shipped as Fog Creek Copilot.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-podcast-2008",
      kind: "fact",
      text: "In April 2008 he and Jeff Atwood began recording their weekly phone calls as the Stack Overflow podcast while they built the site.",
      sourceIds: [S.podcast1],
    },
    {
      id: "claim-so-launch",
      kind: "fact",
      text: "Stack Overflow, the free programming Q&A site he co-founded with Jeff Atwood, opened to the public on September 15, 2008, after a five-week private beta.",
      sourceIds: [S.soLaunch, S.wikipedia],
    },
    {
      id: "claim-so-ceo",
      kind: "fact",
      text: "He served as CEO of Stack Overflow from 2010 to 2019; he announced a CEO search in March 2019, moved to chairman, and Prashanth Chandrasekar succeeded him on October 1, 2019.",
      sourceIds: [S.josAbout, S.nextCeo, S.wikipedia],
    },
    {
      id: "claim-stack-exchange-network",
      kind: "fact",
      text: "Stack Overflow became the flagship of the Stack Exchange network of topic-specific Q&A sites — more than 160 sites in the description on his own about page — under the company that was long named Stack Exchange, Inc.",
      sourceIds: [S.josAbout, S.wikipedia],
    },
    {
      id: "claim-trello-launch",
      kind: "fact",
      text: "Trello, a kanban-style visual project-management tool prototyped inside Fog Creek by a small team, launched publicly at TechCrunch Disrupt on September 13, 2011.",
      sourceIds: [S.announcingTrello, S.tcTrello, S.wikipedia],
    },
    {
      id: "claim-trello-spinout",
      kind: "fact",
      text: "On July 24, 2014, with Trello at 4.6 million users, he announced its spinout into a separate company, Trello Inc., funded by a minority outside investment co-led by Index Ventures and Spark Capital; Fog Creek co-founder Michael Pryor became Trello's CEO.",
      sourceIds: [S.trelloInc],
    },
    {
      id: "claim-trello-sale",
      kind: "fact",
      text: "Atlassian announced its acquisition of Trello on January 9, 2017, valued at approximately $425 million — about $360 million in cash plus stock — when the service had more than 19 million registered users.",
      sourceIds: [S.atlassianPr, S.wikipedia],
    },
    {
      id: "claim-dash-glitch",
      kind: "fact",
      text: "Anil Dash was appointed CEO of Fog Creek in December 2016; in 2018 the company renamed itself Glitch, Inc., after its flagship developer-community product.",
      sourceIds: [S.vergeGlitch, S.wikipedia],
    },
    {
      id: "claim-prosus",
      kind: "fact",
      text: "On June 2, 2021, Prosus announced a definitive agreement to acquire Stack Overflow for approximately US$1.8 billion; Spolsky stepped down as chairman following the sale.",
      sourceIds: [S.prosusPr, S.wikipedia],
    },
    {
      id: "claim-fastly",
      kind: "fact",
      text: "In May 2022 Fastly acquired Glitch; Spolsky stepped down as its chairman, ending the Fog Creek corporate line he had founded twenty-two years earlier.",
      sourceIds: [S.fastlyPr, S.vergeGlitch, S.wikipedia],
    },
    {
      id: "claim-four-books",
      kind: "fact",
      text: "He has written four books on software development published by Apress: User Interface Design for Programmers (2001), Joel on Software (2004), Smart and Gets Things Done (2007), and More Joel on Software (2008).",
      sourceIds: [S.josAbout, S.wikipedia],
    },
    {
      id: "claim-hash",
      kind: "fact",
      text: "He is a co-founder of HASH — alongside Dei Vilkinsons and former Fog Creek CTO Jude Allred — whose team develops the Block Protocol, an open standard for reusable web blocks.",
      sourceIds: [S.hashBio, S.josAbout, S.blockProtocol],
    },
    {
      id: "claim-personal",
      kind: "fact",
      text: "He is married to his husband, Jared, and lives on Manhattan's Upper West Side; his own bio notes preoccupations including Arduino projects, LED art, Barry's Bootcamp, and Burning Man.",
      sourceIds: [S.wikipedia, S.josAbout],
    },
    {
      id: "claim-never-rewrite",
      kind: "stated_belief",
      text: "He argues that rewriting code from scratch is 'the single worst strategic mistake' a software company can make: old code embodies tested knowledge and bug fixes, and 'it's harder to read code than to write it' is the reason programmers always want to throw it away.",
      sourceIds: [S.neverDo],
    },
    {
      id: "claim-leaky-abstractions",
      kind: "stated_belief",
      text: "His Law of Leaky Abstractions holds that all non-trivial abstractions leak to some degree — so abstractions save working time but not learning time, and competent developers must understand what the abstraction hides.",
      sourceIds: [S.leaky],
    },
    {
      id: "claim-joel-test-doctrine",
      kind: "stated_belief",
      text: "He distrusts heavyweight process certification, offering instead his deliberately 'highly irresponsible, sloppy' twelve-question Joel Test — source control through hallway usability testing — as a three-minute gauge of a software team's quality.",
      sourceIds: [S.joelTest],
    },
    {
      id: "claim-programmers-stars",
      kind: "stated_belief",
      text: "He founded Fog Creek to be the kind of software company where he would want to work — 'one where programmers were the stars' — expressed through private offices, catered lunches, top-end hardware, and humane management.",
      sourceIds: [S.foundersAtWork, S.trelloInc, S.mixergy],
    },
    {
      id: "claim-hiring-doctrine",
      kind: "stated_belief",
      text: "His hiring doctrine — the title of his 2007 book — is to hire only people who are 'smart and get things done,' treating recruiting and interviewing as a software company's core competency.",
      sourceIds: [S.josAbout, S.foundersAtWork],
    },
    {
      id: "claim-free-forever",
      kind: "stated_belief",
      text: "He framed Stack Overflow as a free, open community resource built 'by programmers, for programmers' — a deliberate repudiation of paywalled help sites — intended to stay free forever.",
      sourceIds: [S.soLaunch, S.podcast1],
    },
    {
      id: "claim-traction-then-vc",
      kind: "stated_belief",
      text: "He holds that outside investment should come only after traction and revenue, on minority, non-controlling terms — the structure he used for both Stack Overflow and the 2014 Trello spinout, where he says 'we kept control of the company.'",
      sourceIds: [S.trelloInc],
    },
    {
      id: "claim-open-protocols",
      kind: "stated_belief",
      text: "He argues the web was built on open protocols and that a free, open Block Protocol can let reusable blocks work across applications without vendor lock-in.",
      sourceIds: [S.blockProtocol, S.hashBio],
    },
    {
      id: "claim-internal-tools-pattern",
      kind: "pattern",
      text: "Fog Creek's products repeatedly began as internal tools or small experiments: FogBugz was an internal bug tracker, and Trello grew from a two-person prototype dogfooded inside the company at seven hundred lines of code.",
      sourceIds: [S.foundersAtWork, S.announcingTrello, S.trelloInc],
    },
    {
      id: "claim-audience-first",
      kind: "pattern",
      text: "His launch playbook stayed consistent: build a large audience with free, opinionated writing, then launch products into it — the blog seeded FogBugz's market, the Stack Overflow podcast built the site in public, and Trello launched to a pre-won readership.",
      sourceIds: [S.foundersAtWork, S.podcast1, S.announcingTrello],
    },
    {
      id: "claim-incubator",
      kind: "pattern",
      text: "Fog Creek operated as an incubator whose hits became separate companies — Stack Overflow, Trello, and the renamed Glitch itself — while the parent stayed deliberately small.",
      sourceIds: [S.vergeGlitch, S.trelloInc, S.josAbout],
    },
    {
      id: "claim-writing-voice",
      kind: "pattern",
      text: "His essays share a signature register — jokes, concrete war stories, and blunt aphorisms — that carried engineering argument to a mainstream business audience and made individual posts durable industry canon.",
      sourceIds: [S.joelTest, S.neverDo, S.leaky],
    },
    {
      id: "claim-jv-terms",
      kind: "speculation",
      text: "Early accounts describe Stack Overflow as a joint venture between Fog Creek and Jeff Atwood, with Atwood as its first CEO, but the venture's equity and governance terms were never publicly itemized.",
      sourceIds: [S.podcast1, S.wikipedia],
    },
    {
      id: "claim-blog-attribution",
      kind: "speculation",
      text: "How much of Stack Overflow's and Trello's outcomes to credit to the Joel on Software audience is asserted repeatedly — including by Spolsky himself — but is not independently measurable.",
      sourceIds: [S.foundersAtWork, S.mixergy],
    },
    {
      id: "claim-fogcreek-finances",
      kind: "speculation",
      text: "Fog Creek's profitability and product-level finances were self-reported on his blog and in interviews; as a private company it never disclosed audited figures.",
      sourceIds: [S.trelloInc, S.foundersAtWork],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1965",
      title: "Born in Albuquerque, New Mexico",
      summary: "Born to Jewish parents; raised in Albuquerque until age fifteen.",
      location: "Albuquerque, New Mexico",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-israel",
      kind: "other",
      date: "1980",
      title: "Moved to Israel",
      summary:
        "Finished high school, served as a paratrooper in the IDF, and was among the founders of Kibbutz Hanaton in Lower Galilee.",
      location: "Israel",
      sourceIds: [S.wikipedia, S.josAbout],
    },
    {
      id: "event-yale",
      kind: "education",
      date: "1991",
      title: "BS in computer science, Yale University",
      summary:
        "Graduated summa cum laude after transferring from the University of Pennsylvania; member of Pierson College.",
      organization: "Yale University",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-microsoft",
      kind: "role",
      date: "1991",
      end: "1994",
      title: "Program manager, Microsoft Excel team",
      summary:
        "Designed Excel Basic and drove the Visual Basic for Applications strategy; he calls himself the PM responsible for VBA's launch in Excel 5.0.",
      organization: "Microsoft",
      sourceIds: [S.wikipedia, S.josAbout],
    },
    {
      id: "event-fogcreek",
      kind: "founded",
      date: "2000",
      title: "Founded Fog Creek Software and Joel on Software",
      summary:
        "After moving to New York in 1995 for Viacom and Juno, he co-founded Fog Creek with Michael Pryor and began the Joel on Software blog.",
      organization: "Fog Creek Software",
      location: "New York City",
      sourceIds: [S.foundersAtWork, S.josAbout, S.wikipedia],
    },
    {
      id: "event-fogbugz",
      kind: "milestone",
      date: "2000-11",
      title: "Shipped FogBugz, Fog Creek's first product",
      summary:
        "Productized the company's internal bug tracker as consulting work disappeared in the dot-com crash.",
      sourceIds: [S.foundersAtWork],
    },
    {
      id: "event-aardvarkd",
      kind: "media",
      date: "2005",
      title: "Aardvark'd: 12 Weeks with Geeks and Fog Creek Copilot",
      summary:
        "Co-produced and appeared in the documentary about Fog Creek interns building the remote-assistance tool shipped as Copilot.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-so-launch",
      kind: "founded",
      date: "2008-09-15",
      title: "Stack Overflow opened to the public",
      summary:
        "Co-founded with Jeff Atwood; the pair had documented the build on their weekly podcast since April.",
      organization: "Stack Overflow",
      sourceIds: [S.soLaunch, S.podcast1, S.wikipedia],
    },
    {
      id: "event-trello-launch",
      kind: "project",
      date: "2011-09-13",
      title: "Launched Trello at TechCrunch Disrupt",
      summary:
        "The kanban-style collaboration tool grew out of a small-team prototype initiative inside Fog Creek.",
      organization: "Fog Creek Software",
      location: "San Francisco",
      sourceIds: [S.announcingTrello, S.tcTrello],
    },
    {
      id: "event-trello-spinout",
      kind: "milestone",
      date: "2014-07-24",
      title: "Trello spun out as Trello Inc.",
      summary:
        "A minority investment co-led by Index Ventures and Spark Capital made Trello a separate company under CEO Michael Pryor.",
      organization: "Trello Inc.",
      sourceIds: [S.trelloInc],
    },
    {
      id: "event-trello-atlassian",
      kind: "milestone",
      date: "2017-01-09",
      title: "Atlassian announced its acquisition of Trello",
      summary: "Approximately $425 million for a service with more than 19 million registered users.",
      organization: "Atlassian",
      sourceIds: [S.atlassianPr, S.wikipedia],
    },
    {
      id: "event-ceo-exit",
      kind: "role",
      date: "2019-10-01",
      title: "Stepped down as Stack Overflow CEO",
      summary:
        "Prashanth Chandrasekar succeeded him after the March 2019 search announcement; Spolsky moved to chairman of the board. Earlier, in December 2016, Anil Dash had become Fog Creek's CEO; Fog Creek renamed itself Glitch in 2018.",
      organization: "Stack Overflow",
      sourceIds: [S.nextCeo, S.wikipedia, S.vergeGlitch],
    },
    {
      id: "event-prosus",
      kind: "milestone",
      date: "2021-06-02",
      title: "Prosus announced acquisition of Stack Overflow",
      summary:
        "Approximately US$1.8 billion; Spolsky stepped down as chairman following the sale.",
      organization: "Prosus",
      sourceIds: [S.prosusPr, S.wikipedia],
    },
    {
      id: "event-fastly",
      kind: "milestone",
      date: "2022-05-19",
      title: "Fastly acquired Glitch",
      summary:
        "The successor to Fog Creek Software joined the edge-cloud provider; Spolsky stepped down as its chairman.",
      organization: "Fastly",
      sourceIds: [S.fastlyPr, S.vergeGlitch],
    },
  ],
  themes: [
    {
      id: "theme-never-rewrite",
      kind: "philosophy",
      status: "stated",
      title: "Never rewrite from scratch",
      summary:
        "The doctrine of 'Things You Should Never Do': running code is a repository of found and fixed bugs, and programmers' itch to bulldoze it stems from a fundamental law — it is harder to read code than to write it. Architectural, efficiency, and style problems should be fixed in place.",
      sourceIds: [S.neverDo],
    },
    {
      id: "theme-leaky-abstractions",
      kind: "philosophy",
      status: "stated",
      title: "All non-trivial abstractions leak",
      summary:
        "TCP, SQL, remote file systems, string classes — every abstraction eventually fails to hide what it abstracts. The practical consequence he draws: learn the layer underneath, because abstractions save work but never learning.",
      sourceIds: [S.leaky],
    },
    {
      id: "theme-team-hygiene",
      kind: "method",
      status: "stated",
      title: "Cheap legible hygiene over heavyweight process",
      summary:
        "The Joel Test was offered as a deliberate spoof of systems like SEMA: twelve yes-or-no questions — source control, one-step builds, daily builds, a bug database, quiet conditions, testers, code at interview — that a team can score in three minutes.",
      sourceIds: [S.joelTest],
    },
    {
      id: "theme-hiring",
      kind: "method",
      status: "stated",
      title: "Hire smart people who get things done",
      summary:
        "His 2007 book distills Fog Creek's recruiting into one filter — 'smart, and gets things done' — with structured interviewing, resume sorting, and phone screens treated as a software company's core competency rather than an interruption of it.",
      sourceIds: [S.josAbout, S.foundersAtWork],
    },
    {
      id: "theme-developers-first",
      kind: "practice",
      status: "stated",
      title: "A company where the best developers want to work",
      summary:
        "His phrase for the shared operating system under Fog Creek, Trello, and Stack Overflow: private daylit offices, remote work, catered lunches, Aeron chairs, fully paid insurance, reasonable hours — treating people 'fairly, humanely, kindly' as an engineering strategy.",
      sourceIds: [S.trelloInc, S.foundersAtWork, S.mixergy],
    },
    {
      id: "theme-free-knowledge",
      kind: "belief",
      status: "stated",
      title: "Programming knowledge should be free and findable",
      summary:
        "Stack Overflow was designed to unlock answers trapped in forums, books, and paywalled help sites — free to ask, answer, and read, with voting and wiki mechanics surfacing the best answers. He promised it would stay free and open forever.",
      sourceIds: [S.soLaunch, S.podcast1],
    },
    {
      id: "theme-bootstrap-spinout",
      kind: "method",
      status: "reported",
      title: "Bootstrap, then spin out winners",
      summary:
        "His stated playbook: a profitable core funds small-team experiments; products that catch get spun out with minority, founder-friendly capital rather than folded into the parent. Fog Creek ran the loop for Stack Overflow, Trello, and Glitch.",
      sourceIds: [S.trelloInc, S.vergeGlitch],
    },
    {
      id: "theme-writing-as-strategy",
      kind: "practice",
      status: "reported",
      title: "Essays as a distribution engine",
      summary:
        "The blog was never marketing decoration: it built the audience that launched FogBugz, seeded Stack Overflow's first users through the podcast, and made Trello's debut an event — a pattern Jessica Livingston's interview frames as an early template for founder-led content.",
      sourceIds: [S.foundersAtWork, S.joelTest, S.leaky, S.podcast1],
    },
    {
      id: "theme-open-protocols",
      kind: "belief",
      status: "stated",
      title: "Open protocols beat platforms",
      summary:
        "His current work at HASH extends the old argument: the web was built with open protocols, so a free, public Block Protocol should let any application's blocks work in any other — no gatekeeper required.",
      sourceIds: [S.blockProtocol, S.hashBio],
    },
  ],
  works: [
    {
      id: "work-joel-on-software",
      kind: "project",
      status: "ongoing",
      title: "Joel on Software",
      date: "2000",
      summary:
        "His blog on software development, management, and business — running since 2000, though posting has been sporadic in recent years.",
      sourceIds: [S.josAbout, S.wikipedia],
    },
    {
      id: "work-fogbugz",
      kind: "product",
      status: "released",
      title: "FogBugz",
      date: "2000-11",
      summary:
        "Fog Creek's first product: a bug tracker productized from an internal tool as consulting work dried up; later renamed Manuscript and sold to DevFactory in 2018.",
      sourceIds: [S.foundersAtWork, S.josAbout],
    },
    {
      id: "work-joel-test",
      kind: "other",
      status: "published",
      title: "The Joel Test: 12 Steps to Better Code",
      date: "2000-08-09",
      summary:
        "His best-known essay: twelve yes-or-no questions offered as a three-minute, deliberately unscientific rating of a software team.",
      sourceIds: [S.joelTest],
    },
    {
      id: "work-copilot",
      kind: "product",
      status: "released",
      title: "Fog Creek Copilot",
      date: "2005",
      summary:
        "Remote-assistance tool built by Fog Creek interns as Project Aardvark — the project documented in Aardvark'd.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-aardvarkd",
      kind: "film",
      status: "released",
      title: "Aardvark'd: 12 Weeks with Geeks",
      date: "2005",
      summary:
        "Documentary he co-produced and appeared in, following four interns through a summer building Copilot at Fog Creek.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-uidp",
      kind: "book",
      status: "published",
      title: "User Interface Design for Programmers",
      date: "2001",
      summary: "His first book, on designing usable software interfaces (Apress).",
      sourceIds: [S.josAbout, S.wikipedia],
    },
    {
      id: "work-jos-book",
      kind: "book",
      status: "published",
      title: "Joel on Software",
      date: "2004",
      summary:
        "The first Apress collection of his blog essays, including the Joel Test and the leaky-abstractions piece.",
      sourceIds: [S.josAbout, S.wikipedia],
    },
    {
      id: "work-smart-gets-things-done",
      kind: "book",
      status: "published",
      title:
        "Smart and Gets Things Done: Joel Spolsky's Concise Guide to Finding the Best Technical Talent",
      date: "2007",
      summary: "His hiring book: recruiting and interviewing as a software company's core competency.",
      sourceIds: [S.josAbout, S.wikipedia],
    },
    {
      id: "work-more-jos",
      kind: "book",
      status: "published",
      title: "More Joel on Software",
      date: "2008",
      summary: "The second Apress collection of his essays.",
      sourceIds: [S.josAbout, S.wikipedia],
    },
    {
      id: "work-stack-overflow",
      kind: "product",
      status: "released",
      title: "Stack Overflow",
      date: "2008-09-15",
      summary:
        "The free programming Q&A site co-founded with Jeff Atwood; flagship of the Stack Exchange network; acquired by Prosus in 2021.",
      sourceIds: [S.soLaunch, S.prosusPr, S.wikipedia],
    },
    {
      id: "work-so-podcast",
      kind: "recording",
      status: "released",
      title: "The Stack Overflow Podcast (original run)",
      date: "2008",
      summary:
        "The weekly show he co-hosted with Jeff Atwood beginning April 17, 2008 — recorded phone calls documenting the site being built in public.",
      sourceIds: [S.podcast1],
    },
    {
      id: "work-trello",
      kind: "product",
      status: "released",
      title: "Trello",
      date: "2011-09-13",
      summary:
        "Kanban-style visual collaboration tool built at Fog Creek, spun out as Trello Inc. in 2014, and acquired by Atlassian in 2017 for approximately $425 million.",
      sourceIds: [S.announcingTrello, S.trelloInc, S.atlassianPr],
    },
    {
      id: "work-kiln",
      kind: "product",
      status: "released",
      title: "Kiln",
      summary:
        "Fog Creek's source-control hosting and code-review tool, named alongside FogBugz as a continuing Fog Creek product in his 2014 spinout post.",
      sourceIds: [S.trelloInc],
    },
    {
      id: "work-glitch",
      kind: "product",
      status: "released",
      title: "Glitch",
      date: "2017",
      summary:
        "The friendly community for building web apps that gave the renamed Fog Creek its identity and, in 2022, its acquirer: Fastly.",
      sourceIds: [S.vergeGlitch, S.fastlyPr, S.josAbout],
    },
    {
      id: "work-block-protocol",
      kind: "project",
      status: "ongoing",
      title: "Block Protocol",
      date: "2022",
      summary:
        "The open standard for reusable, interoperable web blocks developed at HASH, which he co-founded.",
      sourceIds: [S.blockProtocol, S.hashBio],
    },
    {
      id: "work-hash",
      kind: "project",
      status: "ongoing",
      title: "HASH",
      summary:
        "The company he co-founded with Dei Vilkinsons and Jude Allred — described by HASH as his fourth business.",
      sourceIds: [S.hashBio, S.josAbout],
    },
  ],
  appearances: [
    {
      id: "appearance-podcast-1",
      title: "Stack Overflow Podcast #1",
      venue: "Stack Overflow Blog",
      publishedAt: "2008-04-17",
      participants: ["Joel Spolsky", "Jeff Atwood"],
      summary:
        "The inaugural episode of the weekly podcast the co-founders recorded while building Stack Overflow.",
      media: [
        {
          type: "audio",
          url: "https://stackoverflow.blog/2008/04/17/podcast-1/",
          sourceId: S.podcast1,
        },
      ],
      sourceIds: [S.podcast1],
    },
    {
      id: "appearance-aardvarkd",
      title: "Aardvark'd: 12 Weeks with Geeks",
      venue: "Fog Creek Software",
      publishedAt: "2005",
      participants: ["Joel Spolsky"],
      summary:
        "He co-produced and appears in this documentary following Fog Creek interns building the Copilot remote-assistance tool.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "appearance-founders-at-work",
      title: "Founders at Work, chapter 25",
      venue: "Jessica Livingston / Apress",
      publishedAt: "2007",
      participants: ["Joel Spolsky", "Jessica Livingston"],
      summary:
        "His fullest on-the-record account of Fog Creek's early days — the vanished consulting market, FogBugz's productization, and the blog's role.",
      media: [
        {
          type: "article",
          url: "https://www.foundersatwork.com/joel-spolksy.html",
          sourceId: S.foundersAtWork,
        },
      ],
      sourceIds: [S.foundersAtWork],
    },
    {
      id: "appearance-mixergy",
      title: "Trello: How A Proven Founder Launches A Startup",
      venue: "Mixergy",
      publishedAt: "2011",
      participants: ["Joel Spolsky", "Andrew Warner"],
      summary:
        "An interview on launching Trello into the audience his writing had built, with Fog Creek's hit-or-miss product history as backdrop.",
      media: [
        {
          type: "transcript",
          url: "https://mixergy.com/interviews/trello-joel-spolsky-interview/",
          sourceId: S.mixergy,
        },
      ],
      sourceIds: [S.mixergy],
    },
    {
      id: "appearance-disrupt",
      title: "Trello Startup Battlefield presentation",
      venue: "TechCrunch Disrupt San Francisco",
      publishedAt: "2011-09",
      participants: ["Joel Spolsky"],
      summary:
        "Trello's public debut on the Disrupt stage, covered contemporaneously by TechCrunch.",
      media: [
        {
          type: "video",
          url: "https://techcrunch.com/video/trello-startup-battlefield-presentation/",
        },
      ],
      sourceIds: [S.tcTrello, S.announcingTrello],
    },
  ],
  openQuestions: [
    "Only his birth year (1965) is given in the authoritative record; Wikidata and Wikipedia do not publish a verified full date.",
    "The equity and governance terms of the original Fog Creek–Jeff Atwood venture behind Stack Overflow were never publicly itemized.",
    "Sources differ on when his Stack Overflow CEO tenure began — his own about page says 2010–2019, while his HASH biography says 2008–2019.",
    "Whether he retains board seats or economics in Stack Overflow or Glitch after the Prosus and Fastly sales is undisclosed; he stepped down as chairman of each.",
    "Fog Creek's profitability and product-level finances were self-reported; as a private company it never disclosed audited figures.",
    "His present day-to-day involvement at HASH versus board-level participation is not detailed in the public record.",
  ],
  body: `Joel Spolsky is an American software engineer, writer, and entrepreneur whose career runs through three distinct layers of the software industry: he was the program manager who drove Visual Basic for Applications onto the Microsoft Excel team, he wrote the Joel on Software essays that became a generation's canon on how software actually gets built, and he co-founded two of the most-used products on the developer web — Stack Overflow and Trello — out of a deliberately small New York company that behaved like an incubator before the word was fashionable.

## Identity and formation

Born in 1965 in Albuquerque, New Mexico, Spolsky moved with his family to Israel at fifteen. He finished high school there, served in the Israel Defense Forces' Paratroopers Brigade, and was among the founders of Kibbutz Hanaton in Lower Galilee. Returning to the United States in 1987, he spent a year at the University of Pennsylvania before transferring to Yale, where he graduated in 1991 with a BS summa cum laude in computer science.

Microsoft hired him directly onto the Excel team, where from 1991 to 1994 he designed Excel Basic and drove the company's Visual Basic for Applications strategy — he describes himself as the program manager responsible for shipping VBA in Excel 5.0. In 1995 he moved to New York City for Viacom and then Juno Online Services, an early internet company whose rise and stall he would later mine for essay material.

## The blog that became canon

In 2000 Spolsky co-founded Fog Creek Software with Michael Pryor and, almost incidentally, launched Joel on Software — described as one of the first blogs run by a business owner. The essays were unlike anything else in the trade press: funny, concrete, opinionated, and built from war stories. "Things You Should Never Do, Part I" (April 2000) argued that rewriting code from scratch is the single worst strategic mistake a software company can make, because working code embodies years of found-and-fixed bugs and because "it's harder to read code than to write it." "The Joel Test" (August 2000) mocked heavyweight process certification with twelve deliberately "sloppy" yes-or-no questions a team can answer in three minutes. "The Law of Leaky Abstractions" (November 2002) gave the industry a durable phrase: all non-trivial abstractions leak, so abstractions save working time but never learning time.

Four Apress books carried the writing to print — User Interface Design for Programmers (2001), Joel on Software (2004), Smart and Gets Things Done (2007), and More Joel on Software (2008) — and the audience the blog built became, in effect, his distribution engine for everything that followed.

## Fog Creek: the accidental incubator

Fog Creek began as a consulting company, and its origin story is one he tells on himself: the consulting market "disappeared in November of 2000," he told Jessica Livingston in Founders at Work, so the company wrapped up an internal bug tracker and started selling it as FogBugz. The pattern held for two decades — a profitable core funding small-team experiments, with winners spun out rather than folded in. Copilot, a remote-assistance tool built by interns, was documented in the 2005 film Aardvark'd: 12 Weeks with Geeks, which he co-produced and appeared in. Other bets (CityDesk, and a never-written product called Tintin) failed quietly.

Underneath sat a stated operating system he repeated across companies: build "a company where the best developers want to work" — private daylit offices, catered lunches, Aeron chairs, fully paid insurance — on the theory that humane treatment is an engineering strategy, not a perk.

## Stack Overflow and Trello

In April 2008 Spolsky and Jeff Atwood began recording their weekly phone calls as the Stack Overflow podcast, building in public a free programming Q&A site explicitly aimed against paywalled help sites. It opened September 15, 2008, after a five-week beta, and grew into the Stack Exchange network. Spolsky served as CEO from 2010 to 2019, then chairman; on June 2, 2021, Prosus announced its acquisition of Stack Overflow for roughly $1.8 billion, and he stepped down from the chairmanship.

Trello followed the same arc: a two-person prototype inside Fog Creek in early 2011, a launch at TechCrunch Disrupt that September, 4.6 million users by mid-2014 — when he spun it out as Trello Inc. with minority capital co-led by Index Ventures and Spark Capital and Michael Pryor as CEO — and a January 2017 acquisition by Atlassian for approximately $425 million. Fog Creek itself hired Anil Dash as CEO in late 2016, renamed itself Glitch in 2018 after its developer-community product, and sold to Fastly in May 2022 — at which point Spolsky stepped down as chairman there too.

## After the exits

He is now co-founder of HASH, with Dei Vilkinsons and former Fog Creek CTO Jude Allred, and writes occasionally about its Block Protocol — an open standard for reusable web blocks that extends his long-standing preference for open protocols over platforms. He married his husband, Jared, and lives on Manhattan's Upper West Side; his own bio lists Arduino projects, LED art, Barry's Bootcamp, and Burning Man among his preoccupations.

## What the record does not settle

The authoritative record gives only his birth year. The Fog Creek–Atwood venture's terms were never itemized. Sources disagree on whether his Stack Overflow CEO tenure began in 2008 or 2010. Fog Creek's finances were self-reported rather than disclosed, and how much of Stack Overflow's and Trello's outcomes to credit to the blog's audience is asserted often — including by Spolsky — but not independently measurable.

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
