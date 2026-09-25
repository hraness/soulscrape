import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { parsePersonIndex } from "../../skills/soulscrape/scripts/person-index";
import { strictJsonParse } from "../../skills/soulscrape/scripts/source-packet";

import { describe as describeText } from "../lib/metadata";
import {
  profileCanonicalUrl,
  profileDescription,
  profileJsonLd,
  profileJsonLdText,
  profileTitle,
  publicRowToProfile,
  sortedTimeline,
  type StoredProfile,
} from "../lib/profile-view";
import { createProfileResolver } from "../lib/profile-identity";
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

  test("JSON-LD embedding cannot break out of its script element", () => {
    const displayName = "Example </script><script>globalThis.__testMarker = 1</script>";
    const hostile = { ...stored, packet: parsePersonIndex({ ...packet, subject: { ...packet.subject, displayName } }) };
    const serialized = profileJsonLdText(hostile);
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual(profileJsonLd(hostile));
    const types: (string | null)[] = [];
    new HTMLRewriter().on("script", { element(element) { types.push(element.getAttribute("type")); } })
      .transform(`<script type="application/ld+json">${serialized}</script>`);
    expect(types).toEqual(["application/ld+json"]);
    const source = readFileSync(join(import.meta.dir, "../app/[username]/[handle]/page.tsx"), "utf8");
    expect(source).toContain("__html: profileJsonLdText(");
    expect(source).not.toContain("__html: JSON.stringify(");
  });

  test("JSON-LD maps relations to schema.org props and links live targets", () => {
    const sourceId = packet.sources[0]!.id;
    const withRelations = parsePersonIndex({
      ...JSON.parse(JSON.stringify(packet)),
      relations: [
        {
          id: "rel-alexander",
          kind: "influenced_by",
          target: "christopher-alexander",
          targetName: "Christopher Alexander",
          sourceIds: [sourceId],
        },
        {
          id: "rel-employer",
          kind: "employed_by",
          target: "some-organization",
          targetName: "Some Organization",
          targetKind: "organization",
          sourceIds: [sourceId],
        },
        {
          id: "rel-unlinked",
          kind: "collaborated",
          target: "not-indexed-person",
          targetName: "Not Indexed Person",
          sourceIds: [sourceId],
        },
      ],
    });
    const ld = profileJsonLd(
      { ...stored, packet: withRelations },
      createProfileResolver([{ username: stored.username, handle: "christopher-alexander", subjectKind: "person" }]),
    ) as { mainEntity: Record<string, unknown> };
    const knows = ld.mainEntity.knows as { name: string; url?: string }[];
    expect(knows[0]?.name).toBe("Christopher Alexander");
    expect(knows[0]?.url).toBe("https://soulscrape.com/ben_guo/christopher-alexander");
    const worksFor = ld.mainEntity.worksFor as { "@type": string; name: string }[];
    expect(worksFor[0]?.["@type"]).toBe("Organization");
    expect(worksFor[0]?.name).toBe("Some Organization");
    const colleague = ld.mainEntity.colleague as { name: string; url?: string }[];
    expect(colleague[0]?.name).toBe("Not Indexed Person");
    expect(colleague[0]?.url).toBeUndefined();
  });

  test("JSON-LD target types use supplied or resolved kinds, never a guessed person", () => {
    const withRelations = parsePersonIndex({
      ...packet,
      relations: [
        { id: "rel-funder", kind: "funded_by", target: "fund-alias", targetWikidataId: "Q123", targetName: "Authored Fund", sourceIds: [packet.sources[0]!.id] },
        { id: "rel-unknown", kind: "funded_by", target: "unindexed-funder", targetName: "Unknown Funder", sourceIds: [packet.sources[0]!.id] },
        { id: "rel-collaboration", kind: "collaborated", target: "known-fund", targetName: "Known Fund", sourceIds: [packet.sources[0]!.id] },
      ],
    });
    const resolve = createProfileResolver([{ username: stored.username, handle: "known-fund", subjectKind: "organization", wikidataId: "Q123" }]);
    const ld = profileJsonLd({ ...stored, packet: withRelations }, resolve) as { mainEntity: Record<string, unknown> };
    expect(ld.mainEntity.funder).toEqual([
      { "@type": "Organization", name: "Authored Fund", url: "https://soulscrape.com/ben_guo/known-fund", sameAs: "https://www.wikidata.org/wiki/Q123" },
      { name: "Unknown Funder" },
    ]);
    expect(ld.mainEntity.colleague).toBeUndefined();
  });

  test("JSON-LD maps org-subject relations by direction", () => {
    const sourceId = packet.sources[0]!.id;
    const orgPacket = parsePersonIndex({
      ...JSON.parse(JSON.stringify(packet)),
      subject: { ...packet.subject, kind: "organization" },
      relations: [
        {
          id: "rel-founder",
          kind: "founded_by",
          target: "some-founder",
          targetName: "Some Founder",
          sourceIds: [sourceId],
        },
        {
          id: "rel-member",
          kind: "member",
          target: "some-member",
          targetName: "Some Member",
          sourceIds: [sourceId],
        },
        {
          id: "rel-employee",
          kind: "employed",
          target: "some-employee",
          targetName: "Some Employee",
          sourceIds: [sourceId],
        },
        {
          id: "rel-backer",
          kind: "funded_by",
          target: "some-fund",
          targetName: "Some Fund",
          targetKind: "organization",
          sourceIds: [sourceId],
        },
        {
          id: "rel-investment",
          kind: "invested_in",
          target: "some-startup",
          targetName: "Some Startup",
          targetKind: "organization",
          sourceIds: [sourceId],
        },
      ],
    });
    const ld = profileJsonLd({ ...stored, packet: orgPacket }) as {
      mainEntity: Record<string, unknown>;
    };
    expect(ld.mainEntity["@type"]).toBe("Organization");
    expect((ld.mainEntity.founder as { name: string }[])[0]?.name).toBe("Some Founder");
    expect((ld.mainEntity.member as { name: string }[])[0]?.name).toBe("Some Member");
    expect((ld.mainEntity.employee as { name: string }[])[0]?.name).toBe("Some Employee");
    expect((ld.mainEntity.funder as { "@type": string }[])[0]?.["@type"]).toBe("Organization");
    // invested_in has no clean Schema.org counterpart — must not leak through.
    expect(ld.mainEntity.funding).toBeUndefined();
  });

  test("JSON-LD omits mentorship and signing edges (no Schema.org counterpart)", () => {
    const sourceId = packet.sources[0]!.id;
    const withRelations = parsePersonIndex({
      ...JSON.parse(JSON.stringify(packet)),
      relations: [
        {
          id: "rel-mentor",
          kind: "mentored_by",
          target: "a-mentor",
          targetName: "A Mentor",
          sourceIds: [sourceId],
        },
        {
          id: "rel-label",
          kind: "signed_to",
          target: "a-label",
          targetName: "A Label",
          targetKind: "organization",
          sourceIds: [sourceId],
        },
        {
          id: "rel-spinoff",
          kind: "spun_off",
          target: "a-spinoff",
          targetName: "A Spinoff",
          targetKind: "organization",
          sourceIds: [sourceId],
        },
        {
          id: "rel-acquired",
          kind: "acquired",
          target: "an-acquiree",
          targetName: "An Acquiree",
          targetKind: "organization",
          sourceIds: [sourceId],
        },
        {
          id: "rel-manager",
          kind: "managed_by",
          target: "a-manager",
          targetName: "A Manager",
          sourceIds: [sourceId],
        },
      ],
    });
    const ld = profileJsonLd({ ...stored, packet: withRelations }) as {
      mainEntity: Record<string, unknown>;
    };
    expect(ld.mainEntity.knows).toBeUndefined();
    expect(ld.mainEntity.memberOf).toBeUndefined();
    expect(ld.mainEntity.worksFor).toBeUndefined();
  });

  test("JSON-LD maps person member_of and funded_by edges", () => {
    const sourceId = packet.sources[0]!.id;
    const withRelations = parsePersonIndex({
      ...JSON.parse(JSON.stringify(packet)),
      relations: [
        {
          id: "rel-band",
          kind: "member_of",
          target: "some-band",
          targetName: "Some Band",
          targetKind: "organization",
          sourceIds: [sourceId],
        },
        {
          id: "rel-backer",
          kind: "funded_by",
          target: "some-patron",
          targetName: "Some Patron",
          sourceIds: [sourceId],
        },
      ],
    });
    const ld = profileJsonLd({ ...stored, packet: withRelations }) as {
      mainEntity: Record<string, unknown>;
    };
    const memberOf = ld.mainEntity.memberOf as { "@type": string; name: string }[];
    expect(memberOf[0]?.["@type"]).toBe("Organization");
    expect(memberOf[0]?.name).toBe("Some Band");
    const funder = ld.mainEntity.funder as { name: string }[];
    expect(funder[0]?.name).toBe("Some Patron");
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

describe("descriptions cut from longer text", () => {
  test("keep whole sentences that fit, then fall back to a word boundary", () => {
    const summary = "Icelandic musician, composer, and producer. She sang with the Sugarcubes and released ten solo albums. She was early to new formats.";
    expect(describeText(summary, 200)).toBe(summary);
    expect(describeText(summary, 110)).toBe("Icelandic musician, composer, and producer. She sang with the Sugarcubes and released ten solo albums.");
    const long = "Puerto Rican rapper, singer, and producer who went from uploading songs to SoundCloud while bagging groceries to the top of the charts";
    const cut = describeText(long, 60);
    expect(cut.length).toBeLessThanOrEqual(60);
    expect(cut.endsWith("…")).toBe(true);
    expect(cut).not.toMatch(/[.,;:]…$/u);
    expect(long.startsWith(cut.slice(0, -1))).toBe(true);
    expect(long.charAt(cut.length - 1)).toBe(" ");
  });

  test("profile titles name the brand once and descriptions fit search snippets", () => {
    const packet = parsePersonIndex(strictJsonParse(readFileSync(join(import.meta.dir, "../../examples/people/bad-bunny/person-index.json"))));
    const profile = { username: "ben", handle: "bad-bunny", packet, packetDigest: "0".repeat(64), revision: 1 } as StoredProfile;
    expect(profileTitle(profile)).toBe("Bad Bunny · @ben · Soulscrape");
    const description = profileDescription(profile);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(packet.subject.summary.startsWith(description.replace(/…$/u, ""))).toBe(true);
  });
});
