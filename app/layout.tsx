import type { Metadata } from "next";
// 1. Import Crimson_Text (The "Ancient Scripture" Font)
import { Pirata_One, Crimson_Text } from "next/font/google";
import "./globals.css";

const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 2. Configure Crimson Text
// This font looks like an old manuscript/bible. 
// It is very readable, compact, and fits the "Medieval/Hell" theme perfectly.
const ancientBody = Crimson_Text({ 
  weight: ["400", "600", "700"], // Includes bold for emphasis
  style: ["normal", "italic"],   // FIX: Load BOTH Regular and Italic so you can mix them
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
      <body className={`${pirata.variable} ${ancientBody.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
