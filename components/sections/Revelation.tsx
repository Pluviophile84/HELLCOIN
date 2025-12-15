"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const Revelation = () => {
  return (
    <section
      id="revelation"
      className="relative flex min-h-screen flex-col overflow-hidden bg-hell-black md:flex-row"
    >
      {/* --- LEFT SIDE: THE LIE --- */}
      <div className="group relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-r border-hell-red/20 p-8 md:w-1/2 md:p-12">
        {/* Background Image */}
        <Image
          src="/GOAPE-Edited.png"
          alt="The Devil"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="absolute inset-0 transform object-cover opacity-50 grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
        />

        {/* Heavy Overlay for Text Readability */}
        <div className="absolute inset-0 bg-hell-black/80" />

        <div className="relative z-10 w-full max-w-md text-center">
          {/* HEADER MATCHING GENESIS STYLE */}
          <div className="mb-6 flex flex-col items-center gap-2">
            {/* SUB-LINE: Full Brightness Gold */}
            <span className="font-terminal text-lg uppercase tracking-widest text-hell-gold md:text-xl">
              DECEPTION DETECTED
            </span>
            {/* TITLE: Full Brightness White/Red */}
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-gothic text-6xl tracking-wide md:text-8xl"
            >
              <span className="text-hell-white">THE</span>{" "}
              <span className="text-hell-red">LIE</span>
            </motion.h3>
          </div>

          {/* The List of Lies */}
          <div className="space-y-3 font-terminal text-lg leading-relaxed text-hell-white md:text-2xl">
          <p>&quot;Utility.&quot; &quot;Roadmaps.&quot; &quot;Communities.&quot;</p>
          <p>&ldquo;Dev is doxxed.&rdquo;</p>
          <p>&ldquo;Influencer-backed.&rdquo;</p>
          <p>&ldquo;Strong fundamentals.&rdquo;</p>
          <p>&ldquo;Early entry.&rdquo; &ldquo;Holding the floor.&rdquo;</p>
          <p className="text-hell-red">&ldquo;This time it’s different.&rdquo;</p>
          <p>&ldquo;Memecoins don’t rug — they ‘restart.’&rdquo;</p>
        </div>


          <div className="mt-8 border-t border-hell-white/10 pt-6">
            <p className="font-terminal text-lg text-hell-white">
              Every illusion needed to convert <br />
              <span className="text-hell-red">hope into fertilizer.</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE TRUTH --- */}
      <div className="relative flex flex-col justify-center border-t border-hell-red/20 bg-hell-black p-8 md:w-1/2 md:border-l md:border-t-0 md:p-12">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-lg"
        >
          {/* HEADER */}
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <span className="font-terminal text-lg uppercase tracking-widest text-hell-gold md:text-xl">
              THE TRUTH
            </span>
            <h2 className="font-gothic text-5xl leading-none text-hell-white md:text-8xl">
              REALITY <span className="text-hell-red">CHECK.</span>
            </h2>
          </div>

          {/* THE MANIFESTO */}
          <div className="space-y-6 font-terminal text-lg leading-relaxed text-hell-white md:text-xl">
            <p className="border-l-2 border-hell-red pl-4 text-xl text-white md:text-2xl">
              Crypto is <span className="text-hell-gold">revolutionary</span>; degens made it a
              casino, and bad actors made it a buffet.
            </p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>No one has alpha — only confidence disorders.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Influencers aren’t guides; they’re exit liquidity with followers.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>
                  Utility is optional.{" "}
                  <span className="text-hell-gold">Delusion is mandatory.</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Volume is dopamine wearing a business suit.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Every community is a therapy group for people who bought the top.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Memecoins don’t die — they simply stop being mentioned.</span>
              </li>
            </ul>

            {/* GOLD BOX */}
            <div className="mt-10 w-full border border-hell-gold/30 bg-hell-gold/5 p-6">
              <p className="text-center text-xl leading-tight text-white md:text-2xl">
                <span className="mb-2 block font-gothic text-3xl text-hell-red md:text-4xl">
                  HELLCOIN
                </span>
                is the only project honest enough to admit it — and bold enough to expose it.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
