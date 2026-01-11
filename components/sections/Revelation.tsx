"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SectionKicker } from "@/components/ui/SectionKicker";
import {
  fadeInLeft,
  fadeInRight,
  getVariants,
  getInitial,
  getWhileInView,
} from "@/lib/animations";
import { useViewportOnce } from "@/lib/useViewportMarginRem";

export const Revelation = () => {
  const reduceMotion = useReducedMotion();
  const viewport = useViewportOnce();

  return (
    <section
      id="revelation"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-obsidian-950 md:flex-row"
    >
      <div className="group relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-r-3 border-black p-8 md:w-1/2 md:p-12">
        <Image
          src="/GOAPE-Edited.png"
          alt="The Devil - Hellcoin mascot with fiery horns"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="absolute inset-0 transform object-cover opacity-50 grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-obsidian-950/80" />

        <motion.div
          variants={getVariants(fadeInLeft, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={viewport}
          className="relative z-10 w-full max-w-md text-center"
        >
          <div className="mb-6 flex flex-col items-center gap-4">
            <SectionKicker>DECEPTION DETECTED</SectionKicker>
            <h3 className="px-2 font-heading text-5xl font-black tracking-wide md:text-6xl">
              <span className="text-lava-50">THE</span>{" "}
              <span className="hellfire-text-pure pr-1">LIE</span>
            </h3>
            <p className="max-w-sm font-body text-base text-lava-100/60">
              The greatest stories ever sold.
            </p>
          </div>

          <div className="space-y-3 font-body text-lg leading-relaxed text-lava-100 md:text-2xl">
            <p>&quot;Utility.&quot; &quot;Roadmaps.&quot; &quot;Communities.&quot;</p>
            <p>&ldquo;Dev is doxxed.&rdquo;</p>
            <p>&ldquo;Influencer-backed.&rdquo;</p>
            <p>&ldquo;Strong fundamentals.&rdquo;</p>
            <p>&ldquo;Early entry.&rdquo; &ldquo;Holding the floor.&rdquo;</p>
            <p className="hellfire-text">&ldquo;This time it&apos;s different.&rdquo;</p>
            <p>&ldquo;Memecoins don&apos;t rug — they &apos;restart.&apos;&rdquo;</p>
          </div>

          <div className="mt-8 border-t-3 border-hellfire-orange/20 pt-6">
            <p className="font-body text-lg text-lava-100">
              Every illusion needed to convert <br />
              <span className="hellfire-text">hope into fertilizer.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="cave-texture relative flex flex-col justify-center border-t-3 border-black bg-obsidian-900 p-8 md:w-1/2 md:border-l-3 md:border-t-0 md:p-12">
        <motion.div
          variants={getVariants(fadeInRight, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={viewport}
          className="mx-auto w-full max-w-lg"
        >
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <SectionKicker>THE TRUTH</SectionKicker>
            <h2 className="font-heading text-5xl font-black leading-none text-lava-50 md:text-6xl">
              REALITY <span className="hellfire-text-pure pr-1">CHECK.</span>
            </h2>
            <p className="max-w-sm font-body text-base text-lava-100/60">
              The part nobody wants to hear.
            </p>
          </div>

          <div className="space-y-6 font-body text-lg leading-relaxed text-lava-100 md:text-xl">
            <p className="border-l-4 border-hellfire-orange pl-4 text-xl text-white md:text-2xl">
              Crypto is <span className="text-gold">revolutionary</span>; degens made it a casino,
              and bad actors made it a buffet.
            </p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="hellfire-text">{">"}</span>
                <span>No one has alpha — only confidence disorders.</span>
              </li>
              <li className="flex gap-3">
                <span className="hellfire-text">{">"}</span>
                <span>
                  Influencers aren&apos;t guides; they&apos;re exit liquidity with followers.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="hellfire-text">{">"}</span>
                <span>
                  Utility is optional. <span className="text-gold">Delusion is mandatory.</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="hellfire-text">{">"}</span>
                <span>Volume is dopamine wearing a business suit.</span>
              </li>
              <li className="flex gap-3">
                <span className="hellfire-text">{">"}</span>
                <span>Every community is a therapy group for people who bought the top.</span>
              </li>
              <li className="flex gap-3">
                <span className="hellfire-text">{">"}</span>
                <span>Memecoins don&apos;t die — they simply stop being mentioned.</span>
              </li>
            </ul>

            <div className="mt-10 w-full rounded-xl hc-border-3 border-black bg-gold/10 p-6 shadow-brutal transition-shadow duration-200 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)]">
              <p className="text-center text-xl leading-tight text-white md:text-2xl">
                <span className="hellfire-text-pure mb-2 block font-hero text-2xl md:text-3xl">
                  HELLCOIN
                </span>
                is the only project honest enough to admit it — and bold enough to expose it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
