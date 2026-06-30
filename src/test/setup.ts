// Vitest setup: jest-dom matchers + RTL cleanup between tests.
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom lacks ResizeObserver, which Recharts' ResponsiveContainer relies on.
// Provide a no-op stub so charts can mount in tests.
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

// jsdom lacks IntersectionObserver, used by the round navigator's active-section hook.
if (!('IntersectionObserver' in globalThis)) {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver
}

// jsdom lacks matchMedia, used by usePrefersReducedMotion (world-map autoplay gate).
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

// jsdom doesn't implement scrollTo; stub it so scroll-to-top effects are no-ops.
window.scrollTo = (() => {}) as typeof window.scrollTo
// jsdom doesn't implement Element.scrollIntoView; stub it for the round navigator.
Element.prototype.scrollIntoView = () => {}

// Tests run with globals: false, so register cleanup manually.
afterEach(() => {
  cleanup()
})
