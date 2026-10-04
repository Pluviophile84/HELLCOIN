"use client";
import { lazy, Suspense } from "react";
// React.lazy intentionally avoids Next dynamic's server preload of editor/font assets.
const Workspace = lazy(() => import("./ForgeWorkspace"));
export function ForgeEntry(props: { active?: boolean; embedded?: boolean; onClose?: () => void }) {
  return (
    <Suspense
      fallback={
        <div
          className="mx-auto flex min-h-80 max-w-5xl items-center justify-center rounded-xl border-3 border-black bg-obsidian-900 p-6 text-gold shadow-brutal"
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
