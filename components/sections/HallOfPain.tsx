"use client";
import { useRef } from "react";
import { Skull } from "lucide-react";

const sinners = [
  { id: "#0001", name: "Sinner #420", pnl: "-99%", quote: "I watched a YouTube video called 'Next 1000x Gem.' The guy had his mouth open in the thumbnail, so I trusted him." },
  { id: "#0002", name: "BagHolder_666", pnl: "Divorced", quote: "My wife thinks we are saving for a house. I am actually 50x leveraged long on a token called 'ElonSperm'." },
  { id: "#0003", name: "Wagie_007", pnl: "-$12,000", quote: "I market-bought the top. It immediately tanked 40%. I panic-sold the bottom. It immediately pumped 80%." },
  { id: "#0004", name: "SafeMoon_Vet", pnl: "Soul Sold", quote: "My cousin bought 'HarryPotterObamaSonic' yesterday and just bought a Porsche. I hate this simulation." },
];

export const HallOfPain = () => {
  return (
    <section className="py-24 bg-hell-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="font-gothic text-5xl text-hell-white">HALL OF PAIN <span className="text-hell-red text-2xl ml-4 font-terminal">/// PROOF OF SUFFERING</span></h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 px-4 overflow-x-auto pb-8 snap-x">
        {sinners.map((sinner, i) => (
          <div key={i} className="flex-none w-[350px] md:w-[450px] bg-hell-black border border-gray-800 p-8 snap-center hover:border-hell-red transition-colors group">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
              <span className="font-terminal text-hell-red text-xl">{sinner.id}</span>
              <span className="font-terminal text-gray-500">ID VERIFIED</span>
            </div>
            
            <div className="mb-6">
               <h4 className="font-gothic text-3xl text-hell-white">{sinner.name}</h4>
               <p className="font-terminal text-red-500 text-xl mt-1">REALIZED PNL: {sinner.pnl}</p>
            </div>

            <p className="font-terminal text-lg text-gray-400 italic mb-8">
              "{sinner.quote}"
            </p>

            <button className="w-full border border-hell-white/20 py-2 font-terminal text-hell-white hover:bg-hell-white hover:text-black transition-colors flex items-center justify-center gap-2">
              <Skull size={18} /> PAY RESPECTS
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
