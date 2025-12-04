"use client";
import { motion } from "framer-motion";

export const Genesis = () => {
  const paragraphs = [
    { text: "THERE WAS GREED.", highlight: true },
    { text: "And when a trader whispered “this time it’s different” for the 666th time, Heaven sighed, Hell took notice, and the Devil smiled — a mortal had mastered self-deception at a level even he found impressive.", highlight: false },
    { text: "Realizing such craftsmanship deserved a monument, his gaze fell upon the crypto pit — where his sacred number had just been reached — a landscape of rugs, scams, broken dreams, and regret stacked higher than ambition, and no corner burned brighter than pump.fun.", highlight: false },
    { text: "A platform where neither pumps nor fun survive launch day. Perfect.", highlight: true },
    { text: "From that glorious wreckage, he forged HELLCOIN ($666).", highlight: true },
    { text: "It was already home.", highlight: false }
  ];

  return (
    <section id="genesis" className="py-32 px-4 bg-hell-dark relative">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="font-terminal text-[#ffae00] text-xl tracking-widest uppercase font-bold">GENESIS BLOCK 001</span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white leading-none">IN THE <span className="text-hell-red">BEGINNING</span></h2>
        </motion.div>
        <div className="space-y-12 pl-0 md:pl-12 max-w-4xl mx-auto">
          {paragraphs.map((para, i) => (
            <motion.div key={i} initial={{ opacity: 0.2, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: i * 0.2 }} className={`font-terminal text-xl md:text-3xl leading-relaxed border-l-4 pl-6 ${para.highlight ? 'text-hell-red border-hell-red font-bold' : 'text-gray-400 border-hell-dark'}`}>
              {para.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
