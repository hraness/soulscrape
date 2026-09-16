import { ImageResponse } from "next/og";

import { isPersonHandle } from "../../../../skills/soulscrape/scripts/person-index";

import { convexApi, convexClient } from "../../../lib/convex";
import { publicRowToProfile } from "../../../lib/profile-view";
import { parseUsernameSegment } from "../../../lib/routes";

export const dynamic = "force-dynamic";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default async function PersonOgImage({
  params,
}: {
  params: Promise<{ username: string; handle: string }>;
}) {
  const { username: rawUsername, handle: rawHandle } = await params;
  const username = parseUsernameSegment(rawUsername);
  const handle = isPersonHandle(rawHandle) ? rawHandle : null;
  let title = "Soulscrape";
  let subtitle = "Evidence-bounded person indexes";
  let footer = "soulscrape.com";
  if (username !== null && handle !== null) {
    const convex = convexClient();
    const row = convex === null
      ? null
      : publicRowToProfile(await convex.query(convexApi.peopleGetPublic, { username, handle }));
    if (row !== null) {
      title = row.packet.subject.displayName;
      subtitle = row.packet.subject.summary.slice(0, 140);
      footer = `soulscrape.com/${username}/${handle} · assembled ${row.packet.generatedAt.slice(0, 10)}`;
    }
  }
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f8f7f4",
          color: "#1c1a18",
          display: "flex",
          flexDirection: "column",
          fontFamily: "serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div style={{ color: "#8a857e", fontSize: 28, letterSpacing: 2, textTransform: "uppercase" }}>
          Soulscrape · public evidence index
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ color: "#4a463f", fontSize: 32, lineHeight: 1.35 }}>{subtitle}</div>
        </div>
        <div style={{ color: "#8a857e", fontSize: 26 }}>{footer}</div>
      </div>
    ),
    size,
  );
}
