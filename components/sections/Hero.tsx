"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingDown } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleEnterHell = () => {
    const genesisSection = document.getElementById("genesis");
    if (genesisSection) {
      genesisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const BUY_LINK = "https://raydium.io/swap";

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/banner.png"
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] opacity-50"
          alt="Hellcoin Throne"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="
          relative z-30
          px-4 sm:px-6 lg:px-12
          pt-28 pb-16
          max-w-[1200px] w-full mx-auto
          flex flex-col
          items-center md:items-end
          text-center md:text-right
          h-full justify-center
        "
      >
        {/* TITLE BLOCK */}
        <div className="flex flex-col items-center md:items-end gap-3 w-full">
          {/* H2 – ABANDON HOPE (smaller, narrower, clear sub-head) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="
              font-terminal font-black uppercase tracking-[0.18em]
              text-[#ffae00] animate-pulse
              max-w-[18ch]
              text-base
              sm:text-lg
              md:text-xl
              lg:text-2xl
            "
          >
            ABANDON HOPE.
          </motion.p>

          {/* H1 – ACQUIRE $666 (dominant, bold, but not insane) */}
          <motion.h1
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 1.4, delay: 0.3 }}
            className="
              font-gothic text-hell-white text-glow drop-shadow-2xl
              leading-[0.9]
              max-w-[16ch]
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-7xl
            "
          >
            ACQUIRE <span className="text-hell-red">$666.</span>
          </motion.h1>
        </div>

        {/* SUBTITLE / BODY – readable, secondary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="
            mt-4
            font-terminal text-gray-300
            max-w-[40rem]
            mx-auto md:mx-0
            space-y-1.5
          "
        >
          <p
            className="
              leading-relaxed
              text-sm
              sm:text-base
              md:text-lg
              lg:text-xl
            "
          >
            The first cryptocurrency powered by{" "}
            <span className="text-[#ffae00] font-semibold">
              Proof-of-Suffering
            </span>
            {" — the only consensus mechanism traders truly understand."}
          </p>
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="
            mt-8 md:mt-10
            flex flex-col md:flex-row
            gap-4 md:gap-6
            justify-center md:justify-end
            items-center
            w-full md:max-w-[40rem]
            mx-auto md:mx-0
          "
        >
          {/* PRIMARY CTA – elegant, bold, not chunky */}
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative
              bg-transparent border border-hell-red
              text-hell-red
              font-gothic uppercase
              overflow-hidden
              cursor-pointer
              flex items-center justify-center gap-2
              hover:text-hell-white
              hover:border-hell-orange
              hover:shadow-[0_0_18px_rgba(204,0,0,0.6)]
              order-1 md:order-2
              px-6 sm:px-7 md:px-8
              py-2.5 sm:py-3
              text-sm
              sm:text-base
              md:text-lg
            "
          >
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666
            </span>
          </a>

          {/* SECONDARY CTA – same visual weight in text, different style */}
          <button
            onClick={handleEnterHell}
            className="
              text-gray-500
              font-terminal
              flex items-center gap-2
              group
              order-2 md:order-1
              hover:text-[#ffae00]
              text-sm
              sm:text-base
              md:text-lg
            "
          >
            [ ENTER HELL ]
            <TrendingDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom fog */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};
