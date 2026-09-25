import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { isPersonHandle } from "../../../../skills/soulscrape/scripts/person-index";

import { convexApi, convexClient } from "../../../lib/convex";
import { describe } from "../../../lib/metadata";
import { publicRowToProfile } from "../../../lib/profile-view";
import { parseUsernameSegment } from "../../../lib/routes";
import { createSoulscrapeSocialImage } from "../../social-card";

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
  let title = "Soulscrape";
  let subtitle = "See how someone thinks, and where every claim comes from.";
  let footer = "soulscrape.com";
  if (username !== null && handle !== null) {
    const convex = convexClient();
    const row = convex === null
      ? null
      : publicRowToProfile(await convex.query(convexApi.peopleGetPublic, { username, handle }));
    if (row !== null) {
      title = row.packet.subject.displayName;
      subtitle = describe(row.packet.subject.summary, 140);
      footer = `soulscrape.com/${username}/${handle} · assembled ${row.packet.generatedAt.slice(0, 10)}`;
    }
  }
  return createSoulscrapeSocialImage({
    description: subtitle,
    domain: footer,
    title,
  });
}
