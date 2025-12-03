"use client";
import { motion } from "framer-motion";

export const Revelation = () => {
  return (
    <section id="revelation" className="relative min-h-screen flex flex-col md:flex-row bg-hell-black overflow-hidden">
      
      {/* --- LEFT SIDE: THE LIE --- */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center border-r border-hell-red/20 relative group overflow-hidden min-h-[50vh] md:min-h-auto">
        
        {/* Background Image */}
        <img 
          src="/GOAPE.png" 
          alt="The Devil"
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
        />
        {/* Heavy Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 text-center w-full max-w-md">
          
          {/* HEADER MATCHING GENESIS STYLE */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="font-terminal text-[#ffae00] text-lg md:text-xl tracking-widest uppercase">
              /// DECEPTION_DETECTED ///
            </span>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-gothic text-6xl md:text-8xl text-gray-500 tracking-wide group-hover:text-hell-red transition-colors duration-500"
            >
              THE LIE
            </motion.h3>
          </div>
          
          {/* The List of Lies - Uniform Color for Consistency */}
          <div className="font-terminal text-lg md:text-2xl text-gray-600 space-y-3 italic leading-relaxed">
            <p>"Utility." "Roadmaps." "Communities."</p>
            <p>“Dev is doxxed.”</p>
            <p>“Influencer-backed.”</p>
            <p>“Strong fundamentals.”</p>
            <p>“Early entry.” “Holding the floor.”</p>
            <p className="text-hell-red/50">“This time it’s different.”</p>
            <p>“Memecoins don’t rug — they ‘restart.’”</p>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6">
            <p className="font-terminal text-gray-400 text-lg">
              Every illusion needed to convert <br/>
              <span className="text-hell-red">hope into fertilizer.</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE TRUTH --- */}
      <div className="md:w-1/2 p-8 md:p-12 bg-hell-black flex flex-col justify-center relative border-t md:border-t-0 md:border-l border-hell-red/20">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto w-full"
        >
          {/* HEADER */}
          <div className="mb-8 text-center md:text-center flex flex-col gap-2">
            <span className="font-terminal text-[#ffae00] text-lg md:text-xl tracking-widest uppercase">
              /// THE_TRUTH ///
            </span>
            <h2 className="font-gothic text-5xl md:text-8xl text-hell-white leading-none">
              REALITY <span className="text-hell-red">CHECK.</span>
            </h2>
          </div>

          {/* THE MANIFESTO */}
          <div className="space-y-6 font-terminal text-lg md:text-xl text-gray-300 leading-relaxed">
            
            <p className="border-l-2 border-hell-red pl-4 text-white text-xl md:text-2xl">
              Crypto is <span className="text-[#ffae00]">revolutionary</span>; degens made it a casino, and bad actors made it a buffet..
            </p>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>No one has alpha — only confidence disorders.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Influencers aren’t guides; they’re exit liquidity with followers.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Utility is optional. <span className="text-[#ffae00]">Delusion is mandatory.</span></span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Volume is dopamine wearing a business suit.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Every community is a therapy group for people who bought the top.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-hell-red">{">"}</span>
                <span>Memecoins don’t die — they simply stop being mentioned.</span>
              </li>
            </ul>

            {/* GOLD BOX - FIXED: w-full ensures it stretches on mobile */}
            <div className="mt-10 p-6 border border-[#ffae00]/30 bg-[#ffae00]/5 w-full">
              <p className="text-center text-white text-xl md:text-2xl leading-tight">
                <span className="font-gothic text-hell-red text-3xl md:text-4xl block mb-2">HELLCOIN</span> 
                is the only project that won’t lie about it.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
