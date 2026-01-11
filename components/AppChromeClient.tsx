"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { HellLoader } from "@/components/ui/HellLoader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Lazy load PaperHandsOverlay - only needed when user triggers it
const PaperHandsOverlay = dynamic(
  () => import("@/components/ui/PaperHandsOverlay").then((m) => m.PaperHandsOverlay),
  { ssr: false }
);

/**
 * Client-only chrome that must hydrate:
 * - Loader
 * - Scroll progress
 * - Navbar + Heaven mode trigger
 * - PaperHands overlay
 *
 * NOTE: This component intentionally does NOT wrap the full page content,
 * to avoid forcing the entire homepage into a client boundary.
 */
export function AppChromeClient() {
  const [paperHands, setPaperHands] = useState(false);
  const [heavenModeCooldown, setHeavenModeCooldown] = useState(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  const triggerHeavenMode = useCallback(() => {
    if (heavenModeCooldown) return;
    setPaperHands(true);
    setHeavenModeCooldown(true);
  }, [heavenModeCooldown]);

  const closeHeavenMode = useCallback(() => {
    setPaperHands(false);
    // Clear any existing timer before setting new one
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);

    // Keep cooldown active for 4 more seconds (toast duration)
    cooldownTimerRef.current = setTimeout(() => {
      setHeavenModeCooldown(false);
    }, 4000);
  }, []);

  return (
    <>
      <HellLoader />
      <ScrollProgress />
      <header className="contents">
        <Navbar onTriggerPaperHands={triggerHeavenMode} isHeavenModeActive={heavenModeCooldown} />
      </header>

      {(paperHands || heavenModeCooldown) && (
        <PaperHandsOverlay isActive={paperHands} onClose={closeHeavenMode} />
      )}
    </>
  );
}
