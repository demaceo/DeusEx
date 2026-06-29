import { useLayoutEffect, useRef } from 'react'
import { PERSONAS } from '../data/personas'
import type { DebateEntry as DebateEntryData } from '../types/document'
import { DebateEntry } from './DebateEntry'

interface DebateThreadProps {
  /** A run of consecutive debate turns, in order (from `groupBlocks`). */
  turns: DebateEntryData[]
}

/**
 * Renders one debate exchange as an "opposing sides" stage: a center axis with
 * the two camps, and each turn offset to its stance's side. It owns the scroll
 * choreography for the whole run — one observer reveals turns as they enter view,
 * another emphasises the turn being read — toggled via data-attributes so long
 * threads never re-render. All motion is opt-in (`data-animate`), so without JS
 * or under `prefers-reduced-motion` every turn is simply shown in place.
 */
export function DebateThread({ turns }: DebateThreadProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const showAxis = turns.length > 1

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage || typeof IntersectionObserver === 'undefined') return

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const entries = Array.from(stage.querySelectorAll<HTMLElement>('.debate-entry'))
    if (entries.length === 0) return

    // Opt into the hidden-until-revealed + emphasis behaviour now that we know JS
    // is running and motion is allowed. Set before paint so turns start hidden
    // (no flash of content appearing then disappearing).
    stage.dataset.animate = 'true'

    // One-way reveal: fade/slide each turn in the first time it enters view.
    const revealObserver = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (record.isIntersecting) {
            ;(record.target as HTMLElement).dataset.revealed = 'true'
            revealObserver.unobserve(record.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    // Active emphasis: highlight whichever turn is nearest the reading line.
    const ratios = new Map<HTMLElement, number>()
    const activeObserver = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const el = record.target as HTMLElement
          if (record.isIntersecting) ratios.set(el, record.intersectionRatio)
          else ratios.delete(el)
        }
        let best: HTMLElement | null = null
        let bestRatio = 0
        for (const [el, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = el
          }
        }
        for (const el of entries) {
          if (el === best) el.dataset.active = 'true'
          else delete el.dataset.active
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.5, 1] },
    )

    for (const el of entries) {
      revealObserver.observe(el)
      activeObserver.observe(el)
    }

    return () => {
      revealObserver.disconnect()
      activeObserver.disconnect()
    }
  }, [turns])

  return (
    <div className="debate-stage" role="list" ref={stageRef}>
      {showAxis ? (
        <div className="debate-stage__axis" aria-hidden="true">
          <span className="debate-stage__camp" data-stance="optimist">
            ◂ Optimistic
          </span>
          <span className="debate-stage__camp" data-stance="critic">
            Critical ▸
          </span>
        </div>
      ) : null}

      {turns.map((turn, i) => {
        const prev = i > 0 ? turns[i - 1] : undefined
        const isFirstOfSpeaker = !prev || prev.personaId !== turn.personaId
        return (
          <DebateEntry
            key={i}
            entry={turn}
            stance={turn.stance ?? PERSONAS[turn.personaId].stance}
            isFirstOfSpeaker={isFirstOfSpeaker}
            previousPersonaId={prev?.personaId}
            turnIndex={i}
          />
        )
      })}
    </div>
  )
}
