import { Link } from 'react-router-dom'
import { PersonasBar } from '../components/PersonasBar'
import { DOCUMENTS } from '../data/documents'

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
          A five-voice roundtable series on artificial intelligence — its real costs, the responses
          underway, and what it is genuinely getting right. Grounded in cited evidence, not
          speculation.
        </p>
      </header>

      <PersonasBar />

      <div className="container">
        <div className="index-intro">
          <p>
            Three documents, one recurring panel. Read them in order, or jump to whichever question
            you care about most.
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
      </div>
    </>
  )
}
