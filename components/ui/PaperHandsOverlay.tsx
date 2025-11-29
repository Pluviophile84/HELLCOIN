"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface PaperHandsProps {
  isActive: boolean;
  onClose: () => void;
}

export const PaperHandsOverlay = ({ isActive, onClose }: PaperHandsProps) => {
  const [showReality, setShowReality] = useState(false);

  useEffect(() => {
    if (isActive) {
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
      {/* Pink Overlay */}
      <div className={cn(
        "fixed inset-0 z-[100] bg-pink-100 flex flex-col items-center justify-center text-center p-4 transition-all duration-500 transform",
        isActive ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="animate-bounce mb-8 text-9xl">🦄</div>
        <h1 className="font-sans font-bold text-6xl text-pink-500 mb-4">EVERYTHING IS FINE!</h1>
        <p className="font-sans text-2xl text-pink-400 mb-8 max-w-xl">
          Welcome to the Safe Space! No red candles here! Only vibes! 🚀✨🌈
        </p>
        <div className="w-full max-w-md bg-white h-4 rounded-full overflow-hidden mb-4 border border-pink-300">
          <div className="h-full bg-pink-500 w-0 animate-[load_3.5s_linear_forwards]" style={{ animationName: 'load' }}></div>
        </div>
        <p className="text-pink-300 text-sm font-mono">Resuming reality check in 3...</p>
        <style jsx>{`
          @keyframes load {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>

      {/* Reality Check Snackbar */}
      {showReality && (
        <div className="fixed bottom-10 right-4 md:right-10 bg-hell-red text-hell-white font-terminal text-xl p-6 border-4 border-black shadow-[10px_10px_0px_#000] z-[101] animate-bounce">
          <div className="flex items-center gap-4">
            <TriangleAlert size={32} className="text-yellow-400" />
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
