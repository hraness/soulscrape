import { MarketingSiteHeader } from "@hraness/design-kit/react/server";
import { ThemeMenuButton } from "@hraness/design-kit/react";

export function SkipLink({ targetId = "main" }: Readonly<{ targetId?: string }>) {
  return <a className="skip-link" href={`#${targetId}`}>Skip to content</a>;
}

function BrandMark() {
  // eslint-disable-next-line @next/next/no-img-element -- the canonical mark is a fixed-size authored SVG
  return <img alt="" aria-hidden="true" className="brand-mark" height={20} src="/marks/soulscrape.svg" width={20} />;
}

const links = [
  { href: "/examples", label: "Examples" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/docs", label: "Docs" },
  { href: "/compare", label: "Compare" },
  { href: "https://github.com/hraness/soulscrape", label: "GitHub" },
] as const;

/**
 * The shared marketing header: sticky Lantern chrome with the Paper surface,
 * the product wordmark, primary links, one action, and the appearance menu.
 */
export function SiteHeader({
  action = { href: "/#install", label: "install the skill" },
}: Readonly<{
  action?: { href: string; label: string };
}>) {
  return (
    <MarketingSiteHeader
      action={action}
      brand={<><BrandMark />soulscrape</>}
      brandHref="/"
      brandLabel="soulscrape home"
      className="hraness-marketing-header-surface hraness-material-chrome"
      links={links}
      trailing={<ThemeMenuButton />}
    />
  );
}
