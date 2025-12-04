import type { Metadata } from "next";
// 1. Import Pirata_One (Title) and Cutive_Mono (The "Ancient Typewriter" Body)
import { Pirata_One, Cutive_Mono } from "next/font/google";
import "./globals.css";

// 2. Configure Pirata One (Headers)
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 3. Configure Cutive Mono (Body)
// This is a "Classic Typewriter" font.
// It feels ancient and bureaucratic (like a Hell contract), 
// but keeps the narrow, compact structure of the original terminal font.
const ancientTypewriter = Cutive_Mono({ 
  weight: "400", 
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
      <body className={`${pirata.variable} ${ancientTypewriter.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
