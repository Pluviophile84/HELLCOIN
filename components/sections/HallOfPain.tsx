"use client";
import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Filter, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section id="hall-of-pain" className="py-32 bg-hell-dark overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 mb-12">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <span className="font-terminal text-hell-gold text-xl md:text-2xl tracking-widest uppercase">
            PROOF OF SUFFERING
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            HALL OF PAIN
          </h2>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex justify-end gap-4 mb-4 font-terminal text-sm md:text-base">
          <button
            onClick={() => setFilter("latest")}
            className={`flex items-center gap-2 px-4 py-2 border ${
              filter === "latest"
                ? "border-hell-red text-hell-red bg-hell-red/10"
                : "border-hell-white/10 text-hell-white/50 hover:text-hell-white"
            }`}
          >
            <ArrowUpDown size={16} /> LATEST
          </button>
          <button
            onClick={() => setFilter("top")}
            className={`flex items-center gap-2 px-4 py-2 border ${
              filter === "top"
                ? "border-hell-red text-hell-red bg-hell-red/10"
                : "border-hell-white/10 text-hell-white/50 hover:text-hell-white"
            }`}
          >
            <Filter size={16} /> MOST RESPECTS
          </button>
        </div>

        {/* --- THE ARCHIVES BOX --- */}
        <div className="border border-hell-white/10 bg-hell-black">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-hell-gold font-terminal text-sm tracking-widest uppercase border-b border-hell-white/10 bg-hell-dark">
            <div className="col-span-3 md:col-span-2">ID</div>
            <div className="col-span-6 md:col-span-8">Identity</div>
            <div className="col-span-3 md:col-span-2 text-right">Loss</div>
          </div>

          {/* --- SCROLLABLE LIST --- */}
          {/* FIX: Added scroll lock logic. 'overflow-hidden' by default, 'overflow-y-auto' on click. */}
          <div
            className={`h-[400px] scrollbar-thin scrollbar-thumb-hell-red/30 scrollbar-track-hell-black transition-all ${
              isScrollable ? "overflow-y-auto" : "overflow-hidden"
            }`}
            onClick={() => setIsScrollable(true)} // Unlock on click
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
                    isOpen ? "bg-hell-red/10" : "hover:bg-hell-black/30"
                  }`}
                >
                  {/* Clickable Header Row */}
                  <div
                    onClick={() => toggleRow(sinner.id)}
                    className="p-4 md:px-6 grid grid-cols-12 gap-4 items-center cursor-pointer group"
                  >
                    <div className="col-span-3 md:col-span-2 font-terminal text-hell-red text-lg font-bold">
                      {sinner.id}
                    </div>
                    <div className="col-span-6 md:col-span-8 font-gothic text-xl md:text-2xl text-hell-white truncate group-hover:text-white transition-colors">
                      {sinner.name}
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right font-terminal text-hell-white/70">
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
                          <div className="border-t border-hell-red/10 pt-4 mt-2 grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-9">
                              <p className="font-terminal text-lg text-hell-white/70 italic leading-relaxed">
                                "{sinner.quote}"
                              </p>
                            </div>

                            <div className="md:col-span-3 flex items-end justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePayRespect(sinner.id);
                                }}
                                disabled={isPaid}
                                className={`
                                   w-full md:w-auto py-2 px-6 font-terminal text-sm font-bold border transition-all active:scale-95 flex items-center justify-center gap-2
                                   ${
                                     isPaid
                                       ? "bg-hell-red/10 border-hell-red text-hell-red cursor-default"
                                       : "bg-hell-white text-hell-black border-hell-white hover:bg-hell-white/80"
                                   }
                                 `}
                              >
                                {isPaid ? "RESPECT PAID" : "PAY RESPECTS"}
                                <span className="opacity-60 font-normal ml-1">({count})</span>
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
      <div className="max-w-2xl mx-auto mt-6 px-4 text-center">
        <button
          onClick={handleConfess}
          className="group relative inline-flex items-center gap-2 px-8 py-3 bg-hell-black border-2 border-hell-red text-hell-red font-gothic text-2xl hover:bg-hell-red hover:text-white transition-all active:scale-95"
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
              className="fixed bottom-10 right-4 md:right-10 bg-hell-red text-hell-white font-terminal text-xl p-6 border-4 border-hell-black shadow-[10px_10px_0px_#000] z-[101] animate-bounce max-w-sm md:max-w-md text-left"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle size={32} className="text-hell-gold shrink-0 mt-1" />
                <div>
                  <strong className="block text-2xl font-gothic mb-1">NICE TRY.</strong>
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
