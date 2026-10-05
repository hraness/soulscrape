# example organization indexes

reference `soulscrape.person-index.v1` packets with `subject.kind: "organization"`,
built by the public-index workflow in `skills/soulscrape/references/public-person-index.md`.
Person packets live in `examples/people/`; product packets live in `examples/products/`.

| Index | Live page |
| --- | --- |
| [37signals](./37signals/) | https://soulscrape.com/ben/37signals |
| [andon labs](./andon-labs/) | https://soulscrape.com/ben/andon-labs |
| [antithesis](./antithesis/) | https://soulscrape.com/ben/antithesis |
| [cognition](./cognition/) | https://soulscrape.com/ben/cognition |
| [convergent research](./convergent-research/) | https://soulscrape.com/ben/convergent-research |
| [core automation](./core-automation/) | https://soulscrape.com/ben/core-automation |
| [deepseek](./deepseek/) | https://soulscrape.com/ben/deepseek |
| [every](./every/) | https://soulscrape.com/ben/every |
| [gumroad](./gumroad/) | https://soulscrape.com/ben/gumroad |
| [Hyperdub](./hyperdub/) | https://soulscrape.com/ben/hyperdub |
| [ink & switch](./ink-and-switch/) | https://soulscrape.com/ben/ink-and-switch |
| [The Long Now Foundation](./long-now-foundation/) | https://soulscrape.com/ben/long-now-foundation |
| [midjourney](./midjourney/) | https://soulscrape.com/ben/midjourney |
| [morph](./morph/) | https://soulscrape.com/ben/morph |
| [moving castles](./moving-castles/) | https://soulscrape.com/ben/moving-castles |
| [Oxide Computer Company](./oxide-computer/) | https://soulscrape.com/ben/oxide-computer |
| [Roam Research](./roam-research/) | https://soulscrape.com/ben/roam-research |
| [typesafe](./typesafe/) | https://soulscrape.com/ben/typesafe |

Five of these directories (37signals, hyperdub, long-now-foundation,
oxide-computer, roam-research) carry an authored `generate.ts` and were built
in-repo. The rest are published snapshots of the Hraness reference dossiers
migrated on 2026-10-05; see each directory's README.

Validate any packet with:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts   examples/organizations/<handle>/person-index.json
```
