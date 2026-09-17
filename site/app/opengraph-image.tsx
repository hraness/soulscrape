import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { createSoulscrapeSocialImage } from "./social-card";

export const alt = "soulscrape — people for agents";
export { contentType, size };

export default function OpengraphImage() {
  return createSoulscrapeSocialImage({
    description: "Dated, source-bounded working models of people, built from authorized evidence and published as public indexes anyone can inspect.",
    title: "distill the essence of any human.",
  });
}
