"use client";
import { motion } from "framer-motion";

// 1. CONFIG: Paste your X (Twitter) Link here
const X_LINK = "https://x.com/YOUR_PROFILE";

const PTSD_WORDS_SOURCE = [
  "RUG", "BUY THE DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "WAGMI", "SOFT RUG", 
  "LFG", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD",
  "PUMP", "DUMP", "EXIT", "PONZI", "MOON", "BULLISH"
];

// 3x List for background density
const PTSD_WORDS = [...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE];

export const ThePit = () => {
  return (
    <section id="the-pit" className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[900px]">
      
      {/* --- BACKGROUND: GHOST GRID (Preserved the stable version) --- */}
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

      {/* --- FOREGROUND: THE MEDIEVAL DECREE --- */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full px-4">
        
        {/* Header Label */}
        <div className="mb-12">
           <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase bg-black px-4 py-1 border border-[#ffae00]/30 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
             /// THE_FINAL_CIRCLE ///
           </span>
        </div>

        {/* --- THE ELEGANT BOX --- */}
        <div className="relative w-full bg-hell-black p-1">
          
          {/* 1. Outer Border (Dark Red Structure) */}
          <div className="absolute inset-0 border border-hell-red/50 pointer-events-none"></div>
          
          {/* 2. Inner Content Area */}
          <div className="bg-black/90 p-8 md:p-16 text-center border border-gray-800 backdrop-blur-md relative overflow-hidden">
            
            {/* Medieval Corner Accents (Gold) */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ffae00]/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ffae00]/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ffae00]/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ffae00]/50"></div>

            {/* Title */}
            <h2 className="font-gothic text-5xl md:text-8xl text-hell-white mb-8">
              THE LEGION OF <span className="text-hell-red">THE DAMNED</span>
            </h2>
            
            {/* Elegant Copy */}
            <p className="font-terminal text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Hellcoin is not just a token. It is a sanctuary. <br className="hidden md:block"/>
              A place where projects go when they die, and where the rekt find company.
              <br/><br/>
              <span className="text-[#ffae00]">We do not promise the moon. We promise the heat.</span>
            </p>
            
            {/* X (Twitter) Button */}
            <div className="flex justify-center">
              <a 
                href={X_LINK}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 bg-hell-red/10 border border-hell-red hover:bg-hell-red text-hell-white font-gothic text-2xl md:text-3xl px-12 py-4 transition-all duration-300 active:scale-95"
              >
                {/* SVG Logo for X */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                JOIN THE COMMUNITY
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
