import { BLOG_PATH, blogPostPath, indexablePosts } from "../../lib/blog";
import { siteUrl } from "../../lib/site";

export const dynamic = "force-static";

const posts = indexablePosts();
// Only listed posts appear; quarantined posts stay out of llms.txt.
const blogSection = posts.length === 0 ? "" : `
## Blog

- Blog index: ${siteUrl(BLOG_PATH)}
${posts.map(post => `- ${post.title}: ${siteUrl(blogPostPath(post))} (Markdown: ${siteUrl(`${blogPostPath(post)}.md`)})`).join("\n")}
`;

const body = `# soulscrape

> soulscrape is an agent skill that builds a dated, cited model of a person
> from sources you're allowed to use, and publishes it as a public index if you
> choose. Anyone with a free Hraness account can publish. Each index lists its
> sources, keeps contradictions, and can be revised or withdrawn by its
> publisher. An index is partial: it is not the subject's own page and does not
> claim to define the person.

## Reading an index

- Human page: ${siteUrl("/<username>/<handle>")}
- Markdown copy of the essay: ${siteUrl("/<username>/<handle>.md")} or send \`Accept: text/markdown\`. It carries the essay only; claims and sources are in the JSON packet.
- Full packet (sources, claims, timeline, themes, works): \`GET /api/v1/profiles/<username>/<handle>\`
- Corpus enumeration (live profiles, digests, revisions, corpusDigest): \`GET /api/v1/index.json\`. \`?since=<ms>\` returns only profiles updated since the timestamp.
- Relation graph: \`GET /api/v1/graph.json\` (projection \`soulscrape.graph.v3\`). External Wikidata and slug references are publisher-scoped assertions; edge \`origin\` is authored \`relation\`, derived \`timeline\`, or \`appearance\` co-presence. Reset cached topology when the projection version changes. With \`?since=<ms>\`, replace outbound sets for every \`changedSources\` entry; deletions are not included, so full reconciliation remains required. Response timestamps are not durable sync cursors.
- Themes across the corpus (each theme's kind, title, and status, by subject): \`GET /api/v1/themes.json\`
- Open questions each index lists, by subject: \`GET /api/v1/questions.json\`
- Pagination: every corpus endpoint above returns pages. Follow \`pagination.nextCursor\` until \`isDone\` is true; one page is not the whole corpus, and \`corpusDigest\` covers only its page. Index pages hold up to 100 profiles; graph, themes, and questions pages hold up to 25 (10 by default).

## Conventions

- Claims carry superscript numbers that link to the page's Sources list.
- Claim kinds: \`fact\`, \`stated_belief\`, \`pattern\`, \`speculation\`. Theme
  statuses: \`stated\`, \`reported\`, \`inferred\`.
- \`generatedAt\` / "assembled" dates mark when the packet was built; the
  revision number increments on republish.
- Withdrawn profiles return 404.

## Site

- Use cases: ${siteUrl("/use-cases")}
- Documentation index: ${siteUrl("/docs")}
- Quickstart (tutorial): ${siteUrl("/docs/quickstart")}
- Source packets (how-to): ${siteUrl("/docs/prepare-source-packet")}
- Publishing guide (how-to): ${siteUrl("/docs/publish-person-index")}
- Person-index reference: ${siteUrl("/docs/person-index")}
- Evidence model (explanation): ${siteUrl("/docs/evidence-and-boundaries")}
- Comparisons: ${siteUrl("/compare")}
${blogSection}
## Source material

- Person-index schema and validator: https://github.com/hraness/soulscrape
`;

export function GET(): Response {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
