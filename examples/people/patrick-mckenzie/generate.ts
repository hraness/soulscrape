#!/usr/bin/env bun
/** Generate examples/people/patrick-mckenzie/person-index.json with derived source ids. */

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

// --- Subject-controlled pages --------------------------------------------

const kalzumeusHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Kalzumeus Software",
  url: "https://www.kalzumeus.com/",
  publisher: "kalzumeus.com",
  notes:
    "Subject's own homepage; self-describes writing volume, hobbies, and the Stripe advisory disclaimer.",
});
const kalzumeusStartHere = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Brief Biography — Kalzumeus Software",
  url: "https://www.kalzumeus.com/start-here-if-youre-new/",
  publisher: "kalzumeus.com",
  notes:
    "His condensed autobiography and the origin story of the patio11 handle; self-reported.",
});
const kalzumeusAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About patio11 — Kalzumeus Software",
  url: "https://www.kalzumeus.com/about/",
  publisher: "kalzumeus.com",
  notes:
    "Self-description as 'recovering Japanese salaryman' and current Stripe advisor; explains the Kalzumeus name.",
});
const kalzumeusCharity = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Charitable Activities — Kalzumeus Software",
  url: "https://www.kalzumeus.com/charity/",
  publisher: "kalzumeus.com",
  notes:
    "Hosted in satisfaction of Call The Shots, Inc.'s legal obligations; his own record of VaccinateCA's dates, staffing, and dissolution.",
});
const kalzumeusInvitation = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The Standing Invitation — Kalzumeus Software",
  url: "https://www.kalzumeus.com/standing-invitation/",
  publisher: "kalzumeus.com",
  notes: "His standing offer to read email from strangers about software and startups.",
});
const bamHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bits about Money by Patrick McKenzie (patio11)",
  url: "https://www.bitsaboutmoney.com/",
  publisher: "Bits about Money",
});
const bamArchive = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Previous issues of Bits about Money",
  url: "https://www.bitsaboutmoney.com/archive/",
  publisher: "Bits about Money",
  notes:
    "Full issue archive; earliest issues date to October 2021 and the footer attributes the publication to Kalzumeus Software, LLC.",
});
const csHome = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Complex Systems with Patrick McKenzie",
  url: "https://www.complexsystemspodcast.com/",
  publisher: "Complex Systems",
  notes: "Weekly Thursdays; full transcripts included.",
});
const csAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "About — Complex Systems",
  url: "https://www.complexsystemspodcast.com/about/",
  publisher: "Complex Systems",
  notes:
    "States the show's thesis (institutions that are complicated but not unknowable) and its transcript-editing policy.",
});
const hnProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Profile: patio11 — Hacker News",
  url: "https://news.ycombinator.com/user?id=patio11",
  publisher: "Hacker News",
  notes:
    "His own profile text lists previous ventures (Stripe, Starfighter, Appointment Reminder, Bingo Card Creator) and his open-email policy.",
});
const githubProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Patrick McKenzie — GitHub",
  url: "https://github.com/patio11",
  publisher: "GitHub",
  notes: "Bio: 'Working for the Internet.' Location listed as Tokyo.",
});
const linkedin = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Patrick McKenzie — LinkedIn",
  url: "https://www.linkedin.com/in/patrickmckenzie",
  publisher: "LinkedIn",
  notes:
    "Self-maintained profile: Washington University in St. Louis 2000–2004; Coordinator for International Relations at Softopia Japan Jul 2004–Jul 2007.",
});

// --- First-person essays and posts ---------------------------------------

const essayNames = source({
  binding: "first_person",
  mediaType: "article",
  title: "Falsehoods Programmers Believe About Names",
  url: "https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/",
  publisher: "kalzumeus.com",
  publishedAt: "2010-06-17",
});
const essayProgrammer = source({
  binding: "first_person",
  mediaType: "article",
  title: "Don't Call Yourself A Programmer, And Other Career Advice",
  url: "https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/",
  publisher: "kalzumeus.com",
  publishedAt: "2011-10-28",
});
const essaySalary = source({
  binding: "first_person",
  mediaType: "article",
  title: "Salary Negotiation: Make More Money, Be More Valued",
  url: "https://www.kalzumeus.com/2012/01/23/salary-negotiation/",
  publisher: "kalzumeus.com",
  publishedAt: "2012-01-23",
});
const microconfPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Software Businesses In 5 Hours A Week: Microconf 2011 Presentation (1 hour)",
  url: "https://www.kalzumeus.com/2011/06/17/software-businesses-in-5-hours-a-week-microconf-2010-presentation-1-hour/",
  publisher: "kalzumeus.com",
  publishedAt: "2011-06-17",
  notes:
    "His own writeup (slides, video, commentary) of his MicroConf talk; contains the fullest first-person account of his move to Gifu and Bingo Card Creator's origin.",
});
const yir2010 = source({
  binding: "first_person",
  mediaType: "article",
  title: "Bingo Card Creator (& etc) Year In Review 2010",
  url: "https://www.kalzumeus.com/2010/12/17/bingo-card-creator-etc-year-in-review-2010/",
  publisher: "kalzumeus.com",
  publishedAt: "2010-12-17",
});
const yir2014 = source({
  binding: "first_person",
  mediaType: "article",
  title: "Kalzumeus Software Year in Review 2014",
  url: "https://www.kalzumeus.com/2014/12/22/kalzumeus-software-year-in-review-2014/",
  publisher: "kalzumeus.com",
  publishedAt: "2014-12-22",
});
const yir2016 = source({
  binding: "first_person",
  mediaType: "article",
  title: "Kalzumeus Software Year In Review 2016",
  url: "https://www.kalzumeus.com/2016/12/30/kalzumeus-software-year-in-review-2016/",
  publisher: "kalzumeus.com",
  publishedAt: "2016-12-30",
  notes:
    "The key primary source for the 2016 transitions: Starfighter shuttering in August, joining Stripe in September, selling Appointment Reminder.",
});
const starfighterPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "Announcing Starfighter",
  url: "https://www.kalzumeus.com/2015/03/09/announcing-starfighter/",
  publisher: "kalzumeus.com",
  publishedAt: "2015-03-09",
});
const sellingBcc = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "What I Learned Selling Bingo Card Creator",
  url: "https://training.kalzumeus.com/newsletters/archive/selling_software_business",
  publisher: "Kalzumeus Software",
  publishedAt: "2016",
  notes:
    "Email-course archive post on the 2015 sale of Bingo Card Creator through broker FE International; footer gives a Chicago address for Kalzumeus Software.",
});
const vaccinateStates = source({
  binding: "first_person",
  mediaType: "article",
  title: "Solving The Vaccine Data Problem",
  url: "https://www.kalzumeus.com/2021/04/23/vaccinate-the-states/",
  publisher: "kalzumeus.com",
  publishedAt: "2021-04-23",
});
const retractionReply = source({
  binding: "first_person",
  mediaType: "article",
  title: "Bank CEO: Retract your debanking piece? Me: No.",
  url: "https://www.kalzumeus.com/2025/02/10/retraction-request-denied/",
  publisher: "kalzumeus.com",
  publishedAt: "2025-02-10",
  notes:
    "His verbatim reply to Anchorage Digital's CEO, who had requested retraction of a Bits about Money essay after testifying to the Senate Banking Committee.",
});
const bamCards = source({
  binding: "first_person",
  mediaType: "article",
  title: "Improving how credit cards work under the covers",
  url: "https://www.bitsaboutmoney.com/archive/improving-cards-under-the-hood/",
  publisher: "Bits about Money",
  publishedAt: "2023-02-24",
  notes:
    "Contains his explicit statement that he left full-time employment at Stripe while remaining an advisor.",
});
const csEditorial = source({
  binding: "first_person",
  mediaType: "audio",
  title: "On editorial standards and independence",
  url: "https://www.complexsystemspodcast.com/episodes/editorial-standards-and-independence/",
  publisher: "Complex Systems",
  publishedAt: "2025-02-20",
  notes:
    "Solo episode: describes himself as on sabbatical, 'running a multi-publication niche media business' under Kalzumeus Software LLC.",
});
const wipVaccinate = source({
  binding: "first_person",
  mediaType: "article",
  title: "The story of VaccinateCA",
  url: "https://worksinprogress.co/issue/the-story-of-vaccinateca/",
  publisher: "Works in Progress",
  publishedAt: "2022-12-08",
  authors: ["Patrick McKenzie"],
  notes:
    "His long-form oral history of VaccinateCA, published as the lead article of Works in Progress Issue 09.",
});
const eaForum = source({
  binding: "first_person",
  mediaType: "article",
  title: "Some observations from an EA-adjacent (?) charitable effort",
  url: "https://forum.effectivealtruism.org/posts/NkPghabDd54nkG3kX/some-observations-from-an-ea-adjacent-charitable-effort",
  publisher: "EA Forum",
  publishedAt: "2023",
  authors: ["Patrick McKenzie"],
  notes:
    "His retrospective on VaccinateCA for the effective-altruism audience: ~$1.2M raised, estimated impact, and lessons on high-agency teams.",
});
const stripeAtlasLlc = source({
  binding: "first_person",
  mediaType: "article",
  title: "Stripe Atlas for LLCs",
  url: "https://stripe.com/blog/atlas-llc",
  publisher: "Stripe",
  publishedAt: "2018-04-30",
  authors: ["Patrick McKenzie"],
  notes: "Stripe blog announcement he authored in his Atlas role.",
});

// --- Interviews -----------------------------------------------------------

const cwt = source({
  binding: "interview",
  mediaType: "transcript",
  title: "Patrick McKenzie on Navigating Complex Systems (Ep. 201)",
  url: "https://conversationswithtyler.com/episodes/patrick-mckenzie/",
  publisher: "Conversations with Tyler",
  publishedAt: "2024-01-10",
  authors: ["Tyler Cowen"],
  notes:
    "Recorded October 26, 2023; transcript covers his self-description, Japan years, return to the US, and payments opinions.",
});
const indieHackers = source({
  binding: "interview",
  mediaType: "audio",
  title:
    "How to Overcome the Biggest Challenges to Your Online Business with Patrick McKenzie",
  url: "https://www.indiehackers.com/podcast/013-patrick-mckenzie-of-appointment-reminder",
  publisher: "Indie Hackers",
  publishedAt: "2017-05-10",
  authors: ["Courtland Allen"],
  notes:
    "Episode #013 with full transcript; recorded in person at Stripe's office while both worked there.",
});
const sedAtlas = source({
  binding: "interview",
  mediaType: "audio",
  title: "Stripe Atlas with Patrick McKenzie",
  url: "https://softwareengineeringdaily.com/podcasts/stripe-atlas-with-patrick-mckenzie/",
  publisher: "Software Engineering Daily",
  publishedAt: "2018-05-08",
  authors: ["Jeff Meyerson"],
});
const sedTranscript = source({
  binding: "interview",
  mediaType: "transcript",
  title: "SED581 — Stripe Atlas (transcript)",
  url: "https://softwareengineeringdaily.com/wp-content/uploads/2018/05/SED581-Stripe-Atlas.pdf",
  publisher: "Software Engineering Daily",
  publishedAt: "2018-05",
  authors: ["Jeff Meyerson"],
  transcriptOf: sedAtlas.id,
});
const productPeople5 = source({
  binding: "interview",
  mediaType: "audio",
  title: "EP05: How Patio11 built a product business (part 1)",
  url: "https://productpeople.transistor.fm/episodes/ep05-how-patio11-built-a-product-business-part-1",
  publisher: "Product People",
  publishedAt: "2012-12-18",
  authors: ["Justin Jackson"],
});
const productPeople6 = source({
  binding: "interview",
  mediaType: "audio",
  title: "EP06: Patio11 on building products that make money (part 2)",
  url: "https://productpeople.transistor.fm/episodes/ep06-patio11-on-building-products-that-make-money-part-2",
  publisher: "Product People",
  publishedAt: "2012-12-26",
  authors: ["Justin Jackson"],
});

// --- Official records ------------------------------------------------------

const stripeNewsroomAtlas = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Announcing Stripe Atlas—helping entrepreneurs start a global business from anywhere",
  url: "https://stripe.com/newsroom/news/stripe-launches-atlas",
  publisher: "Stripe",
  publishedAt: "2016-02-24",
  notes: "Stripe's official announcement of Atlas, the product he later joined Stripe to work on.",
});

// --- Reporting -------------------------------------------------------------

const tcAtlas = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Stripe Expands Startup Tools With Atlas, For Foreign Companies To Incorporate In Delaware",
  url: "https://techcrunch.com/2016/02/24/stripe-expands-startup-tools-with-atlas-a-way-for-global-companies-to-incorporate-in-delaware/",
  publisher: "TechCrunch",
  publishedAt: "2016-02-24",
  authors: ["Ingrid Lunden"],
});
const tcAtlasLlc = source({
  binding: "reporting",
  mediaType: "article",
  title: "Stripe expands its Atlas startup kit to let founders form LLCs",
  url: "https://techcrunch.com/2018/04/30/stripe-expands-its-atlas-startup-kit-let-founders-form-llcs/",
  publisher: "TechCrunch",
  publishedAt: "2018-04-30",
  authors: ["Ingrid Lunden"],
  notes: "Quotes McKenzie in his capacity working on Atlas at Stripe.",
});
const npr = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "With Few Details From Health Officials, Volunteers Create COVID-19 Vaccine Database",
  url: "https://www.npr.org/2021/01/26/960855949/with-few-details-from-health-officials-volunteers-create-covid-19-vaccine-databa",
  publisher: "NPR",
  publishedAt: "2021-01-26",
  authors: ["Lesley McClurg"],
  notes: "All Things Considered segment reported by KQED's Lesley McClurg; quotes McKenzie.",
});
const nbc = source({
  binding: "reporting",
  mediaType: "article",
  title: "California technologists create website to track vaccinations",
  url: "https://www.nbcnews.com/tech/tech-news/california-technologists-create-website-track-vaccinations-n1255381",
  publisher: "NBC News",
  publishedAt: "2021-01",
});
const sfc = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "This crowdsourced website tracks where you can get vaccinated in California",
  url: "https://www.sfchronicle.com/bayarea/article/This-crowdsourced-website-tracks-where-you-can-15882787.php",
  publisher: "San Francisco Chronicle",
  publishedAt: "2021-01",
});
const sfgate = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "These techies created a site for people to find vaccine availability. And people are flocking.",
  url: "https://www.sfgate.com/bayarea/article/The-inside-scoop-on-the-crowdsourced-website-15885607.php",
  publisher: "SFGate",
  publishedAt: "2021-01",
});
const hnQuit = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Congratulations Patrick — Hacker News",
  url: "https://news.ycombinator.com/item?id=1230156",
  publisher: "Hacker News",
  publishedAt: "2010-03-30",
  notes:
    "Community thread marking his last day as a Japanese salaryman before going full-time on his software business.",
});
const hnBccSale = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "BingoCardCreator.com Sale Page — Hacker News",
  url: "https://news.ycombinator.com/item?id=9602092",
  publisher: "Hacker News",
  publishedAt: "2015-05-25",
  notes:
    "Thread on the FE International sale listing for Bingo Card Creator; McKenzie comments on due diligence and the just-completed handover.",
});

// --- Archive ---------------------------------------------------------------

const namesJa = source({
  binding: "archive",
  mediaType: "webpage",
  title: "プログラマの抱いている名前についての誤謬",
  url: "http://www.emptypage.jp/translations/kalzumeus/falsehoods-programmers-believe-about-names.html",
  publisher: "Empty Page",
  language: "ja",
  notes:
    "Rehosted Japanese translation of 'Falsehoods Programmers Believe About Names,' linked from the original essay; readers translated it into additional languages.",
});

// --- Reference --------------------------------------------------------------

const yespress = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Patrick McKenzie (patio11) — Fintech Writer, Software Entrepreneur & Stripe Advisor",
  url: "https://yespress.io/patrick-mckenzie",
  publisher: "YesPress",
  notes:
    "Third-party profile; used for corroboration of reach claims (e.g., cumulative reader-reported raises), not as primary authority.",
});

const S = {
  kalzumeusHome: kalzumeusHome.id,
  kalzumeusStartHere: kalzumeusStartHere.id,
  kalzumeusAbout: kalzumeusAbout.id,
  kalzumeusCharity: kalzumeusCharity.id,
  kalzumeusInvitation: kalzumeusInvitation.id,
  bamHome: bamHome.id,
  bamArchive: bamArchive.id,
  csHome: csHome.id,
  csAbout: csAbout.id,
  hnProfile: hnProfile.id,
  githubProfile: githubProfile.id,
  linkedin: linkedin.id,
  essayNames: essayNames.id,
  essayProgrammer: essayProgrammer.id,
  essaySalary: essaySalary.id,
  microconfPost: microconfPost.id,
  yir2010: yir2010.id,
  yir2014: yir2014.id,
  yir2016: yir2016.id,
  starfighterPost: starfighterPost.id,
  sellingBcc: sellingBcc.id,
  vaccinateStates: vaccinateStates.id,
  retractionReply: retractionReply.id,
  bamCards: bamCards.id,
  csEditorial: csEditorial.id,
  wipVaccinate: wipVaccinate.id,
  eaForum: eaForum.id,
  stripeAtlasLlc: stripeAtlasLlc.id,
  cwt: cwt.id,
  indieHackers: indieHackers.id,
  sedAtlas: sedAtlas.id,
  sedTranscript: sedTranscript.id,
  productPeople5: productPeople5.id,
  productPeople6: productPeople6.id,
  stripeNewsroomAtlas: stripeNewsroomAtlas.id,
  tcAtlas: tcAtlas.id,
  tcAtlasLlc: tcAtlasLlc.id,
  npr: npr.id,
  nbc: nbc.id,
  sfc: sfc.id,
  sfgate: sfgate.id,
  hnQuit: hnQuit.id,
  hnBccSale: hnBccSale.id,
  namesJa: namesJa.id,
  yespress: yespress.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-patrick-mckenzie",
  generatedAt: "2026-09-17T01:00:00Z",
  subject: {
    kind: "person",
    handle: "patrick-mckenzie",
    displayName: "Patrick McKenzie",
    alsoKnownAs: ["patio11"],
    summary:
      "American software entrepreneur and essayist known online as patio11. Founded Kalzumeus Software (Bingo Card Creator, Appointment Reminder), co-founded Starfighter, spent six years at Stripe working on Atlas, organized VaccinateCA in 2021, and now writes Bits about Money and hosts the Complex Systems podcast.",
    identity: {
      officialSite: "https://www.kalzumeus.com/",
      profiles: [
        "https://news.ycombinator.com/user?id=patio11",
        "https://github.com/patio11",
        "https://x.com/patio11",
        "https://www.linkedin.com/in/patrickmckenzie",
      ],
    },
  },
  scope: {
    asOf: "2026-09-17T01:00:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media", "beliefs"],
  },
  sources: [
    kalzumeusHome,
    kalzumeusStartHere,
    kalzumeusAbout,
    kalzumeusCharity,
    kalzumeusInvitation,
    bamHome,
    bamArchive,
    csHome,
    csAbout,
    hnProfile,
    githubProfile,
    linkedin,
    essayNames,
    essayProgrammer,
    essaySalary,
    microconfPost,
    yir2010,
    yir2014,
    yir2016,
    starfighterPost,
    sellingBcc,
    vaccinateStates,
    retractionReply,
    bamCards,
    csEditorial,
    wipVaccinate,
    eaForum,
    stripeAtlasLlc,
    cwt,
    indieHackers,
    sedAtlas,
    sedTranscript,
    productPeople5,
    productPeople6,
    stripeNewsroomAtlas,
    tcAtlas,
    tcAtlasLlc,
    npr,
    nbc,
    sfc,
    sfgate,
    hnQuit,
    hnBccSale,
    namesJa,
    yespress,
  ],
  claims: [
    {
      id: "claim-patio11-handle",
      kind: "fact",
      text: "Patrick McKenzie is widely known online as patio11, a handle he says combines a Puerto Rican friend's nickname for him ('Patio') with his favorite number, chosen on CompuServe circa 1996.",
      sourceIds: [S.kalzumeusStartHere, S.kalzumeusAbout, S.hnProfile],
    },
    {
      id: "claim-kalzumeus-name",
      kind: "fact",
      text: "Kalzumeus Software is named after a dragon in a long-forgotten high-school RPG campaign; he kept the name because the .com was available.",
      sourceIds: [S.kalzumeusAbout],
    },
    {
      id: "claim-wustl",
      kind: "fact",
      text: "He attended Washington University in St. Louis (2000–2004 per his LinkedIn), graduating with a degree in computer science and a second degree in East Asian Studies — 'basically a way to say Japanese minus Japanese literature.'",
      sourceIds: [S.linkedin, S.productPeople5, S.cwt],
    },
    {
      id: "claim-japan-move",
      kind: "fact",
      text: "He moved to Japan right after college in 2004 through an international exchange program (the JET Programme's Coordinator for International Relations track), placed as a technical translator at Softopia Japan, Gifu Prefecture's technology incubator, until his contract elapsed in 2007.",
      sourceIds: [S.linkedin, S.microconfPost, S.productPeople5],
    },
    {
      id: "claim-japan-reason",
      kind: "fact",
      text: "He has repeatedly said he moved to Japan expecting to firm up business Japanese for a few years and then return to a Japan-facing Microsoft job — a plan born of a misreading of a Wall Street Journal claim that the dot-com bust would end US engineering employment.",
      sourceIds: [S.cwt, S.microconfPost],
    },
    {
      id: "claim-salaryman",
      kind: "fact",
      text: "When his translator contract ended in 2007 he switched to being an engineer — a salaryman — at a Japanese megacorp he does not name publicly; March 30, 2010 was his last day before running his business full-time.",
      sourceIds: [S.microconfPost, S.hnQuit, S.productPeople5],
    },
    {
      id: "claim-bcc-origin",
      kind: "fact",
      text: "Bingo Card Creator began as a free Java Swing app he built in a day for a Gifu English-teachers' mailing list; in mid-2006 he productized it on a $60 budget and one week of work, aiming for $200 a month in sales — a goal it passed in its second month.",
      sourceIds: [S.microconfPost, S.productPeople5, S.indieHackers],
    },
    {
      id: "claim-bcc-early-numbers",
      kind: "fact",
      text: "He reports the first Bingo Card Creator sale came about three weeks after launch at $24.95, about $2,000 in the first year, eventually eclipsing his day-job salary roughly four to five years later; the app moved from Java Swing to a Rails SaaS in 2009.",
      sourceIds: [S.indieHackers, S.sellingBcc],
    },
    {
      id: "claim-quit-day-job",
      kind: "fact",
      text: "On March 30, 2010 he left salaried work in Japan to run Kalzumeus Software full-time — an event Hacker News marked with a congratulatory thread that drew hundreds of points.",
      sourceIds: [S.hnQuit, S.indieHackers],
    },
    {
      id: "claim-appointment-reminder-launch",
      kind: "fact",
      text: "He launched Appointment Reminder in early December 2010 — Twilio-powered phone, text, and email reminders for professional-services businesses — and declined an acquisition offer for it that same month.",
      sourceIds: [S.yir2010, S.kalzumeusStartHere],
    },
    {
      id: "claim-bcc-sale",
      kind: "fact",
      text: "He sold Bingo Card Creator in 2015 through broker FE International in about five months start to finish, with handover in mid-May; the public sale listing discussed on Hacker News priced the business at roughly $57,000.",
      sourceIds: [S.sellingBcc, S.hnBccSale],
    },
    {
      id: "claim-starfighter",
      kind: "fact",
      text: "On March 9, 2015 he announced Starfighter with co-founders Thomas Ptacek and Erin Ptacek — a company publishing capture-the-flag games meant to replace the technical interview with direct work-sample assessment; the founders had previously run the MicroCorruption CTF.",
      sourceIds: [S.starfighterPost, S.yir2016],
    },
    {
      id: "claim-starfighter-end",
      kind: "fact",
      text: "Starfighter shuttered in August 2016 after operating for about a year and a half; he describes it as a business that 'ended up failing.'",
      sourceIds: [S.yir2016, S.indieHackers],
    },
    {
      id: "claim-stripe-join",
      kind: "fact",
      text: "He joined Stripe in September 2016 to work on Atlas — the product Stripe had launched in February 2016 for incorporating global startups — and, as agreed with Stripe, sold Appointment Reminder around the same time through broker FE International.",
      sourceIds: [S.yir2016, S.stripeNewsroomAtlas, S.tcAtlas],
    },
    {
      id: "claim-atlas-work",
      kind: "fact",
      text: "At Stripe he shipped the Atlas guide to 'Starting a Real Business' in late 2016 and authored the April 30, 2018 announcement adding LLC formation to Stripe Atlas.",
      sourceIds: [S.yir2016, S.stripeAtlasLlc, S.tcAtlasLlc],
    },
    {
      id: "claim-stripe-advisor",
      kind: "fact",
      text: "After six years of full-time work at Stripe he transitioned to an advisory role — his LinkedIn dates the change to December 2022 — and he continues to describe himself as a Stripe advisor while 'currently on semi-sabbatical.'",
      sourceIds: [S.kalzumeusStartHere, S.bamCards, S.linkedin, S.kalzumeusAbout],
    },
    {
      id: "claim-vaccinateca-founding",
      kind: "fact",
      text: "VaccinateCA began when his January 14, 2021 tweet proposed that technologists call providers to map vaccine availability; Karl Yang set up a Discord that night, roughly 70 volunteers pitched in the first night, and the site launched the next morning.",
      sourceIds: [S.wipVaccinate, S.npr, S.sfc, S.sfgate],
    },
    {
      id: "claim-vaccinateca-ceo",
      kind: "fact",
      text: "He served as CEO of Call The Shots, Inc., the 501(c)(3) doing business as VaccinateCA — about ten organizers, ten employees, and roughly 500 volunteers whose primary method was human-powered phone calls to healthcare providers, principally pharmacies.",
      sourceIds: [S.kalzumeusCharity, S.wipVaccinate],
    },
    {
      id: "claim-vaccinate-states",
      kind: "fact",
      text: "On April 23, 2021 the project expanded nationally as Vaccinate The States; he describes the operation as the country's largest public dataset on COVID-19 vaccine availability, built by calling providers, collating public sources, and brokering data, working with the federal government, states, counties, and publishers such as Google Maps.",
      sourceIds: [S.vaccinateStates, S.wipVaccinate],
    },
    {
      id: "claim-vaccinateca-winddown",
      kind: "fact",
      text: "VaccinateCA wound down in August 2021 once vaccines were ubiquitously available, and Call The Shots, Inc. formally dissolved on February 3, 2022.",
      sourceIds: [S.kalzumeusCharity],
    },
    {
      id: "claim-vaccinateca-funding",
      kind: "fact",
      text: "He reports VaccinateCA raised about $1.2 million, mostly called in from his own tech-industry network, and that at one point he personally injected about $100,000 as emergency funding.",
      sourceIds: [S.eaForum],
    },
    {
      id: "claim-bam",
      kind: "fact",
      text: "He writes Bits about Money, a roughly biweekly newsletter on the intersection of tech and financial infrastructure published by Kalzumeus Software, LLC, whose archive begins in October 2021.",
      sourceIds: [S.bamHome, S.bamArchive, S.csEditorial],
    },
    {
      id: "claim-complex-systems",
      kind: "fact",
      text: "He hosts Complex Systems, a podcast launched in 2024 that publishes weekly on Thursdays with carefully edited full transcripts, interviewing people who built the systems and institutions he covers.",
      sourceIds: [S.csHome, S.csAbout],
    },
    {
      id: "claim-media-business",
      kind: "fact",
      text: "He describes himself, while on sabbatical, as having 'wandered into running a multi-publication niche media business' under Kalzumeus Software LLC — Bits about Money plus Complex Systems.",
      sourceIds: [S.csEditorial],
    },
    {
      id: "claim-retraction-refusal",
      kind: "fact",
      text: "In February 2025, a day after testifying to the Senate Banking Committee, Anchorage Digital's CEO asked him to retract the Bits about Money essay 'Debanking (and Debunking?)'; McKenzie declined and published his reply on kalzumeus.com.",
      sourceIds: [S.csEditorial, S.retractionReply],
    },
    {
      id: "claim-hn-standing",
      kind: "fact",
      text: "He has been a Hacker News member since November 2008 and is among its most-recognized commenters, with over 127,000 karma on the patio11 account, where his profile lists 'Stripe, Starfighter, Appointment Reminder, Bingo Card Creator' as previous work.",
      sourceIds: [S.hnProfile],
    },
    {
      id: "claim-names-translated",
      kind: "fact",
      text: "The names essay was translated by readers into Japanese and Chinese — he invited translations and linked them from the original post.",
      sourceIds: [S.essayNames, S.namesJa],
    },
    {
      id: "claim-writing-volume",
      kind: "fact",
      text: "His homepage states he has written '4.7 million words and counting' since 2006, and his public bio reads 'I work for the Internet.'",
      sourceIds: [S.kalzumeusHome, S.githubProfile],
    },
    {
      id: "claim-japan-to-us",
      kind: "fact",
      text: "He lived in Japan about twenty years — Ogaki, Gifu, which he calls his adopted hometown, and later Tokyo — then returned to the United States; in the October 2023 Conversations with Tyler recording he discusses reverse culture shock and notes his parents live in Chicago, where his family is from.",
      sourceIds: [S.cwt, S.microconfPost, S.githubProfile],
    },
    {
      id: "claim-salary-essay-impact",
      kind: "fact",
      text: "His 2012 salary-negotiation essay is, per Conversations with Tyler, still read hundreds of thousands of times each year and has documented reader-reported raises in the millions of dollars — a running tally third-party profiles put above $15 million.",
      sourceIds: [S.cwt, S.yespress, S.essaySalary],
    },
    {
      id: "claim-standing-invitation",
      kind: "fact",
      text: "He maintains a public 'standing invitation' for strangers to email him about software and startups, and reports replying to roughly 60% of unsolicited email from Hacker News readers.",
      sourceIds: [S.kalzumeusInvitation, S.hnProfile],
    },
    {
      id: "claim-negotiation-belief",
      kind: "stated_belief",
      text: "He holds that engineers systematically fail at salary negotiation because they treat it as vaguely disreputable rather than a professional skill — 'five very important minutes' that compound into six figures over a career — and that employers, negotiating constantly, are nearly indifferent to the amounts at stake for an individual.",
      sourceIds: [S.essaySalary],
    },
    {
      id: "claim-programmer-belief",
      kind: "stated_belief",
      text: "He argues engineers are hired to create business value, not to program; that they should describe themselves by revenue increased or costs reduced, attach themselves to profit centers, and never let a job title reduce them to 'programmer.'",
      sourceIds: [S.essayProgrammer],
    },
    {
      id: "claim-names-belief",
      kind: "stated_belief",
      text: "He contends that virtually every software system encodes false assumptions about human names — that he has 'never seen a computer system which handles names properly' — and that accepting whatever a person says their name is is the only correct design.",
      sourceIds: [S.essayNames],
    },
    {
      id: "claim-systems-storyteller",
      kind: "stated_belief",
      text: "His self-description, quoted by Tyler Cowen: 'The broad through line of my work is systems thinking applied to businesses. I think the social organization of the internet and its impact on the world are underestimated by almost everyone, including Silicon Valley… I am a storyteller for some of those layers and the people who build them.'",
      sourceIds: [S.cwt],
    },
    {
      id: "claim-transparency-belief",
      kind: "stated_belief",
      text: "He says he published revenue numbers, plans, and retrospectives partly to leave 'breadcrumbs for the next person' and partly because forced written planning made him better at executing; readers regularly credit his public writing for starting their own businesses.",
      sourceIds: [S.indieHackers, S.yir2014],
    },
    {
      id: "claim-recurring-revenue-belief",
      kind: "stated_belief",
      text: "After selling Bingo Card Creator as one-off $29.95 purchases with brutal month-start revenue resets, he resolved his next product would charge recurring subscriptions — a deliberate design choice behind Appointment Reminder.",
      sourceIds: [S.indieHackers, S.yir2010],
    },
    {
      id: "claim-complicated-not-unknowable",
      kind: "stated_belief",
      text: "His stated thesis for Complex Systems: civilization depends on institutions, infrastructure, and technical substrates that are 'complicated but not unknowable,' and the warts-and-all stories of the people who built them are worth telling.",
      sourceIds: [S.csAbout, S.csHome],
    },
    {
      id: "claim-high-agency-belief",
      kind: "stated_belief",
      text: "Reflecting on VaccinateCA, he argues that small, high-agency teams with software, operations, and communications skills can outperform established institutions in a crisis, and that 501(c)(3) status and early positive press were underrated levers for credibility.",
      sourceIds: [S.eaForum, S.wipVaccinate],
    },
    {
      id: "claim-crypto-skepticism",
      kind: "stated_belief",
      text: "He lists 'cryptocurrency skepticism' among his self-described weird hobbies and has repeatedly expressed skepticism about crypto assets while writing respectfully about the financial plumbing around them.",
      sourceIds: [S.kalzumeusHome, S.cwt],
    },
    {
      id: "claim-open-books-pattern",
      kind: "pattern",
      text: "Across 2006–2016 he published detailed year-in-review posts with sales, profit, and strategy for Bingo Card Creator and Appointment Reminder — a transparency practice unusual at the time that made his blog a reference for early SaaS founders.",
      sourceIds: [S.yir2010, S.yir2014, S.yir2016, S.indieHackers],
    },
    {
      id: "claim-niche-saas-pattern",
      kind: "pattern",
      text: "His repeatable playbook was niche software monetized through SEO content marketing and AdWords optimization — Dolch sight-words bingo pages, seasonal Halloween demand, early Conversion Optimizer adoption — documented publicly as he went.",
      sourceIds: [S.microconfPost, S.yir2010, S.productPeople6],
    },
    {
      id: "claim-operator-explainer-pattern",
      kind: "pattern",
      text: "A recurring arc: he operates a system, then writes its canonical public explainer — small SaaS (year-in-review posts), company formation (Stripe Atlas guides), vaccine logistics (the VaccinateCA oral history), and banking (Bits about Money).",
      sourceIds: [S.yir2016, S.stripeAtlasLlc, S.wipVaccinate, S.bamHome],
    },
    {
      id: "claim-writing-leverage-pattern",
      kind: "pattern",
      text: "Each career turn was pulled by public writing rather than credentials: the blog drew consulting clients, the MicroConf/Hacker News network drew Starfighter's founding, and the essays and track record preceded his hiring at Stripe.",
      sourceIds: [S.indieHackers, S.hnQuit, S.yir2016, S.cwt],
    },
    {
      id: "claim-long-form-pattern",
      kind: "pattern",
      text: "His output is consistently long-form and infrastructure-focused — multi-thousand-word essays, oral histories, and full podcast transcripts — treating institutions and plumbing, not personalities, as the unit of interest.",
      sourceIds: [S.essaySalary, S.wipVaccinate, S.csAbout, S.bamHome],
    },
    {
      id: "claim-megacorp-speculation",
      kind: "speculation",
      text: "He has never publicly named the Japanese megacorp where he was a salaryman, and deflected naming the prefectural incubator ('I'm not comfortable telling you which one') — plausibly deliberate discretion about former employers rather than an omission.",
      sourceIds: [S.microconfPost, S.productPeople5],
    },
    {
      id: "claim-sale-terms-speculation",
      kind: "speculation",
      text: "Final sale terms for both products remain undisclosed: the FE International listing publicly priced Bingo Card Creator near $57,000, but closing prices and terms for it and Appointment Reminder were never published in the cited record.",
      sourceIds: [S.hnBccSale, S.sellingBcc, S.yir2016],
    },
    {
      id: "claim-vaccinateca-impact-speculation",
      kind: "speculation",
      text: "The estimate that VaccinateCA 'likely saved thousands of lives' for about $1.2 million is his own cost-effectiveness judgment, not an independent evaluation.",
      sourceIds: [S.eaForum, S.wipVaccinate],
    },
    {
      id: "claim-next-act-speculation",
      kind: "speculation",
      text: "His 'semi-sabbatical' media business under Kalzumeus Software LLC looks like a next act rather than a bridge to another employer — the record supports the direction but not the destination.",
      sourceIds: [S.csEditorial, S.kalzumeusAbout, S.kalzumeusStartHere],
    },
  ],
  timeline: [
    {
      id: "event-wustl",
      kind: "education",
      date: "2000",
      end: "2004",
      title: "Washington University in St. Louis",
      summary:
        "Graduated with a computer science degree and a second degree in East Asian Studies.",
      organization: "Washington University in St. Louis",
      sourceIds: [S.linkedin, S.productPeople5, S.cwt],
    },
    {
      id: "event-japan-move",
      kind: "role",
      date: "2004-07",
      end: "2007-07",
      title: "Moves to Japan as a technical translator in Gifu",
      summary:
        "Placed at Softopia Japan, the Gifu prefectural technology incubator, as a Coordinator for International Relations through an international exchange program.",
      organization: "Softopia Japan",
      location: "Gifu, Japan",
      sourceIds: [S.linkedin, S.microconfPost, S.productPeople5],
    },
    {
      id: "event-bcc-launch",
      kind: "founded",
      date: "2006",
      title: "Founds Kalzumeus Software; launches Bingo Card Creator",
      summary:
        "Productized a free Java Swing app for teachers on a $60 budget; it passed his $200-a-month goal in its second month.",
      organization: "Kalzumeus Software",
      location: "Ogaki, Japan",
      sourceIds: [S.microconfPost, S.indieHackers, S.kalzumeusStartHere],
    },
    {
      id: "event-salaryman",
      kind: "role",
      date: "2007",
      end: "2010-03-30",
      title: "Salaryman engineer at a Japanese megacorp",
      summary:
        "After his translator contract elapsed he became an engineer at a large Japanese company he does not name publicly, running the software business on the side.",
      location: "Ogaki, Japan",
      sourceIds: [S.microconfPost, S.hnQuit],
    },
    {
      id: "event-quit-day-job",
      kind: "milestone",
      date: "2010-03-30",
      title: "Leaves salaried work to run Kalzumeus full-time",
      summary:
        "His last day as a Japanese salaryman; Hacker News marked it with a congratulatory thread.",
      location: "Ogaki, Japan",
      sourceIds: [S.hnQuit, S.indieHackers],
    },
    {
      id: "event-falsehoods-names",
      kind: "publication",
      date: "2010-06-17",
      title: "Publishes 'Falsehoods Programmers Believe About Names'",
      summary:
        "The essay credited with starting the 'falsehoods programmers believe' genre of software-writing.",
      sourceIds: [S.essayNames, S.yespress],
    },
    {
      id: "event-appointment-reminder",
      kind: "project",
      date: "2010-12",
      title: "Launches Appointment Reminder",
      summary:
        "Twilio-powered appointment reminder calls, texts, and emails for professional-services businesses; deliberately built on recurring revenue.",
      organization: "Kalzumeus Software",
      sourceIds: [S.yir2010, S.kalzumeusStartHere],
    },
    {
      id: "event-microconf-2011",
      kind: "media",
      date: "2011-06",
      title: "Speaks at MicroConf: 'Software Businesses In 5 Hours A Week'",
      summary:
        "The talk — later posted with slides and video — telling the Gifu and Bingo Card Creator origin story.",
      organization: "MicroConf",
      sourceIds: [S.microconfPost],
    },
    {
      id: "event-dont-call-yourself",
      kind: "publication",
      date: "2011-10-28",
      title: "Publishes 'Don't Call Yourself A Programmer, And Other Career Advice'",
      sourceIds: [S.essayProgrammer],
    },
    {
      id: "event-salary-negotiation",
      kind: "publication",
      date: "2012-01-23",
      title: "Publishes 'Salary Negotiation: Make More Money, Be More Valued'",
      summary:
        "His best-known essay; still read hundreds of thousands of times per year a decade later.",
      sourceIds: [S.essaySalary, S.cwt],
    },
    {
      id: "event-starfighter-announce",
      kind: "founded",
      date: "2015-03-09",
      title: "Announces Starfighter with Thomas and Erin Ptacek",
      summary:
        "A company publishing CTF games as work-sample assessments to replace the technical interview.",
      organization: "Starfighter",
      sourceIds: [S.starfighterPost],
    },
    {
      id: "event-bcc-sale",
      kind: "milestone",
      date: "2015-05",
      title: "Sells Bingo Card Creator",
      summary:
        "Brokered by FE International; roughly five months start to finish, handover mid-May 2015.",
      sourceIds: [S.sellingBcc, S.hnBccSale],
    },
    {
      id: "event-starfighter-ends",
      kind: "milestone",
      date: "2016-08",
      title: "Starfighter shutters",
      summary: "The recruiting-CTF startup wound down after about a year and a half.",
      organization: "Starfighter",
      sourceIds: [S.yir2016],
    },
    {
      id: "event-joins-stripe",
      kind: "role",
      date: "2016-09",
      end: "2022-12",
      title: "Joins Stripe, working on Atlas",
      summary:
        "Joined seven months after Atlas's February 2016 launch; sold Appointment Reminder as agreed when taking the job.",
      organization: "Stripe",
      sourceIds: [S.yir2016, S.stripeNewsroomAtlas, S.linkedin],
    },
    {
      id: "event-ar-sale",
      kind: "milestone",
      date: "2016",
      title: "Sells Appointment Reminder",
      summary:
        "Completed quickly via FE International — 'practically before the virtual ink was dry on my Stripe paperwork.'",
      sourceIds: [S.yir2016],
    },
    {
      id: "event-vaccinateca",
      kind: "founded",
      date: "2021-01-14",
      title: "VaccinateCA spins up from a patio11 tweet",
      summary:
        "His January 14 tweet proposed calling providers to map vaccine availability; Karl Yang organized a Discord, the site launched the next morning, and McKenzie became CEO of Call The Shots, Inc.",
      organization: "VaccinateCA (Call The Shots, Inc.)",
      sourceIds: [S.wipVaccinate, S.npr, S.kalzumeusCharity],
    },
    {
      id: "event-vaccinate-states",
      kind: "milestone",
      date: "2021-04-23",
      title: "Expands nationally as Vaccinate The States",
      summary:
        "Scaled the call-center-plus-data-broker model to the whole US vaccination effort.",
      sourceIds: [S.vaccinateStates],
    },
    {
      id: "event-vaccinateca-winddown",
      kind: "milestone",
      date: "2021-08",
      end: "2022-02-03",
      title: "VaccinateCA winds down; Call The Shots dissolves",
      summary:
        "Operations wound down in August 2021; the 501(c)(3) formally dissolved February 3, 2022.",
      sourceIds: [S.kalzumeusCharity],
    },
    {
      id: "event-bam-launch",
      kind: "project",
      date: "2021-10",
      title: "Starts Bits about Money",
      summary:
        "The roughly biweekly newsletter on financial infrastructure begins with October 2021 issues.",
      organization: "Kalzumeus Software, LLC",
      sourceIds: [S.bamArchive, S.bamHome],
    },
    {
      id: "event-stripe-advisor",
      kind: "role",
      date: "2022-12",
      title: "Transitions from full-time Stripe employee to advisor",
      summary:
        "After six years full-time; he continues to describe himself as a Stripe advisor.",
      organization: "Stripe",
      sourceIds: [S.kalzumeusStartHere, S.bamCards, S.linkedin],
    },
    {
      id: "event-returns-us",
      kind: "milestone",
      date: "2023",
      title: "Returns to the United States after ~20 years in Japan",
      summary:
        "By the October 2023 Conversations with Tyler recording he is back in the US, describing reverse culture shock; his family roots are in Chicago.",
      sourceIds: [S.cwt],
    },
    {
      id: "event-complex-systems-launch",
      kind: "media",
      date: "2024",
      title: "Launches the Complex Systems podcast",
      summary:
        "Weekly Thursday episodes with full transcripts, interviewing builders of institutions and infrastructure; produced under Kalzumeus Software LLC.",
      organization: "Complex Systems",
      sourceIds: [S.csHome, S.csAbout, S.csEditorial],
    },
  ],
  themes: [
    {
      id: "theme-systems-storyteller",
      kind: "philosophy",
      status: "stated",
      title: "Systems thinking applied to businesses",
      summary:
        "His own framing: 'I am a storyteller for some of those layers and the people who build them' — infrastructure layers beneath everything important, with the internet's social organization broadly underestimated.",
      sourceIds: [S.cwt, S.csAbout],
    },
    {
      id: "theme-career-realpolitik",
      kind: "method",
      status: "stated",
      title: "Career realpolitik for engineers",
      summary:
        "Engineers create business value, not code; negotiate as professionals; attach to profit centers; never call yourself a programmer. A decade of his career essays turns on the same axis.",
      sourceIds: [S.essayProgrammer, S.essaySalary],
    },
    {
      id: "theme-open-books",
      kind: "practice",
      status: "stated",
      title: "Radical transparency about business mechanics",
      summary:
        "He published revenue, profit, traffic, and strategy year after year — partly as self-discipline, partly as breadcrumbs for the next founder — before open metrics were fashionable.",
      sourceIds: [S.yir2010, S.yir2014, S.yir2016, S.indieHackers],
    },
    {
      id: "theme-niche-software",
      kind: "method",
      status: "stated",
      title: "Small niche software, marketed not engineered",
      summary:
        "Pick an underserved niche, win it with SEO and content marketing, charge recurring fees, and let distribution — not technical novelty — do the work.",
      sourceIds: [S.microconfPost, S.yir2010, S.indieHackers, S.productPeople6],
    },
    {
      id: "theme-financial-infrastructure",
      kind: "interest",
      status: "stated",
      title: "Financial infrastructure as the understudied substrate",
      summary:
        "Bits about Money treats checks, cards, ACH, debanking, and compliance as systems worth explaining to a general audience — 'a professional journal at the intersection of finance and technology.'",
      sourceIds: [S.bamHome, S.bamArchive, S.csEditorial],
    },
    {
      id: "theme-high-agency",
      kind: "belief",
      status: "stated",
      title: "High-agency small teams beat established institutions in a crisis",
      summary:
        "VaccinateCA's stated lessons: speed, software, operations, and communications beat credentialed expertise; nonprofit status and early press were the underrated levers.",
      sourceIds: [S.eaForum, S.wipVaccinate, S.npr],
    },
    {
      id: "theme-japan",
      kind: "influence",
      status: "stated",
      title: "Japan as formative second home",
      summary:
        "Twenty years in Ogaki and Tokyo shaped his methods and material — translation work, salaryman life, and building a US-facing business from rural Japan recur throughout his writing.",
      sourceIds: [S.microconfPost, S.cwt, S.productPeople5],
    },
    {
      id: "theme-complicated-not-unknowable",
      kind: "philosophy",
      status: "stated",
      title: "Complicated but not unknowable",
      summary:
        "The Complex Systems thesis: institutions and infrastructure look impenetrable but yield to investigation; his remedy is interviews with the people who built them plus full transcripts.",
      sourceIds: [S.csAbout, S.csHome],
    },
    {
      id: "theme-editorial-independence",
      kind: "practice",
      status: "stated",
      title: "Editorial independence with disclosed conflicts",
      summary:
        "Marked ad reads, florid disclaimers of advisory and investment ties, heavy citation, willingness to correct — and a refusal to retract under pressure from a bank CEO.",
      sourceIds: [S.csEditorial, S.retractionReply],
    },
    {
      id: "theme-hiring-reform",
      kind: "belief",
      status: "stated",
      title: "Work samples over resumes",
      summary:
        "Starfighter's founding premise — that hiring should measure demonstrated ability directly, because credential and keyword filters structurally exclude capable engineers — extends his career-advice writing into a company.",
      sourceIds: [S.starfighterPost, S.yir2016],
    },
  ],
  works: [
    {
      id: "work-kalzumeus-software",
      kind: "project",
      status: "ongoing",
      title: "Kalzumeus Software",
      date: "2006",
      summary:
        "The umbrella company for his software products, writing, and later media publications — now Kalzumeus Software, LLC, publisher of Bits about Money and Complex Systems.",
      sourceIds: [S.kalzumeusHome, S.kalzumeusAbout, S.csEditorial],
    },
    {
      id: "work-bingo-card-creator",
      kind: "product",
      status: "completed",
      title: "Bingo Card Creator",
      date: "2006",
      location: "Ogaki, Japan",
      summary:
        "Bingo-card generator for elementary schoolteachers; Java Swing app turned Rails SaaS; sold through FE International in May 2015.",
      sourceIds: [S.microconfPost, S.sellingBcc, S.hnBccSale],
    },
    {
      id: "work-appointment-reminder",
      kind: "product",
      status: "completed",
      title: "Appointment Reminder",
      date: "2010-12",
      summary:
        "Recurring-revenue SaaS sending phone, text, and email appointment reminders to professional-services clients; sold in 2016 when he joined Stripe.",
      sourceIds: [S.yir2010, S.yir2016, S.kalzumeusStartHere],
    },
    {
      id: "work-starfighter",
      kind: "project",
      status: "completed",
      title: "Starfighter",
      date: "2015-03-09",
      summary:
        "CTF-game recruiting startup co-founded with Thomas Ptacek and Erin Ptacek; shuttered August 2016.",
      sourceIds: [S.starfighterPost, S.yir2016],
    },
    {
      id: "work-kalzumeus-blog",
      kind: "other",
      status: "ongoing",
      title: "kalzumeus.com",
      date: "2006",
      summary:
        "His personal site — 4.7 million words and counting — whose essays on software businesses, careers, and Japan made patio11 a fixture of early SaaS culture.",
      sourceIds: [S.kalzumeusHome, S.indieHackers],
    },
    {
      id: "work-falsehoods-names",
      kind: "other",
      status: "published",
      title: "Falsehoods Programmers Believe About Names (essay)",
      date: "2010-06-17",
      summary:
        "Catalog of wrong assumptions software makes about names; credited with spawning a genre of similar lists.",
      sourceIds: [S.essayNames, S.yespress],
    },
    {
      id: "work-dont-call-yourself-programmer",
      kind: "other",
      status: "published",
      title: "Don't Call Yourself A Programmer, And Other Career Advice (essay)",
      date: "2011-10-28",
      sourceIds: [S.essayProgrammer],
    },
    {
      id: "work-salary-negotiation",
      kind: "other",
      status: "published",
      title: "Salary Negotiation: Make More Money, Be More Valued (essay)",
      date: "2012-01-23",
      summary:
        "His best-known essay; Conversations with Tyler reports it is still read hundreds of thousands of times a year with millions of dollars in documented reader raises.",
      sourceIds: [S.essaySalary, S.cwt],
    },
    {
      id: "work-vaccinateca",
      kind: "project",
      status: "completed",
      title: "VaccinateCA / Vaccinate The States",
      date: "2021-01-14",
      location: "United States",
      summary:
        "Volunteer-built shadow data infrastructure for COVID-19 vaccine availability, run through the 501(c)(3) Call The Shots, Inc.; wound down August 2021 and dissolved February 2022.",
      sourceIds: [S.kalzumeusCharity, S.wipVaccinate, S.vaccinateStates],
    },
    {
      id: "work-bits-about-money",
      kind: "other",
      status: "ongoing",
      title: "Bits about Money",
      date: "2021-10",
      summary:
        "His roughly biweekly newsletter — 'a professional journal at the intersection of finance and technology' — published by Kalzumeus Software, LLC.",
      sourceIds: [S.bamHome, S.bamArchive, S.csEditorial],
    },
    {
      id: "work-complex-systems",
      kind: "recording",
      status: "ongoing",
      title: "Complex Systems podcast",
      date: "2024",
      summary:
        "Weekly Thursday interviews with builders of systems and institutions, published with edited full transcripts.",
      sourceIds: [S.csHome, S.csAbout],
    },
  ],
  appearances: [
    {
      id: "appearance-microconf-2011",
      title: "Software Businesses In 5 Hours A Week",
      venue: "MicroConf",
      publishedAt: "2011-06",
      participants: ["Patrick McKenzie"],
      summary:
        "His MicroConf talk on the Gifu years and the Bingo Card Creator origin story; he later posted slides, video, and commentary.",
      media: [
        {
          type: "article",
          url: "https://www.kalzumeus.com/2011/06/17/software-businesses-in-5-hours-a-week-microconf-2010-presentation-1-hour/",
          sourceId: S.microconfPost,
        },
      ],
      sourceIds: [S.microconfPost],
    },
    {
      id: "appearance-product-people",
      title: "How Patio11 built a product business (EP05/EP06)",
      venue: "Product People",
      publishedAt: "2012-12",
      participants: ["Patrick McKenzie", "Justin Jackson"],
      summary:
        "Two-part interview on building his first product business with $60, the Japanese megacorp day job, and market research tactics.",
      media: [
        {
          type: "audio",
          url: "https://productpeople.transistor.fm/episodes/ep05-how-patio11-built-a-product-business-part-1",
          sourceId: S.productPeople5,
        },
        {
          type: "audio",
          url: "https://productpeople.transistor.fm/episodes/ep06-patio11-on-building-products-that-make-money-part-2",
          sourceId: S.productPeople6,
        },
      ],
      sourceIds: [S.productPeople5, S.productPeople6],
    },
    {
      id: "appearance-indie-hackers",
      title:
        "How to Overcome the Biggest Challenges to Your Online Business",
      venue: "Indie Hackers podcast",
      publishedAt: "2017-05-10",
      participants: ["Patrick McKenzie", "Courtland Allen"],
      summary:
        "Episode #013, recorded in person at Stripe's office: the Bingo Card Creator numbers, why he wrote transparently, and the path from consulting through Starfighter to Stripe.",
      media: [
        {
          type: "audio",
          url: "https://www.indiehackers.com/podcast/013-patrick-mckenzie-of-appointment-reminder",
          sourceId: S.indieHackers,
        },
      ],
      sourceIds: [S.indieHackers],
    },
    {
      id: "appearance-sed-atlas",
      title: "Stripe Atlas with Patrick McKenzie",
      venue: "Software Engineering Daily",
      publishedAt: "2018-05-08",
      participants: ["Patrick McKenzie", "Jeff Meyerson"],
      summary:
        "SED581: how Atlas lowers the activation energy of starting an internet business, plus his own business chronology (BCC 2006–2015, Appointment Reminder 2010–2016, Starfighter).",
      media: [
        {
          type: "audio",
          url: "https://softwareengineeringdaily.com/podcasts/stripe-atlas-with-patrick-mckenzie/",
          sourceId: S.sedAtlas,
        },
        {
          type: "transcript",
          url: "https://softwareengineeringdaily.com/wp-content/uploads/2018/05/SED581-Stripe-Atlas.pdf",
          sourceId: S.sedTranscript,
        },
      ],
      sourceIds: [S.sedAtlas, S.sedTranscript],
    },
    {
      id: "appearance-npr",
      title:
        "With Few Details From Health Officials, Volunteers Create COVID-19 Vaccine Database",
      venue: "NPR (All Things Considered / KQED)",
      publishedAt: "2021-01-26",
      participants: ["Patrick McKenzie", "Lesley McClurg"],
      summary:
        "Broadcast segment on VaccinateCA's first week; he explains the call-the-pharmacies idea that started the project.",
      media: [
        {
          type: "article",
          url: "https://www.npr.org/2021/01/26/960855949/with-few-details-from-health-officials-volunteers-create-covid-19-vaccine-databa",
          sourceId: S.npr,
        },
      ],
      sourceIds: [S.npr],
    },
    {
      id: "appearance-conversations-with-tyler",
      title: "Patrick McKenzie on Navigating Complex Systems (Ep. 201)",
      venue: "Conversations with Tyler",
      publishedAt: "2024-01-10",
      participants: ["Patrick McKenzie", "Tyler Cowen"],
      summary:
        "Recorded October 26, 2023: payments trivia, Japan and ambition, Tether skepticism, the internet as a Great Work, and reverse culture shock after returning to the US.",
      media: [
        {
          type: "transcript",
          url: "https://conversationswithtyler.com/episodes/patrick-mckenzie/",
          sourceId: S.cwt,
        },
      ],
      sourceIds: [S.cwt],
    },
    {
      id: "appearance-complex-systems-host",
      title: "Complex Systems (host)",
      venue: "complexsystemspodcast.com",
      publishedAt: "2024",
      participants: ["Patrick McKenzie"],
      summary:
        "Ongoing host duties: weekly interviews plus solo episodes such as the February 2025 'On editorial standards and independence.'",
      media: [
        {
          type: "audio",
          url: "https://www.complexsystemspodcast.com/episodes/editorial-standards-and-independence/",
          sourceId: S.csEditorial,
        },
      ],
      sourceIds: [S.csHome, S.csAbout, S.csEditorial],
    },
  ],
  relations: [
    {
      id: "rel-kalzumeus-software",
      kind: "founded",
      target: "kalzumeus-software",
      targetName: "Kalzumeus Software",
      targetKind: "organization",
      note:
        "Founded his umbrella company in 2006 — Bingo Card Creator, Appointment Reminder, and now the LLC publishing Bits about Money and Complex Systems.",
      sourceIds: [S.kalzumeusHome, S.kalzumeusAbout, S.microconfPost],
    },
    {
      id: "rel-starfighter",
      kind: "founded",
      target: "starfighter",
      targetName: "Starfighter",
      targetKind: "organization",
      note:
        "Co-founded with Thomas and Erin Ptacek in March 2015 to sell CTF work-sample assessments; shuttered August 2016.",
      sourceIds: [S.starfighterPost, S.yir2016],
    },
    {
      id: "rel-stripe",
      kind: "employed_by",
      target: "stripe",
      targetName: "Stripe",
      targetKind: "organization",
      note:
        "Joined in September 2016 to work on Atlas; after six years full-time he moved to an advisory role around December 2022.",
      sourceIds: [S.yir2016, S.bamCards, S.linkedin, S.kalzumeusAbout],
    },
    {
      id: "rel-vaccinateca",
      kind: "founded",
      target: "vaccinateca",
      targetName: "VaccinateCA",
      targetKind: "organization",
      note:
        "Spun up from his January 14, 2021 tweet; he became CEO of Call The Shots, Inc., the 501(c)(3) behind it.",
      sourceIds: [S.wipVaccinate, S.kalzumeusCharity, S.npr],
    },
    {
      id: "rel-thomas-ptacek",
      kind: "cofounder",
      target: "thomas-ptacek",
      targetName: "Thomas Ptacek",
      note: "Co-founded Starfighter with him in 2015.",
      sourceIds: [S.starfighterPost],
    },
    {
      id: "rel-erin-ptacek",
      kind: "cofounder",
      target: "erin-ptacek",
      targetName: "Erin Ptacek",
      note: "Co-founded Starfighter with him in 2015.",
      sourceIds: [S.starfighterPost],
    },
    {
      id: "rel-karl-yang",
      kind: "collaborated",
      target: "karl-yang",
      targetName: "Karl Yang",
      note:
        "Set up the VaccinateCA Discord on launch night and co-organized the volunteer effort.",
      sourceIds: [S.wipVaccinate],
    },
    {
      id: "rel-tyler-cowen",
      kind: "interviewed_by",
      target: "tyler-cowen",
      targetName: "Tyler Cowen",
      note:
        "Conversations with Tyler Ep. 201, 'Navigating Complex Systems,' recorded October 2023.",
      sourceIds: [S.cwt],
    },
    {
      id: "rel-courtland-allen",
      kind: "interviewed_by",
      target: "courtland-allen",
      targetName: "Courtland Allen",
      note:
        "Indie Hackers podcast #013, recorded in person at Stripe's office while both worked there.",
      sourceIds: [S.indieHackers],
    },
    {
      id: "rel-jeff-meyerson",
      kind: "interviewed_by",
      target: "jeff-meyerson",
      targetName: "Jeff Meyerson",
      note: "Software Engineering Daily episode on Stripe Atlas, May 2018.",
      sourceIds: [S.sedAtlas],
    },
    {
      id: "rel-justin-jackson",
      kind: "interviewed_by",
      target: "justin-jackson",
      targetName: "Justin Jackson",
      note:
        "Product People episodes 5 and 6 on building a product business, December 2012.",
      sourceIds: [S.productPeople5, S.productPeople6],
    },
  ],
  openQuestions: [
    "No Wikipedia article or Wikidata item exists for him as of this research date; en.wikipedia's 'Patrick McKenzie' is a South African politician, so the packet omits those identity anchors.",
    "His date and place of birth are absent from the cited record; a birth year around 1981–1982 is only inferable from his 2004 college graduation and is not asserted.",
    "He has never publicly named the Japanese megacorp where he was a salaryman, and deflected naming the Gifu incubator as well; whether this is deliberate discretion or coincidence is unresolved.",
    "Final closing prices and terms for the Bingo Card Creator and Appointment Reminder sales are undisclosed; only the ~$57,000 FE International listing price for BCC is on the record.",
    "The exact month he moved from full-time Stripe work to the advisory role is loosely dated (LinkedIn: December 2022; his own phrasing: 'after six years').",
    "His current base is ambiguous in the public record: the October 2023 Conversations with Tyler recording places him back in the US with Chicago family roots, while his GitHub and LinkedIn locations still say Tokyo.",
    "VaccinateCA's impact figure — 'likely saved thousands of lives' on about $1.2 million — is his own estimate rather than an independent evaluation.",
    "How his advisory relationship with Stripe intersects editorial coverage at Bits about Money is disclosed by him via disclaimers but not independently governed; both publications are Kalzumeus Software, LLC products.",
  ],
  body: `Patrick McKenzie — known nearly everywhere online as patio11 — is an American software entrepreneur and essayist whose public writing built him a career arc with no institutional precedent: rural-Japan salaryman to niche-SaaS founder to Stripe engineer to civic-infrastructure organizer to independent publisher of financial plumbing.

## From St. Louis to Gifu

He grew up in the US, attended Washington University in St. Louis (2000–2004), and graduated with a computer science degree plus a second degree in East Asian Studies. Worried by a Wall Street Journal claim that engineering employment was leaving America, he hedged with Japanese — "the Venn Diagram game," he called it — and moved to Japan right after college, placed as a technical translator at Softopia Japan, the Gifu prefectural technology incubator, through the exchange program whose Coordinator for International Relations track is better known as JET. When that contract elapsed in 2007 he became a salaryman engineer at a Japanese megacorp he has never publicly named. March 30, 2010 was his last day of salaried work; Hacker News threw a congratulatory thread.

## Kalzumeus Software

The side business had started in mid-2006: a free bingo-card generator he built in a day for a Gifu English-teachers' mailing list drew sixty emails overnight, so he productized it on a $60 budget — Java Swing at first, a Rails SaaS by 2009 — targeting $200 a month. It passed that in its second month, took payments through eSellerate and later PayPal, and within four or five years was earning more than his day job. Bingo Card Creator made him a different kind of public figure: he published revenue, traffic, A/B tests, and strategy year after year, at a time when almost nobody running a real business did that. "Breadcrumbs for the next person," he told Indie Hackers — plus the discipline of written plans checked against later results.

He launched Appointment Reminder in December 2010 — Twilio-powered reminder calls for professional-services businesses, deliberately recurring-revenue after BCC's one-off sales — and sold both products through broker FE International: BCC in May 2015 (listed around $57,000), Appointment Reminder in late 2016. In between he co-founded Starfighter (March 2015) with Thomas and Erin Ptacek, an attempt to replace the technical interview with CTF work-sample games; it shuttered in August 2016, and he joined Stripe that September to work on Atlas.

## Essays

Three kalzumeus.com essays became canonical internet texts: "Falsehoods Programmers Believe About Names" (2010), which spawned a genre of assumption lists; "Don't Call Yourself A Programmer, And Other Career Advice" (2011), arguing engineers are hired to create business value; and "Salary Negotiation: Make More Money, Be More Valued" (2012), still read hundreds of thousands of times a year, with reader-reported raises he has tracked into the millions of dollars.

## VaccinateCA

On January 14, 2021 he tweeted that someone should call every California provider and put the yeses in one place. Karl Yang spun up a Discord that night; roughly seventy volunteers joined by morning; VaccinateCA.com launched the next day. McKenzie became CEO of Call The Shots, Inc., the 501(c)(3) behind it — about ten organizers, ten employees, and five hundred volunteers whose method was human phone calls at scale, plus data collation and brokerage. It expanded nationally as Vaccinate The States in April 2021, fed availability data to partners including the federal government and Google Maps, wound down in August 2021, and dissolved February 3, 2022. He wrote the oral history for Works in Progress and a reflective post-mortem on the EA Forum; his estimate — thousands of lives for about $1.2 million — is his own. NPR, NBC News, the San Francisco Chronicle, and SFGate covered the first weeks.

## The media business

Since October 2021 he has written Bits about Money, a roughly biweekly "professional journal at the intersection of finance and technology" — ACH mechanics, debanking, card tokens, title insurance. In 2024 he launched the Complex Systems podcast: weekly Thursday interviews with people who built institutions, published with carefully edited transcripts. Both run under Kalzumeus Software, LLC, during what he calls a semi-sabbatical; he remains a Stripe advisor after six years of full-time work ended around December 2022. In February 2025 he refused a retraction request from Anchorage Digital's CEO and published the correspondence — a small monument to his stated editorial standard: cite heavily, disclose conflicts, don't retract under pressure.

## What the record does not settle

There is no Wikipedia article or Wikidata item for him; his birth date is unpublished in the cited record; his Japanese employer is deliberately unnamed; the sale prices of both companies are undisclosed; and his current base is ambiguous — the October 2023 interview records him back in the US with Chicago roots while his profiles still say Tokyo.

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
