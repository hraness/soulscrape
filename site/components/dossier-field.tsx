"use client";

import { attachHeroLight } from "@hraness/design-kit/browser";
import { useEffect, useRef, type CSSProperties } from "react";

/* Decorative, server-rendered product cards. Shared pointer lighting reveals
 * nearby items and owns reduced-motion, visibility and cleanup. The static
 * composition remains readable without hydration and never receives focus. */

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

/* Desk items: quotations from real claims and claim-kind chips, sharing the
 * same reveal contract as the cards. */
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
    | { readonly kind: "tape"; readonly tag: string; readonly text: string; readonly meta: string }
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
    case "tape":
      return (
        <p className={cls} data-hraness-hero-item="" style={style}>
          <em>{item.tag}</em>
          {item.text}
          <span className="desk-tape-meta">{item.meta}</span>
        </p>
      );
    case "claim":
      return (
        <span className={cls} data-claim={item.claim} data-hraness-hero-item="" style={style}>
          {item.claim}
        </span>
      );
  }
}


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
    const wall = rootRef.current?.parentElement;
    if (wall === undefined || wall === null) return;
    return attachHeroLight(wall);
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
            data-hraness-hero-item=""
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
          data-hraness-hero-item=""
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
        <div className="desk-tape-strip" data-hraness-hero-item="">
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
