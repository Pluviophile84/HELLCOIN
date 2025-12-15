"use client";

import { useCallback, useState } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { PaperHandsOverlay } from "@/components/ui/PaperHandsOverlay";

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

export default function HomeClient() {
  const [paperHands, setPaperHands] = useState(false);

  // Triggered by the Navbar
  const triggerHeavenMode = useCallback(() => {
    setPaperHands(true);
  }, []);

  const closeHeavenMode = useCallback(() => {
    setPaperHands(false);
  }, []);

  return (
    <main className="min-h-screen bg-hell-black text-hell-white selection:bg-hell-red selection:text-white">
      {/* 1. The Full Screen Overlay */}
      <PaperHandsOverlay isActive={paperHands} onClose={closeHeavenMode} />

      {/* 2. The Original Navbar (Self-contained) */}
      <Navbar onTriggerPaperHands={triggerHeavenMode} />

      {/* --- PAGE SECTIONS --- */}
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
