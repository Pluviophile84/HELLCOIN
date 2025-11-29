"use client";
import { motion } from "framer-motion";

const PTSD_WORDS_SOURCE = [
  "RUG", "DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "PAUSED", "SOFT RUG", 
  "0", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD",
  "PUMP", "DUMP", "EXIT", "PONZI", "VAPORWARE", "MINT"
];

// TRIPLE the list for density (72 words)
const PTSD_WORDS = [...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE];

export const ThePit = () => {
  return (
    <section className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[1000px]">
      
      {/* --- BACKGROUND GRID --- */}
      {/* Mobile: 3 Columns | Desktop: 8 Columns */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 grid grid-cols-3 md:grid-cols-8 gap-1 p-2 h-full w-full content-between">
        {PTSD_WORDS.map((word, i) => {
          
          // --- ZIG-ZAG ALIGNMENT LOGIC ---
          // This prevents "Vertical Towers" by shifting alignment based on column position
          let alignmentClass = "justify-center"; // Default (Middle columns)
          
          // Mobile Logic (3 Cols)
          if (i % 3 === 0) alignmentClass = "justify-end pr-2"; // Left Col -> Push Right
          if (i % 3 === 2) alignmentClass = "justify-start pl-2"; // Right Col -> Push Left
          
          return (
            <div key={i} className={`flex items-center w-full ${alignmentClass}`}>
              <motion.div
                // SIZING:
                // Mobile: text-2xl/3xl (Smaller to fit 3 cols comfortably)
                // Desktop: text-5xl/6xl (Massive)
                className="font-gothic font-bold text-black/30 whitespace-nowrap text-2xl md:text-6xl"
                
                // ANIMATION: Ghostly fade in/out
                animate={{ 
                  opacity: [0, 0.4, 0], 
                  scale: [0.8, 1.1, 0.8], 
                }}
                
                // TIMING: "Snake" Pattern
                // i * 0.1 adds a slight sequential delay (Left->Right flow)
                // Math.random() adds just enough chaos so it's not a robot scan
                transition={{
                  duration: 3 + Math.random() * 3, // Faster pulsing (3-6s)
                  repeat: Infinity,
                  delay: (i * 0.05) + (Math.random() * 2), 
                  ease: "easeInOut",
                }}
              >
                {word}
              </motion.div>
            </div>
          );
        })}
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
