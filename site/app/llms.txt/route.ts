import { siteUrl } from "../../lib/site";

export const dynamic = "force-static";

const body = `# soulscrape — people for agents

> distill the essence of any human, for reference, imitation, or fun.
> soulscrape publishes dated, source-bounded, evidence-linked indexes of people
> and organizations, assembled by signed-in members of the Hraness Suite. Every
> index states its evidence basis, preserves contradictions, and can be revised
> or withdrawn by its publisher. An index is partial by design — it is not the
> subject's own page and does not claim to define the person.

## Reading an index

- Human page: ${siteUrl("/<username>/<handle>")}
- Markdown body: ${siteUrl("/<username>/<handle>.md")} or send \`Accept: text/markdown\`
- Full packet (sources, claims, timeline, themes, works): \`GET /api/v1/profiles/<username>/<handle>\`
- Corpus enumeration (every live profile, digests, revisions): \`GET /api/v1/index.json\`
- Relation graph (nodes + edges; external entities keyed by Wikidata id or slug): \`GET /api/v1/graph.json\`

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
