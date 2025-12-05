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

  // Generate flame particles for the burning effect
  const flames = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random(),
    size: 20 + Math.random() * 40,
  }));

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;

    if (isActive) {
      setPhase("heaven");
      
      // Start Progress Bar
      setTimeout(() => setProgress(100), 100);

      // STEP 1: TRANSITION TO BURNING (After 3.5s)
      timer1 = setTimeout(() => {
        setPhase("burning");
      }, 3500);

      // STEP 2: CLOSE OVERLAY & SHOW REALITY CHECK (After another 3s)
      timer2 = setTimeout(() => {
        onClose(); // Close the main overlay logic
        setPhase("reality"); // Show the toast
      }, 6500); // 3.5s + 3s

      // STEP 3: RESET EVERYTHING (After toast duration)
      timer3 = setTimeout(() => {
        setPhase("idle");
        setProgress(0);
      }, 10500);
    } else if (phase === "idle") {
      setProgress(0);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isActive, onClose]);

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
              "fixed inset-0 z-[100] flex flex-col items-center justify-center text-center p-4 transition-colors duration-1000",
              // Background Color Transition: Pink -> Deep Red/Black
              phase === "burning" ? "bg-hell-red text-white" : "bg-pink-100 text-pink-500"
            )}
          >
            {/* --- PHASE 1: HEAVEN CONTENT --- */}
            {phase === "heaven" && (
              <motion.div
                key="heaven-content"
                exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                className="flex flex-col items-center"
              >
                {/* FIX: Reduced sizes (text-9xl -> text-7xl, text-6xl -> text-5xl) */}
                <div className="animate-bounce mb-6 text-7xl md:text-8xl">🦄</div>
                <h1 className="font-sans font-bold text-4xl md:text-5xl mb-4">EVERYTHING IS FINE!</h1>
                <p className="font-sans text-xl md:text-2xl text-pink-400 mb-8 max-w-lg">
                  Welcome to the Safe Space! No red candles here! Only vibes! 🚀✨🌈
                </p>
                
                <div className="w-full max-w-md bg-white h-4 rounded-full overflow-hidden mb-4 border border-pink-300 shadow-sm">
                  <div 
                    className="h-full bg-pink-500 transition-all ease-linear"
                    style={{ 
                      width: `${progress}%`, 
                      transitionDuration: '3500ms' 
                    }}
                  ></div>
                </div>
                <p className="text-pink-300 text-sm font-mono">Ignoring reality in 3...</p>
              </motion.div>
            )}

            {/* --- PHASE 2: BURNING CONTENT --- */}
            {phase === "burning" && (
              <motion.div
                key="burning-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-20 flex flex-col items-center"
              >
                <div className="mb-6">
                  <Flame size={80} className="text-yellow-400 animate-pulse" />
                </div>
                <h1 className="font-gothic text-6xl md:text-8xl text-black mb-2 animate-glitch">
                  REALITY CHECK
                </h1>
                <p className="font-terminal text-2xl md:text-3xl text-yellow-400 bg-black/50 px-4 py-1">
                  /// THE CHART IS STILL RED ///
                </p>
              </motion.div>
            )}

            {/* --- FIRE ANIMATION LAYER --- */}
            {phase === "burning" && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {/* Red Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-hell-red/50 to-transparent"></div>
                
                {/* Rising Flame Emojis */}
                {flames.map((flame) => (
                  <motion.div
                    key={flame.id}
                    initial={{ y: "110vh", x: "-50%", opacity: 0 }}
                    animate={{ y: "-20vh", opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: flame.duration, 
                      delay: flame.delay, 
                      repeat: Infinity,
                      ease: "easeIn"
                    }}
                    style={{ 
                      left: flame.left, 
                      fontSize: flame.size 
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
            className="fixed bottom-10 right-4 md:right-10 bg-hell-red text-hell-white font-terminal text-xl p-6 border-4 border-black shadow-[10px_10px_0px_#000] z-[101]"
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
