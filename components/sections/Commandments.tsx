"use client";
import { motion } from "framer-motion";

const commandments = [
  { id: "I", title: "BUY THE TOP", text: "Wait until the candle is vertical and green. Then go all in." },
  { id: "II", title: "NEVER TAKE PROFITS", text: "Watch your $50 turn into $5,000, then ride it back to $0. This is the way." },
  { id: "III", title: "USE 100X LEVERAGE", text: "Why lose money slowly over years when you can lose it in 3 seconds?" },
  { id: "IV", title: "TRUST THE ANIME GIRL", text: "If the founder has a cute profile picture, you must trust them with your life savings." },
  { id: "V", title: "CLICK EVERY LINK", text: "Security is for cowards. If it says 'Claim Airdrop', connect instantly." },
  { id: "VI", title: "DO ZERO RESEARCH", text: "Reading is for nerds. Just look at the ticker and the memes." },
  { id: "VII", title: "PANIC SELL BOTTOM", text: "Buy when you feel like a god. Sell when you are crying in the shower." },
  { id: "VIII", title: "MARRY YOUR BAGS", text: "Emotional attachment is key. Never let go, even when the dev leaves." },
  { id: "IX", title: "IGNORE GAS FEES", text: "Pay $80 in ETH fees to swap $15 worth of a shitcoin. Be a man." },
  { id: "X", title: "ENVY THY NEIGHBOR", text: "Stare at other people's gains on Twitter until you feel physically ill." },
];

export const Commandments = () => {
  return (
    // FIX: Reduced 2xl vertical padding from py-64 to py-40 to fit 1080p screens better
    <section id="commandments" className="bg-hell-dark relative px-4
                                        py-24 sm:py-32 md:py-36 lg:py-40 xl:py-44 2xl:py-48">
      {/* FIX: Capped 2xl width at 1600px instead of 2000px for better density on 1920px screens */}
      <div className="mx-auto w-full max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1600px]">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center gap-2 
                        mb-16 sm:mb-20 md:mb-24 lg:mb-24 xl:mb-28 2xl:mb-32">
          {/* FIX: Reduced 2xl size from 5xl to 3xl for elegance */}
          <span className="font-terminal text-[#ffae00] tracking-widest uppercase font-bold 
                           text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl">
            LAW OF THE LAND
          </span>
          {/* FIX: Reduced 2xl size from 11rem (176px) to 8xl (96px) so it doesn't eat the screen */}
          <h2 className="font-gothic text-hell-white 
                         text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-8xl">
            THE TEN COMMANDMENTS
          </h2>
        </div>

        {/* --- GRID --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          // FIX: Reduced 2xl gap from 12 to 8
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                     gap-6 lg:gap-8 xl:gap-8 2xl:gap-10"
        >
          {commandments.map((c, i) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              className={`
                bg-hell-black border border-gray-800 relative group 
                transition-all duration-75 ease-out
                hover:border-hell-red hover:scale-[1.01]
                p-6 sm:p-8 lg:p-8 2xl:p-10
                ${i === 0 || i === 9 ? 'md:col-span-2' : ''}
              `}
            >
              {/* ID Number - FIX: Reduced 2xl size from 7xl to 5xl */}
              <div className="absolute font-gothic text-hell-red transition-colors duration-75
                              top-4 right-4 sm:top-6 sm:right-6
                              text-4xl sm:text-5xl lg:text-5xl 2xl:text-5xl">
                {c.id}
              </div>
              
              {/* Title - FIX: Reduced 2xl size from 4xl to 2xl */}
              <h3 className="font-terminal text-[#ffae00] group-hover:text-hell-red uppercase font-bold transition-colors duration-75
                             mb-3 lg:mb-4
                             text-xl sm:text-2xl lg:text-2xl 2xl:text-2xl">
                {c.title}
              </h3>
              
              {/* Text - FIX: Reduced 2xl size from 3xl to xl */}
              <p className="font-terminal text-gray-400 group-hover:text-gray-200 transition-colors duration-75
                            text-lg sm:text-xl lg:text-xl 2xl:text-xl leading-relaxed">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
