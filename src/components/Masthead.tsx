import { Fragment } from 'react'
import type { Masthead as MastheadData } from '../types/document'

interface MastheadProps {
  masthead: MastheadData
}

export function Masthead({ masthead }: MastheadProps) {
  return (
    <header className="masthead" data-accent={masthead.accentColor}>
      <p className="overline">{masthead.overline}</p>
      <h1>
        {masthead.titleLines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 ? <br /> : null}
            {line.map((span, spanIndex) =>
              span.em ? (
                <em key={spanIndex}>{span.text}</em>
              ) : (
                <Fragment key={spanIndex}>{span.text}</Fragment>
              ),
            )}
          </Fragment>
        ))}
      </h1>
      <p className="subtitle">{masthead.subtitle}</p>
      <p className="date-line">{masthead.dateLine}</p>
    </header>
  )
}
