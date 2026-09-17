# Caterina Barbieri person index

A `soulscrape.person-index.v1` packet for the Italian modular-synth composer Caterina Barbieri (Wikidata `Q66832152`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md`.

## Scope

Biography, discography, stated philosophy, collaborations and the light-years label, through 17 September 2026 — covering the cassette debut *Vertical* (2014) on Important Records' Cassauna offshoot, *Patterns of Consciousness* (2017), *Ecstatic Computation* (Editions Mego, 2019), *Fantas Variations* (2021), the founding of light-years (2021), *Spirit Exit* (2022), *Myuthafoo* (2023), the *At Source* EP with Bendik Giske (2026), and her appointment as Artistic Director of the Music Department of La Biennale di Venezia for 2025–2026.

## Sources

Forty-nine public sources: her own site and Bandcamp and the light-years label pages (`subject_controlled`); her Biennale Musica 2025 curatorial statement (`first_person`); label and institutional catalogues — Important Records, Editions Mego, XKatedral, Summe, La Biennale, Cannes, Warp Composers, EMS (`primary_record`); interviews at FACT, Resident Advisor, Sound on Sound, zweikommasieben, Elevate, Digicult, Mixmag, NPR, the Barbican programme and Ableton (`interview`); a Wayback Machine capture of FACT's 2018 Signal Path interview (`archive`); reviews and news at Pitchfork, The Quietus, DJ Mag, Crack, Bandcamp Daily, RA and SHAPE (`reporting`); and Wikidata, Wikipedia and RA's label page (`reference`).

## Known gaps

- Her birth day is disputed: Wikipedia says 14 September 1990, Wikidata (via AllMusic) says 16 September. The packet records the month and flags the discrepancy in `openQuestions`.
- The frequently repeated "RBMA Tokyo 2014 participant" claim could not be verified — the published roster does not list her. The documented link is performing at RBMA-branded events (Bass Camp Rome 2017; Red Bull Music Festival London 2019). Recorded as a `speculation` claim and an open question rather than a fact.
- Release-day precision drifts between listings for *Myuthafoo* and *Vertical*'s label credit (Important vs. its Cassauna imprint); both are hedged.
- Her English Wikipedia article carries a promotional-content notice and an uncited education section, so education claims are anchored to La Biennale and EMS institutional bios.
- The full light-years roster and concert chronology are summarised, not exhaustive.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/caterina-barbieri/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/caterina-barbieri/person-index.json"
```
