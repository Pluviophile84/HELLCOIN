"use client";

export const Hellmap = () => {
  const phases = [
    { title: "THE 'FAIR LAUNCH' TRAP", sub: "Liquidity locked in hell.", details: ["Contract deployed at 3:33 AM", "First 666 holders cursed", "Liquidity burnt as offering"] },
    { title: "PHASE 1337: DELUSIONAL HODLING", sub: "We promise utility, we deliver damage.", details: ["Hit $666k Market Cap (12 secs)", "Partnership with therapy apps", "CEX Listing (Rejected)"] },
    { title: "PHASE ???: TOTAL COLLAPSE", sub: "It's not a bear market if it never goes up.", details: ["HELLCOIN becomes legal tender", "Financial system replaced by memes", "Socialism achieved via poverty"] },
  ];

  return (
    <section id="hellmap" className="py-32 bg-hell-black relative">
       <div className="max-w-4xl mx-auto px-4">
         <h2 className="font-gothic text-7xl text-center text-hell-white mb-20">THE HELLMAP</h2>
         
         <div className="relative border-l-4 border-hell-red/30 ml-4 md:ml-0 space-y-20">
           {phases.map((phase, i) => (
             <div key={i} className="relative pl-12 md:pl-24">
               {/* Marker */}
               <div className="absolute left-[-10px] top-0 w-6 h-6 bg-hell-black border-4 border-hell-red rounded-full"></div>
               
               <h3 className="font-gothic text-4xl md:text-5xl text-hell-gold mb-2">{phase.title}</h3>
               <p className="font-terminal text-xl text-hell-red mb-6">"{phase.sub}"</p>
               
               <ul className="space-y-3">
                 {phase.details.map((d, idx) => (
                   <li key={idx} className="font-terminal text-xl text-gray-400 flex items-center gap-3">
                     <span className="text-hell-red">///</span> {d}
                   </li>
                 ))}
               </ul>
             </div>
           ))}
         </div>
       </div>
    </section>
  );
};
