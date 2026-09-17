#!/usr/bin/env bun

import { closeSync, constants, fstatSync, lstatSync, openSync, readSync } from "node:fs";
import { isAbsolute } from "node:path";
import { types } from "node:util";

import { parseSoulscrapeProfileUrl } from "./people-ontology.ts";
import {
  comparePersonIndexDateTimes,
  parsePersonIndex,
  personIndexDigest,
  type PersonIndexClaim,
  type PersonIndexSource,
  type PersonIndexSubject,
} from "./person-index.ts";
import { canonicalBytes, canonicalText, failPacket, rejectNonIJson, strictJsonParse } from "./source-packet.ts";

export const RESEARCH_EXCHANGE_SCHEMA_VERSION = "soulscrape.research-exchange.v1" as const;
export const RESEARCH_EXCHANGE_MAX_BYTES = 512 * 1024;
export const RESEARCH_EXCHANGE_MAX_SOURCES = 256;
export const RESEARCH_EXCHANGE_MAX_CLAIMS = 256;
export const RESEARCH_EXCHANGE_MAX_CLAIM_REFERENCES = 16;
export const RESEARCH_INPUT_MAX_BYTES = 4 * 1024 * 1024;
export const RESEARCH_OMITTED_COLLECTIONS = Object.freeze([
  "timeline", "themes", "works", "appearances", "relations", "openQuestions", "body",
] as const);

export type ResearchExchange = Readonly<{
  schemaVersion: typeof RESEARCH_EXCHANGE_SCHEMA_VERSION;
  profileUrl: string;
  packetDigest: string;
  generatedAt: string;
  asOf: string;
  subject: Readonly<Pick<PersonIndexSubject, "kind" | "handle" | "displayName"> & {
    wikidataId?: string;
  }>;
  sources: readonly Readonly<Pick<
    PersonIndexSource,
    "id" | "binding" | "mediaType" | "title" | "url" | "publisher" | "accessedAt" | "publishedAt"
  >>[];
  claims: readonly PersonIndexClaim[];
  omittedCollections: typeof RESEARCH_OMITTED_COLLECTIONS;
}>;

function boundResearchInput(value: unknown): void {
  let remaining = RESEARCH_INPUT_MAX_BYTES;
  const ancestors = new Set<object>();
  const consume = (bytes: number): void => {
    remaining -= bytes;
    if (remaining < 0) failPacket("packet", "exceeds the 4 MiB byte limit");
  };
  const visit = (member: unknown, depth: number): void => {
    if (depth > 64) failPacket("packet", "exceeds the JSON nesting limit");
    if (member === null || typeof member !== "object") {
      if (typeof member === "string" && member.length > remaining) {
        failPacket("packet", "exceeds the 4 MiB byte limit");
      }
      rejectNonIJson(member);
      consume(canonicalBytes(member).byteLength);
      return;
    }
    if (types.isProxy(member)) failPacket("packet", "contains a non-JSON proxy");
    if (ancestors.has(member)) failPacket("packet", "contains a cyclic value");
    const array = Array.isArray(member);
    const prototype = Object.getPrototypeOf(member);
    if (array ? prototype !== Array.prototype : prototype !== Object.prototype && prototype !== null) {
      failPacket("packet", "contains a non-JSON value");
    }
    ancestors.add(member);
    const keys = Reflect.ownKeys(member);
    if (keys.length > remaining) failPacket("packet", "exceeds the 4 MiB byte limit");
    if (array) {
      consume(member.length + 1 + (member.length === 0 ? 1 : 0));
      if (keys.length !== member.length + 1) failPacket("packet", "array must be dense with no extra members");
      for (let index = 0; index < member.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(member, String(index));
        if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
          failPacket("packet", "array must contain only JSON data members");
        }
        visit(descriptor.value, depth + 1);
      }
    } else {
      consume(keys.length + 1 + (keys.length === 0 ? 1 : 0));
      for (const key of keys) {
        if (typeof key !== "string") failPacket("packet", "object keys must be strings");
        visit(key, depth + 1);
        consume(1);
        const descriptor = Object.getOwnPropertyDescriptor(member, key)!;
        if (!("value" in descriptor) || !descriptor.enumerable) {
          failPacket("packet", "object must contain only JSON data members");
        }
        visit(descriptor.value, depth + 1);
      }
    }
    ancestors.delete(member);
  };
  visit(value, 0);
}

export function exportResearch(value: unknown, profileUrl: unknown): ResearchExchange {
  boundResearchInput(value);
  const packet = parsePersonIndex(value);
  if (comparePersonIndexDateTimes(packet.scope.asOf, packet.generatedAt) > 0) {
    failPacket("scope.asOf", "must not be later than generatedAt as an instant for research export");
  }
  const locator = parseSoulscrapeProfileUrl(profileUrl);
  if (locator === null) failPacket("profileUrl", "must be an explicit canonical Soulscrape profile URL");
  if (locator.handle !== packet.subject.handle) {
    failPacket("profileUrl", "handle must match subject.handle");
  }
  if (packet.sources.length > RESEARCH_EXCHANGE_MAX_SOURCES) {
    failPacket("sources", "exceeds the research exchange limit of 256 sources");
  }
  if (packet.claims.length > RESEARCH_EXCHANGE_MAX_CLAIMS) {
    failPacket("claims", "exceeds the research exchange limit of 256 claims");
  }
  for (const [index, claim] of packet.claims.entries()) {
    if (claim.sourceIds.length > RESEARCH_EXCHANGE_MAX_CLAIM_REFERENCES) {
      failPacket(`claims[${index}].sourceIds`, "exceeds the research exchange limit of 16 references");
    }
  }
  const wikidataId = packet.subject.identity?.wikidataId;
  const exchange: ResearchExchange = {
    schemaVersion: RESEARCH_EXCHANGE_SCHEMA_VERSION,
    profileUrl: locator.profileUrl,
    packetDigest: personIndexDigest(packet),
    generatedAt: packet.generatedAt,
    asOf: packet.scope.asOf,
    subject: {
      kind: packet.subject.kind,
      handle: packet.subject.handle,
      displayName: packet.subject.displayName,
      ...(wikidataId === undefined ? {} : { wikidataId }),
    },
    sources: packet.sources.map(source => ({
      id: source.id,
      binding: source.binding,
      mediaType: source.mediaType,
      title: source.title,
      url: source.url,
      publisher: source.publisher,
      accessedAt: source.accessedAt,
      ...(source.publishedAt === undefined ? {} : { publishedAt: source.publishedAt }),
    })),
    claims: packet.claims,
    omittedCollections: RESEARCH_OMITTED_COLLECTIONS,
  };
  if (canonicalBytes(exchange).byteLength > RESEARCH_EXCHANGE_MAX_BYTES) {
    failPacket("exchange", "exceeds the 512 KiB byte limit");
  }
  return exchange;
}

export function exportResearchJson(value: unknown, profileUrl: unknown): string {
  return canonicalText(exportResearch(value, profileUrl));
}

export function exportResearchFile(path: string, profileUrl: unknown): string {
  if (!isAbsolute(path) || path.includes("\0")) {
    failPacket("input", "must be an absolute local file path");
  }
  if (parseSoulscrapeProfileUrl(profileUrl) === null) {
    failPacket("profileUrl", "must be an explicit canonical Soulscrape profile URL");
  }
  const info = lstatSync(path);
  if (!info.isFile() || info.isSymbolicLink()) failPacket("input", "must be a regular file, not a symbolic link");
  if (info.size > RESEARCH_INPUT_MAX_BYTES) failPacket("input", "exceeds the 4 MiB byte limit");
  const noFollow = "O_NOFOLLOW" in constants ? constants.O_NOFOLLOW : 0;
  const descriptor = openSync(path, constants.O_RDONLY | constants.O_NONBLOCK | noFollow);
  try {
    const opened = fstatSync(descriptor);
    if (!opened.isFile() || opened.dev !== info.dev || opened.ino !== info.ino) {
      failPacket("input", "must remain the same regular file");
    }
    if (opened.size > RESEARCH_INPUT_MAX_BYTES) failPacket("input", "exceeds the 4 MiB byte limit");
    const bytes = new Uint8Array(RESEARCH_INPUT_MAX_BYTES + 1);
    let length = 0;
    while (length < bytes.byteLength) {
      const count = readSync(descriptor, bytes, length, bytes.byteLength - length, length);
      if (count === 0) break;
      length += count;
    }
    if (length > RESEARCH_INPUT_MAX_BYTES) failPacket("input", "exceeds the 4 MiB byte limit");
    return exportResearchJson(strictJsonParse(bytes.subarray(0, length)), profileUrl);
  } finally {
    closeSync(descriptor);
  }
}

export function main(argv: readonly string[]): number {
  if (argv.length !== 4) {
    process.stderr.write("usage: bun scripts/export-research.ts --input /absolute/path/to/person-index.json --profile-url https://soulscrape.com/<username>/<handle>\n");
    return 2;
  }
  const options = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index]!;
    if ((flag !== "--input" && flag !== "--profile-url") || options.has(flag)) {
      failPacket("arguments", "require exactly --input FILE and --profile-url URL");
    }
    options.set(flag, argv[index + 1]!);
  }
  process.stdout.write(exportResearchFile(options.get("--input")!, options.get("--profile-url")));
  return 0;
}

if (import.meta.main) {
  try {
    process.exitCode = main(Bun.argv.slice(2));
  } catch (error) {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
