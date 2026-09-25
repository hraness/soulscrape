import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { createSoulscrapePageImage } from "../social-card";
import { USE_CASES_DESCRIPTION } from "../../lib/page-copy";

export const alt = "Soulscrape use cases";
export { contentType, size };

export default function UseCasesImage() {
  return createSoulscrapePageImage({ title: "Use cases", description: USE_CASES_DESCRIPTION });
}
