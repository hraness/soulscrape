import { afterAll, beforeAll, describe, expect, spyOn, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { getFunctionName } from "convex/server";

import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { generateMetadata } from "../app/[username]/[handle]/page";

const packet: unknown = JSON.parse(readFileSync(join(import.meta.dir, "../../examples/people/eugene-tssui/person-index.json"), "utf8"));
const rows = [
  { username: "ben", handle: "eugene-tssui", updatedAtMs: Date.UTC(2026, 0, 2) },
  { username: "ben", handle: "hyperdub", updatedAtMs: Date.UTC(2026, 0, 3) },
];

const previousUrl = process.env.CONVEX_URL;
const query = spyOn(ConvexHttpClient.prototype, "query");

beforeAll(() => {
  process.env.CONVEX_URL = "https://example-test-123.convex.cloud";
  query.mockImplementation((async (ref: Parameters<ConvexHttpClient["query"]>[0], args?: Record<string, unknown>) => {
    const name = getFunctionName(ref);
    if (name === "people:listAllPublic") return rows;
    if (name === "people:getPublic" && args?.handle === "eugene-tssui") {
      return { username: "ben", handle: "eugene-tssui", packet, packetDigest: "a".repeat(64), revision: 1, publishedAtMs: 1, updatedAtMs: 2 };
    }
    return null;
  }) as unknown as ConvexHttpClient["query"]);
});

afterAll(() => {
  query.mockRestore();
  if (previousUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = previousUrl;
});

describe("dossier indexing", () => {
  test("every public dossier and its publisher page enter the sitemap", async () => {
    const urls = (await sitemap()).map(entry => entry.url);
    expect(urls).toContain("https://soulscrape.com/ben/eugene-tssui");
    expect(urls).toContain("https://soulscrape.com/ben/hyperdub");
    expect(urls).toContain("https://soulscrape.com/ben");
  });

  test("dossier pages carry a canonical URL and no noindex directive", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ username: "ben", handle: "eugene-tssui" }) });
    expect(metadata.alternates?.canonical).toBe("https://soulscrape.com/ben/eugene-tssui");
    expect(metadata.robots).toBeUndefined();
  });

  test("robots.txt leaves dossier paths crawlable", () => {
    const rules = robots().rules;
    const list = Array.isArray(rules) ? rules : [rules];
    for (const rule of list) {
      const disallow = [rule.disallow ?? []].flat();
      expect(disallow.some(path => "/ben/eugene-tssui".startsWith(path))).toBe(false);
    }
  });
});
