"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingDown, Flame } from "lucide-react";

const BUY_LINK = "https://raydium.io/swap";

export const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [showTagline, setShowTagline] = useState(false);

  // Only show tagline on reasonably tall viewports (e.g. tall phones, tablets, desktops)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkHeight = () => {
      setShowTagline(window.innerHeight >= 720);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleAbandonHope = () => {
    const genesisSection = document.getElementById("genesis");
    if (genesisSection) {
      genesisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="relative h-screen-safe min-h-[600px] w-full flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="/banner.png"
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] opacity-100"
          alt="Hellcoin Throne"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black" />
      </div>

      {/* CONTENT */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 px-fluid-gap md:pr-[10%] lg:pr-[15%] max-w-[1920px] w-full mx-auto flex flex-col items-center sm:items-end text-center sm:text-right pt-16 sm:pt-12 md:pt-0"
      >
        {/* HEADLINE – Range 1 tuned, Range 2 bigger */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className={[
            "font-gothic leading-[0.9] text-hell-white text-glow drop-shadow-2xl w-full",
            // base: tuned for 360–430 width
            "mb-6 sm:mb-6 md:mb-8",
            "text-[clamp(2.4rem,10.8vw,2.65rem)]",
            // sm: 640–767, noticeably stronger
            "sm:text-[clamp(2.8rem,6.8vw,3.6rem)]",
            // md: 768+
            "md:text-[clamp(2.8rem,5vw,3.5rem)]",
            // lg: 1024+
            "lg:text-[clamp(3.1rem,4vw,3.9rem)]",
            // xl+
            "xl:text-[clamp(3.4rem,3.5vw,4.2rem)]",
            "2xl:text-[clamp(3.6rem,3vw,4.6rem)]",
          ].join(" ")}
        >
          BORN IN THE <span className="text-hell-red">RED.</span>
          <br />
          FORGED BY <span className="text-[#ffae00]">REGRET.</span>
        </motion.h1>

        {/* SUBTEXT – Range 1 ok, Range 2 body +10% */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={[
            "font-terminal text-gray-300 max-w-4xl md:max-w-5xl mx-auto sm:mx-0 space-y-2 md:space-y-0",
            // base: body text slightly larger on small phones
            "text-[clamp(1.05rem,4.7vw,1.15rem)]",
            // sm: 640–767, +~10%
            "sm:text-[clamp(1.1rem,3vw,1.2rem)]",
            // md+
            "md:text-[clamp(1.05rem,2vw,1.15rem)]",
            "lg:text-[clamp(1.1rem,1.6vw,1.2rem)]",
            "2xl:text-[clamp(1.15rem,1.2vw,1.25rem)]",
          ].join(" ")}
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            <span
              className={[
                "block sm:inline text-[#ffae00] my-2 sm:my-0 font-bold sm:font-normal",
                // Proof-of-Suffering:
                // base: same at 360/390, +~10% only near top of Range 1
                "text-[clamp(1.3rem,5.3vw,1.45rem)]",
                // sm+ unchanged per your request
                "sm:text-[clamp(1.3rem,4vw,1.6rem)]",
                "md:text-[clamp(1.5rem,3vw,2rem)]",
                "2xl:text-[clamp(1.7rem,2.4vw,2.4rem)]",
              ].join(" ")}
            >
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-gray-300">
            the only consensus mechanism traders truly understand.
          </p>
        </motion.div>

        {/* TAGLINE – Range 1 and 2 unchanged except earlier ~10% bump in base */}
        {showTagline && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className={[
              "font-terminal text-hell-red mt-8 tracking-widest uppercase animate-pulse md:max-w-5xl text-center sm:text-right",
              // base
              "text-[clamp(0.98rem,3vw,1.1rem)]",
              // sm+
              "sm:text-[clamp(1rem,2.3vw,1.15rem)]",
              "md:text-[clamp(1.05rem,2vw,1.2rem)]",
              "lg:text-[clamp(1.1rem,1.8vw,1.3rem)]",
              "2xl:text-[clamp(1.2rem,1.4vw,1.4rem)]",
            ].join(" ")}
          >
            <span className="block sm:inline">WHEN THE MARKET BURNS,</span>{" "}
            <span className="block sm:inline sm:ml-2 text-center">
              WE TREND
            </span>
          </motion.p>
        )}

        {/* CTAs – buttons left as-is in Range 1 + 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-10 sm:mt-8 md:mt-12 flex flex-col md:flex-row gap-6 md:gap-8 justify-center sm:justify-end items-center w-full md:max-w-5xl"
        >
          <button
            type="button"
            onClick={handleAbandonHope}
            className={[
              "text-gray-500 font-terminal hover:text-[#ffae00] transition-colors flex items-center gap-2 group order-1 md:order-none",
              "text-[clamp(1rem,3vw,1.2rem)]",
              "md:text-[clamp(1.1rem,2.2vw,1.4rem)]",
              "2xl:text-[clamp(1.2rem,1.8vw,1.6rem)]",
            ].join(" ")}
          >
            [ ABANDON HOPE ]
            <TrendingDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>

          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "group relative bg-transparent border-2 border-hell-red text-hell-red font-gothic uppercase overflow-hidden",
              "transition-all hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_30px_rgba(204,0,0,0.6)]",
              "order-2 md:order-none cursor-pointer flex items-center gap-2",
              "px-8 py-4",
              "text-[clamp(1.3rem,4vw,1.6rem)]",
              "md:text-[clamp(1.4rem,3vw,1.9rem)]",
              "2xl:text-[clamp(1.6rem,2.5vw,2.2rem)]",
            ].join(" ")}
          >
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666 <Flame size={28} />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade – visual only, no click blocking */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};
