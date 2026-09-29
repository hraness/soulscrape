import {
  createSiteSocialImageResponse,
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { isPersonHandle } from "../../../../skills/soulscrape/scripts/person-index";

import { convexApi, convexClient } from "../../../lib/convex";
import { publicRowToProfile } from "../../../lib/profile-view";
import { parseUsernameSegment } from "../../../lib/routes";
import { personSocialPage, socialPages, socialSite } from "../../social";

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
  if (username === null || handle === null) return createSiteSocialImageResponse(socialSite, socialPages.notFound);
  const convex = convexClient();
  const row = convex === null
    ? null
    : publicRowToProfile(await convex.query(convexApi.peopleGetPublic, { username, handle }));
  if (row === null) return createSiteSocialImageResponse(socialSite, socialPages.notFound);
  return createSiteSocialImageResponse(socialSite, personSocialPage(row));
}
