"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Navbar = ({ onTriggerPaperHands }: { onTriggerPaperHands: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "GENESIS", href: "#genesis" },
    { name: "COMMANDMENTS", href: "#commandments" },
    { name: "MATH", href: "#math" },
    { name: "RITUAL", href: "#ritual" },
    { name: "HELLMAP", href: "#hellmap" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent",
      isScrolled ? "bg-hell-black/90 backdrop-blur-md border-hell-red/30 py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* --- LEFT: LOGO --- */}
        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer hover:animate-glitch shrink-0">
          <img 
            src="/Logo.png" 
            alt="Hellcoin" 
            className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-hell-orange object-cover" 
          />
          <span className="font-gothic text-xl md:text-3xl text-hell-orange tracking-wide text-glow">HELLCOIN</span>
        </div>

        {/* --- CENTER: LINKS (Desktop Only) --- */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-terminal text-xl text-hell-white hover:text-hell-gold transition-colors uppercase tracking-widest relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* --- RIGHT: ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* HEAVEN MODE BUTTON (Original Style, New White/Pink Color) */}
          <button 
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-sm md:text-base hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            HEAVEN MODE
          </button>
          
          {/* ACQUIRE BUTTON (Hidden on Mobile) */}
          <button className="hidden md:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-xl px-6 py-2 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50">
            ACQUIRE $666
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button className="lg:hidden text-hell-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-hell-black border-b border-hell-red/50 p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-terminal text-2xl text-hell-white hover:text-hell-orange" onClick={() => setMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
           <button className="w-full bg-hell-red text-hell-white font-gothic text-xl py-3 rounded mt-2">
            ACQUIRE $666
          </button>
        </div>
      )}
    </nav>
  );
};
