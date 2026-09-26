import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { createSoulscrapePageImage } from "../social-card";
import { COMPARE_DESCRIPTION } from "../../lib/page-copy";

export const alt = "How Soulscrape compares";
export { contentType, size };

export default function CompareImage() {
  return createSoulscrapePageImage({ title: "How Soulscrape compares", description: COMPARE_DESCRIPTION });
}
