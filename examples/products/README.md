# example product indexes

reference `soulscrape.person-index.v1` packets with `subject.kind: "product"`.
These are published snapshots of the Hraness reference dossiers migrated on
2026-10-05; see each directory's README for provenance. Person packets live in
`examples/people/`; organization packets live in `examples/organizations/`.

| Index | Live page |
| --- | --- |
| [obsidian](./obsidian/) | https://soulscrape.com/ben/obsidian |
| [roam research](./roam-research-product/) | https://soulscrape.com/ben/roam-research-product |
| [tldraw](./tldraw/) | https://soulscrape.com/ben/tldraw |
| [zed](./zed/) | https://soulscrape.com/ben/zed |

Validate any packet with:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts   examples/products/<handle>/person-index.json
```
