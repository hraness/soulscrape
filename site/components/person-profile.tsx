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
  byId: ReturnType<typeof sourcesById>;
  numbers: Map<string, number>;
}) {
  return (
    <span className="source-refs">
      {ids.map(id => {
        const number = numbers.get(id);
        const source = byId.get(id);
        if (number === undefined) return null;
        return (
          <sup className="source-ref" key={id}>
            <a href={`#source-${number}`} title={source === undefined ? undefined : source.title}>
              {number}
            </a>
            {source === undefined ? null : (
              <span className="source-pop" role="note">
                <strong>{source.title}</strong>
                <span>{sourceLabel(source)} · {source.binding.replaceAll("_", " ")} · accessed {source.accessedAt.slice(0, 10)}</span>
              </span>
            )}
          </sup>
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
      <p className="person-kicker">
        {portrait ? "Example profile" : "Evidence profile"} · by{" "}
        <a href={`/${profile.username}`}>@{profile.username}</a> · assembled{" "}
        {packet.generatedAt.slice(0, 10)} · revision {profile.revision}
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
      <p className="person-stats">
        {packet.claims.length} cited claims · {packet.timeline?.length ?? 0} dated events ·{" "}
        {packet.sources.length} sources
        {packet.themes !== undefined && packet.themes.length > 0 && ` · ${packet.themes.length} themes`}
      </p>
      <p className="person-notice">
        This is a partial, dated index built from the sources listed below, and it may be revised.{" "}
        <a href={`/${profile.username}`}>@{profile.username}</a> published it, not the person it
        describes. Where sources disagree, both versions stay.
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

const CLAIM_KINDS = ["fact", "stated_belief", "pattern", "speculation"] as const;

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
  const claimCounts = new Map(CLAIM_KINDS.map(kind => [
    kind,
    packet.claims.filter(claim => claim.kind === kind).length,
  ]));
  const sectionLinks = [
    { href: "#claims-heading", label: "Claims", count: packet.claims.length },
    ...(topics.length > 0
      ? [
        { href: "#timeline-topics-heading", label: "Timeline by topic", count: topics.length },
        { href: "#timeline-heading", label: "Chronological timeline", count: packet.timeline?.length ?? 0 },
      ]
      : []),
    ...(packet.themes !== undefined && packet.themes.length > 0
      ? [{ href: "#themes-heading", label: "Themes", count: packet.themes.length }]
      : []),
    ...(packet.works !== undefined && packet.works.length > 0
      ? [{ href: "#works-heading", label: "Works and projects", count: packet.works.length }]
      : []),
    ...(packet.appearances !== undefined && packet.appearances.length > 0
      ? [{ href: "#appearances-heading", label: "Appearances", count: packet.appearances.length }]
      : []),
    ...(packet.relations !== undefined && packet.relations.length > 0
      ? [{ href: "#relations-heading", label: "Relations", count: packet.relations.length }]
      : []),
    ...(inbound.length > 0 ? [{ href: "#inbound-heading", label: "Indexed in", count: inbound.length }] : []),
    { href: "#sources-heading", label: "Sources", count: packet.sources.length },
    { href: "#coverage-heading", label: "Coverage and method" },
    ...(packet.openQuestions !== undefined && packet.openQuestions.length > 0
      ? [{ href: "#open-questions-heading", label: "Open questions", count: packet.openQuestions.length }]
      : []),
  ];

  return (
    <main className="person-main dossier-layout" id="main" tabIndex={-1}>
      <nav aria-label="Dossier sections">
        <details className="dossier-nav-disclosure">
          <summary>Browse this dossier</summary>
          <ul>
            {sectionLinks.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
                {link.count === undefined ? null : <span className="dossier-nav-count">{link.count}</span>}
              </li>
            ))}
          </ul>
        </details>
        <div className="dossier-nav-rail">
          <p className="dossier-nav-label">in this dossier</p>
          <ul>
            {sectionLinks.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
                {link.count === undefined ? null : <span className="dossier-nav-count">{link.count}</span>}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="dossier-column">
        <PersonProfileArticle packet={packet} />

      <section aria-labelledby="claims-heading">
        <h2 id="claims-heading">Claims</h2>
        <p className="claims-intro">
          Each claim below is one checkable statement with its sources. Filter by kind: facts are
          documented, stated beliefs are the person&apos;s own stated positions, patterns recur
          across sources, and speculation is a labeled guess.
        </p>
        <div className="claim-filter" role="group" aria-label="Filter claims by kind">
          <input defaultChecked id="cf-all" name="claim-filter" type="radio" />
          <label htmlFor="cf-all">all <span>{packet.claims.length}</span></label>
          {CLAIM_KINDS.map(kind => (
            <span className="claim-filter-pair" key={kind}>
              <input id={`cf-${kind}`} name="claim-filter" type="radio" />
              <label className={`claim-filter-${kind}`} htmlFor={`cf-${kind}`}>
                {kind.replace("_", " ")} <span>{claimCounts.get(kind)}</span>
              </label>
            </span>
          ))}
        </div>
        <ul className="claims">
          {packet.claims.map(claim => (
            <li data-kind={claim.kind} key={claim.id}>
              <span className={`claim-kind claim-${claim.kind}`}>{claim.kind.replace("_", " ")}</span>
              <span className="claim-text">
                {claim.text}
                <SourceRefs ids={claim.sourceIds} byId={byId} numbers={numbers} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {topics.length > 0 && (
        <section aria-labelledby="timeline-topics-heading">
          <h2 id="timeline-topics-heading">Timeline by topic</h2>
          <p>
            Events grouped by kind. Each links to its entry in the{" "}
            <a href="#timeline-heading">chronological timeline</a>. Dates keep the precision the
            publisher supplied.
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
                    <span className="event-main">
                      <a href={`#${timelineEventId(event)}`}>{event.title}</a>
                      <span className="event-kind">{event.kind}</span>
                      <SourceRefs ids={event.sourceIds} byId={byId} numbers={numbers} />
                    </span>
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
            {sortedTimeline(packet).map((event, eventIndex, events) => {
              const target = event.organizationHandle === undefined ? null : resolveProfile(profile.username, {
                target: event.organizationHandle,
                targetKind: "organization",
              });
              const decade = event.date.slice(0, 3) + "0s";
              const previousDecade = eventIndex > 0 ? events[eventIndex - 1].date.slice(0, 3) + "0s" : undefined;
              return (
              <li key={event.id} id={timelineEventId(event)} tabIndex={-1}>
                <span className="timeline-date">
                  {decade !== previousDecade && <span className="timeline-decade">{decade}</span>}
                  <time dateTime={event.date}>
                    {event.date}
                    {event.end !== undefined ? ` – ${event.end}` : ""}
                  </time>
                </span>
                <span className="event-main">
                  <span className="event-head">
                    <strong>{event.title}</strong>
                    <span className="event-kind">{event.kind}</span>
                  </span>
                  {(event.organization !== undefined || event.location !== undefined) && (
                    <span className="event-meta">
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
                    </span>
                  )}
                  {event.summary !== undefined && <p>{event.summary}</p>}
                  <SourceRefs ids={event.sourceIds} byId={byId} numbers={numbers} />
                </span>
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

      {packet.openQuestions !== undefined && packet.openQuestions.length > 0 && (
        <section aria-labelledby="open-questions-heading">
          <h2 id="open-questions-heading">Open questions</h2>
          <ul className="open-questions">
            {packet.openQuestions.map((question, index) => <li key={index}>{question}</li>)}
          </ul>
        </section>
      )}

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
          <dd>Not recorded.</dd>
          <dt>Open questions</dt>
          <dd>
            {packet.openQuestions !== undefined && packet.openQuestions.length > 0
              ? <a href="#open-questions-heading">See the supplied open questions</a>
              : "None listed."}
          </dd>
        </dl>
      </section>
      </div>
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
        <a href={`${canonical}.md`}>Markdown essay</a> ·{" "}
        <a href="mailto:hraness@pm.me">Request a correction or removal</a> ·{" "}
        <a href="https://github.com/hraness/soulscrape/issues">Report a site bug</a>
      </p>
    </div>
  );
}
