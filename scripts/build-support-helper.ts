import { createHash } from "node:crypto";
import { lstatSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const commit = "ed89e584c2c420e3e0547bbe8f32baf8e3a2ae4d";
const manifest = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as { devDependencies?: Record<string, string> };
if (manifest.devDependencies?.["@hraness/support-foundation"] !== `github:hraness/support-foundation#${commit}`) {
  throw new Error("Support foundation pin drifted.");
}
const reviewedInputs = {
  "package.json": "48a38d5a1b453762875bca5fe3a85a884e2720fad2287892010f8c3dc3c03768",
  "dist/index.js": "6f7cf64ab9e22b55cfd6e338e0a6fef35bf8126bf86313f22b49782f6184147d",
  "dist/node.js": "a46faacc63511ab6f0ca4f80fc0823a8f1676f00e0bdb6a0af62eebd07d97e96",
  "LICENSE": "74b69bf37c8f340c9c2a54d431a15218738d9c463d0e014fa6a8bb8edce4e539",
};
for (const [path, expected] of Object.entries(reviewedInputs)) {
  const source = resolve(root, "node_modules/@hraness/support-foundation", path);
  const stat = lstatSync(source);
  if (!stat.isFile() || stat.size > 128 * 1024) throw new Error(`Invalid support build input: ${path}`);
  if (createHash("sha256").update(readFileSync(source)).digest("hex") !== expected) {
    throw new Error(`Support foundation input drifted: ${path}`);
  }
}
const notice = readFileSync(resolve(root, "skills/soulscrape/THIRD_PARTY_NOTICES.md"), "utf8");
const license = readFileSync(resolve(root, "node_modules/@hraness/support-foundation/LICENSE"), "utf8");
if (!notice.includes(license.trim()) || !notice.includes(commit)) throw new Error("Support foundation attribution drifted.");
const [mode, ...extra] = process.argv.slice(2);
if (extra.length !== 0 || (mode !== "--write" && mode !== "--check")) throw new Error("Use --write or --check.");
const result = await Bun.build({
  entrypoints: [resolve(root, "scripts/support-helper-entry.ts")], target: "node", format: "esm", metafile: true,
});
const [output] = result.outputs;
if (!result.success || result.outputs.length !== 1 || output === undefined) throw new Error("Support foundation bundle failed.");
const inputs = Object.keys(result.metafile?.inputs ?? {}).filter(path => path.includes("node_modules/"));
if (inputs.length !== 1 || !inputs[0]!.endsWith("node_modules/@hraness/support-foundation/dist/node.js")) {
  throw new Error("Support bundle includes an unreviewed dependency entrypoint.");
}
const bytes = Buffer.from(await output.arrayBuffer());
const destination = resolve(root, "skills/soulscrape/scripts/support.mjs");
if (mode === "--write") writeFileSync(destination, bytes);
else if (!bytes.equals(readFileSync(destination))) throw new Error("Committed support helper differs from its reviewed build inputs.");
console.log(`Verified standalone skill support helper (${bytes.byteLength} bytes).`);
