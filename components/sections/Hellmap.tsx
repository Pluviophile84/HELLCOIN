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
    <section
      id="hellmap"
      className="hk-noise relative overflow-hidden bg-[radial-gradient(900px_600px_at_80%_0%,rgba(255,60,0,0.14),transparent_60%),radial-gradient(850px_560px_at_15%_35%,rgba(255,174,0,0.08),transparent_60%),linear-gradient(180deg,rgba(5,5,5,1),rgba(8,8,11,1))] py-32"
    >
      {/* Charred map geometry (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-32 top-24 h-[520px] w-[520px] rotate-12 rounded-full bg-[conic-gradient(from_180deg,rgba(255,60,0,0.16),transparent,rgba(255,174,0,0.12),transparent)] blur-2xl" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(110deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_14px)]" />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        {/* --- HEADER --- */}
        <div className="mb-20 flex flex-col items-center gap-2">
          <span className="font-terminal text-sm uppercase tracking-[0.35em] text-hell-gold/90 sm:text-base md:text-lg">
            ROADMAP TO RUIN
          </span>
          <h2 className="text-center font-gothic text-6xl text-hell-white md:text-8xl">
            THE HELLMAP
          </h2>
        </div>

        {/* TIMELINE */}
        <div className="relative ml-4 space-y-20 md:ml-0">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(255,60,0,0.0),rgba(255,60,0,0.7),rgba(255,174,0,0.45),rgba(255,60,0,0.15),rgba(255,60,0,0.0))]"
          />
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="hk-ember-edge hk-noise relative rounded-2xl bg-hell-black/25 p-8 pl-12 shadow-deep backdrop-blur-sm md:p-10 md:pl-20"
            >
              {/* Timeline Marker */}
              <div className="absolute left-[-14px] top-10 z-10 h-7 w-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,174,0,0.85),rgba(255,60,0,0.95))] shadow-ember ring-4 ring-hell-red" />

              {/* FIX: Standardized Title Size (text-xl md:text-2xl) */}
              <h3 className="mb-2 font-terminal text-xl font-semibold text-hell-gold md:text-2xl">
                {phase.title}
              </h3>

              <p className="mb-6 font-terminal text-xl text-hell-red">&ldquo;{phase.sub}&rdquo;</p>

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
