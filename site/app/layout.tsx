import type { Metadata, Viewport } from "next";
import { getDesignPaletteTheme } from "@hraness/design-kit";
import { HranessSiteFooter } from "@hraness/site-footer/react";

import { Providers } from "./providers";

import "./globals.css";

const title = "soulscrape — people for agents";
const description =
  "research anyone, publish the dossier. an agent skill that turns authorized evidence into dated, cited working models of people — and a public index anyone can read or remix.";
const initialPalette = getDesignPaletteTheme("paper", "light");

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
    { color: "#f8f7f4", media: "(prefers-color-scheme: light)" },
    { color: "#12100f", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={initialPalette.className}
      data-hraness-material="lantern"
      data-hraness-theme="paper"
      data-palette="paper"
      lang="en"
      suppressHydrationWarning
    >
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
