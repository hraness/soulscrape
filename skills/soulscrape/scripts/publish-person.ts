#!/usr/bin/env bun
/**
 * Soulscrape publishing CLI.
 *
 *   bun scripts/publish-person.ts login [--origin <url>]
 *   bun scripts/publish-person.ts whoami
 *   bun scripts/publish-person.ts publish <person-index.json>
 *   bun scripts/publish-person.ts list
 *   bun scripts/publish-person.ts withdraw <handle>
 *   bun scripts/publish-person.ts logout
 *
 * `login` runs a device flow: the site shows a short code, the signed-in
 * browser approves it at /connect, and the CLI polls until it receives a
 * publish credential. Credentials live in a 0600 file under the config dir
 * ($SOULSCRAPE_CONFIG_HOME, then $XDG_CONFIG_HOME/soulscrape, then
 * ~/.config/soulscrape). Set SOULSCRAPE_API_TOKEN to skip login entirely.
 */

import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { isAbsolute, join } from "node:path";

import { PacketValidationError, parsePersonIndex } from "./person-index.ts";
import { strictJsonParse } from "./source-packet.ts";
import { validatePersonIndexFile } from "./validate-person-index.ts";

const DEFAULT_ORIGIN = "https://soulscrape.com";
const API_VERSION = "soulscrape.api.v1";
const MAX_RESPONSE_BYTES = 8 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_POLL_BACKOFF_MS = 30_000;

class ApiError extends Error {
  override readonly name = "ApiError";
  constructor(
    readonly code: string,
    message: string,
    readonly retryable: boolean,
    readonly status: number,
    readonly retryAfterMs?: number,
  ) {
    super(message);
  }
}

function parseOrigin(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new ApiError("bad_origin", `invalid origin: ${raw}`, false, 0);
  }
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !(local && url.protocol === "http:")) {
    throw new ApiError("bad_origin", "origin must be https (http only for localhost)", false, 0);
  }
  if (url.username !== "" || url.password !== "" || url.search !== "" || url.hash !== "") {
    throw new ApiError("bad_origin", "origin must not carry credentials or query", false, 0);
  }
  url.pathname = url.pathname.replace(/\/+$/u, "");
  return url.toString().replace(/\/+$/u, "");
}

function configDirectory(): string {
  const explicit = process.env.SOULSCRAPE_CONFIG_HOME;
  if (explicit !== undefined && explicit !== "") {
    if (!isAbsolute(explicit)) {
      throw new ApiError("bad_config", "SOULSCRAPE_CONFIG_HOME must be absolute", false, 0);
    }
    return explicit;
  }
  const xdg = process.env.XDG_CONFIG_HOME;
  const base = xdg !== undefined && xdg !== "" && isAbsolute(xdg)
    ? xdg
    : join(homedir(), ".config");
  return join(base, "soulscrape");
}

function credentialsPath(): string {
  return join(configDirectory(), "credentials.json");
}

type StoredCredentials = Readonly<{
  version: 1;
  origins: Readonly<Record<string, Readonly<{
    token: string;
    username: string;
    issuedAt: string;
  }>>>;
}>;

function readCredentials(): StoredCredentials {
  const path = credentialsPath();
  if (!existsSync(path)) return { version: 1, origins: {} };
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (
    parsed === null
    || typeof parsed !== "object"
    || (parsed as Record<string, unknown>).version !== 1
    || typeof (parsed as Record<string, unknown>).origins !== "object"
  ) {
    throw new ApiError("bad_config", `cannot parse ${path}`, false, 0);
  }
  return parsed as StoredCredentials;
}

function writeCredentials(credentials: StoredCredentials): void {
  const directory = configDirectory();
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const path = credentialsPath();
  writeFileSync(path, `${JSON.stringify(credentials, null, 2)}\n`, { mode: 0o600 });
  chmodSync(path, 0o600);
}

function storedToken(origin: string): string | null {
  const env = process.env.SOULSCRAPE_API_TOKEN;
  if (env !== undefined && env !== "") return env;
  return readCredentials().origins[origin]?.token ?? null;
}

async function request(
  origin: string,
  method: string,
  path: string,
  body: unknown,
  token: string | null,
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(`${origin}${path}`, {
      method,
      headers: {
        accept: "application/json",
        ...(body === undefined ? {} : { "content-type": "application/json" }),
        ...(token === null ? {} : { authorization: `Bearer ${token}` }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      signal: AbortSignal.timeout(Math.min(REQUEST_TIMEOUT_MS, Math.max(1, Math.floor(timeoutMs)))),
    });
  } catch {
    throw new ApiError("NETWORK_FAILED", "could not reach the server; try again", true, 0);
  }
  const length = Number(response.headers.get("content-length") ?? "0");
  if (length > MAX_RESPONSE_BYTES) {
    throw new ApiError("oversized_response", "the server returned an oversized response", true, response.status);
  }
  let text: string;
  try {
    text = await response.text();
  } catch {
    throw new ApiError("NETWORK_FAILED", "could not read the server response; try again", true, response.status);
  }
  if (text.length > MAX_RESPONSE_BYTES) {
    throw new ApiError("oversized_response", "the server returned an oversized response", true, response.status);
  }
  let envelope: Record<string, unknown>;
  try {
    envelope = JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new ApiError("bad_response", `HTTP ${response.status}: non-JSON response`, true, response.status);
  }
  if (envelope.version !== API_VERSION || typeof envelope.ok !== "boolean") {
    throw new ApiError("bad_response", `HTTP ${response.status}: unexpected response schema`, true, response.status);
  }
  if (!response.ok || envelope.ok !== true) {
    const error = isRecord(envelope.error) ? envelope.error : {};
    throw new ApiError(
      typeof error.code === "string" ? error.code : "unknown",
      typeof error.message === "string" ? error.message : `HTTP ${response.status}`,
      error.retryable === true,
      response.status,
      typeof error.retryAfterMs === "number" && Number.isSafeInteger(error.retryAfterMs) && error.retryAfterMs >= 0
        ? error.retryAfterMs : undefined,
    );
  }
  return envelope;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function login(origin: string, deviceName: string): Promise<void> {
  const started = await request(origin, "POST", "/api/v1/device/start", { deviceName }, null);
  if (!isRecord(started) || typeof started.code !== "string" || typeof started.secret !== "string"
    || typeof started.verificationUrl !== "string" || typeof started.expiresInSec !== "number"
    || typeof started.pollAfterMs !== "number"
    || !Number.isSafeInteger(started.expiresInSec) || started.expiresInSec <= 0
    || !Number.isSafeInteger(started.pollAfterMs) || started.pollAfterMs <= 0) {
    throw new ApiError("bad_response", "unexpected device start response", true, 0);
  }
  process.stdout.write(
    `Sign in to approve this device:\n\n  ${started.verificationUrl}\n\n`
    + `Code: ${started.code}\n\nWaiting for approval…\n`,
  );
  const deadline = Date.now() + Math.min(started.expiresInSec, 900) * 1_000;
  const pollIntervalMs = Math.max(1_000, Math.min(started.pollAfterMs, 10_000));
  let waitMs = pollIntervalMs;
  let consecutiveFailures = 0;
  while (Date.now() < deadline) {
    await sleep(Math.min(waitMs, deadline - Date.now()));
    if (Date.now() >= deadline) break;
    let polled: unknown;
    try {
      polled = await request(origin, "POST", "/api/v1/device/poll", { secret: started.secret }, null, deadline - Date.now());
    } catch (error) {
      if (error instanceof ApiError && error.code === "DEVICE_CODE_EXPIRED") {
        throw new ApiError("expired", "the sign-in code expired", true, 410);
      }
      if (error instanceof ApiError && error.retryable) {
        consecutiveFailures += 1;
        waitMs = Math.min(MAX_POLL_BACKOFF_MS, Math.max(
          pollIntervalMs * 2 ** Math.min(consecutiveFailures, 5),
          error.retryAfterMs ?? 0,
        ));
        continue;
      }
      throw error;
    }
    consecutiveFailures = 0;
    waitMs = pollIntervalMs;
    if (!isRecord(polled) || typeof polled.status !== "string") {
      throw new ApiError("bad_response", "unexpected device poll response", true, 0);
    }
    if (polled.status === "pending") continue;
    if (polled.status === "authorized" && typeof polled.token === "string" && typeof polled.username === "string") {
      const credentials = readCredentials();
      writeCredentials({
        version: 1,
        origins: {
          ...credentials.origins,
          [origin]: {
            token: polled.token,
            username: polled.username,
            issuedAt: new Date().toISOString(),
          },
        },
      });
      process.stdout.write(`Signed in as ${polled.username}. Credential saved to ${credentialsPath()}.\n`);
      return;
    }
    if (polled.status === "denied") {
      throw new ApiError("denied", "the request was denied", false, 0);
    }
    if (polled.status === "expired") {
      throw new ApiError("expired", "the sign-in code expired", true, 0);
    }
    throw new ApiError("bad_response", `unknown device status ${polled.status}`, true, 0);
  }
  throw new ApiError("expired", "the sign-in code expired", true, 0);
}

async function whoami(origin: string): Promise<void> {
  const token = storedToken(origin);
  if (token === null) throw new ApiError("signed_out", "not signed in — run `login` first", false, 401);
  const data = await request(origin, "GET", "/api/v1/auth", undefined, token);
  if (!isRecord(data) || typeof data.username !== "string") {
    throw new ApiError("bad_response", "unexpected auth response", true, 0);
  }
  process.stdout.write(`${JSON.stringify({ username: data.username, origin })}\n`);
}

async function publish(origin: string, path: string): Promise<void> {
  const receipt = validatePersonIndexFile(path);
  const packet = parsePersonIndex(strictJsonParse(readFileSync(path)));
  const token = storedToken(origin);
  if (token === null) throw new ApiError("signed_out", "not signed in — run `login` first", false, 401);
  const data = await request(origin, "PUT", "/api/v1/people", packet, token);
  if (!isRecord(data) || typeof data.url !== "string" || typeof data.handle !== "string") {
    throw new ApiError("bad_response", "unexpected publish response", true, 0);
  }
  process.stdout.write(
    `${JSON.stringify({
      url: data.url,
      handle: data.handle,
      revision: data.revision,
      packetDigest: receipt.packetDigest,
      published: true,
    })}\n`,
  );
}

async function list(origin: string): Promise<void> {
  const token = storedToken(origin);
  if (token === null) throw new ApiError("signed_out", "not signed in — run `login` first", false, 401);
  const data = await request(origin, "GET", "/api/v1/people", undefined, token);
  if (!isRecord(data) || !Array.isArray(data.people)) {
    throw new ApiError("bad_response", "unexpected list response", true, 0);
  }
  process.stdout.write(`${JSON.stringify(data.people)}\n`);
}

async function withdraw(origin: string, handle: string): Promise<void> {
  const token = storedToken(origin);
  if (token === null) throw new ApiError("signed_out", "not signed in — run `login` first", false, 401);
  const data = await request(origin, "DELETE", `/api/v1/people/${encodeURIComponent(handle)}`, undefined, token);
  if (!isRecord(data) || data.withdrawn !== true) {
    throw new ApiError("bad_response", "unexpected withdraw response", true, 0);
  }
  process.stdout.write(`${JSON.stringify({ handle, withdrawn: true })}\n`);
}

async function logout(origin: string): Promise<void> {
  const credentials = readCredentials();
  const stored = credentials.origins[origin]?.token;
  const environment = process.env.SOULSCRAPE_API_TOKEN;
  const tokens = new Set([stored, environment].filter((token): token is string => typeof token === "string" && token !== ""));
  // Keep the local credential until every applicable token has been revoked.
  // Retrying after a partial success is safe because server revocation is idempotent.
  for (const token of tokens) {
    const result = await request(origin, "DELETE", "/api/v1/auth", undefined, token);
    if (!isRecord(result) || result.revoked !== true) {
      throw new ApiError("bad_response", "the server did not confirm credential revocation; retry logout", true, 0);
    }
  }
  if (stored !== undefined) {
    const origins = { ...credentials.origins };
    delete origins[origin];
    writeCredentials({ version: 1, origins });
  }
  process.stdout.write(`${JSON.stringify({ origin, signedOut: true })}\n`);
}

function usage(): never {
  process.stderr.write(
    "usage: bun scripts/publish-person.ts <login|whoami|publish|list|withdraw|logout> [args] [--origin <url>]\n",
  );
  process.exit(2);
}

export async function main(argv: readonly string[]): Promise<void> {
  const args = [...argv];
  let origin = process.env.SOULSCRAPE_ORIGIN ?? DEFAULT_ORIGIN;
  const originIndex = args.indexOf("--origin");
  if (originIndex !== -1) {
    const value = args[originIndex + 1];
    if (value === undefined) usage();
    origin = value;
    args.splice(originIndex, 2);
  }
  origin = parseOrigin(origin);
  const [command, ...rest] = args;
  switch (command) {
    case "login": {
      if (rest.length > 1) usage();
      await login(origin, rest[0] ?? "soulscrape-cli");
      return;
    }
    case "whoami": {
      if (rest.length !== 0) usage();
      await whoami(origin);
      return;
    }
    case "publish": {
      if (rest.length !== 1 || !isAbsolute(rest[0]!)) usage();
      await publish(origin, rest[0]!);
      return;
    }
    case "list": {
      if (rest.length !== 0) usage();
      await list(origin);
      return;
    }
    case "withdraw": {
      if (rest.length !== 1) usage();
      await withdraw(origin, rest[0]!);
      return;
    }
    case "logout": {
      if (rest.length !== 0) usage();
      await logout(origin);
      return;
    }
    default:
      usage();
  }
}

if (import.meta.main) {
  main(Bun.argv.slice(2)).catch((error) => {
    if (error instanceof ApiError || error instanceof PacketValidationError) {
      process.stderr.write(`error: ${error.message}\n`);
    } else {
      process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    }
    process.exitCode = 1;
  });
}
