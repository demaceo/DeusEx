/**
 * Hidden SVG filter definitions shared by the comic pages. `#comic-jitter`
 * gives titles a hand-drawn wobble (feTurbulence + feDisplacementMap, from the
 * squigglevision / comic-text-filter pens). Referenced via
 * `filter: url(#comic-jitter)` in comic.css or inline styles.
 */
export function ComicFilters() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="comic-jitter">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves={2} seed={7} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} />
        </filter>
      </defs>
    </svg>
  )
}
