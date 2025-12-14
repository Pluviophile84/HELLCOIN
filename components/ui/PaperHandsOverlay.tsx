"use client";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaperHandsProps {
  isActive: boolean;
  onClose: () => void;
}

type Phase = "idle" | "heaven" | "burning" | "reality";

export const PaperHandsOverlay = ({ isActive, onClose }: PaperHandsProps) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  // Generate MORE flame particles for intensity (50 flames)
  const flames = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 0.5, // Start quickly
        duration: 0.5 + Math.random() * 1.5, // Faster movement
        size: 40 + Math.random() * 60, // Bigger flames
      })),
    []
  );

  // --- SCROLL LOCK EFFECT ---
  // Prevents the background website from scrolling ONLY during the immersive phases
  useEffect(() => {
    // FIX: Only lock scroll if active OR if we are in 'heaven'/'burning'. 
    // Unlock immediately when we hit 'reality' (toast only) or 'idle'.
    if (isActive || (phase === "heaven" || phase === "burning")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
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
            className={cn(
              "fixed inset-0 z-[100] flex flex-col items-center justify-center text-center p-4 transition-colors duration-200 overflow-hidden",
              // Instant red flash when burning starts
              phase === "burning" ? "bg-red-600 text-white" : "bg-pink-100 text-pink-500"
            )}
          >
            {/* --- PHASE 1: HEAVEN CONTENT --- */}
            {phase === "heaven" && (
              <motion.div
                key="heaven-content"
                exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }} // Explodes out
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center relative z-20 w-full max-w-lg"
              >
                {/* FIX: Smaller Emoji size for mobile (5xl vs 8xl) */}
                <div className="animate-bounce mb-6 text-5xl md:text-8xl">🦄</div>
                
                {/* FIX: Smaller Title (2xl vs 5xl) */}
                <h1 className="font-sans font-black text-2xl md:text-5xl mb-4 leading-tight">
                  EVERYTHING IS FINE!
                </h1>
                
                {/* FIX: Smaller Body Text (lg vs 2xl) */}
                <p className="font-sans font-bold text-lg md:text-2xl text-pink-400 mb-8 px-4">
                  Welcome to the Safe Space! No red candles here! Only vibes! 🚀✨🌈
                </p>
                
                <div className="w-full bg-white h-4 rounded-full overflow-hidden mb-4 border border-pink-300 shadow-sm">
                  <div 
                    className="h-full bg-pink-500 transition-all ease-linear"
                    style={{ 
                      width: `${progress}%`, 
                      transitionDuration: progress === 0 ? '0ms' : '5000ms'
                    }}
                  ></div>
                </div>
                <p className="text-pink-300 text-sm font-bold font-sans">Ignoring reality in 5...</p>
              </motion.div>
            )}

            {/* --- PHASE 2: BURNING CONTENT --- */}
            {phase === "burning" && (
              <motion.div
                key="burning-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.1 }}
                className="relative z-30 flex flex-col items-center w-full px-2"
              >
                {/* FIX: Smaller Title on Mobile (4xl vs 9xl) */}
                <h1 className="font-sans font-black text-4xl md:text-9xl text-white mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-tighter leading-none">
                  REALITY CHECK
                </h1>
                
                {/* FIX: Responsive Card Sizing (text-lg vs text-4xl) */}
                <p className="font-mono font-bold text-lg md:text-4xl text-yellow-300 bg-black px-4 py-2 md:px-6 uppercase border-4 border-yellow-300 -rotate-2 max-w-full md:max-w-[90vw] text-center break-words shadow-xl">
                  WENDY&apos;S IS STILL HIRING
                </p>
              </motion.div>
            )}

            {/* --- FIRE ANIMATION LAYER --- */}
            {phase === "burning" && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
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
                      ease: "linear"
                    }}
                    style={{ 
                      left: flame.left, 
                      fontSize: flame.size,
                      filter: "blur(1px)",
                      willChange: "transform"
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
            className="fixed bottom-10 right-4 md:right-10 bg-hell-red text-hell-white font-terminal text-xl p-6 border-4 border-black shadow-[10px_10px_0px_#000] z-[101] animate-bounce"
          >
            <div className="flex items-center gap-4">
              <AlertTriangle size={32} className="text-yellow-400" />
              <div>
                <strong className="block text-2xl font-gothic">NICE TRY.</strong>
                You can't escape reality.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
