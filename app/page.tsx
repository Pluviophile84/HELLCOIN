"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PaperHandsOverlay } from "@/components/ui/PaperHandsOverlay";
import { SlidingCockpitMenu } from "@/components/layout/SlidingCockpitMenu"; 
import { Hero } from "@/components/sections/Hero";
import { Genesis } from "@/components/sections/Genesis";
import { Revelation } from "@/components/sections/Revelation";
import { Commandments } from "@/components/sections/Commandments";
import { NineTypes } from "@/components/sections/NineTypes";
import { DevilsMath } from "@/components/sections/Math";
import { Ritual } from "@/components/sections/Ritual";
import { HallOfPain } from "@/components/sections/HallOfPain";
import { Hellmap } from "@/components/sections/Hellmap";
import { ThePit } from "@/components/sections/ThePit";
import { Footer } from "@/components/sections/Footer";

// Generic handler for the Cockpit Menu links
const handleCockpitNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
    }
}


export default function Home() {
  const [paperHands, setPaperHands] = useState(false);
  const [cockpitOpen, setCockpitOpen] = useState(false); // State for the sliding menu

  // Triggered by the Navbar
  const triggerHeavenMode = () => {
    setPaperHands(true);
  };
  
  const toggleCockpit = () => {
      setCockpitOpen(prev => !prev);
  }

  return (
    <main className="min-h-screen bg-hell-black text-hell-white selection:bg-hell-red selection:text-white">
      {/* 1. The Full Screen Overlay */}
      <PaperHandsOverlay isActive={paperHands} onClose={() => setPaperHands(false)} />
      
      {/* 2. The Fixed Top Header */}
      <Navbar onTriggerPaperHands={triggerHeavenMode} onToggleMenu={toggleCockpit} /> 
      
      {/* 3. THE SLIDING COCKPIT MENU */}
      <SlidingCockpitMenu 
          isOpen={cockpitOpen} 
          onClose={() => setCockpitOpen(false)} 
          handleNavClick={handleCockpitNavClick} 
      />

      {/* --- PAGE SECTIONS (No margin needed now, content is naturally centered) --- */}
      <div> 
        <Hero />
        <Genesis />
        <Commandments />
        <NineTypes />
        <DevilsMath />
        <Ritual />
        <Hellmap />
        <HallOfPain />
        <Revelation />
        <ThePit />
        <Footer />
      </div>
    </main>
  );
}
