import type { Metadata } from "next";

import { StoryPage } from "../../components/story-page";
import { docsPages, quadrantDescriptions, type DocQuadrant } from "../../lib/docs";
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
const quadrantHeadings: Record<DocQuadrant, string> = {
  tutorial: "tutorials.",
  "how-to": "how-to guides.",
  reference: "reference.",
  explanation: "explanation.",
};

export default function DocsIndex() {
  return (
    <StoryPage
      kicker="documentation"
      lede="Four kinds of page, each doing one job: learn it once, do a task, look something up, or understand why."
      path="/docs"
      title="the documentation."
    >
      {quadrants.map(quadrant => {
        const pages = docsPages.filter(page => page.quadrant === quadrant);
        if (pages.length === 0) return null;
        return (
          <section className="story-section" key={quadrant}>
            <h2>{quadrantHeadings[quadrant]}</h2>
            <p className="story-summary">{quadrantDescriptions[quadrant]}</p>
            <ul className="card-grid">
              {pages.map(page => (
                <li key={page.slug}>
                  <a className="story-card hraness-material-pane" href={`/docs/${page.slug}`}>
                    <strong className="story-card-title">{page.title}</strong>
                    <span className="story-card-summary">{page.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <section className="story-section">
        <h2>the source documents.</h2>
        <p className="story-summary">
          {"The skill’s own references are the authority on the asking protocol and web research. The repository renders them for agents; these pages are the human versions."}
        </p>
        <ul className="card-grid">
          {[
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/SKILL.md", label: "SKILL.md", summary: "The installable skill's complete operating contract." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/questions.md", label: "questions.md", summary: "The asking protocol and its stop conditions." },
            { href: "https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/web-research.md", label: "web-research.md", summary: "Instruction-bound public research: quoting limits, identity binding, the citation ledger." },
            { href: "https://github.com/hraness/soulscrape/blob/main/README.md", label: "README", summary: "The public project contract — the same text the homepage embeds." },
          ].map(link => (
            <li key={link.href}>
              <a className="story-card hraness-material-pane" href={link.href}>
                <strong className="story-card-title">{link.label}</strong>
                <span className="story-card-summary">{link.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </StoryPage>
  );
}
