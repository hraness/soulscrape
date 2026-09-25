import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { createSoulscrapePageImage } from "../social-card";
import { DOCS_DESCRIPTION } from "../../lib/page-copy";

export const alt = "Soulscrape documentation";
export { contentType, size };

export default function DocsImage() {
  return createSoulscrapePageImage({ title: "Docs", description: DOCS_DESCRIPTION });
}
