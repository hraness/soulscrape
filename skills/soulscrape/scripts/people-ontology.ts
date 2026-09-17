const HANDLE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const WIKIDATA_ID = /^Q[1-9][0-9]{0,9}$/u;
const PUBLISHER = /^[a-z0-9](?:[a-z0-9]|[-_](?=[a-z0-9]))*[a-z0-9]$/u;
const PROFILE_URL = /^https:\/\/soulscrape\.com\/([^/]+)\/([^/]+)$/u;
const RESERVED_SITE_SEGMENTS: ReadonlySet<string> = new Set([
  "api",
  "connect",
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

export type SoulscrapeProfileLocator = Readonly<{
  profileUrl: string;
  username: string;
  handle: string;
}>;

export function normalizeEntityHandle(displayName: string): string {
  const folded = displayName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff]/gu, "")
    .toLowerCase();
  let handle = "";
  let dash = false;
  for (const character of folded) {
    const code = character.codePointAt(0)!;
    const safe = (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
    if (safe) {
      handle += character;
      dash = false;
    } else if (!dash && handle.length > 0) {
      handle += "-";
      dash = true;
    }
  }
  return handle.replace(/-+$/u, "");
}

export function isEntityHandle(value: string): boolean {
  return value.length >= 2 && value.length <= 64 && HANDLE.test(value);
}

export function parseWikidataId(value: unknown): string | null {
  return typeof value === "string" && WIKIDATA_ID.test(value) ? value : null;
}

export function parseSoulscrapeProfileUrl(value: unknown): SoulscrapeProfileLocator | null {
  if (typeof value !== "string" || value.length > 112) return null;
  const match = PROFILE_URL.exec(value);
  if (match === null) return null;
  const username = match[1]!;
  const handle = match[2]!;
  if (
    username.length < 3 || username.length > 24 || !PUBLISHER.test(username)
    || RESERVED_SITE_SEGMENTS.has(username) || !isEntityHandle(handle)
  ) return null;
  return { profileUrl: value, username, handle };
}

export { normalizeEntityHandle as normalizePersonHandle, isEntityHandle as isPersonHandle };
