"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { SectionKicker } from "../ui/SectionKicker";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), {
  ssr: false,
});

const MotionH2 = dynamic(() => import("framer-motion").then((mod) => mod.motion.h2), {
  ssr: false,
});

const MotionP = dynamic(() => import("framer-motion").then((mod) => mod.motion.p), { ssr: false });

export const ThePit = () => {
  const words = useMemo(
    () => [
      "FORGED BY REGRET",
      "PROOF OF SUFFERING",
      "BORN IN THE RED",
      "ABANDON HOPE",
      "ENTER THE PIT",
      "THE CULT OF THE BURNED",
      "HALL OF PAIN",
      "NINE CIRCLES",
      "THE DEVIL REACTED",
      "STUPIDITY REACHED 666",
    ],
    []
  );

  return (
    <section
      id="the-pit"
      className="hk-section relative overflow-hidden bg-[radial-gradient(1200px_900px_at_20%_10%,rgba(255,60,0,0.14),transparent_60%),radial-gradient(900px_700px_at_80%_15%,rgba(255,174,0,0.06),transparent_55%),linear-gradient(180deg,rgba(5,5,5,1),rgba(10,10,10,1))] py-28"
    >
      {/* animated chant background */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute inset-0">
          <div className="grid h-full w-full grid-cols-2 gap-10 p-10 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0.12, 0.32, 0.16],
                  y: [10, 0, 10],
                }}
                transition={{
                  duration: 4 + (i % 5),
                  repeat: Infinity,
                  delay: i * 0.09,
                  ease: "easeInOut",
                }}
                className="font-gothic text-2xl tracking-widest text-hell-white/10 sm:text-3xl"
              >
                {words[i % words.length]}
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* ember haze */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_0%,rgba(255,60,0,0.22),transparent_60%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <SectionKicker>THE PIT</SectionKicker>

        <MotionH2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-4 text-center font-gothic text-5xl tracking-wide text-hell-white md:text-6xl"
        >
          ENTER <span className="hk-flame-title">THE PIT</span>
        </MotionH2>

        <MotionP
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="mx-auto mt-6 max-w-3xl text-center font-terminal text-xl text-hell-white/70 md:text-2xl"
        >
          This is not a roadmap. It&apos;s a descent.
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          className="hk-ember-edge hk-noise mx-auto mt-14 max-w-4xl rounded-2xl bg-[linear-gradient(180deg,rgba(10,10,10,0.72),rgba(5,5,5,0.92))] p-10 shadow-ember md:p-14"
        >
          <p className="font-terminal text-lg leading-relaxed text-hell-white/80 md:text-xl">
            A journey through regret, delusion, and the sacred art of buying the top.
          </p>

          <p className="mt-6 font-terminal text-lg leading-relaxed text-hell-white/80 md:text-xl">
            One section at a time, the website pulls you deeper — not into enlightenment, but into
            recognition.
          </p>

          <p className="mt-6 font-terminal text-lg leading-relaxed text-hell-white/80 md:text-xl">
            Because the real hell isn&apos;t losing money. It&apos;s thinking you were different.
          </p>
        </MotionDiv>
      </div>
    </section>
  );
};
