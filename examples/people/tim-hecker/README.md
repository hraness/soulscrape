# Tim Hecker person index

A `soulscrape.person-index.v1` packet for the Canadian electronic composer Tim
Hecker (Wikidata `Q3068648`), built by the public-index workflow in
`skills/soulscrape/references/public-person-index.md` from forty-seven public
sources — his own site and Bandcamp pages, label records (4AD, Kranky-era
Bandcamp, Software Recording Co., Milan Records, electrocd, the JUNO archive,
Ulrich Seidl Filmproduktion), an archived Alien8 Recordings capture, his McGill
doctoral dissertation, reference entries (Wikipedia, Wikidata, AllMusic), and a
deep bench of interviews (Exclaim!, Pitchfork, Resident Advisor, The Quietus,
SPIN, Interview Magazine, FACT, The Guardian, The Japan Times, Phoenix New
Times, Synth History, and others).

## Scope

`scope.coverage` is `biography`, `work`, `philosophy`, `beliefs`, `media`,
`projects`. The index covers the Jetone techno years, the Alien8/Substractif
debut, the Kranky canon (Harmony in Ultraviolet through Shards), the 4AD detour
for Love Streams, the Tokyo Gakuso gagaku sessions behind Konoyo and Anoyo, the
film and television scores, and the parallel academic career in sound studies.
Fact, stated_belief, pattern, and speculation claims are kept separate; the
speculation entries are confined to readings the sources suggest but never
confirm.

## Corrections to common shorthand

- Hecker was born in Vancouver, not Montreal — he moved to Montreal in 1998 for
  graduate study at Concordia and is "Montreal-based" by origin story only.
- The 2025 soundtrack-derived release is *Shards* (Kranky, February 21, 2025);
  no release titled "Shōto" exists in the cited record.
- The Ravedeath Juno win belongs to the 2012 award year per the JUNO archive;
  Wikipedia's album article loosely dates it March 2011, and the index follows
  the Juno record.

## Known gaps

- The July 17, 1974 birth date is flagged citation-needed on Wikipedia and rests
  on secondary listings.
- What the reported 1996 Jetone "debut" comprised is undocumented; the first
  confirmed Jetone album is 2000's *Autumnumonia*.
- The extent of his music in the released cut of *The Free World* (2016) is
  unconfirmed; no soundtrack album was issued.
- His current base of operations is undocumented — mid-2010s interviews call him
  an LA resident while profiles keep Montreal ties.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`,
then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/tim-hecker/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/tim-hecker/person-index.json"
```
