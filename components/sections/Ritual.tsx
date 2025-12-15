"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import { SectionKicker } from "@/components/ui/SectionKicker";

export const Ritual = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can fail on some browsers/contexts. Keep UX quiet.
    }
  };

  const steps = [
    {
      num: "01",
      title: "PREPARE THE VESSEL",
      text: "Download Phantom or Jupiter wallet. This will be your wallet for the afterlife.",
    },
    {
      num: "02",
      title: "GATHER THE OFFERING",
      text: "Acquire some SOL. You cannot enter the pit empty-handed.",
    },
    {
      num: "03",
      title: "ENTER THE ALTAR",
      text: "Go to pump.fun or jupiter.ag. Connect your wallet. Do not look back.",
    },
    {
      num: "04",
      title: "ACCEPT YOUR FATE",
      text: "Paste the Contract Address below. Swap your boring coins for eternal glory.",
    },
  ];

  return (
    <section id="ritual" className="relative overflow-hidden bg-hell-black py-32">
      {/* BACKGROUND: THE PENTAGRAM */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none">
        <svg
          viewBox="0 0 100 100"
          className="h-[180vw] w-[180vw] animate-spin-slow text-hell-red md:h-[1000px] md:w-[1000px]"
          style={{ opacity: 0.05, animationDuration: "60s" }}
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M50 2 L79 90 L2 35 L98 35 L21 90 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* --- HEADER --- */}
        <div className="mb-24 flex flex-col items-center gap-2 text-center">
          <SectionKicker>INITIATION SEQUENCE</SectionKicker>

          <h2 className="text-center font-gothic text-6xl text-hell-white md:text-8xl">
            THE <span className="text-hell-red">RITUAL</span>
          </h2>
        </div>

        {/* STEPS GRID */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group flex items-start gap-6"
            >
              {/* FIX: Number is now always bright red (text-hell-red) */}
              <span className="shrink-0 font-gothic text-8xl leading-none text-hell-red transition-colors">
                {step.num}
              </span>
              <div>
                {/* FIX: Reduced title size (text-xl md:text-2xl) and added group-hover border brightness */}
                <h3 className="mb-2 inline-block border-b border-hell-red/30 pb-2 font-terminal text-xl font-semibold uppercase text-hell-gold transition-colors duration-300 group-hover:border-hell-red md:text-2xl">
                  {step.title}
                </h3>
                <p className="max-w-sm font-terminal text-xl text-hell-white/70">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CONTRACT BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-4 text-center">
            <span className="animate-pulse border border-hell-red/20 bg-hell-red/10 px-4 py-1 font-terminal text-xl text-hell-red">
              CONTRACT ADDRESS
            </span>
          </div>
          <div className="flex flex-col items-center gap-4 border-2 border-hell-red bg-hell-black p-2 shadow-[0_0_30px_rgba(204,0,0,0.2)] md:flex-row md:p-4">
            <div className="w-full flex-1 break-all border border-hell-white/10 bg-hell-dark/50 p-4 text-center font-terminal text-xl text-hell-white md:text-left md:text-2xl">
              {CONTRACT_ADDRESS}
            </div>
            <button
              onClick={handleCopy}
              className="flex w-full min-w-[180px] items-center justify-center gap-2 bg-hell-red px-8 py-4 font-bold text-white transition-all hover:bg-hell-orange active:scale-95 md:w-auto"
            >
              {copied ? <Check size={24} /> : <Copy size={24} />}
              {copied ? "COPIED!" : "COPY CA"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
