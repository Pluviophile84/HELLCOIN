"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingDown } from "lucide-react";

export const Hero = () => {
  const ref = useRef(null);
  
  // Parallax Effect Hooks
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Text moves slower than background for depth
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* The Actual Banner Image */}
        <img 
          src="/banner.png" 
          className="absolute inset-0 w-full h-full object-cover opacity-100" 
          alt="Hellcoin Throne"
        />
        
        {/* Gradient Overlay 1: Fade from bottom black to transparent (makes text readable) */}
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent"></div>
        
        {/* Gradient Overlay 2: Vignette (darkens corners) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-4 max-w-6xl"
      >
        {/* Top Tagline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-terminal text-hell-gold text-xl md:text-2xl mb-4 tracking-[0.2em] animate-pulse"
        >
          /// ABANDON HOPE ///
        </motion.h2>

        {/* Main Title (Exploding Animation) */}
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="font-gothic text-8xl md:text-[10rem] leading-[0.85] text-hell-white text-glow drop-shadow-2xl mb-8"
        >
          ACQUIRE <span className="text-hell-red">$666</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-terminal text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto"
        >
          Welcome to Hell. At least here, the candles are always red.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          {/* Primary Button */}
          <button className="group relative px-8 py-4 bg-transparent border-2 border-hell-red text-hell-red font-gothic text-2xl uppercase overflow-hidden transition-all hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_30px_rgba(204,0,0,0.6)]">
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center gap-2">
              ENTER THE INFERNO <TrendingDown size={24} />
            </span>
          </button>
          
          {/* Secondary Button */}
          <button className="text-hell-white font-terminal text-xl underline decoration-hell-gold hover:text-hell-gold underline-offset-4 transition-colors">
            VIEW CHART (IF YOU DARE)
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Fog Fade to blend into next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20"></div>
    </section>
  );
};
