"use client";
import { motion } from "framer-motion";

const commandments = [
  { id: "I", title: "BUY THE TOP", text: "Wait for the candle to touch heaven. Then enter hell." },
  { id: "II", title: "NEVER TAKE PROFITS", text: "Watch $50 become $5,000. Then watch $5,000 become a funny story." },
  { id: "III", title: "USE 100X LEVERAGE", text: "Why lose over years when you can lose in a single heartbeat?" },
  { id: "IV", title: "TRUST THE ANIME GIRL", text: "If the founder has a cute profile picture, you must trust them with your life savings." },
  { id: "V", title: "CLICK EVERY LINK", text: "Security is for cowards. If it says 'Claim Airdrop', connect instantly." },
  { id: "VI", title: "DO ZERO RESEARCH", text: "DYOR is for scholars. You follow vibes." },
  { id: "VII", title: "PANIC SELL BOTTOM", text: "Buy when you feel euphoric. Sell when you are crying in the shower." },
  { id: "VIII", title: "MARRY YOUR BAGS", text: "Even if the dev leaves, love never dies. Your portfolio does." },
  { id: "IX", title: "IGNORE GAS FEES", text: "Pay $80 in ETH fees to swap $15 worth of a shitcoin. Be a man." },
  { id: "X", title: "ENVY THY NEIGHBOR", text: "Stare at other people's gains on Twitter until you feel physically ill." },
];

export const Commandments = () => {
  return (
    <section id="commandments" className="py-24 px-4 bg-hell-dark relative">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="font-terminal text-[#ffae00] text-lg md:text-xl tracking-widest uppercase font-bold">
          LAW OF THE LAND
          </span>
          <h2 className="font-gothic text-6xl md:text-8xl text-hell-white">
            THE TEN <span className="text-hell-red">COMMANDMENTS</span>
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {commandments.map((c, i) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              className={`
                bg-hell-black border border-gray-800 p-6 relative group 
                transition-all duration-75 ease-out
                hover:border-hell-red hover:scale-[1.01]
                ${i === 0 || i === 9 ? 'md:col-span-2' : ''}
              `}
            >
              {/* ID Number (Fixed Bright Red) */}
              <div className="absolute top-4 right-4 font-gothic text-4xl text-hell-red">
                {c.id}
              </div>
              
              {/* Title */}
              <h3 className="font-terminal text-xl text-[#ffae00] mb-3 group-hover:text-hell-red uppercase font-bold transition-colors duration-75">
                {c.title}
              </h3>
              
              {/* Text */}
              <p className="font-terminal text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-75">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
