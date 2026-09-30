import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { socialHomeAlt, socialHomePage, socialSite } from "./social";

export const alt = socialHomeAlt;
export { contentType, size };

export default function OpengraphImage() {
  return createSiteSocialImageResponse(socialSite, socialHomePage);
}
