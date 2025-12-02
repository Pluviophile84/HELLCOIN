"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Flame } from "lucide-react";

export const Hero = () => {
  const ref = useRef(null);
  
  // Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/WEB-BANNER.jpg" 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          alt="Hellcoin Throne"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-4 max-w-6xl"
      >
        {/* 1. MAIN TITLE */}
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="font-gothic text-6xl md:text-9xl leading-[0.9] text-hell-white text-glow drop-shadow-2xl mb-8"
        >
          BORN IN THE <span className="text-hell-red">RED.</span><br />
          FORGED BY REGRET.
        </motion.h1>

        {/* 2. SUBTITLE 1 (The Definition) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-terminal text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto space-y-2"
        >
          <p>
            The first cryptocurrency powered by <span className="text-[#ffae00]">Proof-of-Suffering</span> —
          </p>
          <p className="text-gray-500">
            the only consensus mechanism traders truly understand.
          </p>
        </motion.div>

        {/* 3. PUNCHLINE (The Trend) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="font-terminal text-hell-red text-lg md:text-2xl mt-8 tracking-widest uppercase animate-pulse"
        >
          /// WHEN THE MARKET BURNS, WE TREND ///
        </motion.p>

        {/* 4. BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex flex-col md:flex-row gap-8 justify-center items-center"
        >
          {/* PRIMARY: ACQUIRE */}
          <button className="group relative px-8 py-4 bg-transparent border-2 border-hell-red text-hell-red font-gothic text-2xl md:text-3xl uppercase overflow-hidden transition-all hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_30px_rgba(204,0,0,0.6)]">
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666 <Flame size={28} />
            </span>
          </button>
          
          {/* SECONDARY: ABANDON HOPE */}
          <button className="text-gray-500 font-terminal text-xl md:text-2xl hover:text-[#ffae00] transition-colors flex items-center gap-2 group">
            [ ABANDON HOPE ]
            <TrendingDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Fog Fade */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20"></div>
    </section>
  );
};
