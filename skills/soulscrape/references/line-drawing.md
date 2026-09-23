# Line portraits

Create a small illustrated portrait after [headshot selection](headshots.md) has bound a local image to the subject and recorded its source. Work from `headshot.json`; do not search for or infer identity from a face. Start with a deterministic shaded drawing, then assess whether it preserves the source's visible features at the intended display size. A successful conversion is a draft, not a finished portrait.

## Make the first draft

Use Bun and an existing [ImageMagick 7 installation](https://imagemagick.org/script/download.php). This optional helper adds no package dependency, downloads nothing, and does not call a model. It was tested with ImageMagick 7.1.1-47; record the version used because image bytes can differ across tool versions. If `magick` is absent from `PATH`, pass its installed absolute path with `--magick`. Other Soulscrape work can continue without it.

Run from the installed `soulscrape` skill directory:

```sh
bun scripts/prepare-line-drawing.ts \
  --headshot /absolute/path/headshot.json \
  --out-dir /absolute/path/portrait-draft
```

The output directory must be new and its parent must exist. It contains:

- `portrait-crop.png`: the square source crop, with orientation corrected and transparency placed on white.
- `portrait-line.png`: a grayscale shaded drawing, initially 512 × 512 pixels. The filename is the same for either style.
- `portrait.json`: the input identity and source receipt, image hashes, crop, style, algorithm parameters, tool version, and an explicit record that no agent polish occurred.

The helper checks the selected receipt and input hash before decoding. It preserves the original and refuses existing output directories. It accepts PNG, JPEG, or WebP up to 12 MiB, 8192 pixels on either side, and 24 million total pixels. Animated files use frame zero. Processing uses one thread, limited memory, no disk-backed pixel cache, and a 25-second wall-clock limit per tool invocation.

The default `--style shaded` downsamples, smooths grayscale detail, blends with a blurred negative to bring out pencil-like edges, and multiplies in lightened source tones to retain facial form. Blur distances scale with the output size. `--style outline` retains the earlier binary Canny contours and one-pixel stroke expansion when an outline treatment is wanted. See ImageMagick's [edge detector](https://imagemagick.org/command-line-options/#canny) and [resource limits](https://imagemagick.org/resources/).

## Check and refine

View the original, crop, and drawing together, then inspect the drawing at the actual card size. Check that the hair, eyes, nose, mouth, jaw, and pose remain readable and source-faithful; preserve glasses and other visible accessories. Shading should describe the face's form without turning texture into dark scribbles or leaving the face mostly blank. Background equipment, text, and other people should not compete with the portrait. A recognizable silhouette alone does not pass this review. Do not infer personality, demographic, or health information from the image.

The default crop is a centered square, not face detection. If it clips the head or includes other people, choose `--crop left,top,side` in pixels after orientation correction. For example, `--crop 40,20,600` selects a 600-pixel square starting 40 pixels from the left and 20 from the top. Keep some space above the hair and preserve the visible face. A single-person headshot works better than a group or event photo.

Use `--detail low` for a lighter, smoother shaded result and `--detail high` for stronger tones and finer detail. For outlines, these settings reduce or increase detected contours. Use `--size 256` for small cards; accepted sizes are 128–1024. Make at most two local variants after inspecting the first draft, then choose the clearest result. Stop if the source is too small, blurred, occluded, or poorly framed to preserve the person's likeness; return to headshot selection instead of inventing features.

## Optional agent polish

Use an optional image-editing pass when the selected draft needs clearer facial form, coherent pencil strokes, or background cleanup. Provide the original crop and selected draft to an available image-editing tool. Request a restrained drawing that retains the source's facial geometry, expression, hair, pose, age presentation, and visible accessories. Simplify background marks and texture while preserving the source's light and dark structure. Do not add glasses, jewelry, facial hair, clothing details, or other features absent from the photograph. The helper never invokes this tool itself. Skip the pass when no suitable image-editing tool is available.

Keep the source and deterministic draft. Save any polished result separately, record the tool, prompt, parent image hashes, and new hash in a companion receipt, and label it as an agent-edited illustration. Review the face and accessories against the source at full and card size. If one concrete artifact remains, allow one focused repair that names it and supplies the same source reference. Reject the result if features are still invented, the likeness changes, or the quality gate fails; use a better source or report the portrait unfinished. Do not silently replace the helper's `agentPolished: false` output with edited bytes.

## Review before use

Source selection and image processing do not establish publication rights. `reuse.status: restricted` stops the helper. `unknown` permits a local draft with a warning; resolve the intended reuse or select an allowed source before publishing. Preserve attribution, the source-page link, license, and modification notice where the applicable license requires them. A line drawing remains a derivative of the source photograph.

These assets and receipts stay beside the profile unless a destination explicitly supports them. The current `soulscrape.person-index.v1` packet does not accept arbitrary portrait fields. Never upload a receipt containing local paths as public profile content.

For a set of profiles, update the [coverage roster](headshots.md#track-every-requested-subject) with each drawing's review outcome and its selected output. Reconcile that roster against the actual displayed cards before saying the portrait work is complete.
