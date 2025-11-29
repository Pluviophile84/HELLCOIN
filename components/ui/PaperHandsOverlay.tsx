"use client";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { AlertTriangle } from "lucide-react";

interface PaperHandsProps {
  isActive: boolean;
  onClose: () => void;
}

export const PaperHandsOverlay = ({ isActive, onClose }: PaperHandsProps) => {
  const [showReality, setShowReality] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      // Reset progress when activated
      setProgress(0);
      
      // Small delay to let the DOM render before starting animation
      setTimeout(() => setProgress(100), 50);

      // 3.5s "Safe Mode" then crash back to reality
      const timer = setTimeout(() => {
        onClose();
        setShowReality(true);
        // Hide reality check snackbar after 4s
        setTimeout(() => setShowReality(false), 4000);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isActive, onClose]);

  return (
    <>
      {/* Pink Overlay - Simple Fade, No Slide */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-pink-100 flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300",
          isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="animate-bounce mb-8 text-9xl">🦄</div>
        <h1 className="font-sans font-bold text-6xl text-pink-500 mb-4">EVERYTHING IS FINE!</h1>
        <p className="font-sans text-2xl text-pink-400 mb-8 max-w-xl">
          Welcome to the Safe Space! No red candles here! Only vibes! 🚀✨🌈
        </p>
        
        {/* Fixed Progress Bar */}
        <div className="w-full max-w-md bg-white h-4 rounded-full overflow-hidden mb-4 border border-pink-300">
          <div 
            className="h-full bg-pink-500 transition-all ease-linear"
            style={{ 
              width: `${progress}%`, 
              transitionDuration: '3500ms' // Matches the timeout exactly
            }}
          ></div>
        </div>
        
        <p className="text-pink-300 text-sm font-mono">Resuming reality check in 3...</p>
      </div>

      {/* Reality Check Snackbar */}
      {showReality && (
        <div className="fixed bottom-10 right-4 md:right-10 bg-hell-red text-hell-white font-terminal text-xl p-6 border-4 border-black shadow-[10px_10px_0px_#000] z-[101] animate-bounce">
          <div className="flex items-center gap-4">
            <AlertTriangle size={32} className="text-yellow-400" />
            <div>
              <strong className="block text-2xl font-gothic">NICE TRY.</strong>
              You can't escape reality.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
