import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { assertLaunchKit } from "@hraness/design-kit/launch";

import { BeatVisual } from "../app/blog/[slug]/launch-body";
import { launchBeats, launchKitOptions, socialKit } from "../app/launch/beats";
import { LAUNCH_STATUS, launchFacts } from "../app/launch/facts";
import { launchFilm, launchFilmShipped } from "../app/launch/film";
import { renderSocialKitMarkdown } from "../app/launch/social-kit-markdown";
import { eugeneTssui, fixtureSources } from "../app/mockups/eugene-tssui";
import { SURFACE_IDS } from "../app/mockups/surfaces";
import { featuredIndexes } from "../lib/examples";
import publishedRelease from "../published-release.json";

type Packet = {
  subject: { handle: string; displayName: string; summary: string; alsoKnownAs: string[] };
  scope: { asOf: string; coverage: string[] };
  sources: { id: string; binding: string; title: string; publisher: string; accessedAt: string }[];
  claims: { id: string; kind: string; text: string; sourceIds: string[] }[];
  timeline: { date: string; title: string }[];
  themes: { status: string; title: string }[];
  works: unknown[];
  appearances: unknown[];
  openQuestions: (string | { question?: string; text?: string })[];
  body: string;
};

const packet = JSON.parse(
  readFileSync(join(import.meta.dir, "../../examples/people/eugene-tssui/person-index.json"), "utf8"),
) as Packet;
/** Widens a literal-typed fixture value so it compares with the packet's plain JSON. */
const wide = (value: unknown): unknown => value;
const questionText = (entry: Packet["openQuestions"][number]) => (typeof entry === "string" ? entry : entry.question ?? entry.text ?? "");

describe("the Eugene Tssui fixture matches the published packet", () => {
  test("subject and scope", () => {
    expect(wide(eugeneTssui.handle)).toBe(packet.subject.handle);
    expect(wide(eugeneTssui.displayName)).toBe(packet.subject.displayName);
    expect(wide(eugeneTssui.summary)).toBe(packet.subject.summary);
    expect(wide([...eugeneTssui.alsoKnownAs])).toEqual(packet.subject.alsoKnownAs);
    expect(wide(eugeneTssui.asOf)).toBe(packet.scope.asOf);
    expect(wide([...eugeneTssui.coverage])).toEqual(packet.scope.coverage);
    expect(packet.body.startsWith(eugeneTssui.essayOpening)).toBe(true);
  });

  test("counts", () => {
    const { counts } = eugeneTssui;
    expect(wide(counts.sources)).toBe(packet.sources.length);
    expect(wide(counts.claims)).toBe(packet.claims.length);
    expect(wide(counts.timeline)).toBe(packet.timeline.length);
    expect(wide(counts.themes)).toBe(packet.themes.length);
    expect(wide(counts.works)).toBe(packet.works.length);
    expect(wide(counts.appearances)).toBe(packet.appearances.length);
    expect(wide(counts.openQuestions)).toBe(packet.openQuestions.length);
    expect(wide(counts.subjectControlledSources)).toBe(packet.sources.filter((source) => source.binding === "subject_controlled").length);
    for (const [kind, count] of Object.entries(counts.claimsByKind)) {
      expect(packet.claims.filter((claim) => claim.kind === kind).length).toBe(count);
    }
  });

  test("sources, claims, timeline, themes, and questions are copied verbatim", () => {
    for (const source of fixtureSources) {
      const real = packet.sources.find((entry) => entry.id === source.id);
      expect(real).toBeDefined();
      expect(source.binding).toBe(real!.binding as typeof source.binding);
      expect(source.title).toBe(real!.title);
      expect(source.publisher).toBe(real!.publisher);
      expect(source.accessedAt).toBe(real!.accessedAt);
    }
    for (const claim of eugeneTssui.claims) {
      const real = packet.claims.find((entry) => entry.id === claim.id);
      expect(real).toBeDefined();
      expect(claim.kind).toBe(real!.kind as typeof claim.kind);
      expect(claim.text).toBe(real!.text);
      expect(wide([...claim.sourceIds])).toEqual(real!.sourceIds);
    }
    for (const entry of eugeneTssui.timeline) {
      expect(packet.timeline.some((real) => real.date === entry.date && real.title === entry.title)).toBe(true);
    }
    for (const theme of eugeneTssui.themes) {
      expect(packet.themes.some((real) => real.status === theme.status && real.title === theme.title)).toBe(true);
    }
    expect(wide([...eugeneTssui.openQuestions])).toEqual(packet.openQuestions.map(questionText));
  });
});

describe("launch facts", () => {
  test("every fact matches the record it names", () => {
    expect(launchFacts.exampleSources.value).toBe(String(packet.sources.length));
    expect(launchFacts.exampleClaims.value).toBe(String(packet.claims.length));
    expect(launchFacts.exampleOpenQuestions.value).toBe(String(packet.openQuestions.length));
    expect(launchFacts.exampleCount.value).toBe(String(featuredIndexes.length));
    expect(wide(launchFacts.status.value)).toBe(`Latest release: v${publishedRelease.version}`);
    expect(wide(LAUNCH_STATUS)).toBe(launchFacts.status.value);
    const kinds = readFileSync(join(import.meta.dir, "../../skills/soulscrape/scripts/person-index.ts"), "utf8")
      .match(/const CLAIM_KINDS = new Set\(\[([^\]]+)\]\)/u)![1]!
      .split(",").length;
    expect(kinds).toBe(4);
    expect(launchFacts.claimKinds.value).toBe("four");
  });
});

describe("launch beats and social kit", () => {
  test("the kit passes the design kit's checks", () => {
    expect(() => assertLaunchKit(launchBeats, socialKit, launchKitOptions)).not.toThrow();
  });

  test("the social status beat carries the release status", () => {
    expect(launchBeats.find((beat) => beat.id === "status")!.socialPost).toContain(LAUNCH_STATUS);
  });

  test("every beat names a real surface and renders with an accessible description", () => {
    for (const beat of launchBeats) {
      if (beat.visual.kind !== "mockup") throw new Error(`Beat ${beat.id} needs a mockup visual.`);
      expect((SURFACE_IDS as readonly string[]).includes(beat.visual.id)).toBe(true);
      const html = renderToStaticMarkup(<BeatVisual beat={beat} />);
      expect(html.length).toBeGreaterThan(0);
      expect(html).toMatch(/aria-label="[^"]+"/u);
    }
  });

  test("the kit has no Mastodon channel", () => {
    expect(JSON.stringify(socialKit).toLowerCase()).not.toContain("mastodon");
  });
});

describe("launch film", () => {
  test("the post embeds the film only when every file ships", () => {
    expect(launchFilm.captions.endsWith(".vtt")).toBe(true);
    const html = renderToStaticMarkup(<>{launchFilmShipped() ? "film" : "none"}</>);
    expect(["film", "none"]).toContain(html);
  });
});

describe("docs/launch/social-kit.md", () => {
  test("matches the beats and facts; run `bun scripts/write-social-kit.ts` after changing them", () => {
    expect(readFileSync(join(import.meta.dir, "../../docs/launch/social-kit.md"), "utf8")).toBe(renderSocialKitMarkdown());
  });
});
