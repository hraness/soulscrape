import { ImageResponse } from "next/og";

import { convexApi, convexClient } from "../../lib/convex";
import { parseUsernameSegment } from "../../lib/routes";

export const dynamic = "force-dynamic";
export const alt = "a soulscrape publisher's public person indexes";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

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
          soulscrape · public evidence index
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
