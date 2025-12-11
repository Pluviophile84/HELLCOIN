"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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

const linkStyles =
  "font-terminal text-xs sm:text-sm xl:text-base 2xl:text-lg text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap";

const linkUnderline =
  "absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full";

const GAP_WIDTH = 24;
const MORE_BUTTON_WIDTH = 72;

export function Navbar({
  onTriggerPaperHands,
}: {
  onTriggerPaperHands: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !ghostRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    if (containerWidth <= 0) return;

    const ghostChildren = Array.from(
      ghostRef.current.children
    ) as HTMLElement[];

    if (!ghostChildren.length) {
      setVisibleCount(0);
      setIsCalculated(true);
      return;
    }

    let currentWidth = 0;
    let visible = 0;

    for (let i = 0; i < ghostChildren.length; i++) {
      const linkWidth = ghostChildren[i].offsetWidth;
      const gap = i === 0 ? 0 : GAP_WIDTH;
      const needsMoreButton = i < ghostChildren.length - 1;

      const nextWidth =
        currentWidth +
        gap +
        linkWidth +
        (needsMoreButton ? MORE_BUTTON_WIDTH : 0);

      if (nextWidth > containerWidth) break;

      currentWidth += gap + linkWidth;
      visible++;
    }

    const finalVisible = Math.max(0, Math.min(visible, NAV_LINKS_DATA.length));
    setVisibleCount(finalVisible);
    setIsCalculated(true);
  }, []);

  useEffect(() => {
    checkOverflow();

    const observers: ResizeObserver[] = [];

    if (typeof ResizeObserver !== "undefined") {
      const observeEl = (el: HTMLElement | null) => {
        if (!el) return;
        const ro = new ResizeObserver(() => {
          window.requestAnimationFrame(() => checkOverflow());
        });
        ro.observe(el);
        observers.push(ro);
      };

      observeEl(containerRef.current);
      observeEl(ghostRef.current);
    }

    window.addEventListener("resize", checkOverflow);

    return () => {
      observers.forEach((ro) => ro.disconnect());
      window.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow]);

  const visibleLinks = NAV_LINKS_DATA.slice(0, visibleCount);
  const hiddenLinks = NAV_LINKS_DATA.slice(visibleCount);
  const showMoreButton = hiddenLinks.length > 0;

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

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[90] transition-all duration-300 ease-in-out",
        isScrolled ? "py-3 md:py-2" : "py-4 md:py-5"
      )}
      aria-label="Main navigation"
    >
      {/* Background plate */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-300 pointer-events-none",
          isScrolled
            ? "bg-hell-black/95 backdrop-blur-md border-b border-hell-red/30 shadow-lg shadow-hell-red/5"
            : "bg-transparent border-b border-transparent"
        )}
      />

      {/* Main row – shared safe side spacing via px-fluid-gap */}
      <div className="relative z-[100] w-full md:w-[70%] max-w-[1920px] mx-auto px-fluid-gap flex items-center gap-3 md:gap-4 xl:gap-6 transition-all duration-300">
        {/* LOGO */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95"
          aria-label="Scroll to top"
        >
          <img
            src="/GOAPE.png"
            alt="Hellcoin"
            className={cn(
              "rounded-full border border-hell-orange object-cover transition-all duration-300",
              isScrolled
                ? "w-8 h-8 md:w-8 md:h-8"
                : "w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12"
            )}
          />
          <span className="font-gothic text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-hell-orange tracking-wide text-glow">
            HELLCOIN
          </span>
        </button>

        {/* DESKTOP NAV (xl+ only) */}
        <div
          ref={containerRef}
          className="relative hidden xl:flex items-center justify-center flex-1 min-w-0 px-4"
        >
          {/* ghost row for measurement */}
          <div
            ref={ghostRef}
            className="absolute top-0 left-0 flex gap-4 2xl:gap-6 invisible pointer-events-none"
            aria-hidden="true"
          >
            {NAV_LINKS_DATA.map((link) => (
              <span key={link.name} className={linkStyles}>
                {link.name}
              </span>
            ))}
          </div>

          <div
            className={cn(
              "flex gap-4 2xl:gap-6 items-center transition-opacity duration-200",
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
                <span className={linkUnderline} />
              </a>
            ))}

            {showMoreButton && (
              <div
                ref={moreRef}
                className="relative h-full flex items-center shrink-0"
                onMouseEnter={() => setMoreMenuOpen(true)}
                onMouseLeave={() => setMoreMenuOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 font-terminal text-sm xl:text-base 2xl:text-lg transition-colors uppercase cursor-pointer border px-2 py-1 shrink-0",
                    moreMenuOpen
                      ? "text-hell-red border-hell-red"
                      : "text-[#ffae00] border-hell-red/50 hover:text-hell-red"
                  )}
                  aria-haspopup="true"
                  aria-expanded={moreMenuOpen}
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
                      className="absolute top-full left-0 pt-4 z-50 min-w-[200px]"
                      role="menu"
                    >
                      <div className="bg-hell-black border border-hell-red/50 shadow-xl p-5 flex flex-col gap-4">
                        {hiddenLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={linkStyles}
                            role="menuitem"
                          >
                            {link.name}
                            <span className={linkUnderline} />
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

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 ml-auto">
          {/* Heaven mode – always visible */}
          <button
            type="button"
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-2 md:px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-[10px] md:text-sm xl:text-base font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)] whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]" />
            <span className="hidden md:inline">HEAVEN MODE</span>
            <span className="md:hidden">HEAVEN</span>
          </button>

          {/* BUY – desktop only */}
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-base xl:text-lg 2xl:text-xl px-4 xl:px-6 py-1 xl:py-2 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50 text-center whitespace-nowrap"
          >
            ACQUIRE $666
          </a>

          {/* Hamburger – only below xl */}
          <button
            type="button"
            className="xl:hidden text-hell-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET NAV (hamburger) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="xl:hidden fixed inset-0 z-[95] bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-y-auto"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="max-w-[480px] mx-auto w-full p-6 pt-20 pb-8 flex flex-col gap-6"
            >
              <div className="w-full flex flex-col gap-3">
                {NAV_LINKS_DATA.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-terminal text-lg text-center text-hell-white hover:text-hell-orange tracking-widest cursor-pointer font-bold py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

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
}
