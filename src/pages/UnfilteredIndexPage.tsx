import '@fontsource/bangers/index.css'
import '@fontsource/permanent-marker/index.css'
import { Link } from 'react-router-dom'
import { ComicFilters } from '../components/comic/ComicFilters'
import { COMICS } from '../data/comics'

/** Series landing for the comic episodes, in the comic design system. */
export function UnfilteredIndexPage() {
  return (
    <div className="comic-root" data-series="roundtable-reckoning">
      <ComicFilters />
      <header className="comic-cover">
        <p className="comic-cover__overline">A companion series to The AI Reckoning</p>
        <h1 className="comic-cover__title">
          <span className="comic-cover__title-line">Roundtable</span>
          <span className="comic-cover__title-line">Reckoning</span>
        </h1>
        <p className="comic-cover__subtitle">
          Unfiltered conversations, drawn as they happened. The threads the editorial series is too
          polite to quote, rendered panel by panel, then actually unpacked.
        </p>
      </header>

      <main className="comic-index">
        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {COMICS.map((entry) => (
            <li key={entry.comic.slug}>
              <Link className="comic-episode-card" to={`/unfiltered/${entry.comic.slug}`}>
                <span className="comic-episode-card__eyebrow">{entry.episodeLabel}</span>
                <h2 className="comic-episode-card__title">{entry.navTitle}</h2>
                <p className="comic-episode-card__blurb">{entry.blurb}</p>
              </Link>
            </li>
          ))}
        </ol>
      </main>

      <footer className="comic-footer">
        <Link className="comic-button comic-button--ghost" to="/">
          The AI Reckoning series
        </Link>
      </footer>
    </div>
  )
}
