import { createSocialImageResponse } from "@hraness/web-discovery/social-image";

function SoulscrapeMark() {
  return (
    <svg aria-label="Soulscrape mark" fill="none" height="42" role="img" viewBox="0 0 42 42" width="42">
      <circle cx="21" cy="15" r="8" stroke="currentColor" strokeWidth="3" />
      <path d="M7 37c2-9 7-13 14-13s12 4 14 13" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

export function createSoulscrapeSocialImage(details: Readonly<{
  description: string;
  domain?: string;
  title: string;
}>) {
  return createSocialImageResponse({
    description: details.description,
    domain: details.domain ?? "soulscrape.com",
    eyebrow: "Soulscrape",
    mark: <SoulscrapeMark />,
    theme: {
      accent: "#065968",
      background: "#FBF1C7",
      foreground: "#393533",
      muted: "#584F48",
    },
    title: details.title,
  });
}

/** The share card for an interior page: the page's own title and description. */
export function createSoulscrapePageImage(page: Readonly<{ title: string; description: string }>) {
  return createSoulscrapeSocialImage({ description: page.description, title: page.title });
}
