"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type NavbarLogoProps = {
  isScrolled: boolean;
  onClick: () => void;
};

const logoExpanded = "h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9";
const logoCompact = "h-7 w-7 md:h-7 md:w-7 lg:h-8 lg:w-8";
const brandExpanded = "text-xl md:text-2xl lg:text-3xl";
const brandCompact = "text-xl md:text-2xl lg:text-2xl";

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
          className="object-contain drop-shadow-[0_0_0.375rem_rgba(255,85,0,0.4)]"
        />
      </div>
      <span
        className={cn(
          "hellfire-text-pure translate-y-[0.375rem] font-hero leading-none transition-[font-size] duration-300 ease-out",
          isScrolled ? brandCompact : brandExpanded
        )}
      >
        HELLCOIN
      </span>
    </button>
  );
};
