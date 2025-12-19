import React from "react";
import { cn } from "@/lib/utils";

type SectionKickerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Small helper for the gold, terminal-style section kicker line.
 * Defaults match the most common usage across sections.
 */
export function SectionKicker({ children, className }: SectionKickerProps) {
  return (
    <span
      className={cn(
        "font-terminal text-sm uppercase tracking-[0.35em] text-hell-gold/90 sm:text-base md:text-lg",
        className
      )}
    >
      {children}
    </span>
  );
}
