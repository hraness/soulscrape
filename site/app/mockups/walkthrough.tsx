"use client";

import { StepThrough, type ThroughStep } from "@hraness/design-kit/mockups/client";

import { ClaimMockup, DossierMockup, FormatMockup, SessionMockup } from "./surfaces";

const STEPS: readonly ThroughStep[] = [
  {
    id: "scope",
    label: "Scope",
    hint: "Before reading anything, the agent writes down who, what for, and which sources it may use.",
    render: () => <SessionMockup step="purpose" />,
  },
  {
    id: "research",
    label: "Research",
    hint: "It reads only the sources you allowed and marks the ones the person controls.",
    render: () => <SessionMockup step="research" />,
  },
  {
    id: "check",
    label: "Check",
    hint: "Every claim needs a source. Nothing is published until you review it.",
    render: () => <SessionMockup step="done" />,
  },
  {
    id: "dossier",
    label: "Dossier",
    hint: "The result is a dated page: a short essay, claims, a timeline, and open questions.",
    render: () => <DossierMockup tab="claims" />,
  },
  {
    id: "sources",
    label: "Sources",
    hint: "Open any claim to see what it rests on and whether the source is the person's own account.",
    render: () => <ClaimMockup kind="fact" open />,
  },
  {
    id: "formats",
    label: "Formats",
    hint: "The same dossier is a web page, JSON, and Markdown, so people and agents can both read it.",
    render: () => <FormatMockup format="json" />,
  },
];

/** The homepage and launch post walkthrough: one agent session, start to published dossier. */
export function Walkthrough({ initial }: Readonly<{ initial?: string }>) {
  return (
    <StepThrough
      label="How a dossier is made"
      minWidth={520}
      steps={STEPS}
      {...(initial === undefined ? {} : { initial })}
    />
  );
}
