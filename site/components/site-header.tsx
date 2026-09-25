import { MarketingSiteHeader } from "@hraness/design-kit/react/server";
import { ThemeMenuButton } from "@hraness/design-kit/react";

import { BLOG_PATH, indexablePosts } from "../lib/blog";

export function SkipLink({ targetId = "main" }: Readonly<{ targetId?: string }>) {
  return <a className="skip-link" href={`#${targetId}`}>Skip to content</a>;
}

/** The blog joins the header once it lists at least one post. */
export function siteLinks(): readonly { href: string; label: string }[] {
  return [
    { href: "/examples", label: "Examples" },
    { href: "/use-cases", label: "Use cases" },
    { href: "/docs", label: "Docs" },
    { href: "/compare", label: "Compare" },
    ...(indexablePosts().length > 0 ? [{ href: BLOG_PATH, label: "Blog" }] : []),
    { href: "https://github.com/hraness/soulscrape", label: "GitHub" },
  ];
}

/**
 * The shared marketing header: sticky Lantern chrome with the Paper surface,
 * the product wordmark, primary links, one action, and the appearance menu.
 */
export function SiteHeader({
  action = { href: "/#install", label: "install the skill" },
  current,
}: Readonly<{
  action?: { href: string; label: string };
  current?: `/${string}`;
}>) {
  const primary = siteLinks().map(link => ({
    ...link,
    current: link.href.startsWith("/") && current !== undefined && current.startsWith(link.href),
  }));
  return (
    <MarketingSiteHeader
      action={action}
      brand="soulscrape"
      brandHref="/"
      brandLabel="soulscrape home"
      brandMark="/marks/soulscrape.svg"
      className="hraness-marketing-header-surface hraness-material-chrome"
      links={primary}
      trailing={<ThemeMenuButton />}
    />
  );
}
