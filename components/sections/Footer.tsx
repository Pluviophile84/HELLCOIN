"use client";

import { X_LINK } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hk-noise relative overflow-hidden border-t border-hell-red/20 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,60,0,0.12),transparent_60%),linear-gradient(180deg,rgba(5,5,5,1),rgba(8,8,11,1))] pb-12 pt-24">
      {/* Background Ambience */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,174,0,0.14),transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] opacity-40 [background-size:40px_40px]" />
      </div>

      {/* FIX: Matching Navbar width logic (w-[85%] max-w-[2400px]) for consistency */}
      <div className="relative z-10 mx-auto w-full max-w-[2400px] px-4 lg:w-[85%]">
        {/* --- TOP ROW: BRAND & LINKS --- */}
        {/* FIX: Changed 'md:flex-row' to 'lg:flex-row'. 
            Now Tablets (md) will stay stacked/centered like Mobile. 
            Only Laptops (lg) and up will go horizontal. */}
        <div className="mb-20 flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:items-start lg:text-left">
          {/* LEFT: BRAND IDENTITY */}
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <div className="flex items-center gap-3">
              <span className="text-glow bg-[linear-gradient(90deg,rgba(255,174,0,0.95),rgba(255,60,0,1),rgba(204,0,0,0.95))] bg-clip-text font-gothic text-6xl leading-none tracking-wide text-transparent md:text-8xl">
                HELLCOIN
              </span>
            </div>
            <p className="max-w-sm font-terminal text-lg leading-relaxed">
              <span className="text-flame">The final destination for the rekt.</span>{" "}
              <span className="text-hell-white/65">Born in the red. Forged by regret.</span>
            </p>
          </div>

          {/* RIGHT: NAVIGATION LINKS */}
          {/* FIX: Centered on Tablet, Left-aligned on Desktop */}
          <div className="flex flex-row flex-wrap justify-center gap-10 font-terminal text-lg md:gap-16 lg:justify-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <span className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-hell-gold/90">
                DIRECTORY
              </span>
              <a
                href="#genesis"
                className="group relative inline-block text-hell-white/70 transition-colors hover:text-hell-red"
              >
                GENESIS
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-hell-gold/80 transition-all duration-300 group-hover:w-full"
                />
              </a>
              <a
                href="#revelation"
                className="group relative inline-block text-hell-white/70 transition-colors hover:text-hell-red"
              >
                TRUTH
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-hell-gold/80 transition-all duration-300 group-hover:w-full"
                />
              </a>
              <a
                href="#the-pit"
                className="group relative inline-block text-hell-white/70 transition-colors hover:text-hell-red"
              >
                THE PIT
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-hell-gold/80 transition-all duration-300 group-hover:w-full"
                />
              </a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <span className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-hell-gold/90">
                PROTOCOL
              </span>
              <a
                href={X_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block text-hell-white/70 transition-colors hover:text-hell-red"
              >
                TWITTER (X)
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-hell-gold/80 transition-all duration-300 group-hover:w-full"
                />
              </a>
              <a
                href="#"
                className="group relative inline-block text-hell-white/70 transition-colors hover:text-hell-red"
              >
                DEXSCREENER
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-hell-gold/80 transition-all duration-300 group-hover:w-full"
                />
              </a>
              <a
                href="#"
                className="group relative inline-block text-hell-white/70 transition-colors hover:text-hell-red"
              >
                CONTRACT
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-0 bg-hell-gold/80 transition-all duration-300 group-hover:w-full"
                />
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW: THE DISCLAIMER --- */}
        {/* FIX: Changed 'md:flex-row' to 'lg:flex-row' here as well for consistency */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-hell-white/5 pt-8 text-center lg:flex-row lg:items-end lg:text-left">
          {/* Legal Text */}
          <div className="hk-ember-edge hk-noise max-w-2xl rounded-2xl bg-hell-black/35 p-6 font-terminal text-sm leading-relaxed text-hell-white/50 shadow-ember backdrop-blur-md">
            <p className="mb-2">
              <span className="font-bold text-hell-red">DISCLAIMER:</span> $666 is a useless
              memecoin with no intrinsic value and no expectation of financial return. There is no
              roadmap, no team, and no utility.
            </p>
            <p>
              By buying $666, you agree that you are the exit liquidity. If the price goes up, it is
              luck. If it goes down, it is gravity. Do not email us complaining about your losses;
              we are busy burning liquidity.
            </p>
          </div>

          {/* Copyright */}
          {/* FIX: Centered on Tablet, Right-aligned on Desktop */}
          <div className="whitespace-nowrap text-center font-terminal text-sm text-hell-white/40 lg:text-right">
            <p>© {currentYear} HELLCOIN. ALL RIGHTS BURNED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
