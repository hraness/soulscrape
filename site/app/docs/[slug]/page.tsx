import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SyntaxCode } from "@hraness/design-kit/react/server";

import { StoryPage } from "../../../components/story-page";
import { docPage, docsPages, quadrantLabels, type DocBlock } from "../../../lib/docs";
import { siteUrl } from "../../../lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return docsPages.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = docPage(slug);
  if (page === undefined) return { title: "not found — soulscrape" };
  const title = `${page.title} — soulscrape docs`;
  return {
    title,
    description: page.description,
    alternates: { canonical: siteUrl(`/docs/${page.slug}`) },
    openGraph: { title, description: page.description, url: siteUrl(`/docs/${page.slug}`) },
  };
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

  return (
    <StoryPage
      breadcrumb={[
        { href: "/docs", label: "docs" },
        { href: `/docs/${page.slug}`, label: page.slug, current: true },
      ]}
      kicker={quadrantLabels[page.quadrant]}
      lede={page.description}
      path={`/docs/${page.slug}`}
      title={`${page.title}.`}
    >
      <article className="doc-body">
        {page.sections.map(section => (
          <section key={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            <DocBlocks blocks={section.blocks} />
          </section>
        ))}
      </article>
      {page.related === undefined ? null : (
        <aside className="doc-related">
          <h2>related</h2>
          <ul>
            {page.related.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
          </ul>
        </aside>
      )}
    </StoryPage>
  );
}
