"use client";

import { motion } from "framer-motion";

const TYPES = [
  {
    title: "THE BAGHOLDER",
    desc: "Believes the dip is temporary. Has lived in the dip since 2021.",
  },
  {
    title: "THE REVENGE TRADER",
    desc: "Turns one loss into a saga. The market is not impressed.",
  },
  {
    title: "THE OVERLEVERAGED PROPHET",
    desc: "Says “I’m early.” Is actually just wrong sooner than most.",
  },
  {
    title: "THE JEET",
    desc: "Sells at the first green candle. Then watches it 100x in silence.",
  },
  {
    title: "THE DELUSIONAL OPTIMIST",
    desc: "Reads charts like horoscopes. Still gets rugged for science.",
  },
  {
    title: "THE “JUST ONE MORE TRADE” GUY",
    desc: "One more trade away from freedom. Also one more trade away from Wendy’s.",
  },
  {
    title: "THE INFLUENCER",
    desc: "Shills “high conviction.” Owns 0.003% and a ring light.",
  },
  {
    title: "THE LIQUIDATION ARTIST",
    desc: "Master of speedrunning a portfolio to zero.",
  },
  {
    title: "THE SURVIVOR",
    desc: "Has seen it all. Still returns. Nobody knows why.",
  },
];

export const NineTypes = () => {
  return (
    <section id="nine-types" className="py-28 bg-hell-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            THE NINE TYPES OF REKT
          </span>
          <h2 className="font-gothic text-5xl md:text-8xl text-hell-white leading-none">
            PICK YOUR
            <br />
            CURSE
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TYPES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 * i }}
              viewport={{ once: true }}
              className="border border-hell-red/20 bg-hell-black p-8 shadow-[0_0_40px_rgba(204,0,0,0.12)] group hover:border-hell-red/50 group-hover:bg-hell-red/10 transition-all"
            >
              <h3 className="font-gothic text-3xl text-hell-orange mb-4">{t.title}</h3>
              <p className="font-terminal text-gray-300 text-lg leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Embers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 right-1/4 w-[520px] h-[520px] bg-hell-red blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-hell-orange blur-[200px]" />
      </div>
    </section>
  );
};
