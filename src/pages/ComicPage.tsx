import '@fontsource/bangers/index.css'
import '@fontsource/permanent-marker/index.css'
import { Link } from 'react-router-dom'
import { ComicFilters } from '../components/comic/ComicFilters'
import { ComicMasthead } from '../components/comic/ComicMasthead'
import { ComicPanelView } from '../components/comic/ComicPanelView'
import { ComicVerdictPlate } from '../components/comic/ComicVerdictPlate'
import { CAST_ORDER, COMIC_CAST } from '../data/comics/cast'
import { getAdjacentEpisodes } from '../data/comics'
import { PERSONAS } from '../data/personas'
import type { ComicDocument } from '../types/comic'

/**
 * The comic episode layout: cover splash, cast strip, scenes of panels,
 * verdict plate, sources plate, footer nav. Everything renders under the
 * [data-series] scope so the comic design system stays isolated from the
 * editorial series' styles.
 */
export function ComicPage({ comic }: { comic: ComicDocument }) {
  const { next } = getAdjacentEpisodes(comic.id)
  const showNext = next.slug !== comic.slug

  return (
    <div className="comic-root" data-series="roundtable-reckoning">
      <ComicFilters />
      <ComicMasthead comic={comic} />

      <section className="comic-cast" aria-label="The cast of this episode">
        {CAST_ORDER.map((castId) => {
          const member = COMIC_CAST[castId]
          const Icon = member.icon
          return (
            <div key={castId} className="comic-cast__card" data-cast={castId}>
              <span className="comic-cast__icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2} />
              </span>
              <span>
                <span className="comic-cast__name">{member.name}</span>
                <span className="comic-cast__role">{member.role}</span>
              </span>
            </div>
          )
        })}
        {comic.guests.map((personaId) => {
          const persona = PERSONAS[personaId]
          const Icon = persona.icon
          return (
            <div key={personaId} className="comic-cast__card" data-persona={personaId}>
              <span className="comic-cast__icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2} />
              </span>
              <span>
                <span className="comic-cast__name">{persona.name}</span>
                <span className="comic-cast__role">Guest panelist · {persona.role}</span>
              </span>
            </div>
          )
        })}
      </section>

      <main>
        {comic.scenes.map((scene) => (
          <section key={scene.id} id={scene.id} className="comic-scene">
            <p className="comic-scene__kicker">{scene.kicker}</p>
            {scene.title && <h2 className="comic-scene__title">{scene.title}</h2>}
            <div className={`comic-scene__panels comic-scene__panels--${scene.layout}`}>
              {scene.panels.map((panel, i) => (
                <ComicPanelView key={i} panel={panel} />
              ))}
            </div>
          </section>
        ))}

        <ComicVerdictPlate closing={comic.closing} />

        <section id="comic-sources" className="comic-sources" aria-label="Sources">
          <h2 className="comic-sources__heading">Receipts</h2>
          {comic.sources.map((source) => (
            <p key={source.id} className="comic-sources__item">
              <strong>{source.title}</strong> {source.description}
            </p>
          ))}
        </section>
      </main>

      <footer className="comic-footer">
        <Link className="comic-button comic-button--ghost" to="/unfiltered">
          All episodes
        </Link>
        {showNext && (
          <Link className="comic-button" to={`/unfiltered/${next.slug}`}>
            Next: {next.navTitle}
          </Link>
        )}
        <Link className="comic-button comic-button--ghost" to="/">
          The AI Reckoning series
        </Link>
      </footer>
    </div>
  )
}
