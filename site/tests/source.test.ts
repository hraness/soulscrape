import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { projectPublishedInstall, renderLandingModule } from "../scripts/sync-readme.ts";
import {
  extractLandingMarkdown, LANDING_END_MARKER, LANDING_START_MARKER, renderReadmeHtml,
} from "../scripts/readme-html.ts";
import { landingHtml } from "../app/landing.generated.ts";

const site = join(import.meta.dir, "..");
const read = async (path: string): Promise<string> => await readFile(join(site, path), "utf8");

function record(value: unknown, label: string): Readonly<Record<string, unknown>> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object.`);
  }
  return value as Readonly<Record<string, unknown>>;
}

describe("Soulscrape site source contract", () => {
  test("advertises only the verified published release", async () => {
    const [home, publication, packageSource] = await Promise.all([
      read("app/page.tsx"),
      read("published-release.json"),
      readFile(join(site, "..", "package.json"), "utf8"),
    ]);
    const publishedRelease = record(JSON.parse(publication) as unknown, "published release");
    const packageJson = record(JSON.parse(packageSource) as unknown, "source package");
    expect(Object.keys(publishedRelease).sort()).toEqual([
      "archiveUrl", "package", "releaseUrl", "skill", "skillInstall", "version",
    ]);
    expect(publishedRelease.version).toMatch(/^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/u);
    expect(String(publishedRelease.archiveUrl)).toMatch(
      /^https:\/\/github\.com\/hraness\/(?:ensoul|soulscrape)\/releases\/download\/v[0-9.]+\/hraness-(?:ensoul|soulscrape)-[0-9.]+\.tgz$/u,
    );
    expect(String(publishedRelease.releaseUrl)).toContain(`/releases/tag/v${String(publishedRelease.version)}`);
    expect(String(publishedRelease.skillInstall)).toContain(`#v${String(publishedRelease.version)} --skill ${String(publishedRelease.skill)}`);
    expect(packageJson.name).toBe("@hraness/soulscrape");
    expect(home).toContain('import publishedRelease from "../published-release.json"');
    expect(home).toContain("const releaseVersion = publishedRelease.version;");
    expect(home).not.toContain("package.json");
    expect(home).not.toMatch(/v0\.\d+\.\d+/u);
  });

  test("renders the README landing block and keeps it committed in sync", async () => {
    const [committed, fresh, readme] = await Promise.all([
      read("app/landing.generated.ts"),
      renderLandingModule(),
      readFile(join(site, "..", "README.md"), "utf8"),
    ]);
    expect(committed).toBe(fresh);
    const markdown = extractLandingMarkdown(readme);
    expect(markdown).not.toContain("# soulscrape");
    expect(markdown).not.toContain("[![Agent Skill:");
    expect(markdown).toContain("## install and write your first dossier");
    expect(markdown).toContain("## see the artifact first");
    expect(markdown).toContain("## how a person becomes a dossier");
    expect(markdown).not.toContain("## package installation and vendoring");
    // README-only blocks repeat what the page's own hero, publishing section, and FAQ say.
    expect(readme).toContain("## free to use, with your own agent");
    expect(readme).toContain("## publish and remix");
    expect(markdown).not.toContain("## free to use, with your own agent");
    expect(markdown).not.toContain("## publish and remix");
    expect(markdown).not.toContain("readme-only");
    expect(landingHtml).toContain('<h2 id="see-the-artifact-first">');
    expect(committed).toContain("questions.md");
    expect(committed).toContain("web-research.md");
    expect(committed).not.toContain("<script");
  });

  test("projects only the admitted skill install while source prepares a newer release", () => {
    const source = "Before\n\nbunx skills add hraness/soulscrape#v8.0.0 --skill soulscrape\n\nAfter";
    const admitted = { version: "7.9.0", skillInstall: "bunx skills add hraness/soulscrape#v7.9.0 --skill soulscrape" };
    expect(projectPublishedInstall(source, admitted)).toBe(source.replace("v8.0.0", "v7.9.0"));
    expect(() => projectPublishedInstall(source, { ...admitted, version: "7.9.0-beta" })).toThrow("stable version");
    expect(() => projectPublishedInstall(source, { ...admitted, version: "9007199254740992.0.0" })).toThrow("stable version");
    expect(() => projectPublishedInstall(source, { ...admitted, skillInstall: "bunx unreviewed-package" })).toThrow("does not match");
    expect(() => projectPublishedInstall("No command", admitted)).toThrow("exactly one");
    expect(() => projectPublishedInstall(`${source}\n${source}`, admitted)).toThrow("exactly one");
  });

  test("uses the shared Hraness design grammar and Ask AI links", async () => {
    const [packageJson, home, globals, layout] = await Promise.all([
      read("package.json"),
      read("app/page.tsx"),
      read("app/globals.css"),
      read("app/layout.tsx"),
    ]);
    expect(packageJson).toContain('"@hraness/design-kit": "github:hraness/design-kit#v0.18.1"');
    expect(packageJson).toContain('"@hraness/ui": "github:hraness/ui#v0.5.19"');
    expect(home).toContain('import { AskAiAboutThis } from "@hraness/ui"');
    expect(home).toContain('<AskAiAboutThis className="ask-ai" url="https://soulscrape.com" />');
    expect(globals).toContain('@import "@hraness/design-kit/fonts.css"');
    expect(globals).toContain('@import "@hraness/design-kit/product-marketing.css"');
    expect(globals).toContain('@import "../vendor/hraness-paper/paper-theme.css"');
    expect(globals).toContain('@import "../vendor/hraness-marketing/product-marketing-preset.css"');
    expect(globals).toContain('@import "../vendor/hraness-lantern/lantern-material.css"');
    expect(await read("vendor/hraness-paper/paper-theme.css")).toContain('--font-text: "Nebula Sans"');
    expect(await read("vendor/hraness-marketing/product-marketing-preset.css")).toContain("Instrument Serif");
    expect(layout).toContain('data-hraness-theme="paper"');
    expect(layout).toContain('data-hraness-material="lantern"');
    expect(home).toContain('data-hraness-marketing-preset="editorial"');
    expect(layout).toContain('metadataBase: new URL("https://soulscrape.com")');
    for (const icon of ["app/icon.svg", "app/icon.png", "app/favicon.ico", "app/apple-icon.png"]) {
      expect(await read(icon)).not.toHaveLength(0);
    }
  });

  test("attributes the site through the shared Hraness footer on every page", async () => {
    const [packageJson, lock, home, globals, layout, publisher, profile] = await Promise.all([
      read("package.json"),
      read("bun.lock"),
      read("app/page.tsx"),
      read("app/globals.css"),
      read("app/layout.tsx"),
      read("app/[username]/page.tsx"),
      read("components/person-profile.tsx"),
    ]);
    expect(packageJson).toContain('"@hraness/site-footer": "github:hraness/site-footer#v0.18.0"');
    expect(lock).toContain('"@hraness/site-footer": "github:hraness/site-footer#v0.18.0"');
    expect(globals).toContain('@import "@hraness/site-footer/styles.css";');
    expect(layout).toContain('import { HranessSiteFooter } from "@hraness/site-footer/react";');
    expect(layout).toContain('mailingList={{ kind: "none" }}');
    expect(layout).toContain('placement="flow"');
    // The package owns attribution; no page carries its own maker credit or footer landmark.
    for (const source of [home, publisher, profile]) {
      expect(source).not.toMatch(/ben guo/iu);
      expect(source).not.toContain("MarketingMaker");
      expect(source).not.toMatch(/<footer[\s>]/u);
    }
  });

  test("states the boundaries the skill enforces", async () => {
    const home = await read("app/page.tsx");
    expect(home).toContain("authorized evidence only");
    expect(home).toContain("asking before guessing");
    expect(home).toContain("research under your instructions");
    expect(home).toContain("public web research is off by default");
    expect(home).toContain("no setting to turn them off");
    // The rename note lives in the README, where returning ensoul users look.
    const readme = await readFile(join(site, "..", "README.md"), "utf8");
    expect(readme).toContain("### what changed when Ensoul became Soulscrape?");
    expect(readme).toContain("Versions through 0.3.5 remain under `@hraness/ensoul`.");
  });

  test("contains no private paths and uses the Vercel Next.js boundary", async () => {
    const [packageJsonSource, vercelConfigSource, home, layout] = await Promise.all([
      read("package.json"),
      read("vercel.json"),
      read("app/page.tsx"),
      read("app/layout.tsx"),
    ]);
    const packageJson = record(JSON.parse(packageJsonSource) as unknown, "package.json");
    const scripts = record(packageJson.scripts, "package.json scripts");
    expect(packageJson.name).toBe("soulscrape-site");
    expect(packageJson.packageManager).toBe("bun@1.3.14");
    expect(packageJson.engines).toEqual({ node: "24.x" });
    expect(scripts).toEqual({
      build: "bun run build:theme && next build --webpack",
      "build:theme": "bun scripts/build-theme-bootstrap.ts",
      "check:theme": "bun scripts/check-paper-theme.mjs && node vendor/hraness-marketing/check.mjs && node vendor/hraness-lantern/check.mjs",
      check: "bun run check:theme && bun run sync:readme && bun run test && bun run lint && bun run typecheck && bun run build",
      "convex:deploy": "convex deploy",
      "convex:dev": "convex dev",
      dev: "bun run sync:readme && bun run build:theme && next dev --webpack",
      lint: "eslint . --ignore-pattern .next",
      start: "next start",
      "sync:readme": "bun scripts/sync-readme.ts",
      test: "bun test ./tests/source.test.ts ./tests/home.test.tsx ./tests/layout.test.tsx ./tests/ui-styles.test.tsx ./tests/markdown.test.tsx ./tests/profile-view.test.ts ./tests/corpus-graph.test.ts ./tests/graph-api.test.ts ./tests/corpus-api.test.ts ./tests/openapi-api.test.ts ./tests/device-lifecycle.test.ts ./tests/device-start-admission.test.ts ./tests/api-body.test.ts ./tests/people-api.test.ts ./tests/dossier-view.test.tsx ./tests/profile-links.test.tsx ./tests/device-auth-api.test.ts ./tests/public-response.test.ts ./tests/profile-storage.test.ts ./tests/related-profiles.test.ts ./tests/portrait-coverage.test.ts ./tests/examples.test.tsx ./tests/blog.test.tsx",
      typecheck: "tsc --noEmit && tsc --noEmit --project convex",
    });
    expect(JSON.parse(vercelConfigSource)).toEqual({
      $schema: "https://openapi.vercel.sh/vercel.json",
      buildCommand: "bun run sync:readme && bun run build",
      framework: "nextjs",
      installCommand: "bun install --frozen-lockfile --ignore-scripts",
    });
    const { default: sitemap } = await import("../app/sitemap");
    const { default: robots } = await import("../app/robots");
    const sitemapEntries = await sitemap();
    expect(sitemapEntries[0]?.url).toBe("https://soulscrape.com/");
    const robotsResult = robots();
    expect(robotsResult.sitemap).toBe("https://soulscrape.com/sitemap.xml");
    expect(robotsResult.rules).toEqual({
      allow: "/",
      disallow: ["/api/", "/connect"],
      userAgent: "*",
    });
    expect(`${home}\n${layout}`).not.toMatch(/\/Users\/[^/\s]+|\/private\/tmp\/[^\s)]+/iu);
  });
});


describe("README HTML boundary", () => {
  test("highlights fenced and indented code through the shared engine without touching inline code", () => {
    const html = renderReadmeHtml("Inline `bun test`.\n\n```sh\nbun test --watch\n```\n\n    const count = 2;\n\n```text\nbun test\n```\n\n```unknown-language\nexample value\n```");
    expect(html).toContain("<code>bun test</code>");
    expect(html).toContain('data-language="shell"');
    expect(html).toContain("syntax-token--command");
    expect(html).toContain('data-language="typescript"');
    expect(html.match(/data-language="text"/gu)).toHaveLength(2);
    const hostile = renderReadmeHtml('```html\n<script>alert(1)</script> &amp;\n```');
    expect(hostile).not.toContain("<script");
    expect(hostile).not.toMatch(/\sstyle=/u);
    let literalCode = "";
    new HTMLRewriter().on("pre > code", {
      text(chunk) { literalCode += chunk.text; },
    }).transform(hostile);
    expect(literalCode).toBe("&lt;script&gt;alert(1)&lt;/script&gt; &amp;amp;\n");
  });
  test("requires one nonempty selection with unique own-line markers", () => {
    const selected = `${LANDING_START_MARKER}\n# Soulscrape\n\nSelected content.\n${LANDING_END_MARKER}`;
    expect(extractLandingMarkdown(selected)).toBe("Selected content.");
    expect(extractLandingMarkdown(selected.replace("Selected content.",
      "Selected content.\n<!-- hraness:soulscrape-readme-examples:start -->\nREADME example grid\n<!-- hraness:soulscrape-readme-examples:end -->\nRemaining method text.",
    ))).toBe("Selected content.\n\nRemaining method text.");
    expect(extractLandingMarkdown(`${selected}\n\nUnrelated outside content.`)).toBe("Selected content.");
    expect(extractLandingMarkdown(selected.replaceAll("\n", "\r\n"))).toBe("Selected content.");
    for (const invalid of [
      `${selected}\n${LANDING_START_MARKER}`,
      `${selected}\n${LANDING_END_MARKER}`,
      `${LANDING_END_MARKER}\nSelected\n${LANDING_START_MARKER}`,
      selected.replace(`\n${LANDING_END_MARKER}`, LANDING_END_MARKER),
      selected.replace(`${LANDING_START_MARKER}\n`, `${LANDING_START_MARKER}Inline\n`),
    ]) expect(() => extractLandingMarkdown(invalid)).toThrow("unique, ordered, own-line");
    expect(() => extractLandingMarkdown(`${LANDING_START_MARKER}\n# Soulscrape\n${LANDING_END_MARKER}`)).toThrow("empty");
  });

  test("derives stable fragments from parsed heading text", () => {
    const html = renderReadmeHtml([
      "## **Hello** &amp; `world`",
      "## **Hello** &amp; `world`",
      "[First](#hello--world) [Again](#hello--world-1)",
    ].join("\n\n"));
    expect(html).toContain('<h2 id="hello--world"><strong>Hello</strong> &amp; <code>world</code></h2>');
    expect(html).toContain('<h2 id="hello--world-1">');
  });

  test("keeps raw and nested malformed HTML inert, including inside headings", () => {
    const payloads = [
      '<script>alert(1)</script>',
      '<sc<script>ript>alert(1)</sc</script>ript>',
      '<img src="x" onerror="alert(1)">',
      '<svg onload="alert(1)"><a href="javascript:alert(1)">x</a></svg>',
      '<textarea><img src=x onerror=alert(1)></textarea>',
    ];
    for (const payload of payloads) {
      const html = renderReadmeHtml(`## Literal ${payload}\n\n${payload}`);
      const elements: string[] = [];
      const ids: string[] = [];
      new HTMLRewriter().on("*", {
        element(element) {
          elements.push(element.tagName);
          for (const [name] of element.attributes) expect(name).not.toMatch(/^on/iu);
          const id = element.getAttribute("id");
          if (id !== null) ids.push(id);
        },
      }).transform(html);
      expect(elements).toEqual(["h2", "p"]);
      expect(ids).toHaveLength(1);
      expect(ids[0]).toMatch(/^[\p{Letter}\p{Mark}\p{Number}_-]+$/u);
      expect(html).toContain("&lt;");
    }
  });

  test("rejects executable and protocol-relative Markdown URLs", () => {
    for (const target of ["javascript:alert", "java&#x73;cript:alert", "data:text/html,bad", "//example.com"]) {
      expect(() => renderReadmeHtml(`[link](${target})`)).toThrow();
      expect(() => renderReadmeHtml(`![image](${target})`)).toThrow();
    }
    expect(renderReadmeHtml("[Reference](docs/example.md)")).toContain(
      'href="https://github.com/hraness/soulscrape/blob/main/docs/example.md"',
    );
  });
});
