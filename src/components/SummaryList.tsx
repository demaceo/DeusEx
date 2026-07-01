import type { SummaryList as SummaryListData } from '../types/document'

interface SummaryListProps {
  summary: SummaryListData
}

/** Titled definition list — Part I's "Who's at the table" roster box. */
export function SummaryList({ summary }: SummaryListProps) {
  return (
    <div className="summary-box">
      <h3>{summary.heading}</h3>
      <ul>
        {summary.items.map((item, i) => (
          <li key={i}>
            <strong>{item.lead}:</strong> {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
