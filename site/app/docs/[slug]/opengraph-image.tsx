import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { docPage, docsPages } from "../../../lib/docs";
import { describe, sentenceCase } from "../../../lib/metadata";
import { createSoulscrapePageImage } from "../../social-card";

export const alt = "Soulscrape documentation page";
export { contentType, size };

export function generateStaticParams() {
  return docsPages.map(page => ({ slug: page.slug }));
}

export default async function DocImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = docPage(slug);
  return createSoulscrapePageImage(page === undefined
    ? { title: "Docs", description: "Soulscrape documentation." }
    : { title: sentenceCase(page.title), description: describe(page.description, 160) });
}
