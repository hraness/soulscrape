import type { LaunchFacts, LaunchStatus } from "@hraness/design-kit/launch";

import { eugeneTssui } from "../mockups/eugene-tssui";
import { featuredIndexes } from "../../lib/examples";
import publishedRelease from "../../published-release.json";

/**
 * Every number the launch post, its social kit, and its film captions use,
 * each typed once with the record it comes from. tests/launch.test.ts reads
 * those records and fails when a value here drifts from them.
 */
export const LAUNCH_STATUS = `Latest release: v${publishedRelease.version}` as LaunchStatus;

const { counts } = eugeneTssui;

export const launchFacts = {
  exampleSources: {
    value: String(counts.sources),
    source: "examples/people/eugene-tssui/person-index.json: sources.length",
  },
  exampleClaims: {
    value: String(counts.claims),
    source: "examples/people/eugene-tssui/person-index.json: claims.length",
  },
  exampleOwnSiteSources: {
    value: String(counts.subjectControlledSources),
    source: 'examples/people/eugene-tssui/person-index.json: sources with binding "subject_controlled"',
  },
  exampleOpenQuestions: {
    value: String(counts.openQuestions),
    source: "examples/people/eugene-tssui/person-index.json: openQuestions.length",
  },
  claimKinds: {
    value: "four",
    source: "skills/soulscrape/scripts/person-index.ts claim kinds: fact, stated_belief, pattern, speculation",
  },
  exampleCount: {
    value: String(featuredIndexes.length),
    source: "site/lib/examples.ts featuredIndexes.length, the dossiers on soulscrape.com/examples",
  },
  status: {
    value: LAUNCH_STATUS,
    source: "site/published-release.json version, the admitted public release",
  },
} as const satisfies LaunchFacts;

export type LaunchFactKey = keyof typeof launchFacts;
