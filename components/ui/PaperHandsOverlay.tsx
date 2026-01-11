"use client";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/bodyScrollLock";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PaperHandsProps {
  isActive: boolean;
  onClose: () => void;
}

type Phase = "idle" | "heaven" | "burning" | "reality";

export const PaperHandsOverlay = ({ isActive, onClose }: PaperHandsProps) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const flameCount = reduceMotion ? 0 : isSmallScreen ? 12 : 30;
  const flames = useMemo(() => {
    return Array.from({ length: flameCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 0.5,
      duration: 0.5 + Math.random() * 1.5,
      size: 40 + Math.random() * 60,
    }));
  }, [flameCount]);

  useEffect(() => {
    const shouldLock = isActive || phase === "heaven" || phase === "burning";

    if (shouldLock) {
      lockBodyScroll("overlay:paperhands");
    } else {
      unlockBodyScroll("overlay:paperhands");
    }

    return () => {
      unlockBodyScroll("overlay:paperhands");
    };
  }, [isActive, phase]);

  useEffect(() => {
    if (!isActive) return;

    setPhase("heaven");
    setProgress(0);

    const progressTimer = setTimeout(() => setProgress(100), 50);

    const timer1 = setTimeout(() => {
      setPhase("burning");
    }, 5000);

    const timer2 = setTimeout(() => {
      setPhase("reality");
      onClose();
    }, 9000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive, onClose]);

  useEffect(() => {
    if (!isActive && phase !== "reality") {
      setPhase("idle");
      setProgress(0);
    }
  }, [isActive, phase]);

  useEffect(() => {
    if (phase === "reality") {
      const timer = setTimeout(() => {
        setPhase("idle");
        setProgress(0);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (phase === "idle" && !isActive) return null;

  return (
    <>
      <AnimatePresence>
        {(phase === "heaven" || phase === "burning") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Heaven mode overlay"
            className={cn(
              "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden p-4 text-center transition-colors duration-200",
              phase === "burning" ? "hellfire-bg text-white" : "bg-pink-100 text-pink-500"
            )}
          >
            {phase === "heaven" && (
              <motion.div
                key="heaven-content"
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.5, filter: "blur(1.25rem)" }
                }
                transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
                className="relative z-20 flex w-full max-w-lg flex-col items-center"
              >
                <div className="mb-6 animate-bounce text-7xl motion-reduce:animate-none md:text-8xl">
                  🦄
                </div>

                <h1 className="text-cartoon-sm mb-4 font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
                  EVERYTHING IS FINE!
                </h1>

                <p className="mb-8 px-4 font-body text-lg font-bold text-pink-400 md:text-2xl">
                  Welcome to the Safe Space! No red candles here!{" "}
                  <span className="text-pink-600">To the Moon!</span> 🚀✨🌈
                </p>

                <div className="mb-4 h-4 w-full overflow-hidden rounded-lg border-3 border-black bg-white shadow-brutal-sm">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all ease-linear"
                    style={{
                      width: `${progress}%`,
                      transitionDuration: progress === 0 ? "0ms" : "5000ms",
                    }}
                  ></div>
                </div>
                <p className="font-body text-sm font-bold text-pink-300">
                  Ignoring reality in 5...
                </p>
              </motion.div>
            )}

            {phase === "burning" && (
              <motion.div
                key="burning-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.1 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.4 }}
                className="relative z-30 flex w-full flex-col items-center px-2"
              >
                <h1 className="text-cartoon mb-8 font-heading text-4xl leading-none tracking-tighter text-white drop-shadow-[0_0.3125rem_0.3125rem_rgba(0,0,0,0.8)] md:text-9xl">
                  REALITY CHECK
                </h1>

                <p className="max-w-full -rotate-2 break-words rounded-xl border-3 border-black bg-obsidian-950 px-4 py-2 text-center font-heading text-xl uppercase text-gold shadow-brutal sm:text-2xl md:max-w-[90vw] md:px-6 md:text-4xl">
                  WENDY&apos;S IS STILL HIRING
                </p>
              </motion.div>
            )}

            {phase === "burning" && (
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-hellfire-red via-hellfire-orange to-lava-300 opacity-90"></div>

                {flames.map((flame) => (
                  <motion.div
                    key={flame.id}
                    initial={{ y: "110vh", x: "-50%", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 1, 0], scale: [1, 2] }}
                    transition={{
                      duration: flame.duration,
                      delay: flame.delay,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      left: flame.left,
                      fontSize: flame.size,
                      filter: "blur(0.0625rem)",
                      willChange: "transform",
                    }}
                    className="absolute"
                  >
                    🔥
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "reality" && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            role="status"
            aria-live="polite"
            transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
            className="hellfire-bg fixed bottom-10 left-4 right-4 z-[101] mx-auto max-w-sm animate-bounce rounded-xl border-3 border-black p-6 font-body text-xl text-white shadow-brutal motion-reduce:animate-none lg:left-auto lg:right-6 lg:mx-0"
          >
            <div className="flex items-center gap-4">
              <AlertTriangle size={32} className="text-gold" />
              <div>
                <strong className="block font-heading text-2xl">NICE TRY.</strong>
                You can&apos;t escape reality.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
