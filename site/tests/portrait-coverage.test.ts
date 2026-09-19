import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Home from "../app/page";
import { ExampleIndexCard, type ExampleIndex } from "../components/example-index-card";
import { examplePortraits, type ExamplePortrait } from "../lib/example-portraits";

const PUBLIC = join(import.meta.dir, "../public");
const SHA256 = /^[a-f0-9]{64}$/u;

function object(value: unknown): Record<string, unknown> {
  expect(value).toBeObject();
  expect(Array.isArray(value)).toBe(false);
  return value as Record<string, unknown>;
}

function publicUrl(value: unknown) {
  expect(typeof value).toBe("string");
  const url = new URL(value as string);
  expect(["http:", "https:"]).toContain(url.protocol);
  expect(url.username + url.password).toBe("");
}

test("every showcased person has an explicit available portrait and the page uses that asset", () => {
  const cards: { handle: string; image: string | null; initialsFallback: boolean }[] = [];
  new HTMLRewriter()
    .on(".example-index-grid .example-card", {
      element(element) {
        const href = element.getAttribute("href") ?? "";
        expect(href).toMatch(/^\/ben\/[a-z0-9-]+$/u);
        cards.push({ handle: href.slice("/ben/".length), image: null, initialsFallback: false });
      },
    })
    .on(".example-index-grid .example-card img", {
      element(element) { cards.at(-1)!.image = element.getAttribute("src"); },
    })
    .on(".example-index-grid .example-card-monogram", {
      element() { cards.at(-1)!.initialsFallback = true; },
    })
    .transform(renderToStaticMarkup(createElement(Home)));

  const registry: Readonly<Record<string, ExamplePortrait>> = examplePortraits;
  expect(cards).toHaveLength(8);
  expect(cards.map(card => card.handle).sort()).toEqual(Object.keys(registry).sort());
  for (const card of cards) {
    const decision = registry[card.handle];
    expect(decision.status).toBe("available");
    if (decision.status !== "available") throw new Error(`${card.handle}: portrait unavailable`);
    expect(decision.src).toBe(`/portraits/${card.handle}.png`);
    expect(card.image).toBe(decision.src);
    expect(card.initialsFallback).toBe(false);
  }
});

test("every shipped portrait has source attribution and a digest matching its actual PNG bytes", () => {
  const raw: unknown = JSON.parse(readFileSync(join(PUBLIC, "portraits/credits.json"), "utf8"));
  expect(Array.isArray(raw)).toBe(true);
  const credits = (raw as unknown[]).map(object);
  const byFile = new Map(credits.map(credit => [credit.file, credit]));
  const portraits = Object.entries(examplePortraits);
  expect(byFile.size).toBe(credits.length);
  expect([...byFile.keys()].sort()).toEqual(portraits.map(([, portrait]) => basename(portrait.src)).sort());

  for (const [handle, portrait] of portraits) {
    const credit = byFile.get(basename(portrait.src));
    expect(credit).toBeDefined();
    if (!credit) throw new Error(`Missing portrait credit for ${handle}`);
    const packet = JSON.parse(readFileSync(join(import.meta.dir, "../../examples/people", handle, "person-index.json"), "utf8"));
    expect(credit.subject).toBe(packet.subject.displayName);
    expect(typeof credit.credit).toBe("string");
    expect((credit.credit as string).trim().length).toBeGreaterThan(0);
    for (const key of ["sourcePageUrl", "imageUrl", "license", "derivativeLicense"]) publicUrl(credit[key]);
    expect(typeof credit.accessedAt).toBe("string");
    expect(Number.isFinite(Date.parse(credit.accessedAt as string))).toBe(true);
    expect(typeof credit.changes).toBe("string");
    expect((credit.changes as string).trim().length).toBeGreaterThan(0);
    // Originals remain in the source audit; CI verifies the recorded hash's shape only.
    expect(credit.sourceSha256).toMatch(SHA256);
    expect(credit.outputSha256).toMatch(SHA256);
    const bytes = readFileSync(join(PUBLIC, portrait.src));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(credit.outputSha256);
    expect(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(true);
    expect(bytes.toString("ascii", 12, 16)).toBe("IHDR");

    const transform = object(credit.transform);
    expect(typeof transform.agentPolished).toBe("boolean");
    if (transform.agentPolished) {
      const polish = object(transform.polish);
      expect(polish.tool).toBe("image_gen");
      expect(typeof polish.prompt).toBe("string");
      expect((polish.prompt as string).trim().length).toBeGreaterThan(0);
      const parents = Array.isArray(polish.parentHashes) ? polish.parentHashes : Object.values(object(polish.parentHashes));
      expect(parents.length).toBeGreaterThan(0);
      for (const hash of parents) expect(hash).toMatch(SHA256);
      expect(polish.outputSha256).toMatch(SHA256);
      const exported = object(transform.export);
      expect(Number.isSafeInteger(exported.size)).toBe(true);
      expect(bytes.readUInt32BE(16)).toBe(exported.size);
      expect(bytes.readUInt32BE(20)).toBe(exported.size);
    } else {
      expect(bytes.readUInt32BE(16)).toBe(transform.size);
      expect(bytes.readUInt32BE(20)).toBe(transform.size);
    }
  }
});

test("public attribution covers every portrait without exposing local source paths", () => {
  const json = readFileSync(join(PUBLIC, "portraits/credits.json"), "utf8");
  const html = readFileSync(join(PUBLIC, "portraits/credits.html"), "utf8");
  for (const published of [json, html]) {
    expect(published).not.toMatch(/(?:\/Users\/|\/home\/|\/private\/|\/tmp\/|file:\/\/|"localPath"\s*:)/u);
  }
  const credits = (JSON.parse(json) as unknown[]).map(object);
  const articles: { image: string | null; subject: string; text: string; links: string[] }[] = [];
  new HTMLRewriter()
    .on("main article", {
      element() { articles.push({ image: null, subject: "", text: "", links: [] }); },
      text(chunk) { articles.at(-1)!.text += chunk.text; },
    })
    .on("main article img", {
      element(element) { articles.at(-1)!.image = element.getAttribute("src"); },
    })
    .on("main article h2", {
      text(chunk) { articles.at(-1)!.subject += chunk.text; },
    })
    .on("main article a", {
      element(element) { articles.at(-1)!.links.push(element.getAttribute("href") ?? ""); },
    })
    .transform(html);

  expect(articles.map(article => article.image).sort()).toEqual(credits.map(credit => credit.file).sort());
  for (const credit of credits) {
    const article = articles.find(candidate => candidate.image === credit.file)!;
    expect(article.subject).toBe(credit.subject);
    expect(article.text).toContain(credit.credit);
    expect(article.text).toContain(credit.changes);
    expect(article.links).toContain(credit.sourcePageUrl);
    const displayedLicenses = article.links.filter(link => new URL(link).hostname === "creativecommons.org");
    expect(displayedLicenses.sort()).toEqual([...new Set([credit.license, credit.derivativeLicense])].sort());
  }
});

test("initials require an explicit unavailable decision with a reason and real review date", () => {
  const index = {
    handle: "example-person", name: "Example Person", note: "Example", category: "example", initials: "EP",
  };
  const render = (portrait: unknown) => renderToStaticMarkup(createElement(ExampleIndexCard, {
    index: { ...index, portrait } as ExampleIndex, number: 1,
  }));
  expect(() => render(undefined)).toThrow("explicit portrait decision");
  expect(() => render({ status: "unattempted" })).toThrow("explicit portrait decision");
  expect(() => render({ status: "unavailable", reason: "", reviewedAt: "2026-09-19" })).toThrow("reason and review date");
  expect(() => render({ status: "unavailable", reason: "TBD", reviewedAt: "2026-09-19" })).toThrow("reason and review date");
  expect(() => render({ status: "unavailable", reason: "No licensed public portrait found.", reviewedAt: "2026-02-30" })).toThrow("reason and review date");
  const html = render({ status: "unavailable", reason: "No licensed public portrait found.", reviewedAt: "2026-09-19" });
  expect(html).toContain('class="example-card-monogram"');
  expect(html).toContain("Portrait unavailable: No licensed public portrait found. Reviewed 2026-09-19.");
  expect(html).not.toContain("<img");
});
