import { blogPost, blogPostPath, blogPosts, isIndexablePost, postProvenanceSentence } from "../../../../lib/blog";
import { postMarkdownTwin } from "../../../../lib/blog-content";
import { siteUrl } from "../../../../lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

/** The Markdown twin of a post, served at `/blog/<slug>.md` through a rewrite. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }): Promise<Response> {
  const { slug } = await params;
  const post = blogPost(slug);
  if (post === undefined) return new Response("Not found\n", { status: 404 });
  // The HTML post is canonical for both `/blog/<slug>.md` and this internal path.
  const headers: Record<string, string> = {
    "content-type": "text/markdown; charset=utf-8",
    link: `<${siteUrl(blogPostPath(post))}>; rel="canonical"`,
  };
  if (!isIndexablePost(post)) headers["x-robots-tag"] = "noindex";
  return new Response(postMarkdownTwin(post, postProvenanceSentence(post)), { headers });
}
