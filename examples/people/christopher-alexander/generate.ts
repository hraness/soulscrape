#!/usr/bin/env bun
/** Generate examples/people/christopher-alexander/person-index.json with derived source ids. */

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

const plHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "PatternLanguage.com",
  url: "https://www.patternlanguage.com/",
  publisher: "PatternLanguage.com",
  notes:
    "The subject's site, founded in 2000; catalog of A Pattern Language and The Nature of Order.",
});
const plBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Christopher Alexander",
  url: "https://www.patternlanguage.com/bios/chris.htm",
  publisher: "PatternLanguage.com",
  notes: "The subject's own biography page; claims here are self-reported.",
});
const plAims = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Purpose and Aims — Center for Environmental Structure",
  url: "https://www.patternlanguage.com/aims/intro-2.html",
  publisher: "PatternLanguage.com",
  notes:
    "CES's own account of its philosophy, user participation, process and technical innovations, and honors list.",
});
const natureOfOrder = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Nature of Order",
  url: "http://www.natureoforder.com/",
  publisher: "natureoforder.com",
  notes: "Subject-controlled site for the four-volume Nature of Order series.",
});
const cityNotTree = source({
  binding: "first_person",
  mediaType: "article",
  title: "A City is Not a Tree",
  url: "https://www.patternlanguage.com/archive/cityisnotatree.html",
  publisher: "PatternLanguage.com (originally Architectural Forum)",
  publishedAt: "1965",
  authors: ["Christopher Alexander"],
  notes:
    "Full text of the two-part 1965 Architectural Forum essay, hosted on the subject's site.",
});
const oopslaVideo = source({
  binding: "first_person",
  mediaType: "video",
  title: "Christopher Alexander — Patterns in Architecture",
  url: "https://www.youtube.com/watch?v=98LdFA-_zfA",
  publisher: "Peter Petrash (YouTube)",
  authors: ["Christopher Alexander"],
  notes:
    "VHS transcode of the OOPSLA '96 keynote recording in San Jose, October 1996.",
});
const oopslaTranscript = source({
  binding: "first_person",
  mediaType: "transcript",
  title:
    "The Origins of Pattern Theory, the Future of the Theory, and the Generation of a Living World — Keynote Speech to the 1996 OOPSLA Convention",
  url: "https://www.patternlanguage.com/archive/ieee.html",
  publisher: "PatternLanguage.com",
  publishedAt: "1996",
  authors: ["Christopher Alexander"],
  transcriptOf: oopslaVideo.id,
  notes:
    "Transcript of the OOPSLA '96 keynote on the subject's site, with Jim Coplien's introduction; a revised text appeared in IEEE Software in 1999.",
});
const ieeeDoi = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "The origins of pattern theory: The future of the theory, and the generation of a living world",
  url: "https://doi.org/10.1109/52.795104",
  publisher: "IEEE Software",
  publishedAt: "1999",
  authors: ["Christopher Alexander"],
  notes: "Published version of the OOPSLA '96 keynote, IEEE Software 16(5): 71-82.",
});
const hillsideAbout = source({
  binding: "reference",
  mediaType: "webpage",
  title: "About Design Patterns",
  url: "https://hillside.net/patterns/about-patterns",
  publisher: "The Hillside Group",
  notes:
    "The patterns community's own account of its origin in Alexander's work: Beck & Cunningham 1987, the 1993 retreat, PLoP, and the Gang of Four.",
});
const cunninghamPdf = source({
  binding: "primary_record",
  mediaType: "pdf",
  title: "Wiki as pattern language",
  url: "https://hillside.net/plop/2013/papers/proceedings/papers/cunningham.pdf",
  publisher: "The Hillside Group",
  publishedAt: "2013",
  authors: ["Ward Cunningham", "Michael W. Mehaffy"],
  notes:
    "PLoP '13 paper by the inventor of wiki; documents that WikiWikiWeb was built to host the Portland Pattern Repository.",
});
const cesArchiveEishin = source({
  binding: "archive",
  mediaType: "webpage",
  title: "Eishin Campus – High School and College Complex",
  url: "https://christopher-alexander-ces-archive.org/project/the-campus-of-eishin-high-school-and-college/",
  publisher: "Christopher Alexander CES Archive",
  notes:
    "Official CES archive project record: staff, phases, costs, and the pattern-language design process.",
});
const cesArchiveInterview = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Prospects and Retrospects – An interview with Christopher Alexander on his new series of books, The Nature of Order",
  url: "https://christopher-alexander-ces-archive.org/article/prospects-and-retrospects-an-interview-with-christopheralexander-on-his-new-series-of-books-the-nature-of-order/",
  publisher: "Christopher Alexander CES Archive",
  publishedAt: "2004",
  authors: ["Davide Deriu", "Luis Diaz"],
  notes:
    "Interview conducted in London on November 6, 2003; published in City 8(1): 109-114 (Taylor & Francis).",
});
const katarxis = source({
  binding: "interview",
  mediaType: "article",
  title: "A Conversation with Christopher Alexander",
  url: "http://www.katarxis3.com/Alexander.htm",
  publisher: "Katarxis No. 3",
  publishedAt: "2004",
  authors: ["Michael W. Mehaffy"],
  notes:
    "Long-form interview on The Nature of Order, science, classicism, and New Urbanism.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Christopher Alexander (Q455076)",
  url: "https://www.wikidata.org/wiki/Q455076",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Christopher Alexander",
  url: "https://en.wikipedia.org/wiki/Christopher_Alexander",
  publisher: "Wikipedia",
  notes: "Community-edited reference; used for discovery alongside primary and obituary sources.",
});
const guardian = source({
  binding: "reporting",
  mediaType: "article",
  title: "Christopher Alexander obituary",
  url: "https://www.theguardian.com/artanddesign/2022/mar/29/christopher-alexander-obituary",
  publisher: "The Guardian",
  publishedAt: "2022-03-29",
  authors: ["Howard Davis"],
  notes: "Obituary by the architecture professor who knew him as teacher and colleague.",
});
const nyt = source({
  binding: "reporting",
  mediaType: "article",
  title: "Christopher Alexander, Architect Who Humanized Urban Design, Dies at 85",
  url: "https://www.nytimes.com/2022/03/29/arts/christopher-alexander-dead.html",
  publisher: "The New York Times",
  publishedAt: "2022-03-29",
  notes: "Paywalled obituary; reports cause of death per his wife, Margaret Moore.",
});
const ribaj = source({
  binding: "reporting",
  mediaType: "article",
  title: "Obituary: Christopher Alexander, 1936-2022",
  url: "https://www.ribaj.com/culture/christopher-alexander-obituary-1936-2022/",
  publisher: "RIBA Journal",
  publishedAt: "2022-04-05",
  authors: ["Malcolm Fraser"],
  notes:
    "Obituary by the architect who worked with Alexander in the mid-1980s as carpenter, model-maker, and draughtsman.",
});
const archpaper = source({
  binding: "reporting",
  mediaType: "article",
  title: "Architect and A Pattern Language author Christopher Alexander dies at 85",
  url: "https://www.archpaper.com/2022/03/christopher-alexander-dies-at-85/",
  publisher: "The Architect's Newspaper",
  publishedAt: "2022-03",
  notes: "Obituary with awards chronology and the software-influence record.",
});
const berkeleyMemo = source({
  binding: "reporting",
  mediaType: "article",
  title: "In Memoriam: Christopher Alexander",
  url: "https://ced.berkeley.edu/news/in-memoriam-christopher-alexander",
  publisher: "UC Berkeley College of Environmental Design",
  publishedAt: "2022-04-04",
  notes: "Memorial notice from the college where he taught for four decades.",
});

const S = {
  plHome: plHome.id,
  plBio: plBio.id,
  plAims: plAims.id,
  natureOfOrder: natureOfOrder.id,
  cityNotTree: cityNotTree.id,
  oopslaVideo: oopslaVideo.id,
  oopslaTranscript: oopslaTranscript.id,
  ieeeDoi: ieeeDoi.id,
  hillsideAbout: hillsideAbout.id,
  cunninghamPdf: cunninghamPdf.id,
  cesArchiveEishin: cesArchiveEishin.id,
  cesArchiveInterview: cesArchiveInterview.id,
  katarxis: katarxis.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  guardian: guardian.id,
  nyt: nyt.id,
  ribaj: ribaj.id,
  archpaper: archpaper.id,
  berkeleyMemo: berkeleyMemo.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-christopher-alexander",
  generatedAt: "2026-09-16T22:00:00Z",
  subject: {
    kind: "person",
    handle: "christopher-alexander",
    displayName: "Christopher Alexander",
    alsoKnownAs: [
      "Christopher Wolfgang Alexander",
      "Christopher Wolfgang John Alexander",
    ],
    summary:
      "Austrian-born British-American architect and design theorist (1936-2022), longtime UC Berkeley professor and founder of the Center for Environmental Structure, author of A Pattern Language and The Nature of Order, whose theory of living structure shaped architecture, urbanism, and software design.",
    identity: {
      wikidataId: "Q455076",
      officialSite: "https://www.patternlanguage.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Christopher_Alexander",
      profiles: [
        "https://ced.berkeley.edu/people/christopher-alexander",
        "https://christopher-alexander-ces-archive.org/biography/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T22:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    plHome,
    plBio,
    plAims,
    natureOfOrder,
    cityNotTree,
    oopslaVideo,
    oopslaTranscript,
    ieeeDoi,
    hillsideAbout,
    cunninghamPdf,
    cesArchiveEishin,
    cesArchiveInterview,
    katarxis,
    wikidata,
    wikipedia,
    guardian,
    nyt,
    ribaj,
    archpaper,
    berkeleyMemo,
  ],
  claims: [
    {
      id: "claim-born-vienna",
      kind: "fact",
      text: "Christopher Alexander was born on October 4, 1936, in Vienna, Austria, the son of classical archaeologists Lilly and Ferdinand Alexander; after the 1938 Anschluss the family moved to Britain, where he was raised and attended Oundle School.",
      sourceIds: [S.wikipedia, S.wikidata, S.guardian],
    },
    {
      id: "claim-cambridge-degrees",
      kind: "fact",
      text: "On his father's advice that architecture required a more rigorous grounding first, he took degrees in mathematics and architecture at Trinity College, Cambridge.",
      sourceIds: [S.guardian, S.plAims, S.wikipedia],
    },
    {
      id: "claim-harvard-first-phd",
      kind: "fact",
      text: "He moved to the United States in 1958 and at Harvard took the first PhD in architecture the university awarded; during those years he was a junior fellow of the Harvard Society of Fellows and worked at MIT.",
      sourceIds: [S.guardian, S.plBio, S.plAims, S.wikipedia, S.archpaper],
    },
    {
      id: "claim-berkeley-faculty",
      kind: "fact",
      text: "In 1963 he was appointed to the architecture faculty at the University of California, Berkeley, where he taught for some four decades before retiring as professor emeritus and moving back to West Sussex, England, in 2002.",
      sourceIds: [S.guardian, S.berkeleyMemo, S.plBio],
    },
    {
      id: "claim-ces-1967",
      kind: "fact",
      text: "He founded the nonprofit Center for Environmental Structure in 1967 and remained its president until his death; nearly all of his building and research ran through it.",
      sourceIds: [S.plAims, S.plBio, S.berkeleyMemo, S.cesArchiveEishin],
    },
    {
      id: "claim-two-hundred-buildings",
      kind: "fact",
      text: "His own organization and Berkeley report that he designed and personally built more than two hundred buildings on five continents, acting both as architect and as general contractor.",
      sourceIds: [S.plBio, S.wikipedia, S.berkeleyMemo],
    },
    {
      id: "claim-notes-synthesis",
      kind: "fact",
      text: "His first book, Notes on the Synthesis of Form (1964), grew from his Harvard dissertation, became a touchstone of the design-methods movement, and has been cited by computer scientists since the late 1960s.",
      sourceIds: [S.wikipedia, S.berkeleyMemo],
    },
    {
      id: "claim-city-not-tree-1965",
      kind: "fact",
      text: "His essay 'A City is Not a Tree' ran in two parts in Architectural Forum in April and May 1965, arguing that artificially planned cities are organized as trees while living cities form semilattices.",
      sourceIds: [S.cityNotTree, S.wikipedia, S.archpaper],
    },
    {
      id: "claim-apl-1977",
      kind: "fact",
      text: "A Pattern Language: Towns, Buildings, Construction (Oxford University Press, 1977), written with Sara Ishikawa and Murray Silverstein with Max Jacobson, Ingrid Fiksdahl-King, and Shlomo Angel, set out 253 linked patterns and remains one of the best-selling architecture books decades later.",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "claim-trilogy-intent",
      kind: "fact",
      text: "The book appeared alongside The Oregon Experiment (1975) and The Timeless Way of Building (1979) in a Center for Environmental Structure series whose stated aim was 'an entirely new approach to architecture, building and planning.'",
      sourceIds: [S.plHome, S.wikipedia],
    },
    {
      id: "claim-eishin",
      kind: "fact",
      text: "The Eishin campus in Iruma, Saitama prefecture — a high school and college complex of some thirty-five buildings — was designed around a project-specific pattern language developed through roughly 1,200 man-hours of interviews with teachers and students, and built in phases between 1985 and 1989; it won a Japan Institute of Architects best-building award in 1985.",
      sourceIds: [S.cesArchiveEishin, S.plAims, S.guardian, S.ribaj],
    },
    {
      id: "claim-julian-street",
      kind: "fact",
      text: "The Julian Street Inn, a shelter of roughly one hundred beds for homeless people in San Jose, was designed and built by Alexander's Center for Environmental Structure around 1989-90.",
      sourceIds: [S.guardian, S.wikipedia],
    },
    {
      id: "claim-west-dean",
      kind: "fact",
      text: "His English work included the visitors' centre at West Dean College in West Sussex, built 1994-96.",
      sourceIds: [S.guardian, S.ribaj],
    },
    {
      id: "claim-participatory-housing",
      kind: "fact",
      text: "His participatory housing work included a 1969 project in the barrios of Lima — where his team lived five weeks with resident families and derived a 67-pattern language — and a 1975-76 project in Mexico where families laid out and helped build their own houses with soil-cement blocks and lightweight concrete vaults.",
      sourceIds: [S.guardian, S.wikipedia],
    },
    {
      id: "claim-nature-of-order",
      kind: "fact",
      text: "The Nature of Order: An Essay on the Art of Building and the Nature of the Universe, a four-volume work developed over roughly three decades, was published by the Center for Environmental Structure between 2002 and 2005.",
      sourceIds: [S.natureOfOrder, S.wikipedia, S.cesArchiveInterview, S.katarxis],
    },
    {
      id: "claim-carpets",
      kind: "fact",
      text: "His collection and study of early Turkish carpets underpinned A Foreshadowing of 21st Century Art (1993) and, per the Guardian's obituary, contributed to The Nature of Order.",
      sourceIds: [S.wikipedia, S.guardian],
    },
    {
      id: "claim-awards",
      kind: "fact",
      text: "He was the first recipient of the American Institute of Architects' research medal; later honors included the Vincent Scully Prize (2009), the Congress for the New Urbanism's Athena Medal (2006, shared with Léon Krier), a Global Award for Sustainable Architecture (2014), and election to the American Academy of Arts and Sciences (1996).",
      sourceIds: [S.plAims, S.archpaper, S.wikipedia],
    },
    {
      id: "claim-software-lineage",
      kind: "fact",
      text: "His pattern work seeded the software design-patterns movement: Kent Beck and Ward Cunningham wrote a first small pattern language for user interfaces in 1987, a 1993 Colorado retreat formed the Hillside Group and its PLoP conferences, the 'Gang of Four' published Design Patterns in 1994, and in 1995 Cunningham built WikiWikiWeb — the first wiki — to host the Portland Pattern Repository.",
      sourceIds: [S.hillsideAbout, S.cunninghamPdf, S.wikipedia],
    },
    {
      id: "claim-oopsla-keynote",
      kind: "fact",
      text: "He delivered the keynote address 'The Origins of Pattern Theory' at the OOPSLA '96 conference in San Jose in October 1996; a revised text was published in IEEE Software in September 1999.",
      sourceIds: [S.oopslaTranscript, S.oopslaVideo, S.ieeeDoi],
    },
    {
      id: "claim-agile-simcity",
      kind: "fact",
      text: "The lineage continued into extreme programming and the agile movement — Beck and Cunningham were Agile Manifesto signatories — and SimCity creator Will Wright has credited Alexander's work as a direct inspiration.",
      sourceIds: [S.wikipedia, S.archpaper, S.cunninghamPdf],
    },
    {
      id: "claim-new-urbanism",
      kind: "fact",
      text: "He is counted among the largest influences on the New Urbanism movement, and obituaries linked his human-centered planning stance to Jane Jacobs and William H. Whyte.",
      sourceIds: [S.archpaper, S.nyt],
    },
    {
      id: "claim-death-2022",
      kind: "fact",
      text: "He died on March 17, 2022, at his home in West Sussex, England, aged 85; the New York Times reported pneumonia as the cause, per his wife Margaret Moore.",
      sourceIds: [S.nyt, S.guardian, S.berkeleyMemo],
    },
    {
      id: "claim-hypertext-book",
      kind: "fact",
      text: "His own site describes A Pattern Language as 'perhaps the first complete book ever written in hyperlink format' — a self-assessment that anticipates its networked influence on software.",
      sourceIds: [S.plBio, S.wikipedia],
    },
    {
      id: "claim-quality-without-name",
      kind: "stated_belief",
      text: "The aim of building, he held, is 'the quality without a name' — the alive, unselfconscious wholeness found in the best traditional places, which he insisted can be produced deliberately.",
      sourceIds: [S.guardian, S.plAims, S.katarxis],
    },
    {
      id: "claim-objective-beauty",
      kind: "stated_belief",
      text: "Beauty and life in buildings are objective, structural, and testable properties of the world — not matters of taste; he argued that for a given place and time there is effectively one correct answer.",
      sourceIds: [S.natureOfOrder, S.cesArchiveInterview, S.katarxis, S.ribaj],
    },
    {
      id: "claim-fifteen-properties",
      kind: "stated_belief",
      text: "Living structure, he argued, displays fifteen recurrent geometric properties — among them strong centers, levels of scale, boundaries, alternating repetition, positive space, local symmetries, deep interlock, gradients, roughness, echoes, the void, and not-separateness — which have largely vanished from modern building.",
      sourceIds: [S.natureOfOrder, S.cesArchiveInterview, S.wikipedia],
    },
    {
      id: "claim-generative-language",
      kind: "stated_belief",
      text: "A pattern language works like a genetic code: it generates the environment indirectly, so that locally knowledgeable people can adapt each part to its particularities themselves.",
      sourceIds: [S.oopslaTranscript, S.plHome, S.wikipedia],
    },
    {
      id: "claim-tree-critique",
      kind: "stated_belief",
      text: "'The city is not, cannot and must not be a tree': hierarchical planning that forbids overlapping units severs the strands of urban life that a semilattice structure preserves.",
      sourceIds: [S.cityNotTree],
    },
    {
      id: "claim-anti-modernism",
      kind: "stated_belief",
      text: "He held that most architecture since the Second World War is dehumanizing, image-driven, and lacking feeling, and looked to traditional and vernacular building for the principles modern work had lost — while insisting tradition be mined for order, not copied.",
      sourceIds: [S.nyt, S.hillsideAbout, S.guardian, S.katarxis],
    },
    {
      id: "claim-participation",
      kind: "stated_belief",
      text: "People have both the right and the necessary detailed knowledge to shape their own environments; good architecture, he argued, can only come from the wholehearted involvement of users in shaping their buildings and streets.",
      sourceIds: [S.plAims, S.plHome, S.guardian, S.nyt],
    },
    {
      id: "claim-moral-imperative",
      kind: "stated_belief",
      text: "Addressing software practitioners at OOPSLA '96, he framed patterns as carrying a moral imperative: to generate whole systems that contribute powerfully to the quality of human life.",
      sourceIds: [S.oopslaTranscript, S.ieeeDoi, S.hillsideAbout],
    },
    {
      id: "claim-mirror-of-self",
      kind: "stated_belief",
      text: "The test of life in a thing is the 'mirror of the self' — how deeply it reflects and touches human feeling; feeling, not ornament or image, is the criterion.",
      sourceIds: [S.natureOfOrder, S.katarxis, S.cesArchiveInterview],
    },
    {
      id: "claim-science-and-feeling",
      kind: "pattern",
      text: "Across four decades of interviews and lectures he consistently framed his project as joining scientific rigor to felt experience — the mathematician who made beauty an empirical question.",
      sourceIds: [S.katarxis, S.cesArchiveInterview, S.oopslaTranscript, S.guardian],
    },
    {
      id: "claim-against-the-profession",
      kind: "pattern",
      text: "He repeatedly positioned his work as a complete working alternative to the profession's assumptions and met sustained resistance; press accounts consistently describe him as visionary and controversial in equal measure.",
      sourceIds: [S.guardian, S.berkeleyMemo, S.ribaj, S.nyt],
    },
    {
      id: "claim-process-first",
      kind: "pattern",
      text: "In project after project the Center for Environmental Structure treated the building process itself — contracts, full-scale mock-ups, on-site layout, user authorship — as the real design problem, not merely the means.",
      sourceIds: [S.plAims, S.cesArchiveEishin, S.guardian],
    },
    {
      id: "claim-aia-medal-year",
      kind: "speculation",
      text: "Sources disagree on the year of his AIA research medal: his own biography page says 1970 while the CES aims page and press obituaries describe the inaugural award in 1972; the discrepancy is unresolved in the cited record.",
      sourceIds: [S.plBio, S.plAims, S.archpaper],
    },
    {
      id: "claim-building-count-source",
      kind: "speculation",
      text: "The 'more than two hundred buildings' figure originates with his own organization and is repeated by Berkeley; no independent, project-by-project enumeration exists in the cited record.",
      sourceIds: [S.plBio, S.wikipedia, S.berkeleyMemo],
    },
    {
      id: "claim-software-debt-depth",
      kind: "speculation",
      text: "How much of his intent survives in software design patterns is contested: his own OOPSLA '96 assessment, echoed by the patterns community, was that the field had both hit and missed the mark — adopting the form while largely leaving the generative and moral core behind.",
      sourceIds: [S.oopslaTranscript, S.hillsideAbout, S.cunninghamPdf],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1936-10-04",
      title: "Born in Vienna, Austria",
      summary:
        "Son of classical archaeologists Lilly and Ferdinand Alexander; the family moved to Britain in 1938 after the Anschluss.",
      location: "Vienna, Austria",
      sourceIds: [S.wikipedia, S.wikidata, S.guardian],
    },
    {
      id: "event-move-britain",
      kind: "other",
      date: "1938",
      title: "Family moved to Britain",
      summary:
        "Raised and educated in England, attending Oundle School.",
      location: "England",
      sourceIds: [S.guardian, S.wikipedia],
    },
    {
      id: "event-cambridge",
      kind: "education",
      date: "1954",
      end: "1958",
      title: "Trinity College, Cambridge",
      summary:
        "Degrees in mathematics and architecture — mathematics first, on his father's insistence on rigor.",
      organization: "Trinity College, Cambridge",
      organizationHandle: "trinity-college-cambridge",
      sourceIds: [S.guardian, S.plAims, S.wikipedia],
    },
    {
      id: "event-harvard-phd",
      kind: "education",
      date: "1958",
      end: "1963",
      title: "Moved to the US; first Harvard PhD in architecture",
      summary:
        "Took the first doctorate in architecture awarded by Harvard; junior fellow of the Society of Fellows and worked at MIT during this period.",
      organization: "Harvard University",
      location: "Cambridge, Massachusetts",
      organizationHandle: "harvard-university",
      sourceIds: [S.guardian, S.plBio, S.plAims, S.archpaper],
    },
    {
      id: "event-berkeley-faculty",
      kind: "role",
      date: "1963",
      title: "Appointed to the UC Berkeley architecture faculty",
      summary:
        "Taught at Berkeley for some four decades, retiring as professor emeritus.",
      organization: "University of California, Berkeley",
      organizationHandle: "university-of-california-berkeley",
      sourceIds: [S.guardian, S.berkeleyMemo, S.plBio],
    },
    {
      id: "event-notes-synthesis",
      kind: "publication",
      date: "1964",
      title: "Notes on the Synthesis of Form published",
      summary:
        "His dissertation book, a touchstone of the design-methods movement and an early citation in computer science.",
      sourceIds: [S.wikipedia, S.berkeleyMemo],
    },
    {
      id: "event-city-not-tree",
      kind: "publication",
      date: "1965",
      title: "'A City is Not a Tree' in Architectural Forum",
      summary:
        "The two-part essay contrasting tree and semilattice structures in cities.",
      sourceIds: [S.cityNotTree, S.wikipedia],
    },
    {
      id: "event-ces-founded",
      kind: "founded",
      date: "1967",
      title: "Founded the Center for Environmental Structure",
      summary:
        "The nonprofit through which his building, research, and process innovations ran; he remained president until his death.",
      organization: "Center for Environmental Structure",
      location: "Berkeley, California",
      organizationHandle: "center-for-environmental-structure",
      sourceIds: [S.plAims, S.cesArchiveEishin, S.berkeleyMemo],
    },
    {
      id: "event-pattern-language",
      kind: "publication",
      date: "1977",
      title: "A Pattern Language published by Oxford University Press",
      summary:
        "253 linked patterns with Ishikawa, Silverstein, and colleagues; part of the CES series with The Oregon Experiment (1975) and The Timeless Way of Building (1979).",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "event-eishin",
      kind: "project",
      date: "1982",
      end: "1989",
      title: "Eishin campus designed and built in Japan",
      summary:
        "High school and college complex in Iruma, Saitama, designed from a participatory pattern language; built in phases 1985-89 and awarded a Japan Institute of Architects best-building prize in 1985.",
      organization: "Center for Environmental Structure",
      location: "Iruma, Saitama, Japan",
      organizationHandle: "center-for-environmental-structure",
      sourceIds: [S.cesArchiveEishin, S.guardian, S.plAims],
    },
    {
      id: "event-oopsla",
      kind: "media",
      date: "1996-10",
      title: "Keynote at OOPSLA '96",
      summary:
        "Addressed the object-oriented programming community in San Jose on the origins and future of pattern theory; published in IEEE Software in 1999.",
      location: "San Jose, California",
      sourceIds: [S.oopslaTranscript, S.oopslaVideo, S.ieeeDoi],
    },
    {
      id: "event-nature-of-order",
      kind: "publication",
      date: "2002",
      end: "2005",
      title: "The Nature of Order published in four volumes",
      summary:
        "The Phenomenon of Life, The Process of Creating Life, A Vision of a Living World, and The Luminous Ground — his summation of living structure.",
      sourceIds: [S.natureOfOrder, S.wikipedia, S.cesArchiveInterview],
    },
    {
      id: "event-scully-prize",
      kind: "award",
      date: "2009",
      title: "Vincent Scully Prize",
      summary:
        "Awarded by the National Building Museum for exemplary practice, scholarship, and criticism in architecture and urban design.",
      organization: "National Building Museum",
      organizationHandle: "national-building-museum",
      sourceIds: [S.archpaper, S.wikipedia],
    },
    {
      id: "event-death",
      kind: "other",
      date: "2022-03-17",
      title: "Died at home in West Sussex",
      summary:
        "Died peacefully at home in Binsted, West Sussex, aged 85; the New York Times reported pneumonia, per his wife Margaret Moore.",
      location: "Binsted, West Sussex, England",
      sourceIds: [S.nyt, S.guardian, S.berkeleyMemo],
    },
  ],
  themes: [
    {
      id: "theme-quality-without-name",
      kind: "philosophy",
      status: "stated",
      title: "The quality without a name",
      summary:
        "His lifelong aim: buildings and towns that are 'alive' in the way traditional places are — at peace with themselves and their people. The Timeless Way of Building names this the quality without a name; everything else in the work is method for reaching it.",
      sourceIds: [S.guardian, S.plAims, S.katarxis],
    },
    {
      id: "theme-objective-wholeness",
      kind: "philosophy",
      status: "stated",
      title: "Wholeness as objective structure",
      summary:
        "The Nature of Order argues wholeness or 'life' is a real, gradable property of space-matter, marked by fifteen geometric properties and measured by how deeply a thing mirrors the human self — a direct challenge to the professional consensus that beauty is subjective.",
      sourceIds: [S.natureOfOrder, S.cesArchiveInterview, S.guardian, S.katarxis],
    },
    {
      id: "theme-generative-languages",
      kind: "method",
      status: "stated",
      title: "Pattern languages as generative grammars",
      summary:
        "Patterns name recurrent problems and the configurations that resolve them; linked in a language with ordering 'sequences,' they work like a genetic code that lets many local actors generate a coherent whole — the mechanism meant to scale beyond any single designer.",
      sourceIds: [S.oopslaTranscript, S.plHome, S.hillsideAbout, S.wikipedia],
    },
    {
      id: "theme-city-not-tree",
      kind: "philosophy",
      status: "stated",
      title: "Semilattice, not tree",
      summary:
        "The 1965 essay's enduring argument: living cities are semilattices of overlapping systems, while planned cities are trees; designing in trees amputates the overlap on which urban life depends.",
      sourceIds: [S.cityNotTree, S.wikipedia],
    },
    {
      id: "theme-participation",
      kind: "practice",
      status: "stated",
      title: "User participation in building",
      summary:
        "People have the right — and the detailed local knowledge — to shape their own environments. CES practice embodied it: families laying out houses in Mexico, teachers and students authoring Eishin's pattern language, residents shaping a San Jose shelter.",
      sourceIds: [S.plAims, S.plHome, S.guardian, S.nyt],
    },
    {
      id: "theme-against-modernism",
      kind: "belief",
      status: "stated",
      title: "Against the modernist consensus",
      summary:
        "A fierce critic of postwar architecture as dehumanizing and image-bound, he nonetheless mined tradition for principle rather than style — and framed his last book as a battle between two world-systems of building.",
      sourceIds: [S.nyt, S.hillsideAbout, S.guardian, S.katarxis],
    },
    {
      id: "theme-software-legacy",
      kind: "influence",
      status: "reported",
      title: "The father of software patterns",
      summary:
        "Beck and Cunningham's 1987 pattern language, the Hillside Group and PLoP conferences, the Gang of Four's Design Patterns, the first wiki built for the Portland Pattern Repository, and the agile lineage all trace to his work — a documented fact the patterns community itself records.",
      sourceIds: [S.hillsideAbout, S.cunninghamPdf, S.wikipedia, S.ieeeDoi],
    },
    {
      id: "theme-process-innovation",
      kind: "method",
      status: "reported",
      title: "Process over product",
      summary:
        "CES treated contracts, construction management, mock-ups, wall systems, and money flows as design material: fixed-fee nonprofit construction, new contract forms, invented masonry and vault systems — process innovation as the precondition for living structure.",
      sourceIds: [S.plAims, S.cesArchiveEishin, S.guardian],
    },
    {
      id: "theme-sacred-beauty",
      kind: "belief",
      status: "stated",
      title: "Feeling, geometry, and the luminous ground",
      summary:
        "Late work pressed toward a near-mystical materialism: geometry that touches the self, informed by his study of early Turkish carpets, culminating in The Luminous Ground's claim that living structure connects matter to the 'I' of the world.",
      sourceIds: [S.katarxis, S.natureOfOrder, S.guardian],
    },
  ],
  works: [
    {
      id: "work-notes-synthesis",
      kind: "book",
      status: "published",
      title: "Notes on the Synthesis of Form",
      date: "1964",
      summary:
        "His Harvard dissertation book on the disciplined matching of form to context; a foundation of the design-methods movement and an early influence on computer science.",
      sourceIds: [S.wikipedia, S.berkeleyMemo],
    },
    {
      id: "work-city-not-tree",
      kind: "paper",
      status: "published",
      title: "A City is Not a Tree",
      date: "1965",
      summary:
        "Two-part Architectural Forum essay on tree and semilattice structures in cities; later reprinted widely and issued as a 50th-anniversary volume.",
      sourceIds: [S.cityNotTree, S.wikipedia, S.archpaper],
    },
    {
      id: "work-oregon-experiment",
      kind: "book",
      status: "published",
      title: "The Oregon Experiment",
      date: "1975",
      summary:
        "Documents the participatory master-planning experiment at the University of Oregon; third volume of the CES series for Oxford University Press.",
      sourceIds: [S.wikipedia, S.plHome],
    },
    {
      id: "work-mexicali-housing",
      kind: "project",
      status: "completed",
      title: "Mexicali experimental housing",
      date: "1976",
      location: "Mexicali, Mexico",
      summary:
        "Five families laid out and helped build their own houses using soil-cement blocks and lightweight concrete vaults; documented in The Production of Houses (1985).",
      sourceIds: [S.guardian, S.wikipedia],
    },
    {
      id: "work-pattern-language",
      kind: "book",
      status: "published",
      title: "A Pattern Language: Towns, Buildings, Construction",
      date: "1977",
      summary:
        "The 253-pattern manual, with Sara Ishikawa, Murray Silverstein, Max Jacobson, Ingrid Fiksdahl-King, and Shlomo Angel; a perennial bestseller and the seed of the software patterns movement.",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "work-timeless-way",
      kind: "book",
      status: "published",
      title: "The Timeless Way of Building",
      date: "1979",
      summary:
        "The philosophical companion to A Pattern Language: the 'quality without a name' and the idea of pattern languages as shared ways of making.",
      sourceIds: [S.wikipedia, S.hillsideAbout, S.guardian],
    },
    {
      id: "work-linz-cafe",
      kind: "building",
      status: "completed",
      title: "Linz Café",
      date: "1981",
      location: "Linz, Austria",
      summary:
        "Café built for the Forum Design exhibition, an early built demonstration of his process; documented in The Linz Cafe (1981).",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-eishin",
      kind: "building",
      status: "completed",
      title: "Eishin Campus",
      date: "1989",
      location: "Iruma, Saitama, Japan",
      summary:
        "High school and college complex of some thirty-five buildings with colonnaded streets, gates, gardens, and a lake; designed from a project-specific 110-pattern language and built in phases 1985-89. Awarded a Japan Institute of Architects prize in 1985.",
      sourceIds: [S.cesArchiveEishin, S.guardian, S.ribaj, S.plAims],
    },
    {
      id: "work-julian-street",
      kind: "building",
      status: "completed",
      title: "Julian Street Inn",
      date: "1990",
      location: "San Jose, California",
      summary:
        "Shelter of roughly one hundred beds for homeless people, designed and built by CES with hand-painted tile and cast concrete construction.",
      sourceIds: [S.guardian, S.wikipedia],
    },
    {
      id: "work-west-dean",
      kind: "building",
      status: "completed",
      title: "West Dean Visitors' Centre",
      date: "1996",
      location: "West Dean, West Sussex, England",
      summary:
        "Visitors' centre at West Dean College, built 1994-96 with local flint, concrete, and brick construction innovations.",
      sourceIds: [S.guardian, S.ribaj],
    },
    {
      id: "work-new-theory-urban-design",
      kind: "book",
      status: "published",
      title: "A New Theory of Urban Design",
      date: "1987",
      summary:
        "A generative rule system for urban growth, tested in student simulation projects and published by Oxford University Press.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-foreshadowing",
      kind: "book",
      status: "published",
      title: "A Foreshadowing of 21st Century Art",
      date: "1993",
      summary:
        "Study of the color and geometry of very early Turkish carpets, drawn from his own collection; the bridge between his building theory and his aesthetics of feeling.",
      sourceIds: [S.wikipedia, S.guardian],
    },
    {
      id: "work-nature-of-order",
      kind: "book",
      status: "published",
      title: "The Nature of Order (four volumes)",
      date: "2002",
      summary:
        "His magnum opus on living structure: The Phenomenon of Life, The Process of Creating Life, A Vision of a Living World, and The Luminous Ground, published 2002-2005 by the Center for Environmental Structure.",
      sourceIds: [S.natureOfOrder, S.wikipedia, S.cesArchiveInterview],
    },
    {
      id: "work-battle",
      kind: "book",
      status: "published",
      title: "The Battle for the Life and Beauty of the Earth",
      date: "2012",
      summary:
        "With Hans-Joachim Neis and Maggie Moore Alexander: the account of the Eishin project as a struggle between two world-systems of building.",
      sourceIds: [S.wikipedia, S.cesArchiveEishin],
    },
  ],
  appearances: [
    {
      id: "appearance-oopsla-96",
      title: "The Origins of Pattern Theory — OOPSLA '96 keynote",
      venue: "ACM OOPSLA '96, San Jose, California",
      publishedAt: "1996-10",
      participants: ["Christopher Alexander", "Jim Coplien"],
      summary:
        "Keynote to the object-oriented programming community on where pattern theory came from and where it must go — the generativity problem and the generation of a living world. Published in IEEE Software in September 1999.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=98LdFA-_zfA",
          sourceId: S.oopslaVideo,
        },
        {
          type: "transcript",
          url: "https://www.patternlanguage.com/archive/ieee.html",
          sourceId: S.oopslaTranscript,
        },
        {
          type: "article",
          url: "https://doi.org/10.1109/52.795104",
          sourceId: S.ieeeDoi,
        },
      ],
      sourceIds: [S.oopslaTranscript, S.oopslaVideo, S.ieeeDoi],
    },
    {
      id: "appearance-katarxis",
      title: "A Conversation with Christopher Alexander",
      venue: "Katarxis No. 3: New Science, New Urbanism — New Architecture?",
      publishedAt: "2004",
      participants: ["Christopher Alexander", "Michael W. Mehaffy"],
      summary:
        "Long-form interview on The Nature of Order, the new geometry in science, and his advice to classicists and New Urbanists.",
      media: [
        {
          type: "article",
          url: "http://www.katarxis3.com/Alexander.htm",
          sourceId: S.katarxis,
        },
      ],
      sourceIds: [S.katarxis],
    },
    {
      id: "appearance-prospects-retrospects",
      title: "Prospects and Retrospects",
      venue: "Interview in London for the journal City",
      publishedAt: "2004",
      participants: ["Christopher Alexander", "Davide Deriu", "Luis Diaz"],
      summary:
        "November 6, 2003 interview on the four-volume Nature of Order; published in City 8(1): 109-114 (Taylor & Francis).",
      media: [
        {
          type: "article",
          url: "https://christopher-alexander-ces-archive.org/article/prospects-and-retrospects-an-interview-with-christopheralexander-on-his-new-series-of-books-the-nature-of-order/",
          sourceId: S.cesArchiveInterview,
        },
      ],
      sourceIds: [S.cesArchiveInterview],
    },
    {
      id: "appearance-kahn-lecture",
      title: "Louis Kahn Memorial Lecture",
      venue: "Philadelphia",
      publishedAt: "1992",
      participants: ["Christopher Alexander"],
      summary:
        "Memorial lecture listed among his honors on the Center for Environmental Structure's own record.",
      sourceIds: [S.plAims],
    },
    {
      id: "appearance-scully-prize",
      title: "Vincent Scully Prize",
      venue: "National Building Museum, Washington, DC",
      publishedAt: "2009",
      participants: ["Christopher Alexander"],
      summary:
        "The museum's prize for exemplary practice, scholarship, and criticism in architecture, landscape architecture, and urban design.",
      sourceIds: [S.archpaper],
    },
  ],
  relations: [
    {
      id: "rel-center-for-environmental-structure",
      kind: "founded",
      target: "center-for-environmental-structure",
      targetName: "Center for Environmental Structure",
      targetKind: "organization",
      note:
        "Founded the nonprofit in 1967 and remained its president until his death; nearly all of his building and research ran through it.",
      start: "1967",
      end: "2022",
      sourceIds: [S.plAims, S.plBio, S.berkeleyMemo, S.cesArchiveEishin],
    },
    {
      id: "rel-uc-berkeley",
      kind: "employed_by",
      target: "uc-berkeley",
      targetName: "University of California, Berkeley",
      targetKind: "organization",
      note:
        "Appointed to the architecture faculty in 1963 and taught for some four decades, retiring as professor emeritus in 2002.",
      start: "1963",
      end: "2002",
      targetWikidataId: "Q168756",
      sourceIds: [S.guardian, S.berkeleyMemo, S.plBio],
    },
    {
      id: "rel-mit",
      kind: "employed_by",
      target: "mit",
      targetName: "MIT",
      targetKind: "organization",
      note: "Worked at MIT during his Harvard years in the early 1960s.",
      targetWikidataId: "Q49108",
      sourceIds: [S.guardian, S.plBio, S.wikipedia, S.archpaper],
    },
    {
      id: "rel-sara-ishikawa",
      kind: "collaborated",
      target: "sara-ishikawa",
      targetName: "Sara Ishikawa",
      note: "Co-author of A Pattern Language (1977).",
      targetWikidataId: "Q28654121",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "rel-murray-silverstein",
      kind: "collaborated",
      target: "murray-silverstein",
      targetName: "Murray Silverstein",
      note: "Co-author of A Pattern Language (1977).",
      targetWikidataId: "Q6939455",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "rel-max-jacobson",
      kind: "collaborated",
      target: "max-jacobson",
      targetName: "Max Jacobson",
      note: "Co-author of A Pattern Language (1977).",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "rel-ingrid-fiksdahl-king",
      kind: "collaborated",
      target: "ingrid-fiksdahl-king",
      targetName: "Ingrid Fiksdahl-King",
      note: "Co-author of A Pattern Language (1977).",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "rel-shlomo-angel",
      kind: "collaborated",
      target: "shlomo-angel",
      targetName: "Shlomo Angel",
      note: "Co-author of A Pattern Language (1977).",
      targetWikidataId: "Q28654129",
      sourceIds: [S.plHome, S.wikipedia, S.guardian],
    },
    {
      id: "rel-hans-joachim-neis",
      kind: "collaborated",
      target: "hans-joachim-neis",
      targetName: "Hans-Joachim Neis",
      note:
        "Co-author with him and Maggie Moore Alexander of The Battle for the Life and Beauty of the Earth (2012), the account of the Eishin project.",
      sourceIds: [S.wikipedia, S.cesArchiveEishin],
    },
    {
      id: "rel-maggie-moore-alexander",
      kind: "family",
      target: "maggie-moore-alexander",
      targetName: "Maggie Moore Alexander",
      note:
        "His wife — reported as Margaret Moore in the New York Times obituary — and his co-author on The Battle for the Life and Beauty of the Earth.",
      sourceIds: [S.nyt, S.wikipedia, S.cesArchiveEishin],
    },
    {
      id: "rel-ward-cunningham",
      kind: "influenced",
      target: "ward-cunningham",
      targetName: "Ward Cunningham",
      note:
        "With Kent Beck, wrote the first small pattern language for user interfaces in 1987; built WikiWikiWeb — the first wiki — in 1995 to host the Portland Pattern Repository.",
      targetWikidataId: "Q7637",
      sourceIds: [S.hillsideAbout, S.cunninghamPdf, S.wikipedia],
    },
    {
      id: "rel-kent-beck",
      kind: "influenced",
      target: "kent-beck",
      targetName: "Kent Beck",
      note:
        "With Ward Cunningham, wrote the first small software pattern language in 1987; later an Agile Manifesto signatory — a lineage the patterns community traces to Alexander's work.",
      targetWikidataId: "Q92738",
      sourceIds: [S.hillsideAbout, S.cunninghamPdf, S.wikipedia],
    },
    {
      id: "rel-gang-of-four",
      kind: "influenced",
      target: "gang-of-four",
      targetName: "Gang of Four (Design Patterns)",
      targetKind: "organization",
      note:
        "Their 1994 Design Patterns made the pattern form canonical in software; the patterns community records the lineage as originating in his work.",
      sourceIds: [S.hillsideAbout, S.cunninghamPdf],
    },
    {
      id: "rel-hillside-group",
      kind: "influenced",
      target: "hillside-group",
      targetName: "The Hillside Group",
      targetKind: "organization",
      note:
        "The patterns community formed at a 1993 Colorado retreat around his work and runs the PLoP conferences.",
      sourceIds: [S.hillsideAbout],
    },
    {
      id: "rel-will-wright",
      kind: "influenced",
      target: "will-wright",
      targetName: "Will Wright",
      note:
        "The SimCity creator has credited Alexander's work as a direct inspiration.",
      targetWikidataId: "Q309493",
      sourceIds: [S.wikipedia, S.archpaper, S.cunninghamPdf],
    },
    {
      id: "rel-leon-krier",
      kind: "other",
      target: "leon-krier",
      targetName: "Léon Krier",
      note:
        "Shared the Congress for the New Urbanism's Athena Medal with him in 2006.",
      targetWikidataId: "Q970000",
      sourceIds: [S.plAims, S.archpaper, S.wikipedia],
    },
    {
      id: "rel-michael-w-mehaffy",
      kind: "interviewed_by",
      target: "michael-w-mehaffy",
      targetName: "Michael W. Mehaffy",
      note:
        "Katarxis No. 3, 'A Conversation with Christopher Alexander,' 2004 — on The Nature of Order, science, and New Urbanism.",
      sourceIds: [S.katarxis],
    },
    {
      id: "rel-davide-deriu",
      kind: "interviewed_by",
      target: "davide-deriu",
      targetName: "Davide Deriu",
      note:
        "With Luis Diaz, the November 2003 London interview 'Prospects and Retrospects,' published in City 8(1).",
      sourceIds: [S.cesArchiveInterview],
    },
    {
      id: "rel-luis-diaz",
      kind: "interviewed_by",
      target: "luis-diaz",
      targetName: "Luis Diaz",
      note:
        "With Davide Deriu, the November 2003 London interview 'Prospects and Retrospects,' published in City 8(1).",
      sourceIds: [S.cesArchiveInterview],
    },
  ],
  openQuestions: [
    "Sources disagree on the year of his AIA research gold medal: his own biography page says 1970, while the CES aims page and press obituaries give 1972 for the inaugural award.",
    "His birth name is recorded differently across sources — 'Christopher Wolfgang John Alexander' in Wikipedia versus 'Wolfgang Christian Johann Alexander' in the Guardian obituary; which form is the civil record is unsettled here.",
    "The 'more than two hundred buildings' figure comes from his own organization and Berkeley; no independent, project-by-project enumeration exists in the cited record.",
    "How much of his intent survives in software design patterns remains contested — his own OOPSLA '96 assessment was that the community had both hit and missed the mark.",
    "Publication years for The Nature of Order volumes vary across sources (the Guardian gives 2002-04; other records place later volumes in 2004-05), and The Architect's Newspaper dates PatternLanguage.com's founding to 2020 where his own bio says 2000.",
  ],
  body: `Christopher Alexander (1936-2022) was an Austrian-born architect and design theorist who spent his career arguing that beauty in buildings is not a matter of taste but an objective, measurable property of the world — and that ordinary people, not just trained architects, can and must produce it. From a four-decade professorship at UC Berkeley and the nonprofit Center for Environmental Structure he founded in 1967, he designed and built hundreds of buildings while writing the books — A Pattern Language, The Timeless Way of Building, The Nature of Order — that made him arguably more influential outside architecture than within it.

## From Vienna to Berkeley

Born October 4, 1936 in Vienna to two classical archaeologists — a Jewish mother and a Catholic father — he left with his family for Britain in 1938 after the Anschluss and grew up in England, attending Oundle School. His father insisted that before studying architecture he first master something more rigorous, so at Trinity College, Cambridge he took degrees in mathematics and then architecture. In 1958 he went to Harvard, where he took the first PhD in architecture the university awarded, working meanwhile as a junior fellow of the Society of Fellows and at MIT. In 1963 he joined the architecture faculty at Berkeley, and in 1967 he founded the Center for Environmental Structure, remaining its president until his death.

## From synthesis to patterns

His first book, Notes on the Synthesis of Form (1964), grew from the dissertation and treated design as the disciplined matching of form to context — a rationalist manifesto that made him a hero of the design-methods movement and a citation in computer science within years. But he soon turned against the hierarchies his own method implied. "A City is Not a Tree" (1965) argued that planned cities are organized as trees — nested, non-overlapping units — while living cities are semilattices whose systems overlap and interlock. "The city is a receptacle for life," he wrote; make it a tree and it "will cut our life within to pieces."

The turn produced his most famous work. Through the later 1960s and 1970s, Alexander and colleagues at CES — Sara Ishikawa, Murray Silverstein, Max Jacobson, Ingrid Fiksdahl-King, Shlomo Angel — distilled recurring solutions to recurring design problems into "patterns," each naming a problem, its forces, and a spatial configuration that resolves them. A Pattern Language (1977) collected 253 of them, from "Independent Regions" down to "Things from Your Life," structured explicitly as a generative grammar: a language ordinary people could use to design their own houses, streets, and towns. With The Oregon Experiment (1975) and The Timeless Way of Building (1979) it proposed, in the authors' words, to replace existing ideas about architecture entirely. The method underwrote participatory projects from a Lima housing scheme in 1969 — his team lived five weeks with resident families to derive a 67-pattern language — to the self-built housing at Mexicali in 1975-76.

## Building the theory

Alexander was unusual among theorists in insisting on building — more than two hundred buildings on five continents by his organization's count, often with CES acting as contractor, and always through invented processes: full-scale mock-ups, on-site layout, new contracts and wall systems. The largest demonstration was the Eishin campus in Iruma, Japan: a high school and college of some thirty-five buildings designed from a project-specific pattern language developed through roughly 1,200 man-hours of interviews with teachers and students, built in phases 1985-89, and awarded a Japan Institute of Architects prize. Other built work — the Linz Café in Austria, the Julian Street Inn homeless shelter in San Jose, the West Dean visitors' centre in Sussex — pursued what The Timeless Way of Building called "the quality without a name": the alive, unselfconscious wholeness of traditional places, achievable, he insisted, deliberately.

## The Nature of Order

That quality received its full metaphysics in The Nature of Order, four volumes published between 2002 and 2005 after decades of circulating drafts. Its claim: wholeness or "life" is an objective structural property of space, present in degrees, identifiable through fifteen geometric properties — strong centers, levels of scale, boundaries, alternating repetition, positive space, local symmetries, deep interlock and ambiguity, and the rest — and produced only through structure-preserving, unfolding processes. The criterion is personal: the "mirror of the self" test asks how deeply a thing touches human feeling. The fourth volume, The Luminous Ground, draws the argument toward the spiritual, informed partly by his lifelong study of early Turkish carpets (A Foreshadowing of 21st Century Art, 1993). Admirers took the ambition as a complete working alternative to the profession's ideas; critics found it untestable. Alexander courted the fight — his last book was titled, without euphemism, The Battle for the Life and Beauty of the Earth (2012), an account of the Eishin struggle.

## The software lineage

His strangest legacy is digital. Software developers adopted the pattern form wholesale: Kent Beck and Ward Cunningham wrote a first small pattern language for user interfaces in 1987; a 1993 Colorado retreat formed the Hillside Group and its PLoP conference series; the "Gang of Four" Design Patterns book of 1994 made patterns canonical; and in 1995 Cunningham built WikiWikiWeb — the first wiki — to host the Portland Pattern Repository. The lineage runs on through extreme programming and the Agile Manifesto, which Beck and Cunningham both signed. Alexander keynoted OOPSLA '96 in San Jose — a talk later published in IEEE Software — and gently charged the audience that they had taken the form but not the point: patterns matter because they generate living wholes in the service of human life. Will Wright has credited him as a direct inspiration for SimCity; the New Urbanists claim him too — the CNU gave him one of its first Athena Medals in 2006.

## What the record does not settle

The seams are real. His own pages disagree on the year of his AIA research medal (1970 versus 1972); sources variously record his birth name; the two-hundred-buildings figure is his organization's; and the depth of the software debt — form adopted, metaphysics largely left behind — remains interpretive rather than settled. This index preserves those disagreements rather than smoothing them.

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
