import { ImageResponse } from "next/og";

export const alt = "soulscrape — people for agents";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          soulscrape
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>people for agents</div>
          <div style={{ color: "#4a463f", fontSize: 30, lineHeight: 1.35 }}>An agent skill that turns authorized evidence into dated, revisable working models of people.</div>
        </div>
        <div style={{ color: "#8a857e", fontSize: 26 }}>soulscrape.com</div>
      </div>
    ),
    size,
  );
}
