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
    expect(html).toContain("const x = 1 &lt; 2;");
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
