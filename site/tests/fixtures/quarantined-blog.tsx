import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { blogPosts, blogPostPath, indexablePosts } from "../../lib/blog";

// Change only this child process's in-memory registry, before importing routes
// that capture it at module initialization. No source or published record changes.
for (const post of blogPosts) Object.assign(post.admission, { lifecycle: "quarantined" });
assert.ok(blogPosts.length > 0, "the fixture needs at least one real post");
assert.deepEqual(indexablePosts(), []);

const { default: BlogIndexPage, metadata: indexMetadata } = await import("../../app/blog/page");
const { default: BlogPostPage, generateMetadata, generateStaticParams } = await import("../../app/blog/[slug]/page");
const { GET: markdownTwin } = await import("../../app/blog/[slug]/markdown/route");
const { GET: llms } = await import("../../app/llms.txt/route");
const { SiteHeader } = await import("../../components/site-header");
const { blogAtomFeed, blogSitemapEntries } = await import("../../lib/blog-feed");

const index = renderToStaticMarkup(<BlogIndexPage />);
const llmsText = await llms().text();
assert.deepEqual(indexMetadata.robots, { index: false, follow: true });
assert.deepEqual(blogSitemapEntries(), []);
assert.ok(!blogAtomFeed().includes("<entry>"));
assert.ok(!renderToStaticMarkup(<SiteHeader />).includes('href="/blog"'));

for (const post of blogPosts) {
  const path = blogPostPath(post);
  const params = { params: Promise.resolve({ slug: post.slug }) };
  assert.ok(!index.includes(path), `${path} must not be listed`);
  assert.ok(!llmsText.includes(path), `${path} must not appear in llms.txt`);
  assert.ok(generateStaticParams().some(entry => entry.slug === post.slug), "quarantine keeps the page readable");
  const metadata = await generateMetadata(params);
  assert.deepEqual(metadata.robots, { index: false, follow: true });
  assert.equal(metadata.alternates?.canonical, `https://soulscrape.com${path}`);
  const html = renderToStaticMarkup(await BlogPostPage(params));
  assert.ok(html.includes("<h1"), "quarantine does not remove the article");
  assert.ok(!html.includes("data-hraness-social-kit"), "quarantine hides the social kit");
  const response = await markdownTwin(new Request(`https://soulscrape.com${path}.md`), params);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-robots-tag"), "noindex");
  assert.equal(response.headers.get("link"), `<https://soulscrape.com${path}>; rel="canonical"`);
  assert.ok((await response.text()).startsWith(`# ${post.title}\n`));
}
