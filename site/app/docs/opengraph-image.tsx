import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { DOCS_DESCRIPTION } from "../../lib/page-copy";
import { socialSite } from "../social";

const page = { description: DOCS_DESCRIPTION, headline: "Docs" };

export const alt = socialImageAlt(socialSite, page);
export { contentType, size };

export default function DocsImage() {
  return createSiteSocialImageResponse(socialSite, page);
}
