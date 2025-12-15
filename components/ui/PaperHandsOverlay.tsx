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

  // Detect small screens once (and on resize) so we can avoid melting phones.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsSmallScreen(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Generate flame particles (memoized). We scale down on small screens and respect reduced-motion.
  const flameCount = reduceMotion ? 0 : isSmallScreen ? 24 : 50;
  const flames = useMemo(() => {
    return Array.from({ length: flameCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 0.5, // Start quickly
      duration: 0.5 + Math.random() * 1.5, // Faster movement
      size: 40 + Math.random() * 60, // Bigger flames
    }));
  }, [flameCount]);

  // --- SCROLL LOCK EFFECT ---
  // Prevents the background website from scrolling ONLY during the immersive phases.
  // Uses a shared keyed lock so it won't fight other features (e.g. mobile menu).
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

  // Handle the main sequence (Heaven -> Burning -> Reality)
  useEffect(() => {
    if (!isActive) return;

    let progressTimer: ReturnType<typeof setTimeout> | undefined;
    let timer1: ReturnType<typeof setTimeout> | undefined;
    let timer2: ReturnType<typeof setTimeout> | undefined;

    setPhase("heaven");
    // 1. Reset progress instantly
    setProgress(0);

    // 2. Start animation after tiny delay to ensure browser sees the 0
    progressTimer = setTimeout(() => setProgress(100), 50);

    // STEP 1: TRANSITION TO BURNING (After 5s)
    timer1 = setTimeout(() => {
      setPhase("burning");
    }, 5000);

    // STEP 2: SHOW REALITY CHECK + CLOSE OVERLAY (After another 4s)
    timer2 = setTimeout(() => {
      setPhase("reality");
      onClose();
    }, 9000); // 5s + 4s

    return () => {
      if (progressTimer) clearTimeout(progressTimer);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [isActive, onClose]);

  // Reset when inactive, but preserve 'reality' phase so the separate effect handles it
  useEffect(() => {
    if (!isActive && phase !== "reality") {
      setPhase("idle");
      setProgress(0);
    }
  }, [isActive, phase]);

  // Separate effect to handle the "Nice Try" toast lifespan
  useEffect(() => {
    if (phase === "reality") {
      const timer = setTimeout(() => {
        setPhase("idle");
        setProgress(0);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // If completely idle, render nothing
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
              // Instant red flash when burning starts
              phase === "burning" ? "bg-red-600 text-white" : "bg-pink-100 text-pink-500"
            )}
          >
            {/* --- PHASE 1: HEAVEN CONTENT --- */}
            {phase === "heaven" && (
              <motion.div
                key="heaven-content"
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : ({ opacity: 0, scale: 1.5, filter: "blur(20px)" } as any)
                } // Explodes out (unless reduced-motion)
                transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
                className="relative z-20 flex w-full max-w-lg flex-col items-center"
              >
                {/* FIX: Smaller Emoji size for mobile (5xl vs 8xl) */}
                <div className="mb-6 animate-bounce text-5xl motion-reduce:animate-none md:text-8xl">
                  🦄
                </div>

                {/* FIX: Smaller Title (2xl vs 5xl) */}
                <h1 className="mb-4 font-sans text-2xl font-black leading-tight md:text-5xl">
                  EVERYTHING IS FINE!
                </h1>

                {/* FIX: Smaller Body Text (lg vs 2xl) */}
                <p className="mb-8 px-4 font-sans text-lg font-bold text-pink-400 md:text-2xl">
                  Welcome to the Safe Space! No red candles here! Only vibes! 🚀✨🌈
                </p>

                <div className="mb-4 h-4 w-full overflow-hidden border border-pink-300 bg-white shadow-sm">
                  <div
                    className="h-full bg-pink-500 transition-all ease-linear"
                    style={{
                      width: `${progress}%`,
                      transitionDuration: progress === 0 ? "0ms" : "5000ms",
                    }}
                  ></div>
                </div>
                <p className="font-sans text-sm font-bold text-pink-300">
                  Ignoring reality in 5...
                </p>
              </motion.div>
            )}

            {/* --- PHASE 2: BURNING CONTENT --- */}
            {phase === "burning" && (
              <motion.div
                key="burning-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.1 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.4 }}
                className="relative z-30 flex w-full flex-col items-center px-2"
              >
                {/* FIX: Smaller Title on Mobile (4xl vs 9xl) */}
                <h1 className="mb-8 font-sans text-4xl font-black leading-none tracking-tighter text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] md:text-9xl">
                  REALITY CHECK
                </h1>

                {/* FIX: Responsive Card Sizing (text-lg vs text-4xl) */}
                <p className="max-w-full -rotate-2 break-words border-4 border-yellow-300 bg-black px-4 py-2 text-center font-mono text-lg font-bold uppercase text-yellow-300 shadow-xl md:max-w-[90vw] md:px-6 md:text-4xl">
                  WENDY&apos;S IS STILL HIRING
                </p>
              </motion.div>
            )}

            {/* --- FIRE ANIMATION LAYER --- */}
            {phase === "burning" && (
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-600 to-orange-500 opacity-90"></div>

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
                      filter: "blur(1px)",
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

      {/* --- PHASE 3: REALITY SNACKBAR --- */}
      <AnimatePresence>
        {phase === "reality" && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            role="status"
            aria-live="polite"
            transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
            className="fixed bottom-10 right-4 z-[101] animate-bounce border-4 border-black bg-hell-red p-6 font-terminal text-xl text-hell-white shadow-[10px_10px_0px_#000] motion-reduce:animate-none md:right-10"
          >
            <div className="flex items-center gap-4">
              <AlertTriangle size={32} className="text-yellow-400" />
              <div>
                <strong className="block font-gothic text-2xl">NICE TRY.</strong>
                You can&apos;t escape reality.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
