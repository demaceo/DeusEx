import type { IncentiveAudit as IncentiveAuditData } from '../types/document'

interface IncentiveAuditProps {
  audit: IncentiveAuditData
}

/**
 * "Systems Framing" callout: performs the diagnostic pivot from harm to
 * incentive race → coordination trap → governance off-ramp. Visually distinct
 * from speech bubbles — it's editorial analysis, not a persona speaking.
 */
export function IncentiveAudit({ audit }: IncentiveAuditProps) {
  return (
    <aside className="incentive-audit">
      <span className="incentive-audit__eyebrow">Systems Framing</span>
      <dl className="incentive-audit__rows">
        <div className="incentive-audit__row">
          <dt>The race</dt>
          <dd>{audit.race}</dd>
        </div>
        <div className="incentive-audit__row">
          <dt>The trap</dt>
          <dd>{audit.trap}</dd>
        </div>
        <div className="incentive-audit__row">
          <dt>The off-ramp</dt>
          <dd>{audit.intervention}</dd>
        </div>
      </dl>
    </aside>
  )
}
