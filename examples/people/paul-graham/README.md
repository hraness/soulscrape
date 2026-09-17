# Paul Graham person index

A `soulscrape.person-index.v1` packet for Paul Graham (Wikidata `Q92650`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from fifty-four public sources — his own essays, bio, and project pages; the SEC filing on the Viaweb acquisition; YC's official pages; interviews (Founders at Work, The Pull Request, Conversations with Tyler); contemporaneous Wired/CNNfn/Inc./NYT reporting; and reference records.

Scope: biography, work, philosophy, beliefs, projects, media, and writing — from painting and Lisp books through Viaweb, the essay corpus, Y Combinator, Hacker News, Arc, Bel, and the post-2014 return to writing.

Known gaps:

- The Viaweb and early-YC record is largely self-narrated through his essays and the Founders at Work interview; the packet keeps first-person claims marked as such.
- Founding-date and sale-price seams are recorded as open questions rather than resolved (summer/July 1995 vs. the 1996 launch; ~$49M vs. $49.6M).
- Arc's current development status and his post-2014 "retirement" label are left open.
- Press coverage was sampled, not exhausted; profiles beyond the cited set are out of scope.

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts`, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/paul-graham/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/paul-graham/person-index.json"
```
