"use client";

import { SectionKicker } from "@/components/ui/SectionKicker";

export const DevilsMath = () => {
  return (
    <section id="math" className="bg-hell-black py-24 font-terminal">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-16 flex flex-col items-center gap-2 text-center">
          {/* FIX: Removed font-bold, set to text-xl md:text-2xl */}
          <SectionKicker>SIN NOMICS DATA</SectionKicker>
          <h2 className="font-gothic text-6xl text-hell-white md:text-8xl">
            THE <span className="text-hell-red">DEVIL'S</span> MATH
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px border border-hell-red/30 bg-hell-red/30 md:grid-cols-2">
          {[
            {
              label: "MAX SUPPLY",
              value: "1 BILLION",
              sub: "TOTAL DAMNED // No Inflation. Just Pain.",
            },
            {
              label: "SIN TAX",
              value: "0% / 0%",
              sub: "The Devil takes no cuts. Only your soul.",
            },
            {
              label: "LIQUIDITY",
              value: "INCINERATED",
              sub: "LP STATUS // Keys thrown into the abyss.",
            },
            {
              label: "DEV ALLOCATION",
              value: "666 TOKENS",
              sub: '"Enough to buy a cheeseburger in hell."',
            },
          ].map((item, i) => (
            <div key={i} className="group bg-hell-black p-8 transition-colors hover:bg-hell-dark">
              <div className="mb-4 flex items-start justify-between">
                <span className="text-xl text-hell-red">./{item.label}</span>
                <div className="h-2 w-2 animate-pulse bg-hell-red opacity-0 group-hover:opacity-100"></div>
              </div>
              <div className="mb-2 font-gothic text-5xl text-hell-white md:text-7xl">
                {item.value}
              </div>
              <div className="border-l-2 border-hell-gold pl-3 text-lg text-hell-white/50">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
