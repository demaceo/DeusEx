import type { CSSProperties } from 'react'
import type { ChorusSwarm as ChorusSwarmData, ChorusBubble } from '../../types/comic'

/**
 * Grawlix glyphs are a visual stand-in for profanity, so they are hidden from
 * assistive tech and replaced with a spoken-friendly placeholder.
 */
function GrawlixRun({ value }: { value: string }) {
  return (
    <>
      <span className="comic-grawlix" aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">[expletive]</span>
    </>
  )
}

function SwarmBubble({ bubble }: { bubble: ChorusBubble }) {
  const style = bubble.tilt ? ({ '--tilt': `${bubble.tilt}deg` } as CSSProperties) : undefined
  return (
    <blockquote
      className={`comic-swarm__bubble${bubble.weight === 'heavy' ? ' comic-swarm__bubble--heavy' : ''}`}
      style={style}
    >
      <span className="comic-swarm__handle" aria-hidden="true">
        @anon
      </span>
      <p>
        {bubble.grawlixParts
          ? bubble.grawlixParts.map((run, i) =>
              run.t === 'grawlix' ? (
                <GrawlixRun key={i} value={run.v} />
              ) : (
                <span key={i}>{run.v}</span>
              ),
            )
          : bubble.text}
      </p>
    </blockquote>
  )
}

/** The anonymous reply pile-on: a wall of tilted, jagged attack bubbles. */
export function ChorusSwarm({ data }: { data: ChorusSwarmData }) {
  return (
    <div className="comic-swarm" role="group" aria-label="Hostile replies from the thread">
      {data.bubbles.map((bubble, i) => (
        <SwarmBubble key={i} bubble={bubble} />
      ))}
    </div>
  )
}
