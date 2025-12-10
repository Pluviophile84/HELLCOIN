"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null); 
  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);
  const [isCalculated, setIsCalculated] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !ghostRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth; 
    const moreButtonWidth = 60; 
    let currentWidth = 0;
    let visible = 0;

    const ghostChildren = Array.from(ghostRef.current.children) as HTMLElement[];

    for (let i = 0; i < ghostChildren.length; i++) {
      const linkWidth = ghostChildren[i].offsetWidth + 24; 
      if (currentWidth + linkWidth + (i < ghostChildren.length - 1 ? moreButtonWidth : 0) >= containerWidth) {
        break;
      }
      currentWidth += linkWidth;
      visible++;
    }
    
    setVisibleCount(visible);
    setIsCalculated(true);
  }, []);

  useEffect(() => {
    checkOverflow();
    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        checkOverflow();
      });
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', checkOverflow);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [checkOverflow]);

  const visibleLinks = NAV_LINKS_DATA.slice(0, visibleCount);
  const hiddenLinks = NAV_LINKS_DATA.slice(visibleCount);
  const showMoreButton = hiddenLinks.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuOpen && moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreMenuOpen]);

  const linkStyles = "font-terminal text-sm xl:text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap";
  const linkUnderline = "absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full";

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-hell-black/95 backdrop-blur-md border-b border-hell-red/30 py-2 md:py-2 shadow-lg shadow-hell-red/5" 
          : "bg-transparent border-b border-transparent py-4 md:py-6"
      )}
    >
      <div className="w-full lg:w-[70%] max-w-[1920px] mx-auto px-4 md:px-0 flex justify-between items-center transition-all duration-300">
        
        {/* LOGO */}
        <div 
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95 mr-4"
        >
          <img 
            src="/GOAPE.png" 
            alt="Hellcoin" 
            className={cn(
              "rounded-full border border-hell-orange object-cover transition-all duration-300",
              isScrolled ? "w-8 h-8 md:w-8 md:h-8" : "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            )}
          />
          <span className="font-gothic text-xl md:text-2xl lg:text-3xl text-hell-orange tracking-wide text-glow">HELLCOIN</span>
        </div>

        {/* --- DESKTOP NAV --- */}
        <div ref={containerRef} className="relative hidden lg:flex items-center gap-6 justify-end flex-grow min-w-0 mr-4">
          <div ref={ghostRef} className="absolute top-0 left-0 flex gap-4 xl:gap-6 invisible pointer-events-none" aria-hidden="true">
             {NAV_LINKS_DATA.map((link) => (
               <span key={link.name} className={linkStyles}>{link.name}</span>
             ))}
          </div>

          <div 
            className={cn(
              "flex gap-4 xl:gap-6 transition-opacity duration-200",
              isCalculated ? "opacity-100" : "opacity-0"
            )}
          >
            {visibleLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={linkStyles}
              >
                {link.name}
                <span className={linkUnderline}></span>
              </a>
            ))}
          </div>
          
          <div 
            ref={moreRef}
            className={cn(
              "relative h-full flex items-center shrink-0 transition-opacity duration-200",
               isCalculated && showMoreButton ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onMouseEnter={() => setMoreMenuOpen(true)}
            onMouseLeave={() => setMoreMenuOpen(false)}
          >
              <button 
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={cn(
                  "flex items-center gap-1 font-terminal text-sm xl:text-base transition-colors uppercase cursor-pointer border px-2 py-1 shrink-0",
                  moreMenuOpen ? "text-hell-red border-hell-red" : "text-[#ffae00] border-hell-red/50 hover:text-hell-red"
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
                    className="absolute top-full left-0 pt-4 z-50 min-w-[200px]" 
                  >
                    <div className="bg-hell-black border border-hell-red/50 shadow-xl p-5 flex flex-col gap-4">
                      {hiddenLinks.map((link) => (
                        <a 
                          key={link.name} 
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={linkStyles}
                        >
                          {link.name}
                          <span className={linkUnderline}></span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>
        
        {/* --- ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button 
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-2 md:px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-[10px] md:text-sm font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            <span className="hidden md:inline">HEAVEN MODE</span>
            <span className="md:hidden">HEAVEN</span>
          </button>
          
          <a 
            href={BUY_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-base lg:text-lg px-4 lg:px-6 py-1 lg:py-2 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50 text-center whitespace-nowrap"
          >
            ACQUIRE $666
          </a>

          <button className="lg:hidden text-hell-white z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - FIXED Z-INDEX & CLICK OUTSIDE */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // CLICK OUTSIDE LOGIC: Tapping this wrapper closes the menu
            onClick={() => setMobileMenuOpen(false)}
            // FIX: Z-INDEX 35 (Above page content, below Nav Text)
            className="lg:hidden fixed top-0 bottom-0 left-0 right-0 bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-hidden shadow-2xl z-[35] cursor-pointer"
          >
            <motion.div 
               initial={{ height: 0 }}
               animate={{ height: "100svh" }}
               exit={{ height: 0 }}
               // IMPORTANT: Removed e.stopPropagation() so clicks here ALSO bubble up and close menu
               // We only want to stop closing if clicking a specific non-link interactive element (none here)
               className="p-6 h-full flex flex-col justify-between items-center overflow-hidden pt-[100px] pb-[40px] cursor-default"
            >
              <div className="flex flex-col flex-grow justify-around items-center w-full gap-y-0">
                {NAV_LINKS_DATA.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-terminal text-xl md:text-2xl text-hell-white hover:text-hell-orange tracking-widest cursor-pointer font-bold shrink-0 py-1" 
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="w-full flex flex-col items-center shrink-0 pt-4 border-t border-gray-900">
                <a 
                  href={BUY_LINK}
                  target="_blank" 
                  rel="noopener noreferrer"
                  // Stop propagation here so clicking the button doesn't trigger the close logic twice (though harmless)
                  onClick={(e) => e.stopPropagation()}
                  className="bg-hell-red text-hell-white font-gothic text-2xl py-3 px-12 rounded shadow-[0_0_20px_rgba(204,0,0,0.6)]"
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
