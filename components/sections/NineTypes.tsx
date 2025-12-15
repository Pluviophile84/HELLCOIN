"use client";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Bomb,
  Anchor,
  Magnet,
  MousePointerClick,
  Megaphone,
  PenTool,
  Sparkles,
  Flame,
} from "lucide-react";

const types = [
  {
    title: "THE TOP BUYER",
    subline: "Sees green. Sees destiny. Buys the candle’s nosebleed.",
    icon: TrendingUp,
  },
  {
    title: "THE LEVERAGE MARTYR",
    subline: "Sacrifices accounts daily so others may learn nothing.",
    icon: Bomb,
  },
  {
    title: "THE BAG-MARRIED",
    subline: "Holds the corpse. Believes in resurrection.",
    icon: Anchor,
  },
  {
    title: "THE RUG MAGNET",
    subline: "Finds every scam contract the moment it deploys.",
    icon: Magnet,
  },
  {
    title: "THE CLICK-ANY-LINKER",
    subline: "If it says “airdrop,” it must be safe. Wallets disagree.",
    icon: MousePointerClick,
  },
  {
    title: "THE INFLUENCER DISCIPLE",
    subline: "Takes every “gm fam” as gospel and destiny.",
    icon: Megaphone,
  },
  {
    title: "THE ARCHITECT OF PAIN",
    subline: "The scam dev. The rugsmith. The artist of extraction.",
    icon: PenTool,
  },
  {
    title: "THE HOPIUM PRIEST",
    subline: "Charts optional. Faith mandatory.",
    icon: Sparkles,
  },
  {
    title: "THE ALMOST-DEVIL",
    subline: "Burned enough times to see the pattern, but still tempted by green.",
    icon: Flame,
  },
];

export const NineTypes = () => {
  return (
    <section id="nine-types" className="relative bg-hell-black px-4 py-32">
      <div className="mx-auto max-w-6xl">
        {/* --- HEADER --- */}
        <div className="mb-20 flex flex-col items-center gap-4 text-center">
          <span className="font-terminal text-xl uppercase tracking-widest text-hell-gold">
            CHOOSE YOUR FIGHTER
          </span>
          <h2 className="font-gothic text-5xl tracking-wide text-hell-white md:text-8xl">
            THE NINE CIRCLES
          </h2>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {types.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              // FIX: Removed Glow. Added sharp border transition.
              // FIX: Background is black, shifts to deep blood red on hover.
              className="group relative flex flex-col items-center overflow-hidden border border-hell-white/10 bg-hell-black p-8 text-center transition-all duration-200 hover:border-hell-red hover:bg-hell-red/10"
            >
              {/* --- BACKGROUND WATERMARK ICON --- */}
              {/* This sits behind the text, huge and subtle, creating a 'Class Emblem' look */}
              <type.icon
                strokeWidth={1}
                className="absolute -bottom-8 -right-8 h-40 w-40 rotate-12 text-hell-black/70 opacity-50 transition-colors duration-300 group-hover:text-hell-red/10"
              />

              {/* --- FOREGROUND ICON --- */}
              <div className="mb-6 border border-hell-red/20 p-4 transition-all group-hover:border-hell-red/50 group-hover:bg-hell-red/10">
                <type.icon className="h-8 w-8 text-hell-red" />
              </div>

              <h3 className="mb-3 font-terminal text-2xl font-semibold uppercase tracking-wide text-hell-gold">
                {type.title}
              </h3>

              <p className="relative z-10 font-terminal text-lg leading-relaxed text-hell-white/70 transition-colors group-hover:text-hell-white">
                {type.subline}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
