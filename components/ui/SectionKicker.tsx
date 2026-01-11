import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionKickerProps = {
  children: ReactNode;
  className?: string;
};

export function SectionKicker({ children, className }: SectionKickerProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-lg border-3 border-black bg-obsidian-800 px-4 py-1 font-body text-lg font-bold uppercase tracking-widest text-gold shadow-brutal-sm md:text-xl",
        className
      )}
    >
      {children}
    </span>
  );
}
