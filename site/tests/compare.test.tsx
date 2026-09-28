import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import ComparePage from "../app/compare/[tool]/page";
import CompareIndex from "../app/compare/page";
import { comparisons } from "../lib/compare";

test("every comparison records when and where its facts were checked", () => {
  for (const entry of comparisons) {
    expect(entry.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/u);
    expect(entry.sources.length).toBeGreaterThan(0);
    for (const source of entry.sources) {
      expect(source.url.startsWith("https://")).toBe(true);
      expect(source.label.length).toBeGreaterThan(0);
    }
  }
});

test("the compare index leads with a side-by-side table of the named alternatives", () => {
  const html = renderToStaticMarkup(<CompareIndex />);
  expect(html).toContain("<table");
  expect(html).toContain('<th scope="row">');
  for (const name of ["SOUL.md", "Delphi", "Crystal", "Clay", "Character.AI"]) {
    expect(html).toContain(name);
  }
  expect(html.indexOf("<table")).toBeLessThan(html.indexOf('class="card-grid"'));
  const slugs = new Set(comparisons.map(entry => entry.slug));
  for (const [, slug] of html.matchAll(/href="\/compare\/([^"]+)"/gu)) expect(slugs.has(slug!)).toBe(true);
  expect(html).not.toContain("—");
});

test("each comparison page names the tool and links its checked sources", async () => {
  for (const entry of comparisons) {
    const html = renderToStaticMarkup(await ComparePage({ params: Promise.resolve({ tool: entry.slug }) }));
    expect(html).toContain(`Checked on ${entry.checkedOn}.`);
    for (const source of entry.sources) expect(html).toContain(`href="${source.url}"`);
    expect(html).toContain(`aria-current="page" href="/compare/${entry.slug}">${entry.tool.replace("&", "&amp;")}</a>`);
    expect(html).not.toContain("—");
  }
});
