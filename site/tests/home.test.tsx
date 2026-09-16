import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";
import publishedRelease from "../published-release.json";

test("renders one optional support-only footer without a newsletter", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html.match(/<footer\b/gu)).toHaveLength(1);
  expect(html).toContain("https://account.hraness.com/support?product=soulscrape&amp;source=web#support");
  expect(html).toContain("Support development of evidence-calibrated person models and private source-packet tools.");
  expect(html).not.toContain('type="email"');
});

test("renders the hero, the README method, boundaries, and the verified install", () => {
  const html = renderToStaticMarkup(<Home />);
  expect(html.match(/<h1\b/gu)).toHaveLength(1);
  expect(html).toContain("Understand a person without pretending to contain them");
  expect(html).toContain('<article class="readme-prose">');
  expect(html).toContain('<h2 id="see-the-artifact-first">');
  expect(html).toContain("Authorized evidence only");
  expect(html).toContain(publishedRelease.skillInstall);
  expect(html).toContain(publishedRelease.archiveUrl);
  expect(html).toContain(`${publishedRelease.package}@${publishedRelease.version}`);
  expect(html).toContain('aria-label="Ask AI about this"');
  expect(html).toContain("What happened to Ensoul?");
  expect(html).not.toContain("undefined");
});

test("scopes editorial framing while keeping product positioning and release evidence visible", () => {
  const html = renderToStaticMarkup(<Home />);
  const elements: string[] = [];
  let positioning = "";
  new HTMLRewriter()
    .on('[data-hraness-marketing-preset="editorial"] .hraness-marketing-header.hraness-material-chrome', {
      element() { elements.push("header"); },
    })
    .on('[data-hraness-marketing-preset="editorial"] #main .hraness-material-wall .hraness-marketing-proof-frame.hraness-material-pane', {
      element() { elements.push("proof"); },
    })
    .on('p.hraness-marketing-hero__example', {
      element() { elements.push("positioning"); },
      text(chunk) { positioning += chunk.text; },
    })
    .transform(html);
  expect(elements).toEqual(["header", "positioning", "proof"]);
  expect(positioning).toBe("An Agent Skill for evidence-calibrated person models");
  expect(html).toContain(`<p class="install-note">Current verified release · ${publishedRelease.package}@${publishedRelease.version}</p>`);
});
