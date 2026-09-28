import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { convexApi, convexClient } from "../../lib/convex";
import { parseUsernameSegment } from "../../lib/routes";
import { socialSite } from "../social";

export const dynamic = "force-dynamic";
export const alt = "A Soulscrape publisher's public indexes";
export { contentType, size };

export default async function PublisherOgImage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;
  const username = parseUsernameSegment(rawUsername);
  if (username === null) return createSiteSocialImageResponse(socialSite);
  const convex = convexClient();
  const rows = convex === null
    ? []
    : await convex.query(convexApi.peopleListByUsername, { username });
  const count = Array.isArray(rows) ? rows.length : 0;
  if (count === 0) return createSiteSocialImageResponse(socialSite);
  return createSiteSocialImageResponse(socialSite, {
    description: count === 1
      ? "1 public index, dated and revisable"
      : `${String(count)} public indexes, each dated and revisable`,
    eyebrow: "Publisher",
    headline: `@${username}`,
  });
}
