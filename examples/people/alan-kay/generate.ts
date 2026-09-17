#!/usr/bin/env bun
/** Generate examples/people/alan-kay/person-index.json with derived source ids. */

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

const amturing = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Alan Kay — A.M. Turing Award Laureate",
  url: "https://amturing.acm.org/award_winners/kay_3972189.cfm",
  publisher: "Association for Computing Machinery",
  notes:
    "Official laureate page for the 2003 Turing Award, with citation and extended biography.",
});
const chmFellow = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Alan Kay — 1999 Fellow",
  url: "https://computerhistory.org/profile/alan-kay/",
  publisher: "Computer History Museum",
  notes:
    "Institutional biography covering Utah/FLEX, PARC, the fellowships, and the award citations.",
});
const kyoto = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Alan Curtis Kay — 2004 Kyoto Prize Laureate",
  url: "https://www.kyotoprize.org/en/laureates/alan_curtis_kay/",
  publisher: "Inamori Foundation",
  publishedAt: "2004",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Alan Kay",
  url: "https://en.wikipedia.org/wiki/Alan_Kay",
  publisher: "Wikipedia",
  notes:
    "Used for discovery and cross-checking, not as sole authority; the article carries a citation-needed notice.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Alan Kay (Q92742)",
  url: "https://www.wikidata.org/wiki/Q92742",
  publisher: "Wikidata",
});
const wikiquote = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Alan Kay — Wikiquote",
  url: "https://en.wikiquote.org/wiki/Alan_Kay",
  publisher: "Wikiquote",
  notes:
    "Used to trace quote provenance: each entry cites a primary context, and the lead quote flags shared attribution.",
});
const dynabookPaper = source({
  binding: "first_person",
  mediaType: "article",
  title: "A Personal Computer for Children of All Ages",
  url: "https://doi.org/10.1145/800193.1971922",
  publisher: "ACM — Proceedings of the ACM National Conference, Boston",
  publishedAt: "1972-08",
  authors: ["Alan C. Kay"],
  notes:
    "The 1972 paper that publicly sketched the Dynabook: a book-sized personal computer for 'children of all ages.'",
});
const earlyHistory = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Early History of Smalltalk",
  url: "https://doi.org/10.1145/154766.155364",
  publisher: "ACM SIGPLAN — HOPL-II",
  publishedAt: "1993-03",
  authors: ["Alan C. Kay"],
  notes:
    "Kay's own retrospective on how ARPA-era ideas became Smalltalk; the primary first-person account of the PARC years.",
});
const sciam = source({
  binding: "first_person",
  mediaType: "article",
  title: "Computers, Networks and Education",
  url: "https://doi.org/10.1038/scientificamerican0991-138",
  publisher: "Scientific American 265(3)",
  publishedAt: "1991-09",
  authors: ["Alan C. Kay"],
});
const powerfulIdeas = source({
  binding: "first_person",
  mediaType: "article",
  title: "Powerful Ideas Need Love Too!",
  url: "https://worrydream.com/refs/Kay_1995_-_Powerful_Ideas_Need_Love_Too.html",
  publisher: "Written remarks to a joint hearing of U.S. House committees",
  publishedAt: "1995-10-12",
  authors: ["Alan C. Kay"],
  notes:
    "Congressional testimony on education and thinking; text mirrored on Bret Victor's reference site.",
});
const squeakEmail = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "prototypes vs classes was: Re: Sun's HotSpot",
  url: "http://lists.squeakfoundation.org/pipermail/squeak-dev/1998-October/017019.html",
  publisher: "squeak-dev mailing list archive",
  publishedAt: "1998-10-10",
  authors: ["Alan Kay"],
  notes:
    "The 1998 post containing 'The big idea is messaging' — his correction of what 'object-oriented' was supposed to mean.",
});
const oopsla97 = source({
  binding: "first_person",
  mediaType: "video",
  title: "Alan Kay at OOPSLA 1997 — The computer revolution hasnt happened yet",
  url: "https://www.youtube.com/watch?v=oKg1hTOQXoY",
  publisher: "OOPSLA '97 keynote recording (YouTube upload)",
  publishedAt: "1997-10",
  notes:
    "Keynote at OOPSLA, Atlanta, October 5–9, 1997; source of the 'C++' remark and the nano-Dijkstra line.",
});
const ted2007 = source({
  binding: "first_person",
  mediaType: "video",
  title: "A powerful idea about ideas",
  url: "https://www.ted.com/talks/alan_kay_shares_a_powerful_idea_about_ideas",
  publisher: "TED",
  publishedAt: "2007-03",
  notes:
    "TED2007 talk on teaching children with computers as a medium for powerful ideas.",
});
const queueInterview = source({
  binding: "interview",
  mediaType: "article",
  title: "A Conversation with Alan Kay",
  url: "https://queue.acm.org/detail.cfm?id=1039523",
  publisher: "ACM Queue 2(9)",
  publishedAt: "2004-12-27",
  authors: ["Stuart Feldman"],
  notes:
    "Long interview with IBM Research's Stuart Feldman: Smalltalk's history, Lisp, Java, pop culture, and education.",
});
const drdobbs = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview with Alan Kay",
  url: "https://web.archive.org/web/20190101192015/http://www.drdobbs.com:80/architecture-and-design/interview-with-alan-kay/240003442",
  publisher: "Dr. Dobb's",
  publishedAt: "2012-07-10",
  authors: ["Andrew Binstock"],
  notes:
    "2012 interview on programming, the Web ('done by amateurs'), and education; original drdobbs.com is offline — link is a Wayback capture.",
});
const spacewar = source({
  binding: "reporting",
  mediaType: "article",
  title: "SPACEWAR: Fanatic Life and Symbolic Death Among the Computer Bums",
  url: "https://wheels.org/spacewar/stone/rolling_stone.html",
  publisher: "Rolling Stone (transcribed at wheels.org)",
  publishedAt: "1972-12-07",
  authors: ["Stewart Brand"],
  notes:
    "Stewart Brand's reported tour of ARPA computing culture; Kay is quoted on hackers as artisans and Spacewar's ubiquity.",
});
const vpriHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Viewpoints Research Institute",
  url: "https://web.archive.org/web/20170109171212/http://vpri.org:80/",
  publisher: "Viewpoints Research Institute",
  notes:
    "Homepage of the nonprofit Kay founded and presided over; vpri.org went offline after the 2018 closure — this is the January 2017 Wayback capture.",
});
const stepsReport = source({
  binding: "archive",
  mediaType: "pdf",
  title: "STEPS Toward the Reinvention of Programming — 2012 Final Report to the NSF",
  url: "https://tinlizzie.org/VPRIPapers/tr2012001_steps.pdf",
  publisher: "VPRI Technical Report TR-2012-001 (mirrored at tinlizzie.org)",
  publishedAt: "2012-10",
  notes:
    "The STEPS final report: a compact model of personal computing in dramatically fewer lines of code; rehosted after vpri.org went offline.",
});
const mproveMedia = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Alan Kay Media Center",
  url: "https://mprove.de/visionreality/media/kay.html",
  publisher: "mprove.de — Matthias Müller-Prove",
  notes:
    "A maintained chronological index of Kay's talks, papers, videos, and transcripts from 1968 onward.",
});
const doingWithImages = source({
  binding: "archive",
  mediaType: "video",
  title:
    "Doing With Images Makes Symbols: Communicating with Computers (1987)",
  url: "https://archive.org/details/Dr._Alan_Kay_Doing_With_Images_Makes_Symbols_Communicating_With_Computers_1987",
  publisher: "University Video Communications / Apple Computer — Internet Archive",
  publishedAt: "1987-10-27",
  notes:
    "Kay's 1987 Apple lecture tracing the windows-and-mouse interface from Sketchpad, NLS, and GRAIL through Smalltalk.",
});

const S = {
  amturing: amturing.id,
  chmFellow: chmFellow.id,
  kyoto: kyoto.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  wikiquote: wikiquote.id,
  dynabookPaper: dynabookPaper.id,
  earlyHistory: earlyHistory.id,
  sciam: sciam.id,
  powerfulIdeas: powerfulIdeas.id,
  squeakEmail: squeakEmail.id,
  oopsla97: oopsla97.id,
  ted2007: ted2007.id,
  queueInterview: queueInterview.id,
  drdobbs: drdobbs.id,
  spacewar: spacewar.id,
  vpriHome: vpriHome.id,
  stepsReport: stepsReport.id,
  mproveMedia: mproveMedia.id,
  doingWithImages: doingWithImages.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-alan-kay",
  generatedAt: "2026-09-16T22:00:00Z",
  subject: {
    kind: "person",
    handle: "alan-kay",
    displayName: "Alan Kay",
    alsoKnownAs: ["Alan Curtis Kay", "Alan C. Kay"],
    summary:
      "American computer scientist — conceived the Dynabook in 1968, led Xerox PARC's Learning Research Group, created Smalltalk and the first modern overlapping-window GUI, coined 'object-oriented programming,' and won the 2003 ACM Turing Award; founder of Viewpoints Research Institute and a persistent critic of how computing is taught and built.",
    identity: {
      wikidataId: "Q92742",
      officialSite: "http://www.vpri.org/",
      wikipedia: "https://en.wikipedia.org/wiki/Alan_Kay",
      profiles: [
        "https://amturing.acm.org/award_winners/kay_3972189.cfm",
        "https://www.ted.com/speakers/alan_kay",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T22:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    amturing,
    chmFellow,
    kyoto,
    wikipedia,
    wikidata,
    wikiquote,
    dynabookPaper,
    earlyHistory,
    sciam,
    powerfulIdeas,
    squeakEmail,
    oopsla97,
    ted2007,
    queueInterview,
    drdobbs,
    spacewar,
    vpriHome,
    stepsReport,
    mproveMedia,
    doingWithImages,
  ],
  claims: [
    {
      id: "claim-born-1940",
      kind: "fact",
      text: "Alan Curtis Kay was born on May 17, 1940, in Springfield, Massachusetts; his father's career in physiology moved the family several times before settling in the New York metropolitan area, and he attended Brooklyn Technical High School.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "claim-early-reader",
      kind: "fact",
      text: "He has repeatedly described himself as a prodigy reader: fluent by about age three, roughly 150 books before first grade, and early convinced his teachers 'were lying to me' — a self-report he links to his later skepticism of schooling.",
      sourceIds: [S.drdobbs, S.wikipedia],
    },
    {
      id: "claim-music-military",
      kind: "fact",
      text: "After Bethany College (biology major, mathematics minor) he taught guitar in Denver for a year, was drafted into the U.S. Army, qualified for Air Force officer training, and was routed into programming by an aptitude test.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-colorado-degree",
      kind: "fact",
      text: "He earned a bachelor's degree in mathematics and molecular biology from the University of Colorado Boulder in 1966 — listed as a B.S. by Wikipedia and a B.A. in the Computer History Museum profile.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "claim-utah-degrees",
      kind: "fact",
      text: "He began graduate study at the University of Utah in autumn 1966 — the ARPA graphics program run by David C. Evans and Ivan Sutherland — earning an M.S. in electrical engineering in 1968 and a Ph.D. in computer science in 1969.",
      sourceIds: [S.wikipedia, S.chmFellow, S.wikidata],
    },
    {
      id: "claim-flex-machine",
      kind: "fact",
      text: "At Utah he codesigned the FLEX Machine with Ed Cheadle — an early desktop computer with a graphical user interface and an object-oriented operating system — and his graduate work described the FLEX language, 'a flexible extendable language.'",
      sourceIds: [S.chmFellow, S.wikipedia, S.mproveMedia],
    },
    {
      id: "claim-sketchpad-arpa",
      kind: "fact",
      text: "Kay credits Sutherland's 1963 Sketchpad thesis as a major influence on his ideas about objects and programming; at Utah he was also part of the team that developed pioneering continuous-tone 3-D graphics for ARPA and a participant in ARPAnet design discussions.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "claim-papert-1968",
      kind: "fact",
      text: "In 1968 he met Seymour Papert and saw children program in Logo, which led him to Piaget, Bruner, and Vygotsky and to constructionist learning — the encounter that turned his personal-computer thinking toward children.",
      sourceIds: [S.wikipedia, S.earlyHistory],
    },
    {
      id: "claim-mother-of-demos",
      kind: "fact",
      text: "On December 9, 1968, running a fever, he attended Douglas Engelbart's 'Mother of All Demos' in San Francisco and later called it one of the greatest experiences of his life.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-sail-parc",
      kind: "fact",
      text: "In 1969 he was a visiting researcher at the Stanford Artificial Intelligence Laboratory; instead of an expected Carnegie Mellon professorship he joined the Xerox PARC research staff in 1970, among its earliest members.",
      sourceIds: [S.wikipedia, S.queueInterview],
    },
    {
      id: "claim-dynabook",
      kind: "fact",
      text: "The Dynabook — a book-sized personal portable computer 'for children of all ages' — was conceived in 1968 and sketched publicly in his 1972 ACM paper 'A Personal Computer for Children of All Ages,' which argued a $500 target was not outrageous; it anticipated laptop and tablet computers and the e-book.",
      sourceIds: [S.dynabookPaper, S.chmFellow, S.wikipedia],
    },
    {
      id: "claim-smalltalk",
      kind: "fact",
      text: "At PARC's Learning Research Group he conceived and led Smalltalk: his one-page interpreter design dates to late 1972, and Dan Ingalls built the first working version within weeks; the language evolved through Smalltalk-72, -74, -76, and -80 with Adele Goldberg, Ingalls, Ted Kaehler, Diana Merry, and others.",
      sourceIds: [S.earlyHistory, S.amturing, S.wikipedia, S.oopsla97],
    },
    {
      id: "claim-gui-windows",
      kind: "fact",
      text: "He led the design and development of the first modern overlapping-window graphical user interface at PARC, part of the Smalltalk environment running on the Alto — the 'interim Dynabook' hardware designed by Chuck Thacker.",
      sourceIds: [S.wikipedia, S.chmFellow, S.amturing],
    },
    {
      id: "claim-coined-oop",
      kind: "fact",
      text: "Kay coined the term 'object-oriented' for his approach — the words 'object' and 'class' had earlier appeared in Simula 67 — and has spent decades clarifying that the real idea was messaging, not objects.",
      sourceIds: [S.wikipedia, S.squeakEmail, S.oopsla97],
    },
    {
      id: "claim-atari",
      kind: "fact",
      text: "From 1981 to 1984 he was Chief Scientist at Atari.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-apple-fellow",
      kind: "fact",
      text: "He became an Apple Fellow in 1984 and worked in the Advanced Technology Group until its closure in 1997.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-disney",
      kind: "fact",
      text: "After Apple ATG closed he was recruited by Bran Ferren to Walt Disney Imagineering as a Disney Fellow and R&D vice president, leaving when Ferren departed to co-found Applied Minds with Danny Hillis.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-hp-labs",
      kind: "fact",
      text: "In 2002 he joined HP Labs as a senior fellow, departing on July 20, 2005 when HP disbanded the Advanced Software Research Team.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-vpri",
      kind: "fact",
      text: "In 2001 he founded Viewpoints Research Institute, a 501(c)(3) nonprofit for 'powerful ideas education' and advanced software research; he was its president until the institute closed in 2018, and in spring 2016 VPRI joined Y Combinator Research's HARC.",
      sourceIds: [S.wikipedia, S.vpriHome],
    },
    {
      id: "claim-squeak-etoys",
      kind: "fact",
      text: "In December 1995, while still at Apple, he and collaborators started the open-source Squeak version of Smalltalk; in November 1996 his team began the research that became the Etoys authoring system for children.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-croquet",
      kind: "fact",
      text: "He co-founded the Croquet Project — an open-source networked 2D/3D environment for collaborative work — with David A. Smith, David P. Reed, Andreas Raab, Rick McGeer, Julian Lombardi, and Mark McCahill.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-olpc",
      kind: "fact",
      text: "Nicholas Negroponte's One Laptop per Child program — the XO-1 'Children's Machine' unveiled in November 2005 — was based on the Dynabook ideal, and Kay was a prominent co-developer focused on its Squeak/Etoys educational software.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "claim-steps",
      kind: "fact",
      text: "An NSF grant awarded August 31, 2006 funded VPRI's STEPS project ('STEPS Toward the Reinvention of Programming'), which asked how small an understandable, practical model of personal computing could be — hundreds of millions of lines of code versus perhaps 20,000 — and reported out in technical report TR-2012-001.",
      sourceIds: [S.wikipedia, S.stepsReport],
    },
    {
      id: "claim-turing-2003",
      kind: "fact",
      text: "He received the 2003 ACM A.M. Turing Award 'for pioneering many of the ideas at the root of contemporary object-oriented programming languages, leading the team that developed Smalltalk, and for fundamental contributions to personal computing.'",
      sourceIds: [S.amturing],
    },
    {
      id: "claim-other-honors",
      kind: "fact",
      text: "His other honors include the 2004 Charles Stark Draper Prize — shared with Butler Lampson, Robert Taylor, and Charles Thacker for the Alto, 'the first practical networked computer' — the 2004 Kyoto Prize 'for creation of the concept of modern personal computing and contribution to its realization,' Computer History Museum Fellow (1999), ACM Software System Award (1987), and ACM Fellow (2008).",
      sourceIds: [S.kyoto, S.chmFellow, S.wikidata],
    },
    {
      id: "claim-music-life",
      kind: "fact",
      text: "He is a former professional jazz guitarist, composer, and theatrical designer, and an amateur classical pipe organist; music remained a parallel serious practice rather than a hobby.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-teaching-posts",
      kind: "fact",
      text: "He has been an adjunct professor of computer science at UCLA, a visiting professor at Kyoto University, and an adjunct professor at MIT.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "claim-messaging",
      kind: "stated_belief",
      text: "In a 1998 squeak-dev post he wrote that coining 'objects' was a mistake because it focused people on the lesser idea: 'The big idea is messaging' — great systems are designed around how modules communicate, the way cells in a body or computers on the Internet interoperate.",
      sourceIds: [S.squeakEmail],
    },
    {
      id: "claim-not-cplusplus",
      kind: "stated_belief",
      text: "At OOPSLA '97 he said 'I invented the term Object-Oriented, and I can tell you I did not have C++ in mind' — the canonical statement that mainstream OO languages diverged from his intent.",
      sourceIds: [S.oopsla97],
    },
    {
      id: "claim-revolution-not-happened",
      kind: "stated_belief",
      text: "His signature thesis — delivered as the OOPSLA 1997 keynote and the Turing Award lecture — is that the computer revolution hasn't happened yet: no media revolution counts without fluent 'reading and writing' at the medium's highest level of ideas, and computing still imitates the paper culture it should have replaced.",
      sourceIds: [S.oopsla97, S.wikipedia],
    },
    {
      id: "claim-pop-culture",
      kind: "stated_belief",
      text: "He calls computing 'complete pop culture' with a disdain for its own history — a field where most programmers 'have no idea where their culture came from,' which he blames for the absence of real computer science and software engineering.",
      sourceIds: [S.queueInterview, S.drdobbs],
    },
    {
      id: "claim-web-amateurs",
      kind: "stated_belief",
      text: "He contrasts the Internet — 'done so well that most people think of it as a natural resource like the Pacific Ocean' — with the Web, which he calls 'a joke ... done by amateurs' who ignored the field's hypertext history.",
      sourceIds: [S.drdobbs],
    },
    {
      id: "claim-cs-education",
      kind: "stated_belief",
      text: "He holds that most undergraduate computer science degrees are 'basically Java vocational training' and that students should be prepared to move a young field forward rather than be taught its last received truth.",
      sourceIds: [S.queueInterview],
    },
    {
      id: "claim-three-literacies",
      kind: "stated_belief",
      text: "In his 1995 congressional testimony he argued full enfranchisement requires fluency in three forms of thinking — stories, logical arguments, and systems dynamics — and that schooling largely teaches the first while modern content is rendered in the other two.",
      sourceIds: [S.powerfulIdeas, S.ted2007],
    },
    {
      id: "claim-lisp-maxwell",
      kind: "stated_belief",
      text: "He describes the half-page of code at the bottom of page 13 of the Lisp 1.5 manual as 'Maxwell's Equations of Software' — the moment he understood a language could define itself.",
      sourceIds: [S.queueInterview],
    },
    {
      id: "claim-egyptian-pyramid",
      kind: "stated_belief",
      text: "He compares most software to an Egyptian pyramid — 'millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves' — the critique STEPS was built to answer.",
      sourceIds: [S.queueInterview, S.stepsReport],
    },
    {
      id: "claim-80-iq",
      kind: "stated_belief",
      text: "From a July 20, 1982 Creative Think seminar: 'A change in perspective is worth 80 IQ points' — widely circulated in the variants 'perspective is worth 80 IQ points' and 'point of view is worth 80 IQ points.'",
      sourceIds: [S.wikiquote],
    },
    {
      id: "claim-own-hardware",
      kind: "stated_belief",
      text: "Also from the July 1982 Creative Think seminar: 'People who are really serious about software should make their own hardware.'",
      sourceIds: [S.wikiquote],
    },
    {
      id: "claim-predict-future",
      kind: "fact",
      text: "Kay said 'the best way to predict the future is to invent it' at a 1971 PARC meeting — a documented usage, though near-identical formulations are also attributed to Peter Drucker and Dandridge M. Cole and Dennis Gabor's 1963 'Inventing the Future' wrote 'the future cannot be predicted, but futures can be invented.'",
      sourceIds: [S.wikiquote],
    },
    {
      id: "claim-media-not-gadget",
      kind: "stated_belief",
      text: "He frames the Dynabook — and personal computing generally — as a new medium, not a device category: a 'personal dynamic medium' for reading, writing, simulating, and composing, in which the computer functions as a metamedium that can imitate all previous media.",
      sourceIds: [S.dynabookPaper, S.sciam, S.earlyHistory],
    },
    {
      id: "claim-tools-that-teach",
      kind: "pattern",
      text: "Every major system he built doubled as a teaching medium: FLEX, Smalltalk tested with PARC children, Squeak/Etoys, the OLPC educational software, and STEPS as a compact 'self-exploratorium' — the artifact is always also a curriculum.",
      sourceIds: [S.dynabookPaper, S.wikipedia, S.stepsReport],
    },
    {
      id: "claim-unfinished",
      kind: "pattern",
      text: "He treats his most famous work as unfinished: at PARC Smalltalk was always a work in progress, industry froze it as 'something just to be learned,' and he kept restarting — Squeak, Etoys, Croquet, Tweak, STEPS — rather than curating a finished legacy.",
      sourceIds: [S.squeakEmail, S.queueInterview, S.stepsReport],
    },
    {
      id: "claim-hard-fun",
      kind: "pattern",
      text: "Across talks and interviews he joins children, music, and science into one practice of 'hard fun' — fluency earned through motivated play — from the Dynabook's children-of-all-ages framing to the TED talk's demonstrations.",
      sourceIds: [S.dynabookPaper, S.ted2007, S.vpriHome],
    },
    {
      id: "claim-dynabook-unfulfilled",
      kind: "speculation",
      text: "Whether shipping laptops and tablets 'realize' the Dynabook is unresolved: Kay's own position — that the revolution hasn't happened — implies today's devices are partial approximations that ship the hardware while missing the authoring-and-literacy core.",
      sourceIds: [S.oopsla97, S.drdobbs, S.dynabookPaper],
    },
    {
      id: "claim-quote-drift",
      kind: "speculation",
      text: "Several famous 'Kay quotes' circulate in variant wordings or with shared attribution — 'predict the future' overlaps Gabor and Drucker; 'point of view is worth 80 IQ points' circulates as 'a change in perspective...' — so individual attributions should be treated cautiously even when a primary context is known.",
      sourceIds: [S.wikiquote],
    },
    {
      id: "claim-parc-credit-shared",
      kind: "speculation",
      text: "Press framings that call him the inventor of the personal computer flatten a collective achievement: the Alto hardware was Thacker's, championed by Lampson under Taylor, and the Draper citation names four recipients; Kay's distinctive contributions are the Dynabook concept, Smalltalk, the overlapping-window interface, and the children's programming work.",
      sourceIds: [S.chmFellow, S.kyoto, S.amturing],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1940-05-17",
      title: "Born in Springfield, Massachusetts",
      summary:
        "Alan Curtis Kay; father a physiologist, family later settled in the New York metropolitan area.",
      location: "Springfield, Massachusetts",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-utah-grad",
      kind: "education",
      date: "1966",
      end: "1969",
      title: "Graduate study at the University of Utah",
      summary:
        "Arrived with a 1966 Colorado bachelor's in mathematics and molecular biology; M.S. in electrical engineering (1968) and Ph.D. in computer science (1969) in the ARPA graphics program of David Evans and Ivan Sutherland.",
      organization: "University of Utah",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "event-flex-machine",
      kind: "project",
      date: "1968",
      title: "FLEX Machine at Utah",
      summary:
        "Codesigned with Ed Cheadle — an early desktop computer with a graphical interface and an object-oriented operating system; his graduate work described the FLEX language.",
      location: "Salt Lake City, Utah",
      sourceIds: [S.chmFellow, S.mproveMedia],
    },
    {
      id: "event-mother-of-demos",
      kind: "milestone",
      date: "1968-12-09",
      title: "Attends Engelbart's 'Mother of All Demos'",
      summary:
        "Present in San Francisco, sick with a fever; later called it one of the greatest experiences of his life. The same year he met Seymour Papert and saw children programming in Logo.",
      location: "San Francisco, California",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-parc",
      kind: "role",
      date: "1970",
      end: "1981",
      title: "Xerox PARC — Learning Research Group",
      summary:
        "Joined the founding research staff and led the Learning Research Group: Smalltalk, the overlapping-window GUI, and the Dynabook program on the Alto.",
      organization: "Xerox Palo Alto Research Center",
      location: "Palo Alto, California",
      sourceIds: [S.wikipedia, S.chmFellow, S.queueInterview],
    },
    {
      id: "event-dynabook-paper",
      kind: "publication",
      date: "1972-08",
      title: "'A Personal Computer for Children of All Ages' published",
      summary:
        "The ACM National Conference paper that publicly sketched the Dynabook — conceived 1968 — arguing a book-sized personal medium was within reach of current technology.",
      organization: "ACM National Conference, Boston",
      sourceIds: [S.dynabookPaper],
    },
    {
      id: "event-smalltalk-72",
      kind: "milestone",
      date: "1972",
      title: "First working Smalltalk",
      summary:
        "Kay's one-page interpreter design was implemented in weeks by Dan Ingalls; at OOPSLA '97 he dated the design to about twenty-five years earlier.",
      organization: "Xerox PARC",
      sourceIds: [S.earlyHistory, S.oopsla97],
    },
    {
      id: "event-atari",
      kind: "role",
      date: "1981",
      end: "1984",
      title: "Chief Scientist at Atari",
      organization: "Atari, Inc.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-apple-fellow",
      kind: "role",
      date: "1984",
      end: "1997",
      title: "Apple Fellow, Advanced Technology Group",
      summary:
        "Remained at Apple until ATG closed in 1997; started the open-source Squeak project there in December 1995.",
      organization: "Apple Computer",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-disney",
      kind: "role",
      date: "1997",
      title: "Disney Fellow and R&D VP, Walt Disney Imagineering",
      summary:
        "Recruited by Bran Ferren; left when Ferren co-founded Applied Minds with Danny Hillis and the fellows program ended.",
      organization: "Walt Disney Imagineering",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-vpri",
      kind: "founded",
      date: "2001",
      end: "2018",
      title: "Founded Viewpoints Research Institute",
      summary:
        "501(c)(3) nonprofit for 'powerful ideas education' and advanced systems research; president until its 2018 closure; joined YCR's HARC in spring 2016.",
      organization: "Viewpoints Research Institute",
      sourceIds: [S.wikipedia, S.vpriHome],
    },
    {
      id: "event-hp-labs",
      kind: "role",
      date: "2002",
      end: "2005",
      title: "Senior Fellow at HP Labs",
      summary:
        "Departed July 20, 2005 when HP disbanded the Advanced Software Research Team.",
      organization: "HP Labs",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-turing",
      kind: "award",
      date: "2003",
      title: "ACM A.M. Turing Award",
      summary:
        "For pioneering the ideas at the root of object-oriented programming, leading the Smalltalk team, and fundamental contributions to personal computing.",
      organization: "Association for Computing Machinery",
      sourceIds: [S.amturing],
    },
    {
      id: "event-draper-kyoto",
      kind: "award",
      date: "2004",
      title: "Charles Stark Draper Prize and Kyoto Prize",
      summary:
        "Draper Prize shared with Thacker, Lampson, and Taylor for the Alto; Kyoto Prize for creating the concept of modern personal computing.",
      sourceIds: [S.kyoto, S.wikidata, S.chmFellow],
    },
  ],
  themes: [
    {
      id: "theme-dynabook-medium",
      kind: "philosophy",
      status: "stated",
      title: "The computer as a new medium, not a gadget",
      summary:
        "From the 1968 Dynabook sketch through 'Personal Dynamic Media' and the 1991 Scientific American essay: personal computing should be a 'dynamic medium' for reading, writing, simulating, and composing — a metamedium — for children of all ages, not a consumer appliance.",
      sourceIds: [S.dynabookPaper, S.sciam, S.earlyHistory],
    },
    {
      id: "theme-messaging",
      kind: "method",
      status: "stated",
      title: "Messaging, not objects",
      summary:
        "His correction of his own coinage: the big idea is how modules communicate — cells exchanging signals, computers on the Internet — with state hidden inside and everything late-bound; classes and inheritance were never the point.",
      sourceIds: [S.squeakEmail, S.oopsla97],
    },
    {
      id: "theme-revolution-literacy",
      kind: "philosophy",
      status: "stated",
      title: "Media revolutions take centuries",
      summary:
        "Printing took ~150 years to produce science and centuries to produce general literacy; computing, still imitating paper culture, has not produced fluent read/write literacy at its highest level of ideas — hence 'the computer revolution hasn't happened yet.'",
      sourceIds: [S.oopsla97, S.mproveMedia],
    },
    {
      id: "theme-powerful-ideas",
      kind: "belief",
      status: "stated",
      title: "Powerful ideas and hard fun",
      summary:
        "Education should build fluency in three literacies — stories, logical arguments, systems dynamics — with the fluency standards of art, music, and sport. Papert, Piaget, Bruner, and Vygotsky supplied the constructionist frame; VPRI existed to deliver it.",
      sourceIds: [S.powerfulIdeas, S.ted2007, S.vpriHome],
    },
    {
      id: "theme-pop-culture-critique",
      kind: "belief",
      status: "stated",
      title: "Computing as pop culture",
      summary:
        "A field that forgets Sketchpad, Simula, Lisp, and Engelbart will keep reinventing badly: he calls computing 'complete pop culture,' the Web 'a joke ... done by amateurs,' and most CS curricula 'Java vocational training.'",
      sourceIds: [S.drdobbs, S.queueInterview],
    },
    {
      id: "theme-perspective",
      kind: "method",
      status: "stated",
      title: "Perspective is worth 80 IQ points",
      summary:
        "His method for creativity: most invention is a transition into a context where things look different — the job is to remind us there are more contexts than the one we think is reality.",
      sourceIds: [S.wikiquote, S.queueInterview],
    },
    {
      id: "theme-invent-future",
      kind: "belief",
      status: "stated",
      title: "Invent the future",
      summary:
        "The ARPA/PARC model he embodies: rather than predict, fund visionaries on long horizons and build the future you want — 'the best way to predict the future is to invent it' (1971), a formulation with shared attribution.",
      sourceIds: [S.wikiquote, S.amturing],
    },
    {
      id: "theme-small-systems",
      kind: "method",
      status: "stated",
      title: "Systems small enough to understand",
      summary:
        "The Egyptian-pyramid critique of brute-force software became STEPS: an understandable 'Model T' of personal computing in tens of thousands of lines of code rather than hundreds of millions, with languages doing the work of code.",
      sourceIds: [S.queueInterview, S.stepsReport],
    },
    {
      id: "theme-arpa-influences",
      kind: "influence",
      status: "reported",
      title: "The sixties as 'almost a new thing'",
      summary:
        "His own genealogy is explicit: Sketchpad, Simula 67, Lisp 1.5, Engelbart's NLS, Papert's Logo — the ARPA community of the 1960s read as the seed of a genuinely new computing, not a better old one.",
      sourceIds: [S.earlyHistory, S.doingWithImages, S.wikipedia],
    },
    {
      id: "theme-music-craft",
      kind: "practice",
      status: "reported",
      title: "Musician's standards applied to computing",
      summary:
        "A former professional jazz guitarist and amateur pipe organist, he constantly imports music's standards — developed repertoire, history, hard-won fluency — as the yardstick computing fails to meet.",
      sourceIds: [S.wikipedia, S.drdobbs, S.doingWithImages],
    },
  ],
  works: [
    {
      id: "work-flex-machine",
      kind: "project",
      status: "completed",
      title: "FLEX Machine",
      date: "1968",
      location: "University of Utah",
      summary:
        "Early desktop computer with graphical interface and object-oriented operating system, codesigned with Ed Cheadle; the machine behind his master's and doctoral work on 'FLEX: A Flexible Extendable Language.'",
      sourceIds: [S.chmFellow, S.wikipedia, S.mproveMedia],
    },
    {
      id: "work-dynabook",
      kind: "design",
      status: "proposed",
      title: "Dynabook",
      date: "1968",
      summary:
        "A book-sized personal computer for children of all ages — the concept that anticipated laptops, tablets, and e-books; never built as specified, and Kay holds the vision still unfulfilled.",
      sourceIds: [S.dynabookPaper, S.wikipedia, S.chmFellow],
    },
    {
      id: "work-dynabook-paper",
      kind: "paper",
      status: "published",
      title: "A Personal Computer for Children of All Ages",
      date: "1972-08",
      summary:
        "The public sketch of the Dynabook in the Proceedings of the ACM National Conference, Boston.",
      sourceIds: [S.dynabookPaper],
    },
    {
      id: "work-smalltalk",
      kind: "product",
      status: "released",
      title: "Smalltalk",
      date: "1972",
      location: "Xerox PARC",
      summary:
        "The first complete dynamic object-oriented language and development environment — Smalltalk-72 through Smalltalk-80 — conceived and led by Kay, first implemented by Dan Ingalls, evolved with Adele Goldberg and the Learning Research Group; released publicly in 1980–81.",
      sourceIds: [S.earlyHistory, S.amturing, S.wikipedia],
    },
    {
      id: "work-overlapping-windows-gui",
      kind: "design",
      status: "completed",
      title: "Overlapping-window graphical user interface",
      date: "1974",
      location: "Xerox PARC",
      summary:
        "The first modern overlapping-window desktop interface, built inside the Smalltalk environment on the Alto — the interaction style every consumer GUI now inherits.",
      sourceIds: [S.wikipedia, S.chmFellow, S.amturing],
    },
    {
      id: "work-personal-dynamic-media",
      kind: "paper",
      status: "published",
      title: "Personal Dynamic Media (with Adele Goldberg)",
      date: "1977",
      summary:
        "IEEE Computer article refining the Dynabook into the 'personal dynamic medium'; reprinted in The New Media Reader (2003).",
      sourceIds: [S.wikipedia, S.mproveMedia],
    },
    {
      id: "work-doing-with-images",
      kind: "other",
      status: "released",
      title: "Doing With Images Makes Symbols: Communicating with Computers",
      date: "1987-10-27",
      summary:
        "His University Video Communications lecture at Apple tracing the windows-and-mouse interface from Sketchpad, NLS, and GRAIL to Smalltalk — a canonical video lecture.",
      sourceIds: [S.doingWithImages, S.mproveMedia],
    },
    {
      id: "work-sciam-education",
      kind: "paper",
      status: "published",
      title: "Computers, Networks and Education",
      date: "1991-09",
      summary:
        "Scientific American essay on computing as a medium for learning rather than a delivery device for content.",
      sourceIds: [S.sciam],
    },
    {
      id: "work-early-history-smalltalk",
      kind: "paper",
      status: "published",
      title: "The Early History of Smalltalk",
      date: "1993-03",
      summary:
        "His HOPL-II retrospective — the standard first-person account of how ARPA ideas became Smalltalk.",
      sourceIds: [S.earlyHistory],
    },
    {
      id: "work-powerful-ideas-testimony",
      kind: "paper",
      status: "published",
      title: "Powerful Ideas Need Love Too!",
      date: "1995-10-12",
      summary:
        "Written remarks to a joint hearing of U.S. House committees arguing that schooling teaches story-thinking while modern content requires logical arguments and systems dynamics.",
      sourceIds: [S.powerfulIdeas],
    },
    {
      id: "work-squeak",
      kind: "product",
      status: "released",
      title: "Squeak",
      date: "1996",
      summary:
        "Open-source Smalltalk-80 variant started at Apple in December 1995 with Dan Ingalls, Ted Kaehler, John Maloney, and Scott Wallace; the vehicle for Etoys and later VPRI work.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-etoys",
      kind: "product",
      status: "released",
      title: "Etoys",
      date: "1996",
      summary:
        "Tile-scripted authoring environment for children, begun in November 1996; shipped on the OLPC XO.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-croquet",
      kind: "project",
      status: "completed",
      title: "Croquet Project",
      date: "2001",
      summary:
        "Open-source networked 2D/3D collaborative environment co-founded with David A. Smith, David P. Reed, Andreas Raab, Rick McGeer, Julian Lombardi, and Mark McCahill.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-vpri",
      kind: "other",
      status: "completed",
      title: "Viewpoints Research Institute",
      date: "2001",
      summary:
        "The 501(c)(3) he founded and presided over — 'powerful ideas education' plus advanced systems research — housed at Applied Minds for its first decade, folded into YCR's HARC in 2016, closed in 2018.",
      sourceIds: [S.vpriHome, S.wikipedia],
    },
    {
      id: "work-olpc-software",
      kind: "project",
      status: "completed",
      title: "One Laptop per Child educational software",
      date: "2005",
      summary:
        "The XO-1 'Children's Machine' — Negroponte's program built on the Dynabook ideal — carried Kay's Squeak/Etoys educational environment; he was a prominent co-developer.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "work-steps",
      kind: "project",
      status: "completed",
      title: "STEPS Toward the Reinvention of Programming",
      date: "2006",
      location: "Viewpoints Research Institute",
      summary:
        "NSF-funded project (grant August 31, 2006) asking how small an understandable, practical model of personal computing could be — the 'Model T' question; final report TR-2012-001.",
      sourceIds: [S.wikipedia, S.stepsReport],
    },
  ],
  appearances: [
    {
      id: "appearance-spacewar",
      title: "SPACEWAR: Fanatic Life and Symbolic Death Among the Computer Bums",
      venue: "Rolling Stone",
      publishedAt: "1972-12-07",
      participants: ["Alan Kay", "Stewart Brand"],
      summary:
        "Stewart Brand's reported tour of ARPA computing culture, featuring Kay on hackers as artisans and on Spacewar's spontaneous ubiquity.",
      media: [
        {
          type: "article",
          url: "https://wheels.org/spacewar/stone/rolling_stone.html",
          sourceId: S.spacewar,
        },
      ],
      sourceIds: [S.spacewar],
    },
    {
      id: "appearance-doing-with-images",
      title: "Doing With Images Makes Symbols: Communicating with Computers",
      venue: "University Video Communications / Apple Computer",
      publishedAt: "1987-10-27",
      participants: ["Alan Kay"],
      summary:
        "The lecture tracing the windows-and-mouse interface from Sketchpad, NLS, and GRAIL through Smalltalk and the psychology of 'doing with images.'",
      media: [
        {
          type: "video",
          url: "https://archive.org/details/Dr._Alan_Kay_Doing_With_Images_Makes_Symbols_Communicating_With_Computers_1987",
          sourceId: S.doingWithImages,
        },
      ],
      sourceIds: [S.doingWithImages],
    },
    {
      id: "appearance-oopsla-1997",
      title: "The Computer Revolution Hasn't Happened Yet",
      venue: "OOPSLA '97 keynote, Atlanta",
      publishedAt: "1997-10",
      participants: ["Alan Kay"],
      summary:
        "The signature keynote: twenty-five years after the first Smalltalk, why the real revolution still has not happened — and the 'did not have C++ in mind' remark.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=oKg1hTOQXoY",
          sourceId: S.oopsla97,
        },
      ],
      sourceIds: [S.oopsla97, S.mproveMedia],
    },
    {
      id: "appearance-turing-lecture",
      title: "ACM Turing Award lecture — The Computer Revolution Hasn't Happened Yet",
      venue: "ACM A.M. Turing Award",
      participants: ["Alan Kay"],
      summary:
        "His Turing lecture, carrying the OOPSLA '97 argument into the award setting; the ACM hosts the recorded video.",
      media: [
        {
          type: "video",
          url: "https://amturing.acm.org/vp/kay_3972189.cfm",
        },
      ],
      sourceIds: [S.amturing, S.wikipedia],
    },
    {
      id: "appearance-queue-2004",
      title: "A Conversation with Alan Kay",
      venue: "ACM Queue 2(9)",
      publishedAt: "2004-12-27",
      participants: ["Alan Kay", "Stuart Feldman"],
      summary:
        "Feldman of IBM Research walks Kay through personal-computing and language history: Smalltalk's origins, Lisp, Java, software's 'Egyptian pyramid,' and education.",
      media: [
        {
          type: "article",
          url: "https://queue.acm.org/detail.cfm?id=1039523",
          sourceId: S.queueInterview,
        },
      ],
      sourceIds: [S.queueInterview],
    },
    {
      id: "appearance-ted-2007",
      title: "A powerful idea about ideas",
      venue: "TED2007",
      publishedAt: "2007-03",
      participants: ["Alan Kay"],
      summary:
        "Teaching children with computers as a medium for powerful ideas — demonstrations of the Etoys approach to real math and science.",
      media: [
        {
          type: "video",
          url: "https://www.ted.com/talks/alan_kay_shares_a_powerful_idea_about_ideas",
          sourceId: S.ted2007,
        },
      ],
      sourceIds: [S.ted2007],
    },
    {
      id: "appearance-drdobbs-2012",
      title: "Interview with Alan Kay",
      venue: "Dr. Dobb's",
      publishedAt: "2012-07-10",
      participants: ["Alan Kay", "Andrew Binstock"],
      summary:
        "Binstock's Turing-centenary interview: computing as pop culture, the Web 'done by amateurs,' and what education gets wrong.",
      media: [
        {
          type: "article",
          url: "https://web.archive.org/web/20190101192015/http://www.drdobbs.com:80/architecture-and-design/interview-with-alan-kay/240003442",
          sourceId: S.drdobbs,
        },
      ],
      sourceIds: [S.drdobbs],
    },
  ],
  relations: [
    {
      id: "rel-xerox-parc",
      kind: "employed_by",
      target: "xerox-parc",
      targetName: "Xerox Palo Alto Research Center",
      targetKind: "organization",
      note: "Joined the founding research staff in 1970 and led the Learning Research Group — Smalltalk, the overlapping-window GUI, the Dynabook program.",
      sourceIds: [S.wikipedia, S.chmFellow, S.queueInterview],
    },
    {
      id: "rel-atari",
      kind: "employed_by",
      target: "atari",
      targetName: "Atari, Inc.",
      targetKind: "organization",
      note: "Chief Scientist, 1981–1984.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-apple",
      kind: "employed_by",
      target: "apple",
      targetName: "Apple Computer",
      targetKind: "organization",
      note: "Apple Fellow in the Advanced Technology Group from 1984 until ATG closed in 1997; started the open-source Squeak project there in 1995.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-walt-disney-imagineering",
      kind: "employed_by",
      target: "walt-disney-imagineering",
      targetName: "Walt Disney Imagineering",
      targetKind: "organization",
      note: "Disney Fellow and R&D vice president, recruited by Bran Ferren after Apple ATG closed; left when Ferren departed to co-found Applied Minds.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-hp-labs",
      kind: "employed_by",
      target: "hp-labs",
      targetName: "HP Labs",
      targetKind: "organization",
      note: "Senior fellow from 2002; departed July 20, 2005 when HP disbanded the Advanced Software Research Team.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-ucla",
      kind: "employed_by",
      target: "ucla",
      targetName: "University of California, Los Angeles",
      targetKind: "organization",
      note: "Adjunct professor of computer science.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "rel-mit",
      kind: "employed_by",
      target: "mit",
      targetName: "Massachusetts Institute of Technology",
      targetKind: "organization",
      note: "Adjunct professor.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "rel-kyoto-university",
      kind: "employed_by",
      target: "kyoto-university",
      targetName: "Kyoto University",
      targetKind: "organization",
      note: "Visiting professor.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "rel-viewpoints-research-institute",
      kind: "founded",
      target: "viewpoints-research-institute",
      targetName: "Viewpoints Research Institute",
      targetKind: "organization",
      note: "Founded the 501(c)(3) in 2001 for 'powerful ideas education' and advanced software research; its president until the 2018 closure.",
      sourceIds: [S.wikipedia, S.vpriHome],
    },
    {
      id: "rel-croquet-project",
      kind: "founded",
      target: "croquet-project",
      targetName: "Croquet Project",
      targetKind: "organization",
      note: "Co-founded the open-source networked 2D/3D collaboration environment.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-david-a-smith",
      kind: "cofounder",
      target: "david-a-smith",
      targetName: "David A. Smith",
      note: "Co-founded the Croquet Project together.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-david-p-reed",
      kind: "cofounder",
      target: "david-p-reed",
      targetName: "David P. Reed",
      note: "Co-founded the Croquet Project together.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-andreas-raab",
      kind: "cofounder",
      target: "andreas-raab",
      targetName: "Andreas Raab",
      note: "Co-founded the Croquet Project together.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-rick-mcgeer",
      kind: "cofounder",
      target: "rick-mcgeer",
      targetName: "Rick McGeer",
      note: "Co-founded the Croquet Project together.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-julian-lombardi",
      kind: "cofounder",
      target: "julian-lombardi",
      targetName: "Julian Lombardi",
      note: "Co-founded the Croquet Project together.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-mark-mccahill",
      kind: "cofounder",
      target: "mark-mccahill",
      targetName: "Mark McCahill",
      note: "Co-founded the Croquet Project together.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-ed-cheadle",
      kind: "collaborated",
      target: "ed-cheadle",
      targetName: "Ed Cheadle",
      note: "Codesigned the FLEX Machine with him at the University of Utah.",
      sourceIds: [S.chmFellow, S.wikipedia, S.mproveMedia],
    },
    {
      id: "rel-dan-ingalls",
      kind: "collaborated",
      target: "dan-ingalls",
      targetName: "Dan Ingalls",
      note: "Built the first working Smalltalk from Kay's one-page interpreter design; later co-started the Squeak project at Apple.",
      sourceIds: [S.earlyHistory, S.oopsla97, S.wikipedia],
    },
    {
      id: "rel-adele-goldberg",
      kind: "collaborated",
      target: "adele-goldberg",
      targetName: "Adele Goldberg",
      note: "Learning Research Group collaborator across the Smalltalk line and co-author of 'Personal Dynamic Media' (1977).",
      sourceIds: [S.earlyHistory, S.amturing, S.wikipedia, S.mproveMedia],
    },
    {
      id: "rel-ted-kaehler",
      kind: "collaborated",
      target: "ted-kaehler",
      targetName: "Ted Kaehler",
      note: "Smalltalk-72 through -80 collaborator; later on the Squeak team at Apple.",
      sourceIds: [S.earlyHistory, S.wikipedia],
    },
    {
      id: "rel-diana-merry",
      kind: "collaborated",
      target: "diana-merry",
      targetName: "Diana Merry",
      note: "Learning Research Group collaborator on the Smalltalk line.",
      sourceIds: [S.earlyHistory, S.wikipedia],
    },
    {
      id: "rel-john-maloney",
      kind: "collaborated",
      target: "john-maloney",
      targetName: "John Maloney",
      note: "Co-started the open-source Squeak Smalltalk project at Apple in December 1995.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-scott-wallace",
      kind: "collaborated",
      target: "scott-wallace",
      targetName: "Scott Wallace",
      note: "Co-started the open-source Squeak Smalltalk project at Apple in December 1995.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "rel-chuck-thacker",
      kind: "collaborated",
      target: "chuck-thacker",
      targetName: "Charles Thacker",
      note: "Designed the Alto — the 'interim Dynabook' hardware Smalltalk ran on; shared the 2004 Draper Prize with Kay, Lampson, and Taylor.",
      sourceIds: [S.wikipedia, S.chmFellow, S.kyoto],
    },
    {
      id: "rel-butler-lampson",
      kind: "collaborated",
      target: "butler-lampson",
      targetName: "Butler Lampson",
      note: "Championed the Alto at PARC; shared the 2004 Draper Prize with Kay, Thacker, and Taylor.",
      sourceIds: [S.chmFellow, S.kyoto, S.amturing],
    },
    {
      id: "rel-robert-taylor",
      kind: "collaborated",
      target: "robert-taylor",
      targetName: "Robert Taylor",
      note: "Ran PARC's Computer Science Lab, which housed the Learning Research Group; shared the 2004 Draper Prize.",
      sourceIds: [S.chmFellow, S.kyoto, S.amturing],
    },
    {
      id: "rel-nicholas-negroponte",
      kind: "collaborated",
      target: "nicholas-negroponte",
      targetName: "Nicholas Negroponte",
      note: "His One Laptop per Child program built the XO-1 on the Dynabook ideal; Kay was a prominent co-developer of its Squeak/Etoys educational software.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "rel-ivan-sutherland",
      kind: "influenced_by",
      target: "ivan-sutherland",
      targetName: "Ivan Sutherland",
      note: "Kay credits Sutherland's 1963 Sketchpad thesis as a major influence; Sutherland co-ran the Utah ARPA graphics program where Kay did his graduate work.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "rel-david-evans",
      kind: "influenced_by",
      target: "david-evans",
      targetName: "David C. Evans",
      note: "Ran the Utah ARPA graphics program with Sutherland during Kay's 1966–1969 graduate study.",
      sourceIds: [S.wikipedia, S.chmFellow],
    },
    {
      id: "rel-seymour-papert",
      kind: "influenced_by",
      target: "seymour-papert",
      targetName: "Seymour Papert",
      note: "Meeting Papert and seeing children program in Logo in 1968 turned his personal-computer thinking toward children.",
      sourceIds: [S.wikipedia, S.earlyHistory],
    },
    {
      id: "rel-douglas-engelbart",
      kind: "influenced_by",
      target: "douglas-engelbart",
      targetName: "Douglas Engelbart",
      note: "Attended the 1968 'Mother of All Demos' and called it one of the greatest experiences of his life; NLS sits in his declared genealogy of the sixties.",
      sourceIds: [S.wikipedia, S.earlyHistory, S.doingWithImages],
    },
    {
      id: "rel-stuart-feldman",
      kind: "interviewed_by",
      target: "stuart-feldman",
      targetName: "Stuart Feldman",
      note: "The 2004 ACM Queue 'A Conversation with Alan Kay' interview.",
      sourceIds: [S.queueInterview],
    },
    {
      id: "rel-andrew-binstock",
      kind: "interviewed_by",
      target: "andrew-binstock",
      targetName: "Andrew Binstock",
      note: "The 2012 Dr. Dobb's interview.",
      sourceIds: [S.drdobbs],
    },
    {
      id: "rel-stewart-brand",
      kind: "interviewed_by",
      target: "stewart-brand",
      targetName: "Stewart Brand",
      note: "Quoted in Brand's 1972 Rolling Stone tour of ARPA computing culture.",
      sourceIds: [S.spacewar],
    },
  ],
  openQuestions: [
    "The PARC-to-Atari transition year is loose in the record: most accounts give Atari chief scientist 1981–1984, but the end of his PARC employment is variously dated; the timeline uses 1970–1981.",
    "'The best way to predict the future is to invent it' is also attributed to Peter Drucker and Dandridge M. Cole and anticipated by Dennis Gabor's 1963 'Inventing the Future'; Kay's documented usage dates to a 1971 PARC meeting, and the packet flags the shared attribution rather than asserting sole credit.",
    "His Utah doctorate's dissertation title is commonly cataloged as 'The Reactive Engine' (1969), while some records — including Wikipedia's infobox — list the 1968 master's work 'FLEX: A Flexible Extendable Language'; the two are often conflated.",
    "The Colorado degree is listed as a B.S. in mathematics and molecular biology by Wikipedia and as a B.A. in mathematics and biology by the Computer History Museum — a minor record discrepancy preserved rather than resolved.",
    "What happened to VPRI's papers, code, and the vpri.org site after the 2018 closure — beyond the 2016 HARC/Y Combinator Research arrangement — is not fully documented in the public record.",
  ],
  body: `Alan Kay is an American computer scientist whose ideas set the agenda for personal computing: the Dynabook he conceived in 1968, the Smalltalk system he led at Xerox PARC in the 1970s, and the overlapping-window graphical interface his group built on the Alto. He received the 2003 ACM Turing Award for pioneering object-oriented programming and personal computing — and has spent the decades since insisting, in his OOPSLA 1997 keynote and his Turing lecture alike, that "the computer revolution hasn't happened yet."

## From jazz clubs to the ARPA dream

Born May 17, 1940 in Springfield, Massachusetts, Kay describes himself as a prodigy reader — fluent by about three, roughly 150 books before first grade — who concluded early that his teachers "were lying to me," a skepticism of schooling he never lost. A professional jazz guitarist in his youth, he taught guitar in Denver, was drafted into the Army, passed into Air Force officer training, and was routed into programming by an aptitude test. He finished a bachelor's degree in mathematics and molecular biology at the University of Colorado Boulder in 1966 and went that fall to the University of Utah, where David Evans and Ivan Sutherland were building the ARPA graphics program.

Utah was a convergence. Kay absorbed Sutherland's Sketchpad, the half-page eval of the Lisp 1.5 manual he later called "Maxwell's Equations of Software," and — in 1968 — Seymour Papert's demonstrations of children programming in Logo, which sent him to Piaget, Bruner, and Vygotsky. On December 9, 1968, running a fever, he attended Engelbart's "Mother of All Demos" in San Francisco. His own work became the FLEX Machine — an early desktop computer with a graphical interface and an object-oriented operating system, codesigned with Ed Cheadle — described across his 1968 master's and 1969 doctoral work. The Dynabook, a book-sized personal computer for "children of all ages," was conceived in the same period: what would children do with real computing?

## PARC: Smalltalk, windows, and the Dynabook

After a stint at the Stanford AI Lab, Kay joined Xerox's new Palo Alto Research Center in 1970 — one of its earliest researchers — and led the Learning Research Group through the decade. The plan was a chain of "interim Dynabooks"; the Alto, hardware designed by Chuck Thacker and championed by Butler Lampson under Bob Taylor's management, became the vehicle. On it the group built Smalltalk: conceived by Kay in a one-page interpreter design in late 1972 and implemented in weeks by Dan Ingalls, then evolved through Smalltalk-72, -74, -76, and -80 with Adele Goldberg, Ted Kaehler, Diana Merry, and others. Smalltalk carried the first modern overlapping-window interface and a model in which everything is an object communicating only by messages. Kay had coined "object-oriented" for it — and soon regretted the word, insisting the big idea was messaging and that he "did not have C++ in mind."

The 1972 ACM paper "A Personal Computer for Children of All Ages" sketched the Dynabook publicly — a personal medium at a plausible $500 — and "Personal Dynamic Media" with Goldberg (1977) refined it. Stewart Brand's 1972 Rolling Stone visit captured Kay mid-scene, quoted on hackers as artisans. PARC's collective output — Ethernet, laser printing, client-server computing, the desktop GUI — seeded an industry; Kay's distinctive pieces were the Dynabook vision, Smalltalk, the windowed interface, and the demonstration that children could program.

## After PARC: fellowships, Squeak, and Viewpoints

Kay left PARC as the 1980s began: chief scientist at Atari (1981–1984), Apple Fellow in the Advanced Technology Group from 1984 until ATG closed in 1997, then Disney Fellow and R&D vice president at Walt Disney Imagineering under Bran Ferren. At Apple in December 1995 he helped start Squeak, an open-source Smalltalk-80, and in 1996 the research that became Etoys — a tile-scripted authoring system children could actually use. Croquet, an open-source collaborative 3D environment, followed with David A. Smith, David Reed, Andreas Raab, and others. When Nicholas Negroponte's One Laptop per Child project unveiled the XO "Children's Machine" in 2005 — explicitly Dynabook-derived — Kay was a prominent contributor to its educational software.

In 2002 he joined HP Labs as a senior fellow, leaving in July 2005 when HP disbanded the advanced software research team. In 2001 he had founded Viewpoints Research Institute, a nonprofit devoted to "powerful ideas education" and advanced systems research; housed at Applied Minds in Glendale for its first decade, VPRI joined Y Combinator Research's HARC in 2016 and closed in 2018. Its flagship effort, the NSF-funded STEPS project (2006–2012), asked how small an understandable model of personal computing could be — tens of thousands of lines instead of hundreds of millions.

Honors accumulated: Computer History Museum Fellow (1999), NEC C&C Prize (2001), the Turing Award (2003), the Kyoto Prize and Charles Stark Draper Prize (2004 — the latter shared with Thacker, Lampson, and Taylor for the Alto), ACM Fellow (2008), and honorary doctorates from KTH, Georgia Tech, Pisa, Waterloo, and others. He has held adjunct or visiting posts at UCLA, Kyoto University, and MIT.

## The critique: literacy, pop culture, and an unfinished revolution

Kay's second career is a sustained critique of the first's outcome. Media revolutions take centuries, he argues, and require fluency — reading and writing at the medium's highest level of ideas; computing instead remains a "pop culture" that mimics paper, forgets its own history, and mistakes Java training for computer science. The Internet, he told Dr. Dobb's in 2012, was engineered so well people take it for a natural resource; "the Web, in comparison, is a joke — done by amateurs." Most commercial software is an Egyptian pyramid of brute-forced bricks. His remedy is the one he started with: systems small enough to understand and expressive enough for children to grow into — what Squeak, Etoys, Croquet, and STEPS each attempted.

The aphorisms that made him a conference legend — "the best way to predict the future is to invent it" (a documented 1971 PARC remark whose wording also attaches to Drucker and to Dennis Gabor's 1963 *Inventing the Future*), "a change in perspective is worth 80 IQ points," and "people who are really serious about software should make their own hardware" (both from a July 1982 seminar) — are real but drift in retelling; this index notes provenance where it is known.

## What the record does not settle

Kay is unusually well documented, but seams remain: sources disagree on the year he left PARC, on whether his Colorado degree reads BA or BS, and on the title of his 1969 dissertation ("The Reactive Engine" versus the master's "FLEX" work). His most famous quotations circulate in variants with shared attribution. And "inventor of the personal computer" is a press compression: the Draper citation names four people for the Alto, and Kay's own claims cluster on the concepts — Dynabook, Smalltalk, the windowed UI — and the children who used them.

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
