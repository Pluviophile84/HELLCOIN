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
  Flame 
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
    <section id="nine-types" className="py-32 px-4 bg-hell-black relative">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="font-terminal text-[#ffae00] text-xl tracking-widest uppercase">
            CHOOSE YOUR FIGHTER
          </span>
          <h2 className="font-gothic text-5xl md:text-8xl text-hell-white tracking-wide">
            THE NINE CIRCLES
          </h2>
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
              // FIX: Removed Glow. Added sharp border transition.
              // FIX: Background is black, shifts to deep blood red on hover.
              className="group relative bg-black border border-gray-800 p-8 flex flex-col items-center text-center hover:border-hell-red hover:bg-[#1a0505] transition-all duration-200 overflow-hidden"
            >
              {/* --- BACKGROUND WATERMARK ICON --- */}
              {/* This sits behind the text, huge and subtle, creating a 'Class Emblem' look */}
              <type.icon 
                strokeWidth={1}
                className="absolute -right-8 -bottom-8 w-40 h-40 text-gray-900 group-hover:text-hell-red/10 transition-colors duration-300 opacity-50 rotate-12" 
              />

              {/* --- FOREGROUND ICON --- */}
              <div className="mb-6 p-4 border border-hell-red/20 rounded-full group-hover:border-hell-red/50 group-hover:bg-hell-red/10 transition-all">
                <type.icon className="w-8 h-8 text-hell-red" />
              </div>

              <h3 className="font-terminal font-semibold text-2xl text-[#ffae00] mb-3 tracking-wide uppercase">
                {type.title}
              </h3>
              
              <p className="font-terminal text-gray-400 text-lg leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors">
                {type.subline}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
