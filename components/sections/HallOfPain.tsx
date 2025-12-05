"use client";
import { useState, useEffect } from "react";
import { Skull, AlertTriangle, XCircle } from "lucide-react";
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
          <span className="font-terminal text-[#ffae00] text-xl tracking-widest uppercase">
            PROOF OF SUFFERING
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            HALL OF PAIN
          </h2>
        </div>

        {/* --- THE LEDGER (Vertical List) --- */}
        <div className="flex flex-col gap-4">
          
          {/* Table Headers (Desktop Only) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 text-[#ffae00] font-terminal text-sm tracking-widest uppercase border-b border-gray-800 opacity-50">
            <div className="col-span-2">Sinner ID</div>
            <div className="col-span-6">The Confession</div>
            <div className="col-span-2 text-right">Loss</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Rows */}
          {sinners.map((sinner, i) => {
            const isPaid = respectsPaid[sinner.id];
            const count = respectCounts[sinner.id] || sinner.initialRespects;

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                // FIX: Desktop = Grid, Mobile = Flex Column
                className="bg-hell-black border border-gray-800 p-6 md:p-4 rounded-none hover:border-hell-red transition-all duration-300 group grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center"
              >
                
                {/* 1. ID & Name */}
                <div className="md:col-span-2 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start border-b md:border-b-0 border-gray-800 pb-4 md:pb-0 mb-2 md:mb-0">
                  <span className="font-terminal text-hell-red text-xl font-bold">{sinner.id}</span>
                  <span className="font-gothic text-xl text-gray-500 md:text-sm md:mt-1">{sinner.name}</span>
                </div>

                {/* 2. The Quote */}
                <div className="md:col-span-6">
                  <p className="font-terminal text-lg text-gray-300 italic leading-relaxed">
                    "{sinner.quote}"
                  </p>
                </div>

                {/* 3. PNL (Loss) */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                  <span className="md:hidden font-terminal text-gray-600 text-sm">TOTAL LOSS:</span>
                  <span className="font-terminal text-hell-red text-xl font-bold">{sinner.pnl}</span>
                </div>

                {/* 4. Action Button */}
                <div className="md:col-span-2 mt-4 md:mt-0">
                  <button 
                    onClick={() => handlePayRespect(sinner.id)}
                    disabled={isPaid}
                    className={`
                      w-full py-2 px-4 font-terminal text-sm font-bold border transition-all active:scale-95 flex items-center justify-center gap-2
                      ${isPaid 
                        ? "bg-hell-red/10 border-hell-red text-hell-red cursor-default" 
                        : "bg-transparent border-gray-600 text-gray-400 hover:border-white hover:text-white"
                      }
                    `}
                  >
                    {isPaid ? "RESPECT PAID" : "PAY RESPECTS"}
                    <span className="opacity-50 font-normal">({count})</span>
                  </button>
                </div>

              </motion.div>
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
