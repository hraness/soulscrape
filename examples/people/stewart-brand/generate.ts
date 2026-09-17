#!/usr/bin/env bun
/** Generate examples/people/stewart-brand/person-index.json with derived source ids. */

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

const sbBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bio — Stewart Brand",
  url: "https://sb.longnow.org/SB_homepage/Bio.html",
  publisher: "sb.longnow.org",
  notes:
    "The subject's own chronological biography (updated May 02013); claims here are self-reported and occasionally differ from institutional records.",
});
const sbBooks = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Books — Stewart Brand",
  url: "https://sb.longnow.org/SB_homepage/Books.html",
  publisher: "sb.longnow.org",
  notes:
    "His own book list with excerpts, including the opening of The Clock of the Long Now.",
});
const longNowPeople = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Stewart Brand — Long Now People",
  url: "https://longnow.org/people/sb1/",
  publisher: "The Long Now Foundation",
  notes:
    "Bio page at the foundation he co-founded and leads; institutional rather than independent.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Stewart Brand (Q971994)",
  url: "https://www.wikidata.org/wiki/Q971994",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Stewart Brand",
  url: "https://en.wikipedia.org/wiki/Stewart_Brand",
  publisher: "Wikipedia",
  notes: "Used for discovery and corroboration, not as sole authority.",
});
const nbf = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Stewart Brand — National Book Foundation",
  url: "https://www.nationalbook.org/people/stewart-brand/",
  publisher: "National Book Foundation",
  notes:
    "The award body's record: Winner, Contemporary Affairs, National Book Awards 1972, for The Last Whole Earth Catalog.",
});
const engelbartOutline = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "1968 Demo Detailed Onscreen Outline — Doug Engelbart Institute",
  url: "https://dougengelbart.org/content/view/333",
  publisher: "Doug Engelbart Institute",
  notes:
    "The surviving production outline of the December 9, 1968 'Mother of All Demos'; credits 'Stewart Brand, Portola Institute, consultation, camera, assistant stage.'",
});
const jobsSpeech = source({
  binding: "primary_record",
  mediaType: "transcript",
  title: "'You've got to find what you love,' Jobs says",
  url: "https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says",
  publisher: "Stanford Report",
  publishedAt: "2005",
  authors: ["Steve Jobs"],
  notes:
    "Prepared text of the June 12, 2005 Stanford commencement address quoting the Whole Earth Epilog's back cover: 'Stay hungry. Stay foolish.'",
});
const spacewar = source({
  binding: "first_person",
  mediaType: "article",
  title: "Spacewar: Fanatic Life and Symbolic Death Among the Computer Bums",
  url: "https://archive.org/details/BrandSpacewarRollingStone",
  publisher: "Rolling Stone (scan at Internet Archive)",
  publishedAt: "1972-12-07",
  authors: ["Stewart Brand"],
  notes:
    "His Rolling Stone report on hackers and the Intergalactic Spacewar Olympics at the Stanford AI lab.",
});
const wedBook = source({
  binding: "first_person",
  mediaType: "book",
  title:
    "Whole Earth Discipline: Why Dense Cities, Nuclear Power, Transgenic Crops, Restored Wildlands, and Geoengineering Are Necessary",
  url: "https://www.penguinrandomhouse.com/books/302432/whole-earth-discipline-by-stewart-brand/",
  publisher: "Penguin Random House",
  publishedAt: "2009",
  authors: ["Stewart Brand"],
  notes:
    "Publisher's page for the ecopragmatist manifesto first issued by Viking in 2009; the paperback followed in 2010.",
});
const maintenanceBook = source({
  binding: "first_person",
  mediaType: "book",
  title: "Maintenance: Of Everything, Part One",
  url: "https://press.stripe.com/maintenance-part-one",
  publisher: "Stripe Press",
  publishedAt: "2026-01-20",
  authors: ["Stewart Brand"],
  notes: "First volume of his work-in-progress on the civilizational role of maintenance.",
});
const tedTalk = source({
  binding: "first_person",
  mediaType: "video",
  title: "Stewart Brand: The dawn of de-extinction. Are you ready?",
  url: "https://www.ted.com/talks/stewart_brand_the_dawn_of_de_extinction_are_you_ready",
  publisher: "TED",
  publishedAt: "2013-03",
  notes: "His TED2013 talk arguing for reviving extinct species such as the passenger pigeon.",
});
const fortune = source({
  binding: "interview",
  mediaType: "article",
  title: "Information wants to be free … and expensive",
  url: "https://fortune.com/2009/07/20/information-wants-to-be-free-and-expensive/",
  publisher: "Fortune",
  publishedAt: "2009-07-20",
  notes:
    "Interview with Brand revisiting the 1984 Hackers Conference exchange with Steve Wozniak that produced the famous phrase.",
});
const guardianInterview = source({
  binding: "interview",
  mediaType: "article",
  title: "Stewart Brand: My plan B for climate change",
  url: "https://www.theguardian.com/environment/2010/oct/03/my-bright-idea-stewart-brand",
  publisher: "The Guardian",
  publishedAt: "2010-10-03",
  notes:
    "Q&A in which he defends nuclear power, GM crops, cities, and geoengineering against environmentalist orthodoxy.",
});
const wiredWell = source({
  binding: "interview",
  mediaType: "article",
  title: "Proto Social Network 'The Well' Runneth Over",
  url: "https://www.wired.com/2007/12/st-15thewell/",
  publisher: "Wired",
  publishedAt: "2007-12",
  notes:
    "Q&A with founders Stewart Brand and Larry Brilliant on The WELL's founding and its no-anonymity design.",
});
const wholeEarthIndex = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Whole Earth Index",
  url: "https://wholeearth.info/",
  publisher: "Whole Earth Index (Gray Area, Long Now, Internet Archive)",
  notes:
    "Nearly complete scanned archive of Whole Earth publications — the Catalogs, CoEvolution Quarterly, Whole Earth Software Review, and Whole Earth Review, 1968–2002.",
});
const oac = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Stewart Brand papers, 1954–2000 (M1237)",
  url: "https://oac.cdlib.org/findaid/ark:/13030/kt6199s310/",
  publisher: "Online Archive of California / Stanford Special Collections",
  notes:
    "Finding aid for his papers at Stanford: correspondence, journals, manuscripts, photographs, and project records.",
});
const nytMarkoff = source({
  binding: "reporting",
  mediaType: "article",
  title: "Stewart Brand's Long, Strange Trip",
  url: "https://www.nytimes.com/2022/03/25/books/review/whole-earth-john-markoff.html",
  publisher: "The New York Times",
  publishedAt: "2022-03-25",
  authors: ["Paul Sabin"],
  notes:
    "Review of John Markoff's biography Whole Earth: The Many Lives of Stewart Brand (Penguin Press, 2022).",
});
const monbiotGuardian = source({
  binding: "reporting",
  mediaType: "article",
  title: "Channel 4's convenient green fictions",
  url: "https://www.theguardian.com/commentisfree/cif-green/2010/nov/04/channel-4-convenient-green-fiction",
  publisher: "The Guardian",
  publishedAt: "2010-11-04",
  authors: ["George Monbiot"],
  notes:
    "Critique of the Channel 4 film based on Whole Earth Discipline and of Brand's techno-optimist environmentalism, including the disputed DDT passage.",
});
const weAreAsGods = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "We Are As Gods (film)",
  url: "https://www.weareasgods.film/",
  publisher: "We Are As Gods / Structure Films / Stripe Press",
  notes:
    "Official site for the feature documentary about Brand that premiered at SXSW 2021 and streamed from 2022.",
});

const S = {
  sbBio: sbBio.id,
  sbBooks: sbBooks.id,
  longNowPeople: longNowPeople.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  nbf: nbf.id,
  engelbartOutline: engelbartOutline.id,
  jobsSpeech: jobsSpeech.id,
  spacewar: spacewar.id,
  wedBook: wedBook.id,
  maintenanceBook: maintenanceBook.id,
  tedTalk: tedTalk.id,
  fortune: fortune.id,
  guardianInterview: guardianInterview.id,
  wiredWell: wiredWell.id,
  wholeEarthIndex: wholeEarthIndex.id,
  oac: oac.id,
  nytMarkoff: nytMarkoff.id,
  monbiotGuardian: monbiotGuardian.id,
  weAreAsGods: weAreAsGods.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-stewart-brand",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "stewart-brand",
    displayName: "Stewart Brand",
    summary:
      "American writer, editor, and serial institution-builder: creator of the Whole Earth Catalog, co-founder of The WELL, Global Business Network, and the Long Now Foundation, and author of 'How Buildings Learn' and 'Whole Earth Discipline.'",
    identity: {
      wikidataId: "Q971994",
      officialSite: "https://sb.longnow.org/",
      wikipedia: "https://en.wikipedia.org/wiki/Stewart_Brand",
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "organizations", "media"],
  },
  sources: [
    sbBio,
    sbBooks,
    longNowPeople,
    wikidata,
    wikipedia,
    nbf,
    engelbartOutline,
    jobsSpeech,
    spacewar,
    wedBook,
    maintenanceBook,
    tedTalk,
    fortune,
    guardianInterview,
    wiredWell,
    wholeEarthIndex,
    oac,
    nytMarkoff,
    monbiotGuardian,
    weAreAsGods,
  ],
  claims: [
    {
      id: "claim-born-1938",
      kind: "fact",
      text: "Stewart Brand was born on December 14, 1938, in Rockford, Illinois, and attended Phillips Exeter Academy from 1954 to 1956.",
      sourceIds: [S.wikipedia, S.wikidata, S.sbBio],
    },
    {
      id: "claim-stanford-biology-1960",
      kind: "fact",
      text: "He graduated from Stanford University in 1960 with a degree in biology — training he later cited when defending genetically engineered crops.",
      sourceIds: [S.sbBio, S.wikipedia, S.guardianInterview],
    },
    {
      id: "claim-army-officer",
      kind: "fact",
      text: "From 1960 to 1962 he served on active duty as a US Army officer: he qualified Airborne, taught basic infantry training, and worked as a photojournalist out of the Pentagon.",
      sourceIds: [S.sbBio, S.longNowPeople, S.wikipedia],
    },
    {
      id: "claim-pranksters-acid-tests",
      kind: "fact",
      text: "Between 1964 and 1966 he was part of Ken Kesey's circle around the Merry Pranksters and the early Acid Tests, and received an 'Acid Test Diploma' from Neal Cassady at the 1966 Acid Test Graduation later chronicled in Tom Wolfe's The Electric Kool-Aid Acid Test.",
      sourceIds: [S.sbBio, S.wikipedia, S.weAreAsGods],
    },
    {
      id: "claim-trips-festival-1966",
      kind: "fact",
      text: "In January 1966 he designed and organized the Trips Festival, a three-day multimedia event at San Francisco's Longshoreman's Hall that became a founding moment of the Bay Area psychedelic scene.",
      sourceIds: [S.sbBio, S.wikipedia, S.nytMarkoff],
    },
    {
      id: "claim-whole-earth-photo-campaign",
      kind: "fact",
      text: "In 1966 he conceived and sold buttons reading 'Why Haven't We Seen a Photograph of the Whole Earth Yet?' — a campaign pressing NASA to release color images of the planet; the resulting imagery became the Whole Earth Catalog's cover and an emblem of the environmental movement.",
      sourceIds: [S.sbBio, S.wikipedia, S.nytMarkoff],
    },
    {
      id: "claim-wec-founded-1968",
      kind: "fact",
      text: "He founded, edited, and published the Whole Earth Catalog from 1968 to 1972 — a counterculture magazine and product review built around self-sufficiency and the slogan 'access to tools'; successor Whole Earth publications continued to 2002.",
      sourceIds: [S.sbBio, S.wikipedia, S.wholeEarthIndex],
    },
    {
      id: "claim-we-are-as-gods-line",
      kind: "fact",
      text: "The 1968 Catalog opened with his line 'We are as gods and might as well get good at it'; in Whole Earth Discipline (2009) he sharpened it to 'We are as gods and have to get good at it.'",
      sourceIds: [S.weAreAsGods, S.wedBook, S.wholeEarthIndex],
    },
    {
      id: "claim-nba-1972",
      kind: "fact",
      text: "The Last Whole Earth Catalog (1971, Random House) won the 1972 National Book Award in the Contemporary Affairs category; his bio reports 1.5 million copies sold and over 2.5 million across all editions.",
      sourceIds: [S.nbf, S.sbBio, S.wikipedia],
    },
    {
      id: "claim-stay-hungry-back-cover",
      kind: "fact",
      text: "The back cover of the final Whole Earth Epilog (1974) carried the words 'Stay hungry. Stay foolish.' above a photograph of a country road; Steve Jobs quoted them in his 2005 Stanford commencement address, calling the Catalog 'one of the bibles of my generation.'",
      sourceIds: [S.jobsSpeech, S.sbBio, S.wholeEarthIndex],
    },
    {
      id: "claim-engelbart-demo-role",
      kind: "fact",
      text: "On December 9, 1968, he worked on Douglas Engelbart's 'Mother of All Demos' at the Fall Joint Computer Conference in San Francisco — the debut of the mouse, hypertext, and video teleconferencing; the production outline credits him for 'consultation, camera, assistant stage.'",
      sourceIds: [S.engelbartOutline, S.sbBio, S.wikipedia],
    },
    {
      id: "claim-spacewar-1972",
      kind: "fact",
      text: "His December 7, 1972 Rolling Stone article 'Spacewar: Fanatic Life and Symbolic Death Among the Computer Bums' reported the Intergalactic Spacewar Olympics at the Stanford AI lab — among the earliest mainstream accounts of hacker culture.",
      sourceIds: [S.spacewar, S.sbBio, S.wikipedia],
    },
    {
      id: "claim-two-cybernetic-frontiers",
      kind: "fact",
      text: "His 1974 book Two Cybernetic Frontiers (Random House) joined an interview with Gregory Bateson to a report on cutting-edge computer science; his bio credits it with the first print use of the term 'personal computer' and the first book-length report on hackers.",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "claim-point-foundation",
      kind: "fact",
      text: "In 1972 he founded the Point Foundation, which gave away about $1 million in three years and ran the Whole Earth activities through 2003.",
      sourceIds: [S.sbBio, S.wholeEarthIndex],
    },
    {
      id: "claim-coevolution-quarterly",
      kind: "fact",
      text: "From 1974 to 1985 he founded, edited, and published CoEvolution Quarterly, the Whole Earth successor journal that later merged into Whole Earth Review.",
      sourceIds: [S.sbBio, S.wholeEarthIndex, S.wikipedia],
    },
    {
      id: "claim-jerry-brown-advisor",
      kind: "fact",
      text: "From 1977 to 1979 he served as an advisor to California Governor Jerry Brown, in which role he initiated The California Water Atlas.",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "claim-tugboat-mirene",
      kind: "fact",
      text: "In 1982 he bought a 64-foot tugboat, the Mirene, and has lived aboard it in Sausalito ever since.",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "claim-well-founded",
      kind: "fact",
      text: "In 1985 he co-founded The WELL (Whole Earth 'Lectronic Link) with Larry Brilliant — one of the oldest continuously operating virtual communities, seeded by Whole Earth Review writers and readers and shaped by the rule 'You Own Your Own Words.'",
      sourceIds: [S.wiredWell, S.wikipedia, S.longNowPeople],
    },
    {
      id: "claim-hackers-conference-1984",
      kind: "fact",
      text: "In 1984 he initiated and co-organized the first Hackers Conference with Kevin Kelly and Ryan Phelan, convened around the publication of Steven Levy's book Hackers; it became an annual event from 1986.",
      sourceIds: [S.sbBio, S.fortune],
    },
    {
      id: "claim-information-wants-quote",
      kind: "fact",
      text: "At the 1984 Hackers Conference, responding to Steve Wozniak, Brand said that on one hand information 'wants to be expensive, because it's so valuable,' and on the other it 'wants to be free, because the cost of getting it out is getting lower and lower all the time' — the documented origin of the meme 'information wants to be free.'",
      sourceIds: [S.fortune, S.wikipedia],
    },
    {
      id: "claim-media-lab-stint",
      kind: "fact",
      text: "In 1986 he was a visiting scientist at the MIT Media Lab, a stint that produced the book The Media Lab: Inventing the Future at MIT (Viking Penguin, 1987).",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "claim-gbn-founded",
      kind: "fact",
      text: "In 1988 he co-founded Global Business Network with Peter Schwartz, Jay Ogilvy, Napier Collyns, and Lawrence Wilkinson — a scenario-planning consultancy serving multinationals and government clients including DARPA, and the vehicle for the techniques in Schwartz's The Art of the Long View.",
      sourceIds: [S.sbBio, S.longNowPeople, S.monbiotGuardian],
    },
    {
      id: "claim-board-service",
      kind: "fact",
      text: "His institutional roles included trustee of the Santa Fe Institute (1989–2004) and board member of the Electronic Frontier Foundation (1990–94).",
      sourceIds: [S.sbBio],
    },
    {
      id: "claim-how-buildings-learn-1994",
      kind: "fact",
      text: "In 1994 he published How Buildings Learn: What Happens After They're Built (Viking-Penguin), arguing that buildings work best when they can adapt over time — a book adopted in architecture and preservation courses and read widely by software designers.",
      sourceIds: [S.sbBio, S.sbBooks, S.wikipedia],
    },
    {
      id: "claim-bbc-series-1997",
      kind: "fact",
      text: "In 1996–97 he co-wrote and presented a six-part BBC2 television series of How Buildings Learn, aired July–August 1997, directed by James Runcie with music by Brian Eno.",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "claim-long-now-founded",
      kind: "fact",
      text: "He co-founded the Long Now Foundation with Danny Hillis to foster long-term thinking and responsibility across a 10,000-year frame; its core projects are a monumental mechanical Clock and long-horizon library tools such as the Rosetta Project, and he serves as its president.",
      sourceIds: [S.longNowPeople, S.wikipedia, S.sbBio],
    },
    {
      id: "claim-salt-seminars",
      kind: "fact",
      text: "Since 2003 he has founded and curated Long Now's monthly 'Seminars About Long-term Thinking' (SALT) in San Francisco, co-hosted with Kevin Kelly.",
      sourceIds: [S.sbBio, S.longNowPeople],
    },
    {
      id: "claim-whole-earth-discipline-2009",
      kind: "fact",
      text: "In 2009 he published Whole Earth Discipline: An Ecopragmatist Manifesto (Viking), arguing that dense cities, nuclear power, transgenic crops, restored wildlands, and geoengineering are necessary responses to climate change.",
      sourceIds: [S.wedBook, S.sbBio, S.guardianInterview],
    },
    {
      id: "claim-ddt-dispute",
      kind: "fact",
      text: "George Monbiot charged in The Guardian that Whole Earth Discipline's claim of a worldwide DDT ban was false — DDT for disease control was never banned worldwide — and that the Channel 4 film based on the book had to alter its script hours before broadcast over 'false and actionable accusations.'",
      sourceIds: [S.monbiotGuardian],
    },
    {
      id: "claim-revive-restore-2012",
      kind: "fact",
      text: "In 2012 he co-founded Revive & Restore with his wife Ryan Phelan inside the Long Now Foundation, promoting de-extinction and genetic rescue of endangered and extinct species, starting with the passenger pigeon.",
      sourceIds: [S.sbBio, S.tedTalk, S.weAreAsGods],
    },
    {
      id: "claim-maintenance-2026",
      kind: "fact",
      text: "In January 2026 Stripe Press published Maintenance: Of Everything, Part One, the first in a planned multi-volume work arguing that maintenance — from sailboats to infrastructure to the planet — is a radical, undervalued civilizational practice.",
      sourceIds: [S.maintenanceBook],
    },
    {
      id: "claim-access-to-tools-ethos",
      kind: "stated_belief",
      text: "Brand's organizing conviction is practical empowerment over petition: put the best tools — books, machines, techniques, ideas — directly in people's hands and they will improve their own lives and the systems around them.",
      sourceIds: [S.wholeEarthIndex, S.sbBio, S.nytMarkoff],
    },
    {
      id: "claim-information-paradox",
      kind: "stated_belief",
      text: "He insists the famous line is a paradox, not a slogan: information wants to be expensive because it is so valuable, and free because it is so cheap to distribute — 'that tension will not go away.'",
      sourceIds: [S.fortune],
    },
    {
      id: "claim-ecopragmatist-turn",
      kind: "stated_belief",
      text: "He argues the environmental movement must embrace nuclear power, dense cities, genetically modified crops, and geoengineering: 'Nuclear was a switch. I had been somewhat against it. I'm so strongly for it now that even if climate change wasn't an issue, I'd still be pushing it.'",
      sourceIds: [S.guardianInterview, S.wedBook, S.monbiotGuardian],
    },
    {
      id: "claim-comfortable-being-wrong",
      kind: "stated_belief",
      text: "He says he wants 'an environmental movement that's comfortable noticing when it's wrong,' keeps a public litany of his own errors in Whole Earth Discipline, and describes enjoying being found wrong.",
      sourceIds: [S.monbiotGuardian, S.wedBook],
    },
    {
      id: "claim-long-term-thinking",
      kind: "stated_belief",
      text: "He frames civilization's problem as a 'pathologically short attention span' and asks how to make long-term thinking 'automatic and common' — the premise behind the Clock, the Library, and the seminars.",
      sourceIds: [S.sbBooks, S.longNowPeople],
    },
    {
      id: "claim-accountable-identity",
      kind: "stated_belief",
      text: "On The WELL he pushed for accountable identity — playful handles linked to real people, 'so that, if necessary, you could go punch that nose' — connecting cyberspace to real space.",
      sourceIds: [S.wiredWell],
    },
    {
      id: "claim-pattern-institutions",
      kind: "pattern",
      text: "Across six decades he has repeatedly converted scenes into institutions: a festival into a catalog, a catalog into a foundation and journals, a book's audience into a conference and an online community, a consulting practice into a foundation built to last millennia.",
      sourceIds: [S.sbBio, S.nytMarkoff, S.wikipedia],
    },
    {
      id: "claim-pattern-counterculture-computing",
      kind: "pattern",
      text: "He has persistently bridged counterculture and technical establishment — Acid Tests and SRI's demo, commune readers and ARPA-funded hackers, environmentalism and Shell scenario planning — a bridge historians trace through his network.",
      sourceIds: [S.nytMarkoff, S.sbBio, S.monbiotGuardian],
    },
    {
      id: "claim-pattern-early",
      kind: "pattern",
      text: "He is habitually early: pressing for the whole-Earth photograph before Apollo 8's Earthrise, building an online community years before the web, and convening de-extinction researchers before the field had a name.",
      sourceIds: [S.sbBio, S.nytMarkoff, S.tedTalk],
    },
    {
      id: "claim-spec-photo-legend",
      kind: "speculation",
      text: "Whether the 1966 button campaign actually hastened NASA's release of whole-Earth imagery is unproven; his own bio calls the causal story 'legend.'",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "claim-spec-well-date",
      kind: "speculation",
      text: "The WELL's founding year appears as 1984 in his own bio and 1985 in the organization's and press accounts — plausibly the difference between incorporation and the April 1985 public opening.",
      sourceIds: [S.sbBio, S.wiredWell, S.wikipedia],
    },
    {
      id: "claim-spec-pc-term",
      kind: "speculation",
      text: "The claim that Two Cybernetic Frontiers made the first print use of 'personal computer' is his own account; the term's etymological priority has not been independently established in the cited record.",
      sourceIds: [S.sbBio],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1938-12-14",
      title: "Born in Rockford, Illinois",
      summary: "Later attended Phillips Exeter Academy, 1954–56.",
      sourceIds: [S.wikipedia, S.wikidata, S.sbBio],
    },
    {
      id: "event-stanford-1960",
      kind: "education",
      date: "1960",
      title: "Graduated in biology from Stanford",
      summary:
        "Biology degree, followed by two years as a US Army infantry officer and photojournalist.",
      organization: "Stanford University",
      organizationHandle: "stanford-university",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "event-trips-festival",
      kind: "project",
      date: "1966-01",
      title: "Co-created the Trips Festival",
      summary:
        "Three-day multimedia event at Longshoreman's Hall with Ken Kesey and Ramon Sender — a watershed of the psychedelic scene; he received an Acid Test Diploma from Neal Cassady the same year.",
      location: "San Francisco, California",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "event-wec-founded",
      kind: "founded",
      date: "1968",
      title: "Founded the Whole Earth Catalog",
      summary:
        "The counterculture 'access to tools' publication he edited and published through 1972, opening with 'We are as gods and might as well get good at it.'",
      location: "Menlo Park, California",
      sourceIds: [S.sbBio, S.wikipedia, S.wholeEarthIndex],
    },
    {
      id: "event-engelbart-demo",
      kind: "media",
      date: "1968-12-09",
      title: "Crewed the 'Mother of All Demos'",
      summary:
        "Consultation, camera, and assistant stage for Doug Engelbart's NLS demonstration at the Fall Joint Computer Conference.",
      organization: "Stanford Research Institute / Portola Institute",
      organizationHandle: "stanford-research-institute-portola-institute",
      location: "San Francisco, California",
      sourceIds: [S.engelbartOutline, S.sbBio],
    },
    {
      id: "event-nba-1972",
      kind: "award",
      date: "1972",
      title: "National Book Award for The Last Whole Earth Catalog",
      summary:
        "Winner of the Contemporary Affairs category; the catalog sold over 1.5 million copies.",
      organization: "National Book Foundation",
      organizationHandle: "national-book-foundation",
      sourceIds: [S.nbf, S.sbBio],
    },
    {
      id: "event-hackers-conference",
      kind: "founded",
      date: "1984",
      title: "Initiated the first Hackers Conference",
      summary:
        "Co-organized with Kevin Kelly and Ryan Phelan; site of his 'information wants to be free' exchange with Steve Wozniak.",
      location: "Marin Headlands, California",
      sourceIds: [S.sbBio, S.fortune],
    },
    {
      id: "event-well-founded",
      kind: "founded",
      date: "1985",
      title: "Co-founded The WELL",
      summary:
        "The Whole Earth 'Lectronic Link with Larry Brilliant — one of the oldest continuously operating virtual communities.",
      organization: "The WELL",
      organizationHandle: "the-well",
      location: "Sausalito, California",
      sourceIds: [S.wiredWell, S.wikipedia, S.longNowPeople],
    },
    {
      id: "event-gbn-founded",
      kind: "founded",
      date: "1988",
      title: "Co-founded Global Business Network",
      summary:
        "Scenario-planning consultancy with Peter Schwartz, Jay Ogilvy, Napier Collyns, and Lawrence Wilkinson.",
      organization: "Global Business Network",
      organizationHandle: "global-business-network",
      sourceIds: [S.sbBio, S.longNowPeople],
    },
    {
      id: "event-hbl-book",
      kind: "publication",
      date: "1994",
      title: "Published How Buildings Learn",
      summary:
        "What Happens After They're Built — buildings as adaptive systems that learn over time.",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "event-long-now-founded",
      kind: "founded",
      date: "1996",
      title: "Co-founded the Long Now Foundation",
      summary:
        "With Danny Hillis, around the 10,000-year Clock and Library; Brand serves as president.",
      organization: "The Long Now Foundation",
      organizationHandle: "the-long-now-foundation",
      sourceIds: [S.longNowPeople, S.wikipedia, S.sbBio],
    },
    {
      id: "event-hbl-bbc",
      kind: "media",
      date: "1997-07",
      title: "Presented the BBC2 series How Buildings Learn",
      summary:
        "Six-part television adaptation he co-wrote and presented, with music by Brian Eno.",
      organization: "BBC Two",
      organizationHandle: "bbc-two",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "event-wed-book",
      kind: "publication",
      date: "2009",
      title: "Published Whole Earth Discipline",
      summary:
        "The 'ecopragmatist manifesto' embracing cities, nuclear power, transgenic crops, and geoengineering — a break with environmental orthodoxy.",
      sourceIds: [S.wedBook, S.guardianInterview, S.monbiotGuardian],
    },
    {
      id: "event-revive-restore",
      kind: "founded",
      date: "2012",
      title: "Co-founded Revive & Restore",
      summary:
        "With Ryan Phelan, inside Long Now: de-extinction and genetic rescue, beginning with the passenger pigeon; he took the case to the TED stage in 2013.",
      organization: "Revive & Restore / The Long Now Foundation",
      organizationHandle: "revive-restore-the-long-now-foundation",
      sourceIds: [S.sbBio, S.tedTalk, S.weAreAsGods],
    },
  ],
  themes: [
    {
      id: "theme-access-to-tools",
      kind: "philosophy",
      status: "stated",
      title: "Access to tools",
      summary:
        "The Whole Earth Catalog's premise and his life's throughline: give individuals the best available tools and trustworthy reviews of them, and capability follows — direct power rather than political petition.",
      sourceIds: [S.wholeEarthIndex, S.sbBio, S.nytMarkoff],
    },
    {
      id: "theme-counterculture-cyberculture",
      kind: "influence",
      status: "reported",
      title: "From counterculture to cyberculture",
      summary:
        "Historians credit his network with carrying communal, whole-systems values into personal computing and online community — from the Pranksters and the Catalog through the WELL and the Hackers Conference.",
      sourceIds: [S.nytMarkoff, S.sbBio, S.wikipedia],
    },
    {
      id: "theme-information-paradox",
      kind: "belief",
      status: "stated",
      title: "Information wants to be free — and expensive",
      summary:
        "His 1984 formulation names a permanent tension between information's value and its falling cost of distribution; the amputated half-quote became hacker scripture, the full version his actual position.",
      sourceIds: [S.fortune, S.wiredWell],
    },
    {
      id: "theme-ecopragmatism",
      kind: "philosophy",
      status: "stated",
      title: "Ecopragmatism",
      summary:
        "Whole Earth Discipline's argument: climate change obliges environmentalists to accept dense cities, nuclear power, GM crops, and possibly geoengineering — 'we are as gods and have to get good at it.'",
      sourceIds: [S.wedBook, S.guardianInterview, S.monbiotGuardian],
    },
    {
      id: "theme-long-now",
      kind: "belief",
      status: "stated",
      title: "The long now",
      summary:
        "Civilization's short attention span needs counterbalancing institutions that think in centuries and millennia — the Clock, the Library, Long Bets, and the seminars exist to make long-term responsibility automatic.",
      sourceIds: [S.sbBooks, S.longNowPeople, S.wikipedia],
    },
    {
      id: "theme-buildings-that-learn",
      kind: "method",
      status: "stated",
      title: "Buildings — and systems — that learn",
      summary:
        "How Buildings Learn treats buildings as evolving systems judged over decades, not at the 'magazine photo' of completion; its shearing-layers model migrated into software and organizational thinking.",
      sourceIds: [S.sbBio, S.sbBooks, S.wikipedia],
    },
    {
      id: "theme-maintenance",
      kind: "interest",
      status: "stated",
      title: "Maintenance as civilization",
      summary:
        "His current work extends the same lens: what keeps things going is undervalued next to what invents them; Maintenance: Of Everything argues upkeep is a radical act of responsibility.",
      sourceIds: [S.maintenanceBook],
    },
    {
      id: "theme-whole-earth-image",
      kind: "influence",
      status: "reported",
      title: "The whole-Earth photograph as myth",
      summary:
        "His 1966 button campaign treated a photograph as an instrument of planetary self-consciousness — myth-making as method, later echoed by the Clock's design as an icon for long-term thinking.",
      sourceIds: [S.sbBio, S.nytMarkoff, S.wikipedia],
    },
    {
      id: "theme-scenario-thinking",
      kind: "method",
      status: "reported",
      title: "Scenario planning and learning in complex systems",
      summary:
        "Through GBN and Shell's Group Planning he helped professionalize scenario thinking — rehearsing divergent futures to make institutions adaptive rather than predictive.",
      sourceIds: [S.sbBio, S.monbiotGuardian, S.longNowPeople],
    },
  ],
  works: [
    {
      id: "work-whole-earth-catalog",
      kind: "project",
      status: "completed",
      title: "Whole Earth Catalog",
      date: "1968",
      location: "Menlo Park, California",
      summary:
        "The 'access to tools' catalog he founded, edited, and published 1968–72; successor Whole Earth publications ran to 2002.",
      sourceIds: [S.sbBio, S.wholeEarthIndex, S.wikipedia],
    },
    {
      id: "work-last-whole-earth-catalog",
      kind: "book",
      status: "published",
      title: "The Last Whole Earth Catalog",
      date: "1971",
      summary:
        "The 1971 Random House edition that won the 1972 National Book Award for Contemporary Affairs.",
      sourceIds: [S.nbf, S.sbBio],
    },
    {
      id: "work-whole-earth-epilog",
      kind: "book",
      status: "published",
      title: "Whole Earth Epilog",
      date: "1974",
      summary:
        "The series' farewell volume; its back cover carried 'Stay hungry. Stay foolish.' — later quoted by Steve Jobs.",
      sourceIds: [S.jobsSpeech, S.wholeEarthIndex, S.sbBio],
    },
    {
      id: "work-two-cybernetic-frontiers",
      kind: "book",
      status: "published",
      title: "Two Cybernetic Frontiers",
      date: "1974",
      summary:
        "Gregory Bateson meets early computer science; per his bio, the first print use of 'personal computer' and first book on hackers.",
      sourceIds: [S.sbBio],
    },
    {
      id: "work-coevolution-quarterly",
      kind: "project",
      status: "completed",
      title: "CoEvolution Quarterly",
      date: "1974",
      summary:
        "Whole Earth's journal successor, founded and edited by Brand through 1985; later merged into Whole Earth Review.",
      sourceIds: [S.sbBio, S.wholeEarthIndex],
    },
    {
      id: "work-the-well",
      kind: "project",
      status: "ongoing",
      title: "The WELL",
      date: "1985",
      location: "Sausalito, California",
      summary:
        "The Whole Earth 'Lectronic Link, co-founded with Larry Brilliant; a seminal virtual community, member-owned since 2012.",
      sourceIds: [S.wiredWell, S.wikipedia],
    },
    {
      id: "work-media-lab-book",
      kind: "book",
      status: "published",
      title: "The Media Lab: Inventing the Future at MIT",
      date: "1987",
      summary: "Report from inside Nicholas Negroponte's lab, written during his visiting-scientist stint.",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "work-gbn",
      kind: "project",
      status: "completed",
      title: "Global Business Network",
      date: "1988",
      summary:
        "Scenario-planning consultancy co-founded with Schwartz, Ogilvy, Collyns, and Wilkinson; later absorbed into the Monitor Group.",
      sourceIds: [S.sbBio, S.longNowPeople],
    },
    {
      id: "work-how-buildings-learn",
      kind: "book",
      status: "published",
      title: "How Buildings Learn: What Happens After They're Built",
      date: "1994",
      summary:
        "The case for buildings as adaptive systems; a preservation and design touchstone.",
      sourceIds: [S.sbBio, S.sbBooks, S.wikipedia],
    },
    {
      id: "work-hbl-bbc-series",
      kind: "film",
      status: "released",
      title: "How Buildings Learn (BBC2 series)",
      date: "1997",
      summary:
        "Six-part television adaptation he co-wrote and presented, directed by James Runcie with music by Brian Eno.",
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "work-long-now-foundation",
      kind: "project",
      status: "ongoing",
      title: "The Long Now Foundation",
      date: "1996",
      location: "San Francisco, California",
      summary:
        "The 10,000-year institution he co-founded with Danny Hillis: the Clock, the Library, Long Bets, and the SALT seminar series he curates.",
      sourceIds: [S.longNowPeople, S.sbBio, S.wikipedia],
    },
    {
      id: "work-clock-of-the-long-now",
      kind: "book",
      status: "published",
      title: "The Clock of the Long Now: Time and Responsibility",
      date: "1999",
      summary: "Essays on making long-term thinking a cultural norm, tied to the 10,000-year Clock.",
      sourceIds: [S.sbBio, S.sbBooks],
    },
    {
      id: "work-whole-earth-discipline",
      kind: "book",
      status: "published",
      title: "Whole Earth Discipline: An Ecopragmatist Manifesto",
      date: "2009",
      summary:
        "His controversial turn: cities, nuclear power, transgenic crops, wildlands, and geoengineering as necessary environmental tools.",
      sourceIds: [S.wedBook, S.guardianInterview, S.monbiotGuardian],
    },
    {
      id: "work-revive-and-restore",
      kind: "project",
      status: "ongoing",
      title: "Revive & Restore",
      date: "2012",
      summary:
        "De-extinction and genetic-rescue project co-founded with Ryan Phelan within Long Now; flagship effort to revive the passenger pigeon.",
      sourceIds: [S.sbBio, S.tedTalk, S.weAreAsGods],
    },
    {
      id: "work-we-are-as-gods-film",
      kind: "film",
      status: "released",
      title: "We Are As Gods",
      date: "2021",
      summary:
        "Feature documentary about him by David Alvarado and Jason Sussberg — SXSW 2021 premiere, streaming from 2022; covers the Pranksters to de-extinction and the allies who think he went too far.",
      sourceIds: [S.weAreAsGods, S.nytMarkoff],
    },
    {
      id: "work-maintenance-part-one",
      kind: "book",
      status: "published",
      title: "Maintenance: Of Everything, Part One",
      date: "2026-01",
      summary:
        "First volume of his case that maintenance — keeping the made world working — is civilization's undervalued core.",
      sourceIds: [S.maintenanceBook],
    },
  ],
  appearances: [
    {
      id: "appearance-ted-de-extinction",
      title: "The dawn of de-extinction. Are you ready?",
      venue: "TED2013",
      publishedAt: "2013-03",
      participants: ["Stewart Brand"],
      summary:
        "His TED talk arguing that biotechnology can — and should — revive species humans drove extinct, starting with the passenger pigeon.",
      media: [
        {
          type: "video",
          url: "https://www.ted.com/talks/stewart_brand_the_dawn_of_de_extinction_are_you_ready",
          sourceId: S.tedTalk,
        },
      ],
      sourceIds: [S.tedTalk],
    },
    {
      id: "appearance-hbl-bbc",
      title: "How Buildings Learn (six-part series)",
      venue: "BBC Two",
      publishedAt: "1997-07",
      participants: ["Stewart Brand"],
      summary:
        "He co-wrote and presented the television adaptation of his book; episodes he posted remain freely viewable on YouTube.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=AvEqfg2sIH0",
        },
      ],
      sourceIds: [S.sbBio, S.wikipedia],
    },
    {
      id: "appearance-wired-well",
      title: "Proto Social Network 'The Well' Runneth Over",
      venue: "Wired",
      publishedAt: "2007-12",
      participants: ["Stewart Brand", "Larry Brilliant"],
      summary:
        "The two founders look back on The WELL's launch, its no-anonymity rule, and its design for accountable conversation.",
      media: [
        {
          type: "article",
          url: "https://www.wired.com/2007/12/st-15thewell/",
          sourceId: S.wiredWell,
        },
      ],
      sourceIds: [S.wiredWell],
    },
    {
      id: "appearance-fortune-information",
      title: "Information wants to be free … and expensive",
      venue: "Fortune",
      publishedAt: "2009-07-20",
      participants: ["Stewart Brand"],
      summary:
        "Interview revisiting the 1984 Hackers Conference exchange with Steve Wozniak and the phrase's afterlife.",
      media: [
        {
          type: "article",
          url: "https://fortune.com/2009/07/20/information-wants-to-be-free-and-expensive/",
          sourceId: S.fortune,
        },
      ],
      sourceIds: [S.fortune],
    },
    {
      id: "appearance-guardian-bright-idea",
      title: "Stewart Brand: My plan B for climate change",
      venue: "The Guardian",
      publishedAt: "2010-10-03",
      participants: ["Stewart Brand"],
      summary:
        "Q&A on Whole Earth Discipline: why the self-described lifelong environmentalist backs nuclear power, GM food, dense cities, and geoengineering.",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/environment/2010/oct/03/my-bright-idea-stewart-brand",
          sourceId: S.guardianInterview,
        },
      ],
      sourceIds: [S.guardianInterview],
    },
    {
      id: "appearance-channel4-green",
      title: "What the Green Movement Got Wrong",
      venue: "Channel 4",
      publishedAt: "2010-11",
      participants: ["Stewart Brand", "Mark Lynas"],
      summary:
        "Channel 4 polemic based on Whole Earth Discipline, presented with Mark Lynas; criticized by George Monbiot for factual claims about DDT and for ignoring political power.",
      sourceIds: [S.monbiotGuardian],
    },
    {
      id: "appearance-we-are-as-gods",
      title: "We Are As Gods",
      venue: "SXSW / streaming release",
      publishedAt: "2021",
      participants: ["Stewart Brand", "Ryan Phelan", "Brian Eno", "George Church"],
      summary:
        "Feature documentary on his life and de-extinction campaign, by David Alvarado and Jason Sussberg; premiered at SXSW 2021, released digitally in 2022.",
      media: [
        {
          type: "article",
          url: "https://www.weareasgods.film/",
          sourceId: S.weAreAsGods,
        },
      ],
      sourceIds: [S.weAreAsGods, S.nytMarkoff],
    },
  ],
  relations: [
    {
      id: "rel-the-long-now-foundation",
      kind: "founded",
      target: "the-long-now-foundation",
      targetName: "The Long Now Foundation",
      targetKind: "organization",
      note: "Co-founded the 10,000-year clock-and-library foundation with Danny Hillis in 1996; he serves as its president.",
      start: "1996",
      targetWikidataId: "Q568907",
      sourceIds: [S.longNowPeople, S.wikipedia, S.sbBio],
    },
  ],
  openQuestions: [
    "The WELL's founding year is 1984 in his own bio but 1985 in the organization's timeline and press accounts — likely incorporation versus public launch, unresolved here.",
    "Whether his 1966 'Why haven't we seen a photograph of the whole Earth yet?' campaign actually accelerated NASA's release of color Earth imagery is unverified; his bio itself calls the story 'legend.'",
    "The claim that Two Cybernetic Frontiers holds the first print use of 'personal computer' is self-reported; no independent etymology is in the cited record.",
    "Long Now's founding is dated 1995 in his bio and 1996 in the foundation's own record (incorporation); this index uses the foundation's date.",
    "His precise role in the 1968 Engelbart demo is described variously — 'helped design and participated' in his bio versus 'consultation, camera, assistant stage' in the production outline.",
    "The DDT and malaria passages disputed by Monbiot remain contested; the index records the critique without adjudicating the underlying science.",
  ],
  body: `Stewart Brand is an American writer, editor, and serial institution-builder whose fingerprints sit on an improbable chain of twentieth-century artifacts: the psychedelic Trips Festival, the Whole Earth Catalog, the first mass-audience demo of personal computing, one of the oldest online communities, the scenario-planning trade, and a foundation built to think in ten-thousand-year spans. Steve Jobs called his catalog "one of the bibles of my generation"; its farewell back cover — "Stay hungry. Stay foolish." — became, through Jobs's 2005 Stanford address, the most quoted four words he never quite wrote.

## Formation: biology, the Army, and the Acid Tests

Born December 14, 1938 in Rockford, Illinois, Brand attended Phillips Exeter Academy and graduated from Stanford in 1960 with a biology degree. Two years as an Army officer followed — Airborne qualification, infantry training instruction, photojournalism out of the Pentagon — then design study at the San Francisco Art Institute and participation in a legal LSD study at the International Foundation for Advanced Study in Menlo Park.

Through 1964–66 he ran with Ken Kesey's Merry Pranksters and the early Acid Tests, culminating in the January 1966 Trips Festival at Longshoreman's Hall, which he designed and organized — a three-day collision of light shows, rock, and electronics often described as the psychedelic scene's coming-out party. He received his "Acid Test Diploma" from Neal Cassady at that year's Acid Test Graduation, an episode folded into Tom Wolfe's The Electric Kool-Aid Acid Test.

## The Whole Earth Catalog

The same year, 1966, Brand produced his most consequential stunt: buttons reading "Why Haven't We Seen a Photograph of the Whole Earth Yet?", sold to pressure NASA into releasing a color image of the planet. When the images arrived, one became his catalog's cover and the environmental movement's emblem — though his own bio concedes the causal part is "legend."

The Whole Earth Catalog (1968–72) was a mail-order review of tools for self-sufficient living — books, equipment, techniques, ideas — aimed at commune builders and systems tinkerers, promising "access to tools." Its first line, "We are as gods and might as well get good at it," announced his lifelong premise: humanity already wields planet-scale power, so the task is competence, not innocence. The Last Whole Earth Catalog won the 1972 National Book Award for Contemporary Affairs and sold over 1.5 million copies; profits seeded the Point Foundation, then CoEvolution Quarterly (1974), the New Games Tournament (1973), and the Whole Earth Epilog (1974) — the final issue whose back cover Jobs would quote three decades later.

## Computers and communities

Brand was present at computing's creation myth twice over. In December 1968 he crewed Douglas Engelbart's "Mother of All Demos" — credited in the production outline for "consultation, camera, assistant stage" — when the mouse, hypertext, and video teleconferencing debuted. In 1972 his Rolling Stone report "Spacewar: Fanatic Life and Symbolic Death Among the Computer Bums" carried hacker culture to a national readership, and his 1974 book Two Cybernetic Frontiers — half Gregory Bateson interview, half computer-science report — claims, by his own account, the first print use of "personal computer."

After advising Governor Jerry Brown (1977–79) and editing the Whole Earth Software Catalog, he convened the first Hackers Conference in 1984 with Kevin Kelly and Ryan Phelan — where, answering Steve Wozniak, he uttered the era's most durable aphorism: information wants to be expensive because it is so valuable, and free because it is so cheap to distribute. The next year he and Larry Brilliant launched The WELL, the Whole Earth 'Lectronic Link, whose insistence on accountable identity — handles linked to real people — prefigured the social web.

## The long now

In 1986 Brand was a visiting scientist at MIT's Media Lab, producing The Media Lab: Inventing the Future at MIT (1987); scenario work for Royal Dutch/Shell led to co-founding Global Business Network in 1988 with Peter Schwartz, Jay Ogilvy, Napier Collyns, and Lawrence Wilkinson — futures thinking as a professional service for corporations and agencies. Trusteeship at the Santa Fe Institute and an EFF board seat filled out the institutional web.

The capstone came in 1996: with Danny Hillis he co-founded the Long Now Foundation to make long-term thinking "automatic and common" — the 10,000-year Clock, the Rosetta Project, Long Bets, and the monthly Seminars About Long-term Thinking he has curated since 2003. His book The Clock of the Long Now (1999) supplies the argument.

## Buildings, then the whole Earth

How Buildings Learn (1994) — adapted into a six-part BBC2 series he presented in 1997 — argues buildings are best understood over decades of adaptation, not at completion; its "shearing layers" crossed over into software architecture. Whole Earth Discipline (2009) applied the same unsentimental systems view to environmentalism itself: dense cities, nuclear power, transgenic crops, restored wildlands, and geoengineering as necessary tools. The turn cost him allies — George Monbiot accused the book and the Channel 4 film it spawned of false claims about DDT and of ignoring power — while Brand answered that he wants a movement "comfortable noticing when it's wrong," his own error list printed in the book.

## The latest chapter

With his wife Ryan Phelan he co-founded Revive & Restore in 2012 inside Long Now, pushing de-extinction — the passenger pigeon first — and taking the case to the TED stage in 2013. The documentary We Are As Gods premiered at SXSW in 2021; John Markoff's biography Whole Earth arrived in 2022. In January 2026 Stripe Press published Maintenance: Of Everything, Part One, extending the How Buildings Learn insight to everything made: keeping things going is civilization's undervalued core. He still lives aboard the Mirene, the sixty-four-foot tugboat he bought in Sausalito in 1982.

## What the record does not settle

The seams are calendrical and causal. His bio dates The WELL to 1984 and Long Now to 1995; the organizations' own records say 1985 and 1996. The whole-Earth photo campaign's effect on NASA is self-described "legend"; the "personal computer" priority is self-reported; his exact role at the 1968 demo varies between his account and the production outline. The DDT dispute in Whole Earth Discipline is recorded here as a live controversy, not a resolved one.

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
