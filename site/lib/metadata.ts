import type { Metadata } from "next";

import { siteUrl } from "./site";

export const SITE_NAME = "soulscrape";
export const HOME_TITLE = "soulscrape: dated, cited dossiers on people";
export const HOME_DESCRIPTION =
  "A free agent skill that builds a dated, cited dossier on a person from sources you're allowed to use. Keep it private or publish it for anyone to read.";
export const NOT_FOUND_TITLE = "Not found · soulscrape";

/** `Page · soulscrape`, naming the brand once. */
export function pageTitle(page: string, site: string = SITE_NAME): string {
  return `${page} · ${site}`;
}

export function sentenceCase(text: string): string {
  return text.length === 0 ? text : text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * A page's metadata with share text that matches the page itself, so an
 * interior page never inherits the homepage's title or description.
 */
export function pageMetadata({
  description,
  path,
  title,
  type = "website",
}: Readonly<{
  description: string;
  path: `/${string}`;
  title: string;
  type?: "website" | "article" | "profile";
}>): Metadata {
  const url = siteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, type },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Shorten text for a description or share card. Keep whole sentences that
 * fit; when even the first sentence is too long, cut at a word boundary and
 * add an ellipsis. Never cut mid-word or leave ".…".
 */
export function describe(text: string, max: number): string {
  const clean = text.replace(/\s+/gu, " ").trim();
  if (clean.length <= max) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+(?=\s|$)/gu) ?? [];
  let kept = "";
  for (const sentence of sentences) {
    const next = `${kept}${kept === "" ? "" : " "}${sentence.trim()}`;
    if (next.length > max) break;
    kept = next;
  }
  if (kept !== "") return kept;
  const room = clean.slice(0, max - 1);
  const lastSpace = room.lastIndexOf(" ");
  const cut = (lastSpace > 0 ? room.slice(0, lastSpace) : room).replace(/[\s,;:.\-–—]+$/u, "");
  return `${cut}…`;
}
