"use client";

import { StepThrough, type ThroughStep } from "@hraness/design-kit/mockups/client";

import { ClaimMockup, DossierMockup, FormatMockup, SessionMockup } from "./surfaces";

const STEPS: readonly ThroughStep[] = [
  {
    id: "scope",
    label: "Scope",
    hint: "First the agent writes down who, why, and which sources.",
    render: () => <SessionMockup step="purpose" />,
  },
  {
    id: "research",
    label: "Research",
    hint: "It reads only allowed sources and flags the person's own.",
    render: () => <SessionMockup step="research" />,
  },
  {
    id: "check",
    label: "Check",
    hint: "Every claim cites a source; nothing ships until you review.",
    render: () => <SessionMockup step="done" />,
  },
  {
    id: "dossier",
    label: "Dossier",
    hint: "A dated page: essay, claims, timeline, and open questions.",
    render: () => <DossierMockup tab="claims" />,
  },
  {
    id: "sources",
    label: "Sources",
    hint: "Open a claim to see its source and who controls it.",
    render: () => <ClaimMockup kind="fact" open />,
  },
  {
    id: "formats",
    label: "Formats",
    hint: "One dossier as a web page, JSON, and Markdown.",
    render: () => <FormatMockup format="json" />,
  },
];

/** The homepage and launch post walkthrough: one agent session, start to published dossier. */
export function Walkthrough({ initial }: Readonly<{ initial?: string }>) {
  return (
    <StepThrough
      label="How a dossier is made"
      fit="fill"
      steps={STEPS}
      {...(initial === undefined ? {} : { initial })}
    />
  );
}
