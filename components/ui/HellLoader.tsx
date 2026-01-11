"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * HellLoader - Optimized for Core Web Vitals
 *
 * Changes for performance:
 * 1. Uses CSS animations instead of Framer Motion (saves ~100KB parse time on mobile)
 * 2. Reduced timeout from 1500ms to 800ms
 * 3. Respects prefers-reduced-motion
 * 4. Uses CSS containment for paint optimization
 */
export const HellLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Shorter delay for better LCP, skip entirely for reduced motion
    const delay = prefersReducedMotion ? 0 : 800;

    const timer = setTimeout(() => {
      setIsExiting(true);
      // Allow exit animation to complete
      setTimeout(() => setIsLoading(false), prefersReducedMotion ? 0 : 400);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian-950 transition-opacity duration-400 ease-out ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{ contain: "strict" }}
      aria-hidden="true"
    >
      {/* Animated logo - CSS only */}
      <div className="relative mb-8">
        <div className="relative h-24 w-24 overflow-hidden rounded-lg motion-safe:animate-loader-pulse md:h-32 md:w-32">
          <Image
            src="/GOAPE.png"
            alt=""
            fill
            sizes="128px"
            priority
            className="object-contain drop-shadow-[0_0_1.875rem_rgba(255,85,0,0.8)]"
          />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 rounded-full bg-hellfire-orange/20 blur-3xl motion-safe:animate-pulse" />
      </div>

      {/* Brand */}
      <h1 className="hellfire-text-pure mb-4 font-hero text-4xl motion-safe:animate-fade-in md:text-5xl">
        HELLCOIN
      </h1>

      {/* Loading text */}
      <p className="font-body text-lg text-lava-100/60 motion-safe:animate-fade-in-delayed">
        Descending into the pit...
      </p>

      {/* Loading bar - CSS only */}
      <div className="mt-8 h-1 w-[12.5rem] overflow-hidden rounded-full bg-obsidian-800 motion-safe:animate-fade-in-delayed">
        <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-hellfire-orange to-transparent motion-safe:animate-loader-slide" />
      </div>
    </div>
  );
};
