"use client";
import { motion } from "framer-motion";

export const Genesis = () => {
  const paragraphs = [
    {
      text: "THERE WAS GREED.",
      highlight: true,
    },
    {
      text: "And when a trader whispered “this time it’s different” for the 666th time, Heaven sighed, Hell took notice, and the Devil smiled — a mortal had mastered self-deception at a level even he found impressive.",
      highlight: false,
    },
    {
      text: "Realizing such craftsmanship deserved a monument, his gaze fell upon the crypto pit — where his sacred number had just been reached — a landscape of rugs, scams, broken dreams, and regret stacked higher than ambition, and no corner burned brighter than pump.fun.",
      highlight: false,
    },
    {
      text: "A platform where neither pumps nor fun survive launch day. Perfect.",
      highlight: true,
    },
    {
      text: "From that glorious wreckage, he forged HELLCOIN ($666).",
      highlight: true,
    },
    {
      text: "It was already home.",
      highlight: false,
    },
  ];

  return (
    <section
      id="genesis"
      className="hk-noise relative overflow-hidden bg-[radial-gradient(1200px_700px_at_20%_0%,rgba(255,60,0,0.18),transparent_60%),radial-gradient(900px_600px_at_90%_20%,rgba(255,174,0,0.10),transparent_55%),linear-gradient(180deg,rgba(10,10,10,1),rgba(8,8,11,1))] px-4 py-32"
    >
      {/* Carved stone / molten seams (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-0 h-full w-[420px] bg-[radial-gradient(closest-side,rgba(255,60,0,0.14),transparent_70%)] blur-2xl" />
        <div className="absolute -right-24 top-1/4 h-[60%] w-[520px] bg-[radial-gradient(closest-side,rgba(34,17,37,0.32),transparent_72%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)] opacity-30" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center gap-2 text-center"
        >
          {/* Clean, Elegant Sub-line (No slashes, Regular weight) */}
          <span className="font-terminal text-sm uppercase tracking-[0.35em] text-hell-gold/90 sm:text-base">
            GENESIS BLOCK 001
          </span>

          {/* Main Title */}
          <h2 className="font-gothic text-6xl leading-none text-hell-white md:text-8xl">
            IN THE <span className="text-hell-red">BEGINNING</span>
          </h2>
        </motion.div>

        {/* --- CONTENT --- */}
        <div className="hk-ember-edge relative mx-auto max-w-4xl space-y-6 rounded-2xl bg-hell-black/25 p-6 shadow-deep backdrop-blur-md md:p-10">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`relative rounded-xl px-6 py-5 font-terminal text-xl leading-relaxed before:absolute before:bottom-4 before:left-0 before:top-4 before:w-[2px] before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,60,0,0.0),rgba(255,60,0,0.65),rgba(255,174,0,0.25),rgba(255,60,0,0.0))] md:text-3xl ${para.highlight ? "hk-ember-edge bg-[linear-gradient(180deg,rgba(204,0,0,0.18),rgba(10,10,10,0.10))] font-bold text-hell-red" : "bg-hell-black/15 text-hell-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"} `}
            >
              {para.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
