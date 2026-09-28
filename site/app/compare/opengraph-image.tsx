import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { COMPARE_DESCRIPTION } from "../../lib/page-copy";
import { socialSite } from "../social";

const page = { description: COMPARE_DESCRIPTION, headline: "How Soulscrape compares" };

export const alt = socialImageAlt(socialSite, page);
export { contentType, size };

export default function CompareImage() {
  return createSiteSocialImageResponse(socialSite, page);
}
