"use client";
import { Zap } from "lucide-react";
import { cn } from "../../lib/utils";

export const HeavenBubble = ({ onTriggerPaperHands }: { onTriggerPaperHands: () => void }) => {
  return (
    // FIXED POSITION: Bottom Left, Z-50 to float above content
    <div className="fixed bottom-6 left-4 md:left-6 z-50">
      <button 
        onClick={onTriggerPaperHands}
        // STYLE: Pink gradient/solid, rounded, pulsing effect
        className={cn(
          "flex items-center gap-2 md:gap-3 px-4 py-2 rounded-full font-terminal text-sm md:text-base font-bold transition-all duration-300 shadow-xl",
          "bg-pink-500 text-pink-100 border border-pink-300 hover:scale-105 hover:bg-pink-400 active:scale-95",
          "animate-pulse" // Subtle pulse effect
        )}
      >
        <Zap size={18} className="text-white fill-white" />
        <span className="hidden sm:inline">HEAVEN MODE</span>
        <span className="sm:hidden">SAFE</span>
      </button>
    </div>
  );
};
