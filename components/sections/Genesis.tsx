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
    <section id="genesis" className="relative bg-hell-dark px-4 py-[clamp(5rem,8vw,12rem)]">
      {/* FIX: Tighter container for readability on 23" screen */}
      <div className="mx-auto w-full max-w-[1400px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-2 mb-[clamp(3rem,5vw,6rem)]"
        >
          <span className="font-terminal text-[#ffae00] tracking-widest uppercase font-bold text-[clamp(1.25rem,1.5vw,2rem)]">
            GENESIS BLOCK 001
          </span>
          
          <h2 className="font-gothic text-hell-white leading-none text-[clamp(3.5rem,7vw,9rem)]">
            IN THE <span className="text-hell-red">BEGINNING</span>
          </h2>
        </motion.div>

        <div className="mx-auto flex flex-col gap-y-[clamp(1.5rem,2.5vw,3rem)] pl-0 md:pl-8 max-w-4xl 2xl:max-w-6xl">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`
                font-terminal leading-relaxed border-l-4 pl-[clamp(1.5rem,2vw,3rem)]
                /* FIX: Larger body text base */
                text-[clamp(1.25rem,1.3vw,2rem)]
                ${para.highlight ? 'text-hell-red border-hell-red font-bold' : 'text-gray-400 border-hell-dark'}
              `}
            >
              {para.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
