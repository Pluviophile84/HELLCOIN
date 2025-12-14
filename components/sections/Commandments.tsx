"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  { id: "IX", title: "BUY EVERY NEW COIN", text: "Why wait for due diligence when the ticker exists? Hesitation is how people miss generational scams." },
  { id: "X", title: "TRUST EVERY INFLUENCER", text: "Nothing screams financial wisdom like a man filming price predictions from inside his car at 3AM." },
];

function CommandmentCard({
  c,
  className = "",
  "data-measure-card": dataMeasureCard,
}: {
  c: (typeof commandments)[number];
  className?: string;
  "data-measure-card"?: string;
}) {
  return (
    <div
      data-measure-card={dataMeasureCard}
      className={[
        "bg-hell-black border border-gray-800 p-6 relative group",
        "transition-all duration-75 ease-out",
        "hover:border-hell-red hover:scale-[1.01]",
        "flex flex-col", // keeps internal layout stable and lets us force equal heights
        className,
      ].join(" ")}
    >
      {/* ID Number (Fixed Bright Red) */}
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
    </div>
  );
}

const swipeConfidenceThreshold = 9000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export const Commandments = () => {
  const total = commandments.length;
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  // Mobile/tablet slider frame height (measured as the tallest card at the slider width)
  const measureHostRef = useRef<HTMLDivElement | null>(null);
  const [frameHeight, setFrameHeight] = useState<number>(0);

  const current = useMemo(() => {
    const i = ((index % total) + total) % total;
    return commandments[i];
  }, [index, total]);

  const paginate = useCallback((dir: number) => {
    setIndex(([i]) => [i + dir, dir]);
  }, []);

  const sliderVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 140 : -140,
      opacity: 0,
      filter: "blur(1px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -140 : 140,
      opacity: 0,
      filter: "blur(1px)",
    }),
  };

  // Measure tallest card at the slider width, so every slide has identical height (no “glitch” jump)
  useEffect(() => {
    if (!measureHostRef.current) return;

    const compute = () => {
      const host = measureHostRef.current;
      const cards = host.querySelectorAll<HTMLElement>('[data-measure-card="1"]');

      let max = 0;
      cards.forEach((el) => {
        // offsetHeight includes padding/border, perfect for our fixed frame
        max = Math.max(max, el.offsetHeight);
      });

      // Safety: avoid thrashing state
      if (max && Math.abs(max - frameHeight) > 2) setFrameHeight(max);
      if (!frameHeight && max) setFrameHeight(max);
    };

    compute();

    const ro = new ResizeObserver(() => compute());
    ro.observe(measureHostRef.current);

    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {/* Hidden measurement host (same width as slider) */}
            <div
              ref={measureHostRef}
              className="absolute -left-[9999px] top-0 w-full pointer-events-none opacity-0"
              aria-hidden="true"
            >
              {commandments.map((c) => (
                <CommandmentCard key={`measure-${c.id}`} c={c} data-measure-card="1" />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4 font-terminal text-sm md:text-base">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous commandment"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 bg-hell-black text-gray-300 hover:text-hell-white hover:border-hell-red transition-colors duration-75"
              >
                <ChevronLeft size={18} />
                PREV
              </button>

              <div className="font-terminal text-sm tracking-widest uppercase text-gray-500">
                {current.id} / X
              </div>

              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next commandment"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 bg-hell-black text-gray-300 hover:text-hell-white hover:border-hell-red transition-colors duration-75"
              >
                NEXT
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Fixed-height slide frame (prevents jump/glitch) */}
            <div
              className="relative w-full"
              style={{
                height: frameHeight ? `${frameHeight}px` : undefined,
                minHeight: "320px", // stable fallback before measurement runs
              }}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 420, damping: 36 },
                    opacity: { duration: 0.15 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.9}
                  onDragEnd={(_, info) => {
                    const swipe = swipePower(info.offset.x, info.velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                  }}
                  style={{ touchAction: "pan-y", height: "100%" }}
                  className="h-full"
                >
                  <CommandmentCard c={current} className="h-full" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {commandments.map((c, i) => {
                const active = c.id === current.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={`Go to commandment ${c.id}`}
                    onClick={() => setIndex([i, i > index ? 1 : -1])}
                    className={[
                      "h-2 w-2 border border-gray-800 transition-colors duration-75",
                      active ? "bg-hell-red border-hell-red" : "bg-transparent hover:border-hell-red",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            LAPTOP + DESKTOP: FULL GRID (lg and up)
            Keep the exact section design; just ensure equal card heights by stretching.
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
