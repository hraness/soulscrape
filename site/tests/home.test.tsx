import { expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";
import publishedRelease from "../published-release.json";
import { marketing } from "../portfolio-copy";

test("renders the hero, README outline, boundaries, and one verified install", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html.match(/<h1\b/gu)).toHaveLength(1);
  expect(html).toMatch(/<h1\b[^>]*id="hero-title"/u);
  expect(html).toContain("dated dossier");
  expect(html).toContain('data-hraness-marketing-preset="editorial"');
  expect(html).toContain("hraness-material-wall");
  expect(html).toContain("hraness-material-chrome");
  expect(html).toContain("hraness-marketing-header");
  expect(html).toContain('<article class="readme-prose">');
  expect(html).toContain("Practical operating manual");
  expect(html).toContain("explicit authorization");
  expect(html).toContain('data-hraness-marketing="flow"');
  let renderedCode = "";
  new HTMLRewriter().on("pre > code", { text(chunk) { renderedCode += chunk.text; } }).transform(html);
  expect(renderedCode).toContain(publishedRelease.skillInstall);
  // One PlatformInstall panel per platform, macOS, Linux, then Windows, all with the same command.
  expect(renderedCode.split(publishedRelease.skillInstall)).toHaveLength(4);
  expect(html).toContain("data-hraness-platform-install");
  expect([...html.matchAll(/role="tabpanel"[^>]*data-platform="([a-z]+)"|data-platform="([a-z]+)"[^>]*role="tabpanel"/gu)].map(match => match[1] ?? match[2])).toEqual(["macos", "linux", "windows"]);
  expect(html).not.toContain('data-availability="unavailable"');
  expect(html).toContain("PowerShell");
  expect(html).not.toContain('id="how-a-person-becomes-a-dossier"');
  expect(html).toContain('data-language="shell"');
  expect(html).toContain("syntax-token--command");
  expect(html.indexOf("data-hraness-agent-setup-prompt")).toBeLessThan(html.indexOf("data-hraness-platform-install"));
  expect(html).toContain(`${publishedRelease.package}@${publishedRelease.version}`);
  expect(html).toContain('aria-label="Ask AI about this"');
  expect(html).toContain('href="/use-cases"');
  expect(html).toContain('href="/docs/quickstart"');
  expect(html).toContain('href="/compare"');
  expect(html).not.toContain("undefined");
});

test("publishes WebSite and SoftwareApplication entities tied to the Hraness organization", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html).toContain("SoftwareApplication");
  expect(html).toContain("https://soulscrape.com/#website");
  expect(html).toContain(`"softwareVersion":"${publishedRelease.version}"`);
  expect(html).toContain('"publisher":{"@id":"https://hraness.com/#organization"}');
  expect(html).toContain(marketing.meta);
});

test("leaves attribution to the shared Hraness footer instead of a hand-rolled maker section", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html).not.toMatch(/ben guo/iu);
  expect(html).not.toContain('id="maker"');
  expect(html).not.toContain("hraness-marketing-maker");
  // The page's project links are content; the root layout owns the only <footer>.
  expect(html).not.toContain("<footer");
  expect(html).toContain('<div class="site-footer">');
  expect(html).toContain('aria-label="Project links"');
});

test("makes free local research and account-gated public publishing distinct", () => {
  const html = renderToStaticMarkup(<Home />);
  const prose = html.replace(/\s+/gu, " ").toLowerCase();
  expect(prose).toContain("the full skill runs in your agent without a soulscrape account");
  expect(prose).toContain("public pages and read apis are free without sign-in");
  expect(prose).toContain("a free hraness account is needed only to publish, update, or withdraw your own indexes");
  expect(prose).toContain("charges from your agent, model, or research tools are separate");
  expect(html).toContain('href="/api/suite-auth/start?return_to=%2F"');
  const accountActions: { href: string | null; label: string }[] = [];
  new HTMLRewriter().on("#indexes .hraness-marketing-account__actions a", {
    element(element) { accountActions.push({ href: element.getAttribute("href"), label: "" }); },
    text(chunk) { accountActions.at(-1)!.label += chunk.text; },
  }).transform(html);
  expect(accountActions).toEqual([
    { href: "/api/suite-auth/start?return_to=%2F", label: "Create account" },
    { href: "/api/suite-auth/start?return_to=%2F", label: "Sign in" },
  ]);
  expect(html).not.toContain("reverses it anytime");
  expect(html).not.toContain("real transcript");
});

test("opens with real example indexes and keeps the full collection accessible before the method", () => {
  const html = renderToStaticMarkup(<Home />);
  const heroEnd = html.indexOf('id="examples"');
  const methodStart = html.indexOf('id="method"');
  expect(heroEnd).toBeGreaterThan(0);
  expect(methodStart).toBeGreaterThan(heroEnd);
  const hero = html.slice(0, heroEnd);
  for (const handle of ["patrick-collison", "bjork", "alan-kay", "eugene-tssui"]) {
    expect(hero).toContain(`href="/ben/${handle}"`);
  }

  const links: string[] = [];
  new HTMLRewriter().on(".example-card, .featured-indexes a", {
    element(element) { links.push(element.getAttribute("href") ?? ""); },
  }).transform(html);
  expect(new Set(links).size).toBe(8);
  for (const href of links) {
    expect(href).toMatch(/^\/ben\/[a-z0-9-]+$/u);
    const handle = href.split("/").at(-1)!;
    expect(existsSync(join(import.meta.dir, "../../examples/people", handle, "person-index.json"))).toBe(true);
  }
  expect(html.slice(heroEnd, methodStart)).toContain('href="/examples"');
  expect(html).not.toContain('<details class="more-examples">');
  expect(html).toContain("browse all 55 examples");
  expect(html).not.toContain('>public indexes<');
  expect(html).toContain('href="/portraits/credits.html"');
  expect(html).toContain("not endorsements by the people featured");
});

test("keeps the hero to the real example cards and never scores people", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html).not.toMatch(/\b(?:TASTE|HUMOR|RISK|CRAFT|CALM|TRUST)\b|conflict style|stamina|desk-item--ticker|desk-item--candles/u);
  expect(html).not.toContain("dossier-field");
});

test("links to publishing instructions from the account section", () => {
  const html = renderToStaticMarkup(<Home />);
  const links: string[] = [];
  new HTMLRewriter().on("#indexes a", {
    element(element) { links.push(element.getAttribute("href") ?? ""); },
  }).transform(html);
  expect(links).toContain("/docs/publish-person-index");
});
