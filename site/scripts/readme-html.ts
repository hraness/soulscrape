import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CodeBlock } from "../components/code-block";

const REPOSITORY_BLOB_ROOT = "https://github.com/hraness/soulscrape/blob/main/";
const REPOSITORY_RAW_ROOT = "https://raw.githubusercontent.com/hraness/soulscrape/main/";

export const LANDING_START_MARKER = "<!-- hraness:soulscrape-landing:start -->";
export const LANDING_END_MARKER = "<!-- hraness:soulscrape-landing:end -->";

function decodeCharacterReferences(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);?/giu, (_, digits: string) =>
      String.fromCodePoint(Number.parseInt(digits, 16)))
    .replace(/&#([0-9]+);?/gu, (_, digits: string) =>
      String.fromCodePoint(Number.parseInt(digits, 10)))
    .replaceAll("&colon;", ":")
    .replaceAll("&Tab;", "\t")
    .replaceAll("&NewLine;", "\n")
    .replaceAll("&amp;", "&");
}

function assertSafeTarget(encodedTarget: string): void {
  const target = decodeCharacterReferences(encodedTarget);
  const compact = target.trim().replace(/[\u0000- \u007f]+/gu, "");
  if (compact.startsWith("//")) {
    throw new Error(`README contains a protocol-relative URL: ${JSON.stringify(target)}`);
  }
  const scheme = /^([a-z][a-z0-9+.-]*):/iu.exec(compact)?.[1]?.toLowerCase();
  if (scheme !== undefined && !["http", "https", "mailto"].includes(scheme)) {
    throw new Error(`README contains a disallowed URL scheme: ${JSON.stringify(target)}`);
  }
}

function rewriteRelativeTargets(html: string): string {
  return html.replace(/(href|src)="([^"]*)"/gu, (
    attribute,
    name: "href" | "src",
    target: string,
  ) => {
    assertSafeTarget(target);
    if (
      target === ""
      || target.startsWith("#")
      || target.startsWith("/")
      || /^[a-z][a-z0-9+.-]*:/iu.test(decodeCharacterReferences(target).trim())
    ) {
      return attribute;
    }
    const root = name === "src" ? REPOSITORY_RAW_ROOT : REPOSITORY_BLOB_ROOT;
    return `${name}="${root}${target}"`;
  });
}

function headingText(html: string): string {
  // Parse text nodes instead of trying to remove nested or malformed markup.
  // The extracted text is used only to derive a restricted fragment identifier.
  let text = "";
  new HTMLRewriter().onDocument({
    text(chunk) {
      text += chunk.text;
    },
  }).transform(html);
  return decodeCharacterReferences(text)
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function githubHeadingSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Mark}\p{Number}\s_-]/gu, "")
    .replace(/\s/gu, "-");
}

function addHeadingIds(html: string): string {
  const occurrences = new Map<string, number>();
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/gu, (_, level: string, body: string) => {
    const base = githubHeadingSlug(headingText(body));
    if (base === "") throw new Error("README contains a heading without a stable fragment ID");
    const occurrence = occurrences.get(base) ?? 0;
    occurrences.set(base, occurrence + 1);
    const id = occurrence === 0 ? base : `${base}-${occurrence}`;
    return `<h${level} id="${id}">${body}</h${level}>`;
  });
}

function assertFragmentsResolve(html: string): void {
  const ids = new Set(Array.from(html.matchAll(/\sid="([^"]+)"/gu), ([, id]) => id));
  for (const [, encodedFragment] of html.matchAll(/\shref="#([^"]+)"/gu)) {
    let fragment: string;
    try {
      fragment = decodeURIComponent(encodedFragment);
    } catch {
      throw new Error(`README contains an invalid encoded fragment: ${JSON.stringify(encodedFragment)}`);
    }
    if (!ids.has(fragment)) {
      throw new Error(`README fragment has no rendered heading: ${JSON.stringify(fragment)}`);
    }
  }
}

/** Extract the README block between the landing markers, excluding the title, badge lines, and README-only blocks. */
export function extractLandingMarkdown(readme: string): string {
  const sourceLines = readme.split(/\r?\n/u);
  const end = sourceLines.indexOf(LANDING_END_MARKER);
  if (sourceLines[0] !== LANDING_START_MARKER || end < 1
    || readme.split(LANDING_START_MARKER).length !== 2
    || readme.split(LANDING_END_MARKER).length !== 2) {
    throw new Error("README landing requires unique, ordered, own-line markers");
  }
  // The site renders these same examples as its own hero and card grid, and
  // its own hero, publishing section, and FAQ cover the README-only blocks.
  // Keep both out of the site's method prose so the page says each thing once.
  const block = sourceLines.slice(1, end).join("\n").trim()
    .replace(
      /<!-- hraness:soulscrape-readme-examples:start -->[\s\S]*?<!-- hraness:soulscrape-readme-examples:end -->/gu,
      "",
    )
    .replace(
      /<!-- hraness:soulscrape-readme-only:start -->[\s\S]*?<!-- hraness:soulscrape-readme-only:end -->/gu,
      "",
    )
    .replace(/<!-- hraness:soulscrape-outline:(?:start|end) -->\n?/gu, "");
  const lines = block.split("\n");
  const body = lines.filter((line, index) => !(index < 8 && (
    line.startsWith("# ")
    || line.startsWith("[![")
    || line.startsWith("[Website](")
  )));
  const markdown = body.join("\n").trim();
  if (markdown === "") throw new Error("README landing selection is empty");
  return markdown;
}

/** The homepage keeps the dossier outline without repeating the README tutorial. */
export function extractDossierOutline(readme: string): string {
  const startMarker = "<!-- hraness:soulscrape-outline:start -->";
  const endMarker = "<!-- hraness:soulscrape-outline:end -->";
  const start = readme.indexOf(startMarker);
  const end = readme.indexOf(endMarker);
  if (start === -1 || end <= start
    || readme.split(startMarker).length !== 2 || readme.split(endMarker).length !== 2) {
    throw new Error("README dossier outline requires unique, ordered markers");
  }
  const outline = readme.slice(start + startMarker.length, end).trim();
  if (outline === "") throw new Error("README dossier outline is empty");
  return outline;
}

export function renderReadmeHtml(source: string): string {
  const options = {
    noHtmlBlocks: true,
    noHtmlSpans: true,
    tagFilter: true,
  } as const;
  // Recover literal code with the Markdown parser, then render through the same
  // component as docs and public Markdown. An empty hint preserves inference;
  // an explicit text hint keeps prompts and terminal output unframed.
  const codeBlocks: { code: string; language: string }[] = [];
  Bun.markdown.render(source, {
    code(code, metadata) {
      codeBlocks.push({ code, language: metadata?.language ?? "" });
      return "";
    },
  }, options);
  let blockIndex = 0;
  const html = new HTMLRewriter().on("pre", {
    element(element) {
      const block = codeBlocks[blockIndex++];
      if (block === undefined) throw new Error("README code block parsers disagree");
      element.replace(renderToStaticMarkup(createElement(CodeBlock, block)), { html: true });
    },
  }).transform(Bun.markdown.html(source, options));
  if (blockIndex !== codeBlocks.length) throw new Error("README code block parsers disagree");
  for (const match of html.matchAll(/\s(?:href|src)="([^"]*)"/gu)) {
    const target = match[1];
    if (target !== undefined) assertSafeTarget(target);
  }
  const rendered = rewriteRelativeTargets(addHeadingIds(html));
  assertFragmentsResolve(rendered);
  return rendered;
}
