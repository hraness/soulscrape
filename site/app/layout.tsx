import type { Metadata, Viewport } from "next";
import { HranessSiteFooter } from "@hraness/site-footer/react";
import "./globals.css";

const title = "soulscrape — people for agents";
const description =
  "distill the essence of any human, for reference, imitation, or fun. an agent skill that turns authorized evidence into dated, revisable working models of people — and public indexes anyone can inspect.";

export const metadata: Metadata = {
  metadataBase: new URL("https://soulscrape.com"),
  title,
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ type: "image/svg+xml", url: "/favicon.svg" }],
  },
  openGraph: {
    title,
    description,
    siteName: "soulscrape",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
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
    <html data-hraness-theme="paper" lang="en">
      <body>
        {children}
        <HranessSiteFooter
          mailingList={{ kind: "none" }}
          placement="flow"
          support={{
            id: "soulscrape",
            name: "Soulscrape",
            updates: false,
            valueProposition: "Support development of the public person index and its agent tools.",
          }}
        />
      </body>
    </html>
  );
}
