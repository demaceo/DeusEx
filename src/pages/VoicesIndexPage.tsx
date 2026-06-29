import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCrossings } from '../data/documents'
import { PERSONAS } from '../data/personas'
import { CONCESSION_LABEL, STANCE_LABEL } from '../data/stance'

/**
 * `/voices` — the series-wide map of stance crossings: every moment any voice
 * argued off its default camp, grouped by speaker, with the voices who never
 * broke from type listed at the end. A projection over {@link getAllCrossings};
 * each crossing links to its part, each voice to their full thread.
 */
export function VoicesIndexPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const all = getAllCrossings()
  const broke = all.filter((v) => v.crossings.length > 0)
  const held = all.filter((v) => v.crossings.length === 0)
  const totalCrossings = broke.reduce((n, v) => n + v.crossings.length, 0)

  return (
    <>
      <header className="crossings-hero">
        <p className="overline">The AI Reckoning · Series map</p>
        <h1>The Crossings</h1>
        <p className="subtitle">
          Each voice argues from a usual camp. These are the moments a voice broke from type —
          arguing the optimistic side, the critical side, or common ground because the subject
          called for it.
        </p>
        <p className="crossings-hero__count">
          {totalCrossings} crossings · {broke.length} of {all.length} voices broke from type
        </p>
      </header>

      <div className="container">
        <nav className="series-nav">
          <Link to="/">← The AI Reckoning — series index</Link>
        </nav>

        {broke.map(({ personaId, crossings }) => {
          const persona = PERSONAS[personaId]
          const Icon = persona.icon
          const usual =
            persona.stance === 'neutral'
              ? 'usually centrist'
              : `usually ${STANCE_LABEL[persona.stance].toLowerCase()}`
          return (
            <section className="crossings-voice" key={personaId} data-persona={personaId}>
              <h2 className="crossings-voice__head">
                <span className="crossings-voice__icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <Link to={`/voices/${personaId}`} className="crossings-voice__name">
                  {persona.name}
                </Link>
                <span className="crossings-voice__usual">{usual}</span>
              </h2>
              <ul className="crossings-voice__list">
                {crossings.map((crossing, i) => (
                  <li key={i}>
                    <Link
                      className="crossing crossing--compact"
                      to={`/${crossing.slug}`}
                      data-stance={crossing.stance}
                    >
                      <span className="crossing__move">
                        <span aria-hidden="true">↔ </span>
                        {CONCESSION_LABEL[crossing.stance]}
                      </span>
                      <span className="crossing__where">
                        {crossing.partLabel} · {crossing.roundLabel}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        {held.length > 0 ? (
          <p className="crossings-held">
            <span className="crossings-held__label">Held their line throughout</span>
            {held.map((v) => PERSONAS[v.personaId].name).join(' · ')}
          </p>
        ) : null}
      </div>
    </>
  )
}
