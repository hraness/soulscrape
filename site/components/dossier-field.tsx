"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/* A muted wall of real dossier cards behind the hero. The same DOM renders on
 * the server; after hydration a pointer-proximity pass sets --prox on each
 * card, edge label, and edge path so the pointer quietly reveals what is near
 * it. Clicking (or tapping) anywhere in the field sends an expanding wave
 * through the cards via --wave. A CSS-registered --breath property gives each
 * card a slow organic shimmer without any timer work. Everything is
 * decorative: aria-hidden, pointer-transparent, reduced-motion collapses
 * drift to a still collage. */

export interface FieldCard {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly portrait: string;
  readonly category: string;
  readonly claims: number;
  readonly events: number;
  readonly sources: number;
  /** Center position as a percentage of the field; may sit past the edges. */
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
  readonly width: number;
  readonly drift: readonly [number, number];
  readonly seconds: number;
  readonly delay: number;
  readonly bloom?: boolean;
}

export interface FieldEdge {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
  readonly pulse?: boolean;
}

/* Desk instruments: the trading-floor layer — facet tickers, trait candle
 * charts, tape rows, and claim-kind chips sharing the same reveal contract
 * as the cards. */
export interface Candle {
  readonly o: number;
  readonly h: number;
  readonly l: number;
  readonly c: number;
}

export interface DeskItemBase {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
  readonly drift: readonly [number, number];
  readonly seconds: number;
  readonly delay: number;
  readonly bloom?: boolean;
}

export type DeskItem = DeskItemBase &
  (
    | { readonly kind: "ticker"; readonly symbol: string; readonly delta: number }
    | { readonly kind: "candles"; readonly title: string; readonly candles: readonly Candle[] }
    | { readonly kind: "tape"; readonly time: string; readonly tag: string; readonly text: string }
    | { readonly kind: "claim"; readonly claim: "fact" | "stated belief" | "pattern" | "speculation" }
  );

function edgePath(from: FieldCard, to: FieldCard): string {
  const midX = (from.x + to.x) / 2;
  const lift = Math.min(10, Math.abs(from.y - to.y) * 0.5 + 5);
  const controlY = Math.min(from.y, to.y) - lift;
  return `M ${from.x} ${from.y} Q ${midX} ${controlY} ${to.x} ${to.y}`;
}

function edgeLabelPoint(from: FieldCard, to: FieldCard): readonly [number, number] {
  const midX = (from.x + to.x) / 2;
  const lift = Math.min(8, Math.abs(from.y - to.y) * 0.4 + 4);
  const midY = (from.y + to.y) / 2 - lift * 0.5;
  return [midX, midY];
}

function CandleChart({ candles }: Readonly<{ candles: readonly Candle[] }>) {
  const slot = 72 / candles.length;
  const body = Math.min(4.4, slot * 0.55);
  const y = (v: number) => 34 - v * 30;
  return (
    <svg aria-hidden="true" className="desk-candles-svg" preserveAspectRatio="none" viewBox="0 0 72 34">
      {candles.map((candle, i) => {
        const cx = slot * i + slot / 2;
        const up = candle.c >= candle.o;
        const top = y(Math.max(candle.o, candle.c));
        const height = Math.max(1.4, Math.abs(y(candle.o) - y(candle.c)));
        return (
          <g className={up ? "desk-candle up" : "desk-candle down"} key={i}>
            <line strokeWidth={1.1} x1={cx} x2={cx} y1={y(candle.h)} y2={y(candle.l)} />
            <rect height={height} rx="0.6" width={body} x={cx - body / 2} y={top} />
          </g>
        );
      })}
    </svg>
  );
}

function DeskItemView({ item }: Readonly<{ item: DeskItem }>) {
  const style = {
    "--x": `${item.x}%`,
    "--y": `${item.y}%`,
    "--r": `${item.rotate}deg`,
    "--dx": `${item.drift[0]}px`,
    "--dy": `${item.drift[1]}px`,
    "--s": `${item.seconds}s`,
    "--d": `${item.delay}s`,
    "--bs": `${item.seconds * 0.31 + 7}s`,
    "--bd": `${item.delay * 0.7}s`,
  } as CSSProperties;
  const cls = `desk-item desk-item--${item.kind}${item.bloom === true ? " desk-item--bloom" : ""}`;
  switch (item.kind) {
    case "ticker":
      return (
        <span className={cls} data-prox="" style={style}>
          <b>{item.symbol}</b>
          <i className={item.delta >= 0 ? "up" : "down"}>
            {item.delta >= 0 ? "+" : "−"}{Math.abs(item.delta).toFixed(1)}
          </i>
        </span>
      );
    case "candles":
      return (
        <article className={cls} data-prox="" style={style}>
          <h3>{item.title}</h3>
          <CandleChart candles={item.candles} />
        </article>
      );
    case "tape":
      return (
        <p className={cls} data-prox="" style={style}>
          <time>{item.time}</time>
          <em>{item.tag}</em>
          {item.text}
        </p>
      );
    case "claim":
      return (
        <span className={cls} data-claim={item.claim} data-prox="" style={style}>
          {item.claim}
        </span>
      );
  }
}

const REVEAL_RADIUS = 340;
const WAVE_SPEED = 560;   // px/s — the ring's expanding front
const WAVE_BAND = 150;    // px — how wide the lit band stays
const WAVE_SECONDS = 1.8; // total wave lifetime
const MAX_WAVES = 4;

export function DossierField({
  cards,
  className,
  deskItems = [],
  edges,
  tape = [],
}: Readonly<{
  cards: readonly FieldCard[];
  className?: string;
  deskItems?: readonly DeskItem[];
  edges: readonly FieldEdge[];
  tape?: readonly string[];
}>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardById = new Map(cards.map((card) => [card.id, card]));

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-prox]"));
    if (targets.length === 0) return;
    const centers = new Map<HTMLElement, readonly [number, number]>();
    const measure = () => {
      centers.clear();
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        centers.set(el, [rect.left + rect.width / 2, rect.top + rect.height / 2]);
      }
    };
    measure();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const waves: { x: number; y: number; t0: number }[] = [];
    let raf = 0;
    let waveRaf = 0;
    let pointerX = -10000;
    let pointerY = -10000;

    const apply = () => {
      raf = 0;
      for (const el of targets) {
        const center = centers.get(el);
        if (center === undefined) continue;
        const distance = Math.hypot(center[0] - pointerX, center[1] - pointerY);
        const proximity = Math.max(0, 1 - distance / REVEAL_RADIUS);
        el.style.setProperty("--prox", proximity.toFixed(3));
      }
    };
    const schedule = () => {
      if (raf === 0) raf = requestAnimationFrame(apply);
    };
    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      schedule();
    };
    const onAway = () => {
      pointerX = -10000;
      pointerY = -10000;
      schedule();
    };

    /* A click plants an expanding ring: each card lights as the front passes
     * it, then dims as the ring moves on. --wave fades with the ring's age. */
    const applyWaves = (now: number) => {
      waveRaf = 0;
      let alive = false;
      for (const el of targets) {
        const center = centers.get(el);
        let strongest = 0;
        if (center !== undefined) {
          for (const wave of waves) {
            const elapsed = (now - wave.t0) / 1000;
            if (elapsed > WAVE_SECONDS) continue;
            alive = true;
            const front = elapsed * WAVE_SPEED;
            const distance = Math.abs(Math.hypot(center[0] - wave.x, center[1] - wave.y) - front);
            const band = Math.max(0, 1 - distance / WAVE_BAND);
            const strength = band * Math.max(0, 1 - elapsed / WAVE_SECONDS);
            if (strength > strongest) strongest = strength;
          }
        }
        el.style.setProperty("--wave", strongest.toFixed(3));
      }
      for (let index = waves.length - 1; index >= 0; index -= 1) {
        if ((now - waves[index].t0) / 1000 > WAVE_SECONDS) waves.splice(index, 1);
      }
      if (alive) waveRaf = requestAnimationFrame(applyWaves);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (reduced || centers.size === 0) return;
      if (waves.length >= MAX_WAVES) waves.shift();
      waves.push({ x: event.clientX, y: event.clientY, t0: performance.now() });
      if (waveRaf === 0) waveRaf = requestAnimationFrame(applyWaves);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", measure, { capture: true, passive: true });
    window.addEventListener("resize", measure);
    document.documentElement.addEventListener("pointerleave", onAway);
    window.addEventListener("blur", onAway);
    const wall = root.parentElement;
    wall?.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", measure, { capture: true });
      window.removeEventListener("resize", measure);
      document.documentElement.removeEventListener("pointerleave", onAway);
      window.removeEventListener("blur", onAway);
      wall?.removeEventListener("pointerdown", onPointerDown);
      if (raf !== 0) cancelAnimationFrame(raf);
      if (waveRaf !== 0) cancelAnimationFrame(waveRaf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`dossier-field${className === undefined ? "" : ` ${className}`}`}
      ref={rootRef}
    >
      <svg className="dossier-edges" preserveAspectRatio="none" viewBox="0 0 100 100">
        {edges.map((edge) => {
          const from = cardById.get(edge.from);
          const to = cardById.get(edge.to);
          if (from === undefined || to === undefined) return null;
          return (
            <path
              className={edge.pulse === true ? "dossier-edge dossier-edge--pulse" : "dossier-edge"}
              d={edgePath(from, to)}
              data-prox=""
              key={`${edge.from}-${edge.to}`}
            />
          );
        })}
      </svg>
      {edges.map((edge) => {
        if (edge.label === undefined) return null;
        const from = cardById.get(edge.from);
        const to = cardById.get(edge.to);
        if (from === undefined || to === undefined) return null;
        const [labelX, labelY] = edgeLabelPoint(from, to);
        return (
          <span
            className="dossier-edge-label"
            data-prox=""
            key={`label-${edge.from}-${edge.to}`}
            style={{ left: `${labelX}%`, top: `${labelY}%` }}
          >
            {edge.label}
          </span>
        );
      })}
      {cards.map((card) => (
        <article
          className={`dossier-card${card.bloom === true ? " dossier-card--bloom" : ""}`}
          data-kind={card.category}
          data-prox=""
          key={card.id}
          style={{
            "--x": `${card.x}%`,
            "--y": `${card.y}%`,
            "--w": `${card.width}px`,
            "--r": `${card.rotate}deg`,
            "--dx": `${card.drift[0]}px`,
            "--dy": `${card.drift[1]}px`,
            "--s": `${card.seconds}s`,
            "--d": `${card.delay}s`,
            "--bs": `${card.seconds * 0.31 + 7}s`,
            "--bd": `${card.delay * 0.7}s`,
          } as CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative local portrait inside an aria-hidden backdrop */}
          <img alt="" className="dossier-card-portrait" height={44} src={card.portrait} width={44} />
          <span className="dossier-card-main">
            <h3 className="dossier-card-name">{card.name}</h3>
            <span className="dossier-card-role">{card.summary}</span>
            <span className="dossier-card-stats">
              {card.claims} claims · {card.events} events · {card.sources} sources
            </span>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative brand mark inside an aria-hidden backdrop */}
          <img alt="" className="dossier-card-seal" height={15} src="/marks/soulscrape.svg" width={15} />
        </article>
      ))}
      {deskItems.map((item) => <DeskItemView item={item} key={item.id} />)}
      {tape.length > 0 && (
        <div className="desk-tape-strip" data-prox="">
          <div className="desk-tape-track">
            {[0, 1].map((copy) => (
              <span key={copy}>{tape.join("  ·  ")}  ·  </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
