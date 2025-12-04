import type { Metadata } from "next";
import localFont from "next/font/local";
import { Crimson_Text } from "next/font/google";
import "./globals.css";

// 1. Custom Title Font (myfonts8.woff2)
// Maps to 'font-gothic' in Tailwind
const customTitle = localFont({
  src: "./fonts/myfonts8.woff2",
  variable: "--font-pirata", 
  display: "swap",
});

// 2. Body Font: Crimson Text
// Maps to 'font-terminal' in Tailwind
const crimson = Crimson_Text({ 
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
      <body className={`${customTitle.variable} ${crimson.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
