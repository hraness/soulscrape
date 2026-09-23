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

/* The desk layer: soulscrape's instruments — facet tickers, trait candles,
 * an evidence tape, and the contract's claim kinds — placed in the gaps the
 * dossier cards leave open. */
const DESK_SEEDS: readonly DeskItem[] = [
  { id: "taste", kind: "ticker", symbol: "TASTE", delta: 4.2,
    x: 26, y: 16, rotate: -1.6, drift: [10, 13], seconds: 38, delay: -8 },
  { id: "humor", kind: "ticker", symbol: "HUMOR", delta: 2.6,
    x: 54, y: 10, rotate: -1.2, drift: [9, 12], seconds: 40, delay: -5 },
  { id: "risk", kind: "ticker", symbol: "RISK", delta: -1.8,
    x: 78, y: 30, rotate: 1.8, drift: [13, 9], seconds: 44, delay: -30 },
  { id: "craft", kind: "ticker", symbol: "CRAFT", delta: 5.4,
    x: 90, y: 78, rotate: -0.6, drift: [14, 8], seconds: 39, delay: -2, bloom: true },
  { id: "calm", kind: "ticker", symbol: "CALM", delta: 0.9,
    x: 44, y: 94, rotate: -2.0, drift: [10, 10], seconds: 36, delay: -33 },
  { id: "trust", kind: "ticker", symbol: "TRUST", delta: -0.7,
    x: 64, y: 94, rotate: 1.1, drift: [12, 9], seconds: 35, delay: -15 },
  {
    id: "curiosity", kind: "candles", title: "curiosity · sessions",
    candles: [
      { o: 0.30, h: 0.48, l: 0.26, c: 0.44 }, { o: 0.44, h: 0.56, l: 0.38, c: 0.40 },
      { o: 0.40, h: 0.62, l: 0.38, c: 0.58 }, { o: 0.58, h: 0.70, l: 0.50, c: 0.66 },
      { o: 0.66, h: 0.72, l: 0.52, c: 0.56 }, { o: 0.56, h: 0.68, l: 0.54, c: 0.64 },
      { o: 0.64, h: 0.82, l: 0.62, c: 0.78 },
    ],
    x: 34, y: 52, rotate: 1.5, drift: [12, 10], seconds: 42, delay: -21, bloom: true,
  },
  {
    id: "conflict", kind: "candles", title: "conflict style",
    candles: [
      { o: 0.62, h: 0.72, l: 0.54, c: 0.58 }, { o: 0.58, h: 0.60, l: 0.40, c: 0.44 },
      { o: 0.44, h: 0.50, l: 0.30, c: 0.34 }, { o: 0.34, h: 0.46, l: 0.30, c: 0.42 },
      { o: 0.42, h: 0.56, l: 0.38, c: 0.52 }, { o: 0.52, h: 0.58, l: 0.44, c: 0.48 },
      { o: 0.48, h: 0.64, l: 0.46, c: 0.60 },
    ],
    x: 14, y: 72, rotate: -0.9, drift: [9, 12], seconds: 41, delay: -19,
  },
  {
    id: "stamina", kind: "candles", title: "stamina · q3",
    candles: [
      { o: 0.36, h: 0.50, l: 0.32, c: 0.46 }, { o: 0.46, h: 0.58, l: 0.42, c: 0.54 },
      { o: 0.54, h: 0.66, l: 0.48, c: 0.62 }, { o: 0.62, h: 0.70, l: 0.56, c: 0.68 },
      { o: 0.68, h: 0.78, l: 0.60, c: 0.72 }, { o: 0.72, h: 0.76, l: 0.62, c: 0.66 },
      { o: 0.66, h: 0.80, l: 0.64, c: 0.76 },
    ],
    x: 72, y: 62, rotate: 2.0, drift: [10, 12], seconds: 46, delay: -9,
  },
  { id: "teams", kind: "tape", time: "09:41", tag: "pattern", text: "prefers small teams — seen 4×",
    x: 52, y: 32, rotate: -1.4, drift: [11, 13], seconds: 45, delay: -14 },
  { id: "lisbon", kind: "tape", time: "10:02", tag: "fact", text: "moved to lisbon — confirmed",
    x: 24, y: 58, rotate: 0.8, drift: [8, 11], seconds: 48, delay: -26 },
  { id: "disagree", kind: "tape", time: "11:20", tag: "contradicts", text: "two sources disagree",
    x: 88, y: 44, rotate: 1.4, drift: [8, 13], seconds: 47, delay: -18 },
  { id: "email", kind: "tape", time: "15:52", tag: "stated belief", text: "“email beats meetings”",
    x: 40, y: 80, rotate: 1.3, drift: [9, 11], seconds: 44, delay: -27 },
  { id: "fact", kind: "claim", claim: "fact",
    x: 70, y: 38, rotate: -1.5, drift: [9, 15], seconds: 43, delay: -22 },
  { id: "pattern", kind: "claim", claim: "pattern",
    x: 30, y: 70, rotate: -1.1, drift: [10, 11], seconds: 37, delay: -24 },
  { id: "speculation", kind: "claim", claim: "speculation",
    x: 56, y: 68, rotate: 1.7, drift: [11, 10], seconds: 39, delay: -29 },
];

export function deskFieldItems(): readonly DeskItem[] {
  return DESK_SEEDS;
}

const DESK_TAPE: readonly string[] = [
  "TASTE +4.2", "HUMOR +2.6", "RISK −1.8", "CRAFT +5.4", "CALM +0.9", "TRUST −0.7",
  "fact: moved to lisbon", "pattern: small teams ×4", "speculation: regrets the exit",
  "stated belief: email > meetings", "contradicts: two sources", "cited: 3 sources",
];

export function deskFieldTape(): readonly string[] {
  return DESK_TAPE;
}
