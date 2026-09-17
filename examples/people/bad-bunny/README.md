# Bad Bunny person index

A `soulscrape.person-index.v1` packet for Puerto Rican artist Bad Bunny — Benito Antonio Martínez Ocasio (Wikidata `Q44333953`) — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md`.

**Scope.** Public career record from the 2016 SoundCloud upload of "Diles" through the February 2026 Grammy Album of the Year win and the Super Bowl LX halftime show: albums, chart and touring records, the Ricky Renuncia protest moment, WWE matches, film roles, the "No Me Quiero Ir de Aquí" San Juan residency, and the ICE/Super Bowl context. Personal life is deliberately thin — he declines to confirm it on the record, so the index does not attempt a dating or family record.

**Sources.** 55 cataloged sources: his own channel uploads and official records (`subject_controlled`, `primary_record` — Billboard charts, WWE results, the NFL announcement, the Recording Academy ledger, Spotify Wrapped), first-person performance video, a dozen long-form interviews (NYT, Rolling Stone ×3, TIME ×2, Vanity Fair, i-D, The Cut, Billboard, NPR Alt.Latino), third-party reporting, an archived NYT protest dispatch, and reference entries (Wikidata, Wikipedia, Britannica, Guinness).

**Known gaps and seams.**

- Birthplace differs across reference records (Library of Congress says San Juan; most profiles say Bayamón) — flagged in `openQuestions`.
- Residency arithmetic varies: 30 shows in most coverage vs. 31 in Rolling Stone; attendance ~500K–600K; economic-impact estimates span $176.6M–$733M by methodology.
- The retirement motif ("my retirement album that was supposed to come out in 2032," the 2023 "year of rest") contradicts the unbroken release run — preserved as stated belief plus a speculation claim, not resolved.
- The DtMF World Tour's lack of mainland-U.S. dates is stated and sourced; whether later legs reverse it is open as of this index.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/bad-bunny/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/bad-bunny/person-index.json"
```
