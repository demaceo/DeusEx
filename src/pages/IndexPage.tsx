import { Link } from 'react-router-dom'
import { PersonasBar } from '../components/PersonasBar'
import { DOCUMENTS } from '../data/documents'
import { PERSONAS, PERSONA_ORDER } from '../data/personas'

/** Landing hub: series intro + a card per document. */
export function IndexPage() {
  return (
    <>
      <header className="index-hero">
        <p className="overline">Ethics · Technology · Society · 2024–2026</p>
        <h1>
          The <em>AI Reckoning</em>
        </h1>
        <p className="subtitle">
          A recurring-roundtable series on artificial intelligence — its real costs, the responses
          underway, what it is genuinely getting right, and the harder questions of race, truth,
          safety, intimacy, ownership, and culture. Grounded in cited evidence, not speculation.
        </p>
      </header>

      <PersonasBar />

      <div className="container">
        <div className="index-intro">
          <p>
            Nine documents, one recurring panel. Read them in order, or jump to whichever question
            you care about most. Every figure is a checkable claim —{' '}
            <Link to="/verification">see the evidence ledger</Link>.
          </p>
        </div>

        <div className="part-cards">
          {DOCUMENTS.map((entry) => (
            <Link
              key={entry.doc.slug}
              to={`/${entry.doc.slug}`}
              className="part-card"
              data-accent={entry.doc.masthead.accentColor}
            >
              <span className="part-num">{entry.partLabel}</span>
              <h2>{entry.navTitle}</h2>
              <p>{entry.blurb}</p>
              <span className="part-cta">Read →</span>
            </Link>
          ))}
        </div>

        <section className="panel-section" aria-labelledby="panel-heading">
          <h2 id="panel-heading" className="panel-section__heading">
            The Panel
          </h2>
          <p className="panel-section__intro">
            Follow any voice across the whole series — every argument they make, in one thread.
          </p>
          <ul className="panel-grid">
            {PERSONA_ORDER.map((id) => {
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
        </section>
      </div>
    </>
  )
}
