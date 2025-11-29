"use client";
import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { PaperHandsOverlay } from "../components/ui/PaperHandsOverlay";
import { Hero } from "../components/sections/Hero";
import { Genesis } from "../components/sections/Genesis";
import { Revelation } from "../components/sections/Revelation";
import { Commandments } from "../components/sections/Commandments";
import { DevilsMath } from "../components/sections/Math";
import { Ritual } from "../components/sections/Ritual";
import { HallOfPain } from "../components/sections/HallOfPain";
import { Hellmap } from "../components/sections/Hellmap";
import { ThePit } from "../components/sections/ThePit";
import { Footer } from "../components/sections/Footer";

export default function Home() {
  const [paperHands, setPaperHands] = useState(false);

  return (
    <main className="min-h-screen bg-hell-black text-hell-white selection:bg-hell-red selection:text-white">
      <PaperHandsOverlay isActive={paperHands} onClose={() => setPaperHands(false)} />
      <Navbar onTriggerPaperHands={() => setPaperHands(true)} />
      
      <Hero />
      <Genesis />
      <Revelation />
      <Commandments />
      <DevilsMath />
      <Ritual />
      <HallOfPain />
      <Hellmap />
      <ThePit />
      <Footer />
    </main>
  );
}
