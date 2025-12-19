"use client";
import { motion } from "framer-motion";
import {
  Skull,
  Flame,
  Ghost,
  Sparkles,
  Crown,
  HeartCrack,
  Swords,
  Anchor,
  Bomb,
  Siren,
  Gem,
  Handshake,
  Wrench,
  Magnet,
} from "lucide-react";

const CARD_DATA = [
  {
    title: "THE TOP BUYER",
    description: "Buys every top like it’s a loyalty program.",
    Icon: Crown,
  },
  {
    title: "THE RUG MAGNET",
    description: "Attracts exit liquidity like a cosmic curse.",
    Icon: Magnet,
  },
  {
    title: "THE LEVERAGE MARTYR",
    description: "Dies gloriously at 100x so others may learn nothing.",
    Icon: Anchor,
  },
  {
    title: "THE BAG-MARRIED",
    description: "Refuses to sell. Calls it “conviction.”",
    Icon: Bomb,
  },
  {
    title: "THE HOPIUM PRIEST",
    description: "Preaches green candles through pure delusion.",
    Icon: Sparkles,
  },
  {
    title: "THE CHART NECROMANCER",
    description: "Summons patterns from the dead and calls it TA.",
    Icon: Skull,
  },
  {
    title: "THE FOMO DEMON",
    description: "Can’t resist the candle. Always arrives late.",
    Icon: Flame,
  },
  {
    title: "THE COPE ALCHEMIST",
    description: "Turns losses into lore and calls it character development.",
    Icon: Wrench,
  },
  {
    title: "THE LIQUIDATION SIREN",
    description: "Sings sweetly right before your position vanishes.",
    Icon: Siren,
  },
  {
    title: "THE EXIT LIQUIDITY",
    description: "Blesses whales with your sacrifice.",
    Icon: Handshake,
  },
  {
    title: "THE HEARTBREAK HODLER",
    description: "Still believes… after everything.",
    Icon: HeartCrack,
  },
  {
    title: "THE GHOST OF ATH",
    description: "Lives only in screenshots and old tweets.",
    Icon: Ghost,
  },
  {
    title: "THE WARLORD OF GAS",
    description: "Pays more in fees than the coin is worth.",
    Icon: Swords,
  },
  {
    title: "THE JEWEL THIEF",
    description: "Finds gems, then sells them at the bottom.",
    Icon: Gem,
  },
];

export const NineTypes = () => {
  return (
    <section
      id="nine-types"
      className="hk-section relative overflow-hidden bg-[radial-gradient(1200px_900px_at_20%_10%,rgba(255,60,0,0.16),transparent_60%),radial-gradient(900px_700px_at_80%_20%,rgba(255,174,0,0.06),transparent_55%),radial-gradient(1000px_700px_at_50%_110%,rgba(204,0,0,0.12),transparent_60%),linear-gradient(180deg,rgba(5,5,5,1),rgba(10,10,10,1))] py-28"
    >
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <div className="hk-heat-blob" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-14 text-center font-gothic text-5xl tracking-wide text-hell-white md:text-6xl"
        >
          NINE <span className="hk-flame-title">CIRCLES</span> OF DEGENS
        </motion.h2>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CARD_DATA.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: Math.min(index * 0.03, 0.18),
              }}
              style={{ willChange: "transform, opacity" }}
              className="hk-ember-edge hk-noise group relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(10,10,10,0.72),rgba(5,5,5,0.92))] p-8 shadow-ember transition-transform hover:-translate-y-1"
            >
              {/* hover wash (consistent across all cards) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(600px_220px_at_50%_-15%,rgba(255,174,0,0.18),transparent_60%),linear-gradient(180deg,rgba(255,60,0,0.12),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative z-10 flex items-start justify-between gap-6">
                <div>
                  <h3 className="mb-2 font-gothic text-2xl tracking-wide text-hell-bone">
                    {card.title}
                  </h3>
                  <p className="font-terminal text-lg text-hell-white/70">{card.description}</p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hell-black/30 shadow-[inset_0_0_0_1px_rgba(255,60,0,0.14)] transition-colors group-hover:bg-hell-red/10">
                  <card.Icon className="h-8 w-8 text-hell-gold/85 transition-colors group-hover:text-hell-gold" />
                </div>
              </div>

              {/* watermark */}
              <card.Icon className="absolute -right-8 -top-8 h-32 w-32 text-hell-red/10 transition-opacity group-hover:opacity-90" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
