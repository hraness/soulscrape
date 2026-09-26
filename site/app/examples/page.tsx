import type { Metadata } from "next";
import { MarketingPage } from "@hraness/design-kit/react/server";
import { ExamplesBrowser } from "../../components/examples-browser";
import { SiteHeader, SkipLink } from "../../components/site-header";
import type { ExampleIndex } from "../../components/example-index-card";
import { exampleImage } from "../../lib/example-images";
import { exampleCategory, featuredIndexes } from "../../lib/examples";
import { pageMetadata, pageTitle } from "../../lib/metadata";
import { EXAMPLES_DESCRIPTION } from "../../lib/page-copy";

export const metadata: Metadata = pageMetadata({ title: pageTitle("Examples"), description: EXAMPLES_DESCRIPTION, path: "/examples" });

export default function ExamplesPage() {
  const examples: ExampleIndex[] = featuredIndexes.map(example => {
    const portrait = exampleImage("ben", example.handle);
    if (!portrait) throw new Error(`Missing example image: ${example.handle}`);
    return { ...example, category: exampleCategory(example.handle), initials: example.name.split(" ").map(word => word[0]).slice(0, 2).join(""), portrait };
  });
  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <MarketingPage className="examples-page">
          <header className="examples-intro">
            <p className="person-kicker">the example collection</p>
            <h1>Examples</h1>
            <p className="examples-lead">People worth following.<br />Ideas worth spending time with.</p>
            <p className="examples-description">Builders, musicians, scientists, and other people worth following. A growing collection, published by <a href="/ben">@ben</a>. Open a profile to explore their work and the evidence behind it.</p>
          </header>
          <ExamplesBrowser examples={examples} />
          <p className="featured-note examples-attribution">Dated, revisable dossiers built from public sources. These examples are interpretations, not endorsements by the people featured. <a href="/portraits/credits.html">Portrait credits</a>.</p>
        </MarketingPage>
      </main>
    </div>
  );
}
