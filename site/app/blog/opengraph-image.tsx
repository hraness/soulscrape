import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { BLOG_DESCRIPTION } from "../../lib/blog";
import { createSoulscrapePageImage } from "../social-card";

export const alt = "Soulscrape blog";
export { contentType, size };

export default function BlogImage() {
  return createSoulscrapePageImage({ title: "Blog", description: BLOG_DESCRIPTION });
}
