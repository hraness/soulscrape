import type { ExamplePortrait } from "../lib/example-portraits";

export type ExampleIndex = Readonly<{
  handle: string;
  name: string;
  note: string;
  category: string;
  initials: string;
  portrait: ExamplePortrait;
}>;

export function ExampleIndexCard({
  index,
  number,
  featured = false,
}: Readonly<{ index: ExampleIndex; number: number; featured?: boolean }>) {
  const { portrait } = index;
  if (!portrait || (portrait.status !== "available" && portrait.status !== "unavailable")) {
    throw new Error(`Example ${index.handle} requires an explicit portrait decision`);
  }
  if (portrait.status === "unavailable") {
    const date = new Date(portrait.reviewedAt);
    if (portrait.reason.trim().length < 20 || !/^\d{4}-\d{2}-\d{2}$/u.test(portrait.reviewedAt)
      || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== portrait.reviewedAt) {
      throw new Error(`Example ${index.handle} requires a reason and review date for its unavailable portrait`);
    }
  }
  return (
    <a className={`example-card example-card--${index.handle}`} href={`/ben/${index.handle}`}>
      <span className="example-card-topline">
        <span>{index.category}</span>
        <span aria-hidden="true">↗</span>
      </span>
      <span className="example-card-portrait">
        {portrait.status === "available" ? (
          // Local image; keep the examples independent of an image service.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={portrait.src} alt="" width={240} height={240} loading={featured ? "eager" : "lazy"} decoding="async" />
        ) : (
          <span
            className="example-card-monogram"
            role="img"
            aria-label={`Portrait unavailable: ${portrait.reason} Reviewed ${portrait.reviewedAt}.`}
            title={`${portrait.reason} Reviewed ${portrait.reviewedAt}.`}
          >
            {index.initials}
          </span>
        )}
      </span>
      <strong className="example-card-name">{index.name}</strong>
      <span className="example-card-note">{index.note}</span>
      <span className="example-card-bottomline">
        <span>explore profile</span>
        <span aria-hidden="true">{String(number).padStart(2, "0")}</span>
      </span>
    </a>
  );
}
