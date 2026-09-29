import { existsSync } from "node:fs";
import { join } from "node:path";

import type { ArticleVideoRecord } from "@hraness/design-kit";
import { ArticleVideo } from "@hraness/design-kit/react/server";

/**
 * The launch film, built from video/ with the same mockup components and
 * delivered to site/public/media. The post embeds it only when every file
 * is present, so a missing render never ships a broken player.
 */
export const launchFilm: ArticleVideoRecord = {
  name: "Introducing Soulscrape",
  sources: [
    { src: "/media/soulscrape-launch.webm", type: "video/webm" },
    { src: "/media/soulscrape-launch.mp4", type: "video/mp4" },
  ],
  poster: "/media/soulscrape-launch-poster.jpg",
  captions: "/media/soulscrape-launch.vtt",
  width: 1920,
  height: 1080,
  description:
    "A short film with captions and no narration. An agent records who a dossier is about, what it is for, and which sources it may use, then asks one question. It reads the allowed public sources, checks that every claim has a source, and waits for review. The published Eugene Tssui dossier follows, then one claim opened to its sources, the four claim labels, the open questions, and the same dossier as JSON and Markdown, before the closing card with the install command.",
  duration: "PT47S",
  uploadDate: "2026-09-29",
};

const PUBLIC_DIR = join(process.cwd(), "public");

/** True when every file the film record names is in site/public. */
export function launchFilmShipped(): boolean {
  const paths = [...launchFilm.sources.map((source) => source.src), launchFilm.poster, launchFilm.captions];
  return paths.every((path) => existsSync(join(PUBLIC_DIR, path)));
}

export function LaunchFilm() {
  if (!launchFilmShipped()) return null;
  return <ArticleVideo caption={launchFilm.description} video={launchFilm} width="wide" />;
}
