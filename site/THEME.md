# Paper theme + editorial marketing preset + Lantern material

The default presentation follows AICharts: warm neutral surfaces, Nebula Sans,
compact headings, hairline rules, and a blue action color. Content, layout,
application state, and domain-specific visualizations remain product-owned.
Saved appearance choices retain their existing storage keys and behavior.

Three immutable design-kit snapshots supply the shared surfaces:

- `vendor/hraness-paper` — the Paper palette and token bridge.
- `vendor/hraness-marketing` — the opt-in editorial marketing preset
  (`product-marketing-preset.css`): Instrument Serif display face, marketing
  role tokens, the textured field, and the translucent header paint hook.
  Pages opt in with `data-hraness-marketing-preset="editorial"` on a wrapper.
- `vendor/hraness-lantern` — the Lantern material (`lantern-material.css`):
  `hraness-material-chrome` on the site header, `hraness-material-wall` on the
  hero field, and `hraness-material-pane` on cards, enabled by
  `data-hraness-material="lantern"` on the document element.

Each snapshot's `provenance.json` records its full immutable source commit and
SHA-256 digests; the CSS and license are unchanged upstream bytes. All three
are pinned to the same reviewed commit so the surfaces stay consistent. Local
aliases and composition adjustments stay in product stylesheets. The existing
component package pins do not move with a snapshot update; no runtime fetch,
sibling checkout, or shared release train exists.

Run `bun run check:theme` to verify all three snapshots offline. This is also
part of the existing validation gate. To upgrade deliberately, inspect the
design-kit contract docs (`MARKETING_PRESET.md`, `LANTERN_MATERIAL.md`) and
release notes, then run its `scripts/paper-theme-snapshot.ts`,
`scripts/product-marketing-snapshot.ts`, and
`scripts/lantern-material-snapshot.ts` installers with `--write` for each
snapshot directory and `--source-commit` set to the reviewed full commit. Run
this repository's normal checks and inspect its supported desktop/mobile and
appearance states. Commit the CSS, licenses, and provenance together.
Reverting that commit restores the prior surfaces.

Portable contract 1 keeps existing token names and meaning stable. Additive
roles may be adopted independently; incompatible meaning requires a new
contract and explicit migration. The CSS uses `light-dark()` (Chrome 123+,
Firefox 120+, Safari 17.5+). Fonts come from the product's existing approved
font installation plus the snapshot's vendored Instrument Serif; no snapshot
makes a network asset request.
