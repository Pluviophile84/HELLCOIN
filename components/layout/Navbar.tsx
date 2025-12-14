"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- CONFIGURATION ---
const BUY_LINK = "https://raydium.io/swap";

const NAV_LINKS_DATA = [
  { name: "GENESIS", short: "GENESIS", href: "#genesis" },
  { name: "COMMANDMENTS", short: "COMMANDS", href: "#commandments" },
  { name: "NINE TYPES", short: "NINE TYPES", href: "#nine-types" },
  { name: "MATH", short: "MATH", href: "#math" },
  { name: "RITUAL", short: "RITUAL", href: "#ritual" },
  { name: "HELLMAP", short: "HELLMAP", href: "#hellmap" },
  { name: "HALL OF PAIN", short: "PAIN", href: "#hall-of-pain" },
  { name: "REVELATION", short: "TRUTH", href: "#revelation" },
  { name: "THE PIT", short: "PIT", href: "#the-pit" },
] as const;

type NavLink = (typeof NAV_LINKS_DATA)[number];

export const Navbar = ({
  onTriggerPaperHands,
}: {
  onTriggerPaperHands: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Desktop overflow state
  const [visibleCount, setVisibleCount] = useState<number>(
    NAV_LINKS_DATA.length
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);

  const visibleLinks = useMemo(
    () => NAV_LINKS_DATA.slice(0, visibleCount),
    [visibleCount]
  );
  const overflowLinks = useMemo(
    () => NAV_LINKS_DATA.slice(visibleCount),
    [visibleCount]
  );

  // Close menus on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll state for navbar styles
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  // Close "More" menu if you click outside it
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!moreMenuOpen) return;
      const el = containerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setMoreMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [moreMenuOpen]);

  const recalc = useCallback(() => {
    const container = containerRef.current;
    const ghost = ghostRef.current;
    if (!container || !ghost) return;

    const containerWidth = container.getBoundingClientRect().width;

    const moreButtonWidth = 60; // space reserved for More button
    const gapAllowance = 24; // extra breathing room for gap/padding
    const available = containerWidth - moreButtonWidth - gapAllowance;

    // Measure widths of each ghost link
    const items = Array.from(ghost.children) as HTMLElement[];
    let used = 0;
    let count = 0;

    for (const item of items) {
      const w = item.getBoundingClientRect().width;
      if (used + w <= available) {
        used += w;
        count++;
      } else {
        break;
      }
    }

    setVisibleCount(count === NAV_LINKS_DATA.length ? NAV_LINKS_DATA.length : Math.max(1, count));
  }, []);

  // Resize observer for desktop nav overflow
  useLayoutEffect(() => {
    recalc();
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => recalc());
    ro.observe(container);

    return () => ro.disconnect();
  }, [recalc]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100]">
      {/* NAV BAR */}
      <div
        className={cn(
          "relative w-full transition-all duration-300",
          isScrolled
            ? "bg-black/70 backdrop-blur-md border-b border-hell-red/20"
            : "bg-transparent"
        )}
      >
        {/* HEADER CONTENT */}
        <div className="relative z-[100] w-full md:w-[90%] lg:w-[85%] max-w-[2400px] mx-auto px-4 py-4 flex justify-between items-center transition-all duration-300">
          {/* LOGO */}
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
                "border border-hell-orange object-cover transition-all duration-300",
                isScrolled
                  ? "w-8 h-8 md:w-8 md:h-8"
                  : "w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
              )}
            />
            <span className="font-gothic text-2xl md:text-2xl lg:text-3xl text-hell-orange tracking-wide text-glow">
              HELLCOIN
            </span>
          </button>

          {/* DESKTOP NAV (xl and up) */}
          <div
            ref={containerRef}
            className="relative hidden xl:flex items-center gap-6 justify-center flex-grow min-w-0 mx-6 px-2"
          >
            {/* GHOST ROW FOR MEASUREMENT (uses short labels) */}
            <div
              ref={ghostRef}
              className="absolute left-0 top-0 opacity-0 pointer-events-none flex items-center gap-6"
              aria-hidden="true"
            >
              {NAV_LINKS_DATA.map((l) => (
                <a
                  key={`ghost-${l.href}`}
                  href={l.href}
                  className="font-terminal text-gray-500 text-base whitespace-nowrap"
                >
                  {l.short}
                </a>
              ))}
            </div>

            {/* VISIBLE LINKS */}
            {visibleLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-terminal text-gray-500 text-base hover:text-[#ffae00] transition-colors whitespace-nowrap"
              >
                {link.short}
              </a>
            ))}

            {/* MORE DROPDOWN (only if overflow exists) */}
            {overflowLinks.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  className="font-terminal text-gray-500 text-base hover:text-[#ffae00] transition-colors flex items-center gap-1 whitespace-nowrap"
                  onClick={() => setMoreMenuOpen((p) => !p)}
                  aria-expanded={moreMenuOpen}
                  aria-haspopup="menu"
                >
                  MORE{" "}
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
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 bg-black border border-hell-red/20 shadow-[0_0_25px_rgba(204,0,0,0.25)] min-w-[220px] py-2"
                    >
                      {overflowLinks.map((link) => (
                        <a
                          key={`more-${link.href}`}
                          href={link.href}
                          onClick={() => setMoreMenuOpen(false)}
                          className="block px-4 py-2 font-terminal text-gray-400 hover:text-[#ffae00] hover:bg-hell-red/10 transition-colors whitespace-nowrap"
                        >
                          {link.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              type="button"
              onClick={onTriggerPaperHands}
              className="flex items-center gap-2 px-2 md:px-3 py-1 border border-pink-300 text-pink-100 font-terminal text-sm md:text-base hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)] whitespace-nowrap"
            >
              <span className="w-2 h-2 bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]" />
              <span className="hidden md:inline">HEAVEN MODE</span>
              <span className="md:hidden">HEAVEN</span>
            </button>

            {/* BUY BUTTON (desktop only) */}
            <a
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-base lg:text-lg px-4 lg:px-6 py-1 lg:py-2 shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all duration-300 hover:scale-105 border border-hell-orange/50 text-center whitespace-nowrap"
            >
              ACQUIRE $666
            </a>

            {/* HAMBURGER – active below xl only */}
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

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[90] xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute top-0 left-0 w-full pt-24 pb-10 px-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-4">
                  {NAV_LINKS_DATA.map((link) => (
                    <a
                      key={`mobile-${link.href}`}
                      href={link.href}
                      className="font-gothic text-4xl text-hell-white hover:text-[#ffae00] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
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
                    className="bg-hell-red text-hell-white font-gothic text-2xl py-3 px-12 shadow-[0_0_20px_rgba(204,0,0,0.6)]"
                  >
                    ACQUIRE $666
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
