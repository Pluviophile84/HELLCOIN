import type { Metadata } from "next";
import { Pirata_One, Crimson_Text } from "next/font/google";
import "./globals.css";

// 1. Title Font: Pirata One (Gothic/Ancient)
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 2. Body Font: Crimson Text (The "Scripture" Look)
const crimson = Crimson_Text({ 
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-vt323" // Maps to 'font-terminal' for Tailwind compatibility
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
    // FIX: Added 'scroll-smooth' back here. 
    // This makes the mouse wheel glide instead of step.
    <html lang="en" className="scroll-smooth">
      <body className={`${pirata.variable} ${crimson.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
