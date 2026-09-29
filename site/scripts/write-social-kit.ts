// Writes the launch social kit to docs/launch/social-kit.md. Run with `bun scripts/write-social-kit.ts` in site/.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { renderSocialKitMarkdown } from "../app/launch/social-kit-markdown";

const out = join(import.meta.dir, "../../docs/launch/social-kit.md");
await mkdir(join(out, ".."), { recursive: true });
await writeFile(out, renderSocialKitMarkdown());
console.log(`Wrote ${out}`);
