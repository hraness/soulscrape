import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { blogPost, blogPosts } from "../../../lib/blog";
import { describe } from "../../../lib/metadata";
import { createSoulscrapePageImage } from "../../social-card";

export const alt = "Soulscrape blog post";
export { contentType, size };

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPost(slug);
  return createSoulscrapePageImage(post === undefined
    ? { title: "Blog", description: "The Soulscrape blog." }
    : { title: post.title, description: describe(post.dek, 160) });
}
