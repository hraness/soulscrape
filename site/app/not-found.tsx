import type { Metadata } from "next";
import { RouteNotFoundPage } from "@hraness/design-kit/react";

import { SiteHeader, SkipLink } from "../components/site-header";
import { NOT_FOUND_TITLE, SITE_NAME } from "../lib/metadata";
import { knownRoutes } from "../lib/site-routes";

export const metadata: Metadata = {
  title: { absolute: NOT_FOUND_TITLE },
  robots: { index: false, follow: false },
};

/** The 404 page for unmatched paths and withdrawn or missing profiles. */
export default function NotFound() {
  return (
    <div data-hraness-marketing-preset="editorial">
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <RouteNotFoundPage
          canvasAs="div"
          siteName={SITE_NAME}
          summary="The link may be out of date or mistyped, or its publisher withdrew the dossier."
          primaryAction={{ href: "/#install", label: "Install the skill" }}
          next={[
            {
              href: "/examples",
              label: "Browse the dossiers",
              description: "People researched from public sources, with every claim linked to its evidence.",
            },
            {
              href: "/docs/quickstart",
              label: "Quickstart",
              description: "Install the skill, point your agent at sources, and read the dossier it writes.",
            },
            {
              href: "/use-cases",
              label: "Use cases",
              description: "Ground an agent, research a person before a call, or write about someone.",
            },
          ]}
          routes={knownRoutes()}
          agentIndexHref="/llms.txt"
        />
      </main>
    </div>
  );
}
