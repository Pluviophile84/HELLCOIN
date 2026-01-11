"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import { Copy, Check, Wallet, Coins, Globe, Flame } from "lucide-react";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import { SectionKicker } from "@/components/ui/SectionKicker";
import {
  staggerContainer,
  fadeInUp,
  cardHover,
  getVariants,
  getInitial,
  getWhileInView,
  getHover,
} from "@/lib/animations";
import { useViewportOnce } from "@/lib/useViewportMarginRem";

const steps = [
  {
    num: "01",
    title: "PREPARE THE VESSEL",
    text: "Download Phantom or Jupiter wallet. This will be your vessel for the descent.",
    icon: Wallet,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    num: "02",
    title: "GATHER THE OFFERING",
    text: "Acquire some SOL. You cannot enter the pit empty-handed.",
    icon: Coins,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    num: "03",
    title: "ENTER THE ALTAR",
    text: "Go to pump.fun or jupiter.ag. Connect your wallet. Do not look back.",
    icon: Globe,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    num: "04",
    title: "ACCEPT YOUR FATE",
    text: "Paste the Contract Address below. Swap your boring coins for eternal glory.",
    icon: Flame,
    color: "text-hellfire-orange",
    bgColor: "bg-hellfire-orange/10",
  },
];

export const Ritual = () => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const reduceMotion = useReducedMotion();
  const viewport = useViewportOnce();
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    // Clear any existing timers
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setCopyError(false);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      errorTimerRef.current = setTimeout(() => setCopyError(false), 2000);
    }
  }, []);

  return (
    <section id="ritual" className="cave-texture relative overflow-hidden bg-obsidian-900 py-32">
      {/* Background pentagram */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none">
        <svg
          viewBox="0 0 100 100"
          className="h-[180vw] w-[180vw] animate-spin-slow text-hellfire-red motion-reduce:animate-none md:h-[62.5rem] md:w-[62.5rem]"
          style={{ opacity: 0.03 }}
          aria-hidden="true"
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 3xl:max-w-6xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <SectionKicker>INITIATION SEQUENCE</SectionKicker>
          <h2 className="text-center font-heading text-5xl font-black text-lava-50 md:text-6xl 3xl:text-7xl">
            THE <span className="hellfire-text-pure pr-1">RITUAL</span>
          </h2>
          <p className="max-w-md font-body text-lg text-lava-100/60">
            Four steps to eternal damnation. Follow carefully.
          </p>
        </div>

        {/* Steps grid */}
        <motion.div
          variants={getVariants(staggerContainer, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={viewport}
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={getVariants(fadeInUp, reduceMotion)}
              whileHover={getHover(cardHover, reduceMotion)}
              className="group relative overflow-hidden rounded-xl hc-border-3 border-black bg-obsidian-800 shadow-brutal transition-shadow duration-200 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.5)]"
            >
              {/* Background silhouette icon */}
              <step.icon
                size={120}
                strokeWidth={1}
                className="pointer-events-none absolute -bottom-6 -right-6 text-obsidian-900/50 transition-all duration-300 group-hover:scale-110 group-hover:text-obsidian-900/80"
              />

              {/* Header with step number */}
              <div className={`relative z-10 border-b-3 border-black p-4 ${step.bgColor}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-heading text-3xl ${step.color}`}>{step.num}</span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black ${step.bgColor}`}
                  >
                    <step.icon size={20} className={step.color} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-5">
                <h3 className="mb-3 font-body text-lg font-bold uppercase tracking-wide text-gold md:text-xl">
                  {step.title}
                </h3>
                <p className="font-body text-lg text-lava-100/70">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contract address section */}
        <motion.div
          variants={getVariants(fadeInUp, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={viewport}
        >
          {/* Label */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-hellfire-orange/30" />
            <span className="inline-block rounded-lg border-3 border-black bg-lava-500/20 px-5 py-2 font-body text-sm font-bold uppercase tracking-widest text-hellfire-orange shadow-brutal-sm">
              CONTRACT ADDRESS
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-hellfire-orange/30" />
          </div>

          {/* Contract box */}
          <div className="rounded-xl hc-border-3 border-black bg-obsidian-800 p-4 shadow-brutal transition-all duration-200 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)] md:p-6">
            <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
              {/* Address */}
              <div className="flex-1 break-all rounded-lg border-3 border-black bg-obsidian-950 p-4 text-center font-mono text-sm text-lava-100 md:text-left md:text-base">
                {CONTRACT_ADDRESS}
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                aria-live="polite"
                className={`flex w-full min-w-[10rem] items-center justify-center gap-2 rounded-lg border-3 border-black px-6 py-4 font-heading text-lg font-bold text-white shadow-brutal transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95 md:w-auto ${
                  copied
                    ? "bg-green-500"
                    : copyError
                      ? "bg-red-500"
                      : "hellfire-bg hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)]"
                }`}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? "COPIED!" : copyError ? "FAILED" : "COPY CA"}
              </button>
            </div>
          </div>

          {/* Hint */}
          <p className="mt-4 text-center font-body text-sm text-lava-100/40">
            Paste this into your DEX of choice. There is no turning back.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
