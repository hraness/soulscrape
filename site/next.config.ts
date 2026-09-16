import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;
