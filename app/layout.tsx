import type { Metadata } from "next";
import localFont from "next/font/local"; 
import { Crimson_Text } from "next/font/google"; // Keeping Google font for body to be safe
import "./globals.css";

// 1. YOUR CUSTOM UPLOADED FONT (For Headings)
// Maps to 'font-gothic' (Pirata replacement)
const customHeadingFont = localFont({
  src: "./fonts/myfonts2.woff2", // <--- Your file
  variable: "--font-pirata",
  display: "swap",
});

// 2. SAFE BODY FONT (Crimson Text)
// We use this for the body text so the site doesn't break if you didn't upload a second file.
const googleBodyFont = Crimson_Text({ 
  weight: ["400", "600", "700"], 
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-vt323" // Maps to 'font-terminal'
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
      <body className={`${customHeadingFont.variable} ${googleBodyFont.variable} font-sans scanlines bg-hell-black`}>
        {children}
      </body>
    </html>
  );
}
