"use client";
import { lazy, Suspense } from "react";
import styles from "./ForgeEditor.module.css";

// React.lazy intentionally avoids Next dynamic's server preload of editor/font assets.
let workspaceModule: Promise<typeof import("./ForgeWorkspace")> | null = null;
const loadForgeWorkspace = () =>
  (workspaceModule ??= import("./ForgeWorkspace").catch((error) => {
    workspaceModule = null;
    throw error;
  }));
const Workspace = lazy(loadForgeWorkspace);

export function prewarmForgeWorkspace() {
  void loadForgeWorkspace().catch(() => {});
}

export function ForgeEntry(props: { active?: boolean; embedded?: boolean; onClose?: () => void }) {
  return (
    <Suspense
      fallback={
        <div
          className={
            styles.entryFallback +
            " mx-auto flex w-full max-w-5xl items-center justify-center rounded-xl border-3 border-black bg-obsidian-900 p-6 text-gold shadow-brutal"
          }
          role="status"
        >
          Opening the Forge…
        </div>
      }
    >
      <Workspace {...props} />
    </Suspense>
  );
}
