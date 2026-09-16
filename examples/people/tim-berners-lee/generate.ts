#!/usr/bin/env bun
/** Generate examples/people/tim-berners-lee/person-index.json with derived source ids. */

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

const w3bio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Tim Berners-Lee",
  url: "https://www.w3.org/People/Berners-Lee/",
  publisher: "W3C",
  notes:
    "The subject's own biography page, maintained on the W3C site; roles and honors here are self-reported.",
});
const weaving = source({
  binding: "first_person",
  mediaType: "book",
  title:
    "Weaving the Web: The Original Design and Ultimate Destiny of the World Wide Web",
  url: "https://www.w3.org/People/Berners-Lee/Weaving/Overview.html",
  publisher: "Harper San Francisco",
  publishedAt: "1999",
  authors: ["Tim Berners-Lee", "Mark Fischetti"],
  notes:
    "The book's own page on his W3C site; his memoir-history of the web's invention.",
});
const mediumStep = source({
  binding: "first_person",
  mediaType: "article",
  title: "One Small Step for the Web…",
  url: "https://medium.com/@timberners_lee/one-small-step-for-the-web-87f92217d085",
  publisher: "Medium",
  publishedAt: "2018-09-29",
  authors: ["Tim Berners-Lee"],
  notes:
    "His post announcing the Solid project and the founding of Inrupt to support it.",
});
const threeChallenges = source({
  binding: "first_person",
  mediaType: "article",
  title: "Three challenges for the web, according to its inventor",
  url: "https://webfoundation.org/2017/03/web-turns-28-letter/",
  publisher: "World Wide Web Foundation",
  publishedAt: "2017-03-12",
  authors: ["Tim Berners-Lee"],
  notes:
    "Open letter on the web's 28th birthday: personal data control, misinformation, and political advertising transparency.",
});
const wfShutdown = source({
  binding: "first_person",
  mediaType: "pdf",
  title: "An Update on the Future of the Web Foundation",
  url: "https://webfoundation.org/docs/2024/09/Public_letter_WWWF.pdf",
  publisher: "World Wide Web Foundation",
  publishedAt: "2024-09-27",
  authors: ["Tim Berners-Lee", "Rosemary Leith"],
  notes:
    "Open letter announcing the Foundation's wind-down after fifteen years so he can focus on the Solid protocol and decentralized systems.",
});
const netNeutrality = source({
  binding: "first_person",
  mediaType: "article",
  title: "Net Neutrality: This is serious",
  url: "https://dig.csail.mit.edu/breadcrumbs/node/144",
  publisher: "Decentralized Information Group (MIT CSAIL)",
  publishedAt: "2006-06-21",
  authors: ["Tim Berners-Lee"],
  notes: "His personal blog post defending net neutrality.",
});
const ted2009 = source({
  binding: "first_person",
  mediaType: "video",
  title: "Tim Berners-Lee on the next Web",
  url: "https://www.ted.com/talks/tim_berners_lee_on_the_next_web",
  publisher: "TED",
  publishedAt: "2009-03",
  notes:
    "TED2009 talk on open, linked data, remembered for leading the audience in a 'raw data now' chant.",
});
const sciam = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Semantic Web",
  url: "https://www.scientificamerican.com/article/the-semantic-web/",
  publisher: "Scientific American",
  publishedAt: "2001-05",
  authors: ["Tim Berners-Lee", "James Hendler", "Ora Lassila"],
  notes:
    "The magazine feature that introduced the Semantic Web to a general audience.",
});
const vanityFair = source({
  binding: "interview",
  mediaType: "article",
  title:
    "'I Was Devastated': Tim Berners-Lee, the Man Who Created the World Wide Web, Has Some Regrets",
  url: "https://www.vanityfair.com/news/2018/07/the-man-who-created-the-world-wide-web-has-some-regrets",
  publisher: "Vanity Fair",
  publishedAt: "2018-07",
  authors: ["Katrina Brooker"],
});
const wuwm = source({
  binding: "interview",
  mediaType: "article",
  title: "The Father Of The Web Is Worried About How Ugly It's Become",
  url: "https://www.wuwm.com/health-science/2017-04-04/the-father-of-the-web-is-worried-about-how-ugly-its-become",
  publisher: "WUWM",
  publishedAt: "2017-04-04",
  authors: ["Asma Khalid"],
  notes:
    "WBUR interview published by NPR member station WUWM on the day the Turing Award was announced.",
});
const acmTuring = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Sir Tim Berners-Lee — A.M. Turing Award Laureate",
  url: "https://amturing.acm.org/award_winners/berners-lee_8087960.cfm",
  publisher: "Association for Computing Machinery",
  notes:
    "Laureate page for the 2016 award, announced 4 April 2017, with a selected honors list.",
});
const cernLicensing = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Licensing the Web",
  url: "https://home.cern/science/computing/the-birth-of-the-web/licensing-web/",
  publisher: "CERN",
  notes:
    "CERN's institutional account of the 30 April 1993 statement putting the web software in the public domain.",
});
const w3cOlympics = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "This is for Everyone: the Tweet Heard Around the World",
  url: "https://www.w3.org/news/2012/this-is-for-everyone-the-tweet-heard-around-the-world/",
  publisher: "W3C",
  publishedAt: "2012-07-30",
});
const sothebys = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "This Changed Everything: Source Code for WWW x Tim Berners-Lee, an NFT",
  url: "https://www.sothebys.com/en/digital-catalogues/this-changed-everything",
  publisher: "Sotheby's",
  publishedAt: "2021",
  notes:
    "Auction catalogue for the NFT of the web's original source files; records the $5,434,500 result of 30 June 2021.",
});
const bbcKnight = source({
  binding: "reporting",
  mediaType: "article",
  title: "Web's inventor gets a knighthood",
  url: "http://news.bbc.co.uk/2/hi/technology/3357073.stm",
  publisher: "BBC News",
  publishedAt: "2003-12-31",
  notes:
    "Report on the 2004 New Year Honours announcement; includes a biographical sidebar on his early life.",
});
const techcrunch = source({
  binding: "reporting",
  mediaType: "article",
  title: "Tim Berners-Lee is on a mission to decentralize the web",
  url: "https://techcrunch.com/2018/10/09/tim-berners-lee-is-on-a-mission-to-decentralize-the-web/",
  publisher: "TechCrunch",
  publishedAt: "2018-10-09",
  notes:
    "Report on Inrupt's emergence from stealth and the Solid project's goals.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Tim Berners-Lee (Q80)",
  url: "https://www.wikidata.org/wiki/Q80",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Tim Berners-Lee",
  url: "https://en.wikipedia.org/wiki/Tim_Berners-Lee",
  publisher: "Wikipedia",
  notes: "Used for discovery and cross-checking, not as sole authority.",
});
const altHypertext = source({
  binding: "archive",
  mediaType: "article",
  title: "WorldWideWeb: Summary",
  url: "https://www.w3.org/People/Berners-Lee/1991/08/art-6487.txt",
  publisher: "W3C",
  publishedAt: "1991-08-06",
  authors: ["Tim Berners-Lee"],
  notes:
    "W3C-hosted copy of the 6 August 1991 alt.hypertext Usenet post (Message-ID <6487@cernvax.cern.ch>) that announced the project publicly.",
});
const proposal = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Information Management: A Proposal",
  url: "https://www.w3.org/History/1989/proposal.html",
  publisher: "W3C",
  publishedAt: "1989-03",
  authors: ["Tim Berners-Lee"],
  notes:
    "Hand conversion of the March 1989 CERN proposal; his note records that the only name he had for the system then was 'Mesh'.",
});

const S = {
  w3bio: w3bio.id,
  weaving: weaving.id,
  mediumStep: mediumStep.id,
  threeChallenges: threeChallenges.id,
  wfShutdown: wfShutdown.id,
  netNeutrality: netNeutrality.id,
  ted2009: ted2009.id,
  sciam: sciam.id,
  vanityFair: vanityFair.id,
  wuwm: wuwm.id,
  acmTuring: acmTuring.id,
  cernLicensing: cernLicensing.id,
  w3cOlympics: w3cOlympics.id,
  sothebys: sothebys.id,
  bbcKnight: bbcKnight.id,
  techcrunch: techcrunch.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  altHypertext: altHypertext.id,
  proposal: proposal.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-tim-berners-lee",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "tim-berners-lee",
    displayName: "Tim Berners-Lee",
    alsoKnownAs: [
      "TimBL",
      "TBL",
      "Sir Tim Berners-Lee",
      "Timothy John Berners-Lee",
    ],
    summary:
      "English computer scientist who invented the World Wide Web at CERN in 1989–1990, wrote the first browser, server, and the HTML/HTTP/URI specifications, founded the W3C and the Web Foundation, and now leads the Solid decentralized-data project through his company Inrupt.",
    identity: {
      wikidataId: "Q80",
      officialSite: "https://www.w3.org/People/Berners-Lee/",
      wikipedia: "https://en.wikipedia.org/wiki/Tim_Berners-Lee",
      profiles: ["https://x.com/timberners_lee"],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media", "awards"],
  },
  sources: [
    w3bio,
    weaving,
    mediumStep,
    threeChallenges,
    wfShutdown,
    netNeutrality,
    ted2009,
    sciam,
    vanityFair,
    wuwm,
    acmTuring,
    cernLicensing,
    w3cOlympics,
    sothebys,
    bbcKnight,
    techcrunch,
    wikidata,
    wikipedia,
    altHypertext,
    proposal,
  ],
  claims: [
    {
      id: "claim-born-1955",
      kind: "fact",
      text: "Tim Berners-Lee was born on 8 June 1955 in London, England.",
      sourceIds: [S.wikidata, S.wikipedia, S.bbcKnight],
    },
    {
      id: "claim-parents-ferranti",
      kind: "fact",
      text: "Both of his parents were mathematicians who worked on the Ferranti Mark 1, one of the first commercial stored-program computers.",
      sourceIds: [S.wikipedia, S.weaving],
    },
    {
      id: "claim-oxford-physics",
      kind: "fact",
      text: "He studied physics at The Queen's College, Oxford, in the mid-1970s; after he and a friend were caught hacking, he was banned from the university computer and built his own machine from a Motorola processor, an old television, and a soldering iron.",
      sourceIds: [S.bbcKnight, S.wikipedia],
    },
    {
      id: "claim-early-career",
      kind: "fact",
      text: "After Oxford he worked at Plessey Telecommunications and at D.G. Nash writing typesetting software, spent half of 1980 at CERN as a consultant, then worked at Image Computer Systems before returning to CERN as a fellow in 1984.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-enquire",
      kind: "fact",
      text: "In 1980 at CERN he wrote ENQUIRE, a personal hypertext notebook for tracking people, software, and projects, named after the Victorian household manual 'Enquire Within Upon Everything'.",
      sourceIds: [S.wikipedia, S.weaving],
    },
    {
      id: "claim-proposal-1989",
      kind: "fact",
      text: "In March 1989 he submitted 'Information Management: A Proposal' to CERN management, arguing for a distributed hypertext system to stop institutional information loss; his supervisor Mike Sendall annotated it 'vague but exciting', and a redated version circulated in May 1990.",
      sourceIds: [S.proposal, S.wikipedia, S.weaving],
    },
    {
      id: "claim-cailliau",
      kind: "fact",
      text: "CERN engineer Robert Cailliau independently championed the project and co-authored with Berners-Lee the November 1990 management proposal 'WorldWideWeb: Proposal for a HyperText Project'.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-first-browser",
      kind: "fact",
      text: "By the end of 1990, working on a NeXT cube at CERN, he had written the first web browser-editor (WorldWideWeb, later renamed Nexus), the first web server (CERN httpd), and the first website, hosted at info.cern.ch.",
      sourceIds: [S.w3bio, S.acmTuring, S.wikipedia],
    },
    {
      id: "claim-alt-hypertext",
      kind: "fact",
      text: "On 6 August 1991 he posted 'WorldWideWeb: Summary' to the alt.hypertext Usenet newsgroup and made the project's files available on the Internet by FTP — the web's public debut.",
      sourceIds: [S.altHypertext, S.wikipedia],
    },
    {
      id: "claim-cern-1993",
      kind: "fact",
      text: "On 30 April 1993 CERN issued a statement placing the web's software — the line-mode client, the basic server, and the library of common code — in the public domain, free for anyone to use, duplicate, modify, and redistribute.",
      sourceIds: [S.cernLicensing, S.wikipedia],
    },
    {
      id: "claim-w3c-1994",
      kind: "fact",
      text: "In October 1994 he founded the World Wide Web Consortium (W3C) at MIT's Laboratory for Computer Science and directed it until W3C became an independent public-interest nonprofit in January 2023; he remains its Emeritus Director and an honorary board member.",
      sourceIds: [S.w3bio, S.bbcKnight, S.wikipedia],
    },
    {
      id: "claim-weaving-book",
      kind: "fact",
      text: "In 1999 he published 'Weaving the Web' with Mark Fischetti, his account of the web's original design and its 'ultimate destiny'.",
      sourceIds: [S.weaving, S.wikipedia],
    },
    {
      id: "claim-semantic-web",
      kind: "fact",
      text: "In May 2001 he co-authored 'The Semantic Web' in Scientific American with James Hendler and Ora Lassila, arguing for a web of machine-readable data alongside documents written for people.",
      sourceIds: [S.sciam],
    },
    {
      id: "claim-knighthood",
      kind: "fact",
      text: "He was appointed OBE in 1997 and made a Knight Commander of the Order of the British Empire in the 2004 New Year Honours for 'services to the global development of the Internet'; Queen Elizabeth II invested him at Buckingham Palace in July 2004.",
      sourceIds: [S.bbcKnight, S.wikipedia, S.acmTuring],
    },
    {
      id: "claim-orders-prizes",
      kind: "fact",
      text: "His other honors include the Japan Prize (2002), the first Millennium Technology Prize (2004), appointment to the Order of Merit (2007), and a share of the inaugural Queen Elizabeth Prize for Engineering (2013).",
      sourceIds: [S.acmTuring, S.wikipedia],
    },
    {
      id: "claim-turing",
      kind: "fact",
      text: "On 4 April 2017, the ACM named him recipient of the 2016 A.M. Turing Award 'for inventing the World Wide Web, the first web browser, and the fundamental protocols and algorithms allowing the Web to scale'.",
      sourceIds: [S.acmTuring, S.w3bio],
    },
    {
      id: "claim-net-neutrality-post",
      kind: "fact",
      text: "In June 2006, on his personal blog at MIT's Decentralized Information Group, he published 'Net Neutrality: This is serious', arguing that nondiscriminatory carriage was under threat from US telecom lobbying.",
      sourceIds: [S.netNeutrality],
    },
    {
      id: "claim-webfoundation",
      kind: "fact",
      text: "He co-founded the World Wide Web Foundation, launched in 2009 to advance the web as a public good; its board wound the organization down on 27 September 2024 so he could concentrate on the Solid protocol and decentralized systems.",
      sourceIds: [S.w3bio, S.wfShutdown],
    },
    {
      id: "claim-datagovuk",
      kind: "fact",
      text: "In 2009 the UK prime minister appointed him and Nigel Shadbolt as information advisers; their work produced the data.gov.uk open-data portal launched in January 2010, and in 2012 the two co-founded the Open Data Institute in London.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-olympics",
      kind: "fact",
      text: "On 27 July 2012 he was honored in the London Olympics opening ceremony, live-tweeting 'This is for everyone' from a NeXT cube on stage while the message was displayed around the stadium.",
      sourceIds: [S.w3cOlympics, S.wikipedia],
    },
    {
      id: "claim-inrupt-solid",
      kind: "fact",
      text: "In September 2018 he announced that he had taken a sabbatical from MIT and founded Inrupt with CEO John Bruce to give commercial backing to Solid, the open-source decentralized-data project his MIT team had been developing; the company emerged from stealth in early October 2018.",
      sourceIds: [S.mediumStep, S.techcrunch],
    },
    {
      id: "claim-contract",
      kind: "fact",
      text: "In November 2019 his Web Foundation launched the Contract for the Web — nine principles for governments, companies, and citizens drafted with over 80 organizations — which the Foundation credits with holding governments and corporations to account.",
      sourceIds: [S.wikipedia, S.wfShutdown],
    },
    {
      id: "claim-nft",
      kind: "fact",
      text: "In June 2021 he auctioned 'This Changed Everything', an NFT of the web's original timestamped source files with an animated visualization, a signed digital poster, and a letter from him, at Sotheby's; it sold for $5,434,500 with proceeds directed to initiatives he and his wife support.",
      sourceIds: [S.sothebys],
    },
    {
      id: "claim-roles-now",
      kind: "fact",
      text: "He is a professor emeritus at MIT CSAIL, a professorial research fellow at the University of Oxford, and CTO and co-founder of Inrupt.",
      sourceIds: [S.w3bio, S.wikipedia],
    },
    {
      id: "claim-next-machine",
      kind: "fact",
      text: "The NeXT machine that ran the first server — famously stickered 'This machine is a server. DO NOT POWER IT DOWN!!' — is preserved at CERN.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-openness",
      kind: "stated_belief",
      text: "He has consistently argued that the web's royalty-free, unpatented openness is why it spread, and that he deliberately did not seek to profit personally from the invention.",
      sourceIds: [S.weaving, S.bbcKnight, S.cernLicensing],
    },
    {
      id: "claim-net-neutrality-belief",
      kind: "stated_belief",
      text: "He treats net neutrality as a founding property of the web: 'When I invented the Web, I didn't have to ask anyone's permission.'",
      sourceIds: [S.netNeutrality],
    },
    {
      id: "claim-three-challenges",
      kind: "stated_belief",
      text: "In his 2017 open letter he named three threats to the web's mission: the loss of control over personal data, the spread of misinformation, and the lack of transparency in online political advertising.",
      sourceIds: [S.threeChallenges],
    },
    {
      id: "claim-solid-belief",
      kind: "stated_belief",
      text: "He argues the web 'has evolved into an engine of inequity and division' and that Solid restores 'the power and agency of individuals' by letting people keep their data in personal online stores they control.",
      sourceIds: [S.mediumStep],
    },
    {
      id: "claim-universality",
      kind: "stated_belief",
      text: "His creed for the web is universality — that it is for everyone, everywhere — the message he projected from the London 2012 opening ceremony.",
      sourceIds: [S.w3cOlympics, S.mediumStep],
    },
    {
      id: "claim-devastated",
      kind: "stated_belief",
      text: "He told Vanity Fair in 2018 'I was devastated' — describing the pain of watching the web distorted by mass surveillance, fake news, and exploitation of users.",
      sourceIds: [S.vanityFair],
    },
    {
      id: "claim-linked-data-belief",
      kind: "stated_belief",
      text: "Since the late 1990s he has pushed for a web of linked data, not just linked documents — at TED2009 leading the audience in a chant of 'raw data now'.",
      sourceIds: [S.ted2009, S.sciam],
    },
    {
      id: "claim-contract-belief",
      kind: "stated_belief",
      text: "Through the Contract for the Web he argues that governments, companies, and citizens each carry responsibilities for keeping the web a force for good rather than leaving it to any single party.",
      sourceIds: [S.wfShutdown, S.wikipedia],
    },
    {
      id: "claim-build-then-release",
      kind: "pattern",
      text: "Across four decades the pattern repeats: he builds a system — ENQUIRE, the World Wide Web, W3C, the Web Foundation, Solid — then gives it away or hands it to an institution rather than owning it himself.",
      sourceIds: [S.proposal, S.cernLicensing, S.mediumStep, S.wfShutdown],
    },
    {
      id: "claim-warning-arc",
      kind: "pattern",
      text: "His public warnings have tracked the web's centralization in sequence: net neutrality in 2006, surveillance and corporate control through the 2010s, the 2017 letter's three challenges, then Solid and the Contract for the Web as engineered answers.",
      sourceIds: [S.netNeutrality, S.threeChallenges, S.mediumStep, S.vanityFair],
    },
    {
      id: "claim-institution-builder",
      kind: "pattern",
      text: "Rather than founding a startup from the web itself, he repeatedly chose standards bodies, foundations, and open projects as vehicles — W3C, the Web Foundation, the Open Data Institute — with Inrupt only in 2018 as Solid's commercial arm.",
      sourceIds: [S.w3bio, S.wfShutdown, S.mediumStep, S.wikipedia],
    },
    {
      id: "claim-solid-unproven",
      kind: "speculation",
      text: "Whether Solid and Inrupt can actually rebalance the web remains open: adoption is still niche, and the bet that ordinary users will manage their own data stores is unproven at platform scale.",
      sourceIds: [S.techcrunch, S.mediumStep],
    },
    {
      id: "claim-nft-tension",
      kind: "speculation",
      text: "The 2021 NFT sale is the one time he monetized the invention's symbolism; the artifact package was sold while the code itself stays public, and how the sale sits beside a career of giving the web away is a matter of interpretation.",
      sourceIds: [S.sothebys, S.wikipedia],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1955-06-08",
      title: "Born in London",
      summary:
        "Born to mathematician parents who worked on the Ferranti Mark 1 computer.",
      location: "London, England",
      sourceIds: [S.wikidata, S.wikipedia, S.bbcKnight],
    },
    {
      id: "event-enquire",
      kind: "project",
      date: "1980",
      title: "Writes ENQUIRE at CERN",
      summary:
        "A personal hypertext notebook written during a six-month consultancy — the seed of the web.",
      organization: "CERN",
      location: "Geneva, Switzerland",
      sourceIds: [S.wikipedia, S.weaving],
    },
    {
      id: "event-proposal",
      kind: "publication",
      date: "1989-03",
      title: "Information Management: A Proposal",
      summary:
        "The circulated proposal for a distributed hypertext system; Mike Sendall called it 'vague but exciting'.",
      organization: "CERN",
      sourceIds: [S.proposal, S.wikipedia],
    },
    {
      id: "event-first-web",
      kind: "project",
      date: "1990-12",
      title: "First browser, server, and website running",
      summary:
        "WorldWideWeb browser-editor and CERN httpd on a NeXT cube; the first site at info.cern.ch.",
      location: "CERN, Geneva",
      sourceIds: [S.w3bio, S.acmTuring, S.wikipedia],
    },
    {
      id: "event-alt-hypertext",
      kind: "milestone",
      date: "1991-08-06",
      title: "Web announced publicly on alt.hypertext",
      summary:
        "'WorldWideWeb: Summary' posted to Usenet and the files released by FTP.",
      sourceIds: [S.altHypertext, S.wikipedia],
    },
    {
      id: "event-cern-free",
      kind: "milestone",
      date: "1993-04-30",
      title: "CERN puts the web in the public domain",
      summary:
        "CERN relinquished all intellectual property rights in the web software, royalty-free.",
      organization: "CERN",
      sourceIds: [S.cernLicensing, S.wikipedia],
    },
    {
      id: "event-w3c",
      kind: "founded",
      date: "1994-10",
      title: "Founds the World Wide Web Consortium at MIT",
      summary:
        "Established W3C at MIT's Laboratory for Computer Science to steward open web standards.",
      organization: "MIT",
      location: "Cambridge, Massachusetts",
      sourceIds: [S.w3bio, S.bbcKnight, S.wikipedia],
    },
    {
      id: "event-knighted",
      kind: "award",
      date: "2004-07-16",
      title: "Knighted by Queen Elizabeth II",
      summary:
        "Invested as Knight Commander of the Order of the British Empire at Buckingham Palace; announced in the 2004 New Year Honours.",
      location: "Buckingham Palace, London",
      sourceIds: [S.bbcKnight, S.wikipedia],
    },
    {
      id: "event-webfoundation",
      kind: "founded",
      date: "2009",
      title: "Launches the World Wide Web Foundation",
      summary:
        "A foundation devoted to the web as a public good; wound down in September 2024.",
      sourceIds: [S.w3bio, S.wfShutdown],
    },
    {
      id: "event-olympics",
      kind: "media",
      date: "2012-07-27",
      title: "'This is for everyone' at the London Olympics",
      summary:
        "Honored in the opening ceremony; live-tweeted the message from a NeXT cube on stage.",
      location: "London, England",
      sourceIds: [S.w3cOlympics, S.wikipedia],
    },
    {
      id: "event-turing",
      kind: "award",
      date: "2017-04-04",
      title: "Named recipient of the 2016 ACM Turing Award",
      summary:
        "For inventing the World Wide Web, the first browser, and the protocols and algorithms allowing it to scale.",
      sourceIds: [S.acmTuring, S.w3bio],
    },
    {
      id: "event-inrupt",
      kind: "founded",
      date: "2018-09",
      title: "Announces Solid and founds Inrupt",
      summary:
        "Sabbatical from MIT to lead the decentralized-data effort; Inrupt emerged from stealth in October 2018.",
      organization: "Inrupt",
      sourceIds: [S.mediumStep, S.techcrunch],
    },
    {
      id: "event-contract",
      kind: "milestone",
      date: "2019-11",
      title: "Contract for the Web launches",
      summary:
        "Nine principles for governments, companies, and citizens, backed at launch by over 150 organizations and several governments.",
      sourceIds: [S.wikipedia, S.wfShutdown],
    },
    {
      id: "event-wf-close",
      kind: "other",
      date: "2024-09-27",
      title: "Web Foundation winds down",
      summary:
        "The board closed the Foundation after fifteen years so he could focus on Solid and decentralized systems.",
      organization: "World Wide Web Foundation",
      sourceIds: [S.wfShutdown],
    },
  ],
  themes: [
    {
      id: "theme-universality",
      kind: "belief",
      status: "stated",
      title: "The web is for everyone",
      summary:
        "His founding creed and his public refrain: a universal, open information space available to all humanity — the message he broadcast from the Olympic stage in 2012.",
      sourceIds: [S.w3cOlympics, S.mediumStep, S.threeChallenges],
    },
    {
      id: "theme-openness",
      kind: "philosophy",
      status: "stated",
      title: "Royalty-free and permissionless",
      summary:
        "The web spread because no one had to ask permission or pay a license. He defends that property on every front — from the 1993 CERN release to net neutrality — and never patented or profited from the invention.",
      sourceIds: [S.cernLicensing, S.netNeutrality, S.bbcKnight, S.weaving],
    },
    {
      id: "theme-decentralization",
      kind: "philosophy",
      status: "stated",
      title: "Decentralization as survival",
      summary:
        "The original design had no central point of control — 'breaking apart silos' — and his recent work treats re-decentralizing the web as the way to rescue it.",
      sourceIds: [S.proposal, S.altHypertext, S.mediumStep, S.wuwm],
    },
    {
      id: "theme-data-sovereignty",
      kind: "belief",
      status: "stated",
      title: "You should own your data",
      summary:
        "Through Solid he argues personal data should live in stores the individual controls, with apps granted access — reversing the trade in which platforms hold the data.",
      sourceIds: [S.mediumStep, S.threeChallenges, S.techcrunch],
    },
    {
      id: "theme-linked-data",
      kind: "interest",
      status: "stated",
      title: "A web of linked data, not just documents",
      summary:
        "From the 2001 Semantic Web article to the 'raw data now' TED talk, he argues the next web links machine-readable data — government, scientific, personal — the way the first web linked pages.",
      sourceIds: [S.sciam, S.ted2009],
    },
    {
      id: "theme-web-repair",
      kind: "practice",
      status: "reported",
      title: "Campaigning to repair the web",
      summary:
        "Since the mid-2000s he has run public campaigns against the web's capture — net neutrality, the three-challenges letter, the Contract for the Web — using anniversaries and his own standing as leverage.",
      sourceIds: [S.netNeutrality, S.threeChallenges, S.wfShutdown, S.vanityFair],
    },
    {
      id: "theme-institution-builder",
      kind: "practice",
      status: "reported",
      title: "Builds institutions, not empires",
      summary:
        "W3C, the Web Foundation, the Open Data Institute, and Inrupt are all vehicles for public-interest infrastructure — a career-long preference for stewardship over ownership.",
      sourceIds: [S.w3bio, S.wfShutdown, S.mediumStep, S.wikipedia],
    },
    {
      id: "theme-watchfulness",
      kind: "belief",
      status: "reported",
      title: "The inventor's unease",
      summary:
        "Since the mid-2010s his public register has carried grief alongside optimism — 'devastated' by surveillance and misinformation, yet still insisting the web can be fixed.",
      sourceIds: [S.vanityFair, S.threeChallenges, S.wuwm],
    },
  ],
  works: [
    {
      id: "work-enquire",
      kind: "product",
      status: "completed",
      title: "ENQUIRE",
      date: "1980",
      location: "CERN, Geneva",
      summary:
        "A personal hypertext notebook for tracking people and projects — the forerunner of the web.",
      sourceIds: [S.wikipedia, S.weaving],
    },
    {
      id: "work-proposal",
      kind: "paper",
      status: "published",
      title: "Information Management: A Proposal",
      date: "1989-03",
      location: "CERN, Geneva",
      summary:
        "The circulated document proposing a distributed hypertext system for CERN — the web's founding text.",
      sourceIds: [S.proposal, S.wikipedia],
    },
    {
      id: "work-worldwideweb",
      kind: "product",
      status: "completed",
      title: "WorldWideWeb (later Nexus)",
      date: "1990",
      location: "CERN, Geneva",
      summary:
        "The first web browser and editor, written on NeXTSTEP; renamed Nexus to avoid confusion with the web itself.",
      sourceIds: [S.w3bio, S.acmTuring, S.altHypertext],
    },
    {
      id: "work-httpd",
      kind: "product",
      status: "completed",
      title: "CERN httpd",
      date: "1990",
      location: "CERN, Geneva",
      summary: "The first web server software.",
      sourceIds: [S.w3bio, S.acmTuring],
    },
    {
      id: "work-infocern",
      kind: "project",
      status: "completed",
      title: "info.cern.ch — the first website",
      date: "1990",
      location: "CERN, Geneva",
      summary:
        "The first web address, describing the project and how to get a browser and server.",
      sourceIds: [S.altHypertext, S.wikipedia],
    },
    {
      id: "work-w3c",
      kind: "other",
      status: "ongoing",
      title: "World Wide Web Consortium",
      date: "1994-10",
      location: "Cambridge, Massachusetts",
      summary:
        "The open-standards consortium he founded at MIT and directed until it became an independent nonprofit in 2023; he remains Emeritus Director.",
      sourceIds: [S.w3bio, S.bbcKnight, S.wikipedia],
    },
    {
      id: "work-weaving",
      kind: "book",
      status: "published",
      title: "Weaving the Web",
      date: "1999",
      summary:
        "His memoir-history of the web's design and destiny, written with Mark Fischetti.",
      sourceIds: [S.weaving],
    },
    {
      id: "work-semantic-web",
      kind: "paper",
      status: "published",
      title: "The Semantic Web (Scientific American)",
      date: "2001-05",
      summary:
        "The widely read statement of the web-of-data vision, with James Hendler and Ora Lassila.",
      sourceIds: [S.sciam],
    },
    {
      id: "work-webfoundation",
      kind: "other",
      status: "completed",
      title: "World Wide Web Foundation",
      date: "2009",
      summary:
        "His advocacy foundation for the web as a public good — the Web Index, open-data work, the Contract for the Web — wound down 27 September 2024.",
      sourceIds: [S.w3bio, S.wfShutdown],
    },
    {
      id: "work-datagovuk",
      kind: "project",
      status: "completed",
      title: "data.gov.uk",
      date: "2010-01",
      location: "United Kingdom",
      summary:
        "The UK open-data portal built under his and Nigel Shadbolt's advisory role; led to the Open Data Institute, co-founded in 2012.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-solid",
      kind: "project",
      status: "ongoing",
      title: "Solid",
      date: "2016",
      summary:
        "The open-source decentralized-data platform developed with his MIT group: data lives in user-controlled pods, and apps request access.",
      sourceIds: [S.mediumStep, S.techcrunch],
    },
    {
      id: "work-inrupt",
      kind: "other",
      status: "ongoing",
      title: "Inrupt",
      date: "2018",
      summary:
        "The company he co-founded with John Bruce to bring commercial backing to the Solid ecosystem.",
      sourceIds: [S.mediumStep, S.techcrunch],
    },
    {
      id: "work-contract",
      kind: "project",
      status: "completed",
      title: "Contract for the Web",
      date: "2019-11",
      summary:
        "Nine principles — three each for governments, companies, and citizens — drafted with over 80 organizations and launched by the Web Foundation.",
      sourceIds: [S.wikipedia, S.wfShutdown],
    },
    {
      id: "work-nft",
      kind: "design",
      status: "completed",
      title: "This Changed Everything (NFT)",
      date: "2021-06",
      summary:
        "A Sotheby's auction of the web's original timestamped source files as an artwork package; sold for $5,434,500.",
      sourceIds: [S.sothebys],
    },
  ],
  appearances: [
    {
      id: "appearance-ted2009",
      title: "Tim Berners-Lee on the next Web",
      venue: "TED2009",
      publishedAt: "2009-03",
      participants: ["Tim Berners-Lee"],
      summary:
        "The 'raw data now' talk: his case for open, linked data as the web's next phase.",
      media: [
        {
          type: "video",
          url: "https://www.ted.com/talks/tim_berners_lee_on_the_next_web",
          sourceId: S.ted2009,
        },
      ],
      sourceIds: [S.ted2009],
    },
    {
      id: "appearance-olympics",
      title: "London 2012 Olympic Games opening ceremony",
      venue: "Olympic Stadium, London",
      publishedAt: "2012-07-27",
      participants: ["Tim Berners-Lee"],
      summary:
        "Honored in a segment of Danny Boyle's ceremony; he live-tweeted 'This is for everyone' from a NeXT cube while the words lit the stadium.",
      media: [
        {
          type: "article",
          url: "https://www.w3.org/news/2012/this-is-for-everyone-the-tweet-heard-around-the-world/",
          sourceId: S.w3cOlympics,
        },
      ],
      sourceIds: [S.w3cOlympics],
    },
    {
      id: "appearance-wuwm",
      title: "The Father Of The Web Is Worried About How Ugly It's Become",
      venue: "WBUR / WUWM (NPR)",
      publishedAt: "2017-04-04",
      participants: ["Tim Berners-Lee", "Asma Khalid"],
      summary:
        "Radio interview on the day the Turing Award was announced: why he built the web and what he fears it has become.",
      media: [
        {
          type: "article",
          url: "https://www.wuwm.com/health-science/2017-04-04/the-father-of-the-web-is-worried-about-how-ugly-its-become",
          sourceId: S.wuwm,
        },
      ],
      sourceIds: [S.wuwm],
    },
    {
      id: "appearance-vanityfair",
      title:
        "'I Was Devastated': The Man Who Created the World Wide Web Has Some Regrets",
      venue: "Vanity Fair",
      publishedAt: "2018-07",
      participants: ["Tim Berners-Lee", "Katrina Brooker"],
      summary:
        "A long interview on his dismay at the web's direction and the early shape of the Solid answer.",
      media: [
        {
          type: "article",
          url: "https://www.vanityfair.com/news/2018/07/the-man-who-created-the-world-wide-web-has-some-regrets",
          sourceId: S.vanityFair,
        },
      ],
      sourceIds: [S.vanityFair],
    },
  ],
  openQuestions: [
    "Dates in the 1990–91 record differ by source: CERN and W3C material variously date the first running browser and server to October or December 1990, and the public debut to the 6 August 1991 Usenet post or the late-August availability of the files.",
    "Inrupt's founding is variously dated 2017 (formation) and 2018 (public announcement and emergence from stealth); the index records the September 2018 announcement he published himself.",
    "His own W3C biography still lists him as a director of the Web Foundation, although the Foundation wound down in September 2024 — self-maintained pages lag the record.",
    "The Turing Award is the 2016 award year but was announced in April 2017; sources variously call him a 2016 or 2017 laureate.",
    "Accounts differ on how much credit Robert Cailliau and other early CERN collaborators deserve relative to the 'sole inventor' framing of most press coverage.",
    "Whether Solid's personal-data-store model can compete with incumbent platforms — or must be adopted by them — is not settled by the record.",
  ],
  body: `Tim Berners-Lee is the English computer scientist who invented the World Wide Web — and then, unusually, declined to own it. Working at CERN, he proposed the system in 1989, wrote the first browser, server, and the HTML, HTTP, and URI specifications by the end of 1990, and pushed for the technology to be given away. Three decades later he is still working on the web's structure: as emeritus director of the W3C he founded, and now through Solid and Inrupt, his attempt to decentralize the web his invention became.

## From ENQUIRE to the proposal

Born in London on 8 June 1955 to mathematician parents who had worked on the Ferranti Mark 1 — one of the first commercial stored-program computers — Berners-Lee grew up around machine logic. He read physics at The Queen's College, Oxford; after he and a friend were caught hacking, he was banned from the university computer and famously built his own from a Motorola processor, an old television, and a soldering iron.

He worked at Plessey Telecommunications and D.G. Nash, then spent half of 1980 at CERN as a consultant, where he wrote ENQUIRE — a personal hypertext notebook for tracking people, software, and projects, named after the Victorian manual *Enquire Within Upon Everything*. After a stint at Image Computer Systems he returned to CERN as a fellow in 1984. CERN's problem, as he saw it, was institutional memory: a lab of thousands with two-year tenures constantly lost track of who knew what. In March 1989 he submitted *Information Management: A Proposal*, arguing for a distributed hypertext system of notes linked by association rather than hierarchy. His supervisor Mike Sendall wrote on it: "vague but exciting." His own later note on the document admits the only name he had for the system then was "Mesh."

CERN engineer Robert Cailliau became the project's essential internal champion, co-authoring the November 1990 management proposal that secured real support. By December 1990, on a NeXT cube, Berners-Lee had built the thing itself: the WorldWideWeb browser-editor (later renamed Nexus), the CERN httpd server, and the first site at info.cern.ch — the machine that wore the sticker "This machine is a server. DO NOT POWER IT DOWN!!"

## Giving it away

On 6 August 1991 he posted "WorldWideWeb: Summary" to the alt.hypertext newsgroup and put the files on the Internet by FTP — the web's public debut. The decisive act came two years later: on 30 April 1993 CERN issued a statement relinquishing all intellectual-property rights in the web software, free for anyone to use, duplicate, modify, and redistribute. Berners-Lee had argued for exactly that — an open, royalty-free standard — and it is the choice, more than any single design decision, that let the web beat the proprietary online services of the day.

When the web's growth threatened to fragment into incompatible vendor extensions, he founded the World Wide Web Consortium at MIT in October 1994 and directed it until W3C became an independent nonprofit in 2023 — nearly thirty years of consensus-building as stewardship. He told the story himself in *Weaving the Web* (1999, with Mark Fischetti) and extended the vision toward machine-readable data in the 2001 *Scientific American* article "The Semantic Web" with James Hendler and Ora Lassila.

Recognition followed: an OBE, then a knighthood in the 2004 New Year Honours — he was invested at Buckingham Palace in July 2004 — the first Millennium Technology Prize, the Order of Merit, a share of the inaugural Queen Elizabeth Prize for Engineering, and the 2016 ACM Turing Award, announced in April 2017. In Britain he briefly became a kind of national monument: at the London 2012 Olympics opening ceremony he sat at a NeXT cube on stage and live-tweeted "This is for everyone" as the words lit the stadium.

## The repair campaigns

The index's sources show him treating the web's capture as an engineering problem with public campaigns. In 2006 he used his own blog for "Net Neutrality: This is serious," defending the principle that no one should need permission — or a toll — to reach the whole network. In 2009 he co-founded the World Wide Web Foundation and began advising governments on open data, work that produced the UK's data.gov.uk in 2010 and the Open Data Institute in 2012.

By the late 2010s his register had darkened. His open letter on the web's 28th birthday named three threats: lost control of personal data, misinformation, and opaque political advertising. Interviewers found him grieving — "I was devastated," he told *Vanity Fair* in 2018 — over surveillance, fake news, and platform exploitation. His answers were structural: the Contract for the Web (November 2019), nine principles drafted with over 80 organizations assigning duties to governments, companies, and citizens; and Solid, the MIT open-source project that puts each person's data in a store they control and makes applications request access.

In September 2018 he announced a sabbatical from MIT and the founding of Inrupt, with John Bruce as CEO, to give Solid commercial backing — the closest he has come to founding a conventional startup. In June 2021 he sold "This Changed Everything," an NFT of the web's timestamped source files, at Sotheby's for $5.4 million, with proceeds going to causes he and his wife support. In September 2024 the Web Foundation wound down so he could concentrate fully on Solid — a telling allocation of his remaining effort toward re-decentralization.

## What the record does not settle

The seams are worth keeping. The credit for the web's birth is shared in the primary documents — Cailliau co-authored the November 1990 proposal and evangelized inside CERN — even as press coverage compresses the story to one inventor. Dates within 1990–91 vary by a month or two between institutional accounts. His own W3C page still lists a Web Foundation directorship the 2024 closure overtook. Whether Solid can genuinely re-decentralize a platform economy, rather than remain a principled niche, is precisely the question his current work is trying to answer.

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
