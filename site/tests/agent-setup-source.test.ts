import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import publishedRelease from "../published-release.json";

const site = join(import.meta.dir, "..");

test("the first-dossier handoff carries the published skill and unresolved research scope", async () => {
  const home = await readFile(join(site, "app/page.tsx"), "utf8");
  const template = /const firstDossierPrompt = `([\s\S]*?)`;/u.exec(home)?.[1];
  expect(template).toBeDefined();
  if (template === undefined) throw new Error("Missing first-dossier prompt.");
  const prompt = template
    .replaceAll("${releaseVersion}", publishedRelease.version)
    .replaceAll("${publishedRelease.skillInstall}", publishedRelease.skillInstall)
    .replaceAll("${publishedRelease.skill}", publishedRelease.skill);

  expect(prompt).not.toContain("${");
  expect(prompt).toContain(publishedRelease.version);
  expect(prompt.split(publishedRelease.skillInstall)).toHaveLength(2);
  expect(prompt).toContain(`$${publishedRelease.skill}`);
  for (const field of ["<person, company, or product>", "<authorized sources>", "<intended use>", "<audience>", "<cutoff>", "<none, or who"]) {
    expect(prompt).toContain(field);
  }
  expect(prompt).toMatch(/ask\b[\s\S]*before starting research/iu);
  expect(prompt).toMatch(/\bwritable workspace\b/iu);
  expect(prompt).not.toMatch(/permanent filesystem|publish-person\.ts|suite-auth|\blogin\b|\bpublish\b/iu);
});

test("Soulscrape uses shared setup destinations while preserving manual platform installation", async () => {
  const [home, skillInstall] = await Promise.all([
    readFile(join(site, "app/page.tsx"), "utf8"),
    readFile(join(site, "components/skill-install.tsx"), "utf8"),
  ]);
  expect(home).toContain('import { AgentSetupPrompt } from "@hraness/design-kit/react"');
  expect(home).toContain('import { agentSetupTargets } from "@hraness/design-kit"');
  expect(home).toMatch(/<AgentSetupPrompt\b[^>]*prompt=\{firstDossierPrompt\}[^>]*targets=\{agentSetupTargets\(firstDossierPrompt\)\}/u);
  expect(home).not.toMatch(/agentSetupTargets\(firstDossierPrompt\)\.filter/u);
  expect(home).toContain("<SkillInstall />");
  expect(skillInstall).toContain("<PlatformInstall");
  expect(skillInstall.match(/command: publishedRelease\.skillInstall/gu)).toHaveLength(3);
});
