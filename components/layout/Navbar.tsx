"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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

export const Navbar = ({ onTriggerPaperHands }: { onTriggerPaperHands: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // --- ADAPTIVE SIZING REFS ---
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);

  // --- SCROLL CHECK & LOCK ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Scroll Lock
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  // --- NAVIGATION HANDLERS ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  // --- DYNAMIC COLLAPSE LOGIC (Measures link widths) ---
  const checkOverflow = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const moreButtonWidth = 80; // Estimated width of the 'MORE' button
    let currentWidth = 0;
    let visible = 0;

    for (let i = 0; i < NAV_LINKS_DATA.length; i++) {
      const linkElement = linksRef.current[i];
      if (linkElement) {
        // Add link width + gap (6 units = 24px)
        const linkWidth = linkElement.offsetWidth + 24;
        
        // If adding the current link + the 'MORE' button exceeds container width, stop.
        if (currentWidth + linkWidth + moreButtonWidth >= containerWidth) {
          break; 
        }
        currentWidth += linkWidth;
        visible++;
      }
    }
    
    // Set minimum of 3 visible links to prevent flicker
    setVisibleCount(Math.max(visible, 3));
  }, []);

  // Use ResizeObserver to check when container size changes
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !containerRef.current) return;
    checkOverflow(); // Initial check

    const observer = new ResizeObserver(() => checkOverflow());
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [checkOverflow]);


  // --- CLASSIFY LINKS ---
  const visibleLinks = NAV_LINKS_DATA.slice(0, visibleCount);
  const hiddenLinks = NAV_LINKS_DATA.slice(visibleCount);
  const showMoreButton = hiddenLinks.length > 0;
  
  // --- CLICK OUTSIDE LOGIC ---
  const moreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuOpen && moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreMenuOpen]);


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

        {/* --- NAVIGATION LINKS (Desktop/Adaptive) --- */}
        <div ref={containerRef} className="relative hidden lg:flex items-center gap-6 justify-end flex-grow min-w-0" style={{ maxWidth: '60%' }}>

          {/* 1. VISIBLE LINKS */}
          <div className="flex gap-6">
            {visibleLinks.map((link, index) => (
              <a 
                key={link.name} 
                ref={el => linksRef.current[index] = el}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-terminal text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          {/* 2. MORE BUTTON (Visible if links are hidden) */}
          {showMoreButton && (
            <div 
              ref={moreRef}
              className="relative h-full flex items-center shrink-0"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <button 
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={cn(
                  "flex items-center gap-1 font-terminal text-base transition-colors uppercase cursor-pointer border px-2 py-1 shrink-0",
                  moreMenuOpen 
                    ? "text-hell-red border-hell-red" 
                    : "text-[#ffae00] border-hell-red/50 hover:text-hell-red"
                )}
              >
                MORE ({hiddenLinks.length})
                {moreMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 pt-4 w-56 z-50" 
                  >
                    <div className="bg-hell-black border border-hell-red/50 shadow-xl p-5 flex flex-col gap-4">
                      {hiddenLinks.map((link) => (
                        <a 
                          key={link.name} 
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="font-terminal text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold w-fit"
                        >
                          {link.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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

      {/* --- MOBILE/VERTICAL MENU (FULL VIEWPORT TAKEOVER) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            // Fixed position, uses 'w-screen' to be certain to cover the entire width
            className="lg:hidden fixed top-[60px] left-0 w-screen h-[calc(100vh-60px)] bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-hidden shadow-2xl"
          >
            <div className="p-6 h-full flex flex-col justify-between items-center overflow-hidden">
              
              {/* 1. LINKS - Adaptive Spacing (Fills all vertical space) */}
              <div className="flex flex-col flex-grow justify-around items-center w-full gap-y-0">
                {NAV_LINKS_DATA.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-terminal text-lg text-hell-white hover:text-hell-orange tracking-widest cursor-pointer font-bold shrink-0 py-0.5" 
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              {/* 2. ACQUIRE BUTTON (Fixed at the bottom) */}
              <div className="w-full flex flex-col items-center shrink-0 pt-4 border-t border-gray-900">
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
        )}
      </AnimatePresence>
    </nav>
  );
};
