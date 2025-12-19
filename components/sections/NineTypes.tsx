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
    <section
      id="nine-types"
      className="hk-noise relative overflow-hidden bg-[radial-gradient(920px_580px_at_10%_0%,rgba(124,42,255,0.12),transparent_60%),radial-gradient(900px_600px_at_90%_20%,rgba(255,60,0,0.16),transparent_55%),linear-gradient(180deg,rgba(5,5,5,1),rgba(8,8,11,1))] px-4 py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-14 h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_90deg,rgba(255,60,0,0.0),rgba(255,60,0,0.20),rgba(255,174,0,0.12),rgba(255,60,0,0.0))] opacity-30 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_50%_20%,rgba(255,174,0,0.10),transparent_60%)]" />
      </div>
      <div className="mx-auto max-w-6xl">
        {/* --- HEADER --- */}
        <div className="mb-20 flex flex-col items-center gap-4 text-center">
          <span className="font-terminal text-sm uppercase tracking-[0.35em] text-hell-gold/90 sm:text-base md:text-lg">
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
              className="hk-ember-edge hk-noise group relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(10,10,10,0.80),rgba(5,5,5,0.92))] p-8 text-left shadow-[0_25px_80px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
            >
              {/* --- BACKGROUND WATERMARK ICON --- */}
              {/* This sits behind the text, huge and subtle, creating a 'Class Emblem' look */}
              <type.icon
                strokeWidth={1}
                className="absolute -bottom-10 -right-10 h-44 w-44 rotate-12 text-hell-white/5 opacity-100 transition-all duration-500 group-hover:-rotate-6 group-hover:text-hell-red/10"
              />

              {/* --- FOREGROUND ICON --- */}
              <div className="hk-ember-edge inline-flex rounded-xl bg-hell-red/10 p-4 shadow-[0_0_0_1px_rgba(255,60,0,0.20)] transition-all duration-200 group-hover:bg-hell-red/15">
                <type.icon className="h-8 w-8 text-hell-gold" />
              </div>

              <h3 className="font-terminal text-2xl font-semibold uppercase tracking-[0.18em] text-hell-white">
                {type.title}
              </h3>

              <p className="relative z-10 font-terminal text-lg leading-relaxed text-hell-white/70 transition-colors duration-200 group-hover:text-hell-white">
                {type.subline}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
