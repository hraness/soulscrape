#!/usr/bin/env bun
/** Validate a `soulscrape.person-index.v1` packet without printing its content. */

import { existsSync, lstatSync, readFileSync } from "node:fs";
import { isAbsolute } from "node:path";

import {
  PacketValidationError,
  parsePersonIndex,
  personIndexDigest,
} from "./person-index.ts";
import { strictJsonParse } from "./source-packet.ts";

const MAX_PACKET_BYTES = 4 * 1024 * 1024;

export type PersonIndexReceipt = Readonly<{
  valid: true;
  schemaVersion: string;
  indexId: string;
  handle: string;
  displayName: string;
  subjectKind: string;
  packetDigest: string;
  counts: Readonly<{
    sources: number;
    claims: number;
    timeline: number;
    themes: number;
    works: number;
    appearances: number;
    relations: number;
    openQuestions: number;
  }>;
  warnings?: readonly string[];
}>;

/** Bounded Levenshtein distance; returns Infinity past the cutoff. */
function editDistance(a: string, b: string, cutoff: number): number {
  if (Math.abs(a.length - b.length) > cutoff) return Number.POSITIVE_INFINITY;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      curr[j] = Math.min(
        prev[j]! + 1,
        curr[j - 1]! + 1,
        prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      rowMin = Math.min(rowMin, curr[j]!);
    }
    if (rowMin > cutoff) return Number.POSITIVE_INFINITY;
    prev = curr;
  }
  return prev[b.length]!;
}

export function validatePersonIndexFile(
  path: string,
  options?: { knownHandles?: ReadonlySet<string> },
): PersonIndexReceipt {
  const info = lstatSync(path);
  if (!info.isFile() || info.isSymbolicLink()) {
    throw new PacketValidationError("packet path: must be a regular file");
  }
  const bytes = readFileSync(path);
  if (bytes.byteLength > MAX_PACKET_BYTES) {
    throw new PacketValidationError("packet: exceeds the byte limit");
  }
  const packet = parsePersonIndex(strictJsonParse(bytes));
  const warnings: string[] = [];
  const known = options?.knownHandles;
  if (known !== undefined) {
    const targets = new Set<string>();
    for (const relation of packet.relations ?? []) targets.add(relation.target);
    for (const event of packet.timeline ?? []) {
      if (event.organizationHandle !== undefined) targets.add(event.organizationHandle);
    }
    for (const target of targets) {
      if (known.has(target)) continue;
      for (const handle of known) {
        if (handle === packet.subject.handle) continue;
        // A leading "the-" is a locator variant, not a different entity —
        // compare normalized forms so `the-long-now-foundation` still
        // matches `long-now-foundation`.
        const normTarget = target.startsWith("the-") ? target.slice(4) : target;
        const normHandle = handle.startsWith("the-") ? handle.slice(4) : handle;
        // Distance 1 is always suspicious; distance 2 only on longer slugs —
        // short names collide by chance ("cern" vs "gwern").
        const cutoff = normTarget.length >= 8 && normHandle.length >= 8 ? 2 : 1;
        // A complete hyphen-segment containment is a miss regardless of
        // distance: `oxide-computer-company` for live `oxide-computer`.
        // Requiring the boundary keeps "mit" from matching "mitchell-*".
        const containment =
          normTarget.startsWith(`${normHandle}-`) || normHandle.startsWith(`${normTarget}-`);
        if (
          normTarget === normHandle ||
          containment ||
          editDistance(normTarget, normHandle, cutoff) <= cutoff
        ) {
          warnings.push(
            `target "${target}" is unindexed and a near-miss of live handle "${handle}"`,
          );
          break;
        }
      }
    }
  }
  return {
    valid: true,
    schemaVersion: packet.schemaVersion,
    indexId: packet.indexId,
    handle: packet.subject.handle,
    displayName: packet.subject.displayName,
    subjectKind: packet.subject.kind,
    packetDigest: personIndexDigest(packet),
    counts: {
      sources: packet.sources.length,
      claims: packet.claims.length,
      timeline: packet.timeline?.length ?? 0,
      themes: packet.themes?.length ?? 0,
      works: packet.works?.length ?? 0,
      appearances: packet.appearances?.length ?? 0,
      relations: packet.relations?.length ?? 0,
      openQuestions: packet.openQuestions?.length ?? 0,
    },
    ...(warnings.length === 0 ? {} : { warnings }),
  };
}

function usage(): never {
  process.stderr.write(
    "usage: bun scripts/validate-person-index.ts /absolute/path/to/person-index.json [--known-handles /absolute/path/to/handles.txt]\n",
  );
  process.exit(2);
}

export function main(argv: readonly string[]): void {
  const [path, flag, flagValue, ...rest] = argv;
  if (
    path === undefined || rest.length > 0 || !isAbsolute(path)
    || (flag !== undefined && (flag !== "--known-handles" || flagValue === undefined || !isAbsolute(flagValue)))
  ) usage();
  if (!existsSync(path)) {
    process.stderr.write(`error: ${path}: no such file\n`);
    process.exitCode = 1;
    return;
  }
  const knownHandles = flag === undefined
    ? undefined
    : new Set(
      readFileSync(flagValue!, "utf8")
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0),
    );
  const receipt = validatePersonIndexFile(
    path,
    knownHandles === undefined ? {} : { knownHandles },
  );
  process.stdout.write(`${JSON.stringify(receipt)}\n`);
}

if (import.meta.main) {
  try {
    main(Bun.argv.slice(2));
  } catch (error) {
    process.stderr.write(
      `error: ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exitCode = 1;
  }
}
