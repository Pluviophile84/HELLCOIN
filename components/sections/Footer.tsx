"use client";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-hell-red/20 pt-24 pb-12 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-hell-red/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* --- TOP ROW: BRAND & LINKS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-20 text-center md:text-left">
          
          {/* LEFT: BRAND IDENTITY */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-3">
              <span className="font-gothic text-6xl md:text-8xl text-hell-white tracking-wide leading-none">
                HELLCOIN
              </span>
            </div>
            <p className="font-terminal text-gray-400 max-w-sm text-lg">
              The final destination for the rekt. <br/>
              Born in the red. Forged by regret.
            </p>
          </div>

          {/* RIGHT: NAVIGATION LINKS */}
          <div className="flex flex-row flex-wrap gap-8 md:gap-24 font-terminal justify-center md:justify-start">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {/* FIX: Title is larger and font-semibold (Hierarchy established) */}
              <span className="text-[#ffae00] text-xl uppercase tracking-widest mb-2 font-semibold">
                DIRECTORY
              </span>
              {/* FIX: Links are smaller (text-base) and non-bold (more elegant) */}
              <a href="#genesis" className="text-gray-300 hover:text-hell-red transition-colors text-base">GENESIS</a>
              <a href="#revelation" className="text-gray-300 hover:text-hell-red transition-colors text-base">TRUTH</a>
              <a href="#the-pit" className="text-gray-300 hover:text-hell-red transition-colors text-base">THE PIT</a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              {/* FIX: Title is larger and font-semibold (Hierarchy established) */}
              <span className="text-[#ffae00] text-xl uppercase tracking-widest mb-2 font-semibold">
                PROTOCOL
              </span>
              {/* FIX: Links are smaller (text-base) and non-bold (more elegant) */}
              <a href="https://x.com" target="_blank" className="text-gray-300 hover:text-hell-red transition-colors text-base">TWITTER (X)</a>
              <a href="#" className="text-gray-300 hover:text-hell-red transition-colors text-base">DEXSCREENER</a>
              <a href="#" className="text-gray-300 hover:text-hell-red transition-colors text-base">CONTRACT</a>
            </div>

          </div>
        </div>

        {/* --- BOTTOM ROW: THE DISCLAIMER --- */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          
          {/* Legal Text */}
          <div className="font-terminal text-gray-400 text-sm max-w-2xl leading-relaxed">
            <p className="mb-2">
              <span className="text-hell-red font-bold">DISCLAIMER:</span> $666 is a useless memecoin with no intrinsic value and no expectation of financial return. There is no roadmap, no team, and no utility. 
            </p>
            <p>
              By buying $666, you agree that you are the exit liquidity. If the price goes up, it is luck. If it goes down, it is gravity. Do not email us complaining about your losses; we are busy burning liquidity.
            </p>
          </div>

          {/* Copyright */}
          <div className="font-terminal text-gray-500 text-sm text-center md:text-right whitespace-nowrap">
            <p>© {currentYear} HELLCOIN. ALL RIGHTS BURNED.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
