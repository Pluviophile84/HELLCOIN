"use client";
import { useState, useEffect } from "react";
import { Skull, AlertTriangle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sinners = [
  { id: "#0001", name: "Sinner #420", pnl: "-99%", quote: "I watched a YouTube video called 'Next 1000x Gem.' The guy had his mouth open in the thumbnail, so I trusted him.", initialRespects: 420 },
  { id: "#0002", name: "BagHolder_666", pnl: "Divorced", quote: "My wife thinks we are saving for a house. I am actually 50x leveraged long on a token called 'ElonSperm'.", initialRespects: 666 },
  { id: "#0003", name: "Wagie_007", pnl: "-$12,000", quote: "I market-bought the top. It immediately tanked 40%. I panic-sold the bottom. It immediately pumped 80%.", initialRespects: 1337 },
  { id: "#0004", name: "SafeMoon_Vet", pnl: "Soul Sold", quote: "My cousin bought 'HarryPotterObamaSonic' yesterday and just bought a Porsche. I hate this simulation.", initialRespects: 999 },
  { id: "#0005", name: "Alpha_Hunter", pnl: "-$45,000", quote: "I joined a 'VIP Alpha Group' for 2 ETH. They told me to buy a coin named after a bacterial infection. It went to zero in 4 minutes.", initialRespects: 777 },
  { id: "#0006", name: "Leverage_King", pnl: "Liqui-dated", quote: "I saw a green candle on a 1-minute chart and felt invincible. I went 100x long on a stablecoin. I don't want to talk about it.", initialRespects: 69 },
  { id: "#0007", name: "NFT_Collector", pnl: "Jpeg'd", quote: "I sold my car to buy a picture of a monkey wearing a hat. The floor price is now 0.01 ETH and the monkey looks like it's judging me.", initialRespects: 8008 },
  { id: "#0008", name: "Seed_Phrase_Guy", pnl: "Hacked", quote: "A 'Support Agent' DM'd me to sync my wallet. He seemed very polite. Now my wallet is synced to his bank account.", initialRespects: 0 },
];

export const HallOfPain = () => {
  const [respectsPaid, setRespectsPaid] = useState<Record<string, boolean>>({});
  const [respectCounts, setRespectCounts] = useState<Record<string, number>>({});
  const [prankError, setPrankError] = useState<string | null>(null);
  // Track which row is currently expanded
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    sinners.forEach(s => initialCounts[s.id] = s.initialRespects);
    setRespectCounts(initialCounts);

    const saved = localStorage.getItem("hellcoin_respects");
    if (saved) {
      setRespectsPaid(JSON.parse(saved));
    }
  }, []);

  const handlePayRespect = (id: string) => {
    if (respectsPaid[id]) return; 

    const newState = { ...respectsPaid, [id]: true };
    setRespectsPaid(newState);
    localStorage.setItem("hellcoin_respects", JSON.stringify(newState));

    setRespectCounts(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleConfess = () => {
    const errors = [
      "NICE TRY. YOUR SINS ARE PERMANENT.",
      "ERROR: CONFESSION REJECTED. HOLD HARDER.",
      "SYSTEM MESSAGE: YOU CANNOT ESCAPE REALITY.",
      "ACCESS DENIED: YOUR BAGS ARE TOO HEAVY.",
      "FATAL ERROR: IRREVERSIBLE STUPIDITY DETECTED."
    ];
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    setPrankError(randomError);
    setTimeout(() => setPrankError(null), 4000);
  };

  return (
    <section id="hall-of-pain" className="py-32 bg-hell-dark overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 mb-16">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            PROOF OF SUFFERING
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            HALL OF PAIN
          </h2>
        </div>

        {/* --- THE ARCHIVES (Compact Accordion) --- */}
        <div className="flex flex-col gap-2">
          
          {/* Table Headers (Desktop Only) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 text-[#ffae00] font-terminal text-sm tracking-widest uppercase border-b border-gray-800 opacity-50 mb-2">
            <div className="col-span-3">Sinner ID</div>
            <div className="col-span-7">Identity</div>
            <div className="col-span-2 text-right">Loss</div>
          </div>

          {/* Accordion Rows */}
          {sinners.map((sinner, i) => {
            const isPaid = respectsPaid[sinner.id];
            const count = respectCounts[sinner.id] || sinner.initialRespects;
            const isOpen = expandedId === sinner.id;

            return (
              <div 
                key={i}
                onClick={() => toggleRow(sinner.id)}
                className={`
                  border transition-all duration-300 cursor-pointer relative overflow-hidden
                  ${isOpen 
                    ? "bg-hell-red/5 border-hell-red" 
                    : "bg-hell-black border-gray-800 hover:border-gray-600"
                  }
                `}
              >
                {/* SUMMARY ROW (Always Visible) */}
                <div className="p-4 grid grid-cols-12 gap-4 items-center">
                   {/* ID */}
                   <div className="col-span-4 md:col-span-3 font-terminal text-hell-red text-lg md:text-xl font-bold">
                     {sinner.id}
                   </div>
                   
                   {/* Name */}
                   <div className="col-span-5 md:col-span-7 font-gothic text-xl md:text-2xl text-gray-300 truncate">
                     {sinner.name}
                   </div>
                   
                   {/* PnL */}
                   <div className="col-span-3 md:col-span-2 text-right font-terminal text-gray-400">
                     {sinner.pnl}
                   </div>
                </div>

                {/* EXPANDED DETAILS */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-6 md:px-6 md:pb-6"
                    >
                      <div className="border-t border-hell-red/20 pt-4 mt-2 grid grid-cols-1 md:grid-cols-12 gap-6">
                         {/* Quote */}
                         <div className="md:col-span-9">
                           <p className="font-terminal text-lg text-gray-400 italic leading-relaxed">
                             "{sinner.quote}"
                           </p>
                         </div>
                         
                         {/* Action Button */}
                         <div className="md:col-span-3 flex items-end">
                           <button 
                             onClick={(e) => {
                               e.stopPropagation(); // Prevent toggling row when clicking button
                               handlePayRespect(sinner.id);
                             }}
                             disabled={isPaid}
                             className={`
                               w-full py-2 px-4 font-terminal text-sm font-bold border transition-all active:scale-95 flex items-center justify-center gap-2
                               ${isPaid 
                                 ? "bg-hell-red/10 border-hell-red text-hell-red cursor-default" 
                                 : "bg-white text-black border-white hover:bg-black hover:text-white hover:border-white"
                               }
                             `}
                           >
                             {isPaid ? "RESPECT PAID" : "PAY RESPECTS"}
                             <span className="opacity-50 font-normal">({count})</span>
                           </button>
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

      {/* --- CONFESS PRANK SECTION --- */}
      <div className="max-w-2xl mx-auto mt-24 px-4 text-center">
        <p className="font-terminal text-gray-500 mb-6 text-xl">
          Do you have sins to confess?
        </p>
        
        <button 
          onClick={handleConfess}
          className="group relative inline-flex items-center gap-2 px-8 py-3 bg-black border-2 border-hell-red text-hell-red font-gothic text-2xl hover:bg-hell-red hover:text-white transition-all active:scale-95"
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
              className="fixed bottom-10 right-4 md:right-10 bg-hell-red text-hell-white font-terminal text-xl p-6 border-4 border-black shadow-[10px_10px_0px_#000] z-[101] animate-bounce max-w-sm md:max-w-md text-left"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle size={32} className="text-yellow-400 shrink-0 mt-1" />
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
