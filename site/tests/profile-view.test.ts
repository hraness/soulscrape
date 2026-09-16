import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parsePersonIndex } from "../../skills/soulscrape/scripts/person-index";
import { strictJsonParse } from "../../skills/soulscrape/scripts/source-packet";

import {
  profileCanonicalUrl,
  profileJsonLd,
  publicRowToProfile,
  sortedTimeline,
} from "../lib/profile-view";
import { parseUsernameSegment } from "../lib/routes";
import { isReservedUsernameSegment } from "../lib/site";
import { publishDecision } from "../convex/people";

const packet = parsePersonIndex(
  strictJsonParse(readFileSync(join(import.meta.dir, "../../examples/people/eugene-tssui/person-index.json"))),
);

const stored = {
  username: "ben_guo",
  handle: "eugene-tssui",
  packetDigest: "c76566ce6a1ac2e0a47dbae26d794c2db92a39394edadf78cbd0d4f576e9042a",
  revision: 1,
  packet,
  publishedAtMs: 1_760_000_000_000,
  updatedAtMs: 1_760_000_000_000,
};

describe("profile view model", () => {
  test("canonical URL follows /<username>/<handle>", () => {
    expect(profileCanonicalUrl("ben_guo", "eugene-tssui"))
      .toBe("https://soulscrape.com/ben_guo/eugene-tssui");
  });

  test("JSON-LD is a ProfilePage whose main entity binds the identity URLs", () => {
    const ld = profileJsonLd(stored) as {
      "@type": string;
      mainEntity: Record<string, unknown>;
    };
    expect(ld["@type"]).toBe("ProfilePage");
    expect(ld.mainEntity["@type"]).toBe("Person");
    expect(ld.mainEntity.name).toBe("Eugene Tssui");
    const sameAs = ld.mainEntity.sameAs as string[];
    expect(sameAs).toContain("https://www.wikidata.org/wiki/Q5407800");
  });

  test("rejects a row whose packet fails validation", () => {
    expect(publicRowToProfile({ ...stored, packet: { schemaVersion: "wrong" } })).toBeNull();
    expect(publicRowToProfile(null)).toBeNull();
    expect(publicRowToProfile({ ...stored, revision: "1" })).toBeNull();
  });

  test("accepts a stored row and sorts the timeline", () => {
    const profile = publicRowToProfile(stored);
    expect(profile).not.toBeNull();
    const dates = sortedTimeline(packet).map(event => event.date);
    expect([...dates].sort()).toEqual(dates);
  });
});

describe("username routing", () => {
  test("accepts canonical suite usernames and rejects reserved or malformed segments", () => {
    expect(parseUsernameSegment("ben_guo")).toBe("ben_guo");
    expect(parseUsernameSegment("api")).toBeNull();
    expect(parseUsernameSegment("Admin")).toBeNull();
    expect(parseUsernameSegment("../etc")).toBeNull();
    expect(parseUsernameSegment("ab")).toBeNull();
    expect(isReservedUsernameSegment("connect")).toBe(true);
  });
});

describe("publishDecision", () => {
  test("inserts when no row exists", () => {
    expect(publishDecision(undefined, "abc")).toEqual({ kind: "insert" });
  });

  test("no-ops identical bytes on a live row", () => {
    expect(publishDecision({ packetDigest: "abc", revision: 3 }, "abc"))
      .toEqual({ kind: "noop", revision: 3 });
  });

  test("restores a withdrawn row at the same revision on identical bytes", () => {
    expect(publishDecision({ packetDigest: "abc", revision: 2, withdrawnAtMs: 1_000 }, "abc"))
      .toEqual({ kind: "restore", revision: 2 });
  });

  test("bumps revision on changed bytes", () => {
    expect(publishDecision({ packetDigest: "abc", revision: 4 }, "def"))
      .toEqual({ kind: "replace", revision: 5 });
  });

  test("changed bytes on a withdrawn row replace and clear withdrawal", () => {
    expect(publishDecision({ packetDigest: "abc", revision: 4, withdrawnAtMs: 1_000 }, "def"))
      .toEqual({ kind: "replace", revision: 5 });
  });
});
