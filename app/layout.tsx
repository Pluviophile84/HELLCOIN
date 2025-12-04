import type { Metadata } from "next";
// 1. Import Trade_Winds (New Title Font) and Crimson_Text (Body Font)
import { Trade_Winds, Crimson_Text } from "next/font/google";
import "./globals.css";

// 2. Configure Trade Winds for HEADINGS
// A distressed, rough font that looks like a worn map or ancient warning.
const tradeWinds = Trade_Winds({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata" // <--- The Switch
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
      <body className={`${tradeWinds.variable} ${ancientBody.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
