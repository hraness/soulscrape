import { LaunchBeats } from "@hraness/design-kit/react/server";
import type { LaunchBeat } from "@hraness/design-kit/launch";

import { launchBeats } from "../../launch/beats";
import { LaunchFilm } from "../../launch/film";
import type { ClaimKind } from "../../mockups/eugene-tssui";
import {
  ClaimMockup,
  DossierMockup,
  FormatMockup,
  InstallMockup,
  SessionMockup,
  UsesMockup,
  type DossierTab,
  type Format,
  type SessionStep,
  type SurfaceId,
} from "../../mockups/surfaces";
import "../../mockups/styles";

/** The one visual for a beat, named by its surface id and state in app/launch/beats.ts. */
export function BeatVisual({ beat }: Readonly<{ beat: LaunchBeat }>) {
  const visual = beat.visual;
  if (visual.kind !== "mockup") throw new Error(`Beat ${beat.id} names a ${visual.kind}; this post shows mockups only.`);
  const state = visual.state;
  switch (visual.id as SurfaceId) {
    case "session":
      return <SessionMockup height="auto" step={(state["step"] ?? "done") as SessionStep} />;
    case "dossier":
      return <DossierMockup height={420} tab={(state["tab"] ?? "essay") as DossierTab} />;
    case "claim":
      return <ClaimMockup kind={(state["kind"] ?? "fact") as ClaimKind} open={state["open"] !== "no"} />;
    case "format":
      return <FormatMockup format={(state["format"] ?? "web") as Format} height={360} />;
    case "uses":
      return <UsesMockup />;
    case "install":
      return <InstallMockup />;
    default:
      throw new Error(`Beat ${beat.id} names an unknown surface ${visual.id}.`);
  }
}

/** The body of "Introducing Soulscrape" before its Markdown sections: the film, then one section per beat. */
export function LaunchBody() {
  return (
    <>
      <LaunchFilm />
      <LaunchBeats beats={launchBeats} detailLabel="Read more" renderVisual={(beat) => <BeatVisual beat={beat} />} />
    </>
  );
}
