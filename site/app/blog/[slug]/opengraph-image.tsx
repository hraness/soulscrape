import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { blogPost, blogPosts } from "../../../lib/blog";
import { describe } from "../../../lib/metadata";
import { socialSite } from "../../social";

export const alt = "A Soulscrape blog post";
export { contentType, size };

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPost(slug);
  if (post === undefined) return createSiteSocialImageResponse(socialSite);
  return createSiteSocialImageResponse(socialSite, {
    description: describe(post.dek, 160),
    eyebrow: "Blog",
    headline: post.title,
  });
}
