"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type NavbarLogoProps = {
  isScrolled: boolean;
  onClick: () => void;
};

const logoExpanded = "h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8";
const logoCompact = "h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7";
const brandExpanded = "text-lg md:text-xl lg:text-2xl";
const brandCompact = "text-lg md:text-xl lg:text-xl";

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
