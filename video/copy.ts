/**
 * The film's words, built from the site's launch facts so every number and
 * the status line come from the same records as the launch post.
 */
import { LAUNCH_STATUS, launchFacts } from "../site/app/launch/facts.ts";
import type { FilmCopy } from "./timeline.ts";

const count = (value: string): number => {
  const number = Number(value);
  if (!Number.isInteger(number)) throw new Error(`Expected a whole number, got ${value}.`);
  return number;
};

export const filmCopy: FilmCopy = {
  name: "Soulscrape",
  promise: "A cited dossier on one person, written by your own agent.",
  url: "soulscrape.com",
  open: ["What does the public record say about someone?", "And where did each claim come from?"],
  steps: [
    {
      heading: "It asks first",
      body: "Who the dossier is about, what it is for, and which sources it may use. Then one question.",
      focus: "session",
      target: "session-question",
      highlight: "session-question",
    },
    {
      heading: "Every claim has a source",
      body: "The agent checks each claim against its sources and waits for your review.",
      focus: "session",
      target: "session-review",
      highlight: "session-review",
    },
    {
      heading: "Open a claim",
      body: "See each source and the day it was read. His own sites are marked as his own account.",
      focus: "claim",
      target: "claim-toggle",
      highlight: "claim-sources",
    },
    {
      heading: `${launchFacts.claimKinds.value[0]!.toUpperCase()}${launchFacts.claimKinds.value.slice(1)} kinds of claim`,
      body: "Fact, stated belief, pattern, or speculation. A guess is labeled as a guess.",
      focus: "claim",
      target: "claim-kinds",
      highlight: "claim-kinds",
    },
    {
      heading: "Open questions",
      body: "A dossier ends with what the record can't settle.",
      focus: "dossier",
      target: "dossier-questions",
      highlight: "dossier-questions",
    },
    {
      heading: "For people and agents",
      body: "Each dossier is a web page, a JSON file, and a Markdown copy.",
      focus: "format",
      target: "format-tabs",
      highlight: "format-code",
    },
  ],
  proof: {
    caption: "The example dossier on the architect Eugene Tssui.",
    items: [
      { value: count(launchFacts.exampleClaims.value), label: "claims" },
      { value: count(launchFacts.exampleSources.value), label: "sources" },
      { value: count(launchFacts.exampleOpenQuestions.value), label: "open questions" },
    ],
  },
  limits: {
    heading: "A reading of the evidence, not the person",
    body: "No background checks, hiring, or other decisions about a person. Nothing is published until you review it.",
  },
  end: { line: `Free agent skill. ${LAUNCH_STATUS}.` },
};
