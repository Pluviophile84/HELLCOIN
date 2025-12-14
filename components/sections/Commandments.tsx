"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const commandments = [
  { id: "I", title: "BUY THE TOP", text: "Wait for the candle to touch heaven. Then enter hell." },
  { id: "II", title: "NEVER TAKE PROFITS", text: "Watch $50 become $5,000. Then watch $5,000 become a funny story." },
  { id: "III", title: "USE 100X LEVERAGE", text: "Why lose over years when you can lose in a single heartbeat?" },
  { id: "IV", title: "TRUST THE ANIME GIRL", text: "If the founder has a cute profile picture, you must trust them with your life savings." },
  { id: "V", title: "CLICK EVERY LINK", text: "Security is for cowards. If it says 'Claim Airdrop', connect instantly." },
  { id: "VI", title: "DO ZERO RESEARCH", text: "DYOR is for scholars. You follow vibes." },
  { id: "VII", title: "PANIC SELL BOTTOM", text: "Buy when you feel euphoric. Sell when you are crying in the shower." },
  { id: "VIII", title: "MARRY YOUR BAGS", text: "Even if the dev leaves, love never dies. Your portfolio does." },
  {
    id: "IX",
    title: "BUY EVERY NEW COIN",
    text: "Why wait for due diligence when the ticker exists? Hesitation is how people miss generational scams.",
  },
  {
    id: "X",
    title: "TRUST EVERY INFLUENCER",
    text: "Nothing screams financial wisdom like a man filming price predictions from inside his car at 3AM.",
  },
];

function CommandmentCard({
  c,
  className = "",
}: {
  c: (typeof commandments)[number];
  className?: string;
}) {
  return (
    <div
      className={[
        "bg-hell-black border border-gray-800 p-6 relative group",
        "transition-all duration-75 ease-out",
        "hover:border-hell-red hover:scale-[1.01]",
        "flex flex-col h-full", // IMPORTANT: allows equal-height behavior
        className,
      ].join(" ")}
    >
      {/* ID Number */}
      <div className="absolute top-4 right-4 font-gothic text-4xl text-hell-red">
        {c.id}
      </div>

      {/* Title */}
      <h3 className="font-terminal text-xl text-[#ffae00] mb-3 group-hover:text-hell-red uppercase font-semibold transition-colors duration-75">
        {c.title}
      </h3>

      {/* Text */}
      <p className="font-terminal text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-75">
        {c.text}
      </p>

      {/* Spacer (keeps card internals consistent if you add more later) */}
      <div className="mt-auto" />
    </div>
  );
}

export const Commandments = () => {
  const total = commandments.length;

  // Slider refs
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    const idx = ((i % total) + total) % total;
    const el = cardRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [total]);

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Keep active dot in sync with scroll position (smooth + no jitter)
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const items = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most-visible entry
        let bestIdx = active;
        let bestRatio = 0;

        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = items.indexOf(e.target as HTMLDivElement);
          if (idx === -1) continue;
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        }

        if (bestIdx !== active && bestRatio >= 0.55) setActive(bestIdx);
      },
      {
        root,
        threshold: [0.25, 0.55, 0.75],
      }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, active]);

  const current = useMemo(() => commandments[active] ?? commandments[0], [active]);

  return (
    <section id="commandments" className="py-24 px-4 bg-hell-dark relative">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="font-terminal text-[#ffae00] text-lg md:text-xl tracking-widest uppercase">
            LAW OF THE LAND
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            THE TEN <span className="text-hell-red">COMMANDMENTS</span>
          </h2>
        </div>

        {/* =========================================================
            TABLET + PHONE: NATIVE SCROLL-SNAP SLIDER (below lg)
            - Smooth
            - No layout jumps
            - No navbar/page yank
           ========================================================= */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-xl">
            {/* Controls */}
            <div className="flex items-center justify-between mb-4 font-terminal text-sm md:text-base">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous commandment"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 bg-hell-black text-gray-300 hover:text-hell-white hover:border-hell-red transition-colors duration-75 select-none"
              >
                <ChevronLeft size={18} />
                PREV
              </button>

              <div className="font-terminal text-sm tracking-widest uppercase text-gray-500 select-none">
                {current.id} / X
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next commandment"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 bg-hell-black text-gray-300 hover:text-hell-white hover:border-hell-red transition-colors duration-75 select-none"
              >
                NEXT
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Scroll-snap track */}
            <div
              ref={scrollerRef}
              className={[
                "overflow-x-auto overflow-y-hidden",
                "scroll-smooth",
                "snap-x snap-mandatory",
                "overscroll-x-contain", // prevents the page/nav from getting yanked around
                "touch-pan-x", // makes swipe feel like a real slider
                "select-none",
                // spacing
                "px-1",
              ].join(" ")}
            >
              {/* Track: stretch => all cards become same height (max card height) */}
              <div className="flex items-stretch gap-4 py-2">
                {commandments.map((c, i) => (
                  <div
                    key={c.id}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className={[
                      "snap-center shrink-0",
                      "w-[88%] sm:w-[72%] md:w-[62%]", // consistent width per slide
                      "h-full",
                    ].join(" ")}
                  >
                    <CommandmentCard c={c} className="h-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots (square indicators = sharp corner rule) */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {commandments.map((c, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={`Go to commandment ${c.id}`}
                    onClick={() => goTo(i)}
                    className={[
                      "h-2 w-2 border border-gray-800 transition-colors duration-75",
                      isActive ? "bg-hell-red border-hell-red" : "bg-transparent hover:border-hell-red",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            LAPTOP + DESKTOP: FULL GRID (lg and up) — all visible
           ========================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
        >
          {commandments.map((c, i) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className={[
                "h-full",
                i === 0 || i === 9 ? "xl:col-span-2" : "",
              ].join(" ")}
            >
              <CommandmentCard c={c} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
