"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/* A muted trading desk behind the hero — the person distilled into
 * instruments. Facet tickers, candle charts of trait trajectories, a tape of
 * evidence events, and claim-kind chips drift on a slow organic path while a
 * wandering focus lifts whatever it nears out of the blur via --prox.
 * A real pointer takes control of the focus; a press anywhere on the wall
 * sends a reveal wave through the desk. Everything is decorative:
 * aria-hidden, pointer-transparent, reduced-motion collapses to a still
 * collage. */

interface DeskBase {
  readonly id: string;
  /** Center position as a percentage of the field; may sit past the edges. */
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
  readonly drift: readonly [number, number];
  readonly seconds: number;
  readonly delay: number;
  readonly bloom?: boolean;
}

export interface Candle {
  readonly o: number;
  readonly h: number;
  readonly l: number;
  readonly c: number;
}

export type DeskItem = DeskBase &
  (
    | { readonly kind: "ticker"; readonly symbol: string; readonly delta: number }
    | { readonly kind: "candles"; readonly title: string; readonly candles: readonly Candle[] }
    | { readonly kind: "tape"; readonly time: string; readonly tag: string; readonly text: string }
    | { readonly kind: "claim"; readonly claim: "fact" | "stated belief" | "pattern" | "speculation" }
  );

export interface DeskEdge {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
  readonly pulse?: boolean;
}

const ITEMS: readonly DeskItem[] = [
  {
    id: "taste", kind: "ticker", symbol: "TASTE", delta: 4.2,
    x: 10, y: 26, rotate: -1.6, drift: [10, 13], seconds: 38, delay: -8,
  },
  {
    id: "curiosity", kind: "candles", title: "curiosity · sessions",
    candles: [
      { o: 0.30, h: 0.48, l: 0.26, c: 0.44 }, { o: 0.44, h: 0.56, l: 0.38, c: 0.40 },
      { o: 0.40, h: 0.62, l: 0.38, c: 0.58 }, { o: 0.58, h: 0.70, l: 0.50, c: 0.66 },
      { o: 0.66, h: 0.72, l: 0.52, c: 0.56 }, { o: 0.56, h: 0.68, l: 0.54, c: 0.64 },
      { o: 0.64, h: 0.82, l: 0.62, c: 0.78 },
    ],
    x: 32, y: 36, rotate: 1.5, drift: [12, 10], seconds: 42, delay: -21, bloom: true,
  },
  {
    id: "humor", kind: "ticker", symbol: "HUMOR", delta: 2.6,
    x: 50, y: 12, rotate: -1.2, drift: [9, 12], seconds: 40, delay: -5,
  },
  {
    id: "teams", kind: "tape", time: "09:41", tag: "pattern", text: "prefers small teams — seen 4×",
    x: 66, y: 44, rotate: -1.4, drift: [11, 13], seconds: 45, delay: -14,
  },
  {
    id: "risk", kind: "ticker", symbol: "RISK", delta: -1.8,
    x: 86, y: 32, rotate: 1.8, drift: [13, 9], seconds: 44, delay: -30,
  },
  {
    id: "conflict", kind: "candles", title: "conflict style",
    candles: [
      { o: 0.62, h: 0.72, l: 0.54, c: 0.58 }, { o: 0.58, h: 0.60, l: 0.40, c: 0.44 },
      { o: 0.44, h: 0.50, l: 0.30, c: 0.34 }, { o: 0.34, h: 0.46, l: 0.30, c: 0.42 },
      { o: 0.42, h: 0.56, l: 0.38, c: 0.52 }, { o: 0.52, h: 0.58, l: 0.44, c: 0.48 },
      { o: 0.48, h: 0.64, l: 0.46, c: 0.60 },
    ],
    x: 20, y: 76, rotate: -0.9, drift: [9, 12], seconds: 41, delay: -19,
  },
  {
    id: "lisbon", kind: "tape", time: "10:02", tag: "fact", text: "moved to lisbon — confirmed",
    x: 46, y: 62, rotate: 0.8, drift: [8, 11], seconds: 48, delay: -26,
  },
  {
    id: "speculation", kind: "claim", claim: "speculation",
    x: 60, y: 24, rotate: 1.7, drift: [11, 10], seconds: 39, delay: -29,
  },
  {
    id: "craft", kind: "ticker", symbol: "CRAFT", delta: 5.4,
    x: 84, y: 68, rotate: -0.6, drift: [14, 8], seconds: 39, delay: -2, bloom: true,
  },
  {
    id: "disagree", kind: "tape", time: "11:20", tag: "contradicts", text: "two sources disagree",
    x: 90, y: 52, rotate: 1.4, drift: [8, 13], seconds: 47, delay: -18,
  },
  {
    id: "stamina", kind: "candles", title: "stamina · q3",
    candles: [
      { o: 0.36, h: 0.50, l: 0.32, c: 0.46 }, { o: 0.46, h: 0.58, l: 0.42, c: 0.54 },
      { o: 0.54, h: 0.66, l: 0.48, c: 0.62 }, { o: 0.62, h: 0.70, l: 0.56, c: 0.68 },
      { o: 0.68, h: 0.78, l: 0.60, c: 0.72 }, { o: 0.72, h: 0.76, l: 0.62, c: 0.66 },
      { o: 0.66, h: 0.80, l: 0.64, c: 0.76 },
    ],
    x: 68, y: 88, rotate: 2.0, drift: [10, 12], seconds: 46, delay: -9,
  },
  {
    id: "calm", kind: "ticker", symbol: "CALM", delta: 0.9,
    x: 38, y: 86, rotate: -2.0, drift: [10, 10], seconds: 36, delay: -33,
  },
  {
    id: "email", kind: "tape", time: "15:52", tag: "stated belief", text: "\u201Cemail beats meetings\u201D",
    x: 8, y: 56, rotate: 1.3, drift: [9, 11], seconds: 44, delay: -27,
  },
  {
    id: "fact", kind: "claim", claim: "fact",
    x: 76, y: 14, rotate: -1.5, drift: [9, 15], seconds: 43, delay: -22,
  },
  {
    id: "pattern", kind: "claim", claim: "pattern",
    x: 30, y: 52, rotate: -1.1, drift: [10, 11], seconds: 37, delay: -24,
  },
  {
    id: "trust", kind: "ticker", symbol: "TRUST", delta: -0.7,
    x: 56, y: 78, rotate: 1.1, drift: [12, 9], seconds: 35, delay: -15,
  },
];

const EDGES: readonly DeskEdge[] = [
  { from: "teams", to: "pattern", label: "supports" },
  { from: "lisbon", to: "fact", label: "settles" },
  { from: "disagree", to: "speculation", label: "holds open", pulse: true },
  { from: "email", to: "fact", label: "cited" },
  { from: "curiosity", to: "craft", label: "feeds" },
  { from: "trust", to: "conflict", label: "prices" },
];

const TAPE: readonly string[] = [
  "TASTE +4.2", "HUMOR +2.6", "RISK −1.8", "CRAFT +5.4", "CALM +0.9", "TRUST −0.7",
  "fact: moved to lisbon", "pattern: small teams ×4", "speculation: regrets the exit",
  "stated belief: email > meetings", "contradicts: two sources", "cited: 3 sources",
];

function edgePath(from: DeskBase, to: DeskBase): string {
  const midX = (from.x + to.x) / 2;
  const lift = Math.min(10, Math.abs(from.y - to.y) * 0.5 + 5);
  const controlY = Math.min(from.y, to.y) - lift;
  return `M ${from.x} ${from.y} Q ${midX} ${controlY} ${to.x} ${to.y}`;
}

function edgeLabelPoint(from: DeskBase, to: DeskBase): readonly [number, number] {
  const midX = (from.x + to.x) / 2;
  const lift = Math.min(8, Math.abs(from.y - to.y) * 0.4 + 4);
  const midY = (from.y + to.y) / 2 - lift * 0.5;
  return [midX, midY];
}

function positionStyle(item: DeskBase): CSSProperties {
  return {
    "--x": `${item.x}%`,
    "--y": `${item.y}%`,
    "--r": `${item.rotate}deg`,
    "--dx": `${item.drift[0]}px`,
    "--dy": `${item.drift[1]}px`,
    "--s": `${item.seconds}s`,
    "--d": `${item.delay}s`,
    "--bd": `${item.delay * 0.7}s`,
  } as CSSProperties;
}

function CandleChart({ candles }: Readonly<{ candles: readonly Candle[] }>) {
  const slot = 72 / candles.length;
  const wick = 1.1;
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
            <line strokeWidth={wick} x1={cx} x2={cx} y1={y(candle.h)} y2={y(candle.l)} />
            <rect height={height} rx="0.6" width={body} x={cx - body / 2} y={top} />
          </g>
        );
      })}
    </svg>
  );
}

const REVEAL_RADIUS = 330;
const WAVE_SPEED = 0.55; // px per ms — the click wave crosses the desk in about a second
const WAVE_BAND = 140;
const WAVE_LIFE = 1600;

interface Wave {
  readonly x: number;
  readonly y: number;
  readonly born: number;
}

export function DeskField({
  className,
  edges = EDGES,
  items = ITEMS,
  tape = TAPE,
}: Readonly<{
  className?: string;
  edges?: readonly DeskEdge[];
  items?: readonly DeskItem[];
  tape?: readonly string[];
}>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemById = new Map(items.map((item) => [item.id, item]));

  useEffect(() => {
    const root = rootRef.current;
    if (root === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

    /* A focus point wanders the desk on a slow organic path, waking whatever
     * it passes over. A real pointer takes precedence and hands control back
     * a few seconds after it rests. Presses on the wall send a reveal wave
     * through the items. The smoothed focus lerps so mode changes glide. */
    const born = performance.now();
    let raf = 0;
    let running = false;
    let focusX: number | null = null;
    let focusY: number | null = null;
    let pointerX = -10000;
    let pointerY = -10000;
    let lastPointerAt = -10000;
    const waves: Wave[] = [];

    const wander = (now: number) => {
      const rect = root.getBoundingClientRect();
      const t = (now - born) / 1000;
      // Incommensurate sine pairs: a non-repeating drift that visits the
      // whole desk while keeping clear of the outer rim.
      return {
        x: rect.left + (0.5 + 0.33 * Math.sin(t * 0.19 + 0.7) + 0.09 * Math.sin(t * 0.47 + 2.1)) * rect.width,
        y: rect.top + (0.5 + 0.33 * Math.sin(t * 0.141 + 2.9) + 0.09 * Math.cos(t * 0.37)) * rect.height,
      };
    };

    const tick = (now: number) => {
      raf = 0;
      const target = now - lastPointerAt < 3500 ? { x: pointerX, y: pointerY } : wander(now);
      if (focusX === null || focusY === null) {
        focusX = target.x;
        focusY = target.y;
      }
      focusX += (target.x - focusX) * 0.055;
      focusY += (target.y - focusY) * 0.055;
      while (waves.length > 0 && now - waves[0]!.born > WAVE_LIFE) waves.shift();
      for (const el of targets) {
        const center = centers.get(el);
        if (center === undefined) continue;
        const distance = Math.hypot(center[0] - focusX, center[1] - focusY);
        let prox = Math.max(0, 1 - distance / REVEAL_RADIUS);
        for (const wave of waves) {
          const age = now - wave.born;
          const radius = age * WAVE_SPEED;
          const ring = Math.max(0, 1 - Math.abs(Math.hypot(center[0] - wave.x, center[1] - wave.y) - radius) / WAVE_BAND);
          prox = Math.max(prox, ring * (1 - age / WAVE_LIFE));
        }
        el.style.setProperty("--prox", prox.toFixed(3));
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const stopLoop = () => {
      running = false;
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      lastPointerAt = performance.now();
    };
    const onDown = (event: PointerEvent) => {
      // A press on real controls belongs to them; a press anywhere else on the
      // hero fires a reveal wave through the desk.
      if (event.target instanceof Element && event.target.closest("a, button, summary, input, select, textarea, label, [role='button']")) return;
      const rect = root.getBoundingClientRect();
      if (event.clientY < rect.top - 40 || event.clientY > rect.bottom + 40) return;
      waves.push({ x: event.clientX, y: event.clientY, born: performance.now() });
      if (waves.length > 3) waves.shift();
    };
    const onAway = () => {
      lastPointerAt = -10000;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry === undefined) return;
      if (entry.isIntersecting) startLoop();
      else stopLoop();
    });
    observer.observe(root);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", measure, { capture: true, passive: true });
    window.addEventListener("resize", measure);
    document.documentElement.addEventListener("pointerleave", onAway);
    window.addEventListener("blur", onAway);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", measure, { capture: true });
      window.removeEventListener("resize", measure);
      document.documentElement.removeEventListener("pointerleave", onAway);
      window.removeEventListener("blur", onAway);
      stopLoop();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`desk-field${className === undefined ? "" : ` ${className}`}`}
      ref={rootRef}
    >
      <svg className="desk-edges" preserveAspectRatio="none" viewBox="0 0 100 100">
        {edges.map((edge) => {
          const from = itemById.get(edge.from);
          const to = itemById.get(edge.to);
          if (from === undefined || to === undefined) return null;
          return (
            <path
              className={edge.pulse === true ? "desk-edge desk-edge--pulse" : "desk-edge"}
              d={edgePath(from, to)}
              data-prox=""
              key={`${edge.from}-${edge.to}`}
            />
          );
        })}
      </svg>
      {edges.map((edge) => {
        if (edge.label === undefined) return null;
        const from = itemById.get(edge.from);
        const to = itemById.get(edge.to);
        if (from === undefined || to === undefined) return null;
        const [labelX, labelY] = edgeLabelPoint(from, to);
        return (
          <span
            className="desk-edge-label"
            data-prox=""
            key={`label-${edge.from}-${edge.to}`}
            style={{ left: `${labelX}%`, top: `${labelY}%` }}
          >
            {edge.label}
          </span>
        );
      })}
      {items.map((item) => {
        const style = positionStyle(item);
        const cls = `desk-item desk-item--${item.kind}${item.bloom === true ? " desk-item--bloom" : ""}`;
        switch (item.kind) {
          case "ticker":
            return (
              <span className={cls} data-prox="" key={item.id} style={style}>
                <b>{item.symbol}</b>
                <i className={item.delta >= 0 ? "up" : "down"}>
                  {item.delta >= 0 ? "+" : "−"}{Math.abs(item.delta).toFixed(1)}
                </i>
              </span>
            );
          case "candles":
            return (
              <article className={cls} data-prox="" key={item.id} style={style}>
                <h3>{item.title}</h3>
                <CandleChart candles={item.candles} />
              </article>
            );
          case "tape":
            return (
              <p className={cls} data-prox="" key={item.id} style={style}>
                <time>{item.time}</time>
                <em>{item.tag}</em>
                {item.text}
              </p>
            );
          case "claim":
            return (
              <span className={cls} data-claim={item.claim} data-prox="" key={item.id} style={style}>
                {item.claim}
              </span>
            );
        }
      })}
      <div className="desk-tape-strip">
        <div className="desk-tape-track">
          {[0, 1].map((copy) => (
            <span aria-hidden={copy === 1 ? "true" : undefined} key={copy}>
              {tape.join("  ·  ")}  ·  
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
