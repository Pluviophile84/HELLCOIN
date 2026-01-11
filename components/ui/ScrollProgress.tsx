"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollProgress - Optimized for mobile performance
 *
 * - Avoids React re-renders on scroll by writing transform directly.
 * - Preserves baseline behavior: on very short pages (no scroll), the bar is not rendered.
 * - Respects reduced-motion: hides the continuously updating progress bar when the user requests reduced motion.
 */
export const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const updateVisibility = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsVisible(scrollHeight > 10);
    };

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 10) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const p = Math.min(1, Math.max(0, scrollTop / scrollHeight));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateVisibility);

    updateVisibility();
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-black/20">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-lava-500 via-gold to-lava-500"
        style={{
          transform: "scaleX(0)",
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      />
    </div>
  );
};
