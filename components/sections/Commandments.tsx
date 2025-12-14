"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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

export const Commandments = () => {
  // --- carousel state (mobile/tablet only) ---
  const [index, setIndex] = useState(0);
  const max = commandments.length;

  const current = useMemo(() => commandments[index], [index]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + max) % max), [max]);
  const next = useCallback(() => setIndex((i) => (i + 1) % max), [max]);

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe > 80) prev();
    if (swipe < -80) next();
  };

  return (
    <section id="commandments" className="py-24 px-4 bg-hell-dark relative">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER (unchanged) --- */}
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="font-terminal text-[#ffae00] text-lg md:text-xl tracking-widest uppercase">
            LAW OF THE LAND
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            THE TEN <span className="text-hell-red">COMMANDMENTS</span>
          </h2>
        </div>

        {/* =========================================================
            TABLET + PHONE: CAROUSEL (uses your uploaded pattern)
            shown below lg
           ========================================================= */}
        <div className="lg:hidden">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-hell-black border border-gray-800 overflow-hidden">
              {/* subtle inner rail border (same vibe, no rounded corners) */}
              <div className="absolute inset-0 border border-hell-red/10 pointer-events-none" />

              {/* top rail */}
              <div className="flex items-center justify-between px-6 py-4 md:px-10 border-b border-gray-800 bg-black/40">
                <div className="flex items-center gap-3">
                  <span className="font-gothic text-4xl md:text-5xl text-hell-red">{current.id}</span>
                  <span className="font-terminal text-xs md:text-sm tracking-widest uppercase text-[#ffae00]">
                    commandment {index + 1} / {max}
                  </span>
                </div>

                {/* desktop-ish arrows for tablet */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous commandment"
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next commandment"
                    className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* content */}
              <div className="px-6 py-10 md:px-10 md:py-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                    className="cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }} // keeps page scroll usable; swipe still works
                  >
                    <h3 className="font-terminal text-2xl md:text-4xl uppercase tracking-wide text-hell-white">
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

              {/* mobile arrows + dots */}
              <div className="md:hidden flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-black/40">
                <button
                  type="button"
                  onClick={prev}
                  className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
                  aria-label="Previous commandment"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-2">
                  {commandments.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={[
                        "w-3 h-3 border border-hell-red/40 transition-colors",
                        i === index ? "bg-hell-red" : "bg-transparent",
                      ].join(" ")}
                      aria-label={`Go to commandment ${i + 1}`}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  className="border border-hell-red/30 bg-hell-black px-3 py-2 text-hell-white hover:border-hell-red hover:text-[#ffae00] transition-colors"
                  aria-label="Next commandment"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            LAPTOP + DESKTOP: ORIGINAL GRID (unchanged)
            shown at lg+
           ========================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
