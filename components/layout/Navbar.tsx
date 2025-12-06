"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const BUY_LINK = "https://raydium.io/swap";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock with proper cleanup
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
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

  const primaryLinks = navLinks.filter((link) => link.primary);
  const secondaryLinks = navLinks.filter((link) => !link.primary);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 border-b transition-all duration-300 py-4",
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-red-600/30"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* LOGO */}
        <div
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95"
        >
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-orange-500 bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-xs md:text-sm">
            666
          </div>
          <span className="font-bold text-xl md:text-3xl text-orange-500 tracking-wide">
            HELLCOIN
          </span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="relative hidden lg:flex items-center gap-6">
          <div className="flex gap-6">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base text-white hover:text-orange-400 transition-colors uppercase tracking-widest relative group cursor-pointer font-bold"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* MORE DROPDOWN */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setMoreMenuOpen(true)}
            onMouseLeave={() => setMoreMenuOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-base transition-colors uppercase cursor-pointer border px-2 py-1",
                moreMenuOpen
                  ? "text-red-500 border-red-500"
                  : "text-orange-400 border-red-500/50 hover:text-red-500"
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
                  className="absolute top-full left-0 pt-4 w-56 z-50"
                >
                  <div className="bg-black border border-red-500/50 shadow-xl p-5 flex flex-col gap-4">
                    {secondaryLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-base text-white hover:text-orange-400 transition-colors uppercase tracking-widest relative group cursor-pointer font-bold w-fit"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* HEAVEN MODE BUTTON */}
          <button
            onClick={() => alert("Heaven Mode Activated!")}
            className="flex items-center gap-2 px-3 py-1 border border-pink-300 rounded text-pink-100 text-xs md:text-sm font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            HEAVEN MODE
          </button>

          {/* ACQUIRE BUTTON (DESKTOP) */}
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-red-600 hover:bg-orange-500 text-white font-bold text-lg px-6 py-2 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-orange-500/50 text-center"
          >
            ACQUIRE $666
          </a>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - FULL SCREEN WITH DYNAMIC SCALING */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-[72px] bg-black/98 backdrop-blur-xl z-50"
            style={{ height: "calc(100vh - 72px)" }}
          >
            {/* Container with dynamic spacing - NO SCROLLING */}
            <div className="h-full flex flex-col justify-between items-center p-4 overflow-hidden">
              {/* Links Container - Dynamically scaled spacing */}
              <div className="flex-1 flex flex-col justify-evenly items-center w-full min-h-0">
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      // Dynamic font size based on viewport height
                      fontSize: `clamp(0.875rem, ${100 / (navLinks.length + 3)}vh, 1.5rem)`,
                      lineHeight: "1.2",
                    }}
                    className="text-white hover:text-orange-500 tracking-widest cursor-pointer font-bold uppercase transition-colors text-center"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Button Container - Fixed at bottom with dynamic sizing */}
              <div className="w-full flex flex-col items-center pt-4 border-t border-gray-800 shrink-0">
                <div className="w-16 h-1 bg-red-600/50 mb-3"></div>
                <a
                  href={BUY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: `clamp(1rem, 4vh, 1.5rem)`,
                    padding: `clamp(0.5rem, 2vh, 1rem) clamp(2rem, 8vw, 3rem)`,
                  }}
                  className="bg-red-600 hover:bg-orange-500 text-white font-bold rounded shadow-[0_0_20px_rgba(204,0,0,0.6)] transition-all active:scale-95"
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
}
