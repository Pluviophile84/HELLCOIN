"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
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
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const wasMobileOpenRef = useRef(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav height CSS variable management
  useEffect(() => {
    if (!navRef.current) return;

    const updateHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        document.documentElement.style.setProperty("--nav-h", `${height}px`);
      }
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navRef.current);
    
    updateHeight();
    
    // Close mobile menu on resize and restore scroll
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        setMobileMenuOpen(false);
      }
      updateHeight();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Ensure solid background when menu is open
  const showSolidNav = isScrolled || mobileMenuOpen;
  const currentPadding = isScrolled ? navPadCompact : navPadExpanded;

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed left-0 right-0 top-0 z-[90] transition-all duration-300 ease-out",
        showSolidNav 
          ? cn("border-b-3 border-black bg-[#1C1612] shadow-brutal", currentPadding)
          : cn("border-b-3 border-transparent bg-transparent shadow-none", currentPadding)
      )}
    >
      <div className="relative z-50 mx-auto flex max-w-[90rem] items-center justify-between px-4 md:px-8">
        <NavbarLogo isScrolled={showSolidNav} onClick={scrollToTop} />

        <NavbarLinks links={NAV_LINKS_DATA} onNavClick={handleNavClick} />

        <NavbarActions
          isScrolled={showSolidNav}
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
      />
    </nav>
  );
};
