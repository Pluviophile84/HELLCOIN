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
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
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
          h-full w-full
          max-w-[1800px]
          mx-auto
          px-4 sm:px-6 lg:px-12
          pt-32 pb-24
          flex flex-col justify-center
        "
      >
        {/* MAIN CONTENT WRAPPER */}
        <div
          className="
            w-full
            max-w-[60rem]
            mx-auto md:ml-auto md:mr-0
            flex flex-col
            items-center md:items-end
            text-center md:text-right
            gap-4
          "
        >
          {/* HERALD: ABANDON HOPE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="
              font-terminal font-black uppercase
              text-[#ffae00] animate-pulse
              tracking-[0.18em]
              text-[clamp(1.4rem,3vw,2.4rem)]
            "
          >
            ABANDON HOPE.
          </motion.p>

          {/* KING: ACQUIRE $666 */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 1.5, delay: 0.3 }}
            className="
              font-gothic
              text-hell-white text-glow drop-shadow-2xl
              leading-[0.9]
              max-w-none
              text-[clamp(3rem,7vw,7rem)]
            "
          >
            ACQUIRE <span className="text-hell-red">$666.</span>
          </motion.h1>

          {/* NARRATIVE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="
              font-terminal text-gray-300
              max-w-[42rem]
              space-y-2
            "
          >
            <p className="leading-relaxed text-[clamp(1.1rem,2.4vw,2.1rem)]">
              The first cryptocurrency powered by{" "}
              <span className="text-[#ffae00] font-semibold">
                Proof-of-Suffering
              </span>{" "}
              — the only consensus mechanism traders truly understand.
            </p>
          </motion.div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="
              mt-8 md:mt-10 lg:mt-12
              flex flex-col md:flex-row
              gap-4 md:gap-6
              justify-center md:justify-end
              items-center
              w-full
            "
          >
            {/* PRIMARY: ACQUIRE $666 — top on mobile, right on desktop */}
            <a
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative
                bg-transparent border-2 border-hell-red
                text-hell-red
                font-gothic uppercase
                overflow-hidden
                cursor-pointer
                flex items-center justify-center gap-2
                hover:text-hell-white
                hover:border-hell-orange
                hover:shadow-[0_0_25px_rgba(204,0,0,0.6)]
                order-1 md:order-2
                px-8 sm:px-9 md:px-10 lg:px-12
                py-3 sm:py-3.5 md:py-4 lg:py-5
                text-[clamp(1.2rem,2.4vw,2.2rem)]
              "
            >
              <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                ACQUIRE $666
              </span>
            </a>

            {/* SECONDARY: ENTER HELL — bottom on mobile, left on desktop */}
            <button
              onClick={handleEnterHell}
              className="
                text-gray-500
                font-terminal
                flex items-center gap-2
                group
                order-2 md:order-1
                hover:text-[#ffae00]
                text-[clamp(1rem,2vw,1.6rem)]
              "
            >
              [ ENTER HELL ]
              <TrendingDown className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fog under content */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};
