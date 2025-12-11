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

// 5-range clamp on nav link text
const linkStyles =
  [
    "font-terminal text-hell-white hover:text-[#ffae00] transition-colors",
    "uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap",
    // base: small phones up to <640
    "text-[clamp(0.8rem,2.6vw,0.95rem)]",
    // sm: 640+
    "sm:text-[clamp(0.85rem,2vw,1.05rem)]",
    // md: 768+
    "md:text-[clamp(0.9rem,1.6vw,1.1rem)]",
    // lg: 1024+
    "lg:text-[clamp(0.95rem,1.3vw,1.15rem)]",
    // 2xl: 1536+
    "2xl:text-[clamp(1.05rem,1vw,1.25rem)]",
  ].join(" ");

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

  // Shrink nav on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // DESKTOP: determine how many links fit in center zone
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

  // Close MORE menu on outside click
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
      <div className="relative z-[100] w-full md:w-[70%] max-w-[1920px] mx-auto px-[clamp(0.75rem,4vw,1.5rem)] sm:px-fluid-gap flex items-center gap-3 md:gap-4 xl:gap-6 transition-all duration-300">
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
          <span
            className={[
              "font-gothic text-hell-orange tracking-wide text-glow",
              "text-[clamp(1.25rem,4vw,1.5rem)]",
              "md:text-[clamp(1.5rem,3vw,1.9rem)]",
              "xl:text-[clamp(1.9rem,2.5vw,2.4rem)]",
              "2xl:text-[clamp(2.1rem,2vw,2.7rem)]",
            ].join(" ")}
          >
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
                    "flex items-center gap-1 font-terminal uppercase cursor-pointer border px-2 py-1 shrink-0 transition-colors",
                    [
                      "text-[clamp(0.9rem,1.4vw,1.05rem)]",
