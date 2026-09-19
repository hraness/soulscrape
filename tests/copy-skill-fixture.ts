import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** Copy the standalone fixture without Bun's intermittently slow recursive cpSync. */
export function copySkillFixture(source: string, destination: string): void {
  mkdirSync(destination);
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const from = join(source, entry.name);
    const to = join(destination, entry.name);
    if (entry.isDirectory()) copySkillFixture(from, to);
    else if (entry.isFile()) copyFileSync(from, to);
    else throw new Error(`unsupported skill fixture entry: ${entry.name}`);
  }
}
