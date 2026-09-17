import { describe, expect, test } from "bun:test";

import {
  isEntityHandle,
  isPersonHandle as identityIsPersonHandle,
  normalizeEntityHandle,
  normalizePersonHandle as identityNormalizePersonHandle,
  parseSoulscrapeProfileUrl,
  parseWikidataId,
} from "../skills/soulscrape/scripts/people-ontology.ts";
import { isPersonHandle, normalizePersonHandle } from "../skills/soulscrape/scripts/person-index.ts";

function legacyNormalization(value: string): string {
  return value.normalize("NFKD")
    .replace(/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff]/gu, "")
    .toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "");
}

describe("portable entity handles", () => {
  test.each([
    ["Frédéric Chopin", "frederic-chopin"],
    ["Bjo\u0308rk", "bjork"],
    ["D'Angelo", "d-angelo"],
    ["  A  B  ", "a-b"],
    ["Ｆｕｌｌ ① ﬁ", "full-1-fi"],
    ["Straße", "stra-e"],
    ["a\u1ab0b\u1dc0c\u20d0d", "abcd"],
    ["a\ufe20b", "a-b"],
    ["刘德华", ""],
    ["\ud83d\udd25", ""],
    ["a\ud800b", "a-b"],
    ["  _-  ", ""],
    ["a".repeat(65), "a".repeat(65)],
  ])("preserves normalization of %j", (input, expected) => {
    expect(normalizeEntityHandle(input)).toBe(expected);
    expect(normalizePersonHandle(input)).toBe(expected);
    expect(identityNormalizePersonHandle(input)).toBe(expected);
  });

  test("generated Unicode inputs obey legacy and idempotence laws without truncation", () => {
    for (let code = 0; code <= 0x10ffff; code += 997) {
      const input = ` A${String.fromCodePoint(code)}B_-C `;
      const result = normalizeEntityHandle(input);
      expect(result).toBe(legacyNormalization(input));
      expect(normalizePersonHandle(input)).toBe(result);
      expect(normalizeEntityHandle(result)).toBe(result);
      expect(isEntityHandle(result)).toBe(isPersonHandle(result));
      expect(identityIsPersonHandle(result)).toBe(isPersonHandle(result));
    }
  });

  test("validation retains length, case and separator behavior", () => {
    for (const value of ["aa", "a-b", "37signals", "a".repeat(64)]) {
      expect(isEntityHandle(value)).toBe(true);
      expect(isPersonHandle(value)).toBe(true);
    }
    for (const value of ["", "a", "-ab", "ab-", "a--b", "a_b", "Ab", "ab\n", "a".repeat(65), "éé"]) {
      expect(isEntityHandle(value)).toBe(false);
      expect(isPersonHandle(value)).toBe(false);
    }
  });
});

describe("explicit canonical Soulscrape profile locators", () => {
  test.each(["ben", "ben_guo", "ben-guo", "a_b-c", "123", "admin", "a".repeat(24)])(
    "preserves canonical Suite publisher %s without claiming existence",
    username => {
      const profileUrl = `https://soulscrape.com/${username}/example-person`;
      expect(parseSoulscrapeProfileUrl(profileUrl)).toEqual({
        profileUrl, username, handle: "example-person",
      });
    },
  );

  test("accepts the exact maximum locator and minimum handle", () => {
    const username = "a".repeat(24);
    const handle = "b".repeat(64);
    const url = `https://soulscrape.com/${username}/${handle}`;
    expect(url.length).toBe(112);
    expect(parseSoulscrapeProfileUrl(url)?.handle).toBe(handle);
    expect(parseSoulscrapeProfileUrl("https://soulscrape.com/ben/ab")?.handle).toBe("ab");
  });

  test.each([
    "api", "connect", "docs", "about", "sitemap.xml", "robots.txt", "llms.txt",
    "llms-full.txt", "manifest.json", "favicon.ico", "favicon.svg", "opengraph-image",
    "twitter-image", "icon", "apple-icon", "_next",
  ])("rejects reserved route %s", username => {
    expect(parseSoulscrapeProfileUrl(`https://soulscrape.com/${username}/example-person`)).toBeNull();
  });

  test.each([
    "ab", "Ben", "_ben", "ben_", "-ben", "ben-", "a__b", "a--b", "a_-b", "a-_b",
    "a".repeat(25), "bén", "ben.guo", "ben%5fguo", " ben", "ben\t", "ben\n",
  ])("rejects noncanonical publisher %j", username => {
    expect(parseSoulscrapeProfileUrl(`https://soulscrape.com/${username}/example-person`)).toBeNull();
  });

  test.each([
    "http://soulscrape.com/ben/example-person",
    "HTTPS://soulscrape.com/ben/example-person",
    "https://SOULSCRAPE.COM/ben/example-person",
    "https://www.soulscrape.com/ben/example-person",
    "https://soulscrape.com.evil.test/ben/example-person",
    "https://soulscrape.com./ben/example-person",
    "https://soulscrape.com:443/ben/example-person",
    "https://soulscrape.com:444/ben/example-person",
    "https://ben:secret@soulscrape.com/ben/example-person",
    "https://soulscrape.com@evil.test/ben/example-person",
    "https://evil.test@soulscrape.com/ben/example-person",
    "https://soulscrape.com/ben/example-person/",
    "https://soulscrape.com/ben/example-person?",
    "https://soulscrape.com/ben/example-person?x=1",
    "https://soulscrape.com/ben/example-person#",
    "https://soulscrape.com/ben/example-person#x",
    "https://soulscrape.com/ben/example-person.md",
    "https://soulscrape.com/ben/example-person/extra",
    "https://soulscrape.com//ben/example-person",
    "https://soulscrape.com/unused/../ben/example-person",
    "https://soulscrape.com/./ben/example-person",
    "https://soulscrape.com/%2e/ben/example-person",
    "https://soulscrape.com/unused/%2e%2e/ben/example-person",
    "https://soulscrape.com/ben%2fexample-person",
    "https://soulscrape.com/ben/example%2fperson",
    "https://soulscrape.com/ben/example%5cperson",
    "https://soulscrape.com/ben/example%252fperson",
    "https://soulscrape.com/ben/%65xample-person",
    "https://soulscrape.com/ben\\example-person",
    "https:\\soulscrape.com\\ben\\example-person",
    "https://soulscrape.com/ben/example_person",
    "https://soulscrape.com/ben/Example-Person",
    "https://soulscrape.com/ben/a",
    "https://soulscrape.com/ben/" + "a".repeat(65),
    " https://soulscrape.com/ben/example-person",
    "https://soulscrape.com/ben/example-person\n",
    "https://soulscrape.com/ben/example\t-person",
    "https://soulscrape.com/ben/example-person\0",
    "//soulscrape.com/ben/example-person",
    "/ben/example-person",
    "file:///ben/example-person",
  ])("rejects hostile or normalized-away URL %j", value => {
    expect(parseSoulscrapeProfileUrl(value)).toBeNull();
  });

  test("untrusted non-strings are not coerced or dereferenced", () => {
    const coercible = { toString() { throw new Error("must not coerce"); } };
    for (const value of [undefined, null, true, 7, [], {}, coercible, new URL("https://soulscrape.com/ben/example-person")]) {
      expect(parseSoulscrapeProfileUrl(value)).toBeNull();
      expect(parseWikidataId(value)).toBeNull();
    }
  });

  test("generated safe locators round-trip without normalization", () => {
    for (let index = 0; index < 100; index += 1) {
      const username = `user_${index}`;
      const handle = `person-${index}`;
      const profileUrl = `https://soulscrape.com/${username}/${handle}`;
      expect(parseSoulscrapeProfileUrl(profileUrl)).toEqual({ profileUrl, username, handle });
      for (const separator of ["%2f", "%5C", "..", "\\", "\r", "\u2028"]) {
        expect(parseSoulscrapeProfileUrl(profileUrl.replace("/person-", `${separator}person-`))).toBeNull();
      }
    }
  });
});

describe("explicit Wikidata QIDs", () => {
  test.each(["Q1", "Q42", "Q9999999999"])("accepts %s unchanged", value => {
    expect(parseWikidataId(value)).toBe(value);
  });

  test.each([
    "Q0", "Q01", "q42", "Q-1", "Q1.0", "Q1e2", "Q10000000000", "Q４２", "Q", "42",
    " Q42", "Q42 ", "Q42\n", "Q42/", "Q42#x", "https://www.wikidata.org/wiki/Q42",
  ])("rejects noncanonical QID %j", value => {
    expect(parseWikidataId(value)).toBeNull();
  });
});
