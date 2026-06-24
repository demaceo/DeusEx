import type { SectionHeader as SectionHeaderData } from '../types/document'

interface SectionHeaderProps {
  header: SectionHeaderData
}

export function SectionHeader({ header }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="section-num">{header.roundLabel}</span>
      {header.title ? <h2>{header.title}</h2> : null}
      <div className="section-rule" />
    </div>
  )
}
