import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { convexApi, convexClient } from "../../lib/convex";
import { parseUsernameSegment } from "../../lib/routes";
import { publisherSocialPage, socialPages, socialSite } from "../social";

export const dynamic = "force-dynamic";
export const alt = "A Soulscrape publisher's public dossiers";
export { contentType, size };

export default async function PublisherOgImage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;
  const username = parseUsernameSegment(rawUsername);
  if (username === null) return createSiteSocialImageResponse(socialSite, socialPages.notFound);
  const convex = convexClient();
  const rows = convex === null
    ? []
    : await convex.query(convexApi.peopleListByUsername, { username });
  if (!Array.isArray(rows) || rows.length === 0) {
    return createSiteSocialImageResponse(socialSite, socialPages.notFound);
  }
  return createSiteSocialImageResponse(socialSite, publisherSocialPage(username));
}
