"use client";
import { motion } from "framer-motion";

export const Hellmap = () => {
  const phases = [
    {
      title: "THE 'FAIR LAUNCH' TRAP",
      sub: "Liquidity locked in hell.",
      details: [
        "Contract deployed at 3:33 AM",
        "First 666 holders cursed",
        "Liquidity burnt as offering",
      ],
    },
    {
      title: "PHASE 1337: DELUSIONAL HODLING",
      sub: "We promise utility, we deliver damage.",
      details: [
        "Hit $666k Market Cap (12 secs)",
        "Partnership with therapy apps",
        "CEX Listing (Rejected)",
      ],
    },
    {
      title: "PHASE ???: TOTAL COLLAPSE",
      sub: "It's not a bear market if it never goes up.",
      details: [
        "HELLCOIN becomes legal tender",
        "Financial system replaced by memes",
        "Socialism achieved via poverty",
      ],
    },
  ];

  return (
    <section id="hellmap" className="relative bg-hell-black py-32">
      <div className="mx-auto max-w-4xl px-4">
        {/* --- HEADER --- */}
        <div className="mb-20 flex flex-col items-center gap-2">
          <span className="font-terminal text-xl uppercase tracking-widest text-hell-gold">
            ROADMAP TO RUIN
          </span>
          <h2 className="text-center font-gothic text-6xl text-hell-white md:text-8xl">
            THE HELLMAP
          </h2>
        </div>

        {/* TIMELINE */}
        <div className="relative ml-4 space-y-20 border-l-4 border-hell-red/30 md:ml-0">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative pl-12 md:pl-24"
            >
              {/* Timeline Marker */}
              <div className="absolute left-[-10px] top-2 z-10 h-6 w-6 border-4 border-hell-red bg-hell-black"></div>

              {/* FIX: Standardized Title Size (text-xl md:text-2xl) */}
              <h3 className="mb-2 font-terminal text-xl font-semibold text-hell-gold md:text-2xl">
                {phase.title}
              </h3>

              <p className="mb-6 font-terminal text-xl text-hell-red">"{phase.sub}"</p>

              <ul className="space-y-3">
                {phase.details.map((d, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 font-terminal text-xl text-hell-white/70"
                  >
                    {/* List marker (Red Dot) */}
                    <div className="mt-2.5 h-2 w-2 shrink-0 bg-hell-red"></div>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
