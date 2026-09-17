# Hyperdub person index

A `soulscrape.person-index.v1` packet for **Hyperdub** (`subject.kind: "organization"`, Wikidata `Q2994824`) — the London record label founded by Steve "Kode9" Goodman in 2004. Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 75 public sources: hyperdub.net's own artist and release pages, the label's social profiles, interviews with Kode9 (Resident Advisor, FACT, The Quietus, Electronic Beats), journalism across Resident Advisor/Pitchfork/Fact/Dazed/Mixmag/The Guardian/Rolling Stone, reviews of the catalog, Wikipedia, and Wikidata.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts` from this directory (or `bun examples/people/hyperdub/generate.ts` from the repo root), then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/hyperdub/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/hyperdub/person-index.json"
```

## Scope

- Origins: the pre-label webzine/project phase (1999–2001, deliberately unresolved), the 2004 label launch with Kode9 + Daddi Gee's "Sine of the Dub / Stalker" (HYP001), and the Goodman/Kode9 dual identity as academic and DJ.
- Catalog spine: Burial's *South London Boroughs*, *Burial*, and *Untrue*; Kode9 & The Spaceape's *Memories of the Future* and *Black Sun*; Laurel Halo's *Quarantine*; Jessy Lanza's *Pull My Hair Back*; DJ Rashad's *Double Cup*; Fatima Al Qadiri's *Asiatisch*; Burial's *Antidawn* and beyond.
- Compilations and anniversaries: *5 Years of Hyperdub* (2009), the *Hyperdub 10.x* series (2014), and the twentieth-anniversary campaign (2024), including the Ø club-night series.
- Roster breadth: dubstep and grime origins widening into UK funky, footwork (the Rashad/Teklife connection), R&B-inflected electronic pop, and the later experimental wing — documented through artist-page and review sourcing.
- People edges: `founded_by` Kode9; `member` edges for sourced roster artists (Burial, Jessy Lanza, Fatima Al Qadiri, Laurel Halo, Ikonika, Cooly G, DJ Rashad, aya, Proc Fiskal, Nazar, Loraine James, Zomby, Dean Blunt via Babyfather); `influenced_by`/`other` edges for adjacent figures where sources support them.

## Organization-contract gaps

Same gaps as `examples/people/roam-research`, plus label-specific ones:

- **No roster relation kind.** Signed/associated artists ride in `member` edges — the closest the schema offers — with the note field carrying the nuance (recording artist vs. literal employee).
- **No discography work kind.** Releases are `recording` works; label projects like the Ø nights and anniversary campaigns are `project`.
- **No imprint/subsidiary relation.** Nothing in the schema distinguishes a sublabel; Hyperdub's one-off projects live in `works` instead.

## Hedging notes

- The webzine start date is deliberately unresolved: sources variously say 1999 (Dazed, Rolling Stone), 2000, and 2001; the packet keeps all three in a claim plus an open question rather than picking one.
- Dean Blunt's *Black Metal* is a Rough Trade release, not Hyperdub — the packet's Blunt edge hangs on Babyfather's *BBF Hosted by DJ Escrow* (2016, Hyperdub), which is sourced.
- Some month-precision dates were softened to year-only where the cited sources don't pin a month (*Memories of the Future*, *Black Sun*, *Fabriclive 100*).
- Roster membership is sourced from the label's own artist pages and interviews; where an artist's Hyperdub association is one release rather than a sustained signing, the note says so instead of implying a contract.
- Genre labels on the roster ("dubstep label") are marked as the press's framing in claims, with the label's own resistance to the tag preserved.
