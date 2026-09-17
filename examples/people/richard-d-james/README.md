# Richard D. James person index

A `soulscrape.person-index.v1` packet for electronic musician Richard D. James —
Aphex Twin (Wikidata `Q223161`; note that `Q320501`, a plausible-looking
candidate, is a different entity) — built by the public-index workflow in
`skills/soulscrape/references/public-person-index.md` from forty-eight public
sources.

## Scope

Covers biography, the release record (Rephlex, Apollo/R&S, Warp), the live
return (2016–2023), the 2015 SoundCloud dump, and — as a first-class section —
the self-mythology: this subject's press record is deliberately contradictory,
so `speculation` and `openQuestions` carry unusual weight here. The tank, the
bank vault, the dead-brother naming story, the Tuss attribution, and the
submarine claim are each split across fact / stated_belief / speculation rather
than flattened.

## Sources

Mixed bindings by design: `subject_controlled` (the aphextwin.warp.net store,
the user18081971 SoundCloud account, official YouTube videos), `first_person`
(the Warp Cheetah page carrying his authored mock-manual copy), `primary_record`
(Warp catalog, Kickstarter campaign, grammy.com), `interview` (Pitchfork 2014,
Guardian "Tank boy" 2001, Index 2001, Noyzelab "Syrobonkers" 2014, Clash 2006),
`archive` (Internet Archive dump preservation, Lanner Chronicle transcript),
`reporting` (FACT, RA, Pitchfork news, SPIN, Dazed, Mixmag, et al.), and
`reference` (Wikidata, Wikipedia, Discogs).

## Known gaps

- Almost no reliable coverage of 2008–2013 beyond the Tuss aftermath.
- Early-life detail (schooling, the claimed coal-mine job) traces almost
  entirely to his own tellings.
- Whether specific tall tales are true is often unresolvable; the packet keeps
  the contested seams rather than picking a side.
- The `examples/people/README.md` index table does not list this packet.

`person-index.json` is generated: edit `generate.ts` and run
`bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/richard-d-james/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/richard-d-james/person-index.json"
```
