"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// The words that haunt every degen's dreams
const PTSD_WORDS = [
  "RUG", "DIP", "SCAM", "-99%", "LIQUIDATED", 
  "HONEYPOT", "HACKED", "PAUSED", "SOFT RUG", 
  "0", "NGMI", "COPE", "FUD", "GAS FEES", 
  "TOP SIGNAL", "REKT", "BAGHOLDER", "DOWN BAD"
];

// Helper to generate random positions for the ghosts
const generateGhosts = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    text: PTSD_WORDS[i % PTSD_WORDS.length],
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: Math.random() > 0.5 ? "text-4xl" : "text-6xl", // Random sizes
  }));
};

export const ThePit = () => {
  // Use state to avoid hydration mismatch (random numbers on server vs client)
  const [ghosts, setGhosts] = useState<any[]>([]);

  useEffect(() => {
    setGhosts(generateGhosts(30)); // Generate 30 haunting words
  }, []);

  return (
    <section className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[800px]">
      
      {/* --- BACKGROUND: THE HAUNTING PATTERN --- */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {ghosts.map((ghost) => (
          <motion.div
            key={ghost.id}
            className={`absolute font-gothic font-bold text-black/20 ${ghost.size}`}
            style={{ top: ghost.top, left: ghost.left }}
            animate={{ 
              opacity: [0, 0.4, 0], // Fade in then out
              scale: [0.8, 1.2, 0.8], // Pulse size
            }}
            transition={{
              duration: ghost.duration,
              repeat: Infinity,
              delay: ghost.delay,
              ease: "easeInOut",
            }}
          >
            {ghost.text}
          </motion.div>
        ))}
      </div>

      {/* --- FOREGROUND: CONTENT BOX --- */}
      <div className="relative z-10 bg-hell-black border-4 border-black p-8 md:p-12 max-w-3xl mx-4 shadow-[20px_20px_0px_#000]">
        <h2 className="font-gothic text-5xl md:text-7xl text-hell-white mb-6 text-center">
          DO YOU QUALIFY?
        </h2>
        
        <ul className="space-y-4 font-terminal text-xl text-gray-400 mb-8 border-b border-gray-800 pb-8">
          {[
            "You bought the top because you felt invincible.",
            "You sold the bottom because you felt fear.",
            "You own at least 3 wallets you are too scared to open.",
            "You have lost more money on gas fees than you spend on food.",
            "You are reading this right now hoping this is 'The One'."
          ].map((item, i) => (
             <li key={i} className="flex gap-3 items-start">
               <span className="text-hell-red font-bold text-xl">X</span> 
               <span>{item}</span>
             </li>
          ))}
        </ul>
        
        <div className="text-center">
           <p className="font-terminal text-2xl text-hell-gold mb-6 animate-pulse">
             CONGRATULATIONS. YOU BELONG HERE.
           </p>
           <button className="bg-hell-red text-hell-white font-gothic text-3xl px-12 py-4 hover:bg-hell-orange hover:scale-105 transition-all w-full md:w-auto shadow-xl border-2 border-black">
             JOIN THE PIT (TELEGRAM)
           </button>
        </div>
      </div>
    </section>
  );
};
