"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ onTriggerPaperHands }: { onTriggerPaperHands: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. SCROLL LISTENER
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. SCROLL LOCK (Freezes body when menu is open)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to ensure scroll returns if component unmounts
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "GENESIS", href: "#genesis" },
    { name: "TRUTH", href: "#revelation" },
    { name: "COMMANDMENTS", href: "#commandments" },
    { name: "MATH", href: "#math" },
    { name: "RITUAL", href: "#ritual" },
    { name: "HELLMAP", href: "#hellmap" },
    { name: "THE PIT", href: "#the-pit" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent",
      // Keeps thickness on mobile (py-4), shrinks on desktop scroll (md:py-2)
      isScrolled 
        ? "bg-hell-black/90 backdrop-blur-md border-hell-red/30 py-4 md:py-2" 
        : "bg-transparent py-4 md:py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* --- LOGO (Home Button) --- */}
        <div 
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95"
        >
          <img 
            src="/GOAPE.png" 
            alt="Hellcoin" 
            className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-hell-orange object-cover" 
          />
          <span className="font-gothic text-xl md:text-3xl text-hell-orange tracking-wide text-glow">HELLCOIN</span>
        </div>

        {/* --- DESKTOP LINKS --- */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-terminal text-xl text-hell-white hover:text-hell-gold transition-colors uppercase tracking-widest relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* HEAVEN MODE BUTTON */}
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

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            // 3. CLICK OUTSIDE: Clicking this main wrapper closes the menu
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed top-[60px] left-0 w-full bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-hidden shadow-2xl"
          >
            {/* We stop propagation on the inner container if you WANTED clicking empty space 
               between links to stay open, but for a UX "Click Outside" feel on mobile, 
               usually tapping anywhere that isn't a button should close it. 
               The wrapper onClick handles everything here nicely.
            */}
            <div className="p-6 flex flex-col gap-6 items-center justify-center h-full pb-32">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="font-terminal text-3xl text-hell-white hover:text-hell-orange tracking-widest"
                  // Link click also closes menu (redundant but safe)
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* 1. RED DIVIDER RESTORED */}
              <div className="w-16 h-1 bg-hell-red/50 my-4"></div>
              
              <button className="bg-hell-red text-hell-white font-gothic text-2xl py-3 px-12 rounded shadow-[0_0_20px_rgba(204,0,0,0.6)]">
                ACQUIRE $666
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
