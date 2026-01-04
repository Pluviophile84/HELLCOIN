"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollProgress - Optimized for mobile performance
 *
 * Uses vanilla JS instead of Framer Motion to reduce bundle size
 * and main thread work. The spring physics are replaced with CSS
 * transitions which are GPU-accelerated.
 */
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    setIsVisible(true);

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const newProgress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      setProgress(newProgress);
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-hellfire-orange via-lava-500 to-hellfire-red transition-transform duration-150 ease-out"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
};
