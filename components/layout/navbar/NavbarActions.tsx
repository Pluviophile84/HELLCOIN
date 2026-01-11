"use client";

import type { RefObject } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUY_LINK } from "@/lib/constants";

type NavbarActionsProps = {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  onToggleMobile: () => void;
  onTriggerPaperHands: () => void;
  isHeavenModeActive?: boolean;
  hamburgerRef: RefObject<HTMLButtonElement | null>;
};

const heavenExpanded = "px-2.5 py-1.5 text-[0.6875rem] md:px-4 md:py-2 md:text-sm";
const heavenCompact = "px-2.5 py-1.5 text-[0.6875rem] md:px-3 md:py-1.5 md:text-sm";

const acquireExpanded = "px-5 py-2 lg:px-6 lg:py-2 lg:text-xl";
const acquireCompact = "px-5 py-2 lg:px-5 lg:py-1.5 lg:text-lg";

export const NavbarActions = ({
  isScrolled,
  mobileMenuOpen,
  onToggleMobile,
  onTriggerPaperHands,
  isHeavenModeActive = false,
  hamburgerRef,
}: NavbarActionsProps) => {
  return (
    <div className="flex shrink-0 items-center gap-2 md:gap-4">
      {/* Heaven Mode Button */}
      <button
        type="button"
        onClick={onTriggerPaperHands}
        disabled={isHeavenModeActive}
        className={cn(
          "flex items-center gap-2 whitespace-nowrap rounded-lg hc-border-3 border-black bg-gradient-to-b from-pink-300 to-pink-400 font-body text-xs font-bold text-black shadow-brutal-sm transition-[padding,transform,box-shadow] duration-300 ease-out hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0_0_1.875rem_rgba(244,114,182,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 md:text-sm",
          isScrolled ? heavenCompact : heavenExpanded,
          isHeavenModeActive &&
            "cursor-not-allowed opacity-50 hover:translate-x-0 hover:translate-y-0 hover:shadow-brutal-sm"
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full bg-white shadow-[0_0_0.3125rem_#fff]",
            !isHeavenModeActive && "animate-pulse"
          )}
        />
        <span className="hidden md:inline">HEAVEN MODE</span>
        <span className="md:hidden">HEAVEN</span>
      </button>

      {/* Acquire Button (Desktop) */}
      <a
        href={BUY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "hellfire-bg hidden whitespace-nowrap rounded-lg hc-border-3 border-black text-center font-heading text-white shadow-brutal transition-[padding,transform,box-shadow,font-size] duration-300 ease-out hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 xl:block",
          isScrolled ? acquireCompact : acquireExpanded
        )}
      >
        ACQUIRE $666
      </a>

      {/* Hamburger Menu (Mobile) */}
      <button
        ref={hamburgerRef}
        type="button"
        className="ml-3 rounded-md pl-1 text-lava-100 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 xl:hidden"
        onClick={onToggleMobile}
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
};
