"use client";

import { motion, useReducedMotion } from "framer-motion";
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
import { SectionKicker } from "@/components/ui/SectionKicker";
import {
  cardHover,
  STAGGER,
  DURATION,
  EASING,
  getVariants,
  getInitial,
  getWhileInView,
  getHover,
} from "@/lib/animations";
import { useViewportMarginRem } from "@/lib/useViewportMarginRem";

const types = [
  {
    title: "THE TOP BUYER",
    subline: "Sees green. Sees destiny. Buys the candle's nosebleed.",
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
    subline: 'If it says "airdrop," it must be safe. Wallets disagree.',
    icon: MousePointerClick,
  },
  {
    title: "THE INFLUENCER DISCIPLE",
    subline: 'Takes every "gm fam" as gospel and destiny.',
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
    subline: "Sees the pattern. Still clicks green.",
    icon: Flame,
  },
];

// Custom stagger container that's faster on mobile (less items visible = faster stagger)
const nineTypesContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER.fast, // Faster stagger for many items
      delayChildren: 0.1,
    },
  },
};

export const NineTypes = () => {
  const reduceMotion = useReducedMotion();
  const margin = useViewportMarginRem(6.25, 0, 0, 0);

  return (
    <section id="nine-types" className="cave-texture relative bg-obsidian-900 px-4 py-32">
      <div className="mx-auto max-w-6xl 3xl:max-w-7xl">
        <div className="mb-20 flex flex-col items-center gap-4 text-center">
          <SectionKicker>CHOOSE YOUR FIGHTER</SectionKicker>
          <h2 className="font-heading text-5xl font-black tracking-wide text-lava-50 md:text-6xl 3xl:text-7xl">
            THE NINE <span className="hellfire-text-pure pr-1">CIRCLES</span>
          </h2>
          <p className="max-w-lg font-body text-lg text-lava-100/60">
            Dante had his version. Ours is based on actual trading behavior.
          </p>
        </div>

        <motion.div
          variants={getVariants(nineTypesContainer, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={{ once: true, amount: 0.05, margin }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {types.map((type, i) => (
            <motion.div
              key={i}
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 40 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: DURATION.normal,
                          ease: EASING.smooth,
                        },
                      },
                    }
              }
              whileHover={getHover(cardHover, reduceMotion)}
              className="group relative flex flex-col items-center overflow-hidden rounded-xl hc-border-3 border-black bg-obsidian-800 p-8 text-center shadow-brutal transition-shadow duration-200 hover:bg-lava-500/5 hover:shadow-[0_0_2.5rem_rgba(255,85,0,0.5)]"
            >
              <type.icon
                strokeWidth={1}
                className="absolute -bottom-8 -right-8 h-40 w-40 rotate-12 text-obsidian-900 opacity-50 transition-colors duration-300 group-hover:text-lava-500/20"
              />

              <div className="mb-6 rounded-lg border-3 border-black bg-obsidian-900 p-4 shadow-brutal-sm transition-colors duration-200 group-hover:bg-lava-500/20">
                <type.icon className="h-8 w-8 text-hellfire-orange" />
              </div>

              <h3 className="mb-3 font-body text-2xl font-bold uppercase tracking-wide text-gold">
                {type.title}
              </h3>

              <p className="relative z-10 font-body text-lg leading-relaxed text-lava-100/70 transition-colors duration-200 group-hover:text-lava-100">
                {type.subline}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
