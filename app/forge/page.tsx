import type { Metadata } from "next";
import Link from "next/link";
import { ForgeEntry } from "@/components/forge/ForgeEntry";
import { SITE_URL } from "@/lib/constants";

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
      className="min-h-[100svh] bg-obsidian-950 px-2 py-3 text-lava-50 md:px-6 md:py-6"
    >
      <header className="mx-auto mb-3 flex max-w-5xl items-center justify-between gap-4 px-2">
        <Link
          href="/#forge"
          className="inline-flex min-h-11 items-center rounded text-sm font-bold text-gold"
        >
          ← BACK TO HELLCOIN
        </Link>
        <h1 className="font-heading text-2xl text-lava-50">MEME FORGE</h1>
      </header>
      <ForgeEntry />
    </main>
  );
}
