#!/usr/bin/env bun
/** Generate examples/people/amelia-wattenberger/person-index.json with derived source ids. */

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

const site = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Amelia Wattenberger",
  url: "https://wattenberger.com/",
  publisher: "wattenberger.com",
  notes:
    "The subject's own site; self-descriptions here are self-reported and appear to lag her current role.",
});
const githubProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Amelia Wattenberger (Wattenberger)",
  url: "https://github.com/wattenberger",
  publisher: "GitHub",
  notes:
    "Her GitHub profile; bio reads 'Building @ Sutter Hill Ventures' and lists Oakland, California.",
});
const chatbots = source({
  binding: "first_person",
  mediaType: "article",
  title: "Why Chatbots Are Not the Future",
  url: "https://wattenberger.com/thoughts/boo-chatbots",
  publisher: "wattenberger.com",
  publishedAt: "2023-05",
  notes:
    "Her widely circulated critique of chat interfaces for LLMs; announced on her Mastodon in early May 2023.",
});
const llmsTool = source({
  binding: "first_person",
  mediaType: "article",
  title: "LLMs as a tool for thought",
  url: "https://wattenberger.com/thoughts/llms-as-a-tool-for-thought",
  publisher: "wattenberger.com",
  notes:
    "A companion essay using chatbots as brainstorming partners despite their interface flaws.",
});
const pudding = source({
  binding: "primary_record",
  mediaType: "article",
  title:
    "Play These Puzzles to Reveal the Racial and Gender Breakdown of Crosswords",
  url: "https://pudding.cool/2020/11/crossword-puzzles",
  publisher: "The Pudding",
  publishedAt: "2020-11",
  authors: ["Russell Samora", "Michelle Pera-McGhee", "Amelia Wattenberger"],
  notes:
    "Playable mini crosswords encoding the inclusivity analysis; her sole bylined Pudding piece per the site's author page.",
});
const flatData = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Flat Data",
  url: "https://githubnext.com/projects/flat-data/",
  publisher: "GitHub Next",
  publishedAt: "2021-05",
});
const repoViz = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Visualizing a Codebase",
  url: "https://githubnext.com/projects/repo-visualization/",
  publisher: "GitHub Next",
  publishedAt: "2021-08",
  notes: "A solo GitHub Next exploration; the page credits her alone.",
});
const codeBrushes = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Code Brushes",
  url: "https://githubnext.com/projects/code-brushes/",
  publisher: "GitHub Next",
  publishedAt: "2023-01",
});
const copilotDocs = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Copilot for Docs",
  url: "https://githubnext.com/projects/copilot-for-docs/",
  publisher: "GitHub Next",
  publishedAt: "2023-03",
});
const codeAtlas = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Code Atlas",
  url: "https://githubnext.com/projects/code-atlas/",
  publisher: "GitHub Next",
  publishedAt: "2023-06",
  notes: "A solo GitHub Next 'napkin sketch' combining LLM reasoning with rigid structure.",
});
const intentPost = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Intent: A workspace for agent orchestration",
  url: "https://www.augmentcode.com/blog/intent-a-workspace-for-agent-orchestration",
  publisher: "Augment Code",
  publishedAt: "2026-02-10",
  authors: ["Amelia Wattenberger"],
  notes:
    "Her authored announcement of Intent's public beta; the byline identifies her as Product Lead for Intent and Partner at Sutter Hill Ventures.",
});
const fullstackD3 = source({
  binding: "primary_record",
  mediaType: "book",
  title: "Fullstack D3 and Data Visualization",
  url: "https://www.newline.co/fullstack-d3",
  publisher: "newline",
  publishedAt: "2019",
  notes:
    "Her book and self-paced course on building custom web data visualizations; first announced May 2019.",
});
const jsParty = source({
  binding: "interview",
  mediaType: "audio",
  title: "Fullstack D3 with Amelia Wattenberger (JS Party #113)",
  url: "https://changelog.com/jsparty/113",
  publisher: "Changelog",
  publishedAt: "2020-02-07",
});
const kentDodds = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Amelia Wattenberger Breaks The UX Mold",
  url: "https://kentcdodds.com/chats/03/02/amelia-wattenberger-breaks-the-ux-mold",
  publisher: "Chats with Kent",
  publishedAt: "2020-05-19",
  authors: ["Kent C. Dodds"],
  notes:
    "A recorded chat with transcript; covers her path from neuroscience research to frontend development.",
});
const changelog = source({
  binding: "interview",
  mediaType: "audio",
  title: "Exploring with agents (Changelog Interviews #680)",
  url: "https://changelog.com/podcast/680",
  publisher: "Changelog",
  publishedAt: "2026-04-24",
  authors: ["Adam Stacoviak"],
});
const refactoring = source({
  binding: "interview",
  mediaType: "audio",
  title: "What Comes After the IDE — with Amelia Wattenberger (Refactoring Podcast #59)",
  url: "https://refactoring.fm/p/what-comes-after-the-ide-with-amelia",
  publisher: "Refactoring",
  publishedAt: "2026-03-20",
  authors: ["Luca Rossi"],
  notes: "Full conversation is paywalled; the public page carries the summary and quotes.",
});
const linkedin = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Amelia Wattenberger — LinkedIn",
  url: "https://www.linkedin.com/in/wattenberger",
  publisher: "LinkedIn",
  notes:
    "Self-reported career history; used for dates and titles and cross-checked against primary records where possible.",
});
const aiEngineer = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Amelia Wattenberger — AI Engineer Talks",
  url: "https://ai.engineer/speakers/amelia-wattenberger",
  publisher: "AI Engineer",
  notes:
    "Conference-speaker profile maintained by the AI Engineer event site; lists her 2023 Summit talk.",
});
const willison = source({
  binding: "reporting",
  mediaType: "article",
  title: "Why Chatbots Are Not the Future",
  url: "https://simonwillison.net/2023/May/15/why-chatbots-are-not-the-future/",
  publisher: "Simon Willison's Weblog",
  publishedAt: "2023-05-15",
  notes:
    "Simon Willison's linkblog, which amplified the chatbots essay to a wider engineering audience.",
});
const devclass = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "GitHub Blocks: JavaScript code in Markdown files, or 'little apps that you deploy to GitHub'",
  url: "https://www.devclass.com/development/2022/11/24/github-blocks-javascript-code-in-markdown-files-or-little-apps-that-you-deploy-to-github/1629302",
  publisher: "DEVCLASS",
  publishedAt: "2022-11-24",
  notes: "Coverage of the GitHub Blocks announcement at GitHub Universe 2022.",
});

const S = {
  site: site.id,
  githubProfile: githubProfile.id,
  chatbots: chatbots.id,
  llmsTool: llmsTool.id,
  pudding: pudding.id,
  flatData: flatData.id,
  repoViz: repoViz.id,
  codeBrushes: codeBrushes.id,
  copilotDocs: copilotDocs.id,
  codeAtlas: codeAtlas.id,
  intentPost: intentPost.id,
  fullstackD3: fullstackD3.id,
  jsParty: jsParty.id,
  kentDodds: kentDodds.id,
  changelog: changelog.id,
  refactoring: refactoring.id,
  linkedin: linkedin.id,
  aiEngineer: aiEngineer.id,
  willison: willison.id,
  devclass: devclass.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-amelia-wattenberger",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "amelia-wattenberger",
    displayName: "Amelia Wattenberger",
    summary:
      "American designer, engineer, and data-visualization author known for interactive explainers, the book Fullstack D3 and Data Visualization, GitHub Next prototypes from the Copilot era, and essays on interfaces for AI — now a partner at Sutter Hill Ventures and product lead for Intent at Augment Code.",
    identity: {
      officialSite: "https://wattenberger.com/",
      profiles: [
        "https://github.com/Wattenberger",
        "https://x.com/Wattenberger",
        "https://www.linkedin.com/in/wattenberger",
        "https://techhub.social/@wattenberger",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "career", "work", "essays", "projects", "media"],
  },
  sources: [
    site,
    githubProfile,
    chatbots,
    llmsTool,
    pudding,
    flatData,
    repoViz,
    codeBrushes,
    copilotDocs,
    codeAtlas,
    intentPost,
    fullstackD3,
    jsParty,
    kentDodds,
    changelog,
    refactoring,
    linkedin,
    aiEngineer,
    willison,
    devclass,
  ],
  claims: [
    {
      id: "claim-current-role",
      kind: "fact",
      text: "Amelia Wattenberger is a designer, engineer, and data-visualization author based in Oakland, California; as of 2026 she is a partner at Sutter Hill Ventures and product lead for Intent at Augment Code.",
      sourceIds: [S.aiEngineer, S.intentPost, S.githubProfile],
    },
    {
      id: "claim-parents-programmers",
      kind: "fact",
      text: "Both of her parents were programmers; she says she went to college determined not to follow them into tech, aiming instead at something like prison psychology.",
      sourceIds: [S.kentDodds],
    },
    {
      id: "claim-neuroscience",
      kind: "fact",
      text: "She studied neuroscience and psychology at Trinity College in Hartford and later worked as a research assistant and lab manager in a neuroimaging lab at the University of Texas at Austin.",
      sourceIds: [S.linkedin, S.kentDodds, S.jsParty],
    },
    {
      id: "claim-self-taught",
      kind: "fact",
      text: "Deciding against the graduate-school track, she taught herself to code through Codecademy courses and by repeatedly rebuilding her personal website, then took a frontend job at an analytics startup.",
      sourceIds: [S.kentDodds, S.jsParty],
    },
    {
      id: "claim-parsely",
      kind: "fact",
      text: "From April 2016 to March 2020 she was a senior UX engineer at Parse.ly, a content-analytics company, capping roughly a decade of data-intensive dashboard work at startups.",
      sourceIds: [S.linkedin, S.jsParty],
    },
    {
      id: "claim-book",
      kind: "fact",
      text: "She wrote Fullstack D3 and Data Visualization, a book and self-paced course on building custom data visualizations for the web, first released in 2019; she has described writing each chapter's code before its prose.",
      sourceIds: [S.fullstackD3, S.jsParty],
    },
    {
      id: "claim-stateofjs",
      kind: "fact",
      text: "She built the interactive visualizations for the 2019 State of JavaScript survey — including the widely admired overview chart that made her name in the JavaScript community.",
      sourceIds: [S.jsParty, S.aiEngineer],
    },
    {
      id: "claim-pudding-role",
      kind: "fact",
      text: "She worked at Polygraph/The Pudding as a journalist-engineer — LinkedIn styles it senior journalist-engineer — from March 2020 to March 2021, building visual essays in Svelte.",
      sourceIds: [S.linkedin, S.kentDodds],
    },
    {
      id: "claim-crossword",
      kind: "fact",
      text: "Her bylined Pudding piece (November 2020) is a set of playable mini crosswords that encode the racial and gender representation findings of the publication's crossword inclusivity analysis, made with Russell Samora and Michelle Pera-McGhee using Svelte.",
      sourceIds: [S.pudding],
    },
    {
      id: "claim-github-next-join",
      kind: "fact",
      text: "She joined GitHub Next — GitHub's small research-and-development team — in 2021, shortly before GitHub Copilot's public preview, and helped with the launch and early user reactions.",
      sourceIds: [S.changelog, S.linkedin],
    },
    {
      id: "claim-flat-data",
      kind: "fact",
      text: "Her first public GitHub Next project was Flat Data (May 2021), built with Idan Gazit, Matt Rothenberg, and Irene Alvarado — a pattern, based on Simon Willison's 'git scraping,' for versioning working datasets inside repositories.",
      sourceIds: [S.flatData],
    },
    {
      id: "claim-repo-viz",
      kind: "fact",
      text: "In August 2021 she published 'Visualizing a Codebase,' a solo exploration of circle-packed repository 'fingerprints,' shipped with a GitHub Action that regenerates the diagram as code changes.",
      sourceIds: [S.repoViz],
    },
    {
      id: "claim-blocks",
      kind: "fact",
      text: "She worked on GitHub Blocks, a technical preview announced around GitHub Universe in November 2022 that let repositories embed custom interactive 'blocks'; the preview was retired on December 15, 2023.",
      sourceIds: [S.devclass, S.aiEngineer, S.site],
    },
    {
      id: "claim-code-brushes",
      kind: "fact",
      text: "In January 2023 she built Code Brushes inside the Copilot Labs VS Code extension — paint-style tools that transform selected code for readability, types, bug fixes, or debug logging; the Copilot Labs preview ended December 15, 2023.",
      sourceIds: [S.codeBrushes],
    },
    {
      id: "claim-copilot-docs",
      kind: "fact",
      text: "She co-created Copilot for Docs (March 2023), which answered questions from a project's own documentation with citations and let readers tune responses to their experience level; its technical preview ended December 15, 2023.",
      sourceIds: [S.copilotDocs, S.chatbots],
    },
    {
      id: "claim-code-atlas",
      kind: "fact",
      text: "In June 2023 she published Code Atlas, a 'napkin sketch' prototype that prompts a language model to solve problems by emitting inspectable workflows of code blocks rather than flat text.",
      sourceIds: [S.codeAtlas],
    },
    {
      id: "claim-adept",
      kind: "fact",
      text: "From July 2023 to January 2024 she was on the design team at Adept, the startup training AI systems to read screens and operate software the way humans do.",
      sourceIds: [S.linkedin, S.aiEngineer],
    },
    {
      id: "claim-github-return",
      kind: "fact",
      text: "She returned to GitHub Next in January 2024 as principal research engineer; her LinkedIn profile lists the second stint ending in February 2025.",
      sourceIds: [S.linkedin],
    },
    {
      id: "claim-sutter-hill",
      kind: "fact",
      text: "In 2025 she joined Sutter Hill Ventures — her profile lists a designer-in-residence role followed by partner from July 2025 — supporting portfolio companies.",
      sourceIds: [S.linkedin, S.githubProfile, S.aiEngineer],
    },
    {
      id: "claim-intent",
      kind: "fact",
      text: "At Augment Code she leads product development for Intent, a developer workspace for orchestrating AI coding agents — isolated git worktrees, coordinator, implementor, and verifier agents, and a 'living spec' — which opened in public beta on February 10, 2026.",
      sourceIds: [S.intentPost, S.changelog, S.refactoring],
    },
    {
      id: "claim-chatbot-critique",
      kind: "stated_belief",
      text: "She argues that chat windows are a poor default interface for LLMs: text inputs have no affordances, prompts are 'a pile of context,' responses are isolated without a working buffer, and the format forces constant switching between implementing and evaluating.",
      sourceIds: [S.chatbots],
    },
    {
      id: "claim-tools-not-machines",
      kind: "stated_belief",
      text: "She wants 'more tools and fewer operated machines' — software that keeps the human making key decisions, avoiding the 'no man's land' where users still bear responsibility but no longer control the outcome.",
      sourceIds: [S.chatbots],
    },
    {
      id: "claim-bake-context",
      kind: "stated_belief",
      text: "Good AI interfaces should bake context into controls — sliders, options, saved state — instead of making every user re-encode it into each prompt, as her Copilot for Docs personalization controls demonstrated.",
      sourceIds: [S.chatbots, S.copilotDocs],
    },
    {
      id: "claim-thought-partner",
      kind: "stated_belief",
      text: "Despite her critique, she uses chatbots as 'a tool for thought': a brainstorming partner that preserves pinned ideas outside working memory, suggests related concepts and analogies, and matches the cadence of the thinker.",
      sourceIds: [S.llmsTool],
    },
    {
      id: "claim-empower",
      kind: "stated_belief",
      text: "On the Code Brushes project she framed the goal as empowering developers rather than automating them.",
      sourceIds: [S.codeBrushes],
    },
    {
      id: "claim-static-text",
      kind: "stated_belief",
      text: "She has argued that 'static text is dead' — the ideal response differs by a reader's experience, goals, and even mood, so generated content should be personalized rather than one-size-fits-all.",
      sourceIds: [S.chatbots, S.copilotDocs],
    },
    {
      id: "claim-ladder",
      kind: "stated_belief",
      text: "In her AI Engineer Summit 2023 talk she argued AI products should help people move up and down 'the ladder of abstraction' — augmentation as many small automations, like spreadsheets or zoomable maps — rather than merely accelerating existing tasks.",
      sourceIds: [S.aiEngineer],
    },
    {
      id: "claim-dataviz-communication",
      kind: "stated_belief",
      text: "She treats data visualization as translation: charts are 'an x-ray for your data,' and bespoke interactive explanations beat stock chart types for communicating ideas.",
      sourceIds: [S.fullstackD3, S.jsParty, S.pudding],
    },
    {
      id: "claim-novel-experiences",
      kind: "stated_belief",
      text: "She believes the web underuses its ability to make ideas memorable — 'we kind of ended up just porting newspapers into web format' — and favors novel, flashier experiences for communication.",
      sourceIds: [S.kentDodds],
    },
    {
      id: "claim-after-ide",
      kind: "stated_belief",
      text: "As agents absorb low-level coding, she argues the IDE's code-first surface should give way to intent- and planning-centric workspaces where humans define what should be built and verify what was.",
      sourceIds: [S.refactoring, S.intentPost],
    },
    {
      id: "claim-prototype-method",
      kind: "pattern",
      text: "Her research method is public prototyping: small, timeboxed explorations shipped openly — repo fingerprints, code brushes, doc copilots, workflow engines — rather than papers or slideware.",
      sourceIds: [S.repoViz, S.codeAtlas, S.site],
    },
    {
      id: "claim-code-sketches",
      kind: "pattern",
      text: "She keeps a practice of 'code sketches' — tiny isolated examples for learning a concept — and writes posts by starting from the idea, the reader's context, and a sketch.",
      sourceIds: [S.kentDodds],
    },
    {
      id: "claim-any-medium",
      kind: "pattern",
      text: "She makes things in any medium — laser-cut kumiko pattern art, keyboard firmware, a Figma dataviz plugin, a VS Code extension — treating code as one of several craft materials.",
      sourceIds: [S.githubProfile, S.site],
    },
    {
      id: "claim-consistency",
      kind: "pattern",
      text: "Across The Pudding, GitHub Next, Adept, and Augment, the constant is interface design that keeps human judgment in charge as automation absorbs more of the work.",
      sourceIds: [S.chatbots, S.intentPost, S.changelog],
    },
    {
      id: "claim-spec-github-dates",
      kind: "speculation",
      text: "Her GitHub Next start is soft: she says she joined shortly before Copilot's mid-2021 debut, while LinkedIn's 'Principal Research Engineer' title begins in 2022 — suggesting an earlier title or a gap in the public record.",
      sourceIds: [S.changelog, S.linkedin],
    },
    {
      id: "claim-spec-homepage",
      kind: "speculation",
      text: "Her homepage still describes her as a GitHub Next principal research engineer although she now works at Sutter Hill and Augment — the page appears stale rather than contradictory.",
      sourceIds: [S.site, S.aiEngineer],
    },
    {
      id: "claim-spec-single-byline",
      kind: "speculation",
      text: "The Pudding's author page credits her with a single bylined story; uncredited engineering on other pieces — common in that shop — is plausible but undocumented in the cited record.",
      sourceIds: [S.pudding, S.linkedin],
    },
  ],
  timeline: [
    {
      id: "event-parsely",
      kind: "role",
      date: "2016-04",
      end: "2020-03",
      title: "Senior UX engineer at Parse.ly",
      summary:
        "Built data-intensive analytics dashboards for publishers — the last of roughly a decade of startup work in the analytics space.",
      organization: "Parse.ly",
      organizationHandle: "parse-ly",
      sourceIds: [S.linkedin, S.jsParty],
    },
    {
      id: "event-fullstack-d3",
      kind: "publication",
      date: "2019",
      title: "Fullstack D3 and Data Visualization released",
      summary:
        "Her code-first book and course on building custom, interactive web data visualizations.",
      sourceIds: [S.fullstackD3, S.jsParty],
    },
    {
      id: "event-stateofjs",
      kind: "project",
      date: "2019",
      title: "Visualizations for the 2019 State of JavaScript survey",
      summary:
        "Built the survey's interactive charts, including an overview visualization that drew wide attention in the JavaScript community.",
      sourceIds: [S.jsParty, S.aiEngineer],
    },
    {
      id: "event-pudding",
      kind: "role",
      date: "2020-03",
      end: "2021-03",
      title: "Journalist-engineer at The Pudding",
      summary:
        "Joined the visual-journalism shop as it evolved from Polygraph; built data-driven essays in Svelte.",
      organization: "The Pudding",
      organizationHandle: "the-pudding",
      sourceIds: [S.linkedin, S.kentDodds],
    },
    {
      id: "event-crossword",
      kind: "publication",
      date: "2020-11",
      title: "Playable crossword inclusivity piece at The Pudding",
      summary:
        "Co-created playable mini crosswords encoding the racial and gender breakdown of crossword clues and answers.",
      sourceIds: [S.pudding],
    },
    {
      id: "event-github-next",
      kind: "role",
      date: "2021",
      title: "Joined GitHub Next",
      summary:
        "Joined GitHub's R&D team shortly before GitHub Copilot's public preview and helped with the launch and early user reactions.",
      organization: "GitHub Next",
      organizationHandle: "github-next",
      sourceIds: [S.changelog, S.linkedin],
    },
    {
      id: "event-first-prototypes",
      kind: "project",
      date: "2021-05",
      end: "2021-08",
      title: "First GitHub Next prototypes: Flat Data and codebase visualization",
      summary:
        "Flat Data (May 2021, with Idan Gazit, Matt Rothenberg, and Irene Alvarado) versioned working datasets in git; 'Visualizing a Codebase' (August 2021) drew repository 'fingerprints' via a GitHub Action.",
      sourceIds: [S.flatData, S.repoViz],
    },
    {
      id: "event-blocks",
      kind: "project",
      date: "2022-11",
      title: "GitHub Blocks technical preview",
      summary:
        "Custom, interactive 'blocks' for viewing files, folders, and repositories — announced around GitHub Universe; the preview ended December 15, 2023.",
      organization: "GitHub Next",
      organizationHandle: "github-next",
      sourceIds: [S.devclass, S.aiEngineer],
    },
    {
      id: "event-copilot-era",
      kind: "project",
      date: "2023-01",
      end: "2023-06",
      title: "Copilot-era prototypes: Code Brushes, Copilot for Docs, Code Atlas",
      summary:
        "A run of LLM interface explorations: paint-style code editing in Copilot Labs (January), documentation-grounded answers with personalization controls (March), and inspectable model-built workflows (June).",
      organization: "GitHub Next",
      organizationHandle: "github-next",
      sourceIds: [S.codeBrushes, S.copilotDocs, S.codeAtlas],
    },
    {
      id: "event-chatbots-essay",
      kind: "publication",
      date: "2023-05",
      title: "'Why Chatbots Are Not the Future' essay",
      summary:
        "Her critique of chat interfaces for LLMs — no affordances, unstructured context, isolated responses — widely circulated after Simon Willison and others amplified it.",
      sourceIds: [S.chatbots, S.willison],
    },
    {
      id: "event-adept",
      kind: "role",
      date: "2023-07",
      end: "2024-01",
      title: "Design team at Adept",
      summary:
        "Designed interfaces for AI systems trained to read screens and operate software.",
      organization: "Adept",
      organizationHandle: "adept",
      sourceIds: [S.linkedin, S.aiEngineer],
    },
    {
      id: "event-ladder-talk",
      kind: "media",
      date: "2023-10",
      title: "'Climbing the Ladder of Abstraction' at AI Engineer Summit",
      summary:
        "Speaking as an Adept designer, she argued AI products should move users between levels of abstraction — spreadsheets and maps as the precedents.",
      location: "San Francisco, California",
      sourceIds: [S.aiEngineer],
    },
    {
      id: "event-github-return",
      kind: "role",
      date: "2024-01",
      end: "2025-02",
      title: "Returned to GitHub Next as principal research engineer",
      summary:
        "A second stint on the R&D team, per her LinkedIn record.",
      organization: "GitHub Next",
      organizationHandle: "github-next",
      sourceIds: [S.linkedin],
    },
    {
      id: "event-intent-beta",
      kind: "milestone",
      date: "2026-02-10",
      title: "Intent public beta at Augment Code",
      summary:
        "After joining Sutter Hill Ventures in 2025 — listed first as designer in residence, then partner from July — she announced the workspace-first agent-orchestration product she leads at Sutter Hill-backed Augment Code: her 'what comes after the IDE' answer.",
      organization: "Augment Code",
      organizationHandle: "augment-code",
      sourceIds: [S.intentPost, S.changelog, S.refactoring, S.linkedin],
    },
  ],
  themes: [
    {
      id: "theme-beyond-chatbots",
      kind: "philosophy",
      status: "stated",
      title: "Interfaces beyond the chatbot",
      summary:
        "A text box has no affordances and forgets nothing of its formlessness: she argues LLM interfaces need structured context controls, working buffers, and shapes that reveal what the tool can and cannot do.",
      sourceIds: [S.chatbots, S.intentPost],
    },
    {
      id: "theme-tools-for-thought",
      kind: "philosophy",
      status: "stated",
      title: "LLMs as tools for thought",
      summary:
        "Used as a thinking partner rather than an answer machine — pinning ideas outside working memory, suggesting concepts and analogies, matching the thinker's cadence — even a flawed chatbot extends the mind.",
      sourceIds: [S.llmsTool, S.chatbots],
    },
    {
      id: "theme-empower-not-automate",
      kind: "belief",
      status: "stated",
      title: "Empower, don't automate",
      summary:
        "From Code Brushes to Intent, the stated goal is tools that keep the human making key decisions — avoiding the 'no man's land' where people still decide but no longer control outcomes.",
      sourceIds: [S.codeBrushes, S.chatbots, S.changelog],
    },
    {
      id: "theme-ladder-abstraction",
      kind: "method",
      status: "stated",
      title: "The ladder of abstraction",
      summary:
        "Good AI products let people move fluidly between levels — word, paragraph, overview; spec, plan, diff. Spreadsheets and zoomable maps are her precedents for augmentation through many small automations.",
      sourceIds: [S.aiEngineer, S.intentPost, S.refactoring],
    },
    {
      id: "theme-fluid-rigid",
      kind: "method",
      status: "stated",
      title: "Fluid reasoning, rigid structure",
      summary:
        "Code Atlas's thesis: pair LLMs' fluid reasoning with rigid, human-inspectable structure — workflows of code blocks — so responses can be checked, replayed, and learned from.",
      sourceIds: [S.codeAtlas],
    },
    {
      id: "theme-data-translation",
      kind: "practice",
      status: "stated",
      title: "Data visualization as translation",
      summary:
        "Charts are 'an x-ray for your data.' A decade of dashboards, a book, and visual essays taught her method: sketch bespoke forms, iterate against real data, and build explainers readers can play with.",
      sourceIds: [S.fullstackD3, S.jsParty, S.pudding],
    },
    {
      id: "theme-visible-structure",
      kind: "interest",
      status: "reported",
      title: "Making invisible structures visible",
      summary:
        "Repository fingerprints, contribution graphs, codebase change-over-time: recurring work turns the structure of software itself into something you can see at a glance.",
      sourceIds: [S.repoViz, S.site, S.devclass],
    },
    {
      id: "theme-prototype-futures",
      kind: "method",
      status: "reported",
      title: "Prototyping as research",
      summary:
        "Her GitHub Next bio was 'prototyping our way to future developer experiences': small, timeboxed, public explorations — many deliberately abandoned — as the unit of R&D.",
      sourceIds: [S.site, S.repoViz, S.codeAtlas],
    },
    {
      id: "theme-craft-medium",
      kind: "interest",
      status: "reported",
      title: "Code as one craft material among many",
      summary:
        "Laser-cut kumiko patterns, keyboard firmware, generative art, a dog treadmill: she describes loving to create 'in any medium,' and treats code sketches as the same kind of play.",
      sourceIds: [S.githubProfile, S.site, S.kentDodds],
    },
  ],
  works: [
    {
      id: "work-fullstack-d3",
      kind: "book",
      status: "published",
      title: "Fullstack D3 and Data Visualization",
      date: "2019",
      summary:
        "Her book and self-paced course teaching custom, interactive web data visualization — written code-first, chapter by chapter.",
      sourceIds: [S.fullstackD3, S.jsParty],
    },
    {
      id: "work-stateofjs",
      kind: "design",
      status: "completed",
      title: "State of JavaScript 2019 survey visualizations",
      date: "2019",
      summary:
        "Interactive charts for the annual survey, including the much-cited overview line chart.",
      sourceIds: [S.jsParty, S.aiEngineer],
    },
    {
      id: "work-covid-tests",
      kind: "project",
      status: "published",
      title: "COVID-19 diagnostic test explainers",
      date: "2020",
      summary:
        "Co-authored visual explainers on the complexity of COVID-19 diagnostic tests, listed among her publications.",
      sourceIds: [S.linkedin],
    },
    {
      id: "work-crossword",
      kind: "project",
      status: "published",
      title: "Playable mini crosswords",
      date: "2020-11",
      summary:
        "Pudding piece letting readers feel the racial and gender breakdown of crossword puzzles by playing generated mini puzzles; built in Svelte with Russell Samora and Michelle Pera-McGhee.",
      sourceIds: [S.pudding],
    },
    {
      id: "work-flat-data",
      kind: "product",
      status: "released",
      title: "Flat Data",
      date: "2021-05",
      summary:
        "GitHub Next's 'git scraping'-inspired pattern for fetching, versioning, and viewing working datasets inside repositories — Action, VS Code extension, and viewer.",
      sourceIds: [S.flatData],
    },
    {
      id: "work-repo-viz",
      kind: "project",
      status: "released",
      title: "Visualizing a Codebase (repo visualizer)",
      date: "2021-08",
      summary:
        "Solo exploration of circle-packed repository 'fingerprints,' shipped with a GitHub Action that regenerates the diagram on every commit.",
      sourceIds: [S.repoViz],
    },
    {
      id: "work-stateofapis",
      kind: "design",
      status: "completed",
      title: "State of APIs 2021 visualizations",
      date: "2021",
      summary:
        "Visualizations for the 2021 State of APIs report, listed among her personal projects.",
      sourceIds: [S.site],
    },
    {
      id: "work-blocks",
      kind: "product",
      status: "completed",
      title: "GitHub Blocks",
      date: "2022-11",
      summary:
        "Technical preview letting repositories embed custom interactive blocks for files, folders, and whole repos; announced around GitHub Universe 2022 and sunset December 15, 2023.",
      sourceIds: [S.devclass, S.aiEngineer, S.site],
    },
    {
      id: "work-code-brushes",
      kind: "design",
      status: "completed",
      title: "Code Brushes (Copilot Labs)",
      date: "2023-01",
      summary:
        "Paint-style ML transformations for selected code inside the Copilot Labs VS Code extension — 'make readable,' 'add types,' 'fix bug,' 'debug.'",
      sourceIds: [S.codeBrushes],
    },
    {
      id: "work-copilot-docs",
      kind: "product",
      status: "completed",
      title: "Copilot for Docs",
      date: "2023-03",
      summary:
        "AI answers grounded in a project's own documentation, with citations and controls for tailoring responses to the reader; technical preview ended December 15, 2023.",
      sourceIds: [S.copilotDocs, S.chatbots],
    },
    {
      id: "work-code-atlas",
      kind: "project",
      status: "completed",
      title: "Code Atlas",
      date: "2023-06",
      summary:
        "Napkin-sketch prototype prompting an LLM to solve problems via inspectable workflows of code blocks — fluid reasoning plus rigid structure.",
      sourceIds: [S.codeAtlas],
    },
    {
      id: "work-kumiko",
      kind: "design",
      status: "released",
      title: "Kumiko pattern generator",
      summary:
        "A generator that turns any image into Japanese kumiko lattice patterns for laser-cut wall art.",
      sourceIds: [S.githubProfile, S.site],
    },
    {
      id: "work-datavizer",
      kind: "product",
      status: "released",
      title: "Datavizer",
      summary: "A Figma plugin for visualizing data inside design files.",
      sourceIds: [S.githubProfile],
    },
    {
      id: "work-footsteps",
      kind: "product",
      status: "released",
      title: "footsteps-vscode",
      summary:
        "A VS Code extension that highlights recently edited lines and fades them as you move away, keeping your place in a file.",
      sourceIds: [S.githubProfile],
    },
    {
      id: "work-penpal",
      kind: "project",
      status: "in_progress",
      title: "PenPal AI writing tool",
      summary:
        "A personal prototype of an AI writing interface that suggests improvements like a tutor, with controls for genre, audience, and tone — featured in her chatbots essay.",
      sourceIds: [S.chatbots, S.site],
    },
    {
      id: "work-intent",
      kind: "product",
      status: "released",
      title: "Intent",
      date: "2026-02",
      summary:
        "Augment Code's workspace for orchestrating AI coding agents — isolated git worktrees, coordinator/implementor/verifier agents, and a living spec; public beta opened February 10, 2026, with her as product lead.",
      sourceIds: [S.intentPost, S.changelog, S.refactoring],
    },
  ],
  appearances: [
    {
      id: "appearance-jsparty",
      title: "Fullstack D3 with Amelia Wattenberger (JS Party #113)",
      venue: "Changelog — JS Party",
      publishedAt: "2020-02-07",
      participants: ["Amelia Wattenberger"],
      summary:
        "On building the State of JS 2019 overview chart, D3 fundamentals, and writing the book code-first.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/jsparty/113",
          sourceId: S.jsParty,
        },
      ],
      sourceIds: [S.jsParty],
    },
    {
      id: "appearance-kent-dodds",
      title: "Amelia Wattenberger Breaks The UX Mold",
      venue: "Chats with Kent (Kent C. Dodds)",
      publishedAt: "2020-05-19",
      participants: ["Amelia Wattenberger", "Kent C. Dodds"],
      summary:
        "On code sketches, communicating with novel web experiences, and her move to The Pudding.",
      media: [
        {
          type: "transcript",
          url: "https://kentcdodds.com/chats/03/02/amelia-wattenberger-breaks-the-ux-mold",
          sourceId: S.kentDodds,
        },
      ],
      sourceIds: [S.kentDodds],
    },
    {
      id: "appearance-ladder-talk",
      title: "Climbing the Ladder of Abstraction",
      venue: "AI Engineer Summit 2023, San Francisco",
      publishedAt: "2023-10",
      participants: ["Amelia Wattenberger"],
      summary:
        "Speaking as an Adept designer: AI products should move people between levels of abstraction rather than just accelerating existing tasks.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=PAy_GHUAICw",
          sourceId: S.aiEngineer,
        },
      ],
      sourceIds: [S.aiEngineer],
    },
    {
      id: "appearance-refactoring",
      title: "What Comes After the IDE — with Amelia Wattenberger",
      venue: "Refactoring Podcast",
      publishedAt: "2026-03-20",
      participants: ["Amelia Wattenberger", "Luca Rossi"],
      summary:
        "On Intent's workspace primitive, agent orchestration, the living spec as control plane, and how AI changes engineering roles.",
      media: [
        {
          type: "audio",
          url: "https://refactoring.fm/p/what-comes-after-the-ide-with-amelia",
          sourceId: S.refactoring,
        },
      ],
      sourceIds: [S.refactoring],
    },
    {
      id: "appearance-changelog",
      title: "Exploring with agents (Changelog Interviews #680)",
      venue: "Changelog",
      publishedAt: "2026-04-24",
      participants: ["Amelia Wattenberger", "Adam Stacoviak"],
      summary:
        "On joining GitHub Next before Copilot, the autocomplete-to-chat-to-UI arc, one-worktree-per-task, and why prototyping got easier while finishing got harder.",
      media: [
        {
          type: "audio",
          url: "https://changelog.com/podcast/680",
          sourceId: S.changelog,
        },
      ],
      sourceIds: [S.changelog],
    },
  ],
  relations: [
    {
      id: "rel-parse-ly",
      kind: "employed_by",
      target: "parse-ly",
      targetName: "Parse.ly",
      targetKind: "organization",
      note: "Senior UX engineer, April 2016 to March 2020, building data-intensive analytics dashboards for publishers.",
      start: "2016-04",
      end: "2020-03",
      targetWikidataId: "Q7139941",
      sourceIds: [S.linkedin, S.jsParty],
    },
    {
      id: "rel-the-pudding",
      kind: "employed_by",
      target: "the-pudding",
      targetName: "The Pudding (Polygraph)",
      targetKind: "organization",
      note: "Journalist-engineer (senior journalist-engineer per LinkedIn), March 2020 to March 2021, building visual essays in Svelte.",
      start: "2020-03",
      end: "2021-03",
      targetWikidataId: "Q106978232",
      sourceIds: [S.linkedin, S.kentDodds],
    },
    {
      id: "rel-github",
      kind: "employed_by",
      target: "github",
      targetName: "GitHub",
      targetKind: "organization",
      note: "Joined the GitHub Next R&D team in 2021 shortly before Copilot's public preview; returned January 2024 as principal research engineer, listed through February 2025.",
      start: "2021",
      end: "2025-02",
      targetWikidataId: "Q364",
      sourceIds: [S.changelog, S.linkedin],
    },
    {
      id: "rel-adept",
      kind: "employed_by",
      target: "adept",
      targetName: "Adept",
      targetKind: "organization",
      note: "Design team, July 2023 to January 2024.",
      start: "2023-07",
      end: "2024-01",
      sourceIds: [S.linkedin, S.aiEngineer],
    },
    {
      id: "rel-sutter-hill-ventures",
      kind: "employed_by",
      target: "sutter-hill-ventures",
      targetName: "Sutter Hill Ventures",
      targetKind: "organization",
      note: "Joined in 2025 — listed first as designer in residence, then partner from July 2025.",
      start: "2025",
      targetWikidataId: "Q7650156",
      sourceIds: [S.linkedin, S.githubProfile, S.aiEngineer],
    },
    {
      id: "rel-augment-code",
      kind: "employed_by",
      target: "augment-code",
      targetName: "Augment Code",
      targetKind: "organization",
      note: "Product lead for Intent, the agent-orchestration workspace that opened in public beta on February 10, 2026.",
      sourceIds: [S.intentPost, S.changelog, S.refactoring],
    },
    {
      id: "rel-russell-samora",
      kind: "collaborated",
      target: "russell-samora",
      targetName: "Russell Samora",
      note: "Co-created the playable crossword-inclusivity piece at The Pudding (November 2020).",
      sourceIds: [S.pudding],
    },
    {
      id: "rel-michelle-pera-mcghee",
      kind: "collaborated",
      target: "michelle-pera-mcghee",
      targetName: "Michelle Pera-McGhee",
      note: "Co-created the playable crossword-inclusivity piece at The Pudding (November 2020).",
      sourceIds: [S.pudding],
    },
    {
      id: "rel-idan-gazit",
      kind: "collaborated",
      target: "idan-gazit",
      targetName: "Idan Gazit",
      note: "Built Flat Data together at GitHub Next (May 2021).",
      sourceIds: [S.flatData],
    },
    {
      id: "rel-matt-rothenberg",
      kind: "collaborated",
      target: "matt-rothenberg",
      targetName: "Matt Rothenberg",
      note: "Built Flat Data together at GitHub Next (May 2021).",
      sourceIds: [S.flatData],
    },
    {
      id: "rel-irene-alvarado",
      kind: "collaborated",
      target: "irene-alvarado",
      targetName: "Irene Alvarado",
      note: "Built Flat Data together at GitHub Next (May 2021).",
      sourceIds: [S.flatData],
    },
    {
      id: "rel-simon-willison",
      kind: "influenced_by",
      target: "simon-willison",
      targetName: "Simon Willison",
      note: "Flat Data's dataset-versioning pattern is based on Willison's 'git scraping'; his linkblog also amplified her chatbots essay.",
      targetWikidataId: "Q7520062",
      sourceIds: [S.flatData, S.willison],
    },
    {
      id: "rel-kent-c-dodds",
      kind: "interviewed_by",
      target: "kent-c-dodds",
      targetName: "Kent C. Dodds",
      note: "'Amelia Wattenberger Breaks The UX Mold' on Chats with Kent, May 2020.",
      targetWikidataId: "Q114758609",
      sourceIds: [S.kentDodds],
    },
    {
      id: "rel-luca-rossi",
      kind: "interviewed_by",
      target: "luca-rossi",
      targetName: "Luca Rossi",
      note: "Refactoring Podcast #59, March 2026.",
      sourceIds: [S.refactoring],
    },
    {
      id: "rel-adam-stacoviak",
      kind: "interviewed_by",
      target: "adam-stacoviak",
      targetName: "Adam Stacoviak",
      note: "Changelog Interviews #680, April 2026.",
      sourceIds: [S.changelog],
    },
  ],
  openQuestions: [
    "Her GitHub Next start is fuzzy: she says she joined shortly before Copilot's mid-2021 preview, but LinkedIn's 'Principal Research Engineer' title begins in 2022 — the intervening title or date is not recorded.",
    "The Pudding's author page lists a single bylined story; uncredited engineering on other pieces is plausible but undocumented in the cited record.",
    "Education dates are thin: LinkedIn shows Trinity College (neuroscience and psychology) and a UT Austin neuroimaging lab, but no graduation year — and no Wikidata or Wikipedia entry exists to corroborate.",
    "Her homepage still bills her as a GitHub Next principal research engineer while her employer bio places her at Sutter Hill and Augment — whether the page is deliberately frozen or simply stale is unstated.",
    "Whether concluded GitHub Next explorations — Blocks, Copilot for Docs, Copilot Labs — resurface inside GitHub products is undecided; GitHub Next frames them as experiments that may never ship.",
  ],
  body: `Amelia Wattenberger is a designer, engineer, and data-visualization author who has spent her career on one problem rendered two ways: first making data legible to people, then making increasingly autonomous software steerable by them. As of 2026 she is a partner at Sutter Hill Ventures and product lead for Intent, Augment Code's agent-orchestration workspace. Before that she spent two stints at GitHub Next, GitHub's small R&D team, where her prototypes helped define the Copilot era — and where she wrote "Why Chatbots Are Not the Future," a 2023 essay that became a reference point in the argument over how people should actually work with large language models.

## From neuroscience to the browser

Both of her parents were programmers, which is precisely what pushed her away from computers: an office job sounded boring, and she planned to become something like a prison psychologist. She studied neuroscience and psychology at Trinity College in Hartford, then moved to Texas to work as a research assistant and lab manager in a neuroimaging lab at the University of Texas at Austin — a co-authored paper on neurogenesis followed. Hanging around graduate students long enough to see the PhD track up close, she opted out, taught herself to code through Codecademy and by rebuilding her personal site, and landed a frontend job at an analytics startup.

She spent roughly a decade in that world — most visibly four years (April 2016 to March 2020) as a senior UX engineer at Parse.ly, the content-analytics platform — designing dashboards, visualizing attention data, and moving between design, dataviz, and the query layer as small startups require.

## The dataviz years

Alongside the day job she built a public teaching practice: blog posts on D3, React, SVG, and the CSS cascade; "code sketches" for learning one concept at a time; and in 2019 *Fullstack D3 and Data Visualization*, a book-and-course whose chapters she drafted code-first. The same year she built the interactive charts for the 2019 State of JavaScript survey — the overview visualization was admired widely enough to put her on JS Party. In March 2020 she joined The Pudding as a journalist-engineer. Her single bylined piece there (November 2020) is characteristic: playable mini crosswords, built with Russell Samora and Michelle Pera-McGhee, that let readers *feel* the racial and gender breakdown of puzzle clues rather than just read the percentages.

## GitHub Next and the Copilot era

She joined GitHub Next in 2021, shortly before GitHub Copilot's public preview, and helped with the launch and early user reactions. The team's method matched hers: small, timeboxed, public prototypes. Flat Data (May 2021, with Idan Gazit, Matt Rothenberg, and Irene Alvarado) versioned working datasets in git. "Visualizing a Codebase" (August 2021, solo) drew circle-packed repository "fingerprints" and shipped a GitHub Action to keep them current. GitHub Blocks (announced November 2022) let repos embed custom interactive views. Then came the LLM run: Code Brushes (January 2023) painted code with ML transformations inside Copilot Labs; Copilot for Docs (March 2023) answered questions from a project's own documentation, with citations and sliders to tune responses to the reader; Code Atlas (June 2023) pushed models to emit inspectable workflows of code blocks — fluid reasoning bound to rigid structure. Most of these previews were sunset in December 2023, which was always the deal: GitHub Next ships explorations, not promises.

## Beyond chatbots

In May 2023 she published "Why Chatbots Are Not the Future," arguing that chat windows are a thin wrapper on a strange new capability: text inputs carry no affordances, prompts are unstructured piles of context, responses are isolated without a working buffer, and the loop forces constant switching between implementing and evaluating. Her prescription — bake context into controls, keep humans in charge, build "more tools and fewer operated machines" — circulated widely after Simon Willison and others amplified it. The nuance often missed: a companion essay, "LLMs as a tool for thought," argues the same chatbots make fine brainstorming partners — they hold pinned ideas outside working memory and match the thinker's cadence. She is not anti-chatbot; she is anti-default.

## Adept, the return, and Intent

In July 2023 she left GitHub Next for Adept's design team, working on interfaces for AI that reads screens and operates software; that October, at AI Engineer Summit in San Francisco, she gave "Climbing the Ladder of Abstraction" — spreadsheets and zoomable maps as precedents for augmentation through many small automations. By January 2024 she was back at GitHub Next as principal research engineer, a stint her LinkedIn ends in February 2025. She then joined Sutter Hill Ventures — first listed as designer in residence, then partner from July 2025 — and took product lead for Intent at Sutter Hill-backed Augment Code. Intent, which opened in public beta on February 10, 2026, is her "what comes after the IDE" answer: a workspace per task (each backed by an isolated git worktree), a living spec humans approve, and coordinator, implementor, and verifier agents — including third-party agents like Claude Code and Codex — doing bounded work inside it. On the 2026 interview circuit she argues the arc ran autocomplete → chat → CLI → back to UI, and that agents make the first seventy percent of a project cheap — leaving the last thirty, polish and judgment, as the new bottleneck.

## What the record does not settle

The seams are date-shaped. Her GitHub Next start, the 2021–2022 title gap, the exact designer-in-residence-to-partner transition, and any uncredited Pudding engineering all sit between a self-described "shortly before Copilot" and LinkedIn's tidy rows. She has no Wikidata or Wikipedia entry; this index leans on her own site, employer records, and interviews, and her homepage appears not to have caught up with her current job.

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
