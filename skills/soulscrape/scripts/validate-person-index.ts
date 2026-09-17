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
}>;

export function validatePersonIndexFile(path: string): PersonIndexReceipt {
  const info = lstatSync(path);
  if (!info.isFile() || info.isSymbolicLink()) {
    throw new PacketValidationError("packet path: must be a regular file");
  }
  const bytes = readFileSync(path);
  if (bytes.byteLength > MAX_PACKET_BYTES) {
    throw new PacketValidationError("packet: exceeds the byte limit");
  }
  const packet = parsePersonIndex(strictJsonParse(bytes));
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
  };
}

function usage(): never {
  process.stderr.write(
    "usage: bun scripts/validate-person-index.ts /absolute/path/to/person-index.json\n",
  );
  process.exit(2);
}

export function main(argv: readonly string[]): void {
  const [path] = argv;
  if (path === undefined || argv.length !== 1 || !isAbsolute(path)) usage();
  if (!existsSync(path)) {
    process.stderr.write(`error: ${path}: no such file\n`);
    process.exitCode = 1;
    return;
  }
  const receipt = validatePersonIndexFile(path);
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
