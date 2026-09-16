import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runSupportCommand } from "@hraness/support-foundation/node";

// This separate skill helper never runs during packet preparation or validation.
if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args[0] !== "support") {
    process.stderr.write("Usage: bun <skill-directory>/scripts/support.mjs support [protocol --json | offer --json | shown <id> | release <id> | dismiss | snooze | enable | status --json]\n");
    process.exitCode = 2;
  } else {
    const result = await runSupportCommand({
      id: "soulscrape",
      name: "Soulscrape",
      updates: false,
      valueProposition: "Support development of evidence-calibrated person models and private source-packet tools.",
    }, args.slice(1), {
      command: [process.execPath, fileURLToPath(import.meta.url)],
      gitEmail: false,
    });
    process.stdout.write(result.stdout);
    process.stderr.write(result.stderr);
    process.exitCode = result.exitCode;
  }
}
