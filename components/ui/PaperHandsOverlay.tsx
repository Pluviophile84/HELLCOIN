"use client";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { AlertTriangle, Flame } from "lucide-react";
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
  const flames = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5, // Start quickly
    duration: 0.5 + Math.random() * 1.5, // Faster movement
    size: 40 + Math.random() * 60, // Bigger flames
  }));

  // Handle the main sequence (Heaven -> Burning -> Reality)
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (isActive) {
      setPhase("heaven");
      // 1. Reset progress instantly
      setProgress(0);
      
      // 2. Start animation after tiny delay to ensure browser sees the 0
      setTimeout(() => setProgress(100), 50);

      // STEP 1: TRANSITION TO BURNING (After 5s - Increased duration)
      timer1 = setTimeout(() => {
        setPhase("burning");
      }, 5000);

      // STEP 2: CLOSE OVERLAY & SHOW REALITY CHECK (After another 4s)
      timer2 = setTimeout(() => {
        onClose(); 
        setPhase("reality"); 
      }, 9000); // 5s + 4s
    } else {
      // Reset when inactive, but preserve 'reality' phase so the separate effect handles it
      if (phase !== "reality") {
        setPhase("idle");
        setProgress(0);
      }
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isActive, onClose]);

  // Separate effect to handle the "Nice Try" toast lifespan
  // This prevents the cleanup of the main effect from killing the toast timer
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
              "fixed inset-0 z-[100] flex flex-col items-center justify-center text-center p-4 transition-colors duration-200",
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
                className="flex flex-col items-center relative z-20"
              >
                <div className="animate-bounce mb-6 text-7xl md:text-8xl">🦄</div>
                {/* Using standard font-sans (Arial/Helvetica) for generic look */}
                <h1 className="font-sans font-black text-4xl md:text-5xl mb-4">EVERYTHING IS FINE!</h1>
                <p className="font-sans font-bold text-xl md:text-2xl text-pink-400 mb-8 max-w-lg">
                  Welcome to the Safe Space! No red candles here! To the Moon! 🚀✨🌈
                </p>
                
                <div className="w-full max-w-md bg-white h-4 rounded-full overflow-hidden mb-4 border border-pink-300 shadow-sm">
                  <div 
                    className="h-full bg-pink-500 transition-all ease-linear"
                    style={{ 
                      width: `${progress}%`, 
                      transitionDuration: progress === 0 ? '0ms' : '5000ms' // Updated to 5s
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
                className="relative z-30 flex flex-col items-center w-full px-4"
              >
                {/* Generic Impact Font / Sans Serif Bold */}
                <h1 className="font-sans font-black text-5xl md:text-9xl text-white mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-tighter">
                  REALITY CHECK
                </h1>
                
                {/* Responsive Card Fix: max-w-[90vw] and adjusted text sizing */}
                <p className="font-mono font-bold text-xl md:text-4xl text-yellow-300 bg-black px-4 py-2 md:px-6 uppercase border-4 border-yellow-300 -rotate-2 max-w-[90vw] text-center break-words shadow-xl">
                  WENDY'S IS STILL HIRING
                </p>
              </motion.div>
            )}

            {/* --- FIRE ANIMATION LAYER --- */}
            {phase === "burning" && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {/* Red Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-600 to-orange-500 opacity-90"></div>
                
                {/* Intense Rising Flame Emojis */}
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
                      willChange: "transform" // FIX: Performance optimization for mobile
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
            // Added animate-bounce back for the jumping effect
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
