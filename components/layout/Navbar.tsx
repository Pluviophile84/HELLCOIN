"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { NavbarLogo } from "./navbar/NavbarLogo";
import { NavbarLinks, type NavItem } from "./navbar/NavbarLinks";
import { NavbarMobile } from "./navbar/NavbarMobile";
import { NavbarActions } from "./navbar/NavbarActions";

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
  isHeavenModeActive?: boolean;
};

const navPadExpanded = "py-3 md:py-4 lg:py-3";
const navPadCompact = "py-2 md:py-3 lg:py-2";

export const Navbar = ({ onTriggerPaperHands, isHeavenModeActive = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const maxNavHRef = useRef(0);
  const wasMobileOpenRef = useRef(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav height CSS variable management
  const updateNavHeight = useCallback(() => {
    if (navRef.current) {
      const currentHeight = navRef.current.offsetHeight;
      document.documentElement.style.setProperty("--nav-curr-h", `${currentHeight}px`);
    }

    if (measureRef.current) {
      const expandedHeight = measureRef.current.offsetHeight;
      if (expandedHeight > 0 && Math.abs(maxNavHRef.current - expandedHeight) > 1) {
        maxNavHRef.current = expandedHeight;
        document.documentElement.style.setProperty("--nav-h", `${expandedHeight}px`);
      }
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateNavHeight);
    if (navRef.current) resizeObserver.observe(navRef.current);
    if (measureRef.current) resizeObserver.observe(measureRef.current);

    window.addEventListener("resize", updateNavHeight, { passive: true });
    updateNavHeight();
    document.fonts.ready.then(updateNavHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateNavHeight);
    };
  }, [updateNavHeight]);

  // Focus management when mobile menu closes
  useEffect(() => {
    if (mobileMenuOpen) {
      wasMobileOpenRef.current = true;
    } else if (wasMobileOpenRef.current) {
      wasMobileOpenRef.current = false;
      hamburgerRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed left-0 right-0 top-0 z-[90] border-b-3 border-black bg-[#1C1612] transition-[padding,box-shadow] duration-300 ease-out",
        isScrolled ? `${navPadCompact} shadow-brutal` : `${navPadExpanded} shadow-none`
      )}
    >
      {/* Hidden measurement div (always expanded state) - must match actual navbar structure including border */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none invisible absolute left-0 right-0 top-0 border-b-3 px-4 md:px-8",
          navPadExpanded
        )}
      >
        <div className="flex items-center justify-between">
          <div className="h-11 w-11" />
          <div className="h-10" />
        </div>
      </div>

      {/* Main navbar content */}
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 md:px-8">
        <NavbarLogo isScrolled={isScrolled} onClick={scrollToTop} />

        <NavbarLinks links={NAV_LINKS_DATA} onNavClick={handleNavClick} />

        <NavbarActions
          isScrolled={isScrolled}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobile={() => setMobileMenuOpen((prev) => !prev)}
          onTriggerPaperHands={onTriggerPaperHands}
          isHeavenModeActive={isHeavenModeActive}
          hamburgerRef={hamburgerRef}
        />
      </div>

      <NavbarMobile
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS_DATA}
        onNavClick={handleNavClick}
        navRef={navRef}
      />
    </nav>
  );
};
