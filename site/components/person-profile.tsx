import { renderMarkdown } from "../lib/markdown";
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
  return (
    <header className="person-header">
      <nav className="person-nav" aria-label="Site">
        <a href="/">Soulscrape</a>
        <a href={`/${profile.username}`}>@{profile.username}</a>
      </nav>
      <p className="person-kicker">
        Public evidence index · assembled {packet.generatedAt.slice(0, 10)} · revision {profile.revision}
      </p>
      <Name className="person-name">{subject.displayName}</Name>
      <p className="person-summary">{subject.summary}</p>
      {subject.alsoKnownAs !== undefined && subject.alsoKnownAs.length > 0 && (
        <p className="person-aka">Also known as {subject.alsoKnownAs.join(", ")}</p>
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

/** The profile body: markdown essay plus the evidence sections. */
export function PersonProfileMain({ profile }: { profile: StoredProfile }) {
  const { packet } = profile;
  const byId = sourcesById(packet);
  const numbers = new Map(packet.sources.map((source, index) => [source.id, index + 1]));

  return (
    <main className="person-main" id="main" tabIndex={-1}>
      <PersonProfileArticle packet={packet} />

      {packet.timeline !== undefined && packet.timeline.length > 0 && (
        <section aria-labelledby="timeline-heading">
          <h2 id="timeline-heading">Timeline</h2>
          <ol className="timeline">
            {sortedTimeline(packet).map(event => (
              <li key={event.id}>
                <time dateTime={event.date}>
                  {event.date}
                  {event.end !== undefined ? ` – ${event.end}` : ""}
                </time>
                <strong>{event.title}</strong>
                <span className="event-kind">{event.kind}</span>
                {event.organization !== undefined && <span className="event-org">{event.organization}</span>}
                {event.location !== undefined && <span className="event-loc">{event.location}</span>}
                {event.summary !== undefined && <p>{event.summary}</p>}
                <SourceRefs ids={event.sourceIds} byId={byId} numbers={numbers} />
              </li>
            ))}
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
            {sortedAppearances(packet).map(appearance => (
              <li key={appearance.id}>
                <strong>{appearance.title}</strong>
                {appearance.venue !== undefined && <span className="event-org">{appearance.venue}</span>}
                {appearance.publishedAt !== undefined && (
                  <time dateTime={appearance.publishedAt}>{appearance.publishedAt.slice(0, 10)}</time>
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

/** The profile footer: index id, digest, publisher, and format links. */
export function PersonProfileFooter({ profile }: { profile: StoredProfile }) {
  const { packet } = profile;
  const canonical = profileCanonicalUrl(profile.username, profile.handle);
  return (
    <footer className="site-footer person-footer">
      <p>
        Index <code>{packet.indexId}</code> · digest{" "}
        <code>{profile.packetDigest.slice(0, 16)}…</code> · published by{" "}
        <a href={`/${profile.username}`}>{`@${profile.username}`}</a> ·{" "}
        <a href={`${canonical}.md`}>Markdown</a> ·{" "}
        <a href="https://github.com/hraness/soulscrape/issues">Report an issue</a>
      </p>
    </footer>
  );
}
