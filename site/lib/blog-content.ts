import { readFileSync } from "node:fs";
import { join } from "node:path";

import { releaseStatus, type BlogPost } from "./blog";

/** The post body as Markdown, with release placeholders filled from the release record. */
export function postMarkdown(post: BlogPost): string {
  const raw = readFileSync(join(process.cwd(), "content", "blog", post.bodyFile), "utf8");
  return raw.replaceAll("{{release.status}}", releaseStatus()).trim();
}

/** The Markdown twin: title, dek, byline, provenance note, and body. */
export function postMarkdownTwin(post: BlogPost, provenance: string): string {
  return [
    `# ${post.title}`,
    "",
    post.dek,
    "",
    `By Hraness. Published ${post.published}.`,
    "",
    provenance,
    "",
    postMarkdown(post),
    "",
  ].join("\n");
}
