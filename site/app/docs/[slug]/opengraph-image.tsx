import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { docPage, docsPages } from "../../../lib/docs";
import { describe, sentenceCase } from "../../../lib/metadata";
import { socialSite } from "../../social";

export const alt = "A Soulscrape documentation page";
export { contentType, size };

export function generateStaticParams() {
  return docsPages.map(page => ({ slug: page.slug }));
}

export default async function DocImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = docPage(slug);
  if (page === undefined) return createSiteSocialImageResponse(socialSite);
  return createSiteSocialImageResponse(socialSite, {
    description: describe(page.description, 160),
    eyebrow: "Docs",
    headline: sentenceCase(page.title),
  });
}
