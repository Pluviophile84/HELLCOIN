"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type NavbarLogoProps = {
  isScrolled: boolean;
  onClick: () => void;
};

const logoExpanded = "h-8 w-8 md:h-10 md:w-10 lg:h-11 lg:w-11";
const logoCompact = "h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10";
const brandExpanded = "text-2xl md:text-3xl lg:text-4xl";
const brandCompact = "text-2xl md:text-3xl lg:text-3xl";

export const NavbarLogo = ({ isScrolled, onClick }: NavbarLogoProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 md:gap-3"
      aria-label="Scroll to top"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg transition-[width,height] duration-300 ease-out",
          isScrolled ? logoCompact : logoExpanded
        )}
      >
        <Image
          src="/GOAPE.png"
          alt="HELLCOIN Logo"
          fill
          sizes="44px"
          priority
          className="object-contain drop-shadow-[0_0_6px_rgba(255,85,0,0.4)]"
        />
      </div>
      <span
        className={cn(
          "hellfire-text-pure translate-y-[6px] font-hero leading-none transition-[font-size] duration-300 ease-out",
          isScrolled ? brandCompact : brandExpanded
        )}
      >
        HELLCOIN
      </span>
    </button>
  );
};
