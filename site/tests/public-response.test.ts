import { afterEach, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";
import { ConvexError } from "convex/values";

import { GET as indexGET } from "../app/api/v1/index.json/route";
import { GET as profileGET } from "../app/api/v1/profiles/[username]/[handle]/route";
import { GET as ownGET, PUT } from "../app/api/v1/people/route";
import { MAX_PUBLIC_RESPONSE_BYTES, pageOptions, PUBLIC_CACHE_CONTROL, publicJsonResponse } from "../lib/public-response";

const originalUrl = process.env.CONVEX_URL;
const packet = JSON.parse(await Bun.file(new URL("../../examples/people/eugene-tssui/person-index.json", import.meta.url)).text());
afterEach(() => {
  spyOn(ConvexHttpClient.prototype, "query").mockRestore();
  spyOn(ConvexHttpClient.prototype, "mutation").mockRestore();
  if (originalUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalUrl;
});

const request = (path = "index.json", headers?: HeadersInit) => new Request(`https://soulscrape.com/api/v1/${path}`, { headers });
const page = { rows: [], nextCursor: "next-page", isDone: false };

test("weak public validators preserve semantic changes but ignore observation time", async () => {
  const value = { asOfMs: 1, profiles: [], pagination: { nextCursor: "next", isDone: false, snapshot: false } };
  const first = await publicJsonResponse(request(), value);
  const etag = first.headers.get("etag")!;
  expect(first.headers.get("cache-control")).toBe(PUBLIC_CACHE_CONTROL);
  expect(etag.startsWith('W/"')).toBe(true);
  const conditional = request("index.json", { "if-none-match": etag });
  const same = await publicJsonResponse(conditional, { ...value, asOfMs: 2 });
  expect(same.status).toBe(304);
  expect(await same.text()).toBe("");
  expect((await publicJsonResponse(conditional, { ...value, pagination: { ...value.pagination, nextCursor: "different" } })).status).toBe(200);
  expect((await publicJsonResponse(conditional, { ...value, profiles: [{ handle: "new" }] })).status).toBe(200);
});

test("public response budget counts UTF-8 bytes and rejects without caching or truncating", async () => {
  const response = await publicJsonResponse(request(), { text: "é".repeat(MAX_PUBLIC_RESPONSE_BYTES / 2) });
  expect(response.status).toBe(400);
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(await response.json()).toMatchObject({ error: { code: "PAGE_TOO_LARGE", retryable: false } });
});

test("page sizes and cursor bytes are bounded before provider I/O", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue(page);
  for (const suffix of ["?cursor=", "?cursor=" + "x".repeat(2049), "?cursor=%0A", "?limit=0", "?limit=101", "?limit=1.5", "?limit=1e2"]) {
    expect((await indexGET(request("index.json" + suffix))).status).toBe(400);
  }
  expect(query).not.toHaveBeenCalled();
  expect(pageOptions(request("graph.json?cursor=opaque&limit=1"))).toEqual({ cursor: "opaque", limit: 1 });
});

test("index pages preserve continuation even when a page has no live results", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue(page);
  const response = await indexGET(request("index.json?cursor=start&limit=20"));
  expect(query.mock.calls[0]?.[1]).toEqual({ cursor: "start", limit: 20 });
  expect(await response.json()).toMatchObject({ profiles: [], pagination: { nextCursor: "next-page", isDone: false, snapshot: false }, corpusDigestVersion: "soulscrape.corpus-page.v1" });
});

test("unprepared projections and provider failure are controlled noncached responses", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockRejectedValue(new ConvexError({ code: "PROJECTIONS_NOT_READY" }));
  const response = await indexGET(request());
  expect(response.status).toBe(503);
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(await response.json()).toMatchObject({ error: { code: "PROJECTIONS_NOT_READY" } });
  query.mockRejectedValue(new Error("sensitive provider detail"));
  const failure = await indexGET(request());
  expect(failure.status).toBe(503);
  expect(await failure.text()).not.toContain("sensitive provider detail");
});

test("full profiles stay uncached and withdrawal wins over conditional requests", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const query = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue({
    username: "test_user", handle: packet.subject.handle, displayName: packet.subject.displayName,
    summary: packet.subject.summary, packet, packetDigest: "a".repeat(64), revision: 1, publishedAtMs: 1, updatedAtMs: 1,
  });
  const context = { params: Promise.resolve({ username: "test_user", handle: packet.subject.handle }) };
  for (const format of ["json", "markdown"]) {
    const response = await profileGET(request(`profiles/test_user/${packet.subject.handle}?format=${format}`, { "if-none-match": "*" }), context);
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
  }
  query.mockResolvedValue(null);
  const withdrawn = await profileGET(request(`profiles/test_user/${packet.subject.handle}`, { "if-none-match": "*" }), context);
  expect(withdrawn.status).toBe(404);
  expect(withdrawn.headers.get("cache-control")).toBe("no-store");
});

test("publishing rate and readiness errors preserve safe client recovery", async () => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  const mutation = spyOn(ConvexHttpClient.prototype, "mutation").mockRejectedValue(new ConvexError({ code: "RATE_LIMITED", retryAfterMs: 60_000 }));
  const publish = () => new Request("https://soulscrape.com/api/v1/people", { method: "PUT", headers: { authorization: `Bearer spt_${"a".repeat(48)}` }, body: JSON.stringify({ packet }) });
  const rate = await PUT(publish());
  expect(rate.status).toBe(429);
  expect(rate.headers.get("retry-after")).toBe("60");
  expect(await rate.json()).toMatchObject({ error: { code: "RATE_LIMITED", retryable: true, retryAfterMs: 60_000 } });
  mutation.mockRejectedValue(new ConvexError({ code: "PROJECTIONS_NOT_READY" }));
  expect((await PUT(publish())).status).toBe(503);
  spyOn(ConvexHttpClient.prototype, "query").mockRejectedValue(new ConvexError({ code: "PROJECTIONS_NOT_READY" }));
  const own = await ownGET(request("people", { authorization: `Bearer spt_${"a".repeat(48)}` }));
  expect(own.status).toBe(503);
});
