import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Inter } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HELLCOIN ($666) — Born in the red. Forged by regret.",
  description:
    "HELLCOIN ($666). Runs on Proof-of-Suffering™. Rewards paid in emotional damage. The only way to heaven is through Hell.",
  openGraph: {
    title: "HELLCOIN ($666)",
    description:
      "The afterlife of every bag. Proof-of-Suffering™. Emotional damage rewards.",
    url: "https://hellcoin.fun",
    images: ["/opengraph.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HELLCOIN ($666)",
    description: "Born in the red. Forged by regret.",
    images: ["/opengraph.jpg"],
  },
  metadataBase: new URL("https://hellcoin.fun"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-neutral-200 selection:bg-red-700/40`}>
        {/* Default background layer (lava). The page can overlay an alternate canvas mode. */}
        <div className="fixed inset-0 -z-10 bg-lava" />
        <div className={bebas.className}>{children}</div>
      </body>
    </html>
  );
}
