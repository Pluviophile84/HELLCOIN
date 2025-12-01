"use client";
import { motion } from "framer-motion";

const PTSD_WORDS_SOURCE = [
  "RUG", "BUY THE DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "WAGMI", "SOFT RUG", 
  "LFG", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD",
  "PUMP", "DUMP", "EXIT", "PONZI", "MOON", "BULLISH"
];

// 5x List for density
const PTSD_WORDS = [...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE];

export const ThePit = () => {
  return (
    <section id="the-pit" className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[1000px]">
      
      {/* --- BACKGROUND GRID (Preserved) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 h-full grid content-center p-4
                        w-[140%] -left-[20%] grid-cols-3 gap-8
                        md:w-full md:left-0 md:grid-cols-6 md:gap-12">
          {PTSD_WORDS.map((word, i) => (
            <div key={i} className="flex items-center justify-center w-full h-20 md:h-32">
              <motion.div
                className="font-gothic font-bold text-black/30 whitespace-nowrap text-5xl md:text-7xl"
                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOREGROUND: INDUSTRIAL HUD --- */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full px-4">
        
        {/* Header Label */}
        <div className="mb-8">
           <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase bg-black px-4 py-1 border border-[#ffae00]/30">
             /// THE_FINAL_CIRCLE ///
           </span>
        </div>

        {/* --- THE HUD BOX --- */}
        <div className="relative w-full bg-hell-black/95 p-8 md:p-12 border border-gray-800 backdrop-blur-sm">
          
          {/* CORNER BRACKETS (The Targeting Look) */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-hell-red"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-hell-red"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-hell-red"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-hell-red"></div>

          {/* STATUS BAR */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-8">
            <span className="font-terminal text-gray-500 text-sm">TARGET_ID: VISITOR</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="font-terminal text-hell-red text-sm">SYSTEM_SCAN: COMPLETE</span>
            </div>
          </div>

          <h2 className="font-gothic text-5xl md:text-7xl text-hell-white mb-8 text-center">
            DO YOU QUALIFY?
          </h2>
          
          <ul className="space-y-4 font-terminal text-xl text-gray-400 mb-10 border-b border-gray-800 pb-8">
            {[
              "You bought the top because you felt invincible.",
              "You sold the bottom because you felt fear.",
              "You own at least 3 wallets you are too scared to open.",
              "You have lost more money on gas fees than you spend on food.",
              "You are reading this right now hoping this is 'The One'."
            ].map((item, i) => (
               <li key={i} className="flex gap-4 items-start">
                 <span className="text-hell-red font-bold text-xl mt-1">[X]</span> 
                 <span>{item}</span>
               </li>
            ))}
          </ul>
          
          <div className="text-center">
             <p className="font-terminal text-2xl text-[#ffae00] mb-6">
               STATUS: IRREDEEMABLE. WELCOME HOME.
             </p>
             <button className="bg-hell-red text-hell-white font-gothic text-3xl px-12 py-4 hover:bg-hell-orange hover:scale-105 transition-all w-full md:w-auto shadow-[0_0_20px_rgba(204,0,0,0.4)]">
               JOIN THE PIT (TELEGRAM)
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};
