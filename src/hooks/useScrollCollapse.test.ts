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
})
