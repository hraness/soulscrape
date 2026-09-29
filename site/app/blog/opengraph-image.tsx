import {
  createSiteSocialImageResponse,
  socialImageAlt,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { BLOG_DESCRIPTION } from "../../lib/blog";
import { socialSite } from "../social";

const page = { description: BLOG_DESCRIPTION, headline: "Blog" };

export const alt = socialImageAlt(socialSite, page);
export { contentType, size };

export default function BlogImage() {
  return createSiteSocialImageResponse(socialSite, page);
}
