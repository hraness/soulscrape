import { defineSocialImageSite } from "@hraness/web-discovery/social-image";

import { SOCIAL_ICON_SVG } from "./social-icon";

/**
 * Soulscrape's one share-card declaration. Every `opengraph-image` route
 * renders from it through the shared @hraness/web-discovery template and
 * passes only its own page copy.
 */
export const socialSite = defineSocialImageSite({
  description: "Free agent skill that writes dated dossiers on people, sources cited",
  domain: "soulscrape.com",
  icon: {
    kind: "app",
    src: `data:image/svg+xml,${encodeURIComponent(SOCIAL_ICON_SVG)}`,
  },
  name: "Soulscrape",
  theme: {
    accent: "#1E5AE1",
    background: "#F8F7F4",
    foreground: "#1C1917",
    muted: "#6C665F",
  },
});
