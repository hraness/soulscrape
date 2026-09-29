/**
 * The slice of the published Eugene Tssui index that the launch mockups and
 * film draw. It is copied from examples/people/eugene-tssui/person-index.json
 * rather than imported, so the site build never reads outside `site/`;
 * tests/launch.test.ts fails when any value here drifts from the packet.
 */

export type ClaimKind = "fact" | "stated_belief" | "pattern" | "speculation";
export type SourceBinding = "subject_controlled" | "reporting" | "interview" | "reference";

export type FixtureSource = Readonly<{
  id: string;
  binding: SourceBinding;
  title: string;
  publisher: string;
  accessedAt: string;
  notes?: string;
}>;

export type FixtureClaim = Readonly<{
  id: string;
  kind: ClaimKind;
  text: string;
  sourceIds: readonly string[];
}>;

export const CLAIM_KIND_LABEL: Readonly<Record<ClaimKind, string>> = {
  fact: "Fact",
  stated_belief: "Stated belief",
  pattern: "Pattern",
  speculation: "Speculation",
};

export const BINDING_LABEL: Readonly<Record<SourceBinding, string>> = {
  subject_controlled: "His own site",
  reporting: "Reporting",
  interview: "Interview",
  reference: "Reference",
};

const SOURCES = {
  wikipedia: {
    id: "source-79d1ff748fc570c20fb7",
    binding: "reference",
    title: "Eugene Tssui",
    publisher: "Wikipedia",
    accessedAt: "2026-09-16T00:00:00Z",
    notes: "Carries a close-connection notice; used for discovery, not as sole authority.",
  },
  about: {
    id: "source-ca31414cba006b2a2ca1",
    binding: "subject_controlled",
    title: "About Eugene Tssui",
    publisher: "eugenetssui.com",
    accessedAt: "2026-09-16T00:00:00Z",
    notes: "The subject's own biography page; claims here are self-reported.",
  },
  eastBay: {
    id: "source-797356250c74b713475c",
    binding: "reporting",
    title: "Architect Eugene Tssui Might Be the Most Interesting Man in the East Bay",
    publisher: "East Bay Express",
    accessedAt: "2026-09-16T00:00:00Z",
  },
  kqed: {
    id: "source-ea732043155fdbba61df",
    binding: "reporting",
    title: "Bay Street Emeryville's new artist-in-residence is a legendary architect",
    publisher: "KQED",
    accessedAt: "2026-09-16T00:00:00Z",
  },
  pinUp: {
    id: "source-807b81f3b7c0be8714e7",
    binding: "interview",
    title: "Interview with the architect Eugene Tssui",
    publisher: "PIN–UP Magazine",
    accessedAt: "2026-09-16T00:00:00Z",
  },
  bjorndal: {
    id: "source-c5406a53e7d43e756d6c",
    binding: "interview",
    title: "Meeting the Architect of a New World | Eugene Tssui",
    publisher: "Peter Bjorndal",
    accessedAt: "2026-09-16T00:00:00Z",
  },
  ft: {
    id: "source-ff922e850e797bd96f35",
    binding: "interview",
    title: "Eugene Tssui: 'I would have liked to be a benevolent dictator'",
    publisher: "Financial Times",
    accessedAt: "2026-09-16T00:00:00Z",
  },
} as const satisfies Record<string, FixtureSource>;

export const fixtureSources: readonly FixtureSource[] = Object.values(SOURCES);

export function fixtureSource(id: string): FixtureSource {
  const source = fixtureSources.find((entry) => entry.id === id);
  if (source === undefined) throw new RangeError(`The fixture has no source ${id}.`);
  return source;
}

export const eugeneTssui = {
  handle: "eugene-tssui",
  displayName: "Eugene Tssui",
  alsoKnownAs: ["Eugene Tsui"],
  officialSite: "https://eugenetssui.com/",
  summary:
    "American architect, designer, and educator who develops 'evolutionary architecture' — buildings modeled on biological structures that work with natural forces rather than resist them.",
  asOf: "2026-09-16T18:30:00Z",
  coverage: ["biography", "work", "philosophy", "projects", "media"],
  /** Totals in the packet; the claims below are a sample. */
  counts: {
    sources: 17,
    claims: 31,
    timeline: 10,
    themes: 8,
    works: 16,
    appearances: 7,
    openQuestions: 4,
    subjectControlledSources: 5,
    claimsByKind: { fact: 19, stated_belief: 8, pattern: 3, speculation: 1 },
  },
  /** One claim of each kind, in the packet's words. */
  claims: [
    {
      id: "claim-goff-apprentice",
      kind: "fact",
      text: "From 1976 until Bruce Goff's death in 1982, Tssui apprenticed under Goff, the organic-architecture master who publicly praised his talent.",
      sourceIds: [SOURCES.wikipedia.id, SOURCES.about.id, SOURCES.eastBay.id],
    },
    {
      id: "claim-no-boxes",
      kind: "stated_belief",
      text: "He argues that conventional box-like buildings are a failure of imagination — 'nature itself never creates a box' — and that form should follow biological and structural logic.",
      sourceIds: [SOURCES.kqed.id, SOURCES.pinUp.id, SOURCES.bjorndal.id],
    },
    {
      id: "claim-anti-conformity",
      kind: "pattern",
      text: "In interviews from 2016 to 2025 he consistently positions himself outside architectural convention — as an artist-scientist-athlete whose ideas institutions were not ready to build.",
      sourceIds: [SOURCES.pinUp.id, SOURCES.eastBay.id, SOURCES.kqed.id, SOURCES.ft.id],
    },
    {
      id: "claim-six-built",
      kind: "speculation",
      text: "Exactly which designs count as 'built' varies between sources; the count of six is KQED's 2025 tally, not an official registry.",
      sourceIds: [SOURCES.kqed.id, SOURCES.about.id],
    },
  ] satisfies readonly FixtureClaim[],
  timeline: [
    { date: "1954-09-14", title: "Born in Cleveland, Ohio" },
    { date: "1976", title: "Apprenticed to Bruce Goff" },
    { date: "1985", title: "Interdisciplinary PhD in architecture and education" },
    { date: "1995", title: "Ojo del Sol ('Fish House'), Berkeley" },
    { date: "2014", title: "TELOS: The Fantastic World of Eugene Tssui" },
    { date: "2023", title: "Work in MoMA's 'Emerging Ecologies'" },
    { date: "2025", title: "Artist-in-residence at Bay Street Emeryville" },
  ],
  themes: [
    { status: "stated", title: "Nature as the design intelligence" },
    { status: "stated", title: "Against the box" },
    { status: "stated", title: "Work with forces, not against them" },
    { status: "reported", title: "The self-described outsider" },
    { status: "reported", title: "Goff, Otto, and the organic lineage" },
  ],
  openQuestions: [
    "Exactly how many designs are built depends on the count: KQED says six as of 2025; his own catalog lists more completed residences.",
    "The athletic record (Senior Olympics gymnastics, amateur boxing titles) is consistently reported but sourced to his biography and profiles rather than independent records.",
    "His Wikipedia article carries a close-connection notice, so its details should be cross-checked against independent coverage.",
    "The status of the two Mount Shasta projects pending at the time of KQED's 2025 report is not yet resolved in the record.",
  ],
  /** The first sentence of the packet's essay. */
  essayOpening:
    "Eugene Tssui is an American architect who has spent five decades arguing that buildings should behave like organisms.",
} as const;

export type EugeneTssuiFixture = typeof eugeneTssui;

export function fixtureClaim(kind: ClaimKind): FixtureClaim {
  const claim = eugeneTssui.claims.find((entry) => entry.kind === kind);
  if (claim === undefined) throw new RangeError(`The fixture has no ${kind} claim.`);
  return claim;
}

/** The real published page: soulscrape.com/ben/eugene-tssui. Captions and beats link to it. */
export const EXAMPLE_PAGE_PATH = "/ben/eugene-tssui";

/**
 * The address shown in mockup browser frames. The design kit only allows
 * reserved example hosts there, so the frame reads soulscrape.example.
 */
export const EXAMPLE_PAGE_URL = `soulscrape.example${EXAMPLE_PAGE_PATH}`;
