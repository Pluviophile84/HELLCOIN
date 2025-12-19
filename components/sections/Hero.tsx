"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { TrendingDown, Flame } from "lucide-react";

import { BUY_LINK } from "@/lib/constants";

export const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleAbandonHope = () => {
    const genesisSection = document.getElementById("genesis");
    if (genesisSection) {
      genesisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="hk-noise relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND BANNER + OVERLAYS */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.png"
          alt="Hellcoin Throne"
          fill
          priority
          sizes="100vw"
          // On small screens, bias the crop slightly left of center (30%). On md+, keep it anchored left.
          className="object-cover object-[30%_center] opacity-100 md:object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black" />
      </div>

      {/* AMBIENT HEAT (decorative) */}
      <div aria-hidden="true" className="hk-heat-blob pointer-events-none z-0" />

      {/* CONTENT */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 mx-auto w-full max-w-[1600px] px-4 md:px-12"
      >
        <div className="flex w-full items-center justify-center md:justify-end">
          <div className="hk-ember-edge hk-noise w-full max-w-4xl rounded-2xl bg-[linear-gradient(180deg,rgba(10,10,10,0.78),rgba(5,5,5,0.55))] p-6 text-center shadow-deep backdrop-blur-md sm:p-8 md:max-w-[min(740px,46vw)] md:p-10 md:text-right">
            {/* MAIN HEADER (CLAMPED) */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1.3 }}
              className="text-glow mb-6 font-gothic text-hero-h1 leading-[0.9] text-hell-white drop-shadow-2xl"
            >
              BORN IN THE <span className="text-hell-red">RED.</span>
              <br />
              FORGED BY <span className="text-hell-gold">REGRET.</span>
            </motion.h1>

            {/* BODY TEXT + PROOF-OF-SUFFERING (CLAMPED) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="space-y-2 font-terminal text-hero-sub text-hell-white/90 md:space-y-0"
            >
              <p className="leading-relaxed">
                The first cryptocurrency powered by{" "}
                <span className="my-2 block text-hero-sub-em font-bold text-hell-gold md:my-0 md:inline md:font-normal">
                  Proof of Suffering
                </span>
              </p>
              <p className="text-hell-white">
                the only consensus mechanism traders truly understand.
              </p>
            </motion.div>

            {/* WHEN THE MARKET BURNS */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="mt-7 animate-ember-flicker text-center font-terminal text-hero-phrase uppercase tracking-widest text-flame drop-shadow-[0_0_16px_rgba(255,60,0,0.25)] motion-reduce:animate-none"
            >
              <span>WHEN THE MARKET BURNS,</span>{" "}
              <span className="block md:ml-2 md:inline">WE TREND</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.45, ease: "easeOut" }}
              className="mt-10 flex w-full flex-col items-center justify-center gap-6 md:flex-row md:justify-end"
            >
              <button
                type="button"
                onClick={handleAbandonHope}
                className="group inline-flex items-center gap-2 rounded-full bg-hell-black/35 px-4 py-2 font-terminal text-xl text-hell-white/85 shadow-[0_0_0_1px_rgba(255,255,255,0.10)] backdrop-blur-sm transition-all hover:text-hell-white hover:shadow-[0_0_0_1px_rgba(255,60,0,0.30)]"
              >
                [ ABANDON HOPE ]
                <TrendingDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
              </button>

              <a
                href={BUY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hk-ember-edge group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(10,10,10,0.55))] px-8 py-4 font-gothic text-2xl uppercase text-hell-white shadow-ember ring-1 ring-hell-red/45 transition-all hover:shadow-ember-strong md:text-3xl"
              >
                <span className="pointer-events-none absolute inset-0 h-full w-full -translate-x-full bg-[linear-gradient(90deg,rgba(204,0,0,0.0),rgba(255,60,0,0.92),rgba(255,174,0,0.75),rgba(255,60,0,0.9))] transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 flex items-center gap-2">
                  ACQUIRE $666 <Flame size={28} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM FADE INTO PAGE */}
      <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-hell-black to-transparent" />
    </section>
  );
};
