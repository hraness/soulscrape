import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Soulscrape: understand a person without pretending to contain them";
const description =
  "Soulscrape is an Agent Skill that turns the evidence you are authorized to use into a dated, evidence-calibrated working model of a person, with an asking protocol, instruction-bound web research, and explicit privacy boundaries.";

export const metadata: Metadata = {
  metadataBase: new URL("https://soulscrape.com"),
  title,
  description,
  alternates: { canonical: "/" },
  icons: {
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    icon: [{ type: "image/png", url: "/icon.png", sizes: "512x512" }],
  },
  openGraph: {
    title,
    description,
    siteName: "Soulscrape",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#f8f7f4", media: "(prefers-color-scheme: light)" },
    { color: "#12100f", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-hraness-theme="paper" data-hraness-material="lantern" lang="en">
      <body>{children}</body>
    </html>
  );
}
