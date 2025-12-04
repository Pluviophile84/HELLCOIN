import type { Metadata } from "next";
// 1. Import Pirata_One (Back to Original Title Font) and Crimson_Text (Body Font)
import { Pirata_One, Crimson_Text } from "next/font/google";
import "./globals.css";

// 2. Configure Pirata One for HEADINGS
// The original gothic/pirate font.
const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

// 3. Configure Crimson Text for BODY
// The readable "Ancient Scripture" look.
const ancientBody = Crimson_Text({ 
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"],
  subsets: ["latin"],
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
      {/* 4. Inject variables */}
      <body className={`${pirata.variable} ${ancientBody.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
