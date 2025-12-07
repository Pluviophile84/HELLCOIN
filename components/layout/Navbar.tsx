"use client";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { cn } from "../../lib/utils";

const BUY_LINK = "https://raydium.io/swap"; 

export const Navbar = ({ onTriggerPaperHands, onToggleMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false); // Kept for background blur transition

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <nav 
      className={cn(
        // Fixed positioning, transparent background, clean edges
        "fixed top-0 w-full z-40 transition-all duration-300 py-4",
        isScrolled 
          ? "bg-hell-black/90 backdrop-blur-md" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* --- LEFT: MENU TOGGLE + LOGO --- */}
        <div className="flex items-center gap-4">
            
            {/* 1. MENU BUTTON (Rectangular Shape) */}
            <button className="text-hell-white hover:text-hell-red transition-colors p-2 md:p-3 border border-transparent hover:border-hell-red" onClick={onToggleMenu}>
                <Menu size={24} />
            </button>

            {/* 2. LOGO (Square Shape) */}
            <div 
              onClick={scrollToTop}
              className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95"
            >
              {/* FIX: Perfect Square Logo */}
              <img 
                src="/Logo.png" 
                alt="Hellcoin" 
                className="w-12 h-12 md:w-14 md:h-14 border border-hell-orange object-cover shadow-lg" 
                style={{ borderRadius: 0 }} // Force square corners
              />
              <span className="font-gothic text-xl md:text-3xl text-hell-orange tracking-wide text-glow hidden sm:inline">HELLCOIN</span>
            </div>
        </div>

        {/* --- RIGHT: ACTION CENTER --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* 1. HEAVEN MODE BUTTON (Responsive text/icon) */}
          <button 
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-xs md:text-sm font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            <span className="hidden sm:inline">HEAVEN MODE</span>
          </button>
          
          {/* 2. ACQUIRE BUTTON (Rectangular Shape) */}
          <a 
            href={BUY_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-base md:text-lg px-4 py-2 rounded-sm shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50 text-center"
            style={{ borderRadius: 0 }} // Force rectangular corners
          >
            BUY $666
          </a>
        </div>
      </div>
    </nav>
  );
};
