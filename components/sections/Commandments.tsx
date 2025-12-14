"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const commandments = [
  { id: "I", title: "BUY THE TOP", text: "Wait for the candle to touch heaven. Then enter hell." },
  { id: "II", title: "NEVER TAKE PROFITS", text: "Watch $50 become $5,000. Then watch $5,000 become a funny story." },
  { id: "III", title: "USE 100X LEVERAGE", text: "Why lose over years when you can lose in a single heartbeat?" },
  { id: "IV", title: "TRUST THE ANIME GIRL", text: "If the founder has a cute profile picture, you must trust them with your life savings." },
  { id: "V", title: "CLICK EVERY LINK", text: "Security is for cowards. If it says 'Claim Airdrop', connect instantly." },
  { id: "VI", title: "DO ZERO RESEARCH", text: "DYOR is for scholars. You follow vibes." },
  { id: "VII", title: "PANIC SELL BOTTOM", text: "Buy when you feel euphoric. Sell when you are crying in the shower." },
  { id: "VIII", title: "MARRY YOUR BAGS", text: "Even if the dev leaves, love never dies. Your portfolio does." },
  { id: "IX", title: "BUY EVERY NEW COIN", text: "Why wait for due diligence when the ticker exists? Hesitation is how people miss generational scams." },
  { id: "X", title: "TRUST EVERY INFLUENCER", text: "Nothing screams financial wisdom like a man filming price predictions from inside his car at 3AM." },
];

function Card({
  c,
  className = "",
  "data-measure": dataMeasure,
}: {
  c: (typeof commandments)[number];
  className?: string;
  "data-measure"?: string;
}) {
  return (
    <div
      data-measure={dataMeasure}
      className={[
        "bg-hell-black border border-gray-800 p-6 relative group",
        "transition-all duration-75 ease-out",
        "hover:border-hell-red hover:scale-[1.01]",
        "flex flex-col h-full",
        className,
      ].join(" ")}
    >
      <div className="absolute top-4 right-4 font-gothic text-4xl text-hell-red">
        {c.id}
      </div>

      <h3 className="font-terminal text-xl text-[#ffae00] mb-3 group-hover:text-hell-red uppercase font-semibold transition-colors duration-75">
        {c.title}
      </h3>

      <p className="font-terminal text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-75">
        {c.text}
      </p>

      <div className="mt-auto" />
    </div>
  );
}

export const Commandments = () => {
  const total = commandments.length;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const measureLaneRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const [frameHeight, setFrameHeight] = useState<number>(0);

  // slide width (consistent with your design, just a mobile slider constraint)
  const slideWidthClass = "w-[92%] sm:w-[78%] md:w-[64%]";

  const current = useMemo(() => commandments[active] ?? commandments[0], [active]);

  const scrollToIndex = useCallback(
    (idxRaw: number) => {
      const root = scrollerRef.current;
      if (!root) return;

      const idx = ((idxRaw % total) + total) % total;
      const el = root.querySelector<HTMLElement>(`[data-slide="${idx}"]`);
      if (!el) return;

      // Center the slide without triggering vertical page scroll
      const rootRect = root.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const rootCenter = rootRect.left + rootRect.width / 2;
      const elCenter = elRect.left + elRect.width / 2;
      const delta = elCenter - rootCenter;

      root.scrollTo({
        left: root.scrollLeft + delta,
        behavior: "smooth",
      });
    },
    [total]
  );

  const prev = useCallback(() => scrollToIndex(active - 1), [active, scrollToIndex]);
  const next = useCallback(() => scrollToIndex(active + 1), [active, scrollToIndex]);

  // Measure tallest card at slider width -> lock frame height to that (prevents jump/glitch)
  useLayoutEffect(() => {
    const host = measureLaneRef.current;
    if (!host) return;

    const compute = () => {
      const cards = host.querySelectorAll<HTMLElement>('[data-measure="1"]');
      let max = 0;
      cards.forEach((el) => {
        max = Math.max(max, el.offsetHeight);
      });
      if (max) setFrameHeight(max);
    };

    // Run immediately, then again after fonts settle
    compute();
    const raf = requestAnimationFrame(compute);

    // If browser supports font loading API, re-measure once fonts are ready
    // (prevents wrong height due to fallback font)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fonts = (document as any).fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => compute()).catch(() => {});
    }

    const ro = new ResizeObserver(() => compute());
    ro.observe(host);

    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Track active slide by center proximity while user swipes (smooth, no IO jank)
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    let raf = 0;

    const updateActive = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
        if (!slides.length) return;

        const rootRect = root.getBoundingClientRect();
        const rootCenter = rootRect.left + rootRect.width / 2;

        let bestIdx = active;
        let bestDist = Infinity;

        for (const el of slides) {
          const r = el.getBoundingClientRect();
          const center = r.left + r.width / 2;
          const dist = Math.abs(center - rootCenter);
          const idx = Number(el.getAttribute("data-slide") ?? "0");
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        }

        if (bestIdx !== active) setActive(bestIdx);
      });
    };

    root.addEventListener("scroll", updateActive, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("scroll", updateActive);
    };
  }, [active]);

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
            TABLET + PHONE: SLIDER (below lg)
           ========================================================= */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-xl relative">
            {/* hidden measurement lane (same max width + same slide widths) */}
            <div
              ref={measureLaneRef}
              className="absolute -left-[9999px] top-0 w-full opacity-0 pointer-events-none"
              aria-hidden="true"
            >
              {commandments.map((c) => (
                <div key={`m-${c.id}`} className={slideWidthClass}>
                  <Card c={c} data-measure="1" />
                </div>
              ))}
            </div>

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

            {/* Fixed-height frame (exactly tallest card) */}
            <div
              className="relative w-full"
              style={{
                height: frameHeight ? `${frameHeight}px` : undefined,
              }}
            >
              <div
                ref={scrollerRef}
                className="hc-commandments-scroller h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth overscroll-x-contain px-1"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex items-stretch gap-4 h-full">
                  {commandments.map((c, i) => (
                    <div
                      key={c.id}
                      data-slide={i}
                      className={[
                        "snap-center shrink-0 h-full",
                        slideWidthClass,
                        // subtle “smoothness” feedback while swiping (transform doesn't affect layout)
                        "transition-transform duration-300 ease-out",
                        i === active ? "scale-100" : "scale-[0.985]",
                      ].join(" ")}
                    >
                      <Card c={c} className="h-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Single pagination: square dots ONLY */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {commandments.map((c, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={`Go to commandment ${c.id}`}
                    onClick={() => scrollToIndex(i)}
                    className={[
                      "h-2 w-2 border border-gray-800 transition-colors duration-75",
                      isActive ? "bg-hell-red border-hell-red" : "bg-transparent hover:border-hell-red",
                    ].join(" ")}
                  />
                );
              })}
            </div>

            {/* scrollbar hide (only for this scroller) */}
            <style jsx>{`
              .hc-commandments-scroller {
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE/Edge legacy */
              }
              .hc-commandments-scroller::-webkit-scrollbar {
                display: none; /* Chrome/Safari */
              }
            `}</style>
          </div>
        </div>

        {/* =========================================================
            LAPTOP + DESKTOP: FULL GRID (lg and up) — unchanged layout
           ========================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
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
                i === 0 || i === 9 ? "md:col-span-2" : "",
              ].join(" ")}
            >
              <Card c={c} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
