import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { convexApi, convexClient } from "../../lib/convex";
import { createSoulscrapeSocialImage } from "../social-card";
import { parseUsernameSegment } from "../../lib/routes";

export const dynamic = "force-dynamic";
export const alt = "a soulscrape publisher's public person indexes";
export { contentType, size };

export default async function PublisherOgImage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;
  const username = parseUsernameSegment(rawUsername);
  let title = "soulscrape";
  let subtitle = "people for agents";
  let footer = "soulscrape.com";
  if (username !== null) {
    const convex = convexClient();
    const rows = convex === null
      ? []
      : await convex.query(convexApi.peopleListByUsername, { username });
    const count = Array.isArray(rows) ? rows.length : 0;
    if (count > 0) {
      title = `@${username}`;
      subtitle = count === 1
        ? "1 public person index — dated, source-bounded, and revisable"
        : `${count} public person indexes — dated, source-bounded, and revisable`;
      footer = `soulscrape.com/${username}`;
    }
  }
  return createSoulscrapeSocialImage({
    description: subtitle,
    domain: footer,
    title,
  });
}
