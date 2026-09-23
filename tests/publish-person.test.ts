import { afterEach, beforeEach, expect, spyOn, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { main } from "../skills/soulscrape/scripts/publish-person";

const origin = "https://soulscrape.com";
const originalConfigHome = process.env.SOULSCRAPE_CONFIG_HOME;
const originalToken = process.env.SOULSCRAPE_API_TOKEN;
let directory: string;
let fetchSpy: { mockRestore(): void };
let stdoutSpy: { mockRestore(): void };
const output: string[] = [];
const originalFetchPreconnect = globalThis.fetch.preconnect;

function mockFetch(implementation: (input: Parameters<typeof fetch>[0], options?: Parameters<typeof fetch>[1]) => Promise<Response>) {
  return spyOn(globalThis, "fetch").mockImplementation(Object.assign(implementation, { preconnect: originalFetchPreconnect }));
}

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "soulscrape-logout-"));
  process.env.SOULSCRAPE_CONFIG_HOME = directory;
  delete process.env.SOULSCRAPE_API_TOKEN;
  output.length = 0;
  stdoutSpy = spyOn(process.stdout, "write").mockImplementation(chunk => { output.push(String(chunk)); return true; });
});

afterEach(() => {
  fetchSpy?.mockRestore();
  stdoutSpy.mockRestore();
  if (originalConfigHome === undefined) delete process.env.SOULSCRAPE_CONFIG_HOME;
  else process.env.SOULSCRAPE_CONFIG_HOME = originalConfigHome;
  if (originalToken === undefined) delete process.env.SOULSCRAPE_API_TOKEN;
  else process.env.SOULSCRAPE_API_TOKEN = originalToken;
  rmSync(directory, { recursive: true, force: true });
});

function credentials(token = "spt_" + "A".repeat(48)) {
  const value = { version: 1, origins: {
    [origin]: { token, username: "synthetic_user", issuedAt: "2026-09-19T00:00:00.000Z" },
    "https://other.example": { token: "spt_" + "B".repeat(48), username: "other_user", issuedAt: "2026-09-19T00:00:00.000Z" },
  } };
  writeFileSync(join(directory, "credentials.json"), JSON.stringify(value), { mode: 0o600 });
  return value;
}

function success() {
  return Response.json({ ok: true, version: "soulscrape.api.v1", revoked: true });
}

test("logout confirms server revocation before removing only the current origin", async () => {
  const value = credentials();
  const requests: string[] = [];
  fetchSpy = mockFetch(async (url, options) => {
    expect(String(url)).toBe(origin + "/api/v1/auth");
    expect(options?.method).toBe("DELETE");
    requests.push(new Headers(options?.headers).get("authorization")!);
    expect(JSON.parse(readFileSync(join(directory, "credentials.json"), "utf8"))).toEqual(value);
    return success();
  });
  await main(["logout", "--origin", origin]);
  expect(requests).toEqual(["Bearer " + value.origins[origin]!.token]);
  expect(JSON.parse(readFileSync(join(directory, "credentials.json"), "utf8")).origins).toEqual({
    "https://other.example": value.origins["https://other.example"],
  });
  expect(output.join("")).toContain('"signedOut":true');
  expect(output.join("")).not.toContain(value.origins[origin]!.token);
});

test("logout preserves the credential and does not claim success when revocation fails", async () => {
  const value = credentials();
  for (const response of [
    () => Promise.reject(new Error("synthetic network failure")),
    () => Promise.resolve(Response.json({ ok: false, version: "soulscrape.api.v1", error: { code: "UNAVAILABLE", message: "retry later", retryable: true } }, { status: 503 })),
    () => Promise.resolve(Response.json({ ok: true, version: "soulscrape.api.v1" })),
  ]) {
    fetchSpy = mockFetch(response);
    await expect(main(["logout", "--origin", origin])).rejects.toThrow();
    expect(JSON.parse(readFileSync(join(directory, "credentials.json"), "utf8"))).toEqual(value);
    expect(output).toHaveLength(0);
    fetchSpy.mockRestore();
  }
});

test("logout revokes an environment token as well as a different stored token", async () => {
  const value = credentials();
  process.env.SOULSCRAPE_API_TOKEN = "spt_" + "C".repeat(48);
  const requests: string[] = [];
  fetchSpy = mockFetch(async (_url, options) => {
    requests.push(new Headers(options?.headers).get("authorization")!);
    return success();
  });
  await main(["logout", "--origin", origin]);
  expect(requests).toEqual(["Bearer " + value.origins[origin]!.token, "Bearer " + process.env.SOULSCRAPE_API_TOKEN]);
  expect(output.join("")).not.toContain(process.env.SOULSCRAPE_API_TOKEN);
});

test("a failed environment-token revocation retains the stored credential for an idempotent retry", async () => {
  const value = credentials();
  process.env.SOULSCRAPE_API_TOKEN = "spt_" + "C".repeat(48);
  let attempts = 0;
  fetchSpy = mockFetch(async () => {
    if (++attempts === 1) return success();
    throw new Error("synthetic network failure");
  });
  await expect(main(["logout", "--origin", origin])).rejects.toMatchObject({ code: "NETWORK_FAILED", retryable: true });
  expect(JSON.parse(readFileSync(join(directory, "credentials.json"), "utf8"))).toEqual(value);
  expect(output).toHaveLength(0);
});

test("logout deduplicates the same environment and stored token", async () => {
  process.env.SOULSCRAPE_API_TOKEN = credentials().origins[origin]!.token;
  const mocked = spyOn(globalThis, "fetch").mockResolvedValue(success());
  fetchSpy = mocked;
  await main(["logout", "--origin", origin]);
  expect(mocked).toHaveBeenCalledTimes(1);
});

test("environment-only logout revokes the token without creating a credential file", async () => {
  process.env.SOULSCRAPE_API_TOKEN = "spt_" + "C".repeat(48);
  const mocked = spyOn(globalThis, "fetch").mockResolvedValue(success());
  fetchSpy = mocked;
  await main(["logout", "--origin", origin]);
  expect(mocked).toHaveBeenCalledTimes(1);
  expect(existsSync(join(directory, "credentials.json"))).toBe(false);
});

const retrySpies: { mockRestore(): void }[] = [];
afterEach(() => { for (const spy of retrySpies.splice(0)) spy.mockRestore(); });

function fastPollingClock() {
  let now = 0;
  const waits: number[] = [];
  const timeouts: number[] = [];
  retrySpies.push(spyOn(Date, "now").mockImplementation(() => now));
  retrySpies.push(spyOn(globalThis as { setTimeout: (handler: () => void, delay?: number) => ReturnType<typeof setTimeout> }, "setTimeout").mockImplementation((handler, delay) => {
    const duration = Number(delay ?? 0);
    waits.push(duration);
    now += duration;
    if (typeof handler === "function") handler();
    return {} as ReturnType<typeof setTimeout>;
  }));
  retrySpies.push(spyOn(AbortSignal, "timeout").mockImplementation(delay => {
    timeouts.push(delay);
    return new AbortController().signal;
  }));
  return { waits, timeouts, now: () => now };
}

const loginToken = "spt_" + "L".repeat(48);
const loginSecret = "sps_" + "S".repeat(48);
function started(expiresInSec = 60) {
  return Response.json({
    ok: true, version: "soulscrape.api.v1", code: "SS-ABCD-EFGH", secret: loginSecret,
    verificationUrl: origin + "/connect?code=SS-ABCD-EFGH", expiresInSec, pollAfterMs: 1_000,
  });
}
function authorized() {
  return Response.json({ ok: true, version: "soulscrape.api.v1", status: "authorized", token: loginToken, username: "synthetic_user" });
}
function pollFailure(retryAfterMs?: number) {
  return Response.json({
    ok: false, version: "soulscrape.api.v1",
    error: { code: "DEVICE_POLL_FAILED", message: "could not check authorization", retryable: true, ...(retryAfterMs === undefined ? {} : { retryAfterMs }) },
  }, { status: 502 });
}

test("login honors bounded retry guidance and resets backoff after a successful pending poll", async () => {
  const clock = fastPollingClock();
  let polls = 0;
  fetchSpy = mockFetch(async url => {
    if (String(url).endsWith("/start")) return started();
    polls += 1;
    if (polls === 1) return pollFailure(7_000);
    if (polls === 2) return Response.json({ ok: true, version: "soulscrape.api.v1", status: "pending" });
    return authorized();
  });
  await main(["login", "--origin", origin]);
  expect(clock.waits).toEqual([1_000, 7_000, 1_000]);
  expect(polls).toBe(3);
  expect(JSON.parse(readFileSync(join(directory, "credentials.json"), "utf8")).origins[origin].token).toBe(loginToken);
  expect(output.join("")).not.toContain(loginToken);
  expect(output.join("")).not.toContain(loginSecret);
});

test("login retries transport failures without logging secrets", async () => {
  const clock = fastPollingClock();
  let polls = 0;
  fetchSpy = mockFetch(async url => {
    if (String(url).endsWith("/start")) return started();
    if (++polls === 1) throw new TypeError("synthetic network failure");
    return authorized();
  });
  await main(["login", "--origin", origin]);
  expect(clock.waits).toEqual([1_000, 2_000]);
  expect(polls).toBe(2);
  expect(output.join("")).not.toContain(loginToken);
  expect(output.join("")).not.toContain(loginSecret);
});

test("repeated retryable poll failures stop at the flow deadline with capped backoff and request timeouts", async () => {
  const clock = fastPollingClock();
  const pollTimes: number[] = [];
  fetchSpy = mockFetch(async url => {
    if (String(url).endsWith("/start")) return started(120);
    pollTimes.push(clock.now());
    return pollFailure();
  });
  await expect(main(["login", "--origin", origin])).rejects.toMatchObject({ code: "expired" });
  expect(clock.now()).toBe(120_000);
  expect(clock.waits).toEqual([1_000, 2_000, 4_000, 8_000, 16_000, 30_000, 30_000, 29_000]);
  expect(pollTimes.every(time => time < 120_000)).toBe(true);
  expect(pollTimes).toHaveLength(7);
  expect(clock.timeouts.slice(1).every((timeout, i) => timeout <= Math.min(20_000, 120_000 - pollTimes[i]!))).toBe(true);
  expect(existsSync(join(directory, "credentials.json"))).toBe(false);
});

test("an excessive retryAfterMs cannot extend the flow deadline", async () => {
  const clock = fastPollingClock();
  let polls = 0;
  fetchSpy = mockFetch(async url => {
    if (String(url).endsWith("/start")) return started(10);
    polls += 1;
    return pollFailure(1_000_000);
  });
  await expect(main(["login", "--origin", origin])).rejects.toMatchObject({ code: "expired" });
  expect(clock.waits).toEqual([1_000, 9_000]);
  expect(clock.timeouts).toEqual([20_000, 9_000]);
  expect(polls).toBe(1);
});

test("a consumed or unknown code remains terminal and is never polled again", async () => {
  const clock = fastPollingClock();
  let polls = 0;
  fetchSpy = mockFetch(async url => {
    if (String(url).endsWith("/start")) return started();
    polls += 1;
    return Response.json({
      ok: false, version: "soulscrape.api.v1",
      error: { code: "DEVICE_CODE_UNKNOWN", message: "restart login", retryable: false },
    }, { status: 404 });
  });
  await expect(main(["login", "--origin", origin])).rejects.toMatchObject({ code: "DEVICE_CODE_UNKNOWN", retryable: false });
  expect(clock.waits).toEqual([1_000]);
  expect(polls).toBe(1);
  expect(existsSync(join(directory, "credentials.json"))).toBe(false);
});

test("login rejects invalid timing metadata before polling", async () => {
  fastPollingClock();
  const mocked = spyOn(globalThis, "fetch").mockResolvedValue(Response.json({
    ok: true, version: "soulscrape.api.v1", code: "SS-ABCD-EFGH", secret: loginSecret,
    verificationUrl: origin + "/connect", expiresInSec: 900, pollAfterMs: -1,
  }));
  fetchSpy = mocked;
  await expect(main(["login", "--origin", origin])).rejects.toMatchObject({ code: "bad_response" });
  expect(mocked).toHaveBeenCalledTimes(1);
});
