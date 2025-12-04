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
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          
          {/* LEFT: BRAND IDENTITY */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/GOAPE.png" 
                alt="Hellcoin" 
                className="w-12 h-12 rounded-full border border-hell-red grayscale opacity-80" 
              />
              <span className="font-gothic text-4xl text-hell-white tracking-wide">
                HELLCOIN
              </span>
            </div>
            <p className="font-terminal text-gray-500 max-w-sm text-lg">
              The final destination for the rekt. <br/>
              Born in the red. Forged by regret.
            </p>
          </div>

          {/* RIGHT: NAVIGATION LINKS */}
          <div className="flex gap-12 md:gap-24 font-terminal text-xl">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <span className="text-[#ffae00] text-sm uppercase tracking-widest mb-2">/// DIRECTORY</span>
              <a href="#genesis" className="text-gray-400 hover:text-hell-red transition-colors">GENESIS</a>
              <a href="#revelation" className="text-gray-400 hover:text-hell-red transition-colors">TRUTH</a>
              <a href="#the-pit" className="text-gray-400 hover:text-hell-red transition-colors">THE PIT</a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <span className="text-[#ffae00] text-sm uppercase tracking-widest mb-2">/// PROTOCOL</span>
              <a href="https://x.com" target="_blank" className="text-gray-400 hover:text-hell-red transition-colors">TWITTER (X)</a>
              <a href="#" className="text-gray-400 hover:text-hell-red transition-colors">DEXSCREENER</a>
              <a href="#" className="text-gray-400 hover:text-hell-red transition-colors">CONTRACT</a>
            </div>

          </div>
        </div>

        {/* --- BOTTOM ROW: THE DISCLAIMER --- */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-end gap-6">
          
          {/* Legal Text */}
          <div className="font-terminal text-gray-600 text-sm max-w-2xl leading-relaxed">
            <p className="mb-2">
              <span className="text-hell-red font-bold">DISCLAIMER:</span> $666 is a useless memecoin with no intrinsic value and no expectation of financial return. There is no roadmap, no team, and no utility. 
            </p>
            <p>
              By buying $666, you agree that you are the exit liquidity. If the price goes up, it is luck. If it goes down, it is gravity. Do not email us complaining about your losses; we are busy burning liquidity.
            </p>
          </div>

          {/* Copyright */}
          <div className="font-terminal text-gray-700 text-sm text-right whitespace-nowrap">
            <p>© {currentYear} HELLCOIN.</p>
            <p>ALL RIGHTS BURNED.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
