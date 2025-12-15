"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../../lib/utils";
import { lockBodyScroll, unlockBodyScroll } from "../../lib/bodyScrollLock";
import { BUY_LINK } from "@/lib/constants";

type NavItem = {
  name: string; // full label (mobile menu)
  short: string; // compact label (desktop nav)
  href: string;
};

const NAV_LINKS_DATA: NavItem[] = [
  { name: "GENESIS", short: "GENESIS", href: "#genesis" },
  { name: "COMMANDMENTS", short: "LAW", href: "#commandments" },
  { name: "NINE TYPES", short: "TYPES", href: "#nine-types" },
  { name: "MATH", short: "MATH", href: "#math" },
  { name: "RITUAL", short: "RITUAL", href: "#ritual" },
  { name: "HELLMAP", short: "MAP", href: "#hellmap" },
  { name: "HALL OF PAIN", short: "HALL", href: "#hall-of-pain" },
  { name: "REVELATION", short: "LORE", href: "#revelation" },
  { name: "THE PIT", short: "PIT", href: "#the-pit" },
];

type NavbarProps = {
  onTriggerPaperHands: () => void;
};

const MORE_BUTTON_ID = "navbar-more-button";
const MORE_MENU_ID = "navbar-more-menu";

export const Navbar = ({ onTriggerPaperHands }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const hamburgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const wasMobileOpenRef = useRef(false);

  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);
  const [isCalculated, setIsCalculated] = useState(false);

  // --- SCROLL SHRINK (desktop only; mobile stays the same) ---
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
    if (mobileMenuOpen) {
      lockBodyScroll("navbar:mobile-menu");
      wasMobileOpenRef.current = true;
    } else {
      unlockBodyScroll("navbar:mobile-menu");
      // Restore focus after closing (if it was opened)
      if (wasMobileOpenRef.current) {
        wasMobileOpenRef.current = false;
        hamburgerButtonRef.current?.focus();
      }
    }

    return () => {
      unlockBodyScroll("navbar:mobile-menu");
    };
  }, [mobileMenuOpen]);

  // --- ESC CLOSE (mobile menu + more menu) ---
  useEffect(() => {
    if (!mobileMenuOpen && !moreMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileMenuOpen(false);
      setMoreMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, moreMenuOpen]);

  // --- Focus first link when mobile menu opens ---
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Defer until after the panel is in the DOM.
    const raf = window.requestAnimationFrame(() => {
      const panel = mobilePanelRef.current;
      const firstLink = panel?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus();
    });

    return () => window.cancelAnimationFrame(raf);
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

  // --- DESKTOP OVERFLOW CALCULATION (MORE BUTTON) ---
  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !ghostRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const moreButtonWidth = 60; // reserve for "MORE"
    let currentWidth = 0;
    let visible = 0;

    const ghostChildren = Array.from(ghostRef.current.children) as HTMLElement[];

    for (let i = 0; i < ghostChildren.length; i++) {
      const linkWidth = ghostChildren[i].offsetWidth + 24; // add gap
      const reserveMore = i < ghostChildren.length - 1 ? moreButtonWidth : 0;

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
      if (moreMenuOpen && moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreMenuOpen]);

  // --- LINK STYLES (base + 20% bigger on xl) ---
  const linkStyles =
    "font-terminal text-[0.95rem] xl:text-[1.25rem] text-hell-white hover:text-hell-gold transition-colors uppercase tracking-widest relative group cursor-pointer font-semibold whitespace-nowrap";
  const linkUnderline =
    "absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full";

  // Focus trap for the mobile panel.
  const handleMobileKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const panel = mobilePanelRef.current;
    if (!panel) return;

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-[90] w-full transition-all duration-300 ease-in-out",
        isScrolled ? "py-3 md:py-2" : "py-3 md:py-4"
      )}
    >
      {/* BACKGROUND PLATE */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full transition-all duration-300",
          isScrolled
            ? "border-b border-hell-red/30 bg-hell-black/95 shadow-lg shadow-hell-red/5 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      />

      {/* HEADER CONTENT */}
      <div className="relative z-[100] mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 transition-all duration-300 md:w-[90%] md:px-0 lg:w-[70%]">
        {/* LOGO */}
        <button
          type="button"
          onClick={scrollToTop}
          className="group mr-4 flex shrink-0 cursor-pointer items-center gap-2 transition-transform active:scale-95 md:gap-3"
          aria-label="Scroll to top"
        >
          <div
            className={cn(
              "relative overflow-hidden border border-hell-orange object-cover transition-all duration-300",
              isScrolled ? "h-8 w-8 md:h-8 md:w-8" : "h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10"
            )}
          >
            <Image src="/GOAPE.png" alt="Hellcoin" fill sizes="40px" className="object-cover" />
          </div>
          <span className="text-glow font-gothic text-2xl tracking-wide text-hell-orange md:text-2xl lg:text-3xl">
            HELLCOIN
          </span>
        </button>

        {/* DESKTOP NAV (xl and up) */}
        <div
          ref={containerRef}
          className="relative mx-6 hidden min-w-0 flex-grow items-center justify-center gap-6 px-2 xl:flex"
        >
          {/* GHOST ROW FOR MEASUREMENT (uses short labels) */}
          <div
            ref={ghostRef}
            className="pointer-events-none invisible absolute left-0 top-0 flex gap-4 xl:gap-6"
            aria-hidden="true"
          >
            {NAV_LINKS_DATA.map((link) => (
              <span key={link.href} className={linkStyles}>
                {link.short}
              </span>
            ))}
          </div>

          {/* VISIBLE LINKS */}
          <div
            className={cn(
              "flex gap-4 transition-opacity duration-200 xl:gap-6",
              isCalculated ? "opacity-100" : "opacity-0"
            )}
          >
            {visibleLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={linkStyles}
              >
                {link.short}
                <span className={linkUnderline}></span>
              </a>
            ))}
          </div>

          {/* MORE BUTTON + DROPDOWN (only rendered when needed) */}
          {isCalculated && showMoreButton && (
            <div
              ref={moreRef}
              className="relative flex h-full shrink-0 items-center"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
              onFocusCapture={() => setMoreMenuOpen(true)}
              onBlurCapture={(e) => {
                const next = e.relatedTarget as Node | null;
                if (next && moreRef.current?.contains(next)) return;
                setMoreMenuOpen(false);
              }}
            >
              <button
                id={MORE_BUTTON_ID}
                type="button"
                aria-haspopup="menu"
                aria-expanded={moreMenuOpen}
                aria-controls={MORE_MENU_ID}
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setMoreMenuOpen(true);
                    window.requestAnimationFrame(() => {
                      const first = document.getElementById("navbar-more-item-0");
                      (first as HTMLElement | null)?.focus();
                    });
                  }
                }}
                className={cn(
                  linkStyles,
                  "flex items-center gap-1 border-none pl-0 pr-0 !text-hell-white hover:!text-hell-gold"
                )}
              >
                <span>MORE</span>
                {moreMenuOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span className={linkUnderline}></span>
              </button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    id={MORE_MENU_ID}
                    role="menu"
                    aria-labelledby={MORE_BUTTON_ID}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 top-full z-50 min-w-[200px] pt-4"
                  >
                    <div className="flex flex-col gap-4 border border-hell-red/50 bg-hell-black p-5 shadow-xl">
                      {hiddenLinks.map((link, idx) => (
                        <a
                          id={`navbar-more-item-${idx}`}
                          role="menuitem"
                          key={link.href}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={linkStyles}
                        >
                          {link.short}
                          <span className={linkUnderline}></span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 whitespace-nowrap border border-pink-300 px-2 py-1 font-terminal text-[10px] font-bold text-pink-100 shadow-[0_0_10px_rgba(255,192,203,0.3)] transition-colors hover:bg-pink-500/20 hover:text-white md:px-3 md:text-sm"
          >
            <span className="h-2 w-2 animate-pulse bg-pink-200 shadow-[0_0_5px_#fff]" />
            <span className="hidden md:inline">HEAVEN MODE</span>
            <span className="md:hidden">HEAVEN</span>
          </button>

          {/* BUY ONLY IN DESKTOP MODE (xl+) */}
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden transform whitespace-nowrap border border-hell-orange/50 bg-hell-red px-4 py-1 text-center font-gothic text-base text-hell-white shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all hover:scale-105 hover:bg-hell-orange lg:px-6 lg:py-2 lg:text-lg xl:block"
          >
            ACQUIRE $666
          </a>

          {/* HAMBURGER – active below xl only */}
          <button
            ref={hamburgerButtonRef}
            type="button"
            className="ml-3 pl-1 text-hell-white xl:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET MENU (all < xl) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[95] cursor-pointer overflow-y-auto border-b border-hell-red/50 bg-hell-black/95 shadow-2xl backdrop-blur-xl xl:hidden"
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={handleMobileKeyDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <motion.div
              ref={mobilePanelRef}
              tabIndex={-1}
              className="mx-auto flex w-full max-w-[480px] cursor-default flex-col gap-6 p-6 pb-8 pt-20 sm:max-w-[520px] md:w-full md:max-w-none"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* TOP DIVIDER + LINKS (full names) */}
              <div className="flex w-full flex-col gap-3 border-t border-hell-white/5 pt-4">
                {NAV_LINKS_DATA.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="mx-auto w-fit cursor-pointer py-1 text-center font-terminal text-lg font-bold tracking-widest text-hell-white hover:text-hell-orange"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* BOTTOM BUY SECTION */}
              <div className="flex w-full flex-col items-center border-t border-hell-white/5 pt-4">
                <a
                  href={BUY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-hell-red px-12 py-3 font-gothic text-2xl text-hell-white shadow-[0_0_20px_rgba(204,0,0,0.6)]"
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
