"use client";
import { useState, useEffect } from "react";
import { Skull, AlertTriangle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sinners = [
  { id: "#0001", name: "Sinner #420", pnl: "-99%", quote: "I watched a YouTube video called 'Next 1000x Gem.' The guy had his mouth open in the thumbnail, so I trusted him.", initialRespects: 420 },
  { id: "#0002", name: "BagHolder_666", pnl: "Divorced", quote: "My wife thinks we are saving for a house. I am actually 50x leveraged long on a token called 'ElonSperm'.", initialRespects: 666 },
  { id: "#0003", name: "Wagie_007", pnl: "-$12,000", quote: "I market-bought the top. It immediately tanked 40%. I panic-sold the bottom. It immediately pumped 80%.", initialRespects: 1337 },
  { id: "#0004", name: "SafeMoon_Vet", pnl: "Soul Sold", quote: "My cousin bought 'HarryPotterObamaSonic' yesterday and just bought a Porsche. I hate this simulation.", initialRespects: 999 },
];

export const HallOfPain = () => {
  // State to track which cards have been clicked
  const [respectsPaid, setRespectsPaid] = useState<Record<string, boolean>>({});
  // State to track the counts (simulated live data)
  const [respectCounts, setRespectCounts] = useState<Record<string, number>>({});
  // State for the Prank Message
  const [prankError, setPrankError] = useState<string | null>(null);

  // Initialize counts and check local storage
  useEffect(() => {
    // 1. Initialize Counts
    const initialCounts: Record<string, number> = {};
    sinners.forEach(s => initialCounts[s.id] = s.initialRespects);
    setRespectCounts(initialCounts);

    // 2. Check if user already paid respect
    const saved = localStorage.getItem("hellcoin_respects");
    if (saved) {
      setRespectsPaid(JSON.parse(saved));
    }
  }, []);

  const handlePayRespect = (id: string) => {
    if (respectsPaid[id]) return; // Prevent double clicking

    // Mark as paid
    const newState = { ...respectsPaid, [id]: true };
    setRespectsPaid(newState);
    localStorage.setItem("hellcoin_respects", JSON.stringify(newState));

    // Increment count visually
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
    // Pick a random insult
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    setPrankError(randomError);
    
    // Hide after 4 seconds
    setTimeout(() => setPrankError(null), 4000);
  };

  return (
    <section id="hall-of-pain" className="py-32 bg-hell-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            /// PROOF_OF_SUFFERING ///
          </span>

          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            HALL OF PAIN
          </h2>
        </div>

      </div>

      {/* --- CARDS CONTAINER --- */}
      <div className="flex gap-6 px-4 overflow-x-auto pb-8 snap-x md:justify-center">
        {sinners.map((sinner, i) => {
          const isPaid = respectsPaid[sinner.id];
          const count = respectCounts[sinner.id] || sinner.initialRespects;

          return (
            <div 
              key={i} 
              className="flex-none w-[350px] md:w-[450px] bg-hell-black border border-gray-800 p-8 snap-center hover:border-hell-red transition-colors group relative flex flex-col"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                <span className="font-terminal text-hell-red text-xl">{sinner.id}</span>
                <span className="font-terminal text-gray-500">ID VERIFIED</span>
              </div>
              
              {/* Stats */}
              <div className="mb-6">
                 <h4 className="font-gothic text-3xl text-hell-white">{sinner.name}</h4>
                 <p className="font-terminal text-red-500 text-xl mt-1">REALIZED PNL: {sinner.pnl}</p>
              </div>

              {/* Quote */}
              <p className="font-terminal text-lg text-gray-400 italic mb-8 flex-grow">
                "{sinner.quote}"
              </p>

              {/* Action Button */}
              <button 
                onClick={() => handlePayRespect(sinner.id)}
                disabled={isPaid}
                className={`
                  w-full py-3 font-terminal transition-all flex items-center justify-center gap-2 border mt-auto
                  ${isPaid 
                    ? "bg-hell-red/20 border-hell-red text-hell-red cursor-default" 
                    : "border-hell-white/20 text-hell-white hover:bg-hell-white hover:text-black active:scale-95 cursor-pointer"
                  }
                `}
              >
                {isPaid ? (
                  <span className="animate-pulse">RESPECT PAID ({count})</span>
                ) : (
                  <>
                    <Skull size={18} /> PAY RESPECTS ({count})
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* --- CONFESS PRANK SECTION --- */}
      <div className="max-w-2xl mx-auto mt-20 px-4 text-center">
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

        {/* PRANK ERROR MESSAGE (FIXED POSITON) */}
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
