import { describe, expect, test } from "bun:test";
import { readdirSync } from "node:fs";
import { join } from "node:path";

import {
  PacketValidationError,
  canonicalPersonSourceUrl,
  isPersonHandle,
  normalizePersonHandle,
  parsePersonIndex,
  personIndexDigest,
  stablePersonSourceId,
} from "../skills/soulscrape/scripts/person-index.ts";
import { sha256Hex } from "../skills/soulscrape/scripts/sha256.ts";
import { validatePersonIndexFile } from "../skills/soulscrape/scripts/validate-person-index.ts";

const encoder = new TextEncoder();

describe("sha256Hex", () => {
  test("known-answer vectors", () => {
    expect(sha256Hex(encoder.encode(""))).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
    expect(sha256Hex(encoder.encode("abc"))).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
    expect(
      sha256Hex(
        encoder.encode(
          "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq",
        ),
      ),
    ).toBe(
      "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1",
    );
  });
});

describe("normalizePersonHandle", () => {
  test("normalizes names", () => {
    expect(normalizePersonHandle("Jean-Luc Picard")).toBe("jean-luc-picard");
    expect(normalizePersonHandle("Frédéric Chopin")).toBe("frederic-chopin");
    expect(normalizePersonHandle("Björk")).toBe("bjork");
    expect(normalizePersonHandle("D'Angelo")).toBe("d-angelo");
    expect(normalizePersonHandle("  A  B  ")).toBe("a-b");
    expect(normalizePersonHandle("Mary J. Blige")).toBe("mary-j-blige");
    expect(normalizePersonHandle("O'Malley-Smith")).toBe("o-malley-smith");
    expect(normalizePersonHandle("Eugene Tssui")).toBe("eugene-tssui");
  });

  test("rejects non-latin names without a romanized handle", () => {
    expect(normalizePersonHandle("刘德华")).toBe("");
    expect(normalizePersonHandle("🔥")).toBe("");
  });

  test("isPersonHandle bounds", () => {
    expect(isPersonHandle("eugene-tssui")).toBe(true);
    expect(isPersonHandle("a")).toBe(false);
    expect(isPersonHandle("-abc")).toBe(false);
    expect(isPersonHandle("abc-")).toBe(false);
    expect(isPersonHandle("a--b")).toBe(false);
    expect(isPersonHandle("a".repeat(65))).toBe(false);
    expect(isPersonHandle("UPPER")).toBe(false);
  });
});

describe("canonicalPersonSourceUrl", () => {
  test("strips tracking parameters and fragments", () => {
    expect(
      canonicalPersonSourceUrl(
        "https://Example.com/page/?utm_source=x&b=2&a=1#frag",
      ),
    ).toBe("https://example.com/page/?a=1&b=2");
  });
  test("maps youtu.be to the canonical watch URL", () => {
    expect(canonicalPersonSourceUrl("https://youtu.be/JNk2J6R7A-0")).toBe(
      "https://www.youtube.com/watch?v=JNk2J6R7A-0",
    );
  });
  test("drops extra watch parameters on youtube", () => {
    expect(
      canonicalPersonSourceUrl(
        "https://www.youtube.com/watch?v=JNk2J6R7A-0&list=PL123&t=10",
      ),
    ).toBe("https://www.youtube.com/watch?v=JNk2J6R7A-0");
  });
  test("lowercases the host and removes the default port", () => {
    expect(canonicalPersonSourceUrl("HTTPS://KQED.ORG:443/a")).toBe(
      "https://kqed.org/a",
    );
  });
});

describe("stablePersonSourceId", () => {
  test("is deterministic and date-sensitive", () => {
    const url = "https://example.com/a";
    const first = stablePersonSourceId(url, "2025-01-01");
    expect(first).toBe(stablePersonSourceId(url, "2025-01-01"));
    expect(first).not.toBe(stablePersonSourceId(url, "2025-01-02"));
    expect(first).not.toBe(stablePersonSourceId(url, undefined));
    expect(first).toMatch(/^source-[a-f0-9]{20}$/u);
  });
  test("equivalent URLs derive the same id", () => {
    expect(
      stablePersonSourceId("https://youtu.be/JNk2J6R7A-0", "2024-11-05"),
    ).toBe(
      stablePersonSourceId(
        "https://www.youtube.com/watch?v=JNk2J6R7A-0",
        "2024-11-05",
      ),
    );
  });
});

function minimalPacket(): Record<string, unknown> {
  const url = "https://eugenetssui.com/about";
  return {
    schemaVersion: "soulscrape.person-index.v1",
    indexId: "pidx-eugene-tssui",
    generatedAt: "2026-02-01T00:00:00Z",
    subject: {
      kind: "person",
      handle: "eugene-tssui",
      displayName: "Eugene Tssui",
      summary: "American architect working in evolutionary design.",
    },
    scope: { asOf: "2026-01-15T00:00:00Z" },
    sources: [
      {
        id: stablePersonSourceId(url, undefined),
        binding: "subject_controlled",
        mediaType: "webpage",
        title: "About Eugene Tssui",
        url,
        publisher: "eugenetssui.com",
        accessedAt: "2026-01-10T00:00:00Z",
      },
    ],
    claims: [
      {
        id: "claim-architect",
        kind: "fact",
        text: "Tssui is an architect based in the San Francisco Bay Area.",
        sourceIds: [stablePersonSourceId(url, undefined)],
      },
    ],
    body: "A public-source index of Eugene Tssui's work and ideas. ".repeat(6),
    provenance: { tool: "soulscrape" },
  };
}

describe("parsePersonIndex", () => {
  test("accepts a minimal valid packet and returns a digest-stable view", () => {
    const packet = parsePersonIndex(minimalPacket());
    expect(packet.subject.handle).toBe("eugene-tssui");
    expect(personIndexDigest(packet)).toMatch(/^[a-f0-9]{64}$/u);
  });

  test("rejects an unknown member", () => {
    const packet = { ...minimalPacket(), surprise: true };
    expect(() => parsePersonIndex(packet)).toThrow(PacketValidationError);
  });

  test("rejects a non-normalized handle", () => {
    const packet = minimalPacket();
    (packet.subject as Record<string, unknown>).handle = "Eugene Tssui";
    expect(() => parsePersonIndex(packet)).toThrow(/subject\.handle/u);
  });

  test("rejects a source id that does not match canonical identity", () => {
    const packet = minimalPacket();
    const source = (packet.sources as Record<string, unknown>[])[0]!;
    source.id = "source-00000000000000000000";
    expect(() => parsePersonIndex(packet)).toThrow(/sources\[0\]\.id/u);
  });

  test("rejects a dangling sourceIds reference", () => {
    const packet = minimalPacket();
    const claim = (packet.claims as Record<string, unknown>[])[0]!;
    claim.sourceIds = ["source-ffffffffffffffffffff"];
    expect(() => parsePersonIndex(packet)).toThrow(/unknown source/u);
  });

  test("rejects a claim without sourceIds", () => {
    const packet = minimalPacket();
    const claim = (packet.claims as Record<string, unknown>[])[0]!;
    claim.sourceIds = [];
    expect(() => parsePersonIndex(packet)).toThrow(/sourceIds/u);
  });

  test("rejects scope.asOf later than generatedAt", () => {
    const packet = minimalPacket();
    (packet.scope as Record<string, unknown>).asOf = "2027-01-01T00:00:00Z";
    expect(() => parsePersonIndex(packet)).toThrow(/scope\.asOf/u);
  });

  test("rejects a transcriptOf that references a missing source", () => {
    const packet = minimalPacket();
    const source = (packet.sources as Record<string, unknown>[])[0]!;
    source.transcriptOf = "source-1234567890abcdef12";
    expect(() => parsePersonIndex(packet)).toThrow(/transcriptOf/u);
  });

  test("accepts a full packet with every collection", () => {
    const url = "https://eugenetssui.com/about";
    const sourceId = stablePersonSourceId(url, undefined);
    const packet = {
      ...minimalPacket(),
      timeline: [
        {
          id: "event-born",
          kind: "birth",
          date: "1954-09-14",
          title: "Born in Cleveland, Ohio",
          sourceIds: [sourceId],
        },
      ],
      themes: [
        {
          id: "theme-nature",
          kind: "philosophy",
          status: "stated",
          title: "Nature as teacher",
          summary: "Design learns from biological structures.",
          sourceIds: [sourceId],
        },
      ],
      works: [
        {
          id: "work-fish-house",
          kind: "building",
          status: "completed",
          title: "Ojo del Sol (Fish House)",
          location: "Berkeley, California",
          sourceIds: [sourceId],
        },
      ],
      appearances: [
        {
          id: "appearance-pin-up",
          title: "PIN–UP interview",
          venue: "PIN–UP Magazine",
          media: [
            {
              type: "article",
              url: "https://archive.pinupmagazine.org/articles/x",
              sourceId,
            },
          ],
          sourceIds: [sourceId],
        },
      ],
      relations: [
        {
          id: "rel-alexander",
          kind: "influenced_by",
          target: "christopher-alexander",
          targetName: "Christopher Alexander",
          note: "Tssui cites Alexander's pattern language as formative.",
          sourceIds: [sourceId],
        },
        {
          id: "rel-ecology",
          kind: "employed_by",
          target: "california-department-of-fish-and-game",
          targetName: "California Department of Fish and Game",
          targetKind: "organization",
          start: "1976",
          end: "1980",
          targetWikidataId: "Q1990346",
          sourceIds: [sourceId],
        },
      ],
      openQuestions: ["Exact construction dates for early projects."],
    };
    const parsed = parsePersonIndex(packet);
    expect(parsed.timeline?.length).toBe(1);
    expect(parsed.themes?.[0]?.kind).toBe("philosophy");
    expect(parsed.appearances?.[0]?.media?.[0]?.type).toBe("article");
    expect(parsed.relations?.length).toBe(2);
    expect(parsed.relations?.[0]?.kind).toBe("influenced_by");
    expect(parsed.relations?.[1]?.start).toBe("1976");
    expect(parsed.relations?.[1]?.end).toBe("1980");
    expect(parsed.relations?.[1]?.targetWikidataId).toBe("Q1990346");
  });

  test("accepts organizationHandle on timeline events and rejects malformed values", () => {
    const url = "https://eugenetssui.com/about";
    const sourceId = stablePersonSourceId(url, undefined);
    const event = {
      id: "event-x",
      kind: "role",
      date: "1980",
      title: "Joined the firm",
      organization: "Example Org",
      organizationHandle: "example-org",
      sourceIds: [sourceId],
    };
    const ok = parsePersonIndex({ ...minimalPacket(), timeline: [event] });
    expect(ok.timeline?.[0]?.organizationHandle).toBe("example-org");
    const bad = { ...minimalPacket(), timeline: [{ ...event, organizationHandle: "Example Org" }] };
    expect(() => parsePersonIndex(bad)).toThrow(/timeline\[0\]\.organizationHandle/u);
  });

  test("rejects relation end before start and malformed targetWikidataId", () => {
    const url = "https://eugenetssui.com/about";
    const sourceId = stablePersonSourceId(url, undefined);
    const base = {
      id: "rel-x",
      kind: "member_of",
      target: "the-sugarcubes",
      targetName: "The Sugarcubes",
      targetKind: "organization",
      sourceIds: [sourceId],
    };
    const reversed = { ...minimalPacket(), relations: [{ ...base, start: "1992", end: "1986" }] };
    expect(() => parsePersonIndex(reversed)).toThrow(/must not precede start/u);
    const badQid = { ...minimalPacket(), relations: [{ ...base, targetWikidataId: "the-sugarcubes" }] };
    expect(() => parsePersonIndex(badQid)).toThrow(/targetWikidataId/u);
  });

  test("accepts the mentorship and signing relation kinds", () => {
    const url = "https://eugenetssui.com/about";
    const sourceId = stablePersonSourceId(url, undefined);
    const packet = {
      ...minimalPacket(),
      relations: [
        { id: "rel-1", kind: "mentored_by", target: "bruce-goff", targetName: "Bruce Goff", sourceIds: [sourceId] },
        { id: "rel-2", kind: "mentored", target: "a-student", targetName: "A Student", sourceIds: [sourceId] },
        { id: "rel-3", kind: "signed_to", target: "a-label", targetName: "A Label", targetKind: "organization", sourceIds: [sourceId] },
        { id: "rel-4", kind: "signed", target: "an-artist", targetName: "An Artist", sourceIds: [sourceId] },
      ],
    };
    const parsed = parsePersonIndex(packet);
    expect(parsed.relations?.map((r) => r.kind)).toEqual(["mentored_by", "mentored", "signed_to", "signed"]);
  });

  test("rejects a relation with a non-normalized target", () => {
    const url = "https://eugenetssui.com/about";
    const sourceId = stablePersonSourceId(url, undefined);
    const packet = {
      ...minimalPacket(),
      relations: [
        {
          id: "rel-alexander",
          kind: "influenced_by",
          target: "Christopher Alexander",
          targetName: "Christopher Alexander",
          sourceIds: [sourceId],
        },
      ],
    };
    expect(() => parsePersonIndex(packet)).toThrow(/relations\[0\]\.target/u);
  });

  test("rejects a relation with an unknown kind", () => {
    const url = "https://eugenetssui.com/about";
    const sourceId = stablePersonSourceId(url, undefined);
    const packet = {
      ...minimalPacket(),
      relations: [
        {
          id: "rel-x",
          kind: "friends_with",
          target: "someone-else",
          targetName: "Someone Else",
          sourceIds: [sourceId],
        },
      ],
    };
    expect(() => parsePersonIndex(packet)).toThrow(/relations\[0\]\.kind/u);
  });

  test("rejects a relation with a dangling sourceIds reference", () => {
    const packet = {
      ...minimalPacket(),
      relations: [
        {
          id: "rel-x",
          kind: "collaborated",
          target: "someone-else",
          targetName: "Someone Else",
          sourceIds: ["source-ffffffffffffffffffff"],
        },
      ],
    };
    expect(() => parsePersonIndex(packet)).toThrow(/unknown source/u);
  });

  test("rejects a relation with a duplicate id", () => {
    const url = "https://eugenetssui.com/about";
    const sourceId = stablePersonSourceId(url, undefined);
    const relation = {
      id: "rel-x",
      kind: "collaborated",
      target: "someone-else",
      targetName: "Someone Else",
      sourceIds: [sourceId],
    };
    const packet = { ...minimalPacket(), relations: [relation, { ...relation, target: "another-one" }] };
    expect(() => parsePersonIndex(packet)).toThrow(/duplicates another relation id/u);
  });

  test("rejects floating-point and non-JSON values", () => {
    const packet = minimalPacket();
    (packet.subject as Record<string, unknown>).summary = 1.5;
    expect(() => parsePersonIndex(packet)).toThrow(PacketValidationError);
  });
});

describe("the checked-in example packets", () => {
  const examplesDir = new URL("../examples/people/", import.meta.url).pathname;
  const handles = readdirSync(examplesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  test("discovers the example set", () => {
    expect(handles.length).toBeGreaterThanOrEqual(7);
    expect(handles).toContain("eugene-tssui");
  });

  for (const handle of handles) {
    test(`${handle} validates end to end`, () => {
      const receipt = validatePersonIndexFile(
        join(examplesDir, handle, "person-index.json"),
      );
      expect(receipt.handle).toBe(handle);
      expect(receipt.counts.sources).toBeGreaterThanOrEqual(10);
      expect(receipt.packetDigest).toMatch(/^[a-f0-9]{64}$/u);
    });
  }
});
