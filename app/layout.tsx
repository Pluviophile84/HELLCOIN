import type { Metadata } from "next";
// 1. Import Pirata_One (Title) and Lusitana (The "Compact Ancient" Body)
import { Pirata_One, Lusitana } from "next/font/google";
import "./globals.css";

// 2. Configure Pirata One (Headers)
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 3. Configure Lusitana (Body)
// This is a "Humanist Serif" that is naturally narrow and space-efficient.
// It keeps the "Ancient" vibe of Crimson Text but fits tight spaces like the original terminal font.
const compactAncient = Lusitana({ 
  weight: ["400", "700"], // Includes bold
  subsets: ["latin"],
  variable: "--font-vt323" // Maps to 'font-terminal' in Tailwind
});

export const metadata: Metadata = {
  title: "HELLCOIN ($666) - Born in the Red",
  description: "The official currency of eternal regret.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 4. Inject variables */}
      <body className={`${pirata.variable} ${compactAncient.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
