# Public headshot selection

Use this protocol when a public profile needs a portrait or the user asks for a headshot. The result is a source image with a recorded identity match and provenance, followed by the [line-drawing workflow](line-drawing.md). If the user explicitly selects an image, use that choice within the stated purpose instead of replacing it through search.

Read [web-research.md](web-research.md) before browsing. Start from the identity and account URLs established by [personal-links.md](personal-links.md). The image must be explicitly attributed to the known person by its account or page context. Do not identify a person from a face, compare faces to establish identity, or use a name-only image-search match.

## Prefer these sources, in order

| Order | Source | What makes it usable |
| --- | --- | --- |
| 1 | LinkedIn profile photo | A bound public profile whose visible account context identifies the subject and the image as its profile photo. |
| 2 | Other social profile photo | A bound public personal or creator account with a clear portrait avatar. Prefer an account linked by the person's official site. |
| 3 | Wikipedia / Wikimedia Commons | The bound article identifies the subject; the image description or Commons file page attributes the portrait and supplies its credit and license. |
| 4 | General web | A personal site, employer biography, publisher, conference, or reputable outlet explicitly captions or presents the image as a portrait of the subject. |

Use the first usable tier. Public accessibility, identity evidence, a usable portrait, and suitability for the requested use all matter. A login wall, inaccessible original, unrelated group photo, logo, tiny thumbnail, uncertain identity, or incompatible reuse terms is a reason to move on. A search result is a lead to its source page, not provenance by itself. Never bypass a login or challenge to recover a preferred avatar; fall back to the next public tier.

Keep discovery bounded: inspect the known LinkedIn profile, a few already-bound social accounts, the bound reference article, then a few targeted web results. Add a role, employer, project, or another established identity anchor to the search. Stop at the first clear usable match or when this small set is exhausted. Record why preferred tiers were skipped. If none is reliable, return `unavailable`; if credible sources conflict, return `ambiguous`. Use initials or omit the portrait until better evidence arrives.

## Select and preserve

1. Open the source page and its image. Confirm through text, links, caption, or avatar placement that the image is attributed to the subject. Keep a short explanation and the public URLs that establish this binding.
2. Inspect framing and quality. Prefer a single face, head and shoulders, visible facial detail, simple background, and enough resolution for a 512-pixel output. A larger clean photo is useful; enlarging a tiny thumbnail adds no evidence or detail. Do not infer personal attributes from the image.
3. Retrieve only the selected public image through the available permitted tool. Bound downloads to 12 MiB and decoded dimensions to 24 megapixels, with neither dimension above 8,192 pixels; reject HTML, unsupported formats, and oversized files. Keep the original local file unchanged and record its SHA-256. The line-drawing helper performs its own format and pixel checks before conversion.
4. Record source credit and license or terms when supplied. Use `unknown` when they are not stated. Public visibility does not itself establish permission to redistribute a photograph or a derived drawing. Preserve restrictions and attribution; do not treat stylization as clearance for publication. A source that cannot support the requested public use can still be linked as a source; choose another image or omit the published portrait.

## The handoff receipt

Write `headshot.json` beside the downloaded image. A selected receipt uses `schemaVersion: "soulscrape.headshot-selection.v1"` and these fields:

| Field | Value |
| --- | --- |
| `status` | `selected` only after the image is bound and downloaded. |
| `subject` | `{ "displayName": "…", "anchors": ["https://…"] }`; one to eight public identity-anchor URLs. The `user` tier may use an empty array when the user's explicit image selection supplies the attribution. |
| `identityVerified` | `true`; this records the research decision, not a face-recognition result. |
| `identityEvidence` | A short explanation of how the bound page attributes this image to the subject. |
| `sourceTier` | `linkedin`, `social`, `wikipedia`, `web`, or `user` for an explicitly supplied image. |
| `sourcePageUrl` | The public profile, biography, or image-description page; required for every public-source tier. May be absent for `user`. |
| `imageUrl` | Optional public image URL, when available without credentials. Keep it separate from the source page. |
| `accessedAt` | The retrieval time as a UTC ISO 8601 timestamp ending in `Z`. |
| `localPath`, `sha256` | Absolute original-image path and its lowercase SHA-256 hex digest. |
| `credit`, `license` | Source credit and license name or URL; `unknown` when not stated. |
| `reuse` | An object with `status` (`permitted`, `unknown`, or `restricted`) and `basis` describing the evidence and the permitted use. |

Do not copy credential-bearing or signed private image URLs into the receipt. Keep tier-skip reasons in the research ledger. A failed search may leave a short receipt with `status: "unavailable"` or `"ambiguous"` and the reason; it is not input to the line-drawing helper. Never mark `identityVerified` true to satisfy a tool.

Run [line-drawing.md](line-drawing.md) after this selection. Local processing may proceed with unknown reuse terms; the result retains that status and must not be automatically published. A restricted source is not input to the helper. A user-supplied transformation request can establish the requested local use; it does not establish a public redistribution license.

The headshot and portrait receipts are local companion artifacts, not fields in `soulscrape.person-index.v1`. Keep their paths, hashes, and processing details out of the public packet. For a public index, catalog the supporting public page in `sources`; include a published portrait link or image in `body` only when its use and required credit are appropriate. Never claim the subject endorses the resulting portrait or profile.
