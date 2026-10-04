"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { HellLoader } from "@/components/ui/HellLoader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Keep Heaven code split, but cache its module after the initial page settles.
let paperHandsModule: Promise<typeof import("@/components/ui/PaperHandsOverlay")> | null = null;
const loadPaperHandsOverlay = () =>
  (paperHandsModule ??= import("@/components/ui/PaperHandsOverlay").catch((error) => {
    paperHandsModule = null;
    throw error;
  }));
const PaperHandsOverlay = dynamic(() => loadPaperHandsOverlay().then((m) => m.PaperHandsOverlay), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="fixed inset-0 z-[100] bg-pink-100" />,
});

export function AppShellClient({ children }: { children: ReactNode }) {
  const [paperHands, setPaperHands] = useState(false);
  const [warmedOverlay, setWarmedOverlay] = useState<
    typeof import("@/components/ui/PaperHandsOverlay").PaperHandsOverlay | null
  >(null);
  const [activeOverlay, setActiveOverlay] = useState<
    typeof import("@/components/ui/PaperHandsOverlay").PaperHandsOverlay | null
  >(null);
  const [heavenModeCooldown, setHeavenModeCooldown] = useState(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let live = true;
    let idleId: number | null = null;
    const prewarm = () => {
      void loadPaperHandsOverlay()
        .then((module) => {
          if (live) setWarmedOverlay(() => module.PaperHandsOverlay);
        })
        .catch(() => {});
    };
    const timer = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(prewarm, { timeout: 2000 });
      } else prewarm();
    }, 1200);
    return () => {
      live = false;
      window.clearTimeout(timer);
      if (idleId !== null) window.cancelIdleCallback(idleId);
    };
  }, []);

  // Cleanup cooldown timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  const triggerHeavenMode = useCallback(() => {
    if (heavenModeCooldown) return;
    setActiveOverlay(() => warmedOverlay);
    setPaperHands(true);
    setHeavenModeCooldown(true);
  }, [heavenModeCooldown, warmedOverlay]);

  const closeHeavenMode = useCallback(() => {
    setPaperHands(false);
    // Clear any existing timer before setting new one
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);

    // Keep cooldown active for 4 more seconds (toast duration)
    cooldownTimerRef.current = setTimeout(() => {
      setHeavenModeCooldown(false);
    }, 4000);
  }, []);

  const ActivePaperHandsOverlay = activeOverlay ?? PaperHandsOverlay;

  return (
    <>
      <HellLoader />
      <ScrollProgress />
      <header className="contents">
        <Navbar onTriggerPaperHands={triggerHeavenMode} isHeavenModeActive={heavenModeCooldown} />
      </header>
      <main
        id="main"
        className="relative min-h-[100svh] bg-obsidian-950 text-lava-50 selection:bg-lava-500 selection:text-white"
      >
        {children}
      </main>
      {/* Only render when activated to save memory */}
      {(paperHands || heavenModeCooldown) && (
        <ActivePaperHandsOverlay isActive={paperHands} onClose={closeHeavenMode} />
      )}
    </>
  );
}
