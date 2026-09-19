import { afterEach, beforeEach, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";
import { ConvexError } from "convex/values";

import { POST as start } from "../app/api/v1/device/start/route";
import { POST as poll } from "../app/api/v1/device/poll/route";
import { DELETE as revoke, GET as whoami } from "../app/api/v1/auth/route";

const originalConvexUrl = process.env.CONVEX_URL;
const originalPublicConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const token = `spt_${"a".repeat(48)}`;
const secret = `sps_${"b".repeat(48)}`;
const providerSpies: { mockRestore(): void }[] = [];

beforeEach(() => { process.env.CONVEX_URL = "https://synthetic-test.convex.cloud"; });
afterEach(() => {
  for (const spy of providerSpies.splice(0)) spy.mockRestore();
  if (originalConvexUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalConvexUrl;
  if (originalPublicConvexUrl === undefined) delete process.env.NEXT_PUBLIC_CONVEX_URL;
  else process.env.NEXT_PUBLIC_CONVEX_URL = originalPublicConvexUrl;
});

function post(body?: string, headers?: HeadersInit): Request {
  return new Request("https://soulscrape.com/api/v1/device", { method: "POST", body, headers });
}
function auth(method: string, bearer: string | null = token): Request {
  return new Request("https://soulscrape.com/api/v1/auth", {
    method, headers: bearer === null ? {} : { authorization: `Bearer ${bearer}` },
  });
}
function mutationResult(value: unknown = { ok: true }) {
  const spy = spyOn(ConvexHttpClient.prototype, "mutation").mockResolvedValue(value);
  providerSpies.push(spy);
  return spy;
}
function queryResult(value: unknown) {
  const spy = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue(value);
  providerSpies.push(spy);
  return spy;
}
async function expectError(response: Response, status: number, code: string, retryable = false) {
  expect(response.status).toBe(status);
  expect(response.headers.get("cache-control")).toBe("no-store");
  const body = await response.json();
  expect(body).toMatchObject({ ok: false, version: "soulscrape.api.v1", error: { code, retryable } });
  expect(JSON.stringify(body)).not.toContain("fixture-secret");
  return body as { error: { message: string; retryAfterMs?: number } };
}

test("device start accepts no body and an empty object without weakening supplied names", async () => {
  const mutation = mutationResult();
  for (const request of [post(), post(undefined, { "content-length": "0" }), post("{}")]) {
    const response = await start(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({ ok: true, expiresInSec: 900, pollAfterMs: 2_000 });
    expect(body.code).toMatch(/^SS-[2-9A-HJKMNP-TV-Z]{4}-[2-9A-HJKMNP-TV-Z]{4}$/u);
    expect(body.secret).toMatch(/^sps_[A-Za-z0-9_-]{48}$/u);
    expect(body.verificationUrl).toBe(`https://soulscrape.com/connect?code=${body.code}`);
  }
  for (const call of mutation.mock.calls) {
    expect(call[1]).toEqual({ codeDigest: expect.stringMatching(/^[a-f0-9]{64}$/u), secretDigest: expect.stringMatching(/^[a-f0-9]{64}$/u), deviceName: "soulscrape cli" });
  }
});

test("device start accepts the exact name length boundaries", async () => {
  const mutation = mutationResult();
  for (const deviceName of ["a", "x".repeat(80)]) {
    expect((await start(post(JSON.stringify({ deviceName })))).status).toBe(200);
    expect(mutation.mock.calls.at(-1)?.[1]).toMatchObject({ deviceName });
  }
});

test("device start rejects invalid JSON, supplied names, and extra fields before registering a code", async () => {
  const mutation = mutationResult();
  const bodies = ["", "{", "null", "[]", "false", "1", '"device"', '{"deviceName":null}', '{"deviceName":1}', '{"deviceName":""}', JSON.stringify({ deviceName: "x".repeat(81) }), '{"unknown":true}', '{"deviceName":"valid","secret":"fixture-secret"}'];
  for (const body of bodies) await expectError(await start(post(body)), 400, "BAD_REQUEST");
  expect(mutation).not.toHaveBeenCalled();
});

test("device start rejects oversized and invalid declared bodies before provider calls", async () => {
  const mutation = mutationResult();
  for (const request of [
    post(JSON.stringify({ deviceName: "x".repeat(512 * 1024) })),
    post("{}", { "content-length": String(512 * 1024 + 1) }),
    post(undefined, { "content-length": "not-a-length" }),
    post(undefined, { "content-length": "10" }),
  ]) await expectError(await start(request), 400, "BAD_REQUEST");
  expect(mutation).not.toHaveBeenCalled();
});

test("device start returns sanitized retryable upstream errors", async () => {
  const mutation = mutationResult();
  mutation.mockRejectedValue(new Error("fixture-secret backend failure"));
  await expectError(await start(post("{}")), 502, "DEVICE_START_FAILED", true);
  mutation.mockResolvedValue({ ok: false, detail: "fixture-secret" });
  await expectError(await start(post("{}")), 502, "DEVICE_START_FAILED", true);
});

test("device poll validates the entire request before contacting the backend", async () => {
  const mutation = mutationResult();
  for (const body of [undefined, "{", "null", "[]", "{}", '{"secret":"bad"}', JSON.stringify({ secret, extra: true }), JSON.stringify({ secret: "x".repeat(512 * 1024) })]) {
    await expectError(await poll(post(body)), 400, "BAD_REQUEST");
  }
  expect(mutation).not.toHaveBeenCalled();
});

test("device poll preserves pending, expired, and complete authorization results", async () => {
  const mutation = mutationResult({ status: "pending" });
  const pending = await poll(post(JSON.stringify({ secret })));
  expect(pending.status).toBe(200);
  expect(await pending.json()).toMatchObject({ ok: true, status: "pending", pollAfterMs: 2_000 });
  mutation.mockResolvedValue({ status: "expired" });
  await expectError(await poll(post(JSON.stringify({ secret }))), 410, "DEVICE_CODE_EXPIRED");
  mutation.mockResolvedValue({ status: "authorized", token, username: "example_editor", extra: "fixture-secret" });
  const authorized = await poll(post(JSON.stringify({ secret })));
  expect(authorized.status).toBe(200);
  expect(await authorized.json()).toEqual({ ok: true, version: "soulscrape.api.v1", status: "authorized", token, username: "example_editor" });
});

test("only typed device poll errors become terminal unknown or invalid responses", async () => {
  const mutation = mutationResult();
  for (const [code, status] of [["DEVICE_CODE_UNKNOWN", 404], ["BAD_REQUEST", 400]] as const) {
    mutation.mockRejectedValue(new ConvexError({ code }));
    await expectError(await poll(post(JSON.stringify({ secret }))), status, code);
  }
});

test("device limit is a terminal 429 with a recovery path rather than an automatic retry", async () => {
  const mutation = mutationResult();
  mutation.mockRejectedValue(new ConvexError({ code: "DEVICE_LIMIT" }));
  const body = await expectError(await poll(post(JSON.stringify({ secret }))), 429, "DEVICE_LIMIT");
  expect(body.error.retryAfterMs).toBeUndefined();
  expect(body.error.message).toContain("20 active publishing devices");
  expect(body.error.message).toContain("logout");
  expect(body.error.message).toContain("hraness@pm.me");
  expect(JSON.stringify(body)).not.toContain(secret);
  mutation.mockRejectedValue(new Error("DEVICE_LIMIT fixture-secret"));
  await expectError(await poll(post(JSON.stringify({ secret }))), 502, "DEVICE_POLL_FAILED", true);
});

test("device poll does not turn backend outages or malformed results into terminal 404s", async () => {
  const mutation = mutationResult();
  for (const error of [new Error("DEVICE_CODE_UNKNOWN fixture-secret"), new ConvexError("DEVICE_CODE_UNKNOWN fixture-secret"), { data: { code: "DEVICE_CODE_UNKNOWN" } }]) {
    mutation.mockRejectedValue(error);
    const body = await expectError(await poll(post(JSON.stringify({ secret }))), 502, "DEVICE_POLL_FAILED", true);
    expect(body.error.retryAfterMs).toBe(2_000);
  }
  for (const result of [null, undefined, {}, { status: "other" }, { status: "authorized" }, { status: "authorized", token: "bad", username: "example_editor" }, { status: "authorized", token, username: "x" }, { status: "authorized", token, username: "x".repeat(65) }]) {
    mutation.mockResolvedValue(result);
    await expectError(await poll(post(JSON.stringify({ secret }))), 502, "DEVICE_POLL_FAILED", true);
  }
});

test("auth endpoints reject malformed or missing credentials before provider calls", async () => {
  const query = queryResult(null);
  const mutation = mutationResult();
  for (const bearer of [null, "bad", "spt_short", `spt_${"x".repeat(49)}`]) {
    await expectError(await whoami(auth("GET", bearer)), 401, "UNAUTHORIZED");
    await expectError(await revoke(auth("DELETE", bearer)), 401, "UNAUTHORIZED");
  }
  expect(query).not.toHaveBeenCalled();
  expect(mutation).not.toHaveBeenCalled();
});

test("auth lookup distinguishes unauthorized from upstream failure and limits returned identity", async () => {
  const query = queryResult(null);
  await expectError(await whoami(auth("GET")), 401, "UNAUTHORIZED");
  query.mockRejectedValue(new Error("fixture-secret"));
  await expectError(await whoami(auth("GET")), 502, "AUTH_LOOKUP_FAILED", true);
  for (const result of [undefined, {}, { accountId: "id", username: "" }, { accountId: "", username: "valid" }]) {
    query.mockResolvedValue(result);
    await expectError(await whoami(auth("GET")), 502, "AUTH_LOOKUP_FAILED", true);
  }
  query.mockResolvedValue({ accountId: "account", username: "example_editor", secret: "fixture-secret" });
  const response = await whoami(auth("GET"));
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true, version: "soulscrape.api.v1", accountId: "account", username: "example_editor" });
});

test("idempotent revocation reports confirmed success or a retryable error that retains local credentials", async () => {
  const mutation = mutationResult();
  const response = await revoke(auth("DELETE"));
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ ok: true, revoked: true });
  mutation.mockRejectedValue(new Error("fixture-secret"));
  const body = await expectError(await revoke(auth("DELETE")), 502, "AUTH_REVOKE_FAILED", true);
  expect(body.error.message).toContain("retain the local credential");
  for (const result of [null, undefined, {}, { ok: false }]) {
    mutation.mockResolvedValue(result);
    await expectError(await revoke(auth("DELETE")), 502, "AUTH_REVOKE_FAILED", true);
  }
});

test("device and auth routes keep unconfigured deployments as retryable JSON 503s", async () => {
  delete process.env.CONVEX_URL;
  delete process.env.NEXT_PUBLIC_CONVEX_URL;
  const mutation = mutationResult();
  const query = queryResult(null);
  for (const response of [await start(post()), await poll(post(JSON.stringify({ secret }))), await whoami(auth("GET")), await revoke(auth("DELETE"))]) {
    await expectError(response, 503, "PUBLISHING_NOT_CONFIGURED", true);
  }
  expect(mutation).not.toHaveBeenCalled();
  expect(query).not.toHaveBeenCalled();
});
