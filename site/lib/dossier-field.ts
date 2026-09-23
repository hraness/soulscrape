import { parsePersonIndex, type PersonIndex } from "../../skills/soulscrape/scripts/person-index";

import type { DeskItem, FieldCard, FieldEdge } from "../components/dossier-field";
import { exampleCategory } from "./examples";

/* The hero backdrop is a field of real dossiers: every card is an actual
 * example person-index with its real claims/events/sources counts, and every
 * edge is a real relation authored in the packets — no decorative invention.
 * Positions are hand-tuned to orbit the hero copy and frame. */

import alanKay from "../../examples/people/alan-kay/person-index.json";
import andrejKarpathy from "../../examples/people/andrej-karpathy/person-index.json";
import bjork from "../../examples/people/bjork/person-index.json";
import brianEno from "../../examples/people/brian-eno/person-index.json";
import christopherAlexander from "../../examples/people/christopher-alexander/person-index.json";
import danielLopatin from "../../examples/people/daniel-lopatin/person-index.json";
import dwarkeshPatel from "../../examples/people/dwarkesh-patel/person-index.json";
import dylanPatel from "../../examples/people/dylan-patel/person-index.json";
import eugeneTssui from "../../examples/people/eugene-tssui/person-index.json";
import geoffreyLitt from "../../examples/people/geoffrey-litt/person-index.json";
import gwern from "../../examples/people/gwern/person-index.json";
import johannesSchickling from "../../examples/people/johannes-schickling/person-index.json";
import michaelLevin from "../../examples/people/michael-levin/person-index.json";
import patrickCollison from "../../examples/people/patrick-collison/person-index.json";
import stewartBrand from "../../examples/people/stewart-brand/person-index.json";
import timHecker from "../../examples/people/tim-hecker/person-index.json";
import tylerCowen from "../../examples/people/tyler-cowen/person-index.json";

const PACKETS: Readonly<Record<string, PersonIndex>> = Object.fromEntries(
  Object.entries({
    "alan-kay": alanKay,
    "andrej-karpathy": andrejKarpathy,
    bjork,
    "brian-eno": brianEno,
    "christopher-alexander": christopherAlexander,
    "daniel-lopatin": danielLopatin,
    "dwarkesh-patel": dwarkeshPatel,
    "dylan-patel": dylanPatel,
    "eugene-tssui": eugeneTssui,
    "geoffrey-litt": geoffreyLitt,
    gwern,
    "johannes-schickling": johannesSchickling,
    "michael-levin": michaelLevin,
    "patrick-collison": patrickCollison,
    "stewart-brand": stewartBrand,
    "tim-hecker": timHecker,
    "tyler-cowen": tylerCowen,
  }).map(([handle, packet]) => [handle, parsePersonIndex(packet)]),
);

interface CardSeed {
  readonly handle: string;
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
  readonly width: number;
  readonly drift: readonly [number, number];
  readonly seconds: number;
  readonly delay: number;
  readonly bloom?: boolean;
}

const SEEDS: readonly CardSeed[] = [
  { handle: "patrick-collison", x: 44, y: 8, rotate: -1.4, width: 196, drift: [10, 12], seconds: 41, delay: -14 },
  { handle: "tyler-cowen", x: 62, y: 6, rotate: 1.2, width: 184, drift: [9, 11], seconds: 38, delay: -27 },
  { handle: "stewart-brand", x: 88, y: 10, rotate: 1.8, width: 178, drift: [12, 9], seconds: 44, delay: -8 },
  { handle: "brian-eno", x: 70, y: 14, rotate: -0.8, width: 182, drift: [11, 13], seconds: 40, delay: -19 },
  { handle: "alan-kay", x: 10, y: 16, rotate: -1.6, width: 172, drift: [10, 14], seconds: 39, delay: -33 },
  { handle: "geoffrey-litt", x: 6, y: 44, rotate: 1.5, width: 168, drift: [8, 12], seconds: 43, delay: -5 },
  { handle: "eugene-tssui", x: 30, y: 38, rotate: 0.9, width: 188, drift: [12, 10], seconds: 45, delay: -22, bloom: true },
  { handle: "johannes-schickling", x: 16, y: 62, rotate: -1.1, width: 174, drift: [9, 13], seconds: 37, delay: -16 },
  { handle: "bjork", x: 12, y: 84, rotate: 2.1, width: 176, drift: [10, 11], seconds: 46, delay: -29 },
  { handle: "michael-levin", x: 34, y: 90, rotate: -0.7, width: 180, drift: [9, 12], seconds: 42, delay: -11 },
  { handle: "gwern", x: 50, y: 88, rotate: 1.3, width: 182, drift: [11, 9], seconds: 36, delay: -24 },
  { handle: "dwarkesh-patel", x: 64, y: 80, rotate: -1.9, width: 192, drift: [10, 13], seconds: 39, delay: -17, bloom: true },
  { handle: "andrej-karpathy", x: 78, y: 90, rotate: 0.6, width: 186, drift: [13, 10], seconds: 44, delay: -6 },
  { handle: "dylan-patel", x: 84, y: 68, rotate: -0.9, width: 178, drift: [9, 11], seconds: 41, delay: -31 },
  { handle: "daniel-lopatin", x: 92, y: 52, rotate: 1.7, width: 174, drift: [10, 12], seconds: 38, delay: -20 },
  { handle: "tim-hecker", x: 80, y: 46, rotate: -1.3, width: 172, drift: [11, 10], seconds: 40, delay: -12 },
  { handle: "christopher-alexander", x: 92, y: 34, rotate: 0.8, width: 184, drift: [8, 13], seconds: 45, delay: -26 },
];

function packetFor(handle: string): PersonIndex {
  const packet = PACKETS[handle];
  if (packet === undefined) throw new RangeError(`Missing field packet: ${handle}`);
  return packet;
}

export function dossierFieldCards(): readonly FieldCard[] {
  return SEEDS.map((seed) => {
    const packet = packetFor(seed.handle);
    const subject = packet.subject;
    return {
      id: seed.handle,
      name: subject.displayName,
      summary: subject.summary,
      portrait: `/portraits/${seed.handle}.png`,
      category: exampleCategory(seed.handle),
      claims: packet.claims.length,
      events: packet.timeline?.length ?? 0,
      sources: packet.sources.length,
      x: seed.x,
      y: seed.y,
      rotate: seed.rotate,
      width: seed.width,
      drift: seed.drift,
      seconds: seed.seconds,
      delay: seed.delay,
      bloom: seed.bloom,
    };
  });
}

function relationLabel(kind: string): string {
  return kind === "cofounder" ? "co-founder" : kind.replace(/_/gu, " ");
}

export function dossierFieldEdges(): readonly FieldEdge[] {
  const handles = new Set(SEEDS.map(seed => seed.handle));
  const seen = new Set<string>();
  const edges: FieldEdge[] = [];
  for (const seed of SEEDS) {
    for (const relation of packetFor(seed.handle).relations ?? []) {
      const target = relation.target;
      if (!handles.has(target)) continue;
      if (relation.targetKind !== undefined && relation.targetKind !== "person") continue;
      const pair = [seed.handle, target].sort().join("|");
      if (seen.has(pair)) continue;
      seen.add(pair);
      edges.push({ from: seed.handle, to: target, label: relationLabel(relation.kind) });
    }
  }
  return edges;
}

/* The desk layer: short quotations from real claims in the same packets,
 * each shown with its claim kind and source count, plus claim-kind chips.
 * Every excerpt must appear verbatim in its claim; nothing here is invented,
 * and nothing scores or ranks a person. */
interface TapeSeed {
  readonly handle: string;
  readonly claimId: string;
  readonly speaker: string;
  /** A verbatim substring of the claim text. */
  readonly excerpt: string;
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
  readonly drift: readonly [number, number];
  readonly seconds: number;
  readonly delay: number;
  readonly bloom?: boolean;
}

const TAPE_SEEDS: readonly TapeSeed[] = [
  { handle: "eugene-tssui", claimId: "claim-no-boxes", speaker: "Tssui", excerpt: "nature itself never creates a box",
    x: 52, y: 32, rotate: -1.4, drift: [11, 13], seconds: 45, delay: -14 },
  { handle: "michael-levin", claimId: "claim-collective-all-way", speaker: "Levin", excerpt: "all intelligence is collective intelligence",
    x: 24, y: 58, rotate: 0.8, drift: [8, 11], seconds: 48, delay: -26 },
  { handle: "christopher-alexander", claimId: "claim-building-count-source", speaker: "Alexander", excerpt: "more than two hundred buildings",
    x: 86, y: 44, rotate: 1.4, drift: [8, 13], seconds: 47, delay: -18 },
  { handle: "brian-eno", claimId: "claim-ambient-coinage", speaker: "Eno", excerpt: "Ambient Music",
    x: 40, y: 80, rotate: 1.3, drift: [9, 11], seconds: 44, delay: -27 },
  { handle: "alan-kay", claimId: "claim-messaging", speaker: "Kay", excerpt: "The big idea is messaging",
    x: 54, y: 10, rotate: -1.2, drift: [9, 12], seconds: 40, delay: -5, bloom: true },
  { handle: "tim-hecker", claimId: "claim-make-less", speaker: "Hecker", excerpt: "just to make less",
    x: 44, y: 94, rotate: -2.0, drift: [10, 10], seconds: 36, delay: -33 },
];

function claimKindLabel(kind: string): string {
  return kind.replace(/_/gu, " ");
}

type TapeQuote = Readonly<{ seed: TapeSeed; tag: string; text: string; sources: number }>;

function tapeQuote(seed: TapeSeed): TapeQuote {
  const claim = packetFor(seed.handle).claims.find(entry => entry.id === seed.claimId);
  if (claim === undefined) throw new RangeError(`Missing field claim: ${seed.handle}/${seed.claimId}`);
  if (!claim.text.includes(seed.excerpt)) {
    throw new RangeError(`Field excerpt is not in its claim: ${seed.handle}/${seed.claimId}`);
  }
  const sources = claim.sourceIds.length;
  return {
    seed,
    tag: claimKindLabel(claim.kind),
    text: `${seed.speaker}: “${seed.excerpt}”`,
    sources,
  };
}

function sourceCount(count: number): string {
  return count === 1 ? "1 source" : `${count} sources`;
}

const CLAIM_CHIPS: readonly DeskItem[] = [
  { id: "fact", kind: "claim", claim: "fact",
    x: 70, y: 38, rotate: -1.5, drift: [9, 15], seconds: 43, delay: -22 },
  { id: "pattern", kind: "claim", claim: "pattern",
    x: 30, y: 70, rotate: -1.1, drift: [10, 11], seconds: 37, delay: -24 },
  { id: "speculation", kind: "claim", claim: "speculation",
    x: 56, y: 68, rotate: 1.7, drift: [11, 10], seconds: 39, delay: -29 },
];

export function deskFieldItems(): readonly DeskItem[] {
  const quotes: DeskItem[] = TAPE_SEEDS.map((seed) => {
    const quote = tapeQuote(seed);
    return {
      id: `${seed.handle}-${seed.claimId}`,
      kind: "tape",
      meta: sourceCount(quote.sources),
      tag: quote.tag,
      text: quote.text,
      x: seed.x,
      y: seed.y,
      rotate: seed.rotate,
      drift: seed.drift,
      seconds: seed.seconds,
      delay: seed.delay,
      ...(seed.bloom === true ? { bloom: true } : {}),
    };
  });
  return [...quotes, ...CLAIM_CHIPS];
}

export function deskFieldTape(): readonly string[] {
  const packets = Object.values(PACKETS);
  const claims = packets.reduce((total, packet) => total + packet.claims.length, 0);
  const sources = packets.reduce((total, packet) => total + packet.sources.length, 0);
  return [
    ...TAPE_SEEDS.map((seed) => {
      const quote = tapeQuote(seed);
      return `${quote.tag}: ${quote.text}, ${sourceCount(quote.sources)}`;
    }),
    `${packets.length} dossiers · ${claims} claims · ${sources} sources`,
  ];
}
