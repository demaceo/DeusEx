// Vitest setup: jest-dom matchers + RTL cleanup between tests.
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Tests run with globals: false, so register cleanup manually.
afterEach(() => {
  cleanup()
})
