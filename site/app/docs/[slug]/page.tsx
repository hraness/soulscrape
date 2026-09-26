import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SyntaxCode } from "@hraness/design-kit/react/server";

import { DocsChrome } from "../../../components/docs-chrome";
import { docPage, docsPages, quadrantLabels, type DocBlock } from "../../../lib/docs";
import { NOT_FOUND_TITLE, pageMetadata, pageTitle, sentenceCase } from "../../../lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return docsPages.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = docPage(slug);
  if (page === undefined) return { title: NOT_FOUND_TITLE };
  return pageMetadata({
    title: pageTitle(sentenceCase(page.title), "Soulscrape docs"),
    description: page.description,
    path: `/docs/${page.slug}`,
    type: "article",
  });
}

function DocBlocks({ blocks }: Readonly<{ blocks: readonly DocBlock[] }>) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "list":
            return (
              <ul key={index}>
                {block.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            );
          case "commands":
            return <pre className="transcript" key={index} tabIndex={0}><SyntaxCode code={block.text} language="shell" styles="classes" /></pre>;
          case "links":
            return (
              <p key={index}>
                {block.links.map((link, linkIndex) => (
                  <span key={link.href}>
                    {linkIndex > 0 && " · "}
                    <a href={link.href}>{link.label}</a>
                  </span>
                ))}
              </p>
            );
        }
      })}
    </>
  );
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = docPage(slug);
  if (page === undefined) notFound();

  const index = docsPages.findIndex(entry => entry.slug === page.slug);
  const previous = index > 0 ? docsPages[index - 1] : undefined;
  const next = index >= 0 && index < docsPages.length - 1 ? docsPages[index + 1] : undefined;

  return (
    <DocsChrome
      current={`/docs/${page.slug}`}
      eyebrow={`${quadrantLabels[page.quadrant]} · Soulscrape docs`}
      lede={page.description}
      pagination={
        <nav aria-label="Documentation pagination" className="doc-pagination">
          {previous === undefined ? <span /> : (
            <a href={`/docs/${previous.slug}`}>
              <small>previous · {quadrantLabels[previous.quadrant]}</small>
              {previous.title}
            </a>
          )}
          {next === undefined ? <span /> : (
            <a href={`/docs/${next.slug}`}>
              <small>next · {quadrantLabels[next.quadrant]}</small>
              {next.title}
            </a>
          )}
        </nav>
      }
      path={`/docs/${page.slug}`}
      title={`${page.title}.`}
      toc={page.sections.map(section => ({ href: `#${section.id}`, label: section.title }))}
    >
      {page.sections.map(section => (
        <section key={section.id}>
          <h2 id={section.id}>{section.title}</h2>
          <DocBlocks blocks={section.blocks} />
        </section>
      ))}
      {page.related === undefined ? null : (
        <section>
          <h2 id="related">related</h2>
          <ul>
            {page.related.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
          </ul>
        </section>
      )}
    </DocsChrome>
  );
}
