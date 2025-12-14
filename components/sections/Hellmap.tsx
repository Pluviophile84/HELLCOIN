"use client";
import { motion } from "framer-motion";

export const Hellmap = () => {
 const phases = [
 { title: "THE 'FAIR LAUNCH' TRAP", sub: "Liquidity locked in hell.", details: ["Contract deployed at 3:33 AM", "First 666 holders cursed", "Liquidity burnt as offering"] },
 { title: "PHASE 1337: DELUSIONAL HODLING", sub: "We promise utility, we deliver damage.", details: ["Hit $666k Market Cap (12 secs)", "Partnership with therapy apps", "CEX Listing (Rejected)"] },
 { title: "PHASE ???: TOTAL COLLAPSE", sub: "It's not a bear market if it never goes up.", details: ["HELLCOIN becomes legal tender", "Financial system replaced by memes", "Socialism achieved via poverty"] },
 ];

 return (
 <section id="hellmap" className="py-32 bg-hell-black relative">
 <div className="max-w-4xl mx-auto px-4">
 
 {/* --- HEADER --- */}
 <div className="flex flex-col items-center gap-2 mb-20">
 <span className="font-terminal text-[#ffae00] text-xl tracking-widest uppercase">
 ROADMAP TO RUIN
 </span>
 <h2 className="font-gothic text-6xl md:text-8xl text-center text-hell-white">
 THE HELLMAP
 </h2>
 </div>
 
 {/* TIMELINE */}
 <div className="relative border-l-4 border-hell-red/30 ml-4 md:ml-0 space-y-20">
 {phases.map((phase, i) => (
 <motion.div 
 key={i} 
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 transition={{ delay: i * 0.2 }}
 className="relative pl-12 md:pl-24"
 >
 {/* Timeline Marker */}
 <div className="absolute left-[-10px] top-2 w-6 h-6 bg-hell-black border-4 border-hell-red z-10"></div>
 
 {/* FIX: Standardized Title Size (text-xl md:text-2xl) */}
 <h3 className="font-terminal font-semibold text-xl md:text-2xl text-[#ffae00] mb-2">
 {phase.title}
 </h3>
 
 <p className="font-terminal text-xl text-hell-red mb-6">"{phase.sub}"</p>
 
 <ul className="space-y-3">
 {phase.details.map((d, idx) => (
 <li key={idx} className="font-terminal text-xl text-gray-400 flex items-start gap-3">
 {/* List marker (Red Dot) */}
 <div className="w-2 h-2 bg-hell-red mt-2.5 shrink-0"></div>
 <span>{d}</span>
 </li>
 ))}
 </ul>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
};
