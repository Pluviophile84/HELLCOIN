"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingDown } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleEnterHell = () => {
    const genesisSection = document.getElementById("genesis");
    if (genesisSection) {
      genesisSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const BUY_LINK = "https://raydium.io/swap";

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/banner.png"
          className="absolute inset-0 w-full h-full object-cover object-[30%_center] opacity-50"
          alt="Hellcoin Throne"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-30 px-4 md:px-12 pt-32 pb-12 w-full max-w-[1920px] mx-auto flex flex-col items-center md:items-end text-center md:text-right h-full justify-center"
      >
        {/* LABEL + TITLE WRAPPER */}
        <div className="flex flex-col items-center md:items-end">
          {/* 1. ABANDON HOPE - Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="
              font-terminal font-black text-[#ffae00] animate-pulse mb-2 tracking-widest uppercase
              text-2xl
              sm:text-2xl
              md:text-3xl
              lg:text-3xl
              xl:text-4xl
              2xl:text-4xl
            "
          >
            ABANDON HOPE.
          </motion.p>

          {/* 2. MAIN TITLE */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1.5, delay: 0.3 }}
            className="
              font-gothic leading-[0.9] text-hell-white text-glow drop-shadow-2xl mb-6 md:mb-8 md:max-w-6xl
              text-center md:text-right
              text-6xl
              sm:text-6xl
              md:text-7xl
              lg:text-7xl
              xl:text-8xl
              2xl:text-8xl
            "
          >
            ACQUIRE <span className="text-hell-red">$666.</span>
          </motion.h1>
        </div>

        {/* 3. BODY TEXT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="
            font-terminal text-gray-300
            max-w-lg md:max-w-3xl xl:max-w-4xl
            mx-auto md:mx-0
            space-y-2 md:space-y-1
            text-lg
            sm:text-lg
            md:text-xl
            lg:text-2xl
            xl:text-2xl
            2xl:text-2xl
          "
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            <span
              className="
                block md:inline text-[#ffae00] font-bold md:font-normal
                text-xl
                sm:text-xl
                md:text-2xl
                lg:text-2xl
                xl:text-3xl
                2xl:text-3xl
                my-1 md:my-0
              "
            >
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-gray-300">
            the only consensus mechanism traders truly understand.
          </p>
        </motion.div>

        {/* 4. BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="
            mt-8 md:mt-10 xl:mt-12
            flex flex-col md:flex-row gap-5 md:gap-8
            justify-center md:justify-end items-center
            w-full md:max-w-4xl
          "
        >
          {/* SECONDARY: ENTER HELL */}
          <button
            onClick={handleEnterHell}
            className="
              text-gray-500 font-terminal hover:text-[#ffae00] transition-colors
              flex items-center gap-2 group
              order-2 md:order-1
              text-base
              sm:text-base
              md:text-lg
              lg:text-xl
              xl:text-xl
              2xl:text-xl
            "
          >
            [ ENTER HELL ]
            <TrendingDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* PRIMARY: ACQUIRE */}
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative bg-transparent border-2 border-hell-red text-hell-red font-gothic uppercase
              overflow-hidden transition-all hover:text-hell-white hover:border-hell-orange
              hover:shadow-[0_0_30px_rgba(204,0,0,0.6)]
              order-1 md:order-2 cursor-pointer
              flex items-center gap-2
              px-6 py-2 text-xl
              sm:px-7 sm:py-2.5 sm:text-2xl
              md:px-8 md:py-3 md:text-2xl
              lg:px-9 lg:py-3.5 lg:text-3xl
              xl:px-10 xl:py-4 xl:text-3xl
              2xl:px-10 2xl:py-4 2xl:text-3xl
            "
          >
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};
