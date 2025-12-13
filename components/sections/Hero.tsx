"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Flame } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Slight parallax – safe so content doesn’t vanish on short viewports
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleAbandonHope = () => {
    const genesisSection = document.getElementById("genesis");
    if (genesisSection) {
      genesisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const BUY_LINK = "https://raydium.io/swap";

  return (
    <section
      ref={ref}
      className="relative h-screen-safe min-h-[600px] w-full flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/banner.png"
          alt="Hellcoin Throne"
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black" />
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 px-fluid-gap md:pr-[10%] lg:pr-[15%] max-w-[1920px] w-full mx-auto flex flex-col items-center md:items-end text-center md:text-right"
      >
        {/* HEADLINE (UNCHANGED) */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="
            font-gothic leading-[0.9] text-hell-white text-glow drop-shadow-2xl mb-8 w-full
            text-[clamp(2.6rem,5.2vw,4.9rem)]
          "
        >
          BORN IN THE <span className="text-hell-red">RED.</span>
          <br />
          FORGED BY <span className="text-[#ffae00]">REGRET.</span>
        </motion.h1>

        {/* BODY TEXT + PROOF-OF-SUFFERING */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            font-terminal text-gray-300
            max-w-4xl md:max-w-5xl mx-auto md:mx-0
            space-y-2 md:space-y-0
            text-[clamp(1.2rem,1.7vw,1.5rem)]  /* +~20% body text */
          "
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            <span
              className="
                block md:inline my-2 md:my-0
                font-bold md:font-normal
                text-[#ffae00]
                text-[clamp(1.5rem,2.9vw,2.3rem)]  /* +~20% Proof-of-Suffering */
              "
            >
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-gray-300">
            the only consensus mechanism traders truly understand.
          </p>
        </motion.div>

        {/* TAGLINE – CONTROLLED BREAK FOR “WE TREND” (UNCHANGED) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="
            font-terminal text-hell-red mt-8
            tracking-[0.25em] uppercase animate-pulse md:max-w-5xl
            text-[clamp(1.05rem,2.1vw,1.55rem)]
          "
        >
          <span>WHEN THE MARKET BURNS,</span>{" "}
          <span className="block sm:inline text-center sm:text-right">
            WE TREND
          </span>
        </motion.p>

        {/* BUTTONS – STILL UNDER TAILWIND BREAKPOINT RULES */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex flex-col md:flex-row gap-6 md:gap-8 justify-center md:justify-end items-center w-full md:max-w-5xl"
        >
          <button
            onClick={handleAbandonHope}
            className="text-gray-500 font-terminal text-xl md:text-2xl hover:text-[#ffae00] transition-colors flex items-center gap-2 group order-1 md:order-none"
          >
            [ ABANDON HOPE ]
            <TrendingDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>

          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative px-8 py-4 bg-transparent border-2 border-hell-red text-hell-red
              font-gothic text-2xl md:text-3xl uppercase overflow-hidden transition-all
              hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_30px_rgba(204,0,0,0.6)]
              order-2 md:order-none cursor-pointer flex items-center gap-2
            "
          >
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666 <Flame size={28} />
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20" />
    </section>
  );
};
