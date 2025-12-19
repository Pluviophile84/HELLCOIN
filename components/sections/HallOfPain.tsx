"use client";
import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Filter, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionKicker } from "@/components/ui/SectionKicker";

const sinners = [
  {
    id: "#0001",
    name: "Sinner #420",
    pnl: "-99%",
    quote:
      "I watched a YouTube video called 'Next 1000x Gem.' The guy had his mouth open in the thumbnail, so I trusted him.",
    initialRespects: 420,
  },
  {
    id: "#0002",
    name: "BagHolder_666",
    pnl: "Divorced",
    quote:
      "My wife thinks we are saving for a house. I am actually 50x leveraged long on a token called 'ElonSperm'.",
    initialRespects: 666,
  },
  {
    id: "#0003",
    name: "Wagie_007",
    pnl: "-$12,000",
    quote:
      "I market-bought the top. It immediately tanked 40%. I panic-sold the bottom. It immediately pumped 80%.",
    initialRespects: 1337,
  },
  {
    id: "#0004",
    name: "SafeMoon_Vet",
    pnl: "Soul Sold",
    quote:
      "My cousin bought 'HarryPotterObamaSonic' yesterday and just bought a Porsche. I hate this simulation.",
    initialRespects: 999,
  },
  {
    id: "#0005",
    name: "Alpha_Hunter",
    pnl: "-$45,000",
    quote:
      "I joined a 'VIP Alpha Group' for 2 ETH. They told me to buy a coin named after a bacterial infection. It went to zero in 4 minutes.",
    initialRespects: 777,
  },
  {
    id: "#0006",
    name: "Leverage_King",
    pnl: "Liqui-dated",
    quote:
      "I saw a green candle on a 1-minute chart and felt invincible. I went 100x long on a stablecoin. I don't want to talk about it.",
    initialRespects: 69,
  },
  {
    id: "#0007",
    name: "NFT_Collector",
    pnl: "Jpeg'd",
    quote:
      "I sold my car to buy a picture of a monkey wearing a hat. The floor price is now 0.01 ETH and the monkey looks like it's judging me.",
    initialRespects: 8008,
  },
  {
    id: "#0008",
    name: "Seed_Phrase_Guy",
    pnl: "Hacked",
    quote:
      "A 'Support Agent' DM'd me to sync my wallet. He seemed very polite. Now my wallet is synced to his bank account.",
    initialRespects: 0,
  },
];

export const HallOfPain = () => {
  const [respectsPaid, setRespectsPaid] = useState<Record<string, boolean>>({});
  const [respectCounts, setRespectCounts] = useState<Record<string, number>>({});
  const [prankError, setPrankError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"latest" | "top">("latest");

  // FIX: State to control scroll locking
  const [isScrollable, setIsScrollable] = useState(false);

  // Improvement: safe timer cleanup (NO visual change)
  const prankTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    sinners.forEach((s) => (initialCounts[s.id] = s.initialRespects));
    setRespectCounts(initialCounts);

    const saved = localStorage.getItem("hellcoin_respects");
    if (saved) {
      setRespectsPaid(JSON.parse(saved));
    }

    return () => {
      if (prankTimerRef.current) clearTimeout(prankTimerRef.current);
    };
  }, []);

  const handlePayRespect = (id: string) => {
    if (respectsPaid[id]) return;

    const newState = { ...respectsPaid, [id]: true };
    setRespectsPaid(newState);
    localStorage.setItem("hellcoin_respects", JSON.stringify(newState));

    setRespectCounts((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleConfess = () => {
    const errors = [
      "ERROR 404: SAVINGS ACCOUNT NOT FOUND.",
      "TRANSACTION FAILED: INSUFFICIENT DIGNITY DETECTED.",
      "SYSTEM ALERT: WENDY'S IS HIRING. APPLY NOW.",
      "ACCESS DENIED: YOUR BAGS ARE HEAVIER THAN YOUR SINS.",
      "FATAL ERROR: LEVERAGE TOO HIGH, IQ TOO LOW.",
      "CONFESSION REJECTED: JUST BUY THE DIP AGAIN.",
    ];
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    setPrankError(randomError);

    if (prankTimerRef.current) clearTimeout(prankTimerRef.current);
    prankTimerRef.current = setTimeout(() => setPrankError(null), 4000);
  };

  // --- SORTING LOGIC ---
  const sortedSinners = [...sinners].sort((a, b) => {
    if (filter === "top") {
      const countA = respectCounts[a.id] || a.initialRespects;
      const countB = respectCounts[b.id] || b.initialRespects;
      return countB - countA; // Descending order
    }
    // Default: Latest (Sort by ID descending assumes higher ID is newer)
    return b.id.localeCompare(a.id);
  });

  return (
    <section
      id="hall-of-pain"
      className="hk-noise relative overflow-hidden bg-[radial-gradient(1000px_650px_at_20%_0%,rgba(255,60,0,0.18),transparent_60%),radial-gradient(900px_600px_at_80%_10%,rgba(255,174,0,0.08),transparent_60%),linear-gradient(180deg,rgba(8,8,11,1),rgba(5,5,5,1))] py-32"
    >
      <div className="mx-auto mb-12 max-w-6xl px-4">
        {/* --- HEADER --- */}
        <div className="mb-12 flex flex-col items-center gap-2 text-center">
          <SectionKicker>PROOF OF SUFFERING</SectionKicker>
          <h2 className="font-gothic text-6xl text-hell-white md:text-8xl">HALL OF PAIN</h2>
        </div>

        {/* --- FILTERS --- */}
        <div className="mb-4 flex justify-end gap-4 font-terminal text-sm md:text-base">
          <button
            onClick={() => setFilter("latest")}
            className={`hk-ember-edge flex items-center gap-2 rounded-full px-5 py-2 transition-all ${
              filter === "latest"
                ? "bg-hell-red/10 text-hell-red shadow-[0_0_20px_rgba(255,60,0,0.15)]"
                : "bg-hell-black/30 text-hell-white/55 hover:text-hell-white"
            }`}
          >
            <ArrowUpDown size={16} /> LATEST
          </button>
          <button
            onClick={() => setFilter("top")}
            className={`hk-ember-edge flex items-center gap-2 rounded-full px-5 py-2 transition-all ${
              filter === "top"
                ? "bg-hell-red/10 text-hell-red shadow-[0_0_20px_rgba(255,60,0,0.15)]"
                : "bg-hell-black/30 text-hell-white/55 hover:text-hell-white"
            }`}
          >
            <Filter size={16} /> MOST RESPECTS
          </button>
        </div>

        {/* --- THE ARCHIVES BOX --- */}
        <div className="hk-ember-edge hk-noise overflow-hidden rounded-2xl bg-hell-black/40 shadow-ember">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 border-b border-hell-red/15 bg-[linear-gradient(180deg,rgba(10,10,10,0.85),rgba(5,5,5,0.65))] px-6 py-4 font-terminal text-sm uppercase tracking-[0.35em] text-hell-gold">
            <div className="col-span-3 md:col-span-2">ID</div>
            <div className="col-span-6 md:col-span-8">Identity</div>
            <div className="col-span-3 text-right md:col-span-2">Loss</div>
          </div>

          {/* --- SCROLLABLE LIST --- */}
          {/* FIX: Added scroll lock logic. 'overflow-hidden' by default, 'overflow-y-auto' on click. */}
          <div
            className={`scrollbar-thin scrollbar-thumb-hell-red/30 scrollbar-track-hell-black h-[400px] transition-all ${
              isScrollable ? "overflow-y-auto" : "overflow-hidden"
            }`}
            tabIndex={0}
            onClick={() => setIsScrollable(true)} // Unlock on click/tap
            onFocusCapture={() => setIsScrollable(true)} // Unlock for keyboard users
            onBlurCapture={(e) => {
              const next = e.relatedTarget as Node | null;
              if (next && e.currentTarget.contains(next)) return;
              setIsScrollable(false);
            }}
            onMouseLeave={() => setIsScrollable(false)} // Re-lock on mouse leave (Desktop UX)
          >
            {sortedSinners.map((sinner) => {
              const isPaid = respectsPaid[sinner.id];
              const count = respectCounts[sinner.id] || sinner.initialRespects;
              const isOpen = expandedId === sinner.id;

              return (
                <div
                  key={sinner.id}
                  className={`border-b border-hell-white/5 transition-colors duration-200 ${
                    isOpen ? "bg-hell-red/10" : "hover:bg-hell-black/20"
                  }`}
                >
                  {/* Clickable Header Row */}
                  <div
                    onClick={() => toggleRow(sinner.id)}
                    className="group grid cursor-pointer grid-cols-12 items-center gap-4 p-4 md:px-6"
                  >
                    <div className="col-span-3 font-terminal text-lg font-bold text-hell-red md:col-span-2">
                      {sinner.id}
                    </div>
                    <div className="col-span-6 truncate font-gothic text-xl text-hell-white transition-colors group-hover:text-white md:col-span-8 md:text-2xl">
                      {sinner.name}
                    </div>
                    <div className="col-span-3 text-right font-terminal text-hell-white/70 md:col-span-2">
                      {sinner.pnl}
                    </div>
                  </div>

                  {/* Expandable Content (Smoother Animation) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-6 md:px-6 md:pb-6">
                          <div className="mt-2 grid grid-cols-1 gap-6 border-t border-hell-red/10 pt-4 md:grid-cols-12">
                            <div className="md:col-span-9">
                              <p className="font-terminal text-lg italic leading-relaxed text-hell-white/75">
                                &ldquo;{sinner.quote}&rdquo;
                              </p>
                            </div>

                            <div className="flex items-end justify-end md:col-span-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePayRespect(sinner.id);
                                }}
                                disabled={isPaid}
                                className={`hk-ember-edge flex w-full items-center justify-center gap-2 rounded-full px-6 py-2 font-terminal text-sm font-bold transition-all active:scale-95 md:w-auto ${
                                  isPaid
                                    ? "cursor-default bg-hell-red/10 text-hell-red"
                                    : "bg-hell-white text-hell-black hover:bg-hell-white/80"
                                } `}
                              >
                                {isPaid ? "RESPECT PAID" : "PAY RESPECTS"}
                                <span className="ml-1 font-normal opacity-60">({count})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- CONFESS PRANK SECTION --- */}
      {/* FIX: Removed <p> question and reduced margin to mt-6 to bring it closer */}
      <div className="mx-auto mt-6 max-w-2xl px-4 text-center">
        <button
          onClick={handleConfess}
          className="hk-ember-edge group relative inline-flex items-center gap-3 rounded-full bg-hell-black/35 px-9 py-4 font-gothic text-2xl text-hell-red shadow-ember transition-all hover:bg-hell-red hover:text-white active:scale-95"
        >
          <AlertTriangle size={24} />
          CONFESS YOUR LOSSES
        </button>

        {/* PRANK ERROR MESSAGE */}
        <AnimatePresence>
          {prankError && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="hk-noise fixed bottom-10 right-4 z-[101] max-w-sm border border-hell-black bg-hell-red p-6 text-left font-terminal text-xl text-hell-white shadow-deep md:right-10 md:max-w-md"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle size={32} className="mt-1 shrink-0 text-hell-gold" />
                <div>
                  <strong className="mb-1 block font-gothic text-2xl">NICE TRY.</strong>
                  {prankError}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
