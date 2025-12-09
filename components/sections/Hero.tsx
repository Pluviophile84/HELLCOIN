"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Flame } from "lucide-react";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
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
    <section ref={ref} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/banner.png" className="absolute inset-0 w-full h-full object-cover object-[30%_center] opacity-50" alt="Hellcoin Throne" />
        <div className="absolute inset-0 bg-gradient-to-t from-hell-black via-hell-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-hell-black/40 to-hell-black"></div>
      </div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-30 px-4 md:px-12 pt-32 pb-12 2xl:pt-48 2xl:pb-24 max-w-[1800px] w-full mx-auto flex flex-col items-center md:items-end text-center md:text-right h-full justify-center"
      >
        <div className="flex flex-col items-center">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-terminal font-black text-[#ffae00] animate-pulse mb-2 tracking-widest uppercase
                           text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl text-center"
            >
                ABANDON HOPE.
            </motion.p>

            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 1.5, delay: 0.3 }}
              className="font-gothic leading-[0.9] text-hell-white text-glow drop-shadow-2xl mb-6 md:mb-8 md:max-w-7xl text-center
                         text-6xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[11rem]"
            >
              ACQUIRE <span className="text-hell-red">$666.</span>
            </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-terminal text-gray-300 max-w-4xl md:max-w-5xl mx-auto md:mx-0 space-y-2 md:space-y-1
                     text-lg sm:text-xl md:text-2xl 2xl:text-4xl"
        >
          <p className="leading-relaxed">
            The first cryptocurrency powered by{" "}
            <span className="block md:inline text-[#ffae00] font-bold md:font-normal
                             text-xl sm:text-2xl md:text-3xl 2xl:text-5xl my-1 md:my-0">
              Proof-of-Suffering
            </span>
          </p>
          <p className="text-gray-300">
            the only consensus mechanism traders truly understand.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8 md:mt-12 xl:mt-16 flex flex-col md:flex-row gap-5 md:gap-8 justify-center md:justify-end items-center w-full md:max-w-4xl"
        >
          <button 
            onClick={handleEnterHell}
            className="text-gray-500 font-terminal hover:text-[#ffae00] transition-colors flex items-center gap-2 group order-2 md:order-1
                       text-base sm:text-lg md:text-xl 2xl:text-3xl"
          >
            [ ENTER HELL ]
            <TrendingDown className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7 group-hover:translate-y-1 transition-transform" />
          </button>

          <a 
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-transparent border-2 border-hell-red text-hell-red font-gothic uppercase overflow-hidden transition-all hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_30px_rgba(204,0,0,0.6)] order-1 md:order-2 cursor-pointer flex items-center gap-2
                       px-6 py-2 text-xl           
                       sm:px-8 sm:py-3 sm:text-2xl   
                       md:px-10 md:py-4 md:text-3xl 
                       2xl:px-14 2xl:py-6 2xl:text-5xl"
          >
            <span className="absolute inset-0 w-full h-full bg-hell-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center gap-2">
              ACQUIRE $666 <Flame className="w-5 h-5 md:w-6 md:h-6 2xl:w-10 2xl:h-10" />
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hell-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};
