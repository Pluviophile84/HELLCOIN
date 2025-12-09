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
  
  // --- ADAPTIVE MENU STATES ---
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);
  const [isReady, setIsReady] = useState(false); 
  
  // Refs for measuring width
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const updateVisibleLinks = useCallback(() => {
    if (!navRef.current) return;

    const containerWidth = navRef.current.offsetWidth;
    const moreButtonWidth = 100;
    const safetyBuffer = 40; 
    let usedWidth = 0;
    let newVisibleCount = 0;

    for (let i = 0; i < NAV_LINKS_DATA.length; i++) {
      const item = itemsRef.current[i];
      if (item) {
        const itemWidth = item.getBoundingClientRect().width + 24; 
        if (usedWidth + itemWidth + moreButtonWidth + safetyBuffer < containerWidth) {
          usedWidth += itemWidth;
          newVisibleCount++;
        } else {
          break;
        }
      }
    }
    
    setVisibleCount(Math.min(newVisibleCount, NAV_LINKS_DATA.length));
    setIsReady(true); 
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateVisibleLinks();
    }, 100);

    const observer = new ResizeObserver(() => {
      updateVisibleLinks();
    });
    
    if (navRef.current) {
      observer.observe(navRef.current);
    }

    window.addEventListener('resize', updateVisibleLinks);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener('resize', updateVisibleLinks);
    };
  }, [updateVisibleLinks]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

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

  const visibleLinks = NAV_LINKS_DATA.slice(0, visibleCount);
  const hiddenLinks = NAV_LINKS_DATA.slice(visibleCount);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-40 border-b transition-all duration-300",
        // Adjusted padding clamps to be less aggressive on large screens
        isScrolled 
          ? "bg-hell-black/90 backdrop-blur-md border-hell-red/30 py-3" 
          : "bg-transparent border-transparent py-[clamp(1rem,1.5vw,1.5rem)]"
      )}
    >
      <div className="w-full lg:w-[85%] 2xl:max-w-[1920px] mx-auto px-4 lg:px-0 flex justify-between items-center h-full">
        
        {/* --- LEFT: LOGO --- */}
        <div 
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95 z-50 relative"
        >
          <img 
            src="/GOAPE.png" 
            alt="Hellcoin" 
            // Tamed logo size
            className="w-[clamp(2.5rem,3vw,3.5rem)] h-[clamp(2.5rem,3vw,3.5rem)] rounded-full border border-hell-orange object-cover" 
          />
          {/* Tamed text size */}
          <span className="font-gothic text-hell-orange tracking-wide text-glow text-[clamp(1.25rem,1.5vw,1.75rem)]">HELLCOIN</span>
        </div>

        {/* --- CENTER: ADAPTIVE LINKS --- */}
        <div 
          ref={navRef} 
          className={cn(
            "hidden lg:flex items-center justify-center px-4 h-full relative flex-1 mx-4 min-w-0 transition-opacity duration-300",
            isReady ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex gap-6 invisible absolute pointer-events-none top-0 left-0 whitespace-nowrap w-0 h-0 overflow-hidden">
             {NAV_LINKS_DATA.map((link, i) => (
                <a 
                  key={`measure-${i}`} 
                  ref={(el) => { itemsRef.current[i] = el; }} 
                  href={link.href}
                  className="font-terminal font-bold uppercase text-base"
                >
                  {link.name}
                </a>
             ))}
          </div>

          <div className="flex gap-6 2xl:gap-8 items-center justify-center w-full">
            {visibleLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                // Tamed link font size: 0.95rem -> 1.05rem max
                className="font-terminal text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap text-[clamp(0.95rem,0.9vw,1.05rem)]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
              </a>
            ))}

            {hiddenLinks.length > 0 && (
               <div 
                 className="relative h-full flex items-center"
                 onMouseEnter={() => setMoreMenuOpen(true)}
                 onMouseLeave={() => setMoreMenuOpen(false)}
               >
                 <button 
                   className={cn(
                     "flex items-center gap-1 font-terminal transition-colors uppercase cursor-pointer border px-2 py-1 text-[clamp(0.95rem,0.9vw,1.05rem)]",
                     moreMenuOpen 
                       ? "text-hell-red border-hell-red" 
                       : "text-[#ffae00] border-hell-red/50 hover:text-hell-red"
                   )}
                 >
                   MORE
                   {moreMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                 </button>

                 <AnimatePresence>
                   {moreMenuOpen && (
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 10 }}
                       className="absolute top-full right-0 pt-2 w-56 z-50" 
                     >
                       <div className="bg-hell-black border border-hell-red/50 shadow-xl p-5 flex flex-col gap-2">
                         {hiddenLinks.map((link) => (
                           <a 
                             key={link.name} 
                             href={link.href}
                             onClick={(e) => handleNavClick(e, link.href)}
                             className="font-terminal text-sm text-gray-400 hover:text-hell-red transition-colors uppercase py-1.5 block"
                           >
                             {link.name}
                           </a>
                         ))}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            )}
          </div>
        </div>

        {/* --- RIGHT: ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 z-50 relative">
          <button 
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 border border-pink-300 rounded text-pink-100 font-terminal font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]
                       text-[clamp(0.75rem,0.8vw,0.875rem)] px-[clamp(0.6rem,0.8vw,0.9rem)] py-[clamp(0.25rem,0.4vw,0.5rem)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            HEAVEN MODE
          </button>
          
          <a 
            href={BUY_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50 text-center
                       text-[clamp(1rem,1.1vw,1.25rem)] px-[clamp(1rem,1.5vw,1.5rem)] py-[clamp(0.4rem,0.5vw,0.6rem)]"
          >
            ACQUIRE $666
          </a>

          {/* MOBILE TOGGLE */}
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
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-hidden shadow-2xl z-40 pt-[80px]"
          >
            <div className="p-6 h-full flex flex-col justify-between items-center overflow-hidden">
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
              <div className="w-full flex flex-col items-center shrink-0 pt-4 border-t border-gray-900 mb-8">
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
