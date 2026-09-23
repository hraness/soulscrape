import type { Metadata } from "next";

import { DocsChrome } from "../../components/docs-chrome";
import { docsPages, quadrantDescriptions, quadrantLabels, type DocQuadrant } from "../../lib/docs";
import { siteUrl } from "../../lib/site";

const description =
  "Soulscrape documentation in Diataxis order: a tutorial to build your first dossier, how-to guides for packets and publishing, the person-index reference, and the evidence model explained.";

export const metadata: Metadata = {
  title: "docs — soulscrape",
  description,
  alternates: { canonical: siteUrl("/docs") },
  openGraph: { title: "soulscrape docs", description, url: siteUrl("/docs") },
};

const quadrants: readonly DocQuadrant[] = ["tutorial", "how-to", "reference", "explanation"];

export default function DocsIndex() {
  return (
    <DocsChrome
      current="/docs"
      eyebrow="documentation"
      lede="Four kinds of page, each doing one job: learn the flow once, solve a concrete task, look up the contract, or understand why the boundaries sit where they do."
      path="/docs"
      title="the documentation."
    >
      <p className="doc-intro-note">
        {"These guides follow the "}
        <a href="https://diataxis.fr/">Diátaxis</a>
        {" split: tutorials teach, how-to guides do, reference states, explanation reasons. Pick the shape that matches what you need."}
      </p>
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
          {"The skill’s own references are the authority on the asking protocol and web research. The repository renders them for agents; these pages are the human versions."}
        </p>
        <div className="doc-card-grid">
          {[
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/SKILL.md", label: "SKILL.md", kicker: "Contract", summary: "The installable skill's complete operating contract." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/questions.md", label: "questions.md", kicker: "Reference", summary: "The asking protocol: what the skill asks, when it asks, and when it stops." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/web-research.md", label: "web-research.md", kicker: "Reference", summary: "Instruction-bound public research: quoting limits, identity binding, the citation ledger." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/source-packets.md", label: "source-packets.md", kicker: "Reference", summary: "The bounded source-packet contract the validator enforces." },
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
