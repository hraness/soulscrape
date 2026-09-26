import type { Metadata } from "next";

import { DocsChrome } from "../../components/docs-chrome";
import { docsPages, quadrantDescriptions, quadrantLabels, type DocQuadrant } from "../../lib/docs";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { DOCS_DESCRIPTION } from "../../lib/page-copy";

export const metadata: Metadata = pageMetadata({ title: pageTitle("Docs"), description: DOCS_DESCRIPTION, path: "/docs" });

const quadrants: readonly DocQuadrant[] = ["tutorial", "how-to", "reference", "explanation"];

export default function DocsIndex() {
  return (
    <DocsChrome
      current="/docs"
      eyebrow="documentation"
      lede="Start with the quickstart to build your first dossier. The how-to guides cover source packets and publishing, the reference describes the packet and its public endpoints, and the explanation covers why the skill works the way it does."
      path="/docs"
      title="the documentation."
    >
      {quadrants.map(quadrant => {
        const pages = docsPages.filter(page => page.quadrant === quadrant);
        if (pages.length === 0) return null;
        return (
          <section key={quadrant}>
            <h2 id={quadrant}>{`${quadrantLabels[quadrant].toLowerCase()}s`}</h2>
            <p className="doc-quadrant-note">{quadrantDescriptions[quadrant]}</p>
            <div className="doc-card-grid">
              {pages.map(page => (
                <a className="doc-card" href={`/docs/${page.slug}`} key={page.slug}>
                  <span>{quadrantLabels[page.quadrant]}</span>
                  <h2>{page.title}</h2>
                  <p>{page.description}</p>
                </a>
              ))}
            </div>
          </section>
        );
      })}
      <section>
        <h2 id="source-documents">the source documents</h2>
        <p className="doc-quadrant-note">
          {"The skill’s reference files are the source for its asking and web-research rules. Your agent reads them; these pages explain the same rules for people."}
        </p>
        <div className="doc-card-grid">
          {[
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/SKILL.md", label: "SKILL.md", kicker: "Skill", summary: "The full instructions the skill gives your agent." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/questions.md", label: "questions.md", kicker: "Reference", summary: "The asking protocol: what the skill asks, when it asks, and when it stops." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/web-research.md", label: "web-research.md", kicker: "Reference", summary: "How the skill researches the public web: what it may read, how much it quotes, and how it ties a source to the person." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/source-packets.md", label: "source-packets.md", kicker: "Reference", summary: "The source-packet format and what the validator checks." },
          ].map(card => (
            <a className="doc-card" href={card.href} key={card.href}>
              <span>{card.kicker}</span>
              <h2>{card.label}</h2>
              <p>{card.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </DocsChrome>
  );
}
