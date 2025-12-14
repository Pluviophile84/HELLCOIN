"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const X_LINK = "https://x.com/YOUR_PROFILE";

const PTSD_WORDS_SOURCE = [
  "RUG",
  "BUY THE DIP",
  "SCAM",
  "-99%",
  "LIQUIDATED",
  "HONEYPOT",
  "HACKED",
  "WAGMI",
  "SOFT RUG",
  "LFG",
  "NGMI",
  "COPE",
  "FUD",
  "GAS FEES",
  "TOP SIGNAL",
  "REKT",
  "BAGHOLDER",
  "DOWN BAD",
  "PUMP",
  "DUMP",
  "EXIT",
  "PONZI",
  "MOON",
  "BULLISH",
];

// Build a background pool (duplicates are fine, but we keep the count sane)
const GRID_COUNT = 36;

export const ThePit = () => {
  // Stable set of words for the grid
  const gridWords = useMemo(() => {
    const base = [...PTSD_WORDS_SOURCE];

    // Repeat until we hit GRID_COUNT
    const out: string[] = [];
    while (out.length < GRID_COUNT) out.push(...base);

    // Trim to exact count
    return out.slice(0, GRID_COUNT);
  }, []);

  // Stable per-word timing (no re-roll on rerender)
  const ghost = useMemo(() => {
    return gridWords.map((_, i) => {
      const stagger = (i % 12) * 0.18; // spreads pulses

      return {
        peak: 0.16 + Math.random() * 0.22, // max opacity
        s1: 0.86 + Math.random() * 0.08, // min scale
        s2: 1.03 + Math.random() * 0.18, // max scale
        duration: 3.0 + Math.random() * 4.2, // cycle length
        delay: stagger + Math.random() * 1.1, // initial offset
        repeatDelay: 0.7 + Math.random() * 3.3, // quiet time between cycles
      };
    });
  }, [gridWords]);

  // Helper: long phrases should be smaller so they never clip
  const wordSizeClass = (w: string) => {
    // includes spaces -> usually longer visually
    const isLong = w.length >= 10 || w.includes(" ");
    return isLong
      ? "text-[clamp(1.1rem,3.4vw,2.75rem)]"
      : "text-[clamp(1.35rem,4.2vw,3.75rem)]";
  };

  return (
    <section
      id="the-pit"
      className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[900px]"
    >
      {/* BACKGROUND: GHOST GRID (contained, no overscan, responsive) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft padding keeps words away from the edges on all screens */}
        <div className="absolute inset-0 px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div
            className="
              h-full w-full
              grid content-center place-items-center
              grid-cols-2 gap-x-6 gap-y-6
              sm:grid-cols-3 sm:gap-x-8 sm:gap-y-8
              md:grid-cols-4 md:gap-x-10 md:gap-y-10
              lg:grid-cols-5 lg:gap-x-12 lg:gap-y-12
              xl:grid-cols-6
            "
          >
            {gridWords.map((word, i) => (
              <div
                key={`${word}-${i}`}
                className="
                  w-full
                  flex items-center justify-center
                  h-16 sm:h-18 md:h-20 lg:h-24
                "
              >
                <motion.div
                  className={[
                    "font-gothic font-bold text-black/30",
                    "leading-none tracking-tight text-center",
                    // IMPORTANT: allow the word to size down rather than clipping
                    "max-w-full",
                    wordSizeClass(word),
                  ].join(" ")}
                  animate={{
                    opacity: [0, ghost[i].peak, 0],
                    scale: [ghost[i].s1, ghost[i].s2, ghost[i].s1],
                  }}
                  transition={{
                    duration: ghost[i].duration,
                    delay: ghost[i].delay,
                    repeat: Infinity,
                    repeatDelay: ghost[i].repeatDelay,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOREGROUND: THE MEDIEVAL DECREE (unchanged) */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full px-4">
        {/* Header Label */}
        <div className="mb-12">
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase bg-black px-4 py-1 border border-[#ffae00]/30 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            THE FINAL CIRCLE
          </span>
        </div>

        {/* --- THE ELEGANT BOX --- */}
        <div className="relative w-full bg-hell-black p-1 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* 1. Outer Border */}
          <div className="absolute inset-0 border border-hell-red/50 pointer-events-none"></div>

          {/* 2. Inner Content Area */}
          <div className="bg-black/90 p-8 md:p-16 text-center border border-gray-800 backdrop-blur-md relative overflow-hidden">
            {/* Medieval Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ffae00]/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ffae00]/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ffae00]/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ffae00]/50"></div>

            {/* Title */}
            <h2 className="font-gothic text-5xl md:text-8xl text-hell-white mb-8 leading-none">
              THE CULT OF <br className="md:hidden" />{" "}
              <span className="text-hell-red">THE BURNED</span>
            </h2>

            {/* Copy */}
            <div className="font-terminal text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                Welcome to the only corner of crypto where everyone finally stops pretending. Here,
                we don’t hide our losses — we frame them as{" "}
                <span className="text-white font-bold">character development.</span>
              </p>

              <p>
                <span className="text-hell-red font-bold">HELLCOIN</span> is a home for the
                overleveraged, the rugged, the delusional, and the eternally optimistic. A sanctuary
                for those who keep making the same mistakes with confidence, pride, and a complete
                lack of learning curve.
              </p>

              <p className="border-l-2 border-[#ffae00] pl-4 italic text-gray-300">
                We don’t judge. We recognize the pattern. We’ve lived the pattern.
              </p>

              <p>
                This is a community built on shared suffering, recycled hope, and the sacred ritual
                of doing it all again tomorrow.
              </p>

              <p className="text-white text-2xl font-bold pt-4">
                If you’ve been burned, you belong here.
                <br />
                If you haven’t, you will.
              </p>

              <p className="text-hell-red/80 text-sm uppercase tracking-widest">
                Misery needs company. Hellcoin provides it.
              </p>
            </div>

            {/* X (Twitter) Button */}
            <div className="flex justify-center w-full">
              <a
                href={X_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-hell-red/10 border border-hell-red hover:bg-hell-red text-hell-white font-gothic transition-all duration-300 active:scale-95 w-full md:w-auto text-xl md:text-3xl py-3 px-6 md:py-4 md:px-12 shadow-[0_0_20px_rgba(204,0,0,0.2)] hover:shadow-[0_0_30px_rgba(204,0,0,0.6)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-current shrink-0">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="md:hidden">ENTER</span>
                <span className="hidden md:inline">ENTER THE SANCTUARY</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
