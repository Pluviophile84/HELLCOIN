"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const commandments = [
  { id: "I", title: "BUY THE TOP", text: "Wait for the candle to touch heaven. Then enter hell." },
  {
    id: "II",
    title: "NEVER TAKE PROFITS",
    text: "Watch $50 become $5,000. Then watch $5,000 become a funny story.",
  },
  {
    id: "III",
    title: "USE 100X LEVERAGE",
    text: "Why lose over years when you can lose in a single heartbeat?",
  },
  {
    id: "IV",
    title: "TRUST THE ANIME GIRL",
    text: "If the founder has a cute profile picture, you must trust them with your life savings.",
  },
  {
    id: "V",
    title: "CLICK EVERY LINK",
    text: "Security is for cowards. If it says “Claim Airdrop,” connect instantly.",
  },
  { id: "VI", title: "DO ZERO RESEARCH", text: "DYOR is for scholars. You follow vibes." },
  {
    id: "VII",
    title: "PANIC SELL BOTTOM",
    text: "Buy when you feel euphoric. Sell when you are crying in the shower.",
  },
  {
    id: "VIII",
    title: "MARRY YOUR BAGS",
    text: "Even if the dev leaves, love never dies. Your portfolio does.",
  },
  {
    id: "IX",
    title: "BUY EVERY NEW COIN",
    text: "Why wait for due diligence when the ticker exists? Hesitation is how people miss generational scams.",
  },
  {
    id: "X",
    title: "TRUST EVERY INFLUENCER",
    text: "Nothing screams wisdom like a man filming price predictions from inside his car at 3AM.",
  },
];

const TOTAL_ROMAN = "X";

// >= 30% more height + extra breathing room for future longer text
const HEIGHT_MULTIPLIER = 1.35;
const HEIGHT_BUFFER_PX = 72;

export const Commandments = () => {
  // carousel state (mobile/tablet)
  const [[idx, dir], setIdx] = useState<[number, number]>([0, 0]);
  const max = commandments.length;

  const current = useMemo(() => commandments[idx], [idx]);

  const paginate = useCallback(
    (delta: number) => {
      setIdx(([i]) => {
        const next = (i + delta + max) % max;
        return [next, delta >= 0 ? 1 : -1];
      });
    },
    [max]
  );

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 90) paginate(-1);
    if (info.offset.x < -90) paginate(1);
  };

  // fixed height for carousel content (prevents jumping + prevents overlap)
  const frameRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [fixedHeight, setFixedHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const measure = measureRef.current;
    if (!frame || !measure) return;

    const compute = () => {
      const w = frame.getBoundingClientRect().width;
      if (w > 0) measure.style.width = `${w}px`;

      const slides = measure.querySelectorAll<HTMLElement>("[data-measure-slide='1']");
      let tallest = 0;
      slides.forEach((el) => {
        tallest = Math.max(tallest, el.offsetHeight);
      });

      if (tallest > 0) {
        const boosted = Math.ceil(tallest * HEIGHT_MULTIPLIER) + HEIGHT_BUFFER_PX;
        setFixedHeight(boosted);
      }
    };

    compute();

    // fonts can load after first paint, changing height
    const fonts = (document as any).fonts;
    if (fonts?.ready) fonts.ready.then(() => compute()).catch(() => {});

    const ro = new ResizeObserver(() => compute());
    ro.observe(frame);

    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  // side-swipe animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <section id="commandments" className="relative bg-hell-dark px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header (unchanged) */}
        <div className="mb-16 flex flex-col items-center gap-2 text-center">
          <span className="font-terminal text-lg uppercase tracking-widest text-hell-gold md:text-xl">
            LAW OF THE LAND
          </span>
          <h2 className="font-gothic text-6xl text-hell-white md:text-8xl">
            THE TEN <span className="text-hell-red">COMMANDMENTS</span>
          </h2>
        </div>

        {/* =========================================================
            TABLET + PHONE: CAROUSEL (below lg)
           ========================================================= */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden border border-hell-white/10 bg-hell-black">
              <div className="pointer-events-none absolute inset-0 border border-hell-red/10" />

              {/* Top rail: left numeral + TRUE centered counter (absolute) + right arrows */}
              <div className="relative flex items-center border-b border-hell-white/10 bg-hell-black/40 px-6 py-4 md:px-10">
                {/* Left: current roman numeral */}
                <div className="flex items-center">
                  <span className="font-gothic text-4xl text-hell-red md:text-5xl">
                    {current.id}
                  </span>
                </div>

                {/* Center: rock-solid counter (cannot shift when left width changes) */}
                <div className="absolute left-1/2 -translate-x-1/2">
                  <span className="whitespace-nowrap font-terminal text-sm uppercase tracking-widest text-hell-gold md:text-base">
                    {/* 5ch covers "VIIII" as well as "VIII" etc */}
                    <span className="inline-block w-[5ch] text-center tabular-nums">
                      {current.id}
                    </span>
                    <span className="inline-block w-[3ch] text-center">/</span>
                    <span className="inline-block w-[5ch] text-center tabular-nums">
                      {TOTAL_ROMAN}
                    </span>
                  </span>
                </div>

                {/* Right: arrows (tablet+) */}
                <div className="ml-auto hidden items-center gap-2 md:flex">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Previous commandment"
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white transition-colors hover:border-hell-red hover:text-hell-gold"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Next commandment"
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white transition-colors hover:border-hell-red hover:text-hell-gold"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Fixed-height content area (overflow hidden prevents overlap into bottom rail) */}
              <div
                ref={frameRef}
                className="overflow-hidden px-6 py-10 md:px-10 md:py-14"
                style={{ height: fixedHeight || undefined }}
              >
                {/* Offscreen measurement slides (same width + same typography) */}
                <div
                  ref={measureRef}
                  className="pointer-events-none absolute -left-[9999px] top-0 opacity-0"
                  aria-hidden="true"
                >
                  {commandments.map((c) => (
                    <div key={`m-${c.id}`} data-measure-slide="1">
                      <h3 className="font-terminal text-2xl uppercase tracking-wide text-hell-gold md:text-4xl">
                        {c.title}
                      </h3>
                      <div className="mt-6 border-l-4 border-hell-red pl-5">
                        <p className="font-terminal text-lg leading-relaxed text-hell-white md:text-2xl">
                          {c.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false} custom={dir}>
                  <motion.div
                    key={current.id}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 520, damping: 44 },
                      opacity: { duration: 0.12 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    onDragEnd={onDragEnd}
                    className="h-full cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }}
                  >
                    <h3 className="font-terminal text-2xl uppercase tracking-wide text-hell-gold md:text-4xl">
                      {current.title}
                    </h3>

                    <div className="mt-6 border-l-4 border-hell-red pl-5">
                      <p className="font-terminal text-lg leading-relaxed text-hell-white md:text-2xl">
                        {current.text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom rail: static phrase + dots + mobile arrows */}
              <div className="border-t border-hell-white/10 bg-hell-black/40 px-6 py-4 md:px-10">
                <div className="text-center font-terminal text-xs uppercase tracking-widest text-hell-white/50 md:text-sm">
                  SWIPE LEFT / RIGHT — OR PRETEND YOU READ IT AND DO IT ANYWAY.
                </div>

                <div className="mt-3 flex items-center justify-between gap-4 md:justify-center">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white transition-colors hover:border-hell-red hover:text-hell-gold md:hidden"
                    aria-label="Previous commandment"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    {commandments.map((c, i) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-label={`Go to commandment ${c.id}`}
                        onClick={() => setIdx(([curr]) => [i, i > curr ? 1 : -1])}
                        className={[
                          "h-3 w-3 border border-hell-red/40 transition-colors",
                          i === idx ? "bg-hell-red" : "bg-transparent",
                        ].join(" ")}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white transition-colors hover:border-hell-red hover:text-hell-gold md:hidden"
                    aria-label="Next commandment"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            DESKTOP (lg+): ORIGINAL GRID (unchanged)
           ========================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="hidden grid-cols-1 gap-6 md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4"
        >
          {commandments.map((c, i) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`group relative border border-hell-white/10 bg-hell-black p-6 transition-all duration-75 ease-out hover:scale-[1.01] hover:border-hell-red ${i === 0 || i === 9 ? "md:col-span-2" : ""} `}
            >
              <div className="absolute right-4 top-4 font-gothic text-4xl text-hell-red">
                {c.id}
              </div>

              <h3 className="mb-3 font-terminal text-xl font-semibold uppercase text-hell-gold transition-colors duration-75 group-hover:text-hell-red">
                {c.title}
              </h3>

              <p className="font-terminal text-lg text-hell-white/70 transition-colors duration-75 group-hover:text-hell-white">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
