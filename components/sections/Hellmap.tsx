"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionKicker } from "@/components/ui/SectionKicker";
import {
  fadeInUp,
  getVariants,
  getInitial,
  getWhileInView,
} from "@/lib/animations";
import { useViewportOnce } from "@/lib/useViewportMarginRem";

const phases = [
  {
    num: "0",
    title: "THE 'FAIR LAUNCH' TRAP",
    tagline: "Liquidity locked in hell.",
    details: [
      "Contract deployed at 3:33 AM",
      "First 666 holders cursed",
      "Liquidity burnt as offering",
    ],
  },
  {
    num: "I",
    title: "DELUSIONAL HODLING",
    tagline: "We promise utility. We deliver damage.",
    details: [
      "Market cap hits $666k (briefly)",
      "Partnerships announced",
      "Therapy apps considered",
      "CEX listing attempts: Rejected 47 times",
    ],
  },
  {
    num: "II",
    title: "COPIUM OVERDOSE",
    tagline: "The chart is just consolidating.",
    details: [
      "Community invents new cope phrases",
      '"Whale manipulation" blamed for everything',
      "Long-term vision unlocked",
      "Diamond hands upgraded to cement shoes",
    ],
  },
  {
    num: "III",
    title: "TOTAL ADOPTION",
    tagline: "There is no alternative.",
    details: [
      "Hellcoin declared legal tender (jurisdiction pending)",
      "Financial system replaced by memes",
      "Everyone now holds exactly $666",
      "The Mark of the Beast fulfilled.",
      "The world does not end. The financial system does.",
    ],
  },
];

export const Hellmap = () => {
  const reduceMotion = useReducedMotion();
  const viewport = useViewportOnce();

  return (
    <section id="hellmap" className="relative bg-obsidian-950 py-32">
      <div className="relative z-10 mx-auto max-w-4xl px-4 3xl:max-w-5xl">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center gap-4 text-center">
          <SectionKicker>ROADMAP TO RUIN</SectionKicker>
          <h2 className="font-heading text-5xl font-black text-lava-50 md:text-6xl 3xl:text-7xl">
            THE <span className="hellfire-text-pure pr-1">HELLMAP</span>
          </h2>
          <p className="max-w-md font-body text-lg text-lava-100/60">
            A journey with no return. Each phase takes you deeper.
          </p>
        </div>

        {/* Vertical descent timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-hellfire-orange via-lava-500 to-hellfire-red md:left-1/2 md:-translate-x-1/2" />

          {/* Phases */}
          <div className="space-y-12 md:space-y-16">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                variants={getVariants(fadeInUp, reduceMotion)}
                initial={getInitial(reduceMotion)}
                whileInView={getWhileInView(reduceMotion)}
                viewport={viewport}
                className="relative flex items-start gap-6 pl-0 md:pl-0"
              >
                {/* Phase number circle */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-3 border-black bg-obsidian-950 font-heading text-xl text-hellfire-orange shadow-brutal md:absolute md:left-1/2 md:-translate-x-1/2">
                  {phase.num}
                </div>

                {/* Content card */}
                <div
                  className={`group flex-1 rounded-xl hc-border-3 border-black bg-obsidian-800 shadow-brutal transition-all duration-200 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.5)] md:w-[calc(50%-3.125rem)] md:flex-none ${
                    i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  {/* Phase header */}
                  <div className="border-b-3 border-black px-5 py-3 text-center">
                    <span className="font-heading text-2xl text-hellfire-orange">
                      PHASE {phase.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 font-body text-lg font-bold uppercase tracking-wide text-gold md:text-xl">
                      {phase.title}
                    </h3>
                    <p className="mb-4 font-body text-lg italic text-lava-100/60">
                      &ldquo;{phase.tagline}&rdquo;
                    </p>
                    <ul className="space-y-2">
                      {phase.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 font-body text-lg text-lava-100/70"
                        >
                          <div className="mt-2 h-2 w-2 shrink-0 rounded-sm border-2 border-black bg-hellfire-orange" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

