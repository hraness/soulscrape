import { fileURLToPath } from "node:url";
import stylex from "./stylex.config.mjs";

const config = {
  plugins: {
    [fileURLToPath(new URL("./scripts/postcss-package-union.cjs", import.meta.url))]: {
      ...stylex,
      root: fileURLToPath(new URL(".", import.meta.url)),
    },
    "@tailwindcss/postcss": {},
  },
};

export default config;
