import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  // CI runs `bun run typecheck` (next typegen, then tsc on this tsconfig) before
  // `next build` in the same step and sets HRANESS_TYPECHECKED=1 there, so the
  // build skips repeating that pass. Vercel and local builds keep Next's check.
  typescript: { ignoreBuildErrors: process.env.HRANESS_TYPECHECKED === "1" },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/-/:kind/:key.md",
          destination: "/api/v1/knowledge/:kind/:key?format=markdown",
        },
        {
          source: "/-/:kind/:key",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/api/v1/knowledge/:kind/:key?format=markdown",
        },
        {
          // `/blog/<slug>.md` serves the post as Markdown. It runs before the
          // `/<username>/<handle>.md` rule below, which would claim the path.
          source: "/blog/:slug.md",
          destination: "/blog/:slug/markdown",
        },
        {
          source: "/blog/:slug",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/blog/:slug/markdown",
        },
      ],
      afterFiles: [
        {
          source: "/:username/:handle/sections/:sectionId.md",
          destination: "/api/v1/sections/:username/:handle/:sectionId?format=markdown",
        },
        {
          source: "/:username/:handle/sections/:sectionId",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/api/v1/sections/:username/:handle/:sectionId?format=markdown",
        },
        {
          // `/<username>/<handle>.md` serves the index body as Markdown.
          source: "/:username/:handle.md",
          destination: "/api/v1/profiles/:username/:handle?format=markdown",
        },
        {
          // Agents that ask for Markdown get the packet body without the page shell.
          source: "/:username/:handle",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/api/v1/profiles/:username/:handle?format=markdown",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
