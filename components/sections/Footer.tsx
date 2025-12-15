"use client";

import { X_LINK } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hell-black border-t border-hell-red/20 pt-24 pb-12 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-hell-red/5 to-transparent pointer-events-none"></div>

      {/* FIX: Matching Navbar width logic (w-[85%] max-w-[2400px]) for consistency */}
      <div className="w-full lg:w-[85%] max-w-[2400px] mx-auto px-4 relative z-10">
        
        {/* --- TOP ROW: BRAND & LINKS --- */}
        {/* FIX: Changed 'md:flex-row' to 'lg:flex-row'. 
            Now Tablets (md) will stay stacked/centered like Mobile. 
            Only Laptops (lg) and up will go horizontal. */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 mb-20 text-center lg:text-left">
          
          {/* LEFT: BRAND IDENTITY */}
          <div className="flex flex-col gap-4 items-center lg:items-start">
            <div className="flex items-center gap-3">
              <span className="font-gothic text-6xl md:text-8xl text-hell-white tracking-wide leading-none">
                HELLCOIN
              </span>
            </div>
            <p className="font-terminal text-hell-white/70 max-w-sm text-lg leading-relaxed">
              The final destination for the rekt. <br/>
              Born in the red. Forged by regret.
            </p>
          </div>

          {/* RIGHT: NAVIGATION LINKS */}
          {/* FIX: Centered on Tablet, Left-aligned on Desktop */}
          <div className="flex flex-row flex-wrap gap-12 md:gap-24 font-terminal text-lg justify-center lg:justify-start">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <span className="text-hell-gold text-sm uppercase tracking-widest mb-2 font-bold">
                DIRECTORY
              </span>
              <a href="#genesis" className="text-hell-white/70 hover:text-hell-red transition-colors">GENESIS</a>
              <a href="#revelation" className="text-hell-white/70 hover:text-hell-red transition-colors">TRUTH</a>
              <a href="#the-pit" className="text-hell-white/70 hover:text-hell-red transition-colors">THE PIT</a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <span className="text-hell-gold text-sm uppercase tracking-widest mb-2 font-bold">
                PROTOCOL
              </span>
              <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="text-hell-white/70 hover:text-hell-red transition-colors">TWITTER (X)</a>
              <a href="#" className="text-hell-white/70 hover:text-hell-red transition-colors">DEXSCREENER</a>
              <a href="#" className="text-hell-white/70 hover:text-hell-red transition-colors">CONTRACT</a>
            </div>

          </div>
        </div>

        {/* --- BOTTOM ROW: THE DISCLAIMER --- */}
        {/* FIX: Changed 'md:flex-row' to 'lg:flex-row' here as well for consistency */}
        <div className="border-t border-hell-white/5 pt-8 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 text-center lg:text-left">
          
          {/* Legal Text */}
          <div className="font-terminal text-hell-white/50 text-sm max-w-2xl leading-relaxed">
            <p className="mb-2">
              <span className="text-hell-red font-bold">DISCLAIMER:</span> $666 is a useless memecoin with no intrinsic value and no expectation of financial return. There is no roadmap, no team, and no utility. 
            </p>
            <p>
              By buying $666, you agree that you are the exit liquidity. If the price goes up, it is luck. If it goes down, it is gravity. Do not email us complaining about your losses; we are busy burning liquidity.
            </p>
          </div>

          {/* Copyright */}
          {/* FIX: Centered on Tablet, Right-aligned on Desktop */}
          <div className="font-terminal text-hell-white/40 text-sm text-center lg:text-right whitespace-nowrap">
            <p>© {currentYear} HELLCOIN. ALL RIGHTS BURNED.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
