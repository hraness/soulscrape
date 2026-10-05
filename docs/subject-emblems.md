# Subject emblems for organizations and products

The example collection illustrates every rostered subject in one graphite
family. A person gets a shaded-pencil portrait produced by the
[headshot](../skills/soulscrape/references/headshots.md) and
[line-drawing](../skills/soulscrape/references/line-drawing.md) workflow. An
organization or product gets an *emblem study*: a shaded-pencil illustration
of one emblematic artifact or scene, produced by the same deterministic helper
from a reviewed, credited source image.

The emblem is editorial, not heraldic. It is an illustration of a real,
documented object, not a logo, wordmark, screenshot, seal, or invented crest,
and it never implies the subject endorses or supplied the image.

## Choosing the emblem

Pick one concrete artifact or scene that is already documented in the
subject's public record and reads clearly at card size:

- a product's material form (an editor's canvas, a hardware object, an
  interface fragment rendered as an object),
- an artifact the subject is built around or known through (a label's record,
  a lab's instrument, a foundation's clock),
- for a subject whose name or identity already evokes an object (a vault, a
  lantern, a slip-box, a butterfly), that object is legitimate when the dossier
  records the association,
- a scene of the subject's operating environment when no single object exists.

Do not use a face, a logo or trademarked mark, a flag, a team photo, or an
abstract pattern. Do not infer culture, values, or quality from the artifact;
the emblem is a reference image, not a claim.

## Selecting the source image

Follow the same discipline as headshot selection, adjusted for a non-person
subject:

1. Search Wikimedia Commons for the artifact or scene. A Commons file page is
   preferred because it carries the author, license, and description on one
   page. A general web image is usable only when its page clearly identifies
   and captions it.
2. The image must be what it appears to be: the file page or source page must
   identify the depicted object or scene. Never caption an emblem with a
   guess. For a product, an official product photo is acceptable; for an
   organization, the artifact need not be the subject's own specimen.
3. Check framing and quality the same way as a portrait: one dominant object
   or a clean scene, simple background, enough resolution for a 512-pixel
   square crop. A cluttered scene or tiny thumbnail is a reason to keep
   looking.
4. Record credit and license exactly as for portraits: `credit`, `license`,
   `sourcePageUrl`, `imageUrl`, `accessedAt`, and the source's SHA-256. Public
   visibility alone does not establish redistribution rights; a `restricted`
   reuse status stops the work, and `unknown` stays unpublished.

## The selection receipt

Write `emblem.json` beside the downloaded image, using the headshot receipt
shape with `status`, `subject`, `identityEvidence` (what the emblem depicts
and why it stands for the subject), `sourceTier`, `sourcePageUrl`, `imageUrl`,
`accessedAt`, `localPath`, `sha256`, `credit`, `license`, and `reuse`. The
`subject.anchors` list points at the subject's public page and the dossier
packet, not a person's identity.

## Drawing the emblem

Run `skills/soulscrape/scripts/prepare-line-drawing.ts` on the receipt exactly
as for a portrait. The default `--style shaded` produces the same pencil
register; try `--detail high` when a small object's edges wash out and
`--detail low` when a textured surface turns to scribble. Keep the artifact
roughly centered with modest breathing room; pass `--crop left,top,side` when
the default centered square clips it.

Review the draft at card size: the object must read as the thing it is, with
form carried by shading rather than edge outlines alone. Invented details,
extra objects, or readable lettering the source does not show are review
failures. When a draft cannot be made faithful, select another source or mark
the emblem `unavailable` in `site/lib/example-portraits.ts` with the reason
and review date; a monogram fallback is an explicit decision, not a default.

## Publishing

Ship the drawing as `site/public/portraits/<handle>.png` at 512 × 512
grayscale PNG, then record the subject kind-aware entry in
`site/public/portraits/credits.json` and its article in `credits.html`. The
credit `subject` field must equal the packet's `subject.displayName`, and the
published caption names it an editorial emblem study, not an official mark.
