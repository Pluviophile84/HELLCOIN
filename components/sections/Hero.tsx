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
          // FIX: Preserved the smart crop. Devil stays visible on left.
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] opacity-50" 
          alt="Hellcoin Throne"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        // FIX: Spacing Logic
        // pt-32: Clears Navbar.
        // pb-12/24: Visual lift.
        // max-w-[90%]: Prevents edge-touching on ultrawide.
        className="relative z-30 px-4 md:px-12 pt-32 pb-12 w-full max-w-[1920px] mx-auto flex flex-col items-center md:items-end text-center md:text-right h-full justify-center"
      >
        {/* WRAPPER: Centers subtitle to title */}
        <div className="flex flex-col items-center">
            
            {/* 1. ABANDON HOPE - The "Label" */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                // SCALE: Smooth progression. Not too small on mobile, not comically big on TV.
                className="font-terminal font-black text-[#ffae00] animate-pulse mb-2 tracking-widest uppercase
                           text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center"
            >
                ABANDON HOPE.
            </motion.p>

            {/* 2. MAIN TITLE - The "Titan" */}
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1.5, delay: 0.3 }}
              // SCALE: Starts impactful (5xl), grows steadily. Capped at 9rem for elegance.
              className="font-gothic leading-[0.9] text-hell-white text-glow drop-shadow-2xl mb-6 md:mb-8 md:max-w-6xl text-center
                         text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem]"
            >
              ACQUIRE <span className="text-hell-red">$666.</span>
            </motion.h1>
        </div>

        {/* 3. BODY TEXT - The "Narrative" */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          // SCALE: Kept tight. Body text shouldn't scream. 
          // Starts at base, caps at 2xl.
          className="font-terminal text-gray-300 max-w-lg md:max-w-3xl xl:max-w-4xl mx-auto md:mx-0 space-y-2 md:space-y-1
                     text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            {/* Highlight text is slightly larger/bolder */}
            <span className="block md:inline text-[#ffae00] font-bold md:font-normal
                             text-lg sm:text-xl md:text-2xl lg:text-3xl my-1 md:my-0">
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-gray-300">
            the only consensus mechanism traders truly understand.
          </p>
        </motion.div>

        {/* 4. BUTTONS - The "Interaction" */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 md:mt-12 xl:mt-16 flex flex-col md:flex-row gap-5 md:gap-8 justify-center md:justify-end items-center w-full md:max-w-4xl"
        >
          {/* SECONDARY: "ENTER HELL" - Stacked Bottom on Mobile */}
          <button 
            onClick={handleEnterHell}
            className="text-gray-500 font-terminal hover:text-[#ffae00] transition-colors flex items-center gap-2 group order-2 md:order-1
                       text-sm sm:text-base md:text-xl lg:text-2xl"
          >
            [ ENTER HELL ]
            <TrendingDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* PRIMARY: "ACQUIRE" - Stacked Top on Mobile */}
          <a 
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            // SCALE: Padding increases naturally. Text stays legible without becoming a billboard.
            className="group relative bg-transparent border-2 border-hell-red text-hell-red font-gothic uppercase overflow-hidden transition-all hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_30px_rgba(204,0,0,0.6)] order-1 md:order-2 cursor-pointer flex items-center gap-2
                       px-6 py-2 text-xl           
                       sm:px-8 sm:py-3 sm:text-2xl   
                       md:px-10 md:py-4 md:text-3xl 
                       xl:px-12 xl:py-5 xl:text-4xl"
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
