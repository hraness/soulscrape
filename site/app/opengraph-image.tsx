import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { socialHomePage, socialSite } from "./social";

export const alt = socialImageAlt(socialSite, socialHomePage);
export { contentType, size };

export default function OpengraphImage() {
  return createSiteSocialImageResponse(socialSite, socialHomePage);
}
