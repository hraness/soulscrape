import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";

import {
  parsePersonIndex,
  stablePersonSourceId,
  type PersonIndex,
  type PersonIndexEvent,
} from "../../skills/soulscrape/scripts/person-index";
import { strictJsonParse } from "../../skills/soulscrape/scripts/source-packet";
import {
  PersonProfileFooter,
  PersonProfileHeader,
  PersonProfileMain,
  type InboundRelation,
} from "../components/person-profile";
import { timelineEventId, timelineTopics } from "../lib/dossier-view";
import { createProfileResolver } from "../lib/profile-identity";
import { sortedTimeline, type StoredProfile } from "../lib/profile-view";

const sources = ["record", "interview"].map((name, index) => ({
  id: stablePersonSourceId(`https://example.com/${name}`, "2020-06"),
  binding: index === 0 ? "primary_record" : "interview",
  mediaType: "article",
  title: `Public ${name}`,
  url: `https://example.com/${name}`,
  publisher: "Example Archive",
  publishedAt: "2020-06",
  accessedAt: "2025-01-15T08:30:00Z",
}));
const sourceIds = sources.map(source => source.id);

function event(kind: string, date = "2005-04-17", extra: Partial<PersonIndexEvent> = {}): PersonIndexEvent {
  return {
    id: `event-${kind}`,
    kind,
    date,
    title: `Recorded ${kind}`,
    summary: `The supplied ${kind} record retains its own explanation.`,
    sourceIds,
    ...extra,
  };
}

const packet = parsePersonIndex({
  schemaVersion: "soulscrape.person-index.v1",
  indexId: "pidx-example-person",
  generatedAt: "2025-02-01T09:45:00Z",
  subject: {
    kind: "person",
    handle: "example-person",
    displayName: "Example Person",
    summary: "A synthetic public research subject used to verify sourced dossier navigation.",
  },
  scope: { asOf: "2025-01-15T08:30:00Z", coverage: ["documented roles", "publications"] },
  sources,
  claims: ["fact", "stated_belief", "pattern", "speculation"].map(kind => ({
    id: `claim-${kind.replaceAll("_", "-")}`,
    kind,
    text: `A supplied ${kind} claim.`,
    sourceIds,
  })),
  timeline: [
    event("project", "2004-09", {
      title: "Acquisition research project",
      summary: "A project about an acquisition, not an assertion that the subject acquired a company.",
      sourceIds: [sourceIds[1]!],
    }),
    event("role", "2001", {
      title: "Researcher interviewing chief executives",
      end: "2003-05",
      organization: "Example Organization",
      organizationHandle: "example-organization",
      location: "Example City",
      sourceIds: [...sourceIds].reverse(),
    }),
    event("apprenticeship", "1999-03"),
    event("education", "1999-03", { sourceIds: [sourceIds[0]!] }),
    event("birth", "1980"),
    ...["founded", "publication", "award", "exhibition", "media", "funding", "milestone", "other"]
      .map(kind => event(kind)),
  ],
  themes: [{ id: "theme-method", kind: "method", status: "inferred", title: "Documented practice", summary: "A bounded interpretation.", sourceIds }],
  works: [{ id: "work-book", kind: "book", status: "published", title: "Example Book", date: "2007", sourceIds }],
  appearances: [{
    id: "appearance-interview",
    title: "Example Interview",
    venue: "Example Forum",
    publishedAt: "2006-02",
    participants: ["Example Person", "Casey Example", "Unbound Guest"],
    participantHandles: [
      { name: "Example Person", handle: "example-person" },
      { name: "Casey Example", handle: "casey-example" },
    ],
    media: [{ type: "article", url: "https://example.com/interview", sourceId: sourceIds[1] }],
    sourceIds,
  }],
  relations: [
    { id: "rel-live", kind: "collaborated", target: "casey-example", targetName: "Casey Example", sourceIds },
    { id: "rel-unpublished", kind: "influenced_by", target: "unpublished-person", targetName: "Unpublished Person", sourceIds },
  ],
  openQuestions: ["Which projects remain undocumented?", "How do the conflicting public accounts differ?"],
  body: "## Supplied account\n\nThis synthetic dossier keeps its authored essay separate from the structured evidence. Its records cite public fixtures, and its open questions preserve the limits of the supplied account. No real person or private contact is represented here.",
  provenance: {
    tool: "fixture-tool",
    method: "Compared supplied public records; unresolved contradictions retained.",
    model: "fixture-model",
    contributors: ["Synthetic Researcher"],
  },
});

function profile(value: PersonIndex = packet): StoredProfile {
  return {
    username: "test_publisher",
    handle: value.subject.handle,
    packetDigest: "a".repeat(64),
    revision: 2,
    packet: value,
    publishedAtMs: 1_738_401_600_000,
    updatedAtMs: 1_738_488_000_000,
  };
}

function render(value: PersonIndex = packet, inbound: readonly InboundRelation[] = []): string {
  return renderToStaticMarkup(
    <PersonProfileMain
      profile={profile(value)}
      resolveProfile={createProfileResolver([
        { username: "test_publisher", handle: "example-organization", subjectKind: "organization" },
        { username: "test_publisher", handle: "casey-example", subjectKind: "person" },
      ])}
      inbound={inbound}
    />,
  );
}

function attributes(html: string, selector: string, attribute: string): string[] {
  const values: string[] = [];
  new HTMLRewriter().on(selector, {
    element(element) { values.push(element.getAttribute(attribute) ?? ""); },
  }).transform(html);
  return values;
}

function section(html: string, heading: string): string {
  const start = `<section aria-labelledby="${heading}">`;
  expect(html).toContain(start);
  return html.split(start)[1]!.split("</section>")[0]!;
}

function expectResolvedAnchors(html: string) {
  const ids = attributes(html, "[id]", "id");
  expect(new Set(ids).size).toBe(ids.length);
  for (const href of attributes(html, 'a[href^="#"]', "href")) {
    expect(ids.filter(id => id === href.slice(1))).toHaveLength(1);
  }
  for (const id of attributes(html, "[aria-labelledby]", "aria-labelledby")) {
    expect(ids).toContain(id);
  }
}

describe("timeline topic projection", () => {
  test("maps explicit v1 event kinds to stable neutral topics and retains every record exactly once", () => {
    const before = JSON.stringify(packet);
    const topics = timelineTopics(packet);
    expect(topics.map(topic => [topic.id, topic.label, topic.events.map(item => item.kind)])).toEqual([
      ["birth", "Birth", ["birth"]],
      ["founding", "Founding", ["founded"]],
      ["education", "Education and apprenticeships", ["apprenticeship", "education"]],
      ["roles", "Roles", ["role"]],
      ["projects", "Projects", ["project"]],
      ["publications", "Publications", ["publication"]],
      ["awards", "Awards", ["award"]],
      ["exhibitions", "Exhibitions", ["exhibition"]],
      ["media", "Media", ["media"]],
      ["funding", "Funding", ["funding"]],
      ["milestones", "Milestones", ["milestone"]],
      ["other", "Other events", ["other"]],
    ]);
    const projected = topics.flatMap(topic => topic.events);
    expect(projected).toHaveLength(packet.timeline!.length);
    for (const item of packet.timeline!) {
      expect(projected.filter(candidate => candidate === item)).toHaveLength(1);
    }
    expect(JSON.stringify(packet)).toBe(before);
    expect(timelineTopics(packet)).toEqual(topics);
    expect(timelineTopics({ ...packet, timeline: [...packet.timeline!].reverse() }).map(topic => topic.id))
      .toEqual(topics.map(topic => topic.id));
  });

  test("preserves the existing chronological ordering and authored ties within topics without mutating input", () => {
    const timeline = Object.freeze([
      Object.freeze(event("role", "2004-09", { id: "event-later" })),
      Object.freeze(event("role", "2001", { id: "event-tie-first" })),
      Object.freeze(event("role", "2001", { id: "event-tie-second" })),
      Object.freeze(event("role", "1999-12-31", { id: "event-earlier" })),
    ]);
    const value = { ...packet, timeline };
    expect(timelineTopics(value)[0]!.events).toEqual(sortedTimeline(value));
    expect(timelineTopics(value)[0]!.events.map(item => item.id))
      .toEqual(["event-earlier", "event-tie-first", "event-tie-second", "event-later"]);
    expect(timeline[0]!.id).toBe("event-later");
  });

  test("never infers acquisitions, executive rank, or any topic from titles, summaries, or organization names", () => {
    const changed = {
      ...packet,
      timeline: packet.timeline!.map(item => ({
        ...item,
        title: "Acquisition funding chief executive award",
        summary: "Founded a company; acquisition; executive role; side quest.",
        organization: "Education Publication Media",
      })),
    };
    expect(timelineTopics(changed).map(topic => [topic.id, topic.events.map(item => item.id)]))
      .toEqual(timelineTopics(packet).map(topic => [topic.id, topic.events.map(item => item.id)]));
    expect(timelineTopics(packet).find(topic => topic.id === "projects")!.events[0]!.kind).toBe("project");
    expect(timelineTopics(packet).find(topic => topic.id === "roles")!.label).toBe("Roles");
    expectResolvedAnchors(render(changed));
  });

  test("keeps unknown and object-property-like kinds in Other events without changing the wire validator", () => {
    for (const kind of ["future_kind", "acquired", "constructor", "toString", "__proto__"]) {
      const item = event(kind, "2000", { id: "event-unknown" });
      const value = { ...packet, timeline: [item] };
      expect(timelineTopics(value)).toEqual([{ id: "other", label: "Other events", events: [item] }]);
      expect(() => parsePersonIndex(value)).toThrow();
      const html = render(value);
      expect(section(html, "timeline-topics-heading")).toContain("Other events (1)");
      expect(section(html, "timeline-heading")).toContain(`<span class="event-kind">${kind}</span>`);
      expectResolvedAnchors(html);
    }
  });
});

describe("server-rendered dossier navigation", () => {
  test("offers native topic disclosures above the accessible flat timeline, with one link per event", () => {
    const html = render();
    const topics = section(html, "timeline-topics-heading");
    const chronology = section(html, "timeline-heading");
    expect(html).toContain('<nav aria-label="Dossier sections">');
    expect(html).toContain('<a href="#timeline-heading">Chronological timeline</a>');
    expect(attributes(topics, "details > summary", "role")).toHaveLength(timelineTopics(packet).length);
    expect(attributes(topics, 'a[href^="#timeline-event-"]', "href"))
      .toEqual(timelineTopics(packet).flatMap(topic => topic.events.map(item => `#${timelineEventId(item)}`)));
    expect(attributes(chronology, "li", "id")).toEqual(sortedTimeline(packet).map(timelineEventId));
    expect(attributes(chronology, "li", "tabindex")).toEqual(packet.timeline!.map(() => "-1"));
    expect(attributes(html, 'details section[aria-labelledby="timeline-heading"]', "aria-labelledby")).toEqual([]);
    expect(chronology).not.toContain("<details");
    expect(chronology).not.toContain("hidden");
    expect(html.indexOf('id="timeline-topics-heading"')).toBeLessThan(html.indexOf('id="timeline-heading"'));
    for (const item of packet.timeline!) {
      expect(html.split(`<p>${item.summary}</p>`)).toHaveLength(2);
    }
    expectResolvedAnchors(html);
  });

  test("retains partial start and end dates and source references in both navigation and chronology", () => {
    const html = render();
    for (const heading of ["timeline-topics-heading", "timeline-heading"]) {
      const content = section(html, heading);
      expect(content).toContain('<time dateTime="2001">2001 – 2003-05</time>');
      expect(content).toContain('<time dateTime="2004-09">2004-09</time>');
      expect(content).toContain('<time dateTime="2005-04-17">2005-04-17</time>');
      expect(content).not.toContain("2001-01-01");
      expect(content).not.toContain("2004-09-01");
      const events = heading === "timeline-topics-heading"
        ? timelineTopics(packet).flatMap(topic => topic.events)
        : sortedTimeline(packet);
      expect(attributes(content, ".source-refs a", "href"))
        .toEqual(events.flatMap(item => item.sourceIds.map(id => `#source-${sourceIds.indexOf(id) + 1}`)));
      expect(attributes(content, ".source-refs a", "title"))
        .toEqual(events.flatMap(item => item.sourceIds.map(id => sources.find(source => source.id === id)!.title)));
    }
    expect(attributes(section(html, "sources-heading"), "a", "href")).toEqual(sources.map(source => source.url));
  });

  test("shows supplied scope, method, provenance, and gaps without turning assembly into review", () => {
    const html = render();
    const coverage = section(html, "coverage-heading");
    expect(coverage).toContain(`<time dateTime="${packet.scope.asOf}">${packet.scope.asOf}</time>`);
    expect(coverage).toContain(`<time dateTime="${packet.generatedAt}">${packet.generatedAt}</time>`);
    for (const item of packet.scope.coverage!) expect(coverage).toContain(`<li>${item}</li>`);
    expect(coverage).toContain(`<dd>${packet.provenance.method}</dd>`);
    expect(coverage).toContain(`<dd>${packet.provenance.tool}</dd>`);
    expect(coverage).toContain(`<dd>${packet.provenance.model}</dd>`);
    expect(coverage).toContain("<dt>Contributors</dt><dd><ul><li>Synthetic Researcher</li></ul></dd>");
    expect(coverage).toContain("No review status or review date is supplied.");
    expect(coverage).toContain("An assembly timestamp does not establish human review.");
    expect(html).not.toMatch(/last reviewed|reviewed on|unreviewed/iu);
    for (const question of packet.openQuestions!) {
      expect(section(html, "open-questions-heading")).toContain(`<li>${question}</li>`);
    }
  });

  test("keeps all evidence sections, claim labels, source links, and live-handle linking behavior", () => {
    const inbound: InboundRelation[] = [{ handle: "another-index", displayName: "Another Index", kind: "employed_by", via: "timeline", start: "2010", note: "An incoming sourced record." }];
    const html = render(packet, inbound);
    expect(html).toContain('<article class="person-body readme-prose"><h2>Supplied account</h2>');
    expect(section(html, "themes-heading")).toContain('class="theme-status theme-inferred">inferred</span>');
    expect(section(html, "works-heading")).toContain("Example Book");
    expect(section(html, "works-heading")).toContain('<time dateTime="2007">2007</time>');
    expect(section(html, "appearances-heading")).toContain('<a href="/test_publisher/casey-example">Casey Example</a>');
    expect(section(html, "appearances-heading")).toContain('<a href="https://example.com/interview" rel="noopener ugc">');
    expect(section(html, "appearances-heading")).toContain("Unbound Guest");
    expect(section(html, "relations-heading")).toContain('href="/test_publisher/casey-example"');
    expect(section(html, "relations-heading")).toContain("Unpublished Person");
    expect(html).not.toContain('href="/test_publisher/unpublished-person"');
    expect(section(html, "inbound-heading")).toContain('href="/test_publisher/another-index"');
    expect(section(html, "inbound-heading")).toContain("employed by · event");
    expect(section(html, "timeline-heading")).toContain('href="/test_publisher/example-organization"');
    expect(section(html, "timeline-heading")).toContain("Example City");
    for (const claim of packet.claims) {
      expect(section(html, "claims-heading")).toContain(`class="claim-kind claim-${claim.kind}"`);
      expect(section(html, "claims-heading")).toContain(claim.text);
    }
    expectResolvedAnchors(html);
    const withoutLiveTargets = renderToStaticMarkup(<PersonProfileMain profile={profile()} />);
    expect(withoutLiveTargets).not.toContain('href="/test_publisher/example-organization"');
    expect(withoutLiveTargets).not.toContain('href="/test_publisher/casey-example"');
    expect(withoutLiveTargets).toContain("Example Organization");
    expect(withoutLiveTargets).toContain("Casey Example");
  });

  test("omits absent or empty optional sections and their navigation without suggesting complete coverage", () => {
    const minimal = parsePersonIndex({
      schemaVersion: packet.schemaVersion,
      indexId: packet.indexId,
      generatedAt: packet.generatedAt,
      subject: packet.subject,
      scope: { asOf: packet.scope.asOf },
      sources: packet.sources,
      claims: [],
      body: packet.body,
      provenance: { tool: packet.provenance.tool },
    });
    const empty = parsePersonIndex({
      ...minimal,
      timeline: [], themes: [], works: [], appearances: [], relations: [], openQuestions: [],
      scope: { ...minimal.scope, coverage: [] },
      provenance: { ...minimal.provenance, contributors: [] },
    });
    for (const value of [minimal, empty]) {
      expect(timelineTopics(value)).toEqual([]);
      const html = render(value);
      for (const heading of ["timeline-topics", "timeline", "themes", "works", "appearances", "relations", "inbound", "open-questions"]) {
        expect(html).not.toContain(`${heading}-heading`);
      }
      expect(section(html, "coverage-heading")).toContain("<dt>Method</dt><dd>Not specified.</dd>");
      expect(section(html, "coverage-heading")).toContain("<dt>Coverage supplied by the publisher</dt><dd>Not specified.</dd>");
      expect(html).toContain("None supplied; this does not establish that there are no gaps.");
      expect(html).toContain("No review status or review date is supplied.");
      expect(html).not.toContain("<dt>Contributors</dt>");
      expect(html).not.toContain("<dt>Model</dt>");
      expect(html).not.toContain("undefined");
      expect(section(html, "claims-heading")).toContain('<ul class="claims"></ul>');
      expect(section(html, "sources-heading")).toContain("Public record");
      expectResolvedAnchors(html);
    }
  });

  test("preserves the header, footer, and exact profile format link without duplicate IDs", () => {
    const stored = profile();
    const html = renderToStaticMarkup(<>
      <PersonProfileHeader profile={stored} />
      <PersonProfileMain profile={stored} />
      <PersonProfileFooter profile={stored} />
    </>);
    expect(html).toContain("Evidence profile");
    expect(html).toContain("assembled 2025-02-01 · revision 2");
    expect(html).toContain('href="/test_publisher"');
    expect(html).toContain('href="https://soulscrape.com/test_publisher/example-person.md"');
    expect(html).toContain('href="https://github.com/hraness/soulscrape/issues"');
    expect(html.match(/<h1\b/gu)).toHaveLength(1);
    expectResolvedAnchors(html);
  });

  test("renders the checked-in public dossier with every event and source still reachable", () => {
    const example = parsePersonIndex(strictJsonParse(readFileSync(
      join(import.meta.dir, "../../examples/people/eugene-tssui/person-index.json"),
    )));
    const html = render(example);
    expect(attributes(section(html, "timeline-heading"), "li", "id"))
      .toEqual(sortedTimeline(example).map(timelineEventId));
    expect(attributes(section(html, "timeline-topics-heading"), 'a[href^="#timeline-event-"]', "href"))
      .toEqual(timelineTopics(example).flatMap(topic => topic.events.map(item => `#${timelineEventId(item)}`)));
    expect(attributes(section(html, "sources-heading"), "li", "id"))
      .toEqual(example.sources.map((_, index) => `source-${index + 1}`));
    expectResolvedAnchors(html);
  });
});
