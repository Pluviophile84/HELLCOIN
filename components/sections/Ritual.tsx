"use client";
import { motion } from "framer-motion";

export const Ritual = () => {
  const steps = [
    { num: "01", title: "PREPARE THE VESSEL", text: "Download Phantom or Metamask. This will be your wallet for the afterlife." },
    { num: "02", title: "GATHER THE OFFERING", text: "Acquire some SOL (or ETH). You cannot enter the pit empty-handed." },
    { num: "03", title: "ENTER THE ALTAR", text: "Go to Raydium or Uniswap. Connect your wallet. Do not look back." },
    { num: "04", title: "ACCEPT YOUR FATE", text: "Paste the $666 Contract. Swap your boring coins for eternal glory." },
  ];

  return (
    <section id="ritual" className="py-32 bg-hell-black overflow-hidden relative">
      {/* Background Symbol */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <div className="w-[800px] h-[800px] border-[50px] border-hell-red rounded-full animate-spin-slow dashed-border"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="font-gothic text-6xl md:text-8xl text-center text-hell-white mb-20 text-glow">
          THE RITUAL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex gap-6 items-start group"
            >
              <span className="font-gothic text-8xl text-hell-red/20 group-hover:text-hell-red transition-colors leading-none">
                {step.num}
              </span>
              <div>
                <h3 className="font-terminal text-3xl text-hell-gold mb-2 uppercase border-b border-hell-red/30 pb-2 inline-block">
                  {step.title}
                </h3>
                <p className="font-terminal text-xl text-gray-400 max-w-sm">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
