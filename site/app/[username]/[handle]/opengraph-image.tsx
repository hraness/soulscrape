import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { isPersonHandle } from "../../../../skills/soulscrape/scripts/person-index";

import { convexApi, convexClient } from "../../../lib/convex";
import { describe } from "../../../lib/metadata";
import { publicRowToProfile } from "../../../lib/profile-view";
import { parseUsernameSegment } from "../../../lib/routes";
import { socialSite } from "../../social";

export const dynamic = "force-dynamic";
export const alt = "A Soulscrape dossier card with the person's name and summary";
export { contentType, size };

export default async function PersonOgImage({
  params,
}: {
  params: Promise<{ username: string; handle: string }>;
}) {
  const { username: rawUsername, handle: rawHandle } = await params;
  const username = parseUsernameSegment(rawUsername);
  const handle = isPersonHandle(rawHandle) ? rawHandle : null;
  if (username === null || handle === null) return createSiteSocialImageResponse(socialSite);
  const convex = convexClient();
  const row = convex === null
    ? null
    : publicRowToProfile(await convex.query(convexApi.peopleGetPublic, { username, handle }));
  if (row === null) return createSiteSocialImageResponse(socialSite);
  return createSiteSocialImageResponse(socialSite, {
    description: describe(row.packet.subject.summary, 140),
    eyebrow: `Dossier · assembled ${row.packet.generatedAt.slice(0, 10)}`,
    headline: row.packet.subject.displayName,
  });
}
