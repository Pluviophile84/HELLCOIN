// ... (Keep your existing imports and PTSD_WORDS arrays) ...

export const ThePit = () => {
  return (
    <section className="relative py-32 bg-hell-red overflow-hidden flex items-center justify-center min-h-[1000px]">
      
      {/* ... (Keep your Background Grid Code exactly as it is) ... */}

      {/* --- FOREGROUND: CONTENT BOX --- */}
      <div className="relative z-10">
        
        {/* --- NEW: Floating Chapter Marker --- */}
        <div className="text-center mb-6">
           <span className="bg-black text-hell-white font-terminal text-xl px-4 py-1 border border-hell-white/20">
             /// THE FINAL CIRCLE
           </span>
        </div>

        <div className="bg-hell-black border-4 border-black p-8 md:p-12 max-w-3xl mx-4 shadow-[20px_20px_0px_#000]">
          {/* ... (Keep your existing content box code) ... */}
          <h2 className="font-gothic text-5xl md:text-7xl text-hell-white mb-6 text-center">
            DO YOU QUALIFY?
          </h2>
          {/* ... */}
        </div>
      </div>
    </section>
  );
};
