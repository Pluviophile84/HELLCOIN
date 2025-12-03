"use client";
import { motion } from "framer-motion";

export const Revelation = () => {
  return (
    <section id="revelation" className="relative min-h-screen flex flex-col md:flex-row bg-hell-black overflow-hidden">
      
      {/* --- LEFT SIDE: THE LIE --- */}
      <div className="md:w-1/2 p-12 flex flex-col items-center justify-center border-r border-hell-red/20 relative group overflow-hidden">
        
        {/* Background Image */}
        <img 
          src="/GOAPE.png" 
          alt="The Devil"
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
        />
        {/* Heavy Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center w-full max-w-md">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-gothic text-6xl md:text-8xl text-gray-500 mb-8 tracking-wide group-hover:text-hell-red transition-colors duration-500"
          >
            THE LIE
          </motion.h3>
          
          {/* The List of Lies - Stylized as "Whispers" */}
          <div className="font-terminal text-lg md:text-xl text-gray-400 space-y-2 italic">
            <p className="opacity-50">"Utility." "Roadmaps."</p>
            <p className="opacity-70">"Communities."</p>
            <p className="text-gray-300">“Dev is doxxed.”</p>
            <p className="opacity-60">“Influencer-backed.”</p>
            <p className="opacity-40">“Strong fundamentals.”</p>
            <p className="opacity-80">“Early entry.” “Holding the floor.”</p>
            <p className="text-hell-red/70">“This time it’s different.”</p>
            <p className="opacity-50">“Memecoins don’t rug — they ‘restart.’”</p>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <p className="font-terminal text-hell-white text-xl">
              Every illusion needed to convert <br/>
              <span className="text-hell-red">hope into fertilizer.</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE TRUTH --- */}
      <div className="md:w-1/2 p-12 bg-hell-black flex flex-col justify-center relative border-t md:border-t-0 md:border-l border-hell-red/20">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto"
        >
          {/* HEADER */}
          <div className="mb-8 text-center md:text-left">
            <span className="font-terminal text-[#ffae00] text-xl tracking-widest uppercase">
              /// THE_TRUTH ///
            </span>
            <h2 className="font-gothic text-5xl md:text-8xl text-hell-white mt-2 leading-none">
              REALITY <span className="text-hell-red">CHECK.</span>
            </h2>
          </div>

          {/* THE MANIFESTO */}
          <div className="space-y-6 font-terminal text-xl text-gray-300 leading-relaxed">
            
            <p className="border-l-2 border-hell-red pl-4">
              Crypto is a <span className="text-white">casino</span> pretending to be a revolution.
            </p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-hell-red">></span>
                <span>No one has alpha — only confidence disorders.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">></span>
                <span>Influencers aren’t guides; they’re exit liquidity with followers.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">></span>
                <span>Utility is optional. <span className="text-[#ffae00]">Delusion is mandatory.</span></span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">></span>
                <span>Volume is dopamine wearing a business suit.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">></span>
                <span>Every community is a therapy group for people who bought the top.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">></span>
                <span>Memecoins don’t die — they simply stop being mentioned.</span>
              </li>
            </ul>

            <div className="mt-10 p-4 border border-[#ffae00]/30 bg-[#ffae00]/5">
              <p className="text-center text-white text-2xl">
                <span className="font-gothic text-hell-red text-3xl">HELLCOIN</span> is the only project that won’t lie about it.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
