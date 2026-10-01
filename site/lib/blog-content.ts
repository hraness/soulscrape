import { readFileSync } from "node:fs";
import { join } from "node:path";

import { launchBeatAnchor } from "@hraness/design-kit/react/server";

import { launchBeats } from "../app/launch/beats";
import { postHeadings, releaseStatus, type BlogPost } from "./blog";

/** The Markdown file's body, with release placeholders filled from the release record. */
export function postBodyMarkdown(post: BlogPost): string {
  const raw = readFileSync(join(process.cwd(), "content", "blog", post.bodyFile), "utf8");
  return raw.replaceAll("{{release.status}}", releaseStatus()).trim();
}

/** The launch beats as Markdown: each beat's headline, post, and visual description. */
export function launchBeatsMarkdown(): string {
  return launchBeats.map((beat) => `## ${beat.headline}\n\n${beat.post}\n\n*${beat.alt}*`).join("\n\n");
}

/** The whole post as Markdown: the launch beats first when the post has them, then the file body. */
export function postMarkdown(post: BlogPost): string {
  const body = postBodyMarkdown(post);
  return post.launchBeats === true ? `${launchBeatsMarkdown()}\n\n${body}` : body;
}

/** The table of contents: each beat's anchor, then the file body's headings. */
export function postToc(post: BlogPost): readonly { id: string; label: string }[] {
  const beats = post.launchBeats === true ? launchBeats.map((beat) => ({ id: launchBeatAnchor(beat), label: beat.headline })) : [];
  return [...beats, ...postHeadings(postBodyMarkdown(post))];
}

/** The Markdown twin: title, dek, byline, provenance note, and body. */
export function postMarkdownTwin(post: BlogPost, provenance: string): string {
  return [
    `# ${post.title}`,
    "",
    post.dek,
    "",
    "By Hraness.",
    "",
    provenance,
    "",
    postMarkdown(post),
    "",
  ].join("\n");
}
