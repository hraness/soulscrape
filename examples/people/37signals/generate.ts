#!/usr/bin/env bun
/** Generate examples/people/37signals/person-index.json with derived source ids.
 *
 * Subject kind "organization": the subject block is identical to a person
 * packet (kind/handle/displayName/summary + optional alsoKnownAs/identity).
 * Founders, employees, and backers ride in `relations` (founded_by / member /
 * employed / funded_by / influenced_by / other); the Bezos minority stake is a
 * "funding" timeline event; product launches are "project"/"milestone" events.
 */

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

const ACCESSED = "2026-09-18T05:30:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- subject-controlled (the company's own sites, blogs, and repos) ---------

const signalsSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "37signals",
  url: "https://37signals.com/",
  publisher: "37signals",
  notes:
    "The company's current site, relaunched May 2022 in the spirit of the 1999 original — manifesto-forward, ideas-first.",
});
const manifesto = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "The 37signals Manifesto",
  url: "https://37signals.com/manifesto",
  publisher: "37signals",
  publishedAt: "1999",
  notes:
    "The original 37signals site: '37 things' the web design firm believed. Linked from the 2014 rename announcement as the company's founding document.",
});
const basecampAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Basecamp — Where we came from",
  url: "https://basecamp.com/about",
  publisher: "37signals",
  notes:
    "Jason Fried's own company history: web design firm to product company once Basecamp's revenue passed client work.",
});
const gettingReal = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Getting Real — the smarter, faster, easier way to build a successful web application",
  url: "https://basecamp.com/gettingreal",
  publisher: "37signals",
  publishedAt: "2006",
  notes:
    "The company's self-published 2006 book, still free to read online; the foundation of the whole how-we-work canon.",
});
const shapeUp = source({
  binding: "subject_controlled",
  mediaType: "book",
  title: "Shape Up: Stop Running in Circles and Ship Work that Matters",
  url: "https://basecamp.com/shapeup",
  publisher: "37signals",
  publishedAt: "2019",
  authors: ["Ryan Singer"],
  notes:
    "Ryan Singer's product-methodology book, published free on the company site in 2019 — written while he was head of strategy.",
});
const onceSite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "ONCE — write once, own forever",
  url: "https://once.com",
  publisher: "37signals",
  publishedAt: "2023",
  notes:
    "The ONCE product line's manifesto site: pay-once, self-hosted software positioned against 'the SaaS era.'",
});
const onceCampfire = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "ONCE — Campfire",
  url: "https://once.com/campfire",
  publisher: "37signals",
  notes:
    "Campfire's product page under ONCE: now 'entirely free and open source under the MIT License,' installed via the ONCE CLI — it launched in 2024 as a $299 pay-once product.",
});
const heySite = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "HEY — Email at its best, new from scratch",
  url: "https://www.hey.com/",
  publisher: "37signals",
  notes: "The HEY email service's own site; $99/year, no data mining.",
});
const heyApple = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "HEY — Apple vs. HEY, antitrust, and monopoly",
  url: "https://www.hey.com/apple/",
  publisher: "37signals",
  publishedAt: "2020",
  notes:
    "The company's own archive of the June 2020 App Store fight: the rejection letter, DHH's tweets, and links to the press coverage it curated.",
});
const svnBasecampLaunches = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Basecamp Launches",
  url: "https://signalvnoise.com/archives/000542",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2004-02-05",
  authors: ["Jason Fried"],
  notes:
    "The original launch post: free for one project plus a 30-day trial on paid plans; no PR blitz, no advertising.",
});
const svnRails = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Rails: The infrastructure behind Basecamp",
  url: "https://signalvnoise.com/archives/000766",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2004-07-24",
  authors: ["David Heinemeier Hansson"],
  notes:
    "The public release of Rails on the company blog: 'we're releasing all the infrastructure libraries used to build Basecamp.'",
});
const svnDhhSignal = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "David Heinemeier Hansson is now a signal",
  url: "https://signalvnoise.com/archives/001031.php",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2005",
  notes:
    "The announcement that DHH — 'Mr. Ruby on Rails… the technical brains behind Basecamp' — was formally part of 37signals, signed in Seattle.",
});
const svnBezos = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Bezos Expeditions invests in 37signals",
  url: "https://signalvnoise.com/archives2/bezos_expeditions_invests_in_37signals",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2006-07-19",
  notes:
    "The announcement of Jeff Bezos's minority private-equity investment — framed as buying wisdom, not cash: 'We're looking for something else… we found a perfect match in Jeff.'",
});
const svnBackpack = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Backpack's first birthday",
  url: "https://signalvnoise.com/archives2/backpacks_first_birthday",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2006-05-08",
  notes:
    "Confirms product order — Basecamp first, Ta-da List second, Backpack third — and 'we built Backpack because we needed Backpack.'",
});
const svnFiveYears = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Happy Birthday — Basecamp Turns Five!",
  url: "https://signalvnoise.com/posts/1556-happy-birthday-basecamp-turns-five",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2009-02",
  notes:
    "Marks the February 4, 2004 launch and the original $9/$19/$39/$59 pricing — 'no traditional PR blitz, no advertising.'",
});
const svnNext = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Basecamp Next: Becoming Basecamp",
  url: "https://signalvnoise.com/posts/3114-basecamp-next-becoming-basecamp",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2012-02-21",
  authors: ["Jason Fried"],
  notes:
    "Renaming the rebuilt product — and a notable detail: the founders called Jeff Bezos in December 2011 for advice on whether the rewrite deserved the Basecamp name.",
});
const svnKyc = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Big: Know Your Company grows up and moves out",
  url: "https://signalvnoise.com/posts/3700-big-know-your-company-grows-up-and-moves-out",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2013",
  notes:
    "Announces the spin-off of Know Your Company — a product built internally in mid-2013 — into a separate company run by Claire Lew.",
});
const svnKycDeal = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "How we put together a simple deal to spin off Know Your Company",
  url: "https://signalvnoise.com/svn3/how-we-put-together-a-simple-deal-to-spin-off-know-your-company/",
  publisher: "Signal v. Noise (Basecamp)",
  notes:
    "The deal mechanics: Basecamp and Claire Lew 50/50 until she generated $1M in new sales, then 75/25 in her favor, in perpetuity.",
});
const svnRename = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Big news",
  url: "https://signalvnoise.com/posts/3714-big-news",
  publisher: "Signal vs. Noise (37signals)",
  publishedAt: "2014-02-05",
  authors: ["Jason Fried"],
  notes:
    "Basecamp's tenth-birthday post announcing the rename of the whole company to Basecamp and the single-product strategy.",
});
const svnHighrise = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "Big news for Highrise",
  url: "https://signalvnoise.com/posts/3770-big-news-for-highrise",
  publisher: "Signal v. Noise (Basecamp)",
  publishedAt: "2014-08",
  authors: ["Jason Fried"],
  notes:
    "Highrise spun off as a subsidiary with its own CEO, Nathan Kontny — funded entirely by customer revenue.",
});
const svnEquity = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "An alternative to employee options/equity grants",
  url: "https://signalvnoise.com/posts/2987-an-alternative-to-employee-optionsequity-grants",
  publisher: "Signal vs. Noise (37signals)",
  notes:
    "'Since we have no intention of selling 37signals or going public…' — the company replaced stock options with a sale/IPO bonus-pool formula.",
});
const svnWorth = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "How much are we worth? I don't know and I don't care",
  url: "https://signalvnoise.com/posts/3908-how-much-are-we-worth-i-dont-know-and-i-dont-care",
  publisher: "Signal v. Noise (Basecamp)",
  publishedAt: "2015",
  authors: ["Jason Fried"],
  notes:
    "Nearly 100 approaches from investors declined; 'we don't have any options, because we don't have any intention to sell.'",
});
const svnSell = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "You don't have to sell your company to have financial security and the freedom to do what you want",
  url: "https://signalvnoise.com/posts/1159-you-dont-have-to-sell-your-company-to-have-financial-security-and-the-freedom-to-do-what-you-want",
  publisher: "Signal vs. Noise (37signals)",
  authors: ["David Heinemeier Hansson"],
  notes:
    "DHH's early statement of the anti-exit creed: four-day weeks, profit instead of exits, and rebutting Paul Graham's security-through-sale argument.",
});
const svnApple = source({
  binding: "subject_controlled",
  mediaType: "article",
  title: "On Apple's monopoly power to destroy HEY",
  url: "https://signalvnoise.com/svn3/on-apples-monopoly-power-to-destroy-hey/",
  publisher: "Signal v. Noise (Basecamp)",
  publishedAt: "2020-07-17",
  authors: ["David Heinemeier Hansson"],
  notes:
    "DHH's post-rejection essay: 'Apple is unlike any other platform… 90% of everyone who pays for our service uses at least one Apple device.'",
});
const reworkName = source({
  binding: "subject_controlled",
  mediaType: "audio",
  title: "What's in a Name — REWORK",
  url: "https://37signals.com/podcast/whats-in-a-name/",
  publisher: "REWORK (37signals)",
  notes:
    "Fried and Hansson narrate both renames on the company podcast; Fried lists the suite's launch order: Basecamp 2004, Backpack 2005, Campfire 2006, Highrise 2007.",
});
const reworkSpinoff = source({
  binding: "subject_controlled",
  mediaType: "audio",
  title: "A Spin-Off Story — REWORK",
  url: "https://37signals.com/podcast/a-spin-off-story/",
  publisher: "REWORK (37signals)",
  notes:
    "The founders on the spin-off playbook: Know Your Company to Claire Lew, Highrise to Nathan Kontny, and 'the We Work Remotely job board, which we spun off and sold.'",
});
const reworkFlop = source({
  binding: "subject_controlled",
  mediaType: "audio",
  title: "Building to Flip is Building to Flop — REWORK",
  url: "https://37signals.com/podcast/building-to-flip-is-building-to-flop/",
  publisher: "REWORK (37signals)",
  notes:
    "Fried on 'commitment strategy' vs. exit strategy — the company's anti-flip catechism in its own words.",
});
const githubCampfire = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "basecamp/once-campfire — Super simple group chat, without a subscription",
  url: "https://github.com/basecamp/once-campfire",
  publisher: "GitHub",
  notes:
    "The Campfire ONCE source, published under the MIT License (copyright 37signals, LLC); public repo created August 2025.",
});
const heyJasonChanges = source({
  binding: "first_person",
  mediaType: "article",
  title: "Changes at Basecamp",
  url: "https://world.hey.com/jason/changes-at-basecamp-7f32afc5",
  publisher: "HEY World (Jason Fried)",
  publishedAt: "2021-04-26",
  authors: ["Jason Fried"],
  notes:
    "The post that started the 2021 crisis: 'No more societal and political discussions on our company Basecamp account,' no more committees, no more 'paternalistic benefits.'",
});
const heyJasonUpdate = source({
  binding: "first_person",
  mediaType: "article",
  title: "An Update",
  url: "https://world.hey.com/jason/an-update-303f2f99",
  publisher: "HEY World (Jason Fried)",
  publishedAt: "2021-05-04",
  authors: ["Jason Fried"],
  notes:
    "Fried's post-exodus apology: 'Last week was terrible… David and I completely own the consequences.' The new policies stood.",
});
const heyJasonRename = source({
  binding: "first_person",
  mediaType: "article",
  title: "37signals: Hello again",
  url: "https://world.hey.com/jason/37signals-hello-again-117eae60",
  publisher: "HEY World (Jason Fried)",
  publishedAt: "2022-05-03",
  authors: ["Jason Fried"],
  notes:
    "The rename-back announcement: 'We aren't a one product company anymore… Today, May 3, 2022, we're changing our minds and renaming our company again.'",
});
const heyDhhEmail = source({
  binding: "first_person",
  mediaType: "article",
  title: "It all began with an email",
  url: "https://world.hey.com/dhh/it-all-began-with-an-email-a6cfe431",
  publisher: "HEY World (David Heinemeier Hansson)",
  publishedAt: "2021",
  authors: ["David Heinemeier Hansson"],
  notes:
    "DHH pins the start of the partnership: his email to Fried on October 27, 2001, answering a regular-expression question — for Singlefile, their first SaaS product together.",
});
const heyDhhOnce = source({
  binding: "first_person",
  mediaType: "article",
  title: "Campfire is ONCE #1",
  url: "https://world.hey.com/dhh/campfire-is-once-1-d2cebd12",
  publisher: "HEY World (David Heinemeier Hansson)",
  publishedAt: "2024-01-19",
  authors: ["David Heinemeier Hansson"],
  notes:
    "The ONCE #1 reveal: Campfire reborn as installable software, 'a one-time price of $299,' with source access — later made free and MIT-licensed.",
});
const mediumOrigin = source({
  binding: "first_person",
  mediaType: "article",
  title: "Basecamp: The Origin Story",
  url: "https://medium.com/@jasonfried/basecamp-the-origin-story-f509fdd725f8",
  publisher: "Medium (Jason Fried)",
  authors: ["Jason Fried"],
  notes:
    "Fried's narrative: 1999 web design firm, the internal tool built out of frustration, released February 4, 2004.",
});
const mediumBezosDeal = source({
  binding: "first_person",
  mediaType: "article",
  title: "The deal Jeff Bezos got on Basecamp",
  url: "https://medium.com/signal-v-noise/the-deal-jeff-bezos-got-on-basecamp-b7a1cb39179e",
  publisher: "Signal v. Noise (Medium)",
  publishedAt: "2017",
  authors: ["David Heinemeier Hansson"],
  notes:
    "DHH's account of the deal's structure: a minority, no-control stake in the LLC; profit distributions repaid the investment 'five times over' and Bezos 'still owns the stake' as of writing.",
});
const dhhSite = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "David Heinemeier Hansson (DHH)",
  url: "https://dhh.dk/",
  publisher: "David Heinemeier Hansson",
  notes:
    "DHH's own bio: creator of Ruby on Rails, 'co-owner of 37signals… I own that business together with Jason Fried.'",
});
const tedFried = source({
  binding: "first_person",
  mediaType: "video",
  title: "Why work doesn't happen at work — Jason Fried, TEDxMidwest",
  url: "https://www.ted.com/talks/jason_fried_why_work_doesn_t_happen_at_work",
  publisher: "TED",
  publishedAt: "2010-10",
  authors: ["Jason Fried"],
  notes:
    "Fried's TEDx talk on interruption-driven offices — the clearest public statement of the 'calm company' doctrine.",
});

// --- interviews --------------------------------------------------------------

const mixergy = source({
  binding: "interview",
  mediaType: "article",
  title: "The Biography of 37signals, Whose Web Apps Are Used By 3 Million People — with Jason Fried",
  url: "https://mixergy.com/interviews/37signals-jason-fried/",
  publisher: "Mixergy",
  authors: ["Andrew Warner"],
  notes:
    "The fullest on-record founding interview: all three founders, Segura's SETI-derived name, the early departures — 'Carlos left about a year later, and Ernest left in, I think it was 2002 or so, maybe 2003.'",
});
const optoDhh = source({
  binding: "interview",
  mediaType: "article",
  title: "'We're over-SaaSed': 37signals' David Heinemeier Hansson on the end of the subscription era",
  url: "https://www.cmcmarkets.com/en/optox/were-over-saased-37signals-david-heinemeier-hansson-on-the-end-of-the-subscription-er",
  publisher: "Opto Sessions (CMC Markets)",
  publishedAt: "2023-11",
  authors: ["David Heinemeier Hansson"],
  notes:
    "DHH announcing ONCE's thesis weeks after the manifesto went up: 'In the early 2000s, we were among the early pioneers leading the industry into the SaaS revolution… we intend to help lead the way out.'",
});

// --- primary records ----------------------------------------------------------

const githubRails = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "rails/rails — Ruby on Rails",
  url: "https://github.com/rails/rails",
  publisher: "GitHub",
  notes:
    "The framework's canonical repository, one of the most influential open-source projects to come out of a product company.",
});
const rubytalkRails = source({
  binding: "archive",
  mediaType: "article",
  title: "[ANN] Action Pack 0.7.5: On rails from request to response / Rails 0.5.0: The end of vaporware!",
  url: "https://rubytalk.org/t/ann-action-pack-0-7-5-on-rails-from-request-to-response/12737",
  publisher: "ruby-talk (mirror)",
  publishedAt: "2004-07-24",
  authors: ["David Heinemeier Hansson"],
  notes:
    "Mailing-list mirror of the July 2004 Rails release announcements: 'the package currently on offer… will grow in public.'",
});
const harperCollins = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "It Doesn't Have to Be Crazy at Work — HarperCollins",
  url: "https://www.harpercollins.com/products/it-doesnt-have-to-be-crazy-at-work-jason-frieddavid-heinemeier-hansson",
  publisher: "HarperCollins",
  publishedAt: "2018-10-02",
  notes:
    "Publisher's catalog record for the third Fried/Hansson book — the 'calm company' manifesto.",
});
const appleBooksRemote = source({
  binding: "reference",
  mediaType: "book",
  title: "Remote: Office Not Required — Apple Books",
  url: "https://books.apple.com/us/book/remote/id625981856",
  publisher: "Apple Books",
  publishedAt: "2013",
  notes:
    "Retail catalog record for the 2013 remote-work book by Fried and Hansson.",
});

// --- reporting ----------------------------------------------------------------

const wiredBezos = source({
  binding: "reporting",
  mediaType: "article",
  title: "Jeff Bezos Invests in 37signals",
  url: "https://www.wired.com/2006/07/jeff-bezos-invests-in-37signals/",
  publisher: "Wired",
  publishedAt: "2006-07",
  notes:
    "Contemporaneous coverage: 'the first financial boost that the company has accepted from an outside source.'",
});
const tcBezos = source({
  binding: "reporting",
  mediaType: "article",
  title: "37 Signals Takes Jeff Bezos Investment",
  url: "https://techcrunch.com/2006/07/20/37-signals-takes-jeff-bezos-investment/",
  publisher: "TechCrunch",
  publishedAt: "2006-07-20",
  authors: ["Michael Arrington"],
});
const bloombergBezos = source({
  binding: "reporting",
  mediaType: "article",
  title: "37Signals, 1 Big New Investor: Jeff Bezos",
  url: "https://www.bloomberg.com/news/articles/2006-07-19/37signals-1-big-new-investor-jeff-bezos",
  publisher: "Bloomberg",
  publishedAt: "2006-07-19",
  notes:
    "Bloomberg's BusinessWeek-era take, quoting Fried on Bezos's 'two-pizza teams' affinity for small companies. Paywalled/bot-walled to plain fetches.",
});
const speakUp = source({
  binding: "reporting",
  mediaType: "article",
  title: "AIGA/NY Smart Models: 37Signals",
  url: "https://www.underconsideration.com/speakup/archives/004842.html",
  publisher: "Speak Up (UnderConsideration)",
  publishedAt: "2005",
  notes:
    "A contemporaneous 2005 design-community writeup: 'Founded in Chicago in 1999 with Ernest Kim (left in 2003) and Carlos Segura (left in 2000)… profitable since the beginning.'",
});
const vergeHeyLaunch = source({
  binding: "reporting",
  mediaType: "article",
  title: "Hey is a wildly opinionated new email service from the makers of Basecamp",
  url: "https://www.theverge.com/2020/6/15/21286466/hey-email-basecamp-price-availability-platforms-launch",
  publisher: "The Verge",
  publishedAt: "2020-06-15",
  authors: ["Casey Newton"],
  notes:
    "Launch-day review: $99/year, 50,000+ on the waitlist, six native clients built by a 56-person company.",
});
const vergeAppleReject = source({
  binding: "reporting",
  mediaType: "article",
  title: "Apple rejects Hey.com App Store updates, mandating in-app subscription",
  url: "https://www.theverge.com/2020/6/16/21293419/hey-apple-rejection-ios-app-store-dhh-gangsters-antitrust",
  publisher: "The Verge",
  publishedAt: "2020-06-16",
  authors: ["Casey Newton"],
  notes:
    "The App Store rejection broke the day after launch — DHH called Apple's negotiators 'gangsters'; coincided with the EU's App Store investigation.",
});
const tcAppleApprove = source({
  binding: "reporting",
  mediaType: "article",
  title: "Apple approves Hey bug fix update after Basecamp agrees to tweak app",
  url: "https://techcrunch.com/2020/06/22/apple-approves-hey-bug-fix-update-after-basecamp-agrees-to-tweak-app-at-center-of-store-policy-spat/",
  publisher: "TechCrunch",
  publishedAt: "2020-06-22",
  notes:
    "Resolution: HEY approved without in-app purchase once it offered a free temporary address — hours before WWDC.",
});
const vergeControversy = source({
  binding: "reporting",
  mediaType: "article",
  title: "Behind the controversy at Basecamp",
  url: "https://www.theverge.com/2021/4/27/22406673/basecamp-political-speech-policy-controversy",
  publisher: "The Verge",
  publishedAt: "2021-04-27",
  authors: ["Casey Newton"],
  notes:
    "The backdrop: a long-standing internal list of 'funny' customer names, and employee DEI work the founders shut down. 'The hardest conversations at work were about the company itself.'",
});
const vergeExodus = source({
  binding: "reporting",
  mediaType: "article",
  title: "Basecamp implodes as employees flee company, including senior staff",
  url: "https://www.theverge.com/2021/4/30/22412714/basecamp-employees-memo-policy-hansson-fried-controversy",
  publisher: "The Verge",
  publishedAt: "2021-04-30",
  authors: ["Casey Newton"],
  notes:
    "Roughly a third of the company's 57 employees accepted buyouts; Hansson offered 3–6 months' severance, 'no hard feelings.'",
});
const vergeAllHands = source({
  binding: "reporting",
  mediaType: "article",
  title: "Inside the all-hands meeting that led to a third of Basecamp employees quitting",
  url: "https://www.theverge.com/2021/5/3/22418208/basecamp-all-hands-meeting-employee-resignations-buyouts-implosion",
  publisher: "The Verge",
  publishedAt: "2021-05-03",
  authors: ["Casey Newton"],
  notes:
    "The Friday all-hands; Fried apologized for the rollout but not the policies; head of strategy Ryan Singer — 18-year veteran and Shape Up author — was suspended after questioning the existence of white supremacy at the company.",
});
const vergeApology = source({
  binding: "reporting",
  mediaType: "article",
  title: "Basecamp CEO apologizes to staff in new post: 'We have a lot to learn'",
  url: "https://www.theverge.com/2021/5/4/22419799/basecamp-ceo-apologizes-staff-new-post",
  publisher: "The Verge",
  publishedAt: "2021-05-04",
  authors: ["Casey Newton"],
});
const nytExodus = source({
  binding: "reporting",
  mediaType: "article",
  title: "A third of Basecamp's workers resign after a ban on talking politics",
  url: "https://www.nytimes.com/2021/04/30/technology/basecamp-politics-ban-resignations.html",
  publisher: "The New York Times",
  publishedAt: "2021-04-30",
  authors: ["Sarah Kessler"],
  notes: "Counts at least 20 public resignations. Paywalled to plain fetches.",
});
const itpro = source({
  binding: "reporting",
  mediaType: "article",
  title: "Basecamp loses a third of its staff over internal freedom of speech row",
  url: "https://www.itpro.com/business/policy-legislation/359404/basecamp-loses-a-third-of-its-staff-over-internal-freedom-of",
  publisher: "ITPro",
  publishedAt: "2021-05",
  notes:
    "Adds the DEI-council detail: employee diversity work 'would now be the responsibility of one individual.'",
});
const tnwHey = source({
  binding: "reporting",
  mediaType: "article",
  title: "How Jason Fried wants to change your perception of email with Hey",
  url: "https://thenextweb.com/news/how-jason-fried-wants-to-change-your-perception-of-email-with-hey",
  publisher: "TNW",
  publishedAt: "2020-08",
  notes:
    "Two months post-launch: 'tens of thousands of paying customers; 200,000 people have tried it' — self-reported traction.",
});
const dfRenameBack = source({
  binding: "reporting",
  mediaType: "article",
  title: "37signals Is Back",
  url: "https://daringfireball.net/linked/2022/05/03/37signals",
  publisher: "Daring Fireball",
  publishedAt: "2022-05-03",
  authors: ["John Gruber"],
  notes: "Gruber's link-post on the May 3, 2022 re-rename to 37signals.",
});

// --- reference ----------------------------------------------------------------

const wiki37 = source({
  binding: "reference",
  mediaType: "article",
  title: "37signals",
  url: "https://en.wikipedia.org/wiki/37signals",
  publisher: "Wikipedia",
  notes:
    "The company's article: founders Fried/Segura/Kim, 1999 founding, 2014→Basecamp, 2022→back, products list, '34 employees (2021)' infobox.",
});
const wikiDhh = source({
  binding: "reference",
  mediaType: "article",
  title: "David Heinemeier Hansson",
  url: "https://en.wikipedia.org/wiki/David_Heinemeier_Hansson",
  publisher: "Wikipedia",
  notes:
    "DHH's article: hired by Fried to build what became Basecamp, created Rails, partner and CTO, moved to Chicago November 2005.",
});
const wikidata37 = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Basecamp (Q2364173) — Wikidata",
  url: "https://www.wikidata.org/wiki/Q2364173",
  publisher: "Wikidata",
  notes:
    "The company's Wikidata item, still labeled 'Basecamp' from the 2014–2022 name era — the stable identifier anchor for the subject.",
});
const linkedin37 = source({
  binding: "reference",
  mediaType: "webpage",
  title: "37signals — LinkedIn company page",
  url: "https://www.linkedin.com/company/37signals",
  publisher: "LinkedIn",
  notes:
    "Self-reported company profile; the 51–200 employee band is the only current public headcount signal.",
});
const railsSite = source({
  binding: "reference",
  mediaType: "webpage",
  title: "Ruby on Rails — the story behind Rails at O'Reilly",
  url: "https://rubyonrails.org/2005/3/11/the-story-behind-rails-at-oreilly",
  publisher: "Ruby on Rails project",
  publishedAt: "2005-03-11",
  notes:
    "Fried on the Rails.org site: 'Basecamp was the divine chicken, Rails was the egg' — the extraction story in the company's own words, hosted by the project it spawned.",
});

const S = {
  signalsSite: signalsSite.id,
  manifesto: manifesto.id,
  basecampAbout: basecampAbout.id,
  gettingReal: gettingReal.id,
  shapeUp: shapeUp.id,
  onceSite: onceSite.id,
  onceCampfire: onceCampfire.id,
  heySite: heySite.id,
  heyApple: heyApple.id,
  svnBasecampLaunches: svnBasecampLaunches.id,
  svnRails: svnRails.id,
  svnDhhSignal: svnDhhSignal.id,
  svnBezos: svnBezos.id,
  svnBackpack: svnBackpack.id,
  svnFiveYears: svnFiveYears.id,
  svnNext: svnNext.id,
  svnKyc: svnKyc.id,
  svnKycDeal: svnKycDeal.id,
  svnRename: svnRename.id,
  svnHighrise: svnHighrise.id,
  svnEquity: svnEquity.id,
  svnWorth: svnWorth.id,
  svnSell: svnSell.id,
  svnApple: svnApple.id,
  reworkName: reworkName.id,
  reworkSpinoff: reworkSpinoff.id,
  reworkFlop: reworkFlop.id,
  githubCampfire: githubCampfire.id,
  heyJasonChanges: heyJasonChanges.id,
  heyJasonUpdate: heyJasonUpdate.id,
  heyJasonRename: heyJasonRename.id,
  heyDhhEmail: heyDhhEmail.id,
  heyDhhOnce: heyDhhOnce.id,
  mediumOrigin: mediumOrigin.id,
  mediumBezosDeal: mediumBezosDeal.id,
  dhhSite: dhhSite.id,
  tedFried: tedFried.id,
  mixergy: mixergy.id,
  optoDhh: optoDhh.id,
  githubRails: githubRails.id,
  rubytalkRails: rubytalkRails.id,
  harperCollins: harperCollins.id,
  appleBooksRemote: appleBooksRemote.id,
  wiredBezos: wiredBezos.id,
  tcBezos: tcBezos.id,
  bloombergBezos: bloombergBezos.id,
  speakUp: speakUp.id,
  vergeHeyLaunch: vergeHeyLaunch.id,
  vergeAppleReject: vergeAppleReject.id,
  tcAppleApprove: tcAppleApprove.id,
  vergeControversy: vergeControversy.id,
  vergeExodus: vergeExodus.id,
  vergeAllHands: vergeAllHands.id,
  vergeApology: vergeApology.id,
  nytExodus: nytExodus.id,
  itpro: itpro.id,
  tnwHey: tnwHey.id,
  dfRenameBack: dfRenameBack.id,
  wiki37: wiki37.id,
  wikiDhh: wikiDhh.id,
  wikidata37: wikidata37.id,
  linkedin37: linkedin37.id,
  railsSite: railsSite.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-37signals",
  generatedAt: "2026-09-18T05:45:00Z",
  subject: {
    kind: "organization",
    handle: "37signals",
    displayName: "37signals",
    alsoKnownAs: [
      "37signals, LLC",
      "Basecamp (company name, 2014–2022)",
      "Basecamp LLC",
    ],
    summary:
      "The Chicago software company founded in 1999 as a web design firm by Jason Fried, Carlos Segura, and Ernest Kim. Maker of Basecamp, HEY, and the ONCE line of installable software; birthplace of Ruby on Rails; publisher of Rework, Remote, and It Doesn't Have to Be Crazy at Work. Famously bootstrapped and anti-VC — the only outside money ever taken was Jeff Bezos's 2006 minority stake. Renamed to Basecamp in 2014, renamed back in 2022, and imploded a third of its workforce in the April 2021 'no politics at work' crisis.",
    identity: {
      wikidataId: "Q2364173",
      officialSite: "https://37signals.com/",
      wikipedia: "https://en.wikipedia.org/wiki/37signals",
      profiles: [
        "https://x.com/37signals",
        "https://www.linkedin.com/company/37signals",
        "https://github.com/basecamp",
        "https://github.com/rails",
      ],
    },
  },
  scope: {
    asOf: "2026-09-18T05:45:00Z",
    coverage: [
      "history",
      "products",
      "books",
      "funding",
      "philosophy",
      "controversy",
      "media",
    ],
  },
  sources: [
    signalsSite,
    manifesto,
    basecampAbout,
    gettingReal,
    shapeUp,
    onceSite,
    onceCampfire,
    heySite,
    heyApple,
    svnBasecampLaunches,
    svnRails,
    svnDhhSignal,
    svnBezos,
    svnBackpack,
    svnFiveYears,
    svnNext,
    svnKyc,
    svnKycDeal,
    svnRename,
    svnHighrise,
    svnEquity,
    svnWorth,
    svnSell,
    svnApple,
    reworkName,
    reworkSpinoff,
    reworkFlop,
    githubCampfire,
    heyJasonChanges,
    heyJasonUpdate,
    heyJasonRename,
    heyDhhEmail,
    heyDhhOnce,
    mediumOrigin,
    mediumBezosDeal,
    dhhSite,
    tedFried,
    mixergy,
    optoDhh,
    githubRails,
    rubytalkRails,
    harperCollins,
    appleBooksRemote,
    wiredBezos,
    tcBezos,
    bloombergBezos,
    speakUp,
    vergeHeyLaunch,
    vergeAppleReject,
    tcAppleApprove,
    vergeControversy,
    vergeExodus,
    vergeAllHands,
    vergeApology,
    nytExodus,
    itpro,
    tnwHey,
    dfRenameBack,
    wiki37,
    wikiDhh,
    wikidata37,
    linkedin37,
    railsSite,
  ],
  claims: [
    // -- facts ----------------------------------------------------------------
    {
      id: "claim-founded-1999",
      kind: "fact",
      text: "37signals was founded in Chicago in 1999 as a web design firm by Jason Fried, Carlos Segura, and Ernest Kim. Fried has been running it ever since — 'I've been running 37signals… for 27 years,' he writes on the current Basecamp about page.",
      sourceIds: [S.wiki37, S.mixergy, S.basecampAbout, S.manifesto],
    },
    {
      id: "claim-early-departures",
      kind: "fact",
      text: "Two of the three founders left within the company's first few years. A 2005 AIGA/NY writeup records 'Ernest Kim (left in 2003) and Carlos Segura (left in 2000)'; Fried's own Mixergy recollection is fuzzier — 'Carlos left about a year later, and Ernest left in, I think it was 2002 or so, maybe 2003.'",
      sourceIds: [S.speakUp, S.mixergy],
    },
    {
      id: "claim-name-origin",
      kind: "fact",
      text: "Carlos Segura named the company after a PBS Nova segment on SETI: in 1999 there were 37 unexplained signals from space, 'signs of potential intelligent life.' The domain was available, so they ran with it.",
      sourceIds: [S.mixergy],
    },
    {
      id: "claim-dhh-email",
      kind: "fact",
      text: "David Heinemeier Hansson's working relationship with Fried began with an email on October 27, 2001, answering a regular-expression question Fried had posted on Signal vs. Noise — for scraping Amazon book metadata to power Singlefile, the first SaaS product the two built together.",
      sourceIds: [S.heyDhhEmail],
    },
    {
      id: "claim-dhh-partner",
      kind: "fact",
      text: "DHH built the tool that became Basecamp as a contractor from Copenhagen, was formally welcomed as 'part of 37signals' in 2005, moved to Chicago in November 2005, and is today the company's CTO and co-owner — 'I own that business together with Jason Fried.' The company now routinely describes him as a co-founder, though he was not a founder of the 1999 firm.",
      sourceIds: [S.svnDhhSignal, S.dhhSite, S.wikiDhh, S.heyDhhEmail],
    },
    {
      id: "claim-basecamp-launch",
      kind: "fact",
      text: "Basecamp launched on February 4–5, 2004 with a Signal vs. Noise post and 'no traditional PR blitz, no advertising.' Original pricing was $9/$19/$39/$59 a month with one free project; within about a year it was generating more revenue than the web design business, and client work ended.",
      sourceIds: [S.svnBasecampLaunches, S.svnFiveYears, S.basecampAbout, S.mediumOrigin],
    },
    {
      id: "claim-product-suite",
      kind: "fact",
      text: "The product suite grew through the decade: Ta-da List (the second product), Backpack (third, launched ~May 2005, the first with an API), Campfire (2006), Highrise (2007), plus Writeboard, the Sortfolio designer directory, and the We Work Remotely job board — all built by a team Fried recalls as only about 20–30 people.",
      sourceIds: [S.reworkName, S.svnBackpack, S.wiki37],
    },
    {
      id: "claim-rails-release",
      kind: "fact",
      text: "Ruby on Rails, the framework DHH wrote in Ruby to build Basecamp, was extracted and released publicly on July 24–25, 2004 — 'the end of vaporware' announced on ruby-talk. Fried's retrospective line: 'Basecamp was the divine chicken, Rails was the egg.' It remains one of the most influential web frameworks ever released by a product company.",
      sourceIds: [S.svnRails, S.rubytalkRails, S.railsSite, S.githubRails],
    },
    {
      id: "claim-bezos-deal",
      kind: "fact",
      text: "In July 2006, Bezos Expeditions — Jeff Bezos's personal investment company, explicitly 'nothing to do with Amazon' — made a minority private-equity investment in 37signals, the first outside money the company ever took. Wired noted the irony: the self-funded-startup evangelists had finally accepted a check.",
      sourceIds: [S.svnBezos, S.wiredBezos, S.tcBezos, S.bloombergBezos],
    },
    {
      id: "claim-bezos-terms",
      kind: "fact",
      text: "Per DHH's 2017 account, the deal was a minority, no-control membership stake in the LLC (never converted to a corporation), with no exit lined up; profit distributions had repaid Bezos's investment 'five times over' by then, and 'he still owns the stake.' The deal's size was never disclosed.",
      sourceIds: [S.mediumBezosDeal],
    },
    {
      id: "claim-bezos-advice",
      kind: "fact",
      text: "The relationship was advisory, not just financial: Fried recounts a December 2011 call asking Bezos whether the rebuilt Basecamp should inherit the name — his questions helped them decide it should.",
      sourceIds: [S.svnNext],
    },
    {
      id: "claim-getting-real",
      kind: "fact",
      text: "Getting Real, the company's self-published 2006 book on building web apps with less, went on to be distributed free online — the first of what became a small publishing arm.",
      sourceIds: [S.gettingReal, S.wiki37],
    },
    {
      id: "claim-books",
      kind: "fact",
      text: "Fried and Hansson published Rework (2010, a New York Times bestseller per publisher copy), Remote: Office Not Required (2013), and It Doesn't Have to Be Crazy at Work (October 2, 2018, HarperOne); Ryan Singer's Shape Up followed in 2019 as a free web book on the company's own site.",
      sourceIds: [S.appleBooksRemote, S.harperCollins, S.shapeUp, S.wiki37],
    },
    {
      id: "claim-rename-2014",
      kind: "fact",
      text: "On February 5, 2014 — Basecamp's tenth birthday — the company renamed itself Basecamp and committed to a single product; everything else in the suite would be sold, spun off, or wound down. The founders later admitted on their own podcast that the mobile era made a one-product bet seem obvious at the time.",
      sourceIds: [S.svnRename, S.svnHighrise, S.reworkName, S.wiki37],
    },
    {
      id: "claim-kyc-spinoff",
      kind: "fact",
      text: "Know Your Company — built internally in mid-2013 — was spun off in January 2014 as a separate company with Claire Lew as CEO, under an unusual deal: Basecamp and Lew 50/50 until she generated $1M in new sales, then 75/25 in her favor in perpetuity.",
      sourceIds: [S.svnKyc, S.svnKycDeal],
    },
    {
      id: "claim-highrise-spinoff",
      kind: "fact",
      text: "In August 2014 Highrise became its own company — legally a subsidiary of Basecamp — run by CEO Nathan Kontny and funded entirely by customer revenue. It stopped accepting new signups in 2018 per Wikipedia's record.",
      sourceIds: [S.svnHighrise, S.wiki37],
    },
    {
      id: "claim-wwr-sold",
      kind: "fact",
      text: "The We Work Remotely job board — also built inside the company — was spun off and sold, per the founders' own REWORK episode on the spin-off playbook.",
      sourceIds: [S.reworkSpinoff],
    },
    {
      id: "claim-hey-launch",
      kind: "fact",
      text: "HEY, the company's paid email service ($99/year, no IMAP/POP, six native clients), launched June 15, 2020 to a 50,000+ waitlist — built by a team The Verge counted at 56 people. Within about two months it had 'tens of thousands of paying customers' and 200,000 triers, per Fried's own figures to press.",
      sourceIds: [S.vergeHeyLaunch, S.tnwHey, S.heySite],
    },
    {
      id: "claim-apple-saga",
      kind: "fact",
      text: "The day after HEY's launch, Apple rejected a bug-fix update and demanded in-app purchase with its 15–30% cut; DHH called Apple's negotiators 'gangsters' and the company fought publicly for a week. Apple approved the update June 22, 2020 after HEY added a free temporary-address tier — no IAP, no 30% cut.",
      sourceIds: [S.vergeAppleReject, S.tcAppleApprove, S.heyApple, S.svnApple],
    },
    {
      id: "claim-politics-ban",
      kind: "fact",
      text: "On April 26, 2021 Fried posted 'Changes at Basecamp': no more 'societal and political discussions' on the company account, no more committees, no more 'paternalistic benefits' (wellness, fitness, continuing-education allowances converted to cash), and no 'lingering or dwelling on past decisions.'",
      sourceIds: [S.heyJasonChanges, S.vergeControversy, S.itpro],
    },
    {
      id: "claim-list-backdrop",
      kind: "fact",
      text: "Reporting revealed the ban's backdrop was an internal reckoning over a long-kept list of 'funny' customer names — some of Asian and African origin — and a volunteer DEI council the founders disbanded, assigning diversity work to 'one individual.'",
      sourceIds: [S.vergeAllHands, S.vergeControversy, S.itpro],
    },
    {
      id: "claim-exodus",
      kind: "fact",
      text: "Hansson offered severance — up to six months for three-plus-year staff — to anyone who disagreed. On April 30, 2021 roughly a third of the ~57-person company took it; at least 18–20 employees announced departures publicly. Head of strategy Ryan Singer, an ~18-year veteran, was suspended after questioning the existence of white supremacy at the company and later left.",
      sourceIds: [S.vergeExodus, S.vergeAllHands, S.nytExodus],
    },
    {
      id: "claim-apology",
      kind: "fact",
      text: "On May 4, 2021 Fried published 'An Update': 'Last week was terrible… David and I completely own the consequences, and we're sorry.' The policies stood.",
      sourceIds: [S.heyJasonUpdate, S.vergeApology],
    },
    {
      id: "claim-rename-back",
      kind: "fact",
      text: "On May 3, 2022 the company renamed itself back to 37signals: 'We aren't a one product company anymore. We're two. Basecamp and HEY.' The new 37signals.com relaunched in the manifesto spirit of the 1999 original.",
      sourceIds: [S.heyJasonRename, S.dfRenameBack, S.signalsSite],
    },
    {
      id: "claim-once-announce",
      kind: "fact",
      text: "In late 2023 the company announced ONCE — a product line (not a single product) of pay-once, self-hosted, source-available software, framed as leading 'the post–SaaS era' twenty years after pioneering SaaS itself.",
      sourceIds: [S.onceSite, S.optoDhh, S.heyDhhOnce],
    },
    {
      id: "claim-campfire-once",
      kind: "fact",
      text: "ONCE #1, announced January 19, 2024, resurrected Campfire — the 2006 chat product — as installable software at $299 once, source included. It has since become entirely free and open source under the MIT License on the company's own GitHub org.",
      sourceIds: [S.heyDhhOnce, S.onceCampfire, S.githubCampfire],
    },
    {
      id: "claim-hq-headcount",
      kind: "fact",
      text: "The company is headquartered in Chicago and fully remote in practice. Headcount is thinly documented: ~57 employees in April 2021 (The Verge), '34 (2021)' in Wikipedia's infobox after the exodus, and a self-reported 51–200 band on LinkedIn today.",
      sourceIds: [S.vergeExodus, S.wiki37, S.linkedin37],
    },
    {
      id: "claim-bootstrapped",
      kind: "fact",
      text: "37signals has been profitable essentially from the start — a 2005 profile already describes it as 'profitable since the beginning' — and has never taken venture capital; the 2006 Bezos stake is the only outside investment on record.",
      sourceIds: [S.speakUp, S.svnBezos, S.svnWorth],
    },
    // -- stated beliefs --------------------------------------------------------
    {
      id: "claim-no-exit",
      kind: "stated_belief",
      text: "The founders' core creed: 'we have no intention of selling 37signals or going public' — options replaced with a sale/IPO bonus pool because 'the two scenarios where options/equity really make sense' aren't planned. Fried's later phrasing: an 'exist strategy,' not an exit strategy.",
      sourceIds: [S.svnEquity, S.svnWorth, S.reworkFlop],
    },
    {
      id: "claim-anti-vc",
      kind: "stated_belief",
      text: "Venture capital is 'not free money': the company says it has been approached by nearly 100 investors and declined all but Bezos, whom they chose for wisdom, not cash — 'We don't need their money to run the business.'",
      sourceIds: [S.svnWorth, S.svnBezos],
    },
    {
      id: "claim-calm-company",
      kind: "stated_belief",
      text: "'It doesn't have to be crazy at work': 40 hours is plenty, growth is not the point, and calm is a competitive advantage — the thesis of the 2018 book and a posture the company attributes to decades of profitability.",
      sourceIds: [S.harperCollins, S.svnSell, S.tedFried],
    },
    {
      id: "claim-post-saas",
      kind: "stated_belief",
      text: "SaaS has run its course for finished software: 'In the early 2000s, we were among the early pioneers leading the industry into the SaaS revolution. Now, 20 years later, we intend to help lead the way out.' ONCE is the bet that buyers would rather own software than rent it.",
      sourceIds: [S.optoDhh, S.onceSite, S.heyDhhOnce],
    },
    {
      id: "claim-less-is-more",
      kind: "stated_belief",
      text: "Small, opinionated, and profitable beats big and funded: the 1999 manifesto's 'less is more' posture ran straight through Getting Real ('the smarter, faster, easier way') to the $299 pitch that 'dead-simple chat' shouldn't cost thousands a month.",
      sourceIds: [S.manifesto, S.gettingReal, S.heyDhhOnce],
    },
    {
      id: "claim-lead-with-ideas",
      kind: "stated_belief",
      text: "'We've always tried to lead with ideas, take principled stands, and remain allergic to conformity and corporate sterility' — Fried's explanation of the 2022 re-rename, and an accurate description of the company's publishing-as-marketing engine.",
      sourceIds: [S.heyJasonRename, S.svnSell],
    },
    // -- patterns ---------------------------------------------------------------
    {
      id: "claim-pattern-own-itch",
      kind: "pattern",
      text: "Products come from scratching their own itches: Basecamp grew out of managing client work, Backpack 'because we needed Backpack,' Know Your Company out of wanting employee feedback — the same logic they later sold as philosophy in Getting Real.",
      sourceIds: [S.svnBackpack, S.basecampAbout, S.svnKyc, S.gettingReal],
    },
    {
      id: "claim-pattern-portfolio-discipline",
      kind: "pattern",
      text: "The company repeatedly divests rather than accumulates: sold or spun off Know Your Company (to Claire Lew), Highrise (to Nathan Kontny), We Work Remotely, and Sortfolio; folded Campfire into Basecamp; closed Backpack to signups — then reversed the whole strategy in 2022 when two products weren't enough anymore.",
      sourceIds: [S.svnRename, S.svnKycDeal, S.svnHighrise, S.reworkSpinoff, S.heyJasonRename],
    },
    {
      id: "claim-pattern-public-fights",
      kind: "pattern",
      text: "Public fights double as distribution: the week-long Apple standoff made HEY a cause célèbre at launch, and the company curated the press coverage into its own 'Apple vs. HEY' page — a playbook of principle-as-marketing repeated across the antitrust, privacy, and SaaS debates.",
      sourceIds: [S.vergeAppleReject, S.heyApple, S.svnApple, S.vergeHeyLaunch],
    },
    {
      id: "claim-pattern-self-narrated",
      kind: "pattern",
      text: "Much of the canonical record is self-narrated: the founding story, the Bezos deal terms, the departure dates of the early co-founders, and HEY's traction figures all originate in the founders' own posts and interviews rather than independent reporting.",
      sourceIds: [S.mixergy, S.mediumOrigin, S.mediumBezosDeal, S.tnwHey],
    },
    // -- speculation -------------------------------------------------------------
    {
      id: "claim-spec-bezos-stake",
      kind: "speculation",
      text: "Whether Bezos still holds the minority stake is unverifiable post-2017 (DHH's 'he still owns the stake' is the last public word); given the LLC structure and no exit provision being triggered, it plausibly persists — but no filing confirms it either way.",
      sourceIds: [S.mediumBezosDeal, S.svnBezos],
    },
    {
      id: "claim-spec-once-economics",
      kind: "speculation",
      text: "ONCE's economics remain unproven: its flagship went from $299 pay-once to free-and-MIT within about eighteen months, which reads either as conviction that distribution beats license revenue or as evidence the pay-once market is thin.",
      sourceIds: [S.heyDhhOnce, S.onceCampfire, S.githubCampfire],
    },
    {
      id: "claim-spec-exodus-cost",
      kind: "speculation",
      text: "The long-run cost of the April 2021 exodus — a third of the company, including the head of strategy and heads of design, marketing, and support — is unmeasurable from outside; the company calls it a principled stand, ex-employees call it an implosion, and product velocity since is the only observable proxy.",
      sourceIds: [S.vergeAllHands, S.vergeExodus, S.heyJasonUpdate],
    },
  ],
  timeline: [
    {
      id: "event-founded",
      kind: "founded",
      date: "1999",
      title: "37signals founded as a Chicago web design firm",
      summary:
        "Jason Fried, Carlos Segura, and Ernest Kim; named by Segura after SETI's 37 unexplained signals.",
      location: "Chicago, Illinois",
      sourceIds: [S.wiki37, S.mixergy, S.manifesto],
    },
    {
      id: "event-dhh-email",
      kind: "other",
      date: "2001-10-27",
      title: "DHH's first email to Fried",
      summary:
        "The Copenhagen programmer answers Fried's regex question on Signal vs. Noise; the pair begin building Singlefile, their first SaaS product together.",
      sourceIds: [S.heyDhhEmail],
    },
    {
      id: "event-basecamp-launch",
      kind: "project",
      date: "2004-02-04",
      title: "Basecamp launched",
      summary:
        "Project management as a service: free for one project, $9–$59/month tiers, announced with a blog post and no PR. Within a year it out-earned the client work.",
      sourceIds: [S.svnBasecampLaunches, S.svnFiveYears, S.basecampAbout],
    },
    {
      id: "event-rails-release",
      kind: "project",
      date: "2004-07-24",
      title: "Ruby on Rails released publicly",
      summary:
        "DHH extracted the framework he wrote for Basecamp and open-sourced it — 'the end of vaporware.'",
      sourceIds: [S.svnRails, S.rubytalkRails],
    },
    {
      id: "event-product-pivot",
      kind: "milestone",
      date: "2004",
      title: "Web design ends; products only",
      summary:
        "Basecamp revenue passed the client business roughly a year after launch; 37signals became a software company.",
      sourceIds: [S.basecampAbout],
    },
    {
      id: "event-tada-backpack",
      kind: "project",
      date: "2005",
      title: "Ta-da List and Backpack launch",
      summary:
        "The suite grows: Ta-da List (the second product) and Backpack (the third, first with an API) join Basecamp.",
      sourceIds: [S.svnBackpack, S.reworkName],
    },
    {
      id: "event-dhh-joins",
      kind: "role",
      date: "2005",
      title: "DHH formally joins 37signals",
      summary:
        "'David Heinemeier Hansson is now a signal' — the Basecamp/Rails author becomes a partner and CTO; he moves to Chicago that November.",
      sourceIds: [S.svnDhhSignal, S.wikiDhh],
    },
    {
      id: "event-campfire",
      kind: "project",
      date: "2006",
      title: "Campfire launched",
      summary: "The original web-based group chat SaaS — later folded into Basecamp, and resurrected in 2024 as ONCE #1.",
      sourceIds: [S.reworkName, S.heyDhhOnce],
    },
    {
      id: "event-bezos",
      kind: "funding",
      date: "2006-07-19",
      title: "Bezos Expeditions takes a minority stake",
      summary:
        "Jeff Bezos's personal investment company buys a minority, no-control stake in the LLC — the only outside money the company has ever taken, size undisclosed.",
      sourceIds: [S.svnBezos, S.wiredBezos, S.tcBezos, S.bloombergBezos],
    },
    {
      id: "event-getting-real",
      kind: "publication",
      date: "2006",
      title: "Getting Real published",
      summary: "The self-published book on building web apps with less; later distributed free online.",
      sourceIds: [S.gettingReal],
    },
    {
      id: "event-highrise",
      kind: "project",
      date: "2007",
      title: "Highrise launched",
      summary: "The CRM 'no busy work' contact manager — the suite's fourth major product.",
      sourceIds: [S.reworkName, S.wiki37],
    },
    {
      id: "event-basecamp-five",
      kind: "milestone",
      date: "2009-02-04",
      title: "Basecamp turns five",
      summary: "Five years, one price change, and a still-growing subscriber base.",
      sourceIds: [S.svnFiveYears],
    },
    {
      id: "event-rework",
      kind: "publication",
      date: "2010-03",
      title: "Rework published",
      summary: "The Fried/Hansson business bestseller — the company's philosophy canonized.",
      sourceIds: [S.appleBooksRemote, S.wiki37],
    },
    {
      id: "event-ted",
      kind: "media",
      date: "2010-10",
      title: "Fried's TEDx talk: 'Why work doesn't happen at work'",
      sourceIds: [S.tedFried],
    },
    {
      id: "event-basecamp-next",
      kind: "project",
      date: "2012-02-21",
      title: "New Basecamp takes the name; original becomes Basecamp Classic",
      summary:
        "The rebuilt product inherits the name after the founders consulted Jeff Bezos on the call.",
      sourceIds: [S.svnNext],
    },
    {
      id: "event-kyc-launch",
      kind: "project",
      date: "2013-06",
      title: "Know Your Company launched",
      summary: "An internal tool for CEOs to learn what's on employees' minds — built by a team of three.",
      sourceIds: [S.svnKycDeal],
    },
    {
      id: "event-remote-book",
      kind: "publication",
      date: "2013-10",
      title: "Remote: Office Not Required published",
      sourceIds: [S.appleBooksRemote],
    },
    {
      id: "event-kyc-spinoff",
      kind: "other",
      date: "2014-01",
      title: "Know Your Company spun off to Claire Lew",
      summary:
        "The product becomes its own company — 50/50 with Lew until $1M in new sales, then 75/25 hers in perpetuity.",
      sourceIds: [S.svnKyc, S.svnKycDeal],
    },
    {
      id: "event-rename-basecamp",
      kind: "milestone",
      date: "2014-02-05",
      title: "Company renamed to Basecamp; single-product strategy",
      summary:
        "On Basecamp's tenth birthday the whole company takes the product's name; other products are to be sold, spun off, or wound down.",
      sourceIds: [S.svnRename, S.reworkName],
    },
    {
      id: "event-highrise-spinoff",
      kind: "other",
      date: "2014-08",
      title: "Highrise spun off under CEO Nathan Kontny",
      summary: "A Basecamp subsidiary run on its own customer revenue; new signups ended in 2018.",
      sourceIds: [S.svnHighrise, S.wiki37],
    },
    {
      id: "event-crazy-at-work",
      kind: "publication",
      date: "2018-10-02",
      title: "It Doesn't Have to Be Crazy at Work published",
      sourceIds: [S.harperCollins],
    },
    {
      id: "event-shape-up",
      kind: "publication",
      date: "2019",
      title: "Shape Up published free online",
      summary: "Ryan Singer's methodology book — the company's 'how we build' codified.",
      sourceIds: [S.shapeUp],
    },
    {
      id: "event-hey-launch",
      kind: "project",
      date: "2020-06-15",
      title: "HEY launched",
      summary:
        "The $99/year email service — two years of work by ~56 people — opens to a 50,000+ waitlist.",
      sourceIds: [S.vergeHeyLaunch, S.heySite],
    },
    {
      id: "event-apple-rejection",
      kind: "milestone",
      date: "2020-06-16",
      title: "Apple rejects HEY update, demands 30%",
      summary:
        "A week-long public standoff with App Review lands on the eve of WWDC and the EU's App Store investigation.",
      sourceIds: [S.vergeAppleReject, S.heyApple],
    },
    {
      id: "event-apple-resolution",
      kind: "milestone",
      date: "2020-06-22",
      title: "Apple approves HEY update without IAP",
      summary: "The compromise: a free temporary-address tier gives non-paying users functionality.",
      sourceIds: [S.tcAppleApprove],
    },
    {
      id: "event-politics-ban",
      kind: "milestone",
      date: "2021-04-26",
      title: "'Changes at Basecamp' bans societal/political talk",
      summary:
        "Fried's post ends internal committees, 'paternalistic benefits,' and political discussion on the company account — following a similar move at Coinbase the year before.",
      sourceIds: [S.heyJasonChanges, S.vergeControversy],
    },
    {
      id: "event-exodus",
      kind: "milestone",
      date: "2021-04-30",
      title: "Roughly a third of the company resigns",
      summary:
        "~18–20 of 57 employees take the offered severance; Ryan Singer is suspended and later departs.",
      sourceIds: [S.vergeExodus, S.vergeAllHands, S.nytExodus],
    },
    {
      id: "event-apology",
      kind: "media",
      date: "2021-05-04",
      title: "Fried's 'An Update' apology",
      summary: "'Last week was terrible… we completely own the consequences.' The policies stand.",
      sourceIds: [S.heyJasonUpdate, S.vergeApology],
    },
    {
      id: "event-rename-back",
      kind: "milestone",
      date: "2022-05-03",
      title: "Renamed back to 37signals",
      summary: "Two products — Basecamp and HEY — end the single-product era; the manifesto-style 37signals.com relaunches.",
      sourceIds: [S.heyJasonRename, S.dfRenameBack],
    },
    {
      id: "event-once",
      kind: "project",
      date: "2023",
      title: "ONCE product line announced",
      summary: "The 'post–SaaS era' bet: pay-once, self-hosted software with source access.",
      sourceIds: [S.onceSite, S.optoDhh],
    },
    {
      id: "event-once-campfire",
      kind: "project",
      date: "2024-01-19",
      title: "Campfire returns as ONCE #1 at $299",
      sourceIds: [S.heyDhhOnce],
    },
    {
      id: "event-campfire-mit",
      kind: "milestone",
      date: "2025-08",
      title: "Campfire goes free and MIT-licensed",
      summary: "The once-campfire repo goes public under MIT; the product page now calls it 'entirely free and open source.'",
      sourceIds: [S.githubCampfire, S.onceCampfire],
    },
  ],
  themes: [
    {
      id: "theme-calm-company",
      kind: "philosophy",
      status: "stated",
      title: "The calm company",
      summary:
        "Long hours are 'a mark of stupidity,' meetings and managers are the interruption engine, and 40 hours is plenty — from Fried's 2010 TEDx talk through the 2018 book, the company sells calm as both culture and competitive edge.",
      sourceIds: [S.harperCollins, S.tedFried, S.svnSell],
    },
    {
      id: "theme-independence",
      kind: "belief",
      status: "stated",
      title: "Independence over exits",
      summary:
        "No venture capital, no board, no intention to sell or go public; the one accepted check (Bezos, 2006) was deliberately structured as a no-control LLC stake. 'We have an exist strategy, not an exit strategy.'",
      sourceIds: [S.svnWorth, S.svnEquity, S.svnBezos, S.mediumBezosDeal],
    },
    {
      id: "theme-less-is-more",
      kind: "method",
      status: "stated",
      title: "Less is more",
      summary:
        "The 1999 manifesto's posture became a product doctrine: fewer features, fewer people, flat pricing — 'dead-simple chat' at $299 once, not 'hundreds if not thousands of dollars a month.'",
      sourceIds: [S.manifesto, S.gettingReal, S.heyDhhOnce],
    },
    {
      id: "theme-lead-with-ideas",
      kind: "practice",
      status: "stated",
      title: "Lead with ideas, publish everything",
      summary:
        "Signal vs. Noise ran for two decades; four books, a podcast, and HEY World turned the founders' opinions into the company's marketing engine — 'we've always tried to lead with ideas, take principled stands.'",
      sourceIds: [S.heyJasonRename, S.svnSell, S.reworkFlop, S.gettingReal],
    },
    {
      id: "theme-remote-work",
      kind: "practice",
      status: "stated",
      title: "Remote as the default",
      summary:
        "The company wrote the remote-work book (Remote, 2013) after building a distributed team spanning Copenhagen to Chicago — itself the product of an emailed answer to a blog post.",
      sourceIds: [S.appleBooksRemote, S.heyDhhEmail, S.dhhSite],
    },
    {
      id: "theme-open-source",
      kind: "practice",
      status: "reported",
      title: "Extract and give away the infrastructure",
      summary:
        "Rails — extracted from Basecamp and released in 2004 — remains the company's largest single influence on the industry; the pattern repeated in 2025 with Campfire's MIT-licensed release.",
      sourceIds: [S.svnRails, S.railsSite, S.githubRails, S.githubCampfire],
    },
    {
      id: "theme-portfolio-discipline",
      kind: "method",
      status: "reported",
      title: "Sell it, spin it off, or shut it down",
      summary:
        "A consistent divestment playbook — Know Your Company, Highrise, We Work Remotely, Sortfolio — kept the org small and each product someone else's problem, until the 2022 reversal made it a multi-product company again.",
      sourceIds: [S.svnRename, S.svnKycDeal, S.svnHighrise, S.reworkSpinoff],
    },
    {
      id: "theme-post-saas",
      kind: "belief",
      status: "stated",
      title: "The post-SaaS era",
      summary:
        "The newest canon: subscriptions for finished software are rent extraction; customers should be able to buy once, self-host, and read the source — ONCE is the product line built to prove it.",
      sourceIds: [S.onceSite, S.optoDhh, S.heyDhhOnce],
    },
  ],
  works: [
    {
      id: "work-basecamp",
      kind: "product",
      status: "ongoing",
      title: "Basecamp",
      date: "2004",
      summary:
        "The flagship: project management and team communication SaaS, launched February 4, 2004. Rebuilt wholesale in 2012 ('Basecamp Classic' was spun off the name) and iterated since; still the business's core.",
      sourceIds: [S.svnBasecampLaunches, S.svnNext, S.basecampAbout],
    },
    {
      id: "work-rails",
      kind: "product",
      status: "ongoing",
      title: "Ruby on Rails",
      date: "2004",
      summary:
        "The open-source web framework DHH extracted from Basecamp in July 2004 — the company's deepest mark on the industry; maintained today by a wider core team and community.",
      sourceIds: [S.svnRails, S.rubytalkRails, S.githubRails],
    },
    {
      id: "work-hey",
      kind: "product",
      status: "ongoing",
      title: "HEY",
      date: "2020",
      summary:
        "The $99/year email service launched June 15, 2020 — opinionated inbox screening, no IMAP/POP, six native clients. HEY Calendar and HEY World (the blogging feature the founders now publish on) followed.",
      sourceIds: [S.vergeHeyLaunch, S.heySite, S.tnwHey],
    },
    {
      id: "work-once",
      kind: "product",
      status: "in_progress",
      title: "ONCE",
      date: "2023",
      summary:
        "The product line of pay-once, self-hosted software — 'a brand, not a product' per Fried — announced late 2023. Campfire is its first and so far only release.",
      sourceIds: [S.onceSite, S.optoDhh],
    },
    {
      id: "work-campfire-once",
      kind: "product",
      status: "released",
      title: "Campfire (ONCE #1)",
      date: "2024",
      summary:
        "The 2006 chat product reborn as installable software — announced January 19, 2024 at $299 once, later made free and MIT-licensed.",
      sourceIds: [S.heyDhhOnce, S.onceCampfire, S.githubCampfire],
    },
    {
      id: "work-tada",
      kind: "product",
      status: "ongoing",
      title: "Ta-da List",
      date: "2005",
      summary: "The company's second product — a dead-simple shared to-do list that still runs at tadalist.com.",
      sourceIds: [S.svnBackpack],
    },
    {
      id: "work-backpack",
      kind: "product",
      status: "abandoned",
      title: "Backpack",
      date: "2005",
      summary:
        "The third product — personal organizer with pages, notes, and reminders; the first 37signals product with an API. Closed to new signups in the 2014 single-product shift and wound down.",
      sourceIds: [S.svnBackpack, S.reworkName, S.svnRename],
    },
    {
      id: "work-campfire-saas",
      kind: "product",
      status: "completed",
      title: "Campfire (SaaS era)",
      date: "2006",
      summary:
        "The original group-chat service — absorbed into Basecamp's chat features during the single-product years; the name and idea returned with ONCE.",
      sourceIds: [S.reworkName, S.heyDhhOnce],
    },
    {
      id: "work-highrise",
      kind: "product",
      status: "released",
      title: "Highrise",
      date: "2007",
      summary:
        "The 'no busy work' contact manager; spun off in 2014 as a subsidiary under CEO Nathan Kontny, stopped new signups in 2018.",
      sourceIds: [S.reworkName, S.svnHighrise, S.wiki37],
    },
    {
      id: "work-kyc",
      kind: "project",
      status: "completed",
      title: "Know Your Company",
      date: "2013",
      summary:
        "The internal employee-feedback product that became the model spin-off: launched June 2013, spun off January 2014 under CEO Claire Lew on a sliding-ownership deal.",
      sourceIds: [S.svnKyc, S.svnKycDeal],
    },
    {
      id: "work-wwr",
      kind: "project",
      status: "completed",
      title: "We Work Remotely",
      summary:
        "The remote-jobs board built inside the company — 'spun off and sold' per the founders' REWORK account; it operates today under other owners.",
      sourceIds: [S.reworkSpinoff],
    },
    {
      id: "work-getting-real",
      kind: "book",
      status: "published",
      title: "Getting Real",
      date: "2006",
      summary: "The self-published build-less manifesto; still free on the company's site.",
      sourceIds: [S.gettingReal],
    },
    {
      id: "work-rework",
      kind: "book",
      status: "published",
      title: "Rework",
      date: "2010",
      summary: "Fried & Hansson's business bestseller — meetings are toxic, ASAP is poison, stay small.",
      sourceIds: [S.appleBooksRemote, S.wiki37],
    },
    {
      id: "work-remote",
      kind: "book",
      status: "published",
      title: "Remote: Office Not Required",
      date: "2013",
      sourceIds: [S.appleBooksRemote],
    },
    {
      id: "work-crazy",
      kind: "book",
      status: "published",
      title: "It Doesn't Have to Be Crazy at Work",
      date: "2018-10-02",
      summary: "The 'calm company' manifesto, published by HarperOne.",
      sourceIds: [S.harperCollins],
    },
    {
      id: "work-shape-up",
      kind: "book",
      status: "published",
      title: "Shape Up",
      date: "2019",
      summary:
        "Ryan Singer's account of the company's product process — free online; authored while he was head of strategy.",
      sourceIds: [S.shapeUp],
    },
    {
      id: "work-svn",
      kind: "other",
      status: "ongoing",
      title: "Signal vs. Noise",
      date: "1999",
      summary:
        "The company blog since the beginning — the marketing channel, the opinion organ, and much of this packet's primary record; older posts survive across several archive layouts.",
      sourceIds: [S.svnBasecampLaunches, S.svnWorth],
    },
    {
      id: "work-rework-podcast",
      kind: "other",
      status: "ongoing",
      title: "REWORK podcast",
      summary:
        "The company's interview show about 'the better way to work,' hosted with the founders — including the retrospective episodes this packet leans on.",
      sourceIds: [S.reworkName, S.reworkSpinoff, S.reworkFlop],
    },
  ],
  appearances: [
    {
      id: "appearance-ted",
      title: "Why work doesn't happen at work",
      venue: "TEDxMidwest",
      publishedAt: "2010-10",
      participants: ["Jason Fried"],
      summary:
        "Fried's TEDx talk — the calm-company argument about M&Ms (meetings and managers) as the interruption engine.",
      media: [
        {
          type: "video",
          url: "https://www.ted.com/talks/jason_fried_why_work_doesn_t_happen_at_work",
          sourceId: S.tedFried,
        },
      ],
      sourceIds: [S.tedFried],
    },
    {
      id: "appearance-mixergy",
      title: "The Biography of 37signals — with Jason Fried",
      venue: "Mixergy",
      participants: ["Jason Fried", "Andrew Warner"],
      summary:
        "The fullest recorded account of the founding trio, the SETI name, and the early departures.",
      media: [
        {
          type: "article",
          url: "https://mixergy.com/interviews/37signals-jason-fried/",
          sourceId: S.mixergy,
        },
      ],
      sourceIds: [S.mixergy],
    },
    {
      id: "appearance-rework-name",
      title: "What's in a Name — REWORK",
      venue: "REWORK (37signals)",
      participants: ["Jason Fried", "David Heinemeier Hansson", "Kimberly Rhodes"],
      summary:
        "The founders narrate both renames and the product-suite launch order on their own podcast.",
      media: [
        {
          type: "audio",
          url: "https://37signals.com/podcast/whats-in-a-name/",
          sourceId: S.reworkName,
        },
      ],
      sourceIds: [S.reworkName],
    },
    {
      id: "appearance-opto",
      title: "DHH on the end of the subscription era",
      venue: "Opto Sessions (CMC Markets)",
      publishedAt: "2023-11",
      participants: ["David Heinemeier Hansson"],
      summary:
        "The ONCE thesis in interview form — 'we're over-SaaSed,' the pay-once manifesto explained.",
      media: [
        {
          type: "article",
          url: "https://www.cmcmarkets.com/en/optox/were-over-saased-37signals-david-heinemeier-hansson-on-the-end-of-the-subscription-er",
          sourceId: S.optoDhh,
        },
      ],
      sourceIds: [S.optoDhh],
    },
  ],
  relations: [
    {
      id: "rel-jason-fried",
      kind: "founded_by",
      target: "jason-fried",
      targetName: "Jason Fried",
      targetKind: "person",
      targetWikidataId: "Q23795888",
      note: "Co-founder, CEO, and co-owner; the only founder still at the company.",
      sourceIds: [S.wiki37, S.mixergy, S.basecampAbout],
    },
    {
      id: "rel-carlos-segura",
      kind: "founded_by",
      target: "carlos-segura",
      targetName: "Carlos Segura",
      targetKind: "person",
      note: "Co-founder; named the company after SETI's 37 unexplained signals; left about a year in (~2000).",
      sourceIds: [S.mixergy, S.speakUp],
    },
    {
      id: "rel-ernest-kim",
      kind: "founded_by",
      target: "ernest-kim",
      targetName: "Ernest Kim",
      targetKind: "person",
      note: "Co-founder; left around 2002–2003 per Fried's recollection and a 2005 AIGA writeup.",
      sourceIds: [S.mixergy, S.speakUp, S.wiki37],
    },
    {
      id: "rel-dhh",
      kind: "member",
      target: "david-heinemeier-hansson",
      targetName: "David Heinemeier Hansson",
      targetKind: "person",
      targetWikidataId: "Q719413",
      start: "2001",
      note: "Joined via an October 27, 2001 email; formally 'a signal' in 2005; partner, CTO, and co-owner — the company now calls him co-founder though he was not a founder of the 1999 firm.",
      sourceIds: [S.heyDhhEmail, S.svnDhhSignal, S.dhhSite, S.wikiDhh],
    },
    {
      id: "rel-bezos",
      kind: "funded_by",
      target: "jeff-bezos",
      targetName: "Jeff Bezos (via Bezos Expeditions)",
      targetKind: "person",
      targetWikidataId: "Q312556",
      start: "2006-07",
      note: "Minority, no-control stake in the LLC through his personal investment company — the only outside money ever taken; still held as of DHH's 2017 account, repaid ~5x via profit distributions.",
      sourceIds: [S.svnBezos, S.mediumBezosDeal, S.wiredBezos],
    },
    {
      id: "rel-ryan-singer",
      kind: "employed",
      target: "ryan-singer",
      targetName: "Ryan Singer",
      targetKind: "person",
      start: "2003",
      end: "2021",
      note: "Head of strategy for ~18 years and author of Shape Up; suspended after the April 2021 all-hands and departed in the exodus.",
      sourceIds: [S.vergeAllHands, S.shapeUp],
    },
    {
      id: "rel-jonas-downey",
      kind: "employed",
      target: "jonas-downey",
      targetName: "Jonas Downey",
      targetKind: "person",
      end: "2021-04",
      note: "Head of design; among the senior staff who took the April 2021 buyouts.",
      sourceIds: [S.vergeExodus],
    },
    {
      id: "rel-kristin-aardsma",
      kind: "employed",
      target: "kristin-aardsma",
      targetName: "Kristin Aardsma",
      targetKind: "person",
      end: "2021-04",
      note: "Head of customer support; among those who announced departures during the 2021 crisis.",
      sourceIds: [S.vergeExodus],
    },
    {
      id: "rel-andy-didorosi",
      kind: "employed",
      target: "andy-didorosi",
      targetName: "Andy Didorosi",
      targetKind: "person",
      end: "2021-04",
      note: "Head of marketing; among those who announced departures during the 2021 crisis.",
      sourceIds: [S.vergeExodus],
    },
    {
      id: "rel-nathan-kontny",
      kind: "employed",
      target: "nathan-kontny",
      targetName: "Nathan Kontny",
      targetKind: "person",
      start: "2014",
      note: "CEO of Highrise after it was spun off as a Basecamp subsidiary — employed by the subsidiary, not the parent.",
      sourceIds: [S.svnHighrise],
    },
    {
      id: "rel-claire-lew",
      kind: "other",
      target: "claire-lew",
      targetName: "Claire Lew",
      targetKind: "person",
      note: "CEO of spun-off Know Your Company from January 2014, on a 50/50 deal flipping to 75/25 in her favor after $1M in new sales.",
      sourceIds: [S.svnKyc, S.svnKycDeal],
    },
    {
      id: "rel-casey-newton",
      kind: "interviewed_by",
      target: "casey-newton",
      targetName: "Casey Newton",
      targetKind: "person",
      note: "The Verge editor who interviewed Fried for the HEY launch and broke most of the 2021 implosion reporting.",
      sourceIds: [S.vergeHeyLaunch, S.vergeAllHands],
    },
    {
      id: "rel-andrew-warner",
      kind: "interviewed_by",
      target: "andrew-warner",
      targetName: "Andrew Warner",
      targetKind: "person",
      note: "Mixergy host of the definitive recorded founding interview with Fried.",
      sourceIds: [S.mixergy],
    },
    {
      id: "rel-coinbase",
      kind: "influenced_by",
      target: "coinbase",
      targetName: "Coinbase",
      targetKind: "organization",
      note: "The April 2021 ban on societal/political discussion 'follows a similar move from cryptocurrency company Coinbase last year,' per The Verge.",
      sourceIds: [S.vergeControversy],
    },
    {
      id: "rel-rails",
      kind: "founded",
      target: "ruby-on-rails",
      targetName: "Ruby on Rails",
      targetKind: "organization",
      targetWikidataId: "Q190478",
      note: "The open-source framework created by DHH inside the company for Basecamp and released July 2004 — the project's community long outgrew its origin org.",
      sourceIds: [S.svnRails, S.rubytalkRails, S.railsSite],
    },
    {
      id: "rel-highrise",
      kind: "other",
      target: "highrise",
      targetName: "Highrise",
      targetKind: "organization",
      note: "Product launched 2007, spun off as a subsidiary with its own CEO in 2014, closed to new signups 2018 — the spin-off playbook's second act.",
      sourceIds: [S.svnHighrise, S.wiki37],
    },
    {
      id: "rel-know-your-company",
      kind: "other",
      target: "know-your-company",
      targetName: "Know Your Company",
      targetKind: "organization",
      note: "Internal product (June 2013) spun off as an independent company in January 2014 under CEO Claire Lew.",
      sourceIds: [S.svnKyc, S.svnKycDeal],
    },
    {
      id: "rel-we-work-remotely",
      kind: "other",
      target: "we-work-remotely",
      targetName: "We Work Remotely",
      targetKind: "organization",
      note: "The remote-jobs board built inside the company — 'spun off and sold' per the founders' own account.",
      sourceIds: [S.reworkSpinoff],
    },
  ],
  openQuestions: [
    "The exact departure dates of co-founders Carlos Segura (~2000) and Ernest Kim (~2002–2003) rest on Fried's fuzzy recollection and one 2005 AIGA writeup; no primary record pins them.",
    "Whether Jeff Bezos still holds the minority stake is unknown post-2017; DHH's 'he still owns the stake' is the last public word, and the LLC structure means no filings surface it.",
    "Current headcount is murky: ~57 in April 2021 per The Verge, 34 (2021) per Wikipedia's post-exodus infobox, and LinkedIn's self-reported 51–200 band — no authoritative figure exists.",
    "Revenue and profit figures have never been audited; 'profitable since the beginning' is the company's own claim, repeated across two decades of posts.",
    "DHH's formal status timeline is fuzzy: contractor (2001), 'a signal' (2005), partner/CTO/co-owner (present) — the company calls him co-founder today but he was not a founder of the 1999 firm; the exact moment he took equity is not public.",
    "The long-run product cost of the April 2021 exodus — a third of staff including the heads of design, marketing, support, and strategy — is unmeasurable from public sources.",
    "Ryan Singer's post-suspension outcome was never officially detailed; his departure is inferred from reporting and his absence since.",
    "ONCE's trajectory is unresolved: announced as a multi-product line in late 2023, it has shipped exactly one product, and that product went from $299 to free-and-MIT within about eighteen months.",
    "Whether any ONCE product beyond Campfire will ship, and whether the 'post-SaaS era' thesis is a business or a position paper, remains open.",
    "The fate of Backpack, Writeboard, and other sunset products' user data and uptime is not documented beyond the 2014 wind-down announcements.",
  ],
  body: `37signals is the Chicago software company that turned staying small into an ideology. Founded in 1999 as a web design firm, it became the rare business whose influence — through Ruby on Rails, four books, and two decades of blogging — vastly exceeds its headcount, and whose founders turned every principled stand (anti-VC, anti-hustle, anti-App-Store, anti-SaaS) into both doctrine and marketing.

## Origins

Jason Fried, Carlos Segura, and Ernest Kim founded the firm in 1999; Segura named it after a PBS Nova segment on SETI's 37 unexplained signals. Both of Fried's partners left early — Segura around 2000, Kim around 2002–03 — leaving Fried to run it alone until a Copenhagen programmer named David Heinemeier Hansson emailed him on October 27, 2001, answering a regular-expression question posted on the company blog. Their first joint product was a $19.95/year book-cataloging service called Singlefile. The second attempt — an internal tool to manage the firm's own client work — became Basecamp, launched February 4, 2004, with a blog post, no PR, and $9–$59/month pricing. Within about a year it out-earned the design business, and client work ended. DHH built it in a then-obscure language called Ruby; in July 2004 the framework underneath it was extracted and released as Ruby on Rails — "the end of vaporware" — which remains the company's deepest mark on the industry. DHH formally joined in 2005 as partner and CTO and is today co-owner; the company now calls him co-founder, though he was not a founder of the 1999 firm.

## The suite and the spin-offs

Through the decade the firm shipped a small empire of products — Ta-da List, Backpack, Campfire, Highrise, Writeboard, Sortfolio, the We Work Remotely job board — built by a team Fried recalls as roughly 20–30 people. The July 2006 arrival of outside money made headlines precisely because it was so out of character: Bezos Expeditions, Jeff Bezos's personal investment company, took a minority, no-control stake in the LLC — "the first financial boost that the company has accepted from an outside source," as Wired put it. Per DHH's 2017 account, the deal was structured as profit-sharing membership, repaid Bezos "five times over" in distributions, and was still held at that writing; whether it persists today is unverifiable. The relationship was advisory too — the founders consulted Bezos in December 2011 on whether the rebuilt Basecamp deserved the name.

On February 5, 2014 — Basecamp's tenth birthday — the company renamed itself Basecamp and committed to one product. What followed was a deliberate divestment playbook: Know Your Company was spun off to Claire Lew on a sliding 50/50→75/25 deal, Highrise became a subsidiary under CEO Nathan Kontny, We Work Remotely was sold, Backpack was closed to signups, and Campfire was folded into the flagship.

## Books, blogs, and the calm company

The company's second product was always its philosophy. Getting Real (2006, self-published), Rework (2010, a bestseller), Remote (2013), and It Doesn't Have to Be Crazy at Work (2018) — plus Ryan Singer's Shape Up (2019) and the long-running Signal vs. Noise and REWORK outlets — argue a consistent creed: small beats big, profit beats funding, 40 hours beats hustle, remote beats office, and an "exist strategy" beats an exit strategy. The company says it has declined nearly 100 investor approaches; it replaced stock options with a sale/IPO bonus pool precisely because it intends never to do either.

## HEY, Apple, and the implosion

HEY — the $99/year, no-data-mining email service — launched June 15, 2020 to a 50,000+ waitlist, built by a 56-person company. The next day Apple rejected a bug-fix update and demanded the standard cut; DHH called Apple's negotiators "gangsters," and a week of public warfare — landing on the eve of WWDC and the EU's App Store investigation — ended with Apple approving the app once it offered a free temporary-address tier. The company curated the whole saga into a press page of its own.

Then came April 26, 2021. Fried's "Changes at Basecamp" post banned societal and political discussion on the company account, dissolved committees, and ended "paternalistic benefits" — a policy The Verge revealed was rooted in an internal reckoning over a long-kept list of "funny" customer names. Hansson offered severance to anyone who disagreed; roughly a third of the ~57-person company took it, including the heads of design, marketing, and support. Strategy head Ryan Singer — nearly 18 years in — was suspended after the all-hands and later departed. Fried's May 4 apology ("Last week was terrible") owned the rollout, not the policy, which stood.

## Back to 37signals, and out of SaaS

On May 3, 2022, the company renamed itself back to 37signals — two products (Basecamp, HEY) meant the single-product name no longer fit. In late 2023 it announced ONCE, a product line of pay-once, self-hosted, source-available software pitched as "leading the way out" of the SaaS era it helped start. Its first product resurrected Campfire in January 2024 at $299; by 2025 the same product was free and MIT-licensed — a trajectory that either proves the conviction or questions the business model, depending on who reads it.

## What the record does not settle

The early co-founders' departure dates are approximations; Bezos's current stake status is unverifiable; headcount, revenue, and profit have never been audited; the cost of the 2021 exodus shows up only indirectly in what the company ships. And much of the canonical story — the origin email, the deal terms, the traction numbers — is narrated by the founders themselves, a self-written record this index marks as such.

*This index was compiled from public sources and does not imply the organization's endorsement. Citations live in the packet's source catalog.*`,
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
