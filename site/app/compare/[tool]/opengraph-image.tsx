import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { comparison, comparisons } from "../../../lib/compare";
import { createSoulscrapePageImage } from "../../social-card";

export const alt = "Soulscrape comparison";
export { contentType, size };

export function generateStaticParams() {
  return comparisons.map(entry => ({ tool: entry.slug }));
}

export default async function CompareToolImage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const entry = comparison(tool);
  return createSoulscrapePageImage(entry === undefined
    ? { title: "How Soulscrape compares", description: "Soulscrape comparisons." }
    : { title: entry.title, description: entry.description });
}
