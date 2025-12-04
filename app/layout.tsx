import type { Metadata } from "next";
// 1. Import Space_Mono instead of VT323
import { Pirata_One, Space_Mono } from "next/font/google";
import "./globals.css";

const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 2. Configure Space Mono (The "High-Def Terminal" look)
const spaceMono = Space_Mono({ 
  weight: ["400", "700"], // Includes bold for emphasis
  subsets: ["latin"],
  // 3. TRICK: Map it to the old variable name so Tailwind applies it automatically everywhere
  variable: "--font-vt323" 
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
      {/* 4. Inject the new font variables */}
      <body className={`${pirata.variable} ${spaceMono.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
