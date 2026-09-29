import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { EXAMPLES_DESCRIPTION } from "../../lib/page-copy";
import { socialSite } from "../social";

const page = { description: EXAMPLES_DESCRIPTION, headline: "Examples" };

export const alt = socialImageAlt(socialSite, page);
export { contentType, size };

export default function ExamplesImage() {
  return createSiteSocialImageResponse(socialSite, page);
}
