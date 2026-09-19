import { CORPUS_PAGE_DIGEST_VERSION, PUBLIC_CACHE_CONTROL } from "../lib/public-response";
import { afterEach, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";

import { GET } from "../app/api/v1/index.json/route";
import { corpusDigest, type PublicGraphRow } from "../lib/corpus-graph";

const originalConvexUrl = process.env.CONVEX_URL;
let querySpy: { mockRestore(): void } | undefined;

afterEach(() => {
  querySpy?.mockRestore();
  if (originalConvexUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalConvexUrl;
});

const rows: PublicGraphRow[] = [100, 200].map((updatedAtMs, index) => ({
  username: "example_editor",
  handle: `person-${index}`,
  displayName: `Example Person ${index}`,
  summary: "Synthetic public fixture.",
  packetDigest: String(index).repeat(64),
  revision: 1,
  publishedAtMs: 100,
  updatedAtMs,
  relations: [],
}));

test("index deltas retain the full versioned digest without claiming a deletion cursor", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  querySpy = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue({ rows, nextCursor: null, isDone: true });
  const response = await GET(new Request("https://soulscrape.com/api/v1/index.json?since=150"));
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(response.headers.get("cache-control")).toBe(PUBLIC_CACHE_CONTROL);
  expect(body).toMatchObject({
    version: "soulscrape.api.v1",
    corpusDigestVersion: CORPUS_PAGE_DIGEST_VERSION,
    corpusDigest: await corpusDigest(rows),
    sync: {
      mode: "row-delta", complete: false, deletionsIncluded: false,
      fullReconciliationRequired: true, asOfMsMeaning: "response-start-not-cursor",
    },
  });
  expect(body.profiles).toHaveLength(1);
  expect(body.profiles[0].handle).toBe("person-1");
});

test("index input validation precedes provider reads", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue({ rows, nextCursor: null, isDone: true });
  querySpy = query;
  for (const since of ["", " ", "1.5", "1e3", "-1", "Infinity", "9007199254740992"]) {
    const response = await GET(new Request(`https://soulscrape.com/api/v1/index.json?since=${encodeURIComponent(since)}`));
    expect(response.status).toBe(400);
  }
  expect(query).not.toHaveBeenCalled();
});
