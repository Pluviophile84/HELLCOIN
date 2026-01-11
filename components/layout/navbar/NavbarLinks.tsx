"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { MouseEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = {
  name: string;
  short: string;
  href: string;
};

type NavbarLinksProps = {
  links: NavItem[];
  onNavClick: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

const MORE_BUTTON_ID = "navbar-more-button";
const MORE_MENU_ID = "navbar-more-menu";

const linkStyles =
  "group relative font-body text-[0.9375rem] font-semibold uppercase tracking-wider text-lava-100 transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none";

const linkUnderline =
  "absolute -bottom-1 left-0 h-[0.1875rem] w-0 bg-gradient-to-r from-hellfire-orange to-lava-500 transition-all duration-200 group-hover:w-full group-focus-visible:w-full";

export const NavbarLinks = ({ links, onNavClick }: NavbarLinksProps) => {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(links.length);
  const [isCalculated, setIsCalculated] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  // Handle menu mount/unmount with animation
  useEffect(() => {
    if (moreMenuOpen) {
      setShouldRenderMenu(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMenuAnimating(true);
        });
      });
    } else {
      setIsMenuAnimating(false);
      const timer = setTimeout(() => {
        setShouldRenderMenu(false);
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [moreMenuOpen]);

  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !ghostRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const moreButtonWidth = 60;
    let currentWidth = 0;
    let visible = 0;

    const ghostChildren = Array.from(ghostRef.current.children) as HTMLElement[];

    for (let i = 0; i < ghostChildren.length; i++) {
      const linkWidth = ghostChildren[i].offsetWidth + 24;
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

  // Close menu on click outside
  useEffect(() => {
    if (!moreMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [moreMenuOpen]);

  const visibleLinks = links.slice(0, visibleCount);
  const hiddenLinks = links.slice(visibleCount);
  const showMoreButton = hiddenLinks.length > 0;

  const handleMoreKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setMoreMenuOpen(true);
      window.requestAnimationFrame(() => {
        const first = document.getElementById("navbar-more-item-0");
        (first as HTMLElement | null)?.focus();
      });
    }
  };

  const handleMenuItemKeyDown = (e: ReactKeyboardEvent<HTMLAnchorElement>, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = document.getElementById(`navbar-more-item-${idx + 1}`);
      (next as HTMLElement | null)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx === 0) {
        document.getElementById(MORE_BUTTON_ID)?.focus();
        setMoreMenuOpen(false);
      } else {
        const prev = document.getElementById(`navbar-more-item-${idx - 1}`);
        (prev as HTMLElement | null)?.focus();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-6 hidden min-w-0 flex-grow items-center justify-center gap-6 px-2 xl:flex"
    >
      {/* Ghost element for measuring */}
      <div
        ref={ghostRef}
        className="pointer-events-none invisible absolute left-0 top-0 flex gap-4 xl:gap-6"
        aria-hidden="true"
      >
        {links.map((link) => (
          <span key={link.href} className={linkStyles}>
            {link.short}
          </span>
        ))}
      </div>

      {/* Visible links */}
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
            onClick={(e) => onNavClick(e, link.href)}
            className={linkStyles}
          >
            {link.short}
            <span className={linkUnderline}></span>
          </a>
        ))}
      </div>

      {/* More dropdown */}
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
            onKeyDown={handleMoreKeyDown}
            className={cn(
              linkStyles,
              "flex items-center gap-1 border-none pl-0 pr-0 !text-lava-100 hover:!text-gold focus-visible:!text-gold"
            )}
          >
            <span>MORE</span>
            {moreMenuOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span className={linkUnderline}></span>
          </button>

          {shouldRenderMenu && (
            <div
              id={MORE_MENU_ID}
              role="menu"
              aria-labelledby={MORE_BUTTON_ID}
              className={cn(
                "absolute left-0 top-full z-50 min-w-[12.5rem] pt-4 transition-all duration-180 ease-out",
                isMenuAnimating ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
              )}
            >
              <div className="flex flex-col gap-4 rounded-xl border-3 border-black bg-[#1C1612] p-5 shadow-brutal">
                {hiddenLinks.map((link, idx) => (
                  <a
                    id={`navbar-more-item-${idx}`}
                    role="menuitem"
                    key={link.href}
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    onKeyDown={(e) => handleMenuItemKeyDown(e, idx)}
                    className={linkStyles}
                  >
                    {link.short}
                    <span className={linkUnderline}></span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
