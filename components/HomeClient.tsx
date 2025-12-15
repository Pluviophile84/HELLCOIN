"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

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
import { Footer } from "@/components/sections/Footer";

const ThePitLazy = dynamic(
  () => import("@/components/sections/ThePit").then((m) => m.ThePit),
  {
    ssr: false,
    loading: () => (
      <section id="the-pit" className="py-32 bg-hell-red">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-[420px] border border-hell-black/40 bg-hell-black/60" />
        </div>
      </section>
    ),
  }
);

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
        <ThePitLazy />
        <Footer />
      </div>
    </main>
  );
}
