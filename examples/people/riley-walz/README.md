# Riley Walz person index

A `soulscrape.person-index.v1` packet for Riley Walz (Wikidata `Q136448953`), the San Francisco software engineer and internet artist behind Jmail, Bop Spotter, IMG_0001, LooksMapping, Panama Playlists, and Find My Parking Cops. Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 48 public sources — his own sites and blog, the House Oversight Epstein release, interviews (Wired Q&A, New Yorker, TBPN, NPR), and reporting from the NYT, Washington Post, Wired, The Verge, Rolling Stone, Mission Local, SF Standard, and others.

## Scope

Covers biography, works, media, and stated beliefs from the February 2020 fake-candidate stunt through the April 2026 "Notion Way" alley auction and his February 2026 hire at OpenAI's OAI Labs. Research cutoff September 17, 2026.

## Sources

Forty-eight entries across all seven bindings: nine `subject_controlled` (walzr.com project pages, jmail.world, panamaplaylists.com, paintastreet.com, his X profile), three `first_person` (his Andrew Walz write-up, the self-published LooksMapping methodology paper, the founders' Numerous.ai listing), five `interview`, one `primary_record` (the November 12, 2025 House Oversight release Jmail renders), twenty-six `reporting`, three `reference` (English Wikipedia on Walz and on Jmail, Wikidata), and one `archive` (an Archive Today capture of the paywalled NYT profile used to confirm quoted material).

## Known gaps and hedges

- Only his birth year (2002) is published; ages in profiles are consistent but the exact date is unrecorded.
- Bop Spotter's hardware status is unverified since its October 2024 launch coverage; the site persists.
- Panama Playlists' account attributions are probabilistic inference; only some named figures confirmed.
- Jmail traffic figures differ by metric (visits vs. unique visitors vs. page views) and date; no single current number.
- No dedicated New York Times or NBC News feature on Jmail itself was found; NYT's profile predates it, and NBC's coverage here covers the parking-cop tracker and the Citi Bike sleuthing episode. Jmail coverage is anchored by Wired, The Verge, Rolling Stone, CJR, SF Standard, and a later Guardian piece on the data-sleuth ecosystem.
- His 2021–2022 New York period is thinly documented beyond the Mehran's Steak House reporting.
- OpenAI work at OAI Labs is undisclosed.

## Regenerate and validate

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/riley-walz/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/riley-walz/person-index.json"
```
