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

// jsdom doesn't implement scrollTo; stub it so scroll-to-top effects are no-ops.
window.scrollTo = (() => {}) as typeof window.scrollTo

// Tests run with globals: false, so register cleanup manually.
afterEach(() => {
  cleanup()
})
