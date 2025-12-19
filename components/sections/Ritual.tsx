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
    <section
      id="ritual"
      className="hk-noise relative overflow-hidden bg-[radial-gradient(900px_540px_at_50%_0%,rgba(255,60,0,0.18),transparent_60%),radial-gradient(800px_560px_at_10%_40%,rgba(255,174,0,0.08),transparent_60%),linear-gradient(180deg,rgba(5,5,5,1),rgba(8,8,11,1))] py-32"
    >
      {/* BACKGROUND: THE PENTAGRAM */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none">
        <svg
          viewBox="0 0 100 100"
          className="h-[180vw] w-[180vw] animate-spin-slow text-hell-red motion-reduce:animate-none md:h-[1000px] md:w-[1000px]"
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
              className="hk-ember-edge hk-noise group flex items-start gap-6 rounded-2xl bg-hell-black/35 p-6 shadow-ember transition-all duration-200 hover:-translate-y-1 hover:shadow-deep"
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
            <span className="animate-rune-pulse border border-hell-red/20 bg-hell-red/10 px-4 py-1 font-terminal text-xl text-hell-red motion-reduce:animate-none">
              CONTRACT ADDRESS
            </span>
          </div>
          <div className="hk-ember-edge hk-noise flex flex-col items-center gap-4 rounded-2xl bg-hell-black/55 p-2 shadow-deep backdrop-blur-sm md:flex-row md:p-4">
            <div className="w-full flex-1 break-all border border-hell-white/10 bg-hell-dark/50 p-4 text-center font-terminal text-xl text-hell-white md:text-left md:text-2xl">
              {CONTRACT_ADDRESS}
            </div>
            <button
              onClick={handleCopy}
              className="hk-ember-edge flex w-full min-w-[180px] items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,rgba(204,0,0,0.92),rgba(255,51,0,0.92))] px-8 py-4 font-bold text-white shadow-ember transition-all hover:brightness-110 active:scale-95 md:w-auto"
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
