# Burial person index

A `soulscrape.person-index.v1` packet for Burial — the recording alias of
William Emmanuel Bevan (Wikidata `Q552245`) — built by the public-index
workflow in `skills/soulscrape/references/public-person-index.md` from
fifty-two public sources.

This is the stress-test subject: the public record is thin *by design*. He gave
three substantive interviews (Martin Clark's Blackdown blog piece in March
2006, Mark Fisher's Wire interview in 2007, Dan Hancox's Guardian conversation
in October 2007 — Hancox calls his the last), named himself on MySpace in
August 2008 after The Sun's unmasking campaign, and has been silent since.
`speculation` and `openQuestions` carry unusual weight here, and the packet
does not pretend otherwise.

## Scope

Covers the release discography (Hyperdub 2005–present, plus Text, Pressure,
Keysound, fabric Originals, XL, Metalheadz), the 2008 Mercury/unmasking arc,
the collaboration web, the small interview corpus, and the stated philosophy
(anonymity as the condition of the work, second-hand rave, London at night).
Biographical detail after August 2008 is essentially nil — the packet keeps it
that way rather than laundering rumour into fact.

## Sources

Mixed bindings by design. `interview`/`transcript`: Blackdown, the Wire
transcript, the Guardian piece plus Hancox's 2025 full transcript, the Hyperdub
blog Q&A, the Quietus Jamie Woon interview (collaborator account).
`subject_controlled`: the official Bandcamp storefront (likely label-operated).
`primary_record`: Hyperdub's catalog and product pages, XL, fabric, Metalheadz.
`archive`: The FADER's verbatim reprint of the deleted MySpace post.
`reporting`: the Independent naming, Guardian/BBC/NME/Billboard unmasking and
Mercury coverage, Vice's ten-year retrospective, Pitchfork/RA reviews and
news, Reynolds' Untrue essay, the Marino academic chapter, Dazed's Hyperdub
oral history. `reference`: Wikidata, Wikipedia (six articles), Discogs,
AllMusic — discovery material, corroborated where it matters.

## Known gaps

- No birthdate, no confirmed schooling detail beyond the Independent's Elliott
  School report, no occupation, no post-2008 biography at all.
- The "next album" promised in the 2008 MySpace post has never appeared;
  whether it became the EP catalogue is open.
- Whether the self-naming was forced or a deflation tactic is preserved as
  speculation rather than resolved.
- Only ~2–3 verified images of him exist; the interview conditions, the
  "five people," and the pre-2002 demo catalogue are all undocumented.
- Release dates before 2011 are year-level where only year-level sourcing
  exists (e.g. Rodent, Subtemple / Beachfires).

`person-index.json` is generated: edit `generate.ts` and run
`bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/burial/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/burial/person-index.json"
```
