"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X_LINK } from "@/lib/constants";
import { SectionKicker } from "@/components/ui/SectionKicker";

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

const GRID_COUNT = 48;

export const ThePit = () => {
  const reduceMotion = useReducedMotion();
  // Stable word pool
  const gridWords = useMemo(() => {
    const out: string[] = [];
    while (out.length < GRID_COUNT) out.push(...PTSD_WORDS_SOURCE);
    return out.slice(0, GRID_COUNT);
  }, []);

  // Stable per-word timing so ghosts don't sync/cancel each other
  const ghost = useMemo(() => {
    return gridWords.map((_, i) => {
      const stagger = (i % 16) * 0.14;
      return {
        peak: 0.14 + Math.random() * 0.22,
        s1: 0.88 + Math.random() * 0.08,
        s2: 1.06 + Math.random() * 0.18,
        duration: 3.0 + Math.random() * 4.4,
        delay: stagger + Math.random() * 1.0,
        repeatDelay: 0.6 + Math.random() * 3.2,
      };
    });
  }, [gridWords]);

  const wordClasses = (w: string) => {
    const isLong = w.length >= 10 || w.includes(" ");
    return [
      "font-gothic font-bold text-hell-black/30 leading-none tracking-tight text-center max-w-full",
      isLong
        ? "whitespace-normal px-1 max-w-[15ch] text-[clamp(1.25rem,2.0vw,2.4rem)]"
        : "whitespace-nowrap text-[clamp(1.6rem,2.8vw,3.6rem)]",
    ].join(" ");
  };

  return (
    <section
      id="the-pit"
      className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[900px]"
    >
      {/* BACKGROUND: GHOST GRID (Desktop/Laptop only) */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <div className="absolute inset-0 px-10 py-10 lg:px-12 lg:py-12">
          <div
            className="
              h-full w-full
              grid auto-rows-fr place-items-center
              grid-cols-4 gap-x-12 gap-y-10
              lg:grid-cols-5 lg:gap-x-12 lg:gap-y-12
              xl:grid-cols-6
            "
          >
            {gridWords.map((word, i) => (
              <div key={`${word}-${i}`} className="w-full flex items-center justify-center">
                <motion.div
                  className={wordClasses(word)}
                  style={{ willChange: reduceMotion ? undefined : "opacity, transform" }}
                  animate={
                    reduceMotion
                      ? { opacity: 0.12, scale: 1 }
                      : {
                          opacity: [0, ghost[i].peak, 0],
                          scale: [ghost[i].s1, ghost[i].s2, ghost[i].s1],
                        }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0.01 }
                      : {
                          duration: ghost[i].duration,
                          delay: ghost[i].delay,
                          repeat: Infinity,
                          repeatDelay: ghost[i].repeatDelay,
                          ease: "easeInOut",
                          times: [0, 0.5, 1],
                        }
                  }
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
          <SectionKicker className="bg-hell-black px-4 py-1 border border-hell-gold/30 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            THE FINAL CIRCLE
          </SectionKicker>
        </div>

        {/* --- THE ELEGANT BOX --- */}
        <div className="relative w-full bg-hell-black p-1 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* 1. Outer Border */}
          <div className="absolute inset-0 border border-hell-red/50 pointer-events-none"></div>

          {/* 2. Inner Content Area */}
          <div className="bg-hell-black/90 p-8 md:p-16 text-center border border-hell-white/10 backdrop-blur-md relative overflow-hidden">
            {/* Medieval Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-hell-gold/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-hell-gold/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-hell-gold/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-hell-gold/50"></div>

            {/* Title */}
            <h2 className="font-gothic text-5xl md:text-8xl text-hell-white mb-8 leading-none">
              THE CULT OF <br className="md:hidden" />{" "}
              <span className="text-hell-red">THE BURNED</span>
            </h2>

            {/* Copy */}
            <div className="font-terminal text-lg md:text-xl text-hell-white/70 mb-12 leading-relaxed max-w-3xl mx-auto space-y-6">
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

              <p className="border-l-2 border-hell-gold pl-4 italic text-hell-white">
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
