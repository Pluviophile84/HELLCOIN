"use client";
import { motion } from "framer-motion";

export const Revelation = () => {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-hell-dark overflow-hidden">
      
      {/* --- LEFT SIDE: THE DEVIL (GOAPE.png) --- */}
      <div className="md:w-1/2 p-12 flex items-center justify-center border-r border-hell-red/20 relative group overflow-hidden">
        {/* The Devil Image as a Background Cover */}
        <div className="absolute inset-0 bg-[url('/GOAPE-Edited.png')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"></div>
        
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-gothic text-6xl md:text-8xl text-hell-white/50 group-hover:text-hell-red transition-colors duration-500"
          >
            THE LIE
          </motion.h3>
          <p className="font-terminal text-xl text-gray-500 mt-4">"Utility. Roadmap. Community."</p>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE TRUTH --- */}
      <div className="md:w-1/2 p-12 bg-hell-black flex flex-col justify-center relative">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-gothic text-5xl md:text-7xl text-hell-white mb-6">
            THE <span className="text-hell-red">ONLY HONEST</span> PROJECT.
          </h2>
          <blockquote className="font-terminal text-2xl md:text-3xl text-hell-gold border-l-4 border-hell-gold pl-6 py-2 mb-8 bg-hell-gold/5">
            "Crypto is just a casino with Wi-Fi and trauma bonding."
          </blockquote>
          <p className="font-terminal text-xl text-gray-300 leading-relaxed mb-6">
            Most projects promise you Heaven and deliver Hell. We just cut out the middleman.
          </p>
          <p className="font-gothic text-4xl text-hell-white">
            THE UTILITY? <br/>
            <span className="text-hell-red text-glow">LIBERATION THROUGH FAILURE.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
