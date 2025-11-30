"use client";
import { motion } from "framer-motion";

const PTSD_WORDS_SOURCE = [
  "RUG", "BUY THE DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "WAGMI", "SOFT RUG", 
  "LFG", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD",
  "PUMP", "DUMP", "EXIT", "PONZI", "MOON", "BULLISH"
];

// 5x List for maximum density
const PTSD_WORDS = [...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE];

export const ThePit = () => {
  return (
    <section className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[1000px]">
      
      {/* --- BACKGROUND CONTAINER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* --- THE BRICK WALL GRID --- */}
        {/* MOBILE: w-[120%] -left-[10%] (Zooms in slightly to crop edges)
            DESKTOP: w-full left-0 (Fits perfectly)
        */}
        <div className="absolute top-0 h-full grid content-between p-4
                        w-[120%] -left-[10%] grid-cols-4 gap-y-6 gap-x-0
                        md:w-full md:left-0 md:grid-cols-8 md:px-12">
          
          {PTSD_WORDS.map((word, i) => {
            
            // --- BRICK WALL LOGIC ---
            // We stagger every even row to create the "Brick Wall" look
            // distinct from vertical columns
            const cols = 4; // Calculation based on mobile cols
            const currentRow = Math.floor(i / cols);
            const isEvenRow = currentRow % 2 === 0;

            // Shift even rows to the right
            const staggerClass = isEvenRow ? "translate-x-12 md:translate-x-8" : "";

            return (
              <div key={i} className={`flex items-center justify-center w-full ${staggerClass}`}>
                <motion.div
                  className="font-gothic font-bold text-black/30 whitespace-nowrap text-5xl md:text-6xl"
                  
                  animate={{ 
                    opacity: [0, 0.5, 0], 
                    scale: [0.8, 1.2, 0.8], 
                  }}
                  
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
            );
          })}
        </div>
      </div>

      {/* --- FOREGROUND: CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* NEW: Floating Chapter Marker */}
        <div className="mb-6">
           <span className="bg-black text-hell-white font-terminal text-xl px-4 py-1 border border-hell-white/20 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
             /// THE FINAL CIRCLE
           </span>
        </div>

        {/* Main Content Box */}
        <div className="bg-hell-black border-4 border-black p-8 md:p-12 max-w-3xl mx-4 shadow-[20px_20px_0px_#000]">
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
      </div>
    </section>
  );
};
