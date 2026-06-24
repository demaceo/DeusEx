/**
 * Site-wide notice that figures have not yet been independently verified.
 * Directly serves the project goal that statistics not be taken as confirmed
 * until a dedicated verification pass checks each one against a primary source.
 */
export function VerificationNotice() {
  return (
    <aside className="verification-notice" role="note">
      <span className="verification-notice__badge">Pending verification</span>
      <p>
        The statistics and citations below are transcribed from the source documents and
        are <strong>pending independent verification</strong>. Figures should not be treated
        as confirmed until each has been checked against a primary source.
      </p>
    </aside>
  )
}
