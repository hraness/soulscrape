# Andrej Karpathy person index

A `soulscrape.person-index.v1` packet for AI researcher and educator Andrej Karpathy (Wikidata `Q56037405`), built by the public-index workflow in `skills/soulscrape/references/public-person-index.md` from 51 public sources — his own site and blog, repositories, self-published lectures, OpenAI/Tesla/Stanford records, major interviews (Lex Fridman, Dwarkesh, No Priors, Sequoia), and press coverage through his May 2026 move to Anthropic.

## Scope

Biography, work, philosophy, beliefs, projects and media, as of September 17, 2026. Covers: Toronto→UBC→Stanford education and the Fei-Fei Li PhD, CS231n, OpenAI founding and the World of Bits project, the 2017–2022 Tesla Autopilot tenure, the second OpenAI stint (2023–2024), Eureka Labs, the nanoGPT/minGPT/llm.c/nanochat lineage, the "Zero to Hero" series, the "Software 2.0"/"Software 3.0" essays, and the "vibe coding" coinage through to Collins' 2025 Word of the Year.

## Known gaps

- Departure terms: neither the Tesla (2022) nor the second OpenAI (2024) exit has a publicly stated cause; the packet preserves that as open questions rather than inferring one.
- Autopilot attribution: the split between his personal engineering work and the team's collective output is not public — most detail is from his own talks.
- Eureka Labs status: LLM101n remains "under development" with its repo archived; the effect of the 2026 Anthropic role on the company's roadmap is unresolved.
- OpenAI tenure #2: what the midtraining/synthetic-data team shipped is undocumented outside his own bio.
- Birth date is reference-sourced (Wikidata/Wikipedia), not a primary record.
- The `transcriptOf` link is exercised on the Dwarkesh episode (article transcript → YouTube video).

## Regenerate

`person-index.json` is generated: edit `generate.ts` and run `bun generate.ts` from this directory, then validate:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts "$PWD/examples/people/andrej-karpathy/person-index.json"
```

Publish with a signed-in Soulscrape credential:

```sh
bun skills/soulscrape/scripts/publish-person.ts publish "$PWD/examples/people/andrej-karpathy/person-index.json"
```
