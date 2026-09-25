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

import { ExampleIndexCard } from "../components/example-index-card";
import { DossierField } from "../components/dossier-field";
import { SiteHeader, SkipLink } from "../components/site-header";
import { deskFieldItems, deskFieldTape, dossierFieldCards, dossierFieldEdges } from "../lib/dossier-field";
import { featuredIndexes, showcaseIndexes } from "../lib/examples";
import { HOME_DESCRIPTION } from "../lib/metadata";
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

const heading = "See how someone thinks, and where every claim comes from.";
const lead =
  "Give your agent the sources you're allowed to use, and it writes a dated dossier with every claim tied to its evidence.";
const freeAccountHref = "/api/suite-auth/start?return_to=%2F";
const boundary =
  "free and MIT licensed, publishing included · no subscription or card · for Claude Code, Codex, and other agents that load skills";

const flowSteps = [
  {
    label: "research",
    detail:
      "your agent reads the sources you allow, such as writing, talks, interviews, and posts, within limits you set: which sources, what time window, and how deep. private sources stay in your agent's environment.",
  },
  {
    label: "dossier",
    detail:
      "the skill writes a dated working model of the person's beliefs, decisions, voice, contradictions, and open questions. claims are tied to their sources, and confidence is only as strong as the evidence.",
  },
  {
    label: "publish + remix",
    detail:
      "if you choose, publish it as a public index at soulscrape.com/<you>/<name>. each index is a web page, a JSON packet with every claim and source, and a Markdown copy of its essay that anyone can cite, fork, or give to an agent.",
  },
] as const;

const useCases = [
  {
    slug: "agent-grounding",
    title: "ground an agent",
    summary: "give your agent a dossier so its answers follow a person's documented beliefs and latest writing.",
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
    detail: "Soulscrape works from the sources you place in scope. having someone's messages, a packet, or public information about them does not mean they authorized this use, and the skill says so before it starts.",
  },
  {
    label: "asking before guessing",
    detail: "before it starts, the skill writes down the subject, the intended use, the evidence it has and lacks, and what you need to authorize. it asks once, and only about what would change the result.",
  },
  {
    label: "research under your instructions",
    detail: "public web research is off by default. when it runs, it follows your instructions, and each finding records its URL, access date, the supporting passage, and how it was tied to the person.",
  },
  {
    label: "confidence matches the evidence",
    detail: "facts, stated beliefs, revealed patterns, and speculation stay separate, and contradictions are kept. confidence describes how well the examined evidence supports a claim.",
  },
] as const;

const interfaces = [
  {
    label: "agent skill",
    summary: "install the skill with the skills.sh installer, then ask for a dated working model from the sources you allow.",
    example: (
      <>
        <TopicIcon slug="agent-skill" />
        <pre tabIndex={0}><SyntaxCode code={publishedRelease.skillInstall} styles="classes" /></pre>
        <p className="interface-link"><a href={`${repository}/blob/main/skills/soulscrape/SKILL.md`}>read the skill</a></p>
      </>
    ),
  },
  {
    label: "release archive",
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
    summary: "PeopleBlade and the legacy Message Like Me CLI export contact research and message history as evidence files. each file records who wrote what, stays within size limits, and carries a checksum; the skill validates it offline before reading.",
    example: (
      <>
        <TopicIcon slug="source-packets" />
        <pre tabIndex={0}><SyntaxCode code={`bun scripts/validate-source-packet.ts \\
  /absolute/private/path/subject.ensoul-source.json`} language="shell" styles="classes" /></pre>
        <p className="interface-link"><a href={`${repository}/blob/main/skills/soulscrape/references/source-packets.md`}>read the packet format</a></p>
      </>
    ),
  },
] as const;

const questions = [
  {
    question: "do I need an account or a paid plan?",
    answer: "no. the full skill runs in your agent without a Soulscrape account, and public pages and read APIs are free without sign-in. a free Hraness account is needed only to publish, update, or withdraw your own indexes. charges from your agent, model, or research tools are separate.",
  },
  {
    question: "where does the research happen?",
    answer: "in your agent environment, with your model, tools, and the sources you allow. private sources and working documents stay there, under its data practices. Hraness receives only what you publish: the reviewed public packet, plus the account and device details needed to publish it.",
  },
  {
    question: "is Soulscrape a digital twin?",
    answer: "only in a narrow sense. if the person has authorized it, a dossier can seed an assistant whose reasoning resembles their documented patterns. it does not claim to contain or reproduce them: it is a dated reading of selected evidence, shaped by what it's for.",
  },
  {
    question: "can I use it to understand someone else?",
    answer: "yes, as a private collaboration guide built from evidence you legitimately have. imitating their voice or building a reusable assistant that works like them needs their explicit authorization. the skill does not evaluate their character or fitness or support consequential decisions about them, even with authorization.",
  },
  {
    question: "does it search the web about people?",
    answer: "not by default. web research turns on when you ask for it, when you name a URL, or when a time-sensitive public fact needs checking. it follows your instructions on sources, time window, and depth, never bypasses access controls or collects contact details, and stops when your questions are answered.",
  },
  {
    question: "what does a published index contain?",
    answer: "an essay, a list of claims with their sources, a timeline, themes, works, appearances, relations to other people and organizations, and open questions, all in one soulscrape.person-index.v1 packet. the web page and the JSON packet carry all of it; the Markdown copy carries the essay.",
  },
] as const;

const relatedGroups = [
  {
    heading: "The personal apps",
    headingId: "soulscrape-related-apps",
    items: [
      {
        name: "PeopleBlade",
        href: "https://peopleblade.com",
        role: "Local personal CRM",
        relationship: "Local personal CRM for everyone you know, built for your agent",
      },
      {
        name: "Textbutler",
        href: "https://textbutler.app",
        role: "Messaging assistant for Mac",
        relationship: "AI butler for the iMessage, WhatsApp, and Beeper chats you choose",
      },
      {
        name: "Wordcell",
        href: "https://wordcell.io",
        role: "Markdown knowledge base",
        relationship: "Markdown knowledge base that gives agents the decisions behind code",
      },
      {
        name: "Sponge",
        href: "https://sponge.sh",
        role: "Private research library",
        relationship: "Private library for what you read, with notes your agent can cite",
      },
    ],
  },
  {
    heading: "The agent platform",
    headingId: "soulscrape-related-tools",
    summary: "The layer your agent runs through: sessions, accounts, web reads, and the models behind them.",
    items: [
      {
        name: "Ghostget",
        href: "https://ghostget.com",
        role: "Web actions for agents",
        relationship: "Named web actions for AI agents: read pages, save media, use connected accounts",
      },
      {
        name: "Gobstopper",
        href: "https://gobstopper.sh",
        role: "Session compaction tool",
        relationship: "Compacts long agent sessions into smaller copies, keeping every byte",
      },
      {
        name: "xcb",
        href: "https://xcb.sh",
        role: "Agent subscription router",
        relationship: "Routes coding tasks across the Claude, Codex, and Devin plans you have",
      },
      {
        name: "AI Charts",
        href: "https://aicharts.io",
        role: "AI model comparison charts",
        relationship: "Model benchmark scores plotted against cost and tokens per task",
      },
    ],
  },
] as const;

const publishTranscript = `$ bun skills/soulscrape/scripts/publish-person.ts login
Sign in to approve this device:

  https://soulscrape.com/connect?code=SS-K7P4-QM92

Code: SS-K7P4-QM92

Waiting for approval…
Signed in as <you>. Credential saved to <home>/.config/soulscrape/credentials.json.

$ bun skills/soulscrape/scripts/publish-person.ts publish \\
    "$PWD/examples/people/eugene-tssui/person-index.json"
{"url":"https://soulscrape.com/<you>/eugene-tssui","handle":"eugene-tssui","revision":1,"packetDigest":"<sha256>","published":true}

$ bun skills/soulscrape/scripts/publish-person.ts withdraw eugene-tssui
{"handle":"eugene-tssui","withdrawn":true}`;

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      codeRepository: repository,
      description: HOME_DESCRIPTION,
      license: "https://opensource.org/license/mit",
      name: "Soulscrape",
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
        action={{ href: "#install", label: "Install the skill" }}
      />

      <main id="main" tabIndex={-1}>
        <MarketingPage>
          <div className="hraness-material-wall">
            <MarketingField>
              <DossierField cards={dossierFieldCards()} deskItems={deskFieldItems()} edges={dossierFieldEdges()} tape={deskFieldTape()} />
              <ProductHero
                backdrop={false}
                align="start"
                actions={[
                  { href: "#install", label: "Install the skill" },
                  { href: "/examples", label: "Browse the dossiers" },
                  { href: "/docs/quickstart", label: "read the quickstart" },
                ]}
                boundary={boundary}
                className="soulscrape-marketing-hero"
                eyebrow="People research for agents"
                frame={(
                  <div className="hero-examples" aria-label="Featured examples">
                    <p className="hero-examples-caption"><span aria-hidden="true">✳</span> four of the {featuredIndexes.length} example dossiers</p>
                    <ul className="hero-examples-cards">
                      {showcaseIndexes.slice(0, 4).map((index, position) => (
                        <li key={index.handle}>
                          <ExampleIndexCard index={index} number={position + 1} featured />
                        </li>
                      ))}
                    </ul>
                    <p className="hero-examples-note">real people, researched from public sources. open any dossier to see where each claim comes from.</p>
                  </div>
                )}
                heading={heading}
                headingId="hero-title"
                name="Soulscrape"
                summary={lead}
              />
            </MarketingField>

            <MarketingSection
              heading="how it works"
              headingId="how-title"
              id="how"
              summary="your agent reads the sources, the skill writes the dossier, and you decide whether to publish it."
            >
              <MarketingFlow ariaLabel="The Soulscrape flow" steps={flowSteps} />
            </MarketingSection>
          </div>

          <MarketingSection
            heading="start with someone interesting."
            headingId="examples-title"
            id="examples"
            summary="a collection of builders, musicians, scientists, writers, and others, published by @ben. each is a dated dossier built from public sources."
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
            summary="what a dossier looks like, and the steps the skill follows to write one."
          >
            <article
              className="readme-prose"
              dangerouslySetInnerHTML={{ __html: landingHtml }}
            />
          </MarketingSection>

          <MarketingSection
            heading="what a dossier is for"
            headingId="use-cases-title"
            id="use-cases"
            summary="one dossier can serve an agent, a writer, a collaborator, or you."
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
            heading="publish a dossier"
            headingId="indexes-title"
            id="indexes"
            summary="research runs in your agent, and publishing is a separate choice. review the complete packet, sign in with a free Hraness account, and publish. the index goes live as a web page and a JSON packet, with a Markdown copy of its essay, free for anyone to read, cite, or build on."
          >
            <MarketingProofFrame
              caption="an example session from a repository checkout; <you> is your Hraness username. republishing an identical packet changes nothing, a changed packet becomes a new revision, and withdraw takes the index off public reads."
              credit="publishing is free. Hraness stores the reviewed public packet and its metadata, not your private sources"
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
            summary="the skill applies these rules when it takes in sources, while it writes, and when it checks the finished dossier. they are part of the skill, with no setting to turn them off."
          />

          <MarketingInterfaceGrid
            heading="the skill, the package, and source packets"
            headingId="interfaces-title"
            id="interfaces"
            interfaces={interfaces}
            summary="the skill runs in your agent without a Soulscrape account. your agent does the research; the free hosted API serves and publishes reviewed public packets."
          />

          <MarketingInstallPanel
            eyebrow={`latest release · ${publishedRelease.package}@${releaseVersion}`}
            heading="install the skill and start small."
            headingId="install-title"
            id="install"
          >
            <pre className="install-command" tabIndex={0}><SyntaxCode code={publishedRelease.skillInstall} styles="classes" /></pre>
            <pre className="install-command" tabIndex={0}><SyntaxCode code={`Use $${publishedRelease.skill} to build a dated working model of <person> from <authorized sources>. It's for <intended use>, read by <audience>. Use sources up to <cutoff>. Proxy authorization: <none, or who approved what>.`} language="text" styles="classes" /></pre>
            <p className="install-note">
              <a href={publishedRelease.releaseUrl}>release notes and assets</a>.{" "}
              read the skill before you install it, then start a new agent session so it loads. begin with a few sources you can check yourself, and add more when they cover a missing period, context, or kind of source, or when they contradict what you have.{" "}
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
            groups={relatedGroups}
            heading="other Hraness tools"
            headingId="related-title"
            label="related"
            summary="more tools from Hraness."
          />

          <MarketingCallToAction
            actions={[
              { href: "#install", label: "Install the skill" },
              { href: freeAccountHref, label: "create a free account" },
            ]}
            heading="start with one person."
            headingId="cta-title"
            summary="choose sources you're allowed to use, say what the dossier is for, and ask your agent for a dated working model. keep it private, or publish it as a public index."
          />
        </MarketingPage>
      </main>

      <AskAiAboutThis className="ask-ai" url="https://soulscrape.com" />

      <div className="site-footer">
        <p>Soulscrape is open source under the MIT license.</p>
        <nav aria-label="Project links">
          <a href={`${repository}/blob/main/skills/soulscrape/SKILL.md`}>agent skill</a>
          <a href={repository}>hraness/soulscrape</a>
          <a href="https://hraness.com/projects">hraness projects</a>
        </nav>
      </div>
    </div>
  );
}
