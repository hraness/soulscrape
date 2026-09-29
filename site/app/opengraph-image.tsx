import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { socialSite } from "./social";

export const alt = socialImageAlt(socialSite);
export { contentType, size };

export default function OpengraphImage() {
  return createSiteSocialImageResponse(socialSite);
}
