"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const CONTRACT_ADDRESS = "0x6666666666666666666666666666666666666666";

export const Ritual = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // no-op
    }
  };

  return (
    <section id="ritual" className="py-28 bg-hell-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            THE RITUAL
          </span>
          <h2 className="font-gothic text-5xl md:text-8xl text-hell-white leading-none">
            HOW TO BUY
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
            className="border border-hell-red/20 bg-hell-dark p-8 shadow-[0_0_40px_rgba(204,0,0,0.12)]"
          >
            <h3 className="font-gothic text-3xl text-hell-orange mb-4">1. ENTER THE PIT</h3>
            <p className="font-terminal text-gray-300 text-lg leading-relaxed">
              Open Raydium and stare into the abyss. This is where rationality goes to die.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="border border-hell-red/20 bg-hell-dark p-8 shadow-[0_0_40px_rgba(204,0,0,0.12)]"
          >
            <h3 className="font-gothic text-3xl text-hell-orange mb-4">2. PASTE THE SIGIL</h3>
            <p className="font-terminal text-gray-300 text-lg leading-relaxed">
              Copy the contract address below. Don’t improvise. Typos are how you summon scam demons.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="border border-hell-red/20 bg-hell-dark p-8 shadow-[0_0_40px_rgba(204,0,0,0.12)]"
          >
            <h3 className="font-gothic text-3xl text-hell-orange mb-4">3. ACCEPT YOUR FATE</h3>
            <p className="font-terminal text-gray-300 text-lg leading-relaxed">
              Set slippage like a degenerate philosopher and press swap. Congratulations, you’re now a statistic.
            </p>
          </motion.div>
        </div>

        {/* CA Block */}
        <div className="flex flex-col items-center gap-6">
          <span className="font-terminal text-hell-red text-xl bg-hell-red/10 px-4 py-1 border border-hell-red/20 animate-pulse">
            CONTRACT ADDRESS
          </span>

          <div className="bg-black border-2 border-hell-red p-2 md:p-4 flex flex-col md:flex-row items-center gap-4 shadow-[0_0_30px_rgba(204,0,0,0.2)]">
            <div className="flex-1 w-full bg-hell-dark/50 p-4 border border-hell-red/20 font-terminal text-lg md:text-2xl text-gray-300 break-all text-center md:text-left">
              {CONTRACT_ADDRESS}
            </div>

            <button
              onClick={handleCopy}
              className="w-full md:w-auto min-w-[160px] bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-xl py-4 px-6 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={22} />
                  COPIED
                </>
              ) : (
                <>
                  <Copy size={22} />
                  COPY
                </>
              )}
            </button>
          </div>

          <a
            href="https://raydium.io/swap"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-transparent border-2 border-hell-red text-hell-red font-gothic text-3xl px-10 py-5 uppercase transition-all hover:text-hell-white hover:border-hell-orange hover:shadow-[0_0_35px_rgba(204,0,0,0.6)]"
          >
            ACQUIRE $666
          </a>
        </div>
      </div>

      {/* Embers */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/4 w-[520px] h-[520px] bg-hell-red blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[720px] h-[720px] bg-hell-orange blur-[190px]" />
      </div>
    </section>
  );
};
