import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { comparison, comparisons } from "../../../lib/compare";
import { socialCompareDescriptions, socialPages, socialSite } from "../../social";

export const alt = "A Soulscrape comparison";
export { contentType, size };

export function generateStaticParams() {
  return comparisons.map(entry => ({ tool: entry.slug }));
}

export default async function CompareToolImage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const entry = comparison(tool);
  if (entry === undefined) return createSiteSocialImageResponse(socialSite, socialPages.notFound);
  return createSiteSocialImageResponse(socialSite, {
    description: socialCompareDescriptions[entry.slug] ?? entry.description,
    eyebrow: "Compare",
    headline: entry.title,
  });
}
