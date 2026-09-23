import { afterEach, beforeEach, expect, spyOn, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { ConvexError } from "convex/values";

import { GET, PUT } from "../app/api/v1/people/route";
import { DELETE } from "../app/api/v1/people/[handle]/route";
import { publish, withdraw, PublishError } from "../convex/people";
import { MAX_PROFILES_PER_ACCOUNT } from "../convex/_lib";

const originalConvexUrl = process.env.CONVEX_URL;
const originalPublicConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const token = `spt_${"a".repeat(48)}`;
const credential = { _id: "credential", accountId: "account", username: "example_editor" };
const packet: unknown = JSON.parse(readFileSync(join(import.meta.dir, "../../examples/people/eugene-tssui/person-index.json"), "utf8"));
let providerSpy: { mockRestore(): void } | undefined;

beforeEach(() => {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
});

afterEach(() => {
  providerSpy?.mockRestore();
  providerSpy = undefined;
  if (originalConvexUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalConvexUrl;
  if (originalPublicConvexUrl === undefined) delete process.env.NEXT_PUBLIC_CONVEX_URL;
  else process.env.NEXT_PUBLIC_CONVEX_URL = originalPublicConvexUrl;
});

function request(method: string, body?: unknown, authorized = true): Request {
  return new Request("https://soulscrape.com/api/v1/people/example", {
    method,
    headers: {
      ...(authorized ? { authorization: `Bearer ${token}` } : {}),
      ...(body === undefined ? {} : { "content-type": "application/json" }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

function serializedError(code: ConstructorParameters<typeof PublishError>[0]): ConvexError<{ code: string }> {
  return new ConvexError(JSON.parse(JSON.stringify(new PublishError(code).data)) as { code: string });
}

function failMutation(error: unknown) {
  const mutation = spyOn(ConvexHttpClient.prototype, "mutation").mockRejectedValue(error);
  providerSpy = mutation;
  return mutation;
}

async function expectApiError(response: Response, status: number, code: string, retryable = false) {
  expect(response.status).toBe(status);
  expect(response.headers.get("cache-control")).toBe("no-store");
  const body = await response.json();
  expect(body).toMatchObject({ ok: false, version: "soulscrape.api.v1", error: { code, retryable } });
  return body as { error: { message: string } };
}

for (const [code, status] of [["UNAUTHORIZED", 401], ["PACKET_INVALID", 400], ["LIMIT_EXCEEDED", 409]] as const) {
  test(`publish maps serialized ${code} to ${status}`, async () => {
    failMutation(serializedError(code));
    await expectApiError(await PUT(request("PUT", { packet })), status, code);
  });
}

for (const [code, status] of [["UNAUTHORIZED", 401], ["BAD_REQUEST", 400], ["NOT_FOUND", 404]] as const) {
  test(`withdraw maps serialized ${code} to ${status}`, async () => {
    failMutation(serializedError(code));
    await expectApiError(await DELETE(request("DELETE"), { params: Promise.resolve({ handle: "example" }) }), status, code);
  });
}

for (const operation of ["publish", "withdraw"] as const) {
  test(`${operation} conceals unexpected and malformed backend errors without promising a safe retry`, async () => {
    const errors = [
      new Error("UNAUTHORIZED NOT_FOUND PACKET_INVALID internal secret=fixture-secret"),
      new ConvexError({ code: "UNKNOWN", message: "fixture-secret" }),
      new ConvexError("UNAUTHORIZED fixture-secret"),
      new ConvexError({ code: ["UNAUTHORIZED"] }),
      { data: { code: "UNAUTHORIZED" }, message: "fixture-secret" },
    ];
    const mutation = failMutation(errors[0]);
    for (const error of errors) {
      mutation.mockRejectedValue(error);
      const response = operation === "publish"
        ? await PUT(request("PUT", { packet }))
        : await DELETE(request("DELETE"), { params: Promise.resolve({ handle: "example" }) });
      const body = await expectApiError(response, 500, "INTERNAL_ERROR");
      expect(body.error.message).not.toContain("fixture-secret");
      expect(body.error.message).toContain("before retrying");
    }
  });
}

test("publish and withdrawal reject missing bearer credentials before provider calls", async () => {
  const mutation = failMutation(new Error("must not run"));
  await expectApiError(await PUT(request("PUT", { packet }, false)), 401, "UNAUTHORIZED");
  await expectApiError(await DELETE(request("DELETE", undefined, false), { params: Promise.resolve({ handle: "example" }) }), 401, "UNAUTHORIZED");
  expect(mutation).not.toHaveBeenCalled();
});

test("publish and withdrawal preserve successful result contracts", async () => {
  const mutation = spyOn(ConvexHttpClient.prototype, "mutation").mockResolvedValue({
    username: "example_editor", handle: "example", packetDigest: "a".repeat(64), revision: 2, changed: false,
  });
  providerSpy = mutation;
  const published = await PUT(request("PUT", { packet }));
  expect(published.status).toBe(200);
  expect(await published.json()).toMatchObject({ ok: true, changed: false, revision: 2, url: "https://soulscrape.com/example_editor/example" });
  mutation.mockResolvedValue({ ok: true, handle: "example" });
  const withdrawn = await DELETE(request("DELETE"), { params: Promise.resolve({ handle: "example" }) });
  expect(withdrawn.status).toBe(200);
  expect(await withdrawn.json()).toMatchObject({ ok: true, withdrawn: true, handle: "example" });
});

test("member listing separates invalid credentials from sanitized provider failures", async () => {
  const query = spyOn(ConvexHttpClient.prototype, "query").mockResolvedValue(null);
  providerSpy = query;
  await expectApiError(await GET(request("GET")), 401, "UNAUTHORIZED");
  query.mockRejectedValue(new Error("database fixture-secret"));
  const body = await expectApiError(await GET(request("GET")), 500, "INTERNAL_ERROR", true);
  expect(body.error.message).not.toContain("fixture-secret");
});

async function mutationError(fn: unknown, args: Record<string, unknown>, collectedRows: unknown[][]): Promise<ConvexError<{ code: string }>> {
  let cursor = 0;
  const chain = {
    withIndex: () => chain,
    filter: () => chain,
    first: async () => {
      if (cursor >= collectedRows.length) throw new Error("unexpected provider query");
      return collectedRows[cursor++]![0] ?? null;
    },
  };
  const db = { query: () => chain, patch: async () => undefined };
  const handler = (fn as { _handler: (ctx: { db: typeof db }, args: Record<string, unknown>) => Promise<unknown> })._handler;
  try {
    await handler({ db }, args);
  } catch (error) {
    expect(error).toBeInstanceOf(ConvexError);
    expect(cursor).toBe(collectedRows.length);
    return error as ConvexError<{ code: string }>;
  }
  throw new Error("expected mutation rejection");
}

test("backend publishing failures carry serializable allowlisted codes, never validation input", async () => {
  const cases = [
    { args: { token: "bad", packet }, rows: [], code: "UNAUTHORIZED" },
    { args: { token, packet }, rows: [[]], code: "UNAUTHORIZED" },
    { args: { token, packet: { secret: "fixture-secret" } }, rows: [[credential]], code: "PACKET_INVALID" },
    { args: { token, packet }, rows: [[credential], [], [{ ready: true }], [{ retainedProfiles: MAX_PROFILES_PER_ACCOUNT, packetBytes: 0 }]], code: "LIMIT_EXCEEDED" },
  ];
  for (const item of cases) {
    const error = await mutationError(publish, item.args, item.rows);
    expect(JSON.parse(JSON.stringify(error.data))).toEqual({ code: item.code });
    expect(error.message).not.toContain("fixture-secret");
  }
});

test("backend withdrawal distinguishes bad token, revoked token, invalid handle, and absent profile", async () => {
  const cases = [
    { args: { token: "bad", handle: "example" }, rows: [], code: "UNAUTHORIZED" },
    { args: { token, handle: "example" }, rows: [[{ ...credential, revokedAtMs: 1 }]], code: "UNAUTHORIZED" },
    { args: { token, handle: "INVALID HANDLE" }, rows: [[credential]], code: "BAD_REQUEST" },
    { args: { token, handle: "example" }, rows: [[credential], []], code: "NOT_FOUND" },
  ];
  for (const item of cases) {
    const error = await mutationError(withdraw, item.args, item.rows);
    expect(JSON.parse(JSON.stringify(error.data))).toEqual({ code: item.code });
  }
});
