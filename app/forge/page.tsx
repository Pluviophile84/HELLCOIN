import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { ForgeEditor } from "@/components/forge/ForgeEditor";
import { SITE_URL } from "@/lib/constants";

const memeFont = Inter({ subsets: ["latin"], weight: "700", display: "swap" });
const title = "The Forge | HELLCOIN";
const description =
  "Make something regrettable. A local HELLCOIN meme forge. Your image, your words. The Devil stays.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: SITE_URL + "/forge" },
  openGraph: {
    title,
    description,
    url: SITE_URL + "/forge",
    siteName: "HELLCOIN",
    type: "website",
    images: [{ url: "/hellcoin-og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/hellcoin-og.png"] },
};

export default function ForgePage() {
  return (
    <main
      id="main"
      className="mx-auto min-h-screen max-w-screen-2xl px-4 py-8 text-lava-50 md:px-8 md:py-12"
    >
      <Link
        href="/#hellmap"
        className="inline-block rounded text-sm font-bold tracking-wide text-gold"
      >
        ← BACK TO HELL
      </Link>
      <header className="mb-10 mt-10 space-y-4">
        <SectionKicker>COMMUNITY TOOL</SectionKicker>
        <h1 className="text-5xl md:text-7xl">
          THE <span className="hellfire-text-pure">FORGE</span>
        </h1>
        <p className="text-xl text-gold">Make something regrettable.</p>
        <p className="text-lava-100/70">Drop, paste, or upload an image. The Devil stays.</p>
      </header>
      <ForgeEditor fontFamily={memeFont.style.fontFamily.split(",")[0]} />
      <p className="mt-12 text-center text-sm text-lava-100/60">Afterlife of every bag.</p>
    </main>
  );
}
