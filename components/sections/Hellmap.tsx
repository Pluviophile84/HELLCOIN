"use client";

import { motion } from "framer-motion";

const STEPS = [
  { title: "ENTRY", text: "You found the coin. You feel powerful. You are not." },
  { title: "FOMO", text: "You buy the top with confidence. The chart laughs." },
  { title: "COPE", text: "You convince yourself it's a healthy correction." },
  { title: "BARGAIN", text: "You promise to take profit next time. You won't." },
  { title: "REKT", text: "The liquidation email arrives. It reads like scripture." },
];

export const Hellmap = () => {
  return (
    <section id="hellmap" className="py-28 bg-hell-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            HELL MAP
          </span>
          <h2 className="font-gothic text-5xl md:text-8xl text-hell-white leading-none">
            THE
            <br />
            DESCENT
          </h2>
        </motion.div>

        <div className="relative border-l-4 border-hell-red/60 pl-8 md:pl-12 space-y-10">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.06 * i }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-[-10px] top-2 w-6 h-6 bg-hell-black border-4 border-hell-red z-10"></div>

              <div className="border border-hell-red/20 bg-hell-dark p-8 shadow-[0_0_40px_rgba(204,0,0,0.12)]">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-hell-red mt-2.5 shrink-0"></div>
                  <div>
                    <h3 className="font-gothic text-3xl text-hell-orange">{s.title}</h3>
                    <p className="font-terminal text-gray-300 text-lg leading-relaxed mt-2">
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Embers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/4 w-[520px] h-[520px] bg-hell-red blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-hell-orange blur-[200px]" />
      </div>
    </section>
  );
};
