"use client";

import { SectionKicker } from "@/components/ui/SectionKicker";

export const DevilsMath = () => {
  return (
    <section
      id="math"
      className="hk-scanlines hk-noise relative overflow-hidden bg-[radial-gradient(800px_480px_at_20%_10%,rgba(255,60,0,0.14),transparent_60%),radial-gradient(900px_600px_at_80%_0%,rgba(124,42,255,0.10),transparent_60%),linear-gradient(180deg,rgba(5,5,5,1),rgba(8,8,11,1))] py-28 font-terminal"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-infernal-grid absolute inset-0 opacity-[0.08]" />
        <div className="absolute -left-24 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,60,0,0.25),transparent_70%)] blur-2xl" />
        <div className="absolute -right-32 bottom-0 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(124,42,255,0.16),transparent_72%)] blur-3xl" />
      </div>
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-16 flex flex-col items-center gap-2 text-center">
          {/* FIX: Removed font-bold, set to text-xl md:text-2xl */}
          <SectionKicker>SIN NOMICS DATA</SectionKicker>
          <h2 className="font-gothic text-6xl text-hell-white md:text-8xl">
            THE <span className="text-hell-red">DEVIL&apos;S</span> MATH
          </h2>
        </div>

        <div className="hk-ember-edge hk-noise grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-hell-red/25 shadow-ember md:grid-cols-2">
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
            <div
              key={i}
              className="group relative bg-[linear-gradient(180deg,rgba(10,10,10,0.86),rgba(5,5,5,0.92))] p-8 transition-all duration-200 hover:bg-[linear-gradient(180deg,rgba(10,10,10,0.92),rgba(5,5,5,0.92))]"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-xl text-hell-red">./{item.label}</span>
                <div className="animate-rune-pulse h-2 w-2 bg-hell-gold opacity-0 group-hover:opacity-100 motion-reduce:animate-none"></div>
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
