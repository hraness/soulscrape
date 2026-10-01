import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingComparison } from "@hraness/design-kit/react/server";

import { StoryPage } from "../../../components/story-page";
import { comparison, comparisons } from "../../../lib/compare";
import { NOT_FOUND_TITLE, pageMetadata } from "../../../lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map(entry => ({ tool: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  const entry = comparison(tool);
  if (entry === undefined) return { title: NOT_FOUND_TITLE };
  return pageMetadata({ title: entry.title, description: entry.description, path: `/compare/${entry.slug}`, type: "article" });
}

export default async function ComparePage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const entry = comparison(tool);
  if (entry === undefined) notFound();

  return (
    <StoryPage
      breadcrumb={[
        { href: "/compare", label: "Compare" },
        { href: `/compare/${entry.slug}`, label: entry.tool, current: true },
      ]}
      kicker={`vs ${entry.category}`}
      lede={entry.description}
      path={`/compare/${entry.slug}`}
      title={entry.title}
    >
      <section className="story-section">
        <h2>Side by side</h2>
        <MarketingComparison
          caption={`${entry.tool} and Soulscrape at a glance`}
          options={[{ name: entry.tool }, { name: "Soulscrape", mark: "/marks/soulscrape.svg" }]}
          highlight={1}
          rows={entry.glance}
          note="Soulscrape works from sources you’re allowed to use. Imitating someone’s voice requires their authorization; publishing a dossier is optional."
        />
      </section>
      <section className="story-section">
        <h2>{entry.whatHeading}</h2>
        <p className="story-summary">{entry.whatTheyAre}</p>
        <p className="featured-note">
          Checked on {entry.checkedOn}. Sources:{" "}
          {entry.sources.map((source, index) => (
            <span key={source.url}>
              {index > 0 ? ", " : null}
              <a href={source.url}>{source.label}</a>
            </span>
          ))}
          .
        </p>
      </section>
      <section className="story-section">
        <h2>How they differ</h2>
        <p className="story-summary">{entry.difference}</p>
      </section>
      <section className="story-section">
        <h2>When to choose each</h2>
        <div className="compare-columns">
          <div className="compare-column hraness-material-pane">
            <h3>{entry.chooseHeading}</h3>
            <ul>
              {entry.chooseThem.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="compare-column hraness-material-pane">
            <h3>Choose Soulscrape when</h3>
            <ul>
              {entry.chooseOurs.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="story-section">
        <h2>See a published dossier</h2>
        <p>
          Browse a <a href="/ben/eugene-tssui">published dossier</a>, check the{" "}
          <a href="/docs/person-index">packet reference</a>, or read{" "}
          <a href="/use-cases">what people use dossiers for</a>.
        </p>
      </section>
    </StoryPage>
  );
}
