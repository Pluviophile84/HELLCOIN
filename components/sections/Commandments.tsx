"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
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
      <div className="absolute top-4 right-4 font-gothic text-4xl text-hell-red">{c.id}</div>

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
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  // Mobile/tablet frame height locked to tallest card (measured at same width)
  const measureHostRef = useRef<HTMLDivElement | null>(null);
  const sliderFrameRef = useRef<HTMLDivElement | null>(null);
  const [frameHeight, setFrameHeight] = useState<number>(0);

  // Swipe tracking
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const current = useMemo(() => {
    const i = ((index % total) + total) % total;
    return commandments[i];
  }, [index, total]);

  const paginate = useCallback(
    (dir: number) => setIndex(([i]) => [i + dir, dir]),
    []
  );

  // Measure tallest card at the same width as the actual slider frame (so height is correct, not huge)
  useLayoutEffect(() => {
    const measureHost = measureHostRef.current;
    const sliderFrame = sliderFrameRef.current;
    if (!measureHost || !sliderFrame) return;

    const compute = () => {
      // force measurement lane to match slider width exactly
      const w = sliderFrame.getBoundingClientRect().width;
      if (w > 0) measureHost.style.width = `${w}px`;

      const cards = measureHost.querySelectorAll<HTMLElement>('[data-measure="1"]');
      let max = 0;
      cards.forEach((el) => {
        max = Math.max(max, el.offsetHeight);
      });

      if (max > 0) setFrameHeight(max);
    };

    compute();

    // Fonts can change text metrics after first paint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fonts = (document as any).fonts;
    if (fonts?.ready) fonts.ready.then(() => compute()).catch(() => {});

    const ro = new ResizeObserver(() => compute());
    ro.observe(sliderFrame);

    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Swipe handlers (no scrollbar, no drag fighting the page)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // Only treat as swipe if it's mostly horizontal and crosses threshold
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX < 55) return;
    if (absX < absY * 1.25) return;

    // swipe left -> next, swipe right -> prev
    paginate(dx < 0 ? 1 : -1);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    }),
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section id="commandments" className="py-24 px-4 bg-hell-dark relative">
      <div className="max-w-7xl mx-auto">
        {/* Header (kept consistent with your existing style) */}
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="font-terminal text-[#ffae00] text-lg md:text-xl tracking-widest uppercase">
            LAW OF THE LAND
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            THE TEN <span className="text-hell-red">COMMANDMENTS</span>
          </h2>
        </div>

        {/* ======================
            Tablet + Phone: Carousel
           ====================== */}
        <div className="lg:hidden">
          <div className="mx-auto w-full max-w-2xl relative">
            {/* Measurement lane (invisible, same width as slider frame; used only to compute max height) */}
            <div
              ref={measureHostRef}
              className="absolute left-0 top-0 opacity-0 pointer-events-none -z-10"
              aria-hidden="true"
            >
              <div className="flex flex-col gap-4">
                {commandments.map((c) => (
                  <CommandmentCard key={`m-${c.id}`} c={c} data-measure="1" />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4 font-terminal text-sm md:text-base">
              <button
                type="button"
                onClick={() => paginate(-1)}
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
                onClick={() => paginate(1)}
                aria-label="Next commandment"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 bg-hell-black text-gray-300 hover:text-hell-white hover:border-hell-red transition-colors duration-75 select-none"
              >
                NEXT
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Frame (full-size card, not thin) */}
            <div
              ref={sliderFrameRef}
              className="relative w-full"
              style={{
                height: frameHeight ? `${frameHeight}px` : undefined,
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 420, damping: 34 },
                    opacity: { duration: 0.12 },
                  }}
                  className="absolute inset-0"
                >
                  {/* Full width/height card inside frame */}
                  <CommandmentCard c={current} className="h-full" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Single pagination: square dots only */}
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

        {/* ======================
            Laptop + Desktop: Grid (all visible)
           ====================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
        >
          {commandments.map((c, i) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className={[i === 0 || i === 9 ? "md:col-span-2" : "", "h-full"].join(" ")}
            >
              <CommandmentCard c={c} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
