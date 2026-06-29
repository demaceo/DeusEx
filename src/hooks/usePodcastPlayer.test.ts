import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { usePodcastPlayer } from './usePodcastPlayer'
import type { DocumentId } from '../types/document'

// Mock audioEpisodes so tests run offline and deterministically.
vi.mock('../data/audioEpisodes', () => ({
  getEpisode: vi.fn(),
  getTranscript: vi.fn(),
}))

import { getEpisode, getTranscript } from '../data/audioEpisodes'

const MOCK_EPISODE = {
  slug: 'part-i',
  title: 'Part I',
  src: '/audio/part-i.mp3',
  durationSec: 300,
  transcript: '/audio/part-i.transcript.json',
}

/** Build a minimal HTMLAudioElement stand-in for jsdom. */
function makeAudioStub(playBehavior: 'resolve' | 'reject' = 'resolve') {
  const listeners: Record<string, Array<() => void>> = {}
  const stub = {
    paused: true,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
    preload: 'none' as string,
    play: vi.fn(function (this: typeof stub) {
      if (playBehavior === 'reject') {
        return Promise.reject(new DOMException('NotAllowedError', 'NotAllowedError'))
      }
      stub.paused = false
      // Emit 'play' asynchronously, mirroring a real audio element.
      queueMicrotask(() => listeners['play']?.forEach((fn) => fn()))
      return Promise.resolve()
    }),
    pause: vi.fn(function (this: typeof stub) {
      stub.paused = true
      queueMicrotask(() => listeners['pause']?.forEach((fn) => fn()))
    }),
    addEventListener: vi.fn(function (event: string, fn: () => void) {
      listeners[event] = listeners[event] ?? []
      listeners[event].push(fn)
    }),
  }
  return stub
}

// ─── State resets synchronously on documentId change ──────────────────────────

describe('usePodcastPlayer — state resets synchronously on documentId change', () => {
  let audioStub: ReturnType<typeof makeAudioStub>

  beforeEach(() => {
    audioStub = makeAudioStub()
    // Must use a regular function (not arrow) so `new Audio(...)` works.
    vi.stubGlobal(
      'Audio',
      vi.fn(function () {
        return audioStub
      }),
    )
    vi.mocked(getEpisode).mockResolvedValue(MOCK_EPISODE)
    vi.mocked(getTranscript).mockResolvedValue(null)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('immediately clears isActive when documentId changes, before the ep fetch resolves', async () => {
    // First document resolves instantly; second document's fetch hangs.
    let resolveSecond!: (ep: typeof MOCK_EPISODE | null) => void
    vi.mocked(getEpisode)
      .mockResolvedValueOnce(MOCK_EPISODE) // part-i resolves instantly
      .mockImplementationOnce(
        () => new Promise<typeof MOCK_EPISODE | null>((r) => (resolveSecond = r)),
      ) // part-ii hangs indefinitely

    const { result, rerender } = renderHook(({ id }: { id: DocumentId }) => usePodcastPlayer(id), {
      initialProps: { id: 'part-i' as DocumentId },
    })

    // Wait for part-i episode to load.
    await waitFor(() => expect(result.current.episode).not.toBeNull())

    // Activate the player.
    await act(async () => {
      result.current.toggle()
    })
    expect(result.current.isActive).toBe(true)

    // Navigate to part-ii — the manifest fetch deliberately hangs.
    rerender({ id: 'part-ii' as DocumentId })

    // Bug: previously isActive was only cleared after getEpisode resolved,
    // causing the previous episode's player bar to linger during navigation.
    // Fix: states are reset synchronously at effect start.
    expect(result.current.isActive).toBe(false)
    expect(result.current.episode).toBeNull()

    // Resolve the hanging promise to clean up.
    await act(async () => {
      resolveSecond(null)
    })
  })
})

// ─── play() rejection resets isActive ─────────────────────────────────────────

describe('usePodcastPlayer — play() rejection resets isActive', () => {
  let audioStub: ReturnType<typeof makeAudioStub>

  beforeEach(() => {
    audioStub = makeAudioStub('reject')
    vi.stubGlobal(
      'Audio',
      vi.fn(function () {
        return audioStub
      }),
    )
    vi.mocked(getEpisode).mockResolvedValue(MOCK_EPISODE)
    vi.mocked(getTranscript).mockResolvedValue(null)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('resets isActive to false when audio.play() is rejected', async () => {
    const { result } = renderHook(() => usePodcastPlayer('part-i'))

    // Wait for the episode to load.
    await waitFor(() => expect(result.current.episode).not.toBeNull())

    // toggle() optimistically sets isActive = true, then audio.play() rejects.
    await act(async () => {
      result.current.toggle()
    })

    // The rejection handler must retract isActive because audio is still paused.
    // Bug: previously the play promise was discarded with `void`, leaving the
    // player bar visible and engaged with no audio playing.
    expect(result.current.isActive).toBe(false)
    expect(result.current.isPlaying).toBe(false)
  })
})
