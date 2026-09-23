import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { createSoulscrapeSocialImage } from "./social-card";

export const alt = "soulscrape: dated, cited dossiers on people";
export { contentType, size };

export default function OpengraphImage() {
  return createSoulscrapeSocialImage({
    description: "An agent skill that builds a working model of a person from sources you're allowed to use, with each claim cited. Publish it as a public index if you choose.",
    title: "dated, cited dossiers on people",
  });
}
