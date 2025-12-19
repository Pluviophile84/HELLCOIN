"use client";
import { motion } from "framer-motion";
import { SectionKicker } from "../ui/SectionKicker";

export const Genesis = () => {
  return (
    <section
      id="genesis"
      className="hk-section relative overflow-hidden bg-[radial-gradient(1100px_820px_at_18%_10%,rgba(255,60,0,0.20),transparent_60%),radial-gradient(900px_700px_at_82%_18%,rgba(255,174,0,0.06),transparent_55%),radial-gradient(1000px_800px_at_50%_115%,rgba(204,0,0,0.12),transparent_60%),linear-gradient(180deg,rgba(5,5,5,1),rgba(10,10,10,1))] py-28"
    >
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <div className="hk-heat-blob" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <SectionKicker>GENESIS</SectionKicker>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-4 text-center font-gothic text-5xl tracking-wide text-hell-white md:text-6xl"
        >
          IN THE <span className="hk-flame-title">BEGINNING</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="mx-auto mt-6 max-w-3xl text-center font-terminal text-xl text-hell-white/70 md:text-2xl"
        >
          When stupidity reached its sacred number, the Devil finally reacted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          className="hk-ember-edge hk-noise mx-auto mt-14 max-w-4xl rounded-2xl bg-[linear-gradient(180deg,rgba(10,10,10,0.78),rgba(5,5,5,0.92))] p-8 shadow-ember md:p-12"
        >
          <div className="mb-8 rounded-2xl bg-hell-black/30 p-6 shadow-[inset_0_0_0_1px_rgba(255,60,0,0.14)]">
            <p className="font-terminal text-lg text-hell-white/80 md:text-xl">
              The Devil finally reacted — and launched HELLCOIN on pump.fun to commemorate the
              moment stupidity reached its sacred number.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-2 h-3 w-3 rounded-full bg-hell-red shadow-[0_0_18px_rgba(255,60,0,0.35)]"
              />
              <p className="font-terminal text-lg text-hell-white/80 md:text-xl">
                This wasn&apos;t a plan. It was a reaction.
              </p>
            </div>

            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-2 h-3 w-3 rounded-full bg-hell-red shadow-[0_0_18px_rgba(255,60,0,0.35)]"
              />
              <p className="font-terminal text-lg text-hell-white/80 md:text-xl">
                A mirror held up to the charts. A shrine built from bad entries. A meme forged in
                pure regret.
              </p>
            </div>

            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-2 h-3 w-3 rounded-full bg-hell-red shadow-[0_0_18px_rgba(255,60,0,0.35)]"
              />
              <p className="font-terminal text-lg text-hell-white/80 md:text-xl">
                HELLCOIN doesn&apos;t promise utility.
              </p>
            </div>

            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-2 h-3 w-3 rounded-full bg-hell-red shadow-[0_0_18px_rgba(255,60,0,0.35)]"
              />
              <p className="font-terminal text-lg text-hell-white/80 md:text-xl">
                It promises truth: most traders deserve this.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
