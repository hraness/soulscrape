import { exampleImage } from "../lib/example-images";
import { timelineEventId, timelineTopics } from "../lib/dossier-view";
import { renderMarkdown } from "../lib/markdown";
import { createProfileResolver, type ProfileResolver } from "../lib/profile-identity";
import {
  profileCanonicalUrl,
  sortedAppearances,
  sortedTimeline,
  sourceLabel,
  sourcesById,
  type StoredProfile,
} from "../lib/profile-view";

function SourceRefs({ ids, byId, numbers }: {
  ids: readonly string[];
  byId: Map<string, { url: string; title: string }>;
  numbers: Map<string, number>;
}) {
  return (
    <span className="source-refs">
      {ids.map(id => {
        const number = numbers.get(id);
        const source = byId.get(id);
        if (number === undefined) return null;
        return (
          <a key={id} href={`#source-${number}`} title={source === undefined ? undefined : source.title}>
            [{number}]
          </a>
        );
      })}
    </span>
  );
}

/** The profile header: kicker, name, summary, and the publisher-not-attribution notice. */
export function PersonProfileHeader({
  profile,
  nameAs = "h1",
}: {
  profile: StoredProfile;
  /** Use "strong" inside previews and mockups so the embedding page keeps one h1. */
  nameAs?: "h1" | "strong";
}) {
  const { packet } = profile;
  const { subject } = packet;
  const Name = nameAs;
  const portrait = exampleImage(profile.username, profile.handle);
  const identityLinks = [
    ...(subject.identity?.officialSite ? [{ url: subject.identity.officialSite, label: "Website" }] : []),
    ...(subject.identity?.profiles ?? []).map(url => ({
      url,
      label: new URL(url).hostname.replace(/^www\./u, "") + new URL(url).pathname.replace(/\/$/u, ""),
    })),
    ...(subject.identity?.wikipedia ? [{ url: subject.identity.wikipedia, label: "Wikipedia" }] : []),
  ].filter((link, index, all) => all.findIndex(candidate => new URL(candidate.url).href === new URL(link.url).href) === index);
  return (
    <header className="person-header">
      <nav className="person-nav" aria-label="Site">
        <a href="/">soulscrape</a>
        <a href="/examples">Examples</a>
        <a href={`/${profile.username}`}>@{profile.username}</a>
      </nav>
      <p className="person-kicker">
        {portrait ? "Example profile" : "Evidence profile"} · assembled {packet.generatedAt.slice(0, 10)} · revision {profile.revision}
      </p>
      {portrait?.status === "available" && (
        <div className="person-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element -- local, source-bound profile image */}
          <img src={portrait.src} alt={subject.displayName} width={176} height={176} decoding="async" />
          <a className="person-portrait-credit" href="/portraits/credits.html">Image credit</a>
        </div>
      )}
      <Name className="person-name">{subject.displayName}</Name>
      <p className="person-summary">{subject.summary}</p>
      {subject.alsoKnownAs !== undefined && subject.alsoKnownAs.length > 0 && (
        <p className="person-aka">Also known as {subject.alsoKnownAs.join(", ")}</p>
      )}
      {identityLinks.length > 0 && (
        <nav className="person-identity-links" aria-label={`${subject.displayName} on the web`}>
          {identityLinks.map(link => <a key={link.url} href={link.url}>{link.label}</a>)}
        </nav>
      )}
      <p className="person-notice">
        This index is partial, source-bounded, dated, and revisable. It is published by{" "}
        <a href={`/${profile.username}`}>@{profile.username}</a>, not by the subject. Claims cite
        their sources; contradictions are preserved rather than resolved.
      </p>
    </header>
  );
}

/** The rendered packet body — the synthesized essay, through the bounded renderer. */
export function PersonProfileArticle({ packet }: { packet: StoredProfile["packet"] }) {
  return <article className="person-body readme-prose">{renderMarkdown(packet.body)}</article>;
}

/** An edge asserted about this profile's subject by another live index. */
export type InboundRelation = Readonly<{
  recordId?: string;
  handle: string;
  displayName: string;
  kind: string;
  note?: string;
  start?: string;
  end?: string;
  /** Derived-edge marker: org-bound timeline events, or appearance co-presence. */
  via?: "timeline" | "appearance";
}>;

/** The profile body: markdown essay plus the evidence sections. */
export function PersonProfileMain({
  profile,
  resolveProfile = createProfileResolver([]),
  inbound = [],
}: {
  profile: StoredProfile;
  /** Indexed live identity context; unambiguous targets link, others render as names. */
  resolveProfile?: ProfileResolver;
  /** Edges in the publisher's other indexes that target this handle. */
  inbound?: readonly InboundRelation[];
}) {
  const { packet } = profile;
  const byId = sourcesById(packet);
  const numbers = new Map(packet.sources.map((source, index) => [source.id, index + 1]));
  const topics = timelineTopics(packet);

  return (
    <main className="person-main" id="main" tabIndex={-1}>
      <nav aria-label="Dossier sections">
        <details>
          <summary>Browse this dossier</summary>
          <ul>
            {topics.length > 0 && (
              <>
                <li><a href="#timeline-topics-heading">Timeline by topic</a></li>
                <li><a href="#timeline-heading">Chronological timeline</a></li>
              </>
            )}
            {packet.themes !== undefined && packet.themes.length > 0 && (
              <li><a href="#themes-heading">Themes</a></li>
            )}
            {packet.works !== undefined && packet.works.length > 0 && (
              <li><a href="#works-heading">Works and projects</a></li>
            )}
            {packet.appearances !== undefined && packet.appearances.length > 0 && (
              <li><a href="#appearances-heading">Appearances</a></li>
            )}
            {packet.relations !== undefined && packet.relations.length > 0 && (
              <li><a href="#relations-heading">Relations</a></li>
            )}
            {inbound.length > 0 && <li><a href="#inbound-heading">Indexed in</a></li>}
            <li><a href="#claims-heading">Claims</a></li>
            <li><a href="#sources-heading">Sources</a></li>
            <li><a href="#coverage-heading">Coverage and method</a></li>
            {packet.openQuestions !== undefined && packet.openQuestions.length > 0 && (
              <li><a href="#open-questions-heading">Open questions</a></li>
            )}
          </ul>
        </details>
      </nav>

      <PersonProfileArticle packet={packet} />

      {topics.length > 0 && (
        <section aria-labelledby="timeline-topics-heading">
          <h2 id="timeline-topics-heading">Timeline by topic</h2>
          <p>
            Topics follow the event kinds supplied in this index. Each entry links to its full record
            in the <a href="#timeline-heading">chronological timeline</a>. Dates retain the precision
            supplied by the publisher.
          </p>
          {topics.map(topic => (
            <details key={topic.id}>
              <summary>{topic.label} ({topic.events.length})</summary>
              <ol className="timeline">
                {topic.events.map(event => (
                  <li key={event.id}>
                    <time dateTime={event.date}>
                      {event.date}
                      {event.end !== undefined ? ` – ${event.end}` : ""}
                    </time>
                    <a href={`#${timelineEventId(event)}`}>{event.title}</a>
                    <span className="event-kind">{event.kind}</span>
                    <SourceRefs ids={event.sourceIds} byId={byId} numbers={numbers} />
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </section>
      )}

      {packet.timeline !== undefined && packet.timeline.length > 0 && (
        <section aria-labelledby="timeline-heading">
          <h2 id="timeline-heading">Timeline</h2>
          <ol className="timeline">
            {sortedTimeline(packet).map(event => {
              const target = event.organizationHandle === undefined ? null : resolveProfile(profile.username, {
                target: event.organizationHandle,
                targetKind: "organization",
              });
              return (
              <li key={event.id} id={timelineEventId(event)} tabIndex={-1}>
                <time dateTime={event.date}>
                  {event.date}
                  {event.end !== undefined ? ` – ${event.end}` : ""}
                </time>
                <strong>{event.title}</strong>
                <span className="event-kind">{event.kind}</span>
                {event.organization !== undefined && (
                  target !== null
                    ? (
                      <a href={`/${target.profile.username}/${target.profile.handle}`}>
                        <span className="event-org">{event.organization}</span>
                      </a>
                    )
                    : <span className="event-org">{event.organization}</span>
                )}
                {event.location !== undefined && <span className="event-loc">{event.location}</span>}
                {event.summary !== undefined && <p>{event.summary}</p>}
                <SourceRefs ids={event.sourceIds} byId={byId} numbers={numbers} />
              </li>
              );
            })}
          </ol>
        </section>
      )}

      {packet.themes !== undefined && packet.themes.length > 0 && (
        <section aria-labelledby="themes-heading">
          <h2 id="themes-heading">Themes</h2>
          <ul className="themes">
            {packet.themes.map(theme => (
              <li key={theme.id}>
                <strong>{theme.title}</strong>
                <span className={`theme-status theme-${theme.status}`}>{theme.status}</span>
                <span className="event-kind">{theme.kind}</span>
                <p>{theme.summary}</p>
                <SourceRefs ids={theme.sourceIds} byId={byId} numbers={numbers} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {packet.works !== undefined && packet.works.length > 0 && (
        <section aria-labelledby="works-heading">
          <h2 id="works-heading">Works and projects</h2>
          <ul className="works">
            {packet.works.map(work => (
              <li key={work.id}>
                <strong>{work.title}</strong>
                <span className="event-kind">{work.kind}</span>
                <span className="theme-status">{work.status}</span>
                {work.date !== undefined && <time dateTime={work.date}>{work.date}</time>}
                {work.location !== undefined && <span className="event-loc">{work.location}</span>}
                {work.summary !== undefined && <p>{work.summary}</p>}
                <SourceRefs ids={work.sourceIds} byId={byId} numbers={numbers} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {packet.appearances !== undefined && packet.appearances.length > 0 && (
        <section aria-labelledby="appearances-heading">
          <h2 id="appearances-heading">Appearances</h2>
          <ul className="appearances">
            {sortedAppearances(packet).map(appearance => {
              const others = (appearance.participants ?? []).filter(name => {
                const bound = appearance.participantHandles?.find(b => b.name === name);
                return bound === undefined ? name !== packet.subject.displayName : bound.handle !== packet.subject.handle;
              });
              return (
              <li key={appearance.id}>
                <strong>{appearance.title}</strong>
                {appearance.venue !== undefined && <span className="event-org">{appearance.venue}</span>}
                {appearance.publishedAt !== undefined && (
                  <time dateTime={appearance.publishedAt}>{appearance.publishedAt.slice(0, 10)}</time>
                )}
                {others.length > 0 && (
                  <p className="participants">
                    with {others.map((name, index) => {
                      const bound = appearance.participantHandles?.find(b => b.name === name);
                      const target = bound === undefined ? null : resolveProfile(profile.username, { target: bound.handle });
                      return (
                        <span key={name}>
                          {index > 0 ? ", " : ""}
                          {target !== null
                            ? <a href={`/${target.profile.username}/${target.profile.handle}`}>{name}</a>
                            : name}
                        </span>
                      );
                    })}
                  </p>
                )}
                {appearance.summary !== undefined && <p>{appearance.summary}</p>}
                {appearance.media !== undefined && appearance.media.length > 0 && (
                  <ul className="media-links">
                    {appearance.media.map((media, mediaIndex) => (
                      <li key={mediaIndex}>
                        <a href={media.url} rel="noopener ugc">{media.type}: {media.url}</a>
                      </li>
                    ))}
                  </ul>
                )}
                <SourceRefs ids={appearance.sourceIds} byId={byId} numbers={numbers} />
              </li>
              );
            })}
          </ul>
        </section>
      )}

      {packet.relations !== undefined && packet.relations.length > 0 && (
        <section aria-labelledby="relations-heading">
          <h2 id="relations-heading">Relations</h2>
          <ul className="relations">
            {packet.relations.map(relation => {
              const target = resolveProfile(profile.username, relation);
              return (
              <li key={relation.id}>
                {target !== null
                  ? (
                    <a href={`/${target.profile.username}/${target.profile.handle}`}>
                      <strong>{relation.targetName}</strong>
                    </a>
                  )
                  : <strong>{relation.targetName}</strong>}
                <span className="event-kind">{relation.kind.replaceAll("_", " ")}</span>
                {(relation.start !== undefined || relation.end !== undefined) && (
                  <time dateTime={relation.start ?? relation.end}>
                    {relation.start ?? "…"}{relation.end !== undefined ? ` – ${relation.end}` : " – "}
                  </time>
                )}
                {relation.note !== undefined && <p>{relation.note}</p>}
                <SourceRefs ids={relation.sourceIds} byId={byId} numbers={numbers} />
              </li>
              );
            })}
          </ul>
        </section>
      )}

      {inbound.length > 0 && (
        <section aria-labelledby="inbound-heading">
          <h2 id="inbound-heading">Indexed in</h2>
          <ul className="relations">
            {inbound.map((relation, index) => (
              <li key={JSON.stringify([relation.handle, relation.via ?? "relation", relation.recordId ?? index])}>
                <a href={`/${profile.username}/${relation.handle}`}>
                  <strong>{relation.displayName}</strong>
                </a>
                <span className="event-kind">
                  {relation.kind.replaceAll("_", " ")}
                  {relation.via === "timeline" ? " · event" : ""}
                  {relation.via === "appearance" ? " · appearance" : ""}
                </span>
                {(relation.start !== undefined || relation.end !== undefined) && (
                  <time dateTime={relation.start ?? relation.end}>
                    {relation.start ?? "…"}{relation.end !== undefined ? ` – ${relation.end}` : " – "}
                  </time>
                )}
                {relation.note !== undefined && <p>{relation.note}</p>}
                <p className="inbound-source">
                  cited by <a href={`/${profile.username}/${relation.handle}`}>the {relation.displayName} index</a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="claims-heading">
        <h2 id="claims-heading">Claims</h2>
        <ul className="claims">
          {packet.claims.map(claim => (
            <li key={claim.id}>
              <span className={`claim-kind claim-${claim.kind}`}>{claim.kind.replace("_", " ")}</span>
              {claim.text}
              <SourceRefs ids={claim.sourceIds} byId={byId} numbers={numbers} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sources-heading">
        <h2 id="sources-heading">Sources</h2>
        <ol className="sources">
          {packet.sources.map((source, index) => (
            <li key={source.id} id={`source-${index + 1}`}>
              <a href={source.url} rel="noopener ugc">{source.title}</a>
              <span className="source-meta">
                {sourceLabel(source)} · {source.binding.replaceAll("_", " ")} · {source.mediaType}
                {" · accessed "}{source.accessedAt}
              </span>
              {source.notes !== undefined && <p>{source.notes}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="coverage-heading">
        <h2 id="coverage-heading">Coverage and method</h2>
        <dl>
          <dt>Scope as of</dt>
          <dd><time dateTime={packet.scope.asOf}>{packet.scope.asOf}</time></dd>
          <dt>Coverage supplied by the publisher</dt>
          <dd>
            {packet.scope.coverage !== undefined && packet.scope.coverage.length > 0
              ? <ul>{packet.scope.coverage.map((item, index) => <li key={index}>{item}</li>)}</ul>
              : "Not specified."}
          </dd>
          <dt>Method</dt>
          <dd>{packet.provenance.method ?? "Not specified."}</dd>
          <dt>Tool</dt>
          <dd>{packet.provenance.tool}</dd>
          {packet.provenance.model !== undefined && (
            <>
              <dt>Model</dt>
              <dd>{packet.provenance.model}</dd>
            </>
          )}
          {packet.provenance.contributors !== undefined && packet.provenance.contributors.length > 0 && (
            <>
              <dt>Contributors</dt>
              <dd>
                <ul>{packet.provenance.contributors.map((name, index) => <li key={index}>{name}</li>)}</ul>
              </dd>
            </>
          )}
          <dt>Assembled</dt>
          <dd><time dateTime={packet.generatedAt}>{packet.generatedAt}</time></dd>
          <dt>Human review</dt>
          <dd>No review status or review date is supplied. An assembly timestamp does not establish human review.</dd>
          <dt>Open questions</dt>
          <dd>
            {packet.openQuestions !== undefined && packet.openQuestions.length > 0
              ? <a href="#open-questions-heading">See the supplied open questions</a>
              : "None supplied; this does not establish that there are no gaps."}
          </dd>
        </dl>
      </section>

      {packet.openQuestions !== undefined && packet.openQuestions.length > 0 && (
        <section aria-labelledby="open-questions-heading">
          <h2 id="open-questions-heading">Open questions</h2>
          <ul>
            {packet.openQuestions.map((question, index) => <li key={index}>{question}</li>)}
          </ul>
        </section>
      )}
    </main>
  );
}

/**
 * The profile colophon: index id, digest, publisher, and format links. It is
 * page content, not a landmark; the shared Hraness footer in the root layout
 * is the document's only footer element.
 */
export function PersonProfileFooter({ profile }: { profile: StoredProfile }) {
  const { packet } = profile;
  const canonical = profileCanonicalUrl(profile.username, profile.handle);
  return (
    <div className="site-footer person-footer">
      <p>
        Index <code>{packet.indexId}</code> · digest{" "}
        <code>{profile.packetDigest.slice(0, 16)}…</code> · published by{" "}
        <a href={`/${profile.username}`}>{`@${profile.username}`}</a> ·{" "}
        <a href={`${canonical}.md`}>Markdown</a> ·{" "}
        <a href="https://github.com/hraness/soulscrape/issues">Report an issue</a>
      </p>
    </div>
  );
}
