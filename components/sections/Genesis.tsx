"use client";
import { motion } from "framer-motion";

export const Genesis = () => {
  const paragraphs = [
    { text: "THERE WAS COPE.", highlight: true },
    { text: "When the first trader whispered, \"This time it’s different,\" Hell was born.", highlight: false },
    { text: "From the ashes of liquidated accounts, burned bridges, and failed presales rose a digital inferno powered by the only renewable energy source in crypto: Regret.", highlight: false },
    { text: "That inferno minted itself as HELLCOIN ($666).", highlight: true },
    { text: "We are the chain of eternal lessons. Our miners are sleepless traders. Our validators are the ones still holding the bag.", highlight: false }
  ];

  return (
    <section id="genesis" className="py-32 px-4 bg-hell-dark relative">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HEADER: CENTERED & STACKED --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          {/* Sub-line: Gold #ffae00, Top, Technical Font */}
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest">
            /// GENESIS_BLOCK_001
          </span>
          
          {/* Title: Big, White, Gothic */}
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white leading-none">
            IN THE <span className="text-hell-red">BEGINNING</span>
          </h2>
        </motion.div>

        {/* --- CONTENT: LEFT ALIGNED (Scripture Style) --- */}
        <div className="space-y-12 pl-0 md:pl-12 max-w-4xl mx-auto">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`
                font-terminal text-2xl md:text-4xl leading-relaxed border-l-4 pl-6
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
