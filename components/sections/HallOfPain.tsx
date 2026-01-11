"use client";

import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Filter, ArrowUpDown, Skull, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { expandVariants, toastVariants } from "@/lib/animations";

type Sinner = {
  id: string;
  name: string;
  pnl: string;
  quote: string;
  initialRespects: number;
};

const sinners: Sinner[] = [
  {
    id: "#0001",
    name: "Sinner #420",
    pnl: "-99%",
    quote:
      'I watched a YouTube video called "Next 1000x Gem." The guy had his mouth open in the thumbnail, so I trusted him.',
    initialRespects: 420,
  },
  {
    id: "#0002",
    name: "BagHolder_666",
    pnl: "Divorced",
    quote:
      'My wife thinks we are saving for a house. I am actually 50x leveraged long on a token called "ElonSperm".',
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
      'My cousin bought "HarryPotterObamaSonic" yesterday and just bought a Porsche. I hate this simulation.',
    initialRespects: 999,
  },
  {
    id: "#0005",
    name: "Alpha_Hunter",
    pnl: "-$45,000",
    quote:
      'I joined a "VIP Alpha Group" for 2 ETH. They told me to buy a coin named after a bacterial infection. It went to zero in 4 minutes.',
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
      'A "Support Agent" DM\'d me to sync my wallet. He seemed very polite. Now my wallet is synced to his bank account.',
    initialRespects: 0,
  },
  {
    id: "#0009",
    name: "DYOR_Master",
    pnl: "-$78,000",
    quote:
      "I did my own research. It consisted of reading the first three words of the whitepaper and checking if the Telegram had emojis.",
    initialRespects: 2077,
  },
  {
    id: "#0010",
    name: "Paper_Hands_Pete",
    pnl: "Eternal Regret",
    quote:
      "I sold my Bitcoin at $200 in 2015 to buy a gaming PC. That PC is now worth $50. That Bitcoin is now worth a house.",
    initialRespects: 50000,
  },
  {
    id: "#0011",
    name: "Rug_Survivor",
    pnl: "-$23,000",
    quote:
      "The dev said he was 'stepping back for personal reasons.' His personal reason was my $23,000 in his wallet.",
    initialRespects: 1111,
  },
  {
    id: "#0012",
    name: "Gas_Fee_Victim",
    pnl: "-$800 (in fees)",
    quote:
      "I spent $800 in gas fees to buy $50 worth of a token. The token is now worth $3. The gas fees are still $800.",
    initialRespects: 5555,
  },
  {
    id: "#0013",
    name: "Airdrop_Andy",
    pnl: "Identity Stolen",
    quote:
      "I connected my wallet to 47 fake airdrop sites looking for free money. I found it. It was leaving my wallet.",
    initialRespects: 404,
  },
  {
    id: "#0014",
    name: "Diamond_Hands_Dave",
    pnl: "-$150,000",
    quote:
      "I held through the dip. And the dip after that. And the delisting. And the SEC investigation. I'm still holding.",
    initialRespects: 3333,
  },
  {
    id: "#0015",
    name: "Influencer_Truther",
    pnl: "Blocked",
    quote:
      "I bought every coin my favorite influencer promoted. He made millions. I made a GoFundMe. He blocked me when I asked for help.",
    initialRespects: 6969,
  },
  {
    id: "#0016",
    name: "FOMO_Frank",
    pnl: "-$33,000",
    quote:
      "I saw a coin pump 10,000% in an hour. I thought 'I'm early.' I was not early. I was the exit liquidity.",
    initialRespects: 7777,
  },
];

export const HallOfPain = () => {
  const [respectsPaid, setRespectsPaid] = useState<Record<string, boolean>>({});
  const [respectCounts, setRespectCounts] = useState<Record<string, number>>({});
  const [prankError, setPrankError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"latest" | "top">("latest");
  const [isScrollable, setIsScrollable] = useState(false);
  const prankTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    sinners.forEach((s) => (initialCounts[s.id] = s.initialRespects));
    setRespectCounts(initialCounts);

    const saved = localStorage.getItem("hellcoin_respects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") setRespectsPaid(parsed);
      } catch {
        // Corrupted localStorage value; ignore and continue with defaults.
      }
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
      [id]: (prev[id] ?? 0) + 1,
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

  const sortedSinners = [...sinners].sort((a, b) => {
    if (filter === "top") {
      const countA = respectCounts[a.id] || a.initialRespects;
      const countB = respectCounts[b.id] || b.initialRespects;
      return countB - countA;
    }
    return b.id.localeCompare(a.id);
  });

  return (
    <section id="hall-of-pain" className="cave-texture relative bg-obsidian-900 py-32">
      <div className="mx-auto mb-12 max-w-6xl px-4 3xl:max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <SectionKicker>PROOF OF SUFFERING</SectionKicker>
          <h2 className="font-heading text-5xl font-black text-lava-50 md:text-6xl 3xl:text-7xl">
            HALL OF <span className="hellfire-text-pure pr-1">PAIN</span>
          </h2>
          <p className="max-w-xl font-body text-lg text-lava-100/60">
            A monument to poor decisions. Press F to pay respects.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-3 sm:justify-end">
          <button
            onClick={() => setFilter("latest")}
            className={`flex items-center gap-2 rounded-lg border-3 border-black px-4 py-2 font-body text-sm font-bold shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-900 ${
              filter === "latest"
                ? "hellfire-bg text-white"
                : "bg-obsidian-800 text-lava-100/50 hover:text-lava-100 hover:shadow-[0_0_1.25rem_rgba(255,85,0,0.5)]"
            }`}
          >
            <ArrowUpDown size={16} /> LATEST
          </button>
          <button
            onClick={() => setFilter("top")}
            className={`flex items-center gap-2 rounded-lg border-3 border-black px-4 py-2 font-body text-sm font-bold shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-900 ${
              filter === "top"
                ? "hellfire-bg text-white"
                : "bg-obsidian-800 text-lava-100/50 hover:text-lava-100 hover:shadow-[0_0_1.25rem_rgba(255,85,0,0.5)]"
            }`}
          >
            <Filter size={16} /> MOST RESPECTS
          </button>
        </div>

        {/* Main Container */}
        <div className="overflow-hidden rounded-xl hc-border-3 border-black bg-obsidian-800 shadow-brutal transition-all duration-300 hover:shadow-[0_0_2.5rem_rgba(255,85,0,0.4)]">
          {/* Table Header - Desktop */}
          <div className="hidden border-b-3 border-black bg-obsidian-950 px-6 py-4 sm:grid sm:grid-cols-12 sm:gap-4">
            <div className="col-span-2 font-body text-xs font-bold uppercase tracking-widest text-gold">
              Victim ID
            </div>
            <div className="col-span-6 font-body text-xs font-bold uppercase tracking-widest text-gold">
              Identity
            </div>
            <div className="col-span-2 font-body text-xs font-bold uppercase tracking-widest text-gold">
              Damage
            </div>
            <div className="col-span-2 text-right font-body text-xs font-bold uppercase tracking-widest text-gold">
              Respects
            </div>
          </div>

          {/* Mobile Header */}
          <div className="border-b-3 border-black bg-obsidian-950 px-4 py-3 sm:hidden">
            <p className="text-center font-body text-xs font-bold uppercase tracking-widest text-gold">
              Tap a victim to reveal their sin
            </p>
          </div>

          {/* Scrollable Container */}
          <div
            role="region"
            aria-label="Hall of Pain victim list"
            className={`max-h-[31.25rem] transition-all ${
              isScrollable ? "overflow-y-auto" : "overflow-hidden"
            }`}
            tabIndex={0}
            onClick={() => setIsScrollable(true)}
            onFocusCapture={() => setIsScrollable(true)}
            onBlurCapture={(e) => {
              const next = e.relatedTarget as Node | null;
              if (next && e.currentTarget.contains(next)) return;
              setIsScrollable(false);
            }}
            onMouseLeave={() => setIsScrollable(false)}
          >
            {sortedSinners.map((sinner) => {
              const isPaid = respectsPaid[sinner.id];
              const count = respectCounts[sinner.id] || sinner.initialRespects;
              const isOpen = expandedId === sinner.id;

              return (
                <div
                  key={sinner.id}
                  className={`border-b border-obsidian-900/50 transition-colors duration-200 ${
                    isOpen ? "bg-lava-500/10" : "hover:bg-obsidian-900/30"
                  }`}
                >
                  {/* Row - Clickable Header */}
                  <button
                    onClick={() => toggleRow(sinner.id)}
                    className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Collapse' : 'Expand'} details for ${sinner.name}`}
                  >
                    {/* Desktop Layout */}
                    <div className="hidden sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 sm:px-6 sm:py-4">
                      <div className="col-span-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-hellfire-orange/30 bg-obsidian-950">
                          <Skull size={14} className="text-hellfire-orange" />
                        </div>
                        <span className="font-body text-sm font-bold text-hellfire-orange">
                          {sinner.id}
                        </span>
                      </div>
                      <div className="col-span-6 font-body text-xl font-bold text-lava-50 transition-colors group-hover:text-white">
                        {sinner.name}
                      </div>
                      <div className="col-span-2">
                        <span className="inline-block rounded-lg bg-red-500/20 px-3 py-1 font-body text-sm font-bold text-red-400">
                          {sinner.pnl}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-2">
                        <span className="font-body text-sm text-lava-100/50">{count} F&apos;s</span>
                        <ChevronDown
                          size={18}
                          className={`text-lava-100/30 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="flex items-center justify-between gap-3 px-4 py-4 sm:hidden">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-hellfire-orange/30 bg-obsidian-950">
                          <Skull size={18} className="text-hellfire-orange" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-body text-lg font-bold text-lava-50">
                            {sinner.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-body text-xs text-hellfire-orange">
                              {sinner.id}
                            </span>
                            <span className="font-body text-xs font-bold text-red-400">
                              {sinner.pnl}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-xs text-lava-100/50">{count}</span>
                        <ChevronDown
                          size={18}
                          className={`text-lava-100/30 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={reduceMotion ? undefined : expandVariants}
                        initial={reduceMotion ? undefined : "hidden"}
                        animate={reduceMotion ? undefined : "show"}
                        exit={reduceMotion ? undefined : "hidden"}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                          <div className="rounded-xl border-2 border-hellfire-orange/20 bg-obsidian-950/50 p-4 sm:p-5">
                            {/* Quote Section */}
                            <div className="mb-4">
                              <p className="mb-2 font-body text-xs font-bold uppercase tracking-widest text-hellfire-orange">
                                The Confession
                              </p>
                              <p className="font-body text-base italic leading-relaxed text-lava-100/80 sm:text-lg">
                                &ldquo;{sinner.quote}&rdquo;
                              </p>
                            </div>

                            {/* Action Row */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <p className="font-body text-sm text-lava-100/40">
                                {count.toLocaleString()} sinners have paid their respects
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePayRespect(sinner.id);
                                }}
                                disabled={isPaid}
                                className={`flex w-full items-center justify-center gap-2 rounded-lg border-3 border-black px-6 py-2.5 font-body text-sm font-bold shadow-brutal-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 sm:w-auto ${
                                  isPaid
                                    ? "cursor-default border-hellfire-orange/30 bg-lava-500/20 text-hellfire-orange"
                                    : "bg-gold text-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-95"
                                }`}
                              >
                                {isPaid ? (
                                  <>
                                    <span>✓</span> RESPECT PAID
                                  </>
                                ) : (
                                  <>
                                    <span className="text-lg">F</span> PAY RESPECTS
                                  </>
                                )}
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

          {/* Scroll Hint */}
          <div className="border-t-3 border-black bg-obsidian-950/50 px-4 py-2 text-center">
            <p className="font-body text-xs text-lava-100/30">
              {isScrollable ? "Scroll to see more victims" : "Click to enable scrolling"}
            </p>
          </div>
        </div>
      </div>

      {/* Confess Button */}
      <div className="mx-auto mt-8 max-w-2xl px-4 text-center">
        <button
          onClick={handleConfess}
          disabled={!!prankError}
          className={`hover:hellfire-bg group relative inline-flex items-center gap-2 rounded-xl hc-border-3 border-black bg-obsidian-800 px-8 py-3 font-heading text-xl text-hellfire-orange shadow-brutal transition-all hover:translate-x-1 hover:translate-y-1 hover:text-white hover:shadow-[0_0_1.875rem_rgba(255,85,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-900 active:scale-95 sm:text-2xl ${
            prankError
              ? "cursor-not-allowed opacity-50 hover:translate-x-0 hover:translate-y-0 hover:bg-obsidian-800 hover:text-hellfire-orange hover:shadow-brutal"
              : ""
          }`}
        >
          <AlertTriangle size={24} />
          CONFESS YOUR SINS
        </button>

        {/* Error Toast */}
        <AnimatePresence>
          {prankError && (
            <motion.div
              variants={reduceMotion ? undefined : toastVariants}
              initial={reduceMotion ? { opacity: 1 } : "hidden"}
              animate={reduceMotion ? { opacity: 1 } : "show"}
              exit={reduceMotion ? { opacity: 0 } : "exit"}
              className="hellfire-bg fixed bottom-10 left-4 right-4 z-[101] mx-auto max-w-sm animate-bounce rounded-xl border-3 border-black p-6 text-left font-body text-xl text-white shadow-brutal motion-reduce:animate-none lg:left-auto lg:right-6 lg:mx-0"
              role="alert"
            >
              <div className="flex items-center gap-4">
                <AlertTriangle size={32} className="shrink-0 text-gold" />
                <div>
                  <strong className="mb-1 block font-heading text-2xl">NICE TRY.</strong>
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
