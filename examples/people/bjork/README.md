# Björk person index

A `soulscrape.person-index.v1` packet for the Icelandic musician Björk Guðmundsdóttir (Wikidata `Q42455`, handle `bjork`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 54 public sources: bjork.com and fossora.com (subject-controlled), the Sonic Symbolism podcast and her rehosted Times op-ed (first person / archive), the deep interview record (Pitchfork, Guardian, NYT, NPR, Dazed, Rolling Stone), institutional records (MoMA, Festival de Cannes, Polar Music Prize, City of Reykjavík, Nordic Council of Ministers), reporting (Wired, Billboard, BBC, NME, Atlantic, Reykjavík Grapevine), and reference material (Wikidata, Wikipedia, Britannica).

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/bjork/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/bjork/person-index.json"
```

## Scope

Biography, work, philosophy, projects, media, and beliefs — from the 1977 children's album through the Sugarcubes, the ten-album solo run, Dancer in the Dark and the swan dress, Biophilia's app and educational project, the 2015 MoMA retrospective, Vulnicura VR / Björk Digital, Cornucopia, Fossora, and the June 2026 Echolalia exhibition. Research cutoff: 2026-09-17.

## Known gaps and hedges

- The "first artist to use a touchscreen live" superlative is logged as `speculation` plus an `openQuestions` entry: the documented record supports the Reactable's mainstream debut at Coachella 2007 and the Lemur on the Volta tour, but absolute priority is unverifiable from the cited sources.
- "Debut" counts only her adult catalog — the 1977 LP makes it technically her second solo record; numbering varies across sources.
- Per-album production splits are self-reported (her ~60/40 Utopia figure); the female-producer-credit issue is documented through her own account.
- Family particulars are deliberately omitted; the Matthew Barney separation is named only as the stated subject of Vulnicura in public interviews.
- The eleventh album (in progress per the June 2026 Dazed interview) and the Cornucopia film's wider distribution are open questions at cutoff.
