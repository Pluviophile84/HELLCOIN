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
    <section id="genesis" className="relative bg-hell-dark px-4 py-32">
      <div className="mx-auto max-w-5xl">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center gap-2 text-center"
        >
          {/* Clean, Elegant Sub-line (No slashes, Regular weight) */}
          <span className="font-terminal text-xl uppercase tracking-widest text-hell-gold">
            GENESIS BLOCK 001
          </span>

          {/* Main Title */}
          <h2 className="font-gothic text-6xl leading-none text-hell-white md:text-8xl">
            IN THE <span className="text-hell-red">BEGINNING</span>
          </h2>
        </motion.div>

        {/* --- CONTENT --- */}
        <div className="mx-auto max-w-4xl space-y-12 pl-0 md:pl-12">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`border-l-4 pl-6 font-terminal text-xl leading-relaxed md:text-3xl ${para.highlight ? "border-hell-red font-bold text-hell-red" : "border-hell-dark text-hell-white/70"} `}
            >
              {para.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
