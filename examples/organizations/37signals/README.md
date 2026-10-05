# 37signals person index

A `soulscrape.person-index.v1` packet for **37signals** (`subject.kind: "organization"`, Wikidata `Q2364173`, still labeled "Basecamp" from the 2014–2022 name era). Built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 63 public sources: the company's own sites and Signal vs. Noise archive (launch posts, spin-off announcements, the Bezos investment post), the founders' HEY World and Medium posts (the origin email, the 2017 deal account, the 2021 policy posts and apology), the Mixergy founding interview and Fried's TEDx talk, the Rails release announcement mirror, publisher catalog records, and reporting by The Verge, TechCrunch, Wired, Bloomberg, The New York Times, ITPro, TNW, and Daring Fireball.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts` from this directory (or `bun examples/people/37signals/generate.ts` from the repo root), then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/37signals/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/37signals/person-index.json"
```

## Scope

- Origins: the 1999 web-design firm founded by Jason Fried, Carlos Segura, and Ernest Kim; the SETI-derived name; the early departures; and DHH's October 27, 2001 email that started the partnership — with his 2005 formal arrival kept distinct from "co-founder" framing.
- Products: Basecamp (2004), Ta-da List, Backpack, Campfire, Highrise, Writeboard, Sortfolio, Know Your Company, We Work Remotely, HEY (2020), and ONCE/Campfire (2023–2024), including the spin-off playbook (Claire Lew, Nathan Kontny, the 50/50→75/25 deal).
- Rails: the July 2004 open-source release of the framework extracted from Basecamp.
- Funding: the July 2006 Bezos Expeditions minority, no-control LLC stake — the only outside money on record — with DHH's 2017 account of its terms.
- Philosophy: the books (Getting Real, Rework, Remote, It Doesn't Have to Be Crazy at Work, Shape Up), the anti-VC/no-exit stance, calm-company doctrine, and the post-SaaS ONCE thesis.
- Controversy: the June 2020 Apple/HEY App Store fight and the April–May 2021 politics-ban implosion (~a third of ~57 employees departed).
- The renames: 37signals → Basecamp (February 2014) → 37signals again (May 2022).

## Organization-contract notes

The subject block is identical for `person` and `organization`; the org-specific content lives in the shared collections. Compared to the earlier Roam packet, this one exercises more of the org-side relation vocabulary:

- **Founders, staff, and backers ride in `relations`.** This packet uses `founded_by` (Fried, Segura, Kim), `member` (DHH — hired 2001, partner/co-owner later), `employed` (departed senior staff with `end` dates), `funded_by` (Bezos), `interviewed_by`, `influenced_by` (Coinbase's policy precedent), `founded` (Ruby on Rails as a spawned project), and `other` (spun-off entities: Highrise, Know Your Company, We Work Remotely). The Roam packet catalogued investors under `other`; `funded_by` fits better where the vocabulary allows it.
- **No `acquired`/`acquired_by` kind.** Divestments are `other` relations plus `other`/`milestone` timeline events with notes carrying the deal mechanics.
- **No funding-round timeline kind for equity stakes.** The Bezos minority investment is a `funding` event; product launches are `project`; name changes and crises are `milestone`.
- **Company vs. product ambiguity persists.** `works` holds products, books, the blog, and the podcast while the subject is the company.
- **No headquarters/headcount fields.** Both are claims with self-reported and third-party figures kept distinct.
- **Self-narrated history is pervasive.** The founding email, deal terms, and traction numbers come from the founders' own posts; those claims carry attribution or `stated_belief`/`pattern` kinds rather than bare `fact`.

## Hedging notes

- Early founder departures are approximate: the 2005 AIGA writeup says Segura left in 2000 and Kim in 2003; Fried's Mixergy recollection says "about a year later" and "2002 or so, maybe 2003." Both are preserved.
- DHH's status ladder (contractor → "a signal" → partner/CTO/co-owner) is reported as recorded; "co-founder" is the company's current framing, not a 1999 fact.
- The Bezos stake's current status is unknown post-2017; DHH's "he still owns the stake" is the last public word and is classified accordingly (a `speculation` claim carries the inference).
- The April 2021 headcount (~57) and the ~one-third departure share come from The Verge's reporting; the post-exodus "34 (2021)" figure is Wikipedia's; LinkedIn's 51–200 band is self-reported. None is authoritative.
- "Profitable since the beginning" is the company's own claim, echoed in a 2005 profile — filed as `fact` about the record, not an audited result.
- ONCE's trajectory (announced as a multi-product line; one product shipped; that product went from $299 to free/MIT in ~18 months) is described with sources and left unresolved in `openQuestions`.
- Ryan Singer's suspension and departure rest on The Verge's all-hands reporting; the company never published an outcome.
- Medium, HarperCollins, Bloomberg, and the New York Times return HTTP 403 to plain fetches; all are real, published pages retained with notes where relevant.
- The relation `influenced_by → Coinbase` is narrow: it records only that the April 2021 policy followed Coinbase's earlier move, per The Verge — not any deeper corporate relationship.

## Edges considered and skipped

- **Apple Inc.** — the HEY/App Store fight is a dispute, not a relation the vocabulary models; it lives in claims and timeline instead.
- **Amazon** — explicitly *not* the 2006 investor (the stake was Bezos Expeditions, personal money); an edge would misstate the record.
- **Declined investors** — the ~100 VC approaches the company says it turned down are a claim, not edges to unnamed firms.
- **Early clients and employees** (Matt Linderman, early hires) — tenure dates are not solidly sourced, so they appear only inside claim text where supported.
- **Shopify** — DHH's board seat there is personal, not an organizational relation of 37signals.

*This index was compiled from public sources and does not imply the organization's endorsement.*
