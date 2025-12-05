"use client";

export const DevilsMath = () => {
  return (
    <section id="math" className="py-24 bg-black font-terminal">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          {/* FIX: Removed font-bold, set to text-xl md:text-2xl */}
          <span className="font-terminal text-[#ffae00] text-xl md:text-2xl tracking-widest uppercase">
            SIN NOMICS DATA
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            THE <span className="text-hell-red">DEVIL'S</span> MATH
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hell-red/30 border border-hell-red/30">
          {[{ label: "MAX SUPPLY", value: "1 BILLION", sub: "TOTAL DAMNED // No Inflation. Just Pain." }, { label: "SIN TAX", value: "0% / 0%", sub: "The Devil takes no cuts. Only your soul." }, { label: "LIQUIDITY", value: "INCINERATED", sub: "LP STATUS // Keys thrown into the abyss." }, { label: "DEV ALLOCATION", value: "666 TOKENS", sub: "\"Enough to buy a cheeseburger in hell.\"" }].map((item, i) => (
            <div key={i} className="bg-hell-black p-8 hover:bg-hell-dark transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-hell-red text-xl">./{item.label}</span>
                <div className="w-2 h-2 bg-hell-red rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
              </div>
              <div className="text-5xl md:text-7xl text-hell-white mb-2 font-gothic">{item.value}</div>
              <div className="text-gray-500 text-lg border-l-2 border-[#ffae00] pl-3">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
