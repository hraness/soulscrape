import { expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";
import publishedRelease from "../published-release.json";

test("renders the hero, the README method, boundaries, and the verified install", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html.match(/<h1\b/gu)).toHaveLength(1);
  expect(html).toContain("people for agents");
  expect(html).toContain("distill the essence of any human, for reference, imitation, or fun");
  expect(html).toContain('<article class="readme-prose">');
  expect(html).toContain('<h2 id="see-the-artifact-first">');
  expect(html).toContain("authorized evidence only");
  let renderedCode = "";
  new HTMLRewriter().on("pre > code", { text(chunk) { renderedCode += chunk.text; } }).transform(html);
  expect(renderedCode).toContain(publishedRelease.skillInstall);
  expect(html).toContain('data-language="shell"');
  expect(html).toContain("syntax-token--command");
  expect(html).toContain(publishedRelease.archiveUrl);
  expect(html).toContain(`${publishedRelease.package}@${publishedRelease.version}`);
  expect(html).toContain('aria-label="Ask AI about this"');
  expect(html).toContain("what happened to ensoul?");
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
  expect(prose).toContain("the full Skill runs in your agent without a Soulscrape account.");
  expect(prose).toContain("public pages and read APIs are free without sign-in.");
  expect(prose).toContain("your agent performs the research and synthesis with your model, tools, and authorized sources.");
  expect(prose).toContain("no Soulscrape subscription, Credits, or payment card is required.");
  expect(prose).toContain("any charges from your agent, model, or research tools are separate.");
  expect(prose).toContain("Hraness receives the reviewed public packet");
  expect(prose).toContain("review the complete packet before uploading it.");
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
