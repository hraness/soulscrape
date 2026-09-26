import { expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";
import publishedRelease from "../published-release.json";

test("renders the hero, the README method, boundaries, and the verified install", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html.match(/<h1\b/gu)).toHaveLength(1);
  expect(html).toMatch(/<h1\b[^>]*id="hero-title"/u);
  expect(html).toContain("dated dossier");
  expect(html).toContain('data-hraness-marketing-preset="editorial"');
  expect(html).toContain("hraness-material-wall");
  expect(html).toContain("hraness-material-chrome");
  expect(html).toContain("hraness-marketing-header");
  expect(html).toContain('<article class="readme-prose">');
  expect(html).toContain('<h2 id="see-the-artifact-first">');
  expect(html).toContain("authorized evidence only");
  expect(html).toContain("publish + remix");
  let renderedCode = "";
  new HTMLRewriter().on("pre > code", { text(chunk) { renderedCode += chunk.text; } }).transform(html);
  expect(renderedCode).toContain(publishedRelease.skillInstall);
  expect(html).toContain('data-language="shell"');
  expect(html).toContain("syntax-token--command");
  expect(html).toContain(publishedRelease.archiveUrl);
  expect(html).toContain(`${publishedRelease.package}@${publishedRelease.version}`);
  expect(html).toContain('aria-label="Ask AI about this"');
  expect(html).toContain('href="/use-cases"');
  expect(html).toContain('href="/docs/quickstart"');
  expect(html).toContain('href="/compare"');
  expect(html).not.toContain("undefined");
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
  const prose = html.replace(/\s+/gu, " ");
  expect(prose).toContain("the full skill runs in your agent without a Soulscrape account");
  expect(prose).toContain("public pages and read APIs are free without sign-in");
  expect(prose).toContain("a free Hraness account is needed only to publish, update, or withdraw your own indexes");
  expect(prose).toContain("no subscription or card");
  expect(prose).toContain("publishing included");
  expect(prose).toContain("charges from your agent, model, or research tools are separate");
  expect(prose).toContain("Hraness stores the reviewed public packet");
  expect(prose).toContain("review the complete packet");
  expect(html).toContain('href="/api/suite-auth/start?return_to=%2F"');
  expect(html).toContain("create a free account or sign in");
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

test("says what each published format carries", () => {
  const html = renderToStaticMarkup(<Home />).replace(/\s+/gu, " ");
  expect(html).not.toMatch(/same packet as HTML, Markdown, and JSON/u);
  expect(html).toContain("a Markdown copy of its essay");
  expect(html).toContain("&quot;$PWD/examples/people/eugene-tssui/person-index.json&quot;");
});
