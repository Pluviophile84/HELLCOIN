import type { Metadata } from "next";
import { Pirata_One, VT323 } from "next/font/google";
import "./globals.css";

const pirata = Pirata_One({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-pirata"
});

const vt323 = VT323({ 
  weight: "400", 
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
    // FIX: Removed "scroll-smooth" class.
    // This allows the browser to instantly restore your scroll position on refresh without glitching.
    <html lang="en">
      <body className={`${pirata.variable} ${vt323.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
