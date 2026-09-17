#!/usr/bin/env bun
/** Generate examples/people/bret-victor/person-index.json with derived source ids. */

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

const ACCESSED = "2026-09-17T00:00:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- Subject-controlled and first-person sources (worrydream.com, dynamicland.org) ---

const home = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bret Victor, human being",
  url: "https://worrydream.com/",
  publisher: "worrydream.com",
  notes:
    "The subject's own site and self-description; biographical claims here are self-reported.",
});
const cv = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bret Victor — CV",
  url: "https://worrydream.com/cv/",
  publisher: "worrydream.com",
  notes: "The subject's own CV; dates and roles are self-reported.",
});
const refs = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Links: an annotated bibliography",
  url: "https://worrydream.com/refs/",
  publisher: "worrydream.com",
  notes:
    "The subject's annotated reading list — Engelbart, Kay/Smalltalk, diSessa, Hestenes, Hutchins, Bruner and the history of representations.",
});
const july2023 = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "July 2023",
  url: "https://worrydream.com/July2023/",
  publisher: "worrydream.com",
  publishedAt: "2023-07",
  notes:
    "A status update: Dynamicland 'still going, just quietly' after the Oakland space closed for covid.",
});
const magicInk = source({
  binding: "first_person",
  mediaType: "article",
  title: "Magic Ink: Information Software and the Graphical Interface",
  url: "https://worrydream.com/MagicInk/",
  publisher: "worrydream.com",
  publishedAt: "2006-03-15",
  authors: ["Bret Victor"],
});
const simulationTool = source({
  binding: "first_person",
  mediaType: "article",
  title: "Simulation as a Practical Tool",
  url: "https://worrydream.com/SimulationAsAPracticalTool/",
  publisher: "worrydream.com",
  publishedAt: "2009-10-19",
  authors: ["Bret Victor"],
});
const tenBrighterIdeas = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Ten Brighter Ideas? An Explorable Explanation",
  url: "https://worrydream.com/TenBrighterIdeas/",
  publisher: "worrydream.com",
  publishedAt: "2010-03-29",
  authors: ["Bret Victor"],
});
const explorableExplanations = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Explorable Explanations",
  url: "https://worrydream.com/ExplorableExplanations/",
  publisher: "worrydream.com",
  publishedAt: "2011-03-10",
  authors: ["Bret Victor"],
  notes: "Umbrella project for 'truly active reading'; carries a February 2024 postscript.",
});
const tangle = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Tangle: a JavaScript library for reactive documents",
  url: "https://worrydream.com/Tangle/",
  publisher: "worrydream.com",
  publishedAt: "2011",
  authors: ["Bret Victor"],
});
const scrubbingCalculator = source({
  binding: "first_person",
  mediaType: "article",
  title: "Scrubbing Calculator",
  url: "https://worrydream.com/ScrubbingCalculator/",
  publisher: "worrydream.com",
  publishedAt: "2011-05-31",
  authors: ["Bret Victor"],
});
const ladderOfAbstraction = source({
  binding: "first_person",
  mediaType: "article",
  title:
    "Up and Down the Ladder of Abstraction: A Systematic Approach to Interactive Visualization",
  url: "https://worrydream.com/LadderOfAbstraction/",
  publisher: "worrydream.com",
  publishedAt: "2011-10",
  authors: ["Bret Victor"],
});
const briefRant = source({
  binding: "first_person",
  mediaType: "article",
  title: "A Brief Rant on the Future of Interaction Design",
  url: "https://worrydream.com/ABriefRantOnTheFutureOfInteractionDesign/",
  publisher: "worrydream.com",
  publishedAt: "2011-11-08",
  authors: ["Bret Victor"],
  notes:
    "Written in response to Microsoft's 'Productivity Future Vision' concept video.",
});
const learnableProgramming = source({
  binding: "first_person",
  mediaType: "article",
  title: "Learnable Programming: Designing a programming system for understanding programs",
  url: "https://worrydream.com/LearnableProgramming/",
  publisher: "worrydream.com",
  publishedAt: "2012-09",
  authors: ["Bret Victor"],
  notes:
    "Framed by the author as a response to Khan Academy's computer-science launch, which had cited his work as inspiration.",
});
const killMath = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Kill Math",
  url: "https://worrydream.com/KillMath/",
  publisher: "worrydream.com",
  authors: ["Bret Victor"],
  notes:
    "Umbrella project page for concrete, non-symbolic approaches to quantitative problems; collects the Scrubbing Calculator and the dynamical-system explorer.",
});
const ddvAddendum = source({
  binding: "first_person",
  mediaType: "article",
  title: "Additional Notes on \"Drawing Dynamic Visualizations\"",
  url: "https://worrydream.com/DrawingDynamicVisualizationsTalkAddendum/",
  publisher: "worrydream.com",
  publishedAt: "2013-05-21",
  authors: ["Bret Victor"],
});
const engelbart = source({
  binding: "first_person",
  mediaType: "article",
  title: "A few words on Doug Engelbart",
  url: "https://worrydream.com/Engelbart/",
  publisher: "worrydream.com",
  publishedAt: "2013-07-03",
  authors: ["Bret Victor"],
});
const mediaUnthinkable = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Media for Thinking the Unthinkable: Designing a new medium for science and engineering",
  url: "https://worrydream.com/MediaForThinkingTheUnthinkable/",
  publisher: "worrydream.com",
  publishedAt: "2013-04",
  authors: ["Bret Victor"],
  notes: "Talk presented at the MIT Media Lab on April 4, 2013; page hosts the video and demos.",
});
const mtuNote = source({
  binding: "first_person",
  mediaType: "article",
  title: "An Ill-Advised Personal Note about \"Media for Thinking the Unthinkable\"",
  url: "https://worrydream.com/MediaForThinkingTheUnthinkable/note.html",
  publisher: "worrydream.com",
  publishedAt: "2013-05-28",
  authors: ["Bret Victor"],
});
const dbx = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "References for \"The Future of Programming\"",
  url: "https://worrydream.com/dbx/",
  publisher: "worrydream.com",
  publishedAt: "2013-07-30",
  authors: ["Bret Victor"],
  notes:
    "Annotated primary-source list for the DBX conference talk given July 9, 2013, performed in the persona of a 1973 researcher.",
});
const seeingSpaces = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Seeing Spaces",
  url: "https://worrydream.com/SeeingSpaces/",
  publisher: "worrydream.com",
  publishedAt: "2014",
  authors: ["Bret Victor"],
  notes:
    "Talk and poster arguing for room-scale dynamic media that make thinking visible; presented at EG in May 2014.",
});
const hrotNote = source({
  binding: "first_person",
  mediaType: "article",
  title: "A note about \"The Humane Representation of Thought\"",
  url: "https://worrydream.com/TheHumaneRepresentationOfThought/note.html",
  publisher: "worrydream.com",
  publishedAt: "2014-12-21",
  authors: ["Bret Victor"],
});
const climateChange = source({
  binding: "first_person",
  mediaType: "article",
  title: "What can a technologist do about climate change? A personal view.",
  url: "https://worrydream.com/ClimateChange/",
  publisher: "worrydream.com",
  publishedAt: "2015-11",
  authors: ["Bret Victor"],
});
const dlZine = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dynamicland zine",
  url: "https://dynamicland.org/2017/Zine/",
  publisher: "Dynamicland",
  publishedAt: "2017",
  notes:
    "The lab's own account: building at 9th and Broadway, 'the entire building is the computer,' and Realtalk's first self-hosted run on June 14, 2017.",
});
const dlProgress2019 = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Progress report 2014–2019",
  url: "https://dynamicland.org/2019/Progress_report/",
  publisher: "Dynamicland",
  publishedAt: "2019",
});
const dlProgress2021 = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Progress report 2021",
  url: "https://dynamicland.org/2021/Progress_report/",
  publisher: "Dynamicland",
  publishedAt: "2021",
  notes:
    "Reports that the 469 9th St Oakland space sat mostly unused through covid and that the lease ended in December 2021.",
});
const dlFaq = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dynamicland FAQ",
  url: "https://dynamicland.org/2024/FAQ/",
  publisher: "Dynamicland",
  publishedAt: "2024",
  notes:
    "States the Oakland workspace ran 2017 to covid, a Berkeley 'dynamic library' is under development with a hoped-for 2027 opening, and a detailed Realtalk report is still unpublished pending Realtalk-2024.",
});
const dlIntro = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Dynamicland intro",
  url: "https://dynamicland.org/2024/Intro/",
  publisher: "Dynamicland",
  publishedAt: "2024-08",
  authors: ["Bret Victor"],
});
const dlOpenSource = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Is Realtalk open source?",
  url: "https://dynamicland.org/2024/Is_Realtalk_open_source/",
  publisher: "Dynamicland",
  publishedAt: "2024",
});
const dlPublicSpace = source({
  binding: "first_person",
  mediaType: "transcript",
  title: "Computational Public Space",
  url: "https://dynamicland.org/2024/Computational_Public_Space/",
  publisher: "Dynamicland",
  publishedAt: "2024-11",
  authors: ["Bret Victor"],
  notes:
    "Presentation on computing integrated into public space, and what screen-based computing does to it.",
});
const dlRealtalkArchive = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Realtalk",
  url: "https://dynamicland.org/archive/2017/Realtalk",
  publisher: "Dynamicland",
  publishedAt: "2017-06",
  authors: [
    "Bret Victor",
    "Toby Schachman",
    "Paula Te",
    "Josh Horowitz",
    "Luke Iannini",
  ],
});
const dlHrotArchive = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Humane Representation of Thought — Dynamicland archive",
  url: "https://dynamicland.org/archive/2014/The_Humane_Representation_of_Thought",
  publisher: "Dynamicland",
  publishedAt: "2014",
  authors: ["Bret Victor", "David Hellman"],
});
const dlFounding = source({
  binding: "subject_controlled",
  mediaType: "pdf",
  title: "Founding Dynamicland",
  url: "https://dynamicland.org/archived-media/2018/05/DL2018-05-30-60403e.pdf",
  publisher: "Dynamicland",
  publishedAt: "2018-05",
  notes:
    "The lab's own rationale for nonprofit status, modeled on libraries, museums, and makerspaces.",
});
const dlDonate = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Dynamicland donations",
  url: "https://dynamicland.org/donate/",
  publisher: "Dynamicland",
  notes: "States the Dynamicland Foundation's 501(c)(3) status and tax ID 84-3736935.",
});
const nonprofitNarrative = source({
  binding: "primary_record",
  mediaType: "pdf",
  title: "Dynamicland Foundation 501(c)(3) narrative description of activities",
  url: "https://dynamicland.org/2020/Nonprofit_narrative.pdf",
  publisher: "Dynamicland Foundation",
  publishedAt: "2020",
  notes:
    "From the foundation's IRS application: submitted June 25, 2020, granted July 22, 2020; states the first community space was established in Oakland in 2017.",
});

// --- Talk videos ---

const iopVimeo = source({
  binding: "first_person",
  mediaType: "video",
  title: "Bret Victor — Inventing on Principle",
  url: "https://vimeo.com/36579366",
  publisher: "CUSEC",
  publishedAt: "2012-02",
  authors: ["Bret Victor"],
  notes:
    "Canonical upload by the conference; recorded at CUSEC in Montreal and posted in February 2012.",
});
const sddfVimeo = source({
  binding: "first_person",
  mediaType: "video",
  title: "Stop Drawing Dead Fish",
  url: "https://vimeo.com/64895205",
  publisher: "Bret Victor",
  publishedAt: "2013",
  authors: ["Bret Victor"],
  notes:
    "Talk about art and computers presented to the San Francisco ACM SIGGRAPH chapter on May 16, 2012; the video circulated in 2013.",
});
const fopVimeo = source({
  binding: "first_person",
  mediaType: "video",
  title: "The Future of Programming",
  url: "https://vimeo.com/71278954",
  publisher: "Bret Victor",
  publishedAt: "2013",
  authors: ["Bret Victor"],
  notes:
    "Presented at Dropbox's DBX conference on July 9, 2013, staged as if it were 1973.",
});
const hrotYoutube = source({
  binding: "first_person",
  mediaType: "video",
  title: "Bret Victor — The Humane Representation of Thought",
  url: "https://www.youtube.com/watch?v=agOdP2Bmieg",
  publisher: "worrydream.com",
  publishedAt: "2014-12",
  authors: ["Bret Victor"],
  notes:
    "Closing keynote at UIST 2014 and SPLASH 2014; released online in late December 2014.",
});
const ddvYoutube = source({
  binding: "archive",
  mediaType: "video",
  title: "Bret Victor — Drawing Dynamic Visualizations",
  url: "https://www.youtube.com/watch?v=ef2jpjTEB5U",
  publisher: "Colin McDonnell (re-upload)",
  publishedAt: "2015-06",
  authors: ["Bret Victor"],
  notes:
    "Re-hosted copy of the talk recorded at the Stanford HCI seminar on February 1, 2013.",
});
const dlIntroVideo = source({
  binding: "first_person",
  mediaType: "video",
  title: "Dynamicland intro",
  url: "https://www.youtube.com/watch?v=5Q9r-AEzRMA",
  publisher: "Dynamicland",
  publishedAt: "2024-08",
  authors: ["Bret Victor"],
  notes:
    "August 2024 overview of Realtalk, communal computing, and communal science, narrated by the subject.",
});

// --- Reference, reporting, interviews, records, archives ---

const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Bret Victor",
  url: "https://en.wikipedia.org/wiki/Bret_Victor",
  publisher: "Wikipedia",
  notes: "Used for discovery and orientation, not as sole authority.",
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Bret Victor (Q28086018)",
  url: "https://www.wikidata.org/wiki/Q28086018",
  publisher: "Wikidata",
});
const wiredBeyondTouchscreen = source({
  binding: "reporting",
  mediaType: "article",
  title: "A Stirring Vision for Human Progress Beyond the Touchscreen",
  url: "https://www.wired.com/2014/01/stirring-vision-human-progress-beyond-touchscreen/",
  publisher: "WIRED",
  publishedAt: "2014-01-07",
  authors: ["Kyle VanHemert"],
  notes:
    "Profile pegged to Media for Thinking the Unthinkable; dates his Apple role to 2007–2010.",
});
const reformUtopian = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Utopian UI Architect",
  url: "https://medium.com/re-form/the-utopian-ui-architect-34dead42a28",
  publisher: "re:form (Medium)",
  publishedAt: "2014-12-02",
  authors: ["John Pavlus"],
  notes:
    "Profile based on interviews; reports his August 2007 Apple start and a three-person internal R&D prototyping group.",
});
const bloombergSap = source({
  binding: "reporting",
  mediaType: "article",
  title: "SAP Looks to Xerox for R&D Inspiration, Builds Idea Lab",
  url: "https://www.bloomberg.com/news/articles/2015-01-29/sap-looks-to-xerox-for-r-d-inspiration-builds-idea-lab",
  publisher: "Bloomberg",
  publishedAt: "2015-01-29",
  authors: ["John Pavlus"],
  notes:
    "Reports the Communications Design Group's SAP patronage and PARC-style charter.",
});
const atlanticApocalypse = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Coming Software Apocalypse",
  url: "https://www.theatlantic.com/technology/archive/2017/09/saving-the-world-from-code/540393/",
  publisher: "The Atlantic",
  publishedAt: "2017-09-26",
  authors: ["James Somers"],
  notes:
    "Includes interview material with Victor on 'Inventing on Principle' and its reception.",
});
const techReviewLearnable = source({
  binding: "reporting",
  mediaType: "article",
  title: "Dear Everyone Teaching Programming: You're Doing It Wrong",
  url: "https://www.technologyreview.com/2012/10/01/183515/dear-everyone-teaching-programming-youre-doing-it-wrong/",
  publisher: "MIT Technology Review",
  publishedAt: "2012-10-01",
  notes: "Coverage of 'Learnable Programming' and the explorable-explanations idea.",
});
const fastCompanyKillMath = source({
  binding: "reporting",
  mediaType: "article",
  title: "Ex-Apple Designer Creates Teaching UI That 'Kills Math' Using Data Viz",
  url: "https://www.fastcompany.com/1664508/ex-apple-designer-creates-teaching-ui-that-kills-math-using-data-viz",
  publisher: "Fast Company (Co.Design)",
  publishedAt: "2011",
  notes:
    "Covers the Kill Math prototype and quotes Victor on the roman-numeral analogy for bad representations.",
});
const ftrainPodcast = source({
  binding: "interview",
  mediaType: "audio",
  title: "Computing is Everywhere: A Conversation with Bret Victor",
  url: "https://www.ftrain.com/pub-computing-is-everywhere-a-conversation-with-bret-v-pui5b",
  publisher: "The Postlight Podcast",
  publishedAt: "2018-03-19",
  authors: ["Paul Ford", "Rich Ziade"],
  notes:
    "Podcast conversation about Dynamicland and communal computing; show-notes page.",
});
const viHartHistory = source({
  binding: "reporting",
  mediaType: "article",
  title: "The Art of Research — A History",
  url: "https://theartofresearch.org/a-history/",
  publisher: "Vi Hart",
  notes:
    "First-hand account by a fellow principal investigator of how Alan Kay gathered the Communications Design Group around 2013 with SAP support.",
});
const siggraphSf = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Stop Drawing Dead Fish — San Francisco ACM SIGGRAPH",
  url: "https://san-francisco.siggraph.org/2012/05/25/stop-drawing-dead-fish/",
  publisher: "San Francisco ACM SIGGRAPH",
  publishedAt: "2012-05",
  notes: "Event listing for the May 16, 2012 talk at Adobe Systems, 601 Townsend St.",
});
const cusecSchedule = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "CUSEC 2012 Schedule",
  url: "https://2012.cusec.net/schedule/index.html",
  publisher: "Canadian University Software Engineering Conference",
  publishedAt: "2012",
  notes:
    "Lists Bret Victor's keynote on Friday, January 20, 2012, 16:15–17:15, in Montreal.",
});
const splashKeynote = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Keynote: Humane Representation of Thought — SPLASH 2014",
  url: "https://2014.splashcon.org/details/splash2014-keynotes/1/Keynote-Humane-Representation-of-Thought-A-Trail-Map-for-the-21st-Century",
  publisher: "SPLASH 2014",
  publishedAt: "2014-10-24",
});
const uistKeynotes = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "UIST 2014 Keynotes",
  url: "https://uist.acm.org/uist2014/keynotes.php",
  publisher: "ACM UIST",
  publishedAt: "2014-10",
  notes:
    "Program listing the closing keynote 'Humane Representation of Thought: A Trail Map for the 21st Century' in Honolulu.",
});
const egconf = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Bret Victor, Toolmaker (EG8)",
  url: "https://egconf.com/videos/bret-victor-toolmaker-eg8",
  publisher: "EG Conference",
  publishedAt: "2014-05",
  notes: "Conference record of the May 2014 'Seeing Spaces' talk.",
});
const melcherOurChoice = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Our Choice App",
  url: "https://melcher.com/project/our-choice/",
  publisher: "Melcher Media",
  notes:
    "The producer's project page; confirms the app earned a 2011 Apple Design Award.",
});
const wiredPushPop = source({
  binding: "reporting",
  mediaType: "article",
  title: "Gore, Ex-Apple Engineers Team Up to Blow Up the Book",
  url: "https://www.wired.com/2011/04/app-stars-push-pop-press/",
  publisher: "WIRED",
  publishedAt: "2011-04",
  notes:
    "Background on Push Pop Press and the Our Choice app; does not name Victor — his role is documented by his CV.",
});
const pogueNyt = source({
  binding: "reporting",
  mediaType: "article",
  title: "Al Gore Invents a Showpiece E-Book",
  url: "https://archive.nytimes.com/pogue.blogs.nytimes.com/2011/05/05/al-gore-invents-a-showpiece-e-book/",
  publisher: "The New York Times (Pogue)",
  publishedAt: "2011-05-05",
  authors: ["David Pogue"],
});
const archiveOrgIop = source({
  binding: "archive",
  mediaType: "video",
  title: "Bret Victor - Inventing on Principle (Internet Archive capture)",
  url: "https://archive.org/details/vimeo-36579366",
  publisher: "Internet Archive",
  publishedAt: "2012-02-10",
  notes: "Archived copy of the CUSEC Vimeo upload.",
});
const iopTranscript = source({
  binding: "archive",
  mediaType: "transcript",
  title: "Transcript of \"Inventing on Principle\", CUSEC 2012",
  url: "https://github.com/ezyang/cusec2012-victor",
  publisher: "GitHub (ezyang)",
  transcriptOf: iopVimeo.id,
  notes: "Community-maintained transcript of the CUSEC talk.",
});

const S = {
  home: home.id,
  cv: cv.id,
  refs: refs.id,
  july2023: july2023.id,
  magicInk: magicInk.id,
  simulationTool: simulationTool.id,
  tenBrighterIdeas: tenBrighterIdeas.id,
  explorableExplanations: explorableExplanations.id,
  tangle: tangle.id,
  scrubbingCalculator: scrubbingCalculator.id,
  ladderOfAbstraction: ladderOfAbstraction.id,
  briefRant: briefRant.id,
  learnableProgramming: learnableProgramming.id,
  killMath: killMath.id,
  ddvAddendum: ddvAddendum.id,
  engelbart: engelbart.id,
  mediaUnthinkable: mediaUnthinkable.id,
  mtuNote: mtuNote.id,
  dbx: dbx.id,
  seeingSpaces: seeingSpaces.id,
  hrotNote: hrotNote.id,
  climateChange: climateChange.id,
  dlZine: dlZine.id,
  dlProgress2019: dlProgress2019.id,
  dlProgress2021: dlProgress2021.id,
  dlFaq: dlFaq.id,
  dlIntro: dlIntro.id,
  dlOpenSource: dlOpenSource.id,
  dlPublicSpace: dlPublicSpace.id,
  dlRealtalkArchive: dlRealtalkArchive.id,
  dlHrotArchive: dlHrotArchive.id,
  dlFounding: dlFounding.id,
  dlDonate: dlDonate.id,
  nonprofitNarrative: nonprofitNarrative.id,
  iopVimeo: iopVimeo.id,
  sddfVimeo: sddfVimeo.id,
  fopVimeo: fopVimeo.id,
  hrotYoutube: hrotYoutube.id,
  ddvYoutube: ddvYoutube.id,
  dlIntroVideo: dlIntroVideo.id,
  wikipedia: wikipedia.id,
  wikidata: wikidata.id,
  wiredBeyondTouchscreen: wiredBeyondTouchscreen.id,
  reformUtopian: reformUtopian.id,
  bloombergSap: bloombergSap.id,
  atlanticApocalypse: atlanticApocalypse.id,
  techReviewLearnable: techReviewLearnable.id,
  fastCompanyKillMath: fastCompanyKillMath.id,
  ftrainPodcast: ftrainPodcast.id,
  viHartHistory: viHartHistory.id,
  siggraphSf: siggraphSf.id,
  cusecSchedule: cusecSchedule.id,
  splashKeynote: splashKeynote.id,
  uistKeynotes: uistKeynotes.id,
  egconf: egconf.id,
  melcherOurChoice: melcherOurChoice.id,
  wiredPushPop: wiredPushPop.id,
  pogueNyt: pogueNyt.id,
  archiveOrgIop: archiveOrgIop.id,
  iopTranscript: iopTranscript.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-bret-victor",
  generatedAt: "2026-09-17T03:30:00Z",
  subject: {
    kind: "person",
    handle: "bret-victor",
    displayName: "Bret Victor",
    alsoKnownAs: ["worrydream"],
    summary:
      "American interface designer, computer scientist, and electrical engineer — former Apple human-interface inventor, author of 'Magic Ink' and 'Learnable Programming', speaker behind 'Inventing on Principle', and founder of Dynamicland, the nonprofit lab that built the Realtalk communal spatial-computing system.",
    identity: {
      wikidataId: "Q28086018",
      officialSite: "https://worrydream.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Bret_Victor",
      profiles: [
        "https://x.com/worrydream",
        "https://github.com/worrydream",
        "https://dynamicland.org/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T03:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    home,
    cv,
    refs,
    july2023,
    magicInk,
    simulationTool,
    tenBrighterIdeas,
    explorableExplanations,
    tangle,
    scrubbingCalculator,
    ladderOfAbstraction,
    briefRant,
    learnableProgramming,
    killMath,
    ddvAddendum,
    engelbart,
    mediaUnthinkable,
    mtuNote,
    dbx,
    seeingSpaces,
    hrotNote,
    climateChange,
    dlZine,
    dlProgress2019,
    dlProgress2021,
    dlFaq,
    dlIntro,
    dlOpenSource,
    dlPublicSpace,
    dlRealtalkArchive,
    dlHrotArchive,
    dlFounding,
    dlDonate,
    nonprofitNarrative,
    iopVimeo,
    sddfVimeo,
    fopVimeo,
    hrotYoutube,
    ddvYoutube,
    dlIntroVideo,
    wikipedia,
    wikidata,
    wiredBeyondTouchscreen,
    reformUtopian,
    bloombergSap,
    atlanticApocalypse,
    techReviewLearnable,
    fastCompanyKillMath,
    ftrainPodcast,
    viHartHistory,
    siggraphSf,
    cusecSchedule,
    splashKeynote,
    uistKeynotes,
    egconf,
    melcherOurChoice,
    wiredPushPop,
    pogueNyt,
    archiveOrgIop,
    iopTranscript,
  ],
  claims: [
    {
      id: "claim-caltech-bs",
      kind: "fact",
      text: "Bret Victor earned a BS in electrical engineering from the California Institute of Technology in 1999.",
      sourceIds: [S.wikipedia, S.cv],
    },
    {
      id: "claim-berkeley-ms",
      kind: "fact",
      text: "He earned a master's degree in electrical engineering from UC Berkeley in 2001.",
      sourceIds: [S.wikipedia, S.cv],
    },
    {
      id: "claim-alesis",
      kind: "fact",
      text: "After graduate school he worked at Alesis, where he designed and engineered the Alesis Ion analog-modeling synthesizer and its successor, the Micron (also sold as the Akai Miniak); his own site chronology places the Micron in 2004.",
      sourceIds: [S.wikipedia, S.cv, S.home],
    },
    {
      id: "claim-iigs-apps",
      kind: "fact",
      text: "His CV reports that in earlier independent software work he published more than thirty apps for the Apple IIgs and other platforms; the catalog is self-reported.",
      sourceIds: [S.cv],
    },
    {
      id: "claim-bart-widget",
      kind: "fact",
      text: "He designed and engineered a BART train-trip scheduler Dashboard widget with a novel UI, which his CV lists as an Apple Design Award winner under 2005.",
      sourceIds: [S.cv],
    },
    {
      id: "claim-magic-ink",
      kind: "fact",
      text: "His book-length essay 'Magic Ink: Information Software and the Graphical Interface' was released as a draft on March 15, 2006, and argues that information software design is the design of context-sensitive information graphics.",
      sourceIds: [S.magicInk, S.cv],
    },
    {
      id: "claim-apple-join",
      kind: "fact",
      text: "He joined Apple in August 2007 as a 'Human Interface Inventor', working in a small internal R&D prototyping group that made roughly an app a week exploring new UI ideas for experimental hardware.",
      sourceIds: [S.reformUtopian, S.wiredBeyondTouchscreen],
    },
    {
      id: "claim-apple-exit-date",
      kind: "fact",
      text: "His own CV and site chronology date his Apple tenure to 2007–2010, while Wikipedia reports 2007–2011; the exit date is not pinned down in the public record.",
      sourceIds: [S.cv, S.home, S.wikipedia, S.wiredBeyondTouchscreen],
    },
    {
      id: "claim-ipad-role",
      kind: "fact",
      text: "He was among the small group who worked on the initial iPad design — Wired describes him as one of the first people in the world to tinker with an iPad — and Wikipedia reports he contributed to other products including the Apple Watch; the specifics remain undocumented because of Apple's secrecy.",
      sourceIds: [S.wiredBeyondTouchscreen, S.wikipedia, S.reformUtopian],
    },
    {
      id: "claim-hid-proto",
      kind: "fact",
      text: "His bio states that his work at Apple established the internal 'HID Proto' future-interfaces prototyping team, and that he initiated, designed, and prototyped over seventy concept projects there; these are self-reported claims.",
      sourceIds: [S.home, S.cv],
    },
    {
      id: "claim-our-choice",
      kind: "fact",
      text: "His CV credits him with designing and engineering fifteen interactive data graphics for 'Our Choice', Al Gore's 2011 interactive book app built by Push Pop Press and produced by Melcher Media; the app won a 2011 Apple Design Award.",
      sourceIds: [S.cv, S.melcherOurChoice, S.wiredPushPop, S.pogueNyt],
    },
    {
      id: "claim-ada-twice",
      kind: "fact",
      text: "His site states that his work has won the Apple Design Award twice — the BART widget and the Our Choice graphics are the two documented cases.",
      sourceIds: [S.home, S.cv, S.melcherOurChoice],
    },
    {
      id: "claim-iop-cusec",
      kind: "fact",
      text: "He delivered the keynote 'Inventing on Principle' at CUSEC in Montreal on January 20, 2012; posted online in February 2012, the talk went viral and is the work most associated with him.",
      sourceIds: [S.cusecSchedule, S.iopVimeo, S.archiveOrgIop, S.atlanticApocalypse],
    },
    {
      id: "claim-brief-rant",
      kind: "fact",
      text: "He published 'A Brief Rant on the Future of Interaction Design' on November 8, 2011, arguing that Microsoft's 'Productivity Future Vision' and touchscreen-future visions generally are a timid increment over a status quo that underuses the human hand.",
      sourceIds: [S.briefRant],
    },
    {
      id: "claim-learnable",
      kind: "fact",
      text: "He published 'Learnable Programming' in September 2012, framed as a response to Khan Academy's new computer-science environment, which had cited his work as an inspiration.",
      sourceIds: [S.learnableProgramming, S.techReviewLearnable],
    },
    {
      id: "claim-sddf",
      kind: "fact",
      text: "He presented 'Stop Drawing Dead Fish', a talk on art and computers, to the San Francisco ACM SIGGRAPH chapter at Adobe's 601 Townsend Street office on May 16, 2012; the recording circulated online in 2013.",
      sourceIds: [S.siggraphSf, S.sddfVimeo],
    },
    {
      id: "claim-ddv",
      kind: "fact",
      text: "'Drawing Dynamic Visualizations' — a talk demoing a tool for data-driven graphics drawn by direct manipulation — was recorded at the Stanford HCI seminar on February 1, 2013.",
      sourceIds: [S.ddvYoutube, S.ddvAddendum, S.home],
    },
    {
      id: "claim-mtu",
      kind: "fact",
      text: "'Media for Thinking the Unthinkable: Designing a new medium for science and engineering' was presented at the MIT Media Lab on April 4, 2013, and released online in late May 2013.",
      sourceIds: [S.mediaUnthinkable, S.mtuNote],
    },
    {
      id: "claim-fop",
      kind: "fact",
      text: "He presented 'The Future of Programming' at Dropbox's DBX conference on July 9, 2013, staged as if the year were 1973 — a parody framing that highlighted how many 'modern' ideas were already worked out decades earlier.",
      sourceIds: [S.dbx, S.fopVimeo],
    },
    {
      id: "claim-engelbart-eulogy",
      kind: "fact",
      text: "He published 'A few words on Doug Engelbart' on July 3, 2013, the day Engelbart died.",
      sourceIds: [S.engelbart],
    },
    {
      id: "claim-cdg",
      kind: "fact",
      text: "In 2014 he joined the Communications Design Group, a San Francisco research lab bankrolled by SAP and gathered by Alan Kay; fellow principal investigators included Vi Hart and Dan Ingalls, and the lab was deliberately modeled on ARPA/PARC-era research patronage.",
      sourceIds: [S.bloombergSap, S.reformUtopian, S.viHartHistory, S.wikipedia],
    },
    {
      id: "claim-seeing-spaces",
      kind: "fact",
      text: "He presented 'Seeing Spaces' — nominally a new kind of maker space, really an argument for room-scale dynamic media that make thinking visible — at the EG conference in May 2014.",
      sourceIds: [S.egconf, S.seeingSpaces],
    },
    {
      id: "claim-hrot",
      kind: "fact",
      text: "'The Humane Representation of Thought: A Trail Map for the 21st Century' was the closing keynote at both UIST 2014 (Honolulu) and SPLASH 2014 (Portland) in October 2014, and was released online in late December 2014.",
      sourceIds: [S.uistKeynotes, S.splashKeynote, S.hrotNote, S.hrotYoutube],
    },
    {
      id: "claim-climate-essay",
      kind: "fact",
      text: "He published 'What can a technologist do about climate change? A personal view' in November 2015, a citation-dense essay that argues technical tools are an under-the-radar lever for climate work.",
      sourceIds: [S.climateChange],
    },
    {
      id: "claim-harc-lineage",
      kind: "fact",
      text: "His CV folds the lab lineage into one line — 'Dynamicland. (Previously named: HARC, CDG.)' — and Wikipedia lists HARC among his workplaces; HARC was the Human Advancement Research Community housed at Y Combinator Research before the group spun out as the Dynamicland nonprofit.",
      sourceIds: [S.cv, S.wikipedia, S.viHartHistory],
    },
    {
      id: "claim-dynamicland-2017",
      kind: "fact",
      text: "The first Dynamicland community space was established in 2017 in downtown Oakland (the building at 9th and Broadway, 469 9th St), conceived as a public institution — 'the entire building is the computer' — where about a thousand visitors created hundreds of projects through community hours, workshops, and residencies.",
      sourceIds: [S.nonprofitNarrative, S.dlZine, S.dlFaq, S.dlProgress2019],
    },
    {
      id: "claim-realtalk-2017",
      kind: "fact",
      text: "Realtalk — the operating system and authoring environment underlying Dynamicland, in which programs are physical objects — first ran itself off papers it saw on a wall on June 14, 2017; his site calls it 'the world's only self-hosted spatial computing system'.",
      sourceIds: [S.dlZine, S.dlRealtalkArchive, S.home],
    },
    {
      id: "claim-501c3",
      kind: "fact",
      text: "The Dynamicland Foundation is a 501(c)(3) public charity with tax ID 84-3736935; its IRS application was submitted June 25, 2020 and granted July 22, 2020.",
      sourceIds: [S.dlDonate, S.nonprofitNarrative],
    },
    {
      id: "claim-oakland-closure",
      kind: "fact",
      text: "The Oakland community space ran from 2017 until covid, sat mostly unused for roughly two years, and the 469 9th St lease ended in December 2021 — after which research continued without a public space.",
      sourceIds: [S.dlFaq, S.dlProgress2021, S.july2023],
    },
    {
      id: "claim-berkeley-library",
      kind: "fact",
      text: "As of the lab's 2024 FAQ, the next iteration of Dynamicland is a 'dynamic library' in Berkeley, California, under development and not yet open to the public, with a hoped-for gradual opening in 2027; Realtalk-2024, a revision of the system's languages and physical forms, is in progress.",
      sourceIds: [S.dlFaq, S.dlIntro],
    },
    {
      id: "claim-communal-science",
      kind: "fact",
      text: "After the Oakland space closed for covid, the lab moved toward 'communal science' — integrating communal computing into an existing community of bioscientists — documented in the 2024 intro and presentation material.",
      sourceIds: [S.dlIntro, S.dlPublicSpace, S.dlIntroVideo],
    },
    {
      id: "claim-immediate-connection",
      kind: "stated_belief",
      text: "His stated guiding principle: 'Creators need an immediate connection to what they're creating' — when you make a change you need to see the effect immediately, with nothing hidden.",
      sourceIds: [S.iopTranscript, S.iopVimeo, S.atlanticApocalypse],
    },
    {
      id: "claim-interaction-last-resort",
      kind: "stated_belief",
      text: "In 'Magic Ink' he argues that for the large class of 'information software', interactivity is a curse for users and a crutch for designers — users' goals are better served by context-sensitive information graphics, with interaction as the last resort.",
      sourceIds: [S.magicInk],
    },
    {
      id: "claim-visions-matter",
      kind: "stated_belief",
      text: "He argues that visions matter because they give people direction and 'a group of inspired people is the most powerful force in the world' — his stated motive for criticizing timid visions of the future rather than letting them stand.",
      sourceIds: [S.briefRant],
    },
    {
      id: "claim-learnable-principles",
      kind: "stated_belief",
      text: "In 'Learnable Programming' he states that programming is a way of thinking rather than a rote skill, that people understand what they can see, and that Alan Perlis's dictum 'to understand a program, you must become both the machine and the program' is a 'widespread and virulent mistake'.",
      sourceIds: [S.learnableProgramming],
    },
    {
      id: "claim-symbolic-interface",
      kind: "stated_belief",
      text: "He holds that symbolic math notation is an interface rather than the mathematics itself — pointing to how multiplication seemed elite-difficult under roman numerals — and that concrete representations plus intuition-guided exploration can replace symbolic abstraction for real quantitative problems.",
      sourceIds: [S.killMath, S.fastCompanyKillMath, S.scrubbingCalculator],
    },
    {
      id: "claim-representations-thinkable",
      kind: "stated_belief",
      text: "He argues that new representations — written language, mathematical notation, information graphics — are responsible for civilization's largest leaps because they expand the territory of what is thinkable; the dynamic medium should deliberately continue that line rather than emulate paper.",
      sourceIds: [S.dlHrotArchive, S.uistKeynotes, S.mediaUnthinkable],
    },
    {
      id: "claim-inhumane-rectangles",
      kind: "stated_belief",
      text: "He calls the prevailing mode of knowledge work — sitting at a desk interpreting and manipulating symbols on tiny rectangles — inhumane and enormously wasteful of human capabilities, and proposes representations that draw on all senses and forms of movement and understanding.",
      sourceIds: [S.uistKeynotes, S.dlHrotArchive, S.hrotYoutube],
    },
    {
      id: "claim-paper-emulators",
      kind: "stated_belief",
      text: "He characterizes today's computer use as treating the machine as a 'really fast paper emulator' — dynamic media still shaped by print-era representations — and calls for inventing the dynamic medium's own forms.",
      sourceIds: [S.reformUtopian, S.wikipedia, S.mediaUnthinkable],
    },
    {
      id: "claim-dead-fish",
      kind: "stated_belief",
      text: "In 'Stop Drawing Dead Fish' he argues that computer-based art tools should embrace two forms of life — the artist behaving through real-time performance and the art behaving through real-time simulation — so that 'everything we draw should be alive by default'.",
      sourceIds: [S.sddfVimeo, S.home],
    },
    {
      id: "claim-engelbart-intent",
      kind: "stated_belief",
      text: "Writing on Engelbart, he insists the least important question is 'what did he build' and the most important is 'what world was he trying to create' — framing augmentation of human intellect and collective intelligence as intent, not product.",
      sourceIds: [S.engelbart],
    },
    {
      id: "claim-climate-duty",
      kind: "stated_belief",
      text: "He calls climate change 'the problem of our time' and argues that the tech industry's problem-solvers wrongly assume someone else is handling it; quoting Saul Griffith, he frames the technologist's role as creating options for policy-makers, including better tools for scientists and engineers.",
      sourceIds: [S.climateChange],
    },
    {
      id: "claim-not-a-product",
      kind: "stated_belief",
      text: "The lab states that Realtalk is not a product — 'you don't buy communal computing, you don't download communal computing' — and that it deliberately avoids anything that leads to product distribution, preferring the system be studied like a place, not a codebase.",
      sourceIds: [S.dlIntro, S.dlOpenSource],
    },
    {
      id: "claim-communal-real-world",
      kind: "stated_belief",
      text: "He describes Realtalk as a computing environment in which people participate in the physical world instead of navigating virtual spaces — computational media created together, in the open, with everyone's hands on the same tangible objects.",
      sourceIds: [S.dlRealtalkArchive, S.dlIntro, S.dlZine],
    },
    {
      id: "claim-medium-goal",
      kind: "stated_belief",
      text: "His CV states the goal plainly: 'I intend to invent a humane medium in which the thinkers of the next century will see, understand, and create systems' — a century-scale mission he has repeated across the site, the lab FAQ, and his talks.",
      sourceIds: [S.cv, S.dlFaq, S.hrotNote],
    },
    {
      id: "claim-demo-driven",
      kind: "pattern",
      text: "He argues almost exclusively through working artifacts: essays are interactive documents with live models, and talks are live-coded demonstrations rather than slide decks; formal papers and technical reports are largely absent from his publication record.",
      sourceIds: [S.explorableExplanations, S.iopVimeo, S.dlFaq, S.home],
    },
    {
      id: "claim-low-profile-apple",
      kind: "pattern",
      text: "His Apple-era record is deliberately thin in public: what is documented comes mostly from his own CV and site plus a handful of profiles, and he rarely discusses specifics — consistent with Apple's secrecy norms.",
      sourceIds: [S.cv, S.reformUtopian, S.wiredBeyondTouchscreen],
    },
    {
      id: "claim-parc-model",
      kind: "pattern",
      text: "His institutional choices consistently follow the ARPA/PARC patronage model — long-horizon research insulated from product markets: SAP-funded CDG, then HARC inside Y Combinator Research, then a 501(c)(3) nonprofit that declines product distribution.",
      sourceIds: [S.bloombergSap, S.viHartHistory, S.dlFounding, S.nonprofitNarrative],
    },
    {
      id: "claim-place-not-code",
      kind: "pattern",
      text: "Across the 2013–2024 record his work steadily migrates from screen artifacts toward room-scale physical space and community institutions — Seeing Spaces' rooms, Dynamicland's building-as-computer, and the Berkeley dynamic library.",
      sourceIds: [S.seeingSpaces, S.dlZine, S.dlFaq, S.dlPublicSpace],
    },
    {
      id: "claim-misread-as-tools",
      kind: "pattern",
      text: "The Atlantic reports he was disillusioned by the reception of 'Inventing on Principle': readers took him to be interested in programming environments, while he describes his actual interest as how people see and understand systems — 'the visual representation of dynamic behavior'.",
      sourceIds: [S.atlanticApocalypse],
    },
    {
      id: "claim-apple-watch-hedge",
      kind: "speculation",
      text: "The claim that he contributed to the Apple Watch is plausible given his team and timeline, but it traces to secondary profiles rather than any primary disclosure, and its scope is unknowable under Apple secrecy.",
      sourceIds: [S.wikipedia, S.wiredBeyondTouchscreen],
    },
    {
      id: "claim-ipad-extent",
      kind: "speculation",
      text: "'Designed the earliest user interface concepts for the iPad' is his own framing on his site; profiles corroborate that he prototyped iPad UI ideas very early, but the degree to which shipped interfaces carry his work is not publicly verifiable.",
      sourceIds: [S.home, S.reformUtopian],
    },
    {
      id: "claim-influence-scale",
      kind: "speculation",
      text: "His bio says the public-domain work has 'been viewed millions of times, and directly inspired numerous products, companies, and academic papers'; coverage supports the direction of that influence, but the counts are self-reported and unquantified.",
      sourceIds: [S.home, S.atlanticApocalypse, S.techReviewLearnable],
    },
    {
      id: "claim-berkeley-2027-hedge",
      kind: "speculation",
      text: "The hoped-for 2027 gradual opening of the Berkeley dynamic library is the lab's own aspiration stated in 2024, not a committed date; the Oakland precedent suggests timelines slip.",
      sourceIds: [S.dlFaq],
    },
    {
      id: "claim-lab-founding-ambiguity",
      kind: "speculation",
      text: "The lab's own zine timeline begins 'our lab founded' in 2013, while press coverage has Victor joining CDG in 2014; the zine likely counts the CDG lineage he inherited, but the exact founding boundary is ambiguous.",
      sourceIds: [S.dlZine, S.bloombergSap, S.viHartHistory],
    },
  ],
  timeline: [
    {
      id: "event-caltech-bs",
      kind: "education",
      date: "1999",
      title: "BS in electrical engineering, Caltech",
      organization: "California Institute of Technology",
      organizationHandle: "california-institute-of-technology",
      sourceIds: [S.wikipedia, S.cv],
    },
    {
      id: "event-berkeley-ms",
      kind: "education",
      date: "2001",
      title: "Master's in electrical engineering, UC Berkeley",
      organization: "UC Berkeley",
      organizationHandle: "uc-berkeley",
      sourceIds: [S.wikipedia, S.cv],
    },
    {
      id: "event-alesis",
      kind: "role",
      date: "2002",
      end: "2004",
      title: "Designed and engineered synthesizers at Alesis",
      summary:
        "Developed the Alesis Ion and its successor the Micron (Akai Miniak) analog-modeling synthesizers; dates approximate per his site chronology.",
      organization: "Alesis",
      organizationHandle: "alesis",
      sourceIds: [S.wikipedia, S.cv, S.home],
    },
    {
      id: "event-bart-widget",
      kind: "award",
      date: "2005",
      title: "BART widget wins Apple Design Award",
      summary:
        "A train trip-scheduler Dashboard widget with novel UI; his CV lists the award under 2005.",
      sourceIds: [S.cv],
    },
    {
      id: "event-magic-ink",
      kind: "publication",
      date: "2006-03-15",
      title: "Published 'Magic Ink: Information Software and the Graphical Interface'",
      summary:
        "Book-length online essay arguing information software is context-sensitive graphic design, with interactivity as a last resort.",
      sourceIds: [S.magicInk],
    },
    {
      id: "event-apple",
      kind: "role",
      date: "2007-08",
      end: "2010",
      title: "Human Interface Inventor at Apple",
      summary:
        "Member of a small internal R&D prototyping group ('HID Proto'); designed UI concepts for experimental hardware including early iPad prototypes. End date shown per his own CV and Wired; Wikipedia reports 2011.",
      organization: "Apple",
      location: "Cupertino, California",
      organizationHandle: "apple",
      sourceIds: [S.reformUtopian, S.wiredBeyondTouchscreen, S.cv, S.wikipedia],
    },
    {
      id: "event-simulation-tool",
      kind: "publication",
      date: "2009-10-19",
      title: "Published 'Simulation as a Practical Tool'",
      summary:
        "Early essay arguing software enables a practical mathematics based on concrete modeling and simulation rather than symbolic manipulation.",
      sourceIds: [S.simulationTool],
    },
    {
      id: "event-ten-brighter-ideas",
      kind: "publication",
      date: "2010-03-29",
      title: "Published 'Ten Brighter Ideas?'",
      summary:
        "Prototype 'reactive document' — an explorable explanation of energy-conservation claims with checkable models and linked primary sources.",
      sourceIds: [S.tenBrighterIdeas, S.explorableExplanations],
    },
    {
      id: "event-explorable-explanations",
      kind: "publication",
      date: "2011-03-10",
      title: "Published 'Explorable Explanations'",
      summary:
        "Umbrella-project essay that popularized the term 'explorable explanation' — documents as environments to think in.",
      sourceIds: [S.explorableExplanations, S.wikipedia],
    },
    {
      id: "event-our-choice",
      kind: "project",
      date: "2011-04",
      title: "'Our Choice' interactive book app ships",
      summary:
        "Al Gore's book-as-app by Push Pop Press, produced by Melcher Media; Victor's CV credits him with fifteen interactive data graphics. Won a 2011 Apple Design Award.",
      organization: "Push Pop Press / Melcher Media",
      sourceIds: [S.cv, S.melcherOurChoice, S.wiredPushPop, S.pogueNyt],
    },
    {
      id: "event-ladder",
      kind: "publication",
      date: "2011-10",
      title: "Published 'Up and Down the Ladder of Abstraction'",
      summary:
        "Interactive essay on moving deliberately between concrete and abstract representations of a system.",
      sourceIds: [S.ladderOfAbstraction],
    },
    {
      id: "event-brief-rant",
      kind: "publication",
      date: "2011-11-08",
      title: "Published 'A Brief Rant on the Future of Interaction Design'",
      summary:
        "Response to Microsoft's 'Productivity Future Vision' video; argued touchscreen futures underuse the human hand.",
      sourceIds: [S.briefRant],
    },
    {
      id: "event-iop",
      kind: "media",
      date: "2012-01-20",
      title: "'Inventing on Principle' keynote at CUSEC",
      summary:
        "Live-demonstration keynote at the Canadian University Software Engineering Conference; posted online in February 2012 and went viral.",
      organization: "CUSEC",
      location: "Montreal, Quebec",
      organizationHandle: "cusec",
      sourceIds: [S.cusecSchedule, S.iopVimeo, S.atlanticApocalypse],
    },
    {
      id: "event-sddf",
      kind: "media",
      date: "2012-05-16",
      title: "'Stop Drawing Dead Fish' at SF ACM SIGGRAPH",
      summary:
        "Talk on the computer as a young art medium, arguing for art that lives through simulation and performance.",
      organization: "San Francisco ACM SIGGRAPH",
      location: "Adobe Systems, 601 Townsend St, San Francisco",
      organizationHandle: "san-francisco-acm-siggraph",
      sourceIds: [S.siggraphSf, S.sddfVimeo],
    },
    {
      id: "event-learnable",
      kind: "publication",
      date: "2012-09",
      title: "Published 'Learnable Programming'",
      summary:
        "Essay on designing programming systems for understanding, framed as a response to Khan Academy's new coding curriculum.",
      sourceIds: [S.learnableProgramming, S.techReviewLearnable],
    },
    {
      id: "event-ddv",
      kind: "media",
      date: "2013-02-01",
      title: "'Drawing Dynamic Visualizations' at Stanford HCI seminar",
      summary:
        "Demonstrated a tool for creating data-driven graphics through direct-manipulation drawing rather than code.",
      organization: "Stanford HCI seminar",
      location: "Stanford, California",
      organizationHandle: "stanford-hci-seminar",
      sourceIds: [S.ddvYoutube, S.ddvAddendum],
    },
    {
      id: "event-mtu",
      kind: "media",
      date: "2013-04-04",
      title: "'Media for Thinking the Unthinkable' at MIT Media Lab",
      summary:
        "Talk arguing for a new dynamic medium for science and engineering; he called it his most personal talk, driven by his own motivations.",
      organization: "MIT Media Lab",
      location: "Cambridge, Massachusetts",
      organizationHandle: "mit-media-lab",
      sourceIds: [S.mediaUnthinkable, S.mtuNote],
    },
    {
      id: "event-engelbart-eulogy",
      kind: "publication",
      date: "2013-07-03",
      title: "Published 'A few words on Doug Engelbart'",
      summary:
        "Eulogy published the day Engelbart died, urging readers to ask what world Engelbart was trying to create.",
      sourceIds: [S.engelbart],
    },
    {
      id: "event-fop",
      kind: "media",
      date: "2013-07-09",
      title: "'The Future of Programming' at DBX",
      summary:
        "Performed in period dress as if presenting in 1973, using era sources to show how much of programming's future was already explored.",
      organization: "Dropbox DBX conference",
      location: "San Francisco",
      organizationHandle: "dropbox-dbx-conference",
      sourceIds: [S.dbx, S.fopVimeo],
    },
    {
      id: "event-cdg",
      kind: "role",
      date: "2014",
      title: "Joined Communications Design Group",
      summary:
        "SAP-funded San Francisco lab gathered by Alan Kay; fellow PIs included Vi Hart and Dan Ingalls. The group later ran through HARC at Y Combinator Research before becoming the Dynamicland nonprofit.",
      organization: "Communications Design Group",
      location: "San Francisco",
      organizationHandle: "communications-design-group",
      sourceIds: [S.bloombergSap, S.reformUtopian, S.viHartHistory, S.wikipedia],
    },
    {
      id: "event-seeing-spaces",
      kind: "media",
      date: "2014-05",
      title: "'Seeing Spaces' at EG8",
      summary:
        "Talk on room-scale 'seeing spaces' where dynamic media make thinking visible in the physical world.",
      organization: "EG Conference",
      organizationHandle: "eg-conference",
      sourceIds: [S.egconf, S.seeingSpaces],
    },
    {
      id: "event-hrot",
      kind: "media",
      date: "2014-10",
      title: "'The Humane Representation of Thought' closing keynotes",
      summary:
        "Closing keynote at both UIST 2014 in Honolulu and SPLASH 2014 in Portland; a 'trail map for the 21st century' released online in December.",
      organization: "UIST / SPLASH",
      sourceIds: [S.uistKeynotes, S.splashKeynote, S.hrotNote],
    },
    {
      id: "event-climate-essay",
      kind: "publication",
      date: "2015-11",
      title: "Published 'What can a technologist do about climate change?'",
      summary:
        "A 'personal view' essay on where technologists can matter on climate, from funding to tools for scientists.",
      sourceIds: [S.climateChange],
    },
    {
      id: "event-harc",
      kind: "role",
      date: "2016",
      title: "Research group housed at HARC / Y Combinator Research",
      summary:
        "The CDG lineage continued inside the Human Advancement Research Community at Y Combinator Research before spinning out as Dynamicland; boundary dates are fuzzy in the public record.",
      organization: "HARC, Y Combinator Research",
      organizationHandle: "harc",
      sourceIds: [S.wikipedia, S.cv, S.viHartHistory],
    },
    {
      id: "event-dynamicland-opens",
      kind: "founded",
      date: "2017",
      title: "Dynamicland community space established in Oakland",
      summary:
        "A communal-computing workspace at 9th and Broadway — 'the entire building is the computer' — open through community hours, workshops, and residencies.",
      organization: "Dynamicland",
      location: "Oakland, California",
      organizationHandle: "dynamicland",
      sourceIds: [S.nonprofitNarrative, S.dlZine, S.dlFaq],
    },
    {
      id: "event-realtalk-first-run",
      kind: "milestone",
      date: "2017-06-14",
      title: "Realtalk first runs itself",
      summary:
        "The spatial computing system 'took its first thrilling baby-steps, running itself off of papers it saw on a wall'.",
      organization: "Dynamicland",
      organizationHandle: "dynamicland",
      sourceIds: [S.dlZine],
    },
    {
      id: "event-501c3",
      kind: "milestone",
      date: "2020-07-22",
      title: "Dynamicland Foundation granted 501(c)(3) status",
      summary:
        "Application submitted June 25, 2020; granted July 22, 2020. Tax ID 84-3736935.",
      organization: "Dynamicland Foundation",
      organizationHandle: "dynamicland-foundation",
      sourceIds: [S.nonprofitNarrative, S.dlDonate],
    },
    {
      id: "event-oakland-lease-end",
      kind: "milestone",
      date: "2021-12",
      title: "Oakland space lease ends",
      summary:
        "The 469 9th St community space — mostly unused through covid — was packed up at the end of 2021; research continued without a public space.",
      organization: "Dynamicland",
      location: "Oakland, California",
      organizationHandle: "dynamicland",
      sourceIds: [S.dlProgress2021, S.dlFaq],
    },
    {
      id: "event-dl-2024-relaunch",
      kind: "publication",
      date: "2024-08",
      title: "New Dynamicland research website and intro",
      summary:
        "Published a deep documentation site and an overview of Realtalk, communal computing, and communal science; announced the Berkeley 'dynamic library' direction.",
      organization: "Dynamicland",
      organizationHandle: "dynamicland",
      sourceIds: [S.dlIntro, S.dlIntroVideo, S.dlFaq],
    },
    {
      id: "event-computational-public-space",
      kind: "media",
      date: "2024-11",
      title: "'Computational Public Space' presentation",
      summary:
        "Presentation on what computing without screens could mean for public space and public life.",
      organization: "Dynamicland",
      organizationHandle: "dynamicland",
      sourceIds: [S.dlPublicSpace],
    },
  ],
  themes: [
    {
      id: "theme-representations-determine-thought",
      kind: "philosophy",
      status: "stated",
      title: "Representations determine the thinkable",
      summary:
        "His core intellectual commitment: notation and media are not neutral containers but determine what can be thought. Hindu-Arabic numerals, atom models, information graphics — each expanded civilization's thinkable territory, and the dynamic medium should be invented to do so deliberately.",
      sourceIds: [S.dlHrotArchive, S.mediaUnthinkable, S.fastCompanyKillMath, S.refs],
    },
    {
      id: "theme-immediate-connection",
      kind: "method",
      status: "stated",
      title: "Creators need an immediate connection to what they create",
      summary:
        "The principle behind 'Inventing on Principle': no delay, nothing hidden between a change and its effect. His demos push it from programming into drawing, animation, circuit design, and debugging.",
      sourceIds: [S.iopTranscript, S.iopVimeo, S.atlanticApocalypse],
    },
    {
      id: "theme-dynamic-medium",
      kind: "philosophy",
      status: "stated",
      title: "The dynamic medium beyond paper emulation",
      summary:
        "Print built civilization's representations but engages a narrow slice of human capability; screens today mostly emulate paper ('really fast paper emulators'). He frames his work as helping invent the dynamic medium itself — the next medium of thought after the printing press.",
      sourceIds: [S.mediaUnthinkable, S.dlHrotArchive, S.reformUtopian, S.home],
    },
    {
      id: "theme-humane-embodied",
      kind: "belief",
      status: "stated",
      title: "Humane, embodied, room-scale thinking",
      summary:
        "Knowledge work as 'an eye staring at tiny rectangles and fingers on a keyboard' is, in his words, inhumane and wasteful — like keeping a dog in a cage. Representations should engage all senses, spatial intuition, the hand, and the room.",
      sourceIds: [S.uistKeynotes, S.seeingSpaces, S.hrotYoutube],
    },
    {
      id: "theme-concrete-over-symbolic",
      kind: "method",
      status: "stated",
      title: "Concrete representation over symbolic abstraction",
      summary:
        "From 'Simulation as a Practical Tool' through Kill Math to the Scrubbing Calculator: symbolic notation is a historically contingent interface. Variables are 'numbers that vary'; direct manipulation, scrubbing, and simulation can replace algebraic ritual for real problems.",
      sourceIds: [S.killMath, S.scrubbingCalculator, S.simulationTool, S.fastCompanyKillMath],
    },
    {
      id: "theme-active-reading",
      kind: "method",
      status: "stated",
      title: "Text as an environment to think in",
      summary:
        "Explorable Explanations and the reactive-document work: readers should play with an author's assumptions, see consequences update, and inspect the model behind the prose — authorship with disclosed models rather than soundbites.",
      sourceIds: [S.explorableExplanations, S.tenBrighterIdeas, S.tangle],
    },
    {
      id: "theme-communal-computing",
      kind: "practice",
      status: "stated",
      title: "Communal computing in real space",
      summary:
        "Dynamicland's wager: computation belongs in the real world, shared between people in the same place — a community institution like a library or makerspace, not a personal screen. Programs are physical objects; the OS is a poster gallery anyone can edit.",
      sourceIds: [S.dlZine, S.dlIntro, S.dlRealtalkArchive, S.dlPublicSpace],
    },
    {
      id: "theme-parc-patronage",
      kind: "influence",
      status: "reported",
      title: "The ARPA/PARC patronage model",
      summary:
        "Press and participant accounts describe a deliberate recreation of ARPA/PARC-era research patronage — fund people, not milestones — via SAP-funded CDG, then HARC at Y Combinator Research, then a nonprofit that refuses productization. Engelbart and Kay are his declared lineage.",
      sourceIds: [S.bloombergSap, S.viHartHistory, S.dlFounding, S.engelbart, S.refs],
    },
    {
      id: "theme-prototype-as-argument",
      kind: "practice",
      status: "inferred",
      title: "The working demo as the argument",
      summary:
        "Rather than papers, he publishes interactive essays and performs live-coded talks where the artifact itself carries the argument; even the Dynamicland website is billed as built inside Realtalk. The record suggests he treats implemented media as the only honest evidence for claims about media.",
      sourceIds: [S.iopVimeo, S.explorableExplanations, S.dlIntro, S.home],
    },
    {
      id: "theme-climate-technologists",
      kind: "interest",
      status: "stated",
      title: "Technologists' duty on climate",
      summary:
        "He calls climate change the problem of our time and maps where engineering leverage hides — tools for scientists and engineers, modeling tools, and media for understanding situations — while framing technologists as creating options for policy-makers.",
      sourceIds: [S.climateChange],
    },
  ],
  works: [
    {
      id: "work-magic-ink",
      kind: "book",
      status: "published",
      title: "Magic Ink: Information Software and the Graphical Interface",
      date: "2006-03-15",
      summary:
        "Book-length essay that made his name in design circles: information software as context-sensitive information graphics, with interactivity as the last resort.",
      sourceIds: [S.magicInk, S.cv],
    },
    {
      id: "work-alesis-micron",
      kind: "product",
      status: "released",
      title: "Alesis Ion and Micron synthesizers",
      date: "2004",
      summary:
        "Analog-modeling synthesizers he designed and engineered at Alesis; the Micron also shipped as the Akai Miniak.",
      sourceIds: [S.wikipedia, S.cv, S.home],
    },
    {
      id: "work-bart-widget",
      kind: "product",
      status: "released",
      title: "BART trip-scheduler widget",
      date: "2005",
      summary:
        "Dashboard widget with a novel UI for planning BART trips; his CV lists it as an Apple Design Award winner.",
      sourceIds: [S.cv],
    },
    {
      id: "work-simulation-tool",
      kind: "paper",
      status: "published",
      title: "Simulation as a Practical Tool",
      date: "2009-10-19",
      summary:
        "Interactive essay arguing for concrete, simulation-based practical mathematics — an early precursor of Kill Math.",
      sourceIds: [S.simulationTool, S.killMath],
    },
    {
      id: "work-ten-brighter-ideas",
      kind: "design",
      status: "published",
      title: "Ten Brighter Ideas?",
      date: "2010-03-29",
      summary:
        "The prototype 'reactive document': energy-conservation claims with models the reader can play with and sources the reader can inspect.",
      sourceIds: [S.tenBrighterIdeas, S.explorableExplanations],
    },
    {
      id: "work-our-choice-graphics",
      kind: "design",
      status: "completed",
      title: "Interactive data graphics for Al Gore's 'Our Choice'",
      date: "2011",
      summary:
        "Fifteen interactive data graphics designed and engineered for the Push Pop Press book-app; the app won a 2011 Apple Design Award.",
      sourceIds: [S.cv, S.melcherOurChoice, S.pogueNyt],
    },
    {
      id: "work-explorable-explanations",
      kind: "project",
      status: "ongoing",
      title: "Explorable Explanations",
      date: "2011",
      summary:
        "Umbrella project for 'truly active reading' — reactive documents that let readers play with an author's models; the essay popularized the term.",
      sourceIds: [S.explorableExplanations, S.wikipedia],
    },
    {
      id: "work-tangle",
      kind: "product",
      status: "released",
      title: "Tangle",
      date: "2011",
      summary:
        "A small JavaScript library for authoring reactive documents, released alongside Explorable Explanations.",
      sourceIds: [S.tangle],
    },
    {
      id: "work-scrubbing-calculator",
      kind: "design",
      status: "published",
      title: "Scrubbing Calculator",
      date: "2011-05-31",
      summary:
        "Prototype for solving algebraic problems by scrubbing concrete numbers rather than manipulating symbols.",
      sourceIds: [S.scrubbingCalculator],
    },
    {
      id: "work-ladder",
      kind: "paper",
      status: "published",
      title: "Up and Down the Ladder of Abstraction",
      date: "2011-10",
      summary:
        "Interactive essay on systematically moving a system's representation between concrete instances and full-parameter abstractions.",
      sourceIds: [S.ladderOfAbstraction],
    },
    {
      id: "work-brief-rant",
      kind: "paper",
      status: "published",
      title: "A Brief Rant on the Future of Interaction Design",
      date: "2011-11-08",
      summary:
        "The essay that popularized the 'pictures under glass' critique of touchscreen-future vision videos.",
      sourceIds: [S.briefRant],
    },
    {
      id: "work-kill-math",
      kind: "project",
      status: "completed",
      title: "Kill Math",
      summary:
        "Umbrella project — Scrubbing Calculator, the dynamical-system explorer, and the unreleased 'Flux Garden' — for solving quantitative problems concretely; its lineage runs into the Dynamicland work.",
      sourceIds: [S.killMath, S.fastCompanyKillMath],
    },
    {
      id: "work-learnable-programming",
      kind: "paper",
      status: "published",
      title: "Learnable Programming",
      date: "2012-09",
      summary:
        "Essay laying out design principles for programming systems that make execution visible and support powerful ways of thinking.",
      sourceIds: [S.learnableProgramming, S.techReviewLearnable],
    },
    {
      id: "work-engelbart-eulogy",
      kind: "paper",
      status: "published",
      title: "A few words on Doug Engelbart",
      date: "2013-07-03",
      summary:
        "Eulogy-essay redirecting Engelbart's legacy from inventions to intent — 'what world was he trying to create?'",
      sourceIds: [S.engelbart],
    },
    {
      id: "work-seeing-spaces-poster",
      kind: "design",
      status: "published",
      title: "Seeing Spaces poster",
      date: "2014-08",
      summary:
        "The EG talk redesigned as a print comic/poster — his account of rooms as instruments for seeing across time and possibilities.",
      sourceIds: [S.seeingSpaces],
    },
    {
      id: "work-climate-essay",
      kind: "paper",
      status: "published",
      title: "What can a technologist do about climate change?",
      date: "2015-11",
      summary:
        "Citation-dense 'personal view' on technologists' leverage over climate — funding, energy production and consumption, tools for scientists, and model-driven media.",
      sourceIds: [S.climateChange],
    },
    {
      id: "work-dynamicland",
      kind: "project",
      status: "ongoing",
      title: "Dynamicland",
      date: "2017",
      location: "Oakland, California (now Berkeley)",
      summary:
        "The nonprofit research lab and communal-computing space he founded and leads: a building-scale computer where people create dynamic media together with physical objects.",
      sourceIds: [S.dlZine, S.dlFaq, S.nonprofitNarrative, S.dlIntro],
    },
    {
      id: "work-realtalk",
      kind: "project",
      status: "ongoing",
      title: "Realtalk",
      date: "2017",
      summary:
        "The operating system/authoring environment behind Dynamicland — self-hosted, built out of physical objects, edited by anyone in the room; Realtalk-2024 revises its languages and physical forms.",
      sourceIds: [S.dlRealtalkArchive, S.dlZine, S.dlFaq, S.dlOpenSource],
    },
    {
      id: "work-oakland-space",
      kind: "building",
      status: "completed",
      title: "Dynamicland Oakland community space",
      date: "2017",
      location: "469 9th St, Oakland, California",
      summary:
        "The community workspace that ran 2017 to covid — projector-and-camera ceiling infrastructure where about a thousand visitors created hundreds of communal-computing projects; the lease ended December 2021.",
      sourceIds: [S.dlZine, S.dlFaq, S.dlProgress2021, S.dlProgress2019],
    },
    {
      id: "work-berkeley-library",
      kind: "project",
      status: "in_progress",
      title: "Dynamicland 'dynamic library', Berkeley",
      location: "Berkeley, California",
      summary:
        "The announced next iteration of the Dynamicland space — under development as of the 2024 FAQ, with a hoped-for gradual public opening in 2027.",
      sourceIds: [S.dlFaq, S.dlIntro],
    },
  ],
  appearances: [
    {
      id: "appearance-iop",
      title: "Inventing on Principle",
      venue: "CUSEC 2012",
      publishedAt: "2012-01-20",
      participants: ["Bret Victor"],
      summary:
        "The signature talk: live demos of immediate-connection programming and design environments, closing on finding and following a guiding principle. Posted online February 2012; went viral.",
      media: [
        { type: "video", url: "https://vimeo.com/36579366", sourceId: S.iopVimeo },
        {
          type: "video",
          url: "https://archive.org/details/vimeo-36579366",
          sourceId: S.archiveOrgIop,
        },
        {
          type: "transcript",
          url: "https://github.com/ezyang/cusec2012-victor",
          sourceId: S.iopTranscript,
        },
      ],
      sourceIds: [S.iopVimeo, S.cusecSchedule, S.archiveOrgIop],
    },
    {
      id: "appearance-sddf",
      title: "Stop Drawing Dead Fish",
      venue: "San Francisco ACM SIGGRAPH, Adobe Systems",
      publishedAt: "2012-05-16",
      participants: ["Bret Victor"],
      summary:
        "A talk on the computer as a young art medium — simulation and performance as the two kinds of life drawing tools should embrace.",
      media: [
        { type: "video", url: "https://vimeo.com/64895205", sourceId: S.sddfVimeo },
      ],
      sourceIds: [S.sddfVimeo, S.siggraphSf],
    },
    {
      id: "appearance-ddv",
      title: "Drawing Dynamic Visualizations",
      venue: "Stanford HCI seminar",
      publishedAt: "2013-02-01",
      participants: ["Bret Victor"],
      summary:
        "Demonstrates a tool that draws data-driven pictures by direct manipulation — Illustrator's directness with D3's dynamics.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=ef2jpjTEB5U",
          sourceId: S.ddvYoutube,
        },
      ],
      sourceIds: [S.ddvYoutube, S.ddvAddendum],
    },
    {
      id: "appearance-mtu",
      title: "Media for Thinking the Unthinkable",
      venue: "MIT Media Lab",
      publishedAt: "2013-04-04",
      participants: ["Bret Victor"],
      summary:
        "His self-described most personal talk: a sketch of a dynamic medium for science and engineering, with working demos of system representations.",
      media: [
        {
          type: "video",
          url: "https://worrydream.com/MediaForThinkingTheUnthinkable/",
          sourceId: S.mediaUnthinkable,
        },
      ],
      sourceIds: [S.mediaUnthinkable, S.mtuNote],
    },
    {
      id: "appearance-fop",
      title: "The Future of Programming",
      venue: "Dropbox DBX conference",
      publishedAt: "2013-07-09",
      participants: ["Bret Victor"],
      summary:
        "A deadpan period piece — delivered as if it were 1973 — surveying era papers (Sutherland, Engelbart, Hewitt, generative and constraint programming) to argue the future of programming may have stalled.",
      media: [
        { type: "video", url: "https://vimeo.com/71278954", sourceId: S.fopVimeo },
      ],
      sourceIds: [S.fopVimeo, S.dbx],
    },
    {
      id: "appearance-seeing-spaces",
      title: "Seeing Spaces",
      venue: "EG Conference (EG8)",
      publishedAt: "2014-05",
      participants: ["Bret Victor"],
      summary:
        "Nominally 'a new kind of maker space' — really an argument for room-scale dynamic media that make the invisible visible in physical work.",
      media: [
        {
          type: "video",
          url: "https://egconf.com/videos/bret-victor-toolmaker-eg8",
          sourceId: S.egconf,
        },
      ],
      sourceIds: [S.egconf, S.seeingSpaces],
    },
    {
      id: "appearance-hrot",
      title: "The Humane Representation of Thought",
      venue: "UIST 2014 (Honolulu) and SPLASH 2014 (Portland) — closing keynote",
      publishedAt: "2014-10-24",
      participants: ["Bret Victor"],
      summary:
        "His research agenda as a talk: why symbol-on-rectangle knowledge work is inhumane, and how each externalized-thought activity — conversing, reading, writing, presenting — could be redesigned for the dynamic medium.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=agOdP2Bmieg",
          sourceId: S.hrotYoutube,
        },
      ],
      sourceIds: [S.uistKeynotes, S.splashKeynote, S.hrotNote, S.hrotYoutube],
    },
    {
      id: "appearance-postlight",
      title: "Computing is Everywhere: A Conversation with Bret Victor",
      venue: "The Postlight Podcast",
      publishedAt: "2018-03-19",
      participants: ["Bret Victor", "Paul Ford", "Rich Ziade"],
      summary:
        "Podcast interview on Dynamicland as communal computing, the tech behind it, intentional communities, and how Apple's culture of secrecy shaped his vision of community computing.",
      media: [
        {
          type: "audio",
          url: "https://www.ftrain.com/pub-computing-is-everywhere-a-conversation-with-bret-v-pui5b",
          sourceId: S.ftrainPodcast,
        },
      ],
      sourceIds: [S.ftrainPodcast],
    },
    {
      id: "appearance-dl-intro",
      title: "Dynamicland intro",
      venue: "Dynamicland",
      publishedAt: "2024-08",
      participants: ["Bret Victor"],
      summary:
        "Narrated overview of Realtalk ('not a codebase — a poster gallery'), communal computing, and the lab's post-covid move into communal science.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=5Q9r-AEzRMA",
          sourceId: S.dlIntroVideo,
        },
      ],
      sourceIds: [S.dlIntro, S.dlIntroVideo],
    },
    {
      id: "appearance-cps",
      title: "Computational Public Space",
      venue: "Dynamicland",
      publishedAt: "2024-11",
      participants: ["Bret Victor"],
      summary:
        "Presentation on integrating computation into public space — and on what centrally-planned, isolating, surveilled screen-based computing does to public life.",
      media: [
        {
          type: "transcript",
          url: "https://dynamicland.org/2024/Computational_Public_Space/",
          sourceId: S.dlPublicSpace,
        },
      ],
      sourceIds: [S.dlPublicSpace],
    },
  ],
  relations: [
    {
      id: "rel-alesis",
      kind: "employed_by",
      target: "alesis",
      targetName: "Alesis",
      targetKind: "organization",
      note: "Designed and engineered the Ion and Micron analog-modeling synthesizers, c. 2002–2004.",
      start: "2002",
      end: "2004",
      targetWikidataId: "Q248294",
      sourceIds: [S.wikipedia, S.cv, S.home],
    },
    {
      id: "rel-apple",
      kind: "employed_by",
      target: "apple",
      targetName: "Apple",
      targetKind: "organization",
      note: "Human Interface Inventor — internal R&D prototyping of early iPad-era interface concepts, August 2007 until 2010 on his own CV (Wikipedia reports 2011).",
      start: "2007-08",
      end: "2010",
      targetWikidataId: "Q312",
      sourceIds: [S.cv, S.reformUtopian, S.wiredBeyondTouchscreen, S.wikipedia],
    },
    {
      id: "rel-push-pop-press",
      kind: "collaborated",
      target: "push-pop-press",
      targetName: "Push Pop Press",
      targetKind: "organization",
      note: "Designed fifteen interactive data graphics for the Our Choice book app, 2010–2011.",
      start: "2010",
      end: "2011",
      sourceIds: [S.cv, S.wiredPushPop, S.pogueNyt],
    },
    {
      id: "rel-melcher-media",
      kind: "collaborated",
      target: "melcher-media",
      targetName: "Melcher Media",
      targetKind: "organization",
      note: "Producer of the Our Choice app that carried his interactive graphics.",
      sourceIds: [S.cv, S.melcherOurChoice],
    },
    {
      id: "rel-al-gore",
      kind: "collaborated",
      target: "al-gore",
      targetName: "Al Gore",
      note: "His interactive book app Our Choice carried Victor's fifteen data graphics; the app won a 2011 Apple Design Award.",
      targetWikidataId: "Q19673",
      sourceIds: [S.cv, S.pogueNyt, S.wiredPushPop],
    },
    {
      id: "rel-communications-design-group",
      kind: "member_of",
      target: "communications-design-group",
      targetName: "Communications Design Group",
      targetKind: "organization",
      note: "Principal investigator at the SAP-funded, PARC-modeled San Francisco lab gathered by Alan Kay, from 2014.",
      start: "2014",
      sourceIds: [S.bloombergSap, S.reformUtopian, S.viHartHistory, S.wikipedia],
    },
    {
      id: "rel-harc",
      kind: "member_of",
      target: "harc",
      targetName: "HARC — Human Advancement Research Community",
      targetKind: "organization",
      note: "The CDG lineage housed at Y Combinator Research before spinning out as Dynamicland; his CV lists HARC 2016–2018.",
      start: "2016",
      end: "2018",
      sourceIds: [S.cv, S.wikipedia, S.viHartHistory],
    },
    {
      id: "rel-sap",
      kind: "funded_by",
      target: "sap",
      targetName: "SAP",
      targetKind: "organization",
      note: "SAP bankrolled the Communications Design Group where he was a principal investigator.",
      targetWikidataId: "Q552581",
      sourceIds: [S.bloombergSap, S.viHartHistory],
    },
    {
      id: "rel-dynamicland",
      kind: "founded",
      target: "dynamicland",
      targetName: "Dynamicland",
      targetKind: "organization",
      note: "Founded the nonprofit communal-computing lab and leads it; the Oakland community space ran 2017–2021 and the research continues.",
      start: "2017",
      sourceIds: [S.dlZine, S.dlFaq, S.nonprofitNarrative, S.dlIntro],
    },
    {
      id: "rel-vi-hart",
      kind: "collaborated",
      target: "vi-hart",
      targetName: "Vi Hart",
      note: "Fellow principal investigator at the Communications Design Group.",
      targetWikidataId: "Q677871",
      sourceIds: [S.viHartHistory, S.bloombergSap],
    },
    {
      id: "rel-dan-ingalls",
      kind: "collaborated",
      target: "dan-ingalls",
      targetName: "Dan Ingalls",
      note: "Fellow principal investigator at the Communications Design Group.",
      targetWikidataId: "Q92772",
      sourceIds: [S.viHartHistory, S.bloombergSap],
    },
    {
      id: "rel-toby-schachman",
      kind: "collaborated",
      target: "toby-schachman",
      targetName: "Toby Schachman",
      note: "Co-author on the Realtalk system lineage at Dynamicland.",
      sourceIds: [S.dlRealtalkArchive],
    },
    {
      id: "rel-paula-te",
      kind: "collaborated",
      target: "paula-te",
      targetName: "Paula Te",
      note: "Co-author on the Realtalk system lineage at Dynamicland.",
      sourceIds: [S.dlRealtalkArchive],
    },
    {
      id: "rel-josh-horowitz",
      kind: "collaborated",
      target: "josh-horowitz",
      targetName: "Josh Horowitz",
      note: "Co-author on the Realtalk system lineage at Dynamicland.",
      sourceIds: [S.dlRealtalkArchive],
    },
    {
      id: "rel-luke-iannini",
      kind: "collaborated",
      target: "luke-iannini",
      targetName: "Luke Iannini",
      note: "Co-author on the Realtalk system lineage at Dynamicland.",
      sourceIds: [S.dlRealtalkArchive],
    },
    {
      id: "rel-david-hellman",
      kind: "collaborated",
      target: "david-hellman",
      targetName: "David Hellman",
      note: "Co-author of 'The Humane Representation of Thought' (2014).",
      sourceIds: [S.dlHrotArchive],
    },
    {
      id: "rel-douglas-engelbart",
      kind: "influenced_by",
      target: "douglas-engelbart",
      targetName: "Douglas Engelbart",
      note: "His declared lineage — the 2013 eulogy essay redirects Engelbart's legacy toward the augmentation of human intent.",
      targetWikidataId: "Q92614",
      sourceIds: [S.engelbart, S.refs],
    },
    {
      id: "rel-alan-kay",
      kind: "influenced_by",
      target: "alan-kay",
      targetName: "Alan Kay",
      note: "Declared lineage — Kay gathered the Communications Design Group; Victor's annotated bibliography centers Kay and the Smalltalk tradition.",
      targetWikidataId: "Q92742",
      sourceIds: [S.viHartHistory, S.refs, S.bloombergSap],
    },
    {
      id: "rel-khan-academy",
      kind: "influenced",
      target: "khan-academy",
      targetName: "Khan Academy",
      targetKind: "organization",
      note: "Khan Academy's computer-science environment cited his work as inspiration; his 'Learnable Programming' essay was his response to it.",
      targetWikidataId: "Q94887",
      sourceIds: [S.learnableProgramming, S.techReviewLearnable],
    },
    {
      id: "rel-paul-ford",
      kind: "interviewed_by",
      target: "paul-ford",
      targetName: "Paul Ford",
      note: "Postlight Podcast conversation, March 2018.",
      sourceIds: [S.ftrainPodcast],
    },
    {
      id: "rel-rich-ziade",
      kind: "interviewed_by",
      target: "rich-ziade",
      targetName: "Rich Ziade",
      note: "Postlight Podcast conversation, March 2018.",
      sourceIds: [S.ftrainPodcast],
    },
  ],
  openQuestions: [
    "His Apple tenure end date is unsettled: his own CV and site chronology say 2007–2010; Wikipedia reports 2007–2011. No primary record resolves it.",
    "The specifics of his iPad and reported Apple Watch work are undocumented — Apple's secrecy means the public record is his CV plus secondary profiles, and 'designed the earliest UI concepts' is his own framing.",
    "His birth year is absent from the public record (Wikipedia lists it as missing); biographical coverage begins at Caltech.",
    "The CDG → HARC → Dynamicland lineage is fuzzy at the boundaries: the lab's zine counts from a 2013 founding, while press coverage has Victor joining CDG in 2014 and HARC's Y Combinator Research period is thinly dated.",
    "The Berkeley 'dynamic library' has a hoped-for 2027 gradual opening stated in the 2024 FAQ — aspiration, not a committed date.",
    "A detailed public report on how Realtalk works remains unpublished; the lab says it intends to write one after the Realtalk-2024 iteration lands.",
    "Influence claims — 'millions' of views, 'billions' of Apple products carrying his group's inventions, numerous inspired companies — are self-reported on his site and not independently quantified.",
    "Early-career details (the Apple IIgs software catalog, exact Alesis dates) come solely from his CV.",
    "'Stop Drawing Dead Fish' has two dates in circulation: the talk itself (May 16, 2012, per the SF ACM SIGGRAPH listing) and the video's wider 2013 release.",
    "Magic Ink carries a March 15, 2006 release date on the essay itself, though his own site chronology files it under 2005.",
  ],
  body: `Bret Victor is an American interface designer, computer scientist, and electrical engineer whose public career is a single sustained argument: the representations a civilization uses determine what it can think, and the dynamic medium we are currently building should be invented deliberately rather than inherited accidentally from paper. He is best known for the talk "Inventing on Principle" (2012), the essays "Magic Ink" (2006) and "Learnable Programming" (2012), and for founding Dynamicland, the Oakland-born nonprofit lab whose Realtalk system treats an entire room — walls, tables, paper, people — as the computer.

## Formation and the Apple years

Victor earned a BS in electrical engineering from Caltech in 1999 and a master's at UC Berkeley in 2001, then spent the early 2000s in industry — notably at Alesis, where he designed the Ion and Micron analog-modeling synthesizers. In August 2007 he joined Apple as a "Human Interface Inventor" in a small internal R&D prototyping group. Profiles in Wired and re:form describe him as one of the first people anywhere to prototype on iPad hardware; his own bio says his work established Apple's internal future-interfaces prototyping team and that he ran over seventy concept projects. The Apple record is deliberately thin — his CV dates the tenure 2007–2010, Wikipedia says 2007–2011, and specifics (iPad, reported Apple Watch contributions) are unverifiable under Apple secrecy. What is documented independently: his fifteen interactive data graphics for Al Gore's *Our Choice* (Push Pop Press/Melcher Media, 2011) helped the app win an Apple Design Award, and his earlier BART trip-planner widget had already won one.

## The public burst, 2006–2015

"Magic Ink" (2006) argued that for most software, interaction is a crutch — information software should be context-sensitive graphic design where the machine shows only what is relevant. Between 2010 and 2013 he produced a remarkable run of first-person artifacts: the reactive-document prototype "Ten Brighter Ideas?" (2010); "Explorable Explanations" (2011), which popularized the term; the Tangle library; the "Scrubbing Calculator" and the Kill Math umbrella, which argued symbolic math notation is a bad interface rather than the mathematics itself; "Up and Down the Ladder of Abstraction" (2011); and "A Brief Rant on the Future of Interaction Design" (November 8, 2011), the viral critique of Microsoft's touchscreen future vision that insisted the human hand is being wasted on "pictures under glass."

"Inventing on Principle," his January 20, 2012 CUSEC keynote, articulated the principle — creators need an immediate connection to what they create — through live-coded demos that became canonical viewing for a generation of tools-for-thought researchers. *The Atlantic* later reported his dismay that audiences read it as a talk about programming tools rather than about how people see and understand systems. The run continued through "Learnable Programming" (September 2012), "Stop Drawing Dead Fish" (SF ACM SIGGRAPH, May 2012), "Drawing Dynamic Visualizations" (Stanford HCI, February 2013), "Media for Thinking the Unthinkable" (MIT Media Lab, April 2013 — his self-described most personal talk), the 1973-set performance "The Future of Programming" (DBX, July 2013), and a widely quoted eulogy for Doug Engelbart. In 2014 he delivered "Seeing Spaces" (EG) and "The Humane Representation of Thought," the closing keynote at both UIST and SPLASH — his research agenda stated aloud: knowledge work confined to "symbols on tiny rectangles" is inhumane, and the dynamic medium should engage the whole human sensorium. "What can a technologist do about climate change?" (November 2015) applied the same tools-and-media lens to the climate emergency.

## The lab years: CDG, HARC, Dynamicland

In 2014 Victor joined the Communications Design Group, a San Francisco lab gathered by Alan Kay and bankrolled by SAP in explicit imitation of ARPA/PARC patronage; fellow PIs included Vi Hart and Dan Ingalls. The group continued through HARC at Y Combinator Research, then spun out as the Dynamicland Foundation, a 501(c)(3) granted in July 2020. In 2017 the lab opened a community space at 9th and Broadway in downtown Oakland — "the entire building is the computer" — where cameras and projectors in the ceiling turn paper, objects, and walls into a shared computing environment called Realtalk, in which programs are physical objects anyone in the room can inspect and edit. About a thousand visitors produced hundreds of projects before covid closed the space; the lease ended December 2021.

As of the lab's 2024 documentation site, Dynamicland continues as a nonprofit research lab — Realtalk-2024 is revising the system's languages and physical forms, "communal science" work integrates the medium into a community of bioscientists, and a "dynamic library" in Berkeley is under development with a hoped-for 2027 gradual opening. Notably, the lab declines product distribution: Realtalk is meant to be studied like a place, not a codebase.

## What the record does not settle

The thin spots are the Apple specifics (his own account versus near-total secrecy), the exact CDG/HARC founding boundaries, the self-reported influence metrics, and whether Realtalk's long-promised technical report will materialize — all preserved as open questions rather than smoothed over.

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
