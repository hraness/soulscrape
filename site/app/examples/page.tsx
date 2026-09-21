import type { Metadata } from "next";
import { MarketingPage, MarketingSiteHeader } from "@hraness/design-kit/react/server";
import { ExamplesBrowser } from "../../components/examples-browser";
import type { ExampleIndex } from "../../components/example-index-card";
import { exampleImage } from "../../lib/example-images";
import { exampleCategory, featuredIndexes } from "../../lib/examples";
import { siteUrl } from "../../lib/site";

const description = "A personal collection of people worth following. Explore their work, ideas, and the sources behind each profile.";
export const metadata: Metadata = {
  title: "Examples — soulscrape",
  description,
  alternates: { canonical: siteUrl("/examples") },
  openGraph: { title: "Examples — soulscrape", description, url: siteUrl("/examples") },
};

export default function ExamplesPage() {
  const examples: ExampleIndex[] = featuredIndexes.map(example => {
    const portrait = exampleImage("ben", example.handle);
    if (!portrait) throw new Error(`Missing example image: ${example.handle}`);
    return { ...example, category: exampleCategory(example.handle), initials: example.name.split(" ").map(word => word[0]).slice(0, 2).join(""), portrait };
  });
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <MarketingSiteHeader
        brand="soulscrape" brandHref="/" brandLabel="soulscrape home"
        links={[{ href: "/examples", label: "Examples" }, { href: "/#method", label: "method" }, { href: "/#indexes", label: "publish your own" }]}
        action={{ href: "/#install", label: "install the skill" }}
      />
      <main id="main" tabIndex={-1}>
        <MarketingPage className="examples-page">
          <header className="examples-intro">
            <p className="person-kicker">a personal collection</p>
            <h1>Examples</h1>
            <p className="examples-lead">People worth following.<br />Ideas worth spending time with.</p>
            <p className="examples-description">Builders, musicians, scientists, and other people who caught my attention. A growing collection, curated by <a href="/ben">@ben</a>. Open a profile to explore their work and the evidence behind it.</p>
          </header>
          <ExamplesBrowser examples={examples} />
          <p className="featured-note examples-attribution">Dated, revisable models made from public evidence. These examples are interpretations, not endorsements by the people featured. <a href="/portraits/credits.html">Portrait credits</a>.</p>
        </MarketingPage>
      </main>
    </>
  );
}
