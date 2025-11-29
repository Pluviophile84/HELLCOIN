"use client";
import { motion } from "framer-motion";

const PTSD_WORDS_SOURCE = [
  "RUG", "DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "PAUSED", "SOFT RUG", 
  "0", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD",
  "PUMP", "DUMP", "EXIT", "PONZI", "VAPORWARE", "MINT"
];

// 4x the list for maximum density
const PTSD_WORDS = [...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE];

export const ThePit = () => {
  return (
    <section className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[1000px]">
      
      {/* --- BACKGROUND CONTAINER --- */}
      {/* overflow-hidden clips the edges so we don't get horizontal scroll bars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* --- THE GRID (THE CANVAS) --- */}
        {/* TRICK: w-[150%] on mobile + -left-[25%] 
            This makes the grid wider than the phone screen and centers it.
            It creates the "Cropped Canvas" effect you wanted.
            No empty sides, just a wall of text.
        */}
        <div className="absolute top-0 h-full grid content-between p-4
                        w-[160%] -left-[30%] grid-cols-4 gap-4 
                        md:w-full md:left-0 md:grid-cols-8">
          
          {PTSD_WORDS.map((word, i) => (
            <div key={i} className="flex items-center justify-center">
              <motion.div
                // SIZING:
                // Mobile: text-5xl (Massive, because we zoomed in)
                // Desktop: text-6xl
                className="font-gothic font-bold text-black/30 whitespace-nowrap text-5xl md:text-6xl"
                
                // ANIMATION: Simple Fade In/Out
                animate={{ 
                  opacity: [0, 0.5, 0], 
                  scale: [0.8, 1.2, 0.8], 
                }}
                
                // TIMING: Randomized loop
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOREGROUND: CONTENT BOX --- */}
      <div className="relative z-10 bg-hell-black border-4 border-black p-8 md:p-12 max-w-3xl mx-4 shadow-[20px_20px_0px_#000]">
        <h2 className="font-gothic text-5xl md:text-7xl text-hell-white mb-6 text-center">
          DO YOU QUALIFY?
        </h2>
        
        <ul className="space-y-4 font-terminal text-xl text-gray-400 mb-8 border-b border-gray-800 pb-8">
          {[
            "You bought the top because you felt invincible.",
            "You sold the bottom because you felt fear.",
            "You own at least 3 wallets you are too scared to open.",
            "You have lost more money on gas fees than you spend on food.",
            "You are reading this right now hoping this is 'The One'."
          ].map((item, i) => (
             <li key={i} className="flex gap-3 items-start">
               <span className="text-hell-red font-bold text-xl">X</span> 
               <span>{item}</span>
             </li>
          ))}
        </ul>
        
        <div className="text-center">
           <p className="font-terminal text-2xl text-hell-gold mb-6 animate-pulse">
             CONGRATULATIONS. YOU BELONG HERE.
           </p>
           <button className="bg-hell-red text-hell-white font-gothic text-3xl px-12 py-4 hover:bg-hell-orange hover:scale-105 transition-all w-full md:w-auto shadow-xl border-2 border-black">
             JOIN THE PIT (TELEGRAM)
           </button>
        </div>
      </div>
    </section>
  );
};
