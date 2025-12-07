"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ onTriggerPaperHands }: { onTriggerPaperHands: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const BUY_LINK = "https://raydium.io/swap"; 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- FINAL SCROLL LOCK LOGIC (Prevents Scroll on Mobile Menu Open) ---
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "GENESIS", short: "GEN", href: "#genesis" },
    { name: "TRUTH", short: "TRU", href: "#revelation" },
    { name: "COMMANDMENTS", short: "CMD", href: "#commandments" },
    { name: "MATH", short: "MTH", href: "#math" },
    { name: "RITUAL", short: "RIT", href: "#ritual" },
    { name: "HELLMAP", short: "MAP", href: "#hellmap" },
    { name: "THE PIT", short: "PIT", href: "#the-pit" },
    // Missing links added back from previous context
    { name: "NINE TYPES", short: "9TP", href: "#nine-types" },
    { name: "HALL OF PAIN", short: "HOP", href: "#hall-of-pain" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-40 border-b transition-all duration-300 py-4",
        isScrolled 
          ? "bg-hell-black/90 backdrop-blur-md border-hell-red/30" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO */}
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

        {/* --- NAVIGATION LINKS (Desktop) --- */}

        {/* 1. DESKTOP WIDE (Full Names) */}
        <div className="hidden xl:flex gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-terminal text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        {/* 2. LAPTOP MEDIUM (Abbreviated Names) */}
        <div className="hidden lg:flex xl:hidden gap-5">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              title={link.name}
              className="font-terminal text-sm text-hell-white hover:text-hell-gold transition-colors uppercase tracking-widest relative group cursor-pointer font-bold border border-transparent px-1 hover:border-hell-red/50"
            >
              {link.short}
            </a>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* HEAVEN MODE BUTTON */}
          <button 
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-xs md:text-sm font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            HEAVEN MODE
          </button>
          
          {/* ACQUIRE BUTTON (DESKTOP/LAPTOP) */}
          <a 
            href={BUY_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-lg px-6 py-2 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50 text-center"
          >
            ACQUIRE $666
          </a>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden text-hell-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE/VERTICAL MENU (UNBREAKABLE FULL VIEWPORT TAKEOVER) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={(e) => {
              // Only close if click target is the backdrop itself
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
            // Uses fixed top/bottom/left/right 0 for 100% stable viewport coverage
            className="lg:hidden fixed top-0 bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 overflow-hidden"
          >
            {/* Sliding Panel: Absolute positioning for 100% stable height/width */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 250, damping: 30 }}
              className="absolute top-0 left-0 h-full w-full md:w-96 bg-hell-black border-r border-hell-red/50 shadow-2xl p-6"
            >
              
              {/* Close Button */}
              <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-hell-white hover:text-hell-red"
              >
                  <X size={28} />
              </button>
              
              {/* --- INNER MENU CONTENT --- */}
              {/* This Flex container manages the links and pushes the button to the bottom */}
              <div className="h-full flex flex-col justify-between items-center pt-12 pb-6">
                
                {/* 1. LINKS - Adaptive Spacing (Guaranteed to fit 9 links) */}
                <div className="flex flex-col flex-grow justify-around items-center w-full gap-y-0">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={(e) => handleNavClick(e, link.href)}
                      // Crucial: Use smaller font size and padding to fit 9 links reliably
                      className="font-terminal text-lg text-hell-white hover:text-hell-orange tracking-widest cursor-pointer font-bold shrink-0 py-0.5" 
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                
                {/* 2. ACQUIRE BUTTON (Fixed at the bottom) */}
                <div className="w-full flex flex-col items-center shrink-0 pt-4 border-t border-gray-900 mt-6">
                  <div className="w-16 h-1 bg-hell-red/50 mb-4 shrink-0"></div>
                  <a 
                    href={BUY_LINK}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-hell-red text-hell-white font-gothic text-xl py-3 px-12 rounded shadow-[0_0_20px_rgba(204,0,0,0.6)]"
                  >
                    ACQUIRE $666
                  </a>
                </div>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
