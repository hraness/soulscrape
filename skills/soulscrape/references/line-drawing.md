# Line portraits

Create a small line portrait after [headshot selection](headshots.md) has bound a local image to the subject and recorded its source. Work from `headshot.json`; do not search for or infer identity from a face. The helper makes a deterministic first draft with local image processing. Most portraits need only a crop adjustment or a different detail setting.

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
- `portrait-line.png`: black contours on white, initially 512 × 512 pixels.
- `portrait.json`: the input identity and source receipt, image hashes, crop, settings, tool version, and an explicit record that no agent polish occurred.

The helper checks the selected receipt and input hash before decoding. It preserves the original and refuses existing output directories. It accepts PNG, JPEG, or WebP up to 12 MiB, 8192 pixels on either side, and 24 million total pixels. Animated files use frame zero. Processing uses one thread, limited memory, no disk-backed pixel cache, and a 25-second wall-clock limit per tool invocation. It downsamples before smoothing and Canny edge detection; the final one-pixel stroke expansion keeps contours readable at card size. See ImageMagick's [edge detector](https://imagemagick.org/command-line-options/#canny) and [resource limits](https://imagemagick.org/resources/).

## Check and refine

View the original, crop, and drawing together. Check the hair, eyes, nose, mouth, jaw, and pose for recognizable contours, without making personality, demographic, or health claims from appearance. Inspect the intended display size: a readable 128-pixel card matters more than extra detail at full resolution.

The default crop is a centered square, not face detection. If it clips the head or includes other people, choose `--crop left,top,side` in pixels after orientation correction. For example, `--crop 40,20,600` selects a 600-pixel square starting 40 pixels from the left and 20 from the top. Keep some space above the hair and preserve the visible face. A single-person headshot works better than a group or event photo.

Use `--detail low` for distracting texture and `--detail high` when faint facial contours disappear. Use `--size 256` for small cards; accepted sizes are 128–1024. Make at most two local variants after inspecting the first draft, then choose the clearest result. Stop if the source is too small, blurred, occluded, or poorly framed to preserve the person's likeness; return to headshot selection instead of inventing features.

## Optional agent polish

Use a single image-editing pass only when local variants cannot remove background clutter or produce clear contours. Provide the original crop and the selected line draft to an available image-editing tool. Request restrained cleanup of the existing contours: remove background marks, simplify texture, and improve stroke continuity while preserving the source's facial geometry, expression, hair, pose, age presentation, and visible accessories. Do not add details absent from the photograph. Skip this pass when no suitable image-editing tool is available.

Keep the source and deterministic draft. Save any polished result separately, record the tool, prompt, parent image hashes, and new hash in a companion receipt, and label it as an agent-edited illustration. Review it against the source; discard it if the likeness changes or details are invented. Do not silently replace the helper's `agentPolished: false` output with edited bytes.

## Review before use

Source selection and image processing do not establish publication rights. `reuse.status: restricted` stops the helper. `unknown` permits a local draft with a warning; resolve the intended reuse or select an allowed source before publishing. Preserve attribution, the source-page link, license, and modification notice where the applicable license requires them. A line drawing remains a derivative of the source photograph.

These assets and receipts stay beside the profile unless a destination explicitly supports them. The current `soulscrape.person-index.v1` packet does not accept arbitrary portrait fields. Never upload a receipt containing local paths as public profile content.
