import { SiteHeader, SkipLink } from "../components/site-header";

/** The 404 page for unmatched paths and withdrawn or missing profiles. */
export default function NotFound() {
  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader />
      <div className="story-shell">
        <main id="main" tabIndex={-1}>
          <header className="story-hero">
            <p className="story-kicker">not found</p>
            <h1>nothing is published at this address.</h1>
            <p className="story-lede">
              If you followed a link to a profile, its publisher may have withdrawn it.{" "}
              <a href="/examples">Browse the examples</a> or <a href="/docs">read the docs</a>.
            </p>
          </header>
        </main>
      </div>
    </div>
  );
}
