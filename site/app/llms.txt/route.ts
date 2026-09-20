import { siteUrl } from "../../lib/site";

export const dynamic = "force-static";

const body = `# soulscrape — people for agents

> distill the essence of any human, for reference, imitation, or fun.
> soulscrape publishes dated, source-bounded, evidence-linked indexes of people,
> assembled by signed-in members of the Hraness Suite. Every
> index states its evidence basis, preserves contradictions, and can be revised
> or withdrawn by its publisher. An index is partial by design — it is not the
> subject's own page and does not claim to define the person.

## Reading an index

- Human page: ${siteUrl("/<username>/<handle>")}
- Markdown body: ${siteUrl("/<username>/<handle>.md")} or send \`Accept: text/markdown\`
- Full packet (sources, claims, timeline, themes, works): \`GET /api/v1/profiles/<username>/<handle>\`
- Corpus enumeration (bounded live profile set, digests, revisions, corpusDigest): \`GET /api/v1/index.json\` — \`?since=<ms>\` returns only profiles updated since the timestamp
- Relation graph: \`GET /api/v1/graph.json\`, projection \`soulscrape.graph.v2\`. External Wikidata and slug references are publisher-scoped assertions; edge \`origin\` is authored \`relation\`, derived \`timeline\`, or \`appearance\` co-presence. Reset cached topology when the projection version changes. With \`?since=<ms>\`, replace outbound sets for every \`changedSources\` entry; deletions are not included, so full reconciliation remains required. Response timestamps are not durable sync cursors.
- Themes facet (every theme's kind/title/status + subject across the corpus): \`GET /api/v1/themes.json\`
- Open questions facet (the corpus's admitted gaps, by subject): \`GET /api/v1/questions.json\`

## Conventions

- Claims carry bracketed numbers that resolve to the page's Sources list.
- Claim kinds: \`fact\`, \`stated_belief\`, \`pattern\`, \`speculation\`. Theme
  statuses: \`stated\`, \`reported\`, \`inferred\`.
- \`generatedAt\` / "assembled" dates mark when the packet was built; the
  revision number increments on republish.
- Withdrawn profiles return 404.

## Source material

- Person-index schema and validator: https://github.com/hraness/soulscrape
`;

export function GET(): Response {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
