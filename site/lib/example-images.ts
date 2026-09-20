import { examplePortraits, type ExamplePortrait } from "./example-portraits";
import photos from "./example-photos.json";

type Photo = { handle: string; src: string };
const photoRegistry = new Map<string, ExamplePortrait>((photos as Photo[]).map(photo => [
  photo.handle, { status: "available", src: photo.src as `/photos/${string}` },
]));
const portraits: Readonly<Record<string, ExamplePortrait>> = examplePortraits;

/** Images belong to this curated collection, not arbitrary profiles with matching handles. */
export function exampleImage(username: string, handle: string): ExamplePortrait | undefined {
  if (username !== "ben") return undefined;
  return portraits[handle] ?? photoRegistry.get(handle);
}
