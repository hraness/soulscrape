import { ATOM_FEED_CONTENT_TYPE } from "@hraness/web-discovery";

import { blogAtomFeed } from "../../../lib/blog-feed";

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(blogAtomFeed(), { headers: { "content-type": ATOM_FEED_CONTENT_TYPE } });
}
