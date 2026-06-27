import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DocumentProvider } from '../components/DocumentProvider'
import { ClaimDrawerProvider } from '../components/EvidenceDrawer'
import { SpeechBubble } from '../components/SpeechBubble'
import { getPersonaThread } from '../data/documents'
import { PERSONAS } from '../data/personas'
import type { PersonaId } from '../types/persona'
import { NotFound } from './NotFound'

function isPersonaId(id: string | undefined): id is PersonaId {
  return !!id && id in PERSONAS
}

/**
 * "Follow a voice" — one persona's complete arc across the whole series, collected
 * from every debate bubble they speak. A projection over the documents (see
 * getPersonaThread); each document's bubbles are wrapped in that document's
 * DocumentProvider so inline citations resolve and open the evidence drawer.
 */
export function PersonaThreadPage() {
  const { personaId } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [personaId])

  if (!isPersonaId(personaId)) return <NotFound />

  const persona = PERSONAS[personaId]
  const groups = getPersonaThread(personaId)
  const Icon = persona.icon
  const total = groups.reduce((n, g) => n + g.entries.length, 0)

  return (
    <ClaimDrawerProvider>
      <header className="voice-hero" data-persona={persona.id}>
        <span className="voice-hero__icon" aria-hidden="true">
          <Icon size={30} strokeWidth={1.6} />
        </span>
        <p className="overline">A voice at the table</p>
        <h1>{persona.name}</h1>
        <p className="voice-hero__role">{persona.role}</p>
        <p className="subtitle">{persona.bio}</p>
        <p className="voice-hero__count">
          {total} contribution{total === 1 ? '' : 's'} across {groups.length} part
          {groups.length === 1 ? '' : 's'}
        </p>
      </header>

      <div className="container">
        <nav className="series-nav">
          <Link to="/">← The AI Reckoning — series index</Link>
        </nav>

        {groups.length === 0 ? (
          <p className="vp-empty">This voice has not yet spoken in the series.</p>
        ) : (
          groups.map((group) => (
            <DocumentProvider
              key={group.doc.id}
              claims={group.doc.claims}
              sources={group.doc.sources}
            >
              <section className="voice-doc">
                <h2 className="voice-doc__title">
                  <Link to={`/${group.doc.slug}`}>
                    {group.partLabel} — {group.navTitle}
                  </Link>
                </h2>
                {group.entries.map((entry, i) => (
                  <div className="voice-entry" key={i}>
                    <span className="voice-entry__round">{entry.roundLabel}</span>
                    <SpeechBubble personaId={persona.id} bubble={entry.bubble} />
                  </div>
                ))}
              </section>
            </DocumentProvider>
          ))
        )}
      </div>
    </ClaimDrawerProvider>
  )
}
