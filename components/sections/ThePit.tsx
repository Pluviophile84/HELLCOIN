"use client";
import { motion } from "framer-motion";

const X_LINK = "https://x.com/YOUR_PROFILE";

const PTSD_WORDS_SOURCE = [
  "RUG", "BUY THE DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "WAGMI", "SOFT RUG", 
  "LFG", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD",
  "PUMP", "DUMP", "EXIT", "PONZI", "MOON", "BULLISH"
];

const PTSD_WORDS = [...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE, ...PTSD_WORDS_SOURCE];

export const ThePit = () => {
  return (
    <section id="the-pit" className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[900px]">
      
      {/* BACKGROUND: GHOST GRID */}
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

      {/* FOREGROUND: THE MEDIEVAL DECREE */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full px-4">
        
        {/* Header Label */}
        <div className="mb-12">
           <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase bg-black px-4 py-1 border border-[#ffae00]/30 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] font-bold">
             THE FINAL CIRCLE
           </span>
        </div>

        {/* --- THE ELEGANT BOX --- */}
        <div className="relative w-full bg-hell-black p-1 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* 1. Outer Border */}
          <div className="absolute inset-0 border border-hell-red/50 pointer-events-none"></div>
          
          {/* 2. Inner Content Area */}
          <div className="bg-black/90 p-8 md:p-16 text-center border border-gray-800 backdrop-blur-md relative overflow-hidden">
            
            {/* Medieval Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ffae00]/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ffae00]/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ffae00]/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ffae00]/50"></div>

            {/* Title */}
            <h2 className="font-gothic text-5xl md:text-8xl text-hell-white mb-8 leading-none">
              THE CULT OF <br className="md:hidden" /> <span className="text-hell-red">THE BURNED</span>
            </h2>
            
            {/* Meaningful Copy (Updated) */}
            <div className="font-terminal text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                Welcome to the only corner of crypto where everyone finally stops pretending.
                Here, we don’t hide our losses — we frame them as <span className="text-white font-bold">character development.</span>
              </p>
              
              <p>
                <span className="text-hell-red font-bold">HELLCOIN</span> is a home for the overleveraged, the rugged, the delusional, and the eternally optimistic. A sanctuary for those who keep making the same mistakes with confidence, pride, and a complete lack of learning curve.
              </p>

              <p className="border-l-2 border-[#ffae00] pl-4 italic text-gray-300">
                We don’t judge. We recognize the pattern. We’ve lived the pattern.
              </p>

              <p>
                This is a community built on shared suffering, recycled hope, and the sacred ritual of doing it all again tomorrow.
              </p>

              <p className="text-white text-2xl font-bold pt-4">
                If you’ve been burned, you belong here.<br/>
                If you haven’t, you will.
              </p>
              
              <p className="text-hell-red/80 text-sm uppercase tracking-widest">
                Misery needs company. Hellcoin provides it.
              </p>
            </div>
            
            {/* X (Twitter) Button */}
            <div className="flex justify-center w-full">
              <a 
                href={X_LINK}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-hell-red/10 border border-hell-red hover:bg-hell-red text-hell-white font-gothic transition-all duration-300 active:scale-95 w-full md:w-auto text-xl md:text-3xl py-3 px-6 md:py-4 md:px-12 shadow-[0_0_20px_rgba(204,0,0,0.2)] hover:shadow-[0_0_30px_rgba(204,0,0,0.6)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-current shrink-0">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="md:hidden">ENTER</span>
                <span className="hidden md:inline">ENTER THE SANCTUARY</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
