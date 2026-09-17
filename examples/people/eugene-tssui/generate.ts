#!/usr/bin/env bun
/** Generate examples/people/eugene-tssui/person-index.json with derived source ids. */

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

const tssui = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About Eugene Tssui",
  url: "https://eugenetssui.com/about",
  publisher: "eugenetssui.com",
  notes: "The subject's own biography page; claims here are self-reported.",
});
const tssuiHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Tssui Design & Research — Eugene Tssui",
  url: "https://eugenetssui.com/",
  publisher: "eugenetssui.com",
});
const telosBooks = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Books — The Telos Foundation",
  url: "https://www.thetelosfoundation.com/books",
  publisher: "The Telos Foundation",
  notes: "The subject's foundation; lists his published books.",
});
const telosExhibition = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Eugene Tssui Exhibition — The Telos Foundation",
  url: "https://www.thetelosfoundation.com/event-details/eugene-tssui-exhibition",
  publisher: "The Telos Foundation",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Eugene Tsui (Q5407800)",
  url: "https://www.wikidata.org/wiki/Q5407800",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Eugene Tssui",
  url: "https://en.wikipedia.org/wiki/Eugene_Tssui",
  publisher: "Wikipedia",
  notes:
    "Carries a close-connection notice; used for discovery, not as sole authority.",
});
const bjorndal = source({
  binding: "interview",
  mediaType: "video",
  title: "Meeting the Architect of a New World | Eugene Tssui",
  url: "https://www.youtube.com/watch?v=JNk2J6R7A-0",
  publisher: "Peter Bjorndal",
  authors: ["Peter Bjorndal"],
});
const pinup = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview with the architect Eugene Tssui",
  url: "https://archive.pinupmagazine.org/articles/interview-eugene-tssui-architect",
  publisher: "PIN–UP Magazine",
  publishedAt: "2016",
});
const roeper = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Improving the World Through Biomimicry: An Interview With Internationally Renowned 21st-Century Architect Eugene Tssui",
  url: "https://doi.org/10.1080/02783193.2022.2114401",
  publisher: "Roeper Review",
  publishedAt: "2022",
});
const berkeley = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Evolutionary Design: A Conversation with Eugene Tssui",
  url: "https://design.berkeley.edu/news-and-events/evolutionary-design-a-conversation-with-eugene-tssui",
  publisher: "UC Berkeley MDes",
  publishedAt: "2024",
});
const kqed = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Bay Street Emeryville's new artist-in-residence is a legendary architect",
  url: "https://www.kqed.org/arts/13973365/eugene-tssui-emeryville-residency-bay-street-architecture",
  publisher: "KQED",
  publishedAt: "2025",
});
const ft = source({
  binding: "interview",
  mediaType: "article",
  title: "Eugene Tssui: 'I would have liked to be a benevolent dictator'",
  url: "https://www.ft.com/content/c125dae1-5477-40db-8905-610ec08f08ba",
  publisher: "Financial Times",
  publishedAt: "2024",
});
const ebx = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Architect Eugene Tssui Might Be the Most Interesting Man in the East Bay",
  url: "https://eastbayexpress.com/architect-eugene-tssui-might-be-the-most-interesting-man-in-the-east-bay-2-1/",
  publisher: "East Bay Express",
  publishedAt: "2016",
});
const cbs = source({
  binding: "reporting",
  mediaType: "video",
  title:
    "How a Bay Area architect draws inspiration from nature to revolutionize sustainable design",
  url: "https://www.cbsnews.com/sanfrancisco/video/how-a-bay-area-architect-draws-inspiration-from-nature-to-revolutionize-sustainable-design/",
  publisher: "CBS News San Francisco",
});
const telosFilm = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "TELOS: The Fantastic World of Eugene Tssui",
  url: "http://telosmovie.com/",
  publisher: "TELOS film",
});
const telosVhx = source({
  binding: "reporting",
  mediaType: "video",
  title: "TELOS: The Fantastic World of Eugene Tssui (film)",
  url: "https://telos.vhx.tv/videos/telos-ltrt-h264-4upload",
  publisher: "TELOS film",
  publishedAt: "2014",
});
const booksLegacy = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Books — Eugene Tssui",
  url: "http://eugenetsui.com/books.html",
  publisher: "eugenetsui.com",
  notes: "Earlier version of the subject's site (single-s domain).",
});

const S = {
  tssui: tssui.id,
  tssuiHome: tssuiHome.id,
  telosBooks: telosBooks.id,
  telosExhibition: telosExhibition.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  bjorndal: bjorndal.id,
  pinup: pinup.id,
  roeper: roeper.id,
  berkeley: berkeley.id,
  kqed: kqed.id,
  ft: ft.id,
  ebx: ebx.id,
  cbs: cbs.id,
  telosFilm: telosFilm.id,
  telosVhx: telosVhx.id,
  booksLegacy: booksLegacy.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-eugene-tssui",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "eugene-tssui",
    displayName: "Eugene Tssui",
    alsoKnownAs: ["Eugene Tsui"],
    summary:
      "American architect, designer, and educator who develops 'evolutionary architecture' — buildings modeled on biological structures that work with natural forces rather than resist them.",
    identity: {
      wikidataId: "Q5407800",
      officialSite: "https://eugenetssui.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Eugene_Tssui",
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    tssui,
    tssuiHome,
    telosBooks,
    telosExhibition,
    wikidata,
    wikipedia,
    bjorndal,
    pinup,
    roeper,
    berkeley,
    kqed,
    ft,
    ebx,
    cbs,
    telosFilm,
    telosVhx,
    booksLegacy,
  ],
  claims: [
    {
      id: "claim-born-1954",
      kind: "fact",
      text: "Eugene Tssui was born on September 14, 1954, in Cleveland, Ohio, and was raised in Minneapolis.",
      sourceIds: [S.wikipedia, S.wikidata, S.tssui],
    },
    {
      id: "claim-chinese-immigrant-parents",
      kind: "fact",
      text: "He is the son of Chinese immigrants and is fluent in Mandarin and English.",
      sourceIds: [S.tssui, S.wikipedia],
    },
    {
      id: "claim-goff-apprentice",
      kind: "fact",
      text: "From 1976 until Bruce Goff's death in 1982, Tssui apprenticed under Goff, the organic-architecture master who publicly praised his talent.",
      sourceIds: [S.wikipedia, S.tssui, S.ebx],
    },
    {
      id: "claim-frei-otto",
      kind: "fact",
      text: "He also studied with Frei Otto, the lightweight-structures engineer, connecting his work to the structural-biology lineage of organic design.",
      sourceIds: [S.tssui, S.ebx],
    },
    {
      id: "claim-berkeley-phd",
      kind: "fact",
      text: "He earned an interdisciplinary doctorate in architecture and education at UC Berkeley, after study at Columbia University and the University of Oregon.",
      sourceIds: [S.tssui, S.berkeley, S.wikipedia],
    },
    {
      id: "claim-montreal-olympics",
      kind: "fact",
      text: "At about age 20 he was the youngest member of the organizing committee's design team for the 1976 Montreal Summer Olympic Games.",
      sourceIds: [S.tssui, S.ebx, S.wikipedia],
    },
    {
      id: "claim-tdr-president",
      kind: "fact",
      text: "He is president of Tssui Design & Research and leads the Telos Foundation, the nonprofit that publishes his books and promotes his designs.",
      sourceIds: [S.tssui, S.telosBooks, S.tssuiHome],
    },
    {
      id: "claim-gymnastics-titles",
      kind: "fact",
      text: "His biography and press profiles report that he is a four-time Senior Olympics gymnastics all-around champion and a multiple-time amateur boxing champion; these athletic titles are self- and media-reported rather than independently documented in the cited record.",
      sourceIds: [S.tssui, S.ebx, S.wikipedia],
    },
    {
      id: "claim-musician-designer",
      kind: "fact",
      text: "Beyond architecture he composes and performs music (piano, drums, guitar, flamenco), designs his own clothing and furniture, and has worked as a city planner, industrial designer, and educator.",
      sourceIds: [S.tssui, S.ft, S.ebx],
    },
    {
      id: "claim-evolutionary-architecture",
      kind: "stated_belief",
      text: "Tssui calls his approach 'evolutionary architecture': nature is the design intelligence, and buildings should evolve the way organisms do rather than resist their environment.",
      sourceIds: [S.tssui, S.berkeley, S.pinup],
    },
    {
      id: "claim-no-boxes",
      kind: "stated_belief",
      text: "He argues that conventional box-like buildings are a failure of imagination — 'nature itself never creates a box' — and that form should follow biological and structural logic.",
      sourceIds: [S.kqed, S.pinup, S.bjorndal],
    },
    {
      id: "claim-work-with-forces",
      kind: "stated_belief",
      text: "He holds that architecture should work with environmental forces — wind, water, earthquakes, heat — rather than fight them, pursuing strength-to-weight efficiency learned from organisms.",
      sourceIds: [S.roeper, S.berkeley, S.pinup],
    },
    {
      id: "claim-beyond-green",
      kind: "pattern",
      text: "His stated aims go beyond conventional green building: recycled and local materials, natural ventilation, low energy demand, and forms selected for survival value are treated as one evolutionary problem rather than a checklist.",
      sourceIds: [S.roeper, S.kqed, S.ebx],
    },
    {
      id: "claim-interdiscipline",
      kind: "stated_belief",
      text: "Tssui says skill in one discipline feeds the others — that music, athletics, and design cross-train the same faculties — and structures his own life as a working demonstration of interdisciplinarity.",
      sourceIds: [S.ft, S.pinup],
    },
    {
      id: "claim-hope-future",
      kind: "stated_belief",
      text: "He frames his work as an offer of hope and optimism to future generations — demonstrating that humans can build in concert with nature rather than at its expense.",
      sourceIds: [S.bjorndal, S.telosFilm],
    },
    {
      id: "claim-lone-voice",
      kind: "stated_belief",
      text: "He describes himself as 'a lone voice in the wilderness' and believes one first voice can start a movement — a self-assessment consistent with decades of ambitious, mostly unbuilt proposals.",
      sourceIds: [S.kqed],
    },
    {
      id: "claim-fish-house-tardigrade",
      kind: "fact",
      text: "The Ojo del Sol 'Fish House' in Berkeley, designed for his parents, was modeled on the tardigrade — one of Earth's most resilient organisms — and built to resist earthquake, fire, flood, and pests.",
      sourceIds: [S.wikipedia, S.ebx, S.kqed],
    },
    {
      id: "claim-few-built",
      kind: "fact",
      text: "Relative to his large catalog of proposals, few of Tssui's designs have been built: KQED reported six built designs as of 2025, with two Mount Shasta-area projects pending.",
      sourceIds: [S.kqed],
    },
    {
      id: "claim-six-built",
      kind: "speculation",
      text: "Exactly which designs count as 'built' varies between sources; the six-figure count is KQED's dated tally, not an official registry.",
      sourceIds: [S.kqed, S.tssui],
    },
    {
      id: "claim-ultima-tower",
      kind: "fact",
      text: "His best-known proposal is the Ultima Tower, a two-mile-high arcology concept for two-mile-scale urban consolidation, widely covered but never built.",
      sourceIds: [S.wikipedia, S.pinup, S.ebx],
    },
    {
      id: "claim-gibraltar",
      kind: "fact",
      text: "His unbuilt megastructure proposals include a floating bridge across the Strait of Gibraltar, the floating city Nexus, and the DNA Tower.",
      sourceIds: [S.wikipedia, S.tssui, S.ebx],
    },
    {
      id: "claim-mount-shasta",
      kind: "fact",
      text: "Mount Shasta is a recurring site for his ambitions: the ZED zero-energy residence, a proposed conference center, and a proposed underground commercial, athletic, and research facility.",
      sourceIds: [S.tssui, S.telosFilm, S.kqed],
    },
    {
      id: "claim-telos-doc",
      kind: "fact",
      text: "He is the subject of the 2014 documentary 'TELOS: The Fantastic World of Eugene Tssui,' which follows his Mount Shasta ambitions and design philosophy.",
      sourceIds: [S.telosFilm, S.telosVhx, S.wikipedia],
    },
    {
      id: "claim-moma-ecologies",
      kind: "fact",
      text: "His work was included in the Museum of Modern Art's 'Emerging Ecologies' exhibition (2023–2024) on the history of environmental thinking in architecture.",
      sourceIds: [S.kqed, S.telosExhibition],
    },
    {
      id: "claim-teaching",
      kind: "fact",
      text: "He has taught or lectured at UC Berkeley, Ohio University, North Carolina State, Peking University, and institutions in Shenzhen, among others.",
      sourceIds: [S.tssui, S.berkeley],
    },
    {
      id: "claim-emeryville-residency",
      kind: "fact",
      text: "In 2025 he began a residency at Bay Street Emeryville, near the site where his demolished Tssui Design & Research headquarters once stood.",
      sourceIds: [S.kqed],
    },
    {
      id: "claim-hq-demolished",
      kind: "fact",
      text: "His Emeryville design-and-research headquarters — built from recycled materials and natural-light strategies — was later sold and demolished.",
      sourceIds: [S.kqed, S.ebx],
    },
    {
      id: "claim-taste",
      kind: "stated_belief",
      text: "In the Financial Times interview he names Miles Davis's 'Kind of Blue,' the Guggenheim Museum, and the Sagrada Família as touchstones, wears only his own designs, and prefers vegan materials.",
      sourceIds: [S.ft],
    },
    {
      id: "claim-benevolent-dictator",
      kind: "stated_belief",
      text: "Asked about power he told the FT he 'would have liked to be a benevolent dictator' — a self-deprecating remark about control, not a political program.",
      sourceIds: [S.ft],
    },
    {
      id: "claim-anti-conformity",
      kind: "pattern",
      text: "Across four decades of interviews he consistently positions himself outside architectural convention — as an artist-scientist-athlete whose ideas institutions were not ready to build.",
      sourceIds: [S.pinup, S.ebx, S.kqed, S.ft],
    },
    {
      id: "claim-self-designed-life",
      kind: "pattern",
      text: "He treats his own life as a designed artifact: self-made clothing, self-composed music, competitive athletics into his seventies, and buildings that behave like organisms.",
      sourceIds: [S.ft, S.ebx, S.tssui],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1954-09-14",
      title: "Born in Cleveland, Ohio",
      summary: "Son of Chinese immigrants; raised in Minneapolis.",
      sourceIds: [S.wikipedia, S.wikidata],
    },
    {
      id: "event-olympics-1976",
      kind: "role",
      date: "1976",
      title: "Youngest member of the 1976 Montreal Olympics design committee",
      summary:
        "Joined the organizing committee's design team at about age 20, his biography reports.",
      sourceIds: [S.tssui, S.ebx, S.wikipedia],
    },
    {
      id: "event-goff-apprenticeship",
      kind: "apprenticeship",
      date: "1976",
      end: "1982",
      title: "Apprenticed to Bruce Goff",
      summary:
        "Studied under the organic-architecture master until Goff's death in 1982; Goff called him exceptionally talented.",
      organization: "Bruce Goff studio",
      organizationHandle: "bruce-goff-studio",
      sourceIds: [S.wikipedia, S.tssui, S.ebx],
    },
    {
      id: "event-berkeley-phd",
      kind: "education",
      date: "1985",
      title: "Interdisciplinary PhD in architecture and education",
      summary:
        "UC Berkeley doctorate combining architecture with education, following Columbia and the University of Oregon.",
      organization: "UC Berkeley",
      organizationHandle: "uc-berkeley",
      sourceIds: [S.tssui, S.berkeley],
    },
    {
      id: "event-watsu-school",
      kind: "project",
      date: "1989",
      title: "Watsu School, Harbin Hot Springs",
      summary:
        "Built school for the water-based bodywork practice in Northern California.",
      location: "Harbin Hot Springs, California",
      sourceIds: [S.wikipedia, S.tssui],
    },
    {
      id: "event-fish-house",
      kind: "project",
      date: "1995",
      title: "Ojo del Sol ('Fish House'), Berkeley",
      summary:
        "Tardigrade-inspired residence designed for his parents; engineered for fire, earthquake, flood, and pest resistance.",
      location: "Berkeley, California",
      sourceIds: [S.wikipedia, S.ebx, S.kqed],
    },
    {
      id: "event-emeryville-hq",
      kind: "project",
      date: "2010",
      title: "Tssui Design & Research headquarters, Emeryville",
      summary:
        "Office built with recycled and energy-conscious materials; later sold and demolished.",
      location: "Emeryville, California",
      sourceIds: [S.kqed, S.ebx],
    },
    {
      id: "event-telos-doc",
      kind: "media",
      date: "2014",
      title: "TELOS: The Fantastic World of Eugene Tssui",
      summary: "Feature documentary on his work and Mount Shasta ambitions.",
      sourceIds: [S.telosFilm, S.telosVhx],
    },
    {
      id: "event-moma-2023",
      kind: "exhibition",
      date: "2023",
      end: "2024",
      title: "Work in MoMA's 'Emerging Ecologies'",
      summary:
        "His evolutionary design was shown among the history of environmental architecture.",
      organization: "Museum of Modern Art",
      organizationHandle: "museum-of-modern-art",
      sourceIds: [S.kqed, S.telosExhibition],
    },
    {
      id: "event-emeryville-residency",
      kind: "role",
      date: "2025",
      title: "Artist-in-residence at Bay Street Emeryville",
      summary:
        "A public-facing residency near the site of his demolished headquarters.",
      organization: "Bay Street Emeryville",
      organizationHandle: "bay-street-emeryville",
      sourceIds: [S.kqed],
    },
  ],
  themes: [
    {
      id: "theme-nature-as-teacher",
      kind: "philosophy",
      status: "stated",
      title: "Nature as the design intelligence",
      summary:
        "Evolution has already solved most structural problems; the architect's job is to study organisms — their forms, materials, and survival strategies — and apply them. Tardigrades, bones, trees, and cells are his reference library.",
      sourceIds: [S.tssui, S.roeper, S.pinup, S.bjorndal],
    },
    {
      id: "theme-anti-box",
      kind: "philosophy",
      status: "stated",
      title: "Against the box",
      summary:
        "'Nature itself never creates a box.' Conventional rectilinear buildings waste material, fight their environment, and deaden the people inside; form should emerge from structural and ecological logic.",
      sourceIds: [S.kqed, S.pinup, S.ebx],
    },
    {
      id: "theme-forces",
      kind: "method",
      status: "stated",
      title: "Work with forces, not against them",
      summary:
        "Earthquakes, wind, flood, and fire are design inputs. Curved forms, tensile structures, and ventilation strategies let buildings flex, breathe, and survive rather than resist.",
      sourceIds: [S.roeper, S.berkeley, S.pinup],
    },
    {
      id: "theme-interdisciplinarity",
      kind: "belief",
      status: "stated",
      title: "Interdisciplinarity as a way of life",
      summary:
        "Architecture, planning, industrial design, music, athletics, and education are one practice. He argues skills in one domain sharpen the others and lives the argument publicly.",
      sourceIds: [S.ft, S.pinup, S.tssui],
    },
    {
      id: "theme-hope",
      kind: "belief",
      status: "stated",
      title: "Architecture as hope",
      summary:
        "He wants his work to give future generations optimism — proof that humans can build beautifully within nature's limits.",
      sourceIds: [S.bjorndal, S.telosFilm],
    },
    {
      id: "theme-material-honesty",
      kind: "method",
      status: "reported",
      title: "Strength-to-weight and material honesty",
      summary:
        "Recycled, local, and low-mass materials; structures derived from bone and shell mechanics; energy systems that need little input because the form does the work.",
      sourceIds: [S.roeper, S.kqed, S.ebx],
    },
    {
      id: "theme-outsider",
      kind: "practice",
      status: "reported",
      title: "The self-described outsider",
      summary:
        "He calls himself 'a lone voice in the wilderness'; decades of visionary proposals met institutional reluctance. The press frames him as a brilliant eccentric — he frames himself as early.",
      sourceIds: [S.kqed, S.ft, S.ebx],
    },
    {
      id: "theme-influences",
      kind: "influence",
      status: "reported",
      title: "Goff, Otto, and the organic lineage",
      summary:
        "Bruce Goff's apprenticeship gave him the permission structure for radical form; Frei Otto supplied the structural science. He extends that lineage into explicit biomimicry.",
      sourceIds: [S.wikipedia, S.ebx, S.tssui],
    },
  ],
  works: [
    {
      id: "work-fish-house",
      kind: "building",
      status: "completed",
      title: "Ojo del Sol ('Fish House')",
      date: "1995",
      location: "Berkeley, California",
      summary:
        "Residence designed for his parents, modeled on the tardigrade and built to resist earthquake, fire, flood, and termites.",
      sourceIds: [S.wikipedia, S.ebx, S.kqed],
    },
    {
      id: "work-watsu",
      kind: "building",
      status: "completed",
      title: "Watsu School",
      date: "1989",
      location: "Harbin Hot Springs, California",
      summary: "School for the water bodywork practice.",
      sourceIds: [S.wikipedia, S.tssui],
    },
    {
      id: "work-reyes",
      kind: "building",
      status: "completed",
      title: "Reyes Residence",
      summary: "A built residence listed among his completed designs.",
      sourceIds: [S.wikipedia, S.tssui],
    },
    {
      id: "work-zed",
      kind: "building",
      status: "completed",
      title: "ZED Residence",
      location: "Mount Shasta, California",
      summary: "A zero-energy dwelling near Mount Shasta.",
      sourceIds: [S.tssui, S.kqed],
    },
    {
      id: "work-emeryville-hq",
      kind: "building",
      status: "completed",
      title: "Tssui Design & Research headquarters",
      date: "2010",
      location: "Emeryville, California",
      summary:
        "Built from recycled and energy-conscious materials; later sold and demolished.",
      sourceIds: [S.kqed, S.ebx],
    },
    {
      id: "work-ultima",
      kind: "project",
      status: "unbuilt",
      title: "Ultima Tower",
      summary:
        "Two-mile-high arcology proposal consolidating an entire city's population — his most famous unbuilt design.",
      sourceIds: [S.wikipedia, S.pinup, S.ebx],
    },
    {
      id: "work-dna-tower",
      kind: "project",
      status: "unbuilt",
      title: "DNA Tower",
      summary: "Double-helix tower proposal.",
      sourceIds: [S.wikipedia, S.tssui],
    },
    {
      id: "work-nexus",
      kind: "project",
      status: "proposed",
      title: "Nexus Floating Sea City",
      summary: "A floating city concept.",
      sourceIds: [S.wikipedia, S.tssui],
    },
    {
      id: "work-gibraltar",
      kind: "project",
      status: "proposed",
      title: "Strait of Gibraltar Floating Bridge",
      summary: "A proposed floating bridge spanning the strait.",
      sourceIds: [S.wikipedia, S.tssui],
    },
    {
      id: "work-eye-in-sky",
      kind: "project",
      status: "proposed",
      title: "Eye-in-the-Sky Lookout Tower",
      summary: "A lookout tower proposal.",
      sourceIds: [S.wikipedia, S.tssui],
    },
    {
      id: "work-telos-park",
      kind: "project",
      status: "proposed",
      title: "Telos Interdisciplinary Nature, Technology, Education, Recreation Park",
      summary:
        "A Telos Foundation campus proposal joining education, recreation, and nature study.",
      sourceIds: [S.tssui, S.telosFilm],
    },
    {
      id: "work-telos-window",
      kind: "project",
      status: "proposed",
      title: "Telos Window of the World",
      summary: "A Telos Foundation proposal.",
      sourceIds: [S.tssui, S.telosFilm],
    },
    {
      id: "work-shasta-center",
      kind: "project",
      status: "proposed",
      title: "Mount Shasta Conference Center",
      location: "Mount Shasta, California",
      sourceIds: [S.tssui, S.kqed],
    },
    {
      id: "work-shasta-underground",
      kind: "project",
      status: "proposed",
      title: "Mount Shasta underground commercial, athletic, and research facility",
      location: "Mount Shasta, California",
      sourceIds: [S.tssui, S.telosFilm],
    },
    {
      id: "work-evolutionary-architecture-book",
      kind: "book",
      status: "published",
      title: "Evolutionary Architecture: Nature as a Basis for Design",
      summary:
        "His design manifesto, published through the Telos Foundation's book catalog.",
      sourceIds: [S.telosBooks, S.booksLegacy],
    },
    {
      id: "work-telos-film",
      kind: "film",
      status: "released",
      title: "TELOS: The Fantastic World of Eugene Tssui",
      date: "2014",
      summary: "Feature documentary about his life and Mount Shasta proposals.",
      sourceIds: [S.telosFilm, S.telosVhx],
    },
  ],
  appearances: [
    {
      id: "appearance-bjorndal",
      title: "Meeting the Architect of a New World",
      venue: "Peter Bjorndal (YouTube)",
      participants: ["Eugene Tssui", "Peter Bjorndal"],
      summary:
        "Video portrait and interview covering evolutionary architecture, the Fish House, and his message of hope for future generations.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=JNk2J6R7A-0",
          sourceId: S.bjorndal,
        },
      ],
      sourceIds: [S.bjorndal],
    },
    {
      id: "appearance-pinup",
      title: "Interview with the architect Eugene Tssui",
      venue: "PIN–UP Magazine",
      publishedAt: "2016",
      participants: ["Eugene Tssui"],
      summary: "A design-press interview on biomimicry and the built work.",
      media: [
        {
          type: "article",
          url: "https://archive.pinupmagazine.org/articles/interview-eugene-tssui-architect",
          sourceId: S.pinup,
        },
      ],
      sourceIds: [S.pinup],
    },
    {
      id: "appearance-roeper",
      title: "Improving the World Through Biomimicry",
      venue: "Roeper Review",
      publishedAt: "2022",
      participants: ["Eugene Tssui"],
      summary: "An academic interview on biomimicry and education.",
      media: [
        {
          type: "article",
          url: "https://doi.org/10.1080/02783193.2022.2114401",
          sourceId: S.roeper,
        },
      ],
      sourceIds: [S.roeper],
    },
    {
      id: "appearance-mdes",
      title: "Evolutionary Design: A Conversation with Eugene Tssui",
      venue: "UC Berkeley MDes",
      publishedAt: "2024",
      participants: ["Eugene Tssui"],
      summary: "A public conversation hosted by Berkeley's design program.",
      sourceIds: [S.berkeley],
    },
    {
      id: "appearance-ft",
      title: "Financial Times interview",
      venue: "Financial Times",
      publishedAt: "2024",
      participants: ["Eugene Tssui"],
      summary:
        "A wide-ranging personal interview: music, clothing, Mount Shasta, and the remark about wanting to be a 'benevolent dictator.'",
      sourceIds: [S.ft],
    },
    {
      id: "appearance-cbs",
      title: "CBS News San Francisco segment",
      venue: "CBS News San Francisco",
      participants: ["Eugene Tssui"],
      summary:
        "A broadcast segment on drawing inspiration from nature to revolutionize sustainable design.",
      media: [
        {
          type: "video",
          url: "https://www.cbsnews.com/sanfrancisco/video/how-a-bay-area-architect-draws-inspiration-from-nature-to-revolutionize-sustainable-design/",
          sourceId: S.cbs,
        },
      ],
      sourceIds: [S.cbs],
    },
    {
      id: "appearance-telos",
      title: "TELOS: The Fantastic World of Eugene Tssui",
      venue: "TELOS film",
      publishedAt: "2014",
      participants: ["Eugene Tssui"],
      summary:
        "The feature documentary about him, distributed through the film's site and Vimeo On Demand.",
      media: [
        {
          type: "video",
          url: "https://telos.vhx.tv/videos/telos-ltrt-h264-4upload",
          sourceId: S.telosVhx,
        },
      ],
      sourceIds: [S.telosFilm, S.telosVhx],
    },
  ],
  relations: [
    {
      id: "rel-bruce-goff",
      kind: "mentored_by",
      target: "bruce-goff",
      targetName: "Bruce Goff",
      note: "Apprenticed under Goff from 1976 until his death in 1982.",
      start: "1976",
      end: "1982",
      targetWikidataId: "Q553804",
      sourceIds: [S.wikipedia, S.tssui, S.ebx],
    },
    {
      id: "rel-frei-otto",
      kind: "influenced_by",
      target: "frei-otto",
      targetName: "Frei Otto",
      note: "Studied with the lightweight-structures engineer; Otto supplied the structural science behind his organic forms.",
      targetWikidataId: "Q64412",
      sourceIds: [S.wikipedia, S.ebx, S.tssui],
    },
  ],
  openQuestions: [
    "Exactly how many designs are built depends on the count: KQED says six as of 2025; his own catalog lists more completed residences.",
    "The athletic record (Senior Olympics gymnastics, amateur boxing titles) is consistently reported but sourced to his biography and profiles rather than independent records.",
    "His Wikipedia article carries a close-connection notice, so its details should be cross-checked against independent coverage.",
    "The status of the two Mount Shasta projects pending at the time of KQED's 2025 report is not yet resolved in the record.",
  ],
  body: `Eugene Tssui is an American architect who has spent five decades arguing that buildings should behave like organisms. Working from the San Francisco Bay Area through his firm Tssui Design & Research and the nonprofit Telos Foundation, he designs structures modeled on bones, cells, shells, and tardigrades — forms selected, in his framing, the way evolution selects: for survival under real forces.

## Identity and formation

Born September 14, 1954 in Cleveland, Ohio and raised in Minneapolis, Tssui is the son of Chinese immigrants and is fluent in Mandarin and English. His biography reports that at about twenty he was the youngest member of the design team on the organizing committee for the 1976 Montreal Olympics. He apprenticed under Bruce Goff — the organic-architecture master whose Shin'enKan and Bavinger House made curved, found-material construction a serious American practice — from 1976 until Goff's death in 1982, and also studied with the lightweight-structures engineer Frei Otto. He holds an interdisciplinary doctorate in architecture and education from UC Berkeley, after study at Columbia University and the University of Oregon.

That lineage matters: where most biomimicry is metaphor, Tssui's is structural. Goff gave him permission for radical form; Otto gave him the physics.

## The work

His most famous building is also his most personal: Ojo del Sol, the "Fish House" in Berkeley designed for his parents and modeled on the tardigrade — the microscopic animal that survives radiation, vacuum, and boiling. The house was engineered against earthquake, fire, flood, and termites, and it made him a Bay Area fixture. Other built work includes the Watsu School at Harbin Hot Springs, the Reyes Residence, a zero-energy dwelling near Mount Shasta, and his own Emeryville headquarters — built from recycled materials, later sold and demolished.

But the built record is thin next to the proposals. KQED counted six built designs in 2025. The unbuilt catalog is where his imagination lives: the two-mile-high Ultima Tower, a floating bridge across the Strait of Gibraltar, the floating city Nexus, the DNA Tower, and a cluster of Mount Shasta ambitions — a conference center, an underground commercial-athletic-research facility, and the Telos Foundation's nature-technology-education park. The 2014 documentary *TELOS: The Fantastic World of Eugene Tssui* follows those ambitions and the frustration of pitching them to institutions that would not build.

## The philosophy

Three commitments recur across his interviews and books. First, nature as design intelligence: evolution has already optimized structure, so the architect studies organisms rather than inventing from nothing. Second, an attack on the box — "nature itself never creates a box" — conventional rectilinear buildings waste material, fight their environment, and deaden occupants. Third, work with forces rather than against them: earthquakes, wind, and flood are inputs that curved, tensile, ventilated forms can absorb.

He extends this past conventional green building into what he calls evolutionary architecture — materials, structure, ventilation, and siting treated as one survival problem. The press often files him under "biomimicry" or "sustainability"; his own frame is closer to applied evolutionary theory.

## The person behind the work

Tssui structures his life as a demonstration of the interdisciplinarity he preaches. He is a musician (piano, drums, guitar, flamenco), a designer of his own clothing and furniture, a planner and industrial designer, and — by his biography's and press profiles' account — a four-time Senior Olympics gymnastics all-around champion and multiple-time amateur boxing champion. He told the Financial Times that skill in one discipline improves the others, named *Kind of Blue*, the Guggenheim, and the Sagrada Família as touchstones, and joked that he would have liked to be "a benevolent dictator" — a remark about design control, not politics.

The consistent throughline is an offer of hope: he wants future generations to see that humans can build beautifully within nature's limits. He is also honest about the cost of being early — "a lone voice in the wilderness," he told KQED, adding that all it takes is one first voice for things to start happening. In 2025 that persistence took a new form: a public artist residency at Bay Street Emeryville, near the site where his demolished headquarters once stood.

## What the record does not settle

The counts and the trophies are the soft spots. "Six built designs" is a dated press tally, not a registry; athletic titles are reported rather than independently documented; and the Wikipedia article itself carries a close-connection notice. The index preserves those seams rather than smoothing them over.

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
