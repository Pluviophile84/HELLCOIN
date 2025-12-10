"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
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

export const Navbar = ({
  onTriggerPaperHands,
}: {
  onTriggerPaperHands: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(NAV_LINKS_DATA.length);
  const [isCalculated, setIsCalculated] = useState(false);

  // Shrink / style change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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

  // Smooth scroll handler
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

  // DESKTOP NAV: calculate how many links fit in the center zone
  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !ghostRef.current) return;

    // Safety margin so links never hug logo/actions
    const SAFETY_MARGIN = 40;
    const GAP_WIDTH = 24;
    const MORE_BUTTON_WIDTH = 64;

    const rawContainerWidth = containerRef.current.clientWidth;
    const containerWidth = Math.max(rawContainerWidth - SAFETY_MARGIN, 0);

    if (containerWidth === 0) return;

    const ghostChildren = Array.from(
      ghostRef.current.children
    ) as HTMLElement[];

    if (ghostChildren.length === 0) {
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

      if (nextWidth > containerWidth) {
        break;
      }

      currentWidth += gap + linkWidth;
      visible++;
    }

    let finalVisible = Math.max(0, Math.min(visible, NAV_LINKS_DATA.length));
    if (finalVisible === 0 && containerWidth > 140) {
      finalVisible = 1;
    }

    setVisibleCount(finalVisible);
    setIsCalculated(true);
  }, []);

  // Observe desktop nav size changes
  useEffect(() => {
    checkOverflow();

    const observers: ResizeObserver[] = [];

    if (typeof ResizeObserver !== "undefined") {
      const createObserver = (el: HTMLElement | null) => {
        if (!el) return;
        const ro = new ResizeObserver(() => {
          window.requestAnimationFrame(() => checkOverflow());
        });
        ro.observe(el);
        observers.push(ro);
      };

      createObserver(containerRef.current);
      createObserver(ghostRef.current);
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

  // Click-outside for MORE (desktop)
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

  const linkStyles =
    "font-terminal text-sm xl:text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap";
  const linkUnderline =
    "absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full";

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[90] transition-all duration-300 ease-in-out",
        isScrolled ? "py-4 md:py-2" : "py-4 md:py-6"
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

      {/* 70% WIDTH CONTENT ROW */}
      <div className="relative z-[100] w-full lg:w-[70%] max-w-[1920px] mx-auto px-4 md:px-0 flex items-center gap-3 md:gap-4 lg:gap-6 transition-all duration-300">
        {/* LOGO (LEFT, STATIC) */}
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
                : "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            )}
          />
          <span className="font-gothic text-xl md:text-2xl lg:text-3xl text-hell-orange tracking-wide text-glow">
            HELLCOIN
          </span>
        </button>

        {/* DESKTOP NAV (CENTER ZONE, lg+ ONLY) */}
        <div
          ref={containerRef}
          className="relative hidden lg:flex items-center justify-center flex-1 min-w-0"
        >
          {/* Ghost row for measuring widths */}
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

          {/* Visible links + MORE (centered) */}
          <div
            className={cn(
              "flex gap-4 xl:gap-6 transition-opacity duration-200 items-center",
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
                    "flex items-center gap-1 font-terminal text-sm xl:text-base transition-colors uppercase cursor-pointer border px-2 py-1 shrink-0",
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
                    <Chevr
