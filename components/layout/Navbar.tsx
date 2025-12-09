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
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simple scroll lock for mobile menu
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

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 py-4",
        isScrolled 
          ? "bg-hell-black/90 backdrop-blur-md border-b border-hell-red/30" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="w-full max-w-[90%] 2xl:max-w-[1800px] mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div 
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95"
        >
          <img 
            src="/GOAPE.png" 
            alt="Hellcoin" 
            className="w-8 h-8 md:w-10 md:h-10 2xl:w-14 2xl:h-14 rounded-full border border-hell-orange object-cover" 
          />
          <span className="font-gothic text-xl md:text-2xl 2xl:text-4xl text-hell-orange tracking-wide text-glow">HELLCOIN</span>
        </div>

        {/* DESKTOP LINKS (Hidden < xl, Visible >= xl) */}
        <div className="hidden xl:flex gap-6 2xl:gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-terminal text-base 2xl:text-xl text-hell-white hover:text-hell-gold transition-colors uppercase tracking-widest relative group cursor-pointer font-bold"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-3 py-1 2xl:px-5 2xl:py-2 border border-pink-300 rounded text-pink-100 font-terminal text-xs md:text-sm 2xl:text-lg font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            HEAVEN MODE
          </button>
          
          <a 
            href={BUY_LINK}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-lg 2xl:text-2xl px-6 py-2 2xl:px-8 2xl:py-3 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50 text-center"
          >
            ACQUIRE $666
          </a>

          {/* MOBILE TOGGLE */}
          <button className="xl:hidden text-hell-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden fixed top-[60px] left-0 w-full bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-6 items-center justify-center h-full pb-32 overflow-y-auto">
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
              
              <div className="w-16 h-1 bg-hell-red/50 my-4"></div>
              
              <a 
                href={BUY_LINK}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-hell-red text-hell-white font-gothic text-xl py-3 px-12 rounded shadow-[0_0_20px_rgba(204,0,0,0.6)]"
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
