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
    <section id="genesis" className="relative bg-hell-dark px-4 py-24 sm:py-32 md:py-40 lg:py-48 xl:py-56 2xl:py-64">
      <div className="mx-auto w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[1800px]">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center gap-2 mb-16 sm:mb-20 md:mb-24 2xl:mb-32">
          <span className="font-terminal text-[#ffae00] tracking-widest uppercase font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            GENESIS BLOCK 001
          </span>
          <h2 className="font-gothic text-hell-white leading-none text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[11rem]">
            IN THE <span className="text-hell-red">BEGINNING</span>
          </h2>
        </motion.div>

        <div className="mx-auto flex flex-col gap-y-8 sm:gap-y-10 md:gap-y-12 2xl:gap-y-16 pl-0 md:pl-8 max-w-4xl 2xl:max-w-6xl">
          {paragraphs.map((para, i) => (
            <motion.div key={i} initial={{ opacity: 0.2, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`font-terminal leading-relaxed border-l-4 pl-6 sm:pl-8 2xl:pl-10 text-xl sm:text-2xl md:text-3xl 2xl:text-5xl ${para.highlight ? 'text-hell-red border-hell-red font-bold' : 'text-gray-400 border-hell-dark'}`}>
              {para.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
