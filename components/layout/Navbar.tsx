"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // shared nav link styles
  const linkStyles = [
    "font-terminal text-hell-white hover:text-[#ffae00] transition-colors",
    "uppercase tracking-widest cursor-pointer font-bold whitespace-nowrap",
    "text-[clamp(0.8rem,2.4vw,0.95rem)]",
  ].join(" ");

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
      <div className="relative z-[100] w-full md:w-[80%] xl:w-[70%] max-w-[1920px] mx-auto px-[clamp(0.75rem,4vw,1.5rem)] sm:px-fluid-gap flex items-center gap-3 md:gap-4 xl:gap-6 transition-all duration-300">
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

        {/* DESKTOP NAV – show from lg+ */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-6 min-w-0">
          {NAV_LINKS_DATA.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={linkStyles}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0 ml-auto">
          {/* Heaven mode */}
          <button
            type="button"
            onClick={onTriggerPaperHands}
            className={[
              "flex items-center gap-2 px-2 md:px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal font-bold",
              "hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)] whitespace-nowrap",
              "text-[clamp(0.62rem,2.3vw,0.8rem)]",
              "md:text-[clamp(0.75rem,1.6vw,0.95rem)]",
              "xl:text-[clamp(0.85rem,1.3vw,1.05rem)]",
            ].join(" ")}
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]" />
            <span className="hidden md:inline">HEAVEN MODE</span>
            <span className="md:hidden">HEAVEN</span>
          </button>

          {/* BUY – desktop only (lg+) */}
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "hidden lg:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic",
              "px-4 xl:px-6 py-1 xl:py-2 rounded border border-hell-orange/50 text-center whitespace-nowrap",
              "transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(204,0,0,0.5)]",
              "text-[clamp(1rem,1.1vw,1.1rem)] 2xl:text-[clamp(1.1rem,0.9vw,1.3rem)]",
            ].join(" ")}
          >
            ACQUIRE $666
          </a>

          {/* Hamburger – < lg */}
          <button
            type="button"
            className="lg:hidden text-hell-white p-2"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET NAV (including Range 3) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[95] bg-hell-black/95 backdrop-blur-xl border-b border-hell-red/50 overflow-y-auto"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full mx-auto p-6 pt-20 pb-8 flex flex-col gap-6 max-w-[480px] sm:max-w-[520px] md:max-w-none md:w-full"
            onClick={(e) => e.stopPropagation()}
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
          </div>
        </div>
      )}
    </nav>
  );
}
