#!/usr/bin/env bun
/** Generate examples/people/mitchell-hashimoto/person-index.json with derived source ids. */

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

const mhHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Mitchell Hashimoto",
  url: "https://mitchellh.com/",
  publisher: "mitchellh.com",
  notes: "The subject's own homepage; claims here are self-reported.",
});
const ghosttyOrg = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Ghostty",
  url: "https://ghostty.org/",
  publisher: "Ghostty",
  notes:
    "Official site of the terminal emulator he started; since December 2025 the project is fiscally sponsored by the Hack Club 501(c)(3) and he remains project lead.",
});
const mhAutomation = source({
  binding: "first_person",
  mediaType: "article",
  title: "Automation Obsessed",
  url: "https://mitchellh.com/writing/automation-obsessed",
  publisher: "mitchellh.com",
  publishedAt: "2013-06-06",
  authors: ["Mitchell Hashimoto"],
  notes: "Early essay on why he builds automation software.",
});
const mhBuilding = source({
  binding: "first_person",
  mediaType: "article",
  title: "My Approach to Building Large Technical Projects",
  url: "https://mitchellh.com/writing/building-large-technical-projects",
  publisher: "mitchellh.com",
  publishedAt: "2023-06-01",
  authors: ["Mitchell Hashimoto"],
  notes:
    "His method essay: order work to see tangible progress, sprint to demos, and daily-drive your own software.",
});
const mhZigTalk = source({
  binding: "first_person",
  mediaType: "article",
  title: "Talk: Introducing Ghostty and Some Useful Zig Patterns",
  url: "https://mitchellh.com/writing/ghostty-and-useful-zig-patterns",
  publisher: "mitchellh.com",
  publishedAt: "2023-09-12",
  authors: ["Mitchell Hashimoto"],
  notes: "Text version of his Zig Showtime talk; the first detailed public description of Ghostty.",
});
const mhGhostty10 = source({
  binding: "first_person",
  mediaType: "article",
  title: "Ghostty: Reflecting on Reaching 1.0",
  url: "https://mitchellh.com/writing/ghostty-1-0-reflection",
  publisher: "mitchellh.com",
  publishedAt: "2024-12-26",
  authors: ["Mitchell Hashimoto"],
  notes: "Personal reflection published the day Ghostty 1.0 became public.",
});
const mhNonProfit = source({
  binding: "first_person",
  mediaType: "article",
  title: "Ghostty Is Now Non-Profit",
  url: "https://mitchellh.com/writing/ghostty-non-profit",
  publisher: "mitchellh.com",
  publishedAt: "2025-12-03",
  authors: ["Mitchell Hashimoto"],
  notes:
    "Announces Hack Club fiscal sponsorship and explains why he wants terminal infrastructure stewarded by a non-commercial entity.",
});
const mhSuperlogical = source({
  binding: "first_person",
  mediaType: "article",
  title: "Superlogical",
  url: "https://mitchellh.com/writing/superlogical",
  publisher: "mitchellh.com",
  publishedAt: "2026-07-29",
  authors: ["Mitchell Hashimoto"],
  notes: "Announces his new company; also recaps his post-HashiCorp years and Ghostty's scale.",
});
const hcDeparture = source({
  binding: "first_person",
  mediaType: "article",
  title: "Mitchell reflects as he departs HashiCorp",
  url: "https://www.hashicorp.com/blog/mitchell-reflects-as-he-departs-hashicorp",
  publisher: "HashiCorp",
  publishedAt: "2023-12-14",
  authors: ["Mitchell Hashimoto"],
  notes: "His farewell letter to employees, republished on the company blog.",
});
const oreilly = source({
  binding: "first_person",
  mediaType: "book",
  title: "Vagrant: Up and Running",
  url: "https://www.oreilly.com/library/view/vagrant-up-and/9781449336103/",
  publisher: "O'Reilly Media",
  publishedAt: "2013-06",
  authors: ["Mitchell Hashimoto"],
});
const hcBsl = source({
  binding: "primary_record",
  mediaType: "article",
  title: "HashiCorp adopts Business Source License",
  url: "https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license",
  publisher: "HashiCorp",
  publishedAt: "2023-08-10",
  notes:
    "Company announcement of the MPL 2.0 to BUSL 1.1 relicensing of all future releases of its products.",
});
const ibmAnnounce = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "IBM to Acquire HashiCorp, Inc. Creating a Comprehensive End-to-End Hybrid Cloud Platform",
  url: "https://newsroom.ibm.com/2024-04-24-IBM-to-Acquire-HashiCorp-Inc-Creating-a-Comprehensive-End-to-End-Hybrid-Cloud-Platform",
  publisher: "IBM Newsroom",
  publishedAt: "2024-04-24",
  notes: "Official announcement: $35 per share in cash, $6.4 billion enterprise value.",
});
const ibmComplete = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "IBM Completes Acquisition of HashiCorp, Creates Comprehensive, End-to-End Hybrid Cloud Platform",
  url: "https://newsroom.ibm.com/2025-02-27-ibm-completes-acquisition-of-hashicorp,-creates-comprehensive,-end-to-end-hybrid-cloud-platform",
  publisher: "IBM Newsroom",
  publishedAt: "2025-02-27",
});
const secProspectus = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "HashiCorp, Inc. Form 424B4 (IPO prospectus)",
  url: "https://www.sec.gov/Archives/edgar/data/1720671/000119312521352796/d205906d424b4.htm",
  publisher: "U.S. Securities and Exchange Commission",
  publishedAt: "2021-12-08",
  notes:
    "Final IPO prospectus: 15,300,000 shares of Class A common stock at $80.00 per share, Nasdaq symbol HCP.",
});
const changelog72 = source({
  binding: "interview",
  mediaType: "audio",
  title: "Vagrant and virtualized environments (Changelog Interviews #72)",
  url: "https://changelog.com/podcast/72",
  publisher: "The Changelog",
  publishedAt: "2012-02-09",
  authors: ["Wynn Netherland"],
  notes: "His first Changelog appearance, recorded just after Vagrant 1.0-era momentum began.",
});
const sedHashi = source({
  binding: "interview",
  mediaType: "audio",
  title: "Scaling HashiCorp with Armon Dadgar and Mitchell Hashimoto",
  url: "https://softwareengineeringdaily.com/podcasts/scaling-hashicorp-with-armon-dagdar-and-mitchell-hashimoto/",
  publisher: "Software Engineering Daily",
  publishedAt: "2019-02-04",
  authors: ["Jeff Meyerson"],
  notes: "Both co-founders discuss HashiCorp's business model and product philosophy.",
});
const changelog622 = source({
  binding: "interview",
  mediaType: "audio",
  title: "We ain't afraid of no Ghostty! (Changelog Interviews #622)",
  url: "https://changelog.com/podcast/622",
  publisher: "The Changelog",
  publishedAt: "2024-12-18",
  authors: ["Jerod Santo", "Adam Stacoviak"],
  notes:
    "Recorded December 12, 2024, two weeks before Ghostty 1.0 went public; covers the project's origins, the private beta, and his post-HashiCorp life.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Mitchell Hashimoto (Q65554184)",
  url: "https://www.wikidata.org/wiki/Q65554184",
  publisher: "Wikidata",
  notes:
    "No Wikipedia sitelinks exist for the subject; structured-data record used for dates, education, and identifiers.",
});
const sdtimes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Mitchell Hashimoto is automating the world",
  url: "https://sdtimes.com/atlas/mitchell-hashimoto-hashicorp-vagrant-atlas-automate-world/",
  publisher: "SD Times",
  publishedAt: "2015-02-26",
  authors: ["Rob Marvin"],
  notes:
    "In-depth profile covering his childhood programming, UW Robot, the Vagrant origin flight, and the early HashiCorp years.",
});
const lwn = source({
  binding: "reporting",
  mediaType: "article",
  title: "Ghostty 1.0 has been summoned",
  url: "https://lwn.net/Articles/1004377/",
  publisher: "LWN.net",
  publishedAt: "2025-01",
  authors: ["Joe Brockmeier"],
  notes:
    "Technical review of the public Ghostty 1.0 release with details on the private beta's scale.",
});

const S = {
  mhHome: mhHome.id,
  ghosttyOrg: ghosttyOrg.id,
  mhAutomation: mhAutomation.id,
  mhBuilding: mhBuilding.id,
  mhZigTalk: mhZigTalk.id,
  mhGhostty10: mhGhostty10.id,
  mhNonProfit: mhNonProfit.id,
  mhSuperlogical: mhSuperlogical.id,
  hcDeparture: hcDeparture.id,
  oreilly: oreilly.id,
  hcBsl: hcBsl.id,
  ibmAnnounce: ibmAnnounce.id,
  ibmComplete: ibmComplete.id,
  secProspectus: secProspectus.id,
  changelog72: changelog72.id,
  sedHashi: sedHashi.id,
  changelog622: changelog622.id,
  wikidata: wikidata.id,
  sdtimes: sdtimes.id,
  lwn: lwn.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-mitchell-hashimoto",
  generatedAt: "2026-09-16T20:00:00Z",
  subject: {
    kind: "person",
    handle: "mitchell-hashimoto",
    displayName: "Mitchell Hashimoto",
    alsoKnownAs: ["mitchellh"],
    summary:
      "American software engineer who created Vagrant as a college side project, co-founded HashiCorp (Terraform, Vault, Consul, Nomad) in 2012, led it as CEO then CTO, and now leads the non-profit Ghostty terminal project while co-founding Superlogical.",
    identity: {
      wikidataId: "Q65554184",
      officialSite: "https://mitchellh.com/",
      profiles: [
        "https://github.com/mitchellh",
        "https://x.com/mitchellh",
        "https://hachyderm.io/@mitchellh",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T20:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    mhHome,
    ghosttyOrg,
    mhAutomation,
    mhBuilding,
    mhZigTalk,
    mhGhostty10,
    mhNonProfit,
    mhSuperlogical,
    hcDeparture,
    oreilly,
    hcBsl,
    ibmAnnounce,
    ibmComplete,
    secProspectus,
    changelog72,
    sedHashi,
    changelog622,
    wikidata,
    sdtimes,
    lwn,
  ],
  claims: [
    {
      id: "claim-born-1989",
      kind: "fact",
      text: "Mitchell Hashimoto is an American software developer born in 1989; an SD Times profile described him as 25 years old in February 2015.",
      sourceIds: [S.wikidata, S.sdtimes],
    },
    {
      id: "claim-programming-age-12",
      kind: "fact",
      text: "He started programming at age 12, initially to cheat at video games; at 14 he ran a $25-per-month membership site selling automated game cheats until a cease-and-desist notice — relayed by his parents — shut it down.",
      sourceIds: [S.sdtimes],
    },
    {
      id: "claim-uw-education",
      kind: "fact",
      text: "He studied computer science at the University of Washington, where he met future HashiCorp co-founder Armon Dadgar; SD Times reports they met as freshmen in 2007 working on the Seattle Project, a research effort to build a global scientific compute cloud.",
      sourceIds: [S.sdtimes, S.wikidata],
    },
    {
      id: "claim-uw-robot",
      kind: "fact",
      text: "While at UW he built UW Robot, software that automatically registered students for courses; he told SD Times that by his senior year it was registering 70–80% of the undergraduate student body and earning about half a million dollars a year, and he sold it when he graduated under terms he is legally barred from discussing.",
      sourceIds: [S.sdtimes],
    },
    {
      id: "claim-citrusbyte",
      kind: "fact",
      text: "During college he did regular consulting work for Citrusbyte, a software design and engineering firm, alongside open-source projects and the UW research.",
      sourceIds: [S.sdtimes],
    },
    {
      id: "claim-vagrant-origin",
      kind: "fact",
      text: "Over the December 2009 holidays, a two-hour client job for Citrusbyte required more than eight hours of environment provisioning on his laptop; on the flight back to Seattle he settled on virtualization — chosen over AWS largely because it was free for a frugal student — as the answer, which became Vagrant.",
      sourceIds: [S.sdtimes],
    },
    {
      id: "claim-vagrant-release",
      kind: "fact",
      text: "He released the first version of Vagrant in March 2010; for six months no release exceeded 100 downloads, but Engine Yard sponsorship for conference travel and the rise of Chef and Puppet helped it grow into one of the era's standard development-environment tools.",
      sourceIds: [S.sdtimes, S.changelog72],
    },
    {
      id: "claim-vagrant-bender",
      kind: "fact",
      text: "John Bender — a friend he met online through an Erlang blog and World of Warcraft — is described as co-creator of Vagrant 0.1 and helped implement its early VirtualBox-based features.",
      sourceIds: [S.sdtimes, S.changelog72],
    },
    {
      id: "claim-hashicorp-founded",
      kind: "fact",
      text: "In 2012 he founded HashiCorp with Armon Dadgar to work on the open-source projects full time; Wikidata records his employment there starting November 2012, and he marked eleven years at the company in his December 2023 farewell letter.",
      sourceIds: [S.sdtimes, S.wikidata, S.hcDeparture],
    },
    {
      id: "claim-hashicorp-products",
      kind: "fact",
      text: "He was part of the initial engineering team behind most HashiCorp products — Vagrant, Packer, Consul, Terraform, Vault, Nomad, Waypoint, and more; by early 2015 the company had released Packer, Serf, Consul, and Terraform alongside its first commercial product, Atlas, and a $10 million funding round.",
      sourceIds: [S.mhHome, S.sdtimes],
    },
    {
      id: "claim-roles",
      kind: "fact",
      text: "He served as HashiCorp's CEO for about four years, stepping down in 2016; as CTO for about five years until 2021, when he departed the leadership team and board; and as an individual-contributor engineer for roughly two more years before leaving the company.",
      sourceIds: [S.hcDeparture, S.mhHome],
    },
    {
      id: "claim-ipo",
      kind: "fact",
      text: "HashiCorp went public in December 2021, pricing 15.3 million shares of Class A common stock at $80 each — about $1.22 billion gross — for listing on the Nasdaq Global Select Market under the symbol HCP.",
      sourceIds: [S.secProspectus],
    },
    {
      id: "claim-bsl",
      kind: "fact",
      text: "On August 10, 2023, HashiCorp announced it was changing the license on all future releases of its products — including Terraform, Vault, Consul, Nomad, Packer, and Vagrant — from Mozilla Public License 2.0 to the Business Source License 1.1, while he was an individual contributor off the executive team.",
      sourceIds: [S.hcBsl, S.hcDeparture],
    },
    {
      id: "claim-departure",
      kind: "fact",
      text: "He announced his departure from HashiCorp on December 14, 2023, after more than eleven years, writing that the exit had been planned for a long time and that he was leaving proud of the role he played.",
      sourceIds: [S.hcDeparture],
    },
    {
      id: "claim-ibm-announce",
      kind: "fact",
      text: "On April 24, 2024, IBM announced a definitive agreement to acquire HashiCorp for $35 per share in cash, an enterprise value of $6.4 billion.",
      sourceIds: [S.ibmAnnounce],
    },
    {
      id: "claim-ibm-complete",
      kind: "fact",
      text: "IBM completed the HashiCorp acquisition on February 27, 2025, paying $35 per share in cash for all issued and outstanding common shares; HashiCorp became a wholly owned IBM subsidiary.",
      sourceIds: [S.ibmComplete],
    },
    {
      id: "claim-vagrant-book",
      kind: "fact",
      text: "He authored 'Vagrant: Up and Running,' a 155-page O'Reilly guide published in June 2013 covering the tool's V1 configuration syntax on the V2 core.",
      sourceIds: [S.oreilly],
    },
    {
      id: "claim-ghostty-1",
      kind: "fact",
      text: "Ghostty 1.0 — a fast, feature-rich, cross-platform terminal emulator written largely in Zig — was released publicly on December 26, 2024 under the MIT license after a private beta.",
      sourceIds: [S.mhGhostty10, S.lwn, S.ghosttyOrg],
    },
    {
      id: "claim-ghostty-beta",
      kind: "fact",
      text: "The private beta run through a public Discord drew about 28,000 members, of whom roughly 5,000 were granted access; by the 1.0 release more than 260 people had contributed to the repository.",
      sourceIds: [S.lwn],
    },
    {
      id: "claim-ghostty-nonprofit",
      kind: "fact",
      text: "On December 3, 2025, he announced that Ghostty had become a non-profit through fiscal sponsorship by Hack Club, a registered 501(c)(3): all names, marks, and IP were transferred to the non-profit umbrella, donations became tax-deductible, transactions are publicly ledgered, and he remains project lead while being legally barred from receiving any of the funds.",
      sourceIds: [S.mhNonProfit],
    },
    {
      id: "claim-libghostty",
      kind: "fact",
      text: "He also created libghostty, an embeddable MIT-licensed library of Ghostty's terminal components, which he says already powers other software including Vercel's Turborepo and Antithesis's Bombadil.",
      sourceIds: [S.mhHome, S.mhSuperlogical],
    },
    {
      id: "claim-ghostty-community",
      kind: "fact",
      text: "By mid-2026 he described Ghostty as having millions of daily users, about a dozen core maintainers, nearly 50 localization team members, and another dozen community moderators — some paid through the non-profit.",
      sourceIds: [S.mhSuperlogical, S.mhNonProfit],
    },
    {
      id: "claim-superlogical",
      kind: "fact",
      text: "On July 29, 2026, he announced Superlogical, a new company he co-founded that will begin by shipping a terminal multiplexer built on libghostty's MIT-licensed components; he describes the multiplexer as not the entire vision.",
      sourceIds: [S.mhSuperlogical],
    },
    {
      id: "claim-pilot",
      kind: "fact",
      text: "He is an FAA-licensed private pilot with an instrument rating who most recently flew a Cirrus SF50 Vision Jet, and says he stopped flying in 2026 to focus on family and work.",
      sourceIds: [S.mhHome],
    },
    {
      id: "claim-la-dad",
      kind: "fact",
      text: "He lives in Los Angeles, and writes that since leaving HashiCorp his primary focus has been being a mostly full-time dad alongside philanthropy, writing, and building software.",
      sourceIds: [S.mhHome, S.mhSuperlogical],
    },
    {
      id: "claim-automation-belief",
      kind: "stated_belief",
      text: "He describes himself as obsessed with automation — making computers do rote, repeatable tasks so people can focus on being creative — and traces Vagrant's success to that obsession.",
      sourceIds: [S.mhAutomation, S.sdtimes],
    },
    {
      id: "claim-five-am",
      kind: "stated_belief",
      text: "Armon Dadgar summarizes Hashimoto's working philosophy as: if you are waking up at 5 a.m. for any reason, you should replace that task with a computer — the logic behind both UW Robot and Vagrant.",
      sourceIds: [S.sdtimes],
    },
    {
      id: "claim-terminal-trilemma",
      kind: "stated_belief",
      text: "He argues existing terminal emulators force users to choose at most two of speed, features, and platform-native feel, and designed Ghostty on the premise that the three are not mutually exclusive.",
      sourceIds: [S.mhZigTalk, S.changelog622],
    },
    {
      id: "claim-terminal-platform",
      kind: "stated_belief",
      text: "He wants the terminal to become a modern platform for text application development the way the browser is for GUIs — with innovations like native progress bars, drag and drop, multiplexer control, and stronger security around escape sequences.",
      sourceIds: [S.mhZigTalk, S.changelog622],
    },
    {
      id: "claim-demo-method",
      kind: "stated_belief",
      text: "His method for finishing large technical projects is to order work so he continuously sees real results — 'always give yourself a good demo' — and to refuse to let perfection, or even known future improvements, block progress toward the next demo.",
      sourceIds: [S.mhBuilding],
    },
    {
      id: "claim-build-for-yourself",
      kind: "stated_belief",
      text: "For personal projects he advises building only what you need as you need it and adopting your own software as a daily driver as fast as possible — the path Ghostty itself followed.",
      sourceIds: [S.mhBuilding, S.mhZigTalk],
    },
    {
      id: "claim-nonprofit-stewardship",
      kind: "stated_belief",
      text: "He believes foundational, decades-old infrastructure like terminals should be stewarded by a mission-driven, non-commercial entity that prioritizes public benefit over private profit — the stated reason Ghostty became a non-profit.",
      sourceIds: [S.mhNonProfit],
    },
    {
      id: "claim-no-rug-pull",
      kind: "stated_belief",
      text: "He wanted enforceable assurance that Ghostty could never be 'rug pulled' — its mission quietly changed, funds diverted, or the project sold or relicensed for commercial gain — and says he has no intention of ever commercializing it.",
      sourceIds: [S.mhNonProfit, S.mhSuperlogical],
    },
    {
      id: "claim-love-of-building",
      kind: "stated_belief",
      text: "He says building software is his personal passion, that he never stopped building after HashiCorp, and that he and his Superlogical co-founders share an uncompromising commitment to well-crafted software.",
      sourceIds: [S.mhSuperlogical],
    },
    {
      id: "claim-happiest-ic",
      kind: "stated_belief",
      text: "He says he is happiest as a full-time, hands-on engineer, and that he intentionally stepped down as CEO in 2016 and off the leadership team and board in 2021 to build a company that did not require him for day-to-day decisions.",
      sourceIds: [S.hcDeparture],
    },
    {
      id: "claim-why-zig",
      kind: "stated_belief",
      text: "He chose Zig for Ghostty because he likes the community, the language, and the build system — and has declined to litigate the choice further: 'I chose Zig, I like Zig, let's move on.'",
      sourceIds: [S.mhZigTalk],
    },
    {
      id: "claim-friction-to-software",
      kind: "pattern",
      text: "Across the record he repeatedly converts personal friction into software: game cheats as a teenager, UW Robot for course registration, Vagrant for environment setup, a Hearthstone log analyzer he sold to a pro esports team, his own mail server, and Ghostty.",
      sourceIds: [S.sdtimes, S.mhAutomation, S.mhZigTalk],
    },
    {
      id: "claim-stepping-back",
      kind: "pattern",
      text: "He repeatedly designs himself out of the institutions he builds — CEO to CTO to individual contributor to departing HashiCorp, then moving Ghostty's IP and funding into a non-profit meant to outlast his personal involvement.",
      sourceIds: [S.hcDeparture, S.mhNonProfit, S.mhHome],
    },
    {
      id: "claim-build-in-public",
      kind: "pattern",
      text: "He teaches through public artifacts — devlogs, talk transcripts, method essays, and post-mortem reflections — rather than through formal talks or books alone, a practice running from the 2013 'Automation Obsessed' essay to the 2026 Superlogical announcement.",
      sourceIds: [S.mhAutomation, S.mhBuilding, S.mhZigTalk, S.mhSuperlogical],
    },
    {
      id: "claim-bsl-timing",
      kind: "speculation",
      text: "His departure came four months after HashiCorp's unpopular BSL relicensing, which invited outside speculation about a connection; his own letter frames the exit as long-planned and makes no mention of the license change, and no cited source establishes a causal link.",
      sourceIds: [S.hcDeparture, S.hcBsl],
    },
    {
      id: "claim-users-self-reported",
      kind: "speculation",
      text: "Ghostty's scale figures — millions of daily users — are self-reported in his own writing and have not been independently audited.",
      sourceIds: [S.mhSuperlogical],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1989",
      title: "Born in the United States",
      summary:
        "Wikidata records his birth year as 1989; a February 2015 profile describes him as 25.",
      sourceIds: [S.wikidata, S.sdtimes],
    },
    {
      id: "event-uw",
      kind: "education",
      date: "2007",
      title: "University of Washington; meets Armon Dadgar",
      summary:
        "As a freshman he worked with Dadgar on the Seattle Project, a research effort to build a global scientific compute cloud; he also built UW Robot for automated course registration.",
      organization: "University of Washington",
      sourceIds: [S.sdtimes, S.wikidata],
    },
    {
      id: "event-vagrant",
      kind: "project",
      date: "2010-03",
      title: "First public release of Vagrant",
      summary:
        "Conceived over the 2009 holidays after a two-hour job required eight hours of environment setup; releases drew under 100 downloads for six months before momentum built.",
      sourceIds: [S.sdtimes],
    },
    {
      id: "event-hashicorp",
      kind: "founded",
      date: "2012-11",
      title: "Founds HashiCorp with Armon Dadgar",
      summary:
        "Formed the company to support full-time work on Vagrant and the open-source tools that followed.",
      organization: "HashiCorp",
      sourceIds: [S.wikidata, S.sdtimes, S.hcDeparture],
    },
    {
      id: "event-ceo-to-cto",
      kind: "role",
      date: "2016",
      title: "Steps down as CEO, becomes CTO",
      summary:
        "Ended roughly four years as CEO and began roughly five years as CTO — the first step in a deliberate plan to make himself unnecessary to the company.",
      organization: "HashiCorp",
      sourceIds: [S.hcDeparture, S.mhHome],
    },
    {
      id: "event-to-ic",
      kind: "role",
      date: "2021",
      title: "Leaves leadership team and board for engineering role",
      summary:
        "Transitioned to a full-time individual-contributor engineer role, the position he says made him happiest.",
      organization: "HashiCorp",
      sourceIds: [S.hcDeparture, S.mhHome],
    },
    {
      id: "event-ipo",
      kind: "milestone",
      date: "2021-12-08",
      title: "HashiCorp IPO on Nasdaq",
      summary:
        "Priced 15.3 million Class A shares at $80 each — about $1.22 billion gross — trading under the symbol HCP.",
      organization: "HashiCorp",
      sourceIds: [S.secProspectus],
    },
    {
      id: "event-bsl",
      kind: "other",
      date: "2023-08-10",
      title: "HashiCorp adopts the Business Source License",
      summary:
        "All future product releases moved from MPL 2.0 to BUSL 1.1 — a controversial change made while he was off the executive team.",
      organization: "HashiCorp",
      sourceIds: [S.hcBsl],
    },
    {
      id: "event-departure",
      kind: "role",
      date: "2023-12-14",
      title: "Announces departure from HashiCorp",
      summary:
        "After more than eleven years, he announced he was moving on from the company he co-founded.",
      organization: "HashiCorp",
      sourceIds: [S.hcDeparture],
    },
    {
      id: "event-ibm-announce",
      kind: "milestone",
      date: "2024-04-24",
      title: "IBM announces agreement to acquire HashiCorp",
      summary: "$35 per share in cash — a $6.4 billion enterprise value.",
      organization: "IBM",
      sourceIds: [S.ibmAnnounce],
    },
    {
      id: "event-ghostty-1",
      kind: "project",
      date: "2024-12-26",
      title: "Ghostty 1.0 released publicly",
      summary:
        "The terminal emulator he had built as a personal project shipped under the MIT license after a 5,000-person private beta.",
      sourceIds: [S.mhGhostty10, S.lwn],
    },
    {
      id: "event-ibm-complete",
      kind: "milestone",
      date: "2025-02-27",
      title: "IBM completes the HashiCorp acquisition",
      summary: "HashiCorp became a wholly owned IBM subsidiary.",
      organization: "IBM",
      sourceIds: [S.ibmComplete],
    },
    {
      id: "event-ghostty-nonprofit",
      kind: "milestone",
      date: "2025-12-03",
      title: "Ghostty becomes a non-profit",
      summary:
        "The project moved under fiscal sponsorship of Hack Club, a 501(c)(3); he remains project lead but can receive none of its funds.",
      organization: "Hack Club",
      sourceIds: [S.mhNonProfit],
    },
    {
      id: "event-superlogical",
      kind: "founded",
      date: "2026-07-29",
      title: "Announces Superlogical",
      summary:
        "A new company he co-founded that begins by shipping a terminal multiplexer built on libghostty.",
      organization: "Superlogical",
      sourceIds: [S.mhSuperlogical],
    },
  ],
  themes: [
    {
      id: "theme-automation",
      kind: "philosophy",
      status: "stated",
      title: "Automate the rote",
      summary:
        "His founding conviction: computers should absorb rote, repeatable work so people can be creative. Game cheats at 12, UW Robot, and Vagrant are all expressions of it — 'if you're waking up at 5 a.m. for any reason, you should replace that task with a computer.'",
      sourceIds: [S.mhAutomation, S.sdtimes],
    },
    {
      id: "theme-demo-driven",
      kind: "method",
      status: "stated",
      title: "Sprint to demos",
      summary:
        "He finishes large projects by ordering work to produce visible results fast — tests when nothing can be shown, a demo every week or two, then daily-driving his own software. Perfection and even known future improvements must not block progress.",
      sourceIds: [S.mhBuilding],
    },
    {
      id: "theme-terminal-platform",
      kind: "belief",
      status: "stated",
      title: "The terminal as a modern platform",
      summary:
        "He argues terminals deserve browser-scale innovation — native progress bars, drag and drop, security work on escape sequences — and that speed, features, and platform-native feel are not a pick-two trilemma.",
      sourceIds: [S.mhZigTalk, S.changelog622],
    },
    {
      id: "theme-public-stewardship",
      kind: "belief",
      status: "stated",
      title: "Infrastructure as public trust",
      summary:
        "Foundational infrastructure, he argues, belongs under mission-driven, non-commercial stewardship: Ghostty's MIT license, its donated IP, a public funding ledger, and a legal bar on funds flowing to him are all designed to make a 'rug pull' impossible.",
      sourceIds: [S.mhNonProfit, S.mhSuperlogical],
    },
    {
      id: "theme-love-of-craft",
      kind: "practice",
      status: "stated",
      title: "Building for the love of it",
      summary:
        "He frames software as personal passion rather than career — he kept building daily after HashiCorp, 'for the love of it,' and says Superlogical's founders share an uncompromising commitment to well-crafted software.",
      sourceIds: [S.mhSuperlogical, S.mhZigTalk],
    },
    {
      id: "theme-dispensable-founder",
      kind: "method",
      status: "stated",
      title: "Build institutions that don't need you",
      summary:
        "He deliberately made himself unnecessary to HashiCorp — stepping down as CEO, then off the leadership team and board — and now structures Ghostty's non-profit to outlast his own technical and financial involvement.",
      sourceIds: [S.hcDeparture, S.mhNonProfit],
    },
    {
      id: "theme-hands-on",
      kind: "belief",
      status: "stated",
      title: "Happiness is hands-on",
      summary:
        "Executive leadership was a duty, not the goal: he describes himself as happiest as a full-time, hands-on engineer, and every post-CEO move — IC role, Ghostty, writing — bends back toward building.",
      sourceIds: [S.hcDeparture, S.mhBuilding],
    },
    {
      id: "theme-oss-ladder",
      kind: "influence",
      status: "reported",
      title: "Open source as the through-line",
      summary:
        "Press and interviews frame his career as open source compounding: community adoption of Vagrant created HashiCorp, and community trust built Ghostty's 28,000-member Discord before the code was even public.",
      sourceIds: [S.sdtimes, S.lwn, S.changelog622],
    },
  ],
  works: [
    {
      id: "work-vagrant",
      kind: "project",
      status: "released",
      title: "Vagrant",
      date: "2010-03",
      summary:
        "His first successful open-source project — automated creation and provisioning of virtualized development environments, initially on VirtualBox and Ruby.",
      sourceIds: [S.sdtimes, S.changelog72],
    },
    {
      id: "work-uw-robot",
      kind: "project",
      status: "completed",
      title: "UW Robot",
      summary:
        "Automated University of Washington course registration; he reported it handled 70–80% of undergraduates and was sold when he graduated.",
      location: "University of Washington",
      sourceIds: [S.sdtimes],
    },
    {
      id: "work-vagrant-book",
      kind: "book",
      status: "published",
      title: "Vagrant: Up and Running",
      date: "2013-06",
      summary: "The O'Reilly guide to Vagrant, written by its creator.",
      sourceIds: [S.oreilly],
    },
    {
      id: "work-packer",
      kind: "project",
      status: "released",
      title: "Packer",
      summary:
        "HashiCorp tool for building machine images; he was part of its initial engineering team.",
      sourceIds: [S.mhHome, S.sdtimes],
    },
    {
      id: "work-consul",
      kind: "project",
      status: "released",
      title: "Consul",
      summary:
        "Service discovery and networking tool released in HashiCorp's early wave of open-source projects.",
      sourceIds: [S.mhHome, S.sdtimes],
    },
    {
      id: "work-terraform",
      kind: "project",
      status: "released",
      title: "Terraform",
      summary:
        "Infrastructure-as-code tool that became HashiCorp's flagship; he was on the initial engineering team.",
      sourceIds: [S.mhHome, S.sdtimes],
    },
    {
      id: "work-vault",
      kind: "project",
      status: "released",
      title: "Vault",
      summary: "Secrets-management tool he helped build at HashiCorp.",
      sourceIds: [S.mhHome],
    },
    {
      id: "work-nomad",
      kind: "project",
      status: "released",
      title: "Nomad",
      summary: "Workload orchestrator he helped build at HashiCorp.",
      sourceIds: [S.mhHome],
    },
    {
      id: "work-waypoint",
      kind: "project",
      status: "released",
      title: "Waypoint",
      summary:
        "Application deployment tool; he cites it among the HashiCorp products on whose initial engineering teams he served.",
      sourceIds: [S.mhHome],
    },
    {
      id: "work-ghostty",
      kind: "product",
      status: "released",
      title: "Ghostty",
      date: "2024-12-26",
      summary:
        "Fast, feature-rich, cross-platform terminal emulator written in Zig with native macOS and Linux interfaces; released under MIT after a large private beta and now stewarded as a non-profit.",
      sourceIds: [S.mhGhostty10, S.lwn, S.ghosttyOrg],
    },
    {
      id: "work-libghostty",
      kind: "project",
      status: "released",
      title: "libghostty",
      summary:
        "Embeddable, MIT-licensed library of Ghostty's terminal components — a public building block already consumed by projects including Turborepo and Bombadil.",
      sourceIds: [S.mhHome, S.mhSuperlogical],
    },
    {
      id: "work-superlogical",
      kind: "project",
      status: "in_progress",
      title: "Superlogical",
      date: "2026-07-29",
      summary:
        "His new company; first product is a terminal multiplexer built on libghostty, with a broader vision he has deliberately left unrevealed.",
      sourceIds: [S.mhSuperlogical],
    },
    {
      id: "work-side-projects",
      kind: "project",
      status: "completed",
      title: "Side projects: Hearthstone analyzer, personal mail server",
      summary:
        "Recurring proof of the always-a-side-project habit he describes: a Hearthstone log analyzer sold to a pro esports team, and a from-scratch mail server he runs for his own domains.",
      sourceIds: [S.mhZigTalk],
    },
  ],
  appearances: [
    {
      id: "appearance-changelog-72",
      title: "Vagrant and virtualized environments (Changelog Interviews #72)",
      venue: "The Changelog",
      publishedAt: "2012-02-09",
      participants: ["Mitchell Hashimoto", "Wynn Netherland"],
      summary:
        "His first Changelog interview, recorded days after FOSDEM 2012, covering Vagrant's model for virtualized development environments.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/podcast/72",
          sourceId: S.changelog72,
        },
      ],
      sourceIds: [S.changelog72],
    },
    {
      id: "appearance-sed-2019",
      title: "Scaling HashiCorp with Armon Dadgar and Mitchell Hashimoto",
      venue: "Software Engineering Daily",
      publishedAt: "2019-02-04",
      participants: ["Mitchell Hashimoto", "Armon Dadgar", "Jeff Meyerson"],
      summary:
        "The co-founders on HashiCorp's business model, product philosophy, service mesh, zero-trust networking, and lessons from the container orchestration wars.",
      media: [
        {
          type: "audio",
          url: "https://softwareengineeringdaily.com/podcasts/scaling-hashicorp-with-armon-dagdar-and-mitchell-hashimoto/",
          sourceId: S.sedHashi,
        },
      ],
      sourceIds: [S.sedHashi],
    },
    {
      id: "appearance-zig-showtime",
      title: "Introducing Ghostty and Some Useful Zig Patterns",
      venue: "Zig Showtime",
      publishedAt: "2023-09-12",
      participants: ["Mitchell Hashimoto"],
      summary:
        "The first detailed public talk about Ghostty — the speed/features/native trilemma, the terminal-as-platform ambition, and the Zig patterns behind it; published in text on his site with the video on YouTube.",
      media: [
        {
          type: "article",
          url: "https://mitchellh.com/writing/ghostty-and-useful-zig-patterns",
          sourceId: S.mhZigTalk,
        },
      ],
      sourceIds: [S.mhZigTalk],
    },
    {
      id: "appearance-changelog-622",
      title: "We ain't afraid of no Ghostty! (Changelog Interviews #622)",
      venue: "The Changelog",
      publishedAt: "2024-12-18",
      participants: ["Mitchell Hashimoto", "Jerod Santo", "Adam Stacoviak"],
      summary:
        "Recorded two weeks before the 1.0 release: why he started Ghostty, what 'fast' means, libghostty, the Discord beta community, and his post-HashiCorp life.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/podcast/622",
          sourceId: S.changelog622,
        },
      ],
      sourceIds: [S.changelog622],
    },
  ],
  openQuestions: [
    "Sources disagree on when he started Ghostty: his own Ghostty page says he had been working on it since 2021, LWN reports the project began in 2022, and his non-profit post describes 'the beginning of the project in 2023.'",
    "The year he and Armon Dadgar met at the University of Washington is reported as 2007 (SD Times) and as 2008 (HashiCorp's own origin story).",
    "Early-career figures — UW Robot's roughly $500,000 annual revenue and 70–80% registration share, and the teenage game-cheat business — come from his own telling in a single 2015 profile rather than independent records.",
    "His birth year of 1989 rests on Wikidata sourced to a social-media post; no primary record surfaced in this research.",
    "Superlogical's full scope is deliberately unrevealed: he says the terminal multiplexer is only the first product and is 'purposefully coy' about what comes next.",
  ],
  body: `Mitchell Hashimoto is an American software engineer whose career runs on a single conviction: computers should absorb rote work so people can be creative. He turned that conviction into Vagrant, co-founded HashiCorp behind it and a family of infrastructure tools, stepped down from running it to return to engineering, and then built Ghostty — a terminal emulator he deliberately gave away to a non-profit — before announcing a new company, Superlogical, in 2026.

## Identity and formation

Wikidata records his birth year as 1989, consistent with an SD Times profile that described him as 25 in February 2015. He started programming at twelve, initially to cheat at video games, and by fourteen was running a $25-a-month membership site for automated game cheats — shut down when a cease-and-desist reached his parents. At the University of Washington he met Armon Dadgar; the two worked on the Seattle Project, a research effort to build a global scientific compute cloud, while Hashimoto consulted for the firm Citrusbyte and ran UW Robot, a tool that automatically registered students for courses. He told SD Times it handled 70–80% of undergraduates and made about half a million dollars a year before he sold it at graduation under terms he cannot discuss.

## Vagrant and the automation instinct

Vagrant's origin is the purest version of his method. Over the December 2009 holidays, a two-hour client job required more than eight hours of environment setup on his laptop; on the flight home he fixed on virtualization — chosen over AWS mostly because it was free for a student — and built the first version, released in March 2010 with early help from John Bender. Downloads stayed under a hundred per release for six months before Engine Yard sponsorship and the Chef/Puppet wave carried it into the mainstream. His 2013 essay "Automation Obsessed" gives the philosophy plainly: he is fascinated by making computers do what is rote for humans, and Vagrant proved automation in that space improved working lives.

## HashiCorp

In 2012 he and Dadgar founded HashiCorp to work on the tools full time. He was part of the initial engineering team behind Vagrant, Packer, Consul, Terraform, Vault, Nomad, Waypoint, and more, and served as CEO for about four years before stepping down in 2016, then as CTO for about five. In 2021 he left the leadership team and board for the role he says made him happiest: full-time, hands-on engineer. The company priced its IPO on December 8, 2021 — 15.3 million shares at $80, roughly $1.22 billion gross, trading on Nasdaq as HCP. In August 2023 HashiCorp relicensed all future product releases from MPL 2.0 to the Business Source License — a decision made while he was off the executive team — and on December 14, 2023 he announced his departure after eleven years, framing it as long-planned. His farewell letter noted that the "controversial worldviews such as multi-cloud" the company was founded on had become mainstream, and that the HashiCorp Configuration Language was among the most-used languages in open source. IBM agreed to acquire HashiCorp on April 24, 2024 for $6.4 billion in cash and completed the deal on February 27, 2025.

## Ghostty and the terminal as a platform

Post-HashiCorp he wanted to work in the opposite direction — desktop, GPU, graphics programming — and a terminal emulator absorbed him. His argument, made in a 2023 Zig Showtime talk and a 2024 Changelog interview, is that terminals forced a pick-two among speed, features, and native feel, and that the terminal should innovate like a platform the way browsers do. Ghostty ran a closed beta through a Discord that grew to about 28,000 members; roughly 5,000 got access and more than 260 contributed code before version 1.0 shipped publicly on December 26, 2024 under the MIT license.

## Stewardship, philanthropy, and what comes next

His method for finishing big projects is personal: order work so results stay visible, "always give yourself a good demo," daily-drive your own software, and never let perfection block progress. The same instinct now shapes his institutions. In December 2025 Ghostty became a non-profit under Hack Club's fiscal sponsorship — IP, marks, and funding moved under the 501(c)(3), with a public ledger and a legal bar on money reaching him — because, he writes, foundational infrastructure should be stewarded by a mission-driven entity rather than private profit. His family also pledged $150,000 directly to Hack Club, and the non-profit structure now lets the project compensate contributors. He reports Ghostty has millions of daily users, about a dozen core maintainers, and that libghostty, its MIT-licensed component library, already powers other software including Turborepo and Bombadil. On July 29, 2026 he announced Superlogical, a company he co-founded whose first product is a terminal multiplexer built on libghostty — while keeping Ghostty itself permanently non-commercial. He lives in Los Angeles, holds a private pilot's license with an instrument rating (he stopped flying in 2026), and describes his primary post-HashiCorp focus as being a mostly full-time dad.

## What the record does not settle

Ghostty's start date is reported variously as 2021, 2022, and 2023 across his own pages and LWN; the co-founders' first meeting is dated 2007 by SD Times and 2008 by HashiCorp's own telling; the striking early numbers — UW Robot's revenue and reach, the childhood cheat business — come from his own account in one profile. His departure also followed the unpopular BSL relicensing by four months; his letter describes a long-planned exit and the record contains no evidence connecting the two.

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
