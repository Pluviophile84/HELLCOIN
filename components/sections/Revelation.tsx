"use client";
import { motion } from "framer-motion";

export const Revelation = () => {
  return (
    <section id="revelation" className="py-32 bg-hell-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            THE REVELATION
          </span>

          <h2 className="font-gothic text-5xl md:text-8xl text-flame leading-none">
            THE TRUTH <br /> HAS BEEN SPOKEN
          </h2>
        </motion.div>

        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-10"
        >
          <p className="font-terminal text-gray-300 text-xl md:text-2xl leading-relaxed">
            Most memecoins pretend they’re a revolution.
            <br />
            A “movement.” A “community.” A “new paradigm.”
          </p>

          <p className="font-terminal text-gray-400 text-lg md:text-xl leading-relaxed">
            But the market doesn’t care about your roadmap.
            <br />
            It cares about one thing:
          </p>

          <p className="font-gothic text-5xl md:text-7xl text-hell-red leading-none">
            PAIN.
          </p>

          <p className="font-terminal text-gray-300 text-xl md:text-2xl leading-relaxed">
            Every candle is a confession.
            <br />
            Every chart is a trial.
            <br />
            Every holder is either a survivor…
            <br />
            or a lesson.
          </p>

          <p className="font-terminal text-gray-400 text-lg md:text-xl leading-relaxed">
            HELLCOIN does not promise salvation.
            <br />
            It only promises what crypto always delivers:
          </p>

          <p className="font-gothic text-4xl md:text-6xl text-[#ffae00] leading-none">
            CHARACTER DEVELOPMENT.
          </p>

          <p className="font-terminal text-gray-500 text-base md:text-lg uppercase tracking-widest pt-6">
            Proof-of-Suffering is not a gimmick. It is the only honest consensus.
          </p>
        </motion.div>
      </div>

      {/* Background Embers / Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/3 right-1/4 w-[520px] h-[520px] bg-hell-red blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-hell-orange blur-[180px]" />
      </div>
    </section>
  );
};
