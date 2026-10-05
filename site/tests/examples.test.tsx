import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import ExamplesPage from "../app/examples/page";
import { filterExamples } from "../components/examples-browser";
import { PersonProfileHeader } from "../components/person-profile";
import type { ExampleIndex } from "../components/example-index-card";
import { exampleImage } from "../lib/example-images";
import { exampleCategory, examplePacketDir, exampleSubjectKind, featuredIndexes, isExampleSubject } from "../lib/examples";
import { parseUsernameSegment } from "../lib/routes";
import { parsePublicProfileIndex } from "../../skills/soulscrape/scripts/person-index";
import type { StoredProfile } from "../lib/profile-view";

const examples: ExampleIndex[] = featuredIndexes.map(example => ({
  ...example, category: exampleCategory(example.handle), initials: "", subjectKind: exampleSubjectKind(example.handle), portrait: exampleImage("ben", example.handle)!,
}));

function packetFor(example: ExampleIndex) {
  return parsePublicProfileIndex(JSON.parse(readFileSync(join(import.meta.dir, "../../examples", examplePacketDir(example.handle), example.handle, "person-index.json"), "utf8")));
}

test("every curated example has a linked image on the directory and its profile", () => {
  const html = renderToStaticMarkup(<ExamplesPage />);
  expect(html.match(/<h1\b/gu)).toHaveLength(1);
  expect(html).toContain("the example collection");
  expect(examples).toHaveLength(77);
  const links: string[] = [];
  const images: string[] = [];
  const publishers: string[] = [];
  new HTMLRewriter().on(".example-card", { element(element) { links.push(element.getAttribute("href")!); } })
    .on(".examples-publisher a", { element(element) { publishers.push(element.getAttribute("href")!); } })
    .on(".example-card img", { element(element) { images.push(element.getAttribute("src")!); } }).transform(html);
  expect(publishers).toEqual(["/ben"]);
  expect(links).toHaveLength(examples.length);
  for (const example of examples) {
    expect(example.portrait.status).toBe("available");
    if (example.portrait.status !== "available") throw new Error(`Missing image ${example.handle}`);
    expect(example.portrait.src).toBe(`/portraits/${example.handle}.png`);
    expect(links).toContain(`/ben/${example.handle}`);
    expect(images).toContain(example.portrait.src);
    const packet = packetFor(example);
    expect(packet.subject.kind).toBe(example.subjectKind);
    const profile = { username: "ben", handle: example.handle, packet, revision: 1 } as StoredProfile;
    const header = renderToStaticMarkup(<PersonProfileHeader profile={profile} />);
    expect(header).toContain(`src="${example.portrait.src}"`);
    expect(header).toContain('href="/ben"');
    expect(exampleImage("other-publisher", example.handle)).toBeUndefined();
  }
  expect(images).toHaveLength(examples.length);
});

test("the collection spans people, organizations, and products", () => {
  const kinds = new Set(examples.map(example => example.subjectKind));
  expect(kinds).toEqual(new Set(["person", "organization", "product"]));
  const categories = new Set(examples.map(example => example.category));
  expect(categories).toContain("companies");
  expect(categories).toContain("products");
  for (const handle of ["37signals", "hyperdub", "long-now-foundation", "oxide-computer", "roam-research", "gumroad"]) {
    expect(isExampleSubject(handle)).toBe(true);
    expect(exampleSubjectKind(handle)).toBe("organization");
  }
  for (const handle of ["obsidian", "roam-research-product", "tldraw", "zed"]) {
    expect(exampleSubjectKind(handle)).toBe("product");
  }
  const html = renderToStaticMarkup(<ExamplesPage />);
  expect(html).not.toContain('src="/photos/');
});

test("search handles accented names, trims whitespace, and intersects field filters", () => {
  expect(filterExamples(examples, "  bjork ", "all").map(item => item.handle)).toEqual(["bjork"]);
  expect(filterExamples(examples, "BJÖRK", "music").map(item => item.handle)).toEqual(["bjork"]);
  expect(filterExamples(examples, "bjork", "building")).toHaveLength(0);
  expect(filterExamples(examples, "morphogenesis", "all").map(item => item.handle)).toEqual(["michael-levin"]);
  expect(filterExamples(examples, "canvas", "products").map(item => item.handle)).toEqual(["tldraw"]);
  expect(filterExamples(examples, "", "all")).toHaveLength(77);
});

test("directory and image routes cannot be treated as publisher usernames", () => {
  for (const name of ["examples", "photos", "portraits"]) expect(parseUsernameSegment(name)).toBeNull();
});
