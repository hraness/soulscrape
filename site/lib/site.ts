export const SITE_ORIGIN = "https://soulscrape.com";

export function siteUrl(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export function isReservedUsernameSegment(value: string): boolean {
  return RESERVED_SITE_SEGMENTS.has(value);
}

const RESERVED_SITE_SEGMENTS: ReadonlySet<string> = new Set([
  "api",
  "compare",
  "connect",
  "examples",
  "use-cases",
  "photos",
  "portraits",
  "docs",
  "about",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
  "llms-full.txt",
  "manifest.json",
  "favicon.ico",
  "favicon.svg",
  "opengraph-image",
  "twitter-image",
  "icon",
  "apple-icon",
  "_next",
]);
