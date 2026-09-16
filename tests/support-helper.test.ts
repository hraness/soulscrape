import { expect, test } from "bun:test";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { verifySupportHelper } from "../scripts/package-smoke.ts";

const root = join(import.meta.dir, "..");

test("relocated helper replays real command arrays and shares offer acknowledgement cooldown", () => {
  verifySupportHelper(join(root, "skills/soulscrape"));
});

test("importing the copied helper is inert and does not read private task inputs", () => {
  const isolated = mkdtempSync(join(tmpdir(), "soulscrape-support-import-"));
  try {
    const helper = join(isolated, "support.mjs");
    copyFileSync(join(root, "skills/soulscrape/scripts/support.mjs"), helper);
    const child = Bun.spawnSync({ cmd: [process.execPath, "--no-install", "--no-env-file", "-e",
      `await import(${JSON.stringify(pathToFileURL(helper).href)});`], cwd: isolated,
      env: { HOME: isolated, XDG_STATE_HOME: join(isolated, "state"), HRANESS_SUPPORT_AUDIENCE: "agent" },
      stdout: "pipe", stderr: "pipe", timeout: 5_000 });
    expect(child.exitCode).toBe(0);
    expect(child.stdout.toString()).toBe("");
    expect(child.stderr.toString()).toBe("");
    expect(readdirSync(isolated)).toEqual(["support.mjs"]);
    for (const name of ["prepare-x-archive.ts", "source-packet.ts", "validate-source-packet.ts", "x-zip-file.ts"]) {
      expect(readFileSync(join(root, "skills/soulscrape/scripts", name), "utf8")).not.toMatch(/support\.mjs|support-foundation|HRANESS_SUPPORT/u);
    }
  } finally { rmSync(isolated, { recursive: true, force: true }); }
});

test("bundle admission rejects changed runtime bytes and redirected package exports", () => {
  const isolated = mkdtempSync(join(tmpdir(), "soulscrape-support-build-"));
  try {
    const paths = ["package.json", "scripts/build-support-helper.ts", "scripts/support-helper-entry.ts",
      "skills/soulscrape/THIRD_PARTY_NOTICES.md", "skills/soulscrape/scripts/support.mjs",
      ...["dist/index.js", "dist/node.js", "package.json", "LICENSE"].map(path => `node_modules/@hraness/support-foundation/${path}`)];
    for (const path of paths) {
      mkdirSync(dirname(join(isolated, path)), { recursive: true });
      copyFileSync(join(root, path), join(isolated, path));
    }
    for (const path of ["dist/node.js", "package.json"]) {
      const original = readFileSync(join(isolated, "node_modules/@hraness/support-foundation", path));
      writeFileSync(join(isolated, "node_modules/@hraness/support-foundation", path), Buffer.concat([original, Buffer.from(" ")]));
      const child = Bun.spawnSync({ cmd: [process.execPath, "--no-install", "--no-env-file", "scripts/build-support-helper.ts", "--check"],
        cwd: isolated, env: { HOME: isolated }, stdout: "pipe", stderr: "pipe", timeout: 5_000 });
      expect(child.exitCode).not.toBe(0);
      expect(child.stderr.toString()).toContain(`Support foundation input drifted: ${path}`);
      writeFileSync(join(isolated, "node_modules/@hraness/support-foundation", path), original);
    }
  } finally { rmSync(isolated, { recursive: true, force: true }); }
});
