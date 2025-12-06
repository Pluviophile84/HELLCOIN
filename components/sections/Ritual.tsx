"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export const Ritual = () => {
  const [copied, setCopied] = useState(false);
  
  // REPLACE THIS WITH YOUR REAL CONTRACT ADDRESS
  const CONTRACT_ADDRESS = "0x666...INSERT_REAL_CA_HERE...666";

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { num: "01", title: "PREPARE THE VESSEL", text: "Download Phantom or Jupiter wallet. This will be your wallet for the afterlife." },
    { num: "02", title: "GATHER THE OFFERING", text: "Acquire some SOL. You cannot enter the pit empty-handed." },
    { num: "03", title: "ENTER THE ALTAR", text: "Go to pump.fun or jupiter.ag. Connect your wallet. Do not look back." },
    { num: "04", title: "ACCEPT YOUR FATE", text: "Paste the Contract Address below. Swap your boring coins for eternal glory." },
  ];

  return (
    <section id="ritual" className="py-32 bg-hell-black overflow-hidden relative">
      
      {/* BACKGROUND: THE PENTAGRAM */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <svg 
          viewBox="0 0 100 100" 
          className="w-[180vw] h-[180vw] md:w-[1000px] md:h-[1000px] animate-spin-slow text-hell-red"
          style={{ opacity: 0.05, animationDuration: '60s' }}
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 2 L79 90 L2 35 L98 35 L21 90 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24 flex flex-col items-center gap-2">
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            INITIATION SEQUENCE
          </span>
          
          <h2 className="font-gothic text-6xl md:text-8xl text-center text-hell-white">
            THE <span className="text-hell-red">RITUAL</span>
          </h2>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex gap-6 items-start group"
            >
              {/* FIX: Number is now always bright red (text-hell-red) */}
              <span className="font-gothic text-8xl text-hell-red transition-colors leading-none shrink-0">
                {step.num}
              </span>
              <div>
                {/* FIX: Reduced title size (text-xl md:text-2xl) and added group-hover border brightness */}
                <h3 className="font-terminal text-xl md:text-2xl text-hell-gold mb-2 uppercase font-semibold border-b border-hell-red/30 group-hover:border-hell-red pb-2 inline-block transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-terminal text-xl text-gray-400 max-w-sm">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CONTRACT BOX */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
             <span className="font-terminal text-hell-red text-xl bg-hell-red/10 px-4 py-1 border border-hell-red/20 rounded animate-pulse">
              CONTRACT ADDRESS
             </span>
          </div>
          <div className="bg-black border-2 border-hell-red p-2 md:p-4 rounded flex flex-col md:flex-row items-center gap-4 shadow-[0_0_30px_rgba(204,0,0,0.2)]">
            <div className="flex-1 w-full bg-hell-dark/50 p-4 rounded border border-gray-800 font-terminal text-xl md:text-2xl text-gray-300 break-all text-center md:text-left">
              {CONTRACT_ADDRESS}
            </div>
            <button onClick={handleCopy} className="w-full md:w-auto min-w-[180px] bg-hell-red hover:bg-hell-orange text-white font-bold py-4 px-8 rounded flex items-center justify-center gap-2 transition-all active:scale-95">
              {copied ? <Check size={24} /> : <Copy size={24} />}
              {copied ? "COPIED!" : "COPY CA"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
