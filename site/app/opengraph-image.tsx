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
          soulscrape · people for agents
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            distill the essence of any human.
          </div>
          <div style={{ color: "#4a463f", fontSize: 32, lineHeight: 1.35 }}>
            dated, source-bounded working models of people — built from authorized
            evidence and published as public indexes anyone can inspect.
          </div>
        </div>
        <div style={{ color: "#8a857e", fontSize: 26 }}>soulscrape.com</div>
      </div>
    ),
    size,
  );
}
