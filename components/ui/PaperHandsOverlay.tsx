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
              "hk-noise fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden p-4 text-center",
              phase === "burning"
                ? "bg-[radial-gradient(900px_650px_at_50%_0%,rgba(255,60,0,0.42),transparent_55%),radial-gradient(800px_520px_at_50%_80%,rgba(255,174,0,0.16),transparent_60%),linear-gradient(180deg,rgba(8,8,11,0.98),rgba(5,5,5,1))] text-hell-white"
                : "bg-[radial-gradient(900px_650px_at_50%_0%,rgba(255,174,0,0.28),rgba(246,239,229,0.95)_48%,rgba(255,255,255,0.92)_74%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,239,229,0.90))] text-hell-dark"
            )}
          >
            {/* ambient framing */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {phase === "heaven" && (
                <>
                  <div className="absolute left-1/2 top-10 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(255,174,0,0.0),rgba(255,174,0,0.30),rgba(255,255,255,0.0),rgba(255,174,0,0.18),rgba(255,174,0,0.0))] opacity-60 blur-2xl motion-reduce:hidden" />
                  <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_50%_0%,rgba(255,174,0,0.12),transparent_60%)]" />
                  <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
                </>
              )}

              {phase === "burning" && (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,60,0,0.22),transparent_60%)]" />
                  <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" />
                  <div className="absolute -bottom-40 left-1/2 h-[860px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,60,0,0.20),transparent_72%)] blur-2xl motion-reduce:hidden" />
                </>
              )}
            </div>

            {/* --- PHASE 1: HEAVEN CONTENT --- */}
            {phase === "heaven" && (
              <motion.div
                key="heaven-content"
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : ({ opacity: 0, scale: 1.5, filter: "blur(20px)" } as any)
                }
                transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
                className="relative z-20 flex w-full max-w-lg flex-col items-center"
              >
                {/* mascot glyph */}
                <div className="relative mb-7 flex items-center justify-center">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,174,0,0.30),transparent_72%)] blur-xl motion-reduce:hidden"
                  />
                  <div className="hk-ember-edge rounded-full bg-white/65 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.18)] backdrop-blur-md">
                    <div className="animate-bounce text-5xl motion-reduce:animate-none md:text-8xl">
                      🦄
                    </div>
                  </div>
                </div>

                <h1 className="mb-4 font-gothic text-2xl font-black leading-tight tracking-wide md:text-5xl">
                  EVERYTHING IS FINE!
                </h1>

                <p className="mb-8 px-4 font-terminal text-lg font-bold text-hell-dark/70 md:text-2xl">
                  Welcome to the Safe Space! No red candles here! Only vibes! 🚀✨🌈
                </p>

                <div className="hk-ember-edge mb-4 h-4 w-full overflow-hidden rounded-full bg-white/70 shadow-[0_18px_55px_rgba(0,0,0,0.14)]">
                  <div
                    className="h-full bg-[linear-gradient(90deg,rgba(255,174,0,0.95),rgba(255,60,0,0.58))] transition-all ease-linear"
                    style={{
                      width: `${progress}%`,
                      transitionDuration: progress === 0 ? "0ms" : "5000ms",
                    }}
                  ></div>
                </div>
                <p className="font-terminal text-sm font-bold tracking-[0.28em] text-hell-dark/55">
                  Ignoring reality in 5...
                </p>
              </motion.div>
            )}

            {/* --- PHASE 2: BURNING CONTENT --- */}
            {phase === "burning" && (
              <motion.div
                key="burning-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.04 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.4 }}
                className="relative z-30 flex w-full flex-col items-center px-2"
              >
                <h1 className="mb-8 bg-[linear-gradient(90deg,rgba(255,174,0,0.95),rgba(255,60,0,1),rgba(204,0,0,0.95))] bg-clip-text font-gothic text-4xl font-black leading-none tracking-[0.06em] text-transparent drop-shadow-[0_10px_35px_rgba(0,0,0,0.7)] md:text-9xl">
                  REALITY CHECK
                </h1>

                <p className="hk-scanlines hk-ember-edge max-w-full -rotate-2 break-words rounded-xl bg-hell-black/75 px-4 py-3 text-center font-terminal text-lg font-bold uppercase text-hell-gold shadow-ember md:max-w-[90vw] md:px-6 md:text-4xl">
                  WENDY&apos;S IS STILL HIRING
                </p>
              </motion.div>
            )}

            {/* --- FIRE ANIMATION LAYER --- */}
            {phase === "burning" && (
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(1200px_720px_at_50%_0%,rgba(255,60,0,0.45),transparent_62%),linear-gradient(180deg,rgba(204,0,0,0.25),rgba(5,5,5,0.0))] opacity-95"></div>

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
            className="hk-ember-edge hk-noise fixed bottom-10 right-4 z-[101] animate-bounce rounded-2xl bg-[linear-gradient(180deg,rgba(10,10,10,0.92),rgba(5,5,5,0.88))] p-5 font-terminal text-base text-hell-white shadow-ember backdrop-blur-md motion-reduce:animate-none md:right-10 md:p-6 md:text-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hell-black/35 shadow-[inset_0_0_0_1px_rgba(255,60,0,0.18)]">
                <AlertTriangle size={32} className="text-hell-gold" />
              </div>
              <div className="text-left">
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
