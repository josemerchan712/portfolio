import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

function mockMatchMedia(matches) {
  const listeners = [];
  return vi.fn().mockImplementation(() => ({
    matches,
    addEventListener: (_, fn) => listeners.push(fn),
    removeEventListener: (_, fn) => listeners.splice(listeners.indexOf(fn), 1),
    _fire: (val) => listeners.forEach(fn => fn({ matches: val })),
  }));
}

describe('useReducedMotion', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns false when prefers-reduced-motion is not active', () => {
    vi.stubGlobal('matchMedia', mockMatchMedia(false));
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion is active', () => {
    vi.stubGlobal('matchMedia', mockMatchMedia(true));
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates reactively when media query changes', () => {
    const mq = mockMatchMedia(false);
    vi.stubGlobal('matchMedia', mq);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      mq.mock.results[0].value._fire(true);
    });
    expect(result.current).toBe(true);
  });
});
