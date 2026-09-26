import { createElement, Fragment, type ReactNode } from "react";
import { SyntaxCode } from "@hraness/design-kit/react/server";

const MAX_MARKDOWN_BYTES = 128 * 1024;
const MAX_BLOCKS = 400;
const MAX_INLINE_NODES = 4000;
const MAX_LIST_DEPTH = 2;

/**
 * Renders a bounded Markdown subset to React elements. Prose stays escaped
 * React text; fenced code uses the shared highlighter's escaped output.
 * Supported: ATX headings, paragraphs, blockquotes, unordered
 * and ordered lists (one level of nesting), fenced code, rules,
 * and inline emphasis/code/links. Only `https:` links render as anchors.
 */
export type MarkdownOptions = Readonly<{
  /**
   * `site` also renders root-relative links (`/docs`) as same-tab anchors and
   * gives headings ids. Use it only for first-party content such as blog posts;
   * member-published Markdown keeps the default.
   */
  trust?: "member" | "site";
}>;

export function renderMarkdown(source: string, depth = 0, options: MarkdownOptions = {}): ReactNode {
  const bytes = new TextEncoder().encode(source).byteLength;
  if (bytes > MAX_MARKDOWN_BYTES) return <p className="md-truncated">This document exceeds the rendering limit.</p>;
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let key = 0;
  while (index < lines.length && blocks.length < MAX_BLOCKS) {
    const line = lines[index]!;
    if (line.trim() === "") {
      index += 1;
      continue;
    }
    if (/^```/u.test(line.trimStart())) {
      const language = line.trimStart().slice(3).trim();
      const collected: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/u.test(lines[index]!.trimStart())) {
        collected.push(lines[index]!);
        index += 1;
      }
      index += 1;
      blocks.push(<pre key={key++}><SyntaxCode code={collected.join("\n")} language={language} styles="classes" /></pre>);
      continue;
    }
    const rule = /^\s{0,3}(-{3,}|\*{3,}|_{3,})\s*$/u.exec(line);
    if (rule !== null) {
      blocks.push(<hr key={key++} />);
      index += 1;
      continue;
    }
    const heading = /^\s{0,3}(#{1,6})\s+(.*)$/u.exec(line);
    if (heading !== null) {
      const level = heading[1]!.length;
      const props = options.trust === "site" ? { key: key++, id: slugifyHeading(heading[2]!) } : { key: key++ };
      blocks.push(createElement(`h${level}`, props, ...inline(heading[2]!, options)));
      index += 1;
      continue;
    }
    const quote = /^\s{0,3}>\s?(.*)$/u.exec(line);
    if (quote !== null) {
      const collected: string[] = [];
      while (index < lines.length) {
        const part = /^\s{0,3}>\s?(.*)$/u.exec(lines[index]!);
        if (part === null) break;
        collected.push(part[1]!);
        index += 1;
      }
      blocks.push(
        <blockquote key={key++}>
          {depth < 8 ? renderMarkdown(collected.join("\n"), depth + 1, options) : collected.join(" ")}
        </blockquote>,
      );
      continue;
    }
    const list = listMatch(line);
    if (list !== null) {
      const items: ListItem[] = [];
      const blockOrdered = list.ordered;
      const blockIndent = list.indent;
      while (index < lines.length) {
        const item = listMatch(lines[index]!);
        if (item === null) break;
        if (item.indent === blockIndent && item.ordered !== blockOrdered) break;
        items.push(item);
        index += 1;
      }
      blocks.push(<Fragment key={key++}>{renderListItems(items, () => key++, options)}</Fragment>);
      continue;
    }
    const collected: string[] = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index]!;
      if (
        next.trim() === "" || /^```/u.test(next.trimStart()) || listMatch(next) !== null
        || /^\s{0,3}(#{1,6}\s|>|-{3,}\s*$|\*{3,}\s*$)/u.test(next)
      ) break;
      collected.push(next);
      index += 1;
    }
    blocks.push(<p key={key++}>{...inline(collected.join(" ").trim(), options)}</p>);
  }
  return <>{blocks}</>;
}

type ListItem = Readonly<{ ordered: boolean; indent: number; text: string }>;

function listMatch(line: string): ListItem | null {
  const match = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/u.exec(line);
  if (match === null) return null;
  const indent = Math.floor(match[1]!.replaceAll("\t", "    ").length / 2);
  return { indent, ordered: /^\d/u.test(match[2]!), text: match[3]! };
}

function renderListItems(items: readonly ListItem[], nextKey: () => number, options: MarkdownOptions): ReactNode {
  if (items.length === 0) return null;
  const min = Math.min(...items.map(item => item.indent));
  type Node = { item: ListItem; children: ListItem[] };
  const nodes: Node[] = [];
  const orphans: ListItem[] = [];
  for (const item of items) {
    if (item.indent === min) nodes.push({ item, children: [] });
    else if (nodes.length > 0) nodes[nodes.length - 1]!.children.push(item);
    else orphans.push(item);
  }
  if (nodes.length === 0) return renderListItems(orphans, nextKey, options);
  const ordered = nodes[0]!.item.ordered;
  const list = createElement(
    ordered ? "ol" : "ul",
    {},
    ...nodes.map(node => (
      <li key={nextKey()}>
        {...inline(node.item.text, options)}
        {node.children.length > 0 && min < MAX_LIST_DEPTH * 4
          ? renderListItems(node.children, nextKey, options)
          : node.children.flatMap(child => inline(child.text, options))}
      </li>
    )),
  );
  return orphans.length === 0
    ? list
    : <>{renderListItems(orphans, nextKey, options)}{list}</>;
}

const INLINE_PATTERNS = [
  { kind: "code", re: /`([^`\n]+)`/su },
  { kind: "strong", re: /\*\*([^*\n]+)\*\*/su },
  { kind: "em", re: /\*([^*\n]+)\*/su },
  { kind: "link", re: /\[([^\]\n]{1,200})\]\((https:\/\/[^)\s]{1,1000})\)/su },
] as const;

const SITE_LINK = /\[([^\]\n]{1,200})\]\((https:\/\/[^)\s]{1,1000}|\/(?!\/)[^)\s]{0,1000})\)/su;

/** The id a `site` heading receives, matching the blog's contents list. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

function inline(text: string, options: MarkdownOptions = {}): ReactNode[] {
  const patterns = options.trust === "site"
    ? INLINE_PATTERNS.map(pattern => (pattern.kind === "link" ? { kind: pattern.kind, re: SITE_LINK } : pattern))
    : INLINE_PATTERNS;
  const out: ReactNode[] = [];
  let rest = text;
  let key = 0;
  let budget = MAX_INLINE_NODES;
  while (rest.length > 0 && budget-- > 0) {
    let best: { match: RegExpExecArray; kind: (typeof INLINE_PATTERNS)[number]["kind"] } | null = null;
    for (const pattern of patterns) {
      const match = pattern.re.exec(rest);
      if (match !== null && (best === null || match.index < best.match.index)) {
        best = { match, kind: pattern.kind };
      }
    }
    if (best === null) break;
    const { match, kind } = best;
    if (match.index > 0) out.push(rest.slice(0, match.index));
    if (kind === "code") out.push(<code key={key++}>{match[1]}</code>);
    else if (kind === "strong") out.push(<strong key={key++}>{match[1]}</strong>);
    else if (kind === "em") out.push(<em key={key++}>{match[1]}</em>);
    else if (options.trust === "site") {
      out.push(<a key={key++} href={match[2]}>{match[1]}</a>);
    } else {
      out.push(
        <a key={key++} href={match[2]} rel="noopener ugc" target="_blank">
          {match[1]}
        </a>,
      );
    }
    rest = rest.slice(match.index + match[0].length);
  }
  if (rest.length > 0) out.push(rest);
  return out;
}
