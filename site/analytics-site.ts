import type { PostHogSiteDefinition } from "@hraness/posthog";

export const analyticsSite = {
  "id": "soulscrape",
  "canonicalDomain": "soulscrape.com",
  "allowedHosts": [
    "soulscrape.com",
    "www.soulscrape.com"
  ],
  "schemaVersion": 2,
  "routes": [
    {
      "match": "exact",
      "path": "/",
      "pageKind": "home"
    },
    {
      "match": "prefix",
      "path": "/docs",
      "pageKind": "docs"
    },
    {
      "match": "prefix",
      "path": "/compare",
      "pageKind": "compare"
    },
    {
      "match": "prefix",
      "path": "/install",
      "pageKind": "download"
    },
    {
      "match": "prefix",
      "path": "/download",
      "pageKind": "download"
    },
    {
      "match": "prefix",
      "path": "/spec",
      "pageKind": "docs"
    },
    {
      "match": "prefix",
      "path": "/benchmarks",
      "pageKind": "research"
    },
    {
      "match": "prefix",
      "path": "/blog",
      "pageKind": "article",
      "contentGroup": "blog",
      "captureSlug": true
    }
  ],
  "sensitivePaths": [
    {
      "match": "prefix",
      "path": "/docs/auth"
    },
    {
      "match": "prefix",
      "path": "/account"
    }
  ],
  "customEvents": [
    "cta clicked",
    "outbound link opened"
  ],
  "allowedPaths": [
    {
      "match": "exact",
      "path": "/"
    },
    {
      "match": "prefix",
      "path": "/use-cases"
    },
    {
      "match": "prefix",
      "path": "/compare"
    },
    {
      "match": "prefix",
      "path": "/examples"
    },
    {
      "match": "prefix",
      "path": "/docs"
    },
    {
      "match": "prefix",
      "path": "/blog"
    }
  ],
  "excludedPaths": [
    {
      "match": "prefix",
      "path": "/connect"
    },
    {
      "match": "prefix",
      "path": "/auth"
    },
    {
      "match": "prefix",
      "path": "/account"
    },
    {
      "match": "prefix",
      "path": "/device"
    }
  ]
} as const satisfies PostHogSiteDefinition;

/** Only bounded semantic names reach analytics; URLs and link text are never event IDs. */
export function analyticsCtaForUrl(url: URL): string {
  if (url.hostname.replace(/^www\./, "") === "github.com") return "github";
  if (["/install", "/download"].includes(url.pathname.replace(/\/$/, "")) || url.hash === "#install") return "install";
  if (url.pathname === "/docs" || url.pathname.startsWith("/docs/")) return "docs";
  if (url.pathname === "/compare" || url.pathname.startsWith("/compare/")) return "compare";
  if (url.pathname === "/connect") return "connect";
  if (url.pathname === "/use-cases" || url.hash === "#use") return "use_cases";
  return "get_started";
}
