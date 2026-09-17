# Oxide Computer Company person index

A `soulscrape.person-index.v1` packet for **Oxide Computer Company** (`subject.kind: "organization"`; no confirmed Wikidata item as of this build — identity anchors on the domain and GitHub org). Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 63 public sources: oxide.computer (founding announcement, funding posts, the compensation posts, RFD 1, product pages, the LLNL and Project Glasswing announcements), the company's GitHub org and project repos (Omicron, Hubris, Helios, Propolis, Dropshot) and its public RFD archive, the founders' and founding engineers' own blogs (Cantrill's "The Soul of a New Computer Company," Frazelle's "Born in a Garage," the December 2019 joining posts), both company podcasts (On the Metal, Oxide and Friends), interviews (Software Engineering Daily, The Pragmatic Engineer), company wire releases, reporting (InfoQ, The New Stack, TechCrunch, Axios, Blocks & Files, Network World, Reuters, Data Center Dynamics, FinSMEs, the two-part Pragmatic Engineer profile), and investor/aggregator references (Eclipse, Intel Capital, PitchBook, CB Insights, LinkedIn, Seedtable, YesPress).

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts` from this directory (or `bun examples/people/oxide-computer/generate.ts` from the repo root), then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/oxide-computer/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/oxide-computer/person-index.json"
```

## Scope

- Founding: August 2019 GitHub org, the December 1–2, 2019 announcement, the three founders and their roles (Tuck CEO, Cantrill CTO, Frazelle CPO), and the coordinated founding-engineer announcements the following day.
- Thesis and product: rack-scale "cloud computer," hardware/software co-design, 32-sled integrated system, first rack shipped June 30, 2023, commercial unveiling October 26, 2023.
- Funding: the Eclipse-led seed (undisclosed; aggregators report ~$20M, December 2019), the $44M Series A (October 2023), the $100M Series B led by USIT (July 2025), and the $200M Series C led by USIT (February 2026) — through ~$378M total per trade-press accounting.
- Engineering culture: public RFDs, the uniform-salary compensation model ($175K for all in 2021 → $275K by 2025), the open-source stack, and the two podcasts.
- Customers and collaborations: Idaho National Laboratory, the November 2024 Lawrence Livermore announcement (with Los Alamos and Sandia participating in related activities), investor-named customers (Switch, Shopify), and the July 2026 Anthropic Project Glasswing membership.
- Departure: Jessie Frazelle's July 2022 exit to co-found KittyCAD (now Zoo).

## Organization-contract notes

The subject block is identical for `person` and `organization`; the org-specific content lives in the shared collections:

- **Founders, engineers, and investors ride in `relations`.** This packet uses `founded_by` (Cantrill, Tuck, Frazelle), `employed` (founding engineers Mustacchi, Clulow, Mooney, plus Leventhal), `funded_by` (Eclipse, Intel Capital, Riot, Counterpart, Rally, USIT, Jane Street), `collaborated` (INL, LLNL, Anthropic), `influenced_by` (Joyent lineage), `interviewed_by` (Software Engineering Daily), and `other` (Shopify, Switch as investor-attested customers; Zoo as the co-founder's next company). These org-side directions exist in the vocabulary and are exercised here — the earlier Roam packet's README predates their use.
- **Funding rounds are `funding` timeline events**; the GitHub org creation, compensation model, LLNL announcement, and Glasswing membership are `milestone`; product releases are `project`.
- **No `acquired`/`acquired_by` kind and none needed** — the anti-acquisition posture is a `stated_belief` claim, not an edge.
- **Customer relationships have no dedicated kind.** `collaborated` covers the labs where the relationship is jointly documented; investor-named customers (Shopify, Switch) ride `other` with the hedge in the note.
- **No headquarters/headcount fields.** Emeryville and the ~120-employee estimate are claims and open questions, sourced to the GitHub org page and aggregators.
- **Company marketing vs. record.** Statements like "world's first commercial cloud computer" are presented as the company's own claims with the announcement as citation, not independently verified superlatives.

## Hedging notes

- The seed amount is an aggregator figure (~$20M, December 2019) the company never confirmed; the packet keeps it attributed and flags the arithmetic discrepancy (Series A math implies $34M raised pre-2023; Oxide's Series B post says $89M over six years — ~$11M unitemized) as a `speculation` claim and open question.
- "Series A" naming for the October 2023 round despite earlier seed financing is unexplained; preserved as an open question rather than smoothed.
- Headcount (~120) comes only from aggregators; revenue estimates circulating on profile sites are unverifiable and appear only in `openQuestions`.
- Frazelle's post-departure status is ambiguous: her CPO role ended July 2022 (per The Org and her own Zoo announcement) while LinkedIn still lists "Co-Founder (Current)" — recorded as an open question, not resolved either way.
- The unnamed "Fortune 1000 global financial services organization" customer is quoted as such; no edge or claim names it.
- Shopify and Switch as customers rest solely on the lead investor's writeup — `other` relations with the caveat in the note, and cited to `eclipse.capital` only.
- Compensation figures are the company's own published numbers (the model's entire point is transparency), but the sustainability question at scale is `speculation`, not `fact`.
- The July 2026 Project Glasswing announcement falls inside this packet's `asOf` window (September 2026); readers regenerating with an earlier as-of should drop it and the Anthropic edge.

## Edges considered and skipped

- **Los Alamos and Sandia national laboratories** — the LLNL post says they participate "in related activities," too thin for individual edges; covered in the LLNL claim text.
- **Pierre Lamond** — board seat is documented but he appears inside claim/edge notes (the Eclipse edge) rather than as a separate person edge; the vocabulary has no `board_member` kind and `member` would misstate the role.
- **The unnamed "Fortune 1000 global financial services organization"** — no edge to an anonymous target.
- **Sun Microsystems, Docker, Mesosphere, Google** — the founders' prior employers are personal history, not organizational relations of Oxide; the cultural lineage is carried by the single `influenced_by → Joyent` edge and the ex-Sun `pattern` claim.
- **KittyCAD's investors or employees beyond Frazelle** — outside scope.
- **USIT's parent entities / Thomas Tull personally** — the fund is the named investor; no separate person edge is asserted.

*This index was compiled from public sources and does not imply the organization's endorsement.*
