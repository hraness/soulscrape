import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  socialImageContentType,
  socialImageSiteDetails,
  socialImageSize,
} from "@hraness/web-discovery/social-image";
import { socialImageFit } from "@hraness/web-discovery/social-image/card";

import { marketing } from "../portfolio-copy";
import { parsePersonIndex } from "../../skills/soulscrape/scripts/person-index";
import OpengraphImage, { alt as homeAlt } from "../app/opengraph-image";
import {
  blogPostSocialPage,
  comparisonSocialPage,
  docSocialPage,
  personSocialPage,
  publisherSocialPage,
  socialHomeAlt,
  socialHomePage,
  socialBlogDescriptions,
  socialCompareDescriptions,
  socialDocDescriptions,
  socialPages,
  socialSite,
} from "../app/social";
import { SOCIAL_MARK_SVG } from "../app/social-mark";
import { blogPosts } from "../lib/blog";
import { comparisons } from "../lib/compare";
import { docsPages } from "../lib/docs";

const appDir = join(import.meta.dir, "..", "app");
const siteDir = join(import.meta.dir, "..");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const sources = files(appDir).filter(path => /\.(?:ts|tsx)$/u.test(path));
const imageRoutes = sources.filter(path => /(?:opengraph|twitter)-image\.tsx$/u.test(path));

describe("share images", () => {
  test("declare Soulscrape once with the header's mark, name, and palette", () => {
    expect(socialSite.name).toBe(marketing.names.name);
    expect(socialSite.brand).toBe("Soulscrape");
    expect(socialSite.domain).toBe("soulscrape.com");
    expect(socialSite.description).toBe(`${marketing.short.replace(/[.!?]$/, "")}.`);
    expect(socialSite.palette).toBe("gruvbox");
    expect(readFileSync(join(appDir, "layout.tsx"), "utf8")).toContain('data-palette="gruvbox"');
    expect(socialSite.theme).toBeUndefined();
    expect(socialSite.icon).toBeUndefined();
  });

  test("use the exact mark the site header paints in foil", () => {
    expect(readFileSync(join(siteDir, "components", "site-header.tsx"), "utf8")).toContain("/marks/soulscrape.svg");
    expect(SOCIAL_MARK_SVG).toBe(readFileSync(join(siteDir, "public", "marks", "soulscrape.svg"), "utf8").trim());
    expect(socialSite.brandMark).toBe(SOCIAL_MARK_SVG);
  });

  test("render every route from the shared template and the one site declaration", () => {
    expect(imageRoutes.map(path => relative(appDir, path)).sort()).toEqual([
      "[username]/[handle]/opengraph-image.tsx",
      "[username]/opengraph-image.tsx",
      "blog/[slug]/opengraph-image.tsx",
      "blog/opengraph-image.tsx",
      "compare/[tool]/opengraph-image.tsx",
      "compare/opengraph-image.tsx",
      "docs/[slug]/opengraph-image.tsx",
      "docs/opengraph-image.tsx",
      "examples/opengraph-image.tsx",
      "opengraph-image.tsx",
      "use-cases/opengraph-image.tsx",
    ]);
    for (const path of imageRoutes) {
      const source = readFileSync(path, "utf8");
      expect(source).toContain("createSiteSocialImageResponse(socialSite");
      expect(source).toMatch(/from "(?:\.\.\/)*\.?\/?social"/u);
      expect(source).toContain("socialImageContentType as contentType");
      expect(source).toContain("socialImageSize as size");
    }
  });

  test("keep drawing code out of the site", () => {
    for (const path of sources) {
      const source = readFileSync(path, "utf8");
      expect(source).not.toMatch(/\bImageResponse\b|next\/og|createSocialImageResponse\(|createSocialImageCard\(/u);
    }
  });

  test("serve the home card as a 1200 by 630 PNG", async () => {
    expect(socialImageSize).toEqual({ height: 630, width: 1200 });
    expect(socialImageContentType).toBe("image/png");
    const bytes = new Uint8Array(await OpengraphImage().arrayBuffer());
    expect([...bytes.slice(1, 4)].map(byte => String.fromCharCode(byte)).join("")).toBe("PNG");
    const header = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    expect([header.getUint32(16), header.getUint32(20)]).toEqual([1200, 630]);
  });

  test("pass page copy only", () => {
    expect(socialImageSiteDetails(socialSite, { eyebrow: "Docs", headline: "Install" })).toMatchObject({
      domain: "soulscrape.com",
      eyebrow: "Docs",
      headline: "Install",
      title: "Soulscrape",
    });
  });

  test("fit every card's copy as written, with no cut, clamp, or smaller headline", () => {
    const examples = join(import.meta.dir, "..", "..", "examples", "people");
    const people = readdirSync(examples)
      .filter(name => statSync(join(examples, name)).isDirectory())
      .map(name => parsePersonIndex(JSON.parse(readFileSync(join(examples, name, "person-index.json"), "utf8"))));
    expect(people.length).toBeGreaterThan(0);
    const cards: (readonly [string, Parameters<typeof socialImageSiteDetails>[1]])[] = [
      ["home", socialHomePage],
      ...Object.entries(socialPages).map(([name, page]) => [name, page] as const),
      ["publisher", publisherSocialPage("ben")],
      ...blogPosts.map(post => [`blog/${post.slug}`, blogPostSocialPage(post)] as const),
      ...comparisons.map(entry => [`compare/${entry.slug}`, comparisonSocialPage(entry)] as const),
      ...docsPages.map(page => [`docs/${page.slug}`, docSocialPage(page)] as const),
      ...people.map(packet => [`ben/${packet.subject.handle}`, personSocialPage({
        handle: packet.subject.handle,
        packet,
        packetDigest: "",
        publishedAtMs: 0,
        revision: 1,
        updatedAtMs: 0,
        username: "ben",
      })] as const),
    ];
    const findings = cards.flatMap(([name, page]) =>
      socialImageFit(socialImageSiteDetails(socialSite, page)).findings.map(finding => `${name}: ${finding.code}`));
    expect(findings).toEqual([]);
  });

  test("draw the home card from the product category and hero headline", () => {
    expect(socialHomePage).toEqual({
      eyebrow: marketing.category,
      headline: marketing.hero.heading,
      layout: "product",
    });
    expect(homeAlt).toBe(socialHomeAlt);
    expect(socialHomeAlt).toBe(`${marketing.names.name}: ${marketing.category}. ${marketing.hero.heading}`);
    const fit = socialImageFit(socialImageSiteDetails(socialSite, socialHomePage));
    expect(fit.headline.lines.length).toBeLessThanOrEqual(2);
    // No short word left alone on the last line.
    expect(fit.headline.lines.at(-1)?.split(" ").length).toBeGreaterThan(1);
  });

  test("label every page card with a portfolio section eyebrow", () => {
    const eyebrows = new Map<string, string | undefined>([
      ...blogPosts.map(post => [`blog/${post.slug}`, socialImageSiteDetails(socialSite, blogPostSocialPage(post)).eyebrow] as const),
      ...comparisons.map(entry => [`compare/${entry.slug}`, socialImageSiteDetails(socialSite, comparisonSocialPage(entry)).eyebrow] as const),
      ...docsPages.map(page => [`docs/${page.slug}`, socialImageSiteDetails(socialSite, docSocialPage(page)).eyebrow] as const),
      ["blog", socialImageSiteDetails(socialSite, socialPages.blog).eyebrow],
      ["compare", socialImageSiteDetails(socialSite, socialPages.compare).eyebrow],
      ["docs", socialImageSiteDetails(socialSite, socialPages.docs).eyebrow],
    ]);
    for (const [name, eyebrow] of eyebrows) {
      expect([name, eyebrow !== undefined && eyebrow !== ""]).toEqual([name, true]);
      expect(eyebrow).not.toMatch(/^(?:Compare|Docs)$/u);
    }
  });

  test("give every page card its own description, never the site tagline", () => {
    const descriptions = [
      ...Object.values(socialPages).map(page => page.description),
      publisherSocialPage("ben").description,
      ...Object.values(socialBlogDescriptions),
      ...Object.values(socialCompareDescriptions),
      ...Object.values(socialDocDescriptions),
    ];
    for (const description of descriptions) {
      expect(description).not.toBe(socialSite.description);
    }
    expect(Object.keys(socialBlogDescriptions).sort()).toEqual(blogPosts.map(post => post.slug).sort());
    expect(Object.keys(socialCompareDescriptions).sort()).toEqual(comparisons.map(entry => entry.slug).sort());
    expect(Object.keys(socialDocDescriptions).sort()).toEqual(docsPages.map(page => page.slug).sort());
  });
});
