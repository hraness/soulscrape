import { existsSync } from "node:fs";
import { join } from "node:path";

import type { ArticleVideoRecord } from "@hraness/design-kit";
import { ArticleVideo } from "@hraness/design-kit/react/server";

/**
 * The launch film, built in video/story (story.config.ts) with the story-film
 * engine from the launch post's own screens, and delivered to site/public/media. The post embeds it only when every file
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
    "A 29-second film with captions and no narration. What the internet says about a person is scattered and rarely cited; Soulscrape's agent writes down the scope first, then the example dossier opens a claim to its sources, the dossier stays private until you publish it, and the film ends with asking your agent to install Soulscrape.",
  duration: "PT29.2S",
  uploadDate: "2026-10-04",
};

const PUBLIC_DIR = join(process.cwd(), "public");

/** True when every file the film record names is in site/public. */
export function launchFilmShipped(): boolean {
  const paths = [...launchFilm.sources.map((source) => source.src), launchFilm.poster, launchFilm.captions];
  return paths.every((path) => existsSync(join(PUBLIC_DIR, path)));
}

export function LaunchFilm() {
  if (!launchFilmShipped()) return null;
  return <ArticleVideo video={launchFilm} width="wide" caption={null} />;
}
