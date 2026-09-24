import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { renderMarkdown } from "../lib/markdown";

function render(source: string): string {
  return renderToStaticMarkup(<>{renderMarkdown(source)}</>);
}

describe("bounded markdown renderer", () => {
  test("renders headings, paragraphs, emphasis, code, and https links", () => {
    const html = render(
      "## Title\n\nA paragraph with **bold**, *em*, `code`, and [a link](https://example.com/x).",
    );
    expect(html).toContain("<h2>");
    expect(html).toContain("Title");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>em</em>");
    expect(html).toContain("<code>code</code>");
    expect(html).toContain('href="https://example.com/x"');
    expect(html).toContain(">a link</a>");
  });

  test("escapes raw HTML instead of rendering it", () => {
    const html = render('<script>alert(1)</script> and <img src=x onerror=y>');
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("alert(1)");
  });

  test("never renders non-https links as anchors", () => {
    const html = render("[x](javascript:alert(1)) and [y](http://example.com)");
    expect(html).not.toContain("<a");
    expect(html).toContain("[x](javascript:alert(1))");
    expect(html).toContain("[y](http://example.com)");
  });

  test("renders lists and fenced code blocks", () => {
    const html = render("- one\n- two\n\n```\nconst x = 1 < 2;\n```");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>one</li>");
    expect(html).toContain("<pre>");
    expect(html).toContain('data-language="typescript"');
    let codeText = "";
    new HTMLRewriter().on("pre > code", { text(chunk) { codeText += chunk.text; } }).transform(html);
    expect(codeText).toBe("const x = 1 &lt; 2;");
  });

  test("uses shared highlighting, preserves explicit fence hints, and keeps hostile code inert", () => {
    const shell = render("```sh\nbun test --watch\n```");
    expect(shell).toContain('data-language="shell"');
    expect(shell).toContain("syntax-token--command");
    const plain = render("```text\nbun test --watch\n```");
    expect(plain).toContain('data-language="text"');
    expect(plain).not.toContain("syntax-token--command");
    expect(render("```unknown-language\nbun test\n```")).toContain('data-language="text"');
    const hostile = render('```html\n<script>alert(1)</script>\n```');
    expect(hostile).not.toContain("<script");
    expect(hostile).not.toMatch(/\sstyle=/u);
    expect(hostile).toContain("&lt;");
  });

  test("renders nested list items", () => {
    const html = render("- parent\n  - child\n  - second child\n- sibling");
    expect(html).toContain("<li>parent<ul>");
    expect(html).toContain("<li>child</li>");
    expect(html).toContain("<li>sibling</li>");
  });

  test("renders blockquotes and rules", () => {
    const html = render("> quoted words\n\n---");
    expect(html).toContain("<blockquote>");
    expect(html).toContain("quoted words");
    expect(html).toContain("<hr");
  });
});

test("member Markdown keeps relative links as text; site Markdown links them and ids headings", () => {
  const source = "## Where it is headed\n\nRead the [docs](/docs) or [GitHub](https://github.com/hraness/soulscrape). Not [this](//evil.example).";
  const member = renderToStaticMarkup(<>{renderMarkdown(source)}</>);
  expect(member).not.toContain('href="/docs"');
  expect(member).not.toContain('id="where-it-is-headed"');
  expect(member).toContain('rel="noopener ugc"');
  const site = renderToStaticMarkup(<>{renderMarkdown(source, 0, { trust: "site" })}</>);
  expect(site).toContain('<h2 id="where-it-is-headed">');
  expect(site).toContain('<a href="/docs">docs</a>');
  expect(site).toContain('<a href="https://github.com/hraness/soulscrape">GitHub</a>');
  expect(site).not.toContain('href="//evil.example"');
});
