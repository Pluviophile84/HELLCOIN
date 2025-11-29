"use client";
import { motion } from "framer-motion";

const PTSD_WORDS = [
  "RUG", "DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "PAUSED", "SOFT RUG", 
  "0", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD",
  "PUMP", "DUMP", "EXIT", "PONZI", "VAPORWARE", "MINT"
];

export const ThePit = () => {
  return (
    <section className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[1000px]">
      
      {/* --- BACKGROUND: THE GRID SYSTEM --- */}
      {/* Mobile: 2 Columns | Desktop: 6 Columns */}
      {/* This ensures massive spacing so words never touch */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 grid grid-cols-2 md:grid-cols-6 grid-rows-6 place-items-center h-full w-full p-4">
        {PTSD_WORDS.map((word, i) => (
          <div key={i} className="w-full h-full flex items-center justify-center">
            <motion.div
              // UNIFORM LARGE SIZES
              // Mobile: text-5xl (Big & Clear)
              // Desktop: text-8xl (Massive)
              className="font-gothic font-bold text-black/40 whitespace-nowrap text-5xl md:text-8xl"
              
              // ANIMATION: Fade in/out, Scale up/down
              animate={{ 
                opacity: [0, 0.5, 0], 
                scale: [0.8, 1.2, 0.8], 
              }}
              
              // SPEED: Randomized but generally slow
              transition={{
                duration: 4 + Math.random() * 4, // 4s to 8s duration
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
