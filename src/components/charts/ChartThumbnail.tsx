import { CHART_KIND_LABEL } from '../../data/chartCatalog'
import type { ChartSpec } from '../../types/document'
import { ChartCanvas } from './ChartCanvas'

// A fixed natural size for every kind, scaled down uniformly (not proportioned
// per-kind via `canvasHeight`) so thumbnail text stays legible-small rather
// than overlapping — kind components lay out fine at any given box, just with
// more/less breathing room than their "ideal" full-size height.
const NATURAL_WIDTH = 336
const NATURAL_HEIGHT = 208
const SCALE = 0.5

interface ChartThumbnailProps {
  chart: ChartSpec
  onOpen: () => void
}

/**
 * A small, live (but inert) preview of a chart: the real kind component
 * rendered at a fixed natural size inside a scaled-down, clipped wrapper, so
 * its text shrinks proportionately instead of overlapping. The accessible,
 * clickable surface is this button; the scaled canvas itself is inert.
 */
export function ChartThumbnail({ chart, onOpen }: ChartThumbnailProps) {
  return (
    <li className="chart-thumb">
      <button
        type="button"
        className="chart-thumb__trigger"
        onClick={onOpen}
        aria-label={`View chart: ${chart.title}`}
      >
        <span
          className="chart-thumb__canvas"
          style={{ width: NATURAL_WIDTH * SCALE, height: NATURAL_HEIGHT * SCALE }}
        >
          <span
            className="chart-thumb__scale"
            style={{
              width: NATURAL_WIDTH,
              height: NATURAL_HEIGHT,
              transform: `scale(${SCALE})`,
            }}
            aria-hidden="true"
            inert
          >
            <ChartCanvas chart={chart} width={NATURAL_WIDTH} height={NATURAL_HEIGHT} thumbnail />
          </span>
        </span>
        <span className="chart-thumb__meta">
          <span className="chart-thumb__kind">{CHART_KIND_LABEL[chart.kind]}</span>
          <span className="chart-thumb__title">{chart.title}</span>
        </span>
      </button>
    </li>
  )
}
