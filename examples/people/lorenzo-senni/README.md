# Lorenzo Senni person index

A `soulscrape.person-index.v1` packet for Italian electronic musician Lorenzo Senni (Wikidata `Q90545154`) — the self-described "rave voyeur" who coined "pointillistic trance," founder of the Presto!? label and Warp Records artist (*Persona* EP, *Scacco Matto*). Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md`.

## Scope

Biography, work, philosophy, projects, media and beliefs, as of the packet's `scope.asOf` date. Coverage leans on English-language music press, institutional bios, and his own label/artist pages.

## Sources

Fifty-four cataloged sources, mixing bindings:

- **subject_controlled** — lorenzosenni.com, the Presto!? site and Bandcamp pages (label copy, liner notes, release credits), his booking-agency bio.
- **first_person** — the Boiler Room & Genelec "Science of Sound: Delay" film he hosts.
- **interview** — FACT (2015 and 2016, the latter by John Twells), Noisey/VICE, SSENSE (Philip Sherburne), The FADER, Crack, Dummy, Inverted Audio, and the 2016 RBMA Montréal lecture with Vivian Host (video plus full transcript).
- **primary_record** — Warp artist/release pages, the 2017 Prix Ars Electronica prizewinners PDF, Yuri Ancarani's film page.
- **reporting** — Resident Advisor news, NPR, Pitchfork/Guardian/Quietus/PopMatters reviews, Bandcamp Daily's Presto!? profile, Abitare (2009), CTM/HAU/SHAPE+/Serralves/musikprotokoll institutional pages, entertainment.ie, Zero, Artribune.
- **reference** — Wikidata, English and Italian Wikipedia, AllMusic, RA artist profile, Discogs, Bleep.
- **archive** — the CTM festival archive and FACT's archived 2016 best-albums list.

## Known gaps and hedges

- **Straight-edge status**: press and label bios place him inside the straight-edge hardcore scene (he abstained and was the designated driver), but he told FACT he was never into the ideology — tracked as a speculation claim and an open question rather than flattened.
- **Birthplace**: Cesena per Wikidata/Wikipedia/institutional bios; AllMusic alone says Milan. Cesena is asserted, the conflict preserved.
- **Presto!? founding month**: August 2008 (Abitare) vs September 2008 (label Bandcamp).
- **Band history**: the named band is Out Of Bounds (tour guitarist); earlier band names aren't documented in the catalog.
- **AAT**: premiere, performances and one ORF broadcast are documented; Serralves dates completion 2017, and no commercial release is confirmed.
- **JP-8000 vs JP-8080**: sources alternate between the keyboard and rack module for the trance records.
- **Superimpositions date**: 2014 vinyl (reviewed September 2014) vs Bleep's digital listing dated October 2015.
- Early timeline years (guitar start, drums, Bologna study) are approximations derived from ages he gave in interviews.

## Regenerate and validate

```sh
bun examples/people/lorenzo-senni/generate.ts
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/lorenzo-senni/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/lorenzo-senni/person-index.json"
```
