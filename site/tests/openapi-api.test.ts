import { expect, test } from "bun:test";
import { join } from "node:path";

import { GET } from "../app/api/v1/openapi.json/route";
import { soulscrapeOpenApiDocument } from "../lib/openapi";

type JsonRecord = Record<string, unknown>;

function records(value: unknown): JsonRecord[] {
  if (Array.isArray(value)) return value.flatMap(records);
  if (typeof value !== "object" || value === null) return [];
  return [value as JsonRecord, ...Object.values(value).flatMap(records)];
}

function resolvePointer(root: unknown, pointer: string): unknown {
  expect(pointer.startsWith("#/"), pointer).toBe(true);
  return pointer.slice(2).split("/").reduce<unknown>((value, segment) => {
    expect(typeof value, pointer).toBe("object");
    expect(value, pointer).not.toBeNull();
    const key = segment.replaceAll("~1", "/").replaceAll("~0", "~");
    return (value as JsonRecord)[key];
  }, root);
}

function sourceRoutes(): string[] {
  const siteRoot = join(import.meta.dir, "..");
  const glob = new Bun.Glob("app/api/v1/**/route.ts");
  return [...glob.scanSync({ cwd: siteRoot })]
    .map(path => `/${path.replace(/^app\//u, "").replace(/\/route\.ts$/u, "").replaceAll("[username]", "{username}").replaceAll("[handle]", "{handle}")}`)
    .sort();
}

test("serves a stable cacheable OpenAPI document", async () => {
  const response = GET();
  expect(response.status).toBe(200);
  expect(response.headers.get("cache-control")).toBe("public, max-age=300");
  expect(response.headers.get("content-type")).toContain("application/json");
  expect(await response.json()).toEqual(soulscrapeOpenApiDocument);
});

test("describes every connector-facing v1 route and explicitly excludes browser-session authorization", () => {
  const documented = Object.keys(soulscrapeOpenApiDocument.paths).sort();
  const source = sourceRoutes();
  expect(source.filter(path => !documented.includes(path))).toEqual(["/api/v1/device/authorize"]);
  expect(documented.filter(path => !source.includes(path))).toEqual([]);
});

test("gives every operation a unique id, explicit security posture, risk class, and response", () => {
  const operations = Object.values(soulscrapeOpenApiDocument.paths)
    .flatMap(path => Object.values(path))
    .filter((operation): operation is JsonRecord => typeof operation === "object" && operation !== null);
  const ids = operations.map(operation => operation.operationId);
  expect(new Set(ids).size).toBe(ids.length);
  for (const operation of operations) {
    expect(typeof operation.operationId).toBe("string");
    expect(Array.isArray(operation.security)).toBe(true);
    expect(operation["x-soulscrape-risk"]).toMatch(/^R[123]$/u);
    expect(typeof operation.responses).toBe("object");
  }
  for (const operation of operations.filter(operation => operation["x-soulscrape-risk"] !== "R1")) {
    expect(typeof operation["x-soulscrape-side-effect"]).toBe("string");
  }
});

test("embeds the canonical person-index schema with only resolvable local references", () => {
  const document = soulscrapeOpenApiDocument as unknown;
  const schemas = soulscrapeOpenApiDocument.components.schemas as unknown as JsonRecord;
  const personIndex = schemas.PersonIndex as JsonRecord;
  expect(personIndex.$schema).toBeUndefined();
  expect(personIndex.$id).toBeUndefined();
  expect(personIndex.required).toEqual(expect.arrayContaining([
    "schemaVersion",
    "indexId",
    "generatedAt",
    "subject",
    "scope",
    "sources",
    "claims",
    "body",
    "provenance",
  ]));
  const refs = records(document).map(record => record.$ref).filter((value): value is string => typeof value === "string");
  expect(refs.length).toBeGreaterThan(10);
  for (const pointer of refs) expect(resolvePointer(document, pointer), pointer).toBeDefined();
  expect(refs.some(pointer => pointer.startsWith("#/$defs/"))).toBe(false);
});

test("marks every returned credential and polling secret as sensitive", () => {
  const sensitivePatterns = records(soulscrapeOpenApiDocument)
    .filter(record => record.pattern === "^sps_[A-Za-z0-9_-]{48}$" || record.pattern === "^spt_[A-Za-z0-9_-]{48}$");
  expect(sensitivePatterns).toHaveLength(3);
  for (const schema of sensitivePatterns) {
    expect(schema.format).toBe("password");
    expect(schema["x-sensitive"]).toBe(true);
  }
});
