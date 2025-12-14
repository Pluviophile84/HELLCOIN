"use client";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Filter, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sinners = [
  { id: "#0001", name: "Sinner #420", pnl: "-99%", quote: "...en in the thumbnail, so I trusted him.", initialRespects: 420 },
  { id: "#0002", name: "BagHolder_666", pnl: "Divorced", quote: "I bought a token called 'WIFEY'. It rugpulled and she left me.", initialRespects: 666 },
  { id: "#0003", name: "Wagie_007", pnl: "-$12,000", quote: "I sold the bottom. It immediately pumped 80%.", initialRespects: 1337 },
  { id: "#0004", name: "SafeMoon_Vet", pnl: "Soul Sold", quote: "I held through 9 rugs. The dev bought a Porsche. I hate this simulation.", initialRespects: 999 },
  { id: "#0005", name: "Alpha_Hunter", pnl: "-$45,000", quote: "The chart said 'perfect entry'. It went to zero in 4 minutes.", initialRespects: 777 },
  { id: "#0006", name: "Leverage_King", pnl: "Liqui-dated", quote: "I got liquidated on a stablecoin. I don't want to talk about it.", initialRespects: 69 },
  { id: "#0007", name: "NFT_Collector", pnl: "Jpeg'd", quote: "I paid 2 ETH for a monkey. Now the monkey looks like it's judging me.", initialRespects: 8008 },
  { id: "#0008", name: "Seed_Phrase_Guy", pnl: "Hacked", quote: "I clicked a link. Now my wallet is synced to his bank account.", initialRespects: 0 },
];

export const HallOfPain = () => {
  const [respectsPaid, setRespectsPaid] = useState<Record<string, boolean>>({});
  const [respectCounts, setRespectCounts] = useState<Record<string, number>>({});
  const [prankError, setPrankError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"latest" | "top">("latest");

  // FIX: State to control scroll locking
  const [isScrollable, setIsScrollable] = useState(false);

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
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
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
            className={`flex items-center gap-2 px-4 py-2 border border-hell-red/30 transition-all ${
              filter === "latest" ? "bg-hell-red/20 text-hell-white" : "bg-black/40 text-gray-400 hover:text-hell-white"
            }`}
          >
            <ArrowUpDown size={16} />
            LATEST
          </button>
          <button
            onClick={() => setFilter("top")}
            className={`flex items-center gap-2 px-4 py-2 border border-hell-red/30 transition-all ${
              filter === "top" ? "bg-hell-red/20 text-hell-white" : "bg-black/40 text-gray-400 hover:text-hell-white"
            }`}
          >
            <Filter size={16} />
            TOP
          </button>
        </div>

        {/* --- TABLE --- */}
        <div className="border border-hell-red/20 bg-black/40 shadow-[0_0_40px_rgba(204,0,0,0.10)]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 px-4 py-4 border-b border-hell-red/10 font-terminal text-gray-400 uppercase tracking-widest text-xs md:text-sm">
            <div className="col-span-3 md:col-span-2">ID</div>
            <div className="col-span-6 md:col-span-8">SINNER</div>
            <div className="col-span-3 md:col-span-2 text-right">P&L</div>
          </div>

          {/* Rows */}
          <div
            className={`max-h-[520px] ${isScrollable ? "overflow-y-auto" : "overflow-hidden"}`}
            onMouseEnter={() => setIsScrollable(true)}
            onMouseLeave={() => setIsScrollable(false)}
          >
            {sortedSinners.map((sinner) => {
              const isOpen = expandedId === sinner.id;
              const respects = respectCounts[sinner.id] ?? sinner.initialRespects;

              return (
                <div
                  key={sinner.id}
                  onClick={() => toggleRow(sinner.id)}
                  className="border-b border-hell-red/10 cursor-pointer hover:bg-hell-red/5 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-2 px-4 py-5 md:px-6 md:py-6 items-center">
                    <div className="col-span-3 md:col-span-2 font-terminal text-gray-400">
                      {sinner.id}
                    </div>
                    <div className="col-span-6 md:col-span-8 font-gothic text-2xl md:text-3xl text-hell-white">
                      <div className="flex items-center justify-between gap-4">
                        <span className="truncate">{sinner.name}</span>
                        <span className="font-terminal text-xs md:text-sm text-gray-500 whitespace-nowrap">
                          RESPECTS: <span className="text-hell-orange">{respects}</span>
                        </span>
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right font-terminal text-gray-400">
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
                              <p className="font-terminal text-lg text-gray-400 italic leading-relaxed">
                                "{sinner.quote}"
                              </p>
                            </div>

                            <div className="md:col-span-3 flex items-end justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePayRespect(sinner.id);
                                }}
                                disabled={respectsPaid[sinner.id]}
                                className={`w-full md:w-auto px-6 py-3 font-gothic text-2xl border transition-all active:scale-95 ${
                                  respectsPaid[sinner.id]
                                    ? "bg-hell-dark border-hell-red/20 text-gray-500 cursor-not-allowed"
                                    : "bg-transparent border-hell-red text-hell-red hover:bg-hell-red hover:text-hell-white"
                                }`}
                              >
                                {respectsPaid[sinner.id] ? "PAID" : "PAY RESPECTS"}
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

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleConfess}
            className="flex items-center gap-3 bg-transparent border-2 border-hell-red text-hell-red hover:bg-hell-red hover:text-hell-white font-gothic text-3xl px-10 py-5 uppercase transition-all active:scale-95"
          >
            <AlertTriangle size={24} />
            CONFESS YOUR LOSSES
          </button>
        </div>

        {/* PRANK ERROR MESSAGE */}
        <AnimatePresence>
          {prankError && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-10 right-4 md:right-10 bg-hell-red text-hell-white p-6 border-2 border-black shadow-[10px_10px_0px_#000] z-[101] animate-bounce max-w-sm md:max-w-md text-left"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle size={28} className="text-yellow-400 mt-1 shrink-0" />
                <div className="font-terminal text-sm md:text-base leading-relaxed">
                  <strong className="block font-gothic text-2xl mb-1">CONFESSION FAILED.</strong>
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
