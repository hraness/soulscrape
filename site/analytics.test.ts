import { pageNotFoundProperties } from "@hraness/posthog/event";
import { ctaClickedProperties } from "@hraness/posthog/event";
import { expect, test } from "bun:test";
import { classifyAnalyticsRoute } from "@hraness/posthog";
import { checkPostHogContract, runPostHogHarness } from "@hraness/posthog/testing";
import { analyticsSite, analyticsCtaForUrl } from "./analytics-site";

test("real SDK enforces the shared privacy and event contract", () => {
  expect(checkPostHogContract({ site: analyticsSite, publicPath: "/", sensitivePath: "/docs/auth", customEvents: [
    { event: "cta clicked", properties: { cta: "get_started", placement: "nav" } },
    { event: "outbound link opened", properties: { target_host: "github.com", placement: "nav" } },
  ] }).violations).toEqual([]);
});
test("preview hosts never classify", () => {
  expect(classifyAnalyticsRoute(analyticsSite, "https://preview.vercel.app/")).toBeNull();
});

test("private routes emit no pageviews, actions, or exceptions through the real SDK", () => {
  const paths = ["/ben/private-person", "/connect", "/device/start", "/%63onnect", "/docs%2F..%2Fben/private-person"];
  const result = runPostHogHarness({ site: analyticsSite, scenarios: paths.map((path) => ({ href: `https://${analyticsSite.canonicalDomain}${path}?code=private-token`, captures: [{ event: "$pageview" }, { event: "cta clicked", properties: { cta: "get_started", placement: "nav" } }, { event: "$exception", error: { message: "private-profile-value" } }] })) });
  expect(result.sent).toEqual([]);
});

test("CTA identifiers describe known destinations and satisfy the bounded event schema", () => {
  for (const [path, expected] of [["https://github.com/hraness/repo", "github"], ["/install", "install"], ["/docs/guide", "docs"], ["/compare/tool", "compare"], ["/#use", "use_cases"], ["/", "get_started"]]) {
    const cta = analyticsCtaForUrl(new URL(path!, `https://${analyticsSite.canonicalDomain}`));
    expect(cta).toBe(expected!);
    expect(ctaClickedProperties({ cta, placement: "nav" })).not.toBeNull();
  }
});


test("encoded personal paths and exception credentials never reach the real SDK wire", () => {
  const canaries = [
    "+@a.aa",
    "person.contract%40example.com", "personé%40example.com",
    "person%40%E4%BE%8B%E5%AD%90.%E4%B8%AD%E5%9B%BD",
    "Bearer%20canary_secret_123", "api_key%3Dcanary_secret_123",
    "https%3A%2F%2Fcanary_user%3Acanary_password%40example.com/path",
  ];
  for (const canary of canaries) {
    const href = `https://${analyticsSite.canonicalDomain}/blog/${canary}`;
    const result = runPostHogHarness({ site: analyticsSite, scenarios: [{ href, captures: [
      { event: "$pageview" },
      { event: "page not found", properties: pageNotFoundProperties({ requestedPath: href }) ?? {} },
      { event: "$exception", error: { message: canary } },
    ] }] });
    expect(result.sent.filter(event => event.event === "$pageview")).toHaveLength(1);
    expect(result.sent.filter(event => event.event === "page not found")).toHaveLength(1);
    expect(result.sent.some(event => event.event === "$exception")).toBe(true);
    const wire = JSON.stringify(result.sent);
    expect(wire).not.toContain(canary);
    for (const marker of ["person.contract", "personé", "例子", "canary_secret_123", "canary_user", "canary_password"]) expect(wire).not.toContain(marker);
  }
}, 20000);
