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
      // Revert to original-style landing (no forced block alignment / no scroll-margin offset).
      genesisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.png"
          alt="Hellcoin Throne"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_center] opacity-100 md:object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black" />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center px-4 text-center md:items-end md:px-12 md:text-right"
      >
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto max-w-4xl space-y-2 font-terminal text-hero-sub text-hell-white md:mx-0 md:max-w-5xl md:space-y-0"
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            <span className="my-2 block text-hero-sub-em font-bold text-hell-gold md:my-0 md:inline md:font-normal">
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-hell-white">the only consensus mechanism traders truly understand.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 animate-pulse font-terminal text-hero-phrase uppercase tracking-widest text-flame md:max-w-5xl"
        >
          <span>WHEN THE MARKET BURNS,</span>{" "}
          <span className="block md:ml-2 md:inline">WE TREND</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex w-full flex-col items-center justify-center gap-8 md:max-w-5xl md:flex-row md:justify-end"
        >
          <button
            type="button"
            onClick={handleAbandonHope}
            className="group order-1 flex items-center gap-2 font-terminal text-xl text-hell-white/50 transition-colors hover:text-hell-gold md:order-none md:text-2xl"
          >
            [ ABANDON HOPE ]
            <TrendingDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </button>

          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative order-2 flex cursor-pointer items-center gap-2 overflow-hidden border-2 border-hell-red bg-transparent px-8 py-4 font-gothic text-2xl uppercase text-hell-red transition-all hover:border-hell-orange hover:text-hell-white hover:shadow-[0_0_30px_rgba(204,0,0,0.6)] md:order-none md:text-3xl"
          >
            <span className="pointer-events-none absolute inset-0 h-full w-full -translate-x-full bg-hell-red transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666 <Flame size={28} />
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 z-20 h-32 w-full bg-gradient-to-t from-hell-black to-transparent" />
    </section>
  );
};
