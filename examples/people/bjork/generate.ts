#!/usr/bin/env bun
/** Generate examples/people/bjork/person-index.json with derived source ids. */

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

// --- Subject-controlled -------------------------------------------------

const bjorkcom = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "björk",
  url: "https://www.bjork.com/",
  publisher: "bjork.com",
  notes: "The subject's official site; links her verified social accounts.",
});
const fossora = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "fossora | björk — atopos",
  url: "https://www.fossora.com/atopos",
  publisher: "fossora.com",
  publishedAt: "2022",
  notes:
    "Her own first-person notes on the Fossora lead single: the bass-clarinet ensemble, the mushroom metaphor, and the Icelandic video team.",
});
const bandcampMedulla = source({
  binding: "subject_controlled",
  mediaType: "webpage",
  title: "Medúlla | Björk",
  url: "https://bjork.bandcamp.com/album/med-lla",
  publisher: "Bandcamp",
  publishedAt: "2004-08-30",
  notes: "Her official Bandcamp; carries the album's release data and credits.",
});

// --- Archive ------------------------------------------------------------

const sagaBjarkar = source({
  binding: "archive",
  mediaType: "webpage",
  title: "SAGA BJARKAR — short biography of Björk",
  url: "https://web.archive.org/web/20121004135157/http:/unit.bjork.com/specials/ui/sagabjarkar/index.html",
  publisher: "bjork.com via Internet Archive",
  notes:
    "Wayback capture of the official bjork.com biography; self-reported life details.",
});
const savingIceland = source({
  binding: "archive",
  mediaType: "article",
  title: "Björk: After Financial Meltdown, Now it's Smeltdown",
  url: "https://www.savingiceland.org/2008/10/after-financial-meltdown-now-its-smeltdown/",
  publisher: "Saving Iceland",
  publishedAt: "2008-10",
  authors: ["Björk"],
  notes:
    "Rehosted first-person op-ed originally published in The Times (London); sets out her case against foreign-backed aluminium smelters.",
});

// --- First person --------------------------------------------------------

const talkhouse = source({
  binding: "first_person",
  mediaType: "article",
  title: "Announcing Björk: Sonic Symbolism",
  url: "https://www.talkhouse.com/announcing-bjork-sonic-symbolism/",
  publisher: "Talkhouse",
  publishedAt: "2022-08",
  notes:
    "Announcement carrying Björk's own statement describing the podcast's 'sonic symbolism' premise.",
});
const appleSonic = source({
  binding: "first_person",
  mediaType: "audio",
  title: "Björk: Sonic Symbolism",
  url: "https://podcasts.apple.com/us/podcast/bj%C3%B6rk-sonic-symbolism/id1641171534",
  publisher: "Apple Podcasts / Talkhouse / Mailchimp",
  publishedAt: "2022",
  notes:
    "Her retrospective podcast: one episode per album in conversation with Oddný Eir and Ásmundur Jónsson.",
});

// --- Interviews ----------------------------------------------------------

const pfBiophilia = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk (Biophilia interview)",
  url: "https://pitchfork.com/features/interview/7996-bjork/",
  publisher: "Pitchfork",
  publishedAt: "2011",
  notes:
    "On writing the album on Lemur and Reactable touchscreens carried over from the Volta tour, and the custom instruments.",
});
const pf15years = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk: 15 Years",
  url: "https://pitchfork.com/features/interview/8019-bjork-15-years/",
  publisher: "Pitchfork",
  publishedAt: "2011",
  authors: ["Brandon Stosuy"],
  notes:
    "Career-spanning interview; the interviewer discloses having written her Biophilia press bio.",
});
const pfVolta = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk (Volta-era interview)",
  url: "https://pitchfork.com/features/interview/6592-bjork/",
  publisher: "Pitchfork",
  publishedAt: "2007",
});
const pfVulnicura = source({
  binding: "interview",
  mediaType: "article",
  title: "The Invisible Woman: A Conversation With Björk",
  url: "https://pitchfork.com/features/interview/9582-the-invisible-woman-a-conversation-with-bjork/",
  publisher: "Pitchfork",
  publishedAt: "2015-03",
  authors: ["Jessica Hopper"],
});
const pfUtopia = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk Is Full of Love Again",
  url: "https://pitchfork.com/features/interview/bjork-is-full-of-love-again/",
  publisher: "Pitchfork",
  publishedAt: "2017-11",
});
const pfFossora = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk on her new album Fossora, Iceland, mushrooms, and more",
  url: "https://pitchfork.com/features/cover-story/bjork-interview/",
  publisher: "Pitchfork",
  publishedAt: "2022-09",
});
const pfNattura = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk Reveals All About 'Náttúra'",
  url: "https://pitchfork.com/news/33792-bjork-reveals-all-about-nattura/",
  publisher: "Pitchfork",
  publishedAt: "2008-10",
});
const guardianUtopia = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Björk: 'People miss the jokes. A lot of it is me taking the piss out of myself'",
  url: "https://www.theguardian.com/music/2017/nov/12/bjork-utopia-interview-people-miss-the-jokes",
  publisher: "The Guardian",
  publishedAt: "2017-11-12",
});
const guardianFossora = source({
  binding: "interview",
  mediaType: "article",
  title:
    "'I got really grounded and loved it': how grief, going home and gabber built Björk's new album",
  url: "https://www.theguardian.com/music/2022/aug/19/i-got-really-grounded-and-loved-it-how-grief-going-home-and-gabber-built-bjorks-new-album",
  publisher: "The Guardian",
  publishedAt: "2022-08-19",
});
const nytUtopia = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk's New Album Is a Love Letter to Optimism",
  url: "https://www.nytimes.com/2017/11/14/arts/music/bjork-utopia-interview.html",
  publisher: "The New York Times",
  publishedAt: "2017-11-14",
  authors: ["Jon Pareles"],
});
const nprUtopia = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk Invites You To Her 'Utopia'",
  url: "https://www.npr.org/2017/11/20/563290559/bj-rk-invites-you-to-her-utopia",
  publisher: "NPR",
  publishedAt: "2017-11-20",
  notes: "Conversation with Rachel Martin; includes an edited transcript.",
});
const dazedAppy = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk: Violently Appy",
  url: "https://www.dazeddigital.com/music/article/11007/1/bjork-violently-appy",
  publisher: "Dazed",
  publishedAt: "2011-07-28",
});
const dazedUnravelled = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk Unravelled",
  url: "https://www.dazeddigital.com/music/article/36971/1/bjork-jesse-kanda-questions",
  publisher: "Dazed",
  publishedAt: "2017-08-08",
  notes:
    "Autumn 2017 cover feature in which collaborators and luminaries (Arca, Gondry, Obrist, Eileen Myles, Haxan Cloak) put questions to her.",
});
const dazed2026 = source({
  binding: "interview",
  mediaType: "article",
  title:
    "Björk on nature, new music and working with AI: 'I'm a digital craftswoman'",
  url: "https://www.dazeddigital.com/music/article/70555/1/bjrk-on-nature-new-music-and-working-with-ai-im-a-digital-craftswoman",
  publisher: "Dazed",
  publishedAt: "2026-06-29",
});
const rsMedulla = source({
  binding: "interview",
  mediaType: "article",
  title: "Björk on Making 'Medulla'",
  url: "https://www.rollingstone.com/music/music-features/bjork-album-medulla-887250/",
  publisher: "Rolling Stone",
  publishedAt: "2004-09-16",
  authors: ["Jenny Eliscu"],
});

// --- Primary records ------------------------------------------------------

const momaApp = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Biophilia, the First App in MoMA's Collection",
  url: "https://www.moma.org/explore/inside_out/2014/06/11/biophilia-the-first-app-in-momas-collection/",
  publisher: "Museum of Modern Art",
  publishedAt: "2014-06-11",
  authors: ["Paola Antonelli"],
});
const momaCollection = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Biophilia. 2011 | MoMA collection",
  url: "https://www.moma.org/collection/works/179295",
  publisher: "Museum of Modern Art",
});
const reykjavikBio = source({
  binding: "primary_record",
  mediaType: "pdf",
  title:
    "Final report for the Biophilia Educational Project 2014–2016 by the Reykjavík steering group",
  url: "https://reykjavik.is/sites/default/files/ymis_skjol/skjol_utgefid_efni/biophilia_reykjavik_final_report_2016.pdf",
  publisher: "City of Reykjavík",
  publishedAt: "2016",
});
const norden = source({
  binding: "primary_record",
  mediaType: "article",
  title: "Björk's Biophilia will shape future scientists",
  url: "https://www.norden.org/en/news/bjorks-biophilia-will-shape-future-scientists",
  publisher: "Nordic Council of Ministers",
  publishedAt: "2014",
});
const cannes = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Björk — Festival de Cannes",
  url: "https://www.festival-cannes.com/en/p/bjork/",
  publisher: "Festival de Cannes",
  notes:
    "Official festival record: Dancer in the Dark, In Competition 2000 — Palme d'Or and Award for Best Actress.",
});
const polar = source({
  binding: "primary_record",
  mediaType: "webpage",
  title: "Björk — Polar Music Prize 2010 Laureate",
  url: "https://www.polarmusicprize.org/laureates/bjoerk/",
  publisher: "Polar Music Prize",
  publishedAt: "2010",
  notes:
    "The laureate citation plus the prize's own biographical summary of her early bands.",
});

// --- Reference ------------------------------------------------------------

const wikidata = source({
  binding: "reference",
  mediaType: "dataset",
  title: "Björk (Q42455)",
  url: "https://www.wikidata.org/wiki/Q42455",
  publisher: "Wikidata",
});
const wikipedia = source({
  binding: "reference",
  mediaType: "article",
  title: "Björk",
  url: "https://en.wikipedia.org/wiki/Bj%C3%B6rk",
  publisher: "Wikipedia",
  notes: "Used for discovery and cross-checking, not as sole authority.",
});
const wikiBirthday = source({
  binding: "reference",
  mediaType: "article",
  title: "Birthday (The Sugarcubes song)",
  url: "https://en.wikipedia.org/wiki/Birthday_(The_Sugarcubes_song)",
  publisher: "Wikipedia",
});
const wikiBjorkDigital = source({
  binding: "reference",
  mediaType: "article",
  title: "Björk Digital",
  url: "https://en.wikipedia.org/wiki/Bj%C3%B6rk_Digital",
  publisher: "Wikipedia",
});
const britannica = source({
  binding: "reference",
  mediaType: "article",
  title: "Björk — Icelandic musician",
  url: "https://www.britannica.com/biography/Bjork",
  publisher: "Encyclopaedia Britannica",
});

// --- Reporting -------------------------------------------------------------

const nytMoma = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk, a One-of-a-Kind Artist, Proves Elusive at MoMA",
  url: "https://www.nytimes.com/2015/03/06/arts/design/review-bjork-unfurled-in-many-guises-at-moma.html",
  publisher: "The New York Times",
  publishedAt: "2015-03-06",
  authors: ["Roberta Smith"],
});
const guardianMoma = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk review — a strangely unambitious hotchpotch",
  url: "https://www.theguardian.com/music/2015/mar/04/bjork-moma-review-strangely-unambitious-hotchpotch",
  publisher: "The Guardian",
  publishedAt: "2015-03-04",
});
const atlanticMoma = source({
  binding: "reporting",
  mediaType: "article",
  title: "'Björk' at MoMA Is a Beautiful, Ill-Conceived Disaster",
  url: "https://www.theatlantic.com/entertainment/archive/2015/03/bjork-at-moma/387370/",
  publisher: "The Atlantic",
  publishedAt: "2015-03-10",
  authors: ["Kriston Capps"],
});
const nytCannes = source({
  binding: "reporting",
  mediaType: "article",
  title: "Danish Movie Wins Top Prize at Cannes",
  url: "https://www.nytimes.com/2000/05/22/arts/danish-movie-wins-top-prize-at-cannes.html",
  publisher: "The New York Times",
  publishedAt: "2000-05-22",
});
const bbcSwan = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk's swan dress: A reviled Oscars outfit that's now iconic",
  url: "https://www.bbc.com/culture/article/20210420-bjork-swan-dress-a-reviled-oscars-outfit-thats-now-iconic",
  publisher: "BBC Culture",
  publishedAt: "2021-04-20",
  authors: ["Clare Thorp"],
});
const nytGreen = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk Wages Battle Against Icelandic Aluminum",
  url: "https://archive.nytimes.com/green.blogs.nytimes.com/2008/11/13/bjork-wages-battle-against-icelandic-aluminum/",
  publisher: "The New York Times (Green blog)",
  publishedAt: "2008-11-13",
});
const guardianTibet = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk's Tibet protest offends Chinese fans",
  url: "https://www.theguardian.com/world/2008/mar/05/china.musicnews",
  publisher: "The Guardian",
  publishedAt: "2008-03-05",
});
const wiredReactable = source({
  binding: "reporting",
  mediaType: "article",
  title: "ReacTable Tactile Synth Catches Björk's Eye — and Ear",
  url: "https://www.wired.com/2007/08/reactable-tactile-synth-catches-bjrks-eye-and-ear/",
  publisher: "Wired",
  publishedAt: "2007-08",
});
const arjReactable = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk to tour with Reactable",
  url: "https://www.arj.no/2007/05/10/bjork-to-tour-with-reactable/",
  publisher: "arj.no",
  publishedAt: "2007-05-10",
  notes:
    "Relays the Pompeu Fabra MTG announcement that her Coachella set introduced the reactable to a mainstream audience.",
});
const nmeCoachella = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk dazzles in the desert",
  url: "https://www.nme.com/news/music/coachella-60-1350241",
  publisher: "NME",
  publishedAt: "2007-04-28",
  notes:
    "Coachella review noting the on-stage 'high-tech synthesizers with touch screen control panels.'",
});
const guardianDigital = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk Digital review — to virtual reality and beyond",
  url: "https://www.theguardian.com/music/2016/sep/01/bjork-digital-review-somerset-house-vulnicura-virtual-reality-vr",
  publisher: "The Guardian",
  publishedAt: "2016-09-01",
});
const wiredDigital = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Björk Digital exhibition at Somerset House takes you on a VR journey into the singer's Vulnicura album",
  url: "https://www.wired.com/story/bjork-digital-vulnicura-album/",
  publisher: "Wired",
  publishedAt: "2016-09-01",
});
const billboardRbma = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Björk Takes Over Red Bull Music Academy With Virtual Reality, Banging DJ Sets and Candor",
  url: "https://www.billboard.com/music/music-news/bjork-red-bull-montreal-vulnicura-virtual-reality-7564597/",
  publisher: "Billboard",
  publishedAt: "2016-11-03",
  authors: ["Andy Gensler"],
});
const pfRbma = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Björk Talks Collaboration, Utopia, More in Career-Spanning RBMA Lecture: Listen",
  url: "https://pitchfork.com/news/bjork-talks-collaboration-utopia-more-in-career-spanning-rbma-lecture-listen/",
  publisher: "Pitchfork",
  publishedAt: "2017",
});
const rsCornucopia = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk Debuts 'Cornucopia' Stage Show in New York: Review",
  url: "https://www.rollingstone.com/music/music-live-reviews/bjork-cornucopia-debut-the-shed-833943/",
  publisher: "Rolling Stone",
  publishedAt: "2019-05-10",
  authors: ["Will Hermes"],
});
const grapevineCornucopia = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk's 'Cornucopia': A Utopian Reverie For A World In Peril",
  url: "https://grapevine.is/music/2019/05/19/bjorks-cornucopia-a-utopian-reverie-for-a-world-in-peril/",
  publisher: "The Reykjavík Grapevine",
  publishedAt: "2019-05-19",
});
const bbcKarahnjukar = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk scorns 'crazy' Iceland smelter plan",
  url: "https://newsimg.bbc.co.uk/1/hi/sci/tech/2602167.stm",
  publisher: "BBC News",
  notes:
    "2003 report on the Kárahnjúkar hydroelectric scheme, including Hildur Rúna Hauksdóttir's hunger strike and Björk's opposition.",
});
const guardianAtopos = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Björk: Atopos review — one of the most dramatic left turns of her career",
  url: "https://www.theguardian.com/music/2022/sep/06/bjork-atopos-review-single",
  publisher: "The Guardian",
  publishedAt: "2022-09-06",
  authors: ["Shaad D'Souza"],
});
const guardianApp = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Björk's Biophilia becomes first app in New York's Museum of Modern Art",
  url: "https://www.theguardian.com/music/2014/jun/12/bjork-biophilia-first-app-museum-of-modern-art-new-york",
  publisher: "The Guardian",
  publishedAt: "2014-06-12",
});
const pfReviewBiophilia = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk: Biophilia Album Review",
  url: "https://pitchfork.com/reviews/albums/15915-biophilia/",
  publisher: "Pitchfork",
  publishedAt: "2011-10",
});
const exclaimW = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Read Björk Interview Herself About Flutes, Arca and Donald Trump",
  url: "https://exclaim.ca/music/article/read_bj_rk_interview_herself_about_flutes_arca_and_donald_trump",
  publisher: "Exclaim!",
  publishedAt: "2017-10-11",
  notes:
    "Reports her W Magazine self-interview: refusing 'old dead German guys' at ten, flute as stamina training, and the Utopia collaboration with Arca.",
});
const nmeEcholalia = source({
  binding: "reporting",
  mediaType: "article",
  title:
    "Björk to host solar eclipse rave in Iceland with Arca and more, confirms new album is coming in 2027",
  url: "https://www.nme.com/news/music/bjork-to-host-solar-eclipse-rave-in-iceland-with-arca-and-more-confirms-new-album-is-coming-in-2027-3940175",
  publisher: "NME",
  notes:
    "Her Instagram announcement of the one-day Echolalia festival timed to the August 12 eclipse — and the clarification that her next album arrives in 2027, not under the Echolalia name.",
});
const particleEclipse = source({
  binding: "reporting",
  mediaType: "article",
  title: "Björk Stages Echolalia Eclipse Rave Near Reykjavík",
  url: "https://particle.news/story/bjrk-stages-echolalia-eclipse-rave-near-reykjavk",
  publisher: "Particle",
  notes:
    "Recap of the August 12 festival at Víðistaðatún — Björk DJing in a custom Robert Wun balloon gown through totality, with Arca and Icelandic acts; attendance reported near 7,000.",
});
const djmagDissonanze = source({
  binding: "reporting",
  mediaType: "article",
  title: "Watch Björk DJ at Rome's Dissonanze Festival",
  url: "https://djmag.com/news/watch-bjork-dj-romes-dissonanze-festival",
  publisher: "DJ Mag",
  publishedAt: "2026-09-14",
  authors: ["April Clare Welsh"],
  notes:
    "September 12 set at the Auditorium Parco della Musica — underscores, ABADIR, Arca, Kelela — her latest rare DJ appearance.",
});

const S = {
  bjorkcom: bjorkcom.id,
  fossora: fossora.id,
  bandcampMedulla: bandcampMedulla.id,
  sagaBjarkar: sagaBjarkar.id,
  savingIceland: savingIceland.id,
  talkhouse: talkhouse.id,
  appleSonic: appleSonic.id,
  pfBiophilia: pfBiophilia.id,
  pf15years: pf15years.id,
  pfVolta: pfVolta.id,
  pfVulnicura: pfVulnicura.id,
  pfUtopia: pfUtopia.id,
  pfFossora: pfFossora.id,
  pfNattura: pfNattura.id,
  guardianUtopia: guardianUtopia.id,
  guardianFossora: guardianFossora.id,
  nytUtopia: nytUtopia.id,
  nprUtopia: nprUtopia.id,
  dazedAppy: dazedAppy.id,
  dazedUnravelled: dazedUnravelled.id,
  dazed2026: dazed2026.id,
  nmeEcholalia: nmeEcholalia.id,
  particleEclipse: particleEclipse.id,
  djmagDissonanze: djmagDissonanze.id,
  rsMedulla: rsMedulla.id,
  momaApp: momaApp.id,
  momaCollection: momaCollection.id,
  reykjavikBio: reykjavikBio.id,
  norden: norden.id,
  cannes: cannes.id,
  polar: polar.id,
  wikidata: wikidata.id,
  wikipedia: wikipedia.id,
  wikiBirthday: wikiBirthday.id,
  wikiBjorkDigital: wikiBjorkDigital.id,
  britannica: britannica.id,
  nytMoma: nytMoma.id,
  guardianMoma: guardianMoma.id,
  atlanticMoma: atlanticMoma.id,
  nytCannes: nytCannes.id,
  bbcSwan: bbcSwan.id,
  nytGreen: nytGreen.id,
  guardianTibet: guardianTibet.id,
  wiredReactable: wiredReactable.id,
  arjReactable: arjReactable.id,
  nmeCoachella: nmeCoachella.id,
  guardianDigital: guardianDigital.id,
  wiredDigital: wiredDigital.id,
  billboardRbma: billboardRbma.id,
  pfRbma: pfRbma.id,
  rsCornucopia: rsCornucopia.id,
  grapevineCornucopia: grapevineCornucopia.id,
  bbcKarahnjukar: bbcKarahnjukar.id,
  guardianAtopos: guardianAtopos.id,
  guardianApp: guardianApp.id,
  pfReviewBiophilia: pfReviewBiophilia.id,
  exclaimW: exclaimW.id,
};

const packet = {
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-bjork-gudmundsdottir",
  generatedAt: "2026-09-25T21:20:34Z",
  subject: {
    kind: "person",
    handle: "bjork",
    displayName: "Björk",
    alsoKnownAs: ["Björk Guðmundsdóttir", "Bjork", "Björk Guðmundsdottir"],
    summary:
      "Icelandic musician, composer, and producer — the Sugarcubes' singer whose ten solo albums from Debut (1993) to Fossora (2022) treat nature and technology as one instrument, and who has repeatedly been first to new formats: the album-scale app, the VR album cycle, and touchscreen instruments on the pop stage.",
    identity: {
      wikidataId: "Q42455",
      officialSite: "https://www.bjork.com/",
      wikipedia: "https://en.wikipedia.org/wiki/Bj%C3%B6rk",
      profiles: [
        "https://www.instagram.com/bjork/",
        "https://www.youtube.com/@Bjork",
        "https://www.facebook.com/bjork/",
        "https://open.spotify.com/artist/7w29UYBi0qsHi5RTcv3lmA",
      ],
    },
  },
  scope: {
    asOf: "2026-09-25T21:20:34Z",
    coverage: [
      "biography",
      "work",
      "philosophy",
      "projects",
      "media",
      "beliefs",
    ],
  },
  sources: [
    bjorkcom,
    fossora,
    bandcampMedulla,
    sagaBjarkar,
    savingIceland,
    talkhouse,
    appleSonic,
    pfBiophilia,
    pf15years,
    pfVolta,
    pfVulnicura,
    pfUtopia,
    pfFossora,
    pfNattura,
    guardianUtopia,
    guardianFossora,
    nytUtopia,
    nprUtopia,
    dazedAppy,
    dazedUnravelled,
    dazed2026,
    nmeEcholalia,
    particleEclipse,
    djmagDissonanze,
    rsMedulla,
    momaApp,
    momaCollection,
    reykjavikBio,
    norden,
    cannes,
    polar,
    wikidata,
    wikipedia,
    wikiBirthday,
    wikiBjorkDigital,
    britannica,
    nytMoma,
    guardianMoma,
    atlanticMoma,
    nytCannes,
    bbcSwan,
    nytGreen,
    guardianTibet,
    wiredReactable,
    arjReactable,
    nmeCoachella,
    guardianDigital,
    wiredDigital,
    billboardRbma,
    pfRbma,
    rsCornucopia,
    grapevineCornucopia,
    bbcKarahnjukar,
    guardianAtopos,
    guardianApp,
    pfReviewBiophilia,
    exclaimW,
  ],
  claims: [
    // --- facts ---
    {
      id: "claim-born-1965",
      kind: "fact",
      text: "Björk Guðmundsdóttir was born on 21 November 1965 in Reykjavík, Iceland.",
      sourceIds: [S.wikidata, S.wikipedia, S.britannica],
    },
    {
      id: "claim-music-school",
      kind: "fact",
      text: "From about age five she attended Barnamúsíkskóli Reykjavíkur, Reykjavík's children's music school, for roughly a decade, studying singing, piano, and flute.",
      sourceIds: [S.sagaBjarkar, S.polar],
    },
    {
      id: "claim-child-album",
      kind: "fact",
      text: "After a radio performance led to a record deal, she released the eponymous album Björk in December 1977 at age eleven — a collection of covers and children's songs that sold well in Iceland. Her official biography notes she was the first student to complete the school's full ten-year course at fifteen.",
      sourceIds: [S.polar, S.sagaBjarkar, S.wikipedia],
    },
    {
      id: "claim-punk-bands",
      kind: "fact",
      text: "Through her teens she played in a string of Reykjavík punk and post-punk bands: drums in Spit and Snot, jazz-fusion group Exodus, Tappi Tíkarrass, and the anarchist band KUKL, which released records on Crass's label.",
      sourceIds: [S.polar, S.wikipedia, S.britannica],
    },
    {
      id: "claim-sugarcubes-formed",
      kind: "fact",
      text: "In 1986 KUKL members including Björk and Einar Örn regrouped as the Sugarcubes, joined to the Reykjavík art collective Smekkleysa ('Bad Taste').",
      sourceIds: [S.polar, S.wikipedia, S.sagaBjarkar],
    },
    {
      id: "claim-birthday-1987",
      kind: "fact",
      text: "The Sugarcubes' 1987 single 'Birthday' was named single of the week by Melody Maker and NME and topped John Peel's Festive Fifty, giving the band — and Björk's voice — international attention; they performed it on Saturday Night Live on 15 October 1988.",
      sourceIds: [S.wikiBirthday],
    },
    {
      id: "claim-sugarcubes-end",
      kind: "fact",
      text: "The Sugarcubes disbanded in 1992 after three studio albums; Björk moved to London and began a solo career.",
      sourceIds: [S.wikipedia, S.britannica],
    },
    {
      id: "claim-debut-1993",
      kind: "fact",
      text: "Debut was released in July 1993 on One Little Indian — her first solo album as an adult, produced with Nellee Hooper, yielding 'Human Behaviour' and 'Big Time Sensuality.'",
      sourceIds: [S.wikipedia, S.britannica, S.pf15years],
    },
    {
      id: "claim-post-1995",
      kind: "fact",
      text: "Post followed in June 1995, built with trip-hop and techno collaborators including Tricky, Howie B, and Graham Massey of 808 State.",
      sourceIds: [S.wikipedia, S.pfVolta],
    },
    {
      id: "claim-homogenic-1997",
      kind: "fact",
      text: "Homogenic (September 1997) fused electronic beats made with Mark Bell with live strings — the 'beats and strings' concept she framed as one Iceland-sized landscape of sound.",
      sourceIds: [S.sagaBjarkar, S.pfReviewBiophilia, S.wikipedia],
    },
    {
      id: "claim-dancer-cannes",
      kind: "fact",
      text: "She starred in and scored Lars von Trier's Dancer in the Dark (2000); at the Cannes awards on 21 May 2000 the film won the Palme d'Or and Björk won Best Actress in her screen debut.",
      sourceIds: [S.cannes, S.nytCannes],
    },
    {
      id: "claim-swan-dress",
      kind: "fact",
      text: "At the 73rd Academy Awards on 25 March 2001 — where 'I've Seen It All' was nominated for Best Original Song — she wore Marjan Pejoski's swan dress and mimed laying eggs on the red carpet; initially ridiculed, it is now routinely cited among the most iconic Oscar outfits.",
      sourceIds: [S.bbcSwan],
    },
    {
      id: "claim-vespertine-2001",
      kind: "fact",
      text: "Vespertine (August 2001) was written on her first laptop around microbeats, music boxes, and whispered vocals — she has described it as music for the 'static universe' of the internet, made with Matmos and others.",
      sourceIds: [S.pfVolta, S.wikipedia],
    },
    {
      id: "claim-medulla-2004",
      kind: "fact",
      text: "Medúlla (August 2004) is built almost entirely from the human voice, featuring beatboxers Rahzel and Dokaka, Inuk throat singer Tanya Tagaq, Mike Patton, and Robert Wyatt.",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "claim-olympics-2004",
      kind: "fact",
      text: "She performed 'Oceania' at the Athens 2004 Olympic opening ceremony to a broadcast audience in the billions, her dress unfurling across the stadium floor.",
      sourceIds: [S.dazedAppy, S.rsMedulla],
    },
    {
      id: "claim-volta-2007",
      kind: "fact",
      text: "Volta (May 2007) is her brass-driven, rhythm-forward record made with Timbaland, with ANOHNI duetting on 'The Dull Flame of Desire' and 'My Juvenile' and the independence anthem 'Declare Independence' as its closer.",
      sourceIds: [S.pfVolta, S.wikipedia, S.guardianTibet],
    },
    {
      id: "claim-touchscreen-tour",
      kind: "fact",
      text: "On the 2007–08 Volta tour her band performed on the JazzMutant Lemur multitouch screen and the Reactable tangible tabletop synth; the Reactable's developers at Pompeu Fabra say her Coachella set on 27 April 2007 introduced the instrument to a mainstream audience, and reviewers noted the touch-screen control panels on stage.",
      sourceIds: [S.arjReactable, S.wiredReactable, S.nmeCoachella, S.pfBiophilia],
    },
    {
      id: "claim-shanghai-tibet",
      kind: "fact",
      text: "On 2 March 2008 in Shanghai she ended 'Declare Independence' by chanting 'Tibet! Tibet!', drawing a rebuke from China's embassy; the song had previously been dedicated to Greenland, the Faroe Islands, and Kosovo.",
      sourceIds: [S.guardianTibet],
    },
    {
      id: "claim-nattura",
      kind: "fact",
      text: "In 2008 she co-founded the Náttúra campaign against further foreign-backed aluminium smelters in Iceland, released the single 'Náttúra' with Thom Yorke (proceeds to the campaign), and headlined a free Reykjavík concert estimated at 30,000 attendees — roughly a tenth of the country.",
      sourceIds: [S.nytGreen, S.pfNattura, S.savingIceland],
    },
    {
      id: "claim-karahnjukar",
      kind: "fact",
      text: "She opposed the Kárahnjúkar hydroelectric scheme built to power an Alcoa smelter in Iceland's eastern highlands — a project her mother, environmental activist Hildur Rúna Hauksdóttir, protested with a three-week hunger strike in October 2002; Björk publicly called the plan 'an old-fashioned crazy thing.'",
      sourceIds: [S.bbcKarahnjukar],
    },
    {
      id: "claim-polar-prize",
      kind: "fact",
      text: "She shared the 2010 Polar Music Prize with Ennio Morricone, presented by King Carl XVI Gustaf in Stockholm in August 2010; the citation credits her with taking the avant-garde to the top of the charts.",
      sourceIds: [S.polar],
    },
    {
      id: "claim-biophilia-2011",
      kind: "fact",
      text: "Biophilia (October 2011) was released simultaneously as an album and an iPad app suite — one interactive app per song — supported by custom-built instruments including a ten-foot gravity pendulum harp, a gameleste (gamelan–celesta hybrid), and a Tesla-coil bass.",
      sourceIds: [S.pfBiophilia, S.dazedAppy, S.guardianApp],
    },
    {
      id: "claim-first-app-moma",
      kind: "fact",
      text: "Widely described as the first album-length app ever made, Biophilia became the first downloadable app admitted to the Museum of Modern Art's permanent collection in June 2014.",
      sourceIds: [S.guardianApp, S.momaApp, S.momaCollection],
    },
    {
      id: "claim-biophilia-education",
      kind: "fact",
      text: "In autumn 2011 Björk invited the City of Reykjavík and the University of Iceland to turn Biophilia into music-and-science workshops for children; it became the Biophilia Educational Project, rolled out to Nordic schools during 2014–2017 under Iceland's presidency of the Nordic Council of Ministers.",
      sourceIds: [S.reykjavikBio, S.norden],
    },
    {
      id: "claim-vulnicura-2015",
      kind: "fact",
      text: "Vulnicura was surprise-released in January 2015 — a chronological breakup record about the end of her relationship with artist Matthew Barney, co-produced by Arca.",
      sourceIds: [S.pfVulnicura, S.wikipedia],
    },
    {
      id: "claim-moma-retrospective",
      kind: "fact",
      text: "MoMA's midcareer retrospective 'Björk' ran 8 March–7 June 2015, including the commissioned immersive film 'Black Lake'; reviews were broadly critical of the exhibition's execution even while affirming her stature.",
      sourceIds: [S.nytMoma, S.guardianMoma, S.atlanticMoma],
    },
    {
      id: "claim-bjork-digital",
      kind: "fact",
      text: "Björk Digital, her immersive VR exhibition of Vulnicura videos, opened at Carriageworks for Vivid Sydney on 4 June 2016 and toured worldwide until 2020; the Vulnicura VR suite was released on Steam on 6 September 2019.",
      sourceIds: [S.wikiBjorkDigital, S.guardianDigital, S.wiredDigital],
    },
    {
      id: "claim-rbma-2016",
      kind: "fact",
      text: "At Red Bull Music Academy Montréal on 26 October 2016 she gave a two-hour career-spanning lecture with Emma Warren, premiered the 'Family' VR video, and played two three-hour DJ sets.",
      sourceIds: [S.billboardRbma, S.pfRbma],
    },
    {
      id: "claim-utopia-2017",
      kind: "fact",
      text: "Utopia (24 November 2017) is her flute-and-birdsong record: a twelve-woman Icelandic flute ensemble, field recordings, and co-writing with Arca — she puts the split at roughly 60 percent hers, 40 percent his — after reading utopian literature from ancient fables to Octavia E. Butler.",
      sourceIds: [S.nytUtopia, S.pfUtopia, S.guardianUtopia],
    },
    {
      id: "claim-cornucopia",
      kind: "fact",
      text: "Cornucopia premiered at The Shed in New York on 9 May 2019 — billed as her most elaborately staged concert, with the 52-member Hamrahlíð choir, the flute septet Viibra, bespoke percussion instruments, and Tobias Gremmler's visuals — before touring internationally.",
      sourceIds: [S.rsCornucopia, S.grapevineCornucopia],
    },
    {
      id: "claim-fossora-2022",
      kind: "fact",
      text: "Fossora, her tenth studio album, was released on 30 September 2022 — anchored by a bass-clarinet sextet and gabber bursts from Indonesian duo Gabber Modus Operandi, framed by mushroom and mycelium imagery, and carrying tributes to her mother, who died in 2018.",
      sourceIds: [S.guardianFossora, S.pfFossora, S.fossora],
    },
    {
      id: "claim-atopos",
      kind: "fact",
      text: "Lead single 'Atopos' arrived in September 2022 with a video shot in Iceland that May — she calls it an 'ID sound card' for the album's bottom-heavy world.",
      sourceIds: [S.guardianAtopos, S.fossora],
    },
    {
      id: "claim-sonic-symbolism",
      kind: "fact",
      text: "The podcast Björk: Sonic Symbolism ran 1 September–13 October 2022 on Talkhouse/Mailchimp — one episode per album in conversation with writer Oddný Eir and musicologist Ásmundur Jónsson.",
      sourceIds: [S.talkhouse, S.appleSonic],
    },
    {
      id: "claim-northman",
      kind: "fact",
      text: "She returned to film acting as the Slav Witch in Robert Eggers's The Northman (2022).",
      sourceIds: [S.britannica],
    },
    {
      id: "claim-echolalia-2026",
      kind: "fact",
      text: "In June 2026 she opened Echolalia at the National Gallery of Iceland — three songs rendered in digital and physical space alongside James Merry's masks — while building her eleventh studio album.",
      sourceIds: [S.dazed2026],
    },
    // --- stated beliefs ---
    {
      id: "claim-nature-technology",
      kind: "stated_belief",
      text: "Her stated project is reconciliation: 'If you can make nature and technology friends, then you can make everyone friends.' Biophilia, she has said, was a pacifist's attempt to prove a person could unite the impossible.",
      sourceIds: [S.pfVulnicura, S.dazedAppy, S.pfBiophilia],
    },
    {
      id: "claim-formats-illusions",
      kind: "stated_belief",
      text: "'Formats are just illusions,' she told Pitchfork — what matters is the relationship between the person making music and the person listening, and each new format is moldable 'while the iron is hot.'",
      sourceIds: [S.pf15years],
    },
    {
      id: "claim-voice-profession",
      kind: "stated_belief",
      text: "She calls singing the one thing she is a professional at, and built Medúlla to test the entire emotional range of the human voice — single voice, chorus, trained, pop, folk, and strange voices; every noise a throat makes.",
      sourceIds: [S.rsMedulla, S.bandcampMedulla],
    },
    {
      id: "claim-eighty-percent-editing",
      kind: "stated_belief",
      text: "She describes her own process as mostly solitary post-production: 'Eighty per cent of my music is me sitting by my laptop, editing. Weeks and weeks on each song.'",
      sourceIds: [S.guardianUtopia],
    },
    {
      id: "claim-tyrant-music",
      kind: "stated_belief",
      text: "On authorship she is unambiguous: 'When I make my music I'm a bit of a tyrant. It's my world, and people follow my mission' — while visuals, she says, are more of a collaboration.",
      sourceIds: [S.wiredDigital],
    },
    {
      id: "claim-optimism-emergency",
      kind: "stated_belief",
      text: "She framed Utopia as 'a love letter to enthusiasm and optimism' and said, 'If optimism ever was like an emergency, it's now' — a deliberate answer to heartbreak, not naïveté.",
      sourceIds: [S.nytUtopia],
    },
    {
      id: "claim-punk-skepticism",
      kind: "stated_belief",
      text: "'Being a punk, I've always been really skeptical of big brands, it's kind of in my blood' — she described dropping her 'brand-snob thing' for RBMA only because its community work convinced her.",
      sourceIds: [S.billboardRbma],
    },
    {
      id: "claim-female-producers",
      kind: "stated_belief",
      text: "She has spoken up about women producers going under-credited, says naming it changed the questions she was asked, and reports her own album-by-album splits with co-producers precisely — for Utopia, about 60 percent hers to Arca's 40.",
      sourceIds: [S.pfVulnicura, S.pfUtopia],
    },
    {
      id: "claim-flute-rebellion",
      kind: "stated_belief",
      text: "She describes refusing, at about ten or eleven, to play music by 'old dead German guys' she couldn't relate to — and credits the flute with training her lungs and stamina; on Utopia she ran a Friday flute club.",
      sourceIds: [S.exclaimW, S.guardianUtopia],
    },
    {
      id: "claim-environment-belief",
      kind: "stated_belief",
      text: "Her environmental case is economic as much as ecological: Icelanders, she argues, should develop smaller companies they own themselves rather than sell geothermal and hydro power to foreign aluminium giants whose dams damage wilderness, hot springs, and lava fields.",
      sourceIds: [S.savingIceland, S.nytGreen],
    },
    {
      id: "claim-tarot-covers",
      kind: "stated_belief",
      text: "She calls her album covers 'homemade tarot cards': palette, textiles, held objects, posture, and mouth shape encode each record's sound — the premise she named Sonic Symbolism after.",
      sourceIds: [S.talkhouse],
    },
    {
      id: "claim-collab-mutual-ground",
      kind: "stated_belief",
      text: "She insists collaborations meet on 'mutual ground' — 'not me being alien in his universe, or him being alien in my universe' (of Timbaland) — and describes Arca as a mirror she could trade shorthand with.",
      sourceIds: [S.pfVolta, S.pfUtopia],
    },
    {
      id: "claim-mushroom-album",
      kind: "stated_belief",
      text: "She describes Fossora as 'my mushroom album': pandemic stillness let roots go down, and mushrooms — not tree roots — fit the music because they are 'psychedelic and they pop up everywhere.'",
      sourceIds: [S.fossora, S.pfFossora],
    },
    {
      id: "claim-not-visual-artist",
      kind: "stated_belief",
      text: "On the 2026 Echolalia exhibition she pushed back at being reclassified: 'I'm not trying to be an artist. I'm still a musician' — preferring 'creative director-slash-worldbuilder.'",
      sourceIds: [S.dazed2026],
    },
    {
      id: "claim-icelandic-self-image",
      kind: "stated_belief",
      text: "She frames her identity as Icelandic before genre: asked whether Homogenic was hip-hop she answered 'I'm from Iceland; I don't do hip hop' — while building albums from Icelandic choirs, brass, flutes, and landscape imagery.",
      sourceIds: [S.pfVolta, S.guardianFossora],
    },
    // --- patterns ---
    {
      id: "claim-concept-constraints",
      kind: "pattern",
      text: "Every album is built on an explicit sonic constraint: Homogenic's beats-and-strings, Vespertine's laptop microbeats, Medúlla's voices-only rule, Volta's brass, Biophilia's nature-as-app, Vulnicura's chronological heartbreak, Utopia's flutes, Fossora's bass clarinets and gabber — a pattern she narrates herself on Sonic Symbolism.",
      sourceIds: [S.pfReviewBiophilia, S.talkhouse, S.appleSonic],
    },
    {
      id: "claim-format-firsts",
      kind: "pattern",
      text: "Across four decades she repeatedly arrives first at a format: touchscreen and tangible instruments in mainstream pop performance (2007), the first album-scale app (2011, later MoMA's first app), the first album-spanning VR video cycle and traveling VR exhibition (2015–2020).",
      sourceIds: [S.arjReactable, S.wiredReactable, S.guardianApp, S.momaApp, S.wikiBjorkDigital],
    },
    {
      id: "claim-collab-research",
      kind: "pattern",
      text: "Each era pairs her with collaborators who were then emerging or left-field — Tricky, Howie B, and Graham Massey; Matmos; Timbaland and ANOHNI; Arca; Gabber Modus Operandi — suggesting collaboration functions for her as research into sounds she has not yet made.",
      sourceIds: [S.wikipedia, S.pfUtopia, S.guardianAtopos, S.pfRbma],
    },
    {
      id: "claim-visual-worlds",
      kind: "pattern",
      text: "Albums arrive as total visual worlds built with a recurring stable: Michel Gondry, Alexander McQueen, Inez & Vinoodh, M/M (Paris), Andrew Thomas Huang, Jesse Kanda, and James Merry — costume, mask, and cover treated as part of the instrumentarium.",
      sourceIds: [S.guardianMoma, S.dazedUnravelled, S.fossora, S.talkhouse],
    },
    {
      id: "claim-iceland-ensembles",
      kind: "pattern",
      text: "She keeps fielding Icelandic ensembles and returning home to work: the all-female Wonderbrass on the Volta tour, the Hamrahlíð choir and Viibra flute septet in Cornucopia, an 'Iceland album' in Fossora, and repeated recordings and residencies in Reykjavík.",
      sourceIds: [S.rsCornucopia, S.pfFossora, S.guardianFossora],
    },
    {
      id: "claim-masks-visibility",
      kind: "pattern",
      text: "Since the Vulnicura era she performs and appears behind masks and headpieces — collaborators and journalists read it as a way to control visibility and keep a private self while staging vulnerable material.",
      sourceIds: [S.dazedUnravelled, S.billboardRbma],
    },
    {
      id: "claim-three-year-cycles",
      kind: "pattern",
      text: "Her own account structures the catalog in roughly three-year life-phases — each album tied to a place, a set of moods, and a palette — the spine of Sonic Symbolism.",
      sourceIds: [S.talkhouse, S.appleSonic],
    },
    // --- speculation ---
    {
      id: "claim-touchscreen-first",
      kind: "speculation",
      text: "She is frequently described as the first major artist to use touchscreen instruments live. The documented record firmly supports that her 2007 Volta tour carried the Lemur and that Coachella marked the Reactable's mainstream debut — but absolute priority over every earlier performer is not established in the cited sources.",
      sourceIds: [S.arjReactable, S.wiredReactable, S.nmeCoachella],
    },
    {
      id: "claim-moma-institution",
      kind: "speculation",
      text: "The near-uniform panning of the 2015 MoMA retrospective may say as much about the museum's capacity to frame format-inventing work as about the curation itself — reviewers faulted the cramped, shallow presentation, not the catalog it surveyed.",
      sourceIds: [S.nytMoma, S.guardianMoma, S.atlanticMoma],
    },
    {
      id: "claim-self-canonization",
      kind: "speculation",
      text: "The combination of a self-narrated retrospective podcast, the MoMA acquisition and retrospective, and an official Bandcamp catalog suggests a deliberate project of framing her own archive in her own vocabulary before institutions do it for her.",
      sourceIds: [S.talkhouse, S.momaApp, S.bandcampMedulla],
    },
  ],
  timeline: [
    {
      id: "event-birth",
      kind: "birth",
      date: "1965-11-21",
      title: "Born in Reykjavík, Iceland",
      summary: "Björk Guðmundsdóttir.",
      location: "Reykjavík, Iceland",
      sourceIds: [S.wikidata, S.britannica],
    },
    {
      id: "event-music-school",
      kind: "education",
      date: "1970",
      end: "1980",
      title: "Barnamúsíkskóli Reykjavíkur",
      summary:
        "A decade at Reykjavík's children's music school — singing, piano, flute; her biography says she was the first to complete the full course.",
      sourceIds: [S.sagaBjarkar],
    },
    {
      id: "event-child-album",
      kind: "publication",
      date: "1977-12",
      title: "Björk (first album, age 11)",
      summary:
        "Eponymous record of covers and children's songs, after a radio appearance led to a deal.",
      sourceIds: [S.polar, S.sagaBjarkar],
    },
    {
      id: "event-punk-years",
      kind: "project",
      date: "1981",
      end: "1986",
      title: "Reykjavík punk bands",
      summary:
        "Spit and Snot, Exodus, Tappi Tíkarrass, and the anarchist post-punk band KUKL.",
      sourceIds: [S.polar, S.wikipedia],
    },
    {
      id: "event-sugarcubes",
      kind: "founded",
      date: "1986",
      title: "The Sugarcubes form",
      summary:
        "KUKL members regroup under the Smekkleysa ('Bad Taste') collective.",
      organization: "The Sugarcubes",
      location: "Reykjavík, Iceland",
      organizationHandle: "the-sugarcubes",
      sourceIds: [S.polar, S.wikipedia],
    },
    {
      id: "event-birthday",
      kind: "milestone",
      date: "1987-08",
      title: "'Birthday' breaks internationally",
      summary:
        "Single of the week in Melody Maker and NME; tops John Peel's Festive Fifty.",
      sourceIds: [S.wikiBirthday],
    },
    {
      id: "event-snl",
      kind: "media",
      date: "1988-10-15",
      title: "Saturday Night Live performance",
      summary:
        "The Sugarcubes play 'Birthday' and 'Motorcrash' on US network television.",
      sourceIds: [S.wikiBirthday],
    },
    {
      id: "event-sugarcubes-end",
      kind: "milestone",
      date: "1992",
      title: "The Sugarcubes disband; move to London",
      sourceIds: [S.wikipedia, S.britannica],
    },
    {
      id: "event-debut",
      kind: "publication",
      date: "1993-07",
      title: "Debut",
      summary:
        "First adult solo album, produced with Nellee Hooper for One Little Indian.",
      sourceIds: [S.wikipedia, S.britannica],
    },
    {
      id: "event-post",
      kind: "publication",
      date: "1995-06",
      title: "Post",
      summary:
        "Second solo album; collaborations with Tricky, Howie B, Graham Massey.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "event-homogenic",
      kind: "publication",
      date: "1997-09",
      title: "Homogenic",
      summary: "Beats-and-strings concept album made with Mark Bell.",
      sourceIds: [S.sagaBjarkar, S.wikipedia],
    },
    {
      id: "event-cannes",
      kind: "award",
      date: "2000-05-21",
      title: "Palme d'Or and Best Actress at Cannes",
      summary:
        "Dancer in the Dark wins the Palme d'Or; Björk wins Best Actress in her screen debut and also wrote the film's music.",
      organization: "Festival de Cannes",
      location: "Cannes, France",
      organizationHandle: "festival-de-cannes",
      sourceIds: [S.cannes, S.nytCannes],
    },
    {
      id: "event-swan-dress",
      kind: "media",
      date: "2001-03-25",
      title: "The swan dress at the 73rd Academy Awards",
      summary:
        "Marjan Pejoski's dress, eggs 'laid' on the carpet, and a Best Original Song nomination for 'I've Seen It All.'",
      location: "Los Angeles",
      sourceIds: [S.bbcSwan],
    },
    {
      id: "event-vespertine",
      kind: "publication",
      date: "2001-08",
      title: "Vespertine",
      summary: "Laptop microbeats, music boxes, whispered intimacy.",
      sourceIds: [S.pfVolta, S.wikipedia],
    },
    {
      id: "event-karahnjukar",
      kind: "other",
      date: "2002-10",
      title: "Kárahnjúkar dam opposition",
      summary:
        "Her mother hunger-strikes against the highlands hydroelectric scheme; Björk calls the smelter plan 'an old-fashioned crazy thing.'",
      location: "Iceland",
      sourceIds: [S.bbcKarahnjukar],
    },
    {
      id: "event-olympics",
      kind: "media",
      date: "2004-08-13",
      title: "Athens Olympics opening ceremony",
      summary:
        "Performs 'Oceania' to a global broadcast audience, her dress unfurling to cover the athletes.",
      location: "Athens, Greece",
      sourceIds: [S.dazedAppy, S.rsMedulla],
    },
    {
      id: "event-medulla",
      kind: "publication",
      date: "2004-08",
      title: "Medúlla",
      summary: "The almost entirely vocal album.",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "event-coachella-reactable",
      kind: "milestone",
      date: "2007-04-27",
      title: "Coachella: Reactable's mainstream debut",
      summary:
        "The Volta tour opens with Lemur and Reactable touch interfaces on stage; the Reactable's developers credit this set with introducing it to a mainstream audience.",
      location: "Indio, California",
      sourceIds: [S.arjReactable, S.nmeCoachella],
    },
    {
      id: "event-volta",
      kind: "publication",
      date: "2007-05",
      title: "Volta",
      summary: "Brass, Timbaland, ANOHNI duets, 'Declare Independence.'",
      sourceIds: [S.pfVolta, S.wikipedia],
    },
    {
      id: "event-shanghai",
      kind: "other",
      date: "2008-03-02",
      title: "'Tibet! Tibet!' in Shanghai",
      summary:
        "Ends 'Declare Independence' with a Tibet chant; China's embassy in Reykjavík protests.",
      location: "Shanghai, China",
      sourceIds: [S.guardianTibet],
    },
    {
      id: "event-nattura-concert",
      kind: "project",
      date: "2008-06",
      title: "Náttúra concert, Reykjavík",
      summary:
        "Free environmental concert with Sigur Rós drawing an estimated 30,000 — about a tenth of Iceland's population.",
      location: "Reykjavík, Iceland",
      sourceIds: [S.nytGreen, S.savingIceland],
    },
    {
      id: "event-nattura-single",
      kind: "publication",
      date: "2008-10-20",
      title: "'Náttúra' single with Thom Yorke",
      summary: "Proceeds fund the anti-smelter Náttúra Campaign she co-founded.",
      sourceIds: [S.pfNattura],
    },
    {
      id: "event-polar-prize",
      kind: "award",
      date: "2010-08",
      title: "Polar Music Prize",
      summary:
        "Shares the 2010 prize with Ennio Morricone; presented by King Carl XVI Gustaf in Stockholm.",
      location: "Stockholm, Sweden",
      sourceIds: [S.polar],
    },
    {
      id: "event-biophilia",
      kind: "publication",
      date: "2011-10",
      title: "Biophilia — album and app suite",
      summary:
        "The first album-scale app: ten songs, ten interactive iPad programs, custom instruments, live residencies.",
      sourceIds: [S.pfBiophilia, S.guardianApp],
    },
    {
      id: "event-biophilia-education",
      kind: "project",
      date: "2014",
      end: "2017",
      title: "Biophilia Educational Project goes Nordic",
      summary:
        "Begun in 2011 with the City of Reykjavík and University of Iceland; rolls out to Nordic schools under Iceland's presidency of the Nordic Council of Ministers.",
      organization: "Biophilia Educational Project",
      organizationHandle: "biophilia-educational-project",
      sourceIds: [S.reykjavikBio, S.norden],
    },
    {
      id: "event-moma-app",
      kind: "milestone",
      date: "2014-06-11",
      title: "Biophilia enters MoMA's permanent collection",
      summary: "The first downloadable app the museum has acquired.",
      organization: "Museum of Modern Art",
      organizationHandle: "museum-of-modern-art",
      sourceIds: [S.momaApp, S.guardianApp],
    },
    {
      id: "event-vulnicura",
      kind: "publication",
      date: "2015-01",
      title: "Vulnicura",
      summary:
        "Surprise-released breakup album co-produced by Arca; the wound as a nine-song chronology.",
      sourceIds: [S.pfVulnicura, S.wikipedia],
    },
    {
      id: "event-moma-retro",
      kind: "exhibition",
      date: "2015-03-08",
      end: "2015-06-07",
      title: "MoMA retrospective 'Björk'",
      summary:
        "Midcareer survey including the commissioned 'Black Lake' installation; reviews faulted the exhibition's scale and execution.",
      organization: "Museum of Modern Art",
      location: "New York",
      organizationHandle: "museum-of-modern-art",
      sourceIds: [S.nytMoma, S.guardianMoma],
    },
    {
      id: "event-bjork-digital",
      kind: "exhibition",
      date: "2016-06-04",
      end: "2020-03-13",
      title: "Björk Digital tours the world",
      summary:
        "Immersive Vulnicura VR exhibition opens at Carriageworks for Vivid Sydney; travels to London, Tokyo, Montreal, and beyond.",
      location: "Sydney",
      sourceIds: [S.wikiBjorkDigital, S.guardianDigital],
    },
    {
      id: "event-rbma-lecture",
      kind: "media",
      date: "2016-10-26",
      title: "Red Bull Music Academy lecture, Montréal",
      summary:
        "Two-hour career lecture with Emma Warren, plus two DJ sets and the 'Family' VR premiere.",
      organization: "Red Bull Music Academy",
      location: "Montréal",
      organizationHandle: "red-bull-music-academy",
      sourceIds: [S.billboardRbma, S.pfRbma],
    },
    {
      id: "event-utopia",
      kind: "publication",
      date: "2017-11-24",
      title: "Utopia",
      summary:
        "Flute ensemble, birdsong, Arca co-writing — 'a love letter to enthusiasm and optimism.'",
      sourceIds: [S.nytUtopia, S.pfUtopia],
    },
    {
      id: "event-cornucopia",
      kind: "project",
      date: "2019-05-09",
      title: "Cornucopia premieres at The Shed",
      summary:
        "Her most elaborate staged concert: Hamrahlíð choir, Viibra flutes, Gremmler visuals; later toured.",
      location: "New York",
      sourceIds: [S.rsCornucopia, S.grapevineCornucopia],
    },
    {
      id: "event-vulnicura-vr",
      kind: "publication",
      date: "2019-09-06",
      title: "Vulnicura VR released",
      summary: "The VR album suite ships on Steam for PC headsets.",
      sourceIds: [S.wikiBjorkDigital],
    },
    {
      id: "event-northman",
      kind: "role",
      date: "2022-04",
      title: "The Northman",
      summary: "Plays the Slav Witch in Robert Eggers's film.",
      sourceIds: [S.britannica],
    },
    {
      id: "event-sonic-symbolism",
      kind: "media",
      date: "2022-09-01",
      end: "2022-10-13",
      title: "Björk: Sonic Symbolism podcast",
      summary:
        "Nine album-by-album episodes with Oddný Eir and Ásmundur Jónsson, on Talkhouse/Mailchimp.",
      sourceIds: [S.talkhouse, S.appleSonic],
    },
    {
      id: "event-fossora",
      kind: "publication",
      date: "2022-09-30",
      title: "Fossora",
      summary:
        "Tenth studio album: bass clarinets, gabber, mycelium; preceded by the 'Atopos' single.",
      sourceIds: [S.guardianFossora, S.guardianAtopos],
    },
    {
      id: "event-echolalia",
      kind: "exhibition",
      date: "2026-06",
      title: "Echolalia at the National Gallery of Iceland",
      summary:
        "Three songs rendered in digital and physical space with James Merry's masks; her eleventh album is in progress.",
      location: "Reykjavík, Iceland",
      sourceIds: [S.dazed2026],
    },
    {
      id: "event-echolalia-rave",
      kind: "media",
      date: "2026-08-12",
      title: "Echolalia eclipse rave in Hafnarfjörður",
      summary:
        "The one-day festival she curated and DJed — timed to Iceland's total solar eclipse — with Arca and Icelandic artists on the bill; she confirmed the next album arrives in 2027.",
      location: "Víðistaðatún, Hafnarfjörður, Iceland",
      sourceIds: [S.nmeEcholalia, S.particleEclipse],
    },
    {
      id: "event-dissonanze",
      kind: "media",
      date: "2026-09-12",
      title: "DJ set at Rome's Dissonanze Festival",
      summary:
        "A rare deck appearance at the Auditorium Parco della Musica, playing underscores, ABADIR, Arca, and Kelela.",
      location: "Rome, Italy",
      sourceIds: [S.djmagDissonanze],
    },
  ],
  themes: [
    {
      id: "theme-nature-technology",
      kind: "philosophy",
      status: "stated",
      title: "Nature and technology as one instrument",
      summary:
        "Her stated core: the two are not opposites but estranged friends. Biophilia literalized it — songs about galaxies and atoms as touchable apps — and she described the album as a pacifist exercise in proving the impossible can be united.",
      sourceIds: [S.pfBiophilia, S.dazedAppy, S.pfVulnicura, S.britannica],
    },
    {
      id: "theme-voice",
      kind: "method",
      status: "stated",
      title: "The voice as instrument",
      summary:
        "Singing is the craft she claims professionalism in; Medúlla tested the voice's entire range, and even her most electronic records keep the vocal as the unprocessed center.",
      sourceIds: [S.rsMedulla, S.bandcampMedulla, S.pfVulnicura],
    },
    {
      id: "theme-format-invention",
      kind: "method",
      status: "stated",
      title: "Formats are illusions — invent new ones",
      summary:
        "Each album sets a constraint and often a medium: laptop microbeats, voices-only, app-per-song, VR-per-song. 'Every time there's a new format, the iron is hot, and you can mold it.'",
      sourceIds: [S.pf15years, S.pfBiophilia, S.wikiBjorkDigital],
    },
    {
      id: "theme-collaboration-research",
      kind: "method",
      status: "stated",
      title: "Collaboration as research",
      summary:
        "She picks collaborators for territory she hasn't visited — Tricky and 808 State in the nineties, Matmos, Timbaland and ANOHNI in the aughts, Arca, Gabber Modus Operandi — and insists on 'mutual ground' rather than guest spots.",
      sourceIds: [S.pfVolta, S.pfUtopia, S.pfRbma],
    },
    {
      id: "theme-iceland",
      kind: "influence",
      status: "stated",
      title: "Iceland as method, not backdrop",
      summary:
        "Icelandic choirs, brass bands, flute septets, landscape shoots, and the repeated decision to write and record at home; she calls Fossora her 'Iceland album' and resists being exoticized ('I'm from Iceland; I don't do hip hop').",
      sourceIds: [S.pfFossora, S.pfVolta, S.rsCornucopia],
    },
    {
      id: "theme-environmentalism",
      kind: "belief",
      status: "stated",
      title: "Environmentalism as self-determination",
      summary:
        "Her activism — Kárahnjúkar, Náttúra, the Tibet and Kosovo dedications — argues for small, locally owned, sustainable economies over selling energy to foreign industry; nature protection and national independence are the same argument.",
      sourceIds: [S.savingIceland, S.nytGreen, S.guardianTibet, S.bbcKarahnjukar],
    },
    {
      id: "theme-feminism",
      kind: "belief",
      status: "stated",
      title: "Credit where women are owed it",
      summary:
        "She has spoken publicly about female producers going uncredited, recounts her own co-production splits precisely, and built Utopia around myths of women and children escaping violence with flutes.",
      sourceIds: [S.pfVulnicura, S.pfUtopia, S.nprUtopia],
    },
    {
      id: "theme-optimism",
      kind: "philosophy",
      status: "stated",
      title: "Optimism as discipline",
      summary:
        "Utopia was researched like a project — fables, novels, Octavia Butler — and framed not as perfectionism but as an emergency practice: 'imagine a future and be in it.'",
      sourceIds: [S.nytUtopia, S.exclaimW, S.grapevineCornucopia],
    },
    {
      id: "theme-punk-autonomy",
      kind: "belief",
      status: "stated",
      title: "Punk skepticism, total authorship",
      summary:
        "From KUKL's anarcho-punk years onward she distrusts institutions and brands, controls her own music 'like a tyrant,' and treats DIY infrastructure — Bandcamp, apps, self-run podcasts — as the natural release path.",
      sourceIds: [S.billboardRbma, S.wiredDigital, S.polar],
    },
    {
      id: "theme-masks",
      kind: "practice",
      status: "reported",
      title: "Masks and managed visibility",
      summary:
        "Since Vulnicura she appears behind masks by James Merry and others; press and collaborators read the practice as letting her stage raw material while keeping the private self shielded.",
      sourceIds: [S.dazedUnravelled, S.billboardRbma, S.dazed2026],
    },
  ],
  works: [
    {
      id: "work-bjork-1977",
      kind: "recording",
      status: "released",
      title: "Björk",
      date: "1977-12",
      summary:
        "Her self-titled first album at age eleven — covers and children's songs released only in Iceland.",
      sourceIds: [S.polar, S.sagaBjarkar],
    },
    {
      id: "work-lifes-too-good",
      kind: "recording",
      status: "released",
      title: "Life's Too Good (the Sugarcubes)",
      date: "1988",
      summary:
        "The Sugarcubes' debut album, containing 'Birthday'; carried the band onto SNL and international charts.",
      sourceIds: [S.wikiBirthday, S.wikipedia],
    },
    {
      id: "work-stick-around",
      kind: "recording",
      status: "released",
      title: "Stick Around for Joy (the Sugarcubes)",
      date: "1992",
      summary: "The band's final album before the 1992 split.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-debut",
      kind: "recording",
      status: "released",
      title: "Debut",
      date: "1993-07",
      summary:
        "First adult solo album; 'Human Behaviour,' 'Venus as a Boy,' 'Big Time Sensuality.'",
      sourceIds: [S.wikipedia, S.britannica],
    },
    {
      id: "work-post",
      kind: "recording",
      status: "released",
      title: "Post",
      date: "1995-06",
      summary:
        "Second solo album with Tricky, Howie B, Graham Massey; 'Army of Me,' 'Hyperballad,' 'It's Oh So Quiet.'",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-homogenic",
      kind: "recording",
      status: "released",
      title: "Homogenic",
      date: "1997-09",
      summary:
        "Electronic beats with Mark Bell fused to live strings — her stated 'one Iceland' of sound.",
      sourceIds: [S.sagaBjarkar, S.pfReviewBiophilia],
    },
    {
      id: "work-dancer",
      kind: "film",
      status: "released",
      title: "Dancer in the Dark",
      date: "2000",
      summary:
        "Lars von Trier film; she starred as Selma and wrote the score (Selmasongs). Palme d'Or, Best Actress at Cannes.",
      sourceIds: [S.cannes, S.nytCannes],
    },
    {
      id: "work-vespertine",
      kind: "recording",
      status: "released",
      title: "Vespertine",
      date: "2001-08",
      summary:
        "Laptop-made microbeats, choir, music boxes; the swan dress on the cover.",
      sourceIds: [S.pfVolta, S.wikipedia, S.bbcSwan],
    },
    {
      id: "work-medulla",
      kind: "recording",
      status: "released",
      title: "Medúlla",
      date: "2004-08",
      summary:
        "Almost entirely a cappella: Rahzel, Dokaka, Tanya Tagaq, Mike Patton, Robert Wyatt.",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "work-drawing-restraint",
      kind: "recording",
      status: "released",
      title: "Drawing Restraint 9 (soundtrack)",
      date: "2005",
      summary:
        "Score for Matthew Barney's film; shoal hymns, brass, and Noh-influenced vocal writing.",
      sourceIds: [S.wikipedia],
    },
    {
      id: "work-volta",
      kind: "recording",
      status: "released",
      title: "Volta",
      date: "2007-05",
      summary:
        "Brass-driven record with Timbaland and ANOHNI; tour debuted touchscreen and tangible instruments.",
      sourceIds: [S.pfVolta, S.arjReactable],
    },
    {
      id: "work-nattura-single",
      kind: "recording",
      status: "released",
      title: "'Náttúra' (single, with Thom Yorke)",
      date: "2008-10",
      summary: "Charity single funding the anti-smelter Náttúra Campaign.",
      sourceIds: [S.pfNattura, S.nytGreen],
    },
    {
      id: "work-biophilia-album",
      kind: "recording",
      status: "released",
      title: "Biophilia",
      date: "2011-10",
      summary:
        "Eighth studio album — each song paired to a natural system and a custom instrument or app.",
      sourceIds: [S.pfBiophilia, S.pfReviewBiophilia],
    },
    {
      id: "work-biophilia-app",
      kind: "product",
      status: "released",
      title: "Biophilia app suite",
      date: "2011",
      summary:
        "The first album-scale app: ten interactive iPad programs. Acquired by MoMA in 2014 — the first downloadable app in its collection.",
      sourceIds: [S.guardianApp, S.momaApp, S.momaCollection],
    },
    {
      id: "work-biophilia-education",
      kind: "project",
      status: "completed",
      title: "Biophilia Educational Project",
      date: "2011",
      summary:
        "Music-and-science curriculum built with the City of Reykjavík and University of Iceland; taught in Nordic schools 2014–2017 under the Nordic Council of Ministers.",
      sourceIds: [S.reykjavikBio, S.norden],
    },
    {
      id: "work-vulnicura",
      kind: "recording",
      status: "released",
      title: "Vulnicura",
      date: "2015-01",
      summary:
        "Chronological breakup album co-produced by Arca; surprise-released after a leak.",
      sourceIds: [S.pfVulnicura, S.wikipedia],
    },
    {
      id: "work-bjork-digital",
      kind: "project",
      status: "completed",
      title: "Björk Digital",
      date: "2016",
      summary:
        "Traveling immersive exhibition of Vulnicura VR videos, 2016–2020.",
      sourceIds: [S.wikiBjorkDigital, S.guardianDigital],
    },
    {
      id: "work-vulnicura-vr",
      kind: "product",
      status: "released",
      title: "Vulnicura VR",
      date: "2019-09-06",
      summary:
        "The VR album cycle released on Steam — an album-length virtual reality work.",
      sourceIds: [S.wikiBjorkDigital],
    },
    {
      id: "work-utopia",
      kind: "recording",
      status: "released",
      title: "Utopia",
      date: "2017-11-24",
      summary:
        "Flutes, birdsong, and air; co-written with Arca after researching utopias.",
      sourceIds: [S.nytUtopia, S.pfUtopia],
    },
    {
      id: "work-cornucopia",
      kind: "project",
      status: "completed",
      title: "Cornucopia",
      date: "2019",
      summary:
        "Her most elaborate staged concert, premiered at The Shed, New York; toured and later became a concert film and book.",
      sourceIds: [S.rsCornucopia, S.grapevineCornucopia, S.bjorkcom],
    },
    {
      id: "work-fossora",
      kind: "recording",
      status: "released",
      title: "Fossora",
      date: "2022-09-30",
      summary:
        "Tenth studio album: bass-clarinet sextet, gabber, fungi, ancestry.",
      sourceIds: [S.guardianFossora, S.pfFossora, S.fossora],
    },
    {
      id: "work-sonic-symbolism",
      kind: "other",
      status: "released",
      title: "Björk: Sonic Symbolism (podcast)",
      date: "2022",
      summary:
        "Nine-episode self-narrated retrospective, one per album, with Oddný Eir and Ásmundur Jónsson.",
      sourceIds: [S.talkhouse, S.appleSonic],
    },
    {
      id: "work-northman",
      kind: "film",
      status: "released",
      title: "The Northman",
      date: "2022",
      summary: "Acting role as the Slav Witch in Robert Eggers's film.",
      sourceIds: [S.britannica],
    },
    {
      id: "work-echolalia",
      kind: "project",
      status: "completed",
      title: "Echolalia",
      date: "2026-06",
      location: "National Gallery of Iceland, Reykjavík",
      summary:
        "Exhibition rendering three songs in digital and physical space, with James Merry's masks.",
      sourceIds: [S.dazed2026],
    },
  ],
  appearances: [
    {
      id: "appearance-rbma-lecture",
      title: "Red Bull Music Academy lecture with Emma Warren",
      venue: "RBMA Montréal",
      publishedAt: "2016-10-26",
      participants: ["Björk", "Emma Warren"],
      summary:
        "Two-hour career-spanning talk on process and collaboration, alongside the 'Family' VR premiere and two DJ sets.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/news/bjork-talks-collaboration-utopia-more-in-career-spanning-rbma-lecture-listen/",
          sourceId: S.pfRbma,
        },
      ],
      sourceIds: [S.billboardRbma, S.pfRbma],
    },
    {
      id: "appearance-sonic-symbolism",
      title: "Björk: Sonic Symbolism",
      venue: "Talkhouse / Mailchimp podcast",
      publishedAt: "2022-09",
      participants: ["Björk", "Oddný Eir", "Ásmundur Jónsson"],
      summary:
        "Her own retrospective podcast — one episode per album, naming the moods, timbres, and tempos of each three-year phase.",
      media: [
        {
          type: "audio",
          url: "https://podcasts.apple.com/us/podcast/bj%C3%B6rk-sonic-symbolism/id1641171534",
          sourceId: S.appleSonic,
        },
      ],
      sourceIds: [S.talkhouse, S.appleSonic],
    },
    {
      id: "appearance-pf-biophilia",
      title: "Pitchfork Biophilia interview",
      venue: "Pitchfork",
      publishedAt: "2011",
      participants: ["Björk"],
      summary:
        "On writing the album on touchscreens, custom instruments, and the education plan.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/interview/7996-bjork/",
          sourceId: S.pfBiophilia,
        },
      ],
      sourceIds: [S.pfBiophilia],
    },
    {
      id: "appearance-pf-15-years",
      title: "Björk: 15 Years",
      venue: "Pitchfork",
      publishedAt: "2011",
      participants: ["Björk", "Brandon Stosuy"],
      summary:
        "Career-spanning conversation; 'formats are just illusions.'",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/interview/8019-bjork-15-years/",
          sourceId: S.pf15years,
        },
      ],
      sourceIds: [S.pf15years],
    },
    {
      id: "appearance-pf-vulnicura",
      title: "The Invisible Woman: A Conversation With Björk",
      venue: "Pitchfork",
      publishedAt: "2015-03",
      participants: ["Björk", "Jessica Hopper"],
      summary:
        "On Vulnicura's pain, female producers' credit, and making nature and technology friends.",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/interview/9582-the-invisible-woman-a-conversation-with-bjork/",
          sourceId: S.pfVulnicura,
        },
      ],
      sourceIds: [S.pfVulnicura],
    },
    {
      id: "appearance-guardian-utopia",
      title: "Guardian Utopia interview",
      venue: "The Guardian",
      publishedAt: "2017-11-12",
      participants: ["Björk"],
      summary:
        "Reykjavík listen-and-talk: 'People miss the jokes. A lot of it is me taking the piss out of myself.'",
      media: [
        {
          type: "article",
          url: "https://www.theguardian.com/music/2017/nov/12/bjork-utopia-interview-people-miss-the-jokes",
          sourceId: S.guardianUtopia,
        },
      ],
      sourceIds: [S.guardianUtopia],
    },
    {
      id: "appearance-nyt-utopia",
      title: "New York Times Utopia interview",
      venue: "The New York Times",
      publishedAt: "2017-11-14",
      participants: ["Björk", "Jon Pareles"],
      summary: "'A love letter to enthusiasm and optimism.'",
      media: [
        {
          type: "article",
          url: "https://www.nytimes.com/2017/11/14/arts/music/bjork-utopia-interview.html",
          sourceId: S.nytUtopia,
        },
      ],
      sourceIds: [S.nytUtopia],
    },
    {
      id: "appearance-npr-utopia",
      title: "Björk Invites You To Her 'Utopia'",
      venue: "NPR",
      publishedAt: "2017-11-20",
      participants: ["Björk", "Rachel Martin"],
      summary:
        "On flute mythology, utopian research, and singing while walking.",
      media: [
        {
          type: "article",
          url: "https://www.npr.org/2017/11/20/563290559/bj-rk-invites-you-to-her-utopia",
          sourceId: S.nprUtopia,
        },
      ],
      sourceIds: [S.nprUtopia],
    },
    {
      id: "appearance-dazed-appy",
      title: "Björk: Violently Appy",
      venue: "Dazed",
      publishedAt: "2011-07-28",
      participants: ["Björk", "Rod Stanley"],
      summary:
        "At-home interview on the app suite, the banking crisis, and the fun 21st century.",
      media: [
        {
          type: "article",
          url: "https://www.dazeddigital.com/music/article/11007/1/bjork-violently-appy",
          sourceId: S.dazedAppy,
        },
      ],
      sourceIds: [S.dazedAppy],
    },
    {
      id: "appearance-dazed-unravelled",
      title: "Björk Unravelled",
      venue: "Dazed",
      publishedAt: "2017-08-08",
      participants: ["Björk", "Arca", "Michel Gondry", "Hans-Ulrich Obrist"],
      summary:
        "Cover feature where collaborators and admirers pose the questions.",
      media: [
        {
          type: "article",
          url: "https://www.dazeddigital.com/music/article/36971/1/bjork-jesse-kanda-questions",
          sourceId: S.dazedUnravelled,
        },
      ],
      sourceIds: [S.dazedUnravelled],
    },
    {
      id: "appearance-dazed-2026",
      title: "Björk on nature, new music and working with AI",
      venue: "Dazed",
      publishedAt: "2026-06-29",
      participants: ["Björk"],
      summary:
        "'I'm a digital craftswoman' — on the Echolalia exhibition and album eleven.",
      media: [
        {
          type: "article",
          url: "https://www.dazeddigital.com/music/article/70555/1/bjrk-on-nature-new-music-and-working-with-ai-im-a-digital-craftswoman",
          sourceId: S.dazed2026,
        },
      ],
      sourceIds: [S.dazed2026],
    },
    {
      id: "appearance-rs-medulla",
      title: "Björk on Making 'Medúlla'",
      venue: "Rolling Stone",
      publishedAt: "2004-09-16",
      participants: ["Björk", "Jenny Eliscu"],
      summary: "On building an album almost entirely from her own voice.",
      media: [
        {
          type: "article",
          url: "https://www.rollingstone.com/music/music-features/bjork-album-medulla-887250/",
          sourceId: S.rsMedulla,
        },
      ],
      sourceIds: [S.rsMedulla],
    },
    {
      id: "appearance-pf-fossora",
      title: "Pitchfork Fossora cover story",
      venue: "Pitchfork",
      publishedAt: "2022-09",
      participants: ["Björk"],
      summary:
        "On mushrooms, grief for her mother, gabber, and the 'Iceland album.'",
      media: [
        {
          type: "article",
          url: "https://pitchfork.com/features/cover-story/bjork-interview/",
          sourceId: S.pfFossora,
        },
      ],
      sourceIds: [S.pfFossora],
    },
    {
      id: "appearance-olympics",
      title: "Athens 2004 Olympic opening ceremony",
      venue: "Olympic Games",
      publishedAt: "2004-08-13",
      participants: ["Björk"],
      summary:
        "Performed 'Oceania' as her dress unfurled across the stadium floor.",
      sourceIds: [S.dazedAppy, S.rsMedulla],
    },
  ],
  relations: [
    {
      id: "rel-the-sugarcubes",
      kind: "member_of",
      target: "the-sugarcubes",
      targetName: "The Sugarcubes",
      targetKind: "organization",
      note:
        "Singer 1986–1992 — the KUKL regrouping that made her internationally known: 'Birthday' topped Peel's Festive Fifty, the band played SNL in 1988, and three studio albums preceded the move to London.",
      start: "1986",
      end: "1992",
      targetWikidataId: "Q876705",
      sourceIds: [S.polar, S.wikipedia, S.sagaBjarkar, S.britannica],
    },
    {
      id: "rel-kukl",
      kind: "member_of",
      target: "kukl",
      targetName: "KUKL",
      targetKind: "organization",
      note: "The anarchist post-punk band, released on Crass's label, whose members regrouped as the Sugarcubes in 1986.",
      end: "1986",
      targetWikidataId: "Q286202",
      sourceIds: [S.polar, S.wikipedia, S.britannica],
    },
    {
      id: "rel-tappi-tikarrass",
      kind: "member_of",
      target: "tappi-tikarrass",
      targetName: "Tappi Tíkarrass",
      targetKind: "organization",
      note: "One of the string of Reykjavík punk and post-punk bands she played in through her teens.",
      sourceIds: [S.polar, S.wikipedia, S.britannica],
    },
    {
      id: "rel-exodus",
      kind: "member_of",
      target: "exodus",
      targetName: "Exodus",
      targetKind: "organization",
      note: "The jazz-fusion group among her teen-era Reykjavík bands.",
      sourceIds: [S.polar, S.wikipedia, S.britannica],
    },
    {
      id: "rel-spit-and-snot",
      kind: "member_of",
      target: "spit-and-snot",
      targetName: "Spit and Snot",
      targetKind: "organization",
      note: "Her teen-era punk band — she played drums.",
      sourceIds: [S.polar, S.wikipedia, S.britannica],
    },
    {
      id: "rel-smekkleysa",
      kind: "member_of",
      target: "smekkleysa",
      targetName: "Smekkleysa (Bad Taste)",
      targetKind: "organization",
      note: "The Reykjavík art collective the regrouped Sugarcubes members joined in 1986.",
      start: "1986",
      targetWikidataId: "Q579423",
      sourceIds: [S.polar, S.wikipedia, S.sagaBjarkar],
    },
    {
      id: "rel-einar-orn",
      kind: "collaborated",
      target: "einar-orn",
      targetName: "Einar Örn",
      note: "Bandmate from KUKL through the Sugarcubes — co-fronted the band with her until 1992.",
      end: "1992",
      targetWikidataId: "Q1305963",
      sourceIds: [S.polar, S.wikipedia, S.sagaBjarkar],
    },
    {
      id: "rel-nellee-hooper",
      kind: "collaborated",
      target: "nellee-hooper",
      targetName: "Nellee Hooper",
      note: "Produced Debut (1993), her first adult solo album, for One Little Indian.",
      targetWikidataId: "Q720576",
      sourceIds: [S.wikipedia, S.britannica, S.pf15years],
    },
    {
      id: "rel-tricky",
      kind: "collaborated",
      target: "tricky",
      targetName: "Tricky",
      note: "One of the trip-hop collaborators on Post (1995).",
      targetWikidataId: "Q313627",
      sourceIds: [S.wikipedia, S.pfVolta],
    },
    {
      id: "rel-howie-b",
      kind: "collaborated",
      target: "howie-b",
      targetName: "Howie B",
      note: "One of the techno collaborators on Post (1995).",
      targetWikidataId: "Q974221",
      sourceIds: [S.wikipedia, S.pfVolta],
    },
    {
      id: "rel-graham-massey",
      kind: "collaborated",
      target: "graham-massey",
      targetName: "Graham Massey",
      note: "The 808 State member among the Post (1995) collaborators.",
      targetWikidataId: "Q5593054",
      sourceIds: [S.wikipedia, S.pfVolta],
    },
    {
      id: "rel-mark-bell",
      kind: "collaborated",
      target: "mark-bell",
      targetName: "Mark Bell",
      note: "Made the electronic beats fused with live strings on Homogenic (1997).",
      targetWikidataId: "Q5569354",
      sourceIds: [S.sagaBjarkar, S.pfReviewBiophilia, S.wikipedia],
    },
    {
      id: "rel-lars-von-trier",
      kind: "collaborated",
      target: "lars-von-trier",
      targetName: "Lars von Trier",
      note: "Starred in and scored his Dancer in the Dark (2000) — Palme d'Or and Best Actress at Cannes.",
      targetWikidataId: "Q133730",
      sourceIds: [S.cannes, S.nytCannes],
    },
    {
      id: "rel-matmos",
      kind: "collaborated",
      target: "matmos",
      targetName: "Matmos",
      targetKind: "organization",
      note: "The duo among the makers of Vespertine (2001) — microbeats for the internet's 'static universe.'",
      targetWikidataId: "Q1256138",
      sourceIds: [S.pfVolta, S.wikipedia],
    },
    {
      id: "rel-rahzel",
      kind: "collaborated",
      target: "rahzel",
      targetName: "Rahzel",
      note: "Beatboxer featured on the almost entirely vocal Medúlla (2004).",
      targetWikidataId: "Q918592",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "rel-dokaka",
      kind: "collaborated",
      target: "dokaka",
      targetName: "Dokaka",
      note: "Beatboxer featured on Medúlla (2004).",
      targetWikidataId: "Q3033820",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "rel-tanya-tagaq",
      kind: "collaborated",
      target: "tanya-tagaq",
      targetName: "Tanya Tagaq",
      note: "Inuk throat singer featured on Medúlla (2004).",
      targetWikidataId: "Q759716",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "rel-mike-patton",
      kind: "collaborated",
      target: "mike-patton",
      targetName: "Mike Patton",
      note: "Featured vocalist on Medúlla (2004).",
      targetWikidataId: "Q316878",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "rel-robert-wyatt",
      kind: "collaborated",
      target: "robert-wyatt",
      targetName: "Robert Wyatt",
      note: "Featured vocalist on Medúlla (2004).",
      targetWikidataId: "Q312693",
      sourceIds: [S.bandcampMedulla, S.rsMedulla],
    },
    {
      id: "rel-timbaland",
      kind: "collaborated",
      target: "timbaland",
      targetName: "Timbaland",
      note: "Made the brass-driven, rhythm-forward Volta (2007) with her — the collaboration she describes as meeting on 'mutual ground.'",
      targetWikidataId: "Q179257",
      sourceIds: [S.pfVolta, S.wikipedia, S.guardianTibet],
    },
    {
      id: "rel-anohni",
      kind: "collaborated",
      target: "anohni",
      targetName: "ANOHNI",
      note: "Duetted on Volta's 'The Dull Flame of Desire' and 'My Juvenile' (2007).",
      targetWikidataId: "Q1262889",
      sourceIds: [S.pfVolta, S.wikipedia, S.guardianTibet],
    },
    {
      id: "rel-marjan-pejoski",
      kind: "collaborated",
      target: "marjan-pejoski",
      targetName: "Marjan Pejoski",
      note: "Designed the swan dress she wore to the 2001 Oscars — ridiculed then, canonical now.",
      targetWikidataId: "Q29619",
      sourceIds: [S.bbcSwan],
    },
    {
      id: "rel-arca",
      kind: "collaborated",
      target: "arca",
      targetName: "Arca",
      note: "Co-produced Vulnicura (2015) and co-wrote Utopia (2017) — a split she puts at roughly 60/40 hers.",
      targetWikidataId: "Q16149863",
      sourceIds: [S.pfVulnicura, S.pfUtopia, S.exclaimW],
    },
    {
      id: "rel-gabber-modus-operandi",
      kind: "collaborated",
      target: "gabber-modus-operandi",
      targetName: "Gabber Modus Operandi",
      targetKind: "organization",
      note: "The Indonesian duo whose gabber bursts anchor Fossora (2022).",
      sourceIds: [S.guardianFossora, S.pfFossora, S.fossora],
    },
    {
      id: "rel-one-little-indian",
      kind: "signed_to",
      target: "one-little-indian",
      targetName: "One Little Indian",
      targetKind: "organization",
      note: "The label that released Debut in July 1993 — her first solo album as an adult.",
      targetWikidataId: "Q1848933",
      sourceIds: [S.wikipedia, S.britannica, S.pf15years],
    },
    {
      id: "rel-jon-pareles",
      kind: "interviewed_by",
      target: "jon-pareles",
      targetName: "Jon Pareles",
      note: "New York Times Utopia interview, November 2017 — 'a love letter to enthusiasm and optimism.'",
      targetWikidataId: "Q6271357",
      sourceIds: [S.nytUtopia],
    },
    {
      id: "rel-rachel-martin",
      kind: "interviewed_by",
      target: "rachel-martin",
      targetName: "Rachel Martin",
      note: "NPR interview, November 2017 — on flute mythology, utopian research, and singing while walking.",
      targetWikidataId: "Q16211141",
      sourceIds: [S.nprUtopia],
    },
    {
      id: "rel-rod-stanley",
      kind: "interviewed_by",
      target: "rod-stanley",
      targetName: "Rod Stanley",
      note: "Dazed 'Violently Appy' interview, July 2011 — the Biophilia app suite, the banking crisis, and the fun 21st century.",
      sourceIds: [S.dazedAppy],
    },
    {
      id: "rel-jenny-eliscu",
      kind: "interviewed_by",
      target: "jenny-eliscu",
      targetName: "Jenny Eliscu",
      note: "Rolling Stone interview, September 2004 — on building Medúlla almost entirely from her own voice.",
      sourceIds: [S.rsMedulla],
    },
    {
      id: "rel-oddny-eir",
      kind: "interviewed_by",
      target: "oddny-eir",
      targetName: "Oddný Eir",
      note: "The writer in conversation with her across all nine album episodes of the Sonic Symbolism podcast (2022).",
      targetWikidataId: "Q15977725",
      sourceIds: [S.talkhouse, S.appleSonic],
    },
    {
      id: "rel-asmundur-jonsson",
      kind: "interviewed_by",
      target: "asmundur-jonsson",
      targetName: "Ásmundur Jónsson",
      note: "The musicologist in conversation with her across the Sonic Symbolism podcast (2022).",
      sourceIds: [S.talkhouse, S.appleSonic],
    },
  ],
  openQuestions: [
    "The 'first artist to use a touchscreen live' superlative is widely repeated but not strictly provable; the documented record supports the Reactable's mainstream debut at Coachella 2007 and the Lemur on the Volta tour.",
    "Debut (1993) is counted as her solo debut only in the adult sense — the 1977 children's album makes it technically her second solo record; sources differ in how they number her catalog.",
    "Whether the 2015 MoMA retrospective failed on curation and scale, or because a museum survey cannot hold format-inventing work, is unresolved in the cited criticism.",
    "Conservation status of the interactive works: MoMA acquired a stable Biophilia package, but long-term viability of the apps and Vulnicura VR on evolving platforms is an open question the record does not settle.",
    "Per-album production splits (e.g., the ~60/40 Utopia figure she cites) are self-reported; the wider dispute over crediting women producers is documented only through her own account.",
    "An eleventh studio album is in progress per the June 2026 Dazed interview; title, date, and format are unannounced at the research cutoff.",
    "The Cornucopia concert film's wider distribution status after its cinema screenings is not confirmed in the cited sources.",
  ],
  body: `Björk Guðmundsdóttir (born 21 November 1965, Reykjavík) is an Icelandic musician whose five-decade career has treated each album as a new medium. Singer in the Sugarcubes, then the author of ten solo albums from *Debut* (1993) to *Fossora* (2022), she is also the maker of the first album-scale app, a VR album cycle, a museum retrospective, and a music-and-science curriculum used in Nordic schools.

## Formation: child singer to punk to the Sugarcubes

A child of Reykjavík's music school — piano, flute, and voice from age five — she released an eponymous album of covers and children's songs in December 1977 at age eleven, after a radio appearance led to a record deal (Polar Music Prize biography; the official "Saga Bjarkar" on bjork.com). Her teens were spent in punk: drums in Spit and Snot, then Exodus, Tappi Tíkarrass, and the anarchist band KUKL, whose members regrouped in 1986 as the Sugarcubes under the Smekkleysa ("Bad Taste") collective. "Birthday" was single of the week in both Melody Maker and NME in 1987 and topped John Peel's Festive Fifty; by 1988 the band was on *Saturday Night Live*. They disbanded in 1992 and she moved to London.

## The solo run: an album per constraint

*Debut* (1993), produced with Nellee Hooper, made her a solo star. The catalog that followed is easiest to read as a series of deliberate constraints — a pattern critics noticed early and she now narrates herself on the 2022 podcast *Sonic Symbolism*: *Post* (1995) with trip-hop and techno collaborators Tricky, Howie B, and Graham Massey; *Homogenic* (1997) fusing Mark Bell's electronic beats with strings; *Vespertine* (2001) written on her first laptop as music for the internet's "static universe"; *Medúlla* (2004) built almost entirely of voices — Rahzel, Dokaka, Tanya Tagaq, Mike Patton, Robert Wyatt; *Volta* (2007) brass-forward with Timbaland and ANOHNI. In 2000 she starred in and scored Lars von Trier's *Dancer in the Dark*, which won the Palme d'Or at Cannes with Björk named Best Actress; the following March she attended the Oscars in Marjan Pejoski's swan dress, laying eggs on the red carpet — ridiculed then, canonical now (BBC Culture).

## Formats: touchscreens, apps, VR

Her technical firsts are unusually concrete. On the 2007–08 Volta tour the band played the JazzMutant Lemur multitouch screen and the Reactable tangible tabletop; the Reactable's developers credit her 27 April 2007 Coachella set with introducing it to a mainstream audience (Wired; arj.no relaying the Pompeu Fabra announcement). *Biophilia* (2011) was released simultaneously as an album and an iPad app suite — one interactive app per song, custom instruments including a ten-foot pendulum harp and a gameleste — and in 2014 became the first downloadable app in MoMA's permanent collection. The *Björk Digital* exhibition toured Vulnicura VR videos worldwide from 2016 to 2020, and *Vulnicura VR* shipped on Steam in 2019. The often-quoted "first artist to use a touchscreen live" is preserved here as speculation: the mainstreaming is documented, absolute priority is not.

## Beliefs in her own words

The stated philosophy is reconciliation: "If you can make nature and technology friends, then you can make everyone friends" (Pitchfork, 2015). Formats are "just illusions" — the maker-listener relationship is what persists (Pitchfork, 2011). She describes herself as "a bit of a tyrant" over her music while treating visuals as collaboration (Wired, 2016), estimates her laptop editing at eighty percent of the work (Guardian, 2017), and has pushed publicly for women producers to be credited — quantifying her own Utopia split with Arca at roughly 60/40. Her environmentalism is explicitly economic: in a 2008 Times op-ed (rehosted by Saving Iceland) she argued Iceland should power small, locally owned green companies rather than foreign smelters — the same self-determination argument behind the "Declare Independence" dedications to Greenland, the Faroe Islands, Kosovo, and, shouted in Shanghai in March 2008, Tibet.

## Institutions: museum, academy, classroom

In March–June 2015 MoMA mounted a midcareer retrospective including the commissioned "Black Lake" installation; the New York Times, Guardian, and Atlantic all faulted the show's cramped execution while affirming the subject. She gave a two-hour lecture at Red Bull Music Academy Montréal in October 2016. *Cornucopia*, her most elaborate staged concert — Hamrahlíð choir, Viibra flutes, Tobias Gremmler visuals — premiered at The Shed in May 2019. Most durably, the Biophilia Educational Project she initiated with the City of Reykjavík and the University of Iceland ran in Nordic schools from 2014 to 2017 under the Nordic Council of Ministers.

## The recent run

*Vulnicura* (2015) was the chronological breakup album co-produced by Arca; *Utopia* (2017) answered it with flutes, birdsong, and researched optimism. *Fossora* (2022) dug into bass clarinets, gabber via Gabber Modus Operandi, and mycelial grief for her mother. *Sonic Symbolism* (2022) put her own narration on the whole catalog, and in June 2026 her *Echolalia* exhibition opened at the National Gallery of Iceland while she builds an eleventh album — still insisting, per Dazed, "I'm not trying to be an artist. I'm still a musician."

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
