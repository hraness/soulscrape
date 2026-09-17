import { afterEach, describe, expect, spyOn, test } from "bun:test";
import { ConvexHttpClient } from "convex/browser";
import { renderToStaticMarkup } from "react-dom/server";

import { parsePersonIndex, personIndexDigest, stablePersonSourceId, type PersonIndex } from "../../skills/soulscrape/scripts/person-index";
import PersonPage from "../app/[username]/[handle]/page";
import { relationsByUsername } from "../convex/people";
import { convexApi } from "../lib/convex";
import { corpusGraph, type PublicGraphRow } from "../lib/corpus-graph";

const originalConvexUrl = process.env.CONVEX_URL;
const sourceIds = [stablePersonSourceId("https://example.com/record", undefined)];

afterEach(() => {
  if (originalConvexUrl === undefined) delete process.env.CONVEX_URL;
  else process.env.CONVEX_URL = originalConvexUrl;
  spyOn(ConvexHttpClient.prototype, "query").mockRestore();
});

function packet(handle: string, extra: Partial<PersonIndex> = {}): PersonIndex {
  return parsePersonIndex({
    schemaVersion: "soulscrape.person-index.v1",
    indexId: `pidx-${handle}`,
    generatedAt: "2025-02-01T00:00:00Z",
    subject: { kind: "person", handle, displayName: handle, summary: "A synthetic public subject for identity resolution checks." },
    scope: { asOf: "2025-01-01T00:00:00Z" },
    sources: [{ id: sourceIds[0], binding: "primary_record", mediaType: "article", title: "Public fixture", url: "https://example.com/record", publisher: "Fixture", accessedAt: "2025-01-01T00:00:00Z" }],
    claims: [],
    body: "This is a synthetic public account used only for deterministic identity and source-link tests. It preserves authored statements, labels and source references while checking that local links never assert an unsupported profile binding.",
    provenance: { tool: "fixture" },
    ...extra,
  });
}

function target(handle: string, kind: "person" | "organization", wikidataId?: string): PersonIndex {
  return packet(handle, { subject: {
    kind, handle, displayName: handle, summary: "A synthetic public target for identity checks.",
    ...(wikidataId === undefined ? {} : { identity: { wikidataId } }),
  } });
}

function stored(value: PersonIndex, username = "publisher") {
  return { username, handle: value.subject.handle, displayName: value.subject.displayName, summary: value.subject.summary,
    packet: value, packetDigest: personIndexDigest(value), revision: 1, publishedAtMs: 100, updatedAtMs: 100 };
}

function graphRow(value: PersonIndex, username = "publisher"): PublicGraphRow {
  return { ...stored(value, username), subjectKind: value.subject.kind,
    ...(value.subject.identity?.wikidataId === undefined ? {} : { wikidataId: value.subject.identity.wikidataId }),
    relations: value.relations ?? [],
    timeline: (value.timeline ?? []).filter(event => event.organizationHandle !== undefined).map(event => ({ ...event, organizationHandle: event.organizationHandle! })),
    appearances: (value.appearances ?? []).map(appearance => ({ ...appearance, participantHandles: appearance.participantHandles ?? [] })),
  };
}

async function projection(values: PersonIndex[]) {
  let limit: number | undefined;
  const db = { query: () => ({ withIndex: () => ({ take: async (count: number) => {
    limit = count;
    return values.map(value => stored(value));
  } }) }) };
  const handler = (relationsByUsername as unknown as { _handler: (ctx: { db: typeof db }, args: { username: string }) => Promise<unknown[]> })._handler;
  const rows = await handler({ db }, { username: "publisher" });
  expect(limit).toBe(200);
  return rows;
}

async function render(value: PersonIndex, rows: unknown[]) {
  process.env.CONVEX_URL = "https://synthetic-test.convex.cloud";
  spyOn(ConvexHttpClient.prototype, "query").mockImplementation(async (...args) => {
    const reference = args[0];
    if (reference === convexApi.peopleGetPublic) return stored(value);
    if (reference === convexApi.peopleRelationsByUsername) return rows;
    throw new Error("unexpected query");
  });
  return renderToStaticMarkup(await PersonPage({ params: Promise.resolve({ username: "publisher", handle: value.subject.handle }) }));
}

function links(html: string, selector: string) {
  const values: string[] = [];
  new HTMLRewriter().on(selector, { element(element) { values.push(element.getAttribute("href") ?? ""); } }).transform(html);
  return values;
}

function jsonLd(html: string): { mainEntity: Record<string, { url?: string; sameAs?: string; name: string }[]> } {
  const json = html.split('<script type="application/ld+json">')[1]!.split("</script>")[0]!;
  return JSON.parse(json);
}

describe("profile links share graph identity resolution", () => {
  for (const [name, targets, destination] of [
    ["conflicting QID", [target("target-person", "person", "Q999")], null],
    ["conflicting kind", [target("target-person", "organization", "Q123")], null],
    ["ambiguous QID", [target("target-person", "person", "Q123"), target("duplicate-person", "person", "Q123")], null],
    ["duplicate locator", [target("target-person", "person", "Q123"), target("target-person", "person", "Q999")], null],
    ["unique QID alias", [target("canonical-person", "person", "Q123")], "canonical-person"],
    ["missing asserted QID", [target("target-person", "person")], null],
  ] as const) {
    test(`${name}: graph, HTML, backlinks and JSON-LD agree`, async () => {
      const source = packet("source-person", { relations: [{ id: "rel-one", kind: "collaborated", target: "target-person", targetName: "Authored target", targetKind: "person", targetWikidataId: "Q123", note: "Authored statement.", sourceIds }] });
      const values = [source, ...targets];
      const rows = await projection(values);
      const graph = await corpusGraph(values.map(value => graphRow(value)));
      expect(graph.edges[0]?.resolution === "external").toBe(destination === null);
      const html = await render(source, rows);
      expect(links(html, '.relations a[href^="/publisher/"]')).toEqual(destination === null ? [] : [`/publisher/${destination}`]);
      expect(html).toContain("Authored statement.");
      expect(links(html, 'section[aria-labelledby="relations-heading"] .source-refs a')).toEqual(["#source-1"]);
      const entity = jsonLd(html).mainEntity.colleague![0]!;
      expect(entity.url).toBe(destination === null ? undefined : `https://soulscrape.com/publisher/${destination}`);
      expect(entity.sameAs).toBe("https://www.wikidata.org/wiki/Q123");
      expect(entity.name).toBe("Authored target");
      for (const value of targets) {
        const inbound = await render(value, rows);
        expect(links(inbound, 'section[aria-labelledby="inbound-heading"] a')).toEqual(value.subject.handle === destination
          ? ["/publisher/source-person", "/publisher/source-person"] : []);
      }
    });
  }

  test("timeline organization mismatches and appearance participants use the same live context", async () => {
    const source = packet("source-person", {
      timeline: ["person-target", "org-target"].map((handle, index) => ({ id: `event-${index}`, kind: "role", date: "2020", title: `Authored role ${index}`, organization: handle, organizationHandle: handle, sourceIds })),
      appearances: [{ id: "appearance-one", title: "Public conversation", participants: ["Guest", "Self"], participantHandles: [{ name: "Guest", handle: "person-target" }, { name: "Self", handle: "source-person" }], sourceIds }],
    });
    const person = target("person-target", "person");
    const org = target("org-target", "organization");
    const values = [source, person, org];
    const rows = await projection(values);
    const graph = await corpusGraph(values.map(value => graphRow(value)));
    expect(graph.edges.map(edge => edge.to)).toEqual(["slug:publisher/person-target:organization", "publisher/org-target", "publisher/person-target"]);
    const html = await render(source, rows);
    expect(links(html, 'section[aria-labelledby="timeline-heading"] a[href^="/publisher/"]')).toEqual(["/publisher/org-target"]);
    expect(links(html, ".participants a")).toEqual(["/publisher/person-target"]);
    const personHtml = await render(person, rows);
    expect(personHtml).not.toContain("Authored role 0");
    expect(personHtml).toContain("Public conversation");
    expect(await render(org, rows)).toContain("Authored role 1");
  });

  test("older identity-less query rows cannot authorize links or backlinks", async () => {
    const source = packet("source-person", { relations: [{ id: "rel-one", kind: "collaborated", target: "target-person", targetName: "Target", sourceIds }] });
    const person = target("target-person", "person");
    const rows = [source, person].map(value => ({ handle: value.subject.handle, displayName: value.subject.displayName, relations: value.relations ?? [] }));
    const html = await render(source, rows);
    expect(links(html, '.relations a[href^="/publisher/"]')).toEqual([]);
    expect(jsonLd(html).mainEntity.colleague![0]!.url).toBeUndefined();
    expect(links(await render(person, rows), 'section[aria-labelledby="inbound-heading"] a')).toEqual([]);
  });

  test("partially upgraded identity context remains external and over-limit context is rejected", async () => {
    const source = packet("source-person", { relations: [{ id: "rel-one", kind: "collaborated", target: "target-person", targetName: "Target", targetWikidataId: "Q123", sourceIds }] });
    const person = target("target-person", "person", "Q123");
    const rows = (await projection([source, person])) as Record<string, unknown>[];
    const incomplete = rows.map(row => ({ ...row, subjectKind: undefined }));
    const graph = await corpusGraph([source, person].map(value => ({ ...graphRow(value), subjectKind: undefined })));
    expect(graph.edges[0]?.resolution).toBe("external");
    for (const context of [incomplete, Array.from({ length: 201 }, () => rows[1])]) {
      const html = await render(source, context);
      expect(links(html, '.relations a[href^="/publisher/"]')).toEqual([]);
      expect(jsonLd(html).mainEntity.colleague![0]!.url).toBeUndefined();
      expect(links(await render(person, context), 'section[aria-labelledby="inbound-heading"] a')).toEqual([]);
    }
  });

  test("a different publisher never supplies a local slug or QID binding", async () => {
    const source = packet("source-person", { relations: [{ id: "rel-one", kind: "collaborated", target: "target-person", targetName: "Target", targetWikidataId: "Q123", sourceIds }] });
    const person = target("target-person", "person", "Q123");
    const rows = [...await projection([source]), { ...graphRow(person), username: "foreign" }];
    const graph = await corpusGraph([graphRow(source), graphRow(person, "foreign")]);
    expect(graph.edges[0]?.resolution).toBe("external");
    const html = await render(source, rows);
    expect(links(html, '.relations a[href^="/"]')).toEqual([]);
    expect(jsonLd(html).mainEntity.colleague![0]!.url).toBeUndefined();
  });

  test("per-publisher projection retains identity, kinds, authored ids and evidence without altering packets", async () => {
    const source = packet("source-person", {
      subject: target("source-person", "person", "Q100").subject,
      relations: [{ id: "rel-one", kind: "employed_by", target: "org-target", targetName: "Organization", targetKind: "organization", targetWikidataId: "Q200", sourceIds }],
      timeline: [{ id: "event-one", kind: "role", date: "2020", title: "Role", organizationHandle: "org-target", sourceIds }],
      appearances: [{ id: "appearance-one", title: "Conversation", participants: ["Guest"], participantHandles: [{ name: "Guest", handle: "guest-person" }], sourceIds }],
    });
    const original = JSON.stringify(source);
    expect((await projection([source]))[0]).toMatchObject({ username: "publisher", subjectKind: "person", wikidataId: "Q100",
      relations: [{ id: "rel-one", targetKind: "organization", targetWikidataId: "Q200", sourceIds }],
      timeline: [{ id: "event-one", sourceIds }], appearances: [{ id: "appearance-one", sourceIds }],
    });
    expect(JSON.stringify(source)).toBe(original);
  });
});
