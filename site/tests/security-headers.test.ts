import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { contentSecurityPolicy, securityHeaders } from "../lib/security-headers";

test("sends the baseline security headers on every response", () => {
  const keys = securityHeaders({}).map(header => header.key);
  expect(keys).toEqual(expect.arrayContaining([
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Strict-Transport-Security",
  ]));
});

test("forbids framing, plugins, and foreign base URIs", () => {
  const csp = contentSecurityPolicy({});
  for (const directive of ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'", "default-src 'self'"]) {
    expect(csp).toContain(directive);
  }
  expect(csp).not.toContain("unsafe-eval");
  expect(contentSecurityPolicy({ NODE_ENV: "development" })).toContain("unsafe-eval");
});

test("publishes a security.txt with a reporting route and expiry", () => {
  const text = readFileSync(new URL("../public/.well-known/security.txt", import.meta.url), "utf8");
  expect(text).toContain("Contact:");
  const expires = /^Expires: (.+)$/mu.exec(text)?.[1];
  expect(expires).toBeDefined();
  expect(Date.parse(expires ?? "")).toBeGreaterThan(Date.now());
});
