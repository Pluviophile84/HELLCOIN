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
    // FIX: Fluid vertical padding [clamp(8rem, 10vw, 20rem)]
    <section id="genesis" className="px-4 bg-hell-dark relative" style={{ paddingTop: 'clamp(8rem, 10vw, 20rem)', paddingBottom: 'clamp(8rem, 10vw, 20rem)' }}>
      {/* FIX: Fluid Max Width [clamp(1000px, 90vw, 2500px)] ensures container grows with screen */}
      <div className="w-full mx-auto" style={{ maxWidth: 'clamp(1000px, 90vw, 2500px)' }}>
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-2"
          // FIX: Fluid margin bottom [clamp(4rem, 6vw, 10rem)]
          style={{ marginBottom: 'clamp(4rem, 6vw, 10rem)' }}
        >
          <span className="font-terminal text-[#ffae00] tracking-widest uppercase font-bold text-[clamp(1.25rem,1.2vw,3rem)]">
            GENESIS BLOCK 001
          </span>
          
          <h2 className="font-gothic text-hell-white leading-none text-[clamp(3.75rem,5vw,12rem)]">
            IN THE <span className="text-hell-red">BEGINNING</span>
          </h2>
        </motion.div>

        {/* --- CONTENT --- */}
        {/* FIX: Fluid max-width for reading area */}
        <div className="w-full mx-auto" style={{ maxWidth: 'clamp(800px, 75vw, 1800px)' }}>
          {/* FIX: Fluid vertical gap between paragraphs */}
          <div className="flex flex-col" style={{ gap: 'clamp(2rem, 3vw, 5rem)' }}>
            {paragraphs.map((para, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`
                  font-terminal leading-relaxed 
                  ${para.highlight ? 'text-hell-red border-hell-red font-bold' : 'text-gray-400 border-hell-dark'}
                `}
                style={{
                  // FIX: Fluid Border Width [clamp(4px, 0.5vw, 10px)]
                  borderLeftWidth: 'clamp(4px, 0.5vw, 10px)',
                  // FIX: Fluid Padding Left [clamp(1.5rem, 2vw, 4rem)]
                  paddingLeft: 'clamp(1.5rem, 2vw, 4rem)',
                  fontSize: 'clamp(1.25rem, 1.1vw, 3rem)'
                }}
              >
                {para.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
