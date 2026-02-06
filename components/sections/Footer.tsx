"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { X_LINK, DEXSCREENER_LINK } from "@/lib/constants";

const EMBER_COUNT = 12; // Reduced from 20 for better performance

type Ember = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  xOffset: number;
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [reduceMotion, setReduceMotion] = useState(true); // Default to true to avoid flash
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    // Check reduced motion preference without Framer Motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(prefersReducedMotion);

    if (!prefersReducedMotion) {
      setEmbers(
        Array.from({ length: EMBER_COUNT }, (_, i) => ({
          id: i,
          left: `${Math.random() * 100}%`,
          size: 4 + Math.random() * 6,
          duration: 4 + Math.random() * 6,
          delay: Math.random() * 5,
          opacity: 0.3 + Math.random() * 0.4,
          xOffset: (Math.random() - 0.5) * 100,
        }))
      );
    }
  }, []);

  return (
    <footer
      className="relative overflow-hidden border-t-3 border-black bg-obsidian-950 pb-12 pt-24"
      style={{ contain: "layout" }}
    >
      <style jsx>{`
        @keyframes ember-rise {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: var(--ember-opacity);
          }
          100% {
            transform: translateY(-50rem) translateX(var(--ember-x-offset)) scale(0.3);
            opacity: 0;
          }
        }
        .ember {
          animation: ember-rise var(--ember-duration) var(--ember-delay) ease-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
      {/* Hellfire gradient glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-hellfire-orange/10 via-lava-500/5 to-transparent" />

      {/* Animated embers - using CSS animations for performance */}
      {!reduceMotion && embers.length > 0 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {embers.map((ember) => (
            <div
              key={ember.id}
              className="ember absolute bottom-0 rounded-full bg-hellfire-orange"
              style={
                {
                  left: ember.left,
                  width: ember.size,
                  height: ember.size,
                  boxShadow: `0 0 ${ember.size * 2}px rgba(255, 85, 0, 0.6)`,
                  "--ember-opacity": ember.opacity,
                  "--ember-duration": `${ember.duration}s`,
                  "--ember-delay": `${ember.delay}s`,
                  "--ember-x-offset": `${ember.xOffset}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[150rem] px-4 lg:w-[85%] 3xl:max-w-[175rem]">
        {/* Main content */}
        <div className="mb-20 flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:items-start lg:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg md:h-14 md:w-14">
                <Image
                  src="/GOAPE.png"
                  alt="HELLCOIN Logo"
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-[0_0_0.625rem_rgba(255,85,0,0.5)]"
                />
              </div>
              <span className="text-cartoon hellfire-text inline-block pt-[0.4em] font-hero text-5xl leading-none tracking-wide md:text-7xl">
                HELLCOIN
              </span>
            </div>
            <p className="max-w-sm font-body text-lg leading-relaxed text-gold">
              The afterlife of every bag.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href={X_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-lg border-3 border-black bg-obsidian-800 text-lava-100 shadow-brutal-sm transition-colors hover:text-gold"
                aria-label="Follow on X (Twitter)"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8 font-body text-lg md:flex md:flex-row md:gap-20">
            <div className="flex flex-col gap-4">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold">
                <span className="h-px w-4 bg-gold" />
                DIRECTORY
              </span>
              <a
                href="#genesis"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                GENESIS
              </a>
              <a
                href="#commandments"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                COMMANDMENTS
              </a>
              <a
                href="#nine-types"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                NINE TYPES
              </a>
              <a
                href="#hall-of-pain"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                HALL OF PAIN
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold">
                <span className="h-px w-4 bg-gold" />
                PROTOCOL
              </span>
              <a
                href={X_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                TWITTER (X)
              </a>
              <a
                href={DEXSCREENER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                DEXSCREENER
              </a>
              <a
                href="#ritual"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                CONTRACT
              </a>
              <a
                href="#the-pit"
                className="text-lava-100/70 transition-colors hover:text-hellfire-orange"
              >
                THE PIT
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-hellfire-orange/30 to-transparent" />

        {/* Disclaimer */}
        <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:items-end lg:text-left">
          <div className="max-w-2xl font-body text-sm leading-relaxed text-lava-100/50">
            <p className="mb-2">
              <span className="hellfire-text font-bold">⚠ DISCLAIMER:</span> $666 is a useless
              memecoin with no intrinsic value and no expectation of financial return. There is no
              roadmap, no team, and no utility.
            </p>
            <p>
              By buying $666, you agree that you are the exit liquidity. If the price goes up, it is
              luck. If it goes down, it is gravity. Do not email us complaining about your losses;
              we are busy burning liquidity.
            </p>
          </div>

          <div className="whitespace-nowrap text-center font-body text-sm text-lava-100/40 lg:text-right">
            <p className="mb-1 text-xs uppercase tracking-widest">ALL RIGHTS BURNED</p>
            <p className="text-lg font-bold text-lava-100/60">&copy; {currentYear} HELLCOIN</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
