"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ onTriggerPaperHands }: { onTriggerPaperHands: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false); 

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

  // --- FIX: SCROLL LOCK LOGIC (Prevents Red Flash) ---
  useEffect(() => {
    if (mobileMenuOpen) {
      // 1. Hide scrollbar
      document.body.style.overflow = "hidden";
      
      // 2. Add padding to compensate for the scrollbar's width (avoids shifting content)
      // This is a common solution for systems where scrollbar width is fixed (usually 8px or 15px)
      document.body.style.paddingRight = "8px"; 
    } else {
      // Restore normal state
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0"; 
    }
    return () => { 
      document.body.style.style.overflow = "unset"; 
      document.body.style.paddingRight = "0"; 
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
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

  const navLinks = [
    { name: "GENESIS", href: "#genesis", primary: true },
    { name: "COMMANDMENTS", href: "#commandments", primary: true },
    { name: "NINE TYPES", href: "#nine-types", primary: true },
    { name: "MATH", href: "#math", primary: true },
    { name: "RITUAL", href: "#ritual", primary: true }, 
    { name: "HELLMAP", href: "#hellmap", primary: false }, 
    { name: "HALL OF PAIN", href: "#hall-of-pain", primary: false },
    { name: "REVELATION", href: "#revelation", primary: false },
    { name: "THE PIT", href: "#the-pit", primary: false },
  ];

  const primaryLinks = navLinks.filter(link => link.primary); 
  const secondaryLinks = navLinks.filter(link => !link.primary); 

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

        {/* --- NAVIGATION LINKS --- */}
        <div className="relative hidden lg:flex items-center gap-6">

          {/* 1. PRIMARY VISIBLE LINKS */}
          <div className="flex gap-6">
            {primaryLinks.map((link) => (
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
          
          {/* 2. MORE DROPDOWN (Hover Activated) */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setMoreMenuOpen(true)}
            onMouseLeave={() => setMoreMenuOpen(false)}
          >
            <button 
              className={cn(
                "flex items-center gap-1 font-terminal text-base transition-colors uppercase cursor-pointer border px-2 py-1",
                moreMenuOpen 
                  ? "text-hell-red border-hell-red" 
                  : "text-[#ffae00] border-hell-red/50 hover:text-hell-red"
              )}
            >
              MORE
              {moreMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* DROPDOWN MENU */}
            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 pt-4 w-56 z-50" 
                >
                  <div className="bg-hell-black border border-hell-red/50 shadow-xl p-5 flex flex-col gap-4">
                    {secondaryLinks.map((link) => (
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

      {/* --- MOBILE/VERTICAL MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed top-[60px] left-0 w-full bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-6 items-center justify-center h-full pb-32 overflow-y-auto">
              {/* Full list of 9 links for mobile menu */}
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-terminal text-xl text-hell-white hover:text-hell-orange tracking-widest cursor-pointer font-bold" 
                >
                  {link.name}
                </a>
              ))}
              
              <div className="w-16 h-1 bg-hell-red/50 my-4 shrink-0"></div>
              
              {/* ACQUIRE LINK (Mobile) */}
              <a 
                href={BUY_LINK}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-hell-red text-hell-white font-gothic text-xl py-3 px-12 rounded shadow-[0_0_20px_rgba(204,0,0,0.6)] shrink-0"
              >
                ACQUIRE $666
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
