import type { Metadata } from "next";

import { StoryPage } from "../../components/story-page";
import { comparisons } from "../../lib/compare";
import { siteUrl } from "../../lib/site";

const description =
  "How soulscrape compares to the tools people reach for instead: people-enrichment platforms, persona chatbots, deep-research modes, and hand-written persona prompts.";

export const metadata: Metadata = {
  title: "compare — soulscrape",
  description,
  alternates: { canonical: siteUrl("/compare") },
  openGraph: { title: "soulscrape comparisons", description, url: siteUrl("/compare") },
};

export default function CompareIndex() {
  return (
    <StoryPage
      kicker="compare"
      lede="soulscrape isn't a lead database, a chatbot, or a search engine — it's an agent skill that writes cited dossiers on people and a public index that publishes them. here's how it differs from what you might reach for instead."
      path="/compare"
      title="honest comparisons."
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
          {"If your question is “who should we email,” use an enrichment tool. If it’s “chat with a character,” use a persona bot. If it’s “summarize a topic,” use deep research. If it’s “how does this person think — and where’s the evidence” — that’s the dossier."}
        </p>
      </section>
    </StoryPage>
  );
}
