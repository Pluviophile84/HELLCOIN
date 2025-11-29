"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer hover:animate-glitch">
          <div className="w-10 h-10 rounded-full border border-hell-orange bg-hell-dark flex items-center justify-center overflow-hidden">
             {/* Replace with your image later */}
             <span className="text-2xl">🐐</span>
          </div>
          <span className="font-gothic text-2xl md:text-3xl text-hell-orange tracking-wide text-glow">HELLCOIN</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-terminal text-xl text-hell-white hover:text-hell-gold transition-colors uppercase tracking-widest relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onTriggerPaperHands}
            className="hidden xl:flex items-center gap-2 px-3 py-1 border border-pink-500/30 rounded text-pink-500 font-terminal text-sm hover:bg-pink-500/10 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            PAPER HANDS MODE
          </button>
          
          <button className="hidden md:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-xl px-6 py-2 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50">
            ACQUIRE $666
          </button>

          <button className="lg:hidden text-hell-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-hell-black border-b border-hell-red/50 p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-terminal text-2xl text-hell-white hover:text-hell-orange" onClick={() => setMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
           <button 
            onClick={() => { onTriggerPaperHands(); setMobileMenuOpen(false); }}
            className="text-pink-400 font-terminal border border-pink-500/30 p-2 w-full text-center mt-4"
          >
            ACTIVATE PAPER HANDS MODE
          </button>
        </div>
      )}
    </nav>
  );
};
