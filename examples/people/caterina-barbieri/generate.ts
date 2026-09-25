#!/usr/bin/env bun
/** Generate examples/people/caterina-barbieri/person-index.json with derived source ids. */

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

const ACCESSED = "2026-09-25T00:00:00Z";

function source(spec: SourceSpec) {
  return {
    id: stablePersonSourceId(spec.url, spec.publishedAt),
    accessedAt: ACCESSED,
    ...spec,
  };
}

// --- Subject-controlled -----------------------------------------------------

const cbBio = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Bio — Caterina Barbieri",
  url: "https://caterinabarbieri.com/Bio",
  publisher: "caterinabarbieri.com",
  notes:
    "The subject's official biography; claims here are self-reported. Confirms album years, labels, EMS/Stockholm training, and the light-years label.",
});
const cbBandcamp = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "caterina barbieri — Bandcamp",
  url: "https://caterinabarbieri.bandcamp.com/",
  publisher: "Bandcamp",
  notes:
    "Her own Bandcamp store: release list and release notes, including the light-years reissue of Ecstatic Computation and At Source.",
});
const cbPatterns = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Patterns of Consciousness — Caterina Barbieri",
  url: "https://caterinabarbieri.com/Patterns-of-Consciousness",
  publisher: "caterinabarbieri.com",
  notes:
    "Album page carrying her own statement: 'A pattern creates a certain state of consciousness.'",
});
const cbUpperGlossa = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Upper Glossa — Caterina Barbieri",
  url: "https://caterinabarbieri.com/Upper-Glossa",
  publisher: "caterinabarbieri.com",
  notes:
    "Her page on the duo with Kali Malone, premiered at Berlin Atonal 2016; quotes The Wire's festival-highlight review.",
});
const cbPunctum = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Punctum — Caterina Barbieri",
  url: "https://caterinabarbieri.com/Punctum",
  publisher: "caterinabarbieri.com",
  notes: "Her page on the duo with Carlo Maria and the Remote Sensing record.",
});
const lyAbout = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "about — light-years",
  url: "https://l-years.com/about",
  publisher: "light-years",
  notes:
    "About page of the label she founded in 2021; states the platform's mission in its own words.",
});
const ly009 = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "ly009 — Caterina Barbieri and Bendik Giske, At Source — light-years",
  url: "https://l-years.com/ly009",
  publisher: "light-years",
  notes:
    "Label release page for the 2026 At Source EP; documents the 2019 Kunsthaus Glarus meeting and the 2021 ICA Milan residency.",
});

// --- First person -----------------------------------------------------------

const biennaleIntro = source({
  binding: "first_person",
  mediaType: "webpage",
  title: "Biennale Musica 2025 | Introduction by Caterina Barbieri",
  url: "https://www.labiennale.org/en/music/2025/introduction-caterina-barbieri",
  publisher: "La Biennale di Venezia",
  publishedAt: "2025",
  notes:
    "Her curatorial statement for Biennale Musica 2025, written in her own words ('cosmic music is not a genre or a style').",
});

// --- Primary records ---------------------------------------------------------

const imprecPatterns = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Caterina Barbieri - Patterns of Consciousness - 2LP / CD",
  url: "https://importantrecords.com/products/caterina-barbieri-patterns-of-consciousness",
  publisher: "Important Records",
  notes: "Label product page for the 2017 double LP (IMPREC449) and later represses.",
});
const mego259 = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Ecstatic Computation — Caterina Barbieri — Editions Mego",
  url: "https://mego.at/release/EMEGO-259",
  publisher: "Editions Mego",
  notes:
    "Label release page (EMEGO 259, 2019) with credits and the label's 'temporal hallucinations' description.",
});
const mego279 = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Fantas Variations — Caterina Barbieri — Editions Mego",
  url: "https://mego.at/release/EMEGO-279",
  publisher: "Editions Mego",
  notes:
    "Label release page (EMEGO 279, 2021) listing all eight Fantas reworks and their performers.",
});
const xkatedral = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "XKatedral Volume III | Ellen Arkbro - Caterina Barbieri - Kali Malone",
  url: "https://xkatedral.bandcamp.com/album/xkatedral-volume-iii",
  publisher: "XKatedral",
  publishedAt: "2016-10-06",
  notes:
    "Label Bandcamp page for the 2016 cassette (XK06) carrying 'Glory (Final Movement)' by Barbieri and Kali Malone.",
});
const punctumBandcamp = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Remote Sensing | Punctum",
  url: "https://punctum.bandcamp.com/album/remote-sensing",
  publisher: "Punctum",
  publishedAt: "2017-05-02",
  notes:
    "The duo's own release page: recorded at EMS in February 2016, released on Summe (Σ 8) in May 2017.",
});
const biennaleNews = source({
  binding: "primary_record",
  mediaType: "webpage",
  title:
    "Biennale Musica 2025 | Caterina Barbieri is the new Artistic Director of the Music Department",
  url: "https://www.labiennale.org/en/news/caterina-barbieri-new-artistic-director-music-department",
  publisher: "La Biennale di Venezia",
  publishedAt: "2024-11-05",
  notes:
    "Official announcement of her appointment as Artistic Director of the Music Department for 2025–2026.",
});
const biennaleDirettore = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Biennale Musica 2025 | Direttore — Caterina Barbieri",
  url: "https://www.labiennale.org/en/music/2025/direttore",
  publisher: "La Biennale di Venezia",
  notes:
    "Institutional biography with dated education milestones (2012 guitar diploma, 2014 electroacoustic diploma, 2015 literature degree).",
});
const warpJohn = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "John and the Hole | Warp Composers",
  url: "https://warpcomposers.net/projects/johnandthehole/",
  publisher: "Warp Composers",
  notes:
    "Her composer-agency page for the Pascual Sisto film; also evidence of the Warp Publishing affiliation.",
});
const cannesJohn = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "John and the Hole — Festival de Cannes",
  url: "https://www.festival-cannes.com/en/f/john-and-the-hole/",
  publisher: "Festival de Cannes",
  notes:
    "Festival page crediting Caterina Barbieri with the film's music (2020 official selection).",
});
const emsGuest = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Caterina Barbieri — Elektronmusikstudion guest composers 2026",
  url: "https://elektronmusikstudion.se/en/guest-composers/guest-composers-2026/caterina-barbieri/",
  publisher: "Elektronmusikstudion (EMS)",
  notes:
    "EMS lists her among its 2026 guest composers and hosts an institutional biography.",
});

// --- Interviews --------------------------------------------------------------

const raFeature = source({
  binding: "interview",
  mediaType: "article",
  title: "Caterina Barbieri: Ecstatic computation",
  url: "https://ra.co/features/3385",
  publisher: "Resident Advisor",
  publishedAt: "2019-01-10",
  authors: ["Maya-Roisin Slater"],
  notes:
    "Long-form feature; source of the 'basically guitar music but with synthesizers' line quoted elsewhere.",
});
const sosInterview = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview: minimalist electronic artist Caterina Barbieri",
  url: "https://www.soundonsound.com/news/interview-minimalist-electronic-artist-caterina-barbieri",
  publisher: "Sound on Sound",
  publishedAt: "2017-07-31",
  notes:
    "Interview around Ableton Loop 2017: the Buchla 200 encounter in 2013, avoiding iconic synth timbres, and the human–technology feedback view of composition.",
});
const fact2024 = source({
  binding: "interview",
  mediaType: "article",
  title: "Interview: Caterina Barbieri",
  url: "https://www.factmag.com/2024/01/12/interview-caterina-barbieri/",
  publisher: "FACT Magazine",
  publishedAt: "2024-01-12",
  notes:
    "On the light-years project and Spirit Exit as her most personal record; 'music acted as a kind of perceptual enhancer, a portal.'",
});
const zweikommasieben = source({
  binding: "interview",
  mediaType: "article",
  title: "Caterina Barbieri — Becoming Time",
  url: "https://zweikommasieben.ch/articles/interviews/caterina-barbieri-becoming-time",
  publisher: "zweikommasieben Magazin",
  publishedAt: "2019",
  authors: ["Mathis Neuhaus"],
  notes:
    "Issue #19 interview conducted in Milan in February 2019: live performance as compositional development; time as leitmotif.",
});
const elevate = source({
  binding: "interview",
  mediaType: "article",
  title: "Composing a machine — An interview with Caterina Barbieri",
  url: "https://elevate.at/websites/2018/en/details/news/composing-a-machine/index.html",
  publisher: "Elevate Festival",
  publishedAt: "2018",
  authors: ["Shilla Strelka"],
  notes:
    "On the Buchla as 'a portal of access to a hidden psychic potential' and minimalism as a bridge into electronic music.",
});
const abletonLoop = source({
  binding: "interview",
  mediaType: "video",
  title: "A performative presentation with Caterina Barbieri | Loop",
  url: "https://www.youtube.com/watch?v=nxECAD3NwQE",
  publisher: "Ableton",
  publishedAt: "2018-06-13",
  notes:
    "Video of her Loop 2017 (Berlin) conversation with Dennis DeSantis plus a live modular performance.",
});
const abletonBlog = source({
  binding: "interview",
  mediaType: "article",
  title: "Caterina Barbieri: Minimalism, Modular and Live",
  url: "https://www.ableton.com/en/blog/caterina-barbieri-minimalism-modular-and-live/",
  publisher: "Ableton",
  publishedAt: "2018-06-13",
  notes:
    "Companion piece to the Loop talk; she describes her live rig and work in SuperCollider and alternative tunings.",
});
const mixmag = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Modular mystic: Caterina Barbieri is unlocking the spirituality in synths",
  url: "https://mixmag.net/feature/caterina-barbieri-cover-feature-interview-analogue-modular-synths-spiritual",
  publisher: "Mixmag",
  authors: ["Chal Ravens"],
  notes:
    "Cover feature on performing in imposing spaces, distaste for the 'modular music scene', Ectoplasm Girls, and the hypothetical dance record under a pseudonym.",
});
const barbican = source({
  binding: "interview",
  mediaType: "article",
  title: "Caterina Barbieri + Nexcyia — Digital Programme",
  url: "https://www.barbican.org.uk/digital-programmes/caterina-barbieri-nexcyia-digital-programme",
  publisher: "Barbican Centre",
  publishedAt: "2022-10",
  authors: ["Jennifer Lucy Allen"],
  notes:
    "Programme interview for her 26 October 2022 Barbican concert: voice as 'an extension of my modular synthesizer.'",
});
const digicult = source({
  binding: "interview",
  mediaType: "article",
  title: "Caterina Barbieri: new tactics for electronic mutants",
  url: "https://digicult.it/news/caterina-barbieri-new-tactics-for-electronic-mutants/",
  publisher: "Digicult",
  publishedAt: "2016-05-13",
  notes:
    "Early interview: the 2013 Buchla encounter at the Stockholm conservatory and anti-fetish stance toward synthesizers.",
});
const npr = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Caterina Barbieri's 'Spirit Exit' was created in the deep solitude of lockdown",
  url: "https://www.npr.org/2022/07/09/1110267969/caterina-barbieris-rapturous-electronica-was-forged-in-deep-solitude",
  publisher: "NPR",
  publishedAt: "2022-07-09",
  notes:
    "Feature interview on making Spirit Exit in the Milan apartment during Italy's first 2020 lockdown.",
});
const niBlog = source({
  binding: "interview",
  mediaType: "article",
  title: "Caterina Barbieri: Sculpting sonic spaces",
  url: "https://blog.native-instruments.com/caterina-barbieri-sculpting-sonic-spaces/",
  publisher: "Native Instruments Blog",
  publishedAt: "2018-05-21",
  notes:
    "On spatial sound, the 4DSOUND system, and her MONOM performance; her earlier 'Spherical Sound' research project.",
});
const fact2018 = source({
  binding: "archive",
  mediaType: "article",
  title:
    "Caterina Barbieri on synthesis, minimalism and creating living organisms out of sound (Signal Path)",
  url: "https://web.archive.org/web/20180708191652/http://www.factmag.com/2018/07/08/caterina-barbieri-signal-path/",
  publisher: "FACT Magazine",
  publishedAt: "2018-07-08",
  authors: ["Scott Wilson"],
  notes:
    "Wayback Machine capture of FACT's Signal Path interview; the original URL now redirects. Source of 'a pattern creates a certain state of consciousness' and the Buchla-as-portal account.",
});

// --- Reporting ----------------------------------------------------------------

const p4kEcstatic = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri: Ecstatic Computation Album Review",
  url: "https://pitchfork.com/reviews/albums/caterina-barbieri-ecstatic-computation/",
  publisher: "Pitchfork",
  publishedAt: "2019-05-23",
  authors: ["Miles Bowe"],
  notes:
    "Source of the 'dreamachine for the ears' and 'bends time and space' framings her own bio quotes.",
});
const p4kSpirit = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri: Spirit Exit Album Review",
  url: "https://pitchfork.com/reviews/albums/caterina-barbieri-spirit-exit/",
  publisher: "Pitchfork",
  publishedAt: "2022-07-08",
  authors: ["Linnie Greene"],
  notes:
    "Review noting the 'mechanical fortune teller' modular setup and the Teresa of Ávila / Braidotti / Dickinson influences.",
});
const p4kMyuthafoo = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri: Myuthafoo Album Review",
  url: "https://pitchfork.com/reviews/albums/caterina-barbieri-myuthafoo/",
  publisher: "Pitchfork",
  publishedAt: "2023-06-16",
  notes:
    "'An instrumental set of controlled abandon and rapturous minimalism'; dates the album and the light-years Ecstatic Computation reissue plan.",
});
const p4kBorn = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri: Born Again in the Voltage Album Review",
  url: "https://pitchfork.com/reviews/albums/caterina-barbieri-born-again-in-the-voltage/",
  publisher: "Pitchfork",
  publishedAt: "2018-08-11",
  notes:
    "Review of the 2018 Important Records LP recorded at EMS in 2014–15 with cello by Antonello Manzo.",
});
const p4kAtSource = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri / Bendik Giske: At Source Album Review",
  url: "https://pitchfork.com/reviews/albums/caterina-barbieri-bendik-giske-at-source/",
  publisher: "Pitchfork",
  publishedAt: "2026-03-02",
  notes:
    "Review of the four-improvisation EP; notes her recent appointment as artistic director of the Venice Biennale's music department.",
});
const quietusKnot = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri And Lyra Pramuk Team Up For New Track",
  url: "https://thequietus.com/news/caterina-barbieri-lyra-pramuk-collaboration-knot-of-spirit/",
  publisher: "The Quietus",
  publishedAt: "2021-07-22",
  authors: ["Christian Eede"],
  notes:
    "Announcement of light-years and its first release 'Knot Of Spirit', with the label's stated values and planned showcases.",
});
const quietusSpirit = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri Details New Album, 'Spirit Exit'",
  url: "https://thequietus.com/news/caterina-barbieri-spirit-exit-album-details/",
  publisher: "The Quietus",
  publishedAt: "2022-04-20",
  authors: ["Christian Eede"],
  notes:
    "Album announcement: eight tracks written over a two-month 2020 lockdown period in Milan; July 8, 2022 release date.",
});
const quietusEcstatic = source({
  binding: "reporting",
  mediaType: "article",
  title: "A Better Tomorrow: Caterina Barbieri's Ecstatic Computation",
  url: "https://thequietus.com/quietus-reviews/album-of-the-week/caterina-barbieri-ecstatic-computation/",
  publisher: "The Quietus",
  publishedAt: "2019-05-02",
  authors: ["Joseph Burnett"],
  notes:
    "Album-of-the-week review framing the record as re-igniting electronic music's utopian spark.",
});
const djmag = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Caterina Barbieri launches new label, light-years, with Lyra Pramuk collaboration: Listen",
  url: "https://djmag.com/news/caterina-barbieri-launches-new-label-light-years-lyra-pramuk-collaboration",
  publisher: "DJ Mag",
  publishedAt: "2021-07-26",
  authors: ["Martin Guttridge-Hewitt"],
  notes:
    "News report on the label launch and its first showcase bookings (Nextones, Draaimolen).",
});
const crack = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri: 'Spirit Exit' review",
  url: "https://crackmagazine.net/article/album-reviews/caterina-barbieri-spirit-exit-review/",
  publisher: "Crack Magazine",
  publishedAt: "2022-07-11",
  notes:
    "Review placing Spirit Exit in the kosmische lineage (Tangerine Dream, Steve Roach) alongside OPN-like uncanny moments.",
});
const bandcampDaily = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri, 'Spirit Exit' — Album of the Day",
  url: "https://daily.bandcamp.com/album-of-the-day/caterina-barbieri-spirit-exit-review",
  publisher: "Bandcamp Daily",
  publishedAt: "2022-07-08",
  authors: ["Vanessa Ague"],
  notes:
    "Album-of-the-day piece on the Bach / '60s minimalism / Keiji Haino thread in her background.",
});
const raEcstatic = source({
  binding: "reporting",
  mediaType: "article",
  title: "Caterina Barbieri - Ecstatic Computation · Album Review",
  url: "https://ra.co/reviews/23756",
  publisher: "Resident Advisor",
  publishedAt: "2019-05-06",
  notes:
    "Review quoting her line 'the music I'm doing now is basically guitar music but with synthesizers.'",
});
const shape = source({
  binding: "reporting",
  mediaType: "webpage",
  title: "Caterina Barbieri — SHAPE+",
  url: "https://www.shapeplatform.eu/artist/caterina-barbieri/",
  publisher: "SHAPE+ platform",
  notes:
    "Platform artist bio: SHAPE artist for 2018; Vertical released via Important's Cassauna offshoot on 8 October 2014; lists RBMA among performance contexts.",
});
const factNextones = source({
  binding: "reporting",
  mediaType: "article",
  title: "Nextones Festival 2021: Caterina Barbieri presents light-years",
  url: "https://www.factmag.com/2021/07/31/nextones-festival-2021-caterina-barbieri-light-years/",
  publisher: "FACT Magazine",
  publishedAt: "2021-07-31",
  notes:
    "Report on the world premiere of the light-years curated showcase with Bendik Giske, Nkisi and MFO.",
});
const wuma = source({
  binding: "reporting",
  mediaType: "article",
  title: "Red Bull Music Academy Bass Camp a Roma",
  url: "https://wumagazine.com/2017/09/11/red-bull-music-academy-roma/",
  publisher: "Wu Magazine",
  publishedAt: "2017-09-11",
  language: "it",
  notes:
    "Documents her live set at the RBMA Bass Camp Rome closing night, 16 September 2017 — an RBMA-branded performance, not academy enrolment.",
});
const rbmaRoster = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "RBMA Tokyo 2014 participants announced, including Mumdance, WIFE and Ossie",
  url: "https://www.factmag.com/2014/07/08/rbma-tokyo-2014-participants-announced-wife-ossie/",
  publisher: "FACT Magazine",
  publishedAt: "2014-07-08",
  notes:
    "The published Tokyo 2014 participant roster; consulted to check the 'RBMA Tokyo alum' claim — her name does not appear.",
});

// --- Reference -----------------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Caterina Barbieri (Q66832152)",
  url: "https://www.wikidata.org/wiki/Q66832152",
  publisher: "Wikidata",
  notes:
    "Gives date of birth as 16 September 1990 (sourced to AllMusic) — one day later than the English Wikipedia figure.",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Caterina Barbieri",
  url: "https://en.wikipedia.org/wiki/Caterina_Barbieri",
  publisher: "Wikipedia",
  notes:
    "Carries a promotional-content notice (March 2026) and an uncited Education section; used for discovery and cross-checking, not sole authority.",
});
const raLabel = source({
  binding: "reference",
  mediaType: "webpage",
  title: "light-years · Record label",
  url: "https://ra.co/labels/19102",
  publisher: "Resident Advisor",
  notes:
    "RA's label profile: 'Founded in Milano in 2021' and catalogue cross-references (LY001 Spirit Exit, LY003 Myuthafoo).",
});

const S = {
  cbBio: cbBio.id,
  cbBandcamp: cbBandcamp.id,
  cbPatterns: cbPatterns.id,
  cbUpperGlossa: cbUpperGlossa.id,
  cbPunctum: cbPunctum.id,
  lyAbout: lyAbout.id,
  ly009: ly009.id,
  biennaleIntro: biennaleIntro.id,
  imprecPatterns: imprecPatterns.id,
  mego259: mego259.id,
  mego279: mego279.id,
  xkatedral: xkatedral.id,
  punctumBandcamp: punctumBandcamp.id,
  biennaleNews: biennaleNews.id,
  biennaleDirettore: biennaleDirettore.id,
  warpJohn: warpJohn.id,
  cannesJohn: cannesJohn.id,
  emsGuest: emsGuest.id,
  raFeature: raFeature.id,
  sosInterview: sosInterview.id,
  fact2024: fact2024.id,
  zweikommasieben: zweikommasieben.id,
  elevate: elevate.id,
  abletonLoop: abletonLoop.id,
  abletonBlog: abletonBlog.id,
  mixmag: mixmag.id,
  barbican: barbican.id,
  digicult: digicult.id,
  npr: npr.id,
  niBlog: niBlog.id,
  fact2018: fact2018.id,
  p4kEcstatic: p4kEcstatic.id,
  p4kSpirit: p4kSpirit.id,
  p4kMyuthafoo: p4kMyuthafoo.id,
  p4kBorn: p4kBorn.id,
  p4kAtSource: p4kAtSource.id,
  quietusKnot: quietusKnot.id,
  quietusSpirit: quietusSpirit.id,
  quietusEcstatic: quietusEcstatic.id,
  djmag: djmag.id,
  crack: crack.id,
  bandcampDaily: bandcampDaily.id,
  raEcstatic: raEcstatic.id,
  shape: shape.id,
  factNextones: factNextones.id,
  wuma: wuma.id,
  rbmaRoster: rbmaRoster.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  raLabel: raLabel.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-caterina-barbieri",
  generatedAt: "2026-09-25T21:25:28Z",
  subject: {
    kind: "person",
    handle: "caterina-barbieri",
    displayName: "Caterina Barbieri",
    alsoKnownAs: ["Morbida"],
    summary:
      "Italian composer and musician (born Bologna, 1990) who works primarily with modular synthesis, using pattern, repetition and generative technique to explore altered states of consciousness and the perception of time; founder of the light-years label and Artistic Director of the Music Department of La Biennale di Venezia for 2025–2026.",
    identity: {
      wikidataId: "Q66832152",
      officialSite: "https://caterinabarbieri.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Caterina_Barbieri",
      profiles: [
        "https://caterinabarbieri.bandcamp.com/",
        "https://www.instagram.com/cat_barbieri",
        "https://soundcloud.com/caterinabarbieri",
        "https://www.youtube.com/channel/UCi1NF-IclgS0dK9COPSXksg",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:25:28Z",
    coverage: ["biography", "work", "philosophy", "projects", "media"],
  },
  sources: [
    cbBio,
    cbBandcamp,
    cbPatterns,
    cbUpperGlossa,
    cbPunctum,
    lyAbout,
    ly009,
    biennaleIntro,
    imprecPatterns,
    mego259,
    mego279,
    xkatedral,
    punctumBandcamp,
    biennaleNews,
    biennaleDirettore,
    warpJohn,
    cannesJohn,
    emsGuest,
    raFeature,
    sosInterview,
    fact2024,
    zweikommasieben,
    elevate,
    abletonLoop,
    abletonBlog,
    mixmag,
    barbican,
    digicult,
    npr,
    niBlog,
    fact2018,
    p4kEcstatic,
    p4kSpirit,
    p4kMyuthafoo,
    p4kBorn,
    p4kAtSource,
    quietusKnot,
    quietusSpirit,
    quietusEcstatic,
    djmag,
    crack,
    bandcampDaily,
    raEcstatic,
    shape,
    factNextones,
    wuma,
    rbmaRoster,
    wikidata,
    wikipedia,
    raLabel,
  ],
  claims: [
    {
      id: "claim-born-bologna-1990",
      kind: "fact",
      text: "Caterina Barbieri was born in Bologna, Italy, in September 1990; reference sources disagree on the day (English Wikipedia gives 14 September, Wikidata — citing AllMusic — gives 16 September).",
      sourceIds: [S.wikipedia, S.wikidata, S.biennaleDirettore],
    },
    {
      id: "claim-guitar-diploma-2012",
      kind: "fact",
      text: "She earned a diploma in classical guitar in 2012 at the Conservatorio G.B. Martini in Bologna, studying with Walter Zanetti; she had taken up the instrument as a child.",
      sourceIds: [S.biennaleDirettore, S.wikipedia, S.fact2018],
    },
    {
      id: "claim-electroacoustic-diploma-2014",
      kind: "fact",
      text: "In 2014 she earned a diploma in electroacoustic composition at the Conservatorio G.B. Martini with Francesco Giomi, after exchange study at the Royal College of Music and Elektronmusikstudion (EMS) in Stockholm.",
      sourceIds: [S.biennaleDirettore, S.emsGuest, S.wikipedia],
    },
    {
      id: "claim-buchla-2013",
      kind: "fact",
      text: "From 2013 she researched and produced music at EMS in Stockholm, where her encounter with the Buchla 200 modular system — during studies at the Royal College of Music — reoriented her toward electronic composition.",
      sourceIds: [S.sosInterview, S.digicult, S.shape],
    },
    {
      id: "claim-unibo-degree-2015",
      kind: "fact",
      text: "In 2015 she earned a degree in Modern Literature at the University of Bologna with a thesis in ethnomusicology on the relationship between American minimalism and Hindustani classical music.",
      sourceIds: [S.biennaleDirettore, S.emsGuest, S.shape],
    },
    {
      id: "claim-morbida-split",
      kind: "fact",
      text: "Before her solo debut she released a split album as Morbida with Medicine Bow in 2014.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-vertical-2014",
      kind: "fact",
      text: "Her debut solo album Vertical — composed for Buchla 200 and voice and produced between EMS and the Royal College of Music in Stockholm — was released on cassette by Important Records' Cassauna offshoot on 8 October 2014.",
      sourceIds: [S.shape, S.cbBio, S.wikipedia],
    },
    {
      id: "claim-punctum",
      kind: "fact",
      text: "Punctum, her duo with Carlo Maria, began during an EMS residency in early 2016; their album Remote Sensing — Roland TB-303 and TR-606 processed through delay lines and the Buchla 200 — premiered at The Long Now 2017 and was released on the Summe (∑) label in May 2017.",
      sourceIds: [S.punctumBandcamp, S.cbPunctum, S.wikipedia],
    },
    {
      id: "claim-glory-xkatedral",
      kind: "fact",
      text: "'Glory (Final Movement)', a piece for electric guitars and spectral freeze by Barbieri and Kali Malone, appeared on the cassette XKatedral Volume III (XK06) in October 2016, alongside a piece by Ellen Arkbro and Malone.",
      sourceIds: [S.xkatedral, S.cbUpperGlossa],
    },
    {
      id: "claim-upper-glossa-atonal",
      kind: "fact",
      text: "Upper Glossa, her duo project with Kali Malone, premiered at Berlin Atonal 2016; The Wire picked the performance as a festival highlight, calling it 'hypnotic and beautifully disorientating.'",
      sourceIds: [S.cbUpperGlossa, S.wikipedia],
    },
    {
      id: "claim-patterns-release",
      kind: "fact",
      text: "Patterns of Consciousness, her second full-length and breakthrough record, was released by Important Records as a double LP (IMPREC449) on 5 May 2017.",
      sourceIds: [S.imprecPatterns, S.cbPatterns, S.wikipedia],
    },
    {
      id: "claim-patterns-method",
      kind: "fact",
      text: "The album was composed through the exclusive use of an ER-101 indexed quad sequencer and a Verbos Harmonic Oscillator, deriving interlocking patterns by subtraction, addition and jitter operations and an illusory counterpoint influenced by baroque lute music.",
      sourceIds: [S.imprecPatterns, S.sosInterview, S.wikipedia],
    },
    {
      id: "claim-patterns-acclaim",
      kind: "fact",
      text: "Patterns of Consciousness was named among the best releases of 2017 by The Wire (top 50 releases), FACT (50 best albums) and Boomkat's top releases.",
      sourceIds: [S.wikipedia, S.fact2018, S.sosInterview],
    },
    {
      id: "claim-loop-2017",
      kind: "fact",
      text: "She gave a talk and live modular performance at Ableton's Loop summit in Berlin in November 2017; Ableton published the session video and a companion interview in June 2018.",
      sourceIds: [S.abletonLoop, S.abletonBlog],
    },
    {
      id: "claim-born-again-2018",
      kind: "fact",
      text: "Born Again in the Voltage, four pieces for Buchla 200, voice and cello (Antonello Manzo) recorded at EMS between 2014 and 2015, was released by Important Records on 10 August 2018.",
      sourceIds: [S.wikipedia, S.p4kBorn, S.cbBandcamp],
    },
    {
      id: "claim-shape-2018",
      kind: "fact",
      text: "She was a SHAPE platform artist for 2018, the EU-backed network for innovative music and audiovisual art.",
      sourceIds: [S.shape],
    },
    {
      id: "claim-ecstatic-release",
      kind: "fact",
      text: "Ecstatic Computation, her debut for Editions Mego (EMEGO 259), was released on 3 May 2019; it features vocals by Annie Gårlid and Evelyn Saylor on 'Arrows of Time', mastering by Rashad Becker, and artwork by Ruben Spini.",
      sourceIds: [S.mego259, S.wikipedia, S.p4kEcstatic],
    },
    {
      id: "claim-ecstatic-acclaim",
      kind: "fact",
      text: "The album appeared on 2019 year-end lists at Resident Advisor, The Quietus and The Wire, and Rolling Stone Italia later included it among the best Italian records of the decade.",
      sourceIds: [S.wikipedia, S.quietusEcstatic, S.raEcstatic],
    },
    {
      id: "claim-warp-publishing",
      kind: "fact",
      text: "In 2019 she was added to the catalogue of music publisher Warp Publishing; she is represented for film and media composition by Warp Composers.",
      sourceIds: [S.wikipedia, S.warpJohn],
    },
    {
      id: "claim-john-and-the-hole",
      kind: "fact",
      text: "She composed the score for Pascual Sisto's film John and the Hole, an official selection of the 2020 Cannes Film Festival (which ran without a physical edition) that premiered at Sundance on 29 January 2021.",
      sourceIds: [S.cannesJohn, S.warpJohn, S.wikipedia],
    },
    {
      id: "claim-fantas-variations",
      kind: "fact",
      text: "Fantas Variations (Editions Mego, 2 April 2021) collects eight reworks of 'Fantas', the opening track of Ecstatic Computation, by Evelyn Saylor with Lyra Pramuk, Annie Garlid and Stine Janvin; Bendik Giske; Kali Malone; Walter Zanetti; Jay Mitta; Baseck; Carlo Maria; and Kara-Lis Coverdale.",
      sourceIds: [S.mego279, S.wikipedia],
    },
    {
      id: "claim-lightyears-launch",
      kind: "fact",
      text: "In July 2021 she launched her own independent label platform, light-years; its first release, 'Knot of Spirit' with Lyra Pramuk, came out on 22 July 2021.",
      sourceIds: [S.quietusKnot, S.djmag, S.lyAbout],
    },
    {
      id: "claim-lightyears-showcases",
      kind: "fact",
      text: "light-years was designed as a multidisciplinary platform spanning releases and curated live showcases; the premiere light-years show at Nextones Festival (July 2021) featured Bendik Giske, Nkisi and MFO, with a further showcase at Draaimolen.",
      sourceIds: [S.factNextones, S.quietusKnot, S.djmag],
    },
    {
      id: "claim-broken-melody",
      kind: "fact",
      text: "In April 2022 she released the single 'Broken Melody' with a FACT-commissioned video, announcing Spirit Exit.",
      sourceIds: [S.quietusSpirit, S.wikipedia],
    },
    {
      id: "claim-spirit-exit",
      kind: "fact",
      text: "Spirit Exit, the first release on light-years (LY001), came out on 8 July 2022; it was written and recorded in her Milan home studio during a two-month 2020 lockdown period and was her first album composed in the studio rather than developed on stage, adding vocals, guitar and strings to the synth core.",
      sourceIds: [S.quietusSpirit, S.npr, S.fact2024, S.wikipedia],
    },
    {
      id: "claim-spirit-influences",
      kind: "fact",
      text: "Spirit Exit names as influences St. Teresa of Ávila's sixteenth-century mystical text The Interior Castle, Rosi Braidotti's posthuman theory, and the poetry of Emily Dickinson.",
      sourceIds: [S.quietusSpirit, S.p4kSpirit, S.bandcampDaily],
    },
    {
      id: "claim-barbican-2022",
      kind: "fact",
      text: "On 26 October 2022 she performed Spirit Exit at the Barbican Centre in London on a bill with Nexcyia.",
      sourceIds: [S.barbican, S.wikipedia],
    },
    {
      id: "claim-myuthafoo",
      kind: "fact",
      text: "Myuthafoo, released on light-years (LY003) in June 2023, is a companion album to Ecstatic Computation recorded in the same period and built on the same generative techniques developed for the ER-101 sequencer.",
      sourceIds: [S.p4kMyuthafoo, S.cbBandcamp, S.cbBio],
    },
    {
      id: "claim-ecstatic-reissue",
      kind: "fact",
      text: "In 2023 light-years reissued Ecstatic Computation (LY002) with reworked cover art and the previously unreleased bonus track 'Perennial Fantas' on CD and digital editions.",
      sourceIds: [S.cbBandcamp, S.raLabel, S.p4kMyuthafoo],
    },
    {
      id: "claim-biennale-organ-2024",
      kind: "fact",
      text: "For the 60th Venice Biennale in 2024 she co-composed with Kali Malone a music piece for Massimo Bartolini's organ installation at the Italian Pavilion ('Due qui / To Hear').",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-womb-2024",
      kind: "fact",
      text: "In 2024 she premiered Womb in Paris, a work commissioned by IRCAM and Centre Pompidou for the 350-loudspeaker ESPRO system.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "claim-biennale-director",
      kind: "fact",
      text: "On 5 November 2024 the Board of Directors of La Biennale di Venezia appointed her Artistic Director of the Music Department for the two-year term 2025–2026; she curated Biennale Musica 2025 under the frame of 'cosmic music.'",
      sourceIds: [S.biennaleNews, S.biennaleIntro, S.wikipedia],
    },
    {
      id: "claim-at-source",
      kind: "fact",
      text: "At Source, a four-track collaboration with saxophonist Bendik Giske, was released on light-years (LY009) on 27 February 2026; the collaboration grew from a 2019 meeting at Kunsthaus Glarus and a 2021 residency at ICA Milan.",
      sourceIds: [S.ly009, S.cbBandcamp, S.wikipedia, S.p4kAtSource],
    },
    {
      id: "claim-ems-2026",
      kind: "fact",
      text: "EMS lists her among its guest composers for 2026 — a return to the Stockholm studio where Vertical and Born Again in the Voltage were recorded.",
      sourceIds: [S.emsGuest, S.shape],
    },
    {
      id: "claim-berlin-milan",
      kind: "fact",
      text: "She left Berlin for Milan in 2018 and lived there through the lockdown period in which Spirit Exit was written; institutional biographies from 2025 describe her as Berlin-based again, without pinning down the return date.",
      sourceIds: [S.npr, S.biennaleDirettore, S.mixmag],
    },
    {
      id: "claim-festival-circuit",
      kind: "fact",
      text: "Her festival and venue record includes Unsound, Berlin Atonal, Primavera Sound, Sónar, Dekmantel, CTM, MaerzMusik, Berghain and C2C, and venues such as the Barbican, Centre Pompidou, IRCAM, Ina GRM, Berliner Festspiele, Haus der Kunst, Ruhrtriennale, Philharmonie de Paris and Museo Anahuacalli.",
      sourceIds: [S.wikipedia, S.biennaleDirettore, S.emsGuest],
    },
    {
      id: "claim-pattern-statement",
      kind: "stated_belief",
      text: "She holds that 'a pattern creates a certain state of consciousness': once a pattern exists it stands as an object like the sound waves that generate it, and a change in the pattern perturbs the established field of forces — fracturing consciousness and 'potentially unfolding layers of perceptions we weren't aware of.'",
      sourceIds: [S.cbPatterns, S.fact2018],
    },
    {
      id: "claim-buchla-portal",
      kind: "stated_belief",
      text: "She describes the Buchla 200 encounter as a conversion-like event — 'the control panel acted as a portal of access to a hidden psychic potential', 'better than any psychotherapy' — in which 'it wasn't me playing the music but rather the music playing me.'",
      sourceIds: [S.elevate, S.fact2018, S.digicult],
    },
    {
      id: "claim-minimalism-definition",
      kind: "stated_belief",
      text: "For her, minimalism is 'mostly exploration of repetition, and the psycho-physical effects of repetition': music as process rather than form, where the material changes little but the listening mind changes a great deal.",
      sourceIds: [S.abletonLoop, S.fact2018, S.elevate],
    },
    {
      id: "claim-blurred-source",
      kind: "stated_belief",
      text: "She deliberately avoids iconic, recognisable synth timbres: 'when the listener fails to grasp the source behind a sound, she/he engages with a more active listening attitude' reliant on sound's intrinsic physical properties — 'undressing' sound of its cultural references.",
      sourceIds: [S.sosInterview, S.fact2018],
    },
    {
      id: "claim-machine-feedback",
      kind: "stated_belief",
      text: "She frames composition as 'a feedback process between humans and technology, a negotiation between the design of the technology and the design of the human brain rather than the simple imposition of an idea upon passive matter.'",
      sourceIds: [S.sosInterview, S.elevate],
    },
    {
      id: "claim-not-technical",
      kind: "stated_belief",
      text: "She rejects gear culture outright: 'I've never read a manual. I've never jammed with the modular. I hate this whole modular music scene... for me the approach to these machines is very deep, it's very spiritual.'",
      sourceIds: [S.mixmag, S.digicult],
    },
    {
      id: "claim-living-organism",
      kind: "stated_belief",
      text: "She approaches each piece 'as a living organism' and a generative entity that develops its own laws from performance to performance — 'the more I play, the more I grow with my music' — and regards album versions as 'only one of their many possible incarnations.'",
      sourceIds: [S.zweikommasieben, S.mixmag, S.cbBio],
    },
    {
      id: "claim-voice-extension",
      kind: "stated_belief",
      text: "On Spirit Exit she treats her voice 'as an extension of my modular synthesizer' — a way to 'inject more human energy into the pretty algid, machinic aspect of my work' — after a long process of accepting the vulnerability that singing exposes.",
      sourceIds: [S.barbican, S.fact2024],
    },
    {
      id: "claim-music-portal",
      kind: "stated_belief",
      text: "Composing Spirit Exit in lockdown, she says 'music acted as a kind of perceptual enhancer, a portal. Music has always been a medium for me to expand perceptual horizons' — an escape from 'deprivation and sensorial negation.'",
      sourceIds: [S.fact2024, S.npr],
    },
    {
      id: "claim-cosmic-music",
      kind: "stated_belief",
      text: "Her Biennale Musica 2025 curatorial statement defines 'cosmic music' as no genre but 'the generative power of music to create new worlds', in which 'rigid notions of time and space dissolve' in 'the ecstasy of listening.'",
      sourceIds: [S.biennaleIntro],
    },
    {
      id: "claim-guitar-music",
      kind: "stated_belief",
      text: "She describes her synthesizer work as 'basically guitar music but with synthesizers', and early minimalism and Hindustani classical music as the bridge that led her into electronic music.",
      sourceIds: [S.raEcstatic, S.elevate, S.abletonLoop],
    },
    {
      id: "claim-lightyears-mission",
      kind: "stated_belief",
      text: "She founded light-years to 'make deep listening effortless and explore the transformative, mind-altering potential of music, as well as its socially empowering effects', on values of diversity, inclusivity, co-creation and mutual support — including attention to the environmental impact of physical editions.",
      sourceIds: [S.lyAbout, S.djmag, S.quietusKnot],
    },
    {
      id: "claim-pattern-constraint-expansion",
      kind: "pattern",
      text: "Her records alternate between tightly constrained systems — one oscillator and one sequencer on Patterns of Consciousness, voice and Buchla on Vertical — and deliberate palette expansion (cello on Born Again in the Voltage; vocals, guitar and strings on Spirit Exit), a rhythm of self-imposed limits followed by release.",
      sourceIds: [S.sosInterview, S.fact2024, S.mego259, S.shape],
    },
    {
      id: "claim-pattern-collaborators",
      kind: "pattern",
      text: "A stable circle of collaborators recurs across her catalogue and label: Kali Malone, Bendik Giske, Lyra Pramuk, Evelyn Saylor, Walter Zanetti, Carlo Maria, Ruben Spini and MFO — on Fantas Variations, the light-years showcases, Upper Glossa, Punctum and the 2024 Biennale organ piece.",
      sourceIds: [S.mego279, S.quietusKnot, S.cbUpperGlossa, S.ly009, S.wikipedia],
    },
    {
      id: "claim-pattern-ecstasy-melancholy",
      kind: "pattern",
      text: "Across interviews she repeatedly locates her music in an 'angelic-evil tension — a strange coexistence of ecstasy and melancholia'; critics echo the pairing, reading her work between kosmische euphoria and austere minimalism.",
      sourceIds: [S.fact2018, S.crack, S.p4kSpirit, S.quietusEcstatic],
    },
    {
      id: "claim-pattern-press-time",
      kind: "pattern",
      text: "Press coverage consistently frames her music as time-bending — 'a dreamachine for the ears', music that 'bends time and space around her', 'temporal hallucinations' — language her own label copy and bio now absorb.",
      sourceIds: [S.p4kEcstatic, S.mego259, S.cbBio],
    },
    {
      id: "claim-spec-pseudonym-dance",
      kind: "speculation",
      text: "Asked whether she would make a proper dance record, she answered 'I might do… but with a pseudonym for sure' — a stated possibility, not a confirmed project; no such record is documented as of this index.",
      sourceIds: [S.mixmag],
    },
    {
      id: "claim-spec-rbma",
      kind: "speculation",
      text: "Some secondary bios associate her with the Red Bull Music Academy, and her SHAPE bio lists 'RBMA' among performance contexts, but the published Tokyo 2014 participant roster does not include her name; the documented RBMA link is performing at RBMA-branded events such as the 2017 Bass Camp in Rome.",
      sourceIds: [S.rbmaRoster, S.shape, S.wuma],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1990-09",
      title: "Born in Bologna, Italy",
      summary:
        "Born in Bologna in September 1990; reference sources disagree on the day (14 vs 16 September).",
      location: "Bologna, Italy",
      sourceIds: [S.wikipedia, S.wikidata, S.biennaleDirettore],
    },
    {
      id: "event-guitar-diploma",
      kind: "education",
      date: "2012",
      title: "Classical guitar diploma, Conservatorio G.B. Martini",
      summary:
        "Diploma in classical guitar under Walter Zanetti at the Bologna conservatory.",
      organization: "Conservatorio G.B. Martini",
      location: "Bologna, Italy",
      organizationHandle: "conservatorio-g-b-martini",
      sourceIds: [S.biennaleDirettore, S.emsGuest],
    },
    {
      id: "event-ems-buchla",
      kind: "education",
      date: "2013",
      title: "Exchange study in Stockholm; first encounter with the Buchla 200",
      summary:
        "At the Royal College of Music and Elektronmusikstudion she met the Buchla 200 system — 'that's how all started.'",
      organization: "Elektronmusikstudion / Royal College of Music",
      location: "Stockholm, Sweden",
      sourceIds: [S.sosInterview, S.digicult, S.shape],
    },
    {
      id: "event-electroacoustic-diploma",
      kind: "education",
      date: "2014",
      title: "Electroacoustic composition diploma",
      summary:
        "Diploma in electroacoustic composition with Francesco Giomi at the Conservatorio G.B. Martini.",
      organization: "Conservatorio G.B. Martini",
      location: "Bologna, Italy",
      organizationHandle: "conservatorio-g-b-martini",
      sourceIds: [S.biennaleDirettore, S.emsGuest],
    },
    {
      id: "event-morbida-split",
      kind: "publication",
      date: "2014",
      title: "Morbida / Medicine Bow split release",
      summary:
        "A split album under the alias Morbida with Medicine Bow precedes her solo debut.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-vertical",
      kind: "publication",
      date: "2014-10-08",
      title: "Vertical released on cassette",
      summary:
        "Debut solo album for Buchla 200 and voice, produced at EMS and the Royal College of Music; released by Important Records' Cassauna offshoot.",
      sourceIds: [S.shape, S.cbBio, S.wikipedia],
    },
    {
      id: "event-unibo-degree",
      kind: "education",
      date: "2015",
      title: "Degree in Modern Literature, University of Bologna",
      summary:
        "Thesis in ethnomusicology on the relationship between American minimalism and Hindustani classical music.",
      organization: "University of Bologna",
      location: "Bologna, Italy",
      organizationHandle: "university-of-bologna",
      sourceIds: [S.biennaleDirettore, S.shape],
    },
    {
      id: "event-upper-glossa-atonal",
      kind: "project",
      date: "2016",
      title: "Upper Glossa premieres at Berlin Atonal",
      summary:
        "Her duo with Kali Malone debuts at Atonal; The Wire names it a festival highlight. Begins a long association with the festival.",
      organization: "Berlin Atonal",
      location: "Berlin, Germany",
      organizationHandle: "berlin-atonal",
      sourceIds: [S.cbUpperGlossa, S.wikipedia],
    },
    {
      id: "event-xkatedral-iii",
      kind: "publication",
      date: "2016-10-06",
      title: "'Glory (Final Movement)' on XKatedral Volume III",
      summary:
        "Barbieri & Kali Malone cassette release on Malone's XKatedral series, shared with Ellen Arkbro & Kali Malone's 'Oktober'.",
      sourceIds: [S.xkatedral],
    },
    {
      id: "event-remote-sensing",
      kind: "publication",
      date: "2017-05-02",
      title: "Punctum — Remote Sensing",
      summary:
        "Duo album with Carlo Maria released on the Summe (∑) label; premiered at The Long Now 2017.",
      sourceIds: [S.punctumBandcamp, S.cbPunctum],
    },
    {
      id: "event-patterns",
      kind: "publication",
      date: "2017-05-05",
      title: "Patterns of Consciousness (2LP, Important Records)",
      summary:
        "Breakthrough double album built exclusively on an ER-101 sequencer and a harmonic oscillator; a best-of-2017 pick at The Wire, FACT and Boomkat.",
      sourceIds: [S.imprecPatterns, S.cbPatterns, S.wikipedia],
    },
    {
      id: "event-loop-2017",
      kind: "media",
      date: "2017-11",
      title: "Talk and performance at Ableton Loop, Berlin",
      summary:
        "Conversation with Dennis DeSantis plus a live modular set; video published by Ableton in June 2018.",
      organization: "Ableton Loop",
      location: "Berlin, Germany",
      organizationHandle: "ableton-loop",
      sourceIds: [S.abletonLoop, S.abletonBlog],
    },
    {
      id: "event-rbma-bass-camp",
      kind: "media",
      date: "2017-09-16",
      title: "Performs at RBMA Bass Camp Rome closing night",
      summary:
        "Live set at Ex Dogana for the Red Bull Music Academy Bass Camp, on a bill with Lorenzo Senni — a documented RBMA-branded appearance.",
      location: "Rome, Italy",
      sourceIds: [S.wuma],
    },
    {
      id: "event-born-again",
      kind: "publication",
      date: "2018-08-10",
      title: "Born Again in the Voltage (Important Records)",
      summary:
        "Four electro-acoustic pieces for Buchla 200, voice and cello recorded at EMS in 2014–15.",
      sourceIds: [S.wikipedia, S.p4kBorn],
    },
    {
      id: "event-shape-2018",
      kind: "milestone",
      date: "2018",
      title: "SHAPE platform artist",
      summary: "Named a SHAPE artist for the 2018 annual cycle.",
      organization: "SHAPE platform",
      organizationHandle: "shape-platform",
      sourceIds: [S.shape],
    },
    {
      id: "event-ecstatic-computation",
      kind: "publication",
      date: "2019-05-03",
      title: "Ecstatic Computation (Editions Mego)",
      summary:
        "Debut on Editions Mego; year-end lists at RA, The Quietus and The Wire, and later a Rolling Stone Italia decade pick.",
      sourceIds: [S.mego259, S.wikipedia, S.p4kEcstatic],
    },
    {
      id: "event-warp-publishing",
      kind: "milestone",
      date: "2019",
      title: "Joins the Warp Publishing catalogue",
      summary:
        "Added to the roster of the publisher; later represented for screen composition by Warp Composers.",
      organization: "Warp Publishing",
      organizationHandle: "warp-publishing",
      sourceIds: [S.wikipedia, S.warpJohn],
    },
    {
      id: "event-john-cannes",
      kind: "media",
      date: "2020",
      title: "John and the Hole selected for Cannes 2020",
      summary:
        "Her first feature-film score; the festival's official selection ran without a physical edition during the pandemic.",
      sourceIds: [S.cannesJohn, S.warpJohn],
    },
    {
      id: "event-john-sundance",
      kind: "media",
      date: "2021-01-29",
      title: "John and the Hole premieres at Sundance",
      summary: "World premiere of the Pascual Sisto film she scored.",
      location: "Sundance Film Festival",
      sourceIds: [S.warpJohn, S.wikipedia],
    },
    {
      id: "event-fantas-variations",
      kind: "publication",
      date: "2021-04-02",
      title: "Fantas Variations (Editions Mego)",
      summary:
        "Eight commissioned reworks of 'Fantas' by Malone, Giske, Saylor/Pramuk/Garlid/Janvin, Zanetti, Mitta, Baseck, Maria and Coverdale.",
      sourceIds: [S.mego279, S.wikipedia],
    },
    {
      id: "event-lightyears-founded",
      kind: "founded",
      date: "2021-07",
      title: "Founds the light-years label",
      summary:
        "Independent label platform launched in Milan; first release 'Knot of Spirit' with Lyra Pramuk on 22 July 2021; showcases premiere at Nextones and Draaimolen.",
      sourceIds: [S.quietusKnot, S.djmag, S.lyAbout],
    },
    {
      id: "event-broken-melody",
      kind: "publication",
      date: "2022-04",
      title: "'Broken Melody' single announces Spirit Exit",
      summary:
        "Lead single with a FACT-commissioned visual; the album is announced for July.",
      sourceIds: [S.quietusSpirit, S.wikipedia],
    },
    {
      id: "event-spirit-exit",
      kind: "publication",
      date: "2022-07-08",
      title: "Spirit Exit (light-years, LY001)",
      summary:
        "Written in her Milan home studio during the first 2020 lockdown; her first studio-composed album and the first to feature her own vocals, guitar and strings.",
      sourceIds: [S.quietusSpirit, S.p4kSpirit, S.npr, S.wikipedia],
    },
    {
      id: "event-barbican-2022",
      kind: "milestone",
      date: "2022-10-26",
      title: "Spirit Exit performed at the Barbican, London",
      summary:
        "Headline concert with Nexcyia; the Barbican's digital programme carried a new interview by Jennifer Lucy Allen.",
      organization: "Barbican Centre",
      location: "London, UK",
      organizationHandle: "barbican-centre",
      sourceIds: [S.barbican],
    },
    {
      id: "event-myuthafoo",
      kind: "publication",
      date: "2023-06",
      title: "Myuthafoo (light-years, LY003)",
      summary:
        "Companion album to Ecstatic Computation recorded in the same period on the same ER-101 techniques; release day varies between listings (16 vs 19 June).",
      sourceIds: [S.p4kMyuthafoo, S.cbBandcamp, S.wikipedia],
    },
    {
      id: "event-ecstatic-reissue",
      kind: "publication",
      date: "2023",
      title: "Ecstatic Computation reissued on light-years (LY002)",
      summary:
        "Label reissue with reworked artwork and the bonus track 'Perennial Fantas'.",
      sourceIds: [S.cbBandcamp, S.raLabel],
    },
    {
      id: "event-biennale-organ",
      kind: "exhibition",
      date: "2024-04",
      title: "Organ piece with Kali Malone for the Italian Pavilion",
      summary:
        "Co-composed music for Massimo Bartolini's 'Due qui / To Hear' at the 60th Venice Biennale.",
      organization: "La Biennale di Venezia",
      location: "Venice, Italy",
      organizationHandle: "la-biennale-di-venezia",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-womb",
      kind: "project",
      date: "2024",
      title: "Womb premieres in Paris",
      summary:
        "Commissioned by IRCAM and Centre Pompidou for the 350-loudspeaker ESPRO system.",
      organization: "IRCAM / Centre Pompidou",
      location: "Paris, France",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-biennale-director",
      kind: "role",
      date: "2024-11-05",
      end: "2026",
      title: "Appointed Artistic Director, Music Department, La Biennale di Venezia",
      summary:
        "Appointed by the Board for the 2025–2026 term; curated Biennale Musica 2025 around 'cosmic music.'",
      organization: "La Biennale di Venezia",
      organizationHandle: "la-biennale-di-venezia",
      sourceIds: [S.biennaleNews, S.biennaleIntro],
    },
    {
      id: "event-at-source",
      kind: "publication",
      date: "2026-02-27",
      title: "At Source EP with Bendik Giske (light-years, LY009)",
      summary:
        "Four-track collaboration between analogue synthesis and extended saxophone, rooted in a 2021 ICA Milan residency.",
      sourceIds: [S.ly009, S.cbBandcamp],
    },
  ],
  themes: [
    {
      id: "theme-repetition-psychoactive",
      kind: "philosophy",
      status: "stated",
      title: "Repetition as a psychoactive tool",
      summary:
        "Her core claim: a pattern creates a state of consciousness, and gradual permutation perturbs it — repetition and pattern-based operations are instruments for exploring, reconfiguring and expanding perception, not mere musical material.",
      sourceIds: [S.cbPatterns, S.fact2018, S.abletonLoop, S.mego259],
    },
    {
      id: "theme-time-perception",
      kind: "philosophy",
      status: "stated",
      title: "Music that bends time",
      summary:
        "From the 'temporal hallucinations' of Ecstatic Computation to the 'Becoming Time' interview and her 'ecstasy of listening' curatorial frame, she treats music as a technology for distorting and suspending the listener's sense of time.",
      sourceIds: [S.mego259, S.zweikommasieben, S.biennaleIntro, S.p4kEcstatic],
    },
    {
      id: "theme-machine-relationship",
      kind: "method",
      status: "stated",
      title: "Composition as human–machine feedback",
      summary:
        "She frames composing as a negotiation between the design of the technology and the design of the human brain: generative techniques (ER-101 sequencing, SuperCollider, delay networks) let the machine co-author the music while she listens as much as she plays.",
      sourceIds: [S.sosInterview, S.elevate, S.abletonBlog, S.fact2018],
    },
    {
      id: "theme-voice-as-instrument",
      kind: "practice",
      status: "stated",
      title: "The voice as an extension of the synthesizer",
      summary:
        "Present since Vertical's Buchla-and-voice pieces, the voice moves to the foreground on Spirit Exit — her own singing processed as 'an extension of my modular synthesizer', injecting human vulnerability into the machinic surface.",
      sourceIds: [S.barbican, S.fact2024, S.quietusSpirit, S.cbBio],
    },
    {
      id: "theme-live-organism",
      kind: "practice",
      status: "stated",
      title: "The piece as living organism",
      summary:
        "Live performance is her compositional method: pieces are generative entities that evolve show to show ('the best ideas were surviving and the worst ideas were dying'), and recordings capture only one incarnation.",
      sourceIds: [S.zweikommasieben, S.mixmag, S.cbBio, S.abletonLoop],
    },
    {
      id: "theme-anti-gear-fetish",
      kind: "belief",
      status: "stated",
      title: "Spirituality over gear fetishism",
      summary:
        "She distances herself from modular-synth culture — 'I've never read a manual... I hate this whole modular music scene' — insisting the machine matters as a portal to psychic states, not as technical apparatus.",
      sourceIds: [S.mixmag, S.digicult, S.elevate],
    },
    {
      id: "theme-lineage",
      kind: "influence",
      status: "reported",
      title: "Minimalism, Hindustani music, and heavy sound",
      summary:
        "Reich, La Monte Young and especially Laurie Spiegel are constant comparisons; her ethnomusicology thesis linked American minimalism to Hindustani classical music; and she credits noise and metal shows (Keiji Haino, Sunn O))), Corrupted) plus an Ectoplasm Girls gig for teaching her surrender to sound.",
      sourceIds: [S.elevate, S.fact2018, S.mixmag, S.bandcampDaily, S.shape],
    },
    {
      id: "theme-deep-listening",
      kind: "belief",
      status: "stated",
      title: "Deep listening as a social project",
      summary:
        "light-years is framed not just as a label but a platform: effortless deep listening, transformative and socially empowering music, built on inclusivity, co-creation and mutual support — now extended into her Biennale curation.",
      sourceIds: [S.lyAbout, S.djmag, S.quietusKnot, S.biennaleIntro],
    },
    {
      id: "theme-mysticism",
      kind: "influence",
      status: "reported",
      title: "Mystics, poets and posthumanism",
      summary:
        "Spirit Exit's named influences — Teresa of Ávila, Emily Dickinson, Rosi Braidotti — and the 'cosmic music' frame of her Biennale programme place her synth practice in conversation with mysticism and posthuman thought.",
      sourceIds: [S.quietusSpirit, S.p4kSpirit, S.bandcampDaily, S.biennaleIntro],
    },
  ],
  works: [
    {
      id: "work-vertical",
      kind: "recording",
      status: "released",
      title: "Vertical",
      date: "2014-10-08",
      summary:
        "Debut solo cassette for Buchla 200 and voice, produced at EMS and the Royal College of Music, Stockholm; released on Important Records' Cassauna offshoot.",
      sourceIds: [S.shape, S.cbBio],
    },
    {
      id: "work-morbida-split",
      kind: "recording",
      status: "released",
      title: "Morbida / Medicine Bow (split)",
      date: "2014",
      summary: "Split album under her early alias Morbida.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-xkatedral-iii",
      kind: "recording",
      status: "released",
      title: "XKatedral Volume III — 'Glory (Final Movement)'",
      date: "2016-10-06",
      summary:
        "Cassette on the XKatedral series shared with Ellen Arkbro and Kali Malone; carries Barbieri & Malone's 'Glory'.",
      sourceIds: [S.xkatedral],
    },
    {
      id: "work-remote-sensing",
      kind: "recording",
      status: "released",
      title: "Remote Sensing (as Punctum, with Carlo Maria)",
      date: "2017-05-02",
      summary:
        "TB-303/TR-606 stripped to brutal minimalism through delay lines and Buchla 200; released on Summe (∑ 8).",
      sourceIds: [S.punctumBandcamp, S.cbPunctum],
    },
    {
      id: "work-patterns",
      kind: "recording",
      status: "released",
      title: "Patterns of Consciousness",
      date: "2017-05-05",
      summary:
        "Breakthrough double LP on Important Records, composed solely with an ER-101 sequencer and harmonic oscillator.",
      sourceIds: [S.imprecPatterns, S.cbPatterns],
    },
    {
      id: "work-born-again",
      kind: "recording",
      status: "released",
      title: "Born Again in the Voltage",
      date: "2018-08-10",
      summary:
        "Important Records LP of EMS recordings (2014–15) for Buchla 200, voice and cello.",
      sourceIds: [S.wikipedia, S.p4kBorn],
    },
    {
      id: "work-ecstatic-computation",
      kind: "recording",
      status: "released",
      title: "Ecstatic Computation",
      date: "2019-05-03",
      summary:
        "Editions Mego debut; her most acclaimed record, source of the oft-reworked 'Fantas'.",
      sourceIds: [S.mego259, S.p4kEcstatic],
    },
    {
      id: "work-john-and-the-hole",
      kind: "other",
      status: "released",
      title: "John and the Hole (original score)",
      date: "2021",
      summary:
        "Feature-film score for Pascual Sisto's drama; Cannes 2020 official selection, Sundance premiere January 2021.",
      sourceIds: [S.cannesJohn, S.warpJohn],
    },
    {
      id: "work-fantas-variations",
      kind: "recording",
      status: "released",
      title: "Fantas Variations",
      date: "2021-04-02",
      summary:
        "Editions Mego album of eight commissioned reworks of 'Fantas' by friends and collaborators across instruments and genres.",
      sourceIds: [S.mego279],
    },
    {
      id: "work-knot-of-spirit",
      kind: "recording",
      status: "released",
      title: "Knot of Spirit (with Lyra Pramuk)",
      date: "2021-07-22",
      summary:
        "The first light-years release; a synth version later closed Spirit Exit.",
      sourceIds: [S.quietusKnot, S.djmag],
    },
    {
      id: "work-spirit-exit",
      kind: "recording",
      status: "released",
      title: "Spirit Exit",
      date: "2022-07-08",
      summary:
        "First album on her own light-years (LY001); lockdown-written in Milan, adding voice, guitar and strings.",
      sourceIds: [S.quietusSpirit, S.p4kSpirit, S.npr],
    },
    {
      id: "work-myuthafoo",
      kind: "recording",
      status: "released",
      title: "Myuthafoo",
      date: "2023-06",
      summary:
        "Companion to Ecstatic Computation on light-years (LY003); instrumental ER-101 pieces refined through touring.",
      sourceIds: [S.p4kMyuthafoo, S.cbBandcamp],
    },
    {
      id: "work-ecstatic-reissue",
      kind: "recording",
      status: "released",
      title: "Ecstatic Computation (light-years reissue)",
      date: "2023",
      summary:
        "LY002 reissue with reworked cover and the bonus track 'Perennial Fantas'.",
      sourceIds: [S.cbBandcamp, S.raLabel],
    },
    {
      id: "work-at-source",
      kind: "recording",
      status: "released",
      title: "At Source (with Bendik Giske)",
      date: "2026-02-27",
      summary:
        "Four-track light-years EP (LY009) for analogue synthesis and extended saxophone.",
      sourceIds: [S.ly009, S.cbBandcamp],
    },
    {
      id: "work-upper-glossa",
      kind: "project",
      status: "ongoing",
      title: "Upper Glossa (with Kali Malone)",
      date: "2016",
      summary:
        "Duo for electric guitars and synthesis ('Fundament'); premiered at Berlin Atonal 2016.",
      sourceIds: [S.cbUpperGlossa],
    },
    {
      id: "work-time-blind",
      kind: "project",
      status: "completed",
      title: "Time-blind (with Ruben Spini)",
      summary:
        "Audiovisual show with the visual artist, part of her long Berlin Atonal association and later festival touring.",
      sourceIds: [S.wikipedia, S.cbBio],
    },
    {
      id: "work-womb",
      kind: "project",
      status: "completed",
      title: "Womb",
      date: "2024",
      summary:
        "Work for the 350-loudspeaker ESPRO system, commissioned by IRCAM and Centre Pompidou, premiered in Paris.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-lightyears",
      kind: "project",
      status: "ongoing",
      title: "light-years",
      date: "2021",
      summary:
        "Her independent label platform; beyond her own records it has released Marta De Pascalis, Grand River & Abul Mogard, Ludwig Wandinger, Maxime Denuc and Walter Zanetti, plus curated showcases at Centre Pompidou, Southbank Centre and Berlin Atonal.",
      sourceIds: [S.lyAbout, S.raLabel, S.emsGuest],
    },
  ],
  appearances: [
    {
      id: "appearance-digicult",
      title: "Caterina Barbieri: new tactics for electronic mutants",
      venue: "Digicult",
      publishedAt: "2016-05-13",
      participants: ["Caterina Barbieri"],
      summary:
        "Early interview on the 2013 Buchla encounter and her anti-fetish stance toward synthesizers.",
      media: [
        {
          type: "article",
          url: "https://digicult.it/news/caterina-barbieri-new-tactics-for-electronic-mutants/",
          sourceId: S.digicult,
        },
      ],
      sourceIds: [S.digicult],
    },
    {
      id: "appearance-sos",
      title: "Interview: minimalist electronic artist Caterina Barbieri",
      venue: "Sound on Sound",
      publishedAt: "2017-07-31",
      participants: ["Caterina Barbieri"],
      summary:
        "On the Royal College of Music Buchla encounter, blurred sound sources, and composition as human–technology feedback.",
      media: [
        {
          type: "article",
          url: "https://www.soundonsound.com/news/interview-minimalist-electronic-artist-caterina-barbieri",
          sourceId: S.sosInterview,
        },
      ],
      sourceIds: [S.sosInterview],
    },
    {
      id: "appearance-loop",
      title: "A performative presentation with Caterina Barbieri",
      venue: "Ableton Loop, Berlin",
      publishedAt: "2018-06-13",
      participants: ["Caterina Barbieri", "Dennis DeSantis"],
      summary:
        "Loop 2017 talk on minimalism as process plus a live modular performance; published June 2018.",
      media: [
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=nxECAD3NwQE",
          sourceId: S.abletonLoop,
        },
      ],
      sourceIds: [S.abletonLoop, S.abletonBlog],
    },
    {
      id: "appearance-fact-signal-path",
      title: "Signal Path: on synthesis, minimalism and living organisms of sound",
      venue: "FACT Magazine",
      publishedAt: "2018-07-08",
      participants: ["Caterina Barbieri", "Scott Wilson"],
      summary:
        "FACT's Signal Path interview — the source of her most-quoted statements on patterns and consciousness; preserved via the Wayback Machine.",
      media: [
        {
          type: "article",
          url: "https://web.archive.org/web/20180708191652/http://www.factmag.com/2018/07/08/caterina-barbieri-signal-path/",
          sourceId: S.fact2018,
        },
      ],
      sourceIds: [S.fact2018],
    },
    {
      id: "appearance-elevate",
      title: "Composing a machine",
      venue: "Elevate Festival",
      publishedAt: "2018",
      participants: ["Caterina Barbieri", "Shilla Strelka"],
      summary:
        "Festival interview on the Buchla as portal, minimalism as bridge to electronic music, and machine authorship.",
      media: [
        {
          type: "article",
          url: "https://elevate.at/websites/2018/en/details/news/composing-a-machine/index.html",
          sourceId: S.elevate,
        },
      ],
      sourceIds: [S.elevate],
    },
    {
      id: "appearance-ra-feature",
      title: "Caterina Barbieri: Ecstatic computation",
      venue: "Resident Advisor",
      publishedAt: "2019-01-10",
      participants: ["Caterina Barbieri", "Maya-Roisin Slater"],
      summary:
        "RA's long-form feature on her creative process ahead of Ecstatic Computation.",
      media: [
        {
          type: "article",
          url: "https://ra.co/features/3385",
          sourceId: S.raFeature,
        },
      ],
      sourceIds: [S.raFeature],
    },
    {
      id: "appearance-zweikommasieben",
      title: "Becoming Time",
      venue: "zweikommasieben Magazin #19",
      publishedAt: "2019",
      participants: ["Caterina Barbieri", "Mathis Neuhaus"],
      summary:
        "Milan interview on liveness, real-time generation as sacred, and time as the leitmotif of her practice.",
      media: [
        {
          type: "article",
          url: "https://zweikommasieben.ch/articles/interviews/caterina-barbieri-becoming-time",
          sourceId: S.zweikommasieben,
        },
      ],
      sourceIds: [S.zweikommasieben],
    },
    {
      id: "appearance-nextones",
      title: "light-years showcase premiere at Nextones Festival",
      venue: "Nextones Festival",
      publishedAt: "2021-07-31",
      participants: ["Caterina Barbieri", "Bendik Giske", "Nkisi", "MFO"],
      summary:
        "World premiere of the label's curated showcase format, reported by FACT.",
      media: [
        {
          type: "article",
          url: "https://www.factmag.com/2021/07/31/nextones-festival-2021-caterina-barbieri-light-years/",
          sourceId: S.factNextones,
        },
      ],
      sourceIds: [S.factNextones],
    },
    {
      id: "appearance-npr",
      title: "Caterina Barbieri's rapturous electronica was forged in deep solitude",
      venue: "NPR",
      publishedAt: "2022-07-09",
      participants: ["Caterina Barbieri"],
      summary:
        "Feature interview on writing Spirit Exit in a locked-down Milan apartment.",
      media: [
        {
          type: "article",
          url: "https://www.npr.org/2022/07/09/1110267969/caterina-barbieris-rapturous-electronica-was-forged-in-deep-solitude",
          sourceId: S.npr,
        },
      ],
      sourceIds: [S.npr],
    },
    {
      id: "appearance-barbican",
      title: "Caterina Barbieri + Nexcyia at the Barbican",
      venue: "Barbican Centre, London",
      publishedAt: "2022-10-26",
      participants: ["Caterina Barbieri", "Nexcyia", "Jennifer Lucy Allen"],
      summary:
        "Spirit Exit concert with a programme interview by Jennifer Lucy Allen on voice, vulnerability and the album's genesis.",
      media: [
        {
          type: "article",
          url: "https://www.barbican.org.uk/digital-programmes/caterina-barbieri-nexcyia-digital-programme",
          sourceId: S.barbican,
        },
      ],
      sourceIds: [S.barbican],
    },
    {
      id: "appearance-mixmag",
      title: "Modular mystic: unlocking the spirituality in synths",
      venue: "Mixmag",
      participants: ["Caterina Barbieri", "Chal Ravens"],
      summary:
        "Cover feature on imposing spaces, her disdain for the 'modular music scene', and the pseudonymous dance-record idea.",
      media: [
        {
          type: "article",
          url: "https://mixmag.net/feature/caterina-barbieri-cover-feature-interview-analogue-modular-synths-spiritual",
          sourceId: S.mixmag,
        },
      ],
      sourceIds: [S.mixmag],
    },
    {
      id: "appearance-fact-2024",
      title: "Interview: Caterina Barbieri (light-years)",
      venue: "FACT Magazine",
      publishedAt: "2024-01-12",
      participants: ["Caterina Barbieri"],
      summary:
        "On the light-years project, expanding perceptual horizons, and Spirit Exit as her most personal album.",
      media: [
        {
          type: "article",
          url: "https://www.factmag.com/2024/01/12/interview-caterina-barbieri/",
          sourceId: S.fact2024,
        },
      ],
      sourceIds: [S.fact2024],
    },
  ],
  relations: [
    {
      id: "rel-light-years",
      kind: "founded",
      target: "light-years",
      targetName: "light-years",
      targetKind: "organization",
      note: "Founded the independent label/platform in July 2021; its first release was 'Knot of Spirit' with Lyra Pramuk.",
      start: "2021-07",
      sourceIds: [S.quietusKnot, S.djmag, S.lyAbout, S.raLabel],
    },
    {
      id: "rel-la-biennale-di-venezia",
      kind: "employed_by",
      target: "la-biennale-di-venezia",
      targetName: "La Biennale di Venezia",
      targetKind: "organization",
      note: "Appointed Artistic Director of the Music Department on 5 November 2024 for the 2025–2026 term; curated Biennale Musica 2025.",
      start: "2025",
      end: "2026",
      targetWikidataId: "Q205751",
      sourceIds: [S.biennaleNews, S.biennaleIntro, S.biennaleDirettore],
    },
    {
      id: "rel-warp-publishing",
      kind: "member_of",
      target: "warp-publishing",
      targetName: "Warp Publishing / Warp Composers",
      targetKind: "organization",
      note: "Added to the publishing catalogue in 2019; represented for film and media composition by Warp Composers.",
      start: "2019",
      sourceIds: [S.wikipedia, S.warpJohn],
    },
    {
      id: "rel-kali-malone",
      kind: "collaborated",
      target: "kali-malone",
      targetName: "Kali Malone",
      note: "The Upper Glossa duo (premiered Berlin Atonal 2016), 'Glory (Final Movement)' on XKatedral Vol. III, and the 2024 Venice Biennale co-composition for Massimo Bartolini's organ installation.",
      targetWikidataId: "Q79786367",
      sourceIds: [S.cbUpperGlossa, S.xkatedral, S.wikipedia],
    },
    {
      id: "rel-bendik-giske",
      kind: "collaborated",
      target: "bendik-giske",
      targetName: "Bendik Giske",
      note: "The At Source EP (light-years LY009, 2026), grown from a 2019 Kunsthaus Glarus meeting and a 2021 ICA Milan residency; also a Fantas Variations rework.",
      targetWikidataId: "Q110969673",
      sourceIds: [S.ly009, S.factNextones],
    },
    {
      id: "rel-lyra-pramuk",
      kind: "collaborated",
      target: "lyra-pramuk",
      targetName: "Lyra Pramuk",
      note: "'Knot of Spirit' (2021) — the first light-years release — and a Fantas Variations rework with Evelyn Saylor.",
      targetWikidataId: "Q135012897",
      sourceIds: [S.quietusKnot, S.djmag, S.mego279],
    },
    {
      id: "rel-carlo-maria",
      kind: "collaborated",
      target: "carlo-maria",
      targetName: "Carlo Maria",
      note: "The Punctum duo — Remote Sensing (Summe, 2017) — and a Fantas Variations rework.",
      sourceIds: [S.punctumBandcamp, S.cbPunctum, S.wikipedia],
    },
    {
      id: "rel-antonello-manzo",
      kind: "collaborated",
      target: "antonello-manzo",
      targetName: "Antonello Manzo",
      note: "Cello on Born Again in the Voltage (Important Records, 2018).",
      sourceIds: [S.p4kBorn, S.wikipedia, S.cbBandcamp],
    },
    {
      id: "rel-evelyn-saylor",
      kind: "collaborated",
      target: "evelyn-saylor",
      targetName: "Evelyn Saylor",
      note: "Vocals on 'Arrows of Time' (Ecstatic Computation) and a Fantas Variations rework.",
      sourceIds: [S.mego259, S.mego279],
    },
    {
      id: "rel-annie-garlid",
      kind: "collaborated",
      target: "annie-garlid",
      targetName: "Annie Gårlid",
      note: "Vocals on 'Arrows of Time' (Ecstatic Computation) and a Fantas Variations rework.",
      sourceIds: [S.mego259, S.mego279],
    },
    {
      id: "rel-stine-janvin",
      kind: "collaborated",
      target: "stine-janvin",
      targetName: "Stine Janvin",
      note: "Contributed a rework to Fantas Variations (Editions Mego, 2021).",
      targetWikidataId: "Q52635982",
      sourceIds: [S.mego279],
    },
    {
      id: "rel-jay-mitta",
      kind: "collaborated",
      target: "jay-mitta",
      targetName: "Jay Mitta",
      note: "Contributed a rework to Fantas Variations (Editions Mego, 2021).",
      sourceIds: [S.mego279],
    },
    {
      id: "rel-baseck",
      kind: "collaborated",
      target: "baseck",
      targetName: "Baseck",
      note: "Contributed a rework to Fantas Variations (Editions Mego, 2021).",
      sourceIds: [S.mego279],
    },
    {
      id: "rel-kara-lis-coverdale",
      kind: "collaborated",
      target: "kara-lis-coverdale",
      targetName: "Kara-Lis Coverdale",
      note: "Contributed a rework to Fantas Variations (Editions Mego, 2021).",
      targetWikidataId: "Q20740744",
      sourceIds: [S.mego279],
    },
    {
      id: "rel-pascual-sisto",
      kind: "collaborated",
      target: "pascual-sisto",
      targetName: "Pascual Sisto",
      note: "Composed the score for his film John and the Hole, a 2020 Cannes official selection that premiered at Sundance 2021.",
      sourceIds: [S.cannesJohn, S.warpJohn],
    },
    {
      id: "rel-walter-zanetti",
      kind: "mentored_by",
      target: "walter-zanetti",
      targetName: "Walter Zanetti",
      note: "Her classical-guitar teacher at the Conservatorio G.B. Martini; later a Fantas Variations contributor.",
      sourceIds: [S.biennaleDirettore, S.wikipedia, S.fact2018],
    },
    {
      id: "rel-francesco-giomi",
      kind: "mentored_by",
      target: "francesco-giomi",
      targetName: "Francesco Giomi",
      note: "Her electroacoustic-composition teacher at the Conservatorio G.B. Martini.",
      targetWikidataId: "Q3750048",
      sourceIds: [S.biennaleDirettore, S.emsGuest, S.wikipedia],
    },
    {
      id: "rel-teresa-of-avila",
      kind: "influenced_by",
      target: "teresa-of-avila",
      targetName: "St. Teresa of Ávila",
      note: "Spirit Exit names her sixteenth-century mystical text The Interior Castle as an influence.",
      targetWikidataId: "Q174880",
      sourceIds: [S.quietusSpirit, S.p4kSpirit],
    },
    {
      id: "rel-rosi-braidotti",
      kind: "influenced_by",
      target: "rosi-braidotti",
      targetName: "Rosi Braidotti",
      note: "Spirit Exit names Braidotti's posthuman theory as an influence.",
      targetWikidataId: "Q2662864",
      sourceIds: [S.quietusSpirit, S.p4kSpirit],
    },
    {
      id: "rel-emily-dickinson",
      kind: "influenced_by",
      target: "emily-dickinson",
      targetName: "Emily Dickinson",
      note: "Spirit Exit names her poetry as an influence.",
      targetWikidataId: "Q4441",
      sourceIds: [S.quietusSpirit, S.p4kSpirit, S.bandcampDaily],
    },
    {
      id: "rel-maya-roisin-slater",
      kind: "interviewed_by",
      target: "maya-roisin-slater",
      targetName: "Maya-Roisin Slater",
      note: "Resident Advisor feature, January 2019.",
      sourceIds: [S.raFeature],
    },
    {
      id: "rel-mathis-neuhaus",
      kind: "interviewed_by",
      target: "mathis-neuhaus",
      targetName: "Mathis Neuhaus",
      note: "zweikommasieben #19 interview, 2019.",
      sourceIds: [S.zweikommasieben],
    },
    {
      id: "rel-shilla-strelka",
      kind: "interviewed_by",
      target: "shilla-strelka",
      targetName: "Shilla Strelka",
      note: "Elevate Festival interview, 2018.",
      sourceIds: [S.elevate],
    },
    {
      id: "rel-chal-ravens",
      kind: "interviewed_by",
      target: "chal-ravens",
      targetName: "Chal Ravens",
      note: "Mixmag cover feature.",
      sourceIds: [S.mixmag],
    },
    {
      id: "rel-jennifer-lucy-allen",
      kind: "interviewed_by",
      target: "jennifer-lucy-allen",
      targetName: "Jennifer Lucy Allen",
      note: "Barbican programme interview, October 2022.",
      sourceIds: [S.barbican],
    },
    {
      id: "rel-scott-wilson",
      kind: "interviewed_by",
      target: "scott-wilson",
      targetName: "Scott Wilson",
      note: "FACT Signal Path interview, July 2018.",
      sourceIds: [S.fact2018],
    },
    {
      id: "rel-dennis-desantis",
      kind: "interviewed_by",
      target: "dennis-desantis",
      targetName: "Dennis DeSantis",
      note: "Ableton Loop 2017 conversation.",
      sourceIds: [S.abletonLoop],
    },
  ],
  openQuestions: [
    "Birth date disagreement: English Wikipedia and her cited Instagram birthday post give 14 September 1990, while Wikidata (via AllMusic) gives 16 September 1990. The day is unresolved in the record.",
    "The 'RBMA Tokyo 2014 alum' claim repeated in secondary material is unverified: the published participant roster does not list her, and the documented RBMA connection is performing at RBMA-branded events (Bass Camp Rome 2017; a shared bill with Aphex Twin at Red Bull Music Festival London 2019).",
    "Release-day details vary: Myuthafoo is listed as 16 or 19 June 2023 depending on the source (her own Bandcamp pre-release text said June 2), and Vertical is variously credited to 'Important Records' and to its Cassauna cassette offshoot.",
    "Her English Wikipedia article carries a promotional-content notice (March 2026) and its Education section is uncited; education details here are anchored to the La Biennale and EMS institutional bios instead.",
    "Residential chronology is loose: she left Berlin for Milan in 2018 and was Milan-based through 2022; current bios say Berlin-based, but the move back is undated.",
    "Degree nomenclature differs across sources — conservatory diplomas vs bachelor's/master's framings — and her CV PDF is not machine-readable in this pass; exact credential titles could be refined.",
    "Coverage does not include a full concert chronology or the light-years catalogue beyond headline releases; the label's roster (Marta De Pascalis, Grand River & Abul Mogard, Ludwig Wandinger, Maxime Denuc, Walter Zanetti) is only summarised.",
  ],
  body: `Caterina Barbieri is an Italian composer who has built a decade-long practice around a single wager: that repetition, patiently permuted, can alter the listener's consciousness. Working primarily with modular synthesis — first the Buchla 200, then an ER-101 sequencer driving a harmonic oscillator — she makes music the press variously calls a "dreamachine for the ears" and a means to "bend time and space" (Pitchfork). Born in Bologna in September 1990, she is based in Berlin and, since November 2024, serves as Artistic Director of the Music Department of La Biennale di Venezia for 2025–2026.

## Formation

Barbieri's route to electronic music ran through the classical guitar. She earned a diploma in the instrument at the Conservatorio G.B. Martini in Bologna in 2012 under Walter Zanetti — a teacher who would later resurface as a collaborator on Fantas Variations — while spending her nights at noise and metal shows: Keiji Haino, Prurient, Corrupted, Sunn O))). An Erasmus exchange took her to Stockholm, where study at the Royal College of Music and the storied Elektronmusikstudion (EMS) put her in front of a Buchla 200 in 2013. She describes the encounter in near-religious terms: "the control panel acted as a portal of access to a hidden psychic potential"; "the Buchla taught me a way of listening to sound that years of training in classical music never taught me." A second G.B. Martini diploma in electroacoustic composition followed in 2014, and a University of Bologna degree in Modern Literature in 2015, with an ethnomusicology thesis on American minimalism and Hindustani classical music — the two traditions she still names as her bridge into electronics.

## The records

Her solo debut *Vertical* (2014) — Buchla 200 and voice, recorded at EMS — appeared on cassette via Important Records' Cassauna offshoot. The breakthrough came three years later: *Patterns of Consciousness* (Important Records, May 2017), a double LP composed exclusively with an ER-101 quad sequencer and a single Verbos Harmonic Oscillator, wringing illusory counterpoint and baroque-lute arpeggiation from a deliberately starved palette. It landed on best-of-2017 lists at The Wire, FACT and Boomkat. *Born Again in the Voltage* (Important, 2018) reached further back — EMS recordings from 2014–15 with cello and voice — before *Ecstatic Computation* (Editions Mego, May 2019) delivered her most acclaimed statement: six tracks led by the ten-minute "Fantas", framed by the label as computation turned into "a creative, psychedelic practice to generate temporal hallucinations."

The catalogue then deliberately multiplies outward. *Fantas Variations* (Editions Mego, 2021) handed "Fantas" to eight collaborators — Kali Malone's two-organ requiem, Bendik Giske's saxophone-and-voice transcription, Walter Zanetti's electric guitar, Jay Mitta's singeli version, and ensemble and electronic reworkings by Evelyn Saylor with Lyra Pramuk, Annie Garlid and Stine Janvin, Baseck, Carlo Maria and Kara-Lis Coverdale — treating the remix album as what the label copy calls "active and collective re-imagination." In July 2021 she founded her own platform, light-years, inaugurating it with "Knot of Spirit" featuring Lyra Pramuk and a series of curated showcases (Nextones, Draaimolen, later Centre Pompidou, Southbank Centre and Berlin Atonal). *Spirit Exit* (light-years, July 2022), written in a two-month Milan lockdown in early 2020, was her first album composed in the studio and the first to carry her own voice, guitar and strings — "less minimalist, more maximalist," she told FACT, with St. Teresa of Ávila, Emily Dickinson and Rosi Braidotti as named presences. *Myuthafoo* (2023) is a companion piece to Ecstatic Computation recorded in the same period on the same ER-101 techniques; the label reissued Ecstatic Computation the same year with the bonus track "Perennial Fantas." A four-track EP with Bendik Giske, *At Source* (LY009), followed in February 2026, and EMS lists her among its guest composers for 2026 — a return to the studio where her first records were made.

## The practice and the ideas

Three commitments recur across her interviews. First, repetition as psychoactive instrument: "a pattern creates a certain state of consciousness," she writes of the Patterns album; change the pattern and you perturb the field of forces holding the listener's attention — the music's subject is the change in the listener, not in the material. Second, composition as human–machine feedback: generative sequencing, delay networks and SuperCollider make the instrument a co-author, "a negotiation between the design of the technology and the design of the human brain." Third, an explicit refusal of gear culture — "I've never read a manual. I've never jammed with the modular. I hate this whole modular music scene" — the machine matters as a spiritual portal, not as apparatus.

She treats pieces as "living organisms" that develop on stage and records as snapshots of a process; critics oblige by reading her work between kosmische euphoria and austere minimalism, an "angelic-evil tension" she has named herself. Since Spirit Exit she has extended the synthesis to her own voice — "an extension of my modular synthesizer" — and to curation: her Biennale Musica 2025 statement frames "cosmic music" not as a genre but as "the generative power of music to create new worlds", in which "the ecstasy of listening" dissolves rigid notions of time and space.

## Collaborations and context

Her circle is unusually stable: Kali Malone (the Upper Glossa duo premiered at Berlin Atonal 2016, "Glory" on the XKatedral cassette, the two-organ Fantas variation, and a co-composed piece for Massimo Bartolini's organ at the 2024 Venice Biennale's Italian Pavilion), Bendik Giske, Lyra Pramuk, Evelyn Saylor, Carlo Maria (Punctum's *Remote Sensing*, 2017), Walter Zanetti, and visual collaborators Ruben Spini (the *Time-blind* AV show) and Marcel Weber/MFO. In 2019 she joined the Warp Publishing catalogue; her first feature score, for Pascual Sisto's *John and the Hole*, was a Cannes 2020 official selection that premiered at Sundance in January 2021.

## What the record does not settle

The seams are small but real. Reference sources disagree on her birthday (14 vs 16 September 1990); release-day details drift by a few days across listings; and the "RBMA Tokyo alum" tag that travels with her bio does not match the academy's published Tokyo 2014 roster — the documented link is performing at RBMA-branded events. Her Wikipedia article carries a promotional-content notice, so education details here lean on the La Biennale and EMS institutional bios.

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
