export type ExampleIndex = Readonly<{
  handle: string;
  name: string;
  note: string;
  category: string;
  initials: string;
  portrait?: string;
}>;

export function ExampleIndexCard({
  index,
  number,
  featured = false,
}: Readonly<{ index: ExampleIndex; number: number; featured?: boolean }>) {
  return (
    <a className={`example-card example-card--${index.handle}`} href={`/ben/${index.handle}`}>
      <span className="example-card-topline">
        <span>{index.category}</span>
        <span aria-hidden="true">↗</span>
      </span>
      <span className="example-card-portrait" aria-hidden="true">
        {index.portrait ? (
          // Local, pre-sized illustration; keep the static examples independent of an image service.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={index.portrait} alt="" width={240} height={240} loading={featured ? "eager" : "lazy"} decoding="async" />
        ) : <span className="example-card-monogram">{index.initials}</span>}
      </span>
      <strong className="example-card-name">{index.name}</strong>
      <span className="example-card-note">{index.note}</span>
      <span className="example-card-bottomline">
        <span>read the index</span>
        <span aria-hidden="true">{String(number).padStart(2, "0")}</span>
      </span>
    </a>
  );
}
