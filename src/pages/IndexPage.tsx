import { Link } from 'react-router-dom'
import { IndexFooter } from '../components/IndexFooter'
import { PersonasBar } from '../components/PersonasBar'
import { DOCUMENTS } from '../data/documents'
import { PERSONAS, PERSONA_ORDER } from '../data/personas'
import type { PersonaStance } from '../types/persona'

const STANCE_BANDS: Array<{ stance: PersonaStance; heading: string }> = [
  { stance: 'optimist', heading: 'The Optimists' },
  { stance: 'neutral', heading: 'The Neutral & Independent' },
  { stance: 'critic', heading: 'The Critics' },
]

/**
 * Landing hub, in a distinctly wider "manifest" mode set apart from the
 * documents' own 880px reading column: series intro, a numbered manifest of
 * every part, the panel grouped by stance, and a closing footer.
 */
export function IndexPage() {
  return (
    <>
      <header className="index-hero">
        <p className="overline">Ethics · Technology · Society · 2024–2026</p>
        <h1>
          The <em>AI Reckoning</em>
        </h1>
        <p className="subtitle">
          A recurring-roundtable series on artificial intelligence: its real costs, the responses
          underway, what it is genuinely getting right, and the harder questions of race, truth,
          safety, intimacy, ownership, culture, bias, and extraction. Grounded in cited evidence,
          not speculation.
        </p>
      </header>

      <PersonasBar />

      <div className="index-container">
        <p className="index-standfirst">
          {DOCUMENTS.length} documents, one recurring panel. Read them in order, or jump to
          whichever question you care about most.
        </p>

        <ol className="manifest-list">
          {DOCUMENTS.map((entry, i) => (
            <li key={entry.doc.slug}>
              <Link
                to={`/${entry.doc.slug}`}
                className="manifest-row"
                data-accent={entry.doc.masthead.accentColor}
              >
                <span className="manifest-row__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="manifest-row__content">
                  <span className="manifest-row__eyebrow">{entry.partLabel}</span>
                  <h2 className="manifest-row__title">{entry.navTitle}</h2>
                  <p className="manifest-row__blurb">{entry.blurb}</p>
                  <span className="manifest-row__cta">Read →</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section className="panel-section" aria-labelledby="panel-heading">
          <h2 id="panel-heading" className="panel-section__heading">
            The Panel
          </h2>
          <p className="panel-section__intro">
            Follow any voice across the whole series: every argument they make, in one thread. Or
            see <Link to="/voices">where each voice broke from type</Link>.
          </p>

          {STANCE_BANDS.map(({ stance, heading }) => {
            const ids = PERSONA_ORDER.filter((id) => PERSONAS[id].stance === stance)
            if (ids.length === 0) return null
            return (
              <div key={stance} className="panel-band" data-stance={stance}>
                <h3 className="panel-band__heading">
                  {heading}
                  <span className="panel-band__count">
                    {' '}
                    · {ids.length} voice{ids.length === 1 ? '' : 's'}
                  </span>
                </h3>
                <ul className="panel-grid">
                  {ids.map((id) => {
                    const persona = PERSONAS[id]
                    const Icon = persona.icon
                    return (
                      <li key={id}>
                        <Link className="panel-card" to={`/voices/${id}`} data-persona={id}>
                          <span className="panel-card__icon" aria-hidden="true">
                            <Icon size={20} strokeWidth={1.75} />
                          </span>
                          <span className="panel-card__text">
                            <span className="panel-card__name">{persona.name}</span>
                            <span className="panel-card__focus">{persona.focus}</span>
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </section>
      </div>

      <IndexFooter />
    </>
  )
}
