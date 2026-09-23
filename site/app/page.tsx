import {
  MarketingCallToAction,
  MarketingField,
  MarketingFlow,
  MarketingInstallPanel,
  MarketingInterfaceGrid,
  MarketingPage,
  MarketingProofFrame,
  MarketingQuestionList,
  MarketingRelated,
  MarketingSection,
  MarketingTrustBoundary,
  ProductHero,
  SyntaxCode,
} from "@hraness/design-kit/react/server";
import { AskAiAboutThis } from "@hraness/ui";

import { DeskField } from "../components/desk-field";
import { ExampleIndexCard } from "../components/example-index-card";
import { SiteHeader, SkipLink } from "../components/site-header";
import { featuredIndexes, showcaseIndexes } from "../lib/examples";
import { parsePersonIndex, personIndexDigest } from "../../skills/soulscrape/scripts/person-index";
import {
  PersonProfileArticle,
  PersonProfileHeader,
} from "../components/person-profile";
import type { StoredProfile } from "../lib/profile-view";
import { landingHtml } from "./landing.generated";
import publishedRelease from "../published-release.json";

function TopicIcon({ slug }: Readonly<{ slug: string }>) {
  // Decorative local SVG; next/image cannot optimize vector sources.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="soulscrape-topic-icon" src={`/icons/${slug}.svg`} alt="" aria-hidden="true" width="88" height="88" loading="lazy" decoding="async" />
  );
}

const repository = "https://github.com/hraness/soulscrape";
const releaseVersion = publishedRelease.version;

const heading = "research anyone. publish the dossier.";
const lead =
  "soulscrape turns evidence you're authorized to use into a dated, cited dossier — a working model of how a person decides, writes, argues, and changes their mind. keep it private, or publish it as a public index anyone can read, remix, or hand to an agent.";
const freeAccountHref = "/api/suite-auth/start?return_to=%2F";
const footnote =
  `free skill, free public publishing — no subscription, Credits, or card. MIT licensed. an agent skill for Claude Code, Codex, Cursor, and compatible agents. verified install ${publishedRelease.package}@${releaseVersion}.`;

const flowSteps = [
  {
    label: "research",
    detail:
      "your agent gathers the evidence you authorize — writing, talks, interviews, posts — under instructions you set: which sources, what time window, how deep. private corpora stay in your environment.",
  },
  {
    label: "dossier",
    detail:
      "the skill writes a dated working model: beliefs, decisions, voice, contradictions, and open questions — every claim wired to its source, calibrated rather than confident.",
  },
  {
    label: "publish + remix",
    detail:
      "release it as a public index at soulscrape.com/<you>/<name>. each page serves the same packet as HTML, Markdown, and JSON — read it, cite it, fork it, or feed it to an agent.",
  },
] as const;

const useCases = [
  {
    slug: "agent-grounding",
    title: "ground an agent",
    summary: "drop a dossier into context so answers align with a person's documented beliefs and latest writing — not a generic guess.",
  },
  {
    slug: "research",
    title: "research a person",
    summary: "a cited brief on a founder, guest, or collaborator before the call, the piece, or the deal.",
  },
  {
    slug: "writing",
    title: "write about someone",
    summary: "a belief map with sources for profiles, interviews, and essays.",
  },
  {
    slug: "personas",
    title: "bootstrap a persona",
    summary: "an authorized starting point for an assistant that works like its subject.",
  },
  {
    slug: "collaboration",
    title: "work with someone",
    summary: "a private, third-person guide to how they decide, disagree, and communicate.",
  },
  {
    slug: "self-model",
    title: "model yourself",
    summary: "a personal operating manual from your own logs, notes, and decisions.",
  },
] as const;

const trust = [
  {
    label: "authorized evidence only",
    detail: "soulscrape reads the corpus you place in scope and nothing else. possessing messages, a packet, or public information is not the subject's authorization, and the skill says so before it starts.",
  },
  {
    label: "asking before guessing",
    detail: "a question packet records the subject, the intended use, the evidence available and missing, and what you must authorize. the skill asks once, only for what changes the result.",
  },
  {
    label: "research under your instructions",
    detail: "public web research is off by default; when you turn it on, scope comes from your words. every finding carries its URL, access date, passage, and identity binding.",
  },
  {
    label: "calibrated, not confident",
    detail: "facts, stated beliefs, revealed patterns, and speculation stay separate. contradictions are preserved. confidence describes support within the evidence examined.",
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
    answer: "no. the full skill runs in your agent without a Soulscrape account, and public pages and read APIs are free without sign-in. a free Hraness account is needed only to publish, update, or withdraw your own indexes. charges from your agent, model, or research tools are separate.",
  },
  {
    question: "where does the research happen?",
    answer: "in your agent environment, with your model, tools, and authorized sources. private sources and working documents stay there, under its data practices. Hraness receives only the reviewed public packet when you choose to publish.",
  },
  {
    question: "is soulscrape a digital twin?",
    answer: "it can bootstrap a bounded reasoning proxy when the subject has authorized that use, but it does not claim to contain or reproduce a person. the output is a dated, purpose-shaped interpretation of selected evidence.",
  },
  {
    question: "can i use it to understand someone else?",
    answer: "yes, as a private collaboration guide when you legitimately possess the evidence. voice imitation, character or fitness evaluation, consequential decisions, and a reusable assistant charter need the subject's explicit authorization.",
  },
  {
    question: "does it search the web about people?",
    answer: "not by default. web research turns on when you ask for it or name a URL, follows your instructions on sources, time window, and depth, never bypasses access controls or collects contact details, and stops when your questions are answered.",
  },
  {
    question: "what does a published index contain?",
    answer: "a cited claims ledger, a timeline, themes, works, appearances, typed relations to other entities, and explicit open questions — the soulscrape.person-index.v1 packet, served as HTML, Markdown, and JSON.",
  },
  {
    question: "what happened to ensoul?",
    answer: "soulscrape is the same project under a new name since September 10, 2026. the packet schema, its ensoul.* identifiers, and the validator are unchanged so existing exporters keep working. versions through 0.3.5 remain published as @hraness/ensoul.",
  },
] as const;

const relatedProducts = [
  {
    name: "PeopleBlade",
    href: "https://peopleblade.com",
    role: "A private contact book for you and your agent",
    relationship: "PeopleBlade prepares the reviewed packet from your own book; Soulscrape is where a person's authorized evidence becomes a dated, cited working model.",
  },
  {
    name: "Textbutler",
    href: "https://textbutler.app",
    role: "A personal message butler for Mac",
    relationship: "Soulscrape models who someone is from cited evidence; Textbutler uses your own message history to draft what you'd actually say to them.",
  },
  {
    name: "Wordcell",
    href: "https://wordcell.io",
    role: "A Markdown knowledge base for agents",
    relationship: "Soulscrape produces the cited dossier; Wordcell is the vault where the notes and sources around it stay queryable.",
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

$ bun skills/soulscrape/scripts/publish-person.ts withdraw eugene-tssui   # removes it from public reads`;

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
    <div data-hraness-marketing-preset="editorial">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <SkipLink />
      <SiteHeader
        action={{ href: "#install", label: "install the skill" }}
      />

      <main id="main" tabIndex={-1}>
        <MarketingPage>
          <div className="hraness-material-wall">
            <MarketingField>
              <DeskField />
              <ProductHero
                align="start"
                actions={[
                  { href: "#install", label: "install the skill" },
                  { href: "/examples", label: "explore the examples" },
                  { href: "/docs/quickstart", label: "read the quickstart" },
                ]}
                boundary={footnote}
                className="soulscrape-marketing-hero"
                eyebrow="an agent skill for people research"
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
            </MarketingField>

            <MarketingSection
              heading="three moves."
              headingId="how-title"
              id="how"
              summary="research the person, write the dossier, publish it — or keep it to yourself."
            >
              <MarketingFlow ariaLabel="The soulscrape flow" steps={flowSteps} />
            </MarketingSection>
          </div>

          <MarketingSection
            heading="start with someone interesting."
            headingId="examples-title"
            id="examples"
            summary="A personal collection of builders, musicians, scientists, and others worth following — each a dated, cited dossier made from public sources."
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
            heading="how a person becomes a dossier."
            headingId="method-title"
            id="method"
            summary="read the evidence, keep the contradictions, mark every claim's limits."
          >
            <article
              className="readme-prose"
              dangerouslySetInnerHTML={{ __html: landingHtml }}
            />
          </MarketingSection>

          <MarketingSection
            heading="one dossier, many uses."
            headingId="use-cases-title"
            id="use-cases"
            summary="the same evidence-calibrated model answers different questions for different readers."
          >
            <ul className="card-grid" aria-label="Use cases">
              {useCases.map(useCase => (
                <li key={useCase.slug}>
                  <a className="story-card hraness-material-pane" href={`/use-cases#${useCase.slug}`}>
                    <strong className="story-card-title">{useCase.title}</strong>
                    <span className="story-card-summary">{useCase.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="featured-note">
              <a href="/use-cases">all use cases, with example asks</a>.
            </p>
          </MarketingSection>

          <MarketingSection
            heading="make a dossier. share what you learn."
            headingId="indexes-title"
            id="indexes"
            summary="research runs in your agent; publishing is a separate choice. review the complete packet, sign in to a free Hraness account, and the index goes live as HTML, Markdown, and JSON — free for anyone to read, cite, or build on."
          >
            <MarketingProofFrame
              caption="review the packet, authorize the device, publish. republishing the same packet is a no-op; a changed packet becomes a new revision, and withdrawal removes it from public reads."
              credit="the free account covers publishing — Hraness stores the reviewed public packet and its metadata, never your private source corpus"
              title="publish-person.ts"
            >
              <pre className="transcript" tabIndex={0}><SyntaxCode code={publishTranscript} language="shell" styles="classes" /></pre>
            </MarketingProofFrame>

            <p className="featured-note">
              <a href={freeAccountHref}>create a free account or sign in</a>, then follow the{" "}
              <a href="/docs/publish-person-index">publishing guide</a>. a live index:{" "}
              <a href="/ben/eugene-tssui">soulscrape.com/ben/eugene-tssui</a>.
            </p>
          </MarketingSection>

          <MarketingTrustBoundary
            heading="boundaries the skill keeps for you."
            headingId="boundaries-title"
            id="boundaries"
            items={trust}
            summary="these are product boundaries, not optional cautions. the skill keeps them adjacent to corpus intake, synthesis, output design, and final verification."
          />

          <MarketingInterfaceGrid
            heading="one skill, three interfaces."
            headingId="interfaces-title"
            id="interfaces"
            interfaces={interfaces}
            summary="the full skill runs in your agent environment without a Soulscrape account. your agent and tools perform research; the free hosted API reads and publishes reviewed public packets."
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
              <a href="/docs/quickstart">read the quickstart</a>.
            </p>
          </MarketingInstallPanel>

          <MarketingQuestionList
            heading="before you install."
            headingId="questions-title"
            id="questions"
            questions={questions.map(({ answer, question }) => ({
              answer: <p>{answer}</p>,
              question,
            }))}
          />

          <MarketingRelated
            heading="from the same workshop."
            headingId="related-title"
            items={relatedProducts}
            label="related"
            summary="each Hraness product owns one private domain and gives your agent the same kind of access: local, bounded, and inspectable."
          />

          <MarketingCallToAction
            actions={[
              { href: "#install", label: "install the skill" },
              { href: freeAccountHref, label: "create a free account" },
            ]}
            footnote={footnote}
            heading="research the person. publish the dossier."
            headingId="cta-title"
            summary="choose sources you're authorized to use, state the intended use, and ask for a dated working model. keep it private or release it as a public index."
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
    </div>
  );
}
