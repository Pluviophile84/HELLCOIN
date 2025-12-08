"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Flame } from "lucide-react";

export const Hero = () => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // FIX: Renamed function to match the button usage below
  const handleEnterHell = () => {
    const genesisSection = document.getElementById("genesis");
    if (genesisSection) {
      genesisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const BUY_LINK = "https://raydium.io/swap";

  return (
    <section ref={ref} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/banner.png" 
          // FIX: Preserved the smart crop for the Devil character
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] opacity-50" 
          alt="Hellcoin Throne"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        // FIX: Added 'pb-24' to push the optical center upwards slightly on all screens
        className="relative z-30 px-4 md:px-12 pt-32 pb-24 max-w-[1800px] w-full mx-auto flex flex-col items-center md:items-end text-center md:text-right h-full justify-center"
      >
        {/* WRAPPER: Centers the subtitle relative to the main title */}
        <div className="flex flex-col items-center">
            {/* 1. ABANDON HOPE - SCALED UP ONE STEP */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                // BASE: text-2xl (Was xl) -> 2XL: text-6xl (Was 5xl)
                className="font-terminal font-black text-[#ffae00] animate-pulse mb-2 tracking-widest uppercase
                           text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center"
            >
                ABANDON HOPE.
            </motion.p>

            {/* 2. MAIN TITLE - ACQUIRE $666 - SCALED UP ONE STEP */}
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1.5, delay: 0.3 }}
              // BASE: text-6xl (Was 5xl) -> 2XL: text-[12rem] (Was 11rem)
              className="font-gothic leading-[0.9] text-hell-white text-glow drop-shadow-2xl mb-6 md:mb-8 md:max-w-7xl text-center
                         text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem]"
            >
              ACQUIRE <span className="text-hell-red">$666.</span>
            </motion.h1>
        </div>

        {/* 3. SUBTITLE - SCALED UP ONE STEP */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          // BASE: text-xl (Was lg) -> 2XL: text-5xl (Was 4xl)
          className="font-terminal text-gray-300 max-w-4xl md:max-w-5xl mx-auto md:mx-0 space-y-2 md:space-y-1
                     text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            <span className="block md:inline text-[#ffae00] font-bold md:font-normal
                             text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl my-2 md:my-0">
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-gray-300">
            the only consensus mechanism traders truly understand.
          </p>
        </motion.div>

        {/* 4. BUTTONS - SCALED UP ONE STEP */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 md:mt-12 xl:mt-16 flex flex-col md:flex-row gap-6 md:gap-8 justify-center md:justify-end items-center w-full md:max-w-5xl"
        >
          {/* SECONDARY: "ENTER HELL" */}
          <button 
            onClick={handleEnterHell}
            className="text-gray-500 font-terminal hover:text-[#ffae00] transition-colors flex items-center gap-2 group order-1 md:order-none
                       text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          >
            [ ENTER HELL ]
            <TrendingDown className="w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* PRIMARY: "ACQUIRE" */}
          <a 
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            // BASE: text-2xl + px-8 (Was xl + px-6)
            className="group relative bg-transparent border-2 border-hell-red text-hell-red font-gothic uppercase overflow-hidden transition-all hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_30px_rgba(204,0,0,0.6)] order-2 md:order-none cursor-pointer flex items-center gap-2
                       px-8 py-3 text-2xl
                       sm:px-10 sm:py-4 sm:text-3xl
                       md:px-12 md:py-5 md:text-4xl
                       xl:px-14 xl:py-6 xl:text-5xl"
          >
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};
