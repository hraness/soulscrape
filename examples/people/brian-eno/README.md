# Brian Eno person index

A `soulscrape.person-index.v1` packet for Brian Eno (Wikidata `Q569003`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 46 public sources.

## Scope

Coverage is `biography`, `work`, `philosophy`, `beliefs`, `projects`, `media` — deliberately idea-heavy, matching the shape of the public record: Roxy Music (1971–73), the ambient turn, the production years for Talking Heads/Bowie/U2/Coldplay, generative music from Koan to iOS apps, the Long Now Foundation, and the recent climate-era records and activism.

## Sources

The catalog mixes all seven bindings: Eno-controlled pages (brian-eno.net, generativemusic.com), his authored books and essays as `first_person` (the Faber diary and *What Art Does* pages, the Long Now essay, the 1996 "Generative Music" talk transcript), a dozen `interview` entries (Wired 1995 and 2022, three Pitchfork interviews, two Guardian pieces, the 1996 San Francisco Chronicle Q&A, the 2013 RBMA lecture), `primary_record` entries (Long Now founding record and people page, the V&A Oblique Strategies record, the Rock Hall inductee page, the label release announcement), `reporting` (Kevin Kelly's scenius essay, Rolling Stone, Mixmag, SPIN, Sundance, TechCrunch, Twenty Thousand Hertz), `reference` (Wikipedia/Wikidata), and `archive` rehosts (the Music for Airports liner notes, the 1981 Keyboard interview, the 2001 Uncut Paul Morley piece).

## Known gaps

- Dates disagree in places and the packet says so: Ambient 1 is 1978 in most references but February 1979 in its Wikipedia article; the Microsoft Sound is 3¼ or 3.8 seconds and 84 or 83 pieces across his own tellings; *(No Pussyfooting)* is 1973 in discographies but 1974 in a contemporary magazine introduction.
- His exact credit on the Bowie "Berlin" records (collaborator vs producer, alongside Tony Visconti) is left unresolved on purpose.
- Activism and board roles (ClientEarth, BASIC, EarthPercent's current governance) rest on his own bio pages and are flagged as unverified in `openQuestions`.
- The interview corpus is a sample of five decades of press, not an exhaustive survey.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/brian-eno/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/brian-eno/person-index.json"
```
