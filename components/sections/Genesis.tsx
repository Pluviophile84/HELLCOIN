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
    <section id="genesis" className="py-32 2xl:py-64 px-4 bg-hell-dark relative">
      {/* FIX: Increased max-width for 4K screens so text doesn't wrap too early */}
      <div className="max-w-5xl 2xl:max-w-[2500px] mx-auto">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-2 mb-16 2xl:mb-32"
        >
          {/* FIX: Reduced growth rate from 2vw to 1.2vw. 
              On 1920px screen, this will be ~23px (manageable) instead of ~38px. */}
          <span className="font-terminal text-[#ffae00] tracking-widest uppercase font-bold text-[clamp(1.25rem,1.2vw,3rem)]">
            GENESIS BLOCK 001
          </span>
          
          {/* FIX: Reduced growth rate from 8vw to 5vw.
              On 1920px screen, this will be ~96px (6rem) instead of ~153px (9.5rem).
              It only hits 12rem on full 4K screens. */}
          <h2 className="font-gothic text-hell-white leading-none text-[clamp(3.75rem,5vw,12rem)]">
            IN THE <span className="text-hell-red">BEGINNING</span>
          </h2>
        </motion.div>

        {/* --- CONTENT --- */}
        <div className="space-y-12 2xl:space-y-24 pl-0 md:pl-12 max-w-4xl 2xl:max-w-[80%] mx-auto">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`
                font-terminal leading-relaxed border-l-4 pl-6 2xl:border-l-8 2xl:pl-12
                /* FIX: Reduced growth rate from 1.5vw to 1.1vw. 
                   Keeps text readable on standard desktops without blowing up. */
                text-[clamp(1.25rem,1.1vw,3rem)]
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
