import {
  socialImageContentType as contentType,
  socialImageSize as size,
} from "@hraness/web-discovery/social-image";

import { createSoulscrapeSocialImage } from "./social-card";

export const alt = "Soulscrape: See how someone thinks, and where every claim comes from.";
export { contentType, size };

export default function OpengraphImage() {
  return createSoulscrapeSocialImage({
    description: "Free agent skill that writes dated dossiers on people, sources cited",
    title: "See how someone thinks, and where every claim comes from.",
  });
}
