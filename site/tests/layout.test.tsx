import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { hranessAttribution } from "@hraness/site-footer";

import RootLayout from "../app/layout";
import Home from "../app/page";

test("renders the shared Hraness footer once, without a mailing form or maker credit", () => {
  const html = renderToStaticMarkup(<RootLayout><Home /></RootLayout>);
  const footers = html.match(/<footer\b[^>]*>/gu) ?? [];
  expect(footers).toHaveLength(1);
  expect(footers[0]).toContain('id="hraness-site-footer"');
  expect(footers[0]).toContain('data-mailing-list="none"');
  expect(footers[0]).toContain('data-brand="visible"');
  expect(html).toContain('data-slot="hraness-attribution"');
  expect(html).toContain(hranessAttribution.title);
  expect(html).toContain(hranessAttribution.subtitle);
  expect(hranessAttribution.title).toBe("Built by Hraness");
  expect(html).toContain('href="https://hraness.com/"');
  expect(html).not.toContain("<form");
  expect(html).not.toMatch(/ben guo/iu);
  expect(html).not.toContain('id="maker"');
  expect(html).not.toContain("undefined");
});

test("keeps the shared footer after the page content on every route", () => {
  const html = renderToStaticMarkup(<RootLayout><main id="main">route body</main></RootLayout>);
  const body = html.indexOf("route body");
  const footer = html.indexOf('id="hraness-site-footer"');
  expect(body).toBeGreaterThan(-1);
  expect(footer).toBeGreaterThan(body);
  expect(html).toContain(hranessAttribution.title);
});
