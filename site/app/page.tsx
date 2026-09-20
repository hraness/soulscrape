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
  SyntaxCode,
} from "@hraness/design-kit/react/server";
import { AskAiAboutThis } from "@hraness/ui";

import { parsePersonIndex, personIndexDigest } from "../../skills/soulscrape/scripts/person-index";
import { ExampleIndexCard } from "../components/example-index-card";
import {
  PersonProfileArticle,
  PersonProfileHeader,
} from "../components/person-profile";
import type { StoredProfile } from "../lib/profile-view";
import { featuredIndexes, showcaseIndexes } from "../lib/examples";
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
  "a working model of a person, built from their words and work. explore public examples, or use your agent, model, and tools to research evidence you're authorized to use. review the result and publish a public index for free.";
const freeAccountHref = "/api/suite-auth/start?return_to=%2F";
const footnote =
  `free Skill and public publishing. no Soulscrape subscription, Credits, or payment card. external agent and tool costs are separate. MIT licensed. an agent skill for Claude Code, Codex, Cursor, and compatible agents. verified install ${publishedRelease.package}@${releaseVersion}.`;

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
        <pre tabIndex={0}><SyntaxCode code={publishedRelease.skillInstall} styles="classes" /></pre>
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
        <pre tabIndex={0}><SyntaxCode code={`bun add --exact ${publishedRelease.archiveUrl}`} styles="classes" /></pre>
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
        <pre tabIndex={0}><SyntaxCode code={`bun scripts/validate-source-packet.ts \\
  /absolute/private/path/subject.ensoul-source.json`} language="shell" styles="classes" /></pre>
        <p className="interface-link"><a href={`${repository}/blob/main/skills/soulscrape/references/source-packets.md`}>read the packet contract</a></p>
      </>
    ),
  },
] as const;

const questions = [
  {
    question: "do i need an account or a paid plan?",
    answer: "the full Skill runs in your agent without a Soulscrape account. public pages and read APIs are free without sign-in. create a free Hraness account to publish, update, or withdraw your indexes. no Soulscrape subscription, Credits, or payment card is required. any charges from your agent, model, or research tools are separate.",
  },
  {
    question: "where does the research happen?",
    answer: "your agent performs the research and synthesis with your model, tools, and authorized sources. private sources and working documents stay in your chosen agent environment, subject to its data practices. when you choose to publish, Hraness receives the reviewed public packet and the account/device information needed to manage it.",
  },
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

const publishTranscript = `$ bun skills/soulscrape/scripts/publish-person.ts login

  Sign in to approve this device:
  https://soulscrape.com/connect?code=SS-K7P4-QM92

  … approve in the browser after email sign-in …
  Signed in as ben.

$ bun skills/soulscrape/scripts/publish-person.ts publish \\
    examples/people/eugene-tssui/person-index.json

  {"url":"https://soulscrape.com/ben/eugene-tssui","handle":"eugene-tssui","revision":1}

$ bun skills/soulscrape/scripts/publish-person.ts withdraw eugene-tssui   # removes it from public reads`;

const navigation = [
  { href: "/examples", label: "Examples" },
  { href: "#method", label: "method" },
  { href: "#indexes", label: "publish your own" },
  { href: "#boundaries", label: "boundaries" },
  { href: "#interfaces", label: "interfaces" },
  { href: "#questions", label: "questions" },
  { href: repository, label: "github" },
] as const;

function BrandMark() {
  // eslint-disable-next-line @next/next/no-img-element -- the canonical mark is a fixed-size authored SVG
  return <img alt="" aria-hidden="true" className="brand-mark" height={20} src="/marks/soulscrape.svg" width={20} />;
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
        action={{ href: freeAccountHref, label: "free account / sign in" }}
        brand={<><BrandMark />soulscrape</>}
        brandLabel="soulscrape home"
        links={navigation}
      />

      <main id="main" tabIndex={-1}>
        <MarketingPage>
          <ProductHero
            align="start"
            actions={[
              { href: "/examples", label: "explore the examples" },
              { href: "#install", label: "install the skill" },
              { href: "#indexes", label: "publish for free" },
            ]}
            boundary={footnote}
            className="soulscrape-marketing-hero"
            eyebrow="an agent skill for evidence-calibrated person models"
            frame={(
              <div className="hero-examples" aria-label="Featured examples">
                <p className="hero-examples-caption"><span aria-hidden="true">✳</span> a few people. a whole world of ideas.</p>
                <ul className="hero-examples-cards">
                  {showcaseIndexes.slice(0, 4).map((index, position) => (
                    <li key={index.handle}>
                      <ExampleIndexCard index={index} number={position + 1} featured />
                    </li>
                  ))}
                </ul>
                <p className="hero-examples-note">real people. public sources. open to inspection.</p>
              </div>
            )}
            heading={heading}
            headingId="hero-title"
            name="soulscrape"
            summary={lead}
          />

          <MarketingSection
            heading="start with someone interesting."
            headingId="examples-title"
            id="examples"
            label="Examples"
            summary="A personal collection of builders, musicians, scientists, and others worth following. Explore their work, ideas, and the sources behind each profile."
          >
            <ul className="example-index-grid" aria-label="Featured examples">
              {showcaseIndexes.map((index, position) => (
                <li key={index.handle}>
                  <ExampleIndexCard index={index} number={position + 1} />
                </li>
              ))}
            </ul>
            <p className="featured-note">
              Dated, revisable models made from public evidence. These examples are interpretations,
              not endorsements by the people featured. Published by <a href="/ben">@ben</a>.{" "}
              <a href="/portraits/credits.html">Portrait credits</a>.
            </p>
            <a className="browse-examples-link" href="/examples">
              <span>browse all {featuredIndexes.length} examples</span>
              <span aria-hidden="true">↗</span>
            </a>
          </MarketingSection>

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
            heading="make a model. share what you learn."
            headingId="indexes-title"
            id="indexes"
            label="publish your own"
            summary="the same distillation, served publicly: a dated, source-bounded index of a person — claims, timeline, themes, works, appearances, and open questions — reviewed by you, then published under your free Hraness account."
          >
            <p>
              research runs in your agent; publishing is a separate choice. review the complete
              packet before uploading it. public pages and read APIs are free without sign-in.
              Hraness stores the reviewed public packet and publishing metadata, not your private
              source corpus.
            </p>
            <p>
              <a href={freeAccountHref}>create a free account or sign in</a>, then run the device
              login below. no Soulscrape subscription, Credits, or payment card is needed.
            </p>
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
                caption="after reviewing your packet, sign in to a free Hraness account and authorize this publishing device."
                credit="example publishing flow"
                title="publish-person.ts"
              >
                <pre className="transcript" tabIndex={0}><SyntaxCode code={publishTranscript} language="shell" styles="classes" /></pre>
              </MarketingProofFrame>
            </div>

            <p className="featured-note">
              <a href="/ben/eugene-tssui">open Eugene Tssui’s full index</a>. every claim cites
              its sources; every page serves the same packet as HTML, Markdown, and JSON.
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
            summary="the full Skill runs in your agent environment without a Soulscrape account. your agent and tools perform research; the free hosted API reads and publishes reviewed public packets."
          />

          <MarketingInstallPanel
            eyebrow={`verified install · ${publishedRelease.package}@${releaseVersion}`}
            heading="install and run one bounded corpus."
            headingId="install-title"
            id="install"
          >
            <pre className="install-command" tabIndex={0}><SyntaxCode code={publishedRelease.skillInstall} styles="classes" /></pre>
            <pre className="install-command" tabIndex={0}><SyntaxCode code={`Use $${publishedRelease.skill} to build a dated, evidence-calibrated, partial and revisable working model of <person> from <authorized sources>. State the intended use, audience, source cutoff, and any proxy authorization explicitly.`} language="text" styles="classes" /></pre>
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
              { href: freeAccountHref, label: "create a free account" },
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
