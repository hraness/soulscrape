# Example person indexes

Reference `soulscrape.person-index.v1` packets built by the public-index
workflow in `skills/soulscrape/references/public-person-index.md`. Each
directory carries a `generate.ts` that derives stable source ids and emits the
packet, the generated `person-index.json`, and a short README.

| Index | Live page |
| --- | --- |
| [eugene-tssui](./eugene-tssui/) | https://soulscrape.com/ben/eugene-tssui |
| [patrick-collison](./patrick-collison/) | https://soulscrape.com/ben/patrick-collison |
| [christopher-alexander](./christopher-alexander/) | https://soulscrape.com/ben/christopher-alexander |
| [michael-levin](./michael-levin/) | https://soulscrape.com/ben/michael-levin |
| [joscha-bach](./joscha-bach/) | https://soulscrape.com/ben/joscha-bach |
| [stephen-wolfram](./stephen-wolfram/) | https://soulscrape.com/ben/stephen-wolfram |
| [terry-davis](./terry-davis/) | https://soulscrape.com/ben/terry-davis |

Every packet is public-only research: each claim cites sources, beliefs and
patterns stay separate from facts, and `openQuestions` records what the public
record does not settle. Validate any packet with:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts \
  examples/people/<handle>/person-index.json
```
