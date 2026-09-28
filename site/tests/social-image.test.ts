import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  socialImageContentType,
  socialImageSiteDetails,
  socialImageSize,
} from "@hraness/web-discovery/social-image";

import OpengraphImage from "../app/opengraph-image";
import { socialSite } from "../app/social";
import { SOCIAL_ICON_SVG } from "../app/social-icon";

const appDir = join(import.meta.dir, "..", "app");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const sources = files(appDir).filter(path => /\.(?:ts|tsx)$/u.test(path));
const imageRoutes = sources.filter(path => /(?:opengraph|twitter)-image\.tsx$/u.test(path));
const pathData = (svg: string) => [...svg.matchAll(/\bd="([^"]+)"/gu)].map(match => match[1]);

describe("share images", () => {
  test("declare Soulscrape once with its real app icon and light brand colours", () => {
    expect(socialSite.name).toBe("Soulscrape");
    expect(socialSite.domain).toBe("soulscrape.com");
    expect(socialSite.description).toBe("Free agent skill that writes dated dossiers on people, sources cited");
    expect(socialSite.theme).toEqual({
      accent: "#1E5AE1",
      background: "#F8F7F4",
      foreground: "#1C1917",
      muted: "#6C665F",
    });
    expect(socialSite.icon?.kind).toBe("app");
    expect(socialSite.icon?.src.startsWith("data:image/svg+xml,")).toBe(true);
  });

  test("use the same artwork as the favicon, in its light colours", () => {
    const favicon = readFileSync(join(appDir, "icon.svg"), "utf8");
    expect(pathData(SOCIAL_ICON_SVG)).toEqual(pathData(favicon));
    expect(pathData(SOCIAL_ICON_SVG)).toHaveLength(3);
    expect(SOCIAL_ICON_SVG).toContain('fill="#f8f7f4"');
    expect(SOCIAL_ICON_SVG).toContain('fill="#1e5ae1"');
    expect(SOCIAL_ICON_SVG).not.toContain("@media");
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
      icon: socialSite.icon,
      theme: socialSite.theme,
      title: "Soulscrape",
    });
  });
});
