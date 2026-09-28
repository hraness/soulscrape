import type { Metadata } from "next";

import { StoryPage } from "../../components/story-page";
import { comparisons } from "../../lib/compare";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { COMPARE_DESCRIPTION } from "../../lib/page-copy";

const TABLE_CHECKED_ON = "2026-09-28";

/** One row of the side-by-side table. Cells name only what each tool's own site states. */
interface CompareRow {
  tool: string;
  href: string;
  output: string;
  runsIn: string;
  covers: string;
  pickWhen: string;
}

const compareRows: readonly CompareRow[] = [
  {
    tool: "Soulscrape",
    href: "/docs/quickstart",
    output:
      "A dated dossier: claims labeled fact, stated belief, pattern, or speculation, each tied to sources, plus a timeline and open questions",
    runsIn: "Your agent, such as Claude Code or Codex. Publishing to soulscrape.com is optional and free.",
    covers: "One person, from sources you're allowed to use. Imitating their voice needs their authorization.",
    pickWhen: "You need to understand how one person thinks, with evidence.",
  },
  {
    tool: "SOUL.md",
    href: "https://github.com/aeonfun/soul.md",
    output: "SOUL.md and STYLE.md persona files",
    runsIn: "Your agent, such as Claude Code or OpenClaw",
    covers: "You, from your own writing",
    pickWhen: "You want your agent to write and reason like you.",
  },
  {
    tool: "Delphi",
    href: "https://www.delphi.ai",
    output: "A hosted AI clone that people can chat with",
    runsIn: "Delphi's hosted service",
    covers: "You, from your own content",
    pickWhen: "You want to offer a chatbot of yourself.",
  },
  {
    tool: "Crystal",
    href: "https://www.crystalknows.com",
    output: "Personality predictions, including DISC and Big Five, with tips on how to communicate",
    runsIn: "Web app and Chrome extension, including on LinkedIn profiles",
    covers: "You, colleagues, and prospects",
    pickWhen: "You want quick tips for many people at once.",
  },
  {
    tool: "Clay",
    href: "https://www.clay.com",
    output: "Lead rows enriched with contact and company data, plus AI research columns",
    runsIn: "Clay's hosted tables",
    covers: "Sales leads",
    pickWhen: "You run outbound at spreadsheet scale.",
  },
  {
    tool: "Deep research in ChatGPT, Perplexity, or Gemini",
    href: "/compare/deep-research",
    output: "A long cited report",
    runsIn: "Those apps",
    covers: "Any topic",
    pickWhen: "You have a one-off question.",
  },
  {
    tool: "Character.AI",
    href: "https://character.ai",
    output: "Chat characters written by users",
    runsIn: "Character.AI's apps",
    covers: "Fictional and famous characters",
    pickWhen: "You want entertainment or roleplay.",
  },
];

export const metadata: Metadata = pageMetadata({ title: pageTitle("Compare"), description: COMPARE_DESCRIPTION, path: "/compare" });

export default function CompareIndex() {
  return (
    <StoryPage
      kicker="compare"
      lede="Soulscrape is a free agent skill that writes a dated dossier on one person, with every claim tied to its sources. Here is how it compares with tools people use for nearby jobs."
      path="/compare"
      title="how Soulscrape compares"
    >
      <section className="story-section">
        <h2>which tool answers which question.</h2>
        <p>
          Pick Soulscrape for a cited dossier on one person that you can revise, publish, or hand to an
          agent. Pick SOUL.md to make your own agent write like you. Pick Delphi to let people chat with
          an AI version of you. Pick Crystal or Clay to profile sales leads at scale. Pick deep research
          for a one-off report on a topic, and Character.AI for roleplay.
        </p>
      </section>
      <section className="story-section">
        <h2>side by side.</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <caption>Checked on {TABLE_CHECKED_ON} against each tool&apos;s own site.</caption>
            <thead>
              <tr>
                <th scope="col">Tool</th>
                <th scope="col">What you get</th>
                <th scope="col">Where it runs</th>
                <th scope="col">Who it covers</th>
                <th scope="col">Pick it when</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(row => (
                <tr key={row.tool}>
                  <th scope="row"><a href={row.href}>{row.tool}</a></th>
                  <td>{row.output}</td>
                  <td>{row.runsIn}</td>
                  <td>{row.covers}</td>
                  <td>{row.pickWhen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
