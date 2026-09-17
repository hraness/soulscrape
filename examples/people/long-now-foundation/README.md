# The Long Now Foundation person index

A `soulscrape.person-index.v1` packet for **The Long Now Foundation** (`subject.kind: "organization"`, Wikidata `Q568907`) — the San Francisco nonprofit established in 01996 by Stewart Brand, Danny Hillis, and Brian Eno to foster long-term thinking on a 10,000-year timescale. Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 65 public sources: the foundation's own site (about, board, clock FAQ, projects, donate, ideas archive), founders' first-person essays (Hillis's 1995 "Millennium Clock," Eno's "Big Here and Long Now," Brand's TED talk), primary records (ProPublica Nonprofit Explorer, Charity Navigator, Library of Congress authority), the Science Museum's account of the prototype clock, reporting across Wired/IEEE Spectrum/Smithsonian/NPR/GeekWire/Snopes, the ESA's own Rosetta Disk page, local coverage of The Interval's opening, and Wikipedia/Wikidata.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts` from this directory (or `bun examples/people/long-now-foundation/generate.ts` from the repo root), then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/long-now-foundation/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/long-now-foundation/person-index.json"
```

## Scope

- Origins: Hillis's 01995 Millennium Clock essay, the 1996 founding board (photograph caption in Eno's essay is the evidence), Eno coining "the Long Now," Schwartz's ±10,000-year span.
- The clock: the 01999 prototype (ticked at the millennium; now in the Science Museum's Making the Modern World gallery), the Orrery, and the full-scale west Texas installation — excavation from ~2011, installation footage in 2018, no announced completion.
- Funding distinctions kept precise: Jacqui Safra funded the first clock; Nathan Myhrvold funded the Orrery; Jeff Bezos is funding the Texas clock — three different funders of three different things per the official FAQ. The $42M figure is attributed to Bezos himself (Wired feature via the author's archive), not asserted as an audited number.
- Projects: Rosetta Project (disk flown on ESA's comet mission, arriving at 67P in 2014), PanLex, Long Bets (Buffett's decade-long index-fund wager resolved for Girls Inc. of Omaha), Long Now Talks since 02003, The Interval venue (opened June 15, 02014), the Manual for Civilization library, and the Nevada Bristlecone Preserve.
- People edges: `founded_by` for Brand, Eno, and Hillis; `member` edges for every name on the official board page's current and emeritus lists (the founders get both a `founded_by` and a `member` edge); `funded_by` for Safra, Myhrvold, Bezos, and Jay Walker (Nevada land, per Brand's TED talk); `other` edges for ESA and the Science Museum as institutional partners; `collaborated` for Neal Stephenson.

## Organization-contract gaps

Same gaps as `examples/people/roam-research`, plus foundation-specific ones:

- **No board/staff relation kinds.** Board members ride in `member` edges; the current-vs-emeritus distinction lives in the note field — the board page publishes no tenure dates, so `member` edges carry no start/end except the documented 1996 founding board.
- **No funder granularity.** `funded_by` exists, but which project was funded rides in the note; there is no way to scope a funding edge to a specific `work`.
- **No nonprofit fields.** EIN, 501(c)(3) status, and headquarters live in claims and `subject.identity`, not structured fields.
- **No institution-partner kind.** ESA (carried the Rosetta Disk) and the Science Museum (hosts the prototype) are `other` edges with the relationship spelled out in notes.

## Hedging notes

- The $42M Texas clock figure is always attributed ("told Wired," "as Bezos stated it"), never stated as confirmed spend; GeekWire's headline number and the author's reposted Wired feature are the citations.
- Current vs. emeritus board status is taken verbatim from the official board page; where a founding-board member is now emeritus (Hillis, Carlston, Saffo, Schwartz), the notes say so and no transition date is invented.
- The clock's completion is treated as genuinely open — the latest public milestone is 2018 installation footage, and an open question records that no schedule exists.
- The "waste of time" critique (Wired, 2018) is kept in the catalog as a `pattern` claim and theme rather than adjudicated.
- EIN 68-0384748 and the January 4, 1996 formation date come from Wikipedia/ProPublica; the foundation's own site states only "established in 01996," and the packet preserves the five-digit convention.
- Patrick Collison and David Eagleman have Wikidata IDs verified; other board members are noted without guessing identifiers. No unverified QIDs are used anywhere.
