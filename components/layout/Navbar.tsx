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

export function Navbar({ onTriggerPaperHands }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // DESKTOP MORE STATE
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);
  const [isCalculated, setIsCalculated] = useState(false);

  // shrink nav on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // lock body scroll when mobile menu is open
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
    e.stopPropagation();
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // DESKTOP OVERFLOW CALC ("MORE" BUTTON)
  const checkOverflow = useCallback(() => {
    const container = containerRef.current;
    const ghost = ghostRef.current;

    if (!container || !ghost) return;

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    // keep some internal safe space inside the link zone
    const SAFE_SIDE = 40; // px each side
    const effectiveWidth = Math.max(containerWidth - SAFE_SIDE * 2, 0);

    const ghostChildren = Array.from(
      ghost.children
    ) as HTMLElement[];

    const gapPx = 24; // approximates gap-6
    const moreButtonWidth = 90; // reserved width for MORE btn if needed

    let used = 0;
    let visible = 0;

    for (let i = 0; i < ghostChildren.length; i++) {
      const child = ghostChildren[i];
      const baseWidth = child.offsetWidth;
      const gap = visible > 0 ? gapPx : 0;
      const reserveMore =
        i < ghostChildren.length - 1 ? moreButtonWidth : 0;

      if (used + gap + baseWidth + reserveMore > effectiveWidth) {
        break;
      }

      used += gap + baseWidth;
      visible++;
    }

    setVisibleCount(visible);
    setIsCalculated(true);
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [checkOverflow]);

  // close MORE dropdown when clicking outside
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [moreMenuOpen]);

  const visibleLinks = NAV_LINKS_DATA.slice(0, visibleCount);
  const hiddenLinks = NAV_LINKS_DATA.slice(visibleCount);
  const showMoreButton = hiddenLinks.length > 0;

  const desktopLinkBase =
    "font-terminal text-sm xl:text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest cursor-pointer font-bold whitespace-nowrap relative group";
  const desktopUnderline =
    "absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full";

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[90] transition-all duration-300 ease-in-out",
        isScrolled ? "py-2 md:py-2" : "py-3 md:py-4"
      )}
      aria-label="Main navigation"
    >
      {/* background plate */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-300 pointer-events-none",
          isScrolled
            ? "bg-hell-black/95 backdrop-blur-md border-b border-hell-red/30 shadow-lg shadow-hell-red/5"
            : "bg-transparent border-b border-transparent"
        )}
      />

      {/* main row */}
      <div className="relative z-[100] w-full md:w-[90%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%] max-w-[1920px] mx-auto px-4 md:px-6 flex items-center gap-3 md:gap-4 xl:gap-6 transition-all duration-300">
        {/* LOGO + TITLE (reverted to simple, consistent behavior) */}
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
                ? "w-8 h-8 md:w-8 md:h-8 lg:w-10 lg:h-10"
                : "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            )}
          />
          <span className="font-gothic text-hell-orange tracking-wide text-glow text-xl md:text-2xl lg:text-3xl">
            HELLCOIN
          </span>
        </button>

        {/* DESKTOP NAV – xl+ with MORE logic */}
        <div
          ref={containerRef}
          className="hidden xl:flex relative flex-1 items-center justify-center min-w-0"
        >
          {/* GHOST ROW FOR MEASUREMENT */}
          <div
            ref={ghostRef}
            className="absolute top-0 left-0 flex flex-nowrap gap-6 opacity-0 pointer-events-none -z-10"
            aria-hidden="true"
          >
            {NAV_LINKS_DATA.map((link) => (
              <span key={link.name} className={desktopLinkBase}>
                {link.name}
              </span>
            ))}
          </div>

          {/* VISIBLE LINKS */}
          <div
            className={cn(
              "flex flex-nowrap items-center gap-6 px-6 transition-opacity duration-200",
              isCalculated ? "opacity-100" : "opacity-0"
            )}
          >
            {visibleLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={desktopLinkBase}
              >
                {link.name}
                <span className={desktopUnderline} />
              </a>
            ))}
          </div>

          {/* MORE BUTTON + DROPDOWN */}
          <div
            ref={moreRef}
            className={cn(
              "relative h-full flex items-center shrink-0 ml-4 transition-opacity duration-200",
              isCalculated && showMoreButton
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
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
              {moreMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full right-0 pt-3 z-50 min-w-[220px]"
                >
                  <div className="bg-hell-black border border-hell-red/50 shadow-xl p-4 flex flex-col gap-3">
                    {hiddenLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={desktopLinkBase}
                      >
                        {link.name}
                        <span className={desktopUnderline} />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ACTIONS (unchanged behavior) */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0 ml-auto">
          {/* Heaven mode */}
          <button
            type="button"
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px
