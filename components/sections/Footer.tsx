export const Footer = () => {
  return (
    <footer className="bg-black py-16 px-4 border-t border-hell-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
           <h2 className="font-gothic text-9xl text-hell-dark leading-none select-none">HELL</h2>
           <p className="font-terminal text-gray-600 mt-4">
             $666 (HELLCOIN) is a useless memecoin with absolutely no intrinsic value. 
             If the price goes up, it's luck. If it goes down, it's gravity.
           </p>
        </div>
        <div className="text-right">
           <div className="flex flex-col gap-4 font-terminal text-2xl text-hell-white">
             <a href="#" className="hover:text-hell-red">TWITTER (X)</a>
             <a href="#" className="hover:text-hell-red">DEXSCREENER</a>
             <a href="#" className="hover:text-hell-red">ETHERSCAN</a>
           </div>
           <p className="font-terminal text-gray-700 text-sm mt-12">© 2025 HELLCOIN. ETERNAL REGRET.</p>
        </div>
      </div>
    </footer>
  );
};
