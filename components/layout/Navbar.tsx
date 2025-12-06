"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({
  onTriggerPaperHands,
}: {
  onTriggerPaperHands: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const BUY_LINK = "https://raydium.io/swap";

  // Scroll style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // BODY SCROLL LOCK (only when mobile menu is open)
  useEffect(() => {
    const original = document.body.style.overflow;
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "GENESIS", href: "#genesis", primary: true },
    { name: "COMMANDMENTS", href: "#commandments", primary: true },
    { name: "NINE TYPES", href: "#nine-types", primary: true },
    { name: "MATH", href: "#math", primary: true },
    { name: "RITUAL", href: "#ritual", primary: true },
    { name: "HELLMAP", href: "#hellmap", primary: false },
    { name: "HALL OF PAIN", href: "#hall-of-pain", primary: false },
    { name: "REVELATION", href: "#revelation", primary: false },
    { name: "THE PIT", href: "#the-pit", primary: false },
  ];

  const primaryLinks = navLinks.filter((link) => link.primary);
  const secondaryLinks = navLinks.filter((link) => !link.primary);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 border-b transition-all duration-300 py-4",
        isScrolled
          ? "bg-hell-black/90 backdrop-blur-md border-hell-red/30"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* LOGO */}
        <div
          onClick={scrollToTop}
          className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0 transition-transform active:scale-95"
        >
          <img
            src="/GOAPE.png"
            alt="Hellcoin"
            className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-hell-orange object-cover"
          />
          <span className="font-gothic text-xl md:text-3xl text-hell-orange tracking-wide text-glow">
            HELLCOIN
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className="relative hidden lg:flex items-center gap-6">
          {/* Primary visible links */}
          <div className="flex gap-6">
            {primaryLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-terminal text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* More dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setMoreMenuOpen(true)}
            onMouseLeave={() => setMoreMenuOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 font-terminal text-base transition-colors uppercase cursor-pointer border px-2 py-1",
                moreMenuOpen
                  ? "text-hell-red border-hell-red"
                  : "text-[#ffae00] border-hell-red/50 hover:text-hell-red"
              )}
            >
              MORE
              {moreMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 pt-4 w-56 z-50"
                >
                  <div className="bg-hell-black border border-hell-red/50 shadow-xl p-5 flex flex-col gap-4">
                    {secondaryLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="font-terminal text-base text-hell-white hover:text-[#ffae00] transition-colors uppercase tracking-widest relative group cursor-pointer font-bold w-fit"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hell-orange transition-all group-hover:w-full"></span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* HEAVEN MODE BUTTON */}
          <button
            onClick={onTriggerPaperHands}
            className="flex items-center gap-2 px-3 py-1 border border-pink-300 rounded text-pink-100 font-terminal text-xs md:text-sm font-bold hover:bg-pink-500/20 hover:text-white transition-colors shadow-[0_0_10px_rgba(255,192,203,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-pink-200 animate-pulse shadow-[0_0_5px_#fff]"></span>
            HEAVEN MODE
          </button>

          {/* ACQUIRE BUTTON (DESKTOP) */}
          <a
            href={BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-hell-red hover:bg-hell-orange text-hell-white font-gothic text-lg px-6 py-2 rounded shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all transform hover:scale-105 border border-hell-orange/50 text-center"
          >
            ACQUIRE $666
          </a>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-hell-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-hell-black/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Inner container – NO SCROLL, everything fits */}
            <div
              className="h-full w-full px-6 pt-[4.5rem] pb-6 flex flex-col justify-between items-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Links block */}
              <div className="flex flex-col flex-1 justify-center items-center w-full gap-[clamp(0.25rem,1.1vh,0.7rem)]">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-terminal text-[clamp(0.9rem,2.1vh,1.1rem)] text-hell-white hover:text-hell-orange tracking-[0.2em] cursor-pointer font-bold text-center"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="w-full flex flex-col items-center shrink-0 pt-4 border-t border-gray-900">
                <div className="w-16 h-1 bg-hell-red/50 mb-4" />
                <a
                  href={BUY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-hell-red text-hell-white font-gothic text-[clamp(1rem,2.2vh,1.3rem)] py-[clamp(0.6rem,1.8vh,0.9rem)] px-10 rounded shadow-[0_0_20px_rgba(204,0,0,0.6)] text-center"
                >
                  ACQUIRE $666
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
