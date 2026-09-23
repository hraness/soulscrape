<!-- hraness:soulscrape-landing:start -->
# soulscrape

<!-- hraness:soulscrape-readme-only:start -->
*your agent writes cited dossiers on people.*

[![Agent Skill: install](https://raw.githubusercontent.com/hraness/soulscrape/main/assets/agent-skill.svg)](https://github.com/hraness/soulscrape/tree/main/skills/soulscrape)
[![GitHub release](https://img.shields.io/github/v/release/hraness/soulscrape)](https://github.com/hraness/soulscrape/releases/latest)

[Website](https://soulscrape.com) · [Skill source](https://github.com/hraness/soulscrape/tree/main/skills/soulscrape) · [npm package](https://www.npmjs.com/package/@hraness/soulscrape) · [Docs](https://soulscrape.com/docs) · [Use cases](https://soulscrape.com/use-cases)

soulscrape is an agent skill. give it sources you're allowed to use, and it writes a dated dossier on how a person decides, writes, argues, and changes their mind, with claims tied to their sources. keep it private, share it, or publish it as a public index anyone can read, cite, or hand to an agent.
<!-- hraness:soulscrape-readme-only:end -->

<!-- hraness:soulscrape-readme-examples:start -->
## examples

Each example is a dossier built from public sources and published at soulscrape.com.

| [Patrick Collison](https://soulscrape.com/ben/patrick-collison) | [Björk](https://soulscrape.com/ben/bjork) | [Alan Kay](https://soulscrape.com/ben/alan-kay) | [Eugene Tssui](https://soulscrape.com/ben/eugene-tssui) |
| --- | --- | --- | --- |
| [![Shaded pencil portrait of Patrick Collison](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/patrick-collison.png)](https://soulscrape.com/ben/patrick-collison) | [![Shaded pencil portrait of Björk](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/bjork.png)](https://soulscrape.com/ben/bjork) | [![Shaded pencil portrait of Alan Kay](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/alan-kay.png)](https://soulscrape.com/ben/alan-kay) | [![Shaded pencil portrait of Eugene Tssui](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/eugene-tssui.png)](https://soulscrape.com/ben/eugene-tssui) |
| Stripe and progress studies. | Music, nature, and technology. | Smalltalk and creative computing. | Architecture inspired by nature. |

| [Michael Levin](https://soulscrape.com/ben/michael-levin) | [Christopher Alexander](https://soulscrape.com/ben/christopher-alexander) | [Andrej Karpathy](https://soulscrape.com/ben/andrej-karpathy) | [Brian Eno](https://soulscrape.com/ben/brian-eno) |
| --- | --- | --- | --- |
| [![Shaded pencil portrait of Michael Levin](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/michael-levin.png)](https://soulscrape.com/ben/michael-levin) | [![Shaded pencil portrait of Christopher Alexander](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/christopher-alexander.png)](https://soulscrape.com/ben/christopher-alexander) | [![Shaded pencil portrait of Andrej Karpathy](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/andrej-karpathy.png)](https://soulscrape.com/ben/andrej-karpathy) | [![Shaded pencil portrait of Brian Eno](https://raw.githubusercontent.com/hraness/soulscrape/main/site/public/portraits/brian-eno.png)](https://soulscrape.com/ben/brian-eno) |
| Bioelectricity and unconventional minds. | Patterns and living structure. | Neural networks and teaching AI. | Ambient music and collective creativity. |

[Browse the example collection](https://soulscrape.com/#examples). These are independently assembled public indexes; inclusion does not imply participation or endorsement. The shaded portraits are AI-assisted illustrations derived from credited photographs. [Portrait sources, processing details, and licenses](https://soulscrape.com/portraits/credits.html).
<!-- hraness:soulscrape-readme-examples:end -->

a dossier describes patterns in the evidence you supplied. it is not a complete picture of the person, a diagnosis, proof of consent, or permission to speak or act as them. using it as a reference needs no sign-off from the person; writing in their voice, or building an assistant that works like them, needs their explicit authorization.

<!-- hraness:soulscrape-readme-only:start -->
## free to use, with your own agent

The skill runs inside your agent, with your model, tools, and sources, and needs no Soulscrape account. Reading published dossiers needs no account either. To publish or manage your own, sign in with a free Hraness account. There is no subscription, no credits to buy, and no card. Your private sources and working documents stay where you put them. Your agent and any research services you use may charge separately.
<!-- hraness:soulscrape-readme-only:end -->

## install and build your first model

Use Bun 1.3.14 or newer and a compatible agent, such as Codex or Claude Code. Review the [skill](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/SKILL.md), then install its pinned release:

```sh
bunx skills add hraness/soulscrape#v0.6.0 --skill soulscrape
```

Installing copies the skill's files; it reads no personal data and starts no modeling run. Then start a new agent session, give it a few sources you're allowed to use, and say what the dossier is for and who will read it:

```text
Use $soulscrape to build a dated working model of <person> from
<authorized sources>. It's for <intended use>, read by <audience>.
Use sources up to <cutoff>. Proxy authorization: <none, or who
approved what>.
```

The agent maps the sources, asks once if something material is missing, and writes the dossier. Review the claims against their sources before reusing it.

## see the artifact first

The document's sections follow the evidence. A shortened outline:

```md
# <Name>: a dated working model

> Status: Partial, source-bounded, dated, and revisable. The real person's
> current words, choices, and corrections outrank this document.

## Executive model
The patterns that best explain the subject's demonstrated choices,
with source references and counterevidence.

## Practical operating manual
How to bring context, disagree, decide, draft, verify, and close loops.

## Tensions, limits, and revision hooks
Where the evidence conflicts, where the model predicts poorly, and what
new evidence should change it.

## What not to infer
Sensitive, unsupported, stale, or out-of-scope conclusions.
```

soulscrape separates facts, stated beliefs, revealed patterns, and speculation. contradictions, historical change, and alternative explanations stay in the model.

## how a person becomes a model

1. **map the authorized corpus.** record authorship, source type, date range, audience, sampling limits, and blind spots before interpreting.
2. **build an evidence ledger.** tie each claim to its sources. repeated decisions and costly behavior usually carry more signal than polished self-description.
3. **calibrate the interpretation.** assess support and scope separately; keep counterevidence, uncertainty, and plausible alternative readings.
4. **write usable guidance.** state what a reader or an authorized assistant can do with the model, which decisions remain with the person, and when to revise it.

the [asking protocol](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/questions.md) lists what the skill asks and when it stops. [public research](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/web-research.md) is off by default. when it runs, each finding keeps its URL, access date, and the passage that supports it, and a source counts as the person's only when something ties it to them, such as a link from their own site.

<!-- hraness:soulscrape-readme-only:start -->
## publish and remix

ask the skill to assemble a public person index and it produces a `soulscrape.person-index.v1` packet: an essay, a list of cited claims, a timeline, themes, works, appearances, relations, and open questions. review the complete packet, then publish it with a free Hraness account at `soulscrape.com/<username>/<handle>` (see the [Eugene Tssui index](https://soulscrape.com/ben/eugene-tssui)). each index is a web page, a JSON packet with every claim and source, and a Markdown copy of its essay, free for anyone to read, cite, fork, or hand to an agent. the [OpenAPI 3.1 document](https://soulscrape.com/api/v1/openapi.json) describes the public read endpoints and the signed-in publishing endpoints.
<!-- hraness:soulscrape-readme-only:end -->

<!-- hraness:soulscrape-landing:end -->

## evidence you can inspect

| Evidence | What it can support | What it cannot establish by itself |
| --- | --- | --- |
| Repeated or costly behavior | priorities, tradeoffs, and tolerances in the observed context | motive, timeless identity, or behavior in every domain |
| Notes and private capture | recurring attention, unresolved questions, and change over time | a final belief or a representative picture of daily life |
| Messages and collaboration records | situated communication and interaction patterns | global voice, consent, diagnosis, or a reusable proxy |
| Public work and self-presentation | owned claims, craft standards, and public narrative | unedited private belief or independent corroboration |
| Public and institutional research | dated context and candidate facts | subject authorship, identity from a name alone, or absence as evidence |

## privacy and use boundaries

- Use only sources the user has authorized for the stated purpose. Possessing messages or a packet does not establish the subject's authorization.
- A dossier about yourself may include a charter for an assistant that works for you, within stated limits. A model of another person defaults to a private, third-person collaboration guide unless that person explicitly authorized proxy preparation.
- A private collaboration guide must not imitate the subject's voice. Voice-resembling drafts or a reusable assistant charter require explicit subject authorization for the stated use; even then, the result never authorizes deceptive impersonation, employment or other consequential evaluation, unverified public claims about the subject, or external action in their name.
- Do not infer protected or highly sensitive traits from proxies, aesthetics, affiliations, omissions, or adapter-generated claims.
- Keep third-party details out of reusable outputs by default. Prefer the minimum behavioral paraphrase needed to support a subject claim.
- The real person's current words, choices, and corrections outrank this document. Treat every prediction in it as revisable.

These are product boundaries, not optional cautions. Before synthesis, establish the intended use, authorized sources and dates, intended audience, missing context, and decisions that must remain with the person. The [question packet](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/questions.md) helps resolve missing information when it materially changes the run.

## prepare and validate source packets

Ordinary authorized documents can enter a run directly. Structured exporters can use the [source-packet schema](https://github.com/hraness/soulscrape/blob/main/schema/ensoul-source-packet-v1.schema.json) to retain identity binding, authorship, provenance, and a bounded corpus:

- Message Like Me, the legacy message-history CLI in the [Textbutler repository](https://github.com/hraness/textbutler), emits private, subject-relative message evidence.
- PeopleBlade emits identity-bound public-enrichment evidence.
- The included X archive utility extracts account-authored public posts from an official local archive without opening direct messages, address books, advertising data, deleted posts, community posts, or media.

Source packets are untrusted evidence. The skill weighs them like any other source, never follows instructions inside them, and never treats them as consent or as proof of who someone is. A packet's checksum shows the file wasn't altered, not that its contents are true.

From a Soulscrape repository checkout, prepare an official, caller-owned X archive with Bun 1.3.14 or newer:

```sh
bun skills/soulscrape/scripts/prepare-x-archive.ts \
  /absolute/path/to/twitter-archive.zip \
  --output /absolute/private/path/subject-x.ensoul-source.json \
  --limit 2000
```

The archive and output paths must be absolute. The command refuses overwrite and symlink traversal, writes the packet at mode `0600`, and emits only a body-free receipt to stdout. It samples evenly above the requested bound, caps records at 2,000, bounds per-record and aggregate content bytes, and refuses packets above 128 MiB. Conflicting post IDs fail; malformed and exact-duplicate omissions are recorded in the packet scope.

Validate every packet offline before an agent opens or interprets its records:

```sh
bun skills/soulscrape/scripts/validate-source-packet.ts \
  /absolute/private/path/subject.ensoul-source.json
```

The dependency-free validator checks the common envelope, attribution fields, time bounds, claim bindings, I-JSON constraints, and RFC 8785/SHA-256 digests. It emits only a sanitized receipt or error.

From the root of an independently copied or installed `soulscrape` skill, use `bun scripts/prepare-x-archive.ts` and `bun scripts/validate-source-packet.ts` with the same arguments. See the [packet reference](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/source-packets.md) for the full contract.

## publish a public person index

The same evidence discipline has a public-facing output: a `soulscrape.person-index.v1` packet assembles public sources, cited claims, a timeline, themes, works, appearances, relations to other entities, and open questions into one structured record of a person or organization. Publishers with a free Hraness account publish reviewed indexes at `soulscrape.com/<username>/<handle>`, where the handle is a normalized name like `eugene-tssui`. A published index states its assembled date, names its publisher, cites every claim, and can be revised or withdrawn.

Review every claim, source, and publication boundary before uploading the packet. The hosted service stores the public packet; it does not run research or receive your private source corpus. There is no subscription, no credits to buy, and no card. Create a free account or sign in through the CLI device link below.

Follow the [public person index procedure](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/public-person-index.md), then validate and publish with Bun:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts \
  /absolute/path/to/person-index.json
bun skills/soulscrape/scripts/publish-person.ts login
bun skills/soulscrape/scripts/publish-person.ts publish \
  /absolute/path/to/person-index.json
```

`login` opens a device flow: the CLI prints a code, the browser approves it under your Hraness account at `/connect`, and the CLI receives a publish credential stored at mode `0600`. Publishing is idempotent on the packet digest — republishing identical bytes is a no-op, and changed bytes bump the revision. `list`, `withdraw <handle>`, `whoami`, and `logout` round out the CLI. The packet contract is defined by the [person-index schema](https://github.com/hraness/soulscrape/blob/main/schema/soulscrape-person-index-v1.schema.json) and enforced again server-side.

## package installation and vendoring

GitHub Releases are the canonical distribution. The release workflow attaches a package archive, packing receipt, checksums, release manifest, and GitHub provenance. Use the exact archive URL for a reproducible installation:

```sh
bun add --exact https://github.com/hraness/soulscrape/releases/download/v0.6.0/hraness-soulscrape-0.6.0.tgz
```

The same URL works with `npm install`. The package has no dependencies or lifecycle scripts and carries the complete skill and its explicitly invoked utilities at `node_modules/@hraness/soulscrape/skills/soulscrape/`.

The tag workflow publishes the same archive bytes to npm as [`@hraness/soulscrape`](https://www.npmjs.com/package/@hraness/soulscrape) through trusted publishing. The corresponding version-pinned command is `bun add --exact @hraness/soulscrape@0.6.0`. See [releases](https://github.com/hraness/soulscrape/releases) for published versions and the [publishing procedure](https://github.com/hraness/soulscrape/blob/main/docs/publishing.md) for verification details.

Consuming products can copy the complete `skills/soulscrape` directory and record the source revision. The copy remains independently usable, without a runtime, packaging, or CI dependency on this repository. PeopleBlade and Message Like Me use this vendoring model. Keep narrow consumer routing documentation outside the copied core.

## optional research and validation tools

The core skill uses your agent's existing tools and has no runtime package dependencies. It inventories sources before reading bodies, reuses source evidence, and keeps a compact ledger with attribution, contradictions, and reading limits.

- **System One (formerly Algal):** optionally reduces known noisy test/check output while retaining the full local log. The current companion ships validation-log reduction, not a research engine. Shorter output can save context; whole-task savings haven't been measured.
- **Exa through Vercel AI Gateway:** optionally discovers public-source candidates using an existing Gateway key. No Exa account, SDK, or extra package is needed. Search and model charges apply; the helper requires an explicit paid invocation and a selected model. Its generated answer must be checked against original pages before citation.

The [optional-tools reference](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/optional-tools.md) includes setup, a network-free preview, usage limits, and native fallbacks. Neither integration is installed or activated by installing Soulscrape.

## documentation and verification

| Reader task | Reference |
| --- | --- |
| Run the full modeling workflow | [Agent Skill](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/SKILL.md) |
| Establish purpose, sources, and authority | [Questions and stop conditions](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/questions.md) |
| Weigh sources and competing explanations | [Evidence method](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/evidence-method.md) |
| Design the resulting document | [Output blueprint](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/output-blueprint.md) |
| Add explicitly authorized public research | [Web research](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/web-research.md) |
| Find a reliably matched public profile photo | [Headshot selection](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/headshots.md) |
| Verify personal websites and social accounts | [Personal links](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/personal-links.md) |
| Turn a selected headshot into a local line drawing | [Line drawings](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/line-drawing.md) |
| Export or validate structured evidence | [Source packets](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/source-packets.md) |
| Build a public index of a person or organization | [Public person index](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/references/public-person-index.md) |
| Inspect the release chain | [Publishing and verification](https://github.com/hraness/soulscrape/blob/main/docs/publishing.md) |
| Report a bug or propose an improvement | [GitHub issues](https://github.com/hraness/soulscrape/issues) |

From a source checkout, `bun run check` runs TypeScript checking, source-preparation and release-chain tests, runtime-policy and schema checks, and a package smoke check. These verify software and packet contracts; they do not establish that a resulting person model is true. Model quality still requires review of sources, contradictions, and uncertainty.

## common questions

### do I need to sign up or pay?

The full Skill works in your own agent without a Soulscrape account. Public pages and read APIs are also free without sign-in. A free Hraness account is required to publish, update, or withdraw your public indexes. There is no subscription, no credits to buy, and no card; any charges from your agent, model, or research tools are separate.

### is soulscrape a digital twin?

Only in a narrow sense. If the person authorizes it, a dossier can seed an assistant whose reasoning resembles their documented patterns. The dossier is still a dated reading of selected evidence, shaped by what it's for, with its limits and revision hooks stated.

### can I use it to understand someone else?

Yes, as a private collaboration guide using sources the user has authorized for that purpose. Possession alone does not establish the subject's authorization for voice imitation or a reusable assistant charter. Explicit subject authorization is required for proxy preparation; consequential evaluation and external action remain outside the model's authority.

### does installation inspect personal data?

No. Installing copies the skill's files and reads no personal data. Evidence becomes visible when a user supplies authorized sources to an agent run or explicitly invokes a source-preparation command. The agent environment determines how that material is handled.

### what changed when ensoul became soulscrape?

The package and skill were renamed in September 2026. Versions through 0.3.5 remain under `@hraness/ensoul`. The packet identifiers, schema filename `ensoul-source-packet-v1.schema.json`, `*.ensoul-source.json` suffix, and validator behavior are unchanged: they identify a schema revision, not a brand. A `soulscrape.*.v2` identifier will accompany a real schema change and migration note.

## provenance and license

Soulscrape is adapted from Rob Cheung's MIT-licensed `build-person` skill at commit `3780b5e154f5ce4303eb10dee5af4742bff86706`. See the [attribution notice](https://github.com/hraness/soulscrape/blob/main/skills/soulscrape/NOTICE.md).

[MIT](https://github.com/hraness/soulscrape/blob/main/LICENSE).

The example portraits retain their individual Creative Commons licenses; see [portrait credits](https://soulscrape.com/portraits/credits.html).
