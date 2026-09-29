import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { USE_CASES_DESCRIPTION } from "../../lib/page-copy";
import { socialSite } from "../social";

const page = { description: USE_CASES_DESCRIPTION, headline: "Use cases" };

export const alt = socialImageAlt(socialSite, page);
export { contentType, size };

export default function UseCasesImage() {
  return createSiteSocialImageResponse(socialSite, page);
}
