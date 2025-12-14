"use client";
import { motion } from "framer-motion";

export const Genesis = () => {
  return (
    <section id="genesis" className="py-32 bg-hell-dark overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            THE GENESIS
          </span>

          <h2 className="font-gothic text-6xl md:text-8xl text-flame leading-none">
            THE DEVIL <br />
            FINALLY REACTED
          </h2>
        </motion.div>

        {/* Scripture Box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="border border-hell-red/30 bg-hell-black p-10 md:p-14 shadow-[0_0_80px_rgba(204,0,0,0.18)] max-w-5xl mx-auto"
        >
          <p className="font-terminal text-gray-300 text-xl md:text-2xl leading-relaxed">
            The Devil once held the sacred number as a boundary —{" "}
            <span className="text-[#ffae00] font-bold">666</span> — the mark where greed
            should have stopped.
          </p>

          <p className="font-terminal text-gray-400 text-lg md:text-xl leading-relaxed mt-6">
            But traders… traders had mastered self-deception at a level even he found
            impressive.
          </p>

          <p className="font-terminal text-gray-400 text-lg md:text-xl leading-relaxed mt-6">
            So he did what any rational entity does when humanity reaches peak stupidity:
          </p>

          <p className="font-gothic text-4xl md:text-6xl text-hell-red mt-10">
            He launched <span className="text-[#ffae00]">HELLCOIN</span>.
          </p>

          <p className="font-terminal text-gray-400 text-lg md:text-xl leading-relaxed mt-8">
            A coin forged from pure regret. Powered by Proof-of-Suffering. Built for the
            overleveraged and the eternally optimistic.
          </p>

          <p className="font-terminal text-gray-500 text-base md:text-lg mt-10 uppercase tracking-widest">
            Born in the red. Forged by regret.
          </p>
        </motion.div>
      </div>

      {/* Background Embers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-hell-red blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-hell-orange blur-[160px]" />
      </div>
    </section>
  );
};
