"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Coins, Percent, Flame, Skull } from "lucide-react";
import { SectionKicker } from "@/components/ui/SectionKicker";
import {
  staggerContainer,
  fadeInUp,
  cardHover,
  getVariants,
  getInitial,
  getWhileInView,
  getHover,
} from "@/lib/animations";
import { useViewportOnce } from "@/lib/useViewportMarginRem";

const mathItems = [
  {
    label: "MAX SUPPLY",
    value: "1 BILLION",
    valueShort: "1B",
    sub: "TOTAL DAMNED // No Inflation. Just Pain.",
    icon: Coins,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    label: "SIN TAX",
    value: "0% / 0%",
    valueShort: "0%",
    sub: "The Devil takes no cuts. Only your soul.",
    icon: Percent,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    label: "LIQUIDITY",
    value: "BURNED",
    valueShort: "🔥",
    sub: "LP STATUS // Keys thrown into the abyss.",
    icon: Flame,
    color: "text-hellfire-orange",
    bgColor: "bg-hellfire-orange/10",
  },
  {
    label: "DEVIL (A.K.A DEV) ALLOCATION",
    value: "666",
    valueShort: "666",
    sub: '"Enough to buy a cheeseburger in hell."',
    icon: Skull,
    color: "text-hellfire-red",
    bgColor: "bg-hellfire-red/10",
  },
];

export const DevilsMath = () => {
  const reduceMotion = useReducedMotion();
  const viewport = useViewportOnce();

  return (
    <section id="math" className="bg-obsidian-950 py-24 font-body">
      <div className="mx-auto max-w-5xl px-4 3xl:max-w-6xl">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <SectionKicker>SIN NOMICS DATA</SectionKicker>
          <h2 className="font-heading text-5xl font-black text-lava-50 md:text-6xl 3xl:text-7xl">
            THE <span className="hellfire-text-pure">DEVIL&apos;S</span> MATH
          </h2>
          <p className="max-w-lg font-body text-lg text-lava-100/60">
            Numbers don&apos;t lie. But they do burn.
          </p>
        </div>

        <motion.div
          variants={getVariants(staggerContainer, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={viewport}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {mathItems.map((item, i) => (
            <motion.div
              key={i}
              variants={getVariants(fadeInUp, reduceMotion)}
              whileHover={getHover(cardHover, reduceMotion)}
              className="group relative overflow-hidden rounded-xl hc-border-3 border-black bg-obsidian-800 p-6 shadow-brutal transition-shadow duration-200 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)] md:p-8"
            >
              {/* Background icon */}
              <item.icon
                size={120}
                strokeWidth={1}
                className="absolute -bottom-6 -right-6 text-obsidian-900/50 transition-all duration-300 group-hover:scale-110 group-hover:text-obsidian-900/80"
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black ${item.bgColor}`}
                  >
                    <item.icon size={20} className={item.color} />
                  </div>
                  <span className="font-body text-sm font-bold uppercase tracking-widest text-lava-100/50">
                    {item.label}
                  </span>
                </div>

                {/* Value */}
                <div className="mb-4">
                  <span className={`font-heading text-4xl md:text-5xl 3xl:text-6xl ${item.color}`}>
                    {item.value}
                  </span>
                </div>

                {/* Description */}
                <div className="flex items-start gap-3">
                  <div className={`mt-1.5 h-1 w-6 rounded-full ${item.bgColor}`} />
                  <p className="font-body text-base text-lava-100/60 md:text-lg">{item.sub}</p>
                </div>
              </div>

              {/* Animated corner accent */}
              <div className="absolute left-0 top-0 h-16 w-16">
                <div
                  className={`absolute left-3 top-3 h-3 w-3 rounded-sm ${item.bgColor} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                />
                <div
                  className={`absolute left-6 top-3 h-1.5 w-6 rounded-full ${item.bgColor} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                />
                <div
                  className={`absolute left-3 top-6 h-6 w-1.5 rounded-full ${item.bgColor} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat bar */}
        <motion.div
          variants={getVariants(fadeInUp, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={viewport}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-xl border-3 border-black bg-obsidian-900 p-4 shadow-brutal md:gap-12 md:p-6"
        >
          <div className="flex items-center gap-2 text-center">
            <span className="font-body text-sm uppercase tracking-widest text-lava-100/50">
              Status:
            </span>
            <span className="font-nunito text-sm font-bold text-green-400">LIVE</span>
          </div>
          <div className="bg-obsidian-700 hidden h-8 w-px md:block" />
          <div className="flex items-center gap-2 text-center">
            <span className="font-body text-sm uppercase tracking-widest text-lava-100/50">
              Network:
            </span>
            <span className="font-nunito text-sm font-bold text-gold">SOLANA</span>
          </div>
          <div className="bg-obsidian-700 hidden h-8 w-px md:block" />
          <div className="flex items-center gap-2 text-center">
            <span className="font-body text-sm uppercase tracking-widest text-lava-100/50">
              Contract:
            </span>
            <span className="font-nunito text-sm font-bold text-hellfire-orange">VERIFIED</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
