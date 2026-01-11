'use client';

import { useState, useEffect } from 'react';
import { remMarginToPx } from './viewportMargin';

/**
 * Reactive hook that converts rem-based margins to px for IntersectionObserver.
 * Updates automatically on mount and window resize to handle UHD scaling changes.
 */
export function useViewportMarginRem(
  top: number,
  right = 0,
  bottom = 0,
  left = 0
): string {
  // SSR-safe: start with zero margin
  const [margin, setMargin] = useState("0px 0px 0px 0px");

  useEffect(() => {
    const updateMargin = () => {
      setMargin(remMarginToPx(top, right, bottom, left));
    };

    // Initial computation on mount (post-hydration)
    updateMargin();

    // Throttled resize handler using requestAnimationFrame
    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateMargin);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [top, right, bottom, left]);

  return margin;
}

/**
 * Standard viewport configuration hook with reactive margin.
 * Equivalent to: { once: true, amount: 0.1, margin: "0rem 0rem -3.125rem 0rem" }
 */
export function useViewportOnce() {
  const margin = useViewportMarginRem(0, 0, -3.125, 0);
  return { once: true, amount: 0.1, margin };
}
