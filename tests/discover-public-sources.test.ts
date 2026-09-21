import { describe, expect, test } from "bun:test";
import {
  DISCOVERY_DEFAULT_RESULTS, DISCOVERY_ENDPOINT, DISCOVERY_HELP, DISCOVERY_MAX_ANSWER_BYTES,
  DISCOVERY_MAX_QUERY_BYTES, DISCOVERY_MAX_RESPONSE_BYTES, DISCOVERY_MAX_TOKENS,
  DISCOVERY_TIMEOUT_MS, buildDiscoveryRequest, discoverPublicSources, parseDiscoveryArgs,
  type DiscoveryDependencies, type DiscoveryOptions,
} from "../skills/soulscrape/scripts/discover-public-sources.ts";

const KEY = "synthetic_gateway_secret_do_not_print";
const options = { query: "Ada Lovelace public writings", model: "openai/example-model", allowPaid: true };
const answer = "Candidate: https://example.test/ada — public writings. Identity needs verification.";
function completion(content: unknown = answer) {
  return { choices: [{ finish_reason: "stop", message: { role: "assistant", content } }] };
}
function response(value: unknown = completion()) { return Response.json(value); }
function fake(run: NonNullable<DiscoveryDependencies["fetch"]>) { return { env: { AI_GATEWAY_API_KEY: KEY }, fetch: run }; }
async function rejected(dependencies: DiscoveryDependencies, pattern: RegExp) {
  try { await discoverPublicSources(options, dependencies); throw new Error("Expected rejection"); }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    expect(message).toMatch(pattern);
    expect(message).not.toContain(KEY);
    expect(message).not.toContain("private upstream payload");
  }
}

describe("opt-in Gateway discovery boundary", () => {
  test("dry run validates and builds without reading credentials or fetching", async () => {
    const env = new Proxy({}, { get() { throw new Error("Credential read"); } });
    const result = await discoverPublicSources({ ...options, allowPaid: false, dryRun: true }, {
      env, fetch: async () => { throw new Error("Network call"); },
    });
    expect(result).toMatchObject({ status: "dry_run", endpoint: DISCOVERY_ENDPOINT, request: { model: options.model } });
    expect(JSON.stringify(result)).not.toContain(KEY);
  });

  test("invalid options and absent paid consent cause no credential or network I/O", async () => {
    const env = new Proxy({}, { get() { throw new Error("Unexpected credential read"); } });
    let calls = 0;
    const dependencies = { env, fetch: async () => { calls++; return response(); } };
    for (const patch of [
      { query: "" }, { query: " " }, { query: "x\ny" }, { query: "\ud800" },
      { query: "界".repeat(Math.ceil(DISCOVERY_MAX_QUERY_BYTES / 3)) },
      { model: "invalid" }, { model: "https://untrusted.test/model" }, { model: "p/" + "x".repeat(128) },
      { results: 0 }, { results: 6 }, { results: 1.5 }, { results: NaN },
      { allowPaid: false }, { allowPaid: "true" }, { dryRun: "true" },
    ]) {
      await expect(discoverPublicSources({ ...options, ...patch } as DiscoveryOptions, dependencies)).rejects.not.toThrow("Unexpected credential read");
    }
    expect(calls).toBe(0);
    expect(buildDiscoveryRequest({ ...options, query: "x".repeat(DISCOVERY_MAX_QUERY_BYTES) })).toBeDefined();
  });

  test("missing, malformed, or oversized keys never reach fetch", async () => {
    let calls = 0;
    for (const key of [undefined, "", "bad\nkey", "bad key", "界", "x".repeat(513)]) {
      await expect(discoverPublicSources(options, { env: { AI_GATEWAY_API_KEY: key }, fetch: async () => { calls++; return response(); } })).rejects.toThrow("AI_GATEWAY_API_KEY");
    }
    expect(calls).toBe(0);
  });

  test("uses fixed endpoint, static query, numeric limit, paid key, no redirects, and one request", async () => {
    let calls = 0;
    const result = await discoverPublicSources(options, fake(async (url, init) => {
      calls++;
      expect(url).toBe(DISCOVERY_ENDPOINT);
      expect(init.method).toBe("POST");
      expect(init.redirect).toBe("error");
      expect(init.signal).toBeInstanceOf(AbortSignal);
      expect(new Headers(init.headers).get("authorization")).toBe(`Bearer ${KEY}`);
      expect(JSON.parse(init.body as string)).toEqual({
        model: options.model,
        messages: [{ role: "user", content: expect.stringContaining(options.query) }],
        tools: [{ type: "vercel:exa_search", config: { query: options.query, type: "instant", num_results: DISCOVERY_DEFAULT_RESULTS } }],
        tool_choice: "required", max_tokens: DISCOVERY_MAX_TOKENS, stream: false,
      });
      return response();
    }));
    expect(calls).toBe(1);
    expect(result).toMatchObject({ status: "original_pages_must_be_verified", trust: "untrusted_candidate_discovery", answer, metadata: { searchExecution: "unverified" } });
    expect(JSON.stringify(result)).not.toContain(KEY);
    expect(DISCOVERY_TIMEOUT_MS).toBe(60_000);
  });

  test("retains allowlisted actual evidence, preserves complete answer, and explains projection", async () => {
    const result = await discoverPublicSources(options, fake(async () => response({
      id: "chatcmpl_synthetic_id", model: "openai/actual-model",
      usage: { prompt_tokens: 81, completion_tokens: 20, total_tokens: 101, unsupported: "private upstream payload" },
      choices: [{ finish_reason: "stop", message: { role: "assistant", content: answer,
        provider_metadata: { gateway: { cost: "0.0072", marketCost: 0.0072, gatewayToolCalls: { exa_search: 2 }, routing: "private upstream payload" } },
      } }],
    })));
    expect(result).toMatchObject({ answer, responseId: "chatcmpl_synthetic_id", responseModel: "openai/actual-model", metadata: {
      usage: { prompt_tokens: 81, completion_tokens: 20, total_tokens: 101 },
      gateway: { cost: "0.0072", marketCost: 0.0072, gatewayToolCalls: { exa_search: 2 } },
      projection: expect.stringContaining("omitted"), searchExecution: "provider_counts_present_not_independently_verified",
    } });
    expect(JSON.stringify(result)).not.toContain("private upstream payload");
  });

  test("rejects malformed cost evidence and explicitly marks unknown search-count shapes", async () => {
    for (const gateway of [{ cost: "not money" }, { cost: -1 }]) {
      await rejected(fake(async () => response({ choices: [{ finish_reason: "stop", message: { role: "assistant", content: answer, provider_metadata: { gateway } } }] })), /metadata/iu);
    }
    // Synthetic shapes: official docs specify the metadata path, not its schema.
    for (const gatewayToolCalls of [{ exa_search: -1 }, [{ count: 1 }]]) {
      const result = await discoverPublicSources(options, fake(async () => response({ choices: [{ finish_reason: "stop", message: { role: "assistant", content: answer, provider_metadata: { gateway: { gatewayToolCalls } } } }] })));
      expect(result).toMatchObject({ answer, metadata: { gateway: {}, searchExecution: "unverified", omissions: [expect.stringContaining("unsupported shape")] } });
    }
    await rejected(fake(async () => response({ ...completion(), usage: { total_tokens: "12" } })), /metadata/iu);
  });

  test("rejects redirects and HTTP errors once without exposing bodies", async () => {
    for (const status of [301, 302, 307, 400, 401, 402, 429, 500]) {
      let calls = 0;
      await rejected(fake(async () => { calls++; return new Response(`${KEY} private upstream payload`, { status }); }), /redirect|HTTP/iu);
      expect(calls).toBe(1);
    }
    const redirected = response();
    Object.defineProperty(redirected, "redirected", { value: true });
    await rejected(fake(async () => redirected), /redirect/iu);
    await rejected(fake(async () => { throw new Error(`${KEY} private upstream payload`); }), /details withheld/iu);
  });

  test("aborting a stalled fetch or body returns promptly and sanitizes errors", async () => {
    for (const fetch of [
      async () => await new Promise<Response>(() => {}),
      async () => new Response(new ReadableStream<Uint8Array>({ start() {} })),
    ]) {
      const controller = new AbortController();
      const result = rejected({ ...fake(fetch), signal: controller.signal }, /timed out or was aborted/u);
      setTimeout(() => controller.abort(new Error(KEY)), 5);
      await result;
    }
  });

  test("rejects oversized announced or streamed bodies and oversized model answers", async () => {
    await rejected(fake(async () => new Response("{}", { headers: { "content-length": String(DISCOVERY_MAX_RESPONSE_BYTES + 1) } })), /byte limit/u);
    let cancelled = false;
    await rejected(fake(async () => new Response(new ReadableStream<Uint8Array>({
      start(controller) { controller.enqueue(new Uint8Array(DISCOVERY_MAX_RESPONSE_BYTES)); controller.enqueue(new Uint8Array(1)); },
      cancel() { cancelled = true; },
    }))), /byte limit/u);
    expect(cancelled).toBe(true);
    await rejected(fake(async () => response(completion("界".repeat(Math.ceil(DISCOVERY_MAX_ANSWER_BYTES / 3))))), /answer exceeds/u);
  });

  test("rejects malformed, incomplete, empty, invalid UTF-8 and credential-echo responses", async () => {
    for (const value of [null, [], {}, completion(null), completion(""), { choices: [{ ...completion().choices[0], finish_reason: "length" }] }, { choices: [{ finish_reason: "tool_calls", message: { role: "assistant", content: answer } }] }]) {
      await rejected(fake(async () => response(value)), /response|answer/iu);
    }
    await rejected(fake(async () => new Response("{not-json")), /malformed JSON/u);
    await rejected(fake(async () => new Response(new Uint8Array([0xff]))), /UTF-8/u);
    await rejected(fake(async () => response(completion(KEY))), /credential material/u);
    await rejected(fake(async () => new Response(JSON.stringify(completion(KEY)).replace(KEY, [...KEY].map(character => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`).join("")))), /credential material/u);
  });

  test("CLI parsing rejects ambiguous flags and exposes defaults and cost limits in help", () => {
    const base = ["--query", "public query", "--model", "openai/example-model"];
    expect(parseDiscoveryArgs([...base, "--dry-run"])).toEqual({ query: "public query", model: "openai/example-model", results: 3, dryRun: true, allowPaid: false });
    for (const args of [[], ["--query", "x"], [...base, "--input", "secret.txt"], [...base, "--query", "again"], [...base, "--allow-paid", "--allow-paid"], [...base, "--results", "1.0"], [...base, "--results", "6"], [...base, "--results"]]) {
      expect(() => parseDiscoveryArgs(args)).toThrow();
    }
    expect(DISCOVERY_HELP).toContain("--no-env-file");
    expect(DISCOVERY_HELP).toContain("no hard search-spend cap");
    expect(DISCOVERY_HELP).toContain(`default ${DISCOVERY_DEFAULT_RESULTS}`);
  });
});
