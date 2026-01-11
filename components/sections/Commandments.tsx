"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, PanInfo, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionKicker } from "@/components/ui/SectionKicker";
import {
  staggerContainerFast,
  fadeInUp,
  cardHover,
  slideVariants as baseSlideVariants,
  slideTransition,
  getVariants,
  getInitial,
  getWhileInView,
  getHover,
} from "@/lib/animations";
import { useViewportMarginRem } from "@/lib/useViewportMarginRem";

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
    text: 'Security is for cowards. If it says "Claim Airdrop," connect instantly.',
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
const HEIGHT_MULTIPLIER = 1.35;
const HEIGHT_BUFFER_PX = 72;

export const Commandments = () => {
  const [[idx, dir], setIdx] = useState<[number, number]>([0, 0]);
  const max = commandments.length;
  const reduceMotion = useReducedMotion();
  const margin = useViewportMarginRem(6.25, 0, 0, 0);

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

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => compute()).catch(() => {});
    }

    const ro = new ResizeObserver(() => compute());
    ro.observe(frame);

    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <section id="commandments" className="relative bg-obsidian-950 px-4 py-24">
      <div className="mx-auto max-w-[87.5rem] 3xl:max-w-[137.5rem] 4xl:max-w-[162.5rem]">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <SectionKicker>LAW OF THE LAND</SectionKicker>
          <h2 className="font-heading text-5xl font-black text-lava-50 md:text-6xl 3xl:text-7xl">
            THE TEN <span className="hellfire-text-pure pr-1">COMMANDMENTS</span>
          </h2>
          <p className="max-w-lg font-body text-lg text-lava-100/60">
            Moses had tablets. We have a Terms of Service nobody reads.
          </p>
        </div>

        <div className="lg:hidden">
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-xl hc-border-3 border-black bg-obsidian-800 shadow-brutal transition-all hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)]">
                <div className="relative flex items-center border-b-3 border-black bg-obsidian-900 px-6 py-4 md:px-10">
                  <div className="flex items-center">
                    <span className="text-cartoon-sm hellfire-text font-heading text-4xl md:text-5xl">
                      {current.id}
                    </span>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2">
                    <span className="whitespace-nowrap font-body text-sm font-bold uppercase tracking-widest text-gold md:text-base">
                      <span className="inline-block w-[5ch] text-center tabular-nums">
                        {current.id}
                      </span>
                      <span className="inline-block w-[3ch] text-center">/</span>
                      <span className="inline-block w-[5ch] text-center tabular-nums">
                        {TOTAL_ROMAN}
                      </span>
                    </span>
                  </div>
                </div>

              <div
                ref={frameRef}
                className="overflow-hidden px-6 py-10 md:px-10 md:py-14"
                style={{ height: fixedHeight || undefined }}
              >
                <div
                  ref={measureRef}
                  className="pointer-events-none absolute -left-[9999px] top-0 opacity-0"
                  aria-hidden="true"
                >
                  {commandments.map((c) => (
                    <div key={`m-${c.id}`} data-measure-slide="1">
                      <h3 className="font-body text-2xl font-bold uppercase tracking-wide text-gold md:text-4xl">
                        {c.title}
                      </h3>
                      <div className="mt-6 border-l-4 border-hellfire-orange pl-5">
                        <p className="font-body text-lg leading-relaxed text-lava-100 md:text-2xl">
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
                    variants={reduceMotion ? undefined : baseSlideVariants}
                    initial={reduceMotion ? undefined : "enter"}
                    animate={reduceMotion ? undefined : "center"}
                    exit={reduceMotion ? undefined : "exit"}
                    transition={reduceMotion ? undefined : slideTransition}
                    drag={reduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    onDragEnd={onDragEnd}
                    className="h-full cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }}
                  >
                    <h3 className="font-body text-2xl font-bold uppercase tracking-wide text-gold md:text-4xl">
                      {current.title}
                    </h3>

                    <div className="mt-6 border-l-4 border-hellfire-orange pl-5">
                      <p className="font-body text-lg leading-relaxed text-lava-100 md:text-2xl">
                        {current.text}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t-3 border-black bg-obsidian-900 px-4 py-6 sm:px-6 md:px-10">
                <div className="text-center font-body text-[0.625rem] font-bold uppercase tracking-widest text-lava-100/50 sm:text-xs md:text-sm">
                  SWIPE LEFT / RIGHT — OR DO IT ANYWAY.
                </div>

                <div className="mt-8 flex items-center justify-between gap-2 w-full max-w-4xl mx-auto px-1 sm:px-2">
                    <button
                      type="button"
                      onClick={() => paginate(-1)}
                      className="rounded-lg border-3 border-black bg-obsidian-800 p-2.5 sm:px-4 sm:py-3 text-lava-100 shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:text-gold hover:shadow-none flex-shrink-0 active:scale-95"
                      aria-label="Previous commandment"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="flex flex-1 items-center justify-center gap-[clamp(0.25rem,3.5vw,2.5rem)] min-w-0 mx-2">
                      {commandments.map((c, i) => (
                        <button
                          key={c.id}
                          type="button"
                          aria-label={`Go to commandment ${c.id}`}
                          onClick={() => setIdx(([curr]) => [i, i > curr ? 1 : -1])}
                          className={[
                            "rounded-sm border-2 border-black transition-all duration-300 flex-shrink-0",
                            i === idx 
                              ? "hellfire-bg scale-125 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" 
                              : "bg-obsidian-800 hover:bg-obsidian-700 w-2 h-2 sm:w-3 sm:h-3",
                          ].join(" ")}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => paginate(1)}
                      className="rounded-lg border-3 border-black bg-obsidian-800 p-2.5 sm:px-4 sm:py-3 text-lava-100 shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:text-gold hover:shadow-none flex-shrink-0 active:scale-95"
                      aria-label="Next commandment"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          variants={getVariants(staggerContainerFast, reduceMotion)}
          initial={getInitial(reduceMotion)}
          whileInView={getWhileInView(reduceMotion)}
          viewport={{ once: true, amount: 0.05, margin }}
          className="hidden grid-cols-1 gap-6 md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 3xl:gap-8"
        >
            {commandments.map((c, i) => (
              <motion.div
                key={c.id}
                variants={getVariants(fadeInUp, reduceMotion)}
                whileHover={getHover(cardHover, reduceMotion)}
                className={`group relative overflow-visible rounded-xl hc-border-3 border-black bg-obsidian-800 p-6 shadow-brutal transition-shadow duration-200 hover:bg-obsidian-900 hover:shadow-[0_0_2.5rem_rgba(255,85,0,0.5)] ${i === 0 || i === 9 ? "md:col-span-2 3xl:col-span-1" : ""}`}
              >
                <div className="text-cartoon-sm hellfire-text absolute right-4 top-3 font-heading text-3xl">
                  {c.id}
                </div>

                <h3 className="mb-3 pr-10 font-body text-xl font-bold uppercase text-gold transition-colors duration-150 group-hover:text-lava-300">
                  {c.title}
                </h3>

              <p className="font-body text-lg text-lava-100/70 transition-colors duration-150 group-hover:text-lava-100">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
