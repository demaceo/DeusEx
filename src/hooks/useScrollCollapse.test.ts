import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollCollapse } from './useScrollCollapse'

function setScrollY(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true })
}

describe('useScrollCollapse', () => {
  beforeEach(() => {
    setScrollY(0)
    // Run rAF callbacks synchronously so scroll handling is deterministic in tests.
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', () => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts uncollapsed at the top of the page', () => {
    const { result } = renderHook(() => useScrollCollapse(80))
    expect(result.current).toBe(false)
  })

  it('collapses past the threshold and expands again below it', () => {
    const { result } = renderHook(() => useScrollCollapse(80))

    act(() => {
      setScrollY(120)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      setScrollY(10)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(false)
  })

  it('initializes collapsed when the page is already scrolled', () => {
    setScrollY(200)
    const { result } = renderHook(() => useScrollCollapse(80))
    expect(result.current).toBe(true)
  })

  it('holds state inside the hysteresis dead band to avoid flicker', () => {
    // Collapse at 120, expand only below 60 — between the two, state must not flip.
    const { result } = renderHook(() => useScrollCollapse(120, 60))

    act(() => {
      setScrollY(130)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    // Drift back up into the dead band (60–120): a single threshold would re-expand
    // here and oscillate. Hysteresis keeps it collapsed.
    act(() => {
      setScrollY(90)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    // Only once below the lower threshold does it expand again.
    act(() => {
      setScrollY(40)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(false)
  })
})
