import React from "react";

export const Hero = () => {
  return (
    <section
      id="top"
      className="
        relative 
        flex items-center justify-center 
        min-h-screen 
        px-4 pt-24 pb-20 
        md:pt-28 md:pb-24
        bg-hell-black
      "
    >
      {/* Optional subtle radial glow behind content */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff330022,transparent_55%)]" />
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="ml-auto max-w-2xl text-right space-y-4 md:space-y-6">
          {/* PROOF OF SUFFERING LABEL (20% bigger, clamped) */}
          <p
            className="
              font-terminal 
              tracking-[0.25em] 
              uppercase 
              text-hell-gold 
              mb-2
              text-[clamp(0.9rem,1.7vw,1.15rem)]
            "
          >
            PROOF OF SUFFERING
          </p>

          {/* MAIN HEADLINE - BORN IN THE RED. FORGED BY REGRET. */}
          <h1
            className="
              font-gothic 
              text-hell-white 
              leading-[0.9] 
              text-[clamp(2.6rem,5vw,4.6rem)]
            "
          >
            BORN IN THE RED.
            <br />
            FORGED BY REGRET.
          </h1>

          {/* WHEN THE MARKET BURNS, WE TREND (controlled break) */}
          <p
            className="
              font-gothic 
              text-hell-gold 
              uppercase 
              mt-4
              text-[clamp(1.4rem,2.7vw,2.1rem)]
            "
          >
            When the market burns,
            <span
              className="
                block text-center 
                md:inline md:text-right
              "
            >
              {" "}we trend
            </span>
          </p>

          {/* BODY TEXT (20% bigger, clamped) */}
          <p
            className="
              font-terminal 
              text-hell-white/80 
              max-w-xl 
              ml-auto 
              leading-relaxed
              text-[clamp(1.1rem,2.2vw,1.45rem)]
            "
          >
            The first cryptocurrency powered by Proof of Suffering. The only
            consensus traders truly understand.
          </p>

          {/* CTA BUTTONS (left to Tailwind breakpoints, no clamp) */}
          <div className="flex justify-end gap-3 md:gap-4 pt-4 md:pt-6">
            <button
              className="
                font-terminal 
                uppercase 
                px-4 py-2 
                md:px-6 md:py-3
                border border-hell-red 
                bg-transparent 
                text-hell-red 
                hover:bg-hell-red hover:text-hell-black
                transition-colors 
                text-sm md:text-base
              "
            >
              Abandon Hope
            </button>

            <a
              href="https://raydium.io/swap"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-terminal 
                uppercase 
                px-4 py-2 
                md:px-6 md:py-3
                bg-hell-red 
                text-hell-white 
                hover:bg-hell-orange
                border border-hell-red
                transition-colors 
                text-sm md:text-base
              "
            >
              Acquire $666
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
