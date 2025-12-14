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

type NavItem = {
  name: string;   // full label (mobile menu)
  short: string;  // compact label (desktop nav)
  href: string;
};

const NAV_LINKS_DATA: NavItem[] = [
  { name: "GENESIS",          short: "GENESIS", href: "#genesis" },
  { name: "COMMANDMENTS",     short: "LAW",     href: "#commandments" },
  { name: "NINE TYPES",       short: "TYPES",   href: "#nine-types" },
  { name: "MATH",             short: "MATH",    href: "#math" },
  { name: "RITUAL",           short: "RITUAL",  href: "#ritual" },
  { name: "HELLMAP",          short: "MAP",     href: "#hellmap" },
  { name: "HALL OF PAIN",     short: "HALL",    href: "#hall-of-pain" },
  { name: "REVELATION",       short: "LORE",    href: "#revelation" },
  { name: "THE PIT",          short: "PIT",     href: "#the-pit" },
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

  // --- LINK STYLES (base + 20% bigger on xl = Range 4) ---
  const linkStyles =
    "font-terminal text-[0.95rem] xl:text-[1.25rem] text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold whitespace-nowrap";
  const linkUnderline =
    "absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full";

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-[90] transition-all duration-300 ease-in-out",
        isScrolled ? "py-3 md:py-2" : "py-3 md:py-4"
      )}
    >
      {/* BACKGROUND PLATE */}
