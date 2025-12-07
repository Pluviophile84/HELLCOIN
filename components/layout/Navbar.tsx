"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION ---
const BUY_LINK = "https://raydium.io/swap"; 

const NAV_LINKS_DATA = [
  { name: "GENESIS", href: "#genesis" },
  { name: "COMMANDMENTS", href: "#commandments" },
  { name: "NINE TYPES", href: "#nine-types" },
  { name: "MATH", href: "#math" },
  { name: "RITUAL", href: "#ritual" },
  { name: "HELLMAP", href: "#hellmap" },
  { name: "HALL OF PAIN", href: "#hall-of-pain" },
  { name: "REVELATION", href: "#revelation" },
  { name: "THE PIT", href: "#the-pit" },
];

export const Navbar = ({ onTriggerPaperHands, onToggleMenu, mobileMenuOpen }) => {
  // isScrolled is kept ONLY for backdrop color/blur transitions if needed, 
  // but is NOT used for fixed bar background/size changes now.
  const [isScrolled, setIsScrolled] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls the Horizontal Dropdown

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SCROLL LOCK: Hides body scroll when the main menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  // --- NAVIGATION HANDLERS ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on link click
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleToggleMenu = () => {
      setIsMenuOpen(prev => !prev);
  }

  // FIX: Added missing backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
        setIsMenuOpen(false);
    }
  };
  
  return (
    // FIX 1: Removed all background colors/borders from <nav> tag. It is now transparent and floating.
    <nav 
      className="fixed top-0 w-full z-40 transition-all duration-300 py-4"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* --- LEFT: LOGO (Square Shape) --- */}
        <div className="flex items-center gap-4">
            {/* LOGO */}
            <div 
              onClick={scrollToTop}
              className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95"
            >
              <img 
                src="/GOAPE.png" 
                alt="Hellcoin" 
                className="w-12 h-12 md:w-14 md:h-14 border border-hell-orange object-cover shadow-lg" 
                style={{ borderRadius: 0 }} // Force square corners
              />
            </div>
        </div>

        {/* --- RIGHT: MENU TOGGLE + ACTION CENTER (Combined for optimal spacing) --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* 1. MENU BUTTON (Launcher - Now using standard Menu icon) */}
          <button 
              className="text-hell-white hover:text-hell-red transition-colors p-2 border border-hell-red/50 uppercase font-terminal text-sm md:text-base font-bold flex items-center gap-1" 
              onClick={handleToggleMenu}
              style={{ borderRadius: 0 }} // Force rectangular
            >
                MENU <ChevronDown size={16} />
            </button>
          
          {/* 2. HEAVEN MODE BUTTON */}
          <button 
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-xs md:text-sm font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            <span className="hidden sm:inline">HEAVEN MODE</span>
          </button>
          
          {/* 3. ACQUIRE BUTTON (Rectangular Shape) */}
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
      
      {/* --- HORIZONTAL DROPDOWN MENU --- */}
      <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  // Fixed position bar right below the header
                  className="fixed top-[75px] w-full bg-hell-black/95 backdrop-blur-md shadow-xl border-b border-hell-red/50 z-30"
              >
                  <div className="max-w-7xl mx-auto px-4 py-3">
                      {/* Inner Container: Scrollable Horizontal List of Links */}
                      <div className="flex justify-between md:justify-center lg:justify-start gap-6 overflow-x-auto scrollbar-hide">
                          {NAV_LINKS_DATA.map((link) => (
                              <a 
                                  key={link.name} 
                                  href={link.href} 
                                  onClick={(e) => { handleNavClick(e, link.href); setIsMenuOpen(false); }}
                                  // Standard link style
                                  className="font-terminal text-base text-hell-white hover:text-hell-red transition-colors cursor-pointer font-bold relative group shrink-0 whitespace-nowrap" 
                              >
                                  {link.name}
                                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-red transition-all group-hover:w-full"></span>
                              </a>
                          ))}
                      </div>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
      
      {/* --- MOBILE/FULL SCREEN TAKEOVER (Backup for small phones) --- */}
      <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  // Backdrop overlay covers the screen when horizontal menu is open
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  // This is the essential part: close menu if click happens outside the button area
                  onClick={handleBackdropClick}
                  className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              >
                  {/* Since the horizontal bar is not ideal for mobile, we revert to the VERTICAL SLIDER on small screens */}
                  <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                      className="absolute top-0 left-0 h-full w-full md:w-96 bg-hell-black border-r border-hell-red/50 shadow-2xl p-6"
                      onClick={(e) => e.stopPropagation()} // Prevent accidental closure when interacting with the menu itself
                  >
                      {/* Close Button */}
                      <button 
                          onClick={handleToggleMenu}
                          className="absolute top-4 right-4 text-hell-white hover:text-hell-red"
                      >
                          <X size={28} />
                      </button>

                      {/* --- VERTICAL LINKS (Mobile Adaptive) --- */}
                      <div className="flex flex-col h-full justify-between pt-12 pb-6">
                          <div className="flex flex-col items-start gap-4 shrink-0 mb-8">
                             <h2 className="font-gothic text-4xl text-hell-orange tracking-wide text-glow">HELLCOIN</h2>
                             <div className="w-full border-b border-hell-red/50 pb-2 mb-2">
                                <h3 className="font-terminal text-[#ffae00] text-sm uppercase tracking-widest font-bold">NAVIGATION TREE</h3>
                             </div>
                          </div>
                          
                          <div className="flex flex-col items-start justify-evenly h-full gap-y-0">
                              {NAV_LINKS_DATA.map((link) => (
                                  <a 
                                      key={link.name} 
                                      href={link.href} 
                                      onClick={(e) => { handleNavClick(e, link.href); setIsMenuOpen(false); }}
                                      className="font-terminal text-xl text-hell-white hover:text-hell-red transition-colors cursor-pointer font-bold relative group shrink-0" 
                                  >
                                      {link.name}
                                  </a>
                              ))}
                          </div>

                          {/* ACQUIRE BUTTON (Mobile) */}
                          <a 
                              href={BUY_LINK}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-hell-red text-hell-white font-gothic text-xl py-3 px-6 rounded shadow-[0_0_20px_rgba(204,0,0,0.6)] text-center mt-8 shrink-0"
                          >
                              ACQUIRE $666
                          </a>
                      </div>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
};
