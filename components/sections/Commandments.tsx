"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const commandments = [
  { id: "I", title: "BUY THE TOP", text: "Wait for the candle to touch heaven. Then enter hell." },
  { id: "II", title: "NEVER TAKE PROFITS", text: "Watch $50 become $5,000. Then watch $5,000 become a funny story." },
  { id: "III", title: "USE 100X LEVERAGE", text: "Why lose over years when you can lose in a single heartbeat?" },
  { id: "IV", title: "TRUST THE ANIME GIRL", text: "If the founder has a cute profile picture, you must trust them with your life savings." },
  { id: "V", title: "CLICK EVERY LINK", text: "Security is for cowards. If it says “Claim Airdrop,” connect instantly." },
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
    text: "Nothing screams wisdom like a man filming price predictions from inside his car at 3AM.",
  },
];

const TOTAL_ROMAN = "X";
const HEIGHT_BUFFER_PX = 44; // ~1–2 lines of breathing room

export const Commandments = () => {
  // carousel state
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

  // fixed height for carousel content
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

      if (tallest > 0) setFixedHeight(tallest + HEIGHT_BUFFER_PX);
    };

    compute();

    // fonts can load after first paint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    }, // ✅ FIXED (was `}),` which broke build)
    exit: (direction: number) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <section id="commandments" className="py-24 px-4 bg-hell-dark relative">
      <div className="max-w-7xl mx-auto">
        {/* Header (unchanged) */}
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="font-terminal text-[#ffae00] text-lg md:text-xl tracking-widest uppercase">
            LAW OF THE LAND
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            THE TEN <span className="text-hell-red">COMMANDMENTS</span>
          </h2>
        </div>

        {/* Mobile/Tablet carousel */}
        <div className="lg:hidden">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-hell-black border border-gray-800 overflow-hidden">
              <div className="absolute inset-0 border border-hell-red/10 pointer-events-none" />

              {/* Top rail */}
              <div className="flex items-center justify-between px-6 py-4 md:px-10 border-b border-gray-800 bg-black/40">
                <div className="flex items-center gap-3">
                  <span className="font-gothic text-4xl md:text-5xl text-hell-red">{current.id}</span>
                  <span className="font-terminal text-xs md:text-sm tracking-widest uppercase text-[#ffae00]">
                    {current.id} / {TOTAL_ROMAN}
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Previous commandment"
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Next commandment"
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Fixed-height content area */}
              <div
                ref={frameRef}
                className="px-6 py-10 md:px-10 md:py-14"
                style={{ height: fixedHeight || undefined }}
              >
                {/* Offscreen measurement (same width + same typography) */}
                <div
                  ref={measureRef}
                  className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                >
                  {commandments.map((c) => (
                    <div key={`m-${c.id}`} data-measure-slide="1">
                      <h3 className="font-terminal text-2xl md:text-4xl uppercase tracking-wide text-[#FF3C00]">
                        {c.title}
                      </h3>
                      <div className="mt-6 border-l-4 border-hell-red pl-5">
                        <p className="font-terminal text-lg md:text-2xl text-gray-300 leading-relaxed">{c.text}</p>
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
                    <h3 className="font-terminal text-2xl md:text-4xl uppercase tracking-wide text-[#FF3C00]">
                      {current.title}
                    </h3>

                    <div className="mt-6 border-l-4 border-hell-red pl-5">
                      <p className="font-terminal text-lg md:text-2xl text-gray-300 leading-relaxed">
                        {current.text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom rail (static phrase + dots + mobile arrows) */}
              <div className="border-t border-gray-800 bg-black/40 px-6 py-4 md:px-10">
                <div className="font-terminal text-xs md:text-sm tracking-widest uppercase text-gray-500 text-center">
                  SWIPE LEFT / RIGHT — OR PRETEND YOU READ IT AND DO IT ANYWAY.
                </div>

                <div className="mt-3 flex items-center justify-between md:justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    className="md:hidden border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
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
                          "w-3 h-3 border border-hell-red/40 transition-colors",
                          i === idx ? "bg-hell-red" : "bg-transparent",
                        ].join(" ")}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    className="md:hidden border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
                    aria-label="Next commandment"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop grid (unchanged) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {commandments.map((c, i) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`
                bg-hell-black border border-gray-800 p-6 relative group
                transition-all duration-75 ease-out
                hover:border-hell-red hover:scale-[1.01]
                ${i === 0 || i === 9 ? "md:col-span-2" : ""}
              `}
            >
              <div className="absolute top-4 right-4 font-gothic text-4xl text-hell-red">{c.id}</div>

              <h3 className="font-terminal text-xl text-[#ffae00] mb-3 group-hover:text-hell-red uppercase font-semibold transition-colors duration-75">
                {c.title}
              </h3>

              <p className="font-terminal text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-75">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
