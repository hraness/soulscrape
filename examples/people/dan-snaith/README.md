# Dan Snaith person index

A `soulscrape.person-index.v1` packet for Dan Snaith (Wikidata `Q1036131`) — the Canadian musician and mathematician who records as Caribou and Daphni, and as Manitoba until a 2004 trademark dispute with Dictators frontman Richard "Handsome Dick" Manitoba forced the rename. Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from forty-two public sources: his official site and Bandcamp, the British Library EThOS thesis record, the Mathematics Genealogy Project, prize and label records (Polaris, Grammy, Juno, Merge, BBC), interviews (Pitchfork, Guardian, FACT, XLR8R, Rolling Stone, Billboard, Irish Times, Esquire), the RA.246 podcast that debuted the Daphni alias, the 2004 rename announcement, and album reviews through 2026's *Butterfly*.

## Scope and coverage

Biography (Dundas, Ontario; London since 2001), the mathematics doctorate (Imperial College London, 2005, under Kevin Buzzard), the Manitoba-to-Caribou rename, the full Caribou/Daphni discography through *Honey* (2024) and *Butterfly* (2026), the Jiaolong label, awards (Polaris 2008, Juno 2021, Essential Mix of the Year 2014, two Grammy nominations), and his stated views on dance music, process, and family.

## Known gaps

- The thesis title is recorded inconsistently: EThOS says "Overconvergent Siegel modular forms"; the Mathematics Genealogy Project and Wikipedia say "Overconvergent Siegel Modular Symbols".
- Whether the Manitoba trademark action was a filed suit or a threat of one varies by source; settlement terms were never public.
- The origin of the name "Daphni" is not explained in the cataloged sources.
- The current Caribou live-band lineup and the exact extent of *Honey*'s AI vocal processing are not confirmed in the record.
- Whether Snaith retains any active involvement in mathematics after 2005 is unaddressed.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/dan-snaith/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/dan-snaith/person-index.json"
```
