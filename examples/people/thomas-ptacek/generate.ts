#!/usr/bin/env bun
/** Generate examples/people/thomas-ptacek/person-index.json with derived source ids. */

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

const sockpuppetMe = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Thomas H. Ptacek — bio",
  url: "https://sockpuppet.org/me/",
  publisher: "sockpuppet.org",
  notes:
    "The subject's own bio page ('Quarrelsome'), updated July 2021; claims here are self-reported.",
});
const hnProfile = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "tptacek — Hacker News profile",
  url: "https://news.ycombinator.com/user?id=tptacek",
  publisher: "Hacker News",
  notes: "The subject's own account page and comment stream.",
});
const hiringPost = source({
  binding: "first_person",
  mediaType: "article",
  title: "The Hiring Post",
  url: "https://sockpuppet.org/blog/2015/03/06/the-hiring-post/",
  publisher: "sockpuppet.org",
  publishedAt: "2015-03-06",
  authors: ["Thomas Ptacek"],
});
const foiaCourt = source({
  binding: "first_person",
  mediaType: "article",
  title: "I Went To SQL Injection Court",
  url: "https://sockpuppet.org/blog/2025/02/09/fixing-illinois-foia/",
  publisher: "sockpuppet.org",
  publishedAt: "2025-02-09",
  authors: ["Thomas Ptacek"],
});
const vrCooked = source({
  binding: "first_person",
  mediaType: "article",
  title: "Vulnerability Research Is Cooked",
  url: "https://sockpuppet.org/blog/2026/03/30/vulnerability-research-is-cooked/",
  publisher: "sockpuppet.org",
  publishedAt: "2026-03-30",
  authors: ["Thomas Ptacek"],
});
const youreAllNuts = source({
  binding: "first_person",
  mediaType: "article",
  title: "My AI Skeptic Friends Are All Nuts",
  url: "https://fly.io/blog/youre-all-nuts/",
  publisher: "The Fly Blog (Fly.io)",
  publishedAt: "2025-06-02",
  authors: ["Thomas Ptacek"],
});
const cryptoRightAnswers = source({
  binding: "first_person",
  mediaType: "article",
  title: "Cryptographic Right Answers",
  url: "https://www.latacora.com/blog/cryptographic-right-answers/",
  publisher: "Latacora",
  publishedAt: "2018",
  notes:
    "Canonical combined version; preserves Colin Percival's 2009 answers, Ptacek's 2015 answers, and Latacora's 2018 update.",
});
const stopEncryptedEmail = source({
  binding: "first_person",
  mediaType: "article",
  title: "Stop Using Encrypted Email",
  url: "https://www.latacora.com/blog/2020/02/19/stop-using-encrypted-email/",
  publisher: "Latacora",
  publishedAt: "2020-02-19",
  authors: ["Thomas Ptacek"],
});
const scw = source({
  binding: "first_person",
  mediaType: "audio",
  title: "Security Cryptography Whatever",
  url: "https://securitycryptographywhatever.com/",
  publisher: "Security Cryptography Whatever",
  publishedAt: "2021",
  notes:
    "Podcast co-hosted by Ptacek with Deirdre Connolly and David Adrian since 2021.",
});
const cryptopals = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "The Cryptopals Crypto Challenges",
  url: "https://cryptopals.com/",
  publisher: "Cryptopals",
  notes:
    "The challenges' own site; credits Ptacek, Sean Devlin, Alex Balducci, and Marcin Wielgoszewski, and notes NCC Group Cryptography Services maintenance from Set 8 on.",
});
const nccRns = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Acquisition of a leading US security testing business for £8.4m",
  url: "https://shareprices.com/rns/acquisition-400mfoosuif3ohh/",
  publisher: "NCC Group plc (RNS)",
  publishedAt: "2012-08-02",
});
const kalzumeus = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Announcing Starfighter",
  url: "https://www.kalzumeus.com/2015/03/09/announcing-starfighter/",
  publisher: "Kalzumeus Software",
  publishedAt: "2015-03-09",
  authors: ["Patrick McKenzie"],
  notes: "Starfighter co-founder's own announcement of the company.",
});
const kalzumeus2016 = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Kalzumeus Software Year In Review 2016",
  url: "https://www.kalzumeus.com/2016/12/30/kalzumeus-software-year-in-review-2016/",
  publisher: "Kalzumeus Software",
  publishedAt: "2016-12-30",
  authors: ["Patrick McKenzie"],
  notes:
    "Co-founder's account of Stockfighter's December 2015 release and Starfighter's 2016 wind-down.",
});
const blackhat = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Black Hat USA 2014 speaker bio: Thomas Ptacek",
  url: "https://blackhat.com/us-14/speakers/Thomas-Ptacek.html",
  publisher: "Black Hat",
  publishedAt: "2014",
  notes:
    "Conference speaker bio; independently confirms the 2005 cofounding trio and his talk history.",
});
const rainbowTables = source({
  binding: "archive",
  mediaType: "article",
  title:
    "Enough With The Rainbow Tables: What You Need To Know About Secure Password Schemes",
  url: "https://web.archive.org/web/20120114184424/chargen.matasano.com/chargen/2007/9/7/enough-with-the-rainbow-tables-what-you-need-to-know-about-s.html",
  publisher: "Matasano Security (Chargen blog), via the Wayback Machine",
  publishedAt: "2007-09-07",
  authors: ["Thomas Ptacek"],
  notes: "Original Chargen blog post preserved by the Internet Archive.",
});
const krebsPassword = source({
  binding: "interview",
  mediaType: "article",
  title: "How Companies Can Beef Up Password Security",
  url: "https://krebsonsecurity.com/2012/06/how-companies-can-beef-up-password-security/",
  publisher: "Krebs on Security",
  publishedAt: "2012-06-11",
  authors: ["Brian Krebs"],
});
const securityConv = source({
  binding: "interview",
  mediaType: "audio",
  title: "Thomas Ptacek, Founder, Latacora",
  url: "https://securityconversations.fireside.fm/tom-ptacek-latacora",
  publisher: "Security Conversations",
  publishedAt: "2018-04-23",
  notes:
    "Podcast interview on the security skills shortage, recruiting, and diversity in the industry.",
});
const securityweek = source({
  binding: "reporting",
  mediaType: "article",
  title: "Matasano Security Acquired by NCC Group for $13 Million",
  url: "https://www.securityweek.com/matasano-security-acquired-ncc-group-13-million/",
  publisher: "SecurityWeek",
  publishedAt: "2012-08-02",
});
const arsTruecrypt = source({
  binding: "reporting",
  mediaType: "article",
  title: "TrueCrypt security audit presses on, despite developers jumping ship",
  url: "https://arstechnica.com/information-technology/2014/05/truecrypt-security-audit-presses-on-despite-developers-jumping-ship/",
  publisher: "Ars Technica",
  publishedAt: "2014-05",
  authors: ["Dan Goodin"],
});
const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Thomas H. Ptacek (Q132860888)",
  url: "https://www.wikidata.org/wiki/Q132860888",
  publisher: "Wikidata",
  notes: "Sparse item: a handful of statements, no sitelinks; there is no Wikipedia article.",
});

const S = {
  sockpuppetMe: sockpuppetMe.id,
  hnProfile: hnProfile.id,
  hiringPost: hiringPost.id,
  foiaCourt: foiaCourt.id,
  vrCooked: vrCooked.id,
  youreAllNuts: youreAllNuts.id,
  cryptoRightAnswers: cryptoRightAnswers.id,
  stopEncryptedEmail: stopEncryptedEmail.id,
  scw: scw.id,
  cryptopals: cryptopals.id,
  nccRns: nccRns.id,
  kalzumeus: kalzumeus.id,
  kalzumeus2016: kalzumeus2016.id,
  blackhat: blackhat.id,
  rainbowTables: rainbowTables.id,
  krebsPassword: krebsPassword.id,
  securityConv: securityConv.id,
  securityweek: securityweek.id,
  arsTruecrypt: arsTruecrypt.id,
  wikidata: wikidata.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-thomas-ptacek",
  generatedAt: "2026-09-16T18:30:00Z",
  subject: {
    kind: "person",
    handle: "thomas-ptacek",
    displayName: "Thomas Ptacek",
    alsoKnownAs: ["Thomas H. Ptacek", "Tom Ptacek", "tqbf", "tptacek"],
    summary:
      "American security researcher and software developer who co-founded Matasano Security (acquired by NCC Group) and Latacora, created the crypto challenges that became Cryptopals and the Starfighter hiring game, and writes widely read essays on applied cryptography, technical hiring, and LLM-assisted programming.",
    identity: {
      wikidataId: "Q132860888",
      officialSite: "https://sockpuppet.org/me/",
      profiles: [
        "https://x.com/tqbf",
        "https://github.com/tqbf",
        "https://news.ycombinator.com/user?id=tptacek",
        "https://securitycryptographywhatever.com/",
      ],
    },
  },
  scope: {
    asOf: "2026-09-16T18:30:00Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    sockpuppetMe,
    hnProfile,
    hiringPost,
    foiaCourt,
    vrCooked,
    youreAllNuts,
    cryptoRightAnswers,
    stopEncryptedEmail,
    scw,
    cryptopals,
    nccRns,
    kalzumeus,
    kalzumeus2016,
    blackhat,
    rainbowTables,
    krebsPassword,
    securityConv,
    securityweek,
    arsTruecrypt,
    wikidata,
  ],
  claims: [
    {
      id: "claim-security-since-1995",
      kind: "fact",
      text: "Ptacek has worked in software security since 1995 and was a member of what he calls the industry's first commercial vulnerability research lab, at Secure Networks, where much of his work involved intrusion detection systems.",
      sourceIds: [S.sockpuppetMe],
    },
    {
      id: "claim-ids-paper",
      kind: "fact",
      text: "In 1998 he co-authored 'Insertion, Evasion, and Denial of Service: Eluding Network Intrusion Detection' with Timothy Newsham — the foundational paper on evading network intrusion detection — and later presented on IDS evasion at Black Hat.",
      sourceIds: [S.sockpuppetMe, S.blackhat],
    },
    {
      id: "claim-matasano-founded",
      kind: "fact",
      text: "He co-founded Matasano Security in 2005 with Dave Goldsmith and Jeremy Rauch.",
      sourceIds: [S.blackhat, S.sockpuppetMe, S.nccRns],
    },
    {
      id: "claim-matasano-business",
      kind: "fact",
      text: "Matasano sold penetration testing, reverse engineering, and source code review to blue-chip clients; at acquisition it employed 29 people, mostly testers, across New York, Chicago, and Mountain View.",
      sourceIds: [S.nccRns, S.securityweek],
    },
    {
      id: "claim-ncc-acquisition",
      kind: "fact",
      text: "NCC Group acquired Matasano Security on August 2, 2012, for a maximum consideration of £8.4 million (about $13 million) in cash.",
      sourceIds: [S.nccRns, S.securityweek],
    },
    {
      id: "claim-largest-firm",
      kind: "fact",
      text: "Ptacek describes Matasano as, prior to its acquisition, one of the largest software security firms in the US — a characterization he repeats in his own bio.",
      sourceIds: [S.sockpuppetMe],
    },
    {
      id: "claim-cryptopals",
      kind: "fact",
      text: "He created the Matasano Crypto Challenges — a set of exercises teaching attacks on real-world cryptography, run first as a hiring tool and published openly as the Cryptopals Crypto Challenges; his bio describes seven sets of eight challenges each.",
      sourceIds: [S.cryptopals, S.sockpuppetMe],
    },
    {
      id: "claim-cryptopals-maintained",
      kind: "fact",
      text: "Cryptopals is credited to Ptacek, Sean Devlin, Alex Balducci, and Marcin Wielgoszewski, and is now maintained and expanded by Devlin with the Cryptography Services team at NCC Group.",
      sourceIds: [S.cryptopals],
    },
    {
      id: "claim-microcorruption",
      kind: "fact",
      text: "He had a hand in Microcorruption, a hiring CTF built by Matasano with Square that teaches memory-corruption exploitation on an idealized MSP430.",
      sourceIds: [S.sockpuppetMe, S.kalzumeus],
    },
    {
      id: "claim-truecrypt",
      kind: "fact",
      text: "Ars Technica reported in May 2014 that Ptacek was technical lead for Phase II of the TrueCrypt security audit, working with researchers including Nate Lawson.",
      sourceIds: [S.arsTruecrypt],
    },
    {
      id: "claim-latacora",
      kind: "fact",
      text: "He co-founded Latacora with Erin Ptacek and Jeremy Rauch; the firm embeds ongoing security teams inside startups rather than selling point-in-time assessments.",
      sourceIds: [S.sockpuppetMe, S.securityConv],
    },
    {
      id: "claim-starfighter",
      kind: "fact",
      text: "He co-founded Starfighter with Patrick McKenzie and Erin Ptacek, announced March 9, 2015: a company publishing CTF games designed to develop and assess rare programming skills and place top players with hiring clients.",
      sourceIds: [S.kalzumeus],
    },
    {
      id: "claim-stockfighter",
      kind: "fact",
      text: "Starfighter shipped Stockfighter, its flagship programming game with trading and low-level tech trees, with a first public release in December 2015.",
      sourceIds: [S.kalzumeus2016],
    },
    {
      id: "claim-starfighter-end",
      kind: "fact",
      text: "Starfighter wound down in 2016: the game hit its technical goals, but the contingency-recruiting business did not start humming in time, per co-founder Patrick McKenzie's year-in-review.",
      sourceIds: [S.kalzumeus2016],
    },
    {
      id: "claim-flyio",
      kind: "fact",
      text: "He is a developer at Fly.io — the role his bio states as of its July 2021 update — where he writes engineering posts and works on platform internals.",
      sourceIds: [S.sockpuppetMe, S.youreAllNuts],
    },
    {
      id: "claim-blackhat-record",
      kind: "fact",
      text: "He has presented at Black Hat conferences on intrusion detection evasion, security flaws in data loss prevention products, detection of hardware virtualized rootkits, and cryptographic attacks on software crypto, and reviews for several security conferences.",
      sourceIds: [S.blackhat, S.sockpuppetMe],
    },
    {
      id: "claim-foia-witness",
      kind: "fact",
      text: "He served as an expert witness in a Cook County Chancery Court FOIA trial over whether Chicago could withhold the database schema for its CANVAS parking-ticket system on security grounds, and wrote the account up as 'I Went To SQL Injection Court' in February 2025.",
      sourceIds: [S.foiaCourt],
    },
    {
      id: "claim-scw",
      kind: "fact",
      text: "Since 2021 he has co-hosted the podcast Security Cryptography Whatever with Deirdre Connolly and David Adrian.",
      sourceIds: [S.scw],
    },
    {
      id: "claim-hn-karma",
      kind: "fact",
      text: "As tptacek he is among Hacker News's highest-karma commenters — his bio jokes that if he underwent mitosis the two resulting beings would be the site's two highest-karma users.",
      sourceIds: [S.sockpuppetMe, S.hnProfile],
    },
    {
      id: "claim-nobody-passwords",
      kind: "stated_belief",
      text: "Interviewed by Brian Krebs in 2012, he argued that essentially nobody gets password storage right because generalist developers are rarely security domain specialists.",
      sourceIds: [S.krebsPassword],
    },
    {
      id: "claim-slow-hashes",
      kind: "stated_belief",
      text: "He argues salts already defeat rainbow tables and that password storage needs deliberately slow password hashes — scrypt, bcrypt, or PBKDF2 as a fallback — not fast cryptographic hashes.",
      sourceIds: [S.rainbowTables, S.krebsPassword, S.cryptoRightAnswers],
    },
    {
      id: "claim-hiring-broken",
      kind: "stated_belief",
      text: "He argues the developer interview is broken: it selects for confidence and interviewing skill rather than job performance, systematically mispricing candidates, and that work samples beat interviews and resumes.",
      sourceIds: [S.hiringPost],
    },
    {
      id: "claim-stop-encrypted-email",
      kind: "stated_belief",
      text: "He argues people should stop using encrypted email as it is practiced — a long-running critique of PGP-style secure messaging.",
      sourceIds: [S.stopEncryptedEmail],
    },
    {
      id: "claim-right-answers",
      kind: "stated_belief",
      text: "He holds that developers should be given opinionated cryptographic defaults — NaCl/libsodium, AEAD constructions, vetted password KDFs — rather than menus of primitives to choose among.",
      sourceIds: [S.cryptoRightAnswers],
    },
    {
      id: "claim-llm-skeptics",
      kind: "stated_belief",
      text: "In 'My AI Skeptic Friends Are All Nuts' (June 2025) he argues that LLMs already do real software-engineering work, that the skeptical arguments he hears are unserious, and that engineers remain responsible for what they merge to main regardless of tooling.",
      sourceIds: [S.youreAllNuts],
    },
    {
      id: "claim-vr-cooked",
      kind: "stated_belief",
      text: "In 'Vulnerability Research Is Cooked' (March 2026) he argues that coding agents will drastically alter the practice and economics of exploit development — that security was protected partly by a scarcity of elite attention that no longer holds.",
      sourceIds: [S.vrCooked],
    },
    {
      id: "claim-pattern-games-hiring",
      kind: "pattern",
      text: "A recurring career pattern: he builds games to measure ability — the Matasano crypto challenges, Microcorruption, then Starfighter — each time turning an assessment instrument into something people play for fun.",
      sourceIds: [S.cryptopals, S.sockpuppetMe, S.kalzumeus, S.hiringPost],
    },
    {
      id: "claim-pattern-orthodoxy",
      kind: "pattern",
      text: "A recurring pattern of deflating security cargo cults: rainbow-table panic, encrypted email as practiced, and practitioners choosing their own crypto primitives.",
      sourceIds: [S.rainbowTables, S.stopEncryptedEmail, S.cryptoRightAnswers],
    },
    {
      id: "claim-pattern-translator",
      kind: "pattern",
      text: "He repeatedly translates specialist security knowledge for generalist audiences — explaining password cracking to reporters, SQL injection to a judge, and LLM agents to skeptical programmers.",
      sourceIds: [S.krebsPassword, S.foiaCourt, S.youreAllNuts],
    },
    {
      id: "claim-spec-flyio-date",
      kind: "speculation",
      text: "His exact Fly.io start date is not pinned in the cited record: his LinkedIn lists the role under joke titles from July 2020, and his bio confirms the role only as of July 2021.",
      sourceIds: [S.sockpuppetMe],
    },
    {
      id: "claim-spec-cryptopals-reach",
      kind: "speculation",
      text: "Cryptopals' influence — often described as the canonical learn-by-breaking cryptography course — is widely asserted but not quantified in the cited record.",
      sourceIds: [S.cryptopals],
    },
  ],
  timeline: [
    {
      id: "event-secure-networks",
      kind: "role",
      date: "1995",
      title: "Began working in software security at Secure Networks",
      summary:
        "Member of what he calls the industry's first commercial vulnerability research lab; worked on intrusion detection systems.",
      organization: "Secure Networks",
      organizationHandle: "secure-networks",
      sourceIds: [S.sockpuppetMe],
    },
    {
      id: "event-ids-paper",
      kind: "publication",
      date: "1998",
      title: "Ptacek–Newsham IDS evasion paper",
      summary:
        "Co-authored 'Insertion, Evasion, and Denial of Service: Eluding Network Intrusion Detection' with Timothy Newsham.",
      sourceIds: [S.sockpuppetMe, S.blackhat],
    },
    {
      id: "event-matasano",
      kind: "founded",
      date: "2005",
      title: "Co-founded Matasano Security",
      summary:
        "With Dave Goldsmith and Jeremy Rauch; application security testing, reverse engineering, and code review.",
      organization: "Matasano Security",
      organizationHandle: "matasano-security",
      sourceIds: [S.blackhat, S.nccRns, S.sockpuppetMe],
    },
    {
      id: "event-ncc-acquisition",
      kind: "milestone",
      date: "2012-08-02",
      title: "NCC Group acquired Matasano",
      summary:
        "Up to £8.4 million (~$13 million) in cash; Matasano continued as 'Matasano, an NCC Group company.'",
      organization: "NCC Group",
      organizationHandle: "ncc-group",
      sourceIds: [S.nccRns, S.securityweek],
    },
    {
      id: "event-cryptopals",
      kind: "project",
      date: "2013",
      title: "Matasano Crypto Challenges (Cryptopals)",
      summary:
        "Exercises teaching attacks on real-world cryptography, built as a hiring tool and later published openly at cryptopals.com.",
      sourceIds: [S.cryptopals, S.sockpuppetMe],
    },
    {
      id: "event-microcorruption",
      kind: "project",
      date: "2014",
      title: "Microcorruption",
      summary:
        "Embedded-security hiring CTF built by Matasano with Square: memory-corruption exploitation on an idealized MSP430.",
      sourceIds: [S.sockpuppetMe, S.kalzumeus],
    },
    {
      id: "event-truecrypt",
      kind: "project",
      date: "2014-05",
      title: "Technical lead, TrueCrypt audit Phase II",
      summary:
        "Reported by Ars Technica; the audit pressed on after the TrueCrypt developers abruptly jumped ship.",
      sourceIds: [S.arsTruecrypt],
    },
    {
      id: "event-hiring-post",
      kind: "publication",
      date: "2015-03-06",
      title: "'The Hiring Post'",
      summary:
        "His essay on why developer interviews misprice talent and how Matasano replaced them with work-sample hiring.",
      sourceIds: [S.hiringPost],
    },
    {
      id: "event-starfighter",
      kind: "founded",
      date: "2015-03-09",
      title: "Co-founded Starfighter",
      summary:
        "With Patrick McKenzie and Erin Ptacek: CTF games as a hiring market; shipped Stockfighter publicly in December 2015.",
      organization: "Starfighter",
      organizationHandle: "starfighter",
      sourceIds: [S.kalzumeus, S.kalzumeus2016],
    },
    {
      id: "event-starfighter-end",
      kind: "other",
      date: "2016",
      title: "Starfighter wound down",
      summary:
        "The game hit its technical goals but the contingency-recruiting business did not scale in time.",
      sourceIds: [S.kalzumeus2016],
    },
    {
      id: "event-latacora",
      kind: "founded",
      date: "2015",
      title: "Co-founded Latacora",
      summary:
        "With Erin Ptacek and Jeremy Rauch; embedded security teams for startups. The founding year is approximate in the cited record.",
      organization: "Latacora",
      organizationHandle: "latacora",
      sourceIds: [S.sockpuppetMe, S.securityConv],
    },
    {
      id: "event-flyio",
      kind: "role",
      date: "2020",
      title: "Joined Fly.io as a developer",
      summary:
        "Self-reported as of about 2020; his bio confirms the role by its July 2021 update. Works on platform internals and writes on the Fly blog.",
      organization: "Fly.io",
      organizationHandle: "fly-io",
      sourceIds: [S.sockpuppetMe, S.youreAllNuts],
    },
    {
      id: "event-nuts",
      kind: "publication",
      date: "2025-06-02",
      title: "'My AI Skeptic Friends Are All Nuts'",
      summary:
        "Fly blog essay arguing LLM-assisted programming is real and the skeptical arguments unserious; widely debated.",
      sourceIds: [S.youreAllNuts],
    },
    {
      id: "event-vr-cooked",
      kind: "publication",
      date: "2026-03-30",
      title: "'Vulnerability Research Is Cooked'",
      summary:
        "Argues coding agents will transform exploit development economics, citing Anthropic Frontier Red Team results.",
      sourceIds: [S.vrCooked],
    },
  ],
  themes: [
    {
      id: "theme-break-to-teach",
      kind: "method",
      status: "stated",
      title: "Teach security by breaking it",
      summary:
        "Real capability comes from working attacks, not credentials or lectures: the crypto challenges teach applied cryptanalysis by having developers break real constructions, and Microcorruption taught embedded exploitation the same way.",
      sourceIds: [S.cryptopals, S.sockpuppetMe, S.kalzumeus],
    },
    {
      id: "theme-hiring-reform",
      kind: "belief",
      status: "stated",
      title: "Hiring measures the wrong thing",
      summary:
        "Interviews and resumes select for confidence, not competence; work samples and games measure ability directly. He built this belief into Matasano's hiring and then into a company.",
      sourceIds: [S.hiringPost, S.securityConv, S.kalzumeus],
    },
    {
      id: "theme-orthodoxy",
      kind: "practice",
      status: "reported",
      title: "Debunker of security cargo cults",
      summary:
        "Rainbow-table panic, encrypted email as practiced, practitioners picking crypto primitives: his essays repeatedly argue the industry's conventional wisdom is wrong about its own tools.",
      sourceIds: [S.rainbowTables, S.stopEncryptedEmail, S.cryptoRightAnswers],
    },
    {
      id: "theme-opinionated-defaults",
      kind: "method",
      status: "stated",
      title: "Right answers over menus",
      summary:
        "Developers should get one vetted answer — NaCl/libsodium, AEAD, slow password KDFs — rather than a shelf of primitives they will misuse.",
      sourceIds: [S.cryptoRightAnswers],
    },
    {
      id: "theme-practitioner-writing",
      kind: "practice",
      status: "reported",
      title: "Specialist knowledge for generalist audiences",
      summary:
        "Password cracking for reporters, SQL injection for a judge, LLM agents for skeptical programmers: a consistent practice of translating security expertise outward.",
      sourceIds: [S.krebsPassword, S.foiaCourt, S.youreAllNuts],
    },
    {
      id: "theme-llm-convert",
      kind: "belief",
      status: "stated",
      title: "LLM agents as real leverage",
      summary:
        "A veteran security skeptic's case that coding agents already do real work, that anti-LLM arguments are unserious, and that the economics of vulnerability research are about to invert.",
      sourceIds: [S.youreAllNuts, S.vrCooked],
    },
    {
      id: "theme-civic",
      kind: "interest",
      status: "reported",
      title: "Security expertise as civic contribution",
      summary:
        "He lent vulnerability-research expertise to a public-records fight, testifying that a database schema is the product of an attack, not a predicate for one.",
      sourceIds: [S.foiaCourt],
    },
    {
      id: "theme-public-square",
      kind: "practice",
      status: "reported",
      title: "Argument in public",
      summary:
        "Blog essays, one of Hacker News's highest-karma comment accounts, a long-running crypto podcast, and conference talks: his influence runs through persistent public argument more than formal publication.",
      sourceIds: [S.hnProfile, S.scw, S.sockpuppetMe],
    },
  ],
  works: [
    {
      id: "work-ids-paper",
      kind: "paper",
      status: "published",
      title: "Insertion, Evasion, and Denial of Service: Eluding Network Intrusion Detection",
      date: "1998",
      summary:
        "With Timothy Newsham; the foundational network-IDS evasion paper, written at Secure Networks.",
      sourceIds: [S.sockpuppetMe, S.blackhat],
    },
    {
      id: "work-rainbow",
      kind: "other",
      status: "published",
      title: "Enough With The Rainbow Tables",
      date: "2007-09-07",
      summary:
        "Matasano Chargen essay on secure password schemes; argued salts already defeat rainbow tables and pushed slow password hashing.",
      sourceIds: [S.rainbowTables],
    },
    {
      id: "work-cryptopals",
      kind: "project",
      status: "ongoing",
      title: "The Cryptopals Crypto Challenges (Matasano Crypto Challenges)",
      date: "2013",
      summary:
        "Sets of exercises teaching attacks on real-world cryptography; began as a Matasano hiring tool, now maintained by Sean Devlin with NCC Group Cryptography Services.",
      sourceIds: [S.cryptopals, S.sockpuppetMe],
    },
    {
      id: "work-microcorruption",
      kind: "project",
      status: "released",
      title: "Microcorruption",
      date: "2014",
      summary:
        "Matasano/Square embedded-security CTF: find and exploit memory-corruption bugs in idealized MSP430 firmware to open fictional warehouse locks.",
      sourceIds: [S.sockpuppetMe, S.kalzumeus],
    },
    {
      id: "work-truecrypt-audit",
      kind: "project",
      status: "completed",
      title: "TrueCrypt security audit, Phase II",
      date: "2014",
      summary:
        "Technical lead for the crowdfunded audit's cryptographic phase after the TrueCrypt developers abandoned the project.",
      sourceIds: [S.arsTruecrypt],
    },
    {
      id: "work-hiring-post",
      kind: "other",
      status: "published",
      title: "The Hiring Post",
      date: "2015-03-06",
      summary:
        "The essay on why developer interviews fail and how Matasano hired on work samples instead; preceded the Starfighter announcement by three days.",
      sourceIds: [S.hiringPost],
    },
    {
      id: "work-starfighter",
      kind: "product",
      status: "abandoned",
      title: "Starfighter",
      date: "2015",
      summary:
        "The company built with Patrick McKenzie and Erin Ptacek to run skill-assessing CTFs and place players with hiring clients; wound down in 2016.",
      sourceIds: [S.kalzumeus, S.kalzumeus2016],
    },
    {
      id: "work-stockfighter",
      kind: "product",
      status: "released",
      title: "Stockfighter",
      date: "2015-12",
      summary:
        "Starfighter's flagship programming game — trading and low-level tech trees — publicly released December 2015.",
      sourceIds: [S.kalzumeus2016],
    },
    {
      id: "work-crypto-right-answers",
      kind: "other",
      status: "published",
      title: "Cryptographic Right Answers",
      date: "2018",
      summary:
        "His 2015 opinionated crypto recommendations, preserved alongside Colin Percival's 2009 originals and Latacora's 2018 update; a reference developers cite instead of choosing primitives.",
      sourceIds: [S.cryptoRightAnswers],
    },
    {
      id: "work-stop-encrypted-email",
      kind: "other",
      status: "published",
      title: "Stop Using Encrypted Email",
      date: "2020-02-19",
      summary:
        "Latacora essay arguing against encrypted email as practiced — against PGP-style secure messaging.",
      sourceIds: [S.stopEncryptedEmail],
    },
    {
      id: "work-scw",
      kind: "recording",
      status: "ongoing",
      title: "Security Cryptography Whatever",
      date: "2021",
      summary:
        "Podcast co-hosted with Deirdre Connolly and David Adrian on security, cryptography, and industry arguments.",
      sourceIds: [S.scw],
    },
    {
      id: "work-foia-court",
      kind: "other",
      status: "published",
      title: "I Went To SQL Injection Court",
      date: "2025-02-09",
      summary:
        "First-person account of expert-witness testimony in the CANVAS FOIA case, doubling as an explainer on SQL injection and database schemas.",
      sourceIds: [S.foiaCourt],
    },
    {
      id: "work-nuts",
      kind: "other",
      status: "published",
      title: "My AI Skeptic Friends Are All Nuts",
      date: "2025-06-02",
      summary:
        "The Fly blog essay that made him the public face of practitioner LLM adoption; widely linked and debated.",
      sourceIds: [S.youreAllNuts],
    },
    {
      id: "work-vr-cooked",
      kind: "other",
      status: "published",
      title: "Vulnerability Research Is Cooked",
      date: "2026-03-30",
      summary:
        "Argues coding agents will industrialize exploit development, citing Anthropic's Frontier Red Team results.",
      sourceIds: [S.vrCooked],
    },
  ],
  appearances: [
    {
      id: "appearance-krebs",
      title: "How Companies Can Beef Up Password Security",
      venue: "Krebs on Security",
      publishedAt: "2012-06-11",
      participants: ["Thomas Ptacek", "Brian Krebs"],
      summary:
        "Q&A after the LinkedIn/eHarmony/Last.fm breaches: why nobody gets password storage right and what would fix it.",
      media: [
        {
          type: "article",
          url: "https://krebsonsecurity.com/2012/06/how-companies-can-beef-up-password-security/",
          sourceId: S.krebsPassword,
        },
      ],
      sourceIds: [S.krebsPassword],
    },
    {
      id: "appearance-security-conversations",
      title: "Thomas Ptacek, Founder, Latacora",
      venue: "Security Conversations",
      publishedAt: "2018-04-23",
      participants: ["Thomas Ptacek"],
      summary:
        "Podcast interview on the cybersecurity skills shortage, his approach to recruiting and hiring, and diversity in the industry.",
      media: [
        {
          type: "audio",
          url: "https://securityconversations.fireside.fm/tom-ptacek-latacora",
          sourceId: S.securityConv,
        },
      ],
      sourceIds: [S.securityConv],
    },
    {
      id: "appearance-scw",
      title: "Security Cryptography Whatever",
      venue: "Security Cryptography Whatever",
      publishedAt: "2021",
      participants: ["Thomas Ptacek", "Deirdre Connolly", "David Adrian"],
      summary:
        "Ongoing podcast he co-hosts — long-form argument about security and cryptography, running since 2021.",
      media: [
        {
          type: "audio",
          url: "https://securitycryptographywhatever.com/",
          sourceId: S.scw,
        },
      ],
      sourceIds: [S.scw],
    },
    {
      id: "appearance-blackhat",
      title: "Black Hat USA talks",
      venue: "Black Hat USA",
      publishedAt: "2014",
      participants: ["Thomas Ptacek"],
      summary:
        "His conference bio records talks on intrusion detection evasion, DLP security flaws, hardware virtualized rootkit detection, and cryptographic attacks on software crypto.",
      sourceIds: [S.blackhat],
    },
    {
      id: "appearance-foia-court",
      title: "Expert testimony in the CANVAS FOIA trial",
      venue: "Cook County Chancery Court",
      publishedAt: "2025",
      participants: ["Thomas Ptacek"],
      summary:
        "Testified for requester Matt Chapman against the City of Chicago's claim that releasing a database schema would jeopardize system security.",
      sourceIds: [S.foiaCourt],
    },
  ],
  relations: [
    {
      id: "rel-matasano-security",
      kind: "founded",
      target: "matasano-security",
      targetName: "Matasano Security",
      targetKind: "organization",
      note:
        "Co-founded in 2005 with Dave Goldsmith and Jeremy Rauch; NCC Group acquired it in August 2012 for up to £8.4 million.",
      start: "2005",
      end: "2012-08",
      sourceIds: [S.blackhat, S.nccRns, S.sockpuppetMe],
    },
    {
      id: "rel-starfighter",
      kind: "founded",
      target: "starfighter",
      targetName: "Starfighter",
      targetKind: "organization",
      note:
        "Co-founded with Patrick McKenzie and Erin Ptacek, announced March 9, 2015 — the CTF hiring company behind Stockfighter; wound down in 2016.",
      start: "2015-03-09",
      end: "2016",
      sourceIds: [S.kalzumeus, S.kalzumeus2016],
    },
    {
      id: "rel-latacora",
      kind: "founded",
      target: "latacora",
      targetName: "Latacora",
      targetKind: "organization",
      note:
        "Co-founded with Erin Ptacek and Jeremy Rauch — the firm that embeds ongoing security teams inside startups.",
      start: "2015",
      sourceIds: [S.sockpuppetMe, S.securityConv],
    },
    {
      id: "rel-dave-goldsmith",
      kind: "cofounder",
      target: "dave-goldsmith",
      targetName: "Dave Goldsmith",
      note: "Matasano Security cofounder, 2005.",
      start: "2005",
      sourceIds: [S.blackhat, S.nccRns, S.sockpuppetMe],
    },
    {
      id: "rel-jeremy-rauch",
      kind: "cofounder",
      target: "jeremy-rauch",
      targetName: "Jeremy Rauch",
      note: "Cofounder with him of both Matasano Security (2005) and Latacora.",
      start: "2005",
      sourceIds: [S.blackhat, S.nccRns, S.sockpuppetMe, S.securityConv],
    },
    {
      id: "rel-patrick-mckenzie",
      kind: "cofounder",
      target: "patrick-mckenzie",
      targetName: "Patrick McKenzie",
      note: "Starfighter cofounder — his announcement and 2016 year-in-review are the primary sources for the company's arc and wind-down.",
      start: "2015",
      sourceIds: [S.kalzumeus, S.kalzumeus2016],
    },
    {
      id: "rel-erin-ptacek",
      kind: "cofounder",
      target: "erin-ptacek",
      targetName: "Erin Ptacek",
      note: "Cofounder with him of both Starfighter (2015) and Latacora.",
      start: "2015",
      sourceIds: [S.kalzumeus, S.kalzumeus2016, S.sockpuppetMe, S.securityConv],
    },
    {
      id: "rel-secure-networks",
      kind: "employed_by",
      target: "secure-networks",
      targetName: "Secure Networks",
      targetKind: "organization",
      note:
        "Began working in software security there in 1995 — what he calls the industry's first commercial vulnerability research lab — on intrusion detection systems.",
      start: "1995",
      sourceIds: [S.sockpuppetMe],
    },
    {
      id: "rel-ncc-group",
      kind: "employed_by",
      target: "ncc-group",
      targetName: "NCC Group",
      targetKind: "organization",
      note:
        "Acquired Matasano in August 2012; he ran hiring briefly at NCC before the post-acquisition years ended.",
      start: "2012-08",
      targetWikidataId: "Q17149263",
      sourceIds: [S.nccRns, S.sockpuppetMe],
    },
    {
      id: "rel-fly-io",
      kind: "employed_by",
      target: "fly-io",
      targetName: "Fly.io",
      targetKind: "organization",
      note:
        "A developer there since roughly 2020 — his bio's own words — working on platform internals and writing engineering posts.",
      start: "2020",
      targetWikidataId: "Q133943318",
      sourceIds: [S.sockpuppetMe, S.youreAllNuts],
    },
    {
      id: "rel-timothy-newsham",
      kind: "collaborated",
      target: "timothy-newsham",
      targetName: "Timothy Newsham",
      note: "Co-author of the 1998 'Insertion, Evasion, and Denial of Service' paper — the foundational work on evading network intrusion detection.",
      start: "1998",
      sourceIds: [S.sockpuppetMe, S.blackhat],
    },
    {
      id: "rel-sean-devlin",
      kind: "collaborated",
      target: "sean-devlin",
      targetName: "Sean Devlin",
      note: "Credited with him on Cryptopals; now maintains and expands the challenges with NCC Group's Cryptography Services team.",
      start: "2013",
      sourceIds: [S.cryptopals],
    },
    {
      id: "rel-alex-balducci",
      kind: "collaborated",
      target: "alex-balducci",
      targetName: "Alex Balducci",
      note: "Credited with him on Cryptopals.",
      start: "2013",
      sourceIds: [S.cryptopals],
    },
    {
      id: "rel-marcin-wielgoszewski",
      kind: "collaborated",
      target: "marcin-wielgoszewski",
      targetName: "Marcin Wielgoszewski",
      note: "Credited with him on Cryptopals.",
      start: "2013",
      sourceIds: [S.cryptopals],
    },
    {
      id: "rel-nate-lawson",
      kind: "collaborated",
      target: "nate-lawson",
      targetName: "Nate Lawson",
      note: "Fellow researcher on Phase II of the crowdfunded TrueCrypt security audit, which Ptacek led technically in 2014.",
      start: "2014",
      sourceIds: [S.arsTruecrypt],
    },
    {
      id: "rel-deirdre-connolly",
      kind: "collaborated",
      target: "deirdre-connolly",
      targetName: "Deirdre Connolly",
      note: "Co-host of Security Cryptography Whatever since 2021.",
      start: "2021",
      sourceIds: [S.scw],
    },
    {
      id: "rel-david-adrian",
      kind: "collaborated",
      target: "david-adrian",
      targetName: "David Adrian",
      note: "Co-host of Security Cryptography Whatever since 2021.",
      start: "2021",
      sourceIds: [S.scw],
    },
    {
      id: "rel-brian-krebs",
      kind: "interviewed_by",
      target: "brian-krebs",
      targetName: "Brian Krebs",
      note: "Krebs on Security Q&A, June 2012 — why nobody gets password storage right.",
      start: "2012-06",
      targetWikidataId: "Q4964382",
      sourceIds: [S.krebsPassword],
    },
  ],
  openQuestions: [
    "His Fly.io start date is not pinned down: LinkedIn lists the role (under joke titles) from July 2020, and his own bio confirms it only as of July 2021.",
    "Latacora's founding year is approximate in the cited record — sometime after the Matasano/NCC years and well before the 2018 Security Conversations interview.",
    "Basic biography is thin in public sources: there is no Wikipedia article, the Wikidata item carries few statements, and birth date and education are not documented.",
    "The scope and fate of the in-depth Starfighter postmortem McKenzie said Ptacek was writing is not settled in the cited record.",
    "The individual credit split among Cryptopals' four named creators (Ptacek, Devlin, Balducci, Wielgoszewski) is not documented beyond the site's attribution.",
  ],
  body: `Thomas H. Ptacek is an American security researcher and software developer who has spent three decades moving between two postures: breaking software and teaching the people who build it. He co-founded Matasano Security in 2005, sold it to NCC Group in 2012, co-founded the startup-security firm Latacora, built the cryptographic challenges that became Cryptopals, and co-founded Starfighter — a short-lived, influential attempt to replace engineering hiring with games. Since roughly 2020 he has been a developer at Fly.io, and since 2025 one of the industry's most-quoted essayists arguing that LLM agents have permanently changed programming.

## From vulnerability research to Matasano

Ptacek's career starts in the first generation of commercial security research. He has worked in software security since 1995 and was a member of what he calls the industry's first commercial vulnerability research lab, at Secure Networks, where much of his work concerned intrusion detection. In 1998 he and Timothy Newsham published "Insertion, Evasion, and Denial of Service: Eluding Network Intrusion Detection," the paper that defined IDS evasion. He later carried that work onto the Black Hat stage, presenting on intrusion detection evasion, flaws in data-loss-prevention products, detection of hardware virtualized rootkits, and cryptographic attacks on software crypto.

In 2005 he co-founded Matasano Security with Dave Goldsmith and Jeremy Rauch. The firm sold penetration testing, reverse engineering, and source code review to blue-chip clients, and its Chargen blog became a public voice for applied security — most famously Ptacek's 2007 "Enough With The Rainbow Tables," which argued that salting already defeats rainbow tables and that real password storage needs deliberately slow password hashes. Telling Brian Krebs in 2012 that "nobody gets this right," he diagnosed the underlying problem: generalist developers are asked to build cryptographic systems they were never trained for. NCC Group acquired Matasano in August 2012 for up to £8.4 million; he describes the firm at sale as one of the largest software security companies in the US. In 2014, Ars Technica reported him as technical lead for Phase II of the crowdfunded TrueCrypt audit.

## Games as instruments

The thread that runs through his companies is hiring. Ptacek ran hiring at Matasano and, briefly, at NCC, and concluded that interviews and resumes systematically misprice talent — they measure confidence, not capability. Matasano's answer was work samples: the crypto challenges, a set of exercises that teach real attacks on real cryptography, which began as a hiring filter and became the public Cryptopals Crypto Challenges, now maintained by Sean Devlin with NCC Group's cryptography team. With Square, Matasano built Microcorruption, an embedded-security CTF that teaches memory-corruption exploitation on an idealized MSP430.

In March 2015 he published "The Hiring Post," his fullest argument that developer interviews are a market failure, and three days later he, Patrick McKenzie, and Erin Ptacek announced Starfighter: a company whose CTF games would measure rare programming skills and route top players to employers. Its flagship game Stockfighter shipped publicly in December 2015, but the contingency-recruiting business never hummed, and the company wound down in 2016. The experiment was a commercial failure and a cultural success: work-sample hiring arguments now quote him reflexively.

## Latacora, essays, and public argument

After the NCC years he co-founded Latacora with Erin Ptacek and Jeremy Rauch, a firm that embeds ongoing security teams inside startups rather than selling point-in-time assessments. Through it he published two of his most-cited stances: "Cryptographic Right Answers," his 2015 list of opinionated defaults — NaCl/libsodium, AEAD constructions, slow password KDFs — and "Stop Using Encrypted Email" (2020), a sustained attack on encrypted email as practiced. His sockpuppet.org essays take similar swings at industry orthodoxy, from "Against DNSSEC" to "Applied Cryptography Engineering," a critique of the Schneier classic as a dangerous instruction manual.

He argues in public constantly: as tptacek he is one of Hacker News's highest-karma commenters, and since 2021 he has co-hosted the Security Cryptography Whatever podcast with Deirdre Connolly and David Adrian. In February 2025 he described testifying as an expert witness in a Cook County FOIA trial, explaining to a judge why Chicago's parking-ticket database schema was "the product of an attack, not one of its predicates."

## Fly.io and the LLM turn

At Fly.io he is simply a developer — his bio's words — working on platform internals and writing engineering posts on WireGuard networking and token design. Then, in June 2025, "My AI Skeptic Friends Are All Nuts" made him the loudest credible voice for LLM-assisted programming: the skeptics' arguments are unserious, the tools already do real work, and you remain responsible for what you merge to main. He followed it with "You Should Write An Agent," which reduces a working agent to a loop and a tool call, and in March 2026 with "Vulnerability Research Is Cooked," arguing that agents will industrialize exploit development — that the industry was protected partly by a scarcity of elite attention which no longer holds.

## What the record does not settle

The public record is strong on what he built and argued, thin on biography. There is no Wikipedia article; the Wikidata item is sparse; his birth date and education do not appear in the cited sources. His Fly.io start date and Latacora's founding year are only approximately documented, and "one of the largest software security firms in the US" is his own characterization. The index preserves those seams rather than smoothing them over.

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
