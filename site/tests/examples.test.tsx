import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import ExamplesPage from "../app/examples/page";
import { filterExamples } from "../components/examples-browser";
import { PersonProfileHeader } from "../components/person-profile";
import type { ExampleIndex } from "../components/example-index-card";
import { exampleImage } from "../lib/example-images";
import { exampleCategory, featuredIndexes } from "../lib/examples";
import { parseUsernameSegment } from "../lib/routes";
import photos from "../lib/example-photos.json";
import { parsePersonIndex } from "../../skills/soulscrape/scripts/person-index";
import type { StoredProfile } from "../lib/profile-view";

const examples: ExampleIndex[] = featuredIndexes.map(example => ({
  ...example, category: exampleCategory(example.handle), initials: "", portrait: exampleImage("ben", example.handle)!,
}));

test("every curated example has a linked image on the directory and its profile", () => {
  const html = renderToStaticMarkup(<ExamplesPage />);
  expect(html.match(/<h1\b/gu)).toHaveLength(1);
  expect(html).toContain("a personal collection");
  expect(html).toContain("curated by");
  expect(examples).toHaveLength(60);
  const links: string[] = [];
  const images: string[] = [];
  new HTMLRewriter().on(".example-card", { element(element) { links.push(element.getAttribute("href")!); } })
    .on(".example-card img", { element(element) { images.push(element.getAttribute("src")!); } }).transform(html);
  expect(links).toHaveLength(examples.length);
  expect(images).toHaveLength(examples.length);
  for (const example of examples) {
    expect(example.portrait.status).toBe("available");
    if (example.portrait.status !== "available") throw new Error(`Missing image ${example.handle}`);
    expect(links).toContain(`/ben/${example.handle}`);
    expect(images).toContain(example.portrait.src);
    const packet = parsePersonIndex(JSON.parse(readFileSync(join(import.meta.dir, "../../examples/people", example.handle, "person-index.json"), "utf8")));
    const profile = { username: "ben", handle: example.handle, packet, revision: 1 } as StoredProfile;
    const header = renderToStaticMarkup(<PersonProfileHeader profile={profile} />);
    expect(header).toContain(`src="${example.portrait.src}"`);
    expect(header).toContain('href="/examples"');
    expect(exampleImage("other-publisher", example.handle)).toBeUndefined();
  }
});

test("search handles accented names, trims whitespace, and intersects field filters", () => {
  expect(filterExamples(examples, "  bjork ", "all").map(item => item.handle)).toEqual(["bjork"]);
  expect(filterExamples(examples, "BJÖRK", "music").map(item => item.handle)).toEqual(["bjork"]);
  expect(filterExamples(examples, "bjork", "building")).toHaveLength(0);
  expect(filterExamples(examples, "morphogenesis", "all").map(item => item.handle)).toEqual(["michael-levin"]);
  expect(filterExamples(examples, "", "all")).toHaveLength(60);
});

test("new photos have source provenance and checked local bytes", () => {
  const records = photos as { handle: string; src: string; sourcePageUrl: string; imageUrl: string; credit: string; sha256: string; width: number; height: number }[];
  expect(records).toHaveLength(52);
  expect(new Set(records.map(photo => photo.handle)).size).toBe(52);
  for (const photo of records) {
    expect(photo.src).toMatch(/^\/photos\/[a-z0-9-]+\.(png|jpg|jpeg|webp)$/u);
    expect(new URL(photo.sourcePageUrl).protocol).toMatch(/^https?:$/u);
    expect(new URL(photo.imageUrl).protocol).toMatch(/^https?:$/u);
    expect(photo.credit.length).toBeGreaterThan(0);
    expect(photo.width).toBeGreaterThan(0);
    expect(photo.height).toBeGreaterThan(0);
    const bytes = readFileSync(join(import.meta.dir, "../public", photo.src));
    expect(bytes.length).toBeLessThanOrEqual(1024 * 1024);
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(photo.sha256);
  }
});

test("directory and image routes cannot be treated as publisher usernames", () => {
  for (const name of ["examples", "photos", "portraits"]) expect(parseUsernameSegment(name)).toBeNull();
});
