import Image from "next/image";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="
        relative 
        min-h-screen 
        flex items-center 
        overflow-hidden 
        bg-hell-black
      "
    >
      {/* BACKGROUND BANNER */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/banner.png"
          alt="HELLCOIN - Throne of Regret"
          fill
          priority
          className="
            object-cover 
            object-[30%_center] 
            md:object-center
          "
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/10" />
      </div>

      {/* CONTENT WRAPPER WITH PADDING FOR NAVBAR */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20">
        <div className="ml-auto max-w-2xl text-right space-y-4 md:space-y-6">
          {/* MAIN HEADER – SAME COPY, SAME FONT FAMILY, JUST CLAMPED */}
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

          {/* WHEN THE MARKET BURNS – CONTROLLED BREAK */}
          <p
            className="
              font-gothic 
              text-hell-gold 
              uppercase 
              mt-2
              text-[clamp(1.3rem,2.6vw,2rem)]
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

          {/* BODY TEXT – INCLUDES “PROOF OF SUFFERING”, 20% BIGGER OVERALL */}
          <p
            className="
              font-terminal 
              text-hell-white/80 
              leading-relaxed 
              max-w-xl 
              ml-auto
              text-[clamp(1.05rem,2.1vw,1.4rem)]
            "
          >
            The first cryptocurrency powered by Proof of Suffering. The only
            consensus traders truly understand.
          </p>

          {/* CTA BUTTONS – LEFT UNDER TAILWIND BREAKPOINTS, NO CLAMP */}
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
