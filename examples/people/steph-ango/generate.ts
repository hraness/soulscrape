#!/usr/bin/env bun
/** Generate examples/people/steph-ango/person-index.json with derived source ids. */

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

const about = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About me — Steph Ango",
  url: "https://stephango.com/about",
  publisher: "stephango.com",
  notes:
    "The subject's own about page: identity, profiles, interview list, and site colophon; claims here are self-reported.",
});
const projects = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Projects — Steph Ango",
  url: "https://stephango.com/projects",
  publisher: "stephango.com",
  notes: "The subject's dated catalog of his own projects, 2002–present.",
});
const lumiPage = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Lumi — Steph Ango",
  url: "https://stephango.com/lumi",
  publisher: "stephango.com",
});
const inkodyePage = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Inkodye — Steph Ango",
  url: "https://stephango.com/inkodye",
  publisher: "stephango.com",
});
const fileOverApp = source({
  binding: "first_person",
  mediaType: "article",
  title: "File over app",
  url: "https://stephango.com/file-over-app",
  publisher: "stephango.com",
  publishedAt: "2023-07-01",
  authors: ["Steph Ango"],
});
const vcware = source({
  binding: "first_person",
  mediaType: "article",
  title: "100% user-supported",
  url: "https://stephango.com/vcware",
  publisher: "stephango.com",
  publishedAt: "2024-02-10",
  authors: ["Steph Ango"],
});
const evergreen = source({
  binding: "first_person",
  mediaType: "article",
  title: "Evergreen notes turn ideas into objects that you can manipulate",
  url: "https://stephango.com/evergreen-notes",
  publisher: "stephango.com",
  publishedAt: "2022-09-17",
  authors: ["Steph Ango"],
});
const kepanoCeo = source({
  binding: "primary_record",
  mediaType: "article",
  title: "I'm joining Obsidian full-time as CEO",
  url: "https://obsidian.md/blog/kepano-ceo/",
  publisher: "Obsidian",
  publishedAt: "2023-02-06",
  authors: ["Steph Ango"],
  notes: "The official Obsidian blog announcement, authored by the subject.",
});
const jsonCanvas = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Announcing JSON Canvas: an open file format for infinite canvas data",
  url: "https://obsidian.md/blog/json-canvas/",
  publisher: "Obsidian",
  publishedAt: "2024-03-11",
  authors: ["Steph Ango"],
});
const saveTheWeb = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Save the web",
  url: "https://obsidian.md/blog/save-the-web/",
  publisher: "Obsidian",
  publishedAt: "2024-11-11",
  authors: ["Steph Ango"],
});
const narvar = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Narvar Acquires Lumi to Expand Its Services",
  url: "https://corp.narvar.com/blog/narvar-acquires-lumi",
  publisher: "Narvar",
  publishedAt: "2021-12-15",
  notes: "Acquirer's official press release for the Lumi acquisition.",
});
const decoder = source({
  binding: "interview",
  mediaType: "article",
  title: "How the head of Obsidian went from superfan to CEO",
  url: "https://www.theverge.com/decoder-podcast-with-nilay-patel/760522/obsidian-ceo-steph-ango-kepano-productivity-software-notes-app",
  publisher: "The Verge",
  publishedAt: "2025-08-18",
  authors: ["Casey Newton"],
  notes: "Decoder episode with transcript, guest-hosted by Casey Newton.",
});
const dialectic = source({
  binding: "interview",
  mediaType: "article",
  title: "Steph Ango — Tools for Amplifying Our Light",
  url: "https://jacksondahl.com/dialectic/steph-ango",
  publisher: "Dialectic with Jackson Dahl",
  publishedAt: "2025-02-03",
  authors: ["Jackson Dahl"],
  notes: "Dialectic episode 8; long-form interview with full transcript.",
});
const otherStuff = source({
  binding: "interview",
  mediaType: "video",
  title: "Kepano: The Interconnectedness of Everything | The Other Stuff #28",
  url: "https://www.youtube.com/watch?v=J8vec3BuOnk",
  publisher: "The Other Stuff Show",
  publishedAt: "2025-12-09",
  authors: ["internetVin"],
});
const lyt = source({
  binding: "interview",
  mediaType: "webpage",
  title: "Fireside Chat with @kepano, CEO of Obsidian",
  url: "https://www.linkingyourthinking.com/lyt-conference-3/kepano",
  publisher: "Linking Your Thinking",
  publishedAt: "2023",
  notes:
    "Session page for his Linking Your Thinking Conference 3 fireside chat; the recording is on YouTube.",
});
const futureCommerce = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "\"Well Made\": You Need to Have a Reason Why Something Should Exist",
  url: "https://futurecommerce.fm/podcasts/202-well-made-you-need-to-have-a-reason-why-something-should-exist",
  publisher: "Future Commerce",
  publishedAt: "2021-04-16",
  authors: ["Phillip Jackson"],
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Steph Ango (Q126889957)",
  url: "https://www.wikidata.org/wiki/Q126889957",
  publisher: "Wikidata",
});
const wikipediaLumi = source({
  binding: "reference",
  mediaType: "article",
  title: "Lumi (company)",
  url: "https://en.wikipedia.org/wiki/Lumi_(company)",
  publisher: "Wikipedia",
  notes:
    "Covers the Lumi/Inkodye company history; used for corroboration, not as sole authority.",
});
const labj = source({
  binding: "reporting",
  mediaType: "article",
  title: "Twenty In Their 20s: Jesse Genet and Stephan Ango",
  url: "https://labusinessjournal.com/news/weekly-news/twenty-their-20s-jesse-genet-and-stephan-ango/",
  publisher: "Los Angeles Business Journal",
  publishedAt: "2015-05-31",
  authors: ["Marni Usheroff"],
});
const businessInsider = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Narvar has solved returns for brands like Lululemon and Sephora. Now, it's acquiring startup Lumi to cut into the $49 billion spent by e-commerce brands on packaging.",
  url: "https://www.businessinsider.com/narvar-acquires-lumi-to-help-retailers-cut-shipping-packaging-costs-2021-12",
  publisher: "Business Insider",
  publishedAt: "2021-12-16",
  authors: ["Madeline Stone"],
});

const S = {
  about: about.id,
  projects: projects.id,
  lumiPage: lumiPage.id,
  inkodyePage: inkodyePage.id,
  fileOverApp: fileOverApp.id,
  vcware: vcware.id,
  evergreen: evergreen.id,
  kepanoCeo: kepanoCeo.id,
  jsonCanvas: jsonCanvas.id,
  saveTheWeb: saveTheWeb.id,
  narvar: narvar.id,
  decoder: decoder.id,
  dialectic: dialectic.id,
  otherStuff: otherStuff.id,
  lyt: lyt.id,
  futureCommerce: futureCommerce.id,
  wikidata: wikidata.id,
  wikipediaLumi: wikipediaLumi.id,
  labj: labj.id,
  businessInsider: businessInsider.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-steph-ango",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "steph-ango",
    displayName: "Steph Ango",
    alsoKnownAs: ["kepano", "Stephan Ango"],
    summary:
      "American designer, writer, entrepreneur, and toolmaker — CEO of Obsidian since February 2023, creator of the Minimal theme and the 'File over app' essay, and cofounder of the packaging company Lumi and the light-sensitive dye company Inkodye.",
    identity: {
      wikidataId: "Q126889957",
      officialSite: "https://stephango.com/",
      profiles: [
        "https://x.com/kepano",
        "https://github.com/kepano",
        "https://mastodon.social/@kepano",
        "https://bsky.app/profile/stephango.com",
        "https://www.threads.net/@kepano",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    about,
    projects,
    lumiPage,
    inkodyePage,
    fileOverApp,
    vcware,
    evergreen,
    kepanoCeo,
    jsonCanvas,
    saveTheWeb,
    narvar,
    decoder,
    dialectic,
    otherStuff,
    lyt,
    futureCommerce,
    wikidata,
    wikipediaLumi,
    labj,
    businessInsider,
  ],
  claims: [
    {
      id: "claim-kepano-alias",
      kind: "fact",
      text: "Steph Ango publishes under the handle kepano on X, GitHub, Mastodon, Threads, and Hacker News, uses stephango.com as his Bluesky handle, and writes at stephango.com.",
      sourceIds: [S.about, S.wikidata],
    },
    {
      id: "claim-ceo-feb-2023",
      kind: "fact",
      text: "On February 6, 2023, Ango announced he was joining Obsidian full-time as CEO. He is not a cofounder: Shida Li and Erica Xu, who built the app and met at the University of Waterloo, brought him in as an early user and community contributor.",
      sourceIds: [S.kepanoCeo, S.decoder, S.lyt],
    },
    {
      id: "claim-obsidian-values",
      kind: "fact",
      text: "In the announcement he committed Obsidian to remain free to use, built on durable open file formats without lock-in, private, offline-first and end-to-end encrypted, endlessly customizable, and '100% user-supported' with no investors.",
      sourceIds: [S.kepanoCeo],
    },
    {
      id: "claim-community-contributions",
      kind: "fact",
      text: "Before becoming CEO he was known in the Obsidian community for his Minimal theme and his contributions to Obsidian 1.0, including work on its default theme.",
      sourceIds: [S.kepanoCeo, S.lyt, S.projects],
    },
    {
      id: "claim-education",
      kind: "fact",
      text: "His education is in biology and industrial design; the Los Angeles Business Journal described his background as biology and chemistry.",
      sourceIds: [S.dialectic, S.labj],
    },
    {
      id: "claim-met-genet",
      kind: "fact",
      text: "He met Jesse Genet in 2008 while she studied industrial design at Art Center College of Design in Pasadena; the pair acquired a 1950s-era light-sensitive dye formula and began modernizing it.",
      sourceIds: [S.labj, S.wikipediaLumi],
    },
    {
      id: "claim-inkodye-founding",
      kind: "fact",
      text: "In 2009 Ango and Genet co-founded Inkodye, whose photo-sensitive vat dye prints images on fabric using sunlight. He worked on dye chemistry, branding, the companion app, manufacturing, and the company's factory and fulfillment center.",
      sourceIds: [S.inkodyePage, S.wikipediaLumi],
    },
    {
      id: "claim-kickstarter-2009",
      kind: "fact",
      text: "The December 2009 Kickstarter campaign raised $13,597 — an early success for the platform — and later won Kickstarter's Best Design Project of 2010.",
      sourceIds: [S.wikipediaLumi, S.inkodyePage, S.labj],
    },
    {
      id: "claim-kickstarter-2012",
      kind: "fact",
      text: "A second Kickstarter in 2012 raised $268,437, more than 500% of its $50,000 goal; his site reports that more than one million prints were made with Inkodye at home.",
      sourceIds: [S.wikipediaLumi, S.labj, S.inkodyePage],
    },
    {
      id: "claim-shark-tank",
      kind: "fact",
      text: "The company appeared on ABC's Shark Tank in February 2015 and received two offers, both of which Genet declined.",
      sourceIds: [S.wikipediaLumi, S.inkodyePage],
    },
    {
      id: "claim-lumi-founding",
      kind: "fact",
      text: "In 2015 Ango and Genet founded Lumi, a Y Combinator-backed software platform helping businesses find and collaborate with packaging factories — started, he writes, to scratch the itch of building Inkodye's own supply chain.",
      sourceIds: [S.lumiPage, S.wikipediaLumi, S.labj],
    },
    {
      id: "claim-series-a",
      kind: "fact",
      text: "Lumi raised a $9 million Series A in 2018.",
      sourceIds: [S.businessInsider],
    },
    {
      id: "claim-narvar-acquisition",
      kind: "fact",
      text: "Narvar announced its acquisition of Lumi on December 15, 2021; financial terms were not disclosed, and Genet joined Narvar as vice president of packaging.",
      sourceIds: [S.narvar, S.businessInsider],
    },
    {
      id: "claim-lumi-scale",
      kind: "fact",
      text: "At the acquisition Lumi served more than 700 direct-to-consumer brands, including Parachute Home, Nutrafol, and Misfits Market.",
      sourceIds: [S.narvar, S.businessInsider],
    },
    {
      id: "claim-web-clipper",
      kind: "fact",
      text: "On November 11, 2024, he introduced Obsidian Web Clipper, an open-source MIT-licensed browser extension that highlights and captures web pages as durable local Markdown files.",
      sourceIds: [S.saveTheWeb, S.projects],
    },
    {
      id: "claim-json-canvas",
      kind: "fact",
      text: "On March 11, 2024, Obsidian announced JSON Canvas — the open, MIT-licensed .canvas file format for infinite canvas data — created for longevity, readability, interoperability, and extensibility.",
      sourceIds: [S.jsonCanvas, S.projects],
    },
    {
      id: "claim-flexoki",
      kind: "fact",
      text: "He created Flexoki, an 'inky' MIT-licensed color scheme for prose and code, originally designed for his own site and later ported to dozens of apps.",
      sourceIds: [S.about, S.projects],
    },
    {
      id: "claim-minimal-theme",
      kind: "fact",
      text: "Minimal (2020–2024) is his open-source, distraction-free Obsidian theme for customizing the app's writing interface.",
      sourceIds: [S.projects, S.kepanoCeo],
    },
    {
      id: "claim-defuddle",
      kind: "fact",
      text: "Defuddle (2025) is his open-source library that extracts the main content from web pages.",
      sourceIds: [S.projects],
    },
    {
      id: "claim-knap",
      kind: "fact",
      text: "Knap (2026) is his open-source template language that turns data into Markdown.",
      sourceIds: [S.projects],
    },
    {
      id: "claim-well-made",
      kind: "fact",
      text: "He hosted Well Made (2016–2021), a 152-episode Lumi podcast about changing patterns of consumption, with guests from organizations including Patagonia, Shopify, Etsy, and The Wall Street Journal.",
      sourceIds: [S.projects, S.futureCommerce],
    },
    {
      id: "claim-computer-show",
      kind: "fact",
      text: "In 2015 he co-created Computer Show, a retro-comedy YouTube series about computers.",
      sourceIds: [S.projects, S.about],
    },
    {
      id: "claim-winamp-skins",
      kind: "fact",
      text: "His earliest cataloged projects are Winamp skins: Rusty Heaven (2002) and devASTATE (2003) pixel-art skins for Winamp 2, and the Impulse skin (2004) showcasing Winamp 5's freeform capabilities.",
      sourceIds: [S.projects, S.otherStuff],
    },
    {
      id: "claim-site-stack",
      kind: "fact",
      text: "His site is written and edited in Obsidian, compiled into web pages with Jekyll, hosted on Netlify, and colored with his own Flexoki palette.",
      sourceIds: [S.about],
    },
    {
      id: "claim-no-user-count",
      kind: "fact",
      text: "On Decoder he said he does not know how many users Obsidian has or how sticky the software is — an unusual position for a software CEO.",
      sourceIds: [S.decoder],
    },
    {
      id: "claim-file-over-app-belief",
      kind: "stated_belief",
      text: "His 'File over app' philosophy holds that lasting digital artifacts must be files you control, in formats that are easy to retrieve and read: apps are ephemeral, but files have a chance to last.",
      sourceIds: [S.fileOverApp],
    },
    {
      id: "claim-1960s-test",
      kind: "stated_belief",
      text: "His durability test: 'If you want your writing to still be readable on a computer from the 2060s or 2160s, it's important that your notes can be read on a computer from the 1960s.'",
      sourceIds: [S.fileOverApp],
    },
    {
      id: "claim-vcware",
      kind: "stated_belief",
      text: "He calls venture-backed software 'VCware': built on a five-year horizon, subsidizing pricing while hoarding user data and locking in customers, and forced eventually to exit — and argues tiny principled teams can now reach millions of users without investors.",
      sourceIds: [S.vcware],
    },
    {
      id: "claim-constraint-style",
      kind: "stated_belief",
      text: "'Style is consistent constraint': he treats self-imposed limits — from Winamp's pixel bounds to sub-500-word essays — as the engine that makes work recognizable and repeatable.",
      sourceIds: [S.dialectic, S.projects],
    },
    {
      id: "claim-evergreen-notes",
      kind: "stated_belief",
      text: "Following Andy Matuschak's coinage, he keeps 'evergreen notes' that distill ideas into titled, composable objects which can be manipulated, combined, and stacked.",
      sourceIds: [S.evergreen],
    },
    {
      id: "claim-community-over-ai",
      kind: "stated_belief",
      text: "He argues productivity tools need community more than they need AI — Obsidian's strength is its generous community rather than a feature race.",
      sourceIds: [S.decoder],
    },
    {
      id: "claim-toolmaker",
      kind: "stated_belief",
      text: "He sees himself as a toolmaker: building deeply opinionated tools designed to reduce friction for himself and others in the act of creating.",
      sourceIds: [S.dialectic],
    },
    {
      id: "claim-superpower",
      kind: "stated_belief",
      text: "He calls Obsidian 'life-changing' — 'it has fundamentally improved the way I think' — and says his goal as CEO is to see what happens if more people gain that superpower.",
      sourceIds: [S.kepanoCeo, S.decoder],
    },
    {
      id: "claim-pattern-own-tools",
      kind: "pattern",
      text: "Across two decades he builds the tools he wants to use — Winamp skins, Inkodye's app, Minimal, Flexoki, Web Clipper, Defuddle — then releases them free or open-source.",
      sourceIds: [S.projects, S.decoder, S.dialectic],
    },
    {
      id: "claim-pattern-hybridize",
      kind: "pattern",
      text: "His career refuses specialization: dye chemistry, industrial design, packaging supply chain, podcasting, software, and short-form writing are treated as one continuous practice.",
      sourceIds: [S.dialectic, S.labj, S.projects],
    },
    {
      id: "claim-pattern-scratch-itch",
      kind: "pattern",
      text: "His companies and tools start from his own needs: Lumi grew out of Inkodye's supply-chain pain, and Web Clipper out of his own archiving workflow.",
      sourceIds: [S.lumiPage, S.saveTheWeb],
    },
    {
      id: "claim-pattern-brevity",
      kind: "pattern",
      text: "Nearly every essay on his site is labeled a '1 minute read' — concision as an editorial constraint, typically under about 500 words.",
      sourceIds: [S.dialectic, S.fileOverApp],
    },
    {
      id: "claim-ceo-date-discrepancy",
      kind: "speculation",
      text: "The CEO start date is inconsistently recorded: the announcement post is dated February 6, 2023, while Wikidata lists a start time of February 6, 2024 — likely a year typo in the structured record.",
      sourceIds: [S.kepanoCeo, S.wikidata],
    },
    {
      id: "claim-third-largest-kickstarter",
      kind: "speculation",
      text: "His site calls the 2009 campaign 'the third largest online crowd-funding campaign ever' at that time — a superlative that independent coverage supports only as 'an early success' for the platform.",
      sourceIds: [S.inkodyePage, S.wikipediaLumi],
    },
  ],
  timeline: [
    {
      id: "event-winamp-skins",
      kind: "project",
      date: "2002",
      end: "2004",
      title: "Publishes Winamp skins as a teenager-era designer",
      summary:
        "Rusty Heaven, devASTATE, and Impulse — pixel-art and freeform skins that taught him to design inside hard constraints.",
      sourceIds: [S.projects, S.otherStuff],
    },
    {
      id: "event-inkodye",
      kind: "founded",
      date: "2009",
      title: "Co-founds Inkodye with Jesse Genet",
      summary:
        "Photo-sensitive dyes for printing on fabric with sunlight; the December 2009 Kickstarter raised $13,597 and won Best Design Project of 2010.",
      organization: "Inkodye / Lumi",
      organizationHandle: "inkodye-lumi",
      location: "Los Angeles, California",
      sourceIds: [S.inkodyePage, S.wikipediaLumi, S.labj],
    },
    {
      id: "event-kickstarter-2012",
      kind: "milestone",
      date: "2012",
      title: "Second Kickstarter raises $268,437",
      summary:
        "Solar-powered printing kits funded at more than 500% of the $50,000 goal; retail distribution followed through Urban Outfitters and JoAnn Fabrics.",
      sourceIds: [S.wikipediaLumi, S.labj],
    },
    {
      id: "event-lumi",
      kind: "founded",
      date: "2015",
      title: "Co-founds Lumi",
      summary:
        "A Y Combinator-backed software platform connecting brands with packaging manufacturers, born from Inkodye's supply-chain difficulties.",
      organization: "Lumi",
      organizationHandle: "lumi",
      location: "Los Angeles, California",
      sourceIds: [S.lumiPage, S.wikipediaLumi, S.labj],
    },
    {
      id: "event-computer-show",
      kind: "media",
      date: "2015",
      title: "Computer Show",
      summary: "A retro-comedy YouTube series about computers.",
      sourceIds: [S.projects, S.about],
    },
    {
      id: "event-well-made",
      kind: "media",
      date: "2016",
      end: "2021",
      title: "Hosts the Well Made podcast",
      summary:
        "152 episodes on changing patterns of consumption, produced under Lumi.",
      sourceIds: [S.projects, S.futureCommerce],
    },
    {
      id: "event-series-a",
      kind: "milestone",
      date: "2018",
      title: "Lumi raises a $9 million Series A",
      sourceIds: [S.businessInsider],
    },
    {
      id: "event-minimal",
      kind: "project",
      date: "2020",
      title: "Releases Minimal theme and Hider plugin for Obsidian",
      summary:
        "Community contributions that made him a known figure in the Obsidian ecosystem; he also contributed to Obsidian 1.0's default theme.",
      sourceIds: [S.projects, S.kepanoCeo, S.lyt],
    },
    {
      id: "event-narvar",
      kind: "milestone",
      date: "2021-12-15",
      title: "Narvar acquires Lumi",
      summary:
        "Terms undisclosed; Lumi then served more than 700 direct-to-consumer brands.",
      organization: "Narvar",
      organizationHandle: "narvar",
      sourceIds: [S.narvar, S.businessInsider],
    },
    {
      id: "event-obsidian-ceo",
      kind: "role",
      date: "2023-02-06",
      title: "Joins Obsidian full-time as CEO",
      summary:
        "Brought in by cofounders Shida Li and Erica Xu after years as a community contributor.",
      organization: "Obsidian",
      organizationHandle: "obsidian",
      sourceIds: [S.kepanoCeo, S.decoder],
    },
    {
      id: "event-file-over-app",
      kind: "publication",
      date: "2023-07-01",
      title: "Publishes 'File over app'",
      summary:
        "His most influential essay: a philosophy of owning durable files in open formats.",
      sourceIds: [S.fileOverApp],
    },
    {
      id: "event-json-canvas",
      kind: "project",
      date: "2024-03-11",
      title: "Announces JSON Canvas",
      summary:
        "The open, MIT-licensed .canvas format for infinite canvas data, with spec and resources at jsoncanvas.org.",
      sourceIds: [S.jsonCanvas, S.projects],
    },
    {
      id: "event-web-clipper",
      kind: "project",
      date: "2024-11-11",
      title: "Introduces Obsidian Web Clipper",
      summary:
        "An open-source browser extension that saves and highlights web pages as durable Markdown files.",
      sourceIds: [S.saveTheWeb, S.projects],
    },
    {
      id: "event-knap",
      kind: "project",
      date: "2026",
      title: "Releases Knap",
      summary:
        "An open-source template language that turns data into Markdown, following Defuddle (2025).",
      sourceIds: [S.projects],
    },
  ],
  themes: [
    {
      id: "theme-file-over-app",
      kind: "philosophy",
      status: "stated",
      title: "File over app",
      summary:
        "Apps are ephemeral; files can last. Durable digital artifacts must be files you control in open, retrievable formats — a promise he calls self-guaranteeing because you can verify it by opening the same files in another app.",
      sourceIds: [S.fileOverApp, S.jsonCanvas, S.saveTheWeb],
    },
    {
      id: "theme-constraint",
      kind: "method",
      status: "stated",
      title: "Constraint as the creative engine",
      summary:
        "From Winamp's pixel bounds to one-minute essays: 'style is consistent constraint.' He deliberately adds forceful constraints to his process and treats them as the canvas to experiment within.",
      sourceIds: [S.dialectic, S.projects],
    },
    {
      id: "theme-user-supported",
      kind: "belief",
      status: "stated",
      title: "100% user-supported, against VCware",
      summary:
        "Obsidian takes no investor money so no one can push it to compromise. 'VCware' — venture-backed software on a five-year horizon — subsidizes pricing, hoards data, locks in users, and must exit; tiny principled teams can now do better without it.",
      sourceIds: [S.vcware, S.kepanoCeo],
    },
    {
      id: "theme-toolmaker",
      kind: "method",
      status: "stated",
      title: "The opinionated toolmaker",
      summary:
        "He builds tools that remove friction in the act of creating — usually for himself first, then released free or open-source: Minimal, Hider, Flexoki, Defuddle, Web Clipper, Knap.",
      sourceIds: [S.dialectic, S.projects, S.decoder],
    },
    {
      id: "theme-hybridize",
      kind: "belief",
      status: "stated",
      title: "Don't specialize, hybridize",
      summary:
        "Biology, chemistry, industrial design, supply chain, software, writing, furniture, and cooking form one practice. Interviewers describe him as a multi-hyphenate who pushes 'too far' into whatever he explores.",
      sourceIds: [S.dialectic, S.otherStuff, S.labj],
    },
    {
      id: "theme-evergreen-thinking",
      kind: "method",
      status: "stated",
      title: "Notes as manipulable idea-objects",
      summary:
        "Evergreen notes distill ideas into titled objects that can be linked, stacked, and combined — the mechanism behind both his Obsidian use and his writing practice.",
      sourceIds: [S.evergreen, S.about],
    },
    {
      id: "theme-analog-digital",
      kind: "interest",
      status: "stated",
      title: "Analog craft on digital screens",
      summary:
        "Sunlight dyes, printing inks, furniture design, and recipes inform his digital work — Flexoki exists to bring the comfort of ink on paper to emissive screens.",
      sourceIds: [S.about, S.otherStuff, S.inkodyePage],
    },
    {
      id: "theme-community",
      kind: "belief",
      status: "stated",
      title: "Community over feature races",
      summary:
        "He argues productivity tools need community more than they need AI; Obsidian's kind, generous community is the asset to protect, not a checklist of features.",
      sourceIds: [S.decoder, S.kepanoCeo],
    },
  ],
  works: [
    {
      id: "work-obsidian",
      kind: "product",
      status: "ongoing",
      title: "Obsidian",
      date: "2023",
      summary:
        "The private, local-first writing app he has led as CEO since February 2023; free to use, 100% user-supported, built on durable Markdown files.",
      sourceIds: [S.kepanoCeo, S.decoder],
    },
    {
      id: "work-inkodye",
      kind: "product",
      status: "completed",
      title: "Inkodye",
      date: "2009",
      summary:
        "Photo-sensitive vat dye for printing on fabric with sunlight, co-founded with Jesse Genet; two successful Kickstarters, a Shark Tank appearance, and over a million prints made by users.",
      location: "Los Angeles, California",
      sourceIds: [S.inkodyePage, S.wikipediaLumi, S.labj],
    },
    {
      id: "work-lumi",
      kind: "project",
      status: "completed",
      title: "Lumi",
      date: "2015",
      summary:
        "Y Combinator-backed packaging supply-chain platform co-founded with Jesse Genet; served 700+ direct-to-consumer brands and was acquired by Narvar in December 2021.",
      location: "Los Angeles, California",
      sourceIds: [S.lumiPage, S.narvar, S.businessInsider],
    },
    {
      id: "work-well-made",
      kind: "recording",
      status: "completed",
      title: "Well Made",
      date: "2016",
      summary:
        "152-episode podcast he hosted for Lumi on changing patterns of consumption, with guests from Patagonia, Shopify, Etsy, and The Wall Street Journal.",
      sourceIds: [S.projects, S.futureCommerce],
    },
    {
      id: "work-computer-show",
      kind: "film",
      status: "released",
      title: "Computer Show",
      date: "2015",
      summary: "Retro-comedy YouTube series about computers.",
      sourceIds: [S.projects, S.about],
    },
    {
      id: "work-winamp-skins",
      kind: "design",
      status: "released",
      title: "Winamp skins: Rusty Heaven, devASTATE, Impulse",
      date: "2002",
      summary:
        "Pixel-art and freeform player skins from 2002–2004 — his earliest cataloged design work and his training ground for constraint-driven design.",
      sourceIds: [S.projects, S.otherStuff],
    },
    {
      id: "work-minimal",
      kind: "design",
      status: "released",
      title: "Minimal",
      date: "2020",
      summary:
        "Open-source, distraction-free Obsidian theme (2020–2024) that made him a prominent community contributor before he became CEO.",
      sourceIds: [S.projects, S.kepanoCeo, S.lyt],
    },
    {
      id: "work-hider",
      kind: "project",
      status: "released",
      title: "Obsidian Hider",
      date: "2020",
      summary:
        "Obsidian plugin to hide UI elements such as tooltips, the status bar, and instructions.",
      sourceIds: [S.projects],
    },
    {
      id: "work-flexoki",
      kind: "design",
      status: "released",
      title: "Flexoki",
      date: "2023",
      summary:
        "An 'inky', MIT-licensed color scheme for prose and code, designed for his site and ported to dozens of apps.",
      sourceIds: [S.about, S.projects],
    },
    {
      id: "work-file-over-app",
      kind: "other",
      status: "published",
      title: "File over app",
      date: "2023-07-01",
      summary:
        "His best-known essay — a one-minute manifesto for owning durable files in open formats.",
      sourceIds: [S.fileOverApp],
    },
    {
      id: "work-json-canvas",
      kind: "project",
      status: "released",
      title: "JSON Canvas",
      date: "2024-03-11",
      summary:
        "Open, MIT-licensed .canvas file format for infinite canvas data, with its own spec and site at jsoncanvas.org.",
      sourceIds: [S.jsonCanvas, S.projects],
    },
    {
      id: "work-web-clipper",
      kind: "product",
      status: "released",
      title: "Obsidian Web Clipper",
      date: "2024-11-11",
      summary:
        "Open-source browser extension that highlights and saves web pages as durable Markdown files in Obsidian.",
      sourceIds: [S.saveTheWeb, S.projects],
    },
    {
      id: "work-defuddle",
      kind: "project",
      status: "released",
      title: "Defuddle",
      date: "2025",
      summary:
        "Open-source library that extracts the main content from web pages.",
      sourceIds: [S.projects],
    },
    {
      id: "work-knap",
      kind: "project",
      status: "released",
      title: "Knap",
      date: "2026",
      summary:
        "Open-source template language that turns data into Markdown.",
      sourceIds: [S.projects],
    },
    {
      id: "work-slash-packaging",
      kind: "project",
      status: "released",
      title: "Slash Packaging",
      date: "2020",
      summary:
        "An open-source movement for brands sharing packaging-waste commitments on the /packaging page of their sites.",
      sourceIds: [S.projects, S.lumiPage],
    },
  ],
  appearances: [
    {
      id: "appearance-decoder",
      title: "How the head of Obsidian went from superfan to CEO",
      venue: "Decoder (The Verge)",
      publishedAt: "2025-08-18",
      participants: ["Steph Ango", "Casey Newton"],
      summary:
        "A Decoder episode on running Obsidian without investor pressure or usage metrics, why community matters more than AI, and his path from superfan to CEO.",
      media: [
        {
          type: "article",
          url: "https://www.theverge.com/decoder-podcast-with-nilay-patel/760522/obsidian-ceo-steph-ango-kepano-productivity-software-notes-app",
          sourceId: S.decoder,
        },
      ],
      sourceIds: [S.decoder],
    },
    {
      id: "appearance-dialectic",
      title: "Tools for Amplifying Our Light",
      venue: "Dialectic with Jackson Dahl",
      publishedAt: "2025-02-03",
      participants: ["Steph Ango", "Jackson Dahl"],
      summary:
        "A nearly three-hour walk through his essays and methods: constraint and style, evergreen notes, 'file over app,' and building Obsidian with ideology as a constraint.",
      media: [
        {
          type: "article",
          url: "https://jacksondahl.com/dialectic/steph-ango",
          sourceId: S.dialectic,
        },
      ],
      sourceIds: [S.dialectic],
    },
    {
      id: "appearance-other-stuff",
      title: "Kepano: The Interconnectedness of Everything",
      venue: "The Other Stuff Show",
      publishedAt: "2025-12-09",
      participants: ["Steph Ango", "internetVin"],
      summary:
        "A three-hour-plus conversation from Winamp skins to leading Obsidian, with demos of his furniture design and a piano-learning app, plus his chocolate-chip cookie recipe.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=J8vec3BuOnk",
          sourceId: S.otherStuff,
        },
      ],
      sourceIds: [S.otherStuff],
    },
    {
      id: "appearance-lyt",
      title: "Fireside Chat with @kepano, CEO of Obsidian",
      venue: "Linking Your Thinking Conference 3",
      publishedAt: "2023",
      participants: ["Steph Ango", "Nick Milo"],
      summary:
        "A fireside chat on how he got involved with Obsidian, how the team uses it, and what will remain true about the app going forward.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=i8SWe0YrVWI",
          sourceId: S.lyt,
        },
      ],
      sourceIds: [S.lyt],
    },
    {
      id: "appearance-future-commerce",
      title: "\"Well Made\": You Need to Have a Reason Why Something Should Exist",
      venue: "Future Commerce",
      publishedAt: "2021-04-16",
      participants: ["Steph Ango", "Phillip Jackson"],
      summary:
        "A Lumi-era conversation on customer expectations, sampling behavior, and applying software-world thinking to the physical world.",
      media: [
        {
          type: "audio",
          url: "https://futurecommerce.fm/podcasts/202-well-made-you-need-to-have-a-reason-why-something-should-exist",
          sourceId: S.futureCommerce,
        },
      ],
      sourceIds: [S.futureCommerce],
    },
  ],
  relations: [
    {
      id: "rel-obsidian",
      kind: "employed_by",
      target: "obsidian",
      targetName: "Obsidian",
      targetKind: "organization",
      note:
        "Joined full-time as CEO on February 6, 2023 — brought in by cofounders Shida Li and Erica Xu after years as a community contributor; he is not a cofounder.",
      start: "2023-02-06",
      targetWikidataId: "Q103994532",
      sourceIds: [S.kepanoCeo, S.decoder],
    },
    {
      id: "rel-lumi",
      kind: "founded",
      target: "lumi",
      targetName: "Lumi",
      targetKind: "organization",
      note:
        "Co-founded the Y Combinator–backed packaging platform in 2015, born from Inkodye's supply-chain difficulties; Narvar acquired it in December 2021.",
      start: "2015",
      end: "2021-12",
      sourceIds: [S.lumiPage, S.wikipediaLumi, S.labj, S.narvar],
    },
    {
      id: "rel-inkodye",
      kind: "founded",
      target: "inkodye",
      targetName: "Inkodye",
      targetKind: "organization",
      note:
        "Co-founded the light-sensitive dye company with Jesse Genet in 2009; its Kickstarter won Best Design Project of 2010.",
      start: "2009",
      sourceIds: [S.inkodyePage, S.wikipediaLumi, S.labj],
    },
    {
      id: "rel-jesse-genet",
      kind: "cofounder",
      target: "jesse-genet",
      targetName: "Jesse Genet",
      note: "His Inkodye cofounder in 2009.",
      start: "2009",
      targetWikidataId: "Q78172295",
      sourceIds: [S.inkodyePage, S.wikipediaLumi, S.labj],
    },
    {
      id: "rel-y-combinator",
      kind: "funded_by",
      target: "y-combinator",
      targetName: "Y Combinator",
      targetKind: "organization",
      note: "Backed Lumi, the packaging platform he co-founded in 2015.",
      start: "2015",
      targetWikidataId: "Q2616400",
      sourceIds: [S.lumiPage],
    },
    {
      id: "rel-narvar",
      kind: "other",
      target: "narvar",
      targetName: "Narvar",
      targetKind: "organization",
      note:
        "Acquired Lumi in December 2021, when the platform served more than 700 direct-to-consumer brands; terms undisclosed.",
      start: "2021-12",
      sourceIds: [S.narvar, S.businessInsider],
    },
    {
      id: "rel-shida-li",
      kind: "other",
      target: "shida-li",
      targetName: "Shida Li",
      note: "Obsidian cofounder who, with Erica Xu, brought him in as CEO in 2023.",
      start: "2023",
      targetWikidataId: "Q124736688",
      sourceIds: [S.kepanoCeo, S.decoder],
    },
    {
      id: "rel-erica-xu",
      kind: "other",
      target: "erica-xu",
      targetName: "Erica Xu",
      note: "Obsidian cofounder who, with Shida Li, brought him in as CEO in 2023.",
      start: "2023",
      targetWikidataId: "Q124736683",
      sourceIds: [S.kepanoCeo, S.decoder],
    },
    {
      id: "rel-casey-newton",
      kind: "interviewed_by",
      target: "casey-newton",
      targetName: "Casey Newton",
      note: "Decoder (The Verge) interview, August 2025 — 'How the head of Obsidian went from superfan to CEO.'",
      start: "2025-08",
      targetWikidataId: "Q78906087",
      sourceIds: [S.decoder],
    },
    {
      id: "rel-jackson-dahl",
      kind: "interviewed_by",
      target: "jackson-dahl",
      targetName: "Jackson Dahl",
      note: "Dialectic interview 'Tools for Amplifying Our Light,' February 2025 — nearly three hours on his essays and methods.",
      start: "2025-02",
      sourceIds: [S.dialectic],
    },
    {
      id: "rel-internetvin",
      kind: "interviewed_by",
      target: "internetvin",
      targetName: "internetVin",
      note: "The Other Stuff Show, December 2025 — a three-hour-plus conversation from Winamp skins to leading Obsidian.",
      start: "2025-12",
      sourceIds: [S.otherStuff],
    },
    {
      id: "rel-nick-milo",
      kind: "interviewed_by",
      target: "nick-milo",
      targetName: "Nick Milo",
      note: "Fireside chat at Linking Your Thinking Conference 3, 2023.",
      start: "2023",
      sourceIds: [S.lyt],
    },
    {
      id: "rel-phillip-jackson",
      kind: "interviewed_by",
      target: "phillip-jackson",
      targetName: "Phillip Jackson",
      note: "Future Commerce 'Well Made' conversation, April 2021 — Lumi-era, on applying software-world thinking to the physical world.",
      start: "2021-04",
      sourceIds: [S.futureCommerce],
    },
  ],
  openQuestions: [
    "The CEO start date disagrees across records: the announcement post is dated February 6, 2023 and his site says February 2023, but Wikidata lists February 6, 2024.",
    "His birth date, birthplace, and early life are not documented in the cited public record — the catalog begins with his design work in the early 2000s.",
    "The claim that the 2009 Kickstarter was 'the third largest online crowd-funding campaign ever' at the time is self-reported; independent coverage confirms only that it was an early platform success.",
    "What he did between the December 2021 Narvar acquisition and the February 2023 Obsidian announcement is only sketched — his projects page lists Lumi through 2022 without detailing the transition.",
    "The origin and meaning of the handle 'kepano' is discussed in interviews (The Other Stuff devotes a segment to it) but is not documented in the cited text sources.",
  ],
  body: `Steph Ango — better known online as *kepano* — is the CEO of Obsidian, the private, local-first writing app built on plain-text Markdown files. His route to the job is unusual: he is not one of Obsidian's founders. He was a superfan — a designer and entrepreneur who used the app from its first release in 2020, built some of its most popular community tools, and was then brought in by cofounders Shida Li and Erica Xu to run the company. His own catalog stretches back further: Winamp skins, a sunlight-powered dye company, a venture-backed supply-chain startup, a 152-episode podcast, and a body of deliberately short essays that culminated in "File over app," the closest thing the note-taking world has to a manifesto.

## From Winamp skins to sunlight dyes

The earliest entries in his project catalog are Winamp skins — Rusty Heaven (2002), devASTATE (2003), and Impulse (2004), a freeform skin for Winamp 5. On Dialectic he described squeezing animations into twelve pixels of slider as formative: the constraints were where the creativity came from. His education is in biology and industrial design; the Los Angeles Business Journal described his background as biology and chemistry.

In 2008 he met Jesse Genet, then an industrial-design student at Art Center College of Design in Pasadena. Together they acquired a 1950s-era light-sensitive dye formula and modernized it into Inkodye — a vat dye that prints photographs onto fabric using sunlight. Their December 2009 Kickstarter raised $13,597 and later won Kickstarter's Best Design Project of 2010; his site calls it, at the time, the third-largest crowdfunding campaign ever. A 2012 follow-up raised $268,437 against a $50,000 goal. More than a million prints were made with Inkodye at home, sold through Urban Outfitters and JoAnn Fabrics, and the company appeared on ABC's Shark Tank in February 2015 — drawing two offers, both declined.

## Lumi and the packaging years

Building Inkodye's supply chain by hand taught them how hard it was for brands to find and work with factories. In 2015 the pair founded Lumi, a Y Combinator-backed software platform for packaging procurement, with Ango as cofounder and chief product officer. Lumi raised a $9 million Series A in 2018 and grew to serve more than 700 direct-to-consumer brands — Parachute, Nutrafol, Misfits Market — before Narvar announced its acquisition on December 15, 2021, on undisclosed terms.

The Lumi years doubled as a media apprenticeship. He co-created *Computer Show* (2015), a deadpan retro-comedy YouTube series, and hosted *Well Made* (2016–2021), Lumi's 152-episode podcast on changing consumption patterns. He also launched Slash Packaging, an open-source push for brands to publish their packaging commitments.

## From superfan to CEO

Ango used Obsidian from its first release, during the pandemic, because its data lived in durable Markdown files he controlled. He built the Minimal theme, the Hider plugin, and contributed to Obsidian 1.0's default theme — work done for himself and released free, which is how the founders noticed him. On February 6, 2023, he announced he was joining full-time as CEO, committing the app to remain free to use, private, offline-first, endlessly customizable — and "100% user-supported," with no investors to compromise those values.

His framing for the job is missionary rather than managerial: Obsidian "fundamentally improved the way I think," he wrote in the announcement, "I want to see what happens if more people gain that superpower." On The Verge's Decoder in August 2025 he explained the resulting oddities: he does not know how many users Obsidian has or how sticky it is, and he argues productivity tools need community more than they need AI. Under his tenure the company has shipped JSON Canvas (March 2024), an open .canvas spec for infinite-canvas data, and Web Clipper (November 2024), an open-source extension that saves web pages as durable Markdown — alongside his own libraries Defuddle and the template language Knap.

## File over app

His July 2023 essay "File over app" condenses the worldview: if you want digital artifacts that last, they must be files you control in formats easy to retrieve and read — apps are ephemeral, but files have a chance to last. His test is temporal symmetry: writing readable on a computer from the 2060s should be readable on one from the 1960s. He practices it literally — his site is written in Obsidian, compiled by Jekyll, hosted on Netlify, and colored by Flexoki, the "inky" MIT-licensed palette he created to bring analog ink-and-paper warmth to emissive screens.

## The throughline

Read across two decades, the pattern is a toolmaker who hybridizes rather than specializes. Dye chemistry informs color science; supply-chain software informs plugin architecture; "style is consistent constraint" covers Winamp pixels and one-minute essays alike. He builds what he needs — from Inkodye's app to Web Clipper — then gives it away. And he keeps the loop unusually literal: the essays defending plain-text longevity are themselves plain-text Obsidian notes, compiled into the site you are reading them on.

## What the record does not settle

The public record is thin on biography: no birth date or early life appears in the cited sources, and the CEO start date itself is recorded inconsistently (February 2023 in the announcement and on his site; February 6, 2024 in Wikidata). The "third-largest crowdfunding campaign" superlative is self-reported. And the two years between the Narvar acquisition and the Obsidian announcement — including whatever transitional role he held — are sketched rather than documented. The index preserves those seams rather than smoothing them over.

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
