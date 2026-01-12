"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { TrendingDown } from "lucide-react";

import { BUY_LINK } from "@/lib/constants";

/**
 * Hero - Premium Parallax Experience
 *
 * Full parallax implementation with:
 * 1. Multi-layer parallax (background, content, individual elements)
 * 2. Smooth CSS transitions between scroll updates
 * 3. RAF-throttled scroll handling for 60fps
 * 4. Staggered element fade and movement
 * 5. Works on desktop and mobile (with adjusted intensity)
 * 6. Respects reduced motion preferences
 */
export const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isShort, setIsShort] = useState(false);
  
    // Initialize and set up scroll handling
    useEffect(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const updateDimensions = () => {
        setIsMobile(window.innerWidth < 768);
        setIsShort(window.innerHeight < 600);
      };
  
      setReduceMotion(prefersReducedMotion);
      updateDimensions();
  
      if (prefersReducedMotion) return;
  
      const updateScrollProgress = () => {
        if (!sectionRef.current) return;
  
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
  
        // Calculate how much of the section has scrolled past
        // 0 = at top, 1 = fully scrolled past
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.8)));
  
        setScrollProgress(progress);
        setIsVisible(rect.bottom > 0);
      };
  
      const handleScroll = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateScrollProgress);
      };
  
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", updateDimensions);
      updateScrollProgress();
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", updateDimensions);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);
  
    const handleAbandonHope = useCallback(() => {
      const genesisSection = document.getElementById("genesis");
      if (genesisSection) {
        genesisSection.scrollIntoView({ behavior: "smooth" });
      }
    }, []);
  
    // Parallax calculations with easing
    const shouldAnimate = !reduceMotion && isVisible;
  
    // Eased progress for smoother falloff
    const easedProgress = scrollProgress * scrollProgress; // Quadratic ease
  
    // Mobile gets 60% of desktop parallax intensity, Short gets even less (30%)
    const intensity = isShort ? 0.3 : (isMobile ? 0.6 : 1);
    
    // Fade out slower on short screens to keep elements visible longer
    const fadeFactor = isShort ? 0.8 : 1.5;
  
    // Content parallax (moves faster - 50% of scroll, fades out)
    const contentY = shouldAnimate ? scrollProgress * 200 * intensity : 0;
    const contentOpacity = shouldAnimate ? Math.max(0, 1 - easedProgress * fadeFactor) : 1;
  
    // Individual element stagger (each element moves at different rate)
    const titleY = shouldAnimate ? scrollProgress * 180 * intensity : 0;
    const titleOpacity = shouldAnimate ? Math.max(0, 1 - easedProgress * (fadeFactor * 0.85)) : 1;
  
    const subtitleY = shouldAnimate ? scrollProgress * 220 * intensity : 0;
    const subtitleOpacity = shouldAnimate ? Math.max(0, 1 - easedProgress * fadeFactor) : 1;
  
    const taglineY = shouldAnimate ? scrollProgress * 260 * intensity : 0;
    const taglineOpacity = shouldAnimate ? Math.max(0, 1 - easedProgress * (fadeFactor * 1.1)) : 1;
  
    const ctaY = shouldAnimate ? scrollProgress * 300 * intensity : 0;
    const ctaOpacity = shouldAnimate ? Math.max(0, 1 - easedProgress * (fadeFactor * 1.25)) : 1;

  // Shared transition style for smooth interpolation
  const smoothTransition = "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.15s ease-out";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-obsidian-950"
      style={{ scrollMarginTop: "0" }}
    >
      {/* Background - fills section from navbar bottom to viewport bottom */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.webp"
          alt="Hellcoin Throne - fiery demonic landscape"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoQAAkAAUAmJYgCdAEO/hOMAAD++O/t0f/H/8BWrXr/Zu3lHuVf7lPuV8P/Yf/h/yj/N/8j/0v/V/9L/0v/S/9IAA=="
          className="object-cover object-[30%_top] md:object-[40%_top] xl:object-[left_top]"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-obsidian-950/20 to-obsidian-950" />
      </div>

      {/* Main content wrapper - outer handles 2K/4K positioning */}
      <div className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col items-center px-4 pt-8 text-center short-landscape:pb-8 short-landscape:pt-20 md:items-end md:px-12 md:pt-0 md:text-right 3xl:max-w-[133rem] 3xl:pr-[8%] 4xl:max-w-[200rem] 4xl:pr-[10%]">
        {/* Inner wrapper handles parallax transforms */}
        <div
          className="flex w-full flex-col items-center md:items-end"
          style={
            shouldAnimate
              ? {
                  transform: `translateY(${contentY}px)`,
                  opacity: contentOpacity,
                  transition: smoothTransition,
                  willChange: "transform, opacity",
                }
              : undefined
          }
        >
        {/* Title - fastest fade, moderate movement */}
        <h1
          className="mb-6 font-hero text-4xl leading-[0.9] text-lava-50 motion-safe:animate-hero-slide-up short-landscape:mb-2 short-landscape:text-2xl sm:text-5xl md:max-w-6xl md:text-6xl 3xl:text-7xl 4xl:text-8xl"
          style={
            shouldAnimate
              ? {
                  transform: `translateY(${titleY - contentY}px)`,
                  opacity: titleOpacity,
                  transition: smoothTransition,
                }
              : undefined
          }
        >
          BORN IN THE <span className="hellfire-text-pure">RED.</span>
          <br />
          FORGED BY <span className="text-gold">REGRET.</span>
        </h1>

        {/* Subtitle - medium fade */}
        <div
          className="mx-auto max-w-4xl space-y-0.5 font-body text-hero-sub text-lava-100 motion-safe:animate-hero-slide-up-delayed short-landscape:space-y-0 md:mx-0 md:max-w-5xl md:space-y-0 3xl:text-2xl"
          style={
            shouldAnimate
              ? {
                  transform: `translateY(${subtitleY - contentY}px)`,
                  opacity: subtitleOpacity,
                  transition: smoothTransition,
                }
              : undefined
          }
        >
        <p className="leading-relaxed short-landscape:text-sm 3xl:text-3xl 4xl:text-4xl">
            The first cryptocurrency powered by{" "}
            <span className="my-1 block text-hero-sub-em font-bold text-gold md:my-0 md:inline md:font-normal 3xl:text-3xl">
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-lava-100 short-landscape:text-sm 3xl:text-3xl 4xl:text-4xl">the only consensus mechanism traders truly understand.</p>
        </div>

        {/* Tagline - slower fade */}
        <p
          className="hellfire-text-pure mt-8 animate-pulse font-body text-base font-bold uppercase tracking-widest short-landscape:mt-2 short-landscape:text-xs md:max-w-5xl md:text-lg 3xl:text-2xl 4xl:text-3xl"
          style={
            shouldAnimate
              ? {
                  transform: `translateY(${taglineY - contentY}px)`,
                  opacity: taglineOpacity,
                  transition: smoothTransition,
                }
              : undefined
          }
        >
            WHEN MARKETS BURN,{" "}
            <span className="block md:inline">WE TREND</span>
        </p>

        {/* CTA - slowest fade, most movement */}
        <div
          className="mt-12 flex w-full flex-col items-center justify-center gap-8 motion-safe:animate-hero-slide-up-delayed-3 short-landscape:mt-4 short-landscape:flex-row short-landscape:gap-4 md:max-w-5xl md:flex-row md:justify-end"
          style={
            shouldAnimate
              ? {
                  transform: `translateY(${ctaY - contentY}px)`,
                  opacity: ctaOpacity,
                  transition: smoothTransition,
                }
              : undefined
          }
        >
          <button
            type="button"
            onClick={handleAbandonHope}
            className="group order-1 flex items-center gap-2 font-body text-xl font-bold text-lava-100/50 transition-colors duration-200 hover:text-gold short-landscape:text-sm md:order-none md:text-2xl 3xl:text-3xl"
          >
            [ ABANDON HOPE ]
            <TrendingDown className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-1" />
          </button>

          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hellfire-bg group relative order-2 flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl hc-border-3 border-black px-8 py-4 font-heading text-xl uppercase text-white shadow-brutal transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)] short-landscape:px-4 short-landscape:py-2 short-landscape:text-sm md:order-none md:text-2xl 3xl:text-3xl"
          >
            <span className="relative z-10 flex items-center gap-2">ACQUIRE $666</span>
          </a>
        </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div
        className="pointer-events-none absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-obsidian-950 to-transparent"
        style={
          shouldAnimate
            ? {
                opacity: Math.max(0.3, 1 - scrollProgress * 2),
                transition: "opacity 0.15s ease-out",
              }
            : undefined
        }
      />
    </section>
  );
};
