import {
  MarketingCallToAction,
  MarketingInstallPanel,
  MarketingInterfaceGrid,
  MarketingPage,
  MarketingProofFrame,
  MarketingQuestionList,
  MarketingSection,
  MarketingSiteHeader,
  MarketingTrustBoundary,
  ProductHero,
} from "@hraness/design-kit/react/server";
import { AskAiAboutThis } from "@hraness/ui";

import { parsePersonIndex, personIndexDigest } from "../../skills/soulscrape/scripts/person-index";
import {
  PersonProfileArticle,
  PersonProfileHeader,
} from "../components/person-profile";
import type { StoredProfile } from "../lib/profile-view";
import { landingHtml } from "./landing.generated";
import publishedRelease from "../published-release.json";
import examplePacketJson from "../../examples/people/eugene-tssui/person-index.json";

function TopicIcon({ slug }: Readonly<{ slug: string }>) {
  // Decorative local SVG; next/image cannot optimize vector sources.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="soulscrape-topic-icon" src={`/icons/${slug}.svg`} alt="" aria-hidden="true" width="88" height="88" loading="lazy" decoding="async" />
  );
}

const repository = "https://github.com/hraness/soulscrape";
const releaseVersion = publishedRelease.version;

const heading = "people for agents";
const lead =
  "distill the essence of any human, for reference, imitation, or fun. an agent skill that turns the evidence you're authorized to use into a dated, revisable working model of a person — and a public index anyone can inspect.";
const footnote =
  `free and MIT licensed. an agent skill for Claude Code, Codex, Cursor, and compatible agents. current verified release ${publishedRelease.package}@${releaseVersion}.`;

const artifactPreview = `# <Name>: a dated working model

> Status: Partial, source-bounded, dated, and revisable. The real person's
> current words, choices, and corrections outrank this document.

## Executive model
The few patterns that best explain the subject's demonstrated choices.

## Practical operating manual
How to bring context, disagree, decide, draft, verify, and close loops.

## Tensions, limits, and revision hooks
Where the evidence conflicts, where the model predicts poorly, and what
new evidence should change it.

## What not to infer
Sensitive, unsupported, stale, or out-of-scope conclusions.`;

const trust = [
  {
    label: "authorized evidence only",
    detail: "soulscrape reads the corpus you place in scope and nothing else. possessing messages, a packet, or public information is not the subject's authorization, and the skill says so before it starts.",
  },
  {
    label: "asking before guessing",
    detail: "a question packet records the subject, the intended use, the evidence available and missing, what you must authorize, and when the work is done. the skill asks once, only for what changes the result.",
  },
  {
    label: "research under your instructions",
    detail: "public web research is off by default. when you turn it on, scope comes from your words: allowed sources, time window, depth, and purpose. every finding carries its URL, access date, passage, and identity binding, and nothing is attributed to a person from a name alone.",
  },
  {
    label: "calibrated, not confident",
    detail: "facts, stated beliefs, revealed patterns, and speculation stay separate. contradictions are preserved. confidence describes support within the evidence examined, never how essentially a claim defines someone.",
  },
] as const;

const interfaces = [
  {
    label: "agent skill",
    summary: "install the skill through skills.sh, then ask for a dated working model from the sources you authorize.",
    example: (
      <>
        <TopicIcon slug="agent-skill" />
        <pre tabIndex={0}><code>{publishedRelease.skillInstall}</code></pre>
        <p className="interface-link"><a href={`${repository}/blob/main/skills/soulscrape/SKILL.md`}>read the skill</a></p>
      </>
    ),
  },
  {
    label: "immutable package",
    summary: "the GitHub Release archive carries the complete skill, its references, and the dependency-free packet utilities.",
    example: (
      <>
        <TopicIcon slug="package" />
        <pre tabIndex={0}><code>{`bun add --exact ${publishedRelease.archiveUrl}`}</code></pre>
        <p className="interface-link"><a href={publishedRelease.releaseUrl}>inspect the release</a></p>
      </>
    ),
  },
  {
    label: "source packets",
    summary: "Message Like Me and Peopleblade export bounded, attributed, digest-checked evidence packets that the skill validates offline before reading.",
    example: (
      <>
        <TopicIcon slug="source-packets" />
        <pre tabIndex={0}><code>{`bun scripts/validate-source-packet.ts \\
  /absolute/private/path/subject.ensoul-source.json`}</code></pre>
        <p className="interface-link"><a href={`${repository}/blob/main/skills/soulscrape/references/source-packets.md`}>read the packet contract</a></p>
      </>
    ),
  },
] as const;

const questions = [
  {
    question: "is soulscrape a digital twin?",
    answer: "it can bootstrap a bounded reasoning proxy when the subject has authorized that use, but it does not claim to contain or reproduce a person. the output is a dated, purpose-shaped interpretation of selected evidence.",
  },
  {
    question: "can i use it to understand someone else?",
    answer: "yes, for a privacy-minimized collaboration guide when you legitimately possess the evidence. that does not authorize voice imitation, character or fitness evaluation, consequential decisions, or a reusable assistant charter. explicit subject authorization is required for proxy preparation.",
  },
  {
    question: "does it search the web about people?",
    answer: "not by default. web research turns on when you ask for it or name a URL, and it follows your instructions on sources, time window, and depth. it uses authenticated sources only when explicitly authorized, never bypasses access controls or collects contact details, and it stops when your questions are answered or the allowed sources are exhausted.",
  },
  {
    question: "what does a valid source packet prove?",
    answer: "structure, attribution fields, bounds, references, and integrity. the workflow still assesses identity binding, provenance, source strength, contradictions, and alternative explanations. a digest proves integrity, not truth.",
  },
  {
    question: "does installation inspect personal data?",
    answer: "no. the skill installation is inert and the package has no dependencies or lifecycle scripts. evidence becomes visible only when you place authorized sources into an agent run or explicitly invoke a source-preparation command.",
  },
  {
    question: "what happened to ensoul?",
    answer: "soulscrape is the same project under a new name since September 10, 2026. the packet schema, its ensoul.* identifiers, and the validator are unchanged so existing exporters keep working. versions through 0.3.5 remain published as @hraness/ensoul.",
  },
] as const;

// The checked-in Eugene Tssui packet is the bootstrapped state for the
// homepage preview: the same components that render live profiles render it.
const examplePacket = parsePersonIndex(examplePacketJson);
const exampleProfile: StoredProfile = {
  username: "ben",
  handle: "eugene-tssui",
  packetDigest: personIndexDigest(examplePacket),
  revision: 1,
  packet: examplePacket,
  publishedAtMs: 0,
  updatedAtMs: 0,
};

const featuredIndexes = [
  {
    handle: "eugene-tssui",
    name: "Eugene Tssui",
    note: "The evolutionary architect who builds like nature does",
  },
  {
    handle: "patrick-collison",
    name: "Patrick Collison",
    note: "Stripe co-founder; progress studies and the craft of speed",
  },
  {
    handle: "christopher-alexander",
    name: "Christopher Alexander",
    note: "A Pattern Language and the quality without a name",
  },
  {
    handle: "michael-levin",
    name: "Michael Levin",
    note: "Bioelectricity, morphogenesis, and unconventional minds",
  },
  {
    handle: "joscha-bach",
    name: "Joscha Bach",
    note: "Synthetic intelligence and computational theories of mind",
  },
  {
    handle: "stephen-wolfram",
    name: "Stephen Wolfram",
    note: "Computation as the foundation of physics",
  },
  {
    handle: "terry-davis",
    name: "Terry A. Davis",
    note: "TempleOS and the single-author operating system",
  },
  {
    handle: "37signals",
    name: "37signals",
    note: "Basecamp, HEY, and the long-running case against venture capital",
  },
  {
    handle: "alan-kay",
    name: "Alan Kay",
    note: "Smalltalk, the Dynabook, and computing's unrealized revolution",
  },
  {
    handle: "amelia-wattenberger",
    name: "Amelia Wattenberger",
    note: "Data visualization and interfaces beyond the chat box",
  },
  {
    handle: "anil-dash",
    name: "Anil Dash",
    note: "Blogger since 1999; Six Apart, Glitch, and the first NFT",
  },
  {
    handle: "andrej-karpathy",
    name: "Andrej Karpathy",
    note: "CS231n to Tesla AI to Eureka Labs; teacher of the field",
  },
  {
    handle: "bad-bunny",
    name: "Bad Bunny",
    note: "From grocery bagging to the most-streamed artist alive",
  },
  {
    handle: "bjork",
    name: "Björk",
    note: "Iceland's one-woman R&D lab; the app-as-album",
  },
  {
    handle: "bret-victor",
    name: "Bret Victor",
    note: "Inventing on Principle; Dynamicland and tools for thought",
  },
  {
    handle: "brian-eno",
    name: "Brian Eno",
    note: "Ambient inventor; Oblique Strategies and scenius",
  },
  {
    handle: "bryan-cantrill",
    name: "Bryan Cantrill",
    note: "DTrace, Oxide, and the rack-scale cloud computer",
  },
  {
    handle: "burial",
    name: "Burial",
    note: "Untrue; the anonymous heart of UK garage",
  },
  {
    handle: "caterina-barbieri",
    name: "Caterina Barbieri",
    note: "Buchla modular composer; patterns of ecstatic computation",
  },
  {
    handle: "conor-white-sullivan",
    name: "Conor White-Sullivan",
    note: "Roam Research and networked thought",
  },
  {
    handle: "cory-doctorow",
    name: "Cory Doctorow",
    note: "Coined enshittification; EFF and the pluralistic canon",
  },
  {
    handle: "dan-snaith",
    name: "Dan Snaith",
    note: "Caribou and Daphni; a math PhD on the dance floor",
  },
  {
    handle: "daniel-lopatin",
    name: "Daniel Lopatin",
    note: "Oneohtrix Point Never; Eccojams to the Safdie scores",
  },
  {
    handle: "david-crawshaw",
    name: "David Crawshaw",
    note: "Go's mobile stack, Tailscale, and exe.dev",
  },
  {
    handle: "david-heinemeier-hansson",
    name: "David Heinemeier Hansson",
    note: "Rails, 37signals, and the majestic monolith",
  },
  {
    handle: "dax-raad",
    name: "Dax Raad",
    note: "SST, terminal.shop, and the opencode agent",
  },
  {
    handle: "dwarkesh-patel",
    name: "Dwarkesh Patel",
    note: "Long-form interviews with the people building AI",
  },
  {
    handle: "dylan-patel",
    name: "Dylan Patel",
    note: "SemiAnalysis and the physics of AI infrastructure",
  },
  {
    handle: "geoffrey-huntley",
    name: "Geoffrey Huntley",
    note: "ReactiveUI, Ralph loops, and engineering in the agent era",
  },
  {
    handle: "geoffrey-litt",
    name: "Geoffrey Litt",
    note: "Malleable software and local-first research",
  },
  {
    handle: "george-hotz",
    name: "George Hotz",
    note: "geohot; iPhone unlock, comma.ai, tinygrad",
  },
  {
    handle: "greg-brockman",
    name: "Greg Brockman",
    note: "OpenAI co-founder and Stripe's first CTO",
  },
  {
    handle: "gwern",
    name: "Gwern",
    note: "gwern.net; self-experiments and the scaling hypothesis",
  },
  {
    handle: "hyperdub",
    name: "Hyperdub",
    note: "Kode9's label — dubstep's outlier wing, from Burial to footwork",
  },
  {
    handle: "jane-manchun-wong",
    name: "Jane Manchun Wong",
    note: "The definitive leaker of unreleased app features",
  },
  {
    handle: "johannes-schickling",
    name: "Johannes Schickling",
    note: "Prisma, LiveStore, and the local-first stack",
  },
  {
    handle: "joel-spolsky",
    name: "Joel Spolsky",
    note: "Joel on Software, Stack Overflow, and Trello",
  },
  {
    handle: "linus-lee",
    name: "Linus Lee",
    note: "Independent research on tools for thought",
  },
  {
    handle: "long-now-foundation",
    name: "The Long Now Foundation",
    note: "Brand, Hillis, and Eno's 10,000-year bet on long-term thinking",
  },
  {
    handle: "lorenzo-senni",
    name: "Lorenzo Senni",
    note: "Pointillistic trance — euphoria without the drop",
  },
  {
    handle: "mario-zechner",
    name: "Mario Zechner",
    note: "libGDX, pi, and opinionated minimal coding agents",
  },
  {
    handle: "matt-levine",
    name: "Matt Levine",
    note: "Money Stuff; everything is securities fraud",
  },
  {
    handle: "mitchell-hashimoto",
    name: "Mitchell Hashimoto",
    note: "HashiCorp co-founder; now building Ghostty",
  },
  {
    handle: "oxide-computer",
    name: "Oxide Computer Company",
    note: "Cantrill, Frazelle, and Tuck's rack-scale cloud computer",
  },
  {
    handle: "patrick-mckenzie",
    name: "Patrick McKenzie",
    note: "patio11; Kalzumeus, Stripe, and Bits About Money",
  },
  {
    handle: "paul-graham",
    name: "Paul Graham",
    note: "Viaweb, Y Combinator, and the essay canon",
  },
  {
    handle: "peter-steinberger",
    name: "Peter Steinberger",
    note: "From PSPDFKit to OpenClaw",
  },
  {
    handle: "pieter-levels",
    name: "Pieter Levels",
    note: "levelsio; Nomad List, Photo AI, and building in public",
  },
  {
    handle: "richard-d-james",
    name: "Richard D. James",
    note: "Aphex Twin; self-mythology as an instrument",
  },
  {
    handle: "riley-walz",
    name: "Riley Walz",
    note: "Jmail, Bop Spotter, and public-data stunts",
  },
  {
    handle: "roam-research",
    name: "Roam Research",
    note: "The networked-thought tool; a note graph as cult object",
  },
  {
    handle: "simon-willison",
    name: "Simon Willison",
    note: "Django co-creator; Datasette and prompt injection",
  },
  {
    handle: "steph-ango",
    name: "Steph Ango",
    note: "Obsidian's CEO; file over app",
  },
  {
    handle: "steve-yegge",
    name: "Steve Yegge",
    note: "Stevey's rants, platforms, and AI transformation",
  },
  {
    handle: "stewart-brand",
    name: "Stewart Brand",
    note: "Whole Earth Catalog and the Long Now",
  },
  {
    handle: "thomas-ptacek",
    name: "Thomas Ptacek",
    note: "Matasano, Cryptopals, and applied security",
  },
  {
    handle: "tim-berners-lee",
    name: "Tim Berners-Lee",
    note: "Inventor of the Web; Solid and the fight to reclaim it",
  },
  {
    handle: "tim-hecker",
    name: "Tim Hecker",
    note: "Noise, texture, and sacred space",
  },
  {
    handle: "tyler-cowen",
    name: "Tyler Cowen",
    note: "Marginal Revolution, Emergent Ventures, and the great stagnation",
  },
  {
    handle: "yacine-brahimi",
    name: "Yacine Brahimi",
    note: "kache; dingboard and viral client-side experiments",
  },
] as const;

const publishTranscript = `$ bun skills/soulscrape/scripts/publish-person.ts login

  Sign in to approve this device:
  https://soulscrape.com/connect?code=SS-K7P4-QM92

  … approve in the browser after email sign-in …
  Signed in as ben.

$ bun skills/soulscrape/scripts/publish-person.ts publish \\
    examples/people/eugene-tssui/person-index.json

  {"url":"https://soulscrape.com/ben/eugene-tssui","handle":"eugene-tssui","revision":1}

$ bun skills/soulscrape/scripts/publish-person.ts withdraw eugene-tssui   # reverses it anytime`;

const navigation = [
  { href: "#method", label: "method" },
  { href: "#indexes", label: "public indexes" },
  { href: "#boundaries", label: "boundaries" },
  { href: "#interfaces", label: "interfaces" },
  { href: "#questions", label: "questions" },
  { href: repository, label: "github" },
] as const;

function BrandMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className="brand-mark">
      <rect width="64" height="64" rx="14" fill="currentColor" />
      <path d="M16 40c0-8 7-10 14-11s12-3 12-9c0-5-4-8-10-8-5 0-9 2-11 5" fill="none" stroke="var(--background)" strokeWidth="5" strokeLinecap="round" />
      <path d="M48 24c0 8-7 10-14 11s-12 3-12 9c0 5 4 8 10 8 5 0 9-2 11-5" fill="none" stroke="var(--background)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      codeRepository: repository,
      description: lead,
      license: "https://opensource.org/license/mit",
      name: "soulscrape",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Bun",
      url: "https://soulscrape.com",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map(({ answer, question }) => ({
        "@type": "Question",
        acceptedAnswer: { "@type": "Answer", text: answer },
        name: question,
      })),
    },
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <a className="skip-link" href="#main">Skip to content</a>
      <MarketingSiteHeader
        action={{ href: "#install", label: "install the skill" }}
        brand={<><BrandMark />soulscrape</>}
        brandLabel="soulscrape home"
        links={navigation}
      />

      <main id="main" tabIndex={-1}>
        <MarketingPage>
          <ProductHero
            actions={[
              { href: "#install", label: "install the skill" },
              { href: "#method", label: "see how it works" },
            ]}
            boundary={footnote}
            className="soulscrape-marketing-hero"
            eyebrow="an agent skill for evidence-calibrated person models"
            frame={(
              <MarketingProofFrame
                caption="the shape of a well-supported result. its sections follow the evidence rather than a personality template."
                credit="markdown produced by the skill"
                title="<person>-soulscrape.md"
              >
                <pre className="transcript" tabIndex={0}><code>{artifactPreview}</code></pre>
              </MarketingProofFrame>
            )}
            heading={heading}
            headingId="hero-title"
            name="soulscrape"
            summary={lead}
          />

          <MarketingSection
            heading="how a person becomes a model."
            headingId="method-title"
            id="method"
            label="the method"
            summary="read the evidence, keep the contradictions, mark every claim's limits."
          >
            <article
              className="readme-prose"
              dangerouslySetInnerHTML={{ __html: landingHtml }}
            />
          </MarketingSection>

          <MarketingSection
            heading="a model for you; an index for everyone."
            headingId="indexes-title"
            id="indexes"
            label="public indexes"
            summary="the same distillation, served publicly: a dated, source-bounded index of a person — claims, timeline, themes, works, appearances, and open questions — published under your Hraness account."
          >
            <div className="indexes-flow">
              <MarketingProofFrame
                caption="a published index page, rendered by the same components that serve it live."
                credit="soulscrape.com/ben/eugene-tssui — live"
                title="soulscrape.com/<username>/<handle>"
              >
                <div className="person-mockup" aria-label="Preview of a published person index">
                  <div className="person-mockup-bar" aria-hidden="true">
                    <span className="person-mockup-dot" />
                    <span className="person-mockup-dot" />
                    <span className="person-mockup-dot" />
                    <span className="person-mockup-url">soulscrape.com/ben/eugene-tssui</span>
                  </div>
                  <div className="person-mockup-scroll">
                    <PersonProfileHeader profile={exampleProfile} nameAs="strong" />
                    <PersonProfileArticle packet={exampleProfile.packet} />
                  </div>
                </div>
              </MarketingProofFrame>

              <MarketingProofFrame
                caption="the publish path: device sign-in through Hraness Accounts, then one command."
                credit="real transcript"
                title="publish-person.ts"
              >
                <pre className="transcript" tabIndex={0}><code>{publishTranscript}</code></pre>
              </MarketingProofFrame>
            </div>

            <ul className="featured-indexes">
              {featuredIndexes.map(index => (
                <li key={index.handle}>
                  <a href={`/ben/${index.handle}`}>
                    <strong>{index.name}</strong>
                    <span>{index.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="featured-note">
              live indexes published by <a href="/ben">@ben</a> with the workflow above. every
              claim cites its sources; every page serves the same packet as HTML, Markdown, and
              JSON.
            </p>
          </MarketingSection>

          <MarketingTrustBoundary
            heading="boundaries the skill keeps for you."
            headingId="boundaries-title"
            id="boundaries"
            items={trust}
            label="boundaries"
            summary="these are product boundaries, not optional cautions. the skill keeps them adjacent to corpus intake, synthesis, output design, and final verification."
          />

          <MarketingInterfaceGrid
            heading="one skill, three interfaces."
            headingId="interfaces-title"
            id="interfaces"
            interfaces={interfaces}
            label="interfaces"
            summary="the skill, the immutable package, and the source-packet contract are the same reviewed files. there is no separate hosted service."
          />

          <MarketingInstallPanel
            eyebrow={`current verified release · ${publishedRelease.package}@${releaseVersion}`}
            heading="install and run one bounded corpus."
            headingId="install-title"
            id="install"
          >
            <pre className="install-command" tabIndex={0}><code>{publishedRelease.skillInstall}</code></pre>
            <pre className="install-command" tabIndex={0}><code>{`Use $${publishedRelease.skill} to build a dated, evidence-calibrated, partial and revisable working model of <person> from <authorized sources>. State the intended use, audience, source cutoff, and any proxy authorization explicitly.`}</code></pre>
            <p className="install-note">
              <a href={publishedRelease.releaseUrl}>release notes and verified assets</a>.{" "}
              review the skill before installation and start a new agent session afterward. begin with a corpus small enough to inspect; add evidence when it supplies a missing period, context, source stratum, or meaningful contradiction.{" "}
              <a href={`${repository}#install-and-build-your-first-model`}>read the full installation guide on GitHub</a>.
            </p>
          </MarketingInstallPanel>

          <MarketingQuestionList
            heading="before you install."
            headingId="questions-title"
            id="questions"
            label="questions"
            questions={questions.map(({ answer, question }) => ({
              answer: <p>{answer}</p>,
              question,
            }))}
          />

          <MarketingCallToAction
            actions={[
              { href: "#install", label: "install the skill" },
              { href: repository, label: "read the source" },
            ]}
            footnote={footnote}
            heading="distill the person. keep the boundaries."
            headingId="cta-title"
            summary="choose sources you're authorized to use, state the intended use, and ask for a dated working model."
          />
        </MarketingPage>
      </main>

      <AskAiAboutThis className="ask-ai" url="https://soulscrape.com" />

      <div className="site-footer">
        <p>people modeling people, with the agents beside them. open source, MIT licensed.</p>
        <nav aria-label="Project links">
          <a href={`${repository}/blob/main/skills/soulscrape/SKILL.md`}>agent skill</a>
          <a href={repository}>hraness/soulscrape</a>
          <a href="https://hraness.com/projects">hraness projects</a>
        </nav>
      </div>
    </>
  );
}
