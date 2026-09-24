import type { Metadata } from "next";

import { StoryPage } from "../../components/story-page";
import { comparisons } from "../../lib/compare";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { COMPARE_DESCRIPTION } from "../../lib/page-copy";

export const metadata: Metadata = pageMetadata({ title: pageTitle("Compare"), description: COMPARE_DESCRIPTION, path: "/compare" });

export default function CompareIndex() {
  return (
    <StoryPage
      kicker="compare"
      lede="soulscrape is an agent skill that writes cited dossiers on people and publishes them as public indexes. here's how it compares with the tools people often use instead."
      path="/compare"
      title="how soulscrape compares"
    >
      <ul className="card-grid">
        {comparisons.map(entry => (
          <li key={entry.slug}>
            <a className="story-card hraness-material-pane" href={`/compare/${entry.slug}`}>
              <span className="story-card-tag">{entry.category}</span>
              <strong className="story-card-title">{entry.title}</strong>
              <span className="story-card-summary">{entry.description}</span>
            </a>
          </li>
        ))}
      </ul>
      <section className="story-section">
        <h2>the short version.</h2>
        <p>
          {"If your question is “who should we email,” use an enrichment tool. If it’s “chat with a character,” use a persona bot. If it’s “summarize a topic,” use deep research. If it’s “how does this person think, and where’s the evidence,” use a dossier."}
        </p>
      </section>
    </StoryPage>
  );
}
