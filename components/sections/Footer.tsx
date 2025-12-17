"use client";

import { DEXSCREENER_LINK, X_LINK } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hell-red/20 bg-hell-black pb-12 pt-24">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-hell-red/5 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[2400px] px-4 lg:w-[85%]">
        <div className="mb-20 flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:items-start lg:text-left">
          {/* LEFT: BRAND IDENTITY */}
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <div className="flex items-center gap-3">
              <span className="font-gothic text-6xl leading-none tracking-wide text-hell-white md:text-8xl">
                HELLCOIN
              </span>
            </div>
            <p className="max-w-sm font-terminal text-lg leading-relaxed text-hell-white/70">
              The final destination for the rekt. <br />
              Born in the red. Forged by regret.
            </p>
          </div>

          {/* RIGHT: NAVIGATION LINKS */}
          <div className="flex flex-row flex-wrap justify-center gap-12 font-terminal md:gap-24 lg:justify-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <span className="mb-2 text-base font-bold uppercase tracking-widest text-hell-gold">
                DIRECTORY
              </span>

              <a href="#genesis" className="text-base text-hell-white/70 transition-colors hover:text-hell-red">
                GENESIS
              </a>
              <a href="#revelation" className="text-base text-hell-white/70 transition-colors hover:text-hell-red">
                TRUTH
              </a>
              <a href="#the-pit" className="text-base text-hell-white/70 transition-colors hover:text-hell-red">
                THE PIT
              </a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <span className="mb-2 text-base font-bold uppercase tracking-widest text-hell-gold">
                PROTOCOL
              </span>

              <a
                href={X_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-hell-white/70 transition-colors hover:text-hell-red"
              >
                TWITTER (X)
              </a>

              <a
                href={DEXSCREENER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-hell-white/70 transition-colors hover:text-hell-red"
              >
                DEXSCREENER
              </a>

              {/* Contract is not external: it should jump to the Ritual section where the CA is */}
              <a href="#ritual" className="text-base text-hell-white/70 transition-colors hover:text-hell-red">
                CONTRACT
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM ROW: THE DISCLAIMER --- */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-hell-white/5 pt-8 text-center lg:flex-row lg:items-end lg:text-left">
          <div className="max-w-2xl font-terminal text-sm leading-relaxed text-hell-white/50">
            <p className="mb-2">
              <span className="font-bold text-hell-red">DISCLAIMER:</span> $666 is a useless memecoin
              with no intrinsic value and no expectation of financial return. There is no roadmap,
              no team, and no utility.
            </p>
            <p>
              By buying $666, you agree that you are the exit liquidity. If the price goes up, it is
              luck. If it goes down, it is gravity. Do not email us complaining about your losses;
              we are busy burning liquidity.
            </p>
          </div>

          <div className="whitespace-nowrap text-center font-terminal text-sm text-hell-white/40 lg:text-right">
            <p>© {currentYear} HELLCOIN. ALL RIGHTS BURNED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
