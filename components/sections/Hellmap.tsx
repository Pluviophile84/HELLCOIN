"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { fadeInUp, getVariants, getInitial, getWhileInView } from "@/lib/animations";
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
              <Fragment key={phase.num}>
                <motion.div
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
                    className={`hc-border-3 group flex-1 rounded-xl border-black bg-obsidian-800 shadow-brutal transition-all duration-200 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.5)] md:w-[calc(50%-3.125rem)] md:flex-none ${
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
                {i === 0 && (
                  <article
                    aria-labelledby="first-death-title"
                    className="relative z-10 mx-auto overflow-hidden rounded-xl border-3 border-black bg-obsidian-900 shadow-brutal md:w-11/12"
                  >
                    <div className="p-6 text-center md:p-8">
                      <p className="mb-3 text-sm font-bold tracking-widest text-gold">
                        REALITY CHECK
                      </p>
                      <h3
                        id="first-death-title"
                        className="font-heading text-4xl text-hellfire-orange md:text-5xl"
                      >
                        THE FIRST DEATH
                      </h3>
                      <p className="mt-3 italic text-lava-100/70">
                        &ldquo;The roadmap encountered reality.&rdquo;
                      </p>
                      <dl className="mx-auto my-6 grid max-w-md gap-3 text-sm sm:text-base">
                        {[
                          ["LAUNCH", "COMPLETE"],
                          ["INITIAL HOLDERS", "9"],
                          ["MARKET REACTION", "NOBODY CARED"],
                          ["FINAL FORM", "BAG"],
                        ].map(([label, value]) => (
                          <div key={label} className="flex flex-wrap justify-center gap-x-2">
                            <dt className="font-bold text-lava-100/70">{label}:</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="font-bold text-gold">STATUS: PROPHECY FULFILLED</p>
                    </div>
                    <div className="relative border-t-3 border-black bg-obsidian-800 px-6 py-8 text-center md:min-h-64 md:pl-56">
                      <Image
                        src="/forge/hellcoin-devil-overlay-master.png"
                        alt=""
                        aria-hidden="true"
                        width={540}
                        height={540}
                        unoptimized
                        className="pointer-events-none absolute bottom-0 left-0 hidden h-[33.75rem] w-[33.75rem] max-w-none md:block"
                      />
                      <div className="relative">
                        <p className="mb-3 text-sm font-bold tracking-widest text-gold">
                          CURRENT LOCATION
                        </p>
                        <h3 className="font-heading text-4xl text-lava-50 md:text-5xl">
                          THE AFTERLIFE
                        </h3>
                        <p className="mb-6 mt-3 italic text-lava-100/70">
                          &ldquo;Still here.&rdquo;
                        </p>
                        <Link
                          href="/forge"
                          prefetch={false}
                          className="hellfire-bg inline-block rounded-xl border-3 border-black px-6 py-3 font-heading text-xl text-white shadow-brutal focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-800"
                        >
                          ENTER THE FORGE
                        </Link>
                      </div>
                    </div>
                  </article>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
