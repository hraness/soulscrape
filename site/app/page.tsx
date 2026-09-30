import { marketing, marketingHeading, product } from "../portfolio-copy";
import {
  MarketingCallToAction,
  MarketingField,
  MarketingFlow,
  MarketingInstallPanel,
  MarketingPage,
  MarketingQuestionList,
  MarketingRelated,
  MarketingSection,
  MarketingTrustBoundary,
  PlatformBadges,
  ProductHero,
  ProviderMarkChip,
} from "@hraness/design-kit/react/server";
import { AgentSetupPrompt } from "@hraness/design-kit/react";
import { agentSetupTargets } from "@hraness/design-kit";
import type { PortfolioProductId } from "@hraness/design-kit/portfolio";
import { AskAiAboutThis } from "@hraness/ui";

import { ExampleIndexCard } from "../components/example-index-card";
import { CodeBlock } from "../components/code-block";
import { SkillInstall, skillRunsOn } from "../components/skill-install";
import { SiteHeader, SkipLink } from "../components/site-header";
import { featuredIndexes, showcaseIndexes } from "../lib/examples";
import { HOME_DESCRIPTION } from "../lib/metadata";
import { dossierOutlineHtml } from "./landing.generated";
import { Walkthrough } from "./mockups/walkthrough";
import "./mockups/styles";
import publishedRelease from "../published-release.json";

const repository = "https://github.com/hraness/soulscrape";
const releaseVersion = publishedRelease.version;
const hranessOrganization = "https://hraness.com/#organization";

const firstDossierPrompt = `Install the Soulscrape ${releaseVersion} agent skill:
${publishedRelease.skillInstall}

Use $${publishedRelease.skill} to build a dated working model of <person>
from <authorized sources>. It's for <intended use>, read by <audience>.
Use sources up to <cutoff>. Proxy authorization: <none, or who
approved what>.

Ask me to fill in these fields before starting research. Keep the
sources and dossier in this agent's writable workspace.`;

const heading = marketing.hero.heading;
const lead =
  marketing.hero.summary;
const freeAccountHref = "/api/suite-auth/start?return_to=%2F";
const boundary =
  "free and MIT licensed, publishing included · no subscription or card · for Claude Code, Codex, and other agents that load skills";

const flowSteps = [
  {
    label: marketingHeading("home-flow-sources"),
    detail:
      "Give your agent writing, talks, interviews, or posts you are allowed to use. Set the purpose, audience, and date range. Private sources stay in your agent's environment.",
  },
  {
    label: marketingHeading("home-flow-read"),
    detail:
      "The skill connects the person's documented beliefs and decisions to their sources. It keeps contradictions, uncertainty, and open questions visible.",
  },
  {
    label: marketingHeading("home-flow-publish"),
    detail:
      "Use it in your own work, or review a public version and publish it. Readers can follow the sources, cite it, or give it to their agent.",
  },
] as const;

const useCases = [
  {
    slug: "agent-grounding",
    title: marketingHeading("home-use-agent"),
    summary: "Use a person's documented beliefs and writing as a reference for your agent.",
  },
  {
    slug: "research",
    title: marketingHeading("home-use-research"),
    summary: "Prepare a cited brief on a founder, guest, or collaborator before a conversation.",
  },
  {
    slug: "writing",
    title: marketingHeading("home-use-writing"),
    summary: "Find the sources behind a profile, interview, or essay.",
  },
  {
    slug: "personas",
    title: marketingHeading("home-use-personas"),
    summary: "Start from documented patterns when the subject has explicitly approved that use.",
  },
  {
    slug: "collaboration",
    title: marketingHeading("home-use-collaboration"),
    summary: "Keep a private guide to how they decide, disagree, and communicate.",
  },
  {
    slug: "self-model",
    title: marketingHeading("home-use-self"),
    summary: "Build a personal reference from your logs, notes, and decisions.",
  },
] as const;

const trust = [
  {
    label: marketingHeading("home-trust-sources"),
    detail: "Use sources you have permission to use for this purpose. Having someone's messages or public information does not authorize imitating them or acting in their name.",
  },
  {
    label: marketingHeading("home-trust-purpose"),
    detail: "The skill establishes the subject, intended use, audience, available evidence, and missing authorization. It asks about gaps that would change the result.",
  },
  {
    label: marketingHeading("home-trust-instructions"),
    detail: "Public web research is off by default. When enabled, it follows your source and date limits. Each finding records a URL, access date, supporting passage, and evidence tying it to the person.",
  },
  {
    label: marketingHeading("home-trust-claims"),
    detail: "Facts, stated beliefs, patterns, and speculation stay separate. Contradictions remain visible, and confidence reflects the evidence examined.",
  },
] as const;

const questions = [
  {
    question: "Do I need an account or a paid plan?",
    answer: "No. The full skill runs in your agent without a Soulscrape account, and public pages and read APIs are free without sign-in. A free Hraness account is needed only to publish, update, or withdraw your own indexes. Charges from your agent, model, or research tools are separate.",
  },
  {
    question: "Where does the research happen?",
    answer: "In your agent environment, with your model, tools, and the sources you allow. Private sources and working documents stay there, under its data practices. Hraness receives only the reviewed public packet you publish, plus the account and device details needed to publish it.",
  },
  {
    question: "Is Soulscrape a digital twin?",
    answer: "A dossier can be a starting point for an assistant when the person has authorized that use. It remains a dated interpretation of selected evidence, not a complete picture of the person.",
  },
  {
    question: "Can I use it to understand someone else?",
    answer: "Yes, as a private collaboration guide built from evidence you are allowed to use. Imitating their voice or building a reusable assistant that works like them needs their explicit authorization. The skill does not evaluate their character or fitness or support consequential decisions about them, even with authorization.",
  },
  {
    question: "Does it search the web about people?",
    answer: "Not by default. Web research turns on when you ask for it, name a URL, or need a time-sensitive public fact checked. It follows your source, date, and depth limits, never bypasses access controls or collects contact details, and stops when your questions are answered.",
  },
  {
    question: "What does a published index contain?",
    answer: "An essay, cited claims, a timeline, themes, works, appearances, relations to people and organizations, and open questions. The web page and JSON packet carry the full index; the Markdown copy carries the essay.",
  },
] as const;

/** A related card from the portfolio facts: its address, mark, and one-line role. */
const related = (id: PortfolioProductId) => {
  const { canonicalUrl, mark, name, oneLiner } = product(id);
  return { href: canonicalUrl, mark, name, role: oneLiner };
};

const relatedGroups = [
  {
    heading: marketingHeading("home-related-apps"),
    headingId: "soulscrape-related-apps",
    items: [
      related("peopleblade"),
      related("message-like-me"),
      related("kb"),
      related("sponge"),
    ],
  },
  {
    heading: marketingHeading("home-related-tools"),
    headingId: "soulscrape-related-tools",
    summary: "The layer your agent runs through: sessions, accounts, web reads, and the models behind them.",
    items: [
      related("wrench"),
      related("gobstopper"),
      related("xcb"),
      related("aicharts"),
    ],
  },
] as const;

const publishCommands = `bun skills/soulscrape/scripts/publish-person.ts login

bun skills/soulscrape/scripts/publish-person.ts publish \\
    "$PWD/examples/people/eugene-tssui/person-index.json"`;

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      codeRepository: repository,
      description: HOME_DESCRIPTION,
      license: "https://opensource.org/license/mit",
      name: marketing.names.name,
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
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://soulscrape.com/#website",
      name: marketing.names.name,
      publisher: { "@id": hranessOrganization },
      url: "https://soulscrape.com/",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      applicationCategory: "DeveloperApplication",
      description: HOME_DESCRIPTION,
      downloadUrl: publishedRelease.releaseUrl,
      name: marketing.names.name,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": hranessOrganization },
      sameAs: [repository, "https://www.npmjs.com/package/@hraness/soulscrape"],
      softwareVersion: releaseVersion,
      url: "https://soulscrape.com/",
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
        action={{ href: "#install", label: marketing.hero.primaryAction }}
      />

      <main id="main" tabIndex={-1}>
        <MarketingPage>
          <div className="hraness-material-wall">
            <MarketingField>
              <ProductHero
                backdrop={false}
                align="start"
                actions={[
                  { href: "#install", label: marketing.hero.primaryAction },
                  { href: "/examples", label: marketing.hero.secondaryAction },
                ]}
                boundary={boundary}
                className="soulscrape-marketing-hero"
                eyebrow={marketing.category}
                frame={(
                  <div className="hero-examples" aria-label="Featured examples">
                    <p className="hero-examples-caption">four of the {featuredIndexes.length} example dossiers</p>
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
                name={marketing.names.name}
                summary={lead}
              />
            </MarketingField>

            <MarketingSection
              heading={marketingHeading("how-title")}
              headingId="how-title"
              id="how"
              summary="Research one person, with a record of what supports each claim."
            >
              <MarketingFlow ariaLabel="The Soulscrape flow" steps={flowSteps} />
              <div className="home-walkthrough">
                <Walkthrough />
              </div>
              <p className="featured-note">
                <a href="/blog/introducing-soulscrape">Read the launch post</a> ·{" "}
                <a href="/compare">Compare Soulscrape with research tools and personal assistants</a>.
              </p>
            </MarketingSection>
          </div>

          <div aria-label="Compatible agents" className="agent-marks">
            <ProviderMarkChip mark="claudecode" size={28} />
            <ProviderMarkChip mark="codex" size={28} />
          </div>

          <MarketingSection
            heading={marketingHeading("examples-title")}
            headingId="examples-title"
            id="examples"
            summary="Builders, musicians, scientists, and writers, researched from public sources. Open a dossier to follow its claims back to the evidence."
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
            heading={marketingHeading("method-title")}
            headingId="method-title"
            id="method"
            summary="A dossier connects documented beliefs and decisions, practical guidance, tensions, and open questions. Its structure follows the available evidence."
          >
            <details className="home-details">
              <summary>See a sample dossier outline</summary>
              <article className="readme-prose" dangerouslySetInnerHTML={{ __html: dossierOutlineHtml }} />
            </details>
          </MarketingSection>

          <MarketingSection
            heading={marketingHeading("use-cases-title")}
            headingId="use-cases-title"
            id="use-cases"
          >
            <ul className="use-case-rows" aria-label="Use cases">
              {useCases.map(useCase => (
                <li key={useCase.slug}>
                  <a className="use-case-row" href={`/use-cases#${useCase.slug}`}>
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

          <MarketingInstallPanel
            eyebrow={`latest release · ${publishedRelease.package}@${releaseVersion}`}
            heading={marketingHeading("install-title")}
            headingId="install-title"
            id="install"
          >
            <PlatformBadges platforms={skillRunsOn} />
            <p>Use Bun 1.3.14 or newer and an agent that loads skills, such as Claude Code or Codex.</p>
            <SkillInstall />
            <p>Start a new agent session and give it a few sources you are allowed to use:</p>
            <AgentSetupPrompt label="Write your first dossier" prompt={firstDossierPrompt} targets={agentSetupTargets(firstDossierPrompt)} />
            <p className="install-note">
              Installing copies the skill files; it reads no personal data and starts no research. Review the claims against their sources before using the dossier. <a href="/docs/quickstart">Read the quickstart</a> or <a href={publishedRelease.releaseUrl}>release notes</a>.
            </p>
            <details className="home-details" id="interfaces">
              <summary>Package and source-packet options</summary>
              <p>The release archive includes the skill, references, and packet utilities:</p>
              <CodeBlock code={`bun add --exact ${publishedRelease.archiveUrl}`} />
              <p>PeopleBlade and the legacy Message Like Me CLI in Textbutler export contact research and message history as evidence files. From the installed skill&apos;s folder, validate a packet before reading it:</p>
              <CodeBlock code={'bun scripts/validate-source-packet.ts \\\n  /absolute/private/path/subject.ensoul-source.json'} />
              <p>A checksum checks the file, not the truth of its contents or permission to use it. <a href={`${repository}/blob/main/skills/soulscrape/references/source-packets.md`}>Read the packet format</a>.</p>
            </details>
          </MarketingInstallPanel>

          <MarketingSection
            heading={marketingHeading("indexes-title")}
            headingId="indexes-title"
            id="indexes"
            summary="Review the complete public packet, then publish it with a free Hraness account. Readers get the full index as a web page and JSON packet, plus a Markdown copy of its essay."
          >
            <p className="featured-note">
              <a href={freeAccountHref}>Create a free account or sign in</a>, then follow the{" "}
              <a href="/docs/publish-person-index">publishing guide</a>. See a live index:{" "}
              <a href="/ben/eugene-tssui">soulscrape.com/ben/eugene-tssui</a>.
            </p>
            <p className="featured-note">Hraness stores the reviewed public packet and its metadata. Your private sources stay in your agent environment.</p>
            <details className="home-details">
              <summary>See publishing commands</summary>
              <p>From a repository checkout, sign in and publish the included example under your own username:</p>
              <CodeBlock code={publishCommands} />
              <p>Publishing an identical packet changes nothing; a changed packet becomes a new revision. To take your index off public reads:</p>
              <CodeBlock code="bun skills/soulscrape/scripts/publish-person.ts withdraw eugene-tssui" />
            </details>
          </MarketingSection>

          <MarketingTrustBoundary
            heading={marketingHeading("boundaries-title")}
            headingId="boundaries-title"
            id="boundaries"
            items={trust}
            summary="The skill checks sources, interpretations, and the finished dossier against these rules. There is no setting to turn these rules off."
          />

          <MarketingQuestionList
            heading={marketingHeading("questions-title")}
            headingId="questions-title"
            id="questions"
            questions={questions.map(({ answer, question }) => ({
              answer: <p>{answer}</p>,
              question,
            }))}
          />

          <MarketingRelated
            groups={relatedGroups}
            heading={marketingHeading("related-title")}
            headingId="related-title"
            label="related"
          />

          <MarketingCallToAction
            actions={[
              { href: "#install", label: marketing.hero.primaryAction },
              { href: "/docs/quickstart", label: "Read the quickstart" },
            ]}
            heading={marketingHeading("cta-title")}
            headingId="cta-title"
            summary="Choose a few sources you can check, then ask your agent to connect the evidence."
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
