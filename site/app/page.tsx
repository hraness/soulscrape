import { marketing, marketingHeading } from "../portfolio-copy";
import {
  MarketingAccount,
  MarketingAccountActions,
  MarketingCallToAction,
  MarketingField,
  MarketingFlow,
  MarketingInstallPanel,
  MarketingPage,
  MarketingQuestionList,
  MarketingRelated,
  MarketingSection,
  MarketingTrustBoundary,
  ProductHero,
  ProviderMarkChip,
} from "@hraness/design-kit/react/server";
import { AgentSetupPrompt } from "@hraness/design-kit/react";
import { agentSetupTargets } from "@hraness/design-kit";
import { portfolioRelatedGroups } from "@hraness/design-kit/portfolio";
import { AskAiAboutThis } from "@hraness/ui";

import { ExampleIndexCard } from "../components/example-index-card";
import { SkillInstall } from "../components/skill-install";
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
    detail: "Choose the person, the question, and who the result is for. The dossier stays focused on that purpose.",
  },
  {
    label: marketingHeading("home-trust-instructions"),
    detail: "Web research is optional and follows the sources and dates you choose. Findings link back to the evidence.",
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
                className="soulscrape-marketing-hero"
                frame={(
                  <div className="hero-examples" aria-label="Featured examples">
                    <ul className="hero-examples-cards">
                      {showcaseIndexes.slice(0, 4).map((index, position) => (
                        <li key={index.handle}>
                          <ExampleIndexCard index={index} number={position + 1} featured />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                heading={heading}
                headingId="hero-title"
                name=""
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
            className="soulscrape-install"
            eyebrow={`latest release · ${publishedRelease.package}@${releaseVersion}`}
            heading={marketingHeading("install-title")}
            headingId="install-title"
            id="install"
          >
            <AgentSetupPrompt targetsPlacement="below" label="Set up Soulscrape" prompt={firstDossierPrompt} targets={agentSetupTargets(firstDossierPrompt)} />
            <section aria-labelledby="manual-install-title" className="soulscrape-install__manual">
              <h3 id="manual-install-title">Or install manually, then ask your agent to use Soulscrape</h3>
              <SkillInstall />
              <p className="install-note">
                <a href="/docs/quickstart">Read the quickstart</a> or <a href={publishedRelease.releaseUrl}>release notes</a>.
              </p>
            </section>
          </MarketingInstallPanel>

          <MarketingAccount
            heading={marketingHeading("indexes-title")}
            id="indexes"
            summary="Share your dossier as a public page with a free Hraness account."
          >
            <MarketingAccountActions
              primary={{ href: freeAccountHref, label: "Create account" }}
              signIn={{ href: freeAccountHref }}
            />
            <p className="soulscrape-publish-guide">
              <a href="/docs/publish-person-index">Read the publishing guide</a>
            </p>
          </MarketingAccount>

          <MarketingTrustBoundary
            columns={2}
            heading={marketingHeading("boundaries-title")}
            headingId="boundaries-title"
            id="boundaries"
            items={trust}
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
            columns={2}
            groups={portfolioRelatedGroups(["peopleblade", "message-like-me", "kb", "sponge", "wrench", "gobstopper", "xcb", "aicharts"])}
            heading="Other tools from our studio"
            headingId="related-title"
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
