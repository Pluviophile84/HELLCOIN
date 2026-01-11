"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionKicker } from "@/components/ui/SectionKicker";
import {
  staggerContainer,
  fadeInUp,
  getVariants,
  getInitial,
  getWhileInView,
} from "@/lib/animations";
import { useViewportOnce } from "@/lib/useViewportMarginRem";

export const Genesis = () => {
  const reduceMotion = useReducedMotion();
  const viewport = useViewportOnce();

  const paragraphs = [
    {
      text: "IN THE BEGINNING",
      highlight: true,
      dropCap: false,
    },
    {
      text: 'There was greed. And when a trader whispered "this time it\'s different" for the 666th time, Heaven sighed, Hell took notice, and the Devil smiled — a mortal had mastered self-deception at a level even he found impressive.',
      highlight: false,
      dropCap: true,
    },
    {
      text: "Realizing such craftsmanship deserved a monument, his gaze fell upon the crypto pit — a landscape of rugs, scams, broken dreams, and regret stacked higher than ambition, and no corner burned brighter than pump.fun.",
      highlight: false,
      dropCap: false,
    },
    {
      text: "A platform where neither pumps nor fun survive launch day. Perfect.",
      highlight: false,
      dropCap: false,
    },
    {
      text: "From that glorious wreckage, he forged HELLCOIN ($666).",
      highlight: true,
      dropCap: false,
    },
    {
      text: "It was already home.",
      highlight: false,
      dropCap: false,
    },
  ];

  return (
    <section id="genesis" className="cave-texture relative bg-obsidian-900 px-4 py-32">
      <motion.div
        variants={getVariants(staggerContainer, reduceMotion)}
        initial={getInitial(reduceMotion)}
        whileInView={getWhileInView(reduceMotion)}
        viewport={viewport}
        className="mx-auto max-w-5xl 3xl:max-w-6xl"
      >
        {/* Header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <SectionKicker>GENESIS BLOCK 001</SectionKicker>
          <h2 className="font-heading text-5xl font-black leading-none text-lava-50 md:text-6xl 3xl:text-7xl">
            <span className="hellfire-text-pure">GENESIS</span>
          </h2>
          <p className="font-body text-lg text-lava-100/60">
            Every religion needs an origin story. Ours just happens to be true.
          </p>
        </div>

        {/* Scripture container */}
        <div className="relative mx-auto max-w-4xl 3xl:max-w-5xl">
          {/* Inner scroll container */}
          <div className="relative rounded-xl hc-border-3 border-black bg-obsidian-950/50 p-6 shadow-brutal transition-shadow duration-200 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.5)] md:p-10 lg:p-12">
            {/* Top ornament */}
            <div className="mb-8 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <span className="font-heading text-2xl text-gold">✦</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>

            {/* Scripture text */}
            <div className="space-y-8 md:space-y-10">
              {paragraphs.map((para, i) => (
                <motion.div
                  key={i}
                  variants={getVariants(fadeInUp, reduceMotion)}
                  className={`font-body text-lg leading-relaxed md:text-xl lg:text-2xl 3xl:text-3xl ${
                    para.highlight ? "text-center font-bold" : "text-lava-100/80"
                  }`}
                >
                  {para.highlight ? (
                    <span className="hellfire-text-pure inline-block border-b-2 border-hellfire-orange/50 pb-2">
                      {para.text}
                    </span>
                  ) : para.dropCap ? (
                    <p>
                      <span className="float-left mr-3 font-hero text-6xl leading-none text-gold md:text-7xl lg:text-8xl">
                        {para.text.charAt(0)}
                      </span>
                      {para.text.slice(1)}
                    </p>
                  ) : (
                    <p>{para.text}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom ornament */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <span className="font-heading text-lg text-gold/60">— AMEN —</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Verse number decoration */}
        <motion.div variants={getVariants(fadeInUp, reduceMotion)} className="mt-8 text-center">
          <span className="font-body text-sm uppercase tracking-widest text-lava-100/30">
            BOOK OF BURNS • CHAPTER I • VERSE 666
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
