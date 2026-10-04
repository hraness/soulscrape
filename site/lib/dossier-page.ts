import { isPersonHandle } from "../../skills/soulscrape/scripts/person-index";
import { dossierSectionDigest, parseDossierSection, type DossierSection } from "../../skills/soulscrape/scripts/dossier-section";
import { canonicalText } from "../../skills/soulscrape/scripts/source-packet";
import { parseUsernameSegment } from "./routes";

type Row = Record<string, unknown>;
export type PublicSection = Readonly<{ username: string; handle: string; packetDigest: string;
  revision: number; documentDigest: string; section: DossierSection }>;

export function parsePublicSection(value: unknown, username: string, handle: string, sectionId: string): PublicSection | null {
  if (parseUsernameSegment(username) !== username || !isPersonHandle(handle)
    || !/^[a-z][a-z0-9-]{1,79}$/u.test(sectionId)
    || value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const row = value as Row;
  if (Object.keys(row).sort().join(",") !== "documentDigest,handle,packetDigest,revision,section,username"
    || row.username !== username || row.handle !== handle || typeof row.packetDigest !== "string"
    || !/^[a-f0-9]{64}$/u.test(row.packetDigest)
    || typeof row.revision !== "number" || !Number.isSafeInteger(row.revision) || row.revision < 1
    || typeof row.documentDigest !== "string" || !/^[a-f0-9]{64}$/u.test(row.documentDigest)) return null;
  try {
    const section = parseDossierSection(row.section);
    if (section.id !== sectionId || section.packetDigest !== row.packetDigest || section.profileRevision !== row.revision
      || section.profileUrl !== `https://soulscrape.com/${username}/${handle}`
      || dossierSectionDigest(section) !== row.documentDigest) return null;
    return { username, handle, packetDigest: row.packetDigest, revision: row.revision,
      documentDigest: row.documentDigest, section };
  } catch { return null; }
}

export function dossierSectionMarkdown(value: PublicSection): string {
  const section = value.section;
  const structured = canonicalText({ provenance: section.provenance, anchors: section.anchors,
    sources: section.sources, records: section.records });
  const fence = "`".repeat(Math.max(3, ...Array.from(structured.matchAll(/`+/gu), match => match[0].length)) + 1);
  return [section.body, "", `Published by @${value.username} in profile revision ${value.revision}.`,
    `Original document: ${section.provenance.originalUrl}`,
    ...(section.provenance.originalAuthor ? [`Original credited author: ${section.provenance.originalAuthor}`] : []),
    ...(section.provenance.draftingDisclosure ? [section.provenance.draftingDisclosure] : []),
    "", "## Structured source and record data", "",
    `${fence}json`, structured, fence, ""].join("\n");
}
