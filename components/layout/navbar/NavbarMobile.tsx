"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { BUY_LINK } from "@/lib/constants";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/bodyScrollLock";
import type { NavItem } from "./NavbarLinks";

type NavbarMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  navRef: RefObject<HTMLElement | null>;
};

const linkStyles =
  "group relative font-body text-sm font-semibold uppercase tracking-wider text-lava-100 transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none";

const linkUnderline =
  "absolute -bottom-1 left-0 h-[3px] w-0 bg-gradient-to-r from-hellfire-orange to-lava-500 transition-all duration-200 group-hover:w-full group-focus-visible:w-full";

export const NavbarMobile = ({ isOpen, onClose, links, onNavClick, navRef }: NavbarMobileProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll("navbar:mobile-menu");
    } else {
      unlockBodyScroll("navbar:mobile-menu");
    }

    return () => {
      unlockBodyScroll("navbar:mobile-menu");
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={cn(
        "fixed inset-0 z-40 overflow-y-auto bg-[#1C1612] transition-opacity duration-200 ease-out xl:hidden",
        isAnimating ? "opacity-100" : "opacity-0"
      )}
      style={{ paddingTop: "var(--nav-h)" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "mx-auto flex w-full max-w-[480px] cursor-default flex-col gap-3 p-4 pb-6 transition-all duration-200 ease-out sm:max-w-[520px] md:w-full md:max-w-none",
          isAnimating ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col gap-1.5 border-t-3 border-lava-500/30 pt-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
              className={cn(linkStyles, "mx-auto w-fit py-1.5 text-xl tracking-widest")}
            >
              {link.name}
              <span className={cn(linkUnderline, "h-1.5")}></span>
            </a>
          ))}
        </div>

        <div className="flex w-full flex-col items-center border-t-3 border-lava-500/30 pt-4">
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hellfire-bg rounded-xl border-3 border-black px-8 py-3 font-heading text-2xl text-white shadow-brutal transition-all hover:shadow-[0_0_30px_rgba(255,85,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1612]"
          >
            ACQUIRE $666
          </a>
        </div>
      </div>
    </div>
  );
};
