# Daniel Lopatin person index

A `soulscrape.person-index.v1` packet for Daniel Lopatin — Oneohtrix Point Never (Wikidata `Q286346`) — built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from forty-nine public sources: his own site, Bandcamp, and the sunsetcorp YouTube channel; Wikidata and Wikipedia; label pages at Warp, Mexican Summer, and The Curatorial Club; interviews with Pitchfork, Resident Advisor, FACT, The Verge, The Guardian, The New York Times, NPR, Variety, GQ, Flash Art, and Rolling Stone; and reporting on the Eccojams archive, the Safdie scores, and the Weeknd production credits.

Scope: biography, work, philosophy, projects, media, and beliefs, as of September 2026 — covering the 2007 Deception Island cassette debut through the Eccojams/sunsetcorp era, the Software label years, the Warp album run, MYRIAD, the Safdie scores, the Weeknd collaboration arc (After Hours → Super Bowl LV → Dawn FM → Hurry Up Tomorrow), and the 2025 Tranquilizer / Marty Supreme releases.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/daniel-lopatin/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/daniel-lopatin/person-index.json"
```

## Known gaps

- Birthplace is split between Boston (Wikipedia infobox) and Wayland (authority files); only "born and raised in Massachusetts" is consistent across sources.
- Album numbering differs by source depending on whether cassettes, collaborations, and soundtracks are counted.
- The track-by-track split of his Hurry Up Tomorrow album/film work is not fully enumerated in the cited catalog.
- Software Recording Co. is dormant after 2016; whether it is formally closed is unsettled.
- The 2016 Eccojams Vol. 1 remaster was removed from his site; authorized availability is unclear.
- The October 2023 sunsetcorp reactivation is documented, but whether it signals future Eccojams work or was Again-era promotion is unresolved.
