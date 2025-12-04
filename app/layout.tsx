import type { Metadata } from "next";
// 1. Import Pirata and Crimson Text (Google Fonts)
import { Pirata_One, Crimson_Text } from "next/font/google";
import "./globals.css";

// 2. Title Font: Pirata One
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 3. Body Font: Crimson Text (The "Ancient" Look)
const crimson = Crimson_Text({ 
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-vt323" // Mapped to 'font-terminal' for Tailwind compatibility
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
      <body className={`${pirata.variable} ${crimson.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
