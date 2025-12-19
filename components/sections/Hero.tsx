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
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center px-4 text-center md:items-end md:px-12 md:text-right md:before:absolute md:before:bottom-[-44px] md:before:right-[48px] md:before:top-[-44px] md:before:-z-10 md:before:w-[min(740px,46vw)] md:before:rounded-2xl md:before:border md:before:border-hell-red/20 md:before:bg-[linear-gradient(180deg,rgba(10,10,10,0.78),rgba(5,5,5,0.55))] md:before:shadow-deep md:before:backdrop-blur-md md:before:content-['']"
      >
        {/* MAIN HEADER (CLAMPED) */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="text-glow mb-8 font-gothic text-hero-h1 leading-[0.9] text-hell-white drop-shadow-2xl md:max-w-6xl"
        >
          BORN IN THE <span className="text-hell-red">RED.</span>
          <br />
          FORGED BY <span className="text-hell-gold">REGRET.</span>
        </motion.h1>

        {/* BODY TEXT + PROOF-OF-SUFFERING (CLAMPED) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto max-w-4xl space-y-2 font-terminal text-hero-sub text-hell-white/90 md:mx-0 md:max-w-5xl md:space-y-0 md:rounded-xl md:bg-hell-black/25 md:p-5 md:shadow-[0_0_0_1px_rgba(255,60,0,0.12)] md:backdrop-blur-sm"
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            <span className="my-2 block text-hero-sub-em font-bold text-hell-gold md:my-0 md:inline md:font-normal">
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-hell-white">the only consensus mechanism traders truly understand.</p>
        </motion.div>

        {/* WHEN THE MARKET BURNS (CONTROLLED BREAK + CLAMPED) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 animate-ember-flicker font-terminal text-hero-phrase uppercase tracking-widest text-flame drop-shadow-[0_0_16px_rgba(255,60,0,0.25)] motion-reduce:animate-none md:max-w-5xl"
        >
          <span>WHEN THE MARKET BURNS,</span>{" "}
          <span className="block md:ml-2 md:inline">WE TREND</span>
        </motion.p>

        {/* CTAs (BUTTON TEXT NOT CLAMPED) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex w-full flex-col items-center justify-center gap-8 md:max-w-5xl md:flex-row md:justify-end"
        >
          <button
            type="button"
            onClick={handleAbandonHope}
            className="group order-1 inline-flex items-center gap-2 rounded-full bg-hell-black/30 px-4 py-2 font-terminal text-xl text-hell-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all hover:text-hell-white hover:shadow-[0_0_0_1px_rgba(255,60,0,0.25)] md:order-none md:text-2xl"
          >
            [ ABANDON HOPE ]
            <TrendingDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </button>

          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hk-ember-edge group relative order-2 flex cursor-pointer items-center gap-2 overflow-hidden rounded-2xl bg-hell-black/20 px-8 py-4 font-gothic text-2xl uppercase text-hell-white transition-all hover:bg-hell-black/35 hover:shadow-ember-strong md:order-none md:text-3xl"
          >
            <span className="pointer-events-none absolute inset-0 h-full w-full -translate-x-full bg-[linear-gradient(90deg,rgba(204,0,0,0.0),rgba(204,0,0,0.92),rgba(255,60,0,0.9))] transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666 <Flame size={28} />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* BOTTOM FADE INTO PAGE */}
      <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-hell-black to-transparent" />
    </section>
  );
};
