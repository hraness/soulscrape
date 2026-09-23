import { examplePortraits, type ExamplePortrait } from "./example-portraits";

const portraits: Readonly<Record<string, ExamplePortrait>> = examplePortraits;

/** The curated people collection always uses its reviewed graphite portraits. */
export function exampleImage(username: string, handle: string): ExamplePortrait | undefined {
  if (username !== "ben") return undefined;
  return Object.hasOwn(portraits, handle) ? portraits[handle] : undefined;
}
