"use client";

export const ThePit = () => {
  return (
    <section className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center">
      {/* Background Marquees */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-20 pointer-events-none font-gothic text-9xl text-black leading-none select-none overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">JOIN THE CHAOS JOIN THE CHAOS JOIN THE CHAOS</div>
        <div className="animate-marquee whitespace-nowrap" style={{ animationDirection: 'reverse' }}>GET REKT GET REKT GET REKT GET REKT</div>
        <div className="animate-marquee whitespace-nowrap">BUY THE DIP BUY THE DIP BUY THE DIP</div>
      </div>

      <div className="relative z-10 bg-hell-black border-4 border-black p-8 md:p-12 max-w-3xl mx-4 shadow-[20px_20px_0px_#000]">
        <h2 className="font-gothic text-5xl md:text-7xl text-hell-white mb-6 text-center">
          DO YOU QUALIFY?
        </h2>
        <ul className="space-y-4 font-terminal text-xl text-gray-400 mb-8 border-b border-gray-800 pb-8">
          {[
            "You bought the top because you felt invincible.",
            "You sold the bottom because you felt fear.",
            "You own at least 3 wallets you are too scared to open.",
            "You have lost more money on gas fees than you spend on food."
          ].map((item, i) => (
             <li key={i} className="flex gap-3">
               <span className="text-hell-red">X</span> {item}
             </li>
          ))}
        </ul>
        
        <div className="text-center">
           <p className="font-terminal text-2xl text-hell-gold mb-6">CONGRATULATIONS. YOU BELONG HERE.</p>
           <button className="bg-hell-red text-hell-white font-gothic text-3xl px-12 py-4 hover:bg-hell-orange hover:scale-105 transition-all w-full md:w-auto shadow-xl">
             JOIN THE PIT (TELEGRAM)
           </button>
        </div>
      </div>
    </section>
  );
};
