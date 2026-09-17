import { describe, expect, test } from "bun:test";

import { parseSoulscrapeProfileUrl, parseWikidataId } from "../skills/soulscrape/scripts/people-ontology.ts";

const profileUrl = "https://soulscrape.com/ben_guo/eugene-tssui";

describe("public locator boundary conformance", () => {
  test("explicit locators retain the verified publisher namespace", () => {
    expect(parseSoulscrapeProfileUrl(profileUrl)).toMatchObject({ username: "ben_guo", handle: "eugene-tssui" });
    expect(parseWikidataId("Q5407800")).toBe("Q5407800");
  });

  test("URL and identifier parsers reject all trailing line terminators", () => {
    for (const suffix of ["\n", "\r", "\r\n", "\u2028", "\u2029", "\t", " "]) {
      expect(parseSoulscrapeProfileUrl(profileUrl + suffix)).toBeNull();
      expect(parseWikidataId("Q5407800" + suffix)).toBeNull();
    }
  });

  test("matching a public handle does not justify accepting another authority", () => {
    for (const value of [
      "https://soulscrape.com.evil.example/ben_guo/eugene-tssui",
      "https://soulscrape.com@evil.example/ben_guo/eugene-tssui",
      "https://soulscrape.com/ben_guo/eugene-tssui?token=example",
      "https://soulscrape.com/ben_guo/eugene-tssui#claim",
      "https://soulscrape.com/ben_guo/./eugene-tssui",
      "https://soulscrape.com/ben_guo/%65ugene-tssui",
    ]) expect(parseSoulscrapeProfileUrl(value)).toBeNull();
  });
});
