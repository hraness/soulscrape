import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { createSoulscrapePageImage } from "../social-card";

export const alt = "Soulscrape examples: dossiers on builders, musicians, scientists, and writers";
export { contentType, size };

export default function ExamplesImage() {
  return createSoulscrapePageImage({
    title: "Examples",
    description: "Dated dossiers on builders, musicians, scientists, and writers, each built from public sources and published by @ben.",
  });
}
