import type { Metadata, Viewport } from "next";
import { getDesignPaletteTheme } from "@hraness/design-kit";
import { HranessSiteFooter } from "@hraness/site-footer/react";

import { HOME_DESCRIPTION as description, HOME_TITLE as title } from "../lib/metadata";
import { Providers } from "./providers";

import "./globals.css";

const initialPalette = getDesignPaletteTheme("gruvbox", "light");

export const metadata: Metadata = {
  metadataBase: new URL("https://soulscrape.com"),
  title,
  description,
  alternates: { canonical: "/" },
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
    { color: "#fbf1c7", media: "(prefers-color-scheme: light)" },
    { color: "#282828", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={initialPalette.className}
      data-hraness-material="lantern" data-hraness-pattern="weave"
      data-hraness-theme="paper"
      data-palette="gruvbox"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-bootstrap.js" />
      </head>
      <body>
        <Providers>
          {children}
          <nav aria-label="Legal and support" className="product-legal">
            <a href="https://hraness.com/privacy">Privacy</a>
            <a href="https://hraness.com/terms">Terms</a>
            <a href="mailto:hraness@pm.me">Support and privacy requests</a>
          </nav>
          <HranessSiteFooter
            mailingList={{ kind: "none" }}
            placement="flow"
          />
        </Providers>
      </body>
    </html>
  );
}
