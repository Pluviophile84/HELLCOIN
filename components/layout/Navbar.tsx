"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

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

type NavbarProps = {
  onTriggerPaperHands: () => void;
};

export const Navbar = ({ onTriggerPaperHands }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);
  const [isCalculated, setIsCalculated] = useState(false);

  // --- SCROLL SHRINK ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- BODY LOCK ON MOBILE MENU ---
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.stopPropagation(); // so mobile overlay click doesn't double fire
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- DESKTOP OVERFLOW CALCULATION (MORE BUTTON) ---
  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !ghostRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const moreButtonWidth = 60; // reserve for "MORE"
    let currentWidth = 0;
    let visible = 0;

    const ghostChildren = Array.from(
      ghostRef.current.children
    ) as HTMLElement[];

    for (let i = 0; i < ghostChildren.length; i++) {
      const linkWidth = ghostChildren[i].offsetWidth + 24; // add gap
      const reserveMore =
        i < ghostChildren.length - 1 ? moreButtonWidth : 0;

      if (currentWidth + linkWidth + reserveMore >= containerWidth) {
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
      window.requestAnimationFrame(() => checkOverflow());
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener("resize", checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow]);

  const visibleLinks = NAV_LINKS_DATA.slice(0, visibleCount);
  const hiddenLinks = NAV_LINKS_DATA.slice(visibleCount);
  const showMoreButton = hiddenLinks.length > 0;

  // --- CLOSE MORE ON CLICK OUTSIDE ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreMenuOpen &&
        moreRef.current &&
        !moreRef.current.contains(event.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreMenuOpen]);

  // --- STYLES FROM ORIGINAL VERSION ---
  const linkStyles =
    "font-terminal text-sm xl:text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap";
  const linkUnderline =
    "absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full";

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[90] transition-all duration-300 ease-in-out",
        // disable shrink on mobile; only md+ shrinks
        isScrolled ? "py-3 md:py-2" : "py-3 md:py-4"
      )}
    >
      {/* BACKGROUND PLATE */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-300 pointer-events-none",
          isScrolled
            ? "bg-hell-black/95 backdrop-blur-md border-b border-hell-red/30 shadow-lg shadow-hell-red/5"
            : "bg-transparent border-b border-transparent"
        )}
      />

      {/* HEADER CONTENT */}
      <div className="relative z-[100] w-full md:w-[90%] lg:w-[70%] max-w-[1920px] mx-auto px-4 md:px-0 flex justify-between items-center transition-all duration-300">
        {/* LOGO (original + slightly larger HELLCION on mobile) */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95 mr-4"
          aria-label="Scroll to top"
        >
          <img
            src="/GOAPE.png"
            alt="Hellcoin"
            className={cn(
              "rounded-full border border-hell-orange object-cover transition-all duration-300",
              isScrolled
                ? "w-8 h-8 md:w-8 md:h-8"
                : "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            )}
          />
          {/* 20% bigger on mobile: text-xl -> text-2xl */}
          <span className="font-gothic text-2xl md:text-2xl lg:text-3xl text-hell-orange tracking-wide text-glow">
            HELLCOIN
          </span>
        </button>

        {/* DESKTOP NAV (xl and up) WITH MORE BUTTON */}
        <div
          ref={containerRef}
          className="relative hidden xl:flex items-center gap-6 justify-center flex-grow min-w-0 mr-4"
        >
          {/* GHOST ROW FOR MEASUREMENT */}
          <div
            ref={ghostRef}
            className="absolute top-0 left-0 flex gap-4 xl:gap-6 invisible pointer-events-none"
            aria-hidden="true"
          >
            {NAV_LINKS_DATA.map((link) => (
              <span key={link.name} className={linkStyles}>
                {link.name}
              </span>
            ))}
          </div>

          {/* VISIBLE LINKS */}
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

          {/* MORE BUTTON + DROPDOWN (hover + click) */}
          <div
            ref={moreRef}
            className={cn(
              "relative h-full flex items-center shrink-0 transition-opacity duration-200",
              isCalculated && showMoreButton
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
            onMouseEnter={() => setMoreMenuOpen(true)}
            onMouseLeave={() => setMoreMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMoreMenuOpen((prev) => !prev)}
              className={cn(
                "flex items-center gap-1 font-terminal text-sm xl:text-base transition-colors uppercase cursor-pointer border px-2 py-1 shrink-0",
                moreMenuOpen
                  ? "text-hell-red border-hell-red"
                  : "text-[#ffae00] border-hell-red/50 hover:text-hell-red"
              )}
            >
              MORE
              {moreMenuOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
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

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button
            type="button"
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-2 md:px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-[10px] md:text-sm font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]" />
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

          {/* HAMBURGER – active below xl only, with extra spacing from Heaven button */}
          <button
            type="button"
            className="xl:hidden text-hell-white ml-3 pl-1"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET MENU (all < xl) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="xl:hidden fixed inset-0 bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-y-auto shadow-2xl z-[95] cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <motion.div
              className="w-full mx-auto p-6 pt-20 pb-8 flex flex-col gap-6 max-w-[480px] sm:max-w-[520px] md:max-w-none md:w-full cursor-default"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* TOP DIVIDER + LINKS */}
              <div className="w-full flex flex-col gap-3 border-t border-gray-900 pt-4">
                {NAV_LINKS_DATA.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-terminal text-lg text-center text-hell-white hover:text-hell-orange tracking-widest cursor-pointer font-bold py-1 w-fit mx-auto"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* BOTTOM BUY SECTION */}
              <div className="w-full flex flex-col items-center pt-4 border-t border-gray-900">
                <a
                  href={BUY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
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
