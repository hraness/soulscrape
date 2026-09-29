/**
 * The film's product surface: the site's real mockup components from
 * site/app/mockups, laid out on one board for the camera to move across.
 * Illustration only; the dossier is the published Eugene Tssui example.
 *
 * `data-film` names are what copy.ts steps point at. Names inside a site
 * component are added by filmMarkup() in build.ts, so the site components
 * stay free of film markup.
 */
import { ClaimMockup, DossierMockup, FormatMockup, SessionMockup } from "../site/app/mockups/surfaces.tsx";
import { BINDING_LABEL, fixtureSources } from "../site/app/mockups/eugene-tssui.ts";

export function ProductBoard() {
  return (
    <div className="sf-board" data-film-page="">
      <div className="sf-cell" data-film="session"><SessionMockup height={560} step="done" /></div>
      <div className="sf-cell" data-film="dossier"><DossierMockup height={560} tab="questions" /></div>
      <div className="sf-cell" data-film="claim"><ClaimMockup kind="fact" open /></div>
      <div className="sf-cell" data-film="format"><FormatMockup format="json" height={420} /></div>
    </div>
  );
}

/** One source card for the cold open collage, from the example's sources. */
export function OpenCard({ index }: Readonly<{ index: number }>) {
  const source = fixtureSources[index % fixtureSources.length]!;
  return (
    <div className="sf-card">
      <span className="sf-card-binding">{BINDING_LABEL[source.binding]}</span>
      <b>{source.title}</b>
      <span className="sf-card-meta">{source.publisher}</span>
    </div>
  );
}
