import type { Metadata } from "next";
import { MarketingComparison } from "@hraness/design-kit/react/server";

import { StoryPage } from "../../components/story-page";
import { comparisons } from "../../lib/compare";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { COMPARE_DESCRIPTION } from "../../lib/page-copy";

// Comparison rows checked against first-party product pages on 2026-09-28.
const compareRows = [
  { label: "Soulscrape", values: ["Dated, cited dossier", "Your agent", "Understand one subject"] },
  { label: "SOUL.md", values: ["Persona and style files", "Your agent", "Give an agent your voice"] },
  { label: "Delphi", values: ["Chatbot of you", "Hosted service", "Let people chat with your clone"] },
  { label: "Crystal", values: ["Personality profiles and tips", "Web app and extension", "Work with people"] },
  { label: "Clay", values: ["Enriched lead records", "Hosted tables", "Research sales leads at scale"] },
  { label: "Deep research", values: ["Cited report", "ChatGPT, Perplexity or Gemini", "Answer a one-off question"] },
  { label: "Character.AI", values: ["Chat characters", "Hosted apps", "Roleplay and entertainment"] },
] as const;

export const metadata: Metadata = pageMetadata({ title: pageTitle("Compare"), description: COMPARE_DESCRIPTION, path: "/compare" });

export default function CompareIndex() {
  return (
    <StoryPage
      kicker="Compare"
      lede="Soulscrape turns your sources into a dated, cited dossier on one person, company, or product. Compare it with tools for research, memory, and digital personas."
      path="/compare"
      title="How Soulscrape compares"
    >
      <section className="story-section">
        <h2>Side by side</h2>
        <MarketingComparison
          caption="Tools for understanding, remembering and representing people"
          options={[{ name: "What you get" }, { name: "Where it runs" }, { name: "Best for" }]}
          rows={compareRows}
          note={<>Read the detailed comparisons below, or visit <a href="https://www.delphi.ai">Delphi</a> and <a href="https://www.crystalknows.com">Crystal</a> for their product details.</>}
        />
      </section>
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
    </StoryPage>
  );
}
