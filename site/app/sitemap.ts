import type { MetadataRoute } from "next";

import { convexApi, convexClient } from "../lib/convex";
import { siteUrl } from "../lib/site";

export const dynamic = "force-dynamic";

type SitemapRow = { username: string; handle: string; updatedAtMs: number };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), changeFrequency: "monthly", priority: 1 },
  ];
  const convex = convexClient();
  if (convex === null) return entries;
  const rows = await convex.query(convexApi.peopleListAll, {});
  if (!Array.isArray(rows)) return entries;
  const publishers = new Map<string, number>();
  for (const row of rows as SitemapRow[]) {
    if (typeof row?.username !== "string" || typeof row.handle !== "string") continue;
    if (Number.isFinite(row.updatedAtMs)) {
      publishers.set(row.username, Math.max(publishers.get(row.username) ?? 0, row.updatedAtMs));
    }
    entries.push({
      url: siteUrl(`/${row.username}/${row.handle}`),
      lastModified: new Date(row.updatedAtMs),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  for (const [username, updatedAtMs] of publishers) {
    entries.push({
      url: siteUrl(`/${username}`),
      lastModified: new Date(updatedAtMs),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }
  return entries;
}
