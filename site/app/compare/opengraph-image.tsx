import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { socialPages, socialSite } from "../social";

const page = socialPages.compare;

export const alt = socialImageAlt(socialSite, page);
export { contentType, size };

export default function CompareImage() {
  return createSiteSocialImageResponse(socialSite, page);
}
