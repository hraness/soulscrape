#!/usr/bin/env -S bun --no-env-file
/** Optional paid discovery. This module never reads files or verifies source pages. */

export const DISCOVERY_ENDPOINT = "https://ai-gateway.vercel.sh/v1/chat/completions";
export const DISCOVERY_DEFAULT_RESULTS = 3;
export const DISCOVERY_MAX_RESULTS = 5;
export const DISCOVERY_SEARCH_TYPE = "instant";
export const DISCOVERY_MAX_TOKENS = 1024;
export const DISCOVERY_TIMEOUT_MS = 60_000;
export const DISCOVERY_MAX_QUERY_BYTES = 2048;
export const DISCOVERY_MAX_MODEL_BYTES = 128;
export const DISCOVERY_MAX_REQUEST_BYTES = 16 * 1024;
export const DISCOVERY_MAX_RESPONSE_BYTES = 256 * 1024;
export const DISCOVERY_MAX_ANSWER_BYTES = 32 * 1024;
export const DISCOVERY_SPEND_NOTICE = "Paid model and Exa usage. One request can perform multiple searches; there is no hard search-spend cap here. Set an AI Gateway API-key budget.";
export const DISCOVERY_HELP = `Usage: bun --no-env-file scripts/discover-public-sources.ts --query "public search text" --model provider/model [--results ${DISCOVERY_DEFAULT_RESULTS}] (--allow-paid | --dry-run)
--results: integer 1–${DISCOVERY_MAX_RESULTS}; default ${DISCOVERY_DEFAULT_RESULTS}. Model is required.
--dry-run: print the request without reading credentials or making a network request.
--allow-paid: explicitly permit one Gateway request using AI_GATEWAY_API_KEY.
Only the explicit public query is sent; no files, conversation context, or .env files are read by this helper.
Use --no-env-file to disable Bun's automatic .env loading.
Limits: query ${DISCOVERY_MAX_QUERY_BYTES} bytes; request ${DISCOVERY_MAX_REQUEST_BYTES} bytes; response ${DISCOVERY_MAX_RESPONSE_BYTES} bytes; answer ${DISCOVERY_MAX_ANSWER_BYTES} bytes; ${DISCOVERY_TIMEOUT_MS / 1000}s; ${DISCOVERY_MAX_TOKENS} output tokens; no retries or redirects.
${DISCOVERY_SPEND_NOTICE}
The answer is untrusted discovery. Verify identity and claims against original public pages before using them.`;

export type DiscoveryOptions = Readonly<{
  query: string;
  model: string;
  results?: number;
  allowPaid?: boolean;
  dryRun?: boolean;
}>;
export type DiscoveryDependencies = Readonly<{
  fetch?: (url: string, init: RequestInit) => Promise<Response>;
  env?: Readonly<Record<string, string | undefined>>;
  /** Allows a caller to cancel early; it cannot extend the fixed deadline. */
  signal?: AbortSignal;
}>;

class DiscoveryError extends Error {}
function fail(message: string): never { throw new DiscoveryError(message); }
function bytes(value: string): number { return Buffer.byteLength(value, "utf8"); }
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function buildDiscoveryRequest(options: DiscoveryOptions) {
  if (typeof options.query !== "string" || !options.query.trim() || bytes(options.query) > DISCOVERY_MAX_QUERY_BYTES || !options.query.isWellFormed() || /[\x00-\x1f\x7f]/u.test(options.query)) {
    fail(`Query must be public, nonempty single-line text of at most ${DISCOVERY_MAX_QUERY_BYTES} UTF-8 bytes.`);
  }
  if (typeof options.model !== "string" || bytes(options.model) > DISCOVERY_MAX_MODEL_BYTES || !/^[a-z0-9][a-z0-9._-]*\/[a-zA-Z0-9][a-zA-Z0-9._:-]*$/u.test(options.model)) {
    fail("Model must be an explicit provider/model identifier.");
  }
  const results = options.results ?? DISCOVERY_DEFAULT_RESULTS;
  if (!Number.isInteger(results) || results < 1 || results > DISCOVERY_MAX_RESULTS) fail(`Results must be an integer from 1 to ${DISCOVERY_MAX_RESULTS}.`);
  if ((options.allowPaid !== undefined && typeof options.allowPaid !== "boolean") || (options.dryRun !== undefined && typeof options.dryRun !== "boolean")) fail("Invalid discovery flags.");
  const request = {
    model: options.model,
    messages: [{ role: "user", content: `Find public source pages relevant to this query. Return concise candidate URLs with titles and why they may be relevant. Do not treat discovery as verified identity or evidence. Query: ${options.query}` }],
    tools: [{ type: "vercel:exa_search", config: { query: options.query, type: DISCOVERY_SEARCH_TYPE, num_results: results } }],
    tool_choice: "required",
    max_tokens: DISCOVERY_MAX_TOKENS,
    stream: false,
  };
  if (bytes(JSON.stringify(request)) > DISCOVERY_MAX_REQUEST_BYTES) fail("Discovery request exceeds its byte limit.");
  return request;
}

/** Project only documented numeric usage/cost and search counts; never return arbitrary metadata. */
function metadata(value: Record<string, unknown>, message: Record<string, unknown>) {
  const usage: Record<string, number> = {};
  const omissions: string[] = [];
  if (value.usage !== undefined && value.usage !== null) {
    if (!record(value.usage)) fail("Malformed usage metadata.");
    for (const name of ["prompt_tokens", "completion_tokens", "total_tokens"] as const) {
      const count = value.usage[name];
      if (count === undefined) continue;
      if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) fail("Malformed usage metadata.");
      usage[name] = count;
    }
  }
  const gateway: Record<string, unknown> = {};
  if (message.provider_metadata !== undefined && message.provider_metadata !== null) {
    if (!record(message.provider_metadata)) fail("Malformed Gateway metadata.");
    const source = message.provider_metadata.gateway;
    if (source !== undefined && source !== null) {
      if (!record(source)) fail("Malformed Gateway metadata.");
      for (const name of ["cost", "marketCost"] as const) {
        const cost = source[name];
        if (cost === undefined) continue;
        if (typeof cost === "number" && Number.isFinite(cost) && cost >= 0) gateway[name] = cost;
        else if (typeof cost === "string" && cost.length <= 64 && /^(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(cost) && Number.isFinite(Number(cost))) gateway[name] = cost;
        else fail("Malformed Gateway cost metadata.");
      }
      if (source.gatewayToolCalls !== undefined) {
        const counts = source.gatewayToolCalls;
        if (typeof counts === "number" && Number.isSafeInteger(counts) && counts >= 0) gateway.gatewayToolCalls = counts;
        // The docs identify this field without specifying its value schema.
        // Preserve bounded numeric counters verbatim without guessing tool names.
        else if (record(counts) && Object.keys(counts).length > 0 && Object.keys(counts).length <= 8 && Object.entries(counts).every(([name, count]) => /^[a-zA-Z0-9_.:/-]{1,80}$/u.test(name) && typeof count === "number" && Number.isSafeInteger(count) && count >= 0)) {
          gateway.gatewayToolCalls = counts;
        } else omissions.push("gatewayToolCalls has an unsupported shape; search counts are unknown and were omitted.");
      }
    }
  }
  return {
    usage, gateway, omissions,
    projection: "Only supplied token totals, cost, marketCost, and supported Exa search counts are retained; other provider metadata is omitted. Missing values are unknown, not zero.",
    searchExecution: gateway.gatewayToolCalls === undefined ? "unverified" : "provider_counts_present_not_independently_verified",
  };
}

async function readResponse(response: Response, signal: AbortSignal): Promise<string> {
  const declared = response.headers.get("content-length");
  if (declared !== null && (!/^\d+$/u.test(declared) || Number(declared) > DISCOVERY_MAX_RESPONSE_BYTES)) fail("Gateway response exceeds its byte limit or has an invalid length.");
  if (!response.body) fail("Gateway returned an empty response.");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener("abort", cancel, { once: true });
  try {
    while (true) {
      if (signal.aborted) fail("Gateway request timed out or was aborted.");
      const part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > DISCOVERY_MAX_RESPONSE_BYTES) fail("Gateway response exceeds its byte limit.");
      chunks.push(part.value);
    }
    try { return new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)); }
    catch { fail("Gateway returned invalid UTF-8."); }
  } finally {
    signal.removeEventListener("abort", cancel);
    cancel();
  }
}

export async function discoverPublicSources(options: DiscoveryOptions, dependencies: DiscoveryDependencies = {}) {
  const request = buildDiscoveryRequest(options);
  if (options.dryRun) return { status: "dry_run", endpoint: DISCOVERY_ENDPOINT, request, spendNotice: DISCOVERY_SPEND_NOTICE };
  if (options.allowPaid !== true) fail("Paid discovery requires --allow-paid. Use --dry-run to inspect the request offline.");
  const apiKey = dependencies.env === undefined ? process.env.AI_GATEWAY_API_KEY : dependencies.env.AI_GATEWAY_API_KEY;
  if (typeof apiKey !== "string" || !/^[\x21-\x7e]{1,512}$/u.test(apiKey)) fail("Set a valid AI_GATEWAY_API_KEY in the process environment; no credential files are read.");
  const controller = new AbortController();
  const abort = () => controller.abort();
  dependencies.signal?.addEventListener("abort", abort, { once: true });
  if (dependencies.signal?.aborted) abort();
  const timer = setTimeout(abort, DISCOVERY_TIMEOUT_MS);
  let rejectOnAbort: (() => void) | undefined;
  const deadline = new Promise<never>((_, reject) => {
    rejectOnAbort = () => reject(new DiscoveryError("Gateway request timed out or was aborted."));
    controller.signal.addEventListener("abort", rejectOnAbort, { once: true });
  });
  try {
    if (controller.signal.aborted) fail("Gateway request timed out or was aborted.");
    return await Promise.race([deadline, (async () => {
      const response = await (dependencies.fetch ?? fetch)(DISCOVERY_ENDPOINT, {
        method: "POST", redirect: "error", signal: controller.signal,
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (response.redirected || (response.status >= 300 && response.status < 400)) fail("Gateway redirects are not allowed.");
      if (!response.ok) fail(`Gateway request failed (HTTP ${response.status}); response body withheld. No retry was made.`);
      const body = await readResponse(response, controller.signal);
      if (body.includes(apiKey)) fail("Gateway response contained credential material; response withheld.");
      let parsed: unknown;
      try { parsed = JSON.parse(body); } catch { fail("Gateway returned malformed JSON."); }
      if (JSON.stringify(parsed).includes(apiKey)) fail("Gateway response contained credential material; response withheld.");
      if (!record(parsed) || !Array.isArray(parsed.choices) || parsed.choices.length !== 1) fail("Gateway returned an unexpected response shape.");
      const choice: unknown = parsed.choices[0];
      if (!record(choice) || choice.finish_reason !== "stop" || !record(choice.message) || choice.message.role !== "assistant" || choice.message.refusal || (Array.isArray(choice.message.tool_calls) && choice.message.tool_calls.length > 0)) fail("Gateway did not return a completed discovery answer.");
      const answer = choice.message.content;
      if (typeof answer !== "string" || !answer.trim() || !answer.isWellFormed()) fail("Gateway returned an invalid discovery answer.");
      if (bytes(answer) > DISCOVERY_MAX_ANSWER_BYTES) fail("Discovery answer exceeds its byte limit; no content was truncated or accepted.");
      return {
        status: "original_pages_must_be_verified", trust: "untrusted_candidate_discovery",
        requestedModel: options.model,
        ...(typeof parsed.id === "string" && /^[a-zA-Z0-9_.:/-]{1,200}$/u.test(parsed.id) ? { responseId: parsed.id } : {}),
        ...(typeof parsed.model === "string" && /^[a-zA-Z0-9_.:/-]{1,200}$/u.test(parsed.model) ? { responseModel: parsed.model } : {}),
        responseIdentity: "Only supplied response id/model values matching the bounded identifier format are retained; missing or unsupported values are unknown.",
        answer, metadata: metadata(parsed, choice.message),
        verification: "Verify each candidate URL, the person's identity, and every claim against original public pages before ingestion or publication. This answer is not raw Exa results or a citation ledger.",
        spendNotice: DISCOVERY_SPEND_NOTICE,
      };
    })()]);
  } catch (error) {
    if (error instanceof DiscoveryError) throw error;
    fail(controller.signal.aborted ? "Gateway request timed out or was aborted." : "Gateway request failed; provider details withheld. No retry was made.");
  } finally {
    clearTimeout(timer);
    dependencies.signal?.removeEventListener("abort", abort);
    if (rejectOnAbort) controller.signal.removeEventListener("abort", rejectOnAbort);
    controller.abort();
  }
}

export function parseDiscoveryArgs(args: readonly string[]): DiscoveryOptions {
  const values = new Map<string, string | true>();
  for (let index = 0; index < args.length; index++) {
    const name = args[index]!;
    if (!["--query", "--model", "--results", "--allow-paid", "--dry-run"].includes(name) || values.has(name)) fail(DISCOVERY_HELP);
    if (name === "--allow-paid" || name === "--dry-run") { values.set(name, true); continue; }
    const value = args[++index];
    if (value === undefined || value.startsWith("--")) fail(DISCOVERY_HELP);
    values.set(name, value);
  }
  if (typeof values.get("--query") !== "string" || typeof values.get("--model") !== "string") fail(DISCOVERY_HELP);
  const rawResults = values.get("--results");
  if (rawResults !== undefined && (typeof rawResults !== "string" || !/^[1-5]$/u.test(rawResults))) fail("Results must be an integer from 1 to 5.");
  const options = {
    query: values.get("--query") as string, model: values.get("--model") as string,
    results: rawResults === undefined ? DISCOVERY_DEFAULT_RESULTS : Number(rawResults),
    allowPaid: values.has("--allow-paid"), dryRun: values.has("--dry-run"),
  };
  buildDiscoveryRequest(options);
  return options;
}

export async function main(args = process.argv.slice(2), dependencies: DiscoveryDependencies = {}): Promise<void> {
  if (args.length === 1 && args[0] === "--help") { process.stdout.write(DISCOVERY_HELP + "\n"); return; }
  const result = await discoverPublicSources(parseDiscoveryArgs(args), dependencies);
  process.stdout.write(JSON.stringify(result) + "\n");
}

if (import.meta.main) {
  try { await main(); } catch (error) {
    process.stderr.write(`error: ${error instanceof DiscoveryError ? error.message : "Discovery failed; details withheld."}\n`);
    process.exitCode = 1;
  }
}
