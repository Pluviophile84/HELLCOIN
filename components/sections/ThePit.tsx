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
      className="relative flex min-h-[900px] items-center justify-center overflow-hidden bg-hell-red py-32"
    >
      {/* BACKGROUND: GHOST GRID (Desktop/Laptop only) */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <div className="absolute inset-0 px-10 py-10 lg:px-12 lg:py-12">
          <div className="grid h-full w-full auto-rows-fr grid-cols-4 place-items-center gap-x-12 gap-y-10 lg:grid-cols-5 lg:gap-x-12 lg:gap-y-12 xl:grid-cols-6">
            {gridWords.map((word, i) => (
              <div key={`${word}-${i}`} className="flex w-full items-center justify-center">
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
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4">
        {/* Header Label */}
        <div className="mb-12">
          <SectionKicker className="border border-hell-gold/30 bg-hell-black px-4 py-1 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            THE FINAL CIRCLE
          </SectionKicker>
        </div>

        {/* --- THE ELEGANT BOX --- */}
        <div className="relative w-full bg-hell-black p-1 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* 1. Outer Border */}
          <div className="pointer-events-none absolute inset-0 border border-hell-red/50"></div>

          {/* 2. Inner Content Area */}
          <div className="relative overflow-hidden border border-hell-white/10 bg-hell-black/90 p-8 text-center backdrop-blur-md md:p-16">
            {/* Medieval Corner Accents */}
            <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-hell-gold/50"></div>
            <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-hell-gold/50"></div>
            <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-hell-gold/50"></div>
            <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-hell-gold/50"></div>

            {/* Title */}
            <h2 className="mb-8 font-gothic text-5xl leading-none text-hell-white md:text-8xl">
              THE CULT OF <br className="md:hidden" />{" "}
              <span className="text-hell-red">THE BURNED</span>
            </h2>

            {/* Copy */}
            <div className="mx-auto mb-12 max-w-3xl space-y-6 font-terminal text-lg leading-relaxed text-hell-white/70 md:text-xl">
              <p>
                Welcome to the only corner of crypto where everyone finally stops pretending. Here,
                we don’t hide our losses — we frame them as{" "}
                <span className="font-bold text-white">character development.</span>
              </p>

              <p>
                <span className="font-bold text-hell-red">HELLCOIN</span> is a home for the
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

              <p className="pt-4 text-2xl font-bold text-white">
                If you’ve been burned, you belong here.
                <br />
                If you haven’t, you will.
              </p>

              <p className="text-sm uppercase tracking-widest text-hell-red/80">
                Misery needs company. Hellcoin provides it.
              </p>
            </div>

            {/* X (Twitter) Button */}
            <div className="flex w-full justify-center">
              <a
                href={X_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-3 border border-hell-red bg-hell-red/10 px-6 py-3 font-gothic text-xl text-hell-white shadow-[0_0_20px_rgba(204,0,0,0.2)] transition-all duration-300 hover:bg-hell-red hover:shadow-[0_0_30px_rgba(204,0,0,0.6)] active:scale-95 md:w-auto md:px-12 md:py-4 md:text-3xl"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current md:h-6 md:w-6">
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
