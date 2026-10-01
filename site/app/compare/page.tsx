import type { Metadata } from "next";
import { MarketingComparison } from "@hraness/design-kit/react/server";

import { StoryPage } from "../../components/story-page";
import { comparisons } from "../../lib/compare";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { COMPARE_DESCRIPTION } from "../../lib/page-copy";

const TABLE_CHECKED_ON = "2026-09-28";

const compareRows = [
  { label: "Soulscrape", values: ["Dated, cited dossier", "Your agent", "Understand one person"] },
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
      lede="Soulscrape turns your sources into a dated, cited dossier on one person. Compare it with tools for research, memory, and digital personas."
      path="/compare"
      title="How Soulscrape compares"
    >
      <section className="story-section">
        <h2>Side by side</h2>
        <MarketingComparison
          caption="Tools for understanding, remembering and representing people"
          options={[{ name: "What you get" }, { name: "Where it runs" }, { name: "Best for" }]}
          rows={compareRows}
          note={<>Checked {TABLE_CHECKED_ON} against each tool’s own site. Soulscrape works from sources you’re allowed to use; imitating someone’s voice requires their authorization. Publishing a dossier is optional and free. See the comparisons below, <a href="https://www.delphi.ai">Delphi</a>, and <a href="https://www.crystalknows.com">Crystal</a>.</>}
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
