"use client";
import { Inter } from "next/font/google";
import { ForgeEditor } from "./ForgeEditor";
// This module is imported only when a workspace is opened. Never preload Inter for Hero.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: "700",
  display: "swap",
  preload: false,
});
export default function ForgeWorkspace(props: {
  active?: boolean;
  embedded?: boolean;
  onClose?: () => void;
}) {
  return <ForgeEditor {...props} fontFamily={inter.style.fontFamily.split(",")[0]} />;
}
