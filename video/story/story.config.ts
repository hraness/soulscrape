/**
 * Soulscrape's launch film: what you know about a person is scattered and
 * uncited, the reveal, the launch post's own screens captured from
 * soulscrape.com (the scope the agent writes first, the published example
 * dossier, one claim opened to its sources, the same dossier as JSON), and an
 * end card that asks your agent to install the skill. Numbers and status come
 * from site/app/launch/facts.ts.
 */
import { join } from "node:path";

import { launchFacts } from "../../site/app/launch/facts.ts";
import { defineStory } from "./story.ts";
import palette from "./palette.json" with { type: "json" };

const here = import.meta.dir, repo = join(here, "../..");
const shot = (name: string) => join(here, "shots", `${name}.png`);
const f = (key: keyof typeof launchFacts) => launchFacts[key].value;

export default () => defineStory({
  id: "soulscrape",
  brand: {
    wordmark: "Soulscrape",
    mark: join(repo, "site/public/marks/soulscrape.svg"),
    markAspect: 1,
    // Read with site-palette.ts from https://soulscrape.com in dark mode; see palette.json.
    palette: { values: palette.palette },
    designKit: join(repo, "site/node_modules/@hraness/design-kit"),
  },
  acts: [
    {
      kind: "scatter", headline: "What the internet says about a person is scattered, and rarely cited.", accents: ["cited."],
      cards: [
        { app: "Interview", glyph: "I", color: "#7aa2f7", lines: ["A quote", "No date"] },
        { app: "Profile", glyph: "P", color: "#e0af68", lines: ["A summary", "No sources"] },
        { app: "Thread", glyph: "T", color: "#bb9af7", lines: ["An opinion", "Out of context"] },
      ],
      ghosts: ["Old talk", "Press bio", "Podcast", "Wiki edit", "Blog post"],
    },
    { kind: "reveal", tagline: "A cited dossier on one person." },
    {
      kind: "gallery", headline: "Your agent writes down the scope before it reads anything.", accents: ["scope"],
      items: [{ image: shot("agent"), caption: "Who, what for, who will read it, and which sources are allowed" }],
    },
    {
      kind: "gallery", headline: "Open any claim to see what it rests on.", accents: ["any", "claim"],
      items: [
        { image: shot("dossier"), caption: `The example dossier: ${f("exampleClaims")} claims from ${f("exampleSources")} sources` },
        { image: shot("claim"), caption: `Each claim is one of ${f("claimKinds")} kinds, with its sources and the day each was read` },
      ],
    },
    {
      kind: "cards", headline: "It runs in your own agent, and publishes nothing by default.", accents: ["nothing"],
      items: [
        { tag: "Your agent", title: "Runs inside Claude Code, Codex or another agent, with your model" },
        { tag: "Open questions", title: "Lists what the record can't settle instead of smoothing it over" },
        { tag: "Readable", title: "A published dossier is a page, JSON and Markdown" },
      ],
    },
  ],
  end: {
    lead: "Ask your agent:", prompt: "Install Soulscrape from soulscrape.com",
    terms: `Free and MIT licensed · ${f("status")}`, url: "soulscrape.com",
  },
  formats: ["wide", "square", "portrait"],
});
