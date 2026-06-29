import type { SectionHeader as SectionHeaderData } from '../types/document'

interface SectionHeaderProps {
  header: SectionHeaderData
  /** Id for the heading, so the enclosing section can be `aria-labelledby` it and linked to. */
  headingId?: string
}

export function SectionHeader({ header, headingId }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="section-num">{header.roundLabel}</span>
      {header.title ? <h2 id={headingId}>{header.title}</h2> : null}
      <div className="section-rule" />
    </div>
  )
}
