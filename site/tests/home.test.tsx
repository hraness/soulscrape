import { expect, test } from "bun:test";
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
  expect(html).toContain(publishedRelease.skillInstall);
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
