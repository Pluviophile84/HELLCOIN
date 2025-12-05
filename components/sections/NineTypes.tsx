"use client";
import { motion } from "framer-motion";

const types = [
  {
    title: "THE TOP BUYER",
    subline: "Sees green. Sees destiny. Buys the candle’s nosebleed.",
  },
  {
    title: "THE LEVERAGE MARTYR",
    subline: "Sacrifices accounts daily so others may learn nothing.",
  },
  {
    title: "THE BAG-MARRIED",
    subline: "Holds the corpse. Believes in resurrection.",
  },
  {
    title: "THE RUG MAGNET",
    subline: "Finds every scam contract the moment it deploys.",
  },
  {
    title: "THE CLICK-ANY-LINKER",
    subline: "If it says “airdrop,” it must be safe. Wallets disagree.",
  },
  {
    title: "THE INFLUENCER DISCIPLE",
    subline: "Takes every “gm fam” as gospel and destiny.",
  },
  {
    title: "THE ARCHITECT OF PAIN",
    subline: "The scam dev. The rugsmith. The artist of extraction.",
  },
  {
    title: "THE HOPIUM PRIEST",
    subline: "Charts optional. Faith mandatory.",
  },
  {
    title: "THE ALMOST-DEVIL",
    subline: "Burned enough times to see the pattern, but still tempted by green.",
  },
];

export const NineTypes = () => {
  return (
    <section id="nine-types" className="py-32 px-4 bg-hell-black relative">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <h2 className="font-gothic text-5xl md:text-8xl text-hell-white tracking-wide">
            THE NINE TYPES OF THE DAMNED
          </h2>
          <p className="font-terminal text-[#F5F5F5] text-lg md:text-xl max-w-2xl">
            Every soul in Crypto Hell has a circle. Which one are you?
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-[#050505] border border-[#FF3C00] p-6 flex flex-col justify-center items-center text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,60,0,0.2)] transition-all duration-300 ease-out h-full"
            >
              <h3 className="font-terminal font-bold text-2xl text-[#FF3C00] mb-3 tracking-wide uppercase group-hover:text-white transition-colors">
                {type.title}
              </h3>
              <p className="font-terminal text-[#F5F5F5] text-lg leading-relaxed opacity-80 group-hover:opacity-100">
                {type.subline}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
